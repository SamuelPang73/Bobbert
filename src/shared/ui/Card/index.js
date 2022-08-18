import * as React from 'react' ;
import styled from 'styled-components';

import { Divider } from '@mui/material';

const Card  = (props) => {
    const {
        imageUrl,
        header,
        content,
        footer
    } = props ;
    
    return (
        <CardDiv>
            <CardImage>
                {imageUrl && <img src={imageUrl} />}
            </CardImage>
            <Divider />
            <CardHeader>
                {header}
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardFooter>
                {footer}
            </CardFooter>
        </CardDiv>
    )
}

export default Card ;

const CardDiv = styled.div`
    border-radius : 30px ;

    width : 250px;
    height : 400px ;

    background : #FFFFFF ;
    
    overflow : hidden ;

    display : flex ;
    flex-direction : column ;
    justify-content : space-between ;
`
const CardImage = styled.div`
    height : 50%;

    display : flex ;
    justify-content : center ;
    align-items : center ;

    overflow : hidden ;

    & img {
        max-width : 100%;
        max-height : 100%;
    }
`
const CardHeader = styled.div`
    padding : 0px 30px 0px 30px;
`
const CardContent = styled.div`
    padding : 0px 30px 0px 30px;
`
const CardFooter = styled.div`
    padding : 0px 30px 30px 30px ;
`