import{_ as z}from"./HeaderAlertView.vue_vue_type_script_setup_true_lang-b09167ce.js";import{r as M,l as D,a as L}from"./validators-e33fb393.js";import{j as q,a0 as E,a2 as H,y as J,G as O,ah as Q,d as a,m as B,e as W,s as X,u as Y,r as w,v as Z,o as f,c as A,g as s,w as n,b as h,a as V,A as ee,F as S,M as U,J as F,I as se,ai as ae,t as te,aj as oe,K as le,h as re,V as ne}from"./index-7cf6b37e.js";import{useCrudRoleStore as ie}from"./useCrudRoleStore-7f0a5c10.js";import{V as ue}from"./VForm-abf2d075.js";import{V as P,a as p}from"./VRow-a322e02c.js";import{b as de,u as ce,d as T,V as N}from"./VTextField-2736fda9.js";import{m as me,a as j,V as fe}from"./VSelect-7d00fc06.js";import{V as G}from"./VDivider-8b963e7d.js";import{V as pe}from"./VTooltip-a5b1d196.js";import{V as Ve}from"./VContainer-8fc3c34e.js";const K=q()({name:"VCheckbox",inheritAttrs:!1,props:{...de(),...E(me(),["inline"])},emits:{"update:focused":d=>!0},setup(d,o){let{attrs:x,slots:l}=o;const{isFocused:_,focus:i,blur:m}=ce(d),v=H(),g=J(()=>d.id||`checkbox-${v}`);return O(()=>{const[C,I]=Q(x),[k,$]=T.filterProps(d),[t,e]=j.filterProps(d);return a(T,B({class:["v-checkbox",d.class]},C,k,{id:g.value,focused:_.value,style:d.style}),{...l,default:u=>{let{id:r,messagesId:b,isDisabled:c,isReadonly:y}=u;return a(j,B(t,{id:r.value,"aria-describedby":b.value,disabled:c.value,readonly:y.value},I,{onFocus:i,onBlur:m}),l)}})}),{}}}),ve=V("b",{class:"text-warning"},"*",-1),be=V("b",{class:"text-warning"},"*",-1),ge=V("dt",null,[V("b",{class:"text-vblack fs-6 me-auto"},"Permisos")],-1),Pe=W({__name:"Form",setup(d){const o=ie(),{action:x,formulario:l}=X(o),_=Y(),i=w([]),m=w(),v=w(),g=async t=>{var e;o.typeAction=t,await((e=v.value)==null?void 0:e.resetValidation()),i.value=[],t!="back"&&o.keyList++},C=async()=>{var e;const t=await((e=v.value)==null?void 0:e.validate());if(t!=null&&t.valid){const u=await o.fetchSave();u.code===200&&g("list"),u.code===422&&(i.value=u.errors)}},I=t=>{let e=l.value.permissions.findIndex(u=>u===t);console.log(e),e!=-1?(m.value=!1,l.value.permissions.splice(e,1)):l.value.permissions.push(t)},k=()=>{l.value.permissions=[];for(let t=0;t<o.arrayMenus.length;t++)for(let e=0;e<o.arrayMenus[t].permissions.length;e++)o.arrayMenus[t].permissions[e].estado="Inactivo"},$=()=>{if(m.value)k();else{l.value.permissions=[];for(let t=0;t<o.arrayMenus.length;t++)for(let e=0;e<o.arrayMenus[t].permissions.length;e++)l.value.permissions.push(o.arrayMenus[t].permissions[e].id),o.arrayMenus[t].permissions[e].estado="Activo"}};return Z(async()=>{k(),await o.fetchDataForm(),o.roleData.id&&(l.value.permissions=[],await o.fetchInfo(o.roleData.id))}),(t,e)=>{const u=z;return f(),A("div",null,[a(u,{"sub-title":"Rol",action:s(x),"validate-crud":!0,"btn-back":!0,onChangeScreenBack:g},null,8,["action"]),a(Ve,{class:"bg-vwhite",fluid:""},{default:n(()=>[a(ue,{ref_key:"formValidation",ref:v,"lazy-validation":""},{default:n(()=>[a(P,{class:"mt-0"},{default:n(()=>[a(p,{cols:"12",md:"6"},{default:n(()=>[a(N,{maxlength:"20",modelValue:s(l).name,"onUpdate:modelValue":e[0]||(e[0]=r=>s(l).name=r),rules:[s(M),s(D)(s(l).name,20),s(L)(s(l).name,8)],"error-messages":s(i).name,onKeypress:e[1]||(e[1]=r=>s(i).name="")},{label:n(()=>[h(" Nombre "),ve]),_:1},8,["modelValue","rules","error-messages"])]),_:1}),a(p,{cols:"12",md:"6"},{default:n(()=>[a(N,{modelValue:s(l).description,"onUpdate:modelValue":e[2]||(e[2]=r=>s(l).description=r),rules:[s(M),s(D)(s(l).description,50)],maxlength:"50","error-messages":s(i).description,onKeypress:e[3]||(e[3]=r=>s(i).description="")},{label:n(()=>[h(" Descripción "),be]),_:1},8,["modelValue","rules","error-messages"])]),_:1}),a(p,{cols:"12",md:"6"},{default:n(()=>[a(fe,{items:s(o).arrayMenus,rules:[s(M)],"error-messages":s(i).pageInitial,"onUpdate:modelValue":[e[4]||(e[4]=r=>s(i).pageInitial=""),e[5]||(e[5]=r=>s(l).pageInitial=r)],modelValue:s(l).pageInitial,label:"Pantalla inicial","item-title":"title","item-value":"to"},null,8,["items","rules","error-messages","modelValue"])]),_:1})]),_:1}),a(P,null,{default:n(()=>[a(p,{cols:"12",class:"pb-0"},{default:n(()=>[a(G,{class:"border-opacity-75 mb-3",color:"csecundary",thickness:3}),V("dl",null,[ge,V("dd",null,[a(K,{label:"Todos",modelValue:s(m),"onUpdate:modelValue":e[6]||(e[6]=r=>ee(m)?m.value=r:null),onClick:e[7]||(e[7]=r=>$())},null,8,["modelValue"])])])]),_:1}),(f(!0),A(S,null,U(s(o).arrayMenus,(r,b)=>(f(),F(p,{class:"pb-0",cols:"12",sm:"6",md:"4",lg:"3",key:b},{default:n(()=>[a(se,null,{default:n(()=>[a(ae,null,{default:n(()=>[h(te(r.title),1)]),_:2},1024),(f(!0),A(S,null,U(r.permissions,(c,y)=>(f(),F(oe,{class:"pt-0 pb-2",key:y},{default:n(()=>[s(_).permissions.includes(c.name)?(f(),F(K,{key:0,id:"check"+b+"-"+y,label:c.description,modelValue:c.estado,"onUpdate:modelValue":R=>c.estado=R,"true-value":"Activo","false-value":"Inactivo",value:c.estado,onClick:R=>I(c.id)},null,8,["id","label","modelValue","onUpdate:modelValue","value","onClick"])):le("",!0)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024))),128))]),_:1}),a(G,{class:"border-opacity-75 mt-6 mb-3",color:"csecundary",thickness:3}),a(P,null,{default:n(()=>[a(p,{cols:"12",class:"text-center"},{default:n(()=>[a(pe,{text:"Guardar",location:"top"},{activator:n(({props:r})=>[a(re,B({class:"ms-1",color:"light",rounded:"lg"},r,{onClick:e[8]||(e[8]=b=>C())}),{default:n(()=>[h(" Guardar  "),a(ne,{size:"large",color:"success",icon:"mdi-content-save-outline"})]),_:2},1040)]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})])}}});export{Pe as _};
