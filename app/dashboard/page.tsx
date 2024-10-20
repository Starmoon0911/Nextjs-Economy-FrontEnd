import Layout from "@/components/dashboard/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>
        <p className="text-gray-600">Here is some important data overview.</p>
      </div>
    </Layout>
  );
}
