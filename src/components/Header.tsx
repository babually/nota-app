import { Link } from '@/components/ui/link'
import { Navbar, NavbarGap, NavbarItem, NavbarProvider, NavbarSection, NavbarSpacer, NavbarStart } from '@/components/ui/navbar'

export default function Header() {
  return (
    // <header className="p-2 flex gap-2 bg-white text-black justify-between">
    //   <nav className="flex flex-row">
    //     <div className="px-2 font-bold">
    //       <Link to="/">Home</Link>
    //       <Link to="/tasks">Task</Link>
    //     </div>
    //   </nav>
    // </header>
    <NavbarProvider>
      <Navbar isSticky>
        <NavbarStart>
          <Link
            className="flex items-center gap-x-2 font-medium"
            aria-label="Goto documentation of Navbar"
            href="/"
          >
            <span>
              Nota <span className="text-muted-fg">App</span>
            </span>
          </Link>
        </NavbarStart>
        <NavbarGap />
        <NavbarSection>
          {/* <NavbarItem href="/">Home</NavbarItem> */}
          <NavbarItem href="/tasks">Tasks</NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection>
          <NavbarItem href="/login">Login</NavbarItem>
          <NavbarItem href="/register">Register</NavbarItem>
        </NavbarSection>
      </Navbar>     
    </NavbarProvider>
  )
}
