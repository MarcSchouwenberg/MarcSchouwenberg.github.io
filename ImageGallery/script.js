var num = 0;

window.onload = function(){
	document.getElementsByTagName("body")[0].addEventListener("keydown", checkKey);
	//gallerize();
	sliderize();
	for (x=0 ; x<opts.length ; x++){
		var btn = document.createElement("button");
		btn.id = opts[x][0];
		btn.innerHTML = opts[x][1];
		btn.title = opts[x][2];
		btn.style.display = "block";
		btn.addEventListener("click", function(){
			changelist(this.id);
			})
		document.getElementById("row_a").appendChild(btn);
	}
}

function render(){
	switch(document.getElementsByTagName("div")[1].className){
		case 'slider':
			sliderize();
			break;
		case 'gall_h':
			gallerize();
			break;
	}
}

function gallerize(){
	var gallery = document.createElement("div");
	gallery.className = "gall_h";
	document.getElementsByTagName("body")[0].replaceChild(gallery, document.getElementsByTagName("div")[1]);

	pix.sort((a, b) => {return 0.5 - Math.random()});
	var i = 0;
	while (i<pix.length && i<50){
		var item = document.createElement("div");
		item.className = "slide";
		item.style.height="50vh";
		item.style.margin = "auto";
		item.style.display = "inline-block";
		item.style.verticalAlign = "top";
		var pic = document.createElement("img");
		pic.src = pix[i];
		item.appendChild(pic);
		var parent = document.getElementsByClassName("gall_h")[0];
		parent.style.overflow = "visible";
		
		// VERTICALe
		pic.style.height = "100%";
		parent.style.height = "100%";
		
		// HORIZONTAL
		/*
		pic.style.height = "100%";
		parent.style.height = "100%";
		parent.style.whiteSpace = "nowrap";
		parent.style.display = "inline-block";
		parent.style.verticalAlign = "top";
		*/

		parent.appendChild(item);
		i++;
	}
}

function sliderize(){
	var gallery = document.createElement("div");
	gallery.className = "slider";
	gallery.style.backgroundColor = "";
	gallery.style.height = "100vh";
	gallery.style.maxWidth = "100%";
	document.getElementsByTagName("body")[0].replaceChild(gallery, document.getElementsByTagName("div")[1]);

	gallery.addEventListener("dblclick", next);

	pix.sort((a, b) => {return 0.5 - Math.random()});

	var pic = document.createElement("img");
	pic.id="slide";
	pic.style.height="100%";
	pic.style.margin = "auto";
	pic.style.display = "block";
	pic.src=pix[0];
	var parent = document.getElementsByClassName("slider")[0];
	parent.appendChild(pic);

	var btns = document.createElement("div");
	var btn1 = document.createElement("button");
	btn1.innerText = "Previous";
	btn1.id = "prev";
	btn1.addEventListener("click", prev);
	
	var btn2 = document.createElement("button");
	btn2.innerText = "Next";
	btn2.id = "next";
	btn2.addEventListener("click", next);
	
	btns.appendChild(btn1);
	btns.appendChild(btn2);
	btns.id = "prevnext";
	document.getElementsByTagName("body")[0].replaceChild(btns, document.getElementById("prevnext"));

};

function checkKey(e) {
	e = e || window.event;
	switch(e.keyCode){
		case 81 : // q
		   togglemenu();
		   break;
		case 83 : // s
		   sliderize();
		   break;
		case 71 : // g
		   gallerize();
		   break;
		case 75 : // k
		   toggleprevnext();
		   break;
	}
	if(document.getElementsByTagName("div")[1].className=='slider'){
		switch(e.keyCode){
			case 38: // up arrow
			   tenfwd();
			   break;
			case 40: // down arrow
			   tenback();
			   break;
			case 37: // left arrow
			case 66: // b
			   prev();
			   break;
			case 39: // right arrow
			case 78: // n
			   next();
			   break;
		}
	}
}

function next() {
	var newpic = document.getElementById('slide');
	num++;
	while(num >= pix.length) {
		num = 0;
	}
	newpic.src = pix[num];
}
function prev() {
	var newpic = document.getElementById('slide');
	num--;
	while(num < 0) {
		num = pix.length-1;
	}
	newpic.src = pix[num];
}
function tenfwd() {
	var newpic = document.getElementById('slide');
	num+=10;
	while(num >= pix.length) {
		num-=pix.length;
	}
	newpic.src = pix[num];
}
function tenback() {
	var newpic = document.getElementById('slide');
	num-=10;
	while(num < 0) {
		num+=pix.length;
	}
	newpic.src = pix[num];
}

function changelist(bronlijst){
	var source = document.createElement("script");
	source.src = bronlijst+"list.js";
	source.id = "srclist";
	document.getElementsByTagName("head")[0].replaceChild(source, document.getElementById("srclist"));
	setTimeout(render, 500);
}
function togglemenu(){
	if (document.getElementById("menu").style.display!="none"){
		document.getElementById("menu").style.display="none";
	} else {document.getElementById("menu").style.display="inline-block"};
}
function toggleprevnext(){
	if (document.getElementById("prevnext").style.display!="none"){
		document.getElementById("prevnext").style.display="none";
	} else {document.getElementById("prevnext").style.display="inline-block"};
}
