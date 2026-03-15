import { jsx as t, Fragment as b, jsxs as d } from "react/jsx-runtime";
import Z, { useMemo as j, useState as f, useEffect as I } from "react";
import { stringify as B } from "qs-esm";
function J({
  children: e,
  variant: l = "primary",
  href: r,
  onClick: i,
  type: a = "button",
  disabled: n,
  className: s = ""
}) {
  const c = l === "primary" ? `button item--transition${s ? ` ${s}` : ""}` : `button--alternative item--transition${s ? ` ${s}` : ""}`;
  return r ? /* @__PURE__ */ t("a", { href: r, className: c, children: e }) : /* @__PURE__ */ t("button", { type: a, onClick: i, disabled: n, className: c, children: e });
}
function K({ variant: e = "toc", children: l, className: r = "" }) {
  return e === "blockquote" ? /* @__PURE__ */ t("blockquote", { className: r || void 0, children: l }) : e === "notice" ? /* @__PURE__ */ t("div", { className: `notice-box${r ? ` ${r}` : ""}`, children: l }) : /* @__PURE__ */ t("div", { className: `toc-box${r ? ` ${r}` : ""}`, children: l });
}
function Q({ href: e, id: l, label: r, forceVisible: i = !1 }) {
  return /* @__PURE__ */ t("a", { href: e, id: l, className: `${i ? "absolute top-8 left-8" : "sr-only focus:not-sr-only focus:absolute focus:top-8 focus:left-8"} text-xl text-black bg-lt-blue-light dark:bg-dk-purple dark:text-white dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-2 focus:p-4 focus:outline focus:outline-2 focus:outline-black dark:focus:outline-white`, children: r });
}
function p(e) {
  return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function H(e) {
  const l = [];
  function r(i) {
    if (i.type === "heading") {
      const a = i.children?.map((s) => s.text || "").join("") || "", n = p(a);
      l.push({ id: n, text: a, level: i.tag });
    }
    if (i.type === "block" && i.fields?.blockType === "ContentBox") {
      const a = i.fields?.heading?.replace(" ", "-"), n = p(a ?? "") || "content-box";
      l.push({ id: n, text: i.fields?.heading ?? "", level: "h2" });
    }
    i.children?.forEach(r);
  }
  return e.forEach(r), l;
}
const v = {
  paragraph: (e, l) => /* @__PURE__ */ t("p", { className: "mb-4", children: l }),
  heading: (e, l) => {
    const r = `${e.tag}`, i = e.children?.map((n) => n.text || "").join("") || "", a = p(i);
    return /* @__PURE__ */ t(r, { id: a, className: "font-bold mt-6 mb-2", children: l });
  },
  text: (e) => {
    let l = e.text;
    return e.format && (e.format & 1 && (l = /* @__PURE__ */ t("strong", { children: l })), e.format & 2 && (l = /* @__PURE__ */ t("em", { children: l })), e.format & 4 && (l = /* @__PURE__ */ t("s", { children: l })), e.format & 8 && (l = /* @__PURE__ */ t("u", { children: l })), e.format & 16 && (l = /* @__PURE__ */ t("code", { children: l })), e.format & 32 && (l = /* @__PURE__ */ t("sub", { children: l })), e.format & 64 && (l = /* @__PURE__ */ t("sup", { children: l }))), /* @__PURE__ */ t(b, { children: l });
  },
  linebreak: () => /* @__PURE__ */ t("br", {}),
  link: (e, l) => /* @__PURE__ */ t(
    "a",
    {
      href: e.fields?.url,
      target: e.fields?.newTab ? "_blank" : void 0,
      rel: e.fields?.newTab ? "noopener noreferrer" : void 0,
      children: l
    }
  ),
  list: (e, l) => {
    const r = `${e.tag || "ul"}`;
    return /* @__PURE__ */ t(r, { className: "ml-6", children: l });
  },
  listitem: (e, l) => /* @__PURE__ */ t("li", { children: l }),
  quote: (e, l) => /* @__PURE__ */ t("blockquote", { children: l }),
  horizontalrule: () => /* @__PURE__ */ t("hr", { className: "my-6" }),
  upload: (e) => e.value?.url ? /* @__PURE__ */ t(
    "img",
    {
      src: e.value.url,
      alt: e.value.alt || "",
      className: "my-4 rounded-lg shadow"
    }
  ) : null,
  block: (e, l, r) => {
    const i = e.fields?.blockType;
    if (i === "DisclosureWidget") {
      const a = e.fields?.content?.root?.children || [];
      return /* @__PURE__ */ d("details", { children: [
        /* @__PURE__ */ t("summary", { className: "cursor-pointer font-bold text-2xl", children: e.fields?.heading || "Details" }),
        /* @__PURE__ */ t("div", { className: "details-content", children: /* @__PURE__ */ t(w, { nodes: a, lang: r }) })
      ] });
    }
    if (i === "ContentBox") {
      const a = e.fields?.boxContent?.root?.children || [], n = e.fields?.heading?.replace(" ", "-") ?? "", s = p(n) || "content-box", c = e.fields?.cssClass, g = e.fields?.cssClass === "box-gradient" ? "gradient-border-light dark:gradient-border-dark" : "";
      return /* @__PURE__ */ d("div", { className: `${c} ${g}`, children: [
        /* @__PURE__ */ t("h2", { id: s, children: e.fields?.heading }),
        /* @__PURE__ */ t("div", { className: "content-box--inner-wrapper", children: /* @__PURE__ */ t(w, { nodes: a, lang: r }) })
      ] });
    }
    return i === "CodeBlock" ? e.fields?.renderField ? /* @__PURE__ */ t(
      "div",
      {
        className: "richtext-html-block",
        dangerouslySetInnerHTML: { __html: e.fields?.HTMLContent ?? "" }
      }
    ) : /* @__PURE__ */ t("code", { className: "w-full my-2 block", children: e.fields?.HTMLContent }) : i === "quoteWithCite" ? /* @__PURE__ */ d("blockquote", { children: [
      e.fields?.quote,
      /* @__PURE__ */ t("cite", { children: e.fields?.cite })
    ] }) : null;
  },
  inlineBlock: (e) => {
    const l = e.fields?.blockType;
    return l === "language" ? /* @__PURE__ */ t("span", { lang: e.fields?.language || "en", children: e.fields?.languageContent }) : l === "abbreviation" ? /* @__PURE__ */ t("abbr", { title: e.fields?.definition ?? void 0, children: e.fields?.abbreviation }) : null;
  }
};
function N(e, l, r) {
  const i = e.children?.map((a, n) => N(a, n, r)) || [];
  return v[e.type] ? /* @__PURE__ */ t(Z.Fragment, { children: v[e.type](e, i, r) }, l) : /* @__PURE__ */ d("span", { className: "bg-red-100 text-red-700", children: [
    "[Unhandled node type: ",
    e.type,
    "]"
  ] }, l);
}
function L(e) {
  return e === "fi" ? "Tällä sivulla" : "On this page";
}
function w({ nodes: e, lang: l, withTOC: r = !1, tocLabel: i }) {
  const a = j(() => H(e), [e]), n = i ?? L(l);
  return r ? /* @__PURE__ */ t(b, { children: a.length > 0 && /* @__PURE__ */ d("div", { className: "toc-box", children: [
    /* @__PURE__ */ t("h2", { id: "toc-heading", className: "mb-2 mt-0", children: n }),
    /* @__PURE__ */ t("nav", { "aria-labelledby": "toc-heading", children: /* @__PURE__ */ t("ul", { className: "ml-4 mb-0", children: a.map((s) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { href: `#${s.id}`, className: "text-blue-600 underline", children: s.text }) }, s.id)) }) })
  ] }) }) : /* @__PURE__ */ t(b, { children: e.map((s, c) => N(s, c, l)) });
}
async function _(e, l, r) {
  const i = r ? `locale=${r}` : "", a = `${e}/api/search?${i}&pagination=false&${l}`, n = await fetch(a);
  if (!n.ok) throw new Error(`Search request failed: ${n.status}`);
  return n.json();
}
function G(e, l) {
  const r = ["reqpages", "criteria", "guidelines", "principles"];
  let i = l === "en" ? "I would if I could" : "Toki, jos voisin";
  return r.includes(e) && (i = l === "en" ? "Almost, but not quite" : "Melkein, mutta ei ihan"), i;
}
function R(e, l) {
  return {
    criteria: { fi: "WCAG-kriteeri", en: "WCAG criterion" },
    guidelines: { fi: "WCAG-ohje", en: "WCAG guideline" },
    principles: { fi: "WCAG-periaate", en: "WCAG principle" }
  }[e]?.[l === "fi" ? "fi" : "en"] ?? "";
}
function X({
  searchLabel: e,
  searchButton: l,
  searchMainHeading: r,
  searchResultLabel: i,
  searchNoResults: a,
  searchLocale: n,
  searchSiteName: s,
  searchContentType: c,
  payloadUrl: g,
  defaultResultBaseUrl: C = "/",
  resultBaseUrls: $ = {}
}) {
  const [x, T] = f(""), [k, S] = f(null), [u, M] = f(), [q, W] = f("");
  function D(o) {
    return $[o] ?? C;
  }
  const E = async (o, m) => {
    const h = await _(g, B({
      where: {
        and: [
          {
            or: [
              { title: { like: o } },
              { searchLead: { like: o } },
              { searchContent: { like: o } },
              { searchDescription: { like: o } }
            ]
          }
        ]
      }
    }), m);
    S(h), M(h.totalDocs);
  };
  return /* @__PURE__ */ d("div", { children: [
    /* @__PURE__ */ t("div", { className: "text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl", children: /* @__PURE__ */ d(
      "form",
      {
        id: "site-search",
        onSubmit: async (o) => {
          o.preventDefault();
          try {
            await E(x, n), W(x);
          } catch (m) {
            console.error(m);
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
              onChange: (o) => T(o.currentTarget.value)
            }
          ),
          /* @__PURE__ */ t("button", { type: "submit", className: "button item--transition max-md:my-4", children: l })
        ]
      }
    ) }),
    /* @__PURE__ */ t("div", { className: "sr-only", role: "status", children: u > 0 ? `${u} ${i}` : a }),
    /* @__PURE__ */ d("div", { className: "text-lt-gray dark:text-dk-gray pt-4 pb-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl", children: [
      u > 0 && /* @__PURE__ */ t("div", { className: "border-t-4 gradient-border-light dark:gradient-border-dark pt-4", children: /* @__PURE__ */ d("h2", { children: [
        r,
        " ",
        q,
        ", ",
        u,
        " ",
        i
      ] }) }),
      k && /* @__PURE__ */ t("ul", { children: k.docs.map((o, m) => {
        const y = G(o.doc.relationTo, n), h = R(o.doc.relationTo, n), A = D(o.doc.relationTo);
        return /* @__PURE__ */ d(
          "li",
          {
            className: "my-2 py-6 flex flex-col border-t-2",
            children: [
              /* @__PURE__ */ t(
                "a",
                {
                  className: "my-2 text-xl order-3",
                  href: `${A}${n}/${o.searchPageUrl}/`,
                  children: /* @__PURE__ */ t("h3", { className: "search-heading mt-0 mb-0.5 text-lg lg:text-xl inline", children: o.title })
                }
              ),
              /* @__PURE__ */ d("span", { className: "w-full self-end text-sm text-right order-1", children: [
                s,
                " ",
                y
              ] }),
              h && /* @__PURE__ */ d("span", { className: "w-full self-end text-sm order-2", children: [
                c,
                " ",
                h
              ] }),
              /* @__PURE__ */ t("span", { className: "block text-lg order-4", children: o.searchDescription })
            ]
          },
          `result-${m}`
        );
      }) }),
      u === 0 && /* @__PURE__ */ t("p", { children: a })
    ] })
  ] });
}
const F = () => /* @__PURE__ */ t("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", className: "h-8 w-8", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fill: "currentColor", fillRule: "evenodd", d: "M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9a8.97 8.97 0 0 0 3.463-.69a.75.75 0 0 1 .981.98a10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5c0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z", clipRule: "evenodd" }) }), P = () => /* @__PURE__ */ t("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", className: "h-8 w-8", "aria-hidden": "true", children: /* @__PURE__ */ t("path", { fill: "currentColor", d: "M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0Zm11.394-5.834a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75Zm-3.916 6.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18Zm-4.242-.697a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12Zm.697-4.243a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" }) });
function Y({ darkLabel: e, lightLabel: l }) {
  const [r, i] = f(!1), a = (c = !0) => {
    document.documentElement.classList.add("dark"), document.documentElement.classList.remove("light"), c && localStorage.setItem("darkMode", "enabled"), i(!0);
  }, n = (c = !0) => {
    document.documentElement.classList.remove("dark"), document.documentElement.classList.add("light"), c && localStorage.setItem("darkMode", "disabled"), i(!1);
  };
  return I(() => {
    const c = localStorage.getItem("darkMode");
    c === "enabled" ? a() : c === "disabled" ? n() : window.matchMedia("(prefers-color-scheme: dark)").matches ? a(!1) : n(!1);
  }, []), /* @__PURE__ */ d(
    "button",
    {
      id: "theme-toggle-button",
      "aria-pressed": r,
      onClick: () => {
        document.documentElement.classList.contains("dark") ? n() : a();
      },
      className: `py-2 px-3 text-black dark:text-white border-y-4 border-transparent
        hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
        focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white`,
      children: [
        /* @__PURE__ */ d("span", { className: "darkmode-dark", children: [
          /* @__PURE__ */ t(F, {}),
          /* @__PURE__ */ t("span", { className: "sr-only", children: e })
        ] }),
        /* @__PURE__ */ d("span", { className: "darkmode-light", children: [
          /* @__PURE__ */ t(P, {}),
          /* @__PURE__ */ t("span", { className: "sr-only", children: l })
        ] })
      ]
    }
  );
}
export {
  K as Box,
  J as Button,
  w as RichText,
  X as SearchComponent,
  Q as SkipLink,
  Y as ThemeToggle
};
