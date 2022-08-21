import * as React from 'react' ;

import { useLocalStorage } from 'react-use' ;

import styled from 'styled-components';

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { UploadProductImage, UploadProduct } from '../../redux/actions/upload';
import { ProductsList } from '../../redux/actions/products';

import { v4 as uuidv4 } from 'uuid';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Loading from 'react-loading-components' ;

import {
    Button,
    FormControlGroup,
} from '../../shared/ui';

import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Divider,
    InputLabel,
    TextField,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    paper: {
        backgroundColor : 'white !important',
        border : props => props.method ? '1px solid black' : '5px solid green',
        borderRadius : '10px !important',
    }
})) ;

const AddProduct  = (props) => {

    const {
        open,
        handleClose,

        method,

        products_of_custom,
        setCustomProducts,

        UploadProductImage,
        UploadProduct,
        ProductsList,
        setPageId
    } = props ;

    const classes = useStyles({
        method : method
    }) ;

    const [name, setName] = React.useState('') ;
    const [description, setDescription] = React.useState('') ;
    const [price, setPrice] = React.useState(0) ;
    const [image, setImage] = React.useState({
        preview : '',
        raw : ""
    }) ;
    const [loading, setLoading] = React.useState(false) ;
    
    const handleChangeImage = (e) => {
        setImage({
            preview : URL.createObjectURL(e.target.files[0]) ,
            raw : e.target.files[0]
        }) ;
    }
    
    const initialState = () => {
        setName('') ;
        setPrice('');
        setDescription('') ;
        setImage({
            preview : "",
            raw : ""
        }) ;
    } 

    const Title = () => {
        return (
            <TitleDiv>
                <LabelDiv>
                    Add Product{`${method ? '' : ' ( Custom ) '}`}
                </LabelDiv>
                <CloseIconDiv
                    onClick={handleClose}
                >
                    <HighlightOffIcon />
                </CloseIconDiv>
            </TitleDiv>
        )
    }

    const Actions = () => {
        const handleAddProduct = async () => {
            setLoading(true) ;

            let image_id  = uuidv4() ;

            let url = await UploadProductImage(image_id, image.raw) ;

            await UploadProduct({
                name : name ,
                price : Number(price),
                description : description,
                image : url,
                ordered : false
            }) ;

            await ProductsList() ;

            setLoading(false) ;

            initialState() ;
            
            handleClose();
        }

        const handleAddCustom = async () => {
            setLoading(true) ;

            let image_id  = uuidv4() ;

            let url = await UploadProductImage(image_id, image.raw) ;

            let new_id = uuidv4() ;

            let temp = {...products_of_custom} ;

            temp[new_id] = {
                name : name,
                price : Number(price),
                description : description,
                image : url,
                ordered : true
            } ;

            setCustomProducts({...temp}) ;

            setLoading(false) ;

            initialState() ;
            
            handleClose();

            setPageId('order_list') ;
        }

        return (
            <>
                <Button
                    onClick={method ? handleAddProduct : handleAddCustom}
                    className={loading ? 'disabled' : ''}
                >
                    {loading && <><Loading type='oval' width={20} height={20} fill={'#707070'} />&nbsp;&nbsp;</>}
                    Add Product
                </Button>
            </>
        )
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                classes ={{
                    paper : classes.paper
                }}
                hideBackdrop={false}
            >
                <DialogTitle>
                    {<Title/>}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <ContentDiv>
                        <FormControlGroup >
                            <InputLabel >Product Name</InputLabel>
                            <TextField
                                size='small'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControlGroup>
                        <FormControlGroup >
                            <InputLabel >Product Price</InputLabel>
                            <TextField
                                type='number'
                                size='small'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </FormControlGroup>
                        <FormControlGroup >
                            <InputLabel >Description</InputLabel>
                            <TextField
                                size='small'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                multiline
                                rows={5}
                            />
                        </FormControlGroup>
                        <FormControlGroup
                            className={'col'}
                        >
                            <InputLabel htmlFor="upload-product-image" sx={{width : '100%'}} >
                            {
                                image.preview ? (
                                    <SelectImageDiv>
                                        <img src={image.preview} width ={'100%'} height={'100%'}  alt='no product'/>
                                    </SelectImageDiv>
                                ) : (
                                    <>
                                        {/* <CloudUploadOutlinedIcon sx={{width:'73px',height:'45px'}}/> */}
                                        <SelectImageDiv>
                                            Product Image
                                        </SelectImageDiv>
                                    </> 
                                )
                            }
                            </InputLabel>
                            <input
                                type="file"
                                id="upload-product-image"
                                name="product-image"
                                accept={'image/*'}
                                style={{ display: "none" }}
                                onChange={handleChangeImage}
                            />
                        </FormControlGroup>
                    </ContentDiv>
                </DialogContent>
                <Divider />
                <DialogActions>
                    {<Actions/>}
                </DialogActions>
            </Dialog>
        </>
    )
}
AddProduct.propTypes = {
    UploadProductImage : PropTypes.func.isRequired,
    UploadProduct : PropTypes.func.isRequired,
    ProductsList : PropTypes.func.isRequired
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    UploadProductImage,
    UploadProduct,
    ProductsList
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct) ;

const TitleDiv = styled.div`
    display : flex;
    justify-content : space-between ;
    align-items : center ;
`

const LabelDiv = styled.div`
    font-weight : bold ;
`
const CloseIconDiv = styled.div`
    & svg {
        cursor : pointer ;
    }
`
const ContentDiv = styled.div`
    display : flex ;
    flex-direction : column ;
    gap : 15px;
`

const SelectImageDiv = styled.div`
    width : 100% ;
    height : 300px;

    border : 3px solid #707070 ;

    border-radius : 20px ;

    display : flex ;
    align-items : center ;
    justify-content : center ;

    cursor : pointer ;

    font-size : 25px;
    font-weight : 700 ;

    & img {
        border-radius : 20px;
    }
`