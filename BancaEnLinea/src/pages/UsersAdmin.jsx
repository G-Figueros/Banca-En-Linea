import { useCallback, useEffect, useState } from 'react'
import { getUsers, updateUserStatus } from '../services/user.service'

function UserAdmin() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const loadUsers = useCallback(async () => {
    try {
      const data = await getUsers()
      setUsers(data || [])
    } catch {
      setError('No fue posible obtener los usuarios.')
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const changeStatus = async (id, status) => {
    try {
      await updateUserStatus(id, status)
      setMessage('Estado actualizado correctamente.')
      setError('')
      loadUsers()
    } catch {
      setError('No fue posible actualizar el estado del usuario.')
    }
  }

  return (
    <div>
      <h2 className="page-title">Gestión de usuarios</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>DPI</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const id = user.idUsuario || user.id_usuario

              return (
                <tr key={id}>
                  <td>{user.nombres} {user.apellidos}</td>
                  <td>{user.dpi}</td>
                  <td>{user.email}</td>
                  <td>{user.rol}</td>
                  <td>{user.estado}</td>
                  <td>
                    <button
                      className="btn-secondary"
                      onClick={() => changeStatus(id, user.estado === 'ACTIVO' ? 'BLOQUEADO' : 'ACTIVO')}
                    >
                      {user.estado === 'ACTIVO' ? 'Bloquear' : 'Activar'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="empty-text">No hay usuarios registrados.</p>
        )}
      </div>
    </div>
  )
}

export default UserAdmin