import React, {useState, useEffect} from "react"
import SellerCard from "./SellerCard"

function Sellers(){

    const [sellers, setSellers] = useState([])


     useEffect(() => {
       fetch ("/users").then((response) => {
         if (response.ok) {
          response.json().then((users) => {
            console.log(users)
            setSellers(users)
          })
        }
       })
    }, [])

  return( 

    <div>
        Meet The Photographers:
        <br></br>
        {sellers.map((user) => {
            return <SellerCard user={user}/>
        })}
    </div>

    )
}

export default Sellers