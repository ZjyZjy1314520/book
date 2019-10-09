$(function () {
    //加载弹出层
    layui.use(['form','element'],
    function() {
        layer = layui.layer;
        element = layui.element;
    });

    //触发事件
  tab = {
      tabAdd: function (title, url, id) {
          //新增一个Tab项
          element.tabAdd('xbs_tab', {
            title: title 
            , content: '<iframe tab-id="' + id + '" name="' + id + '" id="frame_' + id + '" frameborder="0" src="' + url + '" scrolling="yes" class="x-iframe"></iframe>'
            , id: id
          })
          CustomRightClick(id);//绑定右键菜单     
       }
        , tabDelete: function (id) {//othis
            //删除指定Tab项
            element.tabDelete('xbs_tab', id); ////删除 lay-id="xxx" 的这一项           
          
          //othis.addClass('layui-btn-disabled');
      }
      , tabChange: function (id) {
          //切换到指定Tab项
          element.tabChange('xbs_tab', id); //切换到：用户管理
      }
      };


    //tableCheck = {
    //    init:function  () {
    //        $(".layui-form-checkbox").click(function(event) {
    //            if($(this).hasClass('layui-form-checked')){
    //                $(this).removeClass('layui-form-checked');
    //                if($(this).hasClass('header')){
    //                    $(".layui-form-checkbox").removeClass('layui-form-checked');
    //                }
    //            }else{
    //                $(this).addClass('layui-form-checked');
    //                if($(this).hasClass('header')){
    //                    $(".layui-form-checkbox").addClass('layui-form-checked');
    //                }
    //            }
                
    //        });
    //    },
    //    getData:function  () {
    //        var obj = $(".layui-form-checked").not('.header');
    //        var arr=[];
    //        obj.each(function(index, el) {
    //            arr.push(obj.eq(index).attr('data-id'));
    //        });
    //        return arr;
    //    }
    //}

    //开启表格多选
    //tableCheck.init();
      

    $('.container .left_open i').click(function(event) {
        if($('.left-nav').css('left')=='0px'){
            $('.left-nav').animate({left: '-221px'}, 100);
            $('.page-content').animate({left: '0px'}, 100);
            $('.page-content-bg').hide();
        }else{
            $('.left-nav').animate({left: '0px'}, 100);
            $('.page-content').animate({left: '221px'}, 100);
            if($(window).width()<768){
                $('.page-content-bg').show();
            }
        }

    });

    $('.page-content-bg').click(function(event) {
        $('.left-nav').animate({left: '-221px'}, 100);
        $('.page-content').animate({left: '0px'}, 100);
        $(this).hide();
    });

    $('.layui-tab-close').click(function(event) {
        $('.layui-tab-title li').eq(0).find('i').remove();
    });

    //左侧菜单效果
    // $('#content').bind("click",function(event){
    $('.left-nav #nav li').click(function (event) {

        if($(this).children('.sub-menu').length){
            if($(this).hasClass('open')){
                $(this).removeClass('open');
                $(this).find('.nav_right').html('&#xe697;');
                $(this).children('.sub-menu').stop().slideUp();
                $(this).siblings().children('.sub-menu').slideUp();
            }else{
                $(this).addClass('open');
                $(this).children('a').find('.nav_right').html('&#xe6a6;');
                $(this).children('.sub-menu').stop().slideDown();
                $(this).siblings().children('.sub-menu').stop().slideUp();
                $(this).siblings().find('.nav_right').html('&#xe697;');
                $(this).siblings().removeClass('open');
            }
        }else{

            var url = $(this).children('a').attr('_href');
            var title = $(this).find('cite').html();
            //var index = $('.left-nav #nav li').index($(this));
            var id = $(this).children('a').attr('_id');
            if (url == undefined) {
                return;
            }

            for (var i = 0; i <$('.x-iframe').length; i++) {
                if ($('.x-iframe').eq(i).attr('tab-id') == id) {
                    tab.tabChange(id);
                    event.stopPropagation();
                    return;
                }
            };
            
            tab.tabAdd(title, url, id);
            tab.tabChange(id);
        }
        
        event.stopPropagation();
         
    })

    //绑定右键菜单
    function CustomRightClick(id) {
        //取消右键  
        $('.layui-tab-title li').on('contextmenu', function () { return false; })
        $('.layui-tab-title,.layui-tab-title li').click(function () {
            $('#titleClickMenu').hide();
        });
        //桌面点击右击  
        $('.layui-tab-title li[lay-id='+id+']').on('contextmenu', function (e) {
            var popupmenu = $("#titleClickMenu");
            popupmenu.find("li").attr("data-id", id);
            l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
            t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
            popupmenu.css({ left: l, top: t }).show();
            //alert("右键菜单")
            return false;
        });
    }

    //邮件菜单点击操作
    $("#titleClickMenu li").click(function () {
        if ($(this).attr("data-type") == "closeOther") { //关闭其他
            var thisid = $(this).attr("data-id");
            var tabtitle = $(".layui-tab-title li");
            var ids = new Array();
            $.each(tabtitle, function (i) {
                if ($(this).attr("lay-id") != thisid && $(this).attr("lay-id") != 'welcome') {
                    tab.tabDelete($(this).attr("lay-id"));
                }
            })
        }
        else if ($(this).attr("data-type") == "closeAll") { //关闭全部
            var tabtitle = $(".layui-tab-title li");
            var ids = new Array();
            $.each(tabtitle, function (i) {
                //ids[i] = $(this).attr("lay-id");
                if ($(this).attr("lay-id") != 'welcome') {
                    tab.tabDelete($(this).attr("lay-id"));
                }
            })

        }
        else if ($(this).attr("data-type") == "refresh") { //刷新
            var thisid = $(this).attr("data-id");
            //document.getElementById('frame_' + thisid).contentWindow.location.reload(true);

            var oldsrc = $('#frame_' + thisid).attr('src');
            var newsrc = oldsrc;
            var timestamp = new Date().getTime();
            if (newsrc.indexOf('?') > 0) {

                newsrc = newsrc.replace(/\?t=\d*/, '?t=' + timestamp);

                newsrc = newsrc.replace(/&t=\d*/, '&t=' + timestamp);

                if (newsrc == oldsrc) {
                    newsrc = newsrc + '&t=' + timestamp;
                }
            }
            else {
                newsrc = newsrc + '?t=' + timestamp;
            }
            $('#frame_' + thisid).attr('src', newsrc);

        }
        else if ($(this).attr("data-type") == "closeThis") { //关闭当前
            var thisid = $(this).attr("data-id");
            tab.tabDelete(thisid);
        }

        $('#titleClickMenu').hide();
    })

    //鼠标抬起如果有右击菜单隐藏它
    document.onmousedown = function (event) {
        var menu = $("#titleClickMenu");
        if (menu.length > 0) {
            //console.log(111)
            var div = document.getElementById("titleClickMenu");
            var x=event.clientX;
            var y=event.clientY;
            var divx1 = div.offsetLeft;
            var divy1 = div.offsetTop;
            var divx2 = div.offsetLeft + div.offsetWidth;
            var divy2 = div.offsetTop + div.offsetHeight;
            if (x < divx1 || x > divx2 || y < divy1 || y > divy2) {
                menu.hide();
            }
        }
        else { //当前iframe没有 去父级找
            menu = $('#titleClickMenu', window.parent.document)
            if (menu.length > 0) {
                menu.hide();
            }
        }
    };
})

