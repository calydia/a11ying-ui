import { jsx as t, Fragment as w, jsxs as c } from "react/jsx-runtime";
import D from "sanitize-html";
import H, { useMemo as j, useState as b, useEffect as F } from "react";
import { stringify as z } from "qs-esm";
function ae({
  children: e,
  variant: r = "primary",
  href: a,
  onClick: l,
  type: i = "button",
  disabled: s,
  className: d = ""
}) {
  const n = r === "primary" ? `button item--transition${d ? ` ${d}` : ""}` : `button--alternative item--transition${d ? ` ${d}` : ""}`;
  return a ? /* @__PURE__ */ t("a", { href: a, className: n, children: e }) : /* @__PURE__ */ t("button", { type: i, onClick: l, disabled: s, className: n, children: e });
}
function le({ variant: e = "toc", children: r, className: a = "" }) {
  return e === "blockquote" ? /* @__PURE__ */ t("blockquote", { className: a || void 0, children: r }) : e === "notice" ? /* @__PURE__ */ t("div", { className: `notice-box${a ? ` ${a}` : ""}`, children: r }) : /* @__PURE__ */ t("div", { className: `toc-box${a ? ` ${a}` : ""}`, children: r });
}
function ne({ href: e, id: r, label: a, forceVisible: l = !1 }) {
  return /* @__PURE__ */ t("a", { href: e, id: r, className: `${l ? "absolute top-8 left-8" : "sr-only focus:not-sr-only focus:absolute focus:top-8 focus:left-8"} text-xl text-black bg-lt-blue-light dark:bg-dk-purple dark:text-white dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-2 focus:p-4 focus:outline focus:outline-2 focus:outline-black dark:focus:outline-white`, children: a });
}
function _(e) {
  return e.toLowerCase().normalize("NFKD").replace(new RegExp("\\p{M}+", "gu"), "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function T(e) {
  return e.type === "text" ? e.text ?? "" : e.children?.map(T).join("") ?? "";
}
function L(e) {
  const r = /* @__PURE__ */ new WeakMap(), a = [], l = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  function s(n, m) {
    const o = _(n) || m;
    if (!l.has(o))
      return l.add(o), i.set(o, 1), o;
    let h = i.get(o) ?? 1, f = `${o}-${h}`;
    for (; l.has(f); )
      h += 1, f = `${o}-${h}`;
    return l.add(f), i.set(o, h + 1), f;
  }
  function d(n, m) {
    if (n.type === "heading") {
      const o = T(n), h = s(o, "heading");
      r.set(n, h), m && a.push({
        id: h,
        text: o,
        level: n.tag ?? "h2"
      });
    }
    if (n.type === "block" && n.fields?.blockType === "ContentBox") {
      const o = n.fields.heading ?? "", h = s(o, "content-box");
      r.set(n, h), m && a.push({ id: h, text: o, level: "h2" }), n.fields.boxContent?.root?.children?.forEach((f) => {
        d(f, !1);
      });
    } else n.type === "block" && n.fields?.blockType === "DisclosureWidget" && n.fields.content?.root?.children?.forEach((o) => {
      d(o, !1);
    });
    n.children?.forEach((o) => d(o, m));
  }
  return e.forEach((n) => d(n, !0)), { ids: r, tocEntries: a };
}
const M = ["http", "https", "mailto", "tel"];
function $(e, r = M) {
  const a = e?.trim();
  if (!a || a.startsWith("//") || /[\u0000-\u001F\u007F]/.test(a))
    return;
  const l = a.match(/^([a-z][a-z0-9+.-]*):/i)?.[1]?.toLowerCase();
  return !l || r.includes(l) ? a : void 0;
}
function P(e) {
  return D(e ?? "", {
    allowedTags: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "del",
      "code",
      "pre",
      "blockquote",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "a",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "caption",
      "img",
      "hr",
      "sub",
      "sup",
      "abbr"
    ],
    allowedAttributes: {
      "*": ["id", "lang", "dir"],
      a: ["href", "title", "target", "rel", "hreflang", "class"],
      abbr: ["title"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      ol: ["start", "reversed", "type"],
      li: ["value"],
      th: ["colspan", "rowspan", "scope", "headers"],
      td: ["colspan", "rowspan", "headers"]
    },
    allowedSchemes: M,
    allowedSchemesByTag: {
      img: ["http", "https"]
    },
    allowProtocolRelative: !1,
    transformTags: {
      a: (r, a) => {
        if (a.class = "underline underline-offset-4 decoration-1 hover:decoration-2", a.target === "_blank") {
          const l = new Set((a.rel ?? "").split(/\s+/).filter(Boolean));
          l.add("noopener"), l.add("noreferrer"), a.rel = [...l].join(" ");
        }
        return { tagName: "a", attribs: a };
      }
    }
  });
}
const S = {
  paragraph: (e, r) => /* @__PURE__ */ t("p", { className: "mb-4", children: r }),
  heading: (e, r, a) => {
    const l = e.tag || "h2", i = a.headingPlan.ids.get(e) ?? "heading";
    return /* @__PURE__ */ t(l, { id: i, className: "font-bold mt-6 mb-2", children: r });
  },
  text: (e) => {
    let r = e.text;
    return e.format && (e.format & 1 && (r = /* @__PURE__ */ t("strong", { children: r })), e.format & 2 && (r = /* @__PURE__ */ t("em", { children: r })), e.format & 4 && (r = /* @__PURE__ */ t("s", { children: r })), e.format & 8 && (r = /* @__PURE__ */ t("u", { children: r })), e.format & 16 && (r = /* @__PURE__ */ t("code", { children: r })), e.format & 32 && (r = /* @__PURE__ */ t("sub", { children: r })), e.format & 64 && (r = /* @__PURE__ */ t("sup", { children: r }))), /* @__PURE__ */ t(w, { children: r });
  },
  linebreak: () => /* @__PURE__ */ t("br", {}),
  link: (e, r) => {
    const a = $(e.fields?.url);
    return a ? /* @__PURE__ */ t(
      "a",
      {
        href: a,
        target: e.fields?.newTab ? "_blank" : void 0,
        rel: e.fields?.newTab ? "noopener noreferrer" : void 0,
        className: "underline underline-offset-4 decoration-1 hover:decoration-2",
        children: r
      }
    ) : /* @__PURE__ */ t(w, { children: r });
  },
  list: (e, r) => {
    const a = e.tag || "ul";
    return /* @__PURE__ */ t(a, { className: "ml-6", children: r });
  },
  listitem: (e, r) => /* @__PURE__ */ t("li", { children: r }),
  quote: (e, r) => /* @__PURE__ */ t("blockquote", { children: r }),
  horizontalrule: () => /* @__PURE__ */ t("hr", { className: "my-6" }),
  upload: (e) => {
    const r = e.value, a = $(r?.url, ["http", "https"]);
    return a ? /* @__PURE__ */ t(
      "img",
      {
        src: a,
        alt: r?.alt || "",
        className: "my-4 rounded-lg shadow"
      }
    ) : null;
  },
  block: (e, r, a) => {
    const l = e.fields?.blockType;
    if (l === "DisclosureWidget") {
      const i = e.fields?.content?.root?.children || [];
      return /* @__PURE__ */ c("details", { children: [
        /* @__PURE__ */ t("summary", { className: "cursor-pointer font-bold text-2xl", children: e.fields?.heading || "Details" }),
        /* @__PURE__ */ t("div", { className: "details-content", children: y(i, a) })
      ] });
    }
    if (l === "ContentBox") {
      const i = e.fields?.boxContent?.root?.children || [], s = a.headingPlan.ids.get(e) ?? "content-box", d = e.fields?.cssClass, n = e.fields?.cssClass === "box-gradient" ? "gradient-border-light dark:gradient-border-dark" : "";
      return /* @__PURE__ */ c("div", { className: `${d} ${n}`, children: [
        /* @__PURE__ */ t("h2", { id: s, children: e.fields?.heading }),
        /* @__PURE__ */ t("div", { className: "content-box--inner-wrapper", children: y(i, a) })
      ] });
    }
    return l === "CodeBlock" ? e.fields?.renderField ? /* @__PURE__ */ t(
      "div",
      {
        className: "richtext-html-block",
        dangerouslySetInnerHTML: { __html: P(e.fields?.HTMLContent) }
      }
    ) : /* @__PURE__ */ t("code", { className: "w-full my-2 block", children: e.fields?.HTMLContent }) : l === "quoteWithCite" ? /* @__PURE__ */ c("blockquote", { children: [
      e.fields?.quote,
      /* @__PURE__ */ t("cite", { children: e.fields?.cite })
    ] }) : null;
  },
  inlineBlock: (e) => {
    const r = e.fields?.blockType;
    return r === "language" ? /* @__PURE__ */ t("span", { lang: e.fields?.language || "en", children: e.fields?.languageContent }) : r === "abbreviation" ? /* @__PURE__ */ t("abbr", { title: e.fields?.definition ?? void 0, children: e.fields?.abbreviation }) : null;
  }
};
function E(e, r, a) {
  const l = e.children?.map((i, s) => E(i, s, a)) || [];
  return S[e.type] ? /* @__PURE__ */ t(H.Fragment, { children: S[e.type](e, l, a) }, r) : /* @__PURE__ */ c("span", { className: "bg-red-100 text-red-700", children: [
    "[Unhandled node type: ",
    e.type,
    "]"
  ] }, r);
}
function y(e, r) {
  return e.map((a, l) => E(a, l, r));
}
function R(e) {
  return e === "fi" ? "Tällä sivulla" : "On this page";
}
function ie({ nodes: e, lang: r, withTOC: a = !1, tocLabel: l }) {
  const i = j(() => L(e), [e]), s = l ?? R(r);
  return a ? /* @__PURE__ */ t(w, { children: i.tocEntries.length > 0 && /* @__PURE__ */ c("div", { className: "toc-box", children: [
    /* @__PURE__ */ t("h2", { id: "toc-heading", className: "mb-2 mt-0", children: s }),
    /* @__PURE__ */ t("nav", { "aria-labelledby": "toc-heading", children: /* @__PURE__ */ t("ul", { className: "ml-4 mb-0", children: i.tocEntries.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { href: `#${d.id}`, className: "text-blue-600 underline", children: d.text }) }, d.id)) }) })
  ] }) }) : /* @__PURE__ */ t(w, { children: y(e, { lang: r, headingPlan: i }) });
}
async function G(e, r, a) {
  const l = a ? `locale=${a}` : "", i = `${e}/api/search?${l}&pagination=false&${r}`, s = await fetch(i);
  if (!s.ok) throw new Error(`Search request failed: ${s.status}`);
  return s.json();
}
function U(e, r) {
  const a = ["reqpages", "criteria", "guidelines", "principles"];
  let l = r === "en" ? "I would if I could" : "Toki, jos voisin";
  return a.includes(e) && (l = r === "en" ? "Almost, but not quite" : "Melkein, mutta ei ihan"), l;
}
function O(e, r) {
  return {
    criteria: { fi: "WCAG-kriteeri", en: "WCAG criterion" },
    guidelines: { fi: "WCAG-ohje", en: "WCAG guideline" },
    principles: { fi: "WCAG-periaate", en: "WCAG principle" }
  }[e]?.[r === "fi" ? "fi" : "en"] ?? "";
}
function se({
  searchLabel: e,
  searchButton: r,
  searchMainHeading: a,
  searchResultLabel: l,
  searchNoResults: i,
  searchLocale: s,
  searchSiteName: d,
  searchContentType: n,
  payloadUrl: m,
  defaultResultBaseUrl: o = "/",
  resultBaseUrls: h = {}
}) {
  const [f, N] = b(""), [v, g] = b(null), [p, A] = b(), [W, Z] = b("");
  function B(u) {
    return h[u] ?? o;
  }
  const I = async (u, x) => {
    const k = await G(m, z({
      where: {
        and: [
          {
            or: [
              { title: { like: u } },
              { searchLead: { like: u } },
              { searchContent: { like: u } },
              { searchDescription: { like: u } }
            ]
          }
        ]
      }
    }), x);
    g(k), A(k.totalDocs);
  };
  return /* @__PURE__ */ c("div", { children: [
    /* @__PURE__ */ t("div", { className: "text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl", children: /* @__PURE__ */ c(
      "form",
      {
        id: "site-search",
        onSubmit: async (u) => {
          u.preventDefault();
          try {
            await I(f, s), Z(f);
          } catch (x) {
            console.error(x);
          }
        },
        role: "search",
        className: "flex flex-col flex-wrap w-full md:items-center md:gap-x-6 md:gap-y-2 md:flex-row",
        children: [
          /* @__PURE__ */ t("label", { htmlFor: "search-input", className: "text-lt-gray dark:text-dk-gray w-full", children: e }),
          /* @__PURE__ */ t(
            "input",
            {
              id: "search-input",
              type: "text",
              className: "w-full md:max-w-sm",
              onChange: (u) => N(u.currentTarget.value)
            }
          ),
          /* @__PURE__ */ t("button", { type: "submit", className: "button item--transition max-md:my-4", children: r })
        ]
      }
    ) }),
    /* @__PURE__ */ t("div", { className: "sr-only", role: "status", children: p > 0 ? `${p} ${l}` : i }),
    /* @__PURE__ */ c("div", { className: "text-lt-gray dark:text-dk-gray pt-4 pb-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl", children: [
      p > 0 && /* @__PURE__ */ t("div", { className: "border-t-4 gradient-border-light dark:gradient-border-dark pt-4", children: /* @__PURE__ */ c("h2", { children: [
        a,
        " ",
        W,
        ", ",
        p,
        " ",
        l
      ] }) }),
      v && /* @__PURE__ */ t("ul", { children: v.docs.map((u, x) => {
        const C = U(u.doc.relationTo, s), k = O(u.doc.relationTo, s), q = B(u.doc.relationTo);
        return /* @__PURE__ */ c(
          "li",
          {
            className: "my-2 py-6 flex flex-col border-t-2",
            children: [
              /* @__PURE__ */ t(
                "a",
                {
                  className: "my-2 text-xl order-3 inline-flex items-baseline self-start",
                  href: `${q}${s}/${u.searchPageUrl}/`,
                  children: /* @__PURE__ */ t("h3", { className: "search-heading mt-0 mb-0.5 text-lg lg:text-xl", children: u.title })
                }
              ),
              /* @__PURE__ */ c("span", { className: "w-full self-end text-sm text-right order-1", children: [
                d,
                " ",
                C
              ] }),
              k && /* @__PURE__ */ c("span", { className: "w-full self-end text-sm order-2", children: [
                n,
                " ",
                k
              ] }),
              /* @__PURE__ */ t("span", { className: "block text-lg order-4", children: u.searchDescription })
            ]
          },
          `result-${x}`
        );
      }) }),
      p === 0 && /* @__PURE__ */ t("p", { children: i })
    ] })
  ] });
}
const V = () => /* @__PURE__ */ t("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", className: "h-8 w-8", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fill: "currentColor", fillRule: "evenodd", d: "M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9a8.97 8.97 0 0 0 3.463-.69a.75.75 0 0 1 .981.98a10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5c0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z", clipRule: "evenodd" }) }), K = () => /* @__PURE__ */ t("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", className: "h-8 w-8", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fill: "currentColor", d: "M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0Zm11.394-5.834a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75Zm-3.916 6.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18Zm-4.242-.697a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12Zm.697-4.243a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" }) });
function oe({ darkLabel: e, lightLabel: r }) {
  const [a, l] = b(!1), i = (n = !0) => {
    document.documentElement.classList.add("dark"), document.documentElement.classList.remove("light"), n && localStorage.setItem("darkMode", "enabled"), l(!0);
  }, s = (n = !0) => {
    document.documentElement.classList.remove("dark"), document.documentElement.classList.add("light"), n && localStorage.setItem("darkMode", "disabled"), l(!1);
  };
  return F(() => {
    const n = localStorage.getItem("darkMode");
    n === "enabled" ? i() : n === "disabled" ? s() : window.matchMedia("(prefers-color-scheme: dark)").matches ? i(!1) : s(!1);
  }, []), /* @__PURE__ */ c(
    "button",
    {
      id: "theme-toggle-button",
      "aria-pressed": a,
      onClick: () => {
        document.documentElement.classList.contains("dark") ? s() : i();
      },
      className: `py-2 px-3 text-black dark:text-white border-y-4 border-transparent
        hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
        focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white`,
      children: [
        /* @__PURE__ */ c("span", { className: "darkmode-dark", children: [
          /* @__PURE__ */ t(V, {}),
          /* @__PURE__ */ t("span", { className: "sr-only", children: e })
        ] }),
        /* @__PURE__ */ c("span", { className: "darkmode-light", children: [
          /* @__PURE__ */ t(K, {}),
          /* @__PURE__ */ t("span", { className: "sr-only", children: r })
        ] })
      ]
    }
  );
}
const J = () => /* @__PURE__ */ t("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", className: "h-8 w-8", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fill: "currentColor", fillRule: "evenodd", d: "M9 2.25a.75.75 0 0 1 .75.75v1.506a49.38 49.38 0 0 1 5.343.371a.75.75 0 1 1-.186 1.489a46.7 46.7 0 0 0-1.99-.206a18.67 18.67 0 0 1-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 1 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482a.75.75 0 1 1-.688-1.333a17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.17 17.17 0 0 0 2.391-5.165a48.038 48.038 0 0 0-8.298.307a.75.75 0 0 1-.186-1.489a49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 0 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726l-2.672 5.726Z", clipRule: "evenodd" }) });
function ce({
  englishURL: e,
  finnishURL: r,
  currentPage: a,
  currentLang: l,
  type: i,
  ariaLabel: s,
  languageLabel: d
}) {
  const [n, m] = b(!1), o = (g, p) => i === "demo" ? `/${p}/demo/${g}/` : g === "front" ? `/${p}/` : `/${p}/${g}/`, h = o(e, "en"), f = o(r, "fi");
  return /* @__PURE__ */ c("div", { id: "language-switcher", className: "lang-switcher text-black dark:text-white px-3 relative", children: [
    /* @__PURE__ */ c(
      "button",
      {
        id: "language-menu-button",
        "aria-label": s,
        "aria-expanded": n,
        "aria-controls": "lang-switcher",
        onClick: () => m((g) => !g),
        className: `lang-switcher flex gap-2 py-2 border-y-4 border-transparent items-center
          hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
          focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white`,
        children: [
          /* @__PURE__ */ t(J, {}),
          d
        ]
      }
    ),
    /* @__PURE__ */ c(
      "ul",
      {
        id: "lang-switcher",
        className: "p-4 right-0 mt-1 mr-1.5 absolute flex flex-col gap-4 border-solid border-2 border-black bg-lt-code-bg dark:border-white w-[140%] md:w-[200%] dark:bg-dk-code-bg",
        children: [
          e && /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { href: h, hrefLang: "en", lang: "en", "aria-current": e === a && l !== "fi" ? "page" : void 0, children: "English (EN)" }) }),
          r && /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { href: f, hrefLang: "fi", lang: "fi", "aria-current": r === a && l !== "en" ? "page" : void 0, children: "Suomi (FI)" }) })
        ]
      }
    )
  ] });
}
function de() {
  const [e] = b(() => Math.floor(Math.random() * 6) + 1);
  return /* @__PURE__ */ c("div", { "aria-hidden": "true", className: "main-image--wrapper relative w-full h-125-px md:h-250-px lg:h-350-px overflow-hidden", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: "relative w-screen h-125-px md:h-250-px lg:h-350-px bg-cover bg-center",
        style: { backgroundImage: `url('/mountains/${e}.jpg')` }
      }
    ),
    /* @__PURE__ */ t("div", { className: "main-image--overlay z-10 absolute inset-0 w-full" })
  ] });
}
const Q = () => /* @__PURE__ */ t(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    className: "h-8 w-8",
    "aria-hidden": "true",
    fill: "currentColor",
    children: /* @__PURE__ */ t(
      "path",
      {
        fillRule: "evenodd",
        d: "M10.5 3.75a6.75 6.75 0 1 0 0 13.5a6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z",
        clipRule: "evenodd"
      }
    )
  }
);
function ue({ searchLabel: e, searchUrl: r }) {
  return /* @__PURE__ */ t("div", { id: "search-a", className: "text-black dark:text-white px-3 relative", children: /* @__PURE__ */ c(
    "a",
    {
      href: r,
      className: `inline-block py-2 px-1 text-black dark:text-white border-y-4 border-transparent
          hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
          focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white`,
      children: [
        /* @__PURE__ */ t(Q, {}),
        /* @__PURE__ */ t("span", { className: "sr-only", children: e })
      ]
    }
  ) });
}
function he({ items: e, ariaLabel: r, className: a = "" }) {
  return e.length === 0 ? null : /* @__PURE__ */ t("nav", { "aria-label": r, className: a, children: /* @__PURE__ */ t("ol", { className: "block list-none m-0 p-0", children: e.map((l, i) => /* @__PURE__ */ c("li", { className: "inline", children: [
    i > 0 && /* @__PURE__ */ t("span", { "aria-hidden": "true", className: "mx-2", children: "/" }),
    l.href ? /* @__PURE__ */ t("a", { href: l.href, children: l.label }) : l.label
  ] }, i)) }) });
}
export {
  le as Box,
  he as Breadcrumb,
  ae as Button,
  ce as LanguageSwitcher,
  de as MainImage,
  ie as RichText,
  ue as SearchBlock,
  se as SearchComponent,
  ne as SkipLink,
  oe as ThemeToggle,
  P as sanitizeCmsHtml,
  $ as sanitizeCmsUrl
};
