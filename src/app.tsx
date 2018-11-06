import React, { Component } from "react";
import Form from "./form";
import v2 from "./core/v2";

type Data = Form["props"]["value"];
export class App extends Component<{}, { data: Data; password: string }> {
  state = { data: { name: "", secure: "" }, password: "-" };
  timeout: number | undefined = undefined;
  onChange = (data: Data) => {
    this.setState({
      ...this.state,
      data,
      password: "generating..."
    });
    this.updatePasswordDelayed();
  };
  updatePassword = () => {
    v2(this.state.data.secure, this.state.data.name, 14)
      .then(password => {
        this.setState({
          ...this.state,
          password
        });
      })
      .catch(console.error);
  };
  clearTimeout() {
    if (!this.timeout) return;
    clearTimeout(this.timeout);
    this.timeout = undefined;
  }
  updatePasswordDelayed() {
    this.clearTimeout();
    this.timeout = window.setTimeout(this.updatePassword, 1000);
  }
  render() {
    return (
      <div>
        <Form onChange={this.onChange} value={this.state.data} />
        <p>{this.state.password}</p>
      </div>
    );
  }
}

export default App;
