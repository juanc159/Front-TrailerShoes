import{a as L,_ as Z}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-e1c88155.js";import{e as P,x as ee,y as m,B as ae,o as i,c as v,d as e,h as n,w as a,J as le,R as B,K as f,L as s,H as b,T as V,b as d,g as R,a as g,m as k,I as G,V as x,E as te,O as F,F as U,P as H,Q as $,W as oe,t as ne,X as se,S as re}from"./index-dd53741e.js";import{useCrudFormStore as ue}from"./useCrudFormStore-1d846509.js";import{V as w}from"./VTooltip-c58f227b.js";import{V as ie}from"./VDataTable-d1d16a2f.js";const de=g("b",{class:"text-warning"},"*",-1),ce={class:"d-flex"},pe=g("b",{class:"text-vblack fs-6 me-auto"},"Campos",-1),me=g("b",{class:"text-warning"},"*",-1),fe=g("b",{class:"text-warning"},"*",-1),_e={key:0,class:"v-data-table__tr"},ye=["colspan"],ve=["colspan"],Ve=g("b",null," Esta tipo de input no posee opciones asociadas ",-1),Ie=P({__name:"Form",setup(be){const C=ue(),{action:K,formulario:c}=ee(C),I=m([]),z=m(),S=m(),N=m(),A=async o=>{var l;C.typeAction=o,await((l=z.value)==null?void 0:l.resetValidation()),I.value=[],o!="back"&&C.keyList++},q=async()=>{var l;const o=await((l=z.value)==null?void 0:l.validate());if(o!=null&&o.valid){const _=await C.fetchSave();_.code===200&&A("list"),_.code===422&&(I.value=_.errors??[])}},u=m({label:null,type_input:null}),h=m({name:null}),p=m([]),D=m([{value:1,title:"text"},{value:2,title:"select"},{value:3,title:"checkbox"},{value:4,title:"radio"}]),J=async()=>{u.value={label:null,type_input:null}},Q=async()=>{var l;const o=await((l=S.value)==null?void 0:l.validate());if(o!=null&&o.valid){if(u.value.type_input!=1&&p.value.length==0)return re.fire("Debe agregar almenos una opción  al input"),!1;const _=D.value.find(t=>t.value==u.value.type_input);c.value.arrayInputs.push({label:u.value.label,type_input:u.value.type_input,type_name:_.title,arrayOptions:[]}),p.value.forEach(t=>{c.value.arrayInputs[c.value.arrayInputs.length-1].arrayOptions.push(t)}),J()}},W=async o=>{c.value.arrayInputs[o].id?c.value.arrayInputs[o].delete="delete":c.value.arrayInputs.splice(o,1)},O=ae(()=>c.value.arrayInputs.filter(o=>o.delete!="delete")),T=[{title:"",key:"data-table-expand",sortable:!1},{title:"Campo",key:"label",sortable:!1},{title:"Tipo de campo",key:"type_name",sortable:!1},{title:"Acciones",key:"actions",sortable:!1}],X=async()=>{var l;const o=await((l=N.value)==null?void 0:l.validate());o!=null&&o.valid&&(p.value.push({name:h.value.name}),h.value={name:null})},j=async o=>{p.value[o].id?p.value[o].delete="delete":p.value.splice(o,1)},M=async(o,l)=>{O.value[o].arrayOptions[l].id?O.value[o].arrayOptions[l].delete="delete":O.value[o].arrayOptions.splice(l,1)},Y=()=>{p.value=[]};return(o,l)=>{const _=Z;return i(),v("div",null,[e(_,{"sub-title":"Formulario",action:n(K),"validate-crud":!0,"btn-back":!0,onChangeScreenBack:l[0]||(l[0]=t=>A("back"))},null,8,["action"]),e(se,null,{default:a(()=>[e(le,null,{default:a(()=>[e(B,{ref_key:"formValidation",ref:z,"lazy-validation":""},{default:a(()=>[e(f,null,{default:a(()=>[e(s,{cols:"12",sm:"6"},{default:a(()=>[e(b,{modelValue:n(c).name,"onUpdate:modelValue":l[1]||(l[1]=t=>n(c).name=t),rules:[n(V)],"error-messages":n(I).name,onKeypress:l[2]||(l[2]=t=>n(I).name="")},{label:a(()=>[d(" Nombre "),de]),_:1},8,["modelValue","rules","error-messages"])]),_:1})]),_:1})]),_:1},512),e(B,{ref_key:"formInputValidation",ref:S,"lazy-validation":""},{default:a(()=>[e(f,null,{default:a(()=>[e(s,{cols:"12",class:"pb-0"},{default:a(()=>[e(R,{class:"border-opacity-75 mb-3",color:"csecundary",thickness:3}),g("div",ce,[e(L,{class:"w-100"},{default:a(()=>[pe]),_:1}),e(L,null,{default:a(()=>[e(w,{text:"Campo",location:"top"},{activator:a(({props:t})=>[e(k,G({class:"ms-1",color:"light",rounded:"lg"},t,{onClick:l[3]||(l[3]=r=>Q())}),{default:a(()=>[d(" Agregar  "),e(x,{size:"large",color:"success",icon:"mdi-plus"})]),_:2},1040)]),_:1})]),_:1})])]),_:1}),e(s,{cols:"12",sm:"6"},{default:a(()=>[e(b,{modelValue:n(u).label,"onUpdate:modelValue":l[4]||(l[4]=t=>n(u).label=t),rules:[n(V)]},{label:a(()=>[d(" Nombre del campo "),me]),_:1},8,["modelValue","rules"])]),_:1}),e(s,{cols:"12",sm:"6"},{default:a(()=>[e(te,{clearable:"",rules:[n(V)],"onUpdate:modelValue":[l[5]||(l[5]=t=>Y()),l[6]||(l[6]=t=>n(u).type_input=t)],items:n(D),modelValue:n(u).type_input},{label:a(()=>[d(" Tipo de campo "),fe]),_:1},8,["rules","items","modelValue"])]),_:1})]),_:1})]),_:1},512),n(u).type_input&&n(u).type_input!=1?(i(),F(B,{key:0,ref_key:"formOptionValidation",ref:N,"lazy-validation":""},{default:a(()=>[e(f,null,{default:a(()=>[e(s,{cols:"4"},{default:a(()=>[e(b,{clearable:"",modelValue:n(h).name,"onUpdate:modelValue":l[7]||(l[7]=t=>n(h).name=t),rules:[n(V)],label:"Opción"},null,8,["modelValue","rules"])]),_:1}),e(s,{cols:"4"},{default:a(()=>[e(k,{onClick:l[8]||(l[8]=t=>X())},{default:a(()=>[d(" Agregar Opción ")]),_:1})]),_:1})]),_:1}),(i(!0),v(U,null,H(n(p),(t,r)=>(i(),F(f,{key:r},{default:a(()=>[e(s,{cols:"4"},{default:a(()=>[e(b,{modelValue:t.name,"onUpdate:modelValue":y=>t.name=y,rules:[n(V)],label:"Opción #"+(r+1)},null,8,["modelValue","onUpdate:modelValue","rules","label"])]),_:2},1024),e(s,{cols:"4"},{default:a(()=>[e(k,{size:"x-small",color:"error",variant:"text",icon:"",onClick:y=>j(r)},{default:a(()=>[e(x,{size:"22",icon:"tabler-trash"}),e(w,{activator:"parent",location:"top"},{default:a(()=>[d("Borrar")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1},512)):$("",!0),e(f,null,{default:a(()=>[e(s,{cols:"12"},{default:a(()=>[e(n(ie),{headers:T,items:n(O)},{"item.actions":a(({item:t,index:r})=>[e(k,{size:"x-small",color:"error",variant:"text",icon:"",onClick:y=>W(r)},{default:a(()=>[e(x,{size:"22",icon:"tabler-trash"}),e(w,{activator:"parent",location:"top"},{default:a(()=>[d("Borrar")]),_:1})]),_:2},1032,["onClick"])]),"expanded-row":a(t=>[t.item.raw.type_name!="text"?(i(),v("tr",_e,[t.item.raw.arrayOptions.length>0?(i(),v("td",{key:0,colspan:T.length},[(i(!0),v(U,null,H(t.item.raw.arrayOptions,(r,y)=>(i(),F(f,{class:"my-1",key:y},{default:a(()=>[r.delete?$("",!0):(i(),v(U,{key:0},[e(s,{cols:"1"},{default:a(()=>[e(oe,null,{default:a(()=>[d("Opción "+ne(y+1)+" : ",1)]),_:2},1024)]),_:2},1024),e(s,{cols:"4"},{default:a(()=>[e(b,{clearable:"",modelValue:r.name,"onUpdate:modelValue":E=>r.name=E,rules:[n(V)]},null,8,["modelValue","onUpdate:modelValue","rules"])]),_:2},1024),e(s,{cols:"4"},{default:a(()=>[e(k,{size:"x-small",color:"error",variant:"text",icon:"",onClick:E=>M(t.index,y)},{default:a(()=>[e(x,{size:"22",icon:"tabler-trash"}),e(w,{activator:"parent",location:"top"},{default:a(()=>[d("Borrar")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)],64))]),_:2},1024))),128))],8,ye)):(i(),v("td",{key:1,colspan:T.length},[e(f,{class:"my-1"},{default:a(()=>[e(s,{cols:"12"},{default:a(()=>[Ve]),_:1})]),_:1})],8,ve))])):$("",!0)]),"item.label":a(({item:t})=>[e(b,{clearable:"",modelValue:t.raw.label,"onUpdate:modelValue":r=>t.raw.label=r,rules:[n(V)]},null,8,["modelValue","onUpdate:modelValue","rules"])]),_:1},8,["items"])]),_:1})]),_:1}),e(R,{class:"border-opacity-75 my-4",color:"cprimary",thickness:3}),e(f,{class:"pt-0"},{default:a(()=>[e(s,{class:"text-center",cols:"12"},{default:a(()=>[e(w,{text:"Guardar",location:"top"},{activator:a(({props:t})=>[e(k,G({class:"ms-1",color:"light",rounded:"lg"},t,{onClick:l[9]||(l[9]=r=>q())}),{default:a(()=>[d(" Guardar  "),e(x,{size:"large",color:"success",icon:"mdi-content-save-outline"})]),_:2},1040)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}}});export{Ie as _};