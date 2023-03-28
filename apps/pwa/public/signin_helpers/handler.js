/*! @license Firebase v3.7.5
    Build: 3.7.5-rc.1
    Terms: https://firebase.google.com/terms/ */
var firebase = null
;(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var aa = function (a) {
      var b = 0
      return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 }
      }
    },
    ba =
      'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a
            a[b] = c.value
            return a
          },
    ca = function (a) {
      a = [
        'object' == typeof globalThis && globalThis,
        a,
        'object' == typeof window && window,
        'object' == typeof self && self,
        'object' == typeof global && global,
      ]
      for (var b = 0; b < a.length; ++b) {
        var c = a[b]
        if (c && c.Math == Math) return c
      }
      throw Error('Cannot find global object')
    },
    da = ca(this),
    ea = function (a, b) {
      if (b)
        a: {
          var c = da
          a = a.split('.')
          for (var d = 0; d < a.length - 1; d++) {
            var e = a[d]
            if (!(e in c)) break a
            c = c[e]
          }
          a = a[a.length - 1]
          d = c[a]
          b = b(d)
          b != d && null != b && ba(c, a, { configurable: !0, writable: !0, value: b })
        }
    }
  ea('Symbol', function (a) {
    if (a) return a
    var b = function (g, k) {
      this.X = g
      ba(this, 'description', { configurable: !0, writable: !0, value: k })
    }
    b.prototype.toString = function () {
      return this.X
    }
    var c = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
      d = 0,
      e = function (g) {
        if (this instanceof e) throw new TypeError('Symbol is not a constructor')
        return new b(c + (g || '') + '_' + d++, g)
      }
    return e
  })
  var fa = function (a) {
      var b = 'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator]
      if (b) return b.call(a)
      if ('number' == typeof a.length) return { next: aa(a) }
      throw Error(String(a) + ' is not an iterable or ArrayLike')
    },
    ha = function () {
      for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c]
      return b
    },
    l = this || self,
    ia = function (a, b, c) {
      return a.call.apply(a.bind, arguments)
    },
    ja = function (a, b, c) {
      if (!a) throw Error()
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2)
        return function () {
          var e = Array.prototype.slice.call(arguments)
          Array.prototype.unshift.apply(e, d)
          return a.apply(b, e)
        }
      }
      return function () {
        return a.apply(b, arguments)
      }
    },
    m = function (a, b, c) {
      m =
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf('native code')
          ? ia
          : ja
      return m.apply(null, arguments)
    },
    ka = function (a, b) {
      var c = Array.prototype.slice.call(arguments, 1)
      return function () {
        var d = c.slice()
        d.push.apply(d, arguments)
        return a.apply(this, d)
      }
    },
    p = function (a, b) {
      function c() {}
      c.prototype = b.prototype
      a.ja = b.prototype
      a.prototype = new c()
      a.prototype.constructor = a
      a.base = function (d, e, g) {
        for (var k = Array(arguments.length - 2), f = 2; f < arguments.length; f++)
          k[f - 2] = arguments[f]
        return b.prototype[e].apply(d, k)
      }
    }
  function t(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, t)
    else {
      var c = Error().stack
      c && (this.stack = c)
    }
    a && (this.message = String(a))
    void 0 !== b && (this.cause = b)
  }
  p(t, Error)
  t.prototype.name = 'CustomError'
  function u(a, b) {
    a = a.split('%s')
    for (var c = '', d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : '%s')
    t.call(this, c + a[d])
  }
  p(u, t)
  u.prototype.name = 'AssertionError'
  function v(a, b, c, d) {
    var e = 'Assertion failed'
    if (c) {
      e += ': ' + c
      var g = d
    } else a && ((e += ': ' + a), (g = b))
    throw new u('' + e, g || [])
  }
  var w = function (a, b, c) {
      a || v('', null, b, Array.prototype.slice.call(arguments, 2))
    },
    la = function (a, b, c) {
      null == a && v('Expected to exist: %s.', [a], b, Array.prototype.slice.call(arguments, 2))
      return a
    },
    x = function (a, b, c) {
      if ('function' !== typeof a) {
        var d = typeof a
        d = 'object' != d ? d : a ? (Array.isArray(a) ? 'array' : d) : 'null'
        v('Expected function but got %s: %s.', [d, a], b, Array.prototype.slice.call(arguments, 2))
      }
    }
  var y = function (a, b) {
    this.da = 100
    this.Y = a
    this.ea = b
    this.F = 0
    this.D = null
  }
  y.prototype.get = function () {
    if (0 < this.F) {
      this.F--
      var a = this.D
      this.D = a.next
      a.next = null
    } else a = this.Y()
    return a
  }
  y.prototype.put = function (a) {
    this.ea(a)
    this.F < this.da && (this.F++, (a.next = this.D), (this.D = a))
  }
  var z, A
  a: {
    for (var ma = ['CLOSURE_FLAGS'], B = l, C = 0; C < ma.length; C++)
      if (((B = B[ma[C]]), null == B)) {
        A = null
        break a
      }
    A = B
  }
  var na = A && A[610401301]
  z = null != na ? na : !1
  function D() {
    var a = l.navigator
    return a && (a = a.userAgent) ? a : ''
  }
  var E,
    oa = l.navigator
  E = oa ? oa.userAgentData || null : null
  function F(a) {
    return -1 != D().indexOf(a)
  }
  function G() {
    return z ? !!E && 0 < E.brands.length : !1
  }
  function pa() {
    return G() ? !1 : F('Trident') || F('MSIE')
  }
  function H() {
    return z ? !!E && !!E.platform : !1
  }
  function qa() {
    return F('iPhone') && !F('iPod') && !F('iPad')
  }
  G() || F('Opera')
  pa()
  F('Edge')
  !F('Gecko') ||
    (-1 != D().toLowerCase().indexOf('webkit') && !F('Edge')) ||
    F('Trident') ||
    F('MSIE') ||
    F('Edge')
  ;-1 != D().toLowerCase().indexOf('webkit') && !F('Edge') && F('Mobile')
  H() || F('Macintosh')
  H() || F('Windows')
  ;(H() ? 'Linux' === E.platform : F('Linux')) || H() || F('CrOS')
  var ra = l.navigator || null
  ra && (ra.appVersion || '').indexOf('X11')
  H() || F('Android')
  qa()
  F('iPad')
  F('iPod')
  qa() || F('iPad') || F('iPod')
  D().toLowerCase().indexOf('kaios')
  var I = function () {}
  var sa = function () {
    var a = document
    var b = 'IFRAME'
    'application/xhtml+xml' === a.contentType && (b = b.toLowerCase())
    return a.createElement(b)
  }
  var K,
    ta = function () {
      var a = l.MessageChannel
      'undefined' === typeof a &&
        'undefined' !== typeof window &&
        window.postMessage &&
        window.addEventListener &&
        !F('Presto') &&
        (a = function () {
          var e = sa()
          e.style.display = 'none'
          document.documentElement.appendChild(e)
          var g = e.contentWindow
          e = g.document
          e.open()
          e.close()
          var k = 'callImmediate' + Math.random(),
            f = 'file:' == g.location.protocol ? '*' : g.location.protocol + '//' + g.location.host
          e = m(function (h) {
            if (('*' == f || h.origin == f) && h.data == k) this.port1.onmessage()
          }, this)
          g.addEventListener('message', e, !1)
          this.port1 = {}
          this.port2 = {
            postMessage: function () {
              g.postMessage(k, f)
            },
          }
        })
      if ('undefined' !== typeof a && !pa()) {
        var b = new a(),
          c = {},
          d = c
        b.port1.onmessage = function () {
          if (void 0 !== c.next) {
            c = c.next
            var e = c.P
            c.P = null
            e()
          }
        }
        return function (e) {
          d.next = { P: e }
          d = d.next
          b.port2.postMessage(0)
        }
      }
      return function (e) {
        l.setTimeout(e, 0)
      }
    }
  function ua(a) {
    l.setTimeout(function () {
      throw a
    }, 0)
  }
  var L = function () {
    this.G = this.o = null
  }
  L.prototype.add = function (a, b) {
    var c = va.get()
    c.set(a, b)
    this.G ? (this.G.next = c) : (w(!this.o), (this.o = c))
    this.G = c
  }
  L.prototype.remove = function () {
    var a = null
    this.o && ((a = this.o), (this.o = this.o.next), this.o || (this.G = null), (a.next = null))
    return a
  }
  var va = new y(
      function () {
        return new M()
      },
      function (a) {
        return a.reset()
      }
    ),
    M = function () {
      this.next = this.scope = this.I = null
    }
  M.prototype.set = function (a, b) {
    this.I = a
    this.scope = b
    this.next = null
  }
  M.prototype.reset = function () {
    this.next = this.scope = this.I = null
  }
  var wa = l.console && l.console.createTask ? l.console.createTask.bind(l.console) : void 0,
    xa = wa ? Symbol('consoleTask') : void 0
  function ya(a, b) {
    function c() {
      var e = ha.apply(0, arguments),
        g = this
      return d.run(function () {
        var k = a.call,
          f = k.apply,
          h = [g],
          n = h.concat
        if (e instanceof Array) var q = e
        else {
          q = fa(e)
          for (var J, r = []; !(J = q.next()).done; ) r.push(J.value)
          q = r
        }
        return f.call(k, a, n.call(h, q))
      })
    }
    b = void 0 === b ? 'anonymous' : b
    if (!wa || a[la(xa)]) return a
    var d = wa(a.name || b)
    c[la(xa)] = d
    return c
  }
  var N,
    za = !1,
    Aa = new L(),
    O = function (a, b) {
      N || Ba()
      za || (N(), (za = !0))
      a = ya(a, 'goog.async.run')
      Aa.add(a, b)
    },
    Ba = function () {
      if (l.Promise && l.Promise.resolve) {
        var a = l.Promise.resolve(void 0)
        N = function () {
          a.then(Ca)
        }
      } else
        N = function () {
          var b = Ca
          'function' !== typeof l.setImmediate ||
          (l.Window &&
            l.Window.prototype &&
            (G() || !F('Edge')) &&
            l.Window.prototype.setImmediate == l.setImmediate)
            ? (K || (K = ta()), K(b))
            : l.setImmediate(b)
        }
    },
    Ca = function () {
      for (var a; (a = Aa.remove()); ) {
        try {
          a.I.call(a.scope)
        } catch (b) {
          ua(b)
        }
        va.put(a)
      }
      za = !1
    }
  var R = function (a, b) {
      this.g = 0
      this.V = void 0
      this.s = this.i = this.m = null
      this.B = this.H = !1
      if (a != I)
        try {
          var c = this
          a.call(
            b,
            function (d) {
              P(c, 2, d)
            },
            function (d) {
              if (!(d instanceof Q))
                try {
                  if (d instanceof Error) throw d
                  throw Error('Promise rejected.')
                } catch (e) {}
              P(c, 3, d)
            }
          )
        } catch (d) {
          P(this, 3, d)
        }
    },
    Da = function () {
      this.next = this.context = this.u = this.l = this.child = null
      this.v = !1
    }
  Da.prototype.reset = function () {
    this.context = this.u = this.l = this.child = null
    this.v = !1
  }
  var Ea = new y(
      function () {
        return new Da()
      },
      function (a) {
        a.reset()
      }
    ),
    Fa = function (a, b, c) {
      var d = Ea.get()
      d.l = a
      d.u = b
      d.context = c
      return d
    },
    Ha = function (a, b, c) {
      Ga(a, b, c, null) || O(ka(b, a))
    }
  R.prototype.then = function (a, b, c) {
    null != a && x(a, 'opt_onFulfilled should be a function.')
    null != b &&
      x(
        b,
        'opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?'
      )
    return Ia(this, 'function' === typeof a ? a : null, 'function' === typeof b ? b : null, c)
  }
  R.prototype.$goog_Thenable = !0
  R.prototype.W = function (a, b) {
    return Ia(this, null, a, b)
  }
  R.prototype.catch = R.prototype.W
  R.prototype.cancel = function (a) {
    if (0 == this.g) {
      var b = new Q(a)
      O(function () {
        Ja(this, b)
      }, this)
    }
  }
  var Ja = function (a, b) {
      if (0 == a.g)
        if (a.m) {
          var c = a.m
          if (c.i) {
            for (
              var d = 0, e = null, g = null, k = c.i;
              k && (k.v || (d++, k.child == a && (e = k), !(e && 1 < d)));
              k = k.next
            )
              e || (g = k)
            e &&
              (0 == c.g && 1 == d
                ? Ja(c, b)
                : (g
                    ? ((d = g),
                      w(c.i),
                      w(null != d),
                      d.next == c.s && (c.s = d),
                      (d.next = d.next.next))
                    : Ka(c),
                  La(c, e, 3, b)))
          }
          a.m = null
        } else P(a, 3, b)
    },
    Na = function (a, b) {
      a.i || (2 != a.g && 3 != a.g) || Ma(a)
      w(null != b.l)
      a.s ? (a.s.next = b) : (a.i = b)
      a.s = b
    },
    Ia = function (a, b, c, d) {
      b && (b = ya(b, 'goog.Promise.then'))
      c && (c = ya(c, 'goog.Promise.then'))
      var e = Fa(null, null, null)
      e.child = new R(function (g, k) {
        e.l = b
          ? function (f) {
              try {
                var h = b.call(d, f)
                g(h)
              } catch (n) {
                k(n)
              }
            }
          : g
        e.u = c
          ? function (f) {
              try {
                var h = c.call(d, f)
                void 0 === h && f instanceof Q ? k(f) : g(h)
              } catch (n) {
                k(n)
              }
            }
          : k
      })
      e.child.m = a
      Na(a, e)
      return e.child
    }
  R.prototype.ga = function (a) {
    w(1 == this.g)
    this.g = 0
    P(this, 2, a)
  }
  R.prototype.ha = function (a) {
    w(1 == this.g)
    this.g = 0
    P(this, 3, a)
  }
  var P = function (a, b, c) {
      0 == a.g &&
        (a === c && ((b = 3), (c = new TypeError('Promise cannot resolve to itself'))),
        (a.g = 1),
        Ga(c, a.ga, a.ha, a) ||
          ((a.V = c), (a.g = b), (a.m = null), Ma(a), 3 != b || c instanceof Q || Oa(a, c)))
    },
    Ga = function (a, b, c, d) {
      if (a instanceof R)
        return (
          null != b && x(b, 'opt_onFulfilled should be a function.'),
          null != c &&
            x(
              c,
              'opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?'
            ),
          Na(a, Fa(b || I, c || null, d)),
          !0
        )
      if (a)
        try {
          var e = !!a.$goog_Thenable
        } catch (k) {
          e = !1
        }
      else e = !1
      if (e) return a.then(b, c, d), !0
      e = typeof a
      if (('object' == e && null != a) || 'function' == e)
        try {
          var g = a.then
          if ('function' === typeof g) return Pa(a, g, b, c, d), !0
        } catch (k) {
          return c.call(d, k), !0
        }
      return !1
    },
    Pa = function (a, b, c, d, e) {
      var g = !1,
        k = function (h) {
          g || ((g = !0), c.call(e, h))
        },
        f = function (h) {
          g || ((g = !0), d.call(e, h))
        }
      try {
        b.call(a, k, f)
      } catch (h) {
        f(h)
      }
    },
    Ma = function (a) {
      a.H || ((a.H = !0), O(a.Z, a))
    },
    Ka = function (a) {
      var b = null
      a.i && ((b = a.i), (a.i = b.next), (b.next = null))
      a.i || (a.s = null)
      null != b && w(null != b.l)
      return b
    }
  R.prototype.Z = function () {
    for (var a; (a = Ka(this)); ) La(this, a, this.g, this.V)
    this.H = !1
  }
  var La = function (a, b, c, d) {
      if (3 == c && b.u && !b.v) for (; a && a.B; a = a.m) a.B = !1
      if (b.child) (b.child.m = null), Qa(b, c, d)
      else
        try {
          b.v ? b.l.call(b.context) : Qa(b, c, d)
        } catch (e) {
          Ra.call(null, e)
        }
      Ea.put(b)
    },
    Qa = function (a, b, c) {
      2 == b ? a.l.call(a.context, c) : a.u && a.u.call(a.context, c)
    },
    Oa = function (a, b) {
      a.B = !0
      O(function () {
        a.B && Ra.call(null, b)
      })
    },
    Ra = ua,
    Q = function (a) {
      t.call(this, a)
    }
  p(Q, t)
  Q.prototype.name = 'cancel'
  R.all = function (a) {
    return new R(function (b, c) {
      var d = a.length,
        e = []
      if (d)
        for (
          var g = function (n, q) {
              d--
              e[n] = q
              0 == d && b(e)
            },
            k = function (n) {
              c(n)
            },
            f = 0,
            h;
          f < a.length;
          f++
        )
          (h = a[f]), Ha(h, ka(g, f), k)
      else b(e)
    })
  }
  R.resolve = function (a) {
    if (a instanceof R) return a
    var b = new R(I)
    P(b, 2, a)
    return b
  }
  R.reject = function (a) {
    return new R(function (b, c) {
      c(a)
    })
  }
  R.prototype['catch'] = R.prototype.W
  var Sa = R
  'undefined' !== typeof Promise && (Sa = Promise)
  function S(a, b) {
    if (!(b instanceof Object)) return b
    switch (b.constructor) {
      case Date:
        return new Date(b.getTime())
      case Object:
        void 0 === a && (a = {})
        break
      case Array:
        a = []
        break
      default:
        return b
    }
    for (var c in b) b.hasOwnProperty(c) && (a[c] = S(a[c], b[c]))
    return a
  }
  var Ta = Error.captureStackTrace,
    U = function (a, b) {
      this.code = a
      this.message = b
      if (Ta) Ta(this, T.prototype.create)
      else {
        var c = Error.apply(this, arguments)
        this.name = 'FirebaseError'
        Object.defineProperty(this, 'stack', {
          get: function () {
            return c.stack
          },
        })
      }
    }
  U.prototype = Object.create(Error.prototype)
  U.prototype.constructor = U
  U.prototype.name = 'FirebaseError'
  var T = function (a, b, c) {
    this.service = a
    this.fa = b
    this.errors = c
    this.pattern = /\{\$([^}]+)}/g
  }
  T.prototype.create = function (a, b) {
    void 0 === b && (b = {})
    var c = this.errors[a]
    a = this.service + '/' + a
    c =
      void 0 === c
        ? 'Error'
        : c.replace(this.pattern, function (e, g) {
            e = b[g]
            return void 0 !== e ? e.toString() : '<' + g + '?>'
          })
    c = this.fa + ': ' + c + ' (' + a + ').'
    c = new U(a, c)
    for (var d in b) b.hasOwnProperty(d) && '_' !== d.slice(-1) && (c[d] = b[d])
    return c
  }
  var Ua = Sa
  function Va(a, b) {
    a = new V(a, b)
    return a.subscribe.bind(a)
  }
  var V = function (a, b) {
    var c = this
    this.h = []
    this.U = 0
    this.task = Ua.resolve()
    this.A = !1
    this.K = b
    this.task
      .then(function () {
        a(c)
      })
      .catch(function (d) {
        c.error(d)
      })
  }
  V.prototype.next = function (a) {
    Wa(this, function (b) {
      b.next(a)
    })
  }
  V.prototype.error = function (a) {
    Wa(this, function (b) {
      b.error(a)
    })
    this.close(a)
  }
  V.prototype.complete = function () {
    Wa(this, function (a) {
      a.complete()
    })
    this.close()
  }
  V.prototype.subscribe = function (a, b, c) {
    var d = this
    if (void 0 === a && void 0 === b && void 0 === c) throw Error('Missing Observer.')
    var e = Xa(a) ? a : { next: a, error: b, complete: c }
    void 0 === e.next && (e.next = Ya)
    void 0 === e.error && (e.error = Ya)
    void 0 === e.complete && (e.complete = Ya)
    a = this.ia.bind(this, this.h.length)
    this.A &&
      this.task.then(function () {
        try {
          d.R ? e.error(d.R) : e.complete()
        } catch (g) {}
      })
    this.h.push(e)
    return a
  }
  V.prototype.ia = function (a) {
    void 0 !== this.h &&
      void 0 !== this.h[a] &&
      (delete this.h[a], --this.U, 0 === this.U && void 0 !== this.K && this.K(this))
  }
  var Wa = function (a, b) {
      if (!a.A) for (var c = 0; c < a.h.length; c++) Za(a, c, b)
    },
    Za = function (a, b, c) {
      a.task.then(function () {
        if (void 0 !== a.h && void 0 !== a.h[b])
          try {
            c(a.h[b])
          } catch (d) {
            'undefined' !== typeof console && console.error && console.error(d)
          }
      })
    }
  V.prototype.close = function (a) {
    var b = this
    this.A ||
      ((this.A = !0),
      void 0 !== a && (this.R = a),
      this.task.then(function () {
        b.h = void 0
        b.K = void 0
      }))
  }
  function Xa(a) {
    if ('object' !== typeof a || null === a) return !1
    for (var b = fa(['next', 'error', 'complete']), c = b.next(); !c.done; c = b.next())
      if (((c = c.value), c in a && 'function' === typeof a[c])) return !0
    return !1
  }
  function Ya() {}
  var W = Sa,
    X = function (a, b, c) {
      var d = this
      this.S = c
      this.T = !1
      this.j = {}
      this.J = b
      this.M = S(void 0, a)
      a = 'serviceAccount' in this.M
      ;('credential' in this.M || a) &&
        'undefined' !== typeof console &&
        console.log(
          "The '" +
            (a ? 'serviceAccount' : 'credential') +
            "' property specified in the first argument to initializeApp() is deprecated and will be removed in the next major version. You should instead use the 'firebase-admin' package. See https://firebase.google.com/docs/admin/setup for details on how to get started."
        )
      Object.keys(c.INTERNAL.factories).forEach(function (e) {
        var g = c.INTERNAL.useAsService(d, e)
        null !== g && ((g = d.ba.bind(d, g)), (d[e] = g))
      })
    }
  X.prototype.delete = function () {
    var a = this
    return new W(function (b) {
      Y(a)
      b()
    })
      .then(function () {
        a.S.INTERNAL.removeApp(a.J)
        var b = []
        Object.keys(a.j).forEach(function (c) {
          Object.keys(a.j[c]).forEach(function (d) {
            b.push(a.j[c][d])
          })
        })
        return W.all(
          b
            .filter(function (c) {
              return 'INTERNAL' in c
            })
            .map(function (c) {
              return c.INTERNAL.delete()
            })
        )
      })
      .then(function () {
        a.T = !0
        a.j = {}
      })
  }
  X.prototype.ba = function (a, b) {
    Y(this)
    'undefined' === typeof this.j[a] && (this.j[a] = {})
    var c = b || '[DEFAULT]'
    return 'undefined' === typeof this.j[a][c]
      ? ((b = this.S.INTERNAL.factories[a](this, this.aa.bind(this), b)), (this.j[a][c] = b))
      : this.j[a][c]
  }
  X.prototype.aa = function (a) {
    S(this, a)
  }
  var Y = function (a) {
    a.T && Z('app-deleted', { name: a.J })
  }
  da.Object.defineProperties(X.prototype, {
    name: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        Y(this)
        return this.J
      },
    },
    options: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        Y(this)
        return this.M
      },
    },
  })
  ;(X.prototype.name && X.prototype.options) || X.prototype.delete || console.log('dc')
  function $a() {
    function a(f) {
      f = f || '[DEFAULT]'
      var h = d[f]
      void 0 === h && Z('no-app', { name: f })
      return h
    }
    function b(f, h) {
      Object.keys(e).forEach(function (n) {
        n = c(f, n)
        if (null !== n && g[n]) g[n](h, f)
      })
    }
    function c(f, h) {
      if ('serverAuth' === h) return null
      var n = h
      f = f.options
      'auth' === h &&
        (f.serviceAccount || f.credential) &&
        ((n = 'serverAuth'), 'serverAuth' in e || Z('sa-not-supported'))
      return n
    }
    var d = {},
      e = {},
      g = {},
      k = {
        __esModule: !0,
        initializeApp: function (f, h) {
          void 0 === h
            ? (h = '[DEFAULT]')
            : ('string' !== typeof h || '' === h) && Z('bad-app-name', { name: h + '' })
          void 0 !== d[h] && Z('duplicate-app', { name: h })
          f = new X(f, h, k)
          d[h] = f
          b(f, 'create')
          ;(void 0 != f.INTERNAL && void 0 != f.INTERNAL.getToken) ||
            S(f, {
              INTERNAL: {
                getUid: function () {
                  return null
                },
                getToken: function () {
                  return W.resolve(null)
                },
                addAuthTokenListener: function () {},
                removeAuthTokenListener: function () {},
              },
            })
          return f
        },
        app: a,
        apps: null,
        Promise: W,
        SDK_VERSION: '0.0.0',
        INTERNAL: {
          registerService: function (f, h, n, q, J) {
            e[f] && Z('duplicate-service', { name: f })
            e[f] = J
              ? h
              : function (r, ab) {
                  return h(r, ab, '[DEFAULT]')
                }
            q && (g[f] = q)
            q = function (r) {
              void 0 === r && (r = a())
              'function' !== typeof r[f] && Z('invalid-app-argument', { name: f })
              return r[f]()
            }
            void 0 !== n && S(q, n)
            return (k[f] = q)
          },
          createFirebaseNamespace: $a,
          extendNamespace: function (f) {
            S(k, f)
          },
          createSubscribe: Va,
          ErrorFactory: T,
          removeApp: function (f) {
            b(d[f], 'delete')
            delete d[f]
          },
          factories: e,
          useAsService: c,
          Promise: R,
          deepExtend: S,
        },
      }
    k['default'] = k
    Object.defineProperty(k, 'apps', {
      get: function () {
        return Object.keys(d).map(function (f) {
          return d[f]
        })
      },
    })
    a.App = X
    return k
  }
  function Z(a, b) {
    throw bb.create(a, b)
  }
  var bb = new T('app', 'Firebase', {
    'no-app': "No Firebase App '{$name}' has been created - call Firebase App.initializeApp()",
    'bad-app-name': "Illegal App name: '{$name}",
    'duplicate-app': "Firebase App named '{$name}' already exists",
    'app-deleted': "Firebase App named '{$name}' already deleted",
    'duplicate-service': "Firebase service named '{$name}' already registered",
    'sa-not-supported':
      'Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain',
    'invalid-app-argument':
      'firebase.{$name}() takes either no argument or a Firebase App instance.',
  })
  'undefined' !== typeof firebase && (firebase = $a())
}.call(this))
firebase.SDK_VERSION = '3.7.5'
;(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var l,
    ba = function (a) {
      var b = 0
      return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 }
      }
    },
    ca =
      'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a
            a[b] = c.value
            return a
          },
    da = function (a) {
      a = [
        'object' == typeof globalThis && globalThis,
        a,
        'object' == typeof window && window,
        'object' == typeof self && self,
        'object' == typeof global && global,
      ]
      for (var b = 0; b < a.length; ++b) {
        var c = a[b]
        if (c && c.Math == Math) return c
      }
      throw Error('Cannot find global object')
    },
    ea = da(this),
    fa = function (a, b) {
      if (b)
        a: {
          var c = ea
          a = a.split('.')
          for (var d = 0; d < a.length - 1; d++) {
            var e = a[d]
            if (!(e in c)) break a
            c = c[e]
          }
          a = a[a.length - 1]
          d = c[a]
          b = b(d)
          b != d && null != b && ca(c, a, { configurable: !0, writable: !0, value: b })
        }
    }
  fa('Symbol', function (a) {
    if (a) return a
    var b = function (f, g) {
      this.Ii = f
      ca(this, 'description', { configurable: !0, writable: !0, value: g })
    }
    b.prototype.toString = function () {
      return this.Ii
    }
    var c = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
      d = 0,
      e = function (f) {
        if (this instanceof e) throw new TypeError('Symbol is not a constructor')
        return new b(c + (f || '') + '_' + d++, f)
      }
    return e
  })
  fa('Symbol.iterator', function (a) {
    if (a) return a
    a = Symbol('Symbol.iterator')
    for (
      var b =
          'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(
            ' '
          ),
        c = 0;
      c < b.length;
      c++
    ) {
      var d = ea[b[c]]
      'function' === typeof d &&
        'function' != typeof d.prototype[a] &&
        ca(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return ha(ba(this))
          },
        })
    }
    return a
  })
  var ha = function (a) {
      a = { next: a }
      a[Symbol.iterator] = function () {
        return this
      }
      return a
    },
    ia = function (a) {
      var b = 'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator]
      if (b) return b.call(a)
      if ('number' == typeof a.length) return { next: ba(a) }
      throw Error(String(a) + ' is not an iterable or ArrayLike')
    },
    ja =
      'function' == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () {}
            b.prototype = a
            return new b()
          },
    ka
  if ('function' == typeof Object.setPrototypeOf) ka = Object.setPrototypeOf
  else {
    var la
    a: {
      var ma = { a: !0 },
        na = {}
      try {
        na.__proto__ = ma
        la = na.a
        break a
      } catch (a) {}
      la = !1
    }
    ka = la
      ? function (a, b) {
          a.__proto__ = b
          if (a.__proto__ !== b) throw new TypeError(a + ' is not extensible')
          return a
        }
      : null
  }
  var oa = ka,
    m = function (a, b) {
      a.prototype = ja(b.prototype)
      a.prototype.constructor = a
      if (oa) oa(a, b)
      else
        for (var c in b)
          if ('prototype' != c)
            if (Object.defineProperties) {
              var d = Object.getOwnPropertyDescriptor(b, c)
              d && Object.defineProperty(a, c, d)
            } else a[c] = b[c]
      a.Yb = b.prototype
    },
    pa = function () {
      for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c]
      return b
    }
  fa('Promise', function (a) {
    function b() {
      this.nb = null
    }
    function c(g) {
      return g instanceof e
        ? g
        : new e(function (h) {
            h(g)
          })
    }
    if (a) return a
    b.prototype.Ig = function (g) {
      if (null == this.nb) {
        this.nb = []
        var h = this
        this.Jg(function () {
          h.Yi()
        })
      }
      this.nb.push(g)
    }
    var d = ea.setTimeout
    b.prototype.Jg = function (g) {
      d(g, 0)
    }
    b.prototype.Yi = function () {
      for (; this.nb && this.nb.length; ) {
        var g = this.nb
        this.nb = []
        for (var h = 0; h < g.length; ++h) {
          var k = g[h]
          g[h] = null
          try {
            k()
          } catch (p) {
            this.Pi(p)
          }
        }
      }
      this.nb = null
    }
    b.prototype.Pi = function (g) {
      this.Jg(function () {
        throw g
      })
    }
    var e = function (g) {
      this.R = 0
      this.ma = void 0
      this.vc = []
      this.Eh = !1
      var h = this.qf()
      try {
        g(h.resolve, h.reject)
      } catch (k) {
        h.reject(k)
      }
    }
    e.prototype.qf = function () {
      function g(p) {
        return function (n) {
          k || ((k = !0), p.call(h, n))
        }
      }
      var h = this,
        k = !1
      return { resolve: g(this.Yj), reject: g(this.ng) }
    }
    e.prototype.Yj = function (g) {
      if (g === this) this.ng(new TypeError('A Promise cannot resolve to itself'))
      else if (g instanceof e) this.mk(g)
      else {
        a: switch (typeof g) {
          case 'object':
            var h = null != g
            break a
          case 'function':
            h = !0
            break a
          default:
            h = !1
        }
        h ? this.Xj(g) : this.nh(g)
      }
    }
    e.prototype.Xj = function (g) {
      var h = void 0
      try {
        h = g.then
      } catch (k) {
        this.ng(k)
        return
      }
      'function' == typeof h ? this.nk(h, g) : this.nh(g)
    }
    e.prototype.ng = function (g) {
      this.mi(2, g)
    }
    e.prototype.nh = function (g) {
      this.mi(1, g)
    }
    e.prototype.mi = function (g, h) {
      if (0 != this.R)
        throw Error(
          'Cannot settle(' + g + ', ' + h + '): Promise already settled in state' + this.R
        )
      this.R = g
      this.ma = h
      2 === this.R && this.ek()
      this.aj()
    }
    e.prototype.ek = function () {
      var g = this
      d(function () {
        if (g.Ij()) {
          var h = ea.console
          'undefined' !== typeof h && h.error(g.ma)
        }
      }, 1)
    }
    e.prototype.Ij = function () {
      if (this.Eh) return !1
      var g = ea.CustomEvent,
        h = ea.Event,
        k = ea.dispatchEvent
      if ('undefined' === typeof k) return !0
      'function' === typeof g
        ? (g = new g('unhandledrejection', { cancelable: !0 }))
        : 'function' === typeof h
        ? (g = new h('unhandledrejection', { cancelable: !0 }))
        : ((g = ea.document.createEvent('CustomEvent')),
          g.initCustomEvent('unhandledrejection', !1, !0, g))
      g.promise = this
      g.reason = this.ma
      return k(g)
    }
    e.prototype.aj = function () {
      if (null != this.vc) {
        for (var g = 0; g < this.vc.length; ++g) f.Ig(this.vc[g])
        this.vc = null
      }
    }
    var f = new b()
    e.prototype.mk = function (g) {
      var h = this.qf()
      g.Sd(h.resolve, h.reject)
    }
    e.prototype.nk = function (g, h) {
      var k = this.qf()
      try {
        g.call(h, k.resolve, k.reject)
      } catch (p) {
        k.reject(p)
      }
    }
    e.prototype.then = function (g, h) {
      function k(t, z) {
        return 'function' == typeof t
          ? function (aa) {
              try {
                p(t(aa))
              } catch (nb) {
                n(nb)
              }
            }
          : z
      }
      var p,
        n,
        r = new e(function (t, z) {
          p = t
          n = z
        })
      this.Sd(k(g, p), k(h, n))
      return r
    }
    e.prototype.catch = function (g) {
      return this.then(void 0, g)
    }
    e.prototype.Sd = function (g, h) {
      function k() {
        switch (p.R) {
          case 1:
            g(p.ma)
            break
          case 2:
            h(p.ma)
            break
          default:
            throw Error('Unexpected state: ' + p.R)
        }
      }
      var p = this
      null == this.vc ? f.Ig(k) : this.vc.push(k)
      this.Eh = !0
    }
    e.resolve = c
    e.reject = function (g) {
      return new e(function (h, k) {
        k(g)
      })
    }
    e.race = function (g) {
      return new e(function (h, k) {
        for (var p = ia(g), n = p.next(); !n.done; n = p.next()) c(n.value).Sd(h, k)
      })
    }
    e.all = function (g) {
      var h = ia(g),
        k = h.next()
      return k.done
        ? c([])
        : new e(function (p, n) {
            function r(aa) {
              return function (nb) {
                t[aa] = nb
                z--
                0 == z && p(t)
              }
            }
            var t = [],
              z = 0
            do t.push(void 0), z++, c(k.value).Sd(r(t.length - 1), n), (k = h.next())
            while (!k.done)
          })
    }
    return e
  })
  var ra = function (a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
  }
  fa('WeakMap', function (a) {
    function b() {}
    function c(k) {
      var p = typeof k
      return ('object' === p && null !== k) || 'function' === p
    }
    function d(k) {
      if (!ra(k, f)) {
        var p = new b()
        ca(k, f, { value: p })
      }
    }
    function e(k) {
      var p = Object[k]
      p &&
        (Object[k] = function (n) {
          if (n instanceof b) return n
          Object.isExtensible(n) && d(n)
          return p(n)
        })
    }
    if (
      (function () {
        if (!a || !Object.seal) return !1
        try {
          var k = Object.seal({}),
            p = Object.seal({}),
            n = new a([
              [k, 2],
              [p, 3],
            ])
          if (2 != n.get(k) || 3 != n.get(p)) return !1
          n.delete(k)
          n.set(p, 4)
          return !n.has(k) && 4 == n.get(p)
        } catch (r) {
          return !1
        }
      })()
    )
      return a
    var f = '$jscomp_hidden_' + Math.random()
    e('freeze')
    e('preventExtensions')
    e('seal')
    var g = 0,
      h = function (k) {
        this.Fa = (g += Math.random() + 1).toString()
        if (k) {
          k = ia(k)
          for (var p; !(p = k.next()).done; ) (p = p.value), this.set(p[0], p[1])
        }
      }
    h.prototype.set = function (k, p) {
      if (!c(k)) throw Error('Invalid WeakMap key')
      d(k)
      if (!ra(k, f)) throw Error('WeakMap key fail: ' + k)
      k[f][this.Fa] = p
      return this
    }
    h.prototype.get = function (k) {
      return c(k) && ra(k, f) ? k[f][this.Fa] : void 0
    }
    h.prototype.has = function (k) {
      return c(k) && ra(k, f) && ra(k[f], this.Fa)
    }
    h.prototype.delete = function (k) {
      return c(k) && ra(k, f) && ra(k[f], this.Fa) ? delete k[f][this.Fa] : !1
    }
    return h
  })
  fa('Map', function (a) {
    if (
      (function () {
        if (
          !a ||
          'function' != typeof a ||
          !a.prototype.entries ||
          'function' != typeof Object.seal
        )
          return !1
        try {
          var h = Object.seal({ x: 4 }),
            k = new a(ia([[h, 's']]))
          if (
            's' != k.get(h) ||
            1 != k.size ||
            k.get({ x: 4 }) ||
            k.set({ x: 4 }, 't') != k ||
            2 != k.size
          )
            return !1
          var p = k.entries(),
            n = p.next()
          if (n.done || n.value[0] != h || 's' != n.value[1]) return !1
          n = p.next()
          return n.done || 4 != n.value[0].x || 't' != n.value[1] || !p.next().done ? !1 : !0
        } catch (r) {
          return !1
        }
      })()
    )
      return a
    var b = new WeakMap(),
      c = function (h) {
        this.Tc = {}
        this.ra = f()
        this.size = 0
        if (h) {
          h = ia(h)
          for (var k; !(k = h.next()).done; ) (k = k.value), this.set(k[0], k[1])
        }
      }
    c.prototype.set = function (h, k) {
      h = 0 === h ? 0 : h
      var p = d(this, h)
      p.list || (p.list = this.Tc[p.id] = [])
      p.ha
        ? (p.ha.value = k)
        : ((p.ha = { next: this.ra, hb: this.ra.hb, head: this.ra, key: h, value: k }),
          p.list.push(p.ha),
          (this.ra.hb.next = p.ha),
          (this.ra.hb = p.ha),
          this.size++)
      return this
    }
    c.prototype.delete = function (h) {
      h = d(this, h)
      return h.ha && h.list
        ? (h.list.splice(h.index, 1),
          h.list.length || delete this.Tc[h.id],
          (h.ha.hb.next = h.ha.next),
          (h.ha.next.hb = h.ha.hb),
          (h.ha.head = null),
          this.size--,
          !0)
        : !1
    }
    c.prototype.clear = function () {
      this.Tc = {}
      this.ra = this.ra.hb = f()
      this.size = 0
    }
    c.prototype.has = function (h) {
      return !!d(this, h).ha
    }
    c.prototype.get = function (h) {
      return (h = d(this, h).ha) && h.value
    }
    c.prototype.entries = function () {
      return e(this, function (h) {
        return [h.key, h.value]
      })
    }
    c.prototype.keys = function () {
      return e(this, function (h) {
        return h.key
      })
    }
    c.prototype.values = function () {
      return e(this, function (h) {
        return h.value
      })
    }
    c.prototype.forEach = function (h, k) {
      for (var p = this.entries(), n; !(n = p.next()).done; )
        (n = n.value), h.call(k, n[1], n[0], this)
    }
    c.prototype[Symbol.iterator] = c.prototype.entries
    var d = function (h, k) {
        var p = k && typeof k
        'object' == p || 'function' == p
          ? b.has(k)
            ? (p = b.get(k))
            : ((p = '' + ++g), b.set(k, p))
          : (p = 'p_' + k)
        var n = h.Tc[p]
        if (n && ra(h.Tc, p))
          for (h = 0; h < n.length; h++) {
            var r = n[h]
            if ((k !== k && r.key !== r.key) || k === r.key)
              return { id: p, list: n, index: h, ha: r }
          }
        return { id: p, list: n, index: -1, ha: void 0 }
      },
      e = function (h, k) {
        var p = h.ra
        return ha(function () {
          if (p) {
            for (; p.head != h.ra; ) p = p.hb
            for (; p.next != p.head; ) return (p = p.next), { done: !1, value: k(p) }
            p = null
          }
          return { done: !0, value: void 0 }
        })
      },
      f = function () {
        var h = {}
        return (h.hb = h.next = h.head = h)
      },
      g = 0
    return c
  })
  fa('Array.prototype.find', function (a) {
    return a
      ? a
      : function (b, c) {
          a: {
            var d = this
            d instanceof String && (d = String(d))
            for (var e = d.length, f = 0; f < e; f++) {
              var g = d[f]
              if (b.call(c, g, f, d)) {
                b = g
                break a
              }
            }
            b = void 0
          }
          return b
        }
  })
  var sa = function (a, b) {
    a instanceof String && (a += '')
    var c = 0,
      d = !1,
      e = {
        next: function () {
          if (!d && c < a.length) {
            var f = c++
            return { value: b(f, a[f]), done: !1 }
          }
          d = !0
          return { done: !0, value: void 0 }
        },
      }
    e[Symbol.iterator] = function () {
      return e
    }
    return e
  }
  fa('Array.prototype.values', function (a) {
    return a
      ? a
      : function () {
          return sa(this, function (b, c) {
            return c
          })
        }
  })
  fa('Array.prototype.keys', function (a) {
    return a
      ? a
      : function () {
          return sa(this, function (b) {
            return b
          })
        }
  })
  fa('Array.from', function (a) {
    return a
      ? a
      : function (b, c, d) {
          c =
            null != c
              ? c
              : function (h) {
                  return h
                }
          var e = [],
            f = 'undefined' != typeof Symbol && Symbol.iterator && b[Symbol.iterator]
          if ('function' == typeof f) {
            b = f.call(b)
            for (var g = 0; !(f = b.next()).done; ) e.push(c.call(d, f.value, g++))
          } else for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g))
          return e
        }
  })
  fa('Array.prototype.entries', function (a) {
    return a
      ? a
      : function () {
          return sa(this, function (b, c) {
            return [b, c]
          })
        }
  })
  fa('Object.is', function (a) {
    return a
      ? a
      : function (b, c) {
          return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
  })
  fa('Array.prototype.includes', function (a) {
    return a
      ? a
      : function (b, c) {
          var d = this
          d instanceof String && (d = String(d))
          var e = d.length
          c = c || 0
          for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c]
            if (f === b || Object.is(f, b)) return !0
          }
          return !1
        }
  })
  fa('String.prototype.includes', function (a) {
    return a
      ? a
      : function (b, c) {
          if (null == this)
            throw new TypeError(
              "The 'this' value for String.prototype.includes must not be null or undefined"
            )
          if (b instanceof RegExp)
            throw new TypeError(
              'First argument to String.prototype.includes must not be a regular expression'
            )
          return -1 !== (this + '').indexOf(b, c || 0)
        }
  })
  var ta = ta || {},
    q = this || self,
    ua = function (a) {
      var b = typeof a
      return 'object' != b ? b : a ? (Array.isArray(a) ? 'array' : b) : 'null'
    },
    va = function (a) {
      var b = ua(a)
      return 'array' == b || ('object' == b && 'number' == typeof a.length)
    },
    u = function (a) {
      var b = typeof a
      return ('object' == b && null != a) || 'function' == b
    },
    wa = function (a, b, c) {
      return a.call.apply(a.bind, arguments)
    },
    xa = function (a, b, c) {
      if (!a) throw Error()
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2)
        return function () {
          var e = Array.prototype.slice.call(arguments)
          Array.prototype.unshift.apply(e, d)
          return a.apply(b, e)
        }
      }
      return function () {
        return a.apply(b, arguments)
      }
    },
    v = function (a, b, c) {
      v =
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf('native code')
          ? wa
          : xa
      return v.apply(null, arguments)
    },
    ya = function (a, b) {
      var c = Array.prototype.slice.call(arguments, 1)
      return function () {
        var d = c.slice()
        d.push.apply(d, arguments)
        return a.apply(this, d)
      }
    },
    w = function (a, b) {
      function c() {}
      c.prototype = b.prototype
      a.Yb = b.prototype
      a.prototype = new c()
      a.prototype.constructor = a
      a.Sk = function (d, e, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
          g[h - 2] = arguments[h]
        return b.prototype[e].apply(d, g)
      }
    },
    za = function (a) {
      return a
    }
  function Aa(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, Aa)
    else {
      var c = Error().stack
      c && (this.stack = c)
    }
    a && (this.message = String(a))
    void 0 !== b && (this.cause = b)
  }
  w(Aa, Error)
  Aa.prototype.name = 'CustomError'
  var Ba
  function Ca(a, b) {
    a = a.split('%s')
    for (var c = '', d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : '%s')
    Aa.call(this, c + a[d])
  }
  w(Ca, Aa)
  Ca.prototype.name = 'AssertionError'
  function Da(a, b, c, d) {
    var e = 'Assertion failed'
    if (c) {
      e += ': ' + c
      var f = d
    } else a && ((e += ': ' + a), (f = b))
    throw new Ca('' + e, f || [])
  }
  var x = function (a, b, c) {
      a || Da('', null, b, Array.prototype.slice.call(arguments, 2))
      return a
    },
    Ea = function (a, b, c) {
      null == a && Da('Expected to exist: %s.', [a], b, Array.prototype.slice.call(arguments, 2))
      return a
    },
    Fa = function (a, b) {
      throw new Ca('Failure' + (a ? ': ' + a : ''), Array.prototype.slice.call(arguments, 1))
    },
    Ga = function (a, b, c) {
      'number' !== typeof a &&
        Da(
          'Expected number but got %s: %s.',
          [ua(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        )
      return a
    },
    Ha = function (a, b, c) {
      'string' !== typeof a &&
        Da(
          'Expected string but got %s: %s.',
          [ua(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        )
    },
    Ia = function (a, b, c) {
      'function' !== typeof a &&
        Da(
          'Expected function but got %s: %s.',
          [ua(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        )
    }
  var Ja = function (a, b) {
    if (
      !u(a) ||
      !u(a) ||
      !u(a) ||
      1 !== a.nodeType ||
      (a.namespaceURI && 'http://www.w3.org/1999/xhtml' !== a.namespaceURI) ||
      a.tagName.toUpperCase() !== b.toString()
    ) {
      b = b.toString() + '; got: '
      if (u(a))
        try {
          var c =
            a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a)
        } catch (d) {
          c = '<object could not be stringified>'
        }
      else c = void 0 === a ? 'undefined' : null === a ? 'null' : typeof a
      Fa('Argument is not an HTML Element with tag name ' + (b + c))
    }
  }
  var Ka = function () {},
    La = function (a) {
      return 'function' === typeof a
    }
  var Ma = Array.prototype.indexOf
      ? function (a, b) {
          x(null != a.length)
          return Array.prototype.indexOf.call(a, b, void 0)
        }
      : function (a, b) {
          if ('string' === typeof a)
            return 'string' !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0)
          for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c
          return -1
        },
    y = Array.prototype.forEach
      ? function (a, b) {
          x(null != a.length)
          Array.prototype.forEach.call(a, b, void 0)
        }
      : function (a, b) {
          for (var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0; e < c; e++)
            e in d && b.call(void 0, d[e], e, a)
        }
  function Na(a, b) {
    for (var c = 'string' === typeof a ? a.split('') : a, d = a.length - 1; 0 <= d; --d)
      d in c && b.call(void 0, c[d], d, a)
  }
  var Oa = Array.prototype.filter
      ? function (a, b) {
          x(null != a.length)
          return Array.prototype.filter.call(a, b, void 0)
        }
      : function (a, b) {
          for (
            var c = a.length, d = [], e = 0, f = 'string' === typeof a ? a.split('') : a, g = 0;
            g < c;
            g++
          )
            if (g in f) {
              var h = f[g]
              b.call(void 0, h, g, a) && (d[e++] = h)
            }
          return d
        },
    Pa = Array.prototype.map
      ? function (a, b) {
          x(null != a.length)
          return Array.prototype.map.call(a, b, void 0)
        }
      : function (a, b) {
          for (
            var c = a.length, d = Array(c), e = 'string' === typeof a ? a.split('') : a, f = 0;
            f < c;
            f++
          )
            f in e && (d[f] = b.call(void 0, e[f], f, a))
          return d
        },
    Qa = Array.prototype.some
      ? function (a, b) {
          x(null != a.length)
          return Array.prototype.some.call(a, b, void 0)
        }
      : function (a, b) {
          for (var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a)) return !0
          return !1
        }
  function Ra(a, b) {
    return 0 <= Ma(a, b)
  }
  function Sa(a, b) {
    b = Ma(a, b)
    var c
    ;(c = 0 <= b) && Ta(a, b)
    return c
  }
  function Ta(a, b) {
    x(null != a.length)
    return 1 == Array.prototype.splice.call(a, b, 1).length
  }
  function Ua(a, b) {
    var c = 0
    Na(a, function (d, e) {
      b.call(void 0, d, e, a) && Ta(a, e) && c++
    })
  }
  function Va(a) {
    var b = a.length
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d]
      return c
    }
    return []
  }
  function Wa(a, b) {
    for (var c in a) b.call(void 0, a[c], c, a)
  }
  function Xa(a, b) {
    for (var c in a) if (b.call(void 0, a[c], c, a)) return !0
    return !1
  }
  function Ya(a) {
    for (var b in a) return !1
    return !0
  }
  function Za(a) {
    var b = {},
      c
    for (c in a) b[c] = a[c]
    return b
  }
  var $a =
    'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
      ' '
    )
  function ab(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e]
      for (c in d) a[c] = d[c]
      for (var f = 0; f < $a.length; f++)
        (c = $a[f]), Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
  var bb,
    cb = function () {
      if (void 0 === bb) {
        var a = null,
          b = q.trustedTypes
        if (b && b.createPolicy)
          try {
            a = b.createPolicy('goog#html', {
              createHTML: za,
              createScript: za,
              createScriptURL: za,
            })
          } catch (c) {
            q.console && q.console.error(c.message)
          }
        bb = a
      }
      return bb
    }
  var fb = function (a, b) {
    this.Ag = (a === db && b) || ''
    this.Li = eb
  }
  fb.prototype.tb = !0
  fb.prototype.bb = function () {
    return this.Ag
  }
  fb.prototype.toString = function () {
    return 'Const{' + this.Ag + '}'
  }
  var gb = function (a) {
      if (a instanceof fb && a.constructor === fb && a.Li === eb) return a.Ag
      Fa("expected object of type Const, got '" + a + "'")
      return 'type_error:Const'
    },
    hb = function (a) {
      return new fb(db, a)
    },
    eb = {},
    db = {}
  var jb = function (a, b) {
    this.ig = b === ib ? a : ''
  }
  jb.prototype.toString = function () {
    return this.ig + ''
  }
  jb.prototype.tb = !0
  jb.prototype.bb = function () {
    return this.ig.toString()
  }
  var kb = function (a) {
      if (a instanceof jb && a.constructor === jb) return a.ig
      Fa("expected object of type TrustedResourceUrl, got '" + a + "' of type " + ua(a))
      return 'type_error:TrustedResourceUrl'
    },
    pb = function (a, b) {
      var c = gb(a)
      if (!lb.test(c)) throw Error('Invalid TrustedResourceUrl format: ' + c)
      a = c.replace(mb, function (d, e) {
        if (!Object.prototype.hasOwnProperty.call(b, e))
          throw Error(
            'Found marker, "' +
              e +
              '", in format string, "' +
              c +
              '", but no valid label mapping found in args: ' +
              JSON.stringify(b)
          )
        d = b[e]
        return d instanceof fb ? gb(d) : encodeURIComponent(String(d))
      })
      return ob(a)
    },
    mb = /%{(\w+)}/g,
    lb = RegExp(
      '^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)',
      'i'
    ),
    ib = {},
    ob = function (a) {
      var b = cb()
      a = b ? b.createScriptURL(a) : a
      return new jb(a, ib)
    }
  var qb = String.prototype.trim
      ? function (a) {
          return a.trim()
        }
      : function (a) {
          return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
        },
    yb = function (a) {
      if (!rb.test(a)) return a
      ;-1 != a.indexOf('&') && (a = a.replace(sb, '&amp;'))
      ;-1 != a.indexOf('<') && (a = a.replace(tb, '&lt;'))
      ;-1 != a.indexOf('>') && (a = a.replace(ub, '&gt;'))
      ;-1 != a.indexOf('"') && (a = a.replace(vb, '&quot;'))
      ;-1 != a.indexOf("'") && (a = a.replace(wb, '&#39;'))
      ;-1 != a.indexOf('\x00') && (a = a.replace(xb, '&#0;'))
      return a
    },
    sb = /&/g,
    tb = /</g,
    ub = />/g,
    vb = /"/g,
    wb = /'/g,
    xb = /\x00/g,
    rb = /[\x00&<>"']/,
    A = function (a, b) {
      return -1 != a.indexOf(b)
    }
  var Ab = function (a, b) {
    this.hg = b === zb ? a : ''
  }
  Ab.prototype.toString = function () {
    return this.hg.toString()
  }
  Ab.prototype.tb = !0
  Ab.prototype.bb = function () {
    return this.hg.toString()
  }
  var Bb = function (a) {
      if (a instanceof Ab && a.constructor === Ab) return a.hg
      Fa("expected object of type SafeUrl, got '" + a + "' of type " + ua(a))
      return 'type_error:SafeUrl'
    },
    Cb = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
    Db = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
    Eb = function (a) {
      if (a instanceof Ab) return a
      a = 'object' == typeof a && a.tb ? a.bb() : String(a)
      Db.test(a)
        ? (a = new Ab(a, zb))
        : ((a = String(a).replace(/(%0A|%0D)/g, '')), (a = a.match(Cb) ? new Ab(a, zb) : null))
      return a
    },
    Fb
  try {
    new URL('s://g'), (Fb = !0)
  } catch (a) {
    Fb = !1
  }
  var Gb = Fb,
    Hb = function (a) {
      if (a instanceof Ab) return a
      a = 'object' == typeof a && a.tb ? a.bb() : String(a)
      a: {
        var b = a
        if (Gb) {
          try {
            var c = new URL(b)
          } catch (d) {
            b = 'https:'
            break a
          }
          b = c.protocol
        } else
          b: {
            c = document.createElement('a')
            try {
              c.href = b
            } catch (d) {
              b = void 0
              break b
            }
            b = c.protocol
            b = ':' === b || '' === b ? 'https:' : b
          }
      }
      x('javascript:' !== b, '%s is a javascript: URL', a) || (a = 'about:invalid#zClosurez')
      return new Ab(a, zb)
    },
    zb = {},
    Ib = new Ab('about:invalid#zClosurez', zb)
  var Jb = {},
    Kb = function (a, b) {
      this.gg = b === Jb ? a : ''
      this.tb = !0
    }
  Kb.prototype.toString = function () {
    return this.gg.toString()
  }
  Kb.prototype.bb = function () {
    return this.gg
  }
  var Lb = new Kb('', Jb)
  var Mb, Nb
  a: {
    for (var Ob = ['CLOSURE_FLAGS'], Pb = q, Qb = 0; Qb < Ob.length; Qb++)
      if (((Pb = Pb[Ob[Qb]]), null == Pb)) {
        Nb = null
        break a
      }
    Nb = Pb
  }
  var Rb = Nb && Nb[610401301]
  Mb = null != Rb ? Rb : !1
  function Sb() {
    var a = q.navigator
    return a && (a = a.userAgent) ? a : ''
  }
  var Tb,
    Ub = q.navigator
  Tb = Ub ? Ub.userAgentData || null : null
  function Vb(a) {
    return Mb
      ? Tb
        ? Tb.brands.some(function (b) {
            return (b = b.brand) && A(b, a)
          })
        : !1
      : !1
  }
  function B(a) {
    return A(Sb(), a)
  }
  function Wb() {
    return Mb ? !!Tb && 0 < Tb.brands.length : !1
  }
  function Xb() {
    return Wb() ? !1 : B('Trident') || B('MSIE')
  }
  function Yb() {
    return Wb()
      ? Vb('Chromium')
      : ((B('Chrome') || B('CriOS')) && !(Wb() ? 0 : B('Edge'))) || B('Silk')
  }
  var Zb = {},
    $b = function (a, b) {
      this.fg = b === Zb ? a : ''
      this.tb = !0
    }
  $b.prototype.bb = function () {
    return this.fg.toString()
  }
  $b.prototype.toString = function () {
    return this.fg.toString()
  }
  var ac = function (a) {
      if (a instanceof $b && a.constructor === $b) return a.fg
      Fa("expected object of type SafeHtml, got '" + a + "' of type " + ua(a))
      return 'type_error:SafeHtml'
    },
    cc = function (a) {
      return a instanceof $b ? a : bc(yb('object' == typeof a && a.tb ? a.bb() : String(a)))
    },
    bc = function (a) {
      var b = cb()
      a = b ? b.createHTML(a) : a
      return new $b(a, Zb)
    },
    dc = new $b((q.trustedTypes && q.trustedTypes.emptyHTML) || '', Zb)
  var ec = function (a, b) {
    Ha(gb(a), 'must provide justification')
    x(!/^[\s\xa0]*$/.test(gb(a)), 'must provide non-empty justification')
    return bc(b)
  }
  var fc = (function (a) {
      var b = !1,
        c
      return function () {
        b || ((c = a()), (b = !0))
        return c
      }
    })(function () {
      if ('undefined' === typeof document) return !1
      var a = document.createElement('div'),
        b = document.createElement('div')
      b.appendChild(document.createElement('div'))
      a.appendChild(b)
      if (!a.firstChild) return !1
      b = a.firstChild.firstChild
      a.innerHTML = ac(dc)
      return !b.parentElement
    }),
    hc = function (a, b) {
      Ja(a, 'SCRIPT')
      var c = gc('script[nonce]', a.ownerDocument && a.ownerDocument.defaultView)
      c && a.setAttribute('nonce', c)
      a.src = kb(b)
    },
    ic = function (a, b, c, d) {
      a = a instanceof Ab ? a : Hb(a)
      b = b || q
      c = c instanceof fb ? gb(c) : c || ''
      return void 0 !== d ? b.open(Bb(a), c, d) : b.open(Bb(a), c)
    },
    jc = /^[\w+/_-]+[=]{0,2}$/,
    gc = function (a, b) {
      b = (b || q).document
      return b.querySelector
        ? (a = b.querySelector(a)) && (a = a.nonce || a.getAttribute('nonce')) && jc.test(a)
          ? a
          : ''
        : ''
    }
  var kc = function (a, b) {
    for (
      var c = a.split('%s'), d = '', e = Array.prototype.slice.call(arguments, 1);
      e.length && 1 < c.length;

    )
      d += c.shift() + e.shift()
    return d + c.join('%s')
  }
  var lc = function (a) {
      if (a.qb && 'function' == typeof a.qb) return a.qb()
      if (
        ('undefined' !== typeof Map && a instanceof Map) ||
        ('undefined' !== typeof Set && a instanceof Set)
      )
        return Array.from(a.values())
      if ('string' === typeof a) return a.split('')
      if (va(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d])
        return b
      }
      b = []
      c = 0
      for (d in a) b[c++] = a[d]
      return b
    },
    mc = function (a) {
      if (a.ce && 'function' == typeof a.ce) return a.ce()
      if (!a.qb || 'function' != typeof a.qb) {
        if ('undefined' !== typeof Map && a instanceof Map) return Array.from(a.keys())
        if (!('undefined' !== typeof Set && a instanceof Set)) {
          if (va(a) || 'string' === typeof a) {
            var b = []
            a = a.length
            for (var c = 0; c < a; c++) b.push(c)
            return b
          }
          b = []
          c = 0
          for (var d in a) b[c++] = d
          return b
        }
      }
    },
    nc = function (a, b, c) {
      if (a.forEach && 'function' == typeof a.forEach) a.forEach(b, c)
      else if (va(a) || 'string' === typeof a) Array.prototype.forEach.call(a, b, c)
      else
        for (var d = mc(a), e = lc(a), f = e.length, g = 0; g < f; g++)
          b.call(c, e[g], d && d[g], a)
    }
  var oc = RegExp(
      '^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$'
    ),
    pc = function (a, b) {
      if (a) {
        a = a.split('&')
        for (var c = 0; c < a.length; c++) {
          var d = a[c].indexOf('='),
            e = null
          if (0 <= d) {
            var f = a[c].substring(0, d)
            e = a[c].substring(d + 1)
          } else f = a[c]
          b(f, e ? decodeURIComponent(e.replace(/\+/g, ' ')) : '')
        }
      }
    }
  var qc = function (a) {
    this.ga = this.ac = this.ua = ''
    this.Ua = null
    this.nc = this.fb = ''
    this.Ba = this.Cj = !1
    if (a instanceof qc) {
      this.Ba = a.Ba
      rc(this, a.ua)
      var b = a.ac
      sc(this)
      this.ac = b
      tc(this, a.ga)
      uc(this, a.Ua)
      vc(this, a.fb)
      wc(this, a.ya.clone())
      xc(this, a.nc)
    } else
      a && (b = String(a).match(oc))
        ? ((this.Ba = !1),
          rc(this, b[1] || '', !0),
          (a = b[2] || ''),
          sc(this),
          (this.ac = yc(a)),
          tc(this, b[3] || '', !0),
          uc(this, b[4]),
          vc(this, b[5] || '', !0),
          wc(this, b[6] || '', !0),
          xc(this, b[7] || '', !0))
        : ((this.Ba = !1), (this.ya = new zc(null, this.Ba)))
  }
  qc.prototype.toString = function () {
    var a = [],
      b = this.ua
    b && a.push(Ac(b, Bc, !0), ':')
    var c = this.ga
    if (c || 'file' == b)
      a.push('//'),
        (b = this.ac) && a.push(Ac(b, Bc, !0), '@'),
        a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
        (c = this.Ua),
        null != c && a.push(':', String(c))
    if ((c = this.fb))
      this.ga && '/' != c.charAt(0) && a.push('/'), a.push(Ac(c, '/' == c.charAt(0) ? Cc : Dc, !0))
    ;(c = this.ya.toString()) && a.push('?', c)
    ;(c = this.nc) && a.push('#', Ac(c, Ec))
    return a.join('')
  }
  qc.prototype.resolve = function (a) {
    var b = this.clone(),
      c = !!a.ua
    c ? rc(b, a.ua) : (c = !!a.ac)
    if (c) {
      var d = a.ac
      sc(b)
      b.ac = d
    } else c = !!a.ga
    c ? tc(b, a.ga) : (c = null != a.Ua)
    d = a.fb
    if (c) uc(b, a.Ua)
    else if ((c = !!a.fb)) {
      if ('/' != d.charAt(0))
        if (this.ga && !this.fb) d = '/' + d
        else {
          var e = b.fb.lastIndexOf('/')
          ;-1 != e && (d = b.fb.slice(0, e + 1) + d)
        }
      e = d
      if ('..' == e || '.' == e) d = ''
      else if (A(e, './') || A(e, '/.')) {
        d = 0 == e.lastIndexOf('/', 0)
        e = e.split('/')
        for (var f = [], g = 0; g < e.length; ) {
          var h = e[g++]
          '.' == h
            ? d && g == e.length && f.push('')
            : '..' == h
            ? ((1 < f.length || (1 == f.length && '' != f[0])) && f.pop(),
              d && g == e.length && f.push(''))
            : (f.push(h), (d = !0))
        }
        d = f.join('/')
      } else d = e
    }
    c ? vc(b, d) : (c = '' !== a.ya.toString())
    c ? wc(b, a.ya.clone()) : (c = !!a.nc)
    c && xc(b, a.nc)
    return b
  }
  qc.prototype.clone = function () {
    return new qc(this)
  }
  var rc = function (a, b, c) {
      sc(a)
      a.ua = c ? yc(b, !0) : b
      a.ua && (a.ua = a.ua.replace(/:$/, ''))
    },
    tc = function (a, b, c) {
      sc(a)
      a.ga = c ? yc(b, !0) : b
    },
    uc = function (a, b) {
      sc(a)
      if (b) {
        b = Number(b)
        if (isNaN(b) || 0 > b) throw Error('Bad port number ' + b)
        a.Ua = b
      } else a.Ua = null
    },
    vc = function (a, b, c) {
      sc(a)
      a.fb = c ? yc(b, !0) : b
      return a
    },
    wc = function (a, b, c) {
      sc(a)
      b instanceof zc
        ? ((a.ya = b), a.ya.ug(a.Ba))
        : (c || (b = Ac(b, Fc)), (a.ya = new zc(b, a.Ba)))
      return a
    }
  qc.prototype.getQuery = function () {
    return this.ya.toString()
  }
  var C = function (a, b, c) {
      sc(a)
      a.ya.set(b, c)
    },
    D = function (a, b) {
      return a.ya.get(b)
    },
    xc = function (a, b, c) {
      sc(a)
      a.nc = c ? yc(b) : b
      return a
    }
  qc.prototype.removeParameter = function (a) {
    sc(this)
    this.ya.remove(a)
    return this
  }
  var sc = function (a) {
    if (a.Cj) throw Error('Tried to modify a read-only Uri')
  }
  qc.prototype.ug = function (a) {
    this.Ba = a
    this.ya && this.ya.ug(a)
  }
  var E = function (a) {
      return a instanceof qc ? a.clone() : new qc(a)
    },
    Gc = function (a, b, c, d, e, f) {
      var g = new qc(null)
      a && rc(g, a)
      b && tc(g, b)
      c && uc(g, c)
      d && vc(g, d)
      e && wc(g, e)
      f && xc(g, f)
      return g
    },
    yc = function (a, b) {
      return a ? (b ? decodeURI(a.replace(/%25/g, '%2525')) : decodeURIComponent(a)) : ''
    },
    Ac = function (a, b, c) {
      return 'string' === typeof a
        ? ((a = encodeURI(a).replace(b, Hc)),
          c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
          a)
        : null
    },
    Hc = function (a) {
      a = a.charCodeAt(0)
      return '%' + ((a >> 4) & 15).toString(16) + (a & 15).toString(16)
    },
    Bc = /[#\/\?@]/g,
    Dc = /[#\?:]/g,
    Cc = /[#\?]/g,
    Fc = /[#\?@]/g,
    Ec = /#/g,
    zc = function (a, b) {
      this.ea = this.K = null
      this.va = a || null
      this.Ba = !!b
    },
    Ic = function (a) {
      a.K ||
        ((a.K = new Map()),
        (a.ea = 0),
        a.va &&
          pc(a.va, function (b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, ' ')), c)
          }))
    },
    Kc = function (a) {
      var b = mc(a)
      if ('undefined' == typeof b) throw Error('Keys are undefined')
      var c = new zc(null)
      a = lc(a)
      for (var d = 0; d < b.length; d++) {
        var e = b[d],
          f = a[d]
        Array.isArray(f) ? Jc(c, e, f) : c.add(e, f)
      }
      return c
    }
  l = zc.prototype
  l.add = function (a, b) {
    Ic(this)
    this.va = null
    a = this.wa(a)
    var c = this.K.get(a)
    c || this.K.set(a, (c = []))
    c.push(b)
    this.ea = Ga(this.ea) + 1
    return this
  }
  l.remove = function (a) {
    Ic(this)
    a = this.wa(a)
    return this.K.has(a)
      ? ((this.va = null), (this.ea = Ga(this.ea) - this.K.get(a).length), this.K.delete(a))
      : !1
  }
  l.clear = function () {
    this.K = this.va = null
    this.ea = 0
  }
  l.Ch = function () {
    Ic(this)
    return 0 == this.ea
  }
  l.Qc = function (a) {
    Ic(this)
    a = this.wa(a)
    return this.K.has(a)
  }
  l.forEach = function (a, b) {
    Ic(this)
    this.K.forEach(function (c, d) {
      c.forEach(function (e) {
        a.call(b, e, d, this)
      }, this)
    }, this)
  }
  l.ce = function () {
    Ic(this)
    for (
      var a = Array.from(this.K.values()), b = Array.from(this.K.keys()), c = [], d = 0;
      d < b.length;
      d++
    )
      for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d])
    return c
  }
  l.qb = function (a) {
    Ic(this)
    var b = []
    if ('string' === typeof a) this.Qc(a) && (b = b.concat(this.K.get(this.wa(a))))
    else {
      a = Array.from(this.K.values())
      for (var c = 0; c < a.length; c++) b = b.concat(a[c])
    }
    return b
  }
  l.set = function (a, b) {
    Ic(this)
    this.va = null
    a = this.wa(a)
    this.Qc(a) && (this.ea = Ga(this.ea) - this.K.get(a).length)
    this.K.set(a, [b])
    this.ea = Ga(this.ea) + 1
    return this
  }
  l.get = function (a, b) {
    if (!a) return b
    a = this.qb(a)
    return 0 < a.length ? String(a[0]) : b
  }
  var Jc = function (a, b, c) {
    a.remove(b)
    0 < c.length && ((a.va = null), a.K.set(a.wa(b), Va(c)), (a.ea = Ga(a.ea) + c.length))
  }
  l = zc.prototype
  l.toString = function () {
    if (this.va) return this.va
    if (!this.K) return ''
    for (var a = [], b = Array.from(this.K.keys()), c = 0; c < b.length; c++) {
      var d = b[c],
        e = encodeURIComponent(String(d))
      d = this.qb(d)
      for (var f = 0; f < d.length; f++) {
        var g = e
        '' !== d[f] && (g += '=' + encodeURIComponent(String(d[f])))
        a.push(g)
      }
    }
    return (this.va = a.join('&'))
  }
  l.clone = function () {
    var a = new zc()
    a.va = this.va
    this.K && ((a.K = new Map(this.K)), (a.ea = this.ea))
    return a
  }
  l.wa = function (a) {
    a = String(a)
    this.Ba && (a = a.toLowerCase())
    return a
  }
  l.ug = function (a) {
    a &&
      !this.Ba &&
      (Ic(this),
      (this.va = null),
      this.K.forEach(function (b, c) {
        var d = c.toLowerCase()
        c != d && (this.remove(c), Jc(this, d, b))
      }, this))
    this.Ba = a
  }
  l.extend = function (a) {
    for (var b = 0; b < arguments.length; b++)
      nc(
        arguments[b],
        function (c, d) {
          this.add(d, c)
        },
        this
      )
  }
  var Lc =
    Object.freeze ||
    function (a) {
      return a
    }
  var Mc = function (a, b) {
    this.name = a
    this.value = b
  }
  Mc.prototype.toString = function () {
    return this.name
  }
  var Nc = new Mc('OFF', Infinity),
    Oc = new Mc('SEVERE', 1e3),
    Pc = new Mc('WARNING', 900),
    Qc = new Mc('CONFIG', 700),
    Rc = new Mc('FINE', 500),
    Sc = function () {
      this.Td = 0
      this.clear()
    },
    Tc
  Sc.prototype.clear = function () {
    this.Mg = Array(this.Td)
    this.ah = -1
    this.Dh = !1
  }
  var Uc = function (a, b, c) {
    this.reset(a || Nc, b, c, void 0, void 0)
  }
  Uc.prototype.reset = function () {}
  var Vc = function (a, b) {
      this.level = null
      this.sj = []
      this.parent = (void 0 === b ? null : b) || null
      this.children = []
      this.Qf = {
        getName: function () {
          return a
        },
      }
    },
    Wc = function (a) {
      if (a.level) return a.level
      if (a.parent) return Wc(a.parent)
      Fa('Root logger has no level set.')
      return Nc
    },
    Xc = function (a, b) {
      for (; a; )
        a.sj.forEach(function (c) {
          c(b)
        }),
          (a = a.parent)
    },
    Yc = function () {
      this.entries = {}
      var a = new Vc('')
      a.level = Qc
      this.entries[''] = a
    },
    Zc,
    $c = function (a, b) {
      var c = a.entries[b]
      if (c) return c
      c = $c(a, b.slice(0, Math.max(b.lastIndexOf('.'), 0)))
      var d = new Vc(b, c)
      a.entries[b] = d
      c.children.push(d)
      return d
    },
    ad = function () {
      Zc || (Zc = new Yc())
      return Zc
    },
    bd = function (a, b, c) {
      var d
      if ((d = a))
        if ((d = a && b)) {
          d = b.value
          var e = a ? Wc($c(ad(), a.getName())) : Nc
          d = d >= e.value
        }
      if (d) {
        b = b || Nc
        d = $c(ad(), a.getName())
        'function' === typeof c && (c = c())
        Tc || (Tc = new Sc())
        e = Tc
        a = a.getName()
        if (0 < e.Td) {
          var f = (e.ah + 1) % e.Td
          e.ah = f
          e.Dh
            ? ((e = e.Mg[f]), e.reset(b, c, a), (a = e))
            : ((e.Dh = f == e.Td - 1), (a = e.Mg[f] = new Uc(b, c, a)))
        } else a = new Uc(b, c, a)
        Xc(d, a)
      }
    },
    cd = function (a, b) {
      a && bd(a, Oc, b)
    },
    dd = function (a, b) {
      a && bd(a, Rc, b)
    } /*

 SPDX-License-Identifier: Apache-2.0
*/
  var ed = [],
    fd = function (a) {
      var b = $c(ad(), 'safevalues').Qf
      b && bd(b, Pc, "A URL with content '" + a + "' was sanitized away.")
    }
  ;-1 === ed.indexOf(fd) && ed.push(fd)
  var gd = { Vk: !0 },
    hd = function () {
      throw Error('Do not instantiate directly')
    }
  hd.prototype.Vg = null
  hd.prototype.toString = function () {
    return this.content
  }
  hd.prototype.wi = function () {
    if (this.Wg !== gd) throw Error('Sanitized content was not of kind HTML.')
    return ec(
      hb('Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value.'),
      this.toString()
    )
  }
  var id = function () {
    hd.call(this)
  }
  w(id, hd)
  id.prototype.Wg = gd
  var jd = function (a) {
    var b = null != a && a.Wg === gd
    b && x(a.constructor === id)
    return b
  }
  var kd = function (a) {
    kd[' '](a)
    return a
  }
  kd[' '] = function () {}
  var ld = Wb() ? !1 : B('Opera'),
    md = Xb(),
    nd = B('Edge'),
    od = nd || md,
    pd =
      B('Gecko') &&
      !(A(Sb().toLowerCase(), 'webkit') && !B('Edge')) &&
      !(B('Trident') || B('MSIE')) &&
      !B('Edge'),
    qd = A(Sb().toLowerCase(), 'webkit') && !B('Edge'),
    rd = function () {
      var a = q.document
      return a ? a.documentMode : void 0
    },
    sd
  a: {
    var td = '',
      ud = (function () {
        var a = Sb()
        if (pd) return /rv:([^\);]+)(\)|;)/.exec(a)
        if (nd) return /Edge\/([\d\.]+)/.exec(a)
        if (md) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a)
        if (qd) return /WebKit\/(\S+)/.exec(a)
        if (ld) return /(?:Version)[ \/]?(\S+)/.exec(a)
      })()
    ud && (td = ud ? ud[1] : '')
    if (md) {
      var vd = rd()
      if (null != vd && vd > parseFloat(td)) {
        sd = String(vd)
        break a
      }
    }
    sd = td
  }
  var wd = sd,
    xd
  if (q.document && md) {
    var yd = rd()
    xd = yd ? yd : parseInt(wd, 10) || void 0
  } else xd = void 0
  var zd = xd
  var Ad = function (a) {
      if (null != a)
        switch (a.Vg) {
          case 1:
            return 1
          case -1:
            return -1
          case 0:
            return 0
        }
      return null
    },
    Ed = function (a) {
      return jd(a)
        ? a
        : a instanceof $b
        ? Bd(ac(a).toString())
        : a instanceof $b
        ? Bd(ac(a).toString())
        : Bd(String(String(a)).replace(Cd, Dd), Ad(a))
    },
    Bd = (function (a) {
      function b(c) {
        this.content = c
      }
      b.prototype = a.prototype
      return function (c, d) {
        c = new b(String(c))
        void 0 !== d && (c.Vg = d)
        return c
      }
    })(id),
    Fd = {},
    F = function (a) {
      if (jd(a)) {
        var b = String
        a = String(a.content).replace(Gd, '').replace(Hd, '&lt;')
        b = b(a).replace(Id, Dd)
      } else b = String(a).replace(Cd, Dd)
      return b
    },
    Jd = function (a, b, c, d) {
      a ||
        ((a =
          c instanceof Function
            ? c.displayName || c.name || 'unknown type name'
            : c instanceof Object
            ? c.constructor.displayName || c.constructor.name || Object.prototype.toString.call(c)
            : null === c
            ? 'null'
            : typeof c),
        Fa('expected @param ' + b + ' of type ' + d + ', but got ' + a + '.'),
        Fa('parameter type error. Enable DEBUG to see details.'))
      return c
    },
    Kd = {},
    Ld = function () {
      x(
        Kd === Kd,
        'found an incorrect call marker, was an internal function called from the top level?'
      )
    },
    Md = {
      '\x00': '&#0;',
      '\t': '&#9;',
      '\n': '&#10;',
      '\v': '&#11;',
      '\f': '&#12;',
      '\r': '&#13;',
      ' ': '&#32;',
      '"': '&quot;',
      '&': '&amp;',
      "'": '&#39;',
      '-': '&#45;',
      '/': '&#47;',
      '<': '&lt;',
      '=': '&#61;',
      '>': '&gt;',
      '`': '&#96;',
      '\u0085': '&#133;',
      '\u00a0': '&#160;',
      '\u2028': '&#8232;',
      '\u2029': '&#8233;',
    },
    Dd = function (a) {
      return Md[a]
    },
    Cd = /[\x00\x22\x26\x27\x3c\x3e]/g,
    Id = /[\x00\x22\x27\x3c\x3e]/g,
    Gd = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
    Hd = /</g
  try {
    new self.OffscreenCanvas(0, 0).getContext('2d')
  } catch (a) {}
  var Nd = function (a) {
      var b = document
      return 'string' === typeof a ? b.getElementById(a) : a
    },
    Pd = function (a, b) {
      Wa(b, function (c, d) {
        c && 'object' == typeof c && c.tb && (c = c.bb())
        'style' == d
          ? (a.style.cssText = c)
          : 'class' == d
          ? (a.className = c)
          : 'for' == d
          ? (a.htmlFor = c)
          : Od.hasOwnProperty(d)
          ? a.setAttribute(Od[d], c)
          : 0 == d.lastIndexOf('aria-', 0) || 0 == d.lastIndexOf('data-', 0)
          ? a.setAttribute(d, c)
          : (a[d] = c)
      })
    },
    Od = {
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing',
      colspan: 'colSpan',
      frameborder: 'frameBorder',
      height: 'height',
      maxlength: 'maxLength',
      nonce: 'nonce',
      role: 'role',
      rowspan: 'rowSpan',
      type: 'type',
      usemap: 'useMap',
      valign: 'vAlign',
      width: 'width',
    },
    Rd = function (a, b, c) {
      return Qd(document, arguments)
    },
    Qd = function (a, b) {
      var c = b[1],
        d = Sd(a, String(b[0]))
      c &&
        ('string' === typeof c
          ? (d.className = c)
          : Array.isArray(c)
          ? (d.className = c.join(' '))
          : Pd(d, c))
      2 < b.length && Td(a, d, b, 2)
      return d
    },
    Td = function (a, b, c, d) {
      function e(h) {
        h && b.appendChild('string' === typeof h ? a.createTextNode(h) : h)
      }
      for (; d < c.length; d++) {
        var f = c[d]
        if (!va(f) || (u(f) && 0 < f.nodeType)) e(f)
        else {
          a: {
            if (f && 'number' == typeof f.length) {
              if (u(f)) {
                var g = 'function' == typeof f.item || 'string' == typeof f.item
                break a
              }
              if ('function' === typeof f) {
                g = 'function' == typeof f.item
                break a
              }
            }
            g = !1
          }
          y(g ? Va(f) : f, e)
        }
      }
    },
    Sd = function (a, b) {
      b = String(b)
      'application/xhtml+xml' === a.contentType && (b = b.toLowerCase())
      return a.createElement(b)
    },
    Ud = function (a, b) {
      x(null != a && null != b, 'goog.dom.appendChild expects non-null arguments')
      a.appendChild(b)
    },
    Vd = function (a) {
      for (var b; (b = a.firstChild); ) a.removeChild(b)
    },
    Wd = function (a) {
      return a && a.parentNode ? a.parentNode.removeChild(a) : null
    },
    Xd = function () {
      var a = document.body
      if (void 0 !== a.lastElementChild) a = a.lastElementChild
      else for (a = a.lastChild; a && 1 != a.nodeType; ) a = a.previousSibling
      return a
    },
    Yd = function (a) {
      x(a, 'Node cannot be null or undefined.')
      return 9 == a.nodeType ? a : a.ownerDocument || a.document
    },
    Zd = function (a, b) {
      x(null != a, 'goog.dom.setTextContent expects a non-null value for node')
      if ('textContent' in a) a.textContent = b
      else if (3 == a.nodeType) a.data = String(b)
      else if (a.firstChild && 3 == a.firstChild.nodeType) {
        for (; a.lastChild != a.firstChild; ) a.removeChild(x(a.lastChild))
        a.firstChild.data = String(b)
      } else {
        Vd(a)
        var c = Yd(a)
        a.appendChild(c.createTextNode(String(b)))
      }
    },
    $d = { SCRIPT: 1, STYLE: 1, HEAD: 1, IFRAME: 1, OBJECT: 1 },
    ae = { IMG: ' ', BR: '\n' },
    ce = function (a) {
      var b = []
      be(a, b, !0)
      a = b.join('')
      a = a.replace(/ \xAD /g, ' ').replace(/\xAD/g, '')
      a = a.replace(/\u200B/g, '')
      a = a.replace(/ +/g, ' ')
      ' ' != a && (a = a.replace(/^\s*/, ''))
      return a
    },
    be = function (a, b, c) {
      if (!(a.nodeName in $d))
        if (3 == a.nodeType)
          c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, '')) : b.push(a.nodeValue)
        else if (a.nodeName in ae) b.push(ae[a.nodeName])
        else for (a = a.firstChild; a; ) be(a, b, c), (a = a.nextSibling)
    },
    de = function (a) {
      this.Ra = a || q.document || document
    }
  de.prototype.getElementsByTagName = function (a, b) {
    return (b || this.Ra).getElementsByTagName(String(a))
  }
  var ee = function (a, b) {
    a = a.Ra
    b = b && '*' != b ? String(b).toUpperCase() : ''
    b =
      a.querySelectorAll && a.querySelector && b
        ? a.querySelectorAll(b + '')
        : a.getElementsByTagName(b || '*')
    return b
  }
  l = de.prototype
  l.Yg = function (a, b, c) {
    return Qd(this.Ra, arguments)
  }
  l.createElement = function (a) {
    return Sd(this.Ra, a)
  }
  l.createTextNode = function (a) {
    return this.Ra.createTextNode(String(a))
  }
  l.getWindow = function () {
    var a = this.Ra
    return a.parentWindow || a.defaultView
  }
  l.appendChild = Ud
  l.append = function (a, b) {
    Td(Yd(a), a, arguments, 1)
  }
  l.canHaveChildren = function (a) {
    if (1 != a.nodeType) return !1
    switch (a.tagName) {
      case 'APPLET':
      case 'AREA':
      case 'BASE':
      case 'BR':
      case 'COL':
      case 'COMMAND':
      case 'EMBED':
      case 'FRAME':
      case 'HR':
      case 'IMG':
      case 'INPUT':
      case 'IFRAME':
      case 'ISINDEX':
      case 'KEYGEN':
      case 'LINK':
      case 'NOFRAMES':
      case 'NOSCRIPT':
      case 'META':
      case 'OBJECT':
      case 'PARAM':
      case 'SCRIPT':
      case 'SOURCE':
      case 'STYLE':
      case 'TRACK':
      case 'WBR':
        return !1
    }
    return !0
  }
  l.removeNode = Wd
  l.contains = function (a, b) {
    if (!a || !b) return !1
    if (a.contains && 1 == b.nodeType) return a == b || a.contains(b)
    if ('undefined' != typeof a.compareDocumentPosition)
      return a == b || !!(a.compareDocumentPosition(b) & 16)
    for (; b && a != b; ) b = b.parentNode
    return b == a
  } /*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var fe = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i,
    ge = {}
  var he = function (a, b) {
      return Fd['fireauth.oauthhelper.ui.soy.pendingScreen']
        ? Fd['fireauth.oauthhelper.ui.soy.pendingScreen'](a, b)
        : Bd(
            '<div id="pending-screen"><div id="progressBar" class="' +
              F('mdl-progress') +
              ' ' +
              F('mdl-js-progress') +
              ' ' +
              F('mdl-progress__indeterminate') +
              ' ' +
              F('firebase-progress-bar') +
              '"></div></div>'
          )
    },
    ie = function (a, b) {
      a = a || {}
      a = a.appName
      Ld()
      Fd['fireauth.oauthhelper.ui.soy.continueScreen']
        ? (b = Fd['fireauth.oauthhelper.ui.soy.continueScreen']({ appName: a }, b))
        : ((a = Jd(null == a || 'string' === typeof a, 'appName', a, 'null|string|undefined')),
          (b =
            '<div id="continue-screen" class="' +
            F('mdl-card') +
            ' ' +
            F('mdl-shadow--2dp') +
            ' ' +
            F('firebase-container') +
            '"><button id="continue" class="' +
            F('mdl-button') +
            ' ' +
            F('mdl-button--raised') +
            ' ' +
            F('mdl-button--colored') +
            '">'),
          a ? ((a = 'Continue to ' + Ed(a)), (b += a)) : (b += 'Continue to the app'),
          (b = Bd(b + '</button></div>')))
      return b
    },
    je = function (a, b) {
      a = a.errorMessage
      Ld()
      Fd['fireauth.oauthhelper.ui.soy.errorScreen']
        ? (b = Fd['fireauth.oauthhelper.ui.soy.errorScreen']({ errorMessage: a }, b))
        : ((b = Jd('string' === typeof a, 'errorMessage', a, 'string')),
          (b = Bd(
            '<div id="error-screen" class="' +
              F('mdl-card') +
              ' ' +
              F('mdl-shadow--2dp') +
              ' ' +
              F('firebase-container') +
              '">' +
              Ed(b) +
              '</div>'
          )))
      return b
    },
    ke = function (a, b) {
      if (Fd['fireauth.oauthhelper.ui.soy.appVerificationScreen'])
        return Fd['fireauth.oauthhelper.ui.soy.appVerificationScreen'](a, b)
      a =
        '<div id="app-verification-screen" class="' +
        F('mdl-card') +
        ' ' +
        F('mdl-shadow--2dp') +
        ' ' +
        F('firebase-container') +
        '"><button id="verify" class="' +
        F('mdl-button') +
        ' ' +
        F('firebase-hidden-button') +
        '">'
      return Bd(
        a +
          'Verify</button><div id="status-container"><h1 class="firebase-title" id="status-container-label">Verifying you\'re not a robot...</h1><div id="app-verification-progress-bar" class="mdl-progress mdl-js-progress mdl-progress__indeterminate firebase-middle-progress-bar"></div></div></div>'
      )
    }
  function le(a) {
    q.setTimeout(function () {
      throw a
    }, 0)
  }
  var me = function (a) {
    return Array.prototype.map
      .call(a, function (b) {
        b = b.toString(16)
        return 1 < b.length ? b : '0' + b
      })
      .join('')
  }
  !B('Android') || Yb()
  Yb()
  B('Safari') &&
    (Yb() ||
      (Wb() ? 0 : B('Coast')) ||
      (Wb() ? 0 : B('Opera')) ||
      (Wb() ? 0 : B('Edge')) ||
      (Wb() ? Vb('Microsoft Edge') : B('Edg/')) ||
      (Wb() && Vb('Opera')))
  var ne = null,
    pe = function (a) {
      var b = []
      oe(a, function (c) {
        b.push(c)
      })
      return b
    },
    oe = function (a, b) {
      function c(k) {
        for (; d < a.length; ) {
          var p = a.charAt(d++),
            n = ne[p]
          if (null != n) return n
          if (!/^[\s\xa0]*$/.test(p)) throw Error('Unknown base64 encoding at char: ' + p)
        }
        return k
      }
      qe()
      for (var d = 0; ; ) {
        var e = c(-1),
          f = c(0),
          g = c(64),
          h = c(64)
        if (64 === h && -1 === e) break
        b((e << 2) | (f >> 4))
        64 != g && (b(((f << 4) & 240) | (g >> 2)), 64 != h && b(((g << 6) & 192) | h))
      }
    },
    qe = function () {
      if (!ne) {
        ne = {}
        for (
          var a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''),
            b = ['+/=', '+/', '-_=', '-_.', '-_'],
            c = 0;
          5 > c;
          c++
        )
          for (var d = a.concat(b[c].split('')), e = 0; e < d.length; e++) {
            var f = d[e],
              g = ne[f]
            void 0 === g ? (ne[f] = e) : x(g === e)
          }
      }
    }
  var re = function () {
    this.blockSize = -1
  }
  var ve = function (a, b) {
      this.blockSize = -1
      this.blockSize = 64
      this.Vd = q.Uint8Array ? new Uint8Array(this.blockSize) : Array(this.blockSize)
      this.Te = this.rc = 0
      this.F = []
      this.Jj = a
      this.Ah = b
      this.Ck = q.Int32Array ? new Int32Array(64) : Array(64)
      void 0 === te && (te = q.Int32Array ? new Int32Array(ue) : ue)
      this.reset()
    },
    te
  w(ve, re)
  for (var we = [], xe = 0; 63 > xe; xe++) we[xe] = 0
  var ye = [].concat(128, we)
  ve.prototype.reset = function () {
    this.Te = this.rc = 0
    this.F = q.Int32Array ? new Int32Array(this.Ah) : Va(this.Ah)
  }
  var ze = function (a) {
    var b = a.Vd
    x(b.length == a.blockSize)
    for (var c = a.Ck, d = 0, e = 0; e < b.length; )
      (c[d++] = (b[e] << 24) | (b[e + 1] << 16) | (b[e + 2] << 8) | b[e + 3]), (e = 4 * d)
    for (b = 16; 64 > b; b++) {
      e = c[b - 15] | 0
      d = c[b - 2] | 0
      var f =
          ((c[b - 16] | 0) + (((e >>> 7) | (e << 25)) ^ ((e >>> 18) | (e << 14)) ^ (e >>> 3))) | 0,
        g =
          ((c[b - 7] | 0) + (((d >>> 17) | (d << 15)) ^ ((d >>> 19) | (d << 13)) ^ (d >>> 10))) | 0
      c[b] = (f + g) | 0
    }
    d = a.F[0] | 0
    e = a.F[1] | 0
    var h = a.F[2] | 0,
      k = a.F[3] | 0,
      p = a.F[4] | 0,
      n = a.F[5] | 0,
      r = a.F[6] | 0
    f = a.F[7] | 0
    for (b = 0; 64 > b; b++) {
      var t =
        ((((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10))) +
          ((d & e) ^ (d & h) ^ (e & h))) |
        0
      g = (p & n) ^ (~p & r)
      f = (f + (((p >>> 6) | (p << 26)) ^ ((p >>> 11) | (p << 21)) ^ ((p >>> 25) | (p << 7)))) | 0
      g = (g + (te[b] | 0)) | 0
      g = (f + ((g + (c[b] | 0)) | 0)) | 0
      f = r
      r = n
      n = p
      p = (k + g) | 0
      k = h
      h = e
      e = d
      d = (g + t) | 0
    }
    a.F[0] = (a.F[0] + d) | 0
    a.F[1] = (a.F[1] + e) | 0
    a.F[2] = (a.F[2] + h) | 0
    a.F[3] = (a.F[3] + k) | 0
    a.F[4] = (a.F[4] + p) | 0
    a.F[5] = (a.F[5] + n) | 0
    a.F[6] = (a.F[6] + r) | 0
    a.F[7] = (a.F[7] + f) | 0
  }
  ve.prototype.update = function (a, b) {
    void 0 === b && (b = a.length)
    var c = 0,
      d = this.rc
    if ('string' === typeof a)
      for (; c < b; ) (this.Vd[d++] = a.charCodeAt(c++)), d == this.blockSize && (ze(this), (d = 0))
    else if (va(a))
      for (; c < b; ) {
        var e = a[c++]
        if (!('number' == typeof e && 0 <= e && 255 >= e && e == (e | 0)))
          throw Error('message must be a byte array')
        this.Vd[d++] = e
        d == this.blockSize && (ze(this), (d = 0))
      }
    else throw Error('message must be string or array')
    this.rc = d
    this.Te += b
  }
  ve.prototype.digest = function () {
    var a = [],
      b = 8 * this.Te
    56 > this.rc ? this.update(ye, 56 - this.rc) : this.update(ye, this.blockSize - (this.rc - 56))
    for (var c = 63; 56 <= c; c--) (this.Vd[c] = b & 255), (b /= 256)
    ze(this)
    for (c = b = 0; c < this.Jj; c++)
      for (var d = 24; 0 <= d; d -= 8) a[b++] = (this.F[c] >> d) & 255
    return a
  }
  var ue = [
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221,
    3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580,
    3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895,
    666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
    2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
    1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298,
  ]
  var Be = function () {
    ve.call(this, 8, Ae)
  }
  w(Be, ve)
  var Ae = [
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225,
  ]
  var Ce = function () {
    this.Xc = this.Xc
    this.ye = this.ye
  }
  Ce.prototype.Xc = !1
  Ce.prototype.isDisposed = function () {
    return this.Xc
  }
  Ce.prototype.Hb = function () {
    this.Xc || ((this.Xc = !0), this.Wc())
  }
  Ce.prototype.Wc = function () {
    if (this.ye) for (; this.ye.length; ) this.ye.shift()()
  }
  var G = function (a, b) {
    this.type = a
    this.currentTarget = this.target = b
    this.defaultPrevented = this.rd = !1
  }
  G.prototype.stopPropagation = function () {
    this.rd = !0
  }
  G.prototype.preventDefault = function () {
    this.defaultPrevented = !0
  }
  var De = (function () {
    if (!q.addEventListener || !Object.defineProperty) return !1
    var a = !1,
      b = Object.defineProperty({}, 'passive', {
        get: function () {
          a = !0
        },
      })
    try {
      q.addEventListener('test', function () {}, b),
        q.removeEventListener('test', function () {}, b)
    } catch (c) {}
    return a
  })()
  var Ee = function (a, b) {
    G.call(this, a ? a.type : '')
    this.relatedTarget = this.currentTarget = this.target = null
    this.button =
      this.screenY =
      this.screenX =
      this.clientY =
      this.clientX =
      this.offsetY =
      this.offsetX =
        0
    this.key = ''
    this.charCode = this.keyCode = 0
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1
    this.state = null
    this.pointerId = 0
    this.pointerType = ''
    this.qa = null
    a && this.init(a, b)
  }
  w(Ee, G)
  var Fe = Lc({ 2: 'touch', 3: 'pen', 4: 'mouse' })
  Ee.prototype.init = function (a, b) {
    var c = (this.type = a.type),
      d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null
    this.target = a.target || a.srcElement
    this.currentTarget = b
    if ((b = a.relatedTarget)) {
      if (pd) {
        a: {
          try {
            kd(b.nodeName)
            var e = !0
            break a
          } catch (f) {}
          e = !1
        }
        e || (b = null)
      }
    } else 'mouseover' == c ? (b = a.fromElement) : 'mouseout' == c && (b = a.toElement)
    this.relatedTarget = b
    d
      ? ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
        (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
        (this.screenX = d.screenX || 0),
        (this.screenY = d.screenY || 0))
      : ((this.offsetX = qd || void 0 !== a.offsetX ? a.offsetX : a.layerX),
        (this.offsetY = qd || void 0 !== a.offsetY ? a.offsetY : a.layerY),
        (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
        (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
        (this.screenX = a.screenX || 0),
        (this.screenY = a.screenY || 0))
    this.button = a.button
    this.keyCode = a.keyCode || 0
    this.key = a.key || ''
    this.charCode = a.charCode || ('keypress' == c ? a.keyCode : 0)
    this.ctrlKey = a.ctrlKey
    this.altKey = a.altKey
    this.shiftKey = a.shiftKey
    this.metaKey = a.metaKey
    this.pointerId = a.pointerId || 0
    this.pointerType = 'string' === typeof a.pointerType ? a.pointerType : Fe[a.pointerType] || ''
    this.state = a.state
    this.qa = a
    a.defaultPrevented && Ee.Yb.preventDefault.call(this)
  }
  Ee.prototype.stopPropagation = function () {
    Ee.Yb.stopPropagation.call(this)
    this.qa.stopPropagation ? this.qa.stopPropagation() : (this.qa.cancelBubble = !0)
  }
  Ee.prototype.preventDefault = function () {
    Ee.Yb.preventDefault.call(this)
    var a = this.qa
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1)
  }
  Ee.prototype.dj = function () {
    return this.qa
  }
  var Ge = 'closure_listenable_' + ((1e6 * Math.random()) | 0)
  var He = 0
  var Ie = function (a, b, c, d, e) {
      this.listener = a
      this.proxy = null
      this.src = b
      this.type = c
      this.capture = !!d
      this.ge = e
      this.key = ++He
      this.wd = this.Rd = !1
    },
    Je = function (a) {
      a.wd = !0
      a.listener = null
      a.proxy = null
      a.src = null
      a.ge = null
    }
  var Ke = function (a) {
    this.src = a
    this.ia = {}
    this.Fd = 0
  }
  Ke.prototype.add = function (a, b, c, d, e) {
    var f = a.toString()
    a = this.ia[f]
    a || ((a = this.ia[f] = []), this.Fd++)
    var g = Le(a, b, d, e)
    ;-1 < g
      ? ((b = a[g]), c || (b.Rd = !1))
      : ((b = new Ie(b, this.src, f, !!d, e)), (b.Rd = c), a.push(b))
    return b
  }
  Ke.prototype.remove = function (a, b, c, d) {
    a = a.toString()
    if (!(a in this.ia)) return !1
    var e = this.ia[a]
    b = Le(e, b, c, d)
    return -1 < b ? (Je(e[b]), Ta(e, b), 0 == e.length && (delete this.ia[a], this.Fd--), !0) : !1
  }
  var Me = function (a, b) {
    var c = b.type
    c in a.ia && Sa(a.ia[c], b) && (Je(b), 0 == a.ia[c].length && (delete a.ia[c], a.Fd--))
  }
  Ke.prototype.Ef = function (a, b, c, d) {
    a = this.ia[a.toString()]
    var e = -1
    a && (e = Le(a, b, c, d))
    return -1 < e ? a[e] : null
  }
  Ke.prototype.hasListener = function (a, b) {
    var c = void 0 !== a,
      d = c ? a.toString() : '',
      e = void 0 !== b
    return Xa(this.ia, function (f) {
      for (var g = 0; g < f.length; ++g)
        if (!((c && f[g].type != d) || (e && f[g].capture != b))) return !0
      return !1
    })
  }
  var Le = function (a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e]
      if (!f.wd && f.listener == b && f.capture == !!c && f.ge == d) return e
    }
    return -1
  }
  var Ne = 'closure_lm_' + ((1e6 * Math.random()) | 0),
    Oe = {},
    Pe = 0,
    Re = function (a, b, c, d, e) {
      if (d && d.once) return Qe(a, b, c, d, e)
      if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++) Re(a, b[f], c, d, e)
        return null
      }
      c = Se(c)
      return a && a[Ge] ? a.listen(b, c, u(d) ? !!d.capture : !!d, e) : Te(a, b, c, !1, d, e)
    },
    Te = function (a, b, c, d, e, f) {
      if (!b) throw Error('Invalid event type')
      var g = u(e) ? !!e.capture : !!e,
        h = Ue(a)
      h || (a[Ne] = h = new Ke(a))
      c = h.add(b, c, d, g, f)
      if (c.proxy) return c
      d = Ve()
      c.proxy = d
      d.src = a
      d.listener = c
      if (a.addEventListener)
        De || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e)
      else if (a.attachEvent) a.attachEvent(We(b.toString()), d)
      else if (a.addListener && a.removeListener)
        x('change' === b, 'MediaQueryList only has a change event'), a.addListener(d)
      else throw Error('addEventListener and attachEvent are unavailable.')
      Pe++
      return c
    },
    Ve = function () {
      var a = Xe,
        b = function (c) {
          return a.call(b.src, b.listener, c)
        }
      return b
    },
    Qe = function (a, b, c, d, e) {
      if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++) Qe(a, b[f], c, d, e)
        return null
      }
      c = Se(c)
      return a && a[Ge] ? Ye(a, b, c, u(d) ? !!d.capture : !!d, e) : Te(a, b, c, !0, d, e)
    },
    Ze = function (a, b, c, d, e) {
      if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Ze(a, b[f], c, d, e)
      else
        (d = u(d) ? !!d.capture : !!d),
          (c = Se(c)),
          a && a[Ge]
            ? a.Ea.remove(String(b), c, d, e)
            : a && (a = Ue(a)) && (b = a.Ef(b, c, d, e)) && $e(b)
    },
    $e = function (a) {
      if ('number' !== typeof a && a && !a.wd) {
        var b = a.src
        if (b && b[Ge]) Me(b.Ea, a)
        else {
          var c = a.type,
            d = a.proxy
          b.removeEventListener
            ? b.removeEventListener(c, d, a.capture)
            : b.detachEvent
            ? b.detachEvent(We(c), d)
            : b.addListener && b.removeListener && b.removeListener(d)
          Pe--
          ;(c = Ue(b)) ? (Me(c, a), 0 == c.Fd && ((c.src = null), (b[Ne] = null))) : Je(a)
        }
      }
    },
    We = function (a) {
      return a in Oe ? Oe[a] : (Oe[a] = 'on' + a)
    },
    Xe = function (a, b) {
      if (a.wd) a = !0
      else {
        b = new Ee(b, this)
        var c = a.listener,
          d = a.ge || a.src
        a.Rd && $e(a)
        a = c.call(d, b)
      }
      return a
    },
    Ue = function (a) {
      a = a[Ne]
      return a instanceof Ke ? a : null
    },
    af = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0),
    Se = function (a) {
      x(a, 'Listener can not be null.')
      if ('function' === typeof a) return a
      x(a.handleEvent, 'An object listener must have handleEvent method.')
      a[af] ||
        (a[af] = function (b) {
          return a.handleEvent(b)
        })
      return a[af]
    }
  var bf = function () {
    Ce.call(this)
    this.Ea = new Ke(this)
    this.Mi = this
    this.Zf = null
  }
  w(bf, Ce)
  bf.prototype[Ge] = !0
  l = bf.prototype
  l.addEventListener = function (a, b, c, d) {
    Re(this, a, b, c, d)
  }
  l.removeEventListener = function (a, b, c, d) {
    Ze(this, a, b, c, d)
  }
  l.dispatchEvent = function (a) {
    cf(this)
    var b = this.Zf
    if (b) {
      var c = []
      for (var d = 1; b; b = b.Zf) c.push(b), x(1e3 > ++d, 'infinite loop')
    }
    b = this.Mi
    d = a.type || a
    if ('string' === typeof a) a = new G(a, b)
    else if (a instanceof G) a.target = a.target || b
    else {
      var e = a
      a = new G(d, b)
      ab(a, e)
    }
    e = !0
    if (c)
      for (var f = c.length - 1; !a.rd && 0 <= f; f--) {
        var g = (a.currentTarget = c[f])
        e = df(g, d, !0, a) && e
      }
    a.rd ||
      ((g = a.currentTarget = b), (e = df(g, d, !0, a) && e), a.rd || (e = df(g, d, !1, a) && e))
    if (c)
      for (f = 0; !a.rd && f < c.length; f++)
        (g = a.currentTarget = c[f]), (e = df(g, d, !1, a) && e)
    return e
  }
  l.Wc = function () {
    bf.Yb.Wc.call(this)
    if (this.Ea) {
      var a = this.Ea,
        b = 0,
        c
      for (c in a.ia) {
        for (var d = a.ia[c], e = 0; e < d.length; e++) ++b, Je(d[e])
        delete a.ia[c]
        a.Fd--
      }
    }
    this.Zf = null
  }
  l.listen = function (a, b, c, d) {
    cf(this)
    return this.Ea.add(String(a), b, !1, c, d)
  }
  var Ye = function (a, b, c, d, e) {
      return a.Ea.add(String(b), c, !0, d, e)
    },
    df = function (a, b, c, d) {
      b = a.Ea.ia[String(b)]
      if (!b) return !0
      b = b.concat()
      for (var e = !0, f = 0; f < b.length; ++f) {
        var g = b[f]
        if (g && !g.wd && g.capture == c) {
          var h = g.listener,
            k = g.ge || g.src
          g.Rd && Me(a.Ea, g)
          e = !1 !== h.call(k, d) && e
        }
      }
      return e && !d.defaultPrevented
    }
  bf.prototype.Ef = function (a, b, c, d) {
    return this.Ea.Ef(String(a), b, c, d)
  }
  bf.prototype.hasListener = function (a, b) {
    return this.Ea.hasListener(void 0 !== a ? String(a) : void 0, b)
  }
  var cf = function (a) {
    x(
      a.Ea,
      'Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?'
    )
  }
  var ef = function () {}
  ef.prototype.Og = null
  var ff = function (a) {
    return a.Og || (a.Og = a.me())
  }
  var gf,
    hf = function () {}
  w(hf, ef)
  hf.prototype.Rc = function () {
    var a = jf(this)
    return a ? new ActiveXObject(a) : new XMLHttpRequest()
  }
  hf.prototype.me = function () {
    var a = {}
    jf(this) && ((a[0] = !0), (a[1] = !0))
    return a
  }
  var jf = function (a) {
    if (!a.yh && 'undefined' == typeof XMLHttpRequest && 'undefined' != typeof ActiveXObject) {
      for (
        var b = ['MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'],
          c = 0;
        c < b.length;
        c++
      ) {
        var d = b[c]
        try {
          return new ActiveXObject(d), (a.yh = d)
        } catch (e) {}
      }
      throw Error(
        'Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed'
      )
    }
    return a.yh
  }
  gf = new hf()
  var kf = function () {}
  w(kf, ef)
  kf.prototype.Rc = function () {
    var a = new XMLHttpRequest()
    if ('withCredentials' in a) return a
    if ('undefined' != typeof XDomainRequest) return new lf()
    throw Error('Unsupported browser')
  }
  kf.prototype.me = function () {
    return {}
  }
  var lf = function () {
    this.Oa = new XDomainRequest()
    this.readyState = 0
    this.onreadystatechange = null
    this.responseType = this.responseText = this.response = ''
    this.status = -1
    this.responseXML = null
    this.statusText = ''
    this.Oa.onload = v(this.jj, this)
    this.Oa.onerror = v(this.sh, this)
    this.Oa.onprogress = v(this.kj, this)
    this.Oa.ontimeout = v(this.oj, this)
  }
  l = lf.prototype
  l.open = function (a, b, c) {
    if (null != c && !c) throw Error('Only async requests are supported.')
    this.Oa.open(a, b)
  }
  l.send = function (a) {
    if (a)
      if ('string' == typeof a) this.Oa.send(a)
      else throw Error('Only string data is supported')
    else this.Oa.send()
  }
  l.abort = function () {
    this.Oa.abort()
  }
  l.setRequestHeader = function () {}
  l.getResponseHeader = function (a) {
    return 'content-type' == a.toLowerCase() ? this.Oa.contentType : ''
  }
  l.jj = function () {
    this.status = 200
    this.response = this.responseText = this.Oa.responseText
    mf(this, 4)
  }
  l.sh = function () {
    this.status = 500
    this.response = this.responseText = ''
    mf(this, 4)
  }
  l.oj = function () {
    this.sh()
  }
  l.kj = function () {
    this.status = 200
    mf(this, 1)
  }
  var mf = function (a, b) {
    a.readyState = b
    if (a.onreadystatechange) a.onreadystatechange()
  }
  lf.prototype.getAllResponseHeaders = function () {
    return 'content-type: ' + this.Oa.contentType
  }
  var nf = function (a) {
    this.Id = a.Ek || null
    this.Bd = a.Wk || !1
    this.fc = this.Gb = void 0
  }
  w(nf, ef)
  nf.prototype.Rc = function () {
    var a = new of(this.Id, this.Bd)
    this.Gb && a.sg(this.Gb)
    this.fc && a.ki(this.fc)
    return a
  }
  nf.prototype.me = (function (a) {
    return function () {
      return a
    }
  })({})
  nf.prototype.sg = function (a) {
    this.Gb = a
  }
  nf.prototype.ki = function (a) {
    this.fc = a
  }
  var of = function (a, b) {
    bf.call(this)
    this.Id = a
    this.Bd = b
    this.fc = this.Gb = void 0
    this.status = this.readyState = 0
    this.responseType = this.responseText = this.response = this.statusText = ''
    this.onreadystatechange = this.responseXML = null
    this.og = new Headers()
    this.Fc = null
    this.Lh = 'GET'
    this.Zb = ''
    this.Sa = !1
    this.P = $c(ad(), 'goog.net.FetchXmlHttp').Qf
    this.Bg = this.Sc = this.Zd = null
  }
  w(of, bf)
  of.prototype.open = function (a, b, c) {
    x(!!c, 'Only async requests are supported.')
    if (0 != this.readyState) throw (this.abort(), Error('Error reopening a connection'))
    this.Lh = a
    this.Zb = b
    this.readyState = 1
    pf(this)
  }
  of.prototype.send = function (a) {
    if (1 != this.readyState) throw (this.abort(), Error('need to call open() first. '))
    this.Sa = !0
    var b = { headers: this.og, method: this.Lh, credentials: this.Gb, cache: this.fc }
    a && (b.body = a)
    ;(this.Id || q).fetch(new Request(this.Zb, b)).then(this.nj.bind(this), this.fe.bind(this))
  }
  of.prototype.abort = function () {
    var a = this
    this.response = this.responseText = ''
    this.og = new Headers()
    this.status = 0
    this.Sc &&
      this.Sc.cancel('Request was aborted.').catch(function () {
        var b = a.P
        b && bd(b, Pc, 'Fetch reader cancellation error.')
      })
    1 <= this.readyState && this.Sa && 4 != this.readyState && ((this.Sa = !1), qf(this))
    this.readyState = 0
  }
  of.prototype.nj = function (a) {
    if (
      this.Sa &&
      ((this.Zd = a),
      this.Fc ||
        ((this.status = this.Zd.status),
        (this.statusText = this.Zd.statusText),
        (this.Fc = a.headers),
        (this.readyState = 2),
        pf(this)),
      this.Sa && ((this.readyState = 3), pf(this), this.Sa))
    )
      if ('arraybuffer' === this.responseType)
        a.arrayBuffer().then(this.lj.bind(this), this.fe.bind(this))
      else if ('undefined' !== typeof q.ReadableStream && 'body' in a) {
        this.Sc = a.body.getReader()
        if (this.Bd) {
          if (this.responseType)
            throw Error('responseType must be empty for "streamBinaryChunks" mode responses.')
          this.response = []
        } else (this.response = this.responseText = ''), (this.Bg = new TextDecoder())
        rf(this)
      } else a.text().then(this.mj.bind(this), this.fe.bind(this))
  }
  var rf = function (a) {
    a.Sc.read().then(a.hj.bind(a)).catch(a.fe.bind(a))
  }
  of.prototype.hj = function (a) {
    if (this.Sa) {
      if (this.Bd && a.value) this.response.push(a.value)
      else if (!this.Bd) {
        var b = a.value ? a.value : new Uint8Array(0)
        if ((b = this.Bg.decode(b, { stream: !a.done }))) this.response = this.responseText += b
      }
      a.done ? qf(this) : pf(this)
      3 == this.readyState && rf(this)
    }
  }
  of.prototype.mj = function (a) {
    this.Sa && ((this.response = this.responseText = a), qf(this))
  }
  of.prototype.lj = function (a) {
    this.Sa && ((this.response = a), qf(this))
  }
  of.prototype.fe = function () {
    var a = this.P
    a && bd(a, Pc, 'Failed to fetch url ' + this.Zb)
    this.Sa && qf(this)
  }
  var qf = function (a) {
    a.readyState = 4
    a.Zd = null
    a.Sc = null
    a.Bg = null
    pf(a)
  }
  l = of.prototype
  l.setRequestHeader = function (a, b) {
    this.og.append(a, b)
  }
  l.getResponseHeader = function (a) {
    return this.Fc
      ? this.Fc.get(a.toLowerCase()) || ''
      : ((a = this.P) &&
          bd(
            a,
            Pc,
            'Attempting to get response header but no headers have been received for url: ' +
              this.Zb
          ),
        '')
  }
  l.getAllResponseHeaders = function () {
    if (!this.Fc) {
      var a = this.P
      a &&
        bd(
          a,
          Pc,
          'Attempting to get all response headers but no headers have been received for url: ' +
            this.Zb
        )
      return ''
    }
    a = []
    for (var b = this.Fc.entries(), c = b.next(); !c.done; )
      (c = c.value), a.push(c[0] + ': ' + c[1]), (c = b.next())
    return a.join('\r\n')
  }
  l.sg = function (a) {
    this.Gb = a
  }
  l.ki = function (a) {
    this.fc = a
  }
  var pf = function (a) {
    a.onreadystatechange && a.onreadystatechange.call(a)
  }
  Object.defineProperty(of.prototype, 'withCredentials', {
    get: function () {
      return 'include' === this.Gb
    },
    set: function (a) {
      this.sg(a ? 'include' : 'same-origin')
    },
  })
  var sf = function (a, b) {
    this.Ej = 100
    this.Ti = a
    this.Wj = b
    this.we = 0
    this.ra = null
  }
  sf.prototype.get = function () {
    if (0 < this.we) {
      this.we--
      var a = this.ra
      this.ra = a.next
      a.next = null
    } else a = this.Ti()
    return a
  }
  sf.prototype.put = function (a) {
    this.Wj(a)
    this.we < this.Ej && (this.we++, (a.next = this.ra), (this.ra = a))
  }
  var tf,
    uf = function () {
      var a = q.MessageChannel
      'undefined' === typeof a &&
        'undefined' !== typeof window &&
        window.postMessage &&
        window.addEventListener &&
        !B('Presto') &&
        (a = function () {
          var e = Sd(document, 'IFRAME')
          e.style.display = 'none'
          document.documentElement.appendChild(e)
          var f = e.contentWindow
          e = f.document
          e.open()
          e.close()
          var g = 'callImmediate' + Math.random(),
            h = 'file:' == f.location.protocol ? '*' : f.location.protocol + '//' + f.location.host
          e = v(function (k) {
            if (('*' == h || k.origin == h) && k.data == g) this.port1.onmessage()
          }, this)
          f.addEventListener('message', e, !1)
          this.port1 = {}
          this.port2 = {
            postMessage: function () {
              f.postMessage(g, h)
            },
          }
        })
      if ('undefined' !== typeof a && !Xb()) {
        var b = new a(),
          c = {},
          d = c
        b.port1.onmessage = function () {
          if (void 0 !== c.next) {
            c = c.next
            var e = c.Rg
            c.Rg = null
            e()
          }
        }
        return function (e) {
          d.next = { Rg: e }
          d = d.next
          b.port2.postMessage(0)
        }
      }
      return function (e) {
        q.setTimeout(e, 0)
      }
    }
  var vf = function () {
    this.Ye = this.cc = null
  }
  vf.prototype.add = function (a, b) {
    var c = wf.get()
    c.set(a, b)
    this.Ye ? (this.Ye.next = c) : (x(!this.cc), (this.cc = c))
    this.Ye = c
  }
  vf.prototype.remove = function () {
    var a = null
    this.cc &&
      ((a = this.cc), (this.cc = this.cc.next), this.cc || (this.Ye = null), (a.next = null))
    return a
  }
  var wf = new sf(
      function () {
        return new xf()
      },
      function (a) {
        return a.reset()
      }
    ),
    xf = function () {
      this.next = this.scope = this.Cf = null
    }
  xf.prototype.set = function (a, b) {
    this.Cf = a
    this.scope = b
    this.next = null
  }
  xf.prototype.reset = function () {
    this.next = this.scope = this.Cf = null
  }
  var yf = q.console && q.console.createTask ? q.console.createTask.bind(q.console) : void 0,
    zf = yf ? Symbol('consoleTask') : void 0
  function Af(a, b) {
    function c() {
      var e = pa.apply(0, arguments),
        f = this
      return d.run(function () {
        var g = a.call,
          h = g.apply,
          k = [f],
          p = k.concat
        if (e instanceof Array) var n = e
        else {
          n = ia(e)
          for (var r, t = []; !(r = n.next()).done; ) t.push(r.value)
          n = t
        }
        return h.call(g, a, p.call(k, n))
      })
    }
    b = void 0 === b ? 'anonymous' : b
    if (!yf || a[Ea(zf)]) return a
    var d = yf(a.name || b)
    c[Ea(zf)] = d
    return c
  }
  var Bf,
    Cf = !1,
    Df = new vf(),
    Ff = function (a, b) {
      Bf || Ef()
      Cf || (Bf(), (Cf = !0))
      a = Af(a, 'goog.async.run')
      Df.add(a, b)
    },
    Ef = function () {
      if (q.Promise && q.Promise.resolve) {
        var a = q.Promise.resolve(void 0)
        Bf = function () {
          a.then(Gf)
        }
      } else
        Bf = function () {
          var b = Gf
          'function' !== typeof q.setImmediate ||
          (q.Window &&
            q.Window.prototype &&
            (Wb() || !B('Edge')) &&
            q.Window.prototype.setImmediate == q.setImmediate)
            ? (tf || (tf = uf()), tf(b))
            : q.setImmediate(b)
        }
    },
    Gf = function () {
      for (var a; (a = Df.remove()); ) {
        try {
          a.Cf.call(a.scope)
        } catch (b) {
          le(b)
        }
        wf.put(a)
      }
      Cf = !1
    }
  function Hf() {}
  var If = function (a) {
    if (!a) return !1
    try {
      return !!a.$goog_Thenable
    } catch (b) {
      return !1
    }
  }
  var H = function (a, b) {
      this.R = 0
      this.ma = void 0
      this.hc = this.Za = this.ta = null
      this.ee = this.yf = !1
      if (a != Ka)
        try {
          var c = this
          a.call(
            b,
            function (d) {
              Jf(c, 2, d)
            },
            function (d) {
              if (!(d instanceof Kf))
                try {
                  if (d instanceof Error) throw d
                  throw Error('Promise rejected.')
                } catch (e) {}
              Jf(c, 3, d)
            }
          )
        } catch (d) {
          Jf(this, 3, d)
        }
    },
    Lf = function () {
      this.next = this.context = this.uc = this.Sb = this.child = null
      this.Nc = !1
    }
  Lf.prototype.reset = function () {
    this.context = this.uc = this.Sb = this.child = null
    this.Nc = !1
  }
  var Mf = new sf(
      function () {
        return new Lf()
      },
      function (a) {
        a.reset()
      }
    ),
    Nf = function (a, b, c) {
      var d = Mf.get()
      d.Sb = a
      d.uc = b
      d.context = c
      return d
    },
    I = function (a) {
      if (a instanceof H) return a
      var b = new H(Ka)
      Jf(b, 2, a)
      return b
    },
    J = function (a) {
      return new H(function (b, c) {
        c(a)
      })
    },
    Pf = function (a, b, c) {
      Of(a, b, c, null) || Ff(ya(b, a))
    },
    Qf = function (a) {
      return new H(function (b, c) {
        var d = a.length,
          e = []
        if (d)
          for (
            var f = function (p, n) {
                d--
                e[p] = n
                0 == d && b(e)
              },
              g = function (p) {
                c(p)
              },
              h = 0,
              k;
            h < a.length;
            h++
          )
            (k = a[h]), Pf(k, ya(f, h), g)
        else b(e)
      })
    },
    Rf = function (a) {
      return new H(function (b) {
        var c = a.length,
          d = []
        if (c)
          for (
            var e = function (h, k, p) {
                c--
                d[h] = k ? { oh: !0, value: p } : { oh: !1, reason: p }
                0 == c && b(d)
              },
              f = 0,
              g;
            f < a.length;
            f++
          )
            (g = a[f]), Pf(g, ya(e, f, !0), ya(e, f, !1))
        else b(d)
      })
    },
    Sf = function (a) {
      return new H(function (b, c) {
        var d = a.length,
          e = []
        if (d)
          for (
            var f = function (p) {
                b(p)
              },
              g = function (p, n) {
                d--
                e[p] = n
                0 == d && c(e)
              },
              h = 0,
              k;
            h < a.length;
            h++
          )
            (k = a[h]), Pf(k, f, ya(g, h))
        else b(void 0)
      })
    }
  H.prototype.then = function (a, b, c) {
    null != a && Ia(a, 'opt_onFulfilled should be a function.')
    null != b &&
      Ia(
        b,
        'opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?'
      )
    return Tf(this, 'function' === typeof a ? a : null, 'function' === typeof b ? b : null, c)
  }
  H.prototype.$goog_Thenable = !0
  H.prototype.Bb = function (a, b) {
    a = Nf(a, a, b)
    a.Nc = !0
    Uf(this, a)
    return this
  }
  H.prototype.h = function (a, b) {
    return Tf(this, null, a, b)
  }
  H.prototype.catch = H.prototype.h
  H.prototype.cancel = function (a) {
    if (0 == this.R) {
      var b = new Kf(a)
      Ff(function () {
        Vf(this, b)
      }, this)
    }
  }
  var Vf = function (a, b) {
      if (0 == a.R)
        if (a.ta) {
          var c = a.ta
          if (c.Za) {
            for (
              var d = 0, e = null, f = null, g = c.Za;
              g && (g.Nc || (d++, g.child == a && (e = g), !(e && 1 < d)));
              g = g.next
            )
              e || (f = g)
            e &&
              (0 == c.R && 1 == d
                ? Vf(c, b)
                : (f
                    ? ((d = f),
                      x(c.Za),
                      x(null != d),
                      d.next == c.hc && (c.hc = d),
                      (d.next = d.next.next))
                    : Wf(c),
                  Xf(c, e, 3, b)))
          }
          a.ta = null
        } else Jf(a, 3, b)
    },
    Uf = function (a, b) {
      a.Za || (2 != a.R && 3 != a.R) || Yf(a)
      x(null != b.Sb)
      a.hc ? (a.hc.next = b) : (a.Za = b)
      a.hc = b
    },
    Tf = function (a, b, c, d) {
      b && (b = Af(b, 'goog.Promise.then'))
      c && (c = Af(c, 'goog.Promise.then'))
      var e = Nf(null, null, null)
      e.child = new H(function (f, g) {
        e.Sb = b
          ? function (h) {
              try {
                var k = b.call(d, h)
                f(k)
              } catch (p) {
                g(p)
              }
            }
          : f
        e.uc = c
          ? function (h) {
              try {
                var k = c.call(d, h)
                void 0 === k && h instanceof Kf ? g(h) : f(k)
              } catch (p) {
                g(p)
              }
            }
          : g
      })
      e.child.ta = a
      Uf(a, e)
      return e.child
    }
  H.prototype.xk = function (a) {
    x(1 == this.R)
    this.R = 0
    Jf(this, 2, a)
  }
  H.prototype.yk = function (a) {
    x(1 == this.R)
    this.R = 0
    Jf(this, 3, a)
  }
  var Jf = function (a, b, c) {
      0 == a.R &&
        (a === c && ((b = 3), (c = new TypeError('Promise cannot resolve to itself'))),
        (a.R = 1),
        Of(c, a.xk, a.yk, a) ||
          ((a.ma = c), (a.R = b), (a.ta = null), Yf(a), 3 != b || c instanceof Kf || Zf(a, c)))
    },
    Of = function (a, b, c, d) {
      if (a instanceof H)
        return (
          null != b && Ia(b, 'opt_onFulfilled should be a function.'),
          null != c &&
            Ia(
              c,
              'opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?'
            ),
          Uf(a, Nf(b || Ka, c || null, d)),
          !0
        )
      if (If(a)) return a.then(b, c, d), !0
      if (u(a))
        try {
          var e = a.then
          if ('function' === typeof e) return $f(a, e, b, c, d), !0
        } catch (f) {
          return c.call(d, f), !0
        }
      return !1
    },
    $f = function (a, b, c, d, e) {
      var f = !1,
        g = function (k) {
          f || ((f = !0), c.call(e, k))
        },
        h = function (k) {
          f || ((f = !0), d.call(e, k))
        }
      try {
        b.call(a, g, h)
      } catch (k) {
        h(k)
      }
    },
    Yf = function (a) {
      a.yf || ((a.yf = !0), Ff(a.Zi, a))
    },
    Wf = function (a) {
      var b = null
      a.Za && ((b = a.Za), (a.Za = b.next), (b.next = null))
      a.Za || (a.hc = null)
      null != b && x(null != b.Sb)
      return b
    }
  H.prototype.Zi = function () {
    for (var a; (a = Wf(this)); ) Xf(this, a, this.R, this.ma)
    this.yf = !1
  }
  var Xf = function (a, b, c, d) {
      if (3 == c && b.uc && !b.Nc) for (; a && a.ee; a = a.ta) a.ee = !1
      if (b.child) (b.child.ta = null), ag(b, c, d)
      else
        try {
          b.Nc ? b.Sb.call(b.context) : ag(b, c, d)
        } catch (e) {
          bg.call(null, e)
        }
      Mf.put(b)
    },
    ag = function (a, b, c) {
      2 == b ? a.Sb.call(a.context, c) : a.uc && a.uc.call(a.context, c)
    },
    Zf = function (a, b) {
      a.ee = !0
      Ff(function () {
        a.ee && bg.call(null, b)
      })
    },
    bg = le,
    Kf = function (a) {
      Aa.call(this, a)
    }
  w(Kf, Aa)
  Kf.prototype.name = 'cancel' /*

 Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: MIT
*/
  var cg = function (a, b) {
    this.Me = []
    this.Oh = a
    this.fh = b || null
    this.dd = this.mc = !1
    this.ma = void 0
    this.xg = this.Lg = this.hf = !1
    this.Ue = 0
    this.ta = null
    this.jf = 0
  }
  w(cg, Hf)
  cg.prototype.cancel = function (a) {
    if (this.mc) this.ma instanceof cg && this.ma.cancel()
    else {
      if (this.ta) {
        var b = this.ta
        delete this.ta
        a ? b.cancel(a) : (b.jf--, 0 >= b.jf && b.cancel())
      }
      this.Oh ? this.Oh.call(this.fh, this) : (this.xg = !0)
      this.mc || dg(this, new eg(this))
    }
  }
  cg.prototype.Xg = function (a, b) {
    this.hf = !1
    fg(this, a, b)
  }
  var fg = function (a, b, c) {
      a.mc = !0
      a.ma = c
      a.dd = !b
      gg(a)
    },
    ig = function (a) {
      if (a.mc) {
        if (!a.xg) throw new hg(a)
        a.xg = !1
      }
    }
  cg.prototype.callback = function (a) {
    ig(this)
    jg(a)
    fg(this, !0, a)
  }
  var dg = function (a, b) {
      ig(a)
      jg(b)
      fg(a, !1, b)
    },
    jg = function (a) {
      x(!(a instanceof cg), 'An execution sequence may not be initiated with a blocking Deferred.')
    }
  cg.prototype.addCallback = function (a, b) {
    return kg(this, a, null, b)
  }
  var lg = function (a, b) {
      kg(a, null, b)
    },
    kg = function (a, b, c, d) {
      x(!a.Lg, 'Blocking Deferreds can not be re-used')
      a.Me.push([b, c, d])
      a.mc && gg(a)
      return a
    }
  cg.prototype.then = function (a, b, c) {
    var d,
      e,
      f = new H(function (g, h) {
        e = g
        d = h
      })
    kg(
      this,
      e,
      function (g) {
        g instanceof eg ? f.cancel() : d(g)
        return mg
      },
      this
    )
    return f.then(a, b, c)
  }
  cg.prototype.$goog_Thenable = !0
  var ng = function (a) {
      return Qa(a.Me, function (b) {
        return 'function' === typeof b[1]
      })
    },
    mg = {},
    gg = function (a) {
      if (a.Ue && a.mc && ng(a)) {
        var b = a.Ue,
          c = og[b]
        c && (q.clearTimeout(c.Fa), delete og[b])
        a.Ue = 0
      }
      a.ta && (a.ta.jf--, delete a.ta)
      b = a.ma
      for (var d = (c = !1); a.Me.length && !a.hf; ) {
        var e = a.Me.shift(),
          f = e[0],
          g = e[1]
        e = e[2]
        if ((f = a.dd ? g : f))
          try {
            var h = f.call(e || a.fh, b)
            h === mg && (h = void 0)
            void 0 !== h && ((a.dd = a.dd && (h == b || h instanceof Error)), (a.ma = b = h))
            if (If(b) || ('function' === typeof q.Promise && b instanceof q.Promise))
              (d = !0), (a.hf = !0)
          } catch (k) {
            ;(b = k), (a.dd = !0), ng(a) || (c = !0)
          }
      }
      a.ma = b
      d &&
        ((h = v(a.Xg, a, !0)),
        (d = v(a.Xg, a, !1)),
        b instanceof cg ? (kg(b, h, d), (b.Lg = !0)) : b.then(h, d))
      c && ((b = new pg(b)), (og[b.Fa] = b), (a.Ue = b.Fa))
    },
    hg = function () {
      Aa.call(this)
    }
  w(hg, Aa)
  hg.prototype.message = 'Deferred has already fired'
  hg.prototype.name = 'AlreadyCalledError'
  var eg = function () {
    Aa.call(this)
  }
  w(eg, Aa)
  eg.prototype.message = 'Deferred was canceled'
  eg.prototype.name = 'CanceledError'
  var pg = function (a) {
    this.Fa = q.setTimeout(v(this.wk, this), 0)
    this.Y = a
  }
  pg.prototype.wk = function () {
    x(og[this.Fa], 'Cannot throw an error that is not scheduled.')
    delete og[this.Fa]
    throw this.Y
  }
  var og = {}
  var ug = function (a) {
      var b = {},
        c = b.document || document,
        d = kb(a).toString(),
        e = new de(c).createElement('SCRIPT'),
        f = { di: e, Ed: void 0 },
        g = new cg(qg, f),
        h = null,
        k = null != b.timeout ? b.timeout : 5e3
      0 < k &&
        ((h = window.setTimeout(function () {
          rg(e, !0)
          dg(g, new sg(1, 'Timeout reached for loading script ' + d))
        }, k)),
        (f.Ed = h))
      e.onload = e.onreadystatechange = function () {
        ;(e.readyState && 'loaded' != e.readyState && 'complete' != e.readyState) ||
          (rg(e, b.Tk || !1, h), g.callback(null))
      }
      e.onerror = function () {
        rg(e, !0, h)
        dg(g, new sg(0, 'Error while loading script ' + d))
      }
      f = b.attributes || {}
      ab(f, { type: 'text/javascript', charset: 'UTF-8' })
      Pd(e, f)
      hc(e, a)
      tg(c).appendChild(e)
      return g
    },
    tg = function (a) {
      var b = (a || document).getElementsByTagName('HEAD')
      return b && 0 !== b.length ? b[0] : a.documentElement
    },
    qg = function () {
      if (this && this.di) {
        var a = this.di
        a && 'SCRIPT' == a.tagName && rg(a, !0, this.Ed)
      }
    },
    rg = function (a, b, c) {
      null != c && q.clearTimeout(c)
      a.onload = function () {}
      a.onerror = function () {}
      a.onreadystatechange = function () {}
      b &&
        window.setTimeout(function () {
          Wd(a)
        }, 0)
    },
    sg = function (a, b) {
      var c = 'Jsloader error (code #' + a + ')'
      b && (c += ': ' + b)
      Aa.call(this, c)
      this.code = a
    }
  w(sg, Aa)
  var vg = function (a, b, c) {
      if ('function' === typeof a) c && (a = v(a, c))
      else if (a && 'function' == typeof a.handleEvent) a = v(a.handleEvent, a)
      else throw Error('Invalid listener argument')
      return 2147483647 < Number(b) ? -1 : q.setTimeout(a, b || 0)
    },
    wg = function (a) {
      var b = null
      return new H(function (c, d) {
        b = vg(function () {
          c(void 0)
        }, a)
        ;-1 == b && d(Error('Failed to schedule timer.'))
      }).h(function (c) {
        q.clearTimeout(b)
        throw c
      })
    }
  var K = function (a) {
    bf.call(this)
    this.headers = new Map()
    this.af = a || null
    this.lb = !1
    this.Ze = this.j = null
    this.jd = this.Ih = this.qe = ''
    this.Ob = this.Kf = this.le = this.wf = !1
    this.Hc = 0
    this.Re = null
    this.He = ''
    this.Ve = this.Rj = this.Hi = !1
    this.Cg = null
  }
  w(K, bf)
  K.prototype.P = $c(ad(), 'goog.net.XhrIo').Qf
  var xg = /^https?$/i,
    yg = ['POST', 'PUT']
  K.prototype.setTrustToken = function (a) {
    this.Cg = a
  }
  K.prototype.send = function (a, b, c, d) {
    if (this.j)
      throw Error(
        '[goog.net.XhrIo] Object is active with another request=' + this.qe + '; newUri=' + a
      )
    b = b ? b.toUpperCase() : 'GET'
    this.qe = a
    this.jd = ''
    this.Ih = b
    this.wf = !1
    this.lb = !0
    this.j = this.af ? this.af.Rc() : gf.Rc()
    this.Ze = this.af ? ff(this.af) : ff(gf)
    this.j.onreadystatechange = v(this.Vh, this)
    this.Rj &&
      'onprogress' in this.j &&
      ((this.j.onprogress = v(function (g) {
        this.Uh(g, !0)
      }, this)),
      this.j.upload && (this.j.upload.onprogress = v(this.Uh, this)))
    try {
      dd(this.P, zg(this, 'Opening Xhr')),
        (this.Kf = !0),
        this.j.open(b, String(a), !0),
        (this.Kf = !1)
    } catch (g) {
      dd(this.P, zg(this, 'Error opening Xhr: ' + g.message))
      this.Y(5, g)
      return
    }
    a = c || ''
    c = new Map(this.headers)
    if (d)
      if (Object.getPrototypeOf(d) === Object.prototype) for (var e in d) c.set(e, d[e])
      else if ('function' === typeof d.keys && 'function' === typeof d.get) {
        e = ia(d.keys())
        for (var f = e.next(); !f.done; f = e.next()) (f = f.value), c.set(f, d.get(f))
      } else throw Error('Unknown input type for opt_headers: ' + String(d))
    d = Array.from(c.keys()).find(function (g) {
      return 'content-type' == g.toLowerCase()
    })
    e = q.FormData && a instanceof q.FormData
    !Ra(yg, b) || d || e || c.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
    b = ia(c)
    for (d = b.next(); !d.done; d = b.next())
      (c = ia(d.value)), (d = c.next().value), (c = c.next().value), this.j.setRequestHeader(d, c)
    this.He && (this.j.responseType = this.He)
    'withCredentials' in this.j &&
      this.j.withCredentials !== this.Hi &&
      (this.j.withCredentials = this.Hi)
    if ('setTrustToken' in this.j && this.Cg)
      try {
        this.j.setTrustToken(this.Cg)
      } catch (g) {
        dd(this.P, zg(this, 'Error SetTrustToken: ' + g.message))
      }
    try {
      Ag(this),
        0 < this.Hc &&
          ((this.Ve = Bg(this.j)),
          dd(this.P, zg(this, 'Will abort after ' + this.Hc + 'ms if incomplete, xhr2 ' + this.Ve)),
          this.Ve
            ? ((this.j.timeout = this.Hc), (this.j.ontimeout = v(this.Ed, this)))
            : (this.Re = vg(this.Ed, this.Hc, this))),
        dd(this.P, zg(this, 'Sending request')),
        (this.le = !0),
        this.j.send(a),
        (this.le = !1)
    } catch (g) {
      dd(this.P, zg(this, 'Send error: ' + g.message)), this.Y(5, g)
    }
  }
  var Bg = function (a) {
    return md && 'number' === typeof a.timeout && void 0 !== a.ontimeout
  }
  K.prototype.Ed = function () {
    'undefined' != typeof ta &&
      this.j &&
      ((this.jd = 'Timed out after ' + this.Hc + 'ms, aborting'),
      dd(this.P, zg(this, this.jd)),
      this.dispatchEvent('timeout'),
      this.abort(8))
  }
  K.prototype.Y = function (a, b) {
    this.lb = !1
    this.j && ((this.Ob = !0), this.j.abort(), (this.Ob = !1))
    this.jd = b
    Cg(this)
    Dg(this)
  }
  var Cg = function (a) {
    a.wf || ((a.wf = !0), a.dispatchEvent('complete'), a.dispatchEvent('error'))
  }
  K.prototype.abort = function () {
    this.j &&
      this.lb &&
      (dd(this.P, zg(this, 'Aborting')),
      (this.lb = !1),
      (this.Ob = !0),
      this.j.abort(),
      (this.Ob = !1),
      this.dispatchEvent('complete'),
      this.dispatchEvent('abort'),
      Dg(this))
  }
  K.prototype.Wc = function () {
    this.j &&
      (this.lb && ((this.lb = !1), (this.Ob = !0), this.j.abort(), (this.Ob = !1)), Dg(this, !0))
    K.Yb.Wc.call(this)
  }
  K.prototype.Vh = function () {
    this.isDisposed() || (this.Kf || this.le || this.Ob ? Eg(this) : this.Mj())
  }
  K.prototype.Mj = function () {
    Eg(this)
  }
  var Eg = function (a) {
    if (a.lb && 'undefined' != typeof ta)
      if (a.Ze[1] && 4 == Fg(a) && 2 == Gg(a))
        dd(a.P, zg(a, 'Local request error detected and ignored'))
      else if (a.le && 4 == Fg(a)) vg(a.Vh, 0, a)
      else if ((a.dispatchEvent('readystatechange'), 4 == Fg(a))) {
        dd(a.P, zg(a, 'Request complete'))
        a.lb = !1
        try {
          var b = Gg(a)
          a: switch (b) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var c = !0
              break a
            default:
              c = !1
          }
          var d
          if (!(d = c)) {
            var e
            if ((e = 0 === b)) {
              var f = String(a.qe).match(oc)[1] || null
              !f && q.self && q.self.location && (f = q.self.location.protocol.slice(0, -1))
              e = !xg.test(f ? f.toLowerCase() : '')
            }
            d = e
          }
          if (d) a.dispatchEvent('complete'), a.dispatchEvent('success')
          else {
            try {
              var g = 2 < Fg(a) ? a.j.statusText : ''
            } catch (h) {
              dd(a.P, 'Can not get status: ' + h.message), (g = '')
            }
            a.jd = g + ' [' + Gg(a) + ']'
            Cg(a)
          }
        } finally {
          Dg(a)
        }
      }
  }
  K.prototype.Uh = function (a, b) {
    x('progress' === a.type, 'goog.net.EventType.PROGRESS is of the same type as raw XHR progress.')
    this.dispatchEvent(Hg(a, 'progress'))
    this.dispatchEvent(Hg(a, b ? 'downloadprogress' : 'uploadprogress'))
  }
  var Hg = function (a, b) {
      return { type: b, lengthComputable: a.lengthComputable, loaded: a.loaded, total: a.total }
    },
    Dg = function (a, b) {
      if (a.j) {
        Ag(a)
        var c = a.j,
          d = a.Ze[0] ? function () {} : null
        a.j = null
        a.Ze = null
        b || a.dispatchEvent('ready')
        try {
          c.onreadystatechange = d
        } catch (e) {
          cd(a.P, 'Problem encountered resetting onreadystatechange: ' + e.message)
        }
      }
    },
    Ag = function (a) {
      a.j && a.Ve && (a.j.ontimeout = null)
      a.Re && (q.clearTimeout(a.Re), (a.Re = null))
    }
  K.prototype.isActive = function () {
    return !!this.j
  }
  var Fg = function (a) {
      return a.j ? a.j.readyState : 0
    },
    Gg = function (a) {
      try {
        return 2 < Fg(a) ? a.j.status : -1
      } catch (b) {
        return -1
      }
    }
  K.prototype.getResponse = function () {
    try {
      if (!this.j) return null
      if ('response' in this.j) return this.j.response
      switch (this.He) {
        case '':
        case 'text':
          return this.j.responseText
        case 'arraybuffer':
          if ('mozResponseArrayBuffer' in this.j) return this.j.mozResponseArrayBuffer
      }
      cd(this.P, 'Response type ' + this.He + ' is not supported on this browser')
      return null
    } catch (a) {
      return dd(this.P, 'Can not get response: ' + a.message), null
    }
  }
  K.prototype.getResponseHeader = function (a) {
    if (this.j && 4 == Fg(this)) return (a = this.j.getResponseHeader(a)), null === a ? void 0 : a
  }
  K.prototype.getAllResponseHeaders = function () {
    return this.j && 2 <= Fg(this) ? this.j.getAllResponseHeaders() || '' : ''
  }
  var zg = function (a, b) {
    return b + ' [' + a.Ih + ' ' + a.qe + ' ' + Gg(a) + ']'
  }
  var Ig = {
      Hk: {
        ae: 'https://staging-identitytoolkit.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/',
        Je: 'https://staging-securetoken.sandbox.googleapis.com/v1/token',
        ie: 'https://staging-identitytoolkit.sandbox.googleapis.com/v2/',
        id: 'b',
      },
      Ok: {
        ae: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/',
        Je: 'https://securetoken.googleapis.com/v1/token',
        ie: 'https://identitytoolkit.googleapis.com/v2/',
        id: 'p',
      },
      Pk: {
        ae: 'https://staging-www.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/',
        Je: 'https://staging-securetoken.sandbox.googleapis.com/v1/token',
        ie: 'https://staging-identitytoolkit.sandbox.googleapis.com/v2/',
        id: 's',
      },
      Qk: {
        ae: 'https://www-googleapis-test.sandbox.google.com/identitytoolkit/v3/relyingparty/',
        Je: 'https://test-securetoken.sandbox.googleapis.com/v1/token',
        ie: 'https://test-identitytoolkit.sandbox.googleapis.com/v2/',
        id: 't',
      },
    },
    Jg = function (a) {
      for (var b in Ig)
        if (Ig[b].id === a)
          return (
            (a = Ig[b]),
            { firebaseEndpoint: a.ae, secureTokenEndpoint: a.Je, identityPlatformEndpoint: a.ie }
          )
      return null
    },
    Kg
  Kg = Jg('__EID__') ? '__EID__' : void 0
  var Lg = function () {
      var a = L()
      return (md && !!zd && 11 == zd) || /Edge\/\d+/.test(a)
    },
    Mg = function () {
      return (
        (q.window && q.window.location.href) || (self && self.location && self.location.href) || ''
      )
    },
    Ng = function (a, b) {
      b = b || q.window
      var c = 'about:blank'
      a && (c = Bb(Eb(a) || Ib))
      b.location.href = c
    },
    Og = function (a, b, c) {
      b = b || q.window
      c ? b.location.replace(a) : b.location.replace(Bb(Eb(a) || Ib))
    },
    Pg = function (a, b) {
      var c = [],
        d
      for (d in a)
        d in b
          ? typeof a[d] != typeof b[d]
            ? c.push(d)
            : 'object' == typeof a[d] && null != a[d] && null != b[d]
            ? 0 < Pg(a[d], b[d]).length && c.push(d)
            : a[d] !== b[d] && c.push(d)
          : c.push(d)
      for (var e in b) e in a || c.push(e)
      return c
    },
    Rg = function () {
      var a = L()
      a =
        'Chrome' != Qg(a)
          ? null
          : (a = a.match(/\sChrome\/(\d+)/i)) && 2 == a.length
          ? parseInt(a[1], 10)
          : null
      return a && 30 > a ? !1 : !md || !zd || 9 < zd
    },
    Sg = function (a) {
      a = (a || L()).toLowerCase()
      return a.match(/android/) ||
        a.match(/webos/) ||
        a.match(/iphone|ipad|ipod/) ||
        a.match(/blackberry/) ||
        a.match(/windows phone/) ||
        a.match(/iemobile/)
        ? !0
        : !1
    },
    Tg = function (a) {
      a = a || q.window
      try {
        a.close()
      } catch (b) {}
    },
    Ug = function (a, b, c) {
      var d = Math.floor(1e9 * Math.random()).toString()
      b = b || 500
      c = c || 600
      var e = (window.screen.availHeight - c) / 2,
        f = (window.screen.availWidth - b) / 2
      b = {
        width: b,
        height: c,
        top: 0 < e ? e : 0,
        left: 0 < f ? f : 0,
        location: !0,
        resizable: !0,
        statusbar: !0,
        toolbar: !1,
      }
      c = L().toLowerCase()
      d && ((b.target = d), A(c, 'crios/') && (b.target = '_blank'))
      'Firefox' == Qg(L()) && ((a = a || 'http://localhost'), (b.scrollbars = !0))
      e = a || ''
      b || (b = {})
      a = window
      d = e instanceof Ab ? e : Eb('undefined' != typeof e.href ? e.href : String(e)) || Ib
      f = void 0 !== self.crossOriginIsolated
      c = 'strict-origin-when-cross-origin'
      window.Request && (c = new Request('/').referrerPolicy)
      var g = 'unsafe-url' === c
      c = b.noreferrer
      if (f && c) {
        if (g)
          throw Error(
            'Cannot use the noreferrer option on a page that sets a referrer-policy of `unsafe-url` in modern browsers!'
          )
        c = !1
      }
      e = b.target || e.target
      f = []
      for (h in b)
        switch (h) {
          case 'width':
          case 'height':
          case 'top':
          case 'left':
            f.push(h + '=' + b[h])
            break
          case 'target':
          case 'noopener':
          case 'noreferrer':
            break
          default:
            f.push(h + '=' + (b[h] ? 1 : 0))
        }
      var h = f.join(',')
      ;((B('iPhone') && !B('iPod') && !B('iPad')) || B('iPad') || B('iPod')) &&
      a.navigator &&
      a.navigator.standalone &&
      e &&
      '_self' != e
        ? ((h = Sd(document, 'A')),
          Ja(h, 'A'),
          (d = d instanceof Ab ? d : Hb(d)),
          (h.href = Bb(d)),
          (h.target = e),
          c && (h.rel = 'noreferrer'),
          (d = document.createEvent('MouseEvent')),
          d.initMouseEvent('click', !0, !0, a, 1),
          h.dispatchEvent(d),
          (h = {}))
        : c
        ? ((h = ic('', a, e, h)),
          (d = Bb(d)),
          h &&
            (od && A(d, ';') && (d = "'" + d.replace(/'/g, '%27') + "'"),
            (h.opener = null),
            '' === d && (d = "javascript:''"),
            (a = hb('b/12014412, meta tag with sanitized URL')),
            (d = yb(d)),
            (a = ec(
              a,
              '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' +
                d +
                '">'
            )),
            (d = h.document) && d.write && (d.write(ac(a)), d.close())))
        : ((h = ic(d, a, e, h)) && b.noopener && (h.opener = null),
          h && b.noreferrer && (h.opener = null))
      if (h)
        try {
          h.focus()
        } catch (k) {}
      return h
    },
    Vg = function () {
      var a = L().match(/OS (\d+)_.*CriOS\/(\d+)\./i)
      return a && 2 < a.length ? 10 <= parseInt(a[1], 10) && 55 <= parseInt(a[2], 10) : !1
    },
    Wg = function (a) {
      return new H(function (b) {
        var c = function () {
          wg(2e3).then(function () {
            if (!a || a.closed) b()
            else return c()
          })
        }
        return c()
      })
    },
    Yg = function (a, b) {
      var c = E(b)
      b = c.ua
      c = c.ga
      for (var d = 0; d < a.length; d++) {
        var e = a[d]
        0 == e.indexOf('chrome-extension://')
          ? (e = E(e).ga == c && 'chrome-extension' == b)
          : 'http' != b && 'https' != b
          ? (e = !1)
          : Xg.test(e)
          ? (e = c == e)
          : ((e = e.split('.').join('\\.')),
            (e = new RegExp('^(.+\\.' + e + '|' + e + ')$', 'i').test(c)))
        if (e) return !0
      }
      return !1
    },
    Xg = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    Zg = /^[^@]+@[^@]+$/,
    $g = function () {
      var a = null
      return new H(function (b) {
        'complete' == q.document.readyState
          ? b()
          : ((a = function () {
              b()
            }),
            Qe(window, 'load', a))
      }).h(function (b) {
        Ze(window, 'load', a)
        throw b
      })
    },
    bh = function () {
      return ah()
        ? $g().then(function () {
            return new H(function (a, b) {
              var c = q.document,
                d = setTimeout(function () {
                  b(Error('Cordova framework is not ready.'))
                }, 1e3)
              c.addEventListener(
                'deviceready',
                function () {
                  clearTimeout(d)
                  a()
                },
                !1
              )
            })
          })
        : J(Error('Cordova must run in an Android or iOS file scheme.'))
    },
    ah = function () {
      var a = L()
      return !(
        ('file:' !== ch() && 'ionic:' !== ch()) ||
        !a.toLowerCase().match(/iphone|ipad|ipod|android/)
      )
    },
    dh = function (a) {
      a = a || q.window
      try {
        return !(!a || a == a.top)
      } catch (b) {
        return !1
      }
    },
    eh = function () {
      var a = q.window
      try {
        var b = a && a.opener
        return !(!b || !dh(b))
      } catch (c) {
        return !1
      }
    },
    fh = function () {
      return 'undefined' !== typeof q.WorkerGlobalScope && 'function' === typeof q.importScripts
    },
    gh = function () {
      return firebase.INTERNAL.hasOwnProperty('reactNative')
        ? 'ReactNative'
        : firebase.INTERNAL.hasOwnProperty('node')
        ? 'Node'
        : fh()
        ? 'Worker'
        : 'Browser'
    },
    hh = function () {
      var a = gh()
      return 'ReactNative' === a || 'Node' === a
    },
    ih = function () {
      for (var a = 50, b = []; 0 < a; )
        b.push(
          '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(
            Math.floor(62 * Math.random())
          )
        ),
          a--
      return b.join('')
    },
    Qg = function (a) {
      var b = a.toLowerCase()
      if (A(b, 'opera/') || A(b, 'opr/') || A(b, 'opios/')) return 'Opera'
      if (A(b, 'iemobile')) return 'IEMobile'
      if (A(b, 'msie') || A(b, 'trident/')) return 'IE'
      if (A(b, 'edge/')) return 'Edge'
      if (A(b, 'firefox/')) return 'Firefox'
      if (A(b, 'silk/')) return 'Silk'
      if (A(b, 'blackberry')) return 'Blackberry'
      if (A(b, 'webos')) return 'Webos'
      if (!A(b, 'safari/') || A(b, 'chrome/') || A(b, 'crios/') || A(b, 'android'))
        if ((!A(b, 'chrome/') && !A(b, 'crios/')) || A(b, 'edge/')) {
          if (A(b, 'android')) return 'Android'
          if ((a = a.match(RegExp('([a-zA-Z\\d\\.]+)/[a-zA-Z\\d\\.]*$'))) && 2 == a.length)
            return a[1]
        } else return 'Chrome'
      else return 'Safari'
      return 'Other'
    },
    jh = { Ik: 'FirebaseCore-web', Kk: 'FirebaseUI-web', Nk: 'gcip-iap' },
    kh = function (a, b, c) {
      c = c || []
      var d = [],
        e = {},
        f
      for (f in jh) e[jh[f]] = !0
      for (f = 0; f < c.length; f++)
        'undefined' !== typeof e[c[f]] && (delete e[c[f]], d.push(c[f]))
      d.sort()
      c = d
      c.length || (c = ['FirebaseCore-web'])
      d = gh()
      return (
        ('Browser' === d ? Qg(L()) : 'Worker' === d ? Qg(L()) + '-' + d : d) +
        '/' +
        a +
        '/' +
        b +
        '/' +
        c.join(',')
      )
    },
    L = function () {
      return (q.navigator && q.navigator.userAgent) || ''
    },
    M = function (a, b) {
      a = a.split('.')
      b = b || q
      var c
      for (c = 0; c < a.length && 'object' == typeof b && null != b; c++) b = b[a[c]]
      c != a.length && (b = void 0)
      return b
    },
    mh = function () {
      try {
        var a = q.localStorage,
          b = lh()
        if (a) return a.setItem(b, '1'), a.removeItem(b), Lg() ? !!q.indexedDB : !0
      } catch (c) {
        return fh() && !!q.indexedDB
      }
      return !1
    },
    oh = function () {
      return (nh() || 'chrome-extension:' === ch() || ah()) && !hh() && mh() && !fh()
    },
    nh = function () {
      return 'http:' === ch() || 'https:' === ch()
    },
    ch = function () {
      return (q.location && q.location.protocol) || null
    },
    ph = function (a) {
      a = a || L()
      return Sg(a) || 'Firefox' == Qg(a) ? !1 : !0
    },
    qh = function (a) {
      return 'undefined' === typeof a ? null : JSON.stringify(a)
    },
    rh = function (a) {
      var b = {},
        c
      for (c in a) a.hasOwnProperty(c) && null !== a[c] && void 0 !== a[c] && (b[c] = a[c])
      return b
    },
    sh = function (a, b) {
      a = Za(a)
      for (var c = 0; c < b.length; c++) {
        var d = b[c]
        d in a && delete a[d]
      }
      return a
    },
    vh = function (a) {
      if (null !== a) return JSON.parse(a)
    },
    lh = function (a) {
      return a ? a : '' + Math.floor(1e9 * Math.random()).toString()
    },
    wh = function (a) {
      a = a || L()
      return 'Safari' == Qg(a) || a.toLowerCase().match(/iphone|ipad|ipod/) ? !1 : !0
    },
    xh = function () {
      var a = q.___jsl
      if (a && a.H)
        for (var b in a.H)
          if (
            ((a.H[b].r = a.H[b].r || []),
            (a.H[b].L = a.H[b].L || []),
            (a.H[b].r = a.H[b].L.concat()),
            a.CP)
          )
            for (var c = 0; c < a.CP.length; c++) a.CP[c] = null
    },
    yh = function (a, b) {
      if (a > b) throw Error('Short delay should be less than long delay!')
      this.oi = a
      this.Hj = b
      a = L()
      b = gh()
      this.Aj = Sg(a) || 'ReactNative' === b
    }
  yh.prototype.get = function () {
    var a = q.navigator
    return (
      a &&
      'boolean' === typeof a.onLine &&
      (nh() || 'chrome-extension:' === ch() || 'undefined' !== typeof a.connection)
        ? a.onLine
        : 1
    )
      ? this.Aj
        ? this.Hj
        : this.oi
      : Math.min(5e3, this.oi)
  }
  var zh = function () {
      var a = q.document
      return a && 'undefined' !== typeof a.visibilityState ? 'visible' == a.visibilityState : !0
    },
    Ah = function () {
      var a = q.document,
        b = null
      return zh() || !a
        ? I()
        : new H(function (c) {
            b = function () {
              zh() && (a.removeEventListener('visibilitychange', b, !1), c())
            }
            a.addEventListener('visibilitychange', b, !1)
          }).h(function (c) {
            a.removeEventListener('visibilitychange', b, !1)
            throw c
          })
    },
    Bh = function (a) {
      'undefined' !== typeof console && 'function' === typeof console.error && console.error(a)
    },
    Ch = function (a) {
      try {
        var b = new Date(parseInt(a, 10))
        if (!isNaN(b.getTime()) && !/[^0-9]/.test(a)) return b.toUTCString()
      } catch (c) {}
      return null
    },
    Dh = function () {
      return !(!M('fireauth.oauthhelper', q) && !M('fireauth.iframe', q))
    },
    Eh = function () {
      if (q.document)
        try {
          var a = Rd('META', { name: 'referrer', content: 'no-referrer' }),
            b = document.getElementsByTagName('HEAD')
          b.length && b[0].appendChild(a)
        } catch (c) {}
    },
    Fh = function () {
      var a = q.navigator
      return (a && a.serviceWorker && a.serviceWorker.controller) || null
    },
    Gh = function () {
      var a = q.navigator
      return a && a.serviceWorker
        ? I()
            .then(function () {
              return a.serviceWorker.ready
            })
            .then(function (b) {
              return b.active || null
            })
            .h(function () {
              return null
            })
        : I(null)
    },
    Hh = function (a) {
      var b = {}
      a.split('&').forEach(function (c) {
        c = c.split('=')
        1 < c.length && (b[decodeURIComponent(c[0])] = decodeURIComponent(c[1]))
      })
      return b
    }
  var Ih = {},
    Jh = function (a) {
      Ih[a] ||
        ((Ih[a] = !0),
        'undefined' !== typeof console && 'function' === typeof console.warn && console.warn(a))
    }
  var Kh
  try {
    var Lh = {}
    Object.defineProperty(Lh, 'abcd', { configurable: !0, enumerable: !0, value: 1 })
    Object.defineProperty(Lh, 'abcd', { configurable: !0, enumerable: !0, value: 2 })
    Kh = 2 == Lh.abcd
  } catch (a) {
    Kh = !1
  }
  var N = function (a, b, c) {
      Kh ? Object.defineProperty(a, b, { configurable: !0, enumerable: !0, value: c }) : (a[b] = c)
    },
    O = function (a, b) {
      if (b) for (var c in b) b.hasOwnProperty(c) && N(a, c, b[c])
    },
    Mh = function (a) {
      var b = {}
      O(b, a)
      return b
    },
    Nh = function (a, b) {
      if (!b || !b.length) return !0
      if (!a) return !1
      for (var c = 0; c < b.length; c++) {
        var d = a[b[c]]
        if (void 0 === d || null === d || '' === d) return !1
      }
      return !0
    },
    Oh = function (a) {
      var b = a
      if ('object' == typeof a && null != a) {
        b = 'length' in a ? [] : {}
        for (var c in a) N(b, c, Oh(a[c]))
      }
      return b
    }
  var Ph =
      'oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version'.split(
        ' '
      ),
    Qh = ['client_id', 'response_type', 'scope', 'redirect_uri', 'state'],
    Rh = {
      Jk: { hd: 'locale', yc: 700, xc: 600, providerId: 'facebook.com', xd: Qh },
      Lk: { hd: null, yc: 500, xc: 750, providerId: 'github.com', xd: Qh },
      Mk: { hd: 'hl', yc: 515, xc: 680, providerId: 'google.com', xd: Qh },
      Rk: { hd: 'lang', yc: 485, xc: 705, providerId: 'twitter.com', xd: Ph },
      Gk: { hd: 'locale', yc: 640, xc: 600, providerId: 'apple.com', xd: [] },
    },
    Sh = function (a) {
      for (var b in Rh) if (Rh[b].providerId == a) return Rh[b]
      return null
    },
    Th = function (a) {
      return ((a = Sh(a)) && a.xd) || []
    },
    Uh = function (a) {
      return 'string' === typeof a && 0 == a.indexOf('saml.')
    }
  var P = function (a, b, c) {
    this.code = 'auth/' + a
    this.message = b || Vh[a] || ''
    this.gi = c || null
  }
  w(P, Error)
  P.prototype.m = function () {
    var a = { code: this.code, message: this.message }
    this.gi && (a.serverResponse = this.gi)
    return a
  }
  P.prototype.toJSON = function () {
    return this.m()
  }
  var Wh = function (a) {
      var b = a && a.code
      return b ? new P(b.substring(5), a.message, a.serverResponse) : null
    },
    Vh = {
      'api-key-service-blocked':
        'The request is denied because it violates [API key HTTP restrictions](https://cloud.google.com/docs/authentication/api-keys#adding_http_restrictions).',
      'admin-restricted-operation': 'This operation is restricted to administrators only.',
      'argument-error': '',
      'app-not-authorized':
        "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
      'app-not-installed':
        'The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.',
      'bad-request': 'The requested action is invalid.',
      'captcha-check-failed':
        'The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.',
      'code-expired':
        'The SMS code has expired. Please re-send the verification code to try again.',
      'cordova-not-ready': 'Cordova framework is not ready.',
      'cors-unsupported': 'This browser is not supported.',
      'credential-already-in-use':
        'This credential is already associated with a different user account.',
      'custom-token-mismatch': 'The custom token corresponds to a different audience.',
      'requires-recent-login':
        'This operation is sensitive and requires recent authentication. Log in again before retrying this request.',
      'dynamic-link-not-activated':
        'Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.',
      'email-change-needs-verification': 'Multi-factor users must always have a verified email.',
      'email-already-in-use': 'The email address is already in use by another account.',
      'expired-action-code': 'The action code has expired. ',
      'cancelled-popup-request':
        'This operation has been cancelled due to another conflicting popup being opened.',
      'internal-error': 'An internal error has occurred.',
      'invalid-app-credential':
        'The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.',
      'invalid-app-id': 'The mobile app identifier is not registed for the current project.',
      'invalid-user-token':
        "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
      'invalid-auth-event': 'An internal error has occurred.',
      'invalid-verification-code':
        'The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.',
      'invalid-continue-uri': 'The continue URL provided in the request is invalid.',
      'invalid-cordova-configuration':
        'The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.',
      'invalid-custom-token':
        'The custom token format is incorrect. Please check the documentation.',
      'invalid-dynamic-link-domain':
        'The provided dynamic link domain is not configured or authorized for the current project.',
      'invalid-email': 'The email address is badly formatted.',
      'invalid-api-key': 'Your API key is invalid, please check you have copied it correctly.',
      'invalid-cert-hash': 'The SHA-1 certificate hash provided is invalid.',
      'invalid-credential': 'The supplied auth credential is malformed or has expired.',
      'invalid-message-payload':
        'The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.',
      'invalid-multi-factor-session':
        'The request does not contain a valid proof of first factor successful sign-in.',
      'invalid-oauth-provider':
        'EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.',
      'invalid-oauth-client-id':
        'The OAuth client ID provided is either invalid or does not match the specified API key.',
      'unauthorized-domain':
        'This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.',
      'invalid-action-code':
        'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
      'wrong-password': 'The password is invalid or the user does not have a password.',
      'invalid-persistence-type':
        'The specified persistence type is invalid. It can only be local, session or none.',
      'invalid-phone-number':
        'The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].',
      'invalid-provider-id': 'The specified provider ID is invalid.',
      'invalid-recipient-email':
        'The email corresponding to this action failed to send as the provided recipient email address is invalid.',
      'invalid-sender':
        'The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.',
      'invalid-verification-id':
        'The verification ID used to create the phone auth credential is invalid.',
      'invalid-tenant-id': "The Auth instance's tenant ID is invalid.",
      'multi-factor-info-not-found':
        'The user does not have a second factor matching the identifier provided.',
      'multi-factor-auth-required':
        'Proof of ownership of a second factor is required to complete sign-in.',
      'missing-android-pkg-name':
        'An Android Package Name must be provided if the Android App is required to be installed.',
      'auth-domain-config-required':
        'Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.',
      'missing-app-credential':
        'The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.',
      'missing-verification-code':
        'The phone auth credential was created with an empty SMS verification code.',
      'missing-continue-uri': 'A continue URL must be provided in the request.',
      'missing-iframe-start': 'An internal error has occurred.',
      'missing-ios-bundle-id': 'An iOS Bundle ID must be provided if an App Store ID is provided.',
      'missing-multi-factor-info': 'No second factor identifier is provided.',
      'missing-multi-factor-session':
        'The request is missing proof of first factor successful sign-in.',
      'missing-or-invalid-nonce':
        'The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.',
      'missing-phone-number':
        'To send verification codes, provide a phone number for the recipient.',
      'missing-verification-id':
        'The phone auth credential was created with an empty verification ID.',
      'app-deleted': 'This instance of FirebaseApp has been deleted.',
      'account-exists-with-different-credential':
        'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
      'network-request-failed':
        'A network error (such as timeout, interrupted connection or unreachable host) has occurred.',
      'no-auth-event': 'An internal error has occurred.',
      'no-such-provider': 'User was not linked to an account with the given provider.',
      'null-user':
        'A null user object was provided as the argument for an operation which requires a non-null user object.',
      'operation-not-allowed':
        'The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.',
      'operation-not-supported-in-this-environment':
        'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
      'password-does-not-meet-requirements':
        'The provided password does not meet the configured requirements.',
      'popup-blocked':
        'Unable to establish a connection with the popup. It may have been blocked by the browser.',
      'popup-closed-by-user':
        'The popup has been closed by the user before finalizing the operation.',
      'provider-already-linked': 'User can only be linked to one identity for the given provider.',
      'quota-exceeded': "The project's quota for this operation has been exceeded.",
      'redirect-cancelled-by-user':
        'The redirect operation has been cancelled by the user before finalizing.',
      'redirect-operation-pending': 'A redirect sign-in operation is already pending.',
      'rejected-credential': 'The request contains malformed or mismatching credentials.',
      'second-factor-already-in-use': 'The second factor is already enrolled on this account.',
      'maximum-second-factor-count-exceeded':
        'The maximum allowed number of second factors on a user has been exceeded.',
      'tenant-id-mismatch': "The provided tenant ID does not match the Auth instance's tenant ID",
      timeout: 'The operation has timed out.',
      'user-token-expired':
        "The user's credential is no longer valid. The user must sign in again.",
      'too-many-requests':
        'We have blocked all requests from this device due to unusual activity. Try again later.',
      'unauthorized-continue-uri':
        'The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.',
      'unsupported-first-factor':
        'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.',
      'unsupported-persistence-type':
        'The current environment does not support the specified persistence type.',
      'unsupported-tenant-operation': 'This operation is not supported in a multi-tenant context.',
      'unverified-email': 'The operation requires a verified email.',
      'user-cancelled': 'The user did not grant your application the permissions it requested.',
      'user-not-found':
        'There is no user record corresponding to this identifier. The user may have been deleted.',
      'user-disabled': 'The user account has been disabled by an administrator.',
      'user-mismatch':
        'The supplied credentials do not correspond to the previously signed in user.',
      'user-signed-out': '',
      'weak-password': 'The password must be 6 characters long or more.',
      'web-storage-unsupported':
        'This browser is not supported or 3rd party cookies and data may be disabled.',
    }
  var Xh = function (a, b, c, d, e, f, g) {
    this.Jc = a
    this.T = b || null
    this.Xa = c || null
    this.zd = d || null
    this.eg = f || null
    this.C = g || null
    this.Y = e || null
    if (this.Xa || this.Y) {
      if (this.Xa && this.Y) throw new P('invalid-auth-event')
      if (this.Xa && !this.zd) throw new P('invalid-auth-event')
    } else throw new P('invalid-auth-event')
  }
  l = Xh.prototype
  l.getType = function () {
    return this.Jc
  }
  l.getUid = function () {
    var a = []
    a.push(this.Jc)
    this.T && a.push(this.T)
    this.zd && a.push(this.zd)
    this.C && a.push(this.C)
    return a.join('-')
  }
  l.oc = function () {
    return this.zd
  }
  l.getError = function () {
    return this.Y
  }
  l.m = function () {
    return {
      type: this.Jc,
      eventId: this.T,
      urlResponse: this.Xa,
      sessionId: this.zd,
      postBody: this.eg,
      tenantId: this.C,
      error: this.Y && this.Y.m(),
    }
  }
  var Yh = function (a) {
    a = a || {}
    return a.type
      ? new Xh(
          a.type,
          a.eventId,
          a.urlResponse,
          a.sessionId,
          a.error && Wh(a.error),
          a.postBody,
          a.tenantId
        )
      : null
  }
  var Zh = function (a, b, c, d, e, f, g, h, k, p, n, r, t, z, aa, nb, qa) {
    this.A = a
    this.B = b
    this.Jc = c
    this.T = d || null
    this.Dc = e || null
    this.Qa = f || null
    this.tf = g || null
    this.ec = h || null
    this.ed = k || null
    this.hh = p || null
    this.U = n || []
    this.Fb = r || null
    this.ni = t || null
    this.C = z || null
    this.Ac = aa || null
    this.Kb = nb || null
    this.Zh = qa || null
  }
  Zh.prototype.getType = function () {
    return this.Jc
  }
  Zh.prototype.m = function () {
    return {
      apiKey: this.A,
      appName: this.B,
      type: this.Jc,
      eventId: this.T,
      redirectUrl: this.Dc,
      clientVersion: this.Qa,
      displayName: this.tf,
      apn: this.ec,
      ibi: this.ed,
      eid: this.hh,
      fw: this.U,
      clientId: this.Fb,
      sha1Cert: this.ni,
      tenantId: this.C,
      providerId: this.Ac,
      appId: this.Kb,
      publicKey: this.Zh,
    }
  }
  var $h = function (a) {
    var b = a && (a.phoneInfo ? 'phone' : null)
    if (b && a && a.mfaEnrollmentId) {
      N(this, 'uid', a.mfaEnrollmentId)
      N(this, 'displayName', a.displayName || null)
      var c = null
      a.enrolledAt && (c = new Date(a.enrolledAt).toUTCString())
      N(this, 'enrollmentTime', c)
      N(this, 'factorId', b)
    } else throw new P('internal-error', 'Internal assert: invalid MultiFactorInfo object')
  }
  $h.prototype.m = function () {
    return {
      uid: this.uid,
      displayName: this.displayName,
      factorId: this.factorId,
      enrollmentTime: this.enrollmentTime,
    }
  }
  var bi = function (a) {
      try {
        var b = new ai(a)
      } catch (c) {
        b = null
      }
      return b
    },
    ai = function (a) {
      $h.call(this, a)
      N(this, 'phoneNumber', a.phoneInfo)
    }
  w(ai, $h)
  ai.prototype.m = function () {
    var a = ai.Yb.m.call(this)
    a.phoneNumber = this.phoneNumber
    return a
  }
  var ci = function (a) {
    var b = {},
      c = a.email,
      d = a.newEmail,
      e = a.requestType
    a = bi(a.mfaInfo)
    if (
      !e ||
      ('EMAIL_SIGNIN' != e && 'VERIFY_AND_CHANGE_EMAIL' != e && !c) ||
      ('VERIFY_AND_CHANGE_EMAIL' == e && !d) ||
      ('REVERT_SECOND_FACTOR_ADDITION' == e && !a)
    )
      throw Error('Invalid checkActionCode response!')
    'VERIFY_AND_CHANGE_EMAIL' == e
      ? ((b.fromEmail = c || null), (b.previousEmail = c || null), (b.email = d))
      : ((b.fromEmail = d || null), (b.previousEmail = d || null), (b.email = c || null))
    b.multiFactorInfo = a || null
    N(this, 'operation', e)
    N(this, 'data', Oh(b))
  }
  var ei = function (a) {
      a = E(a)
      var b = D(a, 'apiKey') || null,
        c = D(a, 'oobCode') || null,
        d = D(a, 'mode') || null
      d = d ? di[d] || null : null
      if (!b || !c || !d)
        throw new P(
          'argument-error',
          'apiKey, oobCodeand mode are required in a valid action code URL.'
        )
      O(this, {
        apiKey: b,
        operation: d,
        code: c,
        continueUrl: D(a, 'continueUrl') || null,
        languageCode: D(a, 'languageCode') || null,
        tenantId: D(a, 'tenantId') || null,
      })
    },
    fi = function (a) {
      try {
        return new ei(a)
      } catch (b) {
        return null
      }
    },
    di = {
      recoverEmail: 'RECOVER_EMAIL',
      resetPassword: 'PASSWORD_RESET',
      revertSecondFactorAddition: 'REVERT_SECOND_FACTOR_ADDITION',
      signIn: 'EMAIL_SIGNIN',
      verifyAndChangeEmail: 'VERIFY_AND_CHANGE_EMAIL',
      verifyEmail: 'VERIFY_EMAIL',
    }
  var gi = function (a, b, c, d, e, f, g) {
      this.jh =
        'https://' +
        d +
        '/__/auth/handler?firebaseError=' +
        encodeURIComponent(qh(new P('app-not-installed').m()))
      N(this, 'fallbackUrl', this.jh)
      this.Bf = a
      N(this, 'fdlDomain', a)
      this.Be = b
      N(this, 'platform', b)
      this.Ld = c
      N(this, 'appIdentifier', c)
      this.J = d
      N(this, 'authDomain', d)
      this.re = e
      N(this, 'payload', e)
      this.B = null
      N(this, 'appName', null)
      this.Fb = f || null
      N(this, 'clientId', this.Fb)
      this.Kb = g || null
      N(this, 'firebaseAppId', this.Kb)
    },
    hi = function (a, b) {
      a.B = b || null
      N(a, 'appName', b)
    },
    ii = function (a) {
      var b = E(a)
      a = D(b, 'fdlDomain')
      var c = D(b, 'platform'),
        d = D(b, 'appIdentifier'),
        e = D(b, 'authDomain'),
        f = D(b, 'link')
      b = D(b, 'appName')
      return a && c && d && e && f && b ? ((a = new gi(a, c, d, e, f)), hi(a, b), a) : null
    },
    ji = function (a) {
      var b = E(a),
        c = D(b, 'link'),
        d = D(E(c), 'link')
      b = D(b, 'deep_link_id')
      return D(E(b), 'link') || b || d || c || a
    },
    ki = function (a, b) {
      var c = Gc('https', a.Bf, null, '/')
      'android' == a.Be
        ? (C(c, 'apn', a.Ld), C(c, 'afl', b))
        : 'ios' == a.Be && (C(c, 'ibi', a.Ld), C(c, 'ifl', b))
      return c
    }
  gi.prototype.toString = function (a) {
    if ('android_non_gmscore' == this.Be) a = this.re
    else if (this.Bf)
      if (a) {
        a = Gc('https', this.J, null, '/__/auth/callback')
        C(a, 'fdlDomain', this.Bf)
        C(a, 'platform', this.Be)
        C(a, 'appIdentifier', this.Ld)
        C(a, 'authDomain', this.J)
        C(a, 'link', this.re)
        C(a, 'appName', this.B || '')
        var b = ki(this, a.toString())
        C(b, 'link', a.toString())
        a = b.toString()
      } else (a = ki(this, this.jh)), C(a, 'link', this.re), (a = a.toString())
    else
      (a = this.Fb
        ? this.Fb.split('.').reverse().join('.')
        : this.Kb
        ? 'app-' + this.Kb.replace(/:/g, '-')
        : this.Ld),
        (a = Gc(a, this.Fb || this.Kb ? 'firebaseauth' : 'google', null, '/link')),
        C(a, 'deep_link_id', this.re),
        (a = a.toString())
    return a
  }
  var li = function (a) {
    var b = 'unauthorized-domain',
      c = void 0,
      d = E(a)
    a = d.ga
    d = d.ua
    'chrome-extension' == d
      ? (c = kc(
          'This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.',
          a
        ))
      : 'http' == d || 'https' == d
      ? (c = kc(
          'This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.',
          a
        ))
      : (b = 'operation-not-supported-in-this-environment')
    P.call(this, b, c)
  }
  m(li, P)
  var ni = function (a) {
    var b = mi(a)
    if (!(b && b.sub && b.iss && b.aud && b.exp)) throw Error('Invalid JWT')
    this.Dj = a
    this.zf = b.exp
    this.Fj = b.sub
    a = Date.now() / 1e3
    this.tj = b.iat || (a > this.zf ? this.zf : a)
    this.Ib = b.email || null
    this.Ac = b.provider_id || (b.firebase && b.firebase.sign_in_provider) || null
    this.C = (b.firebase && b.firebase.tenant) || null
    this.Oi = !!b.is_anonymous || 'anonymous' == this.Ac
    this.tf = b.display_name || null
  }
  ni.prototype.getEmail = function () {
    return this.Ib
  }
  ni.prototype.isAnonymous = function () {
    return this.Oi
  }
  ni.prototype.toString = function () {
    return this.Dj
  }
  var oi = function (a) {
      try {
        return new ni(a)
      } catch (b) {
        return null
      }
    },
    mi = function (a) {
      if (!a) return null
      a = a.split('.')
      if (3 != a.length) return null
      a = a[1]
      for (var b = (4 - (a.length % 4)) % 4, c = 0; c < b; c++) a += '.'
      try {
        var d = pe(a)
        a = []
        for (c = b = 0; b < d.length; ) {
          var e = d[b++]
          if (128 > e) a[c++] = String.fromCharCode(e)
          else if (191 < e && 224 > e) {
            var f = d[b++]
            a[c++] = String.fromCharCode(((e & 31) << 6) | (f & 63))
          } else if (239 < e && 365 > e) {
            f = d[b++]
            var g = d[b++],
              h = d[b++],
              k = (((e & 7) << 18) | ((f & 63) << 12) | ((g & 63) << 6) | (h & 63)) - 65536
            a[c++] = String.fromCharCode(55296 + (k >> 10))
            a[c++] = String.fromCharCode(56320 + (k & 1023))
          } else
            (f = d[b++]),
              (g = d[b++]),
              (a[c++] = String.fromCharCode(((e & 15) << 12) | ((f & 63) << 6) | (g & 63)))
        }
        return JSON.parse(a.join(''))
      } catch (p) {}
      return null
    }
  var pi = function (a) {
    var b = mi(a)
    if (!(b && b.exp && b.auth_time && b.iat))
      throw new P(
        'internal-error',
        'An internal error occurred. The token obtained by Firebase appears to be malformed. Please retry the operation.'
      )
    O(this, {
      token: a,
      expirationTime: Ch(1e3 * b.exp),
      authTime: Ch(1e3 * b.auth_time),
      issuedAtTime: Ch(1e3 * b.iat),
      signInProvider:
        b.firebase && b.firebase.sign_in_provider ? b.firebase.sign_in_provider : null,
      signInSecondFactor:
        b.firebase && b.firebase.sign_in_second_factor ? b.firebase.sign_in_second_factor : null,
      claims: b,
    })
  }
  var qi = function (a, b) {
    if (!a && !b) throw new P('internal-error', 'Internal assert: no raw session string available')
    if (a && b)
      throw new P('internal-error', 'Internal assert: unable to determine the session type')
    this.he = a || null
    this.Mh = b || null
    this.type = this.he ? 'enroll' : 'signin'
  }
  qi.prototype.bd = function () {
    return this.he ? I(this.he) : I(this.Mh)
  }
  qi.prototype.m = function () {
    return 'enroll' == this.type
      ? { multiFactorSession: { idToken: this.he } }
      : { multiFactorSession: { pendingCredential: this.Mh } }
  }
  var ri = function () {}
  ri.prototype.Nb = function () {}
  ri.prototype.tc = function () {}
  ri.prototype.kd = function () {}
  ri.prototype.m = function () {}
  var si = function (a, b) {
      return a
        .then(function (c) {
          if (c.idToken) {
            var d = oi(c.idToken)
            if (!d || b != d.Fj) throw new P('user-mismatch')
            return c
          }
          throw new P('user-mismatch')
        })
        .h(function (c) {
          throw c && c.code && 'auth/user-not-found' == c.code ? new P('user-mismatch') : c
        })
    },
    ti = function (a, b) {
      if (b) this.gb = b
      else throw new P('internal-error', 'failed to construct a credential')
      N(this, 'providerId', a)
      N(this, 'signInMethod', a)
    }
  l = ti.prototype
  l.Nb = function (a) {
    return ui(a, this.Qb())
  }
  l.tc = function (a, b) {
    var c = this.Qb()
    c.idToken = b
    return vi(a, c)
  }
  l.kd = function (a, b) {
    var c = this.Qb()
    return si(wi(a, c), b)
  }
  l.Qb = function () {
    return { pendingToken: this.gb, requestUri: 'http://localhost' }
  }
  l.m = function () {
    return { providerId: this.providerId, signInMethod: this.signInMethod, pendingToken: this.gb }
  }
  var xi = function (a) {
      if (
        a &&
        a.providerId &&
        a.signInMethod &&
        0 == a.providerId.indexOf('saml.') &&
        a.pendingToken
      )
        try {
          return new ti(a.providerId, a.pendingToken)
        } catch (b) {}
      return null
    },
    yi = function (a, b, c) {
      this.gb = null
      if (b.idToken || b.accessToken)
        b.idToken && N(this, 'idToken', b.idToken),
          b.accessToken && N(this, 'accessToken', b.accessToken),
          b.nonce && !b.pendingToken && N(this, 'nonce', b.nonce),
          b.pendingToken && (this.gb = b.pendingToken)
      else if (b.oauthToken && b.oauthTokenSecret)
        N(this, 'accessToken', b.oauthToken), N(this, 'secret', b.oauthTokenSecret)
      else throw new P('internal-error', 'failed to construct a credential')
      N(this, 'providerId', a)
      N(this, 'signInMethod', c)
    }
  l = yi.prototype
  l.Nb = function (a) {
    return ui(a, this.Qb())
  }
  l.tc = function (a, b) {
    var c = this.Qb()
    c.idToken = b
    return vi(a, c)
  }
  l.kd = function (a, b) {
    var c = this.Qb()
    return si(wi(a, c), b)
  }
  l.Qb = function () {
    var a = {}
    this.idToken && (a.id_token = this.idToken)
    this.accessToken && (a.access_token = this.accessToken)
    this.secret && (a.oauth_token_secret = this.secret)
    a.providerId = this.providerId
    this.nonce && !this.gb && (a.nonce = this.nonce)
    a = { postBody: Kc(a).toString(), requestUri: 'http://localhost' }
    this.gb && (delete a.postBody, (a.pendingToken = this.gb))
    return a
  }
  l.m = function () {
    var a = { providerId: this.providerId, signInMethod: this.signInMethod }
    this.idToken && (a.oauthIdToken = this.idToken)
    this.accessToken && (a.oauthAccessToken = this.accessToken)
    this.secret && (a.oauthTokenSecret = this.secret)
    this.nonce && (a.nonce = this.nonce)
    this.gb && (a.pendingToken = this.gb)
    return a
  }
  var zi = function (a) {
      if (a && a.providerId && a.signInMethod) {
        var b = {
          idToken: a.oauthIdToken,
          accessToken: a.oauthTokenSecret ? null : a.oauthAccessToken,
          oauthTokenSecret: a.oauthTokenSecret,
          oauthToken: a.oauthTokenSecret && a.oauthAccessToken,
          nonce: a.nonce,
          pendingToken: a.pendingToken,
        }
        try {
          return new yi(a.providerId, b, a.signInMethod)
        } catch (c) {}
      }
      return null
    },
    Ai = function (a, b) {
      this.Vj = b || []
      O(this, { providerId: a, isOAuthProvider: !0 })
      this.dh = {}
      this.Of = (Sh(a) || {}).hd || null
      this.sf = null
    }
  Ai.prototype.setCustomParameters = function (a) {
    this.dh = Za(a)
    return this
  }
  var Bi = function (a) {
    if (!Uh(a)) throw new P('argument-error', 'SAML provider IDs must be prefixed with "saml."')
    Ai.call(this, a, [])
  }
  w(Bi, Ai)
  var Ci = function (a) {
    Ai.call(this, a, Qh)
    this.pg = []
  }
  w(Ci, Ai)
  Ci.prototype.addScope = function (a) {
    Ra(this.pg, a) || this.pg.push(a)
    return this
  }
  Ci.prototype.rh = function () {
    return Va(this.pg)
  }
  Ci.prototype.credential = function (a, b) {
    a = u(a)
      ? {
          idToken: a.idToken || null,
          accessToken: a.accessToken || null,
          nonce: a.rawNonce || null,
        }
      : { idToken: a || null, accessToken: b || null }
    if (!a.idToken && !a.accessToken)
      throw new P(
        'argument-error',
        'credential failed: must provide the ID token and/or the access token.'
      )
    return new yi(this.providerId, a, this.providerId)
  }
  var Di = function () {
    Ci.call(this, 'facebook.com')
  }
  w(Di, Ci)
  N(Di, 'PROVIDER_ID', 'facebook.com')
  N(Di, 'FACEBOOK_SIGN_IN_METHOD', 'facebook.com')
  var Ei = function (a) {
      if (!a)
        throw new P(
          'argument-error',
          'credential failed: expected 1 argument (the OAuth access token).'
        )
      var b = a
      u(a) && (b = a.accessToken)
      return new Di().credential({ accessToken: b })
    },
    Fi = function () {
      Ci.call(this, 'github.com')
    }
  w(Fi, Ci)
  N(Fi, 'PROVIDER_ID', 'github.com')
  N(Fi, 'GITHUB_SIGN_IN_METHOD', 'github.com')
  var Gi = function (a) {
      if (!a)
        throw new P(
          'argument-error',
          'credential failed: expected 1 argument (the OAuth access token).'
        )
      var b = a
      u(a) && (b = a.accessToken)
      return new Fi().credential({ accessToken: b })
    },
    Hi = function () {
      Ci.call(this, 'google.com')
      this.addScope('profile')
    }
  w(Hi, Ci)
  N(Hi, 'PROVIDER_ID', 'google.com')
  N(Hi, 'GOOGLE_SIGN_IN_METHOD', 'google.com')
  var Ii = function (a, b) {
      var c = a
      u(a) && ((c = a.idToken), (b = a.accessToken))
      return new Hi().credential({ idToken: c, accessToken: b })
    },
    Ji = function () {
      Ai.call(this, 'twitter.com', Ph)
    }
  w(Ji, Ai)
  N(Ji, 'PROVIDER_ID', 'twitter.com')
  N(Ji, 'TWITTER_SIGN_IN_METHOD', 'twitter.com')
  var Ki = function (a, b) {
      var c = a
      u(c) || (c = { oauthToken: a, oauthTokenSecret: b })
      if (!c.oauthToken || !c.oauthTokenSecret)
        throw new P(
          'argument-error',
          'credential failed: expected 2 arguments (the OAuth access token and secret).'
        )
      return new yi('twitter.com', c, 'twitter.com')
    },
    Mi = function (a, b, c) {
      this.Ib = a
      this.ld = b
      N(this, 'providerId', 'password')
      N(
        this,
        'signInMethod',
        c === Li.EMAIL_LINK_SIGN_IN_METHOD
          ? Li.EMAIL_LINK_SIGN_IN_METHOD
          : Li.EMAIL_PASSWORD_SIGN_IN_METHOD
      )
    }
  Mi.prototype.Nb = function (a) {
    return this.signInMethod == Li.EMAIL_LINK_SIGN_IN_METHOD
      ? Q(a, Ni, { email: this.Ib, oobCode: this.ld })
      : Q(a, Oi, { email: this.Ib, password: this.ld })
  }
  Mi.prototype.tc = function (a, b) {
    return this.signInMethod == Li.EMAIL_LINK_SIGN_IN_METHOD
      ? Q(a, Pi, { idToken: b, email: this.Ib, oobCode: this.ld })
      : Q(a, Qi, { idToken: b, email: this.Ib, password: this.ld })
  }
  Mi.prototype.kd = function (a, b) {
    return si(this.Nb(a), b)
  }
  Mi.prototype.m = function () {
    return { email: this.Ib, password: this.ld, signInMethod: this.signInMethod }
  }
  var Ri = function (a) {
      return a && a.email && a.password ? new Mi(a.email, a.password, a.signInMethod) : null
    },
    Li = function () {
      O(this, { providerId: 'password', isOAuthProvider: !1 })
    },
    Ti = function (a, b) {
      b = Si(b)
      if (!b) throw new P('argument-error', 'Invalid email link!')
      return new Mi(a, b.code, Li.EMAIL_LINK_SIGN_IN_METHOD)
    },
    Si = function (a) {
      a = ji(a)
      return (a = fi(a)) && 'EMAIL_SIGNIN' === a.operation ? a : null
    }
  O(Li, { PROVIDER_ID: 'password' })
  O(Li, { EMAIL_LINK_SIGN_IN_METHOD: 'emailLink' })
  O(Li, { EMAIL_PASSWORD_SIGN_IN_METHOD: 'password' })
  var Ui = function (a) {
    if (!((a.verificationId && a.We) || (a.Dd && a.phoneNumber))) throw new P('internal-error')
    this.V = a
    N(this, 'providerId', 'phone')
    this.providerId = 'phone'
    N(this, 'signInMethod', 'phone')
  }
  Ui.prototype.Nb = function (a) {
    return a.verifyPhoneNumber(Vi(this))
  }
  Ui.prototype.tc = function (a, b) {
    var c = Vi(this)
    c.idToken = b
    return Q(a, Wi, c)
  }
  Ui.prototype.kd = function (a, b) {
    var c = Vi(this)
    c.operation = 'REAUTH'
    a = Q(a, Xi, c)
    return si(a, b)
  }
  Ui.prototype.m = function () {
    var a = { providerId: 'phone' }
    this.V.verificationId && (a.verificationId = this.V.verificationId)
    this.V.We && (a.verificationCode = this.V.We)
    this.V.Dd && (a.temporaryProof = this.V.Dd)
    this.V.phoneNumber && (a.phoneNumber = this.V.phoneNumber)
    return a
  }
  var Yi = function (a) {
      if (
        a &&
        'phone' === a.providerId &&
        ((a.verificationId && a.verificationCode) || (a.temporaryProof && a.phoneNumber))
      ) {
        var b = {}
        y(['verificationId', 'verificationCode', 'temporaryProof', 'phoneNumber'], function (c) {
          a[c] && (b[c] = a[c])
        })
        return new Ui(b)
      }
      return null
    },
    Vi = function (a) {
      return a.V.Dd && a.V.phoneNumber
        ? { temporaryProof: a.V.Dd, phoneNumber: a.V.phoneNumber }
        : { sessionInfo: a.V.verificationId, code: a.V.We }
    },
    Zi = function (a) {
      try {
        this.Od = a || firebase.auth()
      } catch (b) {
        throw new P(
          'argument-error',
          'Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp().'
        )
      }
      O(this, { providerId: 'phone', isOAuthProvider: !1 })
    }
  Zi.prototype.verifyPhoneNumber = function (a, b) {
    var c = this.Od.i
    return I(b.verify()).then(function (d) {
      if ('string' !== typeof d)
        throw new P(
          'argument-error',
          'An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string.'
        )
      switch (b.type) {
        case 'recaptcha':
          var e = u(a) ? a.session : null,
            f = u(a) ? a.phoneNumber : a
          return (
            e && 'enroll' == e.type
              ? e.bd().then(function (g) {
                  return $i(c, {
                    idToken: g,
                    phoneEnrollmentInfo: { phoneNumber: f, recaptchaToken: d },
                  })
                })
              : e && 'signin' == e.type
              ? e.bd().then(function (g) {
                  return aj(c, {
                    mfaPendingCredential: g,
                    mfaEnrollmentId:
                      (a.multiFactorHint && a.multiFactorHint.uid) || a.multiFactorUid,
                    phoneSignInInfo: { recaptchaToken: d },
                  })
                })
              : bj(c, { phoneNumber: f, recaptchaToken: d })
          ).then(
            function (g) {
              'function' === typeof b.reset && b.reset()
              return g
            },
            function (g) {
              'function' === typeof b.reset && b.reset()
              throw g
            }
          )
        default:
          throw new P(
            'argument-error',
            'Only firebase.auth.ApplicationVerifiers with type="recaptcha" are currently supported.'
          )
      }
    })
  }
  var cj = function (a, b) {
    if (!a) throw new P('missing-verification-id')
    if (!b) throw new P('missing-verification-code')
    return new Ui({ verificationId: a, We: b })
  }
  O(Zi, { PROVIDER_ID: 'phone' })
  O(Zi, { PHONE_SIGN_IN_METHOD: 'phone' })
  var dj = function (a) {
      if (a.temporaryProof && a.phoneNumber)
        return new Ui({ Dd: a.temporaryProof, phoneNumber: a.phoneNumber })
      var b = a && a.providerId
      if (!b || 'password' === b) return null
      var c = a && a.oauthAccessToken,
        d = a && a.oauthTokenSecret,
        e = a && a.nonce,
        f = a && a.oauthIdToken,
        g = a && a.pendingToken
      try {
        switch (b) {
          case 'google.com':
            return Ii(f, c)
          case 'facebook.com':
            return Ei(c)
          case 'github.com':
            return Gi(c)
          case 'twitter.com':
            return Ki(c, d)
          default:
            return c || d || f || g
              ? g
                ? 0 == b.indexOf('saml.')
                  ? new ti(b, g)
                  : new yi(
                      b,
                      { pendingToken: g, idToken: a.oauthIdToken, accessToken: a.oauthAccessToken },
                      b
                    )
                : new Ci(b).credential({ idToken: f, accessToken: c, rawNonce: e })
              : null
        }
      } catch (h) {
        return null
      }
    },
    ej = function (a) {
      if (!a.isOAuthProvider) throw new P('invalid-oauth-provider')
    }
  var fj = function (a, b, c) {
    P.call(this, a, c)
    a = b || {}
    a.email && N(this, 'email', a.email)
    a.phoneNumber && N(this, 'phoneNumber', a.phoneNumber)
    a.credential && N(this, 'credential', a.credential)
    a.tenantId && N(this, 'tenantId', a.tenantId)
  }
  m(fj, P)
  fj.prototype.m = function () {
    var a = { code: this.code, message: this.message }
    this.email && (a.email = this.email)
    this.phoneNumber && (a.phoneNumber = this.phoneNumber)
    this.tenantId && (a.tenantId = this.tenantId)
    var b = this.credential && this.credential.m()
    b && ab(a, b)
    return a
  }
  fj.prototype.toJSON = function () {
    return this.m()
  }
  var gj = function (a) {
    if (a.code) {
      var b = a.code || ''
      0 == b.indexOf('auth/') && (b = b.substring(5))
      var c = { credential: dj(a), tenantId: a.tenantId }
      if (a.email) c.email = a.email
      else if (a.phoneNumber) c.phoneNumber = a.phoneNumber
      else if (!c.credential) return new P(b, a.message || void 0)
      return new fj(b, c, a.message)
    }
    return null
  }
  var hj = function (a) {
    this.Fk = a
  }
  m(hj, ef)
  hj.prototype.Rc = function () {
    return new this.Fk()
  }
  hj.prototype.me = function () {
    return {}
  }
  var mj = function (a, b, c, d) {
      this.A = a
      b = b || {}
      this.ei = b.secureTokenEndpoint || 'https://securetoken.googleapis.com/v1/token'
      this.hk = b.secureTokenTimeout || ij
      this.Ke = Za(b.secureTokenHeaders || jj)
      this.mh = b.firebaseEndpoint || 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
      this.xh = b.identityPlatformEndpoint || 'https://identitytoolkit.googleapis.com/v2/'
      this.cj = b.firebaseTimeout || kj
      this.Lb = Za(b.firebaseHeaders || lj)
      c && ((this.Lb['X-Client-Version'] = c), (this.Ke['X-Client-Version'] = c))
      d && (this.Lb['X-Firebase-AppCheck'] = d)
      a = 'Node' == gh()
      a = q.XMLHttpRequest || (a && firebase.INTERNAL.node && firebase.INTERNAL.node.XMLHttpRequest)
      if (!a && !fh())
        throw new P('internal-error', 'The XMLHttpRequest compatibility library was not found.')
      this.Ie = void 0
      fh() ? (this.Ie = new nf({ Ek: self })) : hh() ? (this.Ie = new hj(a)) : (this.Ie = new kf())
      this.C = null
    },
    nj,
    oj = function (a, b) {
      b ? (a.Lb['X-Firebase-Locale'] = b) : delete a.Lb['X-Firebase-Locale']
    },
    qj = function (a, b) {
      b &&
        ((a.ei = pj('https://securetoken.googleapis.com/v1/token', b)),
        (a.mh = pj('https://www.googleapis.com/identitytoolkit/v3/relyingparty/', b)),
        (a.xh = pj('https://identitytoolkit.googleapis.com/v2/', b)))
    },
    pj = function (a, b) {
      a = E(a)
      b = E(b.url)
      vc(a, a.ga + a.fb)
      rc(a, b.ua)
      tc(a, b.ga)
      uc(a, b.Ua)
      return a.toString()
    },
    rj = function (a, b) {
      b
        ? ((a.Lb['X-Client-Version'] = b), (a.Ke['X-Client-Version'] = b))
        : (delete a.Lb['X-Client-Version'], delete a.Ke['X-Client-Version'])
    },
    tj = function (a, b, c, d, e, f, g) {
      Rg() || fh()
        ? (a = v(a.jk, a))
        : (nj ||
            (nj = new H(function (h, k) {
              sj(h, k)
            })),
          (a = v(a.ik, a)))
      a(b, c, d, e, f, g)
    }
  mj.prototype.jk = function (a, b, c, d, e, f) {
    if (
      fh() &&
      ('undefined' === typeof q.fetch ||
        'undefined' === typeof q.Headers ||
        'undefined' === typeof q.Request)
    )
      throw new P(
        'operation-not-supported-in-this-environment',
        'fetch, Headers and Request native APIs or equivalent Polyfills must be available to support HTTP requests from a Worker environment.'
      )
    var g = new K(this.Ie)
    if (f) {
      g.Hc = Math.max(0, f)
      var h = setTimeout(function () {
        g.dispatchEvent('timeout')
      }, f)
    }
    g.listen('complete', function () {
      h && clearTimeout(h)
      var k = null
      try {
        var p = JSON,
          n = p.parse
        try {
          var r = this.j ? this.j.responseText : ''
        } catch (t) {
          dd(this.P, 'Can not get responseText: ' + t.message), (r = '')
        }
        k = n.call(p, r) || null
      } catch (t) {
        k = null
      }
      b && b(k)
    })
    Ye(g, 'ready', function () {
      h && clearTimeout(h)
      this.Hb()
    })
    Ye(g, 'timeout', function () {
      h && clearTimeout(h)
      this.Hb()
      b && b(null)
    })
    g.send(a, c, d, e)
  }
  var sj = function (a, b) {
    if (((window.gapi || {}).client || {}).request) a()
    else {
      q[uj] = function () {
        ;((window.gapi || {}).client || {}).request ? a() : b(Error('CORS_UNSUPPORTED'))
      }
      var c = pb(vj, { onload: uj })
      lg(ug(c), function () {
        b(Error('CORS_UNSUPPORTED'))
      })
    }
  }
  mj.prototype.ik = function (a, b, c, d, e) {
    var f = this
    nj.then(function () {
      window.gapi.client.setApiKey(f.A)
      var g = window.gapi.auth.getToken()
      window.gapi.auth.setToken(null)
      window.gapi.client.request({
        path: a,
        method: c,
        body: d,
        headers: e,
        authType: 'none',
        callback: function (h) {
          window.gapi.auth.setToken(g)
          b && b(h)
        },
      })
    }).h(function (g) {
      b && b({ error: { message: (g && g.message) || 'CORS_UNSUPPORTED' } })
    })
  }
  var xj = function (a, b) {
      return new H(function (c, d) {
        ;('refresh_token' == b.grant_type && b.refresh_token) ||
        ('authorization_code' == b.grant_type && b.code)
          ? tj(
              a,
              a.ei + '?key=' + encodeURIComponent(a.A),
              function (e) {
                e
                  ? e.error
                    ? d(wj(e))
                    : e.access_token && e.refresh_token
                    ? c(e)
                    : d(new P('internal-error'))
                  : d(new P('network-request-failed'))
              },
              'POST',
              Kc(b).toString(),
              a.Ke,
              a.hk.get()
            )
          : d(new P('internal-error'))
      })
    },
    yj = function (a, b, c, d, e, f, g) {
      var h = E(b + c)
      C(h, 'key', a.A)
      g && C(h, 'cb', Date.now().toString())
      var k = 'GET' == d
      if (k) for (var p in e) e.hasOwnProperty(p) && C(h, p, e[p])
      return new H(function (n, r) {
        tj(
          a,
          h.toString(),
          function (t) {
            t ? (t.error ? r(wj(t, f || {})) : n(t)) : r(new P('network-request-failed'))
          },
          d,
          k ? void 0 : JSON.stringify(rh(e)),
          a.Lb,
          a.cj.get()
        )
      })
    },
    zj = function (a) {
      a = a.email
      if ('string' !== typeof a || !Zg.test(a)) throw new P('invalid-email')
    },
    Aj = function (a) {
      'email' in a && zj(a)
    },
    Cj = function (a, b, c, d, e, f) {
      var g = Uh(b)
      var h = {}
      e && e.length ? ((h[b] = e.join(',')), (e = JSON.stringify(h))) : (e = null)
      c = {
        identifier: null,
        providerId: b,
        continueUri: c,
        customParameter: d || {},
        oauthScope: e,
        sessionId: f,
      }
      g && (delete c.customParameter, delete c.oauthScope)
      f && 'google.com' == b && (c.authFlowType = 'CODE_FLOW')
      return Q(a, Bj, c)
    },
    Ej = function (a, b) {
      return Q(a, Dj, { identifier: b, continueUri: nh() ? Mg() : 'http://localhost' }).then(
        function (c) {
          return c.signinMethods || []
        }
      )
    },
    Gj = function (a) {
      return Q(a, Fj, {}).then(function (b) {
        return b.authorizedDomains || []
      })
    },
    Hj = function (a, b) {
      return Q(a, Fj, { iosBundleId: b }).then(function () {})
    },
    Ij = function (a, b, c) {
      b = { androidPackageName: b }
      c && (b.sha1Cert = c)
      return Q(a, Fj, b).then(function () {})
    },
    Jj = function (a, b) {
      return Q(a, Fj, { clientId: b }).then(function () {})
    },
    Kj = function (a, b) {
      return Q(a, Fj, { firebaseAppId: b }).then(function () {})
    },
    Lj = function (a) {
      if (!a.idToken) {
        if (a.mfaPendingCredential) throw new P('multi-factor-auth-required', null, Za(a))
        throw new P('internal-error')
      }
    },
    Mj = function (a) {
      if (a.phoneNumber || a.temporaryProof) {
        if (!a.phoneNumber || !a.temporaryProof) throw new P('internal-error')
      } else {
        if (!a.sessionInfo) throw new P('missing-verification-id')
        if (!a.code) throw new P('missing-verification-code')
      }
    }
  l = mj.prototype
  l.signInAnonymously = function () {
    return Q(this, Nj, {})
  }
  l.updateEmail = function (a, b) {
    return Q(this, Oj, { idToken: a, email: b })
  }
  l.updatePassword = function (a, b) {
    return Q(this, Qi, { idToken: a, password: b })
  }
  l.updateProfile = function (a, b) {
    var c = { idToken: a },
      d = []
    Wa(Pj, function (e, f) {
      var g = b[f]
      null === g ? d.push(e) : f in b && (c[f] = g)
    })
    d.length && (c.deleteAttribute = d)
    return Q(this, Oj, c)
  }
  l.sendPasswordResetEmail = function (a, b) {
    a = { requestType: 'PASSWORD_RESET', email: a }
    ab(a, b)
    return Q(this, Qj, a)
  }
  l.sendSignInLinkToEmail = function (a, b) {
    a = { requestType: 'EMAIL_SIGNIN', email: a }
    ab(a, b)
    return Q(this, Rj, a)
  }
  l.sendEmailVerification = function (a, b) {
    a = { requestType: 'VERIFY_EMAIL', idToken: a }
    ab(a, b)
    return Q(this, Sj, a)
  }
  l.verifyBeforeUpdateEmail = function (a, b, c) {
    a = { requestType: 'VERIFY_AND_CHANGE_EMAIL', idToken: a, newEmail: b }
    ab(a, c)
    return Q(this, Tj, a)
  }
  var bj = function (a, b) {
    return Q(a, Uj, b)
  }
  mj.prototype.verifyPhoneNumber = function (a) {
    return Q(this, Vj, a)
  }
  var $i = function (a, b) {
      return Q(a, Wj, b).then(function (c) {
        return c.phoneSessionInfo.sessionInfo
      })
    },
    Xj = function (a) {
      if (!a.phoneVerificationInfo) throw new P('internal-error')
      if (!a.phoneVerificationInfo.sessionInfo) throw new P('missing-verification-id')
      if (!a.phoneVerificationInfo.code) throw new P('missing-verification-code')
    },
    aj = function (a, b) {
      return Q(a, Yj, b).then(function (c) {
        return c.phoneResponseInfo.sessionInfo
      })
    },
    ak = function (a, b, c) {
      return Q(a, Zj, { idToken: b, deleteProvider: c })
    },
    bk = function (a) {
      if (!a.requestUri || (!a.sessionId && !a.postBody && !a.pendingToken))
        throw new P('internal-error')
    },
    ck = function (a, b) {
      b.oauthIdToken &&
        b.providerId &&
        0 == b.providerId.indexOf('oidc.') &&
        !b.pendingToken &&
        (a.sessionId
          ? (b.nonce = a.sessionId)
          : a.postBody && ((a = new zc(a.postBody)), a.Qc('nonce') && (b.nonce = a.get('nonce'))))
      return b
    },
    ek = function (a) {
      var b = null
      a.needConfirmation
        ? ((a.code = 'account-exists-with-different-credential'), (b = gj(a)))
        : 'FEDERATED_USER_ID_ALREADY_LINKED' == a.errorMessage
        ? ((a.code = 'credential-already-in-use'), (b = gj(a)))
        : 'EMAIL_EXISTS' == a.errorMessage
        ? ((a.code = 'email-already-in-use'), (b = gj(a)))
        : a.errorMessage && (b = dk(a.errorMessage))
      if (b) throw b
      Lj(a)
    },
    ui = function (a, b) {
      b.returnIdpCredential = !0
      return Q(a, fk, b)
    },
    vi = function (a, b) {
      b.returnIdpCredential = !0
      return Q(a, gk, b)
    },
    wi = function (a, b) {
      b.returnIdpCredential = !0
      b.autoCreate = !1
      return Q(a, hk, b)
    },
    ik = function (a) {
      if (!a.oobCode) throw new P('invalid-action-code')
    }
  mj.prototype.confirmPasswordReset = function (a, b) {
    return Q(this, jk, { oobCode: a, newPassword: b })
  }
  mj.prototype.checkActionCode = function (a) {
    return Q(this, kk, { oobCode: a })
  }
  mj.prototype.applyActionCode = function (a) {
    return Q(this, lk, { oobCode: a })
  }
  var Q = function (a, b, c) {
      if (!Nh(c, b.ba)) return J(new P('internal-error'))
      var d = !!b.Gd,
        e = b.httpMethod || 'POST',
        f
      return I(c)
        .then(b.G)
        .then(function () {
          b.Ka && (c.returnSecureToken = !0)
          b.I && a.C && 'undefined' === typeof c.tenantId && (c.tenantId = a.C)
          return d
            ? yj(a, a.xh, b.endpoint, e, c, b.bh, b.Qd || !1)
            : yj(a, a.mh, b.endpoint, e, c, b.bh, b.Qd || !1)
        })
        .then(function (g) {
          f = g
          return b.Fe ? b.Fe(c, f) : f
        })
        .then(b.O)
        .then(function () {
          if (!b.Va) return f
          if (!(b.Va in f)) throw new P('internal-error')
          return f[b.Va]
        })
    },
    dk = function (a) {
      return wj({ error: { errors: [{ message: a }], code: 400, reason: a } })
    },
    wj = function (a, b) {
      var c = ((a.error && a.error.errors && a.error.errors[0]) || {}).reason || ''
      var d = { keyInvalid: 'invalid-api-key', ipRefererBlocked: 'app-not-authorized' }
      if ((c = d[c] ? new P(d[c]) : null)) return c
      c = (a.error && (a.error.reason || a.error.message)) || ''
      d = {
        INVALID_CUSTOM_TOKEN: 'invalid-custom-token',
        CREDENTIAL_MISMATCH: 'custom-token-mismatch',
        MISSING_CUSTOM_TOKEN: 'internal-error',
        INVALID_IDENTIFIER: 'invalid-email',
        MISSING_CONTINUE_URI: 'internal-error',
        INVALID_EMAIL: 'invalid-email',
        INVALID_PASSWORD: 'wrong-password',
        USER_DISABLED: 'user-disabled',
        MISSING_PASSWORD: 'internal-error',
        EMAIL_EXISTS: 'email-already-in-use',
        PASSWORD_LOGIN_DISABLED: 'operation-not-allowed',
        INVALID_IDP_RESPONSE: 'invalid-credential',
        INVALID_PENDING_TOKEN: 'invalid-credential',
        FEDERATED_USER_ID_ALREADY_LINKED: 'credential-already-in-use',
        MISSING_OR_INVALID_NONCE: 'missing-or-invalid-nonce',
        INVALID_MESSAGE_PAYLOAD: 'invalid-message-payload',
        INVALID_RECIPIENT_EMAIL: 'invalid-recipient-email',
        INVALID_SENDER: 'invalid-sender',
        EMAIL_NOT_FOUND: 'user-not-found',
        RESET_PASSWORD_EXCEED_LIMIT: 'too-many-requests',
        EXPIRED_OOB_CODE: 'expired-action-code',
        INVALID_OOB_CODE: 'invalid-action-code',
        MISSING_OOB_CODE: 'internal-error',
        INVALID_PROVIDER_ID: 'invalid-provider-id',
        CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'requires-recent-login',
        INVALID_ID_TOKEN: 'invalid-user-token',
        TOKEN_EXPIRED: 'user-token-expired',
        USER_NOT_FOUND: 'user-token-expired',
        CORS_UNSUPPORTED: 'cors-unsupported',
        DYNAMIC_LINK_NOT_ACTIVATED: 'dynamic-link-not-activated',
        INVALID_APP_ID: 'invalid-app-id',
        TOO_MANY_ATTEMPTS_TRY_LATER: 'too-many-requests',
        WEAK_PASSWORD: 'weak-password',
        PASSWORD_DOES_NOT_MEET_REQUIREMENTS: 'password-does-not-meet-requirements',
        OPERATION_NOT_ALLOWED: 'operation-not-allowed',
        USER_CANCELLED: 'user-cancelled',
        CAPTCHA_CHECK_FAILED: 'captcha-check-failed',
        INVALID_APP_CREDENTIAL: 'invalid-app-credential',
        INVALID_CODE: 'invalid-verification-code',
        INVALID_PHONE_NUMBER: 'invalid-phone-number',
        INVALID_SESSION_INFO: 'invalid-verification-id',
        INVALID_TEMPORARY_PROOF: 'invalid-credential',
        INVALID_TENANT_ID: 'invalid-tenant-id',
        MISSING_APP_CREDENTIAL: 'missing-app-credential',
        MISSING_CODE: 'missing-verification-code',
        MISSING_PHONE_NUMBER: 'missing-phone-number',
        MISSING_SESSION_INFO: 'missing-verification-id',
        QUOTA_EXCEEDED: 'quota-exceeded',
        SESSION_EXPIRED: 'code-expired',
        REJECTED_CREDENTIAL: 'rejected-credential',
        INVALID_CONTINUE_URI: 'invalid-continue-uri',
        MISSING_ANDROID_PACKAGE_NAME: 'missing-android-pkg-name',
        MISSING_IOS_BUNDLE_ID: 'missing-ios-bundle-id',
        UNAUTHORIZED_DOMAIN: 'unauthorized-continue-uri',
        INVALID_DYNAMIC_LINK_DOMAIN: 'invalid-dynamic-link-domain',
        INVALID_OAUTH_CLIENT_ID: 'invalid-oauth-client-id',
        INVALID_CERT_HASH: 'invalid-cert-hash',
        UNSUPPORTED_TENANT_OPERATION: 'unsupported-tenant-operation',
        TENANT_ID_MISMATCH: 'tenant-id-mismatch',
        ADMIN_ONLY_OPERATION: 'admin-restricted-operation',
        INVALID_MFA_PENDING_CREDENTIAL: 'invalid-multi-factor-session',
        MFA_ENROLLMENT_NOT_FOUND: 'multi-factor-info-not-found',
        MISSING_MFA_PENDING_CREDENTIAL: 'missing-multi-factor-session',
        MISSING_MFA_ENROLLMENT_ID: 'missing-multi-factor-info',
        EMAIL_CHANGE_NEEDS_VERIFICATION: 'email-change-needs-verification',
        SECOND_FACTOR_EXISTS: 'second-factor-already-in-use',
        SECOND_FACTOR_LIMIT_EXCEEDED: 'maximum-second-factor-count-exceeded',
        UNSUPPORTED_FIRST_FACTOR: 'unsupported-first-factor',
        UNVERIFIED_EMAIL: 'unverified-email',
        API_KEY_SERVICE_BLOCKED: 'api-key-service-blocked',
      }
      b = b || {}
      ab(d, b)
      b = (b = c.match(/^[^\s]+\s*:\s*([\s\S]*)$/)) && 1 < b.length ? b[1] : void 0
      for (var e in d) if (0 === c.indexOf(e)) return new P(d[e], b)
      !b && a && (b = qh(a))
      return new P('internal-error', b)
    },
    ij = new yh(3e4, 6e4),
    jj = { 'Content-Type': 'application/x-www-form-urlencoded' },
    kj = new yh(3e4, 6e4),
    lj = { 'Content-Type': 'application/json' },
    vj = hb('https://apis.google.com/js/client.js?onload=%{onload}'),
    uj = '__fcb' + Math.floor(1e6 * Math.random()).toString(),
    Pj = { displayName: 'DISPLAY_NAME', photoUrl: 'PHOTO_URL' },
    lk = { endpoint: 'setAccountInfo', G: ik, Va: 'email', I: !0 },
    kk = {
      endpoint: 'resetPassword',
      G: ik,
      O: function (a) {
        var b = a.requestType
        if (!b || (!a.email && 'EMAIL_SIGNIN' != b && 'VERIFY_AND_CHANGE_EMAIL' != b))
          throw new P('internal-error')
      },
      I: !0,
    },
    mk = {
      endpoint: 'signupNewUser',
      G: function (a) {
        zj(a)
        if (!a.password) throw new P('weak-password')
      },
      O: Lj,
      Ka: !0,
      I: !0,
    },
    Dj = { endpoint: 'createAuthUri', I: !0 },
    nk = { endpoint: 'deleteAccount', ba: ['idToken'] },
    Zj = {
      endpoint: 'setAccountInfo',
      ba: ['idToken', 'deleteProvider'],
      G: function (a) {
        if (!Array.isArray(a.deleteProvider)) throw new P('internal-error')
      },
    },
    Ni = { endpoint: 'emailLinkSignin', ba: ['email', 'oobCode'], G: zj, O: Lj, Ka: !0, I: !0 },
    Pi = { endpoint: 'emailLinkSignin', ba: ['idToken', 'email', 'oobCode'], G: zj, O: Lj, Ka: !0 },
    ok = {
      endpoint: 'accounts/mfaEnrollment:finalize',
      ba: ['idToken', 'phoneVerificationInfo'],
      G: Xj,
      O: Lj,
      I: !0,
      Gd: !0,
    },
    pk = {
      endpoint: 'accounts/mfaSignIn:finalize',
      ba: ['mfaPendingCredential', 'phoneVerificationInfo'],
      G: Xj,
      O: Lj,
      I: !0,
      Gd: !0,
    },
    qk = { endpoint: 'getAccountInfo' },
    Bj = {
      endpoint: 'createAuthUri',
      G: function (a) {
        if (!a.continueUri) throw new P('missing-continue-uri')
        if (!a.providerId)
          throw new P('internal-error', 'A provider ID must be provided in the request.')
      },
      O: function (a) {
        if (!a.authUri)
          throw new P(
            'internal-error',
            'Unable to determine the authorization endpoint for the specified provider. This may be an issue in the provider configuration.'
          )
        if (!a.sessionId) throw new P('internal-error')
      },
      I: !0,
    },
    Rj = {
      endpoint: 'getOobConfirmationCode',
      ba: ['requestType'],
      G: function (a) {
        if ('EMAIL_SIGNIN' != a.requestType) throw new P('internal-error')
        zj(a)
      },
      Va: 'email',
      I: !0,
    },
    Sj = {
      endpoint: 'getOobConfirmationCode',
      ba: ['idToken', 'requestType'],
      G: function (a) {
        if ('VERIFY_EMAIL' != a.requestType) throw new P('internal-error')
      },
      Va: 'email',
      I: !0,
    },
    Tj = {
      endpoint: 'getOobConfirmationCode',
      ba: ['idToken', 'newEmail', 'requestType'],
      G: function (a) {
        if ('VERIFY_AND_CHANGE_EMAIL' != a.requestType) throw new P('internal-error')
      },
      Va: 'email',
      I: !0,
    },
    Qj = {
      endpoint: 'getOobConfirmationCode',
      ba: ['requestType'],
      G: function (a) {
        if ('PASSWORD_RESET' != a.requestType) throw new P('internal-error')
        zj(a)
      },
      Va: 'email',
      I: !0,
    },
    Fj = { Qd: !0, endpoint: 'getProjectConfig', httpMethod: 'GET' },
    rk = {
      Qd: !0,
      endpoint: 'getRecaptchaParam',
      httpMethod: 'GET',
      O: function (a) {
        if (!a.recaptchaSiteKey) throw new P('internal-error')
      },
    },
    jk = { endpoint: 'resetPassword', G: ik, Va: 'email', I: !0 },
    sk = { Qd: !0, endpoint: 'getProjectConfig', httpMethod: 'GET', Va: 'dynamicLinksDomain' },
    Uj = {
      endpoint: 'sendVerificationCode',
      ba: ['phoneNumber', 'recaptchaToken'],
      Va: 'sessionInfo',
      I: !0,
    },
    Oj = { endpoint: 'setAccountInfo', ba: ['idToken'], G: Aj, Ka: !0 },
    Qi = {
      endpoint: 'setAccountInfo',
      ba: ['idToken'],
      G: function (a) {
        Aj(a)
        if (!a.password) throw new P('weak-password')
      },
      O: Lj,
      Ka: !0,
    },
    Nj = { endpoint: 'signupNewUser', O: Lj, Ka: !0, I: !0 },
    Wj = {
      endpoint: 'accounts/mfaEnrollment:start',
      ba: ['idToken', 'phoneEnrollmentInfo'],
      G: function (a) {
        if (!a.phoneEnrollmentInfo) throw new P('internal-error')
        if (!a.phoneEnrollmentInfo.phoneNumber) throw new P('missing-phone-number')
        if (!a.phoneEnrollmentInfo.recaptchaToken) throw new P('missing-app-credential')
      },
      O: function (a) {
        if (!a.phoneSessionInfo || !a.phoneSessionInfo.sessionInfo) throw new P('internal-error')
      },
      I: !0,
      Gd: !0,
    },
    Yj = {
      endpoint: 'accounts/mfaSignIn:start',
      ba: ['mfaPendingCredential', 'mfaEnrollmentId', 'phoneSignInInfo'],
      G: function (a) {
        if (!a.phoneSignInInfo || !a.phoneSignInInfo.recaptchaToken)
          throw new P('missing-app-credential')
      },
      O: function (a) {
        if (!a.phoneResponseInfo || !a.phoneResponseInfo.sessionInfo) throw new P('internal-error')
      },
      I: !0,
      Gd: !0,
    },
    fk = { endpoint: 'verifyAssertion', G: bk, Fe: ck, O: ek, Ka: !0, I: !0 },
    hk = {
      endpoint: 'verifyAssertion',
      G: bk,
      Fe: ck,
      O: function (a) {
        if (a.errorMessage && 'USER_NOT_FOUND' == a.errorMessage) throw new P('user-not-found')
        if (a.errorMessage) throw dk(a.errorMessage)
        Lj(a)
      },
      Ka: !0,
      I: !0,
    },
    gk = {
      endpoint: 'verifyAssertion',
      G: function (a) {
        bk(a)
        if (!a.idToken) throw new P('internal-error')
      },
      Fe: ck,
      O: ek,
      Ka: !0,
    },
    tk = {
      endpoint: 'verifyCustomToken',
      G: function (a) {
        if (!a.token) throw new P('invalid-custom-token')
      },
      O: Lj,
      Ka: !0,
      I: !0,
    },
    Oi = {
      endpoint: 'verifyPassword',
      G: function (a) {
        zj(a)
        if (!a.password) throw new P('wrong-password')
      },
      O: Lj,
      Ka: !0,
      I: !0,
    },
    Vj = { endpoint: 'verifyPhoneNumber', G: Mj, O: Lj, I: !0 },
    Wi = {
      endpoint: 'verifyPhoneNumber',
      G: function (a) {
        if (!a.idToken) throw new P('internal-error')
        Mj(a)
      },
      O: function (a) {
        if (a.temporaryProof) throw ((a.code = 'credential-already-in-use'), gj(a))
        Lj(a)
      },
    },
    Xi = {
      bh: { USER_NOT_FOUND: 'user-not-found' },
      endpoint: 'verifyPhoneNumber',
      G: Mj,
      O: Lj,
      I: !0,
    },
    uk = {
      endpoint: 'accounts/mfaEnrollment:withdraw',
      ba: ['idToken', 'mfaEnrollmentId'],
      O: function (a) {
        if (!!a.idToken ^ !!a.refreshToken) throw new P('internal-error')
      },
      I: !0,
      Gd: !0,
    }
  var wk = function (a) {
      this.Zb = a
      this.ke = null
      this.Xf = vk(this)
    },
    vk = function (a) {
      return xk().then(function () {
        return new H(function (b, c) {
          M('gapi.iframes.getContext')().open(
            {
              where: document.body,
              url: a.Zb,
              messageHandlersFilter: M('gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER'),
              attributes: {
                style: { position: 'absolute', top: '-100px', width: '1px', height: '1px' },
              },
              dontclear: !0,
            },
            function (d) {
              a.ke = d
              a.ke.restyle({ setHideOnLeave: !1 })
              var e = setTimeout(function () {
                  c(Error('Network Error'))
                }, yk.get()),
                f = function () {
                  clearTimeout(e)
                  b()
                }
              d.ping(f).then(f, function () {
                c(Error('Network Error'))
              })
            }
          )
        })
      })
    }
  wk.prototype.sendMessage = function (a) {
    var b = this
    return this.Xf.then(function () {
      return new H(function (c) {
        b.ke.send(a.type, a, c, M('gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER'))
      })
    })
  }
  var zk = function (a, b) {
      a.Xf.then(function () {
        a.ke.register('authEvent', b, M('gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER'))
      })
    },
    xk = function () {
      return Ak
        ? Ak
        : (Ak = new H(function (a, b) {
            var c = function () {
              xh()
              M('gapi.load')('gapi.iframes', {
                callback: a,
                ontimeout: function () {
                  xh()
                  b(Error('Network Error'))
                },
                timeout: Bk.get(),
              })
            }
            if (M('gapi.iframes.Iframe')) a()
            else if (M('gapi.load')) c()
            else {
              var d = '__iframefcb' + Math.floor(1e6 * Math.random()).toString()
              q[d] = function () {
                M('gapi.load') ? c() : b(Error('Network Error'))
              }
              d = pb(Ck, { onload: d })
              I(ug(d)).h(function () {
                b(Error('Network Error'))
              })
            }
          }).h(function (a) {
            Ak = null
            throw a
          }))
    },
    Ck = hb('https://apis.google.com/js/api.js?onload=%{onload}'),
    Bk = new yh(3e4, 6e4),
    yk = new yh(5e3, 15e3),
    Ak = null
  var Dk = function (a, b, c, d) {
    this.J = a
    this.A = b
    this.B = c
    this.s = d
    this.bc = null
    this.s
      ? ((a = E(this.s.url)), (a = Gc(a.ua, a.ga, a.Ua, '/emulator/auth/iframe', null, null)))
      : (a = Gc('https', this.J, null, '/__/auth/iframe', null, null))
    this.jb = a
    C(this.jb, 'apiKey', this.A)
    C(this.jb, 'appName', this.B)
    this.pa = null
    this.U = []
  }
  Dk.prototype.wg = function (a) {
    this.bc = a
    return this
  }
  Dk.prototype.tg = function (a) {
    this.pa = a
    return this
  }
  Dk.prototype.toString = function () {
    this.bc ? C(this.jb, 'v', this.bc) : this.jb.removeParameter('v')
    this.pa ? C(this.jb, 'eid', this.pa) : this.jb.removeParameter('eid')
    this.U.length ? C(this.jb, 'fw', this.U.join(',')) : this.jb.removeParameter('fw')
    return this.jb.toString()
  }
  var Ek = function (a, b, c, d, e, f) {
    this.J = a
    this.A = b
    this.B = c
    this.Qi = d
    this.s = f
    this.bc = this.T = this.Dc = null
    this.Bc = e
    this.C = this.pa = null
  }
  Ek.prototype.vg = function (a) {
    this.C = a
    return this
  }
  Ek.prototype.wg = function (a) {
    this.bc = a
    return this
  }
  Ek.prototype.tg = function (a) {
    this.pa = a
    return this
  }
  Ek.prototype.toString = function () {
    if (this.s) {
      var a = E(this.s.url)
      a = Gc(a.ua, a.ga, a.Ua, '/emulator/auth/handler', null, null)
    } else a = Gc('https', this.J, null, '/__/auth/handler', null, null)
    C(a, 'apiKey', this.A)
    C(a, 'appName', this.B)
    C(a, 'authType', this.Qi)
    if (this.Bc.isOAuthProvider) {
      var b = this.Bc
      try {
        var c = firebase.app(this.B).auth().Ga
      } catch (f) {
        c = null
      }
      b.sf = c
      C(a, 'providerId', this.Bc.providerId)
      c = this.Bc
      b = rh(c.dh)
      for (var d in b) b[d] = b[d].toString()
      d = sh(b, c.Vj)
      c.Of && c.sf && !d[c.Of] && (d[c.Of] = c.sf)
      Ya(d) || C(a, 'customParameters', qh(d))
    }
    'function' === typeof this.Bc.rh &&
      ((d = this.Bc.rh()), d.length && C(a, 'scopes', d.join(',')))
    this.Dc ? C(a, 'redirectUrl', this.Dc) : a.removeParameter('redirectUrl')
    this.T ? C(a, 'eventId', this.T) : a.removeParameter('eventId')
    this.bc ? C(a, 'v', this.bc) : a.removeParameter('v')
    if (this.Jd) for (var e in this.Jd) this.Jd.hasOwnProperty(e) && !D(a, e) && C(a, e, this.Jd[e])
    this.C ? C(a, 'tid', this.C) : a.removeParameter('tid')
    this.pa ? C(a, 'eid', this.pa) : a.removeParameter('eid')
    e = Fk(this.B)
    e.length && C(a, 'fw', e.join(','))
    return a.toString()
  }
  var Fk = function (a) {
      try {
        return Va(firebase.app(a).auth().U)
      } catch (b) {
        return []
      }
    },
    Gk = function (a, b, c, d, e, f) {
      this.J = a
      this.A = b
      this.B = c
      this.s = f
      this.Qa = d || null
      this.pa = e || null
      this.i = this.Jf = this.ph = null
      this.Ya = []
      this.ne = this.eb = null
    },
    Hk = function (a) {
      var b = b || Mg()
      return Gj(a).then(function (c) {
        if (!Yg(c, b)) throw new li(Mg())
      })
    }
  l = Gk.prototype
  l.initialize = function () {
    if (this.ne) return this.ne
    var a = this
    return (this.ne = $g().then(function () {
      if (!a.Jf) {
        var b = a.Qa,
          c = a.pa,
          d = Fk(a.B)
        b = new Dk(a.J, a.A, a.B, a.s).wg(b).tg(c)
        b.U = Va(d || [])
        a.Jf = b.toString()
      }
      a.je = new wk(a.Jf)
      Ik(a)
    }))
  }
  l.Ad = function (a, b, c) {
    var d = new P('popup-closed-by-user'),
      e = new P('web-storage-unsupported'),
      f = this,
      g = !1
    return this.Pb()
      .then(function () {
        Jk(f).then(function (h) {
          h || (a && Tg(a), b(e), (g = !0))
        })
      })
      .h(function () {})
      .then(function () {
        if (!g) return Wg(a)
      })
      .then(function () {
        if (!g)
          return wg(c).then(function () {
            b(d)
          })
      })
  }
  l.pi = function () {
    var a = L()
    return !ph(a) && !wh(a)
  }
  l.uh = function () {
    return !1
  }
  l.pd = function (a, b, c, d, e, f, g, h) {
    if (!a) return J(new P('popup-blocked'))
    if (g && !ph())
      return (
        this.Pb().h(function (p) {
          Tg(a)
          e(p)
        }),
        d(),
        I()
      )
    this.eb || (this.eb = Hk(Kk(this)))
    var k = this
    return this.eb
      .then(function () {
        var p = k.Pb().h(function (n) {
          Tg(a)
          e(n)
          throw n
        })
        d()
        return p
      })
      .then(function () {
        ej(c)
        if (!g) {
          var p = Lk(k.J, k.A, k.B, b, c, null, f, k.Qa, void 0, k.pa, h, k.s)
          Ng(p, a)
        }
      })
      .h(function (p) {
        'auth/network-request-failed' == p.code && (k.eb = null)
        throw p
      })
  }
  var Kk = function (a) {
    a.i ||
      ((a.ph = a.Qa ? kh('JsCore', a.Qa, Fk(a.B)) : null),
      (a.i = new mj(a.A, Jg(a.pa), a.ph)),
      a.s && qj(a.i, a.s))
    return a.i
  }
  Gk.prototype.qd = function (a, b, c, d) {
    this.eb || (this.eb = Hk(Kk(this)))
    var e = this
    return this.eb
      .then(function () {
        ej(b)
        var f = Lk(e.J, e.A, e.B, a, b, Mg(), c, e.Qa, void 0, e.pa, d, e.s)
        Ng(f)
      })
      .h(function (f) {
        'auth/network-request-failed' == f.code && (e.eb = null)
        throw f
      })
  }
  Gk.prototype.Pb = function () {
    var a = this
    return this.initialize()
      .then(function () {
        return a.je.Xf
      })
      .h(function () {
        a.eb = null
        throw new P('network-request-failed')
      })
  }
  Gk.prototype.xi = function () {
    return !0
  }
  var Lk = function (a, b, c, d, e, f, g, h, k, p, n, r) {
      a = new Ek(a, b, c, d, e, r)
      a.Dc = f
      a.T = g
      f = a.wg(h)
      f.Jd = Za(k || null)
      return f.tg(p).vg(n).toString()
    },
    Ik = function (a) {
      if (!a.je) throw Error('IfcHandler must be initialized!')
      zk(a.je, function (b) {
        var c = {}
        if (b && b.authEvent) {
          var d = !1
          b = Yh(b.authEvent)
          for (c = 0; c < a.Ya.length; c++) d = a.Ya[c](b) || d
          c = {}
          c.status = d ? 'ACK' : 'ERROR'
          return I(c)
        }
        c.status = 'ERROR'
        return I(c)
      })
    },
    Jk = function (a) {
      var b = { type: 'webStorageSupport' }
      return a
        .initialize()
        .then(function () {
          return a.je.sendMessage(b)
        })
        .then(function (c) {
          if (c && c.length && 'undefined' !== typeof c[0].webStorageSupport)
            return c[0].webStorageSupport
          throw Error()
        })
    }
  Gk.prototype.dc = function (a) {
    this.Ya.push(a)
  }
  Gk.prototype.vd = function (a) {
    Ua(this.Ya, function (b) {
      return b == a
    })
  }
  function Mk() {}
  Mk.prototype.render = function () {}
  Mk.prototype.reset = function () {}
  Mk.prototype.getResponse = function () {}
  Mk.prototype.execute = function () {}
  var Nk = function () {
    this.jc = q.grecaptcha ? Infinity : 0
    this.qc = null
    this.mf = '__rcb' + Math.floor(1e6 * Math.random()).toString()
  }
  Nk.prototype.Jh = function (a) {
    var b = this
    return new H(function (c, d) {
      var e = setTimeout(function () {
        d(new P('network-request-failed'))
      }, Ok.get())
      if (!q.grecaptcha || (a !== b.qc && !b.jc)) {
        q[b.mf] = function () {
          if (q.grecaptcha) {
            b.qc = a
            var g = q.grecaptcha.render
            q.grecaptcha.render = function (h, k) {
              h = g(h, k)
              b.jc++
              return h
            }
            clearTimeout(e)
            c(q.grecaptcha)
          } else clearTimeout(e), d(new P('internal-error'))
          delete q[b.mf]
        }
        var f = pb(Pk, { onload: b.mf, hl: a || '' })
        I(ug(f)).h(function () {
          clearTimeout(e)
          d(new P('internal-error', 'Unable to load external reCAPTCHA dependencies!'))
        })
      } else clearTimeout(e), c(q.grecaptcha)
    })
  }
  Nk.prototype.Sg = function () {
    this.jc--
  }
  var Pk = hb(
      'https://www.google.com/recaptcha/api.js?trustedtypes=true&onload=%{onload}&render=explicit&hl=%{hl}'
    ),
    Ok = new yh(3e4, 6e4),
    Qk = null
  var Rk = function () {
    this.Sf = {}
    this.jc = 1e12
  }
  Rk.prototype.render = function (a, b) {
    this.Sf[this.jc.toString()] = new Sk(a, b)
    return this.jc++
  }
  Rk.prototype.reset = function (a) {
    var b = Tk(this, a)
    a = Uk(a)
    b && a && (b.delete(), delete this.Sf[a])
  }
  Rk.prototype.getResponse = function (a) {
    return (a = Tk(this, a)) ? a.getResponse() : null
  }
  Rk.prototype.execute = function (a) {
    ;(a = Tk(this, a)) && a.execute()
  }
  var Tk = function (a, b) {
      return (b = Uk(b)) ? a.Sf[b] || null : null
    },
    Uk = function (a) {
      return (a = 'undefined' === typeof a ? 1e12 : a) ? a.toString() : null
    },
    Vk = null,
    Sk = function (a, b) {
      this.Aa = !1
      this.V = b
      this.Ic = this.Ge = null
      this.Fh = 'invisible' !== this.V.size
      this.S = Nd(a)
      var c = this
      this.Ph = function () {
        c.execute()
      }
      this.Fh ? this.execute() : Re(this.S, 'click', this.Ph)
    }
  Sk.prototype.getResponse = function () {
    Wk(this)
    return this.Ge
  }
  Sk.prototype.execute = function () {
    Wk(this)
    var a = this
    this.Ic ||
      (this.Ic = setTimeout(function () {
        a.Ge = ih()
        var b = a.V.callback,
          c = a.V['expired-callback']
        if (b)
          try {
            b(a.Ge)
          } catch (d) {}
        a.Ic = setTimeout(function () {
          a.Ic = null
          a.Ge = null
          if (c)
            try {
              c()
            } catch (d) {}
          a.Fh && a.execute()
        }, 6e4)
      }, 500))
  }
  Sk.prototype.delete = function () {
    Wk(this)
    this.Aa = !0
    clearTimeout(this.Ic)
    this.Ic = null
    Ze(this.S, 'click', this.Ph)
  }
  var Wk = function (a) {
    if (a.Aa) throw Error('reCAPTCHA mock was already deleted!')
  }
  var Xk = function () {}
  Xk.prototype.Jh = function () {
    Vk || (Vk = new Rk())
    return I(Vk)
  }
  Xk.prototype.Sg = function () {}
  var Yk = null
  var Zk = function (a, b, c, d, e, f, g) {
    N(this, 'type', 'recaptcha')
    this.Mc = this.Oc = null
    this.Uc = !1
    this.Pc = b
    this.cd = null
    g ? (Yk || (Yk = new Xk()), (g = Yk)) : (Qk || (Qk = new Nk()), (g = Qk))
    this.ai = g
    this.Ta = c || { theme: 'light', type: 'image' }
    this.Z = []
    if (this.Ta.sitekey)
      throw new P(
        'argument-error',
        'sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.'
      )
    this.oe = 'invisible' === this.Ta.size
    if (!q.document)
      throw new P(
        'operation-not-supported-in-this-environment',
        'RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment with DOM support.'
      )
    if (!Nd(b) || (!this.oe && Nd(b).hasChildNodes()))
      throw new P(
        'argument-error',
        'reCAPTCHA container is either not found or already contains inner elements!'
      )
    this.i = new mj(a, f || null, e || null)
    this.fj =
      d ||
      function () {
        return null
      }
    var h = this
    this.Se = []
    var k = this.Ta.callback
    this.Ta.callback = function (n) {
      h.Vc(n)
      if ('function' === typeof k) k(n)
      else if ('string' === typeof k) {
        var r = M(k, q)
        'function' === typeof r && r(n)
      }
    }
    var p = this.Ta['expired-callback']
    this.Ta['expired-callback'] = function () {
      h.Vc(null)
      if ('function' === typeof p) p()
      else if ('string' === typeof p) {
        var n = M(p, q)
        'function' === typeof n && n()
      }
    }
  }
  Zk.prototype.Vc = function (a) {
    for (var b = 0; b < this.Se.length; b++)
      try {
        this.Se[b](a)
      } catch (c) {}
  }
  var $k = function (a, b) {
    Ua(a.Se, function (c) {
      return c == b
    })
  }
  l = Zk.prototype
  l.l = function (a) {
    var b = this
    this.Z.push(a)
    a.Bb(function () {
      Sa(b.Z, a)
    })
    return a
  }
  l.gd = function () {
    var a = this
    return this.Oc
      ? this.Oc
      : (this.Oc = this.l(
          I()
            .then(function () {
              if (nh() && !fh()) return $g()
              throw new P(
                'operation-not-supported-in-this-environment',
                'RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment.'
              )
            })
            .then(function () {
              return a.ai.Jh(a.fj())
            })
            .then(function (b) {
              a.cd = b
              return Q(a.i, rk, {})
            })
            .then(function (b) {
              a.Ta.sitekey = b.recaptchaSiteKey
            })
            .h(function (b) {
              a.Oc = null
              throw b
            })
        ))
  }
  l.render = function () {
    al(this)
    var a = this
    return this.l(
      this.gd().then(function () {
        if (null === a.Mc) {
          var b = a.Pc
          if (!a.oe) {
            var c = Nd(b)
            b = Rd('DIV')
            c.appendChild(b)
          }
          a.Mc = a.cd.render(b, a.Ta)
        }
        return a.Mc
      })
    )
  }
  l.verify = function () {
    al(this)
    var a = this
    return this.l(
      this.render().then(function (b) {
        return new H(function (c) {
          var d = a.cd.getResponse(b)
          if (d) c(d)
          else {
            var e = function (f) {
              f && ($k(a, e), c(f))
            }
            a.Se.push(e)
            a.oe && a.cd.execute(a.Mc)
          }
        })
      })
    )
  }
  l.reset = function () {
    al(this)
    null !== this.Mc && this.cd.reset(this.Mc)
  }
  var al = function (a) {
    if (a.Uc) throw new P('internal-error', 'RecaptchaVerifier instance has been destroyed.')
  }
  Zk.prototype.clear = function () {
    al(this)
    this.Uc = !0
    this.ai.Sg()
    for (var a = 0; a < this.Z.length; a++)
      this.Z[a].cancel('RecaptchaVerifier instance has been destroyed.')
    this.oe || Vd(Nd(this.Pc))
  }
  var bl = function (a, b, c) {
    var d = !1
    try {
      this.u = c || firebase.app()
    } catch (g) {
      throw new P('argument-error', 'No firebase.app.App instance is currently initialized.')
    }
    if (this.u.options && this.u.options.apiKey) c = this.u.options.apiKey
    else throw new P('invalid-api-key')
    var e = this,
      f = null
    try {
      f = Va(this.u.auth().U)
    } catch (g) {}
    try {
      d = this.u.auth().settings.appVerificationDisabledForTesting
    } catch (g) {}
    f = firebase.SDK_VERSION ? kh('JsCore', firebase.SDK_VERSION, f) : null
    Zk.call(
      this,
      c,
      a,
      b,
      function () {
        try {
          var g = e.u.auth().Ga
        } catch (h) {
          g = null
        }
        return g
      },
      f,
      Jg(Kg),
      d
    )
  }
  w(bl, Zk)
  var cl = function (a, b) {
    this.Dk = a
    this.rk = b || '*'
  }
  cl.prototype.postMessage = function (a, b) {
    this.Dk.postMessage(a, this.rk, b)
  }
  var dl = function (a) {
    this.Id = a
  }
  dl.prototype.postMessage = function (a, b) {
    this.Id.postMessage(a, b)
  }
  var el = function (a) {
      this.Qj = a
      this.Tg = !1
      this.te = []
    },
    fl = function (a, b, c, d) {
      var e = Date.now()
      return a.send(b, c).h(function (f) {
        if (f && 'connection_unavailable' === f.message) throw f
        var g = Date.now() - e
        if (g > d) throw f
        return fl(a, b, c, d - g)
      })
    }
  el.prototype.send = function (a, b, c) {
    b = void 0 === b ? null : b
    c = void 0 === c ? !1 : c
    var d = this,
      e
    b = b || {}
    var f,
      g,
      h,
      k = null
    if (this.Tg) return J(Error('connection_unavailable'))
    var p = c ? 800 : 50,
      n = 'undefined' !== typeof MessageChannel ? new MessageChannel() : null
    return new H(function (r, t) {
      n
        ? ((e = '' + Math.floor(Math.random() * Math.pow(10, 20)).toString()),
          n.port1.start(),
          (g = setTimeout(function () {
            t(Error('unsupported_event'))
          }, p)),
          (f = function (z) {
            z.data.eventId === e &&
              ('ack' === z.data.status
                ? (clearTimeout(g),
                  (h = setTimeout(function () {
                    t(Error('timeout'))
                  }, 3e3)))
                : 'done' === z.data.status
                ? (clearTimeout(h),
                  'undefined' !== typeof z.data.response
                    ? r(z.data.response)
                    : t(Error('unknown_error')))
                : (clearTimeout(g), clearTimeout(h), t(Error('invalid_response'))))
          }),
          (k = { messageChannel: n, onMessage: f }),
          d.te.push(k),
          n.port1.addEventListener('message', f),
          d.Qj.postMessage({ eventType: a, eventId: e, data: b }, [n.port2]))
        : t(Error('connection_unavailable'))
    })
      .then(function (r) {
        gl(d, k)
        return r
      })
      .h(function (r) {
        gl(d, k)
        throw r
      })
  }
  var gl = function (a, b) {
    if (b) {
      var c = b.messageChannel,
        d = b.onMessage
      c && (c.port1.removeEventListener('message', d), c.port1.close())
      Ua(a.te, function (e) {
        return e == b
      })
    }
  }
  el.prototype.close = function () {
    for (; 0 < this.te.length; ) gl(this, this.te[0])
    this.Tg = !0
  }
  var hl = function (a) {
      this.xf = a
      this.Da = {}
      this.Kh = v(this.ij, this)
    },
    jl = function () {
      var a = fh() ? self : null
      y(il, function (c) {
        c.xf == a && (b = c)
      })
      if (!b) {
        var b = new hl(a)
        il.push(b)
      }
      return b
    }
  hl.prototype.ij = function (a) {
    var b = a.data.eventType,
      c = a.data.eventId,
      d = this.Da[b]
    if (d && 0 < d.length) {
      a.ports[0].postMessage({ status: 'ack', eventId: c, eventType: b, response: null })
      var e = []
      y(d, function (f) {
        e.push(
          I().then(function () {
            return f(a.origin, a.data.data)
          })
        )
      })
      Rf(e).then(function (f) {
        var g = []
        y(f, function (h) {
          g.push({ fulfilled: h.oh, value: h.value, reason: h.reason ? h.reason.message : void 0 })
        })
        y(g, function (h) {
          for (var k in h) 'undefined' === typeof h[k] && delete h[k]
        })
        a.ports[0].postMessage({ status: 'done', eventId: c, eventType: b, response: g })
      })
    }
  }
  hl.prototype.subscribe = function (a, b) {
    Ya(this.Da) && this.xf.addEventListener('message', this.Kh)
    'undefined' === typeof this.Da[a] && (this.Da[a] = [])
    this.Da[a].push(b)
  }
  hl.prototype.unsubscribe = function (a, b) {
    'undefined' !== typeof this.Da[a] && b
      ? (Ua(this.Da[a], function (c) {
          return c == b
        }),
        0 == this.Da[a].length && delete this.Da[a])
      : b || delete this.Da[a]
    Ya(this.Da) && this.xf.removeEventListener('message', this.Kh)
  }
  var il = []
  var kl = function (a) {
    this.za = a || (firebase.INTERNAL.reactNative && firebase.INTERNAL.reactNative.AsyncStorage)
    if (!this.za)
      throw new P('internal-error', 'The React Native compatibility library was not found.')
    this.type = 'asyncStorage'
  }
  l = kl.prototype
  l.get = function (a) {
    return I(this.za.getItem(a)).then(function (b) {
      return b && vh(b)
    })
  }
  l.set = function (a, b) {
    return I(this.za.setItem(a, qh(b)))
  }
  l.remove = function (a) {
    return I(this.za.removeItem(a))
  }
  l.mb = function () {}
  l.zb = function () {}
  function ll() {
    this.storage = {}
    this.type = 'inMemory'
  }
  l = ll.prototype
  l.get = function (a) {
    return I(this.storage[a])
  }
  l.set = function (a, b) {
    this.storage[a] = b
    return I()
  }
  l.remove = function (a) {
    delete this.storage[a]
    return I()
  }
  l.mb = function () {}
  l.zb = function () {}
  var ol = function () {
      if (!ml()) {
        if ('Node' == gh())
          throw new P('internal-error', 'The LocalStorage compatibility library was not found.')
        throw new P('web-storage-unsupported')
      }
      this.za = nl() || firebase.INTERNAL.node.localStorage
      this.type = 'localStorage'
    },
    nl = function () {
      try {
        var a = q.localStorage,
          b = lh()
        a && (a.setItem(b, '1'), a.removeItem(b))
        return a
      } catch (c) {
        return null
      }
    },
    ml = function () {
      var a = 'Node' == gh()
      a = nl() || (a && firebase.INTERNAL.node && firebase.INTERNAL.node.localStorage)
      if (!a) return !1
      try {
        return a.setItem('__sak', '1'), a.removeItem('__sak'), !0
      } catch (b) {
        return !1
      }
    }
  l = ol.prototype
  l.get = function (a) {
    var b = this
    return I().then(function () {
      var c = b.za.getItem(a)
      return vh(c)
    })
  }
  l.set = function (a, b) {
    var c = this
    return I().then(function () {
      var d = qh(b)
      null === d ? c.remove(a) : c.za.setItem(a, d)
    })
  }
  l.remove = function (a) {
    var b = this
    return I().then(function () {
      b.za.removeItem(a)
    })
  }
  l.mb = function (a) {
    q.window && Re(q.window, 'storage', a)
  }
  l.zb = function (a) {
    q.window && Ze(q.window, 'storage', a)
  }
  var pl = function () {
    this.za = {}
    this.type = 'nullStorage'
  }
  l = pl.prototype
  l.get = function () {
    return I(null)
  }
  l.set = function () {
    return I()
  }
  l.remove = function () {
    return I()
  }
  l.mb = function () {}
  l.zb = function () {}
  var sl = function () {
      if (!ql()) {
        if ('Node' == gh())
          throw new P('internal-error', 'The SessionStorage compatibility library was not found.')
        throw new P('web-storage-unsupported')
      }
      this.za = rl() || firebase.INTERNAL.node.sessionStorage
      this.type = 'sessionStorage'
    },
    rl = function () {
      try {
        var a = q.sessionStorage,
          b = lh()
        a && (a.setItem(b, '1'), a.removeItem(b))
        return a
      } catch (c) {
        return null
      }
    },
    ql = function () {
      var a = 'Node' == gh()
      a = rl() || (a && firebase.INTERNAL.node && firebase.INTERNAL.node.sessionStorage)
      if (!a) return !1
      try {
        return a.setItem('__sak', '1'), a.removeItem('__sak'), !0
      } catch (b) {
        return !1
      }
    }
  l = sl.prototype
  l.get = function (a) {
    var b = this
    return I().then(function () {
      var c = b.za.getItem(a)
      return vh(c)
    })
  }
  l.set = function (a, b) {
    var c = this
    return I().then(function () {
      var d = qh(b)
      null === d ? c.remove(a) : c.za.setItem(a, d)
    })
  }
  l.remove = function (a) {
    var b = this
    return I().then(function () {
      b.za.removeItem(a)
    })
  }
  l.mb = function () {}
  l.zb = function () {}
  var vl = function () {
      if (!tl()) throw new P('web-storage-unsupported')
      this.eh = 'firebaseLocalStorageDb'
      this.ve = 'firebaseLocalStorage'
      this.rf = 'fbase_key'
      this.Fi = 'value'
      this.Bk = 1
      this.ka = {}
      this.Wa = []
      this.md = 0
      this.zh = q.indexedDB
      this.type = 'indexedDB'
      this.Le = this.mg = this.Ce = this.cg = null
      this.ii = !1
      this.bf = null
      var a = this
      fh() && self
        ? ((this.mg = jl()),
          this.mg.subscribe('keyChanged', function (b, c) {
            return ul(a).then(function (d) {
              0 < d.length &&
                y(a.Wa, function (e) {
                  e(d)
                })
              return { keyProcessed: Ra(d, c.key) }
            })
          }),
          this.mg.subscribe('ping', function () {
            return I(['keyChanged'])
          }))
        : Gh().then(function (b) {
            if ((a.bf = b))
              (a.Le = new el(new dl(b))),
                a.Le.send('ping', null, !0)
                  .then(function (c) {
                    c[0].fulfilled && Ra(c[0].value, 'keyChanged') && (a.ii = !0)
                  })
                  .h(function () {})
          })
    },
    wl,
    xl = function (a) {
      return new H(function (b, c) {
        var d = a.zh.deleteDatabase(a.eh)
        d.onsuccess = function () {
          b()
        }
        d.onerror = function (e) {
          c(Error(e.target.error))
        }
      })
    },
    yl = function (a) {
      return new H(function (b, c) {
        var d = a.zh.open(a.eh, a.Bk)
        d.onerror = function (e) {
          try {
            e.preventDefault()
          } catch (f) {}
          c(Error(e.target.error))
        }
        d.onupgradeneeded = function (e) {
          e = e.target.result
          try {
            e.createObjectStore(a.ve, { keyPath: a.rf })
          } catch (f) {
            c(f)
          }
        }
        d.onsuccess = function (e) {
          e = e.target.result
          e.objectStoreNames.contains(a.ve)
            ? b(e)
            : xl(a)
                .then(function () {
                  return yl(a)
                })
                .then(function (f) {
                  b(f)
                })
                .h(function (f) {
                  c(f)
                })
        }
      })
    },
    zl = function (a) {
      a.Lf || (a.Lf = yl(a))
      return a.Lf
    },
    Al = function (a, b) {
      var c = 0,
        d = function (e, f) {
          zl(a)
            .then(b)
            .then(e)
            .h(function (g) {
              if (3 < ++c) f(g)
              else
                return zl(a)
                  .then(function (h) {
                    h.close()
                    a.Lf = void 0
                    return d(e, f)
                  })
                  .h(function (h) {
                    f(h)
                  })
            })
        }
      return new H(d)
    },
    tl = function () {
      try {
        return !!q.indexedDB
      } catch (a) {
        return !1
      }
    },
    Bl = function (a, b) {
      return b.objectStore(a.ve)
    },
    Cl = function (a, b, c) {
      return b.transaction([a.ve], c ? 'readwrite' : 'readonly')
    },
    Dl = function (a) {
      return new H(function (b, c) {
        a.onsuccess = function (d) {
          d && d.target ? b(d.target.result) : b()
        }
        a.onerror = function (d) {
          c(d.target.error)
        }
      })
    }
  vl.prototype.set = function (a, b) {
    var c = this,
      d = !1
    return Al(this, function (e) {
      e = Bl(c, Cl(c, e, !0))
      return Dl(e.get(a))
    })
      .then(function (e) {
        return Al(c, function (f) {
          f = Bl(c, Cl(c, f, !0))
          if (e) return (e.value = b), Dl(f.put(e))
          c.md++
          d = !0
          var g = {}
          g[c.rf] = a
          g[c.Fi] = b
          return Dl(f.add(g))
        })
      })
      .then(function () {
        c.ka[a] = b
        return El(c, a)
      })
      .Bb(function () {
        d && c.md--
      })
  }
  var El = function (a, b) {
    return a.Le && a.bf && Fh() === a.bf
      ? a.Le.send('keyChanged', { key: b }, a.ii)
          .then(function () {})
          .h(function () {})
      : I()
  }
  vl.prototype.get = function (a) {
    var b = this
    return Al(this, function (c) {
      return Dl(Bl(b, Cl(b, c, !1)).get(a))
    }).then(function (c) {
      return c && c.value
    })
  }
  vl.prototype.remove = function (a) {
    var b = !1,
      c = this
    return Al(this, function (d) {
      b = !0
      c.md++
      return Dl(Bl(c, Cl(c, d, !0))['delete'](a))
    })
      .then(function () {
        delete c.ka[a]
        return El(c, a)
      })
      .Bb(function () {
        b && c.md--
      })
  }
  var ul = function (a) {
    return zl(a)
      .then(function (b) {
        var c = Bl(a, Cl(a, b, !1))
        return c.getAll
          ? Dl(c.getAll())
          : new H(function (d, e) {
              var f = [],
                g = c.openCursor()
              g.onsuccess = function (h) {
                ;(h = h.target.result) ? (f.push(h.value), h['continue']()) : d(f)
              }
              g.onerror = function (h) {
                e(h.target.error)
              }
            })
      })
      .then(function (b) {
        var c = {},
          d = []
        if (0 == a.md) {
          for (d = 0; d < b.length; d++) c[b[d][a.rf]] = b[d][a.Fi]
          d = Pg(a.ka, c)
          a.ka = c
        }
        return d
      })
  }
  vl.prototype.mb = function (a) {
    0 == this.Wa.length && this.yg()
    this.Wa.push(a)
  }
  vl.prototype.zb = function (a) {
    Ua(this.Wa, function (b) {
      return b == a
    })
    0 == this.Wa.length && this.Oe()
  }
  vl.prototype.yg = function () {
    var a = this
    this.Oe()
    var b = function () {
      a.Ce = setTimeout(function () {
        a.cg = ul(a)
          .then(function (c) {
            0 < c.length &&
              y(a.Wa, function (d) {
                d(c)
              })
          })
          .then(function () {
            b()
          })
          .h(function (c) {
            'STOP_EVENT' != c.message && b()
          })
      }, 800)
    }
    b()
  }
  vl.prototype.Oe = function () {
    this.cg && this.cg.cancel('STOP_EVENT')
    this.Ce && (clearTimeout(this.Ce), (this.Ce = null))
  }
  function Fl(a) {
    var b = this,
      c = null
    this.Wa = []
    this.type = 'indexedDB'
    this.ih = a
    this.Dg = I()
      .then(function () {
        if (tl()) {
          var d = lh(),
            e = '__sak' + d
          wl || (wl = new vl())
          c = wl
          return c
            .set(e, d)
            .then(function () {
              return c.get(e)
            })
            .then(function (f) {
              if (f !== d) throw Error('indexedDB not supported!')
              return c.remove(e)
            })
            .then(function () {
              return c
            })
            .h(function () {
              return b.ih
            })
        }
        return b.ih
      })
      .then(function (d) {
        b.type = d.type
        d.mb(function (e) {
          y(b.Wa, function (f) {
            f(e)
          })
        })
        return d
      })
  }
  l = Fl.prototype
  l.get = function (a) {
    return this.Dg.then(function (b) {
      return b.get(a)
    })
  }
  l.set = function (a, b) {
    return this.Dg.then(function (c) {
      return c.set(a, b)
    })
  }
  l.remove = function (a) {
    return this.Dg.then(function (b) {
      return b.remove(a)
    })
  }
  l.mb = function (a) {
    this.Wa.push(a)
  }
  l.zb = function (a) {
    Ua(this.Wa, function (b) {
      return b == a
    })
  }
  var Kl = function () {
      this.vf = { Browser: Gl, Node: Hl, ReactNative: Il, Worker: Jl }[gh()]
    },
    Ll,
    Gl = { M: ol, Pe: sl },
    Hl = { M: ol, Pe: sl },
    Il = { M: kl, Pe: pl },
    Jl = { M: ol, Pe: pl }
  var Ml = function () {
    this.df = !1
    Object.defineProperty(this, 'appVerificationDisabled', {
      get: function () {
        return this.df
      },
      set: function (a) {
        this.df = a
      },
      enumerable: !1,
    })
  }
  var Nl = function (a) {
    this.cb(a)
  }
  Nl.prototype.cb = function (a) {
    var b = a.url
    if ('undefined' === typeof b) throw new P('missing-continue-uri')
    if ('string' !== typeof b || ('string' === typeof b && !b.length))
      throw new P('invalid-continue-uri')
    this.Si = b
    this.Gg = this.ec = null
    this.Bh = !1
    var c = a.android
    if (c && 'object' === typeof c) {
      b = c.packageName
      var d = c.installApp
      c = c.minimumVersion
      if ('string' === typeof b && b.length) {
        this.ec = b
        if ('undefined' !== typeof d && 'boolean' !== typeof d)
          throw new P('argument-error', 'installApp property must be a boolean when specified.')
        this.Bh = !!d
        if (
          'undefined' !== typeof c &&
          ('string' !== typeof c || ('string' === typeof c && !c.length))
        )
          throw new P(
            'argument-error',
            'minimumVersion property must be a non empty string when specified.'
          )
        this.Gg = c || null
      } else {
        if ('undefined' !== typeof b)
          throw new P(
            'argument-error',
            'packageName property must be a non empty string when specified.'
          )
        if ('undefined' !== typeof d || 'undefined' !== typeof c)
          throw new P('missing-android-pkg-name')
      }
    } else if ('undefined' !== typeof c)
      throw new P('argument-error', 'android property must be a non null object when specified.')
    this.ed = null
    if ((b = a.iOS) && 'object' === typeof b)
      if (((b = b.bundleId), 'string' === typeof b && b.length)) this.ed = b
      else {
        if ('undefined' !== typeof b)
          throw new P(
            'argument-error',
            'bundleId property must be a non empty string when specified.'
          )
      }
    else if ('undefined' !== typeof b)
      throw new P('argument-error', 'iOS property must be a non null object when specified.')
    b = a.handleCodeInApp
    if ('undefined' !== typeof b && 'boolean' !== typeof b)
      throw new P('argument-error', 'handleCodeInApp property must be a boolean when specified.')
    this.Qg = !!b
    a = a.dynamicLinkDomain
    if ('undefined' !== typeof a && ('string' !== typeof a || ('string' === typeof a && !a.length)))
      throw new P(
        'argument-error',
        'dynamicLinkDomain property must be a non empty string when specified.'
      )
    this.Vi = a || null
  }
  var Ol = function (a) {
    var b = {}
    b.continueUrl = a.Si
    b.canHandleCodeInApp = a.Qg
    if ((b.androidPackageName = a.ec))
      (b.androidMinimumVersion = a.Gg), (b.androidInstallApp = a.Bh)
    b.iOSBundleId = a.ed
    b.dynamicLinkDomain = a.Vi
    for (var c in b) null === b[c] && delete b[c]
    return b
  }
  var Pl = function (a, b) {
    this.Ui = b
    N(this, 'verificationId', a)
  }
  Pl.prototype.confirm = function (a) {
    a = cj(this.verificationId, a)
    return this.Ui(a)
  }
  var Ql = function (a, b, c, d) {
    return new Zi(a).verifyPhoneNumber(b, c).then(function (e) {
      return new Pl(e, d)
    })
  }
  var Rl = function (a, b, c) {
    this.Oj = a
    this.ak = b
    this.gj = c
    this.se = 3e4
    this.Fg = 96e4
    this.bk = !1
    this.wc = null
    this.Rb = this.se
    if (this.Fg < this.se) throw Error('Proactive refresh lower bound greater than upper bound!')
  }
  Rl.prototype.start = function () {
    this.Rb = this.se
    Sl(this, !0)
  }
  var Tl = function (a, b) {
      if (b) return (a.Rb = a.se), a.gj()
      b = a.Rb
      a.Rb *= 2
      a.Rb > a.Fg && (a.Rb = a.Fg)
      return b
    },
    Sl = function (a, b) {
      a.stop()
      a.wc = wg(Tl(a, b))
        .then(function () {
          return a.bk ? I() : Ah()
        })
        .then(function () {
          return a.Oj()
        })
        .then(function () {
          Sl(a, !0)
        })
        .h(function (c) {
          a.ak(c) && Sl(a, !1)
        })
    }
  Rl.prototype.stop = function () {
    this.wc && (this.wc.cancel(), (this.wc = null))
  }
  var $l = function (a) {
      var b = {}
      b['facebook.com'] = Ul
      b['google.com'] = Vl
      b['github.com'] = Wl
      b['twitter.com'] = Xl
      var c = a && a.providerId
      try {
        if (c) return b[c] ? new b[c](a) : new Yl(a)
        if ('undefined' !== typeof a.idToken) return new Zl(a)
      } catch (d) {}
      return null
    },
    Zl = function (a) {
      var b = a.providerId
      if (!b && a.idToken) {
        var c = oi(a.idToken)
        c && c.Ac && (b = c.Ac)
      }
      if (!b) throw Error('Invalid additional user info!')
      if ('anonymous' == b || 'custom' == b) b = null
      c = !1
      'undefined' !== typeof a.isNewUser
        ? (c = !!a.isNewUser)
        : 'identitytoolkit#SignupNewUserResponse' === a.kind && (c = !0)
      N(this, 'providerId', b)
      N(this, 'isNewUser', c)
    },
    Yl = function (a) {
      Zl.call(this, a)
      a = vh(a.rawUserInfo || '{}')
      N(this, 'profile', Oh(a || {}))
    }
  m(Yl, Zl)
  var Ul = function (a) {
    Yl.call(this, a)
    if ('facebook.com' != this.providerId) throw Error('Invalid provider ID!')
  }
  m(Ul, Yl)
  var Wl = function (a) {
    Yl.call(this, a)
    if ('github.com' != this.providerId) throw Error('Invalid provider ID!')
    N(this, 'username', (this.profile && this.profile.login) || null)
  }
  m(Wl, Yl)
  var Vl = function (a) {
    Yl.call(this, a)
    if ('google.com' != this.providerId) throw Error('Invalid provider ID!')
  }
  m(Vl, Yl)
  var Xl = function (a) {
    Yl.call(this, a)
    if ('twitter.com' != this.providerId) throw Error('Invalid provider ID!')
    N(this, 'username', a.screenName || null)
  }
  m(Xl, Yl)
  var am = { LOCAL: 'local', NONE: 'none', SESSION: 'session' },
    bm = function (a) {
      var b = new P('invalid-persistence-type'),
        c = new P('unsupported-persistence-type')
      a: {
        for (d in am)
          if (am[d] == a) {
            var d = !0
            break a
          }
        d = !1
      }
      if (!d || 'string' !== typeof a) throw b
      switch (gh()) {
        case 'ReactNative':
          if ('session' === a) throw c
          break
        case 'Node':
          if ('none' !== a) throw c
          break
        case 'Worker':
          if ('session' === a || (!tl() && 'none' !== a)) throw c
          break
        default:
          if (!mh() && 'none' !== a) throw c
      }
    },
    cm = function () {
      var a = !wh(L()) && dh() ? !0 : !1,
        b = ph(),
        c = mh()
      this.Nh = 'firebase'
      this.qg = ':'
      this.ck = a
      this.ci = b
      this.Gi = c
      this.sa = {}
      Ll || (Ll = new Kl())
      a = Ll
      try {
        this.Wh =
          (!Lg() && Dh()) || !q.indexedDB ? new a.vf.M() : new Fl(fh() ? new ll() : new a.vf.M())
      } catch (d) {
        ;(this.Wh = new ll()), (this.ci = !0)
      }
      try {
        this.ui = new a.vf.Pe()
      } catch (d) {
        this.ui = new ll()
      }
      this.uj = new ll()
      this.zg = v(this.ri, this)
      this.ka = {}
    },
    dm,
    em = function () {
      dm || (dm = new cm())
      return dm
    },
    fm = function (a, b) {
      switch (b) {
        case 'session':
          return a.ui
        case 'none':
          return a.uj
        default:
          return a.Wh
      }
    }
  cm.prototype.wa = function (a, b) {
    return this.Nh + this.qg + a.name + (b ? this.qg + b : '')
  }
  var gm = function (a, b, c) {
    var d = a.wa(b, c),
      e = fm(a, b.M)
    return a.get(b, c).then(function (f) {
      var g = null
      try {
        g = vh(q.localStorage.getItem(d))
      } catch (h) {}
      if (g && !f) return q.localStorage.removeItem(d), a.set(b, g, c)
      g && f && 'localStorage' != e.type && q.localStorage.removeItem(d)
    })
  }
  l = cm.prototype
  l.get = function (a, b) {
    return fm(this, a.M).get(this.wa(a, b))
  }
  l.remove = function (a, b) {
    b = this.wa(a, b)
    'local' == a.M && (this.ka[b] = null)
    return fm(this, a.M).remove(b)
  }
  l.set = function (a, b, c) {
    var d = this.wa(a, c),
      e = this,
      f = fm(this, a.M)
    return f
      .set(d, b)
      .then(function () {
        return f.get(d)
      })
      .then(function (g) {
        'local' == a.M && (e.ka[d] = g)
      })
  }
  l.addListener = function (a, b, c) {
    a = this.wa(a, b)
    this.Gi && (this.ka[a] = q.localStorage.getItem(a))
    Ya(this.sa) && this.yg()
    this.sa[a] || (this.sa[a] = [])
    this.sa[a].push(c)
  }
  l.removeListener = function (a, b, c) {
    a = this.wa(a, b)
    this.sa[a] &&
      (Ua(this.sa[a], function (d) {
        return d == c
      }),
      0 == this.sa[a].length && delete this.sa[a])
    Ya(this.sa) && this.Oe()
  }
  l.yg = function () {
    fm(this, 'local').mb(this.zg)
    this.ci || ((Lg() || !Dh()) && q.indexedDB) || !this.Gi || hm(this)
  }
  var hm = function (a) {
      im(a)
      a.Rf = setInterval(function () {
        for (var b in a.sa) {
          var c = q.localStorage.getItem(b),
            d = a.ka[b]
          c != d &&
            ((a.ka[b] = c),
            (c = new Ee({
              type: 'storage',
              key: b,
              target: window,
              oldValue: d,
              newValue: c,
              ag: !0,
            })),
            a.ri(c))
        }
      }, 1e3)
    },
    im = function (a) {
      a.Rf && (clearInterval(a.Rf), (a.Rf = null))
    }
  cm.prototype.Oe = function () {
    fm(this, 'local').zb(this.zg)
    im(this)
  }
  cm.prototype.ri = function (a) {
    if (a && a.dj) {
      var b = a.qa.key
      if (null == b)
        for (var c in this.sa) {
          var d = this.ka[c]
          'undefined' === typeof d && (d = null)
          var e = q.localStorage.getItem(c)
          e !== d && ((this.ka[c] = e), this.kf(c))
        }
      else if (0 == b.indexOf(this.Nh + this.qg) && this.sa[b]) {
        'undefined' !== typeof a.qa.ag ? fm(this, 'local').zb(this.zg) : im(this)
        if (this.ck)
          if (((c = q.localStorage.getItem(b)), (d = a.qa.newValue), d !== c))
            null !== d ? q.localStorage.setItem(b, d) : q.localStorage.removeItem(b)
          else if (this.ka[b] === d && 'undefined' === typeof a.qa.ag) return
        var f = this
        c = function () {
          if ('undefined' !== typeof a.qa.ag || f.ka[b] !== q.localStorage.getItem(b))
            (f.ka[b] = q.localStorage.getItem(b)), f.kf(b)
        }
        md &&
        zd &&
        10 == zd &&
        q.localStorage.getItem(b) !== a.qa.newValue &&
        a.qa.newValue !== a.qa.oldValue
          ? setTimeout(c, 10)
          : c()
      }
    } else y(a, v(this.kf, this))
  }
  cm.prototype.kf = function (a) {
    this.sa[a] &&
      y(this.sa[a], function (b) {
        b()
      })
  }
  var jm = function (a) {
      this.D = a
      this.o = em()
    },
    lm = function (a) {
      return a.o.get(km, a.D).then(function (b) {
        return Yh(b)
      })
    }
  jm.prototype.dc = function (a) {
    this.o.addListener(km, this.D, a)
  }
  jm.prototype.vd = function (a) {
    this.o.removeListener(km, this.D, a)
  }
  var km = { name: 'authEvent', M: 'local' },
    mm = { name: 'redirectEvent', M: 'session' }
  var nm = function () {
    this.o = em()
  }
  nm.prototype.oc = function (a) {
    return this.o.get(om, a)
  }
  var qm = function (a) {
      return a.o.get(pm).then(function (b) {
        b = b || {}
        return b.type && b.apiKey
          ? new Zh(
              b.apiKey,
              b.appName || '',
              b.type,
              b.eventId,
              b.redirectUrl,
              b.clientVersion,
              b.displayName,
              b.apn,
              b.ibi,
              b.eid,
              b.fw,
              b.clientId,
              b.sha1Cert,
              b.tenantId,
              b.providerId,
              b.appId,
              b.publicKey
            )
          : null
      })
    },
    rm = function (a, b, c) {
      return a.o.set(km, c.m(), b)
    },
    pm = { name: 'oauthHelperState', M: 'session' },
    om = { name: 'sessionId', M: 'session' }
  var sm = function () {
    this.Tf = null
    this.Ud = []
  }
  sm.prototype.subscribe = function (a) {
    var b = this
    this.Ud.push(a)
    this.Tf ||
      ((this.Tf = function (c) {
        for (var d = 0; d < b.Ud.length; d++) b.Ud[d](c)
      }),
      (a = M('universalLinks.subscribe', q)),
      'function' === typeof a && a(null, this.Tf))
  }
  sm.prototype.unsubscribe = function (a) {
    Ua(this.Ud, function (b) {
      return b == a
    })
  }
  var tm = null
  var um = function (a, b, c, d, e, f) {
      this.J = a
      this.A = b
      this.B = c
      this.s = f
      this.Qa = d || null
      this.pa = e || null
      this.si = b + ':' + c
      this.dk = new nm()
      this.qh = new jm(this.si)
      this.Mf = null
      this.Ya = []
      this.xj = 500
      this.Sj = 2e3
      this.fd = this.Ae = null
    },
    vm = function (a) {
      return new P('invalid-cordova-configuration', a)
    }
  um.prototype.Pb = function () {
    return this.gd
      ? this.gd
      : (this.gd = bh().then(
          function () {
            if ('function' !== typeof M('universalLinks.subscribe', q))
              throw vm('cordova-universal-links-plugin-fix is not installed')
            if ('undefined' === typeof M('BuildInfo.packageName', q))
              throw vm('cordova-plugin-buildinfo is not installed')
            if ('function' !== typeof M('cordova.plugins.browsertab.openUrl', q))
              throw vm('cordova-plugin-browsertab is not installed')
            if ('function' !== typeof M('cordova.InAppBrowser.open', q))
              throw vm('cordova-plugin-inappbrowser is not installed')
          },
          function () {
            throw new P('cordova-not-ready')
          }
        ))
  }
  var wm = function () {
      for (var a = 20, b = []; 0 < a; )
        b.push(
          '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(
            Math.floor(62 * Math.random())
          )
        ),
          a--
      return b.join('')
    },
    xm = function (a) {
      var b = new Be()
      b.update(a)
      return me(b.digest())
    }
  l = um.prototype
  l.Ad = function (a, b) {
    b(new P('operation-not-supported-in-this-environment'))
    return I()
  }
  l.pd = function () {
    return J(new P('operation-not-supported-in-this-environment'))
  }
  l.xi = function () {
    return !1
  }
  l.pi = function () {
    return !0
  }
  l.uh = function () {
    return !0
  }
  l.qd = function (a, b, c, d) {
    if (this.Ae) return J(new P('redirect-operation-pending'))
    var e = this,
      f = q.document,
      g = null,
      h = null,
      k = null,
      p = null
    return (this.Ae = I()
      .then(function () {
        ej(b)
        return ym(e)
      })
      .then(function () {
        return zm(e, a, b, c, d)
      })
      .then(function () {
        return new H(function (n, r) {
          h = function () {
            var t = M('cordova.plugins.browsertab.close', q)
            n()
            'function' === typeof t && t()
            e.fd && 'function' === typeof e.fd.close && (e.fd.close(), (e.fd = null))
            return !1
          }
          e.dc(h)
          k = function () {
            g ||
              (g = wg(e.Sj).then(function () {
                r(new P('redirect-cancelled-by-user'))
              }))
          }
          p = function () {
            zh() && k()
          }
          f.addEventListener('resume', k, !1)
          L()
            .toLowerCase()
            .match(/android/) || f.addEventListener('visibilitychange', p, !1)
        }).h(function (n) {
          return Am(e).then(function () {
            throw n
          })
        })
      })
      .Bb(function () {
        k && f.removeEventListener('resume', k, !1)
        p && f.removeEventListener('visibilitychange', p, !1)
        g && g.cancel()
        h && e.vd(h)
        e.Ae = null
      }))
  }
  var zm = function (a, b, c, d, e) {
    var f = wm(),
      g = new Xh(b, d, null, f, new P('no-auth-event'), null, e),
      h = M('BuildInfo.packageName', q)
    if ('string' !== typeof h) throw new P('invalid-cordova-configuration')
    var k = M('BuildInfo.displayName', q),
      p = {}
    if (
      L()
        .toLowerCase()
        .match(/iphone|ipad|ipod/)
    )
      p.ibi = h
    else if (
      L()
        .toLowerCase()
        .match(/android/)
    )
      p.apn = h
    else return J(new P('operation-not-supported-in-this-environment'))
    k && (p.appDisplayName = k)
    f = xm(f)
    p.sessionId = f
    var n = Lk(a.J, a.A, a.B, b, c, null, d, a.Qa, p, a.pa, e, a.s)
    return a
      .Pb()
      .then(function () {
        return rm(a.dk, a.si, g)
      })
      .then(function () {
        var r = M('cordova.plugins.browsertab.isAvailable', q)
        if ('function' !== typeof r) throw new P('invalid-cordova-configuration')
        var t = null
        r(function (z) {
          if (z) {
            t = M('cordova.plugins.browsertab.openUrl', q)
            if ('function' !== typeof t) throw new P('invalid-cordova-configuration')
            t(n)
          } else {
            t = M('cordova.InAppBrowser.open', q)
            if ('function' !== typeof t) throw new P('invalid-cordova-configuration')
            z = t
            var aa = L()
            aa = !(
              !aa.match(/(iPad|iPhone|iPod).*OS 7_\d/i) && !aa.match(/(iPad|iPhone|iPod).*OS 8_\d/i)
            )
            a.fd = z(n, aa ? '_blank' : '_system', 'location=yes')
          }
        })
      })
  }
  um.prototype.Vc = function (a) {
    for (var b = 0; b < this.Ya.length; b++)
      try {
        this.Ya[b](a)
      } catch (c) {}
  }
  var ym = function (a) {
      a.Mf ||
        (a.Mf = a.Pb().then(function () {
          return new H(function (b) {
            var c = function (d) {
              b(d)
              a.vd(c)
              return !1
            }
            a.dc(c)
            Bm(a)
          })
        }))
      return a.Mf
    },
    Am = function (a) {
      var b = null
      return lm(a.qh)
        .then(function (c) {
          b = c
          c = a.qh
          return c.o.remove(km, c.D)
        })
        .then(function () {
          return b
        })
    },
    Bm = function (a) {
      var b = new Xh('unknown', null, null, null, new P('no-auth-event')),
        c = !1,
        d = wg(a.xj).then(function () {
          return Am(a).then(function () {
            c || a.Vc(b)
          })
        }),
        e = function (g) {
          c = !0
          d && d.cancel()
          Am(a).then(function (h) {
            var k = b
            if (h && g && g.url) {
              var p = null
              k = ji(g.url)
              ;-1 != k.indexOf('/__/auth/callback') &&
                ((p = E(k)),
                (p = vh(D(p, 'firebaseError') || null)),
                (p = (p = 'object' === typeof p ? Wh(p) : null)
                  ? new Xh(h.getType(), h.T, null, null, p, null, h.C)
                  : new Xh(h.getType(), h.T, k, h.oc(), null, null, h.C)))
              k = p || b
            }
            a.Vc(k)
          })
        },
        f = q.handleOpenURL
      q.handleOpenURL = function (g) {
        0 == g.toLowerCase().indexOf(M('BuildInfo.packageName', q).toLowerCase() + '://') &&
          e({ url: g })
        if ('function' === typeof f)
          try {
            f(g)
          } catch (h) {
            console.error(h)
          }
      }
      tm || (tm = new sm())
      tm.subscribe(e)
    }
  um.prototype.dc = function (a) {
    this.Ya.push(a)
    ym(this).h(function (b) {
      'auth/invalid-cordova-configuration' === b.code &&
        ((b = new Xh('unknown', null, null, null, new P('no-auth-event'))), a(b))
    })
  }
  um.prototype.vd = function (a) {
    Ua(this.Ya, function (b) {
      return b == a
    })
  }
  var Cm = function (a) {
      this.D = a
      this.o = em()
    },
    Em = function (a) {
      return a.o.set(Dm, 'pending', a.D)
    },
    Fm = function (a) {
      return a.o.remove(Dm, a.D)
    },
    Gm = function (a) {
      return a.o.get(Dm, a.D).then(function (b) {
        return 'pending' == b
      })
    },
    Dm = { name: 'pendingRedirect', M: 'session' }
  var Lm = function (a, b, c, d) {
      this.Ee = {}
      this.Pf = 0
      this.J = a
      this.A = b
      this.B = c
      this.s = d
      this.Cd = []
      this.sc = !1
      this.ff = v(this.Gf, this)
      this.vb = new Hm(this)
      this.dg = new Im(this)
      this.nd = new Cm(Jm(this.A, this.B))
      this.Cb = {}
      this.Cb.unknown = this.vb
      this.Cb.signInViaRedirect = this.vb
      this.Cb.linkViaRedirect = this.vb
      this.Cb.reauthViaRedirect = this.vb
      this.Cb.signInViaPopup = this.dg
      this.Cb.linkViaPopup = this.dg
      this.Cb.reauthViaPopup = this.dg
      this.xa = Km(this.J, this.A, this.B, Kg, this.s)
    },
    Km = function (a, b, c, d, e) {
      var f = firebase.SDK_VERSION || null
      return ah() ? new um(a, b, c, f, d, e) : new Gk(a, b, c, f, d, e)
    }
  Lm.prototype.reset = function () {
    this.sc = !1
    this.xa.vd(this.ff)
    this.xa = Km(this.J, this.A, this.B, null, this.s)
    this.Ee = {}
  }
  Lm.prototype.ic = function () {
    this.vb.ic()
  }
  Lm.prototype.initialize = function () {
    var a = this
    this.sc || ((this.sc = !0), this.xa.dc(this.ff))
    var b = this.xa
    return this.xa.Pb().h(function (c) {
      a.xa == b && a.reset()
      throw c
    })
  }
  var Om = function (a) {
    a.xa.pi() &&
      a.initialize().h(function (b) {
        var c = new Xh(
          'unknown',
          null,
          null,
          null,
          new P('operation-not-supported-in-this-environment')
        )
        Mm(b) && a.Gf(c)
      })
    a.xa.uh() || Nm(a.vb)
  }
  l = Lm.prototype
  l.subscribe = function (a) {
    Ra(this.Cd, a) || this.Cd.push(a)
    if (!this.sc) {
      var b = this
      Gm(this.nd)
        .then(function (c) {
          c
            ? Fm(b.nd).then(function () {
                b.initialize().h(function (d) {
                  var e = new Xh(
                    'unknown',
                    null,
                    null,
                    null,
                    new P('operation-not-supported-in-this-environment')
                  )
                  Mm(d) && b.Gf(e)
                })
              })
            : Om(b)
        })
        .h(function () {
          Om(b)
        })
    }
  }
  l.unsubscribe = function (a) {
    Ua(this.Cd, function (b) {
      return b == a
    })
  }
  l.Gf = function (a) {
    if (!a) throw new P('invalid-auth-event')
    6e5 <= Date.now() - this.Pf && ((this.Ee = {}), (this.Pf = 0))
    if (a && a.getUid() && this.Ee.hasOwnProperty(a.getUid())) return !1
    for (var b = !1, c = 0; c < this.Cd.length; c++) {
      var d = this.Cd[c]
      if (d.Pg(a.getType(), a.T)) {
        if ((b = this.Cb[a.getType()]))
          b.Xh(a, d), a && (a.oc() || a.T) && ((this.Ee[a.getUid()] = !0), (this.Pf = Date.now()))
        b = !0
        break
      }
    }
    Nm(this.vb)
    return b
  }
  l.getRedirectResult = function () {
    return this.vb.getRedirectResult()
  }
  l.pd = function (a, b, c, d, e, f) {
    var g = this
    return this.xa.pd(
      a,
      b,
      c,
      function () {
        g.sc || ((g.sc = !0), g.xa.dc(g.ff))
      },
      function () {
        g.reset()
      },
      d,
      e,
      f
    )
  }
  var Mm = function (a) {
    return a && 'auth/cordova-not-ready' == a.code ? !0 : !1
  }
  Lm.prototype.qd = function (a, b, c, d) {
    var e = this,
      f
    return Em(this.nd).then(function () {
      return e.xa
        .qd(a, b, c, d)
        .h(function (g) {
          if (Mm(g)) throw new P('operation-not-supported-in-this-environment')
          f = g
          return Fm(e.nd).then(function () {
            throw f
          })
        })
        .then(function () {
          return e.xa.xi()
            ? new H(function () {})
            : Fm(e.nd)
                .then(function () {
                  return e.getRedirectResult()
                })
                .then(function () {})
                .h(function () {})
        })
    })
  }
  Lm.prototype.Ad = function (a, b, c, d) {
    return this.xa.Ad(
      c,
      function (e) {
        a.Wb(b, null, e, d)
      },
      Pm.get()
    )
  }
  var Jm = function (a, b, c) {
      a = a + ':' + b
      c && (a = a + ':' + c.url)
      return a
    },
    Rm = function (a, b, c, d) {
      var e = Jm(b, c, d)
      Qm[e] || (Qm[e] = new Lm(a, b, c, d))
      return Qm[e]
    },
    Pm = new yh(2e3, 1e4),
    Sm = new yh(3e4, 6e4),
    Qm = {},
    Hm = function (a) {
      this.o = a
      this.Ec = null
      this.td = []
      this.sd = []
      this.Cc = null
      this.yi = this.ud = !1
    }
  Hm.prototype.reset = function () {
    this.Ec = null
    this.Cc && (this.Cc.cancel(), (this.Cc = null))
  }
  Hm.prototype.Xh = function (a, b) {
    if (a) {
      this.reset()
      this.ud = !0
      var c = a.getType(),
        d = a.T,
        e = a.getError() && 'auth/web-storage-unsupported' == a.getError().code,
        f = a.getError() && 'auth/operation-not-supported-in-this-environment' == a.getError().code
      this.yi = !(!e && !f)
      'unknown' != c || e || f
        ? a.Y
          ? this.jg(a, b)
          : b.Zc(c, d)
          ? this.kg(a, b)
          : J(new P('invalid-auth-event'))
        : (Tm(this, !1, null, null), I())
    } else J(new P('invalid-auth-event'))
  }
  var Nm = function (a) {
    a.ud || ((a.ud = !0), Tm(a, !1, null, null))
  }
  Hm.prototype.ic = function () {
    this.ud && !this.yi && Tm(this, !1, null, null)
  }
  Hm.prototype.jg = function (a) {
    Tm(this, !0, null, a.getError())
    I()
  }
  Hm.prototype.kg = function (a, b) {
    var c = this,
      d = a.T,
      e = a.getType()
    b = b.Zc(e, d)
    d = a.Xa
    e = a.oc()
    var f = a.eg,
      g = a.C,
      h = !!a.getType().match(/Redirect$/)
    b(d, e, g, f)
      .then(function (k) {
        Tm(c, h, k, null)
      })
      .h(function (k) {
        Tm(c, h, null, k)
      })
  }
  var Um = function (a, b) {
      a.Ec = function () {
        return J(b)
      }
      if (a.sd.length) for (var c = 0; c < a.sd.length; c++) a.sd[c](b)
    },
    Vm = function (a, b) {
      a.Ec = function () {
        return I(b)
      }
      if (a.td.length) for (var c = 0; c < a.td.length; c++) a.td[c](b)
    },
    Tm = function (a, b, c, d) {
      b ? (d ? Um(a, d) : Vm(a, c)) : Vm(a, { user: null })
      a.td = []
      a.sd = []
    }
  Hm.prototype.getRedirectResult = function () {
    var a = this
    return new H(function (b, c) {
      a.Ec ? a.Ec().then(b, c) : (a.td.push(b), a.sd.push(c), Wm(a))
    })
  }
  var Wm = function (a) {
      var b = new P('timeout')
      a.Cc && a.Cc.cancel()
      a.Cc = wg(Sm.get()).then(function () {
        a.Ec || ((a.ud = !0), Tm(a, !0, null, b))
      })
    },
    Im = function (a) {
      this.o = a
    }
  Im.prototype.Xh = function (a, b) {
    if (a) {
      var c = a.getType(),
        d = a.T
      a.Y ? this.jg(a, b) : b.Zc(c, d) ? this.kg(a, b) : J(new P('invalid-auth-event'))
    } else J(new P('invalid-auth-event'))
  }
  Im.prototype.jg = function (a, b) {
    var c = a.T,
      d = a.getType()
    b.Wb(d, null, a.getError(), c)
    I()
  }
  Im.prototype.kg = function (a, b) {
    var c = a.T,
      d = a.getType(),
      e = b.Zc(d, c),
      f = a.Xa,
      g = a.oc()
    e(f, g, a.C, a.eg)
      .then(function (h) {
        b.Wb(d, h, null, c)
      })
      .h(function (h) {
        b.Wb(d, null, h, c)
      })
  }
  var Xm = function (a, b, c) {
    var d = b && b.mfaPendingCredential
    if (!d) throw new P('argument-error', 'Internal assert: Invalid MultiFactorResolver')
    this.Od = a
    this.Wi = Za(b)
    this.Lj = c
    this.ji = new qi(null, d)
    this.vh = []
    var e = this
    y(b.mfaInfo || [], function (f) {
      ;(f = bi(f)) && e.vh.push(f)
    })
    N(this, 'auth', this.Od)
    N(this, 'session', this.ji)
    N(this, 'hints', this.vh)
  }
  Xm.prototype.resolveSignIn = function (a) {
    var b = this
    return a.process(this.Od.i, this.ji).then(function (c) {
      var d = Za(b.Wi)
      delete d.mfaInfo
      delete d.mfaPendingCredential
      ab(d, c)
      return b.Lj(d)
    })
  }
  var Ym = function (a, b, c, d) {
    P.call(this, 'multi-factor-auth-required', d, b)
    this.Zj = new Xm(a, b, c)
    N(this, 'resolver', this.Zj)
  }
  m(Ym, P)
  var Zm = function (a, b, c) {
    if (a && u(a.serverResponse) && 'auth/multi-factor-auth-required' === a.code)
      try {
        return new Ym(b, a.serverResponse, c, a.message)
      } catch (d) {}
    return null
  }
  var $m = function () {}
  $m.prototype.process = function (a, b, c) {
    return 'enroll' == b.type ? an(this, a, b, c) : bn(this, a, b)
  }
  var an = function (a, b, c, d) {
      return c.bd().then(function (e) {
        e = { idToken: e }
        'undefined' !== typeof d && (e.displayName = d)
        ab(e, { phoneVerificationInfo: Vi(a.Vf) })
        return Q(b, ok, e)
      })
    },
    bn = function (a, b, c) {
      return c.bd().then(function (d) {
        d = { mfaPendingCredential: d }
        ab(d, { phoneVerificationInfo: Vi(a.Vf) })
        return Q(b, pk, d)
      })
    },
    cn = function (a) {
      N(this, 'factorId', a.providerId)
      this.Vf = a
    }
  w(cn, $m)
  var dn = function (a) {
    cn.call(this, a)
    if (this.Vf.providerId != Zi.PROVIDER_ID)
      throw new P(
        'argument-error',
        'firebase.auth.PhoneMultiFactorAssertion requires a valid firebase.auth.PhoneAuthCredential'
      )
  }
  w(dn, cn)
  var en = function (a, b) {
    G.call(this, a)
    for (var c in b) this[c] = b[c]
  }
  m(en, G)
  var gn = function (a, b) {
      this.kb = a
      this.Yd = []
      this.zk = v(this.rj, this)
      Re(this.kb, 'userReloaded', this.zk)
      var c = []
      b &&
        b.multiFactor &&
        b.multiFactor.enrolledFactors &&
        y(b.multiFactor.enrolledFactors, function (d) {
          var e = null,
            f = {}
          if (d) {
            d.uid && (f.mfaEnrollmentId = d.uid)
            d.displayName && (f.displayName = d.displayName)
            d.enrollmentTime && (f.enrolledAt = new Date(d.enrollmentTime).toISOString())
            d.phoneNumber && (f.phoneInfo = d.phoneNumber)
            try {
              e = new ai(f)
            } catch (g) {}
            d = e
          } else d = null
          d && c.push(d)
        })
      fn(this, c)
    },
    hn = function (a) {
      var b = []
      y(a.mfaInfo || [], function (c) {
        ;(c = bi(c)) && b.push(c)
      })
      return b
    }
  gn.prototype.rj = function (a) {
    fn(this, hn(a.Ak))
  }
  var fn = function (a, b) {
    a.Yd = b
    N(a, 'enrolledFactors', b)
  }
  l = gn.prototype
  l.copy = function (a) {
    fn(this, a.Yd)
  }
  l.getSession = function () {
    return this.kb.getIdToken().then(function (a) {
      return new qi(a, null)
    })
  }
  l.enroll = function (a, b) {
    var c = this,
      d = this.kb.i
    return this.getSession()
      .then(function (e) {
        return a.process(d, e, b)
      })
      .then(function (e) {
        jn(c.kb, e)
        return c.kb.reload()
      })
  }
  l.unenroll = function (a) {
    var b = this,
      c = 'string' === typeof a ? a : a.uid,
      d = this.kb.i
    return this.kb
      .getIdToken()
      .then(function (e) {
        return Q(d, uk, { idToken: e, mfaEnrollmentId: c })
      })
      .then(function (e) {
        var f = Oa(b.Yd, function (g) {
          return g.uid != c
        })
        fn(b, f)
        jn(b.kb, e)
        return b.kb.reload().h(function (g) {
          if ('auth/user-token-expired' != g.code) throw g
        })
      })
  }
  l.m = function () {
    return {
      multiFactor: {
        enrolledFactors: Pa(this.Yd, function (a) {
          return a.m()
        }),
      },
    }
  }
  var kn = function (a) {
    this.i = a
    this.na = this.la = null
    this.kc = Date.now()
  }
  kn.prototype.m = function () {
    return {
      apiKey: this.i.A,
      refreshToken: this.la,
      accessToken: this.na && this.na.toString(),
      expirationTime: this.kc,
    }
  }
  var ln = function (a, b) {
      'undefined' === typeof b && (a.na ? ((b = a.na), (b = b.zf - b.tj)) : (b = 0))
      a.kc = Date.now() + 1e3 * b
    },
    mn = function (a, b) {
      a.na = oi(b.idToken || '')
      a.la = b.refreshToken
      b = b.expiresIn
      ln(a, 'undefined' !== typeof b ? Number(b) : void 0)
    }
  kn.prototype.copy = function (a) {
    this.na = a.na
    this.la = a.la
    this.kc = a.kc
  }
  var nn = function (a, b) {
    return xj(a.i, b)
      .then(function (c) {
        a.na = oi(c.access_token)
        a.la = c.refresh_token
        ln(a, c.expires_in)
        return { accessToken: a.na.toString(), refreshToken: a.la }
      })
      .h(function (c) {
        'auth/user-token-expired' == c.code && (a.la = null)
        throw c
      })
  }
  kn.prototype.getToken = function (a) {
    a = !!a
    return this.na && !this.la
      ? J(new P('user-token-expired'))
      : a || !this.na || Date.now() > this.kc - 3e4
      ? this.la
        ? nn(this, { grant_type: 'refresh_token', refresh_token: this.la })
        : I(null)
      : I({ accessToken: this.na.toString(), refreshToken: this.la })
  }
  var on = function (a, b) {
    this.Zg = a || null
    this.Hh = b || null
    O(this, { lastSignInTime: Ch(b || null), creationTime: Ch(a || null) })
  }
  on.prototype.clone = function () {
    return new on(this.Zg, this.Hh)
  }
  on.prototype.m = function () {
    return { lastLoginAt: this.Hh, createdAt: this.Zg }
  }
  var pn = function (a, b, c, d, e, f) {
      O(this, {
        uid: a,
        displayName: d || null,
        photoURL: e || null,
        email: c || null,
        phoneNumber: f || null,
        providerId: b,
      })
    },
    R = function (a, b, c) {
      bf.call(this)
      this.Z = []
      this.A = a.apiKey
      this.B = a.appName
      this.J = a.authDomain || null
      var d = firebase.SDK_VERSION ? kh('JsCore', firebase.SDK_VERSION) : null
      this.i = new mj(this.A, Jg(Kg), d)
      ;(this.s = a.emulatorConfig || null) && qj(this.i, this.s)
      this.La = new kn(this.i)
      qn(this, b.idToken)
      mn(this.La, b)
      N(this, 'refreshToken', this.La.la)
      rn(this, c || {})
      this.od = !1
      this.J && oh() && (this.v = Rm(this.J, this.A, this.B, this.s))
      this.Ne = []
      this.Ma = null
      this.zc = sn(this)
      this.Lc = v(this.If, this)
      var e = this
      this.Ga = null
      this.Sh = function (f) {
        e.Gc(f.languageCode)
      }
      this.Nf = null
      this.Qh = function (f) {
        tn(e, f.emulatorConfig)
      }
      this.uf = null
      this.U = []
      this.Rh = function (f) {
        un(e, f.Yc)
      }
      this.Df = null
      this.ue = new gn(this, c)
      N(this, 'multiFactor', this.ue)
    }
  m(R, bf)
  R.prototype.Gc = function (a) {
    this.Ga = a
    oj(this.i, a)
  }
  var tn = function (a, b) {
      a.s = b
      qj(a.i, b)
      a.v &&
        ((b = a.v), (a.v = Rm(a.J, a.A, a.B, a.s)), a.od && (b.unsubscribe(a), a.v.subscribe(a)))
    },
    vn = function (a, b) {
      a.Nf && Ze(a.Nf, 'languageCodeChanged', a.Sh)
      ;(a.Nf = b) && Re(b, 'languageCodeChanged', a.Sh)
    },
    wn = function (a, b) {
      a.uf && Ze(a.uf, 'emulatorConfigChanged', a.Qh)
      ;(a.uf = b) && Re(b, 'emulatorConfigChanged', a.Qh)
    },
    un = function (a, b) {
      a.U = b
      rj(a.i, firebase.SDK_VERSION ? kh('JsCore', firebase.SDK_VERSION, a.U) : null)
    },
    xn = function (a, b) {
      a.Df && Ze(a.Df, 'frameworkChanged', a.Rh)
      ;(a.Df = b) && Re(b, 'frameworkChanged', a.Rh)
    }
  R.prototype.If = function () {
    this.zc.wc && (this.zc.stop(), this.zc.start())
  }
  var yn = function (a) {
      try {
        return firebase.app(a.B).auth()
      } catch (b) {
        throw new P(
          'internal-error',
          "No firebase.auth.Auth instance is available for the Firebase App '" + a.B + "'!"
        )
      }
    },
    sn = function (a) {
      return new Rl(
        function () {
          return a.getIdToken(!0)
        },
        function (b) {
          return b && 'auth/network-request-failed' == b.code ? !0 : !1
        },
        function () {
          var b = a.La.kc - Date.now() - 3e5
          return 0 < b ? b : 0
        }
      )
    },
    zn = function (a) {
      a.Uc || a.zc.wc || (a.zc.start(), Ze(a, 'tokenChanged', a.Lc), Re(a, 'tokenChanged', a.Lc))
    },
    An = function (a) {
      Ze(a, 'tokenChanged', a.Lc)
      a.zc.stop()
    },
    qn = function (a, b) {
      a.Gh = b
      N(a, '_lat', b)
    },
    Bn = function (a, b) {
      Ua(a.Ne, function (c) {
        return c == b
      })
    },
    Cn = function (a) {
      for (var b = [], c = 0; c < a.Ne.length; c++) b.push(a.Ne[c](a))
      return Rf(b).then(function () {
        return a
      })
    },
    Dn = function (a) {
      a.v && !a.od && ((a.od = !0), a.v.subscribe(a))
    },
    rn = function (a, b) {
      O(a, {
        uid: b.uid,
        displayName: b.displayName || null,
        photoURL: b.photoURL || null,
        email: b.email || null,
        emailVerified: b.emailVerified || !1,
        phoneNumber: b.phoneNumber || null,
        isAnonymous: b.isAnonymous || !1,
        tenantId: b.tenantId || null,
        metadata: new on(b.createdAt, b.lastLoginAt),
        providerData: [],
      })
      a.i.C = a.tenantId
    },
    En = function () {},
    Fn = function (a) {
      return I().then(function () {
        if (a.Uc) throw new P('app-deleted')
      })
    },
    Gn = function (a) {
      return Pa(a.providerData, function (b) {
        return b.providerId
      })
    },
    In = function (a, b) {
      b && (Hn(a, b.providerId), a.providerData.push(b))
    },
    Hn = function (a, b) {
      Ua(a.providerData, function (c) {
        return c.providerId == b
      })
    },
    Jn = function (a, b, c) {
      ;('uid' != b || c) && a.hasOwnProperty(b) && N(a, b, c)
    }
  R.prototype.copy = function (a) {
    var b = this
    b != a &&
      (O(this, {
        uid: a.uid,
        displayName: a.displayName,
        photoURL: a.photoURL,
        email: a.email,
        emailVerified: a.emailVerified,
        phoneNumber: a.phoneNumber,
        isAnonymous: a.isAnonymous,
        tenantId: a.tenantId,
        providerData: [],
      }),
      a.metadata ? N(this, 'metadata', a.metadata.clone()) : N(this, 'metadata', new on()),
      y(a.providerData, function (c) {
        In(b, c)
      }),
      this.La.copy(a.La),
      N(this, 'refreshToken', this.La.la),
      this.ue.copy(a.ue))
  }
  R.prototype.reload = function () {
    var a = this
    return this.l(
      Fn(this).then(function () {
        return Kn(a)
          .then(function () {
            return Cn(a)
          })
          .then(En)
      })
    )
  }
  var Kn = function (a) {
    return a.getIdToken().then(function (b) {
      var c = a.isAnonymous
      return Q(a.i, qk, { idToken: b })
        .then(v(a.Pj, a))
        .then(function () {
          c || Jn(a, 'isAnonymous', !1)
          return b
        })
    })
  }
  R.prototype.getIdTokenResult = function (a) {
    return this.getIdToken(a).then(function (b) {
      return new pi(b)
    })
  }
  R.prototype.getIdToken = function (a) {
    var b = this
    return this.l(
      Fn(this)
        .then(function () {
          return b.La.getToken(a)
        })
        .then(function (c) {
          if (!c) throw new P('internal-error')
          c.accessToken != b.Gh && (qn(b, c.accessToken), b.ub())
          Jn(b, 'refreshToken', c.refreshToken)
          return c.accessToken
        })
    )
  }
  var jn = function (a, b) {
    b.idToken &&
      a.Gh != b.idToken &&
      (mn(a.La, b), a.ub(), qn(a, b.idToken), Jn(a, 'refreshToken', a.La.la))
  }
  R.prototype.ub = function () {
    this.dispatchEvent(new en('tokenChanged'))
  }
  R.prototype.Pj = function (a) {
    a = a.users
    if (!a || !a.length) throw new P('internal-error')
    a = a[0]
    rn(this, {
      uid: a.localId,
      displayName: a.displayName,
      photoURL: a.photoUrl,
      email: a.email,
      emailVerified: !!a.emailVerified,
      phoneNumber: a.phoneNumber,
      lastLoginAt: a.lastLoginAt,
      createdAt: a.createdAt,
      tenantId: a.tenantId,
    })
    for (var b = Ln(a), c = 0; c < b.length; c++) In(this, b[c])
    Jn(
      this,
      'isAnonymous',
      !(this.email && a.passwordHash) && !(this.providerData && this.providerData.length)
    )
    this.dispatchEvent(new en('userReloaded', { Ak: a }))
  }
  var Ln = function (a) {
    return (a = a.providerUserInfo) && a.length
      ? Pa(a, function (b) {
          return new pn(b.rawId, b.providerId, b.email, b.displayName, b.photoUrl, b.phoneNumber)
        })
      : []
  }
  R.prototype.reauthenticateAndRetrieveDataWithCredential = function (a) {
    Jh(
      'firebase.User.prototype.reauthenticateAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.reauthenticateWithCredential instead.'
    )
    return this.reauthenticateWithCredential(a)
  }
  R.prototype.reauthenticateWithCredential = function (a) {
    var b = this,
      c = null
    return this.l(
      a
        .kd(this.i, this.uid)
        .then(function (d) {
          jn(b, d)
          c = Mn(b, d, 'reauthenticate')
          b.Ma = null
          return b.reload()
        })
        .then(function () {
          return c
        }),
      !0
    )
  }
  var Nn = function (a, b) {
    return Kn(a).then(function () {
      if (Ra(Gn(a), b))
        return Cn(a).then(function () {
          throw new P('provider-already-linked')
        })
    })
  }
  R.prototype.linkAndRetrieveDataWithCredential = function (a) {
    Jh(
      'firebase.User.prototype.linkAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.linkWithCredential instead.'
    )
    return this.linkWithCredential(a)
  }
  R.prototype.linkWithCredential = function (a) {
    var b = this,
      c = null
    return this.l(
      Nn(this, a.providerId)
        .then(function () {
          return b.getIdToken()
        })
        .then(function (d) {
          return a.tc(b.i, d)
        })
        .then(function (d) {
          c = Mn(b, d, 'link')
          return On(b, d)
        })
        .then(function () {
          return c
        })
    )
  }
  R.prototype.linkWithPhoneNumber = function (a, b) {
    var c = this
    return this.l(
      Nn(this, 'phone').then(function () {
        return Ql(yn(c), a, b, v(c.linkWithCredential, c))
      })
    )
  }
  R.prototype.reauthenticateWithPhoneNumber = function (a, b) {
    var c = this
    return this.l(
      I().then(function () {
        return Ql(yn(c), a, b, v(c.reauthenticateWithCredential, c))
      }),
      !0
    )
  }
  var Mn = function (a, b, c) {
      var d = dj(b)
      b = $l(b)
      return Mh({ user: a, credential: d, additionalUserInfo: b, operationType: c })
    },
    On = function (a, b) {
      jn(a, b)
      return a.reload().then(function () {
        return a
      })
    }
  l = R.prototype
  l.updateEmail = function (a) {
    var b = this
    return this.l(
      this.getIdToken()
        .then(function (c) {
          return b.i.updateEmail(c, a)
        })
        .then(function (c) {
          jn(b, c)
          return b.reload()
        })
    )
  }
  l.updatePhoneNumber = function (a) {
    var b = this
    return this.l(
      this.getIdToken()
        .then(function (c) {
          return a.tc(b.i, c)
        })
        .then(function (c) {
          jn(b, c)
          return b.reload()
        })
    )
  }
  l.updatePassword = function (a) {
    var b = this
    return this.l(
      this.getIdToken()
        .then(function (c) {
          return b.i.updatePassword(c, a)
        })
        .then(function (c) {
          jn(b, c)
          return b.reload()
        })
    )
  }
  l.updateProfile = function (a) {
    if (void 0 === a.displayName && void 0 === a.photoURL) return Fn(this)
    var b = this
    return this.l(
      this.getIdToken()
        .then(function (c) {
          return b.i.updateProfile(c, { displayName: a.displayName, photoUrl: a.photoURL })
        })
        .then(function (c) {
          jn(b, c)
          Jn(b, 'displayName', c.displayName || null)
          Jn(b, 'photoURL', c.photoUrl || null)
          y(b.providerData, function (d) {
            'password' === d.providerId &&
              (N(d, 'displayName', b.displayName), N(d, 'photoURL', b.photoURL))
          })
          return Cn(b)
        })
        .then(En)
    )
  }
  l.unlink = function (a) {
    var b = this
    return this.l(
      Kn(this).then(function (c) {
        return Ra(Gn(b), a)
          ? ak(b.i, c, [a]).then(function (d) {
              var e = {}
              y(d.providerUserInfo || [], function (f) {
                e[f.providerId] = !0
              })
              y(Gn(b), function (f) {
                e[f] || Hn(b, f)
              })
              e[Zi.PROVIDER_ID] || N(b, 'phoneNumber', null)
              return Cn(b)
            })
          : Cn(b).then(function () {
              throw new P('no-such-provider')
            })
      })
    )
  }
  l.delete = function () {
    var a = this
    return this.l(
      this.getIdToken()
        .then(function (b) {
          return Q(a.i, nk, { idToken: b })
        })
        .then(function () {
          a.dispatchEvent(new en('userDeleted'))
        })
    ).then(function () {
      for (var b = 0; b < a.Z.length; b++) a.Z[b].cancel('app-deleted')
      vn(a, null)
      wn(a, null)
      xn(a, null)
      a.Z = []
      a.Uc = !0
      An(a)
      N(a, 'refreshToken', null)
      a.v && a.v.unsubscribe(a)
    })
  }
  l.Pg = function (a, b) {
    return ('linkViaPopup' == a && (this.Ia || null) == b && this.Ha) ||
      ('reauthViaPopup' == a && (this.Ia || null) == b && this.Ha) ||
      ('linkViaRedirect' == a && (this.wb || null) == b) ||
      ('reauthViaRedirect' == a && (this.wb || null) == b)
      ? !0
      : !1
  }
  l.Wb = function (a, b, c, d) {
    ;('linkViaPopup' != a && 'reauthViaPopup' != a) ||
      d != (this.Ia || null) ||
      (c && this.Tb ? this.Tb(c) : b && !c && this.Ha && this.Ha(b),
      this.aa && (this.aa.cancel(), (this.aa = null)),
      delete this.Ha,
      delete this.Tb)
  }
  l.Zc = function (a, b) {
    return 'linkViaPopup' == a && b == (this.Ia || null)
      ? v(this.kh, this)
      : 'reauthViaPopup' == a && b == (this.Ia || null)
      ? v(this.lh, this)
      : 'linkViaRedirect' == a && (this.wb || null) == b
      ? v(this.kh, this)
      : 'reauthViaRedirect' == a && (this.wb || null) == b
      ? v(this.lh, this)
      : null
  }
  l.be = function () {
    return lh(this.uid + ':::')
  }
  l.linkWithPopup = function (a) {
    var b = this
    return Pn(
      this,
      'linkViaPopup',
      a,
      function () {
        return Nn(b, a.providerId).then(function () {
          return Cn(b)
        })
      },
      !1
    )
  }
  l.reauthenticateWithPopup = function (a) {
    return Pn(
      this,
      'reauthViaPopup',
      a,
      function () {
        return I()
      },
      !0
    )
  }
  var Pn = function (a, b, c, d, e) {
    if (!oh()) return J(new P('operation-not-supported-in-this-environment'))
    if (a.Ma && !e) return J(a.Ma)
    var f = Sh(c.providerId),
      g = a.be(),
      h = null
    ;(!ph() || dh()) &&
      a.J &&
      c.isOAuthProvider &&
      (h = Lk(
        a.J,
        a.A,
        a.B,
        b,
        c,
        null,
        g,
        firebase.SDK_VERSION || null,
        null,
        null,
        a.tenantId,
        a.s
      ))
    var k = Ug(h, f && f.yc, f && f.xc)
    d = d()
      .then(function () {
        Qn(a)
        if (!e) return a.getIdToken().then(function () {})
      })
      .then(function () {
        return a.v.pd(k, b, c, g, !!h, a.tenantId)
      })
      .then(function () {
        return new H(function (p, n) {
          a.Wb(b, null, new P('cancelled-popup-request'), a.Ia || null)
          a.Ha = p
          a.Tb = n
          a.Ia = g
          a.aa = a.v.Ad(a, b, k, g)
        })
      })
      .then(function (p) {
        k && Tg(k)
        return p ? Mh(p) : null
      })
      .h(function (p) {
        k && Tg(k)
        throw p
      })
    return a.l(d, e)
  }
  R.prototype.linkWithRedirect = function (a) {
    var b = this
    return Rn(
      this,
      'linkViaRedirect',
      a,
      function () {
        return Nn(b, a.providerId)
      },
      !1
    )
  }
  R.prototype.reauthenticateWithRedirect = function (a) {
    return Rn(
      this,
      'reauthViaRedirect',
      a,
      function () {
        return I()
      },
      !0
    )
  }
  var Rn = function (a, b, c, d, e) {
      if (!oh()) return J(new P('operation-not-supported-in-this-environment'))
      if (a.Ma && !e) return J(a.Ma)
      var f = null,
        g = a.be()
      d = d()
        .then(function () {
          Qn(a)
          if (!e) return a.getIdToken().then(function () {})
        })
        .then(function () {
          a.wb = g
          return Cn(a)
        })
        .then(function (h) {
          a.xb && ((h = a.xb), (h = h.o.set(Sn, a.m(), h.D)))
          return h
        })
        .then(function () {
          return a.v.qd(b, c, g, a.tenantId)
        })
        .h(function (h) {
          f = h
          if (a.xb) return Tn(a.xb)
          throw f
        })
        .then(function () {
          if (f) throw f
        })
      return a.l(d, e)
    },
    Qn = function (a) {
      if (!a.v || !a.od) {
        if (a.v && !a.od) throw new P('internal-error')
        throw new P('auth-domain-config-required')
      }
    }
  l = R.prototype
  l.kh = function (a, b, c, d) {
    var e = this
    this.aa && (this.aa.cancel(), (this.aa = null))
    var f = null
    c = this.getIdToken()
      .then(function (g) {
        return vi(e.i, { requestUri: a, postBody: d, sessionId: b, idToken: g })
      })
      .then(function (g) {
        f = Mn(e, g, 'link')
        return On(e, g)
      })
      .then(function () {
        return f
      })
    return this.l(c)
  }
  l.lh = function (a, b, c, d) {
    var e = this
    this.aa && (this.aa.cancel(), (this.aa = null))
    var f = null,
      g = I()
        .then(function () {
          return si(wi(e.i, { requestUri: a, sessionId: b, postBody: d, tenantId: c }), e.uid)
        })
        .then(function (h) {
          f = Mn(e, h, 'reauthenticate')
          jn(e, h)
          e.Ma = null
          return e.reload()
        })
        .then(function () {
          return f
        })
    return this.l(g, !0)
  }
  l.sendEmailVerification = function (a) {
    var b = this,
      c = null
    return this.l(
      this.getIdToken()
        .then(function (d) {
          c = d
          return 'undefined' === typeof a || Ya(a) ? {} : Ol(new Nl(a))
        })
        .then(function (d) {
          return b.i.sendEmailVerification(c, d)
        })
        .then(function (d) {
          if (b.email != d) return b.reload()
        })
        .then(function () {})
    )
  }
  l.verifyBeforeUpdateEmail = function (a, b) {
    var c = this,
      d = null
    return this.l(
      this.getIdToken()
        .then(function (e) {
          d = e
          return 'undefined' === typeof b || Ya(b) ? {} : Ol(new Nl(b))
        })
        .then(function (e) {
          return c.i.verifyBeforeUpdateEmail(d, a, e)
        })
        .then(function (e) {
          if (c.email != e) return c.reload()
        })
        .then(function () {})
    )
  }
  l.l = function (a, b) {
    var c = this,
      d = Un(this, a, b)
    this.Z.push(d)
    d.Bb(function () {
      Sa(c.Z, d)
    })
    return d.h(function (e) {
      var f = null
      e && 'auth/multi-factor-auth-required' === e.code && (f = Zm(e.m(), yn(c), v(c.Hf, c)))
      throw f || e
    })
  }
  l.Hf = function (a) {
    var b = null,
      c = this
    a = si(I(a), c.uid)
      .then(function (d) {
        b = Mn(c, d, 'reauthenticate')
        jn(c, d)
        c.Ma = null
        return c.reload()
      })
      .then(function () {
        return b
      })
    return this.l(a, !0)
  }
  var Un = function (a, b, c) {
    return a.Ma && !c
      ? (b.cancel(), J(a.Ma))
      : b.h(function (d) {
          !d ||
            ('auth/user-disabled' != d.code && 'auth/user-token-expired' != d.code) ||
            (a.Ma || a.dispatchEvent(new en('userInvalidated')), (a.Ma = d))
          throw d
        })
  }
  R.prototype.toJSON = function () {
    return this.m()
  }
  R.prototype.m = function () {
    var a = {
      uid: this.uid,
      displayName: this.displayName,
      photoURL: this.photoURL,
      email: this.email,
      emailVerified: this.emailVerified,
      phoneNumber: this.phoneNumber,
      isAnonymous: this.isAnonymous,
      tenantId: this.tenantId,
      providerData: [],
      apiKey: this.A,
      appName: this.B,
      authDomain: this.J,
      stsTokenManager: this.La.m(),
      redirectEventId: this.wb || null,
    }
    this.metadata && ab(a, this.metadata.m())
    y(this.providerData, function (b) {
      var c = a.providerData,
        d = c.push,
        e = {},
        f
      for (f in b) b.hasOwnProperty(f) && (e[f] = b[f])
      d.call(c, e)
    })
    ab(a, this.ue.m())
    return a
  }
  var Vn = function (a) {
      if (!a.apiKey) return null
      var b = {
          apiKey: a.apiKey,
          authDomain: a.authDomain,
          appName: a.appName,
          emulatorConfig: a.emulatorConfig,
        },
        c = {}
      if (a.stsTokenManager && a.stsTokenManager.accessToken) {
        c.idToken = a.stsTokenManager.accessToken
        c.refreshToken = a.stsTokenManager.refreshToken || null
        var d = a.stsTokenManager.expirationTime
        d && (c.expiresIn = (d - Date.now()) / 1e3)
      } else return null
      var e = new R(b, c, a)
      a.providerData &&
        y(a.providerData, function (f) {
          f && In(e, Mh(f))
        })
      a.redirectEventId && (e.wb = a.redirectEventId)
      return e
    },
    Wn = function (a, b, c, d) {
      var e = new R(a, b)
      c && (e.xb = c)
      d && un(e, d)
      return e.reload().then(function () {
        return e
      })
    },
    Xn = function (a, b, c, d) {
      b = b || { apiKey: a.A, authDomain: a.J, appName: a.B }
      var e = a.La,
        f = {}
      f.idToken = e.na && e.na.toString()
      f.refreshToken = e.la
      b = new R(b, f)
      c && (b.xb = c)
      d && un(b, d)
      b.copy(a)
      return b
    }
  N(R.prototype, 'providerId', 'firebase')
  var Yn = function (a) {
      this.D = a
      this.o = em()
    },
    Tn = function (a) {
      return a.o.remove(Sn, a.D)
    },
    Zn = function (a, b) {
      return a.o.get(Sn, a.D).then(function (c) {
        c && b && (c.authDomain = b)
        return Vn(c || {})
      })
    },
    Sn = { name: 'redirectUser', M: 'session' }
  var ao = function (a) {
    this.D = a
    this.o = em()
    this.oa = null
    this.Yf = this.cb()
    this.o.addListener($n('local'), this.D, v(this.pk, this))
  }
  ao.prototype.pk = function () {
    var a = this,
      b = $n('local')
    bo(this, function () {
      return I()
        .then(function () {
          return a.oa && 'local' != a.oa.M ? a.o.get(b, a.D) : null
        })
        .then(function (c) {
          if (c)
            return co(a, 'local').then(function () {
              a.oa = b
            })
        })
    })
  }
  var co = function (a, b) {
    var c = [],
      d
    for (d in am) am[d] !== b && c.push(a.o.remove($n(am[d]), a.D))
    c.push(a.o.remove(eo, a.D))
    return Qf(c)
  }
  ao.prototype.cb = function () {
    var a = this,
      b = $n('local'),
      c = $n('session'),
      d = $n('none')
    return gm(this.o, b, this.D)
      .then(function () {
        return a.o.get(c, a.D)
      })
      .then(function (e) {
        return e
          ? c
          : a.o.get(d, a.D).then(function (f) {
              return f
                ? d
                : a.o.get(b, a.D).then(function (g) {
                    return g
                      ? b
                      : a.o.get(eo, a.D).then(function (h) {
                          return h ? $n(h) : b
                        })
                  })
            })
      })
      .then(function (e) {
        a.oa = e
        return co(a, e.M)
      })
      .h(function () {
        a.oa || (a.oa = b)
      })
  }
  var $n = function (a) {
    return { name: 'authUser', M: a }
  }
  ao.prototype.setPersistence = function (a) {
    var b = null,
      c = this
    bm(a)
    return bo(this, function () {
      return a != c.oa.M
        ? c.o
            .get(c.oa, c.D)
            .then(function (d) {
              b = d
              return co(c, a)
            })
            .then(function () {
              c.oa = $n(a)
              if (b) return c.o.set(c.oa, b, c.D)
            })
        : I()
    })
  }
  var fo = function (a) {
      return bo(a, function () {
        return a.o.set(eo, a.oa.M, a.D)
      })
    },
    go = function (a, b) {
      return bo(a, function () {
        return a.o.set(a.oa, b.m(), a.D)
      })
    },
    ho = function (a) {
      return bo(a, function () {
        return a.o.remove(a.oa, a.D)
      })
    },
    io = function (a, b, c) {
      return bo(a, function () {
        return a.o.get(a.oa, a.D).then(function (d) {
          d && b && (d.authDomain = b)
          d && c && (d.emulatorConfig = c)
          return Vn(d || {})
        })
      })
    },
    bo = function (a, b) {
      a.Yf = a.Yf.then(b, b)
      return a.Yf
    },
    eo = { name: 'persistence', M: 'session' }
  var S = function (a) {
    bf.call(this)
    this.Aa = !1
    this.li = new Ml()
    N(this, 'settings', this.li)
    N(this, 'app', a)
    if (this.u().options && this.u().options.apiKey)
      (a = firebase.SDK_VERSION ? kh('JsCore', firebase.SDK_VERSION) : null),
        (this.i = new mj(this.u().options && this.u().options.apiKey, Jg(Kg), a))
    else throw new P('invalid-api-key')
    this.Z = []
    this.Eb = []
    this.Kc = []
    this.Kj = firebase.INTERNAL.createSubscribe(v(this.vj, this))
    this.Hd = void 0
    this.Nj = firebase.INTERNAL.createSubscribe(v(this.wj, this))
    jo(this, null)
    this.Na = new ao(this.pc())
    this.Vb = new Yn(this.pc())
    this.Nd = this.l(ko(this))
    this.Ja = this.l(lo(this))
    this.pe = !1
    this.Ff = v(this.qk, this)
    this.Ei = v(this.rb, this)
    this.Lc = v(this.If, this)
    this.Ci = v(this.pj, this)
    this.Di = v(this.qj, this)
    this.v = null
    mo(this)
    this.INTERNAL = {}
    this.INTERNAL['delete'] = v(this.delete, this)
    this.INTERNAL.logFramework = v(this.Gj, this)
    this.Mb = 0
    no(this)
    this.U = []
    this.s = null
  }
  m(S, bf)
  S.prototype.setPersistence = function (a) {
    a = this.Na.setPersistence(a)
    return this.l(a)
  }
  S.prototype.Gc = function (a) {
    this.Ga === a ||
      this.Aa ||
      ((this.Ga = a), oj(this.i, this.Ga), this.dispatchEvent(new oo(this.Ga)))
  }
  S.prototype.useDeviceLanguage = function () {
    var a = q.navigator
    this.Gc(a ? (a.languages && a.languages[0]) || a.language || a.userLanguage || null : null)
  }
  S.prototype.useEmulator = function (a, b) {
    if (!this.s) {
      if (this.v)
        throw new P(
          'argument-error',
          'useEmulator() must be called immediately following firebase.auth() initialization.'
        )
      b = b ? !!b.disableWarnings : !1
      po(b)
      this.s = { url: a, disableWarnings: b }
      this.li.df = !0
      qj(this.i, this.s)
      this.dispatchEvent(new qo(this.s))
    }
  }
  var po = function (a) {
    'undefined' !== typeof console &&
      'function' === typeof console.info &&
      console.info(
        'WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.'
      )
    q.document &&
      !a &&
      $g().then(function () {
        var b = q.document.createElement('p')
        b.innerText = 'Running in emulator mode. Do not use with production credentials.'
        b.style.position = 'fixed'
        b.style.width = '100%'
        b.style.backgroundColor = '#ffffff'
        b.style.border = '.1em solid #000000'
        b.style.color = '#b50000'
        b.style.bottom = '0px'
        b.style.left = '0px'
        b.style.margin = '0px'
        b.style.zIndex = 1e4
        b.style.textAlign = 'center'
        b.classList.add('firebase-emulator-warning')
        q.document.body.appendChild(b)
      })
  }
  S.prototype.Gj = function (a) {
    this.U.push(a)
    rj(this.i, firebase.SDK_VERSION ? kh('JsCore', firebase.SDK_VERSION, this.U) : null)
    this.dispatchEvent(new ro(this.U))
  }
  S.prototype.vg = function (a) {
    this.C === a || this.Aa || ((this.C = a), (this.i.C = this.C))
  }
  var no = function (a) {
    Object.defineProperty(a, 'lc', {
      get: function () {
        return this.Ga
      },
      set: function (b) {
        this.Gc(b)
      },
      enumerable: !1,
    })
    a.Ga = null
    Object.defineProperty(a, 'ti', {
      get: function () {
        return this.C
      },
      set: function (b) {
        this.vg(b)
      },
      enumerable: !1,
    })
    a.C = null
    Object.defineProperty(a, 'emulatorConfig', {
      get: function () {
        if (this.s) {
          var b = E(this.s.url)
          b = Mh({
            protocol: b.ua,
            host: b.ga,
            port: b.Ua,
            options: Mh({ disableWarnings: this.s.disableWarnings }),
          })
        } else b = null
        return b
      },
      enumerable: !1,
    })
  }
  S.prototype.toJSON = function () {
    return {
      apiKey: this.u().options.apiKey,
      authDomain: this.u().options.authDomain,
      appName: this.u().name,
      currentUser: T(this) && T(this).m(),
    }
  }
  var so = function (a) {
      return a.Xi || J(new P('auth-domain-config-required'))
    },
    mo = function (a) {
      var b = a.u().options.authDomain,
        c = a.u().options.apiKey
      b &&
        oh() &&
        (a.Xi = a.Nd.then(function () {
          if (!a.Aa) {
            a.v = Rm(b, c, a.u().name, a.s)
            a.v.subscribe(a)
            T(a) && Dn(T(a))
            if (a.yb) {
              Dn(a.yb)
              var d = a.yb
              d.Gc(a.Ga)
              vn(d, a)
              d = a.yb
              un(d, a.U)
              xn(d, a)
              d = a.yb
              tn(d, a.s)
              wn(d, a)
              a.yb = null
            }
            return a.v
          }
        }))
    }
  l = S.prototype
  l.Pg = function (a, b) {
    switch (a) {
      case 'unknown':
      case 'signInViaRedirect':
        return !0
      case 'signInViaPopup':
        return this.Ia == b && !!this.Ha
      default:
        return !1
    }
  }
  l.Wb = function (a, b, c, d) {
    'signInViaPopup' == a &&
      this.Ia == d &&
      (c && this.Tb ? this.Tb(c) : b && !c && this.Ha && this.Ha(b),
      this.aa && (this.aa.cancel(), (this.aa = null)),
      delete this.Ha,
      delete this.Tb)
  }
  l.Zc = function (a, b) {
    return 'signInViaRedirect' == a || ('signInViaPopup' == a && this.Ia == b && this.Ha)
      ? v(this.bj, this)
      : null
  }
  l.bj = function (a, b, c, d) {
    var e = this,
      f = { requestUri: a, postBody: d, sessionId: b, tenantId: c }
    this.aa && (this.aa.cancel(), (this.aa = null))
    return e.Nd.then(function () {
      return to(e, ui(e.i, f))
    })
  }
  l.be = function () {
    return lh()
  }
  l.signInWithPopup = function (a) {
    if (!oh()) return J(new P('operation-not-supported-in-this-environment'))
    var b = this,
      c = Sh(a.providerId),
      d = this.be(),
      e = null
    ;(!ph() || dh()) &&
      this.u().options.authDomain &&
      a.isOAuthProvider &&
      (e = Lk(
        this.u().options.authDomain,
        this.u().options.apiKey,
        this.u().name,
        'signInViaPopup',
        a,
        null,
        d,
        firebase.SDK_VERSION || null,
        null,
        null,
        this.C,
        this.s
      ))
    var f = Ug(e, c && c.yc, c && c.xc)
    c = so(this)
      .then(function (g) {
        return g.pd(f, 'signInViaPopup', a, d, !!e, b.C)
      })
      .then(function () {
        return new H(function (g, h) {
          b.Wb('signInViaPopup', null, new P('cancelled-popup-request'), b.Ia)
          b.Ha = g
          b.Tb = h
          b.Ia = d
          b.aa = b.v.Ad(b, 'signInViaPopup', f, d)
        })
      })
      .then(function (g) {
        f && Tg(f)
        return g ? Mh(g) : null
      })
      .h(function (g) {
        f && Tg(f)
        throw g
      })
    return this.l(c)
  }
  l.signInWithRedirect = function (a) {
    if (!oh()) return J(new P('operation-not-supported-in-this-environment'))
    var b = this,
      c = so(this)
        .then(function () {
          return fo(b.Na)
        })
        .then(function () {
          return b.v.qd('signInViaRedirect', a, void 0, b.C)
        })
    return this.l(c)
  }
  var uo = function (a) {
    if (!oh()) return J(new P('operation-not-supported-in-this-environment'))
    var b = so(a)
      .then(function () {
        return a.v.getRedirectResult()
      })
      .then(function (c) {
        return c ? Mh(c) : null
      })
    return a.l(b)
  }
  S.prototype.getRedirectResult = function () {
    var a = this
    return uo(this)
      .then(function (b) {
        a.v && a.v.ic()
        return b
      })
      .h(function (b) {
        a.v && a.v.ic()
        throw b
      })
  }
  S.prototype.updateCurrentUser = function (a) {
    if (!a) return J(new P('null-user'))
    if (this.C != a.tenantId) return J(new P('tenant-id-mismatch'))
    var b = this,
      c = {}
    c.apiKey = this.u().options.apiKey
    c.authDomain = this.u().options.authDomain
    c.appName = this.u().name
    var d = Xn(a, c, b.Vb, Va(b.U))
    return this.l(
      this.Ja.then(function () {
        if (b.u().options.apiKey != a.A) return d.reload()
      })
        .then(function () {
          if (T(b) && a.uid == T(b).uid) return T(b).copy(a), b.rb(a)
          jo(b, d)
          Dn(d)
          return b.rb(d)
        })
        .then(function () {
          b.ub()
        })
    )
  }
  var vo = function (a, b) {
      var c = {}
      c.apiKey = a.u().options.apiKey
      c.authDomain = a.u().options.authDomain
      c.appName = a.u().name
      a.s && (c.emulatorConfig = a.s)
      return a.Nd.then(function () {
        return Wn(c, b, a.Vb, Va(a.U))
      })
        .then(function (d) {
          if (T(a) && d.uid == T(a).uid) return T(a).copy(d), a.rb(d)
          jo(a, d)
          Dn(d)
          return a.rb(d)
        })
        .then(function () {
          a.ub()
        })
    },
    jo = function (a, b) {
      T(a) &&
        (Bn(T(a), a.Ei),
        Ze(T(a), 'tokenChanged', a.Lc),
        Ze(T(a), 'userDeleted', a.Ci),
        Ze(T(a), 'userInvalidated', a.Di),
        An(T(a)))
      b &&
        (b.Ne.push(a.Ei),
        Re(b, 'tokenChanged', a.Lc),
        Re(b, 'userDeleted', a.Ci),
        Re(b, 'userInvalidated', a.Di),
        0 < a.Mb && zn(b))
      N(a, 'currentUser', b)
      b && (b.Gc(a.Ga), vn(b, a), un(b, a.U), xn(b, a), tn(b, a.s), wn(b, a))
    }
  S.prototype.signOut = function () {
    var a = this,
      b = this.Ja.then(function () {
        a.v && a.v.ic()
        if (!T(a)) return I()
        jo(a, null)
        return ho(a.Na).then(function () {
          a.ub()
        })
      })
    return this.l(b)
  }
  var wo = function (a) {
      var b = a.u().options.authDomain
      b = Zn(a.Vb, b).then(function (c) {
        if ((a.yb = c)) c.xb = a.Vb
        return Tn(a.Vb)
      })
      return a.l(b)
    },
    ko = function (a) {
      var b = a.u().options.authDomain,
        c = wo(a)
          .then(function () {
            return io(a.Na, b, a.s)
          })
          .then(function (d) {
            return d
              ? ((d.xb = a.Vb),
                a.yb && (a.yb.wb || null) == (d.wb || null)
                  ? d
                  : d
                      .reload()
                      .then(function () {
                        return go(a.Na, d).then(function () {
                          return d
                        })
                      })
                      .h(function (e) {
                        return 'auth/network-request-failed' == e.code ? d : ho(a.Na)
                      }))
              : null
          })
          .then(function (d) {
            jo(a, d || null)
          })
      return a.l(c)
    },
    lo = function (a) {
      return a.Nd.then(function () {
        return uo(a)
      })
        .h(function () {})
        .then(function () {
          if (!a.Aa) return a.Ff()
        })
        .h(function () {})
        .then(function () {
          if (!a.Aa) {
            a.pe = !0
            var b = a.Na
            b.o.addListener($n('local'), b.D, a.Ff)
          }
        })
    }
  l = S.prototype
  l.qk = function () {
    var a = this,
      b = this.u().options.authDomain
    return io(this.Na, b).then(function (c) {
      if (!a.Aa) {
        var d
        if ((d = T(a) && c)) {
          d = T(a).uid
          var e = c.uid
          d =
            void 0 === d || null === d || '' === d || void 0 === e || null === e || '' === e
              ? !1
              : d == e
        }
        if (d) return T(a).copy(c), T(a).getIdToken()
        if (T(a) || c) jo(a, c), c && (Dn(c), (c.xb = a.Vb)), a.v && a.v.subscribe(a), a.ub()
      }
    })
  }
  l.rb = function (a) {
    return go(this.Na, a)
  }
  l.If = function () {
    this.ub()
    this.rb(T(this))
  }
  l.pj = function () {
    this.signOut()
  }
  l.qj = function () {
    this.signOut()
  }
  var to = function (a, b) {
    var c = null,
      d = null
    return a.l(
      b
        .then(
          function (e) {
            c = dj(e)
            d = $l(e)
            return vo(a, e)
          },
          function (e) {
            var f = null
            e && 'auth/multi-factor-auth-required' === e.code && (f = Zm(e.m(), a, v(a.Hf, a)))
            throw f || e
          }
        )
        .then(function () {
          return Mh({ user: T(a), credential: c, additionalUserInfo: d, operationType: 'signIn' })
        })
    )
  }
  l = S.prototype
  l.Hf = function (a) {
    var b = this
    return this.Ja.then(function () {
      return to(b, I(a))
    })
  }
  l.vj = function (a) {
    var b = this
    this.addAuthTokenListener(function () {
      a.next(T(b))
    })
  }
  l.wj = function (a) {
    var b = this
    xo(this, function () {
      a.next(T(b))
    })
  }
  l.onIdTokenChanged = function (a, b, c) {
    var d = this
    this.pe &&
      firebase.Promise.resolve().then(function () {
        'function' === typeof a ? a(T(d)) : 'function' === typeof a.next && a.next(T(d))
      })
    return this.Kj(a, b, c)
  }
  l.onAuthStateChanged = function (a, b, c) {
    var d = this
    this.pe &&
      firebase.Promise.resolve().then(function () {
        d.Hd = d.getUid()
        'function' === typeof a ? a(T(d)) : 'function' === typeof a.next && a.next(T(d))
      })
    return this.Nj(a, b, c)
  }
  l.ej = function (a) {
    var b = this,
      c = this.Ja.then(function () {
        return T(b)
          ? T(b)
              .getIdToken(a)
              .then(function (d) {
                return { accessToken: d }
              })
          : null
      })
    return this.l(c)
  }
  l.signInWithCustomToken = function (a) {
    var b = this
    return this.Ja.then(function () {
      return to(b, Q(b.i, tk, { token: a }))
    }).then(function (c) {
      var d = c.user
      Jn(d, 'isAnonymous', !1)
      b.rb(d)
      return c
    })
  }
  l.signInWithEmailAndPassword = function (a, b) {
    var c = this
    return this.Ja.then(function () {
      return to(c, Q(c.i, Oi, { email: a, password: b }))
    })
  }
  l.createUserWithEmailAndPassword = function (a, b) {
    var c = this
    return this.Ja.then(function () {
      return to(c, Q(c.i, mk, { email: a, password: b }))
    })
  }
  l.signInWithCredential = function (a) {
    var b = this
    return this.Ja.then(function () {
      return to(b, a.Nb(b.i))
    })
  }
  l.signInAndRetrieveDataWithCredential = function (a) {
    Jh(
      'firebase.auth.Auth.prototype.signInAndRetrieveDataWithCredential is deprecated. Please use firebase.auth.Auth.prototype.signInWithCredential instead.'
    )
    return this.signInWithCredential(a)
  }
  l.signInAnonymously = function () {
    var a = this
    return this.Ja.then(function () {
      var b = T(a)
      if (b && b.isAnonymous) {
        var c = Mh({ providerId: null, isNewUser: !1 })
        return Mh({ user: b, credential: null, additionalUserInfo: c, operationType: 'signIn' })
      }
      return to(a, a.i.signInAnonymously()).then(function (d) {
        var e = d.user
        Jn(e, 'isAnonymous', !0)
        a.rb(e)
        return d
      })
    })
  }
  l.pc = function () {
    var a = this.u().options.apiKey,
      b = this.u().name
    return a + ':' + b
  }
  l.u = function () {
    return this.app
  }
  var T = function (a) {
    return a.currentUser
  }
  S.prototype.getUid = function () {
    return (T(this) && T(this).uid) || null
  }
  var yo = function (a) {
    return (T(a) && T(a)._lat) || null
  }
  l = S.prototype
  l.ub = function () {
    if (this.pe) {
      for (var a = 0; a < this.Eb.length; a++) if (this.Eb[a]) this.Eb[a](yo(this))
      if (this.Hd !== this.getUid() && this.Kc.length)
        for (this.Hd = this.getUid(), a = 0; a < this.Kc.length; a++)
          if (this.Kc[a]) this.Kc[a](yo(this))
    }
  }
  l.Ni = function (a) {
    this.addAuthTokenListener(a)
    this.Mb++
    0 < this.Mb && T(this) && zn(T(this))
  }
  l.Tj = function (a) {
    var b = this
    y(this.Eb, function (c) {
      c == a && b.Mb--
    })
    0 > this.Mb && (this.Mb = 0)
    0 == this.Mb && T(this) && An(T(this))
    this.removeAuthTokenListener(a)
  }
  l.addAuthTokenListener = function (a) {
    var b = this
    this.Eb.push(a)
    this.l(
      this.Ja.then(function () {
        b.Aa || (Ra(b.Eb, a) && a(yo(b)))
      })
    )
  }
  l.removeAuthTokenListener = function (a) {
    Ua(this.Eb, function (b) {
      return b == a
    })
  }
  var xo = function (a, b) {
    a.Kc.push(b)
    a.l(
      a.Ja.then(function () {
        !a.Aa && Ra(a.Kc, b) && a.Hd !== a.getUid() && ((a.Hd = a.getUid()), b(yo(a)))
      })
    )
  }
  l = S.prototype
  l.delete = function () {
    this.Aa = !0
    for (var a = 0; a < this.Z.length; a++) this.Z[a].cancel('app-deleted')
    this.Z = []
    this.Na && ((a = this.Na), a.o.removeListener($n('local'), a.D, this.Ff))
    this.v && (this.v.unsubscribe(this), this.v.ic())
    return firebase.Promise.resolve()
  }
  l.l = function (a) {
    var b = this
    this.Z.push(a)
    a.Bb(function () {
      Sa(b.Z, a)
    })
    return a
  }
  l.fetchSignInMethodsForEmail = function (a) {
    return this.l(Ej(this.i, a))
  }
  l.isSignInWithEmailLink = function (a) {
    return !!Si(a)
  }
  l.sendSignInLinkToEmail = function (a, b) {
    var c = this
    return this.l(
      I()
        .then(function () {
          var d = new Nl(b)
          if (!d.Qg)
            throw new P(
              'argument-error',
              'handleCodeInApp must be true when sending sign in link to email'
            )
          return Ol(d)
        })
        .then(function (d) {
          return c.i.sendSignInLinkToEmail(a, d)
        })
        .then(function () {})
    )
  }
  l.verifyPasswordResetCode = function (a) {
    return this.checkActionCode(a).then(function (b) {
      return b.data.email
    })
  }
  l.confirmPasswordReset = function (a, b) {
    return this.l(this.i.confirmPasswordReset(a, b).then(function () {}))
  }
  l.checkActionCode = function (a) {
    return this.l(
      this.i.checkActionCode(a).then(function (b) {
        return new ci(b)
      })
    )
  }
  l.applyActionCode = function (a) {
    return this.l(this.i.applyActionCode(a).then(function () {}))
  }
  l.sendPasswordResetEmail = function (a, b) {
    var c = this
    return this.l(
      I()
        .then(function () {
          return 'undefined' === typeof b || Ya(b) ? {} : Ol(new Nl(b))
        })
        .then(function (d) {
          return c.i.sendPasswordResetEmail(a, d)
        })
        .then(function () {})
    )
  }
  l.signInWithPhoneNumber = function (a, b) {
    return this.l(Ql(this, a, b, v(this.signInWithCredential, this)))
  }
  l.signInWithEmailLink = function (a, b) {
    var c = this
    return this.l(
      I().then(function () {
        b = b || Mg()
        var d = Ti(a, b),
          e = Si(b)
        if (!e) throw new P('argument-error', 'Invalid email link!')
        if (e.tenantId !== c.C) throw new P('tenant-id-mismatch')
        return c.signInWithCredential(d)
      })
    )
  }
  var oo = function (a) {
    G.call(this, 'languageCodeChanged')
    this.languageCode = a
  }
  m(oo, G)
  var qo = function (a) {
    G.call(this, 'emulatorConfigChanged')
    this.emulatorConfig = a
  }
  m(qo, G)
  var ro = function (a) {
    G.call(this, 'frameworkChanged')
    this.Yc = a
  }
  m(ro, G)
  var Ao = function (a, b, c, d) {
      a: {
        c = Array.prototype.slice.call(c)
        var e = 0
        for (var f = !1, g = 0; g < b.length; g++)
          if (b[g].optional) f = !0
          else {
            if (f)
              throw new P(
                'internal-error',
                'Argument validator encountered a required argument after an optional argument.'
              )
            e++
          }
        f = b.length
        if (c.length < e || f < c.length)
          d =
            'Expected ' +
            (e == f ? (1 == e ? '1 argument' : e + ' arguments') : e + '-' + f + ' arguments') +
            ' but got ' +
            c.length +
            '.'
        else {
          for (e = 0; e < c.length; e++)
            if (((f = b[e].optional && void 0 === c[e]), !b[e].X(c[e]) && !f)) {
              b = b[e]
              if (0 > e || e >= zo.length)
                throw new P(
                  'internal-error',
                  'Argument validator received an unsupported number of arguments.'
                )
              c = zo[e]
              d =
                (d ? '' : c + ' argument ') +
                (b.name ? '"' + b.name + '" ' : '') +
                'must be ' +
                b.W +
                '.'
              break a
            }
          d = null
        }
      }
      if (d) throw new P('argument-error', a + ' failed: ' + d)
    },
    zo = 'First Second Third Fourth Fifth Sixth Seventh Eighth Ninth'.split(' '),
    U = function (a, b) {
      return {
        name: a || '',
        W: 'a valid string',
        optional: !!b,
        X: function (c) {
          return 'string' === typeof c
        },
      }
    },
    Bo = function (a, b) {
      return {
        name: a || '',
        W: 'a boolean',
        optional: !!b,
        X: function (c) {
          return 'boolean' === typeof c
        },
      }
    },
    V = function (a, b) {
      return { name: a || '', W: 'a valid object', optional: !!b, X: u }
    },
    Co = function (a, b) {
      return { name: a || '', W: 'a function', optional: !!b, X: La }
    },
    Do = function (a, b) {
      return {
        name: a || '',
        W: 'null',
        optional: !!b,
        X: function (c) {
          return null === c
        },
      }
    },
    Eo = function () {
      return {
        name: '',
        W: 'an HTML element',
        optional: !1,
        X: function (a) {
          return !!(a && a instanceof Element)
        },
      }
    },
    Fo = function () {
      return {
        name: 'auth',
        W: 'an instance of Firebase Auth',
        optional: !0,
        X: function (a) {
          return !!(a && a instanceof S)
        },
      }
    },
    Go = function () {
      return {
        name: 'app',
        W: 'an instance of Firebase App',
        optional: !0,
        X: function (a) {
          return !!(a && a instanceof firebase.app.App)
        },
      }
    },
    Ho = function (a) {
      return {
        name: a ? a + 'Credential' : 'credential',
        W: a ? 'a valid ' + a + ' credential' : 'a valid credential',
        optional: !1,
        X: function (b) {
          if (!b) return !1
          var c = !a || b.providerId === a
          return !(!b.Nb || !c)
        },
      }
    },
    Io = function () {
      return {
        name: 'multiFactorAssertion',
        W: 'a valid multiFactorAssertion',
        optional: !1,
        X: function (a) {
          return a ? !!a.process : !1
        },
      }
    },
    Jo = function () {
      return {
        name: 'authProvider',
        W: 'a valid Auth provider',
        optional: !1,
        X: function (a) {
          return !!(a && a.providerId && a.hasOwnProperty && a.hasOwnProperty('isOAuthProvider'))
        },
      }
    },
    Ko = function (a, b) {
      return u(a) && 'string' === typeof a.type && a.type === b && 'function' === typeof a.bd
    },
    Lo = function (a) {
      return u(a) && 'string' === typeof a.uid
    },
    Mo = function () {
      return {
        name: 'applicationVerifier',
        W: 'an implementation of firebase.auth.ApplicationVerifier',
        optional: !1,
        X: function (a) {
          return !(!a || 'string' !== typeof a.type || 'function' !== typeof a.verify)
        },
      }
    },
    W = function (a, b, c, d) {
      return {
        name: c || '',
        W: a.W + ' or ' + b.W,
        optional: !!d,
        X: function (e) {
          return a.X(e) || b.X(e)
        },
      }
    }
  var X = function (a, b) {
      for (var c in b) {
        var d = b[c].name
        a[d] = No(d, a[c], b[c].g)
      }
    },
    Oo = function (a, b) {
      for (var c in b) {
        var d = b[c].name
        d !== c &&
          Object.defineProperty(a, d, {
            get: ya(function (e) {
              return this[e]
            }, c),
            set: ya(
              function (e, f, g, h) {
                Ao(e, [g], [h], !0)
                this[f] = h
              },
              d,
              c,
              b[c].ef
            ),
            enumerable: !0,
          })
      }
    },
    Y = function (a, b, c, d) {
      a[b] = No(b, c, d)
    },
    No = function (a, b, c) {
      if (!c) return b
      var d = Po(a)
      a = function () {
        var g = Array.prototype.slice.call(arguments)
        Ao(d, c, g)
        return b.apply(this, g)
      }
      for (var e in b) a[e] = b[e]
      for (var f in b.prototype) a.prototype[f] = b.prototype[f]
      return a
    },
    Po = function (a) {
      a = a.split('.')
      return a[a.length - 1]
    }
  function Qo() {}
  N(Qo, 'FACTOR_ID', 'phone')
  X(S.prototype, {
    applyActionCode: { name: 'applyActionCode', g: [U('code')] },
    checkActionCode: { name: 'checkActionCode', g: [U('code')] },
    confirmPasswordReset: { name: 'confirmPasswordReset', g: [U('code'), U('newPassword')] },
    createUserWithEmailAndPassword: {
      name: 'createUserWithEmailAndPassword',
      g: [U('email'), U('password')],
    },
    fetchSignInMethodsForEmail: { name: 'fetchSignInMethodsForEmail', g: [U('email')] },
    getRedirectResult: { name: 'getRedirectResult', g: [] },
    isSignInWithEmailLink: { name: 'isSignInWithEmailLink', g: [U('emailLink')] },
    onAuthStateChanged: {
      name: 'onAuthStateChanged',
      g: [W(V(), Co(), 'nextOrObserver'), Co('opt_error', !0), Co('opt_completed', !0)],
    },
    onIdTokenChanged: {
      name: 'onIdTokenChanged',
      g: [W(V(), Co(), 'nextOrObserver'), Co('opt_error', !0), Co('opt_completed', !0)],
    },
    sendPasswordResetEmail: {
      name: 'sendPasswordResetEmail',
      g: [
        U('email'),
        W(V('opt_actionCodeSettings', !0), Do(null, !0), 'opt_actionCodeSettings', !0),
      ],
    },
    sendSignInLinkToEmail: {
      name: 'sendSignInLinkToEmail',
      g: [U('email'), V('actionCodeSettings')],
    },
    setPersistence: { name: 'setPersistence', g: [U('persistence')] },
    signInAndRetrieveDataWithCredential: { name: 'signInAndRetrieveDataWithCredential', g: [Ho()] },
    signInAnonymously: { name: 'signInAnonymously', g: [] },
    signInWithCredential: { name: 'signInWithCredential', g: [Ho()] },
    signInWithCustomToken: { name: 'signInWithCustomToken', g: [U('token')] },
    signInWithEmailAndPassword: {
      name: 'signInWithEmailAndPassword',
      g: [U('email'), U('password')],
    },
    signInWithEmailLink: { name: 'signInWithEmailLink', g: [U('email'), U('emailLink', !0)] },
    signInWithPhoneNumber: { name: 'signInWithPhoneNumber', g: [U('phoneNumber'), Mo()] },
    signInWithPopup: { name: 'signInWithPopup', g: [Jo()] },
    signInWithRedirect: { name: 'signInWithRedirect', g: [Jo()] },
    updateCurrentUser: {
      name: 'updateCurrentUser',
      g: [
        W(
          (function (a) {
            return {
              name: 'user',
              W: 'an instance of Firebase User',
              optional: !!a,
              X: function (b) {
                return !!(b && b instanceof R)
              },
            }
          })(),
          Do(),
          'user'
        ),
      ],
    },
    signOut: { name: 'signOut', g: [] },
    toJSON: { name: 'toJSON', g: [U(null, !0)] },
    useDeviceLanguage: { name: 'useDeviceLanguage', g: [] },
    useEmulator: { name: 'useEmulator', g: [U('url'), V('options', !0)] },
    verifyPasswordResetCode: { name: 'verifyPasswordResetCode', g: [U('code')] },
  })
  Oo(S.prototype, {
    lc: { name: 'languageCode', ef: W(U(), Do(), 'languageCode') },
    ti: { name: 'tenantId', ef: W(U(), Do(), 'tenantId') },
  })
  S.Persistence = am
  S.Persistence.LOCAL = 'local'
  S.Persistence.SESSION = 'session'
  S.Persistence.NONE = 'none'
  X(R.prototype, {
    delete: { name: 'delete', g: [] },
    getIdTokenResult: { name: 'getIdTokenResult', g: [Bo('opt_forceRefresh', !0)] },
    getIdToken: { name: 'getIdToken', g: [Bo('opt_forceRefresh', !0)] },
    linkAndRetrieveDataWithCredential: { name: 'linkAndRetrieveDataWithCredential', g: [Ho()] },
    linkWithCredential: { name: 'linkWithCredential', g: [Ho()] },
    linkWithPhoneNumber: { name: 'linkWithPhoneNumber', g: [U('phoneNumber'), Mo()] },
    linkWithPopup: { name: 'linkWithPopup', g: [Jo()] },
    linkWithRedirect: { name: 'linkWithRedirect', g: [Jo()] },
    reauthenticateAndRetrieveDataWithCredential: {
      name: 'reauthenticateAndRetrieveDataWithCredential',
      g: [Ho()],
    },
    reauthenticateWithCredential: { name: 'reauthenticateWithCredential', g: [Ho()] },
    reauthenticateWithPhoneNumber: {
      name: 'reauthenticateWithPhoneNumber',
      g: [U('phoneNumber'), Mo()],
    },
    reauthenticateWithPopup: { name: 'reauthenticateWithPopup', g: [Jo()] },
    reauthenticateWithRedirect: { name: 'reauthenticateWithRedirect', g: [Jo()] },
    reload: { name: 'reload', g: [] },
    sendEmailVerification: {
      name: 'sendEmailVerification',
      g: [W(V('opt_actionCodeSettings', !0), Do(null, !0), 'opt_actionCodeSettings', !0)],
    },
    toJSON: { name: 'toJSON', g: [U(null, !0)] },
    unlink: { name: 'unlink', g: [U('provider')] },
    updateEmail: { name: 'updateEmail', g: [U('email')] },
    updatePassword: { name: 'updatePassword', g: [U('password')] },
    updatePhoneNumber: { name: 'updatePhoneNumber', g: [Ho('phone')] },
    updateProfile: { name: 'updateProfile', g: [V('profile')] },
    verifyBeforeUpdateEmail: {
      name: 'verifyBeforeUpdateEmail',
      g: [
        U('email'),
        W(V('opt_actionCodeSettings', !0), Do(null, !0), 'opt_actionCodeSettings', !0),
      ],
    },
  })
  X(Rk.prototype, {
    execute: { name: 'execute' },
    render: { name: 'render' },
    reset: { name: 'reset' },
    getResponse: { name: 'getResponse' },
  })
  X(Mk.prototype, {
    execute: { name: 'execute' },
    render: { name: 'render' },
    reset: { name: 'reset' },
    getResponse: { name: 'getResponse' },
  })
  X(H.prototype, { Bb: { name: 'finally' }, h: { name: 'catch' }, then: { name: 'then' } })
  Oo(Ml.prototype, {
    appVerificationDisabled: {
      name: 'appVerificationDisabledForTesting',
      ef: Bo('appVerificationDisabledForTesting'),
    },
  })
  X(Pl.prototype, { confirm: { name: 'confirm', g: [U('verificationCode')] } })
  Y(
    ri,
    'fromJSON',
    function (a) {
      a = 'string' === typeof a ? JSON.parse(a) : a
      for (var b, c = [zi, Ri, Yi, xi], d = 0; d < c.length; d++) if ((b = c[d](a))) return b
      return null
    },
    [W(U(), V(), 'json')]
  )
  Y(
    Li,
    'credential',
    function (a, b) {
      return new Mi(a, b)
    },
    [U('email'), U('password')]
  )
  X(Mi.prototype, { m: { name: 'toJSON', g: [U(null, !0)] } })
  X(Di.prototype, {
    addScope: { name: 'addScope', g: [U('scope')] },
    setCustomParameters: { name: 'setCustomParameters', g: [V('customOAuthParameters')] },
  })
  Y(Di, 'credential', Ei, [W(U(), V(), 'token')])
  Y(Li, 'credentialWithLink', Ti, [U('email'), U('emailLink')])
  X(Fi.prototype, {
    addScope: { name: 'addScope', g: [U('scope')] },
    setCustomParameters: { name: 'setCustomParameters', g: [V('customOAuthParameters')] },
  })
  Y(Fi, 'credential', Gi, [W(U(), V(), 'token')])
  X(Hi.prototype, {
    addScope: { name: 'addScope', g: [U('scope')] },
    setCustomParameters: { name: 'setCustomParameters', g: [V('customOAuthParameters')] },
  })
  Y(Hi, 'credential', Ii, [W(U(), W(V(), Do()), 'idToken'), W(U(), Do(), 'accessToken', !0)])
  X(Ji.prototype, {
    setCustomParameters: { name: 'setCustomParameters', g: [V('customOAuthParameters')] },
  })
  Y(Ji, 'credential', Ki, [W(U(), V(), 'token'), U('secret', !0)])
  X(Ci.prototype, {
    addScope: { name: 'addScope', g: [U('scope')] },
    credential: {
      name: 'credential',
      g: [W(U(), W(V(), Do()), 'optionsOrIdToken'), W(U(), Do(), 'accessToken', !0)],
    },
    setCustomParameters: { name: 'setCustomParameters', g: [V('customOAuthParameters')] },
  })
  X(yi.prototype, { m: { name: 'toJSON', g: [U(null, !0)] } })
  X(ti.prototype, { m: { name: 'toJSON', g: [U(null, !0)] } })
  Y(Zi, 'credential', cj, [U('verificationId'), U('verificationCode')])
  X(Zi.prototype, {
    verifyPhoneNumber: {
      name: 'verifyPhoneNumber',
      g: [
        W(
          U(),
          (function (a, b) {
            return {
              name: a || 'phoneInfoOptions',
              W: 'valid phone info options',
              optional: !!b,
              X: function (c) {
                return c
                  ? c.session && c.phoneNumber
                    ? Ko(c.session, 'enroll') && 'string' === typeof c.phoneNumber
                    : c.session && c.multiFactorHint
                    ? Ko(c.session, 'signin') && Lo(c.multiFactorHint)
                    : c.session && c.multiFactorUid
                    ? Ko(c.session, 'signin') && 'string' === typeof c.multiFactorUid
                    : c.phoneNumber
                    ? 'string' === typeof c.phoneNumber
                    : !1
                  : !1
              },
            }
          })(),
          'phoneInfoOptions'
        ),
        Mo(),
      ],
    },
  })
  X(Ui.prototype, { m: { name: 'toJSON', g: [U(null, !0)] } })
  X(P.prototype, { toJSON: { name: 'toJSON', g: [U(null, !0)] } })
  X(fj.prototype, { toJSON: { name: 'toJSON', g: [U(null, !0)] } })
  X(li.prototype, { toJSON: { name: 'toJSON', g: [U(null, !0)] } })
  X(Ym.prototype, { toJSON: { name: 'toJSON', g: [U(null, !0)] } })
  X(Xm.prototype, { resolveSignIn: { name: 'resolveSignIn', g: [Io()] } })
  X(gn.prototype, {
    getSession: { name: 'getSession', g: [] },
    enroll: { name: 'enroll', g: [Io(), U('displayName', !0)] },
    unenroll: {
      name: 'unenroll',
      g: [
        W(
          { name: 'multiFactorInfo', W: 'a valid multiFactorInfo', optional: !1, X: Lo },
          U(),
          'multiFactorInfoIdentifier'
        ),
      ],
    },
  })
  X(bl.prototype, {
    clear: { name: 'clear', g: [] },
    render: { name: 'render', g: [] },
    verify: { name: 'verify', g: [] },
  })
  Y(ei, 'parseLink', fi, [U('link')])
  Y(
    Qo,
    'assertion',
    function (a) {
      return new dn(a)
    },
    [Ho('phone')]
  )
  ;(function () {
    if ('undefined' !== typeof firebase && firebase.INTERNAL && firebase.INTERNAL.registerService) {
      var a = {
        ActionCodeInfo: {
          Operation: {
            EMAIL_SIGNIN: 'EMAIL_SIGNIN',
            PASSWORD_RESET: 'PASSWORD_RESET',
            RECOVER_EMAIL: 'RECOVER_EMAIL',
            REVERT_SECOND_FACTOR_ADDITION: 'REVERT_SECOND_FACTOR_ADDITION',
            VERIFY_AND_CHANGE_EMAIL: 'VERIFY_AND_CHANGE_EMAIL',
            VERIFY_EMAIL: 'VERIFY_EMAIL',
          },
        },
        Auth: S,
        AuthCredential: ri,
        Error: P,
      }
      Y(a, 'EmailAuthProvider', Li, [])
      Y(a, 'FacebookAuthProvider', Di, [])
      Y(a, 'GithubAuthProvider', Fi, [])
      Y(a, 'GoogleAuthProvider', Hi, [])
      Y(a, 'TwitterAuthProvider', Ji, [])
      Y(a, 'OAuthProvider', Ci, [U('providerId')])
      Y(a, 'SAMLAuthProvider', Bi, [U('providerId')])
      Y(a, 'PhoneAuthProvider', Zi, [Fo()])
      Y(a, 'RecaptchaVerifier', bl, [
        W(U(), Eo(), 'recaptchaContainer'),
        V('recaptchaParameters', !0),
        Go(),
      ])
      Y(a, 'ActionCodeURL', ei, [])
      Y(a, 'PhoneMultiFactorGenerator', Qo, [])
      firebase.INTERNAL.registerService(
        'auth',
        function (b, c) {
          b = new S(b)
          c({
            INTERNAL: {
              getUid: v(b.getUid, b),
              getToken: v(b.ej, b),
              addAuthTokenListener: v(b.Ni, b),
              removeAuthTokenListener: v(b.Tj, b),
            },
          })
          return b
        },
        a,
        function (b, c) {
          if ('create' === b)
            try {
              c.auth()
            } catch (d) {}
        }
      )
      firebase.INTERNAL.extendNamespace({ User: R })
    } else
      throw Error(
        'Cannot find the firebase namespace; be sure to include firebase-app.js before this library.'
      )
  })()
  var Ro = function () {
    this.Ra = ('undefined' == typeof document ? null : document) || { cookie: '' }
  }
  l = Ro.prototype
  l.isEnabled = function () {
    if (!q.navigator.cookieEnabled) return !1
    if (!this.Ch()) return !0
    this.set('TESTCOOKIESENABLED', '1', { Uf: 60 })
    if ('1' !== this.get('TESTCOOKIESENABLED')) return !1
    this.remove('TESTCOOKIESENABLED')
    return !0
  }
  l.set = function (a, b, c) {
    var d = !1
    if ('object' === typeof c) {
      var e = c.Uk
      d = c.gk || !1
      var f = c.domain || void 0
      var g = c.path || void 0
      var h = c.Uf
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"')
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"')
    void 0 === h && (h = -1)
    this.rg(
      a +
        '=' +
        b +
        (f ? ';domain=' + f : '') +
        (g ? ';path=' + g : '') +
        (0 > h
          ? ''
          : 0 == h
          ? ';expires=' + new Date(1970, 1, 1).toUTCString()
          : ';expires=' + new Date(Date.now() + 1e3 * h).toUTCString()) +
        (d ? ';secure' : '') +
        (null != e ? ';samesite=' + e : '')
    )
  }
  l.get = function (a, b) {
    for (var c = a + '=', d = (this.ad() || '').split(';'), e = 0, f; e < d.length; e++) {
      f = qb(d[e])
      if (0 == f.lastIndexOf(c, 0)) return f.slice(c.length)
      if (f == a) return ''
    }
    return b
  }
  l.remove = function (a, b, c) {
    var d = this.Qc(a)
    this.set(a, '', { Uf: 0, path: b, domain: c })
    return d
  }
  l.ce = function () {
    return So(this).keys
  }
  l.qb = function () {
    return So(this).values
  }
  l.Ch = function () {
    return !this.ad()
  }
  l.Qc = function (a) {
    return void 0 !== this.get(a)
  }
  l.clear = function () {
    for (var a = So(this).keys, b = a.length - 1; 0 <= b; b--) this.remove(a[b])
  }
  l.rg = function (a) {
    this.Ra.cookie = a
  }
  l.ad = function () {
    return this.Ra.cookie
  }
  var So = function (a) {
      a = (a.ad() || '').split(';')
      for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
        (e = qb(a[f])),
          (d = e.indexOf('=')),
          -1 == d
            ? (b.push(''), c.push(e))
            : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)))
      return { keys: b, values: c }
    },
    To = new Ro()
  var Uo = /\.(firebaseapp\-staging\.com|staging\-web\.app)$/
  var Vo = function () {
    var a = q.EXPERIMENTS || {}
    this.N = {}
    var b
    for (b in a) {
      var c = '' + a[b].id
      this.N[c] = a[b]
      'undefined' !== typeof this.N[c].stagingRollout &&
        (0 > this.N[c].stagingRollout && (this.N[c].stagingRollout = 0),
        1 < this.N[c].stagingRollout && (this.N[c].stagingRollout = 1))
      'undefined' !== typeof this.N[c].rollout &&
        (0 > this.N[c].rollout && (this.N[c].rollout = 0),
        1 < this.N[c].rollout && (this.N[c].rollout = 1))
    }
  }
  Vo.prototype.isEnabled = function (a) {
    var b = a.id
    a = a.id.toString()
    if ('undefined' !== typeof this.N[a]) {
      var c = void 0 === c ? q.window : c
      if (
        !(c && c.navigator && c.navigator.cookieEnabled) ||
        (this.N[a].expiration && this.N[a].expiration.getTime() <= Date.now())
      )
        return !!this.N[a].defaultValue
      var d
      c = this.ad('e_gcip_' + b)
      null === c &&
        ((c = parseInt(1e4 * Math.random(), 10) / 1e4),
        this.N[b.toString()].expiration &&
          (d = parseInt((this.N[b.toString()].expiration.getTime() - Date.now()) / 1e3, 10)),
        this.rg('e_gcip_' + b, c.toString(), d))
      b = parseFloat(c)
      var e
      return (e = void 0 === e ? q.window : e) &&
        e.location &&
        e.location.hostname &&
        Uo.test(e.location.hostname) &&
        'undefined' !== typeof this.N[a].stagingRollout
        ? 0 === b
          ? !1
          : b <= this.N[a].stagingRollout
        : 'undefined' !== typeof this.N[a].rollout
        ? 0 === b
          ? !1
          : b <= this.N[a].rollout
        : !!this.N[a].defaultValue
    }
    return !1
  }
  Vo.prototype.rg = function (a, b, c) {
    To.set(a, b, {
      Uf: c ? c : 2592e3,
      path: '/__/auth/',
      domain: q.window.location.hostname,
      gk: !0,
    })
  }
  Vo.prototype.ad = function (a) {
    return To.get(a) || null
  }
  var Wo = function () {
    this.Af = new Vo()
  }
  Wo.prototype.zj = function () {
    var a = (q.EXPERIMENTS || {}).DISPLAY_CONTINUE_BUTTON_IF_NOT_REDIRECT
    return 'undefined' === typeof a ? !1 : this.Af.isEnabled(a)
  }
  Wo.prototype.Bj = function () {
    var a = (q.EXPERIMENTS || {}).POPUP_POST_MESSAGE_TO_IFRAME
    return 'undefined' === typeof a ? !1 : this.Af.isEnabled(a)
  }
  Wo.prototype.yj = function () {
    var a = (q.EXPERIMENTS || {}).CHECK_OAUTH_STATE_STORED_BEFORE_REDIRECT
    return 'undefined' === typeof a ? !1 : this.Af.isEnabled(a)
  }
  var Xo = new Wo(),
    Yo = Xo.zj.bind(Xo),
    Zo = Xo.Bj.bind(Xo),
    $o = Xo.yj.bind(Xo)
  var ap = function (a) {
      return 'string' == typeof a.className
        ? a.className
        : (a.getAttribute && a.getAttribute('class')) || ''
    },
    bp = function (a, b) {
      if (a.classList) a.classList.add(b)
      else if (
        a.classList
          ? !a.classList.contains(b)
          : !Ra(a.classList ? a.classList : ap(a).match(/\S+/g) || [], b)
      ) {
        var c = ap(a)
        b = c + (0 < c.length ? ' ' + b : b)
        'string' == typeof a.className
          ? (a.className = b)
          : a.setAttribute && a.setAttribute('class', b)
      }
    }
  function cp(a, b) {
    a = q[a]
    return a && a.prototype
      ? ((b = Object.getOwnPropertyDescriptor(a.prototype, b)) && b.get) || null
      : null
  }
  cp('Element', 'attributes') || cp('Node', 'attributes')
  cp('Element', 'innerHTML') || cp('HTMLElement', 'innerHTML')
  cp('Node', 'nodeName')
  cp('Node', 'nodeType')
  cp('Node', 'parentNode')
  cp('Node', 'childNodes')
  cp('HTMLElement', 'style') || cp('Element', 'style')
  cp('HTMLStyleElement', 'sheet')
  cp('Element', 'namespaceURI') || cp('Node', 'namespaceURI')
  $c(ad(), 'goog.html.sanitizer.SafeDomTreeProcessor')
  var dp = function (a, b) {
    b instanceof Kb && b.constructor === Kb
      ? (b = b.gg)
      : (Fa("expected object of type SafeStyleSheet, got '" + b + "' of type " + ua(b)),
        (b = 'type_error:SafeStyleSheet'))
    md && void 0 !== a.cssText ? (a.cssText = b) : q.trustedTypes ? Zd(a, b) : (a.innerHTML = b)
  } /*

 Copyright 2015 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
  var Z = {
    zi: function () {},
    Ai: function () {},
    Bi: function () {},
    Eg: function () {},
    bi: function () {},
    register: function () {},
    gh: function () {},
  }
  Z = (function () {
    function a(n, r) {
      for (var t = 0; t < k.length; t++)
        if (k[t].className === n) return 'undefined' !== typeof r && (k[t] = r), k[t]
      return !1
    }
    function b(n) {
      n = n.getAttribute('data-upgraded')
      return null === n ? [''] : n.split(',')
    }
    function c(n, r) {
      return -1 !== b(n).indexOf(r)
    }
    function d(n, r, t) {
      if ('CustomEvent' in window && 'function' === typeof window.CustomEvent)
        return new CustomEvent(n, { bubbles: r, cancelable: t })
      var z = document.createEvent('Events')
      z.initEvent(n, r, t)
      return z
    }
    function e(n, r) {
      if ('undefined' === typeof n && 'undefined' === typeof r)
        for (n = 0; n < k.length; n++) e(k[n].className, k[n].ob)
      else {
        if ('undefined' === typeof r) {
          var t = a(n)
          t && (r = t.ob)
        }
        r = document.querySelectorAll('.' + r)
        for (t = 0; t < r.length; t++) f(r[t], n)
      }
    }
    function f(n, r) {
      if (!('object' === typeof n && n instanceof Element))
        throw Error('Invalid argument provided to upgrade MDL element.')
      var t = d('mdl-componentupgrading', !0, !0)
      n.dispatchEvent(t)
      if (!t.defaultPrevented) {
        t = b(n)
        var z = []
        if (r) c(n, r) || z.push(a(r))
        else {
          var aa = n.classList
          k.forEach(function (se) {
            aa.contains(se.ob) && -1 === z.indexOf(se) && !c(n, se.className) && z.push(se)
          })
        }
        r = 0
        for (var nb = z.length, qa; r < nb; r++) {
          if ((qa = z[r])) {
            t.push(qa.className)
            n.setAttribute('data-upgraded', t.join(','))
            var th = new qa.Ri(n)
            th.mdlComponentConfigInternal_ = qa
            p.push(th)
            for (var uh = 0, Dp = qa.lf.length; uh < Dp; uh++) qa.lf[uh](n)
            qa.Xe && (n[qa.className] = th)
          } else throw Error('Unable to find a registered component for the given class.')
          qa = d('mdl-componentupgraded', !0, !1)
          n.dispatchEvent(qa)
        }
      }
    }
    function g(n) {
      Array.isArray(n) || (n = n instanceof Element ? [n] : Array.prototype.slice.call(n))
      for (var r = 0, t = n.length, z; r < t; r++)
        (z = n[r]), z instanceof HTMLElement && (f(z), 0 < z.children.length && g(z.children))
    }
    function h(n) {
      if (n) {
        p.splice(p.indexOf(n), 1)
        var r = n.S.getAttribute('data-upgraded').split(',')
        r.splice(r.indexOf(n.mdlComponentConfigInternal_.pf), 1)
        n.S.setAttribute('data-upgraded', r.join(','))
        r = d('mdl-componentdowngraded', !0, !1)
        n.S.dispatchEvent(r)
      }
    }
    var k = [],
      p = []
    return {
      zi: e,
      Ai: f,
      Bi: g,
      Eg: function () {
        for (var n = 0; n < k.length; n++) e(k[n].className)
      },
      bi: function (n, r) {
        ;(n = a(n)) && n.lf.push(r)
      },
      register: function (n) {
        var r = !0
        if ('undefined' !== typeof n.Xe || 'undefined' !== typeof n.widget) r = n.Xe || n.widget
        var t = {
          Ri: n.constructor || n.constructor,
          className: n.pf || n.classAsString,
          ob: n.ob || n.cssClass,
          Xe: r,
          lf: [],
        }
        k.forEach(function (z) {
          if (z.ob === t.ob)
            throw Error('The provided cssClass has already been registered: ' + z.ob)
          if (z.className === t.className)
            throw Error('The provided className has already been registered')
        })
        if (n.constructor.prototype.hasOwnProperty('mdlComponentConfigInternal_'))
          throw Error(
            'MDL component classes must not have mdlComponentConfigInternal_ defined as a property.'
          )
        a(n.pf, t) || k.push(t)
      },
      gh: function (n) {
        var r = function (z) {
          p.filter(function (aa) {
            return aa.S === z
          }).forEach(h)
        }
        if (n instanceof Array || n instanceof NodeList) for (var t = 0; t < n.length; t++) r(n[t])
        else if (n instanceof Node) r(n)
        else throw Error('Invalid argument provided to downgrade MDL nodes.')
      },
    }
  })()
  Z.upgradeDom = Z.zi
  Z.upgradeElement = Z.Ai
  Z.upgradeElements = Z.Bi
  Z.upgradeAllRegistered = Z.Eg
  Z.registerUpgradedCallback = Z.bi
  Z.register = Z.register
  Z.downgradeElements = Z.gh
  window.componentHandler = Z
  window.addEventListener('load', function () {
    'classList' in document.createElement('div') &&
      'querySelector' in document &&
      'addEventListener' in window &&
      Array.prototype.forEach &&
      (document.documentElement.classList.add('mdl-js'), Z.Eg())
  })
  ;(function () {
    var a = function (b) {
      this.S = b
      this.init()
    }
    window.MaterialProgress = a
    a.prototype.Ji = { Ki: 'mdl-progress__indeterminate' }
    a.prototype.lk = function (b) {
      this.S.classList.contains(this.Ji.Ki) || (this.Yh.style.width = b + '%')
    }
    a.prototype.setProgress = a.prototype.lk
    a.prototype.kk = function (b) {
      this.Ng.style.width = b + '%'
      this.Kg.style.width = 100 - b + '%'
    }
    a.prototype.setBuffer = a.prototype.kk
    a.prototype.init = function () {
      if (this.S) {
        var b = document.createElement('div')
        b.className = 'progressbar bar bar1'
        this.S.appendChild(b)
        this.Yh = b
        b = document.createElement('div')
        b.className = 'bufferbar bar bar2'
        this.S.appendChild(b)
        this.Ng = b
        b = document.createElement('div')
        b.className = 'auxbar bar bar3'
        this.S.appendChild(b)
        this.Kg = b
        this.Yh.style.width = '0%'
        this.Ng.style.width = '100%'
        this.Kg.style.width = '0%'
        this.S.classList.add('is-upgraded')
      }
    }
    Z.register({ constructor: a, pf: 'MaterialProgress', ob: 'mdl-js-progress', Xe: !0 })
  })()
  var ep = {
      '244437093285883777': {
        ar: '\u062c\u0627\u0631\u064d \u0627\u0644\u062a\u0623\u0643\u0651\u062f \u0645\u0646 \u0623\u0646\u0643 \u0644\u0633\u062a \u0628\u0631\u0646\u0627\u0645\u062c \u0631\u0648\u0628\u0648\u062a...',
        ar_xb:
          "\u200f\u202eVerifying\u202c\u200f \u200f\u202eyou\u202c\u200f'\u200f\u202ere\u202c\u200f \u200f\u202enot\u202c\u200f \u200f\u202ea\u202c\u200f \u200f\u202erobot\u202c\u200f...",
        bg: '\u041f\u043e\u0442\u0432\u044a\u0440\u0436\u0434\u0430\u0432\u0430 \u0441\u0435, \u0447\u0435 \u043d\u0435 \u0441\u0442\u0435 \u0440\u043e\u0431\u043e\u0442\u2026',
        ca: "S'est\u00e0 comprovant que no siguis un robot...",
        cs: 'Ov\u011b\u0159ujeme, zda nejste robot\u2026',
        da: 'Bekr\u00e6fter, at du ikke er en robot\u2026',
        de: 'Best\u00e4tigen Sie bitte, dass Sie kein Roboter sind.',
        el: '\u0395\u03c0\u03b1\u03bb\u03ae\u03b8\u03b5\u03c5\u03c3\u03b7 \u03cc\u03c4\u03b9 \u03b4\u03b5\u03bd \u03b5\u03af\u03c3\u03c4\u03b5 \u03c1\u03bf\u03bc\u03c0\u03cc\u03c4\u2026',
        en: "Verifying you're not a robot...",
        en_gb: "Verifying you're not a robot...",
        en_xa:
          "[V\u00e9\u0155\u00ee\u0192\u00fd\u00ee\u00f1\u011d \u00fd\u00f6\u00fb'\u0155\u00e9 \u00f1\u00f6\u0163 \u00e5 \u0155\u00f6\u0431\u00f6\u0163... one two three four five six seven]",
        es: 'Estamos comprobando que no eres un robot...',
        es_419: 'Estamos verificando que no eres un robot\u2026',
        fa: '\u062f\u0631\u062d\u0627\u0644 \u062a\u0623\u06cc\u06cc\u062f \u0627\u06cc\u0646\u06a9\u0647 \u0634\u0645\u0627 \u0631\u0628\u0627\u062a \u0646\u06cc\u0633\u062a\u06cc\u062f\u2026',
        fi: 'Tarkistamme, ettet ole robotti\u2026',
        fil: 'Vine-verify na hindi ka robot...',
        fr: "Nous v\u00e9rifions que vous n'\u00eates pas un robot\u2026",
        hi: '\u0906\u092a \u0930\u094b\u092c\u094b\u091f \u0928\u0939\u0940\u0902 \u0939\u0948\u0902 \u0907\u0938\u0915\u0940 \u092a\u0941\u0937\u094d\u091f\u093f \u0915\u0940 \u091c\u093e \u0930\u0939\u0940 \u0939\u0948...',
        hr: 'Potvr\u0111ujemo da niste robot...',
        hu: 'Annak ellen\u0151rz\u00e9se, hogy \u00d6n nem robot...',
        id: 'Memverifikasi bahwa Anda bukan robot...',
        it: 'Stiamo verificando che non sei un robot\u2026',
        iw: '\u05de\u05d5\u05d5\u05d3\u05d0 \u05e9\u05d0\u05d9\u05e0\u05da \u05e8\u05d5\u05d1\u05d5\u05d8...',
        ja: '\u30ed\u30dc\u30c3\u30c8\u306b\u3088\u308b\u64cd\u4f5c\u3067\u306a\u3044\u3053\u3068\u3092\u78ba\u8a8d\u3057\u3066\u3044\u307e\u3059...',
        ko: '\ub85c\ubd07\uc774 \uc544\ub2cc \uc2e4\uc81c \uc0ac\uc6a9\uc790\uc784\uc744 \ud655\uc778 \uc911...',
        lt: 'Tikrinama, ar nesate robotas...',
        lv: 'Notiek verifik\u0101cija, lai p\u0101rliecin\u0101tos, ka neesat robots...',
        nl: 'Verifi\u00ebren of u geen robot bent...',
        no: 'Bekrefter at du ikke er en robot ...',
        pl: 'Potwierd\u017a, \u017ce nie jeste\u015b robotem.',
        pt: 'Verificando se voc\u00ea n\u00e3o \u00e9 um rob\u00f4...',
        pt_pt: 'A verificar se \u00e9 um rob\u00f4...',
        ro: 'Se verific\u0103 dac\u0103 sunte\u021bi un robot...',
        ru: '\u041d\u0430\u043c \u043d\u0443\u0436\u043d\u043e \u0443\u0431\u0435\u0434\u0438\u0442\u044c\u0441\u044f, \u0447\u0442\u043e \u0432\u044b \u043d\u0435 \u0440\u043e\u0431\u043e\u0442...',
        sk: 'Overuje sa, \u017ee nie ste robot...',
        sl: 'Preverjamo, da niste robot ...',
        sr: '\u041f\u043e\u0442\u0432\u0440\u0452\u0443\u0458\u0435\u043c\u043e \u0434\u0430 \u043d\u0438\u0441\u0442\u0435 \u0440\u043e\u0431\u043e\u0442\u2026',
        sv: 'Verifierar att du inte \u00e4r en robot \u2026',
        th: '\u0e01\u0e33\u0e25\u0e31\u0e07\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e27\u0e48\u0e32\u0e04\u0e38\u0e13\u0e44\u0e21\u0e48\u0e43\u0e0a\u0e48\u0e2b\u0e38\u0e48\u0e19\u0e22\u0e19\u0e15\u0e4c...',
        tr: 'Robot olmad\u0131\u011f\u0131n\u0131z do\u011frulan\u0131yor...',
        uk: '\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u044f\u0454\u043c\u043e, \u0447\u0438 \u0432\u0438 \u043d\u0435 \u0440\u043e\u0431\u043e\u0442\u2026',
        vi: '\u0110ang x\u00e1c minh b\u1ea1n kh\u00f4ng ph\u1ea3i l\u00e0 r\u00f4 b\u1ed1t...',
        zh_cn: '\u6b63\u5728\u9a8c\u8bc1\u60a8\u662f\u5426\u4e3a\u673a\u5668\u4eba\u2026',
        zh_tw: '\u6b63\u5728\u9a57\u8b49\u60a8\u662f\u5426\u70ba\u81ea\u52d5\u7a0b\u5f0f...',
      },
    },
    fp = null,
    gp = 'ar ar_xb iw fa ps sd so tk ug ur he yi syc ks ku'.split(' '),
    hp = function (a, b) {
      if (!fp) {
        fp = {}
        for (var c in ep) fp[ep[c].en] = c
      }
      b = b.replace('-', '_').toLowerCase()
      return 'undefined' !== typeof fp[a] && ((c = fp[a]), 'undefined' !== typeof ep[c][b])
        ? ep[c][b]
        : a
    }
  var ip = function (a, b) {
    this.vk = a
    this.tk = b
    this.S = null
  }
  ip.prototype.render = function (a) {
    var b = (0, this.vk)(this.tk || ge, void 0)
    var c = Ba || (Ba = new de())
    if (b && b.Uj) c = b.Uj()
    else {
      c = c.createElement('DIV')
      b: if (u(b)) {
        if (b.wi) {
          var d = b.wi()
          if (d instanceof $b) {
            b = d
            break b
          }
        }
        Fa('Soy template output is unsafe for use as HTML: ' + b)
        b = cc('zSoyz')
      } else b = cc(String(b))
      d = b.bb()
      var e = d.match(fe)
      x(
        !e,
        'This template starts with a %s, which cannot be a child of a <div>, as required by soy internals. Consider using goog.soy.renderElement instead.\nTemplate output: %s',
        e && e[0],
        d
      )
      d = c
      if (fc()) for (; d.lastChild; ) d.removeChild(d.lastChild)
      d.innerHTML = ac(b)
    }
    1 == c.childNodes.length && ((b = c.firstChild), 1 == b.nodeType && (c = b))
    this.S = c
    Ud(a, this.S)
    this.Kd()
  }
  ip.prototype.Kd = function () {}
  ip.prototype.Pd = function () {}
  ip.prototype.Hb = function () {
    this.S && (this.Pd(), Wd(this.S), (this.S = null))
  }
  var jp = function () {
    ip.call(this, he)
  }
  m(jp, ip)
  jp.prototype.Kd = function () {
    var a = Nd('progressBar')
    window.componentHandler &&
      window.componentHandler.upgradeElement &&
      window.componentHandler.upgradeElement(a)
  }
  jp.prototype.Pd = function () {
    var a = Nd('progressBar')
    window.componentHandler &&
      window.componentHandler.downgradeElements &&
      window.componentHandler.downgradeElements(a)
  }
  var kp = function (a, b) {
    ip.call(this, ie, { appName: a })
    this.xe = b
    this.ab = null
  }
  m(kp, ip)
  kp.prototype.Kd = function () {
    var a = Nd('continue'),
      b = this
    this.ab = Re(a, 'click', function () {
      b.xe()
    })
  }
  kp.prototype.Pd = function () {
    this.ab && ($e(this.ab), (this.ab = null))
  }
  var lp = function (a) {
    ip.call(this, je, { errorMessage: a })
  }
  m(lp, ip)
  var mp = function (a, b) {
    ip.call(this, ke, {})
    this.xe = a || null
    this.qc = b || null
    this.ab = null
  }
  m(mp, ip)
  mp.prototype.Kd = function () {
    var a = Nd('verify'),
      b = this
    this.xe &&
      (this.ab = Re(a, 'click', function () {
        b.xe()
      }))
    a = Nd('app-verification-progress-bar')
    window.componentHandler &&
      window.componentHandler.upgradeElement &&
      window.componentHandler.upgradeElement(a)
    if ((a = Nd('status-container-label')) && this.qc) {
      var c = hp(ce(a), this.qc)
      Zd(a, c)
      Ra(gp, this.qc.replace('-', '_').toLowerCase()) && bp(a, 'firebase-rtl')
    }
  }
  var np = function () {
    var a = Nd('status-container')
    bp(a, 'firebase-hidden')
  }
  mp.prototype.Pd = function () {
    this.ab && ($e(this.ab), (this.ab = null))
    var a = Nd('app-verification-progress-bar')
    window.componentHandler &&
      window.componentHandler.downgradeElements &&
      window.componentHandler.downgradeElements(a)
  }
  var op = function (a) {
      this.lg = Rd('DIV', { id: 'progressBarContainer' })
      var b = this
      this.Ab = new nm()
      this.uri = E(a)
      this.apiKey = D(this.uri, 'apiKey') || null
      this.appName = D(this.uri, 'appName') || ''
      this.authType = D(this.uri, 'authType') || null
      this.Jb = D(this.uri, 'eventId') || null
      this.Ca = D(this.uri, 'redirectUrl') || null
      this.ze = D(this.uri, 'v') || null
      this.fk = (a = D(this.uri, 'scopes')) ? a.split(',') : []
      this.Wd = {}
      this.sessionId = D(this.uri, 'sessionId') || null
      this.cf = D(this.uri, 'appDisplayName') || null
      this.Pa = D(this.uri, 'apn') || null
      this.sb = D(this.uri, 'ibi') || null
      this.Xd = D(this.uri, 'eid') || null
      this.clientId = D(this.uri, 'clientId') || null
      this.pb = D(this.uri, 'appId') || null
      ;(this.Hg = new zc(this.uri.nc).get('fac') || null) && console.log('App Check token found.')
      this.wh = D(this.uri, 'hl') || null
      this.Xb = D(this.uri, 'sha1Cert') || null
      this.publicKey = D(this.uri, 'publicKey') || null
      this.Qe = D(this.uri, 'tid') || null
      a = vh(D(this.uri, 'customParameters') || '{}')
      this.Wd = 'object' == typeof a ? a || {} : {}
      this.providerId = D(this.uri, 'providerId') || null
      this.De =
        'string' === typeof q.POST_BODY && '{{POST_BODY}}' != q.POST_BODY && 0 != q.POST_BODY.length
          ? q.POST_BODY
          : null
      this.providerId && (this.Wd = sh(this.Wd, Th(this.providerId)))
      this.Yc = (a = D(this.uri, 'fw')) ? a.split(',') : []
      this.mode = 'oauth'
      this.Ub = null
      this.Th = this.Wf = $g().then(function () {
        document.body.appendChild(b.lg)
        b.Ub = new jp()
        b.Ub.render(b.lg)
      })
      this.ib = null
    },
    pp = {},
    qp = { gf: ['facebook.com'] },
    rp = {},
    sp = { gf: ['facebook.com', 'apple.com'] },
    tp = {},
    up = function (a) {
      if (a.Ca)
        try {
          return wc(xc(vc(E(a.Ca), ''), ''), '').toString()
        } catch (b) {}
      else {
        if (a.Pa) return 'file://asset/www/index.html?apn=' + encodeURIComponent(a.Pa)
        if (a.sb) return 'file://asset/www/index.html?ibi=' + encodeURIComponent(a.sb)
      }
      return null
    },
    vp = function (a, b) {
      return D(a, b)
    },
    wp = function (a) {
      if (!a.apiKey) throw (Bh('No API key available'), new P('bad-request'))
      a.ib = new mj(a.apiKey, Jg(a.Xd), kh('Handler', '2.20.0', a.Yc), a.Hg)
      a.ib.C = a.Qe
    },
    yp = function (a) {
      xp(a)
      a.Wf.then(function () {
        a.Ub = new jp()
        a.Ub.render(a.lg)
      })
    },
    xp = function (a) {
      a.Th && a.Th.cancel()
      a.Ub && (a.Ub.Hb(), (a.Ub = null))
    }
  op.prototype.pc = function () {
    return this.apiKey ? this.apiKey + ':' + (this.appName || '') : null
  }
  op.prototype.handleError = function (a) {
    var b = this
    if ('auth/bad-request' === a.code)
      return $g().then(function () {
        xp(b)
        new lp(a.message).render(document.body)
      })
    var c = new Xh(this.authType || 'unknown', this.Jb, null, null, a)
    return zp(this, c)
  }
  var Ap = function (a, b, c, d) {
      b = new Xh(a.authType, a.Jb, b, c, null, d, a.Qe)
      return zp(a, b)
    },
    zp = function (a, b) {
      var c = a.pc(),
        d = !1,
        e = I()
      Vg() && !a.Ca && (e = wg(500))
      return e
        .then(function () {
          if ((a.Pa || a.sb) && a.ib)
            return (
              (d = !0), Bp(a.ib, b, a.Pa, a.sb, a.clientId, a.Xb, a.cf, a.Jb, a.pb, a.publicKey)
            )
          if ('verifyApp' === a.authType && b.Y) return (d = !0), Cp(b.getError())
          if (c) {
            var f = a.Ab
            return b.getType().match(/Redirect$/) ? f.o.set(mm, b.m(), c) : Ep(f, c, b)
          }
        })
        .then(function () {
          return a.Ab.o.remove(pm)
        })
        .then(function () {
          if (c) return a.Ab.o.remove(om, c)
        })
        .Bb(function () {
          d
            ? xp(a)
            : /redirect/i.test(a.authType || '')
            ? (xp(a), Eh(), Og(a.Ca))
            : a.ze && ph() && !eh()
            ? a.apiKey
              ? setTimeout(function () {
                  xp(a)
                  Tg()
                }, 15e3)
              : (xp(a), Tg())
            : (xp(a), Tg())
        })
    },
    Bp = function (a, b, c, d, e, f, g, h, k, p) {
      return I()
        .then(function () {
          if ('verifyApp' === b.getType() && d) {
            if (!e && !k) throw new P('invalid-app-id')
            Fp(null, b, c, d, e, f, g, h, k, p)
          } else
            return 'verifyApp' === b.getType() && c
              ? Fp(null, b, c, d, e, f, g, h, k, p)
              : c
              ? Ij(a, c, f).then(function () {
                  var n = null
                  n = f ? I('playservices.app.goo.gl') : Q(a, sk, { returnDynamicLink: !0 })
                  return n.then(function (r) {
                    Fp(r, b, c, d, e, f, g, h, k, p)
                  })
                })
              : (e ? Jj(a, e) : k ? Kj(a, k) : Hj(a, d)).then(function () {
                  Fp(null, b, c, d, e, f, g, h, k, p)
                })
        })
        .h(function (n) {
          return Cp(n)
        })
    },
    Cp = function (a) {
      var b =
        !a ||
        ('auth/dynamic-link-not-activated' != a.code &&
          'auth/invalid-app-id' != a.code &&
          'auth/invalid-oauth-client-id' != a.code &&
          'auth/invalid-api-key' != a.code &&
          'auth/internal-error' != a.code &&
          'auth/invalid-cert-hash' != a.code)
          ? (Fd['fireauth.oauthhelper.ui.soy.temporaryErrorMessage']
              ? Fd['fireauth.oauthhelper.ui.soy.temporaryErrorMessage'](void 0, void 0)
              : 'An error occurred. Please try again later.'
            ).toString()
          : a.message
      return $g().then(function () {
        new lp(b).render(document.body)
      })
    },
    Fp = function (a, b, c, d, e, f, g, h, k, p) {
      p = p ? 'android_non_gmscore' : c ? 'android' : 'ios'
      var n = c ? c : d,
        r = null
      f
        ? ((r = Gp(b, c, h, p)), (n = 'com.google.android.gms'))
        : (e || k) && d && 'verifyApp' !== b.getType() && !b.Y
        ? ((r =
            window.location.protocol +
            '//' +
            window.location.host +
            '/__/auth/callback?authType=' +
            encodeURIComponent(b.getType()) +
            '&link=' +
            encodeURIComponent(b.Xa)),
          h && (r += '&eventId=' + h))
        : b.Y
        ? ((r =
            window.location.protocol +
            '//' +
            window.location.host +
            '/__/auth/callback?firebaseError=' +
            encodeURIComponent(qh(b.getError().m())) +
            '&authType=' +
            encodeURIComponent(b.getType())),
          h && (r += '&eventId=' + h))
        : (r = b.Xa.replace('/handler', '/callback'))
      a = new gi(a, p, n, window.location.host, r, e, k)
      'android' == p ? (hi(a, g), Og(a.toString(!f))) : Og(a.toString(), void 0, !0)
      setTimeout(function () {
        Ng(null)
      }, 4e3)
    },
    Gp = function (a, b, c, d) {
      if ('android_non_gmscore' === d) {
        d = a.Xa
        var e = window.location.protocol + '//' + window.location.host + '/__/auth/handler'
        b =
          'intent://firebase.auth/#Intent;scheme=' +
          ('verifyApp' === a.getType() ? 'recaptcha' : 'genericidp') +
          ';package=' +
          b +
          ';S.authType=' +
          a.getType() +
          ';'
        c && (b += 'S.eventId=' + c + ';')
        a.Y
          ? (b += 'S.firebaseError=' + encodeURIComponent(qh(a.getError().m())) + ';')
          : ((b += 'S.link=' + encodeURIComponent(d) + ';'), (b += 'B.encryptionEnabled=false;'))
        b += 'S.browser_fallback_url=' + encodeURIComponent(e) + ';'
        a = b + 'end;'
      } else
        (d = Gc('https', 'fir-auth-gms.firebaseapp.com', null, '/', null, null)),
          C(d, 'authType', a.getType()),
          C(d, 'cpn', b),
          c && C(d, 'eventId', c),
          a.Y ? C(d, 'firebaseError', qh(a.getError().m())) : C(d, 'link', a.Xa),
          (a = d.toString())
      return a
    },
    Ep = function (a, b, c) {
      var d = (q.window && q.window.opener) || null
      if (Zo() && d && /popup/i.test(c.getType() || '')) {
        for (var e = [], f = b.split(':'), g = 0; g < d.frames.length; g++) {
          var h = d.frames[g]
          try {
            var k = E(h.location.href)
            f[0] === D(k, 'apiKey') &&
              f[1] === D(k, 'appName') &&
              e.push(new el(new cl(h, h.location.origin)))
          } catch (n) {}
        }
        if (0 === e.length) return rm(a, b, c)
        var p = []
        e.forEach(function (n) {
          var r = !1
          p.push(
            fl(n, 'sendAuthEvent', { storageKey: b, authEvent: c.m() }, 2e4).then(function (t) {
              for (var z = 0; z < t.length; z++) t[z].fulfilled && t[z].value && (r = t[z].value)
              if (!r) throw Error('Unable to send the auth event')
            })
          )
        })
        return Sf(p)
          .h(function () {
            return rm(a, b, c)
          })
          .then(function () {
            e.forEach(function (n) {
              n.close()
            })
          })
      }
      return rm(a, b, c)
    }
  var Hp = function (a) {
    this.Ug = !1
    this.Pc = Rd('DIV')
    if ('verifyApp' !== vp(E(a), 'authType')) throw Error('Invalid mode!')
    this.Ta = { size: 'invisible', type: 'image', tabindex: 0, theme: 'light' }
    op.call(this, a)
    this.Md = new mp(null, this.wh)
    this.nf = this.Db = null
    this.mode = 'verifyApp'
  }
  w(Hp, op)
  Hp.prototype.start = function () {
    var a = this
    return this.cb()
      .then(function () {
        return Ip(a)
      })
      .h(function (b) {
        a.Db && a.Db.clear()
        yp(a)
        a.Md && a.Md.Hb()
        return b instanceof P ? a.handleError(b) : a.handleError(new P('internal-error'))
      })
  }
  Hp.prototype.cb = function () {
    var a = this
    return I()
      .then(function () {
        if (
          !((a.apiKey && a.sb && (a.clientId || a.pb)) || (a.apiKey && a.Pa && a.Xb && a.publicKey))
        ) {
          if (!a.apiKey) throw new P('invalid-api-key')
          if (!a.clientId && !a.pb) throw new P('invalid-app-id')
          throw new P('internal-error')
        }
      })
      .then(function () {
        wp(a)
        if (a.clientId) return Jj(a.ib, a.clientId)
        if (a.pb) return Kj(a.ib, a.pb)
        if (a.Pa && a.Xb) return Ij(a.ib, a.Pa, a.Xb)
        throw new P('internal-error')
      })
  }
  var Ip = function (a) {
    var b, c
    return a.Wf.then(function () {
      c = function () {
        var d = Xd()
        d && d.style.width && (d.style.width = '')
      }
      a.Ug || ((a.Ug = !0), document.body.appendChild(a.Pc))
      xp(a)
      a.Md.render(a.Pc)
      b = Nd('verify')
      a.Db = new Zk(
        a.apiKey,
        b,
        a.Ta,
        function () {
          return a.wh
        },
        a.ze,
        Jg(a.Xd)
      )
      return a.Db.render()
    })
      .then(function () {
        b.click()
        return wg(2500)
      })
      .then(function () {
        c()
        np()
        a.nf = setInterval(function () {
          Xd().style.visibility && 'hidden' === Xd().style.visibility && b.click()
        }, 1e3)
        q.window.addEventListener('orientationchange', c)
        q.window.addEventListener('resize', c)
        return a.Db.verify()
      })
      .then(function (d) {
        yp(a)
        clearInterval(a.nf)
        q.window.removeEventListener('orientationchange', c)
        q.window.removeEventListener('resize', c)
        a.Db.clear()
        a.Db = null
        d =
          window.location.protocol +
          '//' +
          window.location.host +
          '/__/auth/callback?authType=' +
          encodeURIComponent(a.mode) +
          '&recaptchaToken=' +
          encodeURIComponent(d)
        a.Jb && (d += '&eventId=' + encodeURIComponent(a.Jb))
        a.Md.Hb()
        return Ap(a, d, 'blank')
      })
      .h(function (d) {
        clearInterval(a.nf)
        q.window.removeEventListener('orientationchange', c)
        q.window.removeEventListener('resize', c)
        throw d
      })
  }
  var Jp = function (a) {
    this.yd = []
    op.call(this, a)
  }
  w(Jp, op)
  var Kp = function (a) {
    var b = (q.window && q.window.opener) || null
    if (!a.Ca && b && /popup/i.test(a.authType || '')) {
      for (var c = 0; c < b.frames.length; c++) {
        var d = b.frames[c]
        try {
          var e = E(d.location.href)
          a.apiKey === D(e, 'apiKey') &&
            a.appName === D(e, 'appName') &&
            a.yd.push(new el(new cl(d, d.location.origin)))
        } catch (f) {}
      }
      b = []
      for (c = 0; c < a.yd.length; c++)
        b.push(
          fl(a.yd[c], 'getParentOrigin', null, 2e4).then(function (f) {
            for (var g = 0; g < f.length; g++) f[g].fulfilled && f[g].value && (a.Ca = f[g].value)
            if (!a.Ca) throw Error('Unable to determine origin')
          })
        )
      return Sf(b)
        .h(function () {})
        .then(function () {
          for (var f = 0; f < a.yd.length; f++) a.yd[f].close()
        })
    }
    return I()
  }
  Jp.prototype.start = function () {
    var a = this
    return this.cb()
      .then(function () {
        return Lp(a, a.providerId, a.Wd, a.fk, a.sessionId)
      })
      .h(function (b) {
        return b instanceof P ? a.handleError(b) : a.handleError(new P('internal-error'))
      })
  }
  Jp.prototype.cb = function () {
    var a = this
    return I().then(function () {
      wp(a)
      if (a.apiKey && a.authType && a.providerId) {
        var b = new Zh(
          a.apiKey,
          a.appName,
          a.authType,
          a.Jb,
          a.Ca,
          a.ze,
          a.cf,
          a.Pa,
          a.sb,
          a.Xd,
          a.Yc,
          a.clientId,
          a.Xb,
          a.Qe,
          a.providerId,
          a.pb,
          a.publicKey
        )
        return (
          a.Ca
            ? Gj(a.ib)
                .h(function () {
                  Bh('Unable to verify that the app domain is authorized')
                  throw new P('bad-request')
                })
                .then(function (c) {
                  if (!Yg(c, a.Ca)) throw (Bh('App domain is unauthorized'), new P('bad-request'))
                })
            : I()
        ).then(function () {
          var c = a.Pa ? (a.Xb ? qp : rp) : a.sb ? (a.clientId || a.pb ? sp : tp) : pp
          if (c.gf && c.gf.includes(a.providerId))
            throw new P(
              'operation-not-supported-in-this-environment',
              'This web-based operation for the ' +
                a.providerId +
                " provider is not supported in this environment. Please use the identity provider's native SDK instead."
            )
          return a.Ab.o.set(pm, b.m())
        })
      }
      Bh('Request is missing required data')
      throw new P('bad-request')
    })
  }
  var Lp = function (a, b, c, d, e) {
      var f,
        g = wc(xc(E(a.uri.toString()), ''), '').toString(),
        h = null
      return Cj(a.ib, b, g, c, d, e)
        .then(function (k) {
          f = k
          return Kp(a)
        })
        .then(function () {
          var k = E(f.authUri),
            p = up(a),
            n
          ;(n =
            (n = q.window) && n.innerWidth && n.innerHeight
              ? { width: parseFloat(n.innerWidth), height: parseFloat(n.innerHeight) }
              : null) &&
            800 > n.width &&
            'facebook.com' == b &&
            !a.Ca &&
            C(k, 'display', 'popup')
          p && C(k, 'context_uri', p)
          h = k.toString()
          k = a.pc()
          return a.Ab.o.set(om, f.sessionId, k)
        })
        .then(function () {
          return Mp(a)
        })
        .then(function () {
          xp(a)
          var k = Mg()
          Og(h)
          Yo() &&
            'Safari' === Qg(L()) &&
            setTimeout(function () {
              k === Mg() &&
                new kp(null, function () {
                  a.handleError(new P('user-cancelled'))
                }).render(document.body)
            }, 1e3)
        })
    },
    Mp = function (a) {
      if (!$o()) return I()
      var b = 0
      return new H(function (c, d) {
        var e = function () {
          10 <= b++
            ? (Bh('Unable to save initial state.'),
              d(
                new P(
                  'bad-request',
                  'Unable to save initial state. This may happen if browser sessionStorage is inaccessible.'
                )
              ))
            : qm(a.Ab).then(function (f) {
                f ? c() : setTimeout(e, 1)
              })
        }
        e()
      })
    }
  var Np = function (a) {
    op.call(this, a)
  }
  m(Np, op)
  Np.prototype.start = function () {
    var a = this
    return this.cb()
      .then(function () {
        return Op(a)
      })
      .h(function (b) {
        return b instanceof P ? a.handleError(b) : a.handleError(new P('internal-error'))
      })
  }
  Np.prototype.cb = function () {
    var a = this
    return qm(this.Ab).then(function (b) {
      if (!b)
        throw (
          (Bh('Unable to process request due to missing initial state.'),
          new P(
            'bad-request',
            'Unable to process request due to missing initial state. This may happen if browser sessionStorage is inaccessible or accidentally cleared.'
          ))
        )
      var c = b && b.A,
        d = b && b.getType()
      if (!c) throw new P('invalid-api-key')
      if (!d) throw new P('internal-error')
      a.apiKey = b.A
      a.Xd = b.hh
      a.Yc = b.U
      wp(a)
      a.appName = b.B
      a.authType = b.getType()
      a.Jb = b.T
      a.Ca = b.Dc
      a.ze = b.Qa
      a.cf = b.tf
      a.Pa = b.ec
      a.sb = b.ed
      a.clientId = b.Fb
      a.Xb = b.ni
      a.Qe = b.C
      a.providerId = b.Ac
      a.pb = b.Kb
      a.publicKey = b.Zh
    })
  }
  var Pp = function (a, b) {
      if (a.De && 'apple.com' === a.providerId) {
        b = E(b)
        var c = Hh(a.De)
        a.De = null
        for (var d in c) c.hasOwnProperty(d) && C(b, d, c[d])
        return b.toString()
      }
      return b
    },
    Op = function (a) {
      var b = Pp(a, a.uri.toString()),
        c = a.pc()
      return a.Ab.oc(c).then(function (d) {
        if (!d) throw new P('internal-error')
        return Ap(a, b, d, a.De)
      })
    }
  var Qp = null
  function Rp(a) {
    Sp()
    $g().then(function () {
      var b = new kp(a.appName, function () {
        b.Hb()
        Og(a.toString())
        setTimeout(function () {
          Ng(null)
        }, 4e3)
      })
      b.render(document.body)
    })
  }
  function Tp(a) {
    var b = a
    try {
      var c = Wh(vh(a))
      c && c.message && (b = c.message)
    } catch (d) {}
    Sp()
    $g().then(function () {
      new lp(b).render(document.body)
    })
  }
  function Sp() {
    var a = gb(
      hb(
        '.mdl-card{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;font-size:16px;font-weight:400;min-height:200px;overflow:hidden;width:330px;z-index:1;position:relative;background:#fff;border-radius:2px;-moz-box-sizing:border-box;box-sizing:border-box}.mdl-card__media{background-color:#ff4081;background-repeat:repeat;background-position:50% 50%;background-size:cover;background-origin:padding-box;background-attachment:scroll;-moz-box-sizing:border-box;box-sizing:border-box}.mdl-card__title{-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;color:#000;display:block;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:stretch;-webkit-justify-content:stretch;-moz-box-pack:stretch;-ms-flex-pack:stretch;justify-content:stretch;line-height:normal;padding:16px 16px;-webkit-perspective-origin:165px 56px;perspective-origin:165px 56px;-webkit-transform-origin:165px 56px;transform-origin:165px 56px;-moz-box-sizing:border-box;box-sizing:border-box}.mdl-card__title.mdl-card--border{border-bottom:1px solid rgba(0,0,0,.1)}.mdl-card__title-text{-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end;color:inherit;display:block;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;font-size:24px;font-weight:300;line-height:normal;overflow:hidden;-webkit-transform-origin:149px 48px;transform-origin:149px 48px;margin:0}.mdl-card__subtitle-text{font-size:14px;color:rgba(0,0,0,.54);margin:0}.mdl-card__supporting-text{color:rgba(0,0,0,.54);font-size:1rem;line-height:18px;overflow:hidden;padding:16px 16px;width:90%}.mdl-card__supporting-text.mdl-card--border{border-bottom:1px solid rgba(0,0,0,.1)}.mdl-card__actions{font-size:16px;line-height:normal;width:100%;background-color:transparent;padding:8px;-moz-box-sizing:border-box;box-sizing:border-box}.mdl-card__actions.mdl-card--border{border-top:1px solid rgba(0,0,0,.1)}.mdl-card--expand{-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1}.mdl-card__menu{position:absolute;right:16px;top:16px}.mdl-button{background:transparent;border:none;border-radius:2px;color:#000;position:relative;height:36px;margin:0;min-width:64px;padding:0 16px;display:inline-block;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;text-transform:uppercase;line-height:1;letter-spacing:0;overflow:hidden;will-change:box-shadow;-webkit-transition:box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);transition:box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);outline:none;cursor:pointer;text-decoration:none;text-align:center;line-height:36px;vertical-align:middle}.mdl-button::-moz-focus-inner{border:0}.mdl-button:hover{background-color:hsla(0,0%,62%,.2)}.mdl-button:focus:not(:active){background-color:rgba(0,0,0,.12)}.mdl-button:active{background-color:hsla(0,0%,62%,.4)}.mdl-button.mdl-button--colored{color:#3f51b5}.mdl-button.mdl-button--colored:focus:not(:active){background-color:rgba(0,0,0,.12)}input.mdl-button[type=submit]{-webkit-appearance:none}.mdl-button--raised{background:hsla(0,0%,62%,.2);box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)}.mdl-button--raised:active{box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);background-color:hsla(0,0%,62%,.4)}.mdl-button--raised:focus:not(:active){box-shadow:0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);background-color:hsla(0,0%,62%,.4)}.mdl-button--raised.mdl-button--colored{background:#3f51b5;color:#fff}.mdl-button--raised.mdl-button--colored:hover{background-color:#3f51b5}.mdl-button--raised.mdl-button--colored:active{background-color:#3f51b5}.mdl-button--raised.mdl-button--colored:focus:not(:active){background-color:#3f51b5}.mdl-button--raised.mdl-button--colored .mdl-ripple{background:#fff}.mdl-button--fab{border-radius:50%;font-size:24px;height:56px;margin:auto;min-width:56px;width:56px;padding:0;overflow:hidden;background:hsla(0,0%,62%,.2);box-shadow:0 1px 1.5px 0 rgba(0,0,0,.12),0 1px 1px 0 rgba(0,0,0,.24);position:relative;line-height:normal}.mdl-button--fab .material-icons{position:absolute;top:50%;left:50%;-webkit-transform:translate(-12px,-12px);transform:translate(-12px,-12px);line-height:24px;width:24px}.mdl-button--fab.mdl-button--mini-fab{height:40px;min-width:40px;width:40px}.mdl-button--fab .mdl-button__ripple-container{border-radius:50%;-webkit-mask-image:-webkit-radial-gradient(circle,#fff,#000)}.mdl-button--fab:active{box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);background-color:hsla(0,0%,62%,.4)}.mdl-button--fab:focus:not(:active){box-shadow:0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);background-color:hsla(0,0%,62%,.4)}.mdl-button--fab.mdl-button--colored{background:#ff4081;color:#fff}.mdl-button--fab.mdl-button--colored:hover{background-color:#ff4081}.mdl-button--fab.mdl-button--colored:focus:not(:active){background-color:#ff4081}.mdl-button--fab.mdl-button--colored:active{background-color:#ff4081}.mdl-button--fab.mdl-button--colored .mdl-ripple{background:#fff}.mdl-button--icon{border-radius:50%;font-size:24px;height:32px;margin-left:0;margin-right:0;min-width:32px;width:32px;padding:0;overflow:hidden;color:inherit;line-height:normal}.mdl-button--icon .material-icons{position:absolute;top:50%;left:50%;-webkit-transform:translate(-12px,-12px);transform:translate(-12px,-12px);line-height:24px;width:24px}.mdl-button--icon.mdl-button--mini-icon{height:24px;min-width:24px;width:24px}.mdl-button--icon.mdl-button--mini-icon .material-icons{top:0;left:0}.mdl-button--icon .mdl-button__ripple-container{border-radius:50%;-webkit-mask-image:-webkit-radial-gradient(circle,#fff,#000)}.mdl-button__ripple-container{display:block;height:100%;left:0;position:absolute;top:0;width:100%;z-index:0;overflow:hidden}.mdl-button.mdl-button--disabled .mdl-button__ripple-container .mdl-ripple,.mdl-button[disabled] .mdl-button__ripple-container .mdl-ripple{background-color:transparent}.mdl-button--primary.mdl-button--primary{color:#3f51b5}.mdl-button--primary.mdl-button--primary .mdl-ripple{background:#fff}.mdl-button--primary.mdl-button--primary.mdl-button--fab,.mdl-button--primary.mdl-button--primary.mdl-button--raised{color:#fff;background-color:#3f51b5}.mdl-button--accent.mdl-button--accent{color:#ff4081}.mdl-button--accent.mdl-button--accent .mdl-ripple{background:#fff}.mdl-button--accent.mdl-button--accent.mdl-button--fab,.mdl-button--accent.mdl-button--accent.mdl-button--raised{color:#fff;background-color:#ff4081}.mdl-button.mdl-button--disabled.mdl-button--disabled,.mdl-button[disabled][disabled]{color:rgba(0,0,0,.26);cursor:default;background-color:transparent}.mdl-button--fab.mdl-button--disabled.mdl-button--disabled,.mdl-button--fab[disabled][disabled]{background-color:rgba(0,0,0,.12);color:rgba(0,0,0,.26)}.mdl-button--raised.mdl-button--disabled.mdl-button--disabled,.mdl-button--raised[disabled][disabled]{background-color:rgba(0,0,0,.12);color:rgba(0,0,0,.26);box-shadow:none}.mdl-button--colored.mdl-button--disabled.mdl-button--disabled,.mdl-button--colored[disabled][disabled]{color:rgba(0,0,0,.26)}.mdl-button .material-icons{vertical-align:middle}.mdl-progress{display:block;position:relative;height:4px;width:500px;max-width:100%}.mdl-progress>.bar{display:block;position:absolute;top:0;bottom:0;width:0;-webkit-transition:width .2s cubic-bezier(.4,0,.2,1);transition:width .2s cubic-bezier(.4,0,.2,1)}.mdl-progress>.progressbar{background-color:#3f51b5;z-index:1;left:0}.mdl-progress>.bufferbar{background-image:-webkit-gradient(linear,left top,right top,from(hsla(0,0%,100%,.7)),to(hsla(0,0%,100%,.7))),-webkit-gradient(linear,left top,right top,from(#3f51b5),to(#3f51b5));background-image:-webkit-linear-gradient(left,hsla(0,0%,100%,.7),hsla(0,0%,100%,.7)),-webkit-linear-gradient(left,#3f51b5,#3f51b5);background-image:linear-gradient(90deg,hsla(0,0%,100%,.7),hsla(0,0%,100%,.7)),linear-gradient(90deg,#3f51b5,#3f51b5);z-index:0;left:0}.mdl-progress>.auxbar{right:0}@supports (-webkit-appearance:none){.mdl-progress:not(.mdl-progress--indeterminate):not(.mdl-progress--indeterminate)>.auxbar,.mdl-progress:not(.mdl-progress__indeterminate):not(.mdl-progress__indeterminate)>.auxbar{background-image:-webkit-gradient(linear,left top,right top,from(hsla(0,0%,100%,.7)),to(hsla(0,0%,100%,.7))),-webkit-gradient(linear,left top,right top,from(#3f51b5),to(#3f51b5));background-image:-webkit-linear-gradient(left,hsla(0,0%,100%,.7),hsla(0,0%,100%,.7)),-webkit-linear-gradient(left,#3f51b5,#3f51b5);background-image:linear-gradient(90deg,hsla(0,0%,100%,.7),hsla(0,0%,100%,.7)),linear-gradient(90deg,#3f51b5,#3f51b5);-webkit-mask:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIHZpZXdQb3J0PSIwIDAgMTIgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxlbGxpcHNlIGN4PSIyIiBjeT0iMiIgcng9IjIiIHJ5PSIyIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiBmcm9tPSIyIiB0bz0iLTEwIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvZWxsaXBzZT4KICA8ZWxsaXBzZSBjeD0iMTQiIGN5PSIyIiByeD0iMiIgcnk9IjIiIGNsYXNzPSJsb2FkZXIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIGZyb209IjE0IiB0bz0iMiIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICA8L2VsbGlwc2U+Cjwvc3ZnPgo=");mask:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIHZpZXdQb3J0PSIwIDAgMTIgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxlbGxpcHNlIGN4PSIyIiBjeT0iMiIgcng9IjIiIHJ5PSIyIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiBmcm9tPSIyIiB0bz0iLTEwIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvZWxsaXBzZT4KICA8ZWxsaXBzZSBjeD0iMTQiIGN5PSIyIiByeD0iMiIgcnk9IjIiIGNsYXNzPSJsb2FkZXIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIGZyb209IjE0IiB0bz0iMiIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICA8L2VsbGlwc2U+Cjwvc3ZnPgo=")}}.mdl-progress:not(.mdl-progress--indeterminate)>.auxbar,.mdl-progress:not(.mdl-progress__indeterminate)>.auxbar{background-image:-webkit-gradient(linear,left top,right top,from(hsla(0,0%,100%,.9)),to(hsla(0,0%,100%,.9))),-webkit-gradient(linear,left top,right top,from(#3f51b5),to(#3f51b5));background-image:-webkit-linear-gradient(left,hsla(0,0%,100%,.9),hsla(0,0%,100%,.9)),-webkit-linear-gradient(left,#3f51b5,#3f51b5);background-image:linear-gradient(90deg,hsla(0,0%,100%,.9),hsla(0,0%,100%,.9)),linear-gradient(90deg,#3f51b5,#3f51b5)}.mdl-progress.mdl-progress--indeterminate>.bar1,.mdl-progress.mdl-progress__indeterminate>.bar1{background-color:#3f51b5;-webkit-animation-name:indeterminate1;animation-name:indeterminate1;-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:linear;animation-timing-function:linear}.mdl-progress.mdl-progress--indeterminate>.bar3,.mdl-progress.mdl-progress__indeterminate>.bar3{background-image:none;background-color:#3f51b5;-webkit-animation-name:indeterminate2;animation-name:indeterminate2;-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:linear;animation-timing-function:linear}@-webkit-keyframes indeterminate1{0%{left:0;width:0}50%{left:25%;width:75%}75%{left:100%;width:0}}@keyframes indeterminate1{0%{left:0;width:0}50%{left:25%;width:75%}75%{left:100%;width:0}}@-webkit-keyframes indeterminate2{0%{left:0;width:0}50%{left:0;width:0}75%{left:0;width:25%}to{left:100%;width:0}}@keyframes indeterminate2{0%{left:0;width:0}50%{left:0;width:0}75%{left:0;width:25%}to{left:100%;width:0}}body{margin:0}.firebase-container{background-color:#fff;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;color:rgba(0,0,0,.87);direction:ltr;font:16px Roboto,arial,sans-serif;margin:0 auto;max-width:360px;overflow:hidden;padding-top:8px;position:relative;width:100%}.firebase-progress-bar{height:5px;left:0;position:absolute;top:0;width:100%}.firebase-hidden-button{height:1px;visibility:hidden;width:1px}.firebase-container#app-verification-screen{top:100px}.firebase-title{color:rgba(0,0,0,.87);direction:ltr;font-size:24px;font-weight:500;line-height:24px;margin:0;padding:0;text-align:center}.firebase-middle-progress-bar{height:5px;margin-left:auto;margin-right:auto;top:20px;width:250px}.firebase-hidden{display:none}.firebase-rtl{direction:rtl;text-align:right}@media (max-width:520px){.firebase-container{box-shadow:none;max-width:none;width:100%}}'
      )
    )
    0 === a.length
      ? (a = Lb)
      : (x(!A(a, '<'), "Forbidden '<' character in style sheet string: " + a), (a = new Kb(a, Jb)))
    var b = Ba || (Ba = new de()),
      c = b.Ra
    if (md && c.createStyleSheet) (b = c.createStyleSheet()), dp(b, a)
    else {
      c = ee(b, 'HEAD')[0]
      if (!c) {
        var d = ee(b, 'BODY')[0]
        c = b.Yg('HEAD')
        d.parentNode.insertBefore(c, d)
      }
      d = b.Yg('STYLE')
      var e = gc('style[nonce],link[rel="stylesheet"][nonce]')
      e && d.setAttribute('nonce', e)
      dp(d, a)
      b.appendChild(c, d)
    }
  }
  var Up = function () {
      var a = Mg()
      switch (
        D(E(a), 'blank')
          ? 'blank'
          : 'verifyApp' === vp(E(a), 'authType')
          ? 'verifyApp'
          : ii(a)
          ? 'dynamicLink'
          : D(E(a), 'firebaseError')
          ? 'error'
          : vp(E(a), 'apiKey')
          ? 'starter'
          : 'finisher'
      ) {
        case 'blank':
          Ng(null)
          return
        case 'dynamicLink':
          a = ii(a)
          Rp(a)
          return
        case 'error':
          a = D(E(a), 'firebaseError') || null
          Tp(a)
          return
        case 'starter':
          Qp = new Jp(a)
          break
        case 'finisher':
          Qp = new Np(a)
          break
        case 'verifyApp':
          Qp = new Hp(a)
      }
      Sp()
      Qp.start()
    },
    Vp = ['fireauth', 'oauthhelper', 'widget', 'initialize'],
    Wp = q
  Vp[0] in Wp || 'undefined' == typeof Wp.execScript || Wp.execScript('var ' + Vp[0])
  for (var Xp; Vp.length && (Xp = Vp.shift()); )
    Vp.length || void 0 === Up
      ? (Wp = Wp[Xp] && Wp[Xp] !== Object.prototype[Xp] ? Wp[Xp] : (Wp[Xp] = {}))
      : (Wp[Xp] = Up)
}.call(this))
