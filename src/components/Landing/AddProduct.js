import * as React from 'react' ;

import { useLocalStorage } from 'react-use' ;

import styled from 'styled-components';

import { v4 as uuidv4 } from 'uuid' ;
import { create as ipfsHttpClient } from 'ipfs-http-client' ;

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Loading from 'react-loading-components' ;

import {
    Button,
    FormControlGroup,
} from '../../shared/ui';

import { ipfs_origin, ipfs_auth } from '../../constants';

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
        border : '1px solid ',
        borderRadius : '10px !important',
    }
})) ;

// const client = ipfsHttpClient({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//         authorization : ipfs_auth,
//     },
// });

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0') ;

const AddProduct  = (props) => {
    const classes = useStyles() ;

    const {
        open,
        handleClose
    } = props ;

    const [products, setProducts] = useLocalStorage('products', {}) ;

    const [name, setName] = React.useState('') ;
    const [description, setDescription] = React.useState('') ;
    const [price, setPrice] = React.useState(0) ;
    const [image, setImage] = React.useState({
        preview : '',
        raw : ""
    })

    const [loading, setLoading] = React.useState(false) ;
    
    const handleChangeImage = (e) => {
        setImage({
            preview : URL.createObjectURL(e.target.files[0]) ,
            raw : e.target.files[0]
        }) ;
    }
    
    const Title = () => {
        return (
            <TitleDiv>
                <LabelDiv>
                    Add Product
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

            let temp = {...products} ;

                temp[uuidv4()] = {
                    name : name ,
                    price : price,
                    description : description,
                    image : '',
                    ordered : false
                }

                setProducts(temp) ;

                setLoading(false) ;

                handleClose() ;

                window.location.reload() ;
                setLoading(false) ;

            try {
                const added = await client.add(
                    image.raw,
                    {
                        progress: (prog) => console.log(`received: ${prog}`)
                    }
                )
                const url = `${ipfs_origin}${added.path}`
                    
                let temp = {...products} ;

                temp[uuidv4()] = {
                    name : name ,
                    price : price,
                    description : description,
                    image : url,
                    ordered : false
                }

                setProducts(temp) ;

                setLoading(false) ;

                handleClose() ;

                window.location.reload() ;
            } catch (error) {
                setLoading(false) ;
                
                console.log('Error uploading file: ', error) ;
            }
        }

        return (
            <>
                <Button
                    onClick={handleAddProduct}
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
                hideBackdrop={true}
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
                                        <img src={image.preview} width ={'100%'} height={'100%'}  />
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

export default AddProduct ;

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