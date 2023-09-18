import{_ as U}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-b09167ce.js";import"./sweetalert2.all-e795d634.js";import{V as E,a as L,P as R}from"./VPagination-0c12adbe.js";import{useCompaniesStore as j}from"./useCompaniesStore-27c7fb46.js";import{e as F,s as M,r as m,v as Q,x as h,y as H,o as x,c as J,d as e,w as a,g as o,z as K,a as c,A as f,J as q,h as w,m as G,b as v,V as b,K as O,B as W,t as X}from"./index-7cf6b37e.js";import{V as k}from"./VContainer-8fc3c34e.js";import{V as Y}from"./VSelect-7d00fc06.js";import{V as Z}from"./VSpacer-f495e735.js";import{V as ee}from"./VTextField-2736fda9.js";import{V as C}from"./VTooltip-a5b1d196.js";import{V as te,a as P}from"./VRow-a322e02c.js";const ae={class:"me-3",style:{width:"80px"}},oe={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},le={style:{width:"10rem"}},se={colspan:"2"},ne={style:{width:"100"},class:"d-flex justify-content-center"},he=F({__name:"TableList",setup(re){const d=j(),{action:A,dataList:u,totalPage:V,lastPage:B,currentPage:s,totalData:S,loading:T,typeAction:ie}=M(d),r=m(10),i=m(""),g=m(""),_=m(""),p=async()=>{await d.fetchAll({perPage:r.value,page:s.value,searchQuery:i.value,sort_direction:g.value,sort_field:_.value})},$=[{title:"Nombre",key:"name"},{title:"Acciones",sortable:!1,key:"actions"}];Q(async()=>{await p()});const z=async n=>{n.length>0&&(g.value=n[0].order,_.value=n[0].key,await p())};h([i,r],async()=>{s.value=1}),h([s,i,r],async()=>{await p()});const D=H(()=>{const n=u.value.length?(s.value-1)*V.value+1:0,t=u.value.length+(s.value-1)*V.value;return`Mostrando ${n} a ${t} de ${S.value} registros`}),y=async(n,t=null)=>{A.value=t==null?"new":"edit",d.clearFormulario(),d.typeAction=n,t&&d.fetchInfo(t)};return(n,t)=>{const N=U;return x(),J("div",null,[e(N,{title:"Información","sub-title":"Empresa",icon:"mdi-information-variant"}),e(k,{class:"bg-vwhite",fluid:""},{default:a(()=>[e(o(E),{headers:$,items:o(u),"items-per-page":o(r),"onUpdate:sortBy":z},K({top:a(()=>[e(k,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:a(()=>[c("div",ae,[e(Y,{modelValue:o(r),"onUpdate:modelValue":t[0]||(t[0]=l=>f(r)?r.value=l:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),e(Z),c("div",oe,[c("div",le,[e(ee,{modelValue:o(i),"onUpdate:modelValue":t[1]||(t[1]=l=>f(i)?i.value=l:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),o(u).length==0?(x(),q(C,{key:0,text:"Agregar",location:"top"},{activator:a(({props:l})=>[e(w,G({class:"ms-1",color:"light",rounded:"lg"},l,{onClick:t[2]||(t[2]=I=>y("form"))}),{default:a(()=>[v(" Agregar "),e(b,{size:"large",color:"success",icon:"mdi-plus"})]),_:2},1040)]),_:1})):O("",!0)])]),_:1})]),"item.actions":a(({item:l})=>[e(w,{icon:"",size:"x-small",color:"default",variant:"text",onClick:I=>y("form",l.value)},{default:a(()=>[e(b,{size:"22",icon:"tabler-edit"}),e(C,{activator:"parent",location:"top"},{default:a(()=>[v(" Editar ")]),_:1})]),_:2},1032,["onClick"])]),bottom:a(()=>[e(W,{class:"pt-2"},{default:a(()=>[e(te,null,{default:a(()=>[e(P,{lg:"4",cols:"3"},{default:a(()=>[v(X(o(D)),1)]),_:1}),e(P,{lg:"8",cols:"9",class:"d-flex justify-end"},{default:a(()=>[e(L,{modelValue:o(s),"onUpdate:modelValue":t[3]||(t[3]=l=>f(s)?s.value=l:null),"total-visible":5,size:"small",length:o(B)},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1})]),_:2},[o(T)?{name:"body",fn:a(()=>[c("tr",null,[c("td",se,[c("div",ne,[e(R)])])])]),key:"0"}:void 0]),1032,["items","items-per-page"])]),_:1})])}}});export{he as _};
