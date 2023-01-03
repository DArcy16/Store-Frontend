import React from 'react'
import { useRouter } from 'next/router';
const stripe = require('stripe')(process.env.NEXT_PUBLIC_SECRET_KEY);

export async function getServerSideProps(params) {
    const order = await stripe.checkout.sessions.retrieve(params.query.sessionId, {
        expand : ['line_items']
    })
    return {
        props: {order}
    }
}

const success = ({ order }) => {
    const router = useRouter();
    console.log(order);
  return (
    <div className='container'>
        <div className='bg-white mx-auto mt-30 text-center rounded shadow-xl p-6 leading-6 max-w-xl'>
            <h1>Thank you for your purchase!</h1>
            <p>Email sent to: <span>{order.customer_details.email}</span></p>
            <div>
                <div className='mt-3'>
                    <h3>Address</h3>
                    {Object.entries(order.customer_details.address).map(([key,value]) => (
                        <p key={key}>{key} : {value}</p>
                    ))}
                </div>
                <div className='mt-3'>
                    <h3>Your Order Deatils</h3>
                    {
                        order.line_items.data.map(item => (
                            <div key={item.id}>
                                <p>Product: {item.title}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price : {item.price.unit_amount}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button
             className='px-3 py-2 text-white border-none bg-gray-800 hover:bg-gray-800'
             onClick={() => router.push('/')
             }>
                Continue Shopping
            </button>
        </div>
    </div>
  )
}

export default success