import * as React from 'react' ;
import styled from 'styled-components' ;

const Button = ({children, onClick}) => {
    return (
        <RootDiv
            onClick={onClick}
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

    &:hover {
        background : #EAE7E7 ;
    }

    display : flex;
    align-items : center ;
    justify-content : center;
`