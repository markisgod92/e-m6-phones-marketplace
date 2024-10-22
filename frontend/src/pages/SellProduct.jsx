import { useContext, useState } from "react"
import { NavAndFooterContextProvider } from "../contexts/NavAndFooterContext"
import { LoginContext } from "../contexts/LoginContext"
import { Button, Col, Row, Container, Form, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { CustomError } from '../exceptions/CustomError'
import { ErrorNotification } from "../components/loaderAndError/ErrorNotification"

export const SellProduct = () => {
    const { isUserAuthenticated } = useContext(LoginContext)
    const { t } = useTranslation()
    const [newProduct, setNewProduct] = useState({
        name: '',
        brand: '',
        model: '',
        price: 0,
        storageCapacity: 0,
        color: '',
        imageUrl: '',
        description: '',
        condition: ''
    })
    const [formErrors, setFormErrors] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [fetchError, setFetchError] = useState(null)

    const handleInputChange = (event) => {
        setNewProduct({
            ...newProduct,
            [event.target.name]: event.target.value
        })
    }

    const validateInput = (event) => {
        const { name, value } = event.target

        if (!value) {
            setFormErrors({
                ...formErrors,
                [name]: 'Invalid entry'
            })
        } else {
            const updatedErrors = { ...formErrors }
            delete updatedErrors[name]
            setFormErrors(updatedErrors)
        }
    }

    const validateProduct = () => {
        return Object.entries(newProduct).every(([key, value]) => {
            if (typeof value === 'string') {
                return value.trim() !== ''
            } else if (typeof value === 'number') {
                return value > 0
            }

            return true
        });
    }

    const createProduct = async () => {
        if (!validateProduct) throw new Error('Product data not valid.')

        setLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/phone`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newProduct)
            })
            const data = await response.json()

            if (!response.ok) {
                throw new CustomError(data.statusCode, data.message)
            }

            const navigate = useNavigate()
            navigate(`/product/${data.phone._id}`)

        } catch (error) {
            setFetchError(error.toObject())
        } finally {
            setLoading(false)
        }
    }

    return (
        <NavAndFooterContextProvider>
            <main>
                <Container>
                    <Row className="my-3">
                        <h3 className="text-center">
                            {t('sellProduct')}
                        </h3>
                    </Row>

                    {isUserAuthenticated && (
                        <>
                            <Row>
                                <Form>
                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={4}>
                                            {t('title')}:
                                        </Col>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={newProduct.name}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => validateInput(e)}
                                            />
                                        </Col>
                                        {formErrors.name && (
                                            <Col sm={12}>
                                                <div className="text-end text-danger">
                                                    {formErrors.name}
                                                </div>
                                            </Col>
                                        )}

                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={4}>
                                            Brand:
                                        </Col>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="brand"
                                                value={newProduct.brand}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => validateInput(e)}
                                            />
                                        </Col>
                                        {formErrors.brand && (
                                            <Col sm={12}>
                                                <div className="text-end text-danger">
                                                    {formErrors.brand}
                                                </div>
                                            </Col>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={4}>
                                            {t('model')}
                                        </Col>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="model"
                                                value={newProduct.model}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => validateInput(e)}
                                            />
                                        </Col>
                                        {formErrors.model && (
                                            <Col sm={12}>
                                                <div className="text-end text-danger">
                                                    {formErrors.model}
                                                </div>
                                            </Col>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={4}>
                                            {t('price')}
                                        </Col>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                value={newProduct.price}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => validateInput(e)}
                                            />
                                        </Col>
                                        {formErrors.price && (
                                            <Col sm={12}>
                                                <div className="text-end text-danger">
                                                    {formErrors.price}
                                                </div>
                                            </Col>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={4}>
                                            {t('storage')}
                                        </Col>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="number"
                                                name="storageCapacity"
                                                value={newProduct.storageCapacity}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => validateInput(e)}
                                            />
                                        </Col>
                                        {formErrors.storageCapacity && (
                                            <Col sm={12}>
                                                <div className="text-end text-danger">
                                                    {formErrors.storageCapacity}
                                                </div>
                                            </Col>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={4}>
                                            {t('color')}
                                        </Col>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="color"
                                                value={newProduct.color}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => validateInput(e)}
                                            />
                                        </Col>
                                        {formErrors.color && (
                                            <Col sm={12}>
                                                <div className="text-end text-danger">
                                                    {formErrors.color}
                                                </div>
                                            </Col>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={4}>
                                            {t('image')}
                                        </Col>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="imageUrl"
                                                placeholder="url"
                                                value={newProduct.imageUrl}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => validateInput(e)}
                                            />
                                        </Col>
                                        {formErrors.imageUrl && (
                                            <Col sm={12}>
                                                <div className="text-end text-danger">
                                                    {formErrors.imageUrl}
                                                </div>
                                            </Col>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={4}>
                                            {t('description')}
                                        </Col>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="description"
                                                value={newProduct.description}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => validateInput(e)}
                                            />
                                        </Col>
                                        {formErrors.description && (
                                            <Col sm={12}>
                                                <div className="text-end text-danger">
                                                    {formErrors.description}
                                                </div>
                                            </Col>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={4}>
                                            {t('condition')}
                                        </Col>
                                        <Col sm={8}>
                                            <Form.Select
                                                name="condition"
                                                value={newProduct.condition}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => validateInput(e)}
                                            >
                                                <option value="">{t('choose')}...</option>
                                                <option value="new">{t('new')}</option>
                                                <option value="like_new">{t('like_new')}</option>
                                                <option value="used">{t('used')}</option>
                                            </Form.Select>
                                        </Col>
                                        {formErrors.condition && (
                                            <Col sm={12}>
                                                <div className="text-end text-danger">
                                                    {formErrors.condition}
                                                </div>
                                            </Col>
                                        )}
                                    </Form.Group>
                                </Form>
                            </Row>
                            <Row className="mt-5">
                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="primary"
                                        disabled={!validateProduct()}
                                        onClick={createProduct}
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
                                        {t('sellProduct')}
                                    </Button>
                                </div>
                                {fetchError && (
                                    <ErrorNotification error={fetchError} />
                                )}
                            </Row>
                        </>
                    )}

                </Container>
            </main>
        </NavAndFooterContextProvider>
    )
}