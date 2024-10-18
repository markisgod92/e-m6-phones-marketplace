import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { SingleReview } from "../components/review/SingleReview"
import { AddReview } from "../components/review/AddReview"

export const ProductPage = () => {
    const [productData, setProductData] = useState(null)
    const [productReviews, setProductReviews] = useState([])
    const [isWriteReviewOn, setWriteReviewOn] = useState(false)
    const { phoneId } = useParams()
    const { t } = useTranslation()

    const getPhoneData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/phone/${phoneId}`)
            const data = await response.json()
            setProductData(data.phone)
        } catch (error) {
            console.error(error)
        }
    }

    const getPhoneReviews = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reviews/${phoneId}`)
            const data = await response.json()
            setProductReviews(data.reviews)
        } catch (error) {
            console.error(error)
        }
    }

    const toggleReviewEditor = () => {
        setWriteReviewOn(prev => !prev)
    }

    useEffect(() => {
        getPhoneData()
        getPhoneReviews()
    }, [])

    return (
        <main>
            <Container>
                {productData && (
                    <>
                        <Row>
                            <Col xs={12} md={6}>
                                <img src={productData.imageUrl} alt={productData.name} />
                            </Col>
                            <Col xs={12} md={6}>
                                <h2>{productData.name}</h2>
                                <h5>{productData.brand} - {productData.model}</h5>
                                <p>{t('storage')}: {productData.storageCapacity}GB</p>
                                <p>{t('color')}: {productData.color}</p>
                                <p>{t('condition')}: {t(productData.condition)}</p>
                                <p>{t('price')}:
                                    <span className="fs-5 fw-bold"> {productData.price.toFixed(2)}€</span>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {productData.description}
                            </Col>
                        </Row>
                        <Row>
                            <h5>{t('reviews')}</h5>
                            <Button
                                variant="primary"
                                onClick={toggleReviewEditor}
                            >
                                {t('makeReview')}
                            </Button>

                            {isWriteReviewOn && <AddReview phoneId={productData._id} />}

                            {productReviews
                                ? productReviews.map(review => <SingleReview data={review} />)
                                : <div>{t('noReviews')}</div>
                            }
                        </Row>
                    </>
                )}
            </Container>
        </main>
    )
}