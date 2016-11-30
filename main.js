/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that lets you add file type mappings to languages */
define(function (require, exports, module) {
    "use strict";
    require('elixir');
    var CodeMirror = brackets.getModule("thirdparty/CodeMirror/lib/codemirror");
    CodeMirror.registerHelper("fold", "elixir", function(cm, start) {
      var line = start.line, lineText = cm.getLine(line);
      var tokenType;

      function findOpening(openCh) {
        for (var at = start.ch, pass = 0;;) {
          var found = at <= 0 ? -1 : lineText.lastIndexOf(openCh, at - 1);
          if (found == -1) {
            if (pass == 1) break;
            pass = 1;
            at = lineText.length;
            continue;
          }
          if (pass == 1 && found < start.ch) break;
          tokenType = cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1));
          if (!/^(comment|string)/.test(tokenType)) return found + 1;
          at = found - 1;
        }
      }

      var startToken = "do", endToken = "end", startCh = findOpening("do");

      if (startCh == null) return;
      var count = 1, lastLine = cm.lastLine(), end, endCh;
      outer: for (var i = line; i <= lastLine; ++i) {
        var text = cm.getLine(i), pos = i == line ? startCh : 0;
        for (;;) {
          var nextOpen = text.indexOf(startToken, pos), nextClose = text.indexOf(endToken, pos);
          if (nextOpen < 0) nextOpen = text.length;
          if (nextClose < 0) nextClose = text.length;
          pos = Math.min(nextOpen, nextClose);
          if (pos == text.length) break;
          if (cm.getTokenTypeAt(CodeMirror.Pos(i, pos + 1)) == tokenType) {
            if (pos == nextOpen) ++count;
            else if (!--count) { end = i; endCh = pos; break outer; }
          }
          ++pos;
        }
      }
      if (end == null || line == end && endCh == startCh) return;
      return {from: CodeMirror.Pos(line, startCh),
              to: CodeMirror.Pos(end, endCh)};
    });
    
    var LanguageManager = brackets.getModule("language/LanguageManager");
    LanguageManager.defineLanguage("elixir", {
        name: "Elixir",
        mode: "elixir",
        fileExtensions: ["exs", "ex"],
        fileNames: ["mix.lock"],
        lineComment: ["#"]
    });
    LanguageManager.defineLanguage("elixir_html", {
        name: "Embedded Elixir",
        mode: ["htmlembedded", "application/x-eex"],
        fileExtensions: ["eex", "html.eex", "htm.eex"],
        blockComment: ["<!--", "-->"]
    });
});
