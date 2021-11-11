var t, i = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
    s = {},
    e = {
        exports: {}
    };
t = e,
    function(i) {
        function s(t, i) {
            return this instanceof s ? (this._low = 0, this._high = 0, this.remainder = null, void 0 === i ? h.call(this, t) : "string" == typeof t ? a.call(this, t, i) : void e.call(this, t, i)) : new s(t, i)
        }

        function e(t, i) {
            return this._low = 0 | t, this._high = 0 | i, this
        }

        function h(t) {
            return this._low = 65535 & t, this._high = t >>> 16, this
        }

        function a(t, i) {
            var s = parseInt(t, i || 10);
            return this._low = 65535 & s, this._high = s >>> 16, this
        }
        s(Math.pow(36, 5)), s(Math.pow(16, 7)), s(Math.pow(10, 9)), s(Math.pow(2, 30)), s(36), s(16), s(10), s(2), s.prototype.fromBits = e, s.prototype.fromNumber = h, s.prototype.fromString = a, s.prototype.toNumber = function() {
            return 65536 * this._high + this._low
        }, s.prototype.toString = function(t) {
            return this.toNumber().toString(t || 10)
        }, s.prototype.add = function(t) {
            var i = this._low + t._low,
                s = i >>> 16;
            return s += this._high + t._high, this._low = 65535 & i, this._high = 65535 & s, this
        }, s.prototype.subtract = function(t) {
            return this.add(t.clone().negate())
        }, s.prototype.multiply = function(t) {
            var i, s, e = this._high,
                h = this._low,
                a = t._high,
                n = t._low;
            return i = (s = h * n) >>> 16, i += e * n, i &= 65535, i += h * a, this._low = 65535 & s, this._high = 65535 & i, this
        }, s.prototype.div = function(t) {
            if (0 == t._low && 0 == t._high) throw Error("division by zero");
            if (0 == t._high && 1 == t._low) return this.remainder = new s(0), this;
            if (t.gt(this)) return this.remainder = this.clone(), this._low = 0, this._high = 0, this;
            if (this.eq(t)) return this.remainder = new s(0), this._low = 1, this._high = 0, this;
            for (var i = t.clone(), e = -1; !this.lt(i);) i.shiftLeft(1, !0), e++;
            for (this.remainder = this.clone(), this._low = 0, this._high = 0; e >= 0; e--) i.shiftRight(1), this.remainder.lt(i) || (this.remainder.subtract(i), e >= 16 ? this._high |= 1 << e - 16 : this._low |= 1 << e);
            return this
        }, s.prototype.negate = function() {
            var t = 1 + (65535 & ~this._low);
            return this._low = 65535 & t, this._high = ~this._high + (t >>> 16) & 65535, this
        }, s.prototype.equals = s.prototype.eq = function(t) {
            return this._low == t._low && this._high == t._high
        }, s.prototype.greaterThan = s.prototype.gt = function(t) {
            return this._high > t._high || !(this._high < t._high) && this._low > t._low
        }, s.prototype.lessThan = s.prototype.lt = function(t) {
            return this._high < t._high || !(this._high > t._high) && this._low < t._low
        }, s.prototype.or = function(t) {
            return this._low |= t._low, this._high |= t._high, this
        }, s.prototype.and = function(t) {
            return this._low &= t._low, this._high &= t._high, this
        }, s.prototype.not = function() {
            return this._low = 65535 & ~this._low, this._high = 65535 & ~this._high, this
        }, s.prototype.xor = function(t) {
            return this._low ^= t._low, this._high ^= t._high, this
        }, s.prototype.shiftRight = s.prototype.shiftr = function(t) {
            return t > 16 ? (this._low = this._high >> t - 16, this._high = 0) : 16 == t ? (this._low = this._high, this._high = 0) : (this._low = this._low >> t | this._high << 16 - t & 65535, this._high >>= t), this
        }, s.prototype.shiftLeft = s.prototype.shiftl = function(t, i) {
            return t > 16 ? (this._high = this._low << t - 16, this._low = 0, i || (this._high &= 65535)) : 16 == t ? (this._high = this._low, this._low = 0) : (this._high = this._high << t | this._low >> 16 - t, this._low = this._low << t & 65535, i || (this._high &= 65535)), this
        }, s.prototype.rotateLeft = s.prototype.rotl = function(t) {
            var i = this._high << 16 | this._low;
            return i = i << t | i >>> 32 - t, this._low = 65535 & i, this._high = i >>> 16, this
        }, s.prototype.rotateRight = s.prototype.rotr = function(t) {
            var i = this._high << 16 | this._low;
            return i = i >>> t | i << 32 - t, this._low = 65535 & i, this._high = i >>> 16, this
        }, s.prototype.clone = function() {
            return new s(this._low, this._high)
        }, t.exports ? t.exports = s : i.UINT32 = s
    }(i);
