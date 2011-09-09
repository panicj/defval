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
    
    $.fn.defval = function(dv, options) {
        
        // Scope
        var elements = this;
        var val = dv;
        
        // settings
        var settings = {
              animationIn            : 'fadeIn',
              animationOut          : 'fadeOut',
            durationIn            : 200,
            durationOut            : 200
        };
        
        return(
            elements.each(function() {    
                if ( options ) { $.extend( settings, options ); }
    
                var el = $(this);
                var def = val;
                
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
                el.after('<span class="defval">'+def+'</span>');
                var df=el.next("span");
                df.css({                                                                
                     "position"        : "absolute",
                     "top"            : pos.top+"px",
                     "left"            : pos.left+"px",
                     "line-height"    : hgt+"px",
                     "display"        : display,
                     "padding"        : pad
                });
                df.click(function() { $(this).prev("input").focus(); });                 // delegate focus to input field of overlay is clicked
    
                var $out=function() {
                    if(settings.animationIn=="slideDown") {
                        df.slideDown(options.durationIn);
                    } else {
                        df.fadeIn(options.durationIn);
                    }
                };
                var $in=function() {
                    if(settings.animationIn=="slideUp") {
                        df.slideUp(options.durationOut);
                    } else {
                        df.fadeOut(options.durationOut);
                    }
                };
                el.focus(function() {
                    if(df.css("display")=="block") {
                        $in();
                    }
                });
                el.blur(function() {
                    if(el.val() === "") {
                        $out();
                    }
                });
                
            })
        );
    };
})(jQuery);