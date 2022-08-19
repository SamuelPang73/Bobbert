import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage' ;
import { storage, db } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

export const UploadProductImage = (image_id, raw) => async dispatch => {
    try {
        if(!raw) return ;

        const storageRef = ref(storage, 'product_images/'+ image_id );
        const uploadTask = await uploadBytesResumable(storageRef, raw);

        const downloadUrl = await getDownloadURL(uploadTask.ref) ;

        return downloadUrl ;
    } catch(err) {
        console.log(err) ;

        return false ;
    }
}

export const UploadProduct = (product_info) => async dispatch => {
    try {
        let new_product = await addDoc(collection(db, "Products"), {
            ...product_info
        }) ;

        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}