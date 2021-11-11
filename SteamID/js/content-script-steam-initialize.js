var t, i = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
    e = {},
    s = {
        exports: {}
    };
t = s,
    function(i) {
        function e(t, i) {
            return this instanceof e ? (this._low = 0, this._high = 0, this.remainder = null, void 0 === i ? n.call(this, t) : "string" == typeof t ? a.call(this, t, i) : void s.call(this, t, i)) : new e(t, i)
        }

        function s(t, i) {
            return this._low = 0 | t, this._high = 0 | i, this
        }

        function n(t) {
            return this._low = 65535 & t, this._high = t >>> 16, this
        }

        function a(t, i) {
            var e = parseInt(t, i || 10);
            return this._low = 65535 & e, this._high = e >>> 16, this
        }
        e(Math.pow(36, 5)), e(Math.pow(16, 7)), e(Math.pow(10, 9)), e(Math.pow(2, 30)), e(36), e(16), e(10), e(2), e.prototype.fromBits = s, e.prototype.fromNumber = n, e.prototype.fromString = a, e.prototype.toNumber = function() {
            return 65536 * this._high + this._low
        }, e.prototype.toString = function(t) {
            return this.toNumber().toString(t || 10)
        }, e.prototype.add = function(t) {
            var i = this._low + t._low,
                e = i >>> 16;
            return e += this._high + t._high, this._low = 65535 & i, this._high = 65535 & e, this
        }, e.prototype.subtract = function(t) {
            return this.add(t.clone().negate())
        }, e.prototype.multiply = function(t) {
            var i, e, s = this._high,
                n = this._low,
                a = t._high,
                h = t._low;
            return i = (e = n * h) >>> 16, i += s * h, i &= 65535, i += n * a, this._low = 65535 & e, this._high = 65535 & i, this
        }, e.prototype.div = function(t) {
            if (0 == t._low && 0 == t._high) throw Error("division by zero");
            if (0 == t._high && 1 == t._low) return this.remainder = new e(0), this;
            if (t.gt(this)) return this.remainder = this.clone(), this._low = 0, this._high = 0, this;
            if (this.eq(t)) return this.remainder = new e(0), this._low = 1, this._high = 0, this;
            for (var i = t.clone(), s = -1; !this.lt(i);) i.shiftLeft(1, !0), s++;
            for (this.remainder = this.clone(), this._low = 0, this._high = 0; s >= 0; s--) i.shiftRight(1), this.remainder.lt(i) || (this.remainder.subtract(i), s >= 16 ? this._high |= 1 << s - 16 : this._low |= 1 << s);
            return this
        }, e.prototype.negate = function() {
            var t = 1 + (65535 & ~this._low);
            return this._low = 65535 & t, this._high = ~this._high + (t >>> 16) & 65535, this
        }, e.prototype.equals = e.prototype.eq = function(t) {
            return this._low == t._low && this._high == t._high
        }, e.prototype.greaterThan = e.prototype.gt = function(t) {
            return this._high > t._high || !(this._high < t._high) && this._low > t._low
        }, e.prototype.lessThan = e.prototype.lt = function(t) {
            return this._high < t._high || !(this._high > t._high) && this._low < t._low
        }, e.prototype.or = function(t) {
            return this._low |= t._low, this._high |= t._high, this
        }, e.prototype.and = function(t) {
            return this._low &= t._low, this._high &= t._high, this
        }, e.prototype.not = function() {
            return this._low = 65535 & ~this._low, this._high = 65535 & ~this._high, this
        }, e.prototype.xor = function(t) {
            return this._low ^= t._low, this._high ^= t._high, this
        }, e.prototype.shiftRight = e.prototype.shiftr = function(t) {
            return t > 16 ? (this._low = this._high >> t - 16, this._high = 0) : 16 == t ? (this._low = this._high, this._high = 0) : (this._low = this._low >> t | this._high << 16 - t & 65535, this._high >>= t), this
        }, e.prototype.shiftLeft = e.prototype.shiftl = function(t, i) {
            return t > 16 ? (this._high = this._low << t - 16, this._low = 0, i || (this._high &= 65535)) : 16 == t ? (this._high = this._low, this._low = 0) : (this._high = this._high << t | this._low >> 16 - t, this._low = this._low << t & 65535, i || (this._high &= 65535)), this
        }, e.prototype.rotateLeft = e.prototype.rotl = function(t) {
            var i = this._high << 16 | this._low;
            return i = i << t | i >>> 32 - t, this._low = 65535 & i, this._high = i >>> 16, this
        }, e.prototype.rotateRight = e.prototype.rotr = function(t) {
            var i = this._high << 16 | this._low;
            return i = i >>> t | i << 32 - t, this._low = 65535 & i, this._high = i >>> 16, this
        }, e.prototype.clone = function() {
            return new e(this._low, this._high)
        }, t.exports ? t.exports = e : i.UINT32 = e
    }(i);
