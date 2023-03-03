import React from "react"

function OrderCard({order}){

    console.log(order)

    return(
        <div>
            Order {order.id}
            <br></br>
            <img className="selling-pic" src={order.photograph.image} />
            <br></br>
            <button>Leave a Review</button>
            <br></br>
            <br></br>
        </div>
    )
}

export default OrderCard