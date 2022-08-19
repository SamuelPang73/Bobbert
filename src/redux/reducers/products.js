import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    productsList : [],
    ordersList : []
}

export default function products(state=INITIAL_STATE, action={}) {
    switch(action.type) {
        case ActionTypes.ProductsList :
            return ({
                ...state,
                productsList : action.payload
            });
        case ActionTypes.OrdersList:
            return ({
                ...state,
                ordersList : action.payload
            }) ;
        default : 
            return state ;
    }
}