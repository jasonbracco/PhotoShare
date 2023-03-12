import React, {useState} from "react"
import EditUserPhotoCard from "./EditUserPhotoCard"

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
                <div>
                    <img className="selling-pic" alt="item" src={photograph.image} />
                    <br></br>
                    Name: {photograph.name}
                    <br></br>
                    Description: {photograph.description}
                    <br></br>
                    Price: ${photograph.formatted_price}
                    <br></br>
                    <button onClick={() => setIsEditing(false)}>Edit</button>
                    <button onClick={handleDeleteUserPhoto}>Delete</button>
                    <br></br>
                    <br></br>
                </div>
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