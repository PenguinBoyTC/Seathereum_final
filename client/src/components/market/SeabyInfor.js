import React, { Component } from "react";
import Modal from "react-awesome-modal";
//npm i -S react-awesome-modal

class SeabyInfor extends Component {
  state = {
    name: this.props.name,
    birthTime: this.props.birthTime, //in millisecond
    generation: this.props.generation,
    forSale: this.props.forSale,
    price: this.props.price,
    visible: false
  };

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    // console.log("name", this.state.name);
    const localTime = new Date(this.state.birthTime * 1000).toLocaleString();
    // console.log("localTime", localTime);
    // console.log("generation", this.state.generation);
    // console.log("forSale", this.state.forSale);
    // console.log("forSale", this.state.price);
    return (
      <section>
        <input type="button" value="Open" onClick={() => this.openModal()} />
        <Modal
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <h4>Creature Contents</h4>
            <p>Name: {this.state.name}</p>
            <p>Birthday: {localTime}</p>
            <p>Generation: {this.state.generation}</p>
            <p>Now : ${this.state.price}</p>
            <a href="javascript:void(0);" onClick={() => this.closeModal()}>
              Close
            </a>
          </div>
        </Modal>
      </section>
    );
  }
}

export default SeabyInfor;
