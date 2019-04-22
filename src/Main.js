import React from "react";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      data: [],
      loading: false
    };
    this.input = React.createRef();
  }
  handleClick() {
    axios(`/api/images/${this.input.current.value}`)
      .then(res => {
        console.log(res);
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="container">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"
            ref={this.input}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleClick.bind(this)}
            >
              Button
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
