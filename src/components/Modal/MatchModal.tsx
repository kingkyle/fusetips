"use client";

import React from "react";
import SubmitButton from "../Forms/Button";
import { useForm } from "react-hook-form";
import {
  addMatchDto,
  type iAddMatchDtoOut,
  type iAddMatchDto,
} from "~/dto/match";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { type ModalProp } from "./CompetitionModal";
import { toast } from "react-toastify";
import MultiSelect, { type BasicOptions } from "../Forms/Select";
import { type MultiValue, type SingleValue } from "react-select";
import CDatePicker from "../Forms/DatePicker";

type Props = {
  countriesData: BasicOptions[];
  sportsData: BasicOptions[];
  isSportsLoading: boolean;
  isCountryLoading: boolean;
};

export type SelectV = MultiValue<BasicOptions> | SingleValue<BasicOptions>;

export default function AddMatchModal({
  countriesData,
  sportsData,
  isCountryLoading,
  isSportsLoading,
}: Props) {
  const utils = api.useContext();
  const dialogFormRef = React.useRef<HTMLFormElement>(null);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<iAddMatchDto, null, iAddMatchDtoOut>({
    resolver: zodResolver(addMatchDto),
  });

  const addMatchM = api.match.add.useMutation({
    onSuccess: async (data) => {
      toast.success(data?.message);
      closeModal();
      await utils.match.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: iAddMatchDto) => {
    addMatchM.mutate({
      date: data.date,
      sportId: data.sportId,
      countryId: data.countryId,
      competitionId: data.competitionId,
      homeTeamId: data.homeTeamId,
      awayTeamId: data.awayTeamId,
    });
  };

  const [values, setValues] = React.useState({
    sportId: "",
    countryId: "",
    competitionId: "",
  });

  const handleChange = (v: SelectV, n: string) => {
    if (v) {
      setValues({ ...values, [n]: (v as BasicOptions).value });
    } else {
      setValues({ ...values, [n]: "" });
    }
  };

  const competitionsQuery = api.competition.listBySportAndCountry.useQuery(
    {
      sportId: values.sportId,
      countryId: values.countryId,
    },
    {
      enabled:
        values.sportId.trim().length > 0 && values.countryId.trim().length > 0,
    }
  );

  const teamsQuery = api.team.listByCompetitionId.useQuery(
    { id: values.competitionId },
    { enabled: values.competitionId.trim().length > 0 }
  );

  const competitionsData = React.useMemo(() => {
    setValue("competitionId", null);
    const data: BasicOptions[] = [];
    competitionsQuery.data?.data.map((c) => {
      data.push({ label: c.name, value: c.id });
    });
    return data;
  }, [competitionsQuery.data?.data]);

  const teamsData = React.useMemo(() => {
    setValue("homeTeamId", null);
    setValue("awayTeamId", null);
    const data: BasicOptions[] = [];
    teamsQuery.data?.data.map((c) => {
      data.push({ label: c.team.name, value: c.team.id });
    });
    return data;
  }, [teamsQuery.data?.data]);

  const showModal = () => {
    (window as ModalProp).my_modal_1.showModal();
  };

  const closeModal = () => {
    dialogFormRef.current?.submit();
    reset();
  };

  React.useEffect(() => {
    dialogRef.current?.addEventListener("close", () => {
      reset({
        sportId: null,
        countryId: null,
        homeTeamId: null,
        awayTeamId: null,
        competitionId: null,
      });
    });
    return () => {
      dialogRef.current?.removeEventListener("close", () => null);
    };
  }, []);

  return (
    <div>
      <SubmitButton
        className="btn-primary btn-sm text-xs text-white"
        onClick={showModal}
      >
        Add Match
      </SubmitButton>
      <dialog id="my_modal_1" className="modal" ref={dialogRef}>
        <form method="dialog" name="form-2" ref={dialogFormRef} />
        <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold">Add New Match</h3>
          <div className="py-4">
            <div>{errors.root?.message}</div>
            <MultiSelect
              label={{
                children: "Select Country",
              }}
              select={{
                isMulti: false,
                control: control,
                className: "capitalize",
                placeholder: "Select Country",
                instanceId: "select-country",
                options: countriesData,
                isLoading: isCountryLoading,
                menuPlacement: "bottom",
                name: "countryId",
                handleChange: (n) => handleChange(n, "countryId"),
              }}
              error={{
                children: errors.countryId?.message,
              }}
            />
            <MultiSelect
              label={{
                children: "Select Sports",
              }}
              select={{
                isMulti: false,
                control: control,
                className: "capitalize",
                placeholder: "Select Sports",
                instanceId: "select-sports",
                options: sportsData,
                isLoading: isSportsLoading,
                menuPlacement: "bottom",
                isClearable: true,
                name: "sportId",
                handleChange: (n) => handleChange(n, "sportId"),
              }}
              error={{
                children: errors.sportId?.message,
              }}
            />
            <MultiSelect
              label={{
                children: "Select Competition",
              }}
              select={{
                isMulti: false,
                control: control,
                className: "capitalize",
                placeholder: "Select Competition",
                instanceId: "select-competition",
                options: competitionsData,
                isLoading: competitionsQuery.isLoading,
                menuPlacement: "top",
                name: "competitionId",
                isDisabled: competitionsQuery.isLoading,
                isClearable: true,
                handleChange: (n) => handleChange(n, "competitionId"),
              }}
              error={{
                children: errors.competitionId?.message,
              }}
            />
            <MultiSelect
              label={{
                children: "Select Home Team",
              }}
              select={{
                isMulti: false,
                control: control,
                className: "capitalize",
                placeholder: "Select Home Team",
                instanceId: "select-Home-Team",
                options: teamsData,
                isLoading: teamsQuery.isLoading,
                isDisabled: teamsQuery.isLoading,
                menuPlacement: "top",
                name: "homeTeamId",
              }}
              error={{
                children: errors.homeTeamId?.message,
              }}
            />
            <MultiSelect
              label={{
                children: "Select Away Team",
              }}
              select={{
                isMulti: false,
                control: control,
                className: "capitalize",
                placeholder: "Select Away Team",
                instanceId: "select-Away-Team",
                options: teamsData,
                isLoading: teamsQuery.isLoading,
                isDisabled: teamsQuery.isLoading,
                menuPlacement: "top",
                name: "awayTeamId",
              }}
              error={{
                children: errors.awayTeamId?.message,
              }}
            />
            <CDatePicker
              label={{
                children: "Date",
              }}
              input={{
                showTimeSelect: true,
                control: control,
                className: "input-bordered w-full",
                placeholderText: "Date of Match",
                dateFormat: "MMMM d, yyyy h:mm aa",
                name: "date",
                onChange: () => {
                  console.log();
                },
              }}
              error={{
                children: errors.date?.message,
              }}
            />
          </div>
          <div className="modal-action">
            <SubmitButton
              className="btn-primary btn-sm"
              type="submit"
              isLoading={addMatchM.isLoading}
              disabled={addMatchM.isLoading}
            >
              Add
            </SubmitButton>
            <SubmitButton
              className="btn-error btn-sm text-white"
              type="button"
              onClick={closeModal}
              disabled={addMatchM.isLoading}
            >
              Close
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </div>
  );
}
