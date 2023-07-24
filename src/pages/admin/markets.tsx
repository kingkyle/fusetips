import { useSession } from "next-auth/react";
import React from "react";
import { type BasicOptions } from "~/components/Forms/Select";
import AddMarketModal from "~/components/Modal/marketModal";
import AdminLayout from "~/components/Shared/AdminLayout";
import Table from "~/components/Shared/Table";
import { api } from "~/utils/api";
import { marketTC } from "~/utils/tableHelpers";

export default function MarketsPage() {
  const session = useSession();

  const [marketQuery, sportsQuery] = api.useQueries((t) => [
    t.market.list(),
    t.sport.list(),
  ]);

  const sportsData = React.useMemo(() => {
    const data: BasicOptions[] = [];
    sportsQuery.data?.data.map((d) => {
      data.push({ label: d.name, value: d.id });
    });
    return data;
  }, [sportsQuery.data?.data]);


  const marketsData = React.useMemo(() => {
    return marketQuery.data?.data ?? [];
  }, [marketQuery.data?.data]);

  return (
    <AdminLayout user={session.data?.user}>
      <div className="p-6">
        <div className="my-6 flex items-center justify-between">
          <h1 className="mb-4 text-lg">All Markets</h1>
          <AddMarketModal
            sportsData={sportsData}
            isLoadingSports={sportsQuery.isLoading}
          />
        </div>

        <Table
          data={marketsData}
          columns={marketTC}
          isLoading={marketQuery.isLoading}
        />
      </div>
    </AdminLayout>
  );
}
