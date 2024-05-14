/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, ut = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ct = Symbol(), pt = /* @__PURE__ */ new WeakMap();
let Vt = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Ct)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ut && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = pt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && pt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Gt = (r) => new Vt(typeof r == "string" ? r : r + "", void 0, Ct), Yt = (r, t) => {
  if (ut)
    r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const n = document.createElement("style"), i = W.litNonce;
      i !== void 0 && n.setAttribute("nonce", i), n.textContent = e.cssText, r.appendChild(n);
    }
}, yt = ut ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules)
    e += n.cssText;
  return Gt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Jt, defineProperty: Kt, getOwnPropertyDescriptor: Qt, getOwnPropertyNames: Zt, getOwnPropertySymbols: Xt, getPrototypeOf: te } = Object, g = globalThis, mt = g.trustedTypes, ee = mt ? mt.emptyScript : "", X = g.reactiveElementPolyfillSupport, L = (r, t) => r, G = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? ee : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, ht = (r, t) => !Jt(r, t), vt = { attribute: !0, type: String, converter: G, reflect: !1, hasChanged: ht };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class x extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = vt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, e);
      i !== void 0 && Kt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: i, set: o } = Qt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(s) {
      this[e] = s;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(s) {
      const c = i == null ? void 0 : i.call(this);
      o.call(this, s), this.requestUpdate(t, c, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? vt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties")))
      return;
    const t = te(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const e = this.properties, n = [...Zt(e), ...Xt(e)];
      for (const i of n)
        this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [n, i] of e)
          this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const i = this._$Eu(e, n);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n)
        e.unshift(yt(i));
    } else
      t !== void 0 && e.push(yt(t));
    return e;
  }
  static _$Eu(t, e) {
    const n = e.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$Eg = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$ES ?? (this._$ES = [])).push(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) == null || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const n of e.keys())
      this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Yt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) == null || t.forEach((e) => {
      var n;
      return (n = e.hostConnected) == null ? void 0 : n.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) == null || t.forEach((e) => {
      var n;
      return (n = e.hostDisconnected) == null ? void 0 : n.call(e);
    });
  }
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$EO(t, e) {
    var o;
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const s = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : G).toAttribute(e, n.type);
      this._$Em = t, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const s = n.getPropertyOptions(i), c = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((o = s.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? s.converter : G;
      this._$Em = i, this[i] = c.fromAttribute(e, s.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, n, i = !1, o) {
    if (t !== void 0) {
      if (n ?? (n = this.constructor.getPropertyOptions(t)), !(n.hasChanged ?? ht)(i ? o : this[t], e))
        return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$Eg = this._$EP());
  }
  C(t, e, n) {
    this._$AL.has(t) || this._$AL.set(t, e), n.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var n;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this._$Ep) {
        for (const [o, s] of this._$Ep)
          this[o] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [o, s] of i)
          s.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.C(o, this[o], s);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (n = this._$ES) == null || n.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(e)) : this._$ET();
    } catch (i) {
      throw t = !1, this._$ET(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) == null || e.forEach((n) => {
      var i;
      return (i = n.hostUpdated) == null ? void 0 : i.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$ET() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EO(e, this[e]))), this._$ET();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[L("elementProperties")] = /* @__PURE__ */ new Map(), x[L("finalized")] = /* @__PURE__ */ new Map(), X == null || X({ ReactiveElement: x }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, Y = j.trustedTypes, bt = Y ? Y.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Ot = "$lit$", w = `lit$${(Math.random() + "").slice(9)}$`, Ut = "?" + w, re = `<${Ut}>`, k = document, H = () => k.createComment(""), D = (r) => r === null || typeof r != "object" && typeof r != "function", Rt = Array.isArray, ne = (r) => Rt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", tt = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _t = /-->/g, $t = />/g, A = RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), wt = /'/g, gt = /"/g, It = /^(?:script|style|textarea|title)$/i, ie = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), E = ie(1), C = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), St = /* @__PURE__ */ new WeakMap(), P = k.createTreeWalker(k, 129);
