import { useSession } from "next-auth/react";
import React from "react";
import AdminLayout from "~/components/Shared/AdminLayout";
import Table from "~/components/Shared/Table";
import { categoryTC } from "~/utils/tableHelpers";

export default function CompetitionsPage() {
  const { data } = useSession();

  return (
    <AdminLayout user={data?.user}>
      <div className="p-6">
        <h1 className="mb-4 text-lg">All Categories</h1>

        <Table data={[]} columns={categoryTC} />
      </div>
    </AdminLayout>
  );
}
