/**
 * Created by yangshu on 2015/4/9.
 */

var complaintsDom = '<div class="csdn_complaints"><link rel="stylesheet" href="/assets/css/complaints.css"><input id="complaints_type" type="hidden"><i class="fa fa-remove complaints_cancel"></i><h3></h3><div class="alert hide"></div><textarea class="form-control" placeholder="投诉内容"></textarea><div class="text-right"><span class="btn btn-success complaints_post">坚决投诉</span> <span class="btn btn-primary complaints_cancel">下回再说</span></div> </div>';


/**
 * 例如举报文章： <a onclick="report('news', <?php echo $forum->id;?>, '<?php echo $forum->username;?>', 22, 'http://geek.csdn.net/forum/news/22', 'fuckfuck');" class="btn btn-danger">举报</a>
 * type，举报的类型，news为文章，comments为评论
 * forum_id，举报的主题的ID
 * username，被举报人username
 * item_id，举报对象ID，例如文章ID
 * item_url，举报对象url
 * item_content，举报对象内容
 * reason，用户举报时填写的举报原因
 *
 */

var forum_id, username, item_id, item_url, item_content;
function report(d_type, c_username, c_item_id){
    forum_id = $(".right_cont .footer_bar .forum_name").attr('forumid');
    username = c_username;
    item_id = c_item_id;
    item_url = document.location.href;
    if(d_type == "comments"){
        item_content = $(".rcont_"+ c_item_id).eq(0).text();
    }else if(d_type == "news"){
        item_content = $(".right_cont .header dd h2").eq(0).text();
    };

    $('.csdn_complaints').remove();
    $('body').append(complaintsDom);
    $('.csdn_complaints h3').text(item_content);
    $('.csdn_complaints').addClass('open');

    $('#complaints_type').val(d_type);
};

$(function(){


    $('body').delegate('.complaints_post', 'click',function(){
        var reason = $('.csdn_complaints textarea').val();
        var type =$('#complaints_type').val();

        var report_data = {type: type, forum_id:forum_id, username: username, item_id: item_id, item_url: item_url, item_content: item_content, reason: reason};
        $.post('/forum/' + forum_id + '/reported', report_data, function(result){
            if (result.status){
                $('.csdn_complaints .alert').text('您的投诉信息已提交，我们会尽快核实处理，谢谢。').addClass('alert-success').removeClass('hide');
                $('.csdn_complaints textarea,.csdn_complaints .complaints_post').hide();
                $('.csdn_complaints .btn.complaints_cancel').text('关闭');
            } else{
                $('.csdn_complaints .alert').text(result.error).addClass('alert-danger').removeClass('hide');
            }
        });
    });


    $('body').delegate('.complaints_cancel', 'click',function(){
        $('.csdn_complaints').remove();
    });
});
