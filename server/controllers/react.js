module.exports = ( ssrCell, assetsCell ) => {
    return ( {
        renderToString ( url, context ) {
            return ssrCell.get()
                .renderToString( url, context, assetsCell.get().web )
        },
        renderToNodeStream ( url, context ) {
            return ssrCell.get()
                .renderToNodeStream( url, context, assetsCell.get().web )
        },
    } )
}