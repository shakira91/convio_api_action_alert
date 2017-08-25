(function(window, document, $) { //this script handles submission of Action Alerts, not on Luminate's server. 

  "use strict";

  var takeActionResponse;

  Drupal.behaviors.luminateExtend = {
    attach: function(context, settings){

    	window.submitAction = function() {

    		var displayConfirmationPopup = function(data) {

    			console.log(data)

				$('#sending').hide(); 

			  	var confirmationPopUpOverlay = '<div class="confirmation-popup-overlay"></div>'
				var confirmationPopupHtml =
				    ['<div class="hias-popup">'
				    , '<img src="https://www.hias.org/sites/default/files/07.17-takeaction_landingpage_900x313px.png">'
				    , ' <div style="background: white;min-height: 200px;margin-top: -10px;">'
				    , '<div style="max-width:800px;margin:0 auto;padding:50px 40px;">'
				    , ' <h2 style="text-align:center;">Thank you for taking action.</h2>'
				    , '<p>To read more about the history of the Presidential Determination and how it works, <a href="https://www.hias.org/blog/presidential-determination-brief-history" >visit the HIAS blog</a>. </p>'
				    , '<p>Help us continue to keep up the pressure by making a <a href="https://www.hias.org/call-congress" >phone call to your Member of Congress</a>.</p>'
				    , '</div>'
				    , '</div>'
				    , '<button class="hias-popup-close" style="position: absolute;top: 10px;right: 15px;font-size: 0.7em;color: #000000;border-radius: 4px;width: 23px;text-align: center;font-weight: bold;height: 26px;border: 1px solid #000000;cursor: pointer;background: white;">x</button>'
				    , '</div>'
			  
				    ].join ("\n");

			        $(confirmationPopUpOverlay).popup({type: 'overlay', pagecontainer: '.page', closeelement: '.hias-popup-close', autoopen: true, onopen: function(){
			        	$(this).append(confirmationPopupHtml); }
			        });    
	 		}

	 		$('#luminateSurveySubmit').hide(); 
		    	$('#sending').html('Sending...');
		    	$('#error-msg').hide(); 

	    		var userData = {
		            method: 'takeAction',
		            alert_id: parseInt($('.field-alert-id').text()), 
		            alert_type: 'action',
		            title: $('#title').val(), //dropdown
		            first_name: $('#first_name').val(),
		            last_name: $('#last_name').val(),
		            email: $('#luminate_email').val(),
		            street1: $('#street1').val(),
		            city: $('#city').val(),
		            state: $('#state').val(), //dropdown
		            zip: $('#zip').val(),
		            phone: $('#phone').val(),
		            body: $('.field-action-alert-letter').text()
				}
 
	
		      luminateExtend.api({
		        api: 'advocacy',
		        responseFilter: {
				    array: 'takeActionResponse', 
				    filter: 'takeActionResponse == true' // or 'personalPagePrivate != true'
				}, 
		        callback: displayConfirmationPopup(),   	 
		        data: 'method='+userData.method+'&alert_id='+userData.alert_id+'&alert_type='+userData.alert_type+'&title='+userData.title+'&first_name='+userData.first_name+'&last_name='+userData.last_name+'&street1='+userData.street1+'&city='+userData.city+'&state='+userData.state+'&zip='+userData.zip+'&email='+userData.email+'&phone='+userData.phone+'&body='+userData.body
		      });

    	}


	   $('#luminateSurveySubmit').on("click", function(){

			var validateTitle = function() { 
				if ($('#title').val() !=='') {
					return true;
				}
				else {

					$('#error-msg').html('Please choose a title.');
					return false;
				}
			}

	    	var validateFirstName = function() { 
				var regEx = /^[a-zA-Z0-9,.!? ]*$/;
				if (regEx.test($('#first_name').val()) && $('#first_name').val() !=='') {
					return true;
				}
				else {

					$('#error-msg').html('Please enter a valid first name.');
					return false;
				}
			}

			var validateLastName = function() { 
				var regEx = /^[a-zA-Z0-9\-_]{0,40}$/;
				if (regEx.test($('#last_name').val()) && $('#last_name').val() !=='') {
					return true;
				}
				else {

					$('#error-msg').html('Please enter a valid last name.');
					return false;
				}
			}

	    	var validateEmail = function() { 
				var regEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				if (regEx.test($('#luminate_email').val()) && $('#luminate_email').val() !=='') {
					return true;
				}
				else {

					$('#error-msg').html('Please enter a valid email.');
					return false;
				}
			}

			var validateStreet1 = function() { 
				var regEx = /^\s*\S+(?:\s+\S+){2}/;
				if (regEx.test($('#street1').val()) && $('#street1').val() !=='') {
					return true;
				}
				else {

					$('#error-msg').html('Please enter a valid street address.');
					return false;
				}
			}

			var validateCity = function() { 
				var regEx = /^[a-zA-Z\- ]+$/;
				if (regEx.test($('#city').val()) && $('#city').val() !=='') {
					return true;
				}
				else {

					$('#error-msg').html('Please enter a valid city.');
					return false;
				}
			}

			var validateState = function() { 
				if ($('#state').val() !=='') {
					return true;
				}
				else {

					$('#error-msg').html('Please choose a state.');
					return false;
				}
			}

			var validateZip = function() { 
				var regEx = /^\d{5}(?:[-\s]\d{4})?$/;
				if (regEx.test($('#zip').val()) && $('#zip').val() !=='') {
					return true;
				}
				else {

					$('#error-msg').html('Please enter a valid zip code.');
					return false;
				}
			}

			var validatePhone = function() { 
				var regEx = /^[0-9]{10}$/;
				if (regEx.test($('#phone').val()) && $('#phone').val() !=='') {
					return true;
				}
				else {

					$('#error-msg').html('Please enter a valid phone number. No dashes or spaces allowed.');
					return false;
				}
			}

			if (validateTitle() && validateFirstName() && validateLastName() && validateEmail() && validateStreet1() && validateCity() && validateState() && validateZip() && validatePhone()) {
				
				submitAction();
			}
		});		
    }
}



})(window, document, jQuery);







