

var view = {
    _baseEvent: function() {
        $('.pure-menu-list').delegate('li', 'click', function (event) {
            $('.pure-menu-selected').removeClass('pure-menu-selected');
            $(this).addClass('pure-menu-selected');
        });
        $('.fnExample').delegate('button', 'click', function (event) {
            var $this = $(this);
            var run = $this.data('run');
            var runIndex = $this.data('runindex');
            var showType = $("." + run + 'showType').eq(runIndex).val();
            //var runCode = $("." + run + 'Run').eq(runIndex).val();
            var runCode = $this.parents('.fnExample').find('.runcode').val();
            if (runCode.indexOf('commonCountDown') >= 0) {
                view._clean();
            }
            if ($this.hasClass('runcodebtn')) {
                if (showType === 'custom') {
                    eval(runCode);
                } else if (showType === undefined) {
                    alert(eval(runCode));
                } else {
                    $this.parent().find('.showType').remove();
                    var runResult = eval($("." + run + 'Run').eq(runIndex).val());
                    if (funnyFunction.isObjectType("Object", runResult)) {
                        var obj = funnyFunction.convertObjectToString(runResult);
                        obj = obj.replace(/\,/ig, ',\r\n').replace(/\{/ig, '\{\r\n').replace(/\}\w?/ig, '\r\n\}');
                        $this.before('<div class="showType"><pre><code class="javascript hljs">' + obj + '</code></pre></div>');
                        //$this.fin
                    }
                }
            } else if ($this.hasClass('viewcodebtn')) {
                var regex = /funnyFunction.\w+/ig;
                var fnname = runCode.match(regex)[0].replace('funnyFunction.','');
                window.viewcode = fnname;
                var options = {
                    type: 2,
                    title: '显示代码',
                    shadeClose: true,
                    shade: 0.3,
                    skin: 'layui-layer-rim', //加上边框
                    area: ['900px', '600px'],
                    content: 'view.html'
                }
                layer.open(options);
                $this.blur();
            }
            return false;
        });

        $("#fnCount span").text($('.pure-menu-item').length);

        $('textarea').each(function() {
            $(this).css('height', 'auto');
        });
    },
    _bindEvents: function () {
        view._baseEvent();
    },
    /* 清理 */
    _clean: function() {
        if (typeof funnyCountDown != "undefined") {
            clearTimeout(funnyCountDown);
        }
    },
    struc: function () {
        $(document).ready(function () {
            view._bindEvents();
        });
    }
}
view.struc();