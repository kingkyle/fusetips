import { useSession } from "next-auth/react";
import React from "react";
import { type BasicOptions } from "~/components/Forms/Select";
import AddMatchModal from "~/components/Modal/MatchModal";
import AdminLayout from "~/components/Shared/AdminLayout";
import Table from "~/components/Shared/Table";
import { api } from "~/utils/api";
import { matchTC } from "~/utils/tableHelpers";

export default function TeamsPage() {
  const session = useSession();

  const [matchQuery, countriesQuery, sportsQuery] = api.useQueries((t) => [
    t.match.list(),
    t.country.list(),
    t.sport.list(),
  ]);

  const matchData = React.useMemo(
    () => matchQuery.data?.data ?? [],
    [matchQuery.data?.data]
  );

  const countriesData = React.useMemo(() => {
    const data: BasicOptions[] = [];
    countriesQuery.data?.data.map((c) => {
      data.push({ label: c.name, value: c.id });
    });
    return data;
  }, [countriesQuery.data?.data]);

  const sportsData = React.useMemo(() => {
    const data: BasicOptions[] = [];
    sportsQuery.data?.data.map((c) => {
      data.push({ label: c.name, value: c.id });
    });
    return data;
  }, [sportsQuery.data?.data]);

  return (
    <AdminLayout user={session.data?.user} title="Match">
      <div className="p-6">
        <div className="my-4 flex items-center justify-between">
          <h1 className="mb-4 text-lg">All Matches</h1>
          <AddMatchModal
            sportsData={sportsData}
            countriesData={countriesData}
            isCountryLoading={countriesQuery.isLoading}
            isSportsLoading={sportsQuery.isLoading}
          />
        </div>

        <Table
          data={matchData}
          columns={matchTC}
          isLoading={matchQuery.isLoading}
        />
      </div>
    </AdminLayout>
  );
}
