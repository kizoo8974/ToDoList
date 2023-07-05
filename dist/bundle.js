
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
'use strict';



function ___$insertStylesToHeader(css) {
  if (!css) {
    return
  }
  if (typeof window === 'undefined') {
    return
  }

  const style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css
}

___$insertStylesToHeader("* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: skyblue;\n  color: white;\n}\n\nheader {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 600px;\n  margin: auto;\n  padding: 0.5rem;\n  font-size: 2rem;\n}\n\n.input-container {\n  height: 300px;\n  display: flex;\n  align-items: center;\n  width: 600px;\n  margin: auto;\n  padding: 0.5rem;\n  justify-content: space-between;\n  flex-wrap: wrap;\n}\n.input-container .input-area {\n  display: flex;\n  width: 600px;\n}\n.input-container .input-area .todo-input {\n  padding: 0.5rem;\n  font-size: 2rem;\n  border: none;\n  background: white;\n  width: 100%;\n}\n.input-container .input-area .todo-btn {\n  padding: 0.5rem;\n  font-size: 2rem;\n  border: none;\n  background: white;\n  color: white;\n  background: green;\n  cursor: pointer;\n}\n\n.todo-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.todo-container .todo-list {\n  width: 600px;\n}\n.todo-container .todo-list .todo {\n  margin: 0.5rem;\n  background: white;\n  font-size: 1.5rem;\n  color: black;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  transition: 1s ease;\n}\n.todo-container .todo-list .todo .todo-item {\n  flex-grow: 1;\n  border: none;\n  font-size: 1.5rem;\n  outline: none;\n  padding: 0rem 0.5rem;\n  overflow-x: scroll;\n  white-space: nowrap;\n}\n.todo-container .todo-list .todo.delete {\n  transform: translateX(10rem);\n  opacity: 0;\n}\n.todo-container .todo-list .todo.done {\n  text-decoration: line-through;\n  opacity: 0.5;\n}\n.todo-container .todo-list .todo .todo-item::-webkit-scrollbar {\n  display: none;\n}\n.todo-container .todo-list .todo .delete-btn {\n  background: red;\n  color: white;\n  border: none;\n  padding: 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n}\n.todo-container .todo-list .todo .complete-btn {\n  background: blue;\n  color: white;\n  border: none;\n  padding: 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n}\n.todo-container .todo-list .todo .edit-btn {\n  background: black;\n  color: white;\n  border: none;\n  padding: 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n}\n.todo-container .todo-list .todo .save-btn {\n  background: black;\n  color: white;\n  border: none;\n  padding: 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n  background: black;\n  color: white;\n  border: none;\n  padding: 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n  display: none;\n}\n.todo-container .todo-list .todo.edit .complete-btn,\n.todo-container .todo-list .todo.edit .edit-btn,\n.todo-container .todo-list .todo.edit .delete-btn {\n  display: none;\n}\n.todo-container .todo-list .todo.edit .save-btn {\n  display: block;\n}\n\n.input-container .radio-area {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n}\n.input-container .radio-area input[type=radio] {\n  width: 0;\n  height: 0;\n  position: absolute;\n  left: -9999px;\n}\n.input-container .radio-area input[type=radio] + label {\n  padding: 0.8em 1.6em;\n  background-color: #fff;\n  cursor: pointer;\n  color: black;\n  transition: 0.2s;\n}\n.input-container .radio-area input[type=radio]:checked + label {\n  background-color: #b700ff;\n  color: #fff;\n  border-color: #b700ff;\n}\n\n@media (max-width: 800px) {\n  .input-container {\n    width: 100%;\n  }\n  .input-container .input-area,\n  .input-container .radio-area {\n    width: 100%;\n  }\n  .todo-container .todo-list {\n    width: 100%;\n  }\n}");

class Router {
    routes = [];
    notFoundCallback = () => {};
    addRoute(url, callback) {
        this.routes.push({
            url,
            callback,

        });
        return this;
    }

    checkRoute() {
        const currentRoute = this.routes.find(
            (route) => route.url === window.location.hash,
        );

        if (!currentRoute) {
            this.notFoundCallback();
            return;
        }

        currentRoute.callback();
    }

    init() {
        window.addEventListener('hashchange', this.checkRoute.bind(this));
        if(!window.location.hash){
            window.location.hash = '#/';
        }
        this.checkRoute();
    }

    setNotFound(callback){
        this.notFoundCallback = callback;
        return this;
    }
}



