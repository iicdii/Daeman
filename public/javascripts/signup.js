$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})

var vue = new Vue({
  el: '#sign',
  data: {
    universities: [
      { name : "가야대학교" },
      { name : "가야대학교 김해캠퍼스" },
      { name : "가천대학교 글로벌캠퍼스" },
      { name : "가천대학교 메디컬캠퍼스" },
      { name : "가톨릭관동대학교" },
      { name : "가톨릭대학교 성신캠퍼스" },
      { name : "가톨릭대학교 성심캠퍼스" },
      { name : "가톨릭대학교 성의캠퍼스" },
      { name : "감리교신학대학교" },
      { name : "강남대학교" },
      { name : "강릉원주대학교" },
      { name : "강릉원주대학교 원주캠퍼스" },
      { name : "강원대학교" },
      { name : "강원대학교 도계캠퍼스" },
      { name : "강원대학교 삼척캠퍼스" },
      { name : "건국대학교" },
      { name : "건국대학교 글로컬캠퍼스" },
      { name : "건양대학교" },
      { name : "건양대학교 메디컬캠퍼스" },
      { name : "경기대학교" },
      { name : "경기대학교 서울캠퍼스" },
      { name : "경남과학기술대학교" },
      { name : "경남대학교" },
      { name : "경동대학교 메디컬캠퍼스" },
      { name : "경동대학교 양주캠퍼스" },
      { name : "경동대학교 설악 URIE 캠퍼스 (고성)" },
      { name : "경동대학교 설악 URIE 캠퍼스 (속초)" },
      { name : "경북대학교" },
      { name : "경북대학교 상주캠퍼스" },
      { name : "경상대학교" },
      { name : "경상대학교 칠암캠퍼스" },
      { name : "경상대학교 통영캠퍼스" },
      { name : "경성대학교" },
      { name : "경운대학교" },
      { name : "경인교육대학교 경기캠퍼스" },
      { name : "경인교육대학교 인천캠퍼스" },
      { name : "경일대학교" },
      { name : "경주대학교" },
      { name : "경찰대학교" },
      { name : "경희대학교" },
      { name : "경희대학교 국제캠퍼스" },
      { name : "계명대학교" },
      { name : "계명대학교 대명캠퍼스" },
      { name : "고려대학교" },
      { name : "고려대학교 세종캠퍼스" },
      { name : "고신대학교" },
      { name : "고신대학교 송도캠퍼스" },
      { name : "공군사관학교" },
      { name : "공주교육대학교" },
      { name : "공주대학교" },
      { name : "공주대학교 예산캠퍼스" },
      { name : "공주대학교 옥룡캠퍼스" },
      { name : "공주대학교 천안캠퍼스" },
      { name : "광신대학교" },
      { name : "광운대학교" },
      { name : "광주가톨릭대학교" },
      { name : "광주과학기술원" },
      { name : "광주교육대학교" },
      { name : "광주대학교" },
      { name : "광주여자대학교" },
      { name : "국군간호사관학교" },
      { name : "국민대학교" },
      { name : "군산대학교" },
      { name : "그리스도대학교" },
      { name : "극동대학교" },
      { name : "금강대학교" },
      { name : "금오공과대학교" },
      { name : "김천대학교" },
      { name : "꽃동네대학교" },
      { name : "나사렛대학교" },
      { name : "남부대학교" },
      { name : "남서울대학교" },
      { name : "단국대학교" },
      { name : "단국대학교 죽전캠퍼스" },
      { name : "단국대학교 천안캠퍼스" },
      { name : "대구가톨릭대학교" },
      { name : "대구경북과학기술원" },
      { name : "대구교육대학교" },
      { name : "대구대학교" },
      { name : "대구예술대학교" },
      { name : "대구외국어대학교" },
      { name : "대구한의대학교" },
      { name : "대구한의대학교 수성캠퍼스" },
      { name : "대신대학교" },
      { name : "대전가톨릭대학교" },
      { name : "대전대학교" },
      { name : "대전신학대학교" },
      { name : "대진대학교" },
      { name : "덕성여자대학교" },
      { name : "동국대학교" },
      { name : "동국대학교 경주캠퍼스" },
      { name : "동국대학교 바이오메디캠퍼스" },
      { name : "동덕여자대학교" },
      { name : "동명대학교" },
      { name : "동서대학교" },
      { name : "동신대학교" },
      { name : "동아대학교" },
      { name : "동양대학교" },
      { name : "동의대학교" },
      { name : "루터대학교" },
      { name : "명지대학교" },
      { name : "명지대학교 자연캠퍼스" },
      { name : "목원대학교" },
      { name : "목포가톨릭대학교" },
      { name : "목포대학교" },
      { name : "목포해양대학교" },
      { name : "배재대학교" },
      { name : "배재대학교 대덕캠퍼스" },
      { name : "백석대학교" },
      { name : "부경대학교" },
      { name : "부경대학교 용당캠퍼스" },
      { name : "부산가톨릭대학교" },
      { name : "부산교육대학교" },
      { name : "부산대학교" },
      { name : "부산대학교 밀양캠퍼스" },
      { name : "부산대학교 양산캠퍼스" },
      { name : "부산외국어대학교" },
      { name : "부산장신대학교" },
      { name : "삼육대학교" },
      { name : "상명대학교" },
      { name : "상명대학교 천안캠퍼스" },
      { name : "상지대학교" },
      { name : "서강대학교" },
      { name : "서경대학교" },
      { name : "서남대학교" },
      { name : "서남대학교 아산캠퍼스" },
      { name : "서울과학기술대학교" },
      { name : "서울교육대학교" },
      { name : "서울기독대학교" },
      { name : "서울대학교" },
      { name : "서울시립대학교" },
      { name : "서울신학대학교" },
      { name : "서울여자대학교" },
      { name : "서울장신대학교" },
      { name : "서원대학교" },
      { name : "선문대학교" },
      { name : "성결대학교" },
      { name : "성공회대학교" },
      { name : "성균관대학교" },
      { name : "성균관대학교 자연과학캠퍼스" },
      { name : "성신여자대학교 돈암수정캠퍼스" },
      { name : "성신여자대학교 미아운정그린캠퍼스" },
      { name : "세명대학교" },
      { name : "세종대학교" },
      { name : "세한대학교" },
      { name : "세한대학교 당진캠퍼스" },
      { name : "송원대학교" },
      { name : "수원가톨릭대학교" },
      { name : "수원대학교" },
      { name : "숙명여자대학교" },
      { name : "순천대학교" },
      { name : "순천향대학교" },
      { name : "숭실대학교" },
      { name : "신경대학교" },
      { name : "신라대학교" },
      { name : "신한대학교 동두천캠퍼스" },
      { name : "신한대학교 의정부캠퍼스" },
      { name : "아세아연합신학대학교" },
      { name : "아주대학교" },
      { name : "안동대학교" },
      { name : "안양대학교" },
      { name : "안양대학교 강화캠퍼스" },
      { name : "연세대학교" },
      { name : "연세대학교 국제캠퍼스" },
      { name : "연세대학교 원주캠퍼스" },
      { name : "영남대학교" },
      { name : "영남대학교 대구캠퍼스" },
      { name : "영남신학대학교" },
      { name : "영동대학교" },
      { name : "영산대학교" },
      { name : "영산대학교 양산캠퍼스" },
      { name : "영산선학대학교" },
      { name : "예수대학교" },
      { name : "예원예술대학교" },
      { name : "예원예술대학교 양원캠퍼스" },
      { name : "용인대학교" },
      { name : "우석대학교" },
      { name : "우석대학교 진천캠퍼스" },
      { name : "우송대학교" },
      { name : "울산과학기술대학교" },
      { name : "울산대학교" },
      { name : "원광대학교" },
      { name : "위덕대학교" },
      { name : "육군사관학교" },
      { name : "을지대학교" },
      { name : "을지대학교 성남캠퍼스" },
      { name : "이화여자대학교" },
      { name : "인제대학교" },
      { name : "인제대학교 부산캠퍼스" },
      { name : "인천가톨릭대학교 강화캠퍼스" },
      { name : "인천가톨릭대학교 송도캠퍼스" },
      { name : "인천대학교" },
      { name : "인하대학교" },
      { name : "장로회신학대학교" },
      { name : "전남대학교" },
      { name : "전남대학교 여수캠퍼스" },
      { name : "전북대학교" },
      { name : "전북대학교 고창캠퍼스" },
      { name : "전북대학교 익산캠퍼스" },
      { name : "전주교육대학교" },
      { name : "전주대학교" },
      { name : "제주국제대학교" },
      { name : "제주대학교" },
      { name : "제주대학교 사라캠퍼스" },
      { name : "조선대학교" },
      { name : "중부대학교" },
      { name : "중부대학교 고양캠퍼스" },
      { name : "중앙대학교" },
      { name : "중앙대학교 안성캠퍼스" },
      { name : "중앙승가대학교" },
      { name : "중원대학교" },
      { name : "진주교육대학교" },
      { name : "차의과학대학교" },
      { name : "창신대학교" },
      { name : "창원대학교" },
      { name : "청운대학교" },
      { name : "청운대학교 인천캠퍼스" },
      { name : "청주교육대학교" },
      { name : "청주대학교" },
      { name : "청주대학교 오송바이오캠퍼스" },
      { name : "초당대학교" },
      { name : "총신대학교" },
      { name : "추계예술대학교" },
      { name : "춘천교육대학교" },
      { name : "충남대학교" },
      { name : "충북대학교" },
      { name : "침례신학대학교" },
      { name : "칼빈대학교" },
      { name : "평택대학교" },
      { name : "포항공과대학교" },
      { name : "한경대학교" },
      { name : "한국과학기술원" },
      { name : "한국교원대학교" },
      { name : "한국교통대학교" },
      { name : "한국교통대학교 의왕캠퍼스" },
      { name : "한국교통대학교 증평캠퍼스" },
      { name : "한국국제대학교" },
      { name : "한국기술교육대학교" },
      { name : "한국뉴욕주립대학교" },
      { name : "한국방송통신대학교" },
      { name : "한국산업기술대학교" },
      { name : "한국성서대학교" },
      { name : "한국외국어대학교" },
      { name : "한국외국어대학교 글로벌캠퍼스" },
      { name : "한국체육대학교" },
      { name : "한국항공대학교" },
      { name : "한국해양대학교" },
      { name : "한남대학교" },
      { name : "한동대학교" },
      { name : "한라대학교" },
      { name : "한려대학교" },
      { name : "한림대학교" },
      { name : "한밭대학교" },
      { name : "한서대학교" },
      { name : "한서대학교 태안캠퍼스" },
      { name : "한성대학교" },
      { name : "한세대학교" },
      { name : "한신대학교" },
      { name : "한양대학교" },
      { name : "한양대학교 에리카캠퍼스" },
      { name : "한영신학대학교" },
      { name : "한일장신대학교" },
      { name : "한중대학교" },
      { name : "해군사관학교" },
      { name : "협성대학교" },
      { name : "호남대학교" },
      { name : "호남대학교 쌍촌캠퍼스" },
      { name : "호남신학대학교" },
      { name : "호서대학교" },
      { name : "호서대학교 아산캠퍼스" },
      { name : "호원대학교" },
      { name : "홍익대학교" },
      { name : "홍익대학교 세종캠퍼스" }
    ],
    id : "",
    password : "",
    nickname: ""
  }
});

