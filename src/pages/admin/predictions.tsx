import { useSession } from "next-auth/react";
import React from "react";
import AdminLayout from "~/components/Shared/AdminLayout";

export default function PredictionsPage() {
  const session = useSession();
  return (
    <AdminLayout user={session.data?.user} title="Predictions">
      <div className="p-6">
        <div className="my-4 flex items-center justify-between">
          <h1 className="mb-4 text-lg">All Predictions</h1>
          {/* <AddMatchModal
            sportsData={sportsData}
            countriesData={countriesData}
            isCountryLoading={countriesQuery.isLoading}
            isSportsLoading={sportsQuery.isLoading}
          /> */}
        </div>

        {/* <Table
          data={matchData}
          columns={matchTC}
          isLoading={matchQuery.isLoading}
        /> */}
      </div>
    </AdminLayout>
  );
}
