'use client'
import react, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { CreateNewDashboardPage } from '@/components/dashboard/CreateNewDashboardPage';
import { Page } from '@/components/dashboard/Page';
import { CreateNewInputArea } from '@/components/dashboard/InputArea';
import { FileUploadArea } from '@/components/ui/FileUploadArea';
import { handleBannerUpload } from '@/actions/dashboard/bannerUpload';
export default function Settings() {

  const [LogoValue, setLogoValue] = useState('Logo');

  return (
    <CreateNewDashboardPage>
      <Page
        title="Settings"
        desc="This is how others will see you on the site."
      >
        <CreateNewInputArea
          title='主頁Logo文字'
          desc='最上方導覽列的Logo文字'
          placeholder={LogoValue}
        />
        <CreateNewInputArea
          title='Banner'
          withText={true}
          placeholder='Enter URL (https://...)'
          desc='主頁的背景橫幅'
          withFileUpload={true}
          onFileChange={handleBannerUpload}
        />
        {/* Save button */}
        <div className="pt-4">
          <Button className="bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white">
            Save changes
          </Button>
        </div>
      </Page>
    </CreateNewDashboardPage>
  );
}
