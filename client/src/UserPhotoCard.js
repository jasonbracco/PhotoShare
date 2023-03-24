import React, {useState} from "react"
import EditUserPhotoCard from "./EditUserPhotoCard"
import {Item, Button} from 'semantic-ui-react'


function UserPhotoCard({photograph, deleteUserPhoto, updateUserPhoto}){

    const [isEditing, setIsEditing] = useState(true)

    function handleDeleteUserPhoto(){
        fetch(`/photographs/${photograph.id}`, { 
            method: "DELETE",
        });
        deleteUserPhoto(photograph.id)
    }
    
    return(
        <div>
            {isEditing ? (
                <Item>
                    <img className="selling-pic" alt="item" src={photograph.image} />
                    <br></br>
                    <Item.Header><strong>Name:</strong> {photograph.name}</Item.Header>
                    <Item.Description className="item-description"><strong>Description:</strong> {photograph.description}</Item.Description>
                    <strong>Price:</strong> ${photograph.formatted_price}
                    <br></br>
                    <Button onClick={() => setIsEditing(false)}>Edit</Button>
                    <Button onClick={handleDeleteUserPhoto}>Delete</Button>
                    <br></br>
                    <br></br>
                </Item>
            ) : (
                <div>
                    <img className="selling-pic" alt="item" src={photograph.image} />
                    <br></br> 
                    <EditUserPhotoCard photograph={photograph} updateUserPhoto={updateUserPhoto} setIsEditing={setIsEditing}/>
                    <br></br>
                </div>
            )}

        </div>
    )
}

export default UserPhotoCard