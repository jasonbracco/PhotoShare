import React, {useContext, useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import usStates from "us-states"
import {CartContext} from "./CartContext"
import {UserContext} from "./UserContext"
 
function CheckoutForm({cartPrice}){

    const {cart, updateCart} = useContext(CartContext)
    const {user} = useContext(UserContext)

    const [nothingInCart, setNothingInCart] = useState(false)
    const [address, setAddress] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [zip, setZip] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cvv, setCvv] = useState("")
    const [month, setMonth] = useState("Select Month")
    const [year, setYear] = useState("Select Year")

    const states = Object.keys(usStates)

    const navigate = useNavigate()

    const backToShop = () => {
        navigate('/shop');
    }

    useEffect(() => {
        if(cartPrice > 0){
            setNothingInCart(false)
        }
        else{
            setNothingInCart(true)
        }
    }, [cartPrice])

    function submitCheckout(e){
        e.preventDefault()
        if(address.length === 0 || state == "Select a state"  || country.length === 0 || zip.length != 5){
            alert("Invalid Entry - Please Check Your Address");
        }
        else if(cardName.length === 0){
            alert("Invalid Entry - Please Check The Name On Your Card");
        }
        else if(cvv.length != 3 || cardNumber.length < 13 || month == "Select Month" || year == "Select Year"){
            alert("Invalid Credit Card Information");
        }
        else{
            cart.forEach((item) => {
                fetch("/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        photograph_id: item.id
                    })
                })
                .then((response) => {
                    if (response.ok){
                        response.json().then((order) => {
                            alert("Thanks For Your Order!");
                            updateCart([]);
                            backToShop();
                        })
                    }
                })
            })
        }
    }

    const handleZipChange = (e) => {
        const {value} = e.target;
        const zip = value.replace(/[^0-9]/g, "");
        setZip(zip);
    }

    const handleCardNumberChange = (e) => {
        const {value} = e.target;
        const cardNumber = value.replace(/[^0-9]/g, "");
        setCardNumber(cardNumber);
    }

    const handleCvvChange = (e) => {
        const {value} = e.target;
        const cvv = value.replace(/[^0-9]/g, "");
        setCvv(cvv);
    }

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
      };
    
      const handleYearChange = (e) => {
        setYear(e.target.value);
      };

    return(
        <div>
            {nothingInCart ? (
                <div>
                    <p>Nothing in your Cart!</p>
                    <p>Head Over to the Shop To Find Something New</p>
                </div>
            ) : (
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
                        <div>State</div>
                        <select value={state} onChange={((e) => setState(e.target.value))}>
                        <option>Select a state</option>
                        {states.map((state) => (
                            <option key={state} value={state.abbreviation}>
                                {state}
                            </option>
                        ))}
                        </select>
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
                            onChange={handleZipChange}
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
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                        /> 
                        <div>CVV</div>
                        <input 
                            name="CVV" 
                            autoComplete="off"
                            value={cvv}
                            onChange={handleCvvChange}
                        />
                        <div>Expiration Month</div>
                            <select value={month} onChange={handleMonthChange}>
                                <option value="Select Month">Select Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        <div>Expiration Year</div>
                            <select value={year} onChange={handleYearChange}>
                                <option value="Select Year">Select Year</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                <option value="2031">2030</option>
                            </select>
                    </div>
                    <br></br>
                    <button type="submit">
                        Order!
                    </button>
                </form>
            </div>
            )}
        </div>
        
    )
}

export default CheckoutForm