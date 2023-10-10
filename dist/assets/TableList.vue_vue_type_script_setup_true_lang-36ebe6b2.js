import{_ as U}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-79f7e532.js";import{S as I}from"./sweetalert2.all-e795d634.js";import{V as L,a as j,P as E}from"./VPagination-92f61d4a.js";import{useCrudRoleStore as F}from"./useCrudRoleStore-3b1be02a.js";import{e as M,s as Q,r as m,v as H,x as B,y as q,o as G,c as J,d as e,w as a,g as s,z as K,h as v,V as g,b as f,a as d,A as V,m as O,B as W,t as X}from"./index-8ab07650.js";import{V as _}from"./VTooltip-489b0134.js";import{V as C}from"./VContainer-c5b930f8.js";import{V as Y}from"./VSelect-6e2871a0.js";import{V as Z}from"./VSpacer-edeea857.js";import{V as ee}from"./VTextField-a36c9478.js";import{V as te,a as k}from"./VRow-2de8352d.js";const ae={colspan:"4"},oe={style:{width:"100"},class:"d-flex justify-content-center"},le={class:"me-3",style:{width:"80px"}},se={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},ne={style:{width:"10rem"}},ye=M({__name:"TableList",setup(ie){const r=F(),{action:D,roles:p,totalPage:y,lastPage:P,currentPage:n,totalData:S,loading:T}=Q(r),i=m(10),c=m(""),h=m(""),w=m(""),A=[{title:"Nombre",key:"name"},{title:"Descripcion",key:"description"},{title:"Acciones",sortable:!1,key:"actions"}],u=async()=>{await r.fetchAll({perPage:i.value,page:n.value,searchQuery:c.value,sort_direction:h.value,sort_field:w.value})};H(async()=>{await u()});const z=async o=>{o.length>0&&(h.value=o[0].order,w.value=o[0].key,await u())};B([c,i],async()=>{n.value=1}),B([n,c,i],async()=>{await u()});const $=q(()=>{const o=p.value.length?(n.value-1)*y.value+1:0,t=p.value.length+(n.value-1)*y.value;return`Mostrando ${o} a ${t} de ${S.value} registros`}),x=async(o,t=null)=>{D.value=t==null?"new":"edit",r.clearFormulario(),r.typeAction=o,t&&r.fetchInfo(t)},R=async o=>{I.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async t=>{t.isConfirmed?(await r.fetchDelete(o),await u()):t.isDenied})};return(o,t)=>{const N=U;return G(),J("div",null,[e(N,{title:"Listado","sub-title":"Roles",icon:"mdi-format-list-bulleted"}),e(C,{class:"bg-vwhite",fluid:""},{default:a(()=>[e(s(L),{headers:A,items:s(p),"items-per-page":s(i),"onUpdate:sortBy":z},K({"item.actions":a(({item:l})=>[e(v,{icon:"",size:"small",color:"error",variant:"text",onClick:b=>R(l.value)},{default:a(()=>[e(g,{size:"22",icon:"tabler-trash"}),e(_,{activator:"parent",location:"top"},{default:a(()=>[f(" Borrar ")]),_:1})]),_:2},1032,["onClick"]),e(v,{icon:"",size:"small",color:"default",variant:"text",onClick:b=>x("form",l.value)},{default:a(()=>[e(g,{size:"22",icon:"tabler-edit"}),e(_,{activator:"parent",location:"top"},{default:a(()=>[f(" Editar ")]),_:1})]),_:2},1032,["onClick"])]),top:a(()=>[e(C,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:a(()=>[d("div",le,[e(Y,{modelValue:s(i),"onUpdate:modelValue":t[0]||(t[0]=l=>V(i)?i.value=l:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),e(Z),d("div",se,[d("div",ne,[e(ee,{modelValue:s(c),"onUpdate:modelValue":t[1]||(t[1]=l=>V(c)?c.value=l:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),e(_,{text:"Agregar",location:"top"},{activator:a(({props:l})=>[e(v,O({class:"ms-1",color:"light",rounded:"lg"},l,{onClick:t[2]||(t[2]=b=>x("form"))}),{default:a(()=>[f(" Agregar "),e(g,{size:"large",color:"success",icon:"mdi-plus"})]),_:2},1040)]),_:1})])]),_:1})]),bottom:a(()=>[e(W,{class:"pt-2"},{default:a(()=>[e(te,null,{default:a(()=>[e(k,{lg:"4",cols:"3"},{default:a(()=>[f(X(s($)),1)]),_:1}),e(k,{lg:"8",cols:"9",class:"d-flex justify-end"},{default:a(()=>[e(j,{modelValue:s(n),"onUpdate:modelValue":t[3]||(t[3]=l=>V(n)?n.value=l:null),"total-visible":5,size:"small",length:s(P)},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1})]),_:2},[s(T)?{name:"body",fn:a(()=>[d("tr",null,[d("td",ae,[d("div",oe,[e(E)])])])]),key:"0"}:void 0]),1032,["items","items-per-page"])]),_:1})])}}});export{ye as _};