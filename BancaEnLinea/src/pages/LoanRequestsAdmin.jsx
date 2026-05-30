import { useCallback, useEffect, useState } from 'react'
import {
  approveLoanRequest,
  getLoanRequests,
  rejectLoanRequest
} from '../services/loan.service'

function LoanRequestsAdmin() {
  const [requests, setRequests] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const loadRequests = useCallback(async () => {
    try {
      const data = await getLoanRequests('PENDIENTE')
      setRequests(data || [])
    } catch {
      setError('No fue posible cargar las solicitudes pendientes.')
    }
  }, [])

  useEffect(() => {
    loadRequests()
  }, [loadRequests])

  const approve = async (id) => {
    try {
      await approveLoanRequest(id, {
        montoAprobado: 10000,
        tasaInteres: 12,
        plazoMeses: 12
      })

      setMessage('Solicitud aprobada correctamente.')
      setError('')
      loadRequests()
    } catch {
      setError('No fue posible aprobar la solicitud.')
    }
  }

  const reject = async (id) => {
    try {
      await rejectLoanRequest(id, 'Solicitud rechazada por validación administrativa.')
      setMessage('Solicitud rechazada correctamente.')
      setError('')
      loadRequests()
    } catch {
      setError('No fue posible rechazar la solicitud.')
    }
  }

  return (
    <div>
      <h2 className="page-title">Solicitudes de préstamo</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Monto</th>
              <th>Plazo</th>
              <th>Destino</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => {
              const id = request.idSolicitudPrestamo || request.id_solicitud_prestamo

              return (
                <tr key={id}>
                  <td>#{id}</td>
                  <td>Q {Number(request.montoSolicitado || request.monto_solicitado || 0).toFixed(2)}</td>
                  <td>{request.plazoMeses || request.plazo_meses} meses</td>
                  <td>{request.destinoPrestamo || request.destino_prestamo}</td>
                  <td>{request.estado}</td>
                  <td className="actions-cell">
                    <button className="btn-primary" onClick={() => approve(id)}>
                      Aprobar
                    </button>
                    <button className="btn-danger" onClick={() => reject(id)}>
                      Rechazar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {requests.length === 0 && (
          <p className="empty-text">No hay solicitudes pendientes.</p>
        )}
      </div>
    </div>
  )
}

export default LoanRequestsAdmin