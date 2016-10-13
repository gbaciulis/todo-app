// it should have a toggle completed button
	// a field to select position

// it should have a toggle completed all button
	// if at least one completed toggle all completed

// it should have a function to change todo
	// button to change todo
	// field to select position 
	// field to make a change


// add button should work with enter


var todoList = {
	todos: [],
	addTodo: function(addTodoText) {
		this.todos.push({
			todoText: addTodoText,
			completed: false
		});
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
	},
};

var handlers = {
	addTodo: function() {
		var addTodoTextInput = document.getElementById("addTodoTextInput");
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = "";
		view.displayTodos();
	},
	deleteTodo: function(position) {
		todoList.deleteTodo(position);
		view.displayTodos();
	},
};

var view = {
	displayTodos: function() {
		var todosUl = document.querySelector("ul");
		todosUl.innerHTML = "";

		for (var i = 0; i < todoList.todos.length; i++) {
			var newLi = document.createElement("li");
			newLi.textContent = todoList.todos[i].todoText;
			newLi.id = [i];
			newLi.appendChild( this.createDeleteButton() );
			todosUl.appendChild(newLi);
		}
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},
	setUpEventListeners: function() {
		var todosUl = document.querySelector("ul");

		todosUl.addEventListener( "click", function(event) {
			// Get the element that was clicked on
      		var elementClicked = event.target;

      		// Check if elementClicked is a delete button
			if (elementClicked.className === "deleteButton") {
				handlers.deleteTodo( parseInt(elementClicked.parentNode.id) );
			}
		});
	},
};

view.setUpEventListeners();