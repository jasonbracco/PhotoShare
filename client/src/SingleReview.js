import React from "react"

function SingleReview({review}){

    return(
        <div>
            {review.user.first_name} Says:
            <br></br>
            {review.content}
            <br></br>
            <br></br>
        </div>

    )
}

export default SingleReview