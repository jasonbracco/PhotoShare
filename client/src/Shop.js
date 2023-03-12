import React, {useEffect, useState, useContext} from "react"
import {useNavigate} from "react-router-dom"; 
import {CartContext} from "./CartContext"
import AllPhotoCard from "./AllPhotoCard"
  
function Shop(){
 
    const {cart, updateCart} = useContext(CartContext)

    const [allPhotos, setAllPhotos] = useState([])
    const [fetched, setFetched] = useState(false)

    const navigate = useNavigate()

    const navigateToPhoto = (photoID) => {
        navigate(`/photographs/${photoID}`)
    }

    useEffect(() => {
        fetch ("/photographs").then((response) => {
            if (response.ok){
                response.json().then((photographs) => {
                    setAllPhotos(photographs)
                    setFetched(true)
                })
            }
        })
    }, [])
   
    return (
        <div>
            {fetched ? (
                <div>
                    {allPhotos.map((photograph) => {
                        return <div key={photograph.id}>
                            <AllPhotoCard photograph={photograph}/>
                            <button onClick={(() => navigateToPhoto(photograph.id))}>More Info</button>
                            <button onClick={(() => updateCart([...cart, photograph]))}>Add To Cart</button>
                            <br></br>
                            <br></br>
                        </div>
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

export default Shop