import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { request } from '@/api/request'
export default function Home() {
    const navigate = useNavigate()
    const navigateBtn = async () => {
      let res = await request('/test')
        navigate('/testList')
    }
  return (
    <>
        <Outlet />
        <button onClick={navigateBtn}>跳转</button>
    </>
  )
}
