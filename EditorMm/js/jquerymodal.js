		//http://fenix.nied.unicamp.br/EditorMm/	
		var color="black", width = 3;
		var font = "Arial";
		var size = "20";
		var colorStroke = "none";
		var colorFill = "black";
		var decoration = "none";
		var style  = "normal";
		var isMousePressed = false;
		var svg;
		var path;
		var text;
		var numberOfText;
		var textToMove;
		var circleOfTextToMove;
		var gOfTextToMove;
		var startMoveX, startMoveY;
		var pathArray;
		var layer1Group;
		var movementLayer;
		var viewElementG;
		var id;
		var screenXCorrection, screenYCorrection; 
		var xmlString;
		var xArray = new Array();
		var yArray = new Array();
		var viewArray = new Array();
		var pathsToMoveInDeleteRect = new Array();
		var numberOfEventListener;
		var deleteRect;
		var receivedImage, addimage, startX, startY, Line, Rect, Circle, Ellipse;
		var movingText = false;		
		var activeButtonElement;
		var url = location.href;
		var id = location.search;
		
		//============================================================================	
		
		if (!id){		
		id = makeid();
		id = id.replace(" ", "");
		window.location.replace(url+"?"+id);		
		}				
		
		function makeid() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for( var i=0; i < 6; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
		}	
		
		//============================================================================			
		
		function activeButton(element) {
		element.style.background="#a2a2a2";
		}
		
		//============================================================================	

		function deactiveButton(element) {
			if(activeButtonElement !== element) {
			element.style.background="none";
			}
		} 
				
		//============================================================================	
		
		function setActiveButton(element) {
			if(activeButtonElement != undefined) {
				if(activeButtonElement !== element) {
				activeButtonElement.style.background="none";
				}
			}
		activeButtonElement = element;
		}
		
		//============================================================================
					
		function createViewElementForPath() {
		viewElementG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		viewElementG.setAttribute('class', "viewelement");
		viewElementG.setAttribute('transform', "translate(0,0)");
		movementLayer.appendChild(viewElementG);
		}
		
		//============================================================================

		function init() {
		svg = document.getElementById('svgID');
		layer = document.getElementsByClassName('layer')[0];
		
		movementLayer = document.getElementById('movement');

		screenXCorrection = screen.width * 0.0;
		screenYCorrection = screen.height * 0.0;
			
		id = id.replace("?", "");
		deserializeSVGtoXML();	
		drawIt();
		}

		function deserializeSVGtoXML() {		
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=function() {
			if(xmlhttp.readyState==4 && xmlhttp.status==200) {
			var xmlString = xmlhttp.responseText;
			var x;
			xmlString = xmlString.replace("<html>", "");
			xmlString = xmlString.replace("<head><title>Conexao EditorMm</title>", "");
			xmlString = xmlString.replace("</head> <body>", "");
			xmlString = xmlString.trim();
			xmlString = xmlString.substring(1, xmlString.length);
			xmlArray = xmlString.split("><");
		
			var layerElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			var movementElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			var viewElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		
				for(i=0; i<xmlArray.length; i++) {			
					switch(xmlArray[i].substr(0, 1)) {
						case "g":
							if(xmlArray[i].indexOf('class="layer"') != -1) {						
							var attributeString = xmlArray[i].substr(1, xmlArray[i].length);
							var attributeArray = attributeString.split('"');

								for(j=0; j<attributeArray.length-1; j=j+2) {
								var attributeName = attributeArray[j].trim();
								attributeName = attributeName.substring(0, attributeName.length-1);
								var attributeValue = attributeArray[j+1];
								layerElement.setAttribute(attributeName, attributeValue);
								}
							} else if(xmlArray[i].indexOf('class="movementClass"') != -1) {									
									var attributeString = xmlArray[i].substr(1, xmlArray[i].length);
									var attributeArray = attributeString.split('"');

										for(j=0; j<attributeArray.length-1; j=j+2) {
										var attributeName = attributeArray[j].trim();
										attributeName = attributeName.substring(0, attributeName.length-1);
										var attributeValue = attributeArray[j+1];
										movementElement.setAttribute(attributeName, attributeValue);
										}
									} else if(xmlArray[i].indexOf('class="viewelement"') != -1) {										
											var attributeString = xmlArray[i].substr(1, xmlArray[i].length);
											var attributeArray = attributeString.split('"');
												if(viewElement.hasChildNodes && attributeArray.length>4) {												
												viewElementTemp = document.createElementNS('http://www.w3.org/2000/svg', 'g');
												viewElement = viewElementTemp;
												movementElement.appendChild(viewElement);
												}
												 
												if(attributeArray.length>4){
													for(j=0; j<attributeArray.length-1; j=j+2) {
													var attributeName = attributeArray[j].trim();
													attributeName = attributeName.substring(0, attributeName.length-1);
													var attributeValue = attributeArray[j+1];
													viewElement.setAttribute(attributeName, attributeValue);
													}
												}
											}
								 
						break;
						case "p":							
							var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
							var attributeString = xmlArray[i].substr(4, xmlArray[i].length);
							var attributeArray = attributeString.split('"');

								for(j=0; j<attributeArray.length-1; j=j+2) {
								var attributeName = attributeArray[j].trim();
								attributeName = attributeName.substring(0, attributeName.length-1);
								var attributeValue = attributeArray[j+1];
								path.setAttribute(attributeName, attributeValue);
								}
							viewElement.appendChild(path);
							movementElement.appendChild(viewElement);
						break;
						case "t":
							if ((xmlArray[i].substr(0, 1) == "t")){							
							var text =  document.createElementNS('http://www.w3.org/2000/svg', 'text');
							var textArray =  xmlArray[i].split(">");
							var attributeString = textArray[0].substr(4, textArray[0].length);							
							var attributeArray = attributeString.split('"');
								for(j=0; j<attributeArray.length-1; j=j+2) {
								var attributeName = attributeArray[j].trim();
								attributeName = attributeName.substring(0, attributeName.length-1);
								var attributeValue = attributeArray[j+1];
								text.setAttribute(attributeName, attributeValue);
								}
								if ((typeof textArray[1] != 'undefined')){
								var aux = textArray[1].substr(0, textArray[1].length -6);
								aux = aux.replace("|", "");	
								var textNode = document.createTextNode(aux);
								text.appendChild(textNode);
								viewElement.appendChild(text);
								movementElement.appendChild(viewElement);
								}
							}
						break;
						case "i":							
							if ((xmlArray[i].substr(0, 1) == "i")){							
							var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
							var attributeString = xmlArray[i].substr(5, xmlArray[i].length);
							var attributeArray = attributeString.split('"');
								for(j=0; j<attributeArray.length-3; j=j+2) {	
								var attributeName = attributeArray[j].trim();
								attributeName = attributeName.substring(0, attributeName.length-1);
								var attributeValue = attributeArray[j+1];
									if (attributeName == 'xlink:href')
									image.setAttributeNS('http://www.w3.org/1999/xlink', attributeName, attributeValue);
									else
									image.setAttributeNS(null, attributeName, attributeValue);
								}
								viewElement.appendChild(image);
								movementElement.appendChild(viewElement);
							}
						break;
						case "e":							
							var ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
							var attributeString = xmlArray[i].substr(7, xmlArray[i].length);
							var attributeArray = attributeString.split('"');
								for(j=0; j<attributeArray.length-1; j=j+2) {
								var attributeName = attributeArray[j].trim();
								attributeName = attributeName.substring(0, attributeName.length-1);
								var attributeValue = attributeArray[j+1];
								ellipse.setAttribute(attributeName, attributeValue);
								}
							viewElement.appendChild(ellipse);
							movementElement.appendChild(viewElement);
						break;
						case "c":							
							var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
							var attributeString = xmlArray[i].substr(6, xmlArray[i].length);
							var attributeArray = attributeString.split('"');
								for(j=0; j<attributeArray.length-1; j=j+2) {
								var attributeName = attributeArray[j].trim();
								attributeName = attributeName.substring(0, attributeName.length-1);
								var attributeValue = attributeArray[j+1];
								circle.setAttribute(attributeName, attributeValue);
								}
							viewElement.appendChild(circle);
							movementElement.appendChild(viewElement);
						break;
						case "r":							
							var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
							var attributeString = xmlArray[i].substr(4, xmlArray[i].length);
							var attributeArray = attributeString.split('"');
								for(j=0; j<attributeArray.length-1; j=j+2) {
								var attributeName = attributeArray[j].trim();
								attributeName = attributeName.substring(0, attributeName.length-1);
								var attributeValue = attributeArray[j+1];
								rect.setAttribute(attributeName, attributeValue);
								}
							viewElement.appendChild(rect);
							movementElement.appendChild(viewElement);
						break;
						case "l":							
							var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
							var attributeString = xmlArray[i].substr(4, xmlArray[i].length);
							var attributeArray = attributeString.split('"');
								for(j=0; j<attributeArray.length-1; j=j+2) {
								var attributeName = attributeArray[j].trim();
								attributeName = attributeName.substring(0, attributeName.length-1);
								var attributeValue = attributeArray[j+1];
								line.setAttribute(attributeName, attributeValue);
								}
							viewElement.appendChild(line);
							movementElement.appendChild(viewElement);
						break;
						case "/":
						break;
					}
				}    
				if (viewElement){
				layerElement.appendChild(movementElement);
				svg.replaceChild(layerElement, layer);
				layer = layerElement;
				movementLayer = movementElement;
				}
			} 
		}
		xmlhttp.open("POST", "dml/consulta.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		
		xmlhttp.send("id="+id);
		}
		
		//============================================================================
		
		function removeEventListenerFromSVG(listenerNumber) {		
			switch (listenerNumber) {
				case 1 :
					//remove draw-Listener
					svg.removeEventListener('mousedown', startPath, false);
					svg.removeEventListener('mousemove', drawPathLine, false);
					svg.removeEventListener('mouseup', endPath, false);
				break;
				case 2 :
					//remove move-Listener
					svg.removeEventListener('mousedown', startMove, false);
					svg.removeEventListener('mousemove', calcMoveingPathes, false);
					svg.removeEventListener('mouseup', endMove, false);
					movingText = false;
				break;
				case 3 :
					//remove delete-Listener
					svg.removeEventListener('mousedown', startDeleteRect, false);
					svg.removeEventListener('mousemove', drawDeleteRect, false);
					svg.removeEventListener('mouseup', deleteFromSVG, false);
				break;
				case 4 :
					//remove move-Path-Listener
					svg.removeEventListener('mousedown', startDeleteRect, false);
					svg.removeEventListener('mousemove', drawDeleteRect, false);
					svg.removeEventListener('mouseup', movePathesByRect, false);
				case 5 :
					//remove write-Listener
					svg.removeEventListener('click', startWrite, false);
					svg.removeEventListener('mousemove', moveText, false);
					window.removeEventListener('keydown', writeDown, false);
				case 6 :
					//remove Circle-Listener
					svg.removeEventListener('mousedown', startCircle, false);
					svg.removeEventListener('mousemove', drawCircle, false);
					svg.removeEventListener('mouseup', endCircle, false);
				case 7 :  
					//remove Rect-Listener
					svg.removeEventListener('mousedown', startRect, false);
					svg.removeEventListener('mousemove', drawRect, false);
					svg.removeEventListener('mouseup', endRect, false);
				case 8 :  
					//remove Ellipse-Listener
					svg.removeEventListener('mousedown', startEllipse, false);
					svg.removeEventListener('mousemove', drawEllipse, false);
					svg.removeEventListener('mouseup', endEllipse, false);
				case 9 :  
					//remove Line-Listener
					svg.removeEventListener('mousedown', startLine, false);
					svg.removeEventListener('mousemove', drawLine, false);
					svg.removeEventListener('mouseup', endLine, false);
				case 10 :  
					//remove ReadFile-Listener
					svg.removeEventListener('mousedown', startResize, false);
					svg.removeEventListener('mousemove', resize, false);
					svg.removeEventListener('mouseup', endResize, false);				
				default:				
				break;
			}
		}
		
		//============================================================================
		
		function writeIt() { 
			if (numberOfEventListener !=2 && movingText == false){
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 5;
			svg.addEventListener('click', startWrite, false);
			svg.addEventListener('mousemove', moveText, false);
			window.addEventListener('keydown', writeDown, false);
			}
		}
		
		function startWrite(event) {

			var sx = event.clientX;
			var sy = event.clientY - screenYCorrection; 
			var activateExistingText = false;
			var texts = document.getElementsByTagName('text');
			
				for(var i=0; i<texts.length; i++) {
				var tx = parseInt(texts[i].getAttribute('x'));
				var ty = parseInt(texts[i].getAttribute('y'));
					if( ((tx-10) < sx) && (sx < tx) && (ty < sy) && (sy < (ty+10)) ) {
					activateExistingText = true;
					text = texts[i];
					}
				}
	
			if(activateExistingText == false) {

			createViewElementForPath();
			var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			circle.setAttribute('cx', sx-3);
			circle.setAttribute('cy', sy-3);
			circle.setAttribute('r', 2);
			circle.setAttribute('stroke', "black");
			circle.setAttribute('stroke-width', 1);
			circle.setAttribute('fill', "black");
			circle.setAttribute('id', "c"+numberOfText);
			circle.setAttribute('onmouseover', 'removeEventListenerFromSVG(5);');
			circle.setAttribute('onmouseout', 'writeIt();');
			circle.setAttribute('onmousedown', 'startMoveText(this);');		
			
			circle.addEventListener('mouseup', endMoveText, false);				
			
			viewElementG.appendChild(circle);			
			
			text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			text.setAttribute('x', sx);
			text.setAttribute('y', sy);
			text.setAttribute('font-family', font);
			text.setAttribute('font-size', size);
			text.setAttribute('font-style', style);
			text.setAttribute('fill', colorFill);
			text.setAttribute('stroke', colorStroke);
			text.setAttribute('text-decoration', decoration);			 
			
			text.setAttribute('id', "tc"+numberOfText);		

			viewElementG.appendChild(text);
			numberOfText++;
			} else {
			
			}
		}
		
		function moveText(event) {	
			if(isMousePressed == true) {
			var sx = event.clientX;
			var sy = event.clientY - screenYCorrection;	  
	   
			var movementTextStartX = parseInt(circleOfTextToMove.getAttribute('cx'));
			var movementTextStartY = parseInt(circleOfTextToMove.getAttribute('cy'));

			var tempX;
			var tempY;

			tempX = (sx - movementTextStartX);
			tempY = (sy - movementTextStartY);

			gOfTextToMove.setAttribute('transform', "translate("+tempX+","+tempY+")");	  
			}
		}  
		
		function writeDown(event) {
		var temp = text.innerHTML;
		var character;
			switch(event.key) {
				case 'Shift':					
				break;
				case 'Tab':
					temp = temp.slice(0,-2);
					text.innerHTML = temp;
				break;
				case 'Backspace':
					temp = temp.slice(0,-1);
					text.innerHTML = temp;
				break;
				case 'Enter':
				break;
				default:					
					text.innerHTML = temp + event.key;
				break;
			}
		}
		
		function startMoveText(element) {
			isMousePressed = true;
			circleOfTextToMove = element;
			gOfTextToMove = element.parentNode;
		}
		
		function endMoveText(event) {			
			createViewElementForPath();
			viewElementG.appendChild(text);
			isMousePressed = false;		
		}
		
		//============================================================================
		
		function drawIt() {
		removeEventListenerFromSVG(numberOfEventListener);
	    numberOfEventListener = 1;
		
	    svg.addEventListener('mousedown', startPath, false);
	    svg.addEventListener('mousemove', drawPathLine, false);
	    svg.addEventListener('mouseup', endPath, false);
		}
		
		function startPath(event) {		
		path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		var sx = event.clientX;
		var sy = event.clientY - screenYCorrection;
		var startPosition = "M"+sx+" "+sy;
		path.setAttribute('id', 'pathID');
		path.setAttribute('d', startPosition);
		path.setAttribute('fill', 'none');
		path.setAttribute('stroke', color);
		path.setAttribute('stroke-width', width);
		svg.appendChild(path);
		isMousePressed = true;
		}

		function drawPathLine(event) {
			if(isMousePressed) {      
            var sx = event.clientX;
            var sy = event.clientY - screenYCorrection;
            var dString = path.getAttribute('d');
            dString += ' L'+sx+' '+sy;
            path.setAttribute('d', dString);
            }
		}
		
		function endPath(event) {		
		createViewElementForPath();
		viewElementG.appendChild(path);
		isMousePressed = false;
		}		
		
		//============================================================================
		
		function CreateCircle(){
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 6;
			
		svg.addEventListener('mousedown', startCircle, false);
		svg.addEventListener('mousemove', drawCircle, false);
		svg.addEventListener('mouseup', endCircle, false);
		}	
		
		function startCircle(event) {
		startX = event.clientX;
		startY = event.clientY-screenYCorrection;
		Circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		Circle.setAttribute('cx', startX);
		Circle.setAttribute('cy', startY);
		Circle.setAttribute('fill', "none");
		Circle.setAttribute('stroke', color);
		Circle.setAttribute('stroke-width', width);
		svg.appendChild(Circle);
		isMousePressed = true;
		}
	
		function drawCircle(event) {
			if(isMousePressed) {
			var moveX, moveY;
			moveX = event.clientX;
			moveY = event.clientY-screenYCorrection;

			var diffX = moveX - startX;
			var diffY = moveY - startY;
				if(diffX <0) {
				  //movement left
				  Circle.setAttribute('cx', moveX);
				  Circle.setAttribute('r', (diffX*(-1)));
				} else {
				  //movement right
				  Circle.setAttribute('r', diffX);
				}
				if(diffY <0) {
				  //movement up
				  Circle.setAttribute('y', moveY);
				  Circle.setAttribute('r', (diffY*(-1)));
				} else {
				  //movement down
				  Circle.setAttribute('r', diffY);
				}
			}
		}

		function endCircle(event) {
		createViewElementForPath();
		viewElementG.appendChild(Circle);
		isMousePressed = false;
		}		
		
		//============================================================================
	
		function CreateRect() { 
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 7;
		   
		svg.addEventListener('mousedown', startRect, false);		   
		svg.addEventListener('mousemove', drawRect, false);
		svg.addEventListener('mouseup', endRect, false);
		}
		
		function startRect(event) {
		startX = event.clientX;
		startY = event.clientY-screenYCorrection;
		Rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		Rect.setAttribute('x', startX);
		Rect.setAttribute('y', startY);
		Rect.setAttribute('fill', "none");
		Rect.setAttribute('stroke', color);
		Rect.setAttribute('stroke-width', width);
		svg.appendChild(Rect);
		isMousePressed = true;
		}
		
		function drawRect(event) {
			if(isMousePressed) {
			var moveX, moveY;
			moveX = event.clientX;
			moveY = event.clientY-screenYCorrection;

			var diffX = moveX - startX;
			var diffY = moveY - startY;
				if(diffX <0) {
				//movement left
				Rect.setAttribute('x', moveX);
				Rect.setAttribute('width', (diffX*(-1)));
				} else {
				 //movement right
				Rect.setAttribute('width', diffX);
				}
				if(diffY <0) {
				//movement up
				Rect.setAttribute('y', moveY);
				Rect.setAttribute('height', (diffY*(-1)));
				} else {
				//movement down
				Rect.setAttribute('height', diffY);
				}
			}
		}
		
		function endRect(event) {
		createViewElementForPath();
		viewElementG.appendChild(Rect);
		isMousePressed = false;
		}
		
		//============================================================================
	
		function CreateEllipse() { 
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 8;
		   
		svg.addEventListener('mousedown', startEllipse, false);
		svg.addEventListener('mousemove', drawEllipse, false);
		svg.addEventListener('mouseup', endEllipse, false);
		}
		
		function startEllipse(event) {
		startX = event.clientX;
		startY = event.clientY-screenYCorrection;
		Ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
		Ellipse.setAttribute('cx', startX);
		Ellipse.setAttribute('cy', startY);
		Ellipse.setAttribute('fill', "none");
		Ellipse.setAttribute('stroke', color);
		Ellipse.setAttribute('stroke-width', width);
		svg.appendChild(Ellipse);
		isMousePressed = true;
		}
	
		function drawEllipse(event) {
			if(isMousePressed) {
			var moveX, moveY;
			moveX = event.clientX;
			moveY = event.clientY-screenYCorrection;

			var diffX = moveX - startX;
			var diffY = moveY - startY;
				if(diffX <0) {
				//movement left
				Ellipse.setAttribute('cx', moveX);
				Ellipse.setAttribute('rx', (diffX*(-1)));
				} else {
				//movement right
				Ellipse.setAttribute('rx', diffX);
				}
				if(diffY <0) {
				//movement up
				Ellipse.setAttribute('y', moveY);
				Ellipse.setAttribute('ry', (diffY*(-1)));
				} else {
				//movement down
				Ellipse.setAttribute('ry', diffY);
				}
			}
		}
		
		function endEllipse(event) {
		createViewElementForPath();
		viewElementG.appendChild(Ellipse);
		isMousePressed = false;
		}
		
		//============================================================================
		
		function CreateLine(){
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 9;
			
		svg.addEventListener('mousedown', startLine, false);
		svg.addEventListener('mousemove', drawLine, false);
		svg.addEventListener('mouseup', endLine, false);
		}	
		
		function startLine(event) {		
		startX = event.clientX;
		startY = event.clientY-screenYCorrection;
		Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		Line.setAttribute('x1', startX);
		Line.setAttribute('y1', startY);
		Line.setAttribute('fill', "none");
		Line.setAttribute('stroke', color);
		Line.setAttribute('stroke-width', width);
		svg.appendChild(Line);
		isMousePressed = true;
		}
		
		function drawLine(event) {
			if(isMousePressed) {
			var moveX, moveY;
			moveX = event.clientX;
			moveY = event.clientY-screenYCorrection;
			var diffX = moveX ;
			var diffY = moveY ;
    
				if(diffX <0) {
				//movement left
				Line.setAttribute('x1', startX);
				Line.setAttribute('x2', (diffX*(-1)));
				} else {
				//movement right
				Line.setAttribute('x2', diffX);
				}
				
				if(diffY <0) {
				//movement up
				Line.setAttribute('y1', startY);
				Line.setAttribute('y2', (diffY*(-1)));
				} else {
				//movement down
				Line.setAttribute('y2', diffY);
				}
			}
		}	
		
		function endLine(event) {
		createViewElementForPath();
		viewElementG.appendChild(Line);
		isMousePressed = false;
		}
		
		//============================================================================
		
		function drawGrid(){
		var y;
			for (y=30; y<960; y+=30){
			Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			Line.setAttribute('x1', 0);
			Line.setAttribute('y1', y);
			Line.setAttribute('x2', 2000);
			Line.setAttribute('y2', y);
			Line.setAttribute('fill', "none");
			Line.setAttribute('stroke', "black");
			Line.setAttribute('stroke-width', 0.75);
			svg.appendChild(Line);
			createViewElementForPath();
			viewElementG.setAttribute('id', "grid");
			viewElementG.appendChild(Line);
			}
		}
		
		//============================================================================
		
		function clearGrid() {
		var tempView = movementLayer.getElementsByClassName('viewelement');
			for(j=0; j<=4; j++){
				for(i=0; i<tempView.length; i++) {
					if(tempView[i].getAttribute('id') == "grid") {
					movementLayer.removeChild(tempView[i]);
					}
				}
			}
		}
				
		//============================================================================
		
		function moveIt() {
		removeEventListenerFromSVG(numberOfEventListener);

	    svg.addEventListener('mousedown', startMove, false);
	    svg.addEventListener('mousemove', calcMoveingPathes, false);
	    svg.addEventListener('mouseup', endMove, false);
	    numberOfEventListener = 2;
		}
		
		function startMove(event) {
		isMousePressed = true;
		startMoveX = event.clientX;
		startMoveY = event.clientY-screenYCorrection;		
		viewArray = document.getElementsByClassName('viewelement');
			for(h=0; h<viewArray.length; h++) {
			xArray[h] = getXandYTransformValues(viewArray[h]).x;
			yArray[h] = getXandYTransformValues(viewArray[h]).y;
			}
		}
		
		function calcMoveingPathes(event) {
			if(isMousePressed) {
			var xMovement = event.clientX;
			var yMovement = event.clientY;	 
				for(h=0; h<viewArray.length; h++) {
				var x, y; 		
				var pathArray = viewArray[h].getElementsByTagName('path');
				var pathIn = false;
					if(pathArray.length>0){
						for(i=0; i<pathArray.length; i++) {
						var dAttributeString = pathArray[i].getAttribute('d');
						var splitArray = dAttributeString.split(" ");
						var xMoveArray = new Array();
							for(j=0; j<splitArray.length; j=j+2) {
							xMoveArray.push(xArray[h]*1 + parseInt(splitArray[j].substr(1,splitArray[j].length)));
							}

						var yMoveArray = new Array();
						
							for(l=1; l<splitArray.length; l=l+2) {
							yMoveArray.push(yArray[h]*1 + parseInt(splitArray[l]));
							}		
							
							for(g=0; g<xArray.length; g++) {
								if(pathIn == false) {
									if( ((startMoveX-50)  < (xMoveArray[g]*1)) && ((xMoveArray[g]*1)  < (startMoveX +50)) && ((startMoveY-50) < (yMoveArray[g]*1) ) && ((yMoveArray[g]*1) < (startMoveY+50)) ) {
									pathIn = true;
									}
								}
							}
						}
					}else{
					var arrayDel = viewArray[h].getElementsByTagName('rect');
						if(arrayDel.length==1){
						x = 1*arrayDel[0].getAttribute("x") + 1*(arrayDel[0].getAttribute("width")/2); 
						y = 1*arrayDel[0].getAttribute("y") + 1*(arrayDel[0].getAttribute("height")/2); 
						}else{
						arrayDel = viewArray[h].getElementsByTagName('circle');
							if(arrayDel.length==1){
							x = arrayDel[0].getAttribute("cx"); 
							y = arrayDel[0].getAttribute("cy"); 
							movingText = true;
							}else{
							arrayDel = viewArray[h].getElementsByTagName('line');
								if(arrayDel.length==1){
								x = 1*arrayDel[0].getAttribute("x1") + ((1*arrayDel[0].getAttribute("x2") - 1*arrayDel[0].getAttribute("x1"))/2);
								y = 1*arrayDel[0].getAttribute("y1") + ((1*arrayDel[0].getAttribute("y2") - 1*arrayDel[0].getAttribute("y1"))/2);
								}else{
								arrayDel = viewArray[h].getElementsByTagName('ellipse');
									if(arrayDel.length==1){
									x = arrayDel[0].getAttribute("cx"); 
									y = arrayDel[0].getAttribute("cy"); 
									}else{
									arrayDel = viewArray[h].getElementsByTagName('image');
										if(arrayDel.length==1){
										x = 1*arrayDel[0].getAttribute("x") + 1*(arrayDel[0].getAttribute("width")/2); 
										y = 1*arrayDel[0].getAttribute("y") + 1*(arrayDel[0].getAttribute("height")/2);  
										}
									}
								}
				
				
							}	
						}
					}
						if(viewArray[h].getAttribute('id') != "grid"){
							if(((startMoveX <=(1*x+50+1*xArray[h])) &&(startMoveX >=(1*x-50+1*xArray[h])))&&((startMoveY <=(1*y+50+1*yArray[h])) && (startMoveY >=(1*y-50+1*yArray[h])))||pathIn){
								if( (xMovement >=  startMoveX) && (yMovement >= startMoveY)) {
								//translation right and down								
								var transformString = "translate("+(xArray[h]+(xMovement-startMoveX)).toString()+","+(yArray[h]+(yMovement-startMoveY-screenYCorrection)).toString()+")";
								viewArray[h].setAttribute('transform', transformString);
								} else if( (xMovement < startMoveX) && (yMovement >= startMoveY) ) {
										//translation left and down
										var transformString = "translate("+(xArray[h]-(startMoveX-xMovement)).toString()+","+(yArray[h]+(yMovement-startMoveY-screenYCorrection)).toString()+")";
										viewArray[h].setAttribute('transform', transformString);
										} else if( (xMovement < startMoveX) && (yMovement < startMoveY) ) {
												//translation left and up
												var transformString = "translate("+(xArray[h]-(startMoveX-xMovement)).toString()+","+(yArray[h]-(startMoveY-yMovement-screenYCorrection)).toString()+")";
												viewArray[h].setAttribute('transform', transformString);
												} else {
												//translation right and up
												var transformString = "translate("+(xArray[h]+(xMovement-startMoveX)).toString()+","+(yArray[h]-(startMoveY-yMovement-screenYCorrection)).toString()+")";
												viewArray[h].setAttribute('transform', transformString);
												} 
							}
						}
				}   
			}
		}
		
		function endMove(event) {
		isMousePressed = false;
		}
		
		function getXandYTransformValues(groupElement) {
		var transformValue = groupElement.getAttributeNode('transform').value;
		var tempValue = transformValue.substr(10, transformValue.lastIndexOf(")"));
		var pointArray = new Array();
		pointArray = tempValue.split(",");
		return {
				x: parseInt(pointArray[0]),
				y: parseInt(pointArray[1])
			   };
		}
		
		//============================================================================
		
		function deleteFromSVGRect() { 
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 3;
		   
		svg.addEventListener('mousedown', startDeleteRect, false);
		svg.addEventListener('mousemove', drawDeleteRect, false);
		svg.addEventListener('mouseup', deleteFromSVG, false);
		}
		
		function startDeleteRect(event) {
		startX = event.clientX;
		startY = event.clientY-screenYCorrection;
		deleteRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		deleteRect.setAttribute('x', startX);
		deleteRect.setAttribute('y', startY);
		deleteRect.setAttribute('fill', "none");
		deleteRect.setAttribute('stroke', "red");
		deleteRect.setAttribute('stroke-width', "3");
		svg.appendChild(deleteRect);
		isMousePressed = true;
		}
		
		function drawDeleteRect(event) {
			if(isMousePressed) {
			var moveX, moveY;
			moveX = event.clientX;
			moveY = event.clientY-screenYCorrection;

			var diffX = moveX - startX;
			var diffY = moveY - startY;
				if(diffX <0) {
				//movement left
				deleteRect.setAttribute('x', moveX);
				deleteRect.setAttribute('width', (diffX*(-1)));
				} else {
				//movement right
				deleteRect.setAttribute('width', diffX);
				}
				if(diffY <0) {
				//movement up
				deleteRect.setAttribute('y', moveY);
				deleteRect.setAttribute('height', (diffY*(-1)));
				} else {
				//movement down
				deleteRect.setAttribute('height', diffY);
				}
			}
		}
		
		function deleteFromSVG(event) {
		isMousePressed = false;
		
		var leftXRect = parseInt(deleteRect.getAttribute('x'));
		var leftYRect = parseInt(deleteRect.getAttribute('y'));
		var rightXRect = parseInt(deleteRect.getAttribute('width')) + leftXRect;
		var rightYRect = parseInt(deleteRect.getAttribute('height')) + leftYRect;

		var viewElementArray = document.getElementsByClassName('viewelement');
		var arrayOfPathToDelete = new Array();
			for(h=0; h<viewElementArray.length; h++) {
				if(arrayOfPathToDelete.length!=0) {
				arrayOfPathToDelete = new Array();
				}
			var xTranslation = getXandYTransformValues(viewElementArray[h]).x;
			var yTranslation = getXandYTransformValues(viewElementArray[h]).y;    
			
            var pathArray = viewElementArray[h].getElementsByTagName('path');            
				if(pathArray.length>0){
					for(i=0; i<pathArray.length; i++) {
					var dAttributeString = pathArray[i].getAttribute('d');
					var splitArray = dAttributeString.split(" ");
					var xArray = new Array();
						for(j=0; j<splitArray.length; j=j+2) {
						xArray.push(xTranslation*1 + parseInt(splitArray[j].substr(1,splitArray[j].length)));
						}

					var yArray = new Array();
						for(l=1; l<splitArray.length; l=l+2) {
						yArray.push(yTranslation*1 + parseInt(splitArray[l]));
						}
						
					var pathIn = false;
						for(g=0; g<xArray.length; g++) {
							if(pathIn == false) {
								if( (leftXRect  < (xArray[g]*1)) && ((xArray[g]*1)  < rightXRect) && (leftYRect  < (yArray[g]*1) ) && ((yArray[g]*1) < rightYRect) ) {
								pathIn = true;
								}
							}
						}	
						
						if(pathIn == true) {
						arrayOfPathToDelete.push(pathArray[i]);
						}
					}
					
					for(b=0; b<arrayOfPathToDelete.length; b++) {
					viewElementArray[h].removeChild(arrayOfPathToDelete[b]);
					}					
				}else{
				var x, y; 
				var arrayDel = viewElementArray[h].getElementsByTagName('rect');
					if(arrayDel.length==1){
					x = 1*arrayDel[0].getAttribute("x") + 1*(arrayDel[0].getAttribute("width")/2); 
					y = 1*arrayDel[0].getAttribute("y") + 1*(arrayDel[0].getAttribute("height")/2); 
					}else{
					arrayDel = viewElementArray[h].getElementsByTagName('circle');
						if(arrayDel.length==1){
						x = arrayDel[0].getAttribute("cx"); 
						y = arrayDel[0].getAttribute("cy"); 
						}else{							
							arrayDel = viewElementArray[h].getElementsByTagName('line');
							if(arrayDel.length==1){
							x = 1*arrayDel[0].getAttribute("x1") + ((1*arrayDel[0].getAttribute("x2") - 1*arrayDel[0].getAttribute("x1"))/2);
							y = 1*arrayDel[0].getAttribute("y1") + ((1*arrayDel[0].getAttribute("y2") - 1*arrayDel[0].getAttribute("y1"))/2);
							}else{
								arrayDel = viewElementArray[h].getElementsByTagName('ellipse');
								if(arrayDel.length==1){
								x = arrayDel[0].getAttribute("cx"); 
								y = arrayDel[0].getAttribute("cy"); 
								}else{
									arrayDel = viewElementArray[h].getElementsByTagName('image');
									if(arrayDel.length==1){
									x = 1*arrayDel[0].getAttribute("x") + 1*(arrayDel[0].getAttribute("width")/2); 
									y = 1*arrayDel[0].getAttribute("y") + 1*(arrayDel[0].getAttribute("height")/2); 
									}
								}
							}			
						}	
					}
					if(arrayDel.length==1 && viewElementArray[h].getAttribute('id') != "grid"){				
						if( (leftXRect < (x*1+xTranslation*1)) && ((x*1+xTranslation*1)  < rightXRect) && (leftYRect  < (y*1+yTranslation*1) ) && ((y*1+yTranslation*1)   < rightYRect) ) {
						var text = viewElementArray[h].getElementsByTagName('text');
							if(text.length)
							viewElementArray[h].removeChild(text[0]);
							viewElementArray[h].removeChild(arrayDel[0]);
						}
					}
				
				}		 
			} 

			svg.removeChild(deleteRect);
			clearSVGFromUnusedViews();
		}
		
		function clearSVGFromUnusedViews() {
		var tempView = movementLayer.getElementsByClassName('viewelement');
			for(i=0; i<tempView.length; i++) {
				if(tempView[i].childElementCount == 0) {
				movementLayer.removeChild(tempView[i]);
				}
			}
		}
		
		//============================================================================
		
		function readURL(event) {
			var reader = new FileReader();
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 10;
			
			svg.addEventListener('mousedown', startResize, false);
			svg.addEventListener('mousemove', resize, false);
			svg.addEventListener('mouseup', endResize, false);
			
			reader.onloadend = function() {
			receivedImage = reader.result;			
			}
			reader.readAsDataURL(event.target.files[0]);			
		}
		
		function startResize(event){
			createViewElementForPath();
			addimage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
			startX = event.clientX;
			startY = event.clientY - screenYCorrection; 
			addimage.setAttribute('x', startX);
			addimage.setAttribute('y', startY);
			addimage.setAttribute('width', "200px");
			addimage.setAttribute('height', "300px"); 
			addimage.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', receivedImage);
			viewElementG.appendChild(addimage);
			isMousePressed = true;	
		}
		
		function resize(event) {   
			if(isMousePressed) {
			var moveX, moveY;
			moveX = event.clientX;
			moveY = event.clientY-screenYCorrection;

			var diffX = moveX - startX;
			var diffY = moveY - startY;
				if(diffX <0) {
				//movement left				
				addimage.setAttribute('width', (diffX*(-1)));
				} else {
				//movement right
				addimage.setAttribute('width', diffX);
				}
				if(diffY <0) {
				//movement up				
				addimage.setAttribute('height', (diffY*(-1)));
				} else {
				//movement down
				addimage.setAttribute('height', diffY);
				}
			}
		}
	
		function endResize(event) {
			createViewElementForPath();
			viewElementG.appendChild(addimage);
			isMousePressed = false;
		}
		
		//============================================================================

		function save_image(){		
		var serializer = new XMLSerializer();
		var xmlString = serializer.serializeToString(layer);

		canvg(document.getElementById('canvas'), xmlString);
		var canvas = document.getElementById("canvas");
		var context=canvas.getContext("2d");
		var backgroundColor="white";
	
		var w = canvas.width;
		var h = canvas.height;
		var data;   
		var dataURL
		var compositeOperation  = context.globalCompositeOperation;
    
		data = context.getImageData(0, 0, w, h);			
	
		context.globalCompositeOperation = "destination-over";     
        context.fillStyle = backgroundColor;     
        context.fillRect(0,0,w,h);
    
		var dataURL = canvas.toDataURL();
		
		window.open(dataURL, "_self");
	
		context.clearRect(0, 0, w, h);
		context.globalCompositeOperation = compositeOperation;   
		}
		
		//============================================================================
		
		function download() {
		var serializer = new XMLSerializer();
		var xmlString = serializer.serializeToString(layer);

		canvg(document.getElementById('canvas'), xmlString);
		var canvas = document.getElementById("canvas");
		var context=canvas.getContext("2d");
		var backgroundColor="white";
	
		var w = canvas.width;
		var h = canvas.height;
		var data;   
		var dataURL
		var compositeOperation  = context.globalCompositeOperation;
    
		data = context.getImageData(0, 0, w, h);				
	
		context.globalCompositeOperation = "destination-over";     
        context.fillStyle = backgroundColor;     
        context.fillRect(0,0,w,h);
		
		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
		window.location.href = image;
		}
		
		//============================================================================
		
		function serializeSVGtoXML() {	
		var serializer = new XMLSerializer();
		var xmlString = serializer.serializeToString(layer);
		xmlString.replace("</t", "><");
		var encoded = encodeURIComponent(xmlString);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST","dml/armazena.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("id="+id+"&svg="+encoded);
		}
		
		//============================================================================
		
		function createPDF() {	
		var serializer = new XMLSerializer();
		var xmlString = serializer.serializeToString(layer);

		canvg(document.getElementById('canvas'), xmlString);
		var canvas = document.getElementById("canvas");
		var context=canvas.getContext("2d");
		var backgroundColor="white";
		
		var w = canvas.width;
		var h = canvas.height;
		var data;   
		var dataURL
		var compositeOperation  = context.globalCompositeOperation;
		
		data = context.getImageData(0, 0, w, h);
		
		context.globalCompositeOperation = "destination-over";    
        context.fillStyle = backgroundColor;
        context.fillRect(0,0,w,h);
		
		var svg = canvas.toDataURL();		
		var formulario = document.getElementById("formPDF");
		var ctx=canvas.getContext("2d");
		ctx.clearRect(0, 0, w, h);
		formulario.svg.value = svg;
		formulario.action = "pdf/gerarpdf.php";
		formulario.submit();	
		}
		
		//============================================================================		
		
		function setColor(val) {
        color = val;
		}
		
		//============================================================================
		
		function setWidth(val) {
        width = val;
		}
		
		//============================================================================
		
		function setFillText(val) {
        colorFill = val;
			if(colorStroke != "none")
			colorStroke = colorFill;
		}			
		
		//============================================================================
		
		function setFontText(val) {
        font = val;
		}			
		
		//============================================================================
		
		function setStrokeText() {
			if(colorStroke != colorFill)
			colorStroke = colorFill;
			else
			colorStroke = "none";
		}		
		
		//============================================================================
		
		function setDecoration() {
			if (decoration == "underline")
			decoration = "none";
			else
			decoration = "underline";
		}
		
		//============================================================================

		function setStyle() {
			if (style == "italic")
			style = "normal";
			else
			style = "italic";
		}		

		//============================================================================
		
		function setSizeText(val) {
        size = val;
		}
		
		//============================================================================	
