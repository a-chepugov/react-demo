module.exports = {
	plugins: {
		'postcss-preset-env': {
			stage: 3,
			features: {
				'media-query-ranges': true
			},
			browsers: ['last 4 versions', 'Chrome >= 41', 'iOS >= 7', 'Safari >= 7']
		},
		cssnano: {
			preset: [
				'default',
				{
					colormin: true,
					discardComments: {removeAll: true},
					discardDuplicates: true,
					discardEmpty: true,
					mergeLonghand: true,
					rawCache: true
				}]
		}
	}
};
