var todoList = {
	todos: [],
	addTodo: function(addTodoText) {
		this.todos.push({
			todoText: addTodoText,
			completed: false
		});
	},
	changeTodo: function(position, todoText) {
		this.todos[position].todoText = todoText;
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
	},
	toggleCompleted: function(position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed;
	},
	toggleAll: function() {
		var totalTodos = this.todos.length;
		var completedTodos = 0;

		// Get a number of completed todos
		this.todos.forEach(function(todo) {
			if (todo.completed === true) {
				completedTodos++;
			}
		});

		this.todos.forEach(function(todo) {
			// If everything is true, make everything false
			if (completedTodos === totalTodos) {
				todo.completed = false;
			// Otherwise, make everything true
			} else {
				todo.completed = true;
			}
		});
	}
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
	toggleCompleted: function(position) {
		todoList.toggleCompleted(position);
		view.displayTodos();
	},
	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	},
	changeTodo: function (position, todoText ) {
		todoList.changeTodo(position, todoText);
		view.displayTodos();
	}
};

var view = {
	displayTodos: function() {
		var todosUl = document.querySelector("ul");
		todosUl.innerHTML = "";

		todoList.todos.forEach(function(todo, position) {
			var newLi = document.createElement("li");
			newLi.className = "";
			newLi.id = position;
			
			// newLi.textContent = todo.todoText;

			if (todo.completed === true ) {
				newLi.className = "completed";
			} else {
				newLi.className = "";
			}

			// Create a div where checkbox, label and deleteButton will be added
			var newDiv = document.createElement("div");
			newDiv.className = "view"; 

			var newLabel = document.createElement("label");
			newLabel.className = "todoText";
			newLabel.textContent = todo.todoText;

			newDiv.insertBefore( this.createToggleCheckBox(), newDiv.childNodes[0] );
			newDiv.appendChild(newLabel);
			newDiv.appendChild( this.createDeleteButton() );

			newLi.appendChild(newDiv);
			todosUl.appendChild(newLi);
		}, this);
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement("button");
		deleteButton.textContent = "x";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},
	createToggleCheckBox: function() {
		var toggleCheckBox = document.createElement("input");
		toggleCheckBox.type = "checkbox";
		toggleCheckBox.className = "toggleCheckBox";
		return toggleCheckBox;
	},
	setUpEventListeners: function() {
		var todosUl = document.querySelector("ul");

		todosUl.addEventListener("click", function(e) {
			// Get the element that was clicked on
      		var elementClicked = e.target;
      		var liClicked = parseInt(elementClicked.parentNode.parentNode.id);
      		// Check if elementClicked is a delete button
			if (elementClicked.className === "deleteButton") {
				handlers.deleteTodo(liClicked);
			// Check if elementClicked is a toggle button
			} else if (elementClicked.className === "toggleCheckBox") {
				handlers.toggleCompleted(liClicked);
			}
		});

		// Trigger Add button with Enter
		var addTodoTextInput = document.getElementById("addTodoTextInput");
		addTodoTextInput.addEventListener("keypress", function(e) {
			if (e.keyCode === 13) {
				handlers.addTodo();
			}
		});

		// Event listener for editing todo
		todosUl.addEventListener("dblclick", function(e) {
			// Get the element that was clicked on
      		var elementClicked = e.target;
      		var liClicked = parseInt(elementClicked.parentNode.parentNode.id);
      		// Add class name to li
      		document.getElementById(liClicked).className += " editing";
      		// Check if elementClicked is a label
			if (elementClicked.className === "todoText") {
				var editInput = document.createElement("input");
				editInput.className = "edit";
				editInput.value = todoList.todos[liClicked].todoText;

				clickedLiElement = document.getElementById(liClicked);
				clickedLiElement.appendChild(editInput);
				editInput.focus();

				editInput.addEventListener("keypress", function(e) {
					if (e.keyCode === 13) {
						handlers.changeTodo(liClicked, editInput.value);
					}
				});

				// editInput.addEventListener("click", function(e) {
				// 	if (elementClicked.className !== "edit") {
				// 		handlers.changeTodo(liClicked, editInput.value);
				// 	}
				// 	// e.stopPropagation();
				// });
			}

			
		});

	},
};

view.setUpEventListeners();