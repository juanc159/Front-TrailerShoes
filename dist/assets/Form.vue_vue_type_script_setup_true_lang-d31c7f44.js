import{_ as g}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-e1c88155.js";import{e as b,x as y,y as m,o as C,c as k,d as a,h as s,w as o,R as w,K as f,L as V,H as x,T as h,b as _,g as B,m as T,I as F,V as N,D as S,a as R}from"./index-dd53741e.js";import{useCrudChargeStore as $}from"./useCrudChargeStore-8e77ecb9.js";import{V as z}from"./VTooltip-c58f227b.js";const D=R("b",{class:"text-warning"},"*",-1),A=b({__name:"Form",setup(G){const l=$(),{action:p,formulario:d}=y(l),n=m([]),c=m(),u=async t=>{var e;l.typeAction=t,await((e=c.value)==null?void 0:e.resetValidation()),n.value=[],t!="back"&&l.keyList++},v=async()=>{var e;const t=await((e=c.value)==null?void 0:e.validate());if(t!=null&&t.valid){const r=await l.fetchSave();r.code===200&&u("list"),r.code===422&&(n.value=r.errors??[])}};return(t,e)=>{const r=g;return C(),k("div",null,[a(r,{"sub-title":"Cargo",action:s(p),"validate-crud":!0,"btn-back":!0,onChangeScreenBack:u},null,8,["action"]),a(S,{class:"bg-vwhite",fluid:""},{default:o(()=>[a(w,{ref_key:"formValidation",ref:c,"lazy-validation":""},{default:o(()=>[a(f,null,{default:o(()=>[a(V,{cols:"12"},{default:o(()=>[a(x,{clearable:"",modelValue:s(d).name,"onUpdate:modelValue":e[0]||(e[0]=i=>s(d).name=i),rules:[s(h)],"error-messages":s(n).name,onKeypress:e[1]||(e[1]=i=>s(n).name="")},{label:o(()=>[_(" Nombre "),D]),_:1},8,["modelValue","rules","error-messages"])]),_:1})]),_:1}),a(B,{class:"border-opacity-75 my-4",color:"csecundary",thickness:3}),a(f,{class:"pt-0"},{default:o(()=>[a(V,{cols:"12",class:"text-center"},{default:o(()=>[a(z,{text:"Guardar",location:"top"},{activator:o(({props:i})=>[a(T,F({class:"ms-1",color:"light",rounded:"lg"},i,{onClick:e[2]||(e[2]=H=>v())}),{default:o(()=>[_(" Guardar "),a(N,{size:"large",color:"success",icon:"mdi-content-save-outline"})]),_:2},1040)]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})])}}});export{A as _};
