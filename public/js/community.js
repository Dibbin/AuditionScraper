$(document).ready(function()
{
    var url = window.location.href;
    var n = url.indexOf('?');
    url = url.substring(0, n != -1 ? n : url.length);
    
	$('#selectBeerEdit').bind('change', function () {
        var id = $(this).val();
        window.location = url+"?type="+id;
      });
    
    $('#selectBeerEdit2').bind('change', function () {
        var id = $(this).val();
        window.location = url+"?type="+id;
      });

    // oj
    $('#closeSeenModal').click(function() {
    	var hide = 1;
    	$.ajax({
			type: "POST",
			url: '//www.thebeerbug.com/assets/lib/seenUpdateChanger.php',
			data: hide,
			success: function(data)
			{
				// if (data.success)
				// {	
				// 	$('#seenUpdateModal').modal('hide');
				// }
				// else 
				// {
				// 	$('#seenUpdateModalLabel').html("ERROR1 ");
				// }
				$('#seenUpdateModal').modal('hide');
			},
			error: function() {
				// $('#seenUpdateModalLabel').html("ERROR2");
			}
		});
    });
    // oj

	$( ".followersButton" ).click(
		function()
		{
			var id = $(this).parent().parent().attr("id");
			$.ajax({
				type: "POST",
				dataType: "json",
				url: '//www.thebeerbug.com/assets/lib/ajax/shops/addFollower.php',
				data: {shopID:id},
				success: function(data)
				{
					if(data.success)
					{
						$("#"+id).find(".followersButton").parent().find("label").html("followers: "+data.newFollowers);
						$("#"+id).find(".followersButton").parent().css("height", "");
						$("#"+id).find(".followersButton").remove();
					}
					else
					{
						$("#dialog-error span").html("You have already followed this brewshop.");
						$("#dialog-error").attr("title", "ERROR");
						$("#dialog-error").dialog(
						{
							width: 500,
							position: ['center',120],
							draggable: false,
							resizable: false,
					      	modal: true
					    });
					}
				}
			});
		}
	);
});