import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

class App extends React.Component {
  state = {};

  render() {
    var todos = this.props.todos;
    console.log(todos);
    var todosList = "";
    if (todos.length == 0) {
      todosList = (
        <div className="">
          <p className="">No's todo's for today</p>
        </div>
      );
    } else {
      todosList = todos.map((item, ind) => {
        let body = item.todos.map((todo) => {
          return (
            <li className="collection-item" key={todo.id}>
              {todo.val}{" "}
              <span className="right red-text text-lighten-3">
                <i>{moment(todo.date).format("LLLL")}</i>
              </span>
            </li>
          );
        });
        return (
          <li className="collection-item" key={item._id}>
            <p className="">
              {item.username}
              <ul className="collection">{body}</ul>
            </p>
          </li>
        );
      });
    }
    return <ul className="collection">{todosList}</ul>;
  }
}
export default App;
