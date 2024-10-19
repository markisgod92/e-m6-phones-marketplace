import { useContext } from "react"
import { LoginContext } from "../../contexts/LoginContext"
import { Dropdown } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export const UserDropdown = () => {
    const {loggedUser, userLogin} = useContext(LoginContext)
    const {t} = useTranslation()

    return (
        <Dropdown>
            <Dropdown.Toggle variant="btn-link">
                <img src={loggedUser.avatar} alt="user-avatar" className="user-avatar" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Header>{loggedUser.username}</Dropdown.Header>
                <Dropdown.Item>{t('wishlist')}</Dropdown.Item>
                <Dropdown.Item>{t('cart')}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={userLogin}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}