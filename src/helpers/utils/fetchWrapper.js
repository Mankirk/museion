import isomorphicFetch from "isomorphic-fetch";

// const SUCCESS = 200;
// const REDIRECT = 300;
const SERVER_ERROR = 500;

function parseResponse( status, res ) {
    if ( status >= SERVER_ERROR ) {
        return Promise.reject( { status } );
    }

    return new Promise( resolve => {
        res.then( response => resolve( response.payload ) );
    } );
}

function fetchWrapper( url, method, headers, body ) {
    const fetchBody = {
        method,
        headers: Object.assign(
            {},
            {
                Accept: "application/json",
                // "Content-Type": "application/json",
            },
            headers
        ),
    };

    if ( body ) {
        fetchBody.body = JSON.stringify( body );
    }

    return isomorphicFetch( url, fetchBody ).then( response =>
        parseResponse( response.status, response.json() ) );
}

export default fetchWrapper;
