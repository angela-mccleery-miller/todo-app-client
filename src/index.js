import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import TodoItem from "./todoItem";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todo: "",
      todos: [],
    };
  }

  deleteItem = (id) => {
    fetch(`http://localhost:5000/todo/${id}`, {
    // fetch(`https://amm-flask-todo-api.herokuapp.com/todo/${id}`, {
      method: "DELETE",
    }).then(
      this.setState({
        todos: this.state.todos.filter((item) => {
          return item.id !== id;
        }),
      })
    );
    // .catch((err) => console.log("Added todo error: ", err));
  };

  renderTodos = () => {
    return this.state.todos.map((item) => {
      return (
        <TodoItem key={item.id} item={item} deleteItem={this.deleteItem} />
      );
    });
  };

  addTodo = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/todo", {
      // .post("https://amm-flask-todo-api.herokuapp.com/todo", {
        title: this.state.todo,
        done: false,
      })
      .then((res) => {
        this.setState({
          todos: [res.data, ...this.state.todos],
          todo: "",
        });
      })
      .catch((err) => console.log("Add todo Error: ", err));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/todos")
      // .get("https://amm-flask-todo-api.herokuapp.com/todos")
      .then((res) => {
        this.setState({
          todos: res.data,
        });
      })
      .catch((err) => console.log("Add todo Error: ", err));
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
            onChange={(e) => this.handleChange(e)}
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
