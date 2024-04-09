import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
export default function Home() {
    const navigate = useNavigate()
    const navigateBtn = () => {
        navigate('/testList')
    }
  return (
    <>
        <Outlet />
        <button onClick={navigateBtn}>跳转</button>
    </>
  )
}
