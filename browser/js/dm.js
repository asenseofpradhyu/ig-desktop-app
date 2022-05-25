// Importing dialog module using remote 
// const dialog = electron.remote.dialog; 
const remote = require('electron').remote;
const dialog = remote.dialog;

var uploadFile = document.getElementById('upload');
var dmMessage = document.getElementById('Message');
var submit = document.getElementById('submit');
var backBtn = document.getElementById('back-btn');
var profileCheck  = document.getElementById('profileCheck');
var profileTextbox = document.querySelector('.profileTextbox');
let fileData;
let username;
var index = 0;
var arr = new Array();
let userlist = [];

// Defining a Global file path Variable to store 
// user-selected file 
global.filepath = undefined;

backBtn.addEventListener('click', () => {
  ipcRenderer.send('backToHome');
});

uploadFile.addEventListener('click', () => { 
// If the platform is 'win32' or 'Linux' 
  // if (process.platform !== 'darwin') { 
  // 	// Resolves to a Promise<Object> 
  // 	dialog.showOpenDialog({ 
  // 		title: 'Select the File to be uploaded',
  // 		buttonLabel: 'Upload', 
  // 		// Restricting the user to only Text Files. 
  // 		filters: [ 
  // 			{ 
  // 				name: 'Text Files', 
  // 				extensions: ['txt', 'docx'] 
  // 			}, ], 
  // 		// Specifying the File Selector Property 
  // 		properties: ['openFile'] 
  // 	}).then(file => { 
  // 		// Stating whether dialog operation was 
  // 		// cancelled or not. 
  // 		console.log(file.canceled); 
  // 		if (!file.canceled) { 
  // 		// Updating the GLOBAL filepath variable 
  // 		// to user-selected file. 
  // 		global.filepath = file.filePaths[0].toString(); 
  // 		console.log(global.filepath);
  // 		} 
  // 	}).catch(err => { 
  // 		console.log(err); 
  // 	}); 
  // } else { 
  // 	// If the platform is 'darwin' (macOS) 
  // 	dialog.showOpenDialog({ 
  // 		title: 'Select the File to be uploaded', 
  // 		buttonLabel: 'Upload', 
  // 		filters: [ 
  // 			{ 
  // 				name: 'Text Files', 
  // 				extensions: ['txt', 'docx'] 
  // 			}, ], 
  // 		// Specifying the File Selector and Directory 
  // 		// Selector Property In macOS 
  // 		properties: ['openFile', 'openDirectory'] 
  // 	}).then(file => { 
  // 		console.log(file.canceled); 
  // 		if (!file.canceled) { 
  // 		global.filepath = file.filePaths[0].toString(); 
  // 		console.log(global.filepath); 
  // 		} 
  // 	}).catch(err => { 
  // 		console.log(err) 
  // 	}); 
  // } 

  dialog.showOpenDialog({
    title: 'Select the File to be uploaded',
    buttonLabel: 'Upload', 
    // Restricting the user to only Text Files. 
    filters: [ 
      { 
        name: 'Files', 
        extensions: ['txt', 'xls', 'xlsx'] 
      }, ], 
    // Specifying the File Selector Property 
    properties: ['openFile'] 
  }, function (files) {
    if (files !== undefined) {
      // fs.readFile(files[0], {encoding: 'utf-8'}, function(err,data) { 
      //    if (!err) { 
      // 		if(data){
      // 			ipcRenderer.send('searchUsersDmList', data);
      // 			// fileData = data;
      // 		}
      //         console.log(data); 
      //    } else { 
      //         console.log(err); 
      //     } 
      //  }); 
			   
      // 6095675520 --L
      // 7775499676 --P
      // Read Excel File
      let workbook = XLSX.readFile(files[0]);
      console.log('Username Length:- '+workbook.Strings.length);
      for (let i=1; i<workbook.Strings.length; i++) {
        ipcRenderer.send('searchUsersDmList', workbook.Strings[i].r);
        console.log('Excel:- '+workbook.Strings[i].r);
      }
				

    } else {
      console.log('No File Selected '+files);
    }
  });
}); 



ipcRenderer.on('searchResultDmList', (evt, users) => {

  let u = users.users[0].pk;
  username = users.users[0].username;
  arr[0] = u;
  userlist.push(arr);
  arr = [];
  console.log(userlist);
	
	
});
 

// Click on Send Message
submit.addEventListener('click', () => {

  // console.log(userlist[0]);
  console.log('MSG:- '+dmMessage.value);

  let data = {};
  data.msg = dmMessage.value;

  if (profileId.value) {
    data.profileId = profileId.value;
  }

	
  // let profileId = 
  for (let i=0; i<userlist.length; i++) {

    let userID = userlist[i];
    ipcRenderer.send('sendmsglist', {userID, data});

  }
	
	
});

ipcRenderer.on('sentSuccessfully', (evt, users) => {

  if (users) {
    console.log('Message sent to:- '+ username);
    userlist.shift();
    // username = null;
	
  } else {
    console.log('Not Sent to..'+ username);
  }
});


profileCheck.addEventListener('click', () => {

  if (document.getElementById('profileCheck').checked == true) {
    console.log('Check');

    const div = document.createElement('div');

    div.className = 'row';
	  
    div.innerHTML = `<label for="profileId">Enter User ProfileID</label>
						<input class="form-control" id="profileId" type="text">`;
	  
    profileTextbox.appendChild(div);
    let profileId  = document.getElementById('profileId');

  } else {
    profileTextbox.innerHTML = '';
  }
	
	
});







console.log(userlist);