import {
    login, logout
} from "../Model/user.js"

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        let result = await login(email, password);
        if (result === true) {
            localStorage.setItem("isLoggedIn", "true"); // Store login state
            window.location.href = "index.html";
        } else {
            alert("Email or password invalid");
        }
    });
});