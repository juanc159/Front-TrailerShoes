import{i as E,Y as H,s as K,r as x,U as M,k as W,o as n,c,d as t,p as s,C as k,q,b as V,B as w,x as B,n as e,L as _,z as L,a4 as z,a as T,I as Y,a5 as X,J as Z,V as U,T as m,H as ee,A as ae,O as h,P as C,R as p,a0 as le,Q as $,t as R,a7 as te,a8 as se,W as re,a6 as ne,K as ue}from"./index-c9350ca5.js";import{u as oe}from"./useSelect2Infite-1d5d9c41.js";import{useRequirementStore as de}from"./useRequirementStore-d9b1061a.js";const ie={class:"d-flex justify-content-center aling-items-center"},ce={key:0,class:"d-flex justify-content-between aling-items-center p-2"},me={key:2,class:"demo-space-x"},pe={key:3},fe={key:4},ve=["href","download"],ke=E({__name:"Form",setup(ye){const j=H(),f=de(),{formulario:v,requirementTypes_arrayInfo:D,requirementTypes_countLinks:A,loading:F,disabled:i}=K(f),g=x({}),b=x(M()),S=x(),o=oe(f.fetchSelectRequirementTypes,D,{}),I=async d=>{var a;f.typeAction=d,i.value=!1,f.clearFormulario(),await((a=S.value)==null?void 0:a.resetValidation()),g.value={},d!="back"&&f.keyList++},J=async()=>{var a;v.value.user_id=j.user.id;const d=await((a=S.value)==null?void 0:a.validate());if(d!=null&&d.valid){const r=await f.fetchSave();r.code===200&&(I("list"),b.value.key++),r.code===422&&(g.value=r.errors??{})}};W(async()=>{await f.fetchDataForm(),o.dataNueva.value=D.value,o.totalLinks.value=A.value});const Q=d=>{v.value.formData={};const a=o.dataNueva.value.find(r=>r.value==d);a&&(v.value.formData=JSON.parse(JSON.stringify(a)))},G=(d,a)=>{b.value.handleImageSelected(d),setTimeout(()=>{v.value.formData.arrayInputs[a].answer=b.value.imageFile},1e3)};return(d,a)=>(n(),c("div",null,[t(w,null,{default:s(()=>[t(k,{cols:"12",class:"d-flex justify-content-end"},{default:s(()=>[t(q,{color:"secondary",onClick:a[0]||(a[0]=r=>I("back"))},{default:s(()=>[V(" Atras ")]),_:1})]),_:1})]),_:1}),t(w,null,{default:s(()=>[t(k,{cols:"4"},{default:s(()=>[t(B,{clearable:"",label:"Solicitud",items:e(o).dataNueva.value,modelValue:e(v).requirement_type_id,"onUpdate:modelValue":[a[4]||(a[4]=r=>e(v).requirement_type_id=r),a[5]||(a[5]=r=>{e(g).requirement_type_id="",Q(r)})],"error-messages":e(g).requirement_type_id,rules:[e(_)],disabled:e(i)},{"prepend-item":s(()=>[t(L,{placeholder:"Buscar...",class:"mb-2",modelValue:e(o).searchQuery.value,"onUpdate:modelValue":a[1]||(a[1]=r=>e(o).searchQuery.value=r)},null,8,["modelValue"]),t(z)]),"append-item":s(()=>[t(z),T("div",ie,[Y(t(X,{size:"24",color:"primary",indeterminate:""},null,512),[[Z,e(F).selectRequirementTypes]])]),e(F).selectRequirementTypes?m("",!0):(n(),c("div",ce,[T("div",null,[t(q,{class:"mt-2",disabled:e(o).page.value<=1,onClick:a[2]||(a[2]=r=>e(o).prev()),color:"success"},{default:s(()=>[t(U,{icon:"mdi-chevron-left"})]),_:1},8,["disabled"]),t(q,{class:"mt-2",disabled:e(o).page.value>=e(o).totalLinks.value,onClick:a[3]||(a[3]=r=>e(o).next()),color:"success"},{default:s(()=>[t(U,{icon:"mdi-chevron-right"})]),_:1},8,["disabled"])])]))]),_:1},8,["items","modelValue","error-messages","rules","disabled"])]),_:1})]),_:1}),t(ue,{ref_key:"formValidation",ref:S,"lazy-validation":""},{default:s(()=>[t(w,null,{default:s(()=>[t(k,{cols:"12"},{default:s(()=>[T("div",null,[t(ee,null,{default:s(()=>[t(ae,null,{default:s(()=>[t(w,null,{default:s(()=>{var r,N;return[(n(!0),c(h,null,C((N=(r=e(v))==null?void 0:r.formData)==null?void 0:N.arrayInputs,(l,O)=>(n(),p(k,{cols:"12",key:O},{default:s(()=>[l.type_input==1?(n(),p(L,{key:0,label:l.label,modelValue:l.answer,"onUpdate:modelValue":u=>l.answer=u,rules:l.required==1?[e(_)]:[],disabled:e(i)},null,8,["label","modelValue","onUpdate:modelValue","rules","disabled"])):m("",!0),l.type_input==2?(n(),p(B,{key:1,items:l.arrayOptions,"item-value":"id","item-title":"name",label:l.label,modelValue:l.answer,"onUpdate:modelValue":u=>l.answer=u,rules:l.required==1?[e(_)]:[],disabled:e(i)},null,8,["items","label","modelValue","onUpdate:modelValue","rules","disabled"])):m("",!0),l.type_input==3?(n(),c("div",me,[(n(!0),c(h,null,C(l.arrayOptions,(u,y)=>(n(),p(le,{modelValue:l.answer,"onUpdate:modelValue":P=>l.answer=P,key:y,label:u.name,value:u.id,rules:l.required==1?[e(_)]:[],disabled:e(i)},null,8,["modelValue","onUpdate:modelValue","label","value","rules","disabled"]))),128))])):m("",!0),l.type_input==4?(n(),c("div",pe,[t($,null,{default:s(()=>[V(R(l.label),1)]),_:2},1024),t(te,{modelValue:l.answer,"onUpdate:modelValue":u=>l.answer=u,rules:l.required==1?[e(_)]:[],disabled:e(i)},{default:s(()=>[(n(!0),c(h,null,C(l.arrayOptions,(u,y)=>(n(),p(se,{key:y,label:u.name,value:u.id},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","rules","disabled"])])):m("",!0),l.type_input==5?(n(),c("div",fe,[t($,null,{default:s(()=>[V(R(l.label),1)]),_:2},1024),e(i)?m("",!0):(n(),p(re,{"show-size":"",key:e(b).key,onChangeOnce:u=>G(u,O),"onClick:clear":a[6]||(a[6]=u=>e(b).clearData()),rules:l.required==1?[e(_)]:[],disabled:e(i)},{selection:s(({fileNames:u})=>[(n(!0),c(h,null,C(u,y=>(n(),p(ne,{key:y,label:"",size:"small",variant:"outlined",color:"primary",class:"me-2"},{default:s(()=>[V(R(y),1)]),_:2},1024))),128))]),_:2},1032,["onChangeOnce","rules","disabled"])),e(i)?(n(),c("a",{key:1,href:l.answer,download:l.label,target:"_blank"},[t(U,{icon:"mdi-download"}),V(" Descargar ")],8,ve)):m("",!0)])):m("",!0)]),_:2},1024))),128))]}),_:1})]),_:1})]),_:1})])]),_:1})]),_:1}),e(i)?m("",!0):(n(),p(w,{key:0},{default:s(()=>[t(k,{cols:"12 d-flex justify-content-center"},{default:s(()=>[t(q,{color:"primary",onClick:a[7]||(a[7]=r=>J())},{default:s(()=>[V("Guardar")]),_:1})]),_:1})]),_:1}))]),_:1},512)]))}});export{ke as _};