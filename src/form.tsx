import React from "react";
import { UniformComponent, UniformInput } from "uniform-react-components";
import { extended, labeled } from "./hoc";

const Input = labeled(UniformInput);

export class Form extends UniformComponent<{
  name: string;
  secure: string;
}> {
  render() {
    return (
      <form>
        <Input
          label="secure"
          type="password"
          onChange={this.onChange.secure}
          value={this.props.value.secure}
        />
        <Input
          label="name"
          onChange={this.onChange.name}
          value={this.props.value.name}
        />
      </form>
    );
  }
}

export default Form;
