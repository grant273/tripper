(this.webpackJsonptripper=this.webpackJsonptripper||[]).push([[0],{82:function(e,t,a){e.exports=a(93)},87:function(e,t,a){},88:function(e,t,a){},93:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(9),o=a.n(r),l=(a(87),a(53)),s=a(14),c=a(23),d=a(33),u=a(34),m=a(37),p=a(38),h=(a(88),a(133)),f=a(130),g=a(48),b=a.n(g),E=a(68),v=a.n(E),S=a(70),O=a.n(S),C=a(132),N=a(66),y=a.n(N),j=a(55),w=a.n(j),k=a(69),I=a.n(k),T=a(131),B=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).onUpgradeStatus=function(e){var t;switch(n.props.status){case"notNeeded":t="needed";break;case"needed":t="thisTrip";break;default:throw new Error("Cannot upgrade status of item")}n.props.onChangeStatus&&n.props.onChangeStatus(e,n.props.item,n.props.status,t)},n.onDowngradeStatus=function(e){var t;switch(n.props.status){case"thisTrip":t="needed";break;case"needed":t="notNeeded";break;case"notNeeded":t="deleted";break;default:throw new Error("Cannot downgrade status of item")}n.props.onChangeStatus&&n.props.onChangeStatus(e,n.props.item,n.props.status,t)},n.editModeOn=function(e){n.setState({editing:!0})},n.onSetNotNeeded=function(e){n.props.onChangeStatus&&n.props.onChangeStatus(e,n.props.item,n.props.status,"notNeeded")},n.onTitleEdited=function(e){console.log("SUBMIT"),n.setState({editing:!1}),n.props.onChangeItemTitle&&n.props.onChangeItemTitle(e,n.props.item,n.props.status,e.target.value)},n.state={editing:!1},n}return Object(u.a)(a,[{key:"render",value:function(){var e,t=this,a=this.props.item.bundle?"".concat(this.props.item.bundle):void 0,n=this.props.item.items?i.a.createElement(y.a,null):void 0,r=i.a.createElement(f.a,null,i.a.createElement(b.a,{fontSize:"large",onClick:this.onUpgradeStatus})),o=["needed","thisTrip"].includes(this.props.status)||!this.props.item.bundle,l=i.a.createElement(f.a,null,i.a.createElement(v.a,{onClick:this.onSetNotNeeded})),s=i.a.createElement(T.a,null,this.state.editing?i.a.createElement(C.a,{edge:"end","aria-label":"comments",onClick:function(){}},i.a.createElement(I.a,null)):i.a.createElement(C.a,{edge:"end","aria-label":"comments",onClick:this.editModeOn},i.a.createElement(w.a,null)),o&&i.a.createElement(C.a,{edge:"end","aria-label":"comments",onClick:this.onDowngradeStatus},i.a.createElement(O.a,null)));T.a,this.editModeOn,C.a,w.a;return e=this.state.editing?i.a.createElement("input",{type:"text",defaultValue:this.props.item.title,onBlur:this.onTitleEdited,autoFocus:!0}):i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"tripper-list-item-title"},this.props.item.title," ",n),a&&i.a.createElement("div",{className:"tripper-list-item-subtitle"},"- In\xa0",i.a.createElement("span",{className:"tripper-list-item-subtitle-bundle-name"},a))),i.a.createElement(h.a,{disableGutters:!0,onMouseDown:function(e){"notNeeded"!==t.props.status||t.state.editing||t.onUpgradeStatus(e)}},["notNeeded","needed"].includes(this.props.status)&&r,["needed","thisTrip"].includes(this.props.status)&&l,i.a.createElement("div",{className:"tripper-list-item-content"},e),s)}}]),a}(n.Component),A=a(138),M=a(145),R=a(135),D=a(136),x=a(142),U=a(140),F=a(141),J=a(137),W=a(147),z=a(139),G=a(144),q=a(146),V=a(71),H=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).onChangeSubItem=function(e,t){0===n.state.items.length?n.setState({items:[{title:e.target.value}]}):t===n.state.items.length?n.setState({items:[].concat(Object(s.a)(n.state.items),[{title:e.target.value}])}):n.setState({items:n.state.items.map((function(a,n){return t===n?{title:e.target.value}:a}))})},n.onSubmit=function(e){e.preventDefault();var t=Object.assign({},n.state);n.setState({title:""}),"grocery"===t.type?delete t.items:t.items=t.items.filter((function(e){return e.title})),delete t.type,n.setState({title:"",items:[]}),n.props.onAdd(e,t),n.setState({popOverAnchorEl:n.addBtnRef.current},(function(){setTimeout((function(){return n.setState({popOverAnchorEl:null})}),500),n.titleRef.current.focus()}))},n.state={type:"grocery",title:"",items:[]},n.titleRef=i.a.createRef(),n.addBtnRef=i.a.createRef(),n}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return i.a.createElement(M.a,{open:this.props.open,onClose:this.props.onClose,"aria-labelledby":"form-dialog-title"},i.a.createElement("form",{onSubmit:this.onSubmit},i.a.createElement(R.a,{id:"form-dialog-title"},"Add a New Item"),i.a.createElement(D.a,null,i.a.createElement(x.a,{required:!0,inputRef:this.titleRef,margin:"dense",id:"name",value:this.state.title,onChange:function(t){e.setState({title:t.target.value})},label:"Item Name",type:"text",fullWidth:!0}),i.a.createElement(J.a,null,i.a.createElement(W.a,{row:!0,"aria-label":"position",name:"position",onChange:function(t){return e.setState({type:t.target.value})},defaultValue:"grocery"},i.a.createElement(z.a,{value:"grocery",control:i.a.createElement(G.a,{color:"primary"}),label:"Grocery"}),i.a.createElement(z.a,{value:"bundle",control:i.a.createElement(G.a,{color:"primary"}),label:"Bundle"}))),"bundle"===this.state.type&&[].concat(Object(s.a)(this.state.items),[{title:""}]).map((function(t,a){return i.a.createElement(x.a,{key:a,required:0===a,margin:"dense",id:"name",value:t.title,onChange:function(t){return e.onChangeSubItem(t,a)},label:0===a?"First Bundle Item":"Next Item (optional)",fullWidth:!0})}))),i.a.createElement(U.a,null,i.a.createElement(F.a,{onClick:this.props.onClose,color:"primary"},"Done"),i.a.createElement(F.a,{ref:this.addBtnRef,type:"submit",color:"primary"},"Add"),i.a.createElement(q.a,{open:Boolean(this.state.popOverAnchorEl),anchorEl:this.state.popOverAnchorEl,anchorOrigin:{vertical:"top",horizontal:"center"},transformOrigin:{vertical:"bottom",horizontal:"right"}},i.a.createElement(V.a,{className:"addItemPopover"},"Added! Click Done when finished")))))}}]),a}(n.Component);function P(e){return{notNeeded:0,needed:1,thisTrip:2}[e]}var $=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).changeItemTitle=function(e,t,a,i){var r=n.state[a].map((function(e){return e.id===t.id?(e.title=i,e):e}));n.setState(Object(c.a)({},a,r))},n.changeStatus=function(e,t,a,i){if("deleted"!==i)if("items"in t){var r;n.setState((r={},Object(c.a)(r,a,n.state[a].filter((function(e){return e!==t}))),Object(c.a)(r,i,[].concat(Object(s.a)(n.state[i]),Object(s.a)(t.items.map((function(e){return Object(l.a)({},e,{bundle:t.title})}))))),Object(c.a)(r,"activeBundles",[].concat(Object(s.a)(n.state.activeBundles),[{title:t.title,length:t.items.length}])),r))}else{var o=Object(l.a)({},n.state,Object(c.a)({},a,n.state[a].filter((function(e){return e!==t}))));if(P(i)<P(a)?o[i]=[t].concat(Object(s.a)(n.state[i])):o[i]=[].concat(Object(s.a)(n.state[i]),[t]),"notNeeded"===i&&"bundle"in t){var d=n.state.activeBundles.find((function(e){return e.title===t.bundle}));if(o.notNeeded.filter((function(e){return e.bundle===d.title})).length===d.length){var u=o.notNeeded.filter((function(e){return e.bundle===d.title})),m={title:d.title,items:u};o=Object(l.a)({},o,{activeBundles:o.activeBundles.filter((function(e){return e!==d})),notNeeded:[m].concat(Object(s.a)(o.notNeeded.filter((function(e){return e.bundle!==d.title}))))})}}"notNeeded"===i&&o[i].sort((function(e,t){return e.title>t.title?1:-1})),n.setState(o)}else window.confirm("Are you sure you want to permanently delete ".concat(t.title))&&n.setState({notNeeded:n.state.notNeeded.filter((function(e){return e!==t}))})},n.onAdd=function(e,t){n.setState({notNeeded:[].concat(Object(s.a)(n.state.notNeeded),[t])})},n.showInputModal=function(e){n.setState({showAddModal:!0})},n.state=JSON.parse(localStorage.getItem("appState")),null==n.state&&(n.state={showAddModal:!1,notNeeded:[{id:11,title:"Buffalo Dip",items:[{id:1,title:"Cream Cheese Block 2x"},{id:2,title:"Franks Red Hot"},{id:3,title:"Ranch"}]},{id:5,title:"Bagels"}],needed:[{id:4,title:"Ground Beef"}],activeBundles:[],thisTrip:[]}),n}return Object(u.a)(a,[{key:"componentDidUpdate",value:function(e,t,a){localStorage.setItem("appState",JSON.stringify(this.state))}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement(H,{open:this.state.showAddModal,onClose:function(){e.setState({showAddModal:!1})},onAdd:this.onAdd}),i.a.createElement("h1",null,"This Trip"),i.a.createElement(A.a,null,this.state.thisTrip.map((function(t){return i.a.createElement(B,{key:t.id,item:t,status:"thisTrip",onChangeStatus:e.changeStatus,onChangeItemTitle:e.changeItemTitle})}))),i.a.createElement("h1",null,"Needed"),i.a.createElement(A.a,null,this.state.needed.map((function(t){return i.a.createElement(B,{key:t.id,item:t,status:"needed",onChangeStatus:e.changeStatus,onChangeItemTitle:e.changeItemTitle})}))),i.a.createElement("h1",{className:"category-header"},"Not Needed",i.a.createElement(b.a,{onClick:this.showInputModal})),i.a.createElement(A.a,null,this.state.notNeeded.map((function(t){return i.a.createElement(B,{key:t.id,item:t,status:"notNeeded",onChangeStatus:e.changeStatus,onChangeItemTitle:e.changeItemTitle})}))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement($,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[82,1,2]]]);
//# sourceMappingURL=main.384082f6.chunk.js.map