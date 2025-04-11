import { signOutMutation } from "../api";
import { Link, useNavigate } from "@tanstack/react-router";
import { SignInRestSSchema } from "@server/routes/user/api-schema";
import { useEffect, useState } from "react";
import { z } from "zod";
import { userItemChan } from "@src/chan";
import { USER_ITEM_KEY } from "@src/type";
import { SignIn, SignOut } from "@src/util";

export function Header() {
  const navigate = useNavigate();
  const signOut = signOutMutation(navigate);
  const [userItem, setUserItem] = useState<z.infer<typeof SignInRestSSchema> | undefined>(undefined);
 
  useEffect(() => {
    (async () => {
      for await (const signin of userItemChan) {
        setUserItem(signin);
      }
    })();

    (async () => {
      try {
        const userItemStr = localStorage.getItem(USER_ITEM_KEY);
        if (userItemStr) {
          await SignIn(SignInRestSSchema.parse(JSON.parse(userItemStr)));
        }
      } catch {
        await SignOut();
      }
    })();
  }, []);

  const signOutTigger = () => {
    signOut.mutate();
  }

  return (
    <header className="px-8 py-4 shadow whitespace-nowrap flex justify-between">
      <div className="flex gap-16">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M8.074.945A4.993 4.993 0 0 0 6 5v.032c.004.6.114 1.176.311 1.709.16.428-.204.91-.61.7a5.023 5.023 0 0 1-1.868-1.677c-.202-.304-.648-.363-.848-.058a6 6 0 1 0 8.017-1.901l-.004-.007a4.98 4.98 0 0 1-2.18-2.574c-.116-.31-.477-.472-.744-.28Zm.78 6.178a3.001 3.001 0 1 1-3.473 4.341c-.205-.365.215-.694.62-.59a4.008 4.008 0 0 0 1.873.03c.288-.065.413-.386.321-.666A3.997 3.997 0 0 1 8 8.999c0-.585.126-1.14.351-1.641a.42.42 0 0 1 .503-.235Z" clipRule="evenodd" />
          </svg>
          <Link to="/">Orange</Link>
        </h2>
        <nav className="flex items-center gap-4">
          <Link to="/design" activeProps={{ className: "text-cyan-600" }}>
            Design
          </Link>
          <Link to="/todo" activeProps={{ className: "text-cyan-600" }}>
            Todo
          </Link>
        </nav>
      </div>
      <ul className="flex items-center gap-4">
        {
          userItem
            ? (
              <li>
                { userItem.email }
              </li>
            )
            : undefined
        }

        {
          userItem
            ? (
              <li>
                <button className="rounded px-4 py-2 bg-white/30 flex items-center gap-2 text-cyan-600 cursor-pointer" onClick={signOutTigger}>
                  Sign out

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M2 4.75A2.75 2.75 0 0 1 4.75 2h3a2.75 2.75 0 0 1 2.75 2.75v.5a.75.75 0 0 1-1.5 0v-.5c0-.69-.56-1.25-1.25-1.25h-3c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h3c.69 0 1.25-.56 1.25-1.25v-.5a.75.75 0 0 1 1.5 0v.5A2.75 2.75 0 0 1 7.75 14h-3A2.75 2.75 0 0 1 2 11.25v-6.5Zm9.47.47a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H5.25a.75.75 0 0 1 0-1.5h7.19l-.97-.97a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            )
            : undefined
        }
      </ul>
    </header>
  )
}