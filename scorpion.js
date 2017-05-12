function NodeList()
{
	this.length = 0;
	this.head = null;
	this.tail = null;
}

NodeList.prototype.push = function(posX, posY)
{
	this.length++;
	var node = 
	{
		index: this.length,
		positionX: posX,
		positionY: posY,
		next: null
	}

	if (!this.head)
	{
		this.head = node;
		this.tail = node;
	}
	else
	{
		this.tail.next = node;
		this.tail = node;
	}
}

NodeList.prototype.remove = function(index)
{
	var current = this.head;

	if (current.index == index)
	{
		this.head = current.next;
	}
	else
	{
		var previous = current;

		while (current.next)
		{
			if (current.index == index)
			{
				previous.next = current.next;
				break;
			}
			previous = current;
			current = current.next;
		}

		if (current.index == index)
		{
			tail = previous;
			previous.next = null;
		}
	}
	this.length--;
}

NodeList.prototype.findNodeByPosition = function(positionX, positionY, radium)
{
	var current = this.head;
	while (current.next)
	{
		if ((Math.abs(current.positionX - positionX) <= radium)
			&& (Math.abs(current.positionY - positionY) <= radium))
		{
			return current;
		}
		current = current.next;
	}

	if ((Math.abs(current.positionX - positionX) <= radium)
			&& (Math.abs(current.positionY - positionY) <= radium))
	{
		return current;
	}
	return -1;
}

function LinkList()
{
	this.length = 0;
	this.fromId = null;
	this.toId = null;
}

LinkList.prototype.push = function(fromIndex, toIndex)
{
	this.length++;
	var node = 
	{
		fromId: fromIndex,
		toId: toIndex,
		next: null
	}

	if (!this.head)
	{
		this.head = node;
		this.tail = node;
	}
	else
	{
		this.tail.next = node;
		this.tail = node;
	}
}

LinkList.prototype.remove = function(index)
{
	var current = this.head;

	if (current.index == index)
	{
		this.head = current.next;
	}
	else
	{
		var previous = current;

		while (current.next)
		{
			if (current.index == index)
			{
				previous.next = current.next;
				break;
			}
			previous = current;
			current = current.next;
		}

		if (current.index == index)
		{
			tail = previous;
			previous.next = null;
		}
	}
	this.length--;
}

LinkList.prototype.adjacencyMatrix = function(length)
{
	var adjacencyMatrix = new Array(length);
	for (var i = 0; i < length; i++)
	{
		adjacencyMatrix[i] = new Array(length);
	}
	for (var i = 0; i < length; i++)
	{
		for (var j = 0; j < length; j++)
		{
			adjacencyMatrix[i][j] = 0;
		}
	}

	var current = this.head;
	while (current.next)
	{
		adjacencyMatrix[current.fromId - 1][current.toId - 1] = 1;
		adjacencyMatrix[current.toId - 1][current.fromId - 1] = 1;
		current = current.next;
	}
	adjacencyMatrix[current.fromId - 1][current.toId - 1] = 1;
	adjacencyMatrix[current.toId - 1][current.fromId - 1] = 1;
	return adjacencyMatrix;
}


