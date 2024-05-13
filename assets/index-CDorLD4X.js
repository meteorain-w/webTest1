(function () {
	const t = document.createElement("link").relList;
	if (t && t.supports && t.supports("modulepreload")) return;
	for (const r of document.querySelectorAll('link[rel="modulepreload"]'))
		s(r);
	new MutationObserver((r) => {
		for (const o of r)
			if (o.type === "childList")
				for (const i of o.addedNodes)
					i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
	}).observe(document, { childList: !0, subtree: !0 });
	function n(r) {
		const o = {};
		return (
			r.integrity && (o.integrity = r.integrity),
			r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
			r.crossOrigin === "use-credentials"
				? (o.credentials = "include")
				: r.crossOrigin === "anonymous"
				? (o.credentials = "omit")
				: (o.credentials = "same-origin"),
			o
		);
	}
	function s(r) {
		if (r.ep) return;
		r.ep = !0;
		const o = n(r);
		fetch(r.href, o);
	}
})();
/**
 * @vue/shared v3.4.27
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function Xn(e, t) {
	const n = new Set(e.split(","));
	return (s) => n.has(s);
}
const X = {},
	pt = [],
	ve = () => {},
	Oo = () => !1,
	an = (e) =>
		e.charCodeAt(0) === 111 &&
		e.charCodeAt(1) === 110 &&
		(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
	Zn = (e) => e.startsWith("onUpdate:"),
	re = Object.assign,
	es = (e, t) => {
		const n = e.indexOf(t);
		n > -1 && e.splice(n, 1);
	},
	Ao = Object.prototype.hasOwnProperty,
	K = (e, t) => Ao.call(e, t),
	F = Array.isArray,
	Ot = (e) => dn(e) === "[object Map]",
	Io = (e) => dn(e) === "[object Set]",
	U = (e) => typeof e == "function",
	oe = (e) => typeof e == "string",
	kt = (e) => typeof e == "symbol",
	ee = (e) => e !== null && typeof e == "object",
	mr = (e) => (ee(e) || U(e)) && U(e.then) && U(e.catch),
	To = Object.prototype.toString,
	dn = (e) => To.call(e),
	Mo = (e) => dn(e).slice(8, -1),
	$o = (e) => dn(e) === "[object Object]",
	ts = (e) =>
		oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
	At = Xn(
		",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
	),
	hn = (e) => {
		const t = Object.create(null);
		return (n) => t[n] || (t[n] = e(n));
	},
	Lo = /-(\w)/g,
	Le = hn((e) => e.replace(Lo, (t, n) => (n ? n.toUpperCase() : ""))),
	No = /\B([A-Z])/g,
	xt = hn((e) => e.replace(No, "-$1").toLowerCase()),
	pn = hn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
	Pn = hn((e) => (e ? `on${pn(e)}` : "")),
	Ye = (e, t) => !Object.is(e, t),
	On = (e, t) => {
		for (let n = 0; n < e.length; n++) e[n](t);
	},
	_r = (e, t, n, s = !1) => {
		Object.defineProperty(e, t, {
			configurable: !0,
			enumerable: !1,
			writable: s,
			value: n,
		});
	},
	jo = (e) => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t;
	};
let Es;
const vr = () =>
	Es ||
	(Es =
		typeof globalThis < "u"
			? globalThis
			: typeof self < "u"
			? self
			: typeof window < "u"
			? window
			: typeof global < "u"
			? global
			: {});
function ns(e) {
	if (F(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) {
			const s = e[n],
				r = oe(s) ? Uo(s) : ns(s);
			if (r) for (const o in r) t[o] = r[o];
		}
		return t;
	} else if (oe(e) || ee(e)) return e;
}
const Fo = /;(?![^(]*\))/g,
	Ho = /:([^]+)/,
	Bo = /\/\*[^]*?\*\//g;
function Uo(e) {
	const t = {};
	return (
		e
			.replace(Bo, "")
			.split(Fo)
			.forEach((n) => {
				if (n) {
					const s = n.split(Ho);
					s.length > 1 && (t[s[0].trim()] = s[1].trim());
				}
			}),
		t
	);
}
function ss(e) {
	let t = "";
	if (oe(e)) t = e;
	else if (F(e))
		for (let n = 0; n < e.length; n++) {
			const s = ss(e[n]);
			s && (t += s + " ");
		}
	else if (ee(e)) for (const n in e) e[n] && (t += n + " ");
	return t.trim();
}
const Vo =
		"itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
	Do = Xn(Vo);
function br(e) {
	return !!e || e === "";
}
/**
 * @vue/reactivity v3.4.27
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let ye;
class Ko {
	constructor(t = !1) {
		(this.detached = t),
			(this._active = !0),
			(this.effects = []),
			(this.cleanups = []),
			(this.parent = ye),
			!t &&
				ye &&
				(this.index = (ye.scopes || (ye.scopes = [])).push(this) - 1);
	}
	get active() {
		return this._active;
	}
	run(t) {
		if (this._active) {
			const n = ye;
			try {
				return (ye = this), t();
			} finally {
				ye = n;
			}
		}
	}
	on() {
		ye = this;
	}
	off() {
		ye = this.parent;
	}
	stop(t) {
		if (this._active) {
			let n, s;
			for (n = 0, s = this.effects.length; n < s; n++)
				this.effects[n].stop();
			for (n = 0, s = this.cleanups.length; n < s; n++)
				this.cleanups[n]();
			if (this.scopes)
				for (n = 0, s = this.scopes.length; n < s; n++)
					this.scopes[n].stop(!0);
			if (!this.detached && this.parent && !t) {
				const r = this.parent.scopes.pop();
				r &&
					r !== this &&
					((this.parent.scopes[this.index] = r),
					(r.index = this.index));
			}
			(this.parent = void 0), (this._active = !1);
		}
	}
}
function ko(e, t = ye) {
	t && t.active && t.effects.push(e);
}
function Wo() {
	return ye;
}
let rt;
class rs {
	constructor(t, n, s, r) {
		(this.fn = t),
			(this.trigger = n),
			(this.scheduler = s),
			(this.active = !0),
			(this.deps = []),
			(this._dirtyLevel = 4),
			(this._trackId = 0),
			(this._runnings = 0),
			(this._shouldSchedule = !1),
			(this._depsLength = 0),
			ko(this, r);
	}
	get dirty() {
		if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
			(this._dirtyLevel = 1), Je();
			for (let t = 0; t < this._depsLength; t++) {
				const n = this.deps[t];
				if (n.computed && (zo(n.computed), this._dirtyLevel >= 4))
					break;
			}
			this._dirtyLevel === 1 && (this._dirtyLevel = 0), Xe();
		}
		return this._dirtyLevel >= 4;
	}
	set dirty(t) {
		this._dirtyLevel = t ? 4 : 0;
	}
	run() {
		if (((this._dirtyLevel = 0), !this.active)) return this.fn();
		let t = Ge,
			n = rt;
		try {
			return (
				(Ge = !0), (rt = this), this._runnings++, ws(this), this.fn()
			);
		} finally {
			Rs(this), this._runnings--, (rt = n), (Ge = t);
		}
	}
	stop() {
		this.active &&
			(ws(this),
			Rs(this),
			this.onStop && this.onStop(),
			(this.active = !1));
	}
}
function zo(e) {
	return e.value;
}
function ws(e) {
	e._trackId++, (e._depsLength = 0);
}
function Rs(e) {
	if (e.deps.length > e._depsLength) {
		for (let t = e._depsLength; t < e.deps.length; t++) yr(e.deps[t], e);
		e.deps.length = e._depsLength;
	}
}
function yr(e, t) {
	const n = e.get(t);
	n !== void 0 &&
		t._trackId !== n &&
		(e.delete(t), e.size === 0 && e.cleanup());
}
let Ge = !0,
	Fn = 0;
const xr = [];
function Je() {
	xr.push(Ge), (Ge = !1);
}
function Xe() {
	const e = xr.pop();
	Ge = e === void 0 ? !0 : e;
}
function os() {
	Fn++;
}
function is() {
	for (Fn--; !Fn && Hn.length; ) Hn.shift()();
}
function Er(e, t, n) {
	if (t.get(e) !== e._trackId) {
		t.set(e, e._trackId);
		const s = e.deps[e._depsLength];
		s !== t
			? (s && yr(s, e), (e.deps[e._depsLength++] = t))
			: e._depsLength++;
	}
}
const Hn = [];
function wr(e, t, n) {
	os();
	for (const s of e.keys()) {
		let r;
		s._dirtyLevel < t &&
			(r ?? (r = e.get(s) === s._trackId)) &&
			(s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0),
			(s._dirtyLevel = t)),
			s._shouldSchedule &&
				(r ?? (r = e.get(s) === s._trackId)) &&
				(s.trigger(),
				(!s._runnings || s.allowRecurse) &&
					s._dirtyLevel !== 2 &&
					((s._shouldSchedule = !1),
					s.scheduler && Hn.push(s.scheduler)));
	}
	is();
}
const Rr = (e, t) => {
		const n = new Map();
		return (n.cleanup = e), (n.computed = t), n;
	},
	Bn = new WeakMap(),
	ot = Symbol(""),
	Un = Symbol("");
function pe(e, t, n) {
	if (Ge && rt) {
		let s = Bn.get(e);
		s || Bn.set(e, (s = new Map()));
		let r = s.get(n);
		r || s.set(n, (r = Rr(() => s.delete(n)))), Er(rt, r);
	}
}
function He(e, t, n, s, r, o) {
	const i = Bn.get(e);
	if (!i) return;
	let u = [];
	if (t === "clear") u = [...i.values()];
	else if (n === "length" && F(e)) {
		const l = Number(s);
		i.forEach((d, a) => {
			(a === "length" || (!kt(a) && a >= l)) && u.push(d);
		});
	} else
		switch ((n !== void 0 && u.push(i.get(n)), t)) {
			case "add":
				F(e)
					? ts(n) && u.push(i.get("length"))
					: (u.push(i.get(ot)), Ot(e) && u.push(i.get(Un)));
				break;
			case "delete":
				F(e) || (u.push(i.get(ot)), Ot(e) && u.push(i.get(Un)));
				break;
			case "set":
				Ot(e) && u.push(i.get(ot));
				break;
		}
	os();
	for (const l of u) l && wr(l, 4);
	is();
}
const qo = Xn("__proto__,__v_isRef,__isVue"),
	Cr = new Set(
		Object.getOwnPropertyNames(Symbol)
			.filter((e) => e !== "arguments" && e !== "caller")
			.map((e) => Symbol[e])
			.filter(kt)
	),
	Cs = Go();
function Go() {
	const e = {};
	return (
		["includes", "indexOf", "lastIndexOf"].forEach((t) => {
			e[t] = function (...n) {
				const s = z(this);
				for (let o = 0, i = this.length; o < i; o++)
					pe(s, "get", o + "");
				const r = s[t](...n);
				return r === -1 || r === !1 ? s[t](...n.map(z)) : r;
			};
		}),
		["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
			e[t] = function (...n) {
				Je(), os();
				const s = z(this)[t].apply(this, n);
				return is(), Xe(), s;
			};
		}),
		e
	);
}
function Qo(e) {
	kt(e) || (e = String(e));
	const t = z(this);
	return pe(t, "has", e), t.hasOwnProperty(e);
}
class Sr {
	constructor(t = !1, n = !1) {
		(this._isReadonly = t), (this._isShallow = n);
	}
	get(t, n, s) {
		const r = this._isReadonly,
			o = this._isShallow;
		if (n === "__v_isReactive") return !r;
		if (n === "__v_isReadonly") return r;
		if (n === "__v_isShallow") return o;
		if (n === "__v_raw")
			return s === (r ? (o ? ci : Ir) : o ? Ar : Or).get(t) ||
				Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
				? t
				: void 0;
		const i = F(t);
		if (!r) {
			if (i && K(Cs, n)) return Reflect.get(Cs, n, s);
			if (n === "hasOwnProperty") return Qo;
		}
		const u = Reflect.get(t, n, s);
		return (kt(n) ? Cr.has(n) : qo(n)) || (r || pe(t, "get", n), o)
			? u
			: ge(u)
			? i && ts(n)
				? u
				: u.value
			: ee(u)
			? r
				? Mr(u)
				: mn(u)
			: u;
	}
}
class Pr extends Sr {
	constructor(t = !1) {
		super(!1, t);
	}
	set(t, n, s, r) {
		let o = t[n];
		if (!this._isShallow) {
			const l = jt(o);
			if (
				(!ln(s) && !jt(s) && ((o = z(o)), (s = z(s))),
				!F(t) && ge(o) && !ge(s))
			)
				return l ? !1 : ((o.value = s), !0);
		}
		const i = F(t) && ts(n) ? Number(n) < t.length : K(t, n),
			u = Reflect.set(t, n, s, r);
		return (
			t === z(r) &&
				(i ? Ye(s, o) && He(t, "set", n, s) : He(t, "add", n, s)),
			u
		);
	}
	deleteProperty(t, n) {
		const s = K(t, n);
		t[n];
		const r = Reflect.deleteProperty(t, n);
		return r && s && He(t, "delete", n, void 0), r;
	}
	has(t, n) {
		const s = Reflect.has(t, n);
		return (!kt(n) || !Cr.has(n)) && pe(t, "has", n), s;
	}
	ownKeys(t) {
		return pe(t, "iterate", F(t) ? "length" : ot), Reflect.ownKeys(t);
	}
}
class Yo extends Sr {
	constructor(t = !1) {
		super(!0, t);
	}
	set(t, n) {
		return !0;
	}
	deleteProperty(t, n) {
		return !0;
	}
}
const Jo = new Pr(),
	Xo = new Yo(),
	Zo = new Pr(!0);
const ls = (e) => e,
	gn = (e) => Reflect.getPrototypeOf(e);
function qt(e, t, n = !1, s = !1) {
	e = e.__v_raw;
	const r = z(e),
		o = z(t);
	n || (Ye(t, o) && pe(r, "get", t), pe(r, "get", o));
	const { has: i } = gn(r),
		u = s ? ls : n ? fs : Ft;
	if (i.call(r, t)) return u(e.get(t));
	if (i.call(r, o)) return u(e.get(o));
	e !== r && e.get(t);
}
function Gt(e, t = !1) {
	const n = this.__v_raw,
		s = z(n),
		r = z(e);
	return (
		t || (Ye(e, r) && pe(s, "has", e), pe(s, "has", r)),
		e === r ? n.has(e) : n.has(e) || n.has(r)
	);
}
function Qt(e, t = !1) {
	return (
		(e = e.__v_raw),
		!t && pe(z(e), "iterate", ot),
		Reflect.get(e, "size", e)
	);
}
function Ss(e) {
	e = z(e);
	const t = z(this);
	return gn(t).has.call(t, e) || (t.add(e), He(t, "add", e, e)), this;
}
function Ps(e, t) {
	t = z(t);
	const n = z(this),
		{ has: s, get: r } = gn(n);
	let o = s.call(n, e);
	o || ((e = z(e)), (o = s.call(n, e)));
	const i = r.call(n, e);
	return (
		n.set(e, t),
		o ? Ye(t, i) && He(n, "set", e, t) : He(n, "add", e, t),
		this
	);
}
function Os(e) {
	const t = z(this),
		{ has: n, get: s } = gn(t);
	let r = n.call(t, e);
	r || ((e = z(e)), (r = n.call(t, e))), s && s.call(t, e);
	const o = t.delete(e);
	return r && He(t, "delete", e, void 0), o;
}
function As() {
	const e = z(this),
		t = e.size !== 0,
		n = e.clear();
	return t && He(e, "clear", void 0, void 0), n;
}
function Yt(e, t) {
	return function (s, r) {
		const o = this,
			i = o.__v_raw,
			u = z(i),
			l = t ? ls : e ? fs : Ft;
		return (
			!e && pe(u, "iterate", ot),
			i.forEach((d, a) => s.call(r, l(d), l(a), o))
		);
	};
}
function Jt(e, t, n) {
	return function (...s) {
		const r = this.__v_raw,
			o = z(r),
			i = Ot(o),
			u = e === "entries" || (e === Symbol.iterator && i),
			l = e === "keys" && i,
			d = r[e](...s),
			a = n ? ls : t ? fs : Ft;
		return (
			!t && pe(o, "iterate", l ? Un : ot),
			{
				next() {
					const { value: h, done: p } = d.next();
					return p
						? { value: h, done: p }
						: { value: u ? [a(h[0]), a(h[1])] : a(h), done: p };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function De(e) {
	return function (...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function ei() {
	const e = {
			get(o) {
				return qt(this, o);
			},
			get size() {
				return Qt(this);
			},
			has: Gt,
			add: Ss,
			set: Ps,
			delete: Os,
			clear: As,
			forEach: Yt(!1, !1),
		},
		t = {
			get(o) {
				return qt(this, o, !1, !0);
			},
			get size() {
				return Qt(this);
			},
			has: Gt,
			add: Ss,
			set: Ps,
			delete: Os,
			clear: As,
			forEach: Yt(!1, !0),
		},
		n = {
			get(o) {
				return qt(this, o, !0);
			},
			get size() {
				return Qt(this, !0);
			},
			has(o) {
				return Gt.call(this, o, !0);
			},
			add: De("add"),
			set: De("set"),
			delete: De("delete"),
			clear: De("clear"),
			forEach: Yt(!0, !1),
		},
		s = {
			get(o) {
				return qt(this, o, !0, !0);
			},
			get size() {
				return Qt(this, !0);
			},
			has(o) {
				return Gt.call(this, o, !0);
			},
			add: De("add"),
			set: De("set"),
			delete: De("delete"),
			clear: De("clear"),
			forEach: Yt(!0, !0),
		};
	return (
		["keys", "values", "entries", Symbol.iterator].forEach((o) => {
			(e[o] = Jt(o, !1, !1)),
				(n[o] = Jt(o, !0, !1)),
				(t[o] = Jt(o, !1, !0)),
				(s[o] = Jt(o, !0, !0));
		}),
		[e, n, t, s]
	);
}
const [ti, ni, si, ri] = ei();
function cs(e, t) {
	const n = t ? (e ? ri : si) : e ? ni : ti;
	return (s, r, o) =>
		r === "__v_isReactive"
			? !e
			: r === "__v_isReadonly"
			? e
			: r === "__v_raw"
			? s
			: Reflect.get(K(n, r) && r in s ? n : s, r, o);
}
const oi = { get: cs(!1, !1) },
	ii = { get: cs(!1, !0) },
	li = { get: cs(!0, !1) };
const Or = new WeakMap(),
	Ar = new WeakMap(),
	Ir = new WeakMap(),
	ci = new WeakMap();
function ui(e) {
	switch (e) {
		case "Object":
		case "Array":
			return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet":
			return 2;
		default:
			return 0;
	}
}
function fi(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : ui(Mo(e));
}
function mn(e) {
	return jt(e) ? e : us(e, !1, Jo, oi, Or);
}
function Tr(e) {
	return us(e, !1, Zo, ii, Ar);
}
function Mr(e) {
	return us(e, !0, Xo, li, Ir);
}
function us(e, t, n, s, r) {
	if (!ee(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
	const o = r.get(e);
	if (o) return o;
	const i = fi(e);
	if (i === 0) return e;
	const u = new Proxy(e, i === 2 ? s : n);
	return r.set(e, u), u;
}
function It(e) {
	return jt(e) ? It(e.__v_raw) : !!(e && e.__v_isReactive);
}
function jt(e) {
	return !!(e && e.__v_isReadonly);
}
function ln(e) {
	return !!(e && e.__v_isShallow);
}
function $r(e) {
	return e ? !!e.__v_raw : !1;
}
function z(e) {
	const t = e && e.__v_raw;
	return t ? z(t) : e;
}
function ai(e) {
	return Object.isExtensible(e) && _r(e, "__v_skip", !0), e;
}
const Ft = (e) => (ee(e) ? mn(e) : e),
	fs = (e) => (ee(e) ? Mr(e) : e);
class Lr {
	constructor(t, n, s, r) {
		(this.getter = t),
			(this._setter = n),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this.__v_isReadonly = !1),
			(this.effect = new rs(
				() => t(this._value),
				() => Zt(this, this.effect._dirtyLevel === 2 ? 2 : 3)
			)),
			(this.effect.computed = this),
			(this.effect.active = this._cacheable = !r),
			(this.__v_isReadonly = s);
	}
	get value() {
		const t = z(this);
		return (
			(!t._cacheable || t.effect.dirty) &&
				Ye(t._value, (t._value = t.effect.run())) &&
				Zt(t, 4),
			Nr(t),
			t.effect._dirtyLevel >= 2 && Zt(t, 2),
			t._value
		);
	}
	set value(t) {
		this._setter(t);
	}
	get _dirty() {
		return this.effect.dirty;
	}
	set _dirty(t) {
		this.effect.dirty = t;
	}
}
function di(e, t, n = !1) {
	let s, r;
	const o = U(e);
	return (
		o ? ((s = e), (r = ve)) : ((s = e.get), (r = e.set)),
		new Lr(s, r, o || !r, n)
	);
}
function Nr(e) {
	var t;
	Ge &&
		rt &&
		((e = z(e)),
		Er(
			rt,
			(t = e.dep) != null
				? t
				: (e.dep = Rr(
						() => (e.dep = void 0),
						e instanceof Lr ? e : void 0
				  ))
		));
}
function Zt(e, t = 4, n) {
	e = z(e);
	const s = e.dep;
	s && wr(s, t);
}
function ge(e) {
	return !!(e && e.__v_isRef === !0);
}
function hi(e) {
	return jr(e, !1);
}
function pi(e) {
	return jr(e, !0);
}
function jr(e, t) {
	return ge(e) ? e : new gi(e, t);
}
class gi {
	constructor(t, n) {
		(this.__v_isShallow = n),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this._rawValue = n ? t : z(t)),
			(this._value = n ? t : Ft(t));
	}
	get value() {
		return Nr(this), this._value;
	}
	set value(t) {
		const n = this.__v_isShallow || ln(t) || jt(t);
		(t = n ? t : z(t)),
			Ye(t, this._rawValue) &&
				((this._rawValue = t),
				(this._value = n ? t : Ft(t)),
				Zt(this, 4));
	}
}
function gt(e) {
	return ge(e) ? e.value : e;
}
const mi = {
	get: (e, t, n) => gt(Reflect.get(e, t, n)),
	set: (e, t, n, s) => {
		const r = e[t];
		return ge(r) && !ge(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
	},
};
function Fr(e) {
	return It(e) ? e : new Proxy(e, mi);
}
/**
 * @vue/runtime-core v3.4.27
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Qe(e, t, n, s) {
	try {
		return s ? e(...s) : e();
	} catch (r) {
		_n(r, t, n);
	}
}
function Re(e, t, n, s) {
	if (U(e)) {
		const r = Qe(e, t, n, s);
		return (
			r &&
				mr(r) &&
				r.catch((o) => {
					_n(o, t, n);
				}),
			r
		);
	}
	if (F(e)) {
		const r = [];
		for (let o = 0; o < e.length; o++) r.push(Re(e[o], t, n, s));
		return r;
	}
}
function _n(e, t, n, s = !0) {
	const r = t ? t.vnode : null;
	if (t) {
		let o = t.parent;
		const i = t.proxy,
			u = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; o; ) {
			const d = o.ec;
			if (d) {
				for (let a = 0; a < d.length; a++)
					if (d[a](e, i, u) === !1) return;
			}
			o = o.parent;
		}
		const l = t.appContext.config.errorHandler;
		if (l) {
			Je(), Qe(l, null, 10, [e, i, u]), Xe();
			return;
		}
	}
	_i(e, n, r, s);
}
function _i(e, t, n, s = !0) {
	console.error(e);
}
let Ht = !1,
	Vn = !1;
const le = [];
let Me = 0;
const mt = [];
let ke = null,
	st = 0;
const Hr = Promise.resolve();
let as = null;
function Br(e) {
	const t = as || Hr;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function vi(e) {
	let t = Me + 1,
		n = le.length;
	for (; t < n; ) {
		const s = (t + n) >>> 1,
			r = le[s],
			o = Bt(r);
		o < e || (o === e && r.pre) ? (t = s + 1) : (n = s);
	}
	return t;
}
function ds(e) {
	(!le.length || !le.includes(e, Ht && e.allowRecurse ? Me + 1 : Me)) &&
		(e.id == null ? le.push(e) : le.splice(vi(e.id), 0, e), Ur());
}
function Ur() {
	!Ht && !Vn && ((Vn = !0), (as = Hr.then(Dr)));
}
function bi(e) {
	const t = le.indexOf(e);
	t > Me && le.splice(t, 1);
}
function yi(e) {
	F(e)
		? mt.push(...e)
		: (!ke || !ke.includes(e, e.allowRecurse ? st + 1 : st)) && mt.push(e),
		Ur();
}
function Is(e, t, n = Ht ? Me + 1 : 0) {
	for (; n < le.length; n++) {
		const s = le[n];
		if (s && s.pre) {
			if (e && s.id !== e.uid) continue;
			le.splice(n, 1), n--, s();
		}
	}
}
function Vr(e) {
	if (mt.length) {
		const t = [...new Set(mt)].sort((n, s) => Bt(n) - Bt(s));
		if (((mt.length = 0), ke)) {
			ke.push(...t);
			return;
		}
		for (ke = t, st = 0; st < ke.length; st++) ke[st]();
		(ke = null), (st = 0);
	}
}
const Bt = (e) => (e.id == null ? 1 / 0 : e.id),
	xi = (e, t) => {
		const n = Bt(e) - Bt(t);
		if (n === 0) {
			if (e.pre && !t.pre) return -1;
			if (t.pre && !e.pre) return 1;
		}
		return n;
	};
function Dr(e) {
	(Vn = !1), (Ht = !0), le.sort(xi);
	try {
		for (Me = 0; Me < le.length; Me++) {
			const t = le[Me];
			t && t.active !== !1 && Qe(t, null, 14);
		}
	} finally {
		(Me = 0),
			(le.length = 0),
			Vr(),
			(Ht = !1),
			(as = null),
			(le.length || mt.length) && Dr();
	}
}
function Ei(e, t, ...n) {
	if (e.isUnmounted) return;
	const s = e.vnode.props || X;
	let r = n;
	const o = t.startsWith("update:"),
		i = o && t.slice(7);
	if (i && i in s) {
		const a = `${i === "modelValue" ? "model" : i}Modifiers`,
			{ number: h, trim: p } = s[a] || X;
		p && (r = n.map((b) => (oe(b) ? b.trim() : b))), h && (r = n.map(jo));
	}
	let u,
		l = s[(u = Pn(t))] || s[(u = Pn(Le(t)))];
	!l && o && (l = s[(u = Pn(xt(t)))]), l && Re(l, e, 6, r);
	const d = s[u + "Once"];
	if (d) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[u]) return;
		(e.emitted[u] = !0), Re(d, e, 6, r);
	}
}
function Kr(e, t, n = !1) {
	const s = t.emitsCache,
		r = s.get(e);
	if (r !== void 0) return r;
	const o = e.emits;
	let i = {},
		u = !1;
	if (!U(e)) {
		const l = (d) => {
			const a = Kr(d, t, !0);
			a && ((u = !0), re(i, a));
		};
		!n && t.mixins.length && t.mixins.forEach(l),
			e.extends && l(e.extends),
			e.mixins && e.mixins.forEach(l);
	}
	return !o && !u
		? (ee(e) && s.set(e, null), null)
		: (F(o) ? o.forEach((l) => (i[l] = null)) : re(i, o),
		  ee(e) && s.set(e, i),
		  i);
}
function vn(e, t) {
	return !e || !an(t)
		? !1
		: ((t = t.slice(2).replace(/Once$/, "")),
		  K(e, t[0].toLowerCase() + t.slice(1)) || K(e, xt(t)) || K(e, t));
}
let Ee = null,
	bn = null;
function cn(e) {
	const t = Ee;
	return (Ee = e), (bn = (e && e.type.__scopeId) || null), t;
}
function yn(e) {
	bn = e;
}
function xn() {
	bn = null;
}
function wi(e, t = Ee, n) {
	if (!t || e._n) return e;
	const s = (...r) => {
		s._d && Vs(-1);
		const o = cn(t);
		let i;
		try {
			i = e(...r);
		} finally {
			cn(o), s._d && Vs(1);
		}
		return i;
	};
	return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function An(e) {
	const {
			type: t,
			vnode: n,
			proxy: s,
			withProxy: r,
			propsOptions: [o],
			slots: i,
			attrs: u,
			emit: l,
			render: d,
			renderCache: a,
			props: h,
			data: p,
			setupState: b,
			ctx: A,
			inheritAttrs: N,
		} = e,
		V = cn(e);
	let M, $;
	try {
		if (n.shapeFlag & 4) {
			const k = r || s,
				te = k;
			(M = Te(d.call(te, k, a, h, b, p, A))), ($ = u);
		} else {
			const k = t;
			(M = Te(
				k.length > 1
					? k(h, { attrs: u, slots: i, emit: l })
					: k(h, null)
			)),
				($ = t.props ? u : Ri(u));
		}
	} catch (k) {
		($t.length = 0), _n(k, e, 1), (M = ae(Ut));
	}
	let H = M;
	if ($ && N !== !1) {
		const k = Object.keys($),
			{ shapeFlag: te } = H;
		k.length &&
			te & 7 &&
			(o && k.some(Zn) && ($ = Ci($, o)), (H = vt(H, $, !1, !0)));
	}
	return (
		n.dirs &&
			((H = vt(H, null, !1, !0)),
			(H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs)),
		n.transition && (H.transition = n.transition),
		(M = H),
		cn(V),
		M
	);
}
const Ri = (e) => {
		let t;
		for (const n in e)
			(n === "class" || n === "style" || an(n)) &&
				((t || (t = {}))[n] = e[n]);
		return t;
	},
	Ci = (e, t) => {
		const n = {};
		for (const s in e) (!Zn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
		return n;
	};
function Si(e, t, n) {
	const { props: s, children: r, component: o } = e,
		{ props: i, children: u, patchFlag: l } = t,
		d = o.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && l >= 0) {
		if (l & 1024) return !0;
		if (l & 16) return s ? Ts(s, i, d) : !!i;
		if (l & 8) {
			const a = t.dynamicProps;
			for (let h = 0; h < a.length; h++) {
				const p = a[h];
				if (i[p] !== s[p] && !vn(d, p)) return !0;
			}
		}
	} else
		return (r || u) && (!u || !u.$stable)
			? !0
			: s === i
			? !1
			: s
			? i
				? Ts(s, i, d)
				: !0
			: !!i;
	return !1;
}
function Ts(e, t, n) {
	const s = Object.keys(t);
	if (s.length !== Object.keys(e).length) return !0;
	for (let r = 0; r < s.length; r++) {
		const o = s[r];
		if (t[o] !== e[o] && !vn(n, o)) return !0;
	}
	return !1;
}
function Pi({ vnode: e, parent: t }, n) {
	for (; t; ) {
		const s = t.subTree;
		if (
			(s.suspense && s.suspense.activeBranch === e && (s.el = e.el),
			s === e)
		)
			((e = t.vnode).el = n), (t = t.parent);
		else break;
	}
}
const Oi = "components";
function Ai(e, t) {
	return Ti(Oi, e, !0, t) || e;
}
const Ii = Symbol.for("v-ndc");
function Ti(e, t, n = !0, s = !1) {
	const r = Ee || ce;
	if (r) {
		const o = r.type;
		{
			const u = Cl(o, !1);
			if (u && (u === t || u === Le(t) || u === pn(Le(t)))) return o;
		}
		const i = Ms(r[e] || o[e], t) || Ms(r.appContext[e], t);
		return !i && s ? o : i;
	}
}
function Ms(e, t) {
	return e && (e[t] || e[Le(t)] || e[pn(Le(t))]);
}
const Mi = (e) => e.__isSuspense;
function $i(e, t) {
	t && t.pendingBranch
		? F(e)
			? t.effects.push(...e)
			: t.effects.push(e)
		: yi(e);
}
const Li = Symbol.for("v-scx"),
	Ni = () => $e(Li),
	Xt = {};
function en(e, t, n) {
	return kr(e, t, n);
}
function kr(
	e,
	t,
	{ immediate: n, deep: s, flush: r, once: o, onTrack: i, onTrigger: u } = X
) {
	if (t && o) {
		const B = t;
		t = (...ue) => {
			B(...ue), te();
		};
	}
	const l = ce,
		d = (B) => (s === !0 ? B : ht(B, s === !1 ? 1 : void 0));
	let a,
		h = !1,
		p = !1;
	if (
		(ge(e)
			? ((a = () => e.value), (h = ln(e)))
			: It(e)
			? ((a = () => d(e)), (h = !0))
			: F(e)
			? ((p = !0),
			  (h = e.some((B) => It(B) || ln(B))),
			  (a = () =>
					e.map((B) => {
						if (ge(B)) return B.value;
						if (It(B)) return d(B);
						if (U(B)) return Qe(B, l, 2);
					})))
			: U(e)
			? t
				? (a = () => Qe(e, l, 2))
				: (a = () => (b && b(), Re(e, l, 3, [A])))
			: (a = ve),
		t && s)
	) {
		const B = a;
		a = () => ht(B());
	}
	let b,
		A = (B) => {
			b = H.onStop = () => {
				Qe(B, l, 4), (b = H.onStop = void 0);
			};
		},
		N;
	if (Rn)
		if (
			((A = ve),
			t ? n && Re(t, l, 3, [a(), p ? [] : void 0, A]) : a(),
			r === "sync")
		) {
			const B = Ni();
			N = B.__watcherHandles || (B.__watcherHandles = []);
		} else return ve;
	let V = p ? new Array(e.length).fill(Xt) : Xt;
	const M = () => {
		if (!(!H.active || !H.dirty))
			if (t) {
				const B = H.run();
				(s ||
					h ||
					(p ? B.some((ue, _e) => Ye(ue, V[_e])) : Ye(B, V))) &&
					(b && b(),
					Re(t, l, 3, [
						B,
						V === Xt ? void 0 : p && V[0] === Xt ? [] : V,
						A,
					]),
					(V = B));
			} else H.run();
	};
	M.allowRecurse = !!t;
	let $;
	r === "sync"
		? ($ = M)
		: r === "post"
		? ($ = () => he(M, l && l.suspense))
		: ((M.pre = !0), l && (M.id = l.uid), ($ = () => ds(M)));
	const H = new rs(a, ve, $),
		k = Wo(),
		te = () => {
			H.stop(), k && es(k.effects, H);
		};
	return (
		t
			? n
				? M()
				: (V = H.run())
			: r === "post"
			? he(H.run.bind(H), l && l.suspense)
			: H.run(),
		N && N.push(te),
		te
	);
}
function ji(e, t, n) {
	const s = this.proxy,
		r = oe(e) ? (e.includes(".") ? Wr(s, e) : () => s[e]) : e.bind(s, s);
	let o;
	U(t) ? (o = t) : ((o = t.handler), (n = t));
	const i = Wt(this),
		u = kr(r, o.bind(s), n);
	return i(), u;
}
function Wr(e, t) {
	const n = t.split(".");
	return () => {
		let s = e;
		for (let r = 0; r < n.length && s; r++) s = s[n[r]];
		return s;
	};
}
function ht(e, t = 1 / 0, n) {
	if (t <= 0 || !ee(e) || e.__v_skip || ((n = n || new Set()), n.has(e)))
		return e;
	if ((n.add(e), t--, ge(e))) ht(e.value, t, n);
	else if (F(e)) for (let s = 0; s < e.length; s++) ht(e[s], t, n);
	else if (Io(e) || Ot(e))
		e.forEach((s) => {
			ht(s, t, n);
		});
	else if ($o(e)) for (const s in e) ht(e[s], t, n);
	return e;
}
function tt(e, t, n, s) {
	const r = e.dirs,
		o = t && t.dirs;
	for (let i = 0; i < r.length; i++) {
		const u = r[i];
		o && (u.oldValue = o[i].value);
		let l = u.dir[s];
		l && (Je(), Re(l, n, 8, [e.el, u, e, t]), Xe());
	}
}
/*! #__NO_SIDE_EFFECTS__ */ function zr(e, t) {
	return U(e) ? re({ name: e.name }, t, { setup: e }) : e;
}
const tn = (e) => !!e.type.__asyncLoader,
	qr = (e) => e.type.__isKeepAlive;
