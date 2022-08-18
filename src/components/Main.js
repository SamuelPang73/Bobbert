import React from 'react' ;

import { connect } from 'react-redux';

import Routing from './Routes';

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
    }
}))

const Main = (props) => {
    const classes = useStyles() ;

    return (
        <Box className={classes.root}>
            <Routing />
        </Box>
    )
}

Main.propTypes = {

}
const mapStateToProps = state => ({
   
}) ;
const mapDispatchToProps = {
  
} ;
export default connect(mapStateToProps, mapDispatchToProps)(Main) ;