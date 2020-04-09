import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import TodoItem from "./todoItem";


class App extends React.Component {
  constructor() {
    super();

    this.state ={
      todo: "",
      todos: [],
    };
  }

  renderTodos = () => {
    return this.state.todos.map(item => {
      return  <TodoItem key={item.id} item={item} />;
       
    });
  }


  addTodo = (e) => {
    e.preventDefault();
    console.log("added todo");

  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    axios
      .get("https://amm-flask-todo-api.herokuapp.com/todos")
      .then(res => {
        this.setState({
          todos: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    return (
      <div className="app">
        <h1>ToDo List</h1>
        <form className="add-todo" onSubmit={this.addTodo}>
          <input
            type="text"
            placeholder="Add Todo"
            name="todo"
            onChange={e => this.handleChange(e)}
            value={this.state.todo}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));