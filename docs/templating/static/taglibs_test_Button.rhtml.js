$rset("rhtml","taglibs/test/Button",function(helpers){var empty=helpers.e,notEmpty=helpers.ne,getTagHandler=helpers.t,templating_taglibs_widgets_WidgetTag=getTagHandler("templating.taglibs.widgets.WidgetTag"),escapeXmlAttr=helpers.xa,escapeXml=helpers.x;return function(data, context, contextHelpers){
var write=contextHelpers.w,widget=data.widget,buttonAttrs=data.buttonAttrs,label=data.label,invokeHandler=contextHelpers.t,attrs=contextHelpers.a;invokeHandler(templating_taglibs_widgets_WidgetTag,{"jsClass":"taglibs.test.ButtonWidget","widgetContext":data.widgetContext,"config":data.widgetConfig},function(widget){write('<button id="')(escapeXmlAttr(widget.elId()))('"');attrs(buttonAttrs);write('>')(escapeXml(label))('</button>');});}});