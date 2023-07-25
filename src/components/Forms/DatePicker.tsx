import React from "react";
import DatePicker, { type ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { type Control, Controller, type FieldValues, type FieldPath } from "react-hook-form";
import { cx } from "~/utils/helpers";

type Props<T extends FieldValues> = {
  div?: JSX.IntrinsicElements["div"];
  label?: JSX.IntrinsicElements["label"];
  input: {
    name: FieldPath<T>;
    className?: string;
    control?: Control<T> | undefined;
  } & ReactDatePickerProps<never, undefined>;
  error?: JSX.IntrinsicElements["div"];
};

export default function CDatePicker<T extends FieldValues>(props: Props<T>) {
  return (
    <div
      {...props.div}
      className={cx("form-control mb-2", props.div?.className)}
    >
      <label {...props.label} className={cx("mb-1", props.label?.className)}>
        {props.label?.children}
      </label>
      <Controller
        name={props.input.name}
        control={props.input?.control}
        render={({ field: { onChange, name, value, ref, onBlur } }) => (
          <DatePicker
            {...props.input}
            className={cx(
              "input input-md text-gray-900",
              props.input?.className
            )}
            value={value as string}
            selected={value}
            ref={ref}
            onBlur={onBlur}
            name={name}
            onChange={(v, e) => {
              onChange(v, e);
              props.input?.onChange(v, e);
            }}
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
