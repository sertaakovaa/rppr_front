import { Link, Outlet } from 'react-router-dom'
import {
  Navbar,
  NavbarContainer,
  NavbarItem,
  NavbarMenu,
  NavbarToggle,
} from '../components/ui-kit'
import { useAuth } from '../hooks/useAuth'
import { isFullUser } from '../types/auth'

export function MainLayout() {
  const { user, isAuthenticated, logout } = useAuth()

  const displayName = user
    ? isFullUser(user)
      ? `${user.first_name} ${user.last_name}`
      : user.login
    : null

  return (
    <>
      <Navbar>
        <NavbarContainer>
          <Link to="/" className="navbar__brand">
            RPPR Hotels
          </Link>
          <NavbarToggle />
          <NavbarMenu>
            {isAuthenticated ? (
              <>
                <span className="navbar__item" style={{ cursor: 'default' }}>
                  Привет, {displayName}
                </span>
                <NavbarItem
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    logout()
                  }}
                >
                  Выйти
                </NavbarItem>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar__item">
                  Вход
                </Link>
                <Link to="/register" className="navbar__item">
                  Регистрация
                </Link>
              </>
            )}
          </NavbarMenu>
        </NavbarContainer>
      </Navbar>
      <main>
        <Outlet />
      </main>
    </>
  )
}
