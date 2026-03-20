import {log} from "./log";

window.dispatchEvent(
  new CustomEvent("POSTTOP_INSTALLED", {
    detail: {version: "1.0"},
  }),
);

// @ts-expect-error
if (!window.__postToPInjected) {
  // @ts-expect-error
  window.__postToPInjected = true;
} else {
  throw Error("Already injected");
}
log.info(`content_script.ts called`);
