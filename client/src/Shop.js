import React, {useEffect, useState, useContext} from "react"
import {useNavigate} from "react-router-dom"; 
import {CartContext} from "./CartContext"
import AllPhotoCard from "./AllPhotoCard"
import {Grid, Button, Loader} from 'semantic-ui-react'
  
function Shop(){
 
    const {cart, updateCart} = useContext(CartContext);

    const [allPhotos, setAllPhotos] = useState([]);
    const [fetched, setFetched] = useState(false);

    const navigate = useNavigate();

    const navigateToPhoto = (photoID) => {
        navigate(`/photographs/${photoID}`);
    } 

    useEffect(() => {
        fetch ("/photographs").then((response) => {
            if (response.ok){
                response.json().then((photographs) => {
                    setAllPhotos(photographs);
                    setFetched(true);
                }) 
            }
        })
    }, [])  
    
    return (  
        <div> 
            <div>
                <h2 className="shop-header"><i>Shop</i></h2>
                <h4 className="shop-header">Find Out What's New at PhotoShare</h4>
            </div>
            <div className="shop">
                {fetched ? (
                    <div>
                        <Grid container columns={4}>
                            {allPhotos.map((photograph) => {
                                return <div className="shop-card" key={photograph.id}>
                                    <AllPhotoCard photograph={photograph}/>
                                    <Button size="mini" onClick={(() => navigateToPhoto(photograph.id))}>More Info</Button>
                                    <Button size="mini" onClick={(() => updateCart([...cart, photograph]))}>Add To Cart</Button>
                                    <br></br>
                                    <br></br> 
                                </div>
                            })}
                        </Grid>
                    </div>
                ) : (
                    <Loader active inline='centered' />
                )}
            </div>
        </div>
    )
}

export default Shop