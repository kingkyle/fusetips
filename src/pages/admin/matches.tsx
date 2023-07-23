import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { AddCountryModal } from "~/components/Modal/CountryModal";
import AdminLayout from "~/components/Shared/AdminLayout";
import Table from "~/components/Shared/Table";
import { matchTC } from "~/utils/tableHelpers";

export default function TeamsPage() {
  const { data } = useSession();

  return (
    <AdminLayout user={data?.user}>
      <Head>
        <title>Match - Admin Dashboard</title>
      </Head>
      <div className="p-6">
        <div className="flex justify-between items-center my-4">
          <h1 className="mb-4 text-lg">All Matches</h1>
          <AddCountryModal />
        </div>

        <Table data={[]} columns={matchTC} />
      </div>
    </AdminLayout>
  );
}
