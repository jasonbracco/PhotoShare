import React, {useState, useEffect} from "react"
import { Link, Outlet} from "react-router-dom"; 
import SellerCard from "./SellerCard"

function Sellers(){

    const [sellers, setSellers] = useState([])
    const [singlePhotographer, setSinglePhotographer] = useState(true)


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
      {singlePhotographer ? (
      <div>
          Meet The Photographers:
          <br></br>
          {sellers.map((user) => {
              return <div>
                <Link to={`${user.id}`} onClick={(() => setSinglePhotographer(false))}><SellerCard key={user.id} user={user}/></Link>
                <br></br>
                <br></br>
                </div>
          })}
      </div>
      ) : (
      <div>
          <button onClick={(() => setSinglePhotographer(true))}>
            <Link to="/sellers">Back To Photographs</Link>
          </button>
          <Outlet />
      </div>
      )}
    </div>

    )
}

export default Sellers