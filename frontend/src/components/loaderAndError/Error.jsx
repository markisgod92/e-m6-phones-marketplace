export const Error = (error) => {
    return (
        <div className="d-flex flex-column align-items-center gap-5">
            <div className="fs-5">
                {error.statusCode}
            </div>
            <div>
                {error.message}
            </div>
        </div>
    )
}