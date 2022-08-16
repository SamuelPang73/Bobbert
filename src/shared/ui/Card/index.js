import * as React from 'react' ;
import styled from 'styled-components';

const Card  = (props) => {
    const {
        header,
        content,
        footer
    } = props ;
    
    return (
        <CardDiv>
            <CardImage>

            </CardImage>
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
    background : #835959 ;
    height : 50%;
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