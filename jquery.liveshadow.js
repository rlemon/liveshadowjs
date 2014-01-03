$.fn.liveShadow = function (options) {
	// http://codepen.io/rlemon/pen/pjnzD
	var render = function (elm, l, a, c) {
		var x = 1,
			y = 1,
			s = 5,
			ln = [],
			ax = Math.cos(a) * 4,
			ay = Math.sin(a) * 4;
		for (var i = 0; i < l / 4; i++) {
			x = i * ax;
			y = i * ay;
			s += 0.75;
			ln.push(x + 'px ' + y + 'px ' + s + 'px ' + 'rgba(' + c.r + ',' + c.b + ',' + c.g + ',' + (c.a - (i / (l / 4))) + ')');
		}
		elm.style[options.type + 'Shadow'] = ln.join(',');
	};
	// https://gist.github.com/rlemon/8244125
	var colorConverter = function (h) {
		h = h.replace(/#/, '');
		if (h.length === 3) h = h.replace(/./g, '$&$&');
		h = parseInt(h, 16);
		return {
			r: h >> 16,
			g: h >> 8 & 0xff,
			b: h & 0xff
		};
	};
	var defaults = {
		shadowLength: 70,
		opacity: 0.7,
		type: 'box',
		color: {
			r: 0,
			g: 0,
			b: 0
		},
		distance: document.body.offsetWidth / 4,
		angle: 45
	};
	if (typeof options.color === 'string') {
		options.color = colorConverter(options.color);
	}
	if (options.color && options.color.a) {
		options.opacity = options.color.a;
	}
	options = $.extend(defaults, options);
	options.constAngle = (90 * (Math.PI / 180));
	return this.each(function () {
		var hw = this.offsetWidth / 2,
			hh = this.offsetHeight / 2,
			pos = $(this).offset(),
			_this = this;
		render(_this, options.shadowLength, options.constAngle - options.angle, $.extend({
			a: options.opacity
		}, options.color));
		$(window).on('mousemove', function (e) {
			var dx = pos.left - e.clientX + hw,
				dy = pos.top - e.clientY + hh,
				a = options.constAngle - Math.atan2(dx, dy),
				d = Math.sqrt(dx * dx + dy * dy),
				o = d < options.distance ? (d / options.distance) * options.opacity : options.opacity,
				l = d < options.distance ? (d / options.distance) * options.shadowLength : options.shadowLength,
				col = $.extend({
					a: o
				}, options.color);
			render(_this, l, a, col);
		});
	});
};