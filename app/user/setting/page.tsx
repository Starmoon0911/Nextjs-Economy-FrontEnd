'use client'
import { useState, useRef, useEffect } from "react"
import ReactCrop, { Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Avatar from 'react-avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useAuth } from "@/context/useAuth"
import { useToast } from "@/hooks/use-toast"
import axios from '@/actions/axios'

export default function UserSettings() {
    const [originalUsername, setOriginalUsername] = useState("")
    const [editingUsername, setEditingUsername] = useState<string | null>(null)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [avatar, setAvatar] = useState("")
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState<string | null>(null)
    const usernameInputRef = useRef<HTMLInputElement | null>(null)
    const { isLogged, user } = useAuth()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [avatarURL, setAvatarURL] = useState("");

    const { toast } = useToast()

    // 修正型別
    const [crop, setCrop] = useState<Crop>({
        unit: "%",
        x: 10,
        y: 10,
        width: 50,
        height: 50,
    })
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const { username, email, avatarURL } = JSON.parse(storedUser);
                setUsername(username);
                setEmail(email);
                setAvatarURL(avatarURL);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);
    useEffect(() => {
        if (username) setOriginalUsername(username)
    }, [username]);
    const handleUsernameClick = () => {
        setEditingUsername(originalUsername)
        setTimeout(() => usernameInputRef.current?.focus(), 0)
    }

    const updateUsername = async (newUsername: string) => {
        try {
            const token = localStorage.getItem("token"); // 從 localStorage 獲取 token
            const response = await axios.post(
                "/api/v1/user/updateusername",
                {
                    userId: user.id, // 這裡需要你的使用者 ID
                    username: newUsername,
                },
                {
                    headers: {
                        Authorization: `Beazer ${token}`, // 把 token 放在 header 的 Authorization 欄位
                    },
                }
            );

            if (response.status === 200) {
                toast({ description: "使用者名稱更新成功！" });
                setOriginalUsername(newUsername);
                window.location.reload();
            }
        } catch (error) {
            if (error.response.status > 299 || error.response.status < 499) {
                toast({ description: "更新失敗，請稍後再試！", variant: "destructive" });
                console.log(error.response);
            } else {
                toast({ description: "伺服器錯誤，請稍後再試！", variant: "destructive" });
                console.error(error.response);
            }
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingUsername(e.target.value)
    }

    const handleUsernameKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (editingUsername && editingUsername !== originalUsername) {
                await updateUsername(editingUsername);
            }
            setEditingUsername(null);
        }
        if (e.key === "Escape") {
            setEditingUsername(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setImage(reader.result as string) // 確保是 string
            reader.readAsDataURL(file)
        }
    }

    // 在 UserSettings 內新增上傳頭像的功能
    const handleSaveAvatar = async () => {
        if (image) {
            try {
                const token = localStorage.getItem("token"); // 從 localStorage 獲取 token
                const formData = new FormData();
                const file = dataURLtoFile(image, "avatar.png"); // 將 base64 轉為 File
                formData.append("avatar", file);

                const response = await axios.post(
                    "/api/v1/user/avatar",
                    formData,
                    {
                        headers: {
                            Authorization: `Beazer ${token}`,
                            "Content-Type": "multipart/form-data", // 設定為多部分表單資料
                        }
                    }
                );

                if (response.status === 200) {
                    toast({ description: "頭像更新成功！" });
                    setAvatar(response.data.avatarURL); // 更新頭像URL
                    setOpen(false);
                }
            } catch (error) {
                toast({ description: "更新失敗，請稍後再試！", variant: "destructive" });
                console.error(error);
            }
        }
    };

    // 將 base64 轉換為 File
    const dataURLtoFile = (dataURL: string, filename: string) => {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1] || "";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };


    const updatePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast({ description: "新密碼與確認密碼不符！", variant: "destructive" });
            return;
        }

        try {
            const token = localStorage.getItem("token"); // 從 localStorage 獲取 token
            const response = await axios.post(
                "/api/v1/user/updateuserpassword",
                {
                    originalPassword: currentPassword,
                    newPassword,
                    userId: user.id, // 這裡需要你的使用者 ID
                },
                {
                    headers: {
                        Authorization: `Beazer ${token}`, // 把 token 放在 header 的 Authorization 欄位
                    },
                }
            );

            if (response.status === 200) {
                toast({ description: "密碼更新成功！" });
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            if (error.response.status === 401) {
                toast({ description: "密碼錯誤，請重新確認！", variant: "destructive" });
            } else if (error.response.status === 500) {
                toast({ description: "伺服器錯誤，請稍後再試！", variant: "destructive" });
            } else {
                toast({ description: "更新失敗，請稍後再試！", variant: "destructive" });
            }
            console.error(error.response);
        }
    };

    if (!isLogged) return (
        <div className="max-w-lg my-10 mx-auto p-6 bg-white shadow rounded-lg dark:bg-gray-800">
            <h2 className="text-2xl text-black font-semibold mb-4 dark:text-gray-200">使用者設定</h2>
            <p className="text-gray-500 dark:text-gray-400">哥們先去登入吧...</p>
        </div>
    )

    return (
        <div className="max-w-lg my-10 mx-auto p-6 bg-white shadow rounded-lg dark:bg-gray-800">
            <h2 className="text-2xl text-black font-semibold mb-4 dark:text-gray-200">使用者設定</h2>

            <div className="flex items-center gap-6 mb-8">
                <div className="relative group">
                    <Avatar
                        name={originalUsername}
                        round={true}
                        size="80"
                        src={avatarURL}
                        onClick={() => setOpen(true)}
                    />
                </div>

                <div className="flex-1">
                    <div className="relative">
                        {editingUsername !== null ? (
                            <input
                                ref={usernameInputRef}
                                type="text"
                                value={editingUsername}
                                onChange={handleUsernameChange}
                                onKeyDown={handleUsernameKeyDown}
                                onBlur={() => setEditingUsername(null)}
                                className="text-xl font-semibold bg-transparent border-b-2 border-transparent border-blue-500 outline-none dark:text-gray-200"
                            />
                        ) : (
                            <div
                                onClick={handleUsernameClick}
                                className="text-xl font-semibold cursor-text hover:bg-gray-100 rounded px-2 py-1 dark:hover:bg-gray-700 dark:text-gray-200"
                            >
                                {originalUsername}
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">{email}</p>
                </div>
            </div>

            {/* 密碼修改區塊 */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">當前密碼</label>
                    <Input type="password" className="border-white-2" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">新密碼</label>
                    <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">確認新密碼</label>
                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <Button className="w-full" onClick={updatePassword}>更新密碼</Button>
            </div>

            {/* 頭像編輯彈窗 */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>編輯頭像</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center">
                        {image && (
                            <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                                <img src={image} alt="Crop preview" />
                            </ReactCrop>
                        )}
                        <Input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>取消</Button>
                        <Button onClick={handleSaveAvatar}>儲存</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
