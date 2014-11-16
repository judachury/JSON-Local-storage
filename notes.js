var notes = [];
var key = "myNotes";

function addNoteToPage(note) {
	var notesUl = document.getElementById("notes");
	var li = document.createElement("li");

	li.innerHTML = note.text;
	li.style.backgroundColor = note.color;

	if (notesUl.childElementCount > 0) {
		notesUl.insertBefore(li, notesUl.firstChild)
	} else {
		notesUl.appendChild(li);
	}
}

function storeNotes() {
	var jsonNotes = JSON.stringify(notes);
	localStorage.setItem(key, jsonNotes);
}

function loadNotes() {
	var jsonNotes = localStorage.getItem(key);
	if (jsonNotes) {
		notes = JSON.parse(jsonNotes);

		for (var i = 0; i < notes.length; i++) {
			addNoteToPage(notes[i]);
		}
	}

	console.debug(notes);

}

function createNote() {
	var noteText = document.getElementById("note");
	text = noteText.value;

	if (text == null || text == "" || text.length == 0) {
		alert("enter a note!");
		return;
	}

	var colorSelect = document.getElementById("color");
	var index = colorSelect.selectedIndex;
	var color = colorSelect[index].value;
	var note = {};

	note.text = text;
	note.color = color;

	notes.push(note);

	storeNotes();
	addNoteToPage(note);

}

window.onload = function () {
	var submitButton = document.getElementById("submit");
 
	submitButton.onclick = createNote;

	if (!window.localStorage) {
		alert("The Web Storage API is not suported");
	} else {
		loadNotes();
	}

}
