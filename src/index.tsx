import "milligram/dist/milligram.css";
import "./index.css";
import { v1, v2 } from "@leddgroup/password-core";
import { createElement } from "tsx-create-html-element";
import { removeChildren } from "./remove-children";
import { copy } from "./clipboard";

(async () => {
  const app = document.getElementById("app");
  removeChildren(app);
  const passwordRef: JSX.Reference<"input"> = {};
  const siteRef: JSX.Reference<"input"> = {};
  const resultRef: JSX.Reference<"input"> = {};
  const generateRef: JSX.Reference<"input"> = {};
  const amountRef: JSX.Reference<"input"> = {};
  const versionRef: JSX.Reference<"select"> = {};
  const copyInputRef: JSX.Reference<"input"> = {};
  const copyInput = (
    <div className="flexed">
      <input
        onclick={handle(async () => copy(resultRef.value!.value))}
        ref={copyInputRef}
        type="button"
        value="Copy"
      />
      <input ref={resultRef} type="password" placeholder="result" />
    </div>
  );
  const container = (
    <div className="container small-container">
      <label>Master Password</label>
      <input
        ref={passwordRef}
        type="password"
        onkeydown={onKeydown}
        placeholder="master password"
      />
      <label>Site</label>
      <input
        ref={siteRef}
        type="text"
        onkeydown={onKeydown}
        placeholder="site"
      />
      <label>Amount</label>
      <input
        ref={amountRef}
        type="number"
        onkeydown={onKeydown}
        placeholder="amount"
        value="14"
      />
      <label>Version</label>
      <select onkeydown={onKeydown} ref={versionRef}>
        <option value="v1">v1</option>
        <option value="v2" selected>
          v2
        </option>
      </select>
      <input
        ref={generateRef}
        onclick={handle(generate)}
        type="button"
        value="Generate"
      />
    </div>
  );
  app.appendChild(container);
  function onKeydown(ev: KeyboardEvent) {
    if (ev.keyCode === 13) {
      generateRef.value!.focus();
      generateRef.value!.click();
    }
  }
  async function generate() {
    const pass =
      versionRef.value!.value === "v2"
        ? await v2(
            passwordRef.value!.value,
            siteRef.value!.value,
            parseInt(amountRef.value!.value)
          )
        : await v1(
            passwordRef.value!.value,
            siteRef.value!.value,
            parseInt(amountRef.value!.value)
          );
    resultRef.value!.value = pass;
    if (copyInput.parentElement === null) {
      container.appendChild(copyInput);
    }
    copyInputRef.value!.focus();
  }
  function handle(fn: (...args: any[]) => Promise<any>) {
    return () =>
      fn().catch((err: Error) => {
        console.error(err.message);
        alert(err.message);
      });
  }
})().catch(alert);

declare global {
  interface Document {
    getElementById(selector: "app"): HTMLDivElement;
  }
}
