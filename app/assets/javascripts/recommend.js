/**
 * recommend.js
 * おすすめサイト・動画
 * 
 */
$(function(){
  /**
   * 検索欄
   * 詳細検索部分表示
   */
  $("#contents_recommend_search_main_ather i").on("click",function(){
    if ($(this).attr("alt") == "open") {
        // 表示処理
        $("#contents_recommend_search_sub").css("height","85px");
        $(this).hide();
        $("#contents_recommend_search_main_ather .close").show();
    } else {
        // 非表示処理
        $("#contents_recommend_search_sub").css("height","0");
        $(this).hide();
        $("#contents_recommend_search_main_ather .open").show();
    }
  })
  /**
   * 検索欄
   * 詳細検索
   * ラベル追加・削除
   */
  current_label = []
  // 追加
  $("#contents_recommend_search_sub_add span").on("click",function(){
      input_name = $("#contents_recommend_search_sub_label input").val();
      label_number = gon.label_name.indexOf(input_name)
      if (current_label.indexOf(input_name) > -1) {
          $("#contents_recommend_search_sub_label #error_message").text("ラベルが既に追加されています!!");
      } else if (label_number == -1) {
          $("#contents_recommend_search_sub_label #error_message").text("ラベルが存在しません!!");
      } else {
          $("#contents_recommend_search_sub_label #error_message").text("");
          add_html = '<div class="chip" alt="label_'+input_name+'">'+input_name+'<i class="close material-icons" alt="label_'+input_name+'">×</i></div>';
          $("#contents_recommend_search_main_words dd").append(add_html);
          $("[alt=label_"+input_name+"]").css("color", gon.label_font_color[label_number])
          $("[alt=label_"+input_name+"]").css("background-color", gon.label_background_color[label_number])
          $("#contents_recommend_search_sub_label input").val("");
          current_label.push(input_name)
      }
  })
  // 削除
  $(document).on("click", "i[alt^=label_]", function(){
      label_number = current_label.indexOf($(this).attr("alt").replace("label_",""))
      current_label.splice(label_number, 1);
  })
  /**
   * 検索結果欄
   * 表示方法変更
   */
  $("#contents_recommend_option_order p").on("click",function(){
    want_to_way = $(this).attr("alt")
    $("#contents_recommend_option_order .current").attr("class","no-current");
    $(this).attr("class","current");
    if (want_to_way == "block") {
        $("#contents_recommend_main_"+"list").hide();
        $("#contents_recommend_main_"+"block").show();
    } else {
        $("#contents_recommend_main_"+"block").hide();
        $("#contents_recommend_main_"+"list").show();
    }
  })
  /**
   * 検索結果欄
   * クリック数非同期追加
   */
  $("a#label_link").on("click", function(e){
    recommend_id = $(this).attr("alt");
    $.ajax({
        url: "/asynchronous/",
        type: "GET",
        data: {
            type:"recommend_click",
            recommend_id:recommend_id
        },
    })
    .done(function(data){
        console.log("通信成功")
    })
    .fail(function(){
        console.log("通信失敗")
    })
  })
  /**
   * 検索欄
   * 検索結果欄
   * 検索条件・検索結果更新
   */
  $(document).on("click", "nav div span#pagenation, #contents_recommend_search_main_words i", function(){
    page_count = $(this).attr("value")
    search_name = $("#contents_recommend_search_main_words input").val()
    search_label = current_label
    search_type = $("#contents_recommend_search_sub_type select").val()
    $.ajax({
        url: "/recommend",
        type: "POST",
        data: {
            page : page_count,
            type : search_type,
            title: search_name,
            label: search_label
        }
    })
    .done(function(data){
        console.log("通信成功")
        $("#contents_recommend_option_order [alt=list]").attr("class", "current");
        $("#contents_recommend_option_order [alt=block]").attr("class", "no-current");
    })
    .fail(function(){
        console.log("通信失敗")
    })
  })
})