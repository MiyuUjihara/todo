class Todo {
  constructor() {
    this.DOM = {};
    this.DOM.todoListBox = document.querySelector("#todo-list-box");
    this.DOM.doneListBox = document.querySelector("#done-list-box");
    this.DOM.totalTodosCount = document.querySelector("#total-items-count");
    this.DOM.totalDonesCount = document.querySelector("#done-items-count");
  }

  // リストを生成
  _createItem(text) {

    // localStrageから一致したデータを取得
    let targetData = datas.find(data => data.title == text);

    // 1レコード
    const todoList = document.createElement("tr");
    targetData ? todoList.setAttribute("id", targetData.id) : todoList.setAttribute("id", id);

    // テキスト
    const todoElement = document.createElement("td");
    todoElement.classList.add("todo-text");
    todoElement.textContent = text;

    // donebボタン
    const doneBtn = document.createElement("td");
    doneBtn.innerText = "Done";
    doneBtn.setAttribute("id", "done-btn");

    // deleteボタン
    const deleteBtn = document.createElement("td");
    deleteBtn.innerText = "delete";
    deleteBtn.setAttribute("id", "del-btn");

    // 完了ボタンクリック
    doneBtn.addEventListener('click', (e) => {
      let targetData = datas.find(data => data.id == (e.target.parentNode.getAttribute('id')));
      changeStatus(targetData);
      this.deleteItem(e.target.parentNode, this.DOM.todoListBox);
      this.addCompleteItem_2();
      countUpItem();
    });

    // 削除ボタンクリック
    deleteBtn.addEventListener('click', (e) => {
      const confirmation = confirm("タスクを削除しても良いですか？");
      if (confirmation) {
        this.deleteItem(e.target.parentNode, this.DOM.todoListBox);

        // localStrageから対象のtodoを削除
        datas = datas.filter(data => data.id.toString() !== e.target.parentNode.getAttribute('id'));
        localStorage.setItem('todoList', JSON.stringify(datas));
        console.log(datas);
        countUpItem();
      }
    });

    // レコード各要素append
    todoList.appendChild(todoElement);
    todoList.appendChild(doneBtn);
    todoList.appendChild(deleteBtn);

    countUpItem();

    return todoList;
  }

  // 完了に追加
  _completeItem(text) {
    let targetData = datas.find(data => data.title == text);
    const donesColumn = document.createElement("tr");
    targetData ? donesColumn.setAttribute("class", targetData.id) : donesColumn.setAttribute("class", id);

    // doneElement
    const doneElement = document.createElement("td");
    doneElement.classList.add("done-text");
    doneElement.innerText = text;

    // backBtn
    const backBtn = document.createElement('td');
    backBtn.setAttribute("id", "back-btn");
    backBtn.classList.add('complete-button');
    backBtn.innerText = 'back';
    targetData ? backBtn.setAttribute("class", targetData.id) : backBtn.setAttribute("class", id);

    // deleteボタンを生成
    const deleteBtn = document.createElement("td");
    deleteBtn.innerText = "delete";
    deleteBtn.setAttribute("id", "del-btn");
    targetData ? deleteBtn.setAttribute("class", targetData.id) : deleteBtn.setAttribute("class", id);

    // 戻るボタンクリック
    backBtn.addEventListener('click', (e) => {
      targetData = datas.find(data => data.id.toString() == e.target.parentNode.childNodes[1].getAttribute('class'));
      changeStatus(targetData);

      this.deleteItem(e.target.parentNode, this.DOM.doneListBox);

      while(this.DOM.todoListBox.firstChild){
        this.DOM.todoListBox.removeChild(this.DOM.todoListBox.firstChild);
      }

      datas.forEach(data => {
        data.status == 'incomplete' && this.addItem(data.title);
      });

      countUpItem();
    });

    // 削除ボタンクリック
    deleteBtn.addEventListener('click', (e) => {
      const confirmation = confirm("タスクを削除しても良いですか？");
      if (confirmation) {
        this.deleteItem(e.target.parentNode, this.DOM.doneListBox);

        // localStrageから対象のtodoを削除
        datas = datas.filter(data => data.id.toString() !== e.target.getAttribute('class'));
        localStorage.setItem('todoList', JSON.stringify(datas));
        console.log(datas);

        countUpItem();
      }
    });

    donesColumn.appendChild(doneElement);
    donesColumn.appendChild(backBtn);
    donesColumn.appendChild(deleteBtn);

    return donesColumn;
  }

  // リスト作成
  addItem(text) {
    this.DOM.todoListBox.appendChild(this._createItem(text));
  }

  // リロード時に完了に追加
  addCompleteItem(text) {
    this.DOM.doneListBox.appendChild(this._completeItem(text));
  }

  // 完了ボタンを押下時に完了に追加
  addCompleteItem_2() {
    while(this.DOM.doneListBox.firstChild){
      this.DOM.doneListBox.removeChild(this.DOM.doneListBox.firstChild);
    }

    datas.forEach(data => {
      data.status == 'complete' && this.addCompleteItem(data.title);
    });
  }

  // リストを削除
  deleteItem(target, domparent) {
    domparent.removeChild(target);
  }
}