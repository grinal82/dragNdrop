/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 562:
/***/ (() => {

const lists = document.querySelectorAll(".list");
const form = document.querySelectorAll(".form");
const btn = document.querySelectorAll(".add__btn");

// Получение состояния из LocalStorage
const storedState = localStorage.getItem("listState");
const initialState = storedState ? JSON.parse(storedState) : [];

// Обновление массива lists для хранения состояния
let state = initialState;

// Функция для сохранения состояния в LocalStorage
function saveState() {
  localStorage.setItem("listState", JSON.stringify(state));
}
function renderTasks() {
  lists.forEach((list, index) => {
    list.innerHTML = ""; // Очистка существующих задач

    state[index].tasks.forEach(task => {
      const newItem = createTaskItem(task);
      list.appendChild(newItem);
    });
    draggingManagement(); // Включение функциональности перетаскивания для отображенных задач
  });
}

function createTaskItem(task) {
  const item = document.createElement("div");
  item.classList.add("list__item");
  item.classList.add("draggable");
  item.draggable = true;
  item.textContent = task;
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-times", "delete-icon");
  item.appendChild(deleteIcon);

  // Добавление обработчика события для удаления карточки
  deleteIcon.addEventListener("click", () => {
    const taskIndex = state.findIndex(list => list.tasks.includes(task));
    state[taskIndex].tasks = state[taskIndex].tasks.filter(t => t !== task);
    saveState(); // Сохранение обновленного состояния в LocalStorage
    item.remove();
  });
  return item;
}
function addTask(index) {
  const currentForm = form[index];
  const cancelBtn = currentForm.querySelector(".cancel__item-btn");
  const textarea = currentForm.querySelector(".textarea");
  const currentAddBtn = currentForm.querySelector(".add__item-btn");
  const currentBtn = currentForm.nextElementSibling;
  const clearForm = () => {
    textarea.value = "";
    currentForm.style.display = "none";
    currentBtn.style.display = "flex";
  };
  currentBtn.addEventListener("click", () => {
    currentForm.style.display = "block";
    currentBtn.style.display = "none";
    currentAddBtn.style.display = "none";
  });
  cancelBtn.addEventListener("click", clearForm);
  currentAddBtn.addEventListener("click", () => {
    const newItem = createTaskItem(textarea.value);
    lists[index].appendChild(newItem);
    draggingManagement();
    state[index].tasks.push(textarea.value); // Обновление состояния с новой задачей
    saveState(); // Сохранение обновленного состояния в LocalStorage
    textarea.value = "";
    clearForm();
  });
  btn[index].addEventListener("click", () => {
    currentForm.style.display = "block";
    currentBtn.style.display = "none";
    currentAddBtn.style.display = "block";
    textarea.focus();
  });
}
btn.forEach((button, index) => {
  addTask(index);
});

// уберает залоговок карточек при клике (если нужно будет поменять названия карточек)
function changeTitle() {
  const titles = document.querySelectorAll(".title");
  titles.forEach(title => {
    title.addEventListener("click", e => e.target.textContent = "");
  });
}
changeTitle();

// Управление функциональностью перетаскиванияв
function draggingManagement() {
  const draggables = document.querySelectorAll(".draggable");
  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
      updateState(); // сохранение состояния после перетасивания
    });
  });

  const lists = document.querySelectorAll(".list");
  lists.forEach(list => {
    list.addEventListener("dragover", e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(list, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        list.appendChild(draggable);
      } else {
        list.insertBefore(draggable, afterElement);
      }
    });
  });
}
function getDragAfterElement(list, y) {
  const draggableElements = [...list.querySelectorAll(".draggable:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return {
        offset: offset,
        element: child
      };
    } else {
      return closest;
    }
  }, {
    offset: Number.NEGATIVE_INFINITY
  }).element;
}

//  функция вызывается после перетаскивания и пробегает по элементам сохраняя новый порядок карточек
function updateState() {
  const updatedState = [];
  lists.forEach(list => {
    const tasks = Array.from(list.querySelectorAll(".list__item")).map(item => item.textContent);
    updatedState.push({
      tasks
    });
  });
  state = updatedState;
  saveState(); // Сохранение обновленного состояния в LocalStorage
}

// Инициализация состояния и отображение задач
if (initialState.length === 0) {
  // Создание начального состояния, если его нет в LocalStorage
  lists.forEach(() => {
    state.push({
      tasks: []
    });
  });
  saveState();
} else {
  renderTasks();
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _js_app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(562);
/* harmony import */ var _js_app_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_app_js__WEBPACK_IMPORTED_MODULE_0__);


})();

/******/ })()
;