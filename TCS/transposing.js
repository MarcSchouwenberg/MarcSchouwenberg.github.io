var sharps = ["C", "C&#9839", "D", "D&#9839", "E", "F", "F&#9839", "G", "G&#9839", "A", "A&#9839", "B",
             "C", "C&#9839", "D", "D&#9839", "E", "F", "F&#9839", "G", "G&#9839", "A", "A&#9839"];

var flats = ["C", "D&#9837", "D", "E&#9837", "E", "F", "G&#9837", "G", "A&#9837", "A", "B&#9837", "B",
             "C", "D&#9837", "D", "E&#9837", "E", "F", "G&#9837", "G", "A&#9837", "A", "B&#9837"];

var notes = sharps;
var color="no";

function toggle(){
    if (notes==sharps){
        notes=flats;
        document.getElementById("tog").innerHTML = "&#9839/<u>&#9837</u>";
    } else {
        notes=sharps;
        document.getElementById("tog").innerHTML = "<u>&#9839</u>/&#9837";
    }

    var selInd = document.getElementById("keys").selectedIndex;

    for (x=0;x<12;x++){
        var opt = document.createElement("option");
        opt.value=x;
        
        switch(document.getElementsByTagName("mm")[0].innerHTML){
            case "m":
            case "min":
            case "minor":
            case "mineur":
            case "klein":
                opt.innerHTML=notes[x]+"m";
                break;
            default:
                opt.innerHTML=notes[x];
        }

        var keys = document.getElementById("keys");
        keys.replaceChild(opt, keys.childNodes[x]);

        if (x==selInd){
            keys.selectedIndex = x;
        }
        if (keys.childNodes[12]){
            keys.removeChild(keys.childNodes[12]);
        }
    }
    printTable();
}

function toggleColor(){
    //TOGGLE COLOR
    if (color=="yes"){
        color="no";
        console.log("color='no';");
        document.getElementsByTagName("link")[0].href = "transposingNOCOLOr.css";
    } else if (color=="no"){
        color="yes";
        console.log("color='yes';");
        document.getElementsByTagName("link")[0].href = "transposing.css";
    }
}

window.onload = function(){
    var targetlist = document.getElementById("songselect");
    for (var i = 0; i < songs.length; i++) {
        var songopt = document.createElement("option");
        songopt.value = i;
        songopt.innerHTML = songs[i];
        targetlist.appendChild(songopt);
    }

};

function changeScript(){
    var newscript = document.createElement("script");
    var ss = document.getElementById("songselect");
    var selsong = ss.options[ss.selectedIndex].innerHTML;
    newscript.src = selsong + ".js";
    document.getElementsByTagName("head")[0].replaceChild(newscript, document.getElementsByTagName("script")[2]);
    setTimeout(renderSong, 500);

}

function renderSong(){

document.getElementsByTagName("title")[0].innerHTML = songinfo["songtitle"] + " - Transposable";

var newParent = document.createElement("div");
newParent.id = "parentDiv";

var newSong = document.createElement("song");
newSong.id = "song";
newSong.innerHTML = songinfo["songtitle"] + "<br>in ";

var origKey = songinfo["key"];
var newOk = document.createElement("ok");
newOk.innerHTML = origKey;
newOk.style.display = "none";


    switch(origKey){
        case "F":
        case "Bb":
        case "Eb":
        case "Ab":
        case "Db":
        case "Gb":
            origKey=origKey.replace("b","&#9837");
        case "Es":
        case "As":
            origKey=origKey.replace("s","&#9837");
        case "Bes":
        case "Des":
        case "Ges":
            origKey=origKey.replace("es","&#9837");
            notes=flats;
            break;

        case "C#":
        case "D#":
        case "F#":
        case "G#":
        case "A#":
            origKey=origKey.replace("#","&#9839");
        case "Cis":
        case "Dis":
        case "Fis":
        case "Gis":
        case "Ais":
            origKey=origKey.replace("is","&#9839");
            break;

    }




var newMm = document.createElement("mm");
newMm.innerHTML = songinfo["min/maj"];
newMm.style.display = "none";

var newSelect = document.createElement("select");
newSelect.id = "keys";
newSelect.addEventListener("change", transposeChords);

    for (x=0;x<12;x++){
        var opt = document.createElement("option");
        opt.value=x;
        
        switch(songinfo["min/maj"]){
            case "m":
            case "min":
            case "minor":
            case "mineur":
            case "klein":
                opt.innerHTML=notes[x]+"m";
                break;
            default:
                opt.innerHTML=notes[x];
        }

        newSelect.appendChild(opt);

        if (notes[x] == origKey){
            newSelect.selectedIndex = x;
        }
    }

var newPar = document.createElement("div");
newPar.id = "timesig";
newPar.innerHTML = songinfo["time(signature)"];

var newButton = document.createElement("button");
newButton.id = "tog";
newButton.addEventListener("click", toggle);
switch(songinfo["sharp/flat"]){
    case "flat":
    newButton.innerHTML = "&#9839/<u>&#9837</u>";
    notes = flats;
    break;
    case "sharp":
    newButton.innerHTML = "<u>&#9839</u>/&#9837";
    notes = sharps;
    break;
    default:
    newButton.innerHTML = "<u>&#9839</u>/&#9837";
    notes = sharps;
}

var newTable = document.createElement("table");

newParent.appendChild(newSong);
newParent.appendChild(newOk);
newParent.appendChild(newMm);
newParent.appendChild(newSelect);
newParent.appendChild(newPar);
newParent.appendChild(newButton);
newParent.appendChild(newTable);

document.getElementsByTagName("body")[0].replaceChild(newParent, document.getElementById("parentDiv"));
    printTable();
    document.getElementsByTagName("select")[0].setAttribute("autofocus", true);

}

