import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Cars() {
    const [cars, setCars] = useState([])
    const [message, setMessage] = useState('')

    async function getCars() {
        try {
            const response = await axios.get('https://apib1.raphaelmoynat.com/cars')
            setCars(response.data)
        } catch (error) {
            setMessage(error)
        }
    }

    useEffect(() => {
        getCars()
    }, [])


    return (
        <div className="container mt-5">
            {message && <p className="alert alert-danger">{message}</p>}

            <h1 className="mb-4 text-center">All Cars</h1>

            <div className="row">
                {cars.map((car) => (
                    <div className="col-md-4 mb-4" key={car._id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title f">{car.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{car.brand}</h6>
                                <p className="card-text">Power: {car.power} CV</p>
                                <p className="card-text text-muted">
                                    <small>Owner: {car.author.username}</small>
                                </p>
                                <p className="card-text">
                                    <small>Comments: {car.comments.length}</small>
                                </p>
                            </div>
                            <div className="card-footer bg-white text-center">
                                <Link to={`/cars/show/${car._id}`} className="btn btn-primary btn-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {cars.length === 0 && !message && (
                <p className="text-center text-muted">No cars found</p>
            )}
        </div>
    )
}

export default Cars