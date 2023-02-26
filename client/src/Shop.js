import React, {useEffect, useState} from "react"
import AllPhotoCard from "./AllPhotoCard"

function Shop(){

    const [allPhotos, setAllPhotos] = useState([])

    useEffect(() => {
        fetch ("/photographs").then((response) => {
            if (response.ok){
                response.json().then((photographs) => {
                    setAllPhotos(photographs)
                })
            }
        })
    }, [])

    console.log(allPhotos)


    return (
        <div>
            {allPhotos.map((photograph) => {
                return <AllPhotoCard key={photograph.id} photograph={photograph} />
            })}
        </div>
    )
}

export default Shop