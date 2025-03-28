import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

function EditCar() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [power, setPower] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    async function getCar() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/cars/show/${id}`)
            const car = response.data
            setName(car.name)
            setBrand(car.brand)
            setPower(car.power)
        } catch (error) {
            setMessage(error)
        }
    }

    async function updateCar(e) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if (!token) {
            setMessage('You must be logged in to update a car')
            return
        }

        try {
            await axios.put(
                `http://127.0.0.1:8000/cars/update/${id}`,
                {
                    name,
                    brand,
                    power: parseInt(power)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setMessage('Car updated successfully')


            setTimeout(() => {
                navigate(`/cars/show/${id}`)
            }, 1000)
        } catch (error) {
            setMessage(error)
        }
    }

    useEffect(() => {
        getCar()
    }, [id])

    return (
        <div className="container mt-5">
            <h1 className="text-center">Edit Car</h1>

            <form onSubmit={updateCar} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">
                        Name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Car Name"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Brand
                    </label>
                    <input
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Car Brand"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Power (CV)
                    </label>
                    <input
                        value={power}
                        onChange={(e) => setPower(e.target.value)}
                        type="number"
                        className="form-control"
                        placeholder="Car Power"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Update
                </button>
            </form>

            {message && (
                <p
                    className={`mt-3 text-center ${
                        message.includes('successfully') ? 'text-success' : 'text-danger'
                    }`}>
                    {message}
                </p>
            )}
        </div>
    )
}

export default EditCar