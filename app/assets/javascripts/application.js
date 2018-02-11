// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_directory ./shared
//= require_tree .

$(document).off("keypress", "input:not(.allow_submit)").on("keypress", "input:not(.allow_submit)", function(e) {
  if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
    return false;
  } else {
    return true;
  }
});

function getFilename(url) {
  if (typeof(url) != "string") {
    return "";
  }

  var filename = url.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];
  return filename.charAt(0).toUpperCase() + filename.slice(1).toLowerCase();
}