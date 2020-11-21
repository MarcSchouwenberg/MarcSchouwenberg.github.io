var title = "";
function generate(){
	var newTable = document.createElement("table");
	newTable.id = "list1";
	for (var i = 0; i < maandkanjers.length; i++) {
		var newRow = document.createElement("tr");
		var dezeGroente = maandkanjers[i];
		if (document.getElementById("cb").checked) {
			// VEGAN
			if ( "ahlist2" == document.getElementById("popup").className ) {
				killPopup();
			}
			newRow.innerHTML = "<td>" + dezeGroente + "</td>"
			+"<td><a target='_blank' href='https://www.google.com/search?q=vegan+recept+" + dezeGroente + "'>Google</a></td>"
			+"<td><a target='_blank' href='https://www.ah.nl/allerhande/recepten-zoeken/speciale-wensen:veganistisch?Ntt=" + dezeGroente + "'>AH.nl</a></td>"
			+"<td><a target='_blank' href='http://www.degroenemeisjes.nl/tag/vegan/?s=" + dezeGroente + "'>DeGroeneMeisjes</a></td>"
			+"<td><a target='_blank' href='https://www.dehippevegetarier.nl/category/veganistisch-eetpatroon/?s=" + dezeGroente + "'>DeHippeVegetarier</a></td>"
			+"<td><a target='_blank' href='https://www.simplyvegan.nl/?s=" + dezeGroente + "'>SimplyVegan</a></td>"
			+"<td><a target='_blank' href='https://veganchallenge.nl/zoek-recept/?tekst=" + dezeGroente + "'>VeganChallenge</a></td>"
			+"<td><a target='_blank' href='https://lisagoesvegan.com/?s=" + dezeGroente + "'>LisaGoesVegan</a></td>"
		} else {
			// VEGETARISCH
			newRow.innerHTML = "<td>" + dezeGroente + "</td>"
			+"<td><a target='_blank' href='https://www.google.com/search?q=vegetarisch+recept+" + dezeGroente + "'>Google</a></td>"
			+"<td><a target='_blank' href='https://www.ah.nl/allerhande/recepten-zoeken/speciale-wensen:vegetarisch?Ntt=" + dezeGroente + "'>AH.nl</a></td>"
			+"<td><a target='_blank' href='http://www.degroenemeisjes.nl/index.php?cat=279&s=" + dezeGroente + "'>DeGroeneMeisjes</a></td>"
			+"<td><a target='_blank' href='https://www.dehippevegetarier.nl/?s=" + dezeGroente + "'>DeHippeVegetarier</a></td>"
		}

        if (i%2==0){newRow.style.backgroundColor = "lightgreen";}
        	else {newRow.style.backgroundColor = "white";}
		newTable.appendChild(newRow);
		// document.getElementById("list1").appendChild(newRow);
	}
	document.getElementById("parent").replaceChild(newTable, document.getElementById("list1"));
	// document.getElementsByClassName("list")[0].appendChild(newRow);
	// document.getElementById("list1").appendChild(newRow);

	if (document.getElementById("cb").checked) {
		document.querySelectorAll("button")[2].style.transform = "scaleY(0)";
		document.querySelectorAll("button")[4].style.transform = "scaleY(0)";
		document.querySelectorAll("button")[7].style.transform = "scaleY(0)";
		document.getElementById("lenslist").style.display = "none";
		document.getElementById("ahlist2").style.display = "none";
		document.getElementById("lassie2").style.display = "none";
	} else {
		document.querySelectorAll("button")[2].style.transform = "scaleY(1)";
		document.querySelectorAll("button")[4].style.transform = "scaleY(1)";
		document.querySelectorAll("button")[7].style.transform = "scaleY(1)";
	}
}

