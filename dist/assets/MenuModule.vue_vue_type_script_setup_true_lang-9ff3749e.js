import{i as U,a9 as j,s as A,r as D,o as M,c as E,d as e,p as l,q as t,G,V as a,H,ae as z,af as K,b as u,A as L,B as Q,C as r,n as i,R as W,T as X,ag as Y}from"./index-c9350ca5.js";const ee=U({__name:"MenuModule",props:{indexRow:{type:Number,required:!0},indexSection:{type:Number,required:!0},indexColumn:{type:Number,required:!0}},setup(C){const{indexRow:x,indexSection:S,indexColumn:g}=C,y=j(),{arraySections:b,modalModuleText:k,rowSelected:m,sectionSelected:f,columnsSelected:c,modalModuleImage:V,typeModuleImage:N,modalModuleSlider:_,modalModulePopUps:w,modalModuleForm:T,modalModuleSocialNetwork:R,arrayForms:s,forms:$,formsRequerimentsInternal:I}=A(y),q=D(!1),B=()=>{k.value=!0},F=()=>{_.value=!0},p=d=>{V.value=!0,N.value=d},P=()=>{w.value=!0},v=d=>{console.log("type",d),T.value=!0,s.value=[],console.log("arrayForms",s.value),d=="normales"&&(s.value=JSON.parse(JSON.stringify($.value))),d=="externos"&&(s.value=JSON.parse(JSON.stringify(I.value))),console.log("arrayForms",s.value)},J=()=>{R.value=!0},O=()=>{m.value=x,f.value=S,c.value=g,q.value=!0};return(d,o)=>(M(),E("div",null,[e(Y,null,{activator:l(({props:n})=>[e(t,G(n,{icon:"",color:"primary",variant:"tonal",onClick:o[0]||(o[0]=Z=>O())}),{default:l(()=>[e(a,{icon:"tabler-plus"})]),_:2},1040)]),default:l(()=>[e(H,{"min-width":"400"},{default:l(()=>[e(z,{color:"primary"},{default:l(()=>[e(K,null,{default:l(()=>[u("Insertar Módulo")]),_:1})]),_:1}),e(L,null,{default:l(()=>[e(Q,null,{default:l(()=>[e(r,null,{default:l(()=>[e(t,{onClick:o[1]||(o[1]=n=>p("image"))},{default:l(()=>[u(" Imagen "),e(a,{end:"",icon:"tabler-photo"})]),_:1})]),_:1}),e(r,null,{default:l(()=>[e(t,{onClick:o[2]||(o[2]=n=>B())},{default:l(()=>[u(" Texto "),e(a,{end:"",icon:"tabler-letter-t"})]),_:1})]),_:1}),i(b)[i(f)].arrayRows[i(m)].columns[i(c)].classCol=="col-12"?(M(),W(r,{key:0},{default:l(()=>[e(t,{onClick:o[3]||(o[3]=n=>p("banner"))},{default:l(()=>[u(" Banner "),e(a,{end:"",icon:"tabler-layout-collage"})]),_:1})]),_:1})):X("",!0),e(r,null,{default:l(()=>[e(t,{onClick:o[4]||(o[4]=n=>F())},{default:l(()=>[u(" slider "),e(a,{end:"",icon:"tabler-adjustments"})]),_:1})]),_:1}),e(r,null,{default:l(()=>[e(t,{onClick:o[5]||(o[5]=n=>P())},{default:l(()=>[u(" Pop Ups "),e(a,{end:"",icon:"tabler-message-circle-2"})]),_:1})]),_:1}),e(r,null,{default:l(()=>[e(t,{onClick:o[6]||(o[6]=n=>v("normales"))},{default:l(()=>[u(" Formularios "),e(a,{end:"",icon:"mdi-list-box"})]),_:1})]),_:1}),e(r,null,{default:l(()=>[e(t,{onClick:o[7]||(o[7]=n=>v("externos"))},{default:l(()=>[u(" Requerimientos "),e(a,{end:"",icon:"mdi-list-box"})]),_:1})]),_:1}),e(r,null,{default:l(()=>[e(t,{onClick:o[8]||(o[8]=n=>J())},{default:l(()=>[u(" Redes Sociales "),e(a,{end:"",icon:"mdi-wan"})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]))}});export{ee as _};