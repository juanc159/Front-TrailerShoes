import{i as z,l as C,as as R,o as d,R as V,p as a,d as e,G as $,n as u,V as _,ag as P,H as T,a1 as M,I as g,b as c,t as f,J as h,a2 as E,a4 as b,bD as L,au as U,c as k,O as N,P as D,T as S,av as w,at as F,a as x,an as O,dq as j,aw as A,ax as q,ad as H,q as Y,r as G}from"./index-c9350ca5.js";import{a as I,V as J}from"./VBadge-302ea5e2.js";import{V as W}from"./VTooltip-7bf3ee5c.js";const K=m=>m?m.split(" ").map(i=>i.charAt(0).toUpperCase()).join(""):"",Q={key:0},X={class:"text-xs text-disabled"},Z={class:"d-flex flex-column align-center gap-4"},ee={style:{"block-size":"28px","inline-size":"28px"}},ae=z({__name:"Notifications",props:{notifications:null,badgeProps:{default:void 0},location:{default:"bottom end"}},emits:["read","unread","remove","click:notification"],setup(m,{emit:l}){const i=m,r=C(()=>i.notifications.some(t=>t.isSeen===!1)),p=()=>{const t=i.notifications.map(o=>o.id);r.value?l("read",t):l("unread",t)},v=C(()=>i.notifications.filter(t=>t.isSeen===!1).length);return(t,o)=>{const n=R("IconBtn");return d(),V(n,{id:"notification-btn"},{default:a(()=>[e(I,$(i.badgeProps,{"model-value":i.notifications.some(s=>!s.isSeen),color:"error",content:u(v),class:"notification-badge"}),{default:a(()=>[e(_,{size:"26",icon:"tabler-bell"})]),_:1},16,["model-value","content"]),e(P,{activator:"parent",width:"380px",location:i.location,offset:"14px","close-on-content-click":!1},{default:a(()=>[e(T,{class:"d-flex flex-column"},{default:a(()=>[e(M,{class:"notification-section"},{append:a(()=>[g(e(n,{onClick:p},{default:a(()=>[e(_,{icon:u(r)?"tabler-mail-opened":"tabler-mail"},null,8,["icon"]),e(W,{activator:"parent",location:"start"},{default:a(()=>[c(f(u(r)?"Mark all as read":"Mark all as unread"),1)]),_:1})]),_:1},512),[[h,i.notifications.length]])]),default:a(()=>[e(E,{class:"text-lg"},{default:a(()=>[c(" Notifications ")]),_:1})]),_:1}),e(b),e(u(L),{options:{wheelPropagation:!1},style:{"max-block-size":"23.75rem"}},{default:a(()=>[e(U,{class:"notification-list rounded-0 py-0"},{default:a(()=>[(d(!0),k(N,null,D(i.notifications,(s,B)=>(d(),k(N,{key:s.title},[B>0?(d(),V(b,{key:0})):S("",!0),e(w,{link:"",lines:"one","min-height":"66px",class:"list-item-hover-class",onClick:y=>t.$emit("click:notification",s)},{prepend:a(()=>[e(J,{start:""},{default:a(()=>[e(F,{size:"40",color:s.color&&s.icon?s.color:void 0,image:s.img||void 0,icon:s.icon||void 0,variant:s.img?void 0:"tonal"},{default:a(()=>[s.text?(d(),k("span",Q,f(u(K)(s.text)),1)):S("",!0)]),_:2},1032,["color","image","icon","variant"])]),_:2},1024)]),append:a(()=>[x("div",Z,[e(I,{dot:"",color:s.isSeen?"#a8aaae":"primary",class:O(`${s.isSeen?"visible-in-hover":""} ms-1`),onClick:j(y=>t.$emit(s.isSeen?"unread":"read",[s.id]),["stop"])},null,8,["color","class","onClick"]),x("div",ee,[e(n,{size:"small",class:"visible-in-hover",onClick:y=>t.$emit("remove",s.id)},{default:a(()=>[e(_,{size:"20",icon:"tabler-x"})]),_:2},1032,["onClick"])])])]),default:a(()=>[e(A,null,{default:a(()=>[c(f(s.title),1)]),_:2},1024),e(q,null,{default:a(()=>[c(f(s.subtitle),1)]),_:2},1024),x("span",X,f(s.time),1)]),_:2},1032,["onClick"])],64))),128)),g(e(w,{class:"text-center text-medium-emphasis",style:{"block-size":"56px"}},{default:a(()=>[e(A,null,{default:a(()=>[c("No Notification Found!")]),_:1})]),_:1},512),[[h,!i.notifications.length]])]),_:1})]),_:1}),e(b),g(e(H,{class:"notification-footer"},{default:a(()=>[e(Y,{block:""},{default:a(()=>[c(" View All Notifications ")]),_:1})]),_:1},512),[[h,i.notifications.length]])]),_:1})]),_:1},8,["location"])]),_:1})}}});const te="/assets/avatar-3-47317f35.png",se="/assets/avatar-4-b0163f21.png",ie="/assets/avatar-5-d340221a.png",oe="/assets/paypal-8c1354c3.svg",ce=z({__name:"NavBarNotifications",setup(m){const l=G([{id:1,img:se,title:"Congratulation Flora! 🎉",subtitle:"Won the monthly best seller badge",time:"Today",isSeen:!0},{id:2,text:"Tom Holland",title:"New user registered.",subtitle:"5 hours ago",time:"Yesterday",isSeen:!1},{id:3,img:ie,title:"New message received 👋🏻",subtitle:"You have 10 unread messages",time:"11 Aug",isSeen:!0},{id:4,img:oe,title:"Paypal",subtitle:"Received Payment",time:"25 May",isSeen:!1,color:"error"},{id:5,img:te,title:"Received Order 📦",subtitle:"New order received from john",time:"19 Mar",isSeen:!0}]),i=t=>{l.value.forEach((o,n)=>{t===o.id&&l.value.splice(n,1)})},r=t=>{l.value.forEach(o=>{t.forEach(n=>{n===o.id&&(o.isSeen=!0)})})},p=t=>{l.value.forEach(o=>{t.forEach(n=>{n===o.id&&(o.isSeen=!1)})})},v=t=>{t.isSeen||r([t.id])};return(t,o)=>{const n=ae;return d(),V(n,{notifications:u(l),onRemove:i,onRead:r,onUnread:p,"onClick:notification":v},null,8,["notifications"])}}});export{ce as default};