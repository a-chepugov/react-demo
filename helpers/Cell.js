module.exports = class Cell {
    constructor() {
        if ( arguments.length ) {
            this.set.apply( this, arguments );
        };
    }

    set ( value ) {
        this.value = value;
    }

    get () {
        return this.value;
    }
};