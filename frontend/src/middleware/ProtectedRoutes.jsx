import { Outlet } from "react-router-dom"
import { Homepage } from '../pages/Homepage'

const isAuth = () => {
    return JSON.parse(localStorage.getItem('Auth'))
}

export const ProtectedRoutes = () => {
    const isAuthorized = isAuth()
    return isAuthorized ? <Outlet /> : <Homepage />
}