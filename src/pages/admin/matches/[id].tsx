import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { useSession } from "next-auth/react";
import React from "react";
import AdminLayout from "~/components/Shared/AdminLayout";
import { prisma } from "~/server/db";
import { predictionRouter } from "~/server/api/routers/prediction";
import superjson from "superjson";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import { formatDayMonth, formatTime } from "~/utils/date";
import Table from "~/components/Shared/Table";
import { matchPredictionTC } from "~/utils/tableHelpers";
import { type iMatchData } from "~/dto/match";

export default function MatchDetails(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const session = useSession();
  const { id } = props;
  const matchQuery = api.prediction.listByMatchID.useQuery({ id });
  const matchData = React.useMemo(
    () => matchQuery.data?.data as unknown as iMatchData,
    [matchQuery.data?.data]
  );

  if (matchQuery.isLoading) {
    return (
      <AdminLayout user={session.data?.user} title="Match Details">
        <div className="flex min-h-[60vh] items-center justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout user={session.data?.user} title="Match Details">
      <div className="p-6">
        <div className="flex items-center justify-evenly rounded bg-tip-blue px-4 py-8 text-white">
          <div className="text-2xl font-bold capitalize">
            <h1>{matchData?.homeTeam.name}</h1>
          </div>
          <div className="text-center">
            <p>
              <span className="capitalize">{matchData?.homeTeam.name}</span> vs{" "}
              <span className="capitalize">{matchData?.awayTeam.name}</span>
            </p>
            <div className="my-4">
              <h1 className="text-lg font-bold uppercase">
                {formatTime(matchData?.date)}
              </h1>
              <p>{formatDayMonth(matchData?.date)}</p>
            </div>
            <p className="capitalize">{matchData?.competition.name}</p>
          </div>
          <div className="text-2xl font-bold capitalize">
            <h1>{matchData?.awayTeam.name}</h1>
          </div>
        </div>
        <div className="mt-10">
          <Table
            data={matchData?.predictions}
            columns={matchPredictionTC}
            isLoading={matchQuery.isLoading}
          />
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const id = context.params?.id as string;
  const helpers = createServerSideHelpers({
    router: predictionRouter,
    ctx: {
      session: await getServerAuthSession(context),
      prisma: prisma,
    },
    transformer: superjson,
  });

  await helpers.listByMatchID.prefetch({ id });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
}
