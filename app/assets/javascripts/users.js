$(document).on('turbolinks:load',function(){

  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  };

  function appendNoUser(user) {
    var html = ``
    search_list.append(html);
  };

  function buildHTML(id, name) {
    var html = `<div class="chat-group-user clearfix" id=chat-group-user-${id}>
                  <input type="hidden" name="group[user_ids][]" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-id="${id}">削除</a>
                </div>`
    return html
  }

  $(".user-search-field").on("keyup", function() {
    var input = $(".user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name : input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      } else {
        appendNoUser("一致するユーザーはいません")
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    });
  });

  $(document).off('click','.user-search-add');
  $(document).on('click','.user-search-add', function() {
    var id = $(this).data('id');
    var name = $(this).data('user-name');
    var insertHTML = buildHTML(id, name);
    $('.chat-group-users').append(insertHTML);
    $(this).parent('.chat-group-user').remove();
  });

  $(document).on('click', '.user-search-remove', function() {
    var id = $(this).data('user-id');
    $(this).parent().remove();
  });
});
