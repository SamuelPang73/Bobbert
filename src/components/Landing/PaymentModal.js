import * as React from 'react' ;

import styled from 'styled-components';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
    InputLabel,
    TextField,
    DialogActions,
} from '@mui/material' ;


import { loadStripe } from "@stripe/stripe-js";

import {
    Elements,
} from "@stripe/react-stripe-js";

import PaymentCheckOut from './PaymentCheckOut';
import { Button, FormControlGroup } from '../../shared/ui';
import Loading from 'react-loading-components' ;

import { createPaymentIntent } from '../../stripe/payment_api';

import { makeStyles } from '@mui/styles';
import Card from '../../shared/ui/Card';

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
        open, 
        handleClose,
        productInfo,
        totalAmount,
        totalProduct
    } = props ;

    const [clientSecret, setClientSecret] = React.useState(false) ;
    const [paymentId, setPaymentId] = React.useState(false) ;
    const [loading, setLoading] = React.useState(false) ;

    const [full_name, setFullName] = React.useState('') ;
    const [message, setMessage] = React.useState('') ;

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


    const handlePay = async () => {
        setLoading(true) ;

        let data ;

        if(productInfo) {
            data = {
                "amount" : Number(productInfo.price * 100).toFixed(),
                "currency"  : 'usd',
                "payment_method_types[]" : 'card',
                "metadata[created_at]" : new Date().getTime() ,
                "metadata[full_name]" : full_name,
                "metadata[message]" : message,
                "metadata[type]" : productInfo.type,
                "metadata[product_name]" : productInfo.name,
                "metadata[product_description]" : productInfo.description,
                "metadata[product_price]" : productInfo.price,
            } ;
        } else {
            data = {
                "amount" : Number(totalAmount * 100).toFixed(),
                "currency"  : 'usd',
                "payment_method_types[]" : 'card',
                "metadata[created_at]" : new Date().getTime() ,
                "metadata[full_name]" : full_name,
                "metadata[message]" : message,
                "metadata[type]" : 'total payment',
                "metadata[products]" : totalProduct
            } ;
        }
        
        let res = await createPaymentIntent(data) ;

        if(res) {
            setClientSecret(res.client_secret) ;
            setPaymentId(res.id) ;
        }

        setLoading(false) ;
    }

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
                    {
                        productInfo ? <>
                            Complete Purchase : {productInfo?.price} - {productInfo?.description}
                        </> : <>
                            Totally : $ {totalAmount}
                        </>
                    }
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {(clientSecret && paymentId) ? <Elements options={options} stripe={stripePromise}>
                        <PaymentCheckOut
                            clientSecret={clientSecret}
                            id={paymentId}
                        />
                    </Elements> : <BuyerInfoDiv>
                        {
                            productInfo && <>
                                <ProductInfoDiv
                                >
                                    <Card
                                        imageUrl={productInfo?.image}
                                        header={
                                            <CardHeader>{productInfo?.name}</CardHeader>
                                        }
                                        content={
                                            <>
                                                <CardLabel>{productInfo?.description}</CardLabel>
                                                <PriceDiv>${productInfo?.price}</PriceDiv>
                                            </>
                                        }
                                    />
                                </ProductInfoDiv>
                                <Divider />
                            </>
                        }
                        <FormControlGroup>
                            <InputLabel>Full Name</InputLabel>
                            <TextField 
                                value={full_name}
                                onChange={(e) => setFullName(e.target.value)}
                                size={'small'}
                            />
                        </FormControlGroup>
                        <FormControlGroup>
                            <InputLabel>Message</InputLabel>
                            <TextField 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                size={'small'}
                                rows={5}
                                multiline
                            />
                        </FormControlGroup>
                    </BuyerInfoDiv>}
                </DialogContent>
                {
                    (clientSecret && paymentId) ? <></> : <>
                        <Divider />
                        <DialogActions>
                            <Button
                                onClick={handlePay}
                                className={loading ? 'disabled' : ''}
                            >
                                {
                                    loading && <>
                                        <Loading type='oval' width={30} height={30} fill={'white'} />&nbsp;&nbsp;
                                    </>
                                } Next
                            </Button>
                        </DialogActions>
                    </>
                }
            </Dialog>
        </>
    )
}

export default PaymentModal ;

const BuyerInfoDiv = styled.div`
    display : flex ;
    flex-direction : column ;
    gap : 15px;
`

const ProductInfoDiv = styled.div`
    display : flex;
    justify-content : center;

    & > div {
        width : 100% ;
        font-size : 25px;
    }
`

const CardHeader = styled.div`
    color : #A5A5A5 ;
`
const CardLabel = styled.div`
    color : #707070 ;
    font-size : 23px;
`

const PriceDiv = styled.div`
    font-size : 30px;
    font-weight : bold ;
    color : #707070 ;
`