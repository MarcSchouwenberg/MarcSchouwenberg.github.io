		var notes = ["C ", "G ", "D ", "A ", "E ", "B ", "F&#9839", "C&#9839", "G&#9839", "D&#9839", "A&#9839", "F "]
		// var notes = ["C ", "G ", "D ", "A ", "E ", "B ", "F#", "C#", "G#", "D#", "A#", "F "]

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

                var pri = document.createElement("span");
                for (j = 0; j<12; j++){
                    var target = document.getElementById("prime").children[1];
                	pri.innerHTML += notes[nums[j]-1] + " ";
                }
                document.getElementById("prime").replaceChild(pri, target);

                // nums.sort();
                nums.reverse();
                // console.log("indexes van rev: "+nums+"\n");

                var ret = document.createElement("span");
                for (j = 0; j<12; j++){
                    var target = document.getElementById("retrograde").children[1];
                	ret.innerHTML += notes[nums[j]-1] + " ";
                }
                document.getElementById("retrograde").replaceChild(ret, target);

                // console.log("indexes van inv: "+inv+"\n");
               
                var invrs = document.createElement("span");
                for (j = 0; j<12; j++){
                    var target = document.getElementById("inversion").children[1];
                	invrs.innerHTML += notes[inv[j]-1] + " ";
                }
                document.getElementById("inversion").replaceChild(invrs, target);

                // inv.sort();
                inv.reverse();

                // console.log("indexes van inv: "+inv+"\n");

                var invret = document.createElement("span");
                for (j = 0; j<12; j++){
                    var target = document.getElementById("invertedretrograde").children[1];
                	invret.innerHTML += notes[inv[j]-1] + " ";
                }
                document.getElementById("invertedretrograde").replaceChild(invret, target);
		}
