import React from "react"
import './LoginOtpComp.css'
import $ from 'jquery';

const LoginOtpComp = (props) => {

    $('.digit-group').find('input').each(function() {
        $(this).attr('maxlength', 1);
        $(this).on('keyup', function(e) {
            var parent = $($(this).parent());
            
            if(e.keyCode === 8 || e.keyCode === 37) {
                var prev = parent.find('input#' + $(this).data('previous'));
                
                if(prev.length) {
                    $(prev).select();
                }
            } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                var next = parent.find('input#' + $(this).data('next'));
                
                if(next.length) {
                    $(next).select();
                } else {
                    if(parent.data('autosubmit')) {
                        parent.submit();
                    }
                }
            }
        });
    });

  return (
    <div>
      <div>
        <h4>Login with OTP</h4>
            <form method="get" class="digit-group" data-group-name="digits" data-autosubmit="false" autocomplete="off">
                <input type="text" id="digit-1" name="digit-1" data-next="digit-2" />
                <input type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" />
                <input type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" />
                <span class="splitter">&ndash;</span>
                <input type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" />
                <input type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" />
                <input type="text" id="digit-6" name="digit-6" data-previous="digit-5" />
            </form>
      </div>
    </div>
  )
};

export default LoginOtpComp;
