import { type Sport } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { type BasicOptions } from "~/components/Forms/Select";
import AddCategoryModal from "~/components/Modal/CategoryModal";
import AdminLayout from "~/components/Shared/AdminLayout";
import Table from "~/components/Shared/Table";
import { api } from "~/utils/api";
import { categoryTC } from "~/utils/tableHelpers";

export default function CompetitionsPage() {
  const session = useSession();

  const [categoriesQuery, sportsQuery] = api.useQueries((t) => [
    t.category.list(),
    t.sport.list(),
  ]);

  const sportsData = React.useMemo(() => {
    const data: BasicOptions[] = [];
    if (sportsQuery.data?.data) {
      sportsQuery.data?.data.map((s: Sport) =>
        data.push({ value: s.id, label: s.name })
      );
    }
    return data;
  }, [sportsQuery.data?.data]);

  const categoriesData = React.useMemo(() => {
    return categoriesQuery.data?.data ?? [];
  }, [categoriesQuery.data?.data]);

  return (
    <AdminLayout user={session.data?.user}>
      <div className="p-6">
        <div className="my-6 flex items-center justify-between">
          <h1 className="mb-4 text-lg">All Market Catgeories</h1>
          <AddCategoryModal
            sportsData={sportsData}
            isLoadingSports={sportsQuery.isLoading}
          />
        </div>

        <Table
          data={categoriesData}
          columns={categoryTC}
          isLoading={categoriesQuery.isLoading}
        />
      </div>
    </AdminLayout>
  );
}
