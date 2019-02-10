const express = require( "express" );

const controllers = require( "../controllers" );
const repos = require( "../repositories" );
const middlewares = require( "../middlewares" );
const sitemap = require( "./sitemapTemplate" ).sitemap;

const router = express.Router();

router.get( "/", ( req, res ) => {
    res.json( { success: true, baseRoute: "This is Base Route!" } );
} );

router.get( "/test", ( req, res ) => {
    res.send( { succcess: true, mess: "test is working" } );
} );

router.get( "/getProducts", repos.product.getProducts, controllers.product.getProducts );
router.post(
    "/createProduct",

    repos.product.createProduct
);
router.post( "/editProduct", repos.product.editProduct );
router.delete( "/deleteProduct", repos.product.deleteProduct );

// category

router.post(
    "/createCategory",
    repos.category.getCategory,
    repos.category.createCategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.post(
    "/editCategory",
    repos.category.editCategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.delete(
    "/deleteCategory",
    repos.section.deleteByCategory,
    repos.subcategory.deleteByCategory,
    repos.category.deleteCategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);

// subcategory

router.post(
    "/createSubcategory",
    repos.subcategory.getSubcategory,
    repos.subcategory.createSubcategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.post(
    "/editSubcategory",
    repos.subcategory.editSubcategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.delete(
    "/deleteSubcategory",
    repos.section.deleteBySubcategory,
    repos.subcategory.deleteSubcategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);

// section

router.post(
    "/createSection",
    repos.section.getSection,
    repos.section.createSection,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.post(
    "/editSection",
    repos.section.editSection,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.delete(
    "/deleteSection",
    repos.section.deleteSection,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);

router.get( "/getSitemap", repos.sitemap.getSitemap );

// router.get( "/getSitemap2", repos.category.getCategories, ( req, res ) => {
//     res.success( { sitemap: req.category } );
// } );

module.exports = app => {
    app.use( "/", router );
};
