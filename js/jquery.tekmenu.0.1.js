//
// create closure
//
(function($) {
  //
  // plugin definition
  //
  
  var opts;
  
  
  $.fn.TekMenu = function(options) {
    debug(this);
    // build main options before element iteration
    opts = $.extend({}, $.fn.TekMenu.defaults, options);
    // iterate and reformat each matched element
    return this.hover($.fn.TekMenu.mostra ,$.fn.TekMenu.oculta);
  };
  
  


	 $.fn.TekMenu.mostra = function(){
	   
		var menu = $(this).attr("rel");
		$(menu).data("toca",false);
		var o = opts;
		//$(menu).stop(false,true);
		clearTimeout($(menu).data("idtimeout"));
		debug2("mostra   "+$(this).attr("rel")+" "+$(menu).data("idtimeout"));
		var position = $(this).position();
		var height = $(this).outerHeight();
		var x = position.left;
		var y = position.top+height+1;
		$(menu).css({left:x,top:y}).slideDown("slow");

		
		$(menu).unbind('mouseenter mouseleave');
		$(menu).data("toca",true);
		$(menu).hover(function(){ 
					debug2("reset timer   "+$(menu).attr("id")+" "+$(menu).data("idtimeout"));							   
					$(this).data("toca",false); 
					clearTimeout($(menu).data("idtimeout"));
					//$(this).stop(false,true).slideDown();
					
				},
				function(){ 
					$(this).data("toca",true); 
					var id = setTimeout("$.fn.TekMenu.oculta2('"+menu+"')",o.timeout);
					debug2("timer oculta  "+$(menu).attr("id")+" "+id);
					$(this).data("idtimeout",id);
					
			});
	}

	 $.fn.TekMenu.oculta = function(){
		
 		//var o = $.fn.TekMenu.opts;
		var o = opts;
		var menu = $(this).attr("rel");
		var toca =	$(menu).data("toca");
		var id = setTimeout(function(a){ return function(){ $.fn.TekMenu.oculta2(a);} }(menu),o.timeout);
		debug2("oculta "+$(this).attr("rel")+" "+id); 
		$(menu).data("idtimeout",id);
	}

	 $.fn.TekMenu.oculta2 = function(menu){
 		//var o = $.fn.TekMenu.opts;
		var o = opts;
		var toca =	$(menu).data("toca");
		if(toca){
			debug2("oculta 2 (toca)"+$(menu).attr("id"));
			if(o.fullAnimation){
				$(menu).queue(function(next){
					  $(this).hide();
					  next();
					}
				 );
			} else {
				$(menu).stop(true,true).hide();
			}
		} else {
			debug2("oculta 2 (no toca)"+$(menu).attr("id"));
		}
	}
  //
  // private function for debugging
  //
  function debug($obj) {
    if (window.console && window.console.log)
      window.console.log('menu: ' + $obj.size());
  };

  function debug2(str) {
	//var o = $.fn.TekMenu.opts;
	var o = opts;
    if (o.debug && window.console && window.console.log)
      window.console.log(str);
  };

  //
  // plugin defaults
  //
  $.fn.TekMenu.defaults = {
    timeout: 250,
	fullAnimation : false,
	debug:false,
    background: 'yellow'
  };
//
// end of closure
//
})(jQuery);