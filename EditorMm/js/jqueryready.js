		var key=false;
		var draw=false;	
		
		var move=false;
		var del=false;		
	
		var touch=false;
		
		var negrito=false;
		var sublinhado=false;
		var italico=false;
		
		$( document ).ready(function(){
			
			$("#habFont").hide("slow");   	  <!-- Esconder -->
			$("#habEstilo").hide("slow"); 	  <!-- Esconder -->			
			$("#habMedida").hide("slow"); 	  <!-- Esconder -->			
			$("#habOpcao").hide("slow");  	  <!-- Esconder -->
			$("#habMedidaSpan").hide("slow"); <!-- Esconder -->
			$("#habFontSpan").hide("slow");   <!-- Esconder -->
			
			var linha = document.getElementById("line03");
			$("#linha").html(linha);			
			
			$("#medida").html("20");
			
			$("#font").html("Arial");
			
			document.getElementById("draw").className = "btn btn-default";
			
			$("#arial").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Arial");			
			});
			
			$("#comicsans").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Comic Sans");			
			});
			
			$("#georgia").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Georgia");			
			});
			
			$("#impact").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Impact");			
			});
			
			$("#lucida").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Lucida");			
			});
			
			$("#lucidasans").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Lucidasans");			
			});
			
			$("#monospace").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Monospace");			
			});
			
			$("#opendyslexic").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Opendys Lexic");			
			});
			
			$("#palatino").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Palatino");			
			});
			
			$("#sansserif").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Sansserif");			
			});
			
			$("#serif").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Serif");			
			});
			
			$("#symbol").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Symbol");			
			});
			
			$("#tahoma").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Tahoma");			
			});
			
			$("#timesnewroman").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Times New Roman");			
			});
			
			$("#trebuchet").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Trebuchet");			
			});
			
			$("#verdana").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Verdana");			
			});
			
			$("#webdings").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Webdings");			
			});
			
			$("#wingdings").click(function(){
				$("#habFontSpan").show("slow"); <!-- Aparecer -->			
				$("#font").html("Wingdings");			
			});
			
	//======================================================================================

			$("#tamanho10").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("10");			
			});
			
			$("#tamanho12").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("12");			
			});
			
			$("#tamanho14").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("14");			
			});
			
			$("#tamanho16").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("16");			
			});
			
			$("#tamanho18").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("18");			
			});
			
			$("#tamanho20").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("20");			
			});
			
			$("#tamanho22").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("22");			
			});
			
			$("#tamanho24").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("24");			
			});
			
			$("#tamanho26").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("26");			
			});
			
			$("#tamanho28").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("28");			
			});
			
			$("#tamanho30").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("30");			
			});
			
			$("#tamanho32").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("32");			
			});
			
			$("#tamanho34").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("34");			
			});
			
			$("#tamanho36").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("36");			
			});
			
			$("#tamanho38").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("38");			
			});
			
			$("#tamanho40").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("40");			
			});
			
			$("#tamanho42").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("42");			
			});
			
			$("#tamanho44").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("44");			
			});
			
			$("#tamanho46").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("46");			
			});
			
			$("#tamanho48").click(function(){
				$("#habMedidaSpan").show("slow"); <!-- Aparecer -->			
				$("#medida").html("48");			
			});
	
	//======================================================================================
			
			$("#line01").click(function(){
				$("#habEspessSpan").show("slow"); <!-- Aparecer -->
				var img = $(this).find("img").clone();
				$("#linha").html(img);			
			});
			
			$("#line02").click(function(){
				$("#habEspessSpan").show("slow"); <!-- Aparecer -->
				var img = $(this).find("img").clone();
				$("#linha").html(img);			
			});
			
			$("#line03").click(function(){
				$("#habEspessSpan").show("slow"); <!-- Aparecer -->
				var img = $(this).find("img").clone();
				$("#linha").html(img);			
			});
			
			$("#line04").click(function(){
				$("#habEspessSpan").show("slow"); <!-- Aparecer -->
				var img = $(this).find("img").clone();
				$("#linha").html(img);			
			});
			
			$("#line05").click(function(){
				$("#habEspessSpan").show("slow"); <!-- Aparecer -->
				var img = $(this).find("img").clone();
				$("#linha").html(img);			
			});
			
			$("#line06").click(function(){
				$("#habEspessSpan").show("slow"); <!-- Aparecer -->
				var img = $(this).find("img").clone();
				$("#linha").html(img);			
			});
			
			$("#line07").click(function(){
				$("#habEspessSpan").show("slow"); <!-- Aparecer -->
				var img = $(this).find("img").clone();
				$("#linha").html(img);			
			});
			
			$("#line08").click(function(){
				$("#habEspessSpan").show("slow"); <!-- Aparecer -->
				var img = $(this).find("img").clone();
				$("#linha").html(img);			
			});
			
			$("#line09").click(function(){
				$("#habEspessSpan").show("slow"); <!-- Aparecer -->
				var img = $(this).find("img").clone();
				$("#linha").html(img);			
			});
			
			$("#line10").click(function(){
				$("#habEspessSpan").show("slow"); <!-- Aparecer -->
				var img = $(this).find("img").clone();
				$("#linha").html(img);			
			});
			
	//======================================================================================
	
			$("#negrito").click(function(){
				if(negrito==false){
					document.getElementById("negrito").className = "btn btn-default";					
					document.getElementById("negrito").href = "javascript:setStrokeText();";
					negrito=true;
				}else{
					document.getElementById("negrito").className = "buttonToolbar";				
					negrito=false;
				}	
			});
			
			$("#sublinhado").click(function(){
				if(sublinhado==false){
					document.getElementById("sublinhado").className = "btn btn-default";					
					document.getElementById("sublinhado").href = "javascript:setDecoration();";
					sublinhado=true;
				}else{
					document.getElementById("sublinhado").className = "buttonToolbar";				
					sublinhado=false;
				}					
			});
			
			$("#italico").click(function(){
				if(italico==false){
					document.getElementById("italico").className = "btn btn-default";					
					document.getElementById("italico").href = "javascript:setStyle();";
					italico=true;
				}else{
					document.getElementById("italico").className = "buttonToolbar";				
					italico=false;
				}					
			});
		
	//======================================================================================
	
			$("#move").click(function(){
			
				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";				
				document.getElementById("ellipse").className = "desabilitado";	
				document.getElementById("line").className = "desabilitado";	
				
				if(move==false){
					document.getElementById("move").className = "btn btn-default";					
					document.getElementById("move").href = "javascript:moveIt();";	
					move=true;
				}else{
					document.getElementById("move").className = "desabilitado";
					document.getElementById("move").href = "javascript:desabilitado();";					
					move=false;
				}
				
				$("#paletaCores").hide("slow");    <!-- Esconder -->
				$("#habOpcao").hide("slow");       <!-- Esconder -->
				$("#habMedida").hide("slow");      <!-- Esconder -->
				$("#habFont").hide("slow");        <!-- Esconder -->	
				$("#habEstilo").hide("slow");      <!-- Esconder -->
				$("#habEspessSpan").hide("slow");  <!-- Esconder -->
				$("#habMedidaSpan").hide("slow");  <!-- Esconder -->
				$("#habFontSpan").hide("slow");    <!-- Esconder -->				
				$("#habEspess").hide("slow");      <!-- Esconder -->
				
				document.getElementById("delete").className = "desabilitado";
				del=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";				
				draw=false;
			});
			
			$("#delete").click(function(){
			
				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";				
				document.getElementById("ellipse").className = "desabilitado";	
				document.getElementById("line").className = "desabilitado";	
				
				if(del==false){
					document.getElementById("delete").className = "btn btn-default";					
					document.getElementById("delete").href = "javascript:deleteIt();";					
					del=true;
				}else{
					document.getElementById("delete").className = "desabilitado";
					document.getElementById("delete").href = "javascript:desabilitado();";					
					del=false;
				}
				
				$("#paletaCores").hide("slow");    <!-- Esconder -->
				$("#habOpcao").hide("slow");       <!-- Esconder -->
				$("#habMedida").hide("slow");      <!-- Esconder -->
				$("#habFont").hide("slow");        <!-- Esconder -->	
				$("#habEstilo").hide("slow");      <!-- Esconder -->
				$("#habEspessSpan").hide("slow");  <!-- Esconder -->
				$("#habMedidaSpan").hide("slow");  <!-- Esconder -->
				$("#habFontSpan").hide("slow");    <!-- Esconder -->				
				$("#habEspess").hide("slow");      <!-- Esconder -->
				
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";				
				draw=false;
			});
			
			$("#menu-toggle").click(function(e) {
				e.preventDefault();
				$("#wrapper").toggleClass("toggled");
			}); 
				
			$("#touch").click(function(){
				if(touch==false){
					document.getElementById("touch").className = "btn btn-default";					
					document.getElementById("touch").href = "javascript:device();";
					touch=true;
				}else{
					document.getElementById("touch").className = "desabilitado";				
					touch=false;
				}
			});
			
	//======================================================================================	
			
			$("#keyboard").click(function(){
			
				$("#habFont").show("slow");   	   <!-- Aparecer -->	
				$("#habEstilo").show("slow"); 	   <!-- Aparecer -->
				$("#habMedida").show("slow"); 	   <!-- Aparecer -->
				$("#habFontSpan").show("slow");    <!-- Aparecer -->				
				$("#habMedidaSpan").show("slow");  <!-- Aparecer -->
				$("#paletaCores").show("slow");    <!-- Aparecer -->				
				$("#habEspessSpan").hide("slow");  <!-- Esconder -->
				$("#habEspess").hide("slow"); 	   <!-- Esconder -->	
				$("#habOpcao").hide("slow");  	   <!-- Esconder -->
				
				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";				
				document.getElementById("ellipse").className = "desabilitado";	
				document.getElementById("line").className = "desabilitado";	
				
				if(key==false){
					document.getElementById("keyboard").className = "btn btn-default";					
					document.getElementById("keyboard").href = "javascript:createWrite();";	
					key=true;
				}else{
					document.getElementById("keyboard").className = "buttonToolbar";
					document.getElementById("keyboard").href = "javascript:desabilitado();";					
					key=false;
				}
				
				document.getElementById("draw").className = "buttonToolbar";				
				draw=false;				
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("delete").className = "desabilitado";
				del=false;				
			});	
			
			$("#draw").click(function(){				
				$("#habFont").hide("slow");   	   <!-- Esconder -->	
				$("#habEstilo").hide("slow"); 	   <!-- Esconder -->
				$("#habMedida").hide("slow");	   <!-- Esconder -->	
				$("#habOpcao").hide("slow"); 	   <!-- Esconder -->	
				$("#habMedidaSpan").hide("slow");  <!-- Esconder -->
				$("#habFontSpan").hide("slow");    <!-- Esconder -->
				$("#paletaCores").show("slow");    <!-- Aparecer -->
				$("#habEspessSpan").show("slow");  <!-- Aparecer -->
				$("#habEspess").show("slow"); 	   <!-- Aparecer -->
				
				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";				
				document.getElementById("ellipse").className = "desabilitado";	
				document.getElementById("line").className = "desabilitado";	
				
				if(draw==false){
					document.getElementById("draw").className = "btn btn-default";					
					document.getElementById("draw").href = "javascript:createDraw();";	
					draw=true;
				}else{
					document.getElementById("draw").className = "buttonToolbar";
					document.getElementById("draw").href = "javascript:desabilitado();";					
					draw=false;
				}
				
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;				
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("delete").className = "desabilitado";
				del=false;
				
			});

			$("#geometricshapes").click(function(){				
				$("#habFont").hide("slow");   	  <!-- Esconder -->	
				$("#habEstilo").hide("slow"); 	  <!-- Esconder -->
				$("#habMedida").hide("slow"); 	  <!-- Esconder -->	
				$("#habMedidaSpan").hide("slow"); <!-- Esconder -->				
				$("#habFontSpan").hide("slow");   <!-- Esconder -->
				$("#paletaCores").show("slow");   <!-- Aparecer -->
				$("#habEspess").show("slow"); 	  <!-- Aparecer -->	
				$("#habOpcao").show("slow"); 	  <!-- Aparecer -->	
				$("#habEspessSpan").show("slow"); <!-- Aparecer -->
			});	
			
			$("#drop").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);
									
				document.getElementById("circle").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";				
				document.getElementById("line").className = "desabilitado";
							
				document.getElementById("drop").href = "javascript:createPonto();";	
				
				document.getElementById("delete").className = "desabilitado";
				del=false;				
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";				
				draw=false;
			});
			
			$("#circle").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);
				
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";				
				document.getElementById("line").className = "desabilitado";				
								
				document.getElementById("circle").href = "javascript:createCircle();";	
				
				document.getElementById("delete").className = "desabilitado";
				del=false;				
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";				
				draw=false;
			});
			
			$("#square").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);
				
				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";				
				document.getElementById("line").className = "desabilitado";
								
				document.getElementById("square").href = "javascript:createRectangle();";	
				
				document.getElementById("delete").className = "desabilitado";
				del=false;				
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";				
				draw=false;
			});
			
			$("#ellipse").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);
				
				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";				
				document.getElementById("line").className = "desabilitado";
								
				document.getElementById("ellipse").href = "javascript:createEllipse();";	
				
				document.getElementById("delete").className = "desabilitado";
				del=false;				
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";				
				draw=false;
			});
			
			$("#line").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);
				
				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";				
				document.getElementById("ellipse").className = "desabilitado";	
							
				document.getElementById("line").href = "javascript:createLine();";	
				
				document.getElementById("delete").className = "desabilitado";
				del=false;				
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";				
				draw=false;
			});

			$("#inputFile").click(function(){	
				$("#habOpcao").hide("slow");  <!-- Esconder -->	
				
				document.getElementById("delete").className = "desabilitado";
				del=false;				
				document.getElementById("move").className = "desabilitado";
				move=false;
				
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";				
				draw=false;	
				
				document.getElementById("negrito").className = "buttonToolbar";
				negrito=false;					
				document.getElementById("sublinhado").className = "buttonToolbar";
				sublinhado=false;					
				document.getElementById("italico").className = "buttonToolbar";
				italico=false;	
			});	
			
		})	