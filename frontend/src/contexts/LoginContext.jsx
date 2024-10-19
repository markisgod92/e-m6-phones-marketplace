import { createContext, useState } from "react";

export const LoginContext = createContext()

export const LoginContextProvider = ({ children }) => {
    const [isUserAuthenticated, setUserAuthenticated] = useState(true)
    const [loggedUser, setLoggedUser] = useState({
        username: 'pinco_pallino',
        avatar: 'https://picsum.photos/200/300'
    })

    const userLogin = () => {
        setUserAuthenticated(prev => !prev)
    }

    return (
        <LoginContext.Provider
            value={{ isUserAuthenticated, loggedUser, userLogin }}
        >
            { children }
        </LoginContext.Provider>
    )
}