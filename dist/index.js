import { jsx as i, Fragment as d, jsxs as o } from "react/jsx-runtime";
import p, { useMemo as g } from "react";
function N({
  children: e,
  variant: t = "primary",
  href: l,
  onClick: r,
  type: n = "button",
  disabled: s,
  className: a = ""
}) {
  const c = t === "primary" ? `button item--transition${a ? ` ${a}` : ""}` : `button--alternative item--transition${a ? ` ${a}` : ""}`;
  return l ? /* @__PURE__ */ i("a", { href: l, className: c, children: e }) : /* @__PURE__ */ i("button", { type: n, onClick: r, disabled: s, className: c, children: e });
}
function $({ variant: e = "toc", children: t, className: l = "" }) {
  return e === "blockquote" ? /* @__PURE__ */ i("blockquote", { className: l || void 0, children: t }) : e === "notice" ? /* @__PURE__ */ i("div", { className: `notice-box${l ? ` ${l}` : ""}`, children: t }) : /* @__PURE__ */ i("div", { className: `toc-box${l ? ` ${l}` : ""}`, children: t });
}
function C({ href: e, id: t, label: l, forceVisible: r = !1 }) {
  return /* @__PURE__ */ i("a", { href: e, id: t, className: `${r ? "absolute top-8 left-8" : "sr-only focus:not-sr-only focus:absolute focus:top-8 focus:left-8"} text-xl text-black bg-lt-blue-light dark:bg-dk-purple dark:text-white dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-2 focus:p-4 focus:outline focus:outline-2 focus:outline-black dark:focus:outline-white`, children: l });
}
function u(e) {
  return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function x(e) {
  const t = [];
  function l(r) {
    if (r.type === "heading") {
      const n = r.children?.map((a) => a.text || "").join("") || "", s = u(n);
      t.push({ id: s, text: n, level: r.tag });
    }
    if (r.type === "block" && r.fields?.blockType === "ContentBox") {
      const n = r.fields?.heading?.replace(" ", "-"), s = u(n ?? "") || "content-box";
      t.push({ id: s, text: r.fields?.heading ?? "", level: "h2" });
    }
    r.children?.forEach(l);
  }
  return e.forEach(l), t;
}
const f = {
  paragraph: (e, t) => /* @__PURE__ */ i("p", { className: "mb-4", children: t }),
  heading: (e, t) => {
    const l = `${e.tag}`, r = e.children?.map((s) => s.text || "").join("") || "", n = u(r);
    return /* @__PURE__ */ i(l, { id: n, className: "font-bold mt-6 mb-2", children: t });
  },
  text: (e) => {
    let t = e.text;
    return e.format && (e.format & 1 && (t = /* @__PURE__ */ i("strong", { children: t })), e.format & 2 && (t = /* @__PURE__ */ i("em", { children: t })), e.format & 4 && (t = /* @__PURE__ */ i("s", { children: t })), e.format & 8 && (t = /* @__PURE__ */ i("u", { children: t })), e.format & 16 && (t = /* @__PURE__ */ i("code", { children: t })), e.format & 32 && (t = /* @__PURE__ */ i("sub", { children: t })), e.format & 64 && (t = /* @__PURE__ */ i("sup", { children: t }))), /* @__PURE__ */ i(d, { children: t });
  },
  linebreak: () => /* @__PURE__ */ i("br", {}),
  link: (e, t) => /* @__PURE__ */ i(
    "a",
    {
      href: e.fields?.url,
      target: e.fields?.newTab ? "_blank" : void 0,
      rel: e.fields?.newTab ? "noopener noreferrer" : void 0,
      children: t
    }
  ),
  list: (e, t) => {
    const l = `${e.tag || "ul"}`;
    return /* @__PURE__ */ i(l, { className: "ml-6", children: t });
  },
  listitem: (e, t) => /* @__PURE__ */ i("li", { children: t }),
  quote: (e, t) => /* @__PURE__ */ i("blockquote", { children: t }),
  horizontalrule: () => /* @__PURE__ */ i("hr", { className: "my-6" }),
  upload: (e) => e.value?.url ? /* @__PURE__ */ i(
    "img",
    {
      src: e.value.url,
      alt: e.value.alt || "",
      className: "my-4 rounded-lg shadow"
    }
  ) : null,
  block: (e, t, l) => {
    const r = e.fields?.blockType;
    if (r === "DisclosureWidget") {
      const n = e.fields?.content?.root?.children || [];
      return /* @__PURE__ */ o("details", { children: [
        /* @__PURE__ */ i("summary", { className: "cursor-pointer font-bold text-2xl", children: e.fields?.heading || "Details" }),
        /* @__PURE__ */ i("div", { className: "details-content", children: /* @__PURE__ */ i(h, { nodes: n, lang: l }) })
      ] });
    }
    if (r === "ContentBox") {
      const n = e.fields?.boxContent?.root?.children || [], s = e.fields?.heading?.replace(" ", "-") ?? "", a = u(s) || "content-box", c = e.fields?.cssClass, m = e.fields?.cssClass === "box-gradient" ? "gradient-border-light dark:gradient-border-dark" : "";
      return /* @__PURE__ */ o("div", { className: `${c} ${m}`, children: [
        /* @__PURE__ */ i("h2", { id: a, children: e.fields?.heading }),
        /* @__PURE__ */ i("div", { className: "content-box--inner-wrapper", children: /* @__PURE__ */ i(h, { nodes: n, lang: l }) })
      ] });
    }
    return r === "CodeBlock" ? e.fields?.renderField ? /* @__PURE__ */ i(
      "div",
      {
        className: "richtext-html-block",
        dangerouslySetInnerHTML: { __html: e.fields?.HTMLContent ?? "" }
      }
    ) : /* @__PURE__ */ i("code", { className: "w-full my-2 block", children: e.fields?.HTMLContent }) : r === "quoteWithCite" ? /* @__PURE__ */ o("blockquote", { children: [
      e.fields?.quote,
      /* @__PURE__ */ i("cite", { children: e.fields?.cite })
    ] }) : null;
  },
  inlineBlock: (e) => {
    const t = e.fields?.blockType;
    return t === "language" ? /* @__PURE__ */ i("span", { lang: e.fields?.language || "en", children: e.fields?.languageContent }) : t === "abbreviation" ? /* @__PURE__ */ i("abbr", { title: e.fields?.definition ?? void 0, children: e.fields?.abbreviation }) : null;
  }
};
function b(e, t, l) {
  const r = e.children?.map((n, s) => b(n, s, l)) || [];
  return f[e.type] ? /* @__PURE__ */ i(p.Fragment, { children: f[e.type](e, r, l) }, t) : /* @__PURE__ */ o("span", { className: "bg-red-100 text-red-700", children: [
    "[Unhandled node type: ",
    e.type,
    "]"
  ] }, t);
}
function k(e) {
  return e === "fi" ? "Tällä sivulla" : "On this page";
}
function h({ nodes: e, lang: t, withTOC: l = !1, tocLabel: r }) {
  const n = g(() => x(e), [e]), s = r ?? k(t);
  return l ? /* @__PURE__ */ i(d, { children: n.length > 0 && /* @__PURE__ */ o("div", { className: "toc-box", children: [
    /* @__PURE__ */ i("h2", { id: "toc-heading", className: "mb-2 mt-0", children: s }),
    /* @__PURE__ */ i("nav", { "aria-labelledby": "toc-heading", children: /* @__PURE__ */ i("ul", { className: "ml-4 mb-0", children: n.map((a) => /* @__PURE__ */ i("li", { children: /* @__PURE__ */ i("a", { href: `#${a.id}`, className: "text-blue-600 underline", children: a.text }) }, a.id)) }) })
  ] }) }) : /* @__PURE__ */ i(d, { children: e.map((a, c) => b(a, c, t)) });
}
export {
  $ as Box,
  N as Button,
  h as RichText,
  C as SkipLink
};
