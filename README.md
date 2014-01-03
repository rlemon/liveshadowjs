liveShadow.js
============

Interactive eye catching shadows made easy!  

## Disclaimer 

liveShadow.js is still in early development. While it is perfectly usable today, it will be expanded to support more rich features and options. Check back for the latest code and updates.  

## Usage 
	
	$(selector).liveShadow(); 	// all options are optional.

	$(selector).liveShadow({
		// the overall length of the resulting shadow.
		shadowLength: 45,		// default 70
		// the beginning opacity of the shadow.
		opacity: 0.5,			// default .7
		// the type of shadow, text or box. 
		type: 'text',			// default 'box'
		// the rgb color
		color: {				// default
			r: 90, 				// 0
			g: 90, 				// 0
			b: 90				// 0
		},
		// the start angle, 0 is up. 
		angle: 0				// default 45
		
	});
	
## Roadmap
 - Flat Shadows and Drop Shadows
 - Static Shadows (no mousemove listener) 
 - MouseMove Container (so you can specify something other than window) 
 - automatic colour detection of the parent element
 - hex colour input
 - remove shadow option
 - wiki
 - homepage
 - demos

There is already a version of this written that does not use jQuery. I will also be releasing that after I clean it up a bit.  

If you have any question on the usage of liveShadow please feel free to contact me directly or raise an issue in the issue tracker. 