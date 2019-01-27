import fetchWrapper from "../../helpers/utils/fetchWrapper";

const baseUrl = "http://localhost:3030";

const apiService = store => next => action => {
    console.log( store );
    const result = next( action );

    if ( !action.async ) {
        return result;
    }

    const { path, method = "GET", body, headers } = action.payload;

    if ( !path ) {
        throw new Error( `'path' not specified for async action ${ action.type }` );
    }

    const url = `${ baseUrl }${ path }`;

    return fetchWrapper( url, method, headers, body ).then(
        res => handleResponse( res, action, next ),
        err => handleErrors( err, action, next )
    );
};

export default apiService;

function handleErrors( err, action, next ) {
    next( {
        type: `${ action.type }_FAILED`,
        async: true,
        generalFetching: action.generalFetching,
        pageFetching: action.pageFetching,
        payload: err,
    } );

    return Promise.reject( err );
}

function handleResponse( res, action, next ) {
    next( {
        type: `${ action.type }_COMPLETED`,
        async: true,
        generalFetching: action.generalFetching,
        pageFetching: action.pageFetching,
        payload: res,
    } );

    return res;
}
