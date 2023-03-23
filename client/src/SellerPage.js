import React, {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom";
import OtherListedItems from "./OtherListedItems" 

function SellerPage(){

    const {userID}=useParams()
    
    const [singleUser, setSingleUser] = useState(null)
    const [userFetched, setUserFetched] = useState(false)

    console.log(singleUser)

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
        <div className="photographers">
            {userFetched ? (
                <div>
                <div>
                    <button onClick={backToSellers}>Back to Photographers</button>
                    <br></br>
                    <img className="selling-pic" alt="user" src={singleUser.image} />
                    <p>Name: {singleUser.first_name} {singleUser.last_name}</p>
                    <p>From: {singleUser.city}, {singleUser.state_province} - {singleUser.country}</p>
                    <p>Bio: {singleUser.bio}</p>                    
                </div>
                    {singleUser.first_name}'s Other Listings:
                    {singleUser.selling.map((otherItemSelling) => {
                        return <OtherListedItems key={otherItemSelling.id} photograph={otherItemSelling} />
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

export default SellerPage