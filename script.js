let channels = {};
let currentChannel = null;
let activeFilter = 'all';
let currentUser = null;

window.onload = () => {
    initApp();
};

function setupUser(){
const val = document.getElementById("setupNameInput").value;
currentUser = val;
localStorage.setItem("nb_user",currentUser);
document.getElementById("nameSetup").style.display="none";
initApp();
}

function initApp(){
document.getElementById("headerUserName").textContent=currentUser;
document.getElementById("headerAvatar").textContent=currentUser.charAt(0);
}