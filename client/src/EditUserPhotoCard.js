import React, {useState} from "react"
import Error from "./Error"
import {Form, Button} from 'semantic-ui-react'



function EditUserPhotoCard({photograph, updateUserPhoto, setIsEditing}){

    const [newName, setNewName] = useState(photograph.name)
    const [newDescription, setNewDescription] = useState(photograph.description)
    const [newPrice, setNewPrice] = useState(photograph.formatted_price)
    const [errors, setErrors] = useState([])

    function handleEditUserPhoto(e) {
        e.preventDefault(); 
        fetch(`/photographs/${photograph.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify({ 
                name: newName,
                description: newDescription,
                price: newPrice,
            })
        })
          .then((response) => {
            if (response.ok){
                response.json().then((photograph) => {
                    updateUserPhoto(photograph)
                    setIsEditing(true)
                })
            }
            else{
                response.json().then((error) => setErrors(error.errors))
            }
        })
    }    

    return(
        <div>
            <Form size="mini" onSubmit={handleEditUserPhoto}>
                <strong>Name</strong>
                <input 
                    name="name"
                    autoComplete="off"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <strong>Description</strong>
                <input
                    name="description"
                    autoComplete="off"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <strong>Price ($X.XX)</strong>
                <input
                    name="price"
                    autoComplete="off"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                />
                <div>
                    {errors.map((error) => (
                        <Error key={error} error={error} />
                    ))}
                </div>
                <Button size="mini" secondary type="submit">
                    Update Listing
                </Button>
            </Form>
    </div>
    )
}

export default EditUserPhotoCard