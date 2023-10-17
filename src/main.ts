import "./style.css";
interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };
  todos.push(todo);
  todoInput.value = "";
  renderTodos(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo = document.createElement("div");
  todo.className = "todo";

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "isCompleted";
  checkbox.checked = isCompleted;
  checkbox.onchange = () => {
    todos.find((item) => item.id === id)!.isCompleted = checkbox.checked;
    paragraph.className = checkbox.checked ? "textCut" : "";
  };

  const paragraph = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = checkbox.checked ? "textCut" : "";

  const btn = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  };

  todo.append(checkbox, paragraph, btn);
  todoContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodos(todos);
};

const renderTodos = (todos: Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};
