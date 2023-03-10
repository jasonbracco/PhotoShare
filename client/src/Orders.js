import React, {useState, useEffect} from "react"
import OrderCard from "./OrderCard"

function Orders(){

    const [orders, setOrders] = useState([])
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        fetch ("/orders").then((response) => {
            if (response.ok){
                response.json().then((order) => {
                    setOrders(order)
                    setFetched(true)
                })
            }
        })
    }, [])

    console.log(orders)


    return (
        <div>
            {fetched ? (
                <div>
                    Your Orders:
                    <br></br>
                    <br></br>
                    {orders.map((order) => {
                        return <OrderCard key={order.id} order={order} /> 
                    })}
                </div>
            ) : (
                <div>
                    Fetching...
                </div>
            )}
        </div>
    )
}

export default Orders