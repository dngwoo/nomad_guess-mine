(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var nickname=localStorage.getItem("nickname"),body=document.querySelector("body"),loginForm=document.querySelector("#jsLogin"),NICKNAME="nickname",LOGGED_OUT="loggedOut",LOGGED_IN="loggedIn";body.className=null===nickname?LOGGED_OUT:LOGGED_IN,loginForm&&loginForm.addEventListener("submit",function(e){e.preventDefault();var o=loginForm.querySelector("input"),n=o.value;o.value="",localStorage.setItem(NICKNAME,n)});

},{}]},{},[1]);
