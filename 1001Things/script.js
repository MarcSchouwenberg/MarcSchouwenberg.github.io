var chosenList;

window.onload = function(){
    for (var i = 0; i < opts.length; i++) {
        var newButton = document.createElement("button");
        newButton.className = "button1";
        newButton.id = i;
        newButton.onclick = function(){changelist(this.id)};
        newButton.innerHTML = opts[i][0] + "&#133";
        newButton.style.display = "block";
        newButton.style.animationDelay = (i/5)+'s';
        document.getElementById("buttons").appendChild(newButton);
    }
}

function render(){
    var newTable = document.createElement("table");
    newTable.id = "list";
    var newRow = document.createElement("tr");
    newRow.style.backgroundColor = "green";
    newRow.style.color = "white";
    var newData = document.createElement("td");
    newData.colSpan = list[0].length;
    newData.style.textAlign = "center";
    newData.innerHTML = opts[chosenList][1] + " (<a style='color: lightblue' target='_blank' href='"+opts[chosenList][2]+"'>source</a>)";
    newRow.appendChild(newData);
    newTable.appendChild(newRow);

    var newRow = document.createElement("tr");
    newRow.style.backgroundColor = "green";
    newRow.style.color = "white";
    for (var j = 1; j < list[0].length; j++) {
        var newData = document.createElement("td");
        newData.innerHTML = list[0][j];
        newRow.appendChild(newData);
    }
    newTable.appendChild(newRow);
    for (var i = 1; i < list.length; i++) {
        var newRow = document.createElement("tr");
        for (var j = 0; j < list[i].length; j++) {
            var newData = document.createElement("td");
            if (j==list[0][0][0]) {
                var newLink = document.createElement("a");
                newLink.href = "https://www.google.com/search?q=" + encodeURIComponent(list[i][j]) + " " + encodeURIComponent(list[i][list[0][0][1]]) + "&tbm=isch";
                newLink.target = "_blank";
                newLink.innerHTML = "<img style='height: 15px; margin-right: 5px' src='img.png'>";
                newData.appendChild(newLink);
                newLink = document.createElement("a");
                newLink.href = "https://www.google.com/search?q=" + encodeURIComponent(list[i][j]) + " " + encodeURIComponent(list[i][list[0][0][1]]);
                newLink.target = "_blank";
                newLink.innerText = list[i][j];
                newData.appendChild(newLink);
            } else {
                newData.innerHTML = list[i][j];
            }
            newRow.appendChild(newData);
        }
        if (i%2==0) {
            newRow.style.backgroundColor = "lightgreen";
        } else {
            newRow.style.backgroundColor = "lightblue";
        }
        newTable.appendChild(newRow);
    }
    document.getElementsByTagName("body")[0].replaceChild(newTable, document.getElementById("list"));
}

function changelist(newlist){
    chosenList = newlist;
    var source = document.createElement("script");
    source.id = "srclist";
    source.src = "" + opts[chosenList][0]+".js";

    document.getElementsByTagName("head")[0].replaceChild(source, document.getElementById("srclist"));

    setTimeout(render, 500);

}
