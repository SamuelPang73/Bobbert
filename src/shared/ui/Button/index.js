import * as React from 'react' ;
import styled from 'styled-components' ;

const Button = ({children, onClick, className}) => {
    return (
        <RootDiv
            onClick={onClick}
            className={className}
        >
            {children}
        </RootDiv>
    )
}

export default Button ;

const RootDiv = styled.div`
    border:  none ;
    transition : all 0.8s ease ;

    background : white ;
    border-radius : 30px;

    height : 40px;
    color : #707070 ;
    font-weight : 1000;
    letter-spacing : 2px ;
    cursor : pointer ;

    min-width : 150px ;
    border: 1px solid #707070;

    padding-left : 15px ;
    padding-right : 15px ;

    display : flex;
    align-items : center ;
    justify-content : center;

    &:hover {
        background : #EAE7E7 ;
    }

    &.disabled {
        background : #EAE7E7 !important;
        color : #7070704d ;
        border : 1px solid #7070704d;
    }
`