import{useCrudChargeStore as _}from"./useCrudChargeStore-8c33b3b6.js";import{i as y,s as C,r as c,o as k,c as b,d as a,p as o,C as u,q as V,b as p,B as i,z as x,n as s,L as g,K as w}from"./index-c9350ca5.js";const S=y({__name:"Form",setup(B){const l=_(),{formulario:f}=C(l),n=c([]),d=c(),m=async r=>{var e;l.typeAction=r,await((e=d.value)==null?void 0:e.resetValidation()),n.value=[],r!="back"&&l.keyList++},v=async()=>{var e;const r=await((e=d.value)==null?void 0:e.validate());if(r!=null&&r.valid){const t=await l.fetchSave();t.code===200&&m("list"),t.code===422&&(n.value=t.errors??[])}};return(r,e)=>(k(),b("div",null,[a(i,null,{default:o(()=>[a(u,{cols:"12",class:"d-flex justify-content-end"},{default:o(()=>[a(V,{color:"secondary",onClick:e[0]||(e[0]=t=>m("back"))},{default:o(()=>[p(" Atras ")]),_:1})]),_:1})]),_:1}),a(w,{ref_key:"formValidation",ref:d,"lazy-validation":""},{default:o(()=>[a(i,null,{default:o(()=>[a(u,{cols:"4"},{default:o(()=>[a(x,{clearable:"",modelValue:s(f).name,"onUpdate:modelValue":e[1]||(e[1]=t=>s(f).name=t),rules:[s(g)],"error-messages":s(n).name,label:"Nombre",onKeypress:e[2]||(e[2]=t=>s(n).name="")},null,8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),a(i,null,{default:o(()=>[a(u,{cols:"12 d-flex justify-content-center"},{default:o(()=>[a(V,{color:"primary",onClick:e[3]||(e[3]=t=>v())},{default:o(()=>[p("Guardar")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{S as _};