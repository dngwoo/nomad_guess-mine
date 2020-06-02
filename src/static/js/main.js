(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.enableChat=exports.disableChat=exports.handleNewMessage=void 0;var _sockets=require("./sockets"),messages=document.querySelector("#jsMessage"),sendMsg=document.querySelector("#jsSendMsg"),appendMsg=function(e,s){var n=document.createElement("li");n.innerHTML="\n    <span class=".concat(s?"out":"self",">").concat(s||"You",': </span>\n    <span class="content">').concat(e," </span>\n  "),messages.appendChild(n)},handleSendMsg=function(e){e.preventDefault();var s=sendMsg.querySelector("input"),n=s.value;(0,_sockets.getSocket)().emit(window.events.sendMsg,{message:n}),s.value="",appendMsg(n)};sendMsg&&sendMsg.addEventListener("submit",handleSendMsg);var handleNewMessage=function(e){var s=e.message,n=e.nickname;return appendMsg(s,n)};exports.handleNewMessage=handleNewMessage;var disableChat=function(){sendMsg.style.display="none"};exports.disableChat=disableChat;var enableChat=function(){sendMsg.style.display="flex"};exports.enableChat=enableChat;

},{"./sockets":7}],2:[function(require,module,exports){
"use strict";var _sockets=require("./sockets"),body=document.querySelector("body"),loginForm=document.querySelector("#jsLogin"),NICKNAME="nickname",LOGGED_OUT="loggedOut",LOGGED_IN="loggedIn",nickname=localStorage.getItem("nickname"),logIn=function(e){var n=io("/");n.emit(window.events.setNickname,{nickname:e}),(0,_sockets.initSockets)(n)};null===nickname?body.className=LOGGED_OUT:(body.className=LOGGED_IN,logIn(nickname)),loginForm&&loginForm.addEventListener("submit",function(e){e.preventDefault();var n=loginForm.querySelector("input"),o=n.value;n.value="",localStorage.setItem(NICKNAME,o),logIn(o)});

},{"./sockets":7}],3:[function(require,module,exports){
"use strict";require("./login"),require("./sockets"),require("./chat"),require("./paint");

},{"./chat":1,"./login":2,"./paint":5,"./sockets":7}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleDisconnected=exports.handleNewUser=void 0;var body=document.querySelector("body"),fireNotification=function(e,n){var o=document.createElement("span");o.innerText=e,o.style.backgroundColor=n,o.className="notification",body.appendChild(o)},handleNewUser=function(e){var n=e.nickname;fireNotification("".concat(n," just joined!"),"rgb(0, 122, 255)")};exports.handleNewUser=handleNewUser;var handleDisconnected=function(e){var n=e.nickname;fireNotification("".concat(n," just joined!"),"rgb(255, 149, 0)")};exports.handleDisconnected=handleDisconnected;

},{}],5:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.resetCanvas=exports.showControls=exports.hideControls=exports.enableCanvas=exports.disableCanvas=exports.handleFilled=exports.handleStrokedPath=exports.handleBeganPath=void 0;var _sockets=require("./sockets"),canvas=document.getElementById("jsCanvas"),controls=document.getElementById("jsControls"),ctx=canvas.getContext("2d"),colors=document.getElementsByClassName("jsColor"),mode=document.getElementById("jsMode"),INITIAL_COLOR="#2c2c2c",CANVAS_SIZE=700;canvas.width=CANVAS_SIZE,canvas.height=CANVAS_SIZE,ctx.fillStyle="white",ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE),ctx.strokeStyle=INITIAL_COLOR,ctx.fillStyle=INITIAL_COLOR,ctx.lineWidth=2.5;var painting=!1,filling=!1,stopPainting=function(){painting=!1},startPainting=function(){painting=!0},beginPath=function(e,t){ctx.beginPath(),ctx.moveTo(e,t)},strokePath=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=ctx.strokeStyle;null!==n&&(ctx.strokeStyle=n),ctx.lineTo(e,t),ctx.stroke(),ctx.strokeStyle=o},onMouseMove=function(e){var t=e.offsetX,n=e.offsetY;painting?(strokePath(t,n),(0,_sockets.getSocket)().emit(window.events.strokePath,{x:t,y:n,color:ctx.strokeStyle})):(beginPath(t,n),(0,_sockets.getSocket)().emit(window.events.beginPath,{x:t,y:n}))},handleColorClick=function(e){var t=e.target.style.backgroundColor;ctx.strokeStyle=t,ctx.fillStyle=t},handleModeClick=function(){!0===filling?(filling=!1,mode.innerText="Fill"):(filling=!0,mode.innerText="Paint")},fill=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=ctx.fillStyle;null!==e&&(ctx.fillStyle=e),ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE),ctx.fillStyle=t},handleCanvasClick=function(){filling&&(fill(),(0,_sockets.getSocket)().emit(window.events.fill,{color:ctx.fillStyle}))},handleCM=function(e){e.preventDefault()};Array.from(colors).forEach(function(e){return e.addEventListener("click",handleColorClick)}),mode&&mode.addEventListener("click",handleModeClick);var handleBeganPath=function(e){var t=e.x,n=e.y;return beginPath(t,n)};exports.handleBeganPath=handleBeganPath;var handleStrokedPath=function(e){var t=e.x,n=e.y,o=e.color;return strokePath(t,n,o)};exports.handleStrokedPath=handleStrokedPath;var handleFilled=function(e){var t=e.color;return fill(t)};exports.handleFilled=handleFilled;var disableCanvas=function(){canvas.removeEventListener("mousemove",onMouseMove),canvas.removeEventListener("mousedown",startPainting),canvas.removeEventListener("mouseup",stopPainting),canvas.removeEventListener("mouseleave",stopPainting),canvas.removeEventListener("click",handleCanvasClick)};exports.disableCanvas=disableCanvas;var enableCanvas=function(){canvas.addEventListener("mousemove",onMouseMove),canvas.addEventListener("mousedown",startPainting),canvas.addEventListener("mouseup",stopPainting),canvas.addEventListener("mouseleave",stopPainting),canvas.addEventListener("click",handleCanvasClick)};exports.enableCanvas=enableCanvas;var hideControls=function(){return controls.style.display="none"};exports.hideControls=hideControls;var showControls=function(){return controls.style.display="flex"};exports.showControls=showControls;var resetCanvas=function(){return fill("#fff")};exports.resetCanvas=resetCanvas,canvas&&(canvas.addEventListener("contextmenu",handleCM),hideControls());

},{"./sockets":7}],6:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleGameStarting=exports.handleGameEnded=exports.handleLeaderNotif=exports.handleGameStarted=exports.handlePlayerUpdate=void 0;var _paint=require("./paint"),_chat=require("./chat"),board=document.querySelector("#jsPBoard"),notifs=document.querySelector("#jsNotifs"),addPlayers=function(e){board.innerHTML="",e.forEach(function(e){var a=document.createElement("span");a.innerText="".concat(e.nickname,": ").concat(e.points),board.appendChild(a)})},handlePlayerUpdate=function(e){var a=e.sockets;addPlayers(a)};exports.handlePlayerUpdate=handlePlayerUpdate;var setNotifs=function(e){notifs.innerText="",notifs.innerText=e},handleGameStarted=function(){setNotifs(""),(0,_paint.disableCanvas)(),(0,_paint.hideControls)(),(0,_chat.enableChat)()};exports.handleGameStarted=handleGameStarted;var handleLeaderNotif=function(e){var a=e.word;(0,_paint.enableCanvas)(),(0,_paint.showControls)(),(0,_chat.disableChat)(),setNotifs("you are the leader, paint: ".concat(a))};exports.handleLeaderNotif=handleLeaderNotif;var handleGameEnded=function(){setNotifs("Game ended"),(0,_paint.disableCanvas)(),(0,_paint.hideControls)(),(0,_paint.resetCanvas)()};exports.handleGameEnded=handleGameEnded;var handleGameStarting=function(){setNotifs("Game will start soon")};exports.handleGameStarting=handleGameStarting;

},{"./chat":1,"./paint":5}],7:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initSockets=exports.getSocket=void 0;var _notifications=require("./notifications"),_chat=require("./chat"),_paint=require("./paint"),_players=require("./players"),socket=null,getSocket=function(){return socket};exports.getSocket=getSocket;var initSockets=function(e){var t=window.events;(socket=e).on(t.newUser,_notifications.handleNewUser),socket.on(t.disconnected,_notifications.handleDisconnected),socket.on(t.newMsg,_chat.handleNewMessage),socket.on(t.beganPath,_paint.handleBeganPath),socket.on(t.strokePath,_paint.handleStrokedPath),socket.on(t.filled,_paint.handleFilled),socket.on(t.playerUpdate,_players.handlePlayerUpdate),socket.on(t.gameStarted,_players.handleGameStarted),socket.on(t.leaderNotif,_players.handleLeaderNotif),socket.on(t.gameEnded,_players.handleGameEnded),socket.on(t.gameStarting,_players.handleGameStarting)};exports.initSockets=initSockets;

},{"./chat":1,"./notifications":4,"./paint":5,"./players":6}]},{},[3]);
