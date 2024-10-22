import { useEffect, useState } from 'react'
import { PhoneCard } from '../components/phone-card/PhoneCard';
import { Col, Container, Row } from 'react-bootstrap';
import { PaginationComponent } from '../components/pagination/PaginationComponent';
import { NavAndFooterContextProvider } from '../contexts/NavAndFooterContext';
import { Loader } from '../components/loaderAndError/Loader';
import { Error } from '../components/loaderAndError/Error';

export const Homepage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [fetchData, setFetchData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const getPhones = async () => {
        setLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/phones?page=${currentPage}&limit=9`)
            const data = await response.json()
            setFetchData(data)
        } catch (error) {
            console.error('Error fetching phones.', error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPhones()
    }, [currentPage])

    return (
        <NavAndFooterContextProvider>
            <main>
                <Container>

                    {isLoading && !error && (
                        <Row className='p-5 d-flex justify-content-center'>
                        <Loader />
                        </Row>
                    )}

                    {!isLoading && error && <Error error={error} />}

                    {fetchData && fetchData.phones && (
                        <>
                            <Row className='row-cols-3 g-3'>

                                {fetchData.phones.map(phone => (
                                    <Col
                                        key={phone._id}
                                    >
                                        <PhoneCard data={phone} />
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                <PaginationComponent
                                    pages={fetchData.totalPages}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                />
                            </Row>
                        </>
                    )}
                </Container>
            </main>
        </NavAndFooterContextProvider>
    )
}