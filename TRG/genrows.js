var notes = ["C", "G", "D", "A", "E", "B", "F&#9839", "C&#9839", "G&#9839", "D&#9839", "A&#9839", "F"]
// var notes = ["C ", "G ", "D ", "A ", "E ", "B ", "F#", "C#", "G#", "D#", "A#", "F "]
var child;
var parent;

function generate(){
	// GENERATE TONEROWS
	//NUMS MAKEN (1,2,3,4,5,6,7,8,9,10,11,12)
	var nums = [];
	for (i = 0; i < 12; i++){
		nums[i] = i+1;
	}
	   
	//RANDOMIZE
	nums.sort(function(a, b){return 0.5 - Math.random()});

	//INVERTED MAKEN
	var inv = [];
	
	inv[0] = nums[0];

	for (i=1;i<12;i++){
		var n = nums[0]*2-nums[i];
		while(n>12){n-=12;}
		while(n<1){n+=12;}
		inv[i]=n;
	}

	// console.log("indexes van nums: "+nums+"\n");

	child = document.createElement("span");
	parent = document.getElementById("pr");
	for (j = 0; j<12; j++){
		var newNote = document.createElement("span");
		newNote.innerHTML = notes[nums[j]-1];
		child.appendChild(newNote);
	}
	parent.replaceChild(child, parent.children[1]);

	// nums.sort();
	nums.reverse();
	// console.log("indexes van rev: "+nums+"\n");

	child = document.createElement("span");
	parent = document.getElementById("re");
	for (j = 0; j<12; j++){
		var newNote = document.createElement("span");
		newNote.innerHTML = notes[nums[j]-1];
		child.appendChild(newNote);
	}
	parent.replaceChild(child, parent.children[1]);

	// console.log("indexes van inv: "+inv+"\n");
	   
	child = document.createElement("span");
	parent = document.getElementById("iv");
	for (j = 0; j<12; j++){
		var newNote = document.createElement("span");
		newNote.innerHTML = notes[inv[j]-1];
		child.appendChild(newNote);
	}
	parent.replaceChild(child, parent.children[1]);

	// inv.sort();
	inv.reverse();
	// console.log("indexes van inv: "+inv+"\n");

	child = document.createElement("span");
	parent = document.getElementById("ir");
	for (j = 0; j<12; j++){
		var newNote = document.createElement("span");
		newNote.innerHTML = notes[inv[j]-1];
		child.appendChild(newNote);
	}
	parent.replaceChild(child, parent.children[1]);
}
