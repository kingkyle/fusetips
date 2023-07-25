"use client";

import React from "react";
import Input from "../Forms/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import SubmitButton from "../Forms/Button";
import { addCompetitionDto, type iAddCompetitionDtoOut, type iAddCompetitionDto } from "~/dto/competition";
import MultiSelect, { type BasicOptions } from "../Forms/Select";

export type ModalProp = {
  my_modal_1: {
    showModal: () => void;
  };
} & Window &
  typeof globalThis;

type Props = {
  sportsData: BasicOptions[];
  countriesData: BasicOptions[];
  isLoadingSports: boolean;
  isLoadingCountry: boolean;
};

function AddCompetitionModal({
  sportsData,
  countriesData,
  isLoadingSports,
  isLoadingCountry,
}: Props) {
  const utils = api.useContext();
  const dialogFormRef = React.useRef<HTMLFormElement>(null);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<iAddCompetitionDto, null, iAddCompetitionDtoOut>({
    resolver: zodResolver(addCompetitionDto),
  });


  const addCompetititonM = api.competition.add.useMutation({
    onSuccess: async (data) => {
      toast.success(data?.message);
      closeModal();
      await utils.competition.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: iAddCompetitionDto) => {
    addCompetititonM.mutate({
      name: data.name,
      shortName: data.shortName,
      sportId: data.sportId,
      countryId: data.countryId,
    });
  };

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
        Add Competition
      </SubmitButton>
      <dialog id="my_modal_1" className="modal" ref={dialogRef}>
        <form method="dialog" name="form-2" ref={dialogFormRef} />
        <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold">Add New Competition</h3>
          <div className="py-4">
            <Input
              label={{
                children: "Name",
              }}
              input={{
                className: "input-bordered",
                placeholder: "Enter name of country",
                ...register("name"),
              }}
              error={{
                children: errors.name?.message,
              }}
            />
            <Input
              input={{
                className: "input-bordered",
                placeholder: "Please enter short name",
                ...register("shortName"),
              }}
              label={{
                children: "Short Name",
              }}
              error={{
                children: errors.shortName?.message,
              }}
            />
            <MultiSelect<iAddCompetitionDto, BasicOptions>
              label={{
                children: "Select Sport",
              }}
              select={{
                control: control,
                className: "capitalize",
                placeholder: "Select Sport",
                instanceId: "select-sport",
                options: sportsData,
                isLoading: isLoadingSports,
                menuPlacement: "top",
                name: "sportId",
                isMulti: false,
              }}
              error={{
                children: errors.sportId?.message,
              }}
            />
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
                isLoading: isLoadingCountry,
                menuPlacement: "top",
                name: "countryId",
              }}
              error={{
                children: errors.countryId?.message,
              }}
            />
          </div>
          <div className="modal-action">
            <SubmitButton
              className="btn-primary btn-sm"
              type="submit"
              isLoading={addCompetititonM.isLoading}
              disabled={addCompetititonM.isLoading}
            >
              Add
            </SubmitButton>
            <SubmitButton
              className="btn-error btn-sm text-white"
              type="button"
              onClick={closeModal}
              disabled={addCompetititonM.isLoading}
            >
              Close
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export { AddCompetitionModal };
