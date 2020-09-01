import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = {
    val: undefined,
  };

  handleChange = (e) => {
    this.setState({ val: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.val.length == 0) return;
    console.log(this.state);
    this.props.addTodo(this.state);
    this.setState({ val: "" }, () => {
      document.getElementById("title").value = "";
    });
  };
  componentDidMount() {
    if (this.props.val)
      this.setState({ val: this.props.val }, () => {
        document.getElementById("title").value = this.state.val;
      });
  }
  render() {
    return (
      <footer className="page-footer">
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row red lighten-4">
              <div className="input-field col s12">
                <input
                  id="title"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label htmlFor="title">To-Do...</label>
              </div>
            </div>
          </form>
        </div>
      </footer>
    );
  }
}
export default App;
