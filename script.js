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
	changeTodo: function () {
		var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
		var changeTodoTextInput = document.getElementById("changeTodoTextInput");
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoPositionInput.value = "";
		changeTodoTextInput.value = "";
		view.displayTodos();
	}
};

var view = {
	displayTodos: function() {
		var todosUl = document.querySelector("ul");
		todosUl.innerHTML = "";

		todoList.todos.forEach(function(todo, position) {
			var newLi = document.createElement("li");
			// newLi.textContent = todo.todoText;
			if (todo.completed === true ) {
				newLi.textContent = "(x) " + todo.todoText;
				newLi.className = "completed";
			} else {
				newLi.textContent = "( ) " + todo.todoText;
				// newLi.className = "";

			}

			newLi.id = position;
			newLi.insertBefore( this.createToggleButton(), newLi.childNodes[0] );
			newLi.appendChild( this.createDeleteButton() );
			todosUl.appendChild(newLi);
		}, this);
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},
	createToggleButton: function() {
		var toggleButton = document.createElement("button");
		toggleButton.textContent = "Toggle Completed";
		toggleButton.className = "toggleButton";
		return toggleButton;
	},
	setUpEventListeners: function() {
		var todosUl = document.querySelector("ul");

		todosUl.addEventListener( "click", function(event) {
			// Get the element that was clicked on
      		var elementClicked = event.target;

      		// Check if elementClicked is a delete button
			if (elementClicked.className === "deleteButton") {
				handlers.deleteTodo( parseInt(elementClicked.parentNode.id) );
			// Check if elementClicked is a toggle button
			} else if (elementClicked.className === "toggleButton") {
				handlers.toggleCompleted( parseInt(elementClicked.parentNode.id) );
				// var clickedLi = document.getElementById(elementClicked.parentNode.id);

				// clickedLi.classList.toggle("completed");
			}
		});

		// Trigger Add button with Enter
		window.addEventListener( "keypress", function(event) {
			if (event.keyCode === 13) {
				handlers.addTodo();
			}
		});
	},
};

view.setUpEventListeners();