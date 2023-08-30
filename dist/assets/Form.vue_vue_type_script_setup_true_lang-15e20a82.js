import{_ as C}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-f28a0ff4.js";import{e as U,u as $,s as w,r as _,v as T,H as k,o as B,c as F,d as a,w as t,B as K,g as e,b as m,h as S,m as A,V as P,I as z,a as V}from"./index-9109da95.js";import{useCrudUserStore as D}from"./useCrudUserStore-97973f59.js";import{r as u,l as E,s as G}from"./validators-e33fb393.js";import{V as H}from"./VForm-699ac96b.js";import{V as v,a as n}from"./VRow-50fa08d6.js";import{V as f}from"./VTextField-4769d080.js";import{V as I}from"./VSelect-a002075f.js";import{V as M}from"./VDivider-fb0430cf.js";import{V as R}from"./VTooltip-680e0cc5.js";const q=V("b",{class:"text-warning"},"*",-1),j=V("b",{class:"text-warning"},"*",-1),J=V("b",{class:"text-warning"},"*",-1),L=V("b",{class:"text-warning"},"*",-1),O=V("b",{class:"text-warning"},"*",-1),le=U({__name:"Form",setup(Q){const i=$(),{identityTypes:x}=w(i),b=D(),{formulario:r}=w(b),g=_(),l=_([]),c=_(!1),N=async()=>{var s;const d=await((s=g.value)==null?void 0:s.validate());if(d!=null&&d.valid){const p=await b.fetchSave();await i.fetchUserAuthenticated(),console.log(p),p.code===422&&(l.value=p.errors??[])}};T(async()=>{r.value={id:i.user.id,email:i.user.email,name:i.user.name,lastName:i.user.lastName,role_id:i.user.role_id,identity_type_id:i.user.identity_type_id,charge_id:i.user.charge_id,idNumber:i.user.idNumber,password:null},await i.fetchDataForm()});const y=_([]);return k(r,(d,s)=>{d.id?y.value.password=[]:y.value.password=[u(d.password)]},{deep:!0}),(d,s)=>{const p=C;return B(),F("div",null,[a(p,{"sub-title":"Perfil","validate-crud":!0,action:"edit"}),a(z,null,{default:t(()=>[a(K,null,{default:t(()=>[a(H,{ref_key:"formValidation",ref:g,"lazy-validation":""},{default:t(()=>[a(v,null,{default:t(()=>[a(n,{cols:"12",md:"6"},{default:t(()=>[a(f,{clearable:"",modelValue:e(r).name,"onUpdate:modelValue":s[0]||(s[0]=o=>e(r).name=o),rules:[e(u)],"error-messages":e(l).name,onKeypress:s[1]||(s[1]=o=>e(l).name="")},{label:t(()=>[m(" Nombre "),q]),_:1},8,["modelValue","rules","error-messages"])]),_:1}),a(n,{cols:"12",md:"6"},{default:t(()=>[a(f,{clearable:"",modelValue:e(r).lastName,"onUpdate:modelValue":s[2]||(s[2]=o=>e(r).lastName=o),rules:[e(u)],"error-messages":e(l).name,onKeypress:s[3]||(s[3]=o=>e(l).name="")},{label:t(()=>[m(" Apellido "),j]),_:1},8,["modelValue","rules","error-messages"])]),_:1}),a(n,{cols:"12",md:"6"},{default:t(()=>[a(f,{clearable:"",autocomplete:"off",modelValue:e(r).email,"onUpdate:modelValue":s[4]||(s[4]=o=>e(r).email=o),rules:[e(u)],"error-messages":e(l).name,onKeypress:s[5]||(s[5]=o=>e(l).email="")},{label:t(()=>[m(" Email "),J]),_:1},8,["modelValue","rules","error-messages"])]),_:1}),a(n,{cols:"12",md:"6"},{default:t(()=>[a(f,{clearable:"",autocomplete:"off",type:e(c)?"text":"password",modelValue:e(r).password,"onUpdate:modelValue":s[6]||(s[6]=o=>e(r).password=o),rules:e(y).password,"onClick:append":s[7]||(s[7]=o=>c.value=!e(c)),"append-icon":e(c)?"mdi-eye":"mdi-eye-off","error-messages":e(l).password,onKeypress:s[8]||(s[8]=o=>e(l).password="")},{label:t(()=>[m(" Contraseña "),L]),_:1},8,["type","modelValue","rules","append-icon","error-messages"])]),_:1}),a(n,{cols:"12",md:"6"},{default:t(()=>[a(I,{clearable:"",items:e(x),"item-title":"name","item-value":"id",modelValue:e(r).identity_type_id,"onUpdate:modelValue":[s[9]||(s[9]=o=>e(r).identity_type_id=o),s[10]||(s[10]=o=>e(l).identity_type_id="")],rules:[e(u)],"error-messages":e(l).identity_type_id},{label:t(()=>[m(" Tipo de identificación "),O]),_:1},8,["items","modelValue","rules","error-messages"])]),_:1}),a(n,{cols:"4"},{default:t(()=>[a(f,{clearable:"",maxlength:"10",rules:[e(u),e(E)(e(r).idNumber,10)],modelValue:e(r).idNumber,"onUpdate:modelValue":s[11]||(s[11]=o=>e(r).idNumber=o),"error-messages":e(l).idNumber,label:"identificación",onKeypress:s[12]||(s[12]=o=>{e(l).idNumber="",e(G)(o)})},null,8,["rules","modelValue","error-messages"])]),_:1})]),_:1}),a(M,{class:"border-opacity-75 my-4",color:"csecundary",thickness:3}),a(v,{class:"pt-0"},{default:t(()=>[a(n,{cols:"12",class:"text-center"},{default:t(()=>[a(R,{text:"Guardar",location:"top"},{activator:t(({props:o})=>[a(S,A({class:"ms-1",color:"light",rounded:"lg"},o,{onClick:s[13]||(s[13]=W=>N())}),{default:t(()=>[m(" Guardar  "),a(P,{size:"large",color:"success",icon:"mdi-content-save-outline"})]),_:2},1040)]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})])}}});export{le as _};
