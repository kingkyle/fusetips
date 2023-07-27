import React from "react";
import { cx } from "~/utils/helpers";

type CheckboxProps = {
  div?: JSX.IntrinsicElements["div"];
  label?: JSX.IntrinsicElements["span"];
  input?: JSX.IntrinsicElements["input"];
  error?: JSX.IntrinsicElements["div"];
};

function Checkbox(props: CheckboxProps) {
  return (
    <div
      {...props.div}
      className={cx("form-control w-52", props.div?.className)}
    >
      <label className="label cursor-pointer">
        <span
          {...props.label}
          className={cx("label-text", props.label?.className)}
        >
          {props.label?.children}
        </span>
        <input
          type="checkbox"
          {...props.input}
          className={cx("toggle toggle-primary", props.input?.className)}
        />
      </label>
      <div
        {...props.error}
        className={cx("mt-1 text-sm text-red-500", props.error?.className)}
      >
        {props.error?.children}
      </div>
    </div>
  );
}

export default Checkbox;
