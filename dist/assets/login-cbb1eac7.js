import{_ as w}from"./AppTextField.vue_vue_type_script_setup_true_lang-e9effeda.js";import{e as C,r as p,bj as I,f as L,u as B,U as S,o as D,J as F,w as t,d as e,a as o,aZ as d,g as a,I as N,B as f,t as R,h as T,b as j,a9 as g}from"./index-8ab07650.js";import{useCompaniesStore as M}from"./useCompaniesStore-bfc2e66e.js";import{u as _,m as U,a as $}from"./misc-mask-light-b851b353.js";import{a as r,V as h}from"./VRow-2de8352d.js";import{V as A}from"./VForm-fc9213b6.js";import"./VTextField-a36c9478.js";import"./forwardRefs-9d31fcaa.js";const z="/assets/auth-v2-login-illustration-bordered-dark-a595a9b7.png",G="/assets/auth-v2-login-illustration-bordered-light-47ee3625.png",J="/assets/auth-v2-login-illustration-dark-0878e8b9.png",P="/assets/auth-v2-login-illustration-light-d1fd488d.png",Z={class:"position-relative bg-background rounded-lg w-100 ma-8 me-0"},q={class:"d-flex align-center justify-center w-100 h-100"},E={class:"text-h5 mt-2 mb-4"},H={class:"text-capitalize"},K=o("b",null,"Iniciar sesión",-1),O=o("span",null,"¿Nuevo en nuestra plataforma?",-1),Q=C({__name:"login",setup(W){const V=M();_(P,J,G,z,!0);const b=_($,U),i=p(!1),k=p(),n=I({email:"",password:""}),x=L(),u=B();V.fetchInfo(1);const y=async()=>{const c=await u.login(n);console.log(c),c.code==200&&x.push({name:"index"})};return(c,s)=>{const m=w,v=S("RouterLink");return D(),F(h,{"no-gutters":"",class:"auth-wrapper bg-surface"},{default:t(()=>[e(r,{lg:"8",class:"d-none d-lg-flex"},{default:t(()=>[o("div",Z,[o("div",q,[e(d,{"max-width":"505",src:a(u).company.image_cover,class:"auth-illustration mt-16 mb-2"},null,8,["src"])]),e(d,{src:a(b),class:"auth-footer-mask"},null,8,["src"])])]),_:1}),e(r,{cols:"12",lg:"4",class:"auth-card-v2 d-flex align-center justify-center"},{default:t(()=>[e(N,{flat:"","max-width":500,class:"mt-12 mt-sm-0 pa-4"},{default:t(()=>[e(f,{class:"pb-0"},{default:t(()=>[e(d,{class:"d-none d-lg-block",style:{width:"60px"},src:a(u).company.image_icon},null,8,["src"]),o("h5",E,[o("span",H,R(a(u).company.name),1)])]),_:1}),e(f,null,{default:t(()=>[e(a(A),{ref_key:"refVForm",ref:k},{default:t(()=>[e(h,null,{default:t(()=>[e(r,{cols:"12"},{default:t(()=>[e(m,{modelValue:a(n).email,"onUpdate:modelValue":s[0]||(s[0]=l=>a(n).email=l),label:"Correo electrónico",type:"email",autofocus:""},null,8,["modelValue"])]),_:1}),e(r,{cols:"12"},{default:t(()=>[e(m,{modelValue:a(n).password,"onUpdate:modelValue":s[1]||(s[1]=l=>a(n).password=l),label:"Contraseña",type:a(i)?"text":"password","append-inner-icon":a(i)?"tabler-eye-off":"tabler-eye","onClick:appendInner":s[2]||(s[2]=l=>i.value=!a(i))},null,8,["modelValue","type","append-inner-icon"]),e(T,{class:"mt-4",block:"",type:"button",onClick:s[3]||(s[3]=l=>y()),"append-icon":"mdi-login"},{default:t(()=>[K]),_:1})]),_:1}),e(r,{cols:"12",class:"text-center"},{default:t(()=>[O,e(v,{class:"text-primary ms-2",to:{name:"register"}},{default:t(()=>[j(" Crea una cuenta ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})}}});typeof g=="function"&&g(Q);export{Q as default};