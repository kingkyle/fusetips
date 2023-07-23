import { type Competition, type Country, type Sport } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { type BasicOptions } from "~/components/Forms/Select";
import AddTeamModal from "~/components/Modal/TeamModal";
import AdminLayout from "~/components/Shared/AdminLayout";
import Table from "~/components/Shared/Table";
import { api } from "~/utils/api";
import { teamTC } from "~/utils/tableHelpers";

export default function TeamsPage() {
  const session = useSession();

  const [teamsQuery, competitionsQuery, countriesQuery, sportsQuery] =
    api.useQueries((t) => [
      t.team.list(),
      t.competition.list(),
      t.country.list(),
      t.sport.list(),
    ]);

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
    const data: BasicOptions[] = [];
    if (competitionsQuery.data?.data) {
      competitionsQuery.data?.data.map((s: Competition) =>
        data.push({ value: s.id, label: s.name })
      );
    }
    return data;
  }, [competitionsQuery.data?.data]);

  const teamsData = React.useMemo(() => {
    return teamsQuery.data?.data ?? [];
  }, [teamsQuery.data?.data]);

  return (
    <AdminLayout user={session.data?.user}>
      <div className="p-6">
        <div className="my-6 flex items-center justify-between">
          <h1 className="mb-4 text-lg">All Teams</h1>
          <AddTeamModal
            competitionsData={competitionsData}
            sportsData={sportsData}
            countriesData={countriesData}
            isLoadingSports={sportsQuery.isLoading}
            isLoadingCountry={countriesQuery.isLoading}
            isLoadingCompetition={competitionsQuery.isLoading}
          />
        </div>

        <Table
          data={teamsData}
          columns={teamTC}
          isLoading={teamsQuery.isLoading}
        />
      </div>
    </AdminLayout>
  );
}