class TodoList {
    constructor() {
        this.assignElement();
        this.addEvent();
    }
    assignElement() {
        this.inputContainerEl = document.getElementById('input-container');
        this.inputAreaEl = this.inputContainerEl.querySelector('#input-area');
        this.todoInputEl = this.inputAreaEl.querySelector("#todo-input");
        this.addBtnEl = this.inputAreaEl.querySelector('#add-btn');
        this.todoContainerEl = document.getElementById('todo-container');
        this.todoListEl = this.todoContainerEl.querySelector('#todo-list');
        this.radioAreaEl = this.inputContainerEl.querySelector('#radio-area');
        this.filterRadioBtnEls = this.radioAreaEl.querySelectorAll(
            'input[name="filter"]',
            );
    }
    addEvent() {
        this.addBtnEl.addEventListener('click', this.onClickAddBtn.bind(this));
        this.todoListEl.addEventListener('click', this.onClickTodoList.bind(this));
        this.addRadioBtnEvent();
    }

    addRadioBtnEvent() {
        for (const filterRadioBtnEl of this.filterRadioBtnEls) {
            filterRadioBtnEl.addEventListener(
            'click', 
            this.onClickRadioBtn.bind(this),
            );
        }
    }

    onClickRadioBtn(event) {
        const { value } = event.target;
        window.location.href = `#/${value.toLowerCase()}`;
        
    }

    filterTodo(status) {
        const todoDivEls = this.todoListEl.querySelectorAll('div.todo');
        for(const todoDivEl of todoDivEls) {
            switch (status) {
                case 'ALL':
                    todoDivEl.style.display = 'flex';
                break;
                case  'DONE':
                    todoDivEl.style.displey = todoDivEl.classList.contains('done') 
                    ? 'flex'
                    : 'none';
                break;
                case 'TODO':
                    todoDivEl.style.displey = todoDivEl.classList.contains('done') 
                    ? 'none'
                    : 'flex';
                break;

            }
           
        }
    }

    onClickTodoList(event) {
        const {target} = event;
        const btn = target.closest('button');
        if(!btn) return;
        if(btn.matches('#delete-btn')) {
            this.deleteTodo(target);
        } else if (btn.matches('#edit-btn')) {
            this.editTodo(target);
        } else if (btn.matches('#save-btn')) {
            this.saveTodo(target);
        } else if (btn.matches('#complete-btn')) {
            this.completeTodo(target);
        }
    }

    completeTodo(target) {
        const todoDiv = target.closest('.todo');
        todoDiv.classList.toggle('done');
    }

    saveTodo(target) {
        const todoDiv = target.closest('.todo');
        todoDiv.classList.remove('edit');
        const todoInputEl = todoDiv.querySelector('input');
        todoInputEl.readOnly = true;
    }

    editTodo(target) {
        const todoDiv = target.closest('.todo');
        const todoInputEl = todoDiv.querySelector('input');
        todoInputEl.readOnly = false;
        todoInputEl.focus();
        todoDiv.classList.add('edit');
    }

    deleteTodo(target) {
        const todoDiv = target.closest('.todo');
        todoDiv.addEventListener('transitioned', () => {
            todoDiv.remove();
        });
        todoDiv.classList.add('delete');
    }


    onClickAddBtn() {
        if(this.todoInputEl.value.length === 0) {
            alert("Please, enter some text.");
            return;
        }
        this.createTodoElement(this.todoInputEl.value);
    }

    createTodoElement(value) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const todoContent = document.createElement('input');
        todoContent.value = value;
        todoContent.readOnly = true;
        todoContent.classList.add('todo-item');

        const fragment = new DocumentFragment();
        fragment.appendChild(todoContent);
        // complete button
        fragment.appendChild(
        this.createButton('complete-btn', 'complete-btn', ['fas','fa-check'])
        );
        // edit button
        fragment.appendChild(
            this.createButton('edit-btn', 'edit-btn', ['fas','fa-edit'])
        );
        // delete button
        fragment.appendChild(
            this.createButton('delete-btn', 'delete-btn', ['fas','fa-trash'])
        );
        // save button
        fragment.appendChild(
            this.createButton('save-btn', 'save-btn', ['fas','fa-save'])
        );
        todoDiv.appendChild(fragment);
        this.todoListEl.appendChild(todoDiv);

        this.todoInputEl.value = '';

    }

    createButton(btnId, btnClassName, iconClassName) {
        const btn = document.createElement('button');
        const icon = document.createElement('i');
        icon.classList.add(...iconClassName);
        btn.appendChild(icon);
        btn.id = btnId;
        btn.classList.add(btnClassName);
        return btn;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const router = new Router();
    const todoList = new TodoList();
    const routeCallback = (status) => () => {
        todoList.filterTodo(status);
        document.querySelector(
            `input[type='radio'][value='${status}']`,
        ).checked = true;
    };
    router
    .addRoute('#/all', routeCallback('ALL'))
    .addRoute('#/todo', routeCallback('TODO'))
    .addRoute('#/done', routeCallback('DONE'))
    .setNotFound(routeCallback('ALL'))
    .init();
});
//# sourceMappingURL=bundle.js.map
