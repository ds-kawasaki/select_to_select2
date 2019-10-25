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
	
    // Known ids to ignore because of wrong display issue (summarized as available_ and selected_ ): 
    // available_c, selected_c, 
    // available_settings_issue_list_default_columns, selected_settings_issue_list_default_columns, 
    // available_settings_time_entry_list_defaults_column_names, selected_settings_time_entry_list_defaults_column_names
	
    // Known ids to ignore because these fields should list all available values: 
    // settings_issue_status_x, settings_issue_status_y, 
    // settings_issue_assign_to_x, 
    // settings_issue_auto_assign_status, settings_issue_auto_assign_role, 
    // settings_issue_timelog_required_tracker, settings_issue_timelog_required_status, 
	
    var ignoredids = [ 
    "available_", "selected_", 
    "settings_issue_status_x", "settings_issue_status_y", 
    "settings_issue_assign_to_x", 
    "settings_issue_auto_assign_status", "settings_issue_auto_assign_role", 
    "settings_issue_timelog_required_tracker", "settings_issue_timelog_required_status"
     ];

    for (i = 0; i < elements.length; i++) {
     
     indexofsum = 0;
     for (j = 0; j < ignoredids.length; j++) {
          indexofsum = indexofsum + elements[i].id.indexOf(ignoredids[j]);
     }

     // For not woroking [width:resolve]
     if(elements[i].id == 'year'
     || elements[i].id == 'month'
     || elements[i].id == 'columns'
     || elements[i].id == 'settings_issuequery_query_id'
     || elements[i].id == 'block-select'
     || elements[i].id == 'group_by'){

          $("#" + elements[i].id).select2({
               width: "175px",
               placeholder: ""
          });
     }
     else if (indexofsum + ignoredids.length > 0 || elements[i].style.display == 'none' || (elements[i].id == 'issue_assigned_to_id' && elements[i].value == '')) {
     // Avoid to render ignored items.
     // Avoid to render hidden option because select2 will not apply the display:none to the style of the span.
     // Avoid to render empty issue_assigned_to_id,
     // because Category default assignee script app\views\issues\new.js will generate to default assignee_id to select option with empty value "" and just display the name.
     // and only render it after user sets a value, at that case new.js will not update the value again.
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
