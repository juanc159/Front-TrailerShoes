import{i as A,s as I,r as p,k as N,w as C,l as R,o as j,c as F,d as e,m as U,n as s,p as a,a as c,q as m,V as _,b as u,v as E,x as L,y as h,z as M,A as Q,B as q,C as b,t as G,S as H}from"./index-c9350ca5.js";import{P as J}from"./PreloadInterno-0cd51b40.js";import{_ as K}from"./ModalAssignEmails.vue_vue_type_script_setup_true_lang-9d8a3dad.js";import{useCrudSurveyStore as O}from"./useCrudSurveyStore-4fe69ad4.js";import{V}from"./VTooltip-7bf3ee5c.js";import{V as W}from"./VSpacer-99f3f8c3.js";import{V as X}from"./VPagination-9ea17d1d.js";import{V as Y}from"./VDataTable-1f115dfc.js";const Z={class:"d-flex"},ee={colspan:"4"},te={style:{width:"100"},class:"d-flex justify-content-center"},ae={class:"me-3",style:{width:"80px"}},oe={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},le={style:{width:"10rem"}},me=A({__name:"TableList",setup(se){const r=O(),{surveys:v,totalPage:g,lastPage:B,currentPage:n,totalData:D,loading:S}=I(r),i=p(10),d=p(""),x=p(""),w=p(""),f=async()=>{await r.fetchAll({perPage:i.value,page:n.value,searchQuery:d.value,sort_direction:x.value,sort_field:w.value})},P=[{title:"Nombre",key:"name"},{title:"Fecha inicio",key:"startDate"},{title:"Fecha fin",key:"endDate"},{title:"Acciones",sortable:!1,key:"actions"}];N(async()=>{await f()});const T=async o=>{o.length>0&&(x.value=o[0].order,w.value=o[0].key,await f())};C([d,i],async()=>{n.value=1}),C([n,d,i],async()=>{await f()});const z=R(()=>{const o=v.value.length?(n.value-1)*g.value+1:0,t=v.value.length+(n.value-1)*g.value;return`Mostrando ${o} a ${t} de ${D.value} registros`}),y=async(o,t=null)=>{r.clearFormulario(),r.typeAction=o,t&&o=="form"&&r.fetchInfo(t),t&&o=="report"&&r.fetchInfoReport(t)},$=async o=>{H.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async t=>{t.isConfirmed?(await r.fetchDelete(o),await f()):t.isDenied})};return(o,t)=>(j(),F("div",null,[e(s(Y),{headers:P,items:s(v),"items-per-page":s(i),"onUpdate:sortBy":T},U({"item.actions":a(({item:l})=>[c("div",Z,[e(m,{size:"x-small",color:"error",variant:"text",icon:"",onClick:k=>$(l.value)},{default:a(()=>[e(_,{size:"22",icon:"tabler-trash"}),e(V,{activator:"parent",location:"top"},{default:a(()=>[u(" Borrar ")]),_:1})]),_:2},1032,["onClick"]),e(m,{icon:"",size:"x-small",color:"default",variant:"text",onClick:k=>y("form",l.value)},{default:a(()=>[e(_,{size:"22",icon:"tabler-edit"}),e(V,{activator:"parent",location:"top"},{default:a(()=>[u(" Editar ")]),_:1})]),_:2},1032,["onClick"]),e(K,{obj:l.raw},null,8,["obj"]),e(m,{icon:"",size:"x-small",color:"default",variant:"text",onClick:k=>y("report",l.value)},{default:a(()=>[e(_,{size:"22",icon:"tabler-chart-infographic"}),e(V,{activator:"parent",location:"top"},{default:a(()=>[u(" Reporte ")]),_:1})]),_:2},1032,["onClick"])])]),top:a(()=>[e(E,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:a(()=>[c("div",ae,[e(L,{modelValue:s(i),"onUpdate:modelValue":t[0]||(t[0]=l=>h(i)?i.value=l:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),e(W),c("div",oe,[c("div",le,[e(M,{modelValue:s(d),"onUpdate:modelValue":t[1]||(t[1]=l=>h(d)?d.value=l:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),e(m,{color:"primary",onClick:t[2]||(t[2]=l=>y("form"))},{default:a(()=>[u(" Agregar ")]),_:1})])]),_:1})]),bottom:a(()=>[e(Q,{class:"pt-2"},{default:a(()=>[e(q,null,{default:a(()=>[e(b,{lg:"4",cols:"3"},{default:a(()=>[u(G(s(z)),1)]),_:1}),e(b,{lg:"8",cols:"9",class:"d-flex justify-end"},{default:a(()=>[e(X,{modelValue:s(n),"onUpdate:modelValue":t[3]||(t[3]=l=>h(n)?n.value=l:null),"total-visible":5,size:"small",length:s(B)},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1})]),_:2},[s(S)?{name:"body",fn:a(()=>[c("tr",null,[c("td",ee,[c("div",te,[e(J)])])])]),key:"0"}:void 0]),1032,["items","items-per-page"])]))}});export{me as _};