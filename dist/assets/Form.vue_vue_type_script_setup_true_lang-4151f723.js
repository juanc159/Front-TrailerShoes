import{_ as N}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-e1c88155.js";import{e as $,am as R,x as O,u as j,y as g,$ as k,o as h,c as z,d as a,h as e,w as t,R as A,K as B,L as r,H as G,T as b,b as _,O as x,a0 as C,a7 as w,a1 as F,af as I,ag as S,a9 as T,g as H,m as K,I as P,V as q,D as J,a as m}from"./index-dd53741e.js";import{V as M}from"./VTooltip-c58f227b.js";const Q=m("b",{class:"text-warning"},"*",-1),W=m("b",{class:"text-warning"},"*",-1),X=m("b",{class:"bg-cprimary px-2",style:{opacity:"0.7"}}," Vista previa ",-1),Y=m("b",{class:"text-warning"},"*",-1),Z=m("b",{class:"bg-cprimary px-2",style:{opacity:"0.7"}},"Vista previa",-1),ee=m("b",{class:"text-warning"},"*",-1),ae=m("b",{class:"bg-cprimary px-2",style:{opacity:"0.7"}},"Vista previa",-1),ie=$({__name:"Form",setup(te){const f=R(),{action:D,formulario:d}=O(f),E=j(),{company:l}=O(E),s=g(k()),c=g(k()),i=g(k()),V=["jpg","jpeg","png","gif"];s.value.allowedExtensions=V,c.value.allowedExtensions=V,i.value.allowedExtensions=V;const p=g([]),y=g(),U=async n=>{var o;f.typeAction=n,await((o=y.value)==null?void 0:o.resetValidation()),p.value=[],n!="back"&&f.keyList++},L=async()=>{var o;s.value.imageFile&&(d.value.image_icon=s.value.imageFile),c.value.imageFile&&(d.value.image_logo=c.value.imageFile),i.value.imageFile&&(d.value.image_cover=i.value.imageFile);const n=await((o=y.value)==null?void 0:o.validate());if(n!=null&&n.valid){const u=await f.fetchSave();u.code===200&&U("list"),u.code===422&&(p.value=u.errors??[])}};return(n,o)=>{const u=N;return h(),z("div",null,[a(u,{"sub-title":"Cargo",action:e(D),"validate-crud":!0,"btn-back":!0,onChangeScreenBack:U},null,8,["action"]),a(J,{class:"bg-vwhite",fluid:""},{default:t(()=>[a(A,{ref_key:"formValidation",ref:y,"lazy-validation":""},{default:t(()=>[a(B,null,{default:t(()=>[a(r,{cols:"12"},{default:t(()=>[a(G,{clearable:"",modelValue:e(d).name,"onUpdate:modelValue":o[0]||(o[0]=v=>e(d).name=v),rules:[e(b)],"error-messages":e(p).name,onKeypress:o[1]||(o[1]=v=>e(p).name="")},{label:t(()=>[_(" Nombre "),Q]),_:1},8,["modelValue","rules","error-messages"])]),_:1}),a(r,{cols:"12",md:"6"},{default:t(()=>[(h(),x(C,{accept:"image/*",rules:e(l).image_icon?[]:[e(b)],key:e(s).key,onChangeOnce:e(s).handleImageSelected,"onClick:clear":e(s).clearData},{label:t(()=>[_(" Icono "),W]),_:1},8,["rules","onChangeOnce","onClick:clear"]))]),_:1}),w(a(r,{cols:"12",md:"6"},{default:t(()=>[a(F,{class:"text-white",height:"200",cover:"",src:e(s).imageUrl??e(l).image_icon},{default:t(()=>[a(I,{color:"rgba(0, 0, 0, 0)",theme:"dark"},{default:t(()=>[a(S,{class:"text-h4"},{default:t(()=>[X]),_:1})]),_:1})]),_:1},8,["src"])]),_:1},512),[[T,e(s).imageUrl||e(l).image_icon]]),a(r,{cols:"12",md:"6"},{default:t(()=>[(h(),x(C,{accept:"image/*",rules:e(l).image_logo?[]:[e(b)],key:e(c).key,onChangeOnce:e(c).handleImageSelected,"onClick:clear":e(c).clearData},{label:t(()=>[_(" Logo "),Y]),_:1},8,["rules","onChangeOnce","onClick:clear"]))]),_:1}),w(a(r,{cols:"12",md:"6"},{default:t(()=>[a(F,{class:"text-white",height:"200",cover:"",src:e(c).imageUrl??e(l).image_logo},{default:t(()=>[a(I,{color:"rgba(0, 0, 0, 0)",theme:"dark"},{default:t(()=>[a(S,{class:"text-h4"},{default:t(()=>[Z]),_:1})]),_:1})]),_:1},8,["src"])]),_:1},512),[[T,e(c).imageUrl||e(l).image_logo]]),a(r,{cols:"12",md:"6"},{default:t(()=>[(h(),x(C,{accept:"image/*",rules:e(l).image_cover?[]:[e(b)],key:e(i).key,onChangeOnce:e(i).handleImageSelected,"onClick:clear":e(i).clearData},{label:t(()=>[_(" Portada "),ee]),_:1},8,["rules","onChangeOnce","onClick:clear"]))]),_:1}),w(a(r,{cols:"12",md:"6"},{default:t(()=>[a(F,{class:"text-white",height:"200",cover:"",src:e(i).imageUrl??e(l).image_cover},{default:t(()=>[a(I,{color:"rgba(0, 0, 0, 0)",theme:"dark"},{default:t(()=>[a(S,{class:"text-h4"},{default:t(()=>[ae]),_:1})]),_:1})]),_:1},8,["src"])]),_:1},512),[[T,e(i).imageUrl||e(l).image_cover]])]),_:1}),a(H,{class:"border-opacity-75 my-4",color:"csecundary",thickness:3}),a(B,{class:"pt-0"},{default:t(()=>[a(r,{cols:"12",class:"text-center"},{default:t(()=>[a(M,{text:"Guardar",location:"top"},{activator:t(({props:v})=>[a(K,P({class:"ms-1",color:"light",rounded:"lg"},v,{onClick:o[2]||(o[2]=oe=>L())}),{default:t(()=>[_(" Guardar "),a(q,{size:"large",color:"success",icon:"mdi-content-save-outline"})]),_:2},1040)]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})])}}});export{ie as _};