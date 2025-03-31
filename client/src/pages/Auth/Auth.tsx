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
      <div className="bg-white/30 backdrop-blur-xs p-4 rounded flex flex-col gap-4">
        <h3>Sign In</h3>
        <form onSubmit={signInTigger}>
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit" className="px-4 py-2 rounded bg-cyan-600 text-white">Submit</button>
        </form>
      </div>
    </section>
  </>
}