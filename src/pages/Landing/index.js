import * as React from 'react' ;

import LogoImage from '../../assets/landing/logo.png' ;

import { useMediaQuery } from '@mui/material';

import FormControlGroup from '../../shared/ui/FormControl';
import Input from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';
import Card from '../../shared/ui/Card';

import {
    LogoDiv,
    TitleDiv,
    DescriptionDiv,
    LandingDiv,
    CoupleDiv,
    SearchDiv,
    CardListDiv,
    CardHeader,
    CardLabel,
    PriceDiv,
    NumberBadge
} from './StyledDiv/index.styles' ;

const Landing = () => {

    const match950 = useMediaQuery('(min-width : 950px)') ;
    const match475 = useMediaQuery('(min-width : 475px)') ;
    
    return (
        <LandingDiv>
            <LogoDiv>
                <img src={LogoImage} />
            </LogoDiv>
            <TitleDiv>
                Our Registry
            </TitleDiv>
            <DescriptionDiv>
                <p>
                    As we begin our adventure with a move to Belgium, it’s a challenge to bring anything with us. Purchasing a gift from this registry will allow us to get what we need locally. Henrietta will probably re-write this more eloquently. Thank you.
                </p>
                <CoupleDiv>
                    <div>- Hen &amp; Bill</div>
                </CoupleDiv>
            </DescriptionDiv>
            <SearchDiv>
                <FormControlGroup
                    className={'row'}
                >
                    <Input 
                        endAdornment={{
                            text: "Search"
                        }}
                        width={match950 ? (match475 ? '80%' : '100%') : '70%'}
                    />
                    <Button>
                        CART &nbsp;<NumberBadge>2</NumberBadge>
                    </Button>
                </FormControlGroup>
            </SearchDiv>

            <CardListDiv>
                {
                    [...Array(8)].map((item, index) => (
                        <Card 
                            key={index}
                            header={
                                <CardHeader>{`"Little Quip"`}</CardHeader>
                            }
                            content={
                                <>
                                    <CardLabel>Posts and Pans</CardLabel>
                                    <PriceDiv>$145</PriceDiv>
                                </>
                            }
                            footer={
                                <Button>Add</Button>
                            }
                        />
                    ))
                }
            </CardListDiv>
        </LandingDiv>
    )
}

export default Landing ;