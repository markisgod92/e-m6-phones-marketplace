import { useEffect, useState } from 'react'
import { PhoneCard } from '../components/phone-card/PhoneCard';
import { Col, Container, Row } from 'react-bootstrap';
import { PaginationComponent } from '../components/pagination/PaginationComponent';
import { NavAndFooterContextProvider } from '../contexts/NavAndFooterContext';
import { Loader } from '../components/loaderAndError/Loader';
import { ErrorNotification } from '../components/loaderAndError/ErrorNotification';
import {CustomError} from '../exceptions/exception'

export const Homepage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [fetchData, setFetchData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [fetchError, setFetchError] = useState(null)

    const getPhones = async () => {
        setLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/phones?page=${currentPage}&limit=9`)

            if(!response.ok) {
                const errorData = await response.json()
                throw new CustomError(errorData.statusCode, errorData.message)
            }

            const data = await response.json()
            setFetchData(data)
        } catch (error) {
            setFetchError(error.toObject())
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

                    {isLoading && !fetchError && (
                        <Row className='p-5 d-flex justify-content-center'>
                        <Loader />
                        </Row>
                    )}

                    {!isLoading && fetchError && (
                        <Row className='p-5 d-flex justify-content-center'>
                        <ErrorNotification error={fetchError} />
                        </Row>
                    )}

                    {!isLoading && !fetchError && fetchData && fetchData.phones && (
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