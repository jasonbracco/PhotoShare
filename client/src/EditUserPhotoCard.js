import React, {useState} from "react"
import Error from "./Error"


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
                    console.log(photograph)
                })
            }
            else{
                response.json().then((error) => setErrors(error.errors))
            }
        })
    }    

    return(
        <div>
            <form onSubmit={handleEditUserPhoto}>
                <p>Name</p>
                <input 
                    name="name"
                    autoComplete="off"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <p>Description</p>
                <textarea
                    name="description"
                    autoComplete="off"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <p>Price ($x.xx)</p>
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
                <button type="submit">
                    Update Listing
                </button>
            </form>
    </div>
    )
}

export default EditUserPhotoCard