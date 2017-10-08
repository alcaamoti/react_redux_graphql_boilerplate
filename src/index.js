import './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter, BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ApolloProvider} from 'react-apollo';

import Store from './config/redux';//This is our custom redux store that holds our application state
import App from './components/app';//Our root component. From here, everything else is rendered
import client from './config/apollo';//This is a store provided by apollo to keep track of graphql data state


//React's Root renderer. From here, everything for the DOM is rendered.
ReactDOM.render(
    <ApolloProvider store = {Store} client = {client}>
        <HashRouter>
            <App />
        </HashRouter>
    </ApolloProvider>,
    document.querySelector('.container')
);

