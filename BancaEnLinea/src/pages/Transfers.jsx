import { useCallback, useEffect, useState } from 'react'
import { getMyAccounts } from '../services/account.service'
import { createTransfer, getMyTransfers } from '../services/transfer.service'

function Transfer() {
  const [accounts, setAccounts] = useState([])
  const [transfers, setTransfers] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    idCuentaOrigen: '',
    numeroCuentaDestino: '',
    monto: '',
    descripcion: ''
  })

  const loadData = useCallback(async () => {
    try {
      const [accountsData, transfersData] = await Promise.all([
        getMyAccounts(),
        getMyTransfers()
      ])

      setAccounts(accountsData || [])
      setTransfers(transfersData || [])
    } catch {
      setError('No fue posible cargar cuentas o transferencias.')
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
      await createTransfer({
        idCuentaOrigen: Number(form.idCuentaOrigen),
        numeroCuentaDestino: form.numeroCuentaDestino,
        monto: Number(form.monto),
        descripcion: form.descripcion
      })

      setMessage('Transferencia realizada correctamente.')
      setForm({
        idCuentaOrigen: '',
        numeroCuentaDestino: '',
        monto: '',
        descripcion: ''
      })
      loadData()
    } catch {
      setError('No fue posible realizar la transferencia. Verifique saldo y cuenta destino.')
    }
  }

  return (
    <div>
      <h2 className="page-title">Transferencias</h2>

      <div className="two-column">
        <div className="card">
          <h3>Nueva transferencia</h3>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="form">
            <label>Cuenta origen</label>
            <select name="idCuentaOrigen" value={form.idCuentaOrigen} onChange={handleChange} required>
              <option value="">Seleccione una cuenta</option>
              {accounts.map((account) => (
                <option key={account.idCuenta || account.id_cuenta} value={account.idCuenta || account.id_cuenta}>
                  {account.numeroCuenta || account.numero_cuenta} - Q {Number(account.saldoActual || account.saldo_actual || 0).toFixed(2)}
                </option>
              ))}
            </select>

            <label>Cuenta destino</label>
            <input
              name="numeroCuentaDestino"
              value={form.numeroCuentaDestino}
              onChange={handleChange}
              placeholder="Número de cuenta destino"
              required
            />

            <label>Monto</label>
            <input
              type="number"
              name="monto"
              value={form.monto}
              onChange={handleChange}
              min="1"
              required
            />

            <label>Descripción</label>
            <input
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Motivo de transferencia"
              required
            />

            <button className="btn-primary" type="submit">
              Realizar transferencia
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Historial de transferencias</h3>

          <table className="data-table">
            <thead>
              <tr>
                <th>Origen</th>
                <th>Destino</th>
                <th>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.idTransferencia || transfer.id_transferencia}>
                  <td>{transfer.cuentaOrigen || transfer.cuenta_origen}</td>
                  <td>{transfer.cuentaDestino || transfer.cuenta_destino}</td>
                  <td>Q {Number(transfer.monto || 0).toFixed(2)}</td>
                  <td>{transfer.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {transfers.length === 0 && (
            <p className="empty-text">No hay transferencias registradas.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Transfer