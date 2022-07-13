// 追加ボタン
let addButton = document.getElementById("add-btn");

// 入力
let inputTodo = document.getElementById("input");

// Todoの箱
const todoList = document.getElementById("todos-tbody");

// Doneの箱
const doneList = document.getElementById("dones-tbody");

// カウント
const todoItemsCount = document.getElementById("todo-items-count");
const doneItemsCount = document.getElementById("done-items-count");

// localStrageのデータを取得し表示
const todoTextDatas = JSON.parse(localStorage.getItem("todos"));

const datalist = [];

// 追加ボタンをクリックした時createTodoElement関数を呼び出す
addButton.addEventListener("click", function (e) {
  e.preventDefault();

  const todoText = inputTodo.value;

  if (todoText && todoText.match(/\S/g)) {

    if ((todoTextDatas.concat(datalist)).map((t) => t.text).includes(todoText)) {
      window.alert("すでに登録されているTODOです");
    } else {
      // レコードを親要素に追加
      todoList.appendChild(createTodoElement(todoText)); 

      datalist.push({text: todoText})
  
      // 入力を空
      inputTodo.value = "";
    
      // todoの件数を取得
      getAllTodoItems(); 
  
      // LocalStrageにデータを追加
      saveData();
    }
  }
});

// DOM要素作成
const createTodoElement = (todoText) => {

  // 1レコード
  const todosColumn = document.createElement("tr");

  // todo
  const todoElement = document.createElement("td");
  todoElement.classList.add("todo-column");
  todoElement.textContent = todoText;

  // done
  const doneElement = document.createElement("td");
  doneElement.innerText = "Done";
  doneElement.setAttribute("id", "done-btn");

  // deleteボタンを生成
  const deleteElement = document.createElement("td");
  deleteElement.innerText = "delete";
  deleteElement.setAttribute("id", "del-btn");

  // レコード各要素append
  todosColumn.appendChild(todoElement);
  todosColumn.appendChild(doneElement);
  todosColumn.appendChild(deleteElement);

  // doneボタンが押されたら取り消し線をつける
  doneElement.addEventListener("click", function () {
    console.log("doneBtnを押しました");
    todoElement.classList.add("strikethrough");
    saveData();
  })

  // deleteボタンを押した時todoリストから削除する
  deleteElement.addEventListener("click", function () {
    todoList.removeChild(todosColumn);
    console.log(todoElement.textContent);
    saveData();
    getAllTodoItems();
  }) 
  

  return todosColumn;
};

// todoの総件数を表示させる関数
const getAllTodoItems = () => {
  todoItemsCount.innerText = `${todoList.childElementCount}件`;
}

// doneの総件数を表示させる関数
const getAllDoneItems = () => {
  doneItemsCount.innerText = `${doneList.childElementCount}件`;
} 

// LocalStorageにデータを保存
const saveData = () => {
  const todoListDatas = document.querySelectorAll(".todo-column");
  const todos = [];

  todoListDatas.forEach((todoListData, index) => {
    let uncompletedTodo = {
      id: index,
      text: todoListData.innerText,
      status: "uncompleted"
    }

    todos.push(uncompletedTodo);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos);
}

const setData = () => {
  if (todoTextDatas) {
    todoTextDatas.forEach(todoTextData => {
      todoList.appendChild(createTodoElement(todoTextData.text)); 
    });
  }
}

setData();
getAllTodoItems();
getAllDoneItems();
