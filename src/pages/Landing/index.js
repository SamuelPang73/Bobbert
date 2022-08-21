import * as React from 'react' ;

import { useSearchParams } from 'react-router-dom' ;

import { useLocalStorage } from 'react-use';

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { ProductsList , AddOrder, OrdersList, DeleteOrder} from '../../redux/actions/products';

import LogoImage from '../../assets/landing/logo.png' ;
import PaymentConfirm from '../../components/Landing/Confirm';

import { useMediaQuery } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';

import AddProduct from '../../components/Landing/AddProduct.js' ;

import FormControlGroup from '../../shared/ui/FormControlGroup';
import Input from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';
import Card from '../../shared/ui/Card';

import Orders from '../../components/Landing/Orders';

import swal from 'sweetalert';

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
    NumberBadge,
    ButtonGroupDiv,
    CloseIconDiv
} from './StyledDiv/index.styles' ;
import PaymentModal from '../../components/Landing/PaymentModal';


const Landing = (props) => {

    const {
        productsList,
        ordersList,

        ProductsList,
        OrdersList,

        AddOrder,
        DeleteOrder
    } = props ;

    const match950 = useMediaQuery('(min-width : 950px)') ;
    const match475 = useMediaQuery('(min-width : 475px)') ;

    const [openConfirm, setOpenConfirm] = React.useState(false) ;
    const [open, setOpen] = React.useState(false) ;
    const [openPayment, setOpenPayment] = React.useState(false) ;

    const [totalAmount, setTotalAmount] = React.useState(0) ;
    const [totalProduct, setTotalProduct] = React.useState([]) ;

    const [method, setMethod] = React.useState(true) ;

    const [products_of_custom, setCustomProducts] = useLocalStorage('products', {raw: false}) ;

    const [pageId, setPageId] = React.useState('product_list') ;

    const [searchStr, setSearchStr] = React.useState('') ;

    const [urlParams, setUrlParams] = useSearchParams() ;

    const handleClose = () => {
        setOpen(false) ;
    }
    
    const handleAddProduct = () => {
        setOpen(true) ;
    }

    const handleAddCustom = () => {
        setMethod(false) ;
        setOpen(true) ;
    }

    const handleAddOrder = async (id, method=null) => {
        if(method) {
            await AddOrder(id) ;
        
            ProductsList() ;
            OrdersList() ;
        } else {
           let temp = {...products_of_custom} ;

           temp[id] = {
                ...temp[id],
                ordered : true
           }

           setCustomProducts(temp) ;
           
           window.location.reload() ;
        }
    }

    const handleDeleteOrder = async (id) => {
        if(await swal({
            title : 'Confirm',
            text : 'Are you sure that you want to delete this custom product?',
            buttons: [
                'No, I am not sure!',
                'Yes, I am sure!'
            ],
            icon : 'info'
        })) { 
            let temp = {...products_of_custom} ;

            delete temp[id] ;

            setCustomProducts(temp) ;
        }
    }

    const handleBuyAll = async () => {
        let totalAmount = 0 ;
        let totalProduct = "" ;

        for(let order of ordersList) {
            totalAmount += order.price ;
            totalProduct += order.name + " , ";
            await DeleteOrder(order.id) ;
        }

        let temp = {...products_of_custom} ;

        for(let [id, order] of Object.entries(products_of_custom).filter(([id, order]) => 
            order.ordered === true
        )) {
            totalAmount += order.price ;
            totalProduct += order.name + " , " ;

            temp[id] = {
                ...temp[id],
                ordered : false
            }
        }

        setCustomProducts({...temp}) ;
        
        setTotalAmount(totalAmount) ;
        setTotalProduct(totalProduct) ;

        setOpenPayment(true) ;
    }

    React.useEffect(() => {
        ProductsList() ;
        OrdersList() ;
    }, []) ;

    React.useEffect(() => {
        if(urlParams) {
            if(urlParams.get('redirect_status') === 'succeeded') {
                console.log(urlParams.get('redirect_status')) ;
                setOpenConfirm(true) ;
            }
        }
    }, [urlParams]) ;

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
                            CART &nbsp;<NumberBadge>
                                {ordersList?.length + Object.entries(products_of_custom).filter(([id, product]) =>
                                    product.ordered === true
                                ).length}
                            </NumberBadge>
                        </Button>
                    </div>    
                    <ButtonGroupDiv>
                        {
                            pageId === 'product_list' && <>
                                <Button
                                    onClick={handleAddProduct}
                                >
                                    Add Product
                                </Button>
                                <Button
                                    onClick={handleAddCustom}
                                >
                                    Add Custom
                                </Button>
                            </>
                        }
                        {
                            pageId === 'order_list' && <>
                                <Button
                                    onClick={handleBuyAll}
                                >
                                    Buy All
                                </Button>
                                <Button
                                    onClick={() => setPageId('product_list')}
                                >
                                    Go to Home
                                </Button>
                            </>
                        }
                    </ButtonGroupDiv>
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
                                        onClick={() => handleAddOrder(product.id, true)}
                                    >Add</Button>
                                }
                            />
                        ))
                    }
                    {
                        Object.entries(products_of_custom).filter(([id, product]) => 
                            product.name?.toLowerCase().search(searchStr?.toLowerCase()) >= 0 ||
                            product.description?.toLowerCase().search(searchStr?.toLowerCase()) >= 0 
                        ).map(([id, product]) => (
                            <Card 
                                key={id}
                                imageUrl={product.image}
                                header={
                                    <CardHeader>{product.name}{` ( Custom )`}</CardHeader>
                                }
                                content={
                                    <>
                                        <CardLabel>{product.description}</CardLabel>
                                        <PriceDiv>${product.price}</PriceDiv>
                                        <CloseIconDiv
                                            onClick={() => handleDeleteOrder(id)}
                                        >
                                            <CancelIcon />
                                        </CloseIconDiv>
                                    </>
                                }
                                footer={   product.ordered ? <Button
                                        className={"disabled"}
                                    >Added</Button> : <Button
                                        onClick={() => handleAddOrder(id)}
                                    >Add</Button>
                                }
                            >
                            </Card>
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
                method={method}
                setPageId={setPageId}
                products_of_custom={products_of_custom}
                setCustomProducts={setCustomProducts}
            />

            <PaymentConfirm 
                open={openConfirm}
                handleClose={() => setOpenConfirm(false)}
            />
            
            <PaymentModal 
                open={openPayment}
                handleClose={() => setOpenPayment(false)}
                totalAmount={totalAmount}
                totalProduct={totalProduct}
            />
        </LandingDiv>
    )
}
Landing.propTypes = {
    ProductsList : PropTypes.func.isRequired,
    AddOrder : PropTypes.func.isRequired,
    OrdersList : PropTypes.func.isRequired,
    DeleteOrder : PropTypes.func.isRequired
}
const mapDispatchToProps = {
    ProductsList,
    AddOrder,
    OrdersList,
    DeleteOrder
}
const mapStateToProps = state => ({
    productsList : state.products.productsList,
    ordersList : state.products.ordersList
})
export default connect(mapStateToProps, mapDispatchToProps)(Landing) ;