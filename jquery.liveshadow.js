$.fn.liveShadow = function (options) {
    var defaults = {
        shadowLength: 70,
        opacity: 0.7,
        type: 'box',
        color: {
            r: 0,
            g: 0,
            b: 0
        },
        angle: 45
    };

    options = $.extend(defaults, options);
    options.lightDistance = document.body.offsetWidth / 4;
    options.constAngle = (90 * (Math.PI / 180));

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

    return this.each(function () {
        var hw = this.offsetWidth / 2,
            hh = this.offsetHeight / 2,
            pos = $(this).offset(),
            _this = this;
        render(_this, options.lightDistance, options.constAngle - options.angle, $.extend({
            a: options.opacity
        }, options.color));
        $(window).on('mousemove', function (e) {
            var dx = pos.left - e.clientX + hw,
                dy = pos.top - e.clientY + hh,
                a = options.constAngle - Math.atan2(dx, dy),
                d = Math.sqrt(dx * dx + dy * dy),
                o = d < options.lightDistance ? (d / options.lightDistance) * options.opacity : options.opacity,
                l = d < options.lightDistance ? (d / options.lightDistance) * options.shadowLength : options.shadowLength,
                col = $.extend({
                    a: o
                }, options.color);
            render(_this, l, a, col);
        });
    });
};