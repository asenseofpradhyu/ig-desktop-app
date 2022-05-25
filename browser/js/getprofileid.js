var submit = document.getElementById('submit');
var backBtn = document.getElementById('back-btn');
var username = document.getElementById('username');
var userid = document.getElementById('userid');
var CopyBtn = document.getElementById('btn');
var idDiv = document.getElementById('profileIdDiv');
idDiv.style.display = "none";
var userArray = [];
// Back
backBtn.addEventListener('click', () => {
	ipcRenderer.send('backToHome');
});

// Submit
submit.addEventListener('click', () => {
    userArray.push(username.value);
    ipcRenderer.send('searchUsersDmList', username.value);
    userArray = [];
});

// Copy Text
CopyBtn.addEventListener('click', () => {
    clipboard.writeText(userid.value, 'selection');
});

username.addEventListener('input', () => {
    idDiv.style.display = "none";
});

// Get ProfileID
ipcRenderer.on('searchResultDmList', (evt, users) => {
    
    
    if(users){
        userid.value = users.users[0].pk;
        idDiv.style.display = "block";
    }

	console.log(users.users[0].pk);
});