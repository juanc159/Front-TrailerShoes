import{i as R,Y as U,s as j,r as x,k as E,w as T,l as L,o as f,c as v,d as e,m as Q,n as s,p as a,a as p,q as _,V as y,b as d,T as g,v as G,x as Y,y as D,z as H,R as J,A as K,B as O,C as P,t as W,S as X}from"./index-c9350ca5.js";import{P as Z}from"./PreloadInterno-0cd51b40.js";import{useRequirementStore as ee}from"./useRequirementStore-d9b1061a.js";import{V as k}from"./VTooltip-7bf3ee5c.js";import{V as te}from"./VSpacer-99f3f8c3.js";import{V as ae}from"./VPagination-9ea17d1d.js";import{V as oe}from"./VDataTable-1f115dfc.js";const le={key:0},se={key:1},ie=["href"],ne={key:3},re={colspan:"4"},ce={style:{width:"100"},class:"d-flex justify-content-center"},de={class:"me-3",style:{width:"80px"}},ue={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},fe={style:{width:"10rem"}},xe=R({__name:"TableList",setup(pe){const i=ee(),r=U(),{requirements:w,totalPage:b,lastPage:$,currentPage:n,totalData:A,loading:M}=j(i),c=x(10),u=x(""),B=x(""),S=x(""),h=async()=>{var t,o,m;let l={perPage:c.value,page:n.value,searchQuery:u.value,sort_direction:B.value,sort_field:S.value};l.charge_id=(t=r.user)==null?void 0:t.charge_id,((o=r.user)==null?void 0:o.role_id)==2&&(l.user_id=(m=r.user)==null?void 0:m.id),await i.fetchAll(l)},I=[{title:"Id",key:"id"},{title:"Tipo",key:"type"},{title:"Estado",key:"state"},{title:"Acciones",sortable:!1,key:"actions"}];E(async()=>{await h()});const q=async l=>{l.length>0&&(B.value=l[0].order,S.value=l[0].key,await h())};T([u,c],async()=>{n.value=1}),T([n,u,c],async()=>{await h()});const F=L(()=>{const l=w.value.length?(n.value-1)*b.value+1:0,t=w.value.length+(n.value-1)*b.value;return`Mostrando ${l} a ${t} de ${A.value} registros`}),V=async(l,t=null)=>{i.clearFormularioManage(),i.disabled=!1,i.clearFormulario(),i.typeAction=l,t&&l=="ManageData"&&i.fetchManageDataForm({requirement_id:t}),t&&l=="form"&&i.fetchInfo(t)},N=async l=>{X.fire({title:"¿Desea eliminar el registro?",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Si",denyButtonText:"No"}).then(async t=>{t.isConfirmed?(await i.fetchDelete(l),await h()):t.isDenied})};return(l,t)=>(f(),v("div",null,[e(s(oe),{headers:I,items:s(w),"items-per-page":s(c),"onUpdate:sortBy":q},Q({"item.actions":a(({item:o})=>{var m,z;return[(m=s(r).user)!=null&&m.charge_id?(f(),v("div",le,[e(_,{icon:"",size:"x-small",color:"default",variant:"text",onClick:C=>V("ManageData",o.value)},{default:a(()=>[e(y,{size:"22",icon:"tabler-eye"}),e(k,{activator:"parent",location:"top"},{default:a(()=>[d(" Visualizar ")]),_:1})]),_:2},1032,["onClick"])])):g("",!0),o.props.title.state_id!=3&&((z=s(r).user)!=null&&z.charge_id)?(f(),v("div",se,[e(_,{size:"x-small",color:"error",variant:"text",icon:"",onClick:C=>N(o.value)},{default:a(()=>[e(y,{size:"22",icon:"tabler-trash"}),e(k,{activator:"parent",location:"top"},{default:a(()=>[d(" Borrar ")]),_:1})]),_:2},1032,["onClick"]),e(_,{icon:"",size:"x-small",color:"default",variant:"text",onClick:C=>V("ManageData",o.value)},{default:a(()=>[e(y,{size:"22",icon:"tabler-settings"}),e(k,{activator:"parent",location:"top"},{default:a(()=>[d(" Gestionar ")]),_:1})]),_:2},1032,["onClick"])])):g("",!0),o.raw.archive_final?(f(),v("a",{key:2,href:o.raw.archive_final,download:"Documento Final",target:"_blank"},[e(y,{icon:"mdi-download"}),d(" Descargar ")],8,ie)):g("",!0),s(r).permissions.includes("petition.index")?(f(),v("div",ne,[e(_,{icon:"",size:"x-small",color:"default",variant:"text",onClick:C=>V("form",o.value)},{default:a(()=>[e(y,{size:"22",icon:"tabler-eye"}),e(k,{activator:"parent",location:"top"},{default:a(()=>[d(" Visualizar ")]),_:1})]),_:2},1032,["onClick"])])):g("",!0)]}),top:a(()=>[e(G,{fluid:"",class:"d-flex flex-wrap py-4 gap-4"},{default:a(()=>[p("div",de,[e(Y,{modelValue:s(c),"onUpdate:modelValue":t[0]||(t[0]=o=>D(c)?c.value=o:null),density:"compact",variant:"outlined",items:[10,20,30,50]},null,8,["modelValue"])]),e(te),p("div",ue,[p("div",fe,[e(H,{modelValue:s(u),"onUpdate:modelValue":t[1]||(t[1]=o=>D(u)?u.value=o:null),placeholder:"Buscar",density:"compact"},null,8,["modelValue"])]),s(r).permissions.includes("petition.index")?(f(),J(_,{key:0,color:"primary",onClick:t[2]||(t[2]=o=>V("form"))},{default:a(()=>[d(" Agregar ")]),_:1})):g("",!0)])]),_:1})]),bottom:a(()=>[e(K,{class:"pt-2"},{default:a(()=>[e(O,null,{default:a(()=>[e(P,{lg:"4",cols:"3"},{default:a(()=>[d(W(s(F)),1)]),_:1}),e(P,{lg:"8",cols:"9",class:"d-flex justify-end"},{default:a(()=>[e(ae,{modelValue:s(n),"onUpdate:modelValue":t[3]||(t[3]=o=>D(n)?n.value=o:null),"total-visible":5,size:"small",length:s($)},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1})]),_:2},[s(M).table?{name:"body",fn:a(()=>[p("tr",null,[p("td",re,[p("div",ce,[e(Z)])])])]),key:"0"}:void 0]),1032,["items","items-per-page"])]))}});export{xe as _};