import { useState } from 'react'
import {
  calculateArrears,
  getArrearsReport,
  getLoansReport,
  getPaymentsReport,
  getTransfersReport
} from '../services/report.service'

function Reports() {
  const [reportType, setReportType] = useState('loans')
  const [data, setData] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadReport = async () => {
    setError('')
    setMessage('')

    try {
      let result = []

      if (reportType === 'loans') result = await getLoansReport()
      if (reportType === 'arrears') result = await getArrearsReport()
      if (reportType === 'transfers') result = await getTransfersReport()
      if (reportType === 'payments') result = await getPaymentsReport()

      setData(Array.isArray(result) ? result : [result])
      setMessage('Reporte generado correctamente.')
    } catch {
      setError('No fue posible generar el reporte.')
    }
  }

  const runArrearsCalculation = async () => {
    try {
      await calculateArrears()
      setMessage('Cálculo de mora ejecutado correctamente.')
    } catch {
      setError('No fue posible ejecutar el cálculo de mora.')
    }
  }

  return (
    <div>
      <h2 className="page-title">Reportes</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card report-controls">
        <label>Tipo de reporte</label>
        <select value={reportType} onChange={(event) => setReportType(event.target.value)}>
          <option value="loans">Préstamos</option>
          <option value="arrears">Mora</option>
          <option value="transfers">Transferencias</option>
          <option value="payments">Pagos</option>
        </select>

        <button className="btn-primary" onClick={loadReport}>
          Generar reporte
        </button>

        <button className="btn-secondary" onClick={runArrearsCalculation}>
          Calcular mora
        </button>
      </div>

      <div className="card">
        <h3>Resultado</h3>

        <pre className="json-viewer">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default Reports