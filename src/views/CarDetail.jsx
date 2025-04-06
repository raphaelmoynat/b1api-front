import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

function CarDetail() {
    const { id } = useParams()
    const [car, setCar] = useState(null)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const currentUser = localStorage.getItem('user')
    const [comments, setComments] = useState([])
    const [messageComment, setMessageComment] = useState('')
    const [content, setContent] = useState('')
    const [showEditModal, setShowEditModal] = useState(false)
    const [editCommentId, setEditCommentId] = useState(null)
    const [editContent, setEditContent] = useState('')

    async function getCar() {
        try {
            const response = await axios.get(`https://apib1.raphaelmoynat.com/cars/show/${id}`)
            setCar(response.data)
        } catch (error) {
            setMessage(error)
        }
    }

    async function getComments(){
        try{
            const response = await axios.get('https://apib1.raphaelmoynat.com/comments')
            setComments(response.data)
        } catch(error){
            setMessageComment(error)
        }
    }

    async function createComment(e){
        e.preventDefault()
        if(currentUser){
            try{
                await axios.post('https://apib1.raphaelmoynat.com/comments/create', {
                    content: content,
                    car: id
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setContent('')
                getCar()
            } catch(error){
                setMessageComment(error)
            }
        }
    }

    async function deleteComment(commentId) {
        if (!currentUser || !commentId) return
        try {
            await axios.delete(`https://apib1.raphaelmoynat.com/comments/delete/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            getCar()
        } catch (error) {
            setMessageComment(error)
        }
    }

    function openEditModal(comment) {
        setEditCommentId(comment._id)
        setEditContent(comment.content)
        setShowEditModal(true)
    }

    async function updateComment(e) {
        e.preventDefault()


        try {
            await axios.put(`https://apib1.raphaelmoynat.com/comments/update/${editCommentId}`, {
                content: editContent
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            setShowEditModal(false)
            getCar()
        } catch (error) {
            setMessageComment(error)
        }
    }

    useEffect(() => {
        getCar(), getComments()
    }, [id])

    async function deleteCar() {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                await axios.delete(`https://apib1.raphaelmoynat.com/cars/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                navigate('/')
            } catch (error) {
                setMessage(error)
            }
        }
    }

    if (!car && !message) {
        return <div className="text-center mt-5">Loading...</div>
    }

    return (
        <div className="container mt-5">
            {message && <p className="alert alert-danger">{message}</p>}

            <div className="row">
                {car && (
                    <div className="col-7">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h2>{car.name}</h2>
                            </div>
                            <div className="card-body">
                                <h4>{car.brand}</h4>
                                <p className="card-text">Power: {car.power} HP</p>
                                <p className="card-text text-muted">
                                    <small>Owner: {car.author.username}</small>
                                </p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <Link to="/" className="btn btn-primary">
                                    Retour
                                </Link>

                                {currentUser === car.author.username && (
                                    <div>
                                        <Link to={`/cars/update/${car._id}`} className="btn btn-warning me-2">
                                            Edit Car
                                        </Link>
                                        <button onClick={deleteCar} className="btn btn-danger">
                                            Delete Car
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-md-5">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-secondary text-white">
                            <h3>Commentaires</h3>
                        </div>
                        <div className="card-body comments-section" style={{maxHeight: '400px', overflowY: 'auto'}}>
                            {car.comments && car.comments.length > 0 ? (
                                <div className="list-group">
                                    {car.comments.map((comment) => (
                                        <div key={comment._id}
                                             className="list-group-item list-group-item-action mb-2 border-start border-secondary mb-3 border-1">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p className="mb-1 text-primary">{comment.author.username} :
                                                        <span className="text-dark ms-2">{comment.content}</span></p>
                                                </div>

                                                {currentUser === comment.author.username && (
                                                    <div>
                                                        <button className="btn btn-sm btn-secondary mx-1" onClick={() => openEditModal(comment)}>
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => deleteComment(comment._id)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-muted my-4">
                                    <p className="mt-2">Aucun commentaire pour le moment</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 mt-5">
                <div className="d-flex justify-content-center">
                    {currentUser ? (
                        <form className="w-75" onSubmit={createComment} >
                            <div className="input-group">
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Ajouter un commentaire"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                                <button className="btn btn-primary" type="submit">Envoyer</button>
                            </div>
                        </form>
                    ) : (
                        <div className="alert">
                            <Link to="/login" className="alert-link">Connectez-vous</Link> pour ajouter un commentaire
                        </div>
                    )}
                </div>
            </div>

            {showEditModal && (
                <div className="modal" style={{display: 'block', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%'}}>
                    <div className="modal-dialog" style={{margin: '10% auto'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modifier le commentaire</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <form onSubmit={updateComment}>
                                <div className="modal-body">
                                    <textarea
                                        className="form-control"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Annuler</button>
                                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CarDetail