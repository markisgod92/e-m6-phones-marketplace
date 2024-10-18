import { useEffect, useState } from 'react'
import { PhoneCard } from '../components/phone-card/PhoneCard';
import { Col, Container, Row } from 'react-bootstrap';
import { PaginationComponent } from '../components/pagination/PaginationComponent';

export const Homepage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [fetchData, setFetchData] = useState(null)

    const getPhones = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/phones?page=${currentPage}&limit=9`)
            const data = await response.json()
            console.log(data.phones)
            setFetchData(data)
        } catch (error) {
            console.error('Error fetching phones.', error)
        }
    }

    useEffect(() => {
        getPhones()
    }, [currentPage])

    return (
        <main>
            <Container>
                <Row className='row-cols-3 g-3'>
                    {fetchData && fetchData.phones && (
                        fetchData.phones.map(phone => (
                            <Col
                                key={phone._id}
                            >
                                <PhoneCard data={phone} />
                            </Col>
                        ))
                    )}
                </Row>
                <Row>
                    {fetchData && fetchData.phones && (
                        <PaginationComponent
                            pages={fetchData.totalPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </Row>
            </Container>
        </main>
    )
}