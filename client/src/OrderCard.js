import React, {useState} from "react"

function OrderCard({order}){

    console.log(order)

    const [reviewing, setReviewing] = useState(true)
    const [review, setReview] = useState("")

    return(
        <div>
            Order {order.id}
            <br></br>
            <img className="selling-pic" src={order.photograph.image} />
            <br></br>
            {reviewing ? (
            <div>
                <button onClick={(() => setReviewing(false))}>Leave a Review</button>
                <br></br>
                <br></br>
            </div>
            ) : (
                <div>
                <form>
                    <label>
                        <p>Review:</p>
                        <textarea
                            name="review"
                            autoComplete="off"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            />
                    </label>
                </form>
                <button onClick={(() => setReviewing(true))}>Go Back</button>
                </div>
            )}
        </div>
    )
}

export default OrderCard