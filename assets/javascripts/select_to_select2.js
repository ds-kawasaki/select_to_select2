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
	
    // Known ids to ignore because of display issue (summarized as available_ and selected_ ): 
    // available_c, selected_c, 
    // available_settings_issue_list_default_columns, selected_settings_issue_list_default_columns, 
    // available_settings_time_entry_list_defaults_column_names, selected_settings_time_entry_list_defaults_column_names
	
    // Known ids to ignore because of display issue: 
    // settings_issue_status_x, settings_issue_status_y, 
    // settings_issue_assign_to_x, 
    // settings_issue_auto_assign_status, settings_issue_auto_assign_role, 
    // settings_issue_timelog_required_tracker, settings_issue_timelog_required_status, 
	
    // Known ids to ignore to avoid conflict with site javascript:
    // issue_assigned_to_id, issue_category_id, 
	
    var ignoredids = [ 
    "available_", "selected_", 
    "settings_issue_status_x", "settings_issue_status_y", 
    "settings_issue_assign_to_x", 
    "settings_issue_auto_assign_status", "settings_issue_auto_assign_role", 
    "settings_issue_timelog_required_tracker", "settings_issue_timelog_required_status", 
    "issue_assigned_to_id", "issue_category_id"
     ];

    for (i = 0; i < elements.length; i++) {
     
     indexofsum = 0;
     for (j = 0; j < ignoredids.length; j++) {
          indexofsum = indexofsum + elements[i].id.indexOf(ignoredids[j]);
     }

     // For not woroking 「width:resolve」
     if(elements[i].id == 'year'
     || elements[i].id == 'month'
     || elements[i].id == 'columns'
     || elements[i].id == 'settings_issuequery_query_id'
     || elements[i].id == 'block-select'){

          $("#" + elements[i].id).select2({
               width:"175px",
               placeholder: ""
          });
     }
     else if (indexofsum + ignoredids.length > 0 || elements[i].style.display == 'none') {
     // Avoid to render ignored items.
     // Avoid to render hidden option because select2 will not apply the display:none to the style of the span.
     }
     else {
     // For All Pages
     $("#" + elements[i].id).select2({
          width: "resolve", 
          placeholder: ""
     });
     }

  }

}
