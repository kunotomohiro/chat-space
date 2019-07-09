$(function(){

  function buildHTML(message){
    var addImage = '';

    if (message.image.url) {
      addImage = `<img src="${message.image.url}" class="lower-message__image">`;
    }
    var html = `
       <div class="message" data-message-id="${message.id}" data-group-id="${message.group_id}">
         <div class="upper-message" data-message-id="${message.id}">
           <div class="upper-message__user-name">${message.name}</div>
           <div class="upper-message__date">${message.date}</div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
              ${message.content}
            </p>
            ${addImage}
          </div>
        </div>`;
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);

      $('.messages').append(html);
      $('.form__message').val('');

      $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(message) {
      alert('メッセージが未入力です');
    })
    return false;
  })

  var reloadMessages = function() {
   if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data("message-id");
    $.ajax( {
      url: `api/messages`,
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        var insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
      })
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, "fast");
    })
    .fail(function() {
    });
  }
};
  setInterval(reloadMessages, 5000);
});