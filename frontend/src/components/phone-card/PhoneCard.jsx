import { Button, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const PhoneCard = ({ data }) => {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()

    return (
        <Card className='h-100'>
            <Card.Img variant='top' src={data.imageUrl} />
            <Card.Body className='h-100 d-flex flex-column justify-content-between'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>{data.brand}</div>
                    <div>{data.model}</div>
                </div>

                <Card.Title>{data.name}</Card.Title>

                <div className='d-flex flex-column gap-1'>
                    <div>{t('storage')}: {data.storageCapacity}GB</div>
                    <div>{t('color')}: {data.color}</div>
                    <div>{t('condition')}: {t(data.condition)}</div>
                </div>

                <Card.Text className='text-end fs-5 fw-bold'>{data.price.toFixed(2)}€</Card.Text>
            </Card.Body>
            <Card.Footer>
                    <Button 
                        variant='secondary'
                        onClick={() => navigate(`/product/${data._id}`)}
                    >
                        {t('details')}
                    </Button>
            </Card.Footer>
        </Card>
    )
}