import React, {useState, useEffect, useContext} from "react"
import {UserContext} from "./UserContext"
import OrderCard from "./OrderCard"
import {Grid} from 'semantic-ui-react'


function Orders(){ 

    const {user} = useContext(UserContext);

    const [orders, setOrders] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        fetch (`/orders/${user.id}`).then((response) => {
            if (response.ok){
                response.json().then((order) => {
                        setOrders(order);
                        setFetched(true);
                })
            }
        })
    }, [])

    return (
        <div className="orders">
            {fetched ? (
                <div>
                    <div>
                        <h2>Your Orders:</h2>
                        <br></br>
                        <br></br>
                        <Grid container columns={4}>
                            {orders.map((order) => {
                                return <OrderCard key={order.id} order={order} /> 
                            })} 
                        </Grid>
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