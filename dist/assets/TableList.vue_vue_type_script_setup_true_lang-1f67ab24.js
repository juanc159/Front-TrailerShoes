import{e as R,x as E,y as m,z as O,A as P,B as Q,o as V,c as v,d as e,w as l,L as u,H as f,h as o,K as y,m as B,b as w,C as G,a as s,V as H,D as K,E as X,G as C,J as S,t as _,X as q,F as A,P as T,ai as W,aj as Y}from"./index-dd53741e.js";import{P as Z}from"./PreloadInterno-a5d99930.js";import{useCrudAuditStore as ee}from"./useCrudAuditStore-479717d3.js";import{V as le}from"./VTooltip-c58f227b.js";import{V as ae}from"./VSpacer-ddef0a47.js";import{V as te}from"./VPagination-8df84faf.js";import{V as oe}from"./VDataTable-d1d16a2f.js";const ne={colspan:"5"},se={style:{width:"100"},class:"d-flex justify-content-center"},ue={class:"me-3",style:{width:"80px"}},ie=s("h3",null,"Antes",-1),de=s("h3",null,"Despues",-1),ye=R({__name:"TableList",setup(re){const D=ee(),{logInfos:g,totalPage:F,lastPage:$,currentPage:i,totalData:h,loading:z}=E(D),r=m(10),b=m(""),U=m(""),I=m(""),k=async()=>{await D.fetchAll({perPage:r.value,page:i.value,searchQuery:b.value,sort_direction:U.value,sort_field:I.value,action:n.value.action,module:n.value.module,description:n.value.description,user_name:n.value.user_name,dateIntial:n.value.dateIntial,dateFinal:n.value.dateFinal})},M=[{title:"Acción",key:"action"},{title:"Modulo",key:"module"},{title:"Descripción",key:"description"},{title:"Usuario",key:"user_name"},{title:"Fecha",key:"created_at"},{title:"Acciones",key:"actions",sortable:!1}];O(async()=>{});const N=async d=>{d.length>0&&(U.value=d[0].order,I.value=d[0].key,await k())};P([b,r],async()=>{i.value=1}),P([i,b,r],async()=>{await k()});const j=Q(()=>{const d=g.value.length?(i.value-1)*F.value+1:0,t=g.value.length+(i.value-1)*F.value;return`Mostrando ${d} a ${t} de ${h.value} registros`}),n=m({action:null,module:null,description:null,user_name:null,dateIntial:null,dateFinal:null}),c=m(!1),x=m({}),L=d=>{c.value=!0,x.value=d};return(d,t)=>{const J=Y;return V(),v("div",null,[e(y,null,{default:l(()=>[e(u,{cols:"12",sm:"4"},{default:l(()=>[e(f,{modelValue:o(n).action,"onUpdate:modelValue":t[0]||(t[0]=a=>o(n).action=a),label:"Acción"},null,8,["modelValue"])]),_:1}),e(u,{cols:"12",sm:"4"},{default:l(()=>[e(f,{modelValue:o(n).module,"onUpdate:modelValue":t[1]||(t[1]=a=>o(n).module=a),label:"Módulo"},null,8,["modelValue"])]),_:1}),e(u,{cols:"12",sm:"4"},{default:l(()=>[e(f,{modelValue:o(n).description,"onUpdate:modelValue":t[2]||(t[2]=a=>o(n).description=a),label:"Descripción"},null,8,["modelValue"])]),_:1}),e(u,{cols:"12",sm:"4"},{default:l(()=>[e(f,{modelValue:o(n).user_name,"onUpdate:modelValue":t[3]||(t[3]=a=>o(n).user_name=a),label:"Usuario"},null,8,["modelValue"])]),_:1}),e(u,{cols:"12",sm:"4"},{default:l(()=>[e(f,{type:"date",modelValue:o(n).dateIntial,"onUpdate:modelValue":t[4]||(t[4]=a=>o(n).dateIntial=a),label:"Fecha inicio"},null,8,["modelValue"])]),_:1}),e(u,{cols:"12",sm:"4"},{default:l(()=>[e(f,{type:"date",modelValue:o(n).dateFinal,"onUpdate:modelValue":t[5]||(t[5]=a=>o(n).dateFinal=a),label:"Fecha Fin"},null,8,["modelValue"])]),_:1})]),_:1}),e(y,null,{default:l(()=>[e(u,{class:"d-flex justify-content-center"},{default:l(()=>[e(B,{color:"primary",onClick:t[6]||(t[6]=a=>k())},{default:l(()=>[w("Buscar")]),_:1})]),_:1})]),_:1}),e(o(oe),{headers:M,items:o(g),"items-per-page":o(r),"onUpdate:sortBy":N},G({"item.actions":l(({item:a})=>[e(B,{size:"x-small",variant:"text",icon:"",onClick:p=>L(a.raw)},{default:l(()=>[e(H,{size:"22",icon:"tabler-eye"}),e(le,{activator:"parent",location:"top"},{default:l(()=>[w(" Visualizar ")]),_:1})]),_:2},1032,["onClick"])]),top:l(()=>[e(K,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:l(()=>[s("div",ue,[e(X,{modelValue:o(r),"onUpdate:modelValue":t[7]||(t[7]=a=>C(r)?r.value=a:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),e(ae)]),_:1})]),bottom:l(()=>[e(S,{class:"pt-2"},{default:l(()=>[e(y,null,{default:l(()=>[e(u,{lg:"4",cols:"3"},{default:l(()=>[w(_(o(j)),1)]),_:1}),e(u,{lg:"8",cols:"9",class:"d-flex justify-end"},{default:l(()=>[e(te,{modelValue:o(i),"onUpdate:modelValue":t[8]||(t[8]=a=>C(i)?i.value=a:null),"total-visible":5,size:"small",length:o($)},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1})]),_:2},[o(z)?{name:"body",fn:l(()=>[s("tr",null,[s("td",ne,[s("div",se,[e(Z)])])])]),key:"0"}:void 0]),1032,["items","items-per-page"]),e(W,{modelValue:o(c),"onUpdate:modelValue":t[10]||(t[10]=a=>C(c)?c.value=a:null),width:"900"},{default:l(()=>[e(J,{onClick:t[9]||(t[9]=a=>c.value=!o(c))}),e(q,null,{default:l(()=>[e(S,null,{default:l(()=>[e(y,null,{default:l(()=>[e(u,{cols:"12",sm:"6"},{default:l(()=>[ie,s("ul",null,[(V(!0),v(A,null,T(JSON.parse(o(x).before),(a,p)=>(V(),v("li",{key:p},[s("b",null,_(p)+": ",1),s("span",null,_(a),1)]))),128))])]),_:1}),e(u,{cols:"12",sm:"6"},{default:l(()=>[de,s("ul",null,[(V(!0),v(A,null,T(JSON.parse(o(x).after),(a,p)=>(V(),v("li",{key:p},[s("b",null,_(p)+": ",1),s("span",null,_(a),1)]))),128))])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])])}}});export{ye as _};