var h = {
    exports: {}
};
! function(t) {
    ! function(i) {
        var s = {
                16: h(Math.pow(16, 5)),
                10: h(Math.pow(10, 5)),
                2: h(Math.pow(2, 5))
            },
            e = {
                16: h(16),
                10: h(10),
                2: h(2)
            };

        function h(t, i, s, e) {
            return this instanceof h ? (this.remainder = null, "string" == typeof t ? r.call(this, t, i) : void 0 === i ? n.call(this, t) : void a.apply(this, arguments)) : new h(t, i, s, e)
        }

        function a(t, i, s, e) {
            return void 0 === s ? (this._a00 = 65535 & t, this._a16 = t >>> 16, this._a32 = 65535 & i, this._a48 = i >>> 16, this) : (this._a00 = 0 | t, this._a16 = 0 | i, this._a32 = 0 | s, this._a48 = 0 | e, this)
        }

        function n(t) {
            return this._a00 = 65535 & t, this._a16 = t >>> 16, this._a32 = 0, this._a48 = 0, this
        }

        function r(t, i) {
            i = i || 10, this._a00 = 0, this._a16 = 0, this._a32 = 0, this._a48 = 0;
            for (var e = s[i] || new h(Math.pow(i, 5)), a = 0, n = t.length; a < n; a += 5) {
                var r = Math.min(5, n - a),
                    o = parseInt(t.slice(a, a + r), i);
                this.multiply(r < 5 ? new h(Math.pow(i, r)) : e).add(new h(o))
            }
            return this
        }
        h.prototype.fromBits = a, h.prototype.fromNumber = n, h.prototype.fromString = r, h.prototype.toNumber = function() {
            return 65536 * this._a16 + this._a00
        }, h.prototype.toString = function(t) {
            var i = e[t = t || 10] || new h(t);
            if (!this.gt(i)) return this.toNumber().toString(t);
            for (var s = this.clone(), a = new Array(64), n = 63; n >= 0 && (s.div(i), a[n] = s.remainder.toNumber().toString(t), s.gt(i)); n--);
            return a[n - 1] = s.toNumber().toString(t), a.join("")
        }, h.prototype.add = function(t) {
            var i = this._a00 + t._a00,
                s = i >>> 16,
                e = (s += this._a16 + t._a16) >>> 16,
                h = (e += this._a32 + t._a32) >>> 16;
            return h += this._a48 + t._a48, this._a00 = 65535 & i, this._a16 = 65535 & s, this._a32 = 65535 & e, this._a48 = 65535 & h, this
        }, h.prototype.subtract = function(t) {
            return this.add(t.clone().negate())
        }, h.prototype.multiply = function(t) {
            var i = this._a00,
                s = this._a16,
                e = this._a32,
                h = this._a48,
                a = t._a00,
                n = t._a16,
                r = t._a32,
                o = i * a,
                _ = o >>> 16,
                p = (_ += i * n) >>> 16;
            _ &= 65535, p += (_ += s * a) >>> 16;
            var c = (p += i * r) >>> 16;
            return p &= 65535, c += (p += s * n) >>> 16, p &= 65535, c += (p += e * a) >>> 16, c += i * t._a48, c &= 65535, c += s * r, c &= 65535, c += e * n, c &= 65535, c += h * a, this._a00 = 65535 & o, this._a16 = 65535 & _, this._a32 = 65535 & p, this._a48 = 65535 & c, this
        }, h.prototype.div = function(t) {
            if (0 == t._a16 && 0 == t._a32 && 0 == t._a48) {
                if (0 == t._a00) throw Error("division by zero");
                if (1 == t._a00) return this.remainder = new h(0), this
            }
            if (t.gt(this)) return this.remainder = this.clone(), this._a00 = 0, this._a16 = 0, this._a32 = 0, this._a48 = 0, this;
            if (this.eq(t)) return this.remainder = new h(0), this._a00 = 1, this._a16 = 0, this._a32 = 0, this._a48 = 0, this;
            for (var i = t.clone(), s = -1; !this.lt(i);) i.shiftLeft(1, !0), s++;
            for (this.remainder = this.clone(), this._a00 = 0, this._a16 = 0, this._a32 = 0, this._a48 = 0; s >= 0; s--) i.shiftRight(1), this.remainder.lt(i) || (this.remainder.subtract(i), s >= 48 ? this._a48 |= 1 << s - 48 : s >= 32 ? this._a32 |= 1 << s - 32 : s >= 16 ? this._a16 |= 1 << s - 16 : this._a00 |= 1 << s);
            return this
        }, h.prototype.negate = function() {
            var t = 1 + (65535 & ~this._a00);
            return this._a00 = 65535 & t, t = (65535 & ~this._a16) + (t >>> 16), this._a16 = 65535 & t, t = (65535 & ~this._a32) + (t >>> 16), this._a32 = 65535 & t, this._a48 = ~this._a48 + (t >>> 16) & 65535, this
        }, h.prototype.equals = h.prototype.eq = function(t) {
            return this._a48 == t._a48 && this._a00 == t._a00 && this._a32 == t._a32 && this._a16 == t._a16
        }, h.prototype.greaterThan = h.prototype.gt = function(t) {
            return this._a48 > t._a48 || !(this._a48 < t._a48) && (this._a32 > t._a32 || !(this._a32 < t._a32) && (this._a16 > t._a16 || !(this._a16 < t._a16) && this._a00 > t._a00))
        }, h.prototype.lessThan = h.prototype.lt = function(t) {
            return this._a48 < t._a48 || !(this._a48 > t._a48) && (this._a32 < t._a32 || !(this._a32 > t._a32) && (this._a16 < t._a16 || !(this._a16 > t._a16) && this._a00 < t._a00))
        }, h.prototype.or = function(t) {
            return this._a00 |= t._a00, this._a16 |= t._a16, this._a32 |= t._a32, this._a48 |= t._a48, this
        }, h.prototype.and = function(t) {
            return this._a00 &= t._a00, this._a16 &= t._a16, this._a32 &= t._a32, this._a48 &= t._a48, this
        }, h.prototype.xor = function(t) {
            return this._a00 ^= t._a00, this._a16 ^= t._a16, this._a32 ^= t._a32, this._a48 ^= t._a48, this
        }, h.prototype.not = function() {
            return this._a00 = 65535 & ~this._a00, this._a16 = 65535 & ~this._a16, this._a32 = 65535 & ~this._a32, this._a48 = 65535 & ~this._a48, this
        }, h.prototype.shiftRight = h.prototype.shiftr = function(t) {
            return (t %= 64) >= 48 ? (this._a00 = this._a48 >> t - 48, this._a16 = 0, this._a32 = 0, this._a48 = 0) : t >= 32 ? (t -= 32, this._a00 = 65535 & (this._a32 >> t | this._a48 << 16 - t), this._a16 = this._a48 >> t & 65535, this._a32 = 0, this._a48 = 0) : t >= 16 ? (t -= 16, this._a00 = 65535 & (this._a16 >> t | this._a32 << 16 - t), this._a16 = 65535 & (this._a32 >> t | this._a48 << 16 - t), this._a32 = this._a48 >> t & 65535, this._a48 = 0) : (this._a00 = 65535 & (this._a00 >> t | this._a16 << 16 - t), this._a16 = 65535 & (this._a16 >> t | this._a32 << 16 - t), this._a32 = 65535 & (this._a32 >> t | this._a48 << 16 - t), this._a48 = this._a48 >> t & 65535), this
        }, h.prototype.shiftLeft = h.prototype.shiftl = function(t, i) {
            return (t %= 64) >= 48 ? (this._a48 = this._a00 << t - 48, this._a32 = 0, this._a16 = 0, this._a00 = 0) : t >= 32 ? (t -= 32, this._a48 = this._a16 << t | this._a00 >> 16 - t, this._a32 = this._a00 << t & 65535, this._a16 = 0, this._a00 = 0) : t >= 16 ? (t -= 16, this._a48 = this._a32 << t | this._a16 >> 16 - t, this._a32 = 65535 & (this._a16 << t | this._a00 >> 16 - t), this._a16 = this._a00 << t & 65535, this._a00 = 0) : (this._a48 = this._a48 << t | this._a32 >> 16 - t, this._a32 = 65535 & (this._a32 << t | this._a16 >> 16 - t), this._a16 = 65535 & (this._a16 << t | this._a00 >> 16 - t), this._a00 = this._a00 << t & 65535), i || (this._a48 &= 65535), this
        }, h.prototype.rotateLeft = h.prototype.rotl = function(t) {
            if (0 == (t %= 64)) return this;
            if (t >= 32) {
                var i = this._a00;
                if (this._a00 = this._a32, this._a32 = i, i = this._a48, this._a48 = this._a16, this._a16 = i, 32 == t) return this;
                t -= 32
            }
            var s = this._a48 << 16 | this._a32,
                e = this._a16 << 16 | this._a00,
                h = s << t | e >>> 32 - t,
                a = e << t | s >>> 32 - t;
            return this._a00 = 65535 & a, this._a16 = a >>> 16, this._a32 = 65535 & h, this._a48 = h >>> 16, this
        }, h.prototype.rotateRight = h.prototype.rotr = function(t) {
            if (0 == (t %= 64)) return this;
            if (t >= 32) {
                var i = this._a00;
                if (this._a00 = this._a32, this._a32 = i, i = this._a48, this._a48 = this._a16, this._a16 = i, 32 == t) return this;
                t -= 32
            }
            var s = this._a48 << 16 | this._a32,
                e = this._a16 << 16 | this._a00,
                h = s >>> t | e << 32 - t,
                a = e >>> t | s << 32 - t;
            return this._a00 = 65535 & a, this._a16 = a >>> 16, this._a32 = 65535 & h, this._a48 = h >>> 16, this
        }, h.prototype.clone = function() {
            return new h(this._a00, this._a16, this._a32, this._a48)
        }, t.exports ? t.exports = h : i.UINT64 = h
    }(i)
}(h), s.UINT32 = e.exports, s.UINT64 = h.exports;
var a = r,
    n = s.UINT64;

