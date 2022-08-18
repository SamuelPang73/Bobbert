import * as React from 'react' ;

import {
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
} from '@mui/material' ;


import { loadStripe } from "@stripe/stripe-js";

import {
    Elements,
} from "@stripe/react-stripe-js";

import PaymentCheckOut from './PaymentCheckOut';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    paper: {
        backgroundColor : 'white !important',
        border : 'none',
        borderRadius : '10px !important',
    }
})) ;

const stripePromise =  loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

const PaymentModal = (props) => {
    const classes = useStyles() ;

    const {
        clientSecret,
        paymentId,
        open, 
        handleClose
    } = props ;

    const appearance = {
        theme: 'stripe',

        variables: {
            colorPrimary: '#0570de',
            colorBackground: 'white',
            colorText: '#707070',
            colorDanger: '#df1b41',
            fontSizeBase : '20px',
            borderRadius: '4px',
        }
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                classes ={{
                    paper : classes.paper
                }}
                hideBackdrop={false}
            >
                <DialogTitle>
                    You can pay with your debit card.
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Elements options={options} stripe={stripePromise}>
                        <PaymentCheckOut
                            clientSecret={clientSecret}
                            id={paymentId}
                        />
                    </Elements>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PaymentModal ;