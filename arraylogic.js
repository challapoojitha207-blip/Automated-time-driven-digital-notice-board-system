let channels = JSON.parse(localStorage.getItem("channels")) || {};
let currentChannel = null;

function saveData() {
    localStorage.setItem("channels", JSON.stringify(channels));
}