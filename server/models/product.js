const mongoose = require( "mongoose" );
const uid = require( "uid" );

const { Schema } = mongoose;

const schemaByLanguage = new Schema( {
    name: { type: String, required: true },
    subtitle: { type: String },
    type: { type: String },
    description: { type: String, required: true },
} );

const productSchema = new Schema( {
    ro: { type: schemaByLanguage, required: true },
    en: { type: schemaByLanguage, required: true },
    key: { type: String, required: true },
    sku: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: false },
    section: { type: String, required: false },
    slug: { type: String, required: false },
    images: [
        {
            type: String,
        },
    ],
    mainImage: { type: String },
} );

productSchema.methods.setId = function() {
    this.id = uid( 10 );
};

productSchema.methods.setSlug = function() {
    this.slug = `/product/${ this.category }/${ this.subcategory }/${ this.sku }`;
};

module.exports = mongoose.model( "Product", productSchema );
