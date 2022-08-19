import * as React from 'react' ;

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { ProductsList , AddOrder, OrdersList} from '../../redux/actions/products';

import LogoImage from '../../assets/landing/logo.png' ;

import { useMediaQuery } from '@mui/material';

import AddProduct from '../../components/Landing/AddProduct.js' ;

import FormControlGroup from '../../shared/ui/FormControlGroup';
import Input from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';
import Card from '../../shared/ui/Card';

import Orders from '../../components/Landing/Orders';

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

const Landing = (props) => {

    const {
        productsList,
        ordersList,

        ProductsList,
        OrdersList,

        AddOrder
    } = props ;

    const match950 = useMediaQuery('(min-width : 950px)') ;
    const match475 = useMediaQuery('(min-width : 475px)') ;
    const [open, setOpen] = React.useState(false) ;

    const [pageId, setPageId] = React.useState('product_list') ;

    const [searchStr, setSearchStr] = React.useState('') ;

    const handleClose = () => {
        setOpen(false) ;
    }
    
    const handleAddProduct = () => {
        setOpen(true) ;
    }

    const handleAddOrder = async (id) => {
        await AddOrder(id) ;
        
        ProductsList() ;
        OrdersList() ;
    }

    React.useEffect(() => {
        ProductsList() ;
        OrdersList() ;
    }, []) ;

    return (
        <LandingDiv>
            <LogoDiv>
                <img src={LogoImage} alt='no logo'/>
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
                        value={searchStr}
                        onChange={(e) => setSearchStr(e.target.value)}
                    />
                    <div>
                        <Button
                            onClick={() => setPageId('order_list')}
                        >
                            CART &nbsp;<NumberBadge>{ordersList?.length}</NumberBadge>
                        </Button>
                        <br />
                        {
                            pageId === 'product_list' && <Button
                                onClick={handleAddProduct}
                            >
                                Add Product
                            </Button>
                        }
                        {
                            pageId === 'order_list' && <Button
                                onClick={() => setPageId('product_list')}
                            >
                                Go to Home
                            </Button>
                        }
                    </div>    
                </FormControlGroup>
            </SearchDiv>

            {
                pageId === 'product_list' && <CardListDiv
                    searchStr={searchStr}
                >
                    {
                        productsList.filter( product => 
                            product.name?.toLowerCase().search(searchStr?.toLowerCase()) >= 0 ||
                            product.description?.toLowerCase().search(searchStr?.toLowerCase()) >= 0 
                        ).map( product => (
                            <Card 
                                key={product.id}
                                imageUrl={product.image}
                                header={
                                    <CardHeader>{product.name}</CardHeader>
                                }
                                content={
                                    <>
                                        <CardLabel>{product.description}</CardLabel>
                                        <PriceDiv>${product.price}</PriceDiv>
                                    </>
                                }
                                footer={   product.ordered ? <Button
                                        className={"disabled"}
                                    >Added</Button> : <Button
                                        onClick={() => handleAddOrder(product.id)}
                                    >Add</Button>
                                }
                            />
                        ))
                    }
                </CardListDiv>
            }

            {
                pageId === 'order_list' && <Orders 
                    searchStr={searchStr}
                />
            }

            {/* ============= Modal ==================== */}
            <AddProduct 
                open={open}
                handleClose={handleClose}
            />
        </LandingDiv>
    )
}
Landing.propTypes = {
    ProductsList : PropTypes.func.isRequired,
    AddOrder : PropTypes.func.isRequired,
    OrdersList : PropTypes.func.isRequired
}
const mapDispatchToProps = {
    ProductsList,
    AddOrder,
    OrdersList
}
const mapStateToProps = state => ({
    productsList : state.products.productsList,
    ordersList : state.products.ordersList
})
export default connect(mapStateToProps, mapDispatchToProps)(Landing) ;