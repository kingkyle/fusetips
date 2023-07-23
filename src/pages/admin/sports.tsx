import { useSession } from "next-auth/react";
import React from "react";
import { AddSportModal } from "~/components/Modal/SportModal";
import AdminLayout from "~/components/Shared/AdminLayout";
import Table from "~/components/Shared/Table";
import { api } from "~/utils/api";
import { sportTC } from "~/utils/tableHelpers";

export default function SportsPage() {
  const session = useSession();
  const sportQuery = api.sport.list.useQuery();
  const data = React.useMemo(
    () => sportQuery.data?.data ?? [],
    [sportQuery.data?.data]
  );

  return (
    <AdminLayout user={session.data?.user} title="Sport">
      <div className="p-6">
        <div className="my-6 flex items-center justify-between">
          <h1 className="mb-4 text-lg">All Sports</h1>
          <AddSportModal />
        </div>

        <Table data={data} columns={sportTC} isLoading={sportQuery.isLoading} />
      </div>
    </AdminLayout>
  );
}
