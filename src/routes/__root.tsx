import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Header from '../components/Header'
import { NavbarProvider } from '@/components/ui/navbar'
import { Toaster } from 'sonner'

export const Route = createRootRoute({
  component: () => (
    <>
      <NavbarProvider>
        <Header />
        <Outlet/>
        <Toaster />
      </NavbarProvider>
      {/* <Header />
      <Outlet /> */}
      <TanStackRouterDevtools />
    </>
  ),
})
