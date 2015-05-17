function load(){
  Parse.initialize("ARKNOchu6ZJ851F3ofbuz1HYcAm6KjBZoj5D5wUo", "A0hhrBYZA4SGFus82faRzlkEjMZqMqmK1qHmqRR0");
  currentUser = Parse.User.current();
  if(currentUser){
    var mygrade = Parse.Object.extend("myGrade");
    var query = new Parse.Query(mygrade);
    query.equalTo("userId", currentUser.id);
    query.find({
      success: function(object) { 
        if(object[0]){// 해당하는 유저의 저장된 첫번째 data를 찾았으면
          new PNotify({
            title: '불러오기 성공',
            text: '학점 정보를 모두 불러왔습니다.',
            delay: 3000,
            type: 'success',
            styling: 'bootstrap3'
          });
          if(object[0].get('public') == 'public'){ setting.public = 'public'; } else { setting.public = 'friend'; }// 공개여부 로드
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
        }
      }
    });
  }
}

load();