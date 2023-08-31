import{_ as I}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-b09167ce.js";import{V as N,a as U,P as L}from"./VPagination-0c12adbe.js";import{useCrudMenuStore as R}from"./useCrudMenuStore-a97c21f4.js";import{S as j}from"./sweetalert2.all-e795d634.js";import{e as E,s as F,r as m,v as Q,x,y as G,o as H,c as q,d as e,w as a,g as n,z as J,a as d,A as v,h as V,m as K,b as f,V as y,B as O,t as W}from"./index-7cf6b37e.js";import{V as k}from"./VContainer-8fc3c34e.js";import{V as X}from"./VSelect-7d00fc06.js";import{V as Y}from"./VSpacer-f495e735.js";import{V as Z}from"./VTextField-2736fda9.js";import{V as g}from"./VTooltip-a5b1d196.js";import{V as ee,a as b}from"./VRow-a322e02c.js";const te={class:"me-3",style:{width:"80px"}},ae={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},oe={style:{width:"10rem"}},le={colspan:"4"},se={style:{width:"100"},class:"d-flex justify-content-center"},ge=E({__name:"TableList",setup(ne){const i=R(),{action:B,menus:p,totalPage:_,currentPage:s,totalData:C,loading:D}=F(i),r=m(10),c=m(""),P=m(""),S=m(""),T=[{title:"Título",key:"title"},{title:"Direccionar a",key:"to"},{title:"Icon",key:"icon"},{title:"Acciones",sortable:!1,key:"actions"}],u=async()=>{await i.fetchAll({perPage:r.value,page:s.value,searchQuery:c.value})};Q(async()=>{i.typeAction!="back"&&await u()});const A=async o=>{o.length>0&&(P.value=o[0].order,S.value=o[0].key,await u())};x([c,r],async()=>{s.value=1}),x([s,c,r],async()=>{await u()});const z=G(()=>{const o=p.value.length?(s.value-1)*_.value+1:0,t=p.value.length+(s.value-1)*_.value;return`Mostrando ${o} a ${t} de ${C.value} registros`}),h=async(o,t=null)=>{B.value=t==null?"new":"edit",i.clearFormulario(),i.typeAction=o,t&&i.fetchInfo(t)},$=async o=>{j.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async t=>{t.isConfirmed?(await i.fetchDelete(o),await u()):t.isDenied})};return(o,t)=>{const M=I;return H(),q("div",null,[e(M,{title:"Listado","sub-title":"Menú",icon:"mdi-format-list-bulleted"}),e(k,{class:"bg-vwhite",fluid:""},{default:a(()=>[e(n(N),{headers:T,items:n(p),"items-per-page":n(r),"onUpdate:sortBy":A},J({top:a(()=>[e(k,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:a(()=>[d("div",te,[e(X,{modelValue:n(r),"onUpdate:modelValue":t[0]||(t[0]=l=>v(r)?r.value=l:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),e(Y),d("div",ae,[d("div",oe,[e(Z,{modelValue:n(c),"onUpdate:modelValue":t[1]||(t[1]=l=>v(c)?c.value=l:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),e(g,{text:"Guardar",location:"top"},{activator:a(({props:l})=>[e(V,K({class:"ms-1",color:"light",rounded:"lg"},l,{onClick:t[2]||(t[2]=w=>h("form"))}),{default:a(()=>[f(" Agregar "),e(y,{size:"large",color:"success",icon:"mdi-plus"})]),_:2},1040)]),_:1})])]),_:1})]),"item.actions":a(({item:l})=>[e(V,{icon:"",size:"x-small",color:"error",variant:"text",onClick:w=>$(l.value)},{default:a(()=>[e(y,{size:"22",icon:"tabler-trash"}),e(g,{activator:"parent",location:"top"},{default:a(()=>[f(" Borrar ")]),_:1})]),_:2},1032,["onClick"]),e(V,{icon:"",size:"x-small",color:"default",variant:"text",onClick:w=>h("form",l.value)},{default:a(()=>[e(y,{size:"22",icon:"tabler-edit"}),e(g,{activator:"parent",location:"top"},{default:a(()=>[f(" Editar ")]),_:1})]),_:2},1032,["onClick"])]),bottom:a(()=>[e(O,{class:"pt-2"},{default:a(()=>[e(ee,null,{default:a(()=>[e(b,{lg:"4",cols:"3"},{default:a(()=>[f(W(n(z)),1)]),_:1}),e(b,{lg:"8",cols:"9",class:"d-flex justify-end"},{default:a(()=>[e(U,{modelValue:n(s),"onUpdate:modelValue":t[3]||(t[3]=l=>v(s)?s.value=l:null),"total-visible":5,size:"small",length:o.lastPage},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1})]),_:2},[n(D)?{name:"body",fn:a(()=>[d("tr",null,[d("td",le,[d("div",se,[e(L)])])])]),key:"0"}:void 0]),1032,["items","items-per-page"])]),_:1})])}}});export{ge as _};
