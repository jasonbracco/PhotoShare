import React, {useState, useContext} from "react"
import {UserContext} from "./UserContext"
import Error from "./Error"

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
                })
            }
            else{
                response.json().then((error) => setErrors(error.errors))
            }
        })

    }

    return(
        <div>
            <div>Order ID: {order.id}</div>
            <img className="selling-pic" alt="Ordered Item" src={order.photograph.image} />
            <div>{order.photograph.name}</div>
            {reviewing ? (
            <div>
                <button onClick={(() => setReviewing(false))}>Leave a Review</button>
                <br></br>
                <br></br>
            </div>
            ) : (
                <div>
                    <form onSubmit={handleReviewSubmit}>
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
                        <button type="submit">Submit</button>
                    </form>
                    <button onClick={(() => setReviewing(true))}>Go Back</button>
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