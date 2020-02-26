/**
 * dictionary.js
 * 辞書
 * 
 */
$(function(){
  /**
   * タブ処理
   * デフォルトタブ追加
   * タブ追加ボタン処理
   */
  tabs_count = 3;  //デフォルトタブ数
  for (var count=0; count<tabs_count; count++) {
    $("#contents_dictionary_tabs_header #tab_plus").before("<span id='content"+count+"'>Button"+count+"</span>");
    $("#contents_dictionary_tabs_main").append("<div id='content"+count+"'>Tab"+count+"の内容</div>")
  }
  $("#contents_dictionary_tabs_header #tab_plus").on("click", function(){
    $("#contents_dictionary_tabs_header #tab_plus").before("<span id='content"+tabs_count+"'>Button"+tabs_count+"</span>");
    $("#contents_dictionary_tabs_main").append("<div id='content"+tabs_count+"'>Tab"+tabs_count+"の内容</div>")
    // 要素位置修正
    $('#contents_dictionary_tabs_main>div').each(function () {
      var activeid = $('.active').attr('id');
      if ($(this).attr('id') == activeid) {
          $(this).addClass('activetab');
      }
      var currentwidth = $('#contents_dictionary_tabs').width();
      var currentindex = $(this).index();
      var currentposition = currentindex * currentwidth;
      $(this).css({
          'left': currentposition,
              'width': currentwidth - 40,
              'padding': '10px 20px'
      });
      $(this).attr('data-position', currentposition);
    });
    tabs_count += 1;
  })
  /**
   * タブ処理
   * Activeタブ移動
   */
  $.FindContainer = function () {
    $('#contents_dictionary_tabs_main>div').each(function findcontent() {
        var newindex = $('.activetab').index();
        var otherindex = $(this).index();
        var substractindex = otherindex - newindex;
        var currentwidth = $('#contents_dictionary_tabs').width();
        var newpositions = substractindex * currentwidth;
        $(this).animate({
            'left': newpositions
        });
    });
  };
  $.FindId = function () {
      $('#contents_dictionary_tabs_main>div').each(function () {
          if ($(this).attr('id') == $('.active').attr('id')) {
              $('#contents_dictionary_tabs_main>div').removeClass('activetab');
              $(this).addClass('activetab');
          }
      });
  };
  $('#contents_dictionary_tabs_header>span').first().addClass('active');
  $('#contents_dictionary_tabs_main>div').each(function () {
      var activeid = $('.active').attr('id');
      if ($(this).attr('id') == activeid) {
          $(this).addClass('activetab');
      }
      var currentwidth = $('#contents_dictionary_tabs').width();
      var currentindex = $(this).index();
      var currentposition = currentindex * currentwidth;
      $(this).css({
          'left': currentposition,
              'width': currentwidth - 40,
              'padding': '10px 20px'
      });
      $(this).attr('data-position', currentposition);
  });
  $(document).on("click", "#contents_dictionary_tabs_header>span[id^=content]", function(){
      $('#contents_dictionary_tabs_header>span').removeClass('active');
      $(this).addClass('active');
      $.FindId();
      $.FindContainer();
  });

  /**
   * タブナビゲーションアイコン処理
   * 次のタブへ進む
   */
  $('.next').click(function () {
    var activetabindex = $('.activetab').index() + 1;
    var containers = $('#contents_dictionary_tabs_main>div').length;
    if (containers == activetabindex) {
        $('#contents_dictionary_tabs_header>span').removeClass('active');
        $('#contents_dictionary_tabs_header>span').first().addClass('active');
        var currentid = $('.active').attr('id');
        $.FindId();
        $.FindContainer();
    } else {
        var currentopen = $('.active').next();
        $('.active').removeClass('active');
        currentopen.addClass('active');
        $.FindId();
        $.FindContainer();
    }
  });

  /**
   * タブナビゲーションアイコン処理
   * 前のタブへ戻る
   */
  $('.prev').click(function(){
  var activetabindex = $('.activetab').index();
      if (activetabindex == 0) {
          $('#contents_dictionary_tabs_header>span').removeClass('active');
          $('#contents_dictionary_tabs_header>span').last().prev().addClass('active');
          $.FindId();
          $.FindContainer();
      } else {
          var currentopen = $('.active').prev();
          $('.active').removeClass('active');
          currentopen.addClass('active');
          $.FindId();
          $.FindContainer();
      }
  });
})
