module.exports = {
	content: ["./views/**/*.ejs"],
	theme: {
		extend: {
			keyframes: {
				slide:{
				  '0%': {opacity: '0'},
				  '100%': {opacity: '1'}
				},
				fade:{
				  '0%': {opacity: '1'},
				  '50%': {opacity: '0'},
				  '100%': {opacity: '0'}
				}
			  },
			  animation: {
				'sliding': 'slide 250ms 125ms ease-in-out both',
				'slidein': 'fade 250ms ease-in-out forwards'
			  },
		},
	},
	plugins: [],
};
