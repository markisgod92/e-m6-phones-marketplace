import { useTranslation } from "react-i18next"

export const ErrorNotification = ({error}) => {
    const {t} = useTranslation()

    return (
        <div className="pt-5 d-flex flex-column align-items-center gap-3">
            <div className="fs-5">
                {error.statusCode}
            </div>
            <div>
                {t(error.message)}
            </div>
        </div>
    )
}