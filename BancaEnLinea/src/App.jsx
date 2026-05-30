import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Accounts from './pages/Accounts'
import Transfers from './pages/Transfers'
import LoanRequest from './pages/LoanRequest'
import Loans from './pages/Loans'
import Payments from './pages/Payments'
import AdminDashboard from './pages/AdminDashboard'
import LoanRequestsAdmin from './pages/LoanRequestsAdmin'
import UsersAdmin from './pages/UsersAdmin'
import Reports from './pages/Reports'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/loan-request" element={<LoanRequest />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/loan-requests" element={<LoanRequestsAdmin />} />
          <Route path="/admin/users" element={<UsersAdmin />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App