import React, {useState, useEffect} from "react"
import { Link, Outlet} from "react-router-dom"; 
import SellerCard from "./SellerCard"

function Sellers(){

  const [sellers, setSellers] = useState([])
  const [singlePhotographer, setSinglePhotographer] = useState(true)
  const [fetched, setFetched] = useState(false)

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

  return( 
    <div>
      {fetched ? (
        <div>
          {singlePhotographer ? (
          <div>
              Meet The Photographers:
              <br></br>
              {sellers.map((user) => {
                  return <div key={user.id}>
                    <Link to={`${user.id}`} onClick={(() => setSinglePhotographer(false))}><SellerCard user={user}/></Link>
                    <br></br>
                    <br></br>
                    </div>
              })}
          </div>
          ) : (
          <div>
              <button onClick={(() => setSinglePhotographer(true))}>
                <Link to="/sellers">Back To Photographers</Link>
              </button>
              <Outlet />
          </div>
          )}
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