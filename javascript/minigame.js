// Laurin und Kai
var reihe = 3;
var spalten = 3;

var aktuellesTeil;
var platzhalterTeil;

var zuege = 0;

var reihenfolgeBilder = ["2", "7", "5", "1", "8", "6", "3", "9", "4"]

window.onload = function(){
    for (let r=0; r< reihe; r++){
        for(let s=0; s< spalten; s++){

            let teil = document.createElement("img");
            teil.id = r.toString() + "-" + s.toString();
            teil.src = /img/ + reihenfolgeBilder.shift() + ".jpg"

            teil.addEventListener("dragstart", dragStart); //anklicken eines Bildes um es zu bewegen
            teil.addEventListener("dragover", dragOver); //bewegen der Maus während man ein Bild angeklickt hat
            teil.addEventListener("dragenter", dragEnter); //bewegen eines Bildes auf ein anderes
            teil.addEventListener("dragleave", dragLeave); // verlassen des alten Platzes
            teil.addEventListener("drop", dragDrop);  //bewegen eines Bildes auf ein anderes und loslassen
            teil.addEventListener("dragend", dragEnd); //nach dragDrop, tauschen der Bilder

            document.getElementById("oberflaeche").append(teil)
        }
    }
}

function dragStart() {
    aktuellesTeil = this; //dieses Bild wird bewegt
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    platzhalterTeil = this; //das bezieht sich darauf, dass das Bild abgelegt wird
}

function dragEnd() {

    if (!platzhalterTeil.src.includes("4.jpg")){
        return;
    }

    var aktPosition = aktuellesTeil.id.split("-"); // 0-0 -> ["0","0"]
    var r = parseInt(aktPosition[0]);
    var s = parseInt(aktPosition[1]);

    var anderePosition = platzhalterTeil.id.split("-");
    var r2 = parseInt(anderePosition[0]);
    var s2 = parseInt(anderePosition[1]);

    var bewegenlinks = r === r2 && s2 === s-1;
    var bewegenrechts = r === r2 && s2 === s+1;

    var bewegenhoch = s === s2 && r-1;
    var bewegenrunter = s=== s2 && r+1;

    var isAdjacent = bewegenlinks || bewegenrechts || bewegenhoch || bewegenrunter

    if (isAdjacent){
        var aktuellesTeilImg = aktuellesTeil.src;
        var platzhalterImg = platzhalterTeil.src;

        aktuellesTeil.src = platzhalterImg;
        platzhalterTeil.src = aktuellesTeilImg;

        zuege += 1;
        document.getElementById("Züge").innerText = zuege
    }

}