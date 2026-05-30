import { useCallback, useEffect, useState } from 'react'
import { getMyAccounts } from '../services/account.service'
import { createLoanRequest, getMyLoanRequests } from '../services/loan.service'

function LoanRequest() {
  const [accounts, setAccounts] = useState([])
  const [requests, setRequests] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    idUsuario: '1',
    idCuentaDesembolso: '',
    montoSolicitado: '',
    plazoMeses: '',
    destinoPrestamo: ''
  })

  const loadData = useCallback(async () => {
    try {
      const [accountsData, requestsData] = await Promise.all([
        getMyAccounts(),
        getMyLoanRequests()
      ])

      setAccounts(accountsData || [])
      setRequests(requestsData || [])
    } catch {
      setError('No fue posible cargar las cuentas o solicitudes.')
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!form.idCuentaDesembolso) {
      setError('Debe seleccionar una cuenta para desembolso.')
      return
    }

    try {
      const now = new Date().toISOString()

      const payload = {
        idSolicitudPrestamo: 0,
        idUsuario: Number(form.idUsuario),
        idCuentaDesembolso: Number(form.idCuentaDesembolso),
        montoSolicitado: Number(form.montoSolicitado),
        plazoMeses: Number(form.plazoMeses),
        destinoPrestamo: form.destinoPrestamo,
        estado: 'PENDIENTE',
        fechaSolicitud: now,
        observaciones: 'Solicitud generada desde el sistema web',
        aprobadoPor: null,
        fechaResolucion: null
      }

      await createLoanRequest(payload)

      setMessage('Préstamo solicitado correctamente.')
      setForm({
        idUsuario: '1',
        idCuentaDesembolso: '',
        montoSolicitado: '',
        plazoMeses: '',
        destinoPrestamo: ''
      })

      loadData()
    } catch (err) {
      console.error(err)
      setError('No fue posible generar la solicitud de préstamo. Verifique los datos enviados.')
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
            <label>ID usuario</label>
            <input
              type="number"
              name="idUsuario"
              value={form.idUsuario}
              onChange={handleChange}
              min="1"
              required
            />

            <label>Cuenta para desembolso</label>
            <select
              name="idCuentaDesembolso"
              value={form.idCuentaDesembolso}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una cuenta</option>

              {accounts.map((account) => {
                const id = account.idCuenta || account.id_cuenta
                const numero = account.numeroCuenta || account.numero_cuenta
                const tipo = account.tipoCuenta || account.tipo_cuenta
                const saldo = account.saldoActual || account.saldo_actual || 0

                return (
                  <option key={id} value={id}>
                    {numero} - {tipo} - Q {Number(saldo).toFixed(2)}
                  </option>
                )
              })}
            </select>

            <label>Monto solicitado</label>
            <input
              type="number"
              name="montoSolicitado"
              value={form.montoSolicitado}
              onChange={handleChange}
              min="500"
              step="0.01"
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
              Generar préstamo
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Solicitudes generadas</h3>

          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Cuenta desembolso</th>
                <th>Monto</th>
                <th>Plazo</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => {
                const id = request.idSolicitudPrestamo || request.id_solicitud_prestamo

                return (
                  <tr key={id}>
                    <td>#{id}</td>
                    <td>{request.idUsuario || request.id_usuario}</td>
                    <td>{request.idCuentaDesembolso || request.id_cuenta_desembolso}</td>
                    <td>
                      Q {Number(request.montoSolicitado || request.monto_solicitado || 0).toFixed(2)}
                    </td>
                    <td>{request.plazoMeses || request.plazo_meses} meses</td>
                    <td>{request.estado}</td>
                  </tr>
                )
              })}
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