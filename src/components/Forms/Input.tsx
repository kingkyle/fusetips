import React from "react";
import { cx } from "~/utils/helpers";

type Ref = HTMLInputElement;
type Props = {
  input?: JSX.IntrinsicElements["input"];
  label?: JSX.IntrinsicElements["label"];
  div?: JSX.IntrinsicElements["div"];
  error?: JSX.IntrinsicElements["div"];
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
};

const Input = React.forwardRef<Ref, Props>((props, ref) => {
  return (
    <div
      {...props.div}
      className={cx("form-control mb-2", props.div?.className)}
    >
      <label {...props.label} className={cx("mb-1", props.label?.className)}>
        {props.label?.children}
      </label>
      <input
        type="text"
        ref={ref}
        {...props.input}
        className={cx(
          "mb input input-md text-gray-900",
          props.input?.className
        )}
        onChange={props.onChange}
      />
      <div
        {...props.error}
        className={cx("mt-1 text-sm text-red-500", props.error?.className)}
      >
        {props.error?.children}
      </div>
    </div>
  );
});

Input.displayName = "MyInput";

export default Input;
