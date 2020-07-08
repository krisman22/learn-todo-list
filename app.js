//UI Element
const todoForm =document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

immediateLeadEventListener();
function immediateLeadEventListener (){
    //Kumpulan Event Listener
    //Mendapatkan todo dari localstorage
    document.addEventListener("DOMContentLoaded", getTodos);

    todoForm.addEventListener("submit", addTodo);

    todoList.addEventListener("click", deleteTodo);

    clearButton.addEventListener("click", clearTodos)

    filterInput.addEventListener("keyup", filterTodos)
}

//Reuseable Code
function createTodoElement(value){
    //Membuat elemen li
    const li = document.createElement("li")

    //menambahkan elemen class pada li
    li.className = "todo-item list-group-item d-flex justify-content-between align-items-center mb-1"

    //Menambahkan Children
    li.appendChild(document.createTextNode(value))

    const a = document.createElement("a")

    a.href="#";
    a.className="badge badge-danger delete-todo"
    a.innerHTML = "DELETE";

    li.appendChild(a)
    

    //Memasukkan element li ke dalam element todoList
    todoList.appendChild(li);
}

function getItemFromLocalStorage(){
    let todos;
    if(localStorage.getItem("todos") == null){
        todos=[]
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

//DOM Function 
function getTodos(){
    const todos = getItemFromLocalStorage();

    todos.forEach((todo) => {
        createTodoElement(todo)
    })
}

function addTodo(e){
    e.preventDefault();
    if(todoInput.value){
    
    createTodoElement(todoInput.value)
    
    addTodoLocalStorage(todoInput.value);
    todoInput.value="";

    }else {
        alert("Input tidak boleh Kosong")
    }


}

function addTodoLocalStorage(todoInputValue){
    const todos = getItemFromLocalStorage();

    todos.push(todoInputValue)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function deleteTodo(e) {
    e.preventDefault();

  //  console.log(e.target);
        
    
    if(e.target.classList.contains("delete-todo")){
        if(confirm("Apakah anda yakin menghapusnya?")){
            const parent = e.target.parentElement;
             parent.remove();

             deleteTodosLocalStorage(parent)
        }
    }
    
}

function deleteTodosLocalStorage(deletedElement){
    const todos = getItemFromLocalStorage();

    todos.forEach((todo, index)=>{
        if(deletedElement.firstChild.textContent === todo){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos(){
    todoList.innerHTML = "";

    clearTodoLocalStorage();
}

function clearTodoLocalStorage(){
    localStorage.clear();
}

function filterTodos(e) {
    const filterText = e.target.value.toLowerCase();

    const todoItems = document.querySelectorAll(".todo-item");
    console.log(todoItems);

    todoItems.forEach((item) => {
        const itemText = item.firstChild.textContent.toLowerCase();

        if(itemText.indexOf(filterText)!= -1 ){
            item.setAttribute("style","display:block");
        }else{
            item.setAttribute("style", "display:none!important")
        }
        console.log(itemText);
        
    });
    
    
    
}


