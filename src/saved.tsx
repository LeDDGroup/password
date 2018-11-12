import React from "react";
import { extended, labeled } from "./hoc";
import { options, PublicData } from "./data";

export class Saved extends React.Component<{
  onCopy: (data: PublicData) => void;
  onRemove: (index: number) => void;
  datalist: PublicData[];
}> {
  render() {
    return (
      <div>
        <h1>Saved Passwords</h1>
        <table>
          <tbody>
            {this.props.datalist.map((data, index) => (
              <tr key={index}>
                <td>
                  <button onClick={() => this.props.onCopy(data)}>copy</button>
                  <button onClick={() => this.props.onRemove(index)}>
                    delete
                  </button>
                </td>
                <td>{data.version}</td>
                <td>{data.amount}</td>
                <td>{data.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Saved;
