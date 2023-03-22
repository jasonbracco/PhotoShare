import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"; 
import SellerCard from "./SellerCard"

function Sellers(){

  const [sellers, setSellers] = useState([])
  const [fetched, setFetched] = useState(false)

  const navigate = useNavigate()

  const navigateToSeller = (userID) => {
    navigate(`/sellerprofile/${userID}`)
}

  useEffect(() => {
    fetch ("/users").then((response) => {
       if (response.ok) {
          response.json().then((users) => {
            setFetched(true)
            setSellers(users)
          })
        }
    })
  }, [])

  const usersWithPhotos = sellers.filter((seller) => {
    if (seller.selling.length > 0){
      return seller
    }
  })

  return( 
    <div className="photographers">
      {fetched ? (
          <div>
            <br></br>
              <p>Meet The Photographers:</p>
              <br></br>
              {usersWithPhotos.map((user) => {
                  return <div key={user.id}>
                    <SellerCard user={user}/>
                    <button onClick={(() => navigateToSeller(user.id))}>More info</button>
                    <br></br>
                    <br></br>
                    </div>
              })}
          </div>
      ) : (
        <div>
          Fetching...
        </div>
      )}
    </div>

    )
}

export default Sellers