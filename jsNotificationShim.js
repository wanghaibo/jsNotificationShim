//出现多个需要同时notify时，使用for循环火狐只会弹出一个，只能使用递归调用通过Onshow回调实现
function alertTipWindow(newsList) {
    var notify  = function(i) {
        var title   = newsList[i].title;
        var n   = new Notification(title, {
            body:'来源:'+newsList[i].mediaName
        });
        n.onclick   = function() {
            window.open(newsList[i].originUrl);
        }
        var j = i-1;
        n.onshow    = function() {
            var me  = this;
            setTimeout(function() {
                me.close();
            }, 5000);
            if (j >= 0) {
                notify(j);
            }
        }
    }
    if (newsList.length) {
        notify(newsList.length-1);
    }
}
alertTipWindow([{"title":"ccc","originUrl":"http://0033.com","mediaName":"日本","snatchTime":1398263649},{"title":"aaa","originUrl":"http://www.baidu.com","mediaName":"中国","snatchTime":1398263649},{"title":"bbb","originUrl":"http://www.google.com","mediaName":"美国","snatchTime":1398263649,"alertDisplay":1}]);
