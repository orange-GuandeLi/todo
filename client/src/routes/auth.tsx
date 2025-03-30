import { Auth } from "@src/pages/Auth/Auth";
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: Auth,
});
