import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "./UserContext"
import Error from "./Error"
import UserPhotoCard from "./UserPhotoCard"

function Profile(){

    const {user, setUser} = useContext(UserContext)
    const [listWork, setListWork] = useState(true)
    const [name, setName] =useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])
    const [userPhotos, setUserPhotos] = useState(user.photographs)


    function handleListPhoto(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price)
        formData.append('user_id', user.id)
        fetch("/photographs", {
            method: "POST",
            body: formData
        })
        .then((response) => {
            if (response.ok){
                response.json().then((photograph) => {
                    console.log(photograph)
                    handleAddUserPhoto(photograph)
                    setListWork(true)
                })
            }
            else{
                response.json().then((error) => setErrors(error.errors))
            }
        })
    }    

    console.log(user.photographs)

    function handleAddUserPhoto(newPhoto){
        setUserPhotos([...userPhotos, newPhoto])
      }
    
      function handleDeleteUserPhoto(id){
        const updatedUserPhotos = userPhotos.filter((photo) => photo.id !== id);
        setUserPhotos(updatedUserPhotos)
      }

    console.log(userPhotos)

    return (
        <div> 
            {listWork ? (
                <div>
                    <img className="profile-pic" src={user.image} />
                    <button className="select-pic" onClick={() => setListWork(false)}>List Work</button>
                    <div classame="user-bio">
                        {user.bio}
                    </div>
                    <div className="peronal-listed-items">
                        {userPhotos.map((photograph) => {
                            return <UserPhotoCard key={photograph.id} photograph={photograph} deleteUserPhoto={handleDeleteUserPhoto}/>
                        })}
                    </div>
                </div>

            ) : (
                <div>
                    <button onClick={() => setListWork(true)}>Go Back</button>
                    <form onSubmit={handleListPhoto}>
                        <fieldset>
                            <label>
                                <p>Name</p>
                                <input 
                                name="name"
                                autoComplete="off"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <label>
                                <p>Description</p>
                                <textarea
                                name="description"
                                autoComplete="off"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                            <label>
                                <p>Price</p>
                                <input
                                name="price"
                                autoComplete="off"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                />
                            </label>
                            <label>
                                <p>Upload Photograph</p>
                                <input
                                    name="photoraph"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                />
                            </label>
                        </fieldset>
                        <div>
                            {errors.map((error) => (
                                <Error key={error} error={error} />
                            ))}
                        </div>
                        <button type="submit">
                            Sell My Photo!
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Profile 