Parse.initialize("ARKNOchu6ZJ851F3ofbuz1HYcAm6KjBZoj5D5wUo", "A0hhrBYZA4SGFus82faRzlkEjMZqMqmK1qHmqRR0");
var currentUser = Parse.User.current();
$('#inputID').keyup(function(){
  if(vue.id.length > 3){
    $('#alert_id').css('display','none');
  }else{
    $('#alert_id').css('display','block');
  }
});
$('#inputPassword').keyup(function(){
  if(vue.password.length > 5){
    $('#alert_password').css('display','none');
  }else{
    $('#alert_password').css('display','block');
  }
});
$('#inputNickname').keyup(function(){
  if(vue.nickname.length > 1){
    $('#alert_nickname').css('display','none');
  }else{
    $('#alert_nickname').css('display','block');
  }
});
$('#selectUniversity').change(function(){
  if($('#selectUniversity').val()){
    $('#alert_university').css('display','none');
  }else{
    $('#alert_university').css('display','block');
  }
});
$('#selectYear').change(function(){
  if($('#selectYear').val()){
    $('#alert_year').css('display','none');
  }else{
    $('#alert_year').css('display','block');
  }
});

function signup(){
  if(!$('#selectUniversity').val()) $('#alert_university').css('display', 'block');
  if(!$('#selectYear').val()) $('#alert_year').css('display', 'block');
  if(($('#inputID').val().length > 3 && $('#inputPassword').val().length > 5) && $('#inputNickname').val().length > 1 && $('#selectUniversity').val() && $('#selectYear').val()){
    var user = new Parse.User();
    user.set("username", $("#inputID").val());
    user.set("password", $("#inputPassword").val());
    user.set("nickname", $("#inputNickname").val());
    user.set("university", $('#selectUniversity').val());
    user.set("year", $('#selectYear').val());
    user.set("postWriteAuth", 9);
    user.set("commentWriteAuth", 9);
    user.set("admin", 0);
    var settings = {
      likeAlarm : true, // 좋아요 알람
      commentAlarm : true // 코멘트 알람
    };
    user.set("setting", settings);
    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        location.href= "/";
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        if(error.code == 202){
        new PNotify({
            title: '에러: ' + error.code,
            text: '해당 아이디는 다른 유저가 이미 사용중인 아이디입니다.',
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
}