var n = {
    exports: {}
};
! function(t) {
    ! function(i) {
        var e = {
                16: n(Math.pow(16, 5)),
                10: n(Math.pow(10, 5)),
                2: n(Math.pow(2, 5))
            },
            s = {
                16: n(16),
                10: n(10),
                2: n(2)
            };

        function n(t, i, e, s) {
            return this instanceof n ? (this.remainder = null, "string" == typeof t ? r.call(this, t, i) : void 0 === i ? h.call(this, t) : void a.apply(this, arguments)) : new n(t, i, e, s)
        }

        function a(t, i, e, s) {
            return void 0 === e ? (this._a00 = 65535 & t, this._a16 = t >>> 16, this._a32 = 65535 & i, this._a48 = i >>> 16, this) : (this._a00 = 0 | t, this._a16 = 0 | i, this._a32 = 0 | e, this._a48 = 0 | s, this)
        }

        function h(t) {
            return this._a00 = 65535 & t, this._a16 = t >>> 16, this._a32 = 0, this._a48 = 0, this
        }

        function r(t, i) {
            i = i || 10, this._a00 = 0, this._a16 = 0, this._a32 = 0, this._a48 = 0;
            for (var s = e[i] || new n(Math.pow(i, 5)), a = 0, h = t.length; a < h; a += 5) {
                var r = Math.min(5, h - a),
                    o = parseInt(t.slice(a, a + r), i);
                this.multiply(r < 5 ? new n(Math.pow(i, r)) : s).add(new n(o))
            }
            return this
        }
        n.prototype.fromBits = a, n.prototype.fromNumber = h, n.prototype.fromString = r, n.prototype.toNumber = function() {
            return 65536 * this._a16 + this._a00
        }, n.prototype.toString = function(t) {
            var i = s[t = t || 10] || new n(t);
            if (!this.gt(i)) return this.toNumber().toString(t);
            for (var e = this.clone(), a = new Array(64), h = 63; h >= 0 && (e.div(i), a[h] = e.remainder.toNumber().toString(t), e.gt(i)); h--);
            return a[h - 1] = e.toNumber().toString(t), a.join("")
        }, n.prototype.add = function(t) {
            var i = this._a00 + t._a00,
                e = i >>> 16,
                s = (e += this._a16 + t._a16) >>> 16,
                n = (s += this._a32 + t._a32) >>> 16;
            return n += this._a48 + t._a48, this._a00 = 65535 & i, this._a16 = 65535 & e, this._a32 = 65535 & s, this._a48 = 65535 & n, this
        }, n.prototype.subtract = function(t) {
            return this.add(t.clone().negate())
        }, n.prototype.multiply = function(t) {
            var i = this._a00,
                e = this._a16,
                s = this._a32,
                n = this._a48,
                a = t._a00,
                h = t._a16,
                r = t._a32,
                o = i * a,
                _ = o >>> 16,
                c = (_ += i * h) >>> 16;
            _ &= 65535, c += (_ += e * a) >>> 16;
            var p = (c += i * r) >>> 16;
            return c &= 65535, p += (c += e * h) >>> 16, c &= 65535, p += (c += s * a) >>> 16, p += i * t._a48, p &= 65535, p += e * r, p &= 65535, p += s * h, p &= 65535, p += n * a, this._a00 = 65535 & o, this._a16 = 65535 & _, this._a32 = 65535 & c, this._a48 = 65535 & p, this
        }, n.prototype.div = function(t) {
            if (0 == t._a16 && 0 == t._a32 && 0 == t._a48) {
                if (0 == t._a00) throw Error("division by zero");
                if (1 == t._a00) return this.remainder = new n(0), this
            }
            if (t.gt(this)) return this.remainder = this.clone(), this._a00 = 0, this._a16 = 0, this._a32 = 0, this._a48 = 0, this;
            if (this.eq(t)) return this.remainder = new n(0), this._a00 = 1, this._a16 = 0, this._a32 = 0, this._a48 = 0, this;
            for (var i = t.clone(), e = -1; !this.lt(i);) i.shiftLeft(1, !0), e++;
            for (this.remainder = this.clone(), this._a00 = 0, this._a16 = 0, this._a32 = 0, this._a48 = 0; e >= 0; e--) i.shiftRight(1), this.remainder.lt(i) || (this.remainder.subtract(i), e >= 48 ? this._a48 |= 1 << e - 48 : e >= 32 ? this._a32 |= 1 << e - 32 : e >= 16 ? this._a16 |= 1 << e - 16 : this._a00 |= 1 << e);
            return this
        }, n.prototype.negate = function() {
            var t = 1 + (65535 & ~this._a00);
            return this._a00 = 65535 & t, t = (65535 & ~this._a16) + (t >>> 16), this._a16 = 65535 & t, t = (65535 & ~this._a32) + (t >>> 16), this._a32 = 65535 & t, this._a48 = ~this._a48 + (t >>> 16) & 65535, this
        }, n.prototype.equals = n.prototype.eq = function(t) {
            return this._a48 == t._a48 && this._a00 == t._a00 && this._a32 == t._a32 && this._a16 == t._a16
        }, n.prototype.greaterThan = n.prototype.gt = function(t) {
            return this._a48 > t._a48 || !(this._a48 < t._a48) && (this._a32 > t._a32 || !(this._a32 < t._a32) && (this._a16 > t._a16 || !(this._a16 < t._a16) && this._a00 > t._a00))
        }, n.prototype.lessThan = n.prototype.lt = function(t) {
            return this._a48 < t._a48 || !(this._a48 > t._a48) && (this._a32 < t._a32 || !(this._a32 > t._a32) && (this._a16 < t._a16 || !(this._a16 > t._a16) && this._a00 < t._a00))
        }, n.prototype.or = function(t) {
            return this._a00 |= t._a00, this._a16 |= t._a16, this._a32 |= t._a32, this._a48 |= t._a48, this
        }, n.prototype.and = function(t) {
            return this._a00 &= t._a00, this._a16 &= t._a16, this._a32 &= t._a32, this._a48 &= t._a48, this
        }, n.prototype.xor = function(t) {
            return this._a00 ^= t._a00, this._a16 ^= t._a16, this._a32 ^= t._a32, this._a48 ^= t._a48, this
        }, n.prototype.not = function() {
            return this._a00 = 65535 & ~this._a00, this._a16 = 65535 & ~this._a16, this._a32 = 65535 & ~this._a32, this._a48 = 65535 & ~this._a48, this
        }, n.prototype.shiftRight = n.prototype.shiftr = function(t) {
            return (t %= 64) >= 48 ? (this._a00 = this._a48 >> t - 48, this._a16 = 0, this._a32 = 0, this._a48 = 0) : t >= 32 ? (t -= 32, this._a00 = 65535 & (this._a32 >> t | this._a48 << 16 - t), this._a16 = this._a48 >> t & 65535, this._a32 = 0, this._a48 = 0) : t >= 16 ? (t -= 16, this._a00 = 65535 & (this._a16 >> t | this._a32 << 16 - t), this._a16 = 65535 & (this._a32 >> t | this._a48 << 16 - t), this._a32 = this._a48 >> t & 65535, this._a48 = 0) : (this._a00 = 65535 & (this._a00 >> t | this._a16 << 16 - t), this._a16 = 65535 & (this._a16 >> t | this._a32 << 16 - t), this._a32 = 65535 & (this._a32 >> t | this._a48 << 16 - t), this._a48 = this._a48 >> t & 65535), this
        }, n.prototype.shiftLeft = n.prototype.shiftl = function(t, i) {
            return (t %= 64) >= 48 ? (this._a48 = this._a00 << t - 48, this._a32 = 0, this._a16 = 0, this._a00 = 0) : t >= 32 ? (t -= 32, this._a48 = this._a16 << t | this._a00 >> 16 - t, this._a32 = this._a00 << t & 65535, this._a16 = 0, this._a00 = 0) : t >= 16 ? (t -= 16, this._a48 = this._a32 << t | this._a16 >> 16 - t, this._a32 = 65535 & (this._a16 << t | this._a00 >> 16 - t), this._a16 = this._a00 << t & 65535, this._a00 = 0) : (this._a48 = this._a48 << t | this._a32 >> 16 - t, this._a32 = 65535 & (this._a32 << t | this._a16 >> 16 - t), this._a16 = 65535 & (this._a16 << t | this._a00 >> 16 - t), this._a00 = this._a00 << t & 65535), i || (this._a48 &= 65535), this
        }, n.prototype.rotateLeft = n.prototype.rotl = function(t) {
            if (0 == (t %= 64)) return this;
            if (t >= 32) {
                var i = this._a00;
                if (this._a00 = this._a32, this._a32 = i, i = this._a48, this._a48 = this._a16, this._a16 = i, 32 == t) return this;
                t -= 32
            }
            var e = this._a48 << 16 | this._a32,
                s = this._a16 << 16 | this._a00,
                n = e << t | s >>> 32 - t,
                a = s << t | e >>> 32 - t;
            return this._a00 = 65535 & a, this._a16 = a >>> 16, this._a32 = 65535 & n, this._a48 = n >>> 16, this
        }, n.prototype.rotateRight = n.prototype.rotr = function(t) {
            if (0 == (t %= 64)) return this;
            if (t >= 32) {
                var i = this._a00;
                if (this._a00 = this._a32, this._a32 = i, i = this._a48, this._a48 = this._a16, this._a16 = i, 32 == t) return this;
                t -= 32
            }
            var e = this._a48 << 16 | this._a32,
                s = this._a16 << 16 | this._a00,
                n = e >>> t | s << 32 - t,
                a = s >>> t | e << 32 - t;
            return this._a00 = 65535 & a, this._a16 = a >>> 16, this._a32 = 65535 & n, this._a48 = n >>> 16, this
        }, n.prototype.clone = function() {
            return new n(this._a00, this._a16, this._a32, this._a48)
        }, t.exports ? t.exports = n : i.UINT64 = n
    }(i)
}(n), e.UINT32 = s.exports, e.UINT64 = n.exports;
var a = r,
    h = e.UINT64;

