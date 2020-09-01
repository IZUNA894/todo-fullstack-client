import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

class App extends React.Component {
  state = {};

  render() {
    var todos = this.props.todos;
    var todosList = "";
    if (todos.length == 0) {
      todosList = (
        <div className="">
          <p className="">No's todo's left for today</p>
        </div>
      );
    } else {
      todosList = todos.map((item, ind) => {
        return (
          <li className="  collection-item " key={item._id}>
            <p className="">
              {item.val}
              <a
                className="waves-effect waves-light btn right"
                style={{ marginLeft: "10px", marginRight: "5px" }}
                onClick={() => {
                  this.props.deleteTodo(item._id);
                }}
              >
                Delete
              </a>
              <a
                className="waves-effect waves-light btn right"
                style={{ marginLeft: "10px", marginRight: "5px" }}
                onClick={() => {
                  this.props.editTodo(ind);
                }}
              >
                Edit
              </a>
              <span className="right red-text text-lighten-3">
                <i>{moment(item.date).format("LLLL")}</i>
              </span>
            </p>
          </li>
        );
      });
    }
    return <ul className="collection">{todosList}</ul>;
  }
}
export default App;
