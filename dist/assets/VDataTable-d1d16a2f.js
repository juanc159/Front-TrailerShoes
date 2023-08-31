import{dU as ce,d as f,I as fe,aH as C,bY as p,y as O,N as R,b5 as Z,c9 as B,c2 as _,av as F,B as x,b6 as I,dV as U,as as E,aW as Q,dW as ge,bb as me,bZ as ve,ay as G,bg as ye,F as A,dX as W,V as he,m as D,b as X,dY as be,dM as J,dZ as j,b0 as ee,E as xe,d_ as we,d$ as Se,e0 as ke,e1 as pe,bw as Pe,h as q,e2 as Ie,b3 as Te}from"./index-dd53741e.js";import{V as Ve}from"./VTable-d4eafbb2.js";const z=ce({align:{type:String,default:"start"},fixed:Boolean,fixedOffset:[Number,String],height:[Number,String],lastFixed:Boolean,noPadding:Boolean,tag:String,width:[Number,String]},(e,n)=>{let{slots:t,attrs:a}=n;const l=e.tag??"td";return f(l,fe({class:["v-data-table__td",{"v-data-table-column--fixed":e.fixed,"v-data-table-column--last-fixed":e.lastFixed,"v-data-table-column--no-padding":e.noPadding},`v-data-table-column--align-${e.align}`],style:{height:C(e.height),width:C(e.width),left:C(e.fixedOffset||null)}},a),{default:()=>{var s;return[(s=t.default)==null?void 0:s.call(t)]}})}),De=p({headers:{type:Array,default:()=>[]}},"v-data-table-header"),te=Symbol.for("vuetify:data-table-headers");function Ce(e,n){const t=O([]),a=O([]);R(()=>e.headers,()=>{var b,w,S;const s=e.headers.length?Array.isArray(e.headers[0])?e.headers:[e.headers]:[],o=s.flatMap((y,v)=>y.map(m=>({column:m,row:v}))),i=s.length,r={title:"",sortable:!1},d={...r,width:48};if((b=n==null?void 0:n.groupBy)!=null&&b.value.length){const y=o.findIndex(v=>{let{column:m}=v;return m.key==="data-table-group"});y<0?o.unshift({column:{...r,key:"data-table-group",title:"Group",rowspan:i},row:0}):o.splice(y,1,{column:{...r,...o[y].column},row:o[y].row})}if((w=n==null?void 0:n.showSelect)!=null&&w.value){const y=o.findIndex(v=>{let{column:m}=v;return m.key==="data-table-select"});y<0?o.unshift({column:{...d,key:"data-table-select",rowspan:i},row:0}):o.splice(y,1,{column:{...d,...o[y].column},row:o[y].row})}if((S=n==null?void 0:n.showExpand)!=null&&S.value){const y=o.findIndex(v=>{let{column:m}=v;return m.key==="data-table-expand"});y<0?o.push({column:{...d,key:"data-table-expand",rowspan:i},row:0}):o.splice(y,1,{column:{...d,...o[y].column},row:o[y].row})}const u=Z(i).map(()=>[]),c=Z(i).fill(0);let g=0;o.forEach(y=>{let{column:v,row:m}=y;const P=v.key??`data-table-column-${g++}`;for(let k=m;k<=m+(v.rowspan??1)-1;k++)u[k].push({...v,key:P,fixedOffset:c[k],sortable:v.sortable??!!v.key}),c[k]+=v.width??0}),u.forEach(y=>{for(let v=y.length;v--;v>=0)if(y[v].fixed){y[v].lastFixed=!0;return}});const h=new Set;t.value=u.map(y=>{const v=[];for(const m of y)h.has(m.key)||(h.add(m.key),v.push(m));return v}),a.value=u.at(-1)??[]},{deep:!0,immediate:!0});const l={headers:t,columns:a};return B(te,l),l}function H(){const e=_(te);if(!e)throw new Error("Missing headers!");return e}const Fe=p({showSelect:Boolean,modelValue:{type:Array,default:()=>[]}},"v-data-table-select"),ae=Symbol.for("vuetify:data-table-selection");function Be(e,n){const t=F(e,"modelValue",e.modelValue,c=>new Set(c),c=>[...c.values()]);function a(c){return c.every(g=>t.value.has(g.value))}function l(c){return c.some(g=>t.value.has(g.value))}function s(c,g){const h=new Set(t.value);for(const b of c)g?h.add(b.value):h.delete(b.value);t.value=h}function o(c){s([c],!a([c]))}function i(c){s(n.value,c)}const r=x(()=>t.value.size>0),d=x(()=>a(n.value)),u={toggleSelect:o,select:s,selectAll:i,isSelected:a,isSomeSelected:l,someSelected:r,allSelected:d};return B(ae,u),u}function K(){const e=_(ae);if(!e)throw new Error("Missing selection!");return e}const _e=p({sortBy:{type:Array,default:()=>[]},multiSort:Boolean,mustSort:Boolean},"v-data-table-sort"),ne=Symbol.for("vuetify:data-table-sort");function $e(e){const n=F(e,"sortBy"),t=I(e,"mustSort"),a=I(e,"multiSort");return{sortBy:n,mustSort:t,multiSort:a}}function Oe(e){const{sortBy:n,mustSort:t,multiSort:a,page:l}=e,o={sortBy:n,toggleSort:i=>{let r=n.value.map(u=>({...u}))??[];const d=r.find(u=>u.key===i);d?d.order==="desc"?t.value?d.order="asc":r=r.filter(u=>u.key!==i):d.order="desc":a.value?r=[...r,{key:i,order:"asc"}]:r=[{key:i,order:"asc"}],n.value=r,l&&(l.value=1)}};return B(ne,o),o}function Ee(){const e=_(ne);if(!e)throw new Error("Missing sort!");return e}function Me(e,n,t){const a=x(()=>t.value.reduce((s,o)=>(o.sort&&(s[o.key]=o.sort),s),{}));return{sortedItems:x(()=>n.value.length?Ne(e.value,n.value,"en",a.value):e.value)}}function Ne(e,n,t,a){const l=new Intl.Collator(t,{sensitivity:"accent",usage:"sort"});return[...e].sort((s,o)=>{for(let i=0;i<n.length;i++){const r=n[i].key,d=n[i].order;if(d===!1)continue;let u=U(s.raw,r),c=U(o.raw,r);if(d==="desc"&&([u,c]=[c,u]),a!=null&&a[r]){const g=a[r](u,c);if(!g)continue;return g}if(!(u==null||c==null)){if(u instanceof Date&&c instanceof Date)return u.getTime()-c.getTime();if([u,c]=[u,c].map(g=>(g||"").toString().toLocaleLowerCase()),u!==c)return!isNaN(u)&&!isNaN(c)?Number(u)-Number(c):l.compare(u,c)}}return 0})}const Le=E()({name:"VDataTableHeaders",props:{color:String,sticky:Boolean,multiSort:Boolean,sortAscIcon:{type:Q,default:"$sortAsc"},sortDescIcon:{type:Q,default:"$sortDesc"},...ge()},setup(e,n){let{slots:t,emit:a}=n;const{toggleSort:l,sortBy:s}=Ee(),{someSelected:o,allSelected:i,selectAll:r}=K(),{columns:d,headers:u}=H(),{loaderClasses:c}=me(e),g=(v,m)=>!e.sticky&&!v.fixed?null:{position:"sticky",zIndex:v.fixed?4:e.sticky?3:void 0,left:v.fixed?C(v.fixedOffset):void 0,top:e.sticky?`calc(var(--v-table-header-height) * ${m})`:void 0};function h(v){const m=s.value.find(P=>P.key===v);return m?m.order==="asc"?e.sortAscIcon:e.sortDescIcon:e.sortAscIcon}const{backgroundColorClasses:b,backgroundColorStyles:w}=ve(e,"color"),S=x(()=>({headers:u.value,columns:d.value,toggleSort:l,sortBy:s.value,someSelected:o.value,allSelected:i.value,selectAll:r,getSortIcon:h,getFixedStyles:g})),y=v=>{let{column:m,x:P,y:k}=v;const M=!!s.value.find(V=>V.key===m.key),N=m.key==="data-table-select"||m.key==="data-table-expand";return f(z,{tag:"th",align:m.align,class:["v-data-table__th",{"v-data-table__th--sortable":m.sortable,"v-data-table__th--sorted":M},c.value],style:{width:C(m.width),minWidth:C(m.width),...g(m,k)},colspan:m.colspan,rowspan:m.rowspan,onClick:m.sortable?()=>l(m.key):void 0,lastFixed:m.lastFixed,noPadding:N},{default:()=>{var $;const V=`column.${m.key}`,T={column:m,selectAll:r};return t[V]?t[V](T):m.key==="data-table-select"?(($=t["column.data-table-select"])==null?void 0:$.call(t,T))??f(W,{modelValue:i.value,indeterminate:o.value&&!i.value,"onUpdate:modelValue":r},null):f("div",{class:"v-data-table-header__content"},[f("span",null,[m.title]),m.sortable&&f(he,{key:"icon",class:"v-data-table-header__sort-icon",icon:h(m.key)},null),e.multiSort&&M&&f("div",{key:"badge",class:["v-data-table-header__sort-badge",...b.value],style:w.value},[s.value.findIndex(L=>L.key===m.key)+1])])}})};G(()=>f(A,null,[t.headers?t.headers(S.value):u.value.map((v,m)=>f("tr",null,[v.map((P,k)=>f(y,{column:P,x:k,y:m},null))])),e.loading&&f("tr",{class:"v-data-table__progress"},[f("th",{colspan:d.value.length},[f(ye,{name:"v-data-table-headers",active:!0,color:typeof e.loading=="boolean"?void 0:e.loading,indeterminate:!0},{default:t.loader})])])]))}}),Ae=p({groupBy:{type:Array,default:()=>[]}},"data-table-group"),le=Symbol.for("vuetify:data-table-group");function Ge(e){return{groupBy:F(e,"groupBy")}}function He(e){const{groupBy:n,sortBy:t}=e,a=O(new Set),l=x(()=>n.value.map(d=>({...d,order:d.order??!1})).concat(t.value));function s(d){return a.value.has(d.id)}function o(d){const u=new Set(a.value);s(d)?u.delete(d.id):u.add(d.id),a.value=u}function i(d){function u(c){const g=[];for(const h of c.items)h.type==="item"?g.push(h):g.push(...u(h));return g}return u({type:"group-header",items:d,id:"dummy",key:"dummy",value:"dummy",depth:0})}const r={sortByWithGroups:l,toggleGroup:o,opened:a,groupBy:n,extractRows:i,isGroupOpen:s};return B(le,r),r}function re(){const e=_(le);if(!e)throw new Error("Missing group!");return e}function Ke(e,n){if(!e.length)return[];const t=new Map;for(const a of e){const l=U(a.raw,n);t.has(l)||t.set(l,[]),t.get(l).push(a)}return t}function oe(e,n){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"root";if(!n.length)return[];const l=Ke(e,n[0]),s=[],o=n.slice(1);return l.forEach((i,r)=>{const d=n[0],u=`${a}_${d}_${r}`;s.push({depth:t,id:u,key:d,value:r,items:o.length?oe(i,o,t+1,u):i,type:"group-header"})}),s}function ue(e,n){const t=[];for(const a of e)a.type==="group-header"?(a.value!=null&&t.push(a),(n.has(a.id)||a.value==null)&&t.push(...ue(a.items,n))):t.push(a);return t}function Re(e,n,t){return{flatItems:x(()=>{if(!n.value.length)return e.value;const l=oe(e.value,n.value.map(s=>s.key));return ue(l,t.value)})}}const Ue=E()({name:"VDataTableGroupHeaderRow",props:{item:{type:Object,required:!0}},setup(e,n){let{slots:t}=n;const{isGroupOpen:a,toggleGroup:l,extractRows:s}=re(),{isSelected:o,isSomeSelected:i,select:r}=K(),{columns:d}=H(),u=x(()=>s([e.item]));return()=>f("tr",{class:"v-data-table-group-header-row",style:{"--v-data-table-group-header-row-depth":e.item.depth}},[d.value.map(c=>{var g,h;if(c.key==="data-table-group"){const b=a(e.item)?"$expand":"$next",w=()=>l(e.item);return((g=t["data-table-group"])==null?void 0:g.call(t,{item:e.item,count:u.value.length,props:{icon:b,onClick:w}}))??f(z,{class:"v-data-table-group-header-row__column"},{default:()=>[f(D,{size:"small",variant:"text",icon:b,onClick:w},null),f("span",null,[e.item.value]),f("span",null,[X("("),u.value.length,X(")")])]})}if(c.key==="data-table-select"){const b=o(u.value),w=i(u.value)&&!b,S=y=>r(u.value,y);return((h=t["data-table-select"])==null?void 0:h.call(t,{props:{modelValue:b,indeterminate:w,"onUpdate:modelValue":S}}))??f("td",null,[f(W,{modelValue:b,indeterminate:w,"onUpdate:modelValue":S},null)])}return f("td",null,null)})])}}),We=p({expandOnClick:Boolean,showExpand:Boolean,expanded:{type:Array,default:()=>[]}},"v-data-table-expand"),se=Symbol.for("vuetify:datatable:expanded");function je(e){const n=I(e,"expandOnClick"),t=F(e,"expanded",e.expanded,i=>new Set(i),i=>[...i.values()]);function a(i,r){const d=new Set(t.value);r?d.add(i.value):d.delete(i.value),t.value=d}function l(i){return t.value.has(i.value)}function s(i){a(i,!l(i))}const o={expand:a,expanded:t,expandOnClick:n,isExpanded:l,toggleExpand:s};return B(se,o),o}function ie(){const e=_(se);if(!e)throw new Error("foo");return e}const ze=be({name:"VDataTableRow",props:{index:Number,item:Object,onClick:Function},setup(e,n){let{slots:t}=n;const{isSelected:a,toggleSelect:l}=K(),{isExpanded:s,toggleExpand:o}=ie(),{columns:i}=H();G(()=>f("tr",{class:["v-data-table__tr",{"v-data-table__tr--clickable":!!e.onClick}],onClick:e.onClick},[e.item&&i.value.map((r,d)=>f(z,{align:r.align,fixed:r.fixed,fixedOffset:r.fixedOffset,lastFixed:r.lastFixed,noPadding:r.key==="data-table-select"||r.key==="data-table-expand",width:r.width},{default:()=>{var h,b;const u=e.item,c=`item.${r.key}`,g={index:e.index,item:e.item,columns:i.value,isSelected:a,toggleSelect:l,isExpanded:s,toggleExpand:o};return t[c]?t[c](g):r.key==="data-table-select"?((h=t["item.data-table-select"])==null?void 0:h.call(t,g))??f(W,{modelValue:a([u]),onClick:J(()=>l(u),["stop"])},null):r.key==="data-table-expand"?((b=t["item.data-table-expand"])==null?void 0:b.call(t,g))??f(D,{icon:s(u)?"$collapse":"$expand",size:"small",variant:"text",onClick:J(()=>o(u),["stop"])},null):j(u.columns,r.key)}}))]))}}),Ye=E()({name:"VDataTableRows",props:{loading:[Boolean,String],loadingText:{type:String,default:"$vuetify.dataIterator.loadingText"},hideNoData:Boolean,items:{type:Array,default:()=>[]},noDataText:{type:String,default:"$vuetify.noDataText"},rowHeight:Number,"onClick:row":Function},setup(e,n){let{emit:t,slots:a}=n;const{columns:l}=H(),{expandOnClick:s,toggleExpand:o,isExpanded:i}=ie(),{isSelected:r,toggleSelect:d}=K(),{toggleGroup:u,isGroupOpen:c}=re(),{t:g}=ee();return G(()=>{var h;return e.loading&&a.loading?f("tr",{class:"v-data-table-rows-loading",key:"loading"},[f("td",{colspan:l.value.length},[a.loading()])]):!e.loading&&!e.items.length&&!e.hideNoData?f("tr",{class:"v-data-table-rows-no-data",key:"no-data"},[f("td",{colspan:l.value.length},[((h=a["no-data"])==null?void 0:h.call(a))??g(e.noDataText)])]):f(A,null,[e.items.map((b,w)=>{var y;if(b.type==="group-header")return a["group-header"]?a["group-header"]({index:w,item:b,columns:l.value,isExpanded:i,toggleExpand:o,isSelected:r,toggleSelect:d,toggleGroup:u,isGroupOpen:c}):f(Ue,{key:`group-header_${b.id}`,item:b},a);const S={index:w,item:b,columns:l.value,isExpanded:i,toggleExpand:o,isSelected:r,toggleSelect:d};return f(A,null,[a.item?a.item(S):f(ze,{key:`item_${b.value}`,onClick:s.value||e["onClick:row"]?v=>{var m;s.value&&o(b),(m=e["onClick:row"])==null||m.call(e,v,{item:b})}:void 0,index:w,item:b},a),i(b)&&((y=a["expanded-row"])==null?void 0:y.call(a,S))])})])}),{}}});const Ze=p({page:{type:[Number,String],default:1},itemsPerPage:{type:[Number,String],default:10}},"v-data-table-paginate"),de=Symbol.for("vuetify:data-table-pagination");function Qe(e){const n=F(e,"page",void 0,a=>+(a??1)),t=F(e,"itemsPerPage",void 0,a=>+(a??10));return{page:n,itemsPerPage:t}}function Xe(e){const{page:n,itemsPerPage:t,itemsLength:a}=e,l=x(()=>t.value===-1?0:t.value*(n.value-1)),s=x(()=>t.value===-1?a.value:Math.min(a.value,l.value+t.value)),o=x(()=>t.value===-1||a.value===0?1:Math.ceil(a.value/t.value));function i(d){t.value=d,n.value=1}const r={page:n,itemsPerPage:t,itemsLength:a,startIndex:l,stopIndex:s,pageCount:o,setItemsPerPage:i};return B(de,r),r}function Je(){const e=_(de);if(!e)throw new Error("Missing pagination!");return e}function qe(e){const{items:n,startIndex:t,stopIndex:a,itemsPerPage:l}=e;return{paginatedItems:x(()=>l.value<=0?n.value:n.value.slice(t.value,a.value))}}const et=E()({name:"VDataTableFooter",props:{prevIcon:{type:String,default:"$prev"},nextIcon:{type:String,default:"$next"},firstIcon:{type:String,default:"$first"},lastIcon:{type:String,default:"$last"},itemsPerPageText:{type:String,default:"$vuetify.dataFooter.itemsPerPageText"},pageText:{type:String,default:"$vuetify.dataFooter.pageText"},firstPageLabel:{type:String,default:"$vuetify.dataFooter.firstPage"},prevPageLabel:{type:String,default:"$vuetify.dataFooter.prevPage"},nextPageLabel:{type:String,default:"$vuetify.dataFooter.nextPage"},lastPageLabel:{type:String,default:"$vuetify.dataFooter.lastPage"},itemsPerPageOptions:{type:Array,default:()=>[{value:10,title:"10"},{value:25,title:"25"},{value:50,title:"50"},{value:100,title:"100"},{value:-1,title:"$vuetify.dataFooter.itemsPerPageAll"}]},showCurrentPage:Boolean},setup(e,n){let{slots:t}=n;const{t:a}=ee(),{page:l,pageCount:s,startIndex:o,stopIndex:i,itemsLength:r,itemsPerPage:d,setItemsPerPage:u}=Je(),c=x(()=>e.itemsPerPageOptions.map(g=>({...g,title:a(g.title)})));return()=>{var g;return f("div",{class:"v-data-table-footer"},[(g=t.prepend)==null?void 0:g.call(t),f("div",{class:"v-data-table-footer__items-per-page"},[f("span",null,[a(e.itemsPerPageText)]),f(xe,{items:c.value,modelValue:d.value,"onUpdate:modelValue":h=>u(Number(h)),density:"compact",variant:"outlined","hide-details":!0},null)]),f("div",{class:"v-data-table-footer__info"},[f("div",null,[a(e.pageText,r.value?o.value+1:0,i.value,r.value)])]),f("div",{class:"v-data-table-footer__pagination"},[f(D,{icon:e.firstIcon,variant:"plain",onClick:()=>l.value=1,disabled:l.value===1,"aria-label":a(e.firstPageLabel)},null),f(D,{icon:e.prevIcon,variant:"plain",onClick:()=>l.value=Math.max(1,l.value-1),disabled:l.value===1,"aria-label":a(e.prevPageLabel)},null),e.showCurrentPage&&f("span",{key:"page",class:"v-data-table-footer__page"},[l.value]),f(D,{icon:e.nextIcon,variant:"plain",onClick:()=>l.value=Math.min(s.value,l.value+1),disabled:l.value===s.value,"aria-label":a(e.nextPageLabel)},null),f(D,{icon:e.lastIcon,variant:"plain",onClick:()=>l.value=s.value,disabled:l.value===s.value,"aria-label":a(e.lastPageLabel)},null)])])}}}),tt=p({...we({itemValue:"id"})},"v-data-table-item");function at(e,n,t){const a=n.split(".");for(;a.length>1;){const l=a.shift();e[l]==null&&(e[l]={}),typeof e[l]=="object"&&(e=e[l])}e[a[0]]=t}function nt(e,n){const{items:t}=Se(e);return{items:x(()=>t.value.map(l=>({...l,type:"item",columns:n.value.reduce((s,o)=>(at(s,o.key,j(l.raw,o.value??o.key)),s),{})})))}}function lt(e){let{page:n,itemsPerPage:t,sortBy:a,groupBy:l,search:s}=e;const o=ke("VDataTable"),i=x(()=>({page:n.value,itemsPerPage:t.value,sortBy:a.value,groupBy:l.value,search:s.value}));R(()=>s==null?void 0:s.value,()=>{n.value=1});let r=null;R(i,()=>{pe(r,i.value)||(o.emit("update:options",i.value),r=i.value)},{deep:!0,immediate:!0})}const rt=(e,n,t)=>e==null||n==null?-1:e.toString().toLocaleLowerCase().indexOf(n.toString().toLocaleLowerCase()),ot=p({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter");function ut(e,n,t){var i;const a=[],l=(t==null?void 0:t.default)??rt,s=t!=null&&t.filterKeys?Ie(t.filterKeys):!1,o=Object.keys((t==null?void 0:t.customKeyFilter)??{}).length;if(!(e!=null&&e.length))return a;e:for(let r=0;r<e.length;r++){const d=e[r],u={},c={};let g=-1;if(n&&!(t!=null&&t.noFilter)){if(typeof d=="object"){const w=s||Object.keys(d);for(const S of w){const y=j(d,S,d),v=(i=t==null?void 0:t.customKeyFilter)==null?void 0:i[S];if(g=v?v(y,n,d):l(y,n,d),g!==-1&&g!==!1)v?u[S]=g:c[S]=g;else if((t==null?void 0:t.filterMode)==="every")continue e}}else g=l(d,n,d),g!==-1&&g!==!1&&(c.title=g);const h=Object.keys(c).length,b=Object.keys(u).length;if(!h&&!b||(t==null?void 0:t.filterMode)==="union"&&b!==o&&!h||(t==null?void 0:t.filterMode)==="intersection"&&(b!==o||!h))continue}a.push({index:r,matches:{...c,...u}})}return a}function st(e,n,t,a){const l=x(()=>typeof(t==null?void 0:t.value)!="string"&&typeof(t==null?void 0:t.value)!="number"?"":String(t.value)),s=O([]),o=O(new Map);Pe(()=>{s.value=[],o.value=new Map;const r=q(n);ut(r,l.value,{customKeyFilter:e.customKeyFilter,default:e.customFilter,filterKeys:q(a==null?void 0:a.filterKeys)??e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}).forEach(u=>{let{index:c,matches:g}=u;const h=r[c];s.value.push(h),o.value.set(h.value,g)})});function i(r){return o.value.get(r.value)}return{filteredItems:s,filteredMatches:o,getMatches:i}}const it=p({...tt(),...De(),hideNoData:Boolean,hover:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},height:[String,Number],width:[String,Number],fixedHeader:Boolean,fixedFooter:Boolean,"onClick:row":Function,search:String},"v-data-table"),ft=E()({name:"VDataTable",props:{...it(),...We(),...Ae(),...Fe(),..._e(),...Ze(),...ot()},emits:{"update:modelValue":e=>!0,"update:page":e=>!0,"update:itemsPerPage":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:groupBy":e=>!0,"update:expanded":e=>!0},setup(e,n){let{emit:t,slots:a}=n;const{groupBy:l}=Ge(e),{sortBy:s,multiSort:o,mustSort:i}=$e(e),{page:r,itemsPerPage:d}=Qe(e),{columns:u}=Ce(e,{groupBy:l,showSelect:I(e,"showSelect"),showExpand:I(e,"showExpand")}),{items:c}=nt(e,u),g=x(()=>u.value.map(T=>"columns."+T.key)),h=I(e,"search"),{filteredItems:b}=st(e,c,h,{filterKeys:g});Oe({sortBy:s,multiSort:o,mustSort:i,page:r});const{sortByWithGroups:w,opened:S,extractRows:y}=He({groupBy:l,sortBy:s}),{sortedItems:v}=Me(b,w,u),{flatItems:m}=Re(v,l,S),P=x(()=>m.value.length),{startIndex:k,stopIndex:M}=Xe({page:r,itemsPerPage:d,itemsLength:P}),{paginatedItems:N}=qe({items:m,startIndex:k,stopIndex:M,itemsPerPage:d}),V=x(()=>y(N.value));return Be(e,V),je(e),lt({page:r,itemsPerPage:d,sortBy:s,groupBy:l,search:h}),Te({VDataTableRows:{hideNoData:I(e,"hideNoData"),noDataText:I(e,"noDataText")}}),G(()=>f(Ve,{class:["v-data-table",{"v-data-table--show-select":e.showSelect}],fixedHeader:e.fixedHeader,fixedFooter:e.fixedFooter,height:e.height,hover:e.hover},{top:a.top,default:a.default??(()=>{var T,$,L,Y;return f(A,null,[(T=a.colgroup)==null?void 0:T.call(a,{columns:u}),f("thead",null,[f(Le,{sticky:e.fixedHeader,multiSort:e.multiSort},a)]),($=a.thead)==null?void 0:$.call(a),f("tbody",null,[a.body?a.body():f(Ye,{items:N.value,"onClick:row":e["onClick:row"]},a)]),(L=a.tbody)==null?void 0:L.call(a),(Y=a.tfoot)==null?void 0:Y.call(a)])}),bottom:a.bottom??(()=>f(et,null,{prepend:a["footer.prepend"]}))})),{}}});export{ft as V};