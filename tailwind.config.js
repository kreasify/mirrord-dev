module.exports = {
	darkMode: 'class',
	content: [
		'./layouts/**/*.html',
		'./layouts/**/*.svg',
		'./content/**/*.md',
	],
	safelist: [
		'chroma',
		'err',
		'lntd',
		'lntable',
		'hl',
		'lnt',
		'ln',
		'k',
		'kc',
		'kd',
		'kn',
		'kp',
		'kr',
		'kt',
		'na',
		'nb',
		'nc',
		'no',
		'ne',
		'nf',
		'nn',
		'nt',
		'nv',
		'p',
		's',
		'sa',
		'sb',
		'sc',
		'dl',
		'sd',
		's2',
		'se',
		'sh',
		'si',
		'sx',
		'sr',
		's1',
		'ss',
		'm',
		'mb',
		'mf',
		'mh',
		'mi',
		'il',
		'mo',
		'ow',
		'c',
		'ch',
		'cm',
		'c1',
		'cs',
		'cp',
		'cpf',
		'gd',
		'ge',
		'gr',
		'gh',
		'gi',
		'go',
		'gp',
		'gs',
		'gu',
		'gt',
		'o',
		'gl',
		'w',
		'hl',
		'dark',
		'-translate-x-[11px]',
		'translate-y-[7px]'
	],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				tertiary: 'var(--tertiary)',
				'primary-text': 'var(--primary-text)',
				'body-color': 'var(--body-color)',
				'border-color': 'var(--border-color)',
			},
			fontFamily: {
				heading: ['var(--font-heading)'],
				body: ['var(--font-body)'],
				code: ['var(--font-code)'],
			},
			listStyleType: {
				circle: 'circle',
				square: 'square',
				'lower-latin': 'lower-latin',
				'lower-roman': 'lower-roman',
				'upper-latin': 'upper-latin',
				'upper-roman': 'upper-roman',
			},
			aspectRatio: {
				auto: 'auto',
				square: '1 / 1',
				video: '16 / 9',
				17: '17',
				18: '18',
				19: '19',
				20: '20',
				21: '21',
			},
		}
	},
	variants: {
		aspectRatio: ['before']
	},
	corePlugins: {
		aspectRatio: false,
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		function ({
			addBase,
			config
		}) {
			addBase({
				'h1': {
					fontSize: config('theme.fontSize.3xl'),
					fontWeight: config('theme.fontWeight.bold'),
					marginBottom: config('theme.spacing.4'),
					fontFamily: config('theme.fontFamily.heading')
				},
				'h2': {
					fontSize: config('theme.fontSize.2xl'),
					fontWeight: config('theme.fontWeight.bold'),
					marginBottom: config('theme.spacing.4'),
					fontFamily: config('theme.fontFamily.heading')
				},
				'h3': {
					fontSize: config('theme.fontSize.xl'),
					fontWeight: config('theme.fontWeight.bold'),
					marginBottom: config('theme.spacing.4'),
					fontFamily: config('theme.fontFamily.heading')
				},
				'h4': {
					fontSize: config('theme.fontSize.lg')
				},
				'a': {
					color: config('theme.colors.primary')
				},
				'p': {
					marginBottom: config('theme.spacing.6')
				},
				'ol': {
					listStyleType: config('theme.listStyleType.decimal'),
					paddingLeft: config('theme.spacing.6'),
					marginBottom: config('theme.spacing.4')
				},
				'ul': {
					listStyleType: config('theme.listStyleType.disc'),
					paddingLeft: config('theme.spacing.6'),
					marginBottom: config('theme.spacing.4')
				},
				'li': {
					marginBottom: config('theme.spacing.2')
				},
				'table': {
					tableLayout: 'auto',
					marginTop: config('theme.spacing.4'),
					marginBottom: config('theme.spacing.6')
				},
				'table th': {
					fontSize: config('theme.fontSize.xs'),
					paddingLeft: config('theme.spacing.2'),
					paddingRight: config('theme.spacing.2'),
					paddingTop: config('theme.spacing.2'),
					paddingBottom: config('theme.spacing.2'),
					borderWidth: config('theme.borderWidth.DEFAULT'),
					borderColor: config('theme.colors.gray.300'),
					background: config('theme.colors.gray.50')
				},
				'table td': {
					fontSize: config('theme.fontSize.xs'),
					paddingLeft: config('theme.spacing.2'),
					paddingRight: config('theme.spacing.2'),
					paddingTop: config('theme.spacing.2'),
					paddingBottom: config('theme.spacing.2'),
					borderWidth: config('theme.borderWidth.DEFAULT'),
					borderColor: config('theme.colors.gray.300')
				},
			})
		},
	]
}