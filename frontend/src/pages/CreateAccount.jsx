import { useTranslation } from 'react-i18next';
import { NavAndFooterContextProvider } from '../contexts/NavAndFooterContext';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';

export const CreateAccount = () => {
    const { t } = useTranslation()
    const [inputData, setInputData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: ''
    })
    const { isUserAuthenticated, setLoggedUser, setUserAuthenticated } = useContext(LoginContext)
    const navigate = useNavigate()
    const [isUsernameUnique, setUsernameUnique] = useState(true)
    const [isEmailUnique, setEmailUnique] = useState(true)

    const validateInput = () => {
        return inputData.username && inputData.email && inputData.password.length >= 8 && inputData.avatar
    }

    const handleInput = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
    }

    const checkUnique = async (key, value) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/check-user?${key}=${value}`)
            if (response.ok) {
                const data = await response.json()
                return data.isUnique
            }
            return false
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const handleUsernameBlur = async () => {
        const isUnique = await checkUnique('username', inputData.username)
        setUsernameUnique(isUnique)
    }

    const handleEmailBlur = async () => {
        const isUnique = await checkUnique('email', inputData.email)
        setEmailUnique(isUnique)
    }

    const createAccount = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/create`, {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify(inputData)
            })

            if (response.ok) {
                const data = await response.json()
                setLoggedUser(data.result)
                setUserAuthenticated(true)
                navigate('/')
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <NavAndFooterContextProvider>
            <main>
                <Container>
                    <Row className='mb-3'>
                        <h3 className='text-center'>{t('createAccount')}</h3>
                    </Row>
                    {isUserAuthenticated && (
                        <Row>
                            <div className='text-center'>
                                {t('alreadyLogged')}
                            </div>
                        </Row>
                    )}


                    {!isUserAuthenticated && (
                        <>
                            <Row>
                                <Form className='d-flex flex-column gap-3'>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm='4'>
                                            Username:
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type='text'
                                                name='username'
                                                value={inputData.username}
                                                onChange={(e) => handleInput(e)}
                                                onBlur={handleUsernameBlur}
                                            />
                                        </Col>
                                        <Col sm={12}>
                                            {!isUsernameUnique && (
                                                <div className='text-danger text-end'>
                                                    {t('usernameNotUnique')}
                                                </div>
                                            )}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm='4'>
                                            Email:
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type='email'
                                                name='email'
                                                value={inputData.email}
                                                onChange={(e) => handleInput(e)}
                                                onBlur={handleEmailBlur}
                                            />
                                        </Col>
                                        <Col sm={12}>
                                            {!isEmailUnique && (
                                                <div className='text-danger text-end'>
                                                    {t('emailNotUnique')}
                                                </div>
                                            )}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm='4'>
                                            Password:
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type='password'
                                                name='password'
                                                value={inputData.password}
                                                onChange={(e) => handleInput(e)}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm='4'>
                                            Avatar:
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type='text'
                                                name='avatar'
                                                value={inputData.avatar}
                                                onChange={(e) => handleInput(e)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Row>
                            <Row>
                                <div className='d-flex justify-content-center p-5'>
                                    <Button
                                        variant='primary'
                                        disabled={!validateInput()}
                                        onClick={createAccount}
                                    >
                                        {t('register')}
                                    </Button>
                                </div>
                            </Row>
                        </>
                    )}

                    <Row>

                    </Row>
                </Container>
            </main>
        </NavAndFooterContextProvider>
    )
}