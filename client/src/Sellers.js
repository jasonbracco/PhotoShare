import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"; 
import SellerCard from "./SellerCard"
import { Grid, Button } from 'semantic-ui-react'
 
function Sellers(){

  const [sellers, setSellers] = useState([]);
  const [fetched, setFetched] = useState(false);

  const navigate = useNavigate()

  const navigateToSeller = (userID) => {
    navigate(`/sellerprofile/${userID}`);
}

  useEffect(() => {
    fetch ("/users").then((response) => {
       if (response.ok) {
          response.json().then((users) => {
            setFetched(true);
            setSellers(users);
          })
        } 
    })
  }, [])

  const usersWithPhotos = sellers.filter((seller) => {
    if (seller.selling.length > 0){
      return seller ;
    }
  })

  return( 
    <div className="photographers">
      {fetched ? (
          <div>
            <br></br>
              <h3>Meet The Photographers:</h3>
              <br></br>
              <Grid container columns={3}>
                {usersWithPhotos.map((user) => {
                    return <div className="photographer-card" key={user.id}>
                      <SellerCard user={user}/>
                      <Button onClick={(() => navigateToSeller(user.id))}>More info</Button>
                      <br></br> 
                      <br></br>
                      </div>
                })}
              </Grid>
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