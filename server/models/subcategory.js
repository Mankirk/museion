const mongoose = require( "mongoose" );
const uid = require( "uid" );

const { Schema } = mongoose;

const subcategorySchema = new Schema( {
    title: { type: String, required: true },
    key: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true },
    parentKey: { type: String, required: true },
    parentTitle: { type: String, required: true },
} );

subcategorySchema.methods.setKey = function() {
    this.key = uid( 10 );
};

module.exports = mongoose.model( "Subcategory", subcategorySchema );
