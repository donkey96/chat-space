$(document).on('turbolinks:load', function () {

var search_list = $("#user-search-result");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
              </div>`
    search_list.append(html);
}

  function appendNoUser(user) {
    var html = `<div class='chat-group-user clearfix'>${ user }</div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function () {
    var input = $("#user-search-field").val();
    var user_ids = [];
    $(".chat-group-user__id").each(function () {
      user_ids.push($(this).val());
    });
      console.log(user_ids)
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input, user_ids: user_ids },
      dataType: 'json'
    })
    .done(function (users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーが見つかりません");
      }
    })
    .fail(function () {
      alert('ユーザー検索に失敗しました');
    })
  });

  var search_list_add = $("#chat-group-users");

  function appendUserAdd(user_name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='$chat-group-user-${ user_id }'>
                  <input class='chat-group-user__id' name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    search_list_add.append(html);
  }

    $(document).on("click", ".chat-group-user__btn--add",function () {
      var user_id = $(this).data('user-id');
      var user_name = $(this).data('user-name');
      appendUserAdd(user_name, user_id);
      $(this).parent().remove();
    });
    
    $(document).on("click", ".user-search-remove", function () {
      $(this).parent().remove();
    });
});