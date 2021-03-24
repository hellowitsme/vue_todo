Vue.config.devtools = true;

// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}


new Vue({
  el: '#app',
  data:{
    keyword: '',
    newTask: '',
    hasError: '',
    todos: []
  },
  computed: {
    search(){
      let searchWord = this.keyword.trim()
      if(searchWord === '') return this.todos;
      return this.todos.filter(todo => {
        return todo.content.includes(searchWord)
      })
    }
  },
  methods: {
    addTask: function(e){
      if(this.newTask === '') return;
      let todo = {
        id: todoStorage.uid++,
        content: this.newTask,
        isDone: false,
        show: true
      };

      this.todos.push(todo);
      this.newTask = '';
      this.hasError = '';
    },
    deleteTask: function(index){
      this.todos.splice(index, 1)
    },
    error: function(){
      if(this.newTask === ''){
        this.hasError = '入力してください';
      }else{
        this.hasError = '';
      }
    }
  },
  
  
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function(todos) {
        todoStorage.save(todos)
      },
      //ネストしているデータの監視
      deep: true
    }
  },
  created() {
    // インスタンス作成時に自動的に fetch() する
    this.todos = todoStorage.fetch()
  }
})
