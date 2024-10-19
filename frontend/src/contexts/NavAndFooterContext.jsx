import { createContext } from "react";
import { NavBar } from "../components/navbar/NavBar";

export const NavAndFooterContext = createContext()

export const NavAndFooterContextProvider = ({ children }) => {
    return (
        <NavAndFooterContext.Provider
            value={''}
        >
            <NavBar />

            {children}
        </NavAndFooterContext.Provider>
    )
}