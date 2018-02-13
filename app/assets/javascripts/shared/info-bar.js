function removeInfoBar() {
  $(".info-bar").remove();
}

function createInfoBar(key, value) {
  removeInfoBar();
  
  if (typeof(key) != "string" || typeof(value) != "string") {
    return;
  }

  var html = "";
  html += '<div class="info-bar ' + key + '">';
  html += '  <p>' + value + '</p>';
  html += '</div>';
  
  $("body").append(html);
}