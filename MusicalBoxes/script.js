var notes = [
["113","115","117","118","120","122","124",],
["125","127","129","130","132","134","136",],
["137","139","141","142","144","146","148",],
["149","151","153","154","156","158","160",],
]

var letters = ["C","D","E","F","G","A","B"]

var boxSize1 = [400,300];
var boxSize2 = [300,400];
var boxSize3 = [300,400];
var boxSize4 = [400,300];
var boxSizes = [boxSize1, boxSize2, boxSize3, boxSize4];
var ballSize = 20;
var panelThickness = 20;
var posX;
var posY;
var coordinates = [];
var timers = [
	["t1r","t1l","t1d","t1u",],
	["t2r","t2l","t2d","t2u",],
	["t3r","t3l","t3d","t3u",],
	["t4r","t4l","t4d","t4u",],
];
var directions = [];
var movFuncts = [
	"moveRight",
	"moveLeft",
	"moveDown",
	"moveUp",
]
var kwadranten = [];
var myBooleans = [false,false,false,false];
var numberOfSegments = letters.length;
var speed = 5;
var cdInterval;

window.onload = function() {
	document.getElementById("slider").oninput = function() {
		for (var i = 0; i < document.getElementsByTagName("audio").length; i++) {
			document.getElementsByTagName("audio")[i].volume = this.value/100;
		}
	}
	for (var it = 0; it < document.getElementsByClassName("box").length; it++) {
		document.getElementsByClassName("box")[it].style.width = boxSizes[it][0]+"px";
		document.getElementsByClassName("box")[it].style.height = boxSizes[it][1]+"px";

		document.getElementsByClassName("ball")[it].style.width = ballSize+"px";
		document.getElementsByClassName("ball")[it].style.height = ballSize+"px";
		
		kwadranten[it] = [ (Math.floor(Math.random()*2)) , (Math.floor(Math.random()*2)) ];
		console.log("#"+(it+1)+". kwadrant = " + kwadranten[it]);

		directions[it] = [
			(1+Math.floor(Math.random()*50))/200 ,
			(1+Math.floor(Math.random()*50))/200
		];
		console.log("    X/Y-richting = " + directions[it]);

		coordinates[it] = [Math.floor(Math.random()*(boxSizes[it][0]-ballSize)) , Math.floor(Math.random()*(boxSizes[it][1]-ballSize))];
		console.log("    coordinates = " + coordinates[it]);

		document.getElementsByClassName("ball")[it].style.left = coordinates[it][0] + "px";
		document.getElementsByClassName("ball")[it].style.top = coordinates[it][1] + "px";

		for (var j = 0; j < 4; j++) {
			var boxSize = boxSizes[it];
			for (var i = 0; i < numberOfSegments; i++) {
				var newdiv = document.createElement("div");
				var parent = document.getElementsByClassName("box")[it];
				if (j<2) {
					newdiv.style.height = ((boxSize[1]-ballSize)/numberOfSegments)+"px";
					newdiv.style.width = panelThickness+"px";
				} else {
					newdiv.style.height = panelThickness+"px";
					newdiv.style.width = ((boxSize[0]-ballSize)/numberOfSegments)+"px";
				}
				switch(j){
					case 0:
						newdiv.style.left = boxSize[0]+"px";
						newdiv.style.top = (ballSize/2)+i*((boxSize[1]-ballSize)/numberOfSegments)+"px";
						break;
					case 1:
						newdiv.style.left = -panelThickness+"px";
						newdiv.style.top = (ballSize/2)+i*((boxSize[1]-ballSize)/numberOfSegments)+"px";
						break;
					case 2:
						newdiv.style.left = (ballSize/2)+i*((boxSize[0]-ballSize)/numberOfSegments)+"px";
						newdiv.style.top = -panelThickness+"px";
						break;
					case 3:
						newdiv.style.left = (ballSize/2)+i*((boxSize[0]-ballSize)/numberOfSegments)+"px";
						newdiv.style.top = boxSize[1]+"px";
						break;
				}
				if (j%2==0) {
					newdiv.innerText = letters[i];
				} else {
					newdiv.innerText = letters[numberOfSegments-1-i];
				}
				newdiv.style.fontSize = panelThickness*0.8;
				newdiv.style.textAlign = "center";
				newdiv.style.position = "absolute";
				if (i%2==0) {
					newdiv.style.backgroundColor = "darkblue";
					newdiv.style.color = "white";
				} else {
					newdiv.style.backgroundColor = "lightyellow";
				}
				parent.appendChild(newdiv);
			}
		}
	}

};          



function countDown() {
	var cdS = document.getElementById("cdS");
	clearInterval(cdInterval);
	cdInterval = setInterval(() => {
		if(document.getElementById("cdS").value > 1){
			document.getElementById("cdS").value--;
		} else {
			clearInterval(cdInterval);
			cdS.value = "";
			stopAll();
		}
	}, 1000)
}

function moggleAll() {
	for (var i = 0; i < myBooleans.length; i++) {
		moggle(i);
	}
}



