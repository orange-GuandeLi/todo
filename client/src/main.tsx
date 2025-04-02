import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { HTTPException } from 'hono/http-exception'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failCount, err) => {
        if (err instanceof HTTPException && err.status == 401) {
          return false;
        }

        return failCount < 2;
      },
    },
  },
  queryCache: new QueryCache({
    onError: (err) => {
      toast.error(err.message);
      if (err instanceof HTTPException && err.status == 401) {
        router.navigate({
          to: "/auth",
        });
      }
    }
  }),
  mutationCache: new MutationCache({
    onError: (err) => {
      toast.error(err.message);
    }
  })
});

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </QueryClientProvider>
  </StrictMode>,
);
