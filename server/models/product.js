const mongoose = require( "mongoose" );
const uid = require( "uid" );

const { Schema } = mongoose;

const productSchema = new Schema( {
    id: { type: String, required: true },
    name: { type: String, required: true },
    subTitle: { type: String, required: true },
    type: { type: String, required: true },
    sku: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    slug: { type: String },
    images: {
        main: {
            url: { type: String },
        },
        additional: [ { url: { type: String } } ],
    },
} );

productSchema.methods.setId = function() {
    this.id = uid( 10 );
};

productSchema.methods.setSlug = function( slug ) {
    this.slug = `/products/${ slug }`;
};

module.exports = mongoose.model( "Product", productSchema );
