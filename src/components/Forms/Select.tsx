import Select, {
  type CSSObjectWithLabel,
  type ActionMeta,
  type GroupBase,
  type InputActionMeta,
  type Options,
  type OptionsOrGroups,
  type MenuPlacement,
  type MultiValue,
  type SingleValue,
} from "react-select";
import { cx } from "~/utils/helpers";

import React from "react";
import {
  type Control,
  type FieldValues,
  type FieldPath,
  Controller,
} from "react-hook-form";

export type BasicOptions = {
  readonly value: string;
  readonly label: string;
};

interface Props<T extends FieldValues, V> {
  div?: JSX.IntrinsicElements["div"];
  error?: JSX.IntrinsicElements["div"];
  select: {
    control?: Control<T> | undefined;
    className?: string;
    key?: React.Key | string | null;
    options?: OptionsOrGroups<V, GroupBase<V>>;
    onChange?: (option: V | null, actionMeta: ActionMeta<V>) => void;
    handleChange?:
      | ((
          newValue: MultiValue<V> | SingleValue<V>,
          actionMeta: ActionMeta<V>
        ) => void)
      | undefined;
    isMulti?: boolean;
    isLoading?: boolean;
    onInputChange?:
      | ((newValue: string, actionMeta: InputActionMeta) => void)
      | undefined;
    selectValues?: Options<T>;
    name: FieldPath<T>;
    style?: CSSObjectWithLabel;
    placeholder?: React.ReactNode;
    instanceId?: string | number | undefined;
    isDisabled?: boolean | undefined;
    menuPlacement?: MenuPlacement | undefined;
    loadingMessage?:
      | ((obj: { inputValue: string }) => React.ReactNode)
      | undefined;
  };
  label?: JSX.IntrinsicElements["label"];
}

export default function MultiSelect<T extends FieldValues, V>(
  props: Props<T, V>
) {
  return (
    <div
      {...props.div}
      className={cx("form-control mb-2", props.div?.className)}
    >
      <label {...props.label} className={cx("mb-1", props.label?.className)}>
        {props.label?.children}
      </label>
      <Controller
        name={props.select.name}
        control={props.select?.control}
        render={({ field: { onChange, name, value, ref, onBlur } }) => (
          <Select
            {...props.select}
            className={cx(
              "input-bordered input-md p-0",
              props.select?.className
            )}
            styles={{
              control: (styles) => ({
                ...styles,
                padding: "0.2rem !important",
                borderRadius: "0.5rem",
                borderColor: "hsl(var(--bc) / var(--tw-border-opacity))",
                borderWidth: "1px",
                ...props.select?.style,
              }),
            }}
            ref={ref}
            onBlur={onBlur}
            name={name}
            value={value}
            onChange={onChange}
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