function moggle(boxIndex) {
	if (myBooleans[boxIndex]) {
		myBooleans[boxIndex] = false;
		clearInterval(timers[boxIndex][0]);
		clearInterval(timers[boxIndex][1]);
		clearInterval(timers[boxIndex][2]);
		clearInterval(timers[boxIndex][3]);
	} else {
		myBooleans[boxIndex] = true;

		var ball = document.getElementsByClassName("ball")[boxIndex];

		if(kwadranten[boxIndex][0]){timers[boxIndex][0] = setInterval(moveRight, speed);}
		else {timers[boxIndex][1] = setInterval(moveLeft, speed);}
		if(kwadranten[boxIndex][1]){timers[boxIndex][2] = setInterval(moveDown, speed);}
		else {timers[boxIndex][3] = setInterval(moveUp, speed);}

		function moveRight() {
			if(coordinates[boxIndex][0] >= (boxSizes[boxIndex][0]-ballSize)) {
				kwadranten[boxIndex][0] = 0;
				clearInterval(timers[boxIndex][0]);
				timers[boxIndex][1] = setInterval(moveLeft, speed)
				var numseg = Math.floor(coordinates[boxIndex][1]/((boxSizes[boxIndex][1]-ballSize)/numberOfSegments));
				while(numseg<0){numseg++;}
				while(numseg>numberOfSegments-1){numseg--;}
				document.getElementsByClassName("indic")[boxIndex].innerHTML = letters[numseg];
				document.getElementsByClassName("audiodiv")[boxIndex].children[0].volume = document.getElementById("slider").value/100;
				document.getElementsByClassName("audiodiv")[boxIndex].children[0].src = "EG/"+ notes[1][numseg] +".mp3";
			}
			else {
				coordinates[boxIndex][0] += directions[boxIndex][0];
				ball.style.left = coordinates[boxIndex][0]+'px';
			}
		}
		function moveLeft() {
			if(coordinates[boxIndex][0] <= 0) {
				kwadranten[boxIndex][0] = 1;
				clearInterval(timers[boxIndex][1]);
				timers[boxIndex][0] = setInterval(moveRight, speed)
				var numseg = Math.floor(coordinates[boxIndex][1]/((boxSizes[boxIndex][1]-ballSize)/numberOfSegments));
				while(numseg<0){numseg++;}
				while(numseg>numberOfSegments-1){numseg--;}
				document.getElementsByClassName("indic")[boxIndex].innerHTML = letters[letters.length-1-numseg];
				document.getElementsByClassName("audiodiv")[boxIndex].children[1].volume = document.getElementById("slider").value/100;
				document.getElementsByClassName("audiodiv")[boxIndex].children[1].src = "EG/"+ notes[3][numberOfSegments-1-numseg] +".mp3";
			}
			else {
				coordinates[boxIndex][0] -= directions[boxIndex][0];
				ball.style.left = coordinates[boxIndex][0]+'px';
			}
		}
		function moveDown() {
			if(coordinates[boxIndex][1] >= (boxSizes[boxIndex][1]-ballSize)) {
				kwadranten[boxIndex][0] = 0;
				clearInterval(timers[boxIndex][2]);
				timers[boxIndex][3] = setInterval(moveUp, speed)
				var numseg = Math.floor(coordinates[boxIndex][0]/((boxSizes[boxIndex][0]-ballSize)/numberOfSegments));
				while(numseg<0){numseg++;}
				while(numseg>numberOfSegments-1){numseg--;}
				document.getElementsByClassName("indic")[boxIndex].innerHTML = letters[letters.length-1-numseg];
				document.getElementsByClassName("audiodiv")[boxIndex].children[2].volume = document.getElementById("slider").value/100;
				document.getElementsByClassName("audiodiv")[boxIndex].children[2].src = "EG/"+ notes[2][numberOfSegments-1-numseg] +".mp3";
			}
			else {
				coordinates[boxIndex][1] += directions[boxIndex][1];
				ball.style.top = coordinates[boxIndex][1]+'px';
			}
		}
		function moveUp() {
			if(coordinates[boxIndex][1] <= 0) {
				kwadranten[boxIndex][0] = 1;
				clearInterval(timers[boxIndex][3]);
				timers[boxIndex][2] = setInterval(moveDown, speed)
				var numseg = Math.floor(coordinates[boxIndex][0]/((boxSizes[boxIndex][0]-ballSize)/numberOfSegments));
				while(numseg<0){numseg++;}
				while(numseg>numberOfSegments-1){numseg--;}
				document.getElementsByClassName("indic")[boxIndex].innerHTML = letters[numseg];
				document.getElementsByClassName("audiodiv")[boxIndex].children[3].volume = document.getElementById("slider").value/100;
				document.getElementsByClassName("audiodiv")[boxIndex].children[3].src = "EG/"+ notes[0][numseg] +".mp3";
			}
			else {
				coordinates[boxIndex][1] -= directions[boxIndex][1];
				ball.style.top = coordinates[boxIndex][1]+'px';
			}
		}
	}
}

function stopAll(){
	for (var i = 0; i < myBooleans.length; i++) {
		if (myBooleans[i]){
			moggle(i);
		}
	}
}
