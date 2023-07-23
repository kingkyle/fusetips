"use client";

import React from "react";
import Input from "../Forms/Input";
import { useForm } from "react-hook-form";
import { addSportDto, type iAddSportDto } from "~/dto/sport";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import SubmitButton from "../Forms/Button";

type ModalProp = {
  my_modal_1: {
    showModal: () => void;
  };
} & Window &
  typeof globalThis;

function AddCountryModal() {
  const utils = api.useContext();
  const dialogFormRef = React.useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<iAddSportDto>({
    resolver: zodResolver(addSportDto),
  });

  const addCountryM = api.country.add.useMutation({
    onSuccess: async (data) => {
      toast.success(data.message);
      closeModal();
      await utils.country.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: iAddSportDto) => {
    addCountryM.mutate({ name: data.name });
  };

  const showModal = () => {
    (window as ModalProp).my_modal_1.showModal();
  };

  const closeModal = () => {
    dialogFormRef.current?.submit();
    reset();
  };

  React.useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div>
      <SubmitButton
        className="btn-primary btn-sm text-xs text-white"
        onClick={showModal}
      >
        Add Country
      </SubmitButton>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" name="form-2" ref={dialogFormRef} />
        <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold">Add New Country</h3>
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
          </div>
          <div className="modal-action">
            <SubmitButton
              className="btn-primary btn-sm"
              type="submit"
              isLoading={addCountryM.isLoading}
              disabled={addCountryM.isLoading}
            >
              Add
            </SubmitButton>
            <SubmitButton
              className="btn-error btn-sm text-white"
              type="button"
              onClick={closeModal}
              disabled={addCountryM.isLoading}
            >
              Close
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export { AddCountryModal };