/*弹出层*/
/*
    参数解释：
    title   标题
    url     请求的url
    id      需要操作的数据id
    w       弹出层宽度（缺省调默认值）
    h       弹出层高度（缺省调默认值）
*/
function x_admin_show(title,url,w,h){
    if (title == null || title == '') {
        title=false;
    };
    if (url == null || url == '') {
        url="404.html";
    };
    if (w == null || w == '') {
        w=($(window).width()*0.9);
    };
    if (h == null || h == '') {
        h=($(window).height() - 50);
    };
    layer.open({
        type: 2,
        area: [w+'px', h +'px'],
        fix: false, //不固定
        maxmin: true,
        shadeClose: true,
        shade:0.4,
        title: title,
        content: url
    });
}

/*关闭弹出框口*/
function x_admin_close(){
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}


Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function formatNumToDate(value) {
    try {
        var date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
        return date.Format('yyyy-MM-dd')
    } catch (ex) {
        return "";
    }
}
//新增tab
function x_tab_add(title, url, id) {

    if(id=='' || id==undefined || id==null){
        id = $('.x-iframe', window.parent.document).length;
    }
    for (var i = 0; i < $('.x-iframe', window.parent.document).length; i++) {
        if ($('.x-iframe', window.parent.document).eq(i).attr('tab-id') == id) {
            parent.tab.tabChange(id);
            return;
        }
    };

    //console.log(id)
    //return;
    //console.log(parent.tab)
    parent.tab.tabAdd(title, url, id)
    parent.tab.tabChange(id);

   
}
//移除指定tab
function x_tab_delete(id) {

    if (id == '' || id == undefined || id == null) {
        //id = $('.x-iframe', window.parent.document).length;
    }
    
    parent.tab.tabDelete(id)
}
//销毁当前tab
function x_tab_destroy() {
    var id = window.frameElement.getAttribute("tab-id");
    if (id == '' || id == undefined || id == null) {
        //id = $('.x-iframe', window.parent.document).length;
    }

    parent.tab.tabDelete(id)
}

