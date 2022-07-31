// 初回読み込み時の処理
window.addEventListener('DOMContentLoaded', e => {
  e.preventDefault();
  const totoList = new TodoList();

  // ローカルストレージからデータを取得して表示
  data.forEach(text => {
    text.status == 'incomplete' ? totoList.addItem(text.title) : totoList.addCompleteItem(text.title);
  });

  getStorageData();
  countUpItem();
  console.log(data);
});

class TodoList {
  // コンストラクタ
  constructor() {
    this.DOM = {};
    this.DOM.incomplete = document.querySelector("#todos-tbody");
    this.DOM.complete = document.querySelector("#dones-tbody");
  }

  // リストを生成
  _createItem(text) {
    let matchedData = data.find(v => v.title == text);

    // 1レコード
    const todosColumn = document.createElement("tr");
    matchedData ? todosColumn.setAttribute("class", matchedData.id) : todosColumn.setAttribute("class", id);


    // todo
    const todoElement = document.createElement("td");
    todoElement.classList.add("todo-column");
    todoElement.textContent = text;

    // done
    const doneBtn = document.createElement("td");
    doneBtn.innerText = "Done";
    doneBtn.setAttribute("id", "done-btn");
    matchedData ? doneBtn.setAttribute("class", matchedData.id) : doneBtn.setAttribute("class", id);

    // deleteボタンを生成
    const deleteBtn = document.createElement("td");
    deleteBtn.innerText = "delete";
    deleteBtn.setAttribute("id", "del-btn");
    matchedData ? deleteBtn.setAttribute("class", matchedData.id) : deleteBtn.setAttribute("class", id);

    // 完了ボタンクリック
    doneBtn.addEventListener('click', (e) => {
      let matchedData = data.find(v => v.id == (e.target.parentNode.childNodes[2].getAttribute('class')));
      changeStatus(matchedData);

      this.deleteItem(e.target.parentNode, this.DOM.incomplete);
      this.addCompleteItem_2();


      countUpItem();
    });

    // 削除ボタンクリック
    deleteBtn.addEventListener('click', (e) => {
      const confirmation = confirm("タスクを削除しても良いですか？");
      if (confirmation) {
        this.deleteItem(e.target.parentNode, this.DOM.incomplete);

        // localStrageから対象のtodoを削除
        data = data.filter(v => v.id.toString() !== e.target.getAttribute('class'));
        localStorage.setItem('todoList', JSON.stringify(data));
        console.log(data);
        countUpItem();
      }
    });

    // レコード各要素append
    todosColumn.appendChild(todoElement);
    todosColumn.appendChild(doneBtn);
    todosColumn.appendChild(deleteBtn);

    countUpItem();

    return todosColumn;
  }

  // 完了に追加
  _completeItem(text) {
    let matchedData = data.find(v => v.title == text);
    const donesColumn = document.createElement("tr");
    matchedData ? donesColumn.setAttribute("class", matchedData.id) : donesColumn.setAttribute("class", id);

    // doneElement
    const doneElement = document.createElement("td");
    doneElement.classList.add("done-column");
    doneElement.innerText = text;

    // backBtn
    const backBtn = document.createElement('td');
    backBtn.setAttribute("id", "back-btn");
    backBtn.classList.add('complete-button');
    backBtn.innerText = 'back';
    matchedData ? backBtn.setAttribute("class", matchedData.id) : backBtn.setAttribute("class", id);

    // deleteボタンを生成
    const deleteBtn = document.createElement("td");
    deleteBtn.innerText = "delete";
    deleteBtn.setAttribute("id", "del-btn");
    matchedData ? deleteBtn.setAttribute("class", matchedData.id) : deleteBtn.setAttribute("class", id);

    // 戻るボタンクリック
    backBtn.addEventListener('click', (e) => {
      matchedData = data.find(v => v.id.toString() == e.target.parentNode.childNodes[1].getAttribute('class'));
      changeStatus(matchedData);

      this.deleteItem(e.target.parentNode, this.DOM.complete);

      while(this.DOM.incomplete.firstChild){
        this.DOM.incomplete.removeChild(this.DOM.incomplete.firstChild);
      }

      data.forEach(text => {
        text.status == 'incomplete' && this.addItem(text = text.title);
      });

      countUpItem();
    });

    // 削除ボタンクリック
    deleteBtn.addEventListener('click', (e) => {
      const confirmation = confirm("タスクを削除しても良いですか？");
      if (confirmation) {
        this.deleteItem(e.target.parentNode, this.DOM.complete);

        // localStrageから対象のtodoを削除
        data = data.filter(v => v.id.toString() !== e.target.getAttribute('class'));
        localStorage.setItem('todoList', JSON.stringify(data));
        console.log(data);

        countUpItem();
      }
    });

    donesColumn.appendChild(doneElement);
    donesColumn.appendChild(backBtn);
    donesColumn.appendChild(deleteBtn);

    return donesColumn;
  }

  // リストを追加
  addItem(text) {
    this.DOM.incomplete.appendChild(this._createItem(text));
  }

  // リロード時に完了に追加
  addCompleteItem(text) {
    this.DOM.complete.appendChild(this._completeItem(text));
  }

  // 完了ボタンを押下時に完了に追加
  addCompleteItem_2() {
    while(this.DOM.complete.firstChild){
      this.DOM.complete.removeChild(this.DOM.complete.firstChild);
    }

    data.forEach(text => {
      text.status == 'complete' && this.addCompleteItem(text.title);
    });
  }

  // リストを削除
  deleteItem(target, domparent) {
    domparent.removeChild(target);
  }
}

function addtodoEvent() {
  const addItemTxt = document.querySelector("#input").value;

  if(addItemTxt == "") {
    alert("値を入力してください");
    return
  } else if (addItemTxt.match(/\S/g) && !(data.some(v => v.title === addItemTxt))) {

    // インスタンス化
    const totoList = new TodoList();
    totoList.addItem(addItemTxt);

    // TODOを追加
    addStorageData({id: id, title: addItemTxt, status: 'incomplete'});

    console.log(`[Added] ${addItemTxt}`);
    console.log(data);
  } else {
    alert('[Error] 空文字または同じ名前は登録出来ません');
  };

  // フォームの値をリセット
  document.querySelector("#input").value = "";

  countUpItem();
  localStorage.setItem('todoList', JSON.stringify(data));
}

// クリックイベント
document.querySelector("#add-btn").addEventListener('click', (e) => {
  e.preventDefault();
  addtodoEvent();
});

// キーボードイベント
document.addEventListener('keypress', (e) => {
  const regexEnter = new RegExp('(=|Enter)');
  if (regexEnter.test(e.key)) {
    e.preventDefault();
    addtodoEvent();
  } else {
    return false;
  }
})

// TODO完了切り替え関数
const changeStatus = (matchedData) => {
  matchedData.status == 'incomplete' ? matchedData.status = 'complete' : matchedData.status = 'incomplete';
  localStorage.setItem('todoList', JSON.stringify(data));
  console.log(data);
};

// カウントアップ
const countUpItem = () => {
  const todoList = document.getElementById("todos-tbody");
  const totalItemCount = document.getElementById("total-items-count");
  const doneList = document.getElementById("dones-tbody");
  const doneItemsCount = document.getElementById("done-items-count");

  totalItemCount.innerText = `${todoList.childElementCount + doneList.childElementCount}件`;
  doneItemsCount.innerText = `${doneList.childElementCount}件`;
}