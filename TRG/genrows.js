var notes = ["C", "G", "D", "A", "E", "B", "F&#9839", "C&#9839", "G&#9839", "D&#9839", "A&#9839", "F"]
var parent, newRow, newNote, nums = [], inv = [];

function generate(){
	// generate tone rows
	// nums (1,2,3,4,5,6,7,8,9,10,11,12)
	for (i = 1; i < 13; i++){
		nums[i] = i;
	}

	// randomize
	nums.sort(function(a, b){return 0.5 - Math.random()});

	// inversion
	inv[0] = nums[0];
	for (i=1;i<12;i++){
		var n = nums[0]*2-nums[i];
		while(n>12){n-=12;}
		while(n<1){n+=12;}
		inv[i]=n;
	}

	parent = document.getElementById("pr");
	newRow = document.createElement("span");
	for (j = 0; j<12; j++){
		newNote = document.createElement("span");
		newNote.innerHTML = notes[nums[j]-1];
		newRow.appendChild(newNote);
	}
	parent.replaceChild(newRow, parent.children[1]);

	parent = document.getElementById("re");
	parent.replaceChild(newRow.cloneNode(true), parent.children[1]);

	parent = document.getElementById("iv");
	newRow = document.createElement("span");
	for (j = 0; j<12; j++){
		newNote = document.createElement("span");
		newNote.innerHTML = notes[inv[j]-1];
		newRow.appendChild(newNote);
	}
	parent.replaceChild(newRow, parent.children[1]);

	parent = document.getElementById("ir");
	parent.replaceChild(newRow.cloneNode(true), parent.children[1]);
}