//tab是否存在
function x_tab_exsit(id) {
    if (id == '' || id == undefined || id == null) {
        return false;
    }
    for (var i = 0; i < $('.x-iframe', window.parent.document).length; i++) {
        if ($('.x-iframe', window.parent.document).eq(i).attr('tab-id') == id) {            
            return true;
        }
    };
    return false;
}

//刷新tab
function x_tab_reload(id) {

    if (id == '' || id == undefined || id == null) {
        return;
    }
    for (var i = 0; i < $('.x-iframe', window.parent.document).length; i++) {
        if ($('.x-iframe', window.parent.document).eq(i).attr('tab-id') == id) {
            //parent.document.getElementById('frame_' + id).contentWindow.location.reload(true);
            var oldsrc = $('#frame_' + id, window.parent.document).attr('src');
            var newsrc = oldsrc;
            var timestamp=new Date().getTime();
            if (newsrc.indexOf('?') > 0) {

                newsrc = newsrc.replace(/\?t=\d*/, '?t=' + timestamp);

                newsrc = newsrc.replace(/&t=\d*/, '&t=' + timestamp);

                if (newsrc == oldsrc) {
                    newsrc = newsrc + '&t=' + timestamp;
                }
            }
            else {
                newsrc = newsrc + '?t=' + timestamp;
            }
            $('#frame_' + id, window.parent.document).attr('src', newsrc);
            parent.tab.tabChange(id);
            return;
        }
    };

}
//获取当前tabid
function x_tabid() {
    var id = window.frameElement.getAttribute("tab-id");
    return id;
}

//初始化带_href的a标签
function init_tab_add() {
    //console.log(($("a[_href]").length))
    $("a[_href]").click(function () {
        var obj=$(this);
        var _title = obj.attr('_title');

        if (_title == undefined || _title == '') {
            return false;
        }
        var _id = obj.attr('_id');
        if (_id == undefined || _id == '') {
            return false;
        }
        var _href = obj.attr('_href');
        if (_href == undefined || _href == '') {
            return false;
        }
        x_tab_add(_title, _href, _id);
        return false;
    })
}
