import { useCallback, useEffect, useState } from 'react'
import { getAllAccounts } from '../services/account.service'
import { getAllLoans, getLoanRequests } from '../services/loan.service'
import { getUsers } from '../services/user.service'

function AdminDashboard() {
  const [summary, setSummary] = useState({
    users: 0,
    accounts: 0,
    loans: 0,
    pendingRequests: 0
  })

  const [error, setError] = useState('')

  const loadSummary = useCallback(async () => {
    try {
      const [users, accounts, loans, requests] = await Promise.all([
        getUsers(),
        getAllAccounts(),
        getAllLoans(),
        getLoanRequests('PENDIENTE')
      ])

      setSummary({
        users: users?.length || 0,
        accounts: accounts?.length || 0,
        loans: loans?.length || 0,
        pendingRequests: requests?.length || 0
      })
    } catch {
      setError('No fue posible cargar el resumen administrativo.')
    }
  }, [])

  useEffect(() => {
    loadSummary()
  }, [loadSummary])

  return (
    <div>
      <h2 className="page-title">Panel administrador</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="metrics-grid">
        <div className="metric-card">
          <span>Usuarios</span>
          <strong>{summary.users}</strong>
        </div>

        <div className="metric-card">
          <span>Cuentas</span>
          <strong>{summary.accounts}</strong>
        </div>

        <div className="metric-card">
          <span>Préstamos</span>
          <strong>{summary.loans}</strong>
        </div>

        <div className="metric-card">
          <span>Solicitudes pendientes</span>
          <strong>{summary.pendingRequests}</strong>
        </div>
      </div>

      <div className="card">
        <h3>Gestión administrativa</h3>
        <p>
          Este panel permite revisar usuarios, cuentas, solicitudes de préstamo,
          cartera activa, pagos y reportes financieros.
        </p>
      </div>
    </div>
  )
}

export default AdminDashboard