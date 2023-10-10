import{k as n,l as s,n as o,p as l}from"./index-8ab07650.js";const i=l(),c=n("useCrudProductionStore",{state:()=>({loading:!0,action:"list",typeAction:"list",productionData:{},keyList:0,productions:[],totalData:0,totalPage:0,currentPage:1,lastPage:0,formulario:{id:null,style_id:null,employee_id:null,cant:null,total:null},styles:[],employees:[]}),getters:{},actions:{clearFormulario(){this.formulario={id:null,style_id:null,employee_id:null,cant:null,total:null}},async fetchAll(t){this.loading=!0,await s.post("/production-list",t).then(a=>{this.loading=!1,this.productions=a.data.productions,this.totalData=a.data.totalData,this.totalPage=a.data.totalPage,this.currentPage=a.data.currentPage,this.lastPage=a.data.lastPage}).catch(a=>{this.loading=!1,console.log("error",a)})},async fetchDataForm(){const t=o();t.isLoading=!0,await s.get("/production-dataForm").then(a=>{t.isLoading=!1,this.styles=a.data.styles,this.employees=a.data.employees}).catch(async a=>{t.isLoading=!1,console.log(await a)})},async fetchSave(){const t=o();return t.isLoading=!0,await s.post("/production-create",this.formulario).then(a=>(t.isLoading=!1,a.data.code===200?i.toast("Éxito",a.data.message,"success"):i.toast("Error",a.data.message,"danger"),{message:a.data.message,code:a.data.code,errors:a.data.errors})).catch(async a=>(t.isLoading=!1,a.response.status===500&&i.toast("Error",a.response.data.message,"danger"),console.log(await a),{errors:a.response.data.errors,code:a.response.data.code,message:a.response.data.message}))},async fetchDelete(t){const a=o();a.isLoading=!0,await s.delete("/production-delete/"+t).then(e=>{a.isLoading=!1,i.toast("Éxito",e.data.message,"success")}).catch(async e=>{a.isLoading=!1,console.log(await e)})},async fetchInfo(t){const a=o();a.isLoading=!0,await s.get(`/production-info/${t}`).then(async e=>{a.isLoading=!1,this.productionData.id=t,this.formulario=await e.data.data}).catch(async e=>{a.isLoading=!1,console.log(await e)})}}});export{c as useCrudProductionStore};