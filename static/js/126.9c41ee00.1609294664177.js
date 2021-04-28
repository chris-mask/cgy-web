webpackJsonp([126],{gyCY:function(o,n,t){(o.exports=t("FZ+f")(!1)).push([o.i,"@charset \"UTF-8\";\n.todoapp {\n  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  line-height: 1.4em;\n  color: #4d4d4d;\n  min-width: 230px;\n  max-width: 550px;\n  margin: 0 auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-weight: 300;\n  background: #fff;\n  z-index: 1;\n  position: relative;\n  /*\r\n  Hack to remove background from Mobile Safari.\r\n  Can't use it globally since it destroys checkboxes in Firefox\r\n*/ }\n.todoapp button {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    background: none;\n    font-size: 100%;\n    vertical-align: baseline;\n    font-family: inherit;\n    font-weight: inherit;\n    color: inherit;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n         appearance: none;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale; }\n.todoapp :focus {\n    outline: 0; }\n.todoapp .hidden {\n    display: none; }\n.todoapp .todoapp {\n    background: #fff;\n    margin: 130px 0 40px 0;\n    position: relative;\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1); }\n.todoapp .todoapp input::-webkit-input-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: #e6e6e6; }\n.todoapp .todoapp input::-moz-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: #e6e6e6; }\n.todoapp .todoapp input::input-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: #e6e6e6; }\n.todoapp .todoapp h1 {\n    position: absolute;\n    top: -155px;\n    width: 100%;\n    font-size: 100px;\n    font-weight: 100;\n    text-align: center;\n    color: rgba(175, 47, 47, 0.15);\n    -webkit-text-rendering: optimizeLegibility;\n    -moz-text-rendering: optimizeLegibility;\n    text-rendering: optimizeLegibility; }\n.todoapp .new-todo,\n  .todoapp .edit {\n    position: relative;\n    margin: 0;\n    width: 100%;\n    font-size: 18px;\n    font-family: inherit;\n    font-weight: inherit;\n    line-height: 1.4em;\n    border: 0;\n    color: inherit;\n    padding: 6px;\n    border: 1px solid #999;\n    -webkit-box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n            box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale; }\n.todoapp .new-todo {\n    padding: 10px 16px 16px 60px;\n    border: none;\n    background: rgba(0, 0, 0, 0.003);\n    -webkit-box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);\n            box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03); }\n.todoapp .main {\n    position: relative;\n    z-index: 2;\n    border-top: 1px solid #e6e6e6; }\n.todoapp .toggle-all {\n    text-align: center;\n    border: none;\n    /* Mobile Safari */\n    opacity: 0;\n    position: absolute; }\n.todoapp .toggle-all + label {\n    width: 60px;\n    height: 34px;\n    font-size: 0;\n    position: absolute;\n    top: -52px;\n    left: -13px;\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg); }\n.todoapp .toggle-all + label:before {\n    content: '\\276F';\n    font-size: 22px;\n    color: #e6e6e6;\n    padding: 10px 27px 10px 27px; }\n.todoapp .toggle-all:checked + label:before {\n    color: #737373; }\n.todoapp .todo-list {\n    margin: 0;\n    padding: 0;\n    list-style: none; }\n.todoapp .todo-list li {\n    position: relative;\n    font-size: 24px;\n    border-bottom: 1px solid #ededed; }\n.todoapp .todo-list li:last-child {\n    border-bottom: none; }\n.todoapp .todo-list li.editing {\n    border-bottom: none;\n    padding: 0; }\n.todoapp .todo-list li.editing .edit {\n    display: block;\n    width: 506px;\n    padding: 12px 16px;\n    margin: 0 0 0 43px; }\n.todoapp .todo-list li.editing .view {\n    display: none; }\n.todoapp .todo-list li .toggle {\n    text-align: center;\n    width: 40px;\n    /* auto, since non-WebKit browsers doesn't support input styling */\n    height: auto;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    border: none;\n    /* Mobile Safari */\n    -webkit-appearance: none;\n    -moz-appearance: none;\n         appearance: none; }\n.todoapp .todo-list li .toggle {\n    opacity: 0; }\n.todoapp .todo-list li .toggle + label {\n    /*\r\n    Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433\r\n    IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/\r\n  */\n    background-image: url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E\");\n    background-repeat: no-repeat;\n    background-position: center left;\n    background-size: 36px; }\n.todoapp .todo-list li .toggle:checked + label {\n    background-size: 36px;\n    background-image: url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E\"); }\n.todoapp .todo-list li label {\n    word-break: break-all;\n    padding: 15px 15px 15px 50px;\n    display: block;\n    line-height: 1.0;\n    font-size: 14px;\n    -webkit-transition: color 0.4s;\n    transition: color 0.4s; }\n.todoapp .todo-list li.completed label {\n    color: #d9d9d9;\n    text-decoration: line-through; }\n.todoapp .todo-list li .destroy {\n    display: none;\n    position: absolute;\n    top: 0;\n    right: 10px;\n    bottom: 0;\n    width: 40px;\n    height: 40px;\n    margin: auto 0;\n    font-size: 30px;\n    color: #cc9a9a;\n    -webkit-transition: color 0.2s ease-out;\n    transition: color 0.2s ease-out; }\n.todoapp .todo-list li .destroy:hover {\n    color: #af5b5e; }\n.todoapp .todo-list li .destroy:after {\n    content: '\\D7'; }\n.todoapp .todo-list li:hover .destroy {\n    display: block; }\n.todoapp .todo-list li .edit {\n    display: none; }\n.todoapp .todo-list li.editing:last-child {\n    margin-bottom: -1px; }\n.todoapp .footer {\n    color: #777;\n    position: relative;\n    padding: 10px 15px;\n    height: 40px;\n    text-align: center;\n    border-top: 1px solid #e6e6e6; }\n.todoapp .footer:before {\n    content: '';\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    height: 40px;\n    overflow: hidden;\n    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);\n            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2); }\n.todoapp .todo-count {\n    float: left;\n    text-align: left; }\n.todoapp .todo-count strong {\n    font-weight: 300; }\n.todoapp .filters {\n    margin: 0;\n    padding: 0;\n    position: relative;\n    z-index: 1;\n    list-style: none; }\n.todoapp .filters li {\n    display: inline; }\n.todoapp .filters li a {\n    color: inherit;\n    font-size: 12px;\n    padding: 3px 7px;\n    text-decoration: none;\n    border: 1px solid transparent;\n    border-radius: 3px; }\n.todoapp .filters li a:hover {\n    border-color: rgba(175, 47, 47, 0.1); }\n.todoapp .filters li a.selected {\n    border-color: rgba(175, 47, 47, 0.2); }\n.todoapp .clear-completed,\n  .todoapp html .clear-completed:active {\n    float: right;\n    position: relative;\n    line-height: 20px;\n    text-decoration: none;\n    cursor: pointer; }\n.todoapp .clear-completed:hover {\n    text-decoration: underline; }\n.todoapp .info {\n    margin: 65px auto 0;\n    color: #bfbfbf;\n    font-size: 10px;\n    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n    text-align: center; }\n.todoapp .info p {\n    line-height: 1; }\n.todoapp .info a {\n    color: inherit;\n    text-decoration: none;\n    font-weight: 400; }\n.todoapp .info a:hover {\n    text-decoration: underline; }\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n    .todoapp .toggle-all,\n    .todoapp .todo-list li .toggle {\n      background: none; }\n    .todoapp .todo-list li .toggle {\n      height: 40px; } }\n@media (max-width: 430px) {\n    .todoapp .footer {\n      height: 50px; }\n    .todoapp .filters {\n      bottom: 10px; } }\n",""])},x7KY:function(o,n,t){var e=t("gyCY");"string"==typeof e&&(e=[[o.i,e,""]]),e.locals&&(o.exports=e.locals);t("rjj0")("31ccf5c8",e,!0)}});