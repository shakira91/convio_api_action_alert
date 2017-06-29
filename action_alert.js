(function($){ 
	//for submitting action alerts using the Luminate API

		var displayConfirmationPopup = function() {

			$('#sending').hide(); 

		  	var confirmationPopUpOverlay = '<div class="confirmation-popup-overlay"></div>'
			var confirmationPopupHtml =
			    ['<div class="hias-popup">'
			    , '<img src="https://www.hias.org/sites/default/files/action-alert-5.24-page_conf.png">'
			    , ' <div style="background: white;min-height: 200px;margin-top: -10px;">'
			    , '<div style="max-width:800px;margin:0 auto;padding:50px 40px;">'
			    , ' <h2 style="text-align:center;">Thank you for contacting your elected officials about this critically important issue. </h2>'
			    , '<p>To learn about additional ways you can stand up and fight back for refugees and asylum seekers, <a href="https://www.hias.org/blog/how-stand-fight-back-refugees">click here</a>.</p>'
			    , '</div>'
			    , '</div>'
			    , '<button class="hias-popup-close" style="position: absolute;top: 10px;right: 15px;font-size: 0.7em;color: #000000;border-radius: 4px;width: 23px;text-align: center;font-weight: bold;height: 26px;border: 1px solid #000000;cursor: pointer;background: white;">x</button>'
			    , '</div>'
		  
			    ].join ("\n");

		        $(confirmationPopUpOverlay).popup({type: 'overlay', pagecontainer: '.page', closeelement: '.hias-popup-close', autoopen: true, onopen: function(){
		        	$(this).append(confirmationPopupHtml); }
		        });       
	 	}
        	
        var submitActionAlert = function() {

        	//CORS plugin
        	$.ajaxPrefilter(function(options) {
           		if (options.crossDomain && $.support.cors) {
           		options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
           	}
        	});

	        var urlData = {
			method: 'getLoginUrl',
            api_key: '',
            v: '1.0',
            'response_format': 'json'
	        }

	        $.ajax({
	        type: 'GET',
	        url: 'https://secure2.convio.net/hias/site/CRConsAPI',
	        data: urlData,
	        dataType: 'json',
	        crossDomain: true,
	        crossOrigin: true
	    }).done(function(response) {

	    	$('#luminateSurveySubmit').hide(); 
	    	$('#sending').html('Sending...');
	    	$('#error-msg').hide(); 
		  	
		    	$.each(response, function(key, value) {
		          
					var userData = {
		            method: 'takeAction',
		            api_key: 'hiasapi',
		            v: '1.0',
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
		            body: $('.field-action-alert-letter').text(),
		            JSESSIONID: value['JSESSIONID'],
		            auth: value['token']
			       }
			       
			       //CORS plugin
					$.ajaxPrefilter(function(options) {
		           		if (options.crossDomain && $.support.cors) {
		           		options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
		           	}
		        	});

					$.ajax({
						type: 'POST',
						url: 'https://secure2.convio.net/hias/site/CRAdvocacyAPI;jsessionid='+ value["routing_id"],
						data: userData,
						crossDomain: true,
						crossOrigin: true
					}).done(function(){
						
						displayConfirmationPopup(); 

					});     
	       
		        }); 
	    	
		});
		
     }

    $('#luminateSurveySubmit').on('click', function(){ 

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
			var regEx = /^[a-zA-Z0-9\-_]{0,40}$/;
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

				$('#error-msg').html('Please enter a valid phone number.');
				return false;
			}
		}

		if (validateTitle() && validateFirstName() && validateLastName() && validateEmail() && validateStreet1() && validateCity() && validateState() && validateZip() && validatePhone()) {
			
			submitActionAlert();
		}
	

	});
	

}) (jQuery);