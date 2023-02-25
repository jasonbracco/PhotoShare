import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import {UserContext} from "./UserContext"
import NavBar from "./NavBar"
import Homepage from "./Homepage"
import Profile from "./Profile"
import Shop from "./Shop"
import Orders from "./Pages/Orders"



function App() {

  const [user, setUser] = useState(null)
  const [photosUserIsSelling, setPhotosUserIsSelling] = useState([])

  useEffect(() => {
    fetch ("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user);
          setPhotosUserIsSelling(user.photographs)
        })
      }
    })
  }, [])

  function handleAddUserPhoto(newPhoto){
    setPhotosUserIsSelling([...photosUserIsSelling, newPhoto])
  }

  return (
    <div>
      <div className="header">Header</div>
      <div>Cart</div>
      <div className="side-navbar">
        <UserContext.Provider value={{user, setUser}}>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route exact path="/profile" element={<Profile userPhotos={photosUserIsSelling} onAddUserPhoto={handleAddUserPhoto}/>} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </UserContext.Provider >
      </div>
    </div>
  );
}

export default App;
