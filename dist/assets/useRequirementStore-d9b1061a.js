import{f as c,g as i,u as r,Y as l,h as u}from"./index-c9350ca5.js";const n=u(),p=c("useRequirementStore",{state:()=>({loading:{table:!1,selectRequirementTypes:!1},disabled:!1,typeAction:"list",requirementData:{},keyList:0,requirements:[],dataTraceability:[],totalData:0,totalPage:0,currentPage:1,lastPage:0,formulario:{id:null,requirement_type_id:null,user_id:null,formData:null},formularioManage:{id:null,observation:"",files:[]},charges:[],arrayAction:["Devolver","Continuar"],requirementTypes_arrayInfo:[],requirementTypes_countLinks:0}),getters:{},actions:{clearFormulario(){this.disabled=!1,this.formulario={id:null,requirement_type_id:null,user_id:null,formData:null}},clearFormularioManage(){this.formularioManage={id:null,observation:"",files:[]}},async fetchAll(s){this.loading.table=!0,await i.post("/requirement-list",s).then(a=>{this.loading.table=!1,this.requirements=a.data.requirements,this.totalData=a.data.totalData,this.totalPage=a.data.totalPage,this.currentPage=a.data.currentPage,this.lastPage=a.data.lastPage}).catch(a=>{this.loading.table=!1,console.log("error",a)})},async fetchManageSave(s={}){const a=r();a.isLoading=!0;const e=new FormData;return e.append("requirement_id",String(this.requirementData.id)),e.append("observation",String(this.formularioManage.observation)),e.append("countFiles",String(this.formularioManage.files.length)),this.formularioManage.files.forEach((t,o)=>{e.append("file"+o,t.file),e.append("file_id"+o,String(t.id)),e.append("file_name"+o,String(t.name)),e.append("file_delete"+o,String(t.delete))}),e.append("action",String(s.action)),e.append("where",String(s.where)),e.append("archive_final",s.archive_final),await i.post("/requirement-manageCreate",e).then(t=>(a.isLoading=!1,t.data.code===200?n.toast("Éxito",t.data.message,"success"):n.toast("Error",t.data.message,"danger"),{message:t.data.message,code:t.data.code,errors:t.data.errors})).catch(async t=>(a.isLoading=!1,t.response.status===500&&n.toast("Error",t.response.data.message,"danger"),console.log(await t),{errors:t.response.data.errors,code:t.response.data.code,message:t.response.data.message}))},async fetchInfo(s){const a=r();a.isLoading=!0,await i.get(`/requirement-info/${s}`).then(async e=>{a.isLoading=!1,this.formulario=await e.data.data,this.disabled=!0}).catch(async e=>{a.isLoading=!1,console.log(await e)})},async fetchDelete(s){const a=r();a.isLoading=!0,await i.delete("/requirement-delete/"+s).then(e=>{a.isLoading=!1,n.toast("Éxito",e.data.message,"success")}).catch(async e=>{a.isLoading=!1,console.log(await e)})},async fetchManageDataForm(s){const a=r();a.isLoading=!0,await i.post("/requirement-manageDataForm",s).then(async e=>{a.isLoading=!1,this.clearFormularioManage(),this.requirementData=await e.data.requirement,this.dataTraceability=this.requirementData.manages,this.charges=await e.data.charges;const t=l();this.charges.findIndex(d=>d.id==t.user.charge_id)==0&&this.arrayAction.splice(0,1)}).catch(async e=>{a.isLoading=!1,console.log(await e)})},async fetchDataForm(){const s=r();s.isLoading=!0,await i.get("/requirement-dataForm").then(async a=>{s.isLoading=!1,this.requirementTypes_arrayInfo=await a.data.requirementTypes_arrayInfo,this.requirementTypes_countLinks=await a.data.requirementTypes_countLinks}).catch(async a=>{s.isLoading=!1,console.log(await a)})},async fetchSave(){const s=r();s.isLoading=!0;const a=new FormData;return a.append("id",this.formulario.id),a.append("requirement_type_id",this.formulario.requirement_type_id),a.append("user_id",this.formulario.user_id),a.append("cant_inputs",this.formulario.formData.arrayInputs.length),this.formulario.formData.arrayInputs.forEach((e,t)=>{a.append("input_id"+t,e.id),a.append("input_type_id"+t,e.type_input),a.append("input_answer"+t,e.answer)}),await i.post("/requirement-create",a).then(e=>(s.isLoading=!1,e.data.code===200?n.toast("Éxito",e.data.message,"success"):n.toast("Error",e.data.message,"danger"),{message:e.data.message,code:e.data.code,errors:e.data.errors})).catch(async e=>(s.isLoading=!1,e.response.status===500&&n.toast("Error",e.response.data.message,"danger"),console.log(await e),{errors:e.response.data.errors,code:e.response.data.code,message:e.response.data.message}))},async fetchSelectRequirementTypes(s){this.loading.selectRequirementTypes=!0,await i.post("/requirementType-select2",s).then(async a=>{this.loading.selectRequirementTypes=!1,this.requirementTypes_arrayInfo=await a.data.requirementTypes_arrayInfo,this.requirementTypes_countLinks=await a.data.requirementTypes_countLinks}).catch(async a=>{this.loading.selectRequirementTypes=!1,console.log(await a)})}}});export{p as useRequirementStore};