function Fi(e, t) {
	Gr(e, "a", t);
}
function Hi(e, t) {
	Gr(e, "da", t);
}
function Gr(e, t, n = ce) {
	const s =
		e.__wdc ||
		(e.__wdc = () => {
			let r = n;
			for (; r; ) {
				if (r.isDeactivated) return;
				r = r.parent;
			}
			return e();
		});
	if ((En(t, s, n), n)) {
		let r = n.parent;
		for (; r && r.parent; )
			qr(r.parent.vnode) && Bi(s, t, n, r), (r = r.parent);
	}
}
function Bi(e, t, n, s) {
	const r = En(t, e, s, !0);
	Qr(() => {
		es(s[t], r);
	}, n);
}
function En(e, t, n = ce, s = !1) {
	if (n) {
		const r = n[e] || (n[e] = []),
			o =
				t.__weh ||
				(t.__weh = (...i) => {
					if (n.isUnmounted) return;
					Je();
					const u = Wt(n),
						l = Re(t, n, e, i);
					return u(), Xe(), l;
				});
		return s ? r.unshift(o) : r.push(o), o;
	}
}
const Be =
		(e) =>
		(t, n = ce) =>
			(!Rn || e === "sp") && En(e, (...s) => t(...s), n),
	Ui = Be("bm"),
	Vi = Be("m"),
	Di = Be("bu"),
	Ki = Be("u"),
	ki = Be("bum"),
	Qr = Be("um"),
	Wi = Be("sp"),
	zi = Be("rtg"),
	qi = Be("rtc");
