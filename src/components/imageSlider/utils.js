function createRange( range ) {
    const arr = [];

    for ( let index = 0; index <= range; index++ ) {
        arr.push( index );
    }

    return arr;
}

export default {
    createRange,
};
