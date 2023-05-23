import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

export const Header = () => {
  const { data: sessionData } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-5 text-3xl font-bold">
        <div>
          {theme === "business" ? (
            <div
              className="flex-1 lg:flex-none"
              onClick={() => setTheme("winter")}
            >
              <SunIcon className="text-white-400 h-8 w-8 cursor-pointer sm:h-10 sm:w-10" />
            </div>
          ) : (
            <div
              className="flex-1 lg:flex-none"
              onClick={() => setTheme("business")}
            >
              <MoonIcon className="text-white-400 h-8 w-8 cursor-pointer sm:h-8 sm:w-8" />
            </div>
          )}
        </div>
        <span className={"pl-5"}>
          {sessionData?.user?.name
            ? `Notes for ${sessionData.user.name} `
            : " "}{" "}
        </span>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          {sessionData?.user ? (
            <label
              tabIndex={0}
              className="btn-ghost btn-circle avatar btn"
              onClick={() => void signOut()}
            >
              <div className="w-10 rounded-full">
                <Image
                  src={sessionData?.user?.image ?? ""}
                  alt={sessionData?.user?.name ?? ""}
                  width="40"
                  height="40"
                />
              </div>
            </label>
          ) : (
            <button
              className="btn-ghost rounded-btn btn"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
