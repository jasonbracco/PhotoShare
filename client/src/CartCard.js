import React, {useContext} from "react"
import {CartContext} from "./CartContext"
import {Item } from 'semantic-ui-react'
import {Button} from 'semantic-ui-react'

function CartCard({item, uniqueItems}){

    const {cart, updateCart} = useContext(CartContext);

    function handleRemoveAllFromCart(){
        const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
        updateCart(newCart);
    } 
 
    function addOneToCart(e){
        e.preventDefault();
        updateCart([...cart, item]);
    }

    function removeOneFromCart(e){
        e.preventDefault();
        uniqueItems.filter((uniqueItem) => {
            if (uniqueItem.id === item.id && uniqueItem.count > 1){
                const itemToDelete = cart.find(item => uniqueItem.id === item.id);
                const indexToRemove = cart.indexOf(itemToDelete);
                if (indexToRemove >= 0) {
                    const newCart = [...cart];
                    newCart.splice(indexToRemove, 1);
                    updateCart(newCart);
                }
            }
            else if (uniqueItem.id === item.id){
                const newCart = (cart.filter((item) => item.id !== uniqueItem.id));
                updateCart(newCart);
            }
        })
    }

    return(
        <Item>
            <img className= "selling-pic" alt="Added To Cart" src={item.image} />
            <br></br>
            <Button size="tiny" onClick={removeOneFromCart}>-</Button> {item.count} <Button size="tiny" onClick={addOneToCart}>+</Button>
            <Button size="tiny" onClick={handleRemoveAllFromCart}>Remove All From Cart</Button>
            <Item.Header><strong>Name:</strong> {item.name}</Item.Header>
            <Item.Description className="item-description"><strong>Description:</strong> {item.description}</Item.Description>
            <strong>Price:</strong> ${item.formatted_price}
            <br></br>
            <br></br>
            <br></br>
        </Item>
    )
}

export default CartCard