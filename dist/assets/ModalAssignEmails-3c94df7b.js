import{P as k}from"./PreloadInterno-0cd51b40.js";import{i as B,r as n,o as E,c as j,d as e,p as o,q as v,G as D,V as z,b as V,n as s,H as I,I as p,a as N,J as _,K as P,A as C,B as S,C as T,z as $,y as b,L as q,M as A,N as F}from"./index-c9350ca5.js";import{useCrudSurveyStore as M}from"./useCrudSurveyStore-4fe69ad4.js";import{V as R}from"./VTooltip-7bf3ee5c.js";const U={class:"my-5"},O=B({__name:"ModalAssignEmails",props:{obj:{type:Object,required:!0}},setup(m){const{obj:y}=m,x=M(),c=n(),i=n([]),t=n(!1),u=n(!1),g=n([]),w=async()=>{var a;const d=await((a=c.value)==null?void 0:a.validate());if(d!=null&&d.valid){u.value=!0;const f={survey_id:y.id,emails:i.value},r=await x.sendEmails(f);r.code===200&&(t.value=!1),r.code===422&&(g.value=r.errors??[]),u.value=!1}};return(d,a)=>{const f=F,r=k;return E(),j("div",null,[e(A,{modelValue:s(t),"onUpdate:modelValue":a[4]||(a[4]=l=>b(t)?t.value=l:null),width:"700"},{activator:o(({props:l})=>[e(v,D({icon:"",color:"default",variant:"text",size:"x-small"},l,{onClick:a[0]||(a[0]=G=>t.value=!0)}),{default:o(()=>[e(z,{size:"22",icon:"tabler-settings"}),e(R,{activator:"parent",location:"top"},{default:o(()=>[V("Enviar Encuesta")]),_:1})]),_:2},1040)]),default:o(()=>[e(f,{onClick:a[1]||(a[1]=l=>t.value=!s(t))}),e(I,{title:"Asignar Correos a "+m.obj.name},{default:o(()=>[p(N("div",U,[e(r)],512),[[_,s(u)==!0]]),p(e(P,{ref_key:"formValidation",ref:c,"lazy-validation":""},{default:o(()=>[e(C,null,{default:o(()=>[e(S,null,{default:o(()=>[e(T,{cols:"12"},{default:o(()=>[e($,{modelValue:s(i),"onUpdate:modelValue":a[2]||(a[2]=l=>b(i)?i.value=l:null),label:"Correos",rules:[s(q)],hint:"Debe separar los correos mediantes (;)"},null,8,["modelValue","rules"])]),_:1})]),_:1})]),_:1}),e(C,{class:"d-flex justify-end"},{default:o(()=>[e(v,{onClick:a[3]||(a[3]=l=>w())},{default:o(()=>[V(" Enviar ")]),_:1})]),_:1})]),_:1},512),[[_,!s(u)]])]),_:1},8,["title"])]),_:1},8,["modelValue"])])}}});export{O as default};
