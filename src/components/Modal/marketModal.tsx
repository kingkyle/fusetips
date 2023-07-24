import React from "react";
import MultiSelect, { type BasicOptions } from "../Forms/Select";
import SubmitButton from "../Forms/Button";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { type ModalProp } from "./CompetitionModal";
import Input from "../Forms/Input";
import { addMarketDto, type iAddMarketDto } from "~/dto/market";

type Props = {
  sportsData: BasicOptions[];
  isLoadingSports: boolean;
};

export default function AddMarketModal({ isLoadingSports, sportsData }: Props) {
  const utils = api.useContext();
  const dialogFormRef = React.useRef<HTMLFormElement>(null);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<iAddMarketDto>({
    resolver: zodResolver(addMarketDto),
  });

  const [selected, setSelected] = React.useState<string>("");

  const categoriesQuery = api.category.listBySportId.useQuery(
    { id: selected },
    { enabled: selected.trim().length > 0 }
  );

  const categoriesData = React.useMemo(() => {
    const data: BasicOptions[] = [];
    categoriesQuery.data?.data.map((c) => {
      data.push({ label: c.name, value: c.id });
    });
    return data;
  }, [categoriesQuery.data?.data]);

  const addMarketM = api.market.add.useMutation({
    onSuccess: async (data) => {
      toast.success(data?.message);
      closeModal();
      await utils.market.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: iAddMarketDto) => {
    addMarketM.mutate({
      name: data.name,
      sportId: data.sportId,
      categoryId: data.categoryId,
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
        categoryId: {},
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
        Add Market
      </SubmitButton>
      <dialog id="my_modal_1" className="modal" ref={dialogRef}>
        <form method="dialog" name="form-2" ref={dialogFormRef} />
        <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold">Add New Market</h3>
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
                handleChange: (v) =>
                  setSelected((v as unknown as BasicOptions).value),
              }}
              error={{
                children: errors.sportId?.message,
              }}
            />
            <MultiSelect
              label={{
                children: "Select Category",
              }}
              select={{
                isMulti: false,
                control: control,
                className: "capitalize",
                placeholder: "Select Category",
                instanceId: "select-catgeory",
                options: categoriesData,
                isLoading: categoriesQuery.isLoading,
                menuPlacement: "top",
                name: "categoryId",
              }}
              error={{
                children: errors.categoryId?.message,
              }}
            />
          </div>
          <div className="modal-action">
            <SubmitButton
              className="btn-primary btn-sm"
              type="submit"
              isLoading={addMarketM.isLoading}
              disabled={addMarketM.isLoading}
            >
              Add
            </SubmitButton>
            <SubmitButton
              className="btn-error btn-sm text-white"
              type="button"
              onClick={closeModal}
              disabled={addMarketM.isLoading}
            >
              Close
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </div>
  );
}
