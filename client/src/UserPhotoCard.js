import React, {useState} from "react"
import EditUserPhotoCard from "./EditUserPhotoCard"
import {Item} from 'semantic-ui-react'


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
                    <Item.Header>Name: {photograph.name}</Item.Header>
                    <br></br>
                    <Item.Description>Description: {photograph.description}</Item.Description>
                    <br></br>
                    Price: ${photograph.formatted_price}
                    <br></br>
                    <button onClick={() => setIsEditing(false)}>Edit</button>
                    <button onClick={handleDeleteUserPhoto}>Delete</button>
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