import { useSession } from "next-auth/react";
import React from "react";
import AdminLayout from "~/components/Shared/AdminLayout";
import Table from "~/components/Shared/Table";
import { teamTC } from "~/utils/tableHelpers";

export default function TeamsPage() {
  const { data } = useSession();

  return (
    <AdminLayout user={data?.user}>
      <div className="p-6">
        <h1 className="mb-4 text-lg">All Tickets</h1>

        <Table data={[]} columns={teamTC} />
      </div>
    </AdminLayout>
  );
}
