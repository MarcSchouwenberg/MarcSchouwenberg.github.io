
var lingoWord;
var turnsDone;
var maxTurns;
var wordSize;

window.onload = function(){
	document.getElementById("inputField").addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode === 13) {
	    	submitWord();
	    }
	});
	document.getElementById("inputField").style.opacity="0.5";
	document.getElementById("submit").style.opacity="0.5";
	document.getElementById("slider").oninput = function() {
		document.getElementById("music1").childNodes[1].volume = this.value * 0.005;
		document.getElementById("music2").childNodes[1].volume = this.value * 0.008;
	}
}

function pickaword(){
	lingoWord = words[wordSize-5][Math.floor(Math.random()*words[wordSize-5].length)];
}
function submitWord(){
	if (turnsDone<maxTurns) {
		var newInput = document.getElementById("inputField");
		while (newInput.value.charAt((newInput.value.length)-1) == " "){
			newInput.value=newInput.value.slice(0,(newInput.value.length-1));
			newInput.value=newInput.value.replace(/ /g, "");
		}
		if (newInput.value.length>wordSize) {
			document.getElementById("feedback").innerHTML="Te lang...";
		} else if (newInput.value.length<wordSize){
			document.getElementById("feedback").innerHTML="Te kort...";
		} else {
			if (newInput.value.match(/^[A-Z,a-z]+$/)) {
				newInput.value=newInput.value.toUpperCase();
				document.getElementById("feedback").innerHTML="";

				var i=0;
				var t = setInterval(printLetter, 500);
				function printLetter(){
					if (i >= newInput.value.length){
						clearInterval(t);
						turnsDone++;
						giveFeedBack();
						newInput.value="";
					} else {
						var newLetter = newInput.value.charAt(i);
						var grandChild = document.getElementById("gamefield").children[turnsDone].children[i];
						grandChild.innerHTML=newLetter;
						grandChild.style.color="white";
						if (lingoWord.indexOf(newInput.value.charAt(i),0)>-1){
							if (newInput.value.charAt(i)==lingoWord.charAt(i)) {
								document.getElementsByTagName("audio")[0].src = "lingogoed2.wav";
								document.getElementsByTagName("audio")[0].volume = 0.005 * document.getElementById("slider").value;;
								grandChild.className = 'lttr rood';
							} else {
								document.getElementsByTagName("audio")[0].src = "lingofout2.wav";
								document.getElementsByTagName("audio")[0].volume = 0.005 * document.getElementById("slider").value;;
								grandChild.className = 'lttr geel';
							}
						} else {
							document.getElementsByTagName("audio")[0].src = "lingofout.wav";
							document.getElementsByTagName("audio")[0].volume = 0.003 * document.getElementById("slider").value;;
						}
						i++;
					}
				}

				function giveFeedBack(){
					if (newInput.value==lingoWord) {
						document.getElementsByTagName("audio")[0].src = "lingowinst2.wav";
						document.getElementsByTagName("audio")[0].volume = 0.004 * document.getElementById("slider").value;;
						document.getElementsByTagName("audio")[1].src = "";
						document.getElementsByTagName("audio")[2].src = "";
						document.getElementById("feedback").innerHTML=
						"GEWONNEN!! Het was inderdaad "+lingoWord
						+"! <i>Nieuw spel? Klik op 'NIEUW SPEL'!</i><br>";
						document.getElementById("menu").classList.toggle("gone");
						document.getElementById("inputField").maxLength = 0;
						document.getElementById("inputField").style.opacity="0.5";
						document.getElementById("submit").style.opacity="0.5";
					} else if (turnsDone==maxTurns){
						document.getElementsByTagName("audio")[0].src = "lingoverlies.wav";
						document.getElementsByTagName("audio")[0].volume = 0.004 * document.getElementById("slider").value;;
						document.getElementsByTagName("audio")[1].src = "";
						document.getElementsByTagName("audio")[2].src = "";
						document.getElementById("feedback").innerHTML=
						"VERLOREN!!!! Het woord was "+lingoWord
						+"! <i>Nieuw spel? Klik op 'NIEUW SPEL'!</i><br>";
						document.getElementById("menu").classList.toggle("gone");
						document.getElementById("inputField").maxLength = 0;
						document.getElementById("inputField").style.opacity="0.5";
						document.getElementById("submit").style.opacity="0.5";
					}
				}
			} else {
				document.getElementById("feedback").innerHTML="Alleen letters...";
			}
		}
	}
}

function createGame(){
	document.getElementsByTagName("audio")[1].src = "lingotrack.wav";
	document.getElementsByTagName("audio")[1].volume = 0.005 * document.getElementById("slider").value;
	document.getElementsByTagName("audio")[2].src = "lingotrack2.wav";
	document.getElementsByTagName("audio")[2].volume = 0.008 * document.getElementById("slider").value;
	turnsDone = 0;
	for (var i = 0; i < document.forms[0].length; i++) {
		if (document.forms[0][i].checked){
			wordSize = i+5;
			document.getElementById("inputField").maxLength = i+5;
		}
	}
	for (var i = 0; i < document.forms[1].length; i++) {
		if (document.forms[1][i].checked){
			maxTurns = i+1;
		}
	}
	document.getElementById("menu").classList.toggle("gone");
	document.getElementById("inputField").focus();
	document.getElementById("inputField").style.opacity="1.0";
	document.getElementById("submit").style.opacity="1.0";
	document.getElementById("gamefield").innerHTML="";
	document.getElementById("feedback").innerHTML="";
	for (var i = 0; i < maxTurns; i++) {
		var newRow = document.createElement("div");
		newRow.className="row";
		for (var j = 0; j < wordSize; j++) {
			var letterbox = document.createElement("div");
			letterbox.className = "lttr";
			letterbox.innerHTML = "<br>";
			newRow.appendChild(letterbox);
			}
		document.getElementById("gamefield").appendChild(newRow);
	}
	pickaword();
}
