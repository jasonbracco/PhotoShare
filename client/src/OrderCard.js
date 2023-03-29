import React, {useState, useContext} from "react"
import {UserContext} from "./UserContext"
import Error from "./Error"
import {Button, Form} from 'semantic-ui-react'

function OrderCard({order}){
 
    const {user} = useContext(UserContext)

    const [reviewing, setReviewing] = useState(true)
    const [content, setContent] = useState("")
    const [photoID, setPhotoID] = useState(order.photograph_id)
    const [errors, setErrors] = useState([])

    function handleReviewSubmit(e){
        e.preventDefault()
        fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-type": "application/JSON",
            },
            body: JSON.stringify({
                content: content,
                user_id: user.id,
                photograph_id: photoID
            })
        })
        .then((response) => {
            if(response.ok){
                response.json().then((review) => {
                    setReviewing(true)
                    setContent("")
                })
            }
            else{
                response.json().then((error) => setErrors(error.errors))
            }
        })

    }

    return(
        <div>
            <strong>Order ID: {order.id}</strong>
            <br></br>
            <div className="shop-card-picture-space">
                <img className="selling-pic" alt="Ordered Item" src={order.photograph.image} />
            </div>
            <div><strong>Name:</strong> {order.photograph.name}</div>
            {reviewing ? (
            <div>
                <Button onClick={(() => setReviewing(false))}>Leave a Review</Button>
                <br></br>
                <br></br>
            </div>
            ) : (
                <div>
                    <Form onSubmit={handleReviewSubmit}>
                        <label>
                            <p>Review:</p>
                            <textarea
                                name="review"
                                autoComplete="off"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                />
                        </label>
                        <br></br>
                        <Button size="mini" type="submit">Submit</Button>
                        <Button size="mini" onClick={(() => setReviewing(true))}>Go Back</Button>
                    </Form>
                    <div>
                        {errors.map((error) => (
                            <Error key={error.status} error={error} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderCard