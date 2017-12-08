var data = [
  {
    "part": "Finger",
    "in": 0.59,
  },
  {
    "part": "Nail",
    "in": 0.47,
  },
  {
    "part": "Peek",
    "in": 0.16,
  },
  {
    "part": "Thumb",
    "in": 0.79,
  },
  {
    "part": "Half Finger",
    "in": 1.97,
  },
  {
    "part": "Index Phalanx",
    "in": 1.18,
  },
  {
    "part": "Middle Phalanx",
    "in": 1.38,
  },
  {
    "part": "Finger Length",
    "in": 3.875,
  },
  {
    "part": "Index Diameter",
    "in": 1.77,
  },
  {
    "part": "Middle Diameter",
    "in": 1.97,
  },
  {
    "part": "Whole Diameter",
    "in": 5.12,
  },
  {
    "part": "Palm",
    "in": 2.76,
  },
  {
    "part": "Hand Length",
    "in": 6.875,
  },
  {
    "part": "Hand Span",
    "in": 2.95,
  },
  {
    "part": "Foot",
    "in": 9.06,
  },
  {
    "part": "Foot Width",
    "in": 3.74,
  },
  {
    "part": "Cubit",
    "in": 15.75,
  },
  {
    "part": "Shin",
    "in": 16.14,
  },
  {
    "part": "Calf",
    "in": 14.17,
  },
  {
    "part": "Yard",
    "in": 29.92,
  },
  {
    "part": "Brachium",
    "in": 22.83,
  },
  {
    "part": "Fathom",
    "in": 60.24,
  },
  {
    "part": "Height",
    "in": 60.63,
  },
  {
    "part": "Reach",
    "in": 74.8,
  },
  {
    "part": "Step",
    "in": 26.38,
  },
  {
    "part": "Pace",
    "in": 53.15,
  },
  {
    "part": "An airplane",
    "in": 1480,
  }
];

var counter = 0;
var max = 0;

$(document).ready(function(){
	var width, height; //screenheight, px
	var ppi, diag=0; 

	// make Ruler
	$('#generate').click(function(){
		$('#vruler').empty();
		screenInfo(makeRuler);
	});

	function screenInfo(callback){
		width = screen.width;
		height = screen.height;	
		diag = $('#diag').val();

		if (diag>0){
			$('#error').fadeOut();
			console.log(diag);
			ppi = Math.sqrt(width*width + height*height)/diag;
			$('#title').append('Screen resolution: ' + width +'x'+height+ 'px at ' + Math.round(ppi) + 'ppi');
			callback();
		}
		else{
			$('#error').fadeIn();
		}
	}


	function makeRuler(){
		getMax(data);
		console.log(max);
		
		var yticCount = 16*(max/ppi);
		console.log(yticCount);

		var xtix="",ytix="";

		
		$('#vruler').css('height', max +'px');

		for(var j=0; j<yticCount; j++){
			ytix = ytix + '<div class="ytic"></div>'
		}

		$('#vruler').append(ytix);
		$('.ytic').css('height', ppi/16+'px');		

		$('form').fadeOut();
		$('#next,#prev').fadeIn();
		makePart();
	}


	function getMax(dataset){
		$.each(dataset, function(index,obj){
			var m = Math.round(obj.in*ppi);	
		 	if (m > max){
		 		max = m;
		 	}
		});
		return max;
	}

	function makePart(){
		var len = Math.round(data[counter].in*ppi);	
		console.log(len);
		$('#object').html('<div class="part" style="height:'+ len +'px"></div>');	
		$('#text').html(data[counter].part);
		$('#pixel').html(len +'px');
	}

	$('#next').click(function(){
		console.log(data.length);
		if (counter<data.length-1){
			counter++;
		}else{
			counter = 0;
		}
		makePart();
	});

	$('#prev').click(function(){
		if (counter>0){
			counter--;
		}else{
			counter = data.length-1;
		}
		makePart();
	});

	

});