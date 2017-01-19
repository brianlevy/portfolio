$(document).ready(function(){
	//alert("script-loaded")                    
    $(window).scroll(function(){                          
        if ($(this).scrollTop() > 200) {
            $('#header.home').slideDown(250);
        } else {
            $('#header.home').slideUp(250);
        }
    });
});