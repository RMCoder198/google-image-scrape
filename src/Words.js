import React from "react";
import axios from "axios";
class Words extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: []
    };
  }
  componentDidMount() {
    axios
      .get("/api/words")
      .then(res => {
        console.log(res);
        this.setState({ words: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const words = this.state.words.map((word, index) => (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <a href={`/getImages/${word.word}`}>{word.word}</a>
        </td>
      </tr>
    ));
    return (
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Words</th>
            </tr>
          </thead>
          <tbody>{this.state.words.length > 0 ? words : ""}</tbody>
        </table>
      </div>
    );
  }
}
export default Words;
