import{p as i,q as s,r as n,s as r}from"./index-dd53741e.js";const o=r(),l=i("useCrudRequirementTypeStore",{state:()=>({loading:!0,action:"list",typeAction:"list",requirementTypeData:{},keyList:0,requirementTypes:[],totalData:0,totalPage:0,currentPage:1,lastPage:0,formulario:{id:null,name:null,internal:null,external:null,arrayCharges:[],arrayInputs:[]},charges_arrayInfo:[],charges_countLinks:0}),getters:{},actions:{clearFormulario(){this.formulario={id:null,name:null,internal:null,external:null,arrayCharges:[],arrayInputs:[]}},async fetchAll(e){this.loading=!0,await s.post("/requirementType-list",e).then(a=>{this.loading=!1,this.requirementTypes=a.data.requirementTypes,this.totalData=a.data.totalData,this.totalPage=a.data.totalPage,this.currentPage=a.data.currentPage,this.lastPage=a.data.lastPage}).catch(a=>{this.loading=!1,console.log("error",a)})},async fetchSave(){const e=n();return e.isLoading=!0,await s.post("/requirementType-create",this.formulario).then(a=>(e.isLoading=!1,a.data.code===200?o.toast("Éxito",a.data.message,"success"):o.toast("Error",a.data.message,"danger"),{message:a.data.message,code:a.data.code,errors:a.data.errors})).catch(async a=>(e.isLoading=!1,a.response.status===500&&o.toast("Error",a.response.data.message,"danger"),console.log(await a),{errors:a.response.data.errors,code:a.response.data.code,message:a.response.data.message}))},async fetchDelete(e){const a=n();a.isLoading=!0,await s.delete("/requirementType-delete/"+e).then(t=>{a.isLoading=!1,o.toast("Éxito",t.data.message,"success")}).catch(async t=>{a.isLoading=!1,console.log(await t)})},async fetchInfo(e){const a=n();a.isLoading=!0,await s.get(`/requirementType-info/${e}`).then(async t=>{a.isLoading=!1,this.requirementTypeData.id=e,this.formulario=await t.data.data}).catch(async t=>{a.isLoading=!1,console.log(await t)})},async fetchDataForm(){const e=n();e.isLoading=!0,await s.post("/requirementType-dataForm").then(async a=>{e.isLoading=!1,this.charges_arrayInfo=await a.data.charges_arrayInfo,this.charges_countLinks=await a.data.charges_countLinks}).catch(async a=>{e.isLoading=!1,console.log(await a)})},async fetchSelectCharges(e){this.loading=!0,await s.post("/charge-select2InfiniteList",e).then(async a=>{this.loading=!1,this.charges_arrayInfo=await a.data.charges_arrayInfo,this.charges_countLinks=await a.data.charges_countLinks}).catch(async a=>{this.loading=!1,console.log(await a)})}}});export{l as useCrudRequirementTypeStore};
