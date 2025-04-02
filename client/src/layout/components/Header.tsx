import { signOutMutation } from "../api";
import { useNavigate } from "@tanstack/react-router";
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
      <h2 className="font-bold text-lg flex items-center">
        Orange Todo
      </h2>
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
                <button className="rounded px-4 py-2 bg-white/30 flex items-center gap-4 text-cyan-600 cursor-pointer" onClick={signOutTigger}>
                  Sign out

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 13c.552 0 1.01-.452.9-.994a5.002 5.002 0 0 0-9.802 0c-.109.542.35.994.902.994h8ZM10.75 5.25a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" />
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