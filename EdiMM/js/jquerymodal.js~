/************************************************************************************************
* Editor for multisemiotic text production, dealing with multidevice and multimodal interaction *
*																							    *
* Copyright (C) see <link para equipe>														    *
*																							    *
* This program is free software; you can redistribute it and/or                                 *
* modify it under the terms of the GNU General Public License                                   *
* as published by the Free Software Foundation; either version 2                                *
* of the License, or (at your option) any later version.									    *
*																						        *
* This program is distributed in the hope that it will be useful,                               *
* but WITHOUT ANY WARRANTY; without even the implied warranty of                                *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                                 *
* GNU General Public License for more details.                                                  *
*																							  	*
* You should have received a copy of the GNU General Public License								*
* along with this program.  If not, see <https://www.gnu.org/licenses/gpl-2.0.html>.			*
************************************************************************************************/
		//http://fenix.nied.unicamp.br/EdiMM/

		var sizeLetter = "20"; // Initialization sizeLetter
		var fontLetter = "Arial"; // Initialization fontLetter

		var styleLetter  = "normal"; // Initialization styleLetter
		var decorationLetter = "none"; // Initialization decorationLetter
		var colorStrokeLetter = "none"; // Initialization colorStrokeLetter

		var colorElement = "none"; // Initialization colorElement
		var dashedElement = "none"; // Initialization dashedElement
		var colorFillElement = "black"; // Initialization colorFillElement
		var colorBootElement = "black"; // Initialization colorBootElement

		var colorBoot = "black", widthBoot = 3; // Initialization of element colorBoot and widthBoot

		var xArray = new Array(); // Vector initialization responsible for the x axis
		var yArray = new Array(); // Vector initialization responsible for the y axis

		var lineArray = new Array(); // Vector initialization responsible for lines
		var viewArray = new Array(); // Vector initialization responsible for view
		var pathArray = new Array(); // Vector initialization responsible for path
		var imageArray = new Array(); // Vector initialization responsible for image
		var circleArray = new Array(); // Vector initialization responsible for circle
		var ellipseArray = new Array(); // Vector initialization responsible for ellipse
		var rectangleArray = new Array(); // Vector initialization responsible for rectangle
		var touchesInAction = new Array(); // Vector initialization responsible for touchEvents
		var pathsToMoveInDeleteRect = new Array(); // Vector initialization responsible for DeleteRect

		var svg; //Initialization responsible svg attribute
		var xmlString; //Initialization responsible xmlString attribute

		var numberToText; // Initialization numberToText attribute
		var moveToText; // Initialization moveToText attribute
		var circleTextToMove; // Initialization circleTextToMove attribute

		var viewElementG; // Initialization viewElementG attribute
		var movementLayer; // Initialization movementLayer attribute
		var activeButtonElement; // Initialization activeButtonElement attribute

		var url = location.href; // Initialization url attribute
		var id = location.search; // Initialization id attribute

		// Initialization of function attribute responsible for the x-axis and y-axis
		var numberOfEventListener;
		var startMoveX, startMoveY;
		var screenXCorrection, screenYCorrection;

		// Initialization of function attribute for receive parameters
		var image, receivedImage,audio,receivedAudio,video,receivedVideo,bod,swit,fobject,contrls;
		var startX, startY, line, rectangle, circle, ellipse, ponto, path, deleteRect, text, pattern, defs;

		var movingText = false;	// Boolean attribute movingText receives false value
		var touchIsEnabled = false; // Boolean attribute touchIsEnabled receives false value
		var isMousePressed = false; // Boolean attribute isMousePressed receives false value
		var stylusIsEnabled = false; // Boolean attribute stylusIsEnabled receives false value

		//============================================================================

		if (!id) { // Generate Random ID
			id = makeid();
			id = id.replace(" ", "");
			window.location.replace(url+"?"+id);
		}

		//============================================================================

		function makeid() { // Function responsible by burying the possible characters
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				for(var i = 0; i < 6; i++)
					text += possible.charAt(Math.floor(Math.random() * possible.length));
			return text;
		}

		//============================================================================

		function activeButton(element) { // Function responsible activate background elements
			element.style.background="#a2a2a2";
		}

		//============================================================================

		function deactiveButton(element) { // Function responsible disable background elements
			if(activeButtonElement !== element) {
				element.style.background="none";
			}
		}

		//============================================================================

		function setActiveButton(element) { // Function responsible activate elements
			if(activeButtonElement != undefined) {
				if(activeButtonElement !== element) {
					activeButtonElement.style.background="none";
				}
			}
			activeButtonElement = element;
		}

		//============================================================================

		function createViewElementForPath() { // Function responsible for creating the main viewElementG element that will aggregate the others
			viewElementG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			viewElementG.setAttribute('class', "viewelement");
			viewElementG.setAttribute('transform', "translate(0,0)");
			movementLayer.appendChild(viewElementG); // Add element to movementLayer
		}

		//============================================================================

		function disabledEvent() { // Function responsible for disabling boxtext
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 0;
		}
		//============================================================================

		function device() { // Function responsible for managing functions related to touch on the screen
			deviceIsStylusSensitive(); //Flame function deviceIsStylusSensitive
			deviceIsTouchScreen(); //Flame function deviceIsTouchScreen
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
						break;
					case 11 :
						createBoxText();
						break;
					case 12 :
						readURLAudio(event);
						break;
					case 13 :
						readURLVideo(event);
						break;
					default:
						createDraw();
						break;
				}
		}

		//============================================================================

		function deviceIsTouchScreen() { // Function responsible for activating touchIsEnabled
			if (touchIsEnabled == false){ // Compare ball values for touchIsEnabled
				if (window.ontouchstart !== "undefined")
					touchIsEnabled = true; // get true

				if ('createTouch' in window.document)
					touchIsEnabled = true; // get true
			}else{
				touchIsEnabled = false; // get false
			}
			saveImage(); // Save layout
		}
		//============================================================================

		function deviceIsStylusSensitive() { // Function responsible for activating stylusIsEnabled
			if (stylusIsEnabled == false){ // Compare ball values for stylusIsEnabled
				if(window.onponterstart !== "undefined")
					stylusIsEnabled = true; // get true
			}else{
				stylusIsEnabled = false; // get false
			}
			saveImage(); // Save layout
		}

		//============================================================================

		function saveImage() { // Function responsible saving the screen layout
			var serializer = new XMLSerializer();
			var xmlString = serializer.serializeToString(layer);

			canvg(document.getElementById('canvas'), xmlString);
			var canvas = document.getElementById("canvas");
			var context=canvas.getContext("2d");

			return context;
		}

		//============================================================================

		function init() { // Function responsible initialize svgID and layer and movement
			svg = document.getElementById('svgID');
			layer = document.getElementsByClassName('layer')[0];
			movementLayer = document.getElementById('movement');

			screenXCorrection = screen.width * 0.0; //Points the angle x of the touch on the screen
			screenYCorrection = screen.height * 0.0; //Points the angle y of the touch on the screen

			id = id.replace("?", ""); // ID will receive the input paramera after ?

			// Set a canvas with relative width and height
	  		var canvas = document.getElementById("canvas");
			canvas.setAttribute("width", window.innerWidth );
			canvas.setAttribute("height", window.innerHeight );

			deserializeSVGtoXML(); // Responsible function for bringing the data after the input parameter through the URL
			createDraw(); // Free drawing function as default on startup
		}
		//============================================================================

		function deserializeSVGtoXML() { // Function responsible for bringing the data stored after the input parameter
			// Start jquery function
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=function() {
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var xmlString = xmlhttp.responseText;
					var x;

					// Attributes that will transform HTML tags into XML
					xmlString = xmlString.replace("<html>", "");
					xmlString = xmlString.replace("<head><title>Conexao EditorMm</title>", "");
					xmlString = xmlString.replace("</head> <body>", "");
					xmlString = xmlString.trim();
					xmlString = xmlString.substring(1, xmlString.length);
					xmlArray = xmlString.split("><");

					// Attributes receive the element g from the layout
					var layerElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
					var movementElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
					var viewElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');

					// Repeating loop that will scan all elements whose names are described in the XML paramentros
					for(i=0; i<xmlArray.length; i++) {
						switch(xmlArray[i].substr(0, 1)) { // Specific elements within the "g" tag will be searched recursively
							case "g":
								if(xmlArray[i].indexOf('class="layer"') != -1) {
									var attributeString = xmlArray[i].substr(1, xmlArray[i].length);
									var attributeArray = attributeString.split('"');

									// Repeating loop responsible for scanning attributeArray in class layer
									for(j=0; j<attributeArray.length-1; j=j+2) {
										var attributeName = attributeArray[j].trim();
										attributeName = attributeName.substring(0, attributeName.length-1);
										var attributeValue = attributeArray[j+1];
										layerElement.setAttribute(attributeName, attributeValue);
									}

								} else if(xmlArray[i].indexOf('class="movementClass"') != -1) {
									var attributeString = xmlArray[i].substr(1, xmlArray[i].length);
									var attributeArray = attributeString.split('"');

									// Repeating loop responsible for scanning attributeArray in class movementClass
									for(j=0; j<attributeArray.length-1; j=j+2) {
										var attributeName = attributeArray[j].trim();
										attributeName = attributeName.substring(0, attributeName.length-1);
										var attributeValue = attributeArray[j+1];
										movementElement.setAttribute(attributeName, attributeValue);
									}

								} else if(xmlArray[i].indexOf('class="viewelement"') != -1) {
									var attributeString = xmlArray[i].substr(1, xmlArray[i].length);
									var attributeArray = attributeString.split('"');

									if(viewElement.hasChildNodes && attributeArray.length > 4) {
										viewElementTemp = document.createElementNS('http://www.w3.org/2000/svg', 'g');
										viewElement = viewElementTemp;
										movementElement.appendChild(viewElement); // Add element to movementElement
									}

									// Repeating loop responsible for scanning attributeArray in class viewelement
									if(attributeArray.length > 4){
										for(j=0; j<attributeArray.length-1; j=j+2) {
											var attributeName = attributeArray[j].trim();
											attributeName = attributeName.substring(0, attributeName.length-1);
											var attributeValue = attributeArray[j+1];
											viewElement.setAttribute(attributeName, attributeValue);
										}
									}

								}

							break;
							case "d": // Search for the element with the defs tag
								var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
								var attributeString = xmlArray[i].substr(4, xmlArray[i].length);
								var attributeArray = attributeString.split('"');

								for(j=0; j<attributeArray.length-1; j=j+2) {
									var attributeName = attributeArray[j].trim();
									attributeName = attributeName.substring(0, attributeName.length-1);
									var attributeValue = attributeArray[j+1];
									defs.setAttribute(attributeName, attributeValue);
								}

								viewElement.appendChild(defs); // Add element to viewElement
								movementElement.appendChild(viewElement); // Add element to movementElement
							break;
							case "p": // Search for the element with the path
								if ((xmlArray[i].substr(0, 4) == "path")) {
									var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
									var attributeString = xmlArray[i].substr(4, xmlArray[i].length);
									var attributeArray = attributeString.split('"');

									for(j=0; j<attributeArray.length-1; j=j+2) {
										var attributeName = attributeArray[j].trim();
										attributeName = attributeName.substring(0, attributeName.length-1);
										var attributeValue = attributeArray[j+1];
										path.setAttribute(attributeName, attributeValue);
									}

									viewElement.appendChild(path); // Add element to viewElement
									movementElement.appendChild(viewElement); // Add element to movementElement
								}
							break;
							case "t": // Search for the element with the defs text
								if ((xmlArray[i].substr(0, 4) == "text")){
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
										viewElement.appendChild(text); // Add element to viewElement
										movementElement.appendChild(viewElement); // Add element to movementElement
									}

								}
							break;
							case "i": // Search for the element with the defs image
								if ((xmlArray[i].substr(0, 5) == "image")){
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

									viewElement.appendChild(image); // Add element to viewElement
									movementElement.appendChild(viewElement); // Add element to movementElement
								}
							break;
							case "e": // Search for the element with the defs ellipse
								var ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
								var attributeString = xmlArray[i].substr(7, xmlArray[i].length);
								var attributeArray = attributeString.split('"');

								for(j=0; j<attributeArray.length-1; j=j+2) {
									var attributeName = attributeArray[j].trim();
									attributeName = attributeName.substring(0, attributeName.length-1);
									var attributeValue = attributeArray[j+1];
									ellipse.setAttribute(attributeName, attributeValue);
								}

								viewElement.appendChild(ellipse); // Add element to viewElement
								movementElement.appendChild(viewElement); // Add element to movementElement
							break;
							case "c": // Search for the element with the defs circle
								var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
								var attributeString = xmlArray[i].substr(6, xmlArray[i].length);
								var attributeArray = attributeString.split('"');

								for(j=0; j<attributeArray.length-1; j=j+2) {
									var attributeName = attributeArray[j].trim();
									attributeName = attributeName.substring(0, attributeName.length-1);
									var attributeValue = attributeArray[j+1];
									circle.setAttribute(attributeName, attributeValue);
								}

								viewElement.appendChild(circle); // Add element to viewElement
								movementElement.appendChild(viewElement); // Add element to movementElement
							break;
							case "r": // Search for the element with the defs rect
								var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
								var attributeString = xmlArray[i].substr(4, xmlArray[i].length);
								var attributeArray = attributeString.split('"');

								for(j=0; j<attributeArray.length-1; j=j+2) {
									var attributeName = attributeArray[j].trim();
									attributeName = attributeName.substring(0, attributeName.length-1);
									var attributeValue = attributeArray[j+1];
									rect.setAttribute(attributeName, attributeValue);
								}

								viewElement.appendChild(rect); // Add element to viewElement
								movementElement.appendChild(viewElement); // Add element to movementElement
							break;
							case "l": // Search for the element with the defs line
								var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
								var attributeString = xmlArray[i].substr(4, xmlArray[i].length);
								var attributeArray = attributeString.split('"');

								for(j=0; j<attributeArray.length-1; j=j+2) {
									var attributeName = attributeArray[j].trim();
									attributeName = attributeName.substring(0, attributeName.length-1);
									var attributeValue = attributeArray[j+1];
									line.setAttribute(attributeName, attributeValue);
								}

								viewElement.appendChild(line); // Add element to viewElement
								movementElement.appendChild(viewElement); // Add element to movementElement
							break;
							case "/":
							break;
							default:
							saveImage(); // Save layout
							break;
						}
					}
					if (viewElement){
						layerElement.appendChild(movementElement); // layerElement receives the movementElement
						svg.replaceChild(layerElement, layer); // layer receives the layerElement and layer
						layer = layerElement; // layer receives the layerElement
						movementLayer = movementElement; // movementLayer receives the movementElement
					}
				}
			}
			xmlhttp.open("POST", "dml/consulta.php", true); // Call the consulta.php file located in the DML folder with POST method
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // Make the page request
			xmlhttp.send("id="+id); // The ID receives the parameter in the URL to be queried
		}

		//============================================================================
		// Function responsible to manage the removal of property events
		function removeEventListenerFromSVG(listenerNumber) { // Past parameter through the different functions
			switch (listenerNumber) { // Manage the last number in the paramenter
				case 1 :
					//Remove Draw-Listener
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
					//Remove Move-Listener
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
					//Remove Delete-Listener
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
					//Remove Wite-Listener
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
					//Remove Ponto-Listener
					svg.removeEventListener('pointerdown', startPonto, false);
					svg.removeEventListener('pointerup', endMovePonto, false);

					svg.removeEventListener('touchstart', startMultiTouchPonto, false);
					svg.removeEventListener('touchend', endMovePonto, false);

					svg.removeEventListener('mousedown', startPonto, false);
					svg.removeEventListener('mouseup', endMovePonto, false);
				break;
				case 6 :
					//Remove Circle-Listener
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
					//Remove Rectangle-Listener
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
					//Remove Ellipse-Listener
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
					//Remove Line-Listener
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
					//Remove ReadFile-Listener
					svg.removeEventListener('pointerdown', startURL, false);
					svg.removeEventListener('pointermove', moveURL, false);
					svg.removeEventListener('pointerup', endMoveURL, false);

					svg.removeEventListener('touchstart', startMultiTouchURL, false);
					svg.removeEventListener('touchmove', moveMultiTouchURL, false);
					svg.removeEventListener('touchend', endMoveMultiTouchURL, false);

					svg.removeEventListener('mousedown', startURL, false);
					svg.removeEventListener('mousemove', moveURL, false);
					svg.removeEventListener('mouseup', endMoveURL, false);
				break;
				case 11 :
					//Remove ReadBoxText-Listener
					svg.removeEventListener('pointerdown', startBoxText, false);
					svg.removeEventListener('pointerup', endMoveBoxText, false);

					svg.removeEventListener('touchstart', startMultiTouchBoxText, false);
					svg.removeEventListener('touchend', endMoveBoxText, false);

					svg.removeEventListener('mousedown', startBoxText, false);
					svg.removeEventListener('mouseup', endMoveBoxText, false);
				break;
				case 12 :
					//Remove ReadFile-Listener
					svg.removeEventListener('pointerdown', startURLAudio, false);
					//svg.removeEventListener('pointermove', moveURLAudio, false);
					svg.removeEventListener('pointerup', endMoveURLAudio, false);

					svg.removeEventListener('touchstart', startMultiTouchURLAudio, false);
					//svg.removeEventListener('touchmove', moveMultiTouchURLAudio, false);
					svg.removeEventListener('touchend', endMoveMultiTouchURLAudio, false);

					svg.removeEventListener('mousedown', startURLAudio, false);
					//svg.removeEventListener('mousemove', moveURLAudio, false);
					svg.removeEventListener('mouseup', endMoveURLAudio, false);
				break;
				case 13 :
					//Remove ReadFile-Listener
					svg.removeEventListener('pointerdown', startURLVideo, false);
					//svg.removeEventListener('pointermove', moveURLVideo, false);
					svg.removeEventListener('pointerup', endMoveURLVideo, false);

					svg.removeEventListener('touchstart', startMultiTouchURLVideo, false);
					//svg.removeEventListener('touchmove', moveMultiTouchURLVideo, false);
					svg.removeEventListener('touchend', endMoveMultiTouchURLVideo, false);

					svg.removeEventListener('mousedown', startURLVideo, false);
					//svg.removeEventListener('mousemove', moveURLVideo, false);
					svg.removeEventListener('mouseup', endMoveURLVideo, false);
				break;
				default:
				break;
			}
		}

		//============================================================================

		function createDraw() { // Function responsible for creating the draw element
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 1; // Pass number 1 in function parameter

			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startDraw, false);
				svg.addEventListener('pointermove', moveDraw, false);
				svg.addEventListener('pointerup', endMoveDraw, false);

			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startMultiTouchDraw, false);
				svg.addEventListener('touchmove', moveMultiTouchDraw, false);
				svg.addEventListener('touchend', endMoveMultiTouchDraw, false);
			}

			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startDraw, false);
			svg.addEventListener('mousemove', moveDraw, false);
			svg.addEventListener('mouseup', endMoveDraw, false);
		}
		// Start Touch Event
		function startMultiTouchDraw(event) {
			var touches = event.changedTouches; // Get touchEvent
			// Loop responsible for assigning the path element while keeping it pressed is true
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = {  /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				var sx = touches[j].pageX; // Specifies the x-axis on the screen
				var sy = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				var startPosition = "M"+sx+" "+sy; // Receives the parameters responsible for the position of the elemen
				var idTouch = touches[j].identifier; // Array to store multitouch
				pathArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				pathArray[idTouch].setAttribute('id', 'pathID'); // Add an ID to the element
				pathArray[idTouch].setAttribute('d', startPosition); // Add the position of the element
				pathArray[idTouch].setAttribute('fill', 'none'); // Add background color to element
				pathArray[idTouch].setAttribute('stroke', colorBoot); // Add a color to the element
				pathArray[idTouch].setAttribute('stroke-width', widthBoot); // Add a thickness to the element
				pathArray[idTouch].setAttribute('stroke-dasharray', dashedElement); // Add dashes to element
				svg.appendChild(pathArray[idTouch]); // Add element to svg
				isMousePressed = true; // Get true
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Touch Event
		function moveMultiTouchDraw(event) {
			var touches = event.changedTouches; // Get touchEvent
				// Loop responsible for assigning the path element while keeping it pressed is true
				for(var j = 0; j < touches.length; j++) {
					var idTouch = touches[j].identifier;
					var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
					var sx = touches[j].clientX; // Specifies the x-axis on the screen
					var sy = touches[j].clientY - screenYCorrection; // Specifies the y-axis on the screen
					var dString = pathArray[idTouch].getAttribute('d');
					dString += ' L'+sx+' '+sy;
					pathArray[idTouch].setAttribute('d', dString); // Receive the ID in the related Array touch screen
				}
				/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
				event.preventDefault(); // Prevents an additional event being triggered
		}
		// End Touch Event
		function endMoveMultiTouchDraw(event) {
			var touches = event.changedTouches; // Get touchEvent
				// Loop responsible for assigning the path element while keeping it pressed is true
				for(var j = 0; j < touches.length; j++) {
					var idTouch = touches[j].identifier;
					var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
					createViewElementForPath(); // Call function createViewElementForPath
					viewElementG.appendChild(pathArray[idTouch]); // Add element to viewElementG
					isMousePressed = false; // Get false
					saveImage(); // Save layout
				}
				event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startDraw(event) {
			var sx = event.clientX; // Specifies the x-axis on the screen
			var sy = event.clientY - screenYCorrection; // Specifies the y-axis on the screen
			var startPosition = "M"+sx+" "+sy; // Receives the parameters responsible for the position of the elemen
			path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('id', 'pathID'); // Add an ID to the element
			path.setAttribute('d', startPosition); // Add the position of the element
			path.setAttribute('fill', 'none'); // Add background color to element
			path.setAttribute('stroke', colorBoot); // Add a color to the element
			path.setAttribute('stroke-width', widthBoot); // Add a thickness to the element
			path.setAttribute('stroke-dasharray', dashedElement); // Add dashes to element
			svg.appendChild(path); // Add element to svg
			isMousePressed = true; // Get true
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Mouse Event
		function moveDraw(event) {
			if(isMousePressed) { // If responsible for assigning the path element while keeping it pressed is true
				var sx = event.clientX; // Specifies the x-axis on the screen
				var sy = event.clientY - screenYCorrection; // Specifies the y-axis on the screen
				var dString = path.getAttribute('d');
				dString += ' L'+sx+' '+sy;
				path.setAttribute('d', dString); // Draw the element in svg
				event.preventDefault(); // Prevents an additional event being triggered
            }
		}
		// End Mouse Event
		function endMoveDraw(event) {
			createViewElementForPath(); // Call function createViewElementForPath
			viewElementG.appendChild(path); // Add element to viewElementG
			isMousePressed = false; // Get false
			saveImage(); // Save layout
			event.preventDefault(); // Prevents an additional event being triggered
		}

		//============================================================================

		function moveIt() { // Function responsible for moving elements
			//move
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 2; // Pass number 2 in function parameter

			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startMoves, false);
				svg.addEventListener('pointermove', moveMoves, false);
				svg.addEventListener('pointerup', endMoveMoves, false);
			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startTouchMoves, false);
				svg.addEventListener('touchmove', moveTouchMoves, false);
				svg.addEventListener('touchend', endMoveMoves, false);
			}

			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startMoves, false);
			svg.addEventListener('mousemove', moveMoves, false);
			svg.addEventListener('mouseup', endMoveMoves, false);
		}
		// Start Touch Event
		function startTouchMoves(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				isMousePressed = true; // Get true
				startMoveX = touches[j].pageX; // Specifies the x-axis on the screen
				startMoveY = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				viewArray = document.getElementsByClassName('viewelement'); // Get viewelement

				// Loop responsible for assigning the path element while keeping it pressed is true
				for(h=0; h<viewArray.length; h++) {
					xArray[h] = getXandYTransformValues(viewArray[h]).x;
					yArray[h] = getXandYTransformValues(viewArray[h]).y;
				}
			}
			event.preventDefault();// Prevents an additional event being triggered
		}
		// Move Touch Event
		function moveTouchMoves(event) {
			var touches = event.changedTouches; // Get touchEvent
			// Loop responsible for moving element
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				/* Access stored touch info on touchend */
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				var xMovement = touches[j].clientX; // Specifies the x-axis on the screen
				var yMovement = touches[j].clientY; // Specifies the y-axis on the screen
				// Loop responsible for moving the element to the desired area
				for(h=0; h<viewArray.length; h++) {
					var x, y;
					var pathArray = viewArray[h].getElementsByTagName('path');
					var pathIn = false; // Get false
					// Assigns the selected element to be moved
					if(pathArray.length>0){ // Moves the pathArray element
						// Loop responsible for moving element path
						for(i=0; i<pathArray.length; i++) {

							var dAttributeString = pathArray[i].getAttribute('d');
							var splitArray = dAttributeString.split(" ");
							var yMoveArray = new Array(); // Stores y-axis to screen touch
							var xMoveArray = new Array(); // Stores x-axis to screen touch

							for(j=0; j<splitArray.length; j=j+2) {
								xMoveArray.push(xArray[h]*1 + parseInt(splitArray[j].substr(1,splitArray[j].length)));
							}

							for(l=1; l<splitArray.length; l=l+2) {
								yMoveArray.push(yArray[h]*1 + parseInt(splitArray[l]));
							}

							for(g=0; g<xArray.length; g++) {
								if(pathIn == false) {
									if( ((startMoveX-50)  < (xMoveArray[g]*1)) && ((xMoveArray[g]*1)  < (startMoveX +50)) && ((startMoveY-50) < (yMoveArray[g]*1) ) && ((yMoveArray[g]*1) < (startMoveY+50)) ) {
										pathIn = true; // Get true
									}
								}
							}
						}
					}else{
						var arrayDel = viewArray[h].getElementsByTagName('rect');
						if(arrayDel.length==1){ // Moves the rect element
							x = 1*arrayDel[0].getAttribute("x") + 1*(arrayDel[0].getAttribute("width")/2);
							y = 1*arrayDel[0].getAttribute("y") + 1*(arrayDel[0].getAttribute("height")/2);
						}else{
							arrayDel = viewArray[h].getElementsByTagName('circle'); // Moves the circle element
							if(arrayDel.length==1){
								x = arrayDel[0].getAttribute("cx");
								y = arrayDel[0].getAttribute("cy");
								movingText = true;
							}else{
								arrayDel = viewArray[h].getElementsByTagName('line'); // Moves the line element
								if(arrayDel.length==1){
									x = 1*arrayDel[0].getAttribute("x1") + ((1*arrayDel[0].getAttribute("x2") - 1*arrayDel[0].getAttribute("x1"))/2);
									y = 1*arrayDel[0].getAttribute("y1") + ((1*arrayDel[0].getAttribute("y2") - 1*arrayDel[0].getAttribute("y1"))/2);
								}else{
									arrayDel = viewArray[h].getElementsByTagName('ellipse'); // Moves the ellipse element
									if(arrayDel.length==1){
										x = arrayDel[0].getAttribute("cx");
										y = arrayDel[0].getAttribute("cy");
									}else{
										arrayDel = viewArray[h].getElementsByTagName('image'); // Moves the image element
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
								//Translation right and down
								var transformString = "translate("+(xArray[h]+(xMovement-startMoveX)).toString()+","+(yArray[h]+(yMovement-startMoveY-screenYCorrection)).toString()+")";
								viewArray[h].setAttribute('transform', transformString);
							} else if( (xMovement < startMoveX) && (yMovement >= startMoveY) ) {
								//Translation left and down
								var transformString = "translate("+(xArray[h]-(startMoveX-xMovement)).toString()+","+(yArray[h]+(yMovement-startMoveY-screenYCorrection)).toString()+")";
								viewArray[h].setAttribute('transform', transformString);
							} else if( (xMovement < startMoveX) && (yMovement < startMoveY) ) {
								//Translation left and up
								var transformString = "translate("+(xArray[h]-(startMoveX-xMovement)).toString()+","+(yArray[h]-(startMoveY-yMovement-screenYCorrection)).toString()+")";
								viewArray[h].setAttribute('transform', transformString);
							} else {
								//Translation right and up
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
		// Start Mouse Event
		function startMoves(event) {
			isMousePressed = true; // Get true
			startMoveX = event.clientX; // Specifies the x-axis on the screen
			startMoveY = event.clientY-screenYCorrection; // Specifies the y-axis on the screen
			viewArray = document.getElementsByClassName('viewelement'); // Get viewelement

			// Loop responsible for assigning the path element while keeping it pressed is true
			for(h=0; h<viewArray.length; h++) {
			xArray[h] = getXandYTransformValues(viewArray[h]).x;
			yArray[h] = getXandYTransformValues(viewArray[h]).y;
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Mouse Event
		function moveMoves(event) {
			// It will be redirected while the element is pressed
			if(isMousePressed) {
				var xMovement = event.clientX; // Specifies the x-axis on the screen
				var yMovement = event.clientY; // Specifies the y-axis on the screen
				// Loop responsible for moving the element to the desired area
				for(h=0; h<viewArray.length; h++) {
					var x, y;
					var pathArray = viewArray[h].getElementsByTagName('path');
					var pathIn = false; // Get false
					// Assigns the selected element to be moved
					if(pathArray.length>0){ // Moves the pathArray element
						// Loop responsible for moving element path
						for(i=0; i<pathArray.length; i++) {
							var dAttributeString = pathArray[i].getAttribute('d');
							var splitArray = dAttributeString.split(" ");

							var xMoveArray = new Array(); // Stores x-axis to screen touch

							for(j=0; j<splitArray.length; j=j+2) {
								xMoveArray.push(xArray[h]*1 + parseInt(splitArray[j].substr(1,splitArray[j].length)));
							}

							var yMoveArray = new Array(); // Stores y-axis to screen touch

							for(l=1; l<splitArray.length; l=l+2) {
								yMoveArray.push(yArray[h]*1 + parseInt(splitArray[l]));
							}

							for(g=0; g<xArray.length; g++) {
								if(pathIn == false) {
									if( ((startMoveX-50)  < (xMoveArray[g]*1)) && ((xMoveArray[g]*1)  < (startMoveX +50)) && ((startMoveY-50) < (yMoveArray[g]*1) ) && ((yMoveArray[g]*1) < (startMoveY+50)) ) {
									pathIn = true; // Get true
									}
								}
							}
						}
					}else{
						var arrayDel = viewArray[h].getElementsByTagName('rect');
						if(arrayDel.length==1){ // Moves the rect element
							x = 1*arrayDel[0].getAttribute("x") + 1*(arrayDel[0].getAttribute("width")/2);
							y = 1*arrayDel[0].getAttribute("y") + 1*(arrayDel[0].getAttribute("height")/2);
						}else{
							arrayDel = viewArray[h].getElementsByTagName('circle');
							if(arrayDel.length==1){ // Moves the circle element
								x = arrayDel[0].getAttribute("cx");
								y = arrayDel[0].getAttribute("cy");
								movingText = true; // Get true
							}else{
								arrayDel = viewArray[h].getElementsByTagName('line');
								if(arrayDel.length==1){ // Moves the line element
									x = 1*arrayDel[0].getAttribute("x1") + ((1*arrayDel[0].getAttribute("x2") - 1*arrayDel[0].getAttribute("x1"))/2);
									y = 1*arrayDel[0].getAttribute("y1") + ((1*arrayDel[0].getAttribute("y2") - 1*arrayDel[0].getAttribute("y1"))/2);
								}else{
									arrayDel = viewArray[h].getElementsByTagName('ellipse');
									if(arrayDel.length==1){ // Moves the ellipse element
										x = arrayDel[0].getAttribute("cx");
										y = arrayDel[0].getAttribute("cy");
									}else{
										arrayDel = viewArray[h].getElementsByTagName('image');
										if(arrayDel.length==1){ // Moves the image element
											x = 1*arrayDel[0].getAttribute("x") + 1*(arrayDel[0].getAttribute("width")/2);
											y = 1*arrayDel[0].getAttribute("y") + 1*(arrayDel[0].getAttribute("height")/2);
										}else{
											arrayDel = viewArray[h].getElementsByTagName('foreignObject');
											if(arrayDel.length==1){ // Moves the fobject element
												x = 1*arrayDel[0].getAttribute("x") + 1*(arrayDel[0].getAttribute("width")/2);
												y = 1*arrayDel[0].getAttribute("y") + 1*(arrayDel[0].getAttribute("height")/2);
											}
										}
									}
								}
							}
						}
					}
					if(viewArray[h].getAttribute('id') != "grid"){
						if(((startMoveX <=(1*x+50+1*xArray[h])) &&(startMoveX >=(1*x-50+1*xArray[h])))&&((startMoveY <=(1*y+50+1*yArray[h])) && (startMoveY >=(1*y-50+1*yArray[h])))||pathIn){
							if( (xMovement >=  startMoveX) && (yMovement >= startMoveY)) {
								//Translation right and down
								var transformString = "translate("+(xArray[h]+(xMovement-startMoveX)).toString()+","+(yArray[h]+(yMovement-startMoveY-screenYCorrection)).toString()+")";
								viewArray[h].setAttribute('transform', transformString);
							} else if( (xMovement < startMoveX) && (yMovement >= startMoveY) ) {
								//Translation left and down
								var transformString = "translate("+(xArray[h]-(startMoveX-xMovement)).toString()+","+(yArray[h]+(yMovement-startMoveY-screenYCorrection)).toString()+")";
								viewArray[h].setAttribute('transform', transformString);
							} else if( (xMovement < startMoveX) && (yMovement < startMoveY) ) {
								//Translation left and up
								var transformString = "translate("+(xArray[h]-(startMoveX-xMovement)).toString()+","+(yArray[h]-(startMoveY-yMovement-screenYCorrection)).toString()+")";
								viewArray[h].setAttribute('transform', transformString);
							} else {
								//Translation right and up
								var transformString = "translate("+(xArray[h]+(xMovement-startMoveX)).toString()+","+(yArray[h]-(startMoveY-yMovement-screenYCorrection)).toString()+")";
								viewArray[h].setAttribute('transform', transformString);
							}
						}
					}
				}
				event.preventDefault();	// Prevents an additional event being triggered
			}
		}
		// End event
		function endMoveMoves(event) {
			isMousePressed = false; // Get false
			saveImage(); // Save layout
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Group the elements to be redirected
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

		function deleteIt() { // Function responsible for deleting elements
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 3; // Pass number 3 in function parameter

			if (stylusIsEnabled) {
				// the pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startDelete, false);
				svg.addEventListener('pointermove', moveDelete, false);
				svg.addEventListener('pointerup', endMoveDelete, false);
			}
			if (touchIsEnabled) {
				// touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startTouchDelete, false);
				svg.addEventListener('touchmove', moveTouchDelete, false);
				svg.addEventListener('touchend', endMoveDelete, false);
			}
			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startDelete, false);
			svg.addEventListener('mousemove', moveDelete, false);
			svg.addEventListener('mouseup', endMoveDelete, false);
		}
		// Start Touch Event
		function startTouchDelete(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX; // Specifies the x-axis on the screen
				startY = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				deleteRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				deleteRect.setAttribute('x', startX); // Add the position x of the element
				deleteRect.setAttribute('y', startY); // Add the position y of the element
				deleteRect.setAttribute('fill', "none"); // Add background color to element
				deleteRect.setAttribute('stroke', "red"); // Add a red color to the element
				deleteRect.setAttribute('stroke-width', "1"); // Add a thickness to the element
				deleteRect.setAttribute('stroke-dasharray', "10");
				svg.appendChild(deleteRect); // Add element to svg
				isMousePressed = true; // Get true
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Touch Event
		function moveTouchDelete(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				var moveX = touches[j].clientX; // Specifies the x-axis on the screen
				var moveY = touches[j].clientY - screenYCorrection; // Specifies the y-axis on the screen
				var diffX = moveX - startX;
				var diffY = moveY - startY;

				if(diffX <0) {
					// Movement left
					deleteRect.setAttribute('x', moveX);
					deleteRect.setAttribute('width', (diffX*(-1)));
				} else {
					// Movement right
					deleteRect.setAttribute('width', diffX);
				}
				if(diffY <0) {
					// Movement up
					deleteRect.setAttribute('y', moveY);
					deleteRect.setAttribute('height', (diffY*(-1)));
				} else {
					// Movement down
					deleteRect.setAttribute('height', diffY);
				}
			}
			/* Determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startDelete(event) {
			startX = event.clientX; // Specifies the x-axis on the screen
			startY = event.clientY-screenYCorrection; // Specifies the y-axis on the screen
			deleteRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			deleteRect.setAttribute('x', startX); // Add the position x of the element
			deleteRect.setAttribute('y', startY); // Add the position y of the element
			deleteRect.setAttribute('fill', "none"); // Add background color to element
			deleteRect.setAttribute('stroke', "red"); // Add a red color to the element
			deleteRect.setAttribute('stroke-width', "1"); // Add a thickness to the element
			deleteRect.setAttribute('stroke-dasharray', "10");
			svg.appendChild(deleteRect); // Add element to svg
			isMousePressed = true; // Get true
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Mouse Event
		function moveDelete(event) {
			if(isMousePressed) { // If responsible for assigning the path element while keeping it pressed is true
				var moveX = event.clientX; // Specifies the x-axis on the screen
				var moveY = event.clientY-screenYCorrection; // Specifies the y-axis on the screen
				var diffX = moveX - startX;
				var diffY = moveY - startY;

				if(diffX <0) {
					// Movement left
					deleteRect.setAttribute('x', moveX);
					deleteRect.setAttribute('width', (diffX*(-1)));
				} else {
					// Movement right
					deleteRect.setAttribute('width', diffX);
				}
				if(diffY <0) {
					// Movement up
					deleteRect.setAttribute('y', moveY);
					deleteRect.setAttribute('height', (diffY*(-1)));
				} else {
					// Movement down
					deleteRect.setAttribute('height', diffY);
				}
				event.preventDefault(); // Prevents an additional event being triggered
			}
		}
		// End Event
		function endMoveDelete(event) {
			isMousePressed = false; // Get false
			var leftXRect = parseInt(deleteRect.getAttribute('x'));
			var leftYRect = parseInt(deleteRect.getAttribute('y'));
			var rightXRect = parseInt(deleteRect.getAttribute('width')) + leftXRect;
			var rightYRect = parseInt(deleteRect.getAttribute('height')) + leftYRect;
			var viewElementArray = document.getElementsByClassName('viewelement');
			var arrayOfPathToDelete = new Array();

			// Loop responsible for removing element
			for(h=0; h<viewElementArray.length; h++) {

				if(arrayOfPathToDelete.length!=0) {
					arrayOfPathToDelete = new Array();
				}

				var xTranslation = getXandYTransformValues(viewElementArray[h]).x;
				var yTranslation = getXandYTransformValues(viewElementArray[h]).y;
				var pathArray = viewElementArray[h].getElementsByTagName('path');
				// Assigns the selected element to be removed
				if(pathArray.length>0){ // Removed the pathArray element
					// Loop responsible for remove element path
					for(i=0; i<pathArray.length; i++) {
						var dAttributeString = pathArray[i].getAttribute('d');
						var splitArray = dAttributeString.split(" ");
						var xArray = new Array(); // Stores x-axis to screen touch

						for(j=0; j<splitArray.length; j=j+2) {
							xArray.push(xTranslation*1 + parseInt(splitArray[j].substr(1,splitArray[j].length)));
						}

						var yArray = new Array(); // Stores y-axis to screen touch

						for(l=1; l<splitArray.length; l=l+2) {
							yArray.push(yTranslation*1 + parseInt(splitArray[l]));
						}

						var pathIn = false; // Get false

						for(g=0; g<xArray.length; g++) {
							if(pathIn == false) {
								if( (leftXRect  < (xArray[g]*1)) && ((xArray[g]*1)  < rightXRect) && (leftYRect  < (yArray[g]*1) ) && ((yArray[g]*1) < rightYRect) ) {
									pathIn = true; // Get true
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
					if(arrayDel.length==1){ // Remove the rect element
						x = 1*arrayDel[0].getAttribute("x") + 1*(arrayDel[0].getAttribute("width")/2);
						y = 1*arrayDel[0].getAttribute("y") + 1*(arrayDel[0].getAttribute("height")/2);
					}else{
						arrayDel = viewElementArray[h].getElementsByTagName('circle');
						if(arrayDel.length==1){ // Remove the circle element
							x = arrayDel[0].getAttribute("cx");
							y = arrayDel[0].getAttribute("cy");
						}else{
							arrayDel = viewElementArray[h].getElementsByTagName('line');
							if(arrayDel.length==1){ // Remove the line element
								x = 1*arrayDel[0].getAttribute("x1") + ((1*arrayDel[0].getAttribute("x2") - 1*arrayDel[0].getAttribute("x1"))/2);
								y = 1*arrayDel[0].getAttribute("y1") + ((1*arrayDel[0].getAttribute("y2") - 1*arrayDel[0].getAttribute("y1"))/2);
							}else{
								arrayDel = viewElementArray[h].getElementsByTagName('ellipse');
								if(arrayDel.length==1){ // Remove the ellipse element
									x = arrayDel[0].getAttribute("cx");
									y = arrayDel[0].getAttribute("cy");
								}else{
									arrayDel = viewElementArray[h].getElementsByTagName('image');
									if(arrayDel.length==1){ // Remove the image element
										x = 1*arrayDel[0].getAttribute("x") + 1*(arrayDel[0].getAttribute("width")/2);
										y = 1*arrayDel[0].getAttribute("y") + 1*(arrayDel[0].getAttribute("height")/2);
									}else{
										arrayDel = viewElementArray[h].getElementsByTagName('foreignObject');
										if(arrayDel.length==1){ // Remove the fobject element
											x = 1*arrayDel[0].getAttribute("x") + 1*(arrayDel[0].getAttribute("width")/2);
											y = 1*arrayDel[0].getAttribute("y") + 1*(arrayDel[0].getAttribute("height")/2);
										}
									}
								}
							}
						}
					}

					if(arrayDel.length==1 && viewElementArray[h].getAttribute('id') != "grid"){ // Remove the boxtext element
						if( (leftXRect < (x*1+xTranslation*1)) && ((x*1+xTranslation*1)  < rightXRect) && (leftYRect  < (y*1+yTranslation*1) ) && ((y*1+yTranslation*1) < rightYRect) ) {
							var text = viewElementArray[h].getElementsByTagName('svg');
							if(text.length){
								viewElementArray[h].removeChild(text[0]);
							}
						}
					}

					if(arrayDel.length==1 && viewElementArray[h].getAttribute('id') != "grid"){ // Remove the script text element
						if( (leftXRect < (x*1+xTranslation*1)) && ((x*1+xTranslation*1)  < rightXRect) && (leftYRect  < (y*1+yTranslation*1) ) && ((y*1+yTranslation*1) < rightYRect) ) {
							var text = viewElementArray[h].getElementsByTagName('text');
							/* PROBABLY BUG */
							if(text.length)
							viewElementArray[h].removeChild(text[0]);
							viewElementArray[h].removeChild(arrayDel[0]);
						}
					}
				}
			}
			clearSVGFromUnusedViews(); // Call function clearSVGFromUnusedViews
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Function responsible for clearing rec element of the screen after performing its task
		function clearSVGFromUnusedViews() {
			var tempView = movementLayer.getElementsByClassName('viewelement');
			for(i=0; i<tempView.length; i++) {
				if(tempView[i].childElementCount == 0) {
					movementLayer.removeChild(tempView[i]); // Remove element to movementLayer
				}
			}
			svg.removeChild(deleteRect); // Remove element to svg
			event.preventDefault(); // Prevents an additional event being triggered
		}

		//============================================================================

		function createWrite() { // Function responsible for creating typed script
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 4; // Pass number 4 in function parameter
			// canvas = document.getElementById("svgDiv");
			// canvas.style.cursor = "text";
			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('click', startWrite, false);
				svg.addEventListener('pointermove', moveWrite, false);
				window.addEventListener('keydown', writeDown, false);
			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('click', startMultiTouchWrite, false);
				svg.addEventListener('touchmove', moveMultiTouchWrite, false);
				window.addEventListener('keydown', endMoveMultiTouchWrite, false);
			}
			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('click', startWrite, false);
			svg.addEventListener('mousemove', moveWrite, false);
			window.addEventListener('keydown', writeDown, false);
		}
		// Start Touch Event
		function startMultiTouchWrite(event) {
			var touches = event.changedTouches; // Get touchEvent
			
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				var sx = touches[j].pageX; // Specifies the x-axis on the screen
				var sy = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				var activateExistingText = false; // Get false

				var texts = document.getElementsByTagName('text');
				// String that will cast the string to int
				for(var i=0; i<texts.length; i++) {
					var tx = parseInt(texts[i].getAttribute('x'));
					var ty = parseInt(texts[i].getAttribute('y'));
					if( ((tx-10) < sx) && (sx < tx) && (ty < sy) && (sy < (ty+10)) ) {
						activateExistingText = true; // Get true
						text = texts[i];
					}
				}
				// If activateExistingText equal to false enters condition
				if(activateExistingText == false) {
					createViewElementForPath(); // Call function createViewElementForPath

					var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
					circle.setAttribute('cx', sx-3); // Add the position x of the element
					circle.setAttribute('cy', sy-3); // Add the position y of the element
					circle.setAttribute('r', 0); // Add the position r of the element
					circle.setAttribute('stroke', "black"); // Add color to element
					circle.setAttribute('stroke-width', 0.0); // Add element thickness
					circle.setAttribute('fill', "black"); // Add background color to element
					circle.setAttribute('id', "c"+numberToText); // Add ID increment to element
					circle.addEventListener('mouseup', endMoveWrite, false);

					viewElementG.appendChild(circle); // Add element to viewElementG

					text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
					text.setAttribute('x', sx); // Add the position x of the element
					text.setAttribute('y', sy); // Add the position y of the element
					text.setAttribute('font-family', fontLetter); // Add letter font to element
					text.setAttribute('font-size', sizeLetter); // Add font size to element
					text.setAttribute('font-style', styleLetter); // Add style to the element letter
					text.setAttribute('fill', colorBoot); // Add background color to element
					text.setAttribute('stroke', colorStrokeLetter); // Add color to element
					text.setAttribute('text-decoration', decorationLetter); // Add underline to element
					text.setAttribute('id', "tc"+numberToText); // Add ID increment to element

					viewElementG.appendChild(text); // Add element to viewElementG
					numberToText++; // Number increments by the amount of character
				} else {
					/* TODO */
				}
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Touch Event
		function moveMultiTouchWrite(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				var sx = touches[j].clientX; // Specifies the x-axis on the screen
				var sy = touches[j].clientY - screenYCorrection; // Specifies the y-axis on the screen

				var movementTextStartX = parseInt(circleTextToMove.getAttribute('cx')); // Retrieve the axis x of the element
				var movementTextStartY = parseInt(circleTextToMove.getAttribute('cy')); // Retrieve the axis y of the element

				var tempX;
				var tempY;

				tempX = (sx - movementTextStartX);
				tempY = (sy - movementTextStartY);

				moveToText.setAttribute('transform', "translate("+tempX+","+tempY+")"); // Move to element

			}
			/* Determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// End Touch Event
		function endMoveMultiTouchWrite(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				var temp = text.innerHTML;
				var character;
				// Manages keyboard events
				switch(event.key) {
					case 'Shift':
					break;
					case 'Backspace':
						temp = temp.slice(0,-2);
						text.innerHTML = temp;
					break;
					case 'Enter':
						text.innerHTML = 'batata';
					break;
					default:
						text.innerHTML = temp + 'a';
					break;
				}
				pressedKey = String.fromCharCode(event.which || event.keyCode); // Use API to recognize keyboard characters
				text.innerHTML = temp + pressedKey; // The Text element receives the API
				saveImage(); // Save layout
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startWrite(event) {
			var sx = event.clientX; // Specifies the x-axis on the screen
			var sy = event.clientY - screenYCorrection; // Specifies the y-axis on the screen
			var activateExistingText = false; // Get false
			var texts = document.getElementsByTagName('text');
			// String that will cast the string to int
			for(var i=0; i<texts.length; i++) {
				var tx = parseInt(texts[i].getAttribute('x'));
				var ty = parseInt(texts[i].getAttribute('y'));
				if( ((tx-10) < sx) && (sx < tx) && (ty < sy) && (sy < (ty+10)) ) {
					activateExistingText = true; // Get true
					text = texts[i];
				}
			}
			// If activateExistingText equal to false enters condition
			if(activateExistingText == false) {

				createViewElementForPath(); // Call function createViewElementForPath

				var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
				circle.setAttribute('cx', sx-3); // Add the position x of the element
				circle.setAttribute('cy', sy-3); // Add the position y of the element
				circle.setAttribute('r', 0); // Add the position r of the element
				circle.setAttribute('stroke', "black"); // Add color to element
				circle.setAttribute('stroke-width', 0.0); // Add element thickness
				circle.setAttribute('fill', "black"); // Add background color to element
				circle.setAttribute('id', "c"+numberToText); // Add ID increment to element
				circle.addEventListener('mouseup', endMoveWrite, false);
				viewElementG.appendChild(circle); // Add element to viewElementG

				text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
				text.setAttribute('x', sx); // Add the position x of the element
				text.setAttribute('y', sy); // Add the position y of the element
				text.setAttribute('font-family', fontLetter); // Add letter font to element
				text.setAttribute('font-size', sizeLetter); // Add font size to element
				text.setAttribute('font-style', styleLetter); // Add style to the element letter
				text.setAttribute('fill', colorBoot); // Add background color to element
				text.setAttribute('stroke', colorStrokeLetter); // Add color to element
				text.setAttribute('text-decoration', decorationLetter); // Add underline to element
				text.setAttribute('id', "tc"+numberToText); // Add ID increment to element

				viewElementG.appendChild(text); // Add element to viewElementG
				numberToText++; // Number increments by the amount of character

			}
		}
		// Move Mouse Event
		function moveWrite(event) {
			if(isMousePressed == true) {
				var sx = event.clientX; // Specifies the x-axis on the screen
				var sy = event.clientY - screenYCorrection; // Specifies the y-axis on the screen

				var movementTextStartX = parseInt(circleTextToMove.getAttribute('cx')); // Retrieve the axis x of the element
				var movementTextStartY = parseInt(circleTextToMove.getAttribute('cy')); // Retrieve the axis y of the element

				var tempX;
				var tempY;

				tempX = (sx - movementTextStartX);
				tempY = (sy - movementTextStartY);

				moveToText.setAttribute('transform', "translate("+tempX+","+tempY+")"); // Move to element
			}
			/* Determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// WriteDown Mouse Event
		function writeDown(event) {
			var temp = text.innerHTML;
			var character;
			// Manages keyboard events
			switch(event.key) {
				case 'Shift':
					text.innerHTML = '';
				break;
				case 'Backspace':
					temp = temp.slice(0,-2);
					text.innerHTML = temp;
				break;
				case 'Enter':
					text.innerHTML = '';
				break;
				default:
					text.innerHTML = temp + event.key;
				break;
			}
			pressedKey = String.fromCharCode(event.which || event.keyCode); // Use API to recognize keyboard characters
			text.innerHTML = temp + pressedKey; // The Text element receives the API
			saveImage(); // Save layout
		}

		// End Event
		function endMoveWrite(event) {
			 isMousePressed = false; // Get false
		}

		//============================================================================

		function createPonto() { // Function responsible for creating the ponto element
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 5; // Pass number 5 in function parameter

			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startPonto, false);
				svg.addEventListener('pointerup', endMovePonto, false);

			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startMultiTouchPonto, false);
				svg.addEventListener('touchend', endMovePonto, false);
			}
			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startPonto, false);
			svg.addEventListener('mouseup', endMovePonto, false);
		}
		// Start Touch Event
		function startMultiTouchPonto(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				var sx = touches[j].pageX; // Specifies the x-axis on the screen
				var sy = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				ponto = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
				ponto.setAttribute('cx', sx-3); // Add the position x of the element
				ponto.setAttribute('cy', sy-3); // Add the position y of the element
				ponto.setAttribute('r', 1); // Add the position r of the element
				ponto.setAttribute('fill', colorElement); // Add background color to element
				ponto.setAttribute('stroke', colorBoot); // Add color to element
				ponto.setAttribute('stroke-width', widthBoot); // Add element thickness
				svg.appendChild(ponto); // Add element to svg
				isMousePressed = true; // Get true
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startPonto(event) {
			var sx = event.clientX; // Specifies the x-axis on the screen
			var sy = event.clientY - screenYCorrection; // Specifies the y-axis on the screen
			ponto = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			ponto.setAttribute('cx', sx-3); // Add the position x of the element
			ponto.setAttribute('cy', sy-3); // Add the position y of the element
			ponto.setAttribute('r', 1); // Add the position r of the element
			ponto.setAttribute('fill', colorElement); // Add background color to element
			ponto.setAttribute('stroke', colorBoot); // Add color to element
			ponto.setAttribute('stroke-width', widthBoot); // Add element thickness
			svg.appendChild(ponto); // Add element to svg
			isMousePressed = true;
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// End Mouse Event
		function endMovePonto(event) {
			createViewElementForPath(); // Call function createViewElementForPath
			viewElementG.appendChild(ponto); // Add element to viewElementG
			isMousePressed = false; // Get false
			saveImage(); // Save layout
			event.preventDefault(); // Prevents an additional event being triggered
		}

		//============================================================================

		function createCircle() { // Function responsible for creating the circle element
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 6; // Pass number 6 in function parameter

			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startCircle, false);
				svg.addEventListener('pointermove', moveCircle, false);
				svg.addEventListener('pointerup', endMoveCircle, false);

			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startMultiTouchCircle, false);
				svg.addEventListener('touchmove', moveMultiTouchCircle, false);
				svg.addEventListener('touchend', endMoveMultiTouchCircle, false);
			}
			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startCircle, false);
			svg.addEventListener('mousemove', moveCircle, false);
			svg.addEventListener('mouseup', endMoveCircle, false);
		}
		// Start Touch Event
		function startMultiTouchCircle(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX; // Specifies the x-axis on the screen
				startY = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				var idTouch = touches[j].identifier;
				circleArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
				circleArray[idTouch].setAttribute('cx', startX); // Add the position x of the element
				circleArray[idTouch].setAttribute('cy', startY); // Add the position y of the element
				circleArray[idTouch].setAttribute('fill', colorElement); // Add background color to element
				circleArray[idTouch].setAttribute('stroke', colorBoot); // Add color to element
				circleArray[idTouch].setAttribute('stroke-width', widthBoot); // Add element thickness
				circleArray[idTouch].setAttribute('stroke-dasharray', dashedElement); // Add dashed line to element
				svg.appendChild(circleArray[idTouch]); // Add element to svg
				isMousePressed = true; // Get true
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Touch Event
		function moveMultiTouchCircle(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				var moveX = touches[j].clientX; // Specifies the x-axis on the screen
				var moveY = touches[j].clientY - screenYCorrection; // Specifies the y-axis on the screen
				var diffX = moveX - startX;
				var diffY = moveY - startY;

				if(diffX <0) {
					//Movement left
					circleArray[idTouch].setAttribute('y', diffX);
					circleArray[idTouch].setAttribute('r', (diffX*(-1)));
				} else {
					//Movement right
					circleArray[idTouch].setAttribute('r', diffX);
				}
				if(diffY <0) {
					//Movement up
					circleArray[idTouch].setAttribute('y', moveY);
					circleArray[idTouch].setAttribute('r', (diffY*(-1)));
				} else {
					//Movement down
					circleArray[idTouch].setAttribute('r', diffY);
				}
			}

			/* Determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// End Touch Event
		function endMoveMultiTouchCircle(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* access stored touch info on touchend */
				createViewElementForPath(); // Call function createViewElementForPath
				viewElementG.appendChild(circleArray[idTouch]); // Add element to viewElementG
				isMousePressed = false; // Get false
				saveImage(); // Save layout
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startCircle(event) {
			startX = event.clientX; // Specifies the x-axis on the screen
			startY = event.clientY-screenYCorrection; // Specifies the y-axis on the screen
			circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			circle.setAttribute('cx', startX); // Add the position x of the element
			circle.setAttribute('cy', startY); // Add the position y of the element
			circle.setAttribute('fill', colorElement); // Add background color to element
			circle.setAttribute('stroke', colorBoot); // Add color to element
			circle.setAttribute('stroke-width', widthBoot); // Add element thickness
			circle.setAttribute('stroke-dasharray', dashedElement); // Add dashed line to element
			svg.appendChild(circle); // Add element to svg
			isMousePressed = true; // Get true
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Mouse Event
		function moveCircle(event) {
			if(isMousePressed) {
				var moveX = event.clientX; // Specifies the x-axis on the screen
				var moveY = event.clientY-screenYCorrection; // Specifies the y-axis on the screen
				var diffX = moveX - startX;
				var diffY = moveY - startY;

				if(diffX <0) {
				  //Movement left
				  circle.setAttribute('y', diffX);
				  circle.setAttribute('r', (diffX*(-1)));
				} else {
				  //Movement right
				  circle.setAttribute('r', diffX);
				}
				if(diffY <0) {
				  //Movement up
				  circle.setAttribute('y', diffY);
				  circle.setAttribute('r', (diffY*(-1)));
				} else {
				  //Movement down
				  circle.setAttribute('r', diffY);
				}
			event.preventDefault(); // Prevents an additional event being triggered
			}
		}
		// End Mouse Event
		function endMoveCircle(event) {
			createViewElementForPath(); // Call function createViewElementForPath
			viewElementG.appendChild(circle); // Add element to viewElementG
			isMousePressed = false; // Get false
			saveImage(); // Save layout
			event.preventDefault(); // Prevents an additional event being triggered
		}

		//============================================================================

		function createRectangle() { // Function responsible for creating the rectangle element
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 7; // Pass number 8 in function parameter

			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startRectangle, false);
				svg.addEventListener('pointermove', moveRectangle, false);
				svg.addEventListener('pointerup', endMoveRectangle, false);
			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startMultiTouchRectangle, false);
				svg.addEventListener('touchmove', moveMultiTouchRectangle, false);
				svg.addEventListener('touchend', endMoveMultiTouchRectangle, false);
			}
			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startRectangle, false);
			svg.addEventListener('mousemove', moveRectangle, false);
			svg.addEventListener('mouseup', endMoveRectangle, false);
		}
		// Start Touch Event
		function startMultiTouchRectangle(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX; // Specifies the x-axis on the screen
				startY = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				var idTouch = touches[j].identifier;
				rectangleArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rectangleArray[idTouch].setAttribute('x', startX); // Add the position x of the element
				rectangleArray[idTouch].setAttribute('y', startY); // Add the position y of the element
				rectangleArray[idTouch].setAttribute('fill', colorElement); // Add background color to element
				rectangleArray[idTouch].setAttribute('stroke', colorBoot); // Add color to element
				rectangleArray[idTouch].setAttribute('stroke-width', widthBoot); // Add element thickness
				rectangleArray[idTouch].setAttribute('stroke-dasharray', dashedElement); // Add dashed line to element
				svg.appendChild(rectangleArray[idTouch]); // Add element to svg
				isMousePressed = true; // Get true
			}
			// Prevents an additional event being triggered
			event.preventDefault();
		}
		// Move Touch Event
		function moveMultiTouchRectangle(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				var moveX = touches[j].clientX; // Specifies the x-axis on the screen
				var moveY = touches[j].clientY - screenYCorrection; // Specifies the y-axis on the screen
				var diffX = moveX - startX;
				var diffY = moveY - startY;

				if(diffX <0) {
				//Movement left
				rectangleArray[idTouch].setAttribute('x', moveX);
				rectangleArray[idTouch].setAttribute('width', (diffX*(-1)));
				} else {
					//Movement right
				rectangleArray[idTouch].setAttribute('width', diffX);
				}
				if(diffY <0) {
				//Movement up
				rectangleArray[idTouch].setAttribute('y', moveY);
				rectangleArray[idTouch].setAttribute('height', (diffY*(-1)));
				} else {
				//Movement down
				rectangleArray[idTouch].setAttribute('height', diffY);
				}
			}
			/* Determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// End Touch Event
		function endMoveMultiTouchRectangle(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				createViewElementForPath(); // Call function createViewElementForPath
				viewElementG.appendChild(rectangleArray[idTouch]); // Add element to viewElementG
				isMousePressed = false; // Get false
				saveImage(); // Save layout
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startRectangle(event) {
			startX = event.clientX; // Specifies the x-axis on the screen
			startY = event.clientY-screenYCorrection; // Specifies the y-axis on the screen
			rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			rectangle.setAttribute('x', startX); // Add the position x of the element
			rectangle.setAttribute('y', startY); // Add the position y of the element
			rectangle.setAttribute('fill', colorElement); // Add background color to element
			rectangle.setAttribute('stroke', colorBoot); // Add color to element
			rectangle.setAttribute('stroke-width', widthBoot); // Add element thickness
			rectangle.setAttribute('stroke-dasharray', dashedElement); // Add dashed line to element
			svg.appendChild(rectangle); // Add element to svg
			isMousePressed = true; // Get true
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Mouse Event
		function moveRectangle(event) {
			if(isMousePressed) {
				var moveX = event.clientX; // Specifies the x-axis on the screen
				var moveY = event.clientY-screenYCorrection; // Specifies the y-axis on the screen
				var diffX = moveX - startX;
				var diffY = moveY - startY;

				if(diffX <0) {
				//Movement left
				rectangle.setAttribute('x', moveX);
				rectangle.setAttribute('width', (diffX*(-1)));
				} else {
				 //Movement right
				rectangle.setAttribute('width', diffX);
				}
				if(diffY <0) {
				//Movement up
				rectangle.setAttribute('y', moveY);
				rectangle.setAttribute('height', (diffY*(-1)));
				} else {
				//Movement down
				rectangle.setAttribute('height', diffY);
				}
				event.preventDefault(); // Prevents an additional event being triggered
			}
		}
		// End Mouse Event
		function endMoveRectangle(event) {
			createViewElementForPath(); // Call function createViewElementForPath
			viewElementG.appendChild(rectangle); // Add element to viewElementG
			isMousePressed = false; // Get false
			saveImage(); // Save layout
			event.preventDefault(); // Prevents an additional event being triggered
		}

		//============================================================================

		function createEllipse() { // Function responsible for creating the ellipse element
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 8; // Pass number 8 in function parameter

			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startEllipse, false);
				svg.addEventListener('pointermove', moveEllipse, false);
				svg.addEventListener('pointerup', endMoveEllipse, false);
			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startMultiTouchEllipse, false);
				svg.addEventListener('touchmove', moveMultiTouchEllipse, false);
				svg.addEventListener('touchend', endMoveMultiTouchEllipse, false);
			}
			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startEllipse, false);
			svg.addEventListener('mousemove', moveEllipse, false);
			svg.addEventListener('mouseup', endMoveEllipse, false);
		}
		// Start Touch Event
		function startMultiTouchEllipse(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX; // Specifies the x-axis on the screen
				startY = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				var idTouch = touches[j].identifier;
				ellipseArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
				ellipseArray[idTouch].setAttribute('cx', startX); // Add the position x of the element
				ellipseArray[idTouch].setAttribute('cy', startY); // Add the position y of the element
				ellipseArray[idTouch].setAttribute('fill', colorElement); // Add background color to element
				ellipseArray[idTouch].setAttribute('stroke', colorBoot); // Add color to element
				ellipseArray[idTouch].setAttribute('stroke-width', widthBoot); // Add element thickness
				ellipseArray[idTouch].setAttribute('stroke-dasharray', dashedElement); // Add dashed line to element
				svg.appendChild(ellipseArray[idTouch]); // Add element to svg
				isMousePressed = true; // Get true
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Touch Event
		function moveMultiTouchEllipse(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				var moveX = touches[j].clientX; // Specifies the x-axis on the screen
				var moveY = touches[j].clientY - screenYCorrection; // Specifies the y-axis on the screen
				var diffX = moveX - startX;
				var diffY = moveY - startY;

				if(diffX <0) {
					//Movement left
					ellipseArray[idTouch].setAttribute('x', moveX);
					ellipseArray[idTouch].setAttribute('rx', (diffX*(-1)));
				} else {
					//Movement right
					ellipseArray[idTouch].setAttribute('rx', diffX);
				}
				if(diffY <0) {
					//Movement up
					ellipseArray[idTouch].setAttribute('y', moveY);
					ellipseArray[idTouch].setAttribute('ry', (diffY*(-1)));
				} else {
					//Movement down
					ellipseArray[idTouch].setAttribute('ry', diffY);
				}
			}
			/* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// End Touch Event
		function endMoveMultiTouchEllipse(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				createViewElementForPath(); // Call function createViewElementForPath
				viewElementG.appendChild(ellipseArray[idTouch]); // Add element to viewElementG
				isMousePressed = false; // Get false
				saveImage(); // Save layout
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startEllipse(event) {
			startX = event.clientX; // Specifies the x-axis on the screen
			startY = event.clientY-screenYCorrection; // Specifies the y-axis on the screen
			ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
			ellipse.setAttribute('cx', startX); // Add the position x of the element
			ellipse.setAttribute('cy', startY); // Add the position y of the element
			ellipse.setAttribute('fill', colorElement); // Add background color to element
			ellipse.setAttribute('stroke', colorBoot); // Add color to element
			ellipse.setAttribute('stroke-width', widthBoot); // Add element thickness
			ellipse.setAttribute('stroke-dasharray', dashedElement); // Add dashed line to element
			svg.appendChild(ellipse); // Add element to svg
			isMousePressed = true; // Get true
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Mouse Event
		function moveEllipse(event) {
			if(isMousePressed) {
				var moveX = event.clientX;
				var moveY = event.clientY-screenYCorrection;
				var diffX = moveX - startX;
				var diffY = moveY - startY;

				if(diffX <0) {
					//Movement left
					ellipse.setAttribute('x', moveX);
					ellipse.setAttribute('rx', (diffX*(-1)));
				} else {
					//Movement right
					ellipse.setAttribute('rx', diffX);
				}
				if(diffY <0) {
					//Movement up
					ellipse.setAttribute('y', moveY);
					ellipse.setAttribute('ry', (diffY*(-1)));
				} else {
					//Movement down
					ellipse.setAttribute('ry', diffY);
				}
				event.preventDefault(); // Prevents an additional event being triggered
			}
		}
		// End Mouse Event
		function endMoveEllipse(event) {
			createViewElementForPath(); // Call function createViewElementForPath
			viewElementG.appendChild(ellipse); // Add element to viewElementG
			isMousePressed = false; // Get false
			saveImage(); // Save layout
			event.preventDefault(); // Prevents an additional event being triggered
		}

		//============================================================================

		function createLine() { // Function responsible for creating the line element
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 9; // Pass number 9 in function parameter

			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startLine, false);
				svg.addEventListener('pointermove', moveLine, false);
				svg.addEventListener('pointerup', endMoveLine, false);
			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startMultiTouchLine, false);
				svg.addEventListener('touchmove', moveMultiTouchLine, false);
				svg.addEventListener('touchend', endMoveMultiTouchLine, false);
			}
			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startLine, false);
			svg.addEventListener('mousemove', moveLine, false);
			svg.addEventListener('mouseup', endMoveLine, false);
		}
		// Start Touch Event
		function startMultiTouchLine(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX; // Specifies the x-axis on the screen
				startY = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				var diffX = startX;
				var diffY = startY;

				var idTouch = touches[j].identifier;
				lineArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				lineArray[idTouch].setAttribute('x1', startX); // Add the position x1 of the element
				lineArray[idTouch].setAttribute('x2', (diffX*(-1))); // Add the position x2 of the element
				lineArray[idTouch].setAttribute('x2', diffX); // Add the position x2 of the element
				lineArray[idTouch].setAttribute('y1', startY); // Add the position y1 of the element
				lineArray[idTouch].setAttribute('y2', (diffY*(-1))); // Add the position y2 of the element
				lineArray[idTouch].setAttribute('y2', diffY); // Add the position y2 of the element
				lineArray[idTouch].setAttribute('fill', colorElement); // Add background color to element
				lineArray[idTouch].setAttribute('stroke', colorBoot); // Add color to element
				lineArray[idTouch].setAttribute('stroke-width', widthBoot); // Add element thickness
				lineArray[idTouch].setAttribute('stroke-dasharray', dashedElement); // Add dashed line to element
				svg.appendChild(lineArray[idTouch]); // Add element to svg
				isMousePressed = true; // Get true
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Touch Event
		function moveMultiTouchLine(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				/* access stored touch info on touchend */
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
				var moveX = touches[j].clientX; // Specifies the x-axis on the screen
				var moveY = touches[j].clientY - screenYCorrection; // Specifies the y-axis on the screen
				var diffX = moveX ;
				var diffY = moveY ;

				if(diffX <0) {
					//Movement left
					lineArray[idTouch].setAttribute('x1', startX);
					lineArray[idTouch].setAttribute('x2', (diffX*(-1)));
				} else {
					//Movement right
					lineArray[idTouch].setAttribute('x2', diffX);
				}
				if(diffY <0) {
					//Movement up
					lineArray[idTouch].setAttribute('y1', startY);
					lineArray[idTouch].setAttribute('y2', (diffY*(-1)));
				} else {
					//Movement down
					lineArray[idTouch].setAttribute('y2', diffY);
				}
			}
			/* Determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// End Touch Event
		function endMoveMultiTouchLine(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				createViewElementForPath(); // Call function createViewElementForPath
				viewElementG.appendChild(lineArray[idTouch]); // Add element to viewElementG
				isMousePressed = false; // Get false
				saveImage(); // Save layout
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startLine(event) {
			startX = event.clientX; // Specifies the x-axis on the screen
			startY = event.clientY-screenYCorrection; // Specifies the y-axis on the screen
			var diffX = startX;
			var diffY = startY;

			line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			line.setAttribute('x1', startX); // Add the position x1 of the element
			line.setAttribute('x2', (diffX*(-1))); // Add the position x2 of the element
			line.setAttribute('x2', diffX); // Add the position x2 of the element// Add the position x2 of the element
			line.setAttribute('y1', startY); // Add the position y1 of the element
			line.setAttribute('y2', (diffY*(-1))); // Add the position y2 of the element
			line.setAttribute('y2', diffY); // Add the position y2 of the element
			line.setAttribute('fill', colorElement); // Add background color to element
			line.setAttribute('stroke', colorBoot); // Add color to element
			line.setAttribute('stroke-width', widthBoot); // Add element thickness
			line.setAttribute('stroke-dasharray', dashedElement); // Add dashed line to element
			svg.appendChild(line); // Add element to svg
			isMousePressed = true; // Get true
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Mouse Event
		function moveLine(event) {
			if(isMousePressed) {
				var moveX = event.clientX;
				var moveY = event.clientY-screenYCorrection;
				var diffX = moveX ;
				var diffY = moveY ;

				if(diffX <0) {
					//Movement left
					line.setAttribute('x1', startX);
					line.setAttribute('x2', (diffX*(-1)));
				} else {
					//Movement right
					line.setAttribute('x2', diffX);
				}
				if(diffY <0) {
					//Movement up
					line.setAttribute('y1', startY);
					line.setAttribute('y2', (diffY*(-1)));
				} else {
					//Movement down
					line.setAttribute('y2', diffY);
				}
				event.preventDefault(); // Prevents an additional event being triggered
			}
		}
		// End Mouse Event
		function endMoveLine(event) {
			createViewElementForPath(); // Call function createViewElementForPath
			viewElementG.appendChild(line); // Add element to viewElementG
			isMousePressed = false; // Get false
			saveImage(); // Save layout
			event.preventDefault(); // Prevents an additional event being triggered
		}

		//============================================================================

		function readURL(event) { // Function responsible for creating the image element
			//nwse-resize
			document.getElementById("svgDiv").style.cursor = "nwse-resize";
			var reader = new FileReader();
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 10; // Pass number 10 in function parameter

			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startURL, false);
				svg.addEventListener('pointermove', moveURL, false);
				svg.addEventListener('pointerup', endMoveURL, false);
			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startMultiTouchURL, false);
				svg.addEventListener('touchmove', moveMultiTouchURL, false);
				svg.addEventListener('touchend', endMoveMultiTouchURL, false);
			}
			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startURL, false);
			svg.addEventListener('mousemove', moveURL, false);
			svg.addEventListener('mouseup', endMoveURL, false);

			reader.onloadend = function() {
				receivedImage = reader.result;
			}

			reader.readAsDataURL(event.target.files[0]);
		}
		// Start Touch Event
		function startMultiTouchURL(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX; // Specifies the x-axis on the screen
				startY = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				var idTouch = touches[j].identifier;
				imageArray[idTouch] = document.createElementNS('http://www.w3.org/2000/svg', 'image');
				imageArray[idTouch].setAttribute('x', startX); // Add the position x of the element
				imageArray[idTouch].setAttribute('y', startY); // Add the position y of the element
				imageArray[idTouch].setAttribute('fill', "none"); // Add background color to element
				imageArray[idTouch].setAttribute('width', 0); // Add width element
				imageArray[idTouch].setAttribute('height: 55px'); // Add height element
				imageArray[idTouch].setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', receivedImage); // Add to receivedImage
				svg.appendChild(imageArray[idTouch]); // Add element to svg
				isMousePressed = true; // Get true
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Touch Event   -- Remodelar
		function moveMultiTouchURL(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				/* Access stored touch info on touchend */
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				var moveX = touches[j].clientX; // Specifies the x-axis on the screen
				var moveY = touches[j].clientY - screenYCorrection; // Specifies the y-axis on the screen
				var diffX = moveX - startX;
				var diffY = moveY - startY;

				if(diffX <0) {
				//Movement left
				imageArray[idTouch].setAttribute('width', (diffX*(-1)));
				} else {
				//Movement right
				imageArray[idTouch].setAttribute('width', diffX);
				}
				if(diffY <0) {
				//Movement up
				imageArray[idTouch].setAttribute('height', (diffY*(-1)));
				} else {
				//Movement down
				imageArray[idTouch].setAttribute('height', diffY);
				}
			}
			/* Determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// End Touch Event
		function endMoveMultiTouchURL(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				createViewElementForPath(); // Call function createViewElementForPath
				viewElementG.appendChild(imageArray[idTouch]); // Add element to viewElementG
				isMousePressed = false; // Get false
				saveImage(); // Save layout
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startURL(event){
			startX = event.clientX; // Specifies the x-axis on the screen
			startY = event.clientY - screenYCorrection; // Specifies the y-axis on the screen
			defaultCursor();
			image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
			
			image.setAttribute('x', startX); // Add the position x of the element
			image.setAttribute('y', startY); // Add the position y of the element
			image.setAttribute('fill', "none"); // Add background color to element
			image.setAttribute('width', "500px"); // Add width element
			image.setAttribute('height', "300px"); // Add height element
			image.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', receivedImage); // Add to receivedImage
			svg.appendChild(image); // Add element to svg
			isMousePressed = true; // Get true
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Mouse Event   -- Remodelar
		function moveURL(event) {
			if(isMousePressed) {
				var moveX = event.clientX;
				var moveY = event.clientY-screenYCorrection;
				var diffX = moveX - startX;
				var diffY = moveY - startY;

				if(diffX <0) {
					//Movement left
					image.setAttribute('width', (diffX*(-1)));
				} else {
					//Movement right
					image.setAttribute('width', diffX);
				}
				if(diffY <0) {
					//Movement up
					image.setAttribute('height', (diffY*(-1)));
				} else {
					//Movement down
					image.setAttribute('height', diffY);
				}
				event.preventDefault(); // Prevents an additional event being triggered
			}
		}
		// End Mouse Event
		function endMoveURL(event) {
			disabledEvent();
			createViewElementForPath(); // Call function createViewElementForPath
			viewElementG.appendChild(image); // Add element to viewElementG
			isMousePressed = false; // Get false
			saveImage(); // Save layout
			event.preventDefault(); // Prevents an additional event being triggered
		}
		
		//============================================================================
		//audio
		
		function readURLAudio(event) { // Function responsible for creating the image element
			var reader = new FileReader();
			document.getElementById("svgDiv").style.cursor = "url('images/audio.svg') 15 15, auto";
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 12; // Pass number 12 in function parameter

			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startURLAudio, false);
				//svg.addEventListener('pointermove', moveURLAudio, false);
				svg.addEventListener('pointerup', endMoveURLAudio, false);
			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startMultiTouchURLAudio, false);
				//svg.addEventListener('touchmove', moveMultiTouchURLAudio, false);
				svg.addEventListener('touchend', endMoveMultiTouchURLAudio, false);
			}
			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startURLAudio, false);
			//svg.addEventListener('mousemove', moveURLAudio, false);
			svg.addEventListener('mouseup', endMoveURLAudio, false);

			reader.onloadend = function() {
				receivedAudio = reader.result;
			}

			reader.readAsDataURL(event.target.files[0]);
		}
		// Start Touch Event
		function startMultiTouchURLAudio(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX; // Specifies the x-axis on the screen
				startY = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				swit = document.createElementNS('http://www.w3.org/2000/svg', 'switch');
				svg.appendChild(swit); // Add element to svg
				
				fobject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
				fobject.setAttribute('x', startX); // Add the position x of the element
				fobject.setAttribute('y', startY); // Add the position y of the element
				fobject.setAttribute('width', "300px"); // Add width element
				fobject.setAttribute('height', "55px"); // Add height element
				swit.appendChild(fobject); // Add element to swit
				
				bod = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');
				bod.setAttribute('xmlns','http://www.w3.org/1999/xhtml');
				fobject.appendChild(bod); // Add element to fobject
				
				audio = document.createElementNS('http://www.w3.org/1999/xhtml', 'audio');
				audio.setAttribute('controls','controls');
				bod.appendChild(audio); // Add element to body
				
				contrls = document.createElementNS('http://www.w3.org/1999/xhtml', 'source');
				contrls.setAttribute('src',receivedAudio);
				var types = receivedAudio.split("/");
				var types2 = types[1].split(";"); //para encontrar o tipo do arquivo inserido
				contrls.setAttribute('type',"audio/"+types2[0]);
				audio.appendChild(contrls); // Add element to audio
				isMousePressed = true; // Get true
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Touch Event   -- Refact
		// function moveMultiTouchURLAudio(event) {
		// 	var touches = event.changedTouches; // Get touchEvent
		// 	for(var j = 0; j < touches.length; j++) {
		// 		var idTouch = touches[j].identifier;
		// 		/* Access stored touch info on touchend */
		// 		var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
		// 		var moveX = touches[j].clientX; // Specifies the x-axis on the screen
		// 		var moveY = touches[j].clientY - screenYCorrection; // Specifies the y-axis on the screen
		// 		var diffX = moveX - startX;
		// 		var diffY = moveY - startY;

		// 			if(diffX <0) {
		// 			//Movement left
		// 			imageArray[idTouch].setAttribute('width', (diffX*(-1)));
		// 			} else {
		// 			//Movement right
		// 			imageArray[idTouch].setAttribute('width', diffX);
		// 			}
		// 			if(diffY <0) {
		// 			//Movement up
		// 			imageArray[idTouch].setAttribute('height', (diffY*(-1)));
		// 			} else {
		// 			//Movement down
		// 			imageArray[idTouch].setAttribute('height', diffY);
		// 			}
		// 	}
			/* Determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
		// 	event.preventDefault(); // Prevents an additional event being triggered
		// }
		// End Touch Event

		function endMoveMultiTouchURLAudio(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				createViewElementForPath(); // Call function createViewElementForPath
				viewElementG.appendChild(imageArray[idTouch]); // Add element to viewElementG
				isMousePressed = false; // Get false
				saveImage(); // Save layout
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startURLAudio(event){
			startX = event.clientX; // Specifies the x-axis on the screen
			startY = event.clientY - screenYCorrection; // Specifies the y-axis on the screen
			
			swit = document.createElementNS('http://www.w3.org/2000/svg', 'switch');
			svg.appendChild(swit); // Add element to svg
			
			fobject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
			fobject.setAttribute('x', startX); // Add the position x of the element
			fobject.setAttribute('y', startY); // Add the position y of the element
			fobject.setAttribute('width', "300px"); // Add width element
			fobject.setAttribute('height', "55px"); // Add height element
			swit.appendChild(fobject); // Add element to swit
			
			bod = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');
			bod.setAttribute('xmlns','http://www.w3.org/1999/xhtml');
			fobject.appendChild(bod); // Add element to fobject
			
			audio = document.createElementNS('http://www.w3.org/1999/xhtml', 'audio');
			audio.setAttribute('controls','controls');
			bod.appendChild(audio); // Add element to body
			
			contrls = document.createElementNS('http://www.w3.org/1999/xhtml', 'source');
			contrls.setAttribute('src',receivedAudio);
			var types = receivedAudio.split("/");
			var types2 = types[1].split(";"); //para encontrar o tipo do arquivo inserido
			contrls.setAttribute('type',"audio/"+types2[0]);
			audio.appendChild(contrls); // Add element to audio
			
			isMousePressed = true; // Get true
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Mouse Event  -- Refact
		/*function moveURLAudio(event) {
			if(isMousePressed) {
				var moveX = event.clientX;
				var moveY = event.clientY-screenYCorrection;
				var diffX = moveX - startX;
				var diffY = moveY - startY;

				if(diffX <0) {
				//Movement left
				audio.setAttribute('width', (diffX*(-1)));
				} else {
				//Movement right
				audio.setAttribute('width', diffX);
				}
				if(diffY <0) {
				//Movement up
				audio.setAttribute('height', (diffY*(-1)));
				} else {
				//Movement down
				audio.setAttribute('height', diffY);
				}
			event.preventDefault(); // Prevents an additional event being triggered
			}
		}*/
		// End Mouse Event
		function endMoveURLAudio(event) {
			disabledEvent();
			createViewElementForPath(); // Call function createViewElementForPath
			viewElementG.appendChild(swit); // Add element to viewElementG
			isMousePressed = false; // Get false
			saveImage(); // Save layout
			event.preventDefault(); // Prevents an additional event being triggered
			defaultCursor();
		}
		
		//============================================================================
		//video
		
		function readURLVideo(event) { // Function responsible for creating the image element
			document.getElementById("svgDiv").style.cursor = "url('images/video.svg'), auto";
			var reader = new FileReader();
			removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 13; // Pass number 13 in function parameter

			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startURLVideo, false);
				//svg.addEventListener('pointermove', moveURLVideo, false);
				svg.addEventListener('pointerup', endMoveURLVideo, false);
			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startMultiTouchURLVideo, false);
				//svg.addEventListener('touchmove', moveMultiTouchURLVideo, false);
				svg.addEventListener('touchend', endMoveMultiTouchURLVideo, false);
			}
			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startURLVideo, false);
			//svg.addEventListener('mousemove', moveURLVideo, false);
			svg.addEventListener('mouseup', endMoveURLVideo, false);

			reader.onloadend = function() {
				receivedVideo = reader.result;
			}

			reader.readAsDataURL(event.target.files[0]);
		}
		// Start Touch Event
		function startMultiTouchURLVideo(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				/* Store touch info on touchstart */
				touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
					identifier : touches[j].identifier,
					pageX : touches[j].pageX,
					pageY : touches[j].pageY
				};

				startX = touches[j].pageX; // Specifies the x-axis on the screen
				startY = touches[j].pageY - screenYCorrection; // Specifies the y-axis on the screen
				
				swit = document.createElementNS('http://www.w3.org/2000/svg', 'switch');
				svg.appendChild(swit); // Add element to svg
				
				fobject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
				//fobject.setAttribute('x', startX); // Add the position x of the element
				//fobject.setAttribute('y', startY); // Add the position y of the element
				fobject.setAttribute('width', "620px"); // Add width element
				fobject.setAttribute('height', "540px"); // Add height element
				swit.appendChild(fobject); // Add element to swit
				
				bod = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');
				bod.setAttribute('xmlns','http://www.w3.org/1999/xhtml');
				fobject.appendChild(bod); // Add element to fobject
				
				video = document.createElementNS('http://www.w3.org/1999/xhtml', 'video');
				video.setAttribute('style',"margin: "+startY+"px 0 0 "+startX+"px;");
				video.setAttribute('controls','controls');
				bod.appendChild(video); // Add element to body
				
				contrls = document.createElementNS('http://www.w3.org/1999/xhtml', 'source');
				contrls.setAttribute('src',receivedVideo);
				var types = receivedVideo.split("/");
				var types2 = types[1].split(";");
				contrls.setAttribute('type','video/'+types2[0]);
				video.appendChild(contrls); // Add element to video// Add element to svg
				isMousePressed = true; // Get true
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Touch Event  -- Remodelar
		/*function moveMultiTouchURLVideo(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
					var idTouch = touches[j].identifier;
					/* Access stored touch info on touchend */
					//var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
					/*var moveX = touches[j].clientX; // Specifies the x-axis on the screen
					var moveY = touches[j].clientY - screenYCorrection; // Specifies the y-axis on the screen
					var diffX = moveX - startX;
					var diffY = moveY - startY;

					if(diffX <0) {
					//Movement left
					imageArray[idTouch].setAttribute('width', (diffX*(-1)));
					} else {
					//Movement right
					imageArray[idTouch].setAttribute('width', diffX);
					}
					if(diffY <0) {
					//Movement up
					imageArray[idTouch].setAttribute('height', (diffY*(-1)));
					} else {
					//Movement down
					imageArray[idTouch].setAttribute('height', diffY);
					}
			}
			/* Determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
			//event.preventDefault(); // Prevents an additional event being triggered
		//}
		// End Touch Event
		function endMoveMultiTouchURLVideo(event) {
			var touches = event.changedTouches; // Get touchEvent
			for(var j = 0; j < touches.length; j++) {
				var idTouch = touches[j].identifier;
				var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ]; /* Access stored touch info on touchend */
				createViewElementForPath(); // Call function createViewElementForPath
				viewElementG.appendChild(imageArray[idTouch]); // Add element to viewElementG
				isMousePressed = false; // Get false
				saveImage(); // Save layout
			}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startURLVideo(event){
		
			// Opera 8.0+
			//var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

			// Safari 3.0+ "[object HTMLElementConstructor]" 
			//var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

			// Internet Explorer 6-11
			//var isIE = /*@cc_on!@*/false || !!document.documentMode;

			// Edge 20+
			//var isEdge = !isIE && !!window.StyleMedia;

			// Chrome 1+
			//var isChrome = !!window.chrome && !!window.chrome.webstore;

			// Blink engine detection
			//var isBlink = (isChrome || isOpera) && !!window.CSS;

			startX = event.clientX; // Specifies the x-axis on the screen
			startY = event.clientY - screenYCorrection; // Specifies the y-axis on the screen
			
			swit = document.createElementNS('http://www.w3.org/2000/svg', 'switch');
			svg.appendChild(swit); // Add element to svg
			
			fobject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

			// Firefox 1.0+
			var isFirefox = typeof InstallTrigger !== 'undefined';			
			if(isFirefox){
				fobject.setAttribute('x', startX); // Add the position x of the element
				fobject.setAttribute('y', startY); // Add the position y of the element
			}
			
			fobject.setAttribute('width', "620px"); // Add width element
			fobject.setAttribute('height', "540px"); // Add height element
			swit.appendChild(fobject); // Add element to swit
			
			bod = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');
			bod.setAttribute('xmlns','http://www.w3.org/1999/xhtml');
			fobject.appendChild(bod); // Add element to fobject
			
			video = document.createElementNS('http://www.w3.org/1999/xhtml', 'video');
			if(!isFirefox){
				video.setAttribute('style',"margin: "+startY+"px 0 0 "+startX+"px;");
			}
			video.setAttribute('controls','');
			video.setAttribute('autoplay','');
			video.setAttribute('loop','');
			video.style.zIndex = "99999";
			
			bod.appendChild(video); // Add element to body
			
			contrls = document.createElementNS('http://www.w3.org/1999/xhtml', 'source');
			contrls.setAttribute('src',receivedVideo);
			var types = receivedVideo.split("/");
			var types2 = types[1].split(";");
			contrls.setAttribute('type','video/'+types2[0]);
			video.appendChild(contrls); // Add element to video
			
			isMousePressed = true; // Get true
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Move Mouse Event -- Remodelar
		/*function moveURLVideo(event) {
			if(isMousePressed) {
			var moveX = event.clientX;
			var moveY = event.clientY-screenYCorrection;
			var diffX = moveX - startX;
			var diffY = moveY - startY;

				if(diffX <0) {
				//Movement left
				image.setAttribute('width', (diffX*(-1)));
				} else {
				//Movement right
				image.setAttribute('width', diffX);
				}
				if(diffY <0) {
				//Movement up
				image.setAttribute('height', (diffY*(-1)));
				} else {
				//Movement down
				image.setAttribute('height', diffY);
				}
			event.preventDefault(); // Prevents an additional event being triggered
			}
		}*/
		// End Mouse Event
		function endMoveURLVideo(event) {
			disabledEvent();
			createViewElementForPath(); // Call function createViewElementForPath
			viewElementG.appendChild(swit); // Add element to viewElementG
			isMousePressed = false; // Get false
			saveImage(); // Save layout
			event.preventDefault(); // Prevents an additional event being triggered
			defaultCursor();
		}
		
		//============================================================================
        // Function uses jqueryraphaelmin.js to create a text box, this a call of the function 'jqueryinlinetext.js'
        function createBoxText(){ // Function responsible for creating the text box element
	        removeEventListenerFromSVG(numberOfEventListener);
			numberOfEventListener = 11; // Pass number 11 in function parameter

			if (stylusIsEnabled) {
				// The pointer will be used
				// alert ("Using pointer");
				svg.addEventListener('pointerdown', startBoxText, false);
				svg.addEventListener('pointerup', endMoveBoxText, false);

			}
			if (touchIsEnabled) {
				// Touch will be used
				// alert ("Using multi touch");
				svg.addEventListener('touchstart', startMultiTouchBoxText, false);
				svg.addEventListener('touchend', endMoveBoxText, false);
			}
			// Mouse will be used
			// alert ("Using mouse");
			svg.addEventListener('mousedown', startBoxText, false);
			svg.addEventListener('mouseup', endMoveBoxText, false);
        }
		// Start Touch Event
		function startMultiTouchBoxText(event){
			var touches = event.changedTouches; // Get touchEvent
				for(var j = 0; j < touches.length; j++) {
					/* Store touch info on touchstart */
					touchesInAction[ "$" + touches[j].identifier ] = { /* Access stored touch info on touchend */
						identifier : touches[j].identifier,
						pageX : touches[j].pageX,
						pageY : touches[j].pageY
					};

					var sx = touches[j].clientX; // Specifies the x-axis on the screen
					var sy = touches[j].clientY - screenYCorrection; // Specifies the y-axis on the screen

					createViewElementForPath();	// Call function createViewElementForPath

					var paper = Raphael(viewElementG, 1800, 800); // Add element to viewElementG
					// Rectangle to move a textbox
					paper.rect(sx, sy); // Add the position x and y of the element
					var text = paper.text(sx, sy, 'Click to write').attr({'text-finally': fontLetter, 'font-size': sizeLetter, 'font-style': styleLetter, 'text-decoration': decorationLetter, 'stroke': colorStrokeLetter, 'fill': colorBoot}).transform(['R', 0, 'S', 1, 1]);

					// Initialize text editing for the text element
					paper.inlineTextEditing(text);

					// Start inline editing on click
					text.click(function(){
						// Retrieve created <input type=text> field
						var input = this.inlineTextEditing.startEditing();

						input.addEventListener("blur", function(e){
							// Stop inline editing after blur on the text field
							text.inlineTextEditing.stopEditing();
						}, true);
					});
					isMousePressed = true; // Get true
				}
			event.preventDefault(); // Prevents an additional event being triggered
		}
		// Start Mouse Event
		function startBoxText(event){
			var sx = event.clientX; // Specifies the x-axis on the screen
			var sy = event.clientY - screenYCorrection; // Specifies the y-axis on the screen

			createViewElementForPath();	// Call function createViewElementForPath

	        var paper = Raphael(viewElementG, 1800, 800); // Add element to viewElementG
			// Rectangle to move a textbox
			paper.rect(sx, sy); // Add the position x and y of the element
            var text = paper.text(sx, sy, 'Clique para editar.').attr({'text-finally': fontLetter, 'font-size': sizeLetter, 'font-style': styleLetter,'text-decoration': decorationLetter,'stroke': colorStrokeLetter,'fill': colorBoot}).transform(['R', 0, 'S', 1, 1]);
			
			// Initialize text editing for the text element
			paper.inlineTextEditing(text);

			// Start inline editing on click
			text.click(function(){
			// Retrieve created <input type=text> field
			var input = this.inlineTextEditing.startEditing();

				input.addEventListener("blur", function(e){
					// Stop inline editing after blur on the text field
						text.inlineTextEditing.stopEditing();
				}, true);
			});
			isMousePressed = true; // Get true
			event.preventDefault(); // Prevents an additional event being triggered
        }
		// End Mouse Event
		function endMoveBoxText(event) {
			disabledEvent(); // Get function disabledBoxText
			createViewElementForPath(); // Call function createViewElementForPath
			isMousePressed = false; // Get false
			saveImage(); // Save layout
		}

		//============================================================================

		function drawLine() { // Function responsible by vertical grid
			clearLayout(); // Call function clearLayout

			createViewElementForPath(); // Call function createViewElementForPath

			defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
			svg.appendChild(defs); // Add element to svg
			viewElementG.setAttribute('id', "grid"); // Add element to viewElementG
			viewElementG.appendChild(defs); // Add element to viewElementG

			// Draw Big Grid
			pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
			pattern.setAttribute('width', "20");
			pattern.setAttribute('height', "20");
			pattern.setAttribute('patternUnits', "userSpaceOnUse");
			pattern.setAttribute('id', "bigGrid");
			defs.appendChild(pattern); // Add element to defs

			rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			rect.setAttribute('width', "20");
			rect.setAttribute('height', "20");
			rect.setAttribute('fill', "none");
			pattern.appendChild(rect); // Add element to pattern

			path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('d', "M 40 0 L 0 0 0 0");
			path.setAttribute('fill', "none");
			path.setAttribute('stroke', colorBoot);
			path.setAttribute('stroke-width', "1.0");
			pattern.appendChild(path); // Add element to pattern

			// Finish
			rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			rect.setAttribute('width', "100%");
			rect.setAttribute('height', "100%");
			rect.setAttribute('fill', "url(#bigGrid)");
			defs.appendChild(rect); pattern.appendChild(path); // Add element to defs
			viewElementG.appendChild(rect); // Add element to viewElementG

			saveImage(); // Save layout
		}

		function drawGrid() { // Function responsible by horizontal grid
			clearLayout(); // Call function clearLayout

			createViewElementForPath(); // Call function createViewElementForPath

			defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
			svg.appendChild(defs); // Add element to svg
			viewElementG.setAttribute('id', "grid"); // Add element to viewElementG
			viewElementG.appendChild(defs); // Add element to viewElementG

			// Draw Big Grid
			pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
			pattern.setAttribute('width', "20");
			pattern.setAttribute('height', "20");
			pattern.setAttribute('patternUnits', "userSpaceOnUse");
			pattern.setAttribute('id', "bigGrid");
			defs.appendChild(pattern); // Add element to defs

			rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			rect.setAttribute('width', "20");
			rect.setAttribute('height', "20");
			rect.setAttribute('fill', "none");
			pattern.appendChild(rect); // Add element to pattern

			path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('d', "M 0 0 L 0 0 0 40");
			path.setAttribute('fill', "none");
			path.setAttribute('stroke', colorBoot);
			path.setAttribute('stroke-width', "1.0");
			pattern.appendChild(path); // Add element to pattern

			// Finish
			rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			rect.setAttribute('width', "100%");
			rect.setAttribute('height', "100%");
			rect.setAttribute('fill', "url(#bigGrid)");
			defs.appendChild(rect); // Add element to defs
			viewElementG.appendChild(rect); // Add element to viewElementG

			saveImage(); // Save layout
		}

		function drawGridLine() { // Function responsible by vertical and horizontal grid
			clearLayout(); // Call function clearLayout

			createViewElementForPath(); // Call function createViewElementForPath

			defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
			svg.appendChild(defs); // Add element to svg
			viewElementG.setAttribute('id', "grid"); // Add element to viewElementG
			viewElementG.appendChild(defs); // Add element to viewElementG

			// Draw Big Grid
			pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
			pattern.setAttribute('width', "20");
			pattern.setAttribute('height', "20");
			pattern.setAttribute('patternUnits', "userSpaceOnUse");
			pattern.setAttribute('id', "bigGrid");
			defs.appendChild(pattern); // Add element to defs

			rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			rect.setAttribute('width', "20");
			rect.setAttribute('height', "20");
			rect.setAttribute('fill', "none");
			pattern.appendChild(rect); // Add element to pattern

			path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('d', "M 40 0 L 0 0 0 40");
			path.setAttribute('fill', "none");
			path.setAttribute('stroke', colorBoot);
			path.setAttribute('stroke-width', "1.0");
			pattern.appendChild(path); // Add element to pattern

			// Finish
			rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			rect.setAttribute('width', "100%");
			rect.setAttribute('height', "100%");
			rect.setAttribute('fill', "url(#bigGrid)");
			defs.appendChild(rect); // Add element to defs
			viewElementG.appendChild(rect); // Add element to viewElementG

			saveImage(); // Save layout
		}

		function drawLimetrada() { // Function responsible by limetrada grid
			clearLayout(); // Call function clearLayout

            createViewElementForPath(); // Call function createViewElementForPath

            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            svg.appendChild(defs); // Add element to svg
            viewElementG.setAttribute('id', "grid"); // Add element to viewElementG
            viewElementG.appendChild(defs); // Add element to viewElementG

            // Draw Small Grid
            pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
            pattern.setAttribute('width', "8");
            pattern.setAttribute('height', "8");
            pattern.setAttribute('patternUnits', "userSpaceOnUse");
            pattern.setAttribute('id', "smallGrid");
            defs.appendChild(pattern); // Add element to defs


            path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', "M 8 0 L 0 0 0 8");
            path.setAttribute('fill', "none");
            path.setAttribute('stroke', colorBoot);
            path.setAttribute('stroke-width', "0.5");
            pattern.appendChild(path); // Add element to pattern

            // Draw Big Grid
            pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
            pattern.setAttribute('width', "80");
            pattern.setAttribute('height', "80");
            pattern.setAttribute('patternUnits', "userSpaceOnUse");
            pattern.setAttribute('id', "bigGrid");
            defs.appendChild(pattern); // Add element to defs

            rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', "80");
            rect.setAttribute('height', "80");
            rect.setAttribute('fill', "url(#smallGrid)");
            pattern.appendChild(rect); // Add element to pattern


            path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', "M 80 0 L 0 0 0 80");
            path.setAttribute('fill', "none");
            path.setAttribute('stroke', colorBoot);
            path.setAttribute('stroke-width', "1.0");
            pattern.appendChild(path); // Add element to pattern

            // Finish
            rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', "100%");
            rect.setAttribute('height', "100%");
            rect.setAttribute('fill', "url(#bigGrid)");
            defs.appendChild(rect); // Add element to defs
            viewElementG.appendChild(rect); // Add element to viewElementG

			saveImage(); // Save layout
        }

		//============================================================================

		function clearLayout() { // Function responsible by clear grid or lines
			var tempView = movementLayer.getElementsByClassName('viewelement'); // Get the class related to the viewelement element
			for(j=0; j<=5; j++){
				for(i=0; i<tempView.length; i++) {
					if(tempView[i].getAttribute('id') === "grid") {
						movementLayer.removeChild(tempView[i]); // Remove element to movementLayer
					}
				}
			}
			saveImage(); // Save layout
		}

		//============================================================================

		function downloadIt() { // Function responsible for downloading
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

			var images = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // Save the layout as image
			window.location.href = images;
		}

		//============================================================================

		function imageIt() { // Function responsible for generating the image
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

			window.open(dataURL, "_blank"); // Open a new window

			context.clearRect(0, 0, w, h);
			context.globalCompositeOperation = compositeOperation;
		}

		//============================================================================

		function saveIt() { // Function responsible for saving the layout to the database
			var serializer = new XMLSerializer();
			var xmlString = serializer.serializeToString(layer);
			var saveAlert = document.getElementById('save-alert');

			saveImage(); // Save layout

			xmlString.replace("</t", "><");
			var encoded = encodeURIComponent(xmlString);
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("POST","dml/armazena.php",true); // Call file armazena.php
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("id="+id+"&tag_svg="+encoded); // Pass the id and layout to be stored
			// Alerts the user access code
			saveAlert.innerHTML = '<div class="alert save-alert alert-dismissible" role="alert" id="save-alert"> <p>Salvo com sucesso. <a href="https://zephyrus.nied.unicamp.br/BackupAllEdiMM/EdiMM/?'+id+'" target="_blank">Clique aqui para acessar.</a></p><p>Código: '+id+'</p><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> </div>';
		}
		//============================================================================

		function pdfIt() { // Function responsible for generating the PDF
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
			formulario.action = "pdf/gerarpdf.php"; // Call file gerarpdf.php
			formulario.submit();
		}

		//============================================================================

		function setStrokeText() { // Function responsible for adding color to the letters
			if(colorStrokeLetter != colorFillElement)
				colorStrokeLetter = colorFillElement; // Get stroke
			else
				colorStrokeLetter = "none"; //Without stroke
		}

		function setDecoration() { // Function responsible for adding underline to the letters
			if (decorationLetter == "underline")
				decorationLetter = "none"; // Without underline
			else
				decorationLetter = "underline"; // Get underline
		}

		function setStyle() { // Function responsible for adding style to the letters
			if (styleLetter == "italic")
				styleLetter = "normal";  // Without italic
			else
				styleLetter = "italic"; // Get italic
		}

		//============================================================================

		function setFillText(val) {
			colorFillElement = val;
			if(colorStrokeLetter != "none")
				colorStrokeLetter = colorFillElement;
		}

		//============================================================================

		function setSizeText(val) { // Function responsible for initializing element size
			sizeLetter = val; // Get size
			document.getElementById("medida").innerHTML = val;
		}

		//============================================================================

		function setFontText(val,font) { // Function responsible for initializing element font
			fontLetter = val; // Get font
			document.getElementById("font").innerHTML = font;
		}

		//============================================================================

		function setWidth(val) { // Function responsible for initializing element width
			widthBoot = val; // Get width
			document.getElementById("linha").innerHTML = "<div class='line' style='height: "+val+"px;' id='linhaspan'></div>";
		}

		//============================================================================

		function setColor(val) { // Function responsible for managing borders and background
			colorBootElement = val; // Get color
			verificaCheckBordas(); // Call function verificaCheckBordas
			verificaCheckFundo(); // Call function verificaCheckFundo
		}

		function setColorElement() { // Function responsible for managing borders and background
			verificaCheckBordas(); // Call function verificaCheckBordas
			verificaCheckFundo(); // Call function verificaCheckFundo
		}

		//============================================================================

		function verificaCheckBordas() { // Function responsible for coloring the edges of the elements
		var bordas = document.getElementsByName("bordas"); // Get the parameters border
			// Tie responsible for coloring the entire border
			for (var i=0; i<bordas.length; i++){
				if (bordas[i].checked == true){ // If checkbox is selected
					colorBoot = colorBootElement; // Get color
				}
				if (bordas[i].checked == false){ // if checkbox is not selected

				}
			}
		}

		function verificaCheckFundo() { // Function responsible for coloring the backgrounds of the elements
		var fundo = document.getElementsByName("fundo"); // Get the parameters background
			// Tie responsible for coloring the entire background
			for (var i=0;i<fundo.length;i++){
				if (fundo[i].checked == true){ // If checkbox is selected
					colorElement = colorBootElement; // Get color
				}
				if (fundo[i].checked == false){ // if checkbox is not selected
					colorElement = "none";
				}
			}
		}

		function verificaCheckTracejado() { // Function responsible for plotting the elements
		var LinhaTrace = document.getElementsByName("tracejado"); // Get the parameters tracejado
			// Tie responsible for tracing the element
			for (var i=0;i<LinhaTrace.length;i++){
				if (LinhaTrace[i].checked == true){ // If checkbox is selected
					dashedElement = '20,20'; // Space between the traces 20
				}
				if (LinhaTrace[i].checked == false){ // if checkbox is not selected
					dashedElement = "none"; // Without Space between the traces
				}
			}
		}
