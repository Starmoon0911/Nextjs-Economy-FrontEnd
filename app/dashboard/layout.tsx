import Sidebar from "@/components/dashboard/sidebar";


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
