const getProducts = ( req, res ) => {
    const { products } = req;

    return res.json( { products } );
};

const create = ( req, res ) => {
    const { products } = req;

    return res.json( { products } );
};

const editProduct = ( req, res ) => {
    const { products } = req;
    return res.json( { products } );
};

const deleteProducts = ( req, res ) => res.json( { success: true } );

module.exports = {
    getProducts,
    create,
    editProduct,
    deleteProducts,
};
