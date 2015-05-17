Parse.initialize("ARKNOchu6ZJ851F3ofbuz1HYcAm6KjBZoj5D5wUo", "A0hhrBYZA4SGFus82faRzlkEjMZqMqmK1qHmqRR0");
var currentUser = Parse.User.current();
if(!currentUser) location.href = "/";
function load(username){
  if(username){
    /* 학점 불러오기 */
    var mygrade = Parse.Object.extend("myGrade");
    var query = new Parse.Query(mygrade);
    query.equalTo("userName", username);
    query.find({
      success: function(object) { 
        if(object[0]){// 해당하는 유저의 저장된 data를 찾았으면
          new PNotify({
            title: '불러오기 성공',
            text: '학점 정보를 불러왔습니다.',
            delay: 3000,
            type: 'success',
            styling: 'bootstrap3'
          });
          if(object[0].get('public') == 'public') { // 전체공개이면
            // 교양필수 data 로드
            var cultureEssential = object[0].get('cultureEssential');
            for(i=0; i<cultureEssential.current.length; i++){
              if(i===0) {
                culture_essential_subject.items[i].subjectName = cultureEssential.current[i].name;
                culture_essential_subject.items[i].subjectGrade = cultureEssential.current[i].grade;
                culture_essential_subject.items[i].subjectCheck = cultureEssential.current[i].isGet;
              }else{
                culture_essential_subject.items.push({
                  subjectName:cultureEssential.current[i].name,
                  subjectGrade:cultureEssential.current[i].grade,
                  subjectCheck:cultureEssential.current[i].isGet
                });
              }
            }
            culture_essential_grade.desireGrade = cultureEssential.desired;

            // 교양선택 data 로드
            var cultureSelection = object[0].get('cultureSelection');
            for(i=0; i<cultureSelection.current.length; i++){
              if(i===0) {
                culture_selection_subject.items[i].subjectName = cultureSelection.current[i].name;
                culture_selection_subject.items[i].subjectGrade = cultureSelection.current[i].grade;
                culture_selection_subject.items[i].subjectCheck = cultureSelection.current[i].isGet;
              }else{
                culture_selection_subject.items.push({
                  subjectName:cultureSelection.current[i].name,
                  subjectGrade:cultureSelection.current[i].grade,
                  subjectCheck:cultureSelection.current[i].isGet
                });
              }
            }
            culture_selection_grade.desireGrade = cultureSelection.desired;

            // 전공필수 data 로드
            var majorEssential = object[0].get('majorEssential');
            for(i=0; i<majorEssential.current.length; i++){
              if(i===0) {
                major_essential_subject.items[i].subjectName = majorEssential.current[i].name;
                major_essential_subject.items[i].subjectGrade = majorEssential.current[i].grade;
                major_essential_subject.items[i].subjectCheck = majorEssential.current[i].isGet;
              }else{
                major_essential_subject.items.push({
                  subjectName:majorEssential.current[i].name,
                  subjectGrade:majorEssential.current[i].grade,
                  subjectCheck:majorEssential.current[i].isGet
                });
              }
            }
            major_essential_grade.desireGrade = majorEssential.desired;

            // 전공선택 data 로드
            var majorSelection = object[0].get('majorSelection');
            for(i=0; i<majorSelection.current.length; i++){
              if(i===0) {
                major_selection_subject.items[i].subjectName = majorSelection.current[i].name;
                major_selection_subject.items[i].subjectGrade = majorSelection.current[i].grade;
                major_selection_subject.items[i].subjectCheck = majorSelection.current[i].isGet;
              }else{
                major_selection_subject.items.push({
                  subjectName:majorSelection.current[i].name,
                  subjectGrade:majorSelection.current[i].grade,
                  subjectCheck:majorSelection.current[i].isGet
                });
              }
            }
            major_selection_grade.desireGrade = majorSelection.desired;

            getAllGradeSum();

            var graph_current = parseInt(culture_essential_subject.subjectAmount, 10);
            var graph_desire = parseInt(cultureEssential.desired, 10);
            graph_view.culture_essential_width = Math.round((graph_current/graph_desire*100)) + "%";
            graph_view.culture_essential_valuenow = Math.round((graph_current/graph_desire*100));
            graph_view.total_culture_essential_width = Math.round((graph_current/graph_desire*100)/4) + "%";
            graph_view.total_culture_essential_valuenow = Math.round((graph_current/graph_desire*100)/4);
            
            graph_current = parseInt(culture_selection_subject.subjectAmount, 10);
            graph_desire = parseInt(cultureSelection.desired, 10);
            graph_view.culture_selection_width = Math.round((graph_current/graph_desire*100)) + "%";
            graph_view.culture_selection_valuenow = Math.round((graph_current/graph_desire*100));
            graph_view.total_culture_selection_width = Math.round((graph_current/graph_desire*100)/4) + "%";
            graph_view.total_culture_selection_valuenow = Math.round((graph_current/graph_desire*100)/4);

            graph_current = parseInt(major_essential_subject.subjectAmount, 10);
            graph_desire = parseInt(majorEssential.desired, 10);
            graph_view.major_essential_width = Math.round((graph_current/graph_desire*100)) + "%";
            graph_view.major_essential_valuenow = Math.round((graph_current/graph_desire*100));
            graph_view.total_major_essential_width = Math.round((graph_current/graph_desire*100)/4) + "%";
            graph_view.total_major_essential_valuenow = Math.round((graph_current/graph_desire*100)/4);

            graph_current = parseInt(major_selection_subject.subjectAmount, 10);
            graph_desire = parseInt(majorSelection.desired, 10);
            graph_view.major_selection_width = Math.round((graph_current/graph_desire*100)) + "%";
            graph_view.major_selection_valuenow = Math.round((graph_current/graph_desire*100));
            graph_view.total_major_selection_width = Math.round((graph_current/graph_desire*100)/4) + "%";
            graph_view.total_major_selection_valuenow = Math.round((graph_current/graph_desire*100)/4);
            
            graph_view.total_value += graph_view.total_culture_essential_valuenow + graph_view.total_culture_selection_valuenow + graph_view.total_major_essential_valuenow + graph_view.total_major_selection_valuenow;
          }
        }
      }
    });
    /* 시간표 불러오기 */
    var myTimetable = Parse.Object.extend("myTimetable");
    query = new Parse.Query(myTimetable);
    query.equalTo("userName", username);
    query.find({
      success: function(object) { 
        console.log('데이터베이스 불러오기');
        console.log('길이 : ' + object.length + '의 자료를 불러옵니다.');
        console.log(object);
        object.each(function(item){
          // 기본 시간표를 불러올 때
          if(item.get('isPrimary') === true) {
            // 전체 공개이거나 친구 공개인데 자기 자신의 시간표이면 그냥 lists에 추가한다.
            if(item.get('public') == 'public' || (item.get('public') == 'friend' && item.get('userName') == currentUser.get('username'))) {
              aside.lists.splice(1, 0, {name: item.get('title'),
                                        classname: '.timetable',
                                        current: 'x',
                                        objectId: item.id});
              var timetable = item.get('timetable');
              new PNotify({
                title: '불러오기 성공',
                text: '시간표를 불러왔습니다.',
                type: 'success',
                delay: 3000,
                styling: 'bootstrap3'
              });
              // 친구 공개이면 먼저 해당 사용자와 친구인지 확인한다.
            } else if (item.get('public') == 'friend' && item.get('userName') != currentUser.get('username')){
              var Friends = Parse.Object.extend("Friends");
              var myRequest = new Parse.Query(Friends);
              myRequest.equalTo("requestUserId", currentUser.id);
              var yourRequest = new Parse.Query(Friends);
              yourRequest.equalTo("responseUserId", currentUser.id);
              var query = Parse.Query.or(myRequest, yourRequest);
              query.equalTo("isAccepted", true);
              query.find({
                success: function(friends) { 
                  if(friends){ // data를 찾았으면
                    var Users = Parse.User;
                    var userquery = new Parse.Query(Users);
                    var primaryTimetable = item.get('timetable');
                    friends.each(function(friend){
                      if(friend.get('requestUserId') == currentUser.id && friend.get('responseUserId') == item.get('userId')){
                        // 친구 확인이 되었으므로 lists에 추가한다.
                        aside.lists.splice(1, 0, {name: item.get('title'),
                                                  classname: '.timetable',
                                                  current: 'x',
                                                  objectId: item.id});
                        new PNotify({
                          title: '불러오기 성공',
                          text: '시간표를 불러왔습니다.',
                          type: 'success',
                          delay: 3000,
                          styling: 'bootstrap3'
                        });
                      } else if(friend.get('responseUserId') == currentUser.id && friend.get('requestUserId') == item.get('userId')){
                        // 친구 확인이 되었으므로 lists에 추가한다.
                        aside.lists.splice(1, 0, {name: item.get('title'),
                                                  classname: '.timetable',
                                                  current: 'x',
                                                  objectId: item.id});
                        new PNotify({
                          title: '불러오기 성공',
                          text: '시간표를 불러왔습니다.',
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
            // 기본 시간표가 아닌 일반 시간표를 불러올 때
          } else if(item.get('isPrimary') === false) {
            // 전체 공개이거나 친구 공개인데 자기 자신의 시간표이면 그냥 lists에 추가한다.
            if(item.get('public') == 'public' || (item.get('public') == 'friend' && item.get('userName') == currentUser.get('username'))) {
              aside.lists.push({
                name: item.get('title'),
                classname: '.timetable',
                current: 'x',
                objectId: item.id
              });
            // 친구 공개이면 해당 유저와 친구인지 확인한다.
            } else if(item.get('public') == 'friend' && item.get('userName') != currentUser.get('username')) {
              var myFriends = Parse.Object.extend("Friends");
              var Request = new Parse.Query(myFriends);
              Request.equalTo("requestUserId", currentUser.id);
              var Response = new Parse.Query(myFriends);
              Response.equalTo("responseUserId", currentUser.id);
              var myquery = Parse.Query.or(Request, Response);
              myquery.equalTo("isAccepted", true);
              myquery.find({
                success: function(friends) { 
                  if(friends){ // data를 찾았으면
                    var Users = Parse.User;
                    var userquery = new Parse.Query(Users);
                    var otherTimetable = item.get('timetable');
                    friends.each(function(friend){
                      if(friend.get('requestUserId') == currentUser.id && friend.get('responseUserId') == item.get('userId')){
                        // 친구 확인이 되었으면 lists에 추가해준다.
                        aside.lists.push({
                          name: item.get('title'),
                          classname: '.timetable',
                          current: 'x',
                          objectId: item.id
                        });
                      } else if(friend.get('responseUserId') == currentUser.id && friend.get('requestUserId') == item.get('userId')){
                        // 친구 확인이 되었으면 lists에 추가해준다.
                        aside.lists.push({
                          name: item.get('title'),
                          classname: '.timetable',
                          current: 'x',
                          objectId: item.id
                        });
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    });
  }
}

/* 내 친구 */
var myfriend = new Vue({
  el: '.myfriend',
  data: {
    lists: []
  },
  methods: {
    remove: function(index){
      if(confirm("정말 " + this.lists[index].nickname + "님을 친구목록에서 삭제 하시겠습니까?")){
        var Friends = Parse.Object.extend("Friends");
        var myRequest = new Parse.Query(Friends);
        myRequest.equalTo("requestUserId", currentUser.id);
        var yourRequest = new Parse.Query(Friends);
        yourRequest.equalTo("responseUserId", currentUser.id);
        var query = Parse.Query.or(myRequest, yourRequest);
        query.equalTo("isAccepted", true);
        query.find({
          success: function(friends) { 
            if(friends){ // data를 찾았으면
              var Users = Parse.User;
              var userquery = new Parse.Query(Users);
              friends.each(function(friend){
                if(currentUser.id == friend.get('responseUserId')){
                  userquery.equalTo("objectId", friend.get('requestUserId'));
                  userquery.first({
                    success: function(user) { 
                      if(user.get('nickname') == myfriend.lists[index].nickname){
                        friend.destroy({
                          success: function(f) {
                            new PNotify({
                              title: '친구삭제 성공',
                              text: myfriend.lists[index].nickname + '님을 친구목록에서 삭제하였습니다.',
                              type: 'success',
                              delay: 3000,
                              styling: 'bootstrap3'
                            });
                            myfriend.lists.splice(index, 1);
                            aside.friendCount--;
                          }
                        });
                      }
                    }
                  });
                } else if(currentUser.id == friend.get('requestUserId')){
                  userquery.equalTo("objectId", friend.get('responseUserId'));
                  userquery.first({
                    success: function(user) { 
                      if(user.get('nickname') == myfriend.lists[index].nickname){
                        friend.destroy({
                          success: function(f) {
                            new PNotify({
                              title: '친구삭제 성공',
                              text: myfriend.lists[index].nickname + '님을 친구목록에서 삭제하였습니다.',
                              type: 'success',
                              delay: 3000,
                              styling: 'bootstrap3'
                            });
                            myfriend.lists.splice(index, 1);
                            aside.friendCount--;
                          }
                        });
                      }
                    }
                  });
                }
              });
            }
          }
        });
      } else {
        return;
      }
    }
  },
});

function friendsLoad(){
  var Friends = Parse.Object.extend("Friends");
  var myRequest = new Parse.Query(Friends);
  myRequest.equalTo("requestUserId", currentUser.id);
  var yourRequest = new Parse.Query(Friends);
  yourRequest.equalTo("responseUserId", currentUser.id);
  var query = Parse.Query.or(myRequest, yourRequest);
  query.equalTo("isAccepted", true);
  query.find({
    success: function(friends) { 
      if(friends){ // data를 찾았으면
        console.log(friends.length + '길이의 친구 발견');
        aside.friendCount = friends.length;
        var Users = Parse.User;
        var userquery = new Parse.Query(Users);
        friends.each(function(friend){
          if(currentUser.id == friend.get('responseUserId')){
            userquery.equalTo("objectId", friend.get('requestUserId'));
            userquery.first({
              success: function(user) { 
                myfriend.lists.push({
                  picture: (user.get('image')) ? user.get('image').url() : '/images/0.jpg',
                  nickname: user.get('nickname'),
                  link: '/@' + user.get('username'),
                  university: user.get('university'),
                  year: user.get('year').slice(2, -1)
                });
              }
            });
          } else if(currentUser.id == friend.get('requestUserId')){
            userquery.equalTo("objectId", friend.get('responseUserId'));
            userquery.first({
              success: function(user) { 
                myfriend.lists.push({
                  picture: (user.get('image')) ? user.get('image').url() : '/images/0.jpg',
                  nickname: user.get('nickname'),
                  link: '/@' + user.get('username'),
                  university: user.get('university'),
                  year: user.get('year').slice(2, -1)
                });
              }
            });
          }
        });
      }
    }
  });
}

/* 친구 요청 */
$('#requestFriend').click(function(){
  var Users = Parse.User;
  var userquery = new Parse.Query(Users);
  // 해당 유저의 아이디가 존재하는지 먼저 확인한다.
  userquery.equalTo("username", $('#requestId').val());
  userquery.first({
    success: function(user) {
      if(user){ // 아이디가 DB에 있으면
        var Friends = Parse.Object.extend("Friends");
        var query = new Parse.Query(Friends);
        query.equalTo("requestUserId", currentUser.id);
        query.equalTo("responseUserId", user.id);
        query.first({
          success: function(friend) { 
            if(friend){ 
              if(friend.get('isAccepted') === true){
                // 이미 친구상태이면
                new PNotify({
                  title: '친구요청 실패',
                  text: '이미 친구입니다.',
                  delay: 3000,
                  type: 'warning',
                  styling: 'bootstrap3'
                });
              } else {
                // 이미 내가 상대방에게 친구요청을 한 상태이면
                new PNotify({
                  title: '친구요청 실패',
                  text: '이미 친구요청이 되있는 상태입니다.',
                  delay: 3000,
                  type: 'warning',
                  styling: 'bootstrap3'
                });
              }
            } else { // 친구요청이 안되있으면
              // 상대방이 나에게 친구요청을 한 상태인지 확인한다.
              var myQuery = new Parse.Query(Friends);
              myQuery.equalTo("requestUserId", user.id);
              myQuery.equalTo("responseUserId", currentUser.id);
              myQuery.equalTo("isAccepted", false);
              myQuery.first({
                success: function(you){
                  if(you){ // 상대방이 이미 나에게 친구요청을 한 상태이면
                    new PNotify({
                      title: '친구요청 실패',
                      text: '이미 상대방이 나에게 친구요청을 하였습니다.',
                      delay: 3000,
                      type: 'warning',
                      styling: 'bootstrap3'
                    });
                  }else{ // 양쪽 다 친구요청한 상태가 아니면
                    var newFriend = new Friends();
                    newFriend.set('requestUserId', currentUser.id);
                    newFriend.set('responseUserId', user.id);
                    newFriend.set('isAccepted', false);
                    newFriend.save(null, {
                      success: function(newfriend) {
                        new PNotify({
                          title: '친구요청 성공',
                          text: '친구를 요청했습니다.',
                          type: 'success',
                          delay: 3000,
                          styling: 'bootstrap3'
                        });
                      },
                      error: function(newfriend, error) {
                        new PNotify({
                          title: '친구요청 실패',
                          text: '친구요청에 실패하였습니다. 에러 코드: ' + error.code,
                          type: 'error',
                          delay: 3000,
                          styling: 'bootstrap3'
                        });
                      }
                    });
                  }
                }
              });
            }
          }
        });
      } else { // 아이디가 DB에 없으면
        new PNotify({
          title: '친구요청 실패',
          text: '존재하지 않는 아이디입니다.',
          delay: 3000,
          type: 'warning',
          styling: 'bootstrap3'
        });
      }
    }
  });
});

/* 학점 */

var emptySubject = {
  subjectName: '',
  subjectGrade: '',
  subjectCheck: false
};

var total_view = new Vue({
  el: '#total_view',
  data: {
    total_desire: 0,
    total_current: 0,
    total_need: 0,
    public: true
  }
});

var culture_essential_grade = new Vue({
  el: '#culture_essential_grade',
  data: {
    title: '교양필수',
    desireGrade: 0,
    currentGrade: 0,
    needGrade: 0
  }
});

var culture_selection_grade = new Vue({
  el: '#culture_selection_grade',
  data: {
    title: '교양선택',
    desireGrade: 0,
    currentGrade: 0,
    needGrade: 0
  }
});

var major_essential_grade = new Vue({
  el: '#major_essential_grade',
  data: {
    title: '전공필수',
    desireGrade: 0,
    currentGrade: 0,
    needGrade: 0
  }
});

var major_selection_grade = new Vue({
  el: '#major_selection_grade',
  data: {
    title: '전공선택',
    desireGrade: 0,
    currentGrade: 0,
    needGrade: 0
  }
});

var culture_essential_subject = new Vue({
  el: '#culture_essential_subject',
  data: {
    title: '교양필수',
    items: [{
      subjectName: '',
      subjectGrade: '',
      subjectCheck: false
    }],
    subjectAmount: 0,
    allChecked: 0
  }
});

var culture_selection_subject = new Vue({
  el: '#culture_selection_subject',
  data: {
    title: '교양선택',
    items: [{
      subjectName: '',
      subjectGrade: '',
      subjectCheck: false
    }],
    subjectAmount: 0,
    allChecked: 0
  }
});

var major_essential_subject = new Vue({
  el: '#major_essential_subject',
  data: {
    title: '전공필수',
    items: [{
      subjectName: '',
      subjectGrade: '',
      subjectCheck: false
    }],
    subjectAmount: 0,
    allChecked: 0
  }
});

var major_selection_subject = new Vue({
  el: '#major_selection_subject',
  data: {
    title: '전공선택',
    items: [{
      subjectName: '',
      subjectGrade: '',
      subjectCheck: false
    }],
    subjectAmount: 0,
    allChecked: 0
  }
});

var graph_view = new Vue({
  el: '#graph_view',
  data: {
    culture_essential_title: 0 + '%',
    culture_essential_width: 0 + '%',
    culture_essential_valuenow: 0,
    culture_selection_title: 0 + '%',
    culture_selection_width: 0 + '%',
    culture_selection_valuenow: 0,
    major_essential_title: 0 + '%',
    major_essential_width: 0 + '%',
    major_essential_valuenow: 0,
    major_selection_title: 0 + '%',
    major_selection_width: 0 + '%',
    major_selection_valuenow: 0,
    total_culture_essential_title: 0 + '%',
    total_culture_essential_width: 0 + '%',
    total_culture_essential_valuenow: 0,
    total_culture_selection_title: 0 + '%',
    total_culture_selection_width: 0 + '%',
    total_culture_selection_valuenow: 0,
    total_major_essential_title: 0 + '%',
    total_major_essential_width: 0 + '%',
    total_major_essential_valuenow: 0,
    total_major_selection_title: 0 + '%',
    total_major_selection_width: 0 + '%',
    total_major_selection_valuenow: 0,
    total_value: 0
  }
});

function getAllGradeSum(){
  var culture_essential_subject_amount = culture_essential_subject.subjectAmount;
  var culture_selection_subject_amount = culture_selection_subject.subjectAmount;
  var major_essential_subject_amount = major_essential_subject.subjectAmount;
  var major_selection_subject_amount = major_selection_subject.subjectAmount;
  culture_essential_subject_amount = 0;
  culture_selection_subject_amount = 0;
  major_essential_subject_amount = 0;
  major_selection_subject_amount = 0;
  culture_essential_subject.items.each(function(item){
    if(item.subjectCheck) culture_essential_subject_amount += parseInt(item.subjectGrade, 10);
  });
  culture_selection_subject.items.each(function(item){
    if(item.subjectCheck) culture_selection_subject_amount += parseInt(item.subjectGrade, 10);
  });
  major_essential_subject.items.each(function(item){
    if(item.subjectCheck) major_essential_subject_amount += parseInt(item.subjectGrade, 10);
  });
  major_selection_subject.items.each(function(item){
    if(item.subjectCheck) major_selection_subject_amount += parseInt(item.subjectGrade, 10);
  });
  culture_essential_subject.subjectAmount = culture_essential_subject_amount;
  culture_selection_subject.subjectAmount = culture_selection_subject_amount;
  major_essential_subject.subjectAmount = major_essential_subject_amount;
  major_selection_subject.subjectAmount = major_selection_subject_amount;
  
  culture_essential_grade.currentGrade = culture_essential_subject_amount;
  culture_essential_grade.needGrade = culture_essential_grade.desireGrade - culture_essential_subject_amount;
  culture_selection_grade.currentGrade = culture_selection_subject_amount;
  culture_selection_grade.needGrade = culture_selection_grade.desireGrade - culture_selection_subject_amount;
  major_essential_grade.currentGrade = major_essential_subject_amount;
  major_essential_grade.needGrade = major_essential_grade.desireGrade - major_essential_subject_amount;
  major_selection_grade.currentGrade = major_selection_subject_amount;
  major_selection_grade.needGrade = major_selection_grade.desireGrade - major_selection_subject_amount;
  
  total_view.total_desire = parseInt(culture_essential_grade.desireGrade,10) + parseInt(culture_selection_grade.desireGrade, 10) + parseInt(major_essential_grade.desireGrade,10) + parseInt(major_selection_grade.desireGrade,10);
  total_view.total_current = culture_essential_subject_amount + culture_selection_subject_amount + major_essential_subject_amount + major_selection_subject_amount;
  total_view.total_need = total_view.total_desire - total_view.total_current;
}

/* 시간표 */

var tablehead = new Vue({
  el: '.tablehead',
  data: {
    head: [{
      day: '월',
      grid: []
    },{
      day: '화',
      grid: []
    },{
      day: '수',
      grid: []
    },{
      day: '목',
      grid: []
    },{
      day: '금',
      grid: []
    }]
  }
});

var tablebody = new Vue({
  el: '.tablebody',
  data: {
    class: [
      { time: '오전 9시'},
      { time: '오전 10시'},
      { time: '오전 11시'},
      { time: '오후 12시'},
      { time: '오후 1시'},
      { time: '오후 2시'},
      { time: '오후 3시'},
      { time: '오후 4시'},
      { time: '오후 5시'},
      { time: '오후 6시'},
      { time: '오후 7시'},
      { time: '오후 8시'}
    ]
  }
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});