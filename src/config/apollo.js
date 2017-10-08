import ApolloClient, {createNetworkInterface} from 'apollo-client';


const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
    opts: {
        credentials: 'same-origin'
    }
})

const client = new ApolloClient({
    networkInterface
});

export default client;