function r(t) {
    var i;
    if (this.universe = r.Universe.INVALID, this.type = r.Type.INVALID, this.instance = r.Instance.ALL, this.accountid = 0, t)
        if (i = t.match(/^STEAM_([0-5]):([0-1]):([0-9]+)$/)) this.universe = parseInt(i[1], 10) || r.Universe.PUBLIC, this.type = r.Type.INDIVIDUAL, this.instance = r.Instance.DESKTOP, this.accountid = 2 * parseInt(i[3], 10) + parseInt(i[2], 10);
        else if (i = t.match(/^\[([a-zA-Z]):([0-5]):([0-9]+)(:[0-9]+)?\]$/)) {
        this.universe = parseInt(i[2], 10), this.accountid = parseInt(i[3], 10);
        var s = i[1];
        i[4] ? this.instance = parseInt(i[4].substring(1), 10) : "U" == s && (this.instance = r.Instance.DESKTOP), "c" == s ? (this.instance |= r.ChatInstanceFlags.Clan, this.type = r.Type.CHAT) : "L" == s ? (this.instance |= r.ChatInstanceFlags.Lobby, this.type = r.Type.CHAT) : this.type = function(t) {
            for (var i in r.TypeChars)
                if (r.TypeChars[i] == t) return parseInt(i, 10);
            return r.Type.INVALID
        }(s)
    } else {
        if (isNaN(t)) throw new Error('Unknown SteamID input format "' + t + '"');
        var e = new n(t, 10);
        this.accountid = (4294967295 & e.toNumber()) >>> 0, this.instance = 1048575 & e.shiftRight(32).toNumber(), this.type = 15 & e.shiftRight(20).toNumber(), this.universe = e.shiftRight(4).toNumber()
    }
}