function r(t) {
    var i;
    if (this.universe = r.Universe.INVALID, this.type = r.Type.INVALID, this.instance = r.Instance.ALL, this.accountid = 0, t)
        if (i = t.match(/^STEAM_([0-5]):([0-1]):([0-9]+)$/)) this.universe = parseInt(i[1], 10) || r.Universe.PUBLIC, this.type = r.Type.INDIVIDUAL, this.instance = r.Instance.DESKTOP, this.accountid = 2 * parseInt(i[3], 10) + parseInt(i[2], 10);
        else if (i = t.match(/^\[([a-zA-Z]):([0-5]):([0-9]+)(:[0-9]+)?\]$/)) {
        this.universe = parseInt(i[2], 10), this.accountid = parseInt(i[3], 10);
        var e = i[1];
        i[4] ? this.instance = parseInt(i[4].substring(1), 10) : "U" == e && (this.instance = r.Instance.DESKTOP), "c" == e ? (this.instance |= r.ChatInstanceFlags.Clan, this.type = r.Type.CHAT) : "L" == e ? (this.instance |= r.ChatInstanceFlags.Lobby, this.type = r.Type.CHAT) : this.type = function(t) {
            for (var i in r.TypeChars)
                if (r.TypeChars[i] == t) return parseInt(i, 10);
            return r.Type.INVALID
        }(e)
    } else {
        if (isNaN(t)) throw new Error('Unknown SteamID input format "' + t + '"');
        var s = new h(t, 10);
        this.accountid = (4294967295 & s.toNumber()) >>> 0, this.instance = 1048575 & s.shiftRight(32).toNumber(), this.type = 15 & s.shiftRight(20).toNumber(), this.universe = s.shiftRight(4).toNumber()
    }
}

