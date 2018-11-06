import { UniformOptionProps } from "uniform-react-components";

export type Data = {
  name: string;
  secure: string;
  version: "v1" | "v2";
  amount: number;
};

export const options: UniformOptionProps<Data["version"]>[] = [
  { value: "v1", children: "V1" },
  { value: "v2", children: "V2" }
];
