import * as React from 'react' ;

import { Dialog, DialogContent , DialogTitle, Divider , Button} from '@mui/material';

import confirmImage from '../../assets/landing/Success.svg' ;

import {useNavigate} from 'react-router-dom' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    paper: {
        backgroundColor : 'white !important',
        border : '1px solid green',
        borderRadius : '10px !important',

        "& .MuiDialogContent-root" : {
            display : 'flex',
            flexDirection : 'column',
            gap : '10px',

            alignItems : 'center',

            fontWeight : 'bold',
            fontSize:  25,
        }
    }
}))

const PaymentConfirm = (props) => {
    const {
        open,
        handleClose
    } = props ;
    
    const classes = useStyles() ;
    const navigate = useNavigate() ;

    return (
        <Dialog
            open={open}
            fullWidth
            classes ={{
                paper : classes.paper
            }}
            hideBackdrop={false}
        >
            <Divider />
            <DialogContent>
                <img src={confirmImage} alt={'no confirm'} width={100} height={100} />
                <div>
                    Payment Successeed
                </div>
                <Button
                    variant='contained'
                    color='success'
                    size='large'
                    onClick={() => {
                        navigate('/') ;
                        handleClose() ;
                    }}
                >
                    Got it
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default PaymentConfirm ;