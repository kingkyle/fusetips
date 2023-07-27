import type {
  Competition,
  Country,
  Market,
  MarketCategory,
  Match,
  Prediction,
  Sport,
  Team,
} from "@prisma/client";
import { Rating } from "@smastrom/react-rating";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import SubmitButton from "~/components/Forms/Button";
import { AddPredicitonModal } from "~/components/Modal/PredictionModal";

type SportAndCountry = {
  sport: Sport;
  country?: Country;
};

type SportAndCategory = {
  sport: Sport;
  category: MarketCategory;
};

type AWTeamsAndCompetition = {
  homeTeam: Team;
  awayTeam: Team;
  competition: Competition;
  sport: Sport;
  country: Country;
};

type MarketAndCategoryPredictions = {
  market: Market;
  category: MarketCategory;
};

const countryCH = createColumnHelper<Country>();
const sportCH = createColumnHelper<Sport>();
const competitionCH = createColumnHelper<Competition & SportAndCountry>();
const teamCH = createColumnHelper<Team & SportAndCountry>();
const marketCH = createColumnHelper<Market & SportAndCategory>();
const categoryCH = createColumnHelper<MarketCategory & SportAndCountry>();
const matchCH = createColumnHelper<Match & AWTeamsAndCompetition>();
const predicitonCH = createColumnHelper<
  Prediction & MarketAndCategoryPredictions
>();

export const countryTC = [
  countryCH.accessor("name", {
    id: "name",
    header: "Name",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  countryCH.display({
    id: "action",
    header: "Action",
  }),
];

export const sportTC = [
  sportCH.accessor("name", {
    id: "name",
    header: "Name of Sport",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  sportCH.display({
    id: "action",
    header: "Action",
  }),
];

export const competitionTC = [
  competitionCH.accessor("name", {
    id: "name",
    header: "Name",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  competitionCH.accessor("shortName", {
    id: "shortName",
    header: "Abbr",
  }),
  competitionCH.accessor("country.name", {
    id: "country",
    header: "Country",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  competitionCH.accessor("sport.name", {
    id: "sport",
    header: "Sport",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  competitionCH.display({
    id: "action",
    header: "Action",
  }),
];

export const teamTC = [
  teamCH.accessor("name", {
    id: "name",
    header: "Name",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  teamCH.accessor("shortName", {
    id: "shortName",
    header: "Short",
  }),
  teamCH.accessor("country.name", {
    id: "country",
    header: "Country",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  teamCH.accessor("sport.name", {
    id: "sport",
    header: "Sport",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  teamCH.display({
    id: "action",
    header: "Action",
  }),
];

export const marketTC = [
  marketCH.accessor("name", {
    id: "name",
    header: "Name",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  marketCH.accessor("description", {
    id: "description",
    header: "Descriptive Name",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  marketCH.accessor("category.name", {
    id: "category",
    header: "Category",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  marketCH.accessor("sport.name", {
    id: "sport",
    header: "Sport",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  marketCH.display({
    id: "action",
    header: "Action",
  }),
];

export const categoryTC = [
  categoryCH.accessor("name", {
    id: "name",
    header: "Name",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  categoryCH.accessor("sport.name", {
    id: "sport",
    header: "Sport",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  categoryCH.display({
    id: "action",
    header: "Action",
  }),
];

export const matchTC = [
  matchCH.accessor("id", {
    id: "ID",
    header: "ID",
  }),
  matchCH.accessor((row) => row.date.toLocaleString(), {
    id: "date",
    header: "Date",
  }),
  matchCH.accessor("homeTeam.name", {
    id: "homeTeam",
    header: "Home Team",
    cell: (info) => (
      <span className="whitespace-nowrap capitalize">{info.getValue()}</span>
    ),
  }),
  matchCH.accessor("awayTeam.name", {
    id: "awayTeam",
    header: "Away Team",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  matchCH.accessor("competition.name", {
    id: "competition",
    header: "Competition",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  matchCH.accessor("country.name", {
    id: "country",
    header: "Country",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  matchCH.accessor("sport.name", {
    id: "sport",
    header: "Sport",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  matchCH.display({
    id: "action",
    header: "Action",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <AddPredicitonModal
          matchId={info.row.original.id}
          sportId={info.row.original.sportId}
        />
        <Link
          href={"matches/" + info.row.original.id}
          className="btn btn-info btn-xs text-white"
          title="Match Details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
        </Link>

        <SubmitButton
          className="btn-error btn-xs text-white"
          id={info.row.original.id}
          title="Delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </SubmitButton>
      </div>
    ),
  }),
];

export const matchPredictionTC = [
  predicitonCH.accessor("category.name", {
    id: "category",
    header: "Category",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  predicitonCH.accessor("odd", {
    id: "odd",
    header: "Odds",
  }),
  predicitonCH.accessor("market.description", {
    id: "prediction",
    header: "Prediction",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  predicitonCH.accessor((row) => row.rating?.toString(), {
    id: "rating",
    header: "Rating",
    cell: (info) => (
      <span className="capitalize">
        <Rating
          className="w-20"
          readOnly
          value={info.row.original.rating ?? 0}
        />
      </span>
    ),
  }),
  predicitonCH.accessor("status", {
    id: "status",
    header: "Status",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  predicitonCH.display({
    id: "action",
    header: "Action",
  }),
];