function changePopup(list, item, trgt){
	document.getElementById("popup").style.display = "block";
	if (trgt==0) {
		document.getElementById("popup").className = "lenslist";
	} else if (trgt<4){
		document.getElementById("popup").className = "ahlist"+trgt;
	} else {
		document.getElementById("popup").className = "lassie"+(trgt-3);
	}
	if (list != recepten) {
		document.getElementById("popup").innerHTML = "<img src='"+list[item][4]+"'><br><b><a target='_blank' style='color:black' href='"+list[item][2]+"'>"+list[item][1]+"</a></b><br><i>("+list[item][5]+" pers.)</i><br>"+list[item][3];
	} else {
		document.getElementById("popup").innerHTML = "<img src='https://www.lekkerensimpel.com/wp-content/uploads/2016/10/LEKKER-EN-SIMPEL-COVER-2-1.jpg'><br><b>" + list[item][0].slice(7, -6) + "</b><br>" + list[item][2].replace(/, /g, "<br>");
	}
}
function killPopup(){
	document.getElementById("popup").style.display = "none";
}
function roggle(targetID){
	var target = document.getElementById(targetID);
	if (target.style.display != "none") {
		if ( (targetID) == document.getElementById("popup").className ) {
			killPopup();
		}
		target.style.display = "none";
	} else {
		target.style.display = "block";
	}
}
function toggleRadio(itself, numCheck){
	document.getElementsByTagName("input")[numCheck].checked = "true";
	generate();
}
function createLists(){
	var searchQuery = [];
	if (document.getElementsByClassName("visible")[0].value) {
		searchQuery = document.getElementsByClassName("visible")[0].value.toLowerCase().split(" ");
		console.log("searchQuery.length = ",searchQuery.length);
		console.log("searchQuery = ",searchQuery);
	}
	var filterQuery = "___________";
	if (document.getElementsByClassName("visible")[1].value) {
		filterQuery = document.getElementsByClassName("visible")[1].value.toLowerCase();
	}

	var lists = [recepten,ahatjes,vegahtjes,vegaMisschienVegan,lasVegan,lasVega,];
	var strings = ["recepten","ahatjes","vegahtjes","vegaMisschienVegan","lasVegan","lasVega",];
	var ids = ["lenslist","ahlist1","ahlist2","ahlist3","lassie1","lassie2",];

	for (var x = 0; x < lists.length; x++) {
		var newList = document.createElement("div");
		newList.id = ids[x];
		newList.className = "list";
		newList.style.display = document.getElementById(ids[x]).style.display;
		for (var i = 0; i < lists[x].length; i++) {
			var print=false;
			var title;
			var ingred;
			if (x==0) {
				title = recepten[i][0].slice(7, -6);
				ingred = lists[x][i][2];
			} else {
				title = lists[x][i][1];
				ingred = lists[x][i][3];
			}
			for (var zzz = 0; zzz < maandkanjers.length; zzz++) {
				// minstens één van de seizoenskanjers?
				if ( title.includes(maandkanjers[zzz]) || ingred.includes(maandkanjers[zzz]) ) {
					print=true;
					break;
				}
			}
			for (var zzz = 0; zzz < forbidden.length; zzz++) {
				// één van de verboden groentes?
				if ( title.includes(forbidden[zzz]) || ingred.includes(forbidden[zzz]) ) {
					print=false;
					break;
				}
			}
			if (print) {
				if (( title.toLowerCase().includes(searchQuery) || ingred.toLowerCase().includes(searchQuery) )
					&& !( title.toLowerCase().includes(filterQuery) || ingred.toLowerCase().includes(filterQuery) )) {
					var newRec = document.createElement("span");
					if (x==0) {
						newRec.innerHTML = "<span onmouseover=\"changePopup(recepten,"+i+",0)\" onfocus=\"changePopup(recepten,"+i+",'1')\" target='_blank' href='"+recepten[i][2]+"'>"+title + "</span><br>";
					} else {
						newRec.innerHTML = "<a onmouseover=\"changePopup("+strings[x]+","+i+","+x+")\" onfocus=\"changePopup("+strings[x]+","+i+",'2')\" target='_blank' href='"+lists[x][i][2]+"'>"+title + "</a><br>";
					}
					newList.appendChild(newRec);
				}
			}
		}
		document.querySelectorAll(".container")[x].replaceChild(newList, document.getElementById(ids[x]));
		// AANTAL RECEPTEN
		document.querySelector("#num"+(x+1)).innerHTML = document.getElementById(ids[x]).childNodes.length;
	}
}

var d = new Date();
var alleGroentes = [
// 39 unieke groentes
"aardappel","andijvie","asperges","aubergine","bloemkool","bosui","broccoli","cherrytomaat","chinesekool","courgette","doperwtjes","knolselderij","komkommer","kropsla","mais","paddenstoelen","paprika","pastinaak","peultjes","pompoen","prei","prinsessenbonen","raapstelen","radicchio","radijs","rode biet","rodekool","snijbonen","spinazie","spitskool","spruiten","tomaten","tuinbonen","ui","veldsla","venkel","witlof","wortel","zoete aardappel",
];
var maandkanjers = seizoensKanjers[d.getMonth()];
var forbidden = [];
window.onload = function(){
	for (var xxx = 0, f = 0; xxx < alleGroentes.length; xxx++) {
		if ( !(maandkanjers.includes(alleGroentes[xxx])) ) {
			forbidden[f] = alleGroentes[xxx];
			f++;
		}
	}
	console.log("forbidden = " + forbidden); // = asperges,doperwtjes,paddenstoelen,pastinaak,peultjes,spruiten,tuinbonen,veldsla
	console.log("maandkanjers = " + maandkanjers);

	createLists();

	// TABEL
	var months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december",];
	document.getElementById("datum").innerText = "Datum: " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
	document.getElementById("info").innerText = "Seizoensgroentes (" + maandkanjers.length + ") van deze maand (" + months[d.getMonth()] + "):";

	generate();
}
