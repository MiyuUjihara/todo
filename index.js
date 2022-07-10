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

// 追加ボタンをクリックした時、add関数を呼び出す
addButton.addEventListener("click", function (event) {
  event.preventDefault();
  const todoText = inputTodo.value;
  if (todoText && todoText.match(/\S/g)) {

    // レコードを親要素に追加
    todoList.appendChild(createTodoElement(todoText)); 

    // 入力を空
    inputTodo.value = "";
  
    // todoの件数を取得
    getAllTodoItems(); 
  }
});

// DOM要素作成
const createTodoElement = (todoText) => {

  // 1レコード
  const tr = document.createElement("tr");

  // todo
  const todoElement = document.createElement("td");
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
  tr.appendChild(todoElement);
  tr.appendChild(doneElement);
  tr.appendChild(deleteElement);

  // doneボタンが押されたら取り消し線をつける
  doneElement.addEventListener("click", function () {
    console.log("doneBtnを押しました");
    todoElement.classList.add("strikethrough");
  })

  // deleteボタンを押した時todoリストから削除する
  deleteElement.addEventListener("click", function () {
    todoList.removeChild(tr);
    getAllTodoItems();
  }) 

  return tr;
};

// todoの総件数を表示させる関数
const getAllTodoItems = function () {
  todoItemsCount.innerText = `${todoList.childElementCount}件`;
}

// doneの総件数を表示させる関数
const getAllDoneItems = function () {
  doneItemsCount.innerText = `${doneList.childElementCount}件`;
} 

getAllTodoItems();
getAllDoneItems();
