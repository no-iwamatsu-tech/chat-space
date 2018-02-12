$(document).on("turbolinks:load", function() {

  function appendSearchUser(user) {
    var html = `<div class="chat-group-user-search chat-group-user clearfix" data-user_id="${user.id}" data-user_name="${user.name}">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add">追加</a>
                </div>`;
    
    $("#user-search-result").append(html);
  }

  function appendChatMember(id, name) {
    var html = `<div class="chat-group-user-member chat-group-user clearfix" data-user_id="${id}">
                  <input type="hidden" name="group[user_ids][]" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove">削除</a>
                </div>`;

    $("#chat-group-users").append(html);
  }

  $(document).off("click", ".user-search-add").on("click", ".user-search-add", function(e) {
    e.preventDefault();
    var parent = $(this).parents(".chat-group-user-search");
    var user_id = parent.data("user_id");
    var user_name = parent.data("user_name");
    parent.remove();

    appendChatMember(user_id, user_name);
  });

  $(document).off("click", ".user-search-remove").on("click", ".user-search-remove", function(e) {
    e.preventDefault();
    var parent = $(this).parents(".chat-group-user-member");
    parent.remove();

    $("#user-search-field").keyup();
  });

  $("#user-search-field").off("keyup").on("keyup", function() {
    var keyword = $("#user-search-field").val();

    if (!keyword) {
      $("#user-search-result").empty();
      return;
    }
    
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: keyword },
      dataType: "json"
    })
    .done(function(users) {
      $("#user-search-result").empty();
      var member = $(".chat-group-user-member");
      users.filter(function(user) {
        for (var i = 0; i < member.length; i++) {
          if ($(member[i]).data("user_id") == user.id) {
            return false;
          }
        }
        return true;
      })
      .forEach(function(user) {
        appendSearchUser(user);
      });
    })
    .fail(function() {
      alert("メンバー検索に失敗しました。");
    });
  });
});