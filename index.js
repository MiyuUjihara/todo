// リロード時の処理
window.addEventListener('DOMContentLoaded', e => {
  e.preventDefault();
  const todo = new Todo();

  // localStorageからデータを取得して表示
  datas.forEach(data => {
    data.status == 'incomplete' ? todo.addItem(data.title) : todo.addCompleteItem(data.title);
  });

  countUpItem();
});

const addtodoEvent = () => {
  const addItemText = document.querySelector("#input").value;

  if (addItemText == "") {
   alert("値を入力してください");
  } else if (addItemText.match(/\S/g) && !(datas.some(data => data.title === addItemText))) {
    // インスタンス化
    const todo = new Todo();
    todo.addItem(addItemText);

    // TODOを追加
    addStorageData({id: id, title: addItemText, status: 'incomplete'});
  } else {
    alert('[Error] 空文字または同じ名前は登録出来ません');
  };

  // フォームの値をリセット
  document.querySelector("#input").value = "";

  localStorage.setItem('todoList', JSON.stringify(datas));
  countUpItem();
}

// クリックイベント
document.querySelector("#add-btn").addEventListener('click', (e) => {
  e.preventDefault();
  addtodoEvent();
});

// エンターキーを押された時
document.addEventListener('keypress', (e) => {
  const regexEnter = new RegExp('(=|Enter)');
  if (regexEnter.test(e.key)) {
    e.preventDefault();
    addtodoEvent();
  }
})

// TODOステータス切り替え
const changeStatus = (targetData) => {
  console.log(targetData)
  targetData.status == 'incomplete' ? targetData.status = 'complete' : targetData.status = 'incomplete';
  localStorage.setItem('todoList', JSON.stringify(datas));
};

// カウントアップ
const countUpItem = () => {
  const todoList = document.getElementById("todo-list-box");
  const totalItemCount = document.getElementById("total-items-count");
  const doneList = document.getElementById("done-list-box");
  const doneItemsCount = document.getElementById("done-items-count");

  totalItemCount.innerText = `${todoList.childElementCount + doneList.childElementCount}件`;
  doneItemsCount.innerText = `${doneList.childElementCount}件`;
}