import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext()

export const LoginContextProvider = ({ children }) => {
    const [isUserAuthenticated, setUserAuthenticated] = useState(false)
    const [loggedUser, setLoggedUser] = useState({})

    console.log('Logged user: ', loggedUser)

    const userLogin = async (credentials) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if(response.ok) {
                const authentication = await response.json()
                const userData = {
                    username: authentication.userFound.username,
                    id: authentication.userFound._id,
                    email: authentication.userFound.email,
                    avatar: authentication.userFound.avatar
                }
                localStorage.setItem('user', JSON.stringify(userData))
                setLoggedUser(userData)
                setUserAuthenticated(true)
            } else {
                const errorResponse = await response.json()
                throw new Error(errorResponse.message)
            }
        } catch (error) {
            throw error
        }
    }

    const userLogout = () => {
        localStorage.removeItem('user')
        setLoggedUser({})
        setUserAuthenticated(false)
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setLoggedUser(JSON.parse(storedUser))
            setUserAuthenticated(true)
        }
    }, [])

    return (
        <LoginContext.Provider
            value={{ isUserAuthenticated, setUserAuthenticated, loggedUser, setLoggedUser, userLogin, userLogout }}
        >
            { children }
        </LoginContext.Provider>
    )
}