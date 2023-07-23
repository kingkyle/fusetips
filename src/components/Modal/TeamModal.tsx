import React from "react";
import MultiSelect, { type BasicOptions } from "../Forms/Select";
import SubmitButton from "../Forms/Button";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { addTeamDto, type iAddTeamDto } from "~/dto/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { type ModalProp } from "./CompetitionModal";
import Input from "../Forms/Input";

type Props = {
  sportsData: BasicOptions[];
  countriesData: BasicOptions[];
  competitionsData: BasicOptions[];
  isLoadingSports: boolean;
  isLoadingCountry: boolean;
  isLoadingCompetition: boolean;
};

export default function AddTeamModal({
  isLoadingSports,
  isLoadingCountry,
  sportsData,
  countriesData,
  competitionsData,
  isLoadingCompetition,
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
  } = useForm<iAddTeamDto>({
    resolver: zodResolver(addTeamDto),
  });

  const addTeamM = api.team.add.useMutation({
    onSuccess: async (data) => {
      toast.success(data?.message);
      closeModal();
      await utils.team.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: iAddTeamDto) => {
    addTeamM.mutate({
      name: data.name,
      shortName: data.shortName,
      sportId: data.sportId,
      countryId: data.countryId,
      competitions: data.competitions,
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
        sportId: {},
        countryId: {},
        competitions: [],
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
        Add Team
      </SubmitButton>
      <dialog id="my_modal_1" className="modal" ref={dialogRef}>
        <form method="dialog" name="form-2" ref={dialogFormRef} />
        <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold">Add New Team</h3>
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
            <MultiSelect
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
            <MultiSelect
              label={{
                children: "Select Competitions",
              }}
              select={{
                isMulti: true,
                control: control,
                className: "capitalize",
                placeholder: "Select Competitions",
                instanceId: "select-competitions",
                options: competitionsData,
                isLoading: isLoadingCompetition,
                menuPlacement: "top",
                name: "competitions",
              }}
              error={{
                children: errors.competitions?.message,
              }}
            />
          </div>
          <div className="modal-action">
            <SubmitButton
              className="btn-primary btn-sm"
              type="submit"
              isLoading={addTeamM.isLoading}
              disabled={addTeamM.isLoading}
            >
              Add
            </SubmitButton>
            <SubmitButton
              className="btn-error btn-sm text-white"
              type="button"
              onClick={closeModal}
              disabled={addTeamM.isLoading}
            >
              Close
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </div>
  );
}
