import styled from 'styled-components' ;
import BackgroundImage from '../../../assets/landing/background.png' ;

export const LandingDiv = styled.div`
    padding-left : 20%;
    padding-right : 20%;

    @media screen and (max-width: 1420px) {
        padding-left : 10%;
        padding-right : 10%;
    }

    @media screen and (max-width: 1060px) {
        padding-left : 5%;
        padding-right : 5%;
    }

    display : flex ;
    flex-direction : column ;
    align-items : center ;

    padding-top : 30px ;

    background-image : url(${BackgroundImage}) ;
    background-attachment: fixed;
    background-size : cover ;
    
    width : 100vw ;
    height : 100vh ;

    overflow-y : scroll ;
`
export const LogoDiv = styled.div`
    display : flex ;
    justify-content : center ;
    align-items: center ;
`

export const TitleDiv = styled.div`
    font-family : Montserrat ;
    font-size : 60px;
    font-weight : 700;

    display : flex ;
    justify-content : center ;

    color : white ;

    @media screen and (max-width: 425px) {
        font-size : 40px;
    }
`

export const DescriptionDiv = styled.div`
    display : flex ;
    flex-direction : column ;

    border-radius: 20px ;
    color : white ;
    font-family : Montserrat ;
    font-size : 20px;
    background : #000000c4 ;

    padding : 30px;

    @media screen and (max-width: 425px) {
        font-size : 18px;
    }
`

export const CoupleDiv = styled.div`
    display :flex;
    justify-content : flex-end ;

    font-weight : bold ;
    color :white ;

    font-size : 22px;
`

export const SearchDiv = styled.div`
    padding-top : 30px ;
    width : 100%;
`
export const NumberBadge = styled.span`
    border : 2px solid green ;

    display : flex ;
    justify-content : center ;
    align-items : center ;

    padding : 5px; 
    font-size : 15px ;
    font-weight : bold ;
    border-radius : 50%;

    width : 25px;
    height: 25px;
`

export const CardListDiv = styled.div`
    margin-top : 30px;

    display : flex ;
    justify-content : space-between ;

    flex-wrap : wrap ;
    gap : 20px;

    text-align : center ;
`

export const CardHeader = styled.div`
    color : #A5A5A5 ;
`
export const CardLabel = styled.div`
    color : #707070 ;
    font-size : 23px;
`
export const PriceDiv = styled.div`
    font-size : 30px;
    font-weight : bold ;
    color : #707070 ;
`