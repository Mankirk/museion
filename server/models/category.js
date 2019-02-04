const mongoose = require( "mongoose" );
const uid = require( "uid" );
// const subcategorySchema = require( "./subcategory" );

const { Schema } = mongoose;

// const subcategorySchema = new Schema( {
//     title: { type: String, required: true },
//     key: { type: String, required: true },
//     parentKey: { type: String, required: true },
//     image: { type: String, required: false },
//     sections: [ { type: String } ],
// } );

const categorySchema = new Schema( {
    title: { type: String, required: true },
    key: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: false },
    subcategories: {
        type: [
            {
                title: { type: String, required: true },
                key: { type: String, required: true },
                image: { type: String, required: false },
                sections: {
                    type: [
                        {
                            url: { type: String, required: false },
                            title: { type: String, required: true },
                        },
                    ],
                    required: false,
                },
            },
        ],
        required: false,
    },
} );

categorySchema.methods.setKey = function() {
    this.key = uid( 10 );
};

categorySchema.methods.hasSubcategory = function( subcategory ) {
    return this.subcategories.find( sub => sub.title === subcategory );
};

module.exports = mongoose.model( "Category", categorySchema );
