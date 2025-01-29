'use client';

import { useEffect, useState } from 'react';
import axios from '@/actions/axios';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/useAuth';
interface Order {
  _id: string;
  userId: string;
  productId: string;
  quantity: number;
  isCompleted: boolean;
}


interface UserResponse {
  status: number;
  data: {
    id: string;
    username: string;
    email: string;
    avatarURL: string;
    role: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
  };
}


const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [sortKey, setSortKey] = useState<'quantity' | 'isCompleted'>('quantity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { checkPermission } = useAuth();
  useEffect(() => {
    const run = async () => {
      const result = await checkPermission();
      setIsAdmin(result);
      if (!result) {
        window.location.href = "/";
      }
    }
    run();
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      if(!isAdmin) return;
      setLoading(true);
      try {
        const { data } = await axios.get('/api/v1/order/get');
        if (data.message === 'success') {
          setOrders(data.data);

          // 獲取所有 userId 和 productId 的資料
          const userIds = Array.from(new Set(data.data.map((order: Order) => order.userId)));
          const productIds = Array.from(new Set(data.data.map((order: Order) => order.productId)));

          // 獲取用戶名稱
          const userRequests = userIds.map((id) =>
            axios.get<UserResponse>(`/api/v1/user?id=${id}`).then((res) => ({
              id,
              username: res.data.data.username
            }))
          );

          const userResults = await Promise.all(userRequests);
          const userMap = userResults.reduce<Record<string, string>>((acc, cur) => {
            acc[cur.id as string] = cur.username;
            return acc;
          }, {} as Record<string, string>);
          setUsers(userMap);

          // 獲取商品名稱
          const productRequests = productIds.map((id) =>
            axios.get(`/api/v1/product/get?id=${id}`).then((res) => ({
              id,
              name: res.data.data.name,
            }))
          );
          const productResults = await Promise.all(productRequests);
          const productMap = productResults.reduce((acc, cur) => {
            acc[cur.id as string] = cur.name;
            return acc;
          }, {} as Record<string, string>);
          setProducts(productMap);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAdmin]);

  const markAsCompleted = async (orderId: string) => {
    if (!isAdmin) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/v1/order/complet`, { OrderId: orderId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, isCompleted: true } : order
        )
      );
    } catch (error) {
      console.error('Failed to complete order:', error);
    }
  };

  const handleSort = (key: 'quantity' | 'isCompleted') => {
    setSortKey(key);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const isAsc = sortOrder === 'asc' ? 1 : -1;
    if (sortKey === 'quantity') {
      return (a.quantity - b.quantity) * isAsc;
    }
    if (sortKey === 'isCompleted') {
      return (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1) * isAsc;
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">待處理訂單</h1>

      <div className="flex justify-between items-center mb-4">
        <div>
          <Select onValueChange={(value) => setSortKey(value as 'quantity' | 'isCompleted')}>
            <SelectTrigger>
              <SelectValue placeholder="排序條件" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quantity">按數量排序</SelectItem>
              <SelectItem value="isCompleted">按完成狀態排序</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={() => handleSort(sortKey)}>
          切換順序 ({sortOrder === 'asc' ? '升序' : '降序'})
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>訂單 ID</TableHead>
              <TableHead>用戶名稱</TableHead>
              <TableHead>商品名稱</TableHead>
              <TableHead>數量</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{users[order.userId] || '載入中...'}</TableCell>
                <TableCell>{products[order.productId] || '載入中...'}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>
                  {order.isCompleted ? (
                    <span className="text-green-500 font-semibold">已完成</span>
                  ) : (
                    <span className="text-red-500 font-semibold">待處理</span>
                  )}
                </TableCell>
                <TableCell>
                  {!order.isCompleted && (
                    <Button
                      variant="outline"
                      onClick={() => markAsCompleted(order._id)}
                    >
                      標記完成
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
