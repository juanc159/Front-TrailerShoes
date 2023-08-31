import{k as r,l as s,n as o,p as d}from"./index-7cf6b37e.js";import{S as h}from"./sweetalert2.all-e795d634.js";import"./_commonjsHelpers-725317a4.js";const n=d(),p=r("useCrudUserStore",{state:()=>({loading:!0,formulario:{id:null,email:"",name:"",lastName:"",role_id:null,identity_type_id:null,charge_id:null,idNumber:"",password:null,expeditionDate:null,birthDate:null,gender_id:null,weight:null,height:null,civil_status_id:null,phone:null,cellphone:null,address:null,have_son:null,nameContact:null,relationshipContact:null,phoneContact:null,cellphoneContact:null,emailContact:null},action:"list",typeAction:"list",userData:{},keyList:0,users:[],totalData:0,totalPage:0,currentPage:1,lastPage:0,genders:[],civilStatus:[],arrayRoles:[],countRoles:0,identityTypes:[],charges_arrayInfo:[],charges_countLinks:0}),getters:{},actions:{clearFormulario(){this.formulario={id:null,email:"",name:"",lastName:"",role_id:null,identity_type_id:null,charge_id:null,idNumber:"",expeditionDate:null,birthDate:null,gender_id:null,weight:null,height:null,civil_status_id:null,phone:null,cellphone:null,address:null,have_son:null,nameContact:null,relationshipContact:null,phoneContact:null,cellphoneContact:null,emailContact:null}},async fetchAll(e){this.loading=!0,await s.post("/user-list",e).then(a=>{this.loading=!1,this.users=a.data.user,this.totalData=a.data.totalData,this.totalPage=a.data.totalPage,this.currentPage=a.data.currentPage,this.lastPage=a.data.lastPage}).catch(async a=>{this.loading=!1,console.log(await a)})},async fetchSave(){const e=o(),a=new FormData;for(const t in this.formulario)a.append(t,this.formulario[t]);return e.isLoading=!0,await s.post("/user-create",a).then(t=>(e.isLoading=!1,t.data.code===200?(this.formulario=t.data.data,n.toast("Éxito",t.data.message,"success")):n.toast("Error",t.data.message,"danger"),{code:t.data.code,message:t.data.message,errors:t.data.errors})).catch(async t=>(e.isLoading=!1,t.response.status===500&&n.toast("Error",t.response.data.message,"danger"),console.log(await t),{errors:t.response.data.errors,code:t.response.data.code,message:t.response.data.message}))},async fetchDataForm(){const e=o();e.isLoading=!0,await s.post("/user-dataForm").then(a=>{e.isLoading=!1,this.identityTypes=a.data.identityTypes,this.arrayRoles=a.data.roles,this.countRoles=a.data.roles.length,this.charges_arrayInfo=a.data.charges_arrayInfo,this.charges_countLinks=a.data.charges_countLinks,this.genders=a.data.genders,this.civilStatus=a.data.civilStatus}).catch(async a=>{e.isLoading=!1,console.log(await a)})},async fetchDelete(e){const a=o();a.isLoading=!0,await s.delete("/user-delete/"+e).then(t=>{a.isLoading=!1,n.toast("Éxito",t.data.message,"success")}).catch(async t=>{a.isLoading=!1,console.log(await t)})},async fetchInfo(e){const a=o();a.isLoading=!0,await s.get(`/user-info/${e}`).then(async t=>{console.log("RESULT",t),a.isLoading=!1,this.formulario=await t.data.data,this.userData.id=e}).catch(async t=>{a.isLoading=!1,console.log(await t)})},changeState(e,a){const t=o();let i="";a==0?i="activar":i="inactivar",h.fire({title:"¿Está seguro de "+i+" el Registro seleccionado?",showDenyButton:!0,confirmButtonText:"Si",denyButtonText:"No",allowOutsideClick:!1}).then(c=>{c.isConfirmed?(t.isLoading=!0,s.post("/user-changeState",e).then(l=>{t.isLoading=!1,l.data.code==200&&n.toast("Éxito",l.data.msg,"success"),l.data.code==500&&n.toast("Éxito",l.data.msg,"danger")})):i=="activar"?e.state=0:e.state=1})},async fetchSelectCharges(e){this.loading=!0,await s.post("/charge-select2InfiniteList",e).then(async a=>{this.loading=!1,this.charges_arrayInfo=await a.data.charges_arrayInfo,this.charges_countLinks=await a.data.charges_countLinks}).catch(async a=>{this.loading=!1,console.log(await a)})}}});export{p as useCrudUserStore};