function o(t) {
    ["universe", "type", "instance", "accountid"].forEach((function(i) {
        var s = parseInt(t[i], 10);
        isNaN(s) || (t[i] = s)
    }))
}
r.Universe = {
    INVALID: 0,
    PUBLIC: 1,
    BETA: 2,
    INTERNAL: 3,
    DEV: 4
}, r.Type = {
    INVALID: 0,
    INDIVIDUAL: 1,
    MULTISEAT: 2,
    GAMESERVER: 3,
    ANON_GAMESERVER: 4,
    PENDING: 5,
    CONTENT_SERVER: 6,
    CLAN: 7,
    CHAT: 8,
    P2P_SUPER_SEEDER: 9,
    ANON_USER: 10
}, r.Instance = {
    ALL: 0,
    DESKTOP: 1,
    CONSOLE: 2,
    WEB: 4
}, r.TypeChars = {}, r.TypeChars[r.Type.INVALID] = "I", r.TypeChars[r.Type.INDIVIDUAL] = "U", r.TypeChars[r.Type.MULTISEAT] = "M", r.TypeChars[r.Type.GAMESERVER] = "G", r.TypeChars[r.Type.ANON_GAMESERVER] = "A", r.TypeChars[r.Type.PENDING] = "P", r.TypeChars[r.Type.CONTENT_SERVER] = "C", r.TypeChars[r.Type.CLAN] = "g", r.TypeChars[r.Type.CHAT] = "T", r.TypeChars[r.Type.ANON_USER] = "a", r.AccountIDMask = 4294967295, r.AccountInstanceMask = 1048575, r.ChatInstanceFlags = {
    Clan: r.AccountInstanceMask + 1 >> 1,
    Lobby: r.AccountInstanceMask + 1 >> 2,
    MMSLobby: r.AccountInstanceMask + 1 >> 3
}, r.fromIndividualAccountID = function(t) {
    var i = parseInt(t, 10);
    isNaN(i) && (console.error('[steamid] Warning: SteamID.fromIndividualAccountID() called with NaN argument "' + t + '" (type ' + typeof t + ")"), i = 0);
    var s = new r;
    return s.universe = r.Universe.PUBLIC, s.type = r.Type.INDIVIDUAL, s.instance = r.Instance.DESKTOP, s.accountid = i, s
}, r.prototype.isValid = function() {
    return o(this), !(this.type <= r.Type.INVALID || this.type > r.Type.ANON_USER) && (!(this.universe <= r.Universe.INVALID || this.universe > r.Universe.DEV) && ((this.type != r.Type.INDIVIDUAL || !(0 === this.accountid || this.instance > r.Instance.WEB)) && ((this.type != r.Type.CLAN || 0 !== this.accountid && this.instance == r.Instance.ALL) && (this.type != r.Type.GAMESERVER || 0 !== this.accountid))))
}, r.prototype.isGroupChat = function() {
    return o(this), !!(this.type == r.Type.CHAT && this.instance & r.ChatInstanceFlags.Clan)
}, r.prototype.isLobby = function() {
    return o(this), !(this.type != r.Type.CHAT || !(this.instance & r.ChatInstanceFlags.Lobby || this.instance & r.ChatInstanceFlags.MMSLobby))
}, r.prototype.steam2 = r.prototype.getSteam2RenderedID = function(t) {
    if (o(this), this.type != r.Type.INDIVIDUAL) throw new Error("Can't get Steam2 rendered ID for non-individual ID");
    var i = this.universe;
    return t || 1 !== i || (i = 0), "STEAM_" + i + ":" + (1 & this.accountid) + ":" + Math.floor(this.accountid / 2)
}, r.prototype.steam3 = r.prototype.getSteam3RenderedID = function() {
    o(this);
    var t = r.TypeChars[this.type] || "i";
    this.instance & r.ChatInstanceFlags.Clan ? t = "c" : this.instance & r.ChatInstanceFlags.Lobby && (t = "L");
    var i = this.type == r.Type.ANON_GAMESERVER || this.type == r.Type.MULTISEAT || this.type == r.Type.INDIVIDUAL && this.instance != r.Instance.DESKTOP;
    return "[" + t + ":" + this.universe + ":" + this.accountid + (i ? ":" + this.instance : "") + "]"
}, r.prototype.toString = r.prototype.getSteamID64 = function() {
    return o(this), new n(this.accountid, this.universe << 24 | this.type << 20 | this.instance).toString()
};
const _ = {
    flag: "",
    idsSourceMod: [{
        idType: "id",
        isGenerate: !0
    }, {
        idType: "id-32-bit",
        isGenerate: !1
    }, {
        idType: "id-64-bit",
        isGenerate: !1
    }]
};
async function p(t, i) {
    return new Promise((s => {
        chrome.storage[t].get(i, (t => {
            s(i ? t[i] : t)
        }))
    }))
}

