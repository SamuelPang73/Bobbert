import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage' ;
import { storage } from '../../firebase/config';

export const UploadProductImage = (image_id, raw) => async dispatch => {
    try {
        if(!raw) return ;

        const storageRef = ref(storage, 'product_images/'+ image_id );
        const uploadTask = await uploadBytesResumable(storageRef, raw);

        console.log(uploadTask) ;

        const downloadUrl = await getDownloadURL(uploadTask.ref) ;

        return downloadUrl ;
    } catch(err) {
        console.log(err) ;

        return false ;
    }
}