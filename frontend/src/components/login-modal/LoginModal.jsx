import { useContext, useState } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import { LoginContext } from '../../contexts/LoginContext'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const LoginModal = ({ showModal, setShowModal }) => {
    const { userLogin } = useContext(LoginContext)
    const [inputData, setInputData] = useState({
        username: '',
        password: ''
    })
    const [isLoading, setLoading] = useState(false)
    const [alert, setAlert] = useState('')
    const { t } = useTranslation()

    const handleInputData = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
    }

    const validateInput = () => {
        return inputData.username && inputData.password.length >= 8
    }

    const login = async () => {
        setLoading(true)

        try {
            await userLogin(inputData)
            setShowModal(false)
        } catch (error) {
            setAlert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal centered show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton />
            <Modal.Body>
                <Form>
                    <Form.Control
                        type='text'
                        name='username'
                        placeholder='username'
                        onChange={(e) => handleInputData(e)}
                        value={inputData.username}
                    />
                    <Form.Control
                        type='password'
                        name='password'
                        placeholder='password'
                        onChange={(e) => handleInputData(e)}
                        value={inputData.password}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex flex-column gap-3'>
                <div className='d-flex justify-content-center align-items-center gap-5'>
                    <Link to='/register' className='text-unstyled fw-bold'>{t('createAccount')}</Link>
                    <Button
                        variant="primary"
                        disabled={!validateInput()}
                        onClick={() => login()}
                    >
                        {isLoading && (
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                className="me-3"
                            />
                        )}
                        Login
                    </Button>
                </div>
                <div className='text-danger'>{alert}</div>
            </Modal.Footer>
        </Modal>
    )
}