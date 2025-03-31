import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = 'true' }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    if (authentication && authStatus != authentication) {
      navigate('/login')
    } else if (!authentication && authStatus !== authentication) {
      navigate('/')
    }
    // if (authStatus === true) {
    //   navigate("/")
    // } else if (authStatus === false) {
    //   navigate("/login")
    // }
    authStatus === true ? true : false
    // console.log(authStatus, authValue)
    setLoader(false)
  }, [authStatus, navigate, authentication])

  return loader ? <p className="text-center min-h-screen grid place-items-center text-xl font-serif font-bold">Loading......</p> : children;
}


