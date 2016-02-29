/**
 * Make the button or anchor changed text whenever the ajax is called
 * @author abetobing <hi@abetobing.com> 29/02/2016
 */
(function( $ ) {

	var text = "";
	var $target = null;
	$(document).ajaxStart(function(event, xhr, opt){
		$target = $(document).data('inTheButton-target');
		text = $(document).data('inTheButton-text');

        if ($target != null) {
            if ($target.is("button") || $target.is("input")) {
                text = $target.val();
                $target.val("wait...");
                $target.attr("disabled", true);
            }
            else {
                text = $target.text();
                $target.text("wait...");          
            }
        }
    }).ajaxComplete(function(event, xhr, opt){
		$target = $(document).data('inTheButton-target');

    	if ($target != null) {
            if ($target.is("button") || $target.is("input")) {
                $target.val( text);          
                $target.attr("disabled", false);
            }
            else {
                $target.text(text);          
            }
    	}
        $target = null;
        $(document).data('inTheButton-target', $target);
    });
	
	$.fn.inTheButton = function(options) {
    	
    	var settings = $.extend({
    		target: null
    		, color: "#000000"
    		, backgroundColor: "#CCCCCC"
    	}, options)
    	

    	this.each(function() {
    		$(this).live('click', function(e){
        		$target = $(this);
        		$(document).data('inTheButton-target', $target);
        	});
    	});
    	
    };
 
}( jQuery ));