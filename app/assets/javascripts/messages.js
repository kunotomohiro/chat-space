$(function(){
  $("#new_message").on ('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
   
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      datatype: 'json',
      perocessData: false,
      contentType: false
    })
  })
});