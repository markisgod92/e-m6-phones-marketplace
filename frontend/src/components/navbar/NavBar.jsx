import { useContext, useState } from "react"
import { Button, Container, Dropdown } from "react-bootstrap"
import { LoginContext } from "../../contexts/LoginContext"
import './navbar.css'
import { UserDropdown } from "./UserDropdown"
import { Link } from "react-router-dom"
import { LoginModal } from "../login-modal/LoginModal"

export const NavBar = () => {
    const { isUserAuthenticated } = useContext(LoginContext)
    const [showModal, setShowModal] = useState(false)

    return (
        <nav>
            <Container>
                <div className="d-flex justify-content-between align-items-center py-3">
                    <div>Logo</div>
                    <ul className="d-flex justify-content-center align-items-center gap-3 list-unstyled">
                        <Link to={'/'} className="text-decoration-none text-body">
                            <li>Home</li>
                        </Link>
                        <li>About</li>
                        <li>Privacy Policy</li>
                    </ul>
                    <div>
                        {!isUserAuthenticated && (
                            <Button variant="primary" onClick={() => setShowModal(true)}>Login</Button>
                        )}

                        {isUserAuthenticated && (
                            <UserDropdown />
                        )}
                    </div>
                </div>
            </Container>
            <LoginModal showModal={showModal} setShowModal={setShowModal} />
        </nav>
    )
}