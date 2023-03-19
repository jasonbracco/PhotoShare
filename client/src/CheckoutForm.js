import React, {useContext, useState} from "react"
import {CartContext} from "./CartContext"
import {UserContext} from "./UserContext"
// import Error from "./Error"

function CheckoutForm({cartPrice}){

    const {cart} = useContext(CartContext)
    const {user} = useContext(UserContext)

    const [address, setAddress] = useState("")
    const [stateProvince, setStateProvince] = useState("")
    const [country, setCountry] = useState("")
    const [zip, setZip] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cvv, setCvv] = useState("")
    const [expiration, setExpiration] = useState("")
    // const [errors, setErrors] = useState([])

    function submitCheckout(e){
        e.preventDefault()
        if(address.length === 0 || stateProvince.length === 0 || country.length === 0 || zip.length === 0 || cardName.length === 0){
            alert("Invalid Entry - Please Check Your Address")
        }
        else{
            console.log("success!!")
        }
    }

    function handleInvalid(event) {
        event.preventDefault();
        const input = event.target;
        if (input.validity.tooShort) {
          input.setCustomValidity(`Invalid number of characters for ${event.target.name}`);
        }
        alert(input.validationMessage)
    }

    return(
        <div>
            <form onSubmit={submitCheckout} >
                <div>
                    <div>Address:</div>
                    <input 
                        name="address"
                        autoComplete="off"
                        value={address}
                        onChange={((e) => setAddress(e.target.value))}
                    />
                    <div>Address Line 2:</div>
                    <input 
                        name="address-2" 
                        autoComplete="off"
                    />
                    <div>State/Province</div>
                    <input 
                        name="state-province" 
                        autoComplete="off"
                        value={stateProvince}
                        onChange={((e) => setStateProvince(e.target.value))}
                    />
                    <div>Country</div>
                    <input 
                        name="country" 
                        autoComplete="off"
                        value={country}
                        onChange={((e) => setCountry(e.target.value))}
                    />
                    <div>Zip Code</div>
                    <input 
                        name="zip" 
                        autoComplete="off"
                        value={zip}
                        onChange={((e) => setZip(e.target.value))}
                    /> 
                </div>
                <div>
                    <div>Name On Card</div>
                    <input 
                        name="card-name" 
                        autoComplete="off"
                        value={cardName}
                        onChange={((e) => setCardName(e.target.value))}
                    />
                    <div>Card Number</div>
                    <input 
                        name="Card" 
                        autoComplete="off"
                        maxLength={16}
                        minLength={16}
                        value={cardNumber}
                        onInvalid={handleInvalid}
                        onChange={((e) => setCardNumber(e.target.value))}
                    /> 
                    <div>CVV</div>
                    <input 
                        name="CVV" 
                        autoComplete="off"
                        maxLength={3}
                        minLength={3}
                        onInvalid={handleInvalid}
                        value={cvv}
                        onChange={((e) => setCvv(e.target.value))}
                    />
                    <div>Expiration</div>
                    <input 
                        name="Expiration Date" 
                        autoComplete="off"
                        maxLength={5}
                        minLength={5}
                        onInvalid={handleInvalid}
                        value={expiration}
                        onChange={((e) => setExpiration(e.target.value))}
                    /> 
                </div>
                {/* <div>
                    {errors.map((error) => (
                        <Error key={error} error={error} />
                    ))}
                </div> */}
                <br></br>
                <button type="submit">
                    Order!
                </button>
            </form>
        </div>
        
    )
}

export default CheckoutForm