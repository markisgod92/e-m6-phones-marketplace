import { RatingStars } from "./RatingStars"

export const SingleReview = ({ data }) => {
    return (
        <div className="d-flex flex-column gap-2 py-3">
            <div className="d-flex align-items-center w-50 justify-content-between">
                <div className="fw-bold">{data.username}</div>
                <RatingStars value={data.rating} isEditable={false} />
            </div>
            <div>{data.comment}</div>
        </div>
    )
}