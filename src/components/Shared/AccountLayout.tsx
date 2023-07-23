import React from "react";
import type { ISessionUser } from "./shared";
import NavLink from "./NavLink";
import { signOut } from "next-auth/react";

type Props = {
  user: ISessionUser;
  children: React.ReactNode;
};

export default function AccountLayout({ user, children }: Props) {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </label>
            </div>
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end dropdown-bottom">
                <label tabIndex={0} className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="avatar placeholder online">
                      <div className="w-8 rounded-full bg-neutral-focus uppercase text-neutral-content">
                        <span className="text-xs">
                          {user?.name?.slice(0, 2)}
                        </span>
                      </div>
                    </div>
                    <p className="">{user?.name}</p>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box z-[1] mt-4 w-52 bg-base-100 p-2 text-black shadow"
                >
                  <li>
                    <button
                      className="text-black"
                      onClick={() =>
                        signOut({
                          callbackUrl: "/login",
                          redirect: true,
                        })
                      }
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Page content here */}
          <div>{children}</div>
        </div>
        <div className="drawer-side">
          <div className="bg-tip-lightblue2 pl-6 pt-5">
            <h1 className="text-xl font-semibold text-white">FuseTips</h1>
          </div>
          <ul className="menu h-full w-52 bg-tip-lightblue2 p-4 pt-5">
            {/* Sidebar content here */}
            <li>
              <NavLink href="/account" className="">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink href="/account/predictions">Predictions</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
