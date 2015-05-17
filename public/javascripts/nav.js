Parse.initialize("ARKNOchu6ZJ851F3ofbuz1HYcAm6KjBZoj5D5wUo", "A0hhrBYZA4SGFus82faRzlkEjMZqMqmK1qHmqRR0");
var currentUser = Parse.User.current();
// 네비게이션 로고 불러오기
var s = Snap("#svg");
Snap.load("/images/cross.svg", function (svg) {
  svg.selectAll('polygon').attr({fill:'#fff'});
  svg.selectAll('path').forEach( function( el ){
    el.attr({ fill: '#fff' });
  });
  s.append(svg);
});
// 네비게이션 View 구성
var nav = new Vue({
  el: '#nav',
  data: {
    menus: [{
              active : '',
              href : '/home',
              glyphicon : 'glyphicon glyphicon-home',
              name : '홈'},
            {
              active : '',
              href : '/friend',
              glyphicon : 'glyphicon glyphicon-user',
              name : '친구'},
            {
              active : '',
              href : '/board',
              glyphicon : 'glyphicon glyphicon-blackboard',
              name : '게시판'},
            {
              active : '',
              href : '/grade',
              glyphicon : 'glyphicon glyphicon-book',
              name : '학점'},
            {
              active : '',
              href : '/timetable',
              glyphicon : 'glyphicon glyphicon-th-list',
              name : '시간표'}
           ],
    src: '',
    username: currentUser.get('nickname')
  }
});
if(currentUser.get('image')){
  nav.src = currentUser.get('image').url();
} else {
  nav.src = '/images/0.jpg';
}
// 유저 아이디 클릭시 애니메이션과 함께 표시되는 메뉴
$('#profile p.user').click(function () {
  if ($('#profile ul.setting').is(':visible')) {
    $('#profile ul.setting').transition({ marginTop: '-20px', opacity: 0, duration: 500});
    setTimeout(function() {
      $('#profile ul.setting').css('display', 'none');
    }, 250);
  } else {
    $('#profile ul.setting').css('display', 'block');
    $('#profile ul.setting').transition({ marginTop: '-40px', opacity: 100, duration: 200});
  }
});
$('#profile').mouseleave(function (e) {
  if ($('#profile ul.setting').is(':visible')) {
    $('#profile ul.setting').transition({ marginTop: '-20px', opacity: 0, duration: 500});
    setTimeout(function() {
      $('#profile ul.setting').css('display', 'none');
    }, 250);
  }
});
// 알림 메세지 띄우기
var Notification = Parse.Object.extend("Notification");
var alarmQuery = new Parse.Query(Notification);
alarmQuery.equalTo("userId", currentUser.id);
alarmQuery.find({
  success: function(alarms) {
    alarms.each(function(alarm){
      new PNotify(alarm.get("message"));
    });
  }
});

// 알림 메세지 읽기
function readAlarm(objectId ,link){
  /* objectId는 필수. link는 있으면 "/board/1?q=1" 등의 형식으로, 없으면 0으로 */
  alarmQuery.equalTo("userId", currentUser.id);
  alarmQuery.find({
    success: function(alarms) {
      alarms.each(function(alarm){
        if(alarm.id == objectId){
          alarm.destroy(); // 읽었으면 오브젝트를 DB에서 삭제한다.
          if(link) location.href = link; // 링크가 있으면 해당 주소로 이동한다.
        }
      });
    }
  });
}

// 친구 요청 메세지
var myFriends = Parse.Object.extend("Friends");
var friendquery = new Parse.Query(myFriends);
friendquery.equalTo("responseUserId", currentUser.id);
friendquery.equalTo("isAccepted", false);
friendquery.find({
  success: function(friends) { 
    if(friends){ // 나에게 친구요청한 친구들이 있으면
      var User = Parse.User;
      var userquery = new Parse.Query(User);
      friends.each(function(friend){
        userquery.equalTo("objectId", friend.get('requestUserId'));
        userquery.first({
          success: function(user) {
            if(user){
              var text = '<p>' + user.get('nickname') + '(' + user.get('username') + ')'+ '님이 친구를 요청했습니다.</p>' +
                  '<p>' + '<button class="btn btn-info" onclick="accept(' + '\'' + user.id + '\'' + ');">수락</button> <button class="btn btn-danger" onclick="deny(' + '\'' + user.id + '\'' + ');">거절</button>' + '</p>';
              new PNotify({
                title: '친구 요청',
                text: text,
                type: 'info',
                delay: 5000,
                styling: 'bootstrap3'
              });
            }
          }
        });
      });
    }
  }
});
// 친구 요청 수락
function accept(userid){
  var acceptquery = new Parse.Query(myFriends);
  acceptquery.equalTo("requestUserId", userid);
  acceptquery.equalTo("responseUserId", currentUser.id);
  acceptquery.equalTo("isAccepted", false);
  acceptquery.first({
    success: function(friend) {
      if(friend){
        friend.set("isAccepted", true);
        friend.save(null, {
          success: function(myfriend) {
            new PNotify({
              title: '친구요청 수락',
              text: '친구요청을 수락하였습니다.',
              type: 'success',
              delay: 3000,
              styling: 'bootstrap3'
            });
          }
        })
      }
    }
  });
}
// 친구 요청 거절
function deny(userid){
  var denyquery = new Parse.Query(myFriends);
  denyquery.equalTo("requestUserId", userid);
  denyquery.equalTo("responseUserId", currentUser.id);
  denyquery.equalTo("isAccepted", false);
  denyquery.first({
    success: function(friend) { 
      if(friend){
        friend.destroy({
          success: function(myfriend) {
            new PNotify({
              title: '친구요청 거절',
              text: '친구요청을 거절하였습니다.',
              type: 'success',
              delay: 3000,
              styling: 'bootstrap3'
            });
          }
        });
      }
    }
  });
}