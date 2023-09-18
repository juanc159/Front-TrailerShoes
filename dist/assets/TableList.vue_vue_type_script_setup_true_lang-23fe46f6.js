import{i as $,s as I,r as f,k as N,w as x,l as U,o as R,c as j,d as e,m as E,n as s,p as a,a as d,q as v,V as w,b as p,v as F,x as L,y,z as M,A as Q,B as q,C,t as G,S as H}from"./index-c9350ca5.js";import{P as J}from"./PreloadInterno-0cd51b40.js";import{useCrudCalendarTypeStore as K}from"./useCrudCalendarTypeStore-9c6627dc.js";import{V as B}from"./VTooltip-7bf3ee5c.js";import{V as O}from"./VSpacer-99f3f8c3.js";import{V as W}from"./VPagination-9ea17d1d.js";import{V as X}from"./VDataTable-1f115dfc.js";const Y={colspan:"2"},Z={style:{width:"100"},class:"d-flex justify-content-center"},ee={class:"me-3",style:{width:"80px"}},te={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},ae={style:{width:"10rem"}},fe=$({__name:"TableList",setup(le){const i=K(),{calendarTypes:m,totalPage:V,lastPage:k,currentPage:n,totalData:T,loading:b,typeAction:oe}=I(i),r=f(10),c=f(""),g=f(""),_=f(""),u=async()=>{await i.fetchAll({perPage:r.value,page:n.value,searchQuery:c.value,sort_direction:g.value,sort_field:_.value})},S=[{title:"Nombre",key:"name"},{title:"Acciones",sortable:!1,key:"actions"}];N(async()=>{await u()});const D=async l=>{l.length>0&&(g.value=l[0].order,_.value=l[0].key,await u())};x([c,r],async()=>{n.value=1}),x([n,c,r],async()=>{await u()});const P=U(()=>{const l=m.value.length?(n.value-1)*V.value+1:0,t=m.value.length+(n.value-1)*V.value;return`Mostrando ${l} a ${t} de ${T.value} registros`}),h=async(l,t=null)=>{i.clearFormulario(),i.typeAction=l,t&&i.fetchInfo(t)},A=async l=>{H.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async t=>{t.isConfirmed&&(await i.fetchDelete(l),await u())})};return(l,t)=>(R(),j("div",null,[e(s(X),{headers:S,items:s(m),"items-per-page":s(r),"onUpdate:sortBy":D},E({"item.actions":a(({item:o})=>[e(v,{size:"x-small",color:"error",variant:"text",icon:"",onClick:z=>A(o.value)},{default:a(()=>[e(w,{size:"22",icon:"tabler-trash"}),e(B,{activator:"parent",location:"top"},{default:a(()=>[p(" Borrar ")]),_:1})]),_:2},1032,["onClick"]),e(v,{icon:"",size:"x-small",color:"default",variant:"text",onClick:z=>h("form",o.value)},{default:a(()=>[e(w,{size:"22",icon:"tabler-edit"}),e(B,{activator:"parent",location:"top"},{default:a(()=>[p(" Editar ")]),_:1})]),_:2},1032,["onClick"])]),top:a(()=>[e(F,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:a(()=>[d("div",ee,[e(L,{modelValue:s(r),"onUpdate:modelValue":t[0]||(t[0]=o=>y(r)?r.value=o:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),e(O),d("div",te,[d("div",ae,[e(M,{modelValue:s(c),"onUpdate:modelValue":t[1]||(t[1]=o=>y(c)?c.value=o:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),e(v,{color:"primary",onClick:t[2]||(t[2]=o=>h("form"))},{default:a(()=>[p(" Agregar ")]),_:1})])]),_:1})]),bottom:a(()=>[e(Q,{class:"pt-2"},{default:a(()=>[e(q,null,{default:a(()=>[e(C,{lg:"4",cols:"3"},{default:a(()=>[p(G(s(P)),1)]),_:1}),e(C,{lg:"8",cols:"9",class:"d-flex justify-end"},{default:a(()=>[e(W,{modelValue:s(n),"onUpdate:modelValue":t[3]||(t[3]=o=>y(n)?n.value=o:null),"total-visible":5,size:"small",length:s(k)},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1})]),_:2},[s(b)?{name:"body",fn:a(()=>[d("tr",null,[d("td",Y,[d("div",Z,[e(J)])])])]),key:"0"}:void 0]),1032,["items","items-per-page"])]))}});export{fe as _};