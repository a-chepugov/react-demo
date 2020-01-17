module.exports = (ssrCell, assetsCell) => (url, context) => {
    return ssrCell.get()
			.renderToNodeStream(url, context, assetsCell.get().web)
}