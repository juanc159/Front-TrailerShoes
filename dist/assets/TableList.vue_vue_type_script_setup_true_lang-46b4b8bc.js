import{_ as U}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-79f7e532.js";import{S as I}from"./sweetalert2.all-e795d634.js";import{V as L,a as R,P as j}from"./VPagination-92f61d4a.js";import{useCrudProductionStore as F}from"./useCrudProductionStore-894a8447.js";import{e as M,s as Q,r as m,v as H,x as C,y as q,o as G,c as J,d as e,w as a,g as s,z as K,a as d,A as v,h as _,m as O,b as p,V as g,B as W,t as X}from"./index-8ab07650.js";import{V as B}from"./VContainer-c5b930f8.js";import{V as Y}from"./VSelect-6e2871a0.js";import{V as Z}from"./VSpacer-edeea857.js";import{V as ee}from"./VTextField-a36c9478.js";import{V}from"./VTooltip-489b0134.js";import{V as te,a as P}from"./VRow-2de8352d.js";const ae={class:"me-3",production:"width: 80px;"},oe={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},le={production:"width: 10rem;"},se={colspan:"6"},ne={production:"width: 100;",class:"d-flex justify-content-center"},he=M({__name:"TableList",setup(ie){const r=F(),{action:b,productions:f,totalPage:y,lastPage:S,currentPage:n,totalData:T,loading:A,typeAction:re}=Q(r),i=m(10),c=m(""),h=m(""),x=m(""),u=async()=>{await r.fetchAll({perPage:i.value,page:n.value,searchQuery:c.value,sort_direction:h.value,sort_field:x.value})},D=[{title:"Estilo",key:"style_name"},{title:"Empleado",key:"employee_name"},{title:"Cantidad",key:"cant"},{title:"Total",key:"total"},{title:"Acciones",sortable:!1,key:"actions"}];H(async()=>{await u()});const z=async o=>{o.length>0&&(h.value=o[0].order,x.value=o[0].key,await u())};C([c,i],async()=>{n.value=1}),C([n,c,i],async()=>{await u()});const $=q(()=>{const o=f.value.length?(n.value-1)*y.value+1:0,t=f.value.length+(n.value-1)*y.value;return`Mostrando ${o} a ${t} de ${T.value} registros`}),w=async(o,t=null)=>{b.value=t==null?"new":"edit",r.clearFormulario(),r.typeAction=o,t&&r.fetchInfo(t)},E=async o=>{I.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async t=>{t.isConfirmed&&(await r.fetchDelete(o),await u())})};return(o,t)=>{const N=U;return G(),J("div",null,[e(N,{title:"Listado","sub-title":"Producciones",icon:"mdi-format-list-bulleted"}),e(B,{class:"bg-vwhite",fluid:""},{default:a(()=>[e(s(L),{headers:D,items:s(f),"items-per-page":s(i),"onUpdate:sortBy":z},K({top:a(()=>[e(B,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:a(()=>[d("div",ae,[e(Y,{modelValue:s(i),"onUpdate:modelValue":t[0]||(t[0]=l=>v(i)?i.value=l:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),e(Z),d("div",oe,[d("div",le,[e(ee,{modelValue:s(c),"onUpdate:modelValue":t[1]||(t[1]=l=>v(c)?c.value=l:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),e(V,{text:"Agregar",location:"top"},{activator:a(({props:l})=>[e(_,O({class:"ms-1",color:"light",rounded:"lg"},l,{onClick:t[2]||(t[2]=k=>w("form"))}),{default:a(()=>[p(" Agregar  "),e(g,{size:"large",color:"success",icon:"mdi-plus"})]),_:2},1040)]),_:1})])]),_:1})]),"item.actions":a(({item:l})=>[e(_,{size:"x-small",color:"error",variant:"text",icon:"",onClick:k=>E(l.value)},{default:a(()=>[e(g,{size:"22",icon:"tabler-trash"}),e(V,{activator:"parent",location:"top"},{default:a(()=>[p(" Borrar ")]),_:1})]),_:2},1032,["onClick"]),e(_,{icon:"",size:"x-small",color:"default",variant:"text",onClick:k=>w("form",l.value)},{default:a(()=>[e(g,{size:"22",icon:"tabler-edit"}),e(V,{activator:"parent",location:"top"},{default:a(()=>[p(" Editar ")]),_:1})]),_:2},1032,["onClick"])]),bottom:a(()=>[e(W,{class:"pt-2"},{default:a(()=>[e(te,null,{default:a(()=>[e(P,{lg:"4",cols:"3"},{default:a(()=>[p(X(s($)),1)]),_:1}),e(P,{lg:"8",cols:"9",class:"d-flex justify-end"},{default:a(()=>[e(R,{modelValue:s(n),"onUpdate:modelValue":t[3]||(t[3]=l=>v(n)?n.value=l:null),"total-visible":5,size:"small",length:s(S)},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1})]),_:2},[s(A)?{name:"body",fn:a(()=>[d("tr",null,[d("td",se,[d("div",ne,[e(j)])])])]),key:"0"}:void 0]),1032,["items","items-per-page"])]),_:1})])}}});export{he as _};