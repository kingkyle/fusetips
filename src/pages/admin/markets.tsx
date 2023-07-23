import { useSession } from "next-auth/react";
import React from "react";
import AdminLayout from "~/components/Shared/AdminLayout";
import Table from "~/components/Shared/Table";
import { marketTC } from "~/utils/tableHelpers";

export default function MarketsPage() {
  const { data } = useSession();

  return (
    <AdminLayout user={data?.user}>
      <div className="p-6">
        <h1 className="mb-4 text-lg">All Markets</h1>

        <Table data={[]} columns={marketTC} />
      </div>
    </AdminLayout>
  );
}
