import React, {useContext, useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import usStates from "us-states"
import {CartContext} from "./CartContext"
import {UserContext} from "./UserContext"
import {Button, Form, Select} from 'semantic-ui-react'
 
function CheckoutForm({cartPrice}){

    const {cart, updateCart} = useContext(CartContext);
    const {user} = useContext(UserContext);

    const [nothingInCart, setNothingInCart] = useState(false);
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [month, setMonth] = useState("Select Month");
    const [year, setYear] = useState("Select Year");

    const states = Object.keys(usStates).map((state) => {
        return {"value": state, "text": state};
    })

    const navigate = useNavigate();

    const backToShop = () => {
        navigate('/shop');
    }

    useEffect(() => {
        if(cartPrice > 0){
            setNothingInCart(false);
        }
        else{
            setNothingInCart(true);
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
                            console.log(order)
                        })
                    }
                })
            })
            alert("Thanks For Your Order!");
            updateCart([]);
            backToShop();
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

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const months = [
        {value: "January", text: "January"},
        {value: "February", text: "February"},
        {value: "March", text: "March"},
        {value: "April", text: "April"},
        {value: "May", text: "May"},
        {value: "June", text: "June"},
        {value: "July", text: "July"},
        {value: "August", text: "August"},
        {value: "September", text: "September"},
        {value: "October", text: "October"},
        {value: "November", text: "November"},
        {value: "December", text: "December"},
    ]

    const years = [
        {value: "2023", text: "2023"},
        {value: "2024", text: "2024"},
        {value: "2025", text: "2025"},
        {value: "2026", text: "2026"},
        {value: "2027", text: "2027"},
        {value: "2028", text: "2028"},
        {value: "2029", text: "2029"},
        {value: "2030", text: "2030"},
        {value: "2031", text: "2031"},
        {value: "2032", text: "2032"},
    ]


    return(
        <div className="checkout-form">
            {nothingInCart ? (
                <div>
                    <p>Nothing in your Cart!</p>
                    <p>Head Over to the Shop To Find Something New</p>
                </div>
            ) : (
            <div>
                <Form onSubmit={submitCheckout} >
                    <div>
                        <Form.Input placeholder='Address' value={address} onChange={((e) => setAddress(e.target.value))} />
                        <Form.Input placeholder="Address Line 2" />
                        <Select placeholder="State" value={state} onChange={((handleStateChange))} options={states} />
                        <br></br>
                        <br></br>
                        <Form.Input placeholder="Country" value={country} onChange={((e) => setCountry(e.target.value))} />
                        <Form.Input placeholder="Zip" value={zip} onChange={handleZipChange} />
                        <Form.Input placeholder="Name On Card" value={cardName} onChange={((e) => setCardName(e.target.value))} />
                        <Form.Input placeholder="Card Number" value={cardNumber} onChange={handleCardNumberChange} />
                        <Form.Input placeholder="CVV" value={cvv} onChange={handleCvvChange} />
                        <Select placeholder="Expiration Month" value={month} onChange={handleMonthChange} options={months} />
                        <Select placeholder="Expiration Year" value={year} onChange={handleYearChange} options={years} />
                    </div>
                    <br></br>
                    <Button primary type="submit">
                        Order!
                    </Button>
                </Form>
            </div>
            )}
        </div>
        
    )
}

export default CheckoutForm