$(document).on('turbolinks:load', function () {

  $(function(){

    function buildHTML(message) {
      var body = message.body ? `${message.body}` : ""
      var image = message.image.url ? `<img src="${message.image.url}">` : ""

      var html = `<div class="message" data-id="${message.id}">
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="message__upper-info__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="message__text">
                      <p class="message__text__body">
                        ${body}
                        ${image}
                      </p>
                    </div>
                  </div>`
      return html;
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
        $('.submit-btn').removeAttr('disabled');
        $('form')[0].reset();
      })
      .fail(function(){
        alert('error');
        $('.submit-btn').removeAttr('disabled');
      })
    })
    
    var reloadMessages = function () {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data('id');

        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function (messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');

          })
        })
        .fail(function () {
          alert('自動更新に失敗しました');
        });
      }
    };
    setInterval(reloadMessages, 5000);
  });
});