//Algorithm
function findScorpion()
{
	var adjacencyMatrix = linkList.adjacencyMatrix(nodeList.length);
	var countOne = 0;
	var firstOnePosition = -1;
	var secondOnePosition = -1;
	var firstZeroPosition = -1;
	var length = nodeList.length;
	var HeadBodyTail = [];


	for (var i = 0; i < length; i++)
	{
		if (adjacencyMatrix[0][i] == 1)
		{
			countOne++;
			if (firstOnePosition == -1)
			{
				firstOnePosition = i;
			}
			else if (secondOnePosition == -1)
			{
				secondOnePosition = i;
			}
		}
		else if (firstZeroPosition == -1 && i != 0)
		{
			firstZeroPosition = i;
		}
	}

	if (countOne == 1)
	{
		//Check if it is the tail
		var CountBodyOne = 0;
		var connectToHead = -1;
		
		for (var i = 0; i < length; i++)
		{
			if (adjacencyMatrix[firstOnePosition][i] == 1)
			{
				CountBodyOne++;
				connectToHead = i;
			}
		}
		if (CountBodyOne == 2)
		{
			var CountHeadOne = 0;
			for (var i = 0; i < length; i++)
			{
				if (adjacencyMatrix[connectToHead][i] == 1)
				{
					CountHeadOne++;
				}
			}
			if (CountHeadOne == length - 2)
			{
				HeadBodyTail.push(connectToHead + 1);
				HeadBodyTail.push(firstOnePosition + 1);
				HeadBodyTail.push(1);
				return HeadBodyTail;
			}
		}
	}

	else if (countOne == 2)
	{
		var CountTailOrHeadOne1 = 0;
		var CountTailOrHeadOne2 = 0;
		for (var i = 0; i < length; i++)
		{
			if (adjacencyMatrix[firstOnePosition][i] == 1)
			{
				CountTailOrHeadOne1++;
			}
			if (adjacencyMatrix[secondOnePosition][i] == 1)
			{
				CountTailOrHeadOne2++;
			}
		}
		if ((CountTailOrHeadOne1 == 1 && CountTailOrHeadOne2 == length - 2)
			|| (CountTailOrHeadOne1 == length - 2 && CountTailOrHeadOne2 == 1))
		{
			HeadBodyTail.push(secondOnePosition + 1);
			HeadBodyTail.push(1);
			HeadBodyTail.push(firstOnePosition + 1);
			return HeadBodyTail;
		}
	}

	else if (countOne == length - 2)
	{
		var CountTailOne = 0;
		var connectToBody = -1;
		for (var i = 0; i < length; i++)
		{
			if (adjacencyMatrix[firstZeroPosition][i] == 1)
			{
				CountTailOne++;
				connectToBody = i;
			}
		}
		if (CountTailOne == 1)
		{
			var CountBodyOne = 0;
			for (var i = 0; i < length; i++)
			{
				if (adjacencyMatrix[connectToBody][i] == 1)
				{
					CountBodyOne++;
				}
			}
			if (CountBodyOne == 2)
			{
				HeadBodyTail.push(1);
				HeadBodyTail.push(connectToBody + 1);
				HeadBodyTail.push(firstZeroPosition + 1);
				return HeadBodyTail;
			}
		}
	}
	
	var zeroArray = [];
	var oneArray = []
	for (var i = 0; i < length; i++)
	{
		if (adjacencyMatrix[0][i] == 1)
		{
			oneArray.push(i);
		}
		else
		{
			zeroArray.push(i);
		}
	}
	var zeroIndex = 0;
	var oneIndex = 0;

	while (zeroIndex < zeroArray.length && oneIndex < oneArray.length)
	{
		if (adjacencyMatrix[zeroArray[zeroIndex]][oneArray[oneIndex]] == 1)
		{
			zeroIndex++;
		}
		else
		{
			oneIndex++;
		}
	}
	if (zeroIndex < zeroArray.length)
	{
		var CountTailOne = 0;
		var connectToBody = -1;
		for (var i = 0; i < length; i++)
		{
			if (adjacencyMatrix[zeroArray[zeroIndex]][i] == 1)
			{
				CountTailOne++;
				connectToBody = i;
			}
		}
		if (CountTailOne == 1)
		{
			var CountBodyOne = 0;
			var connectToHead = -1;
			for (var i = 0; i < length; i++)
			{
				if (adjacencyMatrix[connectToBody][i] == 1)
				{
					CountBodyOne++;
					if (i != zeroArray[zeroIndex])
					{
						connectToHead = i;
					}
				}
			}
			if (CountBodyOne == 2)
			{
				var CountHeadOne = 0;
				for (var i = 0; i < length; i++)
				{
					if (adjacencyMatrix[connectToHead][i] == 1)
					{
						CountHeadOne++;
					}
				}
				if (CountHeadOne == length - 2)
				{
					HeadBodyTail.push(connectToHead + 1);
					HeadBodyTail.push(connectToBody + 1);
					HeadBodyTail.push(zeroArray[zeroIndex] + 1);
					return HeadBodyTail;
				}
			}
		}
	}

	alert('not exit');
	return false;
}

//Event
var nodeWidth = 50;
var drawNode = false;
var drawLink = false;
var drawLinkClickTime = 0;
var nodeList = new NodeList();
var linkList = new LinkList();
var fromNode;
var toNode;

$('#node-button').click(function()
{
	drawNode = true;
	drawLink = false;
});

$('#link-button').click(function()
{
	drawNode = false;
	drawLink = true;
});

function makeSVG(tag, attrs) 
{
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

$('#canvas').click(function(e)
{	
	var offset = $(this).offset();
	var positionX = e.pageX - offset.left;
	var positionY = e.pageY - offset.top;
	if (drawNode)
	{
		//add node to the list
		nodeList.push(positionX, positionY);
		var index = nodeList.length;
		//draw the node
		var $circle= makeSVG('circle', {cx: positionX, cy: positionY, r:25, stroke: 'black', 'stroke-width': 2, fill: '#c6c6c6'});
		$circle.setAttribute('id', index);
		$('#canvas').append($circle);
	}
	else if (drawLink)
	{
		var node = nodeList.findNodeByPosition(positionX, positionY, 25);
		if (node != -1)
		{
			if (drawLinkClickTime == 0)
			{
				fromNode = node;
				drawLinkClickTime = 1;
			}
			else if (drawLinkClickTime == 1 && node.index != fromNode.index)
			{
				drawLinkClickTime = 0;
				toNode = node;

				linkList.push(fromNode.index, toNode.index);

				var $line= makeSVG('line', {x1: fromNode.positionX , y1: fromNode.positionY, 
											x2: toNode.positionX, y2: toNode.positionY, 
											'stroke-width': 2, 
											'stroke': 'rgb(0,0,0)'});
				$('#canvas').append($line);
			}
		}
	}
});

$('#get-adjacencyMatrix-button').click(function()
{
	var result = "";
	var adjacencyMatrix = linkList.adjacencyMatrix(nodeList.length);

	for (var i = 0; i < nodeList.length; i++)
	{
		for (var j = 0; j < nodeList.length; j++)
		{
			result += adjacencyMatrix[i][j];
			result += ' ';
		}
		result += '\n';
	}
	alert(result);
});

$('#find-scorpion-button').click(function()
{
	HeadBodyTail = findScorpion();
	if (HeadBodyTail != null)
	{
		$('#' + HeadBodyTail[0]).css({fill: '#ff0000'});
		$('#' + HeadBodyTail[1]).css({fill: '#00ff00'});
		$('#' + HeadBodyTail[2]).css({fill: '#0000ff'});
	}
});

