module( "tests for control if  show hide works" );

asyncTest("test hide", 1, function() {
	var disp;
	$("a.menu").TekMenu({fullAnimation : true, debug : true});
	jQuery("#menutest").trigger("mouseenter");		

	setTimeout(function() {
		jQuery("#menutest").trigger("mouseleave");
		
		setTimeout(function() {
			disp = jQuery("#blog").css("display");
			equal(disp, "none", "sembla que s'oculta");
			start();
		},2000);	
	},2000);
	
});

asyncTest("test show menu", 1, function() {
	var disp;
	$("a.menu").TekMenu({fullAnimation : true, debug : true});
	disp = jQuery("#blog").css("display");
	jQuery("#menutest").trigger("mouseenter");
	console.log("he");
	
	console.log("he");
	setTimeout(function() {
		disp = jQuery("#blog").css("display");
		equal(disp, "block", "sembla que ja es veu");
		console.log("he");
		start();
	},2000);
	
});

asyncTest("test hide al desplega un altre", 2, function() {
	var disp, disp2;
	$("a.menu").TekMenu({fullAnimation : true, debug : true});
	jQuery("#menutest").trigger("mouseenter");		

	setTimeout(function() {
		jQuery("#menutest").trigger("mouseleave");
		jQuery("#menutest2").trigger("mouseenter");
		
		setTimeout(function() {
			disp = jQuery("#blog").css("display");
			equal(disp, "none", "no l'ha ocultat");
			disp2 = jQuery("#plugins").css("display");
			equal(disp2, "block", "no l'ha mostrat");

			start();
		},2000);	
	},2000);
	
});




