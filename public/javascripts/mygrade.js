$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})

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
    total_major_selection_valuenow: 0
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