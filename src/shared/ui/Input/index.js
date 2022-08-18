import * as React from 'react' ;
import styled from 'styled-components' ;

const Input = (props) => {

    const {
        onChange,
        value,
        startIcon,
        endAdornment,
        placeholder,
        type,
        width
    } = props ;

    const [default_value, setDefaultValue] = React.useState('') ;

    React.useEffect(() => {
    }, [value]) ; 

    return (
        <InputDiv
            style={{width : width}}
            value={value || default_value}
            onChange={onChange || setDefaultValue}
        >
            {
                startIcon && <StartIconDiv>
                    <img src={startIcon} />
                </StartIconDiv>
            }
            {
                endAdornment && <EndAdornmentDiv>
                    {
                        endAdornment.icon && <img src={endAdornment.icon} onClick={endAdornment.onClick}/>
                    }
                    {
                        endAdornment.text
                    }
                </EndAdornmentDiv>
            }
            <BoxDiv
                className={"endAdornment"}
                placeholder={placeholder}
                type={type}
                width={width}
            />
        </InputDiv>
    )
}

export default Input ;

const BoxDiv = styled.input`
    border: 2px solid white ;
    border-radius : 30px;

    width : 100%;
    height : 40px;

    display : flex ;
    justify-content : center ;
    align-items : center;

    outline : none;

    background : transparent ;

    cursor : pointer;

    color : white ;
    font-size : 18px; 

    svg {
        color : white !important;
    }

    &.startIcon {
        padding-left : 60px !important;
    }

    &.endAdornment {
        padding-right : 50px !important;
        padding-left : 20px !important;
    }

    ::placeholder { 
        color: white;
        opacity: 1;
    }
`
export const InputDiv = styled.div`
    position : relative ;
`
export const StartIconDiv = styled.div`
    position : absolute;
    left : 0px;
    top : 0px;
    height:  100%;

    z-index : 200;

    display : flex ;
    align-items : center ;
    justify-content : center;

    padding-left : 20px;

    & img {
        height : 24px;
        width : 24px;
    }
`

export const EndAdornmentDiv = styled.div`
    position : absolute;
    right : 0px;
    top : 0px;
    height:  100%;

    z-index : 200;

    display : flex ;
    align-items : center ;
    justify-content : center;

    padding-right : 20px;

    & img {
        height : 24px;
        width : 24px;

        cursor : pointer ;
    } 

    border-left : 1px solid white ;
    padding-left : 10px ;

    color : white ;

    text-transform : uppercase ;
    font-weight : 700;
`


export const EndTextDiv = styled.div`
    position : absolute;
    right : 0px;
    top : 0px;
    height:  100%;

    z-index : 200;

    display : flex ;
    align-items : center ;
    justify-content : center;

    padding-right : 20px;

    & img {
        height : 24px;
        width : 24px;

        cursor : pointer ;
    }
`

export const StartTextDiv = styled.div`
    position : absolute;
    right : 0px;
    top : 0px;
    height:  100%;

    z-index : 200;

    display : flex ;
    align-items : center ;
    justify-content : center;

    padding-right : 20px;

    & img {
        height : 24px;
        width : 24px;

        cursor : pointer ;
    }
`