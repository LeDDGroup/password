import React, { ComponentClass, Component } from "react";
import { extract } from "./extract";
import { UniformInput } from "uniform-react-components";

export function extended<P>(
  extraPropsKeys: (keyof P)[],
  placement: (props: P, children: JSX.Element) => JSX.Element
) {
  return <PP extends {}>(Component: ComponentClass<PP>) => (props: P & PP) => {
    const [inherentProps, extraProps] = extract(props, extraPropsKeys);
    return placement(
      extraProps,
      <Component {...(inherentProps as any) as PP} />
    );
  };
}

export const labeled = extended(
  ["label"],
  (props: { label: string }, component) => (
    <div>
      <label>{props.label}</label>
      {component}
    </div>
  )
);
