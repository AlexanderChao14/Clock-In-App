import{G as V,H as E,I as w,J as M,B as R,K as H,L as Y,M as L,A as q,N as x,O as z,P as T,Q as m,F as D,D as G,c as v,R as U,S as X,U as $,V as F,W as J,X as K,z as Q,a as Z,p as ee,h as S,k as te,f as re}from"./runtime.DsElAt5n.js";import{b as ae}from"./disclose-version.BNdWgO9i.js";function _e(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const ne=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function pe(e){return ne.includes(e)}const oe={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject"};function he(e){return e=e.toLowerCase(),oe[e]??e}const se=["touchstart","touchmove"];function ie(e){return se.includes(e)}const ue=["textarea","script","style","title"];function ve(e){return ue.includes(e)}function ye(e,t){if(t){const r=document.body;e.autofocus=!0,V(()=>{document.activeElement===r&&e.focus()})}}let I=!1;function ce(){I||(I=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const r of e.target.elements)(t=r.__on_r)==null||t.call(r)})},{capture:!0}))}function P(e){var t=M,r=R;E(null),w(null);try{return e()}finally{E(t),w(r)}}function ge(e,t,r,i=r){e.addEventListener(t,()=>P(r));const n=e.__on_r;n?e.__on_r=()=>{n(),i(!0)}:e.__on_r=()=>i(!0),ce()}const W=new Set,k=new Set;function me(e,t,r,i){function n(a){if(i.capture||y.call(t,a),!a.cancelBubble)return P(()=>r.call(this,a))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?V(()=>{t.addEventListener(e,n,i)}):t.addEventListener(e,n,i),n}function Ee(e){for(var t=0;t<e.length;t++)W.add(e[t]);for(var r of k)r(e)}function y(e){var O;var t=this,r=t.ownerDocument,i=e.type,n=((O=e.composedPath)==null?void 0:O.call(e))||[],a=n[0]||e.target,c=0,_=e.__root;if(_){var f=n.indexOf(_);if(f!==-1&&(t===document||t===window)){e.__root=t;return}var p=n.indexOf(t);if(p===-1)return;f<=p&&(c=f)}if(a=n[c]||e.target,a!==t){H(e,"currentTarget",{configurable:!0,get(){return a||r}});var b=M,u=R;E(null),w(null);try{for(var o,s=[];a!==null;){var l=a.assignedSlot||a.parentNode||a.host||null;try{var d=a["__"+i];if(d!==void 0&&!a.disabled)if(Y(d)){var[B,...C]=d;B.apply(a,[e,...C])}else d.call(a,e)}catch(g){o?s.push(g):o=g}if(e.cancelBubble||l===t||l===null)break;a=l}if(o){for(let g of s)queueMicrotask(()=>{throw g});throw o}}finally{e.__root=t,delete e.currentTarget,E(b),w(u)}}}let A=!0;function we(e){A=e}function be(e,t){var r=t==null?"":typeof t=="object"?t+"":t;r!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=r,e.nodeValue=r==null?"":r+"")}function le(e,t){return j(e,t)}function Te(e,t){L(),t.intro=t.intro??!1;const r=t.target,i=S,n=v;try{for(var a=q(r);a&&(a.nodeType!==8||a.data!==x);)a=z(a);if(!a)throw T;m(!0),D(a),G();const c=j(e,{...t,anchor:a});if(v===null||v.nodeType!==8||v.data!==U)throw X(),T;return m(!1),c}catch(c){if(c===T)return t.recover===!1&&$(),L(),F(r),m(!1),le(e,t);throw c}finally{m(i),D(n)}}const h=new Map;function j(e,{target:t,anchor:r,props:i={},events:n,context:a,intro:c=!0}){L();var _=new Set,f=u=>{for(var o=0;o<u.length;o++){var s=u[o];if(!_.has(s)){_.add(s);var l=ie(s);t.addEventListener(s,y,{passive:l});var d=h.get(s);d===void 0?(document.addEventListener(s,y,{passive:l}),h.set(s,1)):h.set(s,d+1)}}};f(J(W)),k.add(f);var p=void 0,b=K(()=>{var u=r??t.appendChild(Q());return Z(()=>{if(a){ee({});var o=re;o.c=a}n&&(i.$$events=n),S&&ae(u,null),A=c,p=e(u,i)||{},A=!0,S&&(R.nodes_end=v),a&&te()}),()=>{var l;for(var o of _){t.removeEventListener(o,y);var s=h.get(o);--s===0?(document.removeEventListener(o,y),h.delete(o)):h.set(o,s)}k.delete(f),u!==r&&((l=u.parentNode)==null||l.removeChild(u))}});return N.set(p,b),p}let N=new WeakMap;function Le(e,t){const r=N.get(e);return r?(N.delete(e),r(t)):Promise.resolve()}export{we as a,ce as b,_e as c,me as d,Ee as e,ye as f,pe as g,Te as h,ve as i,A as j,ge as l,le as m,he as n,be as s,Le as u};