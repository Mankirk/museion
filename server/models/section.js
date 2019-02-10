const mongoose = require( "mongoose" );
const uid = require( "uid" );

const { Schema } = mongoose;

const sectionSchema = new Schema( {
    title: { type: String, required: true },
    key: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: false },
    parentKey: { type: String, required: true },
    parentTitle: { type: String, required: true },
    gParentKey: { type: String, required: true },
    gParentTitle: { type: String, required: true },
} );

sectionSchema.methods.setKey = function() {
    this.key = uid( 10 );
};

module.exports = mongoose.model( "Section", sectionSchema );
