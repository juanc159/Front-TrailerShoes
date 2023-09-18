import{i as de,s as ce,r as v,k as me,l as pe,o as y,c as x,d as e,p as l,C as n,q as m,b as V,B as c,z as k,n as o,L as b,a as O,a0 as q,K as $,x as G,a4 as J,I as fe,a5 as ve,J as ye,V as C,T as L,Q as T,R as A,O as N,P as M,t as Ve,S as D}from"./index-c9350ca5.js";import{u as be}from"./useSelect2Infite-1d5d9c41.js";import{useCrudRequirementTypeStore as _e}from"./useCrudRequirementTypeStore-ce311232.js";import{V as I}from"./VTooltip-7bf3ee5c.js";import{V as W}from"./VDataTable-1f115dfc.js";const ge={class:"demo-space-x"},ke={class:"d-flex justify-content-center aling-items-center"},xe={key:0,class:"d-flex justify-content-between aling-items-center p-2"},Ce={class:"v-data-table__tr"},he=["colspan"],Ie=["colspan"],Oe=O("b",null,"Esta tipo de input no posee opciones asociadas",-1),Be=de({__name:"Form",setup(we){const h=_e(),{formulario:u,charges_arrayInfo:B,charges_countLinks:H,loading:R}=ce(h),w=v([]),S=v(),j=v(),E=v(),p=be(h.fetchSelectCharges,B),P=async r=>{var a;h.typeAction=r,await((a=S.value)==null?void 0:a.resetValidation()),w.value=[],r!="back"&&h.keyList++},X=async()=>{var a;const r=await((a=S.value)==null?void 0:a.validate());if(r!=null&&r.valid){const t=await h.fetchSave();t.code===200&&P("list"),t.code===422&&(w.value=t.errors??[])}};me(async()=>{await h.fetchDataForm(),p.dataNueva.value=B.value,p.totalLinks.value=H.value});const f=v({charge:null,order:null}),Q=v(),F=[{title:"Cargo",key:"name"},{title:"Orden",key:"order"},{title:"Acciones",sortable:!1,key:"actions"}],Z=()=>{f.value={charge:null,order:null}},ee=async()=>{var a;const r=await((a=Q.value)==null?void 0:a.validate());if(r!=null&&r.valid){const t=u.value.arrayCharges.find(g=>g.charge_id==f.value.charge),s=u.value.arrayCharges.find(g=>g.order==f.value.order),i=B.value.find(g=>g.id==f.value.charge);if(s)return D.fire("Ya existe un cargo con el número orden "+f.value.order),!1;if(t)return D.fire("Ya existe este cargo agregado"),!1;u.value.arrayCharges.push({charge_id:i==null?void 0:i.id,name:i==null?void 0:i.name,order:f.value.order}),Z()}},le=r=>{u.value.arrayCharges.splice(r,1)},K=[1,5],d=v({label:null,type_input:null,required:0}),U=v({name:null}),_=v([]),Y=v([{value:1,title:"text"},{value:2,title:"select"},{value:3,title:"checkbox"},{value:4,title:"radio"},{value:5,title:"file"}]),z=pe(()=>u.value.arrayInputs.filter(r=>r.delete!="delete")),ae=[{title:"",key:"data-table-expand",sortable:!1},{title:"Label",key:"label",sortable:!1},{title:"Obligatorio",key:"required",sortable:!1},{title:"Tipo de input",key:"type_name",sortable:!1},{title:"Acciones",key:"actions",sortable:!1}],te=()=>{_.value=[]},oe=async()=>{var a;const r=await((a=j.value)==null?void 0:a.validate());if(r!=null&&r.valid){if(!K.includes(d.value.type_input)&&_.value.length==0)return D.fire("Debe agregar almenos una opción  al input"),!1;const t=Y.value.find(s=>s.value==d.value.type_input);u.value.arrayInputs.push({label:d.value.label,type_input:d.value.type_input,required:d.value.required,type_name:t.title,arrayOptions:[]}),_.value.forEach(s=>{u.value.arrayInputs[u.value.arrayInputs.length-1].arrayOptions.push(s)}),re()}},re=async()=>{d.value={label:null,type_input:null,required:0}},ne=async r=>{u.value.arrayInputs[r].id?u.value.arrayInputs[r].delete="delete":u.value.arrayInputs.splice(r,1)},se=async()=>{var a;const r=await((a=E.value)==null?void 0:a.validate());r!=null&&r.valid&&(_.value.push({name:U.value.name}),U.value={name:null})},ue=async r=>{_.value[r].id?_.value[r].delete="delete":_.value.splice(r,1)},ie=async(r,a)=>{z.value[r].arrayOptions[a].id?z.value[r].arrayOptions[a].delete="delete":z.value[r].arrayOptions.splice(a,1)};return(r,a)=>(y(),x("div",null,[e(c,null,{default:l(()=>[e(n,{cols:"12",class:"d-flex justify-content-end"},{default:l(()=>[e(m,{color:"secondary",onClick:a[0]||(a[0]=t=>P("back"))},{default:l(()=>[V(" Atras ")]),_:1})]),_:1})]),_:1}),e($,{ref_key:"formValidation",ref:S,"lazy-validation":""},{default:l(()=>[e(c,null,{default:l(()=>[e(n,{cols:"4"},{default:l(()=>[e(k,{clearable:"",modelValue:o(u).name,"onUpdate:modelValue":a[1]||(a[1]=t=>o(u).name=t),rules:[o(b)],"error-messages":o(w).name,label:"Nombre",onKeypress:a[2]||(a[2]=t=>o(w).name="")},null,8,["modelValue","rules","error-messages"])]),_:1}),e(n,{cols:"4"},{default:l(()=>[O("div",ge,[e(q,{modelValue:o(u).internal,"onUpdate:modelValue":a[3]||(a[3]=t=>o(u).internal=t),"true-value":1,"false-value":0,label:"Interno"},null,8,["modelValue"]),e(q,{modelValue:o(u).external,"onUpdate:modelValue":a[4]||(a[4]=t=>o(u).external=t),"true-value":1,"false-value":0,label:"Externo"},null,8,["modelValue"])])]),_:1})]),_:1})]),_:1},512),e($,{ref_key:"formPivotValidation",ref:Q,"lazy-validation":""},{default:l(()=>[e(c,null,{default:l(()=>[e(n,{cols:"4"},{default:l(()=>[e(G,{clearable:"","item-title":"name",label:"Cargo","item-value":"id",items:o(p).dataNueva.value,modelValue:o(f).charge,"onUpdate:modelValue":a[8]||(a[8]=t=>o(f).charge=t),rules:[o(b)]},{"prepend-item":l(()=>[e(k,{placeholder:"Buscar...",class:"mb-2",modelValue:o(p).searchQuery.value,"onUpdate:modelValue":a[5]||(a[5]=t=>o(p).searchQuery.value=t)},null,8,["modelValue"]),e(J)]),"append-item":l(()=>[e(J),O("div",ke,[fe(e(ve,{size:"24",color:"primary",indeterminate:""},null,512),[[ye,o(R)]])]),o(R)?L("",!0):(y(),x("div",xe,[O("div",null,[e(m,{class:"mt-2",disabled:o(p).page.value<=1,onClick:a[6]||(a[6]=t=>o(p).prev()),color:"success"},{default:l(()=>[e(C,{icon:"mdi-chevron-left"})]),_:1},8,["disabled"]),e(m,{class:"mt-2",disabled:o(p).page.value>=o(p).totalLinks.value,onClick:a[7]||(a[7]=t=>o(p).next()),color:"success"},{default:l(()=>[e(C,{icon:"mdi-chevron-right"})]),_:1},8,["disabled"])])]))]),_:1},8,["items","modelValue","rules"])]),_:1}),e(n,{cols:"4"},{default:l(()=>[e(k,{clearable:"",modelValue:o(f).order,"onUpdate:modelValue":a[9]||(a[9]=t=>o(f).order=t),rules:[o(b)],label:"Orden"},null,8,["modelValue","rules"])]),_:1}),e(n,{cols:"4"},{default:l(()=>[e(m,{color:"primary",icon:"",size:"35",onClick:a[10]||(a[10]=t=>ee())},{default:l(()=>[e(C,{icon:"tabler-plus"}),e(I,{activator:"parent",location:"top"},{default:l(()=>[V("Agregar")]),_:1})]),_:1})]),_:1})]),_:1}),e(c,null,{default:l(()=>[e(n,{cols:"12"},{default:l(()=>[e(o(W),{headers:F,"items-per-page":"999",items:o(u).arrayCharges},{"item.actions":l(({item:t,index:s})=>[e(m,{size:"x-small",color:"error",variant:"text",icon:"",onClick:i=>le(s)},{default:l(()=>[e(C,{size:"22",icon:"tabler-trash"}),e(I,{activator:"parent",location:"top"},{default:l(()=>[V("Borrar")]),_:1})]),_:2},1032,["onClick"])]),bottom:l(()=>[]),_:1},8,["items"])]),_:1})]),_:1})]),_:1},512),e($,{ref_key:"formInputValidation",ref:j,"lazy-validation":""},{default:l(()=>[e(c,null,{default:l(()=>[e(n,{cols:"4"},{default:l(()=>[e(T,{class:"mb-1 text-body-2 text-high-emphasis",text:"Label"}),e(k,{modelValue:o(d).label,"onUpdate:modelValue":a[11]||(a[11]=t=>o(d).label=t),rules:[o(b)]},null,8,["modelValue","rules"])]),_:1}),e(n,{cols:"4"},{default:l(()=>[e(T,{class:"mb-1 text-body-2 text-high-emphasis",text:"Tipo de input"}),e(G,{clearable:"",rules:[o(b)],"onUpdate:modelValue":[a[12]||(a[12]=t=>te()),a[13]||(a[13]=t=>o(d).type_input=t)],items:o(Y),modelValue:o(d).type_input},null,8,["rules","items","modelValue"])]),_:1}),e(n,{cols:"1"},{default:l(()=>[e(T,{class:"mb-1 text-body-2 text-high-emphasis",text:"Obligatorio"}),e(q,{modelValue:o(d).required,"onUpdate:modelValue":a[14]||(a[14]=t=>o(d).required=t),"true-value":1,"false-value":0},null,8,["modelValue"])]),_:1}),e(n,{cols:"3",class:"mt-6"},{default:l(()=>[e(m,{onClick:a[15]||(a[15]=t=>oe())},{default:l(()=>[V(" Agregar Input ")]),_:1})]),_:1})]),_:1})]),_:1},512),o(d).type_input&&!K.includes(o(d).type_input)?(y(),A($,{key:0,ref_key:"formOptionValidation",ref:E,"lazy-validation":""},{default:l(()=>[e(c,null,{default:l(()=>[e(n,{cols:"4"},{default:l(()=>[e(k,{clearable:"",modelValue:o(U).name,"onUpdate:modelValue":a[16]||(a[16]=t=>o(U).name=t),rules:[o(b)],label:"Opción"},null,8,["modelValue","rules"])]),_:1}),e(n,{cols:"4"},{default:l(()=>[e(m,{onClick:a[17]||(a[17]=t=>se())},{default:l(()=>[V(" Agregar Opción ")]),_:1})]),_:1})]),_:1}),(y(!0),x(N,null,M(o(_),(t,s)=>(y(),A(c,{key:s},{default:l(()=>[e(n,{cols:"4"},{default:l(()=>[e(k,{modelValue:t.name,"onUpdate:modelValue":i=>t.name=i,rules:[o(b)],label:"Opción #"+(s+1)},null,8,["modelValue","onUpdate:modelValue","rules","label"])]),_:2},1024),e(n,{cols:"4"},{default:l(()=>[e(m,{size:"x-small",color:"error",variant:"text",icon:"",onClick:i=>ue(s)},{default:l(()=>[e(C,{size:"22",icon:"tabler-trash"}),e(I,{activator:"parent",location:"top"},{default:l(()=>[V("Borrar")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1},512)):L("",!0),e(c,null,{default:l(()=>[e(n,{cols:"12"},{default:l(()=>[e(o(W),{headers:ae,items:o(z)},{"item.actions":l(({item:t,index:s})=>[e(m,{size:"x-small",color:"error",variant:"text",icon:"",onClick:i=>ne(s)},{default:l(()=>[e(C,{size:"22",icon:"tabler-trash"}),e(I,{activator:"parent",location:"top"},{default:l(()=>[V("Borrar")]),_:1})]),_:2},1032,["onClick"])]),"expanded-row":l(t=>[O("tr",Ce,[t.item.raw.arrayOptions.length>0?(y(),x("td",{key:0,colspan:F.length},[(y(!0),x(N,null,M(t.item.raw.arrayOptions,(s,i)=>(y(),A(c,{class:"my-1",key:i},{default:l(()=>[s.delete?L("",!0):(y(),x(N,{key:0},[e(n,{cols:"1"},{default:l(()=>[e(T,null,{default:l(()=>[V("Opción "+Ve(i+1)+" : ",1)]),_:2},1024)]),_:2},1024),e(n,{cols:"4"},{default:l(()=>[e(k,{clearable:"",modelValue:s.name,"onUpdate:modelValue":g=>s.name=g,rules:[o(b)]},null,8,["modelValue","onUpdate:modelValue","rules"])]),_:2},1024),e(n,{cols:"4"},{default:l(()=>[e(m,{size:"x-small",color:"error",variant:"text",icon:"",onClick:g=>ie(t.index,i)},{default:l(()=>[e(C,{size:"22",icon:"tabler-trash"}),e(I,{activator:"parent",location:"top"},{default:l(()=>[V("Borrar")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)],64))]),_:2},1024))),128))],8,he)):(y(),x("td",{key:1,colspan:F.length},[e(c,{class:"my-1"},{default:l(()=>[e(n,{cols:"12"},{default:l(()=>[Oe]),_:1})]),_:1})],8,Ie))])]),"item.label":l(({item:t})=>[e(c,{class:"my-5"},{default:l(()=>[e(n,{cols:"12"},{default:l(()=>[e(k,{clearable:"",modelValue:t.raw.label,"onUpdate:modelValue":s=>t.raw.label=s,rules:[o(b)]},null,8,["modelValue","onUpdate:modelValue","rules"])]),_:2},1024)]),_:2},1024)]),"item.required":l(({item:t})=>[e(c,{class:"my-5"},{default:l(()=>[e(n,{cols:"12"},{default:l(()=>[e(q,{modelValue:t.raw.required,"onUpdate:modelValue":s=>t.raw.required=s,"true-value":1,"false-value":0},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),bottom:l(()=>[]),_:1},8,["items"])]),_:1})]),_:1}),e(c,null,{default:l(()=>[e(n,{cols:"12 d-flex justify-content-center"},{default:l(()=>[e(m,{color:"primary",onClick:a[18]||(a[18]=t=>X())},{default:l(()=>[V("Guardar")]),_:1})]),_:1})]),_:1})]))}});export{Be as _};