import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/footer/Footer"
import { Outlet } from "react-router-dom"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(authService.getCurrentUser())
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      }).finally(() => setLoading(false))
  }, [])

  return !loading ? (

    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>

  ) : (<p className="text-center min-h-screen grid place-items-center text-xl font-serif font-bold">Loading......</p>)
}

export default App
