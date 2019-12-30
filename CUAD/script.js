var notes = ["C", "C&#9839;", "D", "D&#9839;", "E", "F", "F&#9839;", "G", "G&#9839;", "A", "A&#9839;", "B",];
var sharps = ["C", "C&#9839;", "D", "D&#9839;", "E", "F", "F&#9839;", "G", "G&#9839;", "A", "A&#9839;", "B",];
var dsharpminor = ["C", "C&#9839;", "D", "D&#9839;", "E", "E&#9839;", "F&#9839;", "G", "G&#9839;", "A", "A&#9839;", "B",];
var flats = ["C", "D&#9837;", "D", "E&#9837;", "E", "F", "G&#9837;", "G", "A&#9837;", "A", "B&#9837;", "B",];

var majorsteps = [0,2,4,5,7,9,11,12];
var minorsteps = [0,2,3,5,7,8,10,12];
var typesteps = [majorsteps, minorsteps];
var colors = [ // https://www.w3schools.com/colors/colors_picker.asp
	"rgb(204, 255, 255)",
	"rgb(204, 255, 204)",
	"rgb(204, 255, 153)",
	"rgb(204, 255, 102)",
	"rgb(204, 255, 51)",
	"rgb(204, 255, 0)",
	"rgb(255, 255, 0)",
	"rgb(255, 255, 153)",
	"rgb(255, 255, 204)",
	"rgb(255, 204, 153)",
]
var numberlist = [];
var countUp = 0;
var aantalsetjes;

window.onload = function(){
	create();
	aantalsetjes = document.getElementById("tweede").childElementCount;
	for (var i = 0; i < aantalsetjes; i++) {
		numberlist[i] = i;
	}
	numberlist.sort(function(a, b){return 0.5 - Math.random()});
	stackify();
}

function draw(selectedid){
	if(countUp<aantalsetjes){
		var target = document.getElementsByClassName(selectedid)[0];
		target.innerHTML = document.getElementsByTagName("p")[numberlist[countUp]].innerHTML;
		countUp++;
		stackify();
	}
}

function stackify(){
	document.getElementById("stack").innerHTML=aantalsetjes-countUp;
}

function create(){
	var jj;
	function voegNootToe(){
		oct = startoct+yy;
		var newnote = document.createElement("div");
		newnote.style.display="inline-block";
		newnote.style.padding="2%";
		var xx = ii + typesteps[mm][jj];
		while(xx>notes.length-1){xx = xx-12; oct++}
		while(xx<0){xx = xx+12; oct--}
		if ((kk == 0 && jj == 0) || (kk == 1 && jj == typesteps[mm].length-1)) {
			newnote.innerHTML = " " + notes[xx] + "" + oct + "<br>";
			newnote.style.backgroundColor = "yellow";
			newnote.style.borderRadius = "1.5vw";
		} else {
			newnote.innerHTML = " " + notes[xx];
		}
		newCard.appendChild(newnote);
		if ((kk == 0 && jj == 4) || (kk == 1 && jj == 3)) {
			newCard.appendChild(document.createElement("br"));
		}
	}

	function up1(){
		for (jj = 0; jj < (typesteps[mm].length); jj++) {voegNootToe();}
	}
	function up2(){
		for (jj = (typesteps[mm].length)*0.5; jj < typesteps[mm].length; jj++) {voegNootToe();}
	}
	function down1(){
		for (jj = typesteps[mm].length-1; jj >= 0 ; jj--) {voegNootToe();}
	}
	function down2(){
		for (jj = (typesteps[mm].length)*0.5-1; jj >= 0 ; jj--) {voegNootToe();}
	}

	var kindofrows = [up1,down1,]
	var beginnoot = 7;
	var startoct = 2;
	var oct;
	var nrocts = 1;
	for (var mm = 0; mm < typesteps.length; mm++) {
		for (var yy = 0; yy < nrocts; yy++) {
			for (var kk = 0; kk < kindofrows.length; kk++) {
				for (var ii = beginnoot; ii <= beginnoot+11; ii++) {
					if (mm==0) {
						switch(ii-beginnoot){
							case 1:
							case 3:
							case 6:
							case 8:
							case 10:
								notes=flats;
							break;
							case 11:
								notes=dsharpminor;
							break;
							default:
								notes=sharps;
						}
					}
					if(mm==1) {
						switch(ii-beginnoot){
							case 0:
							case 3:
							case 5:
							case 7:
							case 10:
								notes=flats;
							break;
							case 8:
								notes=dsharpminor;
							break;
							default:
								notes=sharps;
						}
					}
					var newCard = document.createElement("p");
					kindofrows[kk]();
					document.getElementById("tweede").appendChild(newCard);
				}
			}
		}
	}
}
