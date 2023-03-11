import React, {useContext, useState} from "react"
import {UserContext} from "./UserContext"
import Error from "./Error"
import UserPhotoCard from "./UserPhotoCard"

function Profile(){

    const {user, setUser} = useContext(UserContext)

    const [listWork, setListWork] = useState(true)
    const [editingUser, setEditingUser] = useState(true)
    const [name, setName] =useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])
    const [userPhotos, setUserPhotos] = useState(user.selling)
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [bio, setBio] = useState(user.bio)
    const [stateProvince, setStateProvince] = useState(user.state_province)
    const [country, setCountry] = useState(user.country)
    const [city, setCity] = useState(user.city)
    const [userID, setUserID] = useState(user.id)
    // const [profilePic, setProfilePic] = useState(user.image)

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
                    setName("")
                    setDescription("")
                    setPrice("")
                    setImage(null)
                })
            }
            else{
                response.json().then((error) => {
                    console.log(error)
                    setErrors(error.errors)
                });
            }
        })
    }    
 
    function updateUserInfo(e){
        e.preventDefault(); 
        fetch(`/users/${userID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify({ 
                first_name: firstName,
                last_name: lastName,
                city: city,
                state_province: stateProvince,
                country: country,
                bio: bio,
            })
            })
        .then((response) => {
            if (response.ok){
                response.json().then((user) => {
                    setEditingUser(true)
                    console.log(user)
                    setUser(user)
                })
            }
            else{
                response.json().then((error) => setErrors(error.errors))
            }
        })
    }

    function clearInputs(){
        setName("")
        setDescription("")
        setPrice("")
        setImage(null)
        setListWork(true)
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
                    <button className="select-pic" onClick={() => setListWork(false)}>List Work</button>
                    <br></br>
                    <button onClick={(() => setEditingUser(false))}>Edit User</button>
                    {editingUser ? (
                        <div>
                            <p>Name: {user.first_name} {user.last_name}</p>
                            <p>From: {user.city}, {user.state_province} - {user.country}</p>
                            <p>{user.bio}</p>
                        </div>
                        ) : (
                        <div>
                        <form onSubmit={updateUserInfo}>
                        <p>First Name</p>
                        <input 
                            name="firstname"
                            autoComplete="off"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <p>Last Name</p>
                        <input 
                            name="lastname" 
                            autoComplete="off"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <p>City</p>
                        <input 
                            name="city" 
                            autoComplete="off"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <p>State/Province</p>
                        <input 
                            name="state-province" 
                            autoComplete="off"
                            value={stateProvince}
                            onChange={(e) => setStateProvince(e.target.value)}
                        />
                        <p>Country</p>
                        <input 
                            name="country" 
                            autoComplete="off"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <p>Bio</p>
                        <textarea
                            name="bio"
                            autoComplete="off"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <button type="submit">
                            Update
                        </button>
                        <div>
                            {errors.map((error) => (
                                <Error key={error} error={error} />
                            ))}
                        </div>
                        </form>
                    </div>
                    )}
                    <p>My Listings:</p>
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
                    <button onClick={(() => clearInputs())}>Go Back</button>
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
                                <p>Price ($x.xx)</p>
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