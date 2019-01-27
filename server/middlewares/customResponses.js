const customResponses = {
    success( payload ) {
        return this.status( 200 ).json( {
            success: true,
            payload,
        } );
    },

    unauthorized() {
        return this.status( 401 ).json( {
            success: false,
            error: "unauthorized",
        } );
    },

    preconditionFailed( customError ) {
        return this.status( 412 ).json( {
            success: false,
            error: customError || "precondition_failed",
        } );
    },

    notFound() {
        return this.status( 404 ).json( {
            success: false,
            error: "not_found",
        } );
    },

    serverError() {
        return this.status( 503 ).json( {
            success: false,
            error: "server_error",
        } );
    },
};

module.exports = ( req, res, next ) => {
    Object.assign( res, customResponses );
    next();
};
