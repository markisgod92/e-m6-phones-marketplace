import { useContext, useState } from "react"
import { Button, Container, Dropdown } from "react-bootstrap"
import { LoginContext } from "../../contexts/LoginContext"
import './navbar.css'
import { UserDropdown } from "./UserDropdown"
import { Link } from "react-router-dom"
import { LoginModal } from "../login-modal/LoginModal"
import { useTranslation } from "react-i18next"

export const NavBar = () => {
    const { isUserAuthenticated } = useContext(LoginContext)
    const [showModal, setShowModal] = useState(false)
    const { t, i18n } = useTranslation()

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }

    return (
        <nav>
            <Container>
                <div className="d-flex justify-content-between align-items-center py-3">
                    <div>Logo</div>
                    <ul className="d-flex justify-content-center align-items-center gap-3 list-unstyled">
                        <Link to={'/'} className="text-decoration-none text-body">
                            <li>Home</li>
                        </Link>
                        <li>{t('aboutUs')}</li>
                        <li>Privacy Policy</li>
                    </ul>
                    <div className="d-flex align-items-center gap-3">
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="secondary-outline"
                            >
                                {i18n.language}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => changeLanguage('it')}>Italiano</Dropdown.Item>
                                <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {isUserAuthenticated && (
                            <Link to='/sell'>
                                <Button
                                    variant="primary"
                                >
                                    {t('sellProduct')}
                                </Button>
                            </Link>
                        )}
                        <div>
                            {!isUserAuthenticated && (
                                <Button variant="primary" onClick={() => setShowModal(true)}>Login</Button>
                            )}

                            {isUserAuthenticated && (
                                <UserDropdown />
                            )}
                        </div>
                    </div>
                </div>
            </Container>
            <LoginModal showModal={showModal} setShowModal={setShowModal} />
        </nav>
    )
}