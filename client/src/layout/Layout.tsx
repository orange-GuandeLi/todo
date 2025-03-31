import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Outlet } from '@tanstack/react-router';

export function Layout() {
  return (
    <main className="w-svw h-svh bg-[url(assets/images/bg.jpg)] bg-center bg-cover overflow-hidden flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}