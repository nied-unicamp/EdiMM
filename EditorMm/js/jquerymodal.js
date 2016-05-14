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
		var pathArray = new Array();
		var pathsToMoveInDeleteRect = new Array();	
		var touchesInAction = {};
		
		var id;
		var svg;	
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
		var stylusIsEnabled = false;
		var touchIsEnabled = false;
		
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
		
		deviceIsStylusSensitive();
		deviceIsTouchScreen();
			
		id = id.replace("?", "");
		deserializeSVGtoXML();	
		createDraw();
		}
		
		function deviceIsTouchScreen() {			
			if(window.ontouchstart !== "undefined")
				touchIsEnabled = true;

			if ('createTouch' in window.document)
				touchIsEnabled = true;
		}

		function deviceIsStylusSensitive() {
			if(window.onponterstart !== "undefined")
				stylusIsEnabled = true;
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
					svg.removeEventListener('pointerdown', startDraw, false);
					svg.removeEventListener('pointermove', moveDraw, false);
					svg.removeEventListener('pointerup', endMoveDraw, false);
				
					svg.removeEventListener('touchstart', startMultiTouchDraw, false);
					svg.removeEventListener('touchmove', moveMultiTouchDraw, false);
					svg.removeEventListener('touchend', endMoveDraw, false);	
				
					svg.removeEventListener('mousedown', startDraw, false);
					svg.removeEventListener('mousemove', moveDraw, false);
					svg.removeEventListener('mouseup', endMoveDraw, false);
				break;
				case 2 :
					//remove Move-Listener
					svg.removeEventListener('pointerdown', startMoves, false);
					svg.removeEventListener('pointermove', moveMoves, false);
					svg.removeEventListener('pointerup', endMoveMoves, false);
				
					svg.removeEventListener('touchstart', startTouchMoves, false);
					svg.removeEventListener('touchmove', moveTouchMoves, false);
					svg.removeEventListener('touchend', endMoveMoves, false);						
					
					svg.removeEventListener('mousedown', startMoves, false);
					svg.removeEventListener('mousemove', moveMoves, false);
					svg.removeEventListener('mouseup', endMoveMoves, false);
				break;
				case 3 :
					//remove Delete-Listener
					svg.removeEventListener('pointerdown', startDelete, false);
					svg.removeEventListener('pointermove', moveDelete, false);
					svg.removeEventListener('pointerup', endMoveDelete, false);
				
					svg.removeEventListener('touchstart', startTouchDelete, false);
					svg.removeEventListener('touchmove', moveTouchDelete, false);
					svg.removeEventListener('touchend', endMoveDelete, false);						
					
					svg.removeEventListener('mousedown', startDelete, false);
					svg.removeEventListener('mousemove', moveDelete, false);
					svg.removeEventListener('mouseup', endMoveDelete, false);
				break;
				case 4 :
					//remove Wite-Listener
					svg.removeEventListener('click', startWrite, false);
					svg.removeEventListener('mousemove', moveWrite, false);
					window.removeEventListener('keydown', writeDown, false);
				break;
				case 5 :
					//remove Ponto-Listener
					svg.removeEventListener('pointerdown', startPonto, false);
					svg.removeEventListener('pointerup', endMovePonto, false);
					
					svg.removeEventListener('touchstart', startTouchPonto, false);
					svg.removeEventListener('touchend', endMovePonto, false);	
					
					svg.removeEventListener('mousedown', startPonto, false);
					svg.removeEventListener('mouseup', endMovePonto, false);
				break;
				case 6 :
					//remove Circle-Listener
					svg.removeEventListener('pointerdown', startCircle, false);
					svg.removeEventListener('pointermove', moveCircle, false);
					svg.removeEventListener('pointerup', endMoveCircle, false);
					
					svg.removeEventListener('touchstart', startTouchCircle, false);
					svg.removeEventListener('touchmove', moveTouchCircle, false);
					svg.removeEventListener('touchend', endMoveCircle, false);	
					
					svg.removeEventListener('mousedown', startCircle, false);
					svg.removeEventListener('mousemove', moveCircle, false);
					svg.removeEventListener('mouseup', endMoveCircle, false);
				break;
				case 7 :  
					//remove Rectangle-Listener
					svg.removeEventListener('pointerdown', startRectangle, false);
					svg.removeEventListener('pointermove', moveRectangle, false);
					svg.removeEventListener('pointerup', endMoveRectangle, false);
					
					svg.removeEventListener('touchstart', startTouchRectangle, false);
					svg.removeEventListener('touchmove', moveTouchRectangle, false);
					svg.removeEventListener('touchend', endMoveRectangle, false);	
					
					svg.removeEventListener('mousedown', startRectangle, false);
					svg.removeEventListener('mousemove', moveRectangle, false);
					svg.removeEventListener('mouseup', endMoveRectangle, false);
				break;
				case 8 :  
					//remove Ellipse-Listener					
					svg.removeEventListener('pointerdown', startEllipse, false);
					svg.removeEventListener('pointermove', moveEllipse, false);
					svg.removeEventListener('pointerup', endMoveEllipse, false);
					
					svg.removeEventListener('touchstart', startTouchEllipse, false);
					svg.removeEventListener('touchmove', moveTouchEllipse, false);
					svg.removeEventListener('touchend', endMoveEllipse, false);	
					
					svg.removeEventListener('mousedown', startEllipse, false);
					svg.removeEventListener('mousemove', moveEllipse, false);
					svg.removeEventListener('mouseup', endMoveEllipse, false);
				break;
				case 9 :  
					//remove Line-Listener
					svg.removeEventListener('pointerdown', startLine, false);
					svg.removeEventListener('pointermove', moveLine, false);
					svg.removeEventListener('pointerup', endMoveLine, false);
					
					svg.removeEventListener('touchstart', startTouchLine, false);
					svg.removeEventListener('touchmove', moveTouchLine, false);
					svg.removeEventListener('touchend', endMoveLine, false);
					
					svg.removeEventListener('mousedown', startLine, false);
					svg.removeEventListener('mousemove', moveLine, false);
					svg.removeEventListener('mouseup', endMoveLine, false);
				break;
				case 10 :  
					//remove ReadFile-Listener
					svg.removeEventListener('pointerdown', startURL, false);
					svg.removeEventListener('pointermove', moveURL, false);
					svg.removeEventListener('pointerup', endMoveURL, false);
					
					svg.removeEventListener('touchstart', startTouchURL, false);
					svg.removeEventListener('touchmove', moveTouchURL, false);
					svg.removeEventListener('touchend', endMoveURL, false);
					
					svg.removeEventListener('mousedown', startURL, false);
					svg.removeEventListener('mousemove', moveURL, false);
					svg.removeEventListener('mouseup', endMoveURL, false);				
				default:				
				break;
			}
		}
		
		//============================================================================
		
		function createDraw() {
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 1;
		
			if (stylusIsEnabled) {
				//sera usado o pointer
				//alert("Usando pointer");
				svg.addEventListener('pointerdown', startDraw, false);
				svg.addEventListener('pointermove', moveDraw, false);
				svg.addEventListener('pointerup', endMoveDraw, false);

			}
			if (touchIsEnabled) {
				//sera usado o touch
				//alert("Usando multi touch");
				svg.addEventListener('touchstart', startMultiTouchDraw, false);
				svg.addEventListener('touchmove', moveMultiTouchDraw, false);
				svg.addEventListener('touchend', endMoveDraw, false);	
			} 
			
			//Sera usado mouse
			//alert("Usando mouse");
			svg.addEventListener('mousedown', startDraw, false);
			svg.addEventListener('mousemove', moveDraw, false);
			svg.addEventListener('mouseup', endMoveDraw, false);			
		}
				
		function startMultiTouchDraw(event) {
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				/* store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = {
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				var sx = touches[j].pageX;
				var sy = touches[j].pageY - screenYCorrection;
				var startPosition = "M"+sx+" "+sy;
				var idTouch = touches[j].identifier;				
				pathArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				pathArray[idTouch].setAttribute('id', 'pathID');
				pathArray[idTouch].setAttribute('d', startPosition);
				pathArray[idTouch].setAttribute('fill', 'none');
				pathArray[idTouch].setAttribute('stroke', color);
				pathArray[idTouch].setAttribute('stroke-width', width);
				svg.appendChild(pathArray[idTouch]);
				isMousePressed = true;
			}			
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveMultiTouchDraw(event) {
		var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;	
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* access stored touch info on touchend */
				var sx = touches[j].clientX;
				var sy = touches[j].clientY - screenYCorrection;
				var dString = pathArray[idTouch].getAttribute('d');
				dString += ' L'+sx+' '+sy;
				pathArray[idTouch].setAttribute('d', dString);
			}			
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered		
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
        event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveDraw(event) {
			if(isMousePressed) {      
            var sx = event.clientX;
            var sy = event.clientY - screenYCorrection;
            var dString = path.getAttribute('d');
            dString += ' L'+sx+' '+sy;
            path.setAttribute('d', dString);	
			event.preventDefault(); // Prevents an additional event being triggered 
            }
		}

		function endMoveDraw(event) {		
		createViewElementForPath();
		viewElementG.appendChild(path);
		isMousePressed = false;
        event.preventDefault(); // Prevents an additional event being triggered
		}
		
		//============================================================================
		
		function moveIt() {	
		removeEventListenerFromSVG(numberOfEventListener);
	    numberOfEventListener = 2;	
		
			if (stylusIsEnabled) {
				//sera usado o pointer
				//alert("Usando pointer");
				svg.addEventListener('pointerdown', startMoves, false);
				svg.addEventListener('pointermove', moveMoves, false);
				svg.addEventListener('pointerup', endMoveMoves, false);
			}
			if (touchIsEnabled) {
				//sera usado o touch
				//alert("Usando touch");
				svg.addEventListener('touchstart', startTouchMoves, false);
				svg.addEventListener('touchmove', moveTouchMoves, false);
				svg.addEventListener('touchend', endMoveMoves, false);	
			}
		
			svg.addEventListener('mousedown', startMoves, false);
			svg.addEventListener('mousemove', moveMoves, false);
			svg.addEventListener('mouseup', endMoveMoves, false);		
		}
		
		function startTouchMoves(event) {
			var touches = event.changedTouches;				
			for(var j = 0; j < touches.length; j++) {
				/* store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = {
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};
				
				isMousePressed = true;
				startMoveX = touches[j].pageX;
				startMoveY = touches[j].pageY - screenYCorrection;
				viewArray = document.getElementsByClassName('viewelement');
				
					for(h=0; h<viewArray.length; h++) {
					xArray[h] = getXandYTransformValues(viewArray[h]).x;
					yArray[h] = getXandYTransformValues(viewArray[h]).y;
					}				
			}						
			event.preventDefault();// Prevents an additional event being triggered
		}
		
		function moveTouchMoves(event) {
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;				
				/* access stored touch info on touchend */
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
				var xMovement = touches[j].clientX;
				var yMovement = touches[j].clientY;			
				
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
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
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
		event.preventDefault(); // Prevents an additional event being triggered
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
				event.preventDefault();	// Prevents an additional event being triggered			
			}		
		}
		
		function endMoveMoves(event) {
		isMousePressed = false;		
		event.preventDefault(); // Prevents an additional event being triggered
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
		event.preventDefault(); // Prevents an additional event being triggered
		}		
		
		//============================================================================
		
		function deleteIt() { 
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 3;
		
			if (stylusIsEnabled) {
				//sera usado o pointer
				//alert("Usando pointer");
				svg.addEventListener('pointerdown', startDelete, false);
				svg.addEventListener('pointermove', moveDelete, false);
				svg.addEventListener('pointerup', endMoveDelete, false);
			}
			if (touchIsEnabled) {
				//sera usado o touch
				//alert("Usando touch");
				svg.addEventListener('touchstart', startTouchDelete, false);
				svg.addEventListener('touchmove', moveTouchDelete, false);
				svg.addEventListener('touchend', endMoveDelete, false);	
			}
		   
			svg.addEventListener('mousedown', startDelete, false);
			svg.addEventListener('mousemove', moveDelete, false);
			svg.addEventListener('mouseup', endMoveDelete, false);
		}
		
		function startTouchDelete(event) {
			var touches = event.changedTouches;

			for(var j = 0; j < touches.length; j++) {
				/* store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = {
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX;
				startY = touches[j].pageY - screenYCorrection;	
				deleteRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				deleteRect.setAttribute('x', startX);
				deleteRect.setAttribute('y', startY);
				deleteRect.setAttribute('fill', "none");
				deleteRect.setAttribute('stroke', "red");
				deleteRect.setAttribute('stroke-width', "3");
				svg.appendChild(deleteRect);
				isMousePressed = true;
			}	
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveTouchDelete(event) {
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;				
				/* access stored touch info on touchend */
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
				var moveX = touches[j].clientX;
				var moveY = touches[j].clientY - screenYCorrection;
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
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
			event.preventDefault(); // Prevents an additional event being triggered
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
		event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveDelete(event) {
			if(isMousePressed) {		
			var moveX = event.clientX;
			var moveY = event.clientY-screenYCorrection;
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
			event.preventDefault(); // Prevents an additional event being triggered
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
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function clearSVGFromUnusedViews() {
		var tempView = movementLayer.getElementsByClassName('viewelement');
			for(i=0; i<tempView.length; i++) {
				if(tempView[i].childElementCount == 0) {
				movementLayer.removeChild(tempView[i]);
				}
			}
		event.preventDefault(); // Prevents an additional event being triggered
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
				text.setAttribute('fill', color);
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
			
			if (stylusIsEnabled) {
				//sera usado o pointer
				//alert("Usando pointer");
				svg.addEventListener('pointerdown', startPonto, false);
				svg.addEventListener('pointerup', endMovePonto, false);

			}
			if (touchIsEnabled) {
				//sera usado o touch
				//alert("Usando touch");
				svg.addEventListener('touchstart', startTouchPonto, false);
				svg.addEventListener('touchend', endMovePonto, false);	
			} 			
			//Sera usado mouse
			//alert("Usando mouse");			
			svg.addEventListener('mousedown', startPonto, false);
			svg.addEventListener('mouseup', endMovePonto, false);	
		}
		
		function startTouchPonto(event) {
			var touches = event.changedTouches;

			for(var j = 0; j < touches.length; j++) {
				/* store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = {
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				var sx = touches[j].pageX;
				var sy = touches[j].pageY - screenYCorrection;			
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
			event.preventDefault(); // Prevents an additional event being triggered
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
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function endMovePonto(event) {			
			createViewElementForPath();
			viewElementG.appendChild(ponto);
			isMousePressed = false;	
			event.preventDefault(); // Prevents an additional event being triggered
		}	
		
		//============================================================================
		
		function createCircle(){
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 6;
		
			if (stylusIsEnabled) {
				//sera usado o pointer
				//alert("Usando pointer");
				svg.addEventListener('pointerdown', startCircle, false);
				svg.addEventListener('pointermove', moveCircle, false);
				svg.addEventListener('pointerup', endMoveCircle, false);

			}
			if (touchIsEnabled) {
				//sera usado o touch
				//alert("Usando touch");
				svg.addEventListener('touchstart', startTouchCircle, false);
				svg.addEventListener('touchmove', moveTouchCircle, false);
				svg.addEventListener('touchend', endMoveCircle, false);	
			} 			
			//Sera usado mouse
			//alert("Usando mouse");
			svg.addEventListener('mousedown', startCircle, false);
			svg.addEventListener('mousemove', moveCircle, false);
			svg.addEventListener('mouseup', endMoveCircle, false);
		}	
		
		function startTouchCircle(event) {
			var touches = event.changedTouches;

			for(var j = 0; j < touches.length; j++) {
				/* store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = {
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX;
				startY = touches[j].pageY - screenYCorrection;			
				circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
				circle.setAttribute('cx', startX);
				circle.setAttribute('cy', startY);
				circle.setAttribute('fill', "none");
				circle.setAttribute('stroke', color);
				circle.setAttribute('stroke-width', width);
				svg.appendChild(circle);
				isMousePressed = true;
			}						
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveTouchCircle(event) {
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;				
				/* access stored touch info on touchend */
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
				var moveX = touches[j].clientX;
				var moveY = touches[j].clientY - screenYCorrection;				
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
			
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
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
		event.preventDefault(); // Prevents an additional event being triggered
		}
	
		function moveCircle(event) {
			if(isMousePressed) {
			var moveX = event.clientX;
			var moveY = event.clientY-screenYCorrection;
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
			event.preventDefault(); // Prevents an additional event being triggered
			}
		}

		function endMoveCircle(event) {
		createViewElementForPath();
		viewElementG.appendChild(circle);
		isMousePressed = false;
		event.preventDefault(); // Prevents an additional event being triggered
		}			
		
		//============================================================================
	
		function createRectangle() { 
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 7;
		
			if (stylusIsEnabled) {
				//sera usado o pointer
				//alert("Usando pointer");
				svg.addEventListener('pointerdown', startRectangle, false);
				svg.addEventListener('pointermove', moveRectangle, false);
				svg.addEventListener('pointerup', endMoveRectangle, false);
			}
			if (touchIsEnabled) {
				//sera usado o touch
				//alert("Usando touch");
				svg.addEventListener('touchstart', startTouchRectangle, false);
				svg.addEventListener('touchmove', moveTouchRectangle, false);
				svg.addEventListener('touchend', endMoveRectangle, false);	
			} 					
			//Sera usado mouse
			//alert("Usando mouse");		   
			svg.addEventListener('mousedown', startRectangle, false);		   
			svg.addEventListener('mousemove', moveRectangle, false);
			svg.addEventListener('mouseup', endMoveRectangle, false);
		}
		
		function startTouchRectangle(event) {
			var touches = event.changedTouches;

			for(var j = 0; j < touches.length; j++) {
				/* store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = {
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX;
				startY = touches[j].pageY - screenYCorrection;			
				rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rectangle.setAttribute('x', startX);
				rectangle.setAttribute('y', startY);
				rectangle.setAttribute('fill', "none");
				rectangle.setAttribute('stroke', color);
				rectangle.setAttribute('stroke-width', width);
				svg.appendChild(rectangle);
				isMousePressed = true;
			}			
			// Prevents an additional event being triggered
			event.preventDefault();
		}
		
		function moveTouchRectangle(event) {
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;				
				/* access stored touch info on touchend */
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
				var moveX = touches[j].clientX;
				var moveY = touches[j].clientY - screenYCorrection;				
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
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
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
		event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveRectangle(event) {
			if(isMousePressed) {	
			var moveX = event.clientX;
			var moveY = event.clientY-screenYCorrection;
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
			event.preventDefault(); // Prevents an additional event being triggered
			}
		}
		
		function endMoveRectangle(event) {
		createViewElementForPath();
		viewElementG.appendChild(rectangle);
		isMousePressed = false;
		event.preventDefault(); // Prevents an additional event being triggered
		}
		
		//============================================================================
	
		function createEllipse() { 
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 8;
		
			if (stylusIsEnabled) {
				//sera usado o pointer
				//alert("Usando pointer");
				svg.addEventListener('pointerdown', startEllipse, false);
				svg.addEventListener('pointermove', moveEllipse, false);
				svg.addEventListener('pointerup', endMoveEllipse, false);
			}
			if (touchIsEnabled) {
				//sera usado o touch
				//alert("Usando touch");
				svg.addEventListener('touchstart', startTouchEllipse, false);
				svg.addEventListener('touchmove', moveTouchEllipse, false);
				svg.addEventListener('touchend', endMoveEllipse, false);	
			} 					
			//Sera usado mouse
			//alert("Usando mouse");   
			svg.addEventListener('mousedown', startEllipse, false);
			svg.addEventListener('mousemove', moveEllipse, false);
			svg.addEventListener('mouseup', endMoveEllipse, false);
		}
		
		function startTouchEllipse(event) {
			var touches = event.changedTouches;

			for(var j = 0; j < touches.length; j++) {
				/* store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = {
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX;
				startY = touches[j].pageY - screenYCorrection;	
				ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
				ellipse.setAttribute('cx', startX);
				ellipse.setAttribute('cy', startY);
				ellipse.setAttribute('fill', "none");
				ellipse.setAttribute('stroke', color);
				ellipse.setAttribute('stroke-width', width);
				svg.appendChild(ellipse);
				isMousePressed = true;
			}						
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveTouchEllipse(event) {
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;				
				/* access stored touch info on touchend */
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
				var moveX = touches[j].clientX;
				var moveY = touches[j].clientY - screenYCorrection;
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
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
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
		event.preventDefault(); // Prevents an additional event being triggered
		}
	
		function moveEllipse(event) {
			if(isMousePressed) {		
			var moveX = event.clientX;
			var moveY = event.clientY-screenYCorrection;
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
			event.preventDefault(); // Prevents an additional event being triggered
			}
		}
		
		function endMoveEllipse(event) {
		createViewElementForPath();
		viewElementG.appendChild(ellipse);
		isMousePressed = false;
		event.preventDefault(); // Prevents an additional event being triggered
		}
		
		//============================================================================
		
		function createLine(){
		removeEventListenerFromSVG(numberOfEventListener);
		numberOfEventListener = 9;
		
			if (stylusIsEnabled) {
				//sera usado o pointer
				//alert("Usando pointer");
				svg.addEventListener('pointerdown', startLine, false);
				svg.addEventListener('pointermove', moveLine, false);
				svg.addEventListener('pointerup', endMoveLine, false);
			}
			if (touchIsEnabled) {
				//sera usado o touch
				//alert("Usando touch");
				svg.addEventListener('touchstart', startTouchLine, false);
				svg.addEventListener('touchmove', moveTouchLine, false);
				svg.addEventListener('touchend', endMoveLine, false);	
			} 					
			//Sera usado mouse
			//alert("Usando mouse");  
			svg.addEventListener('mousedown', startLine, false);
			svg.addEventListener('mousemove', moveLine, false);
			svg.addEventListener('mouseup', endMoveLine, false);
		}

		function startTouchLine(event) {
			var touches = event.changedTouches;

			for(var j = 0; j < touches.length; j++) {
				/* store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = {
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX;
				startY = touches[j].pageY - screenYCorrection;	
				line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				line.setAttribute('x1', startX);
				line.setAttribute('y1', startY);
				line.setAttribute('fill', "none");
				line.setAttribute('stroke', color);
				line.setAttribute('stroke-width', width);
				svg.appendChild(line);
				isMousePressed = true;
			}						
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveTouchLine(event) {
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;				
				/* access stored touch info on touchend */
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
				var moveX = touches[j].clientX;
				var moveY = touches[j].clientY - screenYCorrection;
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
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
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
		event.preventDefault(); // Prevents an additional event being triggered
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
			event.preventDefault(); // Prevents an additional event being triggered
			}
		}	
		
		function endMoveLine(event) {
		createViewElementForPath();
		viewElementG.appendChild(line);
		isMousePressed = false;
		event.preventDefault(); // Prevents an additional event being triggered
		}
		
		//============================================================================
		
		function readURL(event) {
			var reader = new FileReader();
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 10;
			
			if (stylusIsEnabled) {
				//sera usado o pointer
				//alert("Usando pointer");
				svg.addEventListener('pointerdown', startURL, false);
				svg.addEventListener('pointermove', moveURL, false);
				svg.addEventListener('pointerup', endMoveURL, false);
			}
			if (touchIsEnabled) {
				//sera usado o touch
				//alert("Usando touch");
				svg.addEventListener('touchstart', startTouchURL, false);
				svg.addEventListener('touchmove', moveTouchURL, false);
				svg.addEventListener('touchend', endMoveURL, false);	
			} 					
			//Sera usado mouse
			//alert("Usando mouse"); 
			svg.addEventListener('mousedown', startURL, false);
			svg.addEventListener('mousemove', moveURL, false);
			svg.addEventListener('mouseup', endMoveURL, false);
			
			reader.onloadend = function() {
			receivedImage = reader.result;			
			}
			
			reader.readAsDataURL(event.target.files[0]);			
		}
		
		function startTouchURL(event) {
			var touches = event.changedTouches;

			for(var j = 0; j < touches.length; j++) {
				/* store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = {
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX;
				startY = touches[j].pageY - screenYCorrection;	
				image = document.createElementNS('http://www.w3.org/2000/svg', 'image');			
				image.setAttribute('x', startX);
				image.setAttribute('y', startY);			
				image.setAttribute('fill', "none");
				image.setAttribute('width', "200px");
				image.setAttribute('height', "300px"); 
				image.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', receivedImage);
				svg.appendChild(image);
				isMousePressed = true;
			}						
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveTouchURL(event) {
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;				
				/* access stored touch info on touchend */
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
				var moveX = touches[j].clientX;
				var moveY = touches[j].clientY - screenYCorrection;
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
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
		}	
		
		function startURL(event){
			startX = event.clientX;
			startY = event.clientY - screenYCorrection; 
			image = document.createElementNS('http://www.w3.org/2000/svg', 'image');			
			image.setAttribute('x', startX);
			image.setAttribute('y', startY);			
			image.setAttribute('fill', "none");
			image.setAttribute('width', "200px");
			image.setAttribute('height', "300px"); 
			image.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', receivedImage);
			svg.appendChild(image);
			isMousePressed = true;	
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveURL(event) {   
			if(isMousePressed) {		
			var moveX = event.clientX;
			var moveY = event.clientY-screenYCorrection;
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
			event.preventDefault(); // Prevents an additional event being triggered
			}
		}
	
		function endMoveURL(event) {
			createViewElementForPath();
			viewElementG.appendChild(image);
			isMousePressed = false;
			event.preventDefault(); // Prevents an additional event being triggered
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
		