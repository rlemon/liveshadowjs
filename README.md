liveShadow.js
============

Interactive eye catching shadows made easy!  

## Disclaimer 

liveShadow.js is still in early development. While it is perfectly usable today, it will be expanded to support more rich features and options. Check back for the latest code and updates.  

## Options

####shadowLength
The total distance in pixels of the full length shadow. 
Default: 70


####opacity  
Start Opacity  
Default: 0.7  


####type  
The shadow type. 
Accepts: 'box', 'text'  
Default: 'box'  


####color 
The shadow color (Note: If no color is specified the background color / color of the element will be used)  
Accepts: an object formatted like `{r:0,g:0,b:0}` or hex. (Note: short or long form, the # is optional)  
Default: auto detect  


####distance  
The distance from the mouse in pixels that effects the shadow.  
Default: 1/4 body width  


####angle  
The initial angle for the shadow before mouse interaction 
Default: 45  


####desaturate  
The shadow color desaturation amount if the color is auto detected.  
Accepts: 0 (none) to 1 (full)
Default: 0.1

## Basic Usage
	
	$(selector).liveShadow(); 	// all options are optional.
	

## Roadmap
 - Flat Shadows and Drop Shadows
 - Static Shadows (no mousemove listener) 
 - MouseMove Container (so you can specify something other than window) 
 - remove shadow option
 - wiki
 - homepage
 - demos

There is already a version of this written that does not use jQuery. I will also be releasing that after I clean it up a bit.  

If you have any question on the usage of liveShadow please feel free to contact me directly or raise an issue in the issue tracker. 