import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="admin-page">
      <Outlet />
    </div>
  )
}

export default AdminLayout
