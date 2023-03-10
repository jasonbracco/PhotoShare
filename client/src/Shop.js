import React, {useEffect, useState, useContext} from "react"
import { Link, Outlet} from "react-router-dom"; 
import {CartContext} from "./CartContext"
import AllPhotoCard from "./AllPhotoCard"
 
function Shop(){

    const {cart, updateCart} = useContext(CartContext)

    const [allPhotos, setAllPhotos] = useState([])
    const [singlePhoto, setSinglePhoto] = useState(true)
    const [fetched, setFetched] = useState(false)


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
                    {singlePhoto ? (
                        <div>
                            {allPhotos.map((photograph) => {
                                return <div key={photograph.id}>
                                <Link to={`${photograph.id}`} onClick={(() => setSinglePhoto(false))}> <AllPhotoCard photograph={photograph} /> </Link>
                                <button onClick={(() => updateCart([...cart, photograph]))}>Add To Cart</button>
                                <br></br>
                                <br></br>
                                </div>
                            })}
                        </div>
                        ) : ( 
                        <div>
                            <button onClick={(() => setSinglePhoto(true))}>
                                <Link to="/shop">Back To Shop</Link>
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

export default Shop