function Lt(r, t) {
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return bt !== void 0 ? bt.createHTML(t) : t;
}
const oe = (r, t) => {
  const e = r.length - 1, n = [];
  let i, o = t === 2 ? "<svg>" : "", s = I;
  for (let c = 0; c < e; c++) {
    const a = r[c];
    let l, u, h = -1, d = 0;
    for (; d < a.length && (s.lastIndex = d, u = s.exec(a), u !== null); )
      d = s.lastIndex, s === I ? u[1] === "!--" ? s = _t : u[1] !== void 0 ? s = $t : u[2] !== void 0 ? (It.test(u[2]) && (i = RegExp("</" + u[2], "g")), s = A) : u[3] !== void 0 && (s = A) : s === A ? u[0] === ">" ? (s = i ?? I, h = -1) : u[1] === void 0 ? h = -2 : (h = s.lastIndex - u[2].length, l = u[1], s = u[3] === void 0 ? A : u[3] === '"' ? gt : wt) : s === gt || s === wt ? s = A : s === _t || s === $t ? s = I : (s = A, i = void 0);
    const f = s === A && r[c + 1].startsWith("/>") ? " " : "";
    o += s === I ? a + re : h >= 0 ? (n.push(l), a.slice(0, h) + Ot + a.slice(h) + w + f) : a + w + (h === -2 ? c : f);
  }
  return [Lt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : "")), n];
};
class B {
  constructor({ strings: t, _$litType$: e }, n) {
    let i;
    this.parts = [];
    let o = 0, s = 0;
    const c = t.length - 1, a = this.parts, [l, u] = oe(t, e);
    if (this.el = B.createElement(l, n), P.currentNode = this.el.content, e === 2) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = P.nextNode()) !== null && a.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const h of i.getAttributeNames())
            if (h.endsWith(Ot)) {
              const d = u[s++], f = i.getAttribute(h).split(w), $ = /([.?@])?(.*)/.exec(d);
              a.push({ type: 1, index: o, name: $[2], strings: f, ctor: $[1] === "." ? ae : $[1] === "?" ? ce : $[1] === "@" ? le : Q }), i.removeAttribute(h);
            } else
              h.startsWith(w) && (a.push({ type: 6, index: o }), i.removeAttribute(h));
        if (It.test(i.tagName)) {
          const h = i.textContent.split(w), d = h.length - 1;
          if (d > 0) {
            i.textContent = Y ? Y.emptyScript : "";
            for (let f = 0; f < d; f++)
              i.append(h[f], H()), P.nextNode(), a.push({ type: 2, index: ++o });
            i.append(h[d], H());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === Ut)
          a.push({ type: 2, index: o });
        else {
          let h = -1;
          for (; (h = i.data.indexOf(w, h + 1)) !== -1; )
            a.push({ type: 7, index: o }), h += w.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const n = k.createElement("template");
    return n.innerHTML = t, n;
  }
}
function O(r, t, e = r, n) {
  var s, c;
  if (t === C)
    return t;
  let i = n !== void 0 ? (s = e._$Co) == null ? void 0 : s[n] : e._$Cl;
  const o = D(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, n)), n !== void 0 ? (e._$Co ?? (e._$Co = []))[n] = i : e._$Cl = i), i !== void 0 && (t = O(r, i._$AS(r, t.values), i, n)), t;
}
class se {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: n } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? k).importNode(e, !0);
    P.currentNode = i;
    let o = P.nextNode(), s = 0, c = 0, a = n[0];
    for (; a !== void 0; ) {
      if (s === a.index) {
        let l;
        a.type === 2 ? l = new N(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new ue(o, this, t)), this._$AV.push(l), a = n[++c];
      }
      s !== (a == null ? void 0 : a.index) && (o = P.nextNode(), s++);
    }
    return P.currentNode = k, i;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV)
      n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, n, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = O(this, t, e), D(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : ne(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== p && D(this._$AH) ? this._$AA.nextSibling.data = t : this.$(k.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var o;
    const { values: e, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = B.createElement(Lt(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i)
      this._$AH.p(e);
    else {
      const s = new se(i, this), c = s.u(this.options);
      s.p(e), this.$(c), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = St.get(t.strings);
    return e === void 0 && St.set(t.strings, e = new B(t)), e;
  }
  T(t) {
    Rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, i = 0;
    for (const o of t)
      i === e.length ? e.push(n = new N(this.k(H()), this.k(H()), this, this.options)) : n = e[i], n._$AI(o), i++;
    i < e.length && (this._$AR(n && n._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, i, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = p;
  }
  _$AI(t, e = this, n, i) {
    const o = this.strings;
    let s = !1;
    if (o === void 0)
      t = O(this, t, e, 0), s = !D(t) || t !== this._$AH && t !== C, s && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++)
        l = O(this, c[n + a], e, a), l === C && (l = this._$AH[a]), s || (s = !D(l) || l !== this._$AH[a]), l === p ? t = p : t !== p && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    s && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ae extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class ce extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class le extends Q {
  constructor(t, e, n, i, o) {
    super(t, e, n, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = O(this, t, e, 0) ?? p) === C)
      return;
    const n = this._$AH, i = t === p && n !== p || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== p && (n === p || i);
    i && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ue {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    O(this, t);
  }
}
const et = j.litHtmlPolyfillSupport;
et == null || et(B, N), (j.litHtmlVersions ?? (j.litHtmlVersions = [])).push("3.0.0");
const he = (r, t, e) => {
  const n = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    n._$litPart$ = i = new N(t.insertBefore(H(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class M extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = he(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return C;
  }
}
var Tt;
M._$litElement$ = !0, M.finalized = !0, (Tt = globalThis.litElementHydrateSupport) == null || Tt.call(globalThis, { LitElement: M });
const rt = globalThis.litElementPolyfillSupport;
rt == null || rt({ LitElement: M });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = { attribute: !0, type: String, converter: G, reflect: !1, hasChanged: ht }, fe = (r = de, t, e) => {
  const { kind: n, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), o.set(e.name, r), n === "accessor") {
    const { name: s } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(s, a, r);
    }, init(c) {
      return c !== void 0 && this.C(s, void 0, r), c;
    } };
  }
  if (n === "setter") {
    const { name: s } = e;
    return function(c) {
      const a = this[s];
      t.call(this, c), this.requestUpdate(s, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function _(r) {
  return (t, e) => typeof e == "object" ? fe(r, t, e) : ((n, i, o) => {
    const s = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s ? { ...n, wrapped: !0 } : n), s ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function R(r) {
  return _({ ...r, state: !0, attribute: !1 });
}
var ot = function(r, t) {
  return ot = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var i in n)
      Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
  }, ot(r, t);
};
function q(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  ot(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
function pe(r, t, e, n) {
  function i(o) {
    return o instanceof e ? o : new e(function(s) {
      s(o);
    });
  }
  return new (e || (e = Promise))(function(o, s) {
    function c(u) {
      try {
        l(n.next(u));
      } catch (h) {
        s(h);
      }
    }
    function a(u) {
      try {
        l(n.throw(u));
      } catch (h) {
        s(h);
      }
    }
    function l(u) {
      u.done ? o(u.value) : i(u.value).then(c, a);
    }
    l((n = n.apply(r, t || [])).next());
  });
}
function jt(r, t) {
  var e = { label: 0, sent: function() {
    if (o[0] & 1)
      throw o[1];
    return o[1];
  }, trys: [], ops: [] }, n, i, o, s;
  return s = { next: c(0), throw: c(1), return: c(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function c(l) {
    return function(u) {
      return a([l, u]);
    };
  }
  function a(l) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, l[0] && (e = 0)), e; )
      try {
        if (n = 1, i && (o = l[0] & 2 ? i.return : l[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, l[1])).done)
          return o;
        switch (i = 0, o && (l = [l[0] & 2, o.value]), l[0]) {
          case 0:
          case 1:
            o = l;
            break;
          case 4:
            return e.label++, { value: l[1], done: !1 };
          case 5:
            e.label++, i = l[1], l = [0];
            continue;
          case 7:
            l = e.ops.pop(), e.trys.pop();
            continue;
          default:
            if (o = e.trys, !(o = o.length > 0 && o[o.length - 1]) && (l[0] === 6 || l[0] === 2)) {
              e = 0;
              continue;
            }
            if (l[0] === 3 && (!o || l[1] > o[0] && l[1] < o[3])) {
              e.label = l[1];
              break;
            }
            if (l[0] === 6 && e.label < o[1]) {
              e.label = o[1], o = l;
              break;
            }
            if (o && e.label < o[2]) {
              e.label = o[2], e.ops.push(l);
              break;
            }
            o[2] && e.ops.pop(), e.trys.pop();
            continue;
        }
        l = t.call(r, e);
      } catch (u) {
        l = [6, u], i = 0;
      } finally {
        n = o = 0;
      }
    if (l[0] & 5)
      throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}
function U(r) {
  var t = typeof Symbol == "function" && Symbol.iterator, e = t && r[t], n = 0;
  if (e)
    return e.call(r);
  if (r && typeof r.length == "number")
    return {
      next: function() {
        return r && n >= r.length && (r = void 0), { value: r && r[n++], done: !r };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function J(r, t) {
  var e = typeof Symbol == "function" && r[Symbol.iterator];
  if (!e)
    return r;
  var n = e.call(r), i, o = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
      o.push(i.value);
  } catch (c) {
    s = { error: c };
  } finally {
    try {
      i && !i.done && (e = n.return) && e.call(n);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return o;
}
function K(r, t, e) {
  if (e || arguments.length === 2)
    for (var n = 0, i = t.length, o; n < i; n++)
      (o || !(n in t)) && (o || (o = Array.prototype.slice.call(t, 0, n)), o[n] = t[n]);
  return r.concat(o || Array.prototype.slice.call(t));
}
function T(r) {
  return this instanceof T ? (this.v = r, this) : new T(r);
}
function ye(r, t, e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e.apply(r, t || []), i, o = [];
  return i = {}, s("next"), s("throw"), s("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function s(d) {
    n[d] && (i[d] = function(f) {
      return new Promise(function($, b) {
        o.push([d, f, $, b]) > 1 || c(d, f);
      });
    });
  }
  function c(d, f) {
    try {
      a(n[d](f));
    } catch ($) {
      h(o[0][3], $);
    }
  }
  function a(d) {
    d.value instanceof T ? Promise.resolve(d.value.v).then(l, u) : h(o[0][2], d);
  }
  function l(d) {
    c("next", d);
  }
  function u(d) {
    c("throw", d);
  }
  function h(d, f) {
    d(f), o.shift(), o.length && c(o[0][0], o[0][1]);
  }
}
function me(r) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = r[Symbol.asyncIterator], e;
  return t ? t.call(r) : (r = typeof U == "function" ? U(r) : r[Symbol.iterator](), e = {}, n("next"), n("throw"), n("return"), e[Symbol.asyncIterator] = function() {
    return this;
  }, e);
  function n(o) {
    e[o] = r[o] && function(s) {
      return new Promise(function(c, a) {
        s = r[o](s), i(c, a, s.done, s.value);
      });
    };
  }
  function i(o, s, c, a) {
    Promise.resolve(a).then(function(l) {
      o({ value: l, done: c });
    }, s);
  }
}
function m(r) {
  return typeof r == "function";
}
function Mt(r) {
  var t = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, e = r(t);
  return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
}
var nt = Mt(function(r) {
  return function(e) {
    r(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(n, i) {
      return i + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e;
  };
});
function st(r, t) {
  if (r) {
    var e = r.indexOf(t);
    0 <= e && r.splice(e, 1);
  }
}
var Z = function() {
  function r(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return r.prototype.unsubscribe = function() {
    var t, e, n, i, o;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s))
          try {
            for (var c = U(s), a = c.next(); !a.done; a = c.next()) {
              var l = a.value;
              l.remove(this);
            }
          } catch (b) {
            t = { error: b };
          } finally {
            try {
              a && !a.done && (e = c.return) && e.call(c);
            } finally {
              if (t)
                throw t.error;
            }
          }
        else
          s.remove(this);
      var u = this.initialTeardown;
      if (m(u))
        try {
          u();
        } catch (b) {
          o = b instanceof nt ? b.errors : [b];
        }
      var h = this._finalizers;
      if (h) {
        this._finalizers = null;
        try {
          for (var d = U(h), f = d.next(); !f.done; f = d.next()) {
            var $ = f.value;
            try {
              At($);
            } catch (b) {
              o = o ?? [], b instanceof nt ? o = K(K([], J(o)), J(b.errors)) : o.push(b);
            }
          }
        } catch (b) {
          n = { error: b };
        } finally {
          try {
            f && !f.done && (i = d.return) && i.call(d);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (o)
        throw new nt(o);
    }
  }, r.prototype.add = function(t) {
    var e;
    if (t && t !== this)
      if (this.closed)
        At(t);
      else {
        if (t instanceof r) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (e = this._finalizers) !== null && e !== void 0 ? e : []).push(t);
      }
  }, r.prototype._hasParent = function(t) {
    var e = this._parentage;
    return e === t || Array.isArray(e) && e.includes(t);
  }, r.prototype._addParent = function(t) {
    var e = this._parentage;
    this._parentage = Array.isArray(e) ? (e.push(t), e) : e ? [e, t] : t;
  }, r.prototype._removeParent = function(t) {
    var e = this._parentage;
    e === t ? this._parentage = null : Array.isArray(e) && st(e, t);
  }, r.prototype.remove = function(t) {
    var e = this._finalizers;
    e && st(e, t), t instanceof r && t._removeParent(this);
  }, r.EMPTY = function() {
    var t = new r();
    return t.closed = !0, t;
  }(), r;
}(), Ht = Z.EMPTY;
function Dt(r) {
  return r instanceof Z || r && "closed" in r && m(r.remove) && m(r.add) && m(r.unsubscribe);
}
function At(r) {
  m(r) ? r() : r.unsubscribe();
}
var Bt = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, at = {
  setTimeout: function(r, t) {
    for (var e = [], n = 2; n < arguments.length; n++)
      e[n - 2] = arguments[n];
    var i = at.delegate;
    return i != null && i.setTimeout ? i.setTimeout.apply(i, K([r, t], J(e))) : setTimeout.apply(void 0, K([r, t], J(e)));
  },
  clearTimeout: function(r) {
    var t = at.delegate;
    return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(r);
  },
  delegate: void 0
};
function Nt(r) {
  at.setTimeout(function() {
    throw r;
  });
}
function ct() {
}
function V(r) {
  r();
}
var dt = function(r) {
  q(t, r);
  function t(e) {
    var n = r.call(this) || this;
    return n.isStopped = !1, e ? (n.destination = e, Dt(e) && e.add(n)) : n.destination = $e, n;
  }
  return t.create = function(e, n, i) {
    return new lt(e, n, i);
  }, t.prototype.next = function(e) {
    this.isStopped || this._next(e);
  }, t.prototype.error = function(e) {
    this.isStopped || (this.isStopped = !0, this._error(e));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, r.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(e) {
    this.destination.next(e);
  }, t.prototype._error = function(e) {
    try {
      this.destination.error(e);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(Z), ve = Function.prototype.bind;
function it(r, t) {
  return ve.call(r, t);
}
var be = function() {
  function r(t) {
    this.partialObserver = t;
  }
  return r.prototype.next = function(t) {
    var e = this.partialObserver;
    if (e.next)
      try {
        e.next(t);
      } catch (n) {
        z(n);
      }
  }, r.prototype.error = function(t) {
    var e = this.partialObserver;
    if (e.error)
      try {
        e.error(t);
      } catch (n) {
        z(n);
      }
    else
      z(t);
  }, r.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (e) {
        z(e);
      }
  }, r;
}(), lt = function(r) {
  q(t, r);
  function t(e, n, i) {
    var o = r.call(this) || this, s;
    if (m(e) || !e)
      s = {
        next: e ?? void 0,
        error: n ?? void 0,
        complete: i ?? void 0
      };
    else {
      var c;
      o && Bt.useDeprecatedNextContext ? (c = Object.create(e), c.unsubscribe = function() {
        return o.unsubscribe();
      }, s = {
        next: e.next && it(e.next, c),
        error: e.error && it(e.error, c),
        complete: e.complete && it(e.complete, c)
      }) : s = e;
    }
    return o.destination = new be(s), o;
  }
  return t;
}(dt);
function z(r) {
  Nt(r);
}
function _e(r) {
  throw r;
}
var $e = {
  closed: !0,
  next: ct,
  error: _e,
  complete: ct
}, ft = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function we(r) {
  return r;
}
function ge(r) {
  return r.length === 0 ? we : r.length === 1 ? r[0] : function(e) {
    return r.reduce(function(n, i) {
      return i(n);
    }, e);
  };
}
var S = function() {
  function r(t) {
    t && (this._subscribe = t);
  }
  return r.prototype.lift = function(t) {
    var e = new r();
    return e.source = this, e.operator = t, e;
  }, r.prototype.subscribe = function(t, e, n) {
    var i = this, o = Ae(t) ? t : new lt(t, e, n);
    return V(function() {
      var s = i, c = s.operator, a = s.source;
      o.add(c ? c.call(o, a) : a ? i._subscribe(o) : i._trySubscribe(o));
    }), o;
  }, r.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (e) {
      t.error(e);
    }
  }, r.prototype.forEach = function(t, e) {
    var n = this;
    return e = Et(e), new e(function(i, o) {
      var s = new lt({
        next: function(c) {
          try {
            t(c);
          } catch (a) {
            o(a), s.unsubscribe();
          }
        },
        error: o,
        complete: i
      });
      n.subscribe(s);
    });
  }, r.prototype._subscribe = function(t) {
    var e;
    return (e = this.source) === null || e === void 0 ? void 0 : e.subscribe(t);
  }, r.prototype[ft] = function() {
    return this;
  }, r.prototype.pipe = function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return ge(t)(this);
  }, r.prototype.toPromise = function(t) {
    var e = this;
    return t = Et(t), new t(function(n, i) {
      var o;
      e.subscribe(function(s) {
        return o = s;
      }, function(s) {
        return i(s);
      }, function() {
        return n(o);
      });
    });
  }, r.create = function(t) {
    return new r(t);
  }, r;
}();
function Et(r) {
  var t;
  return (t = r ?? Bt.Promise) !== null && t !== void 0 ? t : Promise;
}
function Se(r) {
  return r && m(r.next) && m(r.error) && m(r.complete);
}
function Ae(r) {
  return r && r instanceof dt || Se(r) && Dt(r);
}
function Ee(r) {
  return m(r == null ? void 0 : r.lift);
}
function qt(r) {
  return function(t) {
    if (Ee(t))
      return t.lift(function(e) {
        try {
          return r(e, this);
        } catch (n) {
          this.error(n);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function zt(r, t, e, n, i) {
  return new Pe(r, t, e, n, i);
}
var Pe = function(r) {
  q(t, r);
  function t(e, n, i, o, s, c) {
    var a = r.call(this, e) || this;
    return a.onFinalize = s, a.shouldUnsubscribe = c, a._next = n ? function(l) {
      try {
        n(l);
      } catch (u) {
        e.error(u);
      }
    } : r.prototype._next, a._error = o ? function(l) {
      try {
        o(l);
      } catch (u) {
        e.error(u);
      } finally {
        this.unsubscribe();
      }
    } : r.prototype._error, a._complete = i ? function() {
      try {
        i();
      } catch (l) {
        e.error(l);
      } finally {
        this.unsubscribe();
      }
    } : r.prototype._complete, a;
  }
  return t.prototype.unsubscribe = function() {
    var e;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var n = this.closed;
      r.prototype.unsubscribe.call(this), !n && ((e = this.onFinalize) === null || e === void 0 || e.call(this));
    }
  }, t;
}(dt), ke = Mt(function(r) {
  return function() {
    r(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Ft = function(r) {
  q(t, r);
  function t() {
    var e = r.call(this) || this;
    return e.closed = !1, e.currentObservers = null, e.observers = [], e.isStopped = !1, e.hasError = !1, e.thrownError = null, e;
  }
  return t.prototype.lift = function(e) {
    var n = new Pt(this, this);
    return n.operator = e, n;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new ke();
  }, t.prototype.next = function(e) {
    var n = this;
    V(function() {
      var i, o;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var s = U(n.currentObservers), c = s.next(); !c.done; c = s.next()) {
            var a = c.value;
            a.next(e);
          }
        } catch (l) {
          i = { error: l };
        } finally {
          try {
            c && !c.done && (o = s.return) && o.call(s);
          } finally {
            if (i)
              throw i.error;
          }
        }
      }
    });
  }, t.prototype.error = function(e) {
    var n = this;
    V(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = e;
        for (var i = n.observers; i.length; )
          i.shift().error(e);
      }
    });
  }, t.prototype.complete = function() {
    var e = this;
    V(function() {
      if (e._throwIfClosed(), !e.isStopped) {
        e.isStopped = !0;
        for (var n = e.observers; n.length; )
          n.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var e;
      return ((e = this.observers) === null || e === void 0 ? void 0 : e.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(e) {
    return this._throwIfClosed(), r.prototype._trySubscribe.call(this, e);
  }, t.prototype._subscribe = function(e) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
  }, t.prototype._innerSubscribe = function(e) {
    var n = this, i = this, o = i.hasError, s = i.isStopped, c = i.observers;
    return o || s ? Ht : (this.currentObservers = null, c.push(e), new Z(function() {
      n.currentObservers = null, st(c, e);
    }));
  }, t.prototype._checkFinalizedStatuses = function(e) {
    var n = this, i = n.hasError, o = n.thrownError, s = n.isStopped;
    i ? e.error(o) : s && e.complete();
  }, t.prototype.asObservable = function() {
    var e = new S();
    return e.source = this, e;
  }, t.create = function(e, n) {
    return new Pt(e, n);
  }, t;
}(S), Pt = function(r) {
  q(t, r);
  function t(e, n) {
    var i = r.call(this) || this;
    return i.destination = e, i.source = n, i;
  }
  return t.prototype.next = function(e) {
    var n, i;
    (i = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || i === void 0 || i.call(n, e);
  }, t.prototype.error = function(e) {
    var n, i;
    (i = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || i === void 0 || i.call(n, e);
  }, t.prototype.complete = function() {
    var e, n;
    (n = (e = this.destination) === null || e === void 0 ? void 0 : e.complete) === null || n === void 0 || n.call(e);
  }, t.prototype._subscribe = function(e) {
    var n, i;
    return (i = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(e)) !== null && i !== void 0 ? i : Ht;
  }, t;
}(Ft), xe = function(r) {
  return r && typeof r.length == "number" && typeof r != "function";
};
function Te(r) {
  return m(r == null ? void 0 : r.then);
}
function Ce(r) {
  return m(r[ft]);
}
function Oe(r) {
  return Symbol.asyncIterator && m(r == null ? void 0 : r[Symbol.asyncIterator]);
}
function Ue(r) {
  return new TypeError("You provided " + (r !== null && typeof r == "object" ? "an invalid object" : "'" + r + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function Re() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var Ie = Re();
function Le(r) {
  return m(r == null ? void 0 : r[Ie]);
}
function je(r) {
  return ye(this, arguments, function() {
    var e, n, i, o;
    return jt(this, function(s) {
      switch (s.label) {
        case 0:
          e = r.getReader(), s.label = 1;
        case 1:
          s.trys.push([1, , 9, 10]), s.label = 2;
        case 2:
          return [4, T(e.read())];
        case 3:
          return n = s.sent(), i = n.value, o = n.done, o ? [4, T(void 0)] : [3, 5];
        case 4:
          return [2, s.sent()];
        case 5:
          return [4, T(i)];
        case 6:
          return [4, s.sent()];
        case 7:
          return s.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return e.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function Me(r) {
  return m(r == null ? void 0 : r.getReader);
}
function He(r) {
  if (r instanceof S)
    return r;
  if (r != null) {
    if (Ce(r))
      return De(r);
    if (xe(r))
      return Be(r);
    if (Te(r))
      return Ne(r);
    if (Oe(r))
      return Wt(r);
    if (Le(r))
      return qe(r);
    if (Me(r))
      return ze(r);
  }
  throw Ue(r);
}
function De(r) {
  return new S(function(t) {
    var e = r[ft]();
    if (m(e.subscribe))
      return e.subscribe(t);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function Be(r) {
  return new S(function(t) {
    for (var e = 0; e < r.length && !t.closed; e++)
      t.next(r[e]);
    t.complete();
  });
}
function Ne(r) {
  return new S(function(t) {
    r.then(function(e) {
      t.closed || (t.next(e), t.complete());
    }, function(e) {
      return t.error(e);
    }).then(null, Nt);
  });
}
function qe(r) {
  return new S(function(t) {
    var e, n;
    try {
      for (var i = U(r), o = i.next(); !o.done; o = i.next()) {
        var s = o.value;
        if (t.next(s), t.closed)
          return;
      }
    } catch (c) {
      e = { error: c };
    } finally {
      try {
        o && !o.done && (n = i.return) && n.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    t.complete();
  });
}
function Wt(r) {
  return new S(function(t) {
    Fe(r, t).catch(function(e) {
      return t.error(e);
    });
  });
}
function ze(r) {
  return Wt(je(r));
}
function Fe(r, t) {
  var e, n, i, o;
  return pe(this, void 0, void 0, function() {
    var s, c;
    return jt(this, function(a) {
      switch (a.label) {
        case 0:
          a.trys.push([0, 5, 6, 11]), e = me(r), a.label = 1;
        case 1:
          return [4, e.next()];
        case 2:
          if (n = a.sent(), !!n.done)
            return [3, 4];
          if (s = n.value, t.next(s), t.closed)
            return [2];
          a.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return c = a.sent(), i = { error: c }, [3, 11];
        case 6:
          return a.trys.push([6, , 9, 10]), n && !n.done && (o = e.return) ? [4, o.call(e)] : [3, 8];
        case 7:
          a.sent(), a.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (i)
            throw i.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return t.complete(), [2];
      }
    });
  });
}
function kt(r, t) {
  return qt(function(e, n) {
    var i = 0;
    e.subscribe(zt(n, function(o) {
      return r.call(t, o, i++) && n.next(o);
    }));
  });
}
function xt(r) {
  return qt(function(t, e) {
    He(r).subscribe(zt(e, function() {
      return e.complete();
    }, ct)), !e.closed && t.subscribe(e);
  });
}
async function We() {
  return new Promise((r) => {
    var e;
    if ((e = window.Rai) != null && e.PolicyManager)
      return r(window.Rai.PolicyManager);
    const t = window.Rai ?? {};
    window.Rai = new Proxy(t, {
      set: (n, i, o, s) => {
        const c = Reflect.set(n, i, o, s);
        return i === "PolicyManager" && (window.Rai = t, window.setTimeout(() => {
          r(o);
        })), c;
      }
    });
  });
}
var Ve = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, v = (r, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Ge(t, e) : t, o = r.length - 1, s; o >= 0; o--)
    (s = r[o]) && (i = (n ? s(t, e, i) : s(i)) || i);
  return n && i && Ve(t, e, i), i;
};
const F = new Ft();
class y extends M {
  constructor() {
    super(), this.pageInfo = void 0, this.webtrekk = !0, this.comscore = !0, this.nielsen = !0, this.akamai = !0, this.exaudi = !0, this.railytics = !0, this.disableOnLoadTrack = "", this.disableTrackingSystems = "", this.mode = "", this.webtrekkLoaded = !1, this.comsoreLoaded = !1, this.akamaiLoaded = !1, this.nielsenLoaded = !1, this.exaudiLoaded = !1, this.railyticsLoaded = !1;
  }
  get trackEnqueue() {
    return window.Rai._trackEnqueue;
  }
  connectedCallback() {
    super.connectedCallback();
    const t = this.querySelector("#page_info");
    t && (this.pageInfo = JSON.parse(t.innerText)), this.dispatch("tracker_ready", void 0), this.disableTrackingSystems && this.disableTrackingSystems.split(",").forEach((e) => {
      const n = e.trim();
      this[n] = !1;
    }), this.trackEnqueue.policyActivator.pipe(
      kt(Boolean),
      xt(F)
    ).subscribe(() => {
      this.initGDPRTrackingSystems();
    }), this.trackEnqueue.privacyPolicyActivator.pipe(
      kt(Boolean),
      xt(F)
    ).subscribe(() => {
      this.initPrivacyPolicyTrackingSystems().catch(console.error);
    }), this.initTrackingSystems();
  }
  initTrackingSystems() {
    this.webtrekk && import(
      /* @vite-ignore */
      new URL("/common/assets/js/webcomponents/rai-webtrekk.js", window.location.href).toString()
    ).then(() => customElements.whenDefined("rai-webtrekk")).then(() => {
      this.webtrekkLoaded = !0;
    }).catch(console.error), this.akamai && import(
      /* @vite-ignore */
      new URL("/common/assets/js/webcomponents/rai-akamai.js", window.location.href).toString()
    ).then(() => customElements.whenDefined("rai-akamai")).then(() => {
      this.akamaiLoaded = !0;
    }).catch(console.error), this.comscore && import(
      /* @vite-ignore */
      new URL("/common/assets/js/webcomponents/rai-comscore.js", window.location.href).toString()
    ).then(() => customElements.whenDefined("rai-comscore")).then(() => {
      this.comsoreLoaded = !0;
    }).catch(console.error), this.nielsen && import(
      /* @vite-ignore */
      new URL("/common/assets/js/webcomponents/rai-nielsen.js", window.location.href).toString()
    ).then(() => customElements.whenDefined("rai-nielsen")).then(() => {
      this.nielsenLoaded = !0;
    }).catch(console.error), this.railytics && import(
      /* @vite-ignore */
      new URL("/common/assets/js/webcomponents/rai-railytics.js", window.location.href).toString()
    ).then(() => customElements.whenDefined("rai-railytics")).then(() => {
      this.railyticsLoaded = !0;
    }).catch(console.error);
  }
  async initPrivacyPolicyTrackingSystems() {
    const t = await We();
    if (this.exaudi && t.hasConsents(["1", "2", "3", "4", "7", "9"]))
      try {
        import(
          /* @vite-ignore */
          new URL("/common/assets/js/webcomponents/rai-exaudi.js", window.location.href).toString()
        ).then(() => customElements.whenDefined("rai-exaudi")).then(() => {
          this.exaudiLoaded = !0;
        }).catch(console.error);
      } catch (e) {
        console.error(e);
      }
  }
  initGDPRTrackingSystems() {
  }
  firstUpdated(t) {
    super.firstUpdated(t), this.disableOnLoadTrack !== "true" && this.mode !== "extendInfoByComponent" && this.trackEnqueue.setPageQueueEvent(this.pageInfo), this.trackEnqueue.setUserQueueEvent(this.pageInfo);
  }
  render() {
    return E`
      <slot></slot>
      ${this.webtrekkLoaded ? E`<rai-webtrekk .mode=${this.mode} .pageInfoBaseData=${this.pageInfo}></rai-webtrekk>` : ""}
      ${this.comsoreLoaded ? E`<rai-comscore></rai-comscore>` : ""}
      ${this.nielsenLoaded ? E`<rai-nielsen .mode=${this.mode} .pageInfoBaseData=${this.pageInfo}></rai-nielsen>` : ""}
      ${this.akamaiLoaded ? E`<rai-akamai></rai-akamai>` : ""}
      ${this.exaudiLoaded ? E`<rai-exaudi .pageInfoBaseData=${this.pageInfo}></rai-exaudi>` : ""}
      ${this.railyticsLoaded ? E`<rai-railytics .mode=${this.mode} .pageInfoBaseData=${this.pageInfo}></rai-railytics>` : ""}
    `;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), F.next(), F.complete();
  }
  dispatch(t, e) {
    const n = e ? new CustomEvent(t, { detail: e, bubbles: !0, composed: !0, cancelable: !0 }) : new Event(t, { bubbles: !0, composed: !0, cancelable: !0 });
    this.dispatchEvent(n);
  }
}
v([
  _({ type: Object })
], y.prototype, "pageInfo", 2);
v([
  _({ type: Boolean })
], y.prototype, "webtrekk", 2);
v([
  _({ type: Boolean })
], y.prototype, "comscore", 2);
v([
  _({ type: Boolean })
], y.prototype, "nielsen", 2);
v([
  _({ type: Boolean })
], y.prototype, "akamai", 2);
v([
  _({ type: Boolean })
], y.prototype, "exaudi", 2);
v([
  _({ type: Boolean })
], y.prototype, "railytics", 2);
v([
  _()
], y.prototype, "disableOnLoadTrack", 2);
v([
  _()
], y.prototype, "disableTrackingSystems", 2);
v([
  _()
], y.prototype, "mode", 2);
v([
  R()
], y.prototype, "exaudiLoaded", 2);
v([
  R()
], y.prototype, "webtrekkLoaded", 2);
v([
  R()
], y.prototype, "comsoreLoaded", 2);
v([
  R()
], y.prototype, "nielsenLoaded", 2);
v([
  R()
], y.prototype, "akamaiLoaded", 2);
v([
  R()
], y.prototype, "railyticsLoaded", 2);
async function Ye() {
  return new Promise((r) => {
    var n;
    if ((n = window.Rai) != null && n._trackEnqueue)
      return r(window.Rai._trackEnqueue);
    const t = window.Rai ?? {};
    window.Rai = new Proxy(t, {
      set: (i, o, s, c) => {
        const a = Reflect.set(i, o, s, c);
        return o === "_trackEnqueue" && window.setTimeout(() => {
          r(window.Rai._trackEnqueue);
        }), a;
      }
    }), import(
      /* @vite-ignore */
      new URL("/common/assets/js/webcomponents/track-enqueue.js", window.location.href).toString()
    ).catch(console.error);
  });
}
(async function() {
  try {
    await Ye(), customElements.define("rai-tracker", y);
  } catch (r) {
    console.error(r);
  }
})();
import(
  /* @vite-ignore */
  "/common/assets/js/webcomponents/analytics-cross-domain-manager.js"
);
//# sourceMappingURL=rai-tracker.js.map
