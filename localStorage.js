// IDの初期値
let id = 0;

// localStorageに追加
addStorageData = (todo) => {
  let list = getStorageData();
  list.push(todo);
  localStorage.setItem('todoList', JSON.stringify(list));
  id += 1;

  // 最新データに更新
  datas = getStorageData();
  console.log(datas);
};


// localStorageを取得
getStorageData = () => {
  let list = localStorage.getItem('todoList');
  return list == null ? [] : JSON.parse(list);
};

// localStorageからオブジェクトを作成
let datas = getStorageData();

// 既にデータが存在していたら最後のデータの次のIDをセット
if(datas.length) {id = datas[datas.length -1].id + 1};