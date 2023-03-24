import React, {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom";
import OtherListedItems from "./OtherListedItems" 
import {Button, Grid} from 'semantic-ui-react'

function SellerPage(){

    const {userID}=useParams();
    
    const [singleUser, setSingleUser] = useState(null);
    const [userFetched, setUserFetched] = useState(false);

    console.log(singleUser);

    const navigate = useNavigate();

    const backToSellers = () => {
        navigate('/sellers');
      }
 
    useEffect(() => {
        fetch (`/users/${userID}`).then((response) => {
          if (response.ok) {
           response.json().then((user) => {
             setSingleUser(user);
             setUserFetched(true);
           })
         }
        }) 
     }, [userID])

    return(
        <div className="single-shop-photo">
            {userFetched ? (
                <div>
                    <div> 
                        <Button primary onClick={backToSellers}>Back to Photographers</Button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="shop-photo">
                            <img className="single-shop-pic" alt="user" src={singleUser.image} />
                        </div>
                        <div className="shop-photo-info">
                            <h4><i>Name:</i> {singleUser.first_name} {singleUser.last_name}</h4>
                            <h4><i>From:</i> {singleUser.city}, {singleUser.state_province} - {singleUser.country}</h4>
                            <h4><i>Bio:</i> {singleUser.bio}</h4>              
                        </div>      
                    </div>
                    <div className="user-photos">
                        <h3>{singleUser.first_name}'s Other Listings:</h3>
                        <br></br>
                        <br></br>
                        <Grid container columns={3}>
                            {singleUser.selling.map((otherItemSelling) => {
                                return <Grid.Column key={otherItemSelling.id}>
                                        <OtherListedItems key={otherItemSelling.id} photograph={otherItemSelling} />
                                    </Grid.Column>
                            })}   
                        </Grid> 
                    </div> 
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