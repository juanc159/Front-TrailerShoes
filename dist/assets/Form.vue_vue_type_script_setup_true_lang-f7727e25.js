import{_ as C}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-e1c88155.js";import{e as h,x as S,y as m,$ as F,N,T as v,o as b,c as B,d as a,h as l,w as t,J as I,R as T,K as k,L as u,H as w,b as f,O as U,a0 as $,a1 as R,g as D,m as K,I as z,V as A,X as G,a as _}from"./index-dd53741e.js";import{useCrudSocialNetworkStore as H}from"./useCrudSocialNetworkStore-4cf2db6a.js";import{V as L}from"./VTooltip-c58f227b.js";const P=_("b",{class:"text-warning"},"*",-1),j=_("b",{class:"text-warning"},"*",-1),q=_("b",{class:"text-warning"},"*",-1),W=h({__name:"Form",setup(E){const d=H(),{action:x,formulario:n}=S(d),i=m([]),s=m(F()),V=m(),g=async o=>{var e;d.typeAction=o,await((e=V.value)==null?void 0:e.resetValidation()),s.value.clearData(),i.value=[],o!="back"&&d.keyList++},y=async()=>{var e;s.value.imageFile&&(n.value.path=s.value.imageFile);const o=await((e=V.value)==null?void 0:e.validate());if(o!=null&&o.valid){const c=await d.fetchSave();c.code===200&&g("list"),c.code===422&&(i.value=c.errors??[])}},p=m([]);return N(n,(o,e)=>{o.id?p.value.path=[]:p.value.path=[v(s.value.imageUrl)]},{deep:!0}),(o,e)=>{const c=C;return b(),B("div",null,[a(c,{"sub-title":"Red Social",action:l(x),"validate-crud":!0,"btn-back":!0,onChangeScreenBack:e[0]||(e[0]=r=>g("back"))},null,8,["action"]),a(G,null,{default:t(()=>[a(I,null,{default:t(()=>[a(T,{ref_key:"formValidation",ref:V,"lazy-validation":""},{default:t(()=>[a(k,null,{default:t(()=>[a(u,{cols:"12",sm:"6",md:"4"},{default:t(()=>[a(w,{clearable:"",modelValue:l(n).name,"onUpdate:modelValue":e[1]||(e[1]=r=>l(n).name=r),rules:[l(v)],"error-messages":l(i).name,onKeypress:e[2]||(e[2]=r=>l(i).name="")},{label:t(()=>[f(" Nombre "),P]),_:1},8,["modelValue","rules","error-messages"])]),_:1}),a(u,{cols:"12",sm:"6",md:"4"},{default:t(()=>[a(w,{clearable:"",modelValue:l(n).url,"onUpdate:modelValue":e[3]||(e[3]=r=>l(n).url=r),rules:[l(v)],"error-messages":l(i).url,onKeypress:e[4]||(e[4]=r=>l(i).url="")},{label:t(()=>[f(" Url "),j]),_:1},8,["modelValue","rules","error-messages"])]),_:1}),a(u,{cols:"12",md:"4"},{default:t(()=>[(b(),U($,{onChange:l(s).handleImageSelected,rules:l(p).path,key:l(s).key,"onClick:clear":l(s).clearData},{label:t(()=>[f(" Adjuntar archivo "),q]),_:1},8,["onChange","rules","onClick:clear"]))]),_:1})]),_:1}),a(u,{cols:"12"},{default:t(()=>[a(R,{contain:"",src:l(s).imageUrl??l(n).path,alt:"foto Personal","max-width":200,class:"mx-auto"},null,8,["src"])]),_:1}),a(D,{class:"border-opacity-75 my-4",color:"cprimary",thickness:3}),a(k,{class:"pt-0"},{default:t(()=>[a(u,{class:"text-center",cols:"12"},{default:t(()=>[a(L,{text:"Guardar",location:"top"},{activator:t(({props:r})=>[a(K,z({class:"ms-1",color:"light",rounded:"lg"},r,{onClick:e[5]||(e[5]=J=>y())}),{default:t(()=>[f(" Guardar  "),a(A,{size:"large",color:"success",icon:"mdi-content-save-outline"})]),_:2},1040)]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})])}}});export{W as _};
