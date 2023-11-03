import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "src/components/NavBar/NavBar";
import { AuthContext } from "src/context/auth/AuthContext"
import Header from "src/pages/Adm-User/Header/Header";


const AdmRoutes = () => {
  const { user, singout } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role !== 'adm') {
      console.log(user?.role)
      // singout()
      navigate('/login')
    }
  }, [navigate, singout, user?.role])

  return (
    <>
      <Header />
      <Outlet />
      <NavBar />
    </>
  )
}

export default AdmRoutes