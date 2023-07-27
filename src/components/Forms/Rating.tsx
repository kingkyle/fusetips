import { Rating } from "@smastrom/react-rating";
import React from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { cx } from "~/utils/helpers";

type Props<T extends FieldValues> = {
  div?: JSX.IntrinsicElements["div"];
  label?: JSX.IntrinsicElements["label"];
  error?: JSX.IntrinsicElements["div"];
  rating: {
    control?: Control<T> | undefined;
    name: FieldPath<T>;
    className?: string;
    key?: React.Key | string | null;
  };
};

function CRating<T extends FieldValues>(props: Props<T>) {
  return (
    <div
      {...props.div}
      className={cx("form-control mb-2", props.div?.className)}
    >
      <label {...props.label} className={cx("mb-1", props.label?.className)}>
        {props.label?.children}
      </label>
      <Controller
        name={props.rating.name}
        control={props.rating.control}
        render={({ field: { onChange, value, ref, onBlur } }) => (
          <Rating
            key={props.rating.key}
            value={value}
            onChange={onChange}
            ref={ref}
            onBlur={onBlur}
            className={cx(props.rating.className)}
          />
        )}
      />
      <div
        {...props.error}
        className={cx("mt-1 text-sm text-red-500", props.error?.className)}
      >
        {props.error?.children}
      </div>
    </div>
  );
}

export { CRating };
