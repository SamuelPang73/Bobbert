import { db } from '../../firebase/config';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import ActionTypes from './actionTypes';

export const ProductsList = () => async dispatch => {
    try {
        let productDocs = await getDocs(collection(db, 'Products')) ;

        let productList = [] ;

        for(let doc of productDocs.docs) {
            productList.push({
                id : doc.id,
                ...doc.data()
            }) ;
        }

        await dispatch({
            type : ActionTypes.ProductsList,
            payload : productList
        }) ;

    } catch(err) {
        console.log(err) ;
        await dispatch({
            type : ActionTypes.ProductsList,
            payload : []
        }) ;
    }
}

export const OrdersList = () => async dispatch => {
    try {
        let orderDocs = await getDocs(query(collection(db, 'Products'), where('ordered', "==", true))) ;

        let ordersList = [] ;

        for(let doc of orderDocs.docs) {
            ordersList.push({
                id : doc.id,
                ...doc.data()
            }) ;
        }

        await dispatch({
            type : ActionTypes.OrdersList,
            payload : ordersList
        }) ;

    } catch(err) {
        console.log(err) ;
        await dispatch({
            type : ActionTypes.ProductsList,
            payload : []
        }) ;
    }
}

export const AddOrder = (id) => async dispatch => {
    try {
        await updateDoc(doc(db, "Products", id), {
            ordered : true 
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const DeleteOrder = (id) => async dispatch => {
    try {
        await updateDoc(doc(db, "Products", id), {
            ordered : false 
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

