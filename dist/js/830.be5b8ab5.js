"use strict";(self["webpackChunkhappy_birthday"]=self["webpackChunkhappy_birthday"]||[]).push([[830],{8830:function(e,t,u){u.r(t),u.d(t,{default:function(){return D}});var c=u(6252);const n={class:"show-cube"};function r(e,t,u,r,s,a){const l=(0,c.up)("cube");return(0,c.wg)(),(0,c.iD)("div",n,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(e.cubeArr,(e=>((0,c.wg)(),(0,c.iD)("div",{key:e.id},[(0,c.Wm)(l,{cubeObj:e},null,8,["cubeObj"])])))),128))])}var s=u(3577),a=u(9963);const l=e=>((0,c.dD)("data-v-67d67396"),e=e(),(0,c.Cn)(),e),i={class:"cube-shell"},b={class:"cube cube1"},d=l((()=>(0,c._)("div",{class:"front"},null,-1))),o=l((()=>(0,c._)("div",{class:"right"},null,-1))),p=l((()=>(0,c._)("div",{class:"up"},null,-1))),m={class:"cube cube2"},h=l((()=>(0,c._)("div",{class:"front"},null,-1))),v=l((()=>(0,c._)("div",{class:"right"},null,-1))),g=l((()=>(0,c._)("div",{class:"up"},null,-1))),_=[h,v,g];function w(e,t,u,n,r,l){return(0,c.wg)(),(0,c.iD)("div",i,[(0,c.wy)((0,c._)("div",{class:"num",style:(0,s.j5)({top:`calc(100px - ${u.cubeObj.percentage}px)`})},[(0,c._)("div",null,(0,s.zw)(u.cubeObj.number),1),(0,c._)("p",null,(0,s.zw)(u.cubeObj.unit),1)],4),[[a.F8,u.cubeObj.percentage||0===u.cubeObj.percentage]]),(0,c._)("div",{class:"container",style:(0,s.j5)(l.cssVars)},[(0,c._)("div",b,[d,o,p,(0,c.wy)((0,c._)("div",m,_,512),[[a.F8,e.showSmallCube]])])],4)])}var j={name:"cube",data:()=>({showSmallCube:!1}),props:{defaultNum:{type:Number,default:100},cubeObj:{type:Object,default:{unit:"人",color:"transparent",number:0,percentage:0,title:"",introduce:""}}},computed:{cssVars(){let{color:e,percentage:t}=this.cubeObj;this.showSmallCube=t,t||(t=.01),this.cubeObj.percentage=t;const u=""+(50+1.05*(100-t));return{"--startHeight":200-u+"px","--top":`${u}px`,"--status":t?"running":"paused","--percentageNum":""+t/100,"--color":e}}},mounted(){},methods:{}},f=u(3744);const O=(0,f.Z)(j,[["render",w],["__scopeId","data-v-67d67396"]]);var y=O,C={name:"showCube",components:{cube:y},data:()=>({cubeObj:{},cubeArr:[]}),computed:{},mounted(){setTimeout((()=>{this.cubeArr=[{id:1,unit:"人",color:"0, 255, 243",number:77,percentage:40,title:"字段名1",introduce:"字段名介绍111"},{id:2,unit:"人",color:"33, 147, 255",number:100,percentage:70,title:"字段名2",introduce:"字段名介绍222"},{id:3,unit:"人",color:"254, 224, 102",number:0,percentage:0,title:"字段名3",introduce:"字段名介绍333"}]}),500)},methods:{}};const k=(0,f.Z)(C,[["render",r],["__scopeId","data-v-4345dc98"]]);var D=k}}]);
//# sourceMappingURL=830.be5b8ab5.js.map