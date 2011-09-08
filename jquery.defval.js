/**
 * jQuery Default Value Plugin v0.1
 *
 * The MIT License
 * 
 * Copyright (c) 2011 Thomas Mattern (thomas.mattern@gmail.com)
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
				
				var par=el.parent();
				if(!par.css("position")) {  par.css("position","relative"); }            // add position attribute to parent container if not set
								
				var pos=el.position();
				var hgt=el.outerHeight();                                                // get input outerHeight to set vertical alignment via line height
				var pad='0px '+el.css("padding-right")+' 0px '+el.css("padding-left");   // use left and right padding of input element to set horizontal alignment
				
				var display;
				if(!el.val()) { 
					display="block"; 
				} else { 
					display="none"; 
				}
				el.after('<span class="defval" style="position: absolute; top: '+pos.top+'px; left: '+pos.left+'px; line-height:'+hgt+'px; display:'+display+'; padding:'+pad+'">'+def+'</span>');
				el.next("span").click(function() { $(this).prev("input").focus(); });
				el.focus(function() {
					if(el.next("span").css("display")=="block") {
						el.next("span").fadeOut(200);
					}
				});
				el.blur(function() {
					if(el.val() == "") {
						el.next("span").fadeIn(200);
					}
				}); 
				
			})
		);
	}
})(jQuery)