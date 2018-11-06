import React, { Component } from "react";
import Form from "./form";
import v1 from "./core/v1";
import v2 from "./core/v2";
import { Data } from "./data";

export class App extends Component<{}, { data: Data; password: string }> {
  state = {
    data: { name: "", secure: "", version: "v2" as Data["version"] },
    password: "-"
  };
  timeout: number | undefined = undefined;
  render() {
    return (
      <div>
        <Form onChange={this.onChange} value={this.state.data} />
        <p>{this.state.password}</p>
      </div>
    );
  }
  onChange = (data: Data) => {
    this.setState({
      ...this.state,
      data,
      password: "generating..."
    });
    this.generatePasswordDelayed();
  };
  generatePasswordDelayed() {
    this.clearTimeout();
    this.timeout = window.setTimeout(this.generatePassword, 1000);
  }
  generatePassword = () => {
    if (this.state.data.version === "v1") {
      this.updatePassword(v1(this.state.data.secure, this.state.data.name, 14));
    } else {
      v2(this.state.data.secure, this.state.data.name, 14)
        .then(this.updatePassword)
        .catch(console.error);
    }
  };
  updatePassword = (password: string) => {
    this.setState({
      ...this.state,
      password
    });
  };
  clearTimeout() {
    if (!this.timeout) return;
    clearTimeout(this.timeout);
    this.timeout = undefined;
  }
}

export default App;
