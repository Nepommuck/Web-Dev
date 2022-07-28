window.onload = start;

var winners = [[0, 3, 6], [1, 4, 7], [2, 5, 8],
			   [0, 1, 2], [3, 4, 5], [6, 7, 8],
			   [0, 4, 8], [2, 4, 6]];
			   
var state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var player = 1, moves=0;

function start()
{
	var tresc = "";
	for (i=0; i<9; i++) {
		tresc += '<div class="cell" id="c' + i
		+ '" onclick="claim('+i+')"><img src="emp.png" alt=""/></div>';
		if (i % 3 == 2)
			tresc += '<div style="clear:both;"></div>';
	}
	document.getElementById("board").innerHTML = tresc;
}

// 1,2 for winners;  0 for ongoing game;  -1 for draw
function check()
{
	for (i=0; i<8; i++)
		if(state[ winners[i][0] ] != 0 && state[ winners[i][0] ] == state[ winners[i][1] ]
		&& state[ winners[i][0] ] == state[ winners[i][2] ])
			return state[ winners[i][0] ];
	if (moves >= 9)
		return -1;
	return 0;
}

function change_player()
{	
	if (player == 1) var img='o.png';
	else             var img='x.png';
	document.getElementById("info").innerHTML = "Gracz " + player;
	document.getElementById("akt").innerHTML = '<img src="'+img+'" alt=""/>';
}

function normalise(elem)
{
	document.getElementById(elem).setAttribute("onclick",";");
	document.getElementById(elem).style.cursor = "default";
	document.getElementById(elem).style.background = "#54a0ad";
}

function claim(cell)
{
	//console.log(cell);
	state[cell] = player;
	
	if (player == 1) var img='o.png';
	else             var img='x.png';
	elem = "c" + cell;
	
	document.getElementById(elem).innerHTML = '<img src="'+img+'" alt=""/>';
	normalise(elem);
	
	moves++;	
	var rez = check();
	
	// Ongoing game
	if (rez == 0) {
		player = player % 2	+ 1;	
		change_player();
	}
	else
	{
		// Draw
		if (rez == -1) {		
			document.getElementById("info").innerHTML = "<br/>Remis";
			document.getElementById("akt").innerHTML = "";
		}
		else {		
			document.getElementById("info").innerHTML = "Zwycięstwo:<br/>Gracz "+ player;
			for (i=0; i<9; i++)
				normalise("c" + i);
		}	
		document.getElementById("restart").innerHTML = "GRAJ<br/>PONOWNIE!";
		document.getElementById("restart").style.cursor = "pointer";
		document.getElementById("restart").setAttribute("onclick","location.reload()");
	}
}
