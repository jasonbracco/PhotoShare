import React, {useContext} from "react"
import {CartContext} from "./CartContext"
import {Item, Button} from 'semantic-ui-react'
 
function OtherListedItems({photograph}){

    const {cart, updateCart} = useContext(CartContext);

    return(
        <div>
            <Item>
                <div className="shop-card-picture-space">
                    <img className="selling-pic" alt="item" src={photograph.image} />
                </div>
                <br></br>
                <Item.Header><strong>Name:</strong> {photograph.name}</Item.Header>
                <Item.Description><strong>Description:</strong> {photograph.description}</Item.Description>
                <br></br>
                <strong>Price:</strong> ${photograph.formatted_price}
                <br></br>
                <Button onClick={(() => updateCart([...cart, photograph]))}>Add To Cart</Button>
                <br></br>
            </Item>
        </div>
    )
}

export default OtherListedItems