import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// ================= DOM ELEMENTS =================
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");

// ================= COUNTER =================
// TODO: make sure this selector matches your HTML
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// ================= TODO CREATION =================
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    handleToggle: (increment) => {
      todoCounter.updateCompleted(increment);
    },
    handleDelete: (wasCompleted) => {
      todoCounter.updateTotal(false);

      if (wasCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
  });

  return todo.getView();
};

// ================= SECTION =================
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

// render initial todos on page load
section.renderItems();

// ================= VALIDATION =================
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

// ================= POPUP WITH FORM =================
const addTodoPopupInstance = new PopupWithForm(
  "#add-todo-popup",
  (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    let date = null;
    if (dateInput) {
      date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }

    const id = uuidv4();

    const values = {
      name,
      date,
      id,
      completed: false,
    };

    // add to DOM
    const todoElement = generateTodo(values);
    section.addItem(todoElement);

    // update counter total (+1)
    todoCounter.updateTotal(true);

    // reset + close
    newTodoValidator.resetValidation();
    addTodoPopupInstance.close();
  },
);

addTodoPopupInstance.setEventListeners();

// ================= OPEN POPUP (keep this) =================
addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});
