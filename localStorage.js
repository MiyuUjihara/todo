let storageData = {};
// storageData.key = 'todoList';

// ローカルストレージに追加する関数
addStorageData= function(todo) {
  let list = getStorageData();
  list.push(todo);
  localStorage.setItem('todoList', JSON.stringify(list));
  id += 1;
  // 最新データにdataオブジェクトを更新
  data = getStorageData();
};

// ローカルストレージを取得する関数
getStorageData = function() {
  let list = localStorage.getItem('todoList');

  if (list == null) {
    return [];
  } else {
    return JSON.parse(list);
  };
};

// ローカルストレージからオブジェクトを作成
let data = getStorageData();

// IDの初期値
let id = 0;
// 既にデータがあったら最後のデータの次のIDをセット
if(data.length > 0) {
  id = data.slice(-1)[0].id + 1;
};