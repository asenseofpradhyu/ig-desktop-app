const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;


ipcRenderer.on('onbtnTest', (event, msg)=>{
    const errorElement = document.getElementById('div'); 
    // errorElement.innerHTML += msg;
    var content = document.createTextNode("<p>");
    errorElement.appendChild(content);
    
    console.log('Test.js');
    console.log(msg);
  });