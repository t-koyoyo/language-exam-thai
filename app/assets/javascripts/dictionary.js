/**
 * dictionary.js
 * 辞書
 * 
 */
$(function(){
  /**
   * タブ処理
   * 入力エリアボタン処理
   * 音声入力、音声再生、入力文字コピー
   */
  // 音声入力
  $(document).on("click", "#contents_dictionary_tabs_main .left_input_select_button[uk-icon=microphone]", function(){
    tab_count = $(this).attr("alt");
    tab_select_language = $("#contents_dictionary_tabs_main .left_input select[alt="+tab_count+"]").val();
    languages = {
      "japanese": "ja-JP",
      "thai": "th-TH",
      "english": "en-US",
      "italian": "it-IT",
      "chinese": "zh",
      "french": "fr-FR",
      "german": "de-DE",
      "spanish": "es-ES",
      "korean": "ko-KR",
      "russian": "ru-RU",
      "indonesian": "id-ID",
      "arabic": "ar-AE",
      "greek": "el-GR"
    }
    var recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) {
      if (event.results.length > 0) {
        $("#contents_dictionary_tabs_main .left_input textarea[alt="+tab_count+"]").val(event.results[0][0].transcript);
        translation($("#contents_dictionary_tabs_main .left_input textarea[alt="+tab_count+"]"));
      }
    }
    recognition.lang = languages[tab_select_language];
    recognition.start();
  })
  // 音声再生
  dictionary_input_audio = [];
  $(document).on("click", "#contents_dictionary_tabs_main .left_input_select_button[uk-icon=play-circle]", function(){
    tab_count = $(this).attr("alt");
    dictionary_input_audio[tab_count].play();
  })
  // 入力文字コピー
  $(document).on("click", "#contents_dictionary_tabs_main .left_input_select_button[uk-icon=copy]", function(){
    tab_count = $(this).attr("alt");
    var clipboard = $('<textarea></textarea>');
    clipboard.val($('#contents_dictionary_tabs_main .left_input textarea[alt='+tab_count+']').val());
    $(this).append(clipboard);
    clipboard.select();
    document.execCommand('copy');
    clipboard.remove();
  })

  /**
   * タブ処理
   * 出力エリアボタン処理
   * 音声再生、出力文字コピー
   */
  // 音声再生
  dictionary_output_audio = [];
  $(document).on("click", "#contents_dictionary_tabs_main .left_output_select_button[uk-icon=play-circle]", function(){
    tab_count = $(this).attr("alt");
    dictionary_output_audio[tab_count].play();
  })
  // 入力文字コピー
  $(document).on("click", "#contents_dictionary_tabs_main .left_output_select_button[uk-icon=copy]", function(){
    tab_count = $(this).attr("alt");
    var clipboard = $('<textarea></textarea>');
    clipboard.val($('#contents_dictionary_tabs_main .left_output textarea[alt='+tab_count+']').val());
    $(this).append(clipboard);
    clipboard.select();
    document.execCommand('copy');
    clipboard.remove();
  })

  /**
   * タブ処理
   * 入力・出力エリア処理
   */
  dictionary_input_language = "japanese"   // デフォルト入力言語
  dictionary_output_language = "thai"      // デフォルト出力言語
  // デフォルトセレクトボックス
  $("#contents_dictionary_tabs_main .left_input select option[value="+dictionary_input_language+"]").attr("selected", true)
  $("#contents_dictionary_tabs_main .left_output select option[value="+dictionary_output_language+"]").attr("selected", true)
  // 翻訳リクエスト
  $(document).on("keyup", "#contents_dictionary_tabs_main .left_input textarea", function(){
    translation($(this));
  });
  // 翻訳メソッド
  function translation(self){
    tab_count = self.attr("alt");
    input_text = self.val();
    input_language = $("#contents_dictionary_tabs_main .left_input select[alt="+tab_count+"]").val()
    output_language = $("#contents_dictionary_tabs_main .left_output select[alt="+tab_count+"]").val()
    $("#contents_dictionary_tabs_main .left_output textarea[alt="+tab_count+"]").val("");
    if (input_text != "") {
      $.ajax({
        url: "/asynchronous/",
        type: "GET",
        data: {
            type  : "dictionary",
            input_text : input_text,
            input_language: input_language
        },
      })
      .done(function(data){
          console.log("通信成功")
          console.log(data)
          if (data.length == 1) {
            $("#contents_dictionary_tabs_main .left_output textarea[alt="+tab_count+"]").val(data[0][output_language+"_text"]);
            dictionary_input_audio[tab_count].src = data[0][input_language+"_voice"];
            dictionary_output_audio[tab_count].src = data[0][output_language+"_voice"];
          } else {
            transrate_words = ""
            $.each(data, function(index, value){
              transrate_words += value[output_language+"_text"]+"\n\n"
            })
            $("#contents_dictionary_tabs_main .left_output textarea[alt="+tab_count+"]").val(transrate_words);
            dictionary_input_audio[tab_count].src = "";
            dictionary_output_audio[tab_count].src = "";
          }
      })
      .fail(function(){
          console.log("通信失敗")
      })
    }
  }

  /**
   * タブ処理
   * デフォルトタブ追加
   * タブ追加ボタン処理
   */
  tabs_count = 3;  // デフォルトタブ数
  if (gon.user==null) {
    tabs_max = 5;          // マックスタブ数
  } else {
    tabs_max = Infinity;   // マックスタブ数
  }
  // タブ内容
  function tab_content(count){
    add_input_select = ""    // 入力言語セレクトボックス内容
    add_output_select = ""   // 出力言語セレクトボックス内容
    $.each( gon.dictionary_languages_select, function( key, value ) {
      if (key==dictionary_input_language) {
        add_input_select += '<option value="'+key+'" selected>'+value+'</option>'
      } else{
        add_input_select += '<option value="'+key+'">'+value+'</option>'
      } 
      if (key==dictionary_output_language) {
        add_output_select += '<option value="'+key+'" selected>'+value+'</option>'
      } else {
        add_output_select += '<option value="'+key+'">'+value+'</option>'
      }
    });
    add_input_output = 
        '<div class="left">'+
          '<div class="left_input">'+
            '<div class="left_input_select">'+
              '<div uk-form-custom="target: > * > span:last-child">'+
                '<select alt="'+count+'">'+add_input_select+'</select>'+
                '<span class="uk-link">'+
                  '<span uk-icon="icon: settings"></span>'+
                  '<span></span>'+
                '</span>'+
              '</div>'+
              '<span class="left_input_select_button uk-icon-button" uk-icon="copy" alt="'+count+'"></span>'+
              '<span class="left_input_select_button uk-icon-button" uk-icon="play-circle" alt="'+count+'"></span>'+
              '<span class="left_input_select_button uk-icon-button" uk-icon="microphone" alt="'+count+'"></span>'+
            '</div>'+
            '<textarea class="uk-textarea" rows="8" placeholder="入力欄" alt="'+count+'"></textarea>'+
          '</div>'+
          '<p class="left_icon"><span uk-icon="icon: chevron-double-left; ratio: 3.5"></span></p>'+
          '<div class="left_output">'+
            '<div class="left_output_select">'+
              '<div uk-form-custom="target: > * > span:last-child">'+
                '<select alt="'+count+'">'+add_output_select+'</select>'+
                '<span class="uk-link">'+
                  '<span uk-icon="icon: settings"></span>'+
                  '<span></span>'+
                '</span>'+
              '</div>'+
              '<span class="left_output_select_button uk-icon-button" uk-icon="copy" alt="'+count+'"></span>'+
              '<span class="left_output_select_button uk-icon-button" uk-icon="play-circle" alt="'+count+'"></span>'+
            '</div>'+
            '<textarea class="uk-textarea" rows="8" placeholder="出力欄(入力不可)" alt="'+count+'" disabled></textarea>'+
          '</div>'+
        '</div>'
    return add_input_output
  }
  

  // デフォルト
  for (var count=0; count<tabs_count; count++) {
    add_input_output = tab_content(count)
    $("#contents_dictionary_tabs_header #tab_plus").before("<span id='content"+count+"'>Tab"+count+"</span>");
    $("#contents_dictionary_tabs_main").append("<div id='content"+count+"'>"+add_input_output+"</div>");
    dictionary_input_audio.push(new Audio());
    dictionary_output_audio.push(new Audio());
  }
  // タブ追加
  $(document).on("click", "#contents_dictionary_tabs_header #tab_plus", function(){
    if (tabs_count==tabs_max) {
      Swal.fire({
        icon: 'warning',
        title: 'タブの追加上限に達しました',
        text: 'ユーザーログインする事で、無制限に開放可能！',
      })
    } else {
      dictionary_input_audio.push(new Audio());
      dictionary_output_audio.push(new Audio());
      add_input_output = tab_content(tabs_count)
      before_css = parseInt($("#contents_dictionary_tabs_main [id^=content]:last-of-type").css('left'));
      currentwidth = $('#contents_dictionary_tabs').width();
      $("#contents_dictionary_tabs_header #tab_plus").before("<span id='content"+tabs_count+"'>Tab"+tabs_count+"</span>");
      $("#contents_dictionary_tabs_main").append('<div id="content'+tabs_count+'" data-position="'+tabs_count*currentwidth+'" style="left: '+(before_css+currentwidth)+'px;">'+add_input_output+'</div>')
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
