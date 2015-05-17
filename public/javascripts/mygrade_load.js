function load(){
  Parse.initialize("ARKNOchu6ZJ851F3ofbuz1HYcAm6KjBZoj5D5wUo", "A0hhrBYZA4SGFus82faRzlkEjMZqMqmK1qHmqRR0");
  currentUser = Parse.User.current();
  if(currentUser){
    var mygrade = Parse.Object.extend("myGrade");
    var query = new Parse.Query(mygrade);
    query.equalTo("userId", currentUser.id);
    query.find({
      success: function(object) { 
        if(object[0]){// 해당하는 유저의 저장된 data를 찾았으면
          var successMessage = '<p>' +
              ' 모든 정보를 불러왔습니다.' +
              '</p>';
          $.growl.notice({
            title: '<strong>정보 불러오기 성공!</strong>',
            message: successMessage
          });
          if(!object[0].get('public').isGet) total_view.public = true; // 공개여부 로드
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
        }
      }
    });
  }
}

load();