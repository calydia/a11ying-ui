import { jsx as i } from "react/jsx-runtime";
function a({
  children: o,
  variant: e = "primary",
  href: t,
  onClick: u,
  type: r = "button",
  disabled: s,
  className: n = ""
}) {
  const l = e === "primary" ? `button item--transition${n ? ` ${n}` : ""}` : `button--alternative item--transition${n ? ` ${n}` : ""}`;
  return t ? /* @__PURE__ */ i("a", { href: t, className: l, children: o }) : /* @__PURE__ */ i("button", { type: r, onClick: u, disabled: s, className: l, children: o });
}
function b({ variant: o = "toc", children: e, className: t = "" }) {
  return o === "blockquote" ? /* @__PURE__ */ i("blockquote", { className: t || void 0, children: e }) : o === "notice" ? /* @__PURE__ */ i("div", { className: `notice-box${t ? ` ${t}` : ""}`, children: e }) : /* @__PURE__ */ i("div", { className: `toc-box${t ? ` ${t}` : ""}`, children: e });
}
function f({ href: o, id: e, label: t, forceVisible: u = !1 }) {
  return /* @__PURE__ */ i("a", { href: o, id: e, className: `${u ? "absolute top-8 left-8" : "sr-only focus:not-sr-only focus:absolute focus:top-8 focus:left-8"} text-xl text-black bg-lt-blue-light dark:bg-dk-purple dark:text-white dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-2 focus:p-4 focus:outline focus:outline-2 focus:outline-black dark:focus:outline-white`, children: t });
}
export {
  b as Box,
  a as Button,
  f as SkipLink
};
