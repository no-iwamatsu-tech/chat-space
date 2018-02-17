Array.prototype.last = function() {
  return this[this.length - 1];
}
Array.prototype.removeEmpty = function() {
  return $.grep(this, function(e) {
    return e !== "";
  });
}

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

function getUrlLastString() {
  return location.href.split("/").removeEmpty().last();
}