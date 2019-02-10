const mongoose = require( "mongoose" );
const uid = require( "uid" );

const { Schema } = mongoose;

const categorySchema = new Schema( {
    title: { type: String, required: true },
    key: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: false },
} );

categorySchema.methods.setKey = function() {
    this.key = uid( 10 );
};

categorySchema.methods.hasSubcategory = function( subcategory ) {
    return this.subcategories.find( sub => sub.title === subcategory );
};

module.exports = mongoose.model( "Category", categorySchema );

// subcategories: {
//     type: [
//         {
//             title: { type: String, required: true },
//             key: { type: String, required: true },
//             image: { type: String, required: false },
//             url: { type: String, required: true },
//             sections: {
//                 type: [
//                     {
//                         url: { type: String, required: false },
//                         title: { type: String, required: true },
//                     },
//                 ],
//                 required: false,
//             },
//         },
//     ],
//     required: false,
// },
