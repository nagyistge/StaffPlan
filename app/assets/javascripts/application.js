// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//

//= require jquery
//= require moment
//= require d3.v2
//= require bootstrap
//= require async
//= require string

//= require lodash
//= require backbone
//= require backbone-support
//= require handlebars.runtime
//= require keymaster

//= require staffplan-app

//= require_tree ./mixins
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require templates/helpers
//= require_tree ./templates
//= require router

$( document ).ready(function() {
  var tokenValue = $("meta[name='csrf-token']").attr('content');

  $.ajaxSetup({
    headers: {'X-CSRF-Token': tokenValue}
  });
  
  $(document.body).on('change', 'select#user_current_company_id', function() {
    $( this ).closest( 'form' ).submit();
  });
  
  $(document.body).on('click', 'a.chill-out', function(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  });
  
  $( document.body ).on( 'view:rendered', function() {
    setTimeout(function() {
      $('.header-typeahead').typeahead({
        source: StaffPlan.typeAhead
      });
    }, 100);
  });
  
  $(document.body).on('submit', '.quick-jump', function(event) {
    event.stopPropagation();
    event.preventDefault();
    StaffPlan.onTypeAhead($(this));
  })
});
