Parse.initialize("ARKNOchu6ZJ851F3ofbuz1HYcAm6KjBZoj5D5wUo", "A0hhrBYZA4SGFus82faRzlkEjMZqMqmK1qHmqRR0");
var currentUser = Parse.User.current();
if(!currentUser) location.href = "/";
var setting = new Vue({
  el: '#gradeSetting',
  data: {
    public: 'public'
  }
});

var aside = new Vue({
  el: '#aside',
  data: {
    aside_title : '학점',
    lists : [{
      name: '학점 관리',
      current: 'current',
      classname: '.main',
      href: '',
    },{
      name: '내 학점',
      current: 'x',
      classname: '.',
      href: '/@' + currentUser.get('username')
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
$(function () {
  $('[data-toggle="tooltip"]').tooltip({placement : 'top'});
});

var emptySubject = {
  subjectName: '',
  subjectGrade: '',
  subjectCheck: false
};

var culture_essential_grade = new Vue({
  el: '#culture_essential_grade',
  data: {
    title: '교양필수',
    desireGrade: 0,
    currentGrade: 0,
    needGrade: 0
  },
  methods: {
    allGradeSum: function(){
      getAllGradeSum();
    }
  }
});

var culture_selection_grade = new Vue({
  el: '#culture_selection_grade',
  data: {
    title: '교양선택',
    desireGrade: 0,
    currentGrade: 0,
    needGrade: 0
  },
  methods: {
    allGradeSum: function(){
      getAllGradeSum();
    }
  }
});

var major_essential_grade = new Vue({
  el: '#major_essential_grade',
  data: {
    title: '전공필수',
    desireGrade: 0,
    currentGrade: 0,
    needGrade: 0
  },
  methods: {
    allGradeSum: function(){
      getAllGradeSum();
    }
  }
});

var major_selection_grade = new Vue({
  el: '#major_selection_grade',
  data: {
    title: '전공선택',
    desireGrade: 0,
    currentGrade: 0,
    needGrade: 0
  },
  methods: {
    allGradeSum: function(){
      getAllGradeSum();
    }
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
  },
  methods: {
    subjectCheckAll: function(){
      if(this.allChecked == 1){
        this.items.forEach(function(item){
          item.subjectCheck = false;
        });
        this.allChecked = 0;
      } else {
        this.items.forEach(function(item){
          item.subjectCheck = true;
        });
        this.allChecked = 1;
      }
      getAllGradeSum();
    },
    addSubject: function(){
      this.items.push(Object.clone(emptySubject));
    },
    allGradeSum: function(){
      getAllGradeSum();
    },
    remove: function(index){
      this.items.removeAt(index);
    }
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
  },
  methods: {
    subjectCheckAll: function(){
      if(this.allChecked == 1){
        this.items.forEach(function(item){
          item.subjectCheck = false;
        });
        this.allChecked = 0;
      } else {
        this.items.forEach(function(item){
          item.subjectCheck = true;
        });
        this.allChecked = 1;
      }
      getAllGradeSum();
    },
    addSubject: function(){
      this.items.push(Object.clone(emptySubject));
    },
    allGradeSum: function(){
      getAllGradeSum();
    },
    remove: function(index){
      this.items.removeAt(index);
    }
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
  },
  methods: {
    subjectCheckAll: function(){
      if(this.allChecked == 1){
        this.items.forEach(function(item){
          item.subjectCheck = false;
        });
        this.allChecked = 0;
      } else {
        this.items.forEach(function(item){
          item.subjectCheck = true;
        });
        this.allChecked = 1;
      }
      getAllGradeSum();
    },
    addSubject: function(){
      this.items.push(Object.clone(emptySubject));
    },
    allGradeSum: function(){
      getAllGradeSum();
    },
    remove: function(index){
      this.items.removeAt(index);
    }
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
  },
  methods: {
    subjectCheckAll: function(){
      if(this.allChecked == 1){
        this.items.forEach(function(item){
          item.subjectCheck = false;
        });
        this.allChecked = 0;
      } else {
        this.items.forEach(function(item){
          item.subjectCheck = true;
        });
        this.allChecked = 1;
      }
      getAllGradeSum();
    },
    addSubject: function(){
      this.items.push(Object.clone(emptySubject));
    },
    allGradeSum: function(){
      getAllGradeSum();
    },
    remove: function(index){
      this.items.removeAt(index);
    }
  }
});

var total_view = new Vue({
  el: '#total_view',
  data: {
    total_desire: 0,
    total_current: 0,
    total_need: 0
  },
  methods: {

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

$('#gradeSettingSave').click(function(){
  var myGrade = Parse.Object.extend("myGrade");
  var mygrade = new myGrade();
  var query = new Parse.Query(myGrade);
  query.equalTo("userId", currentUser.id);
  query.find({
    success: function(object) { 
      if(object[0]){// 해당하는 유저의 저장된 첫번째 data를 찾았으면
        object[0].set("public", setting.public);
        object[0].save(null, {
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
        $('#gradeSetting').modal('hide');
      }
    }
  });
});