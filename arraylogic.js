function saveData(){
localStorage.setItem("nb_channels", JSON.stringify(channels));
}

function loadData(){
const data = localStorage.getItem("nb_channels");
if(data){
channels = JSON.parse(data);
}
}

function deleteNotice(id){
channels[currentChannel].notices =
channels[currentChannel].notices.filter(n => n.id !== id);

saveData();
renderNotices();
}