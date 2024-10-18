import { Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

export const PhoneCard = ({ data }) => {
    const { t, i18n } = useTranslation()

    return (
        <Card>
            <Card.Img variant='top' src={data.imageUrl} />
            <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>{data.brand}</div>
                    <div>{data.model}</div>
                </div>

                <Card.Title>{data.name}</Card.Title>

                <div className='d-flex justify-content-between align-items-center'>
                    <div>{t('storage')}: {data.storageCapacity}GB</div>
                    <div>{t('color')}: {data.color}</div>
                </div>

                <Card.Text className='text-end'>{data.price.toFixed(2)}€</Card.Text>
                <Card.Text>{data.available ? t('available') : t('notAvailable')}</Card.Text>
            </Card.Body>
        </Card>
    )
}