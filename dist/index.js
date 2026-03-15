import { jsx as i, Fragment as b, jsxs as o } from "react/jsx-runtime";
import B, { useMemo as G, useState as m } from "react";
import { stringify as H } from "qs-esm";
function z({
  children: e,
  variant: t = "primary",
  href: r,
  onClick: l,
  type: n = "button",
  disabled: a,
  className: c = ""
}) {
  const d = t === "primary" ? `button item--transition${c ? ` ${c}` : ""}` : `button--alternative item--transition${c ? ` ${c}` : ""}`;
  return r ? /* @__PURE__ */ i("a", { href: r, className: d, children: e }) : /* @__PURE__ */ i("button", { type: n, onClick: l, disabled: a, className: d, children: e });
}
function J({ variant: e = "toc", children: t, className: r = "" }) {
  return e === "blockquote" ? /* @__PURE__ */ i("blockquote", { className: r || void 0, children: t }) : e === "notice" ? /* @__PURE__ */ i("div", { className: `notice-box${r ? ` ${r}` : ""}`, children: t }) : /* @__PURE__ */ i("div", { className: `toc-box${r ? ` ${r}` : ""}`, children: t });
}
function K({ href: e, id: t, label: r, forceVisible: l = !1 }) {
  return /* @__PURE__ */ i("a", { href: e, id: t, className: `${l ? "absolute top-8 left-8" : "sr-only focus:not-sr-only focus:absolute focus:top-8 focus:left-8"} text-xl text-black bg-lt-blue-light dark:bg-dk-purple dark:text-white dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-2 focus:p-4 focus:outline focus:outline-2 focus:outline-black dark:focus:outline-white`, children: r });
}
function p(e) {
  return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function E(e) {
  const t = [];
  function r(l) {
    if (l.type === "heading") {
      const n = l.children?.map((c) => c.text || "").join("") || "", a = p(n);
      t.push({ id: a, text: n, level: l.tag });
    }
    if (l.type === "block" && l.fields?.blockType === "ContentBox") {
      const n = l.fields?.heading?.replace(" ", "-"), a = p(n ?? "") || "content-box";
      t.push({ id: a, text: l.fields?.heading ?? "", level: "h2" });
    }
    l.children?.forEach(r);
  }
  return e.forEach(r), t;
}
const v = {
  paragraph: (e, t) => /* @__PURE__ */ i("p", { className: "mb-4", children: t }),
  heading: (e, t) => {
    const r = `${e.tag}`, l = e.children?.map((a) => a.text || "").join("") || "", n = p(l);
    return /* @__PURE__ */ i(r, { id: n, className: "font-bold mt-6 mb-2", children: t });
  },
  text: (e) => {
    let t = e.text;
    return e.format && (e.format & 1 && (t = /* @__PURE__ */ i("strong", { children: t })), e.format & 2 && (t = /* @__PURE__ */ i("em", { children: t })), e.format & 4 && (t = /* @__PURE__ */ i("s", { children: t })), e.format & 8 && (t = /* @__PURE__ */ i("u", { children: t })), e.format & 16 && (t = /* @__PURE__ */ i("code", { children: t })), e.format & 32 && (t = /* @__PURE__ */ i("sub", { children: t })), e.format & 64 && (t = /* @__PURE__ */ i("sup", { children: t }))), /* @__PURE__ */ i(b, { children: t });
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
    const r = `${e.tag || "ul"}`;
    return /* @__PURE__ */ i(r, { className: "ml-6", children: t });
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
  block: (e, t, r) => {
    const l = e.fields?.blockType;
    if (l === "DisclosureWidget") {
      const n = e.fields?.content?.root?.children || [];
      return /* @__PURE__ */ o("details", { children: [
        /* @__PURE__ */ i("summary", { className: "cursor-pointer font-bold text-2xl", children: e.fields?.heading || "Details" }),
        /* @__PURE__ */ i("div", { className: "details-content", children: /* @__PURE__ */ i(N, { nodes: n, lang: r }) })
      ] });
    }
    if (l === "ContentBox") {
      const n = e.fields?.boxContent?.root?.children || [], a = e.fields?.heading?.replace(" ", "-") ?? "", c = p(a) || "content-box", d = e.fields?.cssClass, x = e.fields?.cssClass === "box-gradient" ? "gradient-border-light dark:gradient-border-dark" : "";
      return /* @__PURE__ */ o("div", { className: `${d} ${x}`, children: [
        /* @__PURE__ */ i("h2", { id: c, children: e.fields?.heading }),
        /* @__PURE__ */ i("div", { className: "content-box--inner-wrapper", children: /* @__PURE__ */ i(N, { nodes: n, lang: r }) })
      ] });
    }
    return l === "CodeBlock" ? e.fields?.renderField ? /* @__PURE__ */ i(
      "div",
      {
        className: "richtext-html-block",
        dangerouslySetInnerHTML: { __html: e.fields?.HTMLContent ?? "" }
      }
    ) : /* @__PURE__ */ i("code", { className: "w-full my-2 block", children: e.fields?.HTMLContent }) : l === "quoteWithCite" ? /* @__PURE__ */ o("blockquote", { children: [
      e.fields?.quote,
      /* @__PURE__ */ i("cite", { children: e.fields?.cite })
    ] }) : null;
  },
  inlineBlock: (e) => {
    const t = e.fields?.blockType;
    return t === "language" ? /* @__PURE__ */ i("span", { lang: e.fields?.language || "en", children: e.fields?.languageContent }) : t === "abbreviation" ? /* @__PURE__ */ i("abbr", { title: e.fields?.definition ?? void 0, children: e.fields?.abbreviation }) : null;
  }
};
function w(e, t, r) {
  const l = e.children?.map((n, a) => w(n, a, r)) || [];
  return v[e.type] ? /* @__PURE__ */ i(B.Fragment, { children: v[e.type](e, l, r) }, t) : /* @__PURE__ */ o("span", { className: "bg-red-100 text-red-700", children: [
    "[Unhandled node type: ",
    e.type,
    "]"
  ] }, t);
}
function M(e) {
  return e === "fi" ? "Tällä sivulla" : "On this page";
}
function N({ nodes: e, lang: t, withTOC: r = !1, tocLabel: l }) {
  const n = G(() => E(e), [e]), a = l ?? M(t);
  return r ? /* @__PURE__ */ i(b, { children: n.length > 0 && /* @__PURE__ */ o("div", { className: "toc-box", children: [
    /* @__PURE__ */ i("h2", { id: "toc-heading", className: "mb-2 mt-0", children: a }),
    /* @__PURE__ */ i("nav", { "aria-labelledby": "toc-heading", children: /* @__PURE__ */ i("ul", { className: "ml-4 mb-0", children: n.map((c) => /* @__PURE__ */ i("li", { children: /* @__PURE__ */ i("a", { href: `#${c.id}`, className: "text-blue-600 underline", children: c.text }) }, c.id)) }) })
  ] }) }) : /* @__PURE__ */ i(b, { children: e.map((c, d) => w(c, d, t)) });
}
async function F(e, t, r) {
  const l = r ? `locale=${r}` : "", n = `${e}/api/search?${l}&pagination=false&${t}`, a = await fetch(n);
  if (!a.ok) throw new Error(`Search request failed: ${a.status}`);
  return a.json();
}
function P(e, t) {
  const r = ["reqpages", "criteria", "guidelines", "principles"];
  let l = t === "en" ? "I would if I could" : "Toki, jos voisin";
  return r.includes(e) && (l = t === "en" ? "Almost, but not quite" : "Melkein, mutta ei ihan"), l;
}
function U(e, t) {
  return {
    criteria: { fi: "WCAG-kriteeri", en: "WCAG criterion" },
    guidelines: { fi: "WCAG-ohje", en: "WCAG guideline" },
    principles: { fi: "WCAG-periaate", en: "WCAG principle" }
  }[e]?.[t === "fi" ? "fi" : "en"] ?? "";
}
function Q({
  searchLabel: e,
  searchButton: t,
  searchMainHeading: r,
  searchResultLabel: l,
  searchNoResults: n,
  searchLocale: a,
  searchSiteName: c,
  searchContentType: d,
  payloadUrl: x,
  defaultResultBaseUrl: $ = "/",
  resultBaseUrls: C = {}
}) {
  const [g, T] = m(""), [y, S] = m(null), [u, q] = m(), [W, j] = m("");
  function A(s) {
    return C[s] ?? $;
  }
  const D = async (s, f) => {
    const h = await F(x, H({
      where: {
        and: [
          {
            or: [
              { title: { like: s } },
              { searchLead: { like: s } },
              { searchContent: { like: s } },
              { searchDescription: { like: s } }
            ]
          }
        ]
      }
    }), f);
    S(h), q(h.totalDocs);
  };
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ i("div", { className: "text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl", children: /* @__PURE__ */ o(
      "form",
      {
        id: "site-search",
        onSubmit: async (s) => {
          s.preventDefault();
          try {
            await D(g, a), j(g);
          } catch (f) {
            console.error(f);
          }
        },
        role: "search",
        className: "flex flex-col flex-wrap w-full md:items-center md:gap-x-6 md:gap-y-2 md:flex-row",
        children: [
          /* @__PURE__ */ i("label", { htmlFor: "search-input", className: "text-lt-gray dark:text-dk-gray w-full", children: e }),
          /* @__PURE__ */ i(
            "input",
            {
              id: "search-input",
              type: "text",
              className: "w-full md:max-w-sm",
              onChange: (s) => T(s.currentTarget.value)
            }
          ),
          /* @__PURE__ */ i("button", { type: "submit", className: "button item--transition max-md:my-4", children: t })
        ]
      }
    ) }),
    /* @__PURE__ */ i("div", { className: "sr-only", role: "status", children: u > 0 ? `${u} ${l}` : n }),
    /* @__PURE__ */ o("div", { className: "text-lt-gray dark:text-dk-gray pt-4 pb-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl", children: [
      u > 0 && /* @__PURE__ */ i("div", { className: "border-t-4 gradient-border-light dark:gradient-border-dark pt-4", children: /* @__PURE__ */ o("h2", { children: [
        r,
        " ",
        W,
        ", ",
        u,
        " ",
        l
      ] }) }),
      y && /* @__PURE__ */ i("ul", { children: y.docs.map((s, f) => {
        const k = P(s.doc.relationTo, a), h = U(s.doc.relationTo, a), _ = A(s.doc.relationTo);
        return /* @__PURE__ */ o(
          "li",
          {
            className: "my-2 py-6 flex flex-col border-t-2",
            children: [
              /* @__PURE__ */ i(
                "a",
                {
                  className: "my-2 text-xl order-3",
                  href: `${_}${a}/${s.searchPageUrl}/`,
                  children: /* @__PURE__ */ i("h3", { className: "search-heading mt-0 mb-0.5 text-lg lg:text-xl inline", children: s.title })
                }
              ),
              /* @__PURE__ */ o("span", { className: "w-full self-end text-sm text-right order-1", children: [
                c,
                " ",
                k
              ] }),
              h && /* @__PURE__ */ o("span", { className: "w-full self-end text-sm order-2", children: [
                d,
                " ",
                h
              ] }),
              /* @__PURE__ */ i("span", { className: "block text-lg order-4", children: s.searchDescription })
            ]
          },
          `result-${f}`
        );
      }) }),
      u === 0 && /* @__PURE__ */ i("p", { children: n })
    ] })
  ] });
}
export {
  J as Box,
  z as Button,
  N as RichText,
  Q as SearchComponent,
  K as SkipLink
};
