import{j as O,a1 as q,r as x,b6 as G,H as $,b7 as H,y as J,m as F,G as W,d as t,a5 as X,b8 as Y,e as Z,b9 as ee,ba as k,an as te,U as se,o as p,J as C,w as a,I as ae,B as R,g as o,A as le,bb as z,a as f,V as _,al as oe,a7 as A,c as b,F as D,M as B,b as K,t as w,N as L,a8 as T,K as Q,ap as re,aq as ne,_ as ie}from"./index-8ab07650.js";import{V as ce}from"./VTextField-a36c9478.js";import{V as ue}from"./VDivider-1631d3af.js";import{V as U,c as de,a as M,b as pe}from"./VList-7f9e9931.js";import{V as fe,a as he}from"./VRow-2de8352d.js";import{m as me,u as ge,a as N}from"./VOverlay-e8a91f4a.js";import{f as ve}from"./forwardRefs-9d31fcaa.js";import{V as ye}from"./dialog-transition-8dd2817a.js";const _e=O()({name:"VDialog",props:{fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...me({origin:"center center",scrollStrategy:"block",transition:{component:ye},zIndex:2400})},emits:{"update:modelValue":n=>!0},setup(n,g){let{slots:r}=g;const v=q(n,"modelValue"),{scopeId:E}=ge(),c=x();function u(d){var h,y;const l=d.relatedTarget,i=d.target;if(l!==i&&((h=c.value)!=null&&h.contentEl)&&((y=c.value)!=null&&y.globalTop)&&![document,c.value.contentEl].includes(i)&&!c.value.contentEl.contains(i)){const V=Y(c.value.contentEl);if(!V.length)return;const e=V[0],m=V[V.length-1];l===e?m.focus():e.focus()}}G&&$(()=>v.value&&n.retainFocus,d=>{d?document.addEventListener("focusin",u):document.removeEventListener("focusin",u)},{immediate:!0}),$(v,async d=>{var l,i;await H(),d?(l=c.value.contentEl)==null||l.focus({preventScroll:!0}):(i=c.value.activatorEl)==null||i.focus({preventScroll:!0})});const P=J(()=>F({"aria-haspopup":"dialog","aria-expanded":String(v.value)},n.activatorProps));return W(()=>{const[d]=N.filterProps(n);return t(N,F({ref:c,class:["v-dialog",{"v-dialog--fullscreen":n.fullscreen,"v-dialog--scrollable":n.scrollable},n.class],style:n.style},d,{modelValue:v.value,"onUpdate:modelValue":l=>v.value=l,"aria-modal":"true",activatorProps:P.value,role:"dialog"},E),{activator:r.activator,default:function(){for(var l=arguments.length,i=new Array(l),h=0;h<l;h++)i[h]=arguments[h];return t(X,{root:!0},{default:()=>{var y;return[(y=r.default)==null?void 0:y.call(r,...i)]}})}})}),ve({},c)}}),j=n=>(re("data-v-4758ee4a"),n=n(),ne(),n),be={class:"d-flex align-center text-high-emphasis me-1"},Ve={class:"d-flex align-center"},Se={class:"h-100"},ke={class:"text-xs text-disabled text-uppercase"},xe={class:"h-100"},Ce={class:"app-bar-search-suggestions d-flex flex-column align-center justify-center text-high-emphasis h-100"},De={class:"d-flex align-center flex-wrap justify-center gap-2 text-h6 my-3"},we=j(()=>f("span",null,"No Result For ",-1)),Ie={key:0,class:"mt-8"},Be=j(()=>f("span",{class:"d-flex justify-center text-disabled"},"Try searching for",-1)),$e=["onClick"],Ee={class:"text-sm"},Pe=Z({__name:"AppBarSearch",props:{isDialogVisible:{type:Boolean},searchQuery:null,searchResults:null,suggestions:null,noDataSuggestion:null},emits:["update:isDialogVisible","update:searchQuery","itemSelected"],setup(n,{emit:g}){const r=n,{ctrl_k:v,meta_k:E}=ee({passive:!1,onEventFired(e){e.ctrlKey&&e.key==="k"&&e.type==="keydown"&&e.preventDefault()}}),c=x(),u=x(structuredClone(k(r.searchQuery))),P=x(),d=x(structuredClone(k(r.isDialogVisible))),l=x(structuredClone(k(r.searchResults)));$(r,()=>{d.value=structuredClone(k(r.isDialogVisible)),l.value=structuredClone(k(r.searchResults)),u.value=structuredClone(k(r.searchQuery))}),$([v,E],()=>{d.value=!0,g("update:isDialogVisible",!0)});const i=()=>{g("update:isDialogVisible",!1),g("update:searchQuery","")};te(()=>{u.value.length||(l.value=[])});const h=e=>{var m,I;e.key==="ArrowDown"?(e.preventDefault(),(m=c.value)==null||m.focus("next")):e.key==="ArrowUp"&&(e.preventDefault(),(I=c.value)==null||I.focus("prev"))},y=e=>{g("update:isDialogVisible",e),g("update:searchQuery","")},V=e=>e==="dashboards"?"Dashboards":e==="appsPages"?"Apps & Pages":e==="userInterface"?"User Interface":e==="formsTables"?"Forms Tables":e==="chartsMisc"?"Charts Misc":"Misc";return(e,m)=>{const I=se("IconBtn");return p(),C(_e,{"max-width":"600","model-value":o(d),height:e.$vuetify.display.smAndUp?"550":"100%",fullscreen:e.$vuetify.display.width<600,class:"app-bar-search-dialog","onUpdate:modelValue":y,onKeyup:z(i,["esc"])},{default:a(()=>[t(ae,{height:"100%",width:"100%",class:"position-relative"},{default:a(()=>[t(R,{class:"pt-1",style:{"min-block-size":"65px"}},{default:a(()=>[t(ce,{ref_key:"refSearchInput",ref:P,modelValue:o(u),"onUpdate:modelValue":[m[0]||(m[0]=s=>le(u)?u.value=s:null),m[1]||(m[1]=s=>e.$emit("update:searchQuery",o(u)))],autofocus:"",density:"comfortable",variant:"plain",class:"app-bar-autocomplete-box",onKeyup:z(i,["esc"]),onKeydown:h},{"prepend-inner":a(()=>[f("div",be,[t(_,{size:"22",icon:"tabler-search",class:"mt-1",style:{opacity:"1"}})])]),"append-inner":a(()=>[f("div",Ve,[f("div",{class:"text-base text-disabled cursor-pointer me-1",onClick:i}," [esc] "),t(I,{size:"small",onClick:i},{default:a(()=>[t(_,{icon:"tabler-x"})]),_:1})])]),_:1},8,["modelValue","onKeyup"])]),_:1}),t(ue),t(o(oe),{options:{wheelPropagation:!1,suppressScrollX:!0},class:"h-100"},{default:a(()=>[A(t(o(U),{ref_key:"refSearchList",ref:c,density:"compact",class:"app-bar-search-list"},{default:a(()=>[(p(!0),b(D,null,B(o(l),s=>(p(),b(D,{key:s.title},["header"in s?(p(),C(o(de),{key:0,class:"text-disabled"},{default:a(()=>[K(w(V(s.title)),1)]),_:2},1024)):L(e.$slots,"searchResult",{key:1,item:s},()=>[t(o(M),{link:"",onClick:S=>e.$emit("itemSelected",s)},{prepend:a(()=>[t(_,{size:"20",icon:s.icon,class:"me-3"},null,8,["icon"])]),append:a(()=>[t(_,{size:"20",icon:"tabler-corner-down-left",class:"enter-icon text-disabled"})]),default:a(()=>[t(pe,null,{default:a(()=>[K(w(s.title),1)]),_:2},1024)]),_:2},1032,["onClick"])],!0)],64))),128))]),_:3},512),[[T,o(u).length&&!!o(l).length]]),A(f("div",Se,[L(e.$slots,"suggestions",{},()=>[t(R,{class:"app-bar-search-suggestions h-100 pa-10"},{default:a(()=>[r.suggestions?(p(),C(fe,{key:0,class:"gap-y-4"},{default:a(()=>[(p(!0),b(D,null,B(r.suggestions,s=>(p(),C(he,{key:s.title,cols:"12",sm:"6",class:"ps-6"},{default:a(()=>[f("p",ke,w(s.title),1),t(o(U),{class:"card-list"},{default:a(()=>[(p(!0),b(D,null,B(s.content,S=>(p(),C(o(M),{key:S.title,link:"",title:S.title,class:"app-bar-search-suggestion",onClick:Re=>e.$emit("itemSelected",S)},{prepend:a(()=>[t(_,{icon:S.icon,size:"20",class:"me-2"},null,8,["icon"])]),_:2},1032,["title","onClick"]))),128))]),_:2},1024)]),_:2},1024))),128))]),_:1})):Q("",!0)]),_:1})],!0)],512),[[T,!!o(l)&&!o(u)]]),A(f("div",xe,[L(e.$slots,"noData",{},()=>[t(R,{class:"h-100"},{default:a(()=>[f("div",Ce,[t(_,{size:"75",icon:"tabler-file-x"}),f("div",De,[we,f("span",null,'"'+w(o(u))+'"',1)]),r.noDataSuggestion?(p(),b("div",Ie,[Be,(p(!0),b(D,null,B(r.noDataSuggestion,s=>(p(),b("h6",{key:s.title,class:"app-bar-search-suggestion text-sm font-weight-regular cursor-pointer mt-3",onClick:S=>e.$emit("itemSelected",s)},[t(_,{size:"20",icon:s.icon,class:"me-3"},null,8,["icon"]),f("span",Ee,w(s.title),1)],8,$e))),128))])):Q("",!0)])]),_:1})],!0)],512),[[T,!o(l).length&&o(u).length]])]),_:3})]),_:3})]),_:3},8,["model-value","height","fullscreen","onKeyup"])}}});const Me=ie(Pe,[["__scopeId","data-v-4758ee4a"]]);export{Me as default};