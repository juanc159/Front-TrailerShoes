import{_ as L}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-f28a0ff4.js";import{V as j,a as E,P as F}from"./VPagination-2f39961c.js";import{useCrudUserStore as M}from"./useCrudUserStore-97973f59.js";import{e as Q,q,s as H,r as f,v as G,x as k,y as J,o as K,c as O,d as e,w as a,g as s,z as W,h as y,V as g,b as p,a as d,A as _,m as X,B as Y,t as Z,C as ee}from"./index-9109da95.js";import{S as b}from"./sweetalert2.all-e795d634.js";import{V}from"./VTooltip-680e0cc5.js";import{V as T}from"./VContainer-7df9bcd8.js";import{V as te}from"./VSelect-a002075f.js";import{V as ae}from"./VSpacer-807a8b15.js";import{V as oe}from"./VTextField-4769d080.js";import{V as le,a as D}from"./VRow-50fa08d6.js";const se={colspan:"7"},ie={style:{width:"100"},class:"d-flex justify-content-center"},ne={class:"me-3",style:{width:"80px"}},re={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},ce={style:{width:"10rem"}},Ce=Q({__name:"TableList",setup(de){q();const r=M(),P=[{title:"Nombre usuario",key:"name"},{title:"Tipo de identificación",key:"identityType_name"},{title:"Número de identificación",key:"idNumber"},{title:"Correo",key:"email"},{title:"Rol",key:"role_name"},{title:"Cargo",key:"charge_name"},{title:"Acciones",sortable:!1,key:"actions"}],{action:S,users:v,totalPage:h,lastPage:A,currentPage:i,totalData:z,loading:N,countRoles:U,typeAction:ue}=H(r),n=f(10),c=f(""),x=f(""),w=f(""),u=async()=>{await r.fetchAll({perPage:n.value,page:i.value,searchQuery:c.value,sort_direction:x.value,sort_field:w.value})};G(async()=>{await u()});const $=async o=>{o.length>0&&(x.value=o[0].order,w.value=o[0].key,await u())};k([c,n],async()=>{i.value=1}),k([i,c,n],async()=>{await u()});const R=J(()=>{const o=v.value.length?(i.value-1)*h.value+1:0,t=v.value.length+(i.value-1)*h.value;return`Mostrando ${o} a ${t} de ${z.value} registros`}),C=async(o,t=null)=>{S.value=t==null?"new":"edit",r.clearFormulario(),r.typeAction=o,U.value==0&&o=="form"&&b.fire({title:"Primero debe ingresar los roles",showCancelButton:!1,showDenyButton:!0,denyButtonText:"Cerrar",confirmButtonText:"Ir"}).then(async m=>{m.isConfirmed?ee.push("/admin/role"):m.isDenied}),t&&r.fetchInfo(t)},I=async o=>{b.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async t=>{t.isConfirmed?(await r.fetchDelete(o),await u()):t.isDenied})};return(o,t)=>{const m=L;return K(),O("div",null,[e(m,{title:"Listado","sub-title":"Usuarios",icon:"mdi-format-list-bulleted"}),e(T,{class:"bg-vwhite",fluid:""},{default:a(()=>[e(s(j),{headers:P,items:s(v),"items-per-page":s(n),"onUpdate:sortBy":$},W({"item.actions":a(({item:l})=>[e(y,{icon:"",size:"x-small",color:"error",variant:"text",onClick:B=>I(l.value)},{default:a(()=>[e(g,{size:"22",icon:"tabler-trash"}),e(V,{activator:"parent",location:"top"},{default:a(()=>[p(" Borrar ")]),_:1})]),_:2},1032,["onClick"]),e(y,{icon:"",size:"x-small",color:"default",variant:"text",onClick:B=>C("form",l.value)},{default:a(()=>[e(g,{size:"22",icon:"tabler-edit"}),e(V,{activator:"parent",location:"top"},{default:a(()=>[p(" Editar ")]),_:1})]),_:2},1032,["onClick"])]),top:a(()=>[e(T,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:a(()=>[d("div",ne,[e(te,{modelValue:s(n),"onUpdate:modelValue":t[0]||(t[0]=l=>_(n)?n.value=l:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),e(ae),d("div",re,[d("div",ce,[e(oe,{modelValue:s(c),"onUpdate:modelValue":t[1]||(t[1]=l=>_(c)?c.value=l:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),e(V,{text:"Agregar",location:"top"},{activator:a(({props:l})=>[e(y,X({class:"ms-1",color:"light",rounded:"lg"},l,{onClick:t[2]||(t[2]=B=>C("form"))}),{default:a(()=>[p(" Agregar "),e(g,{size:"large",color:"success",icon:"mdi-plus"})]),_:2},1040)]),_:1})])]),_:1})]),bottom:a(()=>[e(Y,{class:"pt-2"},{default:a(()=>[e(le,null,{default:a(()=>[e(D,{lg:"4",cols:"3"},{default:a(()=>[p(Z(s(R)),1)]),_:1}),e(D,{lg:"8",cols:"9",class:"d-flex justify-end"},{default:a(()=>[e(E,{modelValue:s(i),"onUpdate:modelValue":t[3]||(t[3]=l=>_(i)?i.value=l:null),"total-visible":5,size:"small",length:s(A)},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1})]),_:2},[s(N)?{name:"body",fn:a(()=>[d("tr",null,[d("td",se,[d("div",ie,[e(F)])])])]),key:"0"}:void 0]),1032,["items","items-per-page"])]),_:1})])}}});export{Ce as _};