function Gi(e, t = ce) {
	En("ec", e, t);
}
const Dn = (e) => (e ? (fo(e) ? ms(e) || e.proxy : Dn(e.parent)) : null),
	Tt = re(Object.create(null), {
		$: (e) => e,
		$el: (e) => e.vnode.el,
		$data: (e) => e.data,
		$props: (e) => e.props,
		$attrs: (e) => e.attrs,
		$slots: (e) => e.slots,
		$refs: (e) => e.refs,
		$parent: (e) => Dn(e.parent),
		$root: (e) => Dn(e.root),
		$emit: (e) => e.emit,
		$options: (e) => hs(e),
		$forceUpdate: (e) =>
			e.f ||
			(e.f = () => {
				(e.effect.dirty = !0), ds(e.update);
			}),
		$nextTick: (e) => e.n || (e.n = Br.bind(e.proxy)),
		$watch: (e) => ji.bind(e),
	}),
	In = (e, t) => e !== X && !e.__isScriptSetup && K(e, t),
	Qi = {
		get({ _: e }, t) {
			if (t === "__v_skip") return !0;
			const {
				ctx: n,
				setupState: s,
				data: r,
				props: o,
				accessCache: i,
				type: u,
				appContext: l,
			} = e;
			let d;
			if (t[0] !== "$") {
				const b = i[t];
				if (b !== void 0)
					switch (b) {
						case 1:
							return s[t];
						case 2:
							return r[t];
						case 4:
							return n[t];
						case 3:
							return o[t];
					}
				else {
					if (In(s, t)) return (i[t] = 1), s[t];
					if (r !== X && K(r, t)) return (i[t] = 2), r[t];
					if ((d = e.propsOptions[0]) && K(d, t))
						return (i[t] = 3), o[t];
					if (n !== X && K(n, t)) return (i[t] = 4), n[t];
					Kn && (i[t] = 0);
				}
			}
			const a = Tt[t];
			let h, p;
			if (a) return t === "$attrs" && pe(e.attrs, "get", ""), a(e);
			if ((h = u.__cssModules) && (h = h[t])) return h;
			if (n !== X && K(n, t)) return (i[t] = 4), n[t];
			if (((p = l.config.globalProperties), K(p, t))) return p[t];
		},
		set({ _: e }, t, n) {
			const { data: s, setupState: r, ctx: o } = e;
			return In(r, t)
				? ((r[t] = n), !0)
				: s !== X && K(s, t)
				? ((s[t] = n), !0)
				: K(e.props, t) || (t[0] === "$" && t.slice(1) in e)
				? !1
				: ((o[t] = n), !0);
		},
		has(
			{
				_: {
					data: e,
					setupState: t,
					accessCache: n,
					ctx: s,
					appContext: r,
					propsOptions: o,
				},
			},
			i
		) {
			let u;
			return (
				!!n[i] ||
				(e !== X && K(e, i)) ||
				In(t, i) ||
				((u = o[0]) && K(u, i)) ||
				K(s, i) ||
				K(Tt, i) ||
				K(r.config.globalProperties, i)
			);
		},
		defineProperty(e, t, n) {
			return (
				n.get != null
					? (e._.accessCache[t] = 0)
					: K(n, "value") && this.set(e, t, n.value, null),
				Reflect.defineProperty(e, t, n)
			);
		},
	};
