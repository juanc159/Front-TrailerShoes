import{e as M,ae as O,x as b,y as S,z as h,o as V,c as p,d as e,w as a,X as z,a5 as B,J as N,K as k,L as w,E as D,h as s,a1 as T,Q as j,m as y,V as C,G as E,ai as I,a as P,aj as U}from"./index-dd53741e.js";const F=P("span",null,"Redes Sociales",-1),G=["href"],Q=M({__name:"ModuleSocialNetwork",setup(K){const g=O(),{modalModuleSocialNetwork:n,arraySections:r,sectionSelected:c,rowSelected:i,columnsSelected:d,editModuleSocialNetwork:R,socialNetworks:_}=b(g),u=S({form_id:null});h(()=>{R.value&&(u.value.form_id=JSON.parse(JSON.stringify(r.value[c.value].arrayRows[i.value].columns[d.value].contentSocialNetwork.value)),o.value=JSON.parse(JSON.stringify(r.value[c.value].arrayRows[i.value].columns[d.value].contentSocialNetwork)))});const f=()=>{n.value=!1,u.value={form_id:null},o.value=null},x=async()=>{r.value[c.value].arrayRows[i.value].columns[d.value].contentSocialNetwork=JSON.parse(JSON.stringify(o.value)),f()},o=S(null),J=async v=>{const l=_.value.find(m=>m.value==v);l&&(o.value=l)};return(v,l)=>{const m=U;return V(),p("div",null,[e(I,{modelValue:s(n),"onUpdate:modelValue":l[2]||(l[2]=t=>E(n)?n.value=t:null),width:"800",persistent:""},{default:a(()=>[e(m,{onClick:f}),e(z,null,{default:a(()=>[e(B,{"primary-title":""},{default:a(()=>[F]),_:1}),e(N,null,{default:a(()=>[e(k,null,{default:a(()=>[e(w,{cols:"6"},{default:a(()=>[e(D,{clearable:"",items:s(_),modelValue:s(u).form_id,"onUpdate:modelValue":[l[0]||(l[0]=t=>s(u).form_id=t),l[1]||(l[1]=t=>J(t))],label:"Redes Sociales"},null,8,["items","modelValue"])]),_:1})]),_:1}),e(k,null,{default:a(()=>[e(w,{cols:"12"},{default:a(()=>[s(o)?(V(),p("a",{key:0,href:s(o).url,target:"_blank"},[e(T,{src:s(o).path},null,8,["src"])],8,G)):j("",!0)]),_:1})]),_:1})]),_:1}),e(N,{class:"d-flex justify-end"},{default:a(()=>[e(y,{size:"40",color:"error",icon:"",class:"mr-3",onClick:f},{default:a(()=>[e(C,{size:"30",icon:"tabler-circle-x"})]),_:1}),e(y,{size:"40",color:"success",icon:"",onClick:x},{default:a(()=>[e(C,{size:"30",icon:"tabler-circle-check"})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])])}}});export{Q as _};