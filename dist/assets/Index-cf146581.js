import{i as p,Y as _,s as d,b8 as k,o as s,c as C,d as t,p as e,C as h,I as r,H as n,A as m,R as u,n as o,J as l,T as x,B as y,ay as c}from"./index-c9350ca5.js";import{_ as V}from"./Form.vue_vue_type_script_setup_true_lang-a38d3f93.js";import{_ as S}from"./ManageData.vue_vue_type_script_setup_true_lang-3d14ad60.js";import{_ as w}from"./TableList.vue_vue_type_script_setup_true_lang-163574d9.js";import{useRequirementStore as B}from"./useRequirementStore-d9b1061a.js";import"./useSelect2Infite-1d5d9c41.js";import"./InfoRequeriment.vue_vue_type_script_setup_true_lang-8c6f1ddb.js";import"./VTextarea-7e773ba2.js";import"./VTooltip-7bf3ee5c.js";import"./VDataTable-1f115dfc.js";import"./VTable-19bc4268.js";import"./PreloadInterno-0cd51b40.js";import"./VSpacer-99f3f8c3.js";import"./VPagination-9ea17d1d.js";const R=p({__name:"Index",setup($){const f=_(),i=B(),{typeAction:a}=d(i);return k(()=>{i.$reset()}),(b,q)=>(s(),C("div",null,[t(y,null,{default:e(()=>[t(h,{cols:"12"},{default:e(()=>[r(t(n,{title:"Listado solicitudes"},{default:e(()=>[t(m,null,{default:e(()=>[(s(),u(w,{key:o(i).keyList}))]),_:1})]),_:1},512),[[l,o(a)=="back"||o(a)=="list"]]),r(t(n,{title:"Gestionar solicitud"},{default:e(()=>[t(m,null,{default:e(()=>[t(S)]),_:1})]),_:1},512),[[l,o(a)=="ManageData"]]),o(f).permissions.includes("petition.index")?r((s(),u(n,{key:0,title:"Form requerimiento"},{default:e(()=>[t(m,null,{default:e(()=>[t(V)]),_:1})]),_:1},512)),[[l,o(a)=="form"]]):x("",!0)]),_:1})]),_:1})]))}});typeof c=="function"&&c(R);export{R as default};