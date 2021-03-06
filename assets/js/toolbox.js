


function initializeToolbox (){
				
	$('.save_btn').click(save);
	
	$('#trash').droppable({
		tolerance: 'pointer',
		hoverClass: 'drophover',
		over: function(event, ui) { 
			$(ui.draggable).fadeOut();
		},
		out: function(event, ui) { 
			$(ui.draggable).fadeIn();
		},
		drop: function( event, ui ) {
			$(ui.draggable).data('status','deleted')
			
		}
	});
	
	$( "#content-wrapper .section" ).droppable({
		tolerance: 'pointer',
		over: function( event, ui ) {
			
			var node = $(ui.draggable);
			
			var position = "";
			if ($(this).hasClass("left"))
				position = "left"
			if ($(this).hasClass("middle"))
				position = "full"
			if ($(this).hasClass("right"))
				position = "right"
			
			if ($(ui.draggable).hasClass('node')){		
				if (node.data('position') != position){
					node.removeClass('align-left');
					node.removeClass('align-full');
					node.removeClass('align-right');
					
					node.addClass('align-'+position);
					node.data('position',position);
				}
			}else{
				if (position == "left")
					$(ui.draggable).css('background',' url("assets/img/add-left.png") no-repeat scroll center bottom transparent');
				if (position == "full")
					$(ui.draggable).css('background',' url("assets/img/add-center.png") no-repeat scroll center bottom transparent');
				if (position == "right")
					$(ui.draggable).css('background',' url("assets/img/add-right.png") no-repeat scroll center bottom transparent');
			}
				
			
			

		},
		drop:function( event, ui ){
			if (!($(ui.draggable).hasClass('node'))){	
				setSaveButtonUnknown();
				
				var position = "";
				if ($(this).hasClass("left"))
					position = "left"
				if ($(this).hasClass("middle"))
					position = "full"
				if ($(this).hasClass("right"))
					position = "right"
				
				
				nodeOffset = $(ui.draggable).offset().top - $('#content-wrapper').offset().top;
				$(ui.draggable).remove();
				
				
				
				var newNode = '<div style="position:absolute;top: '+nodeOffset+'px;" class="empty node align-'+position+'"> \
									<div class = "type-container">\
										Choose box type: \
										<ul >  \
										\
										</ul>  \
									</div> \
								</div>';
								
				var nodeElement = $(newNode);
				var typelist = nodeElement.find('ul');
				
				$('#type-examples').children().each(function(index){
					typelist.append('<li><a href = "'+$(this).data('type')+'" >'+$(this).attr('title')+'</a></li>' );
				});
				
				nodeElement.data("status", "empty");
				nodeElement.data("position", position);
				
				nodeElement.draggable(nodeSettings);
				
				$('#nodes').append(nodeElement);
				
				$('#toolbox').append();
				
				var newAddBox = '<li id="add_btn" style=" " class="ui-draggable"></li>'
				var ele = $(newAddBox);
				ele.draggable({ revert: 'invalid', grid: [ 5,5 ] });
				
				$('#toolbox ul').append(ele);
				
			}
		
		}
	});
}

