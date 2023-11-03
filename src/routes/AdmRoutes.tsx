import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "src/context/auth/AuthContext"

const AdmRoutes = () => {
  const { user, singout } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role !== 'adm') {
      console.log(user?.role)
      singout()
      navigate('/login')
    }
  }, [])

  return (
    <div>
      Validar usuario
      <Outlet />
    </div>
  )
}

export default AdmRoutes