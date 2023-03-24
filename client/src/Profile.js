import React, {useContext, useState} from "react"
import {UserContext} from "./UserContext"
import Error from "./Error"
import UserPhotoCard from "./UserPhotoCard"
import { Grid, Button, Form,  } from 'semantic-ui-react'

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
        <div className="profile"> 
            {listWork ? (
                <div>
                    <div className="profile-pic-buttons">
                        <img className="profile-pic" alt="profile-pic" src={user.image} />
                        <br></br>
                        <Button primary size="tiny" onClick={(() => setEditingUser(false))}>Edit My Information</Button>
                        <br></br>
                        <br></br>
                        <Button primary size="tiny" onClick={() => setListWork(false)}>List Work</Button>
                    </div>
                    {editingUser ? (
                        <div className="user-info">
                            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                            <p><strong>From:</strong> {user.city}, {user.state_province} - {user.country}</p>
                            <p>{user.bio}</p>
                        </div>
                        ) : ( 
                        <div>
                            <Form className="edit-user-info-form" onSubmit={updateUserInfo}>
                                <Form.Group widths='equal'>
                                    <Form.Input label='First name' placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    <Form.Input label='Last name' placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </Form.Group>
                                <Form.Group widths="equal">
                                    <Form.Input label='City' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
                                    <Form.Input label='State/Province' placeholder='State/Province' value={stateProvince} onChange={(e) => setStateProvince(e.target.value)} />
                                    <Form.Input label='Country' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} />
                                </Form.Group>
                                <Form.TextArea label='Bio' placeholder='Bio' value={bio} onChange={(e) => setBio(e.target.value)} autoComplete="off" />
                                <br></br>
                                <Button secondary type="submit">
                                    Update 
                                </Button>
                                <div>
                                    {errors.map((error) => (
                                        <Error key={error} error={error} />
                                    ))}
                                </div> 
                            </Form>
                        </div>
                    )}
                    <br></br>
                    <br></br> 
                    <div className="user-photos">
                        <h2>My Listings:</h2>
                        <Grid container columns={3}>
                            {userPhotos.map((photograph) => {
                                return <Grid.Column key={photograph.id}>
                                    <UserPhotoCard key={photograph.id} photograph={photograph} deleteUserPhoto={handleDeleteUserPhoto} updateUserPhoto={handleEditUserPhoto}/>
                                </Grid.Column>
                            })} 
                            <br></br> 
                            <br></br>
                        </Grid>
                    </div>
                </div>
            ) : (
                <div className="list-work-form">
                    <Button primary onClick={(() => clearInputs())}>Go Back</Button>
                    <h2>Give us some details about your listing:</h2>
                    <Form onSubmit={handleListPhoto}>
                        <Form.Field>
                            <p>Name</p>
                            <input 
                                name="name"
                                autoComplete="off"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <p>Description</p>
                            <textarea
                                name="description"
                                autoComplete="off"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                />
                        </Form.Field>
                        <Form.Field>
                            <p>Price ($X.XX)</p>
                            <input
                                name="price"
                                autoComplete="off"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                />
                        </Form.Field>
                        <Form.Field>
                            <p>Upload Photograph</p>
                            <input
                                name="photoraph"
                                onChange={(e) => setImage(e.target.files[0])}
                                type="file"
                                accept=".jpg, .jpeg, .png"
                            />                            
                        </Form.Field>
                        <div>
                            {errors.map((error) => (
                                <Error key={error} error={error} />
                            ))}
                        </div>
                        <br></br>
                        <Button secondary type="submit">
                            Sell My Photo!
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    )
}

export default Profile 