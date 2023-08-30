/* eslint-disable */
//prettier-ignore
module.exports = {
  name: "@yarnpkg/plugin-outdated",
  factory: function(require) {
    var plugin = (() => {
      var ur = Object.create, _t = Object.defineProperty, hr = Object.defineProperties,
        pr = Object.getOwnPropertyDescriptor, fr = Object.getOwnPropertyDescriptors, dr = Object.getOwnPropertyNames,
        xe = Object.getOwnPropertySymbols, gr = Object.getPrototypeOf, Ce = Object.prototype.hasOwnProperty,
        mr = Object.prototype.propertyIsEnumerable;
      var Ee = (e, t, s) => t in e ? _t(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s,
        E = (e, t) => {
          for (var s in t || (t = {})) Ce.call(t, s) && Ee(e, s, t[s]);
          if (xe) for (var s of xe(t)) mr.call(t, s) && Ee(e, s, t[s]);
          return e;
        }, k = (e, t) => hr(e, fr(t)), yr = e => _t(e, "__esModule", { value: !0 });
      var q = e => {
        if (typeof require != "undefined") return require(e);
        throw new Error("Dynamic require of \"" + e + "\" is not supported");
      };
      var M = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), Ar = (e, t) => {
        for (var s in t) _t(e, s, { get: t[s], enumerable: !0 });
      }, Rr = (e, t, s) => {
        if (t && typeof t == "object" || typeof t == "function") for (let r of dr(t)) !Ce.call(e, r) && r !== "default" && _t(e, r, {
          get: () => t[r],
          enumerable: !(s = pr(t, r)) || s.enumerable,
        });
        return e;
      }, J = e => Rr(yr(_t(e != null ? ur(gr(e)) : {}, "default", e && e.__esModule && "default" in e ? {
        get: () => e.default,
        enumerable: !0,
      } : { value: e, enumerable: !0 })), e);
      var Nt = M(st => {
        "use strict";
        st.isInteger = e => typeof e == "number" ? Number.isInteger(e) : typeof e == "string" && e.trim() !== "" ? Number.isInteger(Number(e)) : !1;
        st.find = (e, t) => e.nodes.find(s => s.type === t);
        st.exceedsLimit = (e, t, s = 1, r) => r === !1 || !st.isInteger(e) || !st.isInteger(t) ? !1 : (Number(t) - Number(e)) / Number(s) >= r;
        st.escapeNode = (e, t = 0, s) => {
          let r = e.nodes[t];
          !r || (s && r.type === s || r.type === "open" || r.type === "close") && r.escaped !== !0 && (r.value = "\\" + r.value, r.escaped = !0);
        };
        st.encloseBrace = e => e.type !== "brace" ? !1 : e.commas >> 0 + e.ranges >> 0 == 0 ? (e.invalid = !0, !0) : !1;
        st.isInvalidBrace = e => e.type !== "brace" ? !1 : e.invalid === !0 || e.dollar ? !0 : e.commas >> 0 + e.ranges >> 0 == 0 || e.open !== !0 || e.close !== !0 ? (e.invalid = !0, !0) : !1;
        st.isOpenOrClose = e => e.type === "open" || e.type === "close" ? !0 : e.open === !0 || e.close === !0;
        st.reduce = e => e.reduce((t, s) => (s.type === "text" && t.push(s.value), s.type === "range" && (s.type = "text"), t), []);
        st.flatten = (...e) => {
          let t = [], s = r => {
            for (let i = 0; i < r.length; i++) {
              let n = r[i];
              Array.isArray(n) ? s(n, t) : n !== void 0 && t.push(n);
            }
            return t;
          };
          return s(e), t;
        };
      });
      var Dt = M((tn, $e) => {
        "use strict";
        var Se = Nt();
        $e.exports = (e, t = {}) => {
          let s = (r, i = {}) => {
            let n = t.escapeInvalid && Se.isInvalidBrace(i), o = r.invalid === !0 && t.escapeInvalid === !0, a = "";
            if (r.value) return (n || o) && Se.isOpenOrClose(r) ? "\\" + r.value : r.value;
            if (r.value) return r.value;
            if (r.nodes) for (let d of r.nodes) a += s(d);
            return a;
          };
          return s(e);
        };
      });
      var ve = M((en, we) => {
        "use strict";
        we.exports = function(e) {
          return typeof e == "number" ? e - e == 0 : typeof e == "string" && e.trim() !== "" ? Number.isFinite ? Number.isFinite(+e) : isFinite(+e) : !1;
        };
      });
      var Me = M((sn, De) => {
        "use strict";
        var Te = ve(), dt = (e, t, s) => {
          if (Te(e) === !1) throw new TypeError("toRegexRange: expected the first argument to be a number");
          if (t === void 0 || e === t) return String(e);
          if (Te(t) === !1) throw new TypeError("toRegexRange: expected the second argument to be a number.");
          let r = E({ relaxZeros: !0 }, s);
          typeof r.strictZeros == "boolean" && (r.relaxZeros = r.strictZeros === !1);
          let i = String(r.relaxZeros), n = String(r.shorthand), o = String(r.capture), a = String(r.wrap),
            d = e + ":" + t + "=" + i + n + o + a;
          if (dt.cache.hasOwnProperty(d)) return dt.cache[d].result;
          let f = Math.min(e, t), h = Math.max(e, t);
          if (Math.abs(f - h) === 1) {
            let R = e + "|" + t;
            return r.capture ? `(${R})` : r.wrap === !1 ? R : `(?:${R})`;
          }
          let g = Ne(e) || Ne(t), l = { min: e, max: t, a: f, b: h }, _ = [], A = [];
          if (g && (l.isPadded = g, l.maxLen = String(l.max).length), f < 0) {
            let R = h < 0 ? Math.abs(h) : 1;
            A = He(R, Math.abs(f), l, r), f = l.a = 0;
          }
          return h >= 0 && (_ = He(f, h, l, r)), l.negatives = A, l.positives = _, l.result = _r(A, _, r), r.capture === !0 ? l.result = `(${l.result})` : r.wrap !== !1 && _.length + A.length > 1 && (l.result = `(?:${l.result})`), dt.cache[d] = l, l.result;
        };

        function _r(e, t, s) {
          let r = Vt(e, t, "-", !1, s) || [], i = Vt(t, e, "", !1, s) || [], n = Vt(e, t, "-?", !0, s) || [];
          return r.concat(n).concat(i).join("|");
        }

        function br(e, t) {
          let s = 1, r = 1, i = Oe(e, s), n = new Set([t]);
          for (; e <= i && i <= t;) n.add(i), s += 1, i = Oe(e, s);
          for (i = ke(t + 1, r) - 1; e < i && i <= t;) n.add(i), r += 1, i = ke(t + 1, r) - 1;
          return n = [...n], n.sort(Er), n;
        }

        function xr(e, t, s) {
          if (e === t) return { pattern: e, count: [], digits: 0 };
          let r = Cr(e, t), i = r.length, n = "", o = 0;
          for (let a = 0; a < i; a++) {
            let [d, f] = r[a];
            d === f ? n += d : d !== "0" || f !== "9" ? n += Sr(d, f, s) : o++;
          }
          return o && (n += s.shorthand === !0 ? "\\d" : "[0-9]"), { pattern: n, count: [o], digits: i };
        }

        function He(e, t, s, r) {
          let i = br(e, t), n = [], o = e, a;
          for (let d = 0; d < i.length; d++) {
            let f = i[d], h = xr(String(o), String(f), r), g = "";
            if (!s.isPadded && a && a.pattern === h.pattern) {
              a.count.length > 1 && a.count.pop(), a.count.push(h.count[0]), a.string = a.pattern + Ie(a.count), o = f + 1;
              continue;
            }
            s.isPadded && (g = $r(f, s, r)), h.string = g + h.pattern + Ie(h.count), n.push(h), o = f + 1, a = h;
          }
          return n;
        }

        function Vt(e, t, s, r, i) {
          let n = [];
          for (let o of e) {
            let { string: a } = o;
            !r && !Le(t, "string", a) && n.push(s + a), r && Le(t, "string", a) && n.push(s + a);
          }
          return n;
        }

        function Cr(e, t) {
          let s = [];
          for (let r = 0; r < e.length; r++) s.push([e[r], t[r]]);
          return s;
        }

        function Er(e, t) {
          return e > t ? 1 : t > e ? -1 : 0;
        }

        function Le(e, t, s) {
          return e.some(r => r[t] === s);
        }

        function Oe(e, t) {
          return Number(String(e).slice(0, -t) + "9".repeat(t));
        }

        function ke(e, t) {
          return e - e % Math.pow(10, t);
        }

        function Ie(e) {
          let [t = 0, s = ""] = e;
          return s || t > 1 ? `{${t + (s ? "," + s : "")}}` : "";
        }

        function Sr(e, t, s) {
          return `[${e}${t - e == 1 ? "" : "-"}${t}]`;
        }

        function Ne(e) {
          return /^-?(0+)\d/.test(e);
        }

        function $r(e, t, s) {
          if (!t.isPadded) return e;
          let r = Math.abs(t.maxLen - String(e).length), i = s.relaxZeros !== !1;
          switch (r) {
            case 0:
              return "";
            case 1:
              return i ? "0?" : "0";
            case 2:
              return i ? "0{0,2}" : "00";
            default:
              return i ? `0{0,${r}}` : `0{${r}}`;
          }
        }

        dt.cache = {};
        dt.clearCache = () => dt.cache = {};
        De.exports = dt;
      });
      var Jt = M((rn, Ge) => {
        "use strict";
        var wr = q("util"), Pe = Me(), Ue = e => e !== null && typeof e == "object" && !Array.isArray(e),
          vr = e => t => e === !0 ? Number(t) : String(t),
          Zt = e => typeof e == "number" || typeof e == "string" && e !== "", bt = e => Number.isInteger(+e),
          Yt = e => {
            let t = `${e}`, s = -1;
            if (t[0] === "-" && (t = t.slice(1)), t === "0") return !1;
            for (; t[++s] === "0";) ;
            return s > 0;
          }, Tr = (e, t, s) => typeof e == "string" || typeof t == "string" ? !0 : s.stringify === !0,
          Hr = (e, t, s) => {
            if (t > 0) {
              let r = e[0] === "-" ? "-" : "";
              r && (e = e.slice(1)), e = r + e.padStart(r ? t - 1 : t, "0");
            }
            return s === !1 ? String(e) : e;
          }, ze = (e, t) => {
            let s = e[0] === "-" ? "-" : "";
            for (s && (e = e.slice(1), t--); e.length < t;) e = "0" + e;
            return s ? "-" + e : e;
          }, Lr = (e, t) => {
            e.negatives.sort((o, a) => o < a ? -1 : o > a ? 1 : 0), e.positives.sort((o, a) => o < a ? -1 : o > a ? 1 : 0);
            let s = t.capture ? "" : "?:", r = "", i = "", n;
            return e.positives.length && (r = e.positives.join("|")), e.negatives.length && (i = `-(${s}${e.negatives.join("|")})`), r && i ? n = `${r}|${i}` : n = r || i, t.wrap ? `(${s}${n})` : n;
          }, Be = (e, t, s, r) => {
            if (s) return Pe(e, t, E({ wrap: !1 }, r));
            let i = String.fromCharCode(e);
            if (e === t) return i;
            let n = String.fromCharCode(t);
            return `[${i}-${n}]`;
          }, je = (e, t, s) => {
            if (Array.isArray(e)) {
              let r = s.wrap === !0, i = s.capture ? "" : "?:";
              return r ? `(${i}${e.join("|")})` : e.join("|");
            }
            return Pe(e, t, s);
          }, Fe = (...e) => new RangeError("Invalid range arguments: " + wr.inspect(...e)), We = (e, t, s) => {
            if (s.strictRanges === !0) throw Fe([e, t]);
            return [];
          }, Or = (e, t) => {
            if (t.strictRanges === !0) throw new TypeError(`Expected step "${e}" to be a number`);
            return [];
          }, kr = (e, t, s = 1, r = {}) => {
            let i = Number(e), n = Number(t);
            if (!Number.isInteger(i) || !Number.isInteger(n)) {
              if (r.strictRanges === !0) throw Fe([e, t]);
              return [];
            }
            i === 0 && (i = 0), n === 0 && (n = 0);
            let o = i > n, a = String(e), d = String(t), f = String(s);
            s = Math.max(Math.abs(s), 1);
            let h = Yt(a) || Yt(d) || Yt(f), g = h ? Math.max(a.length, d.length, f.length) : 0,
              l = h === !1 && Tr(e, t, r) === !1, _ = r.transform || vr(l);
            if (r.toRegex && s === 1) return Be(ze(e, g), ze(t, g), !0, r);
            let A = { negatives: [], positives: [] }, R = H => A[H < 0 ? "negatives" : "positives"].push(Math.abs(H)),
              x = [], $ = 0;
            for (; o ? i >= n : i <= n;) r.toRegex === !0 && s > 1 ? R(i) : x.push(Hr(_(i, $), g, l)), i = o ? i - s : i + s, $++;
            return r.toRegex === !0 ? s > 1 ? Lr(A, r) : je(x, null, E({ wrap: !1 }, r)) : x;
          }, Ir = (e, t, s = 1, r = {}) => {
            if (!bt(e) && e.length > 1 || !bt(t) && t.length > 1) return We(e, t, r);
            let i = r.transform || (l => String.fromCharCode(l)), n = `${e}`.charCodeAt(0), o = `${t}`.charCodeAt(0),
              a = n > o, d = Math.min(n, o), f = Math.max(n, o);
            if (r.toRegex && s === 1) return Be(d, f, !1, r);
            let h = [], g = 0;
            for (; a ? n >= o : n <= o;) h.push(i(n, g)), n = a ? n - s : n + s, g++;
            return r.toRegex === !0 ? je(h, null, { wrap: !1, options: r }) : h;
          }, Mt = (e, t, s, r = {}) => {
            if (t == null && Zt(e)) return [e];
            if (!Zt(e) || !Zt(t)) return We(e, t, r);
            if (typeof s == "function") return Mt(e, t, 1, { transform: s });
            if (Ue(s)) return Mt(e, t, 0, s);
            let i = E({}, r);
            return i.capture === !0 && (i.wrap = !0), s = s || i.step || 1, bt(s) ? bt(e) && bt(t) ? kr(e, t, s, i) : Ir(e, t, Math.max(Math.abs(s), 1), i) : s != null && !Ue(s) ? Or(s, i) : Mt(e, t, 1, s);
          };
        Ge.exports = Mt;
      });
      var Qe = M((nn, Ke) => {
        "use strict";
        var Nr = Jt(), qe = Nt(), Dr = (e, t = {}) => {
          let s = (r, i = {}) => {
            let n = qe.isInvalidBrace(i), o = r.invalid === !0 && t.escapeInvalid === !0, a = n === !0 || o === !0,
              d = t.escapeInvalid === !0 ? "\\" : "", f = "";
            if (r.isOpen === !0 || r.isClose === !0) return d + r.value;
            if (r.type === "open") return a ? d + r.value : "(";
            if (r.type === "close") return a ? d + r.value : ")";
            if (r.type === "comma") return r.prev.type === "comma" ? "" : a ? r.value : "|";
            if (r.value) return r.value;
            if (r.nodes && r.ranges > 0) {
              let h = qe.reduce(r.nodes), g = Nr(...h, k(E({}, t), { wrap: !1, toRegex: !0 }));
              if (g.length !== 0) return h.length > 1 && g.length > 1 ? `(${g})` : g;
            }
            if (r.nodes) for (let h of r.nodes) f += s(h, r);
            return f;
          };
          return s(e);
        };
        Ke.exports = Dr;
      });
      var Ze = M((on, Ve) => {
        "use strict";
        var Mr = Jt(), Xe = Dt(), yt = Nt(), gt = (e = "", t = "", s = !1) => {
          let r = [];
          if (e = [].concat(e), t = [].concat(t), !t.length) return e;
          if (!e.length) return s ? yt.flatten(t).map(i => `{${i}}`) : t;
          for (let i of e) if (Array.isArray(i)) for (let n of i) r.push(gt(n, t, s)); else for (let n of t) s === !0 && typeof n == "string" && (n = `{${n}}`), r.push(Array.isArray(n) ? gt(i, n, s) : i + n);
          return yt.flatten(r);
        }, Pr = (e, t = {}) => {
          let s = t.rangeLimit === void 0 ? 1e3 : t.rangeLimit, r = (i, n = {}) => {
            i.queue = [];
            let o = n, a = n.queue;
            for (; o.type !== "brace" && o.type !== "root" && o.parent;) o = o.parent, a = o.queue;
            if (i.invalid || i.dollar) {
              a.push(gt(a.pop(), Xe(i, t)));
              return;
            }
            if (i.type === "brace" && i.invalid !== !0 && i.nodes.length === 2) {
              a.push(gt(a.pop(), ["{}"]));
              return;
            }
            if (i.nodes && i.ranges > 0) {
              let g = yt.reduce(i.nodes);
              if (yt.exceedsLimit(...g, t.step, s)) throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
              let l = Mr(...g, t);
              l.length === 0 && (l = Xe(i, t)), a.push(gt(a.pop(), l)), i.nodes = [];
              return;
            }
            let d = yt.encloseBrace(i), f = i.queue, h = i;
            for (; h.type !== "brace" && h.type !== "root" && h.parent;) h = h.parent, f = h.queue;
            for (let g = 0; g < i.nodes.length; g++) {
              let l = i.nodes[g];
              if (l.type === "comma" && i.type === "brace") {
                g === 1 && f.push(""), f.push("");
                continue;
              }
              if (l.type === "close") {
                a.push(gt(a.pop(), f, d));
                continue;
              }
              if (l.value && l.type !== "open") {
                f.push(gt(f.pop(), l.value));
                continue;
              }
              l.nodes && r(l, i);
            }
            return f;
          };
          return yt.flatten(r(e));
        };
        Ve.exports = Pr;
      });
      var Je = M((an, Ye) => {
        "use strict";
        Ye.exports = {
          MAX_LENGTH: 1024 * 64,
          CHAR_0: "0",
          CHAR_9: "9",
          CHAR_UPPERCASE_A: "A",
          CHAR_LOWERCASE_A: "a",
          CHAR_UPPERCASE_Z: "Z",
          CHAR_LOWERCASE_Z: "z",
          CHAR_LEFT_PARENTHESES: "(",
          CHAR_RIGHT_PARENTHESES: ")",
          CHAR_ASTERISK: "*",
          CHAR_AMPERSAND: "&",
          CHAR_AT: "@",
          CHAR_BACKSLASH: "\\",
          CHAR_BACKTICK: "`",
          CHAR_CARRIAGE_RETURN: "\r",
          CHAR_CIRCUMFLEX_ACCENT: "^",
          CHAR_COLON: ":",
          CHAR_COMMA: ",",
          CHAR_DOLLAR: "$",
          CHAR_DOT: ".",
          CHAR_DOUBLE_QUOTE: "\"",
          CHAR_EQUAL: "=",
          CHAR_EXCLAMATION_MARK: "!",
          CHAR_FORM_FEED: "\f",
          CHAR_FORWARD_SLASH: "/",
          CHAR_HASH: "#",
          CHAR_HYPHEN_MINUS: "-",
          CHAR_LEFT_ANGLE_BRACKET: "<",
          CHAR_LEFT_CURLY_BRACE: "{",
          CHAR_LEFT_SQUARE_BRACKET: "[",
          CHAR_LINE_FEED: `
`,
          CHAR_NO_BREAK_SPACE: "\xA0",
          CHAR_PERCENT: "%",
          CHAR_PLUS: "+",
          CHAR_QUESTION_MARK: "?",
          CHAR_RIGHT_ANGLE_BRACKET: ">",
          CHAR_RIGHT_CURLY_BRACE: "}",
          CHAR_RIGHT_SQUARE_BRACKET: "]",
          CHAR_SEMICOLON: ";",
          CHAR_SINGLE_QUOTE: "'",
          CHAR_SPACE: " ",
          CHAR_TAB: "	",
          CHAR_UNDERSCORE: "_",
          CHAR_VERTICAL_LINE: "|",
          CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF",
        };
      });
      var is = M((ln, rs) => {
        "use strict";
        var Ur = Dt(), {
          MAX_LENGTH: ts,
          CHAR_BACKSLASH: te,
          CHAR_BACKTICK: zr,
          CHAR_COMMA: Br,
          CHAR_DOT: jr,
          CHAR_LEFT_PARENTHESES: Fr,
          CHAR_RIGHT_PARENTHESES: Wr,
          CHAR_LEFT_CURLY_BRACE: Gr,
          CHAR_RIGHT_CURLY_BRACE: qr,
          CHAR_LEFT_SQUARE_BRACKET: es,
          CHAR_RIGHT_SQUARE_BRACKET: ss,
          CHAR_DOUBLE_QUOTE: Kr,
          CHAR_SINGLE_QUOTE: Qr,
          CHAR_NO_BREAK_SPACE: Xr,
          CHAR_ZERO_WIDTH_NOBREAK_SPACE: Vr,
        } = Je(), Zr = (e, t = {}) => {
          if (typeof e != "string") throw new TypeError("Expected a string");
          let s = t || {}, r = typeof s.maxLength == "number" ? Math.min(ts, s.maxLength) : ts;
          if (e.length > r) throw new SyntaxError(`Input length (${e.length}), exceeds max characters (${r})`);
          let i = { type: "root", input: e, nodes: [] }, n = [i], o = i, a = i, d = 0, f = e.length, h = 0, g = 0, l,
            _ = {}, A = () => e[h++], R = x => {
              if (x.type === "text" && a.type === "dot" && (a.type = "text"), a && a.type === "text" && x.type === "text") {
                a.value += x.value;
                return;
              }
              return o.nodes.push(x), x.parent = o, x.prev = a, a = x, x;
            };
          for (R({ type: "bos" }); h < f;) if (o = n[n.length - 1], l = A(), !(l === Vr || l === Xr)) {
            if (l === te) {
              R({ type: "text", value: (t.keepEscaping ? l : "") + A() });
              continue;
            }
            if (l === ss) {
              R({ type: "text", value: "\\" + l });
              continue;
            }
            if (l === es) {
              d++;
              let x = !0, $;
              for (; h < f && ($ = A());) {
                if (l += $, $ === es) {
                  d++;
                  continue;
                }
                if ($ === te) {
                  l += A();
                  continue;
                }
                if ($ === ss && (d--, d === 0)) break;
              }
              R({ type: "text", value: l });
              continue;
            }
            if (l === Fr) {
              o = R({ type: "paren", nodes: [] }), n.push(o), R({ type: "text", value: l });
              continue;
            }
            if (l === Wr) {
              if (o.type !== "paren") {
                R({ type: "text", value: l });
                continue;
              }
              o = n.pop(), R({ type: "text", value: l }), o = n[n.length - 1];
              continue;
            }
            if (l === Kr || l === Qr || l === zr) {
              let x = l, $;
              for (t.keepQuotes !== !0 && (l = ""); h < f && ($ = A());) {
                if ($ === te) {
                  l += $ + A();
                  continue;
                }
                if ($ === x) {
                  t.keepQuotes === !0 && (l += $);
                  break;
                }
                l += $;
              }
              R({ type: "text", value: l });
              continue;
            }
            if (l === Gr) {
              g++;
              let x = a.value && a.value.slice(-1) === "$" || o.dollar === !0;
              o = R({
                type: "brace",
                open: !0,
                close: !1,
                dollar: x,
                depth: g,
                commas: 0,
                ranges: 0,
                nodes: [],
              }), n.push(o), R({ type: "open", value: l });
              continue;
            }
            if (l === qr) {
              if (o.type !== "brace") {
                R({ type: "text", value: l });
                continue;
              }
              let x = "close";
              o = n.pop(), o.close = !0, R({ type: x, value: l }), g--, o = n[n.length - 1];
              continue;
            }
            if (l === Br && g > 0) {
              if (o.ranges > 0) {
                o.ranges = 0;
                let x = o.nodes.shift();
                o.nodes = [x, { type: "text", value: Ur(o) }];
              }
              R({ type: "comma", value: l }), o.commas++;
              continue;
            }
            if (l === jr && g > 0 && o.commas === 0) {
              let x = o.nodes;
              if (g === 0 || x.length === 0) {
                R({ type: "text", value: l });
                continue;
              }
              if (a.type === "dot") {
                if (o.range = [], a.value += l, a.type = "range", o.nodes.length !== 3 && o.nodes.length !== 5) {
                  o.invalid = !0, o.ranges = 0, a.type = "text";
                  continue;
                }
                o.ranges++, o.args = [];
                continue;
              }
              if (a.type === "range") {
                x.pop();
                let $ = x[x.length - 1];
                $.value += a.value + l, a = $, o.ranges--;
                continue;
              }
              R({ type: "dot", value: l });
              continue;
            }
            R({ type: "text", value: l });
          }
          do if (o = n.pop(), o.type !== "root") {
            o.nodes.forEach(H => {
              H.nodes || (H.type === "open" && (H.isOpen = !0), H.type === "close" && (H.isClose = !0), H.nodes || (H.type = "text"), H.invalid = !0);
            });
            let x = n[n.length - 1], $ = x.nodes.indexOf(o);
            x.nodes.splice($, 1, ...o.nodes);
          } while (n.length > 0);
          return R({ type: "eos" }), i;
        };
        rs.exports = Zr;
      });
      var as = M((cn, os) => {
        "use strict";
        var ns = Dt(), Yr = Qe(), Jr = Ze(), ti = is(), tt = (e, t = {}) => {
          let s = [];
          if (Array.isArray(e)) for (let r of e) {
            let i = tt.create(r, t);
            Array.isArray(i) ? s.push(...i) : s.push(i);
          } else s = [].concat(tt.create(e, t));
          return t && t.expand === !0 && t.nodupes === !0 && (s = [...new Set(s)]), s;
        };
        tt.parse = (e, t = {}) => ti(e, t);
        tt.stringify = (e, t = {}) => typeof e == "string" ? ns(tt.parse(e, t), t) : ns(e, t);
        tt.compile = (e, t = {}) => (typeof e == "string" && (e = tt.parse(e, t)), Yr(e, t));
        tt.expand = (e, t = {}) => {
          typeof e == "string" && (e = tt.parse(e, t));
          let s = Jr(e, t);
          return t.noempty === !0 && (s = s.filter(Boolean)), t.nodupes === !0 && (s = [...new Set(s)]), s;
        };
        tt.create = (e, t = {}) => e === "" || e.length < 3 ? [e] : t.expand !== !0 ? tt.compile(e, t) : tt.expand(e, t);
        os.exports = tt;
      });
      var xt = M((un, ps) => {
        "use strict";
        var ei = q("path"), at = "\\\\/", ls = `[^${at}]`, ct = "\\.", si = "\\+", ri = "\\?", Pt = "\\/", ii = "(?=.)",
          cs = "[^/]", ee = `(?:${Pt}|$)`, us = `(?:^|${Pt})`, se = `${ct}{1,2}${ee}`, ni = `(?!${ct})`,
          oi = `(?!${us}${se})`, ai = `(?!${ct}{0,1}${ee})`, li = `(?!${se})`, ci = `[^.${Pt}]`, ui = `${cs}*?`, hs = {
            DOT_LITERAL: ct,
            PLUS_LITERAL: si,
            QMARK_LITERAL: ri,
            SLASH_LITERAL: Pt,
            ONE_CHAR: ii,
            QMARK: cs,
            END_ANCHOR: ee,
            DOTS_SLASH: se,
            NO_DOT: ni,
            NO_DOTS: oi,
            NO_DOT_SLASH: ai,
            NO_DOTS_SLASH: li,
            QMARK_NO_DOT: ci,
            STAR: ui,
            START_ANCHOR: us,
          }, hi = k(E({}, hs), {
            SLASH_LITERAL: `[${at}]`,
            QMARK: ls,
            STAR: `${ls}*?`,
            DOTS_SLASH: `${ct}{1,2}(?:[${at}]|$)`,
            NO_DOT: `(?!${ct})`,
            NO_DOTS: `(?!(?:^|[${at}])${ct}{1,2}(?:[${at}]|$))`,
            NO_DOT_SLASH: `(?!${ct}{0,1}(?:[${at}]|$))`,
            NO_DOTS_SLASH: `(?!${ct}{1,2}(?:[${at}]|$))`,
            QMARK_NO_DOT: `[^.${at}]`,
            START_ANCHOR: `(?:^|[${at}])`,
            END_ANCHOR: `(?:[${at}]|$)`,
          }), pi = {
            alnum: "a-zA-Z0-9",
            alpha: "a-zA-Z",
            ascii: "\\x00-\\x7F",
            blank: " \\t",
            cntrl: "\\x00-\\x1F\\x7F",
            digit: "0-9",
            graph: "\\x21-\\x7E",
            lower: "a-z",
            print: "\\x20-\\x7E ",
            punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
            space: " \\t\\r\\n\\v\\f",
            upper: "A-Z",
            word: "A-Za-z0-9_",
            xdigit: "A-Fa-f0-9",
          };
        ps.exports = {
          MAX_LENGTH: 1024 * 64,
          POSIX_REGEX_SOURCE: pi,
          REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
          REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
          REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
          REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
          REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
          REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
          REPLACEMENTS: { "***": "*", "**/**": "**", "**/**/**": "**" },
          CHAR_0: 48,
          CHAR_9: 57,
          CHAR_UPPERCASE_A: 65,
          CHAR_LOWERCASE_A: 97,
          CHAR_UPPERCASE_Z: 90,
          CHAR_LOWERCASE_Z: 122,
          CHAR_LEFT_PARENTHESES: 40,
          CHAR_RIGHT_PARENTHESES: 41,
          CHAR_ASTERISK: 42,
          CHAR_AMPERSAND: 38,
          CHAR_AT: 64,
          CHAR_BACKWARD_SLASH: 92,
          CHAR_CARRIAGE_RETURN: 13,
          CHAR_CIRCUMFLEX_ACCENT: 94,
          CHAR_COLON: 58,
          CHAR_COMMA: 44,
          CHAR_DOT: 46,
          CHAR_DOUBLE_QUOTE: 34,
          CHAR_EQUAL: 61,
          CHAR_EXCLAMATION_MARK: 33,
          CHAR_FORM_FEED: 12,
          CHAR_FORWARD_SLASH: 47,
          CHAR_GRAVE_ACCENT: 96,
          CHAR_HASH: 35,
          CHAR_HYPHEN_MINUS: 45,
          CHAR_LEFT_ANGLE_BRACKET: 60,
          CHAR_LEFT_CURLY_BRACE: 123,
          CHAR_LEFT_SQUARE_BRACKET: 91,
          CHAR_LINE_FEED: 10,
          CHAR_NO_BREAK_SPACE: 160,
          CHAR_PERCENT: 37,
          CHAR_PLUS: 43,
          CHAR_QUESTION_MARK: 63,
          CHAR_RIGHT_ANGLE_BRACKET: 62,
          CHAR_RIGHT_CURLY_BRACE: 125,
          CHAR_RIGHT_SQUARE_BRACKET: 93,
          CHAR_SEMICOLON: 59,
          CHAR_SINGLE_QUOTE: 39,
          CHAR_SPACE: 32,
          CHAR_TAB: 9,
          CHAR_UNDERSCORE: 95,
          CHAR_VERTICAL_LINE: 124,
          CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
          SEP: ei.sep,
          extglobChars(e) {
            return {
              "!": { type: "negate", open: "(?:(?!(?:", close: `))${e.STAR})` },
              "?": { type: "qmark", open: "(?:", close: ")?" },
              "+": { type: "plus", open: "(?:", close: ")+" },
              "*": { type: "star", open: "(?:", close: ")*" },
              "@": { type: "at", open: "(?:", close: ")" },
            };
          },
          globChars(e) {
            return e === !0 ? hi : hs;
          },
        };
      });
      var Ct = M(X => {
        "use strict";
        var fi = q("path"), di = process.platform === "win32", {
          REGEX_BACKSLASH: gi,
          REGEX_REMOVE_BACKSLASH: mi,
          REGEX_SPECIAL_CHARS: yi,
          REGEX_SPECIAL_CHARS_GLOBAL: Ai,
        } = xt();
        X.isObject = e => e !== null && typeof e == "object" && !Array.isArray(e);
        X.hasRegexChars = e => yi.test(e);
        X.isRegexChar = e => e.length === 1 && X.hasRegexChars(e);
        X.escapeRegex = e => e.replace(Ai, "\\$1");
        X.toPosixSlashes = e => e.replace(gi, "/");
        X.removeBackslashes = e => e.replace(mi, t => t === "\\" ? "" : t);
        X.supportsLookbehinds = () => {
          let e = process.version.slice(1).split(".").map(Number);
          return e.length === 3 && e[0] >= 9 || e[0] === 8 && e[1] >= 10;
        };
        X.isWindows = e => e && typeof e.windows == "boolean" ? e.windows : di === !0 || fi.sep === "\\";
        X.escapeLast = (e, t, s) => {
          let r = e.lastIndexOf(t, s);
          return r === -1 ? e : e[r - 1] === "\\" ? X.escapeLast(e, t, r - 1) : `${e.slice(0, r)}\\${e.slice(r)}`;
        };
        X.removePrefix = (e, t = {}) => {
          let s = e;
          return s.startsWith("./") && (s = s.slice(2), t.prefix = "./"), s;
        };
        X.wrapOutput = (e, t = {}, s = {}) => {
          let r = s.contains ? "" : "^", i = s.contains ? "" : "$", n = `${r}(?:${e})${i}`;
          return t.negated === !0 && (n = `(?:^(?!${n}).*$)`), n;
        };
      });
      var _s = M((pn, Rs) => {
        "use strict";
        var fs = Ct(), {
          CHAR_ASTERISK: re,
          CHAR_AT: Ri,
          CHAR_BACKWARD_SLASH: Et,
          CHAR_COMMA: _i,
          CHAR_DOT: ie,
          CHAR_EXCLAMATION_MARK: ne,
          CHAR_FORWARD_SLASH: ds,
          CHAR_LEFT_CURLY_BRACE: oe,
          CHAR_LEFT_PARENTHESES: ae,
          CHAR_LEFT_SQUARE_BRACKET: bi,
          CHAR_PLUS: xi,
          CHAR_QUESTION_MARK: gs,
          CHAR_RIGHT_CURLY_BRACE: Ci,
          CHAR_RIGHT_PARENTHESES: ms,
          CHAR_RIGHT_SQUARE_BRACKET: Ei,
        } = xt(), ys = e => e === ds || e === Et, As = e => {
          e.isPrefix !== !0 && (e.depth = e.isGlobstar ? Infinity : 1);
        }, Si = (e, t) => {
          let s = t || {}, r = e.length - 1, i = s.parts === !0 || s.scanToEnd === !0, n = [], o = [], a = [], d = e,
            f = -1, h = 0, g = 0, l = !1, _ = !1, A = !1, R = !1, x = !1, $ = !1, H = !1, I = !1, Z = !1, j = !1,
            it = 0, F, b, T = { value: "", depth: 0, isGlob: !1 }, G = () => f >= r, p = () => d.charCodeAt(f + 1),
            N = () => (F = b, d.charCodeAt(++f));
          for (; f < r;) {
            b = N();
            let K;
            if (b === Et) {
              H = T.backslashes = !0, b = N(), b === oe && ($ = !0);
              continue;
            }
            if ($ === !0 || b === oe) {
              for (it++; G() !== !0 && (b = N());) {
                if (b === Et) {
                  H = T.backslashes = !0, N();
                  continue;
                }
                if (b === oe) {
                  it++;
                  continue;
                }
                if ($ !== !0 && b === ie && (b = N()) === ie) {
                  if (l = T.isBrace = !0, A = T.isGlob = !0, j = !0, i === !0) continue;
                  break;
                }
                if ($ !== !0 && b === _i) {
                  if (l = T.isBrace = !0, A = T.isGlob = !0, j = !0, i === !0) continue;
                  break;
                }
                if (b === Ci && (it--, it === 0)) {
                  $ = !1, l = T.isBrace = !0, j = !0;
                  break;
                }
              }
              if (i === !0) continue;
              break;
            }
            if (b === ds) {
              if (n.push(f), o.push(T), T = { value: "", depth: 0, isGlob: !1 }, j === !0) continue;
              if (F === ie && f === h + 1) {
                h += 2;
                continue;
              }
              g = f + 1;
              continue;
            }
            if (s.noext !== !0 && (b === xi || b === Ri || b === re || b === gs || b === ne) === !0 && p() === ae) {
              if (A = T.isGlob = !0, R = T.isExtglob = !0, j = !0, b === ne && f === h && (Z = !0), i === !0) {
                for (; G() !== !0 && (b = N());) {
                  if (b === Et) {
                    H = T.backslashes = !0, b = N();
                    continue;
                  }
                  if (b === ms) {
                    A = T.isGlob = !0, j = !0;
                    break;
                  }
                }
                continue;
              }
              break;
            }
            if (b === re) {
              if (F === re && (x = T.isGlobstar = !0), A = T.isGlob = !0, j = !0, i === !0) continue;
              break;
            }
            if (b === gs) {
              if (A = T.isGlob = !0, j = !0, i === !0) continue;
              break;
            }
            if (b === bi) {
              for (; G() !== !0 && (K = N());) {
                if (K === Et) {
                  H = T.backslashes = !0, N();
                  continue;
                }
                if (K === Ei) {
                  _ = T.isBracket = !0, A = T.isGlob = !0, j = !0;
                  break;
                }
              }
              if (i === !0) continue;
              break;
            }
            if (s.nonegate !== !0 && b === ne && f === h) {
              I = T.negated = !0, h++;
              continue;
            }
            if (s.noparen !== !0 && b === ae) {
              if (A = T.isGlob = !0, i === !0) {
                for (; G() !== !0 && (b = N());) {
                  if (b === ae) {
                    H = T.backslashes = !0, b = N();
                    continue;
                  }
                  if (b === ms) {
                    j = !0;
                    break;
                  }
                }
                continue;
              }
              break;
            }
            if (A === !0) {
              if (j = !0, i === !0) continue;
              break;
            }
          }
          s.noext === !0 && (R = !1, A = !1);
          let L = d, ut = "", c = "";
          h > 0 && (ut = d.slice(0, h), d = d.slice(h), g -= h), L && A === !0 && g > 0 ? (L = d.slice(0, g), c = d.slice(g)) : A === !0 ? (L = "", c = d) : L = d, L && L !== "" && L !== "/" && L !== d && ys(L.charCodeAt(L.length - 1)) && (L = L.slice(0, -1)), s.unescape === !0 && (c && (c = fs.removeBackslashes(c)), L && H === !0 && (L = fs.removeBackslashes(L)));
          let u = {
            prefix: ut,
            input: e,
            start: h,
            base: L,
            glob: c,
            isBrace: l,
            isBracket: _,
            isGlob: A,
            isExtglob: R,
            isGlobstar: x,
            negated: I,
            negatedExtglob: Z,
          };
          if (s.tokens === !0 && (u.maxDepth = 0, ys(b) || o.push(T), u.tokens = o), s.parts === !0 || s.tokens === !0) {
            let K;
            for (let w = 0; w < n.length; w++) {
              let nt = K ? K + 1 : h, ot = n[w], Y = e.slice(nt, ot);
              s.tokens && (w === 0 && h !== 0 ? (o[w].isPrefix = !0, o[w].value = ut) : o[w].value = Y, As(o[w]), u.maxDepth += o[w].depth), (w !== 0 || Y !== "") && a.push(Y), K = ot;
            }
            if (K && K + 1 < e.length) {
              let w = e.slice(K + 1);
              a.push(w), s.tokens && (o[o.length - 1].value = w, As(o[o.length - 1]), u.maxDepth += o[o.length - 1].depth);
            }
            u.slashes = n, u.parts = a;
          }
          return u;
        };
        Rs.exports = Si;
      });
      var Es = M((fn, Cs) => {
        "use strict";
        var Ut = xt(), et = Ct(), {
          MAX_LENGTH: zt,
          POSIX_REGEX_SOURCE: $i,
          REGEX_NON_SPECIAL_CHARS: wi,
          REGEX_SPECIAL_CHARS_BACKREF: vi,
          REPLACEMENTS: bs,
        } = Ut, Ti = (e, t) => {
          if (typeof t.expandRange == "function") return t.expandRange(...e, t);
          e.sort();
          let s = `[${e.join("-")}]`;
          try {
            new RegExp(s);
          } catch (r) {
            return e.map(i => et.escapeRegex(i)).join("..");
          }
          return s;
        }, At = (e, t) => `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`, xs = (e, t) => {
          if (typeof e != "string") throw new TypeError("Expected a string");
          e = bs[e] || e;
          let s = E({}, t), r = typeof s.maxLength == "number" ? Math.min(zt, s.maxLength) : zt, i = e.length;
          if (i > r) throw new SyntaxError(`Input length: ${i}, exceeds maximum allowed length: ${r}`);
          let n = { type: "bos", value: "", output: s.prepend || "" }, o = [n], a = s.capture ? "" : "?:",
            d = et.isWindows(t), f = Ut.globChars(d), h = Ut.extglobChars(f), {
              DOT_LITERAL: g,
              PLUS_LITERAL: l,
              SLASH_LITERAL: _,
              ONE_CHAR: A,
              DOTS_SLASH: R,
              NO_DOT: x,
              NO_DOT_SLASH: $,
              NO_DOTS_SLASH: H,
              QMARK: I,
              QMARK_NO_DOT: Z,
              STAR: j,
              START_ANCHOR: it,
            } = f, F = y => `(${a}(?:(?!${it}${y.dot ? R : g}).)*?)`, b = s.dot ? "" : x, T = s.dot ? I : Z,
            G = s.bash === !0 ? F(s) : j;
          s.capture && (G = `(${G})`), typeof s.noext == "boolean" && (s.noextglob = s.noext);
          let p = {
            input: e,
            index: -1,
            start: 0,
            dot: s.dot === !0,
            consumed: "",
            output: "",
            prefix: "",
            backtrack: !1,
            negated: !1,
            brackets: 0,
            braces: 0,
            parens: 0,
            quotes: 0,
            globstar: !1,
            tokens: o,
          };
          e = et.removePrefix(e, p), i = e.length;
          let N = [], L = [], ut = [], c = n, u, K = () => p.index === i - 1, w = p.peek = (y = 1) => e[p.index + y],
            nt = p.advance = () => e[++p.index] || "", ot = () => e.slice(p.index + 1), Y = (y = "", O = 0) => {
              p.consumed += y, p.index += O;
            }, Lt = y => {
              p.output += y.output != null ? y.output : y.value, Y(y.value);
            }, lr = () => {
              let y = 1;
              for (; w() === "!" && (w(2) !== "(" || w(3) === "?");) nt(), p.start++, y++;
              return y % 2 == 0 ? !1 : (p.negated = !0, p.start++, !0);
            }, Ot = y => {
              p[y]++, ut.push(y);
            }, ft = y => {
              p[y]--, ut.pop();
            }, S = y => {
              if (c.type === "globstar") {
                let O = p.braces > 0 && (y.type === "comma" || y.type === "brace"),
                  m = y.extglob === !0 || N.length && (y.type === "pipe" || y.type === "paren");
                y.type !== "slash" && y.type !== "paren" && !O && !m && (p.output = p.output.slice(0, -c.output.length), c.type = "star", c.value = "*", c.output = G, p.output += c.output);
              }
              if (N.length && y.type !== "paren" && (N[N.length - 1].inner += y.value), (y.value || y.output) && Lt(y), c && c.type === "text" && y.type === "text") {
                c.value += y.value, c.output = (c.output || "") + y.value;
                return;
              }
              y.prev = c, o.push(y), c = y;
            }, kt = (y, O) => {
              let m = k(E({}, h[O]), { conditions: 1, inner: "" });
              m.prev = c, m.parens = p.parens, m.output = p.output;
              let C = (s.capture ? "(" : "") + m.open;
              Ot("parens"), S({ type: y, value: O, output: p.output ? "" : A }), S({
                type: "paren",
                extglob: !0,
                value: nt(),
                output: C,
              }), N.push(m);
            }, cr = y => {
              let O = y.close + (s.capture ? ")" : ""), m;
              if (y.type === "negate") {
                let C = G;
                y.inner && y.inner.length > 1 && y.inner.includes("/") && (C = F(s)), (C !== G || K() || /^\)+$/.test(ot())) && (O = y.close = `)$))${C}`), y.inner.includes("*") && (m = ot()) && /^\.[^\\/.]+$/.test(m) && (O = y.close = `)${m})${C})`), y.prev.type === "bos" && (p.negatedExtglob = !0);
              }
              S({ type: "paren", extglob: !0, value: u, output: O }), ft("parens");
            };
          if (s.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(e)) {
            let y = !1,
              O = e.replace(vi, (m, C, U, Q, W, Xt) => Q === "\\" ? (y = !0, m) : Q === "?" ? C ? C + Q + (W ? I.repeat(W.length) : "") : Xt === 0 ? T + (W ? I.repeat(W.length) : "") : I.repeat(U.length) : Q === "." ? g.repeat(U.length) : Q === "*" ? C ? C + Q + (W ? G : "") : G : C ? m : `\\${m}`);
            return y === !0 && (s.unescape === !0 ? O = O.replace(/\\/g, "") : O = O.replace(/\\+/g, m => m.length % 2 == 0 ? "\\\\" : m ? "\\" : "")), O === e && s.contains === !0 ? (p.output = e, p) : (p.output = et.wrapOutput(O, p, t), p);
          }
          for (; !K();) {
            if (u = nt(), u === "\0") continue;
            if (u === "\\") {
              let m = w();
              if (m === "/" && s.bash !== !0 || m === "." || m === ";") continue;
              if (!m) {
                u += "\\", S({ type: "text", value: u });
                continue;
              }
              let C = /^\\+/.exec(ot()), U = 0;
              if (C && C[0].length > 2 && (U = C[0].length, p.index += U, U % 2 != 0 && (u += "\\")), s.unescape === !0 ? u = nt() : u += nt(), p.brackets === 0) {
                S({ type: "text", value: u });
                continue;
              }
            }
            if (p.brackets > 0 && (u !== "]" || c.value === "[" || c.value === "[^")) {
              if (s.posix !== !1 && u === ":") {
                let m = c.value.slice(1);
                if (m.includes("[") && (c.posix = !0, m.includes(":"))) {
                  let C = c.value.lastIndexOf("["), U = c.value.slice(0, C), Q = c.value.slice(C + 2), W = $i[Q];
                  if (W) {
                    c.value = U + W, p.backtrack = !0, nt(), !n.output && o.indexOf(c) === 1 && (n.output = A);
                    continue;
                  }
                }
              }
              (u === "[" && w() !== ":" || u === "-" && w() === "]") && (u = `\\${u}`), u === "]" && (c.value === "[" || c.value === "[^") && (u = `\\${u}`), s.posix === !0 && u === "!" && c.value === "[" && (u = "^"), c.value += u, Lt({ value: u });
              continue;
            }
            if (p.quotes === 1 && u !== "\"") {
              u = et.escapeRegex(u), c.value += u, Lt({ value: u });
              continue;
            }
            if (u === "\"") {
              p.quotes = p.quotes === 1 ? 0 : 1, s.keepQuotes === !0 && S({ type: "text", value: u });
              continue;
            }
            if (u === "(") {
              Ot("parens"), S({ type: "paren", value: u });
              continue;
            }
            if (u === ")") {
              if (p.parens === 0 && s.strictBrackets === !0) throw new SyntaxError(At("opening", "("));
              let m = N[N.length - 1];
              if (m && p.parens === m.parens + 1) {
                cr(N.pop());
                continue;
              }
              S({ type: "paren", value: u, output: p.parens ? ")" : "\\)" }), ft("parens");
              continue;
            }
            if (u === "[") {
              if (s.nobracket === !0 || !ot().includes("]")) {
                if (s.nobracket !== !0 && s.strictBrackets === !0) throw new SyntaxError(At("closing", "]"));
                u = `\\${u}`;
              } else Ot("brackets");
              S({ type: "bracket", value: u });
              continue;
            }
            if (u === "]") {
              if (s.nobracket === !0 || c && c.type === "bracket" && c.value.length === 1) {
                S({ type: "text", value: u, output: `\\${u}` });
                continue;
              }
              if (p.brackets === 0) {
                if (s.strictBrackets === !0) throw new SyntaxError(At("opening", "["));
                S({ type: "text", value: u, output: `\\${u}` });
                continue;
              }
              ft("brackets");
              let m = c.value.slice(1);
              if (c.posix !== !0 && m[0] === "^" && !m.includes("/") && (u = `/${u}`), c.value += u, Lt({ value: u }), s.literalBrackets === !1 || et.hasRegexChars(m)) continue;
              let C = et.escapeRegex(c.value);
              if (p.output = p.output.slice(0, -c.value.length), s.literalBrackets === !0) {
                p.output += C, c.value = C;
                continue;
              }
              c.value = `(${a}${C}|${c.value})`, p.output += c.value;
              continue;
            }
            if (u === "{" && s.nobrace !== !0) {
              Ot("braces");
              let m = {
                type: "brace",
                value: u,
                output: "(",
                outputIndex: p.output.length,
                tokensIndex: p.tokens.length,
              };
              L.push(m), S(m);
              continue;
            }
            if (u === "}") {
              let m = L[L.length - 1];
              if (s.nobrace === !0 || !m) {
                S({ type: "text", value: u, output: u });
                continue;
              }
              let C = ")";
              if (m.dots === !0) {
                let U = o.slice(), Q = [];
                for (let W = U.length - 1; W >= 0 && (o.pop(), U[W].type !== "brace"); W--) U[W].type !== "dots" && Q.unshift(U[W].value);
                C = Ti(Q, s), p.backtrack = !0;
              }
              if (m.comma !== !0 && m.dots !== !0) {
                let U = p.output.slice(0, m.outputIndex), Q = p.tokens.slice(m.tokensIndex);
                m.value = m.output = "\\{", u = C = "\\}", p.output = U;
                for (let W of Q) p.output += W.output || W.value;
              }
              S({ type: "brace", value: u, output: C }), ft("braces"), L.pop();
              continue;
            }
            if (u === "|") {
              N.length > 0 && N[N.length - 1].conditions++, S({ type: "text", value: u });
              continue;
            }
            if (u === ",") {
              let m = u, C = L[L.length - 1];
              C && ut[ut.length - 1] === "braces" && (C.comma = !0, m = "|"), S({ type: "comma", value: u, output: m });
              continue;
            }
            if (u === "/") {
              if (c.type === "dot" && p.index === p.start + 1) {
                p.start = p.index + 1, p.consumed = "", p.output = "", o.pop(), c = n;
                continue;
              }
              S({ type: "slash", value: u, output: _ });
              continue;
            }
            if (u === ".") {
              if (p.braces > 0 && c.type === "dot") {
                c.value === "." && (c.output = g);
                let m = L[L.length - 1];
                c.type = "dots", c.output += u, c.value += u, m.dots = !0;
                continue;
              }
              if (p.braces + p.parens === 0 && c.type !== "bos" && c.type !== "slash") {
                S({ type: "text", value: u, output: g });
                continue;
              }
              S({ type: "dot", value: u, output: g });
              continue;
            }
            if (u === "?") {
              if (!(c && c.value === "(") && s.noextglob !== !0 && w() === "(" && w(2) !== "?") {
                kt("qmark", u);
                continue;
              }
              if (c && c.type === "paren") {
                let C = w(), U = u;
                if (C === "<" && !et.supportsLookbehinds()) throw new Error("Node.js v10 or higher is required for regex lookbehinds");
                (c.value === "(" && !/[!=<:]/.test(C) || C === "<" && !/<([!=]|\w+>)/.test(ot())) && (U = `\\${u}`), S({
                  type: "text",
                  value: u,
                  output: U,
                });
                continue;
              }
              if (s.dot !== !0 && (c.type === "slash" || c.type === "bos")) {
                S({ type: "qmark", value: u, output: Z });
                continue;
              }
              S({ type: "qmark", value: u, output: I });
              continue;
            }
            if (u === "!") {
              if (s.noextglob !== !0 && w() === "(" && (w(2) !== "?" || !/[!=<:]/.test(w(3)))) {
                kt("negate", u);
                continue;
              }
              if (s.nonegate !== !0 && p.index === 0) {
                lr();
                continue;
              }
            }
            if (u === "+") {
              if (s.noextglob !== !0 && w() === "(" && w(2) !== "?") {
                kt("plus", u);
                continue;
              }
              if (c && c.value === "(" || s.regex === !1) {
                S({ type: "plus", value: u, output: l });
                continue;
              }
              if (c && (c.type === "bracket" || c.type === "paren" || c.type === "brace") || p.parens > 0) {
                S({ type: "plus", value: u });
                continue;
              }
              S({ type: "plus", value: l });
              continue;
            }
            if (u === "@") {
              if (s.noextglob !== !0 && w() === "(" && w(2) !== "?") {
                S({ type: "at", extglob: !0, value: u, output: "" });
                continue;
              }
              S({ type: "text", value: u });
              continue;
            }
            if (u !== "*") {
              (u === "$" || u === "^") && (u = `\\${u}`);
              let m = wi.exec(ot());
              m && (u += m[0], p.index += m[0].length), S({ type: "text", value: u });
              continue;
            }
            if (c && (c.type === "globstar" || c.star === !0)) {
              c.type = "star", c.star = !0, c.value += u, c.output = G, p.backtrack = !0, p.globstar = !0, Y(u);
              continue;
            }
            let y = ot();
            if (s.noextglob !== !0 && /^\([^?]/.test(y)) {
              kt("star", u);
              continue;
            }
            if (c.type === "star") {
              if (s.noglobstar === !0) {
                Y(u);
                continue;
              }
              let m = c.prev, C = m.prev, U = m.type === "slash" || m.type === "bos",
                Q = C && (C.type === "star" || C.type === "globstar");
              if (s.bash === !0 && (!U || y[0] && y[0] !== "/")) {
                S({ type: "star", value: u, output: "" });
                continue;
              }
              let W = p.braces > 0 && (m.type === "comma" || m.type === "brace"),
                Xt = N.length && (m.type === "pipe" || m.type === "paren");
              if (!U && m.type !== "paren" && !W && !Xt) {
                S({ type: "star", value: u, output: "" });
                continue;
              }
              for (; y.slice(0, 3) === "/**";) {
                let It = e[p.index + 4];
                if (It && It !== "/") break;
                y = y.slice(3), Y("/**", 3);
              }
              if (m.type === "bos" && K()) {
                c.type = "globstar", c.value += u, c.output = F(s), p.output = c.output, p.globstar = !0, Y(u);
                continue;
              }
              if (m.type === "slash" && m.prev.type !== "bos" && !Q && K()) {
                p.output = p.output.slice(0, -(m.output + c.output).length), m.output = `(?:${m.output}`, c.type = "globstar", c.output = F(s) + (s.strictSlashes ? ")" : "|$)"), c.value += u, p.globstar = !0, p.output += m.output + c.output, Y(u);
                continue;
              }
              if (m.type === "slash" && m.prev.type !== "bos" && y[0] === "/") {
                let It = y[1] !== void 0 ? "|$" : "";
                p.output = p.output.slice(0, -(m.output + c.output).length), m.output = `(?:${m.output}`, c.type = "globstar", c.output = `${F(s)}${_}|${_}${It})`, c.value += u, p.output += m.output + c.output, p.globstar = !0, Y(u + nt()), S({
                  type: "slash",
                  value: "/",
                  output: "",
                });
                continue;
              }
              if (m.type === "bos" && y[0] === "/") {
                c.type = "globstar", c.value += u, c.output = `(?:^|${_}|${F(s)}${_})`, p.output = c.output, p.globstar = !0, Y(u + nt()), S({
                  type: "slash",
                  value: "/",
                  output: "",
                });
                continue;
              }
              p.output = p.output.slice(0, -c.output.length), c.type = "globstar", c.output = F(s), c.value += u, p.output += c.output, p.globstar = !0, Y(u);
              continue;
            }
            let O = { type: "star", value: u, output: G };
            if (s.bash === !0) {
              O.output = ".*?", (c.type === "bos" || c.type === "slash") && (O.output = b + O.output), S(O);
              continue;
            }
            if (c && (c.type === "bracket" || c.type === "paren") && s.regex === !0) {
              O.output = u, S(O);
              continue;
            }
            (p.index === p.start || c.type === "slash" || c.type === "dot") && (c.type === "dot" ? (p.output += $, c.output += $) : s.dot === !0 ? (p.output += H, c.output += H) : (p.output += b, c.output += b), w() !== "*" && (p.output += A, c.output += A)), S(O);
          }
          for (; p.brackets > 0;) {
            if (s.strictBrackets === !0) throw new SyntaxError(At("closing", "]"));
            p.output = et.escapeLast(p.output, "["), ft("brackets");
          }
          for (; p.parens > 0;) {
            if (s.strictBrackets === !0) throw new SyntaxError(At("closing", ")"));
            p.output = et.escapeLast(p.output, "("), ft("parens");
          }
          for (; p.braces > 0;) {
            if (s.strictBrackets === !0) throw new SyntaxError(At("closing", "}"));
            p.output = et.escapeLast(p.output, "{"), ft("braces");
          }
          if (s.strictSlashes !== !0 && (c.type === "star" || c.type === "bracket") && S({
            type: "maybe_slash",
            value: "",
            output: `${_}?`,
          }), p.backtrack === !0) {
            p.output = "";
            for (let y of p.tokens) p.output += y.output != null ? y.output : y.value, y.suffix && (p.output += y.suffix);
          }
          return p;
        };
        xs.fastpaths = (e, t) => {
          let s = E({}, t), r = typeof s.maxLength == "number" ? Math.min(zt, s.maxLength) : zt, i = e.length;
          if (i > r) throw new SyntaxError(`Input length: ${i}, exceeds maximum allowed length: ${r}`);
          e = bs[e] || e;
          let n = et.isWindows(t), {
              DOT_LITERAL: o,
              SLASH_LITERAL: a,
              ONE_CHAR: d,
              DOTS_SLASH: f,
              NO_DOT: h,
              NO_DOTS: g,
              NO_DOTS_SLASH: l,
              STAR: _,
              START_ANCHOR: A,
            } = Ut.globChars(n), R = s.dot ? g : h, x = s.dot ? l : h, $ = s.capture ? "" : "?:",
            H = { negated: !1, prefix: "" }, I = s.bash === !0 ? ".*?" : _;
          s.capture && (I = `(${I})`);
          let Z = b => b.noglobstar === !0 ? I : `(${$}(?:(?!${A}${b.dot ? f : o}).)*?)`, j = b => {
            switch (b) {
              case"*":
                return `${R}${d}${I}`;
              case".*":
                return `${o}${d}${I}`;
              case"*.*":
                return `${R}${I}${o}${d}${I}`;
              case"*/*":
                return `${R}${I}${a}${d}${x}${I}`;
              case"**":
                return R + Z(s);
              case"**/*":
                return `(?:${R}${Z(s)}${a})?${x}${d}${I}`;
              case"**/*.*":
                return `(?:${R}${Z(s)}${a})?${x}${I}${o}${d}${I}`;
              case"**/.*":
                return `(?:${R}${Z(s)}${a})?${o}${d}${I}`;
              default: {
                let T = /^(.*?)\.(\w+)$/.exec(b);
                if (!T) return;
                let G = j(T[1]);
                return G ? G + o + T[2] : void 0;
              }
            }
          }, it = et.removePrefix(e, H), F = j(it);
          return F && s.strictSlashes !== !0 && (F += `${a}?`), F;
        };
        Cs.exports = xs;
      });
      var $s = M((dn, Ss) => {
        "use strict";
        var Hi = q("path"), Li = _s(), le = Es(), ce = Ct(), Oi = xt(),
          ki = e => e && typeof e == "object" && !Array.isArray(e), z = (e, t, s = !1) => {
            if (Array.isArray(e)) {
              let h = e.map(l => z(l, t, s));
              return l => {
                for (let _ of h) {
                  let A = _(l);
                  if (A) return A;
                }
                return !1;
              };
            }
            let r = ki(e) && e.tokens && e.input;
            if (e === "" || typeof e != "string" && !r) throw new TypeError("Expected pattern to be a non-empty string");
            let i = t || {}, n = ce.isWindows(t), o = r ? z.compileRe(e, t) : z.makeRe(e, t, !1, !0), a = o.state;
            delete o.state;
            let d = () => !1;
            if (i.ignore) {
              let h = k(E({}, t), { ignore: null, onMatch: null, onResult: null });
              d = z(i.ignore, h, s);
            }
            let f = (h, g = !1) => {
              let { isMatch: l, match: _, output: A } = z.test(h, o, t, { glob: e, posix: n }),
                R = { glob: e, state: a, regex: o, posix: n, input: h, output: A, match: _, isMatch: l };
              return typeof i.onResult == "function" && i.onResult(R), l === !1 ? (R.isMatch = !1, g ? R : !1) : d(h) ? (typeof i.onIgnore == "function" && i.onIgnore(R), R.isMatch = !1, g ? R : !1) : (typeof i.onMatch == "function" && i.onMatch(R), g ? R : !0);
            };
            return s && (f.state = a), f;
          };
        z.test = (e, t, s, { glob: r, posix: i } = {}) => {
          if (typeof e != "string") throw new TypeError("Expected input to be a string");
          if (e === "") return { isMatch: !1, output: "" };
          let n = s || {}, o = n.format || (i ? ce.toPosixSlashes : null), a = e === r, d = a && o ? o(e) : e;
          return a === !1 && (d = o ? o(e) : e, a = d === r), (a === !1 || n.capture === !0) && (n.matchBase === !0 || n.basename === !0 ? a = z.matchBase(e, t, s, i) : a = t.exec(d)), {
            isMatch: Boolean(a),
            match: a,
            output: d,
          };
        };
        z.matchBase = (e, t, s, r = ce.isWindows(s)) => (t instanceof RegExp ? t : z.makeRe(t, s)).test(Hi.basename(e));
        z.isMatch = (e, t, s) => z(t, s)(e);
        z.parse = (e, t) => Array.isArray(e) ? e.map(s => z.parse(s, t)) : le(e, k(E({}, t), { fastpaths: !1 }));
        z.scan = (e, t) => Li(e, t);
        z.compileRe = (e, t, s = !1, r = !1) => {
          if (s === !0) return e.output;
          let i = t || {}, n = i.contains ? "" : "^", o = i.contains ? "" : "$", a = `${n}(?:${e.output})${o}`;
          e && e.negated === !0 && (a = `^(?!${a}).*$`);
          let d = z.toRegex(a, t);
          return r === !0 && (d.state = e), d;
        };
        z.makeRe = (e, t = {}, s = !1, r = !1) => {
          if (!e || typeof e != "string") throw new TypeError("Expected a non-empty string");
          let i = { negated: !1, fastpaths: !0 };
          return t.fastpaths !== !1 && (e[0] === "." || e[0] === "*") && (i.output = le.fastpaths(e, t)), i.output || (i = le(e, t)), z.compileRe(i, t, s, r);
        };
        z.toRegex = (e, t) => {
          try {
            let s = t || {};
            return new RegExp(e, s.flags || (s.nocase ? "i" : ""));
          } catch (s) {
            if (t && t.debug === !0) throw s;
            return /$^/;
          }
        };
        z.constants = Oi;
        Ss.exports = z;
      });
      var vs = M((gn, ws) => {
        "use strict";
        ws.exports = $s();
      });
      var ks = M((mn, Os) => {
        "use strict";
        var Ts = q("util"), Hs = as(), lt = vs(), ue = Ct(), Ls = e => e === "" || e === "./", D = (e, t, s) => {
          t = [].concat(t), e = [].concat(e);
          let r = new Set, i = new Set, n = new Set, o = 0, a = h => {
            n.add(h.output), s && s.onResult && s.onResult(h);
          };
          for (let h = 0; h < t.length; h++) {
            let g = lt(String(t[h]), k(E({}, s), { onResult: a }), !0), l = g.state.negated || g.state.negatedExtglob;
            l && o++;
            for (let _ of e) {
              let A = g(_, !0);
              !(l ? !A.isMatch : A.isMatch) || (l ? r.add(A.output) : (r.delete(A.output), i.add(A.output)));
            }
          }
          let f = (o === t.length ? [...n] : [...i]).filter(h => !r.has(h));
          if (s && f.length === 0) {
            if (s.failglob === !0) throw new Error(`No matches found for "${t.join(", ")}"`);
            if (s.nonull === !0 || s.nullglob === !0) return s.unescape ? t.map(h => h.replace(/\\/g, "")) : t;
          }
          return f;
        };
        D.match = D;
        D.matcher = (e, t) => lt(e, t);
        D.isMatch = (e, t, s) => lt(t, s)(e);
        D.any = D.isMatch;
        D.not = (e, t, s = {}) => {
          t = [].concat(t).map(String);
          let r = new Set, i = [], n = a => {
            s.onResult && s.onResult(a), i.push(a.output);
          }, o = D(e, t, k(E({}, s), { onResult: n }));
          for (let a of i) o.includes(a) || r.add(a);
          return [...r];
        };
        D.contains = (e, t, s) => {
          if (typeof e != "string") throw new TypeError(`Expected a string: "${Ts.inspect(e)}"`);
          if (Array.isArray(t)) return t.some(r => D.contains(e, r, s));
          if (typeof t == "string") {
            if (Ls(e) || Ls(t)) return !1;
            if (e.includes(t) || e.startsWith("./") && e.slice(2).includes(t)) return !0;
          }
          return D.isMatch(e, t, k(E({}, s), { contains: !0 }));
        };
        D.matchKeys = (e, t, s) => {
          if (!ue.isObject(e)) throw new TypeError("Expected the first argument to be an object");
          let r = D(Object.keys(e), t, s), i = {};
          for (let n of r) i[n] = e[n];
          return i;
        };
        D.some = (e, t, s) => {
          let r = [].concat(e);
          for (let i of [].concat(t)) {
            let n = lt(String(i), s);
            if (r.some(o => n(o))) return !0;
          }
          return !1;
        };
        D.every = (e, t, s) => {
          let r = [].concat(e);
          for (let i of [].concat(t)) {
            let n = lt(String(i), s);
            if (!r.every(o => n(o))) return !1;
          }
          return !0;
        };
        D.all = (e, t, s) => {
          if (typeof e != "string") throw new TypeError(`Expected a string: "${Ts.inspect(e)}"`);
          return [].concat(t).every(r => lt(r, s)(e));
        };
        D.capture = (e, t, s) => {
          let r = ue.isWindows(s),
            n = lt.makeRe(String(e), k(E({}, s), { capture: !0 })).exec(r ? ue.toPosixSlashes(t) : t);
          if (n) return n.slice(1).map(o => o === void 0 ? "" : o);
        };
        D.makeRe = (...e) => lt.makeRe(...e);
        D.scan = (...e) => lt.scan(...e);
        D.parse = (e, t) => {
          let s = [];
          for (let r of [].concat(e || [])) for (let i of Hs(String(r), t)) s.push(lt.parse(i, t));
          return s;
        };
        D.braces = (e, t) => {
          if (typeof e != "string") throw new TypeError("Expected a string");
          return t && t.nobrace === !0 || !/\{.*\}/.test(e) ? [e] : Hs(e, t);
        };
        D.braceExpand = (e, t) => {
          if (typeof e != "string") throw new TypeError("Expected a string");
          return D.braces(e, k(E({}, t), { expand: !0 }));
        };
        Os.exports = D;
      });
      var he = M((yn, Ns) => {
        "use strict";
        var v = (...e) => e.every(t => t) ? e.join("") : "", B = e => e ? encodeURIComponent(e) : "", St = {
          sshtemplate: ({ domain: e, user: t, project: s, committish: r }) => `git@${e}:${t}/${s}.git${v("#", r)}`,
          sshurltemplate: ({
                             domain: e,
                             user: t,
                             project: s,
                             committish: r,
                           }) => `git+ssh://git@${e}/${t}/${s}.git${v("#", r)}`,
          edittemplate: ({
                           domain: e,
                           user: t,
                           project: s,
                           committish: r,
                           editpath: i,
                           path: n,
                         }) => `https://${e}/${t}/${s}${v("/", i, "/", B(r || "master"), "/", n)}`,
          browsetemplate: ({
                             domain: e,
                             user: t,
                             project: s,
                             committish: r,
                             treepath: i,
                           }) => `https://${e}/${t}/${s}${v("/", i, "/", B(r))}`,
          browsefiletemplate: ({
                                 domain: e,
                                 user: t,
                                 project: s,
                                 committish: r,
                                 treepath: i,
                                 path: n,
                                 fragment: o,
                                 hashformat: a,
                               }) => `https://${e}/${t}/${s}/${i}/${B(r || "master")}/${n}${v("#", a(o || ""))}`,
          docstemplate: ({
                           domain: e,
                           user: t,
                           project: s,
                           treepath: r,
                           committish: i,
                         }) => `https://${e}/${t}/${s}${v("/", r, "/", B(i))}#readme`,
          httpstemplate: ({
                            auth: e,
                            domain: t,
                            user: s,
                            project: r,
                            committish: i,
                          }) => `git+https://${v(e, "@")}${t}/${s}/${r}.git${v("#", i)}`,
          filetemplate: ({
                           domain: e,
                           user: t,
                           project: s,
                           committish: r,
                           path: i,
                         }) => `https://${e}/${t}/${s}/raw/${B(r) || "master"}/${i}`,
          shortcuttemplate: ({ type: e, user: t, project: s, committish: r }) => `${e}:${t}/${s}${v("#", r)}`,
          pathtemplate: ({ user: e, project: t, committish: s }) => `${e}/${t}${v("#", s)}`,
          bugstemplate: ({ domain: e, user: t, project: s }) => `https://${e}/${t}/${s}/issues`,
          hashformat: Is,
        }, rt = {};
        rt.github = Object.assign({}, St, {
          protocols: ["git:", "http:", "git+ssh:", "git+https:", "ssh:", "https:"],
          domain: "github.com",
          treepath: "tree",
          editpath: "edit",
          filetemplate: ({
                           auth: e,
                           user: t,
                           project: s,
                           committish: r,
                           path: i,
                         }) => `https://${v(e, "@")}raw.githubusercontent.com/${t}/${s}/${B(r) || "master"}/${i}`,
          gittemplate: ({
                          auth: e,
                          domain: t,
                          user: s,
                          project: r,
                          committish: i,
                        }) => `git://${v(e, "@")}${t}/${s}/${r}.git${v("#", i)}`,
          tarballtemplate: ({
                              domain: e,
                              user: t,
                              project: s,
                              committish: r,
                            }) => `https://codeload.${e}/${t}/${s}/tar.gz/${B(r) || "master"}`,
          extract: e => {
            let [, t, s, r, i] = e.pathname.split("/", 5);
            if (!(r && r !== "tree") && (r || (i = e.hash.slice(1)), s && s.endsWith(".git") && (s = s.slice(0, -4)), !(!t || !s))) return {
              user: t,
              project: s,
              committish: i,
            };
          },
        });
        rt.bitbucket = Object.assign({}, St, {
          protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
          domain: "bitbucket.org",
          treepath: "src",
          editpath: "?mode=edit",
          edittemplate: ({
                           domain: e,
                           user: t,
                           project: s,
                           committish: r,
                           treepath: i,
                           path: n,
                           editpath: o,
                         }) => `https://${e}/${t}/${s}${v("/", i, "/", B(r || "master"), "/", n, o)}`,
          tarballtemplate: ({
                              domain: e,
                              user: t,
                              project: s,
                              committish: r,
                            }) => `https://${e}/${t}/${s}/get/${B(r) || "master"}.tar.gz`,
          extract: e => {
            let [, t, s, r] = e.pathname.split("/", 4);
            if (!["get"].includes(r) && (s && s.endsWith(".git") && (s = s.slice(0, -4)), !(!t || !s))) return {
              user: t,
              project: s,
              committish: e.hash.slice(1),
            };
          },
        });
        rt.gitlab = Object.assign({}, St, {
          protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
          domain: "gitlab.com",
          treepath: "tree",
          editpath: "-/edit",
          httpstemplate: ({
                            auth: e,
                            domain: t,
                            user: s,
                            project: r,
                            committish: i,
                          }) => `git+https://${v(e, "@")}${t}/${s}/${r}.git${v("#", i)}`,
          tarballtemplate: ({
                              domain: e,
                              user: t,
                              project: s,
                              committish: r,
                            }) => `https://${e}/${t}/${s}/repository/archive.tar.gz?ref=${B(r) || "master"}`,
          extract: e => {
            let t = e.pathname.slice(1);
            if (t.includes("/-/") || t.includes("/archive.tar.gz")) return;
            let s = t.split("/"), r = s.pop();
            r.endsWith(".git") && (r = r.slice(0, -4));
            let i = s.join("/");
            if (!(!i || !r)) return { user: i, project: r, committish: e.hash.slice(1) };
          },
        });
        rt.gist = Object.assign({}, St, {
          protocols: ["git:", "git+ssh:", "git+https:", "ssh:", "https:"],
          domain: "gist.github.com",
          editpath: "edit",
          sshtemplate: ({ domain: e, project: t, committish: s }) => `git@${e}:${t}.git${v("#", s)}`,
          sshurltemplate: ({ domain: e, project: t, committish: s }) => `git+ssh://git@${e}/${t}.git${v("#", s)}`,
          edittemplate: ({
                           domain: e,
                           user: t,
                           project: s,
                           committish: r,
                           editpath: i,
                         }) => `https://${e}/${t}/${s}${v("/", B(r))}/${i}`,
          browsetemplate: ({ domain: e, project: t, committish: s }) => `https://${e}/${t}${v("/", B(s))}`,
          browsefiletemplate: ({
                                 domain: e,
                                 project: t,
                                 committish: s,
                                 path: r,
                                 hashformat: i,
                               }) => `https://${e}/${t}${v("/", B(s))}${v("#", i(r))}`,
          docstemplate: ({ domain: e, project: t, committish: s }) => `https://${e}/${t}${v("/", B(s))}`,
          httpstemplate: ({ domain: e, project: t, committish: s }) => `git+https://${e}/${t}.git${v("#", s)}`,
          filetemplate: ({
                           user: e,
                           project: t,
                           committish: s,
                           path: r,
                         }) => `https://gist.githubusercontent.com/${e}/${t}/raw${v("/", B(s))}/${r}`,
          shortcuttemplate: ({ type: e, project: t, committish: s }) => `${e}:${t}${v("#", s)}`,
          pathtemplate: ({ project: e, committish: t }) => `${e}${v("#", t)}`,
          bugstemplate: ({ domain: e, project: t }) => `https://${e}/${t}`,
          gittemplate: ({ domain: e, project: t, committish: s }) => `git://${e}/${t}.git${v("#", s)}`,
          tarballtemplate: ({
                              project: e,
                              committish: t,
                            }) => `https://codeload.github.com/gist/${e}/tar.gz/${B(t) || "master"}`,
          extract: e => {
            let [, t, s, r] = e.pathname.split("/", 4);
            if (r !== "raw") {
              if (!s) {
                if (!t) return;
                s = t, t = null;
              }
              return s.endsWith(".git") && (s = s.slice(0, -4)), { user: t, project: s, committish: e.hash.slice(1) };
            }
          },
          hashformat: function(e) {
            return e && "file-" + Is(e);
          },
        });
        rt.sourcehut = Object.assign({}, St, {
          protocols: ["git+ssh:", "https:"],
          domain: "git.sr.ht",
          treepath: "tree",
          browsefiletemplate: ({
                                 domain: e,
                                 user: t,
                                 project: s,
                                 committish: r,
                                 treepath: i,
                                 path: n,
                                 fragment: o,
                                 hashformat: a,
                               }) => `https://${e}/${t}/${s}/${i}/${B(r || "main")}/${n}${v("#", a(o || ""))}`,
          filetemplate: ({
                           domain: e,
                           user: t,
                           project: s,
                           committish: r,
                           path: i,
                         }) => `https://${e}/${t}/${s}/blob/${B(r) || "main"}/${i}`,
          httpstemplate: ({
                            domain: e,
                            user: t,
                            project: s,
                            committish: r,
                          }) => `https://${e}/${t}/${s}.git${v("#", r)}`,
          tarballtemplate: ({
                              domain: e,
                              user: t,
                              project: s,
                              committish: r,
                            }) => `https://${e}/${t}/${s}/archive/${B(r) || "main"}.tar.gz`,
          bugstemplate: ({ domain: e, user: t, project: s }) => `https://todo.sr.ht/${t}/${s}`,
          docstemplate: ({
                           domain: e,
                           user: t,
                           project: s,
                           treepath: r,
                           committish: i,
                         }) => `https://${e}/${t}/${s}${v("/", r, "/", B(i))}#readme`,
          extract: e => {
            let [, t, s, r] = e.pathname.split("/", 4);
            if (!["archive"].includes(r) && (s && s.endsWith(".git") && (s = s.slice(0, -4)), !(!t || !s))) return {
              user: t,
              project: s,
              committish: e.hash.slice(1),
            };
          },
        });
        var Ii = Object.keys(rt);
        rt.byShortcut = {};
        rt.byDomain = {};
        for (let e of Ii) rt.byShortcut[`${e}:`] = e, rt.byDomain[rt[e].domain] = e;

        function Is(e) {
          return e.toLowerCase().replace(/^\W+|\/|\W+$/g, "").replace(/\W+/g, "-");
        }

        Ns.exports = rt;
      });
      var Ps = M((An, Ms) => {
        "use strict";
        var Ni = he(), Ds = class {
          constructor(t, s, r, i, n, o, a = {}) {
            Object.assign(this, Ni[t]), this.type = t, this.user = s, this.auth = r, this.project = i, this.committish = n, this.default = o, this.opts = a;
          }

          hash() {
            return this.committish ? `#${this.committish}` : "";
          }

          ssh(t) {
            return this._fill(this.sshtemplate, t);
          }

          _fill(t, s) {
            if (typeof t == "function") {
              let r = E(E(E({}, this), this.opts), s);
              r.path || (r.path = ""), r.path.startsWith("/") && (r.path = r.path.slice(1)), r.noCommittish && (r.committish = null);
              let i = t(r);
              return r.noGitPlus && i.startsWith("git+") ? i.slice(4) : i;
            }
            return null;
          }

          sshurl(t) {
            return this._fill(this.sshurltemplate, t);
          }

          browse(t, s, r) {
            return typeof t != "string" ? this._fill(this.browsetemplate, t) : (typeof s != "string" && (r = s, s = null), this._fill(this.browsefiletemplate, k(E({}, r), {
              fragment: s,
              path: t,
            })));
          }

          docs(t) {
            return this._fill(this.docstemplate, t);
          }

          bugs(t) {
            return this._fill(this.bugstemplate, t);
          }

          https(t) {
            return this._fill(this.httpstemplate, t);
          }

          git(t) {
            return this._fill(this.gittemplate, t);
          }

          shortcut(t) {
            return this._fill(this.shortcuttemplate, t);
          }

          path(t) {
            return this._fill(this.pathtemplate, t);
          }

          tarball(t) {
            return this._fill(this.tarballtemplate, k(E({}, t), { noCommittish: !1 }));
          }

          file(t, s) {
            return this._fill(this.filetemplate, k(E({}, s), { path: t }));
          }

          edit(t, s) {
            return this._fill(this.edittemplate, k(E({}, s), { path: t }));
          }

          getDefaultRepresentation() {
            return this.default;
          }

          toString(t) {
            return this.default && typeof this[this.default] == "function" ? this[this.default](t) : this.sshurl(t);
          }
        };
        Ms.exports = Ds;
      });
      var Ws = M((bn, Fs) => {
        var $t = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date,
          Di = typeof AbortController == "function", Bt = Di ? AbortController : class {
            constructor() {
              this.signal = new Us;
            }

            abort() {
              this.signal.dispatchEvent("abort");
            }
          }, Mi = typeof AbortSignal == "function", Pi = typeof Bt.AbortSignal == "function",
          Us = Mi ? AbortSignal : Pi ? Bt.AbortController : class {
            constructor() {
              this.aborted = !1, this._listeners = [];
            }

            dispatchEvent(t) {
              if (t === "abort") {
                this.aborted = !0;
                let s = { type: t, target: this };
                this.onabort(s), this._listeners.forEach(r => r(s), this);
              }
            }

            onabort() {
            }

            addEventListener(t, s) {
              t === "abort" && this._listeners.push(s);
            }

            removeEventListener(t, s) {
              t === "abort" && (this._listeners = this._listeners.filter(r => r !== s));
            }
          }, pe = new Set, fe = (e, t) => {
            let s = `LRU_CACHE_OPTION_${e}`;
            jt(s) && ge(s, `${e} option`, `options.${t}`, pt);
          }, de = (e, t) => {
            let s = `LRU_CACHE_METHOD_${e}`;
            if (jt(s)) {
              let { prototype: r } = pt, { get: i } = Object.getOwnPropertyDescriptor(r, e);
              ge(s, `${e} method`, `cache.${t}()`, i);
            }
          }, Ui = (e, t) => {
            let s = `LRU_CACHE_PROPERTY_${e}`;
            if (jt(s)) {
              let { prototype: r } = pt, { get: i } = Object.getOwnPropertyDescriptor(r, e);
              ge(s, `${e} property`, `cache.${t}`, i);
            }
          }, zs = (...e) => {
            typeof process == "object" && process && typeof process.emitWarning == "function" ? process.emitWarning(...e) : console.error(...e);
          }, jt = e => !pe.has(e), ge = (e, t, s, r) => {
            pe.add(e);
            let i = `The ${t} is deprecated. Please use ${s} instead.`;
            zs(i, "DeprecationWarning", e, r);
          }, ht = e => e && e === Math.floor(e) && e > 0 && isFinite(e),
          Bs = e => ht(e) ? e <= Math.pow(2, 8) ? Uint8Array : e <= Math.pow(2, 16) ? Uint16Array : e <= Math.pow(2, 32) ? Uint32Array : e <= Number.MAX_SAFE_INTEGER ? wt : null : null,
          wt = class extends Array {
            constructor(t) {
              super(t);
              this.fill(0);
            }
          }, js = class {
            constructor(t) {
              if (t === 0) return [];
              let s = Bs(t);
              this.heap = new s(t), this.length = 0;
            }

            push(t) {
              this.heap[this.length++] = t;
            }

            pop() {
              return this.heap[--this.length];
            }
          }, pt = class {
            constructor(t = {}) {
              let {
                max: s = 0,
                ttl: r,
                ttlResolution: i = 1,
                ttlAutopurge: n,
                updateAgeOnGet: o,
                updateAgeOnHas: a,
                allowStale: d,
                dispose: f,
                disposeAfter: h,
                noDisposeOnSet: g,
                noUpdateTTL: l,
                maxSize: _ = 0,
                maxEntrySize: A = 0,
                sizeCalculation: R,
                fetchMethod: x,
                fetchContext: $,
                noDeleteOnFetchRejection: H,
                noDeleteOnStaleGet: I,
              } = t, { length: Z, maxAge: j, stale: it } = t instanceof pt ? {} : t;
              if (s !== 0 && !ht(s)) throw new TypeError("max option must be a nonnegative integer");
              let F = s ? Bs(s) : Array;
              if (!F) throw new Error("invalid max value: " + s);
              if (this.max = s, this.maxSize = _, this.maxEntrySize = A || this.maxSize, this.sizeCalculation = R || Z, this.sizeCalculation) {
                if (!this.maxSize && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
                if (typeof this.sizeCalculation != "function") throw new TypeError("sizeCalculation set to non-function");
              }
              if (this.fetchMethod = x || null, this.fetchMethod && typeof this.fetchMethod != "function") throw new TypeError("fetchMethod must be a function if specified");
              if (this.fetchContext = $, !this.fetchMethod && $ !== void 0) throw new TypeError("cannot set fetchContext without fetchMethod");
              if (this.keyMap = new Map, this.keyList = new Array(s).fill(null), this.valList = new Array(s).fill(null), this.next = new F(s), this.prev = new F(s), this.head = 0, this.tail = 0, this.free = new js(s), this.initialFill = 1, this.size = 0, typeof f == "function" && (this.dispose = f), typeof h == "function" ? (this.disposeAfter = h, this.disposed = []) : (this.disposeAfter = null, this.disposed = null), this.noDisposeOnSet = !!g, this.noUpdateTTL = !!l, this.noDeleteOnFetchRejection = !!H, this.maxEntrySize !== 0) {
                if (this.maxSize !== 0 && !ht(this.maxSize)) throw new TypeError("maxSize must be a positive integer if specified");
                if (!ht(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
                this.initializeSizeTracking();
              }
              if (this.allowStale = !!d || !!it, this.noDeleteOnStaleGet = !!I, this.updateAgeOnGet = !!o, this.updateAgeOnHas = !!a, this.ttlResolution = ht(i) || i === 0 ? i : 1, this.ttlAutopurge = !!n, this.ttl = r || j || 0, this.ttl) {
                if (!ht(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
                this.initializeTTLTracking();
              }
              if (this.max === 0 && this.ttl === 0 && this.maxSize === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
              if (!this.ttlAutopurge && !this.max && !this.maxSize) {
                let b = "LRU_CACHE_UNBOUNDED";
                jt(b) && (pe.add(b), zs("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", b, pt));
              }
              it && fe("stale", "allowStale"), j && fe("maxAge", "ttl"), Z && fe("length", "sizeCalculation");
            }

            getRemainingTTL(t) {
              return this.has(t, { updateAgeOnHas: !1 }) ? Infinity : 0;
            }

            initializeTTLTracking() {
              this.ttls = new wt(this.max), this.starts = new wt(this.max), this.setItemTTL = (r, i, n = $t.now()) => {
                if (this.starts[r] = i !== 0 ? n : 0, this.ttls[r] = i, i !== 0 && this.ttlAutopurge) {
                  let o = setTimeout(() => {
                    this.isStale(r) && this.delete(this.keyList[r]);
                  }, i + 1);
                  o.unref && o.unref();
                }
              }, this.updateItemAge = r => {
                this.starts[r] = this.ttls[r] !== 0 ? $t.now() : 0;
              };
              let t = 0, s = () => {
                let r = $t.now();
                if (this.ttlResolution > 0) {
                  t = r;
                  let i = setTimeout(() => t = 0, this.ttlResolution);
                  i.unref && i.unref();
                }
                return r;
              };
              this.getRemainingTTL = r => {
                let i = this.keyMap.get(r);
                return i === void 0 ? 0 : this.ttls[i] === 0 || this.starts[i] === 0 ? Infinity : this.starts[i] + this.ttls[i] - (t || s());
              }, this.isStale = r => this.ttls[r] !== 0 && this.starts[r] !== 0 && (t || s()) - this.starts[r] > this.ttls[r];
            }

            updateItemAge(t) {
            }

            setItemTTL(t, s, r) {
            }

            isStale(t) {
              return !1;
            }

            initializeSizeTracking() {
              this.calculatedSize = 0, this.sizes = new wt(this.max), this.removeItemSize = t => {
                this.calculatedSize -= this.sizes[t], this.sizes[t] = 0;
              }, this.requireSize = (t, s, r, i) => {
                if (!ht(r)) if (i) {
                  if (typeof i != "function") throw new TypeError("sizeCalculation must be a function");
                  if (r = i(s, t), !ht(r)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
                } else throw new TypeError("invalid size value (must be positive integer)");
                return r;
              }, this.addItemSize = (t, s) => {
                this.sizes[t] = s;
                let r = this.maxSize - this.sizes[t];
                for (; this.calculatedSize > r;) this.evict(!0);
                this.calculatedSize += this.sizes[t];
              };
            }

            removeItemSize(t) {
            }

            addItemSize(t, s) {
            }

            requireSize(t, s, r, i) {
              if (r || i) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
            }

            * indexes({ allowStale: t = this.allowStale } = {}) {
              if (this.size) for (let s = this.tail; !(!this.isValidIndex(s) || ((t || !this.isStale(s)) && (yield s), s === this.head));) s = this.prev[s];
            }

            * rindexes({ allowStale: t = this.allowStale } = {}) {
              if (this.size) for (let s = this.head; !(!this.isValidIndex(s) || ((t || !this.isStale(s)) && (yield s), s === this.tail));) s = this.next[s];
            }

            isValidIndex(t) {
              return this.keyMap.get(this.keyList[t]) === t;
            }

            * entries() {
              for (let t of this.indexes()) yield[this.keyList[t], this.valList[t]];
            }

            * rentries() {
              for (let t of this.rindexes()) yield[this.keyList[t], this.valList[t]];
            }

            * keys() {
              for (let t of this.indexes()) yield this.keyList[t];
            }

            * rkeys() {
              for (let t of this.rindexes()) yield this.keyList[t];
            }

            * values() {
              for (let t of this.indexes()) yield this.valList[t];
            }

            * rvalues() {
              for (let t of this.rindexes()) yield this.valList[t];
            }

            [Symbol.iterator]() {
              return this.entries();
            }

            find(t, s = {}) {
              for (let r of this.indexes()) if (t(this.valList[r], this.keyList[r], this)) return this.get(this.keyList[r], s);
            }

            forEach(t, s = this) {
              for (let r of this.indexes()) t.call(s, this.valList[r], this.keyList[r], this);
            }

            rforEach(t, s = this) {
              for (let r of this.rindexes()) t.call(s, this.valList[r], this.keyList[r], this);
            }

            get prune() {
              return de("prune", "purgeStale"), this.purgeStale;
            }

            purgeStale() {
              let t = !1;
              for (let s of this.rindexes({ allowStale: !0 })) this.isStale(s) && (this.delete(this.keyList[s]), t = !0);
              return t;
            }

            dump() {
              let t = [];
              for (let s of this.indexes({ allowStale: !0 })) {
                let r = this.keyList[s], i = this.valList[s],
                  o = { value: this.isBackgroundFetch(i) ? i.__staleWhileFetching : i };
                if (this.ttls) {
                  o.ttl = this.ttls[s];
                  let a = $t.now() - this.starts[s];
                  o.start = Math.floor(Date.now() - a);
                }
                this.sizes && (o.size = this.sizes[s]), t.unshift([r, o]);
              }
              return t;
            }

            load(t) {
              this.clear();
              for (let [s, r] of t) {
                if (r.start) {
                  let i = Date.now() - r.start;
                  r.start = $t.now() - i;
                }
                this.set(s, r.value, r);
              }
            }

            dispose(t, s, r) {
            }

            set(t, s, {
              ttl: r = this.ttl,
              start: i,
              noDisposeOnSet: n = this.noDisposeOnSet,
              size: o = 0,
              sizeCalculation: a = this.sizeCalculation,
              noUpdateTTL: d = this.noUpdateTTL,
            } = {}) {
              if (o = this.requireSize(t, s, o, a), this.maxEntrySize && o > this.maxEntrySize) return this;
              let f = this.size === 0 ? void 0 : this.keyMap.get(t);
              if (f === void 0) f = this.newIndex(), this.keyList[f] = t, this.valList[f] = s, this.keyMap.set(t, f), this.next[this.tail] = f, this.prev[f] = this.tail, this.tail = f, this.size++, this.addItemSize(f, o), d = !1; else {
                let h = this.valList[f];
                s !== h && (this.isBackgroundFetch(h) ? h.__abortController.abort() : n || (this.dispose(h, t, "set"), this.disposeAfter && this.disposed.push([h, t, "set"])), this.removeItemSize(f), this.valList[f] = s, this.addItemSize(f, o)), this.moveToTail(f);
              }
              if (r !== 0 && this.ttl === 0 && !this.ttls && this.initializeTTLTracking(), d || this.setItemTTL(f, r, i), this.disposeAfter) for (; this.disposed.length;) this.disposeAfter(...this.disposed.shift());
              return this;
            }

            newIndex() {
              return this.size === 0 ? this.tail : this.size === this.max && this.max !== 0 ? this.evict(!1) : this.free.length !== 0 ? this.free.pop() : this.initialFill++;
            }

            pop() {
              if (this.size) {
                let t = this.valList[this.head];
                return this.evict(!0), t;
              }
            }

            evict(t) {
              let s = this.head, r = this.keyList[s], i = this.valList[s];
              return this.isBackgroundFetch(i) ? i.__abortController.abort() : (this.dispose(i, r, "evict"), this.disposeAfter && this.disposed.push([i, r, "evict"])), this.removeItemSize(s), t && (this.keyList[s] = null, this.valList[s] = null, this.free.push(s)), this.head = this.next[s], this.keyMap.delete(r), this.size--, s;
            }

            has(t, { updateAgeOnHas: s = this.updateAgeOnHas } = {}) {
              let r = this.keyMap.get(t);
              return r !== void 0 && !this.isStale(r) ? (s && this.updateItemAge(r), !0) : !1;
            }

            peek(t, { allowStale: s = this.allowStale } = {}) {
              let r = this.keyMap.get(t);
              if (r !== void 0 && (s || !this.isStale(r))) {
                let i = this.valList[r];
                return this.isBackgroundFetch(i) ? i.__staleWhileFetching : i;
              }
            }

            backgroundFetch(t, s, r, i) {
              let n = s === void 0 ? void 0 : this.valList[s];
              if (this.isBackgroundFetch(n)) return n;
              let o = new Bt, a = { signal: o.signal, options: r, context: i },
                d = l => (o.signal.aborted || this.set(t, l, a.options), l), f = l => {
                  if (this.valList[s] === g && (!r.noDeleteOnFetchRejection || g.__staleWhileFetching === void 0 ? this.delete(t) : this.valList[s] = g.__staleWhileFetching), g.__returned === g) throw l;
                }, h = l => l(this.fetchMethod(t, n, a)), g = new Promise(h).then(d, f);
              return g.__abortController = o, g.__staleWhileFetching = n, g.__returned = null, s === void 0 ? (this.set(t, g, a.options), s = this.keyMap.get(t)) : this.valList[s] = g, g;
            }

            isBackgroundFetch(t) {
              return t && typeof t == "object" && typeof t.then == "function" && Object.prototype.hasOwnProperty.call(t, "__staleWhileFetching") && Object.prototype.hasOwnProperty.call(t, "__returned") && (t.__returned === t || t.__returned === null);
            }

            async fetch(t, {
              allowStale: s = this.allowStale,
              updateAgeOnGet: r = this.updateAgeOnGet,
              noDeleteOnStaleGet: i = this.noDeleteOnStaleGet,
              ttl: n = this.ttl,
              noDisposeOnSet: o = this.noDisposeOnSet,
              size: a = 0,
              sizeCalculation: d = this.sizeCalculation,
              noUpdateTTL: f = this.noUpdateTTL,
              noDeleteOnFetchRejection: h = this.noDeleteOnFetchRejection,
              fetchContext: g = this.fetchContext,
              forceRefresh: l = !1,
            } = {}) {
              if (!this.fetchMethod) return this.get(t, { allowStale: s, updateAgeOnGet: r, noDeleteOnStaleGet: i });
              let _ = {
                allowStale: s,
                updateAgeOnGet: r,
                noDeleteOnStaleGet: i,
                ttl: n,
                noDisposeOnSet: o,
                size: a,
                sizeCalculation: d,
                noUpdateTTL: f,
                noDeleteOnFetchRejection: h,
              }, A = this.keyMap.get(t);
              if (A === void 0) {
                let R = this.backgroundFetch(t, A, _, g);
                return R.__returned = R;
              } else {
                let R = this.valList[A];
                if (this.isBackgroundFetch(R)) return s && R.__staleWhileFetching !== void 0 ? R.__staleWhileFetching : R.__returned = R;
                if (!l && !this.isStale(A)) return this.moveToTail(A), r && this.updateItemAge(A), R;
                let x = this.backgroundFetch(t, A, _, g);
                return s && x.__staleWhileFetching !== void 0 ? x.__staleWhileFetching : x.__returned = x;
              }
            }

            get(t, {
              allowStale: s = this.allowStale,
              updateAgeOnGet: r = this.updateAgeOnGet,
              noDeleteOnStaleGet: i = this.noDeleteOnStaleGet,
            } = {}) {
              let n = this.keyMap.get(t);
              if (n !== void 0) {
                let o = this.valList[n], a = this.isBackgroundFetch(o);
                return this.isStale(n) ? a ? s ? o.__staleWhileFetching : void 0 : (i || this.delete(t), s ? o : void 0) : a ? void 0 : (this.moveToTail(n), r && this.updateItemAge(n), o);
              }
            }

            connect(t, s) {
              this.prev[s] = t, this.next[t] = s;
            }

            moveToTail(t) {
              t !== this.tail && (t === this.head ? this.head = this.next[t] : this.connect(this.prev[t], this.next[t]), this.connect(this.tail, t), this.tail = t);
            }

            get del() {
              return de("del", "delete"), this.delete;
            }

            delete(t) {
              let s = !1;
              if (this.size !== 0) {
                let r = this.keyMap.get(t);
                if (r !== void 0) if (s = !0, this.size === 1) this.clear(); else {
                  this.removeItemSize(r);
                  let i = this.valList[r];
                  this.isBackgroundFetch(i) ? i.__abortController.abort() : (this.dispose(i, t, "delete"), this.disposeAfter && this.disposed.push([i, t, "delete"])), this.keyMap.delete(t), this.keyList[r] = null, this.valList[r] = null, r === this.tail ? this.tail = this.prev[r] : r === this.head ? this.head = this.next[r] : (this.next[this.prev[r]] = this.next[r], this.prev[this.next[r]] = this.prev[r]), this.size--, this.free.push(r);
                }
              }
              if (this.disposed) for (; this.disposed.length;) this.disposeAfter(...this.disposed.shift());
              return s;
            }

            clear() {
              for (let t of this.rindexes({ allowStale: !0 })) {
                let s = this.valList[t];
                if (this.isBackgroundFetch(s)) s.__abortController.abort(); else {
                  let r = this.keyList[t];
                  this.dispose(s, r, "delete"), this.disposeAfter && this.disposed.push([s, r, "delete"]);
                }
              }
              if (this.keyMap.clear(), this.valList.fill(null), this.keyList.fill(null), this.ttls && (this.ttls.fill(0), this.starts.fill(0)), this.sizes && this.sizes.fill(0), this.head = 0, this.tail = 0, this.initialFill = 1, this.free.length = 0, this.calculatedSize = 0, this.size = 0, this.disposed) for (; this.disposed.length;) this.disposeAfter(...this.disposed.shift());
            }

            get reset() {
              return de("reset", "clear"), this.clear;
            }

            get length() {
              return Ui("length", "size"), this.size;
            }

            static get AbortController() {
              return Bt;
            }

            static get AbortSignal() {
              return Us;
            }
          };
        Fs.exports = pt;
      });
      var me = M((xn, Gs) => {
        Gs.exports = (e = {}) => E({
          "git+ssh:": { name: "sshurl" },
          "ssh:": { name: "sshurl" },
          "git+https:": { name: "https", auth: !0 },
          "git:": { auth: !0 },
          "http:": { auth: !0 },
          "https:": { auth: !0 },
          "git+http:": { auth: !0 },
        }, Object.keys(e).reduce((t, s) => (t[s] = { name: e[s] }, t), {}));
      });
      var Qs = M((Cn, Ks) => {
        var zi = q("url"), Bi = me(), ye = (e, t, s) => {
          let r = e.indexOf(s);
          return e.lastIndexOf(t, r > -1 ? r : Infinity);
        }, qs = e => {
          try {
            return new zi.URL(e);
          } catch {
          }
        }, ji = (e, t) => {
          let s = e.indexOf(":"), r = e.slice(0, s + 1);
          if (Object.prototype.hasOwnProperty.call(t, r)) return e;
          let i = e.indexOf("@");
          return i > -1 ? i > s ? `git+ssh://${e}` : e : e.indexOf("//") === s + 1 ? e : `${e.slice(0, s + 1)}//${e.slice(s + 1)}`;
        }, Fi = e => {
          let t = ye(e, "@", "#"), s = ye(e, ":", "#");
          return s > t && (e = e.slice(0, s) + "/" + e.slice(s + 1)), ye(e, ":", "#") === -1 && e.indexOf("//") === -1 && (e = `git+ssh://${e}`), e;
        };
        Ks.exports = (e, t = Bi()) => {
          let s = ji(e, t);
          return qs(s) || qs(Fi(s));
        };
      });
      var Vs = M((En, Wt) => {
        "use strict";
        var Ft = he(), Wi = Wt.exports = Ps(), Gi = Ws(), Xs = Qs(), vt = me()(Ft.byShortcut),
          Ae = new Gi({ max: 1e3 });
        Wt.exports.fromUrl = function(e, t) {
          if (typeof e != "string") return;
          let s = e + JSON.stringify(t || {});
          return Ae.has(s) || Ae.set(s, qi(e, t)), Ae.get(s);
        };
        Wt.exports.parseUrl = Xs;

        function qi(e, t) {
          if (!e) return;
          let s = Ki(e) ? `github:${e}` : e, r = Xs(s, vt);
          if (!r) return;
          let i = Ft.byShortcut[r.protocol],
            n = Ft.byDomain[r.hostname.startsWith("www.") ? r.hostname.slice(4) : r.hostname], o = i || n;
          if (!o) return;
          let a = Ft[i || n], d = null;
          vt[r.protocol] && vt[r.protocol].auth && (r.username || r.password) && (d = `${r.username}${r.password ? ":" + r.password : ""}`);
          let f = null, h = null, g = null, l = null;
          try {
            if (i) {
              let _ = r.pathname.startsWith("/") ? r.pathname.slice(1) : r.pathname, A = _.indexOf("@");
              A > -1 && (_ = _.slice(A + 1));
              let R = _.lastIndexOf("/");
              R > -1 ? (h = decodeURIComponent(_.slice(0, R)), h || (h = null), g = decodeURIComponent(_.slice(R + 1))) : g = decodeURIComponent(_), g.endsWith(".git") && (g = g.slice(0, -4)), r.hash && (f = decodeURIComponent(r.hash.slice(1))), l = "shortcut";
            } else {
              if (!a.protocols.includes(r.protocol)) return;
              let _ = a.extract(r);
              if (!_) return;
              h = _.user && decodeURIComponent(_.user), g = decodeURIComponent(_.project), f = decodeURIComponent(_.committish), l = vt[r.protocol] && vt[r.protocol].name || r.protocol.slice(0, -1);
            }
          } catch (_) {
            if (_ instanceof URIError) return;
            throw _;
          }
          return new Wi(o, h, d, g, f, l, t);
        }

        var Ki = e => {
          let t = e.indexOf("#"), s = e.indexOf("/"), r = e.indexOf("/", s + 1), i = e.indexOf(":"), n = /\s/.exec(e),
            o = e.indexOf("@"), a = !n || t > -1 && n.index > t, d = o === -1 || t > -1 && o > t,
            f = i === -1 || t > -1 && i > t, h = r === -1 || t > -1 && r > t, g = s > 0,
            l = t > -1 ? e[t - 1] !== "/" : !e.endsWith("/"), _ = !e.startsWith(".");
          return a && g && l && _ && d && f && h;
        };
      });
      var Zi = {};
      Ar(Zi, { default: () => Vi });
      var ar = J(q("@yarnpkg/core"));
      var Kt = J(q("@yarnpkg/cli")), P = J(q("@yarnpkg/core")), V = J(q("clipanion")), be = J(ks()), nr = J(q("path")),
        Qt = J(q("semver")), mt = J(q("typanion"));
      var Rt = J(q("@yarnpkg/core")), er = J(q("@yarnpkg/plugin-essentials"));
      var Zs = J(Vs()), Tt = J(q("semver")), Ys = Boolean;

      function Js({ raw: e }) {
        if (e.homepage) return e.homepage;
        let t = e.repository,
          s = typeof t == "string" ? t : typeof t == "object" && typeof t.url == "string" ? t.url : null,
          r = s ? (0, Zs.fromUrl)(s) : void 0, i = (r == null ? void 0 : r.committish) ? `#${r.committish}` : "";
        return r ? `https://${r.domain}/${r.user}/${r.project}${i}` : s;
      }

      function tr(e, t) {
        return Tt.default.parse(t).prerelease.length ? Tt.default.lt(e, t) : Tt.default.lt(Tt.default.coerce(e), t);
      }

      var Re = class {
        constructor(t, s, r, i) {
          this.configuration = t;
          this.project = s;
          this.workspace = r;
          this.cache = i;
        }

        async fetch({ descriptor: t, includeRange: s, includeURL: r, pkg: i }) {
          let [n, o, a] = await Promise.all([this.suggest(i, "latest"), s ? this.suggest(i, t.range) : Promise.resolve(), r ? this.fetchURL(i) : Promise.resolve()]);
          if (!n) {
            let d = Rt.structUtils.prettyIdent(this.configuration, i);
            throw new Error(`Could not fetch candidate for ${d}.`);
          }
          return { latest: n.range, range: o == null ? void 0 : o.range, url: a != null ? a : void 0 };
        }

        suggest(t, s) {
          return er.suggestUtils.fetchDescriptorFrom(t, s, {
            cache: this.cache,
            preserveModifier: !1,
            project: this.project,
            workspace: this.workspace,
          });
        }

        async fetchURL(t) {
          var n;
          let s = this.configuration.makeFetcher(), r = await s.fetch(t, {
            cache: this.cache,
            checksums: this.project.storedChecksums,
            fetcher: s,
            project: this.project,
            report: new Rt.ThrowReport,
            skipIntegrityCheck: !0,
          }), i;
          try {
            i = await Rt.Manifest.find(r.prefixPath, { baseFs: r.packageFs });
          } finally {
            (n = r.releaseFs) == null || n.call(r);
          }
          return Js(i);
        }
      };
      var Gt = J(q("@yarnpkg/core")), Qi = /^([0-9]+\.)([0-9]+\.)(.+)$/,
        sr = ["name", "current", "range", "latest", "workspace", "type", "url"], qt = class {
          constructor(t, s, r, i, n) {
            this.format = t;
            this.writer = s;
            this.configuration = r;
            this.dependencies = i;
            this.extraColumns = n;
            this.sizes = null;
            this.headers = {
              current: "Current",
              latest: "Latest",
              name: "Package",
              range: "Range",
              type: "Package Type",
              url: "URL",
              workspace: "Workspace",
            };
          }

          print() {
            this.sizes = this.getColumnSizes(), this.printHeader(), this.dependencies.forEach(t => {
              var i, n;
              let s = this.getDiffColor(t.severity.latest), r = this.getDiffColor(t.severity.range);
              this.printRow({
                current: t.current.padEnd(this.sizes.current),
                latest: this.formatVersion(t, "latest", s),
                name: this.applyColor(t.name.padEnd(this.sizes.name), s),
                range: this.formatVersion(t, "range", r),
                type: t.type.padEnd(this.sizes.type),
                url: (i = t.url) == null ? void 0 : i.padEnd(this.sizes.url),
                workspace: (n = t.workspace) == null ? void 0 : n.padEnd(this.sizes.workspace),
              });
            });
          }

          applyColor(t, s) {
            return s ? Gt.formatUtils.pretty(this.configuration, t, s) : t;
          }

          formatVersion(t, s, r) {
            var f;
            let i = (f = t[s]) == null ? void 0 : f.padEnd(this.sizes[s]);
            if (!i) return;
            let n = i.match(Qi);
            if (!n || !r) return i;
            let o = ["red", "yellow", "green"].indexOf(r) + 1, a = n.slice(1, o).join(""), d = n.slice(o).join("");
            return a + Gt.formatUtils.pretty(this.configuration, this.applyColor(d, r), "bold");
          }

          getDiffColor(t) {
            return t ? { major: "red", minor: "yellow", patch: "green" }[t] : null;
          }

          getColumnSizes() {
            let t = sr.reduce((s, r) => k(E({}, s), { [r]: this.headers[r].length }), {});
            for (let s of this.dependencies) for (let [r, i] of Object.entries(s)) {
              let n = t[r], o = (i || "").length;
              t[r] = n > o ? n : o;
            }
            return t;
          }

          formatColumnHeader(t) {
            return Gt.formatUtils.pretty(this.configuration, this.headers[t].padEnd(this.sizes[t]), "bold");
          }

          printHeader() {
            this.printRow({
              current: this.formatColumnHeader("current"),
              latest: this.formatColumnHeader("latest"),
              name: this.formatColumnHeader("name"),
              range: this.formatColumnHeader("range"),
              type: this.formatColumnHeader("type"),
              url: this.formatColumnHeader("url"),
              workspace: this.formatColumnHeader("workspace"),
            }), this.format === "markdown" && this.printRow(Object.keys(this.sizes).reduce((t, s) => k(E({}, t), { [s]: "".padEnd(this.sizes[s], "-") }), {}));
          }

          printRow(t) {
            let s = this.format === "markdown", r = sr.filter(i => {
              var n;
              return (n = this.extraColumns[i]) != null ? n : !0;
            }).map(i => t[i]).join(s ? " | " : "   ");
            this.writer(s ? `| ${r} |` : r.trim());
          }
        };
      var _e = ["dependencies", "devDependencies"], rr = ["major", "minor", "patch"], ir = ["text", "json", "markdown"];
      var or = "\u2728 All your dependencies are up to date!", Ht = class extends Kt.BaseCommand {
        constructor() {
          super(...arguments);
          this.patterns = V.Option.Rest();
          this.workspace = V.Option.Array("-w,--workspace", {
            description: "Only search for dependencies in the specified workspaces. If no workspaces are specified, only searches for outdated dependencies in the current workspace.",
            validator: mt.default.isArray(mt.default.isString()),
          });
          this.check = V.Option.Boolean("-c,--check", !1, { description: "Exit with exit code 1 when outdated dependencies are found" });
          this.format = V.Option.String("--format", "text", {
            description: "The format of the output (text|json|markdown)",
            validator: mt.default.isEnum(ir),
          });
          this.json = V.Option.Boolean("--json", !1, { description: "Format the output as JSON" });
          this.severity = V.Option.Array("-s,--severity", {
            description: "Filter results based on the severity of the update",
            validator: mt.default.isArray(mt.default.isEnum(rr)),
          });
          this.type = V.Option.String("-t,--type", {
            description: "Filter results based on the dependency type",
            validator: mt.default.isEnum(_e),
          });
          this._includeURL = V.Option.Boolean("--url", { description: "Include the homepage URL of each package in the output" });
          this.includeRange = V.Option.Boolean("--range", !1, { description: "Include the latest version of the package which satisfies the current range specified in the manifest." });
        }

        async execute() {
          let { cache: t, configuration: s, project: r, workspace: i } = await this.loadProject(),
            n = new Re(s, r, i, t), o = this.getWorkspaces(r), a = this.getDependencies(s, o);
          if (this.format !== "text" || this.json) {
            let f = await this.getOutdatedDependencies(s, r, n, a);
            return this.format === "json" || this.json ? this.writeJson(f) : this.writeMarkdown(s, r, f), f.length ? 1 : 0;
          }
          return (await P.StreamReport.start({ configuration: s, stdout: this.context.stdout }, async f => {
            await this.checkOutdatedDependencies(s, r, a, n, f);
          })).exitCode();
        }

        includeURL(t) {
          var s;
          return (s = this._includeURL) != null ? s : t.get("outdatedIncludeUrl");
        }

        writeJson(t) {
          let s = t.map(r => k(E({}, r), { severity: r.severity.latest }));
          this.context.stdout.write(JSON.stringify(s) + `
`);
        }

        writeMarkdown(t, s, r) {
          if (!r.length) {
            this.context.stdout.write(or + `
`);
            return;
          }
          new qt("markdown", n => this.context.stdout.write(n + `
`), t, r, { range: this.includeRange, url: this.includeURL(t), workspace: this.includeWorkspace(s) }).print();
        }

        async checkOutdatedDependencies(t, s, r, i, n) {
          let o = null;
          await n.startTimerPromise("Checking for outdated dependencies", async () => {
            let a = r.length, d = P.StreamReport.progressViaCounter(a);
            n.reportProgress(d), o = await this.getOutdatedDependencies(t, s, i, r, d);
          }), n.reportSeparator(), o.length ? (new qt("text", d => n.reportInfo(P.MessageName.UNNAMED, d), t, o, {
            range: this.includeRange,
            url: this.includeURL(t),
            workspace: this.includeWorkspace(s),
          }).print(), n.reportSeparator(), this.printOutdatedCount(n, o.length)) : n.reportInfo(P.MessageName.UNNAMED, P.formatUtils.pretty(t, or, "green"));
        }

        async loadProject() {
          let t = await P.Configuration.find(this.context.cwd, this.context.plugins), [s, {
            project: r,
            workspace: i,
          }] = await Promise.all([P.Cache.find(t), P.Project.find(t, this.context.cwd)]);
          if (await r.restoreInstallState(), !i) throw new Kt.WorkspaceRequiredError(r.cwd, this.context.cwd);
          return { cache: s, configuration: t, project: r, workspace: i };
        }

        getWorkspaces(t) {
          let s = this.workspace;
          return s ? s[0] === "." ? t.workspaces.filter(r => r.cwd === this.context.cwd) : t.workspaces.filter(r => {
            let i = [...s, ...s.map(n => nr.default.join(this.context.cwd, n))];
            return be.default.some([this.getWorkspaceName(r), r.cwd], i);
          }) : t.workspaces;
        }

        includeWorkspace(t) {
          return t.workspaces.length > 1;
        }

        get dependencyTypes() {
          return this.type ? [this.type] : _e;
        }

        getDependencies(t, s) {
          let r = [];
          for (let n of s) {
            let { anchoredLocator: o, project: a } = n, d = a.storedPackages.get(o.locatorHash);
            d || this.throw(t, o);
            for (let f of this.dependencyTypes) for (let h of n.manifest[f].values()) {
              let { range: g } = h;
              if (g.includes(":") && !/(npm|patch):/.test(g)) continue;
              let l = d.dependencies.get(h.identHash);
              l || this.throw(t, h);
              let _ = a.storedResolutions.get(l.descriptorHash);
              _ || this.throw(t, l);
              let A = a.storedPackages.get(_);
              A || this.throw(t, l), !n.project.tryWorkspaceByLocator(A) && (A.reference.includes("github.com") || r.push({
                dependencyType: f,
                descriptor: h,
                name: P.structUtils.stringifyIdent(h),
                pkg: A,
                workspace: n,
              }));
            }
          }
          if (!this.patterns.length) return r;
          let i = r.filter(({ name: n }) => be.default.isMatch(n, this.patterns));
          if (!i.length) throw new V.UsageError(`Pattern ${P.formatUtils.prettyList(t, this.patterns, P.FormatType.CODE)} doesn't match any packages referenced by any workspace`);
          return i;
        }

        throw(t, s) {
          let r = P.structUtils.prettyIdent(t, s);
          throw new Error(`Package for ${r} not found in the project`);
        }

        getSeverity(t, s) {
          let r = Qt.default.coerce(t), i = Qt.default.coerce(s);
          return Qt.default.eq(r, i) ? null : r.major === 0 || i.major > r.major ? "major" : i.minor > r.minor ? "minor" : "patch";
        }

        async getOutdatedDependencies(t, s, r, i, n) {
          let o = i.map(async ({ dependencyType: a, descriptor: d, name: f, pkg: h, workspace: g }) => {
            let { latest: l, range: _, url: A } = await r.fetch({
              descriptor: d,
              includeRange: this.includeRange,
              includeURL: this.includeURL(t),
              pkg: h,
            });
            if (n == null || n.tick(), tr(h.version, l)) return {
              current: h.version,
              latest: l,
              name: f,
              range: _,
              severity: { latest: this.getSeverity(h.version, l), range: _ ? this.getSeverity(h.version, _) : null },
              type: a,
              url: A,
              workspace: this.includeWorkspace(s) ? this.getWorkspaceName(g) : void 0,
            };
          });
          return (await Promise.all(o)).filter(Ys).filter(a => {
            var d, f;
            return (f = (d = this.severity) == null ? void 0 : d.includes(a.severity.latest)) != null ? f : !0;
          }).sort((a, d) => a.name.localeCompare(d.name));
        }

        getWorkspaceName(t) {
          return t.manifest.name ? P.structUtils.stringifyIdent(t.manifest.name) : t.computeCandidateName();
        }

        printOutdatedCount(t, s) {
          let r = [P.MessageName.UNNAMED, s === 1 ? "1 dependency is out of date" : `${s} dependencies are out of date`];
          this.check ? t.reportError(...r) : t.reportWarning(...r);
        }
      };
      Ht.paths = [["outdated"]], Ht.usage = V.Command.Usage({
        description: "view outdated dependencies",
        details: `
      This command finds outdated dependencies in a project and prints the result in a table or JSON format.

      This command accepts glob patterns as arguments to filter the output. Make sure to escape the patterns, to prevent your own shell from trying to expand them.
    `,
        examples: [["View outdated dependencies", "yarn outdated"], ["View outdated dependencies with the `@babel` scope", "yarn outdated '@babel/*'"], ["Filter results to only include devDependencies", "yarn outdated --type devDependencies"], ["Filter results to only include major version updates", "yarn outdated --severity major"]],
      });
      var Xi = {
        commands: [Ht],
        configuration: {
          outdatedIncludeUrl: {
            default: !1,
            description: "If true, the outdated command will include the package homepage URL by default",
            type: ar.SettingsType.BOOLEAN,
          },
        },
      }, Vi = Xi;
      return Zi;
    })();
    /*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
    /*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
    /*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
    return plugin;
  },
};
