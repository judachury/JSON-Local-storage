var todoModule = (function() {

	var notes = [], 
		key = "myTodoNotes";

	_addNoteToPage = function (note) {
		var notesUl = document.getElementById("notes");
		var li = document.createElement("li");

		li.innerHTML = note.text;
		li.style.backgroundColor = note.color;

		if (notesUl.childElementCount > 0) {
			notesUl.insertBefore(li, notesUl.firstChild)
		} else {
			notesUl.appendChild(li);
		}
	};

	_storeNotes = function () {
		var jsonNotes = JSON.stringify(notes);
		localStorage.setItem(key, jsonNotes);
	};

	_loadNotes = function () {
		var jsonNotes = localStorage.getItem(key);
		if (jsonNotes) {
			notes = JSON.parse(jsonNotes);

			for (var i = 0; i < notes.length; i++) {
				_addNoteToPage(notes[i]);
			}
		}
	};

	_createNote = function () {
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

		_storeNotes();
		_addNoteToPage(note);		
	};

	init = function () {

		window.onload = function () {
			var submitButton = document.getElementById("submit"); 
			submitButton.onclick = _createNote;
		
			if (!window.localStorage) {
				alert("The Web Storage API is not suported");
			} else {
				_loadNotes();
			}

		}
		
	};

	return {
		init: init
	};

})();


todoModule.init();


