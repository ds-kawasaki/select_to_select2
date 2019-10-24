/*
 Select To Select2 Plugin Main.
 */

(function($){

    // For Page Load
    replaceAllSelect2();

    // For Ajax
    $(document).ajaxComplete(function(event){
        replaceAllSelect2();
    });

    // For GET,POST Request
    $(window).load(function() {
        replaceAllSelect2();
    });

    // for all elements
    // click event only for toggle to multiple select
    $(document).click(function(event){
        if (event.target.tagName === 'A' || event.target.className === 'toggle-multiselect') replaceAllSelect2();
    });

    // for all elements
    // prevent bug from choosing searched result
    // or mousedown while searching will trigger the function
    $(document).change(function(event){
        if (event.target.tagName === 'SELECT') replaceAllSelect2();
    });

}(jQuery));

function replaceAllSelect2(){

    var elements = document.getElementsByTagName("select");

    for (i = 0; i < elements.length; i++) {

        // For not woroking 「width:resolve」
        if(elements[i].id == 'year'
        || elements[i].id == 'month'
        || elements[i].id == 'columns'
        || elements[i].id == 'settings_issuequery_query_id'
        || elements[i].id == 'block-select'){

            $("#" + elements[i].id).select2({
                width:"175px",
                placeholder: "",
            });
        }
        else if (elements[i].id == 'available_c' || elements[i].id == 'selected_c' || elements[i].style.display == 'none') {
            // Avoid to render available/selected columns option, because of the columm is selected by option not selected attribute.
            // Avoid to render hidden option because select2 will not apply the display:none to the style of the span.
        }
        else {
            // For All Pages
            $("#" + elements[i].id).select2({
                width:"60%",
                placeholder: "",
            });
        }

    }

}
