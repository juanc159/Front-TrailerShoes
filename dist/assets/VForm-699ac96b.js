import{m as p,c as v}from"./VTextField-4769d080.js";import{f as b}from"./forwardRefs-9d31fcaa.js";import{j as h,D as y,r as R,G as V,d as F}from"./index-9109da95.js";const C=h()({name:"VForm",props:{...y(),...p()},emits:{"update:modelValue":r=>!0,submit:r=>!0},setup(r,f){let{slots:n,emit:i}=f;const o=v(r),s=R();function l(t){t.preventDefault(),o.reset()}function u(t){const a=t,e=o.validate();a.then=e.then.bind(e),a.catch=e.catch.bind(e),a.finally=e.finally.bind(e),i("submit",a),a.defaultPrevented||e.then(c=>{var m;let{valid:d}=c;d&&((m=s.value)==null||m.submit())}),a.preventDefault()}return V(()=>{var t;return F("form",{ref:s,class:["v-form",r.class],style:r.style,novalidate:!0,onReset:l,onSubmit:u},[(t=n.default)==null?void 0:t.call(n,o)])}),b(o,s)}});export{C as V};
