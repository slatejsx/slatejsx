import React, { useState, useMemo, useCallback, useEffect, useLayoutEffect, createContext, useContext, useRef, memo } from 'react';
import throttle from 'lodash/throttle';
import ReactDOM from 'react-dom';
import { DeleteOutlined, CheckSquareOutlined, BorderOutlined, FormatPainterOutlined, LinkOutlined, StarFilled, BoldOutlined, ItalicOutlined, UnderlineOutlined, StrikethroughOutlined, CodeOutlined, BgColorsOutlined, FontColorsOutlined, UnorderedListOutlined, OrderedListOutlined, InfoCircleOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined, TagOutlined, TagsOutlined, SoundOutlined, QuestionCircleOutlined, ThunderboltOutlined, StarOutlined, SettingOutlined, ScheduleOutlined, PushpinOutlined, MessageOutlined, HeartOutlined, EditOutlined, SnippetsOutlined, AliwangwangOutlined, WechatOutlined, WeiboOutlined, WarningOutlined, CaretUpOutlined, CaretDownOutlined, SmileOutlined, CreditCardOutlined, CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined, FontSizeOutlined, MinusCircleOutlined, PlusCircleOutlined, PictureOutlined, TableOutlined, InsertRowLeftOutlined, DeleteColumnOutlined, InsertRowRightOutlined, InsertRowAboveOutlined, DeleteRowOutlined, InsertRowBelowOutlined, MergeCellsOutlined, SplitCellsOutlined, MinusSquareOutlined, CopyOutlined, CodepenOutlined, VideoCameraOutlined, UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import { Tooltip, Rate, Input, message, Button, Alert, Popover, Image as Image$1, Divider as Divider$1, Select as Select$1, Affix } from 'antd';
import isUrl from 'is-url';
import Single from '@/components/button/single';
import Select from '@/components/button/select';
import Muti from '@/components/button/muti';
import imageExtensions from 'image-extensions';
import TableInput from '@/components/table-input';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import _$1 from 'lodash';

function ownKeys$b(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$b(Object(source), !0).forEach(function (key) {
      _defineProperty$2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$b(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

function n$2(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];if("production"!==process.env.NODE_ENV){var i=Y[n],o=i?"function"==typeof i?i.apply(null,t):i:"unknown error nr: "+n;throw Error("[Immer] "+o)}throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map((function(n){return "'"+n+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function r$1(n){return !!n&&!!n[Q]}function t$1(n){return !!n&&(function(n){if(!n||"object"!=typeof n)return !1;var r=Object.getPrototypeOf(n);if(null===r)return !0;var t=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return t===Object||"function"==typeof t&&Function.toString.call(t)===Z}(n)||Array.isArray(n)||!!n[L]||!!n.constructor[L]||s(n)||v(n))}function i(n,r,t){void 0===t&&(t=!1),0===o(n)?(t?Object.keys:nn)(n).forEach((function(e){t&&"symbol"==typeof e||r(e,n[e],n);})):n.forEach((function(t,e){return r(e,t,n)}));}function o(n){var r=n[Q];return r?r.i>3?r.i-4:r.i:Array.isArray(n)?1:s(n)?2:v(n)?3:0}function u(n,r){return 2===o(n)?n.has(r):Object.prototype.hasOwnProperty.call(n,r)}function a(n,r){return 2===o(n)?n.get(r):n[r]}function f(n,r,t){var e=o(n);2===e?n.set(r,t):3===e?(n.delete(r),n.add(t)):n[r]=t;}function c(n,r){return n===r?0!==n||1/n==1/r:n!=n&&r!=r}function s(n){return X&&n instanceof Map}function v(n){return q&&n instanceof Set}function p(n){return n.o||n.t}function l(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var r=rn(n);delete r[Q];for(var t=nn(r),e=0;e<t.length;e++){var i=t[e],o=r[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(r[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]});}return Object.create(Object.getPrototypeOf(n),r)}function d(n,e){return void 0===e&&(e=!1),y(n)||r$1(n)||!t$1(n)?n:(o(n)>1&&(n.set=n.add=n.clear=n.delete=h),Object.freeze(n),e&&i(n,(function(n,r){return d(r,!0)}),!0),n)}function h(){n$2(2);}function y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function b(r){var t=tn[r];return t||n$2(18,r),t}function _(){return "production"===process.env.NODE_ENV||U||n$2(0),U}function j(n,r){r&&(b("Patches"),n.u=[],n.s=[],n.v=r);}function O(n){g(n),n.p.forEach(S),n.p=null;}function g(n){n===U&&(U=n.l);}function w(n){return U={p:[],l:U,h:n,m:!0,_:0}}function S(n){var r=n[Q];0===r.i||1===r.i?r.j():r.O=!0;}function P(r,e){e._=e.p.length;var i=e.p[0],o=void 0!==r&&r!==i;return e.h.g||b("ES5").S(e,r,o),o?(i[Q].P&&(O(e),n$2(4)),t$1(r)&&(r=M(e,r),e.l||x(e,r)),e.u&&b("Patches").M(i[Q].t,r,e.u,e.s)):r=M(e,i,[]),O(e),e.u&&e.v(e.u,e.s),r!==H?r:void 0}function M(n,r,t){if(y(r))return r;var e=r[Q];if(!e)return i(r,(function(i,o){return A(n,e,r,i,o,t)}),!0),r;if(e.A!==n)return r;if(!e.P)return x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o;i(3===e.i?new Set(o):o,(function(r,i){return A(n,e,o,r,i,t)})),x(n,o,!1),t&&n.u&&b("Patches").R(e,t,n.u,n.s);}return e.o}function A(e,i,o,a,c,s){if("production"!==process.env.NODE_ENV&&c===o&&n$2(5),r$1(c)){var v=M(e,c,s&&i&&3!==i.i&&!u(i.D,a)?s.concat(a):void 0);if(f(o,a,v),!r$1(v))return;e.m=!1;}if(t$1(c)&&!y(c)){if(!e.h.F&&e._<1)return;M(e,c),i&&i.A.l||x(e,c);}}function x(n,r,t){void 0===t&&(t=!1),n.h.F&&n.m&&d(r,t);}function z(n,r){var t=n[Q];return (t?p(t):n)[r]}function I(n,r){if(r in n)for(var t=Object.getPrototypeOf(n);t;){var e=Object.getOwnPropertyDescriptor(t,r);if(e)return e;t=Object.getPrototypeOf(t);}}function k(n){n.P||(n.P=!0,n.l&&k(n.l));}function E(n){n.o||(n.o=l(n.t));}function R(n,r,t){var e=s(r)?b("MapSet").N(r,t):v(r)?b("MapSet").T(r,t):n.g?function(n,r){var t=Array.isArray(n),e={i:t?1:0,A:r?r.A:_(),P:!1,I:!1,D:{},l:r,t:n,k:null,o:null,j:null,C:!1},i=e,o=en;t&&(i=[e],o=on);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(r,t):b("ES5").J(r,t);return (t?t.A:_()).p.push(e),e}function D(e){return r$1(e)||n$2(22,e),function n(r){if(!t$1(r))return r;var e,u=r[Q],c=o(r);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=F(r,c),u.I=!1;}else e=F(r,c);return i(e,(function(r,t){u&&a(u.t,r)===t||f(e,r,n(t));})),3===c?new Set(e):e}(e)}function F(n,r){switch(r){case 2:return new Map(n);case 3:return Array.from(n)}return l(n)}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,q="undefined"!=typeof Set,B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",Y={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(n){return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+n},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(n){return "Cannot apply patch, path doesn't resolve: "+n},16:'Sets cannot have "replace" patches.',17:function(n){return "Unsupported patch operation: "+n},18:function(n){return "The plugin for '"+n+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+n+"()` when initializing your application."},20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(n){return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+n+"'"},22:function(n){return "'current' expects a draft, got: "+n},23:function(n){return "'original' expects a draft, got: "+n},24:"Patching reserved attributes like __proto__, prototype and constructor is not allowed"},Z=""+Object.prototype.constructor,nn="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,rn=Object.getOwnPropertyDescriptors||function(n){var r={};return nn(n).forEach((function(t){r[t]=Object.getOwnPropertyDescriptor(n,t);})),r},tn={},en={get:function(n,r){if(r===Q)return n;var e=p(n);if(!u(e,r))return function(n,r,t){var e,i=I(r,t);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,r);var i=e[r];return n.I||!t$1(i)?i:i===z(n.t,r)?(E(n),n.o[r]=R(n.A.h,i,n)):i},has:function(n,r){return r in p(n)},ownKeys:function(n){return Reflect.ownKeys(p(n))},set:function(n,r,t){var e=I(p(n),r);if(null==e?void 0:e.set)return e.set.call(n.k,t),!0;if(!n.P){var i=z(p(n),r),o=null==i?void 0:i[Q];if(o&&o.t===t)return n.o[r]=t,n.D[r]=!1,!0;if(c(t,i)&&(void 0!==t||u(n.t,r)))return !0;E(n),k(n);}return n.o[r]===t&&"number"!=typeof t&&(void 0!==t||r in n.o)||(n.o[r]=t,n.D[r]=!0,!0)},deleteProperty:function(n,r){return void 0!==z(n.t,r)||r in n.t?(n.D[r]=!1,E(n),k(n)):delete n.D[r],n.o&&delete n.o[r],!0},getOwnPropertyDescriptor:function(n,r){var t=p(n),e=Reflect.getOwnPropertyDescriptor(t,r);return e?{writable:!0,configurable:1!==n.i||"length"!==r,enumerable:e.enumerable,value:t[r]}:e},defineProperty:function(){n$2(11);},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){n$2(12);}},on={};i(en,(function(n,r){on[n]=function(){return arguments[0]=arguments[0][0],r.apply(this,arguments)};})),on.deleteProperty=function(r,t){return "production"!==process.env.NODE_ENV&&isNaN(parseInt(t))&&n$2(13),on.set.call(this,r,t,void 0)},on.set=function(r,t,e){return "production"!==process.env.NODE_ENV&&"length"!==t&&isNaN(parseInt(t))&&n$2(14),en.set.call(this,r[0],t,e,r[0])};var un=function(){function e(r){var e=this;this.g=B,this.F=!0,this.produce=function(r,i,o){if("function"==typeof r&&"function"!=typeof i){var u=i;i=r;var a=e;return function(n){var r=this;void 0===n&&(n=u);for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a.produce(n,(function(n){var t;return (t=i).call.apply(t,[r,n].concat(e))}))}}var f;if("function"!=typeof i&&n$2(6),void 0!==o&&"function"!=typeof o&&n$2(7),t$1(r)){var c=w(e),s=R(e,r,void 0),v=!0;try{f=i(s),v=!1;}finally{v?O(c):g(c);}return "undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return j(c,o),P(n,c)}),(function(n){throw O(c),n})):(j(c,o),P(f,c))}if(!r||"object"!=typeof r){if(void 0===(f=i(r))&&(f=r),f===H&&(f=void 0),e.F&&d(f,!0),o){var p=[],l=[];b("Patches").M(r,f,p,l),o(p,l);}return f}n$2(21,r);},this.produceWithPatches=function(n,r){if("function"==typeof n)return function(r){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return e.produceWithPatches(r,(function(r){return n.apply(void 0,[r].concat(i))}))};var t,i,o=e.produce(n,r,(function(n,r){t=n,i=r;}));return "undefined"!=typeof Promise&&o instanceof Promise?o.then((function(n){return [n,t,i]})):[o,t,i]},"boolean"==typeof(null==r?void 0:r.useProxies)&&this.setUseProxies(r.useProxies),"boolean"==typeof(null==r?void 0:r.autoFreeze)&&this.setAutoFreeze(r.autoFreeze);}var i=e.prototype;return i.createDraft=function(e){t$1(e)||n$2(8),r$1(e)&&(e=D(e));var i=w(this),o=R(this,e,void 0);return o[Q].C=!0,g(i),o},i.finishDraft=function(r,t){var e=r&&r[Q];"production"!==process.env.NODE_ENV&&(e&&e.C||n$2(9),e.I&&n$2(10));var i=e.A;return j(i,t),P(void 0,i)},i.setAutoFreeze=function(n){this.F=n;},i.setUseProxies=function(r){r&&!B&&n$2(20),this.g=r;},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}e>-1&&(t=t.slice(e+1));var o=b("Patches").$;return r$1(n)?o(n,t):this.produce(n,(function(n){return o(n,t)}))},e}(),an=new un,fn=an.produce;an.produceWithPatches.bind(an);an.setAutoFreeze.bind(an);an.setUseProxies.bind(an);an.applyPatches.bind(an);var ln=an.createDraft.bind(an),dn=an.finishDraft.bind(an);

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var DIRTY_PATHS = new WeakMap();
var DIRTY_PATH_KEYS = new WeakMap();
var FLUSHING = new WeakMap();
var NORMALIZING = new WeakMap();
var PATH_REFS = new WeakMap();
var POINT_REFS = new WeakMap();
var RANGE_REFS = new WeakMap();

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$9(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Create a new Slate `Editor` object.
 */

var createEditor = () => {
  var editor = {
    children: [],
    operations: [],
    selection: null,
    marks: null,
    isInline: () => false,
    isVoid: () => false,
    onChange: () => {},
    apply: op => {
      for (var ref of Editor.pathRefs(editor)) {
        PathRef.transform(ref, op);
      }

      for (var _ref of Editor.pointRefs(editor)) {
        PointRef.transform(_ref, op);
      }

      for (var _ref2 of Editor.rangeRefs(editor)) {
        RangeRef.transform(_ref2, op);
      }

      var oldDirtyPaths = DIRTY_PATHS.get(editor) || [];
      var oldDirtyPathKeys = DIRTY_PATH_KEYS.get(editor) || new Set();
      var dirtyPaths;
      var dirtyPathKeys;

      var add = path => {
        if (path) {
          var key = path.join(',');

          if (!dirtyPathKeys.has(key)) {
            dirtyPathKeys.add(key);
            dirtyPaths.push(path);
          }
        }
      };

      if (Path.operationCanTransformPath(op)) {
        dirtyPaths = [];
        dirtyPathKeys = new Set();

        for (var path of oldDirtyPaths) {
          var newPath = Path.transform(path, op);
          add(newPath);
        }
      } else {
        dirtyPaths = oldDirtyPaths;
        dirtyPathKeys = oldDirtyPathKeys;
      }

      var newDirtyPaths = getDirtyPaths(op);

      for (var _path of newDirtyPaths) {
        add(_path);
      }

      DIRTY_PATHS.set(editor, dirtyPaths);
      DIRTY_PATH_KEYS.set(editor, dirtyPathKeys);
      Transforms.transform(editor, op);
      editor.operations.push(op);
      Editor.normalize(editor); // Clear any formats applied to the cursor if the selection changes.

      if (op.type === 'set_selection') {
        editor.marks = null;
      }

      if (!FLUSHING.get(editor)) {
        FLUSHING.set(editor, true);
        Promise.resolve().then(() => {
          FLUSHING.set(editor, false);
          editor.onChange();
          editor.operations = [];
        });
      }
    },
    addMark: (key, value) => {
      var {
        selection
      } = editor;

      if (selection) {
        if (Range.isExpanded(selection)) {
          Transforms.setNodes(editor, {
            [key]: value
          }, {
            match: Text$1.isText,
            split: true
          });
        } else {
          var marks = _objectSpread$9(_objectSpread$9({}, Editor.marks(editor) || {}), {}, {
            [key]: value
          });

          editor.marks = marks;

          if (!FLUSHING.get(editor)) {
            editor.onChange();
          }
        }
      }
    },
    deleteBackward: unit => {
      var {
        selection
      } = editor;

      if (selection && Range.isCollapsed(selection)) {
        Transforms.delete(editor, {
          unit,
          reverse: true
        });
      }
    },
    deleteForward: unit => {
      var {
        selection
      } = editor;

      if (selection && Range.isCollapsed(selection)) {
        Transforms.delete(editor, {
          unit
        });
      }
    },
    deleteFragment: direction => {
      var {
        selection
      } = editor;

      if (selection && Range.isExpanded(selection)) {
        Transforms.delete(editor, {
          reverse: direction === 'backward'
        });
      }
    },
    getFragment: () => {
      var {
        selection
      } = editor;

      if (selection) {
        return Node.fragment(editor, selection);
      }

      return [];
    },
    insertBreak: () => {
      Transforms.splitNodes(editor, {
        always: true
      });
    },
    insertFragment: fragment => {
      Transforms.insertFragment(editor, fragment);
    },
    insertNode: node => {
      Transforms.insertNodes(editor, node);
    },
    insertText: text => {
      var {
        selection,
        marks
      } = editor;

      if (selection) {
        if (marks) {
          var node = _objectSpread$9({
            text
          }, marks);

          Transforms.insertNodes(editor, node);
        } else {
          Transforms.insertText(editor, text);
        }

        editor.marks = null;
      }
    },
    normalizeNode: entry => {
      var [node, path] = entry; // There are no core normalizations for text nodes.

      if (Text$1.isText(node)) {
        return;
      } // Ensure that block and inline nodes have at least one text child.


      if (Element$9.isElement(node) && node.children.length === 0) {
        var child = {
          text: ''
        };
        Transforms.insertNodes(editor, child, {
          at: path.concat(0),
          voids: true
        });
        return;
      } // Determine whether the node should have block or inline children.


      var shouldHaveInlines = Editor.isEditor(node) ? false : Element$9.isElement(node) && (editor.isInline(node) || node.children.length === 0 || Text$1.isText(node.children[0]) || editor.isInline(node.children[0])); // Since we'll be applying operations while iterating, keep track of an
      // index that accounts for any added/removed nodes.

      var n = 0;

      for (var i = 0; i < node.children.length; i++, n++) {
        var currentNode = Node.get(editor, path);
        if (Text$1.isText(currentNode)) continue;
        var _child = node.children[i];
        var prev = currentNode.children[n - 1];
        var isLast = i === node.children.length - 1;
        var isInlineOrText = Text$1.isText(_child) || Element$9.isElement(_child) && editor.isInline(_child); // Only allow block nodes in the top-level children and parent blocks
        // that only contain block nodes. Similarly, only allow inline nodes in
        // other inline nodes, or parent blocks that only contain inlines and
        // text.

        if (isInlineOrText !== shouldHaveInlines) {
          Transforms.removeNodes(editor, {
            at: path.concat(n),
            voids: true
          });
          n--;
        } else if (Element$9.isElement(_child)) {
          // Ensure that inline nodes are surrounded by text nodes.
          if (editor.isInline(_child)) {
            if (prev == null || !Text$1.isText(prev)) {
              var newChild = {
                text: ''
              };
              Transforms.insertNodes(editor, newChild, {
                at: path.concat(n),
                voids: true
              });
              n++;
            } else if (isLast) {
              var _newChild = {
                text: ''
              };
              Transforms.insertNodes(editor, _newChild, {
                at: path.concat(n + 1),
                voids: true
              });
              n++;
            }
          }
        } else {
          // Merge adjacent text nodes that are empty or match.
          if (prev != null && Text$1.isText(prev)) {
            if (Text$1.equals(_child, prev, {
              loose: true
            })) {
              Transforms.mergeNodes(editor, {
                at: path.concat(n),
                voids: true
              });
              n--;
            } else if (prev.text === '') {
              Transforms.removeNodes(editor, {
                at: path.concat(n - 1),
                voids: true
              });
              n--;
            } else if (_child.text === '') {
              Transforms.removeNodes(editor, {
                at: path.concat(n),
                voids: true
              });
              n--;
            }
          }
        }
      }
    },
    removeMark: key => {
      var {
        selection
      } = editor;

      if (selection) {
        if (Range.isExpanded(selection)) {
          Transforms.unsetNodes(editor, key, {
            match: Text$1.isText,
            split: true
          });
        } else {
          var marks = _objectSpread$9({}, Editor.marks(editor) || {});

          delete marks[key];
          editor.marks = marks;

          if (!FLUSHING.get(editor)) {
            editor.onChange();
          }
        }
      }
    }
  };
  return editor;
};
/**
 * Get the "dirty" paths generated from an operation.
 */

var getDirtyPaths = op => {
  switch (op.type) {
    case 'insert_text':
    case 'remove_text':
    case 'set_node':
      {
        var {
          path
        } = op;
        return Path.levels(path);
      }

    case 'insert_node':
      {
        var {
          node,
          path: _path2
        } = op;
        var levels = Path.levels(_path2);
        var descendants = Text$1.isText(node) ? [] : Array.from(Node.nodes(node), _ref3 => {
          var [, p] = _ref3;
          return _path2.concat(p);
        });
        return [...levels, ...descendants];
      }

    case 'merge_node':
      {
        var {
          path: _path3
        } = op;
        var ancestors = Path.ancestors(_path3);
        var previousPath = Path.previous(_path3);
        return [...ancestors, previousPath];
      }

    case 'move_node':
      {
        var {
          path: _path4,
          newPath
        } = op;

        if (Path.equals(_path4, newPath)) {
          return [];
        }

        var oldAncestors = [];
        var newAncestors = [];

        for (var ancestor of Path.ancestors(_path4)) {
          var p = Path.transform(ancestor, op);
          oldAncestors.push(p);
        }

        for (var _ancestor of Path.ancestors(newPath)) {
          var _p = Path.transform(_ancestor, op);

          newAncestors.push(_p);
        }

        var newParent = newAncestors[newAncestors.length - 1];
        var newIndex = newPath[newPath.length - 1];
        var resultPath = newParent.concat(newIndex);
        return [...oldAncestors, ...newAncestors, resultPath];
      }

    case 'remove_node':
      {
        var {
          path: _path5
        } = op;

        var _ancestors = Path.ancestors(_path5);

        return [..._ancestors];
      }

    case 'split_node':
      {
        var {
          path: _path6
        } = op;

        var _levels = Path.levels(_path6);

        var nextPath = Path.next(_path6);
        return [..._levels, nextPath];
      }

    default:
      {
        return [];
      }
  }
};

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

// Character (grapheme cluster) boundaries are determined according to
// the default grapheme cluster boundary specification, extended grapheme clusters variant[1].
//
// References:
//
// [1] https://www.unicode.org/reports/tr29/#Default_Grapheme_Cluster_Table
// [2] https://www.unicode.org/Public/UCD/latest/ucd/auxiliary/GraphemeBreakProperty.txt
// [3] https://www.unicode.org/Public/UCD/latest/ucd/auxiliary/GraphemeBreakTest.html
// [4] https://www.unicode.org/Public/UCD/latest/ucd/auxiliary/GraphemeBreakTest.txt

/**
 * Get the distance to the end of the first character in a string of text.
 */
var getCharacterDistance = function getCharacterDistance(str) {
  var isRTL = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var isLTR = !isRTL;
  var codepoints = isRTL ? codepointsIteratorRTL(str) : str;
  var left = CodepointType.None;
  var right = CodepointType.None;
  var distance = 0; // Evaluation of these conditions are deferred.

  var gb11 = null; // Is GB11 applicable?

  var gb12Or13 = null; // Is GB12 or GB13 applicable?

  for (var char of codepoints) {
    var code = char.codePointAt(0);
    if (!code) break;
    var type = getCodepointType(char, code);
    [left, right] = isLTR ? [right, type] : [type, left];

    if (intersects(left, CodepointType.ZWJ) && intersects(right, CodepointType.ExtPict)) {
      if (isLTR) {
        gb11 = endsWithEmojiZWJ(str.substring(0, distance));
      } else {
        gb11 = endsWithEmojiZWJ(str.substring(0, str.length - distance));
      }

      if (!gb11) break;
    }

    if (intersects(left, CodepointType.RI) && intersects(right, CodepointType.RI)) {
      if (gb12Or13 !== null) {
        gb12Or13 = !gb12Or13;
      } else {
        if (isLTR) {
          gb12Or13 = true;
        } else {
          gb12Or13 = endsWithOddNumberOfRIs(str.substring(0, str.length - distance));
        }
      }

      if (!gb12Or13) break;
    }

    if (left !== CodepointType.None && right !== CodepointType.None && isBoundaryPair(left, right)) {
      break;
    }

    distance += char.length;
  }

  return distance || 1;
};
var SPACE = /\s/;
var PUNCTUATION = /[\u0021-\u0023\u0025-\u002A\u002C-\u002F\u003A\u003B\u003F\u0040\u005B-\u005D\u005F\u007B\u007D\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
var CHAMELEON = /['\u2018\u2019]/;
/**
 * Get the distance to the end of the first word in a string of text.
 */

var getWordDistance = function getWordDistance(text) {
  var isRTL = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var dist = 0;
  var started = false;

  while (text.length > 0) {
    var charDist = getCharacterDistance(text, isRTL);
    var [char, remaining] = splitByCharacterDistance(text, charDist, isRTL);

    if (isWordCharacter(char, remaining, isRTL)) {
      started = true;
      dist += charDist;
    } else if (!started) {
      dist += charDist;
    } else {
      break;
    }

    text = remaining;
  }

  return dist;
};
/**
 * Split a string in two parts at a given distance starting from the end when
 * `isRTL` is set to `true`.
 */

var splitByCharacterDistance = (str, dist, isRTL) => {
  if (isRTL) {
    var at = str.length - dist;
    return [str.slice(at, str.length), str.slice(0, at)];
  }

  return [str.slice(0, dist), str.slice(dist)];
};
/**
 * Check if a character is a word character. The `remaining` argument is used
 * because sometimes you must read subsequent characters to truly determine it.
 */

var isWordCharacter = function isWordCharacter(char, remaining) {
  var isRTL = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (SPACE.test(char)) {
    return false;
  } // Chameleons count as word characters as long as they're in a word, so
  // recurse to see if the next one is a word character or not.


  if (CHAMELEON.test(char)) {
    var charDist = getCharacterDistance(remaining, isRTL);
    var [nextChar, nextRemaining] = splitByCharacterDistance(remaining, charDist, isRTL);

    if (isWordCharacter(nextChar, nextRemaining, isRTL)) {
      return true;
    }
  }

  if (PUNCTUATION.test(char)) {
    return false;
  }

  return true;
};
/**
 * Iterate on codepoints from right to left.
 */


var codepointsIteratorRTL = function* codepointsIteratorRTL(str) {
  var end = str.length - 1;

  for (var i = 0; i < str.length; i++) {
    var char1 = str.charAt(end - i);

    if (isLowSurrogate(char1.charCodeAt(0))) {
      var char2 = str.charAt(end - i - 1);

      if (isHighSurrogate(char2.charCodeAt(0))) {
        yield char2 + char1;
        i++;
        continue;
      }
    }

    yield char1;
  }
};
/**
 * Is `charCode` a high surrogate.
 *
 * https://en.wikipedia.org/wiki/Universal_Character_Set_characters#Surrogates
 */

var isHighSurrogate = charCode => {
  return charCode >= 0xd800 && charCode <= 0xdbff;
};
/**
 * Is `charCode` a low surrogate.
 *
 * https://en.wikipedia.org/wiki/Universal_Character_Set_characters#Surrogates
 */


var isLowSurrogate = charCode => {
  return charCode >= 0xdc00 && charCode <= 0xdfff;
};

var CodepointType;

(function (CodepointType) {
  CodepointType[CodepointType["None"] = 0] = "None";
  CodepointType[CodepointType["Extend"] = 1] = "Extend";
  CodepointType[CodepointType["ZWJ"] = 2] = "ZWJ";
  CodepointType[CodepointType["RI"] = 4] = "RI";
  CodepointType[CodepointType["Prepend"] = 8] = "Prepend";
  CodepointType[CodepointType["SpacingMark"] = 16] = "SpacingMark";
  CodepointType[CodepointType["L"] = 32] = "L";
  CodepointType[CodepointType["V"] = 64] = "V";
  CodepointType[CodepointType["T"] = 128] = "T";
  CodepointType[CodepointType["LV"] = 256] = "LV";
  CodepointType[CodepointType["LVT"] = 512] = "LVT";
  CodepointType[CodepointType["ExtPict"] = 1024] = "ExtPict";
  CodepointType[CodepointType["Any"] = 2048] = "Any";
})(CodepointType || (CodepointType = {}));

var reExtend = /^(?:[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09BE\u09C1-\u09C4\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3E\u0B3F\u0B41-\u0B44\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B82\u0BBE\u0BC0\u0BCD\u0BD7\u0C00\u0C04\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC2\u0CC6\u0CCC\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D3E\u0D41-\u0D44\u0D4D\u0D57\u0D62\u0D63\u0D81\u0DCA\u0DCF\u0DD2-\u0DD4\u0DD6\u0DDF\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1AC0\u1B00-\u1B03\u1B34-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u200C\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA82C\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFF9E\uFF9F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDEAB\uDEAC\uDF46-\uDF50]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDC9-\uDDCC\uDDCF\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3B\uDF3C\uDF3E\uDF40\uDF57\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDC5E\uDCB0\uDCB3-\uDCB8\uDCBA\uDCBD\uDCBF\uDCC0\uDCC2\uDCC3\uDDAF\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD806[\uDC2F-\uDC37\uDC39\uDC3A\uDD30\uDD3B\uDD3C\uDD3E\uDD43\uDDD4-\uDDD7\uDDDA\uDDDB\uDDE0\uDE01-\uDE0A\uDE33-\uDE38\uDE3B-\uDE3E\uDE47\uDE51-\uDE56\uDE59-\uDE5B\uDE8A-\uDE96\uDE98\uDE99]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD45\uDD47\uDD90\uDD91\uDD95\uDD97\uDEF3\uDEF4]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF4F\uDF8F-\uDF92\uDFE4]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65\uDD67-\uDD69\uDD6E-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD30-\uDD36\uDEEC-\uDEEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uD83C[\uDFFB-\uDFFF]|\uDB40[\uDC20-\uDC7F\uDD00-\uDDEF])$/;
var rePrepend = /^(?:[\u0600-\u0605\u06DD\u070F\u0890\u0891\u08E2\u0D4E]|\uD804[\uDCBD\uDCCD\uDDC2\uDDC3]|\uD806[\uDD3F\uDD41\uDE3A\uDE84-\uDE89]|\uD807\uDD46)$/;
var reSpacingMark = /^(?:[\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E\u094F\u0982\u0983\u09BF\u09C0\u09C7\u09C8\u09CB\u09CC\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB\u0ACC\u0B02\u0B03\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0C01-\u0C03\u0C41-\u0C44\u0C82\u0C83\u0CBE\u0CC0\u0CC1\u0CC3\u0CC4\u0CC7\u0CC8\u0CCA\u0CCB\u0D02\u0D03\u0D3F\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D82\u0D83\u0DD0\u0DD1\u0DD8-\u0DDE\u0DF2\u0DF3\u0E33\u0EB3\u0F3E\u0F3F\u0F7F\u1031\u103B\u103C\u1056\u1057\u1084\u1715\u1734\u17B6\u17BE-\u17C5\u17C7\u17C8\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1A19\u1A1A\u1A55\u1A57\u1A6D-\u1A72\u1B04\u1B3B\u1B3D-\u1B41\u1B43\u1B44\u1B82\u1BA1\u1BA6\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1C24-\u1C2B\u1C34\u1C35\u1CE1\u1CF7\uA823\uA824\uA827\uA880\uA881\uA8B4-\uA8C3\uA952\uA953\uA983\uA9B4\uA9B5\uA9BA\uA9BB\uA9BE-\uA9C0\uAA2F\uAA30\uAA33\uAA34\uAA4D\uAAEB\uAAEE\uAAEF\uAAF5\uABE3\uABE4\uABE6\uABE7\uABE9\uABEA\uABEC]|\uD804[\uDC00\uDC02\uDC82\uDCB0-\uDCB2\uDCB7\uDCB8\uDD2C\uDD45\uDD46\uDD82\uDDB3-\uDDB5\uDDBF\uDDC0\uDDCE\uDE2C-\uDE2E\uDE32\uDE33\uDE35\uDEE0-\uDEE2\uDF02\uDF03\uDF3F\uDF41-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF62\uDF63]|\uD805[\uDC35-\uDC37\uDC40\uDC41\uDC45\uDCB1\uDCB2\uDCB9\uDCBB\uDCBC\uDCBE\uDCC1\uDDB0\uDDB1\uDDB8-\uDDBB\uDDBE\uDE30-\uDE32\uDE3B\uDE3C\uDE3E\uDEAC\uDEAE\uDEAF\uDEB6\uDF26]|\uD806[\uDC2C-\uDC2E\uDC38\uDD31-\uDD35\uDD37\uDD38\uDD3D\uDD40\uDD42\uDDD1-\uDDD3\uDDDC-\uDDDF\uDDE4\uDE39\uDE57\uDE58\uDE97]|\uD807[\uDC2F\uDC3E\uDCA9\uDCB1\uDCB4\uDD8A-\uDD8E\uDD93\uDD94\uDD96\uDEF5\uDEF6]|\uD81B[\uDF51-\uDF87\uDFF0\uDFF1]|\uD834[\uDD66\uDD6D])$/;
var reL = /^[\u1100-\u115F\uA960-\uA97C]$/;
var reV = /^[\u1160-\u11A7\uD7B0-\uD7C6]$/;
var reT = /^[\u11A8-\u11FF\uD7CB-\uD7FB]$/;
var reLV = /^[\uAC00\uAC1C\uAC38\uAC54\uAC70\uAC8C\uACA8\uACC4\uACE0\uACFC\uAD18\uAD34\uAD50\uAD6C\uAD88\uADA4\uADC0\uADDC\uADF8\uAE14\uAE30\uAE4C\uAE68\uAE84\uAEA0\uAEBC\uAED8\uAEF4\uAF10\uAF2C\uAF48\uAF64\uAF80\uAF9C\uAFB8\uAFD4\uAFF0\uB00C\uB028\uB044\uB060\uB07C\uB098\uB0B4\uB0D0\uB0EC\uB108\uB124\uB140\uB15C\uB178\uB194\uB1B0\uB1CC\uB1E8\uB204\uB220\uB23C\uB258\uB274\uB290\uB2AC\uB2C8\uB2E4\uB300\uB31C\uB338\uB354\uB370\uB38C\uB3A8\uB3C4\uB3E0\uB3FC\uB418\uB434\uB450\uB46C\uB488\uB4A4\uB4C0\uB4DC\uB4F8\uB514\uB530\uB54C\uB568\uB584\uB5A0\uB5BC\uB5D8\uB5F4\uB610\uB62C\uB648\uB664\uB680\uB69C\uB6B8\uB6D4\uB6F0\uB70C\uB728\uB744\uB760\uB77C\uB798\uB7B4\uB7D0\uB7EC\uB808\uB824\uB840\uB85C\uB878\uB894\uB8B0\uB8CC\uB8E8\uB904\uB920\uB93C\uB958\uB974\uB990\uB9AC\uB9C8\uB9E4\uBA00\uBA1C\uBA38\uBA54\uBA70\uBA8C\uBAA8\uBAC4\uBAE0\uBAFC\uBB18\uBB34\uBB50\uBB6C\uBB88\uBBA4\uBBC0\uBBDC\uBBF8\uBC14\uBC30\uBC4C\uBC68\uBC84\uBCA0\uBCBC\uBCD8\uBCF4\uBD10\uBD2C\uBD48\uBD64\uBD80\uBD9C\uBDB8\uBDD4\uBDF0\uBE0C\uBE28\uBE44\uBE60\uBE7C\uBE98\uBEB4\uBED0\uBEEC\uBF08\uBF24\uBF40\uBF5C\uBF78\uBF94\uBFB0\uBFCC\uBFE8\uC004\uC020\uC03C\uC058\uC074\uC090\uC0AC\uC0C8\uC0E4\uC100\uC11C\uC138\uC154\uC170\uC18C\uC1A8\uC1C4\uC1E0\uC1FC\uC218\uC234\uC250\uC26C\uC288\uC2A4\uC2C0\uC2DC\uC2F8\uC314\uC330\uC34C\uC368\uC384\uC3A0\uC3BC\uC3D8\uC3F4\uC410\uC42C\uC448\uC464\uC480\uC49C\uC4B8\uC4D4\uC4F0\uC50C\uC528\uC544\uC560\uC57C\uC598\uC5B4\uC5D0\uC5EC\uC608\uC624\uC640\uC65C\uC678\uC694\uC6B0\uC6CC\uC6E8\uC704\uC720\uC73C\uC758\uC774\uC790\uC7AC\uC7C8\uC7E4\uC800\uC81C\uC838\uC854\uC870\uC88C\uC8A8\uC8C4\uC8E0\uC8FC\uC918\uC934\uC950\uC96C\uC988\uC9A4\uC9C0\uC9DC\uC9F8\uCA14\uCA30\uCA4C\uCA68\uCA84\uCAA0\uCABC\uCAD8\uCAF4\uCB10\uCB2C\uCB48\uCB64\uCB80\uCB9C\uCBB8\uCBD4\uCBF0\uCC0C\uCC28\uCC44\uCC60\uCC7C\uCC98\uCCB4\uCCD0\uCCEC\uCD08\uCD24\uCD40\uCD5C\uCD78\uCD94\uCDB0\uCDCC\uCDE8\uCE04\uCE20\uCE3C\uCE58\uCE74\uCE90\uCEAC\uCEC8\uCEE4\uCF00\uCF1C\uCF38\uCF54\uCF70\uCF8C\uCFA8\uCFC4\uCFE0\uCFFC\uD018\uD034\uD050\uD06C\uD088\uD0A4\uD0C0\uD0DC\uD0F8\uD114\uD130\uD14C\uD168\uD184\uD1A0\uD1BC\uD1D8\uD1F4\uD210\uD22C\uD248\uD264\uD280\uD29C\uD2B8\uD2D4\uD2F0\uD30C\uD328\uD344\uD360\uD37C\uD398\uD3B4\uD3D0\uD3EC\uD408\uD424\uD440\uD45C\uD478\uD494\uD4B0\uD4CC\uD4E8\uD504\uD520\uD53C\uD558\uD574\uD590\uD5AC\uD5C8\uD5E4\uD600\uD61C\uD638\uD654\uD670\uD68C\uD6A8\uD6C4\uD6E0\uD6FC\uD718\uD734\uD750\uD76C\uD788]$/;
var reLVT = /^[\uAC01-\uAC1B\uAC1D-\uAC37\uAC39-\uAC53\uAC55-\uAC6F\uAC71-\uAC8B\uAC8D-\uACA7\uACA9-\uACC3\uACC5-\uACDF\uACE1-\uACFB\uACFD-\uAD17\uAD19-\uAD33\uAD35-\uAD4F\uAD51-\uAD6B\uAD6D-\uAD87\uAD89-\uADA3\uADA5-\uADBF\uADC1-\uADDB\uADDD-\uADF7\uADF9-\uAE13\uAE15-\uAE2F\uAE31-\uAE4B\uAE4D-\uAE67\uAE69-\uAE83\uAE85-\uAE9F\uAEA1-\uAEBB\uAEBD-\uAED7\uAED9-\uAEF3\uAEF5-\uAF0F\uAF11-\uAF2B\uAF2D-\uAF47\uAF49-\uAF63\uAF65-\uAF7F\uAF81-\uAF9B\uAF9D-\uAFB7\uAFB9-\uAFD3\uAFD5-\uAFEF\uAFF1-\uB00B\uB00D-\uB027\uB029-\uB043\uB045-\uB05F\uB061-\uB07B\uB07D-\uB097\uB099-\uB0B3\uB0B5-\uB0CF\uB0D1-\uB0EB\uB0ED-\uB107\uB109-\uB123\uB125-\uB13F\uB141-\uB15B\uB15D-\uB177\uB179-\uB193\uB195-\uB1AF\uB1B1-\uB1CB\uB1CD-\uB1E7\uB1E9-\uB203\uB205-\uB21F\uB221-\uB23B\uB23D-\uB257\uB259-\uB273\uB275-\uB28F\uB291-\uB2AB\uB2AD-\uB2C7\uB2C9-\uB2E3\uB2E5-\uB2FF\uB301-\uB31B\uB31D-\uB337\uB339-\uB353\uB355-\uB36F\uB371-\uB38B\uB38D-\uB3A7\uB3A9-\uB3C3\uB3C5-\uB3DF\uB3E1-\uB3FB\uB3FD-\uB417\uB419-\uB433\uB435-\uB44F\uB451-\uB46B\uB46D-\uB487\uB489-\uB4A3\uB4A5-\uB4BF\uB4C1-\uB4DB\uB4DD-\uB4F7\uB4F9-\uB513\uB515-\uB52F\uB531-\uB54B\uB54D-\uB567\uB569-\uB583\uB585-\uB59F\uB5A1-\uB5BB\uB5BD-\uB5D7\uB5D9-\uB5F3\uB5F5-\uB60F\uB611-\uB62B\uB62D-\uB647\uB649-\uB663\uB665-\uB67F\uB681-\uB69B\uB69D-\uB6B7\uB6B9-\uB6D3\uB6D5-\uB6EF\uB6F1-\uB70B\uB70D-\uB727\uB729-\uB743\uB745-\uB75F\uB761-\uB77B\uB77D-\uB797\uB799-\uB7B3\uB7B5-\uB7CF\uB7D1-\uB7EB\uB7ED-\uB807\uB809-\uB823\uB825-\uB83F\uB841-\uB85B\uB85D-\uB877\uB879-\uB893\uB895-\uB8AF\uB8B1-\uB8CB\uB8CD-\uB8E7\uB8E9-\uB903\uB905-\uB91F\uB921-\uB93B\uB93D-\uB957\uB959-\uB973\uB975-\uB98F\uB991-\uB9AB\uB9AD-\uB9C7\uB9C9-\uB9E3\uB9E5-\uB9FF\uBA01-\uBA1B\uBA1D-\uBA37\uBA39-\uBA53\uBA55-\uBA6F\uBA71-\uBA8B\uBA8D-\uBAA7\uBAA9-\uBAC3\uBAC5-\uBADF\uBAE1-\uBAFB\uBAFD-\uBB17\uBB19-\uBB33\uBB35-\uBB4F\uBB51-\uBB6B\uBB6D-\uBB87\uBB89-\uBBA3\uBBA5-\uBBBF\uBBC1-\uBBDB\uBBDD-\uBBF7\uBBF9-\uBC13\uBC15-\uBC2F\uBC31-\uBC4B\uBC4D-\uBC67\uBC69-\uBC83\uBC85-\uBC9F\uBCA1-\uBCBB\uBCBD-\uBCD7\uBCD9-\uBCF3\uBCF5-\uBD0F\uBD11-\uBD2B\uBD2D-\uBD47\uBD49-\uBD63\uBD65-\uBD7F\uBD81-\uBD9B\uBD9D-\uBDB7\uBDB9-\uBDD3\uBDD5-\uBDEF\uBDF1-\uBE0B\uBE0D-\uBE27\uBE29-\uBE43\uBE45-\uBE5F\uBE61-\uBE7B\uBE7D-\uBE97\uBE99-\uBEB3\uBEB5-\uBECF\uBED1-\uBEEB\uBEED-\uBF07\uBF09-\uBF23\uBF25-\uBF3F\uBF41-\uBF5B\uBF5D-\uBF77\uBF79-\uBF93\uBF95-\uBFAF\uBFB1-\uBFCB\uBFCD-\uBFE7\uBFE9-\uC003\uC005-\uC01F\uC021-\uC03B\uC03D-\uC057\uC059-\uC073\uC075-\uC08F\uC091-\uC0AB\uC0AD-\uC0C7\uC0C9-\uC0E3\uC0E5-\uC0FF\uC101-\uC11B\uC11D-\uC137\uC139-\uC153\uC155-\uC16F\uC171-\uC18B\uC18D-\uC1A7\uC1A9-\uC1C3\uC1C5-\uC1DF\uC1E1-\uC1FB\uC1FD-\uC217\uC219-\uC233\uC235-\uC24F\uC251-\uC26B\uC26D-\uC287\uC289-\uC2A3\uC2A5-\uC2BF\uC2C1-\uC2DB\uC2DD-\uC2F7\uC2F9-\uC313\uC315-\uC32F\uC331-\uC34B\uC34D-\uC367\uC369-\uC383\uC385-\uC39F\uC3A1-\uC3BB\uC3BD-\uC3D7\uC3D9-\uC3F3\uC3F5-\uC40F\uC411-\uC42B\uC42D-\uC447\uC449-\uC463\uC465-\uC47F\uC481-\uC49B\uC49D-\uC4B7\uC4B9-\uC4D3\uC4D5-\uC4EF\uC4F1-\uC50B\uC50D-\uC527\uC529-\uC543\uC545-\uC55F\uC561-\uC57B\uC57D-\uC597\uC599-\uC5B3\uC5B5-\uC5CF\uC5D1-\uC5EB\uC5ED-\uC607\uC609-\uC623\uC625-\uC63F\uC641-\uC65B\uC65D-\uC677\uC679-\uC693\uC695-\uC6AF\uC6B1-\uC6CB\uC6CD-\uC6E7\uC6E9-\uC703\uC705-\uC71F\uC721-\uC73B\uC73D-\uC757\uC759-\uC773\uC775-\uC78F\uC791-\uC7AB\uC7AD-\uC7C7\uC7C9-\uC7E3\uC7E5-\uC7FF\uC801-\uC81B\uC81D-\uC837\uC839-\uC853\uC855-\uC86F\uC871-\uC88B\uC88D-\uC8A7\uC8A9-\uC8C3\uC8C5-\uC8DF\uC8E1-\uC8FB\uC8FD-\uC917\uC919-\uC933\uC935-\uC94F\uC951-\uC96B\uC96D-\uC987\uC989-\uC9A3\uC9A5-\uC9BF\uC9C1-\uC9DB\uC9DD-\uC9F7\uC9F9-\uCA13\uCA15-\uCA2F\uCA31-\uCA4B\uCA4D-\uCA67\uCA69-\uCA83\uCA85-\uCA9F\uCAA1-\uCABB\uCABD-\uCAD7\uCAD9-\uCAF3\uCAF5-\uCB0F\uCB11-\uCB2B\uCB2D-\uCB47\uCB49-\uCB63\uCB65-\uCB7F\uCB81-\uCB9B\uCB9D-\uCBB7\uCBB9-\uCBD3\uCBD5-\uCBEF\uCBF1-\uCC0B\uCC0D-\uCC27\uCC29-\uCC43\uCC45-\uCC5F\uCC61-\uCC7B\uCC7D-\uCC97\uCC99-\uCCB3\uCCB5-\uCCCF\uCCD1-\uCCEB\uCCED-\uCD07\uCD09-\uCD23\uCD25-\uCD3F\uCD41-\uCD5B\uCD5D-\uCD77\uCD79-\uCD93\uCD95-\uCDAF\uCDB1-\uCDCB\uCDCD-\uCDE7\uCDE9-\uCE03\uCE05-\uCE1F\uCE21-\uCE3B\uCE3D-\uCE57\uCE59-\uCE73\uCE75-\uCE8F\uCE91-\uCEAB\uCEAD-\uCEC7\uCEC9-\uCEE3\uCEE5-\uCEFF\uCF01-\uCF1B\uCF1D-\uCF37\uCF39-\uCF53\uCF55-\uCF6F\uCF71-\uCF8B\uCF8D-\uCFA7\uCFA9-\uCFC3\uCFC5-\uCFDF\uCFE1-\uCFFB\uCFFD-\uD017\uD019-\uD033\uD035-\uD04F\uD051-\uD06B\uD06D-\uD087\uD089-\uD0A3\uD0A5-\uD0BF\uD0C1-\uD0DB\uD0DD-\uD0F7\uD0F9-\uD113\uD115-\uD12F\uD131-\uD14B\uD14D-\uD167\uD169-\uD183\uD185-\uD19F\uD1A1-\uD1BB\uD1BD-\uD1D7\uD1D9-\uD1F3\uD1F5-\uD20F\uD211-\uD22B\uD22D-\uD247\uD249-\uD263\uD265-\uD27F\uD281-\uD29B\uD29D-\uD2B7\uD2B9-\uD2D3\uD2D5-\uD2EF\uD2F1-\uD30B\uD30D-\uD327\uD329-\uD343\uD345-\uD35F\uD361-\uD37B\uD37D-\uD397\uD399-\uD3B3\uD3B5-\uD3CF\uD3D1-\uD3EB\uD3ED-\uD407\uD409-\uD423\uD425-\uD43F\uD441-\uD45B\uD45D-\uD477\uD479-\uD493\uD495-\uD4AF\uD4B1-\uD4CB\uD4CD-\uD4E7\uD4E9-\uD503\uD505-\uD51F\uD521-\uD53B\uD53D-\uD557\uD559-\uD573\uD575-\uD58F\uD591-\uD5AB\uD5AD-\uD5C7\uD5C9-\uD5E3\uD5E5-\uD5FF\uD601-\uD61B\uD61D-\uD637\uD639-\uD653\uD655-\uD66F\uD671-\uD68B\uD68D-\uD6A7\uD6A9-\uD6C3\uD6C5-\uD6DF\uD6E1-\uD6FB\uD6FD-\uD717\uD719-\uD733\uD735-\uD74F\uD751-\uD76B\uD76D-\uD787\uD789-\uD7A3]$/;
var reExtPict = /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2605\u2607-\u2612\u2614-\u2685\u2690-\u2705\u2708-\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2767\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDAD-\uDDE5\uDE01-\uDE0F\uDE1A\uDE2F\uDE32-\uDE3A\uDE3C-\uDE3F\uDE49-\uDFFA]|\uD83D[\uDC00-\uDD3D\uDD46-\uDE4F\uDE80-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDCFF\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDEFF]|\uD83F[\uDC00-\uDFFD])$/;

var getCodepointType = (char, code) => {
  var type = CodepointType.Any;

  if (char.search(reExtend) !== -1) {
    type |= CodepointType.Extend;
  }

  if (code === 0x200d) {
    type |= CodepointType.ZWJ;
  }

  if (code >= 0x1f1e6 && code <= 0x1f1ff) {
    type |= CodepointType.RI;
  }

  if (char.search(rePrepend) !== -1) {
    type |= CodepointType.Prepend;
  }

  if (char.search(reSpacingMark) !== -1) {
    type |= CodepointType.SpacingMark;
  }

  if (char.search(reL) !== -1) {
    type |= CodepointType.L;
  }

  if (char.search(reV) !== -1) {
    type |= CodepointType.V;
  }

  if (char.search(reT) !== -1) {
    type |= CodepointType.T;
  }

  if (char.search(reLV) !== -1) {
    type |= CodepointType.LV;
  }

  if (char.search(reLVT) !== -1) {
    type |= CodepointType.LVT;
  }

  if (char.search(reExtPict) !== -1) {
    type |= CodepointType.ExtPict;
  }

  return type;
};

function intersects(x, y) {
  return (x & y) !== 0;
}

var NonBoundaryPairs = [// GB6
[CodepointType.L, CodepointType.L | CodepointType.V | CodepointType.LV | CodepointType.LVT], // GB7
[CodepointType.LV | CodepointType.V, CodepointType.V | CodepointType.T], // GB8
[CodepointType.LVT | CodepointType.T, CodepointType.T], // GB9
[CodepointType.Any, CodepointType.Extend | CodepointType.ZWJ], // GB9a
[CodepointType.Any, CodepointType.SpacingMark], // GB9b
[CodepointType.Prepend, CodepointType.Any], // GB11
[CodepointType.ZWJ, CodepointType.ExtPict], // GB12 and GB13
[CodepointType.RI, CodepointType.RI]];

function isBoundaryPair(left, right) {
  return NonBoundaryPairs.findIndex(r => intersects(left, r[0]) && intersects(right, r[1])) === -1;
}

var endingEmojiZWJ = /(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2605\u2607-\u2612\u2614-\u2685\u2690-\u2705\u2708-\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2767\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDAD-\uDDE5\uDE01-\uDE0F\uDE1A\uDE2F\uDE32-\uDE3A\uDE3C-\uDE3F\uDE49-\uDFFA]|\uD83D[\uDC00-\uDD3D\uDD46-\uDE4F\uDE80-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDCFF\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDEFF]|\uD83F[\uDC00-\uDFFD])(?:[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09BE\u09C1-\u09C4\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3E\u0B3F\u0B41-\u0B44\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B82\u0BBE\u0BC0\u0BCD\u0BD7\u0C00\u0C04\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC2\u0CC6\u0CCC\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D3E\u0D41-\u0D44\u0D4D\u0D57\u0D62\u0D63\u0D81\u0DCA\u0DCF\u0DD2-\u0DD4\u0DD6\u0DDF\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1AC0\u1B00-\u1B03\u1B34-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u200C\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA82C\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFF9E\uFF9F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDEAB\uDEAC\uDF46-\uDF50]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDC9-\uDDCC\uDDCF\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3B\uDF3C\uDF3E\uDF40\uDF57\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDC5E\uDCB0\uDCB3-\uDCB8\uDCBA\uDCBD\uDCBF\uDCC0\uDCC2\uDCC3\uDDAF\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD806[\uDC2F-\uDC37\uDC39\uDC3A\uDD30\uDD3B\uDD3C\uDD3E\uDD43\uDDD4-\uDDD7\uDDDA\uDDDB\uDDE0\uDE01-\uDE0A\uDE33-\uDE38\uDE3B-\uDE3E\uDE47\uDE51-\uDE56\uDE59-\uDE5B\uDE8A-\uDE96\uDE98\uDE99]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD45\uDD47\uDD90\uDD91\uDD95\uDD97\uDEF3\uDEF4]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF4F\uDF8F-\uDF92\uDFE4]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65\uDD67-\uDD69\uDD6E-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD30-\uDD36\uDEEC-\uDEEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uD83C[\uDFFB-\uDFFF]|\uDB40[\uDC20-\uDC7F\uDD00-\uDDEF])*\u200D$/;

var endsWithEmojiZWJ = str => {
  return str.search(endingEmojiZWJ) !== -1;
};

var endingRIs = /(?:\uD83C[\uDDE6-\uDDFF])+$/g;

var endsWithOddNumberOfRIs = str => {
  var match = str.match(endingRIs);

  if (match === null) {
    return false;
  } else {
    // A RI is represented by a surrogate pair.
    var numRIs = match[0].length / 2;
    return numRIs % 2 === 1;
  }
};

/**
 * Shared the function with isElementType utility
 */

var isElement = value => {
  return isPlainObject(value) && Node.isNodeList(value.children) && !Editor.isEditor(value);
};

var Element$9 = {
  /**
   * Check if a value implements the 'Ancestor' interface.
   */
  isAncestor(value) {
    return isPlainObject(value) && Node.isNodeList(value.children);
  },

  /**
   * Check if a value implements the `Element` interface.
   */
  isElement,

  /**
   * Check if a value is an array of `Element` objects.
   */
  isElementList(value) {
    return Array.isArray(value) && value.every(val => Element$9.isElement(val));
  },

  /**
   * Check if a set of props is a partial of Element.
   */
  isElementProps(props) {
    return props.children !== undefined;
  },

  /**
   * Check if a value implements the `Element` interface and has elementKey with selected value.
   * Default it check to `type` key value
   */
  isElementType: function isElementType(value, elementVal) {
    var elementKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'type';
    return isElement(value) && value[elementKey] === elementVal;
  },

  /**
   * Check if an element matches set of properties.
   *
   * Note: this checks custom properties, and it does not ensure that any
   * children are equivalent.
   */
  matches(element, props) {
    for (var key in props) {
      if (key === 'children') {
        continue;
      }

      if (element[key] !== props[key]) {
        return false;
      }
    }

    return true;
  }

};

var _excluded$4 = ["text"],
    _excluded2$3 = ["text"];

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$8(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var IS_EDITOR_CACHE = new WeakMap();
var Editor = {
  /**
   * Get the ancestor above a location in the document.
   */
  above(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      voids = false,
      mode = 'lowest',
      at = editor.selection,
      match
    } = options;

    if (!at) {
      return;
    }

    var path = Editor.path(editor, at);
    var reverse = mode === 'lowest';

    for (var [n, p] of Editor.levels(editor, {
      at: path,
      voids,
      match,
      reverse
    })) {
      if (!Text$1.isText(n) && !Path.equals(path, p)) {
        return [n, p];
      }
    }
  },

  /**
   * Add a custom property to the leaf text nodes in the current selection.
   *
   * If the selection is currently collapsed, the marks will be added to the
   * `editor.marks` property instead, and applied when text is inserted next.
   */
  addMark(editor, key, value) {
    editor.addMark(key, value);
  },

  /**
   * Get the point after a location.
   */
  after(editor, at) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var anchor = Editor.point(editor, at, {
      edge: 'end'
    });
    var focus = Editor.end(editor, []);
    var range = {
      anchor,
      focus
    };
    var {
      distance = 1
    } = options;
    var d = 0;
    var target;

    for (var p of Editor.positions(editor, _objectSpread$8(_objectSpread$8({}, options), {}, {
      at: range
    }))) {
      if (d > distance) {
        break;
      }

      if (d !== 0) {
        target = p;
      }

      d++;
    }

    return target;
  },

  /**
   * Get the point before a location.
   */
  before(editor, at) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var anchor = Editor.start(editor, []);
    var focus = Editor.point(editor, at, {
      edge: 'start'
    });
    var range = {
      anchor,
      focus
    };
    var {
      distance = 1
    } = options;
    var d = 0;
    var target;

    for (var p of Editor.positions(editor, _objectSpread$8(_objectSpread$8({}, options), {}, {
      at: range,
      reverse: true
    }))) {
      if (d > distance) {
        break;
      }

      if (d !== 0) {
        target = p;
      }

      d++;
    }

    return target;
  },

  /**
   * Delete content in the editor backward from the current selection.
   */
  deleteBackward(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      unit = 'character'
    } = options;
    editor.deleteBackward(unit);
  },

  /**
   * Delete content in the editor forward from the current selection.
   */
  deleteForward(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      unit = 'character'
    } = options;
    editor.deleteForward(unit);
  },

  /**
   * Delete the content in the current selection.
   */
  deleteFragment(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      direction = 'forward'
    } = options;
    editor.deleteFragment(direction);
  },

  /**
   * Get the start and end points of a location.
   */
  edges(editor, at) {
    return [Editor.start(editor, at), Editor.end(editor, at)];
  },

  /**
   * Get the end point of a location.
   */
  end(editor, at) {
    return Editor.point(editor, at, {
      edge: 'end'
    });
  },

  /**
   * Get the first node at a location.
   */
  first(editor, at) {
    var path = Editor.path(editor, at, {
      edge: 'start'
    });
    return Editor.node(editor, path);
  },

  /**
   * Get the fragment at a location.
   */
  fragment(editor, at) {
    var range = Editor.range(editor, at);
    var fragment = Node.fragment(editor, range);
    return fragment;
  },

  /**
   * Check if a node has block children.
   */
  hasBlocks(editor, element) {
    return element.children.some(n => Editor.isBlock(editor, n));
  },

  /**
   * Check if a node has inline and text children.
   */
  hasInlines(editor, element) {
    return element.children.some(n => Text$1.isText(n) || Editor.isInline(editor, n));
  },

  /**
   * Check if a node has text children.
   */
  hasTexts(editor, element) {
    return element.children.every(n => Text$1.isText(n));
  },

  /**
   * Insert a block break at the current selection.
   *
   * If the selection is currently expanded, it will be deleted first.
   */
  insertBreak(editor) {
    editor.insertBreak();
  },

  /**
   * Insert a fragment at the current selection.
   *
   * If the selection is currently expanded, it will be deleted first.
   */
  insertFragment(editor, fragment) {
    editor.insertFragment(fragment);
  },

  /**
   * Insert a node at the current selection.
   *
   * If the selection is currently expanded, it will be deleted first.
   */
  insertNode(editor, node) {
    editor.insertNode(node);
  },

  /**
   * Insert text at the current selection.
   *
   * If the selection is currently expanded, it will be deleted first.
   */
  insertText(editor, text) {
    editor.insertText(text);
  },

  /**
   * Check if a value is a block `Element` object.
   */
  isBlock(editor, value) {
    return Element$9.isElement(value) && !editor.isInline(value);
  },

  /**
   * Check if a value is an `Editor` object.
   */
  isEditor(value) {
    if (!isPlainObject(value)) return false;
    var cachedIsEditor = IS_EDITOR_CACHE.get(value);

    if (cachedIsEditor !== undefined) {
      return cachedIsEditor;
    }

    var isEditor = typeof value.addMark === 'function' && typeof value.apply === 'function' && typeof value.deleteBackward === 'function' && typeof value.deleteForward === 'function' && typeof value.deleteFragment === 'function' && typeof value.insertBreak === 'function' && typeof value.insertFragment === 'function' && typeof value.insertNode === 'function' && typeof value.insertText === 'function' && typeof value.isInline === 'function' && typeof value.isVoid === 'function' && typeof value.normalizeNode === 'function' && typeof value.onChange === 'function' && typeof value.removeMark === 'function' && (value.marks === null || isPlainObject(value.marks)) && (value.selection === null || Range.isRange(value.selection)) && Node.isNodeList(value.children) && Operation.isOperationList(value.operations);
    IS_EDITOR_CACHE.set(value, isEditor);
    return isEditor;
  },

  /**
   * Check if a point is the end point of a location.
   */
  isEnd(editor, point, at) {
    var end = Editor.end(editor, at);
    return Point.equals(point, end);
  },

  /**
   * Check if a point is an edge of a location.
   */
  isEdge(editor, point, at) {
    return Editor.isStart(editor, point, at) || Editor.isEnd(editor, point, at);
  },

  /**
   * Check if an element is empty, accounting for void nodes.
   */
  isEmpty(editor, element) {
    var {
      children
    } = element;
    var [first] = children;
    return children.length === 0 || children.length === 1 && Text$1.isText(first) && first.text === '' && !editor.isVoid(element);
  },

  /**
   * Check if a value is an inline `Element` object.
   */
  isInline(editor, value) {
    return Element$9.isElement(value) && editor.isInline(value);
  },

  /**
   * Check if the editor is currently normalizing after each operation.
   */
  isNormalizing(editor) {
    var isNormalizing = NORMALIZING.get(editor);
    return isNormalizing === undefined ? true : isNormalizing;
  },

  /**
   * Check if a point is the start point of a location.
   */
  isStart(editor, point, at) {
    // PERF: If the offset isn't `0` we know it's not the start.
    if (point.offset !== 0) {
      return false;
    }

    var start = Editor.start(editor, at);
    return Point.equals(point, start);
  },

  /**
   * Check if a value is a void `Element` object.
   */
  isVoid(editor, value) {
    return Element$9.isElement(value) && editor.isVoid(value);
  },

  /**
   * Get the last node at a location.
   */
  last(editor, at) {
    var path = Editor.path(editor, at, {
      edge: 'end'
    });
    return Editor.node(editor, path);
  },

  /**
   * Get the leaf text node at a location.
   */
  leaf(editor, at) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var path = Editor.path(editor, at, options);
    var node = Node.leaf(editor, path);
    return [node, path];
  },

  /**
   * Iterate through all of the levels at a location.
   */
  *levels(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      at = editor.selection,
      reverse = false,
      voids = false
    } = options;
    var {
      match
    } = options;

    if (match == null) {
      match = () => true;
    }

    if (!at) {
      return;
    }

    var levels = [];
    var path = Editor.path(editor, at);

    for (var [n, p] of Node.levels(editor, path)) {
      if (!match(n, p)) {
        continue;
      }

      levels.push([n, p]);

      if (!voids && Editor.isVoid(editor, n)) {
        break;
      }
    }

    if (reverse) {
      levels.reverse();
    }

    yield* levels;
  },

  /**
   * Get the marks that would be added to text at the current selection.
   */
  marks(editor) {
    var {
      marks,
      selection
    } = editor;

    if (!selection) {
      return null;
    }

    if (marks) {
      return marks;
    }

    if (Range.isExpanded(selection)) {
      var [match] = Editor.nodes(editor, {
        match: Text$1.isText
      });

      if (match) {
        var [_node] = match;

        var _rest = _objectWithoutProperties$1(_node, _excluded$4);

        return _rest;
      } else {
        return {};
      }
    }

    var {
      anchor
    } = selection;
    var {
      path
    } = anchor;
    var [node] = Editor.leaf(editor, path);

    if (anchor.offset === 0) {
      var prev = Editor.previous(editor, {
        at: path,
        match: Text$1.isText
      });
      var block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n)
      });

      if (prev && block) {
        var [prevNode, prevPath] = prev;
        var [, blockPath] = block;

        if (Path.isAncestor(blockPath, prevPath)) {
          node = prevNode;
        }
      }
    }

    var rest = _objectWithoutProperties$1(node, _excluded2$3);

    return rest;
  },

  /**
   * Get the matching node in the branch of the document after a location.
   */
  next(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      mode = 'lowest',
      voids = false
    } = options;
    var {
      match,
      at = editor.selection
    } = options;

    if (!at) {
      return;
    }

    var pointAfterLocation = Editor.after(editor, at, {
      voids
    });
    if (!pointAfterLocation) return;
    var [, to] = Editor.last(editor, []);
    var span = [pointAfterLocation.path, to];

    if (Path.isPath(at) && at.length === 0) {
      throw new Error("Cannot get the next node from the root node!");
    }

    if (match == null) {
      if (Path.isPath(at)) {
        var [parent] = Editor.parent(editor, at);

        match = n => parent.children.includes(n);
      } else {
        match = () => true;
      }
    }

    var [next] = Editor.nodes(editor, {
      at: span,
      match,
      mode,
      voids
    });
    return next;
  },

  /**
   * Get the node at a location.
   */
  node(editor, at) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var path = Editor.path(editor, at, options);
    var node = Node.get(editor, path);
    return [node, path];
  },

  /**
   * Iterate through all of the nodes in the Editor.
   */
  *nodes(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      at = editor.selection,
      mode = 'all',
      universal = false,
      reverse = false,
      voids = false
    } = options;
    var {
      match
    } = options;

    if (!match) {
      match = () => true;
    }

    if (!at) {
      return;
    }

    var from;
    var to;

    if (Span.isSpan(at)) {
      from = at[0];
      to = at[1];
    } else {
      var first = Editor.path(editor, at, {
        edge: 'start'
      });
      var last = Editor.path(editor, at, {
        edge: 'end'
      });
      from = reverse ? last : first;
      to = reverse ? first : last;
    }

    var nodeEntries = Node.nodes(editor, {
      reverse,
      from,
      to,
      pass: _ref => {
        var [n] = _ref;
        return voids ? false : Editor.isVoid(editor, n);
      }
    });
    var matches = [];
    var hit;

    for (var [node, path] of nodeEntries) {
      var isLower = hit && Path.compare(path, hit[1]) === 0; // In highest mode any node lower than the last hit is not a match.

      if (mode === 'highest' && isLower) {
        continue;
      }

      if (!match(node, path)) {
        // If we've arrived at a leaf text node that is not lower than the last
        // hit, then we've found a branch that doesn't include a match, which
        // means the match is not universal.
        if (universal && !isLower && Text$1.isText(node)) {
          return;
        } else {
          continue;
        }
      } // If there's a match and it's lower than the last, update the hit.


      if (mode === 'lowest' && isLower) {
        hit = [node, path];
        continue;
      } // In lowest mode we emit the last hit, once it's guaranteed lowest.


      var emit = mode === 'lowest' ? hit : [node, path];

      if (emit) {
        if (universal) {
          matches.push(emit);
        } else {
          yield emit;
        }
      }

      hit = [node, path];
    } // Since lowest is always emitting one behind, catch up at the end.


    if (mode === 'lowest' && hit) {
      if (universal) {
        matches.push(hit);
      } else {
        yield hit;
      }
    } // Universal defers to ensure that the match occurs in every branch, so we
    // yield all of the matches after iterating.


    if (universal) {
      yield* matches;
    }
  },

  /**
   * Normalize any dirty objects in the editor.
   */
  normalize(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      force = false
    } = options;

    var getDirtyPaths = editor => {
      return DIRTY_PATHS.get(editor) || [];
    };

    var getDirtyPathKeys = editor => {
      return DIRTY_PATH_KEYS.get(editor) || new Set();
    };

    var popDirtyPath = editor => {
      var path = getDirtyPaths(editor).pop();
      var key = path.join(',');
      getDirtyPathKeys(editor).delete(key);
      return path;
    };

    if (!Editor.isNormalizing(editor)) {
      return;
    }

    if (force) {
      var allPaths = Array.from(Node.nodes(editor), _ref2 => {
        var [, p] = _ref2;
        return p;
      });
      var allPathKeys = new Set(allPaths.map(p => p.join(',')));
      DIRTY_PATHS.set(editor, allPaths);
      DIRTY_PATH_KEYS.set(editor, allPathKeys);
    }

    if (getDirtyPaths(editor).length === 0) {
      return;
    }

    Editor.withoutNormalizing(editor, () => {
      /*
        Fix dirty elements with no children.
        editor.normalizeNode() does fix this, but some normalization fixes also require it to work.
        Running an initial pass avoids the catch-22 race condition.
      */
      for (var dirtyPath of getDirtyPaths(editor)) {
        if (Node.has(editor, dirtyPath)) {
          var entry = Editor.node(editor, dirtyPath);
          var [node, _] = entry;
          /*
            The default normalizer inserts an empty text node in this scenario, but it can be customised.
            So there is some risk here.
                       As long as the normalizer only inserts child nodes for this case it is safe to do in any order;
            by definition adding children to an empty node can't cause other paths to change.
          */

          if (Element$9.isElement(node) && node.children.length === 0) {
            editor.normalizeNode(entry);
          }
        }
      }

      var max = getDirtyPaths(editor).length * 42; // HACK: better way?

      var m = 0;

      while (getDirtyPaths(editor).length !== 0) {
        if (m > max) {
          throw new Error("\n            Could not completely normalize the editor after ".concat(max, " iterations! This is usually due to incorrect normalization logic that leaves a node in an invalid state.\n          "));
        }

        var _dirtyPath = popDirtyPath(editor); // If the node doesn't exist in the tree, it does not need to be normalized.


        if (Node.has(editor, _dirtyPath)) {
          var _entry = Editor.node(editor, _dirtyPath);

          editor.normalizeNode(_entry);
        }

        m++;
      }
    });
  },

  /**
   * Get the parent node of a location.
   */
  parent(editor, at) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var path = Editor.path(editor, at, options);
    var parentPath = Path.parent(path);
    var entry = Editor.node(editor, parentPath);
    return entry;
  },

  /**
   * Get the path of a location.
   */
  path(editor, at) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      depth,
      edge
    } = options;

    if (Path.isPath(at)) {
      if (edge === 'start') {
        var [, firstPath] = Node.first(editor, at);
        at = firstPath;
      } else if (edge === 'end') {
        var [, lastPath] = Node.last(editor, at);
        at = lastPath;
      }
    }

    if (Range.isRange(at)) {
      if (edge === 'start') {
        at = Range.start(at);
      } else if (edge === 'end') {
        at = Range.end(at);
      } else {
        at = Path.common(at.anchor.path, at.focus.path);
      }
    }

    if (Point.isPoint(at)) {
      at = at.path;
    }

    if (depth != null) {
      at = at.slice(0, depth);
    }

    return at;
  },

  hasPath(editor, path) {
    return Node.has(editor, path);
  },

  /**
   * Create a mutable ref for a `Path` object, which will stay in sync as new
   * operations are applied to the editor.
   */
  pathRef(editor, path) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      affinity = 'forward'
    } = options;
    var ref = {
      current: path,
      affinity,

      unref() {
        var {
          current
        } = ref;
        var pathRefs = Editor.pathRefs(editor);
        pathRefs.delete(ref);
        ref.current = null;
        return current;
      }

    };
    var refs = Editor.pathRefs(editor);
    refs.add(ref);
    return ref;
  },

  /**
   * Get the set of currently tracked path refs of the editor.
   */
  pathRefs(editor) {
    var refs = PATH_REFS.get(editor);

    if (!refs) {
      refs = new Set();
      PATH_REFS.set(editor, refs);
    }

    return refs;
  },

  /**
   * Get the start or end point of a location.
   */
  point(editor, at) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      edge = 'start'
    } = options;

    if (Path.isPath(at)) {
      var path;

      if (edge === 'end') {
        var [, lastPath] = Node.last(editor, at);
        path = lastPath;
      } else {
        var [, firstPath] = Node.first(editor, at);
        path = firstPath;
      }

      var node = Node.get(editor, path);

      if (!Text$1.isText(node)) {
        throw new Error("Cannot get the ".concat(edge, " point in the node at path [").concat(at, "] because it has no ").concat(edge, " text node."));
      }

      return {
        path,
        offset: edge === 'end' ? node.text.length : 0
      };
    }

    if (Range.isRange(at)) {
      var [start, end] = Range.edges(at);
      return edge === 'start' ? start : end;
    }

    return at;
  },

  /**
   * Create a mutable ref for a `Point` object, which will stay in sync as new
   * operations are applied to the editor.
   */
  pointRef(editor, point) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      affinity = 'forward'
    } = options;
    var ref = {
      current: point,
      affinity,

      unref() {
        var {
          current
        } = ref;
        var pointRefs = Editor.pointRefs(editor);
        pointRefs.delete(ref);
        ref.current = null;
        return current;
      }

    };
    var refs = Editor.pointRefs(editor);
    refs.add(ref);
    return ref;
  },

  /**
   * Get the set of currently tracked point refs of the editor.
   */
  pointRefs(editor) {
    var refs = POINT_REFS.get(editor);

    if (!refs) {
      refs = new Set();
      POINT_REFS.set(editor, refs);
    }

    return refs;
  },

  /**
   * Return all the positions in `at` range where a `Point` can be placed.
   *
   * By default, moves forward by individual offsets at a time, but
   * the `unit` option can be used to to move by character, word, line, or block.
   *
   * The `reverse` option can be used to change iteration direction.
   *
   * Note: By default void nodes are treated as a single point and iteration
   * will not happen inside their content unless you pass in true for the
   * `voids` option, then iteration will occur.
   */
  *positions(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      at = editor.selection,
      unit = 'offset',
      reverse = false,
      voids = false
    } = options;

    if (!at) {
      return;
    }
    /**
     * Algorithm notes:
     *
     * Each step `distance` is dynamic depending on the underlying text
     * and the `unit` specified.  Each step, e.g., a line or word, may
     * span multiple text nodes, so we iterate through the text both on
     * two levels in step-sync:
     *
     * `leafText` stores the text on a text leaf level, and is advanced
     * through using the counters `leafTextOffset` and `leafTextRemaining`.
     *
     * `blockText` stores the text on a block level, and is shortened
     * by `distance` every time it is advanced.
     *
     * We only maintain a window of one blockText and one leafText because
     * a block node always appears before all of its leaf nodes.
     */


    var range = Editor.range(editor, at);
    var [start, end] = Range.edges(range);
    var first = reverse ? end : start;
    var isNewBlock = false;
    var blockText = '';
    var distance = 0; // Distance for leafText to catch up to blockText.

    var leafTextRemaining = 0;
    var leafTextOffset = 0; // Iterate through all nodes in range, grabbing entire textual content
    // of block nodes in blockText, and text nodes in leafText.
    // Exploits the fact that nodes are sequenced in such a way that we first
    // encounter the block node, then all of its text nodes, so when iterating
    // through the blockText and leafText we just need to remember a window of
    // one block node and leaf node, respectively.

    for (var [node, path] of Editor.nodes(editor, {
      at,
      reverse,
      voids
    })) {
      /*
       * ELEMENT NODE - Yield position(s) for voids, collect blockText for blocks
       */
      if (Element$9.isElement(node)) {
        // Void nodes are a special case, so by default we will always
        // yield their first point. If the `voids` option is set to true,
        // then we will iterate over their content.
        if (!voids && editor.isVoid(node)) {
          yield Editor.start(editor, path);
          continue;
        } // Inline element nodes are ignored as they don't themselves
        // contribute to `blockText` or `leafText` - their parent and
        // children do.


        if (editor.isInline(node)) continue; // Block element node - set `blockText` to its text content.

        if (Editor.hasInlines(editor, node)) {
          // We always exhaust block nodes before encountering a new one:
          //   console.assert(blockText === '',
          //     `blockText='${blockText}' - `+
          //     `not exhausted before new block node`, path)
          // Ensure range considered is capped to `range`, in the
          // start/end edge cases where block extends beyond range.
          // Equivalent to this, but presumably more performant:
          //   blockRange = Editor.range(editor, ...Editor.edges(editor, path))
          //   blockRange = Range.intersection(range, blockRange) // intersect
          //   blockText = Editor.string(editor, blockRange, { voids })
          var e = Path.isAncestor(path, end.path) ? end : Editor.end(editor, path);
          var s = Path.isAncestor(path, start.path) ? start : Editor.start(editor, path);
          blockText = Editor.string(editor, {
            anchor: s,
            focus: e
          }, {
            voids
          });
          isNewBlock = true;
        }
      }
      /*
       * TEXT LEAF NODE - Iterate through text content, yielding
       * positions every `distance` offset according to `unit`.
       */


      if (Text$1.isText(node)) {
        var isFirst = Path.equals(path, first.path); // Proof that we always exhaust text nodes before encountering a new one:
        //   console.assert(leafTextRemaining <= 0,
        //     `leafTextRemaining=${leafTextRemaining} - `+
        //     `not exhausted before new leaf text node`, path)
        // Reset `leafText` counters for new text node.

        if (isFirst) {
          leafTextRemaining = reverse ? first.offset : node.text.length - first.offset;
          leafTextOffset = first.offset; // Works for reverse too.
        } else {
          leafTextRemaining = node.text.length;
          leafTextOffset = reverse ? leafTextRemaining : 0;
        } // Yield position at the start of node (potentially).


        if (isFirst || isNewBlock || unit === 'offset') {
          yield {
            path,
            offset: leafTextOffset
          };
          isNewBlock = false;
        } // Yield positions every (dynamically calculated) `distance` offset.


        while (true) {
          // If `leafText` has caught up with `blockText` (distance=0),
          // and if blockText is exhausted, break to get another block node,
          // otherwise advance blockText forward by the new `distance`.
          if (distance === 0) {
            if (blockText === '') break;
            distance = calcDistance(blockText, unit, reverse); // Split the string at the previously found distance and use the
            // remaining string for the next iteration.

            blockText = splitByCharacterDistance(blockText, distance, reverse)[1];
          } // Advance `leafText` by the current `distance`.


          leafTextOffset = reverse ? leafTextOffset - distance : leafTextOffset + distance;
          leafTextRemaining = leafTextRemaining - distance; // If `leafText` is exhausted, break to get a new leaf node
          // and set distance to the overflow amount, so we'll (maybe)
          // catch up to blockText in the next leaf text node.

          if (leafTextRemaining < 0) {
            distance = -leafTextRemaining;
            break;
          } // Successfully walked `distance` offsets through `leafText`
          // to catch up with `blockText`, so we can reset `distance`
          // and yield this position in this node.


          distance = 0;
          yield {
            path,
            offset: leafTextOffset
          };
        }
      }
    } // Proof that upon completion, we've exahusted both leaf and block text:
    //   console.assert(leafTextRemaining <= 0, "leafText wasn't exhausted")
    //   console.assert(blockText === '', "blockText wasn't exhausted")
    // Helper:
    // Return the distance in offsets for a step of size `unit` on given string.


    function calcDistance(text, unit, reverse) {
      if (unit === 'character') {
        return getCharacterDistance(text, reverse);
      } else if (unit === 'word') {
        return getWordDistance(text, reverse);
      } else if (unit === 'line' || unit === 'block') {
        return text.length;
      }

      return 1;
    }
  },

  /**
   * Get the matching node in the branch of the document before a location.
   */
  previous(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      mode = 'lowest',
      voids = false
    } = options;
    var {
      match,
      at = editor.selection
    } = options;

    if (!at) {
      return;
    }

    var pointBeforeLocation = Editor.before(editor, at, {
      voids
    });

    if (!pointBeforeLocation) {
      return;
    }

    var [, to] = Editor.first(editor, []); // The search location is from the start of the document to the path of
    // the point before the location passed in

    var span = [pointBeforeLocation.path, to];

    if (Path.isPath(at) && at.length === 0) {
      throw new Error("Cannot get the previous node from the root node!");
    }

    if (match == null) {
      if (Path.isPath(at)) {
        var [parent] = Editor.parent(editor, at);

        match = n => parent.children.includes(n);
      } else {
        match = () => true;
      }
    }

    var [previous] = Editor.nodes(editor, {
      reverse: true,
      at: span,
      match,
      mode,
      voids
    });
    return previous;
  },

  /**
   * Get a range of a location.
   */
  range(editor, at, to) {
    if (Range.isRange(at) && !to) {
      return at;
    }

    var start = Editor.start(editor, at);
    var end = Editor.end(editor, to || at);
    return {
      anchor: start,
      focus: end
    };
  },

  /**
   * Create a mutable ref for a `Range` object, which will stay in sync as new
   * operations are applied to the editor.
   */
  rangeRef(editor, range) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      affinity = 'forward'
    } = options;
    var ref = {
      current: range,
      affinity,

      unref() {
        var {
          current
        } = ref;
        var rangeRefs = Editor.rangeRefs(editor);
        rangeRefs.delete(ref);
        ref.current = null;
        return current;
      }

    };
    var refs = Editor.rangeRefs(editor);
    refs.add(ref);
    return ref;
  },

  /**
   * Get the set of currently tracked range refs of the editor.
   */
  rangeRefs(editor) {
    var refs = RANGE_REFS.get(editor);

    if (!refs) {
      refs = new Set();
      RANGE_REFS.set(editor, refs);
    }

    return refs;
  },

  /**
   * Remove a custom property from all of the leaf text nodes in the current
   * selection.
   *
   * If the selection is currently collapsed, the removal will be stored on
   * `editor.marks` and applied to the text inserted next.
   */
  removeMark(editor, key) {
    editor.removeMark(key);
  },

  /**
   * Manually set if the editor should currently be normalizing.
   *
   * Note: Using this incorrectly can leave the editor in an invalid state.
   *
   */
  setNormalizing(editor, isNormalizing) {
    NORMALIZING.set(editor, isNormalizing);
  },

  /**
   * Get the start point of a location.
   */
  start(editor, at) {
    return Editor.point(editor, at, {
      edge: 'start'
    });
  },

  /**
   * Get the text string content of a location.
   *
   * Note: by default the text of void nodes is considered to be an empty
   * string, regardless of content, unless you pass in true for the voids option
   */
  string(editor, at) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      voids = false
    } = options;
    var range = Editor.range(editor, at);
    var [start, end] = Range.edges(range);
    var text = '';

    for (var [node, path] of Editor.nodes(editor, {
      at: range,
      match: Text$1.isText,
      voids
    })) {
      var t = node.text;

      if (Path.equals(path, end.path)) {
        t = t.slice(0, end.offset);
      }

      if (Path.equals(path, start.path)) {
        t = t.slice(start.offset);
      }

      text += t;
    }

    return text;
  },

  /**
   * Convert a range into a non-hanging one.
   */
  unhangRange(editor, range) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      voids = false
    } = options;
    var [start, end] = Range.edges(range); // PERF: exit early if we can guarantee that the range isn't hanging.

    if (start.offset !== 0 || end.offset !== 0 || Range.isCollapsed(range)) {
      return range;
    }

    var endBlock = Editor.above(editor, {
      at: end,
      match: n => Editor.isBlock(editor, n)
    });
    var blockPath = endBlock ? endBlock[1] : [];
    var first = Editor.start(editor, start);
    var before = {
      anchor: first,
      focus: end
    };
    var skip = true;

    for (var [node, path] of Editor.nodes(editor, {
      at: before,
      match: Text$1.isText,
      reverse: true,
      voids
    })) {
      if (skip) {
        skip = false;
        continue;
      }

      if (node.text !== '' || Path.isBefore(path, blockPath)) {
        end = {
          path,
          offset: node.text.length
        };
        break;
      }
    }

    return {
      anchor: start,
      focus: end
    };
  },

  /**
   * Match a void node in the current branch of the editor.
   */
  void(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return Editor.above(editor, _objectSpread$8(_objectSpread$8({}, options), {}, {
      match: n => Editor.isVoid(editor, n)
    }));
  },

  /**
   * Call a function, deferring normalization until after it completes.
   */
  withoutNormalizing(editor, fn) {
    var value = Editor.isNormalizing(editor);
    Editor.setNormalizing(editor, false);

    try {
      fn();
    } finally {
      Editor.setNormalizing(editor, value);
    }

    Editor.normalize(editor);
  }

};
var Span = {
  /**
   * Check if a value implements the `Span` interface.
   */
  isSpan(value) {
    return Array.isArray(value) && value.length === 2 && value.every(Path.isPath);
  }

};

var _excluded$3$1 = ["children"],
    _excluded2$2 = ["text"];
var IS_NODE_LIST_CACHE = new WeakMap();
var Node = {
  /**
   * Get the node at a specific path, asserting that it's an ancestor node.
   */
  ancestor(root, path) {
    var node = Node.get(root, path);

    if (Text$1.isText(node)) {
      throw new Error("Cannot get the ancestor node at path [".concat(path, "] because it refers to a text node instead: ").concat(node));
    }

    return node;
  },

  /**
   * Return a generator of all the ancestor nodes above a specific path.
   *
   * By default the order is bottom-up, from lowest to highest ancestor in
   * the tree, but you can pass the `reverse: true` option to go top-down.
   */
  *ancestors(root, path) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (var p of Path.ancestors(path, options)) {
      var n = Node.ancestor(root, p);
      var entry = [n, p];
      yield entry;
    }
  },

  /**
   * Get the child of a node at a specific index.
   */
  child(root, index) {
    if (Text$1.isText(root)) {
      throw new Error("Cannot get the child of a text node: ".concat(JSON.stringify(root)));
    }

    var c = root.children[index];

    if (c == null) {
      throw new Error("Cannot get child at index `".concat(index, "` in node: ").concat(JSON.stringify(root)));
    }

    return c;
  },

  /**
   * Iterate over the children of a node at a specific path.
   */
  *children(root, path) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      reverse = false
    } = options;
    var ancestor = Node.ancestor(root, path);
    var {
      children
    } = ancestor;
    var index = reverse ? children.length - 1 : 0;

    while (reverse ? index >= 0 : index < children.length) {
      var child = Node.child(ancestor, index);
      var childPath = path.concat(index);
      yield [child, childPath];
      index = reverse ? index - 1 : index + 1;
    }
  },

  /**
   * Get an entry for the common ancesetor node of two paths.
   */
  common(root, path, another) {
    var p = Path.common(path, another);
    var n = Node.get(root, p);
    return [n, p];
  },

  /**
   * Get the node at a specific path, asserting that it's a descendant node.
   */
  descendant(root, path) {
    var node = Node.get(root, path);

    if (Editor.isEditor(node)) {
      throw new Error("Cannot get the descendant node at path [".concat(path, "] because it refers to the root editor node instead: ").concat(node));
    }

    return node;
  },

  /**
   * Return a generator of all the descendant node entries inside a root node.
   */
  *descendants(root) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var [node, path] of Node.nodes(root, options)) {
      if (path.length !== 0) {
        // NOTE: we have to coerce here because checking the path's length does
        // guarantee that `node` is not a `Editor`, but TypeScript doesn't know.
        yield [node, path];
      }
    }
  },

  /**
   * Return a generator of all the element nodes inside a root node. Each iteration
   * will return an `ElementEntry` tuple consisting of `[Element, Path]`. If the
   * root node is an element it will be included in the iteration as well.
   */
  *elements(root) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var [node, path] of Node.nodes(root, options)) {
      if (Element$9.isElement(node)) {
        yield [node, path];
      }
    }
  },

  /**
   * Extract props from a Node.
   */
  extractProps(node) {
    if (Element$9.isAncestor(node)) {
      var properties = _objectWithoutProperties$1(node, _excluded$3$1);

      return properties;
    } else {
      var properties = _objectWithoutProperties$1(node, _excluded2$2);

      return properties;
    }
  },

  /**
   * Get the first node entry in a root node from a path.
   */
  first(root, path) {
    var p = path.slice();
    var n = Node.get(root, p);

    while (n) {
      if (Text$1.isText(n) || n.children.length === 0) {
        break;
      } else {
        n = n.children[0];
        p.push(0);
      }
    }

    return [n, p];
  },

  /**
   * Get the sliced fragment represented by a range inside a root node.
   */
  fragment(root, range) {
    if (Text$1.isText(root)) {
      throw new Error("Cannot get a fragment starting from a root text node: ".concat(JSON.stringify(root)));
    }

    var newRoot = fn({
      children: root.children
    }, r => {
      var [start, end] = Range.edges(range);
      var nodeEntries = Node.nodes(r, {
        reverse: true,
        pass: _ref => {
          var [, path] = _ref;
          return !Range.includes(range, path);
        }
      });

      for (var [, path] of nodeEntries) {
        if (!Range.includes(range, path)) {
          var parent = Node.parent(r, path);
          var index = path[path.length - 1];
          parent.children.splice(index, 1);
        }

        if (Path.equals(path, end.path)) {
          var leaf = Node.leaf(r, path);
          leaf.text = leaf.text.slice(0, end.offset);
        }

        if (Path.equals(path, start.path)) {
          var _leaf = Node.leaf(r, path);

          _leaf.text = _leaf.text.slice(start.offset);
        }
      }

      if (Editor.isEditor(r)) {
        r.selection = null;
      }
    });
    return newRoot.children;
  },

  /**
   * Get the descendant node referred to by a specific path. If the path is an
   * empty array, it refers to the root node itself.
   */
  get(root, path) {
    var node = root;

    for (var i = 0; i < path.length; i++) {
      var p = path[i];

      if (Text$1.isText(node) || !node.children[p]) {
        throw new Error("Cannot find a descendant at path [".concat(path, "] in node: ").concat(JSON.stringify(root)));
      }

      node = node.children[p];
    }

    return node;
  },

  /**
   * Check if a descendant node exists at a specific path.
   */
  has(root, path) {
    var node = root;

    for (var i = 0; i < path.length; i++) {
      var p = path[i];

      if (Text$1.isText(node) || !node.children[p]) {
        return false;
      }

      node = node.children[p];
    }

    return true;
  },

  /**
   * Check if a value implements the `Node` interface.
   */
  isNode(value) {
    return Text$1.isText(value) || Element$9.isElement(value) || Editor.isEditor(value);
  },

  /**
   * Check if a value is a list of `Node` objects.
   */
  isNodeList(value) {
    if (!Array.isArray(value)) {
      return false;
    }

    var cachedResult = IS_NODE_LIST_CACHE.get(value);

    if (cachedResult !== undefined) {
      return cachedResult;
    }

    var isNodeList = value.every(val => Node.isNode(val));
    IS_NODE_LIST_CACHE.set(value, isNodeList);
    return isNodeList;
  },

  /**
   * Get the last node entry in a root node from a path.
   */
  last(root, path) {
    var p = path.slice();
    var n = Node.get(root, p);

    while (n) {
      if (Text$1.isText(n) || n.children.length === 0) {
        break;
      } else {
        var i = n.children.length - 1;
        n = n.children[i];
        p.push(i);
      }
    }

    return [n, p];
  },

  /**
   * Get the node at a specific path, ensuring it's a leaf text node.
   */
  leaf(root, path) {
    var node = Node.get(root, path);

    if (!Text$1.isText(node)) {
      throw new Error("Cannot get the leaf node at path [".concat(path, "] because it refers to a non-leaf node: ").concat(node));
    }

    return node;
  },

  /**
   * Return a generator of the in a branch of the tree, from a specific path.
   *
   * By default the order is top-down, from lowest to highest node in the tree,
   * but you can pass the `reverse: true` option to go bottom-up.
   */
  *levels(root, path) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (var p of Path.levels(path, options)) {
      var n = Node.get(root, p);
      yield [n, p];
    }
  },

  /**
   * Check if a node matches a set of props.
   */
  matches(node, props) {
    return Element$9.isElement(node) && Element$9.isElementProps(props) && Element$9.matches(node, props) || Text$1.isText(node) && Text$1.isTextProps(props) && Text$1.matches(node, props);
  },

  /**
   * Return a generator of all the node entries of a root node. Each entry is
   * returned as a `[Node, Path]` tuple, with the path referring to the node's
   * position inside the root node.
   */
  *nodes(root) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      pass,
      reverse = false
    } = options;
    var {
      from = [],
      to
    } = options;
    var visited = new Set();
    var p = [];
    var n = root;

    while (true) {
      if (to && (reverse ? Path.isBefore(p, to) : Path.isAfter(p, to))) {
        break;
      }

      if (!visited.has(n)) {
        yield [n, p];
      } // If we're allowed to go downward and we haven't descended yet, do.


      if (!visited.has(n) && !Text$1.isText(n) && n.children.length !== 0 && (pass == null || pass([n, p]) === false)) {
        visited.add(n);
        var nextIndex = reverse ? n.children.length - 1 : 0;

        if (Path.isAncestor(p, from)) {
          nextIndex = from[p.length];
        }

        p = p.concat(nextIndex);
        n = Node.get(root, p);
        continue;
      } // If we're at the root and we can't go down, we're done.


      if (p.length === 0) {
        break;
      } // If we're going forward...


      if (!reverse) {
        var newPath = Path.next(p);

        if (Node.has(root, newPath)) {
          p = newPath;
          n = Node.get(root, p);
          continue;
        }
      } // If we're going backward...


      if (reverse && p[p.length - 1] !== 0) {
        var _newPath = Path.previous(p);

        p = _newPath;
        n = Node.get(root, p);
        continue;
      } // Otherwise we're going upward...


      p = Path.parent(p);
      n = Node.get(root, p);
      visited.add(n);
    }
  },

  /**
   * Get the parent of a node at a specific path.
   */
  parent(root, path) {
    var parentPath = Path.parent(path);
    var p = Node.get(root, parentPath);

    if (Text$1.isText(p)) {
      throw new Error("Cannot get the parent of path [".concat(path, "] because it does not exist in the root."));
    }

    return p;
  },

  /**
   * Get the concatenated text string of a node's content.
   *
   * Note that this will not include spaces or line breaks between block nodes.
   * It is not a user-facing string, but a string for performing offset-related
   * computations for a node.
   */
  string(node) {
    if (Text$1.isText(node)) {
      return node.text;
    } else {
      return node.children.map(Node.string).join('');
    }
  },

  /**
   * Return a generator of all leaf text nodes in a root node.
   */
  *texts(root) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var [node, path] of Node.nodes(root, options)) {
      if (Text$1.isText(node)) {
        yield [node, path];
      }
    }
  }

};

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Operation = {
  /**
   * Check of a value is a `NodeOperation` object.
   */
  isNodeOperation(value) {
    return Operation.isOperation(value) && value.type.endsWith('_node');
  },

  /**
   * Check of a value is an `Operation` object.
   */
  isOperation(value) {
    if (!isPlainObject(value)) {
      return false;
    }

    switch (value.type) {
      case 'insert_node':
        return Path.isPath(value.path) && Node.isNode(value.node);

      case 'insert_text':
        return typeof value.offset === 'number' && typeof value.text === 'string' && Path.isPath(value.path);

      case 'merge_node':
        return typeof value.position === 'number' && Path.isPath(value.path) && isPlainObject(value.properties);

      case 'move_node':
        return Path.isPath(value.path) && Path.isPath(value.newPath);

      case 'remove_node':
        return Path.isPath(value.path) && Node.isNode(value.node);

      case 'remove_text':
        return typeof value.offset === 'number' && typeof value.text === 'string' && Path.isPath(value.path);

      case 'set_node':
        return Path.isPath(value.path) && isPlainObject(value.properties) && isPlainObject(value.newProperties);

      case 'set_selection':
        return value.properties === null && Range.isRange(value.newProperties) || value.newProperties === null && Range.isRange(value.properties) || isPlainObject(value.properties) && isPlainObject(value.newProperties);

      case 'split_node':
        return Path.isPath(value.path) && typeof value.position === 'number' && isPlainObject(value.properties);

      default:
        return false;
    }
  },

  /**
   * Check if a value is a list of `Operation` objects.
   */
  isOperationList(value) {
    return Array.isArray(value) && value.every(val => Operation.isOperation(val));
  },

  /**
   * Check of a value is a `SelectionOperation` object.
   */
  isSelectionOperation(value) {
    return Operation.isOperation(value) && value.type.endsWith('_selection');
  },

  /**
   * Check of a value is a `TextOperation` object.
   */
  isTextOperation(value) {
    return Operation.isOperation(value) && value.type.endsWith('_text');
  },

  /**
   * Invert an operation, returning a new operation that will exactly undo the
   * original when applied.
   */
  inverse(op) {
    switch (op.type) {
      case 'insert_node':
        {
          return _objectSpread$7(_objectSpread$7({}, op), {}, {
            type: 'remove_node'
          });
        }

      case 'insert_text':
        {
          return _objectSpread$7(_objectSpread$7({}, op), {}, {
            type: 'remove_text'
          });
        }

      case 'merge_node':
        {
          return _objectSpread$7(_objectSpread$7({}, op), {}, {
            type: 'split_node',
            path: Path.previous(op.path)
          });
        }

      case 'move_node':
        {
          var {
            newPath,
            path
          } = op; // PERF: in this case the move operation is a no-op anyways.

          if (Path.equals(newPath, path)) {
            return op;
          } // If the move happens completely within a single parent the path and
          // newPath are stable with respect to each other.


          if (Path.isSibling(path, newPath)) {
            return _objectSpread$7(_objectSpread$7({}, op), {}, {
              path: newPath,
              newPath: path
            });
          } // If the move does not happen within a single parent it is possible
          // for the move to impact the true path to the location where the node
          // was removed from and where it was inserted. We have to adjust for this
          // and find the original path. We can accomplish this (only in non-sibling)
          // moves by looking at the impact of the move operation on the node
          // after the original move path.


          var inversePath = Path.transform(path, op);
          var inverseNewPath = Path.transform(Path.next(path), op);
          return _objectSpread$7(_objectSpread$7({}, op), {}, {
            path: inversePath,
            newPath: inverseNewPath
          });
        }

      case 'remove_node':
        {
          return _objectSpread$7(_objectSpread$7({}, op), {}, {
            type: 'insert_node'
          });
        }

      case 'remove_text':
        {
          return _objectSpread$7(_objectSpread$7({}, op), {}, {
            type: 'insert_text'
          });
        }

      case 'set_node':
        {
          var {
            properties,
            newProperties
          } = op;
          return _objectSpread$7(_objectSpread$7({}, op), {}, {
            properties: newProperties,
            newProperties: properties
          });
        }

      case 'set_selection':
        {
          var {
            properties: _properties,
            newProperties: _newProperties
          } = op;

          if (_properties == null) {
            return _objectSpread$7(_objectSpread$7({}, op), {}, {
              properties: _newProperties,
              newProperties: null
            });
          } else if (_newProperties == null) {
            return _objectSpread$7(_objectSpread$7({}, op), {}, {
              properties: null,
              newProperties: _properties
            });
          } else {
            return _objectSpread$7(_objectSpread$7({}, op), {}, {
              properties: _newProperties,
              newProperties: _properties
            });
          }
        }

      case 'split_node':
        {
          return _objectSpread$7(_objectSpread$7({}, op), {}, {
            type: 'merge_node',
            path: Path.next(op.path)
          });
        }
    }
  }

};

var Path = {
  /**
   * Get a list of ancestor paths for a given path.
   *
   * The paths are sorted from deepest to shallowest ancestor. However, if the
   * `reverse: true` option is passed, they are reversed.
   */
  ancestors(path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      reverse = false
    } = options;
    var paths = Path.levels(path, options);

    if (reverse) {
      paths = paths.slice(1);
    } else {
      paths = paths.slice(0, -1);
    }

    return paths;
  },

  /**
   * Get the common ancestor path of two paths.
   */
  common(path, another) {
    var common = [];

    for (var i = 0; i < path.length && i < another.length; i++) {
      var av = path[i];
      var bv = another[i];

      if (av !== bv) {
        break;
      }

      common.push(av);
    }

    return common;
  },

  /**
   * Compare a path to another, returning an integer indicating whether the path
   * was before, at, or after the other.
   *
   * Note: Two paths of unequal length can still receive a `0` result if one is
   * directly above or below the other. If you want exact matching, use
   * [[Path.equals]] instead.
   */
  compare(path, another) {
    var min = Math.min(path.length, another.length);

    for (var i = 0; i < min; i++) {
      if (path[i] < another[i]) return -1;
      if (path[i] > another[i]) return 1;
    }

    return 0;
  },

  /**
   * Check if a path ends after one of the indexes in another.
   */
  endsAfter(path, another) {
    var i = path.length - 1;
    var as = path.slice(0, i);
    var bs = another.slice(0, i);
    var av = path[i];
    var bv = another[i];
    return Path.equals(as, bs) && av > bv;
  },

  /**
   * Check if a path ends at one of the indexes in another.
   */
  endsAt(path, another) {
    var i = path.length;
    var as = path.slice(0, i);
    var bs = another.slice(0, i);
    return Path.equals(as, bs);
  },

  /**
   * Check if a path ends before one of the indexes in another.
   */
  endsBefore(path, another) {
    var i = path.length - 1;
    var as = path.slice(0, i);
    var bs = another.slice(0, i);
    var av = path[i];
    var bv = another[i];
    return Path.equals(as, bs) && av < bv;
  },

  /**
   * Check if a path is exactly equal to another.
   */
  equals(path, another) {
    return path.length === another.length && path.every((n, i) => n === another[i]);
  },

  /**
   * Check if the path of previous sibling node exists
   */
  hasPrevious(path) {
    return path[path.length - 1] > 0;
  },

  /**
   * Check if a path is after another.
   */
  isAfter(path, another) {
    return Path.compare(path, another) === 1;
  },

  /**
   * Check if a path is an ancestor of another.
   */
  isAncestor(path, another) {
    return path.length < another.length && Path.compare(path, another) === 0;
  },

  /**
   * Check if a path is before another.
   */
  isBefore(path, another) {
    return Path.compare(path, another) === -1;
  },

  /**
   * Check if a path is a child of another.
   */
  isChild(path, another) {
    return path.length === another.length + 1 && Path.compare(path, another) === 0;
  },

  /**
   * Check if a path is equal to or an ancestor of another.
   */
  isCommon(path, another) {
    return path.length <= another.length && Path.compare(path, another) === 0;
  },

  /**
   * Check if a path is a descendant of another.
   */
  isDescendant(path, another) {
    return path.length > another.length && Path.compare(path, another) === 0;
  },

  /**
   * Check if a path is the parent of another.
   */
  isParent(path, another) {
    return path.length + 1 === another.length && Path.compare(path, another) === 0;
  },

  /**
   * Check is a value implements the `Path` interface.
   */
  isPath(value) {
    return Array.isArray(value) && (value.length === 0 || typeof value[0] === 'number');
  },

  /**
   * Check if a path is a sibling of another.
   */
  isSibling(path, another) {
    if (path.length !== another.length) {
      return false;
    }

    var as = path.slice(0, -1);
    var bs = another.slice(0, -1);
    var al = path[path.length - 1];
    var bl = another[another.length - 1];
    return al !== bl && Path.equals(as, bs);
  },

  /**
   * Get a list of paths at every level down to a path. Note: this is the same
   * as `Path.ancestors`, but including the path itself.
   *
   * The paths are sorted from shallowest to deepest. However, if the `reverse:
   * true` option is passed, they are reversed.
   */
  levels(path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      reverse = false
    } = options;
    var list = [];

    for (var i = 0; i <= path.length; i++) {
      list.push(path.slice(0, i));
    }

    if (reverse) {
      list.reverse();
    }

    return list;
  },

  /**
   * Given a path, get the path to the next sibling node.
   */
  next(path) {
    if (path.length === 0) {
      throw new Error("Cannot get the next path of a root path [".concat(path, "], because it has no next index."));
    }

    var last = path[path.length - 1];
    return path.slice(0, -1).concat(last + 1);
  },

  /**
   * Returns whether this operation can affect paths or not. Used as an
   * optimization when updating dirty paths during normalization
   *
   * NOTE: This *must* be kept in sync with the implementation of 'transform'
   * below
   */
  operationCanTransformPath(operation) {
    switch (operation.type) {
      case 'insert_node':
      case 'remove_node':
      case 'merge_node':
      case 'split_node':
      case 'move_node':
        return true;

      default:
        return false;
    }
  },

  /**
   * Given a path, return a new path referring to the parent node above it.
   */
  parent(path) {
    if (path.length === 0) {
      throw new Error("Cannot get the parent path of the root path [".concat(path, "]."));
    }

    return path.slice(0, -1);
  },

  /**
   * Given a path, get the path to the previous sibling node.
   */
  previous(path) {
    if (path.length === 0) {
      throw new Error("Cannot get the previous path of a root path [".concat(path, "], because it has no previous index."));
    }

    var last = path[path.length - 1];

    if (last <= 0) {
      throw new Error("Cannot get the previous path of a first child path [".concat(path, "] because it would result in a negative index."));
    }

    return path.slice(0, -1).concat(last - 1);
  },

  /**
   * Get a path relative to an ancestor.
   */
  relative(path, ancestor) {
    if (!Path.isAncestor(ancestor, path) && !Path.equals(path, ancestor)) {
      throw new Error("Cannot get the relative path of [".concat(path, "] inside ancestor [").concat(ancestor, "], because it is not above or equal to the path."));
    }

    return path.slice(ancestor.length);
  },

  /**
   * Transform a path by an operation.
   */
  transform(path, operation) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return fn(path, p => {
      var {
        affinity = 'forward'
      } = options; // PERF: Exit early if the operation is guaranteed not to have an effect.

      if (!path || (path === null || path === void 0 ? void 0 : path.length) === 0) {
        return;
      }

      if (p === null) {
        return null;
      }

      switch (operation.type) {
        case 'insert_node':
          {
            var {
              path: op
            } = operation;

            if (Path.equals(op, p) || Path.endsBefore(op, p) || Path.isAncestor(op, p)) {
              p[op.length - 1] += 1;
            }

            break;
          }

        case 'remove_node':
          {
            var {
              path: _op
            } = operation;

            if (Path.equals(_op, p) || Path.isAncestor(_op, p)) {
              return null;
            } else if (Path.endsBefore(_op, p)) {
              p[_op.length - 1] -= 1;
            }

            break;
          }

        case 'merge_node':
          {
            var {
              path: _op2,
              position
            } = operation;

            if (Path.equals(_op2, p) || Path.endsBefore(_op2, p)) {
              p[_op2.length - 1] -= 1;
            } else if (Path.isAncestor(_op2, p)) {
              p[_op2.length - 1] -= 1;
              p[_op2.length] += position;
            }

            break;
          }

        case 'split_node':
          {
            var {
              path: _op3,
              position: _position
            } = operation;

            if (Path.equals(_op3, p)) {
              if (affinity === 'forward') {
                p[p.length - 1] += 1;
              } else if (affinity === 'backward') ; else {
                return null;
              }
            } else if (Path.endsBefore(_op3, p)) {
              p[_op3.length - 1] += 1;
            } else if (Path.isAncestor(_op3, p) && path[_op3.length] >= _position) {
              p[_op3.length - 1] += 1;
              p[_op3.length] -= _position;
            }

            break;
          }

        case 'move_node':
          {
            var {
              path: _op4,
              newPath: onp
            } = operation; // If the old and new path are the same, it's a no-op.

            if (Path.equals(_op4, onp)) {
              return;
            }

            if (Path.isAncestor(_op4, p) || Path.equals(_op4, p)) {
              var copy = onp.slice();

              if (Path.endsBefore(_op4, onp) && _op4.length < onp.length) {
                copy[_op4.length - 1] -= 1;
              }

              return copy.concat(p.slice(_op4.length));
            } else if (Path.isSibling(_op4, onp) && (Path.isAncestor(onp, p) || Path.equals(onp, p))) {
              if (Path.endsBefore(_op4, p)) {
                p[_op4.length - 1] -= 1;
              } else {
                p[_op4.length - 1] += 1;
              }
            } else if (Path.endsBefore(onp, p) || Path.equals(onp, p) || Path.isAncestor(onp, p)) {
              if (Path.endsBefore(_op4, p)) {
                p[_op4.length - 1] -= 1;
              }

              p[onp.length - 1] += 1;
            } else if (Path.endsBefore(_op4, p)) {
              if (Path.equals(onp, p)) {
                p[onp.length - 1] += 1;
              }

              p[_op4.length - 1] -= 1;
            }

            break;
          }
      }
    });
  }

};

var PathRef = {
  /**
   * Transform the path ref's current value by an operation.
   */
  transform(ref, op) {
    var {
      current,
      affinity
    } = ref;

    if (current == null) {
      return;
    }

    var path = Path.transform(current, op, {
      affinity
    });
    ref.current = path;

    if (path == null) {
      ref.unref();
    }
  }

};

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Point = {
  /**
   * Compare a point to another, returning an integer indicating whether the
   * point was before, at, or after the other.
   */
  compare(point, another) {
    var result = Path.compare(point.path, another.path);

    if (result === 0) {
      if (point.offset < another.offset) return -1;
      if (point.offset > another.offset) return 1;
      return 0;
    }

    return result;
  },

  /**
   * Check if a point is after another.
   */
  isAfter(point, another) {
    return Point.compare(point, another) === 1;
  },

  /**
   * Check if a point is before another.
   */
  isBefore(point, another) {
    return Point.compare(point, another) === -1;
  },

  /**
   * Check if a point is exactly equal to another.
   */
  equals(point, another) {
    // PERF: ensure the offsets are equal first since they are cheaper to check.
    return point.offset === another.offset && Path.equals(point.path, another.path);
  },

  /**
   * Check if a value implements the `Point` interface.
   */
  isPoint(value) {
    return isPlainObject(value) && typeof value.offset === 'number' && Path.isPath(value.path);
  },

  /**
   * Transform a point by an operation.
   */
  transform(point, op) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return fn(point, p => {
      if (p === null) {
        return null;
      }

      var {
        affinity = 'forward'
      } = options;
      var {
        path,
        offset
      } = p;

      switch (op.type) {
        case 'insert_node':
        case 'move_node':
          {
            p.path = Path.transform(path, op, options);
            break;
          }

        case 'insert_text':
          {
            if (Path.equals(op.path, path) && op.offset <= offset) {
              p.offset += op.text.length;
            }

            break;
          }

        case 'merge_node':
          {
            if (Path.equals(op.path, path)) {
              p.offset += op.position;
            }

            p.path = Path.transform(path, op, options);
            break;
          }

        case 'remove_text':
          {
            if (Path.equals(op.path, path) && op.offset <= offset) {
              p.offset -= Math.min(offset - op.offset, op.text.length);
            }

            break;
          }

        case 'remove_node':
          {
            if (Path.equals(op.path, path) || Path.isAncestor(op.path, path)) {
              return null;
            }

            p.path = Path.transform(path, op, options);
            break;
          }

        case 'split_node':
          {
            if (Path.equals(op.path, path)) {
              if (op.position === offset && affinity == null) {
                return null;
              } else if (op.position < offset || op.position === offset && affinity === 'forward') {
                p.offset -= op.position;
                p.path = Path.transform(path, op, _objectSpread$6(_objectSpread$6({}, options), {}, {
                  affinity: 'forward'
                }));
              }
            } else {
              p.path = Path.transform(path, op, options);
            }

            break;
          }
      }
    });
  }

};

var PointRef = {
  /**
   * Transform the point ref's current value by an operation.
   */
  transform(ref, op) {
    var {
      current,
      affinity
    } = ref;

    if (current == null) {
      return;
    }

    var point = Point.transform(current, op, {
      affinity
    });
    ref.current = point;

    if (point == null) {
      ref.unref();
    }
  }

};

var _excluded$2$1 = ["anchor", "focus"];

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Range = {
  /**
   * Get the start and end points of a range, in the order in which they appear
   * in the document.
   */
  edges(range) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      reverse = false
    } = options;
    var {
      anchor,
      focus
    } = range;
    return Range.isBackward(range) === reverse ? [anchor, focus] : [focus, anchor];
  },

  /**
   * Get the end point of a range.
   */
  end(range) {
    var [, end] = Range.edges(range);
    return end;
  },

  /**
   * Check if a range is exactly equal to another.
   */
  equals(range, another) {
    return Point.equals(range.anchor, another.anchor) && Point.equals(range.focus, another.focus);
  },

  /**
   * Check if a range includes a path, a point or part of another range.
   */
  includes(range, target) {
    if (Range.isRange(target)) {
      if (Range.includes(range, target.anchor) || Range.includes(range, target.focus)) {
        return true;
      }

      var [rs, re] = Range.edges(range);
      var [ts, te] = Range.edges(target);
      return Point.isBefore(rs, ts) && Point.isAfter(re, te);
    }

    var [start, end] = Range.edges(range);
    var isAfterStart = false;
    var isBeforeEnd = false;

    if (Point.isPoint(target)) {
      isAfterStart = Point.compare(target, start) >= 0;
      isBeforeEnd = Point.compare(target, end) <= 0;
    } else {
      isAfterStart = Path.compare(target, start.path) >= 0;
      isBeforeEnd = Path.compare(target, end.path) <= 0;
    }

    return isAfterStart && isBeforeEnd;
  },

  /**
   * Get the intersection of a range with another.
   */
  intersection(range, another) {
    var rest = _objectWithoutProperties$1(range, _excluded$2$1);

    var [s1, e1] = Range.edges(range);
    var [s2, e2] = Range.edges(another);
    var start = Point.isBefore(s1, s2) ? s2 : s1;
    var end = Point.isBefore(e1, e2) ? e1 : e2;

    if (Point.isBefore(end, start)) {
      return null;
    } else {
      return _objectSpread$5({
        anchor: start,
        focus: end
      }, rest);
    }
  },

  /**
   * Check if a range is backward, meaning that its anchor point appears in the
   * document _after_ its focus point.
   */
  isBackward(range) {
    var {
      anchor,
      focus
    } = range;
    return Point.isAfter(anchor, focus);
  },

  /**
   * Check if a range is collapsed, meaning that both its anchor and focus
   * points refer to the exact same position in the document.
   */
  isCollapsed(range) {
    var {
      anchor,
      focus
    } = range;
    return Point.equals(anchor, focus);
  },

  /**
   * Check if a range is expanded.
   *
   * This is the opposite of [[Range.isCollapsed]] and is provided for legibility.
   */
  isExpanded(range) {
    return !Range.isCollapsed(range);
  },

  /**
   * Check if a range is forward.
   *
   * This is the opposite of [[Range.isBackward]] and is provided for legibility.
   */
  isForward(range) {
    return !Range.isBackward(range);
  },

  /**
   * Check if a value implements the [[Range]] interface.
   */
  isRange(value) {
    return isPlainObject(value) && Point.isPoint(value.anchor) && Point.isPoint(value.focus);
  },

  /**
   * Iterate through all of the point entries in a range.
   */
  *points(range) {
    yield [range.anchor, 'anchor'];
    yield [range.focus, 'focus'];
  },

  /**
   * Get the start point of a range.
   */
  start(range) {
    var [start] = Range.edges(range);
    return start;
  },

  /**
   * Transform a range by an operation.
   */
  transform(range, op) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return fn(range, r => {
      if (r === null) {
        return null;
      }

      var {
        affinity = 'inward'
      } = options;
      var affinityAnchor;
      var affinityFocus;

      if (affinity === 'inward') {
        // If the range is collapsed, make sure to use the same affinity to
        // avoid the two points passing each other and expanding in the opposite
        // direction
        var isCollapsed = Range.isCollapsed(r);

        if (Range.isForward(r)) {
          affinityAnchor = 'forward';
          affinityFocus = isCollapsed ? affinityAnchor : 'backward';
        } else {
          affinityAnchor = 'backward';
          affinityFocus = isCollapsed ? affinityAnchor : 'forward';
        }
      } else if (affinity === 'outward') {
        if (Range.isForward(r)) {
          affinityAnchor = 'backward';
          affinityFocus = 'forward';
        } else {
          affinityAnchor = 'forward';
          affinityFocus = 'backward';
        }
      } else {
        affinityAnchor = affinity;
        affinityFocus = affinity;
      }

      var anchor = Point.transform(r.anchor, op, {
        affinity: affinityAnchor
      });
      var focus = Point.transform(r.focus, op, {
        affinity: affinityFocus
      });

      if (!anchor || !focus) {
        return null;
      }

      r.anchor = anchor;
      r.focus = focus;
    });
  }

};

var RangeRef = {
  /**
   * Transform the range ref's current value by an operation.
   */
  transform(ref, op) {
    var {
      current,
      affinity
    } = ref;

    if (current == null) {
      return;
    }

    var path = Range.transform(current, op, {
      affinity
    });
    ref.current = path;

    if (path == null) {
      ref.unref();
    }
  }

};

/*
  Custom deep equal comparison for Slate nodes.

  We don't need general purpose deep equality;
  Slate only supports plain values, Arrays, and nested objects.
  Complex values nested inside Arrays are not supported.

  Slate objects are designed to be serialised, so
  missing keys are deliberately normalised to undefined.
 */

var isDeepEqual = (node, another) => {
  for (var key in node) {
    var a = node[key];
    var b = another[key];

    if (isPlainObject(a) && isPlainObject(b)) {
      if (!isDeepEqual(a, b)) return false;
    } else if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;

      for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
    } else if (a !== b) {
      return false;
    }
  }
  /*
    Deep object equality is only necessary in one direction; in the reverse direction
    we are only looking for keys that are missing.
    As above, undefined keys are normalised to missing.
  */


  for (var _key in another) {
    if (node[_key] === undefined && another[_key] !== undefined) {
      return false;
    }
  }

  return true;
};

var _excluded$1$1 = ["text"],
    _excluded2$1 = ["anchor", "focus"];

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Text$1 = {
  /**
   * Check if two text nodes are equal.
   *
   * When loose is set, the text is not compared. This is
   * used to check whether sibling text nodes can be merged.
   */
  equals(text, another) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      loose = false
    } = options;

    function omitText(obj) {
      var rest = _objectWithoutProperties$1(obj, _excluded$1$1);

      return rest;
    }

    return isDeepEqual(loose ? omitText(text) : text, loose ? omitText(another) : another);
  },

  /**
   * Check if a value implements the `Text` interface.
   */
  isText(value) {
    return isPlainObject(value) && typeof value.text === 'string';
  },

  /**
   * Check if a value is a list of `Text` objects.
   */
  isTextList(value) {
    return Array.isArray(value) && value.every(val => Text$1.isText(val));
  },

  /**
   * Check if some props are a partial of Text.
   */
  isTextProps(props) {
    return props.text !== undefined;
  },

  /**
   * Check if an text matches set of properties.
   *
   * Note: this is for matching custom properties, and it does not ensure that
   * the `text` property are two nodes equal.
   */
  matches(text, props) {
    for (var key in props) {
      if (key === 'text') {
        continue;
      }

      if (!text.hasOwnProperty(key) || text[key] !== props[key]) {
        return false;
      }
    }

    return true;
  },

  /**
   * Get the leaves for a text node given decorations.
   */
  decorations(node, decorations) {
    var leaves = [_objectSpread$4({}, node)];

    for (var dec of decorations) {
      var rest = _objectWithoutProperties$1(dec, _excluded2$1);

      var [start, end] = Range.edges(dec);
      var next = [];
      var o = 0;

      for (var leaf of leaves) {
        var {
          length
        } = leaf.text;
        var offset = o;
        o += length; // If the range encompases the entire leaf, add the range.

        if (start.offset <= offset && end.offset >= o) {
          Object.assign(leaf, rest);
          next.push(leaf);
          continue;
        } // If the range expanded and match the leaf, or starts after, or ends before it, continue.


        if (start.offset !== end.offset && (start.offset === o || end.offset === offset) || start.offset > o || end.offset < offset || end.offset === offset && offset !== 0) {
          next.push(leaf);
          continue;
        } // Otherwise we need to split the leaf, at the start, end, or both,
        // and add the range to the middle intersecting section. Do the end
        // split first since we don't need to update the offset that way.


        var middle = leaf;
        var before = void 0;
        var after = void 0;

        if (end.offset < o) {
          var off = end.offset - offset;
          after = _objectSpread$4(_objectSpread$4({}, middle), {}, {
            text: middle.text.slice(off)
          });
          middle = _objectSpread$4(_objectSpread$4({}, middle), {}, {
            text: middle.text.slice(0, off)
          });
        }

        if (start.offset > offset) {
          var _off = start.offset - offset;

          before = _objectSpread$4(_objectSpread$4({}, middle), {}, {
            text: middle.text.slice(0, _off)
          });
          middle = _objectSpread$4(_objectSpread$4({}, middle), {}, {
            text: middle.text.slice(_off)
          });
        }

        Object.assign(middle, rest);

        if (before) {
          next.push(before);
        }

        next.push(middle);

        if (after) {
          next.push(after);
        }
      }

      leaves = next;
    }

    return leaves;
  }

};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var applyToDraft = (editor, selection, op) => {
  switch (op.type) {
    case 'insert_node':
      {
        var {
          path,
          node
        } = op;
        var parent = Node.parent(editor, path);
        var index = path[path.length - 1];

        if (index > parent.children.length) {
          throw new Error("Cannot apply an \"insert_node\" operation at path [".concat(path, "] because the destination is past the end of the node."));
        }

        parent.children.splice(index, 0, node);

        if (selection) {
          for (var [point, key] of Range.points(selection)) {
            selection[key] = Point.transform(point, op);
          }
        }

        break;
      }

    case 'insert_text':
      {
        var {
          path: _path,
          offset,
          text
        } = op;
        if (text.length === 0) break;

        var _node = Node.leaf(editor, _path);

        var before = _node.text.slice(0, offset);

        var after = _node.text.slice(offset);

        _node.text = before + text + after;

        if (selection) {
          for (var [_point, _key] of Range.points(selection)) {
            selection[_key] = Point.transform(_point, op);
          }
        }

        break;
      }

    case 'merge_node':
      {
        var {
          path: _path2
        } = op;

        var _node2 = Node.get(editor, _path2);

        var prevPath = Path.previous(_path2);
        var prev = Node.get(editor, prevPath);

        var _parent = Node.parent(editor, _path2);

        var _index = _path2[_path2.length - 1];

        if (Text$1.isText(_node2) && Text$1.isText(prev)) {
          prev.text += _node2.text;
        } else if (!Text$1.isText(_node2) && !Text$1.isText(prev)) {
          prev.children.push(..._node2.children);
        } else {
          throw new Error("Cannot apply a \"merge_node\" operation at path [".concat(_path2, "] to nodes of different interfaces: ").concat(_node2, " ").concat(prev));
        }

        _parent.children.splice(_index, 1);

        if (selection) {
          for (var [_point2, _key2] of Range.points(selection)) {
            selection[_key2] = Point.transform(_point2, op);
          }
        }

        break;
      }

    case 'move_node':
      {
        var {
          path: _path3,
          newPath
        } = op;

        if (Path.isAncestor(_path3, newPath)) {
          throw new Error("Cannot move a path [".concat(_path3, "] to new path [").concat(newPath, "] because the destination is inside itself."));
        }

        var _node3 = Node.get(editor, _path3);

        var _parent2 = Node.parent(editor, _path3);

        var _index2 = _path3[_path3.length - 1]; // This is tricky, but since the `path` and `newPath` both refer to
        // the same snapshot in time, there's a mismatch. After either
        // removing the original position, the second step's path can be out
        // of date. So instead of using the `op.newPath` directly, we
        // transform `op.path` to ascertain what the `newPath` would be after
        // the operation was applied.

        _parent2.children.splice(_index2, 1);

        var truePath = Path.transform(_path3, op);
        var newParent = Node.get(editor, Path.parent(truePath));
        var newIndex = truePath[truePath.length - 1];
        newParent.children.splice(newIndex, 0, _node3);

        if (selection) {
          for (var [_point3, _key3] of Range.points(selection)) {
            selection[_key3] = Point.transform(_point3, op);
          }
        }

        break;
      }

    case 'remove_node':
      {
        var {
          path: _path4
        } = op;
        var _index3 = _path4[_path4.length - 1];

        var _parent3 = Node.parent(editor, _path4);

        _parent3.children.splice(_index3, 1); // Transform all of the points in the value, but if the point was in the
        // node that was removed we need to update the range or remove it.


        if (selection) {
          for (var [_point4, _key4] of Range.points(selection)) {
            var result = Point.transform(_point4, op);

            if (selection != null && result != null) {
              selection[_key4] = result;
            } else {
              var _prev = void 0;

              var next = void 0;

              for (var [n, p] of Node.texts(editor)) {
                if (Path.compare(p, _path4) === -1) {
                  _prev = [n, p];
                } else {
                  next = [n, p];
                  break;
                }
              }

              var preferNext = false;

              if (_prev && next) {
                if (Path.equals(next[1], _path4)) {
                  preferNext = !Path.hasPrevious(next[1]);
                } else {
                  preferNext = Path.common(_prev[1], _path4).length < Path.common(next[1], _path4).length;
                }
              }

              if (_prev && !preferNext) {
                _point4.path = _prev[1];
                _point4.offset = _prev[0].text.length;
              } else if (next) {
                _point4.path = next[1];
                _point4.offset = 0;
              } else {
                selection = null;
              }
            }
          }
        }

        break;
      }

    case 'remove_text':
      {
        var {
          path: _path5,
          offset: _offset,
          text: _text
        } = op;
        if (_text.length === 0) break;

        var _node4 = Node.leaf(editor, _path5);

        var _before = _node4.text.slice(0, _offset);

        var _after = _node4.text.slice(_offset + _text.length);

        _node4.text = _before + _after;

        if (selection) {
          for (var [_point5, _key5] of Range.points(selection)) {
            selection[_key5] = Point.transform(_point5, op);
          }
        }

        break;
      }

    case 'set_node':
      {
        var {
          path: _path6,
          properties,
          newProperties
        } = op;

        if (_path6.length === 0) {
          throw new Error("Cannot set properties on the root node!");
        }

        var _node5 = Node.get(editor, _path6);

        for (var _key6 in newProperties) {
          if (_key6 === 'children' || _key6 === 'text') {
            throw new Error("Cannot set the \"".concat(_key6, "\" property of nodes!"));
          }

          var value = newProperties[_key6];

          if (value == null) {
            delete _node5[_key6];
          } else {
            _node5[_key6] = value;
          }
        } // properties that were previously defined, but are now missing, must be deleted


        for (var _key7 in properties) {
          if (!newProperties.hasOwnProperty(_key7)) {
            delete _node5[_key7];
          }
        }

        break;
      }

    case 'set_selection':
      {
        var {
          newProperties: _newProperties
        } = op;

        if (_newProperties == null) {
          selection = _newProperties;
        } else {
          if (selection == null) {
            if (!Range.isRange(_newProperties)) {
              throw new Error("Cannot apply an incomplete \"set_selection\" operation properties ".concat(JSON.stringify(_newProperties), " when there is no current selection."));
            }

            selection = _objectSpread$3({}, _newProperties);
          }

          for (var _key8 in _newProperties) {
            var _value = _newProperties[_key8];

            if (_value == null) {
              if (_key8 === 'anchor' || _key8 === 'focus') {
                throw new Error("Cannot remove the \"".concat(_key8, "\" selection property"));
              }

              delete selection[_key8];
            } else {
              selection[_key8] = _value;
            }
          }
        }

        break;
      }

    case 'split_node':
      {
        var {
          path: _path7,
          position,
          properties: _properties
        } = op;

        if (_path7.length === 0) {
          throw new Error("Cannot apply a \"split_node\" operation at path [".concat(_path7, "] because the root node cannot be split."));
        }

        var _node6 = Node.get(editor, _path7);

        var _parent4 = Node.parent(editor, _path7);

        var _index4 = _path7[_path7.length - 1];
        var newNode;

        if (Text$1.isText(_node6)) {
          var _before2 = _node6.text.slice(0, position);

          var _after2 = _node6.text.slice(position);

          _node6.text = _before2;
          newNode = _objectSpread$3(_objectSpread$3({}, _properties), {}, {
            text: _after2
          });
        } else {
          var _before3 = _node6.children.slice(0, position);

          var _after3 = _node6.children.slice(position);

          _node6.children = _before3;
          newNode = _objectSpread$3(_objectSpread$3({}, _properties), {}, {
            children: _after3
          });
        }

        _parent4.children.splice(_index4 + 1, 0, newNode);

        if (selection) {
          for (var [_point6, _key9] of Range.points(selection)) {
            selection[_key9] = Point.transform(_point6, op);
          }
        }

        break;
      }
  }

  return selection;
};

var GeneralTransforms = {
  /**
   * Transform the editor by an operation.
   */
  transform(editor, op) {
    editor.children = ln(editor.children);
    var selection = editor.selection && ln(editor.selection);

    try {
      selection = applyToDraft(editor, selection, op);
    } finally {
      editor.children = dn(editor.children);

      if (selection) {
        editor.selection = r$1(selection) ? dn(selection) : selection;
      } else {
        editor.selection = null;
      }
    }
  }

};

var _excluded$5 = ["text"],
    _excluded2$4 = ["children"];

function ownKeys$2$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var NodeTransforms = {
  /**
   * Insert nodes at a specific location in the Editor.
   */
  insertNodes(editor, nodes) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        hanging = false,
        voids = false,
        mode = 'lowest'
      } = options;
      var {
        at,
        match,
        select
      } = options;

      if (Node.isNode(nodes)) {
        nodes = [nodes];
      }

      if (nodes.length === 0) {
        return;
      }

      var [node] = nodes; // By default, use the selection as the target location. But if there is
      // no selection, insert at the end of the document since that is such a
      // common use case when inserting from a non-selected state.

      if (!at) {
        if (editor.selection) {
          at = editor.selection;
        } else if (editor.children.length > 0) {
          at = Editor.end(editor, []);
        } else {
          at = [0];
        }

        select = true;
      }

      if (select == null) {
        select = false;
      }

      if (Range.isRange(at)) {
        if (!hanging) {
          at = Editor.unhangRange(editor, at);
        }

        if (Range.isCollapsed(at)) {
          at = at.anchor;
        } else {
          var [, end] = Range.edges(at);
          var pointRef = Editor.pointRef(editor, end);
          Transforms.delete(editor, {
            at
          });
          at = pointRef.unref();
        }
      }

      if (Point.isPoint(at)) {
        if (match == null) {
          if (Text$1.isText(node)) {
            match = n => Text$1.isText(n);
          } else if (editor.isInline(node)) {
            match = n => Text$1.isText(n) || Editor.isInline(editor, n);
          } else {
            match = n => Editor.isBlock(editor, n);
          }
        }

        var [entry] = Editor.nodes(editor, {
          at: at.path,
          match,
          mode,
          voids
        });

        if (entry) {
          var [, _matchPath] = entry;
          var pathRef = Editor.pathRef(editor, _matchPath);
          var isAtEnd = Editor.isEnd(editor, at, _matchPath);
          Transforms.splitNodes(editor, {
            at,
            match,
            mode,
            voids
          });
          var path = pathRef.unref();
          at = isAtEnd ? Path.next(path) : path;
        } else {
          return;
        }
      }

      var parentPath = Path.parent(at);
      var index = at[at.length - 1];

      if (!voids && Editor.void(editor, {
        at: parentPath
      })) {
        return;
      }

      for (var _node of nodes) {
        var _path = parentPath.concat(index);

        index++;
        editor.apply({
          type: 'insert_node',
          path: _path,
          node: _node
        });
        at = Path.next(at);
      }

      at = Path.previous(at);

      if (select) {
        var point = Editor.end(editor, at);

        if (point) {
          Transforms.select(editor, point);
        }
      }
    });
  },

  /**
   * Lift nodes at a specific location upwards in the document tree, splitting
   * their parent in two if necessary.
   */
  liftNodes(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        at = editor.selection,
        mode = 'lowest',
        voids = false
      } = options;
      var {
        match
      } = options;

      if (match == null) {
        match = Path.isPath(at) ? matchPath(editor, at) : n => Editor.isBlock(editor, n);
      }

      if (!at) {
        return;
      }

      var matches = Editor.nodes(editor, {
        at,
        match,
        mode,
        voids
      });
      var pathRefs = Array.from(matches, _ref => {
        var [, p] = _ref;
        return Editor.pathRef(editor, p);
      });

      for (var pathRef of pathRefs) {
        var path = pathRef.unref();

        if (path.length < 2) {
          throw new Error("Cannot lift node at a path [".concat(path, "] because it has a depth of less than `2`."));
        }

        var parentNodeEntry = Editor.node(editor, Path.parent(path));
        var [parent, parentPath] = parentNodeEntry;
        var index = path[path.length - 1];
        var {
          length
        } = parent.children;

        if (length === 1) {
          var toPath = Path.next(parentPath);
          Transforms.moveNodes(editor, {
            at: path,
            to: toPath,
            voids
          });
          Transforms.removeNodes(editor, {
            at: parentPath,
            voids
          });
        } else if (index === 0) {
          Transforms.moveNodes(editor, {
            at: path,
            to: parentPath,
            voids
          });
        } else if (index === length - 1) {
          var _toPath = Path.next(parentPath);

          Transforms.moveNodes(editor, {
            at: path,
            to: _toPath,
            voids
          });
        } else {
          var splitPath = Path.next(path);

          var _toPath2 = Path.next(parentPath);

          Transforms.splitNodes(editor, {
            at: splitPath,
            voids
          });
          Transforms.moveNodes(editor, {
            at: path,
            to: _toPath2,
            voids
          });
        }
      }
    });
  },

  /**
   * Merge a node at a location with the previous node of the same depth,
   * removing any empty containing nodes after the merge if necessary.
   */
  mergeNodes(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        match,
        at = editor.selection
      } = options;
      var {
        hanging = false,
        voids = false,
        mode = 'lowest'
      } = options;

      if (!at) {
        return;
      }

      if (match == null) {
        if (Path.isPath(at)) {
          var [parent] = Editor.parent(editor, at);

          match = n => parent.children.includes(n);
        } else {
          match = n => Editor.isBlock(editor, n);
        }
      }

      if (!hanging && Range.isRange(at)) {
        at = Editor.unhangRange(editor, at);
      }

      if (Range.isRange(at)) {
        if (Range.isCollapsed(at)) {
          at = at.anchor;
        } else {
          var [, end] = Range.edges(at);
          var pointRef = Editor.pointRef(editor, end);
          Transforms.delete(editor, {
            at
          });
          at = pointRef.unref();

          if (options.at == null) {
            Transforms.select(editor, at);
          }
        }
      }

      var [current] = Editor.nodes(editor, {
        at,
        match,
        voids,
        mode
      });
      var prev = Editor.previous(editor, {
        at,
        match,
        voids,
        mode
      });

      if (!current || !prev) {
        return;
      }

      var [node, path] = current;
      var [prevNode, prevPath] = prev;

      if (path.length === 0 || prevPath.length === 0) {
        return;
      }

      var newPath = Path.next(prevPath);
      var commonPath = Path.common(path, prevPath);
      var isPreviousSibling = Path.isSibling(path, prevPath);
      var levels = Array.from(Editor.levels(editor, {
        at: path
      }), _ref2 => {
        var [n] = _ref2;
        return n;
      }).slice(commonPath.length).slice(0, -1); // Determine if the merge will leave an ancestor of the path empty as a
      // result, in which case we'll want to remove it after merging.

      var emptyAncestor = Editor.above(editor, {
        at: path,
        mode: 'highest',
        match: n => levels.includes(n) && hasSingleChildNest(editor, n)
      });
      var emptyRef = emptyAncestor && Editor.pathRef(editor, emptyAncestor[1]);
      var properties;
      var position; // Ensure that the nodes are equivalent, and figure out what the position
      // and extra properties of the merge will be.

      if (Text$1.isText(node) && Text$1.isText(prevNode)) {
        var rest = _objectWithoutProperties$1(node, _excluded$5);

        position = prevNode.text.length;
        properties = rest;
      } else if (Element$9.isElement(node) && Element$9.isElement(prevNode)) {
        var rest = _objectWithoutProperties$1(node, _excluded2$4);

        position = prevNode.children.length;
        properties = rest;
      } else {
        throw new Error("Cannot merge the node at path [".concat(path, "] with the previous sibling because it is not the same kind: ").concat(JSON.stringify(node), " ").concat(JSON.stringify(prevNode)));
      } // If the node isn't already the next sibling of the previous node, move
      // it so that it is before merging.


      if (!isPreviousSibling) {
        Transforms.moveNodes(editor, {
          at: path,
          to: newPath,
          voids
        });
      } // If there was going to be an empty ancestor of the node that was merged,
      // we remove it from the tree.


      if (emptyRef) {
        Transforms.removeNodes(editor, {
          at: emptyRef.current,
          voids
        });
      } // If the target node that we're merging with is empty, remove it instead
      // of merging the two. This is a common rich text editor behavior to
      // prevent losing formatting when deleting entire nodes when you have a
      // hanging selection.
      // if prevNode is first child in parent,don't remove it.


      if (Element$9.isElement(prevNode) && Editor.isEmpty(editor, prevNode) || Text$1.isText(prevNode) && prevNode.text === '' && prevPath[prevPath.length - 1] !== 0) {
        Transforms.removeNodes(editor, {
          at: prevPath,
          voids
        });
      } else {
        editor.apply({
          type: 'merge_node',
          path: newPath,
          position,
          properties
        });
      }

      if (emptyRef) {
        emptyRef.unref();
      }
    });
  },

  /**
   * Move the nodes at a location to a new location.
   */
  moveNodes(editor, options) {
    Editor.withoutNormalizing(editor, () => {
      var {
        to,
        at = editor.selection,
        mode = 'lowest',
        voids = false
      } = options;
      var {
        match
      } = options;

      if (!at) {
        return;
      }

      if (match == null) {
        match = Path.isPath(at) ? matchPath(editor, at) : n => Editor.isBlock(editor, n);
      }

      var toRef = Editor.pathRef(editor, to);
      var targets = Editor.nodes(editor, {
        at,
        match,
        mode,
        voids
      });
      var pathRefs = Array.from(targets, _ref3 => {
        var [, p] = _ref3;
        return Editor.pathRef(editor, p);
      });

      for (var pathRef of pathRefs) {
        var path = pathRef.unref();
        var newPath = toRef.current;

        if (path.length !== 0) {
          editor.apply({
            type: 'move_node',
            path,
            newPath
          });
        }

        if (toRef.current && Path.isSibling(newPath, path) && Path.isAfter(newPath, path)) {
          // When performing a sibling move to a later index, the path at the destination is shifted
          // to before the insertion point instead of after. To ensure our group of nodes are inserted
          // in the correct order we increment toRef to account for that
          toRef.current = Path.next(toRef.current);
        }
      }

      toRef.unref();
    });
  },

  /**
   * Remove the nodes at a specific location in the document.
   */
  removeNodes(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        hanging = false,
        voids = false,
        mode = 'lowest'
      } = options;
      var {
        at = editor.selection,
        match
      } = options;

      if (!at) {
        return;
      }

      if (match == null) {
        match = Path.isPath(at) ? matchPath(editor, at) : n => Editor.isBlock(editor, n);
      }

      if (!hanging && Range.isRange(at)) {
        at = Editor.unhangRange(editor, at);
      }

      var depths = Editor.nodes(editor, {
        at,
        match,
        mode,
        voids
      });
      var pathRefs = Array.from(depths, _ref4 => {
        var [, p] = _ref4;
        return Editor.pathRef(editor, p);
      });

      for (var pathRef of pathRefs) {
        var path = pathRef.unref();

        if (path) {
          var [node] = Editor.node(editor, path);
          editor.apply({
            type: 'remove_node',
            path,
            node
          });
        }
      }
    });
  },

  /**
   * Set new properties on the nodes at a location.
   */
  setNodes(editor, props) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        match,
        at = editor.selection
      } = options;
      var {
        hanging = false,
        mode = 'lowest',
        split = false,
        voids = false
      } = options;

      if (!at) {
        return;
      }

      if (match == null) {
        match = Path.isPath(at) ? matchPath(editor, at) : n => Editor.isBlock(editor, n);
      }

      if (!hanging && Range.isRange(at)) {
        at = Editor.unhangRange(editor, at);
      }

      if (split && Range.isRange(at)) {
        if (Range.isCollapsed(at) && Editor.leaf(editor, at.anchor)[0].text.length > 0) {
          // If the range is collapsed in a non-empty node and 'split' is true, there's nothing to
          // set that won't get normalized away
          return;
        }

        var rangeRef = Editor.rangeRef(editor, at, {
          affinity: 'inward'
        });
        var [start, end] = Range.edges(at);
        var splitMode = mode === 'lowest' ? 'lowest' : 'highest';
        var endAtEndOfNode = Editor.isEnd(editor, end, end.path);
        Transforms.splitNodes(editor, {
          at: end,
          match,
          mode: splitMode,
          voids,
          always: !endAtEndOfNode
        });
        var startAtStartOfNode = Editor.isStart(editor, start, start.path);
        Transforms.splitNodes(editor, {
          at: start,
          match,
          mode: splitMode,
          voids,
          always: !startAtStartOfNode
        });
        at = rangeRef.unref();

        if (options.at == null) {
          Transforms.select(editor, at);
        }
      }

      for (var [node, path] of Editor.nodes(editor, {
        at,
        match,
        mode,
        voids
      })) {
        var properties = {};
        var newProperties = {}; // You can't set properties on the editor node.

        if (path.length === 0) {
          continue;
        }

        var hasChanges = false;

        for (var k in props) {
          if (k === 'children' || k === 'text') {
            continue;
          }

          if (props[k] !== node[k]) {
            hasChanges = true; // Omit new properties from the old properties list

            if (node.hasOwnProperty(k)) properties[k] = node[k]; // Omit properties that have been removed from the new properties list

            if (props[k] != null) newProperties[k] = props[k];
          }
        }

        if (hasChanges) {
          editor.apply({
            type: 'set_node',
            path,
            properties,
            newProperties
          });
        }
      }
    });
  },

  /**
   * Split the nodes at a specific location.
   */
  splitNodes(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        mode = 'lowest',
        voids = false
      } = options;
      var {
        match,
        at = editor.selection,
        height = 0,
        always = false
      } = options;

      if (match == null) {
        match = n => Editor.isBlock(editor, n);
      }

      if (Range.isRange(at)) {
        at = deleteRange(editor, at);
      } // If the target is a path, the default height-skipping and position
      // counters need to account for us potentially splitting at a non-leaf.


      if (Path.isPath(at)) {
        var path = at;
        var point = Editor.point(editor, path);
        var [parent] = Editor.parent(editor, path);

        match = n => n === parent;

        height = point.path.length - path.length + 1;
        at = point;
        always = true;
      }

      if (!at) {
        return;
      }

      var beforeRef = Editor.pointRef(editor, at, {
        affinity: 'backward'
      });
      var [highest] = Editor.nodes(editor, {
        at,
        match,
        mode,
        voids
      });

      if (!highest) {
        return;
      }

      var voidMatch = Editor.void(editor, {
        at,
        mode: 'highest'
      });
      var nudge = 0;

      if (!voids && voidMatch) {
        var [voidNode, voidPath] = voidMatch;

        if (Element$9.isElement(voidNode) && editor.isInline(voidNode)) {
          var after = Editor.after(editor, voidPath);

          if (!after) {
            var text = {
              text: ''
            };
            var afterPath = Path.next(voidPath);
            Transforms.insertNodes(editor, text, {
              at: afterPath,
              voids
            });
            after = Editor.point(editor, afterPath);
          }

          at = after;
          always = true;
        }

        var siblingHeight = at.path.length - voidPath.length;
        height = siblingHeight + 1;
        always = true;
      }

      var afterRef = Editor.pointRef(editor, at);
      var depth = at.path.length - height;
      var [, highestPath] = highest;
      var lowestPath = at.path.slice(0, depth);
      var position = height === 0 ? at.offset : at.path[depth] + nudge;

      for (var [node, _path2] of Editor.levels(editor, {
        at: lowestPath,
        reverse: true,
        voids
      })) {
        var split = false;

        if (_path2.length < highestPath.length || _path2.length === 0 || !voids && Editor.isVoid(editor, node)) {
          break;
        }

        var _point = beforeRef.current;
        var isEnd = Editor.isEnd(editor, _point, _path2);

        if (always || !beforeRef || !Editor.isEdge(editor, _point, _path2)) {
          split = true;
          var properties = Node.extractProps(node);
          editor.apply({
            type: 'split_node',
            path: _path2,
            position,
            properties
          });
        }

        position = _path2[_path2.length - 1] + (split || isEnd ? 1 : 0);
      }

      if (options.at == null) {
        var _point2 = afterRef.current || Editor.end(editor, []);

        Transforms.select(editor, _point2);
      }

      beforeRef.unref();
      afterRef.unref();
    });
  },

  /**
   * Unset properties on the nodes at a location.
   */
  unsetNodes(editor, props) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!Array.isArray(props)) {
      props = [props];
    }

    var obj = {};

    for (var key of props) {
      obj[key] = null;
    }

    Transforms.setNodes(editor, obj, options);
  },

  /**
   * Unwrap the nodes at a location from a parent node, splitting the parent if
   * necessary to ensure that only the content in the range is unwrapped.
   */
  unwrapNodes(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        mode = 'lowest',
        split = false,
        voids = false
      } = options;
      var {
        at = editor.selection,
        match
      } = options;

      if (!at) {
        return;
      }

      if (match == null) {
        match = Path.isPath(at) ? matchPath(editor, at) : n => Editor.isBlock(editor, n);
      }

      if (Path.isPath(at)) {
        at = Editor.range(editor, at);
      }

      var rangeRef = Range.isRange(at) ? Editor.rangeRef(editor, at) : null;
      var matches = Editor.nodes(editor, {
        at,
        match,
        mode,
        voids
      });
      var pathRefs = Array.from(matches, _ref5 => {
        var [, p] = _ref5;
        return Editor.pathRef(editor, p);
      } // unwrapNode will call liftNode which does not support splitting the node when nested.
      // If we do not reverse the order and call it from top to the bottom, it will remove all blocks
      // that wrap target node. So we reverse the order.
      ).reverse();

      var _loop = function _loop(pathRef) {
        var path = pathRef.unref();
        var [node] = Editor.node(editor, path);
        var range = Editor.range(editor, path);

        if (split && rangeRef) {
          range = Range.intersection(rangeRef.current, range);
        }

        Transforms.liftNodes(editor, {
          at: range,
          match: n => Element$9.isAncestor(node) && node.children.includes(n),
          voids
        });
      };

      for (var pathRef of pathRefs) {
        _loop(pathRef);
      }

      if (rangeRef) {
        rangeRef.unref();
      }
    });
  },

  /**
   * Wrap the nodes at a location in a new container node, splitting the edges
   * of the range first to ensure that only the content in the range is wrapped.
   */
  wrapNodes(editor, element) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        mode = 'lowest',
        split = false,
        voids = false
      } = options;
      var {
        match,
        at = editor.selection
      } = options;

      if (!at) {
        return;
      }

      if (match == null) {
        if (Path.isPath(at)) {
          match = matchPath(editor, at);
        } else if (editor.isInline(element)) {
          match = n => Editor.isInline(editor, n) || Text$1.isText(n);
        } else {
          match = n => Editor.isBlock(editor, n);
        }
      }

      if (split && Range.isRange(at)) {
        var [start, end] = Range.edges(at);
        var rangeRef = Editor.rangeRef(editor, at, {
          affinity: 'inward'
        });
        Transforms.splitNodes(editor, {
          at: end,
          match,
          voids
        });
        Transforms.splitNodes(editor, {
          at: start,
          match,
          voids
        });
        at = rangeRef.unref();

        if (options.at == null) {
          Transforms.select(editor, at);
        }
      }

      var roots = Array.from(Editor.nodes(editor, {
        at,
        match: editor.isInline(element) ? n => Editor.isBlock(editor, n) : n => Editor.isEditor(n),
        mode: 'lowest',
        voids
      }));

      for (var [, rootPath] of roots) {
        var a = Range.isRange(at) ? Range.intersection(at, Editor.range(editor, rootPath)) : at;

        if (!a) {
          continue;
        }

        var matches = Array.from(Editor.nodes(editor, {
          at: a,
          match,
          mode,
          voids
        }));

        if (matches.length > 0) {
          var _ret = function () {
            var [first] = matches;
            var last = matches[matches.length - 1];
            var [, firstPath] = first;
            var [, lastPath] = last;

            if (firstPath.length === 0 && lastPath.length === 0) {
              // if there's no matching parent - usually means the node is an editor - don't do anything
              return "continue";
            }

            var commonPath = Path.equals(firstPath, lastPath) ? Path.parent(firstPath) : Path.common(firstPath, lastPath);
            var range = Editor.range(editor, firstPath, lastPath);
            var commonNodeEntry = Editor.node(editor, commonPath);
            var [commonNode] = commonNodeEntry;
            var depth = commonPath.length + 1;
            var wrapperPath = Path.next(lastPath.slice(0, depth));

            var wrapper = _objectSpread$2$1(_objectSpread$2$1({}, element), {}, {
              children: []
            });

            Transforms.insertNodes(editor, wrapper, {
              at: wrapperPath,
              voids
            });
            Transforms.moveNodes(editor, {
              at: range,
              match: n => Element$9.isAncestor(commonNode) && commonNode.children.includes(n),
              to: wrapperPath.concat(0),
              voids
            });
          }();

          if (_ret === "continue") continue;
        }
      }
    });
  }

};

var hasSingleChildNest = (editor, node) => {
  if (Element$9.isElement(node)) {
    var element = node;

    if (Editor.isVoid(editor, node)) {
      return true;
    } else if (element.children.length === 1) {
      return hasSingleChildNest(editor, element.children[0]);
    } else {
      return false;
    }
  } else if (Editor.isEditor(node)) {
    return false;
  } else {
    return true;
  }
};
/**
 * Convert a range into a point by deleting it's content.
 */


var deleteRange = (editor, range) => {
  if (Range.isCollapsed(range)) {
    return range.anchor;
  } else {
    var [, end] = Range.edges(range);
    var pointRef = Editor.pointRef(editor, end);
    Transforms.delete(editor, {
      at: range
    });
    return pointRef.unref();
  }
};

var matchPath = (editor, path) => {
  var [node] = Editor.node(editor, path);
  return n => n === node;
};

function ownKeys$1$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var SelectionTransforms = {
  /**
   * Collapse the selection.
   */
  collapse(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      edge = 'anchor'
    } = options;
    var {
      selection
    } = editor;

    if (!selection) {
      return;
    } else if (edge === 'anchor') {
      Transforms.select(editor, selection.anchor);
    } else if (edge === 'focus') {
      Transforms.select(editor, selection.focus);
    } else if (edge === 'start') {
      var [start] = Range.edges(selection);
      Transforms.select(editor, start);
    } else if (edge === 'end') {
      var [, end] = Range.edges(selection);
      Transforms.select(editor, end);
    }
  },

  /**
   * Unset the selection.
   */
  deselect(editor) {
    var {
      selection
    } = editor;

    if (selection) {
      editor.apply({
        type: 'set_selection',
        properties: selection,
        newProperties: null
      });
    }
  },

  /**
   * Move the selection's point forward or backward.
   */
  move(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      selection
    } = editor;
    var {
      distance = 1,
      unit = 'character',
      reverse = false
    } = options;
    var {
      edge = null
    } = options;

    if (!selection) {
      return;
    }

    if (edge === 'start') {
      edge = Range.isBackward(selection) ? 'focus' : 'anchor';
    }

    if (edge === 'end') {
      edge = Range.isBackward(selection) ? 'anchor' : 'focus';
    }

    var {
      anchor,
      focus
    } = selection;
    var opts = {
      distance,
      unit
    };
    var props = {};

    if (edge == null || edge === 'anchor') {
      var point = reverse ? Editor.before(editor, anchor, opts) : Editor.after(editor, anchor, opts);

      if (point) {
        props.anchor = point;
      }
    }

    if (edge == null || edge === 'focus') {
      var _point = reverse ? Editor.before(editor, focus, opts) : Editor.after(editor, focus, opts);

      if (_point) {
        props.focus = _point;
      }
    }

    Transforms.setSelection(editor, props);
  },

  /**
   * Set the selection to a new value.
   */
  select(editor, target) {
    var {
      selection
    } = editor;
    target = Editor.range(editor, target);

    if (selection) {
      Transforms.setSelection(editor, target);
      return;
    }

    if (!Range.isRange(target)) {
      throw new Error("When setting the selection and the current selection is `null` you must provide at least an `anchor` and `focus`, but you passed: ".concat(JSON.stringify(target)));
    }

    editor.apply({
      type: 'set_selection',
      properties: selection,
      newProperties: target
    });
  },

  /**
   * Set new properties on one of the selection's points.
   */
  setPoint(editor, props) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      selection
    } = editor;
    var {
      edge = 'both'
    } = options;

    if (!selection) {
      return;
    }

    if (edge === 'start') {
      edge = Range.isBackward(selection) ? 'focus' : 'anchor';
    }

    if (edge === 'end') {
      edge = Range.isBackward(selection) ? 'anchor' : 'focus';
    }

    var {
      anchor,
      focus
    } = selection;
    var point = edge === 'anchor' ? anchor : focus;
    Transforms.setSelection(editor, {
      [edge === 'anchor' ? 'anchor' : 'focus']: _objectSpread$1$1(_objectSpread$1$1({}, point), props)
    });
  },

  /**
   * Set new properties on the selection.
   */
  setSelection(editor, props) {
    var {
      selection
    } = editor;
    var oldProps = {};
    var newProps = {};

    if (!selection) {
      return;
    }

    for (var k in props) {
      if (k === 'anchor' && props.anchor != null && !Point.equals(props.anchor, selection.anchor) || k === 'focus' && props.focus != null && !Point.equals(props.focus, selection.focus) || k !== 'anchor' && k !== 'focus' && props[k] !== selection[k]) {
        oldProps[k] = selection[k];
        newProps[k] = props[k];
      }
    }

    if (Object.keys(oldProps).length > 0) {
      editor.apply({
        type: 'set_selection',
        properties: oldProps,
        newProperties: newProps
      });
    }
  }

};

var TextTransforms = {
  /**
   * Delete content in the editor.
   */
  delete(editor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        reverse = false,
        unit = 'character',
        distance = 1,
        voids = false
      } = options;
      var {
        at = editor.selection,
        hanging = false
      } = options;

      if (!at) {
        return;
      }

      if (Range.isRange(at) && Range.isCollapsed(at)) {
        at = at.anchor;
      }

      if (Point.isPoint(at)) {
        var furthestVoid = Editor.void(editor, {
          at,
          mode: 'highest'
        });

        if (!voids && furthestVoid) {
          var [, voidPath] = furthestVoid;
          at = voidPath;
        } else {
          var opts = {
            unit,
            distance
          };
          var target = reverse ? Editor.before(editor, at, opts) || Editor.start(editor, []) : Editor.after(editor, at, opts) || Editor.end(editor, []);
          at = {
            anchor: at,
            focus: target
          };
          hanging = true;
        }
      }

      if (Path.isPath(at)) {
        Transforms.removeNodes(editor, {
          at,
          voids
        });
        return;
      }

      if (Range.isCollapsed(at)) {
        return;
      }

      if (!hanging) {
        var [, _end] = Range.edges(at);
        var endOfDoc = Editor.end(editor, []);

        if (!Point.equals(_end, endOfDoc)) {
          at = Editor.unhangRange(editor, at, {
            voids
          });
        }
      }

      var [start, end] = Range.edges(at);
      var startBlock = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
        at: start,
        voids
      });
      var endBlock = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
        at: end,
        voids
      });
      var isAcrossBlocks = startBlock && endBlock && !Path.equals(startBlock[1], endBlock[1]);
      var isSingleText = Path.equals(start.path, end.path);
      var startVoid = voids ? null : Editor.void(editor, {
        at: start,
        mode: 'highest'
      });
      var endVoid = voids ? null : Editor.void(editor, {
        at: end,
        mode: 'highest'
      }); // If the start or end points are inside an inline void, nudge them out.

      if (startVoid) {
        var before = Editor.before(editor, start);

        if (before && startBlock && Path.isAncestor(startBlock[1], before.path)) {
          start = before;
        }
      }

      if (endVoid) {
        var after = Editor.after(editor, end);

        if (after && endBlock && Path.isAncestor(endBlock[1], after.path)) {
          end = after;
        }
      } // Get the highest nodes that are completely inside the range, as well as
      // the start and end nodes.


      var matches = [];
      var lastPath;

      for (var entry of Editor.nodes(editor, {
        at,
        voids
      })) {
        var [node, path] = entry;

        if (lastPath && Path.compare(path, lastPath) === 0) {
          continue;
        }

        if (!voids && Editor.isVoid(editor, node) || !Path.isCommon(path, start.path) && !Path.isCommon(path, end.path)) {
          matches.push(entry);
          lastPath = path;
        }
      }

      var pathRefs = Array.from(matches, _ref => {
        var [, p] = _ref;
        return Editor.pathRef(editor, p);
      });
      var startRef = Editor.pointRef(editor, start);
      var endRef = Editor.pointRef(editor, end);

      if (!isSingleText && !startVoid) {
        var _point = startRef.current;
        var [_node] = Editor.leaf(editor, _point);
        var {
          path: _path
        } = _point;
        var {
          offset
        } = start;

        var text = _node.text.slice(offset);

        if (text.length > 0) editor.apply({
          type: 'remove_text',
          path: _path,
          offset,
          text
        });
      }

      for (var pathRef of pathRefs) {
        var _path2 = pathRef.unref();

        Transforms.removeNodes(editor, {
          at: _path2,
          voids
        });
      }

      if (!endVoid) {
        var _point2 = endRef.current;
        var [_node2] = Editor.leaf(editor, _point2);
        var {
          path: _path3
        } = _point2;

        var _offset = isSingleText ? start.offset : 0;

        var _text = _node2.text.slice(_offset, end.offset);

        if (_text.length > 0) editor.apply({
          type: 'remove_text',
          path: _path3,
          offset: _offset,
          text: _text
        });
      }

      if (!isSingleText && isAcrossBlocks && endRef.current && startRef.current) {
        Transforms.mergeNodes(editor, {
          at: endRef.current,
          hanging: true,
          voids
        });
      }

      var point = reverse ? startRef.unref() || endRef.unref() : endRef.unref() || startRef.unref();

      if (options.at == null && point) {
        Transforms.select(editor, point);
      }
    });
  },

  /**
   * Insert a fragment at a specific location in the editor.
   */
  insertFragment(editor, fragment) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        hanging = false,
        voids = false
      } = options;
      var {
        at = editor.selection
      } = options;

      if (!fragment.length) {
        return;
      }

      if (!at) {
        return;
      } else if (Range.isRange(at)) {
        if (!hanging) {
          at = Editor.unhangRange(editor, at);
        }

        if (Range.isCollapsed(at)) {
          at = at.anchor;
        } else {
          var [, end] = Range.edges(at);

          if (!voids && Editor.void(editor, {
            at: end
          })) {
            return;
          }

          var pointRef = Editor.pointRef(editor, end);
          Transforms.delete(editor, {
            at
          });
          at = pointRef.unref();
        }
      } else if (Path.isPath(at)) {
        at = Editor.start(editor, at);
      }

      if (!voids && Editor.void(editor, {
        at
      })) {
        return;
      } // If the insert point is at the edge of an inline node, move it outside
      // instead since it will need to be split otherwise.


      var inlineElementMatch = Editor.above(editor, {
        at,
        match: n => Editor.isInline(editor, n),
        mode: 'highest',
        voids
      });

      if (inlineElementMatch) {
        var [, _inlinePath] = inlineElementMatch;

        if (Editor.isEnd(editor, at, _inlinePath)) {
          var after = Editor.after(editor, _inlinePath);
          at = after;
        } else if (Editor.isStart(editor, at, _inlinePath)) {
          var before = Editor.before(editor, _inlinePath);
          at = before;
        }
      }

      var blockMatch = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
        at,
        voids
      });
      var [, blockPath] = blockMatch;
      var isBlockStart = Editor.isStart(editor, at, blockPath);
      var isBlockEnd = Editor.isEnd(editor, at, blockPath);
      var isBlockEmpty = isBlockStart && isBlockEnd;
      var mergeStart = !isBlockStart || isBlockStart && isBlockEnd;
      var mergeEnd = !isBlockEnd;
      var [, firstPath] = Node.first({
        children: fragment
      }, []);
      var [, lastPath] = Node.last({
        children: fragment
      }, []);
      var matches = [];

      var matcher = _ref2 => {
        var [n, p] = _ref2;
        var isRoot = p.length === 0;

        if (isRoot) {
          return false;
        }

        if (isBlockEmpty) {
          return true;
        }

        if (mergeStart && Path.isAncestor(p, firstPath) && Element$9.isElement(n) && !editor.isVoid(n) && !editor.isInline(n)) {
          return false;
        }

        if (mergeEnd && Path.isAncestor(p, lastPath) && Element$9.isElement(n) && !editor.isVoid(n) && !editor.isInline(n)) {
          return false;
        }

        return true;
      };

      for (var entry of Node.nodes({
        children: fragment
      }, {
        pass: matcher
      })) {
        if (matcher(entry)) {
          matches.push(entry);
        }
      }

      var starts = [];
      var middles = [];
      var ends = [];
      var starting = true;
      var hasBlocks = false;

      for (var [node] of matches) {
        if (Element$9.isElement(node) && !editor.isInline(node)) {
          starting = false;
          hasBlocks = true;
          middles.push(node);
        } else if (starting) {
          starts.push(node);
        } else {
          ends.push(node);
        }
      }

      var [inlineMatch] = Editor.nodes(editor, {
        at,
        match: n => Text$1.isText(n) || Editor.isInline(editor, n),
        mode: 'highest',
        voids
      });
      var [, inlinePath] = inlineMatch;
      var isInlineStart = Editor.isStart(editor, at, inlinePath);
      var isInlineEnd = Editor.isEnd(editor, at, inlinePath);
      var middleRef = Editor.pathRef(editor, isBlockEnd ? Path.next(blockPath) : blockPath);
      var endRef = Editor.pathRef(editor, isInlineEnd ? Path.next(inlinePath) : inlinePath);
      var blockPathRef = Editor.pathRef(editor, blockPath);
      Transforms.splitNodes(editor, {
        at,
        match: n => hasBlocks ? Editor.isBlock(editor, n) : Text$1.isText(n) || Editor.isInline(editor, n),
        mode: hasBlocks ? 'lowest' : 'highest',
        voids
      });
      var startRef = Editor.pathRef(editor, !isInlineStart || isInlineStart && isInlineEnd ? Path.next(inlinePath) : inlinePath);
      Transforms.insertNodes(editor, starts, {
        at: startRef.current,
        match: n => Text$1.isText(n) || Editor.isInline(editor, n),
        mode: 'highest',
        voids
      });

      if (isBlockEmpty && middles.length) {
        Transforms.delete(editor, {
          at: blockPathRef.unref(),
          voids
        });
      }

      Transforms.insertNodes(editor, middles, {
        at: middleRef.current,
        match: n => Editor.isBlock(editor, n),
        mode: 'lowest',
        voids
      });
      Transforms.insertNodes(editor, ends, {
        at: endRef.current,
        match: n => Text$1.isText(n) || Editor.isInline(editor, n),
        mode: 'highest',
        voids
      });

      if (!options.at) {
        var path;

        if (ends.length > 0) {
          path = Path.previous(endRef.current);
        } else if (middles.length > 0) {
          path = Path.previous(middleRef.current);
        } else {
          path = Path.previous(startRef.current);
        }

        var _end2 = Editor.end(editor, path);

        Transforms.select(editor, _end2);
      }

      startRef.unref();
      middleRef.unref();
      endRef.unref();
    });
  },

  /**
   * Insert a string of text in the Editor.
   */
  insertText(editor, text) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    Editor.withoutNormalizing(editor, () => {
      var {
        voids = false
      } = options;
      var {
        at = editor.selection
      } = options;

      if (!at) {
        return;
      }

      if (Path.isPath(at)) {
        at = Editor.range(editor, at);
      }

      if (Range.isRange(at)) {
        if (Range.isCollapsed(at)) {
          at = at.anchor;
        } else {
          var end = Range.end(at);

          if (!voids && Editor.void(editor, {
            at: end
          })) {
            return;
          }

          var start = Range.start(at);
          var pointRef = Editor.pointRef(editor, start);
          Transforms.delete(editor, {
            at,
            voids
          });
          at = pointRef.unref();
          Transforms.setSelection(editor, {
            anchor: at,
            focus: at
          });
        }
      }

      if (!voids && Editor.void(editor, {
        at
      })) {
        return;
      }

      var {
        path,
        offset
      } = at;
      if (text.length > 0) editor.apply({
        type: 'insert_text',
        path,
        offset,
        text
      });
    });
  }

};

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$a(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Transforms = _objectSpread$a(_objectSpread$a(_objectSpread$a(_objectSpread$a({}, GeneralTransforms), NodeTransforms), SelectionTransforms), TextTransforms);

var direction_1 = direction;

var RTL = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
var LTR =
  'A-Za-z\u00C0-\u00D6\u00D8-\u00F6' +
  '\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C' +
  '\uFE00-\uFE6F\uFEFD-\uFFFF';

var rtl = new RegExp('^[^' + LTR + ']*[' + RTL + ']');
var ltr = new RegExp('^[^' + RTL + ']*[' + LTR + ']');

function direction(value) {
  value = String(value || '');

  if (rtl.test(value)) {
    return 'rtl'
  }

  if (ltr.test(value)) {
    return 'ltr'
  }

  return 'neutral'
}

function t(t){return "object"==typeof t&&null!=t&&1===t.nodeType}function e(t,e){return (!e||"hidden"!==t)&&"visible"!==t&&"clip"!==t}function n$1(t,n){if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){var r=getComputedStyle(t,null);return e(r.overflowY,n)||e(r.overflowX,n)||function(t){var e=function(t){if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}}(t);return !!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)}(t)}return !1}function r(t,e,n,r,i,o,l,d){return o<t&&l>e||o>t&&l<e?0:o<=t&&d<=n||l>=e&&d>=n?o-t-r:l>e&&d<n||o<t&&d>n?l-e+i:0}function compute(e,i){var o=window,l=i.scrollMode,d=i.block,u=i.inline,h=i.boundary,a=i.skipOverflowHiddenElements,c="function"==typeof h?h:function(t){return t!==h};if(!t(e))throw new TypeError("Invalid target");for(var f=document.scrollingElement||document.documentElement,s=[],p=e;t(p)&&c(p);){if((p=p.parentElement)===f){s.push(p);break}null!=p&&p===document.body&&n$1(p)&&!n$1(document.documentElement)||null!=p&&n$1(p,a)&&s.push(p);}for(var m=o.visualViewport?o.visualViewport.width:innerWidth,g=o.visualViewport?o.visualViewport.height:innerHeight,w=window.scrollX||pageXOffset,v=window.scrollY||pageYOffset,W=e.getBoundingClientRect(),b=W.height,H=W.width,y=W.top,E=W.right,M=W.bottom,V=W.left,x="start"===d||"nearest"===d?y:"end"===d?M:y+b/2,I="center"===u?V+H/2:"end"===u?E:V,C=[],T=0;T<s.length;T++){var k=s[T],B=k.getBoundingClientRect(),D=B.height,O=B.width,R=B.top,X=B.right,Y=B.bottom,L=B.left;if("if-needed"===l&&y>=0&&V>=0&&M<=g&&E<=m&&y>=R&&M<=Y&&V>=L&&E<=X)return C;var S=getComputedStyle(k),j=parseInt(S.borderLeftWidth,10),q=parseInt(S.borderTopWidth,10),z=parseInt(S.borderRightWidth,10),A=parseInt(S.borderBottomWidth,10),F=0,G=0,J="offsetWidth"in k?k.offsetWidth-k.clientWidth-j-z:0,K="offsetHeight"in k?k.offsetHeight-k.clientHeight-q-A:0;if(f===k)F="start"===d?x:"end"===d?x-g:"nearest"===d?r(v,v+g,g,q,A,v+x,v+x+b,b):x-g/2,G="start"===u?I:"center"===u?I-m/2:"end"===u?I-m:r(w,w+m,m,j,z,w+I,w+I+H,H),F=Math.max(0,F+v),G=Math.max(0,G+w);else {F="start"===d?x-R-q:"end"===d?x-Y+A+K:"nearest"===d?r(R,Y,D,q,A+K,x,x+b,b):x-(R+D/2)+K/2,G="start"===u?I-L-j:"center"===u?I-(L+O/2)+J/2:"end"===u?I-X+z+J:r(L,X,O,j,z+J,I,I+H,H);var N=k.scrollLeft,P=k.scrollTop;x+=P-(F=Math.max(0,Math.min(P+F,k.scrollHeight-D+K))),I+=N-(G=Math.max(0,Math.min(N+G,k.scrollWidth-O+J)));}C.push({el:k,top:F,left:G});}return C}

function isOptionsObject(options) {
  return options === Object(options) && Object.keys(options).length !== 0;
}

function defaultBehavior(actions, behavior) {
  if (behavior === void 0) {
    behavior = 'auto';
  }

  var canSmoothScroll = ('scrollBehavior' in document.body.style);
  actions.forEach(function (_ref) {
    var el = _ref.el,
        top = _ref.top,
        left = _ref.left;

    if (el.scroll && canSmoothScroll) {
      el.scroll({
        top: top,
        left: left,
        behavior: behavior
      });
    } else {
      el.scrollTop = top;
      el.scrollLeft = left;
    }
  });
}

function getOptions(options) {
  if (options === false) {
    return {
      block: 'end',
      inline: 'nearest'
    };
  }

  if (isOptionsObject(options)) {
    return options;
  }

  return {
    block: 'start',
    inline: 'nearest'
  };
}

function scrollIntoView(target, options) {
  var isTargetAttached = target.isConnected || target.ownerDocument.documentElement.contains(target);

  if (isOptionsObject(options) && typeof options.behavior === 'function') {
    return options.behavior(isTargetAttached ? compute(target, options) : []);
  }

  if (!isTargetAttached) {
    return;
  }

  var computeOptions = getOptions(options);
  return defaultBehavior(compute(target, computeOptions), computeOptions.behavior);
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Constants.
 */

var IS_MAC = typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

var MODIFIERS = {
  alt: 'altKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey'
};

var ALIASES = {
  add: '+',
  break: 'pause',
  cmd: 'meta',
  command: 'meta',
  ctl: 'control',
  ctrl: 'control',
  del: 'delete',
  down: 'arrowdown',
  esc: 'escape',
  ins: 'insert',
  left: 'arrowleft',
  mod: IS_MAC ? 'meta' : 'control',
  opt: 'alt',
  option: 'alt',
  return: 'enter',
  right: 'arrowright',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  win: 'meta',
  windows: 'meta'
};

var CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  ' ': 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  '\'': 222
};

for (var f = 1; f < 20; f++) {
  CODES['f' + f] = 111 + f;
}

/**
 * Is hotkey?
 */

function isHotkey(hotkey, options, event) {
  if (options && !('byKey' in options)) {
    event = options;
    options = null;
  }

  if (!Array.isArray(hotkey)) {
    hotkey = [hotkey];
  }

  var array = hotkey.map(function (string) {
    return parseHotkey(string, options);
  });
  var check = function check(e) {
    return array.some(function (object) {
      return compareHotkey(object, e);
    });
  };
  var ret = event == null ? check : check(event);
  return ret;
}

function isCodeHotkey(hotkey, event) {
  return isHotkey(hotkey, event);
}

function isKeyHotkey(hotkey, event) {
  return isHotkey(hotkey, { byKey: true }, event);
}

/**
 * Parse.
 */

function parseHotkey(hotkey, options) {
  var byKey = options && options.byKey;
  var ret = {};

  // Special case to handle the `+` key since we use it as a separator.
  hotkey = hotkey.replace('++', '+add');
  var values = hotkey.split('+');
  var length = values.length;

  // Ensure that all the modifiers are set to false unless the hotkey has them.

  for (var k in MODIFIERS) {
    ret[MODIFIERS[k]] = false;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      var optional = value.endsWith('?') && value.length > 1;

      if (optional) {
        value = value.slice(0, -1);
      }

      var name = toKeyName(value);
      var modifier = MODIFIERS[name];

      if (length === 1 || !modifier) {
        if (byKey) {
          ret.key = name;
        } else {
          ret.which = toKeyCode(value);
        }
      }

      if (modifier) {
        ret[modifier] = optional ? null : true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return ret;
}

/**
 * Compare.
 */

function compareHotkey(object, event) {
  for (var key in object) {
    var expected = object[key];
    var actual = void 0;

    if (expected == null) {
      continue;
    }

    if (key === 'key' && event.key != null) {
      actual = event.key.toLowerCase();
    } else if (key === 'which') {
      actual = expected === 91 && event.which === 93 ? 91 : event.which;
    } else {
      actual = event[key];
    }

    if (actual == null && expected === false) {
      continue;
    }

    if (actual !== expected) {
      return false;
    }
  }

  return true;
}

/**
 * Utils.
 */

function toKeyCode(name) {
  name = toKeyName(name);
  var code = CODES[name] || name.toUpperCase().charCodeAt(0);
  return code;
}

function toKeyName(name) {
  name = name.toLowerCase();
  name = ALIASES[name] || name;
  return name;
}

/**
 * Export.
 */

exports.default = isHotkey;
exports.isHotkey = isHotkey;
exports.isCodeHotkey = isCodeHotkey;
exports.isKeyHotkey = isKeyHotkey;
exports.parseHotkey = parseHotkey;
exports.compareHotkey = compareHotkey;
exports.toKeyCode = toKeyCode;
exports.toKeyName = toKeyName;
});

unwrapExports(lib);
lib.isHotkey;
lib.isCodeHotkey;
var lib_3 = lib.isKeyHotkey;
lib.parseHotkey;
lib.compareHotkey;
lib.toKeyCode;
lib.toKeyName;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/**
 * Leaf content strings.
 */

var String$1 = props => {
  var {
    isLast,
    leaf,
    parent,
    text
  } = props;
  var editor = useSlateStatic();
  var path = ReactEditor.findPath(editor, text);
  var parentPath = Path.parent(path); // COMPAT: Render text inside void nodes with a zero-width space.
  // So the node can contain selection but the text is not visible.

  if (editor.isVoid(parent)) {
    return /*#__PURE__*/React.createElement(ZeroWidthString, {
      length: Node.string(parent).length
    });
  } // COMPAT: If this is the last text node in an empty block, render a zero-
  // width space that will convert into a line break when copying and pasting
  // to support expected plain text.


  if (leaf.text === '' && parent.children[parent.children.length - 1] === text && !editor.isInline(parent) && Editor.string(editor, parentPath) === '') {
    return /*#__PURE__*/React.createElement(ZeroWidthString, {
      isLineBreak: true
    });
  } // COMPAT: If the text is empty, it's because it's on the edge of an inline
  // node, so we render a zero-width space so that the selection can be
  // inserted next to it still.


  if (leaf.text === '') {
    return /*#__PURE__*/React.createElement(ZeroWidthString, null);
  } // COMPAT: Browsers will collapse trailing new lines at the end of blocks,
  // so we need to add an extra trailing new lines to prevent that.


  if (isLast && leaf.text.slice(-1) === '\n') {
    return /*#__PURE__*/React.createElement(TextString, {
      isTrailing: true,
      text: leaf.text
    });
  }

  return /*#__PURE__*/React.createElement(TextString, {
    text: leaf.text
  });
};
/**
 * Leaf strings with text in them.
 */


var TextString = props => {
  var {
    text,
    isTrailing = false
  } = props;
  var ref = useRef(null);
  var forceUpdateCount = useRef(0);

  if (ref.current && ref.current.textContent !== text) {
    forceUpdateCount.current += 1;
  } // This component may have skipped rendering due to native operations being
  // applied. If an undo is performed React will see the old and new shadow DOM
  // match and not apply an update. Forces each render to actually reconcile.


  return /*#__PURE__*/React.createElement("span", {
    "data-slate-string": true,
    ref: ref,
    key: forceUpdateCount.current
  }, text, isTrailing ? '\n' : null);
};
/**
 * Leaf strings without text, render as zero-width strings.
 */


var ZeroWidthString = props => {
  var {
    length = 0,
    isLineBreak = false
  } = props;
  return /*#__PURE__*/React.createElement("span", {
    "data-slate-zero-width": isLineBreak ? 'n' : 'z',
    "data-slate-length": length
  }, '\uFEFF', isLineBreak ? /*#__PURE__*/React.createElement("br", null) : null);
};

/**
 * Two weak maps that allow us rebuild a path given a node. They are populated
 * at render time such that after a render occurs we can always backtrack.
 */
var NODE_TO_INDEX = new WeakMap();
var NODE_TO_PARENT = new WeakMap();
/**
 * Weak maps that allow us to go between Slate nodes and DOM nodes. These
 * are used to resolve DOM event-related logic into Slate actions.
 */

var EDITOR_TO_WINDOW = new WeakMap();
var EDITOR_TO_ELEMENT = new WeakMap();
var ELEMENT_TO_NODE = new WeakMap();
var NODE_TO_ELEMENT = new WeakMap();
var NODE_TO_KEY = new WeakMap();
var EDITOR_TO_KEY_TO_ELEMENT = new WeakMap();
/**
 * Weak maps for storing editor-related state.
 */

var IS_READ_ONLY = new WeakMap();
var IS_FOCUSED = new WeakMap();
/**
 * Weak map for associating the context `onChange` context with the plugin.
 */

var EDITOR_TO_ON_CHANGE = new WeakMap();
var EDITOR_TO_RESTORE_DOM = new WeakMap();
/**
 * Symbols.
 */

var PLACEHOLDER_SYMBOL = Symbol('placeholder');

/**
 * Individual leaves in a text node with unique formatting.
 */

var Leaf$2 = props => {
  var {
    leaf,
    isLast,
    text,
    parent,
    renderPlaceholder,
    renderLeaf = props => /*#__PURE__*/React.createElement(DefaultLeaf, Object.assign({}, props))
  } = props;
  var placeholderRef = useRef(null);
  useEffect(() => {
    var placeholderEl = placeholderRef === null || placeholderRef === void 0 ? void 0 : placeholderRef.current;
    var editorEl = document.querySelector('[data-slate-editor="true"]');

    if (!placeholderEl || !editorEl) {
      return;
    }

    editorEl.style.minHeight = "".concat(placeholderEl.clientHeight, "px");
    return () => {
      editorEl.style.minHeight = 'auto';
    };
  }, [placeholderRef, leaf]);
  var children = /*#__PURE__*/React.createElement(String$1, {
    isLast: isLast,
    leaf: leaf,
    parent: parent,
    text: text
  });

  if (leaf[PLACEHOLDER_SYMBOL]) {
    var placeholderProps = {
      children: leaf.placeholder,
      attributes: {
        'data-slate-placeholder': true,
        style: {
          position: 'absolute',
          pointerEvents: 'none',
          width: '100%',
          maxWidth: '100%',
          display: 'block',
          opacity: '0.333',
          userSelect: 'none',
          textDecoration: 'none'
        },
        contentEditable: false,
        ref: placeholderRef
      }
    };
    children = /*#__PURE__*/React.createElement(React.Fragment, null, renderPlaceholder(placeholderProps), children);
  } // COMPAT: Having the `data-` attributes on these leaf elements ensures that
  // in certain misbehaving browsers they aren't weirdly cloned/destroyed by
  // contenteditable behaviors. (2019/05/08)


  var attributes = {
    'data-slate-leaf': true
  };
  return renderLeaf({
    attributes,
    children,
    leaf,
    text
  });
};

var MemoizedLeaf = /*#__PURE__*/React.memo(Leaf$2, (prev, next) => {
  return next.parent === prev.parent && next.isLast === prev.isLast && next.renderLeaf === prev.renderLeaf && next.renderPlaceholder === prev.renderPlaceholder && next.text === prev.text && Text$1.equals(next.leaf, prev.leaf) && next.leaf[PLACEHOLDER_SYMBOL] === prev.leaf[PLACEHOLDER_SYMBOL];
});
var DefaultLeaf = props => {
  var {
    attributes,
    children
  } = props;
  return /*#__PURE__*/React.createElement("span", Object.assign({}, attributes), children);
};

var IS_IOS = typeof navigator !== 'undefined' && typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var IS_APPLE = typeof navigator !== 'undefined' && /Mac OS X/.test(navigator.userAgent);
var IS_ANDROID = typeof navigator !== 'undefined' && /Android/.test(navigator.userAgent);
var IS_FIREFOX = typeof navigator !== 'undefined' && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
var IS_SAFARI = typeof navigator !== 'undefined' && /Version\/[\d\.]+.*Safari/.test(navigator.userAgent); // "modern" Edge was released at 79.x

var IS_EDGE_LEGACY = typeof navigator !== 'undefined' && /Edge?\/(?:[0-6][0-9]|[0-7][0-8])/i.test(navigator.userAgent);
var IS_CHROME = typeof navigator !== 'undefined' && /Chrome/i.test(navigator.userAgent); // Native `beforeInput` events don't work well with react on Chrome 75
// and older, Chrome 76+ can use `beforeInput` though.

var IS_CHROME_LEGACY = typeof navigator !== 'undefined' && /Chrome?\/(?:[0-7][0-5]|[0-6][0-9])/i.test(navigator.userAgent); // Firefox did not support `beforeInput` until `v87`.

var IS_FIREFOX_LEGACY = typeof navigator !== 'undefined' && /^(?!.*Seamonkey)(?=.*Firefox\/(?:[0-7][0-9]|[0-8][0-6])).*/i.test(navigator.userAgent); // qq browser

var IS_QQBROWSER = typeof navigator !== 'undefined' && /.*QQBrowser/.test(navigator.userAgent); // Check if DOM is available as React does internally.
// https://github.com/facebook/react/blob/master/packages/shared/ExecutionEnvironment.js

var CAN_USE_DOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined'); // COMPAT: Firefox/Edge Legacy don't support the `beforeinput` event
// Chrome Legacy doesn't support `beforeinput` correctly

var HAS_BEFORE_INPUT_SUPPORT = !IS_CHROME_LEGACY && !IS_EDGE_LEGACY && // globalThis is undefined in older browsers
typeof globalThis !== 'undefined' && globalThis.InputEvent && // @ts-ignore The `getTargetRanges` property isn't recognized.
typeof globalThis.InputEvent.prototype.getTargetRanges === 'function';

/**
 * Prevent warning on SSR by falling back to useEffect when DOM isn't available
 */

var useIsomorphicLayoutEffect = CAN_USE_DOM ? useLayoutEffect : useEffect;

var _excluded$3 = ["anchor", "focus"],
    _excluded2 = ["anchor", "focus"];
var shallowCompare = (obj1, obj2) => Object.keys(obj1).length === Object.keys(obj2).length && Object.keys(obj1).every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
/**
 * Check if a list of decorator ranges are equal to another.
 *
 * PERF: this requires the two lists to also have the ranges inside them in the
 * same order, but this is an okay constraint for us since decorations are
 * kept in order, and the odd case where they aren't is okay to re-render for.
 */

var isDecoratorRangeListEqual = (list, another) => {
  if (list.length !== another.length) {
    return false;
  }

  for (var i = 0; i < list.length; i++) {
    var range = list[i];
    var other = another[i];

    var rangeOwnProps = _objectWithoutProperties(range, _excluded$3);

    var otherOwnProps = _objectWithoutProperties(other, _excluded2);

    if (!Range.equals(range, other) || range[PLACEHOLDER_SYMBOL] !== other[PLACEHOLDER_SYMBOL] || !shallowCompare(rangeOwnProps, otherOwnProps)) {
      return false;
    }
  }

  return true;
};

/**
 * Text.
 */

var Text = props => {
  var {
    decorations,
    isLast,
    parent,
    renderPlaceholder,
    renderLeaf,
    text
  } = props;
  var editor = useSlateStatic();
  var ref = useRef(null);
  var leaves = Text$1.decorations(text, decorations);
  var key = ReactEditor.findKey(editor, text);
  var children = [];

  for (var i = 0; i < leaves.length; i++) {
    var leaf = leaves[i];
    children.push( /*#__PURE__*/React.createElement(MemoizedLeaf, {
      isLast: isLast && i === leaves.length - 1,
      key: "".concat(key.id, "-").concat(i),
      renderPlaceholder: renderPlaceholder,
      leaf: leaf,
      text: text,
      parent: parent,
      renderLeaf: renderLeaf
    }));
  } // Update element-related weak maps with the DOM element ref.


  useIsomorphicLayoutEffect(() => {
    var KEY_TO_ELEMENT = EDITOR_TO_KEY_TO_ELEMENT.get(editor);

    if (ref.current) {
      KEY_TO_ELEMENT === null || KEY_TO_ELEMENT === void 0 ? void 0 : KEY_TO_ELEMENT.set(key, ref.current);
      NODE_TO_ELEMENT.set(text, ref.current);
      ELEMENT_TO_NODE.set(ref.current, text);
    } else {
      KEY_TO_ELEMENT === null || KEY_TO_ELEMENT === void 0 ? void 0 : KEY_TO_ELEMENT.delete(key);
      NODE_TO_ELEMENT.delete(text);
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    "data-slate-node": "text",
    ref: ref
  }, children);
};

var MemoizedText = /*#__PURE__*/React.memo(Text, (prev, next) => {
  return next.parent === prev.parent && next.isLast === prev.isLast && next.renderLeaf === prev.renderLeaf && next.text === prev.text && isDecoratorRangeListEqual(next.decorations, prev.decorations);
});

/**
 * Element.
 */

var Element$8 = props => {
  var {
    decorations,
    element,
    renderElement = p => /*#__PURE__*/React.createElement(DefaultElement, Object.assign({}, p)),
    renderPlaceholder,
    renderLeaf,
    selection
  } = props;
  var ref = useRef(null);
  var editor = useSlateStatic();
  var readOnly = useReadOnly();
  var isInline = editor.isInline(element);
  var key = ReactEditor.findKey(editor, element);
  var children = useChildren({
    decorations,
    node: element,
    renderElement,
    renderPlaceholder,
    renderLeaf,
    selection
  }); // Attributes that the developer must mix into the element in their
  // custom node renderer component.

  var attributes = {
    'data-slate-node': 'element',
    ref
  };

  if (isInline) {
    attributes['data-slate-inline'] = true;
  } // If it's a block node with inline children, add the proper `dir` attribute
  // for text direction.


  if (!isInline && Editor.hasInlines(editor, element)) {
    var text = Node.string(element);
    var dir = direction_1(text);

    if (dir === 'rtl') {
      attributes.dir = dir;
    }
  } // If it's a void node, wrap the children in extra void-specific elements.


  if (Editor.isVoid(editor, element)) {
    attributes['data-slate-void'] = true;

    if (!readOnly && isInline) {
      attributes.contentEditable = false;
    }

    var Tag = isInline ? 'span' : 'div';
    var [[_text]] = Node.texts(element);
    children = readOnly ? null : /*#__PURE__*/React.createElement(Tag, {
      "data-slate-spacer": true,
      style: {
        height: '0',
        color: 'transparent',
        outline: 'none',
        position: 'absolute'
      }
    }, /*#__PURE__*/React.createElement(MemoizedText, {
      renderPlaceholder: renderPlaceholder,
      decorations: [],
      isLast: false,
      parent: element,
      text: _text
    }));
    NODE_TO_INDEX.set(_text, 0);
    NODE_TO_PARENT.set(_text, element);
  } // Update element-related weak maps with the DOM element ref.


  useIsomorphicLayoutEffect(() => {
    var KEY_TO_ELEMENT = EDITOR_TO_KEY_TO_ELEMENT.get(editor);

    if (ref.current) {
      KEY_TO_ELEMENT === null || KEY_TO_ELEMENT === void 0 ? void 0 : KEY_TO_ELEMENT.set(key, ref.current);
      NODE_TO_ELEMENT.set(element, ref.current);
      ELEMENT_TO_NODE.set(ref.current, element);
    } else {
      KEY_TO_ELEMENT === null || KEY_TO_ELEMENT === void 0 ? void 0 : KEY_TO_ELEMENT.delete(key);
      NODE_TO_ELEMENT.delete(element);
    }
  });
  return renderElement({
    attributes,
    children,
    element
  });
};

var MemoizedElement = /*#__PURE__*/React.memo(Element$8, (prev, next) => {
  return prev.element === next.element && prev.renderElement === next.renderElement && prev.renderLeaf === next.renderLeaf && isDecoratorRangeListEqual(prev.decorations, next.decorations) && (prev.selection === next.selection || !!prev.selection && !!next.selection && Range.equals(prev.selection, next.selection));
});
/**
 * The default element renderer.
 */

var DefaultElement = props => {
  var {
    attributes,
    children,
    element
  } = props;
  var editor = useSlateStatic();
  var Tag = editor.isInline(element) ? 'span' : 'div';
  return /*#__PURE__*/React.createElement(Tag, Object.assign({}, attributes, {
    style: {
      position: 'relative'
    }
  }), children);
};

/**
 * A React context for sharing the editor object.
 */

var EditorContext = /*#__PURE__*/createContext(null);
/**
 * Get the current editor object from the React context.
 */

var useSlateStatic = () => {
  var editor = useContext(EditorContext);

  if (!editor) {
    throw new Error("The `useSlateStatic` hook must be used inside the <Slate> component's context.");
  }

  return editor;
};

/**
 * A React context for sharing the `decorate` prop of the editable.
 */

var DecorateContext = /*#__PURE__*/createContext(() => []);
/**
 * Get the current `decorate` prop of the editable.
 */

var useDecorate = () => {
  return useContext(DecorateContext);
};

/**
 * A React context for sharing the `selected` state of an element.
 */

var SelectedContext = /*#__PURE__*/createContext(false);
/**
 * Get the current `selected` state of an element.
 */

var useSelected = () => {
  return useContext(SelectedContext);
};

/**
 * Children.
 */

var useChildren = props => {
  var {
    decorations,
    node,
    renderElement,
    renderPlaceholder,
    renderLeaf,
    selection
  } = props;
  var decorate = useDecorate();
  var editor = useSlateStatic();
  var path = ReactEditor.findPath(editor, node);
  var children = [];
  var isLeafBlock = Element$9.isElement(node) && !editor.isInline(node) && Editor.hasInlines(editor, node);

  for (var i = 0; i < node.children.length; i++) {
    var p = path.concat(i);
    var n = node.children[i];
    var key = ReactEditor.findKey(editor, n);
    var range = Editor.range(editor, p);
    var sel = selection && Range.intersection(range, selection);
    var ds = decorate([n, p]);

    for (var dec of decorations) {
      var d = Range.intersection(dec, range);

      if (d) {
        ds.push(d);
      }
    }

    if (Element$9.isElement(n)) {
      children.push( /*#__PURE__*/React.createElement(SelectedContext.Provider, {
        key: "provider-".concat(key.id),
        value: !!sel
      }, /*#__PURE__*/React.createElement(MemoizedElement, {
        decorations: ds,
        element: n,
        key: key.id,
        renderElement: renderElement,
        renderPlaceholder: renderPlaceholder,
        renderLeaf: renderLeaf,
        selection: sel
      })));
    } else {
      children.push( /*#__PURE__*/React.createElement(MemoizedText, {
        decorations: ds,
        key: key.id,
        isLast: isLeafBlock && i === node.children.length - 1,
        parent: node,
        renderPlaceholder: renderPlaceholder,
        renderLeaf: renderLeaf,
        text: n
      }));
    }

    NODE_TO_INDEX.set(n, i);
    NODE_TO_PARENT.set(n, node);
  }

  return children;
};

/**
 * Hotkey mappings for each platform.
 */

var HOTKEYS = {
  bold: 'mod+b',
  compose: ['down', 'left', 'right', 'up', 'backspace', 'enter'],
  moveBackward: 'left',
  moveForward: 'right',
  moveWordBackward: 'ctrl+left',
  moveWordForward: 'ctrl+right',
  deleteBackward: 'shift?+backspace',
  deleteForward: 'shift?+delete',
  extendBackward: 'shift+left',
  extendForward: 'shift+right',
  italic: 'mod+i',
  splitBlock: 'shift?+enter',
  undo: 'mod+z'
};
var APPLE_HOTKEYS = {
  moveLineBackward: 'opt+up',
  moveLineForward: 'opt+down',
  moveWordBackward: 'opt+left',
  moveWordForward: 'opt+right',
  deleteBackward: ['ctrl+backspace', 'ctrl+h'],
  deleteForward: ['ctrl+delete', 'ctrl+d'],
  deleteLineBackward: 'cmd+shift?+backspace',
  deleteLineForward: ['cmd+shift?+delete', 'ctrl+k'],
  deleteWordBackward: 'opt+shift?+backspace',
  deleteWordForward: 'opt+shift?+delete',
  extendLineBackward: 'opt+shift+up',
  extendLineForward: 'opt+shift+down',
  redo: 'cmd+shift+z',
  transposeCharacter: 'ctrl+t'
};
var WINDOWS_HOTKEYS = {
  deleteWordBackward: 'ctrl+shift?+backspace',
  deleteWordForward: 'ctrl+shift?+delete',
  redo: ['ctrl+y', 'ctrl+shift+z']
};
/**
 * Create a platform-aware hotkey checker.
 */

var create = key => {
  var generic = HOTKEYS[key];
  var apple = APPLE_HOTKEYS[key];
  var windows = WINDOWS_HOTKEYS[key];
  var isGeneric = generic && lib_3(generic);
  var isApple = apple && lib_3(apple);
  var isWindows = windows && lib_3(windows);
  return event => {
    if (isGeneric && isGeneric(event)) return true;
    if (IS_APPLE && isApple && isApple(event)) return true;
    if (!IS_APPLE && isWindows && isWindows(event)) return true;
    return false;
  };
};
/**
 * Hotkeys.
 */


var Hotkeys = {
  isBold: create('bold'),
  isCompose: create('compose'),
  isMoveBackward: create('moveBackward'),
  isMoveForward: create('moveForward'),
  isDeleteBackward: create('deleteBackward'),
  isDeleteForward: create('deleteForward'),
  isDeleteLineBackward: create('deleteLineBackward'),
  isDeleteLineForward: create('deleteLineForward'),
  isDeleteWordBackward: create('deleteWordBackward'),
  isDeleteWordForward: create('deleteWordForward'),
  isExtendBackward: create('extendBackward'),
  isExtendForward: create('extendForward'),
  isExtendLineBackward: create('extendLineBackward'),
  isExtendLineForward: create('extendLineForward'),
  isItalic: create('italic'),
  isMoveLineBackward: create('moveLineBackward'),
  isMoveLineForward: create('moveLineForward'),
  isMoveWordBackward: create('moveWordBackward'),
  isMoveWordForward: create('moveWordForward'),
  isRedo: create('redo'),
  isSplitBlock: create('splitBlock'),
  isTransposeCharacter: create('transposeCharacter'),
  isUndo: create('undo')
};

/**
 * A React context for sharing the `readOnly` state of the editor.
 */

var ReadOnlyContext = /*#__PURE__*/createContext(false);
/**
 * Get the current `readOnly` state of the editor.
 */

var useReadOnly = () => {
  return useContext(ReadOnlyContext);
};

/**
 * A React context for sharing the editor object, in a way that re-renders the
 * context whenever changes occur.
 */

var SlateContext = /*#__PURE__*/createContext(null);
/**
 * Get the current editor object from the React context.
 */

var useSlate = () => {
  var context = useContext(SlateContext);

  if (!context) {
    throw new Error("The `useSlate` hook must be used inside the <Slate> component's context.");
  }

  var [editor] = context;
  return editor;
};

/**
 * Types.
 */
/**
 * Returns the host window of a DOM node
 */

var getDefaultView = value => {
  return value && value.ownerDocument && value.ownerDocument.defaultView || null;
};
/**
 * Check if a DOM node is a comment node.
 */

var isDOMComment = value => {
  return isDOMNode(value) && value.nodeType === 8;
};
/**
 * Check if a DOM node is an element node.
 */

var isDOMElement = value => {
  return isDOMNode(value) && value.nodeType === 1;
};
/**
 * Check if a value is a DOM node.
 */

var isDOMNode = value => {
  var window = getDefaultView(value);
  return !!window && value instanceof window.Node;
};
/**
 * Check if a value is a DOM selection.
 */

var isDOMSelection = value => {
  var window = value && value.anchorNode && getDefaultView(value.anchorNode);
  return !!window && value instanceof window.Selection;
};
/**
 * Check if a DOM node is an element node.
 */

var isDOMText = value => {
  return isDOMNode(value) && value.nodeType === 3;
};
/**
 * Checks whether a paste event is a plaintext-only event.
 */

var isPlainTextOnlyPaste = event => {
  return event.clipboardData && event.clipboardData.getData('text/plain') !== '' && event.clipboardData.types.length === 1;
};
/**
 * Normalize a DOM point so that it always refers to a text node.
 */

var normalizeDOMPoint = domPoint => {
  var [node, offset] = domPoint; // If it's an element node, its offset refers to the index of its children
  // including comment nodes, so try to find the right text child node.

  if (isDOMElement(node) && node.childNodes.length) {
    var isLast = offset === node.childNodes.length;
    var index = isLast ? offset - 1 : offset;
    [node, index] = getEditableChildAndIndex(node, index, isLast ? 'backward' : 'forward'); // If the editable child found is in front of input offset, we instead seek to its end

    isLast = index < offset; // If the node has children, traverse until we have a leaf node. Leaf nodes
    // can be either text nodes, or other void DOM nodes.

    while (isDOMElement(node) && node.childNodes.length) {
      var i = isLast ? node.childNodes.length - 1 : 0;
      node = getEditableChild(node, i, isLast ? 'backward' : 'forward');
    } // Determine the new offset inside the text node.


    offset = isLast && node.textContent != null ? node.textContent.length : 0;
  } // Return the node and offset.


  return [node, offset];
};
/**
 * Determines wether the active element is nested within a shadowRoot
 */

var hasShadowRoot = () => {
  return !!(window.document.activeElement && window.document.activeElement.shadowRoot);
};
/**
 * Get the nearest editable child and index at `index` in a `parent`, preferring
 * `direction`.
 */

var getEditableChildAndIndex = (parent, index, direction) => {
  var {
    childNodes
  } = parent;
  var child = childNodes[index];
  var i = index;
  var triedForward = false;
  var triedBackward = false; // While the child is a comment node, or an element node with no children,
  // keep iterating to find a sibling non-void, non-comment node.

  while (isDOMComment(child) || isDOMElement(child) && child.childNodes.length === 0 || isDOMElement(child) && child.getAttribute('contenteditable') === 'false') {
    if (triedForward && triedBackward) {
      break;
    }

    if (i >= childNodes.length) {
      triedForward = true;
      i = index - 1;
      direction = 'backward';
      continue;
    }

    if (i < 0) {
      triedBackward = true;
      i = index + 1;
      direction = 'forward';
      continue;
    }

    child = childNodes[i];
    index = i;
    i += direction === 'forward' ? 1 : -1;
  }

  return [child, index];
};
/**
 * Get the nearest editable child at `index` in a `parent`, preferring
 * `direction`.
 */

var getEditableChild = (parent, index, direction) => {
  var [child] = getEditableChildAndIndex(parent, index, direction);
  return child;
};
/**
 * Get a plaintext representation of the content of a node, accounting for block
 * elements which get a newline appended.
 *
 * The domNode must be attached to the DOM.
 */

var getPlainText = domNode => {
  var text = '';

  if (isDOMText(domNode) && domNode.nodeValue) {
    return domNode.nodeValue;
  }

  if (isDOMElement(domNode)) {
    for (var childNode of Array.from(domNode.childNodes)) {
      text += getPlainText(childNode);
    }

    var display = getComputedStyle(domNode).getPropertyValue('display');

    if (display === 'block' || display === 'list' || domNode.tagName === 'BR') {
      text += '\n';
    }
  }

  return text;
};
/**
 * Get x-slate-fragment attribute from data-slate-fragment
 */

var catchSlateFragment = /data-slate-fragment="(.+?)"/m;
var getSlateFragmentAttribute = dataTransfer => {
  var htmlData = dataTransfer.getData('text/html');
  var [, fragment] = htmlData.match(catchSlateFragment) || [];
  return fragment;
};
/**
 * Get the x-slate-fragment attribute that exist in text/html data
 * and append it to the DataTransfer object
 */

var getClipboardData = dataTransfer => {
  if (!dataTransfer.getData('application/x-slate-fragment')) {
    var fragment = getSlateFragmentAttribute(dataTransfer);

    if (fragment) {
      var clipboardData = new DataTransfer();
      dataTransfer.types.forEach(type => {
        clipboardData.setData(type, dataTransfer.getData(type));
      });
      clipboardData.setData('application/x-slate-fragment', fragment);
      return clipboardData;
    }
  }

  return dataTransfer;
};

var AS_NATIVE = new WeakMap();
var NATIVE_OPERATIONS = new WeakMap();
/**
 * `asNative` queues operations as native, meaning native browser events will
 * not have been prevented, and we need to flush the operations
 * after the native events have propogated to the DOM.
 * @param {Editor} editor - Editor on which the operations are being applied
 * @param {callback} fn - Function containing .exec calls which will be queued as native
 */

var asNative = function asNative(editor, fn) {
  var {
    onFlushed
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var isNative = AS_NATIVE.get(editor);
  AS_NATIVE.set(editor, true);

  try {
    fn();
  } finally {
    if (isNative !== undefined) {
      AS_NATIVE.set(editor, isNative);
    }
  }

  if (!NATIVE_OPERATIONS.get(editor)) {
    onFlushed === null || onFlushed === void 0 ? void 0 : onFlushed();
  }
};
/**
 * `flushNativeEvents` applies any queued native events.
 * @param {Editor} editor - Editor on which the operations are being applied
 */

var flushNativeEvents = editor => {
  var nativeOps = NATIVE_OPERATIONS.get(editor); // Clear list _before_ applying, as we might flush
  // events in each op, as well.

  NATIVE_OPERATIONS.delete(editor);

  if (nativeOps) {
    Editor.withoutNormalizing(editor, () => {
      nativeOps.forEach(op => {
        editor.apply(op);
      });
    });
  }
};

var _excluded$2 = ["autoFocus", "decorate", "onDOMBeforeInput", "placeholder", "readOnly", "renderElement", "renderLeaf", "renderPlaceholder", "scrollSelectionIntoView", "style", "as"];

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Children = props => /*#__PURE__*/React.createElement(React.Fragment, null, useChildren(props));
/**
 * Editable.
 */


var Editable$1 = props => {
  var {
    autoFocus,
    decorate = defaultDecorate,
    onDOMBeforeInput: propsOnDOMBeforeInput,
    placeholder,
    readOnly = false,
    renderElement,
    renderLeaf,
    renderPlaceholder = props => /*#__PURE__*/React.createElement(DefaultPlaceholder, Object.assign({}, props)),
    scrollSelectionIntoView = defaultScrollSelectionIntoView,
    style = {},
    as: Component = 'div'
  } = props,
      attributes = _objectWithoutProperties(props, _excluded$2);

  var editor = useSlate(); // Rerender editor when composition status changed

  var [isComposing, setIsComposing] = useState(false);
  var ref = useRef(null); // Update internal state on each render.

  IS_READ_ONLY.set(editor, readOnly); // Keep track of some state for the event handler logic.

  var state = useMemo(() => ({
    isComposing: false,
    hasInsertPrefixInCompositon: false,
    isDraggingInternally: false,
    isUpdatingSelection: false,
    latestElement: null
  }), []); // Whenever the editor updates...

  useIsomorphicLayoutEffect(() => {
    // Update element-related weak maps with the DOM element ref.
    var window;

    if (ref.current && (window = getDefaultView(ref.current))) {
      EDITOR_TO_WINDOW.set(editor, window);
      EDITOR_TO_ELEMENT.set(editor, ref.current);
      NODE_TO_ELEMENT.set(editor, ref.current);
      ELEMENT_TO_NODE.set(ref.current, editor);
    } else {
      NODE_TO_ELEMENT.delete(editor);
    } // Make sure the DOM selection state is in sync.


    var {
      selection
    } = editor;
    var root = ReactEditor.findDocumentOrShadowRoot(editor);
    var domSelection = root.getSelection();

    if (state.isComposing || !domSelection || !ReactEditor.isFocused(editor)) {
      return;
    }

    var hasDomSelection = domSelection.type !== 'None'; // If the DOM selection is properly unset, we're done.

    if (!selection && !hasDomSelection) {
      return;
    } // verify that the dom selection is in the editor


    var editorElement = EDITOR_TO_ELEMENT.get(editor);
    var hasDomSelectionInEditor = false;

    if (editorElement.contains(domSelection.anchorNode) && editorElement.contains(domSelection.focusNode)) {
      hasDomSelectionInEditor = true;
    } // If the DOM selection is in the editor and the editor selection is already correct, we're done.


    if (hasDomSelection && hasDomSelectionInEditor && selection) {
      var slateRange = ReactEditor.toSlateRange(editor, domSelection, {
        exactMatch: false
      });

      if (slateRange && Range.equals(slateRange, selection)) {
        return;
      }
    } // when <Editable/> is being controlled through external value
    // then its children might just change - DOM responds to it on its own
    // but Slate's value is not being updated through any operation
    // and thus it doesn't transform selection on its own


    if (selection && !ReactEditor.hasRange(editor, selection)) {
      editor.selection = ReactEditor.toSlateRange(editor, domSelection, {
        exactMatch: false
      });
      return;
    } // Otherwise the DOM selection is out of sync, so update it.


    state.isUpdatingSelection = true;
    var newDomRange = selection && ReactEditor.toDOMRange(editor, selection);

    if (newDomRange) {
      if (Range.isBackward(selection)) {
        domSelection.setBaseAndExtent(newDomRange.endContainer, newDomRange.endOffset, newDomRange.startContainer, newDomRange.startOffset);
      } else {
        domSelection.setBaseAndExtent(newDomRange.startContainer, newDomRange.startOffset, newDomRange.endContainer, newDomRange.endOffset);
      }

      scrollSelectionIntoView(editor, newDomRange);
    } else {
      domSelection.removeAllRanges();
    }

    setTimeout(() => {
      // COMPAT: In Firefox, it's not enough to create a range, you also need
      // to focus the contenteditable element too. (2016/11/16)
      if (newDomRange && IS_FIREFOX) {
        var el = ReactEditor.toDOMNode(editor, editor);
        el.focus();
      }

      state.isUpdatingSelection = false;
    });
  }); // The autoFocus TextareaHTMLAttribute doesn't do anything on a div, so it
  // needs to be manually focused.

  useEffect(() => {
    if (ref.current && autoFocus) {
      ref.current.focus();
    }
  }, [autoFocus]); // Listen on the native `beforeinput` event to get real "Level 2" events. This
  // is required because React's `beforeinput` is fake and never really attaches
  // to the real event sadly. (2019/11/01)
  // https://github.com/facebook/react/issues/11211

  var onDOMBeforeInput = useCallback(event => {
    if (!readOnly && hasEditableTarget(editor, event.target) && !isDOMEventHandled(event, propsOnDOMBeforeInput)) {
      var {
        selection
      } = editor;
      var {
        inputType: type
      } = event;
      var data = event.dataTransfer || event.data || undefined; // These two types occur while a user is composing text and can't be
      // cancelled. Let them through and wait for the composition to end.

      if (type === 'insertCompositionText' || type === 'deleteCompositionText') {
        return;
      }

      var native = false;

      if (type === 'insertText' && selection && Range.isCollapsed(selection) && // Only use native character insertion for single characters a-z or space for now.
      // Long-press events (hold a + press 4 = ä) to choose a special character otherwise
      // causes duplicate inserts.
      event.data && event.data.length === 1 && /[a-z ]/i.test(event.data) && // Chrome seems to have issues correctly editing the start of nodes.
      // When there is an inline element, e.g. a link, and you select
      // right after it (the start of the next node).
      selection.anchor.offset !== 0) {
        native = true; // Skip native if there are marks, as
        // `insertText` will insert a node, not just text.

        if (editor.marks) {
          native = false;
        } // and because of the selection moving in `insertText` (create-editor.ts).


        var {
          anchor
        } = selection;
        var inline = Editor.above(editor, {
          at: anchor,
          match: n => Editor.isInline(editor, n),
          mode: 'highest'
        });

        if (inline) {
          var [, inlinePath] = inline;

          if (Editor.isEnd(editor, selection.anchor, inlinePath)) {
            native = false;
          }
        }
      }

      if (!native) {
        event.preventDefault();
      } // COMPAT: For the deleting forward/backward input types we don't want
      // to change the selection because it is the range that will be deleted,
      // and those commands determine that for themselves.


      if (!type.startsWith('delete') || type.startsWith('deleteBy')) {
        var [targetRange] = event.getTargetRanges();

        if (targetRange) {
          var range = ReactEditor.toSlateRange(editor, targetRange, {
            exactMatch: false
          });

          if (!selection || !Range.equals(selection, range)) {
            Transforms.select(editor, range);
          }
        }
      } // COMPAT: If the selection is expanded, even if the command seems like
      // a delete forward/backward command it should delete the selection.


      if (selection && Range.isExpanded(selection) && type.startsWith('delete')) {
        var direction = type.endsWith('Backward') ? 'backward' : 'forward';
        Editor.deleteFragment(editor, {
          direction
        });
        return;
      }

      switch (type) {
        case 'deleteByComposition':
        case 'deleteByCut':
        case 'deleteByDrag':
          {
            Editor.deleteFragment(editor);
            break;
          }

        case 'deleteContent':
        case 'deleteContentForward':
          {
            Editor.deleteForward(editor);
            break;
          }

        case 'deleteContentBackward':
          {
            Editor.deleteBackward(editor);
            break;
          }

        case 'deleteEntireSoftLine':
          {
            Editor.deleteBackward(editor, {
              unit: 'line'
            });
            Editor.deleteForward(editor, {
              unit: 'line'
            });
            break;
          }

        case 'deleteHardLineBackward':
          {
            Editor.deleteBackward(editor, {
              unit: 'block'
            });
            break;
          }

        case 'deleteSoftLineBackward':
          {
            Editor.deleteBackward(editor, {
              unit: 'line'
            });
            break;
          }

        case 'deleteHardLineForward':
          {
            Editor.deleteForward(editor, {
              unit: 'block'
            });
            break;
          }

        case 'deleteSoftLineForward':
          {
            Editor.deleteForward(editor, {
              unit: 'line'
            });
            break;
          }

        case 'deleteWordBackward':
          {
            Editor.deleteBackward(editor, {
              unit: 'word'
            });
            break;
          }

        case 'deleteWordForward':
          {
            Editor.deleteForward(editor, {
              unit: 'word'
            });
            break;
          }

        case 'insertLineBreak':
        case 'insertParagraph':
          {
            Editor.insertBreak(editor);
            break;
          }

        case 'insertFromComposition':
        case 'insertFromDrop':
        case 'insertFromPaste':
        case 'insertFromYank':
        case 'insertReplacementText':
        case 'insertText':
          {
            if (type === 'insertFromComposition') {
              // COMPAT: in Safari, `compositionend` is dispatched after the
              // `beforeinput` for "insertFromComposition". But if we wait for it
              // then we will abort because we're still composing and the selection
              // won't be updated properly.
              // https://www.w3.org/TR/input-events-2/
              state.isComposing && setIsComposing(false);
              state.isComposing = false;
            }

            var window = ReactEditor.getWindow(editor);

            if (data instanceof window.DataTransfer) {
              ReactEditor.insertData(editor, data);
            } else if (typeof data === 'string') {
              // Only insertText operations use the native functionality, for now.
              // Potentially expand to single character deletes, as well.
              if (native) {
                asNative(editor, () => Editor.insertText(editor, data), {
                  onFlushed: () => event.preventDefault()
                });
              } else {
                Editor.insertText(editor, data);
              }
            }

            break;
          }
      }
    }
  }, [readOnly, propsOnDOMBeforeInput]); // Attach a native DOM event handler for `beforeinput` events, because React's
  // built-in `onBeforeInput` is actually a leaky polyfill that doesn't expose
  // real `beforeinput` events sadly... (2019/11/04)
  // https://github.com/facebook/react/issues/11211

  useIsomorphicLayoutEffect(() => {
    if (ref.current && HAS_BEFORE_INPUT_SUPPORT) {
      // @ts-ignore The `beforeinput` event isn't recognized.
      ref.current.addEventListener('beforeinput', onDOMBeforeInput);
    }

    return () => {
      if (ref.current && HAS_BEFORE_INPUT_SUPPORT) {
        // @ts-ignore The `beforeinput` event isn't recognized.
        ref.current.removeEventListener('beforeinput', onDOMBeforeInput);
      }
    };
  }, [onDOMBeforeInput]); // Listen on the native `selectionchange` event to be able to update any time
  // the selection changes. This is required because React's `onSelect` is leaky
  // and non-standard so it doesn't fire until after a selection has been
  // released. This causes issues in situations where another change happens
  // while a selection is being dragged.

  var onDOMSelectionChange = useCallback(throttle(() => {
    if (!readOnly && !state.isComposing && !state.isUpdatingSelection && !state.isDraggingInternally) {
      var root = ReactEditor.findDocumentOrShadowRoot(editor);
      var {
        activeElement
      } = root;
      var el = ReactEditor.toDOMNode(editor, editor);
      var domSelection = root.getSelection();

      if (activeElement === el) {
        state.latestElement = activeElement;
        IS_FOCUSED.set(editor, true);
      } else {
        IS_FOCUSED.delete(editor);
      }

      if (!domSelection) {
        return Transforms.deselect(editor);
      }

      var {
        anchorNode,
        focusNode
      } = domSelection;
      var anchorNodeSelectable = hasEditableTarget(editor, anchorNode) || isTargetInsideVoid(editor, anchorNode);
      var focusNodeSelectable = hasEditableTarget(editor, focusNode) || isTargetInsideVoid(editor, focusNode);

      if (anchorNodeSelectable && focusNodeSelectable) {
        var range = ReactEditor.toSlateRange(editor, domSelection, {
          exactMatch: false
        });
        Transforms.select(editor, range);
      } else {
        Transforms.deselect(editor);
      }
    }
  }, 100), [readOnly]);
  var scheduleOnDOMSelectionChange = useCallback(() => setTimeout(onDOMSelectionChange), [onDOMSelectionChange]); // Attach a native DOM event handler for `selectionchange`, because React's
  // built-in `onSelect` handler doesn't fire for all selection changes. It's a
  // leaky polyfill that only fires on keypresses or clicks. Instead, we want to
  // fire for any change to the selection inside the editor. (2019/11/04)
  // https://github.com/facebook/react/issues/5785

  useIsomorphicLayoutEffect(() => {
    var window = ReactEditor.getWindow(editor);
    window.document.addEventListener('selectionchange', scheduleOnDOMSelectionChange);
    return () => {
      window.document.removeEventListener('selectionchange', scheduleOnDOMSelectionChange);
    };
  }, [scheduleOnDOMSelectionChange]);
  var decorations = decorate([editor, []]);

  if (placeholder && editor.children.length === 1 && Array.from(Node.texts(editor)).length === 1 && Node.string(editor) === '' && !isComposing) {
    var start = Editor.start(editor, []);
    decorations.push({
      [PLACEHOLDER_SYMBOL]: true,
      placeholder,
      anchor: start,
      focus: start
    });
  }

  return /*#__PURE__*/React.createElement(ReadOnlyContext.Provider, {
    value: readOnly
  }, /*#__PURE__*/React.createElement(DecorateContext.Provider, {
    value: decorate
  }, /*#__PURE__*/React.createElement(Component // COMPAT: The Grammarly Chrome extension works by changing the DOM
  // out from under `contenteditable` elements, which leads to weird
  // behaviors so we have to disable it like editor. (2017/04/24)
  , Object.assign({
    "data-gramm": false,
    role: readOnly ? undefined : 'textbox'
  }, attributes, {
    // COMPAT: Certain browsers don't support the `beforeinput` event, so we'd
    // have to use hacks to make these replacement-based features work.
    spellCheck: !HAS_BEFORE_INPUT_SUPPORT ? false : attributes.spellCheck,
    autoCorrect: !HAS_BEFORE_INPUT_SUPPORT ? 'false' : attributes.autoCorrect,
    autoCapitalize: !HAS_BEFORE_INPUT_SUPPORT ? 'false' : attributes.autoCapitalize,
    "data-slate-editor": true,
    "data-slate-node": "value",
    contentEditable: readOnly ? undefined : true,
    suppressContentEditableWarning: true,
    ref: ref,
    style: _objectSpread$2({
      // Allow positioning relative to the editable element.
      position: 'relative',
      // Prevent the default outline styles.
      outline: 'none',
      // Preserve adjacent whitespace and new lines.
      whiteSpace: 'pre-wrap',
      // Allow words to break if they are too long.
      wordWrap: 'break-word'
    }, style),
    onBeforeInput: useCallback(event => {
      // COMPAT: Certain browsers don't support the `beforeinput` event, so we
      // fall back to React's leaky polyfill instead just for it. It
      // only works for the `insertText` input type.
      if (!HAS_BEFORE_INPUT_SUPPORT && !readOnly && !isEventHandled(event, attributes.onBeforeInput) && hasEditableTarget(editor, event.target)) {
        event.preventDefault();

        if (!state.isComposing) {
          var text = event.data;
          Editor.insertText(editor, text);
        }
      }
    }, [readOnly]),
    onInput: useCallback(event => {
      // Flush native operations, as native events will have propogated
      // and we can correctly compare DOM text values in components
      // to stop rendering, so that browser functions like autocorrect
      // and spellcheck work as expected.
      flushNativeEvents(editor);
    }, []),
    onBlur: useCallback(event => {
      if (readOnly || state.isUpdatingSelection || !hasEditableTarget(editor, event.target) || isEventHandled(event, attributes.onBlur)) {
        return;
      } // COMPAT: If the current `activeElement` is still the previous
      // one, this is due to the window being blurred when the tab
      // itself becomes unfocused, so we want to abort early to allow to
      // editor to stay focused when the tab becomes focused again.


      var root = ReactEditor.findDocumentOrShadowRoot(editor);

      if (state.latestElement === root.activeElement) {
        return;
      }

      var {
        relatedTarget
      } = event;
      var el = ReactEditor.toDOMNode(editor, editor); // COMPAT: The event should be ignored if the focus is returning
      // to the editor from an embedded editable element (eg. an <input>
      // element inside a void node).

      if (relatedTarget === el) {
        return;
      } // COMPAT: The event should be ignored if the focus is moving from
      // the editor to inside a void node's spacer element.


      if (isDOMElement(relatedTarget) && relatedTarget.hasAttribute('data-slate-spacer')) {
        return;
      } // COMPAT: The event should be ignored if the focus is moving to a
      // non- editable section of an element that isn't a void node (eg.
      // a list item of the check list example).


      if (relatedTarget != null && isDOMNode(relatedTarget) && ReactEditor.hasDOMNode(editor, relatedTarget)) {
        var node = ReactEditor.toSlateNode(editor, relatedTarget);

        if (Element$9.isElement(node) && !editor.isVoid(node)) {
          return;
        }
      } // COMPAT: Safari doesn't always remove the selection even if the content-
      // editable element no longer has focus. Refer to:
      // https://stackoverflow.com/questions/12353247/force-contenteditable-div-to-stop-accepting-input-after-it-loses-focus-under-web


      if (IS_SAFARI) {
        var domSelection = root.getSelection();
        domSelection === null || domSelection === void 0 ? void 0 : domSelection.removeAllRanges();
      }

      IS_FOCUSED.delete(editor);
    }, [readOnly, attributes.onBlur]),
    onClick: useCallback(event => {
      if (!readOnly && hasTarget(editor, event.target) && !isEventHandled(event, attributes.onClick) && isDOMNode(event.target)) {
        var node = ReactEditor.toSlateNode(editor, event.target);
        var path = ReactEditor.findPath(editor, node);

        var _start = Editor.start(editor, path);

        var end = Editor.end(editor, path);
        var startVoid = Editor.void(editor, {
          at: _start
        });
        var endVoid = Editor.void(editor, {
          at: end
        });

        if (startVoid && endVoid && Path.equals(startVoid[1], endVoid[1])) {
          var range = Editor.range(editor, _start);
          Transforms.select(editor, range);
        }
      }
    }, [readOnly, attributes.onClick]),
    onCompositionEnd: useCallback(event => {
      if (hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onCompositionEnd)) {
        state.isComposing && setIsComposing(false);
        state.isComposing = false; // COMPAT: In Chrome, `beforeinput` events for compositions
        // aren't correct and never fire the "insertFromComposition"
        // type that we need. So instead, insert whenever a composition
        // ends since it will already have been committed to the DOM.

        if (!IS_SAFARI && !IS_FIREFOX_LEGACY && !IS_IOS && !IS_QQBROWSER && event.data) {
          Editor.insertText(editor, event.data);
        }

        if (editor.selection && Range.isCollapsed(editor.selection)) {
          var leafPath = editor.selection.anchor.path;
          var currentTextNode = Node.leaf(editor, leafPath);

          if (state.hasInsertPrefixInCompositon) {
            state.hasInsertPrefixInCompositon = false;
            Editor.withoutNormalizing(editor, () => {
              // remove Unicode BOM prefix added in `onCompositionStart`
              var text = currentTextNode.text.replace(/^\uFEFF/, '');
              Transforms.delete(editor, {
                distance: currentTextNode.text.length,
                reverse: true
              });
              Transforms.insertText(editor, text);
            });
          }
        }
      }
    }, [attributes.onCompositionEnd]),
    onCompositionUpdate: useCallback(event => {
      if (hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onCompositionUpdate)) {
        !state.isComposing && setIsComposing(true);
        state.isComposing = true;
      }
    }, [attributes.onCompositionUpdate]),
    onCompositionStart: useCallback(event => {
      if (hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onCompositionStart)) {
        var {
          selection,
          marks
        } = editor;

        if (selection) {
          if (Range.isExpanded(selection)) {
            Editor.deleteFragment(editor);
            return;
          }

          var inline = Editor.above(editor, {
            match: n => Editor.isInline(editor, n),
            mode: 'highest'
          });

          if (inline) {
            var [, inlinePath] = inline;

            if (Editor.isEnd(editor, selection.anchor, inlinePath)) {
              var point = Editor.after(editor, inlinePath);
              Transforms.setSelection(editor, {
                anchor: point,
                focus: point
              });
            }
          } // insert new node in advance to ensure composition text will insert
          // along with final input text
          // add Unicode BOM prefix to avoid normalize removing this node


          if (marks) {
            state.hasInsertPrefixInCompositon = true;
            Transforms.insertNodes(editor, _objectSpread$2({
              text: '\uFEFF'
            }, marks), {
              select: true
            });
          }
        }
      }
    }, [attributes.onCompositionStart]),
    onCopy: useCallback(event => {
      if (hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onCopy)) {
        event.preventDefault();
        ReactEditor.setFragmentData(editor, event.clipboardData);
      }
    }, [attributes.onCopy]),
    onCut: useCallback(event => {
      if (!readOnly && hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onCut)) {
        event.preventDefault();
        ReactEditor.setFragmentData(editor, event.clipboardData);
        var {
          selection
        } = editor;

        if (selection) {
          if (Range.isExpanded(selection)) {
            Editor.deleteFragment(editor);
          } else {
            var node = Node.parent(editor, selection.anchor.path);

            if (Editor.isVoid(editor, node)) {
              Transforms.delete(editor);
            }
          }
        }
      }
    }, [readOnly, attributes.onCut]),
    onDragOver: useCallback(event => {
      if (hasTarget(editor, event.target) && !isEventHandled(event, attributes.onDragOver)) {
        // Only when the target is void, call `preventDefault` to signal
        // that drops are allowed. Editable content is droppable by
        // default, and calling `preventDefault` hides the cursor.
        var node = ReactEditor.toSlateNode(editor, event.target);

        if (Editor.isVoid(editor, node)) {
          event.preventDefault();
        }
      }
    }, [attributes.onDragOver]),
    onDragStart: useCallback(event => {
      if (hasTarget(editor, event.target) && !isEventHandled(event, attributes.onDragStart)) {
        var node = ReactEditor.toSlateNode(editor, event.target);
        var path = ReactEditor.findPath(editor, node);
        var voidMatch = Editor.isVoid(editor, node) || Editor.void(editor, {
          at: path,
          voids: true
        }); // If starting a drag on a void node, make sure it is selected
        // so that it shows up in the selection's fragment.

        if (voidMatch) {
          var range = Editor.range(editor, path);
          Transforms.select(editor, range);
        }

        state.isDraggingInternally = true;
        ReactEditor.setFragmentData(editor, event.dataTransfer);
      }
    }, [attributes.onDragStart]),
    onDrop: useCallback(event => {
      if (!readOnly && hasTarget(editor, event.target) && !isEventHandled(event, attributes.onDrop)) {
        event.preventDefault(); // Keep a reference to the dragged range before updating selection

        var draggedRange = editor.selection; // Find the range where the drop happened

        var range = ReactEditor.findEventRange(editor, event);
        var data = event.dataTransfer;
        Transforms.select(editor, range);

        if (state.isDraggingInternally) {
          if (draggedRange) {
            Transforms.delete(editor, {
              at: draggedRange
            });
          }

          state.isDraggingInternally = false;
        }

        ReactEditor.insertData(editor, data); // When dragging from another source into the editor, it's possible
        // that the current editor does not have focus.

        if (!ReactEditor.isFocused(editor)) {
          ReactEditor.focus(editor);
        }
      }
    }, [readOnly, attributes.onDrop]),
    onDragEnd: useCallback(event => {
      // When dropping on a different droppable element than the current editor,
      // `onDrop` is not called. So we need to clean up in `onDragEnd` instead.
      // Note: `onDragEnd` is only called when `onDrop` is not called
      if (!readOnly && state.isDraggingInternally && hasTarget(editor, event.target) && !isEventHandled(event, attributes.onDragEnd)) {
        state.isDraggingInternally = false;
      }
    }, [readOnly, attributes.onDragEnd]),
    onFocus: useCallback(event => {
      if (!readOnly && !state.isUpdatingSelection && hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onFocus)) {
        var el = ReactEditor.toDOMNode(editor, editor);
        var root = ReactEditor.findDocumentOrShadowRoot(editor);
        state.latestElement = root.activeElement; // COMPAT: If the editor has nested editable elements, the focus
        // can go to them. In Firefox, this must be prevented because it
        // results in issues with keyboard navigation. (2017/03/30)

        if (IS_FIREFOX && event.target !== el) {
          el.focus();
          return;
        }

        IS_FOCUSED.set(editor, true);
      }
    }, [readOnly, attributes.onFocus]),
    onKeyDown: useCallback(event => {
      if (!readOnly && !state.isComposing && hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onKeyDown)) {
        var {
          nativeEvent
        } = event;
        var {
          selection
        } = editor;
        var element = editor.children[selection !== null ? selection.focus.path[0] : 0];
        var isRTL = direction_1(Node.string(element)) === 'rtl'; // COMPAT: Since we prevent the default behavior on
        // `beforeinput` events, the browser doesn't think there's ever
        // any history stack to undo or redo, so we have to manage these
        // hotkeys ourselves. (2019/11/06)

        if (Hotkeys.isRedo(nativeEvent)) {
          event.preventDefault();
          var maybeHistoryEditor = editor;

          if (typeof maybeHistoryEditor.redo === 'function') {
            maybeHistoryEditor.redo();
          }

          return;
        }

        if (Hotkeys.isUndo(nativeEvent)) {
          event.preventDefault();
          var _maybeHistoryEditor = editor;

          if (typeof _maybeHistoryEditor.undo === 'function') {
            _maybeHistoryEditor.undo();
          }

          return;
        } // COMPAT: Certain browsers don't handle the selection updates
        // properly. In Chrome, the selection isn't properly extended.
        // And in Firefox, the selection isn't properly collapsed.
        // (2017/10/17)


        if (Hotkeys.isMoveLineBackward(nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, {
            unit: 'line',
            reverse: true
          });
          return;
        }

        if (Hotkeys.isMoveLineForward(nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, {
            unit: 'line'
          });
          return;
        }

        if (Hotkeys.isExtendLineBackward(nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, {
            unit: 'line',
            edge: 'focus',
            reverse: true
          });
          return;
        }

        if (Hotkeys.isExtendLineForward(nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, {
            unit: 'line',
            edge: 'focus'
          });
          return;
        } // COMPAT: If a void node is selected, or a zero-width text node
        // adjacent to an inline is selected, we need to handle these
        // hotkeys manually because browsers won't be able to skip over
        // the void node with the zero-width space not being an empty
        // string.


        if (Hotkeys.isMoveBackward(nativeEvent)) {
          event.preventDefault();

          if (selection && Range.isCollapsed(selection)) {
            Transforms.move(editor, {
              reverse: !isRTL
            });
          } else {
            Transforms.collapse(editor, {
              edge: 'start'
            });
          }

          return;
        }

        if (Hotkeys.isMoveForward(nativeEvent)) {
          event.preventDefault();

          if (selection && Range.isCollapsed(selection)) {
            Transforms.move(editor, {
              reverse: isRTL
            });
          } else {
            Transforms.collapse(editor, {
              edge: 'end'
            });
          }

          return;
        }

        if (Hotkeys.isMoveWordBackward(nativeEvent)) {
          event.preventDefault();

          if (selection && Range.isExpanded(selection)) {
            Transforms.collapse(editor, {
              edge: 'focus'
            });
          }

          Transforms.move(editor, {
            unit: 'word',
            reverse: !isRTL
          });
          return;
        }

        if (Hotkeys.isMoveWordForward(nativeEvent)) {
          event.preventDefault();

          if (selection && Range.isExpanded(selection)) {
            Transforms.collapse(editor, {
              edge: 'focus'
            });
          }

          Transforms.move(editor, {
            unit: 'word',
            reverse: isRTL
          });
          return;
        } // COMPAT: Certain browsers don't support the `beforeinput` event, so we
        // fall back to guessing at the input intention for hotkeys.
        // COMPAT: In iOS, some of these hotkeys are handled in the


        if (!HAS_BEFORE_INPUT_SUPPORT) {
          // We don't have a core behavior for these, but they change the
          // DOM if we don't prevent them, so we have to.
          if (Hotkeys.isBold(nativeEvent) || Hotkeys.isItalic(nativeEvent) || Hotkeys.isTransposeCharacter(nativeEvent)) {
            event.preventDefault();
            return;
          }

          if (Hotkeys.isSplitBlock(nativeEvent)) {
            event.preventDefault();
            Editor.insertBreak(editor);
            return;
          }

          if (Hotkeys.isDeleteBackward(nativeEvent)) {
            event.preventDefault();

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'backward'
              });
            } else {
              Editor.deleteBackward(editor);
            }

            return;
          }

          if (Hotkeys.isDeleteForward(nativeEvent)) {
            event.preventDefault();

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'forward'
              });
            } else {
              Editor.deleteForward(editor);
            }

            return;
          }

          if (Hotkeys.isDeleteLineBackward(nativeEvent)) {
            event.preventDefault();

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'backward'
              });
            } else {
              Editor.deleteBackward(editor, {
                unit: 'line'
              });
            }

            return;
          }

          if (Hotkeys.isDeleteLineForward(nativeEvent)) {
            event.preventDefault();

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'forward'
              });
            } else {
              Editor.deleteForward(editor, {
                unit: 'line'
              });
            }

            return;
          }

          if (Hotkeys.isDeleteWordBackward(nativeEvent)) {
            event.preventDefault();

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'backward'
              });
            } else {
              Editor.deleteBackward(editor, {
                unit: 'word'
              });
            }

            return;
          }

          if (Hotkeys.isDeleteWordForward(nativeEvent)) {
            event.preventDefault();

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor, {
                direction: 'forward'
              });
            } else {
              Editor.deleteForward(editor, {
                unit: 'word'
              });
            }

            return;
          }
        } else {
          if (IS_CHROME || IS_SAFARI) {
            // COMPAT: Chrome and Safari support `beforeinput` event but do not fire
            // an event when deleting backwards in a selected void inline node
            if (selection && (Hotkeys.isDeleteBackward(nativeEvent) || Hotkeys.isDeleteForward(nativeEvent)) && Range.isCollapsed(selection)) {
              var currentNode = Node.parent(editor, selection.anchor.path);

              if (Element$9.isElement(currentNode) && Editor.isVoid(editor, currentNode) && Editor.isInline(editor, currentNode)) {
                event.preventDefault();
                Editor.deleteBackward(editor, {
                  unit: 'block'
                });
                return;
              }
            }
          }
        }
      }
    }, [readOnly, attributes.onKeyDown]),
    onPaste: useCallback(event => {
      if (!readOnly && hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onPaste)) {
        // COMPAT: Certain browsers don't support the `beforeinput` event, so we
        // fall back to React's `onPaste` here instead.
        // COMPAT: Firefox, Chrome and Safari don't emit `beforeinput` events
        // when "paste without formatting" is used, so fallback. (2020/02/20)
        if (!HAS_BEFORE_INPUT_SUPPORT || isPlainTextOnlyPaste(event.nativeEvent)) {
          event.preventDefault();
          ReactEditor.insertData(editor, event.clipboardData);
        }
      }
    }, [readOnly, attributes.onPaste])
  }), /*#__PURE__*/React.createElement(Children, {
    decorations: decorations,
    node: editor,
    renderElement: renderElement,
    renderPlaceholder: renderPlaceholder,
    renderLeaf: renderLeaf,
    selection: editor.selection
  }))));
};
/**
 * The default placeholder element
 */

var DefaultPlaceholder = _ref => {
  var {
    attributes,
    children
  } = _ref;
  return /*#__PURE__*/React.createElement("span", Object.assign({}, attributes), children);
};
/**
 * A default memoized decorate function.
 */

var defaultDecorate = () => [];
/**
 * A default implement to scroll dom range into view.
 */

var defaultScrollSelectionIntoView = (editor, domRange) => {
  var leafEl = domRange.startContainer.parentElement;
  leafEl.getBoundingClientRect = domRange.getBoundingClientRect.bind(domRange);
  scrollIntoView(leafEl, {
    scrollMode: 'if-needed'
  });
  delete leafEl.getBoundingClientRect;
};
/**
 * Check if the target is in the editor.
 */

var hasTarget = (editor, target) => {
  return isDOMNode(target) && ReactEditor.hasDOMNode(editor, target);
};
/**
 * Check if the target is editable and in the editor.
 */

var hasEditableTarget = (editor, target) => {
  return isDOMNode(target) && ReactEditor.hasDOMNode(editor, target, {
    editable: true
  });
};
/**
 * Check if the target is inside void and in the editor.
 */

var isTargetInsideVoid = (editor, target) => {
  var slateNode = hasTarget(editor, target) && ReactEditor.toSlateNode(editor, target);
  return Editor.isVoid(editor, slateNode);
};
/**
 * Check if an event is overrided by a handler.
 */

var isEventHandled = (event, handler) => {
  if (!handler) {
    return false;
  } // The custom event handler may return a boolean to specify whether the event
  // shall be treated as being handled or not.


  var shouldTreatEventAsHandled = handler(event);

  if (shouldTreatEventAsHandled != null) {
    return shouldTreatEventAsHandled;
  }

  return event.isDefaultPrevented() || event.isPropagationStopped();
};
/**
 * Check if a DOM event is overrided by a handler.
 */

var isDOMEventHandled = (event, handler) => {
  if (!handler) {
    return false;
  } // The custom event handler may return a boolean to specify whether the event
  // shall be treated as being handled or not.


  var shouldTreatEventAsHandled = handler(event);

  if (shouldTreatEventAsHandled != null) {
    return shouldTreatEventAsHandled;
  }

  return event.defaultPrevented;
};

/**
 * An auto-incrementing identifier for keys.
 */
var n = 0;
/**
 * A class that keeps track of a key string. We use a full class here because we
 * want to be able to use them as keys in `WeakMap` objects.
 */

class Key {
  constructor() {
    this.id = "".concat(n++);
  }

}

var ReactEditor = {
  /**
   * Return the host window of the current editor.
   */
  getWindow(editor) {
    var window = EDITOR_TO_WINDOW.get(editor);

    if (!window) {
      throw new Error('Unable to find a host window element for this editor');
    }

    return window;
  },

  /**
   * Find a key for a Slate node.
   */
  findKey(editor, node) {
    var key = NODE_TO_KEY.get(node);

    if (!key) {
      key = new Key();
      NODE_TO_KEY.set(node, key);
    }

    return key;
  },

  /**
   * Find the path of Slate node.
   */
  findPath(editor, node) {
    var path = [];
    var child = node;

    while (true) {
      var parent = NODE_TO_PARENT.get(child);

      if (parent == null) {
        if (Editor.isEditor(child)) {
          return path;
        } else {
          break;
        }
      }

      var i = NODE_TO_INDEX.get(child);

      if (i == null) {
        break;
      }

      path.unshift(i);
      child = parent;
    }

    throw new Error("Unable to find the path for Slate node: ".concat(JSON.stringify(node)));
  },

  /**
   * Find the DOM node that implements DocumentOrShadowRoot for the editor.
   */
  findDocumentOrShadowRoot(editor) {
    var el = ReactEditor.toDOMNode(editor, editor);
    var root = el.getRootNode();

    if ((root instanceof Document || root instanceof ShadowRoot) && root.getSelection != null) {
      return root;
    }

    return el.ownerDocument;
  },

  /**
   * Check if the editor is focused.
   */
  isFocused(editor) {
    return !!IS_FOCUSED.get(editor);
  },

  /**
   * Check if the editor is in read-only mode.
   */
  isReadOnly(editor) {
    return !!IS_READ_ONLY.get(editor);
  },

  /**
   * Blur the editor.
   */
  blur(editor) {
    var el = ReactEditor.toDOMNode(editor, editor);
    var root = ReactEditor.findDocumentOrShadowRoot(editor);
    IS_FOCUSED.set(editor, false);

    if (root.activeElement === el) {
      el.blur();
    }
  },

  /**
   * Focus the editor.
   */
  focus(editor) {
    var el = ReactEditor.toDOMNode(editor, editor);
    var root = ReactEditor.findDocumentOrShadowRoot(editor);
    IS_FOCUSED.set(editor, true);

    if (root.activeElement !== el) {
      el.focus({
        preventScroll: true
      });
    }
  },

  /**
   * Deselect the editor.
   */
  deselect(editor) {
    ReactEditor.toDOMNode(editor, editor);
    var {
      selection
    } = editor;
    var root = ReactEditor.findDocumentOrShadowRoot(editor);
    var domSelection = root.getSelection();

    if (domSelection && domSelection.rangeCount > 0) {
      domSelection.removeAllRanges();
    }

    if (selection) {
      Transforms.deselect(editor);
    }
  },

  /**
   * Check if a DOM node is within the editor.
   */
  hasDOMNode(editor, target) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      editable = false
    } = options;
    var editorEl = ReactEditor.toDOMNode(editor, editor);
    var targetEl; // COMPAT: In Firefox, reading `target.nodeType` will throw an error if
    // target is originating from an internal "restricted" element (e.g. a
    // stepper arrow on a number input). (2018/05/04)
    // https://github.com/ianstormtaylor/slate/issues/1819

    try {
      targetEl = isDOMElement(target) ? target : target.parentElement;
    } catch (err) {
      if (!err.message.includes('Permission denied to access property "nodeType"')) {
        throw err;
      }
    }

    if (!targetEl) {
      return false;
    }

    return targetEl.closest("[data-slate-editor]") === editorEl && (!editable || targetEl.isContentEditable || !!targetEl.getAttribute('data-slate-zero-width'));
  },

  /**
   * Insert data from a `DataTransfer` into the editor.
   */
  insertData(editor, data) {
    editor.insertData(data);
  },

  /**
   * Sets data from the currently selected fragment on a `DataTransfer`.
   */
  setFragmentData(editor, data) {
    editor.setFragmentData(data);
  },

  /**
   * Find the native DOM element from a Slate node.
   */
  toDOMNode(editor, node) {
    var KEY_TO_ELEMENT = EDITOR_TO_KEY_TO_ELEMENT.get(editor);
    var domNode = Editor.isEditor(node) ? EDITOR_TO_ELEMENT.get(editor) : KEY_TO_ELEMENT === null || KEY_TO_ELEMENT === void 0 ? void 0 : KEY_TO_ELEMENT.get(ReactEditor.findKey(editor, node));

    if (!domNode) {
      throw new Error("Cannot resolve a DOM node from Slate node: ".concat(JSON.stringify(node)));
    }

    return domNode;
  },

  /**
   * Find a native DOM selection point from a Slate point.
   */
  toDOMPoint(editor, point) {
    var [node] = Editor.node(editor, point.path);
    var el = ReactEditor.toDOMNode(editor, node);
    var domPoint; // If we're inside a void node, force the offset to 0, otherwise the zero
    // width spacing character will result in an incorrect offset of 1

    if (Editor.void(editor, {
      at: point
    })) {
      point = {
        path: point.path,
        offset: 0
      };
    } // For each leaf, we need to isolate its content, which means filtering
    // to its direct text and zero-width spans. (We have to filter out any
    // other siblings that may have been rendered alongside them.)


    var selector = "[data-slate-string], [data-slate-zero-width]";
    var texts = Array.from(el.querySelectorAll(selector));
    var start = 0;

    for (var text of texts) {
      var domNode = text.childNodes[0];

      if (domNode == null || domNode.textContent == null) {
        continue;
      }

      var {
        length
      } = domNode.textContent;
      var attr = text.getAttribute('data-slate-length');
      var trueLength = attr == null ? length : parseInt(attr, 10);
      var end = start + trueLength;

      if (point.offset <= end) {
        var offset = Math.min(length, Math.max(0, point.offset - start));
        domPoint = [domNode, offset];
        break;
      }

      start = end;
    }

    if (!domPoint) {
      throw new Error("Cannot resolve a DOM point from Slate point: ".concat(JSON.stringify(point)));
    }

    return domPoint;
  },

  /**
   * Find a native DOM range from a Slate `range`.
   *
   * Notice: the returned range will always be ordinal regardless of the direction of Slate `range` due to DOM API limit.
   *
   * there is no way to create a reverse DOM Range using Range.setStart/setEnd
   * according to https://dom.spec.whatwg.org/#concept-range-bp-set.
   */
  toDOMRange(editor, range) {
    var {
      anchor,
      focus
    } = range;
    var isBackward = Range.isBackward(range);
    var domAnchor = ReactEditor.toDOMPoint(editor, anchor);
    var domFocus = Range.isCollapsed(range) ? domAnchor : ReactEditor.toDOMPoint(editor, focus);
    var window = ReactEditor.getWindow(editor);
    var domRange = window.document.createRange();
    var [startNode, startOffset] = isBackward ? domFocus : domAnchor;
    var [endNode, endOffset] = isBackward ? domAnchor : domFocus; // A slate Point at zero-width Leaf always has an offset of 0 but a native DOM selection at
    // zero-width node has an offset of 1 so we have to check if we are in a zero-width node and
    // adjust the offset accordingly.

    var startEl = isDOMElement(startNode) ? startNode : startNode.parentElement;
    var isStartAtZeroWidth = !!startEl.getAttribute('data-slate-zero-width');
    var endEl = isDOMElement(endNode) ? endNode : endNode.parentElement;
    var isEndAtZeroWidth = !!endEl.getAttribute('data-slate-zero-width');
    domRange.setStart(startNode, isStartAtZeroWidth ? 1 : startOffset);
    domRange.setEnd(endNode, isEndAtZeroWidth ? 1 : endOffset);
    return domRange;
  },

  /**
   * Find a Slate node from a native DOM `element`.
   */
  toSlateNode(editor, domNode) {
    var domEl = isDOMElement(domNode) ? domNode : domNode.parentElement;

    if (domEl && !domEl.hasAttribute('data-slate-node')) {
      domEl = domEl.closest("[data-slate-node]");
    }

    var node = domEl ? ELEMENT_TO_NODE.get(domEl) : null;

    if (!node) {
      throw new Error("Cannot resolve a Slate node from DOM node: ".concat(domEl));
    }

    return node;
  },

  /**
   * Get the target range from a DOM `event`.
   */
  findEventRange(editor, event) {
    if ('nativeEvent' in event) {
      event = event.nativeEvent;
    }

    var {
      clientX: x,
      clientY: y,
      target
    } = event;

    if (x == null || y == null) {
      throw new Error("Cannot resolve a Slate range from a DOM event: ".concat(event));
    }

    var node = ReactEditor.toSlateNode(editor, event.target);
    var path = ReactEditor.findPath(editor, node); // If the drop target is inside a void node, move it into either the
    // next or previous node, depending on which side the `x` and `y`
    // coordinates are closest to.

    if (Editor.isVoid(editor, node)) {
      var rect = target.getBoundingClientRect();
      var isPrev = editor.isInline(node) ? x - rect.left < rect.left + rect.width - x : y - rect.top < rect.top + rect.height - y;
      var edge = Editor.point(editor, path, {
        edge: isPrev ? 'start' : 'end'
      });
      var point = isPrev ? Editor.before(editor, edge) : Editor.after(editor, edge);

      if (point) {
        var _range = Editor.range(editor, point);

        return _range;
      }
    } // Else resolve a range from the caret position where the drop occured.


    var domRange;
    var {
      document
    } = window; // COMPAT: In Firefox, `caretRangeFromPoint` doesn't exist. (2016/07/25)

    if (document.caretRangeFromPoint) {
      domRange = document.caretRangeFromPoint(x, y);
    } else {
      var position = document.caretPositionFromPoint(x, y);

      if (position) {
        domRange = document.createRange();
        domRange.setStart(position.offsetNode, position.offset);
        domRange.setEnd(position.offsetNode, position.offset);
      }
    }

    if (!domRange) {
      throw new Error("Cannot resolve a Slate range from a DOM event: ".concat(event));
    } // Resolve a Slate range from the DOM range.


    var range = ReactEditor.toSlateRange(editor, domRange, {
      exactMatch: false
    });
    return range;
  },

  /**
   * Find a Slate point from a DOM selection's `domNode` and `domOffset`.
   */
  toSlatePoint(editor, domPoint, exactMatch) {
    var [nearestNode, nearestOffset] = exactMatch ? domPoint : normalizeDOMPoint(domPoint);
    var parentNode = nearestNode.parentNode;
    var textNode = null;
    var offset = 0;

    if (parentNode) {
      var _domNode$textContent;

      var voidNode = parentNode.closest('[data-slate-void="true"]');
      var leafNode = parentNode.closest('[data-slate-leaf]');
      var domNode = null; // Calculate how far into the text node the `nearestNode` is, so that we
      // can determine what the offset relative to the text node is.

      if (leafNode) {
        textNode = leafNode.closest('[data-slate-node="text"]');

        var _window = ReactEditor.getWindow(editor);

        var range = _window.document.createRange();

        range.setStart(textNode, 0);
        range.setEnd(nearestNode, nearestOffset);
        var contents = range.cloneContents();
        var removals = [...Array.prototype.slice.call(contents.querySelectorAll('[data-slate-zero-width]')), ...Array.prototype.slice.call(contents.querySelectorAll('[contenteditable=false]'))];
        removals.forEach(el => {
          el.parentNode.removeChild(el);
        }); // COMPAT: Edge has a bug where Range.prototype.toString() will
        // convert \n into \r\n. The bug causes a loop when slate-react
        // attempts to reposition its cursor to match the native position. Use
        // textContent.length instead.
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10291116/

        offset = contents.textContent.length;
        domNode = textNode;
      } else if (voidNode) {
        // For void nodes, the element with the offset key will be a cousin, not an
        // ancestor, so find it by going down from the nearest void parent.
        leafNode = voidNode.querySelector('[data-slate-leaf]'); // COMPAT: In read-only editors the leaf is not rendered.

        if (!leafNode) {
          offset = 1;
        } else {
          textNode = leafNode.closest('[data-slate-node="text"]');
          domNode = leafNode;
          offset = domNode.textContent.length;
          domNode.querySelectorAll('[data-slate-zero-width]').forEach(el => {
            offset -= el.textContent.length;
          });
        }
      }

      if (domNode && offset === domNode.textContent.length && (parentNode.hasAttribute('data-slate-zero-width') || IS_FIREFOX && (_domNode$textContent = domNode.textContent) !== null && _domNode$textContent !== void 0 && _domNode$textContent.endsWith('\n\n'))) {
        offset--;
      }
    }

    if (!textNode) {
      if (exactMatch) {
        return null;
      }

      throw new Error("Cannot resolve a Slate point from DOM point: ".concat(domPoint));
    } // COMPAT: If someone is clicking from one Slate editor into another,
    // the select event fires twice, once for the old editor's `element`
    // first, and then afterwards for the correct `element`. (2017/03/03)


    var slateNode = ReactEditor.toSlateNode(editor, textNode);
    var path = ReactEditor.findPath(editor, slateNode);
    return {
      path,
      offset
    };
  },

  /**
   * Find a Slate range from a DOM range or selection.
   */
  toSlateRange(editor, domRange, options) {
    var {
      exactMatch
    } = options;
    var el = isDOMSelection(domRange) ? domRange.anchorNode : domRange.startContainer;
    var anchorNode;
    var anchorOffset;
    var focusNode;
    var focusOffset;
    var isCollapsed;

    if (el) {
      if (isDOMSelection(domRange)) {
        anchorNode = domRange.anchorNode;
        anchorOffset = domRange.anchorOffset;
        focusNode = domRange.focusNode;
        focusOffset = domRange.focusOffset; // COMPAT: There's a bug in chrome that always returns `true` for
        // `isCollapsed` for a Selection that comes from a ShadowRoot.
        // (2020/08/08)
        // https://bugs.chromium.org/p/chromium/issues/detail?id=447523

        if (IS_CHROME && hasShadowRoot()) {
          isCollapsed = domRange.anchorNode === domRange.focusNode && domRange.anchorOffset === domRange.focusOffset;
        } else {
          isCollapsed = domRange.isCollapsed;
        }
      } else {
        anchorNode = domRange.startContainer;
        anchorOffset = domRange.startOffset;
        focusNode = domRange.endContainer;
        focusOffset = domRange.endOffset;
        isCollapsed = domRange.collapsed;
      }
    }

    if (anchorNode == null || focusNode == null || anchorOffset == null || focusOffset == null) {
      throw new Error("Cannot resolve a Slate range from DOM range: ".concat(domRange));
    }

    var anchor = ReactEditor.toSlatePoint(editor, [anchorNode, anchorOffset], exactMatch);

    if (!anchor) {
      return null;
    }

    var focus = isCollapsed ? anchor : ReactEditor.toSlatePoint(editor, [focusNode, focusOffset], exactMatch);

    if (!focus) {
      return null;
    }

    var range = {
      anchor: anchor,
      focus: focus
    }; // if the selection is a hanging range that ends in a void
    // and the DOM focus is an Element
    // (meaning that the selection ends before the element)
    // unhang the range to avoid mistakenly including the void

    if (Range.isExpanded(range) && Range.isForward(range) && isDOMElement(focusNode) && Editor.void(editor, {
      at: range.focus,
      mode: 'highest'
    })) {
      range = Editor.unhangRange(editor, range, {
        voids: true
      });
    }

    return range;
  },

  hasRange(editor, range) {
    var {
      anchor,
      focus
    } = range;
    return Editor.hasPath(editor, anchor.path) && Editor.hasPath(editor, focus.path);
  }

};

/**
 * Returns the number of characters that are the same at the beginning of the
 * String.
 *
 * @param prev  the previous text
 * @param next  the next text
 * @returns the offset of the start of the difference; null if there is no difference
 */

function getDiffStart(prev, next) {
  var length = Math.min(prev.length, next.length);

  for (var i = 0; i < length; i++) {
    if (prev.charAt(i) !== next.charAt(i)) return i;
  }

  if (prev.length !== next.length) return length;
  return null;
}
/**
 * Returns the number of characters that are the same at the end of the String
 * up to `max`. Max prevents double-counting characters when there are
 * multiple duplicate characters around the diff area.
 *
 * @param prev  the previous text
 * @param next  the next text
 * @param max  the max length to test.
 * @returns number of characters that are the same at the end of the string
 */


function getDiffEnd(prev, next, max) {
  var prevLength = prev.length;
  var nextLength = next.length;
  var length = Math.min(prevLength, nextLength, max);

  for (var i = 0; i < length; i++) {
    var prevChar = prev.charAt(prevLength - i - 1);
    var nextChar = next.charAt(nextLength - i - 1);
    if (prevChar !== nextChar) return i;
  }

  if (prev.length !== next.length) return length;
  return null;
}
/**
 * Takes two strings and returns an object representing two offsets. The
 * first, `start` represents the number of characters that are the same at
 * the front of the String. The `end` represents the number of characters
 * that are the same at the end of the String.
 *
 * Returns null if they are identical.
 *
 * @param prev  the previous text
 * @param next  the next text
 * @returns the difference text range; null if there are no differences.
 */


function getDiffOffsets(prev, next) {
  if (prev === next) return null;
  var start = getDiffStart(prev, next);
  if (start === null) return null;
  var maxEnd = Math.min(prev.length - start, next.length - start);
  var end = getDiffEnd(prev, next, maxEnd);
  if (end === null) return null;
  return {
    start,
    end
  };
}
/**
 * Takes a text string and returns a slice from the string at the given text range
 *
 * @param text  the text
 * @param offsets  the text range
 * @returns the text slice at text range
 */


function sliceText(text, offsets) {
  return text.slice(offsets.start, text.length - offsets.end);
}
/**
 * Takes two strings and returns a smart diff that can be used to describe the
 * change in a way that can be used as operations like inserting, removing or
 * replacing text.
 *
 * @param prev the previous text
 * @param next the next text
 * @returns the text difference
 */


function diffText(prev, next) {
  if (prev === undefined || next === undefined) return null;
  var offsets = getDiffOffsets(prev, next);
  if (offsets == null) return null;
  var insertText = sliceText(next, offsets);
  var removeText = sliceText(prev, offsets);
  return {
    start: offsets.start,
    end: prev.length - offsets.end,
    insertText,
    removeText
  };
}
function combineInsertedText(insertedText) {
  return insertedText.reduce((acc, _ref) => {
    var {
      text
    } = _ref;
    return "".concat(acc).concat(text.insertText);
  }, '');
}
function getTextInsertion(editor, domNode) {
  var node = ReactEditor.toSlateNode(editor, domNode);

  if (!Text$1.isText(node)) {
    return undefined;
  }

  var prevText = node.text;
  var nextText = domNode.textContent; // textContent will pad an extra \n when the textContent ends with an \n

  if (nextText.endsWith('\n')) {
    nextText = nextText.slice(0, nextText.length - 1);
  } // If the text is no different, there is no diff.


  if (nextText !== prevText) {
    var textDiff = diffText(prevText, nextText);

    if (textDiff !== null) {
      var textPath = ReactEditor.findPath(editor, node);
      return {
        text: textDiff,
        path: textPath
      };
    }
  }

  return undefined;
}
function normalizeTextInsertionRange(editor, range, _ref2) {
  var {
    path,
    text
  } = _ref2;
  var insertionRange = {
    anchor: {
      path,
      offset: text.start
    },
    focus: {
      path,
      offset: text.end
    }
  };

  if (!range || !Range.isCollapsed(range)) {
    return insertionRange;
  }

  var {
    insertText,
    removeText
  } = text;
  var isSingleCharacterInsertion = insertText.length === 1 || removeText.length === 1;
  /**
   * This code handles edge cases that arise from text diffing when the
   * inserted or removed character is a single character, and the character
   * right before or after the anchor is the same as the one being inserted or
   * removed.
   *
   * Take this example: hello|o
   *
   * If another `o` is inserted at the selection's anchor in the example above,
   * it should be inserted at the anchor, but using text diffing, we actually
   * detect that the character was inserted after the second `o`:
   *
   * helloo[o]|
   *
   * Instead, in these very specific edge cases, we assume that the character
   * needs to be inserted after the anchor rather than where the diff was found:
   *
   * hello[o]|o
   */

  if (isSingleCharacterInsertion && Path.equals(range.anchor.path, path)) {
    var [_text] = Array.from(Editor.nodes(editor, {
      at: range,
      match: Text$1.isText
    }));

    if (_text) {
      var [node] = _text;
      var {
        anchor
      } = range;
      var characterBeforeAnchor = node.text[anchor.offset - 1];
      var characterAfterAnchor = node.text[anchor.offset];

      if (insertText.length === 1 && insertText === characterAfterAnchor) {
        // Assume text should be inserted at the anchor
        return range;
      }

      if (removeText.length === 1 && removeText === characterBeforeAnchor) {
        // Assume text should be removed right before the anchor
        return {
          anchor: {
            path,
            offset: anchor.offset - 1
          },
          focus: {
            path,
            offset: anchor.offset
          }
        };
      }
    }
  }

  return insertionRange;
}

function gatherMutationData(editor, mutations) {
  var addedNodes = [];
  var removedNodes = [];
  var insertedText = [];
  var characterDataMutations = [];
  mutations.forEach(mutation => {
    switch (mutation.type) {
      case 'childList':
        {
          if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(addedNode => {
              addedNodes.push(addedNode);
            });
          }

          mutation.removedNodes.forEach(removedNode => {
            removedNodes.push(removedNode);
          });
          break;
        }

      case 'characterData':
        {
          characterDataMutations.push(mutation); // Changes to text nodes should consider the parent element

          var {
            parentNode
          } = mutation.target;

          if (!parentNode) {
            return;
          }

          var textInsertion = getTextInsertion(editor, parentNode);

          if (!textInsertion) {
            return;
          } // If we've already detected a diff at that path, we can return early


          if (insertedText.some(_ref => {
            var {
              path
            } = _ref;
            return Path.equals(path, textInsertion.path);
          })) {
            return;
          } // Add the text diff to the array of detected text insertions that need to be reconciled


          insertedText.push(textInsertion);
        }
    }
  });
  return {
    addedNodes,
    removedNodes,
    insertedText,
    characterDataMutations
  };
}
/**
 * In general, when a line break occurs, there will be more `addedNodes` than `removedNodes`.
 *
 * This isn't always the case however. In some cases, there will be more `removedNodes` than
 * `addedNodes`.
 *
 * To account for these edge cases, the most reliable strategy to detect line break mutations
 * is to check whether a new block was inserted of the same type as the current block.
 */

var isLineBreak = (editor, _ref2) => {
  var {
    addedNodes
  } = _ref2;
  var {
    selection
  } = editor;
  var parentNode = selection ? Node.parent(editor, selection.anchor.path) : null;
  var parentDOMNode = parentNode ? ReactEditor.toDOMNode(editor, parentNode) : null;

  if (!parentDOMNode) {
    return false;
  }

  return addedNodes.some(addedNode => addedNode instanceof HTMLElement && addedNode.tagName === (parentDOMNode === null || parentDOMNode === void 0 ? void 0 : parentDOMNode.tagName));
};
/**
 * So long as we check for line break mutations before deletion mutations,
 * we can safely assume that a set of mutations was a deletion if there are
 * removed nodes.
 */

var isDeletion = (_, _ref3) => {
  var {
    removedNodes
  } = _ref3;
  return removedNodes.length > 0;
};
/**
 * If the selection was expanded and there are removed nodes,
 * the contents of the selection need to be replaced with the diff
 */

var isReplaceExpandedSelection = (_ref4, _ref5) => {
  var {
    selection
  } = _ref4;
  var {
    removedNodes
  } = _ref5;
  return selection ? Range.isExpanded(selection) && removedNodes.length > 0 : false;
};
/**
 * Plain text insertion
 */

var isTextInsertion = (_, _ref6) => {
  var {
    insertedText
  } = _ref6;
  return insertedText.length > 0;
};
/**
 * Edge case. Detect mutations that remove leaf nodes and also update character data
 */

var isRemoveLeafNodes = (_, _ref7) => {
  var {
    addedNodes,
    characterDataMutations,
    removedNodes
  } = _ref7;
  return removedNodes.length > 0 && addedNodes.length === 0 && characterDataMutations.length > 0;
};

function restoreDOM(editor) {
  try {
    var onRestoreDOM = EDITOR_TO_RESTORE_DOM.get(editor);

    if (onRestoreDOM) {
      onRestoreDOM();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Based loosely on:
 *
 * https://github.com/facebook/draft-js/blob/master/src/component/handlers/composition/DOMObserver.js
 * https://github.com/ProseMirror/prosemirror-view/blob/master/src/domobserver.js
 *
 * The input manager attempts to map observed mutations on the document to a
 * set of operations in order to reconcile Slate's internal value with the DOM.
 *
 * Mutations are processed synchronously as they come in. Only mutations that occur
 * during a user input loop are processed, as other mutations can occur within the
 * document that were not initiated by user input.
 *
 * The mutation reconciliation process attempts to match mutations to the following
 * patterns:
 *
 * - Text updates
 * - Deletions
 * - Line breaks
 *
 * @param editor
 */


class AndroidInputManager {
  constructor(editor) {
    this.editor = editor;
    /**
     * Handle MutationObserver flush
     *
     * @param mutations
     */

    this.flush = mutations => {

      try {
        this.reconcileMutations(mutations);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err); // Failed to reconcile mutations, restore DOM to its previous state

        restoreDOM(this.editor);
      }
    };
    /**
     * Reconcile a batch of mutations
     *
     * @param mutations
     */


    this.reconcileMutations = mutations => {
      var mutationData = gatherMutationData(this.editor, mutations);
      var {
        insertedText,
        removedNodes
      } = mutationData;

      if (isReplaceExpandedSelection(this.editor, mutationData)) {
        var text = combineInsertedText(insertedText);
        this.replaceExpandedSelection(text);
      } else if (isLineBreak(this.editor, mutationData)) {
        this.insertBreak();
      } else if (isRemoveLeafNodes(this.editor, mutationData)) {
        this.removeLeafNodes(removedNodes);
      } else if (isDeletion(this.editor, mutationData)) {
        this.deleteBackward();
      } else if (isTextInsertion(this.editor, mutationData)) {
        this.insertText(insertedText);
      }
    };
    /**
     * Apply text diff
     */


    this.insertText = insertedText => {
      var {
        selection,
        marks
      } = this.editor; // Insert the batched text diffs

      insertedText.forEach(insertion => {
        var text = insertion.text.insertText;
        var at = normalizeTextInsertionRange(this.editor, selection, insertion);

        if (marks) {
          var node = _objectSpread$1({
            text
          }, marks);

          Transforms.insertNodes(this.editor, node, {
            match: Text$1.isText,
            at,
            select: true
          });
          this.editor.marks = null;
        } else {
          Transforms.insertText(this.editor, text, {
            at
          });
        }
      });
    };
    /**
     * Handle line breaks
     */


    this.insertBreak = () => {
      var {
        selection
      } = this.editor;
      Editor.insertBreak(this.editor); // To-do: Need a more granular solution to restoring only a specific portion
      // of the document. Restoring the entire document is expensive.

      restoreDOM(this.editor);

      if (selection) {
        // Compat: Move selection to the newly inserted block if it has not moved
        setTimeout(() => {
          if (this.editor.selection && Range.equals(selection, this.editor.selection)) {
            Transforms.move(this.editor);
          }
        }, 100);
      }
    };
    /**
     * Handle expanded selection being deleted or replaced by text
     */


    this.replaceExpandedSelection = text => {

      Editor.deleteFragment(this.editor);

      if (text.length) {
        // Selection was replaced by text, insert the entire text diff
        Editor.insertText(this.editor, text);
      }

      restoreDOM(this.editor);
    };
    /**
     * Handle `backspace` that merges blocks
     */


    this.deleteBackward = () => {
      Editor.deleteBackward(this.editor);
      ReactEditor.focus(this.editor);
      restoreDOM(this.editor);
    };
    /**
     * Handle mutations that remove specific leaves
     */


    this.removeLeafNodes = nodes => {
      for (var node of nodes) {
        var slateNode = ReactEditor.toSlateNode(this.editor, node);

        if (slateNode) {
          var path = ReactEditor.findPath(this.editor, slateNode);
          Transforms.delete(this.editor, {
            at: path
          });
          restoreDOM(this.editor);
        }
      }
    };

    this.editor = editor;
  }

}

function useMutationObserver(node, callback, options) {
  var [mutationObserver] = useState(() => new MutationObserver(callback));
  useIsomorphicLayoutEffect(() => {
    // Disconnect mutation observer during render phase
    mutationObserver.disconnect();
  });
  useEffect(() => {
    if (!node.current) {
      throw new Error('Failed to attach MutationObserver, `node` is undefined');
    } // Attach mutation observer after render phase has finished


    mutationObserver.observe(node.current, options); // Clean up after effect

    return mutationObserver.disconnect.bind(mutationObserver);
  });
}

function useTrackUserInput() {
  var editor = useSlateStatic();
  var receivedUserInput = useRef(false);
  var animationFrameRef = useRef(null);
  var onUserInput = useCallback(() => {
    if (receivedUserInput.current === false) {
      var window = ReactEditor.getWindow(editor);
      receivedUserInput.current = true;

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = window.requestAnimationFrame(() => {
        receivedUserInput.current = false;
        animationFrameRef.current = null;
      });
    }
  }, []);
  useEffect(() => {
    // Reset user input tracking on every render
    if (receivedUserInput.current) {
      receivedUserInput.current = false;
    }
  });
  return {
    receivedUserInput,
    onUserInput
  };
}

var MUTATION_OBSERVER_CONFIG = {
  childList: true,
  characterData: true,
  characterDataOldValue: true,
  subtree: true
};
function useAndroidInputManager(node) {
  var editor = useSlateStatic();
  var [inputManager] = useState(() => new AndroidInputManager(editor));
  var {
    receivedUserInput,
    onUserInput
  } = useTrackUserInput();
  var timeoutId = useRef(null);
  var isReconciling = useRef(false);
  var flush = useCallback(mutations => {
    if (!receivedUserInput.current) {
      return;
    }

    isReconciling.current = true;
    inputManager.flush(mutations);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      isReconciling.current = false;
      timeoutId.current = null;
    }, 250);
  }, []);
  useMutationObserver(node, flush, MUTATION_OBSERVER_CONFIG);
  return {
    isReconciling,
    onUserInput
  };
}

var _excluded$1 = ["autoFocus", "decorate", "onDOMBeforeInput", "placeholder", "readOnly", "renderElement", "renderLeaf", "renderPlaceholder", "style", "as"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Editable.
 */

var AndroidEditable = props => {
  var {
    autoFocus,
    decorate = defaultDecorate,
    onDOMBeforeInput: propsOnDOMBeforeInput,
    placeholder,
    readOnly = false,
    renderElement,
    renderLeaf,
    renderPlaceholder = props => /*#__PURE__*/React.createElement(DefaultPlaceholder, Object.assign({}, props)),
    style = {},
    as: Component = 'div'
  } = props,
      attributes = _objectWithoutProperties(props, _excluded$1);

  var editor = useSlate();
  var ref = useRef(null);
  var inputManager = useAndroidInputManager(ref); // Update internal state on each render.

  IS_READ_ONLY.set(editor, readOnly); // Keep track of some state for the event handler logic.

  var state = useMemo(() => ({
    isUpdatingSelection: false,
    latestElement: null
  }), []);
  var [contentKey, setContentKey] = useState(0);
  var onRestoreDOM = useCallback(() => {
    setContentKey(prev => prev + 1);
  }, [contentKey]); // Whenever the editor updates...

  useIsomorphicLayoutEffect(() => {
    // Update element-related weak maps with the DOM element ref.
    var window;

    if (ref.current && (window = getDefaultView(ref.current))) {
      EDITOR_TO_WINDOW.set(editor, window);
      EDITOR_TO_ELEMENT.set(editor, ref.current);
      NODE_TO_ELEMENT.set(editor, ref.current);
      ELEMENT_TO_NODE.set(ref.current, editor);
      EDITOR_TO_RESTORE_DOM.set(editor, onRestoreDOM);
    } else {
      NODE_TO_ELEMENT.delete(editor);
      EDITOR_TO_RESTORE_DOM.delete(editor);
    }

    try {
      // Make sure the DOM selection state is in sync.
      var {
        selection
      } = editor;
      var root = ReactEditor.findDocumentOrShadowRoot(editor);
      var domSelection = root.getSelection();

      if (!domSelection || !ReactEditor.isFocused(editor)) {
        return;
      }

      var hasDomSelection = domSelection.type !== 'None'; // If the DOM selection is properly unset, we're done.

      if (!selection && !hasDomSelection) {
        return;
      } // verify that the dom selection is in the editor


      var editorElement = EDITOR_TO_ELEMENT.get(editor);
      var hasDomSelectionInEditor = false;

      if (editorElement.contains(domSelection.anchorNode) && editorElement.contains(domSelection.focusNode)) {
        hasDomSelectionInEditor = true;
      } // If the DOM selection is in the editor and the editor selection is already correct, we're done.


      if (hasDomSelection && hasDomSelectionInEditor && selection) {
        var slateRange = ReactEditor.toSlateRange(editor, domSelection, {
          exactMatch: true
        });

        if (slateRange && Range.equals(slateRange, selection)) {
          return;
        }
      } // when <Editable/> is being controlled through external value
      // then its children might just change - DOM responds to it on its own
      // but Slate's value is not being updated through any operation
      // and thus it doesn't transform selection on its own


      if (selection && !ReactEditor.hasRange(editor, selection)) {
        editor.selection = ReactEditor.toSlateRange(editor, domSelection, {
          exactMatch: false
        });
        return;
      } // Otherwise the DOM selection is out of sync, so update it.


      var el = ReactEditor.toDOMNode(editor, editor);
      state.isUpdatingSelection = true;
      var newDomRange = selection && ReactEditor.toDOMRange(editor, selection);

      if (newDomRange) {
        if (Range.isBackward(selection)) {
          domSelection.setBaseAndExtent(newDomRange.endContainer, newDomRange.endOffset, newDomRange.startContainer, newDomRange.startOffset);
        } else {
          domSelection.setBaseAndExtent(newDomRange.startContainer, newDomRange.startOffset, newDomRange.endContainer, newDomRange.endOffset);
        }

        var leafEl = newDomRange.startContainer.parentElement;
        leafEl.getBoundingClientRect = newDomRange.getBoundingClientRect.bind(newDomRange);
        scrollIntoView(leafEl, {
          scrollMode: 'if-needed',
          boundary: el
        }); // @ts-ignore

        delete leafEl.getBoundingClientRect;
      } else {
        domSelection.removeAllRanges();
      }

      setTimeout(() => {
        state.isUpdatingSelection = false;
      });
    } catch (_unused) {
      // Failed to update selection, likely due to reconciliation error
      state.isUpdatingSelection = false;
    }
  }); // The autoFocus TextareaHTMLAttribute doesn't do anything on a div, so it
  // needs to be manually focused.

  useEffect(() => {
    if (ref.current && autoFocus) {
      ref.current.focus();
    }
  }, [autoFocus]); // Listen on the native `beforeinput` event to get real "Level 2" events. This
  // is required because React's `beforeinput` is fake and never really attaches
  // to the real event sadly. (2019/11/01)
  // https://github.com/facebook/react/issues/11211

  var onDOMBeforeInput = useCallback(event => {
    if (!readOnly && hasEditableTarget(editor, event.target) && !isDOMEventHandled(event, propsOnDOMBeforeInput)) {
      inputManager.onUserInput();
    }
  }, [readOnly, propsOnDOMBeforeInput]); // Attach a native DOM event handler for `beforeinput` events, because React's
  // built-in `onBeforeInput` is actually a leaky polyfill that doesn't expose
  // real `beforeinput` events sadly... (2019/11/04)

  useIsomorphicLayoutEffect(() => {
    var node = ref.current; // @ts-ignore The `beforeinput` event isn't recognized.

    node === null || node === void 0 ? void 0 : node.addEventListener('beforeinput', onDOMBeforeInput); // @ts-ignore The `beforeinput` event isn't recognized.

    return () => node === null || node === void 0 ? void 0 : node.removeEventListener('beforeinput', onDOMBeforeInput);
  }, [contentKey, propsOnDOMBeforeInput]); // Listen on the native `selectionchange` event to be able to update any time
  // the selection changes. This is required because React's `onSelect` is leaky
  // and non-standard so it doesn't fire until after a selection has been
  // released. This causes issues in situations where another change happens
  // while a selection is being dragged.

  var onDOMSelectionChange = useCallback(throttle(() => {
    try {
      if (!readOnly && !state.isUpdatingSelection && !inputManager.isReconciling.current) {
        var root = ReactEditor.findDocumentOrShadowRoot(editor);
        var {
          activeElement
        } = root;
        var el = ReactEditor.toDOMNode(editor, editor);
        var domSelection = root.getSelection();

        if (activeElement === el) {
          state.latestElement = activeElement;
          IS_FOCUSED.set(editor, true);
        } else {
          IS_FOCUSED.delete(editor);
        }

        if (!domSelection) {
          return Transforms.deselect(editor);
        }

        var {
          anchorNode,
          focusNode
        } = domSelection;
        var anchorNodeSelectable = hasEditableTarget(editor, anchorNode) || isTargetInsideVoid(editor, anchorNode);
        var focusNodeSelectable = hasEditableTarget(editor, focusNode) || isTargetInsideVoid(editor, focusNode);

        if (anchorNodeSelectable && focusNodeSelectable) {
          var range = ReactEditor.toSlateRange(editor, domSelection, {
            exactMatch: false
          });
          Transforms.select(editor, range);
        } else {
          Transforms.deselect(editor);
        }
      }
    } catch (_unused2) {// Failed to update selection, likely due to reconciliation error
    }
  }, 100), [readOnly]); // Attach a native DOM event handler for `selectionchange`, because React's
  // built-in `onSelect` handler doesn't fire for all selection changes. It's a
  // leaky polyfill that only fires on keypresses or clicks. Instead, we want to
  // fire for any change to the selection inside the editor. (2019/11/04)
  // https://github.com/facebook/react/issues/5785

  useIsomorphicLayoutEffect(() => {
    var window = ReactEditor.getWindow(editor);
    window.document.addEventListener('selectionchange', onDOMSelectionChange);
    return () => {
      window.document.removeEventListener('selectionchange', onDOMSelectionChange);
    };
  });
  var decorations = decorate([editor, []]);

  if (placeholder && editor.children.length === 1 && Array.from(Node.texts(editor)).length === 1 && Node.string(editor) === '') {
    var start = Editor.start(editor, []);
    decorations.push({
      [PLACEHOLDER_SYMBOL]: true,
      placeholder,
      anchor: start,
      focus: start
    });
  }

  return /*#__PURE__*/React.createElement(ReadOnlyContext.Provider, {
    value: readOnly
  }, /*#__PURE__*/React.createElement(DecorateContext.Provider, {
    value: decorate
  }, /*#__PURE__*/React.createElement(Component, Object.assign({
    key: contentKey,
    role: readOnly ? undefined : 'textbox'
  }, attributes, {
    spellCheck: attributes.spellCheck,
    autoCorrect: attributes.autoCorrect,
    autoCapitalize: attributes.autoCapitalize,
    "data-slate-editor": true,
    "data-slate-node": "value",
    contentEditable: readOnly ? undefined : true,
    suppressContentEditableWarning: true,
    ref: ref,
    style: _objectSpread({
      // Allow positioning relative to the editable element.
      position: 'relative',
      // Prevent the default outline styles.
      outline: 'none',
      // Preserve adjacent whitespace and new lines.
      whiteSpace: 'pre-wrap',
      // Allow words to break if they are too long.
      wordWrap: 'break-word'
    }, style),
    onCopy: useCallback(event => {
      if (hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onCopy)) {
        event.preventDefault();
        ReactEditor.setFragmentData(editor, event.clipboardData);
      }
    }, [attributes.onCopy]),
    onCut: useCallback(event => {
      if (!readOnly && hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onCut)) {
        event.preventDefault();
        ReactEditor.setFragmentData(editor, event.clipboardData);
        var {
          selection
        } = editor;

        if (selection) {
          if (Range.isExpanded(selection)) {
            Editor.deleteFragment(editor);
          } else {
            var node = Node.parent(editor, selection.anchor.path);

            if (Editor.isVoid(editor, node)) {
              Transforms.delete(editor);
            }
          }
        }
      }
    }, [readOnly, attributes.onCut]),
    onFocus: useCallback(event => {
      if (!readOnly && !state.isUpdatingSelection && hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onFocus)) {
        var root = ReactEditor.findDocumentOrShadowRoot(editor);
        state.latestElement = root.activeElement;
        IS_FOCUSED.set(editor, true);
      }
    }, [readOnly, attributes.onFocus]),
    onBlur: useCallback(event => {
      if (readOnly || state.isUpdatingSelection || !hasEditableTarget(editor, event.target) || isEventHandled(event, attributes.onBlur)) {
        return;
      } // COMPAT: If the current `activeElement` is still the previous
      // one, this is due to the window being blurred when the tab
      // itself becomes unfocused, so we want to abort early to allow to
      // editor to stay focused when the tab becomes focused again.


      var root = ReactEditor.findDocumentOrShadowRoot(editor);

      if (state.latestElement === root.activeElement) {
        return;
      }

      var {
        relatedTarget
      } = event;
      var el = ReactEditor.toDOMNode(editor, editor); // COMPAT: The event should be ignored if the focus is returning
      // to the editor from an embedded editable element (eg. an <input>
      // element inside a void node).

      if (relatedTarget === el) {
        return;
      } // COMPAT: The event should be ignored if the focus is moving from
      // the editor to inside a void node's spacer element.


      if (isDOMElement(relatedTarget) && relatedTarget.hasAttribute('data-slate-spacer')) {
        return;
      } // COMPAT: The event should be ignored if the focus is moving to a
      // non- editable section of an element that isn't a void node (eg.
      // a list item of the check list example).


      if (relatedTarget != null && isDOMNode(relatedTarget) && ReactEditor.hasDOMNode(editor, relatedTarget)) {
        var node = ReactEditor.toSlateNode(editor, relatedTarget);

        if (Element$9.isElement(node) && !editor.isVoid(node)) {
          return;
        }
      }

      IS_FOCUSED.delete(editor);
    }, [readOnly, attributes.onBlur]),
    onPaste: useCallback(event => {
      // this will make application/x-slate-fragment exist when onPaste attributes is passed
      event.clipboardData = getClipboardData(event.clipboardData); // This unfortunately needs to be handled with paste events instead.

      if (hasEditableTarget(editor, event.target) && !isEventHandled(event, attributes.onPaste) && !readOnly) {
        event.preventDefault();
        ReactEditor.insertData(editor, event.clipboardData);
      }
    }, [readOnly, attributes.onPaste])
  }), useChildren({
    decorations,
    node: editor,
    renderElement,
    renderPlaceholder,
    renderLeaf,
    selection: editor.selection
  }))));
};

/**
 * A React context for sharing the `focused` state of the editor.
 */

var FocusedContext = /*#__PURE__*/createContext(false);
/**
 * Get the current `focused` state of the editor.
 */

var useFocused = () => {
  return useContext(FocusedContext);
};

var _excluded = ["editor", "children", "onChange", "value"];
/**
 * A wrapper around the provider to handle `onChange` events, because the editor
 * is a mutable singleton so it won't ever register as "changed" otherwise.
 */

var Slate = props => {
  var {
    editor,
    children,
    onChange,
    value
  } = props,
      rest = _objectWithoutProperties(props, _excluded);

  var [key, setKey] = useState(0);
  var context = useMemo(() => {
    if (!Node.isNodeList(value)) {
      throw new Error("[Slate] value is invalid! Expected a list of elements" + "but got: ".concat(JSON.stringify(value)));
    }

    if (!Editor.isEditor(editor)) {
      throw new Error("[Slate] editor is invalid! you passed:" + "".concat(JSON.stringify(editor)));
    }

    editor.children = value;
    Object.assign(editor, rest);
    return [editor];
  }, [key, value, ...Object.values(rest)]);
  var onContextChange = useCallback(() => {
    onChange(editor.children);
    setKey(key + 1);
  }, [key, onChange]);
  EDITOR_TO_ON_CHANGE.set(editor, onContextChange);
  useEffect(() => {
    return () => {
      EDITOR_TO_ON_CHANGE.set(editor, () => {});
    };
  }, []);
  var [isFocused, setIsFocused] = useState(ReactEditor.isFocused(editor));
  useEffect(() => {
    setIsFocused(ReactEditor.isFocused(editor));
  });
  useIsomorphicLayoutEffect(() => {
    var fn = () => setIsFocused(ReactEditor.isFocused(editor));

    document.addEventListener('focus', fn, true);
    return () => document.removeEventListener('focus', fn, true);
  }, []);
  useIsomorphicLayoutEffect(() => {
    var fn = () => setIsFocused(ReactEditor.isFocused(editor));

    document.addEventListener('blur', fn, true);
    return () => document.removeEventListener('blur', fn, true);
  }, []);
  return /*#__PURE__*/React.createElement(SlateContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement(EditorContext.Provider, {
    value: editor
  }, /*#__PURE__*/React.createElement(FocusedContext.Provider, {
    value: isFocused
  }, children)));
};

/**
 * Utilities for single-line deletion
 */

var doRectsIntersect = (rect, compareRect) => {
  var middle = (compareRect.top + compareRect.bottom) / 2;
  return rect.top <= middle && rect.bottom >= middle;
};

var areRangesSameLine = (editor, range1, range2) => {
  var rect1 = ReactEditor.toDOMRange(editor, range1).getBoundingClientRect();
  var rect2 = ReactEditor.toDOMRange(editor, range2).getBoundingClientRect();
  return doRectsIntersect(rect1, rect2) && doRectsIntersect(rect2, rect1);
};
/**
 * A helper utility that returns the end portion of a `Range`
 * which is located on a single line.
 *
 * @param {Editor} editor The editor object to compare against
 * @param {Range} parentRange The parent range to compare against
 * @returns {Range} A valid portion of the parentRange which is one a single line
 */


var findCurrentLineRange = (editor, parentRange) => {
  var parentRangeBoundary = Editor.range(editor, Range.end(parentRange));
  var positions = Array.from(Editor.positions(editor, {
    at: parentRange
  }));
  var left = 0;
  var right = positions.length;
  var middle = Math.floor(right / 2);

  if (areRangesSameLine(editor, Editor.range(editor, positions[left]), parentRangeBoundary)) {
    return Editor.range(editor, positions[left], parentRangeBoundary);
  }

  if (positions.length < 2) {
    return Editor.range(editor, positions[positions.length - 1], parentRangeBoundary);
  }

  while (middle !== positions.length && middle !== left) {
    if (areRangesSameLine(editor, Editor.range(editor, positions[middle]), parentRangeBoundary)) {
      right = middle;
    } else {
      left = middle;
    }

    middle = Math.floor((left + right) / 2);
  }

  return Editor.range(editor, positions[right], parentRangeBoundary);
};

/**
 * `withReact` adds React and DOM specific behaviors to the editor.
 *
 * If you are using TypeScript, you must extend Slate's CustomTypes to use
 * this plugin.
 *
 * See https://docs.slatejs.org/concepts/11-typescript to learn how.
 */

var withReact = editor => {
  var e = editor;
  var {
    apply,
    onChange,
    deleteBackward
  } = e; // The WeakMap which maps a key to a specific HTMLElement must be scoped to the editor instance to
  // avoid collisions between editors in the DOM that share the same value.

  EDITOR_TO_KEY_TO_ELEMENT.set(e, new WeakMap());

  e.deleteBackward = unit => {
    if (unit !== 'line') {
      return deleteBackward(unit);
    }

    if (editor.selection && Range.isCollapsed(editor.selection)) {
      var parentBlockEntry = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
        at: editor.selection
      });

      if (parentBlockEntry) {
        var [, parentBlockPath] = parentBlockEntry;
        var parentElementRange = Editor.range(editor, parentBlockPath, editor.selection.anchor);
        var currentLineRange = findCurrentLineRange(e, parentElementRange);

        if (!Range.isCollapsed(currentLineRange)) {
          Transforms.delete(editor, {
            at: currentLineRange
          });
        }
      }
    }
  };

  e.apply = op => {
    // if we're NOT an insert_text and there's a queue
    // of native events, bail out and flush the queue.
    // otherwise transforms as part of this cycle will
    // be incorrect.
    //
    // This is needed as overriden operations (e.g. `insertText`)
    // can call additional transforms, which will need accurate
    // content, and will be called _before_ `onInput` is fired.
    if (op.type !== 'insert_text') {
      AS_NATIVE.set(editor, false);
      flushNativeEvents(editor);
    } // If we're in native mode, queue the operation
    // and it will be applied later.


    if (AS_NATIVE.get(editor)) {
      var nativeOps = NATIVE_OPERATIONS.get(editor);

      if (nativeOps) {
        nativeOps.push(op);
      } else {
        NATIVE_OPERATIONS.set(editor, [op]);
      }

      return;
    }

    var matches = [];

    switch (op.type) {
      case 'insert_text':
      case 'remove_text':
      case 'set_node':
        {
          for (var [node, path] of Editor.levels(e, {
            at: op.path
          })) {
            var key = ReactEditor.findKey(e, node);
            matches.push([path, key]);
          }

          break;
        }

      case 'insert_node':
      case 'remove_node':
      case 'merge_node':
      case 'split_node':
        {
          for (var [_node, _path] of Editor.levels(e, {
            at: Path.parent(op.path)
          })) {
            var _key = ReactEditor.findKey(e, _node);

            matches.push([_path, _key]);
          }

          break;
        }

      case 'move_node':
        {
          for (var [_node2, _path2] of Editor.levels(e, {
            at: Path.common(Path.parent(op.path), Path.parent(op.newPath))
          })) {
            var _key2 = ReactEditor.findKey(e, _node2);

            matches.push([_path2, _key2]);
          }

          break;
        }
    }

    apply(op);

    for (var [_path3, _key3] of matches) {
      var [_node3] = Editor.node(e, _path3);
      NODE_TO_KEY.set(_node3, _key3);
    }
  };

  e.setFragmentData = data => {
    var {
      selection
    } = e;

    if (!selection) {
      return;
    }

    var [start, end] = Range.edges(selection);
    var startVoid = Editor.void(e, {
      at: start.path
    });
    var endVoid = Editor.void(e, {
      at: end.path
    });

    if (Range.isCollapsed(selection) && !startVoid) {
      return;
    } // Create a fake selection so that we can add a Base64-encoded copy of the
    // fragment to the HTML, to decode on future pastes.


    var domRange = ReactEditor.toDOMRange(e, selection);
    var contents = domRange.cloneContents();
    var attach = contents.childNodes[0]; // Make sure attach is non-empty, since empty nodes will not get copied.

    contents.childNodes.forEach(node => {
      if (node.textContent && node.textContent.trim() !== '') {
        attach = node;
      }
    }); // COMPAT: If the end node is a void node, we need to move the end of the
    // range from the void node's spacer span, to the end of the void node's
    // content, since the spacer is before void's content in the DOM.

    if (endVoid) {
      var [voidNode] = endVoid;
      var r = domRange.cloneRange();
      var domNode = ReactEditor.toDOMNode(e, voidNode);
      r.setEndAfter(domNode);
      contents = r.cloneContents();
    } // COMPAT: If the start node is a void node, we need to attach the encoded
    // fragment to the void node's content node instead of the spacer, because
    // attaching it to empty `<div>/<span>` nodes will end up having it erased by
    // most browsers. (2018/04/27)


    if (startVoid) {
      attach = contents.querySelector('[data-slate-spacer]');
    } // Remove any zero-width space spans from the cloned DOM so that they don't
    // show up elsewhere when pasted.


    Array.from(contents.querySelectorAll('[data-slate-zero-width]')).forEach(zw => {
      var isNewline = zw.getAttribute('data-slate-zero-width') === 'n';
      zw.textContent = isNewline ? '\n' : '';
    }); // Set a `data-slate-fragment` attribute on a non-empty node, so it shows up
    // in the HTML, and can be used for intra-Slate pasting. If it's a text
    // node, wrap it in a `<span>` so we have something to set an attribute on.

    if (isDOMText(attach)) {
      var span = document.createElement('span'); // COMPAT: In Chrome and Safari, if we don't add the `white-space` style
      // then leading and trailing spaces will be ignored. (2017/09/21)

      span.style.whiteSpace = 'pre';
      span.appendChild(attach);
      contents.appendChild(span);
      attach = span;
    }

    var fragment = e.getFragment();
    var string = JSON.stringify(fragment);
    var encoded = window.btoa(encodeURIComponent(string));
    attach.setAttribute('data-slate-fragment', encoded);
    data.setData('application/x-slate-fragment', encoded); // Add the content to a <div> so that we can get its inner HTML.

    var div = document.createElement('div');
    div.appendChild(contents);
    div.setAttribute('hidden', 'true');
    document.body.appendChild(div);
    data.setData('text/html', div.innerHTML);
    data.setData('text/plain', getPlainText(div));
    document.body.removeChild(div);
    return data;
  };

  e.insertData = data => {
    /**
     * Checking copied fragment from application/x-slate-fragment or data-slate-fragment
     */
    var fragment = data.getData('application/x-slate-fragment') || getSlateFragmentAttribute(data);

    if (fragment) {
      var decoded = decodeURIComponent(window.atob(fragment));
      var parsed = JSON.parse(decoded);
      e.insertFragment(parsed);
      return;
    }

    var text = data.getData('text/plain');

    if (text) {
      var lines = text.split(/\r\n|\r|\n/);
      var split = false;

      for (var line of lines) {
        if (split) {
          Transforms.splitNodes(e, {
            always: true
          });
        }

        e.insertText(line);
        split = true;
      }
    }
  };

  e.onChange = () => {
    // COMPAT: React doesn't batch `setState` hook calls, which means that the
    // children and selection can get out of sync for one render pass. So we
    // have to use this unstable API to ensure it batches them. (2019/12/03)
    // https://github.com/facebook/react/issues/14259#issuecomment-439702367
    ReactDOM.unstable_batchedUpdates(() => {
      var onContextChange = EDITOR_TO_ON_CHANGE.get(e);

      if (onContextChange) {
        onContextChange();
      }

      onChange();
    });
  };

  return e;
};

// Components
var Editable = IS_ANDROID ? AndroidEditable : Editable$1;

var History = {
  /**
   * Check if a value is a `History` object.
   */
  isHistory(value) {
    return isPlainObject(value) && Array.isArray(value.redos) && Array.isArray(value.undos) && (value.redos.length === 0 || Operation.isOperationList(value.redos[0])) && (value.undos.length === 0 || Operation.isOperationList(value.undos[0]));
  }

};
var SAVING = new WeakMap();
var MERGING = new WeakMap();
var HistoryEditor = {
  /**
   * Check if a value is a `HistoryEditor` object.
   */
  isHistoryEditor(value) {
    return History.isHistory(value.history) && Editor.isEditor(value);
  },

  /**
   * Get the merge flag's current value.
   */
  isMerging(editor) {
    return MERGING.get(editor);
  },

  /**
   * Get the saving flag's current value.
   */
  isSaving(editor) {
    return SAVING.get(editor);
  },

  /**
   * Redo to the previous saved state.
   */
  redo(editor) {
    editor.redo();
  },

  /**
   * Undo to the previous saved state.
   */
  undo(editor) {
    editor.undo();
  },

  /**
   * Apply a series of changes inside a synchronous `fn`, without merging any of
   * the new operations into previous save point in the history.
   */
  withoutMerging(editor, fn) {
    var prev = HistoryEditor.isMerging(editor);
    MERGING.set(editor, false);
    fn();
    MERGING.set(editor, prev);
  },

  /**
   * Apply a series of changes inside a synchronous `fn`, without saving any of
   * their operations into the history.
   */
  withoutSaving(editor, fn) {
    var prev = HistoryEditor.isSaving(editor);
    SAVING.set(editor, false);
    fn();
    SAVING.set(editor, prev);
  }

};

/**
 * The `withHistory` plugin keeps track of the operation history of a Slate
 * editor as operations are applied to it, using undo and redo stacks.
 *
 * If you are using TypeScript, you must extend Slate's CustomTypes to use
 * this plugin.
 *
 * See https://docs.slatejs.org/concepts/11-typescript to learn how.
 */

var withHistory = editor => {
  var e = editor;
  var {
    apply
  } = e;
  e.history = {
    undos: [],
    redos: []
  };

  e.redo = () => {
    var {
      history
    } = e;
    var {
      redos
    } = history;

    if (redos.length > 0) {
      var batch = redos[redos.length - 1];
      HistoryEditor.withoutSaving(e, () => {
        Editor.withoutNormalizing(e, () => {
          for (var op of batch) {
            e.apply(op);
          }
        });
      });
      history.redos.pop();
      history.undos.push(batch);
    }
  };

  e.undo = () => {
    var {
      history
    } = e;
    var {
      undos
    } = history;

    if (undos.length > 0) {
      var batch = undos[undos.length - 1];
      HistoryEditor.withoutSaving(e, () => {
        Editor.withoutNormalizing(e, () => {
          var inverseOps = batch.map(Operation.inverse).reverse();

          for (var op of inverseOps) {
            e.apply(op);
          }
        });
      });
      history.redos.push(batch);
      history.undos.pop();
    }
  };

  e.apply = op => {
    var {
      operations,
      history
    } = e;
    var {
      undos
    } = history;
    var lastBatch = undos[undos.length - 1];
    var lastOp = lastBatch && lastBatch[lastBatch.length - 1];
    var overwrite = shouldOverwrite(op, lastOp);
    var save = HistoryEditor.isSaving(e);
    var merge = HistoryEditor.isMerging(e);

    if (save == null) {
      save = shouldSave(op);
    }

    if (save) {
      if (merge == null) {
        if (lastBatch == null) {
          merge = false;
        } else if (operations.length !== 0) {
          merge = true;
        } else {
          merge = shouldMerge(op, lastOp) || overwrite;
        }
      }

      if (lastBatch && merge) {
        if (overwrite) {
          lastBatch.pop();
        }

        lastBatch.push(op);
      } else {
        var batch = [op];
        undos.push(batch);
      }

      while (undos.length > 100) {
        undos.shift();
      }

      if (shouldClear(op)) {
        history.redos = [];
      }
    }

    apply(op);
  };

  return e;
};
/**
 * Check whether to merge an operation into the previous operation.
 */

var shouldMerge = (op, prev) => {
  if (op.type === 'set_selection') {
    return true;
  }

  if (prev && op.type === 'insert_text' && prev.type === 'insert_text' && op.offset === prev.offset + prev.text.length && Path.equals(op.path, prev.path)) {
    return true;
  }

  if (prev && op.type === 'remove_text' && prev.type === 'remove_text' && op.offset + op.text.length === prev.offset && Path.equals(op.path, prev.path)) {
    return true;
  }

  return false;
};
/**
 * Check whether an operation needs to be saved to the history.
 */


var shouldSave = (op, prev) => {
  if (op.type === 'set_selection' && (op.properties == null || op.newProperties == null)) {
    return false;
  }

  return true;
};
/**
 * Check whether an operation should overwrite the previous one.
 */


var shouldOverwrite = (op, prev) => {
  if (prev && op.type === 'set_selection' && prev.type === 'set_selection') {
    return true;
  }

  return false;
};
/**
 * Check whether an operation should clear the redos stack.
 */


var shouldClear = op => {
  if (op.type === 'set_selection') {
    return false;
  }

  return true;
};

// 通过order转数字
var getLetterByOrder = function getLetterByOrder(order) {
  var result = [];

  while (order) {
    var t = order % 26;

    if (!t) {
      t = 26;
      --order;
    }

    result.push(String.fromCodePoint(t + 64));
    order = ~~(order / 26);
  }

  return result.reverse().join('');
};

var orderUse = function orderUse(offset, order) {
  var type = offset % 3;

  if (type === 0) {
    return order;
  } else if (type === 1) {
    return getLetterByOrder(order);
  } else {
    return getLetterByOrder(order).toLowerCase();
  }
};

var uListUse = function uListUse(offset) {
  var type = offset % 4;

  if (type === 0) {
    return '•';
  } else if (type === 1) {
    return '◦';
  } else if (type === 2) {
    return '▪';
  } else {
    return '▫';
  }
};

var setNodeTag$6 = function setNodeTag(editor, element, key, value) {
  var at = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (at) {
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: at
    });
  } else if (!element) {
    // 如果没有传入对象，则操作当前行
    Transforms.setNodes(editor, _defineProperty$2({}, key, value));
  } else {
    var checkedAt = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: checkedAt
    });
  }
};

var setChecked = function setChecked(editor, element, checked) {
  setNodeTag$6(editor, element, 'checked', checked);
};

var setTitle = function setTitle(editor, element, title) {
  setNodeTag$6(editor, element, 'title', title);
};

var setTextAlign$3 = function setTextAlign(editor, element, textAlign) {
  setNodeTag$6(editor, element, 'textAlign', textAlign);
};

var setQuote = function setQuote(editor, element, quote) {
  setNodeTag$6(editor, element, 'quote', quote);
}; // 设置有序列表的前边顺序符


var setListOrder = function setListOrder(editor, element, listOrder) {
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  setNodeTag$6(editor, element, 'listOrder', listOrder, path); // 向下查找，把下边连接的相同区域的有序列表序号都重置

  if (!!path) {
    setNextListOrder(editor, element, path, listOrder + 1);
  } else if (!!element) {
    var _path = ReactEditor.findPath(editor, element);

    setNextListOrder(editor, element, _path, listOrder + 1);
  } else {
    var selection = editor.selection; // 如果不是光标点，不操作

    if (!selection || !Range.isCollapsed(selection)) {
      return;
    } // 获取当前对象


    var block = Editor.above(editor, {
      match: function match(n) {
        return Editor.isBlock(editor, n);
      }
    });

    if (!block) {
      return;
    }

    var _block = _slicedToArray(block, 2),
        el = _block[0],
        _path2 = _block[1];

    setNextListOrder(editor, el, _path2, listOrder + 1);
  }
};

var setNextListOrder = function setNextListOrder(editor, element, path, listOrder) {
  // 这个函数在insertBreak的时候有bug，path是准的，但是内容不准
  var nextBlock = Editor.next(editor, {
    at: path
  });

  if (!nextBlock) {
    return;
  }

  var _nextBlock = _slicedToArray(nextBlock, 2),
      el = _nextBlock[0],
      nextPath = _nextBlock[1]; // 如果下一个不是有序列表，不做操作


  if (!!el.type && el.type != 'paragraph') {
    return;
  }

  if (!el.list || el.list != 'ol') {
    return;
  }

  var nowOffset = element.indentation || 0;
  var nextOffset = el.indentation || 0; // 如果缩进不一致，不做操作

  if (nowOffset != nextOffset) {
    return;
  }

  setListOrder(editor, el, listOrder, nextPath);
};

var setList = function setList(editor, element, list) {
  // 如果是去除list效果，则所有附加属性全部清空
  if (!list) {
    setNodeTag$6(editor, element, 'list', null);
    setNodeTag$6(editor, element, 'checked', null);
    setNodeTag$6(editor, element, 'listOrder', null);
  } else {
    setNodeTag$6(editor, element, 'list', list);

    if (list != 'checkbox') {
      setNodeTag$6(editor, element, 'checked', null);
    }

    if (list != 'ol') {
      setNodeTag$6(editor, element, 'listOrder', null);
    }
  }
};

var setIndentation = function setIndentation(editor, element, indentation) {
  var at = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  if (!indentation || indentation <= 0) {
    setNodeTag$6(editor, element, 'indentation', null, at);
  } else {
    setNodeTag$6(editor, element, 'indentation', indentation, at);
  }
};

var wrapLink = function wrapLink(editor) {
  var selection = editor.selection;

  if (!selection) {
    return;
  }

  var isCollapsed = Range.isCollapsed(selection);

  if (isCollapsed) {
    return;
  }

  var link = {
    type: 'link',
    url: 'http://',
    target: '_self',
    children: []
  };
  Transforms.wrapNodes(editor, link, {
    split: true
  });
};

var unWrapLink = function unWrapLink(editor) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (element) {
    var at = ReactEditor.findPath(editor, element);
    Transforms.unwrapNodes(editor, {
      match: function match(n) {
        return !Editor.isEditor(n) && Element$9.isElement(n) && n.type === 'link';
      },
      at: at
    });
  } else {
    Transforms.unwrapNodes(editor, {
      match: function match(n) {
        return !Editor.isEditor(n) && Element$9.isElement(n) && n.type === 'link';
      }
    });
  }
};

var setURL = function setURL(editor, element, url) {
  if (element.type && element.type === 'link') {
    setNodeTag$6(editor, element, 'url', url);
  }
};

var setLinkTarget = function setLinkTarget(editor, element, target) {
  if (element.type && element.type === 'link') {
    setNodeTag$6(editor, element, 'target', target);
  }
};

var setStarNum = function setStarNum(editor, element, number) {
  setNodeTag$6(editor, element, 'number', number);
};

var insertStar = function insertStar(editor) {
  var star = {
    type: 'star',
    number: 5,
    children: [{
      text: ''
    }]
  };
  Transforms.insertNodes(editor, star);
};

var IndentationText = function IndentationText(props) {
  // children 主要文本内容
  // icon 前置标志
  // offset 缩进值
  var children = props.children,
      icon = props.icon,
      offset = props.offset;

  if (!!icon) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement("div", {
      contentEditable: false,
      style: {
        marginLeft: "".concat(offset * 20, "px"),
        minWidth: '10px',
        textAlign: 'right',
        marginRight: '5px',
        userSelect: 'none'
      }
    }, icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, children));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        marginLeft: "".concat(offset * 20, "px")
      }
    }, children));
  }
}; // 基础文本格式类


var Element$7 = /*#__PURE__*/React.memo(function (props) {
  // 子组件
  var children = props.children; // 基础配置

  var element = props.element,
      attributes = props.attributes; // 文本参数

  var title = element.title,
      textAlign = element.textAlign,
      list = element.list,
      quote = element.quote; // 文本额外参数
  // checked(bool): checkbox是否打勾
  // indentation(num): list的缩进配置

  var checked = element.checked,
      indentation = element.indentation,
      listOrder = element.listOrder; // 转换缩进值，没有写的就是0

  var offset = indentation || 0;
  var editor = useSlate(); // 列表类型，支持checkbox、有序无序列表

  if (!!list) {
    if (list === 'checkbox') {
      // checkbox的点击事件支持
      var Checkbox = function Checkbox(props) {
        var onMouseDown = function onMouseDown(event) {
          if (editor.readOnly) {
            return;
          }

          event.preventDefault();
          setChecked(editor, element, !checked);
        };

        var Box = function Box() {
          return /*#__PURE__*/React.createElement("span", {
            style: {
              cursor: 'pointer'
            },
            onMouseDown: onMouseDown
          }, !!checked ? /*#__PURE__*/React.createElement(CheckSquareOutlined, null) : /*#__PURE__*/React.createElement(BorderOutlined, null));
        };

        return /*#__PURE__*/React.createElement(IndentationText, {
          offset: offset,
          icon: /*#__PURE__*/React.createElement(Box, null)
        }, !!checked ? /*#__PURE__*/React.createElement("s", {
          style: {
            color: '#B7BAC6'
          }
        }, props.children) : props.children);
      };

      children = /*#__PURE__*/React.createElement(Checkbox, null, children);
    }

    if (list === 'ul') {
      children = /*#__PURE__*/React.createElement(IndentationText, {
        offset: offset,
        icon: /*#__PURE__*/React.createElement("span", {
          style: {
            color: '#4E61E8'
          }
        }, uListUse(offset))
      }, children);
    }

    if (list === 'ol' && !!listOrder) {
      children = /*#__PURE__*/React.createElement(IndentationText, {
        offset: offset,
        icon: /*#__PURE__*/React.createElement("span", {
          style: {
            color: '#4E61E8'
          }
        }, orderUse(offset, listOrder), ".")
      }, children);
    }
  } // 如果设置了标题属性


  if (!!title) {
    if (title === 'h1') {
      children = /*#__PURE__*/React.createElement("h1", {
        style: {
          fontSize: '28px'
        }
      }, children);
    }

    if (title === 'h2') {
      children = /*#__PURE__*/React.createElement("h2", {
        style: {
          fontSize: '26px'
        }
      }, children);
    }

    if (title === 'h3') {
      children = /*#__PURE__*/React.createElement("h3", {
        style: {
          fontSize: '24px'
        }
      }, children);
    }

    if (title === 'h4') {
      children = /*#__PURE__*/React.createElement("h4", {
        style: {
          fontSize: '22px'
        }
      }, children);
    }

    if (title === 'h5') {
      children = /*#__PURE__*/React.createElement("h5", {
        style: {
          fontSize: '20px'
        }
      }, children);
    }
  } // 处理缩进，list本身已经处理过缩进，不再处理。处理其他文本的


  if (!list) {
    children = /*#__PURE__*/React.createElement(IndentationText, {
      offset: offset
    }, children);
  } // 引用处理


  if (!!quote) {
    children = /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0px 0 0px 10px',
        borderLeft: '1px solid #2447F5',
        color: '#A5A6A6'
      }
    }, children);
  }

  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      wordBreak: 'break-all',
      textAlign: textAlign || 'left'
    }
  }, attributes), children);
});

var LinkElement = function LinkElement(props) {
  // 基础配置
  var element = props.element,
      attributes = props.attributes,
      children = props.children;
  var url = element.url,
      target = element.target;
  var editor = useSlate();
  var readOnly = editor.readOnly;

  var LinkEditor = function LinkEditor(props) {
    var _useState = useState(url),
        _useState2 = _slicedToArray(_useState, 2),
        value = _useState2[0],
        setValue = _useState2[1];

    var onChange = function onChange(v) {
      setValue(v.target.value);
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-block',
        width: '280px'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      value: value,
      onChange: onChange
    })), "\xA0", /*#__PURE__*/React.createElement(Single, {
      selected: true,
      description: "\u4FEE\u6539\u94FE\u63A5",
      content: "\u4FEE\u6539",
      onClick: function onClick() {
        setURL(editor, element, value);
        message.info('修改链接成功');
      }
    }), /*#__PURE__*/React.createElement(Single, {
      selected: true,
      description: "\u6E05\u9664\u94FE\u63A5",
      content: /*#__PURE__*/React.createElement(DeleteOutlined, null),
      onClick: function onClick() {
        unWrapLink(editor, element);
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '10px'
      }
    }, /*#__PURE__*/React.createElement("font", {
      style: {
        color: 'black'
      }
    }, "\u6253\u5F00\u65B9\u5F0F:"), "\xA0", /*#__PURE__*/React.createElement(Select, {
      selected: target,
      notNull: true,
      onChange: function onChange(key) {
        setLinkTarget(editor, element, key);
      },
      buttons: [{
        key: '_self',
        content: '本页面',
        description: '会在本页面跳转链接'
      }, {
        key: '_blank',
        content: '新页面',
        description: '会在新页面跳转链接'
      }]
    })));
  }; // 处理超链接


  return readOnly ? /*#__PURE__*/React.createElement("a", _extends({
    onMouseDown: function onMouseDown() {
      if (isUrl(url)) {
        window.open(url, target);
      }
    }
  }, attributes), children) : /*#__PURE__*/React.createElement(Tooltip, {
    title: /*#__PURE__*/React.createElement(LinkEditor, null),
    color: "white",
    overlayStyle: {
      minWidth: '400px'
    },
    destroyTooltipOnHide: true
  }, /*#__PURE__*/React.createElement("a", _extends({
    onMouseDown: function onMouseDown() {
      if (isUrl(url)) {
        window.open(url, target);
      }
    }
  }, attributes), children));
};

var StarElement = function StarElement(props) {
  // 基础配置
  var attributes = props.attributes,
      children = props.children,
      element = props.element;
  var editor = useSlate();
  var selected = useSelected();
  var focused = useFocused();

  var onChange = function onChange(number) {
    setStarNum(editor, element, number);
  };

  return /*#__PURE__*/React.createElement("span", attributes, children, /*#__PURE__*/React.createElement("span", {
    contentEditable: false,
    style: {
      display: 'inline-block',
      borderRadius: '2px',
      boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Rate, {
    disabled: editor.readOnly,
    allowClear: true,
    value: element.number,
    onChange: onChange
  })));
};

var Leaf$1 = function Leaf(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      leaf = _ref.leaf;

  // 加粗
  if (leaf.bold) {
    children = /*#__PURE__*/React.createElement("b", null, children);
  } // 斜线


  if (leaf.italic) {
    children = /*#__PURE__*/React.createElement("i", null, children);
  } // 下划线


  if (leaf.underline) {
    children = /*#__PURE__*/React.createElement("u", null, children);
  } // 处理删除线


  if (leaf.strikethrough) {
    children = /*#__PURE__*/React.createElement("s", null, children);
  } // 处理代码块


  if (leaf.code) {
    children = /*#__PURE__*/React.createElement("span", {
      style: {
        backgroundColor: '#DCDCDC',
        borderRadius: '5px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: '5px',
        marginRight: '5px'
      }
    }, children));
  } // // 处理超链接
  // if (leaf.link) {
  //     children = (
  //         <Tooltip title={leaf.link}>
  //             <span
  //                 style={{
  //                     color: '#007FFF',
  //                     cursor: 'pointer',
  //                 }}
  //                 onMouseDown={() => {
  //                     window.open(leaf.link, '_blank');
  //                 }}
  //             >
  //                 {children}
  //             </span>
  //         </Tooltip>
  //     )
  // }
  // 处理文字颜色


  if (leaf.fontColor) {
    children = /*#__PURE__*/React.createElement("span", {
      style: {
        color: leaf.fontColor
      }
    }, children);
  } // 处理背景颜色


  var backgroundColor = '';

  if (leaf.backgroundColor) {
    backgroundColor = leaf.backgroundColor;
  }

  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      backgroundColor: backgroundColor
    }
  }, attributes), children);
};

var isColorActive = function isColorActive(editor, key, color) {
  var selection = editor.selection;

  if (selection && Range.isCollapsed(selection)) {
    return false;
  }

  var _Editor$nodes = Editor.nodes(editor, {
    match: function match(n) {
      return n[key] === color;
    },
    mode: 'all'
  }),
      _Editor$nodes2 = _slicedToArray(_Editor$nodes, 1),
      match = _Editor$nodes2[0];

  return !!match;
};

var isFormatActive = function isFormatActive(editor, format) {
  var selection = editor.selection;

  if (selection && Range.isCollapsed(selection)) {
    return false;
  }

  var _Editor$nodes3 = Editor.nodes(editor, {
    match: function match(n) {
      return n[format] === true;
    },
    mode: 'all'
  }),
      _Editor$nodes4 = _slicedToArray(_Editor$nodes3, 1),
      match = _Editor$nodes4[0];

  return !!match;
};

var isLinkActive = function isLinkActive(editor) {
  var selection = editor.selection;

  if (selection && Range.isCollapsed(selection)) {
    return false;
  }

  var _Editor$nodes5 = Editor.nodes(editor, {
    match: function match(n) {
      return !Editor.isEditor(n) && Element$9.isElement(n) && n.type === 'link';
    }
  }),
      _Editor$nodes6 = _slicedToArray(_Editor$nodes5, 1),
      link = _Editor$nodes6[0];

  return !!link;
};

var backgroundColorList = ['#ffd666', '#ffccc7', '#95de64', '#91d5ff', '#d3adf7', '#bfbfbf'];
var fontColorList = ['#f5222d', '#d4b106', '#389e0d', '#096dd9', '#722ed1', '#595959'];
var normalConfig = [{
  key: 'bold',
  description: '加粗',
  content: /*#__PURE__*/React.createElement(BoldOutlined, null)
}, {
  key: 'italic',
  description: '斜体',
  content: /*#__PURE__*/React.createElement(ItalicOutlined, null)
}, {
  key: 'underline',
  description: '下划线',
  content: /*#__PURE__*/React.createElement(UnderlineOutlined, null)
}, {
  key: 'strikethrough',
  description: '删除线',
  content: /*#__PURE__*/React.createElement(StrikethroughOutlined, null)
}, {
  key: 'code',
  description: '代码',
  content: /*#__PURE__*/React.createElement(CodeOutlined, null)
}];

var execCoy$1 = function execCoy(text) {
  var input = document.createElement('TEXTAREA');
  input.style.opacity = 0;
  input.style.position = 'absolute';
  input.style.left = '-100000px';
  document.body.appendChild(input);
  input.value = text;
  input.select();
  input.setSelectionRange(0, text.length);
  document.execCommand('copy');
  document.body.removeChild(input);
};

var LeafBar$1 = function LeafBar(props) {
  var editor = useSlate();

  var getActiveColor = function getActiveColor(type, colorList) {
    for (var i = 0; i < colorList.length; i++) {
      var color = colorList[i];

      if (isColorActive(editor, type, color)) {
        return color;
      }
    }

    return '';
  };

  var getColorList = function getColorList(type, colorList) {
    var buttons = [];

    for (var i = 0; i < colorList.length; i++) {
      var color = colorList[i];
      buttons.push({
        key: color,
        description: color,
        content: type === 'backgroundColor' ? /*#__PURE__*/React.createElement(BgColorsOutlined, {
          style: {
            color: color,
            backgroundColor: color
          }
        }) : /*#__PURE__*/React.createElement(FontColorsOutlined, {
          style: {
            color: color
          }
        })
      });
    }

    var onChange = function onChange(color) {
      // 重置颜色
      Editor.addMark(editor, type, color);
    };

    return /*#__PURE__*/React.createElement(Select, {
      selected: getActiveColor(type, colorList),
      notNull: false,
      onChange: onChange,
      buttons: buttons
    });
  };

  var getFormatActiveKeys = function getFormatActiveKeys() {
    var keys = [];

    for (var i = 0; i < normalConfig.length; i++) {
      var key = normalConfig[i].key;

      if (isFormatActive(editor, key)) {
        keys.push(key);
      }
    }

    return keys;
  };

  var getNormalList = function getNormalList() {
    var onChange = function onChange(key) {
      // 修改基础样式
      Editor.addMark(editor, key, isFormatActive(editor, key) ? null : true);
    };

    return /*#__PURE__*/React.createElement(Muti, {
      selectedKeys: getFormatActiveKeys(),
      onChange: onChange,
      buttons: normalConfig
    });
  };

  var GetFormatPainter = function GetFormatPainter(props) {
    var setFormatCache = function setFormatCache() {
      var cache = {};
      cache['backgroundColor'] = getActiveColor('backgroundColor', backgroundColorList);
      cache['fontColor'] = getActiveColor('fontColor', fontColorList);
      cache['normal'] = getFormatActiveKeys();
      execCoy$1('&_FORMAT_CACHE' + JSON.stringify(cache));
      message.info('样式已经复制到剪贴板');
    };

    return /*#__PURE__*/React.createElement(Single, {
      selected: false,
      description: "\u70B9\u51FB\u590D\u5236\u6837\u5F0F\u5230\u526A\u8D34\u677F\uFF0C\u9009\u4E2D\u5176\u4ED6\u6587\u672Cctrl+v\u5373\u53EF\u590D\u7528\u6837\u5F0F",
      content: /*#__PURE__*/React.createElement("span", {
        style: {
          color: '#003a8c'
        }
      }, /*#__PURE__*/React.createElement(FormatPainterOutlined, {
        style: {
          color: '#d4380d'
        }
      }), "\xA0\u683C\u5F0F\u5237"),
      onClick: function onClick() {
        setFormatCache();
      }
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, getColorList('backgroundColor', backgroundColorList)), /*#__PURE__*/React.createElement("span", null, getColorList('fontColor', fontColorList)), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: '1px solid #91d5ff'
    }
  }), /*#__PURE__*/React.createElement("span", null, getNormalList()), "\xA0\xA0", GetFormatPainter(), "\xA0\xA0");
};

var LinkBar = function LinkBar(props) {
  var editor = useSlate();
  var selected = isLinkActive(editor);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Single, {
    selected: selected,
    description: "\u52A0\u5165\u8D85\u94FE\u63A5\uFF0C\u70B9\u51FB\u540E\u60AC\u505C\u4E8E\u6587\u5B57\u4E0A\u4FEE\u6539\u94FE\u63A5\u5185\u5BB9",
    content: /*#__PURE__*/React.createElement(LinkOutlined, {
      style: {
        color: '#0000cc'
      }
    }),
    onClick: function onClick() {
      selected ? unWrapLink(editor) : wrapLink(editor);
    }
  }), "\xA0\xA0");
};

var StarBar = function StarBar(props) {
  var editor = useSlate();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Single, {
    selected: false,
    description: "\u65B0\u589E\u8BC4\u5206",
    content: /*#__PURE__*/React.createElement(StarFilled, {
      style: {
        color: '#fadb14'
      }
    }),
    onClick: function onClick() {
      insertStar(editor);
    }
  }), "\xA0\xA0");
};

var formatPrinter = function formatPrinter(editor, format) {
  if (format['normal'].length > 0) {
    var normalArr = format['normal'];

    for (var i = 0; i < normalArr.length; i++) {
      // 修改基础样式
      Editor.addMark(editor, normalArr[i], true);
    }
  }

  if (format['fontColor']) {
    Editor.addMark(editor, 'fontColor', format['fontColor']);
  }

  if (format['backgroundColor']) {
    // 修改背景色
    Editor.addMark(editor, 'backgroundColor', format['backgroundColor']);
  }
};

var insertEndBreak = function insertEndBreak(editor, element, path) {
  var nextData = _objectSpread2(_objectSpread2({}, element), {}, {
    children: [{
      text: ''
    }]
  });

  var at = Path.next(path);
  Transforms.insertNodes(editor, nextData, {
    at: at
  });

  if (element.title) {
    Transforms.setNodes(editor, _defineProperty$2({}, 'title', null), {
      at: at
    });
  }

  var point = Editor.start(editor, at);
  Transforms.select(editor, {
    anchor: point,
    focus: point
  });
};

var withParagraph = function withParagraph(editor) {
  var insertText = editor.insertText,
      insertBreak = editor.insertBreak,
      deleteBackward = editor.deleteBackward,
      insertData = editor.insertData,
      getFragment = editor.getFragment,
      isEmpty = editor.isEmpty,
      onTabDown = editor.onTabDown,
      normalizeNode = editor.normalizeNode; // 保证第一行是title

  editor.normalizeNode = function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        node = _ref2[0],
        path = _ref2[1];

    if (path.length === 0) {
      var line1 = editor.children[0];

      if (line1.type !== 'paragraph' || line1.title !== 'h1') {
        var titleLine = {
          type: 'paragraph',
          title: 'h1',
          children: [{
            text: ''
          }]
        };
        Transforms.insertNodes(editor, titleLine, {
          at: [0]
        });
      }
    }

    return normalizeNode([node, path]);
  }; // 重写部分拷贝方法，保证纯paragraph拷贝时，不拷贝父元素属性


  editor.getFragment = function () {
    var fragment = getFragment();

    while (true) {
      if (fragment.length > 1) {
        // 只有纯文本段落的，就返回段落
        var allParagraph = true;

        var _iterator = _createForOfIteratorHelper(fragment),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;

            if (child.type !== 'paragraph') {
              allParagraph = false;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (allParagraph) {
          return fragment;
        } // 如果不是段落文本，则不处理


        break;
      }

      if (fragment.length === 0) {
        break;
      }

      var current = fragment[0];

      if (!current.type || !current.children) {
        break;
      }

      if (current.type === 'paragraph') {
        return fragment;
      }

      fragment = current.children;
    }

    return getFragment();
  }; // 插入拦截


  editor.insertText = function (text) {
    var selection = editor.selection;
    var block = Editor.above(editor, {
      match: function match(n) {
        return Editor.isBlock(editor, n);
      }
    });
    var isCollapsed = Range.isCollapsed(selection); // 处理markdown指令

    if (block) {
      var _block = _slicedToArray(block, 2),
          element = _block[0],
          path = _block[1]; // 未设置类型或者是paragraph，同时输入了空格，并且有光标


      if (text === ' ' && element.type === 'paragraph' && isCollapsed) {
        var anchor = selection.anchor;
        var start = Editor.start(editor, path);
        var range = {
          anchor: anchor,
          focus: start
        };
        var beforeText = Editor.string(editor, range);
        var config = markdownKeys[beforeText]; // 正常的模式，config内容存在，则命中markdow语法，删除辅助词

        if (config) {
          Transforms.select(editor, range);
          Transforms["delete"](editor); // 正常的模式

          if (config.key === 'title') {
            setTitle(editor, null, config.value);
            return;
          }

          if (config.key === 'quote') {
            setQuote(editor, null, config.value);
            return;
          }

          if (config.key === 'list') {
            setList(editor, null, config.value);
            return;
          }
        } // 有序列表处理


        var r = /^\+?[1-9][0-9]*$/;
        var strArr = beforeText.split('.');

        if (strArr.length === 2 && r.test(strArr[0])) {
          var order = parseInt(strArr[0]);

          if (order > 0) {
            Transforms.select(editor, range);
            Transforms["delete"](editor);
            setList(editor, null, 'ol');
            setListOrder(editor, null, order);
            return;
          }
        }
      }
    } // 处理格式刷


    if (!isCollapsed && text.indexOf('&_FORMAT_CACHE') === 0) {
      var format = JSON.parse(text.split('&_FORMAT_CACHE')[1]);

      if (format) {
        formatPrinter(editor, format);
        return;
      }
    }

    insertText(text);
  };

  editor.insertData = function (data) {
    var text = data.getData('text/plain');
    var selection = editor.selection; // 处理格式刷

    if (!Range.isCollapsed(selection) && text.indexOf('&_FORMAT_CACHE') === 0) {
      var format = JSON.parse(text.split('&_FORMAT_CACHE')[1]);

      if (format) {
        formatPrinter(editor, format);
        return;
      }
    }

    insertData(data);
  }; // 分行事件，主要处理list和缩进相关


  editor.insertBreak = function () {
    var block = Editor.above(editor, {
      match: function match(n) {
        return Editor.isBlock(editor, n);
      }
    });

    if (!!block) {
      var _block2 = _slicedToArray(block, 2),
          element = _block2[0],
          path = _block2[1];

      if (element.type === 'paragraph') {
        // 对所有富文本在第一个位置点击分行。则减少缩进不分行。
        var selection = editor.selection; // 判断是不是光标

        if (element.list && !!selection && Range.isCollapsed(selection)) {
          var anchor = selection.anchor;
          var start = Editor.start(editor, path);
          var range = {
            anchor: anchor,
            focus: start
          }; // 如果是list在块的第一个位置拆分，则不做拆分，改为减少缩进

          if (Range.isCollapsed(range)) {
            // 如果是没有缩进了，则删除list效果
            if (!element.indentation || element.indentation <= 0) {
              setList(editor, null, null);
            } else {
              setIndentation(editor, null, element.indentation - 1, path);
            }

            return;
          }
        }

        var end = Editor.end(editor, path); // 如果是对有序列表的分行

        if (!!element.list && element.list === 'ol') {
          // 换行不带上行样式
          if (Point.equals(selection.anchor, end)) {
            insertEndBreak(editor, element, path);
          } else {
            insertBreak();
          }

          setListOrder(editor, null, element.listOrder + 1);
          return;
        } // 换行不带上行样式


        if (Point.equals(selection.anchor, end)) {
          insertEndBreak(editor, element, path);
          return;
        }
      }
    }

    insertBreak();
  };

  editor.deleteBackward = function () {
    var block = Editor.above(editor, {
      match: function match(n) {
        return Editor.isBlock(editor, n);
      }
    });

    if (!!block) {
      var _block3 = _slicedToArray(block, 2),
          element = _block3[0],
          path = _block3[1];

      if (element.type === 'paragraph') {
        // 对所有富文本在第一个位置点击分行。则减少缩进不分行。
        var selection = editor.selection; // 判断是不是光标

        if (!!selection && Range.isCollapsed(selection)) {
          var anchor = selection.anchor;
          var start = Editor.start(editor, path);
          var range = {
            anchor: anchor,
            focus: start
          }; // 如果是第一个位置，则处理

          if (Range.isCollapsed(range)) {
            // 如果是list效果，优先删除效果
            if (element.list) {
              setList(editor, null, null);
              return;
            } // 如果不是list，但是有缩进，先删除缩进


            if (element.indentation && element.indentation > 0) {
              setIndentation(editor, null, element.indentation - 1, path);
              return;
            }
          }
        }
      }
    }

    deleteBackward.apply(void 0, arguments);
  }; // 当前行是不是一个空的


  editor.isEmpty = function (element) {
    if (element.type === 'paragraph') {
      var at = ReactEditor.findPath(editor, element);
      var text = Editor.string(editor, at); // 文本如果没空就是没空

      if (text !== '') {
        return false;
      } // 还有字段标记，则认为非空


      if (!!element.list || !!element.quote || !!element.title || !!element.textAlign || !!element.indentation || !!element.listOrder) {
        return false;
      } // 兼容星星还有却判断为空的case


      if (element.children && element.children.length > 1) {
        return false;
      }

      return true;
    } // 最底层的，直接用Editor提供的判断


    return isEmpty(element);
  }; // 输入tab事件拦截，return的是true就代码事件被重置


  editor.onTabDown = function () {
    var block = Editor.above(editor, {
      match: function match(n) {
        return Editor.isBlock(editor, n);
      }
    });

    if (!!block) {
      var _block4 = _slicedToArray(block, 2),
          element = _block4[0],
          path = _block4[1];

      if (!element.type || element.type === 'paragraph') {
        var offset = element.indentation || 0;
        setIndentation(editor, null, offset + 1, path);
        return true;
      }
    }

    if (!onTabDown) {
      return false;
    }

    return onTabDown();
  };

  return editor;
};

var withLink = function withLink(editor) {
  var isInline = editor.isInline;

  editor.isInline = function (element) {
    return element.type === 'link' || isInline(element);
  };

  return editor;
};

var withStar = function withStar(editor) {
  var isInline = editor.isInline,
      isVoid = editor.isVoid,
      isEmpty = editor.isEmpty;

  editor.isInline = function (element) {
    return element.type === 'star' || isInline(element);
  };

  editor.isVoid = function (element) {
    return element.type === 'star' ? true : isVoid(element);
  };

  editor.isEmpty = function (element) {
    if (element.type === 'star') {
      return false;
    }

    return isEmpty(element);
  };

  return editor;
}; // 支持的markdown快捷键


var markdownKeys = {
  '#': {
    key: 'title',
    value: 'h1'
  },
  '##': {
    key: 'title',
    value: 'h2'
  },
  '###': {
    key: 'title',
    value: 'h3'
  },
  '####': {
    key: 'title',
    value: 'h4'
  },
  '#####': {
    key: 'title',
    value: 'h5'
  },
  '>': {
    key: 'quote',
    value: 'quote'
  },
  '》': {
    // 兼容中文输入法
    key: 'quote',
    value: 'quote'
  },
  '*': {
    key: 'list',
    value: 'ul'
  },
  '+': {
    key: 'list',
    value: 'ul'
  },
  '-': {
    key: 'list',
    value: 'ul'
  },
  '[]': {
    key: 'list',
    value: 'checkbox'
  },
  '【】': {
    // 兼容中文输入法
    key: 'list',
    value: 'checkbox'
  }
};

var Menu$1 = function Menu(props) {
  var element = props.element;
  var editor = useSlate();

  var titleButton = function titleButton() {
    // 变更标题
    var onChange = function onChange(key) {
      setTitle(editor, element, key);
    };

    return /*#__PURE__*/React.createElement(Select, {
      selected: element.title,
      buttons: titleButtonList,
      onChange: onChange
    });
  };

  var listButton = function listButton() {
    // 变更标题
    var onChange = function onChange(key) {
      setList(editor, element, key);

      if (key === 'ol') {
        setListOrder(editor, element, 1);
      }
    };

    return /*#__PURE__*/React.createElement(Select, {
      selected: element.list,
      buttons: listButtonList,
      onChange: onChange
    });
  };

  var textAlignButton = function textAlignButton() {
    // 变更标题
    var onChange = function onChange(key) {
      setTextAlign$3(editor, element, key);
    };

    return /*#__PURE__*/React.createElement(Select, {
      selected: element.textAlign,
      buttons: textAlignButtonList$3,
      onChange: onChange
    });
  };

  var quoteButton = function quoteButton() {
    // 变更标题
    var onChange = function onChange(key) {
      setQuote(editor, element, key);
    };

    return /*#__PURE__*/React.createElement(Select, {
      selected: element.quote,
      buttons: quoteButtonList,
      onChange: onChange
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, titleButton(), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: '1px solid #f5f5f5'
    }
  }), listButton(), "\xA0\xA0\xA0\xA0", quoteButton(), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: '1px solid #f5f5f5'
    }
  }), textAlignButton());
};

var titleButtonList = [{
  key: 'h1',
  content: 'h1',
  description: '标题1; MarkDown:#'
}, {
  key: 'h2',
  content: 'h2',
  description: '标题2; MarkDown:##'
}, {
  key: 'h3',
  content: 'h3',
  description: '标题3; MarkDown:###'
}, {
  key: 'h4',
  content: 'h4',
  description: '标题4; MarkDown:####'
}, {
  key: 'h5',
  content: 'h5',
  description: '标题5; MarkDown:#####'
}];
var listButtonList = [{
  key: 'ul',
  content: /*#__PURE__*/React.createElement(UnorderedListOutlined, null),
  description: '无序列表; MarkDown:-/+/*'
}, {
  key: 'ol',
  content: /*#__PURE__*/React.createElement(OrderedListOutlined, null),
  description: '有序列表; MarkDown:1.'
}, {
  key: 'checkbox',
  content: /*#__PURE__*/React.createElement(CheckSquareOutlined, null),
  description: 'checkbox; MarkDown:[]'
}];
var quoteButtonList = [{
  key: 'quote',
  content: /*#__PURE__*/React.createElement(InfoCircleOutlined, null),
  description: '引用; MarkDown:>'
}];
var textAlignButtonList$3 = [{
  key: 'left',
  content: /*#__PURE__*/React.createElement(AlignLeftOutlined, null),
  description: '左对齐'
}, {
  key: 'center',
  content: /*#__PURE__*/React.createElement(AlignCenterOutlined, null),
  description: '居中'
}, {
  key: 'right',
  content: /*#__PURE__*/React.createElement(AlignRightOutlined, null),
  description: '右对齐'
}];

var Paragraph = {
  type: 'paragraph',
  IsBlock: true,
  AddMenu: Menu$1,
  EditMenu: Menu$1,
  Element: Element$7,
  Leaf: Leaf$1,
  LeafBar: LeafBar$1,
  Plugin: withParagraph
};
var Link = {
  type: 'link',
  IsBlock: false,
  Element: LinkElement,
  Plugin: withLink,
  LeafBar: LinkBar
};
var Star = {
  type: 'star',
  IsBlock: false,
  Element: StarElement,
  Plugin: withStar,
  LeafBar: StarBar
};

var setNodeTag$5 = function setNodeTag(editor, element, key, value) {
  var at = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (at) {
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: at
    });
  } else if (!element) {
    // 如果没有传入对象，则操作当前行
    Transforms.setNodes(editor, _defineProperty$2({}, key, value));
  } else {
    var checkedAt = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: checkedAt
    });
  }
};

var setIcon = function setIcon(editor, element, icon) {
  setNodeTag$5(editor, element, 'icon', icon);
};

var setIconColor = function setIconColor(editor, element, iconColor) {
  setNodeTag$5(editor, element, 'iconColor', iconColor);
};

var setCardType = function setCardType(editor, element, cardType) {
  setNodeTag$5(editor, element, 'cardType', cardType);
};

var setCard = function setCard(editor, element) {
  if (element) {
    var at = ReactEditor.findPath(editor, element);
    var cardBlock = {
      type: 'card',
      cardType: 'success',
      icon: 'tag',
      children: [{
        type: 'paragraph',
        children: [{
          text: ''
        }]
      }]
    };
    Transforms.removeNodes(editor, {
      at: at
    });
    Transforms.insertNodes(editor, cardBlock, {
      at: at
    });
  }
};

var iconMap = {
  tag: function tag(color) {
    return /*#__PURE__*/React.createElement(TagOutlined, {
      style: {
        color: color
      }
    });
  },
  tags: function tags(color) {
    return /*#__PURE__*/React.createElement(TagsOutlined, {
      style: {
        color: color
      }
    });
  },
  sound: function sound(color) {
    return /*#__PURE__*/React.createElement(SoundOutlined, {
      style: {
        color: color
      }
    });
  },
  question: function question(color) {
    return /*#__PURE__*/React.createElement(QuestionCircleOutlined, {
      style: {
        color: color
      }
    });
  },
  thunderbolt: function thunderbolt(color) {
    return /*#__PURE__*/React.createElement(ThunderboltOutlined, {
      style: {
        color: color
      }
    });
  },
  star: function star(color) {
    return /*#__PURE__*/React.createElement(StarOutlined, {
      style: {
        color: color
      }
    });
  },
  setting: function setting(color) {
    return /*#__PURE__*/React.createElement(SettingOutlined, {
      style: {
        color: color
      }
    });
  },
  schedule: function schedule(color) {
    return /*#__PURE__*/React.createElement(ScheduleOutlined, {
      style: {
        color: color
      }
    });
  },
  pushpin: function pushpin(color) {
    return /*#__PURE__*/React.createElement(PushpinOutlined, {
      style: {
        color: color
      }
    });
  },
  message: function message(color) {
    return /*#__PURE__*/React.createElement(MessageOutlined, {
      style: {
        color: color
      }
    });
  },
  heart: function heart(color) {
    return /*#__PURE__*/React.createElement(HeartOutlined, {
      style: {
        color: color
      }
    });
  },
  edit: function edit(color) {
    return /*#__PURE__*/React.createElement(EditOutlined, {
      style: {
        color: color
      }
    });
  },
  snipets: function snipets(color) {
    return /*#__PURE__*/React.createElement(SnippetsOutlined, {
      style: {
        color: color
      }
    });
  },
  aliwangwang: function aliwangwang(color) {
    return /*#__PURE__*/React.createElement(AliwangwangOutlined, {
      style: {
        color: color
      }
    });
  },
  wechat: function wechat(color) {
    return /*#__PURE__*/React.createElement(WechatOutlined, {
      style: {
        color: color
      }
    });
  },
  weibo: function weibo(color) {
    return /*#__PURE__*/React.createElement(WeiboOutlined, {
      style: {
        color: color
      }
    });
  },
  warning: function warning(color) {
    return /*#__PURE__*/React.createElement(WarningOutlined, {
      style: {
        color: color
      }
    });
  },
  careUP: function careUP(color) {
    return /*#__PURE__*/React.createElement(CaretUpOutlined, {
      style: {
        color: color
      }
    });
  },
  careDown: function careDown(color) {
    return /*#__PURE__*/React.createElement(CaretDownOutlined, {
      style: {
        color: color
      }
    });
  },
  smile: function smile(color) {
    return /*#__PURE__*/React.createElement(SmileOutlined, {
      style: {
        color: color
      }
    });
  }
};
var iconColorList = ['#cf1322', '#fadb14', '#08979c', '#096dd9', '#000000'];

var cardTypeList = [{
  key: 'success',
  content: /*#__PURE__*/React.createElement(CheckCircleOutlined, null),
  description: 'success'
}, {
  key: 'info',
  content: /*#__PURE__*/React.createElement(InfoCircleOutlined, null),
  description: 'info'
}, {
  key: 'warning',
  content: /*#__PURE__*/React.createElement(ExclamationCircleOutlined, null),
  description: 'warning'
}, {
  key: 'error',
  content: /*#__PURE__*/React.createElement(CloseCircleOutlined, null),
  description: 'error'
}];

var EditMenu$4 = function EditMenu(props) {
  var element = props.element;
  var editor = useSlate();

  var getCardTypeList = function getCardTypeList() {
    return /*#__PURE__*/React.createElement(Select, {
      selected: element.cardType,
      notNull: true,
      onChange: function onChange(key) {
        setCardType(editor, element, key);
      },
      buttons: cardTypeList
    });
  };

  var getIconList = function getIconList() {
    var buttons = [];

    for (var key in iconMap) {
      buttons.push({
        key: key,
        content: iconMap[key](element.iconColor),
        description: key
      });
    }

    return /*#__PURE__*/React.createElement(Select, {
      selected: element.icon,
      notNull: false,
      onChange: function onChange(key) {
        setIcon(editor, element, key);
      },
      buttons: buttons
    });
  };

  var getIconColorList = function getIconColorList() {
    var buttons = [];

    for (var i = 0; i < iconColorList.length; i++) {
      buttons.push({
        key: iconColorList[i],
        content: /*#__PURE__*/React.createElement(FontSizeOutlined, {
          style: {
            color: iconColorList[i]
          }
        }),
        description: iconColorList[i]
      });
    }

    return /*#__PURE__*/React.createElement(Select, {
      selected: element.iconColor,
      notNull: false,
      onChange: function onChange(key) {
        setIconColor(editor, element, key);
      },
      buttons: buttons
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, getCardTypeList(), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: '1px solid #f5f5f5'
    }
  }), getIconList(), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: '1px solid #f5f5f5'
    }
  }), getIconColorList());
};

var AddMenu$6 = function AddMenu(props) {
  var editor = useSlate();
  var element = props.element;
  return /*#__PURE__*/React.createElement(Button, {
    type: "text",
    icon: /*#__PURE__*/React.createElement(CreditCardOutlined, {
      style: {
        color: '#ad4e00'
      }
    }),
    style: {
      width: '100%',
      textAlign: 'left'
    },
    onMouseDown: function onMouseDown() {
      setCard(editor, element);
    }
  }, "\u5361\u7247");
};

var Element$6 = /*#__PURE__*/memo(function (props) {
  // 基础配置
  var attributes = props.attributes,
      children = props.children,
      element = props.element;
  var icon = null;

  if (element.icon && iconMap[element.icon]) {
    icon = iconMap[element.icon](element.iconColor);
  }

  return /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
    style: {
      paddingTop: '5px',
      paddingBottom: '5px'
    }
  }), /*#__PURE__*/React.createElement(Alert, {
    type: element.cardType,
    message: children,
    icon: icon,
    showIcon: !!icon
  }));
});

var withCard = function withCard(editor) {
  var isEmpty = editor.isEmpty;

  editor.isEmpty = function (element) {
    if (element.type === 'card') {
      return false;
    }

    return isEmpty(element);
  };

  return editor;
};

var Card = {
  type: 'card',
  IsBlock: true,
  AddMenu: AddMenu$6,
  EditMenu: EditMenu$4,
  Element: Element$6,
  Plugin: withCard
};

var setNodeTag$4 = function setNodeTag(editor, element, key, value) {
  var at = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (at) {
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: at
    });
  } else if (!element) {
    // 如果没有传入对象，则操作当前行
    Transforms.setNodes(editor, _defineProperty$2({}, key, value));
  } else {
    var checkedAt = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: checkedAt
    });
  }
};

var setImage = function setImage(editor, element, src) {
  if (element) {
    var at = ReactEditor.findPath(editor, element);
    var cardBlock = {
      type: 'image',
      src: src,
      width: 300,
      children: [{
        text: ''
      }]
    };
    Transforms.setNodes(editor, cardBlock, {
      at: at
    });
  }
}; // 插入图片，如果行是空的就在本行插入


var insertImage = function insertImage(editor, src) {
  var block = Editor.above(editor, {
    match: function match(n) {
      return Editor.isBlock(editor, n);
    }
  });

  if (!!block) {
    var _block = _slicedToArray(block, 1),
        element = _block[0];

    var image = {
      type: 'image',
      width: 300,
      src: src,
      children: [{
        text: ''
      }]
    };

    if (editor.isEmpty(element)) {
      Transforms.setNodes(editor, image);
    } else {
      Transforms.insertNodes(editor, image);
    }
  }
};

var getInsertImageCallBack = function getInsertImageCallBack(editor, element) {
  return function (src) {
    insertImage(editor, src);
  };
};

var setTextAlign$2 = function setTextAlign(editor, element, textAlign) {
  setNodeTag$4(editor, element, 'textAlign', textAlign);
};

var setWidth$1 = function setWidth(editor, element, width) {
  if (width < 40 || width > 2000) {
    return;
  }

  setNodeTag$4(editor, element, 'width', width);
};

var isImageUrl = function isImageUrl(url) {
  if (!url) return false;
  if (!isUrl(url)) return false;
  var ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};

var EditMenu$3 = function EditMenu(props) {
  var editor = useSlate();
  var element = props.element;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Select, {
    selected: element.textAlign,
    buttons: textAlignButtonList$2,
    onChange: function onChange(key) {
      setTextAlign$2(editor, element, key);
    }
  }), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: '1px solid #f5f5f5'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "small",
    type: "text",
    icon: /*#__PURE__*/React.createElement(MinusCircleOutlined, {
      style: {
        color: '#389e0d'
      }
    }),
    onMouseDown: function onMouseDown() {
      setWidth$1(editor, element, element.width - 20);
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "small",
    type: "text",
    icon: /*#__PURE__*/React.createElement(PlusCircleOutlined, {
      style: {
        color: '#f5222d'
      }
    }),
    onMouseDown: function onMouseDown() {
      setWidth$1(editor, element, element.width + 20);
    }
  }));
};

var AddMenu$5 = function AddMenu(props) {
  var editor = useSlate();
  var element = props.element;

  var URL = function URL(Props) {
    var _useState = useState(''),
        _useState2 = _slicedToArray(_useState, 2),
        value = _useState2[0],
        setValue = _useState2[1];

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-block',
        width: '280px'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      value: value,
      placeholder: "\u8F93\u5165\u56FE\u7247\u5730\u5740",
      onChange: function onChange(v) {
        return setValue(v.target.value);
      }
    })), "\xA0", /*#__PURE__*/React.createElement(Single, {
      selected: true,
      description: "\u4F7F\u7528\u56FE\u7247\u7684url",
      content: "\u786E\u8BA4",
      onClick: function onClick() {
        if (!isImageUrl(value)) {
          message.error('输入有效的图片地址');
          return;
        }

        setImage(editor, element, value);
      }
    }));
  };

  var edit = function edit() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(URL, null));
  };

  return /*#__PURE__*/React.createElement(Popover, {
    content: edit(),
    placement: "topRight"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "text",
    icon: /*#__PURE__*/React.createElement(PictureOutlined, {
      style: {
        color: '#fadb14'
      }
    }),
    style: {
      width: '100%',
      textAlign: 'left'
    }
  }, "\u56FE\u7247"));
};

var textAlignButtonList$2 = [{
  key: 'left',
  content: /*#__PURE__*/React.createElement(AlignLeftOutlined, null),
  description: '左对齐'
}, {
  key: 'center',
  content: /*#__PURE__*/React.createElement(AlignCenterOutlined, null),
  description: '居中'
}, {
  key: 'right',
  content: /*#__PURE__*/React.createElement(AlignRightOutlined, null),
  description: '右对齐'
}];

var config = {
  fallback: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=='
};

var Element$5 = /*#__PURE__*/memo(function (props) {
  // 基础配置
  var attributes = props.attributes,
      children = props.children,
      element = props.element;
  return /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
    style: {
      textAlign: element.textAlign || 'left'
    }
  }), /*#__PURE__*/React.createElement(Image$1, {
    src: element.src,
    style: {
      maxWidth: '100%',
      width: "".concat(element.width, "px")
    },
    fallback: config.fallback
  }), children);
});

var withImage = function withImage(editor) {
  var isEmpty = editor.isEmpty,
      isVoid = editor.isVoid,
      insertData = editor.insertData;

  editor.isEmpty = function (element) {
    if (element.type === 'image') {
      return false;
    }

    return isEmpty(element);
  };

  editor.isVoid = function (element) {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = function (data) {
    var files = data.files;

    if (files && files.length > 0) {
      var _iterator = _createForOfIteratorHelper(files),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var file = _step.value;

          var _file$type$split = file.type.split('/'),
              _file$type$split2 = _slicedToArray(_file$type$split, 1),
              mime = _file$type$split2[0];

          if (mime === 'image') {
            var onUploadImage = editor.param.onUploadImage;

            if (onUploadImage) {
              var block = Editor.above(editor, {
                match: function match(n) {
                  return Editor.isBlock(editor, n);
                }
              });

              if (!!block) {
                var _block = _slicedToArray(block, 1),
                    element = _block[0];

                onUploadImage(file, getInsertImageCallBack(editor, element));
              }
            }

            return;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    insertData(data);
  };

  return editor;
};

var Image = {
  type: 'image',
  IsBlock: true,
  AddMenu: AddMenu$5,
  EditMenu: EditMenu$3,
  Element: Element$5,
  Plugin: withImage
};

var setTable = function setTable(editor, element, r, c) {
  if (element) {
    var at = ReactEditor.findPath(editor, element);
    var rows = [];

    for (var i = 0; i < r; i++) {
      var cells = [];

      for (var j = 0; j < c; j++) {
        cells.push({
          type: 'table-cell',
          width: 100,
          // 默认长度100
          children: [{
            type: 'paragraph',
            children: [{
              text: ''
            }]
          }]
        });
      }

      rows.push({
        type: 'table-row',
        children: cells
      });
    }

    var tableBlock = {
      type: 'table',
      children: rows
    };
    Transforms.removeNodes(editor, {
      at: at
    });
    Transforms.insertNodes(editor, tableBlock, {
      at: at
    });
  }
};

var addRow = function addRow(editor, cellPath) {
  var isNext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var table = getTableFromCell(editor, cellPath);
  var at = Path.parent(cellPath);

  if (isNext) {
    at = Path.next(at);
  }

  var tablePath = Path.parent(at);
  var atRow = at[at.length - 1];
  var mergedCols = []; // 判断是否需要增加span

  for (var r = 0; r < atRow; r++) {
    var row = table.children[r];

    for (var c = 0; c < row.children.length; c++) {
      var cellElement = row.children[c];

      if (!cellElement.rowSpan || r + cellElement.rowSpan <= atRow) {
        continue;
      }

      Transforms.setNodes(editor, _defineProperty$2({}, 'rowSpan', cellElement.rowSpan + 1), {
        at: [].concat(_toConsumableArray(tablePath), [r, c])
      });
      var colSpan = 1;

      if (cellElement.colSpan) {
        colSpan = cellElement.colSpan;
      } // 计算所有需要merged的cell


      for (var offset = 0; offset < colSpan; offset++) {
        mergedCols.push(c + offset);
      }
    }
  }

  var cells = [];
  var col = 0;

  var _iterator = _createForOfIteratorHelper(table.children[0].children),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var cell = _step.value;
      var newCell = {
        type: 'table-cell',
        width: cell.width,
        children: [{
          type: 'paragraph',
          children: [{
            text: ''
          }]
        }]
      };

      if (mergedCols.indexOf(col) > -1) {
        newCell = {
          type: 'table-cell-merged',
          width: cell.width,
          children: [{
            text: ''
          }]
        };
      }

      cells.push(newCell);
      col++;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var emptyRow = {
    type: 'table-row',
    children: cells
  };
  Transforms.insertNodes(editor, emptyRow, {
    at: at
  });
};

var deleteRow = function deleteRow(editor, cellPath) {
  var table = getTableFromCell(editor, cellPath); // 只有表格行数大于1才允许删除行

  if (table.children.length <= 1) {
    return;
  }

  var at = Path.parent(cellPath);
  var atRow = at[at.length - 1];
  var tablePath = Path.parent(at); // 计算span的变化
  // 判断是否需要减少span

  for (var r = 0; r <= atRow; r++) {
    var row = table.children[r];

    for (var c = 0; c < row.children.length; c++) {
      var cellElement = row.children[c];

      if (!cellElement.rowSpan || r + cellElement.rowSpan <= atRow) {
        continue;
      }

      var newRowSpan = cellElement.rowSpan - 1;

      if (newRowSpan === 1) {
        newRowSpan = null;
      } // 如果当前行就有span


      if (r === atRow) {
        var newCell = {
          type: 'table-cell',
          width: cellElement.width,
          children: cellElement.children
        };

        if (newRowSpan) {
          newCell.rowSpan = newRowSpan;
        }

        if (cellElement.colSpan) {
          newCell.colSpan = cellElement.colSpan;
        }

        Transforms.removeNodes(editor, {
          at: [].concat(_toConsumableArray(tablePath), [r + 1, c])
        });
        Transforms.insertNodes(editor, newCell, {
          at: [].concat(_toConsumableArray(tablePath), [r + 1, c])
        });
      } else {
        Transforms.setNodes(editor, _defineProperty$2({}, 'rowSpan', newRowSpan), {
          at: [].concat(_toConsumableArray(tablePath), [r, c])
        });
      }
    }
  }

  Transforms.removeNodes(editor, {
    at: at
  });
};

var addCol = function addCol(editor, cellPath) {
  var isNext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var table = getTableFromCell(editor, cellPath);

  var _getCellPathInTable = getCellPathInTable(cellPath),
      _getCellPathInTable2 = _slicedToArray(_getCellPathInTable, 2),
      col = _getCellPathInTable2[1];

  var tablePath = Path.parent(Path.parent(cellPath));

  if (isNext) {
    col++;
  }

  var mergedRows = []; // 判断是否需要增加span

  for (var r = 0; r < table.children.length; r++) {
    var row = table.children[r];

    for (var c = 0; c < col; c++) {
      var cellElement = row.children[c];

      if (!cellElement.colSpan || c + cellElement.colSpan <= col) {
        continue;
      }

      Transforms.setNodes(editor, _defineProperty$2({}, 'colSpan', cellElement.colSpan + 1), {
        at: [].concat(_toConsumableArray(tablePath), [r, c])
      });
      var rowSpan = 1;

      if (cellElement.rowSpan) {
        rowSpan = cellElement.rowSpan;
      } // 计算所有需要merged的cell


      for (var offset = 0; offset < rowSpan; offset++) {
        mergedRows.push(r + offset);
      }
    }
  }

  for (var i = 0; i < table.children.length; i++) {
    var at = [].concat(_toConsumableArray(tablePath), [i, col]);
    var emptyCol = {
      type: 'table-cell',
      width: 100,
      children: [{
        type: 'paragraph',
        children: [{
          text: ''
        }]
      }]
    };

    if (mergedRows.indexOf(i) > -1) {
      emptyCol = {
        type: 'table-cell-merged',
        width: 100,
        children: [{
          text: ''
        }]
      };
    }

    Transforms.insertNodes(editor, emptyCol, {
      at: at
    });
  }
};

var deleteCol = function deleteCol(editor, cellPath) {
  var row = getRowFromCell(editor, cellPath); // 大于1列才能删除

  if (row.children.length <= 1) {
    return;
  }

  var table = getTableFromCell(editor, cellPath);

  var _getCellPathInTable3 = getCellPathInTable(cellPath),
      _getCellPathInTable4 = _slicedToArray(_getCellPathInTable3, 2),
      atCol = _getCellPathInTable4[1];

  var tablePath = Path.parent(Path.parent(cellPath)); // 计算span的变化
  // 判断是否需要减少span

  for (var r = 0; r < table.children.length; r++) {
    var _row = table.children[r];

    for (var c = 0; c <= atCol; c++) {
      var cellElement = _row.children[c];

      if (!cellElement.colSpan || c + cellElement.colSpan <= atCol) {
        continue;
      }

      var newColSpan = cellElement.colSpan - 1;

      if (newColSpan === 1) {
        newColSpan = null;
      } // 如果当前行就有span


      if (c === atCol) {
        var newCell = {
          type: 'table-cell',
          width: cellElement.width,
          children: cellElement.children
        };

        if (newColSpan) {
          newCell.colSpan = newColSpan;
        }

        if (cellElement.rowSpan) {
          newCell.rowSpan = cellElement.rowSpan;
        }

        Transforms.removeNodes(editor, {
          at: [].concat(_toConsumableArray(tablePath), [r, c + 1])
        });
        Transforms.insertNodes(editor, newCell, {
          at: [].concat(_toConsumableArray(tablePath), [r, c + 1])
        });
      } else {
        Transforms.setNodes(editor, _defineProperty$2({}, 'colSpan', newColSpan), {
          at: [].concat(_toConsumableArray(tablePath), [r, c])
        });
      }
    }
  } // 删除对应列


  for (var i = 0; i < table.children.length; i++) {
    var at = [].concat(_toConsumableArray(tablePath), [i, atCol]);
    Transforms.removeNodes(editor, {
      at: at
    });
  }
};

var setColWidth = function setColWidth(editor, cellPath, width) {
  // 单元格最小宽度为40
  if (width < 40) {
    return;
  }

  var table = getTableFromCell(editor, cellPath);

  var _getCellPathInTable5 = getCellPathInTable(cellPath),
      _getCellPathInTable6 = _slicedToArray(_getCellPathInTable5, 2),
      c = _getCellPathInTable6[1];

  var tablePath = Path.parent(Path.parent(cellPath));

  for (var i = 0; i < table.children.length; i++) {
    var at = [].concat(_toConsumableArray(tablePath), [i, c]);
    Transforms.setNodes(editor, _defineProperty$2({}, 'width', width), {
      at: at
    });
  }
}; // 拆分单元格


var splitCells = function splitCells(editor) {
  var _Transforms$setNodes6;

  var selection = editor.selection; // 鼠标必须是单点

  if (!selection || !Range.isCollapsed(selection)) {
    return;
  }

  var anchor = selection.anchor,
      focus = selection.focus;

  var _Editor$node = Editor.node(editor, {}),
      _Editor$node2 = _slicedToArray(_Editor$node, 1),
      nodeEntry = _Editor$node2[0];

  var common = Node.common(nodeEntry, anchor.path, focus.path);

  var _common = _slicedToArray(common, 2),
      path = _common[1]; // 获得cellPath


  var cellPath = _toConsumableArray(path);

  while (true) {
    // 如果不是在同一个table中，不再继续处理
    if (cellPath.length < 3) {
      return;
    }

    var n = Node.get(nodeEntry, cellPath);

    if (n.type && n.type == 'table-cell') {
      break;
    }

    cellPath = Path.parent(cellPath);
  }

  var tablePath = Path.parent(Path.parent(cellPath));
  var cellInTable = getCellPathInTable(cellPath);
  var tableElement = Node.get(nodeEntry, tablePath);
  var cellElement = Node.get(tableElement, cellInTable);

  if (!cellElement.rowSpan && !cellElement.colSpan) {
    return;
  } // 去掉span


  Transforms.setNodes(editor, (_Transforms$setNodes6 = {}, _defineProperty$2(_Transforms$setNodes6, 'rowSpan', null), _defineProperty$2(_Transforms$setNodes6, 'colSpan', null), _Transforms$setNodes6), {
    at: cellPath
  }); // 插入数据

  var rowSpan = cellElement.rowSpan ? cellElement.rowSpan : 1;
  var colSpan = cellElement.colSpan ? cellElement.colSpan : 1;

  for (var r = cellInTable[0]; r <= cellInTable[0] + rowSpan - 1; r++) {
    for (var c = cellInTable[1]; c <= cellInTable[1] + colSpan - 1; c++) {
      // 跳过第一个
      if (r === cellInTable[0] && c === cellInTable[1]) {
        continue;
      }

      var current = Node.get(tableElement, [r, c]);
      var newCell = {
        type: 'table-cell',
        width: current.width,
        children: [{
          type: 'paragraph',
          children: [{
            text: ''
          }]
        }]
      }; // 继承所有宽度数据，其余都删除掉

      Transforms.removeNodes(editor, {
        at: [].concat(_toConsumableArray(tablePath), [r, c])
      });
      Transforms.insertNodes(editor, newCell, {
        at: [].concat(_toConsumableArray(tablePath), [r, c])
      });
    }
  }
}; // 合并单元格


var mergeCells = function mergeCells(editor) {
  var tableSelection = editor.tableSelection;

  if (!tableSelection) {
    return;
  }

  var start = tableSelection.start,
      end = tableSelection.end;
  var startInTable = getCellPathInTable(start);
  var endInTable = getCellPathInTable(end); // 其余单元格全部设置成空

  var tablePath = Path.parent(Path.parent(start));

  var _Editor$node3 = Editor.node(editor, {}),
      _Editor$node4 = _slicedToArray(_Editor$node3, 1),
      nodeEntry = _Editor$node4[0];

  var tableElement = Node.get(nodeEntry, tablePath);
  var children = [];
  var startElement = Node.get(tableElement, startInTable);
  children.push.apply(children, _toConsumableArray(startElement.children));

  for (var r = startInTable[0]; r <= endInTable[0]; r++) {
    for (var c = startInTable[1]; c <= endInTable[1]; c++) {
      // 跳过第一个
      if (r === startInTable[0] && c === startInTable[1]) {
        continue;
      }

      var current = Node.get(tableElement, [r, c]);

      if (current.type === 'table-cell' && Node.string(current).length > 0) {
        children.push.apply(children, _toConsumableArray(current.children));
      }

      var cellMerged = {
        type: 'table-cell-merged',
        width: current.width,
        children: [{
          text: ''
        }]
      }; // 继承所有宽度数据，其余都删除掉

      Transforms.removeNodes(editor, {
        at: [].concat(_toConsumableArray(tablePath), [r, c])
      });
      Transforms.insertNodes(editor, cellMerged, {
        at: [].concat(_toConsumableArray(tablePath), [r, c])
      });
    }
  } // 设置初始单元格的span


  var rowSpan = endInTable[0] - startInTable[0] + 1;
  var colSpan = endInTable[1] - startInTable[1] + 1;
  var newCell = {
    type: 'table-cell',
    width: startElement.width,
    children: children
  };

  if (rowSpan > 1) {
    newCell.rowSpan = rowSpan;
  }

  if (colSpan > 1) {
    newCell.colSpan = colSpan;
  }

  Transforms.removeNodes(editor, {
    at: start
  });
  Transforms.insertNodes(editor, newCell, {
    at: start
  });
};

var clearTableSelection = function clearTableSelection(editor, tableSelection) {
  var start = tableSelection.start,
      end = tableSelection.end;
  var startInTable = getCellPathInTable(start);
  var endInTable = getCellPathInTable(end); // 其余单元格全部设置成空

  var tablePath = Path.parent(Path.parent(start));
  var tableElement = Node.get(editor, tablePath);

  for (var r = startInTable[0]; r <= endInTable[0]; r++) {
    for (var c = startInTable[1]; c <= endInTable[1]; c++) {
      var current = Node.get(tableElement, [r, c]);

      var newCell = _objectSpread2({}, current); // 继承所有数据，内容都删除掉


      if (newCell.type === 'table-cell') {
        newCell.children = [{
          type: "paragraph",
          children: [{
            text: ''
          }]
        }];
      } else {
        newCell.children = [{
          text: ''
        }];
      }

      Transforms.removeNodes(editor, {
        at: [].concat(_toConsumableArray(tablePath), [r, c])
      });
      Transforms.insertNodes(editor, newCell, {
        at: [].concat(_toConsumableArray(tablePath), [r, c])
      });
    }
  }
};

var getAllSpanCells = function getAllSpanCells(tableElement) {
  var mergedCellRowCols = [];

  for (var r = 0; r < tableElement.children.length; r++) {
    var rowElement = tableElement.children[r];

    for (var c = 0; c < rowElement.children.length; c++) {
      var cellElement = rowElement.children[c];

      if (!cellElement.rowSpan && !cellElement.colSpan) {
        continue;
      }

      mergedCellRowCols.push([[r - 1, c - 1], [r + (cellElement.rowSpan ? cellElement.rowSpan : 1) - 1, c + (cellElement.colSpan ? cellElement.colSpan : 1) - 1]]);
    }
  }

  return mergedCellRowCols;
}; // 计算表格内的选择情况


var getTableSelection = function getTableSelection(editor) {
  var selection = editor.selection;

  if (!selection || Range.isCollapsed(selection)) {
    return null;
  }

  var anchor = selection.anchor,
      focus = selection.focus;

  var _Editor$node5 = Editor.node(editor, {}),
      _Editor$node6 = _slicedToArray(_Editor$node5, 1),
      nodeEntry = _Editor$node6[0];

  var common = Node.common(nodeEntry, anchor.path, focus.path);

  var _common2 = _slicedToArray(common, 2),
      path = _common2[1]; // 获得tablePath


  var tablePath = _toConsumableArray(path);

  while (true) {
    // 如果不是在同一个table中，不再继续处理
    if (tablePath.length == 0) {
      return null;
    }

    var n = Node.get(nodeEntry, tablePath);

    if (n.type && n.type == 'table') {
      break;
    }

    tablePath = Path.parent(tablePath);
  }

  var tableElement = Node.get(nodeEntry, tablePath);
  var mergedCellRowCols = getAllSpanCells(tableElement);
  var row = tableElement.children.length;
  var col = tableElement.children[0].children.length;
  var level = tablePath.length;
  var anchorPathInTable = [anchor.path[level], anchor.path[level + 1]];
  var focusPathInTable = [focus.path[level], focus.path[level + 1]];

  if (Path.equals(anchorPathInTable, focusPathInTable)) {
    return null;
  }

  var _ref = [anchorPathInTable[0], focusPathInTable[0]],
      minRow = _ref[0],
      maxRow = _ref[1];

  if (anchorPathInTable[0] > focusPathInTable[0]) {
    var _ref2 = [focusPathInTable[0], anchorPathInTable[0]];
    minRow = _ref2[0];
    maxRow = _ref2[1];
  }

  var _ref3 = [anchorPathInTable[1], focusPathInTable[1]],
      minCol = _ref3[0],
      maxCol = _ref3[1];

  if (anchorPathInTable[1] > focusPathInTable[1]) {
    var _ref4 = [focusPathInTable[1], anchorPathInTable[1]];
    minCol = _ref4[0];
    maxCol = _ref4[1];
  }

  var _ref5 = [minRow - 1, minCol - 1];
  minRow = _ref5[0];
  minCol = _ref5[1];

  while (true) {
    var _getCuerrentSelection = getCuerrentSelection([minRow, minCol, maxRow, maxCol], mergedCellRowCols, row, col),
        _getCuerrentSelection2 = _slicedToArray(_getCuerrentSelection, 4),
        minR = _getCuerrentSelection2[0],
        minC = _getCuerrentSelection2[1],
        maxR = _getCuerrentSelection2[2],
        maxC = _getCuerrentSelection2[3];

    var change = false;

    if (minRow > minR) {
      minRow = minR;
      change = true;
    }

    if (maxRow < maxR) {
      maxRow = maxR;
      change = true;
    }

    if (minCol > minC) {
      minCol = minC;
      change = true;
    }

    if (maxCol < maxC) {
      maxCol = maxC;
      change = true;
    }

    if (!change) {
      break;
    }
  }

  return {
    start: [].concat(_toConsumableArray(tablePath), [minRow + 1, minCol + 1]),
    end: [].concat(_toConsumableArray(tablePath), [maxRow, maxCol])
  };
};

var isCellInTableSelection = function isCellInTableSelection(editor, element) {
  var tableSelection = editor.tableSelection;

  if (!tableSelection) {
    return false;
  }

  var at = ReactEditor.findPath(editor, element);
  var start = tableSelection.start,
      end = tableSelection.end; // 判断有没有在一个table中

  var _Editor$node7 = Editor.node(editor, {}),
      _Editor$node8 = _slicedToArray(_Editor$node7, 1),
      nodeEntry = _Editor$node8[0];

  var common = Node.common(nodeEntry, at, start);

  var _common3 = _slicedToArray(common, 2),
      path = _common3[1]; // 获得tablePath


  var tablePath = _toConsumableArray(path);

  while (true) {
    // 如果不是在同一个table中，不再继续处理
    if (tablePath.length == 0) {
      return false;
    }

    var n = Node.get(nodeEntry, tablePath);

    if (n.type && n.type == 'table') {
      break;
    }

    tablePath = Path.parent(tablePath);
  } // 防止表格嵌套表格导致错误识别


  if (tablePath.length + 2 != at.length || tablePath.length + 2 != start.length) {
    return false;
  }

  var atInTable = getCellPathInTable(at);
  var startInTable = getCellPathInTable(start);
  var endInTable = getCellPathInTable(end);
  return startInTable[0] <= atInTable[0] && startInTable[1] <= atInTable[1] && atInTable[0] <= endInTable[0] && atInTable[1] <= endInTable[1];
};

var getCuerrentSelection = function getCuerrentSelection(current, mergedCellRowCols, row, col) {
  var _current = _slicedToArray(current, 4),
      minRow = _current[0],
      minCol = _current[1],
      maxRow = _current[2],
      maxCol = _current[3]; // 向上


  for (var ir = minRow; ir >= -1; ir--) {
    minRow = ir;

    if (!isLineCrossAnyCells([[ir, minCol], [ir, maxCol]], mergedCellRowCols)) {
      break;
    }
  } // 向下


  for (var ar = maxRow; ar <= row; ar++) {
    maxRow = ar;

    if (!isLineCrossAnyCells([[ar, minCol], [ar, maxCol]], mergedCellRowCols)) {
      break;
    }
  } // 向左


  for (var ic = minCol; ic >= -1; ic--) {
    minCol = ic;

    if (!isLineCrossAnyCells([[minRow, ic], [maxRow, ic]], mergedCellRowCols)) {
      break;
    }
  } // 向右


  for (var ac = maxCol; ac <= col; ac++) {
    maxCol = ac;

    if (!isLineCrossAnyCells([[minRow, ac], [maxRow, ac]], mergedCellRowCols)) {
      break;
    }
  }

  return [minRow, minCol, maxRow, maxCol];
};

var isLineCrossAnyCells = function isLineCrossAnyCells(line, cells) {
  var _iterator2 = _createForOfIteratorHelper(cells),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var cell = _step2.value;

      if (isLineCrossCell(line, cell)) {
        return true;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return false;
};

var isLineCrossCell = function isLineCrossCell(line, cell) {
  var _line = _slicedToArray(line, 2),
      lineStart = _line[0],
      lineEnd = _line[1];

  var _cell = _slicedToArray(cell, 2),
      cellStart = _cell[0],
      cellEnd = _cell[1];

  if (lineStart[0] >= cellEnd[0] || lineEnd[0] <= cellStart[0]) {
    return false;
  }

  if (lineStart[1] >= cellEnd[1] || lineEnd[1] <= cellStart[1]) {
    return false;
  }

  return true;
};

var getRowFromCell = function getRowFromCell(editor, cellPath) {
  var _Editor$node9 = Editor.node(editor, []),
      _Editor$node10 = _slicedToArray(_Editor$node9, 1),
      nodeEntry = _Editor$node10[0];

  var rowPath = Path.parent(cellPath);
  return Node.get(nodeEntry, rowPath);
};

var getTableFromCell = function getTableFromCell(editor, cellPath) {
  var _Editor$node11 = Editor.node(editor, []),
      _Editor$node12 = _slicedToArray(_Editor$node11, 1),
      nodeEntry = _Editor$node12[0];

  var rowPath = Path.parent(cellPath);
  var tablePath = Path.parent(rowPath);
  return Node.get(nodeEntry, tablePath);
};

var getCellPathInTable = function getCellPathInTable(path) {
  var len = path.length;
  return [path[len - 2], path[len - 1]];
};

var AddMenu$4 = function AddMenu(props) {
  var editor = useSlate();
  var element = props.element;

  var _useState = useState('0行0列'),
      _useState2 = _slicedToArray(_useState, 2),
      title = _useState2[0],
      settitle = _useState2[1];

  var onChange = function onChange(r, c) {
    settitle("".concat(r, "\u884C").concat(c, "\u5217"));
  };

  var onClick = function onClick(r, c) {
    setTable(editor, element, r, c);
  };

  return /*#__PURE__*/React.createElement(Popover, {
    title: title,
    content: /*#__PURE__*/React.createElement(TableInput, {
      onChange: onChange,
      onClick: onClick
    }),
    placement: "topRight"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "text",
    icon: /*#__PURE__*/React.createElement(TableOutlined, {
      style: {
        color: '#91d5ff'
      }
    }),
    style: {
      width: '100%',
      textAlign: 'left'
    }
  }, "\u8868\u683C"));
};

var Element$4 = /*#__PURE__*/memo(function (props) {
  // 基础配置
  var attributes = props.attributes,
      children = props.children,
      element = props.element;
  var editor = useSlate();
  editor.tableSelection = getTableSelection(editor);
  var width = 0;
  var tr0 = element.children[0];

  for (var i = 0; i < tr0.children.length; i++) {
    width += tr0.children[i].width;
  }

  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '10px',
      marginBottom: '10px',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: 'collapse',
      width: "".concat(width, "px")
    }
  }, /*#__PURE__*/React.createElement("tbody", attributes, children)));
});

var RowElement = function RowElement(props) {
  // 基础配置
  var attributes = props.attributes,
      children = props.children,
      element = props.element;
  var editor = useSlate();
  var rowPath = ReactEditor.findPath(editor, element);
  var rowPathInTable = rowPath[rowPath.length - 1];

  var colEditor = function colEditor() {
    if (rowPathInTable !== 0) {
      return null;
    }

    var cells = [/*#__PURE__*/React.createElement("td", {
      key: "-1",
      style: {
        width: '7px',
        height: '6px'
      }
    })];

    var editorColMenu = function editorColMenu(cellSort, width) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        size: "small",
        type: "text",
        icon: /*#__PURE__*/React.createElement(InsertRowLeftOutlined, {
          style: {
            color: '#096dd9'
          }
        }),
        onMouseDown: function onMouseDown() {
          addCol(editor, [].concat(_toConsumableArray(rowPath), [cellSort]), false);
        }
      }), /*#__PURE__*/React.createElement(Button, {
        size: "small",
        type: "text",
        icon: /*#__PURE__*/React.createElement(MinusCircleOutlined, {
          style: {
            color: '#389e0d'
          }
        }),
        onMouseDown: function onMouseDown() {
          setColWidth(editor, [].concat(_toConsumableArray(rowPath), [cellSort]), width - 20);
        }
      }), /*#__PURE__*/React.createElement(Button, {
        size: "small",
        type: "text",
        icon: /*#__PURE__*/React.createElement(DeleteColumnOutlined, {
          style: {
            color: '#f5222d'
          }
        }),
        onMouseDown: function onMouseDown() {
          deleteCol(editor, [].concat(_toConsumableArray(rowPath), [cellSort]));
        }
      }), /*#__PURE__*/React.createElement(Button, {
        size: "small",
        type: "text",
        icon: /*#__PURE__*/React.createElement(PlusCircleOutlined, {
          style: {
            color: '#389e0d'
          }
        }),
        onMouseDown: function onMouseDown() {
          setColWidth(editor, [].concat(_toConsumableArray(rowPath), [cellSort]), width + 20);
        }
      }), /*#__PURE__*/React.createElement(Button, {
        size: "small",
        type: "text",
        icon: /*#__PURE__*/React.createElement(InsertRowRightOutlined, {
          style: {
            color: '#096dd9'
          }
        }),
        onMouseDown: function onMouseDown() {
          addCol(editor, [].concat(_toConsumableArray(rowPath), [cellSort]), true);
        }
      }), /*#__PURE__*/React.createElement("br", null));
    };

    for (var i = 0; i < element.children.length; i++) {
      var width = element.children[i].width;
      cells.push( /*#__PURE__*/React.createElement(Popover, {
        key: i,
        content: editorColMenu(i, width),
        placement: "topLeft"
      }, /*#__PURE__*/React.createElement("td", {
        key: i,
        style: {
          width: "".concat(width, "px"),
          border: '1px solid #d9d9d9',
          backgroundColor: '#f0f0f0',
          cursor: 'pointer'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: '6px'
        }
      }))));
    }

    return /*#__PURE__*/React.createElement("tr", {
      contentEditable: false
    }, cells);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, colEditor(), /*#__PURE__*/React.createElement("tr", _extends({}, attributes, {
    style: {
      textAlign: 'left',
      border: '1px solid #d9d9d9'
    }
  }), children));
};

var RowEditor = function RowEditor(props) {
  // 基础配置
  var element = props.element;
  var editor = useSlate();
  var cellPath = ReactEditor.findPath(editor, element);

  var _getCellPathInTable = getCellPathInTable(cellPath),
      _getCellPathInTable2 = _slicedToArray(_getCellPathInTable, 2),
      c = _getCellPathInTable2[1];

  if (c !== 0) {
    return null;
  }

  var editorRowMenu = function editorRowMenu() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      size: "small",
      type: "text",
      icon: /*#__PURE__*/React.createElement(InsertRowAboveOutlined, {
        style: {
          color: '#096dd9'
        }
      }),
      onMouseDown: function onMouseDown() {
        return addRow(editor, cellPath, false);
      }
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Button, {
      size: "small",
      type: "text",
      icon: /*#__PURE__*/React.createElement(DeleteRowOutlined, {
        style: {
          color: '#f5222d'
        }
      }),
      onMouseDown: function onMouseDown() {
        return deleteRow(editor, cellPath);
      }
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Button, {
      size: "small",
      type: "text",
      icon: /*#__PURE__*/React.createElement(InsertRowBelowOutlined, {
        style: {
          color: '#096dd9'
        }
      }),
      onMouseDown: function onMouseDown() {
        return addRow(editor, cellPath, true);
      }
    }));
  };

  return /*#__PURE__*/React.createElement(Popover, {
    content: editorRowMenu(),
    placement: "leftTop"
  }, /*#__PURE__*/React.createElement("td", {
    contentEditable: false,
    style: {
      border: '1px solid #d9d9d9',
      backgroundColor: '#f0f0f0',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '6px'
    }
  })));
};

var CellElement = function CellElement(props) {
  // 基础配置
  var attributes = props.attributes,
      children = props.children,
      element = props.element;
  var colSpan = element.colSpan,
      rowSpan = element.rowSpan;
  var editor = useSlate();
  var style = {
    border: '1px solid #d9d9d9',
    verticalAlign: 'top',
    textAlign: 'left'
  };

  if (isCellInTableSelection(editor, element)) {
    style.backgroundColor = '#f0f5ff';
  }

  var tdProps = {
    style: style
  };
  var width = element.width;

  if (colSpan) {
    tdProps.colSpan = colSpan; // 计算横向合并后的长度

    var _Editor$node = Editor.node(editor, {}),
        _Editor$node2 = _slicedToArray(_Editor$node, 1),
        nodeEntry = _Editor$node2[0];

    var at = ReactEditor.findPath(editor, element);
    var next = at;

    for (var c = 2; c <= colSpan; c++) {
      next = Path.next(next);
      var nextCell = Node.get(nodeEntry, next);
      width += nextCell.width + 1;
    }
  }

  if (rowSpan) {
    tdProps.rowSpan = rowSpan;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RowEditor, props), /*#__PURE__*/React.createElement("td", tdProps, /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
    style: {
      padding: '8px',
      width: "".concat(width, "px"),
      overflow: 'auto'
    }
  }), children)));
};

var MergedElement = function MergedElement(props) {
  // 基础配置
  var attributes = props.attributes,
      children = props.children;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RowEditor, props), /*#__PURE__*/React.createElement("td", _extends({}, attributes, {
    style: {
      display: 'none'
    }
  }), children));
};

var withTable = function withTable(editor) {
  var isEmpty = editor.isEmpty,
      getFragment = editor.getFragment,
      insertFragment = editor.insertFragment,
      deleteFragment = editor.deleteFragment; // 记录表格内被选中的单元格

  editor.tableSelection = null;

  editor.deleteFragment = function () {
    var tableSelection = editor.tableSelection; // 如果选中了表格的区域，则清空内容

    if (tableSelection) {
      clearTableSelection(editor, tableSelection);
      return;
    }

    var selection = editor.selection;

    if (selection) {
      var anchor = selection.anchor,
          focus = selection.focus;
      var common = Node.common(editor, anchor.path, focus.path);

      if (common[1].length > 2) {
        deleteFragment();
        return;
      }

      var startEl = Node.get(editor, [anchor.path[0]]);
      var endEl = Node.get(editor, [focus.path[0]]);

      if (startEl.type === 'table' || endEl.type === 'table') {
        message.error('选中区域边缘包含表格，无法删除');
        return;
      }
    }

    deleteFragment();
  };

  editor.insertFragment = function (node) {
    if (editor.tableSelection) {
      message.error('禁止向table拷贝');
      return;
    }

    if (!Array.isArray(node)) {
      insertFragment(node);
      return;
    }

    var hasTable = false;

    var _iterator = _createForOfIteratorHelper(node),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var child = _step.value;

        if (child.type === 'table') {
          hasTable = true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (!hasTable) {
      insertFragment(node);
      return;
    } // 只允许在第一层空位置插入表格


    var selection = editor.selection;

    if (selection) {
      if (!Range.isCollapsed(selection)) {
        message.error('拷贝内容含有表格，只能粘贴到光标上');
        return;
      }
    }

    var anchor = selection.anchor;
    Transforms.insertNodes(editor, node, {
      at: [anchor.path[0] + 1]
    });
  }; // 重写部分拷贝方法，保证纯paragraph拷贝时，不拷贝父元素属性


  editor.getFragment = function () {
    // 如果表格有被选中的，那么复制为选中大小的表格
    if (editor.tableSelection) {
      var _editor$tableSelectio = editor.tableSelection,
          start = _editor$tableSelectio.start,
          end = _editor$tableSelectio.end;
      var tablePath = Path.parent(Path.parent(start));

      var _getCellPathInTable = getCellPathInTable(start),
          _getCellPathInTable2 = _slicedToArray(_getCellPathInTable, 2),
          startRow = _getCellPathInTable2[0],
          startCol = _getCellPathInTable2[1];

      var _getCellPathInTable3 = getCellPathInTable(end),
          _getCellPathInTable4 = _slicedToArray(_getCellPathInTable3, 2),
          endRow = _getCellPathInTable4[0],
          endCol = _getCellPathInTable4[1];

      var rows = [];

      for (var r = startRow; r <= endRow; r++) {
        var cells = [];

        for (var c = startCol; c <= endCol; c++) {
          var cell = Node.get(editor, [].concat(_toConsumableArray(tablePath), [r, c]));
          cells.push(cell);
        }

        var row = {
          type: 'table-row',
          children: cells
        };
        rows.push(row);
      }

      return [{
        type: 'table',
        children: rows
      }];
    }

    var fragment = getFragment();

    if (fragment.length < 2) {
      return fragment;
    } // 如果包含部分table，则不会拷贝上table的内容


    if (fragment[0].type === 'table' || fragment[fragment.length - 1].type === 'table') {
      var newFagment = [];

      for (var i = 0; i < fragment.length; i++) {
        if (i != 0 && i != fragment.length - 1) {
          newFagment.push(fragment[i]);
          continue;
        }

        if (fragment[i].type !== 'table') {
          newFagment.push(fragment[i]);
        }
      }

      return newFagment;
    }

    return fragment;
  };

  editor.isEmpty = function (element) {
    if (element.type === 'table') {
      return false;
    }

    return isEmpty(element);
  };

  return editor;
};

var withTableRow = function withTableRow(editor) {
  return editor;
};

var withTableCell = function withTableCell(editor) {
  var deleteBackward = editor.deleteBackward,
      deleteForward = editor.deleteForward;

  editor.deleteBackward = function (unit) {
    var selection = editor.selection;

    if (selection && Range.isCollapsed(selection)) {
      var _Editor$nodes = Editor.nodes(editor, {
        match: function match(n) {
          return !Editor.isEditor(n) && Element$9.isElement(n) && n.type === 'table-cell';
        }
      }),
          _Editor$nodes2 = _slicedToArray(_Editor$nodes, 1),
          cell = _Editor$nodes2[0];

      if (cell) {
        var _cell = _slicedToArray(cell, 2),
            cellPath = _cell[1];

        var start = Editor.start(editor, cellPath);

        if (Point.equals(selection.anchor, start)) {
          return;
        }
      }
    }

    deleteBackward(unit);
  };

  editor.deleteForward = function (unit) {
    var selection = editor.selection;

    if (selection && Range.isCollapsed(selection)) {
      var _Editor$nodes3 = Editor.nodes(editor, {
        match: function match(n) {
          return !Editor.isEditor(n) && Element$9.isElement(n) && n.type === 'table-cell';
        }
      }),
          _Editor$nodes4 = _slicedToArray(_Editor$nodes3, 1),
          cell = _Editor$nodes4[0];

      if (cell) {
        var _cell2 = _slicedToArray(cell, 2),
            cellPath = _cell2[1];

        var end = Editor.end(editor, cellPath);

        if (Point.equals(selection.anchor, end)) {
          return;
        }
      }
    }

    deleteForward(unit);
  };

  return editor;
};

var withTableCellMerged = function withTableCellMerged(editor) {
  var isVoid = editor.isVoid;

  editor.isVoid = function (element) {
    return element.type === 'table-cell-merged' ? true : isVoid(element);
  };

  return editor;
};

var LeafBar = function LeafBar(props) {
  var editor = useSlate();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Single, {
    selected: false,
    description: "\u5408\u5E76\u5355\u5143\u683C",
    content: /*#__PURE__*/React.createElement(MergeCellsOutlined, {
      style: {
        color: '#237804'
      }
    }),
    onClick: function onClick() {
      mergeCells(editor);
    }
  }), /*#__PURE__*/React.createElement(Single, {
    selected: false,
    description: "\u62C6\u5206\u5355\u5143\u683C",
    content: /*#__PURE__*/React.createElement(SplitCellsOutlined, {
      style: {
        color: '#237804'
      }
    }),
    onClick: function onClick() {
      splitCells(editor);
    }
  }));
};

var Table = {
  type: 'table',
  IsBlock: true,
  Level: 1,
  AddMenu: AddMenu$4,
  Element: Element$4,
  Plugin: withTable,
  LeafBar: LeafBar
};
var TableRow = {
  type: 'table-row',
  IsBlock: false,
  Element: RowElement,
  Plugin: withTableRow
};
var TableCell = {
  type: 'table-cell',
  IsBlock: false,
  Element: CellElement,
  Plugin: withTableCell
};
var TableCellMerged = {
  type: 'table-cell-merged',
  IsBlock: false,
  Element: MergedElement,
  Plugin: withTableCellMerged
};

var setNodeTag$3 = function setNodeTag(editor, element, key, value) {
  var at = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (at) {
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: at
    });
  } else if (!element) {
    // 如果没有传入对象，则操作当前行
    Transforms.setNodes(editor, _defineProperty$2({}, key, value));
  } else {
    var checkedAt = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: checkedAt
    });
  }
};

var setDivider = function setDivider(editor, element) {
  setNodeTag$3(editor, element, 'type', 'divider');
};

var setTextAlign$1 = function setTextAlign(editor, element, textAlign) {
  setNodeTag$3(editor, element, 'textAlign', textAlign);
};

var EditMenu$2 = function EditMenu(props) {
  var editor = useSlate();
  var element = props.element;
  return /*#__PURE__*/React.createElement(Select, {
    selected: element.textAlign,
    buttons: textAlignButtonList$1,
    onChange: function onChange(key) {
      setTextAlign$1(editor, element, key);
    }
  });
};

var AddMenu$3 = function AddMenu(props) {
  var editor = useSlate();
  var element = props.element;
  return /*#__PURE__*/React.createElement(Button, {
    type: "text",
    icon: /*#__PURE__*/React.createElement(MinusSquareOutlined, {
      style: {
        color: '#237804'
      }
    }),
    style: {
      width: '100%',
      textAlign: 'left'
    },
    onMouseDown: function onMouseDown() {
      setDivider(editor, element);
    }
  }, "\u6587\u5B57\u5206\u5272\u7EBF");
};

var textAlignButtonList$1 = [{
  key: 'left',
  content: /*#__PURE__*/React.createElement(AlignLeftOutlined, null),
  description: '左对齐'
}, {
  key: 'center',
  content: /*#__PURE__*/React.createElement(AlignCenterOutlined, null),
  description: '居中'
}, {
  key: 'right',
  content: /*#__PURE__*/React.createElement(AlignRightOutlined, null),
  description: '右对齐'
}];

var Element$3 = /*#__PURE__*/memo(function (props) {
  // 基础配置
  var attributes = props.attributes,
      children = props.children,
      element = props.element;
  return /*#__PURE__*/React.createElement("div", attributes, /*#__PURE__*/React.createElement(Divider$1, {
    orientation: element.textAlign || 'center',
    style: {
      color: '#262626'
    }
  }, children));
});

var withDivider = function withDivider(editor) {
  var isEmpty = editor.isEmpty;

  editor.isEmpty = function (element) {
    if (element.type === 'divider') {
      return false;
    }

    return isEmpty(element);
  };

  return editor;
};

var Divider = {
  type: 'divider',
  IsBlock: true,
  Level: 1,
  AddMenu: AddMenu$3,
  EditMenu: EditMenu$2,
  Element: Element$3,
  Plugin: withDivider
};

var setNodeTag$2 = function setNodeTag(editor, element, key, value) {
  var at = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (at) {
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: at
    });
  } else if (!element) {
    // 如果没有传入对象，则操作当前行
    Transforms.setNodes(editor, _defineProperty$2({}, key, value));
  } else {
    var checkedAt = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: checkedAt
    });
  }
};

var setHr = function setHr(editor, element) {
  setNodeTag$2(editor, element, 'type', 'hr');
};

var AddMenu$2 = function AddMenu(props) {
  var editor = useSlate();
  var element = props.element;
  return /*#__PURE__*/React.createElement(Button, {
    type: "text",
    icon: /*#__PURE__*/React.createElement(MinusCircleOutlined, {
      style: {
        color: '#d48806'
      }
    }),
    style: {
      width: '100%',
      textAlign: 'left'
    },
    onMouseDown: function onMouseDown() {
      setHr(editor, element);
    }
  }, "\u7EAF\u5206\u5272\u7EBF");
};

var Element$2 = /*#__PURE__*/memo(function (props) {
  // 基础配置
  var attributes = props.attributes,
      children = props.children;
  return /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
    style: {
      height: '10px'
    }
  }), /*#__PURE__*/React.createElement(Divider$1, null), children);
});

var withHr = function withHr(editor) {
  var isEmpty = editor.isEmpty,
      isVoid = editor.isVoid;

  editor.isEmpty = function (element) {
    if (element.type === 'hr') {
      return false;
    }

    return isEmpty(element);
  };

  editor.isVoid = function (element) {
    return element.type === 'hr' ? true : isVoid(element);
  };

  return editor;
};

var Hr = {
  type: 'hr',
  IsBlock: true,
  Level: 1,
  AddMenu: AddMenu$2,
  Element: Element$2,
  Plugin: withHr
};

var execCoy = function execCoy(text) {
  var input = document.createElement('TEXTAREA');
  input.style.opacity = 0;
  input.style.position = 'absolute';
  input.style.left = '-100000px';
  document.body.appendChild(input);
  input.value = text;
  input.select();
  input.setSelectionRange(0, text.length);
  document.execCommand('copy');
  document.body.removeChild(input);
};

var Element$1 = /*#__PURE__*/memo(function (props) {
  // 子组件
  var element = props.element,
      children = props.children; // 基础配置

  var attributes = props.attributes;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      hover = _useState2[0],
      setHover = _useState2[1];

  var editor = useSlate();
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      backgroundColor: '#fafafa',
      width: '100%',
      padding: '10px',
      color: '#000000',
      fontSize: '1em',
      tabSize: 4,
      marginTop: '10px',
      marginBottom: '10px',
      position: 'relative'
    },
    onMouseOver: function onMouseOver() {
      setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      setHover(false);
    }
  }, attributes), /*#__PURE__*/React.createElement("div", {
    contentEditable: false,
    onClick: function onClick() {
      var codeStringArr = [];

      var _iterator = _createForOfIteratorHelper(element.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          var at = ReactEditor.findPath(editor, child);
          codeStringArr.push(Editor.string(editor, at));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      execCoy(codeStringArr.join('\n'));
      message.success('代码拷贝成功～');
    },
    style: {
      display: hover ? 'inline' : 'none',
      position: 'absolute',
      top: '0.5em',
      right: '0.5em'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(CopyOutlined, {
      style: {
        color: '#5b8c00'
      }
    })
  }, element.language)), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, children));
});

var CodeLineElement = function CodeLineElement(props) {
  // 子组件
  var children = props.children; // 基础配置

  var attributes = props.attributes;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      minWidth: '3000px',
      // 宽度至少3000px，保证代码行内不换行
      fontFamily: "monospace"
    }
  }, attributes), children);
};

var setNodeTag$1 = function setNodeTag(editor, element, key, value) {
  var at = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (at) {
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: at
    });
  } else if (!element) {
    // 如果没有传入对象，则操作当前行
    Transforms.setNodes(editor, _defineProperty$2({}, key, value));
  } else {
    var checkedAt = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: checkedAt
    });
  }
};

var setLanguage = function setLanguage(editor, element, language) {
  setNodeTag$1(editor, element, ['language'], language);
};

var setCode = function setCode(editor, element) {
  var code = {
    type: 'code',
    language: '',
    children: [{
      type: 'codeLine',
      children: [{
        text: ''
      }]
    }]
  };
  var at = ReactEditor.findPath(editor, element);
  Transforms.removeNodes(editor, {
    at: at
  });
  Transforms.insertNodes(editor, code, {
    at: at
  });
};

var Option = Select$1.Option;

var EditMenu$1 = function EditMenu(props) {
  var element = props.element;
  var editor = useSlate();
  var options = [];

  for (var language in Prism.languages) {
    options.push( /*#__PURE__*/React.createElement(Option, {
      key: language,
      value: language
    }, language));
  }

  return /*#__PURE__*/React.createElement(Select$1, {
    value: element.language,
    onChange: function onChange(v) {
      setLanguage(editor, element, v);
    },
    showSearch: true,
    style: {
      width: '100%'
    },
    placeholder: "\u641C\u7D22\u8BED\u8A00",
    optionFilterProp: "children",
    filterOption: function filterOption(input, option) {
      return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    filterSort: function filterSort(optionA, optionB) {
      return optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase());
    }
  }, options);
};

var AddMenu$1 = function AddMenu(props) {
  var editor = useSlate();
  var element = props.element;
  return /*#__PURE__*/React.createElement(Button, {
    type: "text",
    icon: /*#__PURE__*/React.createElement(CodepenOutlined, {
      style: {
        color: '#262626'
      }
    }),
    style: {
      width: '100%',
      textAlign: 'left'
    },
    onMouseDown: function onMouseDown() {
      setCode(editor, element);
    }
  }, "\u4EE3\u7801\u5757");
};

var withCode = function withCode(editor) {
  var isEmpty = editor.isEmpty,
      deleteBackward = editor.deleteBackward,
      insertFragment = editor.insertFragment;

  editor.isEmpty = function (element) {
    if (element.type === 'code') {
      return false;
    }

    return isEmpty(element);
  };

  editor.insertFragment = function (node) {
    if (!Array.isArray(node)) {
      insertFragment(node);
      return;
    }

    var selection = editor.selection;

    if (selection) {
      var anchor = selection.anchor,
          focus = selection.focus;
      var commom = Node.common(editor, anchor.path, focus.path);
      var path = commom[1]; // 获得tablePath

      var codePath = _toConsumableArray(path);

      while (true) {
        // 如果不是在同一个table中，不再继续处理
        if (codePath.length == 0) {
          return insertFragment(node);
        }

        var n = Node.get(editor, codePath);

        if (n.type && n.type == 'code') {
          break;
        }

        codePath = Path.parent(codePath);
      }

      var texts = [];

      var _iterator = _createForOfIteratorHelper(node),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;

          if (child.type === 'code') {
            var _iterator2 = _createForOfIteratorHelper(child.children),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var c = _step2.value;
                texts.push({
                  type: 'codeLine',
                  children: [{
                    text: Node.string(c)
                  }]
                });
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          } else {
            texts.push({
              type: 'codeLine',
              children: [{
                text: Node.string(child)
              }]
            });
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      Transforms.insertNodes(editor, texts);
      return;
    }

    return insertFragment(node);
  };

  editor.deleteBackward = function (unit) {
    var selection = editor.selection;

    if (selection && Range.isCollapsed(selection)) {
      var _Editor$nodes = Editor.nodes(editor, {
        match: function match(n) {
          return !Editor.isEditor(n) && Element$9.isElement(n) && n.type === 'code';
        }
      }),
          _Editor$nodes2 = _slicedToArray(_Editor$nodes, 1),
          code = _Editor$nodes2[0];

      if (code) {
        var _code = _slicedToArray(code, 2),
            codePath = _code[1];

        var start = Editor.start(editor, codePath);

        if (Point.equals(selection.anchor, start)) {
          Transforms.setNodes(editor, {
            type: 'paragraph'
          }, {
            at: [].concat(_toConsumableArray(codePath), [0])
          });
          deleteBackward(unit);
          return;
        }
      }
    }

    deleteBackward(unit);
  };

  return editor;
};

var withCodeLine = function withCodeLine(editor) {
  var isEmpty = editor.isEmpty,
      insertBreak = editor.insertBreak,
      insertText = editor.insertText,
      onTabDown = editor.onTabDown;

  editor.isEmpty = function (element) {
    if (element.type === 'codeLine') {
      return false;
    }

    return isEmpty(element);
  }; // 输入tab事件拦截，return的是true就代码事件被重置


  editor.onTabDown = function () {
    var block = Editor.above(editor, {
      match: function match(n) {
        return Editor.isBlock(editor, n);
      }
    });

    if (!!block) {
      var _block = _slicedToArray(block, 2),
          element = _block[0];
          _block[1];

      if (!element.type || element.type === 'codeLine') {
        insertText("\t");
        return true;
      }
    }

    if (!onTabDown) {
      return false;
    }

    return onTabDown();
  };

  editor.insertBreak = function () {
    var block = Editor.above(editor, {
      match: function match(n) {
        return Editor.isBlock(editor, n);
      }
    });

    if (!!block) {
      var _block2 = _slicedToArray(block, 2),
          element = _block2[0],
          path = _block2[1];

      if (element.type && element.type == 'codeLine') {
        var codeArr = Editor.string(editor, path).split(/\t/);

        if (codeArr.length === 1) {
          insertBreak();
        } else {
          var tabArr = [];

          for (var i = 0; i < codeArr.length - 1; i++) {
            if (codeArr[i] != '') {
              break;
            }

            tabArr.push("\t");
          }

          insertBreak();

          if (tabArr.length > 0) {
            insertText(tabArr.join(''));
          }
        }

        return;
      }
    }

    insertBreak();
  };

  return editor;
};

var CodeDcorate = function CodeDcorate(editor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      node = _ref2[0],
      path = _ref2[1];

  // 判断是否设置了语言，并且是否支持对应语言
  if (!node.language) {
    return [];
  }

  var grammar = Prism.languages[node.language];

  if (!grammar) {
    return [];
  }

  if (!node.children) {
    return [];
  }

  var texts = [];

  for (var i = 0; i < node.children.length; i++) {
    var linePath = path.concat(i);
    texts = texts.concat(Editor.string(editor, linePath));
  }

  var tokens = Prism.tokenize(texts.join('\n'), grammar);
  var ranges = [];
  var offset = 0;
  var lineOrder = 0;

  var calculate = function calculate(childrenTokens) {
    var childrenType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var tokensForEach = function tokensForEach(token, accu) {
      if (typeof token === 'string') {
        if (token.indexOf('\n') > -1) {
          var ts = token.split(/\n/);
          offset = ts[ts.length - 1].length;
          lineOrder += ts.length - 1;
          return;
        }

        if (!!childrenType) {
          var _linePath = path.concat(lineOrder);

          ranges.push({
            anchor: {
              path: _linePath,
              offset: offset
            },
            focus: {
              path: _linePath,
              offset: offset + token.length
            },
            codeType: childrenType
          });
        }

        offset += token.length;
      } else {
        if (typeof token.content === 'string') {
          var content = token.content;

          if (content.indexOf('\n') > -1) {
            var cs = content.split(/\n/);

            for (var _i = 0; _i < cs.length; _i++) {
              var _linePath2 = path.concat(lineOrder);

              if (_i === 0) {
                ranges.push({
                  anchor: {
                    path: _linePath2,
                    offset: offset
                  },
                  focus: {
                    path: _linePath2,
                    offset: offset + cs[_i].length
                  },
                  codeType: token.type
                });
              } else {
                ranges.push({
                  anchor: {
                    path: _linePath2,
                    offset: 0
                  },
                  focus: {
                    path: _linePath2,
                    offset: offset + cs[_i].length
                  },
                  codeType: token.type
                });
                offset = cs[_i].length;
              }

              _i < cs.length - 1 && lineOrder++;
            }
          } else {
            var _linePath3 = path.concat(lineOrder);

            ranges.push({
              anchor: {
                path: _linePath3,
                offset: offset
              },
              focus: {
                path: _linePath3,
                offset: offset + token.length
              },
              codeType: token.type
            });
            offset += token.length;
          }
        } else {
          calculate(token.content, token.alias || token.type);
        }
      }
    };

    childrenTokens.forEach(tokensForEach);
  };

  calculate(tokens);
  return ranges;
};

var codeColorConfig = {
  comment: 'slategray',
  operator: '#9a6e3a',
  url: '#9a6e3a',
  keyword: '#07a',
  variable: '#e90',
  regex: '#e90',
  number: '#905',
  "boolean": '#905',
  tag: '#905',
  constant: '#905',
  symbol: '#905',
  selector: '#905',
  'attr-name': '#905',
  punctuation: '#999',
  string: '#690',
  "char": '#690',
  "function": '#dd4a68',
  'class-name': '#dd4a68',
  builtin: '#1d39c4'
};

var Leaf = function Leaf(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      leaf = _ref.leaf;

  if (!leaf.codeType || !codeColorConfig[leaf.codeType]) {
    return /*#__PURE__*/React.createElement("span", attributes, children);
  }

  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      color: codeColorConfig[leaf.codeType]
    }
  }, attributes), children);
};

var Code = {
  type: 'code',
  IsBlock: true,
  AddMenu: AddMenu$1,
  EditMenu: EditMenu$1,
  Element: Element$1,
  Plugin: withCode,
  Decorate: CodeDcorate,
  Leaf: Leaf
};
var CodeLine = {
  type: 'codeLine',
  IsBlock: false,
  Element: CodeLineElement,
  Plugin: withCodeLine
};

var setNodeTag = function setNodeTag(editor, element, key, value) {
  var at = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (at) {
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: at
    });
  } else if (!element) {
    // 如果没有传入对象，则操作当前行
    Transforms.setNodes(editor, _defineProperty$2({}, key, value));
  } else {
    var checkedAt = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, _defineProperty$2({}, key, value), {
      at: checkedAt
    });
  }
};

var setVideo = function setVideo(editor, element, src) {
  if (element) {
    var at = ReactEditor.findPath(editor, element);
    var cardBlock = {
      type: 'video',
      src: src,
      width: 700,
      children: [{
        text: ''
      }]
    };
    Transforms.setNodes(editor, cardBlock, {
      at: at
    });
  }
};

var setTextAlign = function setTextAlign(editor, element, textAlign) {
  setNodeTag(editor, element, 'textAlign', textAlign);
};

var setWidth = function setWidth(editor, element, width) {
  if (width < 40 || width > 2000) {
    return;
  }

  setNodeTag(editor, element, 'width', width);
};

var EditMenu = function EditMenu(props) {
  var editor = useSlate();
  var element = props.element;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Select, {
    selected: element.textAlign,
    buttons: textAlignButtonList,
    onChange: function onChange(key) {
      setTextAlign(editor, element, key);
    }
  }), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: '1px solid #f5f5f5'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "small",
    type: "text",
    icon: /*#__PURE__*/React.createElement(MinusCircleOutlined, {
      style: {
        color: '#389e0d'
      }
    }),
    onMouseDown: function onMouseDown() {
      setWidth(editor, element, element.width - 20);
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "small",
    type: "text",
    icon: /*#__PURE__*/React.createElement(PlusCircleOutlined, {
      style: {
        color: '#f5222d'
      }
    }),
    onMouseDown: function onMouseDown() {
      setWidth(editor, element, element.width + 20);
    }
  }));
};

var AddMenu = function AddMenu(props) {
  var editor = useSlate();
  var element = props.element;

  var URL = function URL(Props) {
    var _useState = useState(''),
        _useState2 = _slicedToArray(_useState, 2),
        value = _useState2[0],
        setValue = _useState2[1];

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-block',
        width: '280px'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      value: value,
      placeholder: "\u8F93\u5165\u89C6\u9891\u5730\u5740",
      onChange: function onChange(v) {
        return setValue(v.target.value);
      }
    })), "\xA0", /*#__PURE__*/React.createElement(Single, {
      selected: true,
      description: "video\u7684url",
      content: "\u786E\u8BA4",
      onClick: function onClick() {
        setVideo(editor, element, value);
      }
    }));
  };

  var edit = function edit() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(URL, null));
  };

  return /*#__PURE__*/React.createElement(Popover, {
    content: edit(),
    placement: "topRight"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "text",
    icon: /*#__PURE__*/React.createElement(VideoCameraOutlined, {
      style: {
        color: '#00474f'
      }
    }),
    style: {
      width: '100%',
      textAlign: 'left'
    }
  }, "\u89C6\u9891"));
};

var textAlignButtonList = [{
  key: 'left',
  content: /*#__PURE__*/React.createElement(AlignLeftOutlined, null),
  description: '左对齐'
}, {
  key: 'center',
  content: /*#__PURE__*/React.createElement(AlignCenterOutlined, null),
  description: '居中'
}, {
  key: 'right',
  content: /*#__PURE__*/React.createElement(AlignRightOutlined, null),
  description: '右对齐'
}];

var Element = /*#__PURE__*/memo(function (props) {
  // 基础配置
  var attributes = props.attributes,
      children = props.children,
      element = props.element;
  return /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
    style: {
      width: '100%',
      textAlign: element.textAlign || 'left'
    }
  }), /*#__PURE__*/React.createElement("iframe", {
    src: element.src,
    scrolling: "no",
    border: 0,
    frameBorder: "no",
    framespacing: 0,
    allowFullScreen: true,
    style: {
      width: "".concat(element.width, "px"),
      height: "".concat(element.width * 0.7, "px"),
      maxWidth: '100%'
    }
  }), children);
});

var withVideo = function withVideo(editor) {
  var isEmpty = editor.isEmpty,
      isVoid = editor.isVoid;

  editor.isEmpty = function (element) {
    if (element.type === 'video') {
      return false;
    }

    return isEmpty(element);
  };

  editor.isVoid = function (element) {
    return element.type === 'video' ? true : isVoid(element);
  };

  return editor;
};

var Video = {
  type: 'video',
  IsBlock: true,
  AddMenu: AddMenu,
  EditMenu: EditMenu,
  Element: Element,
  Plugin: withVideo
};

var deleteNode = function deleteNode(editor, element) {
  var at = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!at) {
    at = ReactEditor.findPath(editor, element);
  } // 判断当前内容同级别是否还有内容，如果只有自己，则只清空格式


  var _Editor$node = Editor.node(editor, {}),
      _Editor$node2 = _slicedToArray(_Editor$node, 1),
      el = _Editor$node2[0];

  el = getFromNodeEntry(el, Path.parent(at));

  if (el.children.length > 1) {
    Transforms.removeNodes(editor, {
      at: at
    });
  } else {
    Transforms.removeNodes(editor, {
      at: at
    });
    var node = {
      type: 'paragraph',
      children: [{
        text: ''
      }]
    };
    Transforms.insertNodes(editor, node, {
      at: at
    });
  }
};

var insertNextEmptyNode = function insertNextEmptyNode(editor, element) {
  var node = {
    type: 'paragraph',
    children: [{
      text: ''
    }]
  };
  var at = ReactEditor.findPath(editor, element);
  Transforms.insertNodes(editor, node, {
    at: Path.next(at)
  });
};

var insertPreviousEmptyNode = function insertPreviousEmptyNode(editor, element) {
  var node = {
    type: 'paragraph',
    children: [{
      text: ''
    }]
  };
  var at = ReactEditor.findPath(editor, element);
  Transforms.insertNodes(editor, node, {
    at: at
  });
};

var getFromNodeEntry = function getFromNodeEntry(nodeEntry, path) {
  var element = nodeEntry;

  var _iterator = _createForOfIteratorHelper(path),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var i = _step.value;
      element = element.children[i];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return element;
};

var Menu = function Menu(props) {
  var element = props.element,
      children = props.children,
      plugins = props.plugins,
      editMenu = props.editMenu;
  var editor = useSlate(); // 如果editor有设置isEmpty函数就用editor的

  var isEmpty = editor.isEmpty(element);

  var AddMenu = function AddMenu(props) {
    var at = ReactEditor.findPath(editor, element);
    var level = at.length;
    var addMenuList = [];

    for (var i = 0; i < plugins.length; i++) {
      if (!plugins[i].IsBlock) {
        continue;
      }

      if (plugins[i].Level && plugins[i].Level < level) {
        continue;
      }

      addMenuList.push( /*#__PURE__*/React.createElement("span", {
        key: i
      }, plugins[i].AddMenu(props)));
      addMenuList.push( /*#__PURE__*/React.createElement("hr", {
        key: "".concat(i, "hr"),
        style: {
          border: '1px solid #f5f5f5'
        }
      }));
    }

    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '200px'
      }
    }, addMenuList);
  };

  var EditMenu = function EditMenu(props) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '200px'
      }
    }, editMenu ? editMenu(props) : null, editMenu ? /*#__PURE__*/React.createElement("hr", {
      style: {
        border: '1px solid #f5f5f5'
      }
    }) : null, /*#__PURE__*/React.createElement(Button, {
      type: "text",
      icon: /*#__PURE__*/React.createElement(DeleteOutlined, {
        style: {
          color: 'red'
        }
      }),
      style: {
        width: '100%',
        textAlign: 'left'
      },
      onMouseDown: function onMouseDown() {
        return deleteNode(editor, element);
      }
    }, "\u6E05\u7A7A\u5F53\u524D\u884C"), /*#__PURE__*/React.createElement("hr", {
      style: {
        border: '1px solid #f5f5f5'
      }
    }), /*#__PURE__*/React.createElement(Button, {
      type: "text",
      icon: /*#__PURE__*/React.createElement(UpCircleOutlined, {
        style: {
          color: '#096dd9'
        }
      }),
      style: {
        width: '100%',
        textAlign: 'left'
      },
      onMouseDown: function onMouseDown() {
        return insertPreviousEmptyNode(editor, element);
      }
    }, "\u4E0A\u65B9\u63D2\u5165\u7A7A\u767D\u884C"), /*#__PURE__*/React.createElement("hr", {
      style: {
        border: '1px solid #f5f5f5'
      }
    }), /*#__PURE__*/React.createElement(Button, {
      type: "text",
      icon: /*#__PURE__*/React.createElement(DownCircleOutlined, {
        style: {
          color: '#237804'
        }
      }),
      style: {
        width: '100%',
        textAlign: 'left'
      },
      onMouseDown: function onMouseDown() {
        return insertNextEmptyNode(editor, element);
      }
    }, "\u4E0B\u65B9\u63D2\u5165\u7A7A\u767D\u884C"));
  };

  var EditIcon = function EditIcon() {
    if (isEmpty) {
      return /*#__PURE__*/React.createElement(PlusCircleOutlined, null);
    } else {
      return /*#__PURE__*/React.createElement(EditOutlined, null);
    }
  };

  var LeftMenu = function LeftMenu() {
    if (isEmpty) {
      return /*#__PURE__*/React.createElement(AddMenu, props);
    } else {
      return /*#__PURE__*/React.createElement(EditMenu, props);
    }
  };

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isEdit = _useState2[0],
      setIsEdit = _useState2[1];

  var HoverMenu = function HoverMenu() {
    return /*#__PURE__*/React.createElement("div", {
      onMouseOver: function onMouseOver() {
        return setIsEdit(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setIsEdit(false);
      }
    }, isEdit ? /*#__PURE__*/React.createElement(LeftMenu, null) : /*#__PURE__*/React.createElement(EditIcon, null));
  };

  return /*#__PURE__*/React.createElement(Popover, {
    content: /*#__PURE__*/React.createElement(HoverMenu, null),
    placement: "leftTop"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: isEdit ? '#e6f7ff' : ''
    }
  }, children));
};

var defaultPlugins = [// 段落
Paragraph, Link, Star, // 卡片
Card, // 图片
Image, // 表格
Table, TableRow, TableCell, TableCellMerged, // 代码块
Code, CodeLine, // 分割线
Divider, Hr, // 视频
Video];

var withCommon = function withCommon(editor) {
  editor.readOnly = false;
  editor.param = {};
  var onChange = editor.onChange;

  var _onChange = _$1.throttle(onChange, 16);

  editor.onChange = function () {
    _onChange();
  };

  return editor;
};

var SEditor = function SEditor(props) {
  var value = props.value,
      onChange = props.onChange,
      plugins = props.plugins,
      param = props.param;
  var readOnly = !!props.readOnly;
  var newPlugins = [].concat(defaultPlugins, _toConsumableArray(plugins));
  var editor = useMemo(function () {
    var reditor = withCommon(withHistory(withReact(createEditor()))); // 排在前边的插件，在wrap的时候放在最外层，保证优先执行

    for (var i = newPlugins.length - 1; i >= 0; i--) {
      if (newPlugins[i].Plugin) {
        reditor = newPlugins[i].Plugin(reditor);
      }
    }

    return reditor;
  }, []);
  editor.readOnly = readOnly;
  editor.param = param;
  var renderElement = useCallback(function (props) {
    var attributes = props.attributes,
        children = props.children,
        element = props.element;

    if (!element.type) {
      element.type = 'paragraph';
    }

    for (var i = 0; i < newPlugins.length; i++) {
      var Ele = newPlugins[i].Element;

      if (newPlugins[i].type === element.type) {
        if (newPlugins[i].IsBlock) {
          return /*#__PURE__*/React.createElement(Menu, {
            element: element,
            plugins: newPlugins,
            editMenu: newPlugins[i].EditMenu
          }, /*#__PURE__*/React.createElement(Ele, {
            attributes: attributes,
            children: children,
            element: element
          }));
        } else {
          return /*#__PURE__*/React.createElement(Ele, {
            attributes: attributes,
            children: children,
            element: element
          });
        }
      }
    }

    return /*#__PURE__*/React.createElement("span", attributes, children);
  }, []);
  var renderElementReadOnly = useCallback(function (props) {
    var attributes = props.attributes,
        children = props.children,
        element = props.element;

    if (!element.type) {
      element.type = 'paragraph';
    }

    for (var i = 0; i < newPlugins.length; i++) {
      if (newPlugins[i].type === element.type) {
        return newPlugins[i].Element({
          attributes: attributes,
          children: children,
          element: element
        });
      }
    }

    return /*#__PURE__*/React.createElement("span", attributes, children);
  }, []);
  var renderLeaf = useCallback(function (_ref) {
    var attributes = _ref.attributes,
        children = _ref.children,
        leaf = _ref.leaf;

    for (var i = 0; i < newPlugins.length; i++) {
      if (newPlugins[i].Leaf) {
        children = newPlugins[i].Leaf({
          attributes: attributes,
          children: children,
          leaf: leaf
        });
      }
    }

    return /*#__PURE__*/React.createElement("span", attributes, children);
  }, []);

  var Toolbar = function Toolbar(props) {
    var tools = [];

    for (var i = 0; i < newPlugins.length; i++) {
      if (newPlugins[i].LeafBar) {
        tools.push( /*#__PURE__*/React.createElement("span", {
          key: newPlugins[i].type
        }, newPlugins[i].LeafBar(props)));
      }
    }

    return /*#__PURE__*/React.createElement("div", null, tools);
  };

  var onKeyDown = useCallback(function (event) {
    // 监听tab的快捷方式
    if (event.key == 'Tab' && editor.onTabDown && editor.onTabDown()) {
      event.preventDefault();
    }
  }, []);
  var Decorate = useCallback(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        node = _ref3[0],
        path = _ref3[1];

    for (var i = 0; i < newPlugins.length; i++) {
      if (newPlugins[i].Decorate && newPlugins[i].type === node.type) {
        return newPlugins[i].Decorate(editor, [node, path]);
      }
    }

    return [];
  }, []);
  return /*#__PURE__*/React.createElement(Slate, {
    editor: editor,
    value: value,
    onChange: onChange
  }, readOnly ? null : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Affix, {
    offsetTop: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px',
      background: '#bae7ff'
    }
  }, /*#__PURE__*/React.createElement(Toolbar, null))), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement(Editable, {
    style: {
      fontSize: '16px',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,\n                    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n                    'Noto Color Emoji'"
    },
    renderElement: readOnly ? renderElementReadOnly : renderElement,
    renderLeaf: renderLeaf,
    onKeyDown: onKeyDown,
    decorate: Decorate,
    spellCheck: false,
    readOnly: readOnly,
    scrollSelectionIntoView: function scrollSelectionIntoView(editor, domRange) {},
    placeholder: "\u8F93\u5165\u6587\u672C"
  }));
};

export { SEditor as default };
//# sourceMappingURL=index.js.map
