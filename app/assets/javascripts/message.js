$(function() {
  function buildMessageHtml(message) {
    var html = `<div class="chat-area__chat__list">
                  <span class="chat-area__chat__list__name">${message.user_name}</span>
                  <span class="chat-area__chat__list__date">${message.created_at}</span>
                  <p class="chat-area__chat__list__message">${message.comment}</p>`;
    
    if (message.image_url != null) {
      var filename = getFilename(message.image_url);
      html += `<img src="${message.image_url}" alt="${filename}">`;
    }

    html += `</div>`;

    return html;
  }

  function scrollBottom() {
    $(".chat-area__chat").animate({
      scrollTop: $(".chat-area__chat")[0].scrollHeight
    }, 200);
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      createInfoBar(data.flash_key, data.flash_value);
      
      if (!data.error) {
        // 入力値クリア.
        $(".chat-area__send__text").val("");
        $("#message_image").val("");
        $("#message_image").replaceWith($("#message_image").clone());

        // 新規コメント生成.
        var html = buildMessageHtml(data);
        $(".chat-area__chat").append(html);

        // サイドバー修正.
        var last_message = $(`.side-menu__group__list[data-group_id=${data.group_id}] .side-menu__group__list__chat`);
        last_message.html(data.last_message);

        // 自動スクロール.
        scrollBottom();
      }
    })
    .fail(function() {
      createInfoBar("alert", "メッセージの送信に失敗しました。");
    });
    // .always(function() {
    //   // TODO: failした場合にdisabledが削除できない...
    //   $form = $($.rails.formSubmitSelector);
    //   $.rails.enableFormElements($form);
    //   $(".chat-area__send__submit").removeAttr("disabled");
    // });
  });
});