import React from "react";

import { cx } from "~/utils/helpers";

type Ref = HTMLButtonElement;
type Props = {
  isLoading?: boolean | undefined | string;
} & JSX.IntrinsicElements["button"];

const SubmitButton = React.forwardRef<Ref, Props>((props, ref) => {
  const {isLoading, ...btnProps} = props;
  return (
    <button ref={ref} {...btnProps} className={cx("btn", props.className)}>
      {isLoading ? (
        <div className="flex items-center justify-center gap-4">
          <span className="loading loading-spinner"></span>
          {props.children || "Submit"}
        </div>
      ) : (
        props.children || "Submit"
      )}
    </button>
  );
});

SubmitButton.displayName = "MyButton";

export default SubmitButton;
