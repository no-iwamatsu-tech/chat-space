function removeInfoBar() {
  $(".info-bar").remove();
}

function createInfoBar(key, value) {
  removeInfoBar();
  
  if (typeof(key) != "string" || typeof(value) != "string") {
    return;
  }

  var html = `<div class="info-bar ${key}">
                <p>${value}</p>
              </div>`
  $("body").append(html);
}