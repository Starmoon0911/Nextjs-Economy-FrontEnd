"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import DeleteUser from "@/actions/user/deleteUser"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { useState } from "react"
import axios from '@/actions/axios'
import { useToast } from "@/hooks/use-toast"
export type User = {
  id: string
  email: string
  missingProducts: number
  permission: "customer" | "admin"
  balance: number // 新增金錢欄位
}
interface DataTableProps {
  data: User[]
}

export const DataTable: React.FC<DataTableProps> = ({ data = [] }) => {
  const [tableData, setTableData] = React.useState<User[]>(data);
  const { toast } = useToast();
  React.useEffect(() => {
    setTableData(data); // 當 data 更新時同步更新 tableData
  }, [data]);
  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "missingProducts",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          代發貨(個)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const missingProducts: number = row.getValue("missingProducts")
        if (missingProducts === 0) {
          return <div className="text-green-400">{missingProducts}</div>
        } else {
          return <div className="text-red-400">{missingProducts}</div>
        }
      },
    },
    {
      accessorKey: "balance",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          金錢
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const [isDialogOpen, setIsDialogOpen] = React.useState(false);
        const [tempMoney, setTempMoney] = React.useState(row.original.balance);
        const originalMoney = React.useRef(row.original.balance);
    
        const updateMoney = async (newValue: number) => {
          try {
            const token = localStorage.getItem('token');
            await axios.post(
              '/api/v1/user/updateMoney',
              { userId: row.original.id, balance: newValue },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
    
            const newData = [...tableData];
            newData[row.index].balance = newValue;
            setTableData(newData);
            
            toast({
              title: "金錢已更新",
              description: "金錢已成功更新",
            });
          } catch (error) {
            console.error('Failed to update money:', error);
            toast({
              title: "更新失敗",
              description: "請檢查網路連線或稍後再試",
            });
          } finally {
            setIsDialogOpen(false);
          }
        };
    
        const handleInputChange = (value: string) => {
          // 只允許數字和空值
          if (/^\d*$/.test(value)) {
            setTempMoney(Number(value));
          }
        };
    
        return (
          <>
            <div 
              className="cursor-pointer" 
              onClick={() => {
                originalMoney.current = row.original.balance;
                setTempMoney(row.original.balance);
                setIsDialogOpen(true);
              }}
            >
              ${row.original.balance.toLocaleString()}
            </div>
    
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>編輯金額</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    value={tempMoney.toString()}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        updateMoney(tempMoney);
                      }
                    }}
                    autoFocus
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTempMoney(originalMoney.current);
                      setIsDialogOpen(false);
                    }}
                  >
                    取消
                  </Button>
                  <Button onClick={() => updateMoney(tempMoney)}>
                    確認
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        );
      },
    },

    {
      accessorKey: "permission",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => {
            const currentSort = column.getIsSorted()
            if (currentSort === "asc") {
              column.toggleSorting(false) // 降序
            } else if (currentSort === "desc") {
              column.clearSorting() // 清除排序
            } else {
              column.toggleSorting(true) // 升序
            }
          }}
        >
          權限
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const permission = row.getValue("permission") as "customer" | "admin"
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent border-none">
                {permission}
                <div className="flex items-center ml-2">
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["customer", "admin"].map((perm) => (
                <DropdownMenuItem
                  key={perm}
                  onClick={() => {
                    async function onChangeRole() {
                      try {
                        const token = localStorage.getItem('token');

                        await axios.post(
                          '/api/v1/user/changerole',
                          {
                            id: row.original.id,
                            role: perm
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                          }
                        );
                        const newData = [...tableData]
                        newData[row.index].permission = perm as "customer" | "admin"
                        setTableData(newData)
                        toast({
                          title: "權限已更新",
                          description: "權限已成功更新",
                        });
                      } catch (error) {
                        if (error.response) {
                          if (error.response.status === 401) {
                            toast({
                              title: "401: 權限不足",
                              description: "嘗試檢查登入狀態或確保你有這權限",
                            });
                          } else {
                            toast({
                              title: `錯誤: ${error.response.status}`,
                              description: error.response.data?.message || "發生未知錯誤",
                            });
                          }
                        } else {
                          toast({
                            title: "更新失敗",
                            description: "請檢查網路連線或稍後再試",
                          });
                        }

                        console.error('Failed to change role:', error);
                      }

                    }
                    onChangeRole()
                  }}
                >
                  {perm}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="bg-red-600">Delete user</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu >
        )
      },
    },
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const [openDialog, setOpenDialog] = useState(false); // Dialog 開關狀態
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // 儲存選中的使用者 ID

  const handleDeleteUser = (userId: string) => {
    setSelectedUserId(userId);
    setOpenDialog(true); // 顯示確認視窗
  };

  const confirmDelete = async () => {
    if (selectedUserId) {
      await DeleteUser(selectedUserId); // 執行刪除操作
      setTableData(tableData.filter((user) => user.id !== selectedUserId)); // 更新表格數據
      setOpenDialog(false); // 關閉確認視窗
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false); // 取消操作，關閉確認視窗
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-x-auto rounded-md border dark:border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="dark:text-gray-200">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center dark:text-gray-400"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 確認刪除 Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認刪除</DialogTitle>
            <DialogDescription>
              您確定要刪除這個使用者嗎？這個操作無法撤回。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              取消
            </Button>
            <Button className="bg-red-600" onClick={confirmDelete}>
              確認刪除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
