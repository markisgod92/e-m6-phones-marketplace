import { t } from "i18next"
import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"

export const ProductPage = () => {
    const [productData, setProductData] = useState(null)
    const {phoneId} = useParams()
    console.log(phoneId)
    console.log(productData)
    const getPhoneData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/phone/${phoneId}`)
            const data = await response.json()
            console.log('fetch data', data)
            setProductData(data.phone)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPhoneData()
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
                </>
                )}
            </Container>
        </main>
    )
}