function removeUpdate(x)
{
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '//www.thebeerbug.com/assets/lib/hide.php',
		data: {id:x, type:"update"},
		success: function(data)
		{
			$("#update"+data.ID).remove();
		}
	});
}
function removeTip(x)
{
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '//www.thebeerbug.com/assets/lib/hide.php',
		data: {id:x, type:"tip"},
		success: function(data)
		{
			$("#tip"+data.ID).remove();
		}
	});
}
function hideForSession()
{
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '//www.thebeerbug.com/assets/lib/hide.php',
		data: {type:"box"},
		success: function(data)
		{
			$("#updatesBox").remove();
		}
	});
}
function confirmToggle(x)
{
	// console.log('initiate');
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '//www.thebeerbug.com/assets/lib/ajax/profile/toggleTempFormat.php',
		data: {toggleTo:x},
		success: function(data)
		{
			// console.log('ss');
			if (data.success)
			{
				if(data.reason == "Celsius")
				{
					$("#tempFormat").html("Metric");
					$("#tempFormatToggle").attr("onClick","confirmToggle(0)");
					location.reload();
				}
				else
				{
					$("#tempFormat").html("US");
					$("#tempFormatToggle").attr("onClick","confirmToggle(1)");
					location.reload();
				}
			}
			else
			{
				// $("#dialog-message").html("There has been a server error please refresh your page...");
				// $("#dialog-error").dialog(
				// {
				// 	position: ['center',120],
				// 	width: 600,
			 //  		modal: true,
				// 	draggable: false,
				// 	resizable: false
				// });
			}
		},
		beforesend: function() {
			console.log('before');
		},
		error: function(x,t,m) {
			// console.log(x + " " + t + " " + m);
			console.log(x.responseText);
		}
	});
	// console.log("after");
}

function confirmToggleBT(x)
{
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '//www.thebeerbug.com/assets/lib/ajax/profile/toggleBluetooth.php',
		data: {toggleTo:x},
		success: function(data)
		{
			if (data.success)
			{
				if(data.reason == "Enabled")
				{
					$("#btEnable").html('on');
					$("#bluetooth").show();
					$("#btEnableToggle").attr("onClick","confirmToggleBT(0)");
				}
				else
				{
					$("#btEnable").html('off');
					$("#bluetooth").hide();
					$("#btEnableToggle").attr("onClick","confirmToggleBT(1)");
				}
			}
			else
			{
				$("#dialog-message").html("There has been a server error please refresh your page...");
				$("#dialog-error").dialog(
				{
					width:550,
					modal: true,
					draggable: false,
					resizable: false
				});
			}
		}
	});
}

function confirmTogglePlato(x)
{
	// console.log("begin : " + x);
	$.ajax({
		type: "POST",
		dataType: "json",
		url: '//www.thebeerbug.com/assets/lib/ajax/profile/togglePlato.php',
		data: {toggleTo:x},
		success: function(data)
		{
			// console.log("success: " + data);
			if (data.success)
			{
				if(data.reason == "Enabled")
				{
					$("#platoEnable").html('ON');
					// $("#bluetooth").show();
					$("#platoEnableToggle").attr("onClick","confirmTogglePlato(0)");
				}
				else
				{
					$("#platoEnable").html('OFF');
					// $("#bluetooth").hide();
					$("#platoEnableToggle").attr("onClick","confirmTogglePlato(1)");
				}
			}
			else
			{
				$("#dialog-message").html("There has been a server error please refresh your page...");
				$("#dialog-error").dialog(
				{
					width:550,
					modal: true,
					draggable: false,
					resizable: false
				});
			}
		},
		error: function(x, t, m) {
			// console.log (x + " / " + t + " / " + m + " [ " + x.responseText + "]");
		}
	});
	// console.log("done");
}

$( document ).ready(function() {
	$("#bluetooth").click(
		function(event){
			event.stopPropagation();
			if($(".btapi").hasClass("hover"))
			{
				$(".btapi").removeClass("hover");
			}
			else
			{
				$(".btapi").addClass("hover");
			}
			if($('#loginBox').css('top') == "30px")
			{

				$('#loginBox').css('top', -260);
			}
		}
	);
	$("#closeTip").click(
		function()
		{
			$("#tipBar").hide();
		}
	);
	$("#login").click(
		function(event){
			event.stopPropagation();
			if($('#loginBox').css('top') == "30px")
			{
				$('#loginBox').css('top', -260);
			}
			else
			{
				$('#loginBox').css('top', 30);
			}
			if($(".btapi").hasClass("hover"))
			{
				$(".btapi").removeClass("hover");
			}
		}
	);

	$("#loginBox").click(
		function(event){
			event.stopPropagation();

		}
	);

	$('html').click(
		function(){
			if($(".btapi").hasClass("hover"))
			{
				$(".btapi").removeClass("hover");
			}
			if($('#loginBox').css('top') == "30px")
			{
				$('#loginBox').css('top', -260);
			}
		}
	);

	$('#loginForm').submit(function(e) {
	    e.preventDefault();
	    $.ajax({
	       	type: "POST",
	       	dataType: "json",
	       	url: '//www.thebeerbug.com/assets/lib/ajax/login/login.php',
	       	data: $(this).serialize(),
	       	success: function(data)
	       	{
	          	if (data.login) {
					window.location = data.reason;
				}
				else
				{
					alert(data.reason);
				}
	       	}
	   	});
	});

	$('#questionForm').submit(
		function(e)
		{
			e.preventDefault();
			$.ajax({
		       	type: "POST",
		       	dataType: "json",
		       	url: '//www.thebeerbug.com/assets/lib/sendQuestion.php',
		       	data: $(this).serialize(),
		       	success: function(data)
		       	{
		          	if (data.success) {
						$('#messageModal').modal('hide');
						//$('#formbutt').hide();
						$('#successQuestion').modal('show');
					}
					else
					{
						alert("Question submission failed for some reason.... Please try again. If you see this please email oj@parasitx.com");
					}
		       	}
		   	});
		}
	);

	$('#settingsNavBar span').click(
		function()
		{
			$('#settingsNavBarList').toggle();
		}
	);

	$('#beerbugs span').click(
		function()
		{
			$('#bugsList').toggle();
		}
	);
});
