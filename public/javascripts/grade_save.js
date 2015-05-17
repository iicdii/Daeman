function doSave(){ //저장
  if(currentUser){
    var myGrade = Parse.Object.extend("myGrade");
    var mygrade = new myGrade();

    var cultureEssential = []; // 교양필수
   
    culture_essential_subject.items.each(function(item){
      cultureEssential.push({
        name: item.subjectName,  // 과목명
        grade: item.subjectGrade,  // 학점
        isGet: item.subjectCheck  // 이수 여부
      });
    });
    var cultureSelection = []; // 교양선택
    culture_selection_subject.items.each(function(item){
      cultureSelection.push({
        name: item.subjectName,  // 과목명
        grade: item.subjectGrade,  // 학점
        isGet: item.subjectCheck  // 이수 여부
      });
    });
    var majorEssential = []; // 전공필수
    major_essential_subject.items.each(function(item){
      majorEssential.push({
        name: item.subjectName,  // 과목명
        grade: item.subjectGrade,  // 학점
        isGet: item.subjectCheck  // 이수 여부
      });
    });
    var majorSelection = []; // 전공선택
    major_selection_subject.items.each(function(item){
      majorSelection.push({
        name: item.subjectName,  // 과목명
        grade: item.subjectGrade,  // 학점
        isGet: item.subjectCheck  // 이수 여부
      });
    });
    
    var query = new Parse.Query(myGrade);
    query.equalTo("userId", currentUser.id);
    query.first({
      success: function(object){
        console.log(object);
        // 이미 해당 유저의 data가 있으면 object에 해당 유저의 data를 받아옴.
        if(object){
          // 정보 공개여부 저장
          object.set("public", setting.public);
          // 교양필수 데이터 저장
          object.set("cultureEssential", {
            desired: culture_essential_grade.desireGrade,
            current: cultureEssential
          });
          // 교양선택 데이터 저장
          object.set("cultureSelection", {
            desired: culture_selection_grade.desireGrade,
            current: cultureSelection
          });
          // 전공필수 데이터 저장
          object.set("majorEssential", {
            desired: major_essential_grade.desireGrade,
            current: majorEssential
          });
          // 전공선택 데이터 저장
          object.set("majorSelection", {
            desired: major_selection_grade.desireGrade,
            current: majorSelection
          });
          object.save(null, {
            success: function(mygrade) {
              new PNotify({
                title: '저장 성공',
                text: '학점 정보를 모두 저장했습니다.',
                type: 'success',
                delay: 3000,
                styling: 'bootstrap3'
              });
            },
            error: function(mygrade, error) {
              new PNotify({
                title: '저장 실패',
                text: '학점 정보를 저장하는데 실패하였습니다. 에러 코드: ' + error.code,
                type: 'error',
                delay: 3000,
                styling: 'bootstrap3'
              });
            }
          });
        }else{
          var myGrade = Parse.Object.extend("myGrade");
          object = new myGrade();
          // 정보 공개여부 저장
          object.set("public", total_view.public);
          // 유저 고유아이디 및 아이디 저장
          object.set("userName", currentUser.getUsername());
          object.set("userId", currentUser.id);
          // 교양필수 데이터 저장
          object.set("cultureEssential", {
            desired: culture_essential_grade.desireGrade,
            current: cultureEssential
          });
          // 교양선택 데이터 저장
          object.set("cultureSelection", {
            desired: culture_selection_grade.desireGrade,
            current: cultureSelection
          });
          // 전공필수 데이터 저장
          object.set("majorEssential", {
            desired: major_essential_grade.desireGrade,
            current: majorEssential
          });
          // 전공선택 데이터 저장
          object.set("majorSelection", {
            desired: major_selection_grade.desireGrade,
            current: majorSelection
          });
          object.save(null, {
            success: function(mygrade) {
              new PNotify({
                title: '저장 성공',
                text: '학점 정보를 모두 저장했습니다.',
                type: 'success',
                delay: 3000,
                styling: 'bootstrap3'
              });
            },
            error: function(mygrade, error) {
              new PNotify({
                title: '저장 실패',
                text: '학점 정보를 저장하는데 실패했습니다. 에러 코드: ' + error.code,
                type: 'error',
                delay: 3000,
                styling: 'bootstrap3'
              });
            }
          });
        }

      },
    })
  }else{
    new PNotify({
      title: '저장 실패',
      text: '로그인이 필요합니다.',
      type: 'error',
      delay: 3000,
      styling: 'bootstrap3'
    });
  }
}