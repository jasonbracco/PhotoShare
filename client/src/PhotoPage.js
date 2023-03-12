import React, {useEffect, useState, useContext} from "react"
import {useParams, useNavigate} from "react-router-dom";
import {UserContext} from "./UserContext"
import SingleReview from "./SingleReview"

function PhotoPage(){
 
    const {photoID} = useParams()
    const {user} = useContext(UserContext)

    const [photograph, setPhotograph] = useState(null)
    const [photoFetched, setPhotoFetched] = useState(false)
    const [reviews, setReviews] = useState([])
    console.log(reviews)

    const navigate = useNavigate()

    const backToShop = () => {
        navigate('/shop');
      }

    useEffect(() => {
        fetch (`/photographs/${photoID}`).then((response) => {
          if (response.ok) {
            response.json().then((photograph) => {
              setPhotograph(photograph)
              setPhotoFetched(true)
              setReviews(photograph.reviews)
            })
            }
        }); 
      },[user.reviews]);

    function handleDeleteReview(id){
        const updatedReviews = reviews.filter((review) => review.id !== id);
        setReviews(updatedReviews);
    }

    return(
        <div>
            {photoFetched ? (
                <div>
                    <br></br>
                    <br></br>
                    <button onClick={backToShop}>Back to Shop</button>
                    <br></br>
                    <img className="selling-pic" alt="item" src={photograph.image} />
                    <p>Title: {photograph.name}</p>
                    <p>Description: {photograph.description}</p>
                    <div>
                        Reviews: 
                        <br></br>
                        <br></br>
                        {reviews.map((review) => {
                            return <SingleReview key ={review.id} review={review} reviews={reviews} handleDeleteReview={handleDeleteReview}/>
                        })}
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

export default PhotoPage