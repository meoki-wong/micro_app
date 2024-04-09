
import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import UseRoute from './index'

const AuthRoute = () => {
    const location = useLocation()
    let navigate = useNavigate()
    useEffect(() => {
        routeInterceptor()
    }, [location.pathname])

    const routeInterceptor = () => {
        const isAuthenticated = true
        if (isAuthenticated) {
            // 路由守卫
            // navigate('/login')
        }
    }
    
    
    return (
        <UseRoute />
    )
}


export default AuthRoute
/**
 * 
 * 守卫
 */




