Parse.initialize("ARKNOchu6ZJ851F3ofbuz1HYcAm6KjBZoj5D5wUo", "A0hhrBYZA4SGFus82faRzlkEjMZqMqmK1qHmqRR0");
var currentUser = Parse.User.current();
function formEnter() {
  if (event.keyCode==13) {
    if($("#myPassword").val()) signin();
  }
}
function signin(){
  Parse.User.logIn($("#myId").val(), $("#myPassword").val(), {
    success: function(user) {
      location.href= "/home";
    },
    error: function(user, error) {
      if(error.code == 101){
        new PNotify({
          title: '에러: ' + error.code,
          text: '아이디 또는 비밀번호가 일치하지 않습니다.',
          delay: 3000,
          type: 'error',
          styling: 'bootstrap3'
        });
      } else {
        new PNotify({
          title: '에러: ' + error.code,
          text: error.message,
          delay: 3000,
          type: 'error',
          styling: 'bootstrap3'
        });
      }
    }
  });
}