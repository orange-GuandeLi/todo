import { createRoute } from "@tanstack/react-router";
import { Button } from "./pages/Button";
import { Select } from "./pages/Select";
import { Layout } from "./Layout";
import { rootRoute } from "@src/route";
import { Design } from "./Design";

const designRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'design',
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => designRoute,
  path: "/",
  component: Design,
});

const buttonRoute = createRoute({
  getParentRoute: () => designRoute,
  path: 'button',
  component: Button,
});

const selectRoute = createRoute({
  getParentRoute: () => designRoute,
  path: 'select',
  component: Select,
});

export const designRouteTree = designRoute.addChildren([
  indexRoute,
  buttonRoute,
  selectRoute,
])