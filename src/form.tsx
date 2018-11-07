import React from "react";
import {
  UniformComponent,
  UniformInput,
  UniformSelect,
  UniformOptionProps,
  UniformInputNumber
} from "uniform-react-components";
import { extended, labeled } from "./hoc";
import { Data, options } from "./data";

const Input = labeled(UniformInput);
const InputNumber = labeled(UniformInputNumber);
const Select = labeled(UniformSelect as typeof UniformSelect);

export class Form extends UniformComponent<Data> {
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
        <InputNumber
          label="amount"
          type="number"
          onChange={this.onChange.amount}
          value={this.props.value.amount}
        />
        <Select
          label="version"
          options={options}
          onChange={this.onChange.version as any}
          value={this.props.value.version}
        />
      </form>
    );
  }
}

export default Form;