function o(t) {
    ["universe", "type", "instance", "accountid"].forEach((function(i) {
        var e = parseInt(t[i], 10);
        isNaN(e) || (t[i] = e)
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
    var e = new r;
    return e.universe = r.Universe.PUBLIC, e.type = r.Type.INDIVIDUAL, e.instance = r.Instance.DESKTOP, e.accountid = i, e
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
    return o(this), new h(this.accountid, this.universe << 24 | this.type << 20 | this.instance).toString()
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
    },
    c = {
        id: "steamID",
        "id-32-bit": "steamID3",
        "id-64-bit": "steamID64"
    };

function p(t) {
    return t.match(/(?:profiles|id|u)\/(?<id>[^\/?]+)/).groups.id
}

function u({
    data: t,
    idDest: i
}) {
    const e = new a(t.steamid);
    switch (i) {
        case "id":
            return e.getSteam2RenderedID();
        case "id-32-bit":
            return e.getSteam3RenderedID();
        case "id-64-bit":
            return e.getSteamID64()
    }
}
async function l(t) {
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
async function d(t, i) {
    const {
        idsSourceMod: e = _.idsSourceMod,
        flag: s = _.flag
    } = await async function(t, i) {
        return new Promise((e => {
            chrome.storage[t].get(i, (t => {
                e(i ? t[i] : t)
            }))
        }))
    }("sync"), n = [t[i]], {
        isGenerate: a
    } = e.find((t => t.idType === i));
    var h;
    return a && ("" !== s && n.push(s), n.push()), n.join(" ")
}
async function y() {
    const t = await async function() {
        const t = p(location.href),
            i = chrome.runtime.connect({
                name: "request-data"
            });
        i.postMessage({
            ids: [t]
        });
        return (await new Promise((t => {
            i.onMessage.addListener(t)
        })))[0]
    }();
    var i;
    ! function({
        ids: t,
        isPrivate: i
    }) {
        let e = document.querySelector(".profile_item_links, .profile_content_rightcol");
        i && (document.querySelector(".profile_content").innerHTML += '\n<div class="profile_content_inner">\n  <div class="profile_leftcol">&nbsp;</div>\n  <div class="profile_rightcol"></div>\n</div>\n  ', e = document.querySelector(".profile_rightcol"));
        const s = document.createElement("div"),
            n = Boolean(document.querySelector(".profile_ban_status"));
        i || n ? e.append(s) : e.insertBefore(s, e.firstElementChild);
        s.classList.add("steam-ids"), s.innerHTML = (a = t, `\n    <table>\n      ${a.map((t=>`\n        <tr>\n            <td class="steam-ids__id-name">${c[t.idType]}</td>\n            <td>\n              <a class="steam-ids__id-copy whiteLink" data-id-type="${t.idType}">\n                ${t.id}\n              </a>\n              \x3c!-- .whiteLink is provided by Steam --\x3e\n            </td>\n        </tr>\n    `)).join("")}\n</table>\n    `), requestAnimationFrame((() => {
            requestAnimationFrame((() => {
                s.classList.add("steam-ids--visible")
            }))
        }));
        var a
    }({
        ids: function(t) {
            return ["id", "id-32-bit", "id-64-bit"].map((i => ({
                idType: i,
                id: u({
                    data: t,
                    idDest: i
                })
            })))
        }(t),
        isPrivate: 3 !== t.communityvisibilitystate
    }), i = t, document.querySelector(".steam-ids").addEventListener("click", (async ({
        target: t
    }) => {
        t.classList.contains("steam-ids__id-copy") && (l(await d(i, t.dataset.idType)), t.style.transition = "0.25s color", t.style.color = "lime", setTimeout((() => {
            t.style.color = ""
        }), 700))
    }))
}

function f(t) {
    const i = document.createDocumentFragment();
    i.append(m("steamID", "id"), m("steamID3", "id-32-bit"), m("steamID64", "id-64-bit"));
    const {
        nextElementSibling: e
    } = function(t) {
        const i = document.querySelectorAll(t);
        return i[i.length - 1]
    }(".manage_action");
    t.insertBefore(i, e)
}

function m(t, i) {
    const e = document.createElement("span");
    return e.classList.add("manage_action", "btnv6_lightblue_blue", "btn_medium", "steam-button-copy-ids"), e.innerHTML = `<span>${t}</span>`, e.dataset.copyId = i, e.addEventListener("click", g), e
}
async function g({
    target: t
}) {
    const i = Array.from(document.querySelectorAll(".select_friend_checkbox:checked"));
    if (!(i.length > 0)) return void
    function() {
        const t = document.createElement("script");
        t.textContent = `(${()=>{ExecFriendAction("","friends/all")}})()`, document.head.append(t)
    }();
    const e = await async function(t) {
        function i(t) {
            return p((t = t.closest(".selectable")).querySelector(".selectable_overlay").href)
        }
        const e = t.map(i),
            s = chrome.runtime.connect({
                name: "request-data"
            });
        return s.postMessage({
            ids: e
        }), new Promise((t => {
            s.onMessage.addListener(t)
        }))
    }(i);
    l(await async function({
            usersData: t,
            idType: i
        }) {
            return (await Promise.all(t.map((t => d(t, i))))).join("\n")
        }({
            usersData: e,
            idType: t.dataset.copyId
        })),
        function(t, i) {
            const e = "steam-button-copy-ids";
            t.classList.contains(e) || (t = t.parentElement);
            t.classList.add(`${e}--active`), t.classList.add(`${e}--${i}`), setTimeout((() => {
                t.classList.remove(`${e}--active`), setTimeout((() => {
                    t.classList.remove(`${e}--${i}`)
                }), 300)
            }), 600)
        }(t, "success")
}

function I(t) {
    return Boolean(document.querySelector({
        user: ".playerAvatarAutoSizeInner",
        friendsManager: ".friends_content"
    } [t]))
}!async function() {
    I("user") ? await y() : I("friendsManager") && function() {
        const t = document.querySelector(".friends_content"),
            i = () => document.querySelector(".manage_action").parentElement;
        f(i()), new MutationObserver((t => {
            "friends_list" === t[0].target.firstElementChild.id && f(i())
        })).observe(t, {
            attributes: !0,
            attributeFilter: ["class"]
        })
    }()
}();