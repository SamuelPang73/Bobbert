import axios from "axios";
import qs from 'qs' ;
import { stripe_api_origin } from "../constants";

export const createPaymentIntent = async (body) => {
    try {
        let bodyData = qs.stringify(body) ;

        let res = await axios({
            method : 'post',
            url : stripe_api_origin + 'payment_intents',
            headers : { 
                'Authorization' : `Bearer ` +  process.env.REACT_APP_STRIPE_PRV_KEY ,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            data : bodyData
        }) ;

        return res.data ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}