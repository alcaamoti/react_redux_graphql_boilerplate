import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import client from './apollo';
import reducers from '../reducers';
import reduxThunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

const Store = createStore(
    combineReducers({
        reducers,
        apollo: client.reducer(),
        form: formReducer
    }),
    {},
    compose(
        applyMiddleware(reduxThunk),
        applyMiddleware(client.middleware())
    )

);

export default Store;

