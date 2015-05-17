Parse.initialize("ARKNOchu6ZJ851F3ofbuz1HYcAm6KjBZoj5D5wUo", "A0hhrBYZA4SGFus82faRzlkEjMZqMqmK1qHmqRR0");
var currentUser = Parse.User.current();
if(!currentUser) location.href = "/";
var aside = new Vue({
  el: '#aside',
  data: {
    aside_title : '홈'
  }
});

var main = new Vue({
  el: '.main',
  data: {
    board: []
  }
});

/* 
  최근 게시물 불러오기
  loadBoard(boardId, limit) 
  1. boardId : 게시판 번호
  2. limit : 불러올 갯수
*/ 
loadBoard(1, 2); // 공지사항

function loadBoard(boardId, limit){
  var Post = Parse.Object.extend("Post");
  var Comment = Parse.Object.extend("Comment");
  var Boards = Parse.Object.extend("Boards");
  var allPosts = new Parse.Query(Post);
  var allBoards = new Parse.Query(Boards);
  var allComments = new Parse.Query(Comment);
  var postCount = 0;
  // 게시판을 찾는다.
  allBoards.equalTo("boardId", boardId);
  allBoards.first({
    success: function(board){
      if(board){
        // 게시물을 찾는다.
        allPosts.equalTo("boardId", boardId);
        allPosts.descending("createdAt");
        allPosts.find({
          success: function(posts){
            if(posts){
              posts.each(function(post){
                if(postCount < limit){
                  // 코멘트를 찾는다.
                  allComments.equalTo("boardId", boardId);
                  allComments.equalTo("postId", post.id);
                  allComments.find({
                    success: function(comments){
                      if(comments){
                        // 게시물을 불러온다.
                        main.board.push({
                          icon : 'type glyphicon ' + board.get('icon'),
                          link : '/board/' + boardId,
                          name : board.get('name'),
                          text : post.get('text'),
                          picture: post.get('pictureURL'),
                          likeClass : 'like',
                          isLikeActive : (post.get('like').length > 0) ? true : false,
                          likeCount : post.get('like').length,
                          commentClass : 'comment',
                          isCommentActive: true,
                          commentCount : comments.length,
                        });
                      } else {
                        // 게시물을 불러온다.
                        main.board.push({
                          icon : 'type glyphicon ' + board.get('icon'),
                          link : '/board/' + boardId,
                          name : board.get('name'),
                          text : post.get('text'),
                          picture: post.get('pictureURL'),
                          likeClass : 'like',
                          isLikeActive : (post.get('like').length > 0) ? true : false,
                          likeCount : post.get('like').length,
                          commentClass : 'comment',
                          isCommentActive: false,
                          commentCount : 0,
                        });
                      }
                      postCount++;
                    }
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