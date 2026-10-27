import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NAV_ITEMS = [
  { href: '/', label: 'Главная' },
  { href: '/schedule', label: 'Расписание' },
  { href: '/speakers', label: 'Спикеры' },
];

/**
 * Layout - общий каркас всех страниц: навигация и подвал.
 *
 * Пункты меню - это Nav.Link, отрисованные как Link из next/link
 * (свойство as). Так ссылки сохраняют оформление Bootstrap, а переход
 * между страницами выполняется на клиенте без полной перезагрузки.
 */
function Layout({ children }) {
  const { pathname } = useRouter();

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar expand="md" bg="dark" data-bs-theme="dark" className="site-nav py-3">
        <Container>
          <Navbar.Brand as={Link} href="/">
            <img src="/icons/logo-devconf-full-inverse.svg" alt="DEVCONF 2026" height="32" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto gap-md-2">
              {NAV_ITEMS.map((item) => (
                <Nav.Link key={item.href} as={Link} href={item.href} active={isActive(item.href)}>
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-grow-1">{children}</main>

      <footer className="py-4 border-top">
        <Container>
          <p className="mb-0 small text-body-secondary">
            DEVCONF 2026 · Лабораторная работа № 25 · Next.js, React Bootstrap, Redux Toolkit
          </p>
        </Container>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
