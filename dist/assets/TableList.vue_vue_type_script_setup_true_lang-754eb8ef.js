import{_ as L}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-e1c88155.js";import{P as E}from"./PreloadInterno-a5d99930.js";import{useCrudUserStore as M}from"./useCrudUserStore-44b2acae.js";import{e as j,v as F,x as H,y as m,z as Q,A as k,B as G,o as J,c as K,d as e,w as a,h as s,C as q,m as y,V as _,b as p,D as b,a as d,E as O,G as g,H as W,I as X,J as Y,K as Z,L as D,t as ee,S as T,M as te}from"./index-dd53741e.js";import{V as ae}from"./VDataTable-d1d16a2f.js";import{V as h}from"./VTooltip-c58f227b.js";import{V as oe}from"./VSpacer-ddef0a47.js";import{V as le}from"./VPagination-8df84faf.js";const se={colspan:"7"},ie={style:{width:"100"},class:"d-flex justify-content-center"},ne={class:"me-3",style:{width:"80px"}},re={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},ce={style:{width:"10rem"}},Ve=j({__name:"TableList",setup(de){F();const r=M(),P=[{title:"Nombre usuario",key:"name"},{title:"Tipo de identificación",key:"identityType_name"},{title:"Número de identificación",key:"idNumber"},{title:"Correo",key:"email"},{title:"Rol",key:"role_name"},{title:"Cargo",key:"charge_name"},{title:"Acciones",sortable:!1,key:"actions"}],{action:S,users:v,totalPage:V,lastPage:A,currentPage:i,totalData:z,loading:N,countRoles:U,typeAction:ue}=H(r),n=m(10),c=m(""),x=m(""),w=m(""),u=async()=>{await r.fetchAll({perPage:n.value,page:i.value,searchQuery:c.value,sort_direction:x.value,sort_field:w.value})};Q(async()=>{await u()});const $=async o=>{o.length>0&&(x.value=o[0].order,w.value=o[0].key,await u())};k([c,n],async()=>{i.value=1}),k([i,c,n],async()=>{await u()});const R=G(()=>{const o=v.value.length?(i.value-1)*V.value+1:0,t=v.value.length+(i.value-1)*V.value;return`Mostrando ${o} a ${t} de ${z.value} registros`}),C=async(o,t=null)=>{S.value=t==null?"new":"edit",r.clearFormulario(),r.typeAction=o,U.value==0&&o=="form"&&T.fire({title:"Primero debe ingresar los roles",showCancelButton:!1,showDenyButton:!0,denyButtonText:"Cerrar",confirmButtonText:"Ir"}).then(async f=>{f.isConfirmed?te.push("/admin/role"):f.isDenied}),t&&r.fetchInfo(t)},I=async o=>{T.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async t=>{t.isConfirmed?(await r.fetchDelete(o),await u()):t.isDenied})};return(o,t)=>{const f=L;return J(),K("div",null,[e(f,{title:"Listado","sub-title":"Usuarios",icon:"mdi-format-list-bulleted"}),e(b,{class:"bg-vwhite",fluid:""},{default:a(()=>[e(s(ae),{headers:P,items:s(v),"items-per-page":s(n),"onUpdate:sortBy":$},q({"item.actions":a(({item:l})=>[e(y,{icon:"",size:"x-small",color:"error",variant:"text",onClick:B=>I(l.value)},{default:a(()=>[e(_,{size:"22",icon:"tabler-trash"}),e(h,{activator:"parent",location:"top"},{default:a(()=>[p(" Borrar ")]),_:1})]),_:2},1032,["onClick"]),e(y,{icon:"",size:"x-small",color:"default",variant:"text",onClick:B=>C("form",l.value)},{default:a(()=>[e(_,{size:"22",icon:"tabler-edit"}),e(h,{activator:"parent",location:"top"},{default:a(()=>[p(" Editar ")]),_:1})]),_:2},1032,["onClick"])]),top:a(()=>[e(b,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:a(()=>[d("div",ne,[e(O,{modelValue:s(n),"onUpdate:modelValue":t[0]||(t[0]=l=>g(n)?n.value=l:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),e(oe),d("div",re,[d("div",ce,[e(W,{modelValue:s(c),"onUpdate:modelValue":t[1]||(t[1]=l=>g(c)?c.value=l:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),e(h,{text:"Agregar",location:"top"},{activator:a(({props:l})=>[e(y,X({class:"ms-1",color:"light",rounded:"lg"},l,{onClick:t[2]||(t[2]=B=>C("form"))}),{default:a(()=>[p(" Agregar "),e(_,{size:"large",color:"success",icon:"mdi-plus"})]),_:2},1040)]),_:1})])]),_:1})]),bottom:a(()=>[e(Y,{class:"pt-2"},{default:a(()=>[e(Z,null,{default:a(()=>[e(D,{lg:"4",cols:"3"},{default:a(()=>[p(ee(s(R)),1)]),_:1}),e(D,{lg:"8",cols:"9",class:"d-flex justify-end"},{default:a(()=>[e(le,{modelValue:s(i),"onUpdate:modelValue":t[3]||(t[3]=l=>g(i)?i.value=l:null),"total-visible":5,size:"small",length:s(A)},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1})]),_:2},[s(N)?{name:"body",fn:a(()=>[d("tr",null,[d("td",se,[d("div",ie,[e(E)])])])]),key:"0"}:void 0]),1032,["items","items-per-page"])]),_:1})])}}});export{Ve as _};