function printTable(){

    var oldtable = document.getElementsByTagName("table")[0];
    var newtable = document.createElement("table");
    for (var i = 0; i < songinfo["structure"].length; i++) {
        var newrow = document.createElement("tr");
        if (songinfo["structure"][i][0]=="TXT") {
            var newmeasure = document.createElement("td");
            newmeasure.innerHTML = songinfo["structure"][i][1];
            newmeasure.colSpan = 8;
            newrow.appendChild(newmeasure);
        } else if (songinfo["structure"][i][0]=="BR") {
            var newmeasure = document.createElement("td");
            newmeasure.innerHTML = "<br>";
            newrow.appendChild(newmeasure);
        } else {
            for (var j = 0; j < songinfo["structure"][i].length; j++) {
                var newmeasure = document.createElement("td");
                for (var k = 0; k < songinfo["structure"][i][j].length; k++) {
                    var newchord = document.createElement("div");
                    newchord.style.display = "inline-block";
                    newchord.style.width = 95/songinfo["structure"][i][j].length + "%";
                    newchord.innerHTML = "<c id="+songinfo["structure"][i][j][k][0]+"></c>";
                    if (songinfo["structure"][i][j][k].length>1) {
                        switch(songinfo["structure"][i][j][k][1]){
                            case null:
                            case "_":
                            case "___":
                                break;
                            case "()":
                            case "(":
                            case ")":
                                newchord.innerHTML="(<c id="+songinfo["structure"][i][j][k][0]+"></c>)";
                                break;
                            case "/":
                                newchord.innerHTML="<c id="+songinfo["structure"][i][j][k][0]+"></c>/<c id="+songinfo["structure"][i][j][k][2]+"></c>";
                                break;
                            case "dim7":
                                newchord.innerHTML+="&#176".sup();
                                newchord.innerHTML+="7".sup();
                                break;
                            case "dim":
                                newchord.innerHTML+="<sup>&#176</sup>";
                                break;
                            case "~":
                                newchord.innerHTML+=songinfo["structure"][i][j][k][1];
                                break;
                            default:
                                newchord.innerHTML+="<sup>"+songinfo["structure"][i][j][k][1]+"</sup>";
                                if ((newchord.innerHTML.indexOf("b")) > -1) {
                                    newchord.innerHTML=newchord.innerHTML.replace("b", "&#9837;");
                                }
                                if ((newchord.innerHTML.indexOf("#")) > -1) {
                                    newchord.innerHTML=newchord.innerHTML.replace("#", "&#9839;");
                                }
                        }
                    }
                    if (songinfo["structure"][i][j][k].length>2) {
                        newchord.innerHTML+="/<c id="+songinfo["structure"][i][j][k][3]+"></c>";
                    }
                    newmeasure.style.borderRight = "1px solid black";
                    if (j==0) {
                        newmeasure.style.borderLeft = "1px solid black";
                        newmeasure.style.paddingLeft = "2.5px";
                    }
                    newmeasure.appendChild(newchord);
                }
                newrow.appendChild(newmeasure);
            }
        }
        newtable.appendChild(newrow);
    }
    document.getElementsByTagName("div")[0].replaceChild(newtable, oldtable);
    transposeChords();

}

function transposeChords(){
    var e = document.getElementById("keys");
    var sel = Number(e.options[e.selectedIndex].value);

    var ch = document.getElementsByTagName("c");
    for (x=0;x<ch.length;x++){
        for (y=0;y<12;y++){
            if (ch[x].id==y){
                ch[x].innerHTML = notes[sel+y];
            }
        }
    }
}