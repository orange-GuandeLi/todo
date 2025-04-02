import { signInMutation } from "./api";
import { useNavigate } from "@tanstack/react-router";

export function Auth() {
  const navigate = useNavigate();
  const signIn = signInMutation(navigate);

  const signInTigger = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!email || !password) {
      return;
    }

    signIn.mutate({email, password});
  }

  return <>
    <section className="size-full grid place-content-center">
      <div className="bg-white/30 backdrop-blur-xs p-4 rounded">
        <h3 className="font-bold text-3xl text-black/70 mb-8">Sign In</h3>
        <form onSubmit={signInTigger} className="flex flex-col gap-4">
          <input type="email" placeholder="email" name="email" className="
          w-full focus-visible:outline-none p-2 rounded bg-white/30
          placeholder:relative placeholder:transition-[left,box-shadow] placeholder:left-0
          focus-visible:placeholder:left-4 focus-visible:shadow
          " />
          <input type="password" placeholder="password" name="password" className="
          w-full focus-visible:outline-none p-2 rounded bg-white/30
          placeholder:relative placeholder:transition-[left,box-shadow] placeholder:left-0
          focus-visible:placeholder:left-4 focus-visible:shadow
          " />
          <button type="submit" className="px-4 py-2 rounded bg-cyan-600 text-white cursor-pointer">Submit</button>
        </form>
      </div>
    </section>
  </>
}