function c({
    data: t,
    idDest: i
}) {
    const s = new a(t.steamid);
    switch (i) {
        case "id":
            return s.getSteam2RenderedID();
        case "id-32-bit":
            return s.getSteam3RenderedID();
        case "id-64-bit":
            return s.getSteamID64()
    }
}
async function u(t) {
    try {
        await navigator.clipboard.writeText(t)
    } catch {
        ! function(t) {
            try {
                if (document?.queryCommandSupported("copy")) {
                    const i = document.createElement("textarea");
                    i.value = t, i.style.top = "0", i.style.left = "0", i.style.position = "fixed", i.style.opacity = "0", document.body.append(i), i.focus(), i.select();
                    try {
                        document.execCommand("copy")
                    } catch {}
                    i.remove()
                }
            } catch {}
        }(t)
    }
}
var y = "CDFA60E07B2DB4E4A0FA21C3A3C49111";
async function d(t) {
    return (await fetch(t)).json()
}
async function f({
    type: t,
    id: i
}) {
    switch (t) {
        case "64-bit":
            return `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?key=${y}&vanityurl=${i}`;
        case "data":
            return `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002?key=${y}&steamids=${i}`
    }
}
async function l(t) {
    try {
        return new a(t), {
            response: {
                steamid: t
            }
        }
    } catch {
        return d(await f({
            type: "64-bit",
            id: t
        }))
    }
}
async function g(t) {
    const i = [...t].map(l);
    return (await async function(t) {
        const i = (await Promise.all(t)).map((({
            response: t
        }) => t.steamid));
        return d(await f({
            type: "data",
            id: i.join(",")
        }))
    }(i)).response.players.map((t => ({
        ...t,
        id: c({
            data: t,
            idDest: "id"
        }),
        "id-32-bit": c({
            data: t,
            idDest: "id-32-bit"
        }),
        "id-64-bit": t.steamid
    })))
}
chrome.runtime.onInstalled.addListener((async ({
    reason: t
}) => {
    if ("update" !== t) return;
    const i = await p("sync", "generateSourceModLine");
    if (!i) return;
    const s = i.findIndex((({
        idType: t
    }) => "id-2" === t));
    s <= -1 || (i[s].idType = "id", chrome.storage.sync.remove("generateSourceModLine", (() => {
        chrome.storage.sync.set({
            idsSourceMod: i
        })
    })))
})), chrome.runtime.onConnect.addListener((t => {
    switch (t.name) {
        case "request-data":
            t.onMessage.addListener((async ({
                ids: i
            }) => {
                const s = await g(i);
                t.postMessage(s)
            }));
            break;
        case "convert-id":
            t.onMessage.addListener((i => {
                t.postMessage(c(i))
            }))
    }
})), chrome.contextMenus.create({
    title: "steamID      - STEAM_X:Y:ZZZZ",
    id: "id",
    contexts: ["link"],
    targetUrlPatterns: ["https://steamcommunity.com/id/*", "https://steamcommunity.com/profiles/*", "https://backpack.tf/u/*"]
}), chrome.contextMenus.create({
    title: "steamID3    - [U:1:YYYYYYY]",
    id: "id-32-bit",
    contexts: ["link"],
    targetUrlPatterns: ["https://steamcommunity.com/id/*", "https://steamcommunity.com/profiles/*", "https://backpack.tf/u/*"]
}), chrome.contextMenus.create({
    title: "steamID64  - 7656119XXXXXXXXXX",
    id: "id-64-bit",
    contexts: ["link"],
    targetUrlPatterns: ["https://steamcommunity.com/id/*", "https://steamcommunity.com/profiles/*", "https://backpack.tf/u/*"]
}), chrome.contextMenus.onClicked.addListener((async ({
    menuItemId: t,
    linkUrl: i
}) => {
    const s = i.match(/(?:profiles|id|u)\/(?<id>[^\/?]+)/).groups.id;
    const e = await g([s]);
    u(await async function(t, i) {
        const {
            idsSourceMod: s = _.idsSourceMod,
            flag: e = _.flag
        } = await p("sync"), h = [t[i]], {
            isGenerate: a
        } = s.find((t => t.idType === i));
        var n;
        return a && ("" !== e && h.push(e), h.push(`// ${(n=t).personaname} ( https://steamcommunity.com/profiles/${n.steamid} )`)), h.join(" ")
    }(e[0], t))
}));