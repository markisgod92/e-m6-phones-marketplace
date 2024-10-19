import { Button, Form } from "react-bootstrap"
import { RatingStars } from "./RatingStars"
import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { LoginContext } from "../../contexts/LoginContext"

export const AddReview = ({ phoneId, reviewEditorOffFc }) => {
    const {loggedUser} = useContext(LoginContext)
    const { t } = useTranslation()
    const [newReview, setNewReview] = useState({
        phoneId: phoneId,
        username: loggedUser.username,
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
        <div className="d-flex flex-column gap-3 py-3">
            <div className="text-end">
                <Button
                    variant="secondary-outline"
                    onClick={reviewEditorOffFc}
                >
                    X
                </Button>
            </div>
            <Form>
                <Form.Control
                    value={newReview.comment}
                    onChange={(e) => handleComment(e)}
                    type="text"
                    name="comment"
                    placeholder={t('makeReview')}
                />
            </Form>
            <div className="d-flex justify-content-between">
                <div className="d-flex gap-3 align-items-center">
                    <div>{t('evaluateProduct')}</div>
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
                </div>


                <div>
                    <Button
                        variant="primary"
                        onClick={postReview}
                        disabled={!validateComment()}
                    >
                        {t('send')}
                    </Button>
                </div>
            </div>
        </div>
    )
}