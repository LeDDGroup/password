import React, { Component } from "react";
import Form from "./form";
import v1 from "./core/v1";
import v2 from "./core/v2";
import { Data, PublicData } from "./data";
import Saved from "./saved";
import { setLocalStorage, getLocalStorage } from "./storage";

const TIME_TO_GENERATE = 200;

export class App extends Component {
  state = this.getInitialState();
  timeout: number | undefined = undefined;
  render() {
    return (
      <div>
        <Form onChange={this.change} value={this.state.data} />
        <p>{this.state.password}</p>
        <button onClick={this.save}>Save</button>
        <Saved
          onCopy={this.change}
          onRemove={this.remove}
          datalist={this.state.saved}
        />
      </div>
    );
  }
  getInitialState(): {
    data: Data;
    saved: PublicData[];
    password: string;
  } {
    return {
      data: {
        name: "",
        secure: "",
        version: "v2" as Data["version"],
        amount: 14
      },
      saved: getLocalStorage(),
      password: "-"
    };
  }
  remove = (index: number) => {
    const saved = this.state.saved.slice();
    saved.splice(index, 1);
    this.setState({
      ...this.state,
      saved
    });
    setLocalStorage(saved);
  };
  save = () => {
    const saved = this.state.saved.concat([
      {
        name: this.state.data.name,
        amount: this.state.data.amount,
        version: this.state.data.version
      }
    ]);
    this.setState({
      ...this.state,
      saved
    });
    setLocalStorage(saved);
  };
  change = (data: Partial<Data>) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        ...data
      },
      password: "generating..."
    });
    this.generatePasswordDelayed();
  };
  generatePasswordDelayed() {
    this.clearTimeout();
    this.timeout = window.setTimeout(this.generatePassword, TIME_TO_GENERATE);
  }
  generatePassword = () => {
    if (this.state.data.version === "v1") {
      this.updatePassword(
        v1(this.state.data.secure, this.state.data.name, this.state.data.amount)
      );
    } else {
      v2(this.state.data.secure, this.state.data.name, this.state.data.amount)
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
