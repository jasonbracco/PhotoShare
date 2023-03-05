import React, {useEffect, useState} from "react"
import { Link, Outlet} from "react-router-dom"; 
import AllPhotoCard from "./AllPhotoCard"
 
function Shop(){

    const [allPhotos, setAllPhotos] = useState([])
    const [singlePhoto, setSinglePhoto] = useState(true)

    useEffect(() => {
        fetch ("/photographs").then((response) => {
            if (response.ok){
                response.json().then((photographs) => {
                    setAllPhotos(photographs)
                })
            }
        })
    }, [])

    return (
        <div>
        {singlePhoto ? (
        <div>
            {allPhotos.map((photograph) => {
                return <Link 
                    key={photograph.id} 
                    to={`${photograph.id}`} 
                    onClick={(() => setSinglePhoto(false))}>
                    <AllPhotoCard key={photograph.id} photograph={photograph} />
                </Link>
            })}
        </div>
        ) : (
        <div>
            <Outlet />
            <button onClick={(() => setSinglePhoto(true))}>
                <Link to="/shop">Back</Link>
            </button>
        </div>
        )}
        </div>
    )
}

export default Shop