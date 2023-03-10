import React, {useEffect, useState} from "react"
import { useParams} from "react-router-dom";
import SingleReview from "./SingleReview"

function PhotoPage(){

    const {id}=useParams()

    const [photograph, setPhotograph] = useState(null)
    const [photoFetched, setPhotoFetched] = useState(false)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch (`/photographs/${id}`).then((response) => {
          if (response.ok) {
            response.json().then((photograph) => {
              setPhotograph(photograph)
              setPhotoFetched(true)
              setReviews(photograph.reviews)
            })
            }
        });
      }, [id]);

    return(
        <div>
            {photoFetched ? (
                <div>
                    <img className="selling-pic" alt="item" src={photograph.image} />
                    <p>Title: {photograph.name}</p>
                    <p>Description: {photograph.description}</p>
                    <div>
                        Reviews: 
                        <br></br>
                        <br></br>
                        {reviews.map((review) => {
                            return <SingleReview key ={review.id} review={review} />
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