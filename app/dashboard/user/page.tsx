'use client'
import React, { useState } from 'react'
import { DataTable } from '@/components/dashboard/UserSettingTable';
import { CreateNewDashboardPage } from '@/components/dashboard/CreateNewDashboardPage';
import { Page } from '@/components/dashboard/Page';

export default function UserSetting() {
  const [LogoValue, setLogoValue] = useState('Logo');

  const paymentData = [
    { id: "m5gr84i9", permission: "admin", status: "verified" as const, email: "ken99@yahoo.com" },
    { id: "3u1reuv4", permission: "customer", status: "unverified" as const, email: "Abe45@gmail.com" },
    { id: "derv1ws0", permission: "customer", status: "unverified" as const, email: "Monserrat44@gmail.com" },
    { id: "5kma53ae", permission: "customer", status: "unverified" as const, email: "Silas22@gmail.com" },
    { id: "bhqecj4p", permission: "customer", status: "verified" as const, email: "carmella@hotmail.com" },
  ]

  return (
    <CreateNewDashboardPage>
      <Page
        title="使用者列表"
        desc="這裡可以管理使用者😄"
      >
        <DataTable data={paymentData} />
        {/* Save button
        <div className="pt-4">
          <Button className="bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white">
            Save changes
          </Button>
        </div> */}
      </Page>
    </CreateNewDashboardPage>
  );
}
