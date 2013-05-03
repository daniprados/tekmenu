// TekMenu by comunicatek.com  under the mit license. v:0.3.5
// Author:  Dani Prados
// http://code.comunicatek.com
(function ($) {
    "use strict";
    //
    // plugin defaults
    //
    var defaults = {
        timeout: 250,
        fullAnimation: false,
        animation: "slideDown",
        //	animationcallback :    per definir funcions propies
        speed: "slow",
        direction: "down",
        debug: false,
        rel: false
    };

    //
    // plugin definition
    //

    $.fn.TekMenu = function (options) {
        var opts;

        function debug2(str) {
            if (opts.debug && window.console && window.console.log) {
                window.console.log(str);
            }
        }

        function debug($obj) {
            debug2('menu: ' + $obj.size());
        }

        function getMenu($menu) {
            var menu = '';
            if (opts.rel) {
                menu = $menu.attr("rel");
            } else {
                menu = $menu.data("rel");
            }

            return menu;
        }

        function oculta2(menu) {
            var o = opts;
            var $menu = $(menu), toca = $menu.data("toca");
            if (toca) {
                if (o.fullAnimation) {
                    $menu.queue(function (next) {
                        $menu.hide();
                        next();
                    });
                } else {
                    $menu.stop(true, true).hide();
                }
            }
        }

        function oculta(e) {
            var o = opts;
            var menu = getMenu($(e.currentTarget));  //$(this));
            var id = setTimeout(function (a) {
                return function () {
                    oculta2(a);
                };
            }(menu), o.timeout);
            $(menu).data("idtimeout", id);
        }

        function animation($menu, x, y) {
            var o = opts;
                //height, outer, outer2;
            if (o.animationcallback) {
                o.animationcallback($menu.css({
                    left: x,
                    top: y
                }));
            } else {
                $menu.css({
                    left: x,
                    top: y
                })[o.animation](o.speed);
            }
        }

        function getposition(elem, $menu) {
            var o = opts;
            var x, y;
            var position = elem.position();
            var height, width, menuwidth;

            if (o.direction === "left") {
                menuwidth = $menu.outerWidth();
                x = position.left - 1 - menuwidth;
                y = position.top;
            } else if (o.direction === "right") {
                width = elem.outerWidth();
                x = position.left + width + 1;
                y = position.top;
            } else if (o.direction === "up") {
                height = $menu.show().outerHeight();
                $menu.hide();
                x = position.left;
                y = position.top - 1 - height;
            } else {
                height = elem.outerHeight();
                x = position.left;
                y = position.top + height + 1;
            }
            return ({
                x: x,
                y: y
            });
        }

        function mostra(e) {
            var $this = $(e.currentTarget),
                menu = getMenu($this),
                $menu = $(menu);
            $menu.data("toca", false);
            var o = opts;
            clearTimeout($menu.data("idtimeout"));
            var r = getposition($this, $menu);
            animation($menu, r.x, r.y);
            $menu.unbind('mouseenter mouseleave')
                .data("toca", true)
                .hover(function (e) {
                $(e.currentTarget).data("toca", false);
                clearTimeout($menu.data("idtimeout"));
            }, function (e) {
                $(e.currentTarget).data("toca", true);
                var id = setTimeout(function (a) {
                    return function () {
                        oculta2(a);
                    };
                }(menu), o.timeout);
                $(this).data("idtimeout", id);
            });
        }

        // Main  code
        opts = $.extend({}, defaults, options);

        debug(this);
        // build main options before element iteration
        return this.hover(mostra, oculta);
    };
    //
    // end of closure
    //
})(jQuery);