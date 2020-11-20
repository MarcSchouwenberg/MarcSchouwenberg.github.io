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
	if (trgt<4) {
		document.getElementById("popup").className = "ahlist"+trgt;
	} else {
		document.getElementById("popup").className = "lassie"+(trgt-3);
	}
	document.getElementById("popup").innerHTML = "<img src='"+list[item][4]+"'><br><b><a target='_blank' style='color:black' href='"+list[item][2]+"'>"+list[item][1]+"</a></b><br><i>("+list[item][5]+" pers.)</i><br>"+list[item][3];
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

	// Lekker & Simpel
	var newList = document.createElement("div");
	newList.id = "lenslist";
	newList.className = "list";
	newList.style.display = document.getElementById("lenslist").style.display;
	for (var i = 0; i < recepten.length; i++) {
		var print=false;
		var title = recepten[i][0].slice(7, -6);
		var ingred = recepten[i][2];
		for (var zzz = 0; zzz < maandkanjers.length; zzz++) {
			// bevat het recept minstens één van de seizoenskanjers?
			if ( ingred.includes(maandkanjers[zzz]) ) {
				print=true;
				break;
			}
		}
		for (var zzz = 0; zzz < forbidden.length; zzz++) {
			// bevat het recept één van de verboden groentes?
			if ( ingred.includes(forbidden[zzz]) ) {
				print=false;
				break;
			}
		}
		if (print) {
			// PRINT !!!!!!!!
			if (( title.toLowerCase().includes(searchQuery) || ingred.toLowerCase().includes(searchQuery) )
				&& !( title.toLowerCase().includes(filterQuery) || ingred.toLowerCase().includes(filterQuery) )) {
				var newRec = document.createElement("span");
				newRec.innerHTML = title + "<br>";
				newRec.title = ingred;
				newList.appendChild(newRec);
			}
		}
	}
	document.querySelectorAll(".container")[0].replaceChild(newList, document.getElementById("lenslist"));


	// vegan @ AH.nl
	var newList = document.createElement("div");
	newList.id = "ahlist1";
	newList.className = "list";
	newList.style.display = document.getElementById("ahlist1").style.display;
	for (var i = 0; i < ahatjes.length; i++) {
		var print=false;
		var title = ahatjes[i][1];
		var ingred = ahatjes[i][3];
		for (var zzz = 0; zzz < maandkanjers.length; zzz++) {
			// bevat het recept minstens één van de seizoenskanjers?
			if ( ingred.includes(maandkanjers[zzz]) ) {
				print=true;
				break;
			}
		}
		for (var zzz = 0; zzz < forbidden.length; zzz++) {
			// bevat het recept één van de verboden groentes?
			if ( ingred.includes(forbidden[zzz]) ) {
				print=false;
				break;
			}
		}
		var sqFound = true;
		if ( title.toLowerCase().includes(searchQuery) || ingred.toLowerCase().includes(searchQuery) ){
			sqFound = true;
		} else {
			sqFound = false;
		}
		// if ( (title.toLowerCase().includes(searchQuery[0]) || ingred.toLowerCase().includes(searchQuery[0])) && 
		// 	 (title.toLowerCase().includes(searchQuery[1]) || ingred.toLowerCase().includes(searchQuery[1])) ){
		// 	sqFound = true;
		// } else {
		// 	sqFound = false;
		// }
		var fqFound = true;
		if ( title.toLowerCase().includes(filterQuery) || ingred.toLowerCase().includes(filterQuery) ){
			fqFound = true;
		} else {
			fqFound = false;
		}
		if (print) {
			// PRINT !!!!!!!!
			if ( sqFound && !fqFound) {
				var pic = document.createElement("div");
				pic.innerHTML = "<img src='"+ahatjes[i][4]+"'>";
				var newRec = document.createElement("span");
				newRec.innerHTML = "<a onmouseover=\"changePopup(ahatjes,"+i+",1)\" onfocus=\"changePopup(ahatjes,"+i+",'1')\" target='_blank' href='"+ahatjes[i][2]+"'>"+title + "</a><br>";
				// newRec.title = ingred;
				// newRec.title = pic + ingred;
				newList.appendChild(newRec);
			}
		}
	}
	document.querySelectorAll(".container")[1].replaceChild(newList, document.getElementById("ahlist1"));

	// vega @ AH.nl
	var newList = document.createElement("div");
	newList.id = "ahlist2";
	newList.className = "list";
	newList.style.display = document.getElementById("ahlist2").style.display;
	for (var i = 0; i < vegahtjes.length; i++) {
		var print=false;
		var title = vegahtjes[i][1];
		var ingred = vegahtjes[i][3];
		for (var zzz = 0; zzz < maandkanjers.length; zzz++) {
			// bevat het recept minstens één van de seizoenskanjers?
			if ( ingred.includes(maandkanjers[zzz]) ) {
				print=true;
				break;
			}
		}
		for (var zzz = 0; zzz < forbidden.length; zzz++) {
			// bevat het recept één van de verboden groentes?
			if ( ingred.includes(forbidden[zzz]) ) {
				print=false;
				break;
			}
		}
		if (print) {
			// PRINT !!!!!!!!
			if (( title.toLowerCase().includes(searchQuery) || ingred.toLowerCase().includes(searchQuery) )
				&& !( title.toLowerCase().includes(filterQuery) || ingred.toLowerCase().includes(filterQuery) )) {
				var pic = document.createElement("div");
				pic.innerHTML = "<img src='"+vegahtjes[i][4]+"'>";
				var newRec = document.createElement("span");
				newRec.innerHTML = "<a onmouseover=\"changePopup(vegahtjes,"+i+",2)\" onfocus=\"changePopup(vegahtjes,"+i+",'2')\" target='_blank' href='"+vegahtjes[i][2]+"'>"+title + "</a><br>";
				// newRec.title = ingred;
				// newRec.title = pic + ingred;
				newList.appendChild(newRec);
			}
		}
	}
	document.querySelectorAll(".container")[2].replaceChild(newList, document.getElementById("ahlist2"));

	// vegaMisschienVegan @ AH.nl
	var newList = document.createElement("div");
	newList.id = "ahlist3";
	newList.className = "list";
	newList.style.display = document.getElementById("ahlist3").style.display;
	for (var i = 0; i < vegaMisschienVegan.length; i++) {
		var print=false;
		var title = vegaMisschienVegan[i][1];
		var ingred = vegaMisschienVegan[i][3];
		for (var zzz = 0; zzz < maandkanjers.length; zzz++) {
			// bevat het recept minstens één van de seizoenskanjers?
			if ( ingred.includes(maandkanjers[zzz]) ) {
				print=true;
				break;
			}
		}
		for (var zzz = 0; zzz < forbidden.length; zzz++) {
			// bevat het recept één van de verboden groentes?
			if ( ingred.includes(forbidden[zzz]) ) {
				print=false;
				break;
			}
		}
		if (print) {
			// PRINT !!!!!!!!
			if (( title.toLowerCase().includes(searchQuery) || ingred.toLowerCase().includes(searchQuery) )
				&& !( title.toLowerCase().includes(filterQuery) || ingred.toLowerCase().includes(filterQuery) )) {
				var pic = document.createElement("div");
				pic.innerHTML = "<img src='"+vegaMisschienVegan[i][4]+"'>";
				var newRec = document.createElement("span");
				newRec.innerHTML = "<a onmouseover=\"changePopup(vegaMisschienVegan,"+i+",3)\" onfocus=\"changePopup(vegaMisschienVegan,"+i+",'3')\" target='_blank' href='"+vegaMisschienVegan[i][2]+"'>"+title + "</a><br>";
				// newRec.title = ingred;
				// newRec.title = pic + ingred;
				newList.appendChild(newRec);
			}
		}
	}
	document.querySelectorAll(".container")[3].replaceChild(newList, document.getElementById("ahlist3"));

	// vegan @ LASSIE.nl
	var newList = document.createElement("div");
	newList.id = "lassie1";
	newList.className = "list";
	newList.style.display = document.getElementById("lassie1").style.display;
	for (var i = 0; i < lasVegan.length; i++) {
		var print=false;
		var title = lasVegan[i][1];
		var ingred = lasVegan[i][3];
		for (var zzz = 0; zzz < maandkanjers.length; zzz++) {
			// bevat het recept minstens één van de seizoenskanjers?
			if ( ingred.includes(maandkanjers[zzz]) ) {
				print=true;
				break;
			}
		}
		for (var zzz = 0; zzz < forbidden.length; zzz++) {
			// bevat het recept één van de verboden groentes?
			if ( ingred.includes(forbidden[zzz]) ) {
				print=false;
				break;
			}
		}
		if (print) {
			// PRINT !!!!!!!!
			if (( title.toLowerCase().includes(searchQuery) || ingred.toLowerCase().includes(searchQuery) )
				&& !( title.toLowerCase().includes(filterQuery) || ingred.toLowerCase().includes(filterQuery) )) {
				var pic = document.createElement("div");
				pic.innerHTML = "<img src='"+lasVegan[i][4]+"'>";
				var newRec = document.createElement("span");
				newRec.innerHTML = "<a onmouseover=\"changePopup(lasVegan,"+i+",4)\" onfocus=\"changePopup(lasVegan,"+i+",'4')\" target='_blank' href='"+lasVegan[i][2]+"'>"+title + "</a><br>";
				// newRec.title = ingred;
				// newRec.title = pic + ingred;
				newList.appendChild(newRec);
			}
		}
	}
	document.querySelectorAll(".container")[4].replaceChild(newList, document.getElementById("lassie1"));

	// vega @ LASSIE.nl
	var newList = document.createElement("div");
	newList.id = "lassie2";
	newList.className = "list";
	newList.style.display = document.getElementById("lassie2").style.display;
	for (var i = 0; i < lasVega.length; i++) {
		var print=false;
		var title = lasVega[i][1];
		var ingred = lasVega[i][3];
		for (var zzz = 0; zzz < maandkanjers.length; zzz++) {
			// bevat het recept minstens één van de seizoenskanjers?
			if ( ingred.includes(maandkanjers[zzz]) ) {
				print=true;
				break;
			}
		}
		for (var zzz = 0; zzz < forbidden.length; zzz++) {
			// bevat het recept één van de verboden groentes?
			if ( ingred.includes(forbidden[zzz]) ) {
				print=false;
				break;
			}
		}
		if (print) {
			// PRINT !!!!!!!!
			if (( title.toLowerCase().includes(searchQuery) || ingred.toLowerCase().includes(searchQuery) )
				&& !( title.toLowerCase().includes(filterQuery) || ingred.toLowerCase().includes(filterQuery) )) {
				var pic = document.createElement("div");
				pic.innerHTML = "<img src='"+lasVega[i][4]+"'>";
				var newRec = document.createElement("span");
				newRec.innerHTML = "<a onmouseover=\"changePopup(lasVega,"+i+",5)\" onfocus=\"changePopup(lasVega,"+i+",'5')\" target='_blank' href='"+lasVega[i][2]+"'>"+title + "</a><br>";
				// newRec.title = ingred;
				// newRec.title = pic + ingred;
				newList.appendChild(newRec);
			}
		}
	}
	document.querySelectorAll(".container")[5].replaceChild(newList, document.getElementById("lassie2"));

	// AANTAL RECEPTEN TELLEN
	document.querySelector("#num1").innerHTML = document.getElementById("lenslist").childNodes.length;
	document.querySelector("#num2").innerHTML = document.getElementById("ahlist1").childNodes.length;
	document.querySelector("#num3").innerHTML = document.getElementById("ahlist2").childNodes.length;
	document.querySelector("#num4").innerHTML = document.getElementById("ahlist3").childNodes.length;
	document.querySelector("#num5").innerHTML = document.getElementById("lassie1").childNodes.length;
	document.querySelector("#num6").innerHTML = document.getElementById("lassie2").childNodes.length;
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
