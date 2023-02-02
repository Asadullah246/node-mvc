const VerifyEmailTemp = (name, link) => {
  return ` 

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
	<center style="width: 100%; background-color: #f1f1f1;padding:2rem;">
    <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
    <div style="max-width: 600px; margin: 0 auto;background:#fff; padding: 3rem; margin: 2rem 1rem;" class="email-container">
    	<!-- BEGIN BODY -->
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
      	<tr>
          <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
          	<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          		<tr>
          			<td class="logo" style="text-align: center; text-decoration:none; color:#30e3ca">
			            <h1><a  style="text-align: center; text-decoration:none; color:#30e3ca" href="https://mills-business-client.vercel.app/">মিল্ বিজিনেস সলিউশনস</a></h1>
			          </td>
          		</tr>
          	</table>
          </td>
	      </tr><!-- end tr -->
	      <tr>
          <td valign="middle" class="hero bg_white" style="padding: 3em 0 2em 0;">
            <img src="https://colorlib.com/etc/email-template/10/images/email.png" alt="" style="width: 300px; max-width: 600px; height: auto; margin: auto; display: block;">
          </td>
	      </tr><!-- end tr -->
				<tr>
          <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
            <table>
            	<tr>
            		<td>
            			<div class="text" style="padding: 0 2.5em; text-align: center;">
                         <h1> 
                          হ্যালো ${name},
                         </h1>
            				<h2>
                              দয়াকরে আপনার ই-মেইল ভেরিফাই করুন
                            </h2>
            				<h3>  দয়াকরে নিচের লিংকে ক্লিক করে আপনার ইমেইল টাকে ভেরিফাই করুন এবং আপনার পাসওয়ার্ড পরিবর্তন করুন</h3>
            				<p><a href="${link}" class="btn btn-primary" style="text-decoration:none;padding: 10px 15px;display: inline-block;border-radius: 5px;background: #30e3ca;color: #ffffff;">
                           পাসওয়ার্ড  পরিবর্তন করুন </a></p>
                       
            			</div>
            		</td>
            	</tr>
            </table>
          </td>
	      </tr><!-- end tr -->
   

    </div>
  </center>
</body>`;
};
module.exports = VerifyEmailTemp;
