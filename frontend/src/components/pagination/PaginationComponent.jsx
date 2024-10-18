import { Pagination } from "react-bootstrap"

export const PaginationComponent = ({ pages, currentPage, setCurrentPage }) => {
    let items = []

    for (let i = 1; i <= pages; i++) {
        items.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => setCurrentPage(i)}
            >
                {i}
            </Pagination.Item>
        )
    }

    return (
        <div>
            <Pagination>
                {items}
            </Pagination>
        </div>
    )
}