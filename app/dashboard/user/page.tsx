'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from '@/components/dashboard/UserSettingTable';
import { CreateNewDashboardPage } from '@/components/dashboard/CreateNewDashboardPage';
import { Page } from '@/components/dashboard/Page';
import axios from '@/actions/axios';

export default function UserSetting() {
  interface userProps {
    id: string;
    permission: "customer" | "admin";  // 修改這裡
    email: string;
    missingProducts: number;
    role?: string;
  }
  const [user, setUser] = useState<userProps[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 請求用戶資料
        const response = await axios.get('/api/v1/user/');
        const users = response.data.data; // 假設 `response.data.data` 是一個用戶陣列

        const enrichedUsers = await Promise.all(
          users.map(async (user:userProps) => {
            const userOrders = await axios.get(`/api/v1/order/getUserOrder?id=${user.id}`);
            return {
              id: user.id,
              permission: user.role === "admin" ? "admin" : "customer",  // 確保類型安全
              email: user.email,
              missingProducts: userOrders?.data?.length || 0,
            };
          })
        );

        // 設定用戶資料
        console.log(enrichedUsers)
        setUser(enrichedUsers);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <CreateNewDashboardPage>
      <Page
        title="使用者列表"
        desc="這裡可以管理使用者😄"
      >
        <DataTable data={user as userProps[]} />
      </Page>
    </CreateNewDashboardPage>
  );
}
