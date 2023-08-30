import{k as r,l as i,n,p as d}from"./index-9109da95.js";const o=d(),c=r("useCrudRoleStore",{state:()=>({loading:!0,action:"list",typeAction:"list",roleData:{},keyList:0,roles:[],totalData:0,totalPage:0,currentPage:1,lastPage:0,arrayMenus:[],formulario:{name:"",description:"",pageInitial:"",permissions:[]}}),getters:{},actions:{clearFormulario(){this.roleData={name:"",description:""},this.formulario={id:null,name:"",description:"",pageInitial:"",permissions:[]},this.resetArrayMenus()},async fetchAll(s){this.loading=!0,await i.post("/role-list",s).then(a=>{this.loading=!1,this.roles=a.data.roles,this.totalData=a.data.totalData,this.totalPage=a.data.totalPage,this.currentPage=a.data.currentPage,this.lastPage=a.data.lastPage}).catch(async a=>{this.loading=!1,console.log(await a)})},async fetchDataForm(){const s=n();s.isLoading=!0,await i.get("/role-dataForm").then(a=>{s.isLoading=!1,this.arrayMenus=a.data.menus}).catch(async a=>{s.isLoading=!1,console.log(await a)})},async fetchSave(){const s=n();return s.isLoading=!0,await i.post("/role-create",this.formulario).then(a=>{var e;return s.isLoading=!1,a.data.code===200?o.toast("Éxito",a.data.message,"success"):o.toast("Error",a.data.message,"danger"),{message:a.data.message,code:a.data.code,errors:(e=a.data)==null?void 0:e.errors}}).catch(async a=>(s.isLoading=!1,console.log(await a),a.response.state===500&&o.toast("Error",a.response.data.message,"danger"),{errors:a.response.data.errors,code:a.response.data.code,message:a.response.data.message}))},async fetchDelete(s){const a=n();return a.isLoading=!0,await await i.delete(`/role-delete/${s}`).then(t=>(a.isLoading=!1,t.data.code===200&&o.toast("Éxito",t.data.message,"success"),t.data.code===500&&o.toast("Error",t.data.message,"danger"),t.data.code)).catch(async t=>(a.isLoading=!1,console.log(await t),t.response.state===500&&o.toast("Error",t.response.data.message,"danger"),t.response.state))},resetArrayMenus(){for(let s=0;s<this.arrayMenus.length;s++)for(let a=0;a<this.arrayMenus[s].permissions.length;a++)this.arrayMenus[s].permissions[a].estado=null},loadCheckPermissions(){for(let s=0;s<this.arrayMenus.length;s++)for(let a=0;a<this.arrayMenus[s].permissions.length;a++)for(let e=0;e<this.formulario.permissions.length;e++)this.formulario.permissions.includes(this.arrayMenus[s].permissions[a].id)&&(this.arrayMenus[s].permissions[a].estado="Activo")},async fetchInfo(s){const a=n();a.isLoading=!0,await i.get(`/role-info/${s}`).then(async e=>{a.isLoading=!1,this.formulario=await e.data.data,this.roleData.id=s,this.loadCheckPermissions()}).catch(async e=>{a.isLoading=!1,console.log(await e)})}}});export{c as useCrudRoleStore};
