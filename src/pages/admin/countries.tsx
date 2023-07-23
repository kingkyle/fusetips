import { useSession } from "next-auth/react";
import React from "react";
import { AddCountryModal } from "~/components/Modal/CountryModal";
import AdminLayout from "~/components/Shared/AdminLayout";
import Table from "~/components/Shared/Table";
import { api } from "~/utils/api";
import { countryTC } from "~/utils/tableHelpers";

export default function CountryPage() {
  const session = useSession();
  const countriesQuery = api.country.list.useQuery();
  const data = React.useMemo(
    () => countriesQuery.data?.data ?? [],
    [countriesQuery.data?.data]
  );

  return (
    <AdminLayout user={session.data?.user} title="Country">
      <div className="p-6">
        <div className="my-6 flex items-center justify-between">
          <h1 className="mb-4 text-lg">All Countries</h1>
          <AddCountryModal />
        </div>

        <Table
          data={data}
          columns={countryTC}
          isLoading={countriesQuery.isLoading}
        />
      </div>
    </AdminLayout>
  );
}
