import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { Todo } from './pages/Todo/Todo';
import { Auth } from './pages/Auth/Auth';
import { Layout } from './pages/Layout/Layout';
import { designRouteTree } from './pages/Design/route';
import { Index } from './pages/Index/Index';

export const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

const todoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'todo',
  component: Todo,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'auth',
  component: Auth,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  todoRoute,
  designRouteTree,
]);

export const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}