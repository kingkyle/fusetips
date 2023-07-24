import React from "react";
import SubmitButton from "../Forms/Button";
import MultiSelect, { type BasicOptions } from "../Forms/Select";
import Input from "../Forms/Input";
import { type ModalProp } from "./CompetitionModal";
import { useForm } from "react-hook-form";
import { addCategoryDto, type iAddCategoryDto } from "~/dto/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { toast } from "react-toastify";

type Props = {
  sportsData: BasicOptions[];
  isLoadingSports: boolean;
};

export default function AddCategoryModal({
  sportsData,
  isLoadingSports,
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
  } = useForm<iAddCategoryDto>({
    resolver: zodResolver(addCategoryDto),
  });

  const addCategoryM = api.category.add.useMutation({
    onSuccess: async (data) => {
      toast.success(data?.message);
      closeModal();
      await utils.category.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: iAddCategoryDto) => {
    addCategoryM.mutate({
      name: data.name,
      sportId: data.sportId,
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
        Add Category
      </SubmitButton>
      <dialog id="my_modal_1" className="modal" ref={dialogRef}>
        <form method="dialog" name="form-2" ref={dialogFormRef} />
        <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold">Add New Market Category</h3>
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
          </div>
          <div className="modal-action">
            <SubmitButton
              className="btn-primary btn-sm"
              type="submit"
              isLoading={addCategoryM.isLoading}
              disabled={addCategoryM.isLoading}
            >
              Add
            </SubmitButton>
            <SubmitButton
              className="btn-error btn-sm text-white"
              type="button"
              onClick={closeModal}
              disabled={addCategoryM.isLoading}
            >
              Close
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </div>
  );
}
