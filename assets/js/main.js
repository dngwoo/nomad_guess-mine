const nickname = localStorage.getItem("nickname"); // localstorage에서 가져온다.
const body = document.querySelector("body");
const loginForm = document.querySelector("#jsLogin");
const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

if (nickname === null) {
  // localstorage에 nickname이 없다면 loggedout 처리
  body.className = LOGGED_OUT;
} else {
  // localstorage에 nickname이 있다면 loggedin 처리
  body.className = LOGGED_IN;
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = loginForm.querySelector("input");
    const { value } = input;
    input.value = "";
    localStorage.setItem(NICKNAME, value);
    // 로컬 스토리지에 저장
  });
}