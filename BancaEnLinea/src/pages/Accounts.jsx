import { useEffect, useState } from 'react'
import { getMyAccounts } from '../services/account.service'

function Accounts() {
  const [accounts, setAccounts] = useState([])
  const [error, setError] = useState('')

  const loadAccounts = async () => {
    try {
      const data = await getMyAccounts()
      setAccounts(data || [])
    } catch {
      setError('No fue posible obtener las cuentas.')
    }
  }

  useEffect(() => {
    loadAccounts()
  }, [])

  return (
    <div>
      <h2 className="page-title">Mis cuentas</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>No. cuenta</th>
              <th>Tipo</th>
              <th>Saldo</th>
              <th>Estado</th>
              <th>Fecha apertura</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account) => (
              <tr key={account.idCuenta || account.id_cuenta}>
                <td>{account.numeroCuenta || account.numero_cuenta}</td>
                <td>{account.tipoCuenta || account.tipo_cuenta}</td>
                <td>Q {Number(account.saldoActual || account.saldo_actual || 0).toFixed(2)}</td>
                <td>
                  <span className="badge badge-success">
                    {account.estado}
                  </span>
                </td>
                <td>{account.fechaApertura || account.fecha_apertura}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {accounts.length === 0 && (
          <p className="empty-text">No hay cuentas para mostrar.</p>
        )}
      </div>
    </div>
  )
}

export default Accounts