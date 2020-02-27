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
  tabs_count = 3;  // デフォルトタブ数
  tabs_max = 5;   // マックスタブ数
  add_languages_select = ""
  $.each( gon.dictionary_languages_select, function( key, value ) {
    add_languages_select += '<option value="'+key+'">'+value+'</option>'
  });
  add_input_output = 
      '<div class="left">'+
        '<div class="left_input">'+
          '<div class="left_input_select">'+
            '<div uk-form-custom="target: > * > span:last-child">'+
              '<select>'+add_languages_select+'</select>'+
              '<span class="uk-link">'+
                '<span uk-icon="icon: settings"></span>'+
                '<span></span>'+
              '</span>'+
            '</div>'+
            '<span class="left_input_select_button uk-icon-button" uk-icon="copy"></span>'+
            '<span class="left_input_select_button uk-icon-button" uk-icon="play-circle"></span>'+
            '<span class="left_input_select_button uk-icon-button" uk-icon="microphone"></span>'+
          '</div>'+
          '<textarea class="uk-textarea" rows="8" placeholder="入力欄"></textarea>'+
        '</div>'+
        '<p class="left_icon"><span uk-icon="icon: chevron-double-left; ratio: 3.5"></span></p>'+
        '<div class="left_output">'+
          '<div class="left_output_select">'+
            '<div uk-form-custom="target: > * > span:last-child">'+
              '<select>'+add_languages_select+'</select>'+
              '<span class="uk-link">'+
                '<span uk-icon="icon: settings"></span>'+
                '<span></span>'+
              '</span>'+
            '</div>'+
            '<span class="left_input_select_button uk-icon-button" uk-icon="copy"></span>'+
            '<span class="left_input_select_button uk-icon-button" uk-icon="play-circle"></span>'+
          '</div>'+
          '<textarea class="uk-textarea" rows="8" placeholder="出力欄(入力不可)" disabled></textarea>'+
        '</div>'+
      '</div>'

  // デフォルト
  for (var count=0; count<tabs_count; count++) {
    $("#contents_dictionary_tabs_header #tab_plus").before("<span id='content"+count+"'>Tab"+count+"</span>");
    $("#contents_dictionary_tabs_main").append("<div id='content"+count+"'>"+add_input_output+"</div>")
  }
  // タブ追加
  $("#contents_dictionary_tabs_header #tab_plus").on("click", function(){
    if (tabs_count==tabs_max && gon.user==null) {
      Swal.fire({
        icon: 'warning',
        title: 'タブの追加上限に達しました',
        text: 'ユーザーログインする事で、無制限に開放可能！',
      })
    } else {
      before_css = parseInt($("#contents_dictionary_tabs_main [id^=content]:last-of-type").css('left'));
      currentwidth = $('#contents_dictionary_tabs').width();
      $("#contents_dictionary_tabs_header #tab_plus").before("<span id='content"+tabs_count+"'>Tab"+tabs_count+"</span>");
      $("#contents_dictionary_tabs_main").append('<div id="content'+tabs_count+'" data-position="'+tabs_count*currentwidth+'" style="left: '+(before_css+currentwidth)+'px";>'+add_input_output+'</div>')
      tabs_count += 1;
    }
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
      $(this).attr('data-position', currentposition);
      $(this).attr('style', 'left: '+currentposition+'px;');
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
