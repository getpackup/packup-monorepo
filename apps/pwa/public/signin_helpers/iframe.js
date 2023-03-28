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
  var k,
    aa = function (a) {
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
    var b = function (f, g) {
      this.fk = f
      ba(this, 'description', { configurable: !0, writable: !0, value: g })
    }
    b.prototype.toString = function () {
      return this.fk
    }
    var c = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
      d = 0,
      e = function (f) {
        if (this instanceof e) throw new TypeError('Symbol is not a constructor')
        return new b(c + (f || '') + '_' + d++, f)
      }
    return e
  })
  ea('Symbol.iterator', function (a) {
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
      var d = da[b[c]]
      'function' === typeof d &&
        'function' != typeof d.prototype[a] &&
        ba(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return fa(aa(this))
          },
        })
    }
    return a
  })
  var fa = function (a) {
      a = { next: a }
      a[Symbol.iterator] = function () {
        return this
      }
      return a
    },
    ha = function (a) {
      var b = 'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator]
      if (b) return b.call(a)
      if ('number' == typeof a.length) return { next: aa(a) }
      throw Error(String(a) + ' is not an iterable or ArrayLike')
    },
    ia =
      'function' == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () {}
            b.prototype = a
            return new b()
          },
    ja
  if ('function' == typeof Object.setPrototypeOf) ja = Object.setPrototypeOf
  else {
    var ka
    a: {
      var la = { a: !0 },
        ma = {}
      try {
        ma.__proto__ = la
        ka = ma.a
        break a
      } catch (a) {}
      ka = !1
    }
    ja = ka
      ? function (a, b) {
          a.__proto__ = b
          if (a.__proto__ !== b) throw new TypeError(a + ' is not extensible')
          return a
        }
      : null
  }
  var na = ja,
    n = function (a, b) {
      a.prototype = ia(b.prototype)
      a.prototype.constructor = a
      if (na) na(a, b)
      else
        for (var c in b)
          if ('prototype' != c)
            if (Object.defineProperties) {
              var d = Object.getOwnPropertyDescriptor(b, c)
              d && Object.defineProperty(a, c, d)
            } else a[c] = b[c]
      a.Wc = b.prototype
    },
    oa = function () {
      for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c]
      return b
    }
  ea('Promise', function (a) {
    function b() {
      this.oc = null
    }
    function c(g) {
      return g instanceof e
        ? g
        : new e(function (h) {
            h(g)
          })
    }
    if (a) return a
    b.prototype.Wh = function (g) {
      if (null == this.oc) {
        this.oc = []
        var h = this
        this.Xh(function () {
          h.Gk()
        })
      }
      this.oc.push(g)
    }
    var d = da.setTimeout
    b.prototype.Xh = function (g) {
      d(g, 0)
    }
    b.prototype.Gk = function () {
      for (; this.oc && this.oc.length; ) {
        var g = this.oc
        this.oc = []
        for (var h = 0; h < g.length; ++h) {
          var l = g[h]
          g[h] = null
          try {
            l()
          } catch (m) {
            this.nk(m)
          }
        }
      }
      this.oc = null
    }
    b.prototype.nk = function (g) {
      this.Xh(function () {
        throw g
      })
    }
    var e = function (g) {
      this.Ba = 0
      this.Ua = void 0
      this.Ad = []
      this.Ui = !1
      var h = this.wg()
      try {
        g(h.resolve, h.reject)
      } catch (l) {
        h.reject(l)
      }
    }
    e.prototype.wg = function () {
      function g(m) {
        return function (q) {
          l || ((l = !0), m.call(h, q))
        }
      }
      var h = this,
        l = !1
      return { resolve: g(this.Ul), reject: g(this.xh) }
    }
    e.prototype.Ul = function (g) {
      if (g === this) this.xh(new TypeError('A Promise cannot resolve to itself'))
      else if (g instanceof e) this.lm(g)
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
        h ? this.Tl(g) : this.zi(g)
      }
    }
    e.prototype.Tl = function (g) {
      var h = void 0
      try {
        h = g.then
      } catch (l) {
        this.xh(l)
        return
      }
      'function' == typeof h ? this.mm(h, g) : this.zi(g)
    }
    e.prototype.xh = function (g) {
      this.Mj(2, g)
    }
    e.prototype.zi = function (g) {
      this.Mj(1, g)
    }
    e.prototype.Mj = function (g, h) {
      if (0 != this.Ba)
        throw Error(
          'Cannot settle(' + g + ', ' + h + '): Promise already settled in state' + this.Ba
        )
      this.Ba = g
      this.Ua = h
      2 === this.Ba && this.hm()
      this.Ik()
    }
    e.prototype.hm = function () {
      var g = this
      d(function () {
        if (g.Al()) {
          var h = da.console
          'undefined' !== typeof h && h.error(g.Ua)
        }
      }, 1)
    }
    e.prototype.Al = function () {
      if (this.Ui) return !1
      var g = da.CustomEvent,
        h = da.Event,
        l = da.dispatchEvent
      if ('undefined' === typeof l) return !0
      'function' === typeof g
        ? (g = new g('unhandledrejection', { cancelable: !0 }))
        : 'function' === typeof h
        ? (g = new h('unhandledrejection', { cancelable: !0 }))
        : ((g = da.document.createEvent('CustomEvent')),
          g.initCustomEvent('unhandledrejection', !1, !0, g))
      g.promise = this
      g.reason = this.Ua
      return l(g)
    }
    e.prototype.Ik = function () {
      if (null != this.Ad) {
        for (var g = 0; g < this.Ad.length; ++g) f.Wh(this.Ad[g])
        this.Ad = null
      }
    }
    var f = new b()
    e.prototype.lm = function (g) {
      var h = this.wg()
      g.Se(h.resolve, h.reject)
    }
    e.prototype.mm = function (g, h) {
      var l = this.wg()
      try {
        g.call(h, l.resolve, l.reject)
      } catch (m) {
        l.reject(m)
      }
    }
    e.prototype.then = function (g, h) {
      function l(z, R) {
        return 'function' == typeof z
          ? function (Ca) {
              try {
                m(z(Ca))
              } catch (Dc) {
                q(Dc)
              }
            }
          : R
      }
      var m,
        q,
        x = new e(function (z, R) {
          m = z
          q = R
        })
      this.Se(l(g, m), l(h, q))
      return x
    }
    e.prototype.catch = function (g) {
      return this.then(void 0, g)
    }
    e.prototype.Se = function (g, h) {
      function l() {
        switch (m.Ba) {
          case 1:
            g(m.Ua)
            break
          case 2:
            h(m.Ua)
            break
          default:
            throw Error('Unexpected state: ' + m.Ba)
        }
      }
      var m = this
      null == this.Ad ? f.Wh(l) : this.Ad.push(l)
      this.Ui = !0
    }
    e.resolve = c
    e.reject = function (g) {
      return new e(function (h, l) {
        l(g)
      })
    }
    e.race = function (g) {
      return new e(function (h, l) {
        for (var m = ha(g), q = m.next(); !q.done; q = m.next()) c(q.value).Se(h, l)
      })
    }
    e.all = function (g) {
      var h = ha(g),
        l = h.next()
      return l.done
        ? c([])
        : new e(function (m, q) {
            function x(Ca) {
              return function (Dc) {
                z[Ca] = Dc
                R--
                0 == R && m(z)
              }
            }
            var z = [],
              R = 0
            do z.push(void 0), R++, c(l.value).Se(x(z.length - 1), q), (l = h.next())
            while (!l.done)
          })
    }
    return e
  })
  var pa = function (a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
  }
  ea('WeakMap', function (a) {
    function b() {}
    function c(l) {
      var m = typeof l
      return ('object' === m && null !== l) || 'function' === m
    }
    function d(l) {
      if (!pa(l, f)) {
        var m = new b()
        ba(l, f, { value: m })
      }
    }
    function e(l) {
      var m = Object[l]
      m &&
        (Object[l] = function (q) {
          if (q instanceof b) return q
          Object.isExtensible(q) && d(q)
          return m(q)
        })
    }
    if (
      (function () {
        if (!a || !Object.seal) return !1
        try {
          var l = Object.seal({}),
            m = Object.seal({}),
            q = new a([
              [l, 2],
              [m, 3],
            ])
          if (2 != q.get(l) || 3 != q.get(m)) return !1
          q.delete(l)
          q.set(m, 4)
          return !q.has(l) && 4 == q.get(m)
        } catch (x) {
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
      h = function (l) {
        this.Pa = (g += Math.random() + 1).toString()
        if (l) {
          l = ha(l)
          for (var m; !(m = l.next()).done; ) (m = m.value), this.set(m[0], m[1])
        }
      }
    h.prototype.set = function (l, m) {
      if (!c(l)) throw Error('Invalid WeakMap key')
      d(l)
      if (!pa(l, f)) throw Error('WeakMap key fail: ' + l)
      l[f][this.Pa] = m
      return this
    }
    h.prototype.get = function (l) {
      return c(l) && pa(l, f) ? l[f][this.Pa] : void 0
    }
    h.prototype.has = function (l) {
      return c(l) && pa(l, f) && pa(l[f], this.Pa)
    }
    h.prototype.delete = function (l) {
      return c(l) && pa(l, f) && pa(l[f], this.Pa) ? delete l[f][this.Pa] : !1
    }
    return h
  })
  ea('Map', function (a) {
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
            l = new a(ha([[h, 's']]))
          if (
            's' != l.get(h) ||
            1 != l.size ||
            l.get({ x: 4 }) ||
            l.set({ x: 4 }, 't') != l ||
            2 != l.size
          )
            return !1
          var m = l.entries(),
            q = m.next()
          if (q.done || q.value[0] != h || 's' != q.value[1]) return !1
          q = m.next()
          return q.done || 4 != q.value[0].x || 't' != q.value[1] || !m.next().done ? !1 : !0
        } catch (x) {
          return !1
        }
      })()
    )
      return a
    var b = new WeakMap(),
      c = function (h) {
        this.Xd = {}
        this.Za = f()
        this.size = 0
        if (h) {
          h = ha(h)
          for (var l; !(l = h.next()).done; ) (l = l.value), this.set(l[0], l[1])
        }
      }
    c.prototype.set = function (h, l) {
      h = 0 === h ? 0 : h
      var m = d(this, h)
      m.list || (m.list = this.Xd[m.id] = [])
      m.Oa
        ? (m.Oa.value = l)
        : ((m.Oa = { next: this.Za, Zb: this.Za.Zb, head: this.Za, key: h, value: l }),
          m.list.push(m.Oa),
          (this.Za.Zb.next = m.Oa),
          (this.Za.Zb = m.Oa),
          this.size++)
      return this
    }
    c.prototype.delete = function (h) {
      h = d(this, h)
      return h.Oa && h.list
        ? (h.list.splice(h.index, 1),
          h.list.length || delete this.Xd[h.id],
          (h.Oa.Zb.next = h.Oa.next),
          (h.Oa.next.Zb = h.Oa.Zb),
          (h.Oa.head = null),
          this.size--,
          !0)
        : !1
    }
    c.prototype.clear = function () {
      this.Xd = {}
      this.Za = this.Za.Zb = f()
      this.size = 0
    }
    c.prototype.has = function (h) {
      return !!d(this, h).Oa
    }
    c.prototype.get = function (h) {
      return (h = d(this, h).Oa) && h.value
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
    c.prototype.forEach = function (h, l) {
      for (var m = this.entries(), q; !(q = m.next()).done; )
        (q = q.value), h.call(l, q[1], q[0], this)
    }
    c.prototype[Symbol.iterator] = c.prototype.entries
    var d = function (h, l) {
        var m = l && typeof l
        'object' == m || 'function' == m
          ? b.has(l)
            ? (m = b.get(l))
            : ((m = '' + ++g), b.set(l, m))
          : (m = 'p_' + l)
        var q = h.Xd[m]
        if (q && pa(h.Xd, m))
          for (h = 0; h < q.length; h++) {
            var x = q[h]
            if ((l !== l && x.key !== x.key) || l === x.key)
              return { id: m, list: q, index: h, Oa: x }
          }
        return { id: m, list: q, index: -1, Oa: void 0 }
      },
      e = function (h, l) {
        var m = h.Za
        return fa(function () {
          if (m) {
            for (; m.head != h.Za; ) m = m.Zb
            for (; m.next != m.head; ) return (m = m.next), { done: !1, value: l(m) }
            m = null
          }
          return { done: !0, value: void 0 }
        })
      },
      f = function () {
        var h = {}
        return (h.Zb = h.next = h.head = h)
      },
      g = 0
    return c
  })
  ea('Array.prototype.find', function (a) {
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
  var qa = function (a, b) {
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
  ea('Array.prototype.entries', function (a) {
    return a
      ? a
      : function () {
          return qa(this, function (b, c) {
            return [b, c]
          })
        }
  })
  ea('Array.prototype.keys', function (a) {
    return a
      ? a
      : function () {
          return qa(this, function (b) {
            return b
          })
        }
  })
  ea('Set', function (a) {
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
          var c = Object.seal({ x: 4 }),
            d = new a(ha([c]))
          if (
            !d.has(c) ||
            1 != d.size ||
            d.add(c) != d ||
            1 != d.size ||
            d.add({ x: 4 }) != d ||
            2 != d.size
          )
            return !1
          var e = d.entries(),
            f = e.next()
          if (f.done || f.value[0] != c || f.value[1] != c) return !1
          f = e.next()
          return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0]
            ? !1
            : e.next().done
        } catch (g) {
          return !1
        }
      })()
    )
      return a
    var b = function (c) {
      this.hb = new Map()
      if (c) {
        c = ha(c)
        for (var d; !(d = c.next()).done; ) this.add(d.value)
      }
      this.size = this.hb.size
    }
    b.prototype.add = function (c) {
      c = 0 === c ? 0 : c
      this.hb.set(c, c)
      this.size = this.hb.size
      return this
    }
    b.prototype.delete = function (c) {
      c = this.hb.delete(c)
      this.size = this.hb.size
      return c
    }
    b.prototype.clear = function () {
      this.hb.clear()
      this.size = 0
    }
    b.prototype.has = function (c) {
      return this.hb.has(c)
    }
    b.prototype.entries = function () {
      return this.hb.entries()
    }
    b.prototype.values = function () {
      return this.hb.values()
    }
    b.prototype.keys = b.prototype.values
    b.prototype[Symbol.iterator] = b.prototype.values
    b.prototype.forEach = function (c, d) {
      var e = this
      this.hb.forEach(function (f) {
        return c.call(d, f, f, e)
      })
    }
    return b
  })
  ea('Number.isFinite', function (a) {
    return a
      ? a
      : function (b) {
          return 'number' !== typeof b ? !1 : !isNaN(b) && Infinity !== b && -Infinity !== b
        }
  })
  ea('Array.from', function (a) {
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
  ea('Object.entries', function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            d
          for (d in b) pa(b, d) && c.push([d, b[d]])
          return c
        }
  })
  ea('Object.values', function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            d
          for (d in b) pa(b, d) && c.push(b[d])
          return c
        }
  })
  ea('Array.prototype.values', function (a) {
    return a
      ? a
      : function () {
          return qa(this, function (b, c) {
            return c
          })
        }
  })
  var ra = ra || {},
    p = this || self,
    r = function (a, b) {
      a = a.split('.')
      var c = p
      a[0] in c || 'undefined' == typeof c.execScript || c.execScript('var ' + a[0])
      for (var d; a.length && (d = a.shift()); )
        a.length || void 0 === b
          ? (c = c[d] && c[d] !== Object.prototype[d] ? c[d] : (c[d] = {}))
          : (c[d] = b)
    },
    sa = function (a) {
      var b = typeof a
      return 'object' != b ? b : a ? (Array.isArray(a) ? 'array' : b) : 'null'
    },
    ta = function (a) {
      var b = sa(a)
      return 'array' == b || ('object' == b && 'number' == typeof a.length)
    },
    t = function (a) {
      var b = typeof a
      return ('object' == b && null != a) || 'function' == b
    },
    ua = function (a, b, c) {
      return a.call.apply(a.bind, arguments)
    },
    va = function (a, b, c) {
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
    u = function (a, b, c) {
      u =
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf('native code')
          ? ua
          : va
      return u.apply(null, arguments)
    },
    wa = function (a, b) {
      var c = Array.prototype.slice.call(arguments, 1)
      return function () {
        var d = c.slice()
        d.push.apply(d, arguments)
        return a.apply(this, d)
      }
    },
    v = function (a, b) {
      function c() {}
      c.prototype = b.prototype
      a.Wc = b.prototype
      a.prototype = new c()
      a.prototype.constructor = a
      a.Td = function (d, e, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
          g[h - 2] = arguments[h]
        return b.prototype[e].apply(d, g)
      }
    },
    xa = function (a) {
      return a
    }
  var ya = function (a) {
    var b = (window.___jsl = window.___jsl || {})
    b.cfg = b.cfg || {}
    b = b.cfg
    if (!a) return b
    a = a.split('/')
    for (var c = 0, d = a.length; b && 'object' === typeof b && c < d; ++c) b = b[a[c]]
    return c === a.length && void 0 !== b ? b : void 0
  }
  function za(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, za)
    else {
      var c = Error().stack
      c && (this.stack = c)
    }
    a && (this.message = String(a))
    void 0 !== b && (this.cause = b)
  }
  v(za, Error)
  za.prototype.name = 'CustomError'
  var Aa
  function Ba(a, b) {
    a = a.split('%s')
    for (var c = '', d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : '%s')
    za.call(this, c + a[d])
  }
  v(Ba, za)
  Ba.prototype.name = 'AssertionError'
  function Da(a, b, c, d) {
    var e = 'Assertion failed'
    if (c) {
      e += ': ' + c
      var f = d
    } else a && ((e += ': ' + a), (f = b))
    throw new Ba('' + e, f || [])
  }
  var w = function (a, b, c) {
      a || Da('', null, b, Array.prototype.slice.call(arguments, 2))
      return a
    },
    Ea = function (a, b, c) {
      null == a && Da('Expected to exist: %s.', [a], b, Array.prototype.slice.call(arguments, 2))
      return a
    },
    Fa = function (a, b) {
      throw new Ba('Failure' + (a ? ': ' + a : ''), Array.prototype.slice.call(arguments, 1))
    },
    Ga = function (a, b, c) {
      'number' !== typeof a &&
        Da(
          'Expected number but got %s: %s.',
          [sa(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        )
      return a
    },
    Ha = function (a, b, c) {
      'string' !== typeof a &&
        Da(
          'Expected string but got %s: %s.',
          [sa(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        )
    },
    Ia = function (a, b, c) {
      'function' !== typeof a &&
        Da(
          'Expected function but got %s: %s.',
          [sa(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        )
    }
  var Ja = Array.prototype.indexOf
      ? function (a, b) {
          w(null != a.length)
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
          w(null != a.length)
          Array.prototype.forEach.call(a, b, void 0)
        }
      : function (a, b) {
          for (var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0; e < c; e++)
            e in d && b.call(void 0, d[e], e, a)
        }
  function Ka(a, b) {
    for (var c = 'string' === typeof a ? a.split('') : a, d = a.length - 1; 0 <= d; --d)
      d in c && b.call(void 0, c[d], d, a)
  }
  var La = Array.prototype.filter
      ? function (a, b) {
          w(null != a.length)
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
    Ma = Array.prototype.map
      ? function (a, b) {
          w(null != a.length)
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
    Na = Array.prototype.some
      ? function (a, b) {
          w(null != a.length)
          return Array.prototype.some.call(a, b, void 0)
        }
      : function (a, b) {
          for (var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a)) return !0
          return !1
        }
  function Oa(a, b) {
    return 0 <= Ja(a, b)
  }
  function Pa(a, b) {
    b = Ja(a, b)
    var c
    ;(c = 0 <= b) && Qa(a, b)
    return c
  }
  function Qa(a, b) {
    w(null != a.length)
    return 1 == Array.prototype.splice.call(a, b, 1).length
  }
  function Ra(a, b) {
    var c = 0
    Ka(a, function (d, e) {
      b.call(void 0, d, e, a) && Qa(a, e) && c++
    })
  }
  function Sa(a) {
    var b = a.length
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d]
      return c
    }
    return []
  }
  function Ta(a, b) {
    for (var c = 0, d = a.length, e; c < d; ) {
      var f = c + ((d - c) >>> 1)
      var g = b.call(void 0, a[f], f, a)
      0 < g ? (c = f + 1) : ((d = f), (e = !g))
    }
    return e ? c : -c - 1
  }
  var Ua =
    Object.freeze ||
    function (a) {
      return a
    }
  function Va(a, b) {
    for (var c in a) b.call(void 0, a[c], c, a)
  }
  function Wa(a, b) {
    for (var c in a) if (b.call(void 0, a[c], c, a)) return !0
    return !1
  }
  function Xa(a) {
    for (var b in a) return !1
    return !0
  }
  function Ya(a) {
    var b = {},
      c
    for (c in a) b[c] = a[c]
    return b
  }
  var Za =
    'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
      ' '
    )
  function $a(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e]
      for (c in d) a[c] = d[c]
      for (var f = 0; f < Za.length; f++)
        (c = Za[f]), Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
  var ab, bb
  a: {
    for (var cb = ['CLOSURE_FLAGS'], db = p, eb = 0; eb < cb.length; eb++)
      if (((db = db[cb[eb]]), null == db)) {
        bb = null
        break a
      }
    bb = db
  }
  var fb = bb && bb[610401301]
  ab = null != fb ? fb : !1
  var gb,
    hb = function () {
      if (void 0 === gb) {
        var a = null,
          b = p.trustedTypes
        if (b && b.createPolicy)
          try {
            a = b.createPolicy('goog#html', {
              createHTML: xa,
              createScript: xa,
              createScriptURL: xa,
            })
          } catch (c) {
            p.console && p.console.error(c.message)
          }
        gb = a
      }
      return gb
    }
  var kb = function (a, b) {
    this.Oh = (a === ib && b) || ''
    this.hk = jb
  }
  kb.prototype.ud = !0
  kb.prototype.td = function () {
    return this.Oh
  }
  kb.prototype.toString = function () {
    return 'Const{' + this.Oh + '}'
  }
  var lb = function (a) {
      if (a instanceof kb && a.constructor === kb && a.hk === jb) return a.Oh
      Fa("expected object of type Const, got '" + a + "'")
      return 'type_error:Const'
    },
    jb = {},
    ib = {}
  var nb = function (a, b) {
    this.nh = b === mb ? a : ''
  }
  nb.prototype.toString = function () {
    return this.nh + ''
  }
  nb.prototype.ud = !0
  nb.prototype.td = function () {
    return this.nh.toString()
  }
  var ob = function (a) {
      if (a instanceof nb && a.constructor === nb) return a.nh
      Fa("expected object of type TrustedResourceUrl, got '" + a + "' of type " + sa(a))
      return 'type_error:TrustedResourceUrl'
    },
    sb = function (a, b) {
      var c = lb(a)
      if (!pb.test(c)) throw Error('Invalid TrustedResourceUrl format: ' + c)
      a = c.replace(qb, function (d, e) {
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
        return d instanceof kb ? lb(d) : encodeURIComponent(String(d))
      })
      return rb(a)
    },
    qb = /%{(\w+)}/g,
    pb = RegExp(
      '^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)',
      'i'
    ),
    mb = {},
    rb = function (a) {
      var b = hb()
      a = b ? b.createScriptURL(a) : a
      return new nb(a, mb)
    }
  var tb = /&/g,
    ub = /</g,
    vb = />/g,
    wb = /"/g,
    xb = /'/g,
    yb = /\x00/g,
    zb = /[\x00&<>"']/,
    A = function (a, b) {
      return -1 != a.indexOf(b)
    }
  var Bb = function (a, b) {
    this.mh = b === Ab ? a : ''
  }
  Bb.prototype.toString = function () {
    return this.mh.toString()
  }
  Bb.prototype.ud = !0
  Bb.prototype.td = function () {
    return this.mh.toString()
  }
  var Cb = function (a) {
      if (a instanceof Bb && a.constructor === Bb) return a.mh
      Fa("expected object of type SafeUrl, got '" + a + "' of type " + sa(a))
      return 'type_error:SafeUrl'
    },
    Db = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
    Eb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
    Fb = function (a) {
      if (a instanceof Bb) return a
      a = 'object' == typeof a && a.ud ? a.td() : String(a)
      Eb.test(a)
        ? (a = new Bb(a, Ab))
        : ((a = String(a).replace(/(%0A|%0D)/g, '')), (a = a.match(Db) ? new Bb(a, Ab) : null))
      return a
    },
    Gb
  try {
    new URL('s://g'), (Gb = !0)
  } catch (a) {
    Gb = !1
  }
  var Hb = Gb,
    Ib = function (a) {
      if (a instanceof Bb) return a
      a = 'object' == typeof a && a.ud ? a.td() : String(a)
      a: {
        var b = a
        if (Hb) {
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
      w('javascript:' !== b, '%s is a javascript: URL', a) || (a = 'about:invalid#zClosurez')
      return new Bb(a, Ab)
    },
    Ab = {},
    Jb = new Bb('about:invalid#zClosurez', Ab)
  function Kb() {
    var a = p.navigator
    return a && (a = a.userAgent) ? a : ''
  }
  var Lb,
    Mb = p.navigator
  Lb = Mb ? Mb.userAgentData || null : null
  function Nb(a) {
    return ab
      ? Lb
        ? Lb.brands.some(function (b) {
            return (b = b.brand) && A(b, a)
          })
        : !1
      : !1
  }
  function B(a) {
    return A(Kb(), a)
  }
  function Ob() {
    return ab ? !!Lb && 0 < Lb.brands.length : !1
  }
  function Pb() {
    return Ob() ? !1 : B('Trident') || B('MSIE')
  }
  function Qb() {
    return Ob()
      ? Nb('Chromium')
      : ((B('Chrome') || B('CriOS')) && !(Ob() ? 0 : B('Edge'))) || B('Silk')
  }
  var Rb = {},
    Sb = function (a, b) {
      this.lh = b === Rb ? a : ''
      this.ud = !0
    }
  Sb.prototype.td = function () {
    return this.lh.toString()
  }
  Sb.prototype.toString = function () {
    return this.lh.toString()
  }
  var Tb = function (a) {
    if (a instanceof Sb && a.constructor === Sb) return a.lh
    Fa("expected object of type SafeHtml, got '" + a + "' of type " + sa(a))
    return 'type_error:SafeHtml'
  }
  var Ub = function (a, b) {
    this.name = a
    this.value = b
  }
  Ub.prototype.toString = function () {
    return this.name
  }
  var Vb = new Ub('OFF', Infinity),
    Wb = new Ub('SEVERE', 1e3),
    Xb = new Ub('WARNING', 900),
    Yb = new Ub('CONFIG', 700),
    Zb = new Ub('FINE', 500),
    $b = function () {
      this.Te = 0
      this.clear()
    },
    ac
  $b.prototype.clear = function () {
    this.Zh = Array(this.Te)
    this.ji = -1
    this.Ti = !1
  }
  var bc = function (a, b) {
    this.reset(a || Vb, b, null, void 0, void 0)
  }
  bc.prototype.reset = function () {}
  var cc = function (a) {
      this.level = null
      this.jl = []
      this.parent = (void 0 === a ? null : a) || null
      this.children = []
    },
    dc = function (a) {
      if (a.level) return a.level
      if (a.parent) return dc(a.parent)
      Fa('Root logger has no level set.')
      return Vb
    },
    ec = function (a, b) {
      for (; a; )
        a.jl.forEach(function (c) {
          c(b)
        }),
          (a = a.parent)
    },
    fc = function () {
      this.entries = {}
      var a = new cc()
      a.level = Yb
      this.entries[''] = a
    },
    gc,
    hc = function (a, b) {
      var c = a.entries[b]
      if (c) return c
      c = hc(a, b.slice(0, Math.max(b.lastIndexOf('.'), 0)))
      var d = new cc(c)
      a.entries[b] = d
      c.children.push(d)
      return d
    },
    ic = function () {
      gc || (gc = new fc())
      return gc
    },
    jc = function (a, b, c) {
      if (a && a && b && b.value >= (a ? dc(hc(ic(), null)) : Vb).value) {
        b = b || Vb
        a = hc(ic(), null)
        'function' === typeof c && (c = c())
        ac || (ac = new $b())
        var d = ac
        if (0 < d.Te) {
          var e = (d.ji + 1) % d.Te
          d.ji = e
          d.Ti
            ? ((d = d.Zh[e]), d.reset(b, c, null))
            : ((d.Ti = e == d.Te - 1), (d = d.Zh[e] = new bc(b, c)))
        } else d = new bc(b, c)
        ec(a, d)
      }
    },
    kc = function (a, b) {
      a && jc(a, Wb, b)
    },
    lc = function (a, b) {
      a && jc(a, Zb, b)
    } /*

 SPDX-License-Identifier: Apache-2.0
*/
  var mc = [],
    nc = function () {}
  ;-1 === mc.indexOf(nc) && mc.push(nc)
  var oc = function (a, b) {
    if (
      !t(a) ||
      !t(a) ||
      !t(a) ||
      1 !== a.nodeType ||
      (a.namespaceURI && 'http://www.w3.org/1999/xhtml' !== a.namespaceURI) ||
      a.tagName.toUpperCase() !== b.toString()
    ) {
      b = b.toString() + '; got: '
      if (t(a))
        try {
          var c =
            a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a)
        } catch (d) {
          c = '<object could not be stringified>'
        }
      else c = void 0 === a ? 'undefined' : null === a ? 'null' : typeof a
      Fa('Argument is not an HTML Element with tag name ' + (b + c))
    }
    return a
  }
  function pc() {
    return B('iPhone') && !B('iPod') && !B('iPad')
  }
  var qc = function (a) {
    qc[' '](a)
    return a
  }
  qc[' '] = function () {}
  var rc = Ob() ? !1 : B('Opera'),
    sc = Pb(),
    tc = B('Edge'),
    uc = tc || sc,
    vc =
      B('Gecko') &&
      !(A(Kb().toLowerCase(), 'webkit') && !B('Edge')) &&
      !(B('Trident') || B('MSIE')) &&
      !B('Edge'),
    wc = A(Kb().toLowerCase(), 'webkit') && !B('Edge'),
    xc = wc && B('Mobile'),
    yc = function () {
      var a = p.document
      return a ? a.documentMode : void 0
    },
    zc
  a: {
    var Ac = '',
      Bc = (function () {
        var a = Kb()
        if (vc) return /rv:([^\);]+)(\)|;)/.exec(a)
        if (tc) return /Edge\/([\d\.]+)/.exec(a)
        if (sc) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a)
        if (wc) return /WebKit\/(\S+)/.exec(a)
        if (rc) return /(?:Version)[ \/]?(\S+)/.exec(a)
      })()
    Bc && (Ac = Bc ? Bc[1] : '')
    if (sc) {
      var Cc = yc()
      if (null != Cc && Cc > parseFloat(Ac)) {
        zc = String(Cc)
        break a
      }
    }
    zc = Ac
  }
  var Ec = zc,
    Fc
  if (p.document && sc) {
    var Gc = yc()
    Fc = Gc ? Gc : parseInt(Ec, 10) || void 0
  } else Fc = void 0
  var Hc = Fc
  try {
    new self.OffscreenCanvas(0, 0).getContext('2d')
  } catch (a) {}
  var Ic = function () {},
    Jc = function (a) {
      return 'function' === typeof a
    }
  var Kc = function (a, b) {
    Ha(lb(a), 'must provide justification')
    w(!/^[\s\xa0]*$/.test(lb(a)), 'must provide non-empty justification')
    a = b
    a = (b = hb()) ? b.createHTML(a) : a
    return new Sb(a, Rb)
  }
  var Lc = function (a, b) {
      oc(a, 'A')
      b = b instanceof Bb ? b : Ib(b)
      a.href = Cb(b)
    },
    Nc = function (a, b) {
      oc(a, 'SCRIPT')
      a: {
        var c = ((a.ownerDocument && a.ownerDocument.defaultView) || p).document
        if (
          c.querySelector &&
          (c = c.querySelector('script[nonce]')) &&
          (c = c.nonce || c.getAttribute('nonce')) &&
          Mc.test(c)
        )
          break a
        c = ''
      }
      c && a.setAttribute('nonce', c)
      a.src = ob(b)
    },
    Oc = function (a, b, c, d) {
      a = a instanceof Bb ? a : Ib(a)
      b = b || p
      c = c instanceof kb ? lb(c) : c || ''
      return void 0 !== d ? b.open(Cb(a), c, d) : b.open(Cb(a), c)
    },
    Mc = /^[\w+/_-]+[=]{0,2}$/
  var Pc = function (a, b) {
    for (
      var c = a.split('%s'), d = '', e = Array.prototype.slice.call(arguments, 1);
      e.length && 1 < c.length;

    )
      d += c.shift() + e.shift()
    return d + c.join('%s')
  }
  var Qc = function (a) {
      var b = document
      return 'string' === typeof a ? b.getElementById(a) : a
    },
    Sc = function (a, b) {
      Va(b, function (c, d) {
        c && 'object' == typeof c && c.ud && (c = c.td())
        'style' == d
          ? (a.style.cssText = c)
          : 'class' == d
          ? (a.className = c)
          : 'for' == d
          ? (a.htmlFor = c)
          : Rc.hasOwnProperty(d)
          ? a.setAttribute(Rc[d], c)
          : 0 == d.lastIndexOf('aria-', 0) || 0 == d.lastIndexOf('data-', 0)
          ? a.setAttribute(d, c)
          : (a[d] = c)
      })
    },
    Rc = {
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
    Uc = function (a, b, c) {
      return Tc(document, arguments)
    },
    Tc = function (a, b) {
      var c = b[1],
        d = Vc(a, String(b[0]))
      c &&
        ('string' === typeof c
          ? (d.className = c)
          : Array.isArray(c)
          ? (d.className = c.join(' '))
          : Sc(d, c))
      2 < b.length && Wc(a, d, b, 2)
      return d
    },
    Wc = function (a, b, c, d) {
      function e(h) {
        h && b.appendChild('string' === typeof h ? a.createTextNode(h) : h)
      }
      for (; d < c.length; d++) {
        var f = c[d]
        if (!ta(f) || (t(f) && 0 < f.nodeType)) e(f)
        else {
          a: {
            if (f && 'number' == typeof f.length) {
              if (t(f)) {
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
          y(g ? Sa(f) : f, e)
        }
      }
    },
    Vc = function (a, b) {
      b = String(b)
      'application/xhtml+xml' === a.contentType && (b = b.toLowerCase())
      return a.createElement(b)
    },
    Xc = function (a) {
      for (var b; (b = a.firstChild); ) a.removeChild(b)
    },
    Yc = function (a) {
      return a && a.parentNode ? a.parentNode.removeChild(a) : null
    },
    Zc = function (a) {
      w(a, 'Node cannot be null or undefined.')
      return 9 == a.nodeType ? a : a.ownerDocument || a.document
    },
    $c = function (a) {
      this.ae = a || p.document || document
    }
  k = $c.prototype
  k.getElementsByTagName = function (a, b) {
    return (b || this.ae).getElementsByTagName(String(a))
  }
  k.xk = function (a, b, c) {
    return Tc(this.ae, arguments)
  }
  k.createElement = function (a) {
    return Vc(this.ae, a)
  }
  k.createTextNode = function (a) {
    return this.ae.createTextNode(String(a))
  }
  k.getWindow = function () {
    var a = this.ae
    return a.parentWindow || a.defaultView
  }
  k.appendChild = function (a, b) {
    w(null != a && null != b, 'goog.dom.appendChild expects non-null arguments')
    a.appendChild(b)
  }
  k.append = function (a, b) {
    Wc(Zc(a), a, arguments, 1)
  }
  k.canHaveChildren = function (a) {
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
  k.removeNode = Yc
  k.isElement = function (a) {
    return t(a) && 1 == a.nodeType
  }
  k.contains = function (a, b) {
    if (!a || !b) return !1
    if (a.contains && 1 == b.nodeType) return a == b || a.contains(b)
    if ('undefined' != typeof a.compareDocumentPosition)
      return a == b || !!(a.compareDocumentPosition(b) & 16)
    for (; b && a != b; ) b = b.parentNode
    return b == a
  } /*
 gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
  var C = window,
    ad = document,
    bd = /\[native code\]/,
    cd = function (a, b, c) {
      return (a[b] = a[b] || c)
    },
    dd = function (a) {
      return !!a && 'object' === typeof a && bd.test(a.push)
    },
    ed = function (a) {
      for (var b = 0; b < this.length; b++) if (this[b] === a) return b
      return -1
    },
    gd = function (a, b, c) {
      if (a)
        if (dd(a)) {
          if (a) {
            D(dd(a), 'arrayForEach was called with a non array value')
            for (var d = 0; d < a.length; d++) b.call(c, a[d], d)
          }
        } else
          for (d in (D('object' === typeof a, 'objectForEach was called with a non object value'),
          (c = c || a),
          a))
            fd(a, d) && void 0 !== a[d] && b.call(c, a[d], d)
    },
    hd = /&/g,
    id = /</g,
    jd = />/g,
    kd = /"/g,
    ld = /'/g,
    md = function (a) {
      return String(a)
        .replace(hd, '&amp;')
        .replace(id, '&lt;')
        .replace(jd, '&gt;')
        .replace(kd, '&quot;')
        .replace(ld, '&#39;')
    },
    nd = function () {
      var a
      if ((a = Object.create) && bd.test(a)) a = a(null)
      else {
        a = {}
        for (var b in a) a[b] = void 0
      }
      return a
    },
    fd = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b)
    },
    od = function (a, b) {
      a = a || {}
      for (var c in a) fd(a, c) && (b[c] = a[c])
    },
    D = function (a, b) {
      if (!a) throw Error(b || '')
    },
    pd = cd(C, 'gapi', {})
  var qd = function (a, b, c) {
      var d = new RegExp('([#].*&|[#])' + b + '=([^&#]*)', 'g')
      b = new RegExp('([?#].*&|[?#])' + b + '=([^&#]*)', 'g')
      if ((a = a && (d.exec(a) || b.exec(a))))
        try {
          c = decodeURIComponent(a[2])
        } catch (e) {}
      return c
    },
    rd = new RegExp(
      /^/.source +
        /([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source +
        /(\/\/[^\/?#]*)?/.source +
        /([^?#]*)?/.source +
        /(\?([^#]*))?/.source +
        /(#((#|[^#])*))?/.source +
        /$/.source
    ),
    sd = /[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g,
    td = new RegExp(
      /(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source +
        /%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,
      'g'
    ),
    ud = /%([a-f]|[0-9a-fA-F][a-f])/g,
    vd = /^(https?|ftp|file|chrome-extension):$/i,
    wd = function (a) {
      a = String(a)
      a = a
        .replace(sd, function (e) {
          try {
            return encodeURIComponent(e)
          } catch (f) {
            return encodeURIComponent(e.replace(/^[^%]+$/g, '\ufffd'))
          }
        })
        .replace(td, function (e) {
          return e.replace(/%/g, '%25')
        })
        .replace(ud, function (e) {
          return e.toUpperCase()
        })
      a = a.match(rd) || []
      var b = nd(),
        c = function (e) {
          return e
            .replace(/\\/g, '%5C')
            .replace(/\^/g, '%5E')
            .replace(/`/g, '%60')
            .replace(/\{/g, '%7B')
            .replace(/\|/g, '%7C')
            .replace(/\}/g, '%7D')
        },
        d = !!(a[1] || '').match(vd)
      b.Td = c((a[1] || '') + (a[2] || '') + (a[3] || (a[2] && d ? '/' : '')))
      d = function (e) {
        return c(e.replace(/\?/g, '%3F').replace(/#/g, '%23'))
      }
      b.query = a[5] ? [d(a[5])] : []
      b.Sb = a[7] ? [d(a[7])] : []
      return b
    },
    xd = function (a) {
      return (
        a.Td +
        (0 < a.query.length ? '?' + a.query.join('&') : '') +
        (0 < a.Sb.length ? '#' + a.Sb.join('&') : '')
      )
    },
    yd = function (a, b) {
      var c = []
      if (a)
        for (var d in a)
          if (fd(a, d) && null != a[d]) {
            var e = b ? b(a[d]) : a[d]
            c.push(encodeURIComponent(d) + '=' + encodeURIComponent(e))
          }
      return c
    },
    zd = new RegExp(
      /\/?\??#?/.source +
        '(' +
        /[\/?#]/i.source +
        '|' +
        /[\uD800-\uDBFF]/i.source +
        '|' +
        /%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source +
        '|' +
        /%[0-9a-f]?/i.source +
        ')$',
      'i'
    ),
    Ad = function (a, b) {
      var c = wd(b)
      b = c.Td
      c.query.length && (b += '?' + c.query.join(''))
      c.Sb.length && (b += '#' + c.Sb.join(''))
      var d = ''
      2e3 < b.length &&
        ((d = b), (b = b.substr(0, 2e3)), (b = b.replace(zd, '')), (d = d.substr(b.length)))
      var e = a.createElement('div')
      a = a.createElement('a')
      c = wd(b)
      b = c.Td
      c.query.length && (b += '?' + c.query.join(''))
      c.Sb.length && (b += '#' + c.Sb.join(''))
      b = null === b ? 'null' : void 0 === b ? 'undefined' : b
      if ('string' !== typeof b) throw Error('Expected a string')
      Lc(a, new Bb(b, Ab))
      e.appendChild(a)
      b = Kc(new kb(ib, 'Assignment to self.'), e.innerHTML)
      if (void 0 !== e.tagName) {
        if ('script' === e.tagName.toLowerCase())
          throw Error('Use safeScriptEl.setTextContent with a SafeScript.')
        if ('style' === e.tagName.toLowerCase())
          throw Error('Use safeStyleEl.setTextContent with a SafeStyleSheet.')
      }
      e.innerHTML = Tb(b)
      b = String(e.firstChild.href)
      e.parentNode && e.parentNode.removeChild(e)
      c = wd(b + d)
      d = c.Td
      c.query.length && (d += '?' + c.query.join(''))
      c.Sb.length && (d += '#' + c.Sb.join(''))
      return d
    },
    Bd = /^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i
  var Cd
  var Ed = function (a, b, c) {
      Dd(a, b, c, 'add', 'at')
    },
    Dd = function (a, b, c, d, e) {
      if (a[d + 'EventListener']) a[d + 'EventListener'](b, c, !1)
      else if (a[e + 'tachEvent']) a[e + 'tachEvent']('on' + b, c)
    },
    Fd = function (a) {
      for (; a.firstChild; ) a.removeChild(a.firstChild)
    }
  var Gd = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/u\/(\d)\//,
    Hd = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/b\/(\d{10,21})\//,
    Id = function () {
      var a = ya('googleapis.config/sessionIndex')
      'string' === typeof a && 254 < a.length && (a = null)
      null == a && (a = window.__X_GOOG_AUTHUSER)
      'string' === typeof a && 254 < a.length && (a = null)
      if (null == a) {
        var b = window.google
        b && (a = b.authuser)
      }
      'string' === typeof a && 254 < a.length && (a = null)
      null == a &&
        ((b = window.location.href),
        (a = qd(b, 'authuser') || null),
        null == a && (a = (a = b.match(Gd)) ? a[1] : null))
      if (null == a) return null
      a = String(a)
      254 < a.length && (a = null)
      return a
    },
    Jd = function () {
      var a = ya('googleapis.config/sessionDelegate')
      'string' === typeof a && 21 < a.length && (a = null)
      null == a && (a = (a = window.location.href.match(Hd)) ? a[1] : null)
      if (null == a) return null
      a = String(a)
      21 < a.length && (a = null)
      return a
    }
  var Kd = {}
  Kd = cd(C, '___jsl', nd())
  cd(Kd, 'I', 0)
  cd(Kd, 'hel', 10)
  var Ld,
    Md,
    Nd = void 0,
    Od = function (a) {
      try {
        return p.JSON.parse.call(p.JSON, a)
      } catch (b) {
        return !1
      }
    },
    Pd = function (a) {
      return Object.prototype.toString.call(a)
    },
    Qd = Pd(0),
    Rd = Pd(new Date(0)),
    Sd = Pd(!0),
    Td = Pd(''),
    Ud = Pd({}),
    Vd = Pd([]),
    Wd = function (a, b) {
      if (b)
        for (var c = 0, d = b.length; c < d; ++c)
          if (a === b[c]) throw new TypeError('Converting circular structure to JSON')
      d = typeof a
      if ('undefined' !== d) {
        c = Array.prototype.slice.call(b || [], 0)
        c[c.length] = a
        b = []
        var e = Pd(a)
        if (
          null != a &&
          'function' === typeof a.toJSON &&
          (Object.prototype.hasOwnProperty.call(a, 'toJSON') ||
            ((e !== Vd || (a.constructor !== Array && a.constructor !== Object)) &&
              (e !== Ud || (a.constructor !== Array && a.constructor !== Object)) &&
              e !== Td &&
              e !== Qd &&
              e !== Sd &&
              e !== Rd))
        )
          return Wd(a.toJSON.call(a), c)
        if (null == a) b[b.length] = 'null'
        else if (e === Qd)
          (a = Number(a)),
            isNaN(a) || isNaN(a - a) ? (a = 'null') : -0 === a && 0 > 1 / a && (a = '-0'),
            (b[b.length] = String(a))
        else if (e === Sd) b[b.length] = String(!!Number(a))
        else {
          if (e === Rd) return Wd(a.toISOString.call(a), c)
          if (e === Vd && Pd(a.length) === Qd) {
            b[b.length] = '['
            var f = 0
            for (d = Number(a.length) >> 0; f < d; ++f)
              f && (b[b.length] = ','), (b[b.length] = Wd(a[f], c) || 'null')
            b[b.length] = ']'
          } else if (e == Td && Pd(a.length) === Qd) {
            b[b.length] = '"'
            f = 0
            for (c = Number(a.length) >> 0; f < c; ++f)
              (d = String.prototype.charAt.call(a, f)),
                (e = String.prototype.charCodeAt.call(a, f)),
                (b[b.length] =
                  '\b' === d
                    ? '\\b'
                    : '\f' === d
                    ? '\\f'
                    : '\n' === d
                    ? '\\n'
                    : '\r' === d
                    ? '\\r'
                    : '\t' === d
                    ? '\\t'
                    : '\\' === d || '"' === d
                    ? '\\' + d
                    : 31 >= e
                    ? '\\u' + (e + 65536).toString(16).substr(1)
                    : 32 <= e && 65535 >= e
                    ? d
                    : '\ufffd')
            b[b.length] = '"'
          } else if ('object' === d) {
            b[b.length] = '{'
            d = 0
            for (f in a)
              Object.prototype.hasOwnProperty.call(a, f) &&
                ((e = Wd(a[f], c)),
                void 0 !== e &&
                  (d++ && (b[b.length] = ','),
                  (b[b.length] = Wd(f)),
                  (b[b.length] = ':'),
                  (b[b.length] = e)))
            b[b.length] = '}'
          } else return
        }
        return b.join('')
      }
    },
    Xd = /[\0-\x07\x0b\x0e-\x1f]/,
    Yd = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/,
    Zd = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/,
    $d = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/,
    ae = /"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g,
    be = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g,
    ce = /[ \t\n\r]+/g,
    de = /[^"]:/,
    ee = /""/g,
    fe = /true|false|null/g,
    ge = /00/,
    he = /[\{]([^0\}]|0[^:])/,
    ie = /(^|\[)[,:]|[,:](\]|\}|[,:]|$)/,
    je = /[^\[,:][\[\{]/,
    ke = /^(\{|\}|\[|\]|,|:|0)+/,
    le = /\u2028/g,
    me = /\u2029/g,
    oe = function (a) {
      a = String(a)
      if (Xd.test(a) || Yd.test(a) || Zd.test(a) || $d.test(a)) return !1
      var b = a.replace(ae, '""')
      b = b.replace(be, '0')
      b = b.replace(ce, '')
      if (de.test(b)) return !1
      b = b.replace(ee, '0')
      b = b.replace(fe, '0')
      if (ge.test(b) || he.test(b) || ie.test(b) || je.test(b) || !b || (b = b.replace(ke, '')))
        return !1
      a = a.replace(le, '\\u2028').replace(me, '\\u2029')
      b = void 0
      try {
        b = Nd
          ? [Od(a)]
          : eval(
              '(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n' +
                a +
                '\n)'
            )
      } catch (c) {
        return !1
      }
      return b && 1 === b.length ? b[0] : !1
    },
    pe = function () {
      var a = ((p.document || {}).scripts || []).length
      if ((void 0 === Ld || void 0 === Nd || Md !== a) && -1 !== Md) {
        Ld = Nd = !1
        Md = -1
        try {
          try {
            Nd =
              !!p.JSON &&
              '{"a":[3,true,"1970-01-01T00:00:00.000Z"]}' ===
                p.JSON.stringify.call(p.JSON, { a: [3, !0, new Date(0)], c: function () {} }) &&
              !0 === Od('true') &&
              3 === Od('[{"a":3}]')[0].a
          } catch (b) {}
          Ld = Nd && !Od('[00]') && !Od('"\u0007"') && !Od('"\\0"') && !Od('"\\v"')
        } finally {
          Md = a
        }
      }
    },
    qe = function (a) {
      if (-1 === Md) return !1
      pe()
      return (Ld ? Od : oe)(a)
    },
    re = function (a) {
      if (-1 !== Md) return pe(), Nd ? p.JSON.stringify.call(p.JSON, a) : Wd(a)
    },
    se =
      !Date.prototype.toISOString ||
      'function' !== typeof Date.prototype.toISOString ||
      '1970-01-01T00:00:00.000Z' !== new Date(0).toISOString(),
    te = function () {
      var a = Date.prototype.getUTCFullYear.call(this)
      return [
        0 > a
          ? '-' + String(1e6 - a).substr(1)
          : 9999 >= a
          ? String(1e4 + a).substr(1)
          : '+' + String(1e6 + a).substr(1),
        '-',
        String(101 + Date.prototype.getUTCMonth.call(this)).substr(1),
        '-',
        String(100 + Date.prototype.getUTCDate.call(this)).substr(1),
        'T',
        String(100 + Date.prototype.getUTCHours.call(this)).substr(1),
        ':',
        String(100 + Date.prototype.getUTCMinutes.call(this)).substr(1),
        ':',
        String(100 + Date.prototype.getUTCSeconds.call(this)).substr(1),
        '.',
        String(1e3 + Date.prototype.getUTCMilliseconds.call(this)).substr(1),
        'Z',
      ].join('')
    }
  Date.prototype.toISOString = se ? te : Date.prototype.toISOString
  var ue = function () {
    this.blockSize = -1
  }
  var ve = function () {
    this.blockSize = -1
    this.blockSize = 64
    this.va = []
    this.og = []
    this.ik = []
    this.Df = []
    this.Df[0] = 128
    for (var a = 1; a < this.blockSize; ++a) this.Df[a] = 0
    this.hc = this.wd = 0
    this.reset()
  }
  v(ve, ue)
  ve.prototype.reset = function () {
    this.va[0] = 1732584193
    this.va[1] = 4023233417
    this.va[2] = 2562383102
    this.va[3] = 271733878
    this.va[4] = 3285377520
    this.hc = this.wd = 0
  }
  var we = function (a, b, c) {
    c || (c = 0)
    var d = a.ik
    if ('string' === typeof b)
      for (var e = 0; 16 > e; e++)
        (d[e] =
          (b.charCodeAt(c) << 24) |
          (b.charCodeAt(c + 1) << 16) |
          (b.charCodeAt(c + 2) << 8) |
          b.charCodeAt(c + 3)),
          (c += 4)
    else
      for (e = 0; 16 > e; e++)
        (d[e] = (b[c] << 24) | (b[c + 1] << 16) | (b[c + 2] << 8) | b[c + 3]), (c += 4)
    for (e = 16; 80 > e; e++) {
      var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16]
      d[e] = ((f << 1) | (f >>> 31)) & 4294967295
    }
    b = a.va[0]
    c = a.va[1]
    var g = a.va[2],
      h = a.va[3],
      l = a.va[4]
    for (e = 0; 80 > e; e++) {
      if (40 > e)
        if (20 > e) {
          f = h ^ (c & (g ^ h))
          var m = 1518500249
        } else (f = c ^ g ^ h), (m = 1859775393)
      else
        60 > e
          ? ((f = (c & g) | (h & (c | g))), (m = 2400959708))
          : ((f = c ^ g ^ h), (m = 3395469782))
      f = (((b << 5) | (b >>> 27)) + f + l + m + d[e]) & 4294967295
      l = h
      h = g
      g = ((c << 30) | (c >>> 2)) & 4294967295
      c = b
      b = f
    }
    a.va[0] = (a.va[0] + b) & 4294967295
    a.va[1] = (a.va[1] + c) & 4294967295
    a.va[2] = (a.va[2] + g) & 4294967295
    a.va[3] = (a.va[3] + h) & 4294967295
    a.va[4] = (a.va[4] + l) & 4294967295
  }
  ve.prototype.update = function (a, b) {
    if (null != a) {
      void 0 === b && (b = a.length)
      for (var c = b - this.blockSize, d = 0, e = this.og, f = this.wd; d < b; ) {
        if (0 == f) for (; d <= c; ) we(this, a, d), (d += this.blockSize)
        if ('string' === typeof a)
          for (; d < b; ) {
            if (((e[f] = a.charCodeAt(d)), ++f, ++d, f == this.blockSize)) {
              we(this, e)
              f = 0
              break
            }
          }
        else
          for (; d < b; )
            if (((e[f] = a[d]), ++f, ++d, f == this.blockSize)) {
              we(this, e)
              f = 0
              break
            }
      }
      this.wd = f
      this.hc += b
    }
  }
  ve.prototype.digest = function () {
    var a = [],
      b = 8 * this.hc
    56 > this.wd
      ? this.update(this.Df, 56 - this.wd)
      : this.update(this.Df, this.blockSize - (this.wd - 56))
    for (var c = this.blockSize - 1; 56 <= c; c--) (this.og[c] = b & 255), (b /= 256)
    we(this, this.og)
    for (c = b = 0; 5 > c; c++)
      for (var d = 24; 0 <= d; d -= 8) (a[b] = (this.va[c] >> d) & 255), ++b
    return a
  }
  var xe = function () {
    this.Ih = new ve()
  }
  k = xe.prototype
  k.reset = function () {
    this.Ih.reset()
  }
  k.updateByteArray = function (a) {
    this.Ih.update(a)
  }
  k.digestByteArray = function () {
    return this.Ih.digest()
  }
  k.updateString = function (a) {
    a = unescape(encodeURIComponent(a))
    for (var b = [], c = 0, d = a.length; c < d; ++c) b.push(a.charCodeAt(c))
    this.updateByteArray(b)
  }
  k.digestString = function () {
    for (var a = this.digestByteArray(), b = '', c = 0; c < a.length; c++)
      b += '0123456789ABCDEF'.charAt(Math.floor(a[c] / 16)) + '0123456789ABCDEF'.charAt(a[c] % 16)
    return b
  }
  var ye = C.crypto,
    ze = !1,
    Ae = 0,
    Be = 0,
    Ce = 1,
    De = 0,
    Ee = '',
    Fe = function (a) {
      a = a || C.event
      var b = (a.screenX + a.clientX) << 16
      b += a.screenY + a.clientY
      b *= new Date().getTime() % 1e6
      Ce = (Ce * b) % De
      0 < Ae && ++Be == Ae && Dd(C, 'mousemove', Fe, 'remove', 'de')
    },
    Ge = function (a) {
      var b = new xe()
      b.updateString(a)
      return b.digestString()
    }
  ze = !!ye && 'function' == typeof ye.getRandomValues
  ze ||
    ((De = 1e6 * (screen.width * screen.width + screen.height)),
    (Ee = Ge(ad.cookie + '|' + ad.location + '|' + new Date().getTime() + '|' + Math.random())),
    (Ae = ya('random/maxObserveMousemove') || 0),
    0 != Ae && Ed(C, 'mousemove', Fe))
  var He = function () {
      var a = Kd.onl
      if (!a) {
        a = nd()
        Kd.onl = a
        var b = nd()
        a.e = function (c) {
          var d = b[c]
          d && (delete b[c], d())
        }
        a.a = function (c, d) {
          b[c] = d
        }
        a.r = function (c) {
          delete b[c]
        }
      }
      return a
    },
    Ie = function (a, b) {
      b = b.onload
      return 'function' === typeof b ? (He().a(a, b), b) : null
    },
    Je = function (a) {
      D(/^\w+$/.test(a), 'Unsupported id - ' + a)
      return 'onload="window.___jsl.onl.e(&#34;' + a + '&#34;)"'
    },
    Ke = function (a) {
      He().r(a)
    }
  var Le = {
      allowtransparency: 'true',
      frameborder: '0',
      hspace: '0',
      marginheight: '0',
      marginwidth: '0',
      scrolling: 'no',
      style: '',
      tabindex: '0',
      vspace: '0',
      width: '100%',
    },
    Me = { allowtransparency: !0, onload: !0 },
    Ne = 0,
    Oe = function (a, b) {
      var c = 0
      do var d = b.id || ['I', Ne++, '_', new Date().getTime()].join('')
      while (a.getElementById(d) && 5 > ++c)
      D(5 > c, 'Error creating iframe id')
      return d
    },
    Pe = function (a, b) {
      return a ? b + '/' + a : ''
    },
    Qe = function (a, b, c, d) {
      var e = {},
        f = {}
      a.documentMode && 9 > a.documentMode && (e.hostiemode = a.documentMode)
      od(d.queryParams || {}, e)
      od(d.fragmentParams || {}, f)
      var g = d.pfname
      var h = nd()
      ya('iframes/dropLegacyIdParam') || (h.id = c)
      h._gfid = c
      h.parent = a.location.protocol + '//' + a.location.host
      c = qd(a.location.href, 'parent')
      g = g || ''
      !g &&
        c &&
        ((g = qd(a.location.href, '_gfid', '') || qd(a.location.href, 'id', '')),
        (g = Pe(g, qd(a.location.href, 'pfname', ''))))
      g ||
        ((c = qe(qd(a.location.href, 'jcp', ''))) &&
          'object' == typeof c &&
          (g = Pe(c.id, c.pfname)))
      h.pfname = g
      d.connectWithJsonParam && ((g = {}), (g.jcp = re(h)), (h = g))
      g = qd(b, 'rpctoken') || e.rpctoken || f.rpctoken
      if (!g) {
        if (!(g = d.rpctoken)) {
          g = String
          c = Math
          var l = c.round
          if (ze) {
            var m = new C.Uint32Array(1)
            ye.getRandomValues(m)
            m = Number('0.' + m[0])
          } else
            (m = Ce),
              (m += parseInt(Ee.substr(0, 20), 16)),
              (Ee = Ge(Ee)),
              (m /= De + Math.pow(16, 20))
          g = g(l.call(c, 1e8 * m))
        }
        h.rpctoken = g
      }
      d.rpctoken = g
      od(h, d.connectWithQueryParams ? e : f)
      h = a.location.href
      a = nd()
      ;(g = qd(h, '_bsh', Kd.bsh)) && (a._bsh = g)
      ;(h = Kd.dpo ? Kd.h : qd(h, 'jsh', Kd.h)) && (a.jsh = h)
      d.hintInFragment ? od(a, f) : od(a, e)
      d = d.paramsSerializer
      b = wd(b)
      b.query.push.apply(b.query, yd(e, d))
      b.Sb.push.apply(b.Sb, yd(f, d))
      return xd(b)
    },
    Re = function (a) {
      D(!a || Bd.test(a), 'Illegal url for new iframe - ' + a)
    },
    Se = function (a, b, c, d, e) {
      Re(c.src)
      var f,
        g = Ie(d, c),
        h = g ? Je(d) : ''
      try {
        document.all &&
          (f = a.createElement(
            '<iframe frameborder="' +
              md(String(c.frameborder)) +
              '" scrolling="' +
              md(String(c.scrolling)) +
              '" ' +
              h +
              ' name="' +
              md(String(c.name)) +
              '"/>'
          ))
      } catch (m) {
      } finally {
        f ||
          ((f = (a ? new $c(Zc(a)) : Aa || (Aa = new $c())).xk('IFRAME')),
          g &&
            ((f.onload = function () {
              f.onload = null
              g.call(this)
            }),
            Ke(d)))
      }
      f.setAttribute('ng-non-bindable', '')
      for (var l in c)
        (a = c[l]),
          'style' === l && 'object' === typeof a
            ? od(a, f.style)
            : Me[l] || f.setAttribute(l, String(a))
      ;(l = (e && e.beforeNode) || null) || (e && e.dontclear) || Fd(b)
      b.insertBefore(f, l)
      f = l ? l.previousSibling : b.lastChild
      c.allowtransparency && (f.allowTransparency = !0)
      return f
    }
  var Te = /^:[\w]+$/,
    Ue = /:([a-zA-Z_]+):/g,
    Ve = function (a, b) {
      a = Id() || '0'
      var c = Jd()
      var d = Id() || a
      var e = Jd(),
        f = ''
      d && (f += 'u/' + encodeURIComponent(String(d)) + '/')
      e && (f += 'b/' + encodeURIComponent(String(e)) + '/')
      d = f || null
      ;(f = (e = !1 === ya('isLoggedIn')) ? '_/im/' : '') && (d = '')
      var g = ya('iframes/:socialhost:'),
        h = ya('iframes/:im_socialhost:')
      Cd = {
        socialhost: g,
        ctx_socialhost: e ? h : g,
        session_index: a,
        session_delegate: c,
        session_prefix: d,
        im_prefix: f,
      }
      return Cd[b] || ''
    },
    We = function (a) {
      var b = a
      Te.test(a) &&
        ((b = ya('iframes/' + b.substring(1) + '/url')),
        D(!!b, 'Unknown iframe url config for - ' + a))
      return Ad(ad, b.replace(Ue, Ve))
    },
    Xe = function (a, b, c) {
      c = c || {}
      var d = c.attributes || {}
      D(
        !(c.allowPost || c.forcePost) || !d.onload,
        'onload is not supported by post iframe (allowPost or forcePost)'
      )
      a = We(a)
      d = b.ownerDocument || ad
      var e = Oe(d, c)
      a = Qe(d, a, e, c)
      var f = c,
        g = nd()
      od(Le, g)
      od(f.attributes, g)
      g.name = g.id = e
      g.src = a
      c.eurl = a
      c = (f = c) || {}
      var h = !!c.allowPost
      if (c.forcePost || (h && 2e3 < a.length)) {
        c = wd(a)
        g.src = ''
        f.dropDataPostorigin || (g['data-postorigin'] = a)
        a = Se(d, b, g, e)
        if (-1 != navigator.userAgent.indexOf('WebKit')) {
          var l = a.contentWindow.document
          l.open()
          g = l.createElement('div')
          h = {}
          var m = e + '_inner'
          h.name = m
          h.src = ''
          h.style = 'display:none'
          Se(d, g, h, m, f)
        }
        g = (f = c.query[0]) ? f.split('&') : []
        f = []
        for (h = 0; h < g.length; h++)
          (m = g[h].split('=', 2)), f.push([decodeURIComponent(m[0]), decodeURIComponent(m[1])])
        c.query = []
        g = xd(c)
        D(Bd.test(g), 'Invalid URL: ' + g)
        c = d.createElement('form')
        c.method = 'POST'
        c.target = e
        c.style.display = 'none'
        e = g instanceof Bb ? g : Ib(g)
        oc(c, 'FORM').action = Cb(e)
        for (e = 0; e < f.length; e++)
          (g = d.createElement('input')),
            (g.type = 'hidden'),
            (g.name = f[e][0]),
            (g.value = f[e][1]),
            c.appendChild(g)
        b.appendChild(c)
        c.submit()
        c.parentNode.removeChild(c)
        l && l.close()
        b = a
      } else b = Se(d, b, g, e, f)
      return b
    }
  window.osapi = window.osapi || {}
  window.___jsl = window.___jsl || {}
  ;(window.___jsl.cd = window.___jsl.cd || []).push({
    gwidget: { parsetags: 'explicit' },
    appsapi: { plus_one_service: '/plus/v1' },
    csi: { rate: 0.01 },
    poshare: { hangoutContactPickerServer: 'https://plus.google.com' },
    gappsutil: {
      required_scopes: [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/plus.people.recommended',
      ],
      display_on_page_ready: !1,
    },
    appsutil: {
      required_scopes: [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/plus.people.recommended',
      ],
      display_on_page_ready: !1,
    },
    'oauth-flow': {
      authUrl: 'https://accounts.google.com/o/oauth2/auth',
      proxyUrl: 'https://accounts.google.com/o/oauth2/postmessageRelay',
      redirectUri: 'postmessage',
    },
    iframes: {
      sharebox: { params: { json: '&' }, url: ':socialhost:/:session_prefix:_/sharebox/dialog' },
      plus: { url: ':socialhost:/:session_prefix:_/widget/render/badge?usegapi=1' },
      ':socialhost:': 'https://apis.google.com',
      ':im_socialhost:': 'https://plus.googleapis.com',
      domains_suggest: { url: 'https://domains.google.com/suggest/flow' },
      card: {
        params: { s: '#', userid: '&' },
        url: ':socialhost:/:session_prefix:_/hovercard/internalcard',
      },
      ':signuphost:': 'https://plus.google.com',
      ':gplus_url:': 'https://plus.google.com',
      plusone: { url: ':socialhost:/:session_prefix:_/+1/fastbutton?usegapi=1' },
      plus_share: { url: ':socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true&usegapi=1' },
      plus_circle: { url: ':socialhost:/:session_prefix:_/widget/plus/circle?usegapi=1' },
      plus_followers: { url: ':socialhost:/_/im/_/widget/render/plus/followers?usegapi=1' },
      configurator: { url: ':socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi=1' },
      appcirclepicker: { url: ':socialhost:/:session_prefix:_/widget/render/appcirclepicker' },
      page: { url: ':socialhost:/:session_prefix:_/widget/render/page?usegapi=1' },
      person: { url: ':socialhost:/:session_prefix:_/widget/render/person?usegapi=1' },
      community: {
        url: ':ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi=1',
      },
      follow: { url: ':socialhost:/:session_prefix:_/widget/render/follow?usegapi=1' },
      commentcount: { url: ':socialhost:/:session_prefix:_/widget/render/commentcount?usegapi=1' },
      comments: { url: ':socialhost:/:session_prefix:_/widget/render/comments?usegapi=1' },
      youtube: { url: ':socialhost:/:session_prefix:_/widget/render/youtube?usegapi=1' },
      reportabuse: { url: ':socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi=1' },
      additnow: { url: ':socialhost:/additnow/additnow.html' },
      appfinder: {
        url: 'https://workspace.google.com/:session_prefix:marketplace/appfinder?usegapi=1',
      },
      ':source:': '1p',
    },
    poclient: { update_session: 'google.updateSessionCallback' },
    'googleapis.config': {
      rpc: '/rpc',
      root: 'https://content.googleapis.com',
      'root-1p': 'https://clients6.google.com',
      useGapiForXd3: !0,
      xd3: '/static/proxy.html',
      auth: { useInterimAuth: !1 },
    },
    report: {
      apis: ['iframes\\..*', 'gadgets\\..*', 'gapi\\.appcirclepicker\\..*', 'gapi\\.client\\..*'],
      rate: 1e-4,
    },
    client: { perApiBatch: !0 },
  })
  var Ye = function (a) {
      var b = (window.___jsl = window.___jsl || {})
      b[a] = b[a] || []
      return b[a]
    },
    Ze = function (a) {
      var b = (window.___jsl = window.___jsl || {})
      b.cfg = (!a && b.cfg) || {}
      return b.cfg
    },
    $e = function (a) {
      return 'object' === typeof a && /\[native code\]/.test(a.push)
    },
    af = function (a, b, c) {
      if (b && 'object' === typeof b)
        for (var d in b)
          !Object.prototype.hasOwnProperty.call(b, d) ||
            (c && '___goc' === d && 'undefined' === typeof b[d]) ||
            (a[d] &&
            b[d] &&
            'object' === typeof a[d] &&
            'object' === typeof b[d] &&
            !$e(a[d]) &&
            !$e(b[d])
              ? af(a[d], b[d])
              : b[d] && 'object' === typeof b[d]
              ? ((a[d] = $e(b[d]) ? [] : {}), af(a[d], b[d]))
              : (a[d] = b[d]))
    },
    bf = function (a) {
      if (a && !/^\s+$/.test(a)) {
        for (; 0 == a.charCodeAt(a.length - 1); ) a = a.substring(0, a.length - 1)
        try {
          var b = window.JSON.parse(a)
        } catch (c) {}
        if ('object' === typeof b) return b
        try {
          b = new Function('return (' + a + '\n)')()
        } catch (c) {}
        if ('object' === typeof b) return b
        try {
          b = new Function('return ({' + a + '\n})')()
        } catch (c) {}
        return 'object' === typeof b ? b : {}
      }
    },
    cf = function (a, b) {
      var c = { ___goc: void 0 }
      a.length &&
        a[a.length - 1] &&
        Object.hasOwnProperty.call(a[a.length - 1], '___goc') &&
        'undefined' === typeof a[a.length - 1].___goc &&
        (c = a.pop())
      af(c, b)
      a.push(c)
    },
    df = function (a) {
      Ze(!0)
      var b = window.___gcfg,
        c = Ye('cu'),
        d = window.___gu
      b && b !== d && (cf(c, b), (window.___gu = b))
      b = Ye('cu')
      var e = document.scripts || document.getElementsByTagName('script') || []
      d = []
      var f = []
      f.push.apply(f, Ye('us'))
      for (var g = 0; g < e.length; ++g)
        for (var h = e[g], l = 0; l < f.length; ++l) h.src && 0 == h.src.indexOf(f[l]) && d.push(h)
      0 == d.length && 0 < e.length && e[e.length - 1].src && d.push(e[e.length - 1])
      for (e = 0; e < d.length; ++e)
        d[e].getAttribute('gapi_processed') ||
          (d[e].setAttribute('gapi_processed', !0),
          (f = d[e])
            ? ((g = f.nodeType), (f = 3 == g || 4 == g ? f.nodeValue : f.textContent || ''))
            : (f = void 0),
          (f = bf(f)) && b.push(f))
      a && cf(c, a)
      d = Ye('cd')
      a = 0
      for (b = d.length; a < b; ++a) af(Ze(), d[a], !0)
      d = Ye('ci')
      a = 0
      for (b = d.length; a < b; ++a) af(Ze(), d[a], !0)
      a = 0
      for (b = c.length; a < b; ++a) af(Ze(), c[a], !0)
    }
  var ef = function () {
    var a = window.__GOOGLEAPIS
    a &&
      (a.googleapis && !a['googleapis.config'] && (a['googleapis.config'] = a.googleapis),
      cd(Kd, 'ci', []).push(a),
      (window.__GOOGLEAPIS = void 0))
  }
  ef && ef()
  df()
  r('gapi.config.get', function (a, b) {
    var c = Ze()
    if (!a) return c
    a = a.split('/')
    for (var d = 0, e = a.length; c && 'object' === typeof c && d < e; ++d) c = c[a[d]]
    return d === a.length && void 0 !== c ? c : b
  })
  r('gapi.config.update', function (a, b) {
    var c
    if ('string' === typeof a) {
      var d = (c = {})
      a = a.split('/')
      for (var e = 0, f = a.length; e < f - 1; ++e) {
        var g = {}
        d = d[a[e]] = g
      }
      d[a[e]] = b
    } else c = a
    df(c)
  })
  var ff = function (a) {
    if (!a) return ''
    if (/^about:(?:blank|srcdoc)$/.test(a)) return window.origin || ''
    a = a.split('#')[0].split('?')[0]
    a = a.toLowerCase()
    0 == a.indexOf('//') && (a = window.location.protocol + a)
    ;/^[\w\-]*:\/\//.test(a) || (a = window.location.href)
    var b = a.substring(a.indexOf('://') + 3),
      c = b.indexOf('/')
    ;-1 != c && (b = b.substring(0, c))
    c = a.substring(0, a.indexOf('://'))
    if (!c) throw Error('URI is missing protocol: ' + a)
    if (
      'http' !== c &&
      'https' !== c &&
      'chrome-extension' !== c &&
      'moz-extension' !== c &&
      'file' !== c &&
      'android-app' !== c &&
      'chrome-search' !== c &&
      'chrome-untrusted' !== c &&
      'chrome' !== c &&
      'app' !== c &&
      'devtools' !== c
    )
      throw Error('Invalid URI scheme in origin: ' + c)
    a = ''
    var d = b.indexOf(':')
    if (-1 != d) {
      var e = b.substring(d + 1)
      b = b.substring(0, d)
      if (('http' === c && '80' !== e) || ('https' === c && '443' !== e)) a = ':' + e
    }
    return c + '://' + b + a
  }
  var jf = function (a) {
    this.mb = a
    this.Context = gf(a)
    this.Iframe = hf(a)
  }
  k = jf.prototype
  k.CROSS_ORIGIN_IFRAMES_FILTER = function (a) {
    return this.mb().CROSS_ORIGIN_IFRAMES_FILTER(a)
  }
  k.SAME_ORIGIN_IFRAMES_FILTER = function (a) {
    return this.mb().SAME_ORIGIN_IFRAMES_FILTER(a)
  }
  k.create = function (a, b, c) {
    return this.mb().create(a, b, c)
  }
  k.getBeforeOpenStyle = function (a) {
    return this.mb().getBeforeOpenStyle(a)
  }
  k.getContext = function () {
    return this.mb().getContext()
  }
  k.getStyle = function (a) {
    return this.mb().getStyle(a)
  }
  k.makeWhiteListIframesFilter = function (a) {
    return this.mb().makeWhiteListIframesFilter(a)
  }
  k.registerBeforeOpenStyle = function (a, b) {
    return this.mb().registerBeforeOpenStyle(a, b)
  }
  k.registerIframesApi = function (a, b, c) {
    return this.mb().registerIframesApi(a, b, c)
  }
  k.registerIframesApiHandler = function (a, b, c) {
    return this.mb().registerIframesApiHandler(a, b, c)
  }
  k.registerStyle = function (a, b) {
    return this.mb().registerStyle(a, b)
  }
  function gf(a) {
    var b = function (c) {
      return new (a().Context)(c)
    }
    b.prototype.addOnConnectHandler = function (c, d, e, f) {
      return a().Context.prototype.addOnConnectHandler.apply(this, [c, d, e, f])
    }
    b.prototype.addOnOpenerHandler = function (c, d, e) {
      return a().Context.prototype.addOnOpenerHandler.apply(this, [c, d, e])
    }
    b.prototype.closeSelf = function (c, d, e) {
      return a().Context.prototype.closeSelf.apply(this, [c, d, e])
    }
    b.prototype.connectIframes = function (c, d) {
      a().Context.prototype.connectIframes.apply(this, [c, d])
    }
    b.prototype.getFrameName = function () {
      return a().Context.prototype.getFrameName.apply(this)
    }
    b.prototype.getGlobalParam = function (c) {
      a().Context.prototype.getGlobalParam.apply(this, [c])
    }
    b.prototype.getParentIframe = function () {
      return a().Context.prototype.getParentIframe.apply(this)
    }
    b.prototype.getWindow = function () {
      return a().Context.prototype.getWindow.apply(this)
    }
    b.prototype.isDisposed = function () {
      return a().Context.prototype.isDisposed.apply(this)
    }
    b.prototype.open = function (c, d) {
      return a().Context.prototype.open.apply(this, [c, d])
    }
    b.prototype.openChild = function (c) {
      return a().Context.prototype.openChild.apply(this, [c])
    }
    b.prototype.ready = function (c, d, e, f) {
      a().Context.prototype.ready.apply(this, [c, d, e, f])
    }
    b.prototype.removeOnConnectHandler = function (c) {
      a().Context.prototype.removeOnConnectHandler.apply(this, [c])
    }
    b.prototype.restyleSelf = function (c, d, e) {
      return a().Context.prototype.restyleSelf.apply(this, [c, d, e])
    }
    b.prototype.setCloseSelfFilter = function (c) {
      a().Context.prototype.setCloseSelfFilter.apply(this, [c])
    }
    b.prototype.setGlobalParam = function (c, d) {
      a().Context.prototype.setGlobalParam.apply(this, [c, d])
    }
    b.prototype.setRestyleSelfFilter = function (c) {
      a().Context.prototype.setRestyleSelfFilter.apply(this, [c])
    }
    return b
  }
  function hf(a) {
    var b = function (c, d, e, f) {
      return new (a().Iframe)(c, d, e, f)
    }
    b.prototype.applyIframesApi = function (c) {
      a().Iframe.prototype.applyIframesApi(c)
    }
    b.prototype.close = function (c, d) {
      return a().Iframe.prototype.close.apply(this, [c, d])
    }
    b.prototype.getContext = function () {
      return a().Iframe.prototype.getContext.apply(this, [])
    }
    b.prototype.getFrameName = function () {
      return a().Iframe.prototype.getFrameName.apply(this, [])
    }
    b.prototype.getId = function () {
      return a().Iframe.prototype.getId.apply(this, [])
    }
    b.prototype.getIframeEl = function () {
      return a().Iframe.prototype.getIframeEl.apply(this, [])
    }
    b.prototype.getOrigin = function () {
      return a().Iframe.prototype.getOrigin.apply(this, [])
    }
    b.prototype.getParam = function (c) {
      a().Iframe.prototype.getParam.apply(this, [c])
    }
    b.prototype.getSiteEl = function () {
      return a().Iframe.prototype.getSiteEl.apply(this, [])
    }
    b.prototype.getWindow = function () {
      return a().Iframe.prototype.getWindow.apply(this, [])
    }
    b.prototype.isDisposed = function () {
      return a().Iframe.prototype.isDisposed.apply(this, [])
    }
    b.prototype.ping = function (c, d) {
      return a().Iframe.prototype.ping.apply(this, [c, d])
    }
    b.prototype.register = function (c, d, e) {
      a().Iframe.prototype.register.apply(this, [c, d, e])
    }
    b.prototype.registerWasClosed = function (c, d) {
      a().Iframe.prototype.registerWasClosed.apply(this, [c, d])
    }
    b.prototype.registerWasRestyled = function (c, d) {
      a().Iframe.prototype.registerWasRestyled.apply(this, [c, d])
    }
    b.prototype.restyle = function (c, d) {
      return a().Iframe.prototype.restyle.apply(this, [c, d])
    }
    b.prototype.send = function (c, d, e, f) {
      return a().Iframe.prototype.send.apply(this, [c, d, e, f])
    }
    b.prototype.setParam = function (c, d) {
      a().Iframe.prototype.setParam.apply(this, [c, d])
    }
    b.prototype.setSiteEl = function (c) {
      a().Iframe.prototype.setSiteEl.apply(this, [c])
    }
    b.prototype.unregister = function (c, d) {
      a().Iframe.prototype.unregister.apply(this, [c, d])
    }
    return b
  }
  function kf(a, b) {
    b = void 0 === b ? new Set() : b
    if (b.has(a)) return '(Recursive reference)'
    switch (typeof a) {
      case 'object':
        if (a) {
          var c = Object.getPrototypeOf(a)
          switch (c) {
            case Map.prototype:
            case Set.prototype:
            case Array.prototype:
              b.add(a)
              var d =
                '[' +
                Array.from(a, function (e) {
                  return kf(e, b)
                }).join(', ') +
                ']'
              b.delete(a)
              c !== Array.prototype && (d = lf(c.constructor) + '(' + d + ')')
              return d
            case Object.prototype:
              return (
                b.add(a),
                (c =
                  '{' +
                  Object.entries(a)
                    .map(function (e) {
                      var f = ha(e)
                      e = f.next().value
                      f = f.next().value
                      return e + ': ' + kf(f, b)
                    })
                    .join(', ') +
                  '}'),
                b.delete(a),
                c
              )
            default:
              return (
                (d = 'Object'),
                c && c.constructor && (d = lf(c.constructor)),
                'function' === typeof a.toString && a.toString !== Object.prototype.toString
                  ? d + '(' + String(a) + ')'
                  : '(object ' + d + ')'
              )
          }
        }
        break
      case 'function':
        return 'function ' + lf(a)
      case 'number':
        if (!Number.isFinite(a)) return String(a)
        break
      case 'bigint':
        return a.toString(10) + 'n'
      case 'symbol':
        return a.toString()
    }
    return JSON.stringify(a)
  }
  function lf(a) {
    var b = a.name
    b || (b = (a = /function\s+([^\(]+)/m.exec(String(a))) ? a[1] : '(Anonymous)')
    return b
  }
  var mf = (function (a, b) {
      a.Gi =
        'function' === typeof b
          ? b
          : function () {
              return b
            }
      return a
    })(function (a) {
      return null !== a && void 0 !== a
    }, 'exists'),
    nf = void 0
  function of(a) {
    var b = nf
    nf = void 0
    var c = [],
      d = mf(a, c)
    !d && c && ((a = 'Expected ' + mf.Gi() + ', got ' + kf(a)), c.push(a))
    if (!d)
      throw (
        ((d = ''),
        b && (d = b() + '\n'),
        Error(d + 'Guard ' + mf.Gi() + ' failed:\n' + c.reverse().join('\n')))
      )
  }
  var pf = function () {
    this.Cb = []
    this.ri = this.rk = this.lk = !1
  }
  pf.prototype.mb = function (a) {
    this.ri = !0
    return this.Cb.length ? qf(this, this.Cb[0], a) : void 0
  }
  var qf = function (a, b, c) {
      c =
        void 0 === c
          ? function (d) {
              return new d()
            }
          : c
      if (!b.Xe) return b.instance
      c = c(b.Xe)
      a.rk && (delete b.Xe, (b.instance = c))
      return c
    },
    rf = function () {
      pf.apply(this, arguments)
    }
  n(rf, pf)
  var tf = function (a) {
    var b = sf.oi
    w(b.lk || !b.ri, 'Cannot register new delegates after instantiation.')
    var c = a.priority,
      d = ~Ta(b.Cb, function (f) {
        return f.priority < c ? -1 : 1
      }),
      e = 0 < d ? b.Cb[d - 1] : null
    e &&
      e.priority <= c &&
      w(
        !1,
        'two delegates registered with same priority (%s): %s and %s',
        c,
        e.Xe || e.instance,
        a.Xe || a.instance
      )
    b.Cb.splice(d, 0, a)
  }
  var sf = new (function () {
    var a = this
    this.oi = new rf()
    this.instance = new jf(function () {
      var b = a.oi.mb()
      of(b)
      return b()
    })
  })()
  tf({
    instance: function () {
      var a = window.gapi
      of(a)
      a = a.iframes
      of(a)
      return a
    },
    priority: 1,
  })
  var uf = { height: !0, width: !0 },
    vf =
      /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i,
    wf = function (a) {
      'number' === typeof a && (a = String(a) + 'px')
      return a
    }
  var xf = function (a, b) {
    this.wl = 100
    this.yk = a
    this.Sl = b
    this.Bf = 0
    this.Za = null
  }
  xf.prototype.get = function () {
    if (0 < this.Bf) {
      this.Bf--
      var a = this.Za
      this.Za = a.next
      a.next = null
    } else a = this.yk()
    return a
  }
  xf.prototype.put = function (a) {
    this.Sl(a)
    this.Bf < this.wl && (this.Bf++, (a.next = this.Za), (this.Za = a))
  }
  var yf,
    zf = function () {
      var a = p.MessageChannel
      'undefined' === typeof a &&
        'undefined' !== typeof window &&
        window.postMessage &&
        window.addEventListener &&
        !B('Presto') &&
        (a = function () {
          var e = Vc(document, 'IFRAME')
          e.style.display = 'none'
          document.documentElement.appendChild(e)
          var f = e.contentWindow
          e = f.document
          e.open()
          e.close()
          var g = 'callImmediate' + Math.random(),
            h = 'file:' == f.location.protocol ? '*' : f.location.protocol + '//' + f.location.host
          e = u(function (l) {
            if (('*' == h || l.origin == h) && l.data == g) this.port1.onmessage()
          }, this)
          f.addEventListener('message', e, !1)
          this.port1 = {}
          this.port2 = {
            postMessage: function () {
              f.postMessage(g, h)
            },
          }
        })
      if ('undefined' !== typeof a && !Pb()) {
        var b = new a(),
          c = {},
          d = c
        b.port1.onmessage = function () {
          if (void 0 !== c.next) {
            c = c.next
            var e = c.cb
            c.cb = null
            e()
          }
        }
        return function (e) {
          d.next = { cb: e }
          d = d.next
          b.port2.postMessage(0)
        }
      }
      return function (e) {
        p.setTimeout(e, 0)
      }
    }
  function Af(a) {
    p.setTimeout(function () {
      throw a
    }, 0)
  }
  var Bf = function () {
    this.ag = this.Zc = null
  }
  Bf.prototype.add = function (a, b) {
    var c = Cf.get()
    c.set(a, b)
    this.ag ? (this.ag.next = c) : (w(!this.Zc), (this.Zc = c))
    this.ag = c
  }
  Bf.prototype.remove = function () {
    var a = null
    this.Zc &&
      ((a = this.Zc), (this.Zc = this.Zc.next), this.Zc || (this.ag = null), (a.next = null))
    return a
  }
  var Cf = new xf(
      function () {
        return new Df()
      },
      function (a) {
        return a.reset()
      }
    ),
    Df = function () {
      this.next = this.scope = this.be = null
    }
  Df.prototype.set = function (a, b) {
    this.be = a
    this.scope = b
    this.next = null
  }
  Df.prototype.reset = function () {
    this.next = this.scope = this.be = null
  }
  var Ef = p.console && p.console.createTask ? p.console.createTask.bind(p.console) : void 0,
    Ff = Ef ? Symbol('consoleTask') : void 0
  function Gf(a, b) {
    function c() {
      var e = oa.apply(0, arguments),
        f = this
      return d.run(function () {
        var g = a.call,
          h = g.apply,
          l = [f],
          m = l.concat
        if (e instanceof Array) var q = e
        else {
          q = ha(e)
          for (var x, z = []; !(x = q.next()).done; ) z.push(x.value)
          q = z
        }
        return h.call(g, a, m.call(l, q))
      })
    }
    b = void 0 === b ? 'anonymous' : b
    if (!Ef || a[Ea(Ff)]) return a
    var d = Ef(a.name || b)
    c[Ea(Ff)] = d
    return c
  }
  var Hf,
    If = !1,
    Jf = new Bf(),
    Lf = function (a, b) {
      Hf || Kf()
      If || (Hf(), (If = !0))
      a = Gf(a, 'goog.async.run')
      Jf.add(a, b)
    },
    Kf = function () {
      if (p.Promise && p.Promise.resolve) {
        var a = p.Promise.resolve(void 0)
        Hf = function () {
          a.then(Mf)
        }
      } else
        Hf = function () {
          var b = Mf
          'function' !== typeof p.setImmediate ||
          (p.Window &&
            p.Window.prototype &&
            (Ob() || !B('Edge')) &&
            p.Window.prototype.setImmediate == p.setImmediate)
            ? (yf || (yf = zf()), yf(b))
            : p.setImmediate(b)
        }
    },
    Mf = function () {
      for (var a; (a = Jf.remove()); ) {
        try {
          a.be.call(a.scope)
        } catch (b) {
          Af(b)
        }
        Cf.put(a)
      }
      If = !1
    }
  var Nf = function (a) {
    if (!a) return !1
    try {
      return !!a.$goog_Thenable
    } catch (b) {
      return !1
    }
  }
  var E = function (a, b) {
      this.Ba = 0
      this.Ua = void 0
      this.hd = this.Xb = this.Ha = null
      this.ef = this.Dg = !1
      if (a != Ic)
        try {
          var c = this
          a.call(
            b,
            function (d) {
              Of(c, 2, d)
            },
            function (d) {
              if (!(d instanceof Pf))
                try {
                  if (d instanceof Error) throw d
                  throw Error('Promise rejected.')
                } catch (e) {}
              Of(c, 3, d)
            }
          )
        } catch (d) {
          Of(this, 3, d)
        }
    },
    Qf = function () {
      this.next = this.context = this.zd = this.Rc = this.child = null
      this.Sd = !1
    }
  Qf.prototype.reset = function () {
    this.context = this.zd = this.Rc = this.child = null
    this.Sd = !1
  }
  var Rf = new xf(
      function () {
        return new Qf()
      },
      function (a) {
        a.reset()
      }
    ),
    Sf = function (a, b, c) {
      var d = Rf.get()
      d.Rc = a
      d.zd = b
      d.context = c
      return d
    },
    F = function (a) {
      if (a instanceof E) return a
      var b = new E(Ic)
      Of(b, 2, a)
      return b
    },
    G = function (a) {
      return new E(function (b, c) {
        c(a)
      })
    },
    Uf = function (a, b, c) {
      Tf(a, b, c, null) || Lf(wa(b, a))
    },
    Vf = function (a) {
      return new E(function (b, c) {
        var d = a.length,
          e = []
        if (d)
          for (
            var f = function (m, q) {
                d--
                e[m] = q
                0 == d && b(e)
              },
              g = function (m) {
                c(m)
              },
              h = 0,
              l;
            h < a.length;
            h++
          )
            (l = a[h]), Uf(l, wa(f, h), g)
        else b(e)
      })
    },
    Wf = function (a) {
      return new E(function (b) {
        var c = a.length,
          d = []
        if (c)
          for (
            var e = function (h, l, m) {
                c--
                d[h] = l ? { Ai: !0, value: m } : { Ai: !1, reason: m }
                0 == c && b(d)
              },
              f = 0,
              g;
            f < a.length;
            f++
          )
            (g = a[f]), Uf(g, wa(e, f, !0), wa(e, f, !1))
        else b(d)
      })
    }
  E.prototype.then = function (a, b, c) {
    null != a && Ia(a, 'opt_onFulfilled should be a function.')
    null != b &&
      Ia(
        b,
        'opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?'
      )
    return Xf(this, 'function' === typeof a ? a : null, 'function' === typeof b ? b : null, c)
  }
  E.prototype.$goog_Thenable = !0
  E.prototype.Bc = function (a, b) {
    a = Sf(a, a, b)
    a.Sd = !0
    Yf(this, a)
    return this
  }
  E.prototype.l = function (a, b) {
    return Xf(this, null, a, b)
  }
  E.prototype.catch = E.prototype.l
  E.prototype.cancel = function (a) {
    if (0 == this.Ba) {
      var b = new Pf(a)
      Lf(function () {
        Zf(this, b)
      }, this)
    }
  }
  var Zf = function (a, b) {
      if (0 == a.Ba)
        if (a.Ha) {
          var c = a.Ha
          if (c.Xb) {
            for (
              var d = 0, e = null, f = null, g = c.Xb;
              g && (g.Sd || (d++, g.child == a && (e = g), !(e && 1 < d)));
              g = g.next
            )
              e || (f = g)
            e &&
              (0 == c.Ba && 1 == d
                ? Zf(c, b)
                : (f
                    ? ((d = f),
                      w(c.Xb),
                      w(null != d),
                      d.next == c.hd && (c.hd = d),
                      (d.next = d.next.next))
                    : $f(c),
                  ag(c, e, 3, b)))
          }
          a.Ha = null
        } else Of(a, 3, b)
    },
    Yf = function (a, b) {
      a.Xb || (2 != a.Ba && 3 != a.Ba) || bg(a)
      w(null != b.Rc)
      a.hd ? (a.hd.next = b) : (a.Xb = b)
      a.hd = b
    },
    Xf = function (a, b, c, d) {
      b && (b = Gf(b, 'goog.Promise.then'))
      c && (c = Gf(c, 'goog.Promise.then'))
      var e = Sf(null, null, null)
      e.child = new E(function (f, g) {
        e.Rc = b
          ? function (h) {
              try {
                var l = b.call(d, h)
                f(l)
              } catch (m) {
                g(m)
              }
            }
          : f
        e.zd = c
          ? function (h) {
              try {
                var l = c.call(d, h)
                void 0 === l && h instanceof Pf ? g(h) : f(l)
              } catch (m) {
                g(m)
              }
            }
          : g
      })
      e.child.Ha = a
      Yf(a, e)
      return e.child
    }
  E.prototype.sm = function (a) {
    w(1 == this.Ba)
    this.Ba = 0
    Of(this, 2, a)
  }
  E.prototype.tm = function (a) {
    w(1 == this.Ba)
    this.Ba = 0
    Of(this, 3, a)
  }
  var Of = function (a, b, c) {
      0 == a.Ba &&
        (a === c && ((b = 3), (c = new TypeError('Promise cannot resolve to itself'))),
        (a.Ba = 1),
        Tf(c, a.sm, a.tm, a) ||
          ((a.Ua = c), (a.Ba = b), (a.Ha = null), bg(a), 3 != b || c instanceof Pf || cg(a, c)))
    },
    Tf = function (a, b, c, d) {
      if (a instanceof E)
        return (
          null != b && Ia(b, 'opt_onFulfilled should be a function.'),
          null != c &&
            Ia(
              c,
              'opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?'
            ),
          Yf(a, Sf(b || Ic, c || null, d)),
          !0
        )
      if (Nf(a)) return a.then(b, c, d), !0
      if (t(a))
        try {
          var e = a.then
          if ('function' === typeof e) return dg(a, e, b, c, d), !0
        } catch (f) {
          return c.call(d, f), !0
        }
      return !1
    },
    dg = function (a, b, c, d, e) {
      var f = !1,
        g = function (l) {
          f || ((f = !0), c.call(e, l))
        },
        h = function (l) {
          f || ((f = !0), d.call(e, l))
        }
      try {
        b.call(a, g, h)
      } catch (l) {
        h(l)
      }
    },
    bg = function (a) {
      a.Dg || ((a.Dg = !0), Lf(a.Hk, a))
    },
    $f = function (a) {
      var b = null
      a.Xb && ((b = a.Xb), (a.Xb = b.next), (b.next = null))
      a.Xb || (a.hd = null)
      null != b && w(null != b.Rc)
      return b
    }
  E.prototype.Hk = function () {
    for (var a; (a = $f(this)); ) ag(this, a, this.Ba, this.Ua)
    this.Dg = !1
  }
  var ag = function (a, b, c, d) {
      if (3 == c && b.zd && !b.Sd) for (; a && a.ef; a = a.Ha) a.ef = !1
      if (b.child) (b.child.Ha = null), eg(b, c, d)
      else
        try {
          b.Sd ? b.Rc.call(b.context) : eg(b, c, d)
        } catch (e) {
          fg.call(null, e)
        }
      Rf.put(b)
    },
    eg = function (a, b, c) {
      2 == b ? a.Rc.call(a.context, c) : a.zd && a.zd.call(a.context, c)
    },
    cg = function (a, b) {
      a.ef = !0
      Lf(function () {
        a.ef && fg.call(null, b)
      })
    },
    fg = Af,
    Pf = function (a) {
      za.call(this, a)
    }
  v(Pf, za)
  Pf.prototype.name = 'cancel'
  var gg,
    hg,
    ig,
    jg = /^[\w\.\-]*$/,
    kg = function (a) {
      return a.getOrigin() === a.getContext().getOrigin()
    },
    lg = function () {
      return !0
    },
    mg = function (a) {
      for (var b = nd(), c = 0; c < a.length; c++) b[a[c]] = !0
      return function (d) {
        return !!b[d.Jb]
      }
    },
    og = function (a, b, c) {
      return function (d) {
        if (!b.isDisposed()) {
          var e = this.origin,
            f = b.getOrigin()
          D(e === f, 'Wrong origin ' + e + ' != ' + f)
          e = this.callback
          d = ng(a, d, b)
          !c && 0 < d.length && Vf(d).then(e)
        }
      }
    },
    ng = function (a, b, c) {
      a = gg[a]
      if (!a) return []
      for (var d = [], e = 0; e < a.length; e++) d.push(F(a[e].call(c, b, c)))
      return d
    },
    pg = function (a, b, c) {
      D('_default' != a, 'Cannot update default api')
      hg[a] = { map: b, filter: c }
    },
    qg = function (a, b, c) {
      D('_default' != a, 'Cannot update default api')
      cd(hg, a, { map: {}, filter: kg }).map[b] = c
    },
    rg = function (a, b) {
      cd(hg, '_default', { map: {}, filter: lg }).map[a] = b
      gd(ig.lb, function (c) {
        c.register(a, b, lg)
      })
    },
    sg = function () {
      return ig
    },
    tg = /^https?:\/\/[^\/%\\?#\s]+$/i,
    ug = {
      longdesc: !0,
      name: !0,
      src: !0,
      frameborder: !0,
      marginwidth: !0,
      marginheight: !0,
      scrolling: !0,
      align: !0,
      height: !0,
      width: !0,
      id: !0,
      class: !0,
      title: !0,
      tabindex: !0,
      hspace: !0,
      vspace: !0,
      allowtransparency: !0,
    }
  var vg = function (a) {
    this.i = a || {}
  }
  vg.prototype.value = function () {
    return this.i
  }
  vg.prototype.getIframe = function () {
    return this.i.iframe
  }
  var wg = function (a, b) {
      a.i.role = b
      return a
    },
    xg = function (a, b) {
      a.i.data = b
      return a
    }
  vg.prototype.bc = function (a) {
    this.i.setRpcReady = a
    return this
  }
  var yg = function (a) {
    return a.i.setRpcReady
  }
  vg.prototype.Vc = function (a) {
    this.i.rpctoken = a
    return this
  }
  var zg = function (a) {
      return a.i.rpctoken
    },
    Ag = function (a) {
      a.i.selfConnect = !0
      return a
    }
  var Bg = function (a) {
    this.i = a
  }
  Bg.prototype.value = function () {
    return this.i
  }
  Bg.prototype.Kj = function (a) {
    this.i.style = a
  }
  Bg.prototype.getStyle = function () {
    return this.i.style
  }
  var Cg = function (a, b) {
    a.i.onload = b
  }
  var Dg = function (a) {
    this.i = a || {}
  }
  Dg.prototype.value = function () {
    return this.i
  }
  var Fg = function (a) {
      var b = new Eg()
      b.i.role = a
      return b
    },
    Gg = function (a, b) {
      a.i.handler = b
      return a
    },
    Hg = function (a, b) {
      a.i.filter = b
      return a
    }
  Dg.prototype.De = function (a) {
    this.i.apis = a
    return this
  }
  var Ig = function (a) {
    this.i = a || {}
  }
  k = Ig.prototype
  k.value = function () {
    return this.i
  }
  k.setUrl = function (a) {
    this.i.url = a
    return this
  }
  k.getUrl = function () {
    return this.i.url
  }
  k.Kj = function (a) {
    this.i.style = a
  }
  k.getStyle = function () {
    return this.i.style
  }
  k.getId = function () {
    return this.i.id
  }
  k.Vc = function (a) {
    this.i.rpctoken = a
    return this
  }
  var Jg = function (a, b) {
      a.i.messageHandlers = b
      return a
    },
    Kg = function (a, b) {
      a.i.messageHandlersFilter = b
      return a
    }
  Ig.prototype.De = function (a) {
    this.i.apis = a
    return this
  }
  var Lg = function (a, b) {
    a.i.onClose = b
  }
  Ig.prototype.getContext = function () {
    return this.i.context
  }
  var Mg = function (a) {
      a.i.attributes = a.i.attributes || {}
      return new Bg(a.i.attributes)
    },
    Ng = function (a, b) {
      a.i.controllerData = b
    },
    Og = function (a) {
      return (a = a.i.timeout) ? a : null
    }
  var Pg = function () {
    vg.apply(this, arguments)
  }
  n(Pg, vg)
  var Eg = function () {
    Dg.apply(this, arguments)
  }
  n(Eg, Dg)
  var Qg = function () {
    Ig.apply(this, arguments)
  }
  n(Qg, Ig)
  var H = function (a) {
    Qg.call(this, a)
  }
  n(H, Qg)
  var Rg = function (a, b) {
    a.i.frameName = b
    return a
  }
  H.prototype.getFrameName = function () {
    return this.i.frameName
  }
  var Sg = function (a, b) {
    a.i.rpcAddr = b
    return a
  }
  H.prototype.qb = function () {
    return this.i.rpcAddr
  }
  var Tg = function (a, b) {
    a.i.retAddr = b
    return a
  }
  H.prototype.Gb = function () {
    return this.i.retAddr
  }
  var Ug = function (a, b) {
    a.i.origin = b
    return a
  }
  H.prototype.getOrigin = function () {
    return this.i.origin
  }
  H.prototype.bc = function (a) {
    this.i.setRpcReady = a
    return this
  }
  var Vg = function (a, b) {
      a.i.context = b
    },
    Wg = function (a, b) {
      a.i._rpcReadyFn = b
    }
  H.prototype.getIframeEl = function () {
    return this.i.iframeEl
  }
  var Xg = function (a, b, c) {
    var d = a.qb(),
      e = b.Gb()
    Tg(Sg(c, a.Gb() + '/' + b.qb()), e + '/' + d)
    Ug(Rg(c, b.getFrameName()), b.getOrigin())
  }
  var Zg = function (a) {
      this.resolve = this.reject = null
      this.promise = new E(
        u(function (b, c) {
          this.resolve = b
          this.reject = c
        }, this)
      )
      a && (this.promise = Yg(this.promise, a))
    },
    Yg = function (a, b) {
      return a.then(function (c) {
        try {
          b(c)
        } catch (d) {}
        return c
      })
    }
  var $g = function () {
    this.wb = window.console
  }
  $g.prototype.log = function (a) {
    this.wb && this.wb.log && this.wb.log(a)
  }
  $g.prototype.error = function (a) {
    this.wb && (this.wb.error ? this.wb.error(a) : this.wb.log && this.wb.log(a))
  }
  $g.prototype.warn = function (a) {
    this.wb && (this.wb.warn ? this.wb.warn(a) : this.wb.log && this.wb.log(a))
  }
  $g.prototype.debug = function () {}
  var ah = new $g()
  var ih = function () {
    this.Je = { Aj: bh ? '../' + bh : null, Bk: ch, Fi: dh, Om: eh, getToken: fh, Pm: gh }
    this.vb = C
    this.wj = this.Ak
    this.Lk = /MSIE\s*[0-8](\D|$)/.test(window.navigator.userAgent)
    if (this.Je.Aj) {
      this.vb = this.Je.Fi(this.vb, this.Je.Aj)
      var a = this.vb.document,
        b = a.createElement('script')
      b.setAttribute('type', 'text/javascript')
      b.text =
        'window.doPostMsg=function(w,s,o) {window.setTimeout(function(){w.postMessage(s,o);},0);};'
      a.body.appendChild(b)
      this.wj = this.vb.doPostMsg
    }
    this.Jh = {}
    this.Th = {}
    a = u(this.Vk, this)
    Ed(this.vb, 'message', a)
    cd(Kd, 'RPMQ', []).push(a)
    this.vb != this.vb.parent && hh(this, this.vb.parent, this.aj(this.vb.name), '*')
  }
  ih.prototype.aj = function (a) {
    return '{"h":"' + escape(a) + '"}'
  }
  var jh = function (a) {
      var b = null
      0 === a.indexOf('{"h":"') &&
        a.indexOf('"}') === a.length - 2 &&
        (b = unescape(a.substring(6, a.length - 2)))
      return b
    },
    kh = function (a) {
      if (!/^\s*{/.test(a)) return !1
      a = qe(a)
      return null !== a && 'object' === typeof a && !!a.g
    }
  ih.prototype.Vk = function (a) {
    var b = String(a.data)
    ah.debug(
      'gapix.rpc.receive(' +
        eh +
        '): ' +
        (!b || 512 >= b.length ? b : b.substr(0, 512) + '... (' + b.length + ' bytes)')
    )
    var c = 0 !== b.indexOf('!_')
    c || (b = b.substring(2))
    var d = kh(b)
    if (!c && !d) {
      if (!d && (c = jh(b))) {
        if (this.Jh[c]) this.Jh[c]()
        else this.Th[c] = 1
        return
      }
      var e = a.origin,
        f = this.Je.Bk
      this.Lk
        ? C.setTimeout(function () {
            f(b, e)
          }, 0)
        : f(b, e)
    }
  }
  ih.prototype.setup = function (a, b) {
    '..' === a || this.Th[a] ? (b(), delete this.Th[a]) : (this.Jh[a] = b)
  }
  var hh = function (a, b, c, d) {
    var e = kh(c) ? '' : '!_'
    ah.debug(
      'gapix.rpc.send(' +
        eh +
        '): ' +
        (!c || 512 >= c.length ? c : c.substr(0, 512) + '... (' + c.length + ' bytes)')
    )
    a.wj(b, e + c, d)
  }
  ih.prototype.Ak = function (a, b, c) {
    a.postMessage(b, c)
  }
  ih.prototype.send = function (a, b, c) {
    ;(a = this.Je.Fi(this.vb, a)) && !a.closed && hh(this, a, b, c)
  }
  var lh = 0,
    mh = [],
    nh = {},
    oh = {},
    ph = C.location.href,
    qh = qd(ph, 'rpctoken'),
    rh = qd(ph, 'parent') || ad.referrer,
    bh = qd(ph, 'rly'),
    eh = bh || ((C !== C.top || C.opener) && C.name) || '..',
    sh = null,
    th = {},
    uh = function () {},
    vh = { send: uh, setup: uh, aj: uh },
    dh = function (a, b) {
      '/' == b.charAt(0) && ((b = b.substring(1)), (a = C.top))
      if (0 === b.length) return a
      for (b = b.split('/'); b.length; ) {
        var c = b.shift()
        '{' == c.charAt(0) && '}' == c.charAt(c.length - 1) && (c = c.substring(1, c.length - 1))
        if ('..' === c) a = a == a.parent ? a.opener : a.parent
        else if ('..' !== c && a.frames[c]) {
          if (((a = a.frames[c]), !('postMessage' in a))) throw Error('Not a window')
        } else return null
      }
      return a
    },
    fh = function (a) {
      return (a = nh[a]) && a.token
    },
    wh = function (a) {
      if (a.f in {}) return !1
      var b = a.t,
        c = nh[a.r]
      a = a.origin
      return c && (c.token === b || (!c.token && !b)) && (a === c.origin || '*' === c.origin)
    },
    xh = function (a) {
      var b = a.id.split('/'),
        c = b[b.length - 1],
        d = a.origin
      return function (e) {
        var f = e.origin
        return e.f == c && (d == f || '*' == d)
      }
    },
    Ah = function (a, b, c) {
      a = yh(a)
      oh[a.name] = { be: b, ne: a.ne, Ca: c || wh }
      zh()
    },
    Bh = {},
    Ch = function (a, b) {
      ;(a = Bh['_' + a]) && a[1](this) && a[0].call(this, b)
    },
    Eh = function (a) {
      var b = a.c
      if (!b) return uh
      var c = a.r,
        d = a.g ? 'legacy__' : ''
      return function () {
        var e = [].slice.call(arguments, 0)
        e.unshift(c, d + '__cb', null, b)
        Dh.apply(null, e)
      }
    },
    gh = function (a) {
      sh = a
    },
    Gh = function (a) {
      th[a] ||
        (th[a] = C.setTimeout(function () {
          th[a] = !1
          Fh(a)
        }, 0))
    },
    Fh = function (a) {
      var b = nh[a]
      if (b && b.ready) {
        var c = b.sh
        for (b.sh = []; c.length; ) vh.send(a, re(c.shift()), b.origin)
      }
    },
    yh = function (a) {
      return 0 === a.indexOf('legacy__') ? { name: a.substring(8), ne: !0 } : { name: a, ne: !1 }
    },
    zh = function () {
      for (
        var a = ya('rpc/residenceSec') || 60, b = new Date().getTime() / 1e3, c, d = 0;
        (c = mh[d]);
        ++d
      ) {
        var e = c.rpc
        if (!e || (0 < a && b - c.timestamp > a)) mh.splice(d, 1), --d
        else {
          var f = e.s,
            g = oh[f] || oh['*']
          if (g)
            if (
              (mh.splice(d, 1), --d, (e.origin = c.origin), (c = Eh(e)), (e.callback = c), g.Ca(e))
            ) {
              if ('__cb' !== f && !!g.ne != !!e.g) break
              e = g.be.apply(e, e.a)
              void 0 !== e && c(e)
            } else ah.debug('gapix.rpc.rejected(' + eh + '): ' + f)
        }
      }
    },
    Hh = function (a, b, c) {
      mh.push({ rpc: a, origin: b, timestamp: new Date().getTime() / 1e3 })
      c || zh()
    },
    ch = function (a, b) {
      a = qe(a)
      Hh(a, b, !1)
    },
    Ih = function (a) {
      for (; a.length; ) Hh(a.shift(), this.origin, !0)
      zh()
    },
    Jh = function (a) {
      var b = !1
      a = a.split('|')
      var c = a[0]
      0 <= c.indexOf('/') && (b = !0)
      return { id: c, origin: a[1] || '*', Rg: b }
    },
    Kh = function (a, b, c, d) {
      var e = Jh(a)
      d && (C.frames[e.id] = C.frames[e.id] || d)
      a = e.id
      if (!nh.hasOwnProperty(a)) {
        c = c || null
        d = e.origin
        if ('..' === a) (d = ff(rh)), (c = c || qh)
        else if (!e.Rg) {
          var f = ad.getElementById(a)
          f && ((f = f.src), (d = ff(f)), (c = c || qd(f, 'rpctoken')))
        }
        ;('*' === e.origin && d) || (d = e.origin)
        nh[a] = {
          token: c,
          sh: [],
          origin: d,
          am: b,
          yj: function () {
            var g = a
            nh[g].ready = 1
            Fh(g)
          },
        }
        vh.setup(a, nh[a].yj)
      }
      return nh[a].yj
    },
    Dh = function (a, b, c, d) {
      a = a || '..'
      Kh(a)
      a = a.split('|', 1)[0]
      var e = b,
        f = [].slice.call(arguments, 3),
        g = c,
        h = eh,
        l = qh,
        m = nh[a],
        q = h,
        x = Jh(a)
      if (m && '..' !== a) {
        if (x.Rg) {
          if (!(l = nh[a].am)) {
            l = sh ? sh.substring(1).split('/') : [eh]
            q = l.length - 1
            for (var z = C.parent; z !== C.top; ) {
              var R = z.parent
              if (!q--) {
                for (var Ca = null, Dc = R.frames.length, ne = 0; ne < Dc; ++ne)
                  R.frames[ne] == z && (Ca = ne)
                l.unshift('{' + Ca + '}')
              }
              z = R
            }
            l = '/' + l.join('/')
          }
          q = l
        } else q = h = '..'
        l = m.token
      }
      g && x ? ((m = wh), x.Rg && (m = xh(x)), (Bh['_' + ++lh] = [g, m]), (g = lh)) : (g = null)
      f = { s: e, f: h, r: q, t: l, c: g, a: f }
      e = yh(e)
      f.s = e.name
      f.g = e.ne
      nh[a].sh.push(f)
      Gh(a)
    }
  if ('function' === typeof C.postMessage || 'object' === typeof C.postMessage)
    (vh = new ih()),
      Ah('__cb', Ch, function () {
        return !0
      }),
      Ah('_processBatch', Ih, function () {
        return !0
      }),
      Kh('..')
  !B('Android') || Qb()
  Qb()
  var Lh =
    B('Safari') &&
    !(
      Qb() ||
      (Ob() ? 0 : B('Coast')) ||
      (Ob() ? 0 : B('Opera')) ||
      (Ob() ? 0 : B('Edge')) ||
      (Ob() ? Nb('Microsoft Edge') : B('Edg/')) ||
      (Ob() ? Nb('Opera') : B('OPR')) ||
      B('Firefox') ||
      B('FxiOS') ||
      B('Silk') ||
      B('Android')
    ) &&
    !(pc() || B('iPad') || B('iPod'))
  var Nh = function (a, b, c) {
      a.setTimeout(function () {
        b.closed || 5 == c ? Mh(b) : (b.close(), c++, Nh(a, b, c))
      }, 1e3)
    },
    Mh = function (a) {
      if (!a.closed && a.document && a.document.body)
        if (
          ((a = a.document.body),
          w(null != a, 'goog.dom.setTextContent expects a non-null value for node'),
          'textContent' in a)
        )
          a.textContent = 'Please close this window.'
        else if (3 == a.nodeType) a.data = 'Please close this window.'
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
          for (; a.lastChild != a.firstChild; ) a.removeChild(w(a.lastChild))
          a.firstChild.data = 'Please close this window.'
        } else {
          Xc(a)
          var b = Zc(a)
          a.appendChild(b.createTextNode('Please close this window.'))
        }
    }
  var I = function (a, b, c, d) {
    this.Db = !1
    this.We = a
    this.zh = b
    this.qd = c
    this.Sa = d
    this.Bj = this.Sa.Gb()
    this.Jb = this.Sa.getOrigin()
    this.ll = this.Sa.getIframeEl()
    this.Pj = this.Sa.i.where
    this.Cb = []
    this.applyIframesApi('_default')
    a = this.Sa.i.apis || []
    for (b = 0; b < a.length; b++) this.applyIframesApi(a[b])
    this.We.lb[c] = this
  }
  k = I.prototype
  k.isDisposed = function () {
    return this.Db
  }
  k.Hc = function () {
    if (!this.isDisposed()) {
      for (var a = 0; a < this.Cb.length; a++) this.unregister(this.Cb[a])
      delete ig.lb[this.getFrameName()]
      this.Db = !0
    }
  }
  k.getContext = function () {
    return this.We
  }
  k.getOptions = function () {
    return this.Sa
  }
  k.qb = function () {
    return this.zh
  }
  k.Gb = function () {
    return this.Bj
  }
  k.getFrameName = function () {
    return this.qd
  }
  k.getIframeEl = function () {
    return this.ll
  }
  k.getSiteEl = function () {
    return this.Pj
  }
  k.setSiteEl = function (a) {
    this.Pj = a
  }
  k.bc = function () {
    ;(0, this.Sa.i._rpcReadyFn)()
  }
  k.setParam = function (a, b) {
    this.Sa.value()[a] = b
  }
  k.getParam = function (a) {
    return this.Sa.value()[a]
  }
  k.Di = function () {
    return this.Sa.value()
  }
  k.getId = function () {
    return this.Sa.getId()
  }
  k.getOrigin = function () {
    return this.Jb
  }
  var Oh = function (a, b) {
    var c = a.We.getFrameName()
    return a.qd + ':' + c + ':' + b
  }
  k = I.prototype
  k.register = function (a, b, c) {
    D(!this.isDisposed(), 'Cannot register handler on disposed iframe ' + a)
    D((c || kg)(this), 'Rejecting untrusted message ' + a)
    c = Oh(this, a)
    1 == cd(gg, c, []).push(b) && (this.Cb.push(a), Ah(c, og(c, this, '_g_wasClosed' === a)))
  }
  k.unregister = function (a, b) {
    var c = Oh(this, a),
      d = gg[c]
    d &&
      (b ? ((b = ed.call(d, b)), 0 <= b && d.splice(b, 1)) : d.splice(0, d.length),
      0 == d.length &&
        ((b = ed.call(this.Cb, a)), 0 <= b && this.Cb.splice(b, 1), delete oh[yh(c).name]))
  }
  k.Qk = function () {
    return this.Cb
  }
  k.applyIframesApi = function (a) {
    this.hg = this.hg || []
    if (!(0 <= ed.call(this.hg, a))) {
      this.hg.push(a)
      a = hg[a] || { map: {} }
      for (var b in a.map) fd(a.map, b) && this.register(b, a.map[b], a.filter)
    }
  }
  k.getWindow = function () {
    if (!kg(this)) return null
    var a = this.Sa.i._popupWindow
    if (a) return a
    var b = this.zh.split('/')
    a = this.getContext().getWindow()
    for (var c = 0; c < b.length && a; c++) {
      var d = b[c]
      a = '..' === d ? (a == a.parent ? a.opener : a.parent) : a.frames[d]
    }
    return a
  }
  var Ph = function (a) {
    var b = {}
    if (a) for (var c in a) fd(a, c) && fd(uf, c) && vf.test(a[c]) && (b[c] = a[c])
    return b
  }
  k = I.prototype
  k.close = function (a, b) {
    return J(this, '_g_close', a, b)
  }
  k.restyle = function (a, b) {
    return J(this, '_g_restyle', a, b)
  }
  k.Wl = function (a, b) {
    return J(this, '_g_restyleDone', a, b)
  }
  k.sk = function (a) {
    return this.getContext().closeSelf(a, void 0, this)
  }
  k.Yl = function (a) {
    if (a && 'object' === typeof a) return this.getContext().restyleSelf(a, void 0, this)
  }
  k.Zl = function (a) {
    var b = this.Sa.i.onRestyle
    b && b.call(this, a, this)
    a = a && 'object' === typeof a ? Ph(a) : {}
    ;(b = this.getIframeEl()) &&
      a &&
      'object' === typeof a &&
      (fd(a, 'height') && (a.height = wf(a.height)),
      fd(a, 'width') && (a.width = wf(a.width)),
      od(a, b.style))
  }
  k.tk = function (a) {
    var b = this.Sa.i.onClose
    b && b.call(this, a, this)
    if ((b = this.getOptions().i._popupWindow)) {
      var c = this.getContext().getWindow().document.getElementById(this.getId())
      c && c.parentNode && c.parentNode.removeChild(c)
      c = this.getContext().getWindow()
      xc && Lh && c ? (c.focus(), Nh(c, b, 0)) : (b.close(), Mh(b))
    }
    b || ((b = this.getIframeEl()) && b.parentNode && b.parentNode.removeChild(b))
    if ((b = this.Sa.i.controller))
      (c = {}), (c.frameName = this.getFrameName()), J(b, '_g_disposeControl', c)
    b = Oh(this, '_g_wasClosed')
    ng(b, a, this)
  }
  k.registerWasRestyled = function (a, b) {
    this.register('_g_wasRestyled', a, b)
  }
  k.registerWasClosed = function (a, b) {
    this.register('_g_wasClosed', a, b)
  }
  k.zm = function () {
    delete this.getContext().lb[this.getFrameName()]
    this.getContext()
      .getWindow()
      .setTimeout(
        u(function () {
          this.Hc()
        }, this),
        0
      )
  }
  k.send = function (a, b, c, d) {
    D(!this.isDisposed(), 'Cannot send message to disposed iframe - ' + a)
    D((d || kg)(this), 'Wrong target for message ' + a)
    c = new Zg(c)
    a = this.We.getFrameName() + ':' + this.qd + ':' + a
    Dh(this.zh, a, c.resolve, b)
    return c.promise
  }
  var J = function (a, b, c, d) {
    return a.send(b, c, d, lg)
  }
  k = I.prototype
  k.Ml = function (a) {
    return a
  }
  k.ping = function (a, b) {
    return J(this, '_g_ping', b, a)
  }
  k.wk = function (a) {
    a = a && 'object' === typeof a ? a : {}
    for (
      var b = a.rpcAddr, c = (this.qb() + '/' + b).split('/'), d = this.getContext().getWindow(), e;
      (e = c.shift()) && d;

    )
      d = '..' == e ? d.parent : d.frames[e]
    D(!!d, 'Bad rpc address ' + b)
    a._window = d
    a._parentRpcAddr = this.qb()
    a._parentRetAddr = this.Gb()
    this.getContext()
    b = new K(a)
    this.Dl && this.Dl(b, a.controllerData)
    this.vg = this.vg || []
    this.vg.push(b, a.controllerData)
  }
  k.Ck = function (a) {
    a = (a || {}).frameName
    for (var b = this.vg || [], c = 0; c < b.length; c++)
      if (b[c].getFrameName() === a) {
        a = b.splice(c, 1)[0]
        a.Hc()
        this.El && this.El(a)
        return
      }
    D(!1, 'Unknown contolled iframe to dispose - ' + a)
  }
  k.uk = function (a) {
    var b = new H(a)
    a = new Pg(b.value())
    if (a.i.selfConnect) var c = this
    else
      (D(tg.test(b.getOrigin()), 'Illegal origin for connected iframe - ' + b.getOrigin()),
      (c = this.getContext().lb[b.getFrameName()]),
      c)
        ? yg(b) && (c.bc(), J(c, '_g_rpcReady'))
        : ((b = Rg(Ug(Tg(Sg(new H(), b.qb()), b.Gb()), b.getOrigin()), b.getFrameName())
            .bc(yg(b))
            .Vc(zg(b))),
          (c = Qh(this.getContext(), b.value())))
    b = this.getContext()
    var d = a.i.role
    a = a.i.data
    Rh(b)
    d = d || ''
    cd(b.ug, d, []).push({ lf: c, data: a })
    Sh(c, a, b.Yg[d])
  }
  k.Jj = function (a, b) {
    new H(b).i._relayedDepth || ((b = {}), Ag(wg(new Pg(b), '_opener')), J(a, '_g_connect', b))
  }
  k.sj = function (a) {
    var b = this,
      c = a.i.messageHandlers,
      d = a.i.messageHandlersFilter,
      e = a.i.onClose
    Lg(Kg(Jg(a, null), null), null)
    return J(this, '_g_open', a.value()).then(function (f) {
      var g = new H(f[0]),
        h = g.getFrameName()
      f = new H()
      var l = b.Gb(),
        m = g.Gb()
      Tg(Sg(f, b.qb() + '/' + g.qb()), m + '/' + l)
      Rg(f, h)
      Ug(f, g.getOrigin())
      f.De(g.i.apis)
      f.Vc(zg(a))
      Jg(f, c)
      Kg(f, d)
      Lg(f, e)
      ;(g = b.getContext().lb[h]) || (g = Qh(b.getContext(), f.value()))
      return g
    })
  }
  k.Ah = function (a) {
    var b = a.getUrl()
    D(!b || Bd.test(b), 'Illegal url for new iframe - ' + b)
    var c = Mg(a).value()
    b = {}
    for (var d in c) fd(c, d) && fd(ug, d) && (b[d] = c[d])
    fd(c, 'style') && ((d = c.style), 'object' === typeof d && (b.style = Ph(d)))
    a.value().attributes = b
  }
  k.Jl = function (a) {
    a = new H(a)
    this.Ah(a)
    var b = a.i._relayedDepth || 0
    a.i._relayedDepth = b + 1
    a.i.openerIframe = this
    var c = zg(a)
    a.Vc(null)
    var d = this
    return this.getContext()
      .open(a.value())
      .then(function (e) {
        var f = new H(e.Di()).i.apis,
          g = new H()
        Xg(e, d, g)
        0 == b && wg(new Pg(g.value()), '_opener')
        g.bc(!0)
        g.Vc(c)
        J(e, '_g_connect', g.value())
        g = new H()
        Ug(Rg(Tg(Sg(g, e.qb()), e.Bj), e.getFrameName()), e.getOrigin()).De(f)
        return g.value()
      })
  }
  k.Xl = function (a) {
    this.getContext().addOnOpenerHandler(
      function (b) {
        b.send('_g_wasRestyled', a, void 0, lg)
      },
      null,
      lg
    )
  }
  var Th = nd(),
    Uh = nd(),
    Vh = function (a, b) {
      Th[a] = b
    },
    Wh = function (a) {
      return Th[a]
    },
    Xh = function (a, b) {
      pd.load('gapi.iframes.style.' + a, b)
    },
    Yh = function (a, b) {
      Uh[a] = b
    },
    Zh = function (a) {
      return Uh[a]
    }
  var $h = function () {
      function a(h, l) {
        h = window
          .getComputedStyle(h, '')
          .getPropertyValue(l)
          .match(/^([0-9]+)/)
        return parseInt(h[0], 10)
      }
      for (var b = 0, c = [document.body]; 0 < c.length; ) {
        var d = c.shift(),
          e = d.childNodes
        if ('undefined' !== typeof d.style) {
          var f = d.style.overflowY
          f || (f = (f = document.defaultView.getComputedStyle(d, null)) ? f.overflowY : null)
          if (
            'visible' != f &&
            'inherit' != f &&
            ((f = d.style.height),
            f || (f = (f = document.defaultView.getComputedStyle(d, null)) ? f.height : ''),
            0 < f.length && 'auto' != f)
          )
            continue
        }
        for (d = 0; d < e.length; d++) {
          f = e[d]
          if ('undefined' !== typeof f.offsetTop && 'undefined' !== typeof f.offsetHeight) {
            var g = f.offsetTop + f.offsetHeight + a(f, 'margin-bottom')
            b = Math.max(b, g)
          }
          c.push(f)
        }
      }
      return (
        b +
        a(document.body, 'border-bottom') +
        a(document.body, 'margin-bottom') +
        a(document.body, 'padding-bottom')
      )
    },
    ai = function () {
      var a = 0
      self.innerHeight
        ? (a = self.innerHeight)
        : document.documentElement && document.documentElement.clientHeight
        ? (a = document.documentElement.clientHeight)
        : document.body && (a = document.body.clientHeight)
      var b = document.body,
        c = document.documentElement
      if ('CSS1Compat' === document.compatMode && c.scrollHeight)
        return c.scrollHeight !== a ? c.scrollHeight : c.offsetHeight
      if (0 <= navigator.userAgent.indexOf('AppleWebKit')) return $h()
      if (b && c) {
        var d = c.scrollHeight,
          e = c.offsetHeight
        c.clientHeight !== e && ((d = b.scrollHeight), (e = b.offsetHeight))
        return d > a ? (d > e ? d : e) : d < e ? d : e
      }
    }
  var K = function (a) {
    a = a || {}
    this.Db = !1
    this.wa = nd()
    this.lb = nd()
    this.vb = a._window || C
    this.kb = this.vb.location.href
    this.uj = (this.fh = bi(this.kb, 'parent')) ? bi(this.kb, 'pfname') : ''
    this.Pa = this.fh ? bi(this.kb, '_gfid') || bi(this.kb, 'id') : ''
    this.qd = Pe(this.Pa, this.uj)
    this.Jb = ff(this.kb)
    if (this.Pa) {
      var b = new H()
      Sg(b, a._parentRpcAddr || '..')
      Tg(b, a._parentRetAddr || this.Pa)
      Ug(b, ff(this.fh || this.kb))
      Rg(b, this.uj)
      this.Ha = Qh(this, b.value())
    } else this.Ha = null
  }
  k = K.prototype
  k.isDisposed = function () {
    return this.Db
  }
  k.Hc = function () {
    if (!this.isDisposed()) {
      for (var a = ha(Object.values(this.lb)), b = a.next(); !b.done; b = a.next()) b.value.Hc()
      this.Db = !0
    }
  }
  k.getFrameName = function () {
    return this.qd
  }
  k.getOrigin = function () {
    return this.Jb
  }
  k.getWindow = function () {
    return this.vb
  }
  k.setGlobalParam = function (a, b) {
    this.wa[a] = b
  }
  k.getGlobalParam = function (a) {
    return this.wa[a]
  }
  var Qh = function (a, b) {
    D(!a.isDisposed(), 'Cannot attach iframe in disposed context')
    b = new H(b)
    b.qb() || Sg(b, b.getId())
    b.Gb() || Tg(b, '..')
    b.getOrigin() || Ug(b, ff(b.getUrl()))
    b.getFrameName() || Rg(b, Pe(b.getId(), a.qd))
    var c = b.getFrameName()
    if (a.lb[c]) return a.lb[c]
    var d = b.qb(),
      e = d
    b.getOrigin() && (e = d + '|' + b.getOrigin())
    var f = b.Gb(),
      g = zg(b)
    g ||
      ((g = ((g = b.getIframeEl()) && (g.getAttribute('data-postorigin') || g.src)) || b.getUrl()),
      (g = qd(g, 'rpctoken')))
    Wg(b, Kh(e, f, g, b.i._popupWindow))
    e = ((window.gadgets || {}).rpc || {}).setAuthToken
    g && e && e(d, g)
    var h = new I(a, d, c, b),
      l = b.i.messageHandlersFilter
    gd(b.i.messageHandlers, function (m, q) {
      h.register(q, m, l)
    })
    yg(b) && h.bc()
    J(h, '_g_rpcReady')
    return h
  }
  K.prototype.Ah = function (a) {
    Rg(a, null)
    var b = a.getId()
    !b ||
      (jg.test(b) && !this.getWindow().document.getElementById(b)) ||
      (ah.log('Ignoring requested iframe ID - ' + b), (a.i.id = null))
  }
  var bi = function (a, b) {
    var c = qd(a, b)
    c || (c = qe(qd(a, 'jcp', ''))[b])
    return c || ''
  }
  K.prototype.openChild = function (a) {
    D(!this.isDisposed(), 'Cannot open iframe in disposed context')
    var b = new H(a)
    ci(this, b)
    var c = b.getFrameName()
    if (c && this.lb[c]) return this.lb[c]
    this.Ah(b)
    c = b.getUrl()
    D(c, 'No url for new iframe')
    var d = b.i.queryParams || {}
    d.usegapi = '1'
    b.i.queryParams = d
    d = this.Ii && this.Ii(c, b)
    d ||
      ((d = b.i.where),
      D(!!d, 'No location for new iframe'),
      (c = Xe(c, d, a)),
      (b.i.iframeEl = c),
      (d = c.getAttribute('id')))
    Sg(b, d).i.id = d
    Ug(b, ff(b.i.eurl || ''))
    this.cj && this.cj(b, b.getIframeEl())
    c = Qh(this, a)
    c.Jj && c.Jj(c, a)
    ;(a = b.i.onCreate) && a(c)
    b.i.disableRelayOpen || c.applyIframesApi('_open')
    return c
  }
  var di = function (a, b, c) {
      var d = b.i.canvasUrl
      if (!d) return c
      D(!b.i.allowPost && !b.i.forcePost, 'Post is not supported when using canvas url')
      var e = b.getUrl()
      D(e && ff(e) === a.Jb && ff(d) === a.Jb, 'Wrong origin for canvas or hidden url ' + d)
      b.setUrl(d)
      b.i.waitForOnload = !0
      b.i.canvasUrl = null
      return function (f) {
        var g = f.getWindow(),
          h = g.location.hash
        h = We(e) + (/#/.test(e) ? h.replace(/^#/, '&') : h)
        g.location.replace(h)
        c && c(f)
      }
    },
    ei = function (a, b, c) {
      var d = b.i.relayOpen
      if (d) {
        var e = a.getParentIframe()
        d instanceof I
          ? ((e = d), (b.i.relayOpen = 0))
          : 0 < Number(d) && (b.i.relayOpen = Number(d) - 1)
        if (e) {
          D(!!e.sj, 'Relaying iframe open is disabled')
          if ((d = b.getStyle())) if ((d = Uh[d])) Vg(b, a), d(b.value()), Vg(b, null)
          b.i.openerIframe = null
          c.resolve(e.sj(b))
          return !0
        }
      }
      return !1
    },
    fi = function (a, b, c) {
      var d = b.getStyle()
      if (d)
        if ((D(!!Wh, 'Defer style is disabled, when requesting style ' + d), Th[d])) ci(a, b)
        else
          return (
            Xh(d, function () {
              D(!!Th[d], 'Fail to load style - ' + d)
              c.resolve(a.open(b.value()))
            }),
            !0
          )
      return !1
    }
  K.prototype.open = function (a, b) {
    D(!this.isDisposed(), 'Cannot open iframe in disposed context')
    var c = new H(a)
    b = di(this, c, b)
    var d = new Zg(b)
    ;(b = c.getUrl()) && c.setUrl(We(b))
    if (ei(this, c, d) || fi(this, c, d) || ei(this, c, d)) return d.promise
    if (null != Og(c)) {
      var e = setTimeout(function () {
          g.getIframeEl().src = 'about:blank'
          d.reject({ timeout: 'Exceeded time limit of :' + Og(c) + 'milliseconds' })
        }, Og(c)),
        f = d.resolve
      d.resolve = function (h) {
        clearTimeout(e)
        f(h)
      }
    }
    c.i.waitForOnload &&
      Cg(Mg(c), function () {
        d.resolve(g)
      })
    var g = this.openChild(a)
    c.i.waitForOnload || d.resolve(g)
    return d.promise
  }
  K.prototype.getParentIframe = function () {
    return this.Ha
  }
  var gi = function (a, b) {
    var c = a.getParentIframe(),
      d = !0
    b.filter && (d = b.filter.call(b.lf, b.params))
    return F(d).then(function (e) {
      return e && c
        ? (b.tj && b.tj.call(a, b.params),
          (e = b.sender ? b.sender(b.params) : J(c, b.message, b.params)),
          b.ym
            ? e.then(function () {
                return !0
              })
            : !0)
        : !1
    })
  }
  k = K.prototype
  k.closeSelf = function (a, b, c) {
    a = gi(this, {
      sender: function (d) {
        var e = ig.getParentIframe()
        gd(ig.lb, function (f) {
          f !== e && J(f, '_g_wasClosed', d)
        })
        return J(e, '_g_closeMe', d)
      },
      message: '_g_closeMe',
      params: a,
      lf: c,
      filter: this.getGlobalParam('onCloseSelfFilter'),
    })
    b = new Zg(b)
    b.resolve(a)
    return b.promise
  }
  k.restyleSelf = function (a, b, c) {
    a = a || {}
    b = new Zg(b)
    b.resolve(
      gi(this, {
        message: '_g_restyleMe',
        params: a,
        lf: c,
        filter: this.getGlobalParam('onRestyleSelfFilter'),
        ym: !0,
        tj: this.Vj,
      })
    )
    return b.promise
  }
  k.Vj = function (a) {
    'auto' === a.height && (a.height = ai())
  }
  k.setCloseSelfFilter = function (a) {
    this.setGlobalParam('onCloseSelfFilter', a)
  }
  k.setRestyleSelfFilter = function (a) {
    this.setGlobalParam('onRestyleSelfFilter', a)
  }
  var ci = function (a, b) {
    var c = b.getStyle()
    if (c) {
      b.Kj(null)
      var d = Th[c]
      D(d, 'No such style: ' + c)
      Vg(b, a)
      d(b.value())
      Vg(b, null)
    }
  }
  K.prototype.ready = function (a, b, c, d) {
    var e = b || {},
      f = this.getParentIframe()
    this.addOnOpenerHandler(
      function (h) {
        gd(
          e,
          function (l, m) {
            h.register(m, l, d)
          },
          this
        )
        h !== f && h.send('_ready', g, void 0, d)
      },
      void 0,
      d
    )
    var g = a || {}
    g.height = g.height || 'auto'
    this.Vj(g)
    f && f.send('_ready', g, c, lg)
  }
  K.prototype.connectIframes = function (a, b) {
    a = new Pg(a)
    var c = new Pg(b),
      d = yg(a)
    b = a.getIframe()
    var e = c.getIframe()
    if (e) {
      var f = zg(a),
        g = new H()
      Xg(b, e, g)
      xg(wg(new Pg(g.value()).Vc(f), a.i.role), a.i.data).bc(d)
      var h = new H()
      Xg(e, b, h)
      xg(wg(new Pg(h.value()).Vc(f), c.i.role), c.i.data).bc(!0)
      J(b, '_g_connect', g.value(), function () {
        d || J(e, '_g_connect', h.value())
      })
      d && J(e, '_g_connect', h.value())
    } else (c = {}), xg(wg(Ag(new Pg(c)), a.i.role), a.i.data), J(b, '_g_connect', c)
  }
  var Rh = function (a) {
    a.ug || ((a.ug = nd()), (a.Yg = nd()))
  }
  K.prototype.addOnConnectHandler = function (a, b, c, d) {
    Rh(this)
    'object' === typeof a
      ? ((b = new Eg(a)), (c = b.i.role || ''))
      : ((b = Hg(Gg(Fg(a), b).De(c), d)), (c = a))
    d = this.ug[c] || []
    a = !1
    for (var e = 0; e < d.length && !a; e++)
      Sh(this.lb[d[e].lf.getFrameName()], d[e].data, [b]), (a = b.i.runOnce)
    c = cd(this.Yg, c, [])
    a || b.i.dontWait || c.push(b)
  }
  K.prototype.removeOnConnectHandler = function (a, b) {
    a = cd(this.Yg, a, [])
    if (b)
      for (var c = !1, d = 0; !c && d < a.length; d++)
        a[d].i.handler === b && ((c = !0), a.splice(d, 1))
    else a.splice(0, a.length)
  }
  var Sh = function (a, b, c) {
    c = c || []
    for (var d = 0; d < c.length; d++) {
      var e = c[d]
      if (e && a) {
        var f = e.i.filter || kg
        if (a && f(a)) {
          f = e.i.apis || []
          for (var g = 0; g < f.length; g++) a.applyIframesApi(f[g])
          e.i.handler && (0, e.i.handler)(a, b)
          e.i.runOnce && (c.splice(d, 1), --d)
        }
      }
    }
  }
  K.prototype.addOnOpenerHandler = function (a, b, c) {
    var d = this.addOnConnectHandler
    a = Hg(Gg(Fg('_opener'), a).De(b), c)
    a.i.runOnce = !0
    d.call(this, a.value())
  }
  K.prototype.cj = function (a, b) {
    var c = a.i.controller
    if (c) {
      D(c.Jb === a.getOrigin(), 'Wrong controller origin ' + this.Jb + ' !== ' + a.getOrigin())
      var d = a.qb()
      Sg(a, c.qb())
      Tg(a, c.Gb())
      var e = new H()
      Ng(Sg(e, d), a.i.controllerData)
      Ed(b, 'load', function () {
        c.send('_g_control', e.value())
      })
    }
  }
  var hi = function (a, b, c) {
    a = a.getWindow()
    var d = a.document,
      e = c.i.reuseWindow
    if (e) {
      var f = c.getId()
      if (!f) throw Error('If you provide a reuseWindow, you must also provide an ID')
    } else f = Oe(d, c)
    var g = f,
      h = c.i.rpcRelayUrl
    if (h) {
      h = Ad(ad, h.replace(Ue, Ve))
      g = c.i.fragmentParams || {}
      g.rly = f
      c.i.fragmentParams = g
      g = c.i.where || d.body
      D(!!g, 'Cannot open window in a page with no body')
      var l = {}
      l.src = h
      l.style = 'display:none;'
      l.id = f
      l.name = f
      Se(d, g, l, f)
      g = f + '_relay'
    }
    b = We(b)
    var m = Qe(d, b, f, c.value())
    c.i.eurl = m
    b = c.i.openAsWindow
    'string' !== typeof b && (b = void 0)
    c = window.navigator.userAgent || ''
    ;/Trident|MSIE/i.test(c) &&
      /#/.test(c) &&
      (m = 'javascript:window.location.replace(' + C.JSON.stringify(m).replace(/#/g, '\\x23') + ')')
    if (e) {
      var q = e
      setTimeout(function () {
        q.location.replace(m)
      })
    } else q = Oc(m, a, g, b)
    return { id: f, dk: q }
  }
  K.prototype.Ii = function (a, b) {
    if (b.i.openAsWindow) {
      a = hi(this, a, b)
      var c = a.id
      D(!!a.dk, 'Open popup window failed')
      b.i._popupWindow = a.dk
    }
    return c
  }
  gg = nd()
  hg = nd()
  ig = new K()
  rg('_g_rpcReady', I.prototype.bc)
  rg('_g_discover', I.prototype.Qk)
  rg('_g_ping', I.prototype.Ml)
  rg('_g_close', I.prototype.sk)
  rg('_g_closeMe', I.prototype.tk)
  rg('_g_restyle', I.prototype.Yl)
  rg('_g_restyleMe', I.prototype.Zl)
  rg('_g_wasClosed', I.prototype.zm)
  qg('control', '_g_control', I.prototype.wk)
  qg('control', '_g_disposeControl', I.prototype.Ck)
  var ii = ig.getParentIframe()
  ii && ii.register('_g_restyleDone', I.prototype.Xl, lg)
  rg('_g_connect', I.prototype.uk)
  var ji = {}
  ji._g_open = I.prototype.Jl
  pg('_open', ji, lg)
  var ki = {
    Context: K,
    Iframe: I,
    SAME_ORIGIN_IFRAMES_FILTER: kg,
    CROSS_ORIGIN_IFRAMES_FILTER: lg,
    makeWhiteListIframesFilter: mg,
    getContext: sg,
    registerIframesApi: pg,
    registerIframesApiHandler: qg,
    registerStyle: Vh,
    registerBeforeOpenStyle: Yh,
    getStyle: Wh,
    getBeforeOpenStyle: Zh,
    create: Xe,
  }
  tf({
    instance: function () {
      return ki
    },
    priority: 2,
  })
  qg('gapi.load', '_g_gapi.load', function (a) {
    return new E(function (b) {
      pd.load((a && 'object' === typeof a && a.features) || '', b)
    })
  })
  r('gapi.iframes.registerStyle', Vh)
  r('gapi.iframes.registerBeforeOpenStyle', Yh)
  r('gapi.iframes.getStyle', Wh)
  r('gapi.iframes.getBeforeOpenStyle', Zh)
  r('gapi.iframes.registerIframesApi', pg)
  r('gapi.iframes.registerIframesApiHandler', qg)
  r('gapi.iframes.getContext', sg)
  r('gapi.iframes.SAME_ORIGIN_IFRAMES_FILTER', kg)
  r('gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER', lg)
  r('gapi.iframes.makeWhiteListIframesFilter', mg)
  r('gapi.iframes.Context', K)
  r('gapi.iframes.Context.prototype.isDisposed', K.prototype.isDisposed)
  r('gapi.iframes.Context.prototype.getWindow', K.prototype.getWindow)
  r('gapi.iframes.Context.prototype.getFrameName', K.prototype.getFrameName)
  r('gapi.iframes.Context.prototype.getGlobalParam', K.prototype.getGlobalParam)
  r('gapi.iframes.Context.prototype.setGlobalParam', K.prototype.setGlobalParam)
  r('gapi.iframes.Context.prototype.open', K.prototype.open)
  r('gapi.iframes.Context.prototype.openChild', K.prototype.openChild)
  r('gapi.iframes.Context.prototype.getParentIframe', K.prototype.getParentIframe)
  r('gapi.iframes.Context.prototype.closeSelf', K.prototype.closeSelf)
  r('gapi.iframes.Context.prototype.restyleSelf', K.prototype.restyleSelf)
  r('gapi.iframes.Context.prototype.setCloseSelfFilter', K.prototype.setCloseSelfFilter)
  r('gapi.iframes.Context.prototype.setRestyleSelfFilter', K.prototype.setRestyleSelfFilter)
  r('gapi.iframes.Context.prototype.addOnConnectHandler', K.prototype.addOnConnectHandler)
  r('gapi.iframes.Context.prototype.removeOnConnectHandler', K.prototype.removeOnConnectHandler)
  r('gapi.iframes.Context.prototype.addOnOpenerHandler', K.prototype.addOnOpenerHandler)
  r('gapi.iframes.Context.prototype.connectIframes', K.prototype.connectIframes)
  r('gapi.iframes.Iframe', I)
  r('gapi.iframes.Iframe.prototype.isDisposed', I.prototype.isDisposed)
  r('gapi.iframes.Iframe.prototype.getContext', I.prototype.getContext)
  r('gapi.iframes.Iframe.prototype.getFrameName', I.prototype.getFrameName)
  r('gapi.iframes.Iframe.prototype.getId', I.prototype.getId)
  r('gapi.iframes.Iframe.prototype.register', I.prototype.register)
  r('gapi.iframes.Iframe.prototype.unregister', I.prototype.unregister)
  r('gapi.iframes.Iframe.prototype.send', I.prototype.send)
  r('gapi.iframes.Iframe.prototype.applyIframesApi', I.prototype.applyIframesApi)
  r('gapi.iframes.Iframe.prototype.getIframeEl', I.prototype.getIframeEl)
  r('gapi.iframes.Iframe.prototype.getSiteEl', I.prototype.getSiteEl)
  r('gapi.iframes.Iframe.prototype.setSiteEl', I.prototype.setSiteEl)
  r('gapi.iframes.Iframe.prototype.getWindow', I.prototype.getWindow)
  r('gapi.iframes.Iframe.prototype.getOrigin', I.prototype.getOrigin)
  r('gapi.iframes.Iframe.prototype.close', I.prototype.close)
  r('gapi.iframes.Iframe.prototype.restyle', I.prototype.restyle)
  r('gapi.iframes.Iframe.prototype.restyleDone', I.prototype.Wl)
  r('gapi.iframes.Iframe.prototype.registerWasRestyled', I.prototype.registerWasRestyled)
  r('gapi.iframes.Iframe.prototype.registerWasClosed', I.prototype.registerWasClosed)
  r('gapi.iframes.Iframe.prototype.getParam', I.prototype.getParam)
  r('gapi.iframes.Iframe.prototype.setParam', I.prototype.setParam)
  r('gapi.iframes.Iframe.prototype.ping', I.prototype.ping)
  r('gapi.iframes.Iframe.prototype.getOpenParams', I.prototype.Di)
  r('gapi.iframes.create', Xe)
  var li = function (a) {
    return Array.prototype.map
      .call(a, function (b) {
        b = b.toString(16)
        return 1 < b.length ? b : '0' + b
      })
      .join('')
  }
  var mi = null,
    oi = function (a) {
      var b = []
      ni(a, function (c) {
        b.push(c)
      })
      return b
    },
    ni = function (a, b) {
      function c(l) {
        for (; d < a.length; ) {
          var m = a.charAt(d++),
            q = mi[m]
          if (null != q) return q
          if (!/^[\s\xa0]*$/.test(m)) throw Error('Unknown base64 encoding at char: ' + m)
        }
        return l
      }
      pi()
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
    pi = function () {
      if (!mi) {
        mi = {}
        for (
          var a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''),
            b = ['+/=', '+/', '-_=', '-_.', '-_'],
            c = 0;
          5 > c;
          c++
        )
          for (var d = a.concat(b[c].split('')), e = 0; e < d.length; e++) {
            var f = d[e],
              g = mi[f]
            void 0 === g ? (mi[f] = e) : w(g === e)
          }
      }
    }
  var si = function (a, b) {
      this.blockSize = -1
      this.blockSize = 64
      this.Ve = p.Uint8Array ? new Uint8Array(this.blockSize) : Array(this.blockSize)
      this.hc = this.vd = 0
      this.na = []
      this.Bl = a
      this.Ri = b
      this.xm = p.Int32Array ? new Int32Array(64) : Array(64)
      void 0 === qi && (qi = p.Int32Array ? new Int32Array(ri) : ri)
      this.reset()
    },
    qi
  v(si, ue)
  for (var ti = [], ui = 0; 63 > ui; ui++) ti[ui] = 0
  var vi = [].concat(128, ti)
  si.prototype.reset = function () {
    this.hc = this.vd = 0
    this.na = p.Int32Array ? new Int32Array(this.Ri) : Sa(this.Ri)
  }
  var wi = function (a) {
    var b = a.Ve
    w(b.length == a.blockSize)
    for (var c = a.xm, d = 0, e = 0; e < b.length; )
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
    d = a.na[0] | 0
    e = a.na[1] | 0
    var h = a.na[2] | 0,
      l = a.na[3] | 0,
      m = a.na[4] | 0,
      q = a.na[5] | 0,
      x = a.na[6] | 0
    f = a.na[7] | 0
    for (b = 0; 64 > b; b++) {
      var z =
        ((((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10))) +
          ((d & e) ^ (d & h) ^ (e & h))) |
        0
      g = (m & q) ^ (~m & x)
      f = (f + (((m >>> 6) | (m << 26)) ^ ((m >>> 11) | (m << 21)) ^ ((m >>> 25) | (m << 7)))) | 0
      g = (g + (qi[b] | 0)) | 0
      g = (f + ((g + (c[b] | 0)) | 0)) | 0
      f = x
      x = q
      q = m
      m = (l + g) | 0
      l = h
      h = e
      e = d
      d = (g + z) | 0
    }
    a.na[0] = (a.na[0] + d) | 0
    a.na[1] = (a.na[1] + e) | 0
    a.na[2] = (a.na[2] + h) | 0
    a.na[3] = (a.na[3] + l) | 0
    a.na[4] = (a.na[4] + m) | 0
    a.na[5] = (a.na[5] + q) | 0
    a.na[6] = (a.na[6] + x) | 0
    a.na[7] = (a.na[7] + f) | 0
  }
  si.prototype.update = function (a, b) {
    void 0 === b && (b = a.length)
    var c = 0,
      d = this.vd
    if ('string' === typeof a)
      for (; c < b; ) (this.Ve[d++] = a.charCodeAt(c++)), d == this.blockSize && (wi(this), (d = 0))
    else if (ta(a))
      for (; c < b; ) {
        var e = a[c++]
        if (!('number' == typeof e && 0 <= e && 255 >= e && e == (e | 0)))
          throw Error('message must be a byte array')
        this.Ve[d++] = e
        d == this.blockSize && (wi(this), (d = 0))
      }
    else throw Error('message must be string or array')
    this.vd = d
    this.hc += b
  }
  si.prototype.digest = function () {
    var a = [],
      b = 8 * this.hc
    56 > this.vd ? this.update(vi, 56 - this.vd) : this.update(vi, this.blockSize - (this.vd - 56))
    for (var c = 63; 56 <= c; c--) (this.Ve[c] = b & 255), (b /= 256)
    wi(this)
    for (c = b = 0; c < this.Bl; c++)
      for (var d = 24; 0 <= d; d -= 8) a[b++] = (this.na[c] >> d) & 255
    return a
  }
  var ri = [
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221,
    3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580,
    3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895,
    666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
    2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
    1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298,
  ]
  var yi = function () {
    si.call(this, 8, xi)
  }
  v(yi, si)
  var xi = [
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225,
  ]
  var zi = function () {
    this.Db = this.Db
    this.Cf = this.Cf
  }
  zi.prototype.Db = !1
  zi.prototype.isDisposed = function () {
    return this.Db
  }
  zi.prototype.Hc = function () {
    this.Db || ((this.Db = !0), this.Zd())
  }
  zi.prototype.Zd = function () {
    if (this.Cf) for (; this.Cf.length; ) this.Cf.shift()()
  }
  var Ai = function (a, b) {
    this.type = a
    this.currentTarget = this.target = b
    this.defaultPrevented = this.xe = !1
  }
  Ai.prototype.stopPropagation = function () {
    this.xe = !0
  }
  Ai.prototype.preventDefault = function () {
    this.defaultPrevented = !0
  }
  var Bi = (function () {
    if (!p.addEventListener || !Object.defineProperty) return !1
    var a = !1,
      b = Object.defineProperty({}, 'passive', {
        get: function () {
          a = !0
        },
      })
    try {
      p.addEventListener('test', function () {}, b),
        p.removeEventListener('test', function () {}, b)
    } catch (c) {}
    return a
  })()
  var Ci = function (a, b) {
    Ai.call(this, a ? a.type : '')
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
    this.Ya = null
    a && this.init(a, b)
  }
  v(Ci, Ai)
  var Di = Ua({ 2: 'touch', 3: 'pen', 4: 'mouse' })
  Ci.prototype.init = function (a, b) {
    var c = (this.type = a.type),
      d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null
    this.target = a.target || a.srcElement
    this.currentTarget = b
    if ((b = a.relatedTarget)) {
      if (vc) {
        a: {
          try {
            qc(b.nodeName)
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
      : ((this.offsetX = wc || void 0 !== a.offsetX ? a.offsetX : a.layerX),
        (this.offsetY = wc || void 0 !== a.offsetY ? a.offsetY : a.layerY),
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
    this.pointerType = 'string' === typeof a.pointerType ? a.pointerType : Di[a.pointerType] || ''
    this.state = a.state
    this.Ya = a
    a.defaultPrevented && Ci.Wc.preventDefault.call(this)
  }
  Ci.prototype.stopPropagation = function () {
    Ci.Wc.stopPropagation.call(this)
    this.Ya.stopPropagation ? this.Ya.stopPropagation() : (this.Ya.cancelBubble = !0)
  }
  Ci.prototype.preventDefault = function () {
    Ci.Wc.preventDefault.call(this)
    var a = this.Ya
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1)
  }
  Ci.prototype.Nk = function () {
    return this.Ya
  }
  var Ei = 'closure_listenable_' + ((1e6 * Math.random()) | 0)
  var Fi = 0
  var Gi = function (a, b, c, d, e) {
      this.listener = a
      this.proxy = null
      this.src = b
      this.type = c
      this.capture = !!d
      this.hf = e
      this.key = ++Fi
      this.Be = this.Re = !1
    },
    Hi = function (a) {
      a.Be = !0
      a.listener = null
      a.proxy = null
      a.src = null
      a.hf = null
    }
  var Ii = function (a) {
    this.src = a
    this.Qa = {}
    this.Ke = 0
  }
  Ii.prototype.add = function (a, b, c, d, e) {
    var f = a.toString()
    a = this.Qa[f]
    a || ((a = this.Qa[f] = []), this.Ke++)
    var g = Ji(a, b, d, e)
    ;-1 < g
      ? ((b = a[g]), c || (b.Re = !1))
      : ((b = new Gi(b, this.src, f, !!d, e)), (b.Re = c), a.push(b))
    return b
  }
  Ii.prototype.remove = function (a, b, c, d) {
    a = a.toString()
    if (!(a in this.Qa)) return !1
    var e = this.Qa[a]
    b = Ji(e, b, c, d)
    return -1 < b ? (Hi(e[b]), Qa(e, b), 0 == e.length && (delete this.Qa[a], this.Ke--), !0) : !1
  }
  var Ki = function (a, b) {
    var c = b.type
    c in a.Qa && Pa(a.Qa[c], b) && (Hi(b), 0 == a.Qa[c].length && (delete a.Qa[c], a.Ke--))
  }
  Ii.prototype.removeAll = function (a) {
    a = a && a.toString()
    var b = 0,
      c
    for (c in this.Qa)
      if (!a || c == a) {
        for (var d = this.Qa[c], e = 0; e < d.length; e++) ++b, Hi(d[e])
        delete this.Qa[c]
        this.Ke--
      }
    return b
  }
  Ii.prototype.Hg = function (a, b, c, d) {
    a = this.Qa[a.toString()]
    var e = -1
    a && (e = Ji(a, b, c, d))
    return -1 < e ? a[e] : null
  }
  Ii.prototype.hasListener = function (a, b) {
    var c = void 0 !== a,
      d = c ? a.toString() : '',
      e = void 0 !== b
    return Wa(this.Qa, function (f) {
      for (var g = 0; g < f.length; ++g)
        if (!((c && f[g].type != d) || (e && f[g].capture != b))) return !0
      return !1
    })
  }
  var Ji = function (a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e]
      if (!f.Be && f.listener == b && f.capture == !!c && f.hf == d) return e
    }
    return -1
  }
  var Li = 'closure_lm_' + ((1e6 * Math.random()) | 0),
    Mi = {},
    Ni = 0,
    Pi = function (a, b, c, d, e) {
      if (d && d.once) Oi(a, b, c, d, e)
      else if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Pi(a, b[f], c, d, e)
      else
        (c = Qi(c)),
          a && a[Ei] ? a.listen(b, c, t(d) ? !!d.capture : !!d, e) : Ri(a, b, c, !1, d, e)
    },
    Ri = function (a, b, c, d, e, f) {
      if (!b) throw Error('Invalid event type')
      var g = t(e) ? !!e.capture : !!e,
        h = Si(a)
      h || (a[Li] = h = new Ii(a))
      c = h.add(b, c, d, g, f)
      if (!c.proxy) {
        d = Ti()
        c.proxy = d
        d.src = a
        d.listener = c
        if (a.addEventListener)
          Bi || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e)
        else if (a.attachEvent) a.attachEvent(Ui(b.toString()), d)
        else if (a.addListener && a.removeListener)
          w('change' === b, 'MediaQueryList only has a change event'), a.addListener(d)
        else throw Error('addEventListener and attachEvent are unavailable.')
        Ni++
      }
    },
    Ti = function () {
      var a = Vi,
        b = function (c) {
          return a.call(b.src, b.listener, c)
        }
      return b
    },
    Oi = function (a, b, c, d, e) {
      if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Oi(a, b[f], c, d, e)
      else
        (c = Qi(c)), a && a[Ei] ? Wi(a, b, c, t(d) ? !!d.capture : !!d, e) : Ri(a, b, c, !0, d, e)
    },
    Xi = function (a, b, c, d, e) {
      if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Xi(a, b[f], c, d, e)
      else
        (d = t(d) ? !!d.capture : !!d),
          (c = Qi(c)),
          a && a[Ei]
            ? a.Fb.remove(String(b), c, d, e)
            : a && (a = Si(a)) && (b = a.Hg(b, c, d, e)) && Yi(b)
    },
    Yi = function (a) {
      if ('number' !== typeof a && a && !a.Be) {
        var b = a.src
        if (b && b[Ei]) Ki(b.Fb, a)
        else {
          var c = a.type,
            d = a.proxy
          b.removeEventListener
            ? b.removeEventListener(c, d, a.capture)
            : b.detachEvent
            ? b.detachEvent(Ui(c), d)
            : b.addListener && b.removeListener && b.removeListener(d)
          Ni--
          ;(c = Si(b)) ? (Ki(c, a), 0 == c.Ke && ((c.src = null), (b[Li] = null))) : Hi(a)
        }
      }
    },
    Ui = function (a) {
      return a in Mi ? Mi[a] : (Mi[a] = 'on' + a)
    },
    Vi = function (a, b) {
      if (a.Be) a = !0
      else {
        b = new Ci(b, this)
        var c = a.listener,
          d = a.hf || a.src
        a.Re && Yi(a)
        a = c.call(d, b)
      }
      return a
    },
    Si = function (a) {
      a = a[Li]
      return a instanceof Ii ? a : null
    },
    Zi = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0),
    Qi = function (a) {
      w(a, 'Listener can not be null.')
      if ('function' === typeof a) return a
      w(a.handleEvent, 'An object listener must have handleEvent method.')
      a[Zi] ||
        (a[Zi] = function (b) {
          return a.handleEvent(b)
        })
      return a[Zi]
    }
  var $i = function () {
    zi.call(this)
    this.Fb = new Ii(this)
    this.jk = this
    this.eh = null
  }
  v($i, zi)
  $i.prototype[Ei] = !0
  k = $i.prototype
  k.addEventListener = function (a, b, c, d) {
    Pi(this, a, b, c, d)
  }
  k.removeEventListener = function (a, b, c, d) {
    Xi(this, a, b, c, d)
  }
  k.dispatchEvent = function (a) {
    aj(this)
    var b = this.eh
    if (b) {
      var c = []
      for (var d = 1; b; b = b.eh) c.push(b), w(1e3 > ++d, 'infinite loop')
    }
    b = this.jk
    d = a.type || a
    if ('string' === typeof a) a = new Ai(a, b)
    else if (a instanceof Ai) a.target = a.target || b
    else {
      var e = a
      a = new Ai(d, b)
      $a(a, e)
    }
    e = !0
    if (c)
      for (var f = c.length - 1; !a.xe && 0 <= f; f--) {
        var g = (a.currentTarget = c[f])
        e = bj(g, d, !0, a) && e
      }
    a.xe ||
      ((g = a.currentTarget = b), (e = bj(g, d, !0, a) && e), a.xe || (e = bj(g, d, !1, a) && e))
    if (c)
      for (f = 0; !a.xe && f < c.length; f++)
        (g = a.currentTarget = c[f]), (e = bj(g, d, !1, a) && e)
    return e
  }
  k.Zd = function () {
    $i.Wc.Zd.call(this)
    this.Fb && this.Fb.removeAll(void 0)
    this.eh = null
  }
  k.listen = function (a, b, c, d) {
    aj(this)
    return this.Fb.add(String(a), b, !1, c, d)
  }
  var Wi = function (a, b, c, d, e) {
      a.Fb.add(String(b), c, !0, d, e)
    },
    bj = function (a, b, c, d) {
      b = a.Fb.Qa[String(b)]
      if (!b) return !0
      b = b.concat()
      for (var e = !0, f = 0; f < b.length; ++f) {
        var g = b[f]
        if (g && !g.Be && g.capture == c) {
          var h = g.listener,
            l = g.hf || g.src
          g.Re && Ki(a.Fb, g)
          e = !1 !== h.call(l, d) && e
        }
      }
      return e && !d.defaultPrevented
    }
  $i.prototype.Hg = function (a, b, c, d) {
    return this.Fb.Hg(String(a), b, c, d)
  }
  $i.prototype.hasListener = function (a, b) {
    return this.Fb.hasListener(void 0 !== a ? String(a) : void 0, b)
  }
  var aj = function (a) {
    w(
      a.Fb,
      'Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?'
    )
  }
  var cj = function () {}
  cj.prototype.ai = null
  cj.prototype.getOptions = function () {
    return this.ai || (this.ai = this.rf())
  }
  var dj,
    ej = function () {}
  v(ej, cj)
  ej.prototype.Vd = function () {
    var a = fj(this)
    return a ? new ActiveXObject(a) : new XMLHttpRequest()
  }
  ej.prototype.rf = function () {
    var a = {}
    fj(this) && ((a[0] = !0), (a[1] = !0))
    return a
  }
  var fj = function (a) {
    if (!a.Oi && 'undefined' == typeof XMLHttpRequest && 'undefined' != typeof ActiveXObject) {
      for (
        var b = ['MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'],
          c = 0;
        c < b.length;
        c++
      ) {
        var d = b[c]
        try {
          return new ActiveXObject(d), (a.Oi = d)
        } catch (e) {}
      }
      throw Error(
        'Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed'
      )
    }
    return a.Oi
  }
  dj = new ej()
  var gj = function () {}
  v(gj, cj)
  gj.prototype.Vd = function () {
    var a = new XMLHttpRequest()
    if ('withCredentials' in a) return a
    if ('undefined' != typeof XDomainRequest) return new hj()
    throw Error('Unsupported browser')
  }
  gj.prototype.rf = function () {
    return {}
  }
  var hj = function () {
    this.Rb = new XDomainRequest()
    this.readyState = 0
    this.onreadystatechange = null
    this.responseType = this.responseText = this.response = ''
    this.status = -1
    this.responseXML = null
    this.statusText = ''
    this.Rb.onload = u(this.Uk, this)
    this.Rb.onerror = u(this.Hi, this)
    this.Rb.onprogress = u(this.Wk, this)
    this.Rb.ontimeout = u(this.al, this)
  }
  k = hj.prototype
  k.open = function (a, b, c) {
    if (null != c && !c) throw Error('Only async requests are supported.')
    this.Rb.open(a, b)
  }
  k.send = function (a) {
    if (a)
      if ('string' == typeof a) this.Rb.send(a)
      else throw Error('Only string data is supported')
    else this.Rb.send()
  }
  k.abort = function () {
    this.Rb.abort()
  }
  k.setRequestHeader = function () {}
  k.getResponseHeader = function (a) {
    return 'content-type' == a.toLowerCase() ? this.Rb.contentType : ''
  }
  k.Uk = function () {
    this.status = 200
    this.response = this.responseText = this.Rb.responseText
    ij(this, 4)
  }
  k.Hi = function () {
    this.status = 500
    this.response = this.responseText = ''
    ij(this, 4)
  }
  k.al = function () {
    this.Hi()
  }
  k.Wk = function () {
    this.status = 200
    ij(this, 1)
  }
  var ij = function (a, b) {
    a.readyState = b
    if (a.onreadystatechange) a.onreadystatechange()
  }
  hj.prototype.getAllResponseHeaders = function () {
    return 'content-type: ' + this.Rb.contentType
  }
  var jj = function (a) {
    this.Ne = a.Am || null
    this.Fe = a.Qm || !1
    this.ad = this.Gc = void 0
  }
  v(jj, cj)
  jj.prototype.Vd = function () {
    var a = new kj(this.Ne, this.Fe)
    this.Gc && a.Dh(this.Gc)
    this.ad && a.Ij(this.ad)
    return a
  }
  jj.prototype.rf = (function (a) {
    return function () {
      return a
    }
  })({})
  jj.prototype.Dh = function (a) {
    this.Gc = a
  }
  jj.prototype.Ij = function (a) {
    this.ad = a
  }
  var kj = function (a, b) {
    $i.call(this)
    this.Ne = a
    this.Fe = b
    this.ad = this.Gc = void 0
    this.status = this.readyState = 0
    this.responseType = this.responseText = this.response = this.statusText = ''
    this.onreadystatechange = this.responseXML = null
    this.yh = new Headers()
    this.Jd = null
    this.ej = 'GET'
    this.kb = ''
    this.Tb = !1
    this.Ph = this.Wd = this.Ze = null
  }
  v(kj, $i)
  kj.prototype.open = function (a, b, c) {
    w(!!c, 'Only async requests are supported.')
    if (0 != this.readyState) throw (this.abort(), Error('Error reopening a connection'))
    this.ej = a
    this.kb = b
    this.readyState = 1
    lj(this)
  }
  kj.prototype.send = function (a) {
    if (1 != this.readyState) throw (this.abort(), Error('need to call open() first. '))
    this.Tb = !0
    var b = { headers: this.yh, method: this.ej, credentials: this.Gc, cache: this.ad }
    a && (b.body = a)
    ;(this.Ne || p).fetch(new Request(this.kb, b)).then(this.Zk.bind(this), this.ff.bind(this))
  }
  kj.prototype.abort = function () {
    var a = this
    this.response = this.responseText = ''
    this.yh = new Headers()
    this.status = 0
    this.Wd &&
      this.Wd.cancel('Request was aborted.').catch(function () {
        var b = a.Ea
        b && jc(b, Xb, 'Fetch reader cancellation error.')
      })
    1 <= this.readyState && this.Tb && 4 != this.readyState && ((this.Tb = !1), mj(this))
    this.readyState = 0
  }
  kj.prototype.Zk = function (a) {
    if (
      this.Tb &&
      ((this.Ze = a),
      this.Jd ||
        ((this.status = this.Ze.status),
        (this.statusText = this.Ze.statusText),
        (this.Jd = a.headers),
        (this.readyState = 2),
        lj(this)),
      this.Tb && ((this.readyState = 3), lj(this), this.Tb))
    )
      if ('arraybuffer' === this.responseType)
        a.arrayBuffer().then(this.Xk.bind(this), this.ff.bind(this))
      else if ('undefined' !== typeof p.ReadableStream && 'body' in a) {
        this.Wd = a.body.getReader()
        if (this.Fe) {
          if (this.responseType)
            throw Error('responseType must be empty for "streamBinaryChunks" mode responses.')
          this.response = []
        } else (this.response = this.responseText = ''), (this.Ph = new TextDecoder())
        nj(this)
      } else a.text().then(this.Yk.bind(this), this.ff.bind(this))
  }
  var nj = function (a) {
    a.Wd.read().then(a.Sk.bind(a)).catch(a.ff.bind(a))
  }
  kj.prototype.Sk = function (a) {
    if (this.Tb) {
      if (this.Fe && a.value) this.response.push(a.value)
      else if (!this.Fe) {
        var b = a.value ? a.value : new Uint8Array(0)
        if ((b = this.Ph.decode(b, { stream: !a.done }))) this.response = this.responseText += b
      }
      a.done ? mj(this) : lj(this)
      3 == this.readyState && nj(this)
    }
  }
  kj.prototype.Yk = function (a) {
    this.Tb && ((this.response = this.responseText = a), mj(this))
  }
  kj.prototype.Xk = function (a) {
    this.Tb && ((this.response = a), mj(this))
  }
  kj.prototype.ff = function () {
    var a = this.Ea
    a && jc(a, Xb, 'Failed to fetch url ' + this.kb)
    this.Tb && mj(this)
  }
  var mj = function (a) {
    a.readyState = 4
    a.Ze = null
    a.Wd = null
    a.Ph = null
    lj(a)
  }
  k = kj.prototype
  k.setRequestHeader = function (a, b) {
    this.yh.append(a, b)
  }
  k.getResponseHeader = function (a) {
    return this.Jd
      ? this.Jd.get(a.toLowerCase()) || ''
      : ((a = this.Ea) &&
          jc(
            a,
            Xb,
            'Attempting to get response header but no headers have been received for url: ' +
              this.kb
          ),
        '')
  }
  k.getAllResponseHeaders = function () {
    if (!this.Jd) {
      var a = this.Ea
      a &&
        jc(
          a,
          Xb,
          'Attempting to get all response headers but no headers have been received for url: ' +
            this.kb
        )
      return ''
    }
    a = []
    for (var b = this.Jd.entries(), c = b.next(); !c.done; )
      (c = c.value), a.push(c[0] + ': ' + c[1]), (c = b.next())
    return a.join('\r\n')
  }
  k.Dh = function (a) {
    this.Gc = a
  }
  k.Ij = function (a) {
    this.ad = a
  }
  var lj = function (a) {
    a.onreadystatechange && a.onreadystatechange.call(a)
  }
  Object.defineProperty(kj.prototype, 'withCredentials', {
    get: function () {
      return 'include' === this.Gc
    },
    set: function (a) {
      this.Dh(a ? 'include' : 'same-origin')
    },
  })
  function oj() {} /*

 Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: MIT
*/
  var pj = function (a, b) {
    this.Rf = []
    this.ij = a
    this.ni = b || null
    this.ie = this.od = !1
    this.Ua = void 0
    this.Kh = this.Yh = this.mg = !1
    this.Xf = 0
    this.Ha = null
    this.ng = 0
  }
  v(pj, oj)
  pj.prototype.cancel = function (a) {
    if (this.od) this.Ua instanceof pj && this.Ua.cancel()
    else {
      if (this.Ha) {
        var b = this.Ha
        delete this.Ha
        a ? b.cancel(a) : (b.ng--, 0 >= b.ng && b.cancel())
      }
      this.ij ? this.ij.call(this.ni, this) : (this.Kh = !0)
      this.od || qj(this, new rj(this))
    }
  }
  pj.prototype.hi = function (a, b) {
    this.mg = !1
    sj(this, a, b)
  }
  var sj = function (a, b, c) {
      a.od = !0
      a.Ua = c
      a.ie = !b
      tj(a)
    },
    vj = function (a) {
      if (a.od) {
        if (!a.Kh) throw new uj(a)
        a.Kh = !1
      }
    }
  pj.prototype.callback = function (a) {
    vj(this)
    wj(a)
    sj(this, !0, a)
  }
  var qj = function (a, b) {
      vj(a)
      wj(b)
      sj(a, !1, b)
    },
    wj = function (a) {
      w(!(a instanceof pj), 'An execution sequence may not be initiated with a blocking Deferred.')
    }
  pj.prototype.addCallback = function (a, b) {
    return xj(this, a, null, b)
  }
  var yj = function (a, b) {
      xj(a, null, b)
    },
    xj = function (a, b, c, d) {
      w(!a.Yh, 'Blocking Deferreds can not be re-used')
      a.Rf.push([b, c, d])
      a.od && tj(a)
      return a
    }
  pj.prototype.then = function (a, b, c) {
    var d,
      e,
      f = new E(function (g, h) {
        e = g
        d = h
      })
    xj(
      this,
      e,
      function (g) {
        g instanceof rj ? f.cancel() : d(g)
        return zj
      },
      this
    )
    return f.then(a, b, c)
  }
  pj.prototype.$goog_Thenable = !0
  var Aj = function (a) {
      return Na(a.Rf, function (b) {
        return 'function' === typeof b[1]
      })
    },
    zj = {},
    tj = function (a) {
      if (a.Xf && a.od && Aj(a)) {
        var b = a.Xf,
          c = Bj[b]
        c && (p.clearTimeout(c.Pa), delete Bj[b])
        a.Xf = 0
      }
      a.Ha && (a.Ha.ng--, delete a.Ha)
      b = a.Ua
      for (var d = (c = !1); a.Rf.length && !a.mg; ) {
        var e = a.Rf.shift(),
          f = e[0],
          g = e[1]
        e = e[2]
        if ((f = a.ie ? g : f))
          try {
            var h = f.call(e || a.ni, b)
            h === zj && (h = void 0)
            void 0 !== h && ((a.ie = a.ie && (h == b || h instanceof Error)), (a.Ua = b = h))
            if (Nf(b) || ('function' === typeof p.Promise && b instanceof p.Promise))
              (d = !0), (a.mg = !0)
          } catch (l) {
            ;(b = l), (a.ie = !0), Aj(a) || (c = !0)
          }
      }
      a.Ua = b
      d &&
        ((h = u(a.hi, a, !0)),
        (d = u(a.hi, a, !1)),
        b instanceof pj ? (xj(b, h, d), (b.Yh = !0)) : b.then(h, d))
      c && ((b = new Cj(b)), (Bj[b.Pa] = b), (a.Xf = b.Pa))
    },
    uj = function () {
      za.call(this)
    }
  v(uj, za)
  uj.prototype.message = 'Deferred has already fired'
  uj.prototype.name = 'AlreadyCalledError'
  var rj = function () {
    za.call(this)
  }
  v(rj, za)
  rj.prototype.message = 'Deferred was canceled'
  rj.prototype.name = 'CanceledError'
  var Cj = function (a) {
    this.Pa = p.setTimeout(u(this.rm, this), 0)
    this.Ab = a
  }
  Cj.prototype.rm = function () {
    w(Bj[this.Pa], 'Cannot throw an error that is not scheduled.')
    delete Bj[this.Pa]
    throw this.Ab
  }
  var Bj = {}
  var Hj = function (a) {
      var b = {},
        c = b.document || document,
        d = ob(a).toString(),
        e = new $c(c).createElement('SCRIPT'),
        f = { Dj: e, Ie: void 0 },
        g = new pj(Dj, f),
        h = null,
        l = null != b.timeout ? b.timeout : 5e3
      0 < l &&
        ((h = window.setTimeout(function () {
          Ej(e, !0)
          qj(g, new Fj(1, 'Timeout reached for loading script ' + d))
        }, l)),
        (f.Ie = h))
      e.onload = e.onreadystatechange = function () {
        ;(e.readyState && 'loaded' != e.readyState && 'complete' != e.readyState) ||
          (Ej(e, b.Nm || !1, h), g.callback(null))
      }
      e.onerror = function () {
        Ej(e, !0, h)
        qj(g, new Fj(0, 'Error while loading script ' + d))
      }
      f = b.attributes || {}
      $a(f, { type: 'text/javascript', charset: 'UTF-8' })
      Sc(e, f)
      Nc(e, a)
      Gj(c).appendChild(e)
      return g
    },
    Gj = function (a) {
      var b
      return (b = (a || document).getElementsByTagName('HEAD')) && 0 !== b.length
        ? b[0]
        : a.documentElement
    },
    Dj = function () {
      if (this && this.Dj) {
        var a = this.Dj
        a && 'SCRIPT' == a.tagName && Ej(a, !0, this.Ie)
      }
    },
    Ej = function (a, b, c) {
      null != c && p.clearTimeout(c)
      a.onload = function () {}
      a.onerror = function () {}
      a.onreadystatechange = function () {}
      b &&
        window.setTimeout(function () {
          Yc(a)
        }, 0)
    },
    Fj = function (a, b) {
      var c = 'Jsloader error (code #' + a + ')'
      b && (c += ': ' + b)
      za.call(this, c)
      this.code = a
    }
  v(Fj, za)
  var Ij = function (a, b, c) {
      if ('function' === typeof a) c && (a = u(a, c))
      else if (a && 'function' == typeof a.handleEvent) a = u(a.handleEvent, a)
      else throw Error('Invalid listener argument')
      return 2147483647 < Number(b) ? -1 : p.setTimeout(a, b || 0)
    },
    Jj = function (a) {
      var b = null
      return new E(function (c, d) {
        b = Ij(function () {
          c(void 0)
        }, a)
        ;-1 == b && d(Error('Failed to schedule timer.'))
      }).l(function (c) {
        p.clearTimeout(b)
        throw c
      })
    }
  var Kj = RegExp(
      '^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$'
    ),
    Lj = function (a, b) {
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
  var Mj = function (a) {
    $i.call(this)
    this.headers = new Map()
    this.eg = a || null
    this.mc = !1
    this.dg = this.u = null
    this.me = this.Yi = this.wf = ''
    this.Nc = this.Ng = this.qf = this.Bg = !1
    this.Md = 0
    this.Vf = null
    this.Mf = ''
    this.Yf = this.Ol = this.ek = !1
    this.Qh = null
  }
  v(Mj, $i)
  var Nj = /^https?$/i,
    Oj = ['POST', 'PUT']
  Mj.prototype.setTrustToken = function (a) {
    this.Qh = a
  }
  Mj.prototype.send = function (a, b, c, d) {
    if (this.u)
      throw Error(
        '[goog.net.XhrIo] Object is active with another request=' + this.wf + '; newUri=' + a
      )
    b = b ? b.toUpperCase() : 'GET'
    this.wf = a
    this.me = ''
    this.Yi = b
    this.Bg = !1
    this.mc = !0
    this.u = this.eg ? this.eg.Vd() : dj.Vd()
    this.dg = this.eg ? this.eg.getOptions() : dj.getOptions()
    this.u.onreadystatechange = u(this.rj, this)
    this.Ol &&
      'onprogress' in this.u &&
      ((this.u.onprogress = u(function (g) {
        this.qj(g, !0)
      }, this)),
      this.u.upload && (this.u.upload.onprogress = u(this.qj, this)))
    try {
      lc(this.Ea, Pj(this, 'Opening Xhr')),
        (this.Ng = !0),
        this.u.open(b, String(a), !0),
        (this.Ng = !1)
    } catch (g) {
      lc(this.Ea, Pj(this, 'Error opening Xhr: ' + g.message))
      this.Ab(5, g)
      return
    }
    a = c || ''
    c = new Map(this.headers)
    if (d)
      if (Object.getPrototypeOf(d) === Object.prototype) for (var e in d) c.set(e, d[e])
      else if ('function' === typeof d.keys && 'function' === typeof d.get) {
        e = ha(d.keys())
        for (var f = e.next(); !f.done; f = e.next()) (f = f.value), c.set(f, d.get(f))
      } else throw Error('Unknown input type for opt_headers: ' + String(d))
    d = Array.from(c.keys()).find(function (g) {
      return 'content-type' == g.toLowerCase()
    })
    e = p.FormData && a instanceof p.FormData
    !Oa(Oj, b) || d || e || c.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
    b = ha(c)
    for (d = b.next(); !d.done; d = b.next())
      (c = ha(d.value)), (d = c.next().value), (c = c.next().value), this.u.setRequestHeader(d, c)
    this.Mf && (this.u.responseType = this.Mf)
    'withCredentials' in this.u &&
      this.u.withCredentials !== this.ek &&
      (this.u.withCredentials = this.ek)
    if ('setTrustToken' in this.u && this.Qh)
      try {
        this.u.setTrustToken(this.Qh)
      } catch (g) {
        lc(this.Ea, Pj(this, 'Error SetTrustToken: ' + g.message))
      }
    try {
      Qj(this),
        0 < this.Md &&
          ((this.Yf = Rj(this.u)),
          lc(
            this.Ea,
            Pj(this, 'Will abort after ' + this.Md + 'ms if incomplete, xhr2 ' + this.Yf)
          ),
          this.Yf
            ? ((this.u.timeout = this.Md), (this.u.ontimeout = u(this.Ie, this)))
            : (this.Vf = Ij(this.Ie, this.Md, this))),
        lc(this.Ea, Pj(this, 'Sending request')),
        (this.qf = !0),
        this.u.send(a),
        (this.qf = !1)
    } catch (g) {
      lc(this.Ea, Pj(this, 'Send error: ' + g.message)), this.Ab(5, g)
    }
  }
  var Rj = function (a) {
    return sc && 'number' === typeof a.timeout && void 0 !== a.ontimeout
  }
  Mj.prototype.Ie = function () {
    'undefined' != typeof ra &&
      this.u &&
      ((this.me = 'Timed out after ' + this.Md + 'ms, aborting'),
      lc(this.Ea, Pj(this, this.me)),
      this.dispatchEvent('timeout'),
      this.abort(8))
  }
  Mj.prototype.Ab = function (a, b) {
    this.mc = !1
    this.u && ((this.Nc = !0), this.u.abort(), (this.Nc = !1))
    this.me = b
    Sj(this)
    Tj(this)
  }
  var Sj = function (a) {
    a.Bg || ((a.Bg = !0), a.dispatchEvent('complete'), a.dispatchEvent('error'))
  }
  Mj.prototype.abort = function () {
    this.u &&
      this.mc &&
      (lc(this.Ea, Pj(this, 'Aborting')),
      (this.mc = !1),
      (this.Nc = !0),
      this.u.abort(),
      (this.Nc = !1),
      this.dispatchEvent('complete'),
      this.dispatchEvent('abort'),
      Tj(this))
  }
  Mj.prototype.Zd = function () {
    this.u &&
      (this.mc && ((this.mc = !1), (this.Nc = !0), this.u.abort(), (this.Nc = !1)), Tj(this, !0))
    Mj.Wc.Zd.call(this)
  }
  Mj.prototype.rj = function () {
    this.isDisposed() || (this.Ng || this.qf || this.Nc ? Uj(this) : this.Hl())
  }
  Mj.prototype.Hl = function () {
    Uj(this)
  }
  var Uj = function (a) {
    if (a.mc && 'undefined' != typeof ra)
      if (a.dg[1] && 4 == Vj(a) && 2 == a.getStatus())
        lc(a.Ea, Pj(a, 'Local request error detected and ignored'))
      else if (a.qf && 4 == Vj(a)) Ij(a.rj, 0, a)
      else if ((a.dispatchEvent('readystatechange'), 4 == Vj(a))) {
        lc(a.Ea, Pj(a, 'Request complete'))
        a.mc = !1
        try {
          var b = a.getStatus()
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
              var f = String(a.wf).match(Kj)[1] || null
              !f && p.self && p.self.location && (f = p.self.location.protocol.slice(0, -1))
              e = !Nj.test(f ? f.toLowerCase() : '')
            }
            d = e
          }
          if (d) a.dispatchEvent('complete'), a.dispatchEvent('success')
          else {
            try {
              var g = 2 < Vj(a) ? a.u.statusText : ''
            } catch (h) {
              lc(a.Ea, 'Can not get status: ' + h.message), (g = '')
            }
            a.me = g + ' [' + a.getStatus() + ']'
            Sj(a)
          }
        } finally {
          Tj(a)
        }
      }
  }
  Mj.prototype.qj = function (a, b) {
    w('progress' === a.type, 'goog.net.EventType.PROGRESS is of the same type as raw XHR progress.')
    this.dispatchEvent(Wj(a, 'progress'))
    this.dispatchEvent(Wj(a, b ? 'downloadprogress' : 'uploadprogress'))
  }
  var Wj = function (a, b) {
      return { type: b, lengthComputable: a.lengthComputable, loaded: a.loaded, total: a.total }
    },
    Tj = function (a, b) {
      if (a.u) {
        Qj(a)
        var c = a.u,
          d = a.dg[0] ? function () {} : null
        a.u = null
        a.dg = null
        b || a.dispatchEvent('ready')
        try {
          c.onreadystatechange = d
        } catch (e) {
          kc(a.Ea, 'Problem encountered resetting onreadystatechange: ' + e.message)
        }
      }
    },
    Qj = function (a) {
      a.u && a.Yf && (a.u.ontimeout = null)
      a.Vf && (p.clearTimeout(a.Vf), (a.Vf = null))
    }
  Mj.prototype.isActive = function () {
    return !!this.u
  }
  var Vj = function (a) {
    return a.u ? a.u.readyState : 0
  }
  Mj.prototype.getStatus = function () {
    try {
      return 2 < Vj(this) ? this.u.status : -1
    } catch (a) {
      return -1
    }
  }
  Mj.prototype.getResponse = function () {
    try {
      if (!this.u) return null
      if ('response' in this.u) return this.u.response
      switch (this.Mf) {
        case '':
        case 'text':
          return this.u.responseText
        case 'arraybuffer':
          if ('mozResponseArrayBuffer' in this.u) return this.u.mozResponseArrayBuffer
      }
      kc(this.Ea, 'Response type ' + this.Mf + ' is not supported on this browser')
      return null
    } catch (a) {
      return lc(this.Ea, 'Can not get response: ' + a.message), null
    }
  }
  Mj.prototype.getResponseHeader = function (a) {
    if (this.u && 4 == Vj(this)) return (a = this.u.getResponseHeader(a)), null === a ? void 0 : a
  }
  Mj.prototype.getAllResponseHeaders = function () {
    return this.u && 2 <= Vj(this) ? this.u.getAllResponseHeaders() || '' : ''
  }
  var Pj = function (a, b) {
    return b + ' [' + a.Yi + ' ' + a.wf + ' ' + a.getStatus() + ']'
  }
  var Xj = function (a) {
      if (a.Mc && 'function' == typeof a.Mc) return a.Mc()
      if (
        ('undefined' !== typeof Map && a instanceof Map) ||
        ('undefined' !== typeof Set && a instanceof Set)
      )
        return Array.from(a.values())
      if ('string' === typeof a) return a.split('')
      if (ta(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d])
        return b
      }
      b = []
      c = 0
      for (d in a) b[c++] = a[d]
      return b
    },
    Yj = function (a) {
      if (a.Gg && 'function' == typeof a.Gg) return a.Gg()
      if (!a.Mc || 'function' != typeof a.Mc) {
        if ('undefined' !== typeof Map && a instanceof Map) return Array.from(a.keys())
        if (!('undefined' !== typeof Set && a instanceof Set)) {
          if (ta(a) || 'string' === typeof a) {
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
    Zj = function (a, b, c) {
      if (a.forEach && 'function' == typeof a.forEach) a.forEach(b, c)
      else if (ta(a) || 'string' === typeof a) Array.prototype.forEach.call(a, b, c)
      else
        for (var d = Yj(a), e = Xj(a), f = e.length, g = 0; g < f; g++)
          b.call(c, e[g], d && d[g], a)
    }
  var ak = function (a) {
    this.Ga = this.Xc = this.Va = ''
    this.Ub = null
    this.Kc = this.Ff = ''
    this.Bb = this.ul = !1
    if (a instanceof ak) {
      this.Bb = a.Bb
      bk(this, a.Va)
      var b = a.Xc
      ck(this)
      this.Xc = b
      dk(this, a.Ga)
      ek(this, a.Ub)
      this.setPath(a.getPath())
      fk(this, a.tb.clone())
      a = a.Kc
      ck(this)
      this.Kc = a
    } else
      a && (b = String(a).match(Kj))
        ? ((this.Bb = !1),
          bk(this, b[1] || '', !0),
          (a = b[2] || ''),
          ck(this),
          (this.Xc = gk(a)),
          dk(this, b[3] || '', !0),
          ek(this, b[4]),
          this.setPath(b[5] || '', !0),
          fk(this, b[6] || '', !0),
          (a = b[7] || ''),
          ck(this),
          (this.Kc = gk(a)))
        : ((this.Bb = !1), (this.tb = new hk(null, this.Bb)))
  }
  ak.prototype.toString = function () {
    var a = [],
      b = this.Va
    b && a.push(ik(b, jk, !0), ':')
    var c = this.Ga
    if (c || 'file' == b)
      a.push('//'),
        (b = this.Xc) && a.push(ik(b, jk, !0), '@'),
        a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
        (c = this.Ub),
        null != c && a.push(':', String(c))
    if ((c = this.getPath()))
      this.Ga && '/' != c.charAt(0) && a.push('/'), a.push(ik(c, '/' == c.charAt(0) ? kk : lk, !0))
    ;(c = this.tb.toString()) && a.push('?', c)
    ;(c = this.Kc) && a.push('#', ik(c, mk))
    return a.join('')
  }
  ak.prototype.resolve = function (a) {
    var b = this.clone(),
      c = !!a.Va
    c ? bk(b, a.Va) : (c = !!a.Xc)
    if (c) {
      var d = a.Xc
      ck(b)
      b.Xc = d
    } else c = !!a.Ga
    c ? dk(b, a.Ga) : (c = null != a.Ub)
    d = a.getPath()
    if (c) ek(b, a.Ub)
    else if ((c = !!a.Ff)) {
      if ('/' != d.charAt(0))
        if (this.Ga && !this.Ff) d = '/' + d
        else {
          var e = b.getPath().lastIndexOf('/')
          ;-1 != e && (d = b.getPath().slice(0, e + 1) + d)
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
    c ? b.setPath(d) : (c = '' !== a.tb.toString())
    c ? fk(b, a.tb.clone()) : (c = !!a.Kc)
    c && ((a = a.Kc), ck(b), (b.Kc = a))
    return b
  }
  ak.prototype.clone = function () {
    return new ak(this)
  }
  var bk = function (a, b, c) {
      ck(a)
      a.Va = c ? gk(b, !0) : b
      a.Va && (a.Va = a.Va.replace(/:$/, ''))
    },
    dk = function (a, b, c) {
      ck(a)
      a.Ga = c ? gk(b, !0) : b
    },
    ek = function (a, b) {
      ck(a)
      if (b) {
        b = Number(b)
        if (isNaN(b) || 0 > b) throw Error('Bad port number ' + b)
        a.Ub = b
      } else a.Ub = null
    }
  ak.prototype.getPath = function () {
    return this.Ff
  }
  ak.prototype.setPath = function (a, b) {
    ck(this)
    this.Ff = b ? gk(a, !0) : a
    return this
  }
  var fk = function (a, b, c) {
    ck(a)
    b instanceof hk ? ((a.tb = b), a.tb.Fh(a.Bb)) : (c || (b = ik(b, nk)), (a.tb = new hk(b, a.Bb)))
  }
  ak.prototype.getQuery = function () {
    return this.tb.toString()
  }
  var L = function (a, b, c) {
      ck(a)
      a.tb.set(b, c)
    },
    ok = function (a, b) {
      return a.tb.get(b)
    }
  ak.prototype.removeParameter = function (a) {
    ck(this)
    this.tb.remove(a)
    return this
  }
  var ck = function (a) {
    if (a.ul) throw Error('Tried to modify a read-only Uri')
  }
  ak.prototype.Fh = function (a) {
    this.Bb = a
    this.tb && this.tb.Fh(a)
  }
  var M = function (a) {
      return a instanceof ak ? a.clone() : new ak(a)
    },
    pk = function (a, b, c, d) {
      var e = new ak(null)
      a && bk(e, a)
      b && dk(e, b)
      c && ek(e, c)
      d && e.setPath(d)
      return e
    },
    gk = function (a, b) {
      return a ? (b ? decodeURI(a.replace(/%25/g, '%2525')) : decodeURIComponent(a)) : ''
    },
    ik = function (a, b, c) {
      return 'string' === typeof a
        ? ((a = encodeURI(a).replace(b, qk)),
          c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
          a)
        : null
    },
    qk = function (a) {
      a = a.charCodeAt(0)
      return '%' + ((a >> 4) & 15).toString(16) + (a & 15).toString(16)
    },
    jk = /[#\/\?@]/g,
    lk = /[#\?:]/g,
    kk = /[#\?]/g,
    nk = /[#\?@]/g,
    mk = /#/g,
    hk = function (a, b) {
      this.Na = this.qa = null
      this.nb = a || null
      this.Bb = !!b
    },
    rk = function (a) {
      a.qa ||
        ((a.qa = new Map()),
        (a.Na = 0),
        a.nb &&
          Lj(a.nb, function (b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, ' ')), c)
          }))
    },
    sk = function (a) {
      var b = Yj(a)
      if ('undefined' == typeof b) throw Error('Keys are undefined')
      var c = new hk(null)
      a = Xj(a)
      for (var d = 0; d < b.length; d++) {
        var e = b[d],
          f = a[d]
        Array.isArray(f) ? c.setValues(e, f) : c.add(e, f)
      }
      return c
    }
  hk.prototype.add = function (a, b) {
    rk(this)
    this.nb = null
    a = this.ob(a)
    var c = this.qa.get(a)
    c || this.qa.set(a, (c = []))
    c.push(b)
    this.Na = Ga(this.Na) + 1
    return this
  }
  hk.prototype.remove = function (a) {
    rk(this)
    a = this.ob(a)
    return this.qa.has(a)
      ? ((this.nb = null), (this.Na = Ga(this.Na) - this.qa.get(a).length), this.qa.delete(a))
      : !1
  }
  hk.prototype.clear = function () {
    this.qa = this.nb = null
    this.Na = 0
  }
  hk.prototype.isEmpty = function () {
    rk(this)
    return 0 == this.Na
  }
  var tk = function (a, b) {
    rk(a)
    b = a.ob(b)
    return a.qa.has(b)
  }
  k = hk.prototype
  k.forEach = function (a, b) {
    rk(this)
    this.qa.forEach(function (c, d) {
      c.forEach(function (e) {
        a.call(b, e, d, this)
      }, this)
    }, this)
  }
  k.Gg = function () {
    rk(this)
    for (
      var a = Array.from(this.qa.values()), b = Array.from(this.qa.keys()), c = [], d = 0;
      d < b.length;
      d++
    )
      for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d])
    return c
  }
  k.Mc = function (a) {
    rk(this)
    var b = []
    if ('string' === typeof a) tk(this, a) && (b = b.concat(this.qa.get(this.ob(a))))
    else {
      a = Array.from(this.qa.values())
      for (var c = 0; c < a.length; c++) b = b.concat(a[c])
    }
    return b
  }
  k.set = function (a, b) {
    rk(this)
    this.nb = null
    a = this.ob(a)
    tk(this, a) && (this.Na = Ga(this.Na) - this.qa.get(a).length)
    this.qa.set(a, [b])
    this.Na = Ga(this.Na) + 1
    return this
  }
  k.get = function (a, b) {
    if (!a) return b
    a = this.Mc(a)
    return 0 < a.length ? String(a[0]) : b
  }
  k.setValues = function (a, b) {
    this.remove(a)
    0 < b.length &&
      ((this.nb = null), this.qa.set(this.ob(a), Sa(b)), (this.Na = Ga(this.Na) + b.length))
  }
  k.toString = function () {
    if (this.nb) return this.nb
    if (!this.qa) return ''
    for (var a = [], b = Array.from(this.qa.keys()), c = 0; c < b.length; c++) {
      var d = b[c],
        e = encodeURIComponent(String(d))
      d = this.Mc(d)
      for (var f = 0; f < d.length; f++) {
        var g = e
        '' !== d[f] && (g += '=' + encodeURIComponent(String(d[f])))
        a.push(g)
      }
    }
    return (this.nb = a.join('&'))
  }
  k.clone = function () {
    var a = new hk()
    a.nb = this.nb
    this.qa && ((a.qa = new Map(this.qa)), (a.Na = this.Na))
    return a
  }
  k.ob = function (a) {
    a = String(a)
    this.Bb && (a = a.toLowerCase())
    return a
  }
  k.Fh = function (a) {
    a &&
      !this.Bb &&
      (rk(this),
      (this.nb = null),
      this.qa.forEach(function (b, c) {
        var d = c.toLowerCase()
        c != d && (this.remove(c), this.setValues(d, b))
      }, this))
    this.Bb = a
  }
  k.extend = function (a) {
    for (var b = 0; b < arguments.length; b++)
      Zj(
        arguments[b],
        function (c, d) {
          this.add(d, c)
        },
        this
      )
  }
  var uk = {
      Dm: {
        af: 'https://staging-identitytoolkit.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/',
        Of: 'https://staging-securetoken.sandbox.googleapis.com/v1/token',
        kf: 'https://staging-identitytoolkit.sandbox.googleapis.com/v2/',
        id: 'b',
      },
      Jm: {
        af: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/',
        Of: 'https://securetoken.googleapis.com/v1/token',
        kf: 'https://identitytoolkit.googleapis.com/v2/',
        id: 'p',
      },
      Km: {
        af: 'https://staging-www.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/',
        Of: 'https://staging-securetoken.sandbox.googleapis.com/v1/token',
        kf: 'https://staging-identitytoolkit.sandbox.googleapis.com/v2/',
        id: 's',
      },
      Lm: {
        af: 'https://www-googleapis-test.sandbox.google.com/identitytoolkit/v3/relyingparty/',
        Of: 'https://test-securetoken.sandbox.googleapis.com/v1/token',
        kf: 'https://test-identitytoolkit.sandbox.googleapis.com/v2/',
        id: 't',
      },
    },
    vk = function (a) {
      for (var b in uk)
        if (uk[b].id === a)
          return (
            (a = uk[b]),
            { firebaseEndpoint: a.af, secureTokenEndpoint: a.Of, identityPlatformEndpoint: a.kf }
          )
      return null
    },
    wk
  wk = vk('__EID__') ? '__EID__' : void 0
  var angular,
    yk = function () {
      var a = xk()
      return (sc && !!Hc && 11 == Hc) || /Edge\/\d+/.test(a)
    },
    zk = function () {
      return (
        (p.window && p.window.location.href) || (self && self.location && self.location.href) || ''
      )
    },
    Ak = function (a, b) {
      b = b || p.window
      var c = 'about:blank'
      a && (c = Cb(Fb(a) || Jb))
      b.location.href = c
    },
    Bk = function (a, b) {
      var c = [],
        d
      for (d in a)
        d in b
          ? typeof a[d] != typeof b[d]
            ? c.push(d)
            : 'object' == typeof a[d] && null != a[d] && null != b[d]
            ? 0 < Bk(a[d], b[d]).length && c.push(d)
            : a[d] !== b[d] && c.push(d)
          : c.push(d)
      for (var e in b) e in a || c.push(e)
      return c
    },
    Dk = function () {
      var a = xk()
      a =
        'Chrome' != Ck(a)
          ? null
          : (a = a.match(/\sChrome\/(\d+)/i)) && 2 == a.length
          ? parseInt(a[1], 10)
          : null
      return a && 30 > a ? !1 : !sc || !Hc || 9 < Hc
    },
    Ek = function (a) {
      a = (a || xk()).toLowerCase()
      return a.match(/android/) ||
        a.match(/webos/) ||
        a.match(/iphone|ipad|ipod/) ||
        a.match(/blackberry/) ||
        a.match(/windows phone/) ||
        a.match(/iemobile/)
        ? !0
        : !1
    },
    Fk = function (a) {
      a = a || p.window
      try {
        a.close()
      } catch (b) {}
    },
    Gk = function (a, b, c) {
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
      c = xk().toLowerCase()
      d && ((b.target = d), A(c, 'crios/') && (b.target = '_blank'))
      'Firefox' == Ck(xk()) && ((a = a || 'http://localhost'), (b.scrollbars = !0))
      e = a || ''
      b || (b = {})
      a = window
      d = e instanceof Bb ? e : Fb('undefined' != typeof e.href ? e.href : String(e)) || Jb
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
      ;(pc() || B('iPad') || B('iPod')) &&
      a.navigator &&
      a.navigator.standalone &&
      e &&
      '_self' != e
        ? ((h = Vc(document, 'A')),
          Lc(h, d),
          (h.target = e),
          c && (h.rel = 'noreferrer'),
          (d = document.createEvent('MouseEvent')),
          d.initMouseEvent('click', !0, !0, a, 1),
          h.dispatchEvent(d),
          (h = {}))
        : c
        ? ((h = Oc('', a, e, h)),
          (d = Cb(d)),
          h &&
            (uc && A(d, ';') && (d = "'" + d.replace(/'/g, '%27') + "'"),
            (h.opener = null),
            '' === d && (d = "javascript:''"),
            (a = new kb(ib, 'b/12014412, meta tag with sanitized URL')),
            zb.test(d) &&
              (-1 != d.indexOf('&') && (d = d.replace(tb, '&amp;')),
              -1 != d.indexOf('<') && (d = d.replace(ub, '&lt;')),
              -1 != d.indexOf('>') && (d = d.replace(vb, '&gt;')),
              -1 != d.indexOf('"') && (d = d.replace(wb, '&quot;')),
              -1 != d.indexOf("'") && (d = d.replace(xb, '&#39;')),
              -1 != d.indexOf('\x00') && (d = d.replace(yb, '&#0;'))),
            (a = Kc(
              a,
              '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' +
                d +
                '">'
            )),
            (d = h.document) && d.write && (d.write(Tb(a)), d.close())))
        : ((h = Oc(d, a, e, h)) && b.noopener && (h.opener = null),
          h && b.noreferrer && (h.opener = null))
      if (h)
        try {
          h.focus()
        } catch (l) {}
      return h
    },
    Hk = function (a) {
      return new E(function (b) {
        var c = function () {
          Jj(2e3).then(function () {
            if (!a || a.closed) b()
            else return c()
          })
        }
        return c()
      })
    },
    Jk = function (a, b) {
      var c = M(b)
      b = c.Va
      c = c.Ga
      for (var d = 0; d < a.length; d++) {
        var e = a[d]
        0 == e.indexOf('chrome-extension://')
          ? (e = M(e).Ga == c && 'chrome-extension' == b)
          : 'http' != b && 'https' != b
          ? (e = !1)
          : Ik.test(e)
          ? (e = c == e)
          : ((e = e.split('.').join('\\.')),
            (e = new RegExp('^(.+\\.' + e + '|' + e + ')$', 'i').test(c)))
        if (e) return !0
      }
      return !1
    },
    Ik = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    Kk = /^[^@]+@[^@]+$/,
    Lk = function () {
      var a = null
      return new E(function (b) {
        'complete' == p.document.readyState
          ? b()
          : ((a = function () {
              b()
            }),
            Oi(window, 'load', a))
      }).l(function (b) {
        Xi(window, 'load', a)
        throw b
      })
    },
    Nk = function () {
      return Mk()
        ? Lk().then(function () {
            return new E(function (a, b) {
              var c = p.document,
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
        : G(Error('Cordova must run in an Android or iOS file scheme.'))
    },
    Mk = function () {
      var a = xk()
      return !(
        ('file:' !== Ok() && 'ionic:' !== Ok()) ||
        !a.toLowerCase().match(/iphone|ipad|ipod|android/)
      )
    },
    Pk = function () {
      var a = p.window
      try {
        return !(!a || a == a.top)
      } catch (b) {
        return !1
      }
    },
    Qk = function () {
      return 'undefined' !== typeof p.WorkerGlobalScope && 'function' === typeof p.importScripts
    },
    Rk = function () {
      return firebase.INTERNAL.hasOwnProperty('reactNative')
        ? 'ReactNative'
        : firebase.INTERNAL.hasOwnProperty('node')
        ? 'Node'
        : Qk()
        ? 'Worker'
        : 'Browser'
    },
    Sk = function () {
      var a = Rk()
      return 'ReactNative' === a || 'Node' === a
    },
    Tk = function () {
      for (var a = 50, b = []; 0 < a; )
        b.push(
          '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(
            Math.floor(62 * Math.random())
          )
        ),
          a--
      return b.join('')
    },
    Ck = function (a) {
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
    Uk = { DEFAULT: 'FirebaseCore-web', Fm: 'FirebaseUI-web', Im: 'gcip-iap' },
    Vk = function (a, b, c) {
      c = c || []
      var d = [],
        e = {},
        f
      for (f in Uk) e[Uk[f]] = !0
      for (f = 0; f < c.length; f++)
        'undefined' !== typeof e[c[f]] && (delete e[c[f]], d.push(c[f]))
      d.sort()
      c = d
      c.length || (c = ['FirebaseCore-web'])
      d = Rk()
      return (
        ('Browser' === d ? Ck(xk()) : 'Worker' === d ? Ck(xk()) + '-' + d : d) +
        '/' +
        a +
        '/' +
        b +
        '/' +
        c.join(',')
      )
    },
    xk = function () {
      return (p.navigator && p.navigator.userAgent) || ''
    },
    N = function (a, b) {
      a = a.split('.')
      b = b || p
      var c
      for (c = 0; c < a.length && 'object' == typeof b && null != b; c++) b = b[a[c]]
      c != a.length && (b = void 0)
      return b
    },
    Xk = function () {
      try {
        var a = p.localStorage,
          b = Wk()
        if (a) return a.setItem(b, '1'), a.removeItem(b), yk() ? !!p.indexedDB : !0
      } catch (c) {
        return Qk() && !!p.indexedDB
      }
      return !1
    },
    Zk = function () {
      return (Yk() || 'chrome-extension:' === Ok() || Mk()) && !Sk() && Xk() && !Qk()
    },
    Yk = function () {
      return 'http:' === Ok() || 'https:' === Ok()
    },
    Ok = function () {
      return (p.location && p.location.protocol) || null
    },
    $k = function (a) {
      a = a || xk()
      return Ek(a) || 'Firefox' == Ck(a) ? !1 : !0
    },
    al = function (a) {
      return 'undefined' === typeof a ? null : JSON.stringify(a)
    },
    bl = function (a) {
      var b = {},
        c
      for (c in a) a.hasOwnProperty(c) && null !== a[c] && void 0 !== a[c] && (b[c] = a[c])
      return b
    },
    cl = function (a) {
      if (null !== a) return JSON.parse(a)
    },
    Wk = function (a) {
      return a ? a : '' + Math.floor(1e9 * Math.random()).toString()
    },
    dl = function (a) {
      a = a || xk()
      return 'Safari' == Ck(a) || a.toLowerCase().match(/iphone|ipad|ipod/) ? !1 : !0
    },
    el = function () {
      var a = p.___jsl
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
    fl = function (a, b) {
      if (a > b) throw Error('Short delay should be less than long delay!')
      this.Nj = a
      this.zl = b
      a = xk()
      b = Rk()
      this.tl = Ek(a) || 'ReactNative' === b
    }
  fl.prototype.get = function () {
    var a = p.navigator
    return (
      a &&
      'boolean' === typeof a.onLine &&
      (Yk() || 'chrome-extension:' === Ok() || 'undefined' !== typeof a.connection)
        ? a.onLine
        : 1
    )
      ? this.tl
        ? this.zl
        : this.Nj
      : Math.min(5e3, this.Nj)
  }
  var gl = function () {
      var a = p.document
      return a && 'undefined' !== typeof a.visibilityState ? 'visible' == a.visibilityState : !0
    },
    hl = function () {
      var a = p.document,
        b = null
      return gl() || !a
        ? F()
        : new E(function (c) {
            b = function () {
              gl() && (a.removeEventListener('visibilitychange', b, !1), c())
            }
            a.addEventListener('visibilitychange', b, !1)
          }).l(function (c) {
            a.removeEventListener('visibilitychange', b, !1)
            throw c
          })
    },
    il = function (a) {
      'undefined' !== typeof console && 'function' === typeof console.warn && console.warn(a)
    },
    jl = function (a) {
      try {
        var b = new Date(parseInt(a, 10))
        if (!isNaN(b.getTime()) && !/[^0-9]/.test(a)) return b.toUTCString()
      } catch (c) {}
      return null
    },
    kl = function () {
      return !(!N('fireauth.oauthhelper', p) && !N('fireauth.iframe', p))
    },
    ll = function () {
      var a = p.navigator
      return (a && a.serviceWorker && a.serviceWorker.controller) || null
    },
    ml = function () {
      var a = p.navigator
      return a && a.serviceWorker
        ? F()
            .then(function () {
              return a.serviceWorker.ready
            })
            .then(function (b) {
              return b.active || null
            })
            .l(function () {
              return null
            })
        : F(null)
    }
  var nl = {},
    ol = function (a) {
      nl[a] || ((nl[a] = !0), il(a))
    }
  var pl
  try {
    var ql = {}
    Object.defineProperty(ql, 'abcd', { configurable: !0, enumerable: !0, value: 1 })
    Object.defineProperty(ql, 'abcd', { configurable: !0, enumerable: !0, value: 2 })
    pl = 2 == ql.abcd
  } catch (a) {
    pl = !1
  }
  var O = function (a, b, c) {
      pl ? Object.defineProperty(a, b, { configurable: !0, enumerable: !0, value: c }) : (a[b] = c)
    },
    rl = function (a, b) {
      if (b) for (var c in b) b.hasOwnProperty(c) && O(a, c, b[c])
    },
    sl = function (a) {
      var b = {}
      rl(b, a)
      return b
    },
    tl = function (a, b) {
      if (!b || !b.length) return !0
      if (!a) return !1
      for (var c = 0; c < b.length; c++) {
        var d = a[b[c]]
        if (void 0 === d || null === d || '' === d) return !1
      }
      return !0
    },
    ul = function (a) {
      var b = a
      if ('object' == typeof a && null != a) {
        b = 'length' in a ? [] : {}
        for (var c in a) O(b, c, ul(a[c]))
      }
      return b
    }
  var vl =
      'oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version'.split(
        ' '
      ),
    wl = ['client_id', 'response_type', 'scope', 'redirect_uri', 'state'],
    xl = {
      Em: { le: 'locale', Dd: 700, Cd: 600, providerId: 'facebook.com', Jf: wl },
      Gm: { le: null, Dd: 500, Cd: 750, providerId: 'github.com', Jf: wl },
      Hm: { le: 'hl', Dd: 515, Cd: 680, providerId: 'google.com', Jf: wl },
      Mm: { le: 'lang', Dd: 485, Cd: 705, providerId: 'twitter.com', Jf: vl },
      Cm: { le: 'locale', Dd: 640, Cd: 600, providerId: 'apple.com', Jf: [] },
    },
    yl = function (a) {
      for (var b in xl) if (xl[b].providerId == a) return xl[b]
      return null
    }
  var P = function (a, b, c) {
    this.code = 'auth/' + a
    this.message = b || zl[a] || ''
    this.Fj = c || null
  }
  v(P, Error)
  P.prototype.T = function () {
    var a = { code: this.code, message: this.message }
    this.Fj && (a.serverResponse = this.Fj)
    return a
  }
  P.prototype.toJSON = function () {
    return this.T()
  }
  var Al = function (a) {
      var b = a && a.code
      return b ? new P(b.substring(5), a.message, a.serverResponse) : null
    },
    zl = {
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
  var Bl = function (a, b, c, d, e, f, g) {
    this.Rh = a
    this.Ja = b || null
    this.Od = c || null
    this.Ce = d || null
    this.kh = f || null
    this.ma = g || null
    this.Ab = e || null
    if (this.Od || this.Ab) {
      if (this.Od && this.Ab) throw new P('invalid-auth-event')
      if (this.Od && !this.Ce) throw new P('invalid-auth-event')
    } else throw new P('invalid-auth-event')
  }
  k = Bl.prototype
  k.getType = function () {
    return this.Rh
  }
  k.getUid = function () {
    var a = []
    a.push(this.Rh)
    this.Ja && a.push(this.Ja)
    this.Ce && a.push(this.Ce)
    this.ma && a.push(this.ma)
    return a.join('-')
  }
  k.fe = function () {
    return this.Ce
  }
  k.getError = function () {
    return this.Ab
  }
  k.T = function () {
    return {
      type: this.Rh,
      eventId: this.Ja,
      urlResponse: this.Od,
      sessionId: this.Ce,
      postBody: this.kh,
      tenantId: this.ma,
      error: this.Ab && this.Ab.T(),
    }
  }
  var Cl = function (a) {
    a = a || {}
    return a.type
      ? new Bl(
          a.type,
          a.eventId,
          a.urlResponse,
          a.sessionId,
          a.error && Al(a.error),
          a.postBody,
          a.tenantId
        )
      : null
  }
  var Dl = function (a) {
    var b = a && (a.phoneInfo ? 'phone' : null)
    if (b && a && a.mfaEnrollmentId) {
      O(this, 'uid', a.mfaEnrollmentId)
      O(this, 'displayName', a.displayName || null)
      var c = null
      a.enrolledAt && (c = new Date(a.enrolledAt).toUTCString())
      O(this, 'enrollmentTime', c)
      O(this, 'factorId', b)
    } else throw new P('internal-error', 'Internal assert: invalid MultiFactorInfo object')
  }
  Dl.prototype.T = function () {
    return {
      uid: this.uid,
      displayName: this.displayName,
      factorId: this.factorId,
      enrollmentTime: this.enrollmentTime,
    }
  }
  var Fl = function (a) {
      try {
        var b = new El(a)
      } catch (c) {
        b = null
      }
      return b
    },
    El = function (a) {
      Dl.call(this, a)
      O(this, 'phoneNumber', a.phoneInfo)
    }
  v(El, Dl)
  El.prototype.T = function () {
    var a = El.Wc.T.call(this)
    a.phoneNumber = this.phoneNumber
    return a
  }
  var Gl = function (a) {
    var b = {},
      c = a.email,
      d = a.newEmail,
      e = a.requestType
    a = Fl(a.mfaInfo)
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
    O(this, 'operation', e)
    O(this, 'data', ul(b))
  }
  var Il = function (a) {
      a = M(a)
      var b = ok(a, 'apiKey') || null,
        c = ok(a, 'oobCode') || null,
        d = ok(a, 'mode') || null
      d = d ? Hl[d] || null : null
      if (!b || !c || !d)
        throw new P(
          'argument-error',
          'apiKey, oobCodeand mode are required in a valid action code URL.'
        )
      rl(this, {
        apiKey: b,
        operation: d,
        code: c,
        continueUrl: ok(a, 'continueUrl') || null,
        languageCode: ok(a, 'languageCode') || null,
        tenantId: ok(a, 'tenantId') || null,
      })
    },
    Jl = function (a) {
      try {
        return new Il(a)
      } catch (b) {
        return null
      }
    },
    Hl = {
      recoverEmail: 'RECOVER_EMAIL',
      resetPassword: 'PASSWORD_RESET',
      revertSecondFactorAddition: 'REVERT_SECOND_FACTOR_ADDITION',
      signIn: 'EMAIL_SIGNIN',
      verifyAndChangeEmail: 'VERIFY_AND_CHANGE_EMAIL',
      verifyEmail: 'VERIFY_EMAIL',
    }
  var Kl = function (a) {
    var b = M(a),
      c = ok(b, 'link'),
      d = ok(M(c), 'link')
    b = ok(b, 'deep_link_id')
    return ok(M(b), 'link') || b || d || c || a
  }
  var Ll = function (a) {
    var b = 'unauthorized-domain',
      c = void 0,
      d = M(a)
    a = d.Ga
    d = d.Va
    'chrome-extension' == d
      ? (c = Pc(
          'This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.',
          a
        ))
      : 'http' == d || 'https' == d
      ? (c = Pc(
          'This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.',
          a
        ))
      : (b = 'operation-not-supported-in-this-environment')
    P.call(this, b, c)
  }
  n(Ll, P)
  var Nl = function (a) {
    var b = Ml(a)
    if (!(b && b.sub && b.iss && b.aud && b.exp)) throw Error('Invalid JWT')
    this.vl = a
    this.Eg = b.exp
    this.xl = b.sub
    a = Date.now() / 1e3
    this.kl = b.iat || (a > this.Eg ? this.Eg : a)
    this.Ic = b.email || null
    this.rh = b.provider_id || (b.firebase && b.firebase.sign_in_provider) || null
    this.ma = (b.firebase && b.firebase.tenant) || null
    this.mk = !!b.is_anonymous || 'anonymous' == this.rh
  }
  Nl.prototype.getEmail = function () {
    return this.Ic
  }
  Nl.prototype.isAnonymous = function () {
    return this.mk
  }
  Nl.prototype.toString = function () {
    return this.vl
  }
  var Ol = function (a) {
      try {
        return new Nl(a)
      } catch (b) {
        return null
      }
    },
    Ml = function (a) {
      if (!a) return null
      a = a.split('.')
      if (3 != a.length) return null
      a = a[1]
      for (var b = (4 - (a.length % 4)) % 4, c = 0; c < b; c++) a += '.'
      try {
        var d = oi(a)
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
              l = (((e & 7) << 18) | ((f & 63) << 12) | ((g & 63) << 6) | (h & 63)) - 65536
            a[c++] = String.fromCharCode(55296 + (l >> 10))
            a[c++] = String.fromCharCode(56320 + (l & 1023))
          } else
            (f = d[b++]),
              (g = d[b++]),
              (a[c++] = String.fromCharCode(((e & 15) << 12) | ((f & 63) << 6) | (g & 63)))
        }
        return JSON.parse(a.join(''))
      } catch (m) {}
      return null
    }
  var Pl = function (a) {
    var b = Ml(a)
    if (!(b && b.exp && b.auth_time && b.iat))
      throw new P(
        'internal-error',
        'An internal error occurred. The token obtained by Firebase appears to be malformed. Please retry the operation.'
      )
    rl(this, {
      token: a,
      expirationTime: jl(1e3 * b.exp),
      authTime: jl(1e3 * b.auth_time),
      issuedAtTime: jl(1e3 * b.iat),
      signInProvider:
        b.firebase && b.firebase.sign_in_provider ? b.firebase.sign_in_provider : null,
      signInSecondFactor:
        b.firebase && b.firebase.sign_in_second_factor ? b.firebase.sign_in_second_factor : null,
      claims: b,
    })
  }
  var Ql = function (a, b) {
    if (!a && !b) throw new P('internal-error', 'Internal assert: no raw session string available')
    if (a && b)
      throw new P('internal-error', 'Internal assert: unable to determine the session type')
    this.jf = a || null
    this.fj = b || null
    this.type = this.jf ? 'enroll' : 'signin'
  }
  Ql.prototype.ee = function () {
    return this.jf ? F(this.jf) : F(this.fj)
  }
  Ql.prototype.T = function () {
    return 'enroll' == this.type
      ? { multiFactorSession: { idToken: this.jf } }
      : { multiFactorSession: { pendingCredential: this.fj } }
  }
  var Rl = function () {}
  Rl.prototype.Lc = function () {}
  Rl.prototype.yd = function () {}
  Rl.prototype.oe = function () {}
  Rl.prototype.T = function () {}
  var Sl = function (a, b) {
      return a
        .then(function (c) {
          if (c.idToken) {
            var d = Ol(c.idToken)
            if (!d || b != d.xl) throw new P('user-mismatch')
            return c
          }
          throw new P('user-mismatch')
        })
        .l(function (c) {
          throw c && c.code && 'auth/user-not-found' == c.code ? new P('user-mismatch') : c
        })
    },
    Tl = function (a, b) {
      if (b) this.Yb = b
      else throw new P('internal-error', 'failed to construct a credential')
      O(this, 'providerId', a)
      O(this, 'signInMethod', a)
    }
  k = Tl.prototype
  k.Lc = function (a) {
    return Ul(a, this.Pc())
  }
  k.yd = function (a, b) {
    var c = this.Pc()
    c.idToken = b
    return Vl(a, c)
  }
  k.oe = function (a, b) {
    var c = this.Pc()
    return Sl(Wl(a, c), b)
  }
  k.Pc = function () {
    return { pendingToken: this.Yb, requestUri: 'http://localhost' }
  }
  k.T = function () {
    return { providerId: this.providerId, signInMethod: this.signInMethod, pendingToken: this.Yb }
  }
  var Xl = function (a) {
      if (
        a &&
        a.providerId &&
        a.signInMethod &&
        0 == a.providerId.indexOf('saml.') &&
        a.pendingToken
      )
        try {
          return new Tl(a.providerId, a.pendingToken)
        } catch (b) {}
      return null
    },
    Yl = function (a, b, c) {
      this.Yb = null
      if (b.idToken || b.accessToken)
        b.idToken && O(this, 'idToken', b.idToken),
          b.accessToken && O(this, 'accessToken', b.accessToken),
          b.nonce && !b.pendingToken && O(this, 'nonce', b.nonce),
          b.pendingToken && (this.Yb = b.pendingToken)
      else if (b.oauthToken && b.oauthTokenSecret)
        O(this, 'accessToken', b.oauthToken), O(this, 'secret', b.oauthTokenSecret)
      else throw new P('internal-error', 'failed to construct a credential')
      O(this, 'providerId', a)
      O(this, 'signInMethod', c)
    }
  k = Yl.prototype
  k.Lc = function (a) {
    return Ul(a, this.Pc())
  }
  k.yd = function (a, b) {
    var c = this.Pc()
    c.idToken = b
    return Vl(a, c)
  }
  k.oe = function (a, b) {
    var c = this.Pc()
    return Sl(Wl(a, c), b)
  }
  k.Pc = function () {
    var a = {}
    this.idToken && (a.id_token = this.idToken)
    this.accessToken && (a.access_token = this.accessToken)
    this.secret && (a.oauth_token_secret = this.secret)
    a.providerId = this.providerId
    this.nonce && !this.Yb && (a.nonce = this.nonce)
    a = { postBody: sk(a).toString(), requestUri: 'http://localhost' }
    this.Yb && (delete a.postBody, (a.pendingToken = this.Yb))
    return a
  }
  k.T = function () {
    var a = { providerId: this.providerId, signInMethod: this.signInMethod }
    this.idToken && (a.oauthIdToken = this.idToken)
    this.accessToken && (a.oauthAccessToken = this.accessToken)
    this.secret && (a.oauthTokenSecret = this.secret)
    this.nonce && (a.nonce = this.nonce)
    this.Yb && (a.pendingToken = this.Yb)
    return a
  }
  var Zl = function (a) {
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
          return new Yl(a.providerId, b, a.signInMethod)
        } catch (c) {}
      }
      return null
    },
    $l = function (a, b) {
      this.Rl = b || []
      rl(this, { providerId: a, isOAuthProvider: !0 })
      this.li = {}
      this.Tg = (yl(a) || {}).le || null
      this.yg = null
    }
  $l.prototype.setCustomParameters = function (a) {
    this.li = Ya(a)
    return this
  }
  var am = function (a) {
    if ('string' !== typeof a || 0 != a.indexOf('saml.'))
      throw new P('argument-error', 'SAML provider IDs must be prefixed with "saml."')
    $l.call(this, a, [])
  }
  v(am, $l)
  var bm = function (a) {
    $l.call(this, a, wl)
    this.Bh = []
  }
  v(bm, $l)
  bm.prototype.addScope = function (a) {
    Oa(this.Bh, a) || this.Bh.push(a)
    return this
  }
  bm.prototype.Ei = function () {
    return Sa(this.Bh)
  }
  bm.prototype.credential = function (a, b) {
    a = t(a)
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
    return new Yl(this.providerId, a, this.providerId)
  }
  var cm = function () {
    bm.call(this, 'facebook.com')
  }
  v(cm, bm)
  O(cm, 'PROVIDER_ID', 'facebook.com')
  O(cm, 'FACEBOOK_SIGN_IN_METHOD', 'facebook.com')
  var dm = function (a) {
      if (!a)
        throw new P(
          'argument-error',
          'credential failed: expected 1 argument (the OAuth access token).'
        )
      var b = a
      t(a) && (b = a.accessToken)
      return new cm().credential({ accessToken: b })
    },
    em = function () {
      bm.call(this, 'github.com')
    }
  v(em, bm)
  O(em, 'PROVIDER_ID', 'github.com')
  O(em, 'GITHUB_SIGN_IN_METHOD', 'github.com')
  var fm = function (a) {
      if (!a)
        throw new P(
          'argument-error',
          'credential failed: expected 1 argument (the OAuth access token).'
        )
      var b = a
      t(a) && (b = a.accessToken)
      return new em().credential({ accessToken: b })
    },
    gm = function () {
      bm.call(this, 'google.com')
      this.addScope('profile')
    }
  v(gm, bm)
  O(gm, 'PROVIDER_ID', 'google.com')
  O(gm, 'GOOGLE_SIGN_IN_METHOD', 'google.com')
  var hm = function (a, b) {
      var c = a
      t(a) && ((c = a.idToken), (b = a.accessToken))
      return new gm().credential({ idToken: c, accessToken: b })
    },
    im = function () {
      $l.call(this, 'twitter.com', vl)
    }
  v(im, $l)
  O(im, 'PROVIDER_ID', 'twitter.com')
  O(im, 'TWITTER_SIGN_IN_METHOD', 'twitter.com')
  var jm = function (a, b) {
      var c = a
      t(c) || (c = { oauthToken: a, oauthTokenSecret: b })
      if (!c.oauthToken || !c.oauthTokenSecret)
        throw new P(
          'argument-error',
          'credential failed: expected 2 arguments (the OAuth access token and secret).'
        )
      return new Yl('twitter.com', c, 'twitter.com')
    },
    lm = function (a, b, c) {
      this.Ic = a
      this.qe = b
      O(this, 'providerId', 'password')
      O(
        this,
        'signInMethod',
        c === km.EMAIL_LINK_SIGN_IN_METHOD
          ? km.EMAIL_LINK_SIGN_IN_METHOD
          : km.EMAIL_PASSWORD_SIGN_IN_METHOD
      )
    }
  lm.prototype.Lc = function (a) {
    return this.signInMethod == km.EMAIL_LINK_SIGN_IN_METHOD
      ? Q(a, mm, { email: this.Ic, oobCode: this.qe })
      : Q(a, nm, { email: this.Ic, password: this.qe })
  }
  lm.prototype.yd = function (a, b) {
    return this.signInMethod == km.EMAIL_LINK_SIGN_IN_METHOD
      ? Q(a, om, { idToken: b, email: this.Ic, oobCode: this.qe })
      : Q(a, pm, { idToken: b, email: this.Ic, password: this.qe })
  }
  lm.prototype.oe = function (a, b) {
    return Sl(this.Lc(a), b)
  }
  lm.prototype.T = function () {
    return { email: this.Ic, password: this.qe, signInMethod: this.signInMethod }
  }
  var qm = function (a) {
      return a && a.email && a.password ? new lm(a.email, a.password, a.signInMethod) : null
    },
    km = function () {
      rl(this, { providerId: 'password', isOAuthProvider: !1 })
    },
    sm = function (a, b) {
      b = rm(b)
      if (!b) throw new P('argument-error', 'Invalid email link!')
      return new lm(a, b.code, km.EMAIL_LINK_SIGN_IN_METHOD)
    },
    rm = function (a) {
      a = Kl(a)
      return (a = Jl(a)) && 'EMAIL_SIGNIN' === a.operation ? a : null
    }
  rl(km, { PROVIDER_ID: 'password' })
  rl(km, { EMAIL_LINK_SIGN_IN_METHOD: 'emailLink' })
  rl(km, { EMAIL_PASSWORD_SIGN_IN_METHOD: 'password' })
  var tm = function (a) {
    if (!((a.verificationId && a.Zf) || (a.He && a.phoneNumber))) throw new P('internal-error')
    this.wa = a
    O(this, 'providerId', 'phone')
    this.providerId = 'phone'
    O(this, 'signInMethod', 'phone')
  }
  tm.prototype.Lc = function (a) {
    return a.verifyPhoneNumber(um(this))
  }
  tm.prototype.yd = function (a, b) {
    var c = um(this)
    c.idToken = b
    return Q(a, vm, c)
  }
  tm.prototype.oe = function (a, b) {
    var c = um(this)
    c.operation = 'REAUTH'
    a = Q(a, wm, c)
    return Sl(a, b)
  }
  tm.prototype.T = function () {
    var a = { providerId: 'phone' }
    this.wa.verificationId && (a.verificationId = this.wa.verificationId)
    this.wa.Zf && (a.verificationCode = this.wa.Zf)
    this.wa.He && (a.temporaryProof = this.wa.He)
    this.wa.phoneNumber && (a.phoneNumber = this.wa.phoneNumber)
    return a
  }
  var xm = function (a) {
      if (
        a &&
        'phone' === a.providerId &&
        ((a.verificationId && a.verificationCode) || (a.temporaryProof && a.phoneNumber))
      ) {
        var b = {}
        y(['verificationId', 'verificationCode', 'temporaryProof', 'phoneNumber'], function (c) {
          a[c] && (b[c] = a[c])
        })
        return new tm(b)
      }
      return null
    },
    um = function (a) {
      return a.wa.He && a.wa.phoneNumber
        ? { temporaryProof: a.wa.He, phoneNumber: a.wa.phoneNumber }
        : { sessionInfo: a.wa.verificationId, code: a.wa.Zf }
    },
    ym = function (a) {
      try {
        this.Qe = a || firebase.auth()
      } catch (b) {
        throw new P(
          'argument-error',
          'Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp().'
        )
      }
      rl(this, { providerId: 'phone', isOAuthProvider: !1 })
    }
  ym.prototype.verifyPhoneNumber = function (a, b) {
    var c = this.Qe.o
    return F(b.verify()).then(function (d) {
      if ('string' !== typeof d)
        throw new P(
          'argument-error',
          'An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string.'
        )
      switch (b.type) {
        case 'recaptcha':
          var e = t(a) ? a.session : null,
            f = t(a) ? a.phoneNumber : a
          return (
            e && 'enroll' == e.type
              ? e.ee().then(function (g) {
                  return zm(c, {
                    idToken: g,
                    phoneEnrollmentInfo: { phoneNumber: f, recaptchaToken: d },
                  })
                })
              : e && 'signin' == e.type
              ? e.ee().then(function (g) {
                  return Am(c, {
                    mfaPendingCredential: g,
                    mfaEnrollmentId:
                      (a.multiFactorHint && a.multiFactorHint.uid) || a.multiFactorUid,
                    phoneSignInInfo: { recaptchaToken: d },
                  })
                })
              : Bm(c, { phoneNumber: f, recaptchaToken: d })
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
  var Cm = function (a, b) {
    if (!a) throw new P('missing-verification-id')
    if (!b) throw new P('missing-verification-code')
    return new tm({ verificationId: a, Zf: b })
  }
  rl(ym, { PROVIDER_ID: 'phone' })
  rl(ym, { PHONE_SIGN_IN_METHOD: 'phone' })
  var Dm = function (a) {
      if (a.temporaryProof && a.phoneNumber)
        return new tm({ He: a.temporaryProof, phoneNumber: a.phoneNumber })
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
            return hm(f, c)
          case 'facebook.com':
            return dm(c)
          case 'github.com':
            return fm(c)
          case 'twitter.com':
            return jm(c, d)
          default:
            return c || d || f || g
              ? g
                ? 0 == b.indexOf('saml.')
                  ? new Tl(b, g)
                  : new Yl(
                      b,
                      { pendingToken: g, idToken: a.oauthIdToken, accessToken: a.oauthAccessToken },
                      b
                    )
                : new bm(b).credential({ idToken: f, accessToken: c, rawNonce: e })
              : null
        }
      } catch (h) {
        return null
      }
    },
    Em = function (a) {
      if (!a.isOAuthProvider) throw new P('invalid-oauth-provider')
    }
  var Fm = function (a, b, c) {
    P.call(this, a, c)
    a = b || {}
    a.email && O(this, 'email', a.email)
    a.phoneNumber && O(this, 'phoneNumber', a.phoneNumber)
    a.credential && O(this, 'credential', a.credential)
    a.tenantId && O(this, 'tenantId', a.tenantId)
  }
  n(Fm, P)
  Fm.prototype.T = function () {
    var a = { code: this.code, message: this.message }
    this.email && (a.email = this.email)
    this.phoneNumber && (a.phoneNumber = this.phoneNumber)
    this.tenantId && (a.tenantId = this.tenantId)
    var b = this.credential && this.credential.T()
    b && $a(a, b)
    return a
  }
  Fm.prototype.toJSON = function () {
    return this.T()
  }
  var Gm = function (a) {
    if (a.code) {
      var b = a.code || ''
      0 == b.indexOf('auth/') && (b = b.substring(5))
      var c = { credential: Dm(a), tenantId: a.tenantId }
      if (a.email) c.email = a.email
      else if (a.phoneNumber) c.phoneNumber = a.phoneNumber
      else if (!c.credential) return new P(b, a.message || void 0)
      return new Fm(b, c, a.message)
    }
    return null
  }
  var Hm = function (a) {
    this.Bm = a
  }
  n(Hm, cj)
  Hm.prototype.Vd = function () {
    return new this.Bm()
  }
  Hm.prototype.rf = function () {
    return {}
  }
  var Mm = function (a, b, c) {
      this.ha = a
      b = b || {}
      this.Ej = b.secureTokenEndpoint || 'https://securetoken.googleapis.com/v1/token'
      this.im = b.secureTokenTimeout || Im
      this.Pf = Ya(b.secureTokenHeaders || Jm)
      this.yi = b.firebaseEndpoint || 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
      this.Ni = b.identityPlatformEndpoint || 'https://identitytoolkit.googleapis.com/v2/'
      this.Kk = b.firebaseTimeout || Km
      this.nd = Ya(b.firebaseHeaders || Lm)
      c && ((this.nd['X-Client-Version'] = c), (this.Pf['X-Client-Version'] = c))
      a = 'Node' == Rk()
      a = p.XMLHttpRequest || (a && firebase.INTERNAL.node && firebase.INTERNAL.node.XMLHttpRequest)
      if (!a && !Qk())
        throw new P('internal-error', 'The XMLHttpRequest compatibility library was not found.')
      this.Nf = void 0
      Qk() ? (this.Nf = new jj({ Am: self })) : Sk() ? (this.Nf = new Hm(a)) : (this.Nf = new gj())
      this.ma = null
    },
    Nm,
    Om = function (a, b) {
      b ? (a.nd['X-Firebase-Locale'] = b) : delete a.nd['X-Firebase-Locale']
    },
    Qm = function (a, b) {
      b &&
        ((a.Ej = Pm('https://securetoken.googleapis.com/v1/token', b)),
        (a.yi = Pm('https://www.googleapis.com/identitytoolkit/v3/relyingparty/', b)),
        (a.Ni = Pm('https://identitytoolkit.googleapis.com/v2/', b)))
    },
    Pm = function (a, b) {
      a = M(a)
      b = M(b.url)
      a.setPath(a.Ga + a.getPath())
      bk(a, b.Va)
      dk(a, b.Ga)
      ek(a, b.Ub)
      return a.toString()
    },
    Rm = function (a, b) {
      b
        ? ((a.nd['X-Client-Version'] = b), (a.Pf['X-Client-Version'] = b))
        : (delete a.nd['X-Client-Version'], delete a.Pf['X-Client-Version'])
    },
    Tm = function (a, b, c, d, e, f, g) {
      Dk() || Qk()
        ? (a = u(a.km, a))
        : (Nm ||
            (Nm = new E(function (h, l) {
              Sm(h, l)
            })),
          (a = u(a.jm, a)))
      a(b, c, d, e, f, g)
    }
  Mm.prototype.km = function (a, b, c, d, e, f) {
    if (
      Qk() &&
      ('undefined' === typeof p.fetch ||
        'undefined' === typeof p.Headers ||
        'undefined' === typeof p.Request)
    )
      throw new P(
        'operation-not-supported-in-this-environment',
        'fetch, Headers and Request native APIs or equivalent Polyfills must be available to support HTTP requests from a Worker environment.'
      )
    var g = new Mj(this.Nf)
    if (f) {
      g.Md = Math.max(0, f)
      var h = setTimeout(function () {
        g.dispatchEvent('timeout')
      }, f)
    }
    g.listen('complete', function () {
      h && clearTimeout(h)
      var l = null
      try {
        var m = JSON,
          q = m.parse
        try {
          var x = this.u ? this.u.responseText : ''
        } catch (z) {
          lc(this.Ea, 'Can not get responseText: ' + z.message), (x = '')
        }
        l = q.call(m, x) || null
      } catch (z) {
        l = null
      }
      b && b(l)
    })
    Wi(g, 'ready', function () {
      h && clearTimeout(h)
      this.Hc()
    })
    Wi(g, 'timeout', function () {
      h && clearTimeout(h)
      this.Hc()
      b && b(null)
    })
    g.send(a, c, d, e)
  }
  var Sm = function (a, b) {
    if (((window.gapi || {}).client || {}).request) a()
    else {
      p[Um] = function () {
        ;((window.gapi || {}).client || {}).request ? a() : b(Error('CORS_UNSUPPORTED'))
      }
      var c = sb(Vm, { onload: Um })
      yj(Hj(c), function () {
        b(Error('CORS_UNSUPPORTED'))
      })
    }
  }
  Mm.prototype.jm = function (a, b, c, d, e) {
    var f = this
    Nm.then(function () {
      window.gapi.client.setApiKey(f.ha)
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
    }).l(function (g) {
      b && b({ error: { message: (g && g.message) || 'CORS_UNSUPPORTED' } })
    })
  }
  var Xm = function (a, b) {
      return new E(function (c, d) {
        ;('refresh_token' == b.grant_type && b.refresh_token) ||
        ('authorization_code' == b.grant_type && b.code)
          ? Tm(
              a,
              a.Ej + '?key=' + encodeURIComponent(a.ha),
              function (e) {
                e
                  ? e.error
                    ? d(Wm(e))
                    : e.access_token && e.refresh_token
                    ? c(e)
                    : d(new P('internal-error'))
                  : d(new P('network-request-failed'))
              },
              'POST',
              sk(b).toString(),
              a.Pf,
              a.im.get()
            )
          : d(new P('internal-error'))
      })
    },
    Ym = function (a, b, c, d, e, f, g) {
      var h = M(b + c)
      L(h, 'key', a.ha)
      g && L(h, 'cb', Date.now().toString())
      var l = 'GET' == d
      if (l) for (var m in e) e.hasOwnProperty(m) && L(h, m, e[m])
      return new E(function (q, x) {
        Tm(
          a,
          h.toString(),
          function (z) {
            z ? (z.error ? x(Wm(z, f || {})) : q(z)) : x(new P('network-request-failed'))
          },
          d,
          l ? void 0 : JSON.stringify(bl(e)),
          a.nd,
          a.Kk.get()
        )
      })
    },
    Zm = function (a) {
      a = a.email
      if ('string' !== typeof a || !Kk.test(a)) throw new P('invalid-email')
    },
    $m = function (a) {
      'email' in a && Zm(a)
    },
    bn = function (a, b) {
      return Q(a, an, { identifier: b, continueUri: Yk() ? zk() : 'http://localhost' }).then(
        function (c) {
          return c.signinMethods || []
        }
      )
    },
    dn = function (a) {
      return Q(a, cn, {}).then(function (b) {
        return b.authorizedDomains || []
      })
    },
    en = function (a) {
      if (!a.idToken) {
        if (a.mfaPendingCredential) throw new P('multi-factor-auth-required', null, Ya(a))
        throw new P('internal-error')
      }
    },
    fn = function (a) {
      if (a.phoneNumber || a.temporaryProof) {
        if (!a.phoneNumber || !a.temporaryProof) throw new P('internal-error')
      } else {
        if (!a.sessionInfo) throw new P('missing-verification-id')
        if (!a.code) throw new P('missing-verification-code')
      }
    }
  k = Mm.prototype
  k.signInAnonymously = function () {
    return Q(this, gn, {})
  }
  k.updateEmail = function (a, b) {
    return Q(this, hn, { idToken: a, email: b })
  }
  k.updatePassword = function (a, b) {
    return Q(this, pm, { idToken: a, password: b })
  }
  k.updateProfile = function (a, b) {
    var c = { idToken: a },
      d = []
    Va(jn, function (e, f) {
      var g = b[f]
      null === g ? d.push(e) : f in b && (c[f] = g)
    })
    d.length && (c.deleteAttribute = d)
    return Q(this, hn, c)
  }
  k.sendPasswordResetEmail = function (a, b) {
    a = { requestType: 'PASSWORD_RESET', email: a }
    $a(a, b)
    return Q(this, kn, a)
  }
  k.sendSignInLinkToEmail = function (a, b) {
    a = { requestType: 'EMAIL_SIGNIN', email: a }
    $a(a, b)
    return Q(this, ln, a)
  }
  k.sendEmailVerification = function (a, b) {
    a = { requestType: 'VERIFY_EMAIL', idToken: a }
    $a(a, b)
    return Q(this, mn, a)
  }
  k.verifyBeforeUpdateEmail = function (a, b, c) {
    a = { requestType: 'VERIFY_AND_CHANGE_EMAIL', idToken: a, newEmail: b }
    $a(a, c)
    return Q(this, nn, a)
  }
  var Bm = function (a, b) {
    return Q(a, on, b)
  }
  Mm.prototype.verifyPhoneNumber = function (a) {
    return Q(this, pn, a)
  }
  var zm = function (a, b) {
      return Q(a, qn, b).then(function (c) {
        return c.phoneSessionInfo.sessionInfo
      })
    },
    rn = function (a) {
      if (!a.phoneVerificationInfo) throw new P('internal-error')
      if (!a.phoneVerificationInfo.sessionInfo) throw new P('missing-verification-id')
      if (!a.phoneVerificationInfo.code) throw new P('missing-verification-code')
    },
    Am = function (a, b) {
      return Q(a, sn, b).then(function (c) {
        return c.phoneResponseInfo.sessionInfo
      })
    },
    un = function (a, b, c) {
      return Q(a, tn, { idToken: b, deleteProvider: c })
    },
    vn = function (a) {
      if (!a.requestUri || (!a.sessionId && !a.postBody && !a.pendingToken))
        throw new P('internal-error')
    },
    wn = function (a, b) {
      b.oauthIdToken &&
        b.providerId &&
        0 == b.providerId.indexOf('oidc.') &&
        !b.pendingToken &&
        (a.sessionId
          ? (b.nonce = a.sessionId)
          : a.postBody && ((a = new hk(a.postBody)), tk(a, 'nonce') && (b.nonce = a.get('nonce'))))
      return b
    },
    yn = function (a) {
      var b = null
      a.needConfirmation
        ? ((a.code = 'account-exists-with-different-credential'), (b = Gm(a)))
        : 'FEDERATED_USER_ID_ALREADY_LINKED' == a.errorMessage
        ? ((a.code = 'credential-already-in-use'), (b = Gm(a)))
        : 'EMAIL_EXISTS' == a.errorMessage
        ? ((a.code = 'email-already-in-use'), (b = Gm(a)))
        : a.errorMessage && (b = xn(a.errorMessage))
      if (b) throw b
      en(a)
    },
    Ul = function (a, b) {
      b.returnIdpCredential = !0
      return Q(a, zn, b)
    },
    Vl = function (a, b) {
      b.returnIdpCredential = !0
      return Q(a, An, b)
    },
    Wl = function (a, b) {
      b.returnIdpCredential = !0
      b.autoCreate = !1
      return Q(a, Bn, b)
    },
    Cn = function (a) {
      if (!a.oobCode) throw new P('invalid-action-code')
    }
  Mm.prototype.confirmPasswordReset = function (a, b) {
    return Q(this, Dn, { oobCode: a, newPassword: b })
  }
  Mm.prototype.checkActionCode = function (a) {
    return Q(this, En, { oobCode: a })
  }
  Mm.prototype.applyActionCode = function (a) {
    return Q(this, Fn, { oobCode: a })
  }
  var Q = function (a, b, c) {
      if (!tl(c, b.Ma)) return G(new P('internal-error'))
      var d = !!b.Le,
        e = b.httpMethod || 'POST',
        f
      return F(c)
        .then(b.oa)
        .then(function () {
          b.Nb && (c.returnSecureToken = !0)
          b.ta && a.ma && 'undefined' === typeof c.tenantId && (c.tenantId = a.ma)
          return d
            ? Ym(a, a.Ni, b.endpoint, e, c, b.ki, b.qg || !1)
            : Ym(a, a.yi, b.endpoint, e, c, b.ki, b.qg || !1)
        })
        .then(function (g) {
          f = g
          return b.Kf ? b.Kf(c, f) : f
        })
        .then(b.Aa)
        .then(function () {
          if (!b.ac) return f
          if (!(b.ac in f)) throw new P('internal-error')
          return f[b.ac]
        })
    },
    xn = function (a) {
      return Wm({ error: { errors: [{ message: a }], code: 400, reason: a } })
    },
    Wm = function (a, b) {
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
      $a(d, b)
      b = (b = c.match(/^[^\s]+\s*:\s*([\s\S]*)$/)) && 1 < b.length ? b[1] : void 0
      for (var e in d) if (0 === c.indexOf(e)) return new P(d[e], b)
      !b && a && (b = al(a))
      return new P('internal-error', b)
    },
    Im = new fl(3e4, 6e4),
    Jm = { 'Content-Type': 'application/x-www-form-urlencoded' },
    Km = new fl(3e4, 6e4),
    Lm = { 'Content-Type': 'application/json' },
    Vm = new kb(ib, 'https://apis.google.com/js/client.js?onload=%{onload}'),
    Um = '__fcb' + Math.floor(1e6 * Math.random()).toString(),
    jn = { displayName: 'DISPLAY_NAME', photoUrl: 'PHOTO_URL' },
    Fn = { endpoint: 'setAccountInfo', oa: Cn, ac: 'email', ta: !0 },
    En = {
      endpoint: 'resetPassword',
      oa: Cn,
      Aa: function (a) {
        var b = a.requestType
        if (!b || (!a.email && 'EMAIL_SIGNIN' != b && 'VERIFY_AND_CHANGE_EMAIL' != b))
          throw new P('internal-error')
      },
      ta: !0,
    },
    Gn = {
      endpoint: 'signupNewUser',
      oa: function (a) {
        Zm(a)
        if (!a.password) throw new P('weak-password')
      },
      Aa: en,
      Nb: !0,
      ta: !0,
    },
    an = { endpoint: 'createAuthUri', ta: !0 },
    Hn = { endpoint: 'deleteAccount', Ma: ['idToken'] },
    tn = {
      endpoint: 'setAccountInfo',
      Ma: ['idToken', 'deleteProvider'],
      oa: function (a) {
        if (!Array.isArray(a.deleteProvider)) throw new P('internal-error')
      },
    },
    mm = { endpoint: 'emailLinkSignin', Ma: ['email', 'oobCode'], oa: Zm, Aa: en, Nb: !0, ta: !0 },
    om = {
      endpoint: 'emailLinkSignin',
      Ma: ['idToken', 'email', 'oobCode'],
      oa: Zm,
      Aa: en,
      Nb: !0,
    },
    In = {
      endpoint: 'accounts/mfaEnrollment:finalize',
      Ma: ['idToken', 'phoneVerificationInfo'],
      oa: rn,
      Aa: en,
      ta: !0,
      Le: !0,
    },
    Jn = {
      endpoint: 'accounts/mfaSignIn:finalize',
      Ma: ['mfaPendingCredential', 'phoneVerificationInfo'],
      oa: rn,
      Aa: en,
      ta: !0,
      Le: !0,
    },
    Kn = { endpoint: 'getAccountInfo' },
    ln = {
      endpoint: 'getOobConfirmationCode',
      Ma: ['requestType'],
      oa: function (a) {
        if ('EMAIL_SIGNIN' != a.requestType) throw new P('internal-error')
        Zm(a)
      },
      ac: 'email',
      ta: !0,
    },
    mn = {
      endpoint: 'getOobConfirmationCode',
      Ma: ['idToken', 'requestType'],
      oa: function (a) {
        if ('VERIFY_EMAIL' != a.requestType) throw new P('internal-error')
      },
      ac: 'email',
      ta: !0,
    },
    nn = {
      endpoint: 'getOobConfirmationCode',
      Ma: ['idToken', 'newEmail', 'requestType'],
      oa: function (a) {
        if ('VERIFY_AND_CHANGE_EMAIL' != a.requestType) throw new P('internal-error')
      },
      ac: 'email',
      ta: !0,
    },
    kn = {
      endpoint: 'getOobConfirmationCode',
      Ma: ['requestType'],
      oa: function (a) {
        if ('PASSWORD_RESET' != a.requestType) throw new P('internal-error')
        Zm(a)
      },
      ac: 'email',
      ta: !0,
    },
    cn = { qg: !0, endpoint: 'getProjectConfig', httpMethod: 'GET' },
    Ln = {
      qg: !0,
      endpoint: 'getRecaptchaParam',
      httpMethod: 'GET',
      Aa: function (a) {
        if (!a.recaptchaSiteKey) throw new P('internal-error')
      },
    },
    Dn = { endpoint: 'resetPassword', oa: Cn, ac: 'email', ta: !0 },
    on = {
      endpoint: 'sendVerificationCode',
      Ma: ['phoneNumber', 'recaptchaToken'],
      ac: 'sessionInfo',
      ta: !0,
    },
    hn = { endpoint: 'setAccountInfo', Ma: ['idToken'], oa: $m, Nb: !0 },
    pm = {
      endpoint: 'setAccountInfo',
      Ma: ['idToken'],
      oa: function (a) {
        $m(a)
        if (!a.password) throw new P('weak-password')
      },
      Aa: en,
      Nb: !0,
    },
    gn = { endpoint: 'signupNewUser', Aa: en, Nb: !0, ta: !0 },
    qn = {
      endpoint: 'accounts/mfaEnrollment:start',
      Ma: ['idToken', 'phoneEnrollmentInfo'],
      oa: function (a) {
        if (!a.phoneEnrollmentInfo) throw new P('internal-error')
        if (!a.phoneEnrollmentInfo.phoneNumber) throw new P('missing-phone-number')
        if (!a.phoneEnrollmentInfo.recaptchaToken) throw new P('missing-app-credential')
      },
      Aa: function (a) {
        if (!a.phoneSessionInfo || !a.phoneSessionInfo.sessionInfo) throw new P('internal-error')
      },
      ta: !0,
      Le: !0,
    },
    sn = {
      endpoint: 'accounts/mfaSignIn:start',
      Ma: ['mfaPendingCredential', 'mfaEnrollmentId', 'phoneSignInInfo'],
      oa: function (a) {
        if (!a.phoneSignInInfo || !a.phoneSignInInfo.recaptchaToken)
          throw new P('missing-app-credential')
      },
      Aa: function (a) {
        if (!a.phoneResponseInfo || !a.phoneResponseInfo.sessionInfo) throw new P('internal-error')
      },
      ta: !0,
      Le: !0,
    },
    zn = { endpoint: 'verifyAssertion', oa: vn, Kf: wn, Aa: yn, Nb: !0, ta: !0 },
    Bn = {
      endpoint: 'verifyAssertion',
      oa: vn,
      Kf: wn,
      Aa: function (a) {
        if (a.errorMessage && 'USER_NOT_FOUND' == a.errorMessage) throw new P('user-not-found')
        if (a.errorMessage) throw xn(a.errorMessage)
        en(a)
      },
      Nb: !0,
      ta: !0,
    },
    An = {
      endpoint: 'verifyAssertion',
      oa: function (a) {
        vn(a)
        if (!a.idToken) throw new P('internal-error')
      },
      Kf: wn,
      Aa: yn,
      Nb: !0,
    },
    Mn = {
      endpoint: 'verifyCustomToken',
      oa: function (a) {
        if (!a.token) throw new P('invalid-custom-token')
      },
      Aa: en,
      Nb: !0,
      ta: !0,
    },
    nm = {
      endpoint: 'verifyPassword',
      oa: function (a) {
        Zm(a)
        if (!a.password) throw new P('wrong-password')
      },
      Aa: en,
      Nb: !0,
      ta: !0,
    },
    pn = { endpoint: 'verifyPhoneNumber', oa: fn, Aa: en, ta: !0 },
    vm = {
      endpoint: 'verifyPhoneNumber',
      oa: function (a) {
        if (!a.idToken) throw new P('internal-error')
        fn(a)
      },
      Aa: function (a) {
        if (a.temporaryProof) throw ((a.code = 'credential-already-in-use'), Gm(a))
        en(a)
      },
    },
    wm = {
      ki: { USER_NOT_FOUND: 'user-not-found' },
      endpoint: 'verifyPhoneNumber',
      oa: fn,
      Aa: en,
      ta: !0,
    },
    Nn = {
      endpoint: 'accounts/mfaEnrollment:withdraw',
      Ma: ['idToken', 'mfaEnrollmentId'],
      Aa: function (a) {
        if (!!a.idToken ^ !!a.refreshToken) throw new P('internal-error')
      },
      ta: !0,
      Le: !0,
    }
  var Pn = function (a) {
    this.kb = a
    this.nf = null
    this.Zg = On(this)
  }
  Pn.prototype.onReady = function () {
    return this.Zg
  }
  var On = function (a) {
    return Qn().then(function () {
      return new E(function (b, c) {
        N('gapi.iframes.getContext')().open(
          {
            where: document.body,
            url: a.kb,
            messageHandlersFilter: N('gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER'),
            attributes: {
              style: { position: 'absolute', top: '-100px', width: '1px', height: '1px' },
            },
            dontclear: !0,
          },
          function (d) {
            a.nf = d
            a.nf.restyle({ setHideOnLeave: !1 })
            var e = setTimeout(function () {
                c(Error('Network Error'))
              }, Rn.get()),
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
  Pn.prototype.sendMessage = function (a) {
    var b = this
    return this.Zg.then(function () {
      return new E(function (c) {
        b.nf.send(a.type, a, c, N('gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER'))
      })
    })
  }
  Pn.prototype.uh = function (a, b) {
    var c = this
    this.Zg.then(function () {
      c.nf.register(a, b, N('gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER'))
    })
  }
  var Qn = function () {
      return Sn
        ? Sn
        : (Sn = new E(function (a, b) {
            var c = function () {
              el()
              N('gapi.load')('gapi.iframes', {
                callback: a,
                ontimeout: function () {
                  el()
                  b(Error('Network Error'))
                },
                timeout: Tn.get(),
              })
            }
            if (N('gapi.iframes.Iframe')) a()
            else if (N('gapi.load')) c()
            else {
              var d = '__iframefcb' + Math.floor(1e6 * Math.random()).toString()
              p[d] = function () {
                N('gapi.load') ? c() : b(Error('Network Error'))
              }
              d = sb(Un, { onload: d })
              F(Hj(d)).l(function () {
                b(Error('Network Error'))
              })
            }
          }).l(function (a) {
            Sn = null
            throw a
          }))
    },
    Un = new kb(ib, 'https://apis.google.com/js/api.js?onload=%{onload}'),
    Tn = new fl(3e4, 6e4),
    Rn = new fl(5e3, 15e3),
    Sn = null
  var Vn = function (a, b, c, d) {
    this.ya = a
    this.ha = b
    this.ka = c
    this.N = d
    this.Yc = null
    this.N
      ? ((a = M(this.N.url)), (a = pk(a.Va, a.Ga, a.Ub, '/emulator/auth/iframe')))
      : (a = pk('https', this.ya, null, '/__/auth/iframe'))
    this.jc = a
    L(this.jc, 'apiKey', this.ha)
    L(this.jc, 'appName', this.ka)
    this.Ia = null
    this.Da = []
  }
  Vn.prototype.Hh = function (a) {
    this.Yc = a
    return this
  }
  Vn.prototype.Eh = function (a) {
    this.Ia = a
    return this
  }
  Vn.prototype.toString = function () {
    this.Yc ? L(this.jc, 'v', this.Yc) : this.jc.removeParameter('v')
    this.Ia ? L(this.jc, 'eid', this.Ia) : this.jc.removeParameter('eid')
    this.Da.length ? L(this.jc, 'fw', this.Da.join(',')) : this.jc.removeParameter('fw')
    return this.jc.toString()
  }
  var Wn = function (a, b, c, d, e, f) {
    this.ya = a
    this.ha = b
    this.ka = c
    this.qk = d
    this.N = f
    this.Yc = this.Ja = this.th = null
    this.Fd = e
    this.ma = this.Ia = null
  }
  Wn.prototype.Gh = function (a) {
    this.ma = a
    return this
  }
  Wn.prototype.Hh = function (a) {
    this.Yc = a
    return this
  }
  Wn.prototype.Eh = function (a) {
    this.Ia = a
    return this
  }
  Wn.prototype.toString = function () {
    if (this.N) {
      var a = M(this.N.url)
      a = pk(a.Va, a.Ga, a.Ub, '/emulator/auth/handler')
    } else a = pk('https', this.ya, null, '/__/auth/handler')
    L(a, 'apiKey', this.ha)
    L(a, 'appName', this.ka)
    L(a, 'authType', this.qk)
    if (this.Fd.isOAuthProvider) {
      var b = this.Fd
      try {
        var c = firebase.app(this.ka).auth().Hb
      } catch (h) {
        c = null
      }
      b.yg = c
      L(a, 'providerId', this.Fd.providerId)
      c = this.Fd
      b = bl(c.li)
      for (var d in b) b[d] = b[d].toString()
      d = c.Rl
      b = Ya(b)
      for (var e = 0; e < d.length; e++) {
        var f = d[e]
        f in b && delete b[f]
      }
      c.Tg && c.yg && !b[c.Tg] && (b[c.Tg] = c.yg)
      Xa(b) || L(a, 'customParameters', al(b))
    }
    'function' === typeof this.Fd.Ei &&
      ((c = this.Fd.Ei()), c.length && L(a, 'scopes', c.join(',')))
    this.th ? L(a, 'redirectUrl', this.th) : a.removeParameter('redirectUrl')
    this.Ja ? L(a, 'eventId', this.Ja) : a.removeParameter('eventId')
    this.Yc ? L(a, 'v', this.Yc) : a.removeParameter('v')
    if (this.Oe)
      for (var g in this.Oe) this.Oe.hasOwnProperty(g) && !ok(a, g) && L(a, g, this.Oe[g])
    this.ma ? L(a, 'tid', this.ma) : a.removeParameter('tid')
    this.Ia ? L(a, 'eid', this.Ia) : a.removeParameter('eid')
    g = Xn(this.ka)
    g.length && L(a, 'fw', g.join(','))
    return a.toString()
  }
  var Xn = function (a) {
      try {
        return Sa(firebase.app(a).auth().Da)
      } catch (b) {
        return []
      }
    },
    Yn = function (a, b, c, d, e, f) {
      this.ya = a
      this.ha = b
      this.ka = c
      this.N = f
      this.Fc = d || null
      this.Ia = e || null
      this.o = this.Mg = this.Bi = null
      this.Wb = []
      this.tf = this.Ib = null
    },
    Zn = function (a) {
      var b = b || zk()
      return dn(a).then(function (c) {
        if (!Jk(c, b)) throw new Ll(zk())
      })
    }
  k = Yn.prototype
  k.initialize = function () {
    if (this.tf) return this.tf
    var a = this
    return (this.tf = Lk().then(function () {
      if (!a.Mg) {
        var b = a.Fc,
          c = a.Ia,
          d = Xn(a.ka)
        b = new Vn(a.ya, a.ha, a.ka, a.N).Hh(b).Eh(c)
        b.Da = Sa(d || [])
        a.Mg = b.toString()
      }
      a.mf = new Pn(a.Mg)
      a.wh()
    }))
  }
  k.Ee = function (a, b, c) {
    var d = new P('popup-closed-by-user'),
      e = new P('web-storage-unsupported'),
      f = this,
      g = !1
    return this.Oc()
      .then(function () {
        $n(f).then(function (h) {
          h || (a && Fk(a), b(e), (g = !0))
        })
      })
      .l(function () {})
      .then(function () {
        if (!g) return Hk(a)
      })
      .then(function () {
        if (!g)
          return Jj(c).then(function () {
            b(d)
          })
      })
  }
  k.Oj = function () {
    var a = xk()
    return !$k(a) && !dl(a)
  }
  k.Ji = function () {
    return !1
  }
  k.ve = function (a, b, c, d, e, f, g, h) {
    if (!a) return G(new P('popup-blocked'))
    if (g && !$k())
      return (
        this.Oc().l(function (m) {
          Fk(a)
          e(m)
        }),
        d(),
        F()
      )
    this.Ib || (this.Ib = Zn(ao(this)))
    var l = this
    return this.Ib.then(function () {
      var m = l.Oc().l(function (q) {
        Fk(a)
        e(q)
        throw q
      })
      d()
      return m
    })
      .then(function () {
        Em(c)
        if (!g) {
          var m = bo(l.ya, l.ha, l.ka, b, c, null, f, l.Fc, void 0, l.Ia, h, l.N)
          Ak(m, a)
        }
      })
      .l(function (m) {
        'auth/network-request-failed' == m.code && (l.Ib = null)
        throw m
      })
  }
  var ao = function (a) {
    a.o ||
      ((a.Bi = a.Fc ? Vk('JsCore', a.Fc, Xn(a.ka)) : null),
      (a.o = new Mm(a.ha, vk(a.Ia), a.Bi)),
      a.N && Qm(a.o, a.N))
    return a.o
  }
  Yn.prototype.we = function (a, b, c, d) {
    this.Ib || (this.Ib = Zn(ao(this)))
    var e = this
    return this.Ib.then(function () {
      Em(b)
      var f = bo(e.ya, e.ha, e.ka, a, b, zk(), c, e.Fc, void 0, e.Ia, d, e.N)
      Ak(f)
    }).l(function (f) {
      'auth/network-request-failed' == f.code && (e.Ib = null)
      throw f
    })
  }
  Yn.prototype.Oc = function () {
    var a = this
    return this.initialize()
      .then(function () {
        return a.mf.onReady()
      })
      .l(function () {
        a.Ib = null
        throw new P('network-request-failed')
      })
  }
  Yn.prototype.Tj = function () {
    return !0
  }
  var bo = function (a, b, c, d, e, f, g, h, l, m, q, x) {
    a = new Wn(a, b, c, d, e, x)
    a.th = f
    a.Ja = g
    f = a.Hh(h)
    f.Oe = Ya(l || null)
    return f.Eh(m).Gh(q).toString()
  }
  Yn.prototype.wh = function () {
    if (!this.mf) throw Error('IfcHandler must be initialized!')
    var a = this
    this.mf.uh('authEvent', function (b) {
      var c = {}
      if (b && b.authEvent) {
        var d = !1
        b = Cl(b.authEvent)
        for (c = 0; c < a.Wb.length; c++) d = a.Wb[c](b) || d
        c = {}
        c.status = d ? 'ACK' : 'ERROR'
        return F(c)
      }
      c.status = 'ERROR'
      return F(c)
    })
  }
  var $n = function (a) {
    var b = { type: 'webStorageSupport' }
    return a
      .initialize()
      .then(function () {
        return a.mf.sendMessage(b)
      })
      .then(function (c) {
        if (c && c.length && 'undefined' !== typeof c[0].webStorageSupport)
          return c[0].webStorageSupport
        throw Error()
      })
  }
  Yn.prototype.Dc = function (a) {
    this.Wb.push(a)
  }
  Yn.prototype.Id = function (a) {
    Ra(this.Wb, function (b) {
      return b == a
    })
  }
  function co() {}
  co.prototype.render = function () {}
  co.prototype.reset = function () {}
  co.prototype.getResponse = function () {}
  co.prototype.execute = function () {}
  var eo = function () {
    this.kd = p.grecaptcha ? Infinity : 0
    this.Li = null
    this.sg = '__rcb' + Math.floor(1e6 * Math.random()).toString()
  }
  eo.prototype.Zi = function (a) {
    var b = this
    return new E(function (c, d) {
      var e = setTimeout(function () {
        d(new P('network-request-failed'))
      }, fo.get())
      if (!p.grecaptcha || (a !== b.Li && !b.kd)) {
        p[b.sg] = function () {
          if (p.grecaptcha) {
            b.Li = a
            var g = p.grecaptcha.render
            p.grecaptcha.render = function (h, l) {
              h = g(h, l)
              b.kd++
              return h
            }
            clearTimeout(e)
            c(p.grecaptcha)
          } else clearTimeout(e), d(new P('internal-error'))
          delete p[b.sg]
        }
        var f = sb(go, { onload: b.sg, hl: a || '' })
        F(Hj(f)).l(function () {
          clearTimeout(e)
          d(new P('internal-error', 'Unable to load external reCAPTCHA dependencies!'))
        })
      } else clearTimeout(e), c(p.grecaptcha)
    })
  }
  eo.prototype.di = function () {
    this.kd--
  }
  var go = new kb(
      ib,
      'https://www.google.com/recaptcha/api.js?trustedtypes=true&onload=%{onload}&render=explicit&hl=%{hl}'
    ),
    fo = new fl(3e4, 6e4),
    ho = null
  var io = function () {
    this.hb = {}
    this.kd = 1e12
  }
  io.prototype.render = function (a, b) {
    this.hb[this.kd.toString()] = new jo(a, b)
    return this.kd++
  }
  io.prototype.reset = function (a) {
    var b = ko(this, a)
    a = lo(a)
    b && a && (b.delete(), delete this.hb[a])
  }
  io.prototype.getResponse = function (a) {
    return (a = ko(this, a)) ? a.getResponse() : null
  }
  io.prototype.execute = function (a) {
    ;(a = ko(this, a)) && a.execute()
  }
  var ko = function (a, b) {
      return (b = lo(b)) ? a.hb[b] || null : null
    },
    lo = function (a) {
      return (a = 'undefined' === typeof a ? 1e12 : a) ? a.toString() : null
    },
    mo = null,
    jo = function (a, b) {
      this.yb = !1
      this.wa = b
      this.Nd = this.Lf = null
      this.Vi = 'invisible' !== this.wa.size
      this.ui = Qc(a)
      var c = this
      this.jj = function () {
        c.execute()
      }
      this.Vi ? this.execute() : Pi(this.ui, 'click', this.jj)
    }
  jo.prototype.getResponse = function () {
    no(this)
    return this.Lf
  }
  jo.prototype.execute = function () {
    no(this)
    var a = this
    this.Nd ||
      (this.Nd = setTimeout(function () {
        a.Lf = Tk()
        var b = a.wa.callback,
          c = a.wa['expired-callback']
        if (b)
          try {
            b(a.Lf)
          } catch (d) {}
        a.Nd = setTimeout(function () {
          a.Nd = null
          a.Lf = null
          if (c)
            try {
              c()
            } catch (d) {}
          a.Vi && a.execute()
        }, 6e4)
      }, 500))
  }
  jo.prototype.delete = function () {
    no(this)
    this.yb = !0
    clearTimeout(this.Nd)
    this.Nd = null
    Xi(this.ui, 'click', this.jj)
  }
  var no = function (a) {
    if (a.yb) throw Error('reCAPTCHA mock was already deleted!')
  }
  var oo = function () {}
  oo.prototype.Zi = function () {
    mo || (mo = new io())
    return F(mo)
  }
  oo.prototype.di = function () {}
  var po = null
  var qo = function (a, b, c, d, e, f, g) {
    O(this, 'type', 'recaptcha')
    this.Rd = this.Ud = null
    this.ld = !1
    this.fi = b
    this.he = null
    g ? (po || (po = new oo()), (g = po)) : (ho || (ho = new eo()), (g = ho))
    this.zj = g
    this.uc = c || { theme: 'light', type: 'image' }
    this.Ka = []
    if (this.uc.sitekey)
      throw new P(
        'argument-error',
        'sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.'
      )
    this.uf = 'invisible' === this.uc.size
    if (!p.document)
      throw new P(
        'operation-not-supported-in-this-environment',
        'RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment with DOM support.'
      )
    if (!Qc(b) || (!this.uf && Qc(b).hasChildNodes()))
      throw new P(
        'argument-error',
        'reCAPTCHA container is either not found or already contains inner elements!'
      )
    this.o = new Mm(a, f || null, e || null)
    this.Pk =
      d ||
      function () {
        return null
      }
    var h = this
    this.Wf = []
    var l = this.uc.callback
    this.uc.callback = function (q) {
      h.Yd(q)
      if ('function' === typeof l) l(q)
      else if ('string' === typeof l) {
        var x = N(l, p)
        'function' === typeof x && x(q)
      }
    }
    var m = this.uc['expired-callback']
    this.uc['expired-callback'] = function () {
      h.Yd(null)
      if ('function' === typeof m) m()
      else if ('string' === typeof m) {
        var q = N(m, p)
        'function' === typeof q && q()
      }
    }
  }
  qo.prototype.Yd = function (a) {
    for (var b = 0; b < this.Wf.length; b++)
      try {
        this.Wf[b](a)
      } catch (c) {}
  }
  var ro = function (a, b) {
    Ra(a.Wf, function (c) {
      return c == b
    })
  }
  k = qo.prototype
  k.v = function (a) {
    var b = this
    this.Ka.push(a)
    a.Bc(function () {
      Pa(b.Ka, a)
    })
    return a
  }
  k.ke = function () {
    var a = this
    return this.Ud
      ? this.Ud
      : (this.Ud = this.v(
          F()
            .then(function () {
              if (Yk() && !Qk()) return Lk()
              throw new P(
                'operation-not-supported-in-this-environment',
                'RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment.'
              )
            })
            .then(function () {
              return a.zj.Zi(a.Pk())
            })
            .then(function (b) {
              a.he = b
              return Q(a.o, Ln, {})
            })
            .then(function (b) {
              a.uc.sitekey = b.recaptchaSiteKey
            })
            .l(function (b) {
              a.Ud = null
              throw b
            })
        ))
  }
  k.render = function () {
    so(this)
    var a = this
    return this.v(
      this.ke().then(function () {
        if (null === a.Rd) {
          var b = a.fi
          if (!a.uf) {
            var c = Qc(b)
            b = Uc('DIV')
            c.appendChild(b)
          }
          a.Rd = a.he.render(b, a.uc)
        }
        return a.Rd
      })
    )
  }
  k.verify = function () {
    so(this)
    var a = this
    return this.v(
      this.render().then(function (b) {
        return new E(function (c) {
          var d = a.he.getResponse(b)
          if (d) c(d)
          else {
            var e = function (f) {
              f && (ro(a, e), c(f))
            }
            a.Wf.push(e)
            a.uf && a.he.execute(a.Rd)
          }
        })
      })
    )
  }
  k.reset = function () {
    so(this)
    null !== this.Rd && this.he.reset(this.Rd)
  }
  var so = function (a) {
    if (a.ld) throw new P('internal-error', 'RecaptchaVerifier instance has been destroyed.')
  }
  qo.prototype.clear = function () {
    so(this)
    this.ld = !0
    this.zj.di()
    for (var a = 0; a < this.Ka.length; a++)
      this.Ka[a].cancel('RecaptchaVerifier instance has been destroyed.')
    this.uf || Xc(Qc(this.fi))
  }
  var to = function (a, b, c) {
    var d = !1
    try {
      this.U = c || firebase.app()
    } catch (g) {
      throw new P('argument-error', 'No firebase.app.App instance is currently initialized.')
    }
    if (this.U.options && this.U.options.apiKey) c = this.U.options.apiKey
    else throw new P('invalid-api-key')
    var e = this,
      f = null
    try {
      f = Sa(this.U.auth().Da)
    } catch (g) {}
    try {
      d = this.U.auth().settings.appVerificationDisabledForTesting
    } catch (g) {}
    f = firebase.SDK_VERSION ? Vk('JsCore', firebase.SDK_VERSION, f) : null
    qo.call(
      this,
      c,
      a,
      b,
      function () {
        try {
          var g = e.U.auth().Hb
        } catch (h) {
          g = null
        }
        return g
      },
      f,
      vk(wk),
      d
    )
  }
  v(to, qo)
  var uo = function (a) {
    this.Ne = a
  }
  uo.prototype.postMessage = function (a, b) {
    this.Ne.postMessage(a, b)
  }
  var vo = function (a) {
    this.Nl = a
    this.ei = !1
    this.yf = []
  }
  vo.prototype.send = function (a, b, c) {
    b = void 0 === b ? null : b
    c = void 0 === c ? !1 : c
    var d = this,
      e
    b = b || {}
    var f,
      g,
      h,
      l = null
    if (this.ei) return G(Error('connection_unavailable'))
    var m = c ? 800 : 50,
      q = 'undefined' !== typeof MessageChannel ? new MessageChannel() : null
    return new E(function (x, z) {
      q
        ? ((e = '' + Math.floor(Math.random() * Math.pow(10, 20)).toString()),
          q.port1.start(),
          (g = setTimeout(function () {
            z(Error('unsupported_event'))
          }, m)),
          (f = function (R) {
            R.data.eventId === e &&
              ('ack' === R.data.status
                ? (clearTimeout(g),
                  (h = setTimeout(function () {
                    z(Error('timeout'))
                  }, 3e3)))
                : 'done' === R.data.status
                ? (clearTimeout(h),
                  'undefined' !== typeof R.data.response
                    ? x(R.data.response)
                    : z(Error('unknown_error')))
                : (clearTimeout(g), clearTimeout(h), z(Error('invalid_response'))))
          }),
          (l = { messageChannel: q, onMessage: f }),
          d.yf.push(l),
          q.port1.addEventListener('message', f),
          d.Nl.postMessage({ eventType: a, eventId: e, data: b }, [q.port2]))
        : z(Error('connection_unavailable'))
    })
      .then(function (x) {
        wo(d, l)
        return x
      })
      .l(function (x) {
        wo(d, l)
        throw x
      })
  }
  var wo = function (a, b) {
    if (b) {
      var c = b.messageChannel,
        d = b.onMessage
      c && (c.port1.removeEventListener('message', d), c.port1.close())
      Ra(a.yf, function (e) {
        return e == b
      })
    }
  }
  vo.prototype.close = function () {
    for (; 0 < this.yf.length; ) wo(this, this.yf[0])
    this.ei = !0
  }
  var xo = function (a) {
      this.Cg = a
      this.Eb = {}
      this.dj = u(this.Tk, this)
    },
    zo = function (a) {
      y(yo, function (c) {
        c.Cg == a && (b = c)
      })
      if (!b) {
        var b = new xo(a)
        yo.push(b)
      }
      return b
    }
  xo.prototype.Tk = function (a) {
    var b = a.data.eventType,
      c = a.data.eventId,
      d = this.Eb[b]
    if (d && 0 < d.length) {
      a.ports[0].postMessage({ status: 'ack', eventId: c, eventType: b, response: null })
      var e = []
      y(d, function (f) {
        e.push(
          F().then(function () {
            return f(a.origin, a.data.data)
          })
        )
      })
      Wf(e).then(function (f) {
        var g = []
        y(f, function (h) {
          g.push({ fulfilled: h.Ai, value: h.value, reason: h.reason ? h.reason.message : void 0 })
        })
        y(g, function (h) {
          for (var l in h) 'undefined' === typeof h[l] && delete h[l]
        })
        a.ports[0].postMessage({ status: 'done', eventId: c, eventType: b, response: g })
      })
    }
  }
  xo.prototype.subscribe = function (a, b) {
    Xa(this.Eb) && this.Cg.addEventListener('message', this.dj)
    'undefined' === typeof this.Eb[a] && (this.Eb[a] = [])
    this.Eb[a].push(b)
  }
  xo.prototype.unsubscribe = function (a, b) {
    'undefined' !== typeof this.Eb[a] && b
      ? (Ra(this.Eb[a], function (c) {
          return c == b
        }),
        0 == this.Eb[a].length && delete this.Eb[a])
      : b || delete this.Eb[a]
    Xa(this.Eb) && this.Cg.removeEventListener('message', this.dj)
  }
  var yo = []
  var Ao = function (a) {
    this.ub = a || (firebase.INTERNAL.reactNative && firebase.INTERNAL.reactNative.AsyncStorage)
    if (!this.ub)
      throw new P('internal-error', 'The React Native compatibility library was not found.')
    this.type = 'asyncStorage'
  }
  k = Ao.prototype
  k.get = function (a) {
    return F(this.ub.getItem(a)).then(function (b) {
      return b && cl(b)
    })
  }
  k.set = function (a, b) {
    return F(this.ub.setItem(a, al(b)))
  }
  k.remove = function (a) {
    return F(this.ub.removeItem(a))
  }
  k.nc = function () {}
  k.Ac = function () {}
  function Bo() {
    this.storage = {}
    this.type = 'inMemory'
  }
  k = Bo.prototype
  k.get = function (a) {
    return F(this.storage[a])
  }
  k.set = function (a, b) {
    this.storage[a] = b
    return F()
  }
  k.remove = function (a) {
    delete this.storage[a]
    return F()
  }
  k.nc = function () {}
  k.Ac = function () {}
  var Eo = function () {
      if (!Co()) {
        if ('Node' == Rk())
          throw new P('internal-error', 'The LocalStorage compatibility library was not found.')
        throw new P('web-storage-unsupported')
      }
      this.ub = Do() || firebase.INTERNAL.node.localStorage
      this.type = 'localStorage'
    },
    Do = function () {
      try {
        var a = p.localStorage,
          b = Wk()
        a && (a.setItem(b, '1'), a.removeItem(b))
        return a
      } catch (c) {
        return null
      }
    },
    Co = function () {
      var a = 'Node' == Rk()
      a = Do() || (a && firebase.INTERNAL.node && firebase.INTERNAL.node.localStorage)
      if (!a) return !1
      try {
        return a.setItem('__sak', '1'), a.removeItem('__sak'), !0
      } catch (b) {
        return !1
      }
    }
  k = Eo.prototype
  k.get = function (a) {
    var b = this
    return F().then(function () {
      var c = b.ub.getItem(a)
      return cl(c)
    })
  }
  k.set = function (a, b) {
    var c = this
    return F().then(function () {
      var d = al(b)
      null === d ? c.remove(a) : c.ub.setItem(a, d)
    })
  }
  k.remove = function (a) {
    var b = this
    return F().then(function () {
      b.ub.removeItem(a)
    })
  }
  k.nc = function (a) {
    p.window && Pi(p.window, 'storage', a)
  }
  k.Ac = function (a) {
    p.window && Xi(p.window, 'storage', a)
  }
  var Fo = function () {
    this.ub = {}
    this.type = 'nullStorage'
  }
  k = Fo.prototype
  k.get = function () {
    return F(null)
  }
  k.set = function () {
    return F()
  }
  k.remove = function () {
    return F()
  }
  k.nc = function () {}
  k.Ac = function () {}
  var Io = function () {
      if (!Go()) {
        if ('Node' == Rk())
          throw new P('internal-error', 'The SessionStorage compatibility library was not found.')
        throw new P('web-storage-unsupported')
      }
      this.ub = Ho() || firebase.INTERNAL.node.sessionStorage
      this.type = 'sessionStorage'
    },
    Ho = function () {
      try {
        var a = p.sessionStorage,
          b = Wk()
        a && (a.setItem(b, '1'), a.removeItem(b))
        return a
      } catch (c) {
        return null
      }
    },
    Go = function () {
      var a = 'Node' == Rk()
      a = Ho() || (a && firebase.INTERNAL.node && firebase.INTERNAL.node.sessionStorage)
      if (!a) return !1
      try {
        return a.setItem('__sak', '1'), a.removeItem('__sak'), !0
      } catch (b) {
        return !1
      }
    }
  k = Io.prototype
  k.get = function (a) {
    var b = this
    return F().then(function () {
      var c = b.ub.getItem(a)
      return cl(c)
    })
  }
  k.set = function (a, b) {
    var c = this
    return F().then(function () {
      var d = al(b)
      null === d ? c.remove(a) : c.ub.setItem(a, d)
    })
  }
  k.remove = function (a) {
    var b = this
    return F().then(function () {
      b.ub.removeItem(a)
    })
  }
  k.nc = function () {}
  k.Ac = function () {}
  var Lo = function () {
      if (!Jo()) throw new P('web-storage-unsupported')
      this.mi = 'firebaseLocalStorageDb'
      this.Af = 'firebaseLocalStorage'
      this.xg = 'fbase_key'
      this.Zj = 'value'
      this.wm = 1
      this.Ra = {}
      this.Vb = []
      this.re = 0
      this.Qi = p.indexedDB
      this.type = 'indexedDB'
      this.Qf = this.vc = this.Hf = this.ih = null
      this.Gj = !1
      this.fg = null
      var a = this
      Qk() && self
        ? ((this.vc = zo(Qk() ? self : null)),
          this.vc.subscribe('keyChanged', function (b, c) {
            return Ko(a).then(function (d) {
              0 < d.length &&
                y(a.Vb, function (e) {
                  e(d)
                })
              return { keyProcessed: Oa(d, c.key) }
            })
          }),
          this.vc.subscribe('ping', function () {
            return F(['keyChanged'])
          }))
        : ml().then(function (b) {
            if ((a.fg = b))
              (a.Qf = new vo(new uo(b))),
                a.Qf.send('ping', null, !0)
                  .then(function (c) {
                    c[0].fulfilled && Oa(c[0].value, 'keyChanged') && (a.Gj = !0)
                  })
                  .l(function () {})
          })
    },
    Mo,
    No = function (a) {
      return new E(function (b, c) {
        var d = a.Qi.deleteDatabase(a.mi)
        d.onsuccess = function () {
          b()
        }
        d.onerror = function (e) {
          c(Error(e.target.error))
        }
      })
    },
    Oo = function (a) {
      return new E(function (b, c) {
        var d = a.Qi.open(a.mi, a.wm)
        d.onerror = function (e) {
          try {
            e.preventDefault()
          } catch (f) {}
          c(Error(e.target.error))
        }
        d.onupgradeneeded = function (e) {
          e = e.target.result
          try {
            e.createObjectStore(a.Af, { keyPath: a.xg })
          } catch (f) {
            c(f)
          }
        }
        d.onsuccess = function (e) {
          e = e.target.result
          e.objectStoreNames.contains(a.Af)
            ? b(e)
            : No(a)
                .then(function () {
                  return Oo(a)
                })
                .then(function (f) {
                  b(f)
                })
                .l(function (f) {
                  c(f)
                })
        }
      })
    },
    Po = function (a) {
      a.Og || (a.Og = Oo(a))
      return a.Og
    },
    Qo = function (a, b) {
      var c = 0,
        d = function (e, f) {
          Po(a)
            .then(b)
            .then(e)
            .l(function (g) {
              if (3 < ++c) f(g)
              else
                return Po(a)
                  .then(function (h) {
                    h.close()
                    a.Og = void 0
                    return d(e, f)
                  })
                  .l(function (h) {
                    f(h)
                  })
            })
        }
      return new E(d)
    },
    Jo = function () {
      try {
        return !!p.indexedDB
      } catch (a) {
        return !1
      }
    },
    Ro = function (a, b) {
      return b.objectStore(a.Af)
    },
    So = function (a, b, c) {
      return b.transaction([a.Af], c ? 'readwrite' : 'readonly')
    },
    To = function (a) {
      return new E(function (b, c) {
        a.onsuccess = function (d) {
          d && d.target ? b(d.target.result) : b()
        }
        a.onerror = function (d) {
          c(d.target.error)
        }
      })
    }
  Lo.prototype.set = function (a, b) {
    var c = this,
      d = !1
    return Qo(this, function (e) {
      e = Ro(c, So(c, e, !0))
      return To(e.get(a))
    })
      .then(function (e) {
        return Qo(c, function (f) {
          f = Ro(c, So(c, f, !0))
          if (e) return (e.value = b), To(f.put(e))
          c.re++
          d = !0
          var g = {}
          g[c.xg] = a
          g[c.Zj] = b
          return To(f.add(g))
        })
      })
      .then(function () {
        c.Ra[a] = b
        return Uo(c, a)
      })
      .Bc(function () {
        d && c.re--
      })
  }
  var Uo = function (a, b) {
    return a.Qf && a.fg && ll() === a.fg
      ? a.Qf.send('keyChanged', { key: b }, a.Gj)
          .then(function () {})
          .l(function () {})
      : F()
  }
  Lo.prototype.get = function (a) {
    var b = this
    return Qo(this, function (c) {
      return To(Ro(b, So(b, c, !1)).get(a))
    }).then(function (c) {
      return c && c.value
    })
  }
  Lo.prototype.remove = function (a) {
    var b = !1,
      c = this
    return Qo(this, function (d) {
      b = !0
      c.re++
      return To(Ro(c, So(c, d, !0))['delete'](a))
    })
      .then(function () {
        delete c.Ra[a]
        return Uo(c, a)
      })
      .Bc(function () {
        b && c.re--
      })
  }
  var Ko = function (a) {
    return Po(a)
      .then(function (b) {
        var c = Ro(a, So(a, b, !1))
        return c.getAll
          ? To(c.getAll())
          : new E(function (d, e) {
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
        if (0 == a.re) {
          for (d = 0; d < b.length; d++) c[b[d][a.xg]] = b[d][a.Zj]
          d = Bk(a.Ra, c)
          a.Ra = c
        }
        return d
      })
  }
  Lo.prototype.nc = function (a) {
    0 == this.Vb.length && this.Lh()
    this.Vb.push(a)
  }
  Lo.prototype.Ac = function (a) {
    Ra(this.Vb, function (b) {
      return b == a
    })
    0 == this.Vb.length && this.Tf()
  }
  Lo.prototype.Lh = function () {
    var a = this
    this.Tf()
    var b = function () {
      a.Hf = setTimeout(function () {
        a.ih = Ko(a)
          .then(function (c) {
            0 < c.length &&
              y(a.Vb, function (d) {
                d(c)
              })
          })
          .then(function () {
            b()
          })
          .l(function (c) {
            'STOP_EVENT' != c.message && b()
          })
      }, 800)
    }
    b()
  }
  Lo.prototype.Tf = function () {
    this.ih && this.ih.cancel('STOP_EVENT')
    this.Hf && (clearTimeout(this.Hf), (this.Hf = null))
  }
  function Vo(a) {
    var b = this,
      c = null
    this.Vb = []
    this.type = 'indexedDB'
    this.vi = a
    this.Sh = F()
      .then(function () {
        if (Jo()) {
          var d = Wk(),
            e = '__sak' + d
          Mo || (Mo = new Lo())
          c = Mo
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
            .l(function () {
              return b.vi
            })
        }
        return b.vi
      })
      .then(function (d) {
        b.type = d.type
        d.nc(function (e) {
          y(b.Vb, function (f) {
            f(e)
          })
        })
        return d
      })
  }
  k = Vo.prototype
  k.get = function (a) {
    return this.Sh.then(function (b) {
      return b.get(a)
    })
  }
  k.set = function (a, b) {
    return this.Sh.then(function (c) {
      return c.set(a, b)
    })
  }
  k.remove = function (a) {
    return this.Sh.then(function (b) {
      return b.remove(a)
    })
  }
  k.nc = function (a) {
    this.Vb.push(a)
  }
  k.Ac = function (a) {
    Ra(this.Vb, function (b) {
      return b == a
    })
  }
  var $o = function () {
      this.Ag = { Browser: Wo, Node: Xo, ReactNative: Yo, Worker: Zo }[Rk()]
    },
    ap,
    Wo = { ua: Eo, Uf: Io },
    Xo = { ua: Eo, Uf: Io },
    Yo = { ua: Ao, Uf: Fo },
    Zo = { ua: Eo, Uf: Fo }
  var bp = function () {
    this.jg = !1
    Object.defineProperty(this, 'appVerificationDisabled', {
      get: function () {
        return this.jg
      },
      set: function (a) {
        this.jg = a
      },
      enumerable: !1,
    })
  }
  var cp = function (a) {
    this.Qg(a)
  }
  cp.prototype.Qg = function (a) {
    var b = a.url
    if ('undefined' === typeof b) throw new P('missing-continue-uri')
    if ('string' !== typeof b || ('string' === typeof b && !b.length))
      throw new P('invalid-continue-uri')
    this.vk = b
    this.Vh = this.ig = null
    this.Si = !1
    var c = a.android
    if (c && 'object' === typeof c) {
      b = c.packageName
      var d = c.installApp
      c = c.minimumVersion
      if ('string' === typeof b && b.length) {
        this.ig = b
        if ('undefined' !== typeof d && 'boolean' !== typeof d)
          throw new P('argument-error', 'installApp property must be a boolean when specified.')
        this.Si = !!d
        if (
          'undefined' !== typeof c &&
          ('string' !== typeof c || ('string' === typeof c && !c.length))
        )
          throw new P(
            'argument-error',
            'minimumVersion property must be a non empty string when specified.'
          )
        this.Vh = c || null
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
    this.Mi = null
    if ((b = a.iOS) && 'object' === typeof b)
      if (((b = b.bundleId), 'string' === typeof b && b.length)) this.Mi = b
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
    this.ci = !!b
    a = a.dynamicLinkDomain
    if ('undefined' !== typeof a && ('string' !== typeof a || ('string' === typeof a && !a.length)))
      throw new P(
        'argument-error',
        'dynamicLinkDomain property must be a non empty string when specified.'
      )
    this.Dk = a || null
  }
  var dp = function (a) {
    var b = {}
    b.continueUrl = a.vk
    b.canHandleCodeInApp = a.ci
    if ((b.androidPackageName = a.ig))
      (b.androidMinimumVersion = a.Vh), (b.androidInstallApp = a.Si)
    b.iOSBundleId = a.Mi
    b.dynamicLinkDomain = a.Dk
    for (var c in b) null === b[c] && delete b[c]
    return b
  }
  var ep = function (a, b) {
    this.zk = b
    O(this, 'verificationId', a)
  }
  ep.prototype.confirm = function (a) {
    a = Cm(this.verificationId, a)
    return this.zk(a)
  }
  var fp = function (a, b, c, d) {
    return new ym(a).verifyPhoneNumber(b, c).then(function (e) {
      return new ep(e, d)
    })
  }
  var gp = function (a, b, c) {
    this.Kl = a
    this.bm = b
    this.Rk = c
    this.xf = 3e4
    this.Uh = 96e4
    this.dm = !1
    this.Bd = null
    this.Qc = this.xf
    if (this.Uh < this.xf) throw Error('Proactive refresh lower bound greater than upper bound!')
  }
  gp.prototype.start = function () {
    this.Qc = this.xf
    hp(this, !0)
  }
  var ip = function (a, b) {
      if (b) return (a.Qc = a.xf), a.Rk()
      b = a.Qc
      a.Qc *= 2
      a.Qc > a.Uh && (a.Qc = a.Uh)
      return b
    },
    hp = function (a, b) {
      a.stop()
      a.Bd = Jj(ip(a, b))
        .then(function () {
          return a.dm ? F() : hl()
        })
        .then(function () {
          return a.Kl()
        })
        .then(function () {
          hp(a, !0)
        })
        .l(function (c) {
          a.bm(c) && hp(a, !1)
        })
    }
  gp.prototype.stop = function () {
    this.Bd && (this.Bd.cancel(), (this.Bd = null))
  }
  var pp = function (a) {
      var b = {}
      b['facebook.com'] = jp
      b['google.com'] = kp
      b['github.com'] = lp
      b['twitter.com'] = mp
      var c = a && a.providerId
      try {
        if (c) return b[c] ? new b[c](a) : new np(a)
        if ('undefined' !== typeof a.idToken) return new op(a)
      } catch (d) {}
      return null
    },
    op = function (a) {
      var b = a.providerId
      if (!b && a.idToken) {
        var c = Ol(a.idToken)
        c && c.rh && (b = c.rh)
      }
      if (!b) throw Error('Invalid additional user info!')
      if ('anonymous' == b || 'custom' == b) b = null
      c = !1
      'undefined' !== typeof a.isNewUser
        ? (c = !!a.isNewUser)
        : 'identitytoolkit#SignupNewUserResponse' === a.kind && (c = !0)
      O(this, 'providerId', b)
      O(this, 'isNewUser', c)
    },
    np = function (a) {
      op.call(this, a)
      a = cl(a.rawUserInfo || '{}')
      O(this, 'profile', ul(a || {}))
    }
  n(np, op)
  var jp = function (a) {
    np.call(this, a)
    if ('facebook.com' != this.providerId) throw Error('Invalid provider ID!')
  }
  n(jp, np)
  var lp = function (a) {
    np.call(this, a)
    if ('github.com' != this.providerId) throw Error('Invalid provider ID!')
    O(this, 'username', (this.profile && this.profile.login) || null)
  }
  n(lp, np)
  var kp = function (a) {
    np.call(this, a)
    if ('google.com' != this.providerId) throw Error('Invalid provider ID!')
  }
  n(kp, np)
  var mp = function (a) {
    np.call(this, a)
    if ('twitter.com' != this.providerId) throw Error('Invalid provider ID!')
    O(this, 'username', a.screenName || null)
  }
  n(mp, np)
  var qp = { LOCAL: 'local', NONE: 'none', SESSION: 'session' },
    rp = function (a) {
      var b = new P('invalid-persistence-type'),
        c = new P('unsupported-persistence-type')
      a: {
        for (d in qp)
          if (qp[d] == a) {
            var d = !0
            break a
          }
        d = !1
      }
      if (!d || 'string' !== typeof a) throw b
      switch (Rk()) {
        case 'ReactNative':
          if ('session' === a) throw c
          break
        case 'Node':
          if ('none' !== a) throw c
          break
        case 'Worker':
          if ('session' === a || (!Jo() && 'none' !== a)) throw c
          break
        default:
          if (!Xk() && 'none' !== a) throw c
      }
    },
    sp = function () {
      var a = !dl(xk()) && Pk() ? !0 : !1,
        b = $k(),
        c = Xk()
      this.hj = 'firebase'
      this.Ch = ':'
      this.em = a
      this.Cj = b
      this.ak = c
      this.ab = {}
      ap || (ap = new $o())
      a = ap
      try {
        this.vj =
          (!yk() && kl()) || !p.indexedDB ? new a.Ag.ua() : new Vo(Qk() ? new Bo() : new a.Ag.ua())
      } catch (d) {
        ;(this.vj = new Bo()), (this.Cj = !0)
      }
      try {
        this.Sj = new a.Ag.Uf()
      } catch (d) {
        this.Sj = new Bo()
      }
      this.nl = new Bo()
      this.Nh = u(this.Qj, this)
      this.Ra = {}
    },
    tp,
    up = function () {
      tp || (tp = new sp())
      return tp
    },
    vp = function (a, b) {
      switch (b) {
        case 'session':
          return a.Sj
        case 'none':
          return a.nl
        default:
          return a.vj
      }
    }
  sp.prototype.ob = function (a, b) {
    return this.hj + this.Ch + a.name + (b ? this.Ch + b : '')
  }
  var wp = function (a, b, c) {
    var d = a.ob(b, c),
      e = vp(a, b.ua)
    return a.get(b, c).then(function (f) {
      var g = null
      try {
        g = cl(p.localStorage.getItem(d))
      } catch (h) {}
      if (g && !f) return p.localStorage.removeItem(d), a.set(b, g, c)
      g && f && 'localStorage' != e.type && p.localStorage.removeItem(d)
    })
  }
  k = sp.prototype
  k.get = function (a, b) {
    return vp(this, a.ua).get(this.ob(a, b))
  }
  k.remove = function (a, b) {
    b = this.ob(a, b)
    'local' == a.ua && (this.Ra[b] = null)
    return vp(this, a.ua).remove(b)
  }
  k.set = function (a, b, c) {
    var d = this.ob(a, c),
      e = this,
      f = vp(this, a.ua)
    return f
      .set(d, b)
      .then(function () {
        return f.get(d)
      })
      .then(function (g) {
        'local' == a.ua && (e.Ra[d] = g)
      })
  }
  k.addListener = function (a, b, c) {
    a = this.ob(a, b)
    this.ak && (this.Ra[a] = p.localStorage.getItem(a))
    Xa(this.ab) && this.Lh()
    this.ab[a] || (this.ab[a] = [])
    this.ab[a].push(c)
  }
  k.removeListener = function (a, b, c) {
    a = this.ob(a, b)
    this.ab[a] &&
      (Ra(this.ab[a], function (d) {
        return d == c
      }),
      0 == this.ab[a].length && delete this.ab[a])
    Xa(this.ab) && this.Tf()
  }
  k.Lh = function () {
    vp(this, 'local').nc(this.Nh)
    this.Cj || ((yk() || !kl()) && p.indexedDB) || !this.ak || xp(this)
  }
  var xp = function (a) {
      yp(a)
      a.Vg = setInterval(function () {
        for (var b in a.ab) {
          var c = p.localStorage.getItem(b),
            d = a.Ra[b]
          c != d &&
            ((a.Ra[b] = c),
            (c = new Ci({
              type: 'storage',
              key: b,
              target: window,
              oldValue: d,
              newValue: c,
              hh: !0,
            })),
            a.Qj(c))
        }
      }, 1e3)
    },
    yp = function (a) {
      a.Vg && (clearInterval(a.Vg), (a.Vg = null))
    }
  sp.prototype.Tf = function () {
    vp(this, 'local').Ac(this.Nh)
    yp(this)
  }
  sp.prototype.Qj = function (a) {
    if (a && a.Nk) {
      var b = a.Ya.key
      if (null == b)
        for (var c in this.ab) {
          var d = this.Ra[c]
          'undefined' === typeof d && (d = null)
          var e = p.localStorage.getItem(c)
          e !== d && ((this.Ra[c] = e), this.rg(c))
        }
      else if (0 == b.indexOf(this.hj + this.Ch) && this.ab[b]) {
        'undefined' !== typeof a.Ya.hh ? vp(this, 'local').Ac(this.Nh) : yp(this)
        if (this.em)
          if (((c = p.localStorage.getItem(b)), (d = a.Ya.newValue), d !== c))
            null !== d ? p.localStorage.setItem(b, d) : p.localStorage.removeItem(b)
          else if (this.Ra[b] === d && 'undefined' === typeof a.Ya.hh) return
        var f = this
        c = function () {
          if ('undefined' !== typeof a.Ya.hh || f.Ra[b] !== p.localStorage.getItem(b))
            (f.Ra[b] = p.localStorage.getItem(b)), f.rg(b)
        }
        sc &&
        Hc &&
        10 == Hc &&
        p.localStorage.getItem(b) !== a.Ya.newValue &&
        a.Ya.newValue !== a.Ya.oldValue
          ? setTimeout(c, 10)
          : c()
      }
    } else y(a, u(this.rg, this))
  }
  sp.prototype.rg = function (a) {
    this.ab[a] &&
      y(this.ab[a], function (b) {
        b()
      })
  }
  var zp = function (a) {
      this.V = a
      this.O = up()
    },
    Bp = function (a) {
      return a.O.get(Ap, a.V).then(function (b) {
        return Cl(b)
      })
    },
    Cp = function (a) {
      return a.O.remove(Ap, a.V)
    }
  zp.prototype.Dc = function (a) {
    this.O.addListener(Ap, this.V, a)
  }
  zp.prototype.Id = function (a) {
    this.O.removeListener(Ap, this.V, a)
  }
  var Ep = function (a) {
      return a.O.get(Dp, a.V).then(function (b) {
        return Cl(b)
      })
    },
    Ap = { name: 'authEvent', ua: 'local' },
    Dp = { name: 'redirectEvent', ua: 'session' }
  var Fp = function () {
    this.O = up()
  }
  Fp.prototype.fe = function () {
    return this.O.get(Gp, void 0)
  }
  var Gp = { name: 'sessionId', ua: 'session' }
  var Hp = function () {
    this.Wg = null
    this.Ue = []
  }
  Hp.prototype.subscribe = function (a) {
    var b = this
    this.Ue.push(a)
    this.Wg ||
      ((this.Wg = function (c) {
        for (var d = 0; d < b.Ue.length; d++) b.Ue[d](c)
      }),
      (a = N('universalLinks.subscribe', p)),
      'function' === typeof a && a(null, this.Wg))
  }
  Hp.prototype.unsubscribe = function (a) {
    Ra(this.Ue, function (b) {
      return b == a
    })
  }
  var Ip = null
  var Jp = function (a, b, c, d, e, f) {
      this.ya = a
      this.ha = b
      this.ka = c
      this.N = f
      this.Fc = d || null
      this.Ia = e || null
      this.Rj = b + ':' + c
      this.fm = new Fp()
      this.Ci = new zp(this.Rj)
      this.Pg = null
      this.Wb = []
      this.rl = 500
      this.Pl = 2e3
      this.je = this.Gf = null
    },
    Kp = function (a) {
      return new P('invalid-cordova-configuration', a)
    }
  Jp.prototype.Oc = function () {
    return this.ke
      ? this.ke
      : (this.ke = Nk().then(
          function () {
            if ('function' !== typeof N('universalLinks.subscribe', p))
              throw Kp('cordova-universal-links-plugin-fix is not installed')
            if ('undefined' === typeof N('BuildInfo.packageName', p))
              throw Kp('cordova-plugin-buildinfo is not installed')
            if ('function' !== typeof N('cordova.plugins.browsertab.openUrl', p))
              throw Kp('cordova-plugin-browsertab is not installed')
            if ('function' !== typeof N('cordova.InAppBrowser.open', p))
              throw Kp('cordova-plugin-inappbrowser is not installed')
          },
          function () {
            throw new P('cordova-not-ready')
          }
        ))
  }
  var Lp = function () {
      for (var a = 20, b = []; 0 < a; )
        b.push(
          '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(
            Math.floor(62 * Math.random())
          )
        ),
          a--
      return b.join('')
    },
    Mp = function (a) {
      var b = new yi()
      b.update(a)
      return li(b.digest())
    }
  k = Jp.prototype
  k.Ee = function (a, b) {
    b(new P('operation-not-supported-in-this-environment'))
    return F()
  }
  k.ve = function () {
    return G(new P('operation-not-supported-in-this-environment'))
  }
  k.Tj = function () {
    return !1
  }
  k.Oj = function () {
    return !0
  }
  k.Ji = function () {
    return !0
  }
  k.we = function (a, b, c, d) {
    if (this.Gf) return G(new P('redirect-operation-pending'))
    var e = this,
      f = p.document,
      g = null,
      h = null,
      l = null,
      m = null
    return (this.Gf = F()
      .then(function () {
        Em(b)
        return Np(e)
      })
      .then(function () {
        return Op(e, a, b, c, d)
      })
      .then(function () {
        return new E(function (q, x) {
          h = function () {
            var z = N('cordova.plugins.browsertab.close', p)
            q()
            'function' === typeof z && z()
            e.je && 'function' === typeof e.je.close && (e.je.close(), (e.je = null))
            return !1
          }
          e.Dc(h)
          l = function () {
            g ||
              (g = Jj(e.Pl).then(function () {
                x(new P('redirect-cancelled-by-user'))
              }))
          }
          m = function () {
            gl() && l()
          }
          f.addEventListener('resume', l, !1)
          xk()
            .toLowerCase()
            .match(/android/) || f.addEventListener('visibilitychange', m, !1)
        }).l(function (q) {
          return Pp(e).then(function () {
            throw q
          })
        })
      })
      .Bc(function () {
        l && f.removeEventListener('resume', l, !1)
        m && f.removeEventListener('visibilitychange', m, !1)
        g && g.cancel()
        h && e.Id(h)
        e.Gf = null
      }))
  }
  var Op = function (a, b, c, d, e) {
    var f = Lp(),
      g = new Bl(b, d, null, f, new P('no-auth-event'), null, e),
      h = N('BuildInfo.packageName', p)
    if ('string' !== typeof h) throw new P('invalid-cordova-configuration')
    var l = N('BuildInfo.displayName', p),
      m = {}
    if (
      xk()
        .toLowerCase()
        .match(/iphone|ipad|ipod/)
    )
      m.ibi = h
    else if (
      xk()
        .toLowerCase()
        .match(/android/)
    )
      m.apn = h
    else return G(new P('operation-not-supported-in-this-environment'))
    l && (m.appDisplayName = l)
    f = Mp(f)
    m.sessionId = f
    var q = bo(a.ya, a.ha, a.ka, b, c, null, d, a.Fc, m, a.Ia, e, a.N)
    return a
      .Oc()
      .then(function () {
        var x = a.Rj
        return a.fm.O.set(Ap, g.T(), x)
      })
      .then(function () {
        var x = N('cordova.plugins.browsertab.isAvailable', p)
        if ('function' !== typeof x) throw new P('invalid-cordova-configuration')
        var z = null
        x(function (R) {
          if (R) {
            z = N('cordova.plugins.browsertab.openUrl', p)
            if ('function' !== typeof z) throw new P('invalid-cordova-configuration')
            z(q)
          } else {
            z = N('cordova.InAppBrowser.open', p)
            if ('function' !== typeof z) throw new P('invalid-cordova-configuration')
            R = z
            var Ca = xk()
            Ca = !(
              !Ca.match(/(iPad|iPhone|iPod).*OS 7_\d/i) && !Ca.match(/(iPad|iPhone|iPod).*OS 8_\d/i)
            )
            a.je = R(q, Ca ? '_blank' : '_system', 'location=yes')
          }
        })
      })
  }
  Jp.prototype.Yd = function (a) {
    for (var b = 0; b < this.Wb.length; b++)
      try {
        this.Wb[b](a)
      } catch (c) {}
  }
  var Np = function (a) {
      a.Pg ||
        (a.Pg = a.Oc().then(function () {
          return new E(function (b) {
            var c = function (d) {
              b(d)
              a.Id(c)
              return !1
            }
            a.Dc(c)
            Qp(a)
          })
        }))
      return a.Pg
    },
    Pp = function (a) {
      var b = null
      return Bp(a.Ci)
        .then(function (c) {
          b = c
          return Cp(a.Ci)
        })
        .then(function () {
          return b
        })
    },
    Qp = function (a) {
      var b = new Bl('unknown', null, null, null, new P('no-auth-event')),
        c = !1,
        d = Jj(a.rl).then(function () {
          return Pp(a).then(function () {
            c || a.Yd(b)
          })
        }),
        e = function (g) {
          c = !0
          d && d.cancel()
          Pp(a).then(function (h) {
            var l = b
            if (h && g && g.url) {
              var m = null
              l = Kl(g.url)
              ;-1 != l.indexOf('/__/auth/callback') &&
                ((m = M(l)),
                (m = cl(ok(m, 'firebaseError') || null)),
                (m = (m = 'object' === typeof m ? Al(m) : null)
                  ? new Bl(h.getType(), h.Ja, null, null, m, null, h.ma)
                  : new Bl(h.getType(), h.Ja, l, h.fe(), null, null, h.ma)))
              l = m || b
            }
            a.Yd(l)
          })
        },
        f = p.handleOpenURL
      p.handleOpenURL = function (g) {
        0 == g.toLowerCase().indexOf(N('BuildInfo.packageName', p).toLowerCase() + '://') &&
          e({ url: g })
        if ('function' === typeof f)
          try {
            f(g)
          } catch (h) {
            console.error(h)
          }
      }
      Ip || (Ip = new Hp())
      Ip.subscribe(e)
    }
  Jp.prototype.Dc = function (a) {
    this.Wb.push(a)
    Np(this).l(function (b) {
      'auth/invalid-cordova-configuration' === b.code &&
        ((b = new Bl('unknown', null, null, null, new P('no-auth-event'))), a(b))
    })
  }
  Jp.prototype.Id = function (a) {
    Ra(this.Wb, function (b) {
      return b == a
    })
  }
  var Rp = function (a) {
      this.V = a
      this.O = up()
    },
    Tp = function (a) {
      return a.O.set(Sp, 'pending', a.V)
    },
    Up = function (a) {
      return a.O.remove(Sp, a.V)
    },
    Vp = function (a) {
      return a.O.get(Sp, a.V).then(function (b) {
        return 'pending' == b
      })
    },
    Sp = { name: 'pendingRedirect', ua: 'session' }
  var $p = function (a, b, c, d) {
      this.If = {}
      this.Ug = 0
      this.ya = a
      this.ha = b
      this.ka = c
      this.N = d
      this.Ge = []
      this.xd = !1
      this.lg = u(this.Jg, this)
      this.wc = new Wp(this)
      this.jh = new Xp(this)
      this.te = new Rp(Yp(this.ha, this.ka))
      this.Cc = {}
      this.Cc.unknown = this.wc
      this.Cc.signInViaRedirect = this.wc
      this.Cc.linkViaRedirect = this.wc
      this.Cc.reauthViaRedirect = this.wc
      this.Cc.signInViaPopup = this.jh
      this.Cc.linkViaPopup = this.jh
      this.Cc.reauthViaPopup = this.jh
      this.rb = Zp(this.ya, this.ha, this.ka, wk, this.N)
    },
    Zp = function (a, b, c, d, e) {
      var f = firebase.SDK_VERSION || null
      return Mk() ? new Jp(a, b, c, f, d, e) : new Yn(a, b, c, f, d, e)
    }
  $p.prototype.reset = function () {
    this.xd = !1
    this.rb.Id(this.lg)
    this.rb = Zp(this.ya, this.ha, this.ka, null, this.N)
    this.If = {}
  }
  $p.prototype.jd = function () {
    this.wc.jd()
  }
  $p.prototype.initialize = function () {
    var a = this
    this.xd || ((this.xd = !0), this.rb.Dc(this.lg))
    var b = this.rb
    return this.rb.Oc().l(function (c) {
      a.rb == b && a.reset()
      throw c
    })
  }
  var cq = function (a) {
    a.rb.Oj() &&
      a.initialize().l(function (b) {
        var c = new Bl(
          'unknown',
          null,
          null,
          null,
          new P('operation-not-supported-in-this-environment')
        )
        aq(b) && a.Jg(c)
      })
    a.rb.Ji() || bq(a.wc)
  }
  k = $p.prototype
  k.subscribe = function (a) {
    Oa(this.Ge, a) || this.Ge.push(a)
    if (!this.xd) {
      var b = this
      Vp(this.te)
        .then(function (c) {
          c
            ? Up(b.te).then(function () {
                b.initialize().l(function (d) {
                  var e = new Bl(
                    'unknown',
                    null,
                    null,
                    null,
                    new P('operation-not-supported-in-this-environment')
                  )
                  aq(d) && b.Jg(e)
                })
              })
            : cq(b)
        })
        .l(function () {
          cq(b)
        })
    }
  }
  k.unsubscribe = function (a) {
    Ra(this.Ge, function (b) {
      return b == a
    })
  }
  k.Jg = function (a) {
    if (!a) throw new P('invalid-auth-event')
    6e5 <= Date.now() - this.Ug && ((this.If = {}), (this.Ug = 0))
    if (a && a.getUid() && this.If.hasOwnProperty(a.getUid())) return !1
    for (var b = !1, c = 0; c < this.Ge.length; c++) {
      var d = this.Ge[c]
      if (d.bi(a.getType(), a.Ja)) {
        if ((b = this.Cc[a.getType()]))
          b.xj(a, d), a && (a.fe() || a.Ja) && ((this.If[a.getUid()] = !0), (this.Ug = Date.now()))
        b = !0
        break
      }
    }
    bq(this.wc)
    return b
  }
  k.getRedirectResult = function () {
    return this.wc.getRedirectResult()
  }
  k.ve = function (a, b, c, d, e, f) {
    var g = this
    return this.rb.ve(
      a,
      b,
      c,
      function () {
        g.xd || ((g.xd = !0), g.rb.Dc(g.lg))
      },
      function () {
        g.reset()
      },
      d,
      e,
      f
    )
  }
  var aq = function (a) {
    return a && 'auth/cordova-not-ready' == a.code ? !0 : !1
  }
  $p.prototype.we = function (a, b, c, d) {
    var e = this,
      f
    return Tp(this.te).then(function () {
      return e.rb
        .we(a, b, c, d)
        .l(function (g) {
          if (aq(g)) throw new P('operation-not-supported-in-this-environment')
          f = g
          return Up(e.te).then(function () {
            throw f
          })
        })
        .then(function () {
          return e.rb.Tj()
            ? new E(function () {})
            : Up(e.te)
                .then(function () {
                  return e.getRedirectResult()
                })
                .then(function () {})
                .l(function () {})
        })
    })
  }
  $p.prototype.Ee = function (a, b, c, d) {
    return this.rb.Ee(
      c,
      function (e) {
        a.Uc(b, null, e, d)
      },
      dq.get()
    )
  }
  var Yp = function (a, b, c) {
      a = a + ':' + b
      c && (a = a + ':' + c.url)
      return a
    },
    fq = function (a, b, c, d) {
      var e = Yp(b, c, d)
      eq[e] || (eq[e] = new $p(a, b, c, d))
      return eq[e]
    },
    dq = new fl(2e3, 1e4),
    gq = new fl(3e4, 6e4),
    eq = {},
    Wp = function (a) {
      this.O = a
      this.Hd = null
      this.ze = []
      this.ye = []
      this.Gd = null
      this.Uj = this.Ae = !1
    }
  Wp.prototype.reset = function () {
    this.Hd = null
    this.Gd && (this.Gd.cancel(), (this.Gd = null))
  }
  Wp.prototype.xj = function (a, b) {
    if (a) {
      this.reset()
      this.Ae = !0
      var c = a.getType(),
        d = a.Ja,
        e = a.getError() && 'auth/web-storage-unsupported' == a.getError().code,
        f = a.getError() && 'auth/operation-not-supported-in-this-environment' == a.getError().code
      this.Uj = !(!e && !f)
      'unknown' != c || e || f
        ? a.Ab
          ? this.oh(a, b)
          : b.de(c, d)
          ? this.qh(a, b)
          : G(new P('invalid-auth-event'))
        : (hq(this, !1, null, null), F())
    } else G(new P('invalid-auth-event'))
  }
  var bq = function (a) {
    a.Ae || ((a.Ae = !0), hq(a, !1, null, null))
  }
  Wp.prototype.jd = function () {
    this.Ae && !this.Uj && hq(this, !1, null, null)
  }
  Wp.prototype.oh = function (a) {
    hq(this, !0, null, a.getError())
    F()
  }
  Wp.prototype.qh = function (a, b) {
    var c = this,
      d = a.Ja,
      e = a.getType()
    b = b.de(e, d)
    d = a.Od
    e = a.fe()
    var f = a.kh,
      g = a.ma,
      h = !!a.getType().match(/Redirect$/)
    b(d, e, g, f)
      .then(function (l) {
        hq(c, h, l, null)
      })
      .l(function (l) {
        hq(c, h, null, l)
      })
  }
  var iq = function (a, b) {
      a.Hd = function () {
        return G(b)
      }
      if (a.ye.length) for (var c = 0; c < a.ye.length; c++) a.ye[c](b)
    },
    jq = function (a, b) {
      a.Hd = function () {
        return F(b)
      }
      if (a.ze.length) for (var c = 0; c < a.ze.length; c++) a.ze[c](b)
    },
    hq = function (a, b, c, d) {
      b ? (d ? iq(a, d) : jq(a, c)) : jq(a, { user: null })
      a.ze = []
      a.ye = []
    }
  Wp.prototype.getRedirectResult = function () {
    var a = this
    return new E(function (b, c) {
      a.Hd ? a.Hd().then(b, c) : (a.ze.push(b), a.ye.push(c), kq(a))
    })
  }
  var kq = function (a) {
      var b = new P('timeout')
      a.Gd && a.Gd.cancel()
      a.Gd = Jj(gq.get()).then(function () {
        a.Hd || ((a.Ae = !0), hq(a, !0, null, b))
      })
    },
    Xp = function (a) {
      this.O = a
    }
  Xp.prototype.xj = function (a, b) {
    if (a) {
      var c = a.getType(),
        d = a.Ja
      a.Ab ? this.oh(a, b) : b.de(c, d) ? this.qh(a, b) : G(new P('invalid-auth-event'))
    } else G(new P('invalid-auth-event'))
  }
  Xp.prototype.oh = function (a, b) {
    var c = a.Ja,
      d = a.getType()
    b.Uc(d, null, a.getError(), c)
    F()
  }
  Xp.prototype.qh = function (a, b) {
    var c = a.Ja,
      d = a.getType(),
      e = b.de(d, c),
      f = a.Od,
      g = a.fe()
    e(f, g, a.ma, a.kh)
      .then(function (h) {
        b.Uc(d, h, null, c)
      })
      .l(function (h) {
        b.Uc(d, null, h, c)
      })
  }
  var lq = function (a, b, c) {
    var d = b && b.mfaPendingCredential
    if (!d) throw new P('argument-error', 'Internal assert: Invalid MultiFactorResolver')
    this.Qe = a
    this.Ek = Ya(b)
    this.Gl = c
    this.Hj = new Ql(null, d)
    this.Ki = []
    var e = this
    y(b.mfaInfo || [], function (f) {
      ;(f = Fl(f)) && e.Ki.push(f)
    })
    O(this, 'auth', this.Qe)
    O(this, 'session', this.Hj)
    O(this, 'hints', this.Ki)
  }
  lq.prototype.resolveSignIn = function (a) {
    var b = this
    return a.process(this.Qe.o, this.Hj).then(function (c) {
      var d = Ya(b.Ek)
      delete d.mfaInfo
      delete d.mfaPendingCredential
      $a(d, c)
      return b.Gl(d)
    })
  }
  var mq = function (a, b, c, d) {
    P.call(this, 'multi-factor-auth-required', d, b)
    this.Vl = new lq(a, b, c)
    O(this, 'resolver', this.Vl)
  }
  n(mq, P)
  var nq = function (a, b, c) {
    if (a && t(a.serverResponse) && 'auth/multi-factor-auth-required' === a.code)
      try {
        return new mq(b, a.serverResponse, c, a.message)
      } catch (d) {}
    return null
  }
  var oq = function () {}
  oq.prototype.process = function (a, b, c) {
    return 'enroll' == b.type ? pq(this, a, b, c) : qq(this, a, b)
  }
  var pq = function (a, b, c, d) {
      return c.ee().then(function (e) {
        e = { idToken: e }
        'undefined' !== typeof d && (e.displayName = d)
        $a(e, { phoneVerificationInfo: um(a.Xg) })
        return Q(b, In, e)
      })
    },
    qq = function (a, b, c) {
      return c.ee().then(function (d) {
        d = { mfaPendingCredential: d }
        $a(d, { phoneVerificationInfo: um(a.Xg) })
        return Q(b, Jn, d)
      })
    },
    rq = function (a) {
      O(this, 'factorId', a.providerId)
      this.Xg = a
    }
  v(rq, oq)
  var sq = function (a) {
    rq.call(this, a)
    if (this.Xg.providerId != ym.PROVIDER_ID)
      throw new P(
        'argument-error',
        'firebase.auth.PhoneMultiFactorAssertion requires a valid firebase.auth.PhoneAuthCredential'
      )
  }
  v(sq, rq)
  var tq = function (a, b) {
    Ai.call(this, a)
    for (var c in b) this[c] = b[c]
  }
  n(tq, Ai)
  var vq = function (a, b) {
      this.kc = a
      this.Ye = []
      this.um = u(this.fl, this)
      Pi(this.kc, 'userReloaded', this.um)
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
              e = new El(f)
            } catch (g) {}
            d = e
          } else d = null
          d && c.push(d)
        })
      uq(this, c)
    },
    wq = function (a) {
      var b = []
      y(a.mfaInfo || [], function (c) {
        ;(c = Fl(c)) && b.push(c)
      })
      return b
    }
  vq.prototype.fl = function (a) {
    uq(this, wq(a.vm))
  }
  var uq = function (a, b) {
    a.Ye = b
    O(a, 'enrolledFactors', b)
  }
  k = vq.prototype
  k.copy = function (a) {
    uq(this, a.Ye)
  }
  k.getSession = function () {
    return this.kc.getIdToken().then(function (a) {
      return new Ql(a, null)
    })
  }
  k.enroll = function (a, b) {
    var c = this,
      d = this.kc.o
    return this.getSession()
      .then(function (e) {
        return a.process(d, e, b)
      })
      .then(function (e) {
        xq(c.kc, e)
        return c.kc.reload()
      })
  }
  k.unenroll = function (a) {
    var b = this,
      c = 'string' === typeof a ? a : a.uid,
      d = this.kc.o
    return this.kc
      .getIdToken()
      .then(function (e) {
        return Q(d, Nn, { idToken: e, mfaEnrollmentId: c })
      })
      .then(function (e) {
        var f = La(b.Ye, function (g) {
          return g.uid != c
        })
        uq(b, f)
        xq(b.kc, e)
        return b.kc.reload().l(function (g) {
          if ('auth/user-token-expired' != g.code) throw g
        })
      })
  }
  k.T = function () {
    return {
      multiFactor: {
        enrolledFactors: Ma(this.Ye, function (a) {
          return a.T()
        }),
      },
    }
  }
  var yq = function (a) {
    this.o = a
    this.Wa = this.Ta = null
    this.md = Date.now()
  }
  yq.prototype.T = function () {
    return {
      apiKey: this.o.ha,
      refreshToken: this.Ta,
      accessToken: this.Wa && this.Wa.toString(),
      expirationTime: this.md,
    }
  }
  var zq = function (a, b) {
      'undefined' === typeof b && (a.Wa ? ((b = a.Wa), (b = b.Eg - b.kl)) : (b = 0))
      a.md = Date.now() + 1e3 * b
    },
    Aq = function (a, b) {
      a.Wa = Ol(b.idToken || '')
      a.Ta = b.refreshToken
      b = b.expiresIn
      zq(a, 'undefined' !== typeof b ? Number(b) : void 0)
    }
  yq.prototype.copy = function (a) {
    this.Wa = a.Wa
    this.Ta = a.Ta
    this.md = a.md
  }
  var Bq = function (a, b) {
    return Xm(a.o, b)
      .then(function (c) {
        a.Wa = Ol(c.access_token)
        a.Ta = c.refresh_token
        zq(a, c.expires_in)
        return { accessToken: a.Wa.toString(), refreshToken: a.Ta }
      })
      .l(function (c) {
        'auth/user-token-expired' == c.code && (a.Ta = null)
        throw c
      })
  }
  yq.prototype.getToken = function (a) {
    a = !!a
    return this.Wa && !this.Ta
      ? G(new P('user-token-expired'))
      : a || !this.Wa || Date.now() > this.md - 3e4
      ? this.Ta
        ? Bq(this, { grant_type: 'refresh_token', refresh_token: this.Ta })
        : F(null)
      : F({ accessToken: this.Wa.toString(), refreshToken: this.Ta })
  }
  var Cq = function (a, b) {
    this.ii = a || null
    this.Xi = b || null
    rl(this, { lastSignInTime: jl(b || null), creationTime: jl(a || null) })
  }
  Cq.prototype.clone = function () {
    return new Cq(this.ii, this.Xi)
  }
  Cq.prototype.T = function () {
    return { lastLoginAt: this.Xi, createdAt: this.ii }
  }
  var Dq = function (a, b, c, d, e, f) {
      rl(this, {
        uid: a,
        displayName: d || null,
        photoURL: e || null,
        email: c || null,
        phoneNumber: f || null,
        providerId: b,
      })
    },
    S = function (a, b, c) {
      $i.call(this)
      this.Ka = []
      this.ha = a.apiKey
      this.ka = a.appName
      this.ya = a.authDomain || null
      var d = firebase.SDK_VERSION ? Vk('JsCore', firebase.SDK_VERSION) : null
      this.o = new Mm(this.ha, vk(wk), d)
      ;(this.N = a.emulatorConfig || null) && Qm(this.o, this.N)
      this.Ob = new yq(this.o)
      Eq(this, b.idToken)
      Aq(this.Ob, b)
      O(this, 'refreshToken', this.Ob.Ta)
      Fq(this, c || {})
      this.ue = !1
      this.ya && Zk() && (this.W = fq(this.ya, this.ha, this.ka, this.N))
      this.Sf = []
      this.Pb = null
      this.Ed = Gq(this)
      this.Qd = u(this.Lg, this)
      var e = this
      this.Hb = null
      this.mj = function (f) {
        e.Kd(f.languageCode)
      }
      this.Sg = null
      this.kj = function (f) {
        Hq(e, f.emulatorConfig)
      }
      this.zg = null
      this.Da = []
      this.lj = function (f) {
        Iq(e, f.Mk)
      }
      this.Fg = null
      this.zf = new vq(this, c)
      O(this, 'multiFactor', this.zf)
    }
  n(S, $i)
  S.prototype.Kd = function (a) {
    this.Hb = a
    Om(this.o, a)
  }
  var Hq = function (a, b) {
      a.N = b
      Qm(a.o, b)
      a.W &&
        ((b = a.W), (a.W = fq(a.ya, a.ha, a.ka, a.N)), a.ue && (b.unsubscribe(a), a.W.subscribe(a)))
    },
    Jq = function (a, b) {
      a.Sg && Xi(a.Sg, 'languageCodeChanged', a.mj)
      ;(a.Sg = b) && Pi(b, 'languageCodeChanged', a.mj)
    },
    Kq = function (a, b) {
      a.zg && Xi(a.zg, 'emulatorConfigChanged', a.kj)
      ;(a.zg = b) && Pi(b, 'emulatorConfigChanged', a.kj)
    },
    Iq = function (a, b) {
      a.Da = b
      Rm(a.o, firebase.SDK_VERSION ? Vk('JsCore', firebase.SDK_VERSION, a.Da) : null)
    },
    Lq = function (a, b) {
      a.Fg && Xi(a.Fg, 'frameworkChanged', a.lj)
      ;(a.Fg = b) && Pi(b, 'frameworkChanged', a.lj)
    }
  S.prototype.Lg = function () {
    this.Ed.Bd && (this.Ed.stop(), this.Ed.start())
  }
  var Mq = function (a) {
      try {
        return firebase.app(a.ka).auth()
      } catch (b) {
        throw new P(
          'internal-error',
          "No firebase.auth.Auth instance is available for the Firebase App '" + a.ka + "'!"
        )
      }
    },
    Gq = function (a) {
      return new gp(
        function () {
          return a.getIdToken(!0)
        },
        function (b) {
          return b && 'auth/network-request-failed' == b.code ? !0 : !1
        },
        function () {
          var b = a.Ob.md - Date.now() - 3e5
          return 0 < b ? b : 0
        }
      )
    },
    Nq = function (a) {
      a.ld || a.Ed.Bd || (a.Ed.start(), Xi(a, 'tokenChanged', a.Qd), Pi(a, 'tokenChanged', a.Qd))
    },
    Oq = function (a) {
      Xi(a, 'tokenChanged', a.Qd)
      a.Ed.stop()
    },
    Eq = function (a, b) {
      a.Wi = b
      O(a, '_lat', b)
    },
    Pq = function (a, b) {
      Ra(a.Sf, function (c) {
        return c == b
      })
    },
    Qq = function (a) {
      for (var b = [], c = 0; c < a.Sf.length; c++) b.push(a.Sf[c](a))
      return Wf(b).then(function () {
        return a
      })
    },
    Rq = function (a) {
      a.W && !a.ue && ((a.ue = !0), a.W.subscribe(a))
    },
    Fq = function (a, b) {
      rl(a, {
        uid: b.uid,
        displayName: b.displayName || null,
        photoURL: b.photoURL || null,
        email: b.email || null,
        emailVerified: b.emailVerified || !1,
        phoneNumber: b.phoneNumber || null,
        isAnonymous: b.isAnonymous || !1,
        tenantId: b.tenantId || null,
        metadata: new Cq(b.createdAt, b.lastLoginAt),
        providerData: [],
      })
      a.o.ma = a.tenantId
    },
    Sq = function () {},
    Tq = function (a) {
      return F().then(function () {
        if (a.ld) throw new P('app-deleted')
      })
    },
    Uq = function (a) {
      return Ma(a.providerData, function (b) {
        return b.providerId
      })
    },
    Wq = function (a, b) {
      b && (Vq(a, b.providerId), a.providerData.push(b))
    },
    Vq = function (a, b) {
      Ra(a.providerData, function (c) {
        return c.providerId == b
      })
    },
    Xq = function (a, b, c) {
      ;('uid' != b || c) && a.hasOwnProperty(b) && O(a, b, c)
    }
  S.prototype.copy = function (a) {
    var b = this
    b != a &&
      (rl(this, {
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
      a.metadata ? O(this, 'metadata', a.metadata.clone()) : O(this, 'metadata', new Cq()),
      y(a.providerData, function (c) {
        Wq(b, c)
      }),
      this.Ob.copy(a.Ob),
      O(this, 'refreshToken', this.Ob.Ta),
      this.zf.copy(a.zf))
  }
  S.prototype.reload = function () {
    var a = this
    return this.v(
      Tq(this).then(function () {
        return Yq(a)
          .then(function () {
            return Qq(a)
          })
          .then(Sq)
      })
    )
  }
  var Yq = function (a) {
    return a.getIdToken().then(function (b) {
      var c = a.isAnonymous
      return Q(a.o, Kn, { idToken: b })
        .then(u(a.Ll, a))
        .then(function () {
          c || Xq(a, 'isAnonymous', !1)
          return b
        })
    })
  }
  S.prototype.getIdTokenResult = function (a) {
    return this.getIdToken(a).then(function (b) {
      return new Pl(b)
    })
  }
  S.prototype.getIdToken = function (a) {
    var b = this
    return this.v(
      Tq(this)
        .then(function () {
          return b.Ob.getToken(a)
        })
        .then(function (c) {
          if (!c) throw new P('internal-error')
          c.accessToken != b.Wi && (Eq(b, c.accessToken), b.tc())
          Xq(b, 'refreshToken', c.refreshToken)
          return c.accessToken
        })
    )
  }
  var xq = function (a, b) {
    b.idToken &&
      a.Wi != b.idToken &&
      (Aq(a.Ob, b), a.tc(), Eq(a, b.idToken), Xq(a, 'refreshToken', a.Ob.Ta))
  }
  S.prototype.tc = function () {
    this.dispatchEvent(new tq('tokenChanged'))
  }
  S.prototype.Ll = function (a) {
    a = a.users
    if (!a || !a.length) throw new P('internal-error')
    a = a[0]
    Fq(this, {
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
    for (var b = Zq(a), c = 0; c < b.length; c++) Wq(this, b[c])
    Xq(
      this,
      'isAnonymous',
      !(this.email && a.passwordHash) && !(this.providerData && this.providerData.length)
    )
    this.dispatchEvent(new tq('userReloaded', { vm: a }))
  }
  var Zq = function (a) {
    return (a = a.providerUserInfo) && a.length
      ? Ma(a, function (b) {
          return new Dq(b.rawId, b.providerId, b.email, b.displayName, b.photoUrl, b.phoneNumber)
        })
      : []
  }
  S.prototype.reauthenticateAndRetrieveDataWithCredential = function (a) {
    ol(
      'firebase.User.prototype.reauthenticateAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.reauthenticateWithCredential instead.'
    )
    return this.reauthenticateWithCredential(a)
  }
  S.prototype.reauthenticateWithCredential = function (a) {
    var b = this,
      c = null
    return this.v(
      a
        .oe(this.o, this.uid)
        .then(function (d) {
          xq(b, d)
          c = $q(b, d, 'reauthenticate')
          b.Pb = null
          return b.reload()
        })
        .then(function () {
          return c
        }),
      !0
    )
  }
  var ar = function (a, b) {
    return Yq(a).then(function () {
      if (Oa(Uq(a), b))
        return Qq(a).then(function () {
          throw new P('provider-already-linked')
        })
    })
  }
  S.prototype.linkAndRetrieveDataWithCredential = function (a) {
    ol(
      'firebase.User.prototype.linkAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.linkWithCredential instead.'
    )
    return this.linkWithCredential(a)
  }
  S.prototype.linkWithCredential = function (a) {
    var b = this,
      c = null
    return this.v(
      ar(this, a.providerId)
        .then(function () {
          return b.getIdToken()
        })
        .then(function (d) {
          return a.yd(b.o, d)
        })
        .then(function (d) {
          c = $q(b, d, 'link')
          return br(b, d)
        })
        .then(function () {
          return c
        })
    )
  }
  S.prototype.linkWithPhoneNumber = function (a, b) {
    var c = this
    return this.v(
      ar(this, 'phone').then(function () {
        return fp(Mq(c), a, b, u(c.linkWithCredential, c))
      })
    )
  }
  S.prototype.reauthenticateWithPhoneNumber = function (a, b) {
    var c = this
    return this.v(
      F().then(function () {
        return fp(Mq(c), a, b, u(c.reauthenticateWithCredential, c))
      }),
      !0
    )
  }
  var $q = function (a, b, c) {
      var d = Dm(b)
      b = pp(b)
      return sl({ user: a, credential: d, additionalUserInfo: b, operationType: c })
    },
    br = function (a, b) {
      xq(a, b)
      return a.reload().then(function () {
        return a
      })
    }
  k = S.prototype
  k.updateEmail = function (a) {
    var b = this
    return this.v(
      this.getIdToken()
        .then(function (c) {
          return b.o.updateEmail(c, a)
        })
        .then(function (c) {
          xq(b, c)
          return b.reload()
        })
    )
  }
  k.updatePhoneNumber = function (a) {
    var b = this
    return this.v(
      this.getIdToken()
        .then(function (c) {
          return a.yd(b.o, c)
        })
        .then(function (c) {
          xq(b, c)
          return b.reload()
        })
    )
  }
  k.updatePassword = function (a) {
    var b = this
    return this.v(
      this.getIdToken()
        .then(function (c) {
          return b.o.updatePassword(c, a)
        })
        .then(function (c) {
          xq(b, c)
          return b.reload()
        })
    )
  }
  k.updateProfile = function (a) {
    if (void 0 === a.displayName && void 0 === a.photoURL) return Tq(this)
    var b = this
    return this.v(
      this.getIdToken()
        .then(function (c) {
          return b.o.updateProfile(c, { displayName: a.displayName, photoUrl: a.photoURL })
        })
        .then(function (c) {
          xq(b, c)
          Xq(b, 'displayName', c.displayName || null)
          Xq(b, 'photoURL', c.photoUrl || null)
          y(b.providerData, function (d) {
            'password' === d.providerId &&
              (O(d, 'displayName', b.displayName), O(d, 'photoURL', b.photoURL))
          })
          return Qq(b)
        })
        .then(Sq)
    )
  }
  k.unlink = function (a) {
    var b = this
    return this.v(
      Yq(this).then(function (c) {
        return Oa(Uq(b), a)
          ? un(b.o, c, [a]).then(function (d) {
              var e = {}
              y(d.providerUserInfo || [], function (f) {
                e[f.providerId] = !0
              })
              y(Uq(b), function (f) {
                e[f] || Vq(b, f)
              })
              e[ym.PROVIDER_ID] || O(b, 'phoneNumber', null)
              return Qq(b)
            })
          : Qq(b).then(function () {
              throw new P('no-such-provider')
            })
      })
    )
  }
  k.delete = function () {
    var a = this
    return this.v(
      this.getIdToken()
        .then(function (b) {
          return Q(a.o, Hn, { idToken: b })
        })
        .then(function () {
          a.dispatchEvent(new tq('userDeleted'))
        })
    ).then(function () {
      a.destroy()
    })
  }
  k.bi = function (a, b) {
    return ('linkViaPopup' == a && (this.Lb || null) == b && this.Kb) ||
      ('reauthViaPopup' == a && (this.Lb || null) == b && this.Kb) ||
      ('linkViaRedirect' == a && (this.xc || null) == b) ||
      ('reauthViaRedirect' == a && (this.xc || null) == b)
      ? !0
      : !1
  }
  k.Uc = function (a, b, c, d) {
    ;('linkViaPopup' != a && 'reauthViaPopup' != a) ||
      d != (this.Lb || null) ||
      (c && this.Sc ? this.Sc(c) : b && !c && this.Kb && this.Kb(b),
      this.La && (this.La.cancel(), (this.La = null)),
      delete this.Kb,
      delete this.Sc)
  }
  k.de = function (a, b) {
    return 'linkViaPopup' == a && b == (this.Lb || null)
      ? u(this.wi, this)
      : 'reauthViaPopup' == a && b == (this.Lb || null)
      ? u(this.xi, this)
      : 'linkViaRedirect' == a && (this.xc || null) == b
      ? u(this.wi, this)
      : 'reauthViaRedirect' == a && (this.xc || null) == b
      ? u(this.xi, this)
      : null
  }
  k.df = function () {
    return Wk(this.uid + ':::')
  }
  k.linkWithPopup = function (a) {
    var b = this
    return cr(
      this,
      'linkViaPopup',
      a,
      function () {
        return ar(b, a.providerId).then(function () {
          return Qq(b)
        })
      },
      !1
    )
  }
  k.reauthenticateWithPopup = function (a) {
    return cr(
      this,
      'reauthViaPopup',
      a,
      function () {
        return F()
      },
      !0
    )
  }
  var cr = function (a, b, c, d, e) {
    if (!Zk()) return G(new P('operation-not-supported-in-this-environment'))
    if (a.Pb && !e) return G(a.Pb)
    var f = yl(c.providerId),
      g = a.df(),
      h = null
    ;(!$k() || Pk()) &&
      a.ya &&
      c.isOAuthProvider &&
      (h = bo(
        a.ya,
        a.ha,
        a.ka,
        b,
        c,
        null,
        g,
        firebase.SDK_VERSION || null,
        null,
        null,
        a.tenantId,
        a.N
      ))
    var l = Gk(h, f && f.Dd, f && f.Cd)
    d = d()
      .then(function () {
        dr(a)
        if (!e) return a.getIdToken().then(function () {})
      })
      .then(function () {
        return a.W.ve(l, b, c, g, !!h, a.tenantId)
      })
      .then(function () {
        return new E(function (m, q) {
          a.Uc(b, null, new P('cancelled-popup-request'), a.Lb || null)
          a.Kb = m
          a.Sc = q
          a.Lb = g
          a.La = a.W.Ee(a, b, l, g)
        })
      })
      .then(function (m) {
        l && Fk(l)
        return m ? sl(m) : null
      })
      .l(function (m) {
        l && Fk(l)
        throw m
      })
    return a.v(d, e)
  }
  S.prototype.linkWithRedirect = function (a) {
    var b = this
    return er(
      this,
      'linkViaRedirect',
      a,
      function () {
        return ar(b, a.providerId)
      },
      !1
    )
  }
  S.prototype.reauthenticateWithRedirect = function (a) {
    return er(
      this,
      'reauthViaRedirect',
      a,
      function () {
        return F()
      },
      !0
    )
  }
  var er = function (a, b, c, d, e) {
      if (!Zk()) return G(new P('operation-not-supported-in-this-environment'))
      if (a.Pb && !e) return G(a.Pb)
      var f = null,
        g = a.df()
      d = d()
        .then(function () {
          dr(a)
          if (!e) return a.getIdToken().then(function () {})
        })
        .then(function () {
          a.xc = g
          return Qq(a)
        })
        .then(function (h) {
          a.yc && ((h = a.yc), (h = h.O.set(fr, a.T(), h.V)))
          return h
        })
        .then(function () {
          return a.W.we(b, c, g, a.tenantId)
        })
        .l(function (h) {
          f = h
          if (a.yc) return gr(a.yc)
          throw f
        })
        .then(function () {
          if (f) throw f
        })
      return a.v(d, e)
    },
    dr = function (a) {
      if (!a.W || !a.ue) {
        if (a.W && !a.ue) throw new P('internal-error')
        throw new P('auth-domain-config-required')
      }
    }
  k = S.prototype
  k.wi = function (a, b, c, d) {
    var e = this
    this.La && (this.La.cancel(), (this.La = null))
    var f = null
    c = this.getIdToken()
      .then(function (g) {
        return Vl(e.o, { requestUri: a, postBody: d, sessionId: b, idToken: g })
      })
      .then(function (g) {
        f = $q(e, g, 'link')
        return br(e, g)
      })
      .then(function () {
        return f
      })
    return this.v(c)
  }
  k.xi = function (a, b, c, d) {
    var e = this
    this.La && (this.La.cancel(), (this.La = null))
    var f = null,
      g = F()
        .then(function () {
          return Sl(Wl(e.o, { requestUri: a, sessionId: b, postBody: d, tenantId: c }), e.uid)
        })
        .then(function (h) {
          f = $q(e, h, 'reauthenticate')
          xq(e, h)
          e.Pb = null
          return e.reload()
        })
        .then(function () {
          return f
        })
    return this.v(g, !0)
  }
  k.sendEmailVerification = function (a) {
    var b = this,
      c = null
    return this.v(
      this.getIdToken()
        .then(function (d) {
          c = d
          return 'undefined' === typeof a || Xa(a) ? {} : dp(new cp(a))
        })
        .then(function (d) {
          return b.o.sendEmailVerification(c, d)
        })
        .then(function (d) {
          if (b.email != d) return b.reload()
        })
        .then(function () {})
    )
  }
  k.verifyBeforeUpdateEmail = function (a, b) {
    var c = this,
      d = null
    return this.v(
      this.getIdToken()
        .then(function (e) {
          d = e
          return 'undefined' === typeof b || Xa(b) ? {} : dp(new cp(b))
        })
        .then(function (e) {
          return c.o.verifyBeforeUpdateEmail(d, a, e)
        })
        .then(function (e) {
          if (c.email != e) return c.reload()
        })
        .then(function () {})
    )
  }
  k.destroy = function () {
    for (var a = 0; a < this.Ka.length; a++) this.Ka[a].cancel('app-deleted')
    Jq(this, null)
    Kq(this, null)
    Lq(this, null)
    this.Ka = []
    this.ld = !0
    Oq(this)
    O(this, 'refreshToken', null)
    this.W && this.W.unsubscribe(this)
  }
  k.v = function (a, b) {
    var c = this,
      d = hr(this, a, b)
    this.Ka.push(d)
    d.Bc(function () {
      Pa(c.Ka, d)
    })
    return d.l(function (e) {
      var f = null
      e && 'auth/multi-factor-auth-required' === e.code && (f = nq(e.T(), Mq(c), u(c.Kg, c)))
      throw f || e
    })
  }
  k.Kg = function (a) {
    var b = null,
      c = this
    a = Sl(F(a), c.uid)
      .then(function (d) {
        b = $q(c, d, 'reauthenticate')
        xq(c, d)
        c.Pb = null
        return c.reload()
      })
      .then(function () {
        return b
      })
    return this.v(a, !0)
  }
  var hr = function (a, b, c) {
    return a.Pb && !c
      ? (b.cancel(), G(a.Pb))
      : b.l(function (d) {
          !d ||
            ('auth/user-disabled' != d.code && 'auth/user-token-expired' != d.code) ||
            (a.Pb || a.dispatchEvent(new tq('userInvalidated')), (a.Pb = d))
          throw d
        })
  }
  S.prototype.toJSON = function () {
    return this.T()
  }
  S.prototype.T = function () {
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
      apiKey: this.ha,
      appName: this.ka,
      authDomain: this.ya,
      stsTokenManager: this.Ob.T(),
      redirectEventId: this.xc || null,
    }
    this.metadata && $a(a, this.metadata.T())
    y(this.providerData, function (b) {
      var c = a.providerData,
        d = c.push,
        e = {},
        f
      for (f in b) b.hasOwnProperty(f) && (e[f] = b[f])
      d.call(c, e)
    })
    $a(a, this.zf.T())
    return a
  }
  var ir = function (a) {
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
      var e = new S(b, c, a)
      a.providerData &&
        y(a.providerData, function (f) {
          f && Wq(e, sl(f))
        })
      a.redirectEventId && (e.xc = a.redirectEventId)
      return e
    },
    jr = function (a, b, c, d) {
      var e = new S(a, b)
      c && (e.yc = c)
      d && Iq(e, d)
      return e.reload().then(function () {
        return e
      })
    },
    kr = function (a, b, c, d) {
      b = b || { apiKey: a.ha, authDomain: a.ya, appName: a.ka }
      var e = a.Ob,
        f = {}
      f.idToken = e.Wa && e.Wa.toString()
      f.refreshToken = e.Ta
      b = new S(b, f)
      c && (b.yc = c)
      d && Iq(b, d)
      b.copy(a)
      return b
    }
  O(S.prototype, 'providerId', 'firebase')
  var lr = function (a) {
      this.V = a
      this.O = up()
    },
    gr = function (a) {
      return a.O.remove(fr, a.V)
    },
    mr = function (a, b) {
      return a.O.get(fr, a.V).then(function (c) {
        c && b && (c.authDomain = b)
        return ir(c || {})
      })
    },
    fr = { name: 'redirectUser', ua: 'session' }
  var or = function (a) {
    this.V = a
    this.O = up()
    this.Xa = null
    this.ah = this.Qg()
    this.O.addListener(nr('local'), this.V, u(this.nm, this))
  }
  or.prototype.nm = function () {
    var a = this,
      b = nr('local')
    pr(this, function () {
      return F()
        .then(function () {
          return a.Xa && 'local' != a.Xa.ua ? a.O.get(b, a.V) : null
        })
        .then(function (c) {
          if (c)
            return qr(a, 'local').then(function () {
              a.Xa = b
            })
        })
    })
  }
  var qr = function (a, b) {
    var c = [],
      d
    for (d in qp) qp[d] !== b && c.push(a.O.remove(nr(qp[d]), a.V))
    c.push(a.O.remove(rr, a.V))
    return Vf(c)
  }
  or.prototype.Qg = function () {
    var a = this,
      b = nr('local'),
      c = nr('session'),
      d = nr('none')
    return wp(this.O, b, this.V)
      .then(function () {
        return a.O.get(c, a.V)
      })
      .then(function (e) {
        return e
          ? c
          : a.O.get(d, a.V).then(function (f) {
              return f
                ? d
                : a.O.get(b, a.V).then(function (g) {
                    return g
                      ? b
                      : a.O.get(rr, a.V).then(function (h) {
                          return h ? nr(h) : b
                        })
                  })
            })
      })
      .then(function (e) {
        a.Xa = e
        return qr(a, e.ua)
      })
      .l(function () {
        a.Xa || (a.Xa = b)
      })
  }
  var nr = function (a) {
    return { name: 'authUser', ua: a }
  }
  or.prototype.setPersistence = function (a) {
    var b = null,
      c = this
    rp(a)
    return pr(this, function () {
      return a != c.Xa.ua
        ? c.O.get(c.Xa, c.V)
            .then(function (d) {
              b = d
              return qr(c, a)
            })
            .then(function () {
              c.Xa = nr(a)
              if (b) return c.O.set(c.Xa, b, c.V)
            })
        : F()
    })
  }
  var sr = function (a) {
      return pr(a, function () {
        return a.O.set(rr, a.Xa.ua, a.V)
      })
    },
    tr = function (a, b) {
      return pr(a, function () {
        return a.O.set(a.Xa, b.T(), a.V)
      })
    },
    ur = function (a) {
      return pr(a, function () {
        return a.O.remove(a.Xa, a.V)
      })
    },
    vr = function (a, b, c) {
      return pr(a, function () {
        return a.O.get(a.Xa, a.V).then(function (d) {
          d && b && (d.authDomain = b)
          d && c && (d.emulatorConfig = c)
          return ir(d || {})
        })
      })
    },
    pr = function (a, b) {
      a.ah = a.ah.then(b, b)
      return a.ah
    },
    rr = { name: 'persistence', ua: 'session' }
  var T = function (a) {
    $i.call(this)
    this.yb = !1
    this.Lj = new bp()
    O(this, 'settings', this.Lj)
    O(this, 'app', a)
    if (this.U().options && this.U().options.apiKey)
      (a = firebase.SDK_VERSION ? Vk('JsCore', firebase.SDK_VERSION) : null),
        (this.o = new Mm(this.U().options && this.U().options.apiKey, vk(wk), a))
    else throw new P('invalid-api-key')
    this.Ka = []
    this.Ec = []
    this.Pd = []
    this.Fl = firebase.INTERNAL.createSubscribe(u(this.ol, this))
    this.Me = void 0
    this.Il = firebase.INTERNAL.createSubscribe(u(this.ql, this))
    wr(this, null)
    a = this.U().options.apiKey
    var b = this.U().name
    this.Qb = new or(a + ':' + b)
    a = this.U().options.apiKey
    b = this.U().name
    this.Tc = new lr(a + ':' + b)
    this.Pe = this.v(xr(this))
    this.Mb = this.v(yr(this))
    this.vf = !1
    this.Ig = u(this.om, this)
    this.Yj = u(this.qc, this)
    this.Qd = u(this.Lg, this)
    this.Wj = u(this.bl, this)
    this.Xj = u(this.dl, this)
    this.W = null
    zr(this)
    this.INTERNAL = {}
    this.INTERNAL['delete'] = u(this.delete, this)
    this.INTERNAL.logFramework = u(this.yl, this)
    this.Jc = 0
    Ar(this)
    this.Da = []
    this.N = null
  }
  n(T, $i)
  T.prototype.setPersistence = function (a) {
    a = this.Qb.setPersistence(a)
    return this.v(a)
  }
  T.prototype.Kd = function (a) {
    this.Hb === a ||
      this.yb ||
      ((this.Hb = a), Om(this.o, this.Hb), this.dispatchEvent(new Br(this.Hb)))
  }
  T.prototype.useDeviceLanguage = function () {
    var a = p.navigator
    this.Kd(a ? (a.languages && a.languages[0]) || a.language || a.userLanguage || null : null)
  }
  T.prototype.useEmulator = function (a, b) {
    if (!this.N) {
      if (this.W)
        throw new P(
          'argument-error',
          'useEmulator() must be called immediately following firebase.auth() initialization.'
        )
      b = b ? !!b.disableWarnings : !1
      Cr(b)
      this.N = { url: a, disableWarnings: b }
      this.Lj.jg = !0
      Qm(this.o, this.N)
      this.dispatchEvent(new Dr(this.N))
    }
  }
  var Cr = function (a) {
    'undefined' !== typeof console &&
      'function' === typeof console.info &&
      console.info(
        'WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.'
      )
    p.document &&
      !a &&
      Lk().then(function () {
        var b = p.document.createElement('p')
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
        p.document.body.appendChild(b)
      })
  }
  T.prototype.yl = function (a) {
    this.Da.push(a)
    Rm(this.o, firebase.SDK_VERSION ? Vk('JsCore', firebase.SDK_VERSION, this.Da) : null)
    this.dispatchEvent(new Er(this.Da))
  }
  T.prototype.Gh = function (a) {
    this.ma === a || this.yb || ((this.ma = a), (this.o.ma = this.ma))
  }
  var Ar = function (a) {
    Object.defineProperty(a, 'lc', {
      get: function () {
        return this.Hb
      },
      set: function (b) {
        this.Kd(b)
      },
      enumerable: !1,
    })
    a.Hb = null
    Object.defineProperty(a, 'ti', {
      get: function () {
        return this.ma
      },
      set: function (b) {
        this.Gh(b)
      },
      enumerable: !1,
    })
    a.ma = null
    Object.defineProperty(a, 'emulatorConfig', {
      get: function () {
        if (this.N) {
          var b = M(this.N.url)
          b = sl({
            protocol: b.Va,
            host: b.Ga,
            port: b.Ub,
            options: sl({ disableWarnings: this.N.disableWarnings }),
          })
        } else b = null
        return b
      },
      enumerable: !1,
    })
  }
  T.prototype.toJSON = function () {
    return {
      apiKey: this.U().options.apiKey,
      authDomain: this.U().options.authDomain,
      appName: this.U().name,
      currentUser: U(this) && U(this).T(),
    }
  }
  var Fr = function (a) {
      return a.Fk || G(new P('auth-domain-config-required'))
    },
    zr = function (a) {
      var b = a.U().options.authDomain,
        c = a.U().options.apiKey
      b &&
        Zk() &&
        (a.Fk = a.Pe.then(function () {
          if (!a.yb) {
            a.W = fq(b, c, a.U().name, a.N)
            a.W.subscribe(a)
            U(a) && Rq(U(a))
            if (a.zc) {
              Rq(a.zc)
              var d = a.zc
              d.Kd(a.Hb)
              Jq(d, a)
              d = a.zc
              Iq(d, a.Da)
              Lq(d, a)
              d = a.zc
              Hq(d, a.N)
              Kq(d, a)
              a.zc = null
            }
            return a.W
          }
        }))
    }
  k = T.prototype
  k.bi = function (a, b) {
    switch (a) {
      case 'unknown':
      case 'signInViaRedirect':
        return !0
      case 'signInViaPopup':
        return this.Lb == b && !!this.Kb
      default:
        return !1
    }
  }
  k.Uc = function (a, b, c, d) {
    'signInViaPopup' == a &&
      this.Lb == d &&
      (c && this.Sc ? this.Sc(c) : b && !c && this.Kb && this.Kb(b),
      this.La && (this.La.cancel(), (this.La = null)),
      delete this.Kb,
      delete this.Sc)
  }
  k.de = function (a, b) {
    return 'signInViaRedirect' == a || ('signInViaPopup' == a && this.Lb == b && this.Kb)
      ? u(this.Jk, this)
      : null
  }
  k.Jk = function (a, b, c, d) {
    var e = this,
      f = { requestUri: a, postBody: d, sessionId: b, tenantId: c }
    this.La && (this.La.cancel(), (this.La = null))
    return e.Pe.then(function () {
      return Gr(e, Ul(e.o, f))
    })
  }
  k.df = function () {
    return Wk()
  }
  k.signInWithPopup = function (a) {
    if (!Zk()) return G(new P('operation-not-supported-in-this-environment'))
    var b = this,
      c = yl(a.providerId),
      d = this.df(),
      e = null
    ;(!$k() || Pk()) &&
      this.U().options.authDomain &&
      a.isOAuthProvider &&
      (e = bo(
        this.U().options.authDomain,
        this.U().options.apiKey,
        this.U().name,
        'signInViaPopup',
        a,
        null,
        d,
        firebase.SDK_VERSION || null,
        null,
        null,
        this.ma,
        this.N
      ))
    var f = Gk(e, c && c.Dd, c && c.Cd)
    c = Fr(this)
      .then(function (g) {
        return g.ve(f, 'signInViaPopup', a, d, !!e, b.ma)
      })
      .then(function () {
        return new E(function (g, h) {
          b.Uc('signInViaPopup', null, new P('cancelled-popup-request'), b.Lb)
          b.Kb = g
          b.Sc = h
          b.Lb = d
          b.La = b.W.Ee(b, 'signInViaPopup', f, d)
        })
      })
      .then(function (g) {
        f && Fk(f)
        return g ? sl(g) : null
      })
      .l(function (g) {
        f && Fk(f)
        throw g
      })
    return this.v(c)
  }
  k.signInWithRedirect = function (a) {
    if (!Zk()) return G(new P('operation-not-supported-in-this-environment'))
    var b = this,
      c = Fr(this)
        .then(function () {
          return sr(b.Qb)
        })
        .then(function () {
          return b.W.we('signInViaRedirect', a, void 0, b.ma)
        })
    return this.v(c)
  }
  var Hr = function (a) {
    if (!Zk()) return G(new P('operation-not-supported-in-this-environment'))
    var b = Fr(a)
      .then(function () {
        return a.W.getRedirectResult()
      })
      .then(function (c) {
        return c ? sl(c) : null
      })
    return a.v(b)
  }
  T.prototype.getRedirectResult = function () {
    var a = this
    return Hr(this)
      .then(function (b) {
        a.W && a.W.jd()
        return b
      })
      .l(function (b) {
        a.W && a.W.jd()
        throw b
      })
  }
  T.prototype.updateCurrentUser = function (a) {
    if (!a) return G(new P('null-user'))
    if (this.ma != a.tenantId) return G(new P('tenant-id-mismatch'))
    var b = this,
      c = {}
    c.apiKey = this.U().options.apiKey
    c.authDomain = this.U().options.authDomain
    c.appName = this.U().name
    var d = kr(a, c, b.Tc, Sa(b.Da))
    return this.v(
      this.Mb.then(function () {
        if (b.U().options.apiKey != a.ha) return d.reload()
      })
        .then(function () {
          if (U(b) && a.uid == U(b).uid) return U(b).copy(a), b.qc(a)
          wr(b, d)
          Rq(d)
          return b.qc(d)
        })
        .then(function () {
          b.tc()
        })
    )
  }
  var Ir = function (a, b) {
      var c = {}
      c.apiKey = a.U().options.apiKey
      c.authDomain = a.U().options.authDomain
      c.appName = a.U().name
      a.N && (c.emulatorConfig = a.N)
      return a.Pe.then(function () {
        return jr(c, b, a.Tc, Sa(a.Da))
      })
        .then(function (d) {
          if (U(a) && d.uid == U(a).uid) return U(a).copy(d), a.qc(d)
          wr(a, d)
          Rq(d)
          return a.qc(d)
        })
        .then(function () {
          a.tc()
        })
    },
    wr = function (a, b) {
      U(a) &&
        (Pq(U(a), a.Yj),
        Xi(U(a), 'tokenChanged', a.Qd),
        Xi(U(a), 'userDeleted', a.Wj),
        Xi(U(a), 'userInvalidated', a.Xj),
        Oq(U(a)))
      b &&
        (b.Sf.push(a.Yj),
        Pi(b, 'tokenChanged', a.Qd),
        Pi(b, 'userDeleted', a.Wj),
        Pi(b, 'userInvalidated', a.Xj),
        0 < a.Jc && Nq(b))
      O(a, 'currentUser', b)
      b && (b.Kd(a.Hb), Jq(b, a), Iq(b, a.Da), Lq(b, a), Hq(b, a.N), Kq(b, a))
    }
  T.prototype.signOut = function () {
    var a = this,
      b = this.Mb.then(function () {
        a.W && a.W.jd()
        if (!U(a)) return F()
        wr(a, null)
        return ur(a.Qb).then(function () {
          a.tc()
        })
      })
    return this.v(b)
  }
  var Jr = function (a) {
      var b = a.U().options.authDomain
      b = mr(a.Tc, b).then(function (c) {
        if ((a.zc = c)) c.yc = a.Tc
        return gr(a.Tc)
      })
      return a.v(b)
    },
    xr = function (a) {
      var b = a.U().options.authDomain,
        c = Jr(a)
          .then(function () {
            return vr(a.Qb, b, a.N)
          })
          .then(function (d) {
            return d
              ? ((d.yc = a.Tc),
                a.zc && (a.zc.xc || null) == (d.xc || null)
                  ? d
                  : d
                      .reload()
                      .then(function () {
                        return tr(a.Qb, d).then(function () {
                          return d
                        })
                      })
                      .l(function (e) {
                        return 'auth/network-request-failed' == e.code ? d : ur(a.Qb)
                      }))
              : null
          })
          .then(function (d) {
            wr(a, d || null)
          })
      return a.v(c)
    },
    yr = function (a) {
      return a.Pe.then(function () {
        return Hr(a)
      })
        .l(function () {})
        .then(function () {
          if (!a.yb) return a.Ig()
        })
        .l(function () {})
        .then(function () {
          if (!a.yb) {
            a.vf = !0
            var b = a.Qb
            b.O.addListener(nr('local'), b.V, a.Ig)
          }
        })
    }
  k = T.prototype
  k.om = function () {
    var a = this,
      b = this.U().options.authDomain
    return vr(this.Qb, b).then(function (c) {
      if (!a.yb) {
        var d
        if ((d = U(a) && c)) {
          d = U(a).uid
          var e = c.uid
          d =
            void 0 === d || null === d || '' === d || void 0 === e || null === e || '' === e
              ? !1
              : d == e
        }
        if (d) return U(a).copy(c), U(a).getIdToken()
        if (U(a) || c) wr(a, c), c && (Rq(c), (c.yc = a.Tc)), a.W && a.W.subscribe(a), a.tc()
      }
    })
  }
  k.qc = function (a) {
    return tr(this.Qb, a)
  }
  k.Lg = function () {
    this.tc()
    this.qc(U(this))
  }
  k.bl = function () {
    this.signOut()
  }
  k.dl = function () {
    this.signOut()
  }
  var Gr = function (a, b) {
    var c = null,
      d = null
    return a.v(
      b
        .then(
          function (e) {
            c = Dm(e)
            d = pp(e)
            return Ir(a, e)
          },
          function (e) {
            var f = null
            e && 'auth/multi-factor-auth-required' === e.code && (f = nq(e.T(), a, u(a.Kg, a)))
            throw f || e
          }
        )
        .then(function () {
          return sl({ user: U(a), credential: c, additionalUserInfo: d, operationType: 'signIn' })
        })
    )
  }
  k = T.prototype
  k.Kg = function (a) {
    var b = this
    return this.Mb.then(function () {
      return Gr(b, F(a))
    })
  }
  k.ol = function (a) {
    var b = this
    this.addAuthTokenListener(function () {
      a.next(U(b))
    })
  }
  k.ql = function (a) {
    var b = this
    Kr(this, function () {
      a.next(U(b))
    })
  }
  k.onIdTokenChanged = function (a, b, c) {
    var d = this
    this.vf &&
      firebase.Promise.resolve().then(function () {
        'function' === typeof a ? a(U(d)) : 'function' === typeof a.next && a.next(U(d))
      })
    return this.Fl(a, b, c)
  }
  k.onAuthStateChanged = function (a, b, c) {
    var d = this
    this.vf &&
      firebase.Promise.resolve().then(function () {
        d.Me = d.getUid()
        'function' === typeof a ? a(U(d)) : 'function' === typeof a.next && a.next(U(d))
      })
    return this.Il(a, b, c)
  }
  k.Ok = function (a) {
    var b = this,
      c = this.Mb.then(function () {
        return U(b)
          ? U(b)
              .getIdToken(a)
              .then(function (d) {
                return { accessToken: d }
              })
          : null
      })
    return this.v(c)
  }
  k.signInWithCustomToken = function (a) {
    var b = this
    return this.Mb.then(function () {
      return Gr(b, Q(b.o, Mn, { token: a }))
    }).then(function (c) {
      var d = c.user
      Xq(d, 'isAnonymous', !1)
      b.qc(d)
      return c
    })
  }
  k.signInWithEmailAndPassword = function (a, b) {
    var c = this
    return this.Mb.then(function () {
      return Gr(c, Q(c.o, nm, { email: a, password: b }))
    })
  }
  k.createUserWithEmailAndPassword = function (a, b) {
    var c = this
    return this.Mb.then(function () {
      return Gr(c, Q(c.o, Gn, { email: a, password: b }))
    })
  }
  k.signInWithCredential = function (a) {
    var b = this
    return this.Mb.then(function () {
      return Gr(b, a.Lc(b.o))
    })
  }
  k.signInAndRetrieveDataWithCredential = function (a) {
    ol(
      'firebase.auth.Auth.prototype.signInAndRetrieveDataWithCredential is deprecated. Please use firebase.auth.Auth.prototype.signInWithCredential instead.'
    )
    return this.signInWithCredential(a)
  }
  k.signInAnonymously = function () {
    var a = this
    return this.Mb.then(function () {
      var b = U(a)
      if (b && b.isAnonymous) {
        var c = sl({ providerId: null, isNewUser: !1 })
        return sl({ user: b, credential: null, additionalUserInfo: c, operationType: 'signIn' })
      }
      return Gr(a, a.o.signInAnonymously()).then(function (d) {
        var e = d.user
        Xq(e, 'isAnonymous', !0)
        a.qc(e)
        return d
      })
    })
  }
  k.U = function () {
    return this.app
  }
  var U = function (a) {
    return a.currentUser
  }
  T.prototype.getUid = function () {
    return (U(this) && U(this).uid) || null
  }
  var Lr = function (a) {
    return (U(a) && U(a)._lat) || null
  }
  k = T.prototype
  k.tc = function () {
    if (this.vf) {
      for (var a = 0; a < this.Ec.length; a++) if (this.Ec[a]) this.Ec[a](Lr(this))
      if (this.Me !== this.getUid() && this.Pd.length)
        for (this.Me = this.getUid(), a = 0; a < this.Pd.length; a++)
          if (this.Pd[a]) this.Pd[a](Lr(this))
    }
  }
  k.kk = function (a) {
    this.addAuthTokenListener(a)
    this.Jc++
    0 < this.Jc && U(this) && Nq(U(this))
  }
  k.Ql = function (a) {
    var b = this
    y(this.Ec, function (c) {
      c == a && b.Jc--
    })
    0 > this.Jc && (this.Jc = 0)
    0 == this.Jc && U(this) && Oq(U(this))
    this.removeAuthTokenListener(a)
  }
  k.addAuthTokenListener = function (a) {
    var b = this
    this.Ec.push(a)
    this.v(
      this.Mb.then(function () {
        b.yb || (Oa(b.Ec, a) && a(Lr(b)))
      })
    )
  }
  k.removeAuthTokenListener = function (a) {
    Ra(this.Ec, function (b) {
      return b == a
    })
  }
  var Kr = function (a, b) {
    a.Pd.push(b)
    a.v(
      a.Mb.then(function () {
        !a.yb && Oa(a.Pd, b) && a.Me !== a.getUid() && ((a.Me = a.getUid()), b(Lr(a)))
      })
    )
  }
  k = T.prototype
  k.delete = function () {
    this.yb = !0
    for (var a = 0; a < this.Ka.length; a++) this.Ka[a].cancel('app-deleted')
    this.Ka = []
    this.Qb && ((a = this.Qb), a.O.removeListener(nr('local'), a.V, this.Ig))
    this.W && (this.W.unsubscribe(this), this.W.jd())
    return firebase.Promise.resolve()
  }
  k.v = function (a) {
    var b = this
    this.Ka.push(a)
    a.Bc(function () {
      Pa(b.Ka, a)
    })
    return a
  }
  k.fetchSignInMethodsForEmail = function (a) {
    return this.v(bn(this.o, a))
  }
  k.isSignInWithEmailLink = function (a) {
    return !!rm(a)
  }
  k.sendSignInLinkToEmail = function (a, b) {
    var c = this
    return this.v(
      F()
        .then(function () {
          var d = new cp(b)
          if (!d.ci)
            throw new P(
              'argument-error',
              'handleCodeInApp must be true when sending sign in link to email'
            )
          return dp(d)
        })
        .then(function (d) {
          return c.o.sendSignInLinkToEmail(a, d)
        })
        .then(function () {})
    )
  }
  k.verifyPasswordResetCode = function (a) {
    return this.checkActionCode(a).then(function (b) {
      return b.data.email
    })
  }
  k.confirmPasswordReset = function (a, b) {
    return this.v(this.o.confirmPasswordReset(a, b).then(function () {}))
  }
  k.checkActionCode = function (a) {
    return this.v(
      this.o.checkActionCode(a).then(function (b) {
        return new Gl(b)
      })
    )
  }
  k.applyActionCode = function (a) {
    return this.v(this.o.applyActionCode(a).then(function () {}))
  }
  k.sendPasswordResetEmail = function (a, b) {
    var c = this
    return this.v(
      F()
        .then(function () {
          return 'undefined' === typeof b || Xa(b) ? {} : dp(new cp(b))
        })
        .then(function (d) {
          return c.o.sendPasswordResetEmail(a, d)
        })
        .then(function () {})
    )
  }
  k.signInWithPhoneNumber = function (a, b) {
    return this.v(fp(this, a, b, u(this.signInWithCredential, this)))
  }
  k.signInWithEmailLink = function (a, b) {
    var c = this
    return this.v(
      F().then(function () {
        b = b || zk()
        var d = sm(a, b),
          e = rm(b)
        if (!e) throw new P('argument-error', 'Invalid email link!')
        if (e.tenantId !== c.ma) throw new P('tenant-id-mismatch')
        return c.signInWithCredential(d)
      })
    )
  }
  var Br = function (a) {
    Ai.call(this, 'languageCodeChanged')
    this.languageCode = a
  }
  n(Br, Ai)
  var Dr = function (a) {
    Ai.call(this, 'emulatorConfigChanged')
    this.emulatorConfig = a
  }
  n(Dr, Ai)
  var Er = function (a) {
    Ai.call(this, 'frameworkChanged')
    this.Mk = a
  }
  n(Er, Ai)
  var Nr = function (a, b, c, d) {
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
            if (((f = b[e].optional && void 0 === c[e]), !b[e].Ca(c[e]) && !f)) {
              b = b[e]
              if (0 > e || e >= Mr.length)
                throw new P(
                  'internal-error',
                  'Argument validator received an unsupported number of arguments.'
                )
              c = Mr[e]
              d =
                (d ? '' : c + ' argument ') +
                (b.name ? '"' + b.name + '" ' : '') +
                'must be ' +
                b.Fa +
                '.'
              break a
            }
          d = null
        }
      }
      if (d) throw new P('argument-error', a + ' failed: ' + d)
    },
    Mr = 'First Second Third Fourth Fifth Sixth Seventh Eighth Ninth'.split(' '),
    V = function (a, b) {
      return {
        name: a || '',
        Fa: 'a valid string',
        optional: !!b,
        Ca: function (c) {
          return 'string' === typeof c
        },
      }
    },
    Or = function (a, b) {
      return {
        name: a || '',
        Fa: 'a boolean',
        optional: !!b,
        Ca: function (c) {
          return 'boolean' === typeof c
        },
      }
    },
    W = function (a, b) {
      return { name: a || '', Fa: 'a valid object', optional: !!b, Ca: t }
    },
    Pr = function (a, b) {
      return { name: a || '', Fa: 'a function', optional: !!b, Ca: Jc }
    },
    Qr = function (a, b) {
      return {
        name: a || '',
        Fa: 'null',
        optional: !!b,
        Ca: function (c) {
          return null === c
        },
      }
    },
    Rr = function () {
      return {
        name: '',
        Fa: 'an HTML element',
        optional: !1,
        Ca: function (a) {
          return !!(a && a instanceof Element)
        },
      }
    },
    Sr = function () {
      return {
        name: 'auth',
        Fa: 'an instance of Firebase Auth',
        optional: !0,
        Ca: function (a) {
          return !!(a && a instanceof T)
        },
      }
    },
    Tr = function () {
      return {
        name: 'app',
        Fa: 'an instance of Firebase App',
        optional: !0,
        Ca: function (a) {
          return !!(a && a instanceof firebase.app.App)
        },
      }
    },
    Ur = function (a) {
      return {
        name: a ? a + 'Credential' : 'credential',
        Fa: a ? 'a valid ' + a + ' credential' : 'a valid credential',
        optional: !1,
        Ca: function (b) {
          if (!b) return !1
          var c = !a || b.providerId === a
          return !(!b.Lc || !c)
        },
      }
    },
    Vr = function () {
      return {
        name: 'multiFactorAssertion',
        Fa: 'a valid multiFactorAssertion',
        optional: !1,
        Ca: function (a) {
          return a ? !!a.process : !1
        },
      }
    },
    Wr = function () {
      return {
        name: 'authProvider',
        Fa: 'a valid Auth provider',
        optional: !1,
        Ca: function (a) {
          return !!(a && a.providerId && a.hasOwnProperty && a.hasOwnProperty('isOAuthProvider'))
        },
      }
    },
    Xr = function (a, b) {
      return t(a) && 'string' === typeof a.type && a.type === b && 'function' === typeof a.ee
    },
    Yr = function (a) {
      return t(a) && 'string' === typeof a.uid
    },
    Zr = function () {
      return {
        name: 'applicationVerifier',
        Fa: 'an implementation of firebase.auth.ApplicationVerifier',
        optional: !1,
        Ca: function (a) {
          return !(!a || 'string' !== typeof a.type || 'function' !== typeof a.verify)
        },
      }
    },
    X = function (a, b, c, d) {
      return {
        name: c || '',
        Fa: a.Fa + ' or ' + b.Fa,
        optional: !!d,
        Ca: function (e) {
          return a.Ca(e) || b.Ca(e)
        },
      }
    }
  var Y = function (a, b) {
      for (var c in b) {
        var d = b[c].name
        a[d] = $r(d, a[c], b[c].j)
      }
    },
    as = function (a, b) {
      for (var c in b) {
        var d = b[c].name
        d !== c &&
          Object.defineProperty(a, d, {
            get: wa(function (e) {
              return this[e]
            }, c),
            set: wa(
              function (e, f, g, h) {
                Nr(e, [g], [h], !0)
                this[f] = h
              },
              d,
              c,
              b[c].kg
            ),
            enumerable: !0,
          })
      }
    },
    Z = function (a, b, c, d) {
      a[b] = $r(b, c, d)
    },
    $r = function (a, b, c) {
      if (!c) return b
      var d = bs(a)
      a = function () {
        var g = Array.prototype.slice.call(arguments)
        Nr(d, c, g)
        return b.apply(this, g)
      }
      for (var e in b) a[e] = b[e]
      for (var f in b.prototype) a.prototype[f] = b.prototype[f]
      return a
    },
    bs = function (a) {
      a = a.split('.')
      return a[a.length - 1]
    }
  function cs() {}
  O(cs, 'FACTOR_ID', 'phone')
  Y(T.prototype, {
    applyActionCode: { name: 'applyActionCode', j: [V('code')] },
    checkActionCode: { name: 'checkActionCode', j: [V('code')] },
    confirmPasswordReset: { name: 'confirmPasswordReset', j: [V('code'), V('newPassword')] },
    createUserWithEmailAndPassword: {
      name: 'createUserWithEmailAndPassword',
      j: [V('email'), V('password')],
    },
    fetchSignInMethodsForEmail: { name: 'fetchSignInMethodsForEmail', j: [V('email')] },
    getRedirectResult: { name: 'getRedirectResult', j: [] },
    isSignInWithEmailLink: { name: 'isSignInWithEmailLink', j: [V('emailLink')] },
    onAuthStateChanged: {
      name: 'onAuthStateChanged',
      j: [X(W(), Pr(), 'nextOrObserver'), Pr('opt_error', !0), Pr('opt_completed', !0)],
    },
    onIdTokenChanged: {
      name: 'onIdTokenChanged',
      j: [X(W(), Pr(), 'nextOrObserver'), Pr('opt_error', !0), Pr('opt_completed', !0)],
    },
    sendPasswordResetEmail: {
      name: 'sendPasswordResetEmail',
      j: [
        V('email'),
        X(W('opt_actionCodeSettings', !0), Qr(null, !0), 'opt_actionCodeSettings', !0),
      ],
    },
    sendSignInLinkToEmail: {
      name: 'sendSignInLinkToEmail',
      j: [V('email'), W('actionCodeSettings')],
    },
    setPersistence: { name: 'setPersistence', j: [V('persistence')] },
    signInAndRetrieveDataWithCredential: { name: 'signInAndRetrieveDataWithCredential', j: [Ur()] },
    signInAnonymously: { name: 'signInAnonymously', j: [] },
    signInWithCredential: { name: 'signInWithCredential', j: [Ur()] },
    signInWithCustomToken: { name: 'signInWithCustomToken', j: [V('token')] },
    signInWithEmailAndPassword: {
      name: 'signInWithEmailAndPassword',
      j: [V('email'), V('password')],
    },
    signInWithEmailLink: { name: 'signInWithEmailLink', j: [V('email'), V('emailLink', !0)] },
    signInWithPhoneNumber: { name: 'signInWithPhoneNumber', j: [V('phoneNumber'), Zr()] },
    signInWithPopup: { name: 'signInWithPopup', j: [Wr()] },
    signInWithRedirect: { name: 'signInWithRedirect', j: [Wr()] },
    updateCurrentUser: {
      name: 'updateCurrentUser',
      j: [
        X(
          (function (a) {
            return {
              name: 'user',
              Fa: 'an instance of Firebase User',
              optional: !!a,
              Ca: function (b) {
                return !!(b && b instanceof S)
              },
            }
          })(),
          Qr(),
          'user'
        ),
      ],
    },
    signOut: { name: 'signOut', j: [] },
    toJSON: { name: 'toJSON', j: [V(null, !0)] },
    useDeviceLanguage: { name: 'useDeviceLanguage', j: [] },
    useEmulator: { name: 'useEmulator', j: [V('url'), W('options', !0)] },
    verifyPasswordResetCode: { name: 'verifyPasswordResetCode', j: [V('code')] },
  })
  as(T.prototype, {
    lc: { name: 'languageCode', kg: X(V(), Qr(), 'languageCode') },
    ti: { name: 'tenantId', kg: X(V(), Qr(), 'tenantId') },
  })
  T.Persistence = qp
  T.Persistence.LOCAL = 'local'
  T.Persistence.SESSION = 'session'
  T.Persistence.NONE = 'none'
  Y(S.prototype, {
    delete: { name: 'delete', j: [] },
    getIdTokenResult: { name: 'getIdTokenResult', j: [Or('opt_forceRefresh', !0)] },
    getIdToken: { name: 'getIdToken', j: [Or('opt_forceRefresh', !0)] },
    linkAndRetrieveDataWithCredential: { name: 'linkAndRetrieveDataWithCredential', j: [Ur()] },
    linkWithCredential: { name: 'linkWithCredential', j: [Ur()] },
    linkWithPhoneNumber: { name: 'linkWithPhoneNumber', j: [V('phoneNumber'), Zr()] },
    linkWithPopup: { name: 'linkWithPopup', j: [Wr()] },
    linkWithRedirect: { name: 'linkWithRedirect', j: [Wr()] },
    reauthenticateAndRetrieveDataWithCredential: {
      name: 'reauthenticateAndRetrieveDataWithCredential',
      j: [Ur()],
    },
    reauthenticateWithCredential: { name: 'reauthenticateWithCredential', j: [Ur()] },
    reauthenticateWithPhoneNumber: {
      name: 'reauthenticateWithPhoneNumber',
      j: [V('phoneNumber'), Zr()],
    },
    reauthenticateWithPopup: { name: 'reauthenticateWithPopup', j: [Wr()] },
    reauthenticateWithRedirect: { name: 'reauthenticateWithRedirect', j: [Wr()] },
    reload: { name: 'reload', j: [] },
    sendEmailVerification: {
      name: 'sendEmailVerification',
      j: [X(W('opt_actionCodeSettings', !0), Qr(null, !0), 'opt_actionCodeSettings', !0)],
    },
    toJSON: { name: 'toJSON', j: [V(null, !0)] },
    unlink: { name: 'unlink', j: [V('provider')] },
    updateEmail: { name: 'updateEmail', j: [V('email')] },
    updatePassword: { name: 'updatePassword', j: [V('password')] },
    updatePhoneNumber: { name: 'updatePhoneNumber', j: [Ur('phone')] },
    updateProfile: { name: 'updateProfile', j: [W('profile')] },
    verifyBeforeUpdateEmail: {
      name: 'verifyBeforeUpdateEmail',
      j: [
        V('email'),
        X(W('opt_actionCodeSettings', !0), Qr(null, !0), 'opt_actionCodeSettings', !0),
      ],
    },
  })
  Y(io.prototype, {
    execute: { name: 'execute' },
    render: { name: 'render' },
    reset: { name: 'reset' },
    getResponse: { name: 'getResponse' },
  })
  Y(co.prototype, {
    execute: { name: 'execute' },
    render: { name: 'render' },
    reset: { name: 'reset' },
    getResponse: { name: 'getResponse' },
  })
  Y(E.prototype, { Bc: { name: 'finally' }, l: { name: 'catch' }, then: { name: 'then' } })
  as(bp.prototype, {
    appVerificationDisabled: {
      name: 'appVerificationDisabledForTesting',
      kg: Or('appVerificationDisabledForTesting'),
    },
  })
  Y(ep.prototype, { confirm: { name: 'confirm', j: [V('verificationCode')] } })
  Z(
    Rl,
    'fromJSON',
    function (a) {
      a = 'string' === typeof a ? JSON.parse(a) : a
      for (var b, c = [Zl, qm, xm, Xl], d = 0; d < c.length; d++) if ((b = c[d](a))) return b
      return null
    },
    [X(V(), W(), 'json')]
  )
  Z(
    km,
    'credential',
    function (a, b) {
      return new lm(a, b)
    },
    [V('email'), V('password')]
  )
  Y(lm.prototype, { T: { name: 'toJSON', j: [V(null, !0)] } })
  Y(cm.prototype, {
    addScope: { name: 'addScope', j: [V('scope')] },
    setCustomParameters: { name: 'setCustomParameters', j: [W('customOAuthParameters')] },
  })
  Z(cm, 'credential', dm, [X(V(), W(), 'token')])
  Z(km, 'credentialWithLink', sm, [V('email'), V('emailLink')])
  Y(em.prototype, {
    addScope: { name: 'addScope', j: [V('scope')] },
    setCustomParameters: { name: 'setCustomParameters', j: [W('customOAuthParameters')] },
  })
  Z(em, 'credential', fm, [X(V(), W(), 'token')])
  Y(gm.prototype, {
    addScope: { name: 'addScope', j: [V('scope')] },
    setCustomParameters: { name: 'setCustomParameters', j: [W('customOAuthParameters')] },
  })
  Z(gm, 'credential', hm, [X(V(), X(W(), Qr()), 'idToken'), X(V(), Qr(), 'accessToken', !0)])
  Y(im.prototype, {
    setCustomParameters: { name: 'setCustomParameters', j: [W('customOAuthParameters')] },
  })
  Z(im, 'credential', jm, [X(V(), W(), 'token'), V('secret', !0)])
  Y(bm.prototype, {
    addScope: { name: 'addScope', j: [V('scope')] },
    credential: {
      name: 'credential',
      j: [X(V(), X(W(), Qr()), 'optionsOrIdToken'), X(V(), Qr(), 'accessToken', !0)],
    },
    setCustomParameters: { name: 'setCustomParameters', j: [W('customOAuthParameters')] },
  })
  Y(Yl.prototype, { T: { name: 'toJSON', j: [V(null, !0)] } })
  Y(Tl.prototype, { T: { name: 'toJSON', j: [V(null, !0)] } })
  Z(ym, 'credential', Cm, [V('verificationId'), V('verificationCode')])
  Y(ym.prototype, {
    verifyPhoneNumber: {
      name: 'verifyPhoneNumber',
      j: [
        X(
          V(),
          (function (a, b) {
            return {
              name: a || 'phoneInfoOptions',
              Fa: 'valid phone info options',
              optional: !!b,
              Ca: function (c) {
                return c
                  ? c.session && c.phoneNumber
                    ? Xr(c.session, 'enroll') && 'string' === typeof c.phoneNumber
                    : c.session && c.multiFactorHint
                    ? Xr(c.session, 'signin') && Yr(c.multiFactorHint)
                    : c.session && c.multiFactorUid
                    ? Xr(c.session, 'signin') && 'string' === typeof c.multiFactorUid
                    : c.phoneNumber
                    ? 'string' === typeof c.phoneNumber
                    : !1
                  : !1
              },
            }
          })(),
          'phoneInfoOptions'
        ),
        Zr(),
      ],
    },
  })
  Y(tm.prototype, { T: { name: 'toJSON', j: [V(null, !0)] } })
  Y(P.prototype, { toJSON: { name: 'toJSON', j: [V(null, !0)] } })
  Y(Fm.prototype, { toJSON: { name: 'toJSON', j: [V(null, !0)] } })
  Y(Ll.prototype, { toJSON: { name: 'toJSON', j: [V(null, !0)] } })
  Y(mq.prototype, { toJSON: { name: 'toJSON', j: [V(null, !0)] } })
  Y(lq.prototype, { resolveSignIn: { name: 'resolveSignIn', j: [Vr()] } })
  Y(vq.prototype, {
    getSession: { name: 'getSession', j: [] },
    enroll: { name: 'enroll', j: [Vr(), V('displayName', !0)] },
    unenroll: {
      name: 'unenroll',
      j: [
        X(
          { name: 'multiFactorInfo', Fa: 'a valid multiFactorInfo', optional: !1, Ca: Yr },
          V(),
          'multiFactorInfoIdentifier'
        ),
      ],
    },
  })
  Y(to.prototype, {
    clear: { name: 'clear', j: [] },
    render: { name: 'render', j: [] },
    verify: { name: 'verify', j: [] },
  })
  Z(Il, 'parseLink', Jl, [V('link')])
  Z(
    cs,
    'assertion',
    function (a) {
      return new sq(a)
    },
    [Ur('phone')]
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
        Auth: T,
        AuthCredential: Rl,
        Error: P,
      }
      Z(a, 'EmailAuthProvider', km, [])
      Z(a, 'FacebookAuthProvider', cm, [])
      Z(a, 'GithubAuthProvider', em, [])
      Z(a, 'GoogleAuthProvider', gm, [])
      Z(a, 'TwitterAuthProvider', im, [])
      Z(a, 'OAuthProvider', bm, [V('providerId')])
      Z(a, 'SAMLAuthProvider', am, [V('providerId')])
      Z(a, 'PhoneAuthProvider', ym, [Sr()])
      Z(a, 'RecaptchaVerifier', to, [
        X(V(), Rr(), 'recaptchaContainer'),
        W('recaptchaParameters', !0),
        Tr(),
      ])
      Z(a, 'ActionCodeURL', Il, [])
      Z(a, 'PhoneMultiFactorGenerator', cs, [])
      firebase.INTERNAL.registerService(
        'auth',
        function (b, c) {
          b = new T(b)
          c({
            INTERNAL: {
              getUid: u(b.getUid, b),
              getToken: u(b.Ok, b),
              addAuthTokenListener: u(b.kk, b),
              removeAuthTokenListener: u(b.Ql, b),
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
      firebase.INTERNAL.extendNamespace({ User: S })
    } else
      throw Error(
        'Cannot find the firebase namespace; be sure to include firebase-app.js before this library.'
      )
  })()
  var ds = function (a) {
    this.dh = ig.getParentIframe()
    this.Jb = this.dh.getOrigin()
    this.Ib = a
    this.Mh = !1
  }
  ds.prototype.rd = function () {
    return this.Jb
  }
  ds.prototype.start = function () {
    var a = this
    return this.Ib(this.Jb)
      .then(function () {
        a.Mh = !0
      })
      .l(function (b) {
        throw b
      })
  }
  ds.prototype.sendMessage = function (a) {
    var b = this
    if (this.Mh)
      return new E(function (c) {
        b.dh.send(a.type, a, c, lg)
      })
    throw new P('missing-iframe-start')
  }
  ds.prototype.uh = function (a, b) {
    if (this.Mh) this.dh.register(a, b, lg)
    else throw new P('missing-iframe-start')
  }
  var es = function (a) {
    this.Ef = new ds(a)
  }
  es.prototype.rd = function () {
    return this.Ef.rd()
  }
  es.prototype.start = function () {
    var a = this
    return this.Ef.start().then(function () {
      a.wh()
    })
  }
  var fs = function (a, b) {
    return a.Ef.sendMessage({ type: 'authEvent', authEvent: b && b.T() }).then(function (c) {
      if (!c || !c.length || 'ACK' != c[c.length - 1].status) throw new P('internal-error')
    })
  }
  es.prototype.wh = function () {
    this.Ef.uh('webStorageSupport', function () {
      return F({ status: 'ACK', webStorageSupport: !0 })
    })
  }
  var gs = function (a, b, c) {
    var d = (ok(M(zk()), 'fw') || '').split(','),
      e = this
    this.ha = a
    this.ka = b
    this.Ia = c || null
    this.Da = d || []
    this.Ld = new zp(this.ha + ':' + this.ka)
    this.Cl = new Fp()
    this.o = new Mm(a, vk(this.Ia), Vk('Iframe', '2.20.0', this.Da))
    this.rc = new es(function (f) {
      return dn(e.o).then(function (g) {
        if (!Jk(g, f)) throw (e.destroy(), new Ll(f))
      })
    })
    this.vc = zo(p)
    this.Pi = !1
    this.vc.subscribe('getParentOrigin', function (f) {
      if (f === p.window.location.origin) return F(e.rc.rd())
      throw Error('Invalid origin')
    })
    this.vc.subscribe('sendAuthEvent', function (f, g) {
      var h = g.storageKey,
        l = null
      try {
        l = Cl(g.authEvent)
      } catch (m) {}
      if (f === p.window.location.origin && h === e.ha + ':' + e.ka && l)
        return e.Pi
          ? fs(e.rc, l)
              .then(function () {
                return !0
              })
              .l(function () {
                return !1
              })
          : e.Cl.O.set(Ap, l.T(), h)
              .then(function () {
                return !0
              })
              .l(function () {
                return !1
              })
      throw Error('Invalid origin or request')
    })
  }
  gs.prototype.rd = function () {
    return this.rc.rd()
  }
  gs.prototype.start = function () {
    var a = this
    return this.rc.start().then(function () {
      a.Pi = !0
      a.oj = a.nj.bind(a)
      return hs(a).Bc(function () {
        a.Ld.Dc(a.oj)
        a.nj(!1)
      })
    })
  }
  gs.prototype.nj = function (a) {
    var b = this,
      c = null
    return Bp(this.Ld)
      .then(function (d) {
        if ((c = d)) return fs(b.rc, d)
        if (a) return fs(b.rc, new Bl('unknown', null, null, null, new P('no-auth-event')))
      })
      .then(function () {
        if (c) return Cp(b.Ld)
      })
      .l(function () {})
  }
  var hs = function (a) {
    var b = null
    return Ep(a.Ld)
      .then(function (c) {
        if ((b = c)) return fs(a.rc, c)
        c = Xk() ? 'no-auth-event' : 'web-storage-unsupported'
        return fs(a.rc, new Bl('unknown', null, null, null, new P(c)))
      })
      .then(function () {
        if (b) {
          var c = a.Ld
          return c.O.remove(Dp, c.V)
        }
      })
      .l(function () {})
  }
  gs.prototype.destroy = function () {
    this.ld = !0
    this.Ld.Id(this.oj)
    this.vc.unsubscribe('getParentOrigin')
    this.vc.unsubscribe('sendAuthEvent')
  }
  var is = null,
    js = function () {
      var a = ok(M(zk()), 'apiKey'),
        b = ok(M(zk()), 'appName') || ''
      if (!a) throw new P('invalid-api-key')
      var c = ok(M(zk()), 'eid') || null
      is = new gs(a, b, c)
      is.start().l(function (d) {
        if (d && 'auth/unauthorized-domain' == d.code)
          (d = M(is.rd())),
            (d =
              'chrome-extension' == d.Va
                ? Pc(
                    'Info: The current chrome extension ID is not authorized for OAuth operations. This will prevent signInWithPopup and linkWithPopup from working. Add your chrome extension (chrome-extension://%s) to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.',
                    d.Ga
                  )
                : Pc(
                    'Info: The current domain is not authorized for OAuth operations. This will prevent signInWithPopup, signInWithRedirect, linkWithPopup and linkWithRedirect from working. Add your domain (%s) to the OAuth redirect domains list in the Firebase console -> Authentication -> Settings -> Authorized domains tab.',
                    d.Ga
                  )),
            il(d)
        else if (d && d.message) il(d.message)
        else throw d
      })
    }
  r('fireauth.iframe.AuthRelay.initialize', function () {
    'complete' == p.document.readyState
      ? js()
      : Oi(window, 'load', function () {
          js()
        })
  })
}.call(this))
