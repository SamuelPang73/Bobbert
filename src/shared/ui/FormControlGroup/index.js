import * as React from 'react' ;
import styled from 'styled-components';

const FormControlGroup = (props) => {
    return (
        <GroupDiv>
            {props.children}
        </GroupDiv>
    )
}

export default FormControlGroup ;

const GroupDiv = styled.div`
    flex-wrap : wrap ;
    display : flex ;
    gap : 20px ; 
    justify-content : space-between ;
    align-items : center ;

    width : 100%;

    &.row {
    }

    &.col {
        flex-direction : column ;
    }
`