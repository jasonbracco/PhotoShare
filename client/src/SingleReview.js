import React, {useContext, useState, useEffect} from "react"
import {UserContext} from "./UserContext"
import Error from "./Error"

function SingleReview({review, reviews, handleDeleteReview}){
 
    const {user} = useContext(UserContext)

    const [canEdit, setCanEdit] = useState(false)
    const [editingReview, setEditingReview] = useState(false)
    const [content, setContent] = useState(review.content)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if(review.user.id === user.id){
            setCanEdit(true)
        }
    }, [review, user.id])

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
                 setEditingReview(false)
                 setContent(review.content)
                })
            }
            else{
                response.json().then((error) => setErrors(error.errors))
            }
        })
    }   
    
    function deleteReview(){
        fetch(`/reviews/${review.id}`, {
            method: "DELETE",
        });
        handleDeleteReview(review.id)
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
                        <button onClick={deleteReview}>Delete</button>
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