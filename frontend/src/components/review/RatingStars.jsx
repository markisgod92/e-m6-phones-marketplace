import ReactStars from "react-rating-stars-component"

export const RatingStars = ({ value, isEditable, onChange }) => {
    return (
        <ReactStars
            count={5}
            value={value}
            size={24}
            activeColor="#ffd700"
            isHalf={false}
            edit={isEditable}
            onChange={onChange}
        />
    )
}