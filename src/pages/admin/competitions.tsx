import { type Country, type Sport } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { type BasicOptions } from "~/components/Forms/Select";
import { AddCompetitionModal } from "~/components/Modal/CompetitionModal";
import AdminLayout from "~/components/Shared/AdminLayout";
import Table from "~/components/Shared/Table";
import { api } from "~/utils/api";
import { competitionTC } from "~/utils/tableHelpers";

export default function CompetitionsPage() {
  const session = useSession();

  const [competitionsQuery, countriesQuery, sportsQuery] = api.useQueries(
    (t) => [t.competition.list(), t.country.list(), t.sport.list()]
  );

  const countriesData = React.useMemo(() => {
    const data: BasicOptions[] = [];
    if (countriesQuery.data?.data) {
      countriesQuery.data?.data.map((s: Country) =>
        data.push({ value: s.id, label: s.name })
      );
    }
    return data;
  }, [countriesQuery.data?.data]);

  const sportsData = React.useMemo(() => {
    const data: BasicOptions[] = [];
    if (sportsQuery.data?.data) {
      sportsQuery.data?.data.map((s: Sport) =>
        data.push({ value: s.id, label: s.name })
      );
    }
    return data;
  }, [sportsQuery.data?.data]);

  const competitionsData = React.useMemo(() => {
    return competitionsQuery.data?.data ?? [];
  }, [competitionsQuery.data?.data]);

  return (
    <AdminLayout user={session.data?.user} title="Competitions">
      <div className="p-6">
        <div className="my-6 flex items-center justify-between">
          <h1 className="mb-4 text-lg">All Competitions</h1>
          <AddCompetitionModal
            sportsData={sportsData}
            countriesData={countriesData}
            isLoadingSports={sportsQuery.isLoading}
            isLoadingCountry={countriesQuery.isLoading}
          />
        </div>

        <Table
          data={competitionsData}
          columns={competitionTC}
          isLoading={competitionsQuery.isLoading}
        />
      </div>
    </AdminLayout>
  );
}
