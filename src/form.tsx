import React from "react";
import {
  UniformComponent,
  UniformInput,
  UniformSelect,
  UniformOptionProps,
  UniformInputNumber
} from "uniform-react-components";
import { extended, labeled } from "./hoc";
import { options, PublicData } from "./data";

const Input = labeled(UniformInput);
const InputNumber = labeled(UniformInputNumber);
const Select = labeled(UniformSelect as typeof UniformSelect);

export class Form extends UniformComponent<PublicData> {
  render() {
    return (
      <form>
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
