import{i as b,s as w,r as c,U as x,E as F,L as p,o as k,c as U,d as l,p as o,C as i,q as g,b as y,B as V,z as C,n as a,R as S,W as B,X as N,K as I}from"./index-c9350ca5.js";import{useCrudSocialNetworkStore as $}from"./useCrudSocialNetworkStore-85cf15ce.js";const T=b({__name:"Form",setup(h){const d=$(),{formulario:n}=w(d),u=c([]),s=c(x()),m=c(),v=async t=>{var e;d.typeAction=t,await((e=m.value)==null?void 0:e.resetValidation()),s.value.clearData(),u.value=[],t!="back"&&d.keyList++},_=async()=>{var e;s.value.imageFile&&(n.value.path=s.value.imageFile);const t=await((e=m.value)==null?void 0:e.validate());if(t!=null&&t.valid){const r=await d.fetchSave();r.code===200&&v("list"),r.code===422&&(u.value=r.errors??[])}},f=c([]);return F(n,(t,e)=>{t.id?f.value.path=[]:f.value.path=[p(s.value.imageUrl)]},{deep:!0}),(t,e)=>(k(),U("div",null,[l(V,null,{default:o(()=>[l(i,{cols:"12",class:"d-flex justify-content-end"},{default:o(()=>[l(g,{color:"secondary",onClick:e[0]||(e[0]=r=>v("back"))},{default:o(()=>[y(" Atras ")]),_:1})]),_:1})]),_:1}),l(I,{ref_key:"formValidation",ref:m,"lazy-validation":""},{default:o(()=>[l(V,null,{default:o(()=>[l(i,{cols:"4"},{default:o(()=>[l(C,{clearable:"",modelValue:a(n).name,"onUpdate:modelValue":e[1]||(e[1]=r=>a(n).name=r),rules:[a(p)],"error-messages":a(u).name,label:"Nombre",onKeypress:e[2]||(e[2]=r=>a(u).name="")},null,8,["modelValue","rules","error-messages"])]),_:1}),l(i,{cols:"4"},{default:o(()=>[l(C,{clearable:"",modelValue:a(n).url,"onUpdate:modelValue":e[3]||(e[3]=r=>a(n).url=r),rules:[a(p)],"error-messages":a(u).url,label:"Url",onKeypress:e[4]||(e[4]=r=>a(u).url="")},null,8,["modelValue","rules","error-messages"])]),_:1}),l(i,{cols:"4"},{default:o(()=>[(k(),S(B,{onChange:a(s).handleImageSelected,rules:a(f).path,key:a(s).key,"onClick:clear":a(s).clearData},null,8,["onChange","rules","onClick:clear"]))]),_:1})]),_:1}),l(i,{cols:"12"},{default:o(()=>[l(N,{contain:"",src:a(s).imageUrl??a(n).path,alt:"foto Personal","max-width":200,class:"mx-auto"},null,8,["src"])]),_:1}),l(V,null,{default:o(()=>[l(i,{cols:"12 d-flex justify-content-center"},{default:o(()=>[l(g,{color:"primary",onClick:e[5]||(e[5]=r=>_())},{default:o(()=>[y("Guardar")]),_:1})]),_:1})]),_:1})]),_:1},512)]))}});export{T as _};
