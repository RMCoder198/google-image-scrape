import React from "react";
import axios from "axios";
import ImageGrid from "./ImageGrid";
class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }
  componentWillMount() {
    axios
      .get(`/api/image/${this.props.match.params.word}`)
      .then(res =>
        this.setState({ images: res.data.images }, function(re) {
          console.log(this.state.images);
        })
      )
      .catch(er => console.log(er));
  }
  render() {
    console.log(this.state.images);

    return (
      <div className="container">
        <ImageGrid images={this.state.images} />
      </div>
    );
  }
}

export default Images;
