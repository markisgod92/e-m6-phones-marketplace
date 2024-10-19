import { useContext, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { LoginContext } from '../../contexts/LoginContext'

export const LoginModal = ({ showModal, setShowModal }) => {
    const {userLogin} = useContext(LoginContext)
    const [inputData, setInputData] = useState({
        username: '',
        password: ''
    })
    const [alert, setAlert] = useState('')

    console.log(inputData)

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
        try {
            await userLogin(inputData)
            setShowModal(false)
        } catch (error) {
            setAlert(error.message)
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
                <Button
                    variant="primary"
                    disabled={!validateInput()}
                    onClick={() => login()}
                >
                    Login
                </Button>
                <div className='text-danger'>{alert}</div>
            </Modal.Footer>
        </Modal>
    )
}