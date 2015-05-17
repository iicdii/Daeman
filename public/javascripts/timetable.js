Parse.initialize("ARKNOchu6ZJ851F3ofbuz1HYcAm6KjBZoj5D5wUo", "A0hhrBYZA4SGFus82faRzlkEjMZqMqmK1qHmqRR0");
var currentUser = Parse.User.current();
if(!currentUser) location.href = "/";
var setting = new Vue({
  el: '#timetableSetting',
  data: {
    title: '시간표',
    public: 'public',
    isPrimary: true,
    disabled: 'disabled'
  }
});

var aside = new Vue({
  el: '#aside',
  data: {
    aside_title : setting.title,
    lists : [{
      name: setting.title,
      current: 'current',
      objectId: ''
    }],
    primary: setting.isPrimary,
    public: '전체공개',
    currentObjectId: '',
    adder: true,
    remover: false
  },
  ready: function(){
    this.updatePublic();
    var myTimetable = Parse.Object.extend("myTimetable");
    var query = new Parse.Query(myTimetable);
    query.equalTo("userId", currentUser.id);
    query.find({
      success: function(object) { 
        console.log('데이터베이스 불러오기');
        console.log('길이 : ' + object.length + '의 자료를 불러옵니다.');
        console.log(object);
        var primaryIndex = 0;
        for(i=0;i<object.length;i++){
         aside.remover = true; // 불러온 자료가 있으면 remover를 활성화시킨다. 
         if(object[i].get('isPrimary') === true) {
           console.log(i + '번째 자료는 기본 시간표입니다.');
           primaryIndex = i;
           console.log('타이틀 : ' + object[i].get('title'));
           setting.title = object[i].get('title');
           aside.aside_title = object[i].get('title');
           setting.public = object[i].get('public');
           aside.updatePublic();
           setting.isPrimary = object[i].get('isPrimary');
           aside.lists = [];
           aside.lists.push({
             name: object[i].get('title'),
             current: 'current',
             objectId: object[i].id
           });
           aside.currentObjectId = object[i].id;
           var timetable = object[i].get('timetable');
           for(j=0;j<tablehead.head.length;j++){ 
             tablehead.head[j].grid = []; // 그 요일의 정보를 초기화하고
             tablehead.head[j].grid = timetable[j].grid; // 해당 요일의 수업을 불러온다.
           }
           new PNotify({
             title: '불러오기 성공',
             text: '해당 시간표를 불러왔습니다.',
             type: 'success',
             delay: 3000,
             styling: 'bootstrap3'
           });
         }
        }
        for(i=0;i<object.length;i++){
          if(i !== primaryIndex){
           aside.lists.push({
             name: object[i].get('title'),
             current: 'x',
             objectId: object[i].id
           });
          }   
        }
      }
    });
  },
  methods: {
    select: function select(index){
      // 다른 시간표를 선택했을 경우에만
      if(aside.lists[index].current != 'current'){
        // 시간표를 일단 초기화 시킨다.
        for(i=0; i<tablehead.head.length; i++){
          tablehead.head[i].grid = [];
        }
        // 기본 시간표 설정을 체크한다.
        if(setting.isPrimary === true) aside.updateDisabled(false);
        // DB에 없는 시간표의 경우 기본값 설정
        if(aside.lists[index].objectId === ''){
          setting.title = aside.lists[index].name;
          aside.aside_title = aside.lists[index].name;
          setting.public = 'public';
          aside.updatePublic();
          if(setting.isPrimary === true) setting.isPrimary = false; // 이미 기본시간표가 있으면 기본시간표 설정을 해제한다.
          aside.primary = setting.isPrimary;
          aside.currentObjectId = '';
          aside.remover = true;
          if(index === 0) aside.remover = false; // 첫번째 빈 시간표의 경우 remover를 비활성화시킨다.
        }
        var objectCount = 0;
        for(i=0; i<aside.lists.length; i++){
          aside.lists[i].current = 'x';
          if(aside.lists[i].objectId) objectCount++;
        }
        // 불러온 시간표가 하나도 없고 첫번째 순서의 시간표를 선택했다면
        if(objectCount === 0 && index === 0){
          // 기본 시간표로 설정한다.
          setting.isPrimary = true;
          aside.primary = setting.isPrimary;
        }
        aside.lists[index].current = 'current';
        var myTimetable = Parse.Object.extend("myTimetable");
        var query = new Parse.Query(myTimetable);
        query.equalTo("userId", currentUser.id);
        query.find({
          success: function(object) {
            for(i=0;i<object.length;i++){
              if(object[i].id == aside.lists[index].objectId){ // 인덱스의 objectId와 일치하면
                // 설정을 불러온다.
                setting.title = object[i].get('title');
                aside.aside_title = setting.title;
                setting.public = object[i].get('public');
                aside.updatePublic();
                setting.isPrimary = object[i].get('isPrimary');
                if(setting.isPrimary === true) aside.updateDisabled(true);
                aside.primary = setting.isPrimary;
                aside.currentObjectId = object[i].id;
                var timetable = object[i].get('timetable');
                for(j=0;j<tablehead.head.length;j++){ 
                  tablehead.head[j].grid = []; // 그 요일의 정보를 초기화하고
                  tablehead.head[j].grid = timetable[j].grid; // 해당 요일의 수업을 불러온다.
                }
              }
            }
          }
        });
      }
    },
    updatePublic: function (){
      if(setting.public == 'public'){
        this.public = '전체공개';
      } else {
        this.public = '친구공개';
      }
    },
    updateDisabled: function (bool){
      if(bool === true){ // true이면 활성화
        setting.disabled = 'disabled';
      } else { // false이면 비활성화
        setting.disabled = '';
      }
    },
    add: function (){
      if(this.lists.length < 8){
        this.lists.push({
          name: '새 시간표',
          current: 'x',
          objectId: ''
        });
      } else {
        new PNotify({
          title: '추가 제한',
          text: '시간표는 최대 8개까지 생성할 수 있습니다.',
          type: 'warning',
          delay: 3000,
          styling: 'bootstrap3'
        });
      }
    },
    remove: function (){
      var thisIndex;
      for(i=0;i<aside.lists.length;i++){
        // aside 리스트의 현재 인덱스를 찾는다.
        if(aside.lists[i].current == 'current') thisIndex = i; 
      }
      // 빈 시간표의 경우 묻지않고 삭제한다.
      if(aside.lists[thisIndex].objectId === '') {
        aside.lists.splice(thisIndex, 1);
        aside.select(0);
      }
      if(aside.lists[thisIndex].objectId !== '' && confirm("정말 이 시간표를 삭제하시겠습니까?")){
        var myTimetable = Parse.Object.extend("myTimetable");
        var query = new Parse.Query(myTimetable);
        if(aside.lists.length > 1){ // 리스트가 1개 이상이면
          // DB에서 지우고
          query.equalTo("userId", currentUser.id);
          query.find({
            success: function(object) {
              var currentIndex;
              var listIndex;
              var nextIsPrimary = false;
              for(i=0;i<aside.lists.length;i++){
                // aside 리스트의 현재 인덱스를 찾는다.
                if(aside.lists[i].current == 'current') listIndex = i; 
              }
              for(i=0;i<object.length;i++){
                if(object[i].id == aside.lists[listIndex].objectId){ // 인덱스의 objectId와 일치하면
                  currentIndex = i;
                }
              }
              console.log('listIndex: ' + listIndex);
              console.log('currentIndex: ' + currentIndex);
              // 삭제하려는 시간표가 기본 시간표이면
              if(object[currentIndex].get('isPrimary') === true) nextIsPrimary = true;
              object[currentIndex].destroy({
                success: function(myObject) {
                  new PNotify({
                    title: '삭제 성공',
                    text: '시간표를 삭제했습니다.',
                    type: 'success',
                    delay: 3000,
                    styling: 'bootstrap3'
                  });
                },
                error: function(myObject, error) {
                  new PNotify({
                    title: '삭제 실패',
                    text: '시간표를 삭제하는데 실패하였습니다. 에러 코드: ' + error.code,
                    type: 'error',
                    delay: 3000,
                    styling: 'bootstrap3'
                  });
                }
              });
              // 리스트에서 삭제한다.
              for(i=0;i<aside.lists.length;i++){
                // aside 리스트의 현재 인덱스를 찾는다.
                if(aside.lists[i].current == 'current') listIndex = i; 
              }
              aside.lists.splice(listIndex, 1); 
              // DB의 처음 시간표를 기본 시간표로 만든다.
              if(object[0]){
                object[0].set("isPrimary", true);
                object[0].save();
              }
              // 첫번째 시간표를 선택(select)해준다.
              aside.select(0);
            }
          });
        } else if(aside.lists.length == 1) { // 리스트가 하나면
          // DB에서 지우고
          query.equalTo("userId", currentUser.id);
          query.find({
            success: function(object) {
              var currentIndex;
              var listIndex;
              for(i=0;i<aside.lists.length;i++){
                // aside 리스트의 현재 인덱스를 찾는다.
                if(aside.lists[i].current == 'current') listIndex = i; 
              }
              for(i=0;i<object.length;i++){
                console.log('object[i].id = ' + object[i].id);
                console.log('aside.lists[listIndex].objectId = ' + aside.lists[listIndex].objectId);
                if(object[i].id == aside.lists[listIndex].objectId){ // 인덱스의 objectId와 일치하면
                  currentIndex = i;
                }
              }
              console.log('listIndex: ' + listIndex);
              console.log('currentIndex: ' + currentIndex);
              object[currentIndex].destroy({
                success: function(myObject) {
                  new PNotify({
                    title: '삭제 성공',
                    text: '시간표를 삭제했습니다.',
                    type: 'success',
                    delay: 3000,
                    styling: 'bootstrap3'
                  });
                },
                error: function(myObject, error) {
                  new PNotify({
                    title: '삭제 실패',
                    text: '시간표를 삭제하는데 실패하였습니다. 에러 코드: ' + error.code,
                    type: 'error',
                    delay: 3000,
                    styling: 'bootstrap3'
                  });
                }
              });
              
              // 시간표를 초기화 시킨다.
              setting.title = '시간표';
              setting.public = 'public';
              setting.isPrimary = true;
              setting.disabled = 'disabled';
              aside.aside_title = '시간표';
              aside.lists[0].name = setting.title;
              aside.lists[0].current = 'current';
              aside.lists[0].objectId = '';
              aside.primary = setting.isPrimary;
              aside.updatePublic();
              aside.currentObjectId = '';
              aside.adder = true;
              aside.remover = false;
              for(i=0; i<tablehead.head.length; i++){
                tablehead.head[i].grid = [];
              }
              
            }
          });
        }
      } else {
        return;
      }
    }
  }
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip({placement : 'top'});
});
$('#timetableSettingSave').click(function(){
  if(aside.currentObjectId) { // 불러온 시간표가 있으면
    var myTimetable = Parse.Object.extend("myTimetable");
    var query = new Parse.Query(myTimetable);
    query.equalTo("userId", currentUser.id);
    query.find({
      success: function(object) { 
        if(object){// data를 찾았으면
          var currentIndex;
          var primaryIndex;
          var listIndex;
          for(i=0; i<object.length; i++){
            // object의 현재 인덱스를 찾는다.
            if(object[i].id == aside.currentObjectId){
              currentIndex = i; 
            }
            // 기본 시간표의 인덱스를 찾는다.
            if(object[i].get("isPrimary") === true){
              primaryIndex = i;
            }
          }
          for(i=0;i<aside.lists.length;i++){
            // aside 리스트의 현재 인덱스를 찾는다.
            if(aside.lists[i].current == 'current') listIndex = i; 
          }
          /* 
          현재 시간표를 기본 시간표로 하려는데
          이미 기본 시간표가 설정되있을 경우
          기존의 기본 시간표 설정을 해제하고 저장한다.
          */ 
          if(setting.isPrimary === true && primaryIndex != currentIndex){
            object[primaryIndex].set("isPrimary", false);
            object[primaryIndex].save();
          }
          object[currentIndex].set("title", setting.title);
          object[currentIndex].set("public", setting.public);
          object[currentIndex].set("isPrimary", setting.isPrimary);
          aside.aside_title = setting.title;
          aside.updatePublic();
          aside.primary = setting.isPrimary;
          aside.lists.forEach(function(list){
            if(list.objectId == aside.currentObjectId){
              list.name = setting.title;
            }
          });
          // 이제 기본 시간표가 lists의 처음이 아니면 처음과 자리를 바꾼다.
          if(setting.isPrimary === true && listIndex !== 0){
            aside.lists.unshift({ name : aside.lists[listIndex].name,
                                current : aside.lists[listIndex].current,
                                objectId : aside.lists[listIndex].objectId});
            aside.lists.splice(listIndex + 1, 1);
          }
          object[currentIndex].save(null, {
            success: function(mygrade) {
              new PNotify({
                title: '저장 성공',
                text: '저장되었습니다.',
                type: 'success',
                delay: 3000,
                styling: 'bootstrap3'
              });
            },
            error: function(mygrade, error) {
              new PNotify({
                title: '저장 실패',
                text: '저장하는데 실패하였습니다. 에러 코드: ' + error.code,
                type: 'error',
                delay: 3000,
                styling: 'bootstrap3'
              });
            }
          });
        }
      }
    });
  } else { // 불러온 시간표가 없으면
    aside.aside_title = setting.title;
    aside.updatePublic();
    aside.primary = setting.isPrimary;
    var currentIndex;
    for(i=0; i<aside.lists.length; i++){
      if(aside.lists[i].current == 'current') currentIndex = i;
    }
    aside.lists[currentIndex].name = setting.title;
  }
  $('#timetableSetting').modal('hide');
});
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
  },
  methods : {
    mouseover : function mouseover(object){
      object.status = 'block';
    },
    mouseout : function mouseout(object){
      object.status = 'none';
    },
    edit: function edit(object){
      addsubject.load(object);
      if(addsubject.display === false) addsubject.display = true;
      addsubject.title = '수업 변경';
      addsubject.mode = 'edit';
    },
    del: function del(object){
      if(confirm("이 수업을 삭제하시겠습니까?")){
        var object_indexs = tablehead.head[object.$parent.$index].grid[object.$index].indexs;
        var object_items = [];
        console.log('해당 과목 삭제 시작');
        console.log(object_indexs.length + '만큼 길이의 indexs들을 돌면서 삭제합니다.');
        for(i=0;i<object_indexs.length;i++){
          // 화면 상에서 지운다.
          tablehead.head[object_indexs[i].gridindex].grid[object_indexs[i].itemindex].top = 0;
          tablehead.head[object_indexs[i].gridindex].grid[object_indexs[i].itemindex].height = 0;
        }
        for(i=0;i<object_indexs.length;i++){
          // 해당 요일의 table array에서 지워진 grid들을 삭제한다.
          console.log(tablehead.head[object_indexs[i].gridindex].grid.length + '만큼 길이의 grid들을 돌면서 삭제합니다.');
          for(j=0;j<tablehead.head[object_indexs[i].gridindex].grid.length;j++){
            console.log(j + '번째 도는 중입니다.');
            if(tablehead.head[object_indexs[i].gridindex].grid[j].top === 0 && tablehead.head[object_indexs[i].gridindex].grid[j].height === 0){
              tablehead.head[object_indexs[i].gridindex].grid.splice(j, 1);
              if(j===0){ j--; }{ j = 0; }
            }
          }
          // 그 요일의 grid들의 nextitem과 itemindex를 다시 update 시켜준다.
          for(j=0;j<tablehead.head[object_indexs[i].gridindex].grid.length;j++){
            // 테이블을 돌면서 indexs가 해당 grid를 갖고 있다면 그 itemindex를 update해준다.
            tablehead.head.forEach(function(head){
              head.grid.forEach(function(grid){
                for(k=0;k<grid.indexs.length;k++){
                  if(grid.indexs[k].gridindex == object_indexs[i].gridindex && grid.indexs[k].itemindex == tablehead.head[object_indexs[i].gridindex].grid[j].itemindex) grid.indexs[k].itemindex = j;
                }
              });
            });
            // 이제 자기자신의 itemindex를 update해준다.
            tablehead.head[object_indexs[i].gridindex].grid[j].itemindex = j;
            // nextitem을 update해준다.
            if(j<tablehead.head[object.gridindex].grid.length - 1) {
              tablehead.head[object.gridindex].grid[j].nextitem = tablehead.head[object.gridindex].grid[j+1];
            } else {
              tablehead.head[object.gridindex].grid[j].nextitem = 0;
            }
          }
        }
        // 데이터베이스 갱신하기
        var myTimetable = Parse.Object.extend("myTimetable");
        var query = new Parse.Query(myTimetable);
        query.equalTo("objectId", aside.currentObjectId);
        query.first({
          success: function(object) { 
            if(object){// data를 찾았으면
              // 설정 저장
              object.set("title", setting.title);
              object.set("public", setting.public);
              object.set("isPrimary", setting.isPrimary);
              // 시간표 데이터 저장
              object.set("timetable", tablehead.head);
              object.save(null, {
                success: function(mytimetable) {
                  new PNotify({
                    title: '저장 성공',
                    text: '시간표를 저장했습니다.',
                    type: 'success',
                    delay: 3000,
                    styling: 'bootstrap3'
                  });
                },
                error: function(mytimetable, error) {
                  new PNotify({
                    title: '저장 실패',
                    text: '저장하는데 실패하였습니다. 에러 코드: ' + error.code,
                    type: 'error',
                    delay: 3000,
                    styling: 'bootstrap3'
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

var addsubject = new Vue({
  el: '#addsubject',
  data: {
    title: '새 수업',
    display: false,
    mode: 'add',
    subject: '',
    professor: '',
    description: '',
    gridindex: 0,
    itemindex: 0,
    time: [{
      week: [{
        day: '월',
        active: 'active'
      },{
        day: '화',
        active: 'inactive'
      },{
        day: '수',
        active: 'inactive'
      },{
        day: '목',
        active: 'inactive'
      },{
        day: '금',
        active: 'inactive'
      }],
      remover: false,
      starthour_selected: '오전 9시',
      startminute_selected: '0분',
      endhour_selected: '오전 10시',
      endminute_selected: '0분',
      listindex: ''
    }],
    removelist: []
  },
  methods: {
    init: function init(){
      this.subject = '';
      this.start = 0;
      this.starts = [];
      this.end = 0;
      this.ends = [];
      this.color= '';
      this.professor = '';
      this.gridindex = 0;
      this.itemindex = 0;
      this.indexs = [];
      this.subject = '';
      this.description = '';
      this.time = [];
      this.removelist = [];
      this.time.push({
        week: [{
          day: '월',
          active: 'active'
        },{
          day: '화',
          active: 'inactive'
        },{
          day: '수',
          active: 'inactive'
        },{
          day: '목',
          active: 'inactive'
        },{
          day: '금',
          active: 'inactive'
        }],
        remover: false,
        starthour_selected: '오전 9시',
        startminute_selected: '0분',
        endhour_selected: '오전 10시',
        endminute_selected: '0분',
        listindex: ''
      });
    },
    load: function load(object){
      this.start = tablehead.head[object.$parent.$index].grid[object.$index].start;
      this.starts = tablehead.head[object.$parent.$index].grid[object.$index].starts;
      this.end = tablehead.head[object.$parent.$index].grid[object.$index].end;
      this.ends = tablehead.head[object.$parent.$index].grid[object.$index].ends;
      this.color= tablehead.head[object.$parent.$index].grid[object.$index].color;
      this.professor = tablehead.head[object.$parent.$index].grid[object.$index].professor;
      this.gridindex = object.$parent.$index;
      this.itemindex = object.$index;
      this.indexs = tablehead.head[object.$parent.$index].grid[object.$index].indexs;
      this.subject = tablehead.head[object.$parent.$index].grid[object.$index].subject;
      this.description = tablehead.head[object.$parent.$index].grid[object.$index].description;
      this.time = [{
        week: [{
          day: '월',
          active: 'active'
        },{
          day: '화',
          active: 'inactive'
        },{
          day: '수',
          active: 'inactive'
        },{
          day: '목',
          active: 'inactive'
        },{
          day: '금',
          active: 'inactive'
        }],
        remover: false,
        starthour_selected: '오전 9시',
        startminute_selected: '0분',
        endhour_selected: '오전 10시',
        endminute_selected: '0분',
        listindex: 0
      }];
      this.removelist = [];
      this.number = this.indexs.length; // 최초 불러왔을때 숫자를 저장해둔다.
      for(i=0;i<this.indexs.length;i++){
        if(i === 0){ // 첫번째 요소의 경우 이미 만들어져있는 양식에 대입만 해준다.
          // 해당 요일만 활성화 시킨다.
          for(j=0;j<this.time[i].week.length;j++){
            this.time[i].week[j].active = 'inactive';
          }
          this.time[i].week[this.indexs[i].gridindex].active = 'active';
          // 시작 시간과 종료 시간에 맞게 select값을 변경해준다.
          this.time[i].starthour_selected = $(".sh" + i + " option").eq(Math.floor(this.starts[i])).val();
          this.time[i].startminute_selected = $(".sm" + i + " option").eq((this.starts[i] - Math.floor(this.starts[i])) * 2).val();
          this.time[i].endhour_selected = $(".eh" + i + " option").eq(Math.floor(this.ends[i])).val();
          this.time[i].endminute_selected = $(".em" + i + " option").eq((this.ends[i] - Math.floor(this.ends[i])) * 2).val();
        } else {
          // 두번째 요소부터는
          // 새 양식을 먼저 push하고 값을 대입한다.
          this.time.push({
            week: [{
              day: '월',
              active: 'active'
            },{
              day: '화',
              active: 'inactive'
            },{
              day: '수',
              active: 'inactive'
            },{
              day: '목',
              active: 'inactive'
            },{
              day: '금',
              active: 'inactive'
            }],
            remover: true,
            starthour_selected: $(".sh" + i + " option").eq(Math.floor(this.starts[i])).val(),
            startminute_selected: $(".sm" + i + " option").eq((this.starts[i] - Math.floor(this.starts[i])) * 2).val(),
            endhour_selected: $(".eh" + i + " option").eq(Math.floor(this.ends[i])).val(),
            endminute_selected: $(".em" + i + " option").eq((this.ends[i] - Math.floor(this.ends[i])) * 2).val(),
            listindex: i
          });
          // 해당 요일만 활성화 시킨다.
          for(j=0;j<this.time[i].week.length;j++){
            this.time[i].week[j].active = 'inactive';
          }
          this.time[i].week[this.indexs[i].gridindex].active = 'active';
          // 시작 시간과 종료 시간에 맞게 select값을 변경해준다.
          $(".sh" + i + " option").eq(Math.floor(this.starts[i])).attr("selected", "selected");
          $(".sm" + i + " option").eq((this.starts[i] - Math.floor(this.starts[i])) * 2).attr("selected", "selected");
          $(".eh" + i + " option").eq(Math.floor(this.ends[i])).attr("selected", "selected");
          $(".em" + i + " option").eq((this.ends[i] - Math.floor(this.ends[i])) * 2).attr("selected", "selected");
        }
      }
    },
    select: function select(object, index){
      for(i=0; i<object.$parent.week.length; i++){
        object.$parent.week[i].active = 'inactive';
      }
      object.active = 'active';
    },
    updatehour: function updatehour(object){
      // 종료시간 = 시작시간 + 1시간
      var selectedIndex = $(".sh" + object.$index + " option").index($('.sh' + object.$index + ' option:selected'));
      $(".eh" + object.$index + " option").eq(selectedIndex + 1).attr("selected", "selected");
    },
    updateminute: function updateminute(object){
      // 오후 9시는 0분만 선택가능
      // 30분은 disabled 시킨다.
      var selectedIndex = $(".eh" + object.$index + " option").index($('.eh' + object.$index + ' option:selected'));
      if(selectedIndex == 12){
        $(".em" + object.$index + " option").eq(1).attr("disabled", true);
        $(".em" + object.$index + " option").eq(0).attr("selected", "selected");
      } else {
        $(".em" + object.$index + " option").eq(1).removeAttr("disabled");
      }
    },
    subjectSave: function subjectSave(){
      console.log('저장 시작');
      console.log(addsubject.indexs);
      var starts = [];
      var ends = [];
      var days = [];
      var colorlist = ['#779ecb', '#cfcfc4', '#ffd1dc', '#ff6961', '#b19cd9', '#ffb347', '#f49ac2', '#77dd77', '#03c03c', '#fdfd96'];
      var color;
      // 시작, 종료시간 계산
      for(i=0;i<addsubject.time.length;i++){
        starts.push($(".sh" + i + " option").index($(".sh" + i + " option:selected")) + ($(".sm" + i + " option").index($(".sm" + i + " option:selected")) / 2));
        ends.push($(".eh" + i + " option").index($(".eh" + i + " option:selected")) + ($(".em" + i + " option").index($(".em" + i + " option:selected")) / 2));
      }
      // 요일 계산
      for(i=0;i<addsubject.time.length;i++){
        for(j=0;j<5;j++){ 
          if(addsubject.time[i].week[j].active == 'active') days.push(j);
        }
      }
      if(validCheck(starts, ends, days)){
        console.log('starts : ');
        console.log(starts);
        console.log('ends : ');
        console.log(ends);
        console.log('days : ');
        console.log(days);
        if(addsubject.mode == 'add'){ // 과목 추가
          for(i=0;i<addsubject.time.length;i++){
            console.log(i + '번째 과목 추가중');
            // 색깔 계산 (10개중에 랜덤으로 하나를 고른다.)
            if(i===0) color = colorlist[Math.floor(Math.random() * 10)];
            lengindex = tablehead.head[days[i]].grid.length;
            tablehead.head[days[i]].grid.push({
              start: starts[i],
              starts: [],
              end: ends[i],
              ends: [],
              top: 0,
              height: 0,
              gridindex: days[i],
              itemindex: lengindex,
              indexs: [],
              color: color,
              status: 'none',
              nextitem: 0,
              subject: addsubject.subject,
              professor: addsubject.professor,
              description: addsubject.description});
            // indexs
              addsubject.indexs.push({
                gridindex: days[i],
                itemindex: lengindex
              });
            // starts, ends
            for(j=0;j<addsubject.time.length;j++){
              tablehead.head[days[i]].grid[lengindex].starts.push(starts[j]);
              tablehead.head[days[i]].grid[lengindex].ends.push(ends[j]);
            }
            // top
            tablehead.head[days[i]].grid[lengindex].top = 38 + (56 * tablehead.head[days[i]].grid[lengindex].starts[i]) + 'px';
            // height
            tablehead.head[days[i]].grid[lengindex].height = (56 * ( tablehead.head[days[i]].grid[lengindex].ends[i] - tablehead.head[days[i]].grid[lengindex].starts[i])) + 'px';
            // nextitem
            if(lengindex > 0){
              for(j=0;j<lengindex;j++){
                tablehead.head[days[i]].grid[j].nextitem = tablehead.head[days[i]].grid[j+1];
              }
            }
          }
          for(i=0;i<addsubject.time.length;i++){
            tablehead.head[addsubject.indexs[i].gridindex].grid[addsubject.indexs[i].itemindex].indexs = addsubject.indexs;
          }
        } else if(addsubject.mode == 'edit') { // 과목 수정
          console.log('과목 수정 시작');
          // 먼저 삭제 대기열(removelist)의 요소들을 삭제한다.
          addsubject.removelist.forEach(function(removeitem){
            console.log('삭제 대기열 처리 시작');
            // 모든 grid들을 돌면서 s로 끝나는 배열에서 해당 값을 삭제한다.
            tablehead.head.forEach(function(head){
              head.grid.forEach(function(grid){
                for(i=0;i<grid.indexs.length;i++){
                  if(grid.indexs[i].gridindex == removeitem.gridindex && grid.indexs[i].itemindex == removeitem.itemindex){
                    grid.starts.splice(removeitem.listindex, 1);
                    grid.ends.splice(removeitem.listindex, 1);
                    grid.indexs.splice(removeitem.listindex, 1);
                  }
                }
              })
            });
            console.log(removeitem.gridindex + '번째 요일의 ' + removeitem.itemindex + '번째 순서의 아이템을 지웁니다.');
            // 화면 상에서 지운다.
            if(tablehead.head[removeitem.gridindex].grid[removeitem.itemindex] !== undefined){
              tablehead.head[removeitem.gridindex].grid[removeitem.itemindex].top = 0;
              tablehead.head[removeitem.gridindex].grid[removeitem.itemindex].height = 0;
              // tablehead의 array에서 삭제한다.
              tablehead.head[removeitem.gridindex].grid.splice(removeitem.itemindex, 1);
            }
            // 그 요일의 grid들의 nextitem과 itemindex를 다시 update 시켜준다.
            if(tablehead.head[removeitem.gridindex].grid.length == 1){ // 하나밖에 없으면
              var original_itemindex = tablehead.head[removeitem.gridindex].grid[0].itemindex;
              // 테이블을 돌면서 indexs가 해당 grid를 갖고 있다면 그 itemindex를 update해준다.
              tablehead.head.forEach(function(head){
                head.grid.forEach(function(grid){
                  for(j=0;j<grid.indexs.length;j++){
                    if(grid.indexs[j].gridindex == removeitem.gridindex && grid.indexs[j].itemindex == original_itemindex) grid.indexs[j].itemindex = 0;
                  }
                });
              });
              // 이제 자기자신의 itemindex를 update해준다.
              tablehead.head[removeitem.gridindex].grid[0].itemindex = 0;
              tablehead.head[removeitem.gridindex].grid[0].nextitem = 0;
            }
            for(i=0;i<tablehead.head[removeitem.gridindex].grid.length;i++){
              if(tablehead.head[removeitem.gridindex].grid.length > 1){ // 하나보다 많으면
                // 테이블을 돌면서 indexs가 해당 grid를 갖고 있다면 그 itemindex를 update해준다.
                tablehead.head.forEach(function(head){
                  head.grid.forEach(function(grid){
                    for(j=0;j<grid.indexs.length;j++){
                      if(grid.indexs[j].gridindex == removeitem.gridindex && grid.indexs[j].itemindex == tablehead.head[removeitem.gridindex].grid[i].itemindex) grid.indexs[j].itemindex = i;
                    }
                  });
                });
                // 이제 자기자신의 itemindex를 update해준다.
                tablehead.head[removeitem.gridindex].grid[i].itemindex = i;  
                // nextitem
                if(i<tablehead.head[removeitem.gridindex].grid.length - 1) {
                  tablehead.head[removeitem.gridindex].grid[i].nextitem = tablehead.head[removeitem.gridindex].grid[i+1];
                } else {
                  tablehead.head[removeitem.gridindex].grid[i].nextitem = 0;
                }
              }
            }
          });
          addsubject.indexs = tablehead.head[addsubject.indexs[0].gridindex].grid[addsubject.indexs[0].itemindex].indexs;
          addsubject.starts = tablehead.head[addsubject.indexs[0].gridindex].grid[addsubject.indexs[0].itemindex].starts;
          addsubject.ends = tablehead.head[addsubject.indexs[0].gridindex].grid[addsubject.indexs[0].itemindex].ends;
          for(i=0;i<addsubject.time.length;i++){
            console.log(i + '번째 시간 수정중');
            console.log('addsubject.indexs');
            console.log(addsubject.indexs);
            if(addsubject.indexs[i] !== undefined && addsubject.indexs[i].gridindex != days[i]){ // 요일이 다르면
              console.log('요일이 다를 경우 ---!');
              color = tablehead.head[addsubject.indexs[i].gridindex].grid[addsubject.indexs[i].itemindex].color;
              tablehead.head[addsubject.indexs[i].gridindex].grid.splice(addsubject.indexs[i].itemindex, 1); // 기존 요소를 삭제하고
              // 새로 바뀐 gridindex와 itemindex를 addsubject에 update한다.
              addsubject.indexs[i].gridindex = days[i];
              addsubject.indexs[i].itemindex = tablehead.head[days[i]].grid.length;
              tablehead.head[days[i]].grid.push({ // 그 요일의 열에 새로 추가한다.
                start: starts[i],
                starts: starts,
                end: ends[i],
                ends: ends,
                top: 0,
                height: 0,
                indexs: '',
                gridindex: days[i],
                itemindex: tablehead.head[days[i]].grid.length,
                color: color,
                status: 'none',
                nextitem: 0,
                subject: addsubject.subject,
                professor: addsubject.professor,
                description: addsubject.description});
              // indexs를 실제 grid에 적용한다.
              for(j=0;j<addsubject.indexs.length;j++){
                tablehead.head[addsubject.indexs[j].gridindex].grid[addsubject.indexs[j].itemindex].indexs = addsubject.indexs;
              }
              // starts, ends를 실제 grid에 적용한다.
              for(j=0;j<addsubject.indexs.length;j++){
                tablehead.head[addsubject.indexs[j].gridindex].grid[addsubject.indexs[j].itemindex].starts = starts;
                tablehead.head[addsubject.indexs[j].gridindex].grid[addsubject.indexs[j].itemindex].ends = ends;
              }
              // nextitem
              for(j=0;j<tablehead.head[days[i]].grid.length;j++){
                if(j == tablehead.head[days[i]].grid.length - 1) tablehead.head[days[i]].grid[j].nextitem = 0;
                if(tablehead.head[days[i]].grid.length > 1){
                  tablehead.head[days[i]].grid[j].nextitem = tablehead.head[days[i]].grid[j+1];
                }
              }
            } else if(addsubject.indexs[i] !== undefined && addsubject.indexs[i].gridindex == days[i]) { // 요일이 같으면
              console.log('요일이 같을 경우 ---!');
              // 그냥 그 자리에서 수정해준다.
              tablehead.head[addsubject.indexs[i].gridindex].grid[addsubject.indexs[i].itemindex].start = starts[i];
              tablehead.head[addsubject.indexs[i].gridindex].grid[addsubject.indexs[i].itemindex].end = ends[i];
              tablehead.head[addsubject.indexs[i].gridindex].grid[addsubject.indexs[i].itemindex].top = 0;
              tablehead.head[addsubject.indexs[i].gridindex].grid[addsubject.indexs[i].itemindex].height = 0;
              tablehead.head[addsubject.indexs[i].gridindex].grid[addsubject.indexs[i].itemindex].subject = addsubject.subject;
              tablehead.head[addsubject.indexs[i].gridindex].grid[addsubject.indexs[i].itemindex].professor = addsubject.professor;
              tablehead.head[addsubject.indexs[i].gridindex].grid[addsubject.indexs[i].itemindex].description = addsubject.description;
              // 각 indexs들의 grid의 starts, ends들을 다시 update해준다.
              for(j=0;j<addsubject.indexs.length;j++){
                tablehead.head[addsubject.indexs[j].gridindex].grid[addsubject.indexs[j].itemindex].starts[i] = starts[i];
                tablehead.head[addsubject.indexs[j].gridindex].grid[addsubject.indexs[j].itemindex].ends[i] = ends[i];
              }
            } else if(addsubject.indexs[i] === undefined){ // 새로 추가되었으면
              console.log('새로 추가하는 경우 ---!');
              console.log(addsubject.indexs);
              lengindex = tablehead.head[days[i]].grid.length;
              color = tablehead.head[addsubject.indexs[0].gridindex].grid[addsubject.indexs[0].itemindex].color;
              tablehead.head[days[i]].grid.push({
                start: starts[i],
                starts: [],
                end: ends[i],
                ends: [],
                top: 0,
                height: 0,
                gridindex: days[i],
                itemindex: lengindex,
                indexs: [],
                color: color,
                status: 'none',
                nextitem: 0,
                subject: addsubject.subject,
                professor: addsubject.professor,
                description: addsubject.description});
              // indexs
              addsubject.indexs.push({
                gridindex: days[i],
                itemindex: lengindex
              });
              for(j=0;j<addsubject.indexs.length;j++){
                tablehead.head[addsubject.indexs[j].gridindex].grid[addsubject.indexs[j].itemindex].indexs = [];
                for(k=0;k<addsubject.indexs.length;k++){
                  tablehead.head[addsubject.indexs[j].gridindex].grid[addsubject.indexs[j].itemindex].indexs.push({
                    gridindex: addsubject.indexs[k].gridindex,
                    itemindex: addsubject.indexs[k].itemindex
                  });
                }
              }
              // starts, ends
              addsubject.starts.push(starts[i]);
              addsubject.ends.push(ends[i]);
              for(j=0;j<addsubject.indexs.length;j++){
                tablehead.head[addsubject.indexs[j].gridindex].grid[addsubject.indexs[j].itemindex].starts = [];
                tablehead.head[addsubject.indexs[j].gridindex].grid[addsubject.indexs[j].itemindex].ends = [];
                for(k=0;k<addsubject.indexs.length;k++){
                  tablehead.head[addsubject.indexs[j].gridindex].grid[addsubject.indexs[j].itemindex].starts.push(addsubject.starts[k]);
                  tablehead.head[addsubject.indexs[j].gridindex].grid[addsubject.indexs[j].itemindex].ends.push(addsubject.ends[k]);
                }
              }
              // nextitem
              if(lengindex > 0){
                for(j=0;j<lengindex;j++){
                  tablehead.head[days[i]].grid[j].nextitem = tablehead.head[days[i]].grid[j+1];
                }
              }
            }
            console.log('그리기 전 i : ' + i);
            console.log('그리기 전 addsubject.indexs : ');
            console.log(addsubject.indexs);
            // top
            tablehead.head[days[i]].grid[addsubject.indexs[i].itemindex].top = 38 + (56 * tablehead.head[days[i]].grid[addsubject.indexs[i].itemindex].starts[i]) + 'px';
            // height
            tablehead.head[days[i]].grid[addsubject.indexs[i].itemindex].height = (56 * ( tablehead.head[days[i]].grid[addsubject.indexs[i].itemindex].ends[i] - tablehead.head[days[i]].grid[addsubject.indexs[i].itemindex].starts[i])) + 'px';
          }
        }
        // 데이터베이스 갱신하기
        var myTimetable = Parse.Object.extend("myTimetable");
        var query = new Parse.Query(myTimetable);
        query.equalTo("objectId", aside.currentObjectId);
        query.first({
          success: function(object) { 
            if(object){// data를 찾았으면
              // 설정 저장
              object.set("title", setting.title);
              object.set("public", setting.public);
              object.set("isPrimary", setting.isPrimary);
              // 시간표 데이터 저장
              object.set("timetable", tablehead.head);
              object.save(null, {
                success: function(mytimetable) {
                  new PNotify({
                    title: '저장 성공',
                    text: '새로운 수업을 저장했습니다.',
                    type: 'success',
                    delay: 3000,
                    styling: 'bootstrap3'
                  });
                },
                error: function(mytimetable, error) {
                  new PNotify({
                    title: '저장 실패',
                    text: '저장하는데 실패하였습니다. 에러 코드: ' + error.code,
                    type: 'error',
                    delay: 3000,
                    styling: 'bootstrap3'
                  });
                }
              });
            } else { // 데이터가 없으면
              var newTimetable = Parse.Object.extend("myTimetable");
              var newObject = new newTimetable();
              // 설정 저장
              newObject.set("title", setting.title);
              newObject.set("public", setting.public);
              newObject.set("isPrimary", setting.isPrimary);
              // 유저 고유아이디 및 아이디 저장
              newObject.set("userName", currentUser.getUsername());
              newObject.set("userId", currentUser.id);
              // 시간표 데이터 저장
              newObject.set("timetable", tablehead.head);
              newObject.save(null, {
                success: function(mytimetable) {
                  // aside 목록의 objectId 설정해주기
                  for(i=0;i<aside.lists.length;i++){
                    if(aside.lists[i].current == 'current') aside.lists[i].objectId = mytimetable.id;
                  }
                  aside.currentObjectId = mytimetable.id;
                  new PNotify({
                    title: '저장 성공',
                    text: '새로운 수업을 저장했습니다.',
                    type: 'success',
                    delay: 3000,
                    styling: 'bootstrap3'
                  });
                },
                error: function(mytimetable, error) {
                  new PNotify({
                    title: '저장 실패',
                    text: '저장하는데 실패하였습니다. 에러 코드: ' + error.code,
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
        addsubject.display = false;
    },
    newtime: function newtime(){
      i = addsubject.time.length;
      if(i<3){ // 최대 갯수 제한 3개
        addsubject.time.push({
          week: [{
            day: '월',
            active: 'active'
          },{
            day: '화',
            active: 'inactive'
          },{
            day: '수',
            active: 'inactive'
          },{
            day: '목',
            active: 'inactive'
          },{
            day: '금',
            active: 'inactive'
          }],
        remover: true,
        starthour_selected: '오전 9시',
        startminute_selected: '',
        endhour_selected: '오전 10시',
        endminute_selected: '',
        listindex: ''
        });
      }
    },
    remove: function remove(object){
      if(addsubject.mode == 'add'){
        addsubject.time.splice(object.$index, 1);
      } else {
        addsubject.time.splice(object.$index, 1);
        if(addsubject.time.length < addsubject.number && object.listindex > 0){ // 원래 갯수보다 숫자가 줄어들었을 경우에
          // 삭제 대기열에 올려놓는다.
          addsubject.removelist.push({
            listindex: object.listindex,
            gridindex: tablehead.head[addsubject.gridindex].grid[addsubject.itemindex].indexs[object.listindex].gridindex,
            itemindex: tablehead.head[addsubject.gridindex].grid[addsubject.itemindex].indexs[object.listindex].itemindex
          });
        }
      }
    }
  }
});

// 시작시간 설정시 endhour를 starthour의 +1시간으로 설정하기

function validCheck(starts, ends, days){ // 과목추가 유효성 검사
  var isValid = 1;
  if(!addsubject.subject) { // 과목명 입력했는지 검사
    new PNotify({
      title: '추가 실패',
      text: '과목명은 필수로 입력해야합니다.',
      delay: 3000,
      type: 'error',
      styling: 'bootstrap3'
    });
   isValid = 0;
  }
  for(i=0;i<addsubject.time.length;i++){
    if( // 시작시간이 종료시간보다 빠른지 검사
      ($(".sh" + i + " option").index($(".sh" + i + " option:selected")) > $(".eh" + i + " option").index($(".eh" + i + " option:selected"))) || 
      ($(".sh" + i + " option").index($(".sh" + i + " option:selected")) == $(".eh" + i + " option").index($(".eh" + i + " option:selected")) && 
       (($(".sm" + i + " option").index($(".sm" + i + " option:selected"))) >= $(".em" + i + " option").index($(".em" + i + " option:selected"))))
    ){
      new PNotify({
        title: '추가 실패',
        text: '시작시간은 종료시간보다 더 빨라야합니다.',
        delay: 3000,
        type: 'error',
        styling: 'bootstrap3'
      });
      isValid = 0;
    }
  }
  
  tablehead.head.forEach(function(head){
    head.grid.forEach(function(grid){
      if(addsubject.mode == 'add'){ // 수업 추가시
        for(i=0;i<addsubject.time.length;i++){
          if(grid.gridindex == days[i] && (grid.start == starts[i] || grid.end == ends[i]) && ((starts[i] < grid.start) && (ends[i] > grid.start)) && ((starts[i] > grid.start) && (starts[i] < grid.end)) ){
            new PNotify({
              title: '추가 실패',
              text: '시간이 겹치는 수업이 있습니다.',
              delay: 3000,
              type: 'error',
              styling: 'bootstrap3'
            });
            isValid = 0;
          }
        }
      } else { // 수업 변경시
        for(i=0;i<addsubject.time.length;i++){
          if(grid.gridindex == days[i] && (grid.start == starts[i] || grid.end == ends[i]) && ((starts[i] < grid.start) && (ends[i] > grid.start)) && ((starts[i] > grid.start) && (starts[i] < grid.end)) ){
            new PNotify({
              title: '추가 실패',
              text: '시간이 겹치는 수업이 있습니다.',
              delay: 3000,
              type: 'error',
              styling: 'bootstrap3'
            });
            isValid = 0;
          }
        }
      }
    })
  });
  for(i=0;i<days.length;i++){
    for(j=i+1;j<days.length;j++){
      if(days[i] == days[j]){
        if(starts[i] == starts[j] && ends[i] == ends[j]){
          new PNotify({
            title: '추가 실패',
            text: '시간이 겹치는 수업이 있습니다.',
            delay: 3000,
            type: 'error',
            styling: 'bootstrap3'
          });
          isValid = 0;
        }
      }
    }
  }
  return isValid;
}

$('.newsubject').click(function(){
  if(addsubject.display === false) addsubject.display = true;
  addsubject.title = '새 수업';
  addsubject.mode = 'add';
  addsubject.init();
});

$('[data-dismiss="addsubject"]').click(function(){
  addsubject.display = false;
});