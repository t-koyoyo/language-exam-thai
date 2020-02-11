$(function(){
    // ヘッダー試験言語プルダウン表示
    $('.dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    });
    $('.dropdown-menu li').click(function () {
    var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
      msg = '<span class="msg">Hidden input value: ';
    $('.msg').html(msg + input + '</span>');
    });
    
    // 出題設定「ON/OFF」トグル
    toggle = ['input[type="checkbox"]#grade','input[type="checkbox"]#year','input[type="checkbox"]#field','input[type="checkbox"]#option']
    $(toggle[0]+","+toggle[1]+","+toggle[2]+","+toggle[3]).change(function() {
        toggle_id = this.id
        if ($(this).is(':checked')) {
            //全てオフにする
            $('#practice_left_setting_'+toggle_id+' input[name="'+toggle_id+'"]').prop('checked', true);
        } else {
            //全てオフにする
            $('#practice_left_setting_'+toggle_id+' input[name="'+toggle_id+'"]').prop('checked', false);
        }
    });

    // 出題設定リスト表示・非表示
    $("#practice_left_setting_list").on("click",function(){
        $("#practice_left_setting_list_popup").fadeIn(500);
        $("#popup_cover").fadeIn(500);
    })
    $("#popup_cover").on("click",function(){
        $("#practice_left_setting_list_popup").fadeOut(500);
        $("#popup_cover").fadeOut(500);
    })
    // 出題設定編集
    $(".choice_lists_right_edit").on("click",function(){
        list_number = $(this).attr("alt").match(/[0-9]/)
        $("#practice_left_setting_list_popup dd").eq(list_number).find(".choice_lists_left_set input").attr("disabled", false);
        $(this).hide();
        $(".choice_lists_right_save").eq(list_number).css("display", "flex");
    })
    // 出題設定保存
    $(".choice_lists_right_save").on("click",function(){
        list_number = $(this).attr("alt").match(/[0-9]/)
        $("#practice_left_setting_list_popup dd").eq(list_number).find(".choice_lists_left_set input").attr("disabled", true);
        $(this).hide();
        $(".choice_lists_right_edit").eq(list_number).show();
    })

    // キーボード表示
    $("#practice_left_answer_input #keybord_open").on("click",function(){
        // alert($('#practice_left_answer_input_keybord').css('height'))
        if ($('#practice_left_answer_input_keybord').css('height')== "0px") {
            $("#practice_left_answer_input_keybord").css("height","170px");
        } else {
            $("#practice_left_answer_input_keybord").css("height","0");
        }
    });
    // キーボード入力[追加]
    $("#practice_left_answer_input_keybord span").on("click",function(){
        input_val = $("#practice_left_answer_input input").val()
        // alert($("#practice_left_answer_input input").val())
        // $("#practice_left_answer_input input").attr("value",input_val+$(this).text())
        $("#practice_left_answer_input input").val(input_val+$(this).text())
    })
    // キーボード入力[削除]
    $("#practice_left_answer_input_keybord_delete").on("click",function(){
        input_val = $("#practice_left_answer_input input").val().slice( 0, -1 )
        $("#practice_left_answer_input input").val(input_val)
    })

    // おすすめサイト・動画詳細検索部分表示
    $("#contents_recommend_search_main_ather i").on("click",function(){
        if ($(this).attr("alt") == "open") {
            // 表示処理
            $("#contents_recommend_search_sub").css("height","105px");
            $(this).hide();
            $("#contents_recommend_search_main_ather .close").show();
        } else {
            // 非表示処理
            $("#contents_recommend_search_sub").css("height","0");
            $(this).hide();
            $("#contents_recommend_search_main_ather .open").show();
        }
    })
    // おすすめサイト・動画検索ラベル追加
    $("#contents_recommend_search_sub_add button").on("click",function(){
        label_name = $("#contents_recommend_search_sub_label input").val();
        add_html = '<div class="chip">'+label_name+'<i class="close material-icons">×</i></div>'
        $("#contents_recommend_search_main_words dd").append(add_html);
    })
    // おすすめサイト・動画表示方法変更
    $("#contents_recommend_order p").on("click",function(){
        want_to_way = $(this).attr("alt")
        $("#contents_recommend_order .current").attr("class","no-current");
        $(this).attr("class","current");
        if (want_to_way == "block") {
            $("#contents_recommend_main_"+"list").hide();
            $("#contents_recommend_main_"+"block").show();
        } else {
            $("#contents_recommend_main_"+"block").hide();
            $("#contents_recommend_main_"+"list").show();
        }
    })
})
