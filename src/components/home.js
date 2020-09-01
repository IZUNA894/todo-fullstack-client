import React from "react";
import ShowTodo from "./showToDo.js";
import ShowTodoAdmin from "./showTodoAdmin.js";
import AddToDo from "./addToDo.js";
import axios from "axios";
const apiLink =
  process.env.NODE_ENV == "development" ? "http://127.0.0.1:3001" : "";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      toBeUpdateInd: null,
      pendingUpdate: false,
    };
    this.role = "";
  }
  addTodo = (item) => {
    axios
      .post(apiLink + "/api/v1/todo/create", item, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status == 201)
          return axios.get(apiLink + "/api/v1/todo/get", {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          });
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ todos: res.data.result });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  deleteTodo = (id) => {
    axios
      .delete(apiLink + "/api/v1/todo/delete/" + id, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status == 204)
          return axios.get(apiLink + "/api/v1/todo/get", {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          });
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ todos: res.data.result });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  editTodo = (ind) => {
    this.setState({ toBeUpdateInd: ind, pendingUpdate: true });
  };
  updateTodo = (item) => {
    console.log(item);
    let id = this.state.todos[this.state.toBeUpdateInd]._id;
    console.log(id);
    axios
      .put(apiLink + "/api/v1/todo/update/" + id, item, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status == 200)
          return axios.get(apiLink + "/api/v1/todo/get", {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          });
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ todos: res.data.result, pendingUpdate: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    axios
      .get(apiLink + "/api/v1/todo/get", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ todos: res.data.result });
      })
      .catch((error) => {
        console.log(error);
      });
    let user = JSON.parse(window.localStorage.getItem("user"));
    if (user.role == "admin") this.role = "admin";
  }
  render() {
    return (
      <div className="container z-depth-5">
        <div className="red darken-4  white-text text-darken-4">
          <h2 className="center-align">To-Do!</h2>
          <p className="center-align">create new to-do's here!</p>
        </div>

        <div className="blue-text text-darken-4 text">
          {this.role == "admin" ? (
            <ShowTodoAdmin todos={this.state.todos} />
          ) : (
            <ShowTodo
              todos={this.state.todos}
              deleteTodo={this.deleteTodo}
              editTodo={this.editTodo}
            />
          )}
        </div>
        {this.role !== "admin" && !this.state.pendingUpdate && (
          <div className="white">
            <AddToDo addTodo={this.addTodo} />
          </div>
        )}

        {this.role !== "admin" && this.state.pendingUpdate && (
          <div className="white">
            <h3 className="center"> Edit Todo</h3>
            <AddToDo
              addTodo={this.updateTodo}
              val={this.state.todos[this.state.toBeUpdateInd].val}
            />
          </div>
        )}
      </div>
    );
  }
}
export default Home;
