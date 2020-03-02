/**
 * question.js
 * 過去問道場
 * 
 */
$(function(){
  /**
   * 出題設定
   * 「ON/OFF」トグル
   * [全てオフ:全てオン]
   * ※効かない
   */
  toggle = ['input[type="checkbox"]#grade','input[type="checkbox"]#year','input[type="checkbox"]#field','input[type="checkbox"]#option']
  $(toggle[0]+","+toggle[1]+","+toggle[2]+","+toggle[3]).change(function() {
      toggle_id = this.id
      if ($(this).is(':checked')) {
        $('#practice_left_setting_'+toggle_id+' input[alt="'+toggle_id+'"]').prop('checked', true);
      } else {
        $('#practice_left_setting_'+toggle_id+' input[alt="'+toggle_id+'"]').prop('checked', false);
      }
  });
  /**
   * 出題設定
   * 出題設定リスト表示・非表示
   */
  $("#practice_left_setting_list").on("click",function(){
    $("#practice_left_setting_list_popup").fadeIn(500);
    $("#popup_cover").fadeIn(500);
  })
  $("#popup_cover").on("click",function(){
    $("#practice_left_setting_list_popup").fadeOut(500);
    $("#popup_cover").fadeOut(500);
  })
  /**
   * 出題設定
   * 出題設定リスト編集
   * 可否変更
   */
  $(".choice_lists_right_edit").on("click",function(){
    list_number = $(this).attr("alt").match(/[0-9]/)
    $("#practice_left_setting_list_popup dd").eq(list_number).find(".choice_lists_left_set input").attr("disabled", false);
    $(this).hide();
    $(".choice_lists_right_save").eq(list_number).css("display", "flex");
  })
  /**
   * 出題設定
   * 出題設定リスト保存
   */
  $(".choice_lists_right_save").on("click",function(){
    list_number = $(this).attr("alt").match(/[0-9]/)
    $("#practice_left_setting_list_popup dd").eq(list_number).find(".choice_lists_left_set input").attr("disabled", true);
    $(this).hide();
    $(".choice_lists_right_edit").eq(list_number).show();
  })
  /**
   * 問題解答
   * キーボード表示
   */
  $("#practice_left_answer_input #keybord_open").on("click",function(){
    if ($('#practice_left_answer_input_keybord').css('height')== "0px") {
        $("#practice_left_answer_input_keybord").css("height","170px");
    } else {
        $("#practice_left_answer_input_keybord").css("height","0");
    }
  });
  /**
   * 問題解答
   * キーボード入力[追加]
   */
  $("#practice_left_answer_input_keybord span").on("click",function(){
    input_val = $("#practice_left_answer_input input").val()
    $("#practice_left_answer_input input").val(input_val+$(this).text())
  })
  /**
   * 問題解答
   * キーボード入力[削除]
   */
  $("#practice_left_answer_input_keybord_delete").on("click",function(){
    input_val = $("#practice_left_answer_input input").val().slice( 0, -1 )
    $("#practice_left_answer_input input").val(input_val)
  })
  /**
   * 出題設定
   * 問題解答
   * ユーザー登録
   */
  $("#practice_right_user_chart_sign_up").on("click", function(){
    Swal.fire({
        title: 'ユーザー登録',
        html:
            '<p style="text-align:left;margin:0;">ユーザーID</p>' +
            '<input id="swal-input1" class="swal2-input" style="margin:0.5em auto;" type="text">' +
            '<p style="text-align:left;margin:0;">ユーザーパスワード</p>' +
            '<input id="swal-input2" class="swal2-input" style="margin:0.5em auto;" type="password">',
        showCloseButton: true,
        focusConfirm: false,
    }).then((result) => {
        user_id = document.getElementById('swal-input1').value
        user_password = document.getElementById('swal-input2').value
        is_modal_countine = result.value ? true : false;

        if (is_modal_countine) {
            $.ajax({
                url: "/users",
                type: "POST",
                data: {
                    asynchronous: true,
                    user: {
                        "user_id" : user_id,
                        "password" : user_password,
                        "password_confirmation": user_password,
                    },
                    commit: "Sign up"
                }
            })
            .done(function(data){
                console.log("通信成功")
                switch (data["status"]) {
                    case "success":
                        Swal.fire({
                            icon: 'success',
                            title: '登録成功',
                            text: 'ユーザー登録に成功しました!',
                        }).then(() => {
                            location.reload();
                        })
                        break;
                    case "already":
                        Swal.fire({
                            icon: 'error',
                            title: '登録失敗',
                            text: 'ユーザーIDが存在します!',
                        })
                        break;
                    case "error":
                        Swal.fire({
                            icon: 'error',
                            title: '登録失敗',
                            text: 'ユーザー登録に失敗しました!',
                        })
                        break;
                    default:
                        break;
                }
            })
            .fail(function(){
                console.log("通信失敗")
            })
        }
    })
  })
  /**
   * 出題設定
   * 問題解答
   * ユーザーログイン
   * [通常ユーザー画面:管理ユーザー画面]
   */
  $("#practice_right_user_chart_sign_in").on("click", function(){
    Swal.fire({
        title: 'ユーザーログイン',
        html:
            '<p style="text-align:left;margin:0;">ログインID</p>' +
            '<input id="swal-input1" class="swal2-input" style="margin:0.5em auto;" type="text">' +
            '<p style="text-align:left;margin:0;">ログインパスワード</p>' +
            '<input type="password" id="swal-input2" class="swal2-input" style="margin:0.5em auto;">',
        showCloseButton: true,
        focusConfirm: false,
    }).then((result) => {
        user_id = document.getElementById('swal-input1').value
        user_password = document.getElementById('swal-input2').value
        user_lank = 0  //[0:通常ユーザ, 1:管理ユーザー]
        is_modal_countine = result.value ? true : false;
        if (is_modal_countine) {
            $.ajax({
                url: "/users/sign_in",
                type: "POST",
                data: {
                    asynchronous: true,
                    user: {
                        "user_id" : user_id,
                        "password" : user_password,
                        "remember_me": "0",
                        "commit": "Log in"
                    }
                }
            })
            .done(function(data){
                console.log("通信成功")
                console.log(data)
                switch (data["status"]) {
                    case "success":
                        if (data["admin"] == 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'ログイン成功',
                                text: 'ユーザーログインに成功しました!',
                            }).then(() => {
                                location.reload();
                            })
                        } else if (data["admin"] == 1) {
                            Swal.fire({
                                title: '遷移画面選択',
                                text: "遷移先画面の選択を行ってください!!",
                                icon: 'question',
                                showCloseButton: true,
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                cancelButtonText: '管理ユーザー画面',
                                confirmButtonText: '通常ユーザー画面'
                            }).then((result) => {
                                if (result.value) {
                                    Swal.fire(
                                        '完了',
                                        '通常ユーザー画面にログインしました!',
                                        'success'
                                    ).then(() => {
                                        window.location.href = "http://localhost:3000/question";
                                    })
                                } else if (result.dismiss == "cancel") {
                                    Swal.fire(
                                        '完了',
                                        '管理ユーザー画面にログインしました!',
                                        'success'
                                    ).then(() => {
                                        window.location.href = "http://localhost:3000/admin";
                                    })
                                }
                            })
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'ログイン成功',
                                text: 'ユーザーログインに成功しました!',
                            }).then(() => {
                                location.reload();
                            })
                        }
                        break;
                    case "error":
                        Swal.fire({
                            icon: 'error',
                            title: 'ログイン失敗',
                            text: 'ログインIDが存在しません!',
                        })
                        break;
                    default:
                        break;
                }
            })
            .fail(function(){
                console.log("通信失敗")
                Swal.fire({
                    icon: 'error',
                    title: 'ログイン失敗',
                    text: 'ログインパスワードが間違っています!',
                })
            })
        }
    })
  })
  /**
   * 出題設定サイドバー
   * 問題解答サイドバー 
   * 辞書
   * 音声再生
   */
  var audio;
  audio = new Audio();
  $("#practice_right_dictionary_listen").on("click", function(){
    audio.play();
  })
  /**
   * 出題設定サイドバー 
   * 問題解答サイドバー 
   * 辞書
   * 入力文字→翻訳文字
   */
  $("#practice_right_dictionary_input input").keyup(function() {
    input_text = $(this).val();
    input_language = $(this).attr("alt")
    output_language = $("#practice_right_dictionary_output input").attr("alt")
    console.log(input_text)
    console.log(input_language)
    $("#practice_right_dictionary_output input").val("");
    $("#practice_right_dictionary_candidate tbody").empty();
    audio.src = "";
    if (input_text != "") {
      $.ajax({
        url: "/asynchronous/",
        type: "GET",
        data: {
            type  : "dictionary_"+input_language,
            input : input_text
        },
      })
      .done(function(data){
          console.log("通信成功")
          console.log(data)
          if (data.length == 1) {
            $("#practice_right_dictionary_output input").val(data[0][output_language+"_text"]);
            audio.src = data[0].thai_voice;
          } else {
            $.each(data, function(index, value){
                $("#practice_right_dictionary_candidate tbody").append('<tr><td alt="'+value.thai_voice+'">'+value[output_language+"_text"]+'</td></tr>');
            })
          }
      })
      .fail(function(){
          console.log("通信失敗")
      })
    }
  });
  /**
   * 出題設定サイドバー 
   * 問題解答サイドバー 
   * 辞書
   * 翻訳文字候補押下処理
   */
  $(document).on("click", "#practice_right_dictionary_candidate tbody td", function(){
    $("#practice_right_dictionary_output input").val($(this).text());
    audio.src = $(this).attr("alt");
    $("#practice_right_dictionary_candidate tbody").empty();
  })
  /**
   * 出題設定サイドバー 
   * 問題解答サイドバー 
   * 辞書
   * 入力文字/翻訳文字入れ替え
   */
    $("#practice_right_dictionary_change").on("click", function(){
        $("#practice_right_dictionary_candidate tbody").empty();
        input_placeholder = $("#practice_right_dictionary_input input").attr("placeholder")
        input_alt = $("#practice_right_dictionary_input input").attr("alt")
        output_placeholder = $("#practice_right_dictionary_output input").attr("placeholder")
        output_alt = $("#practice_right_dictionary_output input").attr("alt")
        input_placeholder = [output_placeholder, output_placeholder = input_placeholder][0];
        input_alt = [output_alt, output_alt = input_alt][0];
        $("#practice_right_dictionary_input input").attr("placeholder", input_placeholder)
        $("#practice_right_dictionary_input input").attr("alt", input_alt)
        $("#practice_right_dictionary_input input").val("");
        $("#practice_right_dictionary_output input").attr("placeholder", output_placeholder)
        $("#practice_right_dictionary_output input").attr("alt", output_alt)
        $("#practice_right_dictionary_output input").val("");
    }) 
  
})