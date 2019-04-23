import React from "react";
class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images
    };
  }
  static getDerivedStateFromProps(next, state) {
    return next;
  }
  render() {
    const images = this.state.images.map((image, index) => (
      <div className="col-4" key={index}>
        <img src={image} alt="" />
      </div>
    ));
    return <div className="row">{images}</div>;
  }
}
export default ImageGrid;
