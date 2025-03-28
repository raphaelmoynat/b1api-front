import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateCar() {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [power, setPower] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    async function createCar(e) {
        const token = localStorage.getItem('token')
        e.preventDefault();

        if (token) {
            try{
                const response = await axios.post('http://127.0.0.1:8000/cars/create', {
                    name: name,
                    brand: brand,
                    power: power,

                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setMessage('Car created successfully')

                setTimeout(() => {
                    navigate(`/`)
                }, 1000)

            }catch(erreur){
                console.log(erreur)

            }
        }else{
            console.log("you must be logged in");
        }



    }

    return (

        <div className="container mt-5">
            <h1 className="text-center">Add car</h1>
            <form onSubmit={createCar} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">
                        Nom
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Nom"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Marque
                    </label>
                    <input
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Marque"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Puissance (CV)
                    </label>
                    <input
                        value={power}
                        onChange={(e) => setPower(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Puissance"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Ajouter
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

export default CreateCar;