const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    let button = document.querySelector('button[type=submit]');
    button.innerText = 'Logging In...';
    button.classList.add('loggingIn', 'disabled');

    let username = document.querySelector('input[name=username]').value;
    let password = document.querySelector('input[name=password]').value;
 
    ipcRenderer.send('login', { username, password });
  };

  ipcRenderer.on('loginError', (evt, errorMessage) => {
    let button = document.querySelector('button[type=submit]');
    button.classList.remove('loggingIn', 'disabled');
    button.innerText = 'Login to Instagram';
    const errorElement = document.getElementById('error');
    errorElement.innerHTML = errorMessage;
  });

  const btn = document.querySelector('#btn');
  var btntext='Im here from Test Button';

  btn.addEventListener('click', function(){

    ipcRenderer.send('btnTest', { btntext });
    console.log("Send..");

  });
  
  ipcRenderer.on('onbtnTest', (event, msg)=>{
    // const errorElement = document.getElementById('div'); 
    // errorElement.innerHTML += msg;
    // var content = document.createTextNode("<p>");
    // errorElement.appendChild(content);
    
    console.log('Test.js');
    console.log(msg);
  });
  


  // document.querySelector('a').onclick = () => electron.shell.openExternal('https://www.google.com');
});
