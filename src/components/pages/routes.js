import HomePage from "./homePage.react";
import ProductListPage from "./productListPage.react";
import NotFoundPage from "./notFoundPage.react";
import ProductDetailsPage from "./productDetailsPage.react";

const exact = true;

const baseRoutes = [
    route( "/", HomePage, exact ),
    route( "/productList", ProductListPage ),
    route( "/404", NotFoundPage ),
    route( "/product", ProductDetailsPage ),
];

function route( path, component, exactCondition ) {
    const routeData = { path, component };

    if ( exactCondition ) {
        routeData.exact = true;
    }

    return routeData;
}

export { baseRoutes };
