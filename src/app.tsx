import React, { Component } from "react";
import Form from "./form";
import { v1, v2 } from "@leddgroup/password-core";
import { PublicData } from "./data";
import Saved from "./saved";
import { labeled } from "./hoc";
import { UniformInput } from "uniform-react-components";
import { getSetStateAsync } from "set-state-async";
import { setLocalStorage, getLocalStorage } from "./storage";

const TIME_TO_GENERATE = 200;

function delay(
  timeout: number
): { promise: Promise<void>; cancel: () => void } {
  let reference = 0;
  return {
    promise: new Promise(s => {
      reference = window.setTimeout(s, timeout);
    }),
    cancel: () => {
      window.clearTimeout(reference);
    }
  };
}

type State = {
  data: PublicData;
  password: string;
  secure: string;
  saved: PublicData[];
};

const Input = labeled(UniformInput);
export class App extends Component {
  state = this.getInitialState();
  generateCancel: (() => void) | null = null;
  setStateAsync = getSetStateAsync(this);
  render() {
    return (
      <div>
        <Input
          label="secure"
          type="password"
          onChange={this.changeSecure}
          value={this.state.secure}
        />
        <Form onChange={this.changeData} value={this.state.data} />
        <p>{this.state.password}</p>
        <button onClick={this.save}>Save</button>
        <Saved
          onCopy={this.changeData}
          onRemove={this.remove}
          datalist={this.state.saved}
        />
      </div>
    );
  }
  getInitialState(): State {
    return {
      data: {
        name: "",
        version: "v2" as PublicData["version"],
        amount: 14
      },
      saved: getLocalStorage(),
      secure: "",
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
  };
  changeSecure = async (secure: string) => {
    await this.setStateAsync({
      ...this.state,
      secure
    });
    this.updatePassword();
  };
  changeData = async (data: Partial<PublicData>) => {
    await this.setStateAsync({
      ...this.state,
      data: {
        ...this.state.data,
        ...data
      }
    });
    this.updatePassword();
  };
  updatePassword = async () => {
    await this.setStateAsync({
      ...this.state,
      password: "generating..."
    });
    if (this.generateCancel) {
      this.generateCancel();
      this.generateCancel = null;
    }
    const delayed = delay(TIME_TO_GENERATE);
    this.generateCancel = delayed.cancel;
    await delayed.promise;
    const password = await (this.state.data.version === "v1" ? v1 : v2)(
      this.state.secure,
      this.state.data.name,
      this.state.data.amount
    );
    await this.setStateAsync({
      ...this.state,
      password
    });
  };
}

export default App;
