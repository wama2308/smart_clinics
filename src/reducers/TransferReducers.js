import { Map } from 'immutable'
const setData = (state, node, payload) => state.set(node, payload)

const TransferReducer = (state = Map(), action) => {
    switch (action.type) {

        case 'LOAD_TRANSFERS_ALL': {
            return Map(action.payload)
        }



        default:
            return state;
    }
};

export default TransferReducer;