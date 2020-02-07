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
})
