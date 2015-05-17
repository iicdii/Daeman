Parse.initialize("ARKNOchu6ZJ851F3ofbuz1HYcAm6KjBZoj5D5wUo", "A0hhrBYZA4SGFus82faRzlkEjMZqMqmK1qHmqRR0");
var currentUser = Parse.User.current();
if(!currentUser) location.href = "/";
var aside = new Vue({
  el: '#aside',
  data: {
    aside_title : '내 정보',
    lists : [{
      name: '내 정보',
      current: 'current',
      classname: '.profile'
    },{
      name: '사진 변경',
      current: 'x',
      classname: '.setpicture'
    },{
      name: '알림 설정',
      current: 'x',
      classname: '.setAlarm'
    }]
  },
  methods: {
    select: function select(index){
      for(i=0; i<aside.lists.length; i++){
        $(aside.lists[i].classname).css('display', 'none');
        aside.lists[i].current = 'x';
      }
      aside.lists[index].current = 'current';
      $(aside.lists[index].classname).css('display', 'block');
    }
  }
});

var profile = new Vue({
  el: '.profile',
  data: {
    id : currentUser.getUsername(),
    nickname: currentUser.get('nickname'),
    university : currentUser.get('university'),
    year : currentUser.get('year'),
    picture: ''
  }
});
if(currentUser.get('image')){
  profile.picture = currentUser.get('image').url();
  $('#delete').css('display', 'inline-block');
} else {
  profile.picture = '/images/0.jpg';
  $('#delete').css('display', 'none');
}

var setpicture = new Vue({
  el: '.setpicture',
  data: {
    picture: ''
  }
});
if(!currentUser.get('image')){
  setpicture.picture = '/images/0.jpg'
} else {
  setpicture.picture = currentUser.get('image').url();
}

$('#change').click(function(){
  var fileUploadControl = $("#uploadpicture")[0];
  if (fileUploadControl.files.length > 0) {
    var file = fileUploadControl.files[0];
    var name = "profile.jpg";
    var parseFile = new Parse.File(name, file);
    if(file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif' ) {
      parseFile.save().then(function() {
        var user = currentUser;
        user.set("image", parseFile);
        user.save(null, {
          success: function(user) {
            new PNotify({
              title: '변경 성공',
              text: '사진을 변경했습니다.',
              type: 'success',
              delay: 3000,
              styling: 'bootstrap3'
            });
            location.reload();
          }
        });
      }, function(error) {
        new PNotify({
          title: '변경 실패',
          text: '사진을 변경하는데 실패했습니다. 에러 코드: ' + error.code,
          type: 'error',
          delay: 3000,
          styling: 'bootstrap3'
        });
      });
    } else {
      new PNotify({
        title: '파일 업로드 실패',
        text: 'gif/jpg/png 이미지만 업로드 할 수 있습니다.',
        type: 'error',
        delay: 3000,
        styling: 'bootstrap3'
      });
    }
  } else {
    new PNotify({
      title: '사진 변경실패',
      text: '업로드된 파일이 없습니다.',
      type: 'warning',
      delay: 3000,
      styling: 'bootstrap3'
    });
  }
});

$('#delete').click(function(){
  if(currentUser.get('image')){
    var user = currentUser;
    user.unset('image');
    user.save(null, {
      success: function(user) {
        new PNotify({
          title: '삭제 성공',
          text: '사진을 삭제했습니다.',
          type: 'success',
          delay: 3000,
          styling: 'bootstrap3'
        });
        location.reload();
      },
      error: function(error) {
        new PNotify({
          title: '삭제 실패',
          text: '사진을 삭제하는데 실패했습니다. 에러 코드: ' + error.code,
          type: 'error',
          delay: 3000,
          styling: 'bootstrap3'
        });
      }
    });
  }
});

var setAlarm = new Vue({
  el: '.setAlarm',
  data: {
    commentAlarm : (currentUser.get('setting').commentAlarm === true) ? true : false,
    likeAlarm : (currentUser.get('setting').likeAlarm === true) ? true : false
  },
  methods: {
    save : function(){
      var user = currentUser;
      var alarmSetting = { "commentAlarm" : this.commentAlarm, "likeAlarm" : this.likeAlarm };
      user.set("setting", alarmSetting);
      user.save(null, {
        success: function(user) {
          new PNotify({
            title: '알림 변경',
            text: '알림 설정을 변경하였습니다.',
            type: 'success',
            delay: 3000,
            styling: 'bootstrap3'
          });
        },
        error: function(error) {
          new PNotify({
            title: '알림 변경 실패',
            text: '알림을 변경하는데 실패했습니다. 에러 코드: ' + error.code,
            type: 'error',
            delay: 3000,
            styling: 'bootstrap3'
          });
        }
      });
    }
  }
})