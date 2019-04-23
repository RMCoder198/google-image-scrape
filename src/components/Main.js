import React from "react";
import axios from "axios";
import GoogleImages from "google-images";
import ImageGrid from "./ImageGrid"
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
        const client = new GoogleImages(
          "014003092432424072766:nv6pfirfu-8",
          "AIzaSyAEfba3nSFwgDz3hwKPenWr6c4BKEaGE5Q"
        );
        client.search(this.input.current.value, { page: 2 }).then(images => {
          this.setState({ data: images });

        });
      })
      .catch(err => console.log(err));
  }
  render() {
    var images=''
    console.log(this.state.data)
    if(this.state.data.length>0){
    images = this.state.data.map((image, index) => (
      <div className="col-4" key={index}>
        <img src={image.url} alt=""  width="auto" height="50%"/>
      </div>
    ));
    }
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
              Get Images
            </button>
            <a className="btn" href="/words">Searched History</a>
          </div>
        </div>
        <div className="row">{images}</div>
      </div>
    );
  }
}
export default Main;
