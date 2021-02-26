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
        if (event.target.tagName === 'A' || /toggle/i.test(event.target.className) || event.target.getAttribute("onclick")) replaceAllSelect2();
    });

    // for all elements
    // prevent bug from choosing searched result
    // or mousedown while searching will trigger the function
    $(document).change(function(event){
	// Disable it, to compatible with "closeOnSelect: false"
	// Avoid to trigger replace to avoid close any opened select2, which will make "closeOnSelect: false" no use
        //if (event.target.tagName === 'SELECT') replaceAllSelect2();
    });
	// To compatible with "closeOnSelect: false"
	// Only trigger the replace before select2 is closing, instead of changed, and aotu close single value select after select but keep opened for multiple value select
	// https://select2.org/programmatic-control/events
	$(document).on('select2:closing', function (event) {
		replaceAllSelect2();
	});
	

}(jQuery));

function replaceAllSelect2(){

    var elements = document.getElementsByTagName("select");
	
    // Known ids to ignore because of wrong display issue (summarized as available_ and selected_ ): 
    // available_c, selected_c, 
    // available_settings_issue_list_default_columns, selected_settings_issue_list_default_columns, 
    // available_settings_time_entry_list_defaults_column_names, selected_settings_time_entry_list_defaults_column_names
	
    // Known ids to ignore because of performance: summarized as permissions_, transitions_
	
    // Known ids to ignore because these fields should list all available values: 
    // settings_issue_status_x, settings_issue_status_y, 
    // settings_issue_assign_to_x, 
    // settings_issue_auto_assign_status, settings_issue_auto_assign_role, 
    // settings_issue_timelog_required_tracker, settings_issue_timelog_required_status, 
	
	    var ignoredids = [ 
	    "available_", "selected_", "permissions_", "transitions_", "role_", "tracker_", "project_enumerations_", "project_list_", 
	    "settings_issue_status_x", "settings_issue_status_y", 
	    "settings_issue_assign_to_x", 
	    "settings_issue_auto_assign_status", "settings_issue_auto_assign_role", 
	    "settings_issue_timelog_required_tracker", "settings_issue_timelog_required_status" 
     ];

    for (i = 0; i < elements.length; i++) {
		
	    var indexofsum = 0;
	    for (j = 0; j < ignoredids.length; j++) {
	        indexofsum = indexofsum + elements[i].id.indexOf(ignoredids[j]);
	    }
		
		var strPlaceholder = "";
        var hasEmptyText = false;
		$("#" + elements[i].id + " option").each(function() {
            if (this.text == "") { hasEmptyText = true; }
			if (!this.value) {
				strPlaceholder = this.text;
				return false;
			};
		});

        // For not working [width:resolve]
        if(elements[i].id == 'year'
        || elements[i].id == 'month'
        || elements[i].id == 'columns'
        || elements[i].id == 'settings_issuequery_query_id'
        || elements[i].id == 'block-select'
		|| elements[i].id == 'group_by'){

            $("#" + elements[i].id).select2({
				width: "175px", 
                placeholder: strPlaceholder, 
				// Use allowClear to let users to set empty value for fields, because select2 will hideemptyplaceholder, so we use the text of empty value option as placeholder, which the empty option is used in original select box for default value.
				allowClear: hasEmptyText
            });
        }
		else if (indexofsum + ignoredids.length > 0 || elements[i].style.display == 'none') {
		//else if (indexofsum + ignoredids.length > 0 || elements[i].style.display == 'none' || (elements[i].id == 'issue_assigned_to_id' && elements[i].value == '')) {
		// Avoid to render ignored items.
			// Avoid to render hidden option because select2 will not apply the display:none to the style of the span.
			// No need now because of dynamic placeholder is created with empty value: ----- Avoid to render empty issue_assigned_to_id,
			// No need now because of dynamic placeholder is created with empty value: ----- because Category default assignee script app\views\issues\new.js will generate to default assignee_id to select option with empty value "" and just display the name.
			// No need now because of dynamic placeholder is created with empty value: ----- and only render it after user sets a value, at that case new.js will not update the value again.
        }
        else if (elements[i].hasAttribute("multiple")) {
            // For Multiple Select
            $("#" + elements[i].id).select2({
				width: "resolve", 
				// No empty value option will be used in multiple select
                placeholder: "Multi-select", 
				// Keep select2 opening for multiple value select, after changes made. 
				// Better for user to select different values, don't need to scroll again, don't need to input the filter keyword again. 
				closeOnSelect: false, 
				// Use allowClear to let users to set empty value for fields, because select2 will hideemptyplaceholder, so we use the text of empty value option as placeholder, which the empty option is used in original select box for default value.
				allowClear: hasEmptyText
            });
        }
        else {
            // For all others
            $("#" + elements[i].id).select2({
				width: "resolve", 
                placeholder: strPlaceholder, 
				// Use allowClear to let users to set empty value for fields, because select2 will hideemptyplaceholder, so we use the text of empty value option as placeholder, which the empty option is used in original select box for default value.
				allowClear: hasEmptyText
            });
        }

    }

}
