import React, {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom";
import SingleReview from "./SingleReview"
import {Button, Grid, Loader} from 'semantic-ui-react'

 
function PhotoPage(){
    
 
    const {photoID} = useParams()

    const [photograph, setPhotograph] = useState(null)
    const [photoFetched, setPhotoFetched] = useState(false)
    const [reviews, setReviews] = useState([])

    const navigate = useNavigate()

    const backToShop = () => {
        navigate('/shop');
    }
 
    useEffect(() => {
        fetch (`/photographs/${photoID}`).then((response) => {
          if (response.ok) {
            response.json().then((photograph) => {
              setPhotograph(photograph);
              setPhotoFetched(true);
              setReviews(photograph.reviews);
            })
            }
        }); 
      },[photoID]);

    function handleDeleteReview(id){
        const updatedReviews = reviews.filter((review) => review.id !== id);
        setReviews(updatedReviews);
    }
 
    return( 
        <div className="single-shop-photo">
            {photoFetched ? (
                <div>
                    <Button primary onClick={backToShop}>Back to Shop</Button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="shop-photo">
                        <img className="single-shop-pic" alt="item" src={photograph.image} />
                    </div>
                    <div className="shop-photo-info">
                        <h4><i>Title:</i> {photograph.name}</h4>
                        <h4><i>Description:</i> {photograph.description}</h4>
                        <h4><i>Taken By:</i> {photograph.user.first_name} {photograph.user.last_name}</h4>
                    </div>
                    <div className="shop-photo-reviews">
                        <h3>Reviews:</h3>
                        <br></br>
                        <br></br>
                        <Grid>
                        {reviews.map((review) => {
                            return <SingleReview key ={review.id} review={review} handleDeleteReview={handleDeleteReview}/>
                        })}
                        </Grid>
                    </div>
                </div>
            ) : (
                <Loader active inline='centered' />
            )}
        </div>
    )
}

export default PhotoPage