function $s(e) {
	return F(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Kn = !0;
function Yi(e) {
	const t = hs(e),
		n = e.proxy,
		s = e.ctx;
	(Kn = !1), t.beforeCreate && Ls(t.beforeCreate, e, "bc");
	const {
		data: r,
		computed: o,
		methods: i,
		watch: u,
		provide: l,
		inject: d,
		created: a,
		beforeMount: h,
		mounted: p,
		beforeUpdate: b,
		updated: A,
		activated: N,
		deactivated: V,
		beforeDestroy: M,
		beforeUnmount: $,
		destroyed: H,
		unmounted: k,
		render: te,
		renderTracked: B,
		renderTriggered: ue,
		errorCaptured: _e,
		serverPrefetch: Ze,
		expose: Se,
		inheritAttrs: Ue,
		components: et,
		directives: Pe,
		filters: wt,
	} = t;
	if ((d && Ji(d, s, null), i))
		for (const Q in i) {
			const W = i[Q];
			U(W) && (s[Q] = W.bind(n));
		}
	if (r) {
		const Q = r.call(n, n);
		ee(Q) && (e.data = mn(Q));
	}
	if (((Kn = !0), o))
		for (const Q in o) {
			const W = o[Q],
				Ne = U(W) ? W.bind(n, n) : U(W.get) ? W.get.bind(n, n) : ve,
				Ve = !U(W) && U(W.set) ? W.set.bind(n) : ve,
				Oe = xe({ get: Ne, set: Ve });
			Object.defineProperty(s, Q, {
				enumerable: !0,
				configurable: !0,
				get: () => Oe.value,
				set: (de) => (Oe.value = de),
			});
		}
	if (u) for (const Q in u) Yr(u[Q], s, n, Q);
	if (l) {
		const Q = U(l) ? l.call(n) : l;
		Reflect.ownKeys(Q).forEach((W) => {
			nn(W, Q[W]);
		});
	}
	a && Ls(a, e, "c");
	function ne(Q, W) {
		F(W) ? W.forEach((Ne) => Q(Ne.bind(n))) : W && Q(W.bind(n));
	}
	if (
		(ne(Ui, h),
		ne(Vi, p),
		ne(Di, b),
		ne(Ki, A),
		ne(Fi, N),
		ne(Hi, V),
		ne(Gi, _e),
		ne(qi, B),
		ne(zi, ue),
		ne(ki, $),
		ne(Qr, k),
		ne(Wi, Ze),
		F(Se))
	)
		if (Se.length) {
			const Q = e.exposed || (e.exposed = {});
			Se.forEach((W) => {
				Object.defineProperty(Q, W, {
					get: () => n[W],
					set: (Ne) => (n[W] = Ne),
				});
			});
		} else e.exposed || (e.exposed = {});
	te && e.render === ve && (e.render = te),
		Ue != null && (e.inheritAttrs = Ue),
		et && (e.components = et),
		Pe && (e.directives = Pe);
}
function Ji(e, t, n = ve) {
	F(e) && (e = kn(e));
	for (const s in e) {
		const r = e[s];
		let o;
		ee(r)
			? "default" in r
				? (o = $e(r.from || s, r.default, !0))
				: (o = $e(r.from || s))
			: (o = $e(r)),
			ge(o)
				? Object.defineProperty(t, s, {
						enumerable: !0,
						configurable: !0,
						get: () => o.value,
						set: (i) => (o.value = i),
				  })
				: (t[s] = o);
	}
}
function Ls(e, t, n) {
	Re(F(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Yr(e, t, n, s) {
	const r = s.includes(".") ? Wr(n, s) : () => n[s];
	if (oe(e)) {
		const o = t[e];
		U(o) && en(r, o);
	} else if (U(e)) en(r, e.bind(n));
	else if (ee(e))
		if (F(e)) e.forEach((o) => Yr(o, t, n, s));
		else {
			const o = U(e.handler) ? e.handler.bind(n) : t[e.handler];
			U(o) && en(r, o, e);
		}
}
function hs(e) {
	const t = e.type,
		{ mixins: n, extends: s } = t,
		{
			mixins: r,
			optionsCache: o,
			config: { optionMergeStrategies: i },
		} = e.appContext,
		u = o.get(t);
	let l;
	return (
		u
			? (l = u)
			: !r.length && !n && !s
			? (l = t)
			: ((l = {}),
			  r.length && r.forEach((d) => un(l, d, i, !0)),
			  un(l, t, i)),
		ee(t) && o.set(t, l),
		l
	);
}
function un(e, t, n, s = !1) {
	const { mixins: r, extends: o } = t;
	o && un(e, o, n, !0), r && r.forEach((i) => un(e, i, n, !0));
	for (const i in t)
		if (!(s && i === "expose")) {
			const u = Xi[i] || (n && n[i]);
			e[i] = u ? u(e[i], t[i]) : t[i];
		}
	return e;
}
const Xi = {
	data: Ns,
	props: js,
	emits: js,
	methods: Pt,
	computed: Pt,
	beforeCreate: fe,
	created: fe,
	beforeMount: fe,
	mounted: fe,
	beforeUpdate: fe,
	updated: fe,
	beforeDestroy: fe,
	beforeUnmount: fe,
	destroyed: fe,
	unmounted: fe,
	activated: fe,
	deactivated: fe,
	errorCaptured: fe,
	serverPrefetch: fe,
	components: Pt,
	directives: Pt,
	watch: el,
	provide: Ns,
	inject: Zi,
};
function Ns(e, t) {
	return t
		? e
			? function () {
					return re(
						U(e) ? e.call(this, this) : e,
						U(t) ? t.call(this, this) : t
					);
			  }
			: t
		: e;
}
function Zi(e, t) {
	return Pt(kn(e), kn(t));
}
function kn(e) {
	if (F(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function fe(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Pt(e, t) {
	return e ? re(Object.create(null), e, t) : t;
}
function js(e, t) {
	return e
		? F(e) && F(t)
			? [...new Set([...e, ...t])]
			: re(Object.create(null), $s(e), $s(t ?? {}))
		: t;
}
function el(e, t) {
	if (!e) return t;
	if (!t) return e;
	const n = re(Object.create(null), e);
	for (const s in t) n[s] = fe(e[s], t[s]);
	return n;
}
function Jr() {
	return {
		app: null,
		config: {
			isNativeTag: Oo,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {},
		},
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap(),
		propsCache: new WeakMap(),
		emitsCache: new WeakMap(),
	};
}
let tl = 0;
function nl(e, t) {
	return function (s, r = null) {
		U(s) || (s = re({}, s)), r != null && !ee(r) && (r = null);
		const o = Jr(),
			i = new WeakSet();
		let u = !1;
		const l = (o.app = {
			_uid: tl++,
			_component: s,
			_props: r,
			_container: null,
			_context: o,
			_instance: null,
			version: Pl,
			get config() {
				return o.config;
			},
			set config(d) {},
			use(d, ...a) {
				return (
					i.has(d) ||
						(d && U(d.install)
							? (i.add(d), d.install(l, ...a))
							: U(d) && (i.add(d), d(l, ...a))),
					l
				);
			},
			mixin(d) {
				return o.mixins.includes(d) || o.mixins.push(d), l;
			},
			component(d, a) {
				return a ? ((o.components[d] = a), l) : o.components[d];
			},
			directive(d, a) {
				return a ? ((o.directives[d] = a), l) : o.directives[d];
			},
			mount(d, a, h) {
				if (!u) {
					const p = ae(s, r);
					return (
						(p.appContext = o),
						h === !0 ? (h = "svg") : h === !1 && (h = void 0),
						a && t ? t(p, d) : e(p, d, h),
						(u = !0),
						(l._container = d),
						(d.__vue_app__ = l),
						ms(p.component) || p.component.proxy
					);
				}
			},
			unmount() {
				u && (e(null, l._container), delete l._container.__vue_app__);
			},
			provide(d, a) {
				return (o.provides[d] = a), l;
			},
			runWithContext(d) {
				const a = Mt;
				Mt = l;
				try {
					return d();
				} finally {
					Mt = a;
				}
			},
		});
		return l;
	};
}
let Mt = null;
function nn(e, t) {
	if (ce) {
		let n = ce.provides;
		const s = ce.parent && ce.parent.provides;
		s === n && (n = ce.provides = Object.create(s)), (n[e] = t);
	}
}
function $e(e, t, n = !1) {
	const s = ce || Ee;
	if (s || Mt) {
		const r = s
			? s.parent == null
				? s.vnode.appContext && s.vnode.appContext.provides
				: s.parent.provides
			: Mt._context.provides;
		if (r && e in r) return r[e];
		if (arguments.length > 1) return n && U(t) ? t.call(s && s.proxy) : t;
	}
}
const Xr = {},
	Zr = () => Object.create(Xr),
	eo = (e) => Object.getPrototypeOf(e) === Xr;
function sl(e, t, n, s = !1) {
	const r = {},
		o = Zr();
	(e.propsDefaults = Object.create(null)), to(e, t, r, o);
	for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
	n
		? (e.props = s ? r : Tr(r))
		: e.type.props
		? (e.props = r)
		: (e.props = o),
		(e.attrs = o);
}
function rl(e, t, n, s) {
	const {
			props: r,
			attrs: o,
			vnode: { patchFlag: i },
		} = e,
		u = z(r),
		[l] = e.propsOptions;
	let d = !1;
	if ((s || i > 0) && !(i & 16)) {
		if (i & 8) {
			const a = e.vnode.dynamicProps;
			for (let h = 0; h < a.length; h++) {
				let p = a[h];
				if (vn(e.emitsOptions, p)) continue;
				const b = t[p];
				if (l)
					if (K(o, p)) b !== o[p] && ((o[p] = b), (d = !0));
					else {
						const A = Le(p);
						r[A] = Wn(l, u, A, b, e, !1);
					}
				else b !== o[p] && ((o[p] = b), (d = !0));
			}
		}
	} else {
		to(e, t, r, o) && (d = !0);
		let a;
		for (const h in u)
			(!t || (!K(t, h) && ((a = xt(h)) === h || !K(t, a)))) &&
				(l
					? n &&
					  (n[h] !== void 0 || n[a] !== void 0) &&
					  (r[h] = Wn(l, u, h, void 0, e, !0))
					: delete r[h]);
		if (o !== u)
			for (const h in o) (!t || !K(t, h)) && (delete o[h], (d = !0));
	}
	d && He(e.attrs, "set", "");
}
function to(e, t, n, s) {
	const [r, o] = e.propsOptions;
	let i = !1,
		u;
	if (t)
		for (let l in t) {
			if (At(l)) continue;
			const d = t[l];
			let a;
			r && K(r, (a = Le(l)))
				? !o || !o.includes(a)
					? (n[a] = d)
					: ((u || (u = {}))[a] = d)
				: vn(e.emitsOptions, l) ||
				  ((!(l in s) || d !== s[l]) && ((s[l] = d), (i = !0)));
		}
	if (o) {
		const l = z(n),
			d = u || X;
		for (let a = 0; a < o.length; a++) {
			const h = o[a];
			n[h] = Wn(r, l, h, d[h], e, !K(d, h));
		}
	}
	return i;
}
function Wn(e, t, n, s, r, o) {
	const i = e[n];
	if (i != null) {
		const u = K(i, "default");
		if (u && s === void 0) {
			const l = i.default;
			if (i.type !== Function && !i.skipFactory && U(l)) {
				const { propsDefaults: d } = r;
				if (n in d) s = d[n];
				else {
					const a = Wt(r);
					(s = d[n] = l.call(null, t)), a();
				}
			} else s = l;
		}
		i[0] &&
			(o && !u
				? (s = !1)
				: i[1] && (s === "" || s === xt(n)) && (s = !0));
	}
	return s;
}
function no(e, t, n = !1) {
	const s = t.propsCache,
		r = s.get(e);
	if (r) return r;
	const o = e.props,
		i = {},
		u = [];
	let l = !1;
	if (!U(e)) {
		const a = (h) => {
			l = !0;
			const [p, b] = no(h, t, !0);
			re(i, p), b && u.push(...b);
		};
		!n && t.mixins.length && t.mixins.forEach(a),
			e.extends && a(e.extends),
			e.mixins && e.mixins.forEach(a);
	}
	if (!o && !l) return ee(e) && s.set(e, pt), pt;
	if (F(o))
		for (let a = 0; a < o.length; a++) {
			const h = Le(o[a]);
			Fs(h) && (i[h] = X);
		}
	else if (o)
		for (const a in o) {
			const h = Le(a);
			if (Fs(h)) {
				const p = o[a],
					b = (i[h] = F(p) || U(p) ? { type: p } : re({}, p));
				if (b) {
					const A = Us(Boolean, b.type),
						N = Us(String, b.type);
					(b[0] = A > -1),
						(b[1] = N < 0 || A < N),
						(A > -1 || K(b, "default")) && u.push(h);
				}
			}
		}
	const d = [i, u];
	return ee(e) && s.set(e, d), d;
}
function Fs(e) {
	return e[0] !== "$" && !At(e);
}
function Hs(e) {
	return e === null
		? "null"
		: typeof e == "function"
		? e.name || ""
		: (typeof e == "object" && e.constructor && e.constructor.name) || "";
}
function Bs(e, t) {
	return Hs(e) === Hs(t);
}
function Us(e, t) {
	return F(t) ? t.findIndex((n) => Bs(n, e)) : U(t) && Bs(t, e) ? 0 : -1;
}
const so = (e) => e[0] === "_" || e === "$stable",
	ps = (e) => (F(e) ? e.map(Te) : [Te(e)]),
	ol = (e, t, n) => {
		if (t._n) return t;
		const s = wi((...r) => ps(t(...r)), n);
		return (s._c = !1), s;
	},
	ro = (e, t, n) => {
		const s = e._ctx;
		for (const r in e) {
			if (so(r)) continue;
			const o = e[r];
			if (U(o)) t[r] = ol(r, o, s);
			else if (o != null) {
				const i = ps(o);
				t[r] = () => i;
			}
		}
	},
	oo = (e, t) => {
		const n = ps(t);
		e.slots.default = () => n;
	},
	il = (e, t) => {
		const n = (e.slots = Zr());
		if (e.vnode.shapeFlag & 32) {
			const s = t._;
			s ? (re(n, t), _r(n, "_", s, !0)) : ro(t, n);
		} else t && oo(e, t);
	},
	ll = (e, t, n) => {
		const { vnode: s, slots: r } = e;
		let o = !0,
			i = X;
		if (s.shapeFlag & 32) {
			const u = t._;
			u
				? n && u === 1
					? (o = !1)
					: (re(r, t), !n && u === 1 && delete r._)
				: ((o = !t.$stable), ro(t, r)),
				(i = t);
		} else t && (oo(e, t), (i = { default: 1 }));
		if (o) for (const u in r) !so(u) && i[u] == null && delete r[u];
	};
function zn(e, t, n, s, r = !1) {
	if (F(e)) {
		e.forEach((p, b) => zn(p, t && (F(t) ? t[b] : t), n, s, r));
		return;
	}
	if (tn(s) && !r) return;
	const o = s.shapeFlag & 4 ? ms(s.component) || s.component.proxy : s.el,
		i = r ? null : o,
		{ i: u, r: l } = e,
		d = t && t.r,
		a = u.refs === X ? (u.refs = {}) : u.refs,
		h = u.setupState;
	if (
		(d != null &&
			d !== l &&
			(oe(d)
				? ((a[d] = null), K(h, d) && (h[d] = null))
				: ge(d) && (d.value = null)),
		U(l))
	)
		Qe(l, u, 12, [i, a]);
	else {
		const p = oe(l),
			b = ge(l);
		if (p || b) {
			const A = () => {
				if (e.f) {
					const N = p ? (K(h, l) ? h[l] : a[l]) : l.value;
					r
						? F(N) && es(N, o)
						: F(N)
						? N.includes(o) || N.push(o)
						: p
						? ((a[l] = [o]), K(h, l) && (h[l] = a[l]))
						: ((l.value = [o]), e.k && (a[e.k] = l.value));
				} else
					p
						? ((a[l] = i), K(h, l) && (h[l] = i))
						: b && ((l.value = i), e.k && (a[e.k] = i));
			};
			i ? ((A.id = -1), he(A, n)) : A();
		}
	}
}
const he = $i;
function cl(e) {
	return ul(e);
}
function ul(e, t) {
	const n = vr();
	n.__VUE__ = !0;
	const {
			insert: s,
			remove: r,
			patchProp: o,
			createElement: i,
			createText: u,
			createComment: l,
			setText: d,
			setElementText: a,
			parentNode: h,
			nextSibling: p,
			setScopeId: b = ve,
			insertStaticContent: A,
		} = e,
		N = (
			c,
			f,
			g,
			v = null,
			m = null,
			E = null,
			S = void 0,
			x = null,
			w = !!f.dynamicChildren
		) => {
			if (c === f) return;
			c && !Ct(c, f) && ((v = _(c)), de(c, m, E, !0), (c = null)),
				f.patchFlag === -2 && ((w = !1), (f.dynamicChildren = null));
			const { type: y, ref: O, shapeFlag: L } = f;
			switch (y) {
				case wn:
					V(c, f, g, v);
					break;
				case Ut:
					M(c, f, g, v);
					break;
				case sn:
					c == null && $(f, g, v, S);
					break;
				case Fe:
					et(c, f, g, v, m, E, S, x, w);
					break;
				default:
					L & 1
						? te(c, f, g, v, m, E, S, x, w)
						: L & 6
						? Pe(c, f, g, v, m, E, S, x, w)
						: (L & 64 || L & 128) &&
						  y.process(c, f, g, v, m, E, S, x, w, I);
			}
			O != null && m && zn(O, c && c.ref, E, f || c, !f);
		},
		V = (c, f, g, v) => {
			if (c == null) s((f.el = u(f.children)), g, v);
			else {
				const m = (f.el = c.el);
				f.children !== c.children && d(m, f.children);
			}
		},
		M = (c, f, g, v) => {
			c == null ? s((f.el = l(f.children || "")), g, v) : (f.el = c.el);
		},
		$ = (c, f, g, v) => {
			[c.el, c.anchor] = A(c.children, f, g, v, c.el, c.anchor);
		},
		H = ({ el: c, anchor: f }, g, v) => {
			let m;
			for (; c && c !== f; ) (m = p(c)), s(c, g, v), (c = m);
			s(f, g, v);
		},
		k = ({ el: c, anchor: f }) => {
			let g;
			for (; c && c !== f; ) (g = p(c)), r(c), (c = g);
			r(f);
		},
		te = (c, f, g, v, m, E, S, x, w) => {
			f.type === "svg"
				? (S = "svg")
				: f.type === "math" && (S = "mathml"),
				c == null ? B(f, g, v, m, E, S, x, w) : Ze(c, f, m, E, S, x, w);
		},
		B = (c, f, g, v, m, E, S, x) => {
			let w, y;
			const { props: O, shapeFlag: L, transition: T, dirs: j } = c;
			if (
				((w = c.el = i(c.type, E, O && O.is, O)),
				L & 8
					? a(w, c.children)
					: L & 16 && _e(c.children, w, null, v, m, Tn(c, E), S, x),
				j && tt(c, null, v, "created"),
				ue(w, c, c.scopeId, S, v),
				O)
			) {
				for (const Y in O)
					Y !== "value" &&
						!At(Y) &&
						o(w, Y, null, O[Y], E, c.children, v, m, ie);
				"value" in O && o(w, "value", null, O.value, E),
					(y = O.onVnodeBeforeMount) && Ie(y, v, c);
			}
			j && tt(c, null, v, "beforeMount");
			const D = fl(m, T);
			D && T.beforeEnter(w),
				s(w, f, g),
				((y = O && O.onVnodeMounted) || D || j) &&
					he(() => {
						y && Ie(y, v, c),
							D && T.enter(w),
							j && tt(c, null, v, "mounted");
					}, m);
		},
		ue = (c, f, g, v, m) => {
			if ((g && b(c, g), v))
				for (let E = 0; E < v.length; E++) b(c, v[E]);
			if (m) {
				let E = m.subTree;
				if (f === E) {
					const S = m.vnode;
					ue(c, S, S.scopeId, S.slotScopeIds, m.parent);
				}
			}
		},
		_e = (c, f, g, v, m, E, S, x, w = 0) => {
			for (let y = w; y < c.length; y++) {
				const O = (c[y] = x ? We(c[y]) : Te(c[y]));
				N(null, O, f, g, v, m, E, S, x);
			}
		},
		Ze = (c, f, g, v, m, E, S) => {
			const x = (f.el = c.el);
			let { patchFlag: w, dynamicChildren: y, dirs: O } = f;
			w |= c.patchFlag & 16;
			const L = c.props || X,
				T = f.props || X;
			let j;
			if (
				(g && nt(g, !1),
				(j = T.onVnodeBeforeUpdate) && Ie(j, g, f, c),
				O && tt(f, c, g, "beforeUpdate"),
				g && nt(g, !0),
				y
					? Se(c.dynamicChildren, y, x, g, v, Tn(f, m), E)
					: S || W(c, f, x, null, g, v, Tn(f, m), E, !1),
				w > 0)
			) {
				if (w & 16) Ue(x, f, L, T, g, v, m);
				else if (
					(w & 2 &&
						L.class !== T.class &&
						o(x, "class", null, T.class, m),
					w & 4 && o(x, "style", L.style, T.style, m),
					w & 8)
				) {
					const D = f.dynamicProps;
					for (let Y = 0; Y < D.length; Y++) {
						const J = D[Y],
							se = L[J],
							be = T[J];
						(be !== se || J === "value") &&
							o(x, J, se, be, m, c.children, g, v, ie);
					}
				}
				w & 1 && c.children !== f.children && a(x, f.children);
			} else !S && y == null && Ue(x, f, L, T, g, v, m);
			((j = T.onVnodeUpdated) || O) &&
				he(() => {
					j && Ie(j, g, f, c), O && tt(f, c, g, "updated");
				}, v);
		},
		Se = (c, f, g, v, m, E, S) => {
			for (let x = 0; x < f.length; x++) {
				const w = c[x],
					y = f[x],
					O =
						w.el && (w.type === Fe || !Ct(w, y) || w.shapeFlag & 70)
							? h(w.el)
							: g;
				N(w, y, O, null, v, m, E, S, !0);
			}
		},
		Ue = (c, f, g, v, m, E, S) => {
			if (g !== v) {
				if (g !== X)
					for (const x in g)
						!At(x) &&
							!(x in v) &&
							o(c, x, g[x], null, S, f.children, m, E, ie);
				for (const x in v) {
					if (At(x)) continue;
					const w = v[x],
						y = g[x];
					w !== y &&
						x !== "value" &&
						o(c, x, y, w, S, f.children, m, E, ie);
				}
				"value" in v && o(c, "value", g.value, v.value, S);
			}
		},
		et = (c, f, g, v, m, E, S, x, w) => {
			const y = (f.el = c ? c.el : u("")),
				O = (f.anchor = c ? c.anchor : u(""));
			let { patchFlag: L, dynamicChildren: T, slotScopeIds: j } = f;
			j && (x = x ? x.concat(j) : j),
				c == null
					? (s(y, g, v),
					  s(O, g, v),
					  _e(f.children || [], g, O, m, E, S, x, w))
					: L > 0 && L & 64 && T && c.dynamicChildren
					? (Se(c.dynamicChildren, T, g, m, E, S, x),
					  (f.key != null || (m && f === m.subTree)) && io(c, f, !0))
					: W(c, f, g, O, m, E, S, x, w);
		},
		Pe = (c, f, g, v, m, E, S, x, w) => {
			(f.slotScopeIds = x),
				c == null
					? f.shapeFlag & 512
						? m.ctx.activate(f, g, v, S, w)
						: wt(f, g, v, m, E, S, w)
					: ct(c, f, w);
		},
		wt = (c, f, g, v, m, E, S) => {
			const x = (c.component = yl(c, v, m));
			if ((qr(c) && (x.ctx.renderer = I), xl(x), x.asyncDep)) {
				if ((m && m.registerDep(x, ne), !c.el)) {
					const w = (x.subTree = ae(Ut));
					M(null, w, f, g);
				}
			} else ne(x, c, f, g, m, E, S);
		},
		ct = (c, f, g) => {
			const v = (f.component = c.component);
			if (Si(c, f, g))
				if (v.asyncDep && !v.asyncResolved) {
					Q(v, f, g);
					return;
				} else
					(v.next = f),
						bi(v.update),
						(v.effect.dirty = !0),
						v.update();
			else (f.el = c.el), (v.vnode = f);
		},
		ne = (c, f, g, v, m, E, S) => {
			const x = () => {
					if (c.isMounted) {
						let { next: O, bu: L, u: T, parent: j, vnode: D } = c;
						{
							const at = lo(c);
							if (at) {
								O && ((O.el = D.el), Q(c, O, S)),
									at.asyncDep.then(() => {
										c.isUnmounted || x();
									});
								return;
							}
						}
						let Y = O,
							J;
						nt(c, !1),
							O ? ((O.el = D.el), Q(c, O, S)) : (O = D),
							L && On(L),
							(J = O.props && O.props.onVnodeBeforeUpdate) &&
								Ie(J, j, O, D),
							nt(c, !0);
						const se = An(c),
							be = c.subTree;
						(c.subTree = se),
							N(be, se, h(be.el), _(be), c, m, E),
							(O.el = se.el),
							Y === null && Pi(c, se.el),
							T && he(T, m),
							(J = O.props && O.props.onVnodeUpdated) &&
								he(() => Ie(J, j, O, D), m);
					} else {
						let O;
						const { el: L, props: T } = f,
							{ bm: j, m: D, parent: Y } = c,
							J = tn(f);
						if (
							(nt(c, !1),
							j && On(j),
							!J &&
								(O = T && T.onVnodeBeforeMount) &&
								Ie(O, Y, f),
							nt(c, !0),
							L && Z)
						) {
							const se = () => {
								(c.subTree = An(c)),
									Z(L, c.subTree, c, m, null);
							};
							J
								? f.type
										.__asyncLoader()
										.then(() => !c.isUnmounted && se())
								: se();
						} else {
							const se = (c.subTree = An(c));
							N(null, se, g, v, c, m, E), (f.el = se.el);
						}
						if (
							(D && he(D, m), !J && (O = T && T.onVnodeMounted))
						) {
							const se = f;
							he(() => Ie(O, Y, se), m);
						}
						(f.shapeFlag & 256 ||
							(Y && tn(Y.vnode) && Y.vnode.shapeFlag & 256)) &&
							c.a &&
							he(c.a, m),
							(c.isMounted = !0),
							(f = g = v = null);
					}
				},
				w = (c.effect = new rs(x, ve, () => ds(y), c.scope)),
				y = (c.update = () => {
					w.dirty && w.run();
				});
			(y.id = c.uid), nt(c, !0), y();
		},
		Q = (c, f, g) => {
			f.component = c;
			const v = c.vnode.props;
			(c.vnode = f),
				(c.next = null),
				rl(c, f.props, v, g),
				ll(c, f.children, g),
				Je(),
				Is(c),
				Xe();
		},
		W = (c, f, g, v, m, E, S, x, w = !1) => {
			const y = c && c.children,
				O = c ? c.shapeFlag : 0,
				L = f.children,
				{ patchFlag: T, shapeFlag: j } = f;
			if (T > 0) {
				if (T & 128) {
					Ve(y, L, g, v, m, E, S, x, w);
					return;
				} else if (T & 256) {
					Ne(y, L, g, v, m, E, S, x, w);
					return;
				}
			}
			j & 8
				? (O & 16 && ie(y, m, E), L !== y && a(g, L))
				: O & 16
				? j & 16
					? Ve(y, L, g, v, m, E, S, x, w)
					: ie(y, m, E, !0)
				: (O & 8 && a(g, ""), j & 16 && _e(L, g, v, m, E, S, x, w));
		},
		Ne = (c, f, g, v, m, E, S, x, w) => {
			(c = c || pt), (f = f || pt);
			const y = c.length,
				O = f.length,
				L = Math.min(y, O);
			let T;
			for (T = 0; T < L; T++) {
				const j = (f[T] = w ? We(f[T]) : Te(f[T]));
				N(c[T], j, g, null, m, E, S, x, w);
			}
			y > O ? ie(c, m, E, !0, !1, L) : _e(f, g, v, m, E, S, x, w, L);
		},
		Ve = (c, f, g, v, m, E, S, x, w) => {
			let y = 0;
			const O = f.length;
			let L = c.length - 1,
				T = O - 1;
			for (; y <= L && y <= T; ) {
				const j = c[y],
					D = (f[y] = w ? We(f[y]) : Te(f[y]));
				if (Ct(j, D)) N(j, D, g, null, m, E, S, x, w);
				else break;
				y++;
			}
			for (; y <= L && y <= T; ) {
				const j = c[L],
					D = (f[T] = w ? We(f[T]) : Te(f[T]));
				if (Ct(j, D)) N(j, D, g, null, m, E, S, x, w);
				else break;
				L--, T--;
			}
			if (y > L) {
				if (y <= T) {
					const j = T + 1,
						D = j < O ? f[j].el : v;
					for (; y <= T; )
						N(
							null,
							(f[y] = w ? We(f[y]) : Te(f[y])),
							g,
							D,
							m,
							E,
							S,
							x,
							w
						),
							y++;
				}
			} else if (y > T) for (; y <= L; ) de(c[y], m, E, !0), y++;
			else {
				const j = y,
					D = y,
					Y = new Map();
				for (y = D; y <= T; y++) {
					const me = (f[y] = w ? We(f[y]) : Te(f[y]));
					me.key != null && Y.set(me.key, y);
				}
				let J,
					se = 0;
				const be = T - D + 1;
				let at = !1,
					bs = 0;
				const Rt = new Array(be);
				for (y = 0; y < be; y++) Rt[y] = 0;
				for (y = j; y <= L; y++) {
					const me = c[y];
					if (se >= be) {
						de(me, m, E, !0);
						continue;
					}
					let Ae;
					if (me.key != null) Ae = Y.get(me.key);
					else
						for (J = D; J <= T; J++)
							if (Rt[J - D] === 0 && Ct(me, f[J])) {
								Ae = J;
								break;
							}
					Ae === void 0
						? de(me, m, E, !0)
						: ((Rt[Ae - D] = y + 1),
						  Ae >= bs ? (bs = Ae) : (at = !0),
						  N(me, f[Ae], g, null, m, E, S, x, w),
						  se++);
				}
				const ys = at ? al(Rt) : pt;
				for (J = ys.length - 1, y = be - 1; y >= 0; y--) {
					const me = D + y,
						Ae = f[me],
						xs = me + 1 < O ? f[me + 1].el : v;
					Rt[y] === 0
						? N(null, Ae, g, xs, m, E, S, x, w)
						: at && (J < 0 || y !== ys[J] ? Oe(Ae, g, xs, 2) : J--);
				}
			}
		},
		Oe = (c, f, g, v, m = null) => {
			const {
				el: E,
				type: S,
				transition: x,
				children: w,
				shapeFlag: y,
			} = c;
			if (y & 6) {
				Oe(c.component.subTree, f, g, v);
				return;
			}
			if (y & 128) {
				c.suspense.move(f, g, v);
				return;
			}
			if (y & 64) {
				S.move(c, f, g, I);
				return;
			}
			if (S === Fe) {
				s(E, f, g);
				for (let L = 0; L < w.length; L++) Oe(w[L], f, g, v);
				s(c.anchor, f, g);
				return;
			}
			if (S === sn) {
				H(c, f, g);
				return;
			}
			if (v !== 2 && y & 1 && x)
				if (v === 0)
					x.beforeEnter(E), s(E, f, g), he(() => x.enter(E), m);
				else {
					const { leave: L, delayLeave: T, afterLeave: j } = x,
						D = () => s(E, f, g),
						Y = () => {
							L(E, () => {
								D(), j && j();
							});
						};
					T ? T(E, D, Y) : Y();
				}
			else s(E, f, g);
		},
		de = (c, f, g, v = !1, m = !1) => {
			const {
				type: E,
				props: S,
				ref: x,
				children: w,
				dynamicChildren: y,
				shapeFlag: O,
				patchFlag: L,
				dirs: T,
			} = c;
			if ((x != null && zn(x, null, g, c, !0), O & 256)) {
				f.ctx.deactivate(c);
				return;
			}
			const j = O & 1 && T,
				D = !tn(c);
			let Y;
			if ((D && (Y = S && S.onVnodeBeforeUnmount) && Ie(Y, f, c), O & 6))
				zt(c.component, g, v);
			else {
				if (O & 128) {
					c.suspense.unmount(g, v);
					return;
				}
				j && tt(c, null, f, "beforeUnmount"),
					O & 64
						? c.type.remove(c, f, g, m, I, v)
						: y && (E !== Fe || (L > 0 && L & 64))
						? ie(y, f, g, !1, !0)
						: ((E === Fe && L & 384) || (!m && O & 16)) &&
						  ie(w, f, g),
					v && ut(c);
			}
			((D && (Y = S && S.onVnodeUnmounted)) || j) &&
				he(() => {
					Y && Ie(Y, f, c), j && tt(c, null, f, "unmounted");
				}, g);
		},
		ut = (c) => {
			const { type: f, el: g, anchor: v, transition: m } = c;
			if (f === Fe) {
				ft(g, v);
				return;
			}
			if (f === sn) {
				k(c);
				return;
			}
			const E = () => {
				r(g), m && !m.persisted && m.afterLeave && m.afterLeave();
			};
			if (c.shapeFlag & 1 && m && !m.persisted) {
				const { leave: S, delayLeave: x } = m,
					w = () => S(g, E);
				x ? x(c.el, E, w) : w();
			} else E();
		},
		ft = (c, f) => {
			let g;
			for (; c !== f; ) (g = p(c)), r(c), (c = g);
			r(f);
		},
		zt = (c, f, g) => {
			const { bum: v, scope: m, update: E, subTree: S, um: x } = c;
			v && On(v),
				m.stop(),
				E && ((E.active = !1), de(S, c, f, g)),
				x && he(x, f),
				he(() => {
					c.isUnmounted = !0;
				}, f),
				f &&
					f.pendingBranch &&
					!f.isUnmounted &&
					c.asyncDep &&
					!c.asyncResolved &&
					c.suspenseId === f.pendingId &&
					(f.deps--, f.deps === 0 && f.resolve());
		},
		ie = (c, f, g, v = !1, m = !1, E = 0) => {
			for (let S = E; S < c.length; S++) de(c[S], f, g, v, m);
		},
		_ = (c) =>
			c.shapeFlag & 6
				? _(c.component.subTree)
				: c.shapeFlag & 128
				? c.suspense.next()
				: p(c.anchor || c.el);
	let P = !1;
	const C = (c, f, g) => {
			c == null
				? f._vnode && de(f._vnode, null, null, !0)
				: N(f._vnode || null, c, f, null, null, null, g),
				P || ((P = !0), Is(), Vr(), (P = !1)),
				(f._vnode = c);
		},
		I = {
			p: N,
			um: de,
			m: Oe,
			r: ut,
			mt: wt,
			mc: _e,
			pc: W,
			pbc: Se,
			n: _,
			o: e,
		};
	let q, Z;
	return { render: C, hydrate: q, createApp: nl(C, q) };
}
function Tn({ type: e, props: t }, n) {
	return (n === "svg" && e === "foreignObject") ||
		(n === "mathml" &&
			e === "annotation-xml" &&
			t &&
			t.encoding &&
			t.encoding.includes("html"))
		? void 0
		: n;
}
function nt({ effect: e, update: t }, n) {
	e.allowRecurse = t.allowRecurse = n;
}
function fl(e, t) {
	return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function io(e, t, n = !1) {
	const s = e.children,
		r = t.children;
	if (F(s) && F(r))
		for (let o = 0; o < s.length; o++) {
			const i = s[o];
			let u = r[o];
			u.shapeFlag & 1 &&
				!u.dynamicChildren &&
				((u.patchFlag <= 0 || u.patchFlag === 32) &&
					((u = r[o] = We(r[o])), (u.el = i.el)),
				n || io(i, u)),
				u.type === wn && (u.el = i.el);
		}
}
function al(e) {
	const t = e.slice(),
		n = [0];
	let s, r, o, i, u;
	const l = e.length;
	for (s = 0; s < l; s++) {
		const d = e[s];
		if (d !== 0) {
			if (((r = n[n.length - 1]), e[r] < d)) {
				(t[s] = r), n.push(s);
				continue;
			}
			for (o = 0, i = n.length - 1; o < i; )
				(u = (o + i) >> 1), e[n[u]] < d ? (o = u + 1) : (i = u);
			d < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
		}
	}
	for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
	return n;
}
function lo(e) {
	const t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : lo(t);
}
const dl = (e) => e.__isTeleport,
	Fe = Symbol.for("v-fgt"),
	wn = Symbol.for("v-txt"),
	Ut = Symbol.for("v-cmt"),
	sn = Symbol.for("v-stc"),
	$t = [];
let we = null;
function it(e = !1) {
	$t.push((we = e ? null : []));
}
function hl() {
	$t.pop(), (we = $t[$t.length - 1] || null);
}
let Vt = 1;
function Vs(e) {
	Vt += e;
}
function pl(e) {
	return (
		(e.dynamicChildren = Vt > 0 ? we || pt : null),
		hl(),
		Vt > 0 && we && we.push(e),
		e
	);
}
function lt(e, t, n, s, r, o) {
	return pl(R(e, t, n, s, r, o, !0));
}
function qn(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Ct(e, t) {
	return e.type === t.type && e.key === t.key;
}
const co = ({ key: e }) => e ?? null,
	rn = ({ ref: e, ref_key: t, ref_for: n }) => (
		typeof e == "number" && (e = "" + e),
		e != null
			? oe(e) || ge(e) || U(e)
				? { i: Ee, r: e, k: t, f: !!n }
				: e
			: null
	);
function R(
	e,
	t = null,
	n = null,
	s = 0,
	r = null,
	o = e === Fe ? 0 : 1,
	i = !1,
	u = !1
) {
	const l = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && co(t),
		ref: t && rn(t),
		scopeId: bn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: o,
		patchFlag: s,
		dynamicProps: r,
		dynamicChildren: null,
		appContext: null,
		ctx: Ee,
	};
	return (
		u
			? (gs(l, n), o & 128 && e.normalize(l))
			: n && (l.shapeFlag |= oe(n) ? 8 : 16),
		Vt > 0 &&
			!i &&
			we &&
			(l.patchFlag > 0 || o & 6) &&
			l.patchFlag !== 32 &&
			we.push(l),
		l
	);
}
const ae = gl;
function gl(e, t = null, n = null, s = 0, r = null, o = !1) {
	if (((!e || e === Ii) && (e = Ut), qn(e))) {
		const u = vt(e, t, !0);
		return (
			n && gs(u, n),
			Vt > 0 &&
				!o &&
				we &&
				(u.shapeFlag & 6 ? (we[we.indexOf(e)] = u) : we.push(u)),
			(u.patchFlag |= -2),
			u
		);
	}
	if ((Sl(e) && (e = e.__vccOpts), t)) {
		t = ml(t);
		let { class: u, style: l } = t;
		u && !oe(u) && (t.class = ss(u)),
			ee(l) && ($r(l) && !F(l) && (l = re({}, l)), (t.style = ns(l)));
	}
	const i = oe(e) ? 1 : Mi(e) ? 128 : dl(e) ? 64 : ee(e) ? 4 : U(e) ? 2 : 0;
	return R(e, t, n, s, r, i, o, !0);
}
function ml(e) {
	return e ? ($r(e) || eo(e) ? re({}, e) : e) : null;
}
function vt(e, t, n = !1, s = !1) {
	const { props: r, ref: o, patchFlag: i, children: u, transition: l } = e,
		d = t ? _l(r || {}, t) : r,
		a = {
			__v_isVNode: !0,
			__v_skip: !0,
			type: e.type,
			props: d,
			key: d && co(d),
			ref:
				t && t.ref
					? n && o
						? F(o)
							? o.concat(rn(t))
							: [o, rn(t)]
						: rn(t)
					: o,
			scopeId: e.scopeId,
			slotScopeIds: e.slotScopeIds,
			children: u,
			target: e.target,
			targetAnchor: e.targetAnchor,
			staticCount: e.staticCount,
			shapeFlag: e.shapeFlag,
			patchFlag: t && e.type !== Fe ? (i === -1 ? 16 : i | 16) : i,
			dynamicProps: e.dynamicProps,
			dynamicChildren: e.dynamicChildren,
			appContext: e.appContext,
			dirs: e.dirs,
			transition: l,
			component: e.component,
			suspense: e.suspense,
			ssContent: e.ssContent && vt(e.ssContent),
			ssFallback: e.ssFallback && vt(e.ssFallback),
			el: e.el,
			anchor: e.anchor,
			ctx: e.ctx,
			ce: e.ce,
		};
	return l && s && (a.transition = l.clone(a)), a;
}
function _t(e = " ", t = 0) {
	return ae(wn, null, e, t);
}
function uo(e, t) {
	const n = ae(sn, null, e);
	return (n.staticCount = t), n;
}
function Te(e) {
	return e == null || typeof e == "boolean"
		? ae(Ut)
		: F(e)
		? ae(Fe, null, e.slice())
		: typeof e == "object"
		? We(e)
		: ae(wn, null, String(e));
}
function We(e) {
	return (e.el === null && e.patchFlag !== -1) || e.memo ? e : vt(e);
}
function gs(e, t) {
	let n = 0;
	const { shapeFlag: s } = e;
	if (t == null) t = null;
	else if (F(t)) n = 16;
	else if (typeof t == "object")
		if (s & 65) {
			const r = t.default;
			r && (r._c && (r._d = !1), gs(e, r()), r._c && (r._d = !0));
			return;
		} else {
			n = 32;
			const r = t._;
			!r && !eo(t)
				? (t._ctx = Ee)
				: r === 3 &&
				  Ee &&
				  (Ee.slots._ === 1
						? (t._ = 1)
						: ((t._ = 2), (e.patchFlag |= 1024)));
		}
	else
		U(t)
			? ((t = { default: t, _ctx: Ee }), (n = 32))
			: ((t = String(t)), s & 64 ? ((n = 16), (t = [_t(t)])) : (n = 8));
	(e.children = t), (e.shapeFlag |= n);
}
function _l(...e) {
	const t = {};
	for (let n = 0; n < e.length; n++) {
		const s = e[n];
		for (const r in s)
			if (r === "class")
				t.class !== s.class && (t.class = ss([t.class, s.class]));
			else if (r === "style") t.style = ns([t.style, s.style]);
			else if (an(r)) {
				const o = t[r],
					i = s[r];
				i &&
					o !== i &&
					!(F(o) && o.includes(i)) &&
					(t[r] = o ? [].concat(o, i) : i);
			} else r !== "" && (t[r] = s[r]);
	}
	return t;
}
function Ie(e, t, n, s = null) {
	Re(e, t, 7, [n, s]);
}
const vl = Jr();
let bl = 0;
function yl(e, t, n) {
	const s = e.type,
		r = (t ? t.appContext : e.appContext) || vl,
		o = {
			uid: bl++,
			vnode: e,
			type: s,
			parent: t,
			appContext: r,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			scope: new Ko(!0),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: t ? t.provides : Object.create(r.provides),
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: no(s, r),
			emitsOptions: Kr(s, r),
			emit: null,
			emitted: null,
			propsDefaults: X,
			inheritAttrs: s.inheritAttrs,
			ctx: X,
			data: X,
			props: X,
			attrs: X,
			slots: X,
			refs: X,
			setupState: X,
			setupContext: null,
			attrsProxy: null,
			slotsProxy: null,
			suspense: n,
			suspenseId: n ? n.pendingId : 0,
			asyncDep: null,
			asyncResolved: !1,
			isMounted: !1,
			isUnmounted: !1,
			isDeactivated: !1,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null,
		};
	return (
		(o.ctx = { _: o }),
		(o.root = t ? t.root : o),
		(o.emit = Ei.bind(null, o)),
		e.ce && e.ce(o),
		o
	);
}
let ce = null,
	fn,
	Gn;
{
	const e = vr(),
		t = (n, s) => {
			let r;
			return (
				(r = e[n]) || (r = e[n] = []),
				r.push(s),
				(o) => {
					r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
				}
			);
		};
	(fn = t("__VUE_INSTANCE_SETTERS__", (n) => (ce = n))),
		(Gn = t("__VUE_SSR_SETTERS__", (n) => (Rn = n)));
}
const Wt = (e) => {
		const t = ce;
		return (
			fn(e),
			e.scope.on(),
			() => {
				e.scope.off(), fn(t);
			}
		);
	},
	Ds = () => {
		ce && ce.scope.off(), fn(null);
	};
function fo(e) {
	return e.vnode.shapeFlag & 4;
}
let Rn = !1;
function xl(e, t = !1) {
	t && Gn(t);
	const { props: n, children: s } = e.vnode,
		r = fo(e);
	sl(e, n, r, t), il(e, s);
	const o = r ? El(e, t) : void 0;
	return t && Gn(!1), o;
}
function El(e, t) {
	const n = e.type;
	(e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Qi));
	const { setup: s } = n;
	if (s) {
		const r = (e.setupContext = s.length > 1 ? Rl(e) : null),
			o = Wt(e);
		Je();
		const i = Qe(s, e, 0, [e.props, r]);
		if ((Xe(), o(), mr(i))) {
			if ((i.then(Ds, Ds), t))
				return i
					.then((u) => {
						Ks(e, u, t);
					})
					.catch((u) => {
						_n(u, e, 0);
					});
			e.asyncDep = i;
		} else Ks(e, i, t);
	} else ao(e, t);
}
function Ks(e, t, n) {
	U(t)
		? e.type.__ssrInlineRender
			? (e.ssrRender = t)
			: (e.render = t)
		: ee(t) && (e.setupState = Fr(t)),
		ao(e, n);
}
let ks;
function ao(e, t, n) {
	const s = e.type;
	if (!e.render) {
		if (!t && ks && !s.render) {
			const r = s.template || hs(e).template;
			if (r) {
				const { isCustomElement: o, compilerOptions: i } =
						e.appContext.config,
					{ delimiters: u, compilerOptions: l } = s,
					d = re(re({ isCustomElement: o, delimiters: u }, i), l);
				s.render = ks(r, d);
			}
		}
		e.render = s.render || ve;
	}
	{
		const r = Wt(e);
		Je();
		try {
			Yi(e);
		} finally {
			Xe(), r();
		}
	}
}
const wl = {
	get(e, t) {
		return pe(e, "get", ""), e[t];
	},
};
function Rl(e) {
	const t = (n) => {
		e.exposed = n || {};
	};
	return {
		attrs: new Proxy(e.attrs, wl),
		slots: e.slots,
		emit: e.emit,
		expose: t,
	};
}
function ms(e) {
	if (e.exposed)
		return (
			e.exposeProxy ||
			(e.exposeProxy = new Proxy(Fr(ai(e.exposed)), {
				get(t, n) {
					if (n in t) return t[n];
					if (n in Tt) return Tt[n](e);
				},
				has(t, n) {
					return n in t || n in Tt;
				},
			}))
		);
}
function Cl(e, t = !0) {
	return U(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Sl(e) {
	return U(e) && "__vccOpts" in e;
}
const xe = (e, t) => di(e, t, Rn);
function ho(e, t, n) {
	const s = arguments.length;
	return s === 2
		? ee(t) && !F(t)
			? qn(t)
				? ae(e, null, [t])
				: ae(e, t)
			: ae(e, null, t)
		: (s > 3
				? (n = Array.prototype.slice.call(arguments, 2))
				: s === 3 && qn(n) && (n = [n]),
		  ae(e, t, n));
}
const Pl = "3.4.27";
/**
 * @vue/runtime-dom v3.4.27
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Ol = "http://www.w3.org/2000/svg",
	Al = "http://www.w3.org/1998/Math/MathML",
	ze = typeof document < "u" ? document : null,
	Ws = ze && ze.createElement("template"),
	Il = {
		insert: (e, t, n) => {
			t.insertBefore(e, n || null);
		},
		remove: (e) => {
			const t = e.parentNode;
			t && t.removeChild(e);
		},
		createElement: (e, t, n, s) => {
			const r =
				t === "svg"
					? ze.createElementNS(Ol, e)
					: t === "mathml"
					? ze.createElementNS(Al, e)
					: ze.createElement(e, n ? { is: n } : void 0);
			return (
				e === "select" &&
					s &&
					s.multiple != null &&
					r.setAttribute("multiple", s.multiple),
				r
			);
		},
		createText: (e) => ze.createTextNode(e),
		createComment: (e) => ze.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t;
		},
		setElementText: (e, t) => {
			e.textContent = t;
		},
		parentNode: (e) => e.parentNode,
		nextSibling: (e) => e.nextSibling,
		querySelector: (e) => ze.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, "");
		},
		insertStaticContent(e, t, n, s, r, o) {
			const i = n ? n.previousSibling : t.lastChild;
			if (r && (r === o || r.nextSibling))
				for (
					;
					t.insertBefore(r.cloneNode(!0), n),
						!(r === o || !(r = r.nextSibling));

				);
			else {
				Ws.innerHTML =
					s === "svg"
						? `<svg>${e}</svg>`
						: s === "mathml"
						? `<math>${e}</math>`
						: e;
				const u = Ws.content;
				if (s === "svg" || s === "mathml") {
					const l = u.firstChild;
					for (; l.firstChild; ) u.appendChild(l.firstChild);
					u.removeChild(l);
				}
				t.insertBefore(u, n);
			}
			return [
				i ? i.nextSibling : t.firstChild,
				n ? n.previousSibling : t.lastChild,
			];
		},
	},
	Tl = Symbol("_vtc");
function Ml(e, t, n) {
	const s = e[Tl];
	s && (t = (t ? [t, ...s] : [...s]).join(" ")),
		t == null
			? e.removeAttribute("class")
			: n
			? e.setAttribute("class", t)
			: (e.className = t);
}
const zs = Symbol("_vod"),
	$l = Symbol("_vsh"),
	Ll = Symbol(""),
	Nl = /(^|;)\s*display\s*:/;
function jl(e, t, n) {
	const s = e.style,
		r = oe(n);
	let o = !1;
	if (n && !r) {
		if (t)
			if (oe(t))
				for (const i of t.split(";")) {
					const u = i.slice(0, i.indexOf(":")).trim();
					n[u] == null && on(s, u, "");
				}
			else for (const i in t) n[i] == null && on(s, i, "");
		for (const i in n) i === "display" && (o = !0), on(s, i, n[i]);
	} else if (r) {
		if (t !== n) {
			const i = s[Ll];
			i && (n += ";" + i), (s.cssText = n), (o = Nl.test(n));
		}
	} else t && e.removeAttribute("style");
	zs in e && ((e[zs] = o ? s.display : ""), e[$l] && (s.display = "none"));
}
const qs = /\s*!important$/;
function on(e, t, n) {
	if (F(n)) n.forEach((s) => on(e, t, s));
	else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
	else {
		const s = Fl(e, t);
		qs.test(n)
			? e.setProperty(xt(s), n.replace(qs, ""), "important")
			: (e[s] = n);
	}
}
const Gs = ["Webkit", "Moz", "ms"],
	Mn = {};
function Fl(e, t) {
	const n = Mn[t];
	if (n) return n;
	let s = Le(t);
	if (s !== "filter" && s in e) return (Mn[t] = s);
	s = pn(s);
	for (let r = 0; r < Gs.length; r++) {
		const o = Gs[r] + s;
		if (o in e) return (Mn[t] = o);
	}
	return t;
}
const Qs = "http://www.w3.org/1999/xlink";
function Hl(e, t, n, s, r) {
	if (s && t.startsWith("xlink:"))
		n == null
			? e.removeAttributeNS(Qs, t.slice(6, t.length))
			: e.setAttributeNS(Qs, t, n);
	else {
		const o = Do(t);
		n == null || (o && !br(n))
			? e.removeAttribute(t)
			: e.setAttribute(t, o ? "" : n);
	}
}
function Bl(e, t, n, s, r, o, i) {
	if (t === "innerHTML" || t === "textContent") {
		s && i(s, r, o), (e[t] = n ?? "");
		return;
	}
	const u = e.tagName;
	if (t === "value" && u !== "PROGRESS" && !u.includes("-")) {
		const d = u === "OPTION" ? e.getAttribute("value") || "" : e.value,
			a = n ?? "";
		(d !== a || !("_value" in e)) && (e.value = a),
			n == null && e.removeAttribute(t),
			(e._value = n);
		return;
	}
	let l = !1;
	if (n === "" || n == null) {
		const d = typeof e[t];
		d === "boolean"
			? (n = br(n))
			: n == null && d === "string"
			? ((n = ""), (l = !0))
			: d === "number" && ((n = 0), (l = !0));
	}
	try {
		e[t] = n;
	} catch {}
	l && e.removeAttribute(t);
}
function Ul(e, t, n, s) {
	e.addEventListener(t, n, s);
}
function Vl(e, t, n, s) {
	e.removeEventListener(t, n, s);
}
const Ys = Symbol("_vei");
function Dl(e, t, n, s, r = null) {
	const o = e[Ys] || (e[Ys] = {}),
		i = o[t];
	if (s && i) i.value = s;
	else {
		const [u, l] = Kl(t);
		if (s) {
			const d = (o[t] = zl(s, r));
			Ul(e, u, d, l);
		} else i && (Vl(e, u, i, l), (o[t] = void 0));
	}
}
const Js = /(?:Once|Passive|Capture)$/;
function Kl(e) {
	let t;
	if (Js.test(e)) {
		t = {};
		let s;
		for (; (s = e.match(Js)); )
			(e = e.slice(0, e.length - s[0].length)),
				(t[s[0].toLowerCase()] = !0);
	}
	return [e[2] === ":" ? e.slice(3) : xt(e.slice(2)), t];
}
let $n = 0;
const kl = Promise.resolve(),
	Wl = () => $n || (kl.then(() => ($n = 0)), ($n = Date.now()));
function zl(e, t) {
	const n = (s) => {
		if (!s._vts) s._vts = Date.now();
		else if (s._vts <= n.attached) return;
		Re(ql(s, n.value), t, 5, [s]);
	};
	return (n.value = e), (n.attached = Wl()), n;
}
function ql(e, t) {
	if (F(t)) {
		const n = e.stopImmediatePropagation;
		return (
			(e.stopImmediatePropagation = () => {
				n.call(e), (e._stopped = !0);
			}),
			t.map((s) => (r) => !r._stopped && s && s(r))
		);
	} else return t;
}
const Xs = (e) =>
		e.charCodeAt(0) === 111 &&
		e.charCodeAt(1) === 110 &&
		e.charCodeAt(2) > 96 &&
		e.charCodeAt(2) < 123,
	Gl = (e, t, n, s, r, o, i, u, l) => {
		const d = r === "svg";
		t === "class"
			? Ml(e, s, d)
			: t === "style"
			? jl(e, n, s)
			: an(t)
			? Zn(t) || Dl(e, t, n, s, i)
			: (
					t[0] === "."
						? ((t = t.slice(1)), !0)
						: t[0] === "^"
						? ((t = t.slice(1)), !1)
						: Ql(e, t, s, d)
			  )
			? Bl(e, t, s, o, i, u, l)
			: (t === "true-value"
					? (e._trueValue = s)
					: t === "false-value" && (e._falseValue = s),
			  Hl(e, t, s, d));
	};
function Ql(e, t, n, s) {
	if (s)
		return !!(
			t === "innerHTML" ||
			t === "textContent" ||
			(t in e && Xs(t) && U(n))
		);
	if (
		t === "spellcheck" ||
		t === "draggable" ||
		t === "translate" ||
		t === "form" ||
		(t === "list" && e.tagName === "INPUT") ||
		(t === "type" && e.tagName === "TEXTAREA")
	)
		return !1;
	if (t === "width" || t === "height") {
		const r = e.tagName;
		if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
			return !1;
	}
	return Xs(t) && oe(n) ? !1 : t in e;
}
const Yl = re({ patchProp: Gl }, Il);
let Zs;
function Jl() {
	return Zs || (Zs = cl(Yl));
}
const Xl = (...e) => {
	const t = Jl().createApp(...e),
		{ mount: n } = t;
	return (
		(t.mount = (s) => {
			const r = ec(s);
			if (!r) return;
			const o = t._component;
			!U(o) && !o.render && !o.template && (o.template = r.innerHTML),
				(r.innerHTML = "");
			const i = n(r, !1, Zl(r));
			return (
				r instanceof Element &&
					(r.removeAttribute("v-cloak"),
					r.setAttribute("data-v-app", "")),
				i
			);
		}),
		t
	);
};
function Zl(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement)
		return "mathml";
}
function ec(e) {
	return oe(e) ? document.querySelector(e) : e;
}
const Et = (e, t) => {
		const n = e.__vccOpts || e;
		for (const [s, r] of t) n[s] = r;
		return n;
	},
	tc = {},
	nc = (e) => (yn("data-v-360a9459"), (e = e()), xn(), e),
	sc = nc(() =>
		R(
			"div",
			{ id: "H1" },
			[R("h1", { textContent: "流星雨的blog" }), R("hr")],
			-1
		)
	),
	rc = [sc];
function oc(e, t) {
	return it(), lt("div", null, rc);
}
const ic = Et(tc, [
		["render", oc],
		["__scopeId", "data-v-360a9459"],
	]),
	lc = { id: "whole" },
	cc = uo(
		'<h1 data-v-257e97e5>目前为止，我的学习路线</h1><div class="txt" data-v-257e97e5><p data-v-257e97e5>         <i data-v-257e97e5>前言：本人从2023年暑假前的一两个星期开始踏入编程的世界，到现在为止将满一年。 从C语言到C++、python再到如今的java、sql、html、css、js。除了使用得较多的C++、 java和现在的前端三件套。其他都不过是学完就忘得不剩多少了。哦，对了，还有用来记笔记的 markdown。语言不过是实现功能的工具而已。看见自己尝试学会的那么多语言， 我只是感慨，这一路还是变化挺大的。在此记录一下， 以供参考。 </i><br data-v-257e97e5><h3 data-v-257e97e5>开始的兴奋</h3>         我选择计算机方向，很大的原因就是感觉计算机方向 有着无限的可能。当时的我以为，编程，可以让我做到一切我想做的事。虽然，现在的我感慨于计算机 体系结构之庞大，分支之繁杂，知识之丰富，进步之快速，面对这样的学科，恐怕得需要个一二十年才能做到 随心所欲，当然这还是在自己每天保持学习而不受其他因素影响的前提下。但即便是如此，也只能在软件层面 做个自由的程序猿。然而，如果考虑到硬件，那么这恐怕还需再加一倍。 <br data-v-257e97e5><br data-v-257e97e5><i data-v-257e97e5>        这里话还是扯远了，这说明此时不宜写作，写出来的东西无法直视。下面还是舍弃麻烦的抒情，直接客观叙述吧。 </i><br data-v-257e97e5><br data-v-257e97e5>         暑假，时间比较充足，入门呢，也是不紧不慢，先是在b站找了几个说学习路线的视频， 然后糊里糊涂的选择了从C语言入门。具体原因我确实想不起来了，也没有什么特别深刻的初心。或许只是因为， 大一要学C吧。<br data-v-257e97e5> 确定了语言之后，就可以找视频看了，当时自己幸运的找到了一个前微软程序员博主， Micro Frank，的教程。在学C语言的同时，同时进行了计算机基础知识的扫盲。至于为什么听他的，首先， C语言的课本来就不是很多，其次，当时心态确实放松，听他边讲边骂边闲扯很有意思，于是就选择听下去了。 <br data-v-257e97e5>         编译工具从Visual Studio开始。优点就是上述无脑操作，缺点就是容易出bug。我选这个纯粹是因为Micro Frank 的视频教程里面有关于Visual Studio的使用，有学习资料，自然要学这个。 <br data-v-257e97e5>         后面听一听被吹爆的CS50课程，听了几节，然后就开学了。 <br data-v-257e97e5>         开学之后先是拿着C Primer Plus啃，啃了一个星期，也就那么一点。后面就各种社团的考核。 在考核的促进下，3天，入手了C++，学习了typora和Markdown，甚至接触了虚拟机和Linux。 后来又是培训里面自学了python。到这里就是激情结束的地方。 <br data-v-257e97e5><h3 data-v-257e97e5>兴奋结束</h3>         因为后来为数竞的准备和课程的考试所累，然后慢慢的前面的很多都忘了。 后来又要去搞数据结构和算法准备acm校赛，所以除了C和C++，其他的知识只剩下笔记了。 <br data-v-257e97e5><h3 data-v-257e97e5>确定方向</h3>         最后肯定是什么都没有做好，绩点也没有，综测也没有，到了寒假，又要练车，又要过年，也就玩了玩 python的爬虫，整体上来说，整个寒假进步不大。 <br data-v-257e97e5>         寒假最后实在是无法忍受了。提前几天来学校，专门刷题学算法。这里，我推荐leetcode。 <br data-v-257e97e5>         有需求就有市场，广大就业人群中很多程序员的算法都不是那么优秀，正因如此， 他们迫切的需要算法水平的提升来通过大厂的笔试。这样的需求催生出了各种优质的、公共的讲师开启了自己的教程。他们用形象的图像讲解， 配上细致入微的代码，把大家当作学员，真正的力图为广大从业者讲清楚每道题目所使用的算法。 在有利可图的前提下，他们的课程往往是易于吸收的，言之有物的，生动有趣的。 <br data-v-257e97e5>         至于博主推荐，我只推荐代码随想录，这是一个真正的把算法讲得细致入微，生动有趣，易于吸收的人。 其实leetcode随便一道题目，下面就有很多优质的题解。很多时候，仅仅是官方的题解，就足够让人理解解题思路了。 至于acm，本人能力不足，无法提出建议。 <br data-v-257e97e5>         本人后来在众多就业方向中选择后端开发。 <h3 data-v-257e97e5>后端学习路线</h3>         首先，是javase，也就是java这门语言的学习。这个我是先看了廖雪峰的博客，学的差不多了， 就可以直接将刷算法题的语言从C++切换为Java。然后我看的是尚硅谷的康师傅的课程，比较细， 但我觉得太细了反而不太好，事实上，我主要看中的是尚硅谷关于idea的讲解，这对于后面学习他们的 技术框架的视频至关重要。在学java上，我还是觉得视频讲的太慢了。 <br data-v-257e97e5>         然后，去学习javaweb。最后学完一整套下来，其实很全面了。但是不够细致，就像我现在开发网站一样。 理想状态下，应该先去学mysql的基础入门，然后学习jdbc，接着才是javaweb，因为前面二者是javaweb 中实现数据库控制的工具类的基础知识，但是由于尚硅谷直接给我封装好了，我直接可以用，所以即便是跳过这两个， 也学得了他们的javaweb，但这不意味着可以不学了。只是说，优先级没有那么高而已。而我还是不推荐像我一样的。 第一，我是自己太心急了。第二，不知道工具类的实现，不利于后面自己解决各种bug。第三，我只能使用尚硅谷写的 工具类的接口，但是要是遇到新的场景，需要我自己开发，那就写不了。 <br data-v-257e97e5>         现在，本人在学习项目部署。分为静态网站部署和服务器部署两大步。 这就是我经历的学习路线和自己的感受与见解。 </p></div>',
		2
	),
	uc = [cc],
	fc = {
		__name: "LearningPath",
		setup(e) {
			return (t, n) => (it(), lt("div", lc, uc));
		},
	},
	ac = Et(fc, [["__scopeId", "data-v-257e97e5"]]);
/*!
 * vue-router v4.3.2
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */ const dt = typeof document < "u";
function dc(e) {
	return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const G = Object.assign;
function Ln(e, t) {
	const n = {};
	for (const s in t) {
		const r = t[s];
		n[s] = Ce(r) ? r.map(e) : e(r);
	}
	return n;
}
const Lt = () => {},
	Ce = Array.isArray,
	po = /#/g,
	hc = /&/g,
	pc = /\//g,
	gc = /=/g,
	mc = /\?/g,
	go = /\+/g,
	_c = /%5B/g,
	vc = /%5D/g,
	mo = /%5E/g,
	bc = /%60/g,
	_o = /%7B/g,
	yc = /%7C/g,
	vo = /%7D/g,
	xc = /%20/g;
function _s(e) {
	return encodeURI("" + e)
		.replace(yc, "|")
		.replace(_c, "[")
		.replace(vc, "]");
}
function Ec(e) {
	return _s(e).replace(_o, "{").replace(vo, "}").replace(mo, "^");
}
function Qn(e) {
	return _s(e)
		.replace(go, "%2B")
		.replace(xc, "+")
		.replace(po, "%23")
		.replace(hc, "%26")
		.replace(bc, "`")
		.replace(_o, "{")
		.replace(vo, "}")
		.replace(mo, "^");
}
function wc(e) {
	return Qn(e).replace(gc, "%3D");
}
function Rc(e) {
	return _s(e).replace(po, "%23").replace(mc, "%3F");
}
function Cc(e) {
	return e == null ? "" : Rc(e).replace(pc, "%2F");
}
function Dt(e) {
	try {
		return decodeURIComponent("" + e);
	} catch {}
	return "" + e;
}
const Sc = /\/$/,
	Pc = (e) => e.replace(Sc, "");
function Nn(e, t, n = "/") {
	let s,
		r = {},
		o = "",
		i = "";
	const u = t.indexOf("#");
	let l = t.indexOf("?");
	return (
		u < l && u >= 0 && (l = -1),
		l > -1 &&
			((s = t.slice(0, l)),
			(o = t.slice(l + 1, u > -1 ? u : t.length)),
			(r = e(o))),
		u > -1 && ((s = s || t.slice(0, u)), (i = t.slice(u, t.length))),
		(s = Tc(s ?? t, n)),
		{ fullPath: s + (o && "?") + o + i, path: s, query: r, hash: Dt(i) }
	);
}
function Oc(e, t) {
	const n = t.query ? e(t.query) : "";
	return t.path + (n && "?") + n + (t.hash || "");
}
function er(e, t) {
	return !t || !e.toLowerCase().startsWith(t.toLowerCase())
		? e
		: e.slice(t.length) || "/";
}
function Ac(e, t, n) {
	const s = t.matched.length - 1,
		r = n.matched.length - 1;
	return (
		s > -1 &&
		s === r &&
		bt(t.matched[s], n.matched[r]) &&
		bo(t.params, n.params) &&
		e(t.query) === e(n.query) &&
		t.hash === n.hash
	);
}
function bt(e, t) {
	return (e.aliasOf || e) === (t.aliasOf || t);
}
function bo(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (const n in e) if (!Ic(e[n], t[n])) return !1;
	return !0;
}
function Ic(e, t) {
	return Ce(e) ? tr(e, t) : Ce(t) ? tr(t, e) : e === t;
}
function tr(e, t) {
	return Ce(t)
		? e.length === t.length && e.every((n, s) => n === t[s])
		: e.length === 1 && e[0] === t;
}
function Tc(e, t) {
	if (e.startsWith("/")) return e;
	if (!e) return t;
	const n = t.split("/"),
		s = e.split("/"),
		r = s[s.length - 1];
	(r === ".." || r === ".") && s.push("");
	let o = n.length - 1,
		i,
		u;
	for (i = 0; i < s.length; i++)
		if (((u = s[i]), u !== "."))
			if (u === "..") o > 1 && o--;
			else break;
	return n.slice(0, o).join("/") + "/" + s.slice(i).join("/");
}
var Kt;
(function (e) {
	(e.pop = "pop"), (e.push = "push");
})(Kt || (Kt = {}));
var Nt;
(function (e) {
	(e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Nt || (Nt = {}));
function Mc(e) {
	if (!e)
		if (dt) {
			const t = document.querySelector("base");
			(e = (t && t.getAttribute("href")) || "/"),
				(e = e.replace(/^\w+:\/\/[^\/]+/, ""));
		} else e = "/";
	return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Pc(e);
}
const $c = /^[^#]+#/;
function Lc(e, t) {
	return e.replace($c, "#") + t;
}
function Nc(e, t) {
	const n = document.documentElement.getBoundingClientRect(),
		s = e.getBoundingClientRect();
	return {
		behavior: t.behavior,
		left: s.left - n.left - (t.left || 0),
		top: s.top - n.top - (t.top || 0),
	};
}
const Cn = () => ({ left: window.scrollX, top: window.scrollY });
function jc(e) {
	let t;
	if ("el" in e) {
		const n = e.el,
			s = typeof n == "string" && n.startsWith("#"),
			r =
				typeof n == "string"
					? s
						? document.getElementById(n.slice(1))
						: document.querySelector(n)
					: n;
		if (!r) return;
		t = Nc(r, e);
	} else t = e;
	"scrollBehavior" in document.documentElement.style
		? window.scrollTo(t)
		: window.scrollTo(
				t.left != null ? t.left : window.scrollX,
				t.top != null ? t.top : window.scrollY
		  );
}
function nr(e, t) {
	return (history.state ? history.state.position - t : -1) + e;
}
const Yn = new Map();
function Fc(e, t) {
	Yn.set(e, t);
}
function Hc(e) {
	const t = Yn.get(e);
	return Yn.delete(e), t;
}
let Bc = () => location.protocol + "//" + location.host;
function yo(e, t) {
	const { pathname: n, search: s, hash: r } = t,
		o = e.indexOf("#");
	if (o > -1) {
		let u = r.includes(e.slice(o)) ? e.slice(o).length : 1,
			l = r.slice(u);
		return l[0] !== "/" && (l = "/" + l), er(l, "");
	}
	return er(n, e) + s + r;
}
function Uc(e, t, n, s) {
	let r = [],
		o = [],
		i = null;
	const u = ({ state: p }) => {
		const b = yo(e, location),
			A = n.value,
			N = t.value;
		let V = 0;
		if (p) {
			if (((n.value = b), (t.value = p), i && i === A)) {
				i = null;
				return;
			}
			V = N ? p.position - N.position : 0;
		} else s(b);
		r.forEach((M) => {
			M(n.value, A, {
				delta: V,
				type: Kt.pop,
				direction: V ? (V > 0 ? Nt.forward : Nt.back) : Nt.unknown,
			});
		});
	};
	function l() {
		i = n.value;
	}
	function d(p) {
		r.push(p);
		const b = () => {
			const A = r.indexOf(p);
			A > -1 && r.splice(A, 1);
		};
		return o.push(b), b;
	}
	function a() {
		const { history: p } = window;
		p.state && p.replaceState(G({}, p.state, { scroll: Cn() }), "");
	}
	function h() {
		for (const p of o) p();
		(o = []),
			window.removeEventListener("popstate", u),
			window.removeEventListener("beforeunload", a);
	}
	return (
		window.addEventListener("popstate", u),
		window.addEventListener("beforeunload", a, { passive: !0 }),
		{ pauseListeners: l, listen: d, destroy: h }
	);
}
function sr(e, t, n, s = !1, r = !1) {
	return {
		back: e,
		current: t,
		forward: n,
		replaced: s,
		position: window.history.length,
		scroll: r ? Cn() : null,
	};
}
function Vc(e) {
	const { history: t, location: n } = window,
		s = { value: yo(e, n) },
		r = { value: t.state };
	r.value ||
		o(
			s.value,
			{
				back: null,
				current: s.value,
				forward: null,
				position: t.length - 1,
				replaced: !0,
				scroll: null,
			},
			!0
		);
	function o(l, d, a) {
		const h = e.indexOf("#"),
			p =
				h > -1
					? (n.host && document.querySelector("base")
							? e
							: e.slice(h)) + l
					: Bc() + e + l;
		try {
			t[a ? "replaceState" : "pushState"](d, "", p), (r.value = d);
		} catch (b) {
			console.error(b), n[a ? "replace" : "assign"](p);
		}
	}
	function i(l, d) {
		const a = G({}, t.state, sr(r.value.back, l, r.value.forward, !0), d, {
			position: r.value.position,
		});
		o(l, a, !0), (s.value = l);
	}
	function u(l, d) {
		const a = G({}, r.value, t.state, { forward: l, scroll: Cn() });
		o(a.current, a, !0);
		const h = G({}, sr(s.value, l, null), { position: a.position + 1 }, d);
		o(l, h, !1), (s.value = l);
	}
	return { location: s, state: r, push: u, replace: i };
}
function Dc(e) {
	e = Mc(e);
	const t = Vc(e),
		n = Uc(e, t.state, t.location, t.replace);
	function s(o, i = !0) {
		i || n.pauseListeners(), history.go(o);
	}
	const r = G(
		{ location: "", base: e, go: s, createHref: Lc.bind(null, e) },
		t,
		n
	);
	return (
		Object.defineProperty(r, "location", {
			enumerable: !0,
			get: () => t.location.value,
		}),
		Object.defineProperty(r, "state", {
			enumerable: !0,
			get: () => t.state.value,
		}),
		r
	);
}
function Kc(e) {
	return (
		(e = location.host ? e || location.pathname + location.search : ""),
		e.includes("#") || (e += "#"),
		Dc(e)
	);
}
function kc(e) {
	return typeof e == "string" || (e && typeof e == "object");
}
function xo(e) {
	return typeof e == "string" || typeof e == "symbol";
}
const Ke = {
		path: "/",
		name: void 0,
		params: {},
		query: {},
		hash: "",
		fullPath: "/",
		matched: [],
		meta: {},
		redirectedFrom: void 0,
	},
	Eo = Symbol("");
var rr;
(function (e) {
	(e[(e.aborted = 4)] = "aborted"),
		(e[(e.cancelled = 8)] = "cancelled"),
		(e[(e.duplicated = 16)] = "duplicated");
})(rr || (rr = {}));
function yt(e, t) {
	return G(new Error(), { type: e, [Eo]: !0 }, t);
}
function je(e, t) {
	return e instanceof Error && Eo in e && (t == null || !!(e.type & t));
}
const or = "[^/]+?",
	Wc = { sensitive: !1, strict: !1, start: !0, end: !0 },
	zc = /[.+*?^${}()[\]/\\]/g;
function qc(e, t) {
	const n = G({}, Wc, t),
		s = [];
	let r = n.start ? "^" : "";
	const o = [];
	for (const d of e) {
		const a = d.length ? [] : [90];
		n.strict && !d.length && (r += "/");
		for (let h = 0; h < d.length; h++) {
			const p = d[h];
			let b = 40 + (n.sensitive ? 0.25 : 0);
			if (p.type === 0)
				h || (r += "/"), (r += p.value.replace(zc, "\\$&")), (b += 40);
			else if (p.type === 1) {
				const { value: A, repeatable: N, optional: V, regexp: M } = p;
				o.push({ name: A, repeatable: N, optional: V });
				const $ = M || or;
				if ($ !== or) {
					b += 10;
					try {
						new RegExp(`(${$})`);
					} catch (k) {
						throw new Error(
							`Invalid custom RegExp for param "${A}" (${$}): ` +
								k.message
						);
					}
				}
				let H = N ? `((?:${$})(?:/(?:${$}))*)` : `(${$})`;
				h || (H = V && d.length < 2 ? `(?:/${H})` : "/" + H),
					V && (H += "?"),
					(r += H),
					(b += 20),
					V && (b += -8),
					N && (b += -20),
					$ === ".*" && (b += -50);
			}
			a.push(b);
		}
		s.push(a);
	}
	if (n.strict && n.end) {
		const d = s.length - 1;
		s[d][s[d].length - 1] += 0.7000000000000001;
	}
	n.strict || (r += "/?"), n.end ? (r += "$") : n.strict && (r += "(?:/|$)");
	const i = new RegExp(r, n.sensitive ? "" : "i");
	function u(d) {
		const a = d.match(i),
			h = {};
		if (!a) return null;
		for (let p = 1; p < a.length; p++) {
			const b = a[p] || "",
				A = o[p - 1];
			h[A.name] = b && A.repeatable ? b.split("/") : b;
		}
		return h;
	}
	function l(d) {
		let a = "",
			h = !1;
		for (const p of e) {
			(!h || !a.endsWith("/")) && (a += "/"), (h = !1);
			for (const b of p)
				if (b.type === 0) a += b.value;
				else if (b.type === 1) {
					const { value: A, repeatable: N, optional: V } = b,
						M = A in d ? d[A] : "";
					if (Ce(M) && !N)
						throw new Error(
							`Provided param "${A}" is an array but it is not repeatable (* or + modifiers)`
						);
					const $ = Ce(M) ? M.join("/") : M;
					if (!$)
						if (V)
							p.length < 2 &&
								(a.endsWith("/")
									? (a = a.slice(0, -1))
									: (h = !0));
						else throw new Error(`Missing required param "${A}"`);
					a += $;
				}
		}
		return a || "/";
	}
	return { re: i, score: s, keys: o, parse: u, stringify: l };
}
function Gc(e, t) {
	let n = 0;
	for (; n < e.length && n < t.length; ) {
		const s = t[n] - e[n];
		if (s) return s;
		n++;
	}
	return e.length < t.length
		? e.length === 1 && e[0] === 80
			? -1
			: 1
		: e.length > t.length
		? t.length === 1 && t[0] === 80
			? 1
			: -1
		: 0;
}
function Qc(e, t) {
	let n = 0;
	const s = e.score,
		r = t.score;
	for (; n < s.length && n < r.length; ) {
		const o = Gc(s[n], r[n]);
		if (o) return o;
		n++;
	}
	if (Math.abs(r.length - s.length) === 1) {
		if (ir(s)) return 1;
		if (ir(r)) return -1;
	}
	return r.length - s.length;
}
function ir(e) {
	const t = e[e.length - 1];
	return e.length > 0 && t[t.length - 1] < 0;
}
const Yc = { type: 0, value: "" },
	Jc = /[a-zA-Z0-9_]/;
function Xc(e) {
	if (!e) return [[]];
	if (e === "/") return [[Yc]];
	if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
	function t(b) {
		throw new Error(`ERR (${n})/"${d}": ${b}`);
	}
	let n = 0,
		s = n;
	const r = [];
	let o;
	function i() {
		o && r.push(o), (o = []);
	}
	let u = 0,
		l,
		d = "",
		a = "";
	function h() {
		d &&
			(n === 0
				? o.push({ type: 0, value: d })
				: n === 1 || n === 2 || n === 3
				? (o.length > 1 &&
						(l === "*" || l === "+") &&
						t(
							`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`
						),
				  o.push({
						type: 1,
						value: d,
						regexp: a,
						repeatable: l === "*" || l === "+",
						optional: l === "*" || l === "?",
				  }))
				: t("Invalid state to consume buffer"),
			(d = ""));
	}
	function p() {
		d += l;
	}
	for (; u < e.length; ) {
		if (((l = e[u++]), l === "\\" && n !== 2)) {
			(s = n), (n = 4);
			continue;
		}
		switch (n) {
			case 0:
				l === "/" ? (d && h(), i()) : l === ":" ? (h(), (n = 1)) : p();
				break;
			case 4:
				p(), (n = s);
				break;
			case 1:
				l === "("
					? (n = 2)
					: Jc.test(l)
					? p()
					: (h(),
					  (n = 0),
					  l !== "*" && l !== "?" && l !== "+" && u--);
				break;
			case 2:
				l === ")"
					? a[a.length - 1] == "\\"
						? (a = a.slice(0, -1) + l)
						: (n = 3)
					: (a += l);
				break;
			case 3:
				h(),
					(n = 0),
					l !== "*" && l !== "?" && l !== "+" && u--,
					(a = "");
				break;
			default:
				t("Unknown state");
				break;
		}
	}
	return (
		n === 2 && t(`Unfinished custom RegExp for param "${d}"`), h(), i(), r
	);
}
function Zc(e, t, n) {
	const s = qc(Xc(e.path), n),
		r = G(s, { record: e, parent: t, children: [], alias: [] });
	return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function eu(e, t) {
	const n = [],
		s = new Map();
	t = ur({ strict: !1, end: !0, sensitive: !1 }, t);
	function r(a) {
		return s.get(a);
	}
	function o(a, h, p) {
		const b = !p,
			A = tu(a);
		A.aliasOf = p && p.record;
		const N = ur(t, a),
			V = [A];
		if ("alias" in a) {
			const H = typeof a.alias == "string" ? [a.alias] : a.alias;
			for (const k of H)
				V.push(
					G({}, A, {
						components: p ? p.record.components : A.components,
						path: k,
						aliasOf: p ? p.record : A,
					})
				);
		}
		let M, $;
		for (const H of V) {
			const { path: k } = H;
			if (h && k[0] !== "/") {
				const te = h.record.path,
					B = te[te.length - 1] === "/" ? "" : "/";
				H.path = h.record.path + (k && B + k);
			}
			if (
				((M = Zc(H, h, N)),
				p
					? p.alias.push(M)
					: (($ = $ || M),
					  $ !== M && $.alias.push(M),
					  b && a.name && !cr(M) && i(a.name)),
				A.children)
			) {
				const te = A.children;
				for (let B = 0; B < te.length; B++)
					o(te[B], M, p && p.children[B]);
			}
			(p = p || M),
				((M.record.components &&
					Object.keys(M.record.components).length) ||
					M.record.name ||
					M.record.redirect) &&
					l(M);
		}
		return $
			? () => {
					i($);
			  }
			: Lt;
	}
	function i(a) {
		if (xo(a)) {
			const h = s.get(a);
			h &&
				(s.delete(a),
				n.splice(n.indexOf(h), 1),
				h.children.forEach(i),
				h.alias.forEach(i));
		} else {
			const h = n.indexOf(a);
			h > -1 &&
				(n.splice(h, 1),
				a.record.name && s.delete(a.record.name),
				a.children.forEach(i),
				a.alias.forEach(i));
		}
	}
	function u() {
		return n;
	}
	function l(a) {
		let h = 0;
		for (
			;
			h < n.length &&
			Qc(a, n[h]) >= 0 &&
			(a.record.path !== n[h].record.path || !wo(a, n[h]));

		)
			h++;
		n.splice(h, 0, a), a.record.name && !cr(a) && s.set(a.record.name, a);
	}
	function d(a, h) {
		let p,
			b = {},
			A,
			N;
		if ("name" in a && a.name) {
			if (((p = s.get(a.name)), !p)) throw yt(1, { location: a });
			(N = p.record.name),
				(b = G(
					lr(
						h.params,
						p.keys
							.filter(($) => !$.optional)
							.concat(
								p.parent
									? p.parent.keys.filter(($) => $.optional)
									: []
							)
							.map(($) => $.name)
					),
					a.params &&
						lr(
							a.params,
							p.keys.map(($) => $.name)
						)
				)),
				(A = p.stringify(b));
		} else if (a.path != null)
			(A = a.path),
				(p = n.find(($) => $.re.test(A))),
				p && ((b = p.parse(A)), (N = p.record.name));
		else {
			if (
				((p = h.name
					? s.get(h.name)
					: n.find(($) => $.re.test(h.path))),
				!p)
			)
				throw yt(1, { location: a, currentLocation: h });
			(N = p.record.name),
				(b = G({}, h.params, a.params)),
				(A = p.stringify(b));
		}
		const V = [];
		let M = p;
		for (; M; ) V.unshift(M.record), (M = M.parent);
		return { name: N, path: A, params: b, matched: V, meta: su(V) };
	}
	return (
		e.forEach((a) => o(a)),
		{
			addRoute: o,
			resolve: d,
			removeRoute: i,
			getRoutes: u,
			getRecordMatcher: r,
		}
	);
}
function lr(e, t) {
	const n = {};
	for (const s of t) s in e && (n[s] = e[s]);
	return n;
}
function tu(e) {
	return {
		path: e.path,
		redirect: e.redirect,
		name: e.name,
		meta: e.meta || {},
		aliasOf: void 0,
		beforeEnter: e.beforeEnter,
		props: nu(e),
		children: e.children || [],
		instances: {},
		leaveGuards: new Set(),
		updateGuards: new Set(),
		enterCallbacks: {},
		components:
			"components" in e
				? e.components || null
				: e.component && { default: e.component },
	};
}
function nu(e) {
	const t = {},
		n = e.props || !1;
	if ("component" in e) t.default = n;
	else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
	return t;
}
function cr(e) {
	for (; e; ) {
		if (e.record.aliasOf) return !0;
		e = e.parent;
	}
	return !1;
}
function su(e) {
	return e.reduce((t, n) => G(t, n.meta), {});
}
function ur(e, t) {
	const n = {};
	for (const s in e) n[s] = s in t ? t[s] : e[s];
	return n;
}
function wo(e, t) {
	return t.children.some((n) => n === e || wo(e, n));
}
function ru(e) {
	const t = {};
	if (e === "" || e === "?") return t;
	const s = (e[0] === "?" ? e.slice(1) : e).split("&");
	for (let r = 0; r < s.length; ++r) {
		const o = s[r].replace(go, " "),
			i = o.indexOf("="),
			u = Dt(i < 0 ? o : o.slice(0, i)),
			l = i < 0 ? null : Dt(o.slice(i + 1));
		if (u in t) {
			let d = t[u];
			Ce(d) || (d = t[u] = [d]), d.push(l);
		} else t[u] = l;
	}
	return t;
}
function fr(e) {
	let t = "";
	for (let n in e) {
		const s = e[n];
		if (((n = wc(n)), s == null)) {
			s !== void 0 && (t += (t.length ? "&" : "") + n);
			continue;
		}
		(Ce(s) ? s.map((o) => o && Qn(o)) : [s && Qn(s)]).forEach((o) => {
			o !== void 0 &&
				((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o));
		});
	}
	return t;
}
function ou(e) {
	const t = {};
	for (const n in e) {
		const s = e[n];
		s !== void 0 &&
			(t[n] = Ce(s)
				? s.map((r) => (r == null ? null : "" + r))
				: s == null
				? s
				: "" + s);
	}
	return t;
}
const iu = Symbol(""),
	ar = Symbol(""),
	Sn = Symbol(""),
	Ro = Symbol(""),
	Jn = Symbol("");
function St() {
	let e = [];
	function t(s) {
		return (
			e.push(s),
			() => {
				const r = e.indexOf(s);
				r > -1 && e.splice(r, 1);
			}
		);
	}
	function n() {
		e = [];
	}
	return { add: t, list: () => e.slice(), reset: n };
}
function qe(e, t, n, s, r, o = (i) => i()) {
	const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
	return () =>
		new Promise((u, l) => {
			const d = (p) => {
					p === !1
						? l(yt(4, { from: n, to: t }))
						: p instanceof Error
						? l(p)
						: kc(p)
						? l(yt(2, { from: t, to: p }))
						: (i &&
								s.enterCallbacks[r] === i &&
								typeof p == "function" &&
								i.push(p),
						  u());
				},
				a = o(() => e.call(s && s.instances[r], t, n, d));
			let h = Promise.resolve(a);
			e.length < 3 && (h = h.then(d)), h.catch((p) => l(p));
		});
}
function jn(e, t, n, s, r = (o) => o()) {
	const o = [];
	for (const i of e)
		for (const u in i.components) {
			let l = i.components[u];
			if (!(t !== "beforeRouteEnter" && !i.instances[u]))
				if (lu(l)) {
					const a = (l.__vccOpts || l)[t];
					a && o.push(qe(a, n, s, i, u, r));
				} else {
					let d = l();
					o.push(() =>
						d.then((a) => {
							if (!a)
								return Promise.reject(
									new Error(
										`Couldn't resolve component "${u}" at "${i.path}"`
									)
								);
							const h = dc(a) ? a.default : a;
							i.components[u] = h;
							const b = (h.__vccOpts || h)[t];
							return b && qe(b, n, s, i, u, r)();
						})
					);
				}
		}
	return o;
}
function lu(e) {
	return (
		typeof e == "object" ||
		"displayName" in e ||
		"props" in e ||
		"__vccOpts" in e
	);
}
function dr(e) {
	const t = $e(Sn),
		n = $e(Ro),
		s = xe(() => {
			const l = gt(e.to);
			return t.resolve(l);
		}),
		r = xe(() => {
			const { matched: l } = s.value,
				{ length: d } = l,
				a = l[d - 1],
				h = n.matched;
			if (!a || !h.length) return -1;
			const p = h.findIndex(bt.bind(null, a));
			if (p > -1) return p;
			const b = hr(l[d - 2]);
			return d > 1 && hr(a) === b && h[h.length - 1].path !== b
				? h.findIndex(bt.bind(null, l[d - 2]))
				: p;
		}),
		o = xe(() => r.value > -1 && au(n.params, s.value.params)),
		i = xe(
			() =>
				r.value > -1 &&
				r.value === n.matched.length - 1 &&
				bo(n.params, s.value.params)
		);
	function u(l = {}) {
		return fu(l)
			? t[gt(e.replace) ? "replace" : "push"](gt(e.to)).catch(Lt)
			: Promise.resolve();
	}
	return {
		route: s,
		href: xe(() => s.value.href),
		isActive: o,
		isExactActive: i,
		navigate: u,
	};
}
const cu = zr({
		name: "RouterLink",
		compatConfig: { MODE: 3 },
		props: {
			to: { type: [String, Object], required: !0 },
			replace: Boolean,
			activeClass: String,
			exactActiveClass: String,
			custom: Boolean,
			ariaCurrentValue: { type: String, default: "page" },
		},
		useLink: dr,
		setup(e, { slots: t }) {
			const n = mn(dr(e)),
				{ options: s } = $e(Sn),
				r = xe(() => ({
					[pr(
						e.activeClass,
						s.linkActiveClass,
						"router-link-active"
					)]: n.isActive,
					[pr(
						e.exactActiveClass,
						s.linkExactActiveClass,
						"router-link-exact-active"
					)]: n.isExactActive,
				}));
			return () => {
				const o = t.default && t.default(n);
				return e.custom
					? o
					: ho(
							"a",
							{
								"aria-current": n.isExactActive
									? e.ariaCurrentValue
									: null,
								href: n.href,
								onClick: n.navigate,
								class: r.value,
							},
							o
					  );
			};
		},
	}),
	uu = cu;
function fu(e) {
	if (
		!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
		!e.defaultPrevented &&
		!(e.button !== void 0 && e.button !== 0)
	) {
		if (e.currentTarget && e.currentTarget.getAttribute) {
			const t = e.currentTarget.getAttribute("target");
			if (/\b_blank\b/i.test(t)) return;
		}
		return e.preventDefault && e.preventDefault(), !0;
	}
}
function au(e, t) {
	for (const n in t) {
		const s = t[n],
			r = e[n];
		if (typeof s == "string") {
			if (s !== r) return !1;
		} else if (
			!Ce(r) ||
			r.length !== s.length ||
			s.some((o, i) => o !== r[i])
		)
			return !1;
	}
	return !0;
}
function hr(e) {
	return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const pr = (e, t, n) => e ?? t ?? n,
	du = zr({
		name: "RouterView",
		inheritAttrs: !1,
		props: { name: { type: String, default: "default" }, route: Object },
		compatConfig: { MODE: 3 },
		setup(e, { attrs: t, slots: n }) {
			const s = $e(Jn),
				r = xe(() => e.route || s.value),
				o = $e(ar, 0),
				i = xe(() => {
					let d = gt(o);
					const { matched: a } = r.value;
					let h;
					for (; (h = a[d]) && !h.components; ) d++;
					return d;
				}),
				u = xe(() => r.value.matched[i.value]);
			nn(
				ar,
				xe(() => i.value + 1)
			),
				nn(iu, u),
				nn(Jn, r);
			const l = hi();
			return (
				en(
					() => [l.value, u.value, e.name],
					([d, a, h], [p, b, A]) => {
						a &&
							((a.instances[h] = d),
							b &&
								b !== a &&
								d &&
								d === p &&
								(a.leaveGuards.size ||
									(a.leaveGuards = b.leaveGuards),
								a.updateGuards.size ||
									(a.updateGuards = b.updateGuards))),
							d &&
								a &&
								(!b || !bt(a, b) || !p) &&
								(a.enterCallbacks[h] || []).forEach((N) =>
									N(d)
								);
					},
					{ flush: "post" }
				),
				() => {
					const d = r.value,
						a = e.name,
						h = u.value,
						p = h && h.components[a];
					if (!p) return gr(n.default, { Component: p, route: d });
					const b = h.props[a],
						A = b
							? b === !0
								? d.params
								: typeof b == "function"
								? b(d)
								: b
							: null,
						V = ho(
							p,
							G({}, A, t, {
								onVnodeUnmounted: (M) => {
									M.component.isUnmounted &&
										(h.instances[a] = null);
								},
								ref: l,
							})
						);
					return gr(n.default, { Component: V, route: d }) || V;
				}
			);
		},
	});
function gr(e, t) {
	if (!e) return null;
	const n = e(t);
	return n.length === 1 ? n[0] : n;
}
const hu = du;
function pu(e) {
	const t = eu(e.routes, e),
		n = e.parseQuery || ru,
		s = e.stringifyQuery || fr,
		r = e.history,
		o = St(),
		i = St(),
		u = St(),
		l = pi(Ke);
	let d = Ke;
	dt &&
		e.scrollBehavior &&
		"scrollRestoration" in history &&
		(history.scrollRestoration = "manual");
	const a = Ln.bind(null, (_) => "" + _),
		h = Ln.bind(null, Cc),
		p = Ln.bind(null, Dt);
	function b(_, P) {
		let C, I;
		return (
			xo(_) ? ((C = t.getRecordMatcher(_)), (I = P)) : (I = _),
			t.addRoute(I, C)
		);
	}
	function A(_) {
		const P = t.getRecordMatcher(_);
		P && t.removeRoute(P);
	}
	function N() {
		return t.getRoutes().map((_) => _.record);
	}
	function V(_) {
		return !!t.getRecordMatcher(_);
	}
	function M(_, P) {
		if (((P = G({}, P || l.value)), typeof _ == "string")) {
			const f = Nn(n, _, P.path),
				g = t.resolve({ path: f.path }, P),
				v = r.createHref(f.fullPath);
			return G(f, g, {
				params: p(g.params),
				hash: Dt(f.hash),
				redirectedFrom: void 0,
				href: v,
			});
		}
		let C;
		if (_.path != null) C = G({}, _, { path: Nn(n, _.path, P.path).path });
		else {
			const f = G({}, _.params);
			for (const g in f) f[g] == null && delete f[g];
			(C = G({}, _, { params: h(f) })), (P.params = h(P.params));
		}
		const I = t.resolve(C, P),
			q = _.hash || "";
		I.params = a(p(I.params));
		const Z = Oc(s, G({}, _, { hash: Ec(q), path: I.path })),
			c = r.createHref(Z);
		return G(
			{
				fullPath: Z,
				hash: q,
				query: s === fr ? ou(_.query) : _.query || {},
			},
			I,
			{ redirectedFrom: void 0, href: c }
		);
	}
	function $(_) {
		return typeof _ == "string" ? Nn(n, _, l.value.path) : G({}, _);
	}
	function H(_, P) {
		if (d !== _) return yt(8, { from: P, to: _ });
	}
	function k(_) {
		return ue(_);
	}
	function te(_) {
		return k(G($(_), { replace: !0 }));
	}
	function B(_) {
		const P = _.matched[_.matched.length - 1];
		if (P && P.redirect) {
			const { redirect: C } = P;
			let I = typeof C == "function" ? C(_) : C;
			return (
				typeof I == "string" &&
					((I =
						I.includes("?") || I.includes("#")
							? (I = $(I))
							: { path: I }),
					(I.params = {})),
				G(
					{
						query: _.query,
						hash: _.hash,
						params: I.path != null ? {} : _.params,
					},
					I
				)
			);
		}
	}
	function ue(_, P) {
		const C = (d = M(_)),
			I = l.value,
			q = _.state,
			Z = _.force,
			c = _.replace === !0,
			f = B(C);
		if (f)
			return ue(
				G($(f), {
					state: typeof f == "object" ? G({}, q, f.state) : q,
					force: Z,
					replace: c,
				}),
				P || C
			);
		const g = C;
		g.redirectedFrom = P;
		let v;
		return (
			!Z &&
				Ac(s, I, C) &&
				((v = yt(16, { to: g, from: I })), Oe(I, I, !0, !1)),
			(v ? Promise.resolve(v) : Se(g, I))
				.catch((m) => (je(m) ? (je(m, 2) ? m : Ve(m)) : W(m, g, I)))
				.then((m) => {
					if (m) {
						if (je(m, 2))
							return ue(
								G({ replace: c }, $(m.to), {
									state:
										typeof m.to == "object"
											? G({}, q, m.to.state)
											: q,
									force: Z,
								}),
								P || g
							);
					} else m = et(g, I, !0, c, q);
					return Ue(g, I, m), m;
				})
		);
	}
	function _e(_, P) {
		const C = H(_, P);
		return C ? Promise.reject(C) : Promise.resolve();
	}
	function Ze(_) {
		const P = ft.values().next().value;
		return P && typeof P.runWithContext == "function"
			? P.runWithContext(_)
			: _();
	}
	function Se(_, P) {
		let C;
		const [I, q, Z] = gu(_, P);
		C = jn(I.reverse(), "beforeRouteLeave", _, P);
		for (const f of I)
			f.leaveGuards.forEach((g) => {
				C.push(qe(g, _, P));
			});
		const c = _e.bind(null, _, P);
		return (
			C.push(c),
			ie(C)
				.then(() => {
					C = [];
					for (const f of o.list()) C.push(qe(f, _, P));
					return C.push(c), ie(C);
				})
				.then(() => {
					C = jn(q, "beforeRouteUpdate", _, P);
					for (const f of q)
						f.updateGuards.forEach((g) => {
							C.push(qe(g, _, P));
						});
					return C.push(c), ie(C);
				})
				.then(() => {
					C = [];
					for (const f of Z)
						if (f.beforeEnter)
							if (Ce(f.beforeEnter))
								for (const g of f.beforeEnter)
									C.push(qe(g, _, P));
							else C.push(qe(f.beforeEnter, _, P));
					return C.push(c), ie(C);
				})
				.then(
					() => (
						_.matched.forEach((f) => (f.enterCallbacks = {})),
						(C = jn(Z, "beforeRouteEnter", _, P, Ze)),
						C.push(c),
						ie(C)
					)
				)
				.then(() => {
					C = [];
					for (const f of i.list()) C.push(qe(f, _, P));
					return C.push(c), ie(C);
				})
				.catch((f) => (je(f, 8) ? f : Promise.reject(f)))
		);
	}
	function Ue(_, P, C) {
		u.list().forEach((I) => Ze(() => I(_, P, C)));
	}
	function et(_, P, C, I, q) {
		const Z = H(_, P);
		if (Z) return Z;
		const c = P === Ke,
			f = dt ? history.state : {};
		C &&
			(I || c
				? r.replace(_.fullPath, G({ scroll: c && f && f.scroll }, q))
				: r.push(_.fullPath, q)),
			(l.value = _),
			Oe(_, P, C, c),
			Ve();
	}
	let Pe;
	function wt() {
		Pe ||
			(Pe = r.listen((_, P, C) => {
				if (!zt.listening) return;
				const I = M(_),
					q = B(I);
				if (q) {
					ue(G(q, { replace: !0 }), I).catch(Lt);
					return;
				}
				d = I;
				const Z = l.value;
				dt && Fc(nr(Z.fullPath, C.delta), Cn()),
					Se(I, Z)
						.catch((c) =>
							je(c, 12)
								? c
								: je(c, 2)
								? (ue(c.to, I)
										.then((f) => {
											je(f, 20) &&
												!C.delta &&
												C.type === Kt.pop &&
												r.go(-1, !1);
										})
										.catch(Lt),
								  Promise.reject())
								: (C.delta && r.go(-C.delta, !1), W(c, I, Z))
						)
						.then((c) => {
							(c = c || et(I, Z, !1)),
								c &&
									(C.delta && !je(c, 8)
										? r.go(-C.delta, !1)
										: C.type === Kt.pop &&
										  je(c, 20) &&
										  r.go(-1, !1)),
								Ue(I, Z, c);
						})
						.catch(Lt);
			}));
	}
	let ct = St(),
		ne = St(),
		Q;
	function W(_, P, C) {
		Ve(_);
		const I = ne.list();
		return (
			I.length ? I.forEach((q) => q(_, P, C)) : console.error(_),
			Promise.reject(_)
		);
	}
	function Ne() {
		return Q && l.value !== Ke
			? Promise.resolve()
			: new Promise((_, P) => {
					ct.add([_, P]);
			  });
	}
	function Ve(_) {
		return (
			Q ||
				((Q = !_),
				wt(),
				ct.list().forEach(([P, C]) => (_ ? C(_) : P())),
				ct.reset()),
			_
		);
	}
	function Oe(_, P, C, I) {
		const { scrollBehavior: q } = e;
		if (!dt || !q) return Promise.resolve();
		const Z =
			(!C && Hc(nr(_.fullPath, 0))) ||
			((I || !C) && history.state && history.state.scroll) ||
			null;
		return Br()
			.then(() => q(_, P, Z))
			.then((c) => c && jc(c))
			.catch((c) => W(c, _, P));
	}
	const de = (_) => r.go(_);
	let ut;
	const ft = new Set(),
		zt = {
			currentRoute: l,
			listening: !0,
			addRoute: b,
			removeRoute: A,
			hasRoute: V,
			getRoutes: N,
			resolve: M,
			options: e,
			push: k,
			replace: te,
			go: de,
			back: () => de(-1),
			forward: () => de(1),
			beforeEach: o.add,
			beforeResolve: i.add,
			afterEach: u.add,
			onError: ne.add,
			isReady: Ne,
			install(_) {
				const P = this;
				_.component("RouterLink", uu),
					_.component("RouterView", hu),
					(_.config.globalProperties.$router = P),
					Object.defineProperty(_.config.globalProperties, "$route", {
						enumerable: !0,
						get: () => gt(l),
					}),
					dt &&
						!ut &&
						l.value === Ke &&
						((ut = !0), k(r.location).catch((q) => {}));
				const C = {};
				for (const q in Ke)
					Object.defineProperty(C, q, {
						get: () => l.value[q],
						enumerable: !0,
					});
				_.provide(Sn, P), _.provide(Ro, Tr(C)), _.provide(Jn, l);
				const I = _.unmount;
				ft.add(_),
					(_.unmount = function () {
						ft.delete(_),
							ft.size < 1 &&
								((d = Ke),
								Pe && Pe(),
								(Pe = null),
								(l.value = Ke),
								(ut = !1),
								(Q = !1)),
							I();
					});
			},
		};
	function ie(_) {
		return _.reduce((P, C) => P.then(() => Ze(C)), Promise.resolve());
	}
	return zt;
}
function gu(e, t) {
	const n = [],
		s = [],
		r = [],
		o = Math.max(t.matched.length, e.matched.length);
	for (let i = 0; i < o; i++) {
		const u = t.matched[i];
		u && (e.matched.find((d) => bt(d, u)) ? s.push(u) : n.push(u));
		const l = e.matched[i];
		l && (t.matched.find((d) => bt(d, l)) || r.push(l));
	}
	return [n, s, r];
}
function mu() {
	return $e(Sn);
}
const vs = (e) => (yn("data-v-0898f076"), (e = e()), xn(), e),
	_u = { id: "whole" },
	vu = vs(() => R("h1", { textContent: "菜单栏" }, null, -1)),
	bu = vs(() => R("div", null, null, -1)),
	yu = vs(() => R("div", null, null, -1)),
	xu = {
		__name: "Left",
		setup(e) {
			let t = mu();
			function n() {
				t.push("/path");
			}
			function s() {
				t.push("/");
			}
			function r() {
				t.push("/move");
			}
			function o() {
				t.push("recommend");
			}
			return (i, u) => (
				it(),
				lt("div", _u, [
					vu,
					R("button", {
						class: "abtn",
						onClick: u[0] || (u[0] = (l) => s()),
						textContent: "回到首页",
					}),
					R("button", {
						class: "abtn",
						onClick: u[1] || (u[1] = (l) => n()),
						textContent: "学习路线",
					}),
					R("button", {
						class: "abtn",
						onClick: u[2] || (u[2] = (l) => r()),
						textContent: "未来规划",
					}),
					R("button", {
						class: "abtn",
						onClick: u[3] || (u[3] = (l) => o()),
						textContent: "推荐内容",
					}),
					bu,
					yu,
				])
			);
		},
	},
	Eu = Et(xu, [["__scopeId", "data-v-0898f076"]]),
	wu = {
		__name: "App",
		setup(e) {
			return (t, n) => {
				const s = Ai("router-view");
				return it(), lt("div", null, [ae(ic), ae(Eu), ae(s)]);
			};
		},
	},
	Ru = {},
	Co = (e) => (yn("data-v-28a299b4"), (e = e()), xn(), e),
	Cu = { id: "whole" },
	Su = Co(() => R("h1", null, "后续规划", -1)),
	Pu = Co(() =>
		R(
			"div",
			{ class: "txt" },
			[
				R("p", null, [
					R("p", { class: "mark" }, "2024年5月12日"),
					_t(
						"         现在整个博客框架差不多了，功能也足够用了，加页面其实很简单， 所以后续大概率不打算 继续开发新功能了，但可能会添加一些新内容，至于加什么，这个随心了。 "
					),
					R("br"),
					_t(
						"         后面要去学习服务器怎么上线，如果成功的话，获取可以为当前博客增加后端功能， 比如留言板之类。 "
					),
					R("br"),
					_t(
						"         完成基本的应用练习，将会继续刷网课学习后端的框架开发。 "
					),
					R("hr"),
				]),
			],
			-1
		)
	),
	Ou = [Su, Pu];
function Au(e, t) {
	return it(), lt("div", Cu, Ou);
}
const Iu = Et(Ru, [
		["render", Au],
		["__scopeId", "data-v-28a299b4"],
	]),
	Tu = {},
	Mu = { id: "whole" },
	$u = uo(
		'<h1 data-v-179c7cd9>欢迎来到我的blog</h1><div class="txt" data-v-179c7cd9><p data-v-179c7cd9>        作为一名码龄不足一年的程序猿，博客看了很多，本事没有多少。 <br data-v-179c7cd9>        第一次写自己的博客并进行静态的托管。才疏学浅， 很多东西现在只是学了一个大概，但这也无妨，毕竟很多事情开始了，一切都好说。 <br data-v-179c7cd9>        下面，我将展示目前网站所用的技术栈，这次blog的目的 之一，其实还是探索静态网站部署，我需要知道现在静态网站可以实现的功能有哪些，后续添加功能时， 也可以方便查看静态网站功能的上限。然后采取服务器托管的形式，进行功能更复杂的网站的部署。 <br data-v-179c7cd9>         <b data-v-179c7cd9>前端技术栈如下</b><ol data-v-179c7cd9><li data-v-179c7cd9>html</li><li data-v-179c7cd9>css</li><li data-v-179c7cd9>javaScript</li><li data-v-179c7cd9>vue</li><li data-v-179c7cd9>vite</li><li data-v-179c7cd9>router</li></ol><br data-v-179c7cd9>        看着确实很少，而且掌握也不是很深入。 加上审美不足，造就了这样一个难看的blog。姑且这样吧，慢慢改进。 <br data-v-179c7cd9>        我会在这里介绍自己目前的学习路线和未来的规划路线， 以作参考。（好吧，主要是丰富内容，真的没东西写了，不知道写什么 /捂脸/捂脸） </p></div>',
		2
	),
	Lu = [$u];
function Nu(e, t) {
	return it(), lt("div", Mu, Lu);
}
const ju = Et(Tu, [
		["render", Nu],
		["__scopeId", "data-v-179c7cd9"],
	]),
	Fu = {},
	So = (e) => (yn("data-v-1fc4f85d"), (e = e()), xn(), e),
	Hu = { id: "whole" },
	Bu = So(() => R("h1", null, "推荐", -1)),
	Uu = So(() =>
		R(
			"div",
			{ class: "txt" },
			[
				R("p", null, [
					R("i", null, [
						_t(
							"         前言:推荐一些我觉得挺好的博主，同时附上其活跃地址，具体内容请自行搜索。 "
						),
						R("br"),
						_t("         简写对应表如下 "),
					]),
					R("table", { class: "tab", cellspacing: "0px" }, [
						R("tr", { class: "ltr" }, [
							R("td", null, [R("b", null, "简写")]),
							R("td", null, [R("b", null, "代指")]),
						]),
						R("tr", { class: "ltr" }, [
							R("td", null, "wx"),
							R("td", null, " 微信公众号 "),
						]),
						R("tr", { class: "ltr" }, [
							R("td", null, "lc"),
							R("td", null, " 力扣 "),
						]),
						R("tr", { class: "ltr" }, [
							R("td", null, "cd"),
							R("td", null, " csdn "),
						]),
						R("tr", { class: "ltr" }, [
							R("td", null, "wx"),
							R("td", null, " 微信公众号 "),
						]),
						R("tr", { class: "ltr" }, [
							R("td", null, "ip"),
							R("td", null, " 自制网页，具体会附上地址 "),
						]),
						R("tr", { class: "ltr" }, [
							R("td", null, "zh"),
							R("td", null, " 知乎 "),
						]),
						R("tr", { class: "ltr" }, [
							R("td", null, "gt"),
							R("td", null, " GitHub "),
						]),
						R("tr", { class: "ltr" }, [
							R("td", null, "wx"),
							R("td", null, " 微信公众号 "),
						]),
						R("tr", { class: "ltr" }, [
							R("td", null, "bl"),
							R("td", null, " bilibili "),
						]),
						R("tr", { class: "ltr" }, [
							R("td", null, "bk"),
							R("td", null, " 博客园 "),
						]),
						R("tr", { class: "ltr" }, [
							R("td", { colspan: "2", class: "buttonContainer" }),
						]),
					]),
					R("hr"),
					R("h3", null, "网页、小程序、app入门"),
					R("ol", null, [R("li", null, "康文昌 b站")]),
					R("h3", null, "数据结构和算法"),
					R("ol", null, [
						R("li", null, "代码随想录 lc，ip，bl，wx，zh，cd"),
						R(
							"li",
							null,
							"宫水三叶的刷题日记 lc（宫水三叶），zh（宫水三叶），无bl，ip，wx，gt，cd"
						),
						R("li", null, "灵茶山艾府 lc，bl，zh"),
						R("li", null, "liweiwei lc"),
						R("li", null, "ylb（yanglbme ）lc，gt"),
						R("li", null, "- pecco zh - "),
						R("li", null, "繁凡 zh，cd，gt（fanfansann）"),
						R("li", null, "MarisaMagic bk"),
					]),
				]),
			],
			-1
		)
	),
	Vu = [Bu, Uu];
function Du(e, t) {
	return it(), lt("div", Hu, Vu);
}
const Ku = Et(Fu, [
	["render", Du],
	["__scopeId", "data-v-1fc4f85d"],
]);
let ku = pu({
		history: Kc(),
		routes: [
			{ path: "/", component: ju },
			{ path: "/path", component: ac },
			{ path: "/move", component: Iu },
			{ path: "/recommend", component: Ku },
		],
	}),
	Po = Xl(wu);
Po.use(ku);
Po.mount("#app");
