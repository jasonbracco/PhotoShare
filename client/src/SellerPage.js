import React, {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom";

function SellerPage(){

    const {userID}=useParams()
    
    const [singleUser, setSingleUser] = useState(null)
    const [userFetched, setUserFetched] = useState(false)

    const navigate = useNavigate()

    const backToSellers = () => {
        navigate('/sellers');
      }
 
    useEffect(() => {
        fetch (`/users/${userID}`).then((response) => {
          if (response.ok) {
           response.json().then((user) => {
             setSingleUser(user)
             setUserFetched(true)
           })
         }
        })
     }, [userID])

    return(
        <div>
            {userFetched ? (
                <div>
                    <button onClick={backToSellers}>Back to Photographers</button>
                    <img className="selling-pic" alt="user" src={singleUser.image} />
                    <p>Bio: {singleUser.bio}</p>                    
                </div>
            ) : (
                <div>
                    Fetching...
                </div>
            )}
        </div>
    )
}

export default SellerPage