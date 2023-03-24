import React, {useContext, useState, useEffect} from "react"
import {UserContext} from "./UserContext"
import Error from "./Error"
import {Button, Card, Image, Form} from 'semantic-ui-react'


function SingleReview({review, photograph, handleDeleteReview}){
 
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
        <div className="single-review">
            {canEdit ? (
                <div>
                    {editingReview ? (
                    <div>
                        <Form onSubmit={handleEditReview}>
                            <Form.Input
                                name="content"
                                autoComplete="off"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <br></br>
                            <Button secondary type="submit">Update Your Review</Button>
                        </Form>
                        <div> 
                            {errors.map((error) => (
                                <Error key={error} error={error} />
                            ))}
                        </div>
                    </div>
                    ) : (
                    <Card>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src={photograph.image}
                            />
                            <Card.Header>{review.user.first_name} Says:</Card.Header>
                            <Card.Description>{content}</Card.Description>
                            <Button onClick={(() => setEditingReview(true))}>Edit Your Review</Button>
                            <Button onClick={deleteReview}>Delete</Button>
                        </Card.Content>
                    </Card>
                    )}
                </div>
            ) : (
                <Card>
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src={photograph.image}
                        />
                        <Card.Header>{review.user.first_name} Says:</Card.Header>
                        <Card.Description>{content}</Card.Description>
                    </Card.Content>
                </Card>
            )}
        </div>

    )
}

export default SingleReview