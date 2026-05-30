import { useCallback, useEffect, useState } from 'react'
import { createLoanRequest, getMyLoanRequests } from '../services/loan.service'

function LoanRequest() {
  const [requests, setRequests] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    montoSolicitado: '',
    plazoMeses: '',
    destinoPrestamo: ''
  })

  const loadRequests = useCallback(async () => {
    try {
      const data = await getMyLoanRequests()
      setRequests(data || [])
    } catch {
      setError('No fue posible cargar las solicitudes.')
    }
  }, [])

  useEffect(() => {
    loadRequests()
  }, [loadRequests])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    try {
      await createLoanRequest({
        montoSolicitado: Number(form.montoSolicitado),
        plazoMeses: Number(form.plazoMeses),
        destinoPrestamo: form.destinoPrestamo
      })

      setMessage('Solicitud de préstamo enviada correctamente.')
      setForm({
        montoSolicitado: '',
        plazoMeses: '',
        destinoPrestamo: ''
      })
      loadRequests()
    } catch {
      setError('No fue posible registrar la solicitud de préstamo.')
    }
  }

  return (
    <div>
      <h2 className="page-title">Solicitud de préstamo</h2>

      <div className="two-column">
        <div className="card">
          <h3>Nueva solicitud</h3>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="form">
            <label>Monto solicitado</label>
            <input
              type="number"
              name="montoSolicitado"
              value={form.montoSolicitado}
              onChange={handleChange}
              min="500"
              required
            />

            <label>Plazo en meses</label>
            <input
              type="number"
              name="plazoMeses"
              value={form.plazoMeses}
              onChange={handleChange}
              min="1"
              required
            />

            <label>Destino del préstamo</label>
            <textarea
              name="destinoPrestamo"
              value={form.destinoPrestamo}
              onChange={handleChange}
              rows="4"
              required
            />

            <button className="btn-primary" type="submit">
              Enviar solicitud
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Mis solicitudes</h3>

          <table className="data-table">
            <thead>
              <tr>
                <th>Monto</th>
                <th>Plazo</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.idSolicitudPrestamo || request.id_solicitud_prestamo}>
                  <td>Q {Number(request.montoSolicitado || request.monto_solicitado || 0).toFixed(2)}</td>
                  <td>{request.plazoMeses || request.plazo_meses} meses</td>
                  <td>{request.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {requests.length === 0 && (
            <p className="empty-text">No hay solicitudes registradas.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoanRequest