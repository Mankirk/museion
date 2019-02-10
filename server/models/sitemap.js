const mongoose = require( "mongoose" );
const uid = require( "uid" );

const { Schema } = mongoose;

const sitemapSchema = new Schema( {
    categories: [
        {
            title: { type: String, required: true },
            key: { type: String, required: true },
            url: { type: String, required: true },
            image: { type: String, required: false },
            subcategories: [
                {
                    title: { type: String, required: true },
                    key: { type: String, required: true },
                    url: { type: String, required: true },
                    image: { type: String, required: false },
                    sections: [
                        {
                            title: { type: String, required: true },
                            key: { type: String, required: true },
                            url: { type: String, required: true },
                            image: { type: String, required: false },
                            parentKey: { type: String, required: true },
                            parentTitle: { type: String, required: true },
                            gParentKey: { type: String, required: true },
                            gParentTitle: { type: String, required: true },
                        },
                    ],
                },
            ],
        },
    ],
} );

module.exports = mongoose.model( "Sitemap", sitemapSchema );
