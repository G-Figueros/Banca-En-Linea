import { useCallback, useEffect, useState } from 'react'
import { getMyAccounts } from '../services/account.service'
import { getMyLoans } from '../services/loan.service'
import { getMyTransfers } from '../services/transfer.service'

function Home() {
  const [accounts, setAccounts] = useState([])
  const [loans, setLoans] = useState([])
  const [transfers, setTransfers] = useState([])
  const [error, setError] = useState('')

  const loadDashboard = useCallback(async () => {
    try {
      const [accountsData, loansData, transfersData] = await Promise.all([
        getMyAccounts(),
        getMyLoans(),
        getMyTransfers()
      ])

      setAccounts(accountsData || [])
      setLoans(loansData || [])
      setTransfers(transfersData || [])
    } catch {
      setError('No fue posible cargar el resumen del sistema.')
    }
  }, [])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  const totalBalance = accounts.reduce((sum, account) => {
    return sum + Number(account.saldoActual || account.saldo_actual || 0)
  }, 0)

  return (
    <div>
      <h2 className="page-title">Panel principal - DEMO EN VIVO</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="metrics-grid">
        <div className="metric-card">
          <span>Saldo total</span>
          <strong>Q {totalBalance.toFixed(2)}</strong>
        </div>

        <div className="metric-card">
          <span>Cuentas registradas</span>
          <strong>{accounts.length}</strong>
        </div>

        <div className="metric-card">
          <span>Préstamos activos</span>
          <strong>{loans.length}</strong>
        </div>

        <div className="metric-card">
          <span>Transferencias</span>
          <strong>{transfers.length}</strong>
        </div>
      </div>

      <div className="card">
        <h3>Resumen operativo</h3>
        <p>
          Desde esta página se puede consultar la información general del sistema,
          acceder a las cuentas, realizar transferencias, solicitar préstamos y registrar pagos.
        </p>
      </div>
    </div>
  )
}

export default Home