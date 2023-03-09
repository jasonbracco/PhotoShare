import React, {useContext, useState} from "react"
import {UserContext} from "./UserContext"
import Error from "./Error"
import UserPhotoCard from "./UserPhotoCard"

function Profile(){

    const {user} = useContext(UserContext)

    const [listWork, setListWork] = useState(true)
    const [name, setName] =useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])
    const [userPhotos, setUserPhotos] = useState(user.selling)

    function handleListPhoto(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('user_id', user.id);
        fetch("/photographs", {
            method: "POST",
            body: formData
        })
        .then((response) => {
            if (response.ok){
                response.json().then((photograph) => {
                    handleAddUserPhoto(photograph);
                    setListWork(true);
                })
            }
            else{
                response.json().then((error) => setErrors(error.errors));
            }
        })
    }    

    function handleAddUserPhoto(newPhoto){
        setUserPhotos([...userPhotos, newPhoto]);
    }
    
    function handleDeleteUserPhoto(id){
        const updatedUserPhotos = userPhotos.filter((photo) => photo.id !== id);
        setUserPhotos(updatedUserPhotos);
    }

    function handleEditUserPhoto(updatedUserPhoto){
        const updatedUserPhotos = userPhotos.map((photograph) => {
          if (photograph.id === updatedUserPhoto.id) {
            return updatedUserPhoto;
          } else {
            return photograph;
          } 
        });
        setUserPhotos(updatedUserPhotos)
    }


    return (
        <div> 
            {listWork ? (
                <div>
                    <img className="profile-pic" alt="profile-pic" src={user.image} />
                    <br></br>
                    <br></br>
                    <button className="select-pic" onClick={() => setListWork(false)}>List Work</button>
                    <br></br>
                    <br></br>
                    <div classame="user-bio">
                        {user.bio}
                    </div>
                    <br></br>
                    <br></br>
                    Photos I Am Selling:
                    <br></br>
                    <br></br>
                    <div className="peronal-listed-items">
                        {userPhotos.map((photograph) => {
                            return <UserPhotoCard key={photograph.id} photograph={photograph} deleteUserPhoto={handleDeleteUserPhoto} updateUserPhoto={handleEditUserPhoto}/>
                        })}
                    </div>
                    <br></br>
                    <br></br>
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