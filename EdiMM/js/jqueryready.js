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
		var key=false;
		var keybox=false;
		var draw=false;

		var move=false;
		var del=false;

		var touch=false;

		var negrito=false;
		var sublinhado=false;
		var italico=false;
		var fonts = [
			{
				name: "Arial",
				id: "arial"
			},
			{
				name: "Comic Sans",
				id: "comicsans"
			},
			{
				name: "Georgia",
				id: "georgia"
			},
			{
				name: "Impact",
				id: "impact"
			},
			{
				name: "Lucidasans",
				id: "lucidasans"
			},
			{
				name: "Monospace",
				id: "monospace"
			},
			{
				name: "Opendys Lexic",
				id: "opendyslexic"
			},
			{
				name: "Palatino",
				id: "palatino"
			},
			{
				name: "Sansserif",
				id: "sansserif"
			},
			{
				name: "Serif",
				id: "serif"
			},
			{
				name: "Symbol",
				id: "symbol"
			},
			{
				name: "Tahoma",
				id: "tahoma"
			},
			{
				name: "Times New Roman",
				id: "timesnewroman"
			},
			{
				name: "Trebuchet",
				id: "trebuchet"
			},
			{
				name: "Verdana",
				id: "verdana"
			},
			{
				name: "Webdings",
				id: "webdings"
			},
			{
				name: "Wingdings",
				id: "wingdings"
			}
		];
		(function(){
			let ulFonts = document.getElementById("font-family");
			fonts.forEach(font => {
				let li = document.createElement("li");
				let liA = document.createElement("a");
				liA.setAttribute("href", "javascript:setFontText('"+font.id+"','"+font.name+"');");
				liA.setAttribute("id", font.id);
				liA.append(font.name);
				li.appendChild(liA);
				ulFonts.appendChild(li);
			});
		})();
		// Adicionar espessura da linha
		(function(){
			let lineWeightDropdown = document.getElementById("line-weight");
			for(i=1;i<=10;i++){
				let li = document.createElement("li");
				let liA = document.createElement("a");
				let liDiv = document.createElement("div");
				liA.setAttribute("href", "javascript:setWidth("+i+");");
				liA.setAttribute("title", ""+i+"px");
				if(i<10){
					liA.setAttribute("id", "line0"+i);
					liDiv.setAttribute("class", "line");
					liDiv.style.height = i+"px";
				}
				else{
					liA.setAttribute("id", "line"+i)
					liDiv.setAttribute("class", "line");
					liDiv.style.height = i+"px";
				}
				liA.appendChild(liDiv);
				li.appendChild(liA); 
				lineWeightDropdown.appendChild(li);
			}
		})();
		// Adicionar tamanho da fonte
		(function(){
			let textSize = document.getElementById("text-size");
			for(i=10;i<=48;){
				let li = document.createElement("li");
				let liA = document.createElement("a");
				liA.setAttribute("href", "javascript:setSizeText("+i+");");
				liA.setAttribute("id", "tamanho"+i);
				liA.setAttribute("class", "tamanho");
				liA.append(i);
				li.appendChild(liA); 
				textSize.appendChild(li);
				i += 2;
			}
		})();
		changeShapeImg = function(){
			document.getElementById('selecionado').innerHTML = '<img src="images/6geometric.svg" width="20">';
		};
		changeBtnClicked= function (element){
			element.className = "btn btn-default";
		};
		changeBtnNotClicked= function (element){
			element.className = "buttonToolbar";
		};
		defaultCursor= function (){
			document.getElementById("svgDiv").style.cursor = "default";
		}
		$( document ).ready(function(){

			$("#habFont").hide("slow");   	  
			$("#habEstilo").hide("slow"); 	  
			$("#habMedida").hide("slow"); 	  
			$("#habOpcao").hide("slow");  	  
			$("#habMedidaSpan").hide("slow"); 
			$("#habFontSpan").hide("slow");

			$("#linha").html($("#line03"));

			$("#medida").html("20");

			$("#font").html("Arial");

			changeBtnClicked(document.getElementById("draw"));
			document.getElementById("svgDiv").style.cursor = "url('images/drawingcursor.svg') 6 20, auto";

	//======================================================================================

			$("#negrito").click(function(){
				if(negrito==false){
					changeBtnClicked(document.getElementById("negrito"));
					document.getElementById("negrito").href = "javascript:setStrokeText();";
					negrito=true;
				}else{
					changeBtnNotClicked(document.getElementById("negrito"));
					negrito=false;
				}
			});

			$("#sublinhado").click(function(){
				if(sublinhado==false){
					changeBtnClicked(document.getElementById("sublinhado"));
					document.getElementById("sublinhado").href = "javascript:setDecoration();";
					sublinhado=true;
				}else{
					changeBtnNotClicked(document.getElementById("sublinhado"));
					sublinhado=false;
				}
			});

			$("#italico").click(function(){
				if(italico==false){
					changeBtnClicked(document.getElementById("italico"));
					document.getElementById("italico").href = "javascript:setStyle();";
					italico=true;
				}else{
					document.getElementById("italico").className = "buttonToolbar";
					italico=false;
				}
			});

	//======================================================================================

			$("#move").click(function(){
				changeShapeImg();

				if(move==false){
					changeBtnClicked(document.getElementById("move"));
					document.getElementById("move").href = "javascript:moveIt();";
					document.getElementById("svgDiv").style.cursor = "url('images/3move.svg'), auto";
					move=true;
				}else{
					changeBtnNotClicked(document.getElementById("move"));
					defaultCursor();
					move=false;
				}

				$("#paletaCores").hide("slow");    
				$("#habOpcao").hide("slow");       
				$("#habMedida").hide("slow");      
				$("#habFont").hide("slow");        
				$("#habEstilo").hide("slow");      
				$("#habEspessSpan").hide("slow");  
				$("#habMedidaSpan").hide("slow");  
				$("#habFontSpan").hide("slow");    
				$("#habEspess").hide("slow");      

				changeBtnNotClicked(document.getElementById("delete"));
				del=false;
				changeBtnNotClicked(document.getElementById("keyboard"));
				key=false;
				changeBtnNotClicked(document.getElementById("draw"));
				draw=false;
			});
			$("#delete").click(function(){

				changeShapeImg();

				if(del==false){
					changeBtnClicked(document.getElementById("delete"));
					document.getElementById("delete").href = "javascript:deleteIt();";
					document.getElementById("svgDiv").style.cursor = "url('images/3deletecursor.svg'), auto";
					del=true;
				}else{
					changeBtnNotClicked(document.getElementById("delete"));
					defaultCursor();
					del=false;
				}

				$("#paletaCores").hide("slow");    
				$("#habOpcao").hide("slow");       
				$("#habMedida").hide("slow");      
				$("#habFont").hide("slow");        
				$("#habEstilo").hide("slow");      
				$("#habEspessSpan").hide("slow");  
				$("#habMedidaSpan").hide("slow");  
				$("#habFontSpan").hide("slow");    
				$("#habEspess").hide("slow");      

				changeBtnNotClicked(document.getElementById("move"));
				move=false;
				changeBtnNotClicked(document.getElementById("keyboard"));
				key=false;
				changeBtnNotClicked(document.getElementById("draw"));
				draw=false;
			});

			$("#menu-toggle").click(function(e) {
				e.preventDefault();
				$("#wrapper").toggleClass("toggled");
			});

			$("#touch").click(function(){
				if(touch==false){
					changeBtnClicked(document.getElementById("touch"));
					document.getElementById("touch").href = "javascript:device();";
					touch=true;
				}else{
					changeBtnNotClicked(document.getElementById("touch"));
					touch=false;
				}
			});

	//======================================================================================

			$("#keyboard").click(function(){

				$("#habFont").show("slow");   	   
				$("#habEstilo").show("slow"); 	   
				$("#habMedida").show("slow"); 	   
				$("#habFontSpan").show("slow");    
				$("#habMedidaSpan").show("slow");  
				$("#paletaCores").show("slow");    
				$("#habEspessSpan").hide("slow");  
				$("#habEspess").hide("slow"); 	   
				$("#habOpcao").hide("slow");  
				changeShapeImg();	   

				if(key==false){
					changeBtnClicked(document.getElementById("keyboard"));
					document.getElementById("keyboard").href = "javascript:createWrite();";
					document.getElementById("svgDiv").style.cursor = "text";
					key=true;
				}else{
					changeBtnNotClicked(document.getElementById("keybox"));
					defaultCursor();
					key=false;
				}

				changeBtnNotClicked(document.getElementById("keybox"));
				keybox=false;
				changeBtnNotClicked(document.getElementById("draw"));
				draw=false;
				changeBtnNotClicked(document.getElementById("move"));
				move=false;
				changeBtnNotClicked(document.getElementById("delete"));
				del=false;
			});

			$("#keybox").click(function(){

				$("#habFont").show("slow");   	   
				$("#habEstilo").show("slow"); 	   
				$("#habMedida").show("slow"); 	   
				$("#habFontSpan").show("slow");    
				$("#habMedidaSpan").show("slow");  
				$("#paletaCores").show("slow");    
				$("#habEspessSpan").hide("slow");  
				$("#habEspess").hide("slow"); 	   
				$("#habOpcao").hide("slow");  
				changeShapeImg();	   

				changeBtnNotClicked(document.getElementById("keyboard"));
				key=false;
				changeBtnNotClicked(document.getElementById("draw"));
				draw=false;
				changeBtnNotClicked(document.getElementById("move"));
				move=false;
				changeBtnNotClicked(document.getElementById("delete"));
				del=false;

				document.getElementById("keybox").href = "javascript:createBoxText();";
				document.getElementById("svgDiv").style.cursor = "text";

			});

			$("#draw").click(function(){
				$("#habFont").hide("slow");   	   
				$("#habEstilo").hide("slow"); 	   
				$("#habMedida").hide("slow");	   
				$("#habOpcao").hide("slow"); 	   
				$("#habMedidaSpan").hide("slow");  
				$("#habFontSpan").hide("slow");    
				$("#paletaCores").show("slow");    
				$("#habEspessSpan").show("slow");  
				$("#habEspess").show("slow"); 
				changeShapeImg();

				if(draw==false){
					changeBtnClicked(document.getElementById("draw"));
					document.getElementById("draw").href = "javascript:createDraw();";
					document.getElementById("svgDiv").style.cursor = "url('images/drawingcursor.svg') 6 20, auto";
					draw=true;
				}else{
					changeBtnNotClicked(document.getElementById("draw"));
					defaultCursor();
					draw=false;
				}

				changeBtnNotClicked(document.getElementById("keyboard"));
				key=false;
				changeBtnNotClicked(document.getElementById("keybox"));
				keybox=false;
				changeBtnNotClicked(document.getElementById("move"));
				move=false;
				changeBtnNotClicked(document.getElementById("delete"));
				del=false;

			});

			$("#geometricshapes").click(function(){
				$("#habFont").hide("slow");
				$("#habEstilo").hide("slow");
				$("#habMedida").hide("slow");
				$("#habMedidaSpan").hide("slow");
				$("#habFontSpan").hide("slow");
				$("#paletaCores").show("slow");
				$("#habEspess").show("slow");
				$("#habOpcao").show("slow");
				$("#habEspessSpan").show("slow");
				// changeBtnClicked($('#formasUl'));
			});

			$("#drop").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);
				document.getElementById("svgDiv").style.cursor = "url('images/2drop.svg') 15 15, auto";

				document.getElementById("drop").href = "javascript:createPonto();";

				changeBtnNotClicked(document.getElementById("delete"));
				del=false;
				changeBtnNotClicked(document.getElementById("move"));
				move=false;
				changeBtnNotClicked(document.getElementById("keyboard"));
				key=false;
				changeBtnNotClicked(document.getElementById("keybox"));
				keybox=false;
				changeBtnNotClicked(document.getElementById("draw"));
				draw=false;
			});

			$("#circle").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);

				document.getElementById("circle").href = "javascript:createCircle();";
				defaultCursor();

				changeBtnNotClicked(document.getElementById("delete"));
				del=false;
				changeBtnNotClicked(document.getElementById("move"));
				move=false;
				changeBtnNotClicked(document.getElementById("keyboard"));
				key=false;
				changeBtnNotClicked(document.getElementById("keybox"));
				keybox=false;
				changeBtnNotClicked(document.getElementById("draw"));
				draw=false;
			});

			$("#square").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);

				document.getElementById("square").href = "javascript:createRectangle();";
				defaultCursor();

				changeBtnNotClicked(document.getElementById("delete"));
				del=false;
				changeBtnNotClicked(document.getElementById("move"));
				move=false;
				changeBtnNotClicked(document.getElementById("keyboard"));
				key=false;
				changeBtnNotClicked(document.getElementById("keybox"));
				keybox=false;
				changeBtnNotClicked(document.getElementById("draw"));
				draw=false;
			});

			$("#ellipse").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);

				document.getElementById("ellipse").href = "javascript:createEllipse();";
				defaultCursor();

				changeBtnNotClicked(document.getElementById("delete"));
				del=false;
				changeBtnNotClicked(document.getElementById("move"));
				move=false;
				changeBtnNotClicked(document.getElementById("keyboard"));
				key=false;
				changeBtnNotClicked(document.getElementById("keybox"));
				keybox=false;
				changeBtnNotClicked(document.getElementById("draw"));
				draw=false;
			});

			$("#line").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);

				document.getElementById("line").href = "javascript:createLine();";
				defaultCursor();

				changeBtnNotClicked(document.getElementById("delete"));
				del=false;
				changeBtnNotClicked(document.getElementById("move"));
				move=false;
				changeBtnNotClicked(document.getElementById("keyboard"));
				key=false;
				changeBtnNotClicked(document.getElementById("keybox"));
				keybox=false;
				changeBtnNotClicked(document.getElementById("draw"));
				draw=false;
			});

			$("#inputFile").click(function(){
				$("#habOpcao").hide("slow");  
				changeBtnNotClicked(document.getElementById("delete"));
				del=false;
				changeBtnNotClicked(document.getElementById("move"));
				move=false;

				changeBtnNotClicked(document.getElementById("keyboard"));
				key=false;
				changeBtnNotClicked(document.getElementById("draw"));
				draw=false;

				changeBtnNotClicked(document.getElementById("negrito"));
				negrito=false;
				changeBtnNotClicked(document.getElementById("sublinhado"));
				sublinhado=false;
				changeBtnNotClicked(document.getElementById("keybox"));
				keybox=false;
				changeBtnNotClicked(document.getElementById("italico"));
				italico=false;
			});
			
		})