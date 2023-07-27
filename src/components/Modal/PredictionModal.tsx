"use client";

import React from "react";
import Input from "../Forms/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import SubmitButton from "../Forms/Button";
import {
  addPredictionDto,
  type iAddPredicitionOutDto,
  type iAddPredicitionDto,
} from "~/dto/prediction";
import MultiSelect, { type BasicOptions } from "../Forms/Select";
import { type SelectV } from "./MatchModal";
import { CRating } from "../Forms/Rating";

type Props = {
  matchId: string;
  sportId: string;
};

export const bankerData: BasicOptions[] = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];

export const statusData: BasicOptions[] = [
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
  { label: "Success", value: "success" },
];

function AddPredicitonModal({ matchId, sportId }: Props) {
  const dialogFormRef = React.useRef<HTMLFormElement>(null);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<iAddPredicitionDto, null, iAddPredicitionOutDto>({
    defaultValues: { matchId, sportId },
    resolver: zodResolver(addPredictionDto),
  });

  const [selected, setSelected] = React.useState<string>("");

  const handleChange = (v: SelectV) => {
    if (v) {
      setSelected((v as BasicOptions).value);
    } else {
      setSelected("");
    }
  };

  const categoriesQuery = api.category.listBySportId.useQuery({ id: sportId });

  const marketQuery = api.market.listByCategoryId.useQuery(
    { id: selected },
    {
      enabled: selected.trim().length > 0,
    }
  );

  const categoriesData = React.useMemo(() => {
    const data: BasicOptions[] = [];
    categoriesQuery.data?.data.map((c) => {
      data.push({ label: c.name.toLocaleUpperCase(), value: c.id });
    });
    return data;
  }, [categoriesQuery.data?.data]);

  const marketData = React.useMemo(() => {
    const data: BasicOptions[] = [];
    marketQuery.data?.data.map((c) => {
      data.push({ label: c.name.toLocaleUpperCase(), value: c.id });
    });
    return data;
  }, [marketQuery.data?.data]);

  const addPredictionM = api.prediction.add.useMutation({
    onSuccess: (data) => {
      toast.success(data?.message);
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: iAddPredicitionDto) => {
    addPredictionM.mutate({
      categoryId: data.categoryId,
      matchId: data.matchId,
      marketId: data.marketId,
      odd: data.odd,
      isBanker: data.isBanker,
      rating: data.rating,
      sportId: data.sportId,
    });
  };

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogFormRef.current?.submit();
    reset();
  };

  React.useEffect(() => {
    dialogRef.current?.addEventListener("close", () => {
      reset({
        marketId: null,
        categoryId: null,
        isBanker: null,
      });
    });
    return () => {
      dialogRef.current?.removeEventListener("close", () => null);
    };
  }, []);

  return (
    <div>
      <SubmitButton
        className="btn-primary btn-xs text-xs text-white"
        onClick={showModal}
        title="Add Prediction"
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </SubmitButton>
      <dialog id={"my_modal_" + matchId} className="modal" ref={dialogRef}>
        <form method="dialog" name="form-2" ref={dialogFormRef} />
        <form className="modal-box" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h3 className="text-lg font-bold">Add Match Predicition</h3>
          <div className="py-4">
            <Input
              input={{
                className: "input-bordered",
                type: "hidden",
                ...register("matchId"),
              }}
              error={{
                children: errors.matchId?.message,
              }}
            />
            <Input
              input={{
                className: "input-bordered",
                type: "hidden",
                ...register("sportId"),
              }}
              error={{
                children: errors.sportId?.message,
              }}
            />
            <MultiSelect
              label={{
                children: "Category",
              }}
              select={{
                name: "categoryId",
                control: control,
                options: categoriesData,
                placeholder: "Select Category",
                isLoading: categoriesQuery.isLoading,
                isDisabled: categoriesQuery.isLoading,
                handleChange: (v) => handleChange(v),
              }}
              error={{
                children: errors.categoryId?.message,
              }}
            />

            <MultiSelect
              label={{
                children: "Market",
              }}
              select={{
                menuPlacement: "bottom",
                name: "marketId",
                control: control,
                options: marketData,
                placeholder: "Select Market",
                isLoading: marketQuery.isLoading,
                isDisabled: marketQuery.isLoading,
              }}
              error={{
                children: errors.marketId?.message,
              }}
            />

            <MultiSelect
              label={{
                children: "IsBanker",
              }}
              select={{
                menuPlacement: "top",
                name: "isBanker",
                control: control,
                options: bankerData,
                placeholder: "Select Is Banker",
              }}
              error={{
                children: errors.isBanker?.message,
              }}
            />
            <Input
              label={{
                children: "Odd",
              }}
              input={{
                type: "number",
                className: "input-bordered",
                placeholder: "Enter Odd",
                ...register("odd"),
              }}
              error={{
                children: errors.odd?.message,
              }}
            />
            <CRating
              div={{
                className: "w-40",
              }}
              label={{ children: "Rating" }}
              rating={{
                control: control,
                name: "rating",
              }}
              error={{
                children: errors.rating?.message,
              }}
            />
          </div>
          <div className="modal-action">
            <SubmitButton
              className="btn-primary btn-sm"
              type="submit"
              isLoading={addPredictionM.isLoading}
              disabled={addPredictionM.isLoading}
            >
              Add
            </SubmitButton>
            <SubmitButton
              className="btn-error btn-sm text-white"
              type="button"
              onClick={closeModal}
              disabled={addPredictionM.isLoading}
            >
              Close
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export { AddPredicitonModal };
