		//http://fenix.nied.unicamp.br/EditorMm/
		var size = "20";	
		var font = "Arial";
		var style  = "normal";
		var decoration = "none";
		var colorFill = "black";
		var colorStroke = "none";
		var color = "black", width = 3;	
				
		var xArray = new Array();
		var yArray = new Array();
		var viewArray = new Array();
		var pathsToMoveInDeleteRect = new Array();	
			
		var id;
		var svg;			
		var pathArray;
		var xmlString;
		var textToMove;	
		var numberOfText;
		var circleOfTextToMove;	
		var gOfTextToMove;		
		var viewElementG;		
		var movementLayer;		
		var activeButtonElement;
		var url = location.href;
		var id = location.search;
		var numberOfEventListener;
		var startMoveX, startMoveY;	
		var screenXCorrection, screenYCorrection; 	
		var receivedImage, image, startX, startY, line, rectangle, circle, ellipse, ponto, path, deleteRect, text;	
	
		
		var movingText = false;	
		var isMousePressed = false;		
		
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
		createDraw();
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
					//remove Draw-Listener
					svg.removeEventListener('mousedown', startDraw, false);
					svg.removeEventListener('mousemove', moveDraw, false);
					svg.removeEventListener('mouseup', endMoveDraw, false);
				break;
				case 2 :
					//remove Move-Listener
					svg.removeEventListener('mousedown', startMoves, false);
					svg.removeEventListener('mousemove', moveMoves, false);
					svg.removeEventListener('mouseup', endMoveMoves, false);
				break;
				case 3 :
					//remove Delete-Listener
					svg.removeEventListener('mousedown', startDelete, false);
					svg.removeEventListener('mousemove', moveDelete, false);
					svg.removeEventListener('mouseup', endMoveDelete, false);
				break;
				case 4 :
					//remove Wite-Listener
					svg.removeEventListener('click', startWrite, false);
					svg.removeEventListener('mousemove', moveWrite, false);
					window.removeEventListener('keydown', writeDown, false);
				case 5 :
					//remove Ponto-Listener
					svg.removeEventListener('mousedown', startPonto, false);
					svg.removeEventListener('mouseup', endMovePonto, false);
				case 6 :
					//remove Circle-Listener
					svg.removeEventListener('mousedown', startCircle, false);
					svg.removeEventListener('mousemove', moveCircle, false);
					svg.removeEventListener('mouseup', endMoveCircle, false);
				case 7 :  
					//remove Rectangle-Listener
					svg.removeEventListener('mousedown', startRectangle, false);
					svg.removeEventListener('mousemove', moveRectangle, false);
					svg.removeEventListener('mouseup', endMoveRectangle, false);
				case 8 :  
					//remove Ellipse-Listener
					svg.removeEventListener('mousedown', startEllipse, false);
					svg.removeEventListener('mousemove', moveEllipse, false);
					svg.removeEventListener('mouseup', endMoveEllipse, false);
				case 9 :  
					//remove Line-Listener
					svg.removeEventListener('mousedown', startLine, false);
					svg.removeEventListener('mousemove', moveLine, false);
					svg.removeEventListener('mouseup', endMoveLine, false);
				case 10 :  
					//remove ReadFile-Listener
					svg.removeEventListener('mousedown', startURL, false);
					svg.removeEventListener('mousemove', moveURL, false);
					svg.removeEventListener('mouseup', endMoveURL, false);				
				default:				
				break;
			}
		}
		
		
		//============================================================================
		
		function createWrite() { 				
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 4;
				
			svg.addEventListener('click', startWrite, false);
			svg.addEventListener('mousemove', moveWrite, false);
			window.addEventListener('keydown', writeDown, false);			
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
				circle.setAttribute('stroke-width', 0.1);
				circle.setAttribute('fill', "black");
				circle.setAttribute('id', "c"+numberOfText);				
				
				circle.addEventListener('mouseup', endMoveWrite, false);				
				
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
		
		function moveWrite(event) {	
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
		
		function startMoveWrite(element) {
			isMousePressed = true;
			circleOfTextToMove = element;
			gOfTextToMove = element.parentNode;
		}
		
		function endMoveWrite(event) {			
			 isMousePressed = false;	
		}
		
		//============================================================================
		
		function createPonto() { 		
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 5;
			
			svg.addEventListener('mousedown', startPonto, false);
			svg.addEventListener('mouseup', endMovePonto, false);	
		}
		
		function startPonto(event) {	
			var sx = event.clientX;
			var sy = event.clientY - screenYCorrection;				
			ponto = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			ponto.setAttribute('cx', sx-3);
			ponto.setAttribute('cy', sy-3);
			ponto.setAttribute('r', 2);			
			ponto.setAttribute('fill', "none");
			ponto.setAttribute('stroke', color);
			ponto.setAttribute('stroke-width', width);			
			svg.appendChild(ponto);
			isMousePressed = true;	
		}
		function endMovePonto(event) {			
			createViewElementForPath();
			viewElementG.appendChild(ponto);
			isMousePressed = false;		
		}
		
		//============================================================================
		
		function createDraw() {
		removeEventListenerFromSVG(numberOfEventListener);
	    numberOfEventListener = 1;
		
	    svg.addEventListener('mousedown', startDraw, false);
	    svg.addEventListener('mousemove', moveDraw, false);
	    svg.addEventListener('mouseup', endMoveDraw, false);
		}
		
		function startDraw(event) {	
		var sx = event.clientX;
		var sy = event.clientY - screenYCorrection;
		var startPosition = "M"+sx+" "+sy;		
		path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('id', 'pathID');
		path.setAttribute('d', startPosition);
		path.setAttribute('fill', 'none');
		path.setAttribute('stroke', color);
		path.setAttribute('stroke-width', width);
		svg.appendChild(path);
		isMousePressed = true;
		}

		function moveDraw(event) {
			if(isMousePressed) {      
            var sx = event.clientX;
            var sy = event.clientY - screenYCorrection;
            var dString = path.getAttribute('d');
            dString += ' L'+sx+' '+sy;
            path.setAttribute('d', dString);
            }
		}
		
		function endMoveDraw(event) {		
		createViewElementForPath();
		viewElementG.appendChild(path);
		isMousePressed = false;
		}		
		
		//============================================================================
		
		function createCircle(){
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 6;
			
		svg.addEventListener('mousedown', startCircle, false);
		svg.addEventListener('mousemove', moveCircle, false);
		svg.addEventListener('mouseup', endMoveCircle, false);
		}	
		
		function startCircle(event) {
		startX = event.clientX;
		startY = event.clientY-screenYCorrection;
		circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		circle.setAttribute('cx', startX);
		circle.setAttribute('cy', startY);
		circle.setAttribute('fill', "none");
		circle.setAttribute('stroke', color);
		circle.setAttribute('stroke-width', width);
		svg.appendChild(circle);
		isMousePressed = true;
		}
	
		function moveCircle(event) {
			if(isMousePressed) {
			var moveX, moveY;
			moveX = event.clientX;
			moveY = event.clientY-screenYCorrection;

			var diffX = moveX - startX;
			var diffY = moveY - startY;
				if(diffX <0) {
				  //movement left
				  circle.setAttribute('cx', moveX);
				  circle.setAttribute('r', (diffX*(-1)));
				} else {
				  //movement right
				  circle.setAttribute('r', diffX);
				}
				if(diffY <0) {
				  //movement up
				  circle.setAttribute('y', moveY);
				  circle.setAttribute('r', (diffY*(-1)));
				} else {
				  //movement down
				  circle.setAttribute('r', diffY);
				}
			}
		}

		function endMoveCircle(event) {
		createViewElementForPath();
		viewElementG.appendChild(circle);
		isMousePressed = false;
		}		
		
		//============================================================================
	
		function createRectangle() { 
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 7;
		   
		svg.addEventListener('mousedown', startRectangle, false);		   
		svg.addEventListener('mousemove', moveRectangle, false);
		svg.addEventListener('mouseup', endMoveRectangle, false);
		}
		
		function startRectangle(event) {
		startX = event.clientX;
		startY = event.clientY-screenYCorrection;
		rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		rectangle.setAttribute('x', startX);
		rectangle.setAttribute('y', startY);
		rectangle.setAttribute('fill', "none");
		rectangle.setAttribute('stroke', color);
		rectangle.setAttribute('stroke-width', width);
		svg.appendChild(rectangle);
		isMousePressed = true;
		}
		
		function moveRectangle(event) {
			if(isMousePressed) {
			var moveX, moveY;
			moveX = event.clientX;
			moveY = event.clientY-screenYCorrection;

			var diffX = moveX - startX;
			var diffY = moveY - startY;
				if(diffX <0) {
				//movement left
				rectangle.setAttribute('x', moveX);
				rectangle.setAttribute('width', (diffX*(-1)));
				} else {
				 //movement right
				rectangle.setAttribute('width', diffX);
				}
				if(diffY <0) {
				//movement up
				rectangle.setAttribute('y', moveY);
				rectangle.setAttribute('height', (diffY*(-1)));
				} else {
				//movement down
				rectangle.setAttribute('height', diffY);
				}
			}
		}
		
		function endMoveRectangle(event) {
		createViewElementForPath();
		viewElementG.appendChild(rectangle);
		isMousePressed = false;
		}
		
		//============================================================================
	
		function createEllipse() { 
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 8;
		   
		svg.addEventListener('mousedown', startEllipse, false);
		svg.addEventListener('mousemove', moveEllipse, false);
		svg.addEventListener('mouseup', endMoveEllipse, false);
		}
		
		function startEllipse(event) {
		startX = event.clientX;
		startY = event.clientY-screenYCorrection;
		ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
		ellipse.setAttribute('cx', startX);
		ellipse.setAttribute('cy', startY);
		ellipse.setAttribute('fill', "none");
		ellipse.setAttribute('stroke', color);
		ellipse.setAttribute('stroke-width', width);
		svg.appendChild(ellipse);
		isMousePressed = true;
		}
	
		function moveEllipse(event) {
			if(isMousePressed) {
			var moveX, moveY;
			moveX = event.clientX;
			moveY = event.clientY-screenYCorrection;

			var diffX = moveX - startX;
			var diffY = moveY - startY;
				if(diffX <0) {
				//movement left
				ellipse.setAttribute('cx', moveX);
				ellipse.setAttribute('rx', (diffX*(-1)));
				} else {
				//movement right
				ellipse.setAttribute('rx', diffX);
				}
				if(diffY <0) {
				//movement up
				ellipse.setAttribute('y', moveY);
				ellipse.setAttribute('ry', (diffY*(-1)));
				} else {
				//movement down
				ellipse.setAttribute('ry', diffY);
				}
			}
		}
		
		function endMoveEllipse(event) {
		createViewElementForPath();
		viewElementG.appendChild(ellipse);
		isMousePressed = false;
		}
		
		//============================================================================
		
		function createLine(){
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 9;
			
		svg.addEventListener('mousedown', startLine, false);
		svg.addEventListener('mousemove', moveLine, false);
		svg.addEventListener('mouseup', endMoveLine, false);
		}	
		
		function startLine(event) {		
		startX = event.clientX;
		startY = event.clientY-screenYCorrection;
		line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		line.setAttribute('x1', startX);
		line.setAttribute('y1', startY);
		line.setAttribute('fill', "none");
		line.setAttribute('stroke', color);
		line.setAttribute('stroke-width', width);
		svg.appendChild(line);
		isMousePressed = true;
		}
		
		function moveLine(event) {
			if(isMousePressed) {
			var moveX = event.clientX;
			var moveY = event.clientY-screenYCorrection;
			var diffX = moveX ;
			var diffY = moveY ;
    
				if(diffX <0) {
				//movement left
				line.setAttribute('x1', startX);
				line.setAttribute('x2', (diffX*(-1)));
				} else {
				//movement right
				line.setAttribute('x2', diffX);
				}				
				if(diffY <0) {
				//movement up
				line.setAttribute('y1', startY);
				line.setAttribute('y2', (diffY*(-1)));
				} else {
				//movement down
				line.setAttribute('y2', diffY);
				}
			}
		}	
		
		function endMoveLine(event) {
		createViewElementForPath();
		viewElementG.appendChild(line);
		isMousePressed = false;
		}
		
		//============================================================================
		
		function drawGrid(){
		var y;
			for (y=30; y<960; y+=30){
			line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			line.setAttribute('x1', 0);
			line.setAttribute('y1', y);
			line.setAttribute('x2', 2000);
			line.setAttribute('y2', y);
			line.setAttribute('fill', "none");
			line.setAttribute('stroke', color);
			line.setAttribute('stroke-width', 0.75);
			svg.appendChild(line);
			createViewElementForPath();
			viewElementG.setAttribute('id', "grid");
			viewElementG.appendChild(line);
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
	    numberOfEventListener = 2;	
		
	    svg.addEventListener('mousedown', startMoves, false);
	    svg.addEventListener('mousemove', moveMoves, false);
	    svg.addEventListener('mouseup', endMoveMoves, false);		
		}
		
		function startMoves(event) {
		isMousePressed = true;
		startMoveX = event.clientX;
		startMoveY = event.clientY-screenYCorrection;		
		viewArray = document.getElementsByClassName('viewelement');
			for(h=0; h<viewArray.length; h++) {
			xArray[h] = getXandYTransformValues(viewArray[h]).x;
			yArray[h] = getXandYTransformValues(viewArray[h]).y;
			}
		}
		
		function moveMoves(event) {
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
		
		function endMoveMoves(event) {
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
		
		function deleteIt() { 
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 3;
		   
		svg.addEventListener('mousedown', startDelete, false);
		svg.addEventListener('mousemove', moveDelete, false);
		svg.addEventListener('mouseup', endMoveDelete, false);
		}
		
		function startDelete(event) {
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
		
		function moveDelete(event) {
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
		
		function endMoveDelete(event) {
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
			
			svg.addEventListener('mousedown', startURL, false);
			svg.addEventListener('mousemove', moveURL, false);
			svg.addEventListener('mouseup', endMoveURL, false);
			
			reader.onloadend = function() {
			receivedImage = reader.result;			
			}
			reader.readAsDataURL(event.target.files[0]);			
		}
		
		function startURL(event){
			startX = event.clientX;
			startY = event.clientY - screenYCorrection; 
			image = document.createElementNS('http://www.w3.org/2000/svg', 'image');			
			image.setAttribute('x', startX);
			image.setAttribute('y', startY);
			image.setAttribute('width', "200px");
			image.setAttribute('height', "300px"); 
			image.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', receivedImage);
			viewElementG.appendChild(image);
			isMousePressed = true;	
		}
		
		function moveURL(event) {   
			if(isMousePressed) {
			var moveX, moveY;
			moveX = event.clientX;
			moveY = event.clientY-screenYCorrection;

			var diffX = moveX - startX;
			var diffY = moveY - startY;
				if(diffX <0) {
				//movement left				
				image.setAttribute('width', (diffX*(-1)));
				} else {
				//movement right
				image.setAttribute('width', diffX);
				}
				if(diffY <0) {
				//movement up				
				image.setAttribute('height', (diffY*(-1)));
				} else {
				//movement down
				image.setAttribute('height', diffY);
				}
			}
		}
	
		function endMoveURL(event) {
			createViewElementForPath();
			viewElementG.appendChild(image);
			isMousePressed = false;
		}		
		
		//============================================================================
		
		function downloadIt() {
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

		function imageIt(){		
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
		
		function saveIt() {	
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
		
		function pdfIt() {	
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
		
		function setFillText(val) {
        colorFill = val;
			if(colorStroke != "none")
			colorStroke = colorFill;
		}			
		
		//============================================================================
		
		function setSizeText(val) {
        size = val;
		}
		
		//============================================================================	
		
		function setFontText(val) {
        font = val;
		}
		
		//============================================================================		
		
		function setColor(val) {
        color = val;
		}
		
		//============================================================================
		
		function setWidth(val) {
        width = val;
		}	
		