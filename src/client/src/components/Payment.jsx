// import StripeCheckout from "react-stripe-checkout";
// import axios from 'axios';
// import { useEffect, useState } from "react";
// import { Button, Container } from "@mui/material";


// function Payment(probs){


//     const [product, setProduct] = useState({
//         name: probs.name,
//         price: probs.price,
//         Productby: probs.productby
//     })
//     const [isLoading, setLoading] = useState(true);

//     useEffect(() => {
//         if(isLoading){
//             setProduct({
//                 name: probs.name,
//                 price: probs.price,
//                 Productby: probs.productby
//             })
//             setLoading(false);
//         }
//     })

//     function handlePay(token){
//         axios.post("http://localhost:8000/api/users/payment",{method: "POST", headers:{"Content-Type": "application/json"}, 
//         body: {token,product}}).then(
//             res => {
//                 const {status} = res;
//             }
//         ).catch(err => {
//             console.log(err);
//         })
        
//     }

//     return(
//         <Container>

//             <StripeCheckout
//                 stripekey = "pk_test_51K93hWBUe3cPAowOhJYZh8Cywz1TTfu1i0VKKjrUq6ZuDshr8dWweQsABLP7puyDbBvJrAjCzssNpnLIXhaRniUi00L1Hpn9YS"
//                 token = {handlePay}
//                 name=""
//                 amount = {product.price*100}
//                 currency = "EGP"
//             >
                

//             </StripeCheckout>

//         </Container>
//     )


// }

// export default Payment;