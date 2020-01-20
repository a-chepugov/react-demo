module.exports = function ( { } = {}, { target, mode, watch, progress } = {}) {
	console.info( `webpack > target: ${target} | mode: ${mode} | watch: ${watch} | progress: ${progress}` );
	
	return require( `./webpack/${target}` ).apply( this, arguments );
};
