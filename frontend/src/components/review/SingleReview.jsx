import { RatingStars } from "./RatingStars"

export const SingleReview = ({ data }) => {
    return (
        <div className="d-flex flex-column gap-2">
            <div>{data.username}</div>
            <RatingStars value={data.rating} isEditable={false}/>
            <div>{data.comment}</div>
        </div>
    )
}