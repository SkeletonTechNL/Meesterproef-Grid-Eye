// alpha.js - JavaScript WebSocket-Client, verbind met ESP8266's en verwerkt gegevens.  
const WebSocket = require('ws')
const url = 'ws://192.168.0.115:81'
const connection = new WebSocket(url)
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const window = require("global/window");
const sens = "6";
pslog = 3;

function poweroff() {
if (pslog == 1) {
		console.log("(O) Already powered off");
	} else { 
	var url = "http://192.168.0.113/cm?cmnd=Power%20Off";
	xhr = new XMLHttpRequest();
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			console.log(xhr.status);
			console.log(xhr.responseText);
	}};

	xhr.send();
		window.pslog = 1;
	}	
	
}

function poweron() {
	
if (pslog == 2) {
		console.log("(I) Already powered on");
	} else {
	var url = "http://192.168.0.113/cm?cmnd=Power%20On";
	xhr = new XMLHttpRequest();
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			console.log(xhr.status);
			console.log(xhr.responseText);
		}	
		};
	xhr.send(); 
		window.pslog = 2;
	}
	
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}
 
connection.onmessage = (e) => {
const json = JSON.parse(e.data);
let filter = (arr, num) => arr.filter(n => n > num);

const count = filter(json, 24);
const amount = count.length;
  
if (amount < sens) {
poweroff();
} else {
poweron();	
}
}