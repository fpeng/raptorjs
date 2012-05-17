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

/**
 * 
 * @extension jQuery Parse
 * 
 */
raptor.extend('json', {
    extend: function(target) {
        var parse = $.parseJSON;
        
        //NOTE: Target is the "json" module that we are extending with this mixin
        target.registerImpl('jquery', 'parse', parse);
        
        return /** @lends json_jQuery_Parse */ {
            /**
             * 
             * @function
             * 
             * @param s {String} The JSON string to parse
             * @returns {Object} The native JavaScript object that represents the JSON string
             */
            jqueryParse: parse
        };
        
    }
});