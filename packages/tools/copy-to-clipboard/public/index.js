
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    var deselectCurrent = function () {
        var selection = document.getSelection();
        // 当前没有选中
        if (selection.rangeCount === 0) {
            return function () {
            };
        }
        var $active = document.activeElement;
        // 获取当前选中的 ranges
        var ranges = [];
        for (var i = 0; i < selection.rangeCount; i++) {
            ranges.push(selection.getRangeAt(i));
        }
        // 如果为输入元素先 blur 再 focus
        switch ($active.tagName.toUpperCase()) {
            case 'INPUT':
            case 'TEXTAREA':
                $active.blur();
                break;
            default:
                $active = null;
        }
        // deselect
        selection.removeAllRanges();
        return function () {
            // 如果是插入符则移除 ranges
            if (selection.type === 'Caret') {
                selection.removeAllRanges();
            }
            // 没有选中，就把之前的 ranges 加回来
            if (selection.rangeCount === 0) {
                ranges.forEach(function (range) {
                    selection.addRange(range);
                });
            }
            if ($active) {
                $active.focus();
            }
        };
    };

    var clipboardToIE11Formatting = {
        "text/plain": "Text",
        "text/html": "Url",
        "default": "Text"
    };

    var updateMarkStyles = function (mark) {
        // 重置用户样式
        mark.style.all = "unset";
        // 放在 fixed，防止添加元素后触发滚动行为
        mark.style.position = "fixed";
        mark.style.top = '0';
        mark.style.clip = "rect(0, 0, 0, 0)";
        // 保留 space 和 line-break 特性
        mark.style.whiteSpace = "pre";
        // 外部有可能 user-select 为 'none'，因此这里设置为 text
        mark.style.userSelect = "text";
    };
    var copy = function (text, options) {
        if (options === void 0) { options = {}; }
        var onCopy = options.onCopy, format = options.format;
        var success = false;
        var reselectPrevious = deselectCurrent();
        var range = document.createRange();
        var selection = document.getSelection();
        var mark = document.createElement('span');
        mark.textContent = text;
        updateMarkStyles(mark);
        mark.addEventListener('copy', function (e) {
            e.stopPropagation();
            if (format) {
                e.preventDefault();
                if (!e.clipboardData) {
                    // 只有 IE 11 里 e.clipboardData 一直为 undefined
                    // 这里 format 要转为 IE 11 里指定的 format
                    var IE11Format = clipboardToIE11Formatting[format || 'default'];
                    // @ts-ignore clearData 只有 IE 上有
                    window.clipboardData.clearData();
                    // @ts-ignore setData 只有 IE 上有
                    window.clipboardData.setData(IE11Format, text);
                }
                else {
                    e.clipboardData.clearData();
                    e.clipboardData.setData(format, text);
                }
            }
            if (onCopy) {
                e.preventDefault();
                onCopy(e.clipboardData);
            }
        });
        // 插入 body 中
        document.body.appendChild(mark);
        // 选中
        range.selectNodeContents(mark);
        selection.addRange(range);
        try {
            // execCommand 有些浏览器可能不支持，这里要 try 一下
            success = document.execCommand('copy');
            if (!success) {
                throw new Error("Can't not copy");
            }
            // 复制成功
            success = true;
        }
        catch (e) {
            try {
                // @ts-ignore window.clipboardData 这鬼玩意只有 IE 上有
                window.clipboardData.setData(format || 'text', text);
                // @ts-ignore window.clipboardData 这鬼玩意只有 IE 上有
                onCopy && onCopy(window.clipboardData);
                // 复制成功
                success = true;
            }
            catch (e) {
                // 最后兜底方案，让用户在 window.prompt 的时候输入
                window.prompt('请手动复制以下内容', text);
            }
        }
        finally {
            if (selection) {
                if (selection.removeRange) {
                    selection.removeRange(range);
                }
                else {
                    selection.removeAllRanges();
                }
            }
            if (mark) {
                document.body.removeChild(mark);
            }
            reselectPrevious();
        }
        return success;
    };

    var $copy = document.querySelector('#copy');
    var $myCopy = document.querySelector('#my-copy');
    $copy.onclick = function () {
        var copyText = document.querySelector('#text').innerText;
        copy(copyText);
    };
    $myCopy.onclick = function () {
        var myText = document.querySelector('#my-text').innerText;
        copy('xxx', {
            onCopy: function (data) { return data.setData('text/plain', myText); },
        });
    };

})));
//# sourceMappingURL=index.js.map
