import React, {useState, useEffect, useContext} from "react"
import {UserContext} from "./UserContext"
import OrderCard from "./OrderCard"

function Orders(){ 

    const {user} = useContext(UserContext)
    console.log(user)

    const [orders, setOrders] = useState([])
    const [fetched, setFetched] = useState(false)

    console.log(orders)


    useEffect(() => {
        fetch (`/orders/${user.id}`).then((response) => {
            if (response.ok){
                response.json().then((order) => {
                        console.log(order)
                        setOrders(order)
                        setFetched(true)
                })
            }
        })
    }, [])

    return (
        <div>
            {fetched ? (
                <div>
                    <div>
                        Your Orders:
                        <br></br>
                        <br></br>
                        {orders.map((order) => {
                            return <OrderCard key={order.id} order={order} /> 
                        })}
                    </div>
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