import { useCallback, useEffect, useState } from 'react'
import { getMyLoans } from '../services/loan.service'

function Loans() {
  const [loans, setLoans] = useState([])
  const [error, setError] = useState('')

  const loadLoans = useCallback(async () => {
    try {
      const data = await getMyLoans()
      setLoans(data || [])
    } catch {
      setError('No fue posible cargar los préstamos.')
    }
  }, [])

  useEffect(() => {
    loadLoans()
  }, [loadLoans])

  return (
    <div>
      <h2 className="page-title">Mis préstamos</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Préstamo</th>
              <th>Monto aprobado</th>
              <th>Tasa</th>
              <th>Plazo</th>
              <th>Saldo pendiente</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan.idPrestamo || loan.id_prestamo}>
                <td>#{loan.idPrestamo || loan.id_prestamo}</td>
                <td>Q {Number(loan.montoAprobado || loan.monto_aprobado || 0).toFixed(2)}</td>
                <td>{loan.tasaInteres || loan.tasa_interes}%</td>
                <td>{loan.plazoMeses || loan.plazo_meses} meses</td>
                <td>Q {Number(loan.saldoPendiente || loan.saldo_pendiente || 0).toFixed(2)}</td>
                <td>{loan.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {loans.length === 0 && (
          <p className="empty-text">No hay préstamos para mostrar.</p>
        )}
      </div>
    </div>
  )
}

export default Loans