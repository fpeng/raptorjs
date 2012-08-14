/*
 * Copyright 2011 eBay Software Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

raptor.defineClass(
    'templating.taglibs.core.DefNode',
    'templating.compiler.Node',
    function() {
        "use strict";
        
        var errors = raptor.errors,
            strings = raptor.require('strings'),
            funcDefRegExp = /^([A-Za-z_][A-Za-z0-9_]*)\(((?:[A-Za-z_][A-Za-z0-9_]*,\s*)*[A-Za-z_][A-Za-z0-9_]*)?\)$/;
        
        var DefNode = function(props) {
            DefNode.superclass.constructor.call(this);
            if (props) {
                this.setProperties(props);
            }
        };
        
        DefNode.prototype = {

            doGenerateCode: function(template) {
                
                var func = this.getProperty("function");
                
                if (!func) {
                    this.addError('"function" attribute is required');
                    this.generateCodeForChildren(template);
                    return;
                }
                
                func = strings.trim(func);
                
                var matches = funcDefRegExp.exec(func);
                if (matches) {
                    var name = matches[1];
                    var params = matches[2] ? matches[2].split(/\s*,\s*/) : [];

                    var definedFunctions = template.getAttribute("core:definedFunctions");
                    if (!definedFunctions) {
                        definedFunctions = template.setAttribute("core:definedFunctions", {});
                    }
                    
                    definedFunctions[name] = {
                        params: params
                    };
                }
                else {
                    this.addError('Invalid function name of "' + func + '"');
                    this.generateCodeForChildren(template);
                    return;
                }
               
                template.addJavaScriptCode('function ' + func + '{return ' + template.getStaticHelperFunction("noEscapeXml", "nx") + '(context.captureString(function(){');
                this.generateCodeForChildren(template);
                template.addJavaScriptCode('}));}');
            }
            
        };
        
        return DefNode;
    });