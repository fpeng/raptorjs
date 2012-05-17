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
    "files.walker.DirWalker",
    function(raptor) {
        var listeners = raptor.require("listeners"),
            File = raptor.require('files').File;
        
        var DirWalker = function(callbackFunc, thisObj, options) {
            this.callbackThisObj = thisObj;
            this.callbackFunc = callbackFunc;
            
            if (options) {
                
                this.fileFilter = options.fileFilter;
                this.dirTraverseFilter = options.dirTraverseFilter;
            }
        };
        
        DirWalker.prototype = {
            walkDir: function(dir) {
                if (typeof dir === 'string') {
                    dir = new File(dir);
                }
                
                this._handleFile(dir);
            },

            _handleFile: function(file) {
                var callbackThisObj = this.callbackThisObj,
                    fileFilter = this.fileFilter,
                    dirTraverseFilter = this.dirTraverseFilter;
                
                if (!fileFilter || fileFilter.call(callbackThisObj, file)) {
                    this.callbackFunc.call(callbackThisObj, file);
                }
                
                if (file.isDirectory()) {
                    if (!dirTraverseFilter || dirTraverseFilter.call(callbackThisObj, file) !== false) {
                        file.forEachFile(this._handleFile, this);
                    }
                }
            }
        };
        
        return DirWalker;
    });