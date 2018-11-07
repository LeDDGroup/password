import { UniformOptionProps } from "uniform-react-components";

export type PublicData = {
  name: string;
  version: "v1" | "v2";
  amount: number;
};

export type Data = {
  secure: string;
} & PublicData;

export const options: UniformOptionProps<Data["version"]>[] = [
  { value: "v1", children: "V1" },
  { value: "v2", children: "V2" }
];
