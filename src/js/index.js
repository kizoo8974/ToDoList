
import "../scss/style.scss"

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