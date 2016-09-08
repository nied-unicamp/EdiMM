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
		var lineArray = new Array();
		var viewArray = new Array();
		var pathArray = new Array();
		var circleArray = new Array();
		var ellipseArray = new Array();
		var rectangleArray = new Array();	
		var imageArray = new Array();
		var pathsToMoveInDeleteRect = new Array();	
		var touchesInAction = {};
		
		var clearG = 0;
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
		var image, receivedImage;
		var startX, startY, line, rectangle, circle, ellipse, ponto, path, deleteRect, text;	
		
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
		
		function desabilitado() {
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 0;
		}	
		
		//============================================================================
		
		function device() {
			deviceIsStylusSensitive();
			deviceIsTouchScreen();
			var number = numberOfEventListener;
				switch (number) {
					case 1 :
					createDraw();
					break;
					case 2 :
					moveIt();
					break;
					case 3 :
					deleteIt();
					break;
					case 4 :
					createWrite();
					break;
					case 5 :
					createPonto();
					break;
					case 6 :
					createCircle();
					break;
					case 7 :  
					createRectangle();
					break;
					case 8 :  
					createEllipse();
					break;
					case 9 :  
					createLine();
					break;
					case 10 :  
					readURL(event);			
					default:
					createDraw();
					break;
				}	
		}		
		
		function deviceIsTouchScreen() {
			if (touchIsEnabled==false){
				if (window.ontouchstart !== "undefined")
					touchIsEnabled = true;
				
				if ('createTouch' in window.document)
					touchIsEnabled = true;
				
			}else{			
			touchIsEnabled=false;
			}
			saveImage();
		}

		function deviceIsStylusSensitive() {
			if (stylusIsEnabled==false){
				if(window.onponterstart !== "undefined")
					stylusIsEnabled = true;
				
			}else{
			stylusIsEnabled=false;
			}	
			saveImage();
		}
		
		//============================================================================
		
		function saveImage() {			
			var serializer = new XMLSerializer();
			var xmlString = serializer.serializeToString(layer);

			canvg(document.getElementById('canvas'), xmlString);
			var canvas = document.getElementById("canvas");
			var context=canvas.getContext("2d");
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
										} else  if(xmlArray[i].indexOf('class="viewelement"') != -1) {										
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
								var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
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
								var imageArray = xmlArray[i].split(">");
								var attributeString = imageArray[0].substr(5, imageArray[0].length);
								var attributeArray = attributeString.split('"');
									for(j=0; j<attributeArray.length-1; j=j+2) {	
									var attributeName = attributeArray[j].trim();
									attributeName = attributeName.substring(0, attributeName.length-1);
									var attributeValue = attributeArray[j+1];
										if (attributeName == 'xlink:href'){
										image.setAttributeNS('http://www.w3.org/1999/xlink', attributeName, attributeValue);
										}
										else{
										image.setAttribute(null, attributeName, attributeValue);	
										}										
									image.setAttribute(attributeName, attributeValue);	
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
							default:
							saveImage();
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
					svg.removeEventListener('touchend', endMoveMultiTouchDraw, false);	
				
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
					svg.removeEventListener('pointermove', moveWrite, false);
					window.removeEventListener('keydown', writeDown, false);
					
					svg.removeEventListener('click', startMultiTouchWrite, false);
					svg.removeEventListener('touchmove', moveMultiTouchWrite, false);
					window.removeEventListener('keydown', endMoveMultiTouchWrite, false);	
					
					svg.removeEventListener('click', startWrite, false);
					svg.removeEventListener('mousemove', moveWrite, false);
					window.removeEventListener('keydown', writeDown, false);
				break;
				case 5 :
					//remove Ponto-Listener
					svg.removeEventListener('pointerdown', startPonto, false);
					svg.removeEventListener('pointerup', endMovePonto, false);
					
					svg.removeEventListener('touchstart', startMultiTouchPonto, false);
					svg.removeEventListener('touchend', endMovePonto, false);	
					
					svg.removeEventListener('mousedown', startPonto, false);
					svg.removeEventListener('mouseup', endMovePonto, false);
				break;
				case 6 :
					//remove Circle-Listener
					svg.removeEventListener('pointerdown', startCircle, false);
					svg.removeEventListener('pointermove', moveCircle, false);
					svg.removeEventListener('pointerup', endMoveCircle, false);
					
					svg.removeEventListener('touchstart', startMultiTouchCircle, false);
					svg.removeEventListener('touchmove', moveMultiTouchCircle, false);
					svg.removeEventListener('touchend', endMoveMultiTouchCircle, false);	
					
					svg.removeEventListener('mousedown', startCircle, false);
					svg.removeEventListener('mousemove', moveCircle, false);
					svg.removeEventListener('mouseup', endMoveCircle, false);
				break;
				case 7 :  
					//remove Rectangle-Listener
					svg.removeEventListener('pointerdown', startRectangle, false);
					svg.removeEventListener('pointermove', moveRectangle, false);
					svg.removeEventListener('pointerup', endMoveRectangle, false);
					
					svg.removeEventListener('touchstart', startMultiTouchRectangle, false);
					svg.removeEventListener('touchmove', moveMultiTouchRectangle, false);
					svg.removeEventListener('touchend', endMoveMultiTouchRectangle, false);	
					
					svg.removeEventListener('mousedown', startRectangle, false);
					svg.removeEventListener('mousemove', moveRectangle, false);
					svg.removeEventListener('mouseup', endMoveRectangle, false);
				break;
				case 8 :  
					//remove Ellipse-Listener					
					svg.removeEventListener('pointerdown', startEllipse, false);
					svg.removeEventListener('pointermove', moveEllipse, false);
					svg.removeEventListener('pointerup', endMoveEllipse, false);
					
					svg.removeEventListener('touchstart', startMultiTouchEllipse, false);
					svg.removeEventListener('touchmove', moveMultiTouchEllipse, false);
					svg.removeEventListener('touchend', endMoveMultiTouchEllipse, false);	
					
					svg.removeEventListener('mousedown', startEllipse, false);
					svg.removeEventListener('mousemove', moveEllipse, false);
					svg.removeEventListener('mouseup', endMoveEllipse, false);
				break;
				case 9 :  
					//remove Line-Listener
					svg.removeEventListener('pointerdown', startLine, false);
					svg.removeEventListener('pointermove', moveLine, false);
					svg.removeEventListener('pointerup', endMoveLine, false);
					
					svg.removeEventListener('touchstart', startMultiTouchLine, false);
					svg.removeEventListener('touchmove', moveMultiTouchLine, false);
					svg.removeEventListener('touchend', endMoveMultiTouchLine, false);
					
					svg.removeEventListener('mousedown', startLine, false);
					svg.removeEventListener('mousemove', moveLine, false);
					svg.removeEventListener('mouseup', endMoveLine, false);
				break;
				case 10 :  
					//remove ReadFile-Listener
					svg.removeEventListener('pointerdown', startURL, false);
					svg.removeEventListener('pointermove', moveURL, false);
					svg.removeEventListener('pointerup', endMoveURL, false);
					
					svg.removeEventListener('touchstart', startMultiTouchURL, false);
					svg.removeEventListener('touchmove', moveMultiTouchURL, false);
					svg.removeEventListener('touchend', endMoveMultiTouchURL, false);
					
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
				svg.addEventListener('touchend', endMoveMultiTouchDraw, false);	
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
		
		function endMoveMultiTouchDraw(event) {	
			var touches = event.changedTouches;
				for(var j = 0; j < touches.length; j++) {
					var idTouch = touches[j].identifier;	
					var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* access stored touch info on touchend */
					createViewElementForPath();
					viewElementG.appendChild(pathArray[idTouch]);
					isMousePressed = false;	
					saveImage();
				}
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
			saveImage();
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
			saveImage();
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
				deleteRect.setAttribute('stroke-width', "1");
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
			deleteRect.setAttribute('stroke-width', "1");
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
			svg.removeChild(deleteRect);
			event.preventDefault(); // Prevents an additional event being triggered
		}		
		
		//============================================================================
		
		function createWrite() { 				
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 4;				
			
			if (stylusIsEnabled) {
				//sera usado o pointer
				//alert("Usando pointer");
				svg.addEventListener('click', startWrite, false);
				svg.addEventListener('pointermove', moveWrite, false);
				window.addEventListener('keydown', writeDown, false);
			}
			if (touchIsEnabled) {
				//sera usado o touch
				//alert("Usando touch");
				svg.addEventListener('click', startMultiTouchWrite, false);
				svg.addEventListener('touchmove', moveMultiTouchWrite, false);
				window.addEventListener('keydown', endMoveMultiTouchWrite, false);	
			}
			
			svg.addEventListener('click', startWrite, false);
			svg.addEventListener('mousemove', moveWrite, false);
			window.addEventListener('keydown', writeDown, false);
		}
		
		function startMultiTouchWrite(event) {
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
				circle.setAttribute('r', 1);
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
			event.preventDefault(); // Prevents an additional event being triggered
		}	

		function moveMultiTouchWrite(event) {
			var touches = event.changedTouches;
			
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;				
				/* access stored touch info on touchend */
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
				var sx = touches[j].clientX;
				var sy = touches[j].clientY - screenYCorrection;				
				
				var movementTextStartX = parseInt(circleOfTextToMove.getAttribute('cx'));
				var movementTextStartY = parseInt(circleOfTextToMove.getAttribute('cy'));

				var tempX;
				var tempY;

				tempX = (sx - movementTextStartX);
				tempY = (sy - movementTextStartY);

				gOfTextToMove.setAttribute('transform', "translate("+tempX+","+tempY+")");				
			
			}			
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function endMoveMultiTouchWrite(event) {	
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;	
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* access stored touch info on touchend */
				var temp = text.innerHTML;
				var character;
					switch(event.key) {
						case 'Shift':					
						break;				
						case 'Backspace':
							temp = temp.slice(0,-2);
							text.innerHTML = temp;
						break;
						case 'Enter':
							
						break;
						default:
							text.innerHTML = temp + event.key;					
						break;	
					}	
				pressedKey = String.fromCharCode(event.which || event.keyCode);
				text.innerHTML = temp + pressedKey;				
				saveImage();
			}
			event.preventDefault(); // Prevents an additional event being triggered
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
				circle.setAttribute('r', 1);
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
					case 'Backspace':
						temp = temp.slice(0,-2);
						text.innerHTML = temp;
					break;
					case 'Enter':
						
					break;
					default:
						text.innerHTML = temp + event.key;					
					break;				
				}
			pressedKey = String.fromCharCode(event.which || event.keyCode);
			text.innerHTML = temp + pressedKey;
			saveImage();
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
				svg.addEventListener('touchstart', startMultiTouchPonto, false);
				svg.addEventListener('touchend', endMovePonto, false);	
			} 			
			//Sera usado mouse
			//alert("Usando mouse");			
			svg.addEventListener('mousedown', startPonto, false);
			svg.addEventListener('mouseup', endMovePonto, false);	
		}
		
		function startMultiTouchPonto(event) {
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
				ponto.setAttribute('r', 1);			
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
			ponto.setAttribute('r', 1);			
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
			saveImage();
			event.preventDefault(); // Prevents an additional event being triggered
		}	
		
		//============================================================================
		
		function createCircle() {
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
				svg.addEventListener('touchstart', startMultiTouchCircle, false);
				svg.addEventListener('touchmove', moveMultiTouchCircle, false);
				svg.addEventListener('touchend', endMoveMultiTouchCircle, false);	
			} 			
			//Sera usado mouse
			//alert("Usando mouse");
			svg.addEventListener('mousedown', startCircle, false);
			svg.addEventListener('mousemove', moveCircle, false);
			svg.addEventListener('mouseup', endMoveCircle, false);
		}	
		
		function startMultiTouchCircle(event) {
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
				var idTouch = touches[j].identifier;
				circleArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
				circleArray[idTouch].setAttribute('cx', startX);
				circleArray[idTouch].setAttribute('cy', startY);
				circleArray[idTouch].setAttribute('fill', "none");
				circleArray[idTouch].setAttribute('stroke', color);
				circleArray[idTouch].setAttribute('stroke-width', width);
				svg.appendChild(circleArray[idTouch]);
				isMousePressed = true;
			}						
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveMultiTouchCircle(event) {
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
					  circleArray[idTouch].setAttribute('r', diffX);
					} else {
					  //movement right
					  circleArray[idTouch].setAttribute('r', diffX);
					}
					if(diffY <0) {
					  //movement up
					  circleArray[idTouch].setAttribute('y', moveY);
					  circleArray[idTouch].setAttribute('r', (diffY*(-1)));
					} else {
					  //movement down
					  circleArray[idTouch].setAttribute('r', diffY);
					}			
			}
			
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function endMoveMultiTouchCircle(event) {	
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;	
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* access stored touch info on touchend */
				createViewElementForPath();
				viewElementG.appendChild(circleArray[idTouch]);
				isMousePressed = false;
				saveImage();
			}
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
				  circle.setAttribute('r', diffX);				 
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
			saveImage();
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
				svg.addEventListener('touchstart', startMultiTouchRectangle, false);
				svg.addEventListener('touchmove', moveMultiTouchRectangle, false);
				svg.addEventListener('touchend', endMoveMultiTouchRectangle, false);	
			} 					
			//Sera usado mouse
			//alert("Usando mouse");		   
			svg.addEventListener('mousedown', startRectangle, false);		   
			svg.addEventListener('mousemove', moveRectangle, false);
			svg.addEventListener('mouseup', endMoveRectangle, false);
		}
		
		function startMultiTouchRectangle(event) {
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
				var idTouch = touches[j].identifier;
				rectangleArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rectangleArray[idTouch].setAttribute('x', startX);
				rectangleArray[idTouch].setAttribute('y', startY);
				rectangleArray[idTouch].setAttribute('fill', "none");
				rectangleArray[idTouch].setAttribute('stroke', color);
				rectangleArray[idTouch].setAttribute('stroke-width', width);
				svg.appendChild(rectangleArray[idTouch]);
				isMousePressed = true;
			}			
			// Prevents an additional event being triggered
			event.preventDefault();
		}
		
		function moveMultiTouchRectangle(event) {
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
					rectangleArray[idTouch].setAttribute('x', moveX);
					rectangleArray[idTouch].setAttribute('width', (diffX*(-1)));
					} else {
					 //movement right
					rectangleArray[idTouch].setAttribute('width', diffX);
					}
					if(diffY <0) {
					//movement up
					rectangleArray[idTouch].setAttribute('y', moveY);
					rectangleArray[idTouch].setAttribute('height', (diffY*(-1)));
					} else {
					//movement down
					rectangleArray[idTouch].setAttribute('height', diffY);
					}		
			}			
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
		}

		function endMoveMultiTouchRectangle(event) {	
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;	
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* access stored touch info on touchend */
				createViewElementForPath();
				viewElementG.appendChild(rectangleArray[idTouch]);
				isMousePressed = false;		
				saveImage();
			}
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
			saveImage();
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
				svg.addEventListener('touchstart', startMultiTouchEllipse, false);
				svg.addEventListener('touchmove', moveMultiTouchEllipse, false);
				svg.addEventListener('touchend', endMoveMultiTouchEllipse, false);	
			} 					
			//Sera usado mouse
			//alert("Usando mouse");   
			svg.addEventListener('mousedown', startEllipse, false);
			svg.addEventListener('mousemove', moveEllipse, false);
			svg.addEventListener('mouseup', endMoveEllipse, false);
		}
		
		function startMultiTouchEllipse(event) {
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
				var idTouch = touches[j].identifier;
				ellipseArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
				ellipseArray[idTouch].setAttribute('cx', startX);
				ellipseArray[idTouch].setAttribute('cy', startY);
				ellipseArray[idTouch].setAttribute('fill', "none");
				ellipseArray[idTouch].setAttribute('stroke', color);
				ellipseArray[idTouch].setAttribute('stroke-width', width);
				svg.appendChild(ellipseArray[idTouch]);
				isMousePressed = true;
			}						
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveMultiTouchEllipse(event) {
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
					ellipseArray[idTouch].setAttribute('x', moveX);
					ellipseArray[idTouch].setAttribute('rx', (diffX*(-1)));
					} else {
					//movement right
					ellipseArray[idTouch].setAttribute('rx', diffX);
					}
					if(diffY <0) {
					//movement up
					ellipseArray[idTouch].setAttribute('y', moveY);
					ellipseArray[idTouch].setAttribute('ry', (diffY*(-1)));
					} else {
					//movement down
					ellipseArray[idTouch].setAttribute('ry', diffY);
					}		
			}			
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function endMoveMultiTouchEllipse(event) {	
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;	
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* access stored touch info on touchend */
				createViewElementForPath();
				viewElementG.appendChild(ellipseArray[idTouch]);
				isMousePressed = false;
				saveImage();
			}
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
				ellipse.setAttribute('x', moveX);
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
			saveImage();
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		//============================================================================
		
		function createLine() {
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
				svg.addEventListener('touchstart', startMultiTouchLine, false);
				svg.addEventListener('touchmove', moveMultiTouchLine, false);
				svg.addEventListener('touchend', endMoveMultiTouchLine, false);	
			} 					
			//Sera usado mouse
			//alert("Usando mouse");  
			svg.addEventListener('mousedown', startLine, false);
			svg.addEventListener('mousemove', moveLine, false);
			svg.addEventListener('mouseup', endMoveLine, false);
		}

		function startMultiTouchLine(event) {
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
				var diffX = startX;
				var diffY = startY;	
				
				var idTouch = touches[j].identifier;	
				lineArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				lineArray[idTouch].setAttribute('x1', startX);
				lineArray[idTouch].setAttribute('x2', (diffX*(-1)));
				lineArray[idTouch].setAttribute('x2', diffX);
				lineArray[idTouch].setAttribute('y1', startY);
				lineArray[idTouch].setAttribute('y2', (diffY*(-1)));
				lineArray[idTouch].setAttribute('y2', diffY);
				lineArray[idTouch].setAttribute('fill', "none");
				lineArray[idTouch].setAttribute('stroke', color);
				lineArray[idTouch].setAttribute('stroke-width', width);				
				svg.appendChild(lineArray[idTouch]);
				isMousePressed = true;					
			}						
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveMultiTouchLine(event) {
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
					lineArray[idTouch].setAttribute('x1', startX);
					lineArray[idTouch].setAttribute('x2', (diffX*(-1)));
					} else {
					//movement right
					lineArray[idTouch].setAttribute('x2', diffX);
					}				
					if(diffY <0) {
					//movement up
					lineArray[idTouch].setAttribute('y1', startY);
					lineArray[idTouch].setAttribute('y2', (diffY*(-1)));
					} else {
					//movement down
					lineArray[idTouch].setAttribute('y2', diffY);
					}		
			}			
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
		}

		function endMoveMultiTouchLine(event) {	
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;	
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* access stored touch info on touchend */
				createViewElementForPath();
				viewElementG.appendChild(lineArray[idTouch]);
				isMousePressed = false;	
				saveImage();
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function startLine(event) {		
			startX = event.clientX;
			startY = event.clientY-screenYCorrection;
			var diffX = startX;
			var diffY = startY;
		
			line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			line.setAttribute('x1', startX);
			line.setAttribute('x2', (diffX*(-1)));
			line.setAttribute('x2', diffX);
			line.setAttribute('y1', startY);
			line.setAttribute('y2', (diffY*(-1)));
			line.setAttribute('y2', diffY);
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
			saveImage();
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
				svg.addEventListener('touchstart', startMultiTouchURL, false);
				svg.addEventListener('touchmove', moveMultiTouchURL, false);
				svg.addEventListener('touchend', endMoveMultiTouchURL, false);	
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
		
		function startMultiTouchURL(event) {
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
				var idTouch = touches[j].identifier;
				imageArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'image');			
				imageArray[idTouch].setAttribute('x', startX);
				imageArray[idTouch].setAttribute('y', startY);			
				imageArray[idTouch].setAttribute('fill', "none");
				imageArray[idTouch].setAttribute('width', "200px");
				imageArray[idTouch].setAttribute('height', "300px"); 
				imageArray[idTouch].setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', receivedImage);
				svg.appendChild(imageArray[idTouch]);
				isMousePressed = true;
			}						
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		function moveMultiTouchURL(event) {
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
					imageArray[idTouch].setAttribute('width', (diffX*(-1)));
					} else {
					//movement right
					imageArray[idTouch].setAttribute('width', diffX);
					}
					if(diffY <0) {
					//movement up				
					imageArray[idTouch].setAttribute('height', (diffY*(-1)));
					} else {
					//movement down
					imageArray[idTouch].setAttribute('height', diffY);
					}		
			}			
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */			
			event.preventDefault(); // Prevents an additional event being triggered
		}	
	
		function endMoveMultiTouchURL(event) {	
			var touches = event.changedTouches;
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;	
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* access stored touch info on touchend */
				createViewElementForPath();
				viewElementG.appendChild(imageArray[idTouch]);
				isMousePressed = false;
				saveImage();	
			}
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
			saveImage();
			event.preventDefault(); // Prevents an additional event being triggered			
		}	
		
		//============================================================================		
		function drawLine(){
			clearLayout();			
			if (clearG == 0) {				

				defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
				svg.appendChild(defs);
				createViewElementForPath();
				viewElementG.setAttribute('id', "grid");
				viewElementG.appendChild(defs);

				// draw Big Grid
				pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
				pattern.setAttribute('width', "20");
				pattern.setAttribute('height', "20");
				pattern.setAttribute('patternUnits', "userSpaceOnUse");
				pattern.setAttribute('id', "bigGrid");
				defs.appendChild(pattern);

				rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rect.setAttribute('width', "20");
				rect.setAttribute('height', "20");
				rect.setAttribute('fill', "none");
				pattern.appendChild(rect);

				path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				path.setAttribute('d', "M 40 0 L 0 0 0 0");
				path.setAttribute('fill', "none");
				path.setAttribute('stroke', color);
				path.setAttribute('stroke-width', "1.0");
				pattern.appendChild(path);

				// finish
				rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rect.setAttribute('width', "100%");
				rect.setAttribute('height', "100%");
				rect.setAttribute('fill', "url(#bigGrid)");
				defs.appendChild(rect);					
				viewElementG.appendChild(rect);	
				
				clearG = 1;
 			}			
			else if (clearG == 1) {				
		
			}			
			saveImage();			
		}
		
		function drawGrid(){
			clearLayout();			
			if (clearG == 0) {				

				defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
				svg.appendChild(defs);
				createViewElementForPath();
				viewElementG.setAttribute('id', "grid");
				viewElementG.appendChild(defs);

				// draw Big Grid
				pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
				pattern.setAttribute('width', "20");
				pattern.setAttribute('height', "20");
				pattern.setAttribute('patternUnits', "userSpaceOnUse");
				pattern.setAttribute('id', "bigGrid");
				defs.appendChild(pattern);

				rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rect.setAttribute('width', "20");
				rect.setAttribute('height', "20");
				rect.setAttribute('fill', "none");
				pattern.appendChild(rect);

				path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				path.setAttribute('d', "M 0 0 L 0 0 0 40");
				path.setAttribute('fill', "none");
				path.setAttribute('stroke', color);
				path.setAttribute('stroke-width', "1.0");
				pattern.appendChild(path);

				// finish
				rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rect.setAttribute('width', "100%");
				rect.setAttribute('height', "100%");
				rect.setAttribute('fill', "url(#bigGrid)");
				defs.appendChild(rect);					
				viewElementG.appendChild(rect);	
				
				clearG = 1;
 			}			
			else if (clearG == 1) {				
		
			}			
			saveImage();			
		}
		
		function drawGridLine(){
			clearLayout();			
			if (clearG == 0) {				

				defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
				svg.appendChild(defs);
				createViewElementForPath();
				viewElementG.setAttribute('id', "grid");
				viewElementG.appendChild(defs);

				// draw Big Grid
				pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
				pattern.setAttribute('width', "20");
				pattern.setAttribute('height', "20");
				pattern.setAttribute('patternUnits', "userSpaceOnUse");
				pattern.setAttribute('id', "bigGrid");
				defs.appendChild(pattern);

				rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rect.setAttribute('width', "20");
				rect.setAttribute('height', "20");
				rect.setAttribute('fill', "none");
				pattern.appendChild(rect);

				path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				path.setAttribute('d', "M 40 0 L 0 0 0 40");
				path.setAttribute('fill', "none");
				path.setAttribute('stroke', color);
				path.setAttribute('stroke-width', "1.0");
				pattern.appendChild(path);

				// finish
				rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rect.setAttribute('width', "100%");
				rect.setAttribute('height', "100%");
				rect.setAttribute('fill', "url(#bigGrid)");
				defs.appendChild(rect);					
				viewElementG.appendChild(rect);	
				
				clearG = 1;
 			}			
			else if (clearG == 1) {				
		
			}			
			saveImage();			
		}
		
		function drawLimetrada(){
			clearLayout();

            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            svg.appendChild(defs);
            createViewElementForPath();
            viewElementG.setAttribute('id', "grid");
            viewElementG.appendChild(defs);

            // draw Small Grid
            pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
            pattern.setAttribute('width', "8");
            pattern.setAttribute('height', "8");
            pattern.setAttribute('patternUnits', "userSpaceOnUse");
            pattern.setAttribute('id', "smallGrid");
            defs.appendChild(pattern);


            path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', "M 8 0 L 0 0 0 8");
            path.setAttribute('fill', "none");
            path.setAttribute('stroke', color);
            path.setAttribute('stroke-width', "0.5");
            pattern.appendChild(path);

            // draw Big Grid
            pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
            pattern.setAttribute('width', "80");
            pattern.setAttribute('height', "80");
            pattern.setAttribute('patternUnits', "userSpaceOnUse");
            pattern.setAttribute('id', "bigGrid");
            defs.appendChild(pattern);

            rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', "80");
            rect.setAttribute('height', "80");
            rect.setAttribute('fill', "url(#smallGrid)");
            pattern.appendChild(rect);


            path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', "M 80 0 L 0 0 0 80");
            path.setAttribute('fill', "none");
            path.setAttribute('stroke', color);
            path.setAttribute('stroke-width', "1.0");
            pattern.appendChild(path);

            // finish
            rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', "100%");
            rect.setAttribute('height', "100%");
            rect.setAttribute('fill', "url(#bigGrid)");
            defs.appendChild(rect);
            viewElementG.appendChild(rect);

			saveImage();

        }
		
		// function to clear grid or lines
		
		function clearLayout() {
			var tempView = movementLayer.getElementsByClassName('viewelement');
			for(j=0; j<=5; j++){
				for(i=0; i<tempView.length; i++) {
					if(tempView[i].getAttribute('id') == "grid") {
					movementLayer.removeChild(tempView[i]);
					}
				clearG=0;
				}
			}
			saveImage();
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
			var dataURL;
			var compositeOperation  = context.globalCompositeOperation;

			data = context.getImageData(0, 0, w, h);				
				
			context.globalCompositeOperation = "destination-over";     
			context.fillStyle = backgroundColor;     
			context.fillRect(0,0,w,h);			
						
			var images = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 				
			window.location.href = images;	
		}
		
		//============================================================================

		function imageIt() {		
			var serializer = new XMLSerializer();
			var xmlString = serializer.serializeToString(layer);

			canvg(document.getElementById('canvas'), xmlString);
			var canvas = document.getElementById("canvas");
			var context=canvas.getContext("2d");
			var backgroundColor="white";
		
			var w = canvas.width;
			var h = canvas.height;
			var data;   
			var dataURL;
			var compositeOperation  = context.globalCompositeOperation;
		
			data = context.getImageData(0, 0, w, h);			
		
			context.globalCompositeOperation = "destination-over";     
			context.fillStyle = backgroundColor;     
			context.fillRect(0,0,w,h);
		
			var dataURL = canvas.toDataURL();
			
			window.open(dataURL, "_blank");
		
			context.clearRect(0, 0, w, h);
			context.globalCompositeOperation = compositeOperation;
		}
		
		//============================================================================
		
		function saveIt() {
			var serializer = new XMLSerializer();
			var xmlString = serializer.serializeToString(layer);			
			
			saveImage();
			
			xmlString.replace("</t", "><");
			var encoded = encodeURIComponent(xmlString);
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("POST","dml/armazena.php",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("id="+id+"&svg="+encoded);
			alert('Salvo com sucesso.\n\nCodigo de Acesso: '+id);
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
			var dataURL;
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
			text.setAttribute('stroke', colorStroke);
		}		
		
		//============================================================================
		
		function setDecoration() {
			if (decoration == "underline")
			decoration = "none";
			else
			decoration = "underline";			
			text.setAttribute('text-decoration', decoration);
		}
		
		//============================================================================

		function setStyle() {
			if (style == "italic")
			style = "normal";
			else
			style = "italic";			
			text.setAttribute('font-style', style);
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
		