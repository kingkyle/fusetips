import type {
  Competition,
  Country,
  Market,
  MarketCategory,
  Match,
  Sport,
  Team,
} from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";

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

const countryCH = createColumnHelper<Country>();
const sportCH = createColumnHelper<Sport>();
const competitionCH = createColumnHelper<Competition & SportAndCountry>();
const teamCH = createColumnHelper<Team & SportAndCountry>();
const marketCH = createColumnHelper<Market & SportAndCategory>();
const categoryCH = createColumnHelper<MarketCategory & SportAndCountry>();
const matchCH = createColumnHelper<Match & AWTeamsAndCompetition>();

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
  matchCH.accessor((row) => row.date.toString(), {
    id: "date",
    header: "Date",
  }),
  matchCH.accessor("homeTeam.name", {
    id: "homeTeam",
    header: "Home Team",
  }),
  matchCH.accessor("awayTeam.name", {
    id: "awayTeam",
    header: "Away Team",
  }),
  matchCH.accessor("competition.name", {
    id: "competition",
    header: "Competition",
  }),
  matchCH.accessor("country.name", {
    id: "country",
    header: "Country",
  }),
  matchCH.accessor("sport.name", {
    id: "sport",
    header: "Sport",
  }),
  matchCH.display({
    id: "action",
    header: "Action",
  }),
];
