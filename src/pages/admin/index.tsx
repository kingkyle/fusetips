import { useSession } from "next-auth/react";
import React from "react";
import AdminLayout from "~/components/Shared/AdminLayout";

export default function AdminDashboardPage() {
  const session = useSession();
  return (
    <div>
      <AdminLayout user={session.data?.user}>
        <div>
          <h1>Admin Dashboard</h1>
        </div>
      </AdminLayout>
    </div>
  );
}
