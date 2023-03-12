import React, {useContext, useState, useEffect} from "react"
import {UserContext} from "./UserContext"
import Error from "./Error"

function SingleReview({review}){

    const {user} = useContext(UserContext)

    const [canEdit, setCanEdit] = useState(false)
    const [editingReview, setEditingReview] = useState(false)
    const [content, setContent] = useState(review.content)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const filteredReviews = user.reviews.filter((userReview) => {
            if (review.id === userReview.id){
                console.log("match!")
                setCanEdit(true)
                return userReview
            }
            else{
                console.log("Not a Match")
            }
        })
        console.log(filteredReviews)
    })

    function handleEditReview(e) {
        e.preventDefault(); 
        fetch(`/reviews/${review.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify({ 
                content: content
            })
        })
          .then((response) => {
            if (response.ok){
                response.json().then((review) => {
                 console.log(review)
                 setEditingReview(false)
                 setContent(review.content)
                })
            }
            else{
                response.json().then((error) => setErrors(error.errors))
            }
        })
    }    



     

    return(
        <div>
            {canEdit ? (
                <div>
                    {editingReview ? (
                    <div>
                        <form onSubmit={handleEditReview}>
                            <p>Name</p>
                            <textarea 
                                name="content"
                                autoComplete="off"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <br></br>
                            <button type="submit">Update Your Review</button>
                        </form>
                        <div>
                            {errors.map((error) => (
                                <Error key={error} error={error} />
                            ))}
                        </div>
                    </div>
                    ) : (
                    <div>
                        {review.user.first_name} Says:
                        <br></br>
                        {content}
                        <br></br>
                        <button onClick={(() => setEditingReview(true))}>Edit Your Review</button>
                    </div>
                    )}
                </div>
            ) : (
                <div>
                    {review.user.first_name} Says:
                    <br></br>
                    {content}
                    <br></br>
                    <br></br>
                </div>
            )}
        </div>

    )
}

export default SingleReview