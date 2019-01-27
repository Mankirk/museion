import fetchWrapper from "./fetchWrapper";

export default {
    scrollToElement( parent, element ) {
        parent.scrollTo( {
            behavior: "smooth",
            left: 0,
            top: element.getBoundingClientRect().top + ( parent.scrollY || parent.pageYOffset ),
        } );
    },
    fetchWrapper,
};
