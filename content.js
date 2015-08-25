'use strict';

var injectedKey = '__injected_' + chrome.runtime.id;

if (!window[injectedKey]) {
    window[injectedKey] = true;

    window.addEventListener('dblclick', function(e) {
        var selection = window.getSelection();

        if (selection.toString() === ' ') {
            var startNode = selection.anchorNode;
            var endNode = selection.focusNode;

            if (selection.anchorOffset === 0) {
                startNode = startNode.previousSibling.firstChild;
            }

            if (selection.focusOffset === endNode.nodeValue.length) {
                endNode = endNode.nextSibling.firstChild;
            }

            var startOffset = startNode.nodeValue.lastIndexOf(' ', selection.anchorOffset - 1) + 1;
            if (startOffset === -1) {
                startOffset = 0;
            }

            var endOffset = endNode.nodeValue.indexOf(' ', selection.focusOffset);
            if (endOffset === -1) {
                endOffset = endNode.nodeValue.length;
            }

            var range = document.createRange();
            range.setStart(startNode, startOffset);
            range.setEnd(endNode, endOffset);

            selection.addRange(range);
        }
    });
}
