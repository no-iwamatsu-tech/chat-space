var messageTimeoutIdentifier = -1;

$(document).off("turbolinks:load").on("turbolinks:load", function() {

  function buildMessageHtml(message) {
    var html = "";
    html += '<div class="chat-area__chat__list">';
    html += '  <span class="chat-area__chat__list__name">' + message.user_name + '</span>';
    html += '  <span class="chat-area__chat__list__date">' + message.created_at + '</span>';
    html += '  <p class="chat-area__chat__list__message">' + message.comment + '</p>';
    
    if (message.image_url != null) {
      var filename = getFilename(message.image_url);
      html += '  <img src="' + message.image_url + '" alt="' + filename + '">';
    }

    html += '</div>';

    return html;
  }

  function changeGroupLastMessage(groupId, message) {
    var last_message = $('.side-menu__group__list[data-group_id=' + groupId + '] .side-menu__group__list__chat');
    if (last_message) {
      last_message.html(message);
    }
  }

  function scrollBottom() {
    $(".chat-area__chat").animate({
      scrollTop: $(".chat-area__chat")[0].scrollHeight
    }, 200);
  }

  function clearMessageTimeout() {
    if (0 <= messageTimeoutIdentifier) {
      clearTimeout(messageTimeoutIdentifier);
    }
  }

  function setMessageTimeout() {
    clearMessageTimeout();

    if (getUrlLastString() == "messages") {
      messageTimeoutIdentifier = setTimeout(onMessageTimeout, 5000);
    }
  }

  function onMessageTimeout() {
    if (getUrlLastString() != "messages" || $(".chat-area__send__submit").prop("disabled")) {
      setMessageTimeout();
      return;
    }

    $.ajax({
      url: location.href,
      type: "GET",
      dataType: "json"
    })
    .done(function(data) {
      
      // 新規コメント生成.
      var html = "";
      data.messages.forEach(function (message) {
        html += buildMessageHtml(message);
      });
      $(".chat-area__chat").empty().append(html);

      // サイドバー修正.
      changeGroupLastMessage(data.group_id, data.last_message);
    })
    .fail(function() {
      console.log("async update of message is failed.");
    })
    .always(function() {
      setMessageTimeout();
    });
  }

  $("#new_message").off("submit").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $(".chat-area__send__submit").prop("disabled", true);
    clearMessageTimeout();

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
        changeGroupLastMessage(data.group_id, data.last_message);

        // 自動スクロール.
        scrollBottom();
      }
    })
    .fail(function() {
      createInfoBar("alert", "メッセージの送信に失敗しました。");
    })
    .always(function() {
      $(".chat-area__send__submit").prop("disabled", false);
      setMessageTimeout();
    });
  });

  setMessageTimeout();
});