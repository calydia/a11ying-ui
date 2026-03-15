import { jsx as t, Fragment as y, jsxs as o } from "react/jsx-runtime";
import D, { useMemo as I, useState as m, useEffect as j } from "react";
import { stringify as B } from "qs-esm";
function K({
  children: e,
  variant: r = "primary",
  href: l,
  onClick: a,
  type: i = "button",
  disabled: n,
  className: s = ""
}) {
  const c = r === "primary" ? `button item--transition${s ? ` ${s}` : ""}` : `button--alternative item--transition${s ? ` ${s}` : ""}`;
  return l ? /* @__PURE__ */ t("a", { href: l, className: c, children: e }) : /* @__PURE__ */ t("button", { type: i, onClick: a, disabled: n, className: c, children: e });
}
function Q({ variant: e = "toc", children: r, className: l = "" }) {
  return e === "blockquote" ? /* @__PURE__ */ t("blockquote", { className: l || void 0, children: r }) : e === "notice" ? /* @__PURE__ */ t("div", { className: `notice-box${l ? ` ${l}` : ""}`, children: r }) : /* @__PURE__ */ t("div", { className: `toc-box${l ? ` ${l}` : ""}`, children: r });
}
function X({ href: e, id: r, label: l, forceVisible: a = !1 }) {
  return /* @__PURE__ */ t("a", { href: e, id: r, className: `${a ? "absolute top-8 left-8" : "sr-only focus:not-sr-only focus:absolute focus:top-8 focus:left-8"} text-xl text-black bg-lt-blue-light dark:bg-dk-purple dark:text-white dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-2 focus:p-4 focus:outline focus:outline-2 focus:outline-black dark:focus:outline-white`, children: l });
}
function k(e) {
  return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function H(e) {
  const r = [];
  function l(a) {
    if (a.type === "heading") {
      const i = a.children?.map((s) => s.text || "").join("") || "", n = k(i);
      r.push({ id: n, text: i, level: a.tag });
    }
    if (a.type === "block" && a.fields?.blockType === "ContentBox") {
      const i = a.fields?.heading?.replace(" ", "-"), n = k(i ?? "") || "content-box";
      r.push({ id: n, text: a.fields?.heading ?? "", level: "h2" });
    }
    a.children?.forEach(l);
  }
  return e.forEach(l), r;
}
const $ = {
  paragraph: (e, r) => /* @__PURE__ */ t("p", { className: "mb-4", children: r }),
  heading: (e, r) => {
    const l = `${e.tag}`, a = e.children?.map((n) => n.text || "").join("") || "", i = k(a);
    return /* @__PURE__ */ t(l, { id: i, className: "font-bold mt-6 mb-2", children: r });
  },
  text: (e) => {
    let r = e.text;
    return e.format && (e.format & 1 && (r = /* @__PURE__ */ t("strong", { children: r })), e.format & 2 && (r = /* @__PURE__ */ t("em", { children: r })), e.format & 4 && (r = /* @__PURE__ */ t("s", { children: r })), e.format & 8 && (r = /* @__PURE__ */ t("u", { children: r })), e.format & 16 && (r = /* @__PURE__ */ t("code", { children: r })), e.format & 32 && (r = /* @__PURE__ */ t("sub", { children: r })), e.format & 64 && (r = /* @__PURE__ */ t("sup", { children: r }))), /* @__PURE__ */ t(y, { children: r });
  },
  linebreak: () => /* @__PURE__ */ t("br", {}),
  link: (e, r) => /* @__PURE__ */ t(
    "a",
    {
      href: e.fields?.url,
      target: e.fields?.newTab ? "_blank" : void 0,
      rel: e.fields?.newTab ? "noopener noreferrer" : void 0,
      children: r
    }
  ),
  list: (e, r) => {
    const l = `${e.tag || "ul"}`;
    return /* @__PURE__ */ t(l, { className: "ml-6", children: r });
  },
  listitem: (e, r) => /* @__PURE__ */ t("li", { children: r }),
  quote: (e, r) => /* @__PURE__ */ t("blockquote", { children: r }),
  horizontalrule: () => /* @__PURE__ */ t("hr", { className: "my-6" }),
  upload: (e) => e.value?.url ? /* @__PURE__ */ t(
    "img",
    {
      src: e.value.url,
      alt: e.value.alt || "",
      className: "my-4 rounded-lg shadow"
    }
  ) : null,
  block: (e, r, l) => {
    const a = e.fields?.blockType;
    if (a === "DisclosureWidget") {
      const i = e.fields?.content?.root?.children || [];
      return /* @__PURE__ */ o("details", { children: [
        /* @__PURE__ */ t("summary", { className: "cursor-pointer font-bold text-2xl", children: e.fields?.heading || "Details" }),
        /* @__PURE__ */ t("div", { className: "details-content", children: /* @__PURE__ */ t(T, { nodes: i, lang: l }) })
      ] });
    }
    if (a === "ContentBox") {
      const i = e.fields?.boxContent?.root?.children || [], n = e.fields?.heading?.replace(" ", "-") ?? "", s = k(n) || "content-box", c = e.fields?.cssClass, f = e.fields?.cssClass === "box-gradient" ? "gradient-border-light dark:gradient-border-dark" : "";
      return /* @__PURE__ */ o("div", { className: `${c} ${f}`, children: [
        /* @__PURE__ */ t("h2", { id: s, children: e.fields?.heading }),
        /* @__PURE__ */ t("div", { className: "content-box--inner-wrapper", children: /* @__PURE__ */ t(T, { nodes: i, lang: l }) })
      ] });
    }
    return a === "CodeBlock" ? e.fields?.renderField ? /* @__PURE__ */ t(
      "div",
      {
        className: "richtext-html-block",
        dangerouslySetInnerHTML: { __html: e.fields?.HTMLContent ?? "" }
      }
    ) : /* @__PURE__ */ t("code", { className: "w-full my-2 block", children: e.fields?.HTMLContent }) : a === "quoteWithCite" ? /* @__PURE__ */ o("blockquote", { children: [
      e.fields?.quote,
      /* @__PURE__ */ t("cite", { children: e.fields?.cite })
    ] }) : null;
  },
  inlineBlock: (e) => {
    const r = e.fields?.blockType;
    return r === "language" ? /* @__PURE__ */ t("span", { lang: e.fields?.language || "en", children: e.fields?.languageContent }) : r === "abbreviation" ? /* @__PURE__ */ t("abbr", { title: e.fields?.definition ?? void 0, children: e.fields?.abbreviation }) : null;
  }
};
function S(e, r, l) {
  const a = e.children?.map((i, n) => S(i, n, l)) || [];
  return $[e.type] ? /* @__PURE__ */ t(D.Fragment, { children: $[e.type](e, a, l) }, r) : /* @__PURE__ */ o("span", { className: "bg-red-100 text-red-700", children: [
    "[Unhandled node type: ",
    e.type,
    "]"
  ] }, r);
}
function F(e) {
  return e === "fi" ? "Tällä sivulla" : "On this page";
}
function T({ nodes: e, lang: r, withTOC: l = !1, tocLabel: a }) {
  const i = I(() => H(e), [e]), n = a ?? F(r);
  return l ? /* @__PURE__ */ t(y, { children: i.length > 0 && /* @__PURE__ */ o("div", { className: "toc-box", children: [
    /* @__PURE__ */ t("h2", { id: "toc-heading", className: "mb-2 mt-0", children: n }),
    /* @__PURE__ */ t("nav", { "aria-labelledby": "toc-heading", children: /* @__PURE__ */ t("ul", { className: "ml-4 mb-0", children: i.map((s) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { href: `#${s.id}`, className: "text-blue-600 underline", children: s.text }) }, s.id)) }) })
  ] }) }) : /* @__PURE__ */ t(y, { children: e.map((s, c) => S(s, c, r)) });
}
async function L(e, r, l) {
  const a = l ? `locale=${l}` : "", i = `${e}/api/search?${a}&pagination=false&${r}`, n = await fetch(i);
  if (!n.ok) throw new Error(`Search request failed: ${n.status}`);
  return n.json();
}
function _(e, r) {
  const l = ["reqpages", "criteria", "guidelines", "principles"];
  let a = r === "en" ? "I would if I could" : "Toki, jos voisin";
  return l.includes(e) && (a = r === "en" ? "Almost, but not quite" : "Melkein, mutta ei ihan"), a;
}
function G(e, r) {
  return {
    criteria: { fi: "WCAG-kriteeri", en: "WCAG criterion" },
    guidelines: { fi: "WCAG-ohje", en: "WCAG guideline" },
    principles: { fi: "WCAG-periaate", en: "WCAG principle" }
  }[e]?.[r === "fi" ? "fi" : "en"] ?? "";
}
function Y({
  searchLabel: e,
  searchButton: r,
  searchMainHeading: l,
  searchResultLabel: a,
  searchNoResults: i,
  searchLocale: n,
  searchSiteName: s,
  searchContentType: c,
  payloadUrl: f,
  defaultResultBaseUrl: b = "/",
  resultBaseUrls: w = {}
}) {
  const [x, N] = m(""), [v, h] = m(null), [u, M] = m(), [E, A] = m("");
  function Z(d) {
    return w[d] ?? b;
  }
  const q = async (d, p) => {
    const g = await L(f, B({
      where: {
        and: [
          {
            or: [
              { title: { like: d } },
              { searchLead: { like: d } },
              { searchContent: { like: d } },
              { searchDescription: { like: d } }
            ]
          }
        ]
      }
    }), p);
    h(g), M(g.totalDocs);
  };
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("div", { className: "text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl", children: /* @__PURE__ */ o(
      "form",
      {
        id: "site-search",
        onSubmit: async (d) => {
          d.preventDefault();
          try {
            await q(x, n), A(x);
          } catch (p) {
            console.error(p);
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
              onChange: (d) => N(d.currentTarget.value)
            }
          ),
          /* @__PURE__ */ t("button", { type: "submit", className: "button item--transition max-md:my-4", children: r })
        ]
      }
    ) }),
    /* @__PURE__ */ t("div", { className: "sr-only", role: "status", children: u > 0 ? `${u} ${a}` : i }),
    /* @__PURE__ */ o("div", { className: "text-lt-gray dark:text-dk-gray pt-4 pb-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl", children: [
      u > 0 && /* @__PURE__ */ t("div", { className: "border-t-4 gradient-border-light dark:gradient-border-dark pt-4", children: /* @__PURE__ */ o("h2", { children: [
        l,
        " ",
        E,
        ", ",
        u,
        " ",
        a
      ] }) }),
      v && /* @__PURE__ */ t("ul", { children: v.docs.map((d, p) => {
        const C = _(d.doc.relationTo, n), g = G(d.doc.relationTo, n), W = Z(d.doc.relationTo);
        return /* @__PURE__ */ o(
          "li",
          {
            className: "my-2 py-6 flex flex-col border-t-2",
            children: [
              /* @__PURE__ */ t(
                "a",
                {
                  className: "my-2 text-xl order-3",
                  href: `${W}${n}/${d.searchPageUrl}/`,
                  children: /* @__PURE__ */ t("h3", { className: "search-heading mt-0 mb-0.5 text-lg lg:text-xl inline", children: d.title })
                }
              ),
              /* @__PURE__ */ o("span", { className: "w-full self-end text-sm text-right order-1", children: [
                s,
                " ",
                C
              ] }),
              g && /* @__PURE__ */ o("span", { className: "w-full self-end text-sm order-2", children: [
                c,
                " ",
                g
              ] }),
              /* @__PURE__ */ t("span", { className: "block text-lg order-4", children: d.searchDescription })
            ]
          },
          `result-${p}`
        );
      }) }),
      u === 0 && /* @__PURE__ */ t("p", { children: i })
    ] })
  ] });
}
const O = () => /* @__PURE__ */ t("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", className: "h-8 w-8", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fill: "currentColor", fillRule: "evenodd", d: "M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9a8.97 8.97 0 0 0 3.463-.69a.75.75 0 0 1 .981.98a10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5c0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z", clipRule: "evenodd" }) }), P = () => /* @__PURE__ */ t("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", className: "h-8 w-8", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fill: "currentColor", d: "M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0Zm11.394-5.834a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75Zm-3.916 6.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18Zm-4.242-.697a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12Zm.697-4.243a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" }) });
function ee({ darkLabel: e, lightLabel: r }) {
  const [l, a] = m(!1), i = (c = !0) => {
    document.documentElement.classList.add("dark"), document.documentElement.classList.remove("light"), c && localStorage.setItem("darkMode", "enabled"), a(!0);
  }, n = (c = !0) => {
    document.documentElement.classList.remove("dark"), document.documentElement.classList.add("light"), c && localStorage.setItem("darkMode", "disabled"), a(!1);
  };
  return j(() => {
    const c = localStorage.getItem("darkMode");
    c === "enabled" ? i() : c === "disabled" ? n() : window.matchMedia("(prefers-color-scheme: dark)").matches ? i(!1) : n(!1);
  }, []), /* @__PURE__ */ o(
    "button",
    {
      id: "theme-toggle-button",
      "aria-pressed": l,
      onClick: () => {
        document.documentElement.classList.contains("dark") ? n() : i();
      },
      className: `py-2 px-3 text-black dark:text-white border-y-4 border-transparent
        hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
        focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white`,
      children: [
        /* @__PURE__ */ o("span", { className: "darkmode-dark", children: [
          /* @__PURE__ */ t(O, {}),
          /* @__PURE__ */ t("span", { className: "sr-only", children: e })
        ] }),
        /* @__PURE__ */ o("span", { className: "darkmode-light", children: [
          /* @__PURE__ */ t(P, {}),
          /* @__PURE__ */ t("span", { className: "sr-only", children: r })
        ] })
      ]
    }
  );
}
const R = () => /* @__PURE__ */ t("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", className: "h-8 w-8", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fill: "currentColor", fillRule: "evenodd", d: "M9 2.25a.75.75 0 0 1 .75.75v1.506a49.38 49.38 0 0 1 5.343.371a.75.75 0 1 1-.186 1.489a46.7 46.7 0 0 0-1.99-.206a18.67 18.67 0 0 1-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 1 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482a.75.75 0 1 1-.688-1.333a17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.17 17.17 0 0 0 2.391-5.165a48.038 48.038 0 0 0-8.298.307a.75.75 0 0 1-.186-1.489a49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 0 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726l-2.672 5.726Z", clipRule: "evenodd" }) });
function te({
  englishURL: e,
  finnishURL: r,
  currentPage: l,
  currentLang: a,
  type: i,
  ariaLabel: n,
  languageLabel: s
}) {
  const [c, f] = m(!1), b = (h, u) => i === "demo" ? `/${u}/demo/${h}/` : h === "front" ? `/${u}/` : `/${u}/${h}/`, w = b(e, "en"), x = b(r, "fi");
  return /* @__PURE__ */ o("div", { id: "language-switcher", className: "lang-switcher text-black dark:text-white px-3 relative", children: [
    /* @__PURE__ */ o(
      "button",
      {
        id: "language-menu-button",
        "aria-label": n,
        "aria-expanded": c,
        "aria-controls": "lang-switcher",
        onClick: () => f((h) => !h),
        className: `lang-switcher flex gap-2 py-2 border-y-4 border-transparent items-center
          hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
          focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white`,
        children: [
          /* @__PURE__ */ t(R, {}),
          s
        ]
      }
    ),
    /* @__PURE__ */ o(
      "ul",
      {
        id: "lang-switcher",
        className: "p-4 right-0 mt-1 mr-1.5 absolute flex flex-col gap-4 border-solid border-2 border-black bg-lt-code-bg dark:border-white w-[140%] md:w-[200%] dark:bg-dk-code-bg",
        children: [
          e && /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { href: w, hrefLang: "en", lang: "en", "aria-current": e === l && a !== "fi" ? "page" : void 0, children: "English (EN)" }) }),
          r && /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { href: x, hrefLang: "fi", lang: "fi", "aria-current": r === l && a !== "en" ? "page" : void 0, children: "Suomi (FI)" }) })
        ]
      }
    )
  ] });
}
export {
  Q as Box,
  K as Button,
  te as LanguageSwitcher,
  T as RichText,
  Y as SearchComponent,
  X as SkipLink,
  ee as ThemeToggle
};
