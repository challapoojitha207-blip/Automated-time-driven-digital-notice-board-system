const channelList = document.getElementById("channelList");
const noticeContainer = document.getElementById("noticeContainer");
const currentChannelTitle = document.getElementById("currentChannelTitle");
const form = document.getElementById("noticeForm");

function createChannel() {
    const name = document.getElementById("channelName").value.trim();
    if (!name || channels[name]) return;

    channels[name] = [];
    document.getElementById("channelName").value = "";
    saveData();
    renderChannels();
}

function renderChannels() {
    channelList.innerHTML = "";
    Object.keys(channels).forEach(channel => {
        const btn = document.createElement("button");
        btn.textContent = channel;
        btn.onclick = () => selectChannel(channel);
        if (channel === currentChannel) btn.classList.add("active-channel");
        channelList.appendChild(btn);
    });
}

function selectChannel(channel) {
    currentChannel = channel;
    currentChannelTitle.textContent = "Channel: " + channel;
    renderChannels();
    renderNotices();
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (!currentChannel) return alert("Select a channel first");

    const notice = {
        id: Date.now(),
        title: title.value,
        description: description.value,
        expiry: expiry.value,
        priority: priority.value
    };

    channels[currentChannel].push(notice);
    saveData();
    renderNotices();
    form.reset();
});

function renderNotices() {
    noticeContainer.innerHTML = "";
    if (!currentChannel) return;

    const now = new Date();
    channels[currentChannel] = channels[currentChannel].filter(n => new Date(n.expiry) > now);

    channels[currentChannel].forEach(n => {
        const div = document.createElement("div");
        div.className = "notice " + n.priority;

        div.innerHTML = `
            <h4>${n.title}</h4>
            <p>${n.description}</p>
            <small>Expires: ${new Date(n.expiry).toLocaleString()}</small>
            <button onclick="deleteNotice(${n.id})">X</button>
        `;

        noticeContainer.appendChild(div);
    });

    saveData();
}

function deleteNotice(id) {
    channels[currentChannel] = channels[currentChannel].filter(n => n.id !== id);
    saveData();
    renderNotices();
}

setInterval(renderNotices, 30000);
renderChannels();