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
            ln.push(x + 'px ' + y + 'px ' + s + 'px ' + 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (c.a - (i / (l / 4))) + ')');
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

    // modified version of http://www.samstarling.co.uk/2012/05/desaturating-colours-using-javascript/
    var desaturate = function (col, amt) {
        var i = 0.3 * col.r + 0.59 * col.g + 0.11 * col.b;
        return {
            r: i * amt + col.r * (1 - amt) | 0,
            g: i * amt + col.g * (1 - amt) | 0,
            b: i * amt + col.b * (1 - amt) | 0
        }
    };

    // I'm not a huge fan of this code... but it works? so yea... 
    var getColor = function (elm) {
        var colorOption = options.type === 'text' ? 'color' : 'backgroundColor',
            rgb = window.getComputedStyle(elm)[colorOption].match(/\d+/g).map(Number);
        return {
            r: rgb[0],
            g: rgb[1],
            b: rgb[2]
        }
    };

    var defaults = {
        shadowLength: 70,
        opacity: 0.7,
        type: 'box',
        color: null,
        distance: document.body.offsetWidth / 4,
        angle: 45,
        desaturate: 0.1,
        invert: false
    };

    options = $.extend(defaults, options);
    if (typeof options.color === 'string') {
        options.color = colorConverter(options.color);
    }
    if (options.color && options.color.a) {
        options.opacity = options.color.a;
    }
    options.constAngle = (90 * (Math.PI / 180));

    return this.each(function () {
        var hw = this.offsetWidth / 2,
            hh = this.offsetHeight / 2,
            pos = $(this).offset(),
            _this = this;
        var color = options.color || desaturate(getColor(this), options.desaturate);
		var position = function (e) {
            var dx = pos.left - e.clientX + hw,
                dy = pos.top - e.clientY + hh,
                a = options.constAngle - Math.atan2(dx, dy),
                d = Math.sqrt(dx * dx + dy * dy),
                o = d < options.distance ? (d / options.distance) * options.opacity : options.opacity,
                l = d < options.distance ? (d / options.distance) * options.shadowLength : options.shadowLength,
                col = $.extend({
                    a: o
                }, color);
            console.log(pos.left);
            if (options.invert) {
                a *= -1;
            }
            render(_this, l, a, col);
        };
        render(_this, options.shadowLength, options.constAngle - options.angle, $.extend({
            a: options.opacity
        }, color));
        $(window).on('resize', function (e) {
            hw = _this.offsetWidth / 2;
            hh = _this.offsetHeight / 2;
            pos = $(_this).offset();
        }).on('mousemove touchmove', position)
    });
};