import{useRequirementStore as U}from"./useRequirementStore-d9b1061a.js";import{i as R,s as T,o as s,c as n,d as a,p as u,C as r,b as t,t as _,n as c,B as f,a as d,H as D,A as N,O as y,P as h,R as p,z as x,T as V,x as B,a0 as g,Q as k,a7 as O,a8 as S,V as I}from"./index-c9350ca5.js";const E=d("h3",null,"Datos del solicitante: ",-1),F=d("b",null,"Nombre: ",-1),L=d("b",null,"Tipo de documento: ",-1),z=d("b",null,"Documento: ",-1),A=d("b",null,"Email: ",-1),G=d("h3",null,"Tipo: ",-1),H={key:2,class:"demo-space-x"},P={key:3},Q={key:4},j=["href","download"],X=R({__name:"InfoRequeriment",setup(J){const q=U(),{requirementData:i}=T(q);return(m,K)=>(s(),n("div",null,[a(f,null,{default:u(()=>[a(r,{cols:"12"},{default:u(()=>[E]),_:1}),a(r,{sm:"4"},{default:u(()=>{var l;return[F,t(_((l=c(i).user)==null?void 0:l.full_name),1)]}),_:1}),a(r,{sm:"4"},{default:u(()=>{var l;return[L,t(_((l=c(i).user)==null?void 0:l.identity_type_name),1)]}),_:1}),a(r,{sm:"4"},{default:u(()=>{var l;return[z,t(_((l=c(i).user)==null?void 0:l.idNumber),1)]}),_:1}),a(r,{sm:"4"},{default:u(()=>{var l;return[A,t(_((l=c(i).user)==null?void 0:l.email),1)]}),_:1})]),_:1}),a(f,null,{default:u(()=>[a(r,{cols:"12"},{default:u(()=>{var l;return[G,d("span",null,_((l=c(i).type)==null?void 0:l.name),1)]}),_:1})]),_:1}),a(f,null,{default:u(()=>[a(r,{cols:"12"},{default:u(()=>[a(D,null,{default:u(()=>[a(N,null,{default:u(()=>[a(f,null,{default:u(()=>{var l,w;return[(s(!0),n(y,null,h((w=(l=c(i))==null?void 0:l.formData)==null?void 0:w.arrayInputs,(e,v)=>(s(),p(r,{cols:"12",key:v},{default:u(()=>[e.type_input==1?(s(),p(x,{key:0,label:e.label,modelValue:e.answer,"onUpdate:modelValue":o=>e.answer=o,rules:e.required==1?[m.requiredValidator]:[],disabled:""},null,8,["label","modelValue","onUpdate:modelValue","rules"])):V("",!0),e.type_input==2?(s(),p(B,{key:1,items:e.arrayOptions,"item-value":"id","item-title":"name",label:e.label,modelValue:e.answer,"onUpdate:modelValue":o=>e.answer=o,rules:e.required==1?[m.requiredValidator]:[],disabled:""},null,8,["items","label","modelValue","onUpdate:modelValue","rules"])):V("",!0),e.type_input==3?(s(),n("div",H,[(s(!0),n(y,null,h(e.arrayOptions,(o,b)=>(s(),p(g,{modelValue:e.answer,"onUpdate:modelValue":C=>e.answer=C,key:b,label:o.name,value:o.id,rules:e.required==1?[m.requiredValidator]:[],disabled:""},null,8,["modelValue","onUpdate:modelValue","label","value","rules"]))),128))])):V("",!0),e.type_input==4?(s(),n("div",P,[a(k,null,{default:u(()=>[t(_(e.label),1)]),_:2},1024),a(O,{modelValue:e.answer,"onUpdate:modelValue":o=>e.answer=o,rules:e.required==1?[m.requiredValidator]:[],disabled:""},{default:u(()=>[(s(!0),n(y,null,h(e.arrayOptions,(o,b)=>(s(),p(S,{key:b,label:o.name,value:o.id},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","rules"])])):V("",!0),e.type_input==5?(s(),n("div",Q,[a(k,null,{default:u(()=>[t(_(e.label),1)]),_:2},1024),d("a",{href:e.answer,download:e.label,target:"_blank"},[a(I,{icon:"mdi-download"}),t(" Descargar ")],8,j)])):V("",!0)]),_:2},1024))),128))]}),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]))}});export{X as _};
