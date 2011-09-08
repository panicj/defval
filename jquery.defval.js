/**
 * jQuery Default Value Plugin v0.1
 *
 * The MIT License
 * 
 * Copyright (c) 2011 Thomas Mattern (tomm@tdmarketing.co.nz)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @param		String
 * @return		Array
 */
(function($) {
	
	$.fn.defval = function() {
		
		// Scope
		var elements = this;
		var args = arguments;
		var c = 0;
		
		return(
			elements.each(function() {				
				
				// Default values within scope
				var el = $(this);
				var def = args[c++];
				
				var pos=el.position();
				var hgt=el.height();
				var display;
				
				if(!el.parent().css("position")) {  el.parent().css("position","relative"); }
				if(!el.val()) { display="block"; } else { display="none"; }
				el.before('<span class="defval" style="position: absolute; top: '+pos.top+'px; left: '+pos.left+'px;line-height:'+hgt+'px; display:'+display+'">'+def+'</span>');
				el.prev("span").click(function() { $(this).next("input").focus(); });
				el.focus(function() {
					if(el.prev("span").css("display")=="block") {
						el.prev("span").fadeOut(100);
					}
				});
				el.blur(function() {
					if(el.val() == "") {
						el.prev("span").fadeIn(100);
					}
				}); 
				
			})
		);
	}
})(jQuery)