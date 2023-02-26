import React, {useState, useContext} from "react"
import {UserContext} from "./UserContext"
import Error from "./Error"


function EditUserPhotoCard({photograph, updateUserPhoto}){

    const {user, setUser} = useContext(UserContext)

    const [newName, setNewName] = useState(photograph.name)
    const [newDescription, setNewDescription] = useState(photograph.description)
    const [newPrice, setNewPrice] = useState(photograph.price)
    const [errors, setErrors] = useState([])
    console.log(errors)

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
                })
            }
            else{
                response.json().then((error) => setErrors(error.error))
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
                <p>Price</p>
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