import React, { useState } from "react";

import Loading from 'react-loading-components' ;

import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

import {
    Box,
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

// Montserrat
export const useStyles = makeStyles((theme) => ({
    root : {
        position : 'relative',

        display : 'flex', alignItems : 'center', justifyContent : 'center',

        "& button" : {
            textTransform : 'capitalize !important',
            fontSize : 20,
            minWidth : '150px !important',
            borderRadius : 25,
            border : 'none !important',
            height : 40,
            cursor : 'pointer',
            background : '#707070',
            color : 'white',

            display : 'flex', justifyContent : 'center', alignItems : 'center', gap : 10,
        },
        "& button:disabled" : {
            color : 'gray',
            cursor : 'not-allowed !important'
        }
    },
})) ;

const PaymentCheckOut = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const classes = useStyles() ;
    
    const  {
        clientSecret,
    }  = props ;

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
            <Box className={classes.root}>
                {
                    <form id="payment-form" onSubmit={handleSubmit}>
                        <PaymentElement id="payment-element" />
                        {message && <Box id="payment-message" sx={{mt: '20px'}}>{message}</Box>}
                        <Box sx={{mt : '20px', display : 'flex', justifyContent : 'flex-end'}}>
                            <button disabled={isLoading || !stripe || !elements || !clientSecret} id="submit">
                                {
                                    isLoading ? <>
                                        <Loading type='oval' width={30} height={30} fill={'white'} /> ...Pending
                                    </>
                                    : "Pay now"
                                }
                            </button>
                        </Box>
                    </form>
                }
            </Box>
  );
}
export default PaymentCheckOut;