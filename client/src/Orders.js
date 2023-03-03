import React, {useState, useEffect} from "react"
import OrderCard from "./OrderCard"

function Orders(){

    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch ("/orders").then((response) => {
            if (response.ok){
                response.json().then((order) => {
                    setOrders(order)
                })
            }
        })
    }, [])

    console.log(orders)


    return (
        <div>
            {orders.map((order) => {
                return <OrderCard key={order.id} order={order} /> 
            })}
        </div>
    )
}

export default Orders