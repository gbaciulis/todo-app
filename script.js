// add button should work with enter


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
		for (var i = 0; i < totalTodos; i++) {
			if (this.todos[i].completed === true) {
				completedTodos++;
			}
		}

		// If everything is true, make everything false
		if (completedTodos === totalTodos) {
			for (var i = 0; i < totalTodos; i++) {
				this.todos[i].completed = false;
			}
		// Else make everything true
		} else {
			for (var i = 0; i < totalTodos; i++) {
				this.todos[i].completed = true;
			}
		}
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
	toggleCompleted: function() {
		var positionInput = document.getElementById("toggleCompletedPositionInput");
		todoList.toggleCompleted(positionInput.valueAsNumber);
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

		for (var i = 0; i < todoList.todos.length; i++) {
			var newLi = document.createElement("li");
			if (todoList.todos[i].completed === false ) {
				newLi.textContent = "( ) " + todoList.todos[i].todoText; 
			} else {
				newLi.textContent = "(x) " + todoList.todos[i].todoText; 
			}

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