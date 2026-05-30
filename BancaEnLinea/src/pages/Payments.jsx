import { useCallback, useEffect, useState } from 'react'
import { getMyAccounts } from '../services/account.service'
import { getMyLoans } from '../services/loan.service'
import { createLoanPayment, getMyPayments } from '../services/payment.service'

function Payments() {
  const [accounts, setAccounts] = useState([])
  const [loans, setLoans] = useState([])
  const [payments, setPayments] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    idPrestamo: '',
    idCuota: '',
    idCuentaOrigen: '',
    montoPagado: ''
  })

  const loadData = useCallback(async () => {
    try {
      const [accountsData, loansData, paymentsData] = await Promise.all([
        getMyAccounts(),
        getMyLoans(),
        getMyPayments()
      ])

      setAccounts(accountsData || [])
      setLoans(loansData || [])
      setPayments(paymentsData || [])
    } catch {
      setError('No fue posible cargar información de pagos.')
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

    try {
      await createLoanPayment({
        idPrestamo: Number(form.idPrestamo),
        idCuota: Number(form.idCuota),
        idCuentaOrigen: Number(form.idCuentaOrigen),
        montoPagado: Number(form.montoPagado)
      })

      setMessage('Pago registrado correctamente.')
      setForm({
        idPrestamo: '',
        idCuota: '',
        idCuentaOrigen: '',
        montoPagado: ''
      })
      loadData()
    } catch {
      setError('No fue posible registrar el pago. Verifique saldo y datos de la cuota.')
    }
  }

  return (
    <div>
      <h2 className="page-title">Pago de préstamo</h2>

      <div className="two-column">
        <div className="card">
          <h3>Registrar pago</h3>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="form">
            <label>Préstamo</label>
            <select name="idPrestamo" value={form.idPrestamo} onChange={handleChange} required>
              <option value="">Seleccione préstamo</option>
              {loans.map((loan) => (
                <option key={loan.idPrestamo || loan.id_prestamo} value={loan.idPrestamo || loan.id_prestamo}>
                  #{loan.idPrestamo || loan.id_prestamo} - Saldo Q {Number(loan.saldoPendiente || loan.saldo_pendiente || 0).toFixed(2)}
                </option>
              ))}
            </select>

            <label>ID cuota</label>
            <input
              type="number"
              name="idCuota"
              value={form.idCuota}
              onChange={handleChange}
              required
            />

            <label>Cuenta origen</label>
            <select name="idCuentaOrigen" value={form.idCuentaOrigen} onChange={handleChange} required>
              <option value="">Seleccione cuenta</option>
              {accounts.map((account) => (
                <option key={account.idCuenta || account.id_cuenta} value={account.idCuenta || account.id_cuenta}>
                  {account.numeroCuenta || account.numero_cuenta} - Q {Number(account.saldoActual || account.saldo_actual || 0).toFixed(2)}
                </option>
              ))}
            </select>

            <label>Monto a pagar</label>
            <input
              type="number"
              name="montoPagado"
              value={form.montoPagado}
              onChange={handleChange}
              min="1"
              required
            />

            <button className="btn-primary" type="submit">
              Registrar pago
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Historial de pagos</h3>

          <table className="data-table">
            <thead>
              <tr>
                <th>Préstamo</th>
                <th>Cuota</th>
                <th>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr key={payment.idPagoPrestamo || payment.id_pago_prestamo}>
                  <td>#{payment.idPrestamo || payment.id_prestamo}</td>
                  <td>{payment.idCuota || payment.id_cuota}</td>
                  <td>Q {Number(payment.montoPagado || payment.monto_pagado || 0).toFixed(2)}</td>
                  <td>{payment.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {payments.length === 0 && (
            <p className="empty-text">No hay pagos registrados.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Payments