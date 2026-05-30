import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-badge">GT</div>
          <div>
            <h2>Banco Chapín</h2>
            <p>Banca electrónica</p>
          </div>
        </div>

        <nav className="menu">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/accounts">Cuentas</NavLink>
          <NavLink to="/transfers">Transferencias</NavLink>
          <NavLink to="/loan-request">Solicitar préstamo</NavLink>
          <NavLink to="/loans">Préstamos</NavLink>
          <NavLink to="/payments">Pagos</NavLink>

          <div className="menu-separator" />

          <NavLink to="/admin">Administrador</NavLink>
          <NavLink to="/admin/loan-requests">Solicitudes</NavLink>
          <NavLink to="/admin/users">Usuarios</NavLink>
          <NavLink to="/reports">Reportes</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Sistema Web Bancario</h1>
            <p>Gestión de cuentas, transferencias, préstamos y pagos</p>
          </div>
          <span className="environment-label">Ambiente académico</span>
        </header>

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default Layout