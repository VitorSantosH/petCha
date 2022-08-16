import { legacy_createStore as createStore, combineReducers } from 'redux';


const reducers = combineReducers({

    storeFoco: function (state, action) {

        console.log(state, " ", action);

        switch (action.type) {
            case 'SET_STORE':
                return {
                    store: action.payload
                }
                break;
            default:
                return {
                    store: undefined
                }


        }


    },

})


function storeConfig() {

    return createStore(reducers)
}


export default storeConfig