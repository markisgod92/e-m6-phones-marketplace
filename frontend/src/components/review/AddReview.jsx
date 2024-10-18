import { Button, Form } from "react-bootstrap"
import { RatingStars } from "./RatingStars"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export const AddReview = ({ phoneId }) => {

    const { t } = useTranslation()
    const [newReview, setNewReview] = useState({
        phoneId: phoneId,
        username: 'pinco_pallino',
        comment: '',
        rating: 1
    })

    const handleComment = (event) => {
        setNewReview({
            ...newReview,
            comment: event.target.value
        })
    }

    const validateComment = () => {
        return newReview.comment.length > 0
    }

    const postReview = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newReview)
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="d-flex flex-column gap-3">
            <RatingStars
                value={newReview.rating}
                isEditable={true}
                onChange={(newRating) =>
                    setNewReview({
                        ...newReview,
                        rating: newRating,
                    })
                }
            />
            <Form>
                <Form.Control
                    value={newReview.comment}
                    onChange={(e) => handleComment(e)}
                    type="text"
                    name="comment"
                    placeholder={t('makeReview')}
                />
            </Form>
            <Button
                variant="primary"
                onClick={postReview}
                disabled={!validateComment()}
            >
                {t('send')}
            </Button>
        </div>
    )
}