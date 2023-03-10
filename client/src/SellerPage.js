import React, {useEffect, useState} from "react"
import { useParams} from "react-router-dom";

function SellerPage(){

    const {id}=useParams()
    
    const [singleUser, setSingleUser] = useState(null)
    const [userFetched, setUserFetched] = useState(false)

    useEffect(() => {
        fetch (`/users/${id}`).then((response) => {
          if (response.ok) {
           response.json().then((user) => {
             setSingleUser(user)
             setUserFetched(true)
           })
         }
        })
     }, [])

    return(
        <div>
            {userFetched ? (
                <div>
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