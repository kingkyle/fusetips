import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { cx } from "~/utils/helpers";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function NavLink(props: Props) {
  const router = useRouter();
  const isActive = router.pathname == props.href;
  return (
    <Link
      href={props.href ?? ""}
      {...props}
      className={cx(isActive && "active", props.className)}
    >
      {props.children}
    </Link>
  );
}
