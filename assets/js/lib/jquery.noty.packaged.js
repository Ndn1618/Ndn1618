!function(t,o){"function"==typeof define&&define.amd?define(["jquery"],o):"object"==typeof exports?module.exports=o(require("jquery")):o(t.jQuery)}(this,function(t){"function"!=typeof Object.create&&(Object.create=function(t){function o(){}return o.prototype=t,new o});var o={init:function(o){if(this.options=t.extend({},t.noty.defaults,o),this.options.layout=this.options.custom?t.noty.layouts.inline:t.noty.layouts[this.options.layout],t.noty.themes[this.options.theme]?(this.options.theme=t.noty.themes[this.options.theme],this.options.theme.template&&(this.options.template=this.options.theme.template),this.options.theme.animation&&(this.options.animation=this.options.theme.animation)):this.options.themeClassName=this.options.theme,this.options=t.extend({},this.options,this.options.layout.options),this.options.id){if(t.noty.store[this.options.id])return t.noty.store[this.options.id]}else this.options.id="noty_"+(new Date).getTime()*Math.floor(1e6*Math.random());return this._build(),this},_build:function(){var o=t('<div class="noty_bar noty_type_'+this.options.type+'"></div>').attr("id",this.options.id);if(o.append(this.options.template).find(".noty_text").html(this.options.text),this.$bar=null!==this.options.layout.parent.object?t(this.options.layout.parent.object).css(this.options.layout.parent.css).append(o):o,this.options.themeClassName&&this.$bar.addClass(this.options.themeClassName).addClass("noty_container_type_"+this.options.type),this.options.buttons){var e;this.$bar.find(".noty_buttons").length>0?e=this.$bar.find(".noty_buttons"):(e=t("<div/>").addClass("noty_buttons"),null!==this.options.layout.parent.object?this.$bar.find(".noty_bar").append(e):this.$bar.append(e));var s=this;t.each(this.options.buttons,function(o,i){var n=t("<button/>").addClass(i.addClass?i.addClass:"gray").html(i.text).attr("id",i.id?i.id:"button-"+o).attr("title",i.title).appendTo(e).on("click",function(o){t.isFunction(i.onClick)&&i.onClick.call(n,s,o)})})}else this.$bar.find(".noty_buttons").remove();if(this.options.progressBar&&this.options.timeout){var i=t("<div/>").addClass("noty_progress_bar");null!==this.options.layout.parent.object?this.$bar.find(".noty_bar").append(i):this.$bar.append(i)}this.$message=this.$bar.find(".noty_message"),this.$closeButton=this.$bar.find(".noty_close"),this.$buttons=this.$bar.find(".noty_buttons"),this.$progressBar=this.$bar.find(".noty_progress_bar"),t.noty.store[this.options.id]=this},show:function(){var o=this;return o.options.custom?o.options.custom.find(o.options.layout.container.selector).append(o.$bar):t(o.options.layout.container.selector).append(o.$bar),o.options.theme&&o.options.theme.style&&o.options.theme.style.apply(o),"function"===t.type(o.options.layout.css)?this.options.layout.css.apply(o.$bar):o.$bar.css(this.options.layout.css||{}),o.$bar.addClass(o.options.layout.addClass),o.options.layout.container.style.apply(t(o.options.layout.container.selector),[o.options.within]),o.showing=!0,o.options.theme&&o.options.theme.style&&o.options.theme.callback.onShow.apply(this),t.inArray("click",o.options.closeWith)>-1&&o.$bar.css("cursor","pointer").on("click",function(t){o.stopPropagation(t),o.options.callback.onCloseClick&&o.options.callback.onCloseClick.apply(o),o.close()}),t.inArray("hover",o.options.closeWith)>-1&&o.$bar.one("mouseenter",function(){o.close()}),t.inArray("button",o.options.closeWith)>-1&&o.$closeButton.one("click",function(t){o.stopPropagation(t),o.close()}),-1==t.inArray("button",o.options.closeWith)&&o.$closeButton.remove(),o.options.callback.beforeShow&&o.options.callback.beforeShow.apply(o),"string"==typeof o.options.animation.open?(o.animationTypeOpen="css",o.$bar.css("min-height",o.$bar.innerHeight()),o.$bar.on("click",function(t){o.wasClicked=!0}),o.$bar.show(),o.options.callback.onShow&&o.options.callback.onShow.apply(o),o.$bar.addClass(o.options.animation.open).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){o.options.callback.afterShow&&o.options.callback.afterShow.apply(o),o.showing=!1,o.shown=!0,o.bindTimeout(),o.hasOwnProperty("wasClicked")&&(o.$bar.off("click",function(t){o.wasClicked=!0}),o.close())})):"object"==typeof o.options.animation.open&&null==o.options.animation.open?(o.animationTypeOpen="none",o.showing=!1,o.shown=!0,o.$bar.show(),o.bindTimeout(),o.options.callback.onShow&&o.options.callback.onShow.apply(o),o.$bar.queue(function(){o.options.callback.afterShow&&o.options.callback.afterShow.apply(o)})):(o.animationTypeOpen="anim",o.options.callback.onShow&&o.options.callback.onShow.apply(o),o.$bar.animate(o.options.animation.open,o.options.animation.speed,o.options.animation.easing,function(){o.options.callback.afterShow&&o.options.callback.afterShow.apply(o),o.showing=!1,o.shown=!0,o.bindTimeout()})),this},bindTimeout:function(){this.options.timeout&&(this.options.progressBar&&this.$progressBar&&this.$progressBar.css({transition:"all "+this.options.timeout+"ms linear",width:"0%"}),this.queueClose(this.options.timeout),this.$bar.on("mouseenter",this.dequeueClose.bind(this)),this.$bar.on("mouseleave",this.queueClose.bind(this,this.options.timeout)))},dequeueClose:function(){this.options.progressBar&&this.$progressBar.css({transition:"none",width:"100%"}),this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null)},queueClose:function(t){var o=this;if(o.options.progressBar&&o.$progressBar.css({transition:"all "+o.options.timeout+"ms linear",width:"0%"}),!this.closeTimer)return o.closeTimer=window.setTimeout(function(){o.close()},t),o.closeTimer},close:function(){if(this.$progressBar&&this.$progressBar.remove(),this.closeTimer&&this.dequeueClose(),!(this.closed||this.$bar&&this.$bar.hasClass("i-am-closing-now"))){var o=this;if(!this.showing||"anim"!=this.animationTypeOpen&&"none"!=this.animationTypeOpen){if(this.showing&&"css"==this.animationTypeOpen&&o.$bar.on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){o.close()}),!this.shown&&!this.showing){var e=[];return t.each(t.noty.queue,function(t,s){s.options.id!=o.options.id&&e.push(s)}),void(t.noty.queue=e)}o.$bar.addClass("i-am-closing-now"),o.options.callback.onClose&&o.options.callback.onClose.apply(o),"string"==typeof o.options.animation.close?o.$bar.removeClass(o.options.animation.open).addClass(o.options.animation.close).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){o.options.callback.afterClose&&o.options.callback.afterClose.apply(o),o.closeCleanUp()}):"object"==typeof o.options.animation.close&&null==o.options.animation.close?o.$bar.dequeue().hide(0,function(){o.options.callback.afterClose&&o.options.callback.afterClose.apply(o),o.closeCleanUp()}):o.$bar.clearQueue().stop().animate(o.options.animation.close,o.options.animation.speed,o.options.animation.easing,function(){o.options.callback.afterClose&&o.options.callback.afterClose.apply(o)}).promise().done(function(){o.closeCleanUp()})}else o.$bar.queue(function(){o.close.apply(o)})}},closeCleanUp:function(){var o=this;o.options.modal&&(t.notyRenderer.setModalCount(-1),0!=t.notyRenderer.getModalCount()||t.noty.queue.length||t(".noty_modal").fadeOut(o.options.animation.fadeSpeed,function(){t(this).remove()})),t.notyRenderer.setLayoutCountFor(o,-1),0==t.notyRenderer.getLayoutCountFor(o)&&t(o.options.layout.container.selector).remove(),void 0!==o.$bar&&null!==o.$bar?"string"==typeof o.options.animation.close?(o.$bar.css("transition","all 10ms ease").css("border",0).css("margin",0).height(0),o.$bar.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){o.$bar.remove(),o.$bar=null,o.closed=!0,o.options.theme.callback&&o.options.theme.callback.onClose&&o.options.theme.callback.onClose.apply(o),o.handleNext()})):(o.$bar.remove(),o.$bar=null,o.closed=!0,o.handleNext()):o.handleNext()},handleNext:function(){delete t.noty.store[this.options.id],this.options.theme.callback&&this.options.theme.callback.onClose&&this.options.theme.callback.onClose.apply(this),this.options.dismissQueue||(t.noty.ontap=!0,t.notyRenderer.render()),this.options.maxVisible>0&&this.options.dismissQueue&&t.notyRenderer.render()},setText:function(t){return this.closed||(this.options.text=t,this.$bar.find(".noty_text").html(t)),this},setType:function(t){return this.closed||(this.options.type=t,this.options.theme.style.apply(this),this.options.theme.callback.onShow.apply(this)),this},setTimeout:function(t){if(!this.closed){var o=this;this.options.timeout=t,o.$bar.delay(o.options.timeout).promise().done(function(){o.close()})}return this},stopPropagation:function(t){void 0!==(t=t||window.event).stopPropagation?t.stopPropagation():t.cancelBubble=!0},closed:!1,showing:!1,shown:!1};t.notyRenderer={},t.notyRenderer.init=function(e){var s=Object.create(o).init(e);return s.options.killer&&t.noty.closeAll(),s.options.force?t.noty.queue.unshift(s):t.noty.queue.push(s),t.notyRenderer.render(),"object"==t.noty.returns?s:s.options.id},t.notyRenderer.render=function(){var o=t.noty.queue[0];"object"===t.type(o)?o.options.dismissQueue?o.options.maxVisible>0?t(o.options.layout.container.selector+" > li").length<o.options.maxVisible&&t.notyRenderer.show(t.noty.queue.shift()):t.notyRenderer.show(t.noty.queue.shift()):t.noty.ontap&&(t.notyRenderer.show(t.noty.queue.shift()),t.noty.ontap=!1):t.noty.ontap=!0},t.notyRenderer.show=function(o){o.options.modal&&(t.notyRenderer.createModalFor(o),t.notyRenderer.setModalCount(1)),o.options.custom?0==o.options.custom.find(o.options.layout.container.selector).length?o.options.custom.append(t(o.options.layout.container.object).addClass("i-am-new")):o.options.custom.find(o.options.layout.container.selector).removeClass("i-am-new"):0==t(o.options.layout.container.selector).length?t("body").append(t(o.options.layout.container.object).addClass("i-am-new")):t(o.options.layout.container.selector).removeClass("i-am-new"),t.notyRenderer.setLayoutCountFor(o,1),o.show()},t.notyRenderer.createModalFor=function(o){if(0==t(".noty_modal").length){var e=t("<div/>").addClass("noty_modal").addClass(o.options.theme).data("noty_modal_count",0);o.options.theme.modal&&o.options.theme.modal.css&&e.css(o.options.theme.modal.css),e.prependTo(t("body")).fadeIn(o.options.animation.fadeSpeed),t.inArray("backdrop",o.options.closeWith)>-1&&e.on("click",function(){t.noty.closeAll()})}},t.notyRenderer.getLayoutCountFor=function(o){return t(o.options.layout.container.selector).data("noty_layout_count")||0},t.notyRenderer.setLayoutCountFor=function(o,e){return t(o.options.layout.container.selector).data("noty_layout_count",t.notyRenderer.getLayoutCountFor(o)+e)},t.notyRenderer.getModalCount=function(){return t(".noty_modal").data("noty_modal_count")||0},t.notyRenderer.setModalCount=function(o){return t(".noty_modal").data("noty_modal_count",t.notyRenderer.getModalCount()+o)},t.fn.noty=function(o){return o.custom=t(this),t.notyRenderer.init(o)},t.noty={},t.noty.queue=[],t.noty.ontap=!0,t.noty.layouts={},t.noty.themes={},t.noty.returns="object",t.noty.store={},t.noty.get=function(o){return!!t.noty.store.hasOwnProperty(o)&&t.noty.store[o]},t.noty.close=function(o){return!!t.noty.get(o)&&t.noty.get(o).close()},t.noty.setText=function(o,e){return!!t.noty.get(o)&&t.noty.get(o).setText(e)},t.noty.setType=function(o,e){return!!t.noty.get(o)&&t.noty.get(o).setType(e)},t.noty.clearQueue=function(){t.noty.queue=[]},t.noty.closeAll=function(){t.noty.clearQueue(),t.each(t.noty.store,function(t,o){o.close()})};var e=window.alert;return t.noty.consumeAlert=function(o){window.alert=function(e){o?o.text=e:o={text:e},t.notyRenderer.init(o)}},t.noty.stopConsumeAlert=function(){window.alert=e},t.noty.defaults={layout:"topRight",theme:"relax",type:"alert",text:"",progressBar:!1,dismissQueue:!0,template:'<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',animation:{open:{height:"toggle"},close:{height:"toggle"},easing:"swing",speed:500,fadeSpeed:"fast"},timeout:!1,force:!1,modal:!1,maxVisible:5,killer:!1,closeWith:["click"],callback:{beforeShow:function(){},onShow:function(){},afterShow:function(){},onClose:function(){},afterClose:function(){},onCloseClick:function(){}},buttons:!1},t(window).on("resize",function(){t.each(t.noty.layouts,function(o,e){e.container.style.apply(t(e.container.selector))})}),window.noty=function(o){return t.notyRenderer.init(o)},t.noty.layouts.bottom={name:"bottom",options:{},container:{object:'<ul id="noty_bottom_layout_container" />',selector:"ul#noty_bottom_layout_container",style:function(){t(this).css({bottom:0,left:"5%",position:"fixed",width:"90%",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:9999999})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none"},addClass:""},t.noty.layouts.bottomCenter={name:"bottomCenter",options:{},container:{object:'<ul id="noty_bottomCenter_layout_container" />',selector:"ul#noty_bottomCenter_layout_container",style:function(){t(this).css({bottom:20,left:0,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),t(this).css({left:(t(window).width()-t(this).outerWidth(!1))/2+"px"})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.bottomLeft={name:"bottomLeft",options:{},container:{object:'<ul id="noty_bottomLeft_layout_container" />',selector:"ul#noty_bottomLeft_layout_container",style:function(){t(this).css({bottom:20,left:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&t(this).css({left:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.bottomRight={name:"bottomRight",options:{},container:{object:'<ul id="noty_bottomRight_layout_container" />',selector:"ul#noty_bottomRight_layout_container",style:function(){t(this).css({bottom:20,right:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&t(this).css({right:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.center={name:"center",options:{},container:{object:'<ul id="noty_center_layout_container" />',selector:"ul#noty_center_layout_container",style:function(){t(this).css({position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7});var o=t(this).clone().css({visibility:"hidden",display:"block",position:"absolute",top:0,left:0}).attr("id","dupe");t("body").append(o),o.find(".i-am-closing-now").remove(),o.find("li").css("display","block");var e=o.height();o.remove(),t(this).hasClass("i-am-new")?t(this).css({left:(t(window).width()-t(this).outerWidth(!1))/2+"px",top:(t(window).height()-e)/2+"px"}):t(this).animate({left:(t(window).width()-t(this).outerWidth(!1))/2+"px",top:(t(window).height()-e)/2+"px"},500)}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.centerLeft={name:"centerLeft",options:{},container:{object:'<ul id="noty_centerLeft_layout_container" />',selector:"ul#noty_centerLeft_layout_container",style:function(){t(this).css({left:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7});var o=t(this).clone().css({visibility:"hidden",display:"block",position:"absolute",top:0,left:0}).attr("id","dupe");t("body").append(o),o.find(".i-am-closing-now").remove(),o.find("li").css("display","block");var e=o.height();o.remove(),t(this).hasClass("i-am-new")?t(this).css({top:(t(window).height()-e)/2+"px"}):t(this).animate({top:(t(window).height()-e)/2+"px"},500),window.innerWidth<600&&t(this).css({left:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.centerRight={name:"centerRight",options:{},container:{object:'<ul id="noty_centerRight_layout_container" />',selector:"ul#noty_centerRight_layout_container",style:function(){t(this).css({right:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7});var o=t(this).clone().css({visibility:"hidden",display:"block",position:"absolute",top:0,left:0}).attr("id","dupe");t("body").append(o),o.find(".i-am-closing-now").remove(),o.find("li").css("display","block");var e=o.height();o.remove(),t(this).hasClass("i-am-new")?t(this).css({top:(t(window).height()-e)/2+"px"}):t(this).animate({top:(t(window).height()-e)/2+"px"},500),window.innerWidth<600&&t(this).css({right:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.inline={name:"inline",options:{},container:{object:'<ul class="noty_inline_layout_container" />',selector:"ul.noty_inline_layout_container",style:function(){t(this).css({width:"100%",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:9999999})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none"},addClass:""},t.noty.layouts.top={name:"top",options:{},container:{object:'<ul id="noty_top_layout_container" />',selector:"ul#noty_top_layout_container",style:function(){t(this).css({top:0,left:"5%",position:"fixed",width:"90%",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:9999999})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none"},addClass:""},t.noty.layouts.topCenter={name:"topCenter",options:{},container:{object:'<ul id="noty_topCenter_layout_container" />',selector:"ul#noty_topCenter_layout_container",style:function(){t(this).css({top:20,left:0,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),t(this).css({left:(t(window).width()-t(this).outerWidth(!1))/2+"px"})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.topLeft={name:"topLeft",options:{},container:{object:'<ul id="noty_topLeft_layout_container" />',selector:"ul#noty_topLeft_layout_container",style:function(){t(this).css({top:20,left:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&t(this).css({left:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.layouts.topRight={name:"topRight",options:{},container:{object:'<ul id="noty_topRight_layout_container" />',selector:"ul#noty_topRight_layout_container",style:function(){t(this).css({top:20,right:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&t(this).css({right:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},t.noty.themes.bootstrapTheme={name:"bootstrapTheme",modal:{css:{position:"fixed",width:"100%",height:"100%",backgroundColor:"#000",zIndex:1e4,opacity:.6,display:"none",left:0,top:0,wordBreak:"break-all"}},style:function(){var o=this.options.layout.container.selector;switch(t(o).addClass("list-group"),this.$closeButton.append('<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>'),this.$closeButton.addClass("close"),this.$bar.addClass("list-group-item").css("padding","0px").css("position","relative"),this.$progressBar.css({position:"absolute",left:0,bottom:0,height:4,width:"100%",backgroundColor:"#000000",opacity:.2,"-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)",filter:"alpha(opacity=20)"}),this.options.type){case"alert":case"notification":this.$bar.addClass("list-group-item-info");break;case"warning":this.$bar.addClass("list-group-item-warning");break;case"error":this.$bar.addClass("list-group-item-danger");break;case"information":this.$bar.addClass("list-group-item-info");break;case"success":this.$bar.addClass("list-group-item-success")}this.$message.css({textAlign:"center",padding:"8px 10px 9px",width:"auto",position:"relative"})},callback:{onShow:function(){},onClose:function(){}}},t.noty.themes.defaultTheme={name:"defaultTheme",helpers:{borderFix:function(){if(this.options.dismissQueue){var o=this.options.layout.container.selector+" "+this.options.layout.parent.selector;switch(this.options.layout.name){case"top":t(o).css({borderRadius:"0px 0px 0px 0px"}),t(o).last().css({borderRadius:"0px 0px 5px 5px"});break;case"topCenter":case"topLeft":case"topRight":case"bottomCenter":case"bottomLeft":case"bottomRight":case"center":case"centerLeft":case"centerRight":case"inline":t(o).css({borderRadius:"0px 0px 0px 0px"}),t(o).first().css({"border-top-left-radius":"5px","border-top-right-radius":"5px"}),t(o).last().css({"border-bottom-left-radius":"5px","border-bottom-right-radius":"5px"});break;case"bottom":t(o).css({borderRadius:"0px 0px 0px 0px"}),t(o).first().css({borderRadius:"5px 5px 0px 0px"})}}}},modal:{css:{position:"fixed",width:"100%",height:"100%",backgroundColor:"#000",zIndex:1e4,opacity:.6,display:"none",left:0,top:0}},style:function(){switch(this.$bar.css({overflow:"hidden",background:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAQAAAClM0ndAAAAhklEQVR4AdXO0QrCMBBE0bttkk38/w8WRERpdyjzVOc+HxhIHqJGMQcFFkpYRQotLLSw0IJ5aBdovruMYDA/kT8plF9ZKLFQcgF18hDj1SbQOMlCA4kao0iiXmah7qBWPdxpohsgVZyj7e5I9KcID+EhiDI5gxBYKLBQYKHAQoGFAoEks/YEGHYKB7hFxf0AAAAASUVORK5CYII=') repeat-x scroll left top #fff",position:"relative"}),this.$progressBar.css({position:"absolute",left:0,bottom:0,height:4,width:"100%",backgroundColor:"#000000",opacity:.2,"-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)",filter:"alpha(opacity=20)"}),this.$message.css({textAlign:"center",padding:"8px 10px 9px",width:"auto",position:"relative"}),this.$closeButton.css({position:"absolute",top:4,right:4,width:10,height:10,background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",display:"none",cursor:"pointer"}),this.$buttons.css({padding:5,textAlign:"right",borderTop:"1px solid #ccc",backgroundColor:"#fff"}),this.$buttons.find("button").css({marginLeft:5}),this.$buttons.find("button:first").css({marginLeft:0}),this.$bar.on({mouseenter:function(){t(this).find(".noty_close").stop().fadeTo("normal",1)},mouseleave:function(){t(this).find(".noty_close").stop().fadeTo("normal",0)}}),this.options.layout.name){case"top":this.$bar.css({borderRadius:"0px 0px 5px 5px",borderBottom:"2px solid #eee",borderLeft:"2px solid #eee",borderRight:"2px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});break;case"topCenter":case"center":case"bottomCenter":case"inline":this.$bar.css({borderRadius:"5px",border:"1px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"}),this.$message.css({textAlign:"center"});break;case"topLeft":case"topRight":case"bottomLeft":case"bottomRight":case"centerLeft":case"centerRight":this.$bar.css({borderRadius:"5px",border:"1px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"}),this.$message.css({textAlign:"left"});break;case"bottom":this.$bar.css({borderRadius:"5px 5px 0px 0px",borderTop:"2px solid #eee",borderLeft:"2px solid #eee",borderRight:"2px solid #eee",boxShadow:"0 -2px 4px rgba(0, 0, 0, 0.1)"});break;default:this.$bar.css({border:"2px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"})}switch(this.options.type){case"alert":case"notification":this.$bar.css({backgroundColor:"#FFF",borderColor:"#CCC",color:"#444"});break;case"warning":this.$bar.css({backgroundColor:"#FFEAA8",borderColor:"#FFC237",color:"#826200"}),this.$buttons.css({borderTop:"1px solid #FFC237"});break;case"error":this.$bar.css({backgroundColor:"red",borderColor:"darkred",color:"#FFF"}),this.$message.css({fontWeight:"bold"}),this.$buttons.css({borderTop:"1px solid darkred"});break;case"information":this.$bar.css({backgroundColor:"#57B7E2",borderColor:"#0B90C4",color:"#FFF"}),this.$buttons.css({borderTop:"1px solid #0B90C4"});break;case"success":this.$bar.css({backgroundColor:"lightgreen",borderColor:"#50C24E",color:"darkgreen"}),this.$buttons.css({borderTop:"1px solid #50C24E"});break;default:this.$bar.css({backgroundColor:"#FFF",borderColor:"#CCC",color:"#444"})}},callback:{onShow:function(){t.noty.themes.defaultTheme.helpers.borderFix.apply(this)},onClose:function(){t.noty.themes.defaultTheme.helpers.borderFix.apply(this)}}},t.noty.themes.metroui={name:"metroui",helpers:{},modal:{css:{position:"fixed",width:"100%",height:"100%",backgroundColor:"#000",zIndex:1e4,opacity:.6,display:"none",left:0,top:0}},style:function(){switch(this.$bar.css({overflow:"hidden",margin:"4px 0",borderRadius:"0",position:"relative"}),this.$progressBar.css({position:"absolute",left:0,bottom:0,height:4,width:"100%",backgroundColor:"#000000",opacity:.2,"-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)",filter:"alpha(opacity=20)"}),this.$message.css({textAlign:"center",padding:"1.25rem",width:"auto",position:"relative"}),this.$closeButton.css({position:"absolute",top:".25rem",right:".25rem",width:10,height:10,background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",display:"none",cursor:"pointer"}),this.$buttons.css({padding:5,textAlign:"right",borderTop:"1px solid #ccc",backgroundColor:"#fff"}),this.$buttons.find("button").css({marginLeft:5}),this.$buttons.find("button:first").css({marginLeft:0}),this.$bar.on({mouseenter:function(){t(this).find(".noty_close").stop().fadeTo("normal",1)},mouseleave:function(){t(this).find(".noty_close").stop().fadeTo("normal",0)}}),this.options.layout.name){case"top":this.$bar.css({border:"none",boxShadow:"0 0 5px 0 rgba(0, 0, 0, 0.3)"});break;case"topCenter":case"center":case"bottomCenter":case"inline":this.$bar.css({border:"none",boxShadow:"0 0 5px 0 rgba(0, 0, 0, 0.3)"}),this.$message.css({textAlign:"center"});break;case"topLeft":case"topRight":case"bottomLeft":case"bottomRight":case"centerLeft":case"centerRight":this.$bar.css({border:"none",boxShadow:"0 0 5px 0 rgba(0, 0, 0, 0.3)"}),this.$message.css({textAlign:"left"});break;case"bottom":default:this.$bar.css({border:"none",boxShadow:"0 0 5px 0 rgba(0, 0, 0, 0.3)"})}switch(this.options.type){case"alert":case"notification":this.$bar.css({backgroundColor:"#fff",border:"none",color:"#1d1d1d"});break;case"warning":this.$bar.css({backgroundColor:"#FA6800",border:"none",color:"#fff"}),this.$buttons.css({borderTop:"1px solid #FA6800"});break;case"error":this.$bar.css({backgroundColor:"#CE352C",border:"none",color:"#fff"}),this.$message.css({fontWeight:"bold"}),this.$buttons.css({borderTop:"1px solid #CE352C"});break;case"information":this.$bar.css({backgroundColor:"#1BA1E2",border:"none",color:"#fff"}),this.$buttons.css({borderTop:"1px solid #1BA1E2"});break;case"success":this.$bar.css({backgroundColor:"#60A917",border:"none",color:"#fff"}),this.$buttons.css({borderTop:"1px solid #50C24E"});break;default:this.$bar.css({backgroundColor:"#fff",border:"none",color:"#1d1d1d"})}},callback:{onShow:function(){},onClose:function(){}}},t.noty.themes.relax={name:"relax",helpers:{},modal:{css:{position:"fixed",width:"100%",height:"100%",backgroundColor:"#000",zIndex:1e4,opacity:.6,display:"none",left:0,top:0}},style:function(){switch(this.$bar.css({overflow:"hidden",margin:"4px 0",borderRadius:"2px",position:"relative"}),this.$progressBar.css({position:"absolute",left:0,bottom:0,height:4,width:"100%",backgroundColor:"#000000",opacity:.2,"-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)",filter:"alpha(opacity=20)"}),this.$message.css({textAlign:"center",padding:"10px",width:"auto",position:"relative"}),this.$closeButton.css({position:"absolute",top:4,right:4,width:10,height:10,background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",display:"none",cursor:"pointer"}),this.$buttons.css({padding:5,textAlign:"right",borderTop:"1px solid #ccc",backgroundColor:"#fff"}),this.$buttons.find("button").css({marginLeft:5}),this.$buttons.find("button:first").css({marginLeft:0}),this.$bar.on({mouseenter:function(){t(this).find(".noty_close").stop().fadeTo("normal",1)},mouseleave:function(){t(this).find(".noty_close").stop().fadeTo("normal",0)}}),this.options.layout.name){case"top":this.$bar.css({borderBottom:"2px solid #eee",borderLeft:"2px solid #eee",borderRight:"2px solid #eee",borderTop:"2px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});break;case"topCenter":case"center":case"bottomCenter":case"inline":this.$bar.css({border:"1px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"}),this.$message.css({textAlign:"center"});break;case"topLeft":case"topRight":case"bottomLeft":case"bottomRight":case"centerLeft":case"centerRight":this.$bar.css({border:"1px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"}),this.$message.css({textAlign:"left"});break;case"bottom":this.$bar.css({borderTop:"2px solid #eee",borderLeft:"2px solid #eee",borderRight:"2px solid #eee",borderBottom:"2px solid #eee",boxShadow:"0 -2px 4px rgba(0, 0, 0, 0.1)"});break;default:this.$bar.css({border:"2px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"})}switch(this.options.type){case"alert":case"notification":this.$bar.css({backgroundColor:"#FFF",borderColor:"#dedede",color:"#444"});break;case"warning":this.$bar.css({backgroundColor:"#FFEAA8",borderColor:"#FFC237",color:"#826200"}),this.$buttons.css({borderTop:"1px solid #FFC237"});break;case"error":this.$bar.css({backgroundColor:"#FF8181",borderColor:"#e25353",color:"#FFF"}),this.$message.css({fontWeight:"bold"}),this.$buttons.css({borderTop:"1px solid darkred"});break;case"information":this.$bar.css({backgroundColor:"#78C5E7",borderColor:"#3badd6",color:"#FFF"}),this.$buttons.css({borderTop:"1px solid #0B90C4"});break;case"success":this.$bar.css({backgroundColor:"#BCF5BC",borderColor:"#7cdd77",color:"darkgreen"}),this.$buttons.css({borderTop:"1px solid #50C24E"});break;default:this.$bar.css({backgroundColor:"#FFF",borderColor:"#CCC",color:"#444"})}},callback:{onShow:function(){},onClose:function(){}}},t.noty.themes.semanticUI={name:"semanticUI",template:'<div class="ui message"><div class="content"><div class="header"></div></div></div>',animation:{open:{animation:"fade",duration:"800ms"},close:{animation:"fade left",duration:"800ms"}},modal:{css:{position:"fixed",width:"100%",height:"100%",backgroundColor:"#000",zIndex:1e4,opacity:.6,display:"none",left:0,top:0}},style:function(){switch(this.$message=this.$bar.find(".ui.message"),this.$message.find(".header").html(this.options.header),this.$message.find(".content").append(this.options.text),this.$bar.css({margin:"0.5em",position:"relative"}),this.options.icon&&this.$message.addClass("icon").prepend(t("<i/>").addClass(this.options.icon)),this.$progressBar.css({position:"absolute",left:0,bottom:0,height:4,width:"100%",backgroundColor:"#000000",opacity:.2,"-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)",filter:"alpha(opacity=20)"}),this.options.size){case"mini":this.$message.addClass("mini");break;case"tiny":this.$message.addClass("tiny");break;case"small":this.$message.addClass("small");break;case"large":this.$message.addClass("large");break;case"big":this.$message.addClass("big");break;case"huge":this.$message.addClass("huge");break;case"massive":this.$message.addClass("massive")}switch(this.options.type){case"info":this.$message.addClass("info");break;case"warning":this.$message.addClass("warning");break;case"error":this.$message.addClass("error");break;case"negative":this.$message.addClass("negative");break;case"success":this.$message.addClass("success");break;case"positive":this.$message.addClass("positive");break;case"floating":this.$message.addClass("floating")}},callback:{onShow:function(){this.$bar.addClass("transition"),this.$bar.transition(this.options.animation.open)},onClose:function(){this.$bar.transition(this.options.animation.close)}}},window.noty});