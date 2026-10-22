import e, { useCallback as t, useEffect as n, useMemo as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
import { stringify as l } from "qs-esm";
// \0rolldown/runtime.js
var u = Object.create, d = Object.defineProperty, f = Object.getOwnPropertyDescriptor, p = Object.getOwnPropertyNames, m = Object.getPrototypeOf, h = Object.prototype.hasOwnProperty, g = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, _ = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), v = (e, t) => {
	let n = {};
	for (var r in e) d(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || d(n, Symbol.toStringTag, { value: "Module" }), n;
}, y = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = p(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !h.call(e, s) && s !== n && d(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = f(t, s)) || r.enumerable
	});
	return e;
}, b = (e, t, n) => (n = e == null ? {} : u(m(e)), y(t || !e || !e.__esModule || !h.call(e, "default") ? d(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), x = (e) => h.call(e, "module.exports") ? e["module.exports"] : y(d({}, "__esModule", { value: !0 }), e);
// src/components/Button/Button.tsx
function S({ children: e, variant: t = "primary", href: n, onClick: r, type: i = "button", disabled: a, className: o = "" }) {
	let c = t === "primary" ? `button item--transition${o ? ` ${o}` : ""}` : `button--alternative item--transition${o ? ` ${o}` : ""}`;
	return n ? /* @__PURE__ */ s("a", {
		href: n,
		className: c,
		children: e
	}) : /* @__PURE__ */ s("button", {
		type: i,
		onClick: r,
		disabled: a,
		className: c,
		children: e
	});
}
// src/components/Box/Box.tsx
function C({ variant: e = "toc", children: t, className: n = "" }) {
	return e === "blockquote" ? /* @__PURE__ */ s("blockquote", {
		className: n || void 0,
		children: t
	}) : e === "notice" ? /* @__PURE__ */ s("div", {
		className: `notice-box${n ? ` ${n}` : ""}`,
		children: t
	}) : /* @__PURE__ */ s("div", {
		className: `toc-box${n ? ` ${n}` : ""}`,
		children: t
	});
}
// src/components/SkipLink/SkipLink.tsx
function w({ href: e, id: t, label: n, forceVisible: r = !1 }) {
	return /* @__PURE__ */ s("a", {
		href: e,
		id: t,
		className: `${r ? "absolute top-8 left-8" : "sr-only focus:not-sr-only focus:absolute focus:top-8 focus:left-8"} text-xl text-black bg-lt-blue-light dark:bg-dk-purple dark:text-white dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-2 focus:p-4 focus:outline focus:outline-2 focus:outline-black dark:focus:outline-white`,
		children: n
	});
}
// src/lib/richTextHeadingPlan.ts
function T(e) {
	return e.toLowerCase().normalize("NFKD").replace(/\p{M}+/gu, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function E(e) {
	return e.type === "text" ? e.text ?? "" : e.children?.map(E).join("") ?? "";
}
function D(e) {
	let t = /* @__PURE__ */ new WeakMap(), n = [], r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
	function a(e, t) {
		let n = T(e) || t;
		if (!r.has(n)) return r.add(n), i.set(n, 1), n;
		let a = i.get(n) ?? 1, o = `${n}-${a}`;
		for (; r.has(o);) a += 1, o = `${n}-${a}`;
		return r.add(o), i.set(n, a + 1), o;
	}
	function o(e, r) {
		if (e.type === "heading") {
			let i = E(e), o = a(i, "heading");
			t.set(e, o), r && n.push({
				id: o,
				text: i,
				level: e.tag ?? "h2"
			});
		}
		if (e.type === "block" && e.fields?.blockType === "ContentBox") {
			let i = e.fields.heading ?? "", s = a(i, "content-box");
			t.set(e, s), r && n.push({
				id: s,
				text: i,
				level: "h2"
			}), e.fields.boxContent?.root?.children?.forEach((e) => {
				o(e, !1);
			});
		} else e.type === "block" && e.fields?.blockType === "DisclosureWidget" && e.fields.content?.root?.children?.forEach((e) => {
			o(e, !1);
		});
		e.children?.forEach((e) => o(e, r));
	}
	return e.forEach((e) => o(e, !0)), {
		ids: t,
		tocEntries: n
	};
}
// node_modules/entities/dist/decode-codepoint.js
function O(e) {
	return e === 0 || e >= 55296 && e <= 57343 || e > 1114111;
}
function ee(e) {
	return O(e) ? 65533 : e >= 128 && e <= 159 && k[e - 128] || e;
}
function te(e) {
	return O(e) ? 65533 : e;
}
var k, ne = g((() => {
	k = [
		8364,
		0,
		8218,
		402,
		8222,
		8230,
		8224,
		8225,
		710,
		8240,
		352,
		8249,
		338,
		0,
		381,
		0,
		0,
		8216,
		8217,
		8220,
		8221,
		8226,
		8211,
		8212,
		732,
		8482,
		353,
		8250,
		339,
		0,
		382,
		376
	];
}));
// node_modules/entities/dist/internal/decode-shared.js
function A(e, t, n, r, i, a) {
	let o = e.length, s = a * 90, c = 0, l = () => {
		let t = j[e.charCodeAt(c++)];
		return t < a ? t : t * 91 - s + j[e.charCodeAt(c++)];
	}, u = n - r, d = n + i, f = new Int32Array(d);
	f.fill(-1, r, a), f.fill(-1, a + u, d);
	let p = new Int32Array(d), m = new Int32Array(d);
	function h(t, n) {
		let r = 0, i = n, a = n + t;
		for (; i < a;) {
			let t = j[e.charCodeAt(c++)];
			if (t < 89) r += t, f[i++] = r;
			else if (t === 89) {
				let t = j[e.charCodeAt(c++)] + 2;
				for (; t--;) f[i++] = ++r;
			} else {
				let t = j[e.charCodeAt(c++)];
				r += 89 + (t < 90 ? t * 91 + j[e.charCodeAt(c++)] : j[e.charCodeAt(c++)] * 8281 + j[e.charCodeAt(c++)] * 91 + j[e.charCodeAt(c++)]), f[i++] = r;
			}
		}
	}
	h(r, 0), h(u, a);
	let g = new Int32Array(i * 2), _ = 0, v = 0;
	function y(e, t) {
		for (let n = 0; n < e; n++) {
			let e = t + n, r = l(), i = l();
			g[v * 2] = r, g[v * 2 + 1] = i, v += 1, p[e] = _;
			let a = (f[r] < 0 ? m[r] : 1) + (f[i] < 0 ? m[i] : 1);
			m[e] = a, _ += a;
		}
	}
	y(i - a + r, a + u), y(a - r, r);
	let b = new Uint16Array(_), x = 0;
	for (let e = 0; e < v; e++) for (let t = 0; t < 2; t++) {
		let n = g[e * 2 + t], r = f[n];
		if (r < 0) {
			let e = p[n], t = e + m[n];
			for (; e < t;) b[x++] = b[e++];
		} else b[x++] = r;
	}
	let S = new Uint16Array(t), C = 0;
	for (; c < o;) {
		let t = j[e.charCodeAt(c++)];
		t >= a && (t = t * 91 - s + j[e.charCodeAt(c++)]);
		let n = f[t];
		if (n < 0) {
			let e = p[t], n = e + m[t];
			for (; e < n;) S[C++] = b[e++];
		} else S[C++] = n;
	}
	return S;
}
var j, M = g((() => {
	j = /* #__PURE__ */ (() => {
		let e = /* @__PURE__ */ new Uint8Array(127), t = 0;
		for (let n = 33; n <= 126; n++) n !== 34 && n !== 36 && n !== 92 && (e[n] = t++);
		return e;
	})();
})), re, ie = g((() => {
	M(), re = /* #__PURE__ */ A("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P", 13494, 2713, 49, 25, 61);
})), ae, oe = g((() => {
	ae = /* #__PURE__ */ new Uint16Array([
		512,
		26465,
		29036,
		7,
		0,
		2,
		4,
		116,
		24638,
		116,
		24636,
		8693,
		29807,
		24610,
		621,
		1,
		0,
		0,
		3,
		112,
		24614,
		111,
		115,
		24615
	]);
})), N, P = g((() => {
	(function(e) {
		e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.FLAG13 = 8192] = "FLAG13", e[e.BRANCH_LENGTH = 8064] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE", e[e.VALUE_MASK = 8191] = "VALUE_MASK";
	})(N ||= {});
}));
// node_modules/entities/dist/decode.js
function se(e) {
	return e - I.ZERO >>> 0 <= 9;
}
function ce(e) {
	return (e | L) - I.LOWER_A >>> 0 <= 5;
}
function F(e) {
	return (e | L) - I.LOWER_A >>> 0 <= 25;
}
function le(e) {
	return e === I.EQUALS || F(e) || se(e);
}
function ue(e, t, n, r) {
	let i = (t & N.BRANCH_LENGTH) >> 7, a = t & N.JUMP_TABLE;
	if (a) {
		if (i === 0) return r === a ? n : -1;
		let t = r - a;
		if (t >>> 0 >= i) return -1;
		let o = e[n + t];
		return o === 0 ? -1 : n + i + o - 1 & 65535;
	}
	if (i === 0) return -1;
	let o = i + 1 >> 1, s = n + o + i;
	for (let t = 0; t < i; t++) {
		let i = e[n + (t >> 1)] >> ((t & 1) << 3) & 255;
		if (i === r) return s + e[n + o + t] & 65535;
		if (i > r) return -1;
	}
	return -1;
}
var I, L, R, z, de, fe = g((() => {
	ne(), oe(), P(), ie(), (function(e) {
		e[e.AMP = 38] = "AMP", e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_X = 120] = "LOWER_X";
	})(I ||= {}), L = 32, (function(e) {
		e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
	})(R ||= {}), (function(e) {
		e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
	})(z ||= {}), de = class {
		decodeTree;
		emitCodePoint;
		errors;
		state = R.EntityStart;
		consumed = 1;
		result = 0;
		treeIndex = 0;
		excess = 1;
		decodeMode = z.Strict;
		runConsumed = 0;
		constructor(e, t, n) {
			this.decodeTree = e, this.emitCodePoint = t, this.errors = n;
		}
		startEntity(e) {
			this.decodeMode = e, this.state = R.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1, this.runConsumed = 0;
		}
		write(e, t) {
			switch (this.state) {
				case R.EntityStart: return e.charCodeAt(t) === I.NUM ? (this.state = R.NumericStart, this.consumed += 1, this.stateNumericStart(e, t + 1)) : (this.state = R.NamedEntity, this.stateNamedEntity(e, t));
				case R.NumericStart: return this.stateNumericStart(e, t);
				case R.NumericDecimal: return this.stateNumericDecimal(e, t);
				case R.NumericHex: return this.stateNumericHex(e, t);
				default: return this.stateNamedEntity(e, t);
			}
		}
		stateNumericStart(e, t) {
			return t >= e.length ? -1 : (e.charCodeAt(t) | L) === I.LOWER_X ? (this.state = R.NumericHex, this.consumed += 1, this.stateNumericHex(e, t + 1)) : (this.state = R.NumericDecimal, this.stateNumericDecimal(e, t));
		}
		stateNumericHex(e, t) {
			let n = e.length, { result: r } = this, { consumed: i } = this;
			for (; t < n;) {
				let n = e.charCodeAt(t);
				if (se(n) || ce(n)) {
					let e = n <= I.NINE ? n - I.ZERO : (n | L) - I.LOWER_A + 10;
					r = r * 16 + e, i += 1, t += 1;
				} else return this.result = r, this.consumed = i, this.emitNumericEntity(n, 3);
			}
			return this.result = r, this.consumed = i, -1;
		}
		stateNumericDecimal(e, t) {
			let n = e.length, { result: r } = this, { consumed: i } = this;
			for (; t < n;) {
				let n = e.charCodeAt(t) - I.ZERO;
				if (n >>> 0 > 9) return this.result = r, this.consumed = i, this.emitNumericEntity(n + I.ZERO, 2);
				r = r * 10 + n, i += 1, t += 1;
			}
			return this.result = r, this.consumed = i, -1;
		}
		emitNumericEntity(e, t) {
			if (this.consumed <= t) return this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
			if (e === I.SEMI) this.consumed += 1;
			else if (this.decodeMode === z.Strict) return 0;
			return this.emitCodePoint((this.decodeTree === ae ? te : ee)(this.result), this.consumed), this.errors && (e !== I.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
		}
		flushAndEmitLegacyOrReject(e, t, n, r) {
			return this.consumed = e, this.excess = t, this.result === 0 || this.decodeMode === z.Attribute && (r === 0 || t > 1 || le(n)) ? 0 : this.emitNotTerminatedNamedEntity();
		}
		stateNamedEntity(e, t) {
			let { decodeTree: n } = this, r = e.length, i = this.decodeMode === z.Strict, { treeIndex: a } = this, { excess: o } = this, { consumed: s } = this, c = n[a];
			for (; t < r;) {
				for (; (c & (N.VALUE_LENGTH | N.FLAG13)) === 0 && (c & N.JUMP_TABLE) !== 0;) {
					let i = e.charCodeAt(t), l = c & N.JUMP_TABLE, u = (c & N.BRANCH_LENGTH) >> 7;
					if (u === 0) {
						if (i !== l) return this.flushAndEmitLegacyOrReject(s, o, i, 0);
						a += 1;
					} else {
						let e = i - l;
						if (e >>> 0 >= u) return this.flushAndEmitLegacyOrReject(s, o, i, 0);
						let t = n[a + 1 + e];
						if (t === 0) return this.flushAndEmitLegacyOrReject(s, o, i, 0);
						a = a + u + t & 65535;
					}
					if (c = n[a], t += 1, o += 1, t >= r) break;
				}
				if (t >= r) break;
				if ((c & (N.VALUE_LENGTH | N.FLAG13)) === N.FLAG13) {
					let i = (c & N.BRANCH_LENGTH) >> 7, { runConsumed: l } = this;
					if (l === 0) {
						let n = e.charCodeAt(t);
						if (n !== (c & N.JUMP_TABLE)) return this.flushAndEmitLegacyOrReject(s, o, n, 0);
						t += 1, o += 1, l = 1;
					}
					for (; l < i;) {
						if (t >= r) return this.treeIndex = a, this.excess = o, this.consumed = s, this.runConsumed = l, -1;
						let i = l - 1, c = n[a + 1 + (i >> 1)] >> ((i & 1) << 3) & 255, u = e.charCodeAt(t);
						if (u !== c) return this.runConsumed = 0, this.flushAndEmitLegacyOrReject(s, o, u, 0);
						t += 1, o += 1, l += 1;
					}
					this.runConsumed = 0, a += 1 + (i >> 1), c = n[a];
					continue;
				}
				let l = c >>> 14, u = e.charCodeAt(t);
				if (l !== 0) {
					if (!i && (c & N.FLAG13) === 0 && (this.result = a, s += o - 1, o = 1), u === I.SEMI) return this.emitNamedEntityData(a, l, s + o);
					if (l === 1) return this.flushAndEmitLegacyOrReject(s, o, u, l);
				}
				let d = ue(n, c, a + (l || 1), u);
				if (d < 0) return this.flushAndEmitLegacyOrReject(s, o, u, l);
				a = d, c = n[a], t += 1, o += 1;
			}
			return !i && c >>> 14 && (c & N.FLAG13) === 0 && (this.result = a, s += o - 1, o = 1), this.treeIndex = a, this.excess = o, this.consumed = s, -1;
		}
		emitNotTerminatedNamedEntity() {
			let { result: e, decodeTree: t } = this, n = t[e] >>> 14;
			return this.emitNamedEntityData(e, n, this.consumed), this.errors?.missingSemicolonAfterCharacterReference(), this.consumed;
		}
		emitNamedEntityData(e, t, n) {
			let { decodeTree: r } = this;
			return this.emitCodePoint(t === 1 ? r[e] & N.VALUE_MASK : r[e + 1], n), t === 3 && this.emitCodePoint(r[e + 2], n), n;
		}
		end() {
			switch (this.state) {
				case R.NamedEntity: return this.result !== 0 && (this.decodeMode !== z.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
				case R.NumericDecimal: return this.emitNumericEntity(0, 2);
				case R.NumericHex: return this.emitNumericEntity(0, 3);
				case R.NumericStart: return this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
				default: return 0;
			}
		}
	};
}));
// node_modules/htmlparser2/dist/Tokenizer.js
function B(e) {
	return e === H.Space || e === H.NewLine || e === H.Tab || e === H.FormFeed || e === H.CarriageReturn;
}
function V(e) {
	return e === H.Slash || e === H.Gt || B(e);
}
function pe(e) {
	return e >= H.LowerA && e <= H.LowerZ || e >= H.UpperA && e <= H.UpperZ;
}
var H, U, W, G, me, he, ge = g((() => {
	fe(), (function(e) {
		e[e.Tab = 9] = "Tab", e[e.NewLine = 10] = "NewLine", e[e.FormFeed = 12] = "FormFeed", e[e.CarriageReturn = 13] = "CarriageReturn", e[e.Space = 32] = "Space", e[e.ExclamationMark = 33] = "ExclamationMark", e[e.Number = 35] = "Number", e[e.Amp = 38] = "Amp", e[e.SingleQuote = 39] = "SingleQuote", e[e.DoubleQuote = 34] = "DoubleQuote", e[e.Dash = 45] = "Dash", e[e.Slash = 47] = "Slash", e[e.Zero = 48] = "Zero", e[e.Nine = 57] = "Nine", e[e.Semi = 59] = "Semi", e[e.Lt = 60] = "Lt", e[e.Eq = 61] = "Eq", e[e.Gt = 62] = "Gt", e[e.Questionmark = 63] = "Questionmark", e[e.UpperA = 65] = "UpperA", e[e.LowerA = 97] = "LowerA", e[e.UpperF = 70] = "UpperF", e[e.LowerF = 102] = "LowerF", e[e.UpperZ = 90] = "UpperZ", e[e.LowerZ = 122] = "LowerZ", e[e.LowerX = 120] = "LowerX", e[e.OpeningSquareBracket = 91] = "OpeningSquareBracket";
	})(H ||= {}), (function(e) {
		e[e.Text = 1] = "Text", e[e.BeforeTagName = 2] = "BeforeTagName", e[e.InTagName = 3] = "InTagName", e[e.InSelfClosingTag = 4] = "InSelfClosingTag", e[e.BeforeClosingTagName = 5] = "BeforeClosingTagName", e[e.InClosingTagName = 6] = "InClosingTagName", e[e.AfterClosingTagName = 7] = "AfterClosingTagName", e[e.BeforeAttributeName = 8] = "BeforeAttributeName", e[e.InAttributeName = 9] = "InAttributeName", e[e.AfterAttributeName = 10] = "AfterAttributeName", e[e.BeforeAttributeValue = 11] = "BeforeAttributeValue", e[e.InAttributeValueDq = 12] = "InAttributeValueDq", e[e.InAttributeValueSq = 13] = "InAttributeValueSq", e[e.InAttributeValueNq = 14] = "InAttributeValueNq", e[e.BeforeDeclaration = 15] = "BeforeDeclaration", e[e.InDeclaration = 16] = "InDeclaration", e[e.InProcessingInstruction = 17] = "InProcessingInstruction", e[e.BeforeComment = 18] = "BeforeComment", e[e.CDATASequence = 19] = "CDATASequence", e[e.DeclarationSequence = 20] = "DeclarationSequence", e[e.InSpecialComment = 21] = "InSpecialComment", e[e.InCommentLike = 22] = "InCommentLike", e[e.SpecialStartSequence = 23] = "SpecialStartSequence", e[e.InSpecialTag = 24] = "InSpecialTag", e[e.InPlainText = 25] = "InPlainText", e[e.InEntity = 26] = "InEntity";
	})(U ||= {}), (function(e) {
		e[e.NoValue = 0] = "NoValue", e[e.Unquoted = 1] = "Unquoted", e[e.Single = 2] = "Single", e[e.Double = 3] = "Double";
	})(W ||= {}), G = {
		Empty: /* @__PURE__ */ new Uint8Array(),
		Cdata: new Uint8Array([
			67,
			68,
			65,
			84,
			65,
			91
		]),
		CdataEnd: new Uint8Array([
			93,
			93,
			62
		]),
		CommentEnd: new Uint8Array([
			45,
			45,
			33,
			62
		]),
		Doctype: new Uint8Array([
			100,
			111,
			99,
			116,
			121,
			112,
			101
		]),
		IframeEnd: new Uint8Array([
			60,
			47,
			105,
			102,
			114,
			97,
			109,
			101
		]),
		NoembedEnd: new Uint8Array([
			60,
			47,
			110,
			111,
			101,
			109,
			98,
			101,
			100
		]),
		NoframesEnd: new Uint8Array([
			60,
			47,
			110,
			111,
			102,
			114,
			97,
			109,
			101,
			115
		]),
		Plaintext: new Uint8Array([
			60,
			47,
			112,
			108,
			97,
			105,
			110,
			116,
			101,
			120,
			116
		]),
		ScriptEnd: new Uint8Array([
			60,
			47,
			115,
			99,
			114,
			105,
			112,
			116
		]),
		StyleEnd: new Uint8Array([
			60,
			47,
			115,
			116,
			121,
			108,
			101
		]),
		TitleEnd: new Uint8Array([
			60,
			47,
			116,
			105,
			116,
			108,
			101
		]),
		TextareaEnd: new Uint8Array([
			60,
			47,
			116,
			101,
			120,
			116,
			97,
			114,
			101,
			97
		]),
		XmpEnd: new Uint8Array([
			60,
			47,
			120,
			109,
			112
		])
	}, me = /* @__PURE__ */ new Map([
		[G.IframeEnd[2], G.IframeEnd],
		[G.NoembedEnd[2], G.NoembedEnd],
		[G.Plaintext[2], G.Plaintext],
		[G.ScriptEnd[2], G.ScriptEnd],
		[G.TitleEnd[2], G.TitleEnd],
		[G.XmpEnd[2], G.XmpEnd]
	]), he = class {
		cbs;
		state = U.Text;
		buffer = "";
		sectionStart = 0;
		index = 0;
		entityStart = 0;
		baseState = U.Text;
		isSpecial = !1;
		running = !0;
		offset = 0;
		xmlMode;
		decodeEntities;
		recognizeSelfClosing;
		entityDecoder;
		constructor({ xmlMode: e = !1, decodeEntities: t = !0, recognizeSelfClosing: n = e }, r) {
			this.cbs = r, this.xmlMode = e, this.decodeEntities = t, this.recognizeSelfClosing = n, this.entityDecoder = new de(e ? ae : re, (e, t) => this.emitCodePoint(e, t));
		}
		reset() {
			this.state = U.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = U.Text, this.isSpecial = !1, this.currentSequence = G.Empty, this.sequenceIndex = 0, this.running = !0, this.offset = 0;
		}
		write(e) {
			this.offset += this.buffer.length, this.buffer = e, this.parse();
		}
		end() {
			this.running && this.finish();
		}
		pause() {
			this.running = !1;
		}
		resume() {
			this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
		}
		stateText(e) {
			e === H.Lt || !this.decodeEntities && this.fastForwardTo(H.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = U.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && e === H.Amp && this.startEntity();
		}
		currentSequence = G.Empty;
		sequenceIndex = 0;
		enterTagBody() {
			this.currentSequence === G.Plaintext ? (this.currentSequence = G.Empty, this.state = U.InPlainText) : this.isSpecial ? (this.state = U.InSpecialTag, this.sequenceIndex = 0) : this.state = U.Text;
		}
		stateSpecialStartSequence(e) {
			let t = e | 32;
			if (this.sequenceIndex < this.currentSequence.length) {
				if (t === this.currentSequence[this.sequenceIndex]) {
					this.sequenceIndex++;
					return;
				}
				if (this.sequenceIndex === 3) {
					if (this.currentSequence === G.ScriptEnd && t === G.StyleEnd[3]) {
						this.currentSequence = G.StyleEnd, this.sequenceIndex = 4;
						return;
					}
					if (this.currentSequence === G.TitleEnd && t === G.TextareaEnd[3]) {
						this.currentSequence = G.TextareaEnd, this.sequenceIndex = 4;
						return;
					}
				} else if (this.sequenceIndex === 4 && this.currentSequence === G.NoembedEnd && t === G.NoframesEnd[4]) {
					this.currentSequence = G.NoframesEnd, this.sequenceIndex = 5;
					return;
				}
			} else if (V(e)) {
				this.sequenceIndex = 0, this.state = U.InTagName, this.stateInTagName(e);
				return;
			}
			this.isSpecial = !1, this.currentSequence = G.Empty, this.sequenceIndex = 0, this.state = U.InTagName, this.stateInTagName(e);
		}
		stateCDATASequence(e) {
			e === G.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === G.Cdata.length && (this.state = U.InCommentLike, this.currentSequence = G.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.xmlMode ? (this.state = U.InDeclaration, this.stateInDeclaration(e)) : (this.state = U.InSpecialComment, this.stateInSpecialComment(e)));
		}
		fastForwardTo(e) {
			for (; ++this.index < this.buffer.length + this.offset;) if (this.buffer.charCodeAt(this.index - this.offset) === e) return !0;
			return this.index = this.buffer.length + this.offset - 1, !1;
		}
		emitComment(e) {
			this.cbs.oncomment(this.sectionStart, this.index, e), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = U.Text;
		}
		stateInCommentLike(e) {
			!this.xmlMode && this.currentSequence === G.CommentEnd && this.sequenceIndex <= 1 && this.index === this.sectionStart + this.sequenceIndex && e === H.Gt ? this.emitComment(this.sequenceIndex) : this.currentSequence === G.CommentEnd && this.sequenceIndex === 2 && e === H.Gt ? this.emitComment(2) : this.currentSequence === G.CommentEnd && this.sequenceIndex === this.currentSequence.length - 1 && e !== H.Gt ? this.sequenceIndex = Number(e === H.Dash) : e === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === G.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 3), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = U.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : e !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
		}
		isTagStartChar(e) {
			return this.xmlMode ? !V(e) : pe(e);
		}
		stateInSpecialTag(e) {
			if (this.sequenceIndex === this.currentSequence.length) {
				if (V(e)) {
					let t = this.index - this.currentSequence.length;
					if (this.sectionStart < t) {
						let e = this.index;
						this.index = t, this.cbs.ontext(this.sectionStart, t), this.index = e;
					}
					this.isSpecial = !1, this.sectionStart = t + 2, this.stateInClosingTagName(e);
					return;
				}
				this.sequenceIndex = 0;
			}
			(e | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === G.TitleEnd || this.currentSequence === G.TextareaEnd ? this.decodeEntities && e === H.Amp && this.startEntity() : this.fastForwardTo(H.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = Number(e === H.Lt);
		}
		stateBeforeTagName(e) {
			if (e === H.ExclamationMark) this.state = U.BeforeDeclaration, this.sectionStart = this.index + 1;
			else if (e === H.Questionmark) this.xmlMode ? (this.state = U.InProcessingInstruction, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.state = U.InSpecialComment, this.sectionStart = this.index);
			else if (this.isTagStartChar(e)) {
				this.sectionStart = this.index;
				let t = this.xmlMode || this.cbs.isInForeignContext?.() ? void 0 : me.get(e | 32);
				t === void 0 ? this.state = U.InTagName : (this.isSpecial = !0, this.currentSequence = t, this.sequenceIndex = 3, this.state = U.SpecialStartSequence);
			} else e === H.Slash ? this.state = U.BeforeClosingTagName : (this.state = U.Text, this.stateText(e));
		}
		stateInTagName(e) {
			V(e) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = U.BeforeAttributeName, this.stateBeforeAttributeName(e));
		}
		stateBeforeClosingTagName(e) {
			B(e) ? this.xmlMode || (this.state = U.InSpecialComment, this.sectionStart = this.index) : e === H.Gt ? (this.state = U.Text, this.xmlMode || (this.sectionStart = this.index + 1)) : (this.state = this.isTagStartChar(e) ? U.InClosingTagName : U.InSpecialComment, this.sectionStart = this.index);
		}
		stateInClosingTagName(e) {
			V(e) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = U.AfterClosingTagName, this.stateAfterClosingTagName(e));
		}
		stateAfterClosingTagName(e) {
			(e === H.Gt || this.fastForwardTo(H.Gt)) && (this.state = U.Text, this.sectionStart = this.index + 1);
		}
		stateBeforeAttributeName(e) {
			e === H.Gt ? (this.cbs.onopentagend(this.index), this.enterTagBody(), this.sectionStart = this.index + 1) : e === H.Slash ? this.state = U.InSelfClosingTag : B(e) || (this.state = U.InAttributeName, this.sectionStart = this.index);
		}
		stateInSelfClosingTag(e) {
			if (e === H.Gt) {
				if (this.cbs.onselfclosingtag(this.index), this.sectionStart = this.index + 1, !this.recognizeSelfClosing) {
					this.enterTagBody();
					return;
				}
				this.state = U.Text, this.isSpecial = !1, this.currentSequence = G.Empty;
			} else B(e) || (this.state = U.BeforeAttributeName, this.stateBeforeAttributeName(e));
		}
		stateInAttributeName(e) {
			(e === H.Eq || V(e)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = this.index, this.state = U.AfterAttributeName, this.stateAfterAttributeName(e));
		}
		stateAfterAttributeName(e) {
			e === H.Eq ? this.state = U.BeforeAttributeValue : e === H.Slash || e === H.Gt ? (this.cbs.onattribend(W.NoValue, this.sectionStart), this.sectionStart = -1, this.state = U.BeforeAttributeName, this.stateBeforeAttributeName(e)) : B(e) || (this.cbs.onattribend(W.NoValue, this.sectionStart), this.state = U.InAttributeName, this.sectionStart = this.index);
		}
		stateBeforeAttributeValue(e) {
			e === H.DoubleQuote ? (this.state = U.InAttributeValueDq, this.sectionStart = this.index + 1) : e === H.SingleQuote ? (this.state = U.InAttributeValueSq, this.sectionStart = this.index + 1) : B(e) || (this.sectionStart = this.index, this.state = U.InAttributeValueNq, this.stateInAttributeValueNoQuotes(e));
		}
		handleInAttributeValue(e, t) {
			e === t || !this.decodeEntities && this.fastForwardTo(t) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(t === H.DoubleQuote ? W.Double : W.Single, this.index + 1), this.state = U.BeforeAttributeName) : this.decodeEntities && e === H.Amp && this.startEntity();
		}
		stateInAttributeValueDoubleQuotes(e) {
			this.handleInAttributeValue(e, H.DoubleQuote);
		}
		stateInAttributeValueSingleQuotes(e) {
			this.handleInAttributeValue(e, H.SingleQuote);
		}
		stateInAttributeValueNoQuotes(e) {
			B(e) || e === H.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(W.Unquoted, this.index), this.state = U.BeforeAttributeName, this.stateBeforeAttributeName(e)) : this.decodeEntities && e === H.Amp && this.startEntity();
		}
		stateBeforeDeclaration(e) {
			e === H.OpeningSquareBracket ? (this.state = U.CDATASequence, this.sequenceIndex = 0) : this.xmlMode ? this.state = e === H.Dash ? U.BeforeComment : U.InDeclaration : (e | 32) === G.Doctype[0] ? (this.state = U.DeclarationSequence, this.currentSequence = G.Doctype, this.sequenceIndex = 1) : e === H.Gt ? (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = U.Text, this.sectionStart = this.index + 1) : this.state = e === H.Dash ? U.BeforeComment : U.InSpecialComment;
		}
		stateDeclarationSequence(e) {
			this.sequenceIndex === this.currentSequence.length ? (this.state = U.InDeclaration, this.stateInDeclaration(e)) : (e | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : e === H.Gt ? (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = U.Text, this.sectionStart = this.index + 1) : this.state = U.InSpecialComment;
		}
		stateInDeclaration(e) {
			(e === H.Gt || this.fastForwardTo(H.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = U.Text, this.sectionStart = this.index + 1);
		}
		stateInProcessingInstruction(e) {
			e === H.Questionmark ? this.sequenceIndex = 1 : e === H.Gt && this.sequenceIndex === 1 ? (this.cbs.onprocessinginstruction(this.sectionStart, this.index - 1), this.sequenceIndex = 0, this.state = U.Text, this.sectionStart = this.index + 1) : this.sequenceIndex = Number(this.fastForwardTo(H.Questionmark));
		}
		stateBeforeComment(e) {
			e === H.Dash ? (this.state = U.InCommentLike, this.currentSequence = G.CommentEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : this.xmlMode ? this.state = U.InDeclaration : e === H.Gt ? (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = U.Text, this.sectionStart = this.index + 1) : this.state = U.InSpecialComment;
		}
		stateInSpecialComment(e) {
			(e === H.Gt || this.fastForwardTo(H.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = U.Text, this.sectionStart = this.index + 1);
		}
		startEntity() {
			this.baseState = this.state, this.state = U.InEntity, this.entityStart = this.index, this.entityDecoder.startEntity(this.xmlMode ? z.Strict : this.baseState === U.Text || this.baseState === U.InSpecialTag ? z.Legacy : z.Attribute);
		}
		stateInEntity() {
			let e = this.index - this.offset, t = this.entityDecoder.write(this.buffer, e);
			if (t >= 0) this.state = this.baseState, t === 0 && --this.index;
			else {
				if (e < this.buffer.length && this.buffer.charCodeAt(e) === H.Amp) {
					this.state = this.baseState, --this.index;
					return;
				}
				this.index = this.offset + this.buffer.length - 1;
			}
		}
		cleanup() {
			this.running && this.sectionStart !== this.index && (this.state === U.Text || this.state === U.InPlainText || this.state === U.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === U.InAttributeValueDq || this.state === U.InAttributeValueSq || this.state === U.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
		}
		shouldContinue() {
			return this.index < this.buffer.length + this.offset && this.running;
		}
		parse() {
			for (; this.shouldContinue();) {
				let e = this.buffer.charCodeAt(this.index - this.offset);
				switch (this.state) {
					case U.Text:
						this.stateText(e);
						break;
					case U.InPlainText:
						this.index = this.buffer.length + this.offset - 1;
						break;
					case U.SpecialStartSequence:
						this.stateSpecialStartSequence(e);
						break;
					case U.InSpecialTag:
						this.stateInSpecialTag(e);
						break;
					case U.CDATASequence:
						this.stateCDATASequence(e);
						break;
					case U.DeclarationSequence:
						this.stateDeclarationSequence(e);
						break;
					case U.InAttributeValueDq:
						this.stateInAttributeValueDoubleQuotes(e);
						break;
					case U.InAttributeName:
						this.stateInAttributeName(e);
						break;
					case U.InCommentLike:
						this.stateInCommentLike(e);
						break;
					case U.InSpecialComment:
						this.stateInSpecialComment(e);
						break;
					case U.BeforeAttributeName:
						this.stateBeforeAttributeName(e);
						break;
					case U.InTagName:
						this.stateInTagName(e);
						break;
					case U.InClosingTagName:
						this.stateInClosingTagName(e);
						break;
					case U.BeforeTagName:
						this.stateBeforeTagName(e);
						break;
					case U.AfterAttributeName:
						this.stateAfterAttributeName(e);
						break;
					case U.InAttributeValueSq:
						this.stateInAttributeValueSingleQuotes(e);
						break;
					case U.BeforeAttributeValue:
						this.stateBeforeAttributeValue(e);
						break;
					case U.BeforeClosingTagName:
						this.stateBeforeClosingTagName(e);
						break;
					case U.AfterClosingTagName:
						this.stateAfterClosingTagName(e);
						break;
					case U.InAttributeValueNq:
						this.stateInAttributeValueNoQuotes(e);
						break;
					case U.InSelfClosingTag:
						this.stateInSelfClosingTag(e);
						break;
					case U.InDeclaration:
						this.stateInDeclaration(e);
						break;
					case U.BeforeDeclaration:
						this.stateBeforeDeclaration(e);
						break;
					case U.BeforeComment:
						this.stateBeforeComment(e);
						break;
					case U.InProcessingInstruction:
						this.stateInProcessingInstruction(e);
						break;
					case U.InEntity: this.stateInEntity();
				}
				this.index++;
			}
			this.cleanup();
		}
		finish() {
			this.state === U.InEntity && (this.entityDecoder.end(), this.state = this.baseState), this.handleTrailingData(), this.cbs.onend();
		}
		handleTrailingCommentLikeData(e) {
			if (this.state !== U.InCommentLike) return !1;
			if (this.currentSequence === G.CdataEnd) {
				if (this.xmlMode) this.sectionStart < e && this.cbs.oncdata(this.sectionStart, e, 0);
				else {
					let t = this.sectionStart - G.Cdata.length - 1;
					this.cbs.oncomment(t, e, 0);
				}
			} else {
				let t = this.xmlMode ? 0 : Math.min(this.sequenceIndex, G.CommentEnd.length - 1);
				this.cbs.oncomment(this.sectionStart, e, t);
			}
			return !0;
		}
		handleTrailingMarkupDeclaration(e) {
			if (this.xmlMode) switch (this.state) {
				case U.InSpecialComment:
				case U.BeforeComment:
				case U.CDATASequence:
				case U.DeclarationSequence:
				case U.InDeclaration: return this.cbs.ontext(this.sectionStart, e), !0;
				default: return !1;
			}
			switch (this.state) {
				case U.BeforeDeclaration:
				case U.InSpecialComment:
				case U.BeforeComment:
				case U.CDATASequence: return this.cbs.oncomment(this.sectionStart, e, 0), !0;
				case U.DeclarationSequence: return this.sequenceIndex !== G.Doctype.length && this.cbs.oncomment(this.sectionStart, e, 0), !0;
				case U.InDeclaration: return !0;
				default: return !1;
			}
		}
		handleTrailingData() {
			let e = this.buffer.length + this.offset;
			if (!(this.handleTrailingCommentLikeData(e) || this.handleTrailingMarkupDeclaration(e)) && !(this.sectionStart >= e)) switch (this.state) {
				case U.InTagName:
				case U.BeforeAttributeName:
				case U.BeforeAttributeValue:
				case U.AfterAttributeName:
				case U.InAttributeName:
				case U.InAttributeValueSq:
				case U.InAttributeValueDq:
				case U.InAttributeValueNq:
				case U.InClosingTagName: break;
				default: this.cbs.ontext(this.sectionStart, e);
			}
		}
		emitCodePoint(e, t) {
			this.baseState !== U.Text && this.baseState !== U.InSpecialTag ? (this.sectionStart < this.entityStart && this.cbs.onattribdata(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + t, this.index = this.sectionStart - 1, this.cbs.onattribentity(e)) : (this.sectionStart < this.entityStart && this.cbs.ontext(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + t, this.index = this.sectionStart - 1, this.cbs.ontextentity(e, this.sectionStart));
		}
	};
})), _e, ve, K, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, q, ke, Ae, je = g((() => {
	ge(), {fromCodePoint: _e} = String, ve = /* @__PURE__ */ new Set([
		"input",
		"option",
		"optgroup",
		"select",
		"button",
		"datalist",
		"textarea"
	]), K = /* @__PURE__ */ new Set(["p"]), ye = /* @__PURE__ */ new Set([
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"p"
	]), be = /* @__PURE__ */ new Set(["thead", "tbody"]), xe = /* @__PURE__ */ new Set(["dd", "dt"]), Se = /* @__PURE__ */ new Set(["rt", "rp"]), Ce = /* @__PURE__ */ new Map([
		["tr", /* @__PURE__ */ new Set([
			"tr",
			"th",
			"td"
		])],
		["th", /* @__PURE__ */ new Set(["th"])],
		["td", /* @__PURE__ */ new Set([
			"thead",
			"th",
			"td"
		])],
		["body", /* @__PURE__ */ new Set([
			"head",
			"link",
			"script"
		])],
		["a", /* @__PURE__ */ new Set(["a"])],
		["li", /* @__PURE__ */ new Set(["li"])],
		["p", K],
		["h1", ye],
		["h2", ye],
		["h3", ye],
		["h4", ye],
		["h5", ye],
		["h6", ye],
		["select", ve],
		["input", ve],
		["output", ve],
		["button", ve],
		["datalist", ve],
		["textarea", ve],
		["option", /* @__PURE__ */ new Set(["option"])],
		["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
		["dd", xe],
		["dt", xe],
		["address", K],
		["article", K],
		["aside", K],
		["blockquote", K],
		["details", K],
		["div", K],
		["dl", K],
		["fieldset", K],
		["figcaption", K],
		["figure", K],
		["footer", K],
		["form", K],
		["header", K],
		["hr", K],
		["main", K],
		["nav", K],
		["ol", K],
		["pre", K],
		["section", K],
		["table", K],
		["ul", K],
		["rt", Se],
		["rp", Se],
		["tbody", be],
		["tfoot", be]
	]), we = "doctype", Te = /* @__PURE__ */ new Set([
		"area",
		"base",
		"basefont",
		"br",
		"col",
		"command",
		"embed",
		"frame",
		"hr",
		"img",
		"input",
		"isindex",
		"keygen",
		"link",
		"meta",
		"param",
		"source",
		"track",
		"wbr"
	]), Ee = /* @__PURE__ */ new Set(["math", "svg"]), De = /* @__PURE__ */ new Set([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext",
		"annotation-xml",
		"foreignObject",
		"desc",
		"title"
	]), Oe = /* @__PURE__ */ new Map([
		["altglyph", "altGlyph"],
		["altglyphdef", "altGlyphDef"],
		["altglyphitem", "altGlyphItem"],
		["animatecolor", "animateColor"],
		["animatemotion", "animateMotion"],
		["animatetransform", "animateTransform"],
		["clippath", "clipPath"],
		["feblend", "feBlend"],
		["fecolormatrix", "feColorMatrix"],
		["fecomponenttransfer", "feComponentTransfer"],
		["fecomposite", "feComposite"],
		["feconvolvematrix", "feConvolveMatrix"],
		["fediffuselighting", "feDiffuseLighting"],
		["fedisplacementmap", "feDisplacementMap"],
		["fedistantlight", "feDistantLight"],
		["fedropshadow", "feDropShadow"],
		["feflood", "feFlood"],
		["fefunca", "feFuncA"],
		["fefuncb", "feFuncB"],
		["fefuncg", "feFuncG"],
		["fefuncr", "feFuncR"],
		["fegaussianblur", "feGaussianBlur"],
		["feimage", "feImage"],
		["femerge", "feMerge"],
		["femergenode", "feMergeNode"],
		["femorphology", "feMorphology"],
		["feoffset", "feOffset"],
		["fepointlight", "fePointLight"],
		["fespecularlighting", "feSpecularLighting"],
		["fespotlight", "feSpotLight"],
		["fetile", "feTile"],
		["feturbulence", "feTurbulence"],
		["foreignobject", "foreignObject"],
		["glyphref", "glyphRef"],
		["lineargradient", "linearGradient"],
		["radialgradient", "radialGradient"],
		["textpath", "textPath"]
	]), (function(e) {
		e[e.None = 0] = "None", e[e.Svg = 1] = "Svg", e[e.MathML = 2] = "MathML";
	})(q ||= {}), ke = /\s|\//, Ae = class {
		options;
		startIndex = 0;
		endIndex = 0;
		openTagStart = 0;
		tagname = "";
		attribname = "";
		attribvalue = "";
		attribs = null;
		stack = [];
		foreignContext;
		cbs;
		lowerCaseTagNames;
		lowerCaseAttributeNames;
		recognizeSelfClosing;
		htmlMode;
		tokenizer;
		buffers = [];
		bufferOffset = 0;
		writeIndex = 0;
		ended = !1;
		constructor(e, t = {}) {
			this.options = t, this.cbs = e ?? {}, this.htmlMode = !this.options.xmlMode, this.lowerCaseTagNames = t.lowerCaseTags ?? this.htmlMode, this.lowerCaseAttributeNames = t.lowerCaseAttributeNames ?? this.htmlMode, this.recognizeSelfClosing = t.recognizeSelfClosing ?? !this.htmlMode, this.tokenizer = new (t.Tokenizer ?? he)(this.options, this), this.foreignContext = [q.None], this.cbs.onparserinit?.(this);
		}
		ontext(e, t) {
			let n = this.getSlice(e, t);
			this.endIndex = t - 1, this.cbs.ontext?.(n), this.startIndex = t;
		}
		ontextentity(e, t) {
			this.endIndex = t - 1, this.cbs.ontext?.(_e(e)), this.startIndex = t;
		}
		isInForeignContext() {
			return this.foreignContext[0] !== q.None;
		}
		isVoidElement(e) {
			return this.htmlMode && Te.has(e);
		}
		readTagName(e, t) {
			let n = this.lowerCaseTagNames ? this.getSlice(e, t).toLowerCase() : this.getSlice(e, t);
			if (!(this.lowerCaseTagNames && this.htmlMode)) return n;
			if (this.foreignContext[0] === q.Svg) return Oe.get(n) ?? n;
			if (this.foreignContext.length > 1) {
				let e = Oe.get(n);
				if (e !== void 0 && this.stack.includes(e)) return e;
			}
			return this.isInForeignContext() ? n : n === "image" ? "img" : n;
		}
		onopentagname(e, t) {
			this.endIndex = t, this.emitOpenTag(this.readTagName(e, t));
		}
		emitOpenTag(e) {
			if (this.openTagStart = this.startIndex, this.tagname = e, this.htmlMode && e === "form" && this.stack.includes("form")) {
				this.tagname = "";
				return;
			}
			let t = this.htmlMode && Ce.get(e);
			if (t) for (; this.stack.length > 0 && t.has(this.stack[0]);) this.popElement(!0);
			this.isVoidElement(e) || (this.stack.unshift(e), this.htmlMode && (e === "svg" ? this.foreignContext.unshift(q.Svg) : e === "math" ? this.foreignContext.unshift(q.MathML) : De.has(e) && this.foreignContext.unshift(q.None))), this.cbs.onopentagname?.(e), this.cbs.onopentag && (this.attribs = {});
		}
		endOpenTag(e) {
			this.startIndex = this.openTagStart, this.attribs &&= (this.cbs.onopentag?.(this.tagname, this.attribs, e), null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
		}
		onopentagend(e) {
			this.endIndex = e, this.endOpenTag(!1), this.startIndex = e + 1;
		}
		onclosetag(e, t) {
			this.endIndex = t;
			let n = this.readTagName(e, t);
			if (this.isVoidElement(n)) this.htmlMode && n === "br" && (this.cbs.onopentagname?.("br"), this.cbs.onopentag?.("br", {}, !0), this.cbs.onclosetag?.("br", !1));
			else {
				let e = this.stack.indexOf(n);
				if (e !== -1) {
					for (let t = 0; t < e; t++) this.popElement(!0);
					this.popElement(!1);
				} else this.htmlMode && n === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
			}
			this.startIndex = t + 1;
		}
		onselfclosingtag(e) {
			this.endIndex = e, this.recognizeSelfClosing || this.isInForeignContext() ? (this.closeCurrentTag(!1), this.startIndex = e + 1) : this.onopentagend(e);
		}
		popElement(e) {
			let t = this.stack.shift();
			this.htmlMode && (Ee.has(t) || De.has(t)) && this.foreignContext.shift(), this.cbs.onclosetag?.(t, e);
		}
		closeCurrentTag(e) {
			let t = this.tagname;
			this.endOpenTag(e), this.stack[0] === t && this.popElement(!e);
		}
		onattribname(e, t) {
			this.startIndex = e;
			let n = this.getSlice(e, t);
			this.attribname = this.lowerCaseAttributeNames ? n.toLowerCase() : n;
		}
		onattribdata(e, t) {
			this.attribvalue += this.getSlice(e, t);
		}
		onattribentity(e) {
			this.attribvalue += _e(e);
		}
		onattribend(e, t) {
			this.endIndex = t, this.cbs.onattribute?.(this.attribname, this.attribvalue, e === W.Double ? "\"" : e === W.Single ? "'" : e === W.NoValue ? void 0 : null), this.attribs && !Object.hasOwn(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
		}
		getInstructionName(e) {
			let t = e.search(ke), n = t < 0 ? e : e.substr(0, t);
			return this.lowerCaseTagNames && (n = n.toLowerCase()), n;
		}
		ondeclaration(e, t) {
			this.endIndex = t;
			let n = this.getSlice(e, t);
			if (this.cbs.onprocessinginstruction) {
				let e = this.htmlMode ? this.lowerCaseTagNames ? we : n.slice(0, 7) : this.getInstructionName(n);
				this.cbs.onprocessinginstruction(`!${e}`, `!${n}`);
			}
			this.startIndex = t + 1;
		}
		onprocessinginstruction(e, t) {
			this.endIndex = t;
			let n = this.getSlice(e, t);
			if (this.cbs.onprocessinginstruction) {
				let e = this.getInstructionName(n);
				this.cbs.onprocessinginstruction(`?${e}`, `?${n}`);
			}
			this.startIndex = t + 1;
		}
		oncomment(e, t, n) {
			this.endIndex = t, this.cbs.oncomment?.(this.getSlice(e, t - n)), this.cbs.oncommentend?.(), this.startIndex = t + 1;
		}
		oncdata(e, t, n) {
			this.endIndex = t;
			let r = this.getSlice(e, t - n);
			!this.htmlMode || this.options.recognizeCDATA ? (this.cbs.oncdatastart?.(), this.cbs.ontext?.(r), this.cbs.oncdataend?.()) : this.isInForeignContext() ? this.cbs.ontext?.(r) : (this.cbs.oncomment?.(`[CDATA[${r}]]`), this.cbs.oncommentend?.()), this.startIndex = t + 1;
		}
		onend() {
			if (this.cbs.onclosetag) {
				this.endIndex = this.startIndex;
				for (let e = 0; e < this.stack.length; e++) this.cbs.onclosetag(this.stack[e], !0);
			}
			this.cbs.onend?.();
		}
		reset() {
			this.cbs.onreset?.(), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, this.cbs.onparserinit?.(this), this.buffers.length = 0, this.foreignContext.length = 0, this.foreignContext.unshift(q.None), this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
		}
		parseComplete(e) {
			this.reset(), this.end(e);
		}
		getSlice(e, t) {
			if (e === t) return "";
			for (; e - this.bufferOffset >= this.buffers[0].length;) this.shiftBuffer();
			let n = this.buffers[0].slice(e - this.bufferOffset, t - this.bufferOffset);
			for (; t - this.bufferOffset > this.buffers[0].length;) this.shiftBuffer(), n += this.buffers[0].slice(0, t - this.bufferOffset);
			return n;
		}
		shiftBuffer() {
			this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
		}
		write(e) {
			this.ended ? this.cbs.onerror?.(/* @__PURE__ */ Error(".write() after done!")) : (this.buffers.push(e), this.tokenizer.running && (this.tokenizer.write(e), this.writeIndex++));
		}
		end(e) {
			this.ended ? this.cbs.onerror?.(/* @__PURE__ */ Error(".end() after done!")) : (e && this.write(e), this.ended = !0, this.tokenizer.end());
		}
		pause() {
			this.tokenizer.pause();
		}
		resume() {
			for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length;) this.tokenizer.write(this.buffers[this.writeIndex++]);
			this.ended && this.tokenizer.end();
		}
	};
})), Me = /* @__PURE__ */ v({
	CDATA: () => Ve,
	Comment: () => Le,
	Directive: () => Ie,
	Doctype: () => He,
	ElementType: () => J,
	Root: () => Pe,
	Script: () => Re,
	Style: () => ze,
	Tag: () => Be,
	Text: () => Fe,
	isTag: () => Ne
});
function Ne(e) {
	return e.type === J.Tag || e.type === J.Script || e.type === J.Style;
}
var J, Pe, Fe, Ie, Le, Re, ze, Be, Ve, He, Ue = g((() => {
	(function(e) {
		e.Root = "root", e.Text = "text", e.Directive = "directive", e.Comment = "comment", e.Script = "script", e.Style = "style", e.Tag = "tag", e.CDATA = "cdata", e.Doctype = "doctype";
	})(J ||= {}), Pe = J.Root, Fe = J.Text, Ie = J.Directive, Le = J.Comment, Re = J.Script, ze = J.Style, Be = J.Tag, Ve = J.CDATA, He = J.Doctype;
}));
// node_modules/domhandler/dist/node.js
function Y(e) {
	return Ne(e);
}
function We(e) {
	return e.type === J.CDATA;
}
function Ge(e) {
	return e.type === J.Text;
}
function Ke(e) {
	return e.type === J.Comment;
}
function qe(e) {
	return e.type === J.Directive;
}
function Je(e) {
	return e.type === J.Root;
}
function X(e) {
	return Object.hasOwn(e, "children");
}
function Ye(e, t = !1) {
	let n;
	if (Ge(e)) n = new $e(e.data);
	else if (Ke(e)) n = new et(e.data);
	else if (Y(e)) {
		let r = t ? Xe(e.children) : [], i = new at(e.name, { ...e.attribs }, r);
		for (let e of r) e.parent = i;
		e.namespace != null && (i.namespace = e.namespace), e["x-attribsNamespace"] && (i["x-attribsNamespace"] = { ...e["x-attribsNamespace"] }), e["x-attribsPrefix"] && (i["x-attribsPrefix"] = { ...e["x-attribsPrefix"] }), n = i;
	} else if (We(e)) {
		let r = t ? Xe(e.children) : [], i = new rt(r);
		for (let e of r) e.parent = i;
		n = i;
	} else if (Je(e)) {
		let r = t ? Xe(e.children) : [], i = new it(r);
		for (let e of r) e.parent = i;
		e["x-mode"] && (i["x-mode"] = e["x-mode"]), n = i;
	} else if (qe(e)) {
		let t = new tt(e.name, e.data);
		e["x-name"] != null && (t["x-name"] = e["x-name"], t["x-publicId"] = e["x-publicId"], t["x-systemId"] = e["x-systemId"]), n = t;
	} else throw Error(`Not implemented yet: ${e.type}`);
	return n.startIndex = e.startIndex, n.endIndex = e.endIndex, e.sourceCodeLocation != null && (n.sourceCodeLocation = e.sourceCodeLocation), n;
}
function Xe(e) {
	let t = e.map((e) => Ye(e, !0));
	for (let e = 1; e < t.length; e++) t[e].prev = t[e - 1], t[e - 1].next = t[e];
	return t;
}
var Ze, Qe, $e, et, tt, nt, rt, it, at, ot = g((() => {
	Ue(), Ze = class {
		parent = null;
		prev = null;
		next = null;
		startIndex = null;
		endIndex = null;
		get parentNode() {
			return this.parent;
		}
		set parentNode(e) {
			this.parent = e;
		}
		get previousSibling() {
			return this.prev;
		}
		set previousSibling(e) {
			this.prev = e;
		}
		get nextSibling() {
			return this.next;
		}
		set nextSibling(e) {
			this.next = e;
		}
		cloneNode(e = !1) {
			return Ye(this, e);
		}
	}, Qe = class extends Ze {
		data;
		constructor(e) {
			super(), this.data = e;
		}
		get nodeValue() {
			return this.data;
		}
		set nodeValue(e) {
			this.data = e;
		}
	}, $e = class extends Qe {
		type = J.Text;
		get nodeType() {
			return 3;
		}
	}, et = class extends Qe {
		type = J.Comment;
		get nodeType() {
			return 8;
		}
	}, tt = class extends Qe {
		type = J.Directive;
		name;
		constructor(e, t) {
			super(t), this.name = e;
		}
		get nodeType() {
			return 1;
		}
		"x-name";
		"x-publicId";
		"x-systemId";
	}, nt = class extends Ze {
		children;
		constructor(e) {
			super(), this.children = e;
		}
		get firstChild() {
			return this.children[0] ?? null;
		}
		get lastChild() {
			return this.children.length > 0 ? this.children[this.children.length - 1] : null;
		}
		get childNodes() {
			return this.children;
		}
		set childNodes(e) {
			this.children = e;
		}
	}, rt = class extends nt {
		type = J.CDATA;
		get nodeType() {
			return 4;
		}
	}, it = class extends nt {
		type = J.Root;
		get nodeType() {
			return 9;
		}
	}, at = class extends nt {
		name;
		attribs;
		type;
		constructor(e, t, n = [], r = e === "script" ? J.Script : e === "style" ? J.Style : J.Tag) {
			super(n), this.name = e, this.attribs = t, this.type = r;
		}
		get nodeType() {
			return 1;
		}
		get tagName() {
			return this.name;
		}
		set tagName(e) {
			this.name = e;
		}
		get attributes() {
			return Object.keys(this.attribs).map((e) => ({
				name: e,
				value: this.attribs[e],
				namespace: this["x-attribsNamespace"]?.[e],
				prefix: this["x-attribsPrefix"]?.[e]
			}));
		}
		namespace;
		"x-attribsNamespace";
		"x-attribsPrefix";
	};
})), st, ct, lt = g((() => {
	Ue(), ot(), ot(), st = {
		withStartIndices: !1,
		withEndIndices: !1,
		xmlMode: !1
	}, ct = class {
		dom = [];
		root = new it(this.dom);
		callback;
		options;
		elementCB;
		done = !1;
		tagStack = [this.root];
		lastNode = null;
		parser = null;
		constructor(e, t, n) {
			typeof t == "function" && (n = t, t = st), typeof e == "object" && (t = e, e = void 0), this.callback = e ?? null, this.options = t ?? st, this.elementCB = n ?? null;
		}
		onparserinit(e) {
			this.parser = e;
		}
		onreset() {
			this.dom = [], this.root = new it(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
		}
		onend() {
			this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
		}
		onerror(e) {
			this.handleCallback(e);
		}
		onclosetag() {
			this.lastNode = null;
			let e = this.tagStack.pop();
			this.options.withEndIndices && this.parser && (e.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(e);
		}
		onopentag(e, t) {
			let n = this.options.xmlMode ? J.Tag : void 0, r = new at(e, t, void 0, n);
			this.addNode(r), this.tagStack.push(r);
		}
		ontext(e) {
			let { lastNode: t } = this;
			if (t && t.type === J.Text) t.data += e, this.options.withEndIndices && this.parser && (t.endIndex = this.parser.endIndex);
			else {
				let t = new $e(e);
				this.addNode(t), this.lastNode = t;
			}
		}
		oncomment(e) {
			if (this.lastNode && this.lastNode.type === J.Comment) {
				this.lastNode.data += e;
				return;
			}
			let t = new et(e);
			this.addNode(t), this.lastNode = t;
		}
		oncommentend() {
			this.lastNode = null;
		}
		oncdatastart() {
			let e = new $e(""), t = new rt([e]);
			this.addNode(t), e.parent = t, this.lastNode = e;
		}
		oncdataend() {
			this.lastNode = null;
		}
		onprocessinginstruction(e, t) {
			let n = new tt(e, t);
			this.addNode(n);
		}
		handleCallback(e) {
			if (typeof this.callback == "function") this.callback(e, this.dom);
			else if (e) throw e;
		}
		addNode(e) {
			let t = this.tagStack[this.tagStack.length - 1], n = t.children[t.children.length - 1];
			this.options.withStartIndices && this.parser && (e.startIndex = this.parser.startIndex), this.options.withEndIndices && this.parser && (e.endIndex = this.parser.endIndex), t.children.push(e), n && (e.prev = n, n.next = e), e.parent = t, this.lastNode = null;
		}
	};
}));
// node_modules/domutils/dist/querying.js
function ut(e, t, n = !0, r = Infinity) {
	return dt(e, Array.isArray(t) ? t : [t], n, r);
}
function dt(e, t, n, r) {
	let i = [], a = [Array.isArray(t) ? t : [t]], o = [0];
	for (;;) {
		if (o[0] >= a[0].length) {
			if (o.length === 1) return i;
			a.shift(), o.shift();
			continue;
		}
		let t = a[0][o[0]++];
		if (e(t) && (i.push(t), --r <= 0)) return i;
		n && X(t) && t.children.length > 0 && (o.unshift(0), a.unshift(t.children));
	}
}
function ft(e, t, n = !0) {
	let r = Array.isArray(t) ? t : [t];
	for (let t of r) {
		if (Y(t) && e(t)) return t;
		if (n && X(t) && t.children.length > 0) {
			let n = ft(e, t.children, !0);
			if (n) return n;
		}
	}
	return null;
}
function pt(e, t) {
	return (Array.isArray(t) ? t : [t]).some((t) => Y(t) && e(t) || X(t) && pt(e, t.children));
}
function mt(e, t) {
	let n = [], r = [Array.isArray(t) ? t : [t]], i = [0];
	for (;;) {
		if (i[0] >= r[0].length) {
			if (r.length === 1) return n;
			r.shift(), i.shift();
			continue;
		}
		let t = r[0][i[0]++];
		Y(t) && e(t) && n.push(t), X(t) && t.children.length > 0 && (i.unshift(0), r.unshift(t.children));
	}
}
var ht = g((() => {
	lt();
}));
// node_modules/domutils/dist/legacy.js
function gt(e, t) {
	return typeof t == "function" ? (n) => Y(n) && t(n.attribs[e]) : (n) => Y(n) && n.attribs[e] === t;
}
function _t(e, t) {
	return (n) => e(n) || t(n);
}
function vt(e) {
	let t = Object.keys(e).map((t) => {
		let n = e[t];
		return Object.hasOwn(Tt, t) ? Tt[t](n) : gt(t, n);
	});
	return t.length === 0 ? null : t.reduce(_t);
}
function yt(e, t) {
	let n = vt(e);
	return !n || n(t);
}
function bt(e, t, n, r = Infinity) {
	let i = vt(e);
	return i ? ut(i, t, n, r) : [];
}
function xt(e, t, n = !0) {
	return Array.isArray(t) || (t = [t]), ft(gt("id", e), t, n);
}
function St(e, t, n = !0, r = Infinity) {
	return ut(Tt.tag_name(e), t, n, r);
}
function Ct(e, t, n = !0, r = Infinity) {
	return ut(gt("class", e), t, n, r);
}
function wt(e, t, n = !0, r = Infinity) {
	return ut(Tt.tag_type(e), t, n, r);
}
var Tt, Et = g((() => {
	lt(), ht(), Tt = {
		tag_name(e) {
			return typeof e == "function" ? (t) => Y(t) && e(t.name) : e === "*" ? Y : (t) => Y(t) && t.name === e;
		},
		tag_type(e) {
			return typeof e == "function" ? (t) => e(t.type) : (t) => t.type === e;
		},
		tag_contains(e) {
			return typeof e == "function" ? (t) => Ge(t) && e(t.data) : (t) => Ge(t) && t.data === e;
		}
	};
}));
// node_modules/entities/dist/escape.js
function Dt(e) {
	return e === 34 ? "&quot;" : e === 38 ? "&amp;" : e === 39 ? "&apos;" : e === 60 ? "&lt;" : e === 62 ? "&gt;" : "&nbsp;";
}
function Ot(e) {
	return e >= 128 || e >= 32 && e < 64 && (1342177476 >>> e & 1) == 1;
}
function kt(e) {
	let { length: t } = e, n, r = 0, i = 0;
	for (; i < t;) {
		let a = e.charCodeAt(i);
		if (!Ot(a)) {
			let n = Math.min(i + 32, t), r = i + 1;
			for (; r < n && !Ot(e.charCodeAt(r));) r++;
			if (r < n) {
				i = r;
				continue;
			}
			if (r >= t || (Nt.lastIndex = r, !Nt.test(e))) break;
			i = Nt.lastIndex - 1;
			continue;
		}
		if (n === void 0 ? n = e.substring(0, i) : r !== i && (n += e.substring(r, i)), a < 64) {
			n += Dt(a), r = i += 1;
			continue;
		}
		let o = e.codePointAt(i);
		n += `&#x${o.toString(16)};`, o !== a && i++, r = i += 1;
	}
	return n === void 0 ? e : (r < t && (n += e.substr(r)), n);
}
function At(e, t) {
	if (e.lastIndex = 0, !e.test(t)) return t;
	let n = "", r = 0;
	do {
		let i = e.lastIndex - 1;
		r !== i && (n += t.substring(r, i));
		let a = t.charCodeAt(i);
		n += Dt(a), r = i + 1;
	} while (e.test(t));
	return n + t.substring(r);
}
function jt(e) {
	return At(Pt, e);
}
function Mt(e) {
	return At(Ft, e);
}
var Nt, Pt, Ft, It = g((() => {
	Nt = /["&'<>\u0080-\uFFFF]/g, Pt = /["&\u{A0}]/gu, Ft = /[&<>\u{A0}]/gu;
})), Lt = g((() => {
	fe(), It();
})), Rt, zt, Bt = g((() => {
	Rt = new Map("altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath".split(" ").map((e) => [e.toLowerCase(), e])), zt = new Map("definitionURL attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits diffuseConstant edgeMode filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" ").map((e) => [e.toLowerCase(), e]));
}));
// node_modules/dom-serializer/dist/index.js
function Vt(e, t = {}) {
	let n = "length" in e ? e : [e], r = t.xmlMode ?? !1, i = "";
	for (let e = 0; e < n.length; e++) i += Ut(n[e], t, r);
	return i;
}
function Ht(e, t, n) {
	let r = "";
	for (let i = 0; i < e.length; i++) r += Ut(e[i], t, n);
	return r;
}
function Ut(e, t, n) {
	switch (e.type) {
		case Pe: return Ht(e.children, t, n);
		case Ie: return `<${e.data}>`;
		case Le: return `<!--${e.data}-->`;
		case Ve: return `<![CDATA[${e.children[0].data}]]>`;
		case Re:
		case ze:
		case Be: return Wt(e, t, n);
		case Fe: {
			let r = e, i = r.data || "";
			return (t.encodeEntities ?? t.decodeEntities) !== !1 && !(!n && r.parent && qt.has(r.parent.name)) ? n || t.encodeEntities !== "utf8" ? kt(i) : Mt(i) : i;
		}
	}
}
function Wt(e, t, n) {
	n === "foreign" && (e.name = Rt.get(e.name) ?? e.name, e.parent && Xt.has(e.parent.name) && (n = !1)), !n && Yt.has(e.name) && (n = "foreign");
	let { name: r, children: i } = e, a = !n && Jt.has(r), o = `<${r}${Kt(e.attribs, t, n)}`;
	return i.length === 0 && (n ? t.selfClosingTags !== !1 : t.selfClosingTags && a) ? o += n ? "/>" : " />" : (o += ">", i.length > 0 && (o += Ht(i, t, n)), a || (o += `</${r}>`)), o;
}
function Gt(e) {
	return e.replaceAll("\"", "&quot;");
}
function Kt(e, t, n) {
	if (!e) return "";
	let r = (t.encodeEntities ?? t.decodeEntities) === !1 ? Gt : n || t.encodeEntities !== "utf8" ? kt : jt, i = n === "foreign", a = !!(t.emptyAttrs ?? n), o = "";
	for (let t in e) {
		if (!Object.hasOwn(e, t)) continue;
		let n = e[t], s = i ? zt.get(t) ?? t : t;
		o += !a && (n == null || n === "") ? ` ${s}` : ` ${s}="${r(n == null ? "" : String(n))}"`;
	}
	return o;
}
var qt, Jt, Yt, Xt, Zt = g((() => {
	Ue(), Lt(), Bt(), qt = new Set("style script xmp iframe noembed noframes plaintext noscript".split(" ")), Jt = new Set("area base basefont br col command embed frame hr img input isindex keygen link meta param source track wbr".split(" ")), Yt = /* @__PURE__ */ new Set(["svg", "math"]), Xt = new Set("mi mo mn ms mtext annotation-xml foreignObject desc title".split(" "));
}));
// node_modules/domutils/dist/stringify.js
function Qt(e, t) {
	return Vt(e, t);
}
function $t(e, t) {
	return X(e) ? e.children.map((e) => Qt(e, t)).join("") : "";
}
function en(e) {
	return Array.isArray(e) ? e.map(en).join("") : Y(e) ? e.name === "br" ? "\n" : en(e.children) : We(e) ? en(e.children) : Ge(e) ? e.data : "";
}
function tn(e) {
	return Array.isArray(e) ? e.map(tn).join("") : X(e) && !Ke(e) ? tn(e.children) : Ge(e) ? e.data : "";
}
function nn(e) {
	return Array.isArray(e) ? e.map(nn).join("") : X(e) && (e.type === J.Tag || We(e)) ? nn(e.children) : Ge(e) ? e.data : "";
}
var rn = g((() => {
	Zt(), Ue(), lt();
}));
// node_modules/domutils/dist/feeds.js
function an(e) {
	let t = ln(dn, e);
	return t ? t.name === "feed" ? on(t) : sn(t) : null;
}
function on(e) {
	let t = e.children, n = {
		type: "atom",
		items: St("entry", t).map((e) => {
			let { children: t } = e, n = { media: cn(t) };
			Z(n, "id", "id", t), Z(n, "title", "title", t);
			let r = ln("link", t)?.attribs.href;
			r && (n.link = r);
			let i = un("summary", t) || un("content", t);
			i && (n.description = i);
			let a = un("updated", t);
			return a && (n.pubDate = new Date(a)), n;
		})
	};
	Z(n, "id", "id", t), Z(n, "title", "title", t);
	let r = ln("link", t)?.attribs.href;
	r && (n.link = r), Z(n, "description", "subtitle", t);
	let i = un("updated", t);
	return i && (n.updated = new Date(i)), Z(n, "author", "email", t, !0), n;
}
function sn(e) {
	let t = ln("channel", e.children)?.children ?? [], n = {
		type: e.name.substr(0, 3),
		id: "",
		items: St("item", e.children).map((e) => {
			let { children: t } = e, n = { media: cn(t) };
			Z(n, "id", "guid", t), Z(n, "title", "title", t), Z(n, "link", "link", t), Z(n, "description", "description", t);
			let r = un("pubDate", t) || un("dc:date", t);
			return r && (n.pubDate = new Date(r)), n;
		})
	};
	Z(n, "title", "title", t), Z(n, "link", "link", t), Z(n, "description", "description", t);
	let r = un("lastBuildDate", t);
	return r && (n.updated = new Date(r)), Z(n, "author", "managingEditor", t, !0), n;
}
function cn(e) {
	return St("media:content", e).map((e) => {
		let { attribs: t } = e, n = {
			medium: t.medium,
			isDefault: !!t.isDefault
		};
		for (let e of fn) t[e] && (n[e] = t[e]);
		for (let e of pn) t[e] && (n[e] = Number.parseInt(t[e], 10));
		return t.expression && (n.expression = t.expression), n;
	});
}
function ln(e, t) {
	return St(e, t, !0, 1)[0];
}
function un(e, t, n = !1) {
	return tn(St(e, t, n, 1)).trim();
}
function Z(e, t, n, r, i = !1) {
	let a = un(n, r, i);
	a && (e[t] = a);
}
function dn(e) {
	return e === "rss" || e === "feed" || e === "rdf:RDF";
}
var fn, pn, mn = g((() => {
	Et(), rn(), fn = [
		"url",
		"type",
		"lang"
	], pn = [
		"fileSize",
		"bitrate",
		"framerate",
		"samplingrate",
		"channels",
		"duration",
		"height",
		"width"
	];
}));
// node_modules/domutils/dist/helpers.js
function hn(e) {
	let t = e.length;
	for (; --t >= 0;) {
		let n = e[t];
		if (t > 0 && e.lastIndexOf(n, t - 1) >= 0) e.splice(t, 1);
		else for (let r = n.parent; r; r = r.parent) if (e.includes(r)) {
			e.splice(t, 1);
			break;
		}
	}
	return e;
}
function gn(e, t) {
	let n = [], r = [];
	if (e === t) return 0;
	let i = X(e) ? e : e.parent;
	for (; i;) n.unshift(i), i = i.parent;
	for (i = X(t) ? t : t.parent; i;) r.unshift(i), i = i.parent;
	let a = Math.min(n.length, r.length), o = 0;
	for (; o < a && n[o] === r[o];) o++;
	if (o === 0) return Q.DISCONNECTED;
	let s = n[o - 1], c = s.children, l = n[o], u = r[o];
	return c.indexOf(l) > c.indexOf(u) ? s === t ? Q.FOLLOWING | Q.CONTAINED_BY : Q.FOLLOWING : s === e ? Q.PRECEDING | Q.CONTAINS : Q.PRECEDING;
}
function _n(e) {
	return e = e.filter((e, t, n) => !n.includes(e, t + 1)), e.sort((e, t) => {
		let n = gn(e, t);
		return n & Q.PRECEDING ? -1 : n & Q.FOLLOWING ? 1 : 0;
	}), e;
}
var Q, vn = g((() => {
	lt(), (function(e) {
		e[e.DISCONNECTED = 1] = "DISCONNECTED", e[e.PRECEDING = 2] = "PRECEDING", e[e.FOLLOWING = 4] = "FOLLOWING", e[e.CONTAINS = 8] = "CONTAINS", e[e.CONTAINED_BY = 16] = "CONTAINED_BY";
	})(Q ||= {});
}));
// node_modules/domutils/dist/manipulation.js
function yn(e) {
	if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
		let t = e.parent.children, n = t.lastIndexOf(e);
		n !== -1 && t.splice(n, 1);
	}
	e.next = null, e.prev = null, e.parent = null;
}
function bn(e, t) {
	if (t.prev = e.prev, t.prev && (t.prev.next = t), t.next = e.next, t.next && (t.next.prev = t), t.parent = e.parent, t.parent) {
		let { children: n } = t.parent, r = n.lastIndexOf(e);
		if (r === -1) return;
		n[r] = t, e.parent = null;
	}
}
function xn(e, t) {
	if (yn(t), t.next = null, t.parent = e, e.children.push(t) > 1) {
		let n = e.children[e.children.length - 2];
		n.next = t, t.prev = n;
	} else t.prev = null;
}
function Sn(e, t) {
	yn(t);
	let { parent: n } = e, r = e.next;
	if (t.next = r, t.prev = e, e.next = t, t.parent = n, r) {
		if (r.prev = t, n) {
			let e = n.children;
			e.splice(e.lastIndexOf(r), 0, t);
		}
	} else n && n.children.push(t);
}
function Cn(e, t) {
	if (yn(t), t.parent = e, t.prev = null, e.children.unshift(t) === 1) t.next = null;
	else {
		let n = e.children[1];
		n.prev = t, t.next = n;
	}
}
function wn(e, t) {
	yn(t);
	let { parent: n } = e;
	if (n) {
		let r = n.children;
		r.splice(r.indexOf(e), 0, t);
	}
	e.prev && (e.prev.next = t), t.parent = n, t.prev = e.prev, t.next = e, e.prev = t;
}
var Tn = g((() => {}));
// node_modules/domutils/dist/traversal.js
function En(e) {
	return X(e) ? e.children : [];
}
function Dn(e) {
	return e.parent || null;
}
function On(e) {
	let t = Dn(e);
	if (t != null) return En(t);
	let n = [e], { prev: r, next: i } = e;
	for (; r != null;) n.unshift(r), {prev: r} = r;
	for (; i != null;) n.push(i), {next: i} = i;
	return n;
}
function kn(e, t) {
	let { attribs: n } = e;
	return n?.[t];
}
function An(e, t) {
	let { attribs: n } = e;
	return n != null && Object.hasOwn(n, t) && n[t] != null;
}
function jn(e) {
	return e.name;
}
function Mn(e) {
	let { next: t } = e;
	for (; t !== null && !Y(t);) ({next: t} = t);
	return t;
}
function Nn(e) {
	let { prev: t } = e;
	for (; t !== null && !Y(t);) ({prev: t} = t);
	return t;
}
var Pn = g((() => {
	lt();
})), Fn = /* @__PURE__ */ v({
	DocumentPosition: () => Q,
	append: () => Sn,
	appendChild: () => xn,
	compareDocumentPosition: () => gn,
	existsOne: () => pt,
	filter: () => ut,
	find: () => dt,
	findAll: () => mt,
	findOne: () => ft,
	getAttributeValue: () => kn,
	getChildren: () => En,
	getElementById: () => xt,
	getElements: () => bt,
	getElementsByClassName: () => Ct,
	getElementsByTagName: () => St,
	getElementsByTagType: () => wt,
	getFeed: () => an,
	getInnerHTML: () => $t,
	getName: () => jn,
	getOuterHTML: () => Qt,
	getParent: () => Dn,
	getSiblings: () => On,
	getText: () => en,
	hasAttrib: () => An,
	innerText: () => nn,
	nextElementSibling: () => Mn,
	prepend: () => wn,
	prependChild: () => Cn,
	prevElementSibling: () => Nn,
	removeElement: () => yn,
	removeSubsets: () => hn,
	replaceElement: () => bn,
	testElement: () => yt,
	textContent: () => tn,
	uniqueSort: () => _n
}), In = g((() => {
	mn(), vn(), Et(), Tn(), ht(), rn(), Pn();
})), Ln = /* @__PURE__ */ v({
	DefaultHandler: () => ct,
	DomHandler: () => ct,
	DomUtils: () => Fn,
	ElementType: () => Me,
	Parser: () => Ae,
	QuoteType: () => W,
	Tokenizer: () => he,
	createDocumentStream: () => zn,
	getFeed: () => an,
	parseDocument: () => Rn,
	parseFeed: () => Bn
});
function Rn(e, t) {
	let n = new ct(void 0, t);
	return new Ae(n, t).end(e), n.root;
}
function zn(e, t, n) {
	let r = new ct((t) => e(t, r.root), t, n);
	return new Ae(r, t);
}
function Bn(e, t = Vn) {
	return an(Rn(e, t).children);
}
var Vn, Hn = g((() => {
	je(), lt(), Ue(), ge(), In(), Vn = { xmlMode: !0 };
})), Un = /* @__PURE__ */ _(((e, t) => {
	t.exports = (e) => {
		if (typeof e != "string") throw TypeError("Expected a string");
		return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
	};
})), Wn = /* @__PURE__ */ _(((e) => {
	function t(e) {
		return Object.prototype.toString.call(e) === "[object Object]";
	}
	function n(e) {
		var n, r;
		return t(e) !== !1 && (n = e.constructor, n === void 0 || (r = n.prototype, t(r) !== !1 && r.hasOwnProperty("isPrototypeOf") !== !1));
	}
	e.isPlainObject = n;
})), Gn = /* @__PURE__ */ _(((e, t, n) => {
	(function(e, n) {
		typeof define == "function" && define.amd ? define([], n) : typeof t == "object" && t.exports ? t.exports = n() : e.parseSrcset = n();
	})(n, function() {
		return function(e) {
			function t(e) {
				return e === " " || e === "	" || e === "\n" || e === "\f" || e === "\r";
			}
			function n(t) {
				var n, r = t.exec(e.substring(h));
				if (r) return n = r[0], h += n.length, n;
			}
			for (var r = e.length, i = /^[ \t\n\r\u000c]+/, a = /^[, \t\n\r\u000c]+/, o = /^[^ \t\n\r\u000c]+/, s = /[,]+$/, c = /^\d+$/, l = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, u, d, f, p, m, h = 0, g = [];;) {
				if (n(a), h >= r) return g;
				u = n(o), d = [], u.slice(-1) === "," ? (u = u.replace(s, ""), v()) : _();
			}
			function _() {
				for (n(i), f = "", p = "in descriptor";;) {
					if (m = e.charAt(h), p === "in descriptor") {
						if (t(m)) f && (d.push(f), f = "", p = "after descriptor");
						else if (m === ",") {
							h += 1, f && d.push(f), v();
							return;
						} else if (m === "(") f += m, p = "in parens";
						else if (m === "") {
							f && d.push(f), v();
							return;
						} else f += m;
					} else if (p === "in parens") {
						if (m === ")") f += m, p = "in descriptor";
						else if (m === "") {
							d.push(f), v();
							return;
						} else f += m;
					} else if (p === "after descriptor" && !t(m)) {
						if (m === "") {
							v();
							return;
						}
						p = "in descriptor", --h;
					}
					h += 1;
				}
			}
			function v() {
				var t = !1, n, r, i, a, o = {}, s, f, p, m, h;
				for (a = 0; a < d.length; a++) s = d[a], f = s[s.length - 1], p = s.substring(0, s.length - 1), m = parseInt(p, 10), h = parseFloat(p), c.test(p) && f === "w" ? ((n || r) && (t = !0), m === 0 ? t = !0 : n = m) : l.test(p) && f === "x" ? ((n || r || i) && (t = !0), h < 0 ? t = !0 : r = h) : c.test(p) && f === "h" ? ((i || r) && (t = !0), m === 0 ? t = !0 : i = m) : t = !0;
				t ? console && console.log && console.log("Invalid srcset descriptor found in '" + e + "' at '" + s + "'.") : (o.url = u, n && (o.w = n), r && (o.d = r), i && (o.h = i), g.push(o));
			}
		};
	});
})), Kn = /* @__PURE__ */ _(((e, t) => {
	var n = String, r = function() {
		return {
			isColorSupported: !1,
			reset: n,
			bold: n,
			dim: n,
			italic: n,
			underline: n,
			inverse: n,
			hidden: n,
			strikethrough: n,
			black: n,
			red: n,
			green: n,
			yellow: n,
			blue: n,
			magenta: n,
			cyan: n,
			white: n,
			gray: n,
			bgBlack: n,
			bgRed: n,
			bgGreen: n,
			bgYellow: n,
			bgBlue: n,
			bgMagenta: n,
			bgCyan: n,
			bgWhite: n,
			blackBright: n,
			redBright: n,
			greenBright: n,
			yellowBright: n,
			blueBright: n,
			magentaBright: n,
			cyanBright: n,
			whiteBright: n,
			bgBlackBright: n,
			bgRedBright: n,
			bgGreenBright: n,
			bgYellowBright: n,
			bgBlueBright: n,
			bgMagentaBright: n,
			bgCyanBright: n,
			bgWhiteBright: n
		};
	};
	t.exports = r(), t.exports.createColors = r;
})), $ = /* @__PURE__ */ _(((e, t) => {
	t.exports = {};
})), qn = /* @__PURE__ */ _(((e, t) => {
	var n = Kn(), r = $(), i = class e extends Error {
		constructor(t, n, r, i, a, o) {
			super(t), this.name = "CssSyntaxError", this.reason = t, a && (this.file = a), i && (this.source = i), o && (this.plugin = o), n !== void 0 && r !== void 0 && (typeof n == "number" ? (this.line = n, this.column = r) : (this.line = n.line, this.column = n.column, this.endLine = r.line, this.endColumn = r.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, e);
		}
		setMessage() {
			this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", this.line !== void 0 && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
		}
		showSourceCode(e) {
			if (!this.source) return "";
			let t = this.source;
			e ??= n.isColorSupported;
			let i = (e) => e, a = (e) => e, o = (e) => e;
			if (e) {
				let { bold: e, gray: t, red: s } = n.createColors(!0);
				a = (t) => e(s(t)), i = (e) => t(e), r && (o = (e) => r(e));
			}
			let s = t.split(/\r?\n/), c = Math.max(this.line - 3, 0), l = Math.min(this.line + 2, s.length), u = String(l).length;
			return s.slice(c, l).map((e, t) => {
				let n = c + 1 + t, r = " " + (" " + n).slice(-u) + " | ";
				if (n === this.line) {
					if (e.length > 160) {
						let t = Math.max(0, this.column - 20), n = Math.max(this.column + 20, this.endColumn + 20), s = e.slice(t, n), c = i(r.replace(/\d/g, " ")) + e.slice(0, Math.min(this.column - 1, 19)).replace(/[^\t]/g, " ");
						return a(">") + i(r) + o(s) + "\n " + c + a("^");
					}
					let t = i(r.replace(/\d/g, " ")) + e.slice(0, this.column - 1).replace(/[^\t]/g, " ");
					return a(">") + i(r) + o(e) + "\n " + t + a("^");
				}
				return " " + i(r) + o(e);
			}).join("\n");
		}
		toString() {
			let e = this.showSourceCode();
			return e &&= "\n\n" + e + "\n", this.name + ": " + this.message + e;
		}
	};
	t.exports = i, i.default = i;
})), Jn = /* @__PURE__ */ _(((e, t) => {
	var n = /[\t\n\f\r "#'()/;[\\\]{}]/, r = {
		after: "\n",
		beforeClose: "\n",
		beforeComment: "\n",
		beforeDecl: "\n",
		beforeOpen: " ",
		beforeRule: "\n",
		colon: ": ",
		commentLeft: " ",
		commentRight: " ",
		emptyBody: "",
		indent: "    ",
		semicolon: !1
	};
	function i(e) {
		return e[0].toUpperCase() + e.slice(1);
	}
	function a(e, t) {
		let r = "@" + t.name, i = t.params ? e.rawValue(t, "params") : "", a = t.raws.afterName;
		return a === void 0 ? a = i ? " " : "" : a === "" && i && !n.test(i[0]) && (a = " "), r + a + i;
	}
	function o(e) {
		if (!e.prop.startsWith("--")) return !1;
		let t = e.raws.before;
		return t === void 0 || !/[^\s;]$/.test(t);
	}
	function s(e, t, n) {
		let r = n.nodes, i = r.length - 1;
		for (; i > 0 && r[i].type === "comment";) --i;
		let a = e.raw(n, "semicolon"), s = n.type === "document";
		for (let e = r.length - 1; e >= 0; e--) {
			let n = r[e], c = i !== e || a;
			!c && e < r.length - 1 && (n.type === "atrule" && !n.nodes || n.type === "decl" && o(n)) && (c = !0), t.push({
				document: s,
				node: n,
				semicolon: c
			});
		}
	}
	function c(e, t, n, r) {
		let i = e.raw(n, "between", "beforeOpen");
		e.builder(r + i + "{", n, "start");
		let a = n.nodes && n.nodes.length, o = () => {
			let t = a ? e.raw(n, "after") : e.raw(n, "after", "emptyBody");
			t && e.builder(t), e.builder("}", n, "end"), n.type === "rule" && n.raws.ownSemicolon && e.builder(n.raws.ownSemicolon, n, "end");
		};
		a ? (t.push(o), s(e, t, n)) : o();
	}
	var l = class e {
		constructor(e) {
			this.builder = e;
		}
		atrule(e, t) {
			let n = a(this, e);
			if (e.nodes) this.block(e, n);
			else {
				let r = (e.raws.between || "") + (t ? ";" : "");
				this.builder(n + r, e);
			}
		}
		beforeAfter(e, t) {
			let n;
			n = e.type === "decl" ? this.raw(e, null, "beforeDecl") : e.type === "comment" ? this.raw(e, null, "beforeComment") : t === "before" ? this.raw(e, null, "beforeRule") : this.raw(e, null, "beforeClose");
			let r = e.parent, i = 0;
			for (; r && r.type !== "root";) i += 1, r = r.parent;
			if (n.includes("\n")) {
				let t = this.raw(e, null, "indent");
				if (t.length) for (let e = 0; e < i; e++) n += t;
			}
			return n;
		}
		block(e, t) {
			let n = this.raw(e, "between", "beforeOpen");
			this.builder(t + n + "{", e, "start");
			let r;
			e.nodes && e.nodes.length ? (this.body(e), r = this.raw(e, "after")) : r = this.raw(e, "after", "emptyBody"), r && this.builder(r), this.builder("}", e, "end");
		}
		body(t) {
			let n = e.prototype, r = [
				"atrule",
				"block",
				"body",
				"rule",
				"stringify"
			].every((e) => this[e] === n[e]), i = [];
			for (s(this, i, t); i.length > 0;) {
				let e = i.pop();
				if (typeof e == "function") {
					e();
					continue;
				}
				let t = e.node, n = this.raw(t, "before");
				n && this.builder(n), r && t.type === "rule" ? c(this, i, t, this.rawValue(t, "selector")) : r && t.type === "atrule" && t.nodes ? c(this, i, t, a(this, t)) : this.stringify(t, e.semicolon);
			}
		}
		comment(e) {
			let t = this.raw(e, "left", "commentLeft"), n = this.raw(e, "right", "commentRight");
			this.builder("/*" + t + e.text + n + "*/", e);
		}
		decl(e, t) {
			let n = e.raws, r = this.raw(e, "between", "colon"), i = e.prop + r + this.rawValue(e, "value");
			e.important && (i += n.important || " !important"), t && (i += ";"), this.builder(i, e);
		}
		document(e) {
			this.body(e);
		}
		raw(e, t, n) {
			let a;
			if (n ||= t, t && (a = e.raws[t], a !== void 0)) return a;
			let o = e.parent;
			if (n === "before" && (!o || o.type === "root" && o.first === e || o && o.type === "document")) return "";
			if (!o) return r[n];
			let s = e.root(), c = s.rawCache ||= {};
			if (c[n] !== void 0) return c[n];
			if (n === "before" || n === "after") return this.beforeAfter(e, n);
			{
				let r = "raw" + i(n);
				this[r] ? a = this[r](s, e) : s.walk((e) => {
					if (a = e.raws[t], a !== void 0) return !1;
				});
			}
			return a === void 0 && (a = r[n]), c[n] = a, a;
		}
		rawBeforeClose(e) {
			let t;
			return e.walk((e) => {
				if (e.nodes && e.nodes.length > 0 && e.raws.after !== void 0) return t = e.raws.after, t.includes("\n") && (t = t.replace(/[^\n]+$/, "")), !1;
			}), t &&= t.replace(/\S/g, ""), t;
		}
		rawBeforeComment(e, t) {
			let n;
			return e.walkComments((e) => {
				if (e.raws.before !== void 0) return n = e.raws.before, n.includes("\n") && (n = n.replace(/[^\n]+$/, "")), !1;
			}), n === void 0 ? n = this.raw(t, null, "beforeDecl") : n &&= n.replace(/\S/g, ""), n;
		}
		rawBeforeDecl(e, t) {
			let n;
			return e.walkDecls((e) => {
				if (e.raws.before !== void 0) return n = e.raws.before, n.includes("\n") && (n = n.replace(/[^\n]+$/, "")), !1;
			}), n === void 0 ? n = this.raw(t, null, "beforeRule") : n &&= n.replace(/\S/g, ""), n;
		}
		rawBeforeOpen(e) {
			let t;
			return e.walk((e) => {
				if (e.type !== "decl" && (t = e.raws.between, t !== void 0)) return !1;
			}), t;
		}
		rawBeforeRule(e) {
			let t;
			return e.walk((n) => {
				if (n.nodes && (n.parent !== e || e.first !== n) && n.raws.before !== void 0) return t = n.raws.before, t.includes("\n") && (t = t.replace(/[^\n]+$/, "")), !1;
			}), t &&= t.replace(/\S/g, ""), t;
		}
		rawColon(e) {
			let t;
			return e.walkDecls((e) => {
				if (e.raws.between !== void 0) return t = e.raws.between.replace(/[^\s:]/g, ""), !1;
			}), t;
		}
		rawEmptyBody(e) {
			let t;
			return e.walk((e) => {
				if (e.nodes && e.nodes.length === 0 && (t = e.raws.after, t !== void 0)) return !1;
			}), t;
		}
		rawIndent(e) {
			if (e.raws.indent) return e.raws.indent;
			let t;
			return e.walk((n) => {
				let r = n.parent;
				if (r && r !== e && r.parent && r.parent === e && n.raws.before !== void 0) {
					let e = n.raws.before.split("\n");
					return t = e[e.length - 1], t = t.replace(/\S/g, ""), !1;
				}
			}), t;
		}
		rawSemicolon(e) {
			let t;
			return e.walk((e) => {
				if (e.nodes && e.nodes.length && e.last.type === "decl" && (t = e.raws.semicolon, t !== void 0)) return !1;
			}), t;
		}
		rawValue(e, t) {
			let n = e[t], r = e.raws[t];
			return r && r.value === n ? r.raw : n;
		}
		root(e) {
			!(e.parent && e.parent.type === "document") && e.source && e.source.input.hasBOM && this.builder("﻿", e, "start"), this.body(e), e.raws.after && this.builder(e.raws.after);
		}
		rule(e) {
			this.block(e, this.rawValue(e, "selector")), e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
		}
		stringify(e, t) {
			/* c8 ignore start */
			if (!this[e.type]) throw Error("Unknown AST node type " + e.type + ". Maybe you need to change PostCSS stringifier.");
			/* c8 ignore stop */
			this[e.type](e, t);
		}
	};
	t.exports = l, l.default = l;
})), Yn = /* @__PURE__ */ _(((e, t) => {
	var n = Jn(), r = /(<)(\/?style\b)/gi, i = /(<)(!--)/g;
	function a(e) {
		return e.includes("<") ? e.replace(r, "\\3c $2").replace(i, "\\3c $2") : e;
	}
	function o(e, t, n) {
		let r = [], i = 0, a = 0;
		for (let o = 0; o < e.length; o += 3) {
			let s = a, c = i + e[o].length;
			for (; i < c;) t[i] === n[a] ? (i += 1, a += 1) : (i += 1, a += 4);
			r.push(n.slice(s, a));
		}
		return r;
	}
	var s = class extends n {
		escapeHTML(e) {
			let t = this.builder, n, r;
			if (this.builder = (e, i, a) => {
				n ? (r += e, n.push(e, i, a)) : e.includes("<") ? (r = e, n = [
					e,
					i,
					a
				]) : t(e, i, a);
			}, e(), this.builder = t, !n) return;
			let i = a(r);
			if (i === r) for (let e = 0; e < n.length; e += 3) t(n[e], n[e + 1], n[e + 2]);
			else {
				let e = o(n, r, i);
				for (let r = 0; r < n.length; r += 3) t(e[r / 3], n[r + 1], n[r + 2]);
			}
		}
		root(e) {
			e.parent && e.parent.type === "document" ? (this.escapeHTML(() => this.body(e)), e.raws.after && this.builder(e.raws.after)) : this.escapeHTML(() => super.root(e));
		}
	};
	function c(e, t) {
		let n = new s(t);
		e.type === "root" || e.type === "document" ? n.stringify(e) : n.escapeHTML(() => n.stringify(e));
	}
	t.exports = c, c.default = c;
})), Xn = /* @__PURE__ */ _(((e, t) => {
	t.exports.isClean = Symbol("isClean"), t.exports.my = Symbol("my");
})), Zn = /* @__PURE__ */ _(((e, t) => {
	var n = qn(), r = Jn(), i = Yn(), { isClean: a, my: o } = Xn();
	function s(e, t) {
		let n = new e.constructor(), r = [[
			e,
			n,
			t
		]];
		for (; r.length > 0;) {
			let [e, t, n] = r.pop();
			for (let i in e) {
				if (!Object.prototype.hasOwnProperty.call(e, i) || i === "proxyCache") continue;
				let a = e[i], o = typeof a;
				if (i === "parent" && o === "object") n && (t[i] = n);
				else if (i === "source") t[i] = a;
				else if (Array.isArray(a)) {
					let e = [];
					t[i] = e;
					for (let n of a) {
						let i = new n.constructor();
						e.push(i), r.push([
							n,
							i,
							t
						]);
					}
				} else {
					if (o === "object" && a !== null) {
						let e = new a.constructor();
						r.push([
							a,
							e,
							void 0
						]), a = e;
					}
					t[i] = a;
				}
			}
		}
		return n;
	}
	function c(e, t) {
		if (t && t.offset !== void 0) return t.offset;
		let n = 1, r = 1, i = 0;
		for (let a = 0; a < e.length; a++) {
			if (r === t.line && n === t.column) {
				i = a;
				break;
			}
			e[a] === "\n" ? (n = 1, r += 1) : n += 1;
		}
		return i;
	}
	var l = class e {
		get proxyOf() {
			return this;
		}
		constructor(e = {}) {
			this.raws = {}, this[a] = !1, this[o] = !0;
			for (let t of Object.keys(e)) if (t !== "__proto__") {
				if (t === "nodes") {
					this.nodes = [];
					for (let n of e[t]) typeof n.clone == "function" && n.parent ? this.append(n.clone()) : this.append(n);
				} else this[t] = e[t];
			}
		}
		addToError(e) {
			if (e.postcssNode = this, e.stack && this.source && /\n\s{4}at /.test(e.stack)) {
				let t = this.source;
				e.stack = e.stack.replace(/\n\s{4}at /, `$&${t.input.from}:${t.start.line}:${t.start.column}$&`);
			}
			return e;
		}
		after(e) {
			return this.parent.insertAfter(this, e), this;
		}
		assign(e = {}) {
			for (let t in e) this[t] = e[t];
			return this;
		}
		before(e) {
			return this.parent.insertBefore(this, e), this;
		}
		cleanRaws(e) {
			delete this.raws.before, delete this.raws.after, e || delete this.raws.between;
		}
		clone(e = {}) {
			let t = s(this);
			for (let n in e) t[n] = e[n];
			return t;
		}
		cloneAfter(e = {}) {
			let t = this.clone(e);
			return this.parent.insertAfter(this, t), t;
		}
		cloneBefore(e = {}) {
			let t = this.clone(e);
			return this.parent.insertBefore(this, t), t;
		}
		error(e, t = {}) {
			if (this.source) {
				let { end: n, start: r } = this.rangeBy(t);
				return this.source.input.error(e, {
					column: r.column,
					line: r.line
				}, {
					column: n.column,
					line: n.line
				}, t);
			}
			return new n(e);
		}
		getProxyProcessor() {
			return {
				get(e, t) {
					return t === "proxyOf" ? e : t === "root" ? () => e.root().toProxy() : e[t];
				},
				set(e, t, n) {
					return e[t] === n || (e[t] = n, (t === "prop" || t === "value" || t === "name" || t === "params" || t === "important" || 
					/* c8 ignore next */
					t === "text") && e.markDirty()), !0;
				}
			};
		}
		/* c8 ignore next 3 */
		markClean() {
			this[a] = !0;
		}
		markDirty() {
			if (this[a]) {
				this[a] = !1;
				let e = this;
				for (; e = e.parent;) e[a] = !1;
			}
		}
		next() {
			if (!this.parent) return;
			let e = this.parent.index(this);
			return this.parent.nodes[e + 1];
		}
		positionBy(e = {}) {
			let t = "document" in this.source.input ? this.source.input.document : this.source.input.css, n = {
				column: this.source.start.column,
				line: this.source.start.line,
				offset: c(t, this.source.start)
			};
			if (e.index) n = this.positionInside(e.index);
			else if (e.word) {
				let r = t.slice(c(t, this.source.start), c(t, this.source.end)).indexOf(e.word);
				r !== -1 && (n = this.positionInside(r));
			}
			return n;
		}
		positionInside(e) {
			let t = this.source.start.column, n = this.source.start.line, r = "document" in this.source.input ? this.source.input.document : this.source.input.css, i = c(r, this.source.start), a = i + e;
			for (let e = i; e < a; e++) r[e] === "\n" ? (t = 1, n += 1) : t += 1;
			return {
				column: t,
				line: n,
				offset: a
			};
		}
		prev() {
			if (!this.parent) return;
			let e = this.parent.index(this);
			return this.parent.nodes[e - 1];
		}
		rangeBy(e = {}) {
			let t = "document" in this.source.input ? this.source.input.document : this.source.input.css, n = {
				column: this.source.start.column,
				line: this.source.start.line,
				offset: c(t, this.source.start)
			}, r = this.source.end ? {
				column: this.source.end.column + 1,
				line: this.source.end.line,
				offset: typeof this.source.end.offset == "number" ? this.source.end.offset : c(t, this.source.end) + 1
			} : {
				column: n.column + 1,
				line: n.line,
				offset: n.offset + 1
			};
			if (e.word) {
				let i = t.slice(c(t, this.source.start), c(t, this.source.end)).indexOf(e.word);
				i !== -1 && (n = this.positionInside(i), r = this.positionInside(i + e.word.length));
			} else e.start ? n = {
				column: e.start.column,
				line: e.start.line,
				offset: c(t, e.start)
			} : typeof e.index == "number" && (n = this.positionInside(e.index)), e.end ? r = {
				column: e.end.column,
				line: e.end.line,
				offset: c(t, e.end)
			} : typeof e.endIndex == "number" ? r = this.positionInside(e.endIndex) : typeof e.index == "number" && (r = this.positionInside(e.index + 1));
			return (r.line < n.line || r.line === n.line && r.column <= n.column) && (r = {
				column: n.column + 1,
				line: n.line,
				offset: n.offset + 1
			}), {
				end: r,
				start: n
			};
		}
		raw(e, t) {
			return new r().raw(this, e, t);
		}
		remove() {
			return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
		}
		replaceWith(...e) {
			if (this.parent) {
				let t = this, n = !1;
				for (let r of e) r === this ? n = !0 : n ? (this.parent.insertAfter(t, r), t = r) : this.parent.insertBefore(t, r);
				n || this.remove();
			}
			return this;
		}
		root() {
			let e = this;
			for (; e.parent && e.parent.type !== "document";) e = e.parent;
			return e;
		}
		toJSON(t, n) {
			let r = n == null;
			n ||= /* @__PURE__ */ new Map();
			let i = [], a = [[
				this,
				i,
				0
			]];
			for (let t = 0; t < a.length; t++) {
				let [r, i, o] = a[t], s = {};
				i[o] = s;
				for (let t in r) {
					if (!Object.prototype.hasOwnProperty.call(r, t) || t === "parent" || t === "proxyCache") continue;
					let i = r[t];
					if (Array.isArray(i)) {
						let r = [];
						s[t] = r;
						for (let t = 0; t < i.length; t++) {
							let o = i[t];
							typeof o == "object" && o.toJSON ? o.toJSON === e.prototype.toJSON ? a.push([
								o,
								r,
								t
							]) : r[t] = o.toJSON(null, n) : r[t] = o;
						}
					} else if (typeof i == "object" && i.toJSON) i.toJSON === e.prototype.toJSON ? a.push([
						i,
						s,
						t
					]) : s[t] = i.toJSON(null, n);
					else if (t === "source") {
						if (i == null) continue;
						let e = n.get(i.input);
						e ?? (e = n.size, n.set(i.input, e)), s[t] = {
							end: i.end,
							inputId: e,
							start: i.start
						};
					} else s[t] = i;
				}
			}
			let o = i[0];
			return r && (o.inputs = [...n.keys()].map((e) => e.toJSON())), o;
		}
		toProxy() {
			return this.proxyCache ||= new Proxy(this, this.getProxyProcessor()), this.proxyCache;
		}
		toString(e = i) {
			e.stringify && (e = e.stringify);
			let t = "";
			return e(this, (e) => {
				t += e;
			}), t;
		}
		warn(e, t, n = {}) {
			let r = { node: this };
			for (let e in n) r[e] = n[e];
			return e.warn(t, r);
		}
	};
	t.exports = l, l.default = l;
})), Qn = /* @__PURE__ */ _(((e, t) => {
	var n = Zn(), r = class extends n {
		constructor(e) {
			super(e), this.type = "comment";
		}
	};
	t.exports = r, r.default = r;
})), $n = /* @__PURE__ */ _(((e, t) => {
	var n = Zn(), r = class extends n {
		get variable() {
			return this.prop.startsWith("--") || this.prop[0] === "$";
		}
		constructor(e) {
			e && e.value !== void 0 && typeof e.value != "string" && (e = {
				...e,
				value: String(e.value)
			}), super(e), this.type = "decl";
		}
	};
	t.exports = r, r.default = r;
})), er = /* @__PURE__ */ _(((e, t) => {
	var n = Qn(), r = $n(), i = Zn(), { isClean: a, my: o } = Xn(), s, c, l, u;
	function d(e) {
		let t = e.slice();
		for (; t.length > 0;) {
			let e = t.pop();
			if (delete e.source, e.nodes) {
				e.nodes = e.nodes.slice();
				for (let n of e.nodes) t.push(n);
			}
		}
		return e.slice();
	}
	function f(e) {
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e[a] = !1, e.proxyOf.nodes) for (let n of e.proxyOf.nodes) t.push(n);
		}
	}
	var p = class e extends i {
		get first() {
			if (this.proxyOf.nodes) return this.proxyOf.nodes[0];
		}
		get last() {
			if (this.proxyOf.nodes) return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
		}
		append(...e) {
			for (let t of e) {
				let e = this.normalize(t, this.last);
				for (let t of e) this.proxyOf.nodes.push(t);
			}
			return this.markDirty(), this;
		}
		cleanRaws(t) {
			let n = [this];
			for (; n.length > 0;) {
				let r = n.pop();
				if (r !== this && r.cleanRaws !== e.prototype.cleanRaws) r.cleanRaws(t);
				else if (i.prototype.cleanRaws.call(r, t), r.nodes) for (let e of r.nodes) n.push(e);
			}
		}
		each(e) {
			if (!this.proxyOf.nodes) return;
			let t = this.getIterator(), n, r;
			for (; this.indexes[t] < this.proxyOf.nodes.length && (n = this.indexes[t], r = e(this.proxyOf.nodes[n], n), r !== !1);) this.indexes[t] += 1;
			return delete this.indexes[t], r;
		}
		every(e) {
			return this.nodes.every(e);
		}
		getIterator() {
			this.lastEach ||= 0, this.indexes ||= {}, this.lastEach += 1;
			let e = this.lastEach;
			return this.indexes[e] = 0, e;
		}
		getProxyProcessor() {
			return {
				get(e, t) {
					return t === "proxyOf" ? e : e[t] ? t === "each" || typeof t == "string" && t.startsWith("walk") ? (...n) => e[t](...n.map((e) => typeof e == "function" ? (t, n) => e(t.toProxy(), n) : e)) : t === "every" || t === "some" ? (n) => e[t]((e, ...t) => n(e.toProxy(), ...t)) : t === "root" ? () => e.root().toProxy() : t === "nodes" ? e.nodes.map((e) => e.toProxy()) : t === "first" || t === "last" ? e[t].toProxy() : e[t] : e[t];
				},
				set(e, t, n) {
					return e[t] === n || (e[t] = n, (t === "name" || t === "params" || t === "selector") && e.markDirty()), !0;
				}
			};
		}
		index(e) {
			return typeof e == "number" ? e : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
		}
		insertAfter(e, t) {
			let n = this.index(e), r = this.normalize(t, this.proxyOf.nodes[n]).reverse();
			n = this.index(e);
			for (let e of r) this.proxyOf.nodes.splice(n + 1, 0, e);
			let i;
			for (let e in this.indexes) i = this.indexes[e], n < i && (this.indexes[e] = i + r.length);
			return this.markDirty(), this;
		}
		insertBefore(e, t) {
			let n = this.index(e), r = n === 0 && "prepend", i = this.normalize(t, this.proxyOf.nodes[n], r).reverse();
			n = this.index(e);
			for (let e of i) this.proxyOf.nodes.splice(n, 0, e);
			let a;
			for (let e in this.indexes) a = this.indexes[e], n <= a && (this.indexes[e] = a + i.length);
			return this.markDirty(), this;
		}
		normalize(t, i) {
			if (typeof t == "string") t = d(c(t).nodes);
			else if (t === void 0) t = [];
			else if (Array.isArray(t)) {
				t = t.slice(0);
				for (let e of t) e.parent && e.parent.removeChild(e, "ignore");
			} else if (t.type === "root" && this.type !== "document") {
				t = t.nodes.slice(0);
				for (let e of t) e.parent && e.parent.removeChild(e, "ignore");
			} else if (t.type) t = [t];
			else if (t.prop) {
				if (t.value === void 0) throw Error("Value field is missed in node creation");
				typeof t.value != "string" && (t.value = String(t.value)), t = [new r(t)];
			} else if (t.selector || t.selectors) t = [new u(t)];
			else if (t.name) t = [new s(t)];
			else if (t.text) t = [new n(t)];
			else throw Error("Unknown node type in node creation");
			return t.map((t) => (t[o] || e.rebuild(t), t = t.proxyOf, t.parent && t.parent.removeChild(t), t[a] && f(t), t.raws || (t.raws = {}), t.raws.before === void 0 && i && i.raws.before !== void 0 && (t.raws.before = i.raws.before.replace(/\S/g, "")), t.parent = this.proxyOf, t));
		}
		prepend(...e) {
			e = e.reverse();
			for (let t of e) {
				let e = this.normalize(t, this.first, "prepend").reverse();
				for (let t of e) this.proxyOf.nodes.unshift(t);
				for (let t in this.indexes) this.indexes[t] = this.indexes[t] + e.length;
			}
			return this.markDirty(), this;
		}
		push(e) {
			return e.parent = this, this.proxyOf.nodes.push(e), this;
		}
		removeAll() {
			for (let e of this.proxyOf.nodes) e.parent = void 0;
			return this.proxyOf.nodes = [], this.markDirty(), this;
		}
		removeChild(e) {
			e = this.index(e), this.proxyOf.nodes[e].parent = void 0, this.proxyOf.nodes.splice(e, 1);
			let t;
			for (let n in this.indexes) t = this.indexes[n], t >= e && (this.indexes[n] = t - 1);
			return this.markDirty(), this;
		}
		replaceValues(e, t, n) {
			return n || (n = t, t = {}), this.walkDecls((r) => {
				t.props && !t.props.includes(r.prop) || t.fast && !r.value.includes(t.fast) || (r.value = r.value.replace(e, n));
			}), this.markDirty(), this;
		}
		some(e) {
			return this.nodes.some(e);
		}
		walk(e) {
			if (!this.proxyOf.nodes) return;
			let t = [{
				iterator: this.getIterator(),
				node: this.proxyOf
			}];
			for (; t.length > 0;) {
				let { iterator: n, node: r } = t[t.length - 1], i = r.indexes[n];
				if (i >= r.proxyOf.nodes.length) {
					delete r.indexes[n], t.pop();
					let e = t[t.length - 1];
					e && (e.node.indexes[e.iterator] += 1);
					continue;
				}
				let a = r.proxyOf.nodes[i], o;
				try {
					o = e(a, i);
				} catch (e) {
					throw a.addToError(e);
				}
				if (o === !1) {
					for (let e of t) delete e.node.indexes[e.iterator];
					return !1;
				}
				a.walk && a.proxyOf.nodes ? t.push({
					iterator: a.getIterator(),
					node: a
				}) : r.indexes[n] += 1;
			}
		}
		walkAtRules(e, t) {
			return t ? e instanceof RegExp ? this.walk((n, r) => {
				if (n.type === "atrule" && e.test(n.name)) return t(n, r);
			}) : this.walk((n, r) => {
				if (n.type === "atrule" && n.name === e) return t(n, r);
			}) : (t = e, this.walk((e, n) => {
				if (e.type === "atrule") return t(e, n);
			}));
		}
		walkComments(e) {
			return this.walk((t, n) => {
				if (t.type === "comment") return e(t, n);
			});
		}
		walkDecls(e, t) {
			return t ? e instanceof RegExp ? this.walk((n, r) => {
				if (n.type === "decl" && e.test(n.prop)) return t(n, r);
			}) : this.walk((n, r) => {
				if (n.type === "decl" && n.prop === e) return t(n, r);
			}) : (t = e, this.walk((e, n) => {
				if (e.type === "decl") return t(e, n);
			}));
		}
		walkRules(e, t) {
			return t ? e instanceof RegExp ? this.walk((n, r) => {
				if (n.type === "rule" && e.test(n.selector)) return t(n, r);
			}) : this.walk((n, r) => {
				if (n.type === "rule" && n.selector === e) return t(n, r);
			}) : (t = e, this.walk((e, n) => {
				if (e.type === "rule") return t(e, n);
			}));
		}
	};
	/* c8 ignore start */
	p.registerParse = (e) => {
		c = e;
	}, p.registerRule = (e) => {
		u = e;
	}, p.registerAtRule = (e) => {
		s = e;
	}, p.registerRoot = (e) => {
		l = e;
	}, t.exports = p, p.default = p, p.rebuild = (e) => {
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.type === "atrule" ? Object.setPrototypeOf(e, s.prototype) : e.type === "rule" ? Object.setPrototypeOf(e, u.prototype) : e.type === "decl" ? Object.setPrototypeOf(e, r.prototype) : e.type === "comment" ? Object.setPrototypeOf(e, n.prototype) : e.type === "root" && Object.setPrototypeOf(e, l.prototype), e[o] = !0, e.nodes) for (let n of e.nodes) t.push(n);
		}
	};
})), tr = /* @__PURE__ */ _(((e, t) => {
	var n = er(), r = class extends n {
		constructor(e) {
			super(e), this.type = "atrule";
		}
		append(...e) {
			return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
		}
		prepend(...e) {
			return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
		}
	};
	t.exports = r, r.default = r, n.registerAtRule(r);
})), nr = /* @__PURE__ */ _(((e, t) => {
	var n = er(), r, i, a = class extends n {
		constructor(e) {
			super({
				type: "document",
				...e
			}), this.nodes ||= [];
		}
		toResult(e = {}) {
			return new r(new i(), this, e).stringify();
		}
	};
	a.registerLazyResult = (e) => {
		r = e;
	}, a.registerProcessor = (e) => {
		i = e;
	}, t.exports = a, a.default = a;
})), rr = /* @__PURE__ */ _(((e, t) => {
	t.exports = {
		nanoid: (e = 21) => {
			let t = "", n = e | 0;
			for (; n-- > 0;) t += "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[Math.random() * 64 | 0];
			return t;
		},
		customAlphabet: (e, t = 21) => (n = t) => {
			let r = "", i = n | 0;
			for (; i-- > 0;) r += e[Math.random() * e.length | 0];
			return r;
		}
	};
})), ir = /* @__PURE__ */ _(((e, t) => {
	var { existsSync: n, readFileSync: r, realpathSync: i } = $(), { dirname: a, isAbsolute: o, join: s, relative: c, sep: l } = $(), { SourceMapConsumer: u, SourceMapGenerator: d } = $();
	function f(e) {
		try {
			return i(e);
		} catch {
			return e;
		}
	}
	function p(e) {
		/* c8 ignore next 2 */
		return Buffer ? Buffer.from(e, "base64").toString() : window.atob(e);
	}
	var m = class {
		constructor(e, t) {
			if (t.map === !1) return;
			t.unsafeMap && (this.unsafeMap = !0), this.loadAnnotation(e), this.inline = this.startWith(this.annotation, "data:");
			let n = t.map ? t.map.prev : void 0, r = this.loadMap(t.from, n);
			!this.mapFile && t.from && (this.mapFile = t.from), this.mapFile && (this.root = a(this.mapFile)), r && (this.text = r);
		}
		consumer() {
			return this.consumerCache ||= new u(this.json || this.text), this.consumerCache;
		}
		decodeInline(e) {
			let t = /^data:application\/json;charset=utf-?8;base64,/, n = /^data:application\/json;base64,/, r = e.match(/^data:application\/json;charset=utf-?8,/) || e.match(/^data:application\/json,/);
			if (r) return decodeURIComponent(e.substr(r[0].length));
			let i = e.match(t) || e.match(n);
			if (i) return p(e.substr(i[0].length));
			let a = e.slice(22);
			throw a = a.slice(0, a.indexOf(",")), Error("Unsupported source map encoding " + a);
		}
		getAnnotationURL(e) {
			return e.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
		}
		isMap(e) {
			return typeof e == "object" ? typeof e.mappings == "string" || typeof e._mappings == "string" || Array.isArray(e.sections) : !1;
		}
		loadAnnotation(e) {
			let t = e.match(/\/\*\s*# sourceMappingURL=/g);
			if (!t) return;
			let n = e.lastIndexOf(t.pop()), r = e.indexOf("*/", n);
			n > -1 && r > -1 && (this.annotation = this.getAnnotationURL(e.substring(n, r)));
		}
		loadFile(e, t, i) {
			if (!i && !this.unsafeMap) {
				if (!/\.map$/i.test(e) || !t) return;
				let n = c(f(a(t)), f(e));
				if (n === ".." || n.startsWith(".." + l) || o(n)) return;
			}
			if (this.root = a(e), n(e)) return this.mapFile = e, r(e, "utf-8").toString().trim();
		}
		loadMap(e, t) {
			if (t === !1) return !1;
			if (t) {
				if (typeof t == "string") return t;
				if (typeof t == "function") {
					let n = t(e);
					if (n) {
						let t = this.loadFile(n, e, !0);
						if (!t) throw Error("Unable to load previous source map: " + n.toString());
						return t;
					}
				} else if (t instanceof u) return d.fromSourceMap(t).toString();
				else if (t instanceof d) return t.toString();
				else if (this.isMap(t)) return JSON.stringify(t);
				else throw Error("Unsupported previous source map format: " + t.toString());
			} else if (this.inline) return this.decodeInline(this.annotation);
			else if (this.annotation) {
				let t = this.annotation;
				e && (t = s(a(e), t));
				let n = this.loadFile(t, e, !1);
				if (n) try {
					/* c8 ignore next 4 */
					this.json = JSON.parse(n.replace(/^\)]}'[^\n]*\n/, ""));
				} catch {
					return;
				}
				return n;
			}
		}
		startWith(e, t) {
			return e ? e.substr(0, t.length) === t : !1;
		}
		withContent() {
			return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
		}
	};
	t.exports = m, m.default = m;
})), ar = /* @__PURE__ */ _(((e, t) => {
	var { nanoid: n } = rr(), { isAbsolute: r, resolve: i } = $(), { SourceMapConsumer: a, SourceMapGenerator: o } = $(), { fileURLToPath: s, pathToFileURL: c } = $(), l = qn(), u = ir(), d = $(), f = Symbol("lineToIndexCache"), p = !!(a && o), m = !!(i && r);
	function h(e) {
		if (e[f]) return e[f];
		let t = e.css.split("\n"), n = Array(t.length), r = 0;
		for (let e = 0, i = t.length; e < i; e++) n[e] = r, r += t[e].length + 1;
		return e[f] = n, n;
	}
	var g = class {
		get from() {
			return this.file || this.id;
		}
		constructor(e, t = {}) {
			if (e == null || typeof e == "object" && !e.toString) throw Error(`PostCSS received ${e} instead of CSS string`);
			if (this.css = e.toString(), this.css[0] === "﻿" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, this.document = this.css, t.document && (this.document = t.document.toString()), t.from && (this.file = !m || /^\w+:\/\//.test(t.from) || r(t.from) ? t.from : i(t.from)), m && p) {
				let e = new u(this.css, t);
				if (e.text) {
					this.map = e;
					let t = e.consumer().file;
					!this.file && t && (this.file = this.mapResolve(t));
				}
			}
			this.file || (this.id = "<input css " + n(6) + ">"), this.map && (this.map.file = this.from);
		}
		error(e, t, n, r = {}) {
			let i, a, o, s, u;
			if (t && typeof t == "object") {
				let e = t, r = n;
				if (typeof e.offset == "number") {
					s = e.offset;
					let r = this.fromOffset(s);
					t = r.line, n = r.col;
				} else t = e.line, n = e.column, s = this.fromLineAndColumn(t, n);
				if (typeof r.offset == "number") {
					o = r.offset;
					let e = this.fromOffset(o);
					a = e.line, i = e.col;
				} else a = r.line, i = r.column, o = this.fromLineAndColumn(r.line, r.column);
			} else if (n) s = this.fromLineAndColumn(t, n);
			else {
				s = t;
				let e = this.fromOffset(s);
				t = e.line, n = e.col;
			}
			let d = this.origin(t, n, a, i);
			return u = d ? new l(e, d.endLine === void 0 ? d.line : {
				column: d.column,
				line: d.line
			}, d.endLine === void 0 ? d.column : {
				column: d.endColumn,
				line: d.endLine
			}, d.source, d.file, r.plugin) : new l(e, a === void 0 ? t : {
				column: n,
				line: t
			}, a === void 0 ? n : {
				column: i,
				line: a
			}, this.css, this.file, r.plugin), u.input = {
				column: n,
				endColumn: i,
				endLine: a,
				endOffset: o,
				line: t,
				offset: s,
				source: this.css
			}, this.file && (c && (u.input.url = c(this.file).toString()), u.input.file = this.file), u;
		}
		fromLineAndColumn(e, t) {
			return h(this)[e - 1] + t - 1;
		}
		fromOffset(e) {
			let t = h(this), n = t[t.length - 1], r = 0;
			if (e >= n) r = t.length - 1;
			else {
				let n = t.length - 2, i;
				for (; r < n;) if (i = r + (n - r >> 1), e < t[i]) n = i - 1;
				else if (e >= t[i + 1]) r = i + 1;
				else {
					r = i;
					break;
				}
			}
			return {
				col: e - t[r] + 1,
				line: r + 1
			};
		}
		mapResolve(e) {
			return /^\w+:\/\//.test(e) ? e : i(this.map.consumer().sourceRoot || this.map.root || ".", e);
		}
		origin(e, t, n, i) {
			if (!this.map) return !1;
			let a = this.map.consumer(), o = a.originalPositionFor({
				column: t - 1,
				line: e
			});
			if (!o.source) return !1;
			let l;
			if (typeof n == "number") {
				let e = a.originalPositionFor({
					column: i - 1,
					line: n
				});
				e.source && (l = e);
			}
			let u;
			u = r(o.source) ? c(o.source) : new URL(o.source, this.map.consumer().sourceRoot || c(this.map.mapFile));
			let d = {
				column: o.column + 1,
				endColumn: l && l.column + 1,
				endLine: l && l.line,
				line: o.line,
				url: u.toString()
			};
			if (u.protocol === "file:") {
				if (s) d.file = s(u);
				else
 /* c8 ignore next 2 */
				throw Error("file: protocol is not available in this PostCSS build");
			}
			let f = a.sourceContentFor(o.source);
			return f && (d.source = f), d;
		}
		toJSON() {
			let e = {};
			for (let t of [
				"hasBOM",
				"css",
				"file",
				"id"
			]) this[t] != null && (e[t] = this[t]);
			return this.map && (e.map = { ...this.map }, e.map.consumerCache && (e.map.consumerCache = void 0)), e;
		}
	};
	t.exports = g, g.default = g, d && d.registerInput && d.registerInput(g);
})), or = /* @__PURE__ */ _(((e, t) => {
	var n = er(), r, i, a = class extends n {
		constructor(e) {
			super(e), this.type = "root", this.nodes ||= [];
		}
		normalize(e, t, n) {
			let r = /* @__PURE__ */ new Set();
			for (let t of Array.isArray(e) ? e : [e]) t && typeof t == "object" && !t.parent && t.raws && t.raws.before !== void 0 && r.add(t.raws);
			let i = super.normalize(e);
			if (t) {
				if (n === "prepend") this.nodes.length > 1 ? t.raws.before = this.nodes[1].raws.before : delete t.raws.before;
				else if (this.first !== t) for (let e of i) r.has(e.raws) || (e.raws.before = t.raws.before);
			}
			return i;
		}
		removeChild(e, t) {
			let n = this.index(e);
			return !t && n === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[n].raws.before), super.removeChild(e);
		}
		toResult(e = {}) {
			return new r(new i(), this, e).stringify();
		}
	};
	a.registerLazyResult = (e) => {
		r = e;
	}, a.registerProcessor = (e) => {
		i = e;
	}, t.exports = a, a.default = a, n.registerRoot(a);
})), sr = /* @__PURE__ */ _(((e, t) => {
	var n = {
		comma(e) {
			return n.split(e, [","], !0);
		},
		space(e) {
			return n.split(e, [
				" ",
				"\n",
				"	"
			]);
		},
		split(e, t, n) {
			if (typeof e != "string") return [];
			let r = [], i = "", a = !1, o = 0, s = !1, c = "", l = !1, u = !1;
			for (let d = 0; d < e.length; d++) {
				let f = e[d];
				if (u) i += f, f === "*" && e[d + 1] === "/" && (i += "/", d += 1, u = !1);
				else {
					if (l) l = !1;
					else if (f === "\\") l = !0;
					else if (s) f === c && (s = !1);
					else if (f === "\"" || f === "'") s = !0, c = f;
					else if (f === "/" && e[d + 1] === "*") {
						i += "/*", d += 1, u = !0;
						continue;
					} else f === "(" ? o += 1 : f === ")" ? o > 0 && --o : o === 0 && t.includes(f) && (a = !0);
					if (a) {
						let e = i.trim();
						(n || e !== "") && r.push(e), i = "", a = !1;
					} else i += f;
				}
			}
			let d = i.trim();
			return (n || d !== "") && r.push(d), r;
		}
	};
	t.exports = n, n.default = n;
})), cr = /* @__PURE__ */ _(((e, t) => {
	var n = er(), r = sr(), i = class extends n {
		get selectors() {
			return r.comma(this.selector);
		}
		set selectors(e) {
			let t = this.selector ? this.selector.match(/,\s*/) : null, n = t ? t[0] : "," + this.raw("between", "beforeOpen");
			this.selector = e.join(n);
		}
		constructor(e) {
			super(e), this.type = "rule", this.nodes ||= [];
		}
	};
	t.exports = i, i.default = i, n.registerRule(i);
})), lr = /* @__PURE__ */ _(((e, t) => {
	var n = tr(), r = Qn(), i = $n(), a = ar(), o = ir(), s = or(), c = cr();
	function l(e, t) {
		return e.inputs ? e.inputs.map((e) => {
			let t = {
				...e,
				__proto__: a.prototype
			};
			return t.map &&= {
				...t.map,
				__proto__: o.prototype
			}, t;
		}) : t;
	}
	function u(e, t, a) {
		let o = { ...e };
		if (delete o.inputs, delete o.nodes, o.source) {
			let { inputId: e, ...n } = o.source;
			o.source = n, e != null && (o.source.input = t[e]);
		}
		let l;
		if (o.type === "root") l = new s(o);
		else if (o.type === "decl") l = new i(o);
		else if (o.type === "rule") l = new c(o);
		else if (o.type === "comment") l = new r(o);
		else if (o.type === "atrule") l = new n(o);
		else throw Error("Unknown node type: " + e.type);
		if (a) {
			l.nodes = a;
			for (let e of a) e.parent = l;
		}
		return l;
	}
	function d(e, t) {
		if (Array.isArray(e)) return e.map((e) => d(e));
		let n, r = [{
			childIndex: 0,
			children: [],
			inputs: l(e, t),
			json: e
		}];
		for (; r.length > 0;) {
			let e = r[r.length - 1], t = e.json.nodes;
			if (t && e.childIndex < t.length) {
				let n = t[e.childIndex];
				e.childIndex += 1, r.push({
					childIndex: 0,
					children: [],
					inputs: l(n, e.inputs),
					json: n
				});
				continue;
			}
			r.pop();
			let i = u(e.json, e.inputs, t ? e.children : void 0);
			r.length > 0 ? r[r.length - 1].children.push(i) : n = i;
		}
		return n;
	}
	t.exports = d, d.default = d;
})), ur = /* @__PURE__ */ _(((e, t) => {
	var { dirname: n, relative: r, resolve: i, sep: a } = $(), { SourceMapConsumer: o, SourceMapGenerator: s } = $(), { pathToFileURL: c } = $(), l = ar(), u = !!(o && s), d = !!(n && i && r && a);
	t.exports = class {
		constructor(e, t, n, r) {
			this.stringify = e, this.mapOpts = n.map || {}, this.root = t, this.opts = n, this.css = r, this.originalCSS = r, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
		}
		addAnnotation() {
			let e;
			e = this.isInline() ? "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? this.mapOpts.annotation(this.opts.to, this.root) : this.outputFile() + ".map";
			let t = "\n";
			this.css.includes("\r\n") && (t = "\r\n"), this.css += t + "/*# sourceMappingURL=" + e + " */";
		}
		applyPrevMaps() {
			for (let e of this.previous()) {
				let t = this.toUrl(this.path(e.file)), r = e.root || n(e.file), i;
				this.mapOpts.sourcesContent === !1 ? (i = new o(e.text), i.sourcesContent && (i.sourcesContent = null)) : i = e.consumer(), this.map.applySourceMap(i, t, this.toUrl(this.path(r)));
			}
		}
		clearAnnotation() {
			if (this.mapOpts.annotation !== !1) {
				if (this.root) {
					let e;
					for (let t = this.root.nodes.length - 1; t >= 0; t--) e = this.root.nodes[t], e.type === "comment" && e.text.startsWith("# sourceMappingURL=") && this.root.removeChild(t);
				} else if (this.css) {
					let e = "", t = 0, n;
					for (; (n = this.css.indexOf("/*# sourceMappingURL=", t)) !== -1;) {
						let r = this.css.indexOf("*/", n + 21);
						if (r === -1) break;
						for (; n > t && this.css[n - 1] === "\n";) n--;
						e += this.css.slice(t, n), t = r + 2;
					}
					t > 0 && (this.css = e + this.css.slice(t));
				}
			}
		}
		generate() {
			if (this.clearAnnotation(), d && u && this.isMap()) return this.generateMap();
			{
				let e = "";
				return this.stringify(this.root, (t) => {
					e += t;
				}), [e];
			}
		}
		generateMap() {
			if (this.root) this.generateString();
			else if (this.previous().length === 1) {
				let e = this.previous()[0].consumer();
				e.file = this.outputFile(), this.map = s.fromSourceMap(e, { ignoreInvalidMapping: !0 });
			} else this.map = new s({
				file: this.outputFile(),
				ignoreInvalidMapping: !0
			}), this.map.addMapping({
				generated: {
					column: 0,
					line: 1
				},
				original: {
					column: 0,
					line: 1
				},
				source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
			});
			return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
		}
		generateString() {
			this.css = "", this.map = new s({
				file: this.outputFile(),
				ignoreInvalidMapping: !0
			});
			let e = 1, t = 1, n = "<no source>", r = {
				generated: {
					column: 0,
					line: 0
				},
				original: {
					column: 0,
					line: 0
				},
				source: ""
			}, i, a;
			this.stringify(this.root, (o, s, c) => {
				if (this.css += o, s && c !== "end" && (r.generated.line = e, r.generated.column = t - 1, s.source && s.source.start ? (r.source = this.sourcePath(s), r.original.line = s.source.start.line, r.original.column = s.source.start.column - 1, this.map.addMapping(r)) : (r.source = n, r.original.line = 1, r.original.column = 0, this.map.addMapping(r))), a = o.match(/\n/g), a ? (e += a.length, i = o.lastIndexOf("\n"), t = o.length - i) : t += o.length, s && c !== "start") {
					let i = s.parent || { raws: {} };
					(!(s.type === "decl" || s.type === "atrule" && !s.nodes) || s !== i.last || i.raws.semicolon) && (s.source && s.source.end ? (r.source = this.sourcePath(s), r.original.line = s.source.end.line, r.original.column = s.source.end.column - 1, r.generated.line = e, r.generated.column = t - 2, this.map.addMapping(r)) : (r.source = n, r.original.line = 1, r.original.column = 0, r.generated.line = e, r.generated.column = t - 1, this.map.addMapping(r)));
				}
			});
		}
		isAnnotation() {
			return this.isInline() ? !0 : this.mapOpts.annotation === void 0 ? !this.previous().length || this.previous().some((e) => e.annotation) : this.mapOpts.annotation;
		}
		isInline() {
			if (this.mapOpts.inline !== void 0) return this.mapOpts.inline;
			let e = this.mapOpts.annotation;
			return e !== void 0 && e !== !0 ? !1 : !this.previous().length || this.previous().some((e) => e.inline);
		}
		isMap() {
			return this.opts.map === void 0 ? this.previous().length > 0 : !!this.opts.map;
		}
		isSourcesContent() {
			return this.mapOpts.sourcesContent === void 0 ? !this.previous().length || this.previous().some((e) => e.withContent()) : this.mapOpts.sourcesContent;
		}
		outputFile() {
			return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
		}
		path(e) {
			if (this.mapOpts.absolute || e.charCodeAt(0) === 60 || /^\w+:\/\//.test(e)) return e;
			let t = this.memoizedPaths.get(e);
			if (t) return t;
			let a = this.opts.to ? n(this.opts.to) : ".";
			typeof this.mapOpts.annotation == "string" && (a = n(i(a, this.mapOpts.annotation)));
			let o = r(a, e);
			return this.memoizedPaths.set(e, o), o;
		}
		previous() {
			if (!this.previousMaps) {
				if (this.previousMaps = [], this.root) this.root.walk((e) => {
					if (e.source && e.source.input.map) {
						let t = e.source.input.map;
						this.previousMaps.includes(t) || this.previousMaps.push(t);
					}
				});
				else {
					let e = new l(this.originalCSS, this.opts);
					e.map && this.previousMaps.push(e.map);
				}
			}
			return this.previousMaps;
		}
		setSourcesContent() {
			let e = {};
			if (this.root) this.root.walk((t) => {
				if (t.source) {
					let n = t.source.input.from;
					if (n && !e[n]) {
						e[n] = !0;
						let r = this.usesFileUrls ? this.toFileUrl(n) : this.toUrl(this.path(n));
						this.map.setSourceContent(r, t.source.input.css);
					}
				}
			});
			else if (this.css) {
				let e = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
				this.map.setSourceContent(e, this.css);
			}
		}
		sourcePath(e) {
			return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(e.source.input.from) : this.toUrl(this.path(e.source.input.from));
		}
		toBase64(e) {
			return Buffer ? Buffer.from(e).toString("base64") : window.btoa(unescape(encodeURIComponent(e)));
		}
		toFileUrl(e) {
			let t = this.memoizedFileURLs.get(e);
			if (t) return t;
			if (c) {
				let t = c(e).toString();
				return this.memoizedFileURLs.set(e, t), t;
			}
			throw Error("`map.absolute` option is not available in this PostCSS build");
		}
		toUrl(e) {
			let t = this.memoizedURLs.get(e);
			if (t) return t;
			a === "\\" && (e = e.replace(/\\/g, "/"));
			let n = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
			return this.memoizedURLs.set(e, n), n;
		}
	};
})), dr = /* @__PURE__ */ _(((e, t) => {
	var n = /[\t\n\f\r "#'()/;[\\\]{}]/g, r = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, i = /.[\r\n"'(/\\]/, a = /[\da-f]/i;
	t.exports = function(e, t = {}) {
		let o = e.css.valueOf(), s = t.ignoreErrors, c, l, u, d, f, p, m, h, g, _, v = o.length, y = 0, b = [], x = [], S = -1;
		function C() {
			return y;
		}
		function w(t) {
			throw e.error("Unclosed " + t, y);
		}
		function T() {
			return x.length === 0 && y >= v;
		}
		function E(e) {
			if (x.length) return x.pop();
			if (y >= v) return;
			let t = e ? e.ignoreUnclosed : !1;
			switch (c = o.charCodeAt(y), c) {
				case 10:
				case 32:
				case 9:
				case 13:
				case 12:
					d = y;
					do
						d += 1, c = o.charCodeAt(d);
					while (c === 32 || c === 10 || c === 9 || c === 13 || c === 12);
					p = ["space", o.slice(y, d)], y = d - 1;
					break;
				case 91:
				case 93:
				case 123:
				case 125:
				case 58:
				case 59:
				case 41: {
					let e = String.fromCharCode(c);
					p = [
						e,
						e,
						y
					];
					break;
				}
				case 40:
					if (_ = b.length ? b.pop()[1] : "", g = o.charCodeAt(y + 1), _ === "url" && g !== 39 && g !== 34 && g !== 32 && g !== 10 && g !== 9 && g !== 12 && g !== 13) {
						d = y;
						do {
							if (m = !1, d = o.indexOf(")", d + 1), d === -1) {
								if (s || t) {
									d = y;
									break;
								}
								w("bracket");
							}
							for (h = d; o.charCodeAt(h - 1) === 92;) --h, m = !m;
						} while (m);
						p = [
							"brackets",
							o.slice(y, d + 1),
							y,
							d
						], y = d;
					} else y <= S ? p = [
						"(",
						"(",
						y
					] : (d = o.indexOf(")", y + 1), l = o.slice(y, d + 1), d === -1 || i.test(l) ? (S = d === -1 ? v : d, p = [
						"(",
						"(",
						y
					]) : (p = [
						"brackets",
						l,
						y,
						d
					], y = d));
					break;
				case 39:
				case 34:
					f = c === 39 ? "'" : "\"", d = y;
					do {
						if (m = !1, d = o.indexOf(f, d + 1), d === -1) {
							if (s || t) {
								d = y + 1;
								break;
							}
							w("string");
						}
						for (h = d; o.charCodeAt(h - 1) === 92;) --h, m = !m;
					} while (m);
					p = [
						"string",
						o.slice(y, d + 1),
						y,
						d
					], y = d;
					break;
				case 64:
					n.lastIndex = y + 1, n.test(o), d = n.lastIndex === 0 ? o.length - 1 : n.lastIndex - 2, p = [
						"at-word",
						o.slice(y, d + 1),
						y,
						d
					], y = d;
					break;
				case 92:
					for (d = y, u = !0; o.charCodeAt(d + 1) === 92;) d += 1, u = !u;
					if (c = o.charCodeAt(d + 1), u && c !== 47 && c !== 32 && c !== 10 && c !== 9 && c !== 13 && c !== 12 && (d += 1, a.test(o.charAt(d)))) {
						for (; a.test(o.charAt(d + 1));) d += 1;
						o.charCodeAt(d + 1) === 32 && (d += 1);
					}
					p = [
						"word",
						o.slice(y, d + 1),
						y,
						d
					], y = d;
					break;
				default: c === 47 && o.charCodeAt(y + 1) === 42 ? (d = o.indexOf("*/", y + 2) + 1, d === 0 && (s || t ? d = o.length : w("comment")), p = [
					"comment",
					o.slice(y, d + 1),
					y,
					d
				], y = d) : (r.lastIndex = y + 1, r.test(o), d = r.lastIndex === 0 ? o.length - 1 : r.lastIndex - 2, p = [
					"word",
					o.slice(y, d + 1),
					y,
					d
				], b.push(p), y = d);
			}
			return y++, p;
		}
		function D(e) {
			x.push(e);
		}
		return {
			back: D,
			endOfFile: T,
			nextToken: E,
			position: C
		};
	};
})), fr = /* @__PURE__ */ _(((e, t) => {
	var n = tr(), r = Qn(), i = $n(), a = or(), o = cr(), s = dr(), c = {
		empty: !0,
		space: !0
	};
	function l(e) {
		for (let t = e.length - 1; t >= 0; t--) {
			let n = e[t], r = n[3] || n[2];
			if (r) return r;
		}
	}
	function u(e, t, n) {
		let r = "";
		for (let i = t; i < n; i++) r += e[i][1];
		return r;
	}
	t.exports = class {
		constructor(e) {
			this.input = e, this.root = new a(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = {
				input: e,
				start: {
					column: 1,
					line: 1,
					offset: 0
				}
			};
		}
		atrule(e) {
			let t = new n();
			t.name = e[1].slice(1), t.name === "" && this.unnamedAtrule(t, e), this.init(t, e[2]);
			let r, i, a, o = !1, s = !1, c = [], l = [];
			for (; !this.tokenizer.endOfFile();) {
				if (e = this.tokenizer.nextToken(), r = e[0], r === "(" || r === "[" ? l.push(r === "(" ? ")" : "]") : r === "{" && l.length > 0 ? l.push("}") : r === l[l.length - 1] && l.pop(), l.length === 0) {
					if (r === ";") {
						t.source.end = this.getPosition(e[2]), t.source.end.offset++, this.semicolon = !0;
						break;
					}
					if (r === "{") {
						s = !0;
						break;
					}
					if (r === "}") {
						if (c.length > 0) {
							for (a = c.length - 1, i = c[a]; i && i[0] === "space";) i = c[--a];
							i && (t.source.end = this.getPosition(i[3] || i[2]), t.source.end.offset++);
						}
						this.end(e);
						break;
					}
					c.push(e);
				} else c.push(e);
				if (this.tokenizer.endOfFile()) {
					o = !0;
					break;
				}
			}
			t.raws.between = this.spacesAndCommentsFromEnd(c), c.length ? (t.raws.afterName = this.spacesAndCommentsFromStart(c), this.raw(t, "params", c), o && (e = c[c.length - 1], t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++, this.spaces = t.raws.between, t.raws.between = "")) : (t.raws.afterName = "", t.params = ""), s && (t.nodes = [], this.current = t);
		}
		checkMissedSemicolon(e) {
			let t = this.colon(e);
			if (t === !1) return;
			let n = 0, r;
			for (let i = t - 1; i >= 0 && (r = e[i], !(r[0] !== "space" && (n += 1, n === 2))); i--);
			throw this.input.error("Missed semicolon", r[0] === "word" ? r[3] + 1 : r[2]);
		}
		colon(e) {
			let t = 0, n, r, i;
			for (let [a, o] of e.entries()) {
				if (r = o, i = r[0], i === "(" && (t += 1), i === ")" && --t, t === 0 && i === ":") {
					if (!n) this.doubleColon(r);
					else if (n[0] === "word" && n[1] === "progid") continue;
					else return a;
				}
				n = r;
			}
			return !1;
		}
		comment(e) {
			let t = new r();
			this.init(t, e[2]), t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++;
			let n = e[1].slice(2, -2);
			if (!n.trim()) t.text = "", t.raws.left = n, t.raws.right = "";
			else {
				let e = n.match(/^(\s*)([^]*\S)(\s*)$/);
				t.text = e[2], t.raws.left = e[1], t.raws.right = e[3];
			}
		}
		createTokenizer() {
			this.tokenizer = s(this.input);
		}
		decl(e, t) {
			let n = new i();
			this.init(n, e[0][2]);
			let r = e[e.length - 1];
			r[0] === ";" && (this.semicolon = !0, e.pop()), n.source.end = this.getPosition(r[3] || r[2] || l(e)), n.source.end.offset++;
			let a = 0;
			for (; e[a][0] !== "word";) a === e.length - 1 && this.unknownWord([e[a]]), a++;
			n.raws.before += u(e, 0, a), n.source.start = this.getPosition(e[a][2]);
			let o = a;
			for (; a < e.length;) {
				let t = e[a][0];
				if (t === ":" || t === "space" || t === "comment") break;
				a++;
			}
			n.prop = u(e, o, a);
			let s = a, c;
			for (; a < e.length && (c = e[a], a++, c[0] !== ":");) c[0] === "word" && /\w/.test(c[1]) && this.unknownWord([c]);
			n.raws.between = u(e, s, a), (n.prop[0] === "_" || n.prop[0] === "*") && (n.raws.before += n.prop[0], n.prop = n.prop.slice(1));
			let d = a;
			for (; a < e.length;) {
				let t = e[a][0];
				if (t !== "space" && t !== "comment") break;
				a++;
			}
			let f = e.slice(d, a);
			e = e.slice(a), this.precheckMissedSemicolon(e);
			for (let t = e.length - 1; t >= 0; t--) {
				if (c = e[t], c[1].toLowerCase() === "!important") {
					n.important = !0;
					let r = this.stringFrom(e, t);
					r = this.spacesFromEnd(e) + r, r !== " !important" && (n.raws.important = r);
					break;
				}
				if (c[1].toLowerCase() === "important") {
					let r = e.slice(0), i = "";
					for (let e = t; e > 0; e--) {
						let t = r[e][0];
						if (i.trim().startsWith("!") && t !== "space") break;
						i = r.pop()[1] + i;
					}
					i.trim().startsWith("!") && (n.important = !0, n.raws.important = i, e = r);
				}
				if (c[0] !== "space" && c[0] !== "comment") break;
			}
			e.some((e) => e[0] !== "space" && e[0] !== "comment") && (n.raws.between += f.map((e) => e[1]).join(""), f = []), this.raw(n, "value", f.concat(e), t), n.value.includes(":") && !t && this.checkMissedSemicolon(e);
		}
		doubleColon(e) {
			throw this.input.error("Double colon", { offset: e[2] }, { offset: e[2] + e[1].length });
		}
		emptyRule(e) {
			let t = new o();
			this.init(t, e[2]), t.selector = "", t.raws.between = "", this.current = t;
		}
		end(e) {
			this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(e[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(e);
		}
		endFile() {
			this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
		}
		freeSemicolon(e) {
			if (this.spaces += e[1], this.current.nodes) {
				let t = this.current.nodes[this.current.nodes.length - 1];
				t && t.type === "rule" && !t.raws.ownSemicolon && (t.raws.ownSemicolon = this.spaces, this.spaces = "", t.source.end = this.getPosition(e[2]), t.source.end.offset++);
			}
		}
		getPosition(e) {
			let t = this.input.fromOffset(e);
			return {
				column: t.col,
				line: t.line,
				offset: e
			};
		}
		init(e, t) {
			this.current.push(e), e.source = {
				input: this.input,
				start: this.getPosition(t)
			}, e.raws.before = this.spaces, this.spaces = "", e.type !== "comment" && (this.semicolon = !1);
		}
		other(e) {
			let t = !1, n = null, r = !1, i = null, a = [], o = e[1].startsWith("--"), s = [], c = e;
			for (; c;) {
				if (n = c[0], s.push(c), n === "(" || n === "[") i ||= c, a.push(n === "(" ? ")" : "]");
				else if (o && r && n === "{") i ||= c, a.push("}");
				else if (a.length === 0) {
					if (n === ";") {
						if (r) {
							this.decl(s, o);
							return;
						}
						break;
					}
					if (n === "{") {
						this.rule(s);
						return;
					}
					if (n === "}") {
						this.tokenizer.back(s.pop()), t = !0;
						break;
					}
					n === ":" && (r = !0);
				} else n === a[a.length - 1] && (a.pop(), a.length === 0 && (i = null));
				c = this.tokenizer.nextToken();
			}
			if (this.tokenizer.endOfFile() && (t = !0), a.length > 0 && this.unclosedBracket(i), t && r) {
				if (!o) for (; s.length && (c = s[s.length - 1][0], c === "space" || c === "comment");) this.tokenizer.back(s.pop());
				this.decl(s, o);
			} else this.unknownWord(s);
		}
		parse() {
			let e;
			for (; !this.tokenizer.endOfFile();) switch (e = this.tokenizer.nextToken(), e[0]) {
				case "space":
					this.spaces += e[1];
					break;
				case ";":
					this.freeSemicolon(e);
					break;
				case "}":
					this.end(e);
					break;
				case "comment":
					this.comment(e);
					break;
				case "at-word":
					this.atrule(e);
					break;
				case "{":
					this.emptyRule(e);
					break;
				default: this.other(e);
			}
			this.endFile();
		}
		precheckMissedSemicolon() {}
		raw(e, t, n, r) {
			let i, a, o = n.length, s = "", l = "", u = !0, d, f;
			for (let e = 0; e < o; e += 1) i = n[e], a = i[0], a === "space" && e === o - 1 && !r ? u = !1 : a === "comment" ? (f = n[e - 1] ? n[e - 1][0] : "empty", d = n[e + 1] ? n[e + 1][0] : "empty", !c[f] && !c[d] ? l === "," ? u = !1 : (s += i[1], l = i[1].slice(-1)) : u = !1) : (s += i[1], l = i[1].slice(-1));
			if (!u) {
				let r = n.reduce((e, t) => e + t[1], "");
				e.raws[t] = {
					raw: r,
					value: s
				};
			}
			e[t] = s;
		}
		rule(e) {
			e.pop();
			let t = new o();
			this.init(t, e[0][2]), t.raws.between = this.spacesAndCommentsFromEnd(e), this.raw(t, "selector", e), this.current = t;
		}
		spacesAndCommentsFromEnd(e) {
			let t, n = "";
			for (; e.length && (t = e[e.length - 1][0], t === "space" || t === "comment");) n = e.pop()[1] + n;
			return n;
		}
		spacesAndCommentsFromStart(e) {
			let t, n = "";
			for (; e.length && (t = e[0][0], t === "space" || t === "comment");) n += e.shift()[1];
			return n;
		}
		spacesFromEnd(e) {
			let t, n = "";
			for (; e.length && (t = e[e.length - 1][0], t === "space");) n = e.pop()[1] + n;
			return n;
		}
		stringFrom(e, t) {
			let n = "";
			for (let r = t; r < e.length; r++) n += e[r][1];
			return e.splice(t, e.length - t), n;
		}
		unclosedBlock() {
			let e = this.current.source.start;
			throw this.input.error("Unclosed block", e.line, e.column);
		}
		unclosedBracket(e) {
			throw this.input.error("Unclosed bracket", { offset: e[2] }, { offset: e[2] + 1 });
		}
		unexpectedClose(e) {
			throw this.input.error("Unexpected }", { offset: e[2] }, { offset: e[2] + 1 });
		}
		unknownWord(e) {
			throw this.input.error("Unknown word " + e[0][1], { offset: e[0][2] }, { offset: e[0][2] + e[0][1].length });
		}
		unnamedAtrule(e, t) {
			throw this.input.error("At-rule without name", { offset: t[2] }, { offset: t[2] + t[1].length });
		}
	};
})), pr = /* @__PURE__ */ _(((e, t) => {
	var n = er(), r = ar(), i = fr();
	function a(e, t) {
		let n = new i(new r(e, t));
		try {
			n.parse();
		} catch (e) {
			throw process.env.NODE_ENV !== "production" && e.name === "CssSyntaxError" && t && t.from && (/\.scss$/i.test(t.from) ? e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser" : /\.sass/i.test(t.from) ? e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser" : /\.less$/i.test(t.from) && (e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser")), e;
		}
		return n.root;
	}
	t.exports = a, a.default = a, n.registerParse(a);
})), mr = /* @__PURE__ */ _(((e, t) => {
	var n = er(), { my: r } = Xn(), i = class {
		constructor(e, t = {}) {
			if (this.type = "warning", this.text = e, t.node && t.node.source) {
				t.node[r] || n.rebuild(t.node);
				let e = t.node.rangeBy(t);
				this.line = e.start.line, this.column = e.start.column, this.endLine = e.end.line, this.endColumn = e.end.column;
			}
			for (let e in t) this[e] = t[e];
		}
		toString() {
			return this.node ? this.node.error(this.text, {
				index: this.index,
				plugin: this.plugin,
				word: this.word
			}).message : this.plugin ? this.plugin + ": " + this.text : this.text;
		}
	};
	t.exports = i, i.default = i;
})), hr = /* @__PURE__ */ _(((e, t) => {
	var n = mr(), r = class {
		get content() {
			return this.css;
		}
		constructor(e, t, n) {
			this.processor = e, this.messages = [], this.root = t, this.opts = n, this.css = "", this.map = void 0;
		}
		toString() {
			return this.css;
		}
		warn(e, t = {}) {
			t.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (t.plugin = this.lastPlugin.postcssPlugin);
			let r = new n(e, t);
			return this.messages.push(r), r;
		}
		warnings() {
			return this.messages.filter((e) => e.type === "warning");
		}
	};
	t.exports = r, r.default = r;
})), gr = /* @__PURE__ */ _(((e, t) => {
	var n = {};
	t.exports = function(e) {
		n[e] || (n[e] = !0, typeof console < "u" && console.warn && console.warn(e));
	};
})), _r = /* @__PURE__ */ _(((e, t) => {
	var n = er(), r = nr(), i = ur(), a = pr(), o = hr(), s = or(), c = Yn(), { isClean: l, my: u } = Xn(), d = gr(), f = {
		atrule: "AtRule",
		comment: "Comment",
		decl: "Declaration",
		document: "Document",
		root: "Root",
		rule: "Rule"
	}, p = {
		AtRule: !0,
		AtRuleExit: !0,
		Comment: !0,
		CommentExit: !0,
		Declaration: !0,
		DeclarationExit: !0,
		Document: !0,
		DocumentExit: !0,
		Once: !0,
		OnceExit: !0,
		postcssPlugin: !0,
		prepare: !0,
		Root: !0,
		RootExit: !0,
		Rule: !0,
		RuleExit: !0
	}, m = {
		Once: !0,
		postcssPlugin: !0,
		prepare: !0
	}, h = 0;
	function g(e) {
		return typeof e == "object" && typeof e.then == "function";
	}
	function _(e) {
		let t = !1, n = f[e.type];
		return e.type === "decl" ? t = e.prop.toLowerCase() : e.type === "atrule" && (t = e.name.toLowerCase()), t && e.append ? [
			n,
			n + "-" + t,
			h,
			n + "Exit",
			n + "Exit-" + t
		] : t ? [
			n,
			n + "-" + t,
			n + "Exit",
			n + "Exit-" + t
		] : e.append ? [
			n,
			h,
			n + "Exit"
		] : [n, n + "Exit"];
	}
	function v(e) {
		let t;
		return t = e.type === "document" ? [
			"Document",
			h,
			"DocumentExit"
		] : e.type === "root" ? [
			"Root",
			h,
			"RootExit"
		] : _(e), {
			eventIndex: 0,
			events: t,
			iterator: 0,
			node: e,
			visitorIndex: 0,
			visitors: []
		};
	}
	function y(e) {
		let t = [e];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e[l] = !1, e.nodes) for (let n of e.nodes) t.push(n);
		}
		return e;
	}
	var b = {}, x = class e {
		get content() {
			return this.stringify().content;
		}
		get css() {
			return this.stringify().css;
		}
		get map() {
			return this.stringify().map;
		}
		get messages() {
			return this.sync().messages;
		}
		get opts() {
			return this.result.opts;
		}
		get processor() {
			return this.result.processor;
		}
		get root() {
			return this.sync().root;
		}
		get [Symbol.toStringTag]() {
			return "LazyResult";
		}
		constructor(t, r, i) {
			this.stringified = !1, this.processed = !1;
			let s;
			if (typeof r == "object" && r && (r.type === "root" || r.type === "document")) s = y(r);
			else if (r instanceof e || r instanceof o) s = y(r.root), r.map && (i.map === void 0 && (i.map = {}), i.map.inline || (i.map.inline = !1), i.map.prev = r.map);
			else {
				let e = a;
				i.syntax && (e = i.syntax.parse), i.parser && (e = i.parser), e.parse && (e = e.parse);
				try {
					s = e(r, i);
				} catch (e) {
					this.processed = !0, this.error = e;
				}
				s && !s[u] && 
				/* c8 ignore next 2 */
				n.rebuild(s);
			}
			this.result = new o(t, s, i), this.helpers = {
				...b,
				postcss: b,
				result: this.result
			}, this.plugins = this.processor.plugins.map((e) => typeof e == "object" && e.prepare ? {
				...e,
				...e.prepare(this.result)
			} : e);
		}
		async() {
			return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing ||= this.runAsync(), this.processing);
		}
		catch(e) {
			return this.async().catch(e);
		}
		finally(e) {
			return this.async().then(e, e);
		}
		getAsyncError() {
			throw Error("Use process(css).then(cb) to work with async plugins");
		}
		handleError(e, t) {
			let n = this.result.lastPlugin;
			try {
				if (t && t.addToError(e), this.error = e, e.name === "CssSyntaxError" && !e.plugin) e.plugin = n.postcssPlugin, e.setMessage();
				else if (n.postcssVersion && process.env.NODE_ENV !== "production") {
					let e = n.postcssPlugin, t = n.postcssVersion, r = this.result.processor.version, i = t.split("."), a = r.split(".");
					(i[0] !== a[0] || parseInt(i[1]) > parseInt(a[1])) && console.error("Unknown error from PostCSS plugin. Your current PostCSS version is " + r + ", but " + e + " uses " + t + ". Perhaps this is the source of the error below.");
				}
			} catch (e) {
				/* c8 ignore next 3 */
				console && console.error && console.error(e);
			}
			return e;
		}
		prepareVisitors() {
			this.listeners = {};
			let e = (e, t, n) => {
				this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push([e, n]);
			};
			for (let t of this.plugins) if (typeof t == "object") for (let n in t) {
				if (!p[n] && /^[A-Z]/.test(n)) throw Error(`Unknown event ${n} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);
				if (!m[n]) {
					if (typeof t[n] == "object") for (let r in t[n]) r === "*" ? e(t, n, t[n][r]) : e(t, n + "-" + r.toLowerCase(), t[n][r]);
					else typeof t[n] == "function" && e(t, n, t[n]);
				}
			}
			this.hasListener = Object.keys(this.listeners).length > 0;
		}
		async runAsync() {
			this.plugin = 0;
			for (let e = 0; e < this.plugins.length; e++) {
				let t = this.plugins[e], n = this.runOnRoot(t);
				if (g(n)) try {
					await n;
				} catch (e) {
					throw this.handleError(e);
				}
			}
			if (this.prepareVisitors(), this.hasListener) {
				let e = this.result.root;
				for (; !e[l];) {
					e[l] = !0;
					let t = [v(e)];
					for (; t.length > 0;) {
						let e = this.visitTick(t);
						if (g(e)) try {
							await e;
						} catch (e) {
							let n = t[t.length - 1].node;
							throw this.handleError(e, n);
						}
					}
				}
				if (this.listeners.OnceExit) for (let [t, n] of this.listeners.OnceExit) {
					this.result.lastPlugin = t;
					try {
						if (e.type === "document") {
							let t = e.nodes.map((e) => n(e, this.helpers));
							await Promise.all(t);
						} else await n(e, this.helpers);
					} catch (e) {
						throw this.handleError(e);
					}
				}
			}
			return this.processed = !0, this.stringify();
		}
		runOnRoot(e) {
			this.result.lastPlugin = e;
			try {
				if (typeof e == "object" && e.Once) {
					if (this.result.root.type === "document") {
						let t = this.result.root.nodes.map((t) => e.Once(t, this.helpers));
						return g(t[0]) ? Promise.all(t) : t;
					}
					return e.Once(this.result.root, this.helpers);
				}
				if (typeof e == "function") return e(this.result.root, this.result);
			} catch (e) {
				throw this.handleError(e);
			}
		}
		stringify() {
			if (this.error) throw this.error;
			if (this.stringified) return this.result;
			this.stringified = !0, this.sync();
			let e = this.result.opts, t = c;
			e.syntax && (t = e.syntax.stringify), e.stringifier && (t = e.stringifier), t.stringify && (t = t.stringify);
			let n = this.result.root.source;
			if (e.map === void 0 && !(n && n.input && n.input.map)) {
				let e = "";
				return t(this.result.root, (t) => {
					e += t;
				}), this.result.css = e, this.result;
			}
			let r = new i(t, this.result.root, this.result.opts).generate();
			return this.result.css = r[0], this.result.map = r[1], this.result;
		}
		sync() {
			if (this.error) throw this.error;
			if (this.processed) return this.result;
			if (this.processed = !0, this.processing) throw this.getAsyncError();
			for (let e of this.plugins) if (g(this.runOnRoot(e))) throw this.getAsyncError();
			if (this.prepareVisitors(), this.hasListener) {
				let e = this.result.root;
				for (; !e[l];) e[l] = !0, this.walkSync(e);
				if (this.listeners.OnceExit) {
					if (e.type === "document") for (let t of e.nodes) this.visitSync(this.listeners.OnceExit, t);
					else this.visitSync(this.listeners.OnceExit, e);
				}
			}
			return this.result;
		}
		then(e, t) {
			return process.env.NODE_ENV !== "production" && ("from" in this.opts || d("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")), this.async().then(e, t);
		}
		toString() {
			return this.css;
		}
		visitSync(e, t) {
			for (let [n, r] of e) {
				this.result.lastPlugin = n;
				let e;
				try {
					e = r(t, this.helpers);
				} catch (e) {
					throw this.handleError(e, t.proxyOf);
				}
				if (t.type !== "root" && t.type !== "document" && !t.parent) return !0;
				if (g(e)) throw this.getAsyncError();
			}
		}
		visitTick(e) {
			let t = e[e.length - 1], { node: n, visitors: r } = t;
			if (n.type !== "root" && n.type !== "document" && !n.parent) {
				e.pop();
				return;
			}
			if (r.length > 0 && t.visitorIndex < r.length) {
				let [e, i] = r[t.visitorIndex];
				t.visitorIndex += 1, t.visitorIndex === r.length && (t.visitors = [], t.visitorIndex = 0), this.result.lastPlugin = e;
				try {
					return i(n.toProxy(), this.helpers);
				} catch (e) {
					throw this.handleError(e, n);
				}
			}
			if (t.iterator !== 0) {
				let r = t.iterator;
				t.descending && (t.descending = !1, n.indexes[r] += 1);
				let i;
				for (; i = n.nodes[n.indexes[r]];) {
					if (!i[l]) {
						i[l] = !0, t.descending = !0, e.push(v(i));
						return;
					}
					n.indexes[r] += 1;
				}
				t.iterator = 0, delete n.indexes[r];
			}
			let i = t.events;
			for (; t.eventIndex < i.length;) {
				let e = i[t.eventIndex];
				if (t.eventIndex += 1, e === h) {
					n.nodes && n.nodes.length && (n[l] = !0, t.iterator = n.getIterator());
					return;
				}
				if (this.listeners[e]) {
					t.visitors = this.listeners[e];
					return;
				}
			}
			e.pop();
		}
		walkSync(e) {
			e[l] = !0;
			let t = [{
				eventIndex: 0,
				events: _(e),
				iterator: 0,
				node: e
			}];
			for (; t.length > 0;) {
				let e = t[t.length - 1], n = e.node;
				if (e.iterator !== 0) {
					let r = e.iterator;
					e.descending && (e.descending = !1, n.indexes[r] += 1);
					let i, a = !1;
					for (; i = n.nodes[n.indexes[r]];) {
						if (!i[l]) {
							i[l] = !0, e.descending = !0, t.push({
								eventIndex: 0,
								events: _(i),
								iterator: 0,
								node: i
							}), a = !0;
							break;
						}
						n.indexes[r] += 1;
					}
					if (a) continue;
					e.iterator = 0, delete n.indexes[r];
				}
				if (e.eventIndex < e.events.length) {
					let r = e.events[e.eventIndex];
					if (e.eventIndex += 1, r === h) n.nodes && n.nodes.length && (e.iterator = n.getIterator());
					else {
						let e = this.listeners[r];
						e && this.visitSync(e, n.toProxy()) && t.pop();
					}
				} else t.pop();
			}
		}
		warnings() {
			return this.sync().warnings();
		}
	};
	x.registerPostcss = (e) => {
		b = e;
	}, t.exports = x, x.default = x, s.registerLazyResult(x), r.registerLazyResult(x);
})), vr = /* @__PURE__ */ _(((e, t) => {
	var n = ur(), r = pr(), i = hr(), a = Yn(), o = gr(), s = class {
		get content() {
			return this.result.css;
		}
		get css() {
			return this.result.css;
		}
		get map() {
			return this.result.map;
		}
		get messages() {
			return [];
		}
		get opts() {
			return this.result.opts;
		}
		get processor() {
			return this.result.processor;
		}
		get root() {
			if (this._root) return this._root;
			let e, t = r;
			try {
				e = t(this._css, this._opts);
			} catch (e) {
				this.error = e;
			}
			if (this.error) throw this.error;
			return this._root = e, e;
		}
		get [Symbol.toStringTag]() {
			return "NoWorkResult";
		}
		constructor(e, t, r) {
			t = t.toString(), this.stringified = !1, this._processor = e, this._css = t, this._opts = r, this._map = void 0;
			let o = a;
			this.result = new i(this._processor, void 0, this._opts), this.result.css = t;
			let s = this;
			Object.defineProperty(this.result, "root", { get() {
				return s.root;
			} });
			let c = new n(o, void 0, this._opts, t);
			if (c.isMap()) {
				let [e, t] = c.generate();
				e && (this.result.css = e), t && (this.result.map = t);
			} else c.clearAnnotation(), this.result.css = c.css;
		}
		async() {
			return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
		}
		catch(e) {
			return this.async().catch(e);
		}
		finally(e) {
			return this.async().then(e, e);
		}
		sync() {
			if (this.error) throw this.error;
			return this.result;
		}
		then(e, t) {
			return process.env.NODE_ENV !== "production" && ("from" in this._opts || o("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")), this.async().then(e, t);
		}
		toString() {
			return this._css;
		}
		warnings() {
			return [];
		}
	};
	t.exports = s, s.default = s;
})), yr = /* @__PURE__ */ _(((e, t) => {
	var n = nr(), r = _r(), i = vr(), a = or(), o = class {
		constructor(e = []) {
			this.version = "8.5.31", this.plugins = this.normalize(e);
		}
		normalize(e) {
			let t = [];
			for (let n of e) if (n.postcss === !0 ? n = n() : n.postcss && (n = n.postcss), typeof n == "object" && Array.isArray(n.plugins)) t = t.concat(n.plugins);
			else if (typeof n == "object" && n.postcssPlugin) t.push(n);
			else if (typeof n == "function") t.push(n);
			else if (typeof n == "object" && (n.parse || n.stringify)) {
				if (process.env.NODE_ENV !== "production") throw Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.");
			} else throw Error(n + " is not a PostCSS plugin");
			return t;
		}
		process(e, t = {}) {
			return !this.plugins.length && !t.parser && !t.stringifier && !t.syntax ? new i(this, e, t) : new r(this, e, t);
		}
		use(e) {
			return this.plugins = this.plugins.concat(this.normalize([e])), this;
		}
	};
	t.exports = o, o.default = o, a.registerProcessor(o), n.registerProcessor(o);
})), br = /* @__PURE__ */ _(((e, t) => {
	var n = tr(), r = Qn(), i = er(), a = qn(), o = $n(), s = nr(), c = lr(), l = ar(), u = _r(), d = sr(), f = Zn(), p = pr(), m = yr(), h = hr(), g = or(), _ = cr(), v = Yn(), y = mr();
	function b(...e) {
		return e.length === 1 && Array.isArray(e[0]) && (e = e[0]), new m(e);
	}
	b.plugin = function(e, t) {
		let n = !1;
		function r(...r) {
			console && console.warn && !n && (n = !0, console.warn(e + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"), process.env.LANG && process.env.LANG.startsWith("zh") && 
			/* c8 ignore next 7 */
			console.warn(e + ": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226"));
			let i = t(...r);
			return i.postcssPlugin = e, i.postcssVersion = new m().version, i;
		}
		let i;
		return Object.defineProperty(r, "postcss", { get() {
			return i ||= r(), i;
		} }), r.process = function(e, t, n) {
			return b([r(n)]).process(e, t);
		}, r;
	}, b.stringify = v, b.parse = p, b.fromJSON = c, b.list = d, b.comment = (e) => new r(e), b.atRule = (e) => new n(e), b.decl = (e) => new o(e), b.rule = (e) => new _(e), b.root = (e) => new g(e), b.document = (e) => new s(e), b.CssSyntaxError = a, b.Declaration = o, b.Container = i, b.Processor = m, b.Document = s, b.Comment = r, b.Warning = y, b.AtRule = n, b.Result = h, b.Input = l, b.Rule = _, b.Root = g, b.Node = f, u.registerPostcss(b), t.exports = b, b.default = b;
})), xr = /* @__PURE__ */ _(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs = r();
	})(n, (function() {
		var e = 1e3, t = 6e4, n = 36e5, r = "millisecond", i = "second", a = "minute", o = "hour", s = "day", c = "week", l = "month", u = "quarter", d = "year", f = "date", p = "Invalid Date", m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, g = {
			name: "en",
			weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
			ordinal: function(e) {
				var t = [
					"th",
					"st",
					"nd",
					"rd"
				], n = e % 100;
				return "[" + e + (t[(n - 20) % 10] || t[n] || t[0]) + "]";
			}
		}, _ = function(e, t, n) {
			var r = String(e);
			return !r || r.length >= t ? e : "" + Array(t + 1 - r.length).join(n) + e;
		}, v = {
			s: _,
			z: function(e) {
				var t = -e.utcOffset(), n = Math.abs(t), r = Math.floor(n / 60), i = n % 60;
				return (t <= 0 ? "+" : "-") + _(r, 2, "0") + ":" + _(i, 2, "0");
			},
			m: function e(t, n) {
				if (t.date() < n.date()) return -e(n, t);
				var r = 12 * (n.year() - t.year()) + (n.month() - t.month()), i = t.clone().add(r, l), a = n - i < 0, o = t.clone().add(r + (a ? -1 : 1), l);
				return +(-(r + (n - i) / (a ? i - o : o - i)) || 0);
			},
			a: function(e) {
				return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
			},
			p: function(e) {
				return {
					M: l,
					y: d,
					w: c,
					d: s,
					D: f,
					h: o,
					m: a,
					s: i,
					ms: r,
					Q: u
				}[e] || String(e || "").toLowerCase().replace(/s$/, "");
			},
			u: function(e) {
				return e === void 0;
			}
		}, y = "en", b = {};
		b[y] = g;
		var x = "$isDayjsObject", S = function(e) {
			return e instanceof E || !(!e || !e[x]);
		}, C = function e(t, n, r) {
			var i;
			if (!t) return y;
			if (typeof t == "string") {
				var a = t.toLowerCase();
				b[a] && (i = a), n && (b[a] = n, i = a);
				var o = t.split("-");
				if (!i && o.length > 1) return e(o[0]);
			} else {
				var s = t.name;
				b[s] = t, i = s;
			}
			return !r && i && (y = i), i || !r && y;
		}, w = function(e, t) {
			if (S(e)) return e.clone();
			var n = typeof t == "object" ? t : {};
			return n.date = e, n.args = arguments, new E(n);
		}, T = v;
		T.l = C, T.i = S, T.w = function(e, t) {
			return w(e, {
				locale: t.$L,
				utc: t.$u,
				x: t.$x,
				$offset: t.$offset
			});
		};
		var E = function() {
			function g(e) {
				this.$L = C(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[x] = !0;
			}
			var _ = g.prototype;
			return _.parse = function(e) {
				this.$d = function(e) {
					var t = e.date, n = e.utc;
					if (t === null) return /* @__PURE__ */ new Date(NaN);
					if (T.u(t)) return /* @__PURE__ */ new Date();
					if (t instanceof Date) return new Date(t);
					if (typeof t == "string" && !/Z$/i.test(t)) {
						var r = t.match(m);
						if (r) {
							var i = r[2] - 1 || 0, a = (r[7] || "0").substring(0, 3);
							return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a);
						}
					}
					return new Date(t);
				}(e), this.init();
			}, _.init = function() {
				var e = this.$d;
				this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
			}, _.$utils = function() {
				return T;
			}, _.isValid = function() {
				return this.$d.toString() !== p;
			}, _.isSame = function(e, t) {
				var n = w(e);
				return this.startOf(t) <= n && n <= this.endOf(t);
			}, _.isAfter = function(e, t) {
				return w(e) < this.startOf(t);
			}, _.isBefore = function(e, t) {
				return this.endOf(t) < w(e);
			}, _.$g = function(e, t, n) {
				return T.u(e) ? this[t] : this.set(n, e);
			}, _.unix = function() {
				return Math.floor(this.valueOf() / 1e3);
			}, _.valueOf = function() {
				return this.$d.getTime();
			}, _.startOf = function(e, t) {
				var n = this, r = !!T.u(t) || t, u = T.p(e), p = function(e, t) {
					var i = T.w(n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e), n);
					return r ? i : i.endOf(s);
				}, m = function(e, t) {
					return T.w(n.toDate()[e].apply(n.toDate("s"), (r ? [
						0,
						0,
						0,
						0
					] : [
						23,
						59,
						59,
						999
					]).slice(t)), n);
				}, h = this.$W, g = this.$M, _ = this.$D, v = "set" + (this.$u ? "UTC" : "");
				switch (u) {
					case d: return r ? p(1, 0) : p(31, 11);
					case l: return r ? p(1, g) : p(0, g + 1);
					case c:
						var y = this.$locale().weekStart || 0, b = (h < y ? h + 7 : h) - y;
						return p(r ? _ - b : _ + (6 - b), g);
					case s:
					case f: return m(v + "Hours", 0);
					case o: return m(v + "Minutes", 1);
					case a: return m(v + "Seconds", 2);
					case i: return m(v + "Milliseconds", 3);
					default: return this.clone();
				}
			}, _.endOf = function(e) {
				return this.startOf(e, !1);
			}, _.$set = function(e, t) {
				var n, c = T.p(e), u = "set" + (this.$u ? "UTC" : ""), p = (n = {}, n[s] = u + "Date", n[f] = u + "Date", n[l] = u + "Month", n[d] = u + "FullYear", n[o] = u + "Hours", n[a] = u + "Minutes", n[i] = u + "Seconds", n[r] = u + "Milliseconds", n)[c], m = c === s ? this.$D + (t - this.$W) : t;
				if (c === l || c === d) {
					var h = this.clone().set(f, 1);
					h.$d[p](m), h.init(), this.$d = h.set(f, Math.min(this.$D, h.daysInMonth())).$d;
				} else p && this.$d[p](m);
				return this.init(), this;
			}, _.set = function(e, t) {
				return this.clone().$set(e, t);
			}, _.get = function(e) {
				return this[T.p(e)]();
			}, _.add = function(r, u) {
				var f, p = this;
				r = Number(r);
				var m = T.p(u), h = function(e) {
					var t = w(p);
					return T.w(t.date(t.date() + Math.round(e * r)), p);
				};
				if (m === l) return this.set(l, this.$M + r);
				if (m === d) return this.set(d, this.$y + r);
				if (m === s) return h(1);
				if (m === c) return h(7);
				var g = (f = {}, f[a] = t, f[o] = n, f[i] = e, f)[m] || 1, _ = this.$d.getTime() + r * g;
				return T.w(_, this);
			}, _.subtract = function(e, t) {
				return this.add(-1 * e, t);
			}, _.format = function(e) {
				var t = this, n = this.$locale();
				if (!this.isValid()) return n.invalidDate || p;
				var r = e || "YYYY-MM-DDTHH:mm:ssZ", i = T.z(this), a = this.$H, o = this.$m, s = this.$M, c = n.weekdays, l = n.months, u = n.meridiem, d = function(e, n, i, a) {
					return e && (e[n] || e(t, r)) || i[n].slice(0, a);
				}, f = function(e) {
					return T.s(a % 12 || 12, e, "0");
				}, m = u || function(e, t, n) {
					var r = e < 12 ? "AM" : "PM";
					return n ? r.toLowerCase() : r;
				};
				return r.replace(h, (function(e, r) {
					return r || function(e) {
						switch (e) {
							case "YY": return String(t.$y).slice(-2);
							case "YYYY": return T.s(t.$y, 4, "0");
							case "M": return s + 1;
							case "MM": return T.s(s + 1, 2, "0");
							case "MMM": return d(n.monthsShort, s, l, 3);
							case "MMMM": return d(l, s);
							case "D": return t.$D;
							case "DD": return T.s(t.$D, 2, "0");
							case "d": return String(t.$W);
							case "dd": return d(n.weekdaysMin, t.$W, c, 2);
							case "ddd": return d(n.weekdaysShort, t.$W, c, 3);
							case "dddd": return c[t.$W];
							case "H": return String(a);
							case "HH": return T.s(a, 2, "0");
							case "h": return f(1);
							case "hh": return f(2);
							case "a": return m(a, o, !0);
							case "A": return m(a, o, !1);
							case "m": return String(o);
							case "mm": return T.s(o, 2, "0");
							case "s": return String(t.$s);
							case "ss": return T.s(t.$s, 2, "0");
							case "SSS": return T.s(t.$ms, 3, "0");
							case "Z": return i;
						}
						return null;
					}(e) || i.replace(":", "");
				}));
			}, _.utcOffset = function() {
				return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
			}, _.diff = function(r, f, p) {
				var m, h = this, g = T.p(f), _ = w(r), v = (_.utcOffset() - this.utcOffset()) * t, y = this - _, b = function() {
					return T.m(h, _);
				};
				switch (g) {
					case d:
						m = b() / 12;
						break;
					case l:
						m = b();
						break;
					case u:
						m = b() / 3;
						break;
					case c:
						m = (y - v) / 6048e5;
						break;
					case s:
						m = (y - v) / 864e5;
						break;
					case o:
						m = y / n;
						break;
					case a:
						m = y / t;
						break;
					case i:
						m = y / e;
						break;
					default: m = y;
				}
				return p ? m : T.a(m);
			}, _.daysInMonth = function() {
				return this.endOf(l).$D;
			}, _.$locale = function() {
				return b[this.$L];
			}, _.locale = function(e, t) {
				if (!e) return this.$L;
				var n = this.clone(), r = C(e, t, !0);
				return r && (n.$L = r), n;
			}, _.clone = function() {
				return T.w(this.$d, this);
			}, _.toDate = function() {
				return new Date(this.valueOf());
			}, _.toJSON = function() {
				return this.isValid() ? this.toISOString() : null;
			}, _.toISOString = function() {
				return this.$d.toISOString();
			}, _.toString = function() {
				return this.$d.toUTCString();
			}, g;
		}(), D = E.prototype;
		return w.prototype = D, [
			["$ms", r],
			["$s", i],
			["$m", a],
			["$H", o],
			["$W", s],
			["$M", l],
			["$y", d],
			["$D", f]
		].forEach((function(e) {
			D[e[1]] = function(t) {
				return this.$g(t, e[0], e[1]);
			};
		})), w.extend = function(e, t) {
			return e.$i ||= (e(t, E, w), !0), w;
		}, w.locale = C, w.isDayjs = S, w.unix = function(e) {
			return w(1e3 * e);
		}, w.en = b[y], w.Ls = b, w.p = {}, w;
	}));
})), Sr = /* @__PURE__ */ _(((e, t) => {
	var n = xr();
	function r(e) {
		for (e = e.replace(/[\x00-\x20]+/g, "");;) {
			let t = e.indexOf("<!--");
			if (t === -1) break;
			let n = e.indexOf("-->", t + 4);
			if (n === -1) break;
			e = e.substring(0, t) + e.substring(n + 3);
		}
		return e;
	}
	function i(e, t) {
		t ||= {};
		let n = t.allowedSchemes || [
			"http",
			"https",
			"ftp",
			"mailto",
			"tel",
			"sms"
		], i = t.allowProtocolRelative !== !1;
		if (typeof e != "string") return !1;
		e = r(e);
		let a = e.match(/^([a-zA-Z][a-zA-Z0-9.\-+]*):/);
		if (!a) return e.match(/^[/\\]{2}/) ? !i : !1;
		let o = a[1].toLowerCase();
		return n.indexOf(o) === -1;
	}
	t.exports = function(e) {
		let t = {};
		return t.options = e || {}, t.filterTag = t.options.filterTag || function(e) {
			return e = e.trim(), e.toLowerCase();
		}, t.string = function(e, t) {
			return typeof e != "string" && (typeof e == "number" || typeof e == "boolean" ? e += "" : e = ""), e = e.trim(), t !== void 0 && e === "" && (e = t), e;
		}, t.strings = function(e) {
			return Array.isArray(e) ? e.map(function(e) {
				return t.string(e);
			}) : [];
		}, t.integer = function(e, t, n, r) {
			if (t === void 0 && (t = 0), typeof e == "number") e = Math.floor(e);
			else try {
				e = parseInt(e, 10), isNaN(e) && (e = t);
			} catch {
				e = t;
			}
			return typeof n == "number" && e < n && (e = n), typeof r == "number" && e > r && (e = r), e;
		}, t.padInteger = function(e, t) {
			let n = e + "";
			for (; n.length < t;) n = "0" + n;
			return n;
		}, t.float = function(e, t, n, r) {
			if (t === void 0 && (t = 0), typeof e != "number") try {
				e = parseFloat(e, 10), isNaN(e) && (e = t);
			} catch {
				e = t;
			}
			return typeof n == "number" && e < n && (e = n), typeof r == "number" && e > r && (e = r), e;
		}, t.naughtyHref = i, t.url = function(e, n, a) {
			return e = t.string(e, n), e === n ? e : (e = r(e), i(e) || (e = o(e), e === null) ? n : e);
			function o(e) {
				return e.match(/^(((https?|ftp):\/\/)|((mailto|tel|sms):)|#|([^/.]+)?\/|[^/.]+$)/) ? e : e.match(/^[^/.]+\.[^/.]+/) ? (a ? "https://" : "http://") + e : null;
			}
		}, t.select = function(e, n, r) {
			if (e = t.string(e), !n || !n.length) return r;
			let i;
			return typeof n[0] == "object" ? (i = n.find(function(t) {
				return t.value === null || t.value === void 0 ? !1 : t.value.toString() === e;
			}), i == null ? r : i.value) : (i = n.find(function(t) {
				return t != null && t.toString() === e;
			}), i === void 0 ? r : i);
		}, t.boolean = function(e, n) {
			return e === !0 || e !== !1 && (e = t.string(e, n), e === n ? e !== void 0 && e : (e = e.toLowerCase().charAt(0), e === "" || e === "n" || e === "0" || e === "f" ? !1 : e === "t" || e === "y" || e === "1"));
		}, t.addBooleanFilterToCriteria = function(e, n, r, i) {
			i === void 0 && (i = null);
			let a = typeof e == "object" && e ? e[n] : e;
			a = a === void 0 ? i : a, a = t.booleanOrNull(a), a === null || (r[n] = a ? !0 : { $ne: !0 });
		}, t.booleanOrNull = function(e, n) {
			return e === !0 || e === !1 || e === null ? e : (e = t.string(e, n), e === n ? n === void 0 ? null : e : e === "null" ? null : (e = e.toLowerCase().charAt(0), e === "" || e === "n" || e === "0" || e === "f" ? !1 : e === "t" || e === "y" || e === "1" ? !0 : e === "a" ? null : n));
		}, t.date = function(e, r, i) {
			let a;
			function o() {
				return r === void 0 && (r = n().format("YYYY-MM-DD")), r;
			}
			if (typeof e == "string") {
				if (e.match(/\//)) {
					if (a = e.split("/"), a.length === 2) return (i || /* @__PURE__ */ new Date()).getFullYear() + "-" + t.padInteger(a[0], 2) + "-" + t.padInteger(a[1], 2);
					if (a.length === 3) {
						if (a[2] < 100) {
							let e = i || /* @__PURE__ */ new Date(), t = e.getFullYear() % 100, n = e.getFullYear() - t, r = parseInt(a[2]) + n;
							r - e.getFullYear() > 50 && (r -= 100), a[2] = r;
						}
						return t.padInteger(a[2], 4) + "-" + t.padInteger(a[0], 2) + "-" + t.padInteger(a[1], 2);
					}
					return o();
				}
				if (e.match(/-/)) return a = e.split("-"), a.length === 2 ? (i || /* @__PURE__ */ new Date()).getFullYear() + "-" + t.padInteger(a[0], 2) + "-" + t.padInteger(a[1], 2) : a.length === 3 ? t.padInteger(a[0], 4) + "-" + t.padInteger(a[1], 2) + "-" + t.padInteger(a[2], 2) : o();
			}
			try {
				return e === null || (e = i || new Date(e), isNaN(e.getTime())) ? o() : e.getFullYear() + "-" + t.padInteger(e.getMonth() + 1, 2) + "-" + t.padInteger(e.getDate(), 2);
			} catch {
				return o();
			}
		}, t.formatDate = function(e) {
			return n(e).format("YYYY-MM-DD");
		}, t.time = function(e, r) {
			e = t.string(e).toLowerCase(), e = e.trim();
			let i = e.match(/^(\d+)([:|.](\d+))?([:|.](\d+))?\s*(am|pm|AM|PM|a|p|A|M)?$/);
			if (i) {
				let e = parseInt(i[1], 10), n = i[3] === void 0 ? 0 : parseInt(i[3], 10), r = i[5] === void 0 ? 0 : parseInt(i[5], 10), a = i[6] ? i[6].toLowerCase() : i[6];
				return a &&= a.charAt(0), e === 12 && a === "a" ? e -= 12 : e === 12 && a === "p" || a === "p" && (e += 12), (e === 24 || e === "24") && (e = 0), t.padInteger(e, 2) + ":" + t.padInteger(n, 2) + ":" + t.padInteger(r, 2);
			}
			return r === void 0 ? n().format("HH:mm") : r;
		}, t.formatTime = function(e) {
			return n(e).format("HH:mm:ss");
		}, t.tags = function(e, n) {
			return typeof e == "string" && (e = e.split(/,\s*/)), Array.isArray(e) ? e.map((e) => t.string(e)).map(n || t.filterTag).filter((e) => e.length > 0) : [];
		}, t.idRegExp = t.options.idRegExp || /^[A-Za-z0-9_]+$/, t.id = function(e, n) {
			let r = t.string(e, n);
			return r === n || r.match(t.idRegExp) ? r : n;
		}, t.ids = function(e) {
			return Array.isArray(e) ? e.filter(function(e) {
				return t.id(e) !== void 0;
			}) : [];
		}, t;
	}, t.exports.naughtyHref = i;
})), Cr = /* @__PURE__ */ b((/* @__PURE__ */ _(((e, t) => {
	var n = (Hn(), x(Ln)), r = Un(), { isPlainObject: i } = Wn(), a = Gn(), { parse: o } = br(), { naughtyHref: s } = Sr(), c = [
		"img",
		"audio",
		"video",
		"picture",
		"svg",
		"object",
		"map",
		"iframe",
		"embed"
	], l = ["script", "style"], u = [
		"animate",
		"animatecolor",
		"animatemotion",
		"animatetransform",
		"set"
	], d = ["href"], f = [
		"debug",
		"info",
		"warn",
		"error"
	];
	function p(e) {
		let t = e && e.logger || console, n = {};
		for (let e of f) n[e] = typeof t[e] == "function" ? (...n) => t[e](...n) : (...t) => console[e](...t);
		return n;
	}
	function m(e, t) {
		e && Object.keys(e).forEach(function(n) {
			t(e[n], n);
		});
	}
	function h(e, t) {
		return {}.hasOwnProperty.call(e, t);
	}
	function g(e, t) {
		return !Array.isArray(e) || !Array.isArray(t) ? t : e.concat(t);
	}
	function _(e, t) {
		let n = Object.create(null);
		for (let r of [e, t]) for (let e of Object.keys(r)) n[e] = h(n, e) ? n[e].concat(r[e]) : r[e];
		return n;
	}
	function v(e, t) {
		let n = [];
		return m(e, function(e) {
			t(e) && n.push(e);
		}), n;
	}
	function y(e) {
		for (let t in e) if (h(e, t)) return !1;
		return !0;
	}
	function b(e) {
		return e.map(function(e) {
			if (!e.url) throw Error("URL missing");
			return e.url + (e.w ? ` ${e.w}w` : "") + (e.h ? ` ${e.h}h` : "") + (e.d ? ` ${e.d}x` : "");
		}).join(", ");
	}
	t.exports = w;
	var S = /^[^\0\t\n\f\r /<=>]+$/, C = 8;
	function w(e, t, f) {
		if (e == null) return "";
		let x = f && f.depth || 0, E = f && f.iframeFallbackDepth || 0;
		typeof e == "number" && (e = e.toString());
		let D = "", O = "";
		function ee(e, t) {
			let n = this;
			this.tag = e, this.attribs = t || {}, this.tagPosition = D.length, this.text = "", this.openingTagLength = 0, this.mediaChildren = [], this.updateParentNodeText = function() {
				if (P.length) {
					let e = P[P.length - 1];
					e.text += n.text;
				}
			}, this.updateParentNodeMediaChildren = function() {
				P.length && c.includes(this.tag) && P[P.length - 1].mediaChildren.push(this.tag);
			};
		}
		t = Object.assign({}, w.defaults, t), t.parser = Object.assign({}, T, t.parser);
		let te = p(t), k = function(e) {
			return t.allowedTags === !1 || (t.allowedTags || []).indexOf(e) > -1;
		};
		l.forEach(function(e) {
			k(e) && !t.allowVulnerableTags && te.warn(`Your \`allowedTags\` option includes \`${e}\`, which is inherently vulnerable to XSS attacks. Please remove it from \`allowedTags\`, or, to disable this warning, add the \`allowVulnerableTags\` option and ensure you are accounting for this risk.`);
		});
		let ne = t.nonTextTags || [
			"script",
			"style",
			"textarea",
			"option",
			"xmp"
		], A, j;
		t.allowedAttributes && (A = {}, j = {}, m(t.allowedAttributes, function(e, t) {
			A[t] = [];
			let n = [];
			e.forEach(function(e) {
				typeof e == "string" && e.indexOf("*") >= 0 ? n.push(r(e).replace(/\\\*/g, ".*")) : A[t].push(e);
			}), n.length && (j[t] = RegExp("^(" + n.join("|") + ")$"));
		}));
		let M = {}, re = {}, ie = {};
		m(t.allowedClasses, function(e, t) {
			if (A && (h(A, t) || (A[t] = []), A[t].push("class")), M[t] = e, Array.isArray(e)) {
				let n = [];
				M[t] = [], ie[t] = [], e.forEach(function(e) {
					typeof e == "string" && e.indexOf("*") >= 0 ? n.push(r(e).replace(/\\\*/g, ".*")) : e instanceof RegExp ? ie[t].push(e) : M[t].push(e);
				}), n.length && (re[t] = RegExp("^(" + n.join("|") + ")$"));
			}
		});
		let ae = {}, oe;
		m(t.transformTags, function(e, t) {
			let n;
			typeof e == "function" ? n = e : typeof e == "string" && (n = w.simpleTransform(e)), t === "*" ? oe = n : ae[t] = n;
		});
		let N, P, se, ce, F, le, ue, I, L = !1;
		z();
		let R = new n.Parser({
			onopentag: function(e, n) {
				if (t.onOpenTag && t.onOpenTag(e, n), de(), t.enforceHtmlBoundary && e === "html" && z(), I) return;
				if (F) {
					le++;
					return;
				}
				let r = new ee(e, n);
				P.push(r);
				let s = !1, c = !!r.text, l;
				if (h(ae, e) && (l = ae[e](e, n), r.attribs = n = l.attribs, l.text !== void 0 && (r.innerText = l.text), e !== l.tagName && (r.name = e = l.tagName, ce[N] = l.tagName)), oe && (l = oe(e, n), r.attribs = n = l.attribs, e !== l.tagName && (r.name = e = l.tagName, ce[N] = l.tagName)), (!k(e) || U(e, n) || t.disallowedTagsMode === "recursiveEscape" && !y(se) || t.nestingLimit != null && N >= t.nestingLimit) && (s = !0, se[N] = !0, (t.disallowedTagsMode === "discard" || t.disallowedTagsMode === "completelyDiscard") && ne.indexOf(e) !== -1 && (F = !0, le = 1, r.tag.toLowerCase() === "noscript" && (ue = fe("noscript", R.endIndex + 1)))), N++, s) {
					if (t.disallowedTagsMode === "discard" || t.disallowedTagsMode === "completelyDiscard") {
						if (r.innerText && !c) {
							let n = B(r.innerText);
							t.textFilter ? D += t.textFilter(n, e) : D += n, L = !0;
						}
						return;
					}
					O = D, D = "";
				}
				if (D += "<" + e, e === "script" && (t.allowedScriptHostnames || t.allowedScriptDomains) && (r.innerText = ""), s && (t.disallowedTagsMode === "escape" || t.disallowedTagsMode === "recursiveEscape") && t.preserveEscapedAttributes ? m(n, function(e, t) {
					D += " " + t + "=\"" + B(e || "", !0) + "\"";
				}) : (!A || h(A, e) || A["*"]) && m(n, function(s, c) {
					if (!S.test(c) || s === "" && !t.allowedEmptyAttributes.includes(c) && (t.nonBooleanAttributes.includes(c) || t.nonBooleanAttributes.includes("*"))) {
						delete r.attribs[c];
						return;
					}
					let l = !1;
					if (!A || h(A, e) && A[e].indexOf(c) !== -1 || A["*"] && A["*"].indexOf(c) !== -1 || h(j, e) && j[e].test(c) || j["*"] && j["*"].test(c)) l = !0;
					else if (A && A[e]) {
						for (let t of A[e]) if (i(t) && t.name && t.name === c) {
							l = !0;
							let e = "";
							if (t.multiple === !0) {
								let n = s.split(" ");
								for (let r of n) t.values.indexOf(r) !== -1 && (e === "" ? e = r : e += " " + r);
							} else t.values.indexOf(s) >= 0 && (e = s);
							s = e;
						}
					}
					if (l) {
						if (t.allowedSchemesAppliedToAttributes.indexOf(c) !== -1 && V(e, s) || e === "meta" && c.toLowerCase() === "content" && pe(n) && H(s)) {
							delete r.attribs[c];
							return;
						}
						if (e === "script" && c === "src") {
							let e = !0;
							try {
								let n = G(s);
								if (t.allowedScriptHostnames || t.allowedScriptDomains) {
									let r = (t.allowedScriptHostnames || []).find(function(e) {
										return e === n.url.hostname;
									}), i = (t.allowedScriptDomains || []).find(function(e) {
										return n.url.hostname === e || n.url.hostname.endsWith(`.${e}`);
									});
									e = r || i;
								}
							} catch {
								e = !1;
							}
							if (!e) {
								delete r.attribs[c];
								return;
							}
						}
						if (e === "iframe" && c === "src") {
							let e = !0;
							try {
								let n = G(s);
								if (n.isRelativeUrl) e = h(t, "allowIframeRelativeUrls") ? t.allowIframeRelativeUrls : !t.allowedIframeHostnames && !t.allowedIframeDomains;
								else if (t.allowedIframeHostnames || t.allowedIframeDomains) {
									let r = (t.allowedIframeHostnames || []).find(function(e) {
										return e === n.url.hostname;
									}), i = (t.allowedIframeDomains || []).find(function(e) {
										return n.url.hostname === e || n.url.hostname.endsWith(`.${e}`);
									});
									e = r || i;
								}
							} catch {
								e = !1;
							}
							if (!e) {
								delete r.attribs[c];
								return;
							}
						}
						if (c === "srcset" || c === "imagesrcset") try {
							let t = a(s);
							if (t.forEach(function(t) {
								V(e, t.url) && (t.evil = !0);
							}), t = v(t, function(e) {
								return !e.evil;
							}), t.length) s = b(v(t, function(e) {
								return !e.evil;
							})), r.attribs[c] = s;
							else {
								delete r.attribs[c];
								return;
							}
						} catch {
							delete r.attribs[c];
							return;
						}
						if (c === "class") {
							let t = M[e], n = M["*"], i = re[e], a = ie[e], o = ie["*"], l = [i, re["*"]].concat(a, o).filter(function(e) {
								return e;
							});
							if (s = t && n ? _e(s, g(t, n), l) : _e(s, t || n, l), !s.length) {
								delete r.attribs[c];
								return;
							}
						}
						if (c === "style") {
							if (t.parseStyleAttributes) try {
								if (s = he(me(o(e + " {" + s + "}", { map: !1 }), t.allowedStyles)), s.length === 0) {
									delete r.attribs[c];
									return;
								}
							} catch {
								typeof window < "u" && te.warn(`Failed to parse "${e} {${s}}". If you are running this in a browser, we recommend disabling style parsing with the parseStyleAttributes option, since it only works in a node environment due to a postcss dependency. More info: https://github.com/apostrophecms/sanitize-html/issues/547`), delete r.attribs[c];
								return;
							}
							else if (t.allowedStyles) throw Error("allowedStyles option cannot be used together with parseStyleAttributes: false.");
						}
						D += " " + c, s && s.length ? D += "=\"" + B(s, !0) + "\"" : t.allowedEmptyAttributes.includes(c) && (D += "=\"\"");
					} else delete r.attribs[c];
				}), t.selfClosing.indexOf(e) !== -1) D += " />";
				else if (D += ">", r.innerText && !c) {
					let n = B(r.innerText);
					t.textFilter ? D += t.textFilter(n, e) : D += n, L = !0;
				}
				s && (D = O + B(D), O = ""), r.openingTagLength = D.length - r.tagPosition;
			},
			ontext: function(e) {
				if (de(), F || I) return;
				let n = P[P.length - 1], r;
				if (n && (r = n.tag, e = n.innerText === void 0 ? e : n.innerText), t.disallowedTagsMode === "completelyDiscard" && !k(r)) e = "";
				else if (r && k(r) && (t.disallowedTagsMode === "discard" || t.disallowedTagsMode === "completelyDiscard") && (r === "script" || r === "style")) D += e;
				else if (r && k(r) && (t.disallowedTagsMode === "discard" || t.disallowedTagsMode === "completelyDiscard") && (r === "textarea" || r === "xmp")) D += r === "xmp" ? e.replace(/</g, "&lt;").replace(/>/g, "&gt;") : B(e, !1);
				else if (r === "iframe" && !k(r) && t.disallowedTagsMode === "discard" && E < C) D += w(e, t, {
					depth: N,
					iframeFallbackDepth: E + 1
				});
				else if (!L) {
					let n = B(e, !1);
					t.textFilter ? D += t.textFilter(n, r) : D += n;
				}
				if (P.length) {
					let t = P[P.length - 1];
					t.text += e;
				}
			},
			onclosetag: function(e, n) {
				if (t.onCloseTag && t.onCloseTag(e, n), de(), I) {
					let t = P[P.length - 1];
					if (!t || t.tag !== e) return;
				} else if (F) {
					if (le--, !le) F = !1, ue !== null && (I = !0);
					else return;
				}
				let r = P.pop();
				if (!r) return;
				if (r.tag !== e) {
					P.push(r);
					return;
				}
				F = t.enforceHtmlBoundary ? e === "html" : !1, N--;
				let i = se[N];
				if (i) {
					if (delete se[N], t.disallowedTagsMode === "discard" || t.disallowedTagsMode === "completelyDiscard") {
						r.updateParentNodeText();
						return;
					}
					O = D, D = "";
				}
				if (ce[N] && (e = ce[N], delete ce[N]), t.exclusiveFilter) {
					let e = t.exclusiveFilter(r);
					if (e === "excludeTag") {
						i && (D = O, O = ""), D = D.substring(0, r.tagPosition) + D.substring(r.tagPosition + r.openingTagLength);
						return;
					}
					if (e) {
						D = D.substring(0, r.tagPosition);
						return;
					}
				}
				r.updateParentNodeMediaChildren(), r.updateParentNodeText(), t.selfClosing.indexOf(e) !== -1 || n && !k(e) && ["escape", "recursiveEscape"].indexOf(t.disallowedTagsMode) >= 0 ? i && (D = O, O = "") : (D += "</" + e + ">", i && (D = O + B(D), O = ""), L = !1);
			}
		}, t.parser);
		if (R.write(e), R.end(), t.disallowedTagsMode === "escape" || t.disallowedTagsMode === "recursiveEscape") {
			let t = R.endIndex;
			if (t != null && t >= 0 && t < e.length) {
				let n = e.substring(t);
				D += B(n);
			} else (t == null || t < 0) && e.length > 0 && D === "" && (D = B(e));
		}
		return D;
		function z() {
			D = "", N = x, P = [], se = {}, ce = {}, F = !1, le = 0, ue = null, I = !1;
		}
		function de() {
			ue !== null && R.startIndex >= ue && (ue = null, I = !1);
		}
		function fe(t, n) {
			let r = RegExp("</" + t + "[\\t\\n\\f\\r />]", "ig");
			r.lastIndex = n;
			let i = r.exec(e);
			return i ? i.index : Infinity;
		}
		function B(e, n) {
			return typeof e != "string" && (e += ""), t.parser.decodeEntities && (e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), n && (e = e.replace(/"/g, "&quot;"))), e = e.replace(/&(?![a-zA-Z0-9#]{1,20};)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), n && (e = e.replace(/"/g, "&quot;")), e;
		}
		function V(e, n) {
			return s(n, {
				allowedSchemes: h(t.allowedSchemesByTag, e) ? t.allowedSchemesByTag[e] : t.allowedSchemes || [],
				allowProtocolRelative: t.allowProtocolRelative
			});
		}
		function pe(e) {
			return Object.keys(e).some(function(t) {
				return t.toLowerCase() === "http-equiv" && String(e[t]).trim().toLowerCase() === "refresh";
			});
		}
		function H(e) {
			let t = String(e), n = function(e) {
				return e === " " || e === "	" || e === "\n" || e === "\f" || e === "\r";
			}, r = 0, i = function() {
				for (; r < t.length && n(t[r]);) r++;
			}, a = function(e) {
				return (t[e] || "").toLowerCase();
			};
			i();
			let o = r;
			for (; r < t.length && /[0-9.]/.test(t[r]);) r++;
			if (r === o) return !0;
			if (r < t.length) {
				let e = t[r];
				if (e !== ";" && e !== "," && !n(e)) return !0;
				i(), (t[r] === ";" || t[r] === ",") && r++, i();
			}
			if (r >= t.length) return !1;
			let s = t.slice(r), c = !0;
			if (a(r) === "u" && (c = !1, a(r + 1) === "r" && a(r + 2) === "l" && (r += 3, i(), t[r] === "=" && (r++, i(), c = !0))), c) {
				let e = t[r];
				if ((e === "\"" || e === "'") && r++, s = t.slice(r), e === "\"" || e === "'") {
					let t = s.indexOf(e);
					t !== -1 && (s = s.slice(0, t));
				}
			}
			return V("meta", s);
		}
		function U(e, n) {
			if (u.indexOf(W(e)) === -1) return !1;
			let r = t.allowedSchemesAppliedToAttributes || [];
			return Object.keys(n || {}).some(function(e) {
				if (W(e) !== "attributename") return !1;
				let t = (n[e] || "").trim().toLowerCase(), i = t.slice(t.lastIndexOf(":") + 1);
				return d.indexOf(i) !== -1 || r.indexOf(t) !== -1 || r.indexOf(i) !== -1;
			});
		}
		function W(e) {
			let t = e.toLowerCase();
			return t.slice(t.lastIndexOf(":") + 1);
		}
		function G(e) {
			if (e = e.replace(/^(\w+:)?\s*[\\/]\s*[\\/]/, "$1//"), e.startsWith("relative:")) throw Error("relative: exploit attempt");
			let t = "relative://relative-site";
			for (let e = 0; e < 100; e++) t += `/${e}`;
			let n = new URL(e, t);
			return {
				isRelativeUrl: n && n.hostname === "relative-site" && n.protocol === "relative:",
				url: n
			};
		}
		function me(e, t) {
			if (!t) return e;
			let n = e.nodes[0], r;
			return r = t[n.selector] && t["*"] ? _(t[n.selector], t["*"]) : t[n.selector] || t["*"], r && (e.nodes[0].nodes = n.nodes.reduce(ge(r), [])), e;
		}
		function he(e) {
			return e.nodes[0].nodes.reduce(function(e, t) {
				return e.push(`${t.prop}:${t.value}${t.important ? " !important" : ""}`), e;
			}, []).join(";");
		}
		function ge(e) {
			return function(t, n) {
				return h(e, n.prop) && e[n.prop].some(function(e) {
					return e.test(n.value);
				}) && t.push(n), t;
			};
		}
		function _e(e, t, n) {
			return t ? (e = e.split(/\s+/), e.filter(function(e) {
				return t.indexOf(e) !== -1 || n.some(function(t) {
					return t.test(e);
				});
			}).join(" ")) : e;
		}
	}
	var T = { decodeEntities: !0 };
	w.defaults = {
		allowedTags: /* @__PURE__ */ "address.article.aside.footer.header.h1.h2.h3.h4.h5.h6.hgroup.main.nav.section.blockquote.dd.div.dl.dt.figcaption.figure.hr.li.menu.ol.p.pre.ul.a.abbr.b.bdi.bdo.br.cite.code.data.dfn.em.i.kbd.mark.q.rb.rp.rt.rtc.ruby.s.samp.small.span.strong.sub.sup.time.u.var.wbr.caption.col.colgroup.table.tbody.td.tfoot.th.thead.tr".split("."),
		nonBooleanAttributes: /* @__PURE__ */ "abbr.accept.accept-charset.accesskey.action.allow.alt.as.autocapitalize.autocomplete.blocking.charset.cite.class.color.cols.colspan.content.contenteditable.coords.crossorigin.data.datetime.decoding.dir.dirname.download.draggable.enctype.enterkeyhint.fetchpriority.for.form.formaction.formenctype.formmethod.formtarget.headers.height.hidden.high.href.hreflang.http-equiv.id.imagesizes.imagesrcset.inputmode.integrity.is.itemid.itemprop.itemref.itemtype.kind.label.lang.list.loading.low.max.maxlength.media.method.min.minlength.name.nonce.optimum.pattern.ping.placeholder.popover.popovertarget.popovertargetaction.poster.preload.referrerpolicy.rel.rows.rowspan.sandbox.scope.shape.size.sizes.slot.span.spellcheck.src.srcdoc.srclang.srcset.start.step.style.tabindex.target.title.translate.type.usemap.value.width.wrap.onauxclick.onafterprint.onbeforematch.onbeforeprint.onbeforeunload.onbeforetoggle.onblur.oncancel.oncanplay.oncanplaythrough.onchange.onclick.onclose.oncontextlost.oncontextmenu.oncontextrestored.oncopy.oncuechange.oncut.ondblclick.ondrag.ondragend.ondragenter.ondragleave.ondragover.ondragstart.ondrop.ondurationchange.onemptied.onended.onerror.onfocus.onformdata.onhashchange.oninput.oninvalid.onkeydown.onkeypress.onkeyup.onlanguagechange.onload.onloadeddata.onloadedmetadata.onloadstart.onmessage.onmessageerror.onmousedown.onmouseenter.onmouseleave.onmousemove.onmouseout.onmouseover.onmouseup.onoffline.ononline.onpagehide.onpageshow.onpaste.onpause.onplay.onplaying.onpopstate.onprogress.onratechange.onreset.onresize.onrejectionhandled.onscroll.onscrollend.onsecuritypolicyviolation.onseeked.onseeking.onselect.onslotchange.onstalled.onstorage.onsubmit.onsuspend.ontimeupdate.ontoggle.onunhandledrejection.onunload.onvolumechange.onwaiting.onwheel".split("."),
		disallowedTagsMode: "discard",
		allowedAttributes: {
			a: [
				"href",
				"name",
				"target"
			],
			img: [
				"src",
				"srcset",
				"alt",
				"title",
				"width",
				"height",
				"loading"
			]
		},
		allowedEmptyAttributes: ["alt"],
		selfClosing: [
			"img",
			"br",
			"hr",
			"area",
			"base",
			"basefont",
			"input",
			"link",
			"meta",
			"col"
		],
		allowedSchemes: [
			"http",
			"https",
			"ftp",
			"mailto",
			"tel"
		],
		allowedSchemesByTag: {},
		allowedSchemesAppliedToAttributes: [
			"href",
			"src",
			"cite",
			"action",
			"formaction",
			"data",
			"xlink:href",
			"poster",
			"background",
			"ping",
			"longdesc",
			"usemap",
			"codebase",
			"classid",
			"archive",
			"profile",
			"manifest",
			"itemid",
			"dynsrc",
			"lowsrc"
		],
		allowProtocolRelative: !0,
		enforceHtmlBoundary: !1,
		parseStyleAttributes: !0,
		preserveEscapedAttributes: !1
	}, w.simpleTransform = function(e, t, n) {
		return n = n === void 0 || n, t ||= {}, function(r, i) {
			let a;
			if (n) for (a in t) i[a] = t[a];
			else i = t;
			return {
				tagName: e,
				attribs: i
			};
		};
	};
})))(), 1), wr = [
	"http",
	"https",
	"mailto",
	"tel"
];
function Tr(e, t = wr) {
	let n = e?.trim();
	if (!n || n.startsWith("//") || /[\u0000-\u001F\u007F]/.test(n)) return;
	let r = n.match(/^([a-z][a-z0-9+.-]*):/i)?.[1]?.toLowerCase();
	return !r || t.includes(r) ? n : void 0;
}
function Er(e) {
	return (0, Cr.default)(e ?? "", {
		allowedTags: /* @__PURE__ */ "p.br.strong.b.em.i.u.s.del.code.pre.blockquote.ul.ol.li.h1.h2.h3.h4.h5.h6.a.table.thead.tbody.tfoot.tr.th.td.caption.img.hr.sub.sup.abbr".split("."),
		allowedAttributes: {
			"*": [
				"id",
				"lang",
				"dir"
			],
			a: [
				"href",
				"title",
				"target",
				"rel",
				"hreflang",
				"class"
			],
			abbr: ["title"],
			img: [
				"src",
				"alt",
				"title",
				"width",
				"height",
				"loading"
			],
			ol: [
				"start",
				"reversed",
				"type"
			],
			li: ["value"],
			th: [
				"colspan",
				"rowspan",
				"scope",
				"headers"
			],
			td: [
				"colspan",
				"rowspan",
				"headers"
			]
		},
		allowedSchemes: wr,
		allowedSchemesByTag: { img: ["http", "https"] },
		allowProtocolRelative: !1,
		transformTags: { a: (e, t) => {
			if (t.class = "underline underline-offset-4 decoration-1 hover:decoration-2", t.target === "_blank") {
				let e = new Set((t.rel ?? "").split(/\s+/).filter(Boolean));
				e.add("noopener"), e.add("noreferrer"), t.rel = [...e].join(" ");
			}
			return {
				tagName: "a",
				attribs: t
			};
		} }
	});
}
// src/components/RichText/RichText.tsx
var Dr = {
	paragraph: (e, t) => /* @__PURE__ */ s("p", {
		className: "mb-4",
		children: t
	}),
	heading: (e, t, n) => {
		let r = e.tag || "h2", i = n.headingPlan.ids.get(e) ?? "heading";
		return /* @__PURE__ */ s(r, {
			id: i,
			className: "font-bold mt-6 mb-2",
			children: t
		});
	},
	text: (e) => {
		let t = e.text;
		return e.format && (e.format & 1 && (t = /* @__PURE__ */ s("strong", { children: t })), e.format & 2 && (t = /* @__PURE__ */ s("em", { children: t })), e.format & 4 && (t = /* @__PURE__ */ s("s", { children: t })), e.format & 8 && (t = /* @__PURE__ */ s("u", { children: t })), e.format & 16 && (t = /* @__PURE__ */ s("code", { children: t })), e.format & 32 && (t = /* @__PURE__ */ s("sub", { children: t })), e.format & 64 && (t = /* @__PURE__ */ s("sup", { children: t }))), /* @__PURE__ */ s(o, { children: t });
	},
	linebreak: () => /* @__PURE__ */ s("br", {}),
	link: (e, t) => {
		let n = Tr(e.fields?.url);
		return n ? /* @__PURE__ */ s("a", {
			href: n,
			target: e.fields?.newTab ? "_blank" : void 0,
			rel: e.fields?.newTab ? "noopener noreferrer" : void 0,
			className: "underline underline-offset-4 decoration-1 hover:decoration-2",
			children: t
		}) : /* @__PURE__ */ s(o, { children: t });
	},
	list: (e, t) => {
		let n = e.tag || "ul";
		return /* @__PURE__ */ s(n, {
			className: "ml-6",
			children: t
		});
	},
	listitem: (e, t) => /* @__PURE__ */ s("li", { children: t }),
	quote: (e, t) => /* @__PURE__ */ s("blockquote", { children: t }),
	horizontalrule: () => /* @__PURE__ */ s("hr", { className: "my-6" }),
	upload: (e) => {
		let t = e.value, n = Tr(t?.url, ["http", "https"]);
		return n ? /* @__PURE__ */ s("img", {
			src: n,
			alt: t?.alt || "",
			className: "my-4 rounded-lg shadow"
		}) : null;
	},
	block: (e, t, n) => {
		let r = e.fields?.blockType;
		if (r === "DisclosureWidget") {
			let t = e.fields?.content?.root?.children || [];
			return /* @__PURE__ */ c("details", { children: [/* @__PURE__ */ s("summary", {
				className: "cursor-pointer font-bold text-2xl",
				children: e.fields?.heading || "Details"
			}), /* @__PURE__ */ s("div", {
				className: "details-content",
				children: kr(t, n)
			})] });
		}
		if (r === "ContentBox") {
			let t = e.fields?.boxContent?.root?.children || [], r = n.headingPlan.ids.get(e) ?? "content-box", i = e.fields?.cssClass, a = e.fields?.cssClass === "box-gradient" ? "gradient-border-light dark:gradient-border-dark" : "";
			return /* @__PURE__ */ c("div", {
				className: `${i} ${a}`,
				children: [/* @__PURE__ */ s("h2", {
					id: r,
					children: e.fields?.heading
				}), /* @__PURE__ */ s("div", {
					className: "content-box--inner-wrapper",
					children: kr(t, n)
				})]
			});
		}
		return r === "CodeBlock" ? e.fields?.renderField ? /* @__PURE__ */ s("div", {
			className: "richtext-html-block",
			dangerouslySetInnerHTML: { __html: Er(e.fields?.HTMLContent) }
		}) : /* @__PURE__ */ s("code", {
			className: "w-full my-2 block",
			children: e.fields?.HTMLContent
		}) : r === "quoteWithCite" ? /* @__PURE__ */ c("blockquote", { children: [e.fields?.quote, /* @__PURE__ */ s("cite", { children: e.fields?.cite })] }) : null;
	},
	inlineBlock: (e) => {
		let t = e.fields?.blockType;
		return t === "language" ? /* @__PURE__ */ s("span", {
			lang: e.fields?.language || "en",
			children: e.fields?.languageContent
		}) : t === "abbreviation" ? /* @__PURE__ */ s("abbr", {
			title: e.fields?.definition ?? void 0,
			children: e.fields?.abbreviation
		}) : null;
	}
};
function Or(t, n, r) {
	let i = t.children?.map((e, t) => Or(e, t, r)) || [];
	return Dr[t.type] ? /* @__PURE__ */ s(e.Fragment, { children: Dr[t.type](t, i, r) }, n) : /* @__PURE__ */ c("span", {
		className: "bg-red-100 text-red-700",
		children: [
			"[Unhandled node type: ",
			t.type,
			"]"
		]
	}, n);
}
function kr(e, t) {
	return e.map((e, n) => Or(e, n, t));
}
function Ar(e) {
	return e === "fi" ? "Tällä sivulla" : "On this page";
}
function jr({ nodes: e, lang: t, withTOC: n = !1, tocLabel: i }) {
	let a = r(() => D(e), [e]), l = i ?? Ar(t);
	return n ? /* @__PURE__ */ s(o, { children: a.tocEntries.length > 0 && /* @__PURE__ */ c("div", {
		className: "toc-box",
		children: [/* @__PURE__ */ s("h2", {
			id: "toc-heading",
			className: "mb-2 mt-0",
			children: l
		}), /* @__PURE__ */ s("nav", {
			"aria-labelledby": "toc-heading",
			children: /* @__PURE__ */ s("ul", {
				className: "ml-4 mb-0",
				children: a.tocEntries.map((e) => /* @__PURE__ */ s("li", { children: /* @__PURE__ */ s("a", {
					href: `#${e.id}`,
					className: "text-blue-600 underline",
					children: e.text
				}) }, e.id))
			})
		})]
	}) }) : /* @__PURE__ */ s(o, { children: kr(e, {
		lang: t,
		headingPlan: a
	}) });
}
// src/lib/searchUrlState.ts
function Mr(e) {
	return e.trim();
}
function Nr(e) {
	return Mr(e.searchParams.get("q") ?? "");
}
function Pr(e, t) {
	let n = Mr(t), r = new URL(e), i = Nr(e) !== n;
	return r.searchParams.delete("q"), n && r.searchParams.set("q", n), {
		query: n,
		url: r,
		changed: i
	};
}
// src/components/SearchComponent/SearchComponent.tsx
async function Fr(e, t, n, r) {
	let i = `${e}/api/search?${n ? `locale=${n}` : ""}&pagination=false&${t}`, a = await fetch(i, { signal: r });
	if (!a.ok) throw Error(`Search request failed: ${a.status}`);
	return a.json();
}
function Ir(e, t) {
	let n = [
		"reqpages",
		"criteria",
		"guidelines",
		"principles"
	], r = t === "en" ? "I would if I could" : "Toki, jos voisin";
	return n.includes(e) && (r = t === "en" ? "Almost, but not quite" : "Melkein, mutta ei ihan"), r;
}
function Lr(e, t) {
	return {
		criteria: {
			fi: "WCAG-kriteeri",
			en: "WCAG criterion"
		},
		guidelines: {
			fi: "WCAG-ohje",
			en: "WCAG guideline"
		},
		principles: {
			fi: "WCAG-periaate",
			en: "WCAG principle"
		}
	}[e]?.[t === "fi" ? "fi" : "en"] ?? "";
}
var Rr = {
	status: "idle",
	submittedQuery: "",
	results: null
};
function zr({ searchLabel: e, searchButton: r, searchMainHeading: o, searchResultLabel: u, searchNoResults: d, searchLoading: f, searchError: p, searchLocale: m, searchSiteName: h, searchContentType: g, payloadUrl: _, defaultResultBaseUrl: v = "/", resultBaseUrls: y = {} }) {
	let [b, x] = a(""), [S, C] = a(Rr), w = i(null), T = i(0), E = i(null);
	function D(e) {
		return y[e] ?? v;
	}
	let O = t((e = !0) => {
		w.current?.abort(), w.current = null, T.current += 1, e && x(""), C(Rr);
	}, []), ee = t(async (e) => {
		w.current?.abort();
		let t = new AbortController(), n = T.current + 1;
		w.current = t, T.current = n, C({
			status: "loading",
			submittedQuery: e,
			results: null
		});
		let r = { where: { and: [{ or: [
			{ title: { like: e } },
			{ searchLead: { like: e } },
			{ searchContent: { like: e } },
			{ searchDescription: { like: e } }
		] }] } };
		try {
			let i = await Fr(_, l(r), m, t.signal);
			if (T.current !== n) return;
			w.current = null, C({
				status: "success",
				submittedQuery: e,
				results: i
			});
		} catch (r) {
			if (t.signal.aborted || T.current !== n || r instanceof Error && r.name === "AbortError") return;
			w.current = null, console.error(r), C({
				status: "error",
				submittedQuery: e,
				results: null
			});
		}
	}, [_, m]);
	n(() => {
		let e = () => {
			let e = Nr(new URL(window.location.href));
			x(e), e ? ee(e) : O(!1);
		};
		return e(), window.addEventListener("popstate", e), () => {
			window.removeEventListener("popstate", e), w.current?.abort(), T.current += 1;
		};
	}, [O, ee]);
	let te = async (e) => {
		e.preventDefault();
		let t = Pr(new URL(window.location.href), b);
		x(t.query), t.changed && window.history.pushState({}, "", t.url), E.current?.focus(), t.query ? await ee(t.query) : O();
	}, k = S.results?.totalDocs ?? 0, ne = S.status === "loading", A = S.status === "success" && k > 0, j = S.status === "success" && k === 0, M = "";
	return ne ? M = f : A ? M = `${k} ${u}` : j && (M = d), /* @__PURE__ */ c("div", { children: [
		/* @__PURE__ */ s("div", {
			className: "text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl",
			children: /* @__PURE__ */ c("form", {
				id: "site-search",
				onSubmit: te,
				role: "search",
				"aria-busy": ne ? "true" : void 0,
				className: "flex flex-col flex-wrap w-full md:items-center md:gap-x-6 md:gap-y-2 md:flex-row",
				children: [
					/* @__PURE__ */ s("label", {
						htmlFor: "search-input",
						className: "text-lt-gray dark:text-dk-gray w-full",
						children: e
					}),
					/* @__PURE__ */ s("input", {
						ref: E,
						id: "search-input",
						type: "text",
						value: b,
						className: "w-full md:max-w-sm",
						onChange: (e) => x(e.currentTarget.value)
					}),
					/* @__PURE__ */ s("button", {
						type: "submit",
						disabled: ne,
						className: "button item--transition max-md:my-4",
						children: r
					})
				]
			})
		}),
		/* @__PURE__ */ s("div", {
			className: "sr-only",
			role: "status",
			"aria-live": "polite",
			"aria-atomic": "true",
			children: M
		}),
		/* @__PURE__ */ c("div", {
			className: "text-lt-gray dark:text-dk-gray pt-4 pb-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl",
			children: [
				/* @__PURE__ */ s("div", {
					role: "alert",
					children: S.status === "error" ? p : ""
				}),
				A && /* @__PURE__ */ s("div", {
					className: "border-t-4 gradient-border-light dark:gradient-border-dark pt-4",
					children: /* @__PURE__ */ c("h2", { children: [
						o,
						" ",
						S.submittedQuery,
						",",
						" ",
						k,
						" ",
						u
					] })
				}),
				A && S.results && /* @__PURE__ */ s("ul", { children: S.results.docs.map((e, t) => {
					let n = Ir(e.doc.relationTo, m), r = Lr(e.doc.relationTo, m), i = D(e.doc.relationTo);
					return /* @__PURE__ */ c("li", {
						className: "my-2 py-6 flex flex-col border-t-2",
						children: [
							/* @__PURE__ */ s("a", {
								className: "my-2 text-xl order-3 inline-flex items-baseline self-start",
								href: `${i}${m}/${e.searchPageUrl}/`,
								children: /* @__PURE__ */ s("h3", {
									className: "search-heading mt-0 mb-0.5 text-lg lg:text-xl inline",
									children: e.title
								})
							}),
							/* @__PURE__ */ c("span", {
								className: "w-full self-end text-sm text-right order-1",
								children: [
									h,
									" ",
									n
								]
							}),
							r && /* @__PURE__ */ c("span", {
								className: "w-full self-end text-sm order-2",
								children: [
									g,
									" ",
									r
								]
							}),
							/* @__PURE__ */ s("span", {
								className: "block text-lg order-4",
								children: e.searchDescription
							})
						]
					}, `result-${t}`);
				}) }),
				j && /* @__PURE__ */ s("p", { children: d })
			]
		})
	] });
}
// src/components/ThemeToggle/ThemeToggle.tsx
var Br = () => /* @__PURE__ */ s("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	viewBox: "0 0 24 24",
	className: "h-8 w-8",
	"aria-hidden": "true",
	children: /* @__PURE__ */ s("path", {
		fill: "currentColor",
		fillRule: "evenodd",
		d: "M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9a8.97 8.97 0 0 0 3.463-.69a.75.75 0 0 1 .981.98a10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5c0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z",
		clipRule: "evenodd"
	})
}), Vr = () => /* @__PURE__ */ s("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	viewBox: "0 0 24 24",
	className: "h-8 w-8",
	"aria-hidden": "true",
	children: /* @__PURE__ */ s("path", {
		fill: "currentColor",
		d: "M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0Zm11.394-5.834a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75Zm-3.916 6.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18Zm-4.242-.697a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12Zm.697-4.243a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
	})
});
function Hr({ darkLabel: e, lightLabel: t }) {
	let [r, i] = a(!1), o = (e = !0) => {
		document.documentElement.classList.add("dark"), document.documentElement.classList.remove("light"), e && localStorage.setItem("darkMode", "enabled"), i(!0);
	}, l = (e = !0) => {
		document.documentElement.classList.remove("dark"), document.documentElement.classList.add("light"), e && localStorage.setItem("darkMode", "disabled"), i(!1);
	};
	return n(() => {
		let e = localStorage.getItem("darkMode");
		e === "enabled" ? o() : e === "disabled" ? l() : window.matchMedia("(prefers-color-scheme: dark)").matches ? o(!1) : l(!1);
	}, []), /* @__PURE__ */ c("button", {
		id: "theme-toggle-button",
		"aria-pressed": r,
		onClick: () => {
			document.documentElement.classList.contains("dark") ? l() : o();
		},
		className: "py-2 px-3 text-black dark:text-white border-y-4 border-transparent\n        hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light\n        focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white",
		children: [/* @__PURE__ */ c("span", {
			className: "darkmode-dark",
			children: [/* @__PURE__ */ s(Br, {}), /* @__PURE__ */ s("span", {
				className: "sr-only",
				children: e
			})]
		}), /* @__PURE__ */ c("span", {
			className: "darkmode-light",
			children: [/* @__PURE__ */ s(Vr, {}), /* @__PURE__ */ s("span", {
				className: "sr-only",
				children: t
			})]
		})]
	});
}
// src/components/LanguageSwitcher/LanguageSwitcher.tsx
var Ur = () => /* @__PURE__ */ s("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	viewBox: "0 0 24 24",
	className: "h-8 w-8",
	"aria-hidden": "true",
	children: /* @__PURE__ */ s("path", {
		fill: "currentColor",
		fillRule: "evenodd",
		d: "M9 2.25a.75.75 0 0 1 .75.75v1.506a49.38 49.38 0 0 1 5.343.371a.75.75 0 1 1-.186 1.489a46.7 46.7 0 0 0-1.99-.206a18.67 18.67 0 0 1-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 1 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482a.75.75 0 1 1-.688-1.333a17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.17 17.17 0 0 0 2.391-5.165a48.038 48.038 0 0 0-8.298.307a.75.75 0 0 1-.186-1.489a49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 0 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726l-2.672 5.726Z",
		clipRule: "evenodd"
	})
});
function Wr({ englishURL: e, finnishURL: t, currentPage: n, currentLang: r, type: i, ariaLabel: o, languageLabel: l }) {
	let [u, d] = a(!1), f = (e, t) => i === "demo" ? `/${t}/demo/${e}/` : e === "front" ? `/${t}/` : `/${t}/${e}/`, p = f(e, "en"), m = f(t, "fi");
	return /* @__PURE__ */ c("div", {
		id: "language-switcher",
		className: "lang-switcher text-black dark:text-white px-3 relative",
		children: [/* @__PURE__ */ c("button", {
			id: "language-menu-button",
			"aria-label": o,
			"aria-expanded": u,
			"aria-controls": "lang-switcher",
			onClick: () => d((e) => !e),
			className: "lang-switcher flex gap-2 py-2 border-y-4 border-transparent items-center\n          hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light\n          focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white",
			children: [/* @__PURE__ */ s(Ur, {}), l]
		}), /* @__PURE__ */ c("ul", {
			id: "lang-switcher",
			className: "p-4 right-0 mt-1 mr-1.5 absolute flex flex-col gap-4 border-solid border-2 border-black bg-lt-code-bg dark:border-white w-[140%] md:w-[200%] dark:bg-dk-code-bg",
			children: [e && /* @__PURE__ */ s("li", { children: /* @__PURE__ */ s("a", {
				href: p,
				hrefLang: "en",
				lang: "en",
				"aria-current": e === n && r !== "fi" ? "page" : void 0,
				children: "English (EN)"
			}) }), t && /* @__PURE__ */ s("li", { children: /* @__PURE__ */ s("a", {
				href: m,
				hrefLang: "fi",
				lang: "fi",
				"aria-current": t === n && r !== "en" ? "page" : void 0,
				children: "Suomi (FI)"
			}) })]
		})]
	});
}
// src/components/MainImage/MainImage.tsx
function Gr() {
	let [e] = a(() => Math.floor(Math.random() * 6) + 1);
	return /* @__PURE__ */ c("div", {
		"aria-hidden": "true",
		className: "main-image--wrapper relative w-full h-125-px md:h-250-px lg:h-350-px overflow-hidden",
		children: [/* @__PURE__ */ s("div", {
			className: "relative w-screen h-125-px md:h-250-px lg:h-350-px bg-cover bg-center",
			style: { backgroundImage: `url('/mountains/${e}.jpg')` }
		}), /* @__PURE__ */ s("div", { className: "main-image--overlay z-10 absolute inset-0 w-full" })]
	});
}
// src/components/SearchBlock/SearchBlock.tsx
var Kr = () => /* @__PURE__ */ s("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	viewBox: "0 0 24 24",
	className: "h-8 w-8",
	"aria-hidden": "true",
	fill: "currentColor",
	children: /* @__PURE__ */ s("path", {
		fillRule: "evenodd",
		d: "M10.5 3.75a6.75 6.75 0 1 0 0 13.5a6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z",
		clipRule: "evenodd"
	})
});
function qr({ searchLabel: e, searchUrl: t }) {
	return /* @__PURE__ */ s("div", {
		id: "search-a",
		className: "text-black dark:text-white px-3 relative",
		children: /* @__PURE__ */ c("a", {
			href: t,
			className: "inline-block py-2 px-1 text-black dark:text-white border-y-4 border-transparent\n          hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light\n          focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white",
			children: [/* @__PURE__ */ s(Kr, {}), /* @__PURE__ */ s("span", {
				className: "sr-only",
				children: e
			})]
		})
	});
}
// src/components/Breadcrumb/Breadcrumb.tsx
function Jr({ items: e, ariaLabel: t, className: n = "" }) {
	return e.length === 0 ? null : /* @__PURE__ */ s("nav", {
		"aria-label": t,
		className: n,
		children: /* @__PURE__ */ s("ol", {
			className: "block list-none m-0 p-0",
			children: e.map((e, t) => /* @__PURE__ */ c("li", {
				className: "inline",
				children: [t > 0 && /* @__PURE__ */ s("span", {
					"aria-hidden": "true",
					className: "mx-2",
					children: "/"
				}), e.href ? /* @__PURE__ */ s("a", {
					href: e.href,
					children: e.label
				}) : e.label]
			}, t))
		})
	});
}
export { C as Box, Jr as Breadcrumb, S as Button, Wr as LanguageSwitcher, Gr as MainImage, jr as RichText, qr as SearchBlock, zr as SearchComponent, w as SkipLink, Hr as ThemeToggle, Er as sanitizeCmsHtml, Tr as sanitizeCmsUrl };
