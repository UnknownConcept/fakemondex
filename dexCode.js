//Loading up the XML file that contains all the dex stuff
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    dexLoad(this);
    }
};
xhttp.open("GET", "dexData.xml", true);
xhttp.send();

//Global variables because I'm too lazy to pass them into functions instead.
var dexNav;
var names;
var maxNum;
var xmlDoc;
var primaryType;

//Once the xml data is grabbed, the rest of the code can run.
function dexLoad(xml) {
	//Keeps track of what is selected
	var shinyClicked = false;
    xmlDoc = xml.responseXML;
	names = xmlDoc.getElementsByTagName("name");
	maxNum = names.length - 1;
	dexNav = document.getElementById("theSelect").selectedIndex;
	
	updateInfo();
	
	//Changes Pokemon info based on the select box, updates once Go is pressed
	document.getElementById("pick").onclick = function() {
		dexNav = document.getElementById("theSelect").selectedIndex;
		updateInfo();
	};

	//Changes sprite when shiny star is clicked
	document.getElementById("shiny").onclick = function() {
		if (shinyClicked) {
			document.getElementById("normSprite").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav].childNodes[0].nodeValue + ".gif";
			hinyClicked = false;
		}
		
		else {
			document.getElementById("normSprite").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav].childNodes[0].nodeValue + "s.gif";
			shinyClicked = true;
		}
	};


	//Allows the navigation text to act like "links" that update the data.
	document.getElementById("leftNav").onclick = function() {
		dexNav -= 1;
		updateInfo();
	};
		
	document.getElementById("rightNav").onclick = function() {
		dexNav += 1;
		updateInfo();
	};
}


//TODO: A bunch of this should probably be broken into functions rather than this huge blob of crud. If it's an if, else block, I should probably just put it in a function.
function updateInfo () {
	//Makes the select box display the 'Mon that's currently selected because not doing it bothers me.
	document.getElementById("theSelect").selectedIndex = dexNav;
	
	//top navigation elements
	if (dexNav > 0 && dexNav < maxNum) {
		document.getElementById("leftNav").style.display = "inline";
		document.getElementById("rightNav").style.display = "inline";
		document.getElementById("leftNav").innerHTML = "<= " + xmlDoc.getElementsByTagName("name")[dexNav - 1].childNodes[0].nodeValue;
		document.getElementById("rightNav").innerHTML = xmlDoc.getElementsByTagName("name")[dexNav + 1].childNodes[0].nodeValue + " =>";
	}
	
	else if (dexNav == maxNum) {
		document.getElementById("leftNav").innerHTML = "<= " + xmlDoc.getElementsByTagName("name")[dexNav - 1].childNodes[0].nodeValue;
		document.getElementById("rightNav").style.display = "none";
	}
	
	else {
		document.getElementById("leftNav").style.display = "none";
		document.getElementById("rightNav").innerHTML = xmlDoc.getElementsByTagName("name")[dexNav + 1].childNodes[0].nodeValue + " =>";
	}
	
	//displayed sprite
	document.getElementById("normSprite").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav].childNodes[0].nodeValue + ".gif";

	//name
	document.getElementById("nameSlot").innerHTML = xmlDoc.getElementsByTagName("name")[dexNav].childNodes[0].nodeValue;
	
	//dex number
	document.getElementById("dexNum").innerHTML = xmlDoc.getElementsByTagName("dexNum")[dexNav].childNodes[0].nodeValue;
	
	//Descriptor
	document.getElementById("descriptor").innerHTML = xmlDoc.getElementsByTagName("desc")[dexNav].childNodes[0].nodeValue + " Pok&#233;mon";
	
	//height
	document.getElementById("h").innerHTML = "Height: " +  xmlDoc.getElementsByTagName("height")[dexNav].childNodes[0].nodeValue;
	
	//weight
	document.getElementById("w").innerHTML = "Weight: " +  xmlDoc.getElementsByTagName("weight")[dexNav].childNodes[0].nodeValue;
	
	//dex entry
	document.getElementById("dexEntry").innerHTML = xmlDoc.getElementsByTagName("dexEntry")[dexNav].childNodes[0].nodeValue;
	
	//gender ratio
	document.getElementById("genderBar1").style.width = xmlDoc.getElementsByTagName("maleRatio")[dexNav].childNodes[0].nodeValue;
	document.getElementById("genderBar2").style.width = xmlDoc.getElementsByTagName("femaleRatio")[dexNav].childNodes[0].nodeValue;
	
	//abilities
	if (xmlDoc.getElementsByTagName("type1")[dexNav].childNodes[0].nodeValue == xmlDoc.getElementsByTagName("type2")[dexNav].childNodes[0].nodeValue) {
		document.getElementById("type").innerHTML = xmlDoc.getElementsByTagName("type1")[dexNav].childNodes[0].nodeValue;
	}
	else {
		document.getElementById("type").innerHTML = xmlDoc.getElementsByTagName("type1")[dexNav].childNodes[0].nodeValue + " " + xmlDoc.getElementsByTagName("type2")[dexNav].childNodes[0].nodeValue;
	}
	
	//type
	if (xmlDoc.getElementsByTagName("ability1")[dexNav].childNodes[0].nodeValue == xmlDoc.getElementsByTagName("ability2")[dexNav].childNodes[0].nodeValue) {
		document.getElementById("ability").innerHTML = xmlDoc.getElementsByTagName("ability1")[dexNav].childNodes[0].nodeValue + "</br>" + "<i>" + xmlDoc.getElementsByTagName("hiddenAbility")[dexNav].childNodes[0].nodeValue + "</i>";
	}
	else {
		document.getElementById("ability").innerHTML = xmlDoc.getElementsByTagName("ability1")[dexNav].childNodes[0].nodeValue + "<br />" + xmlDoc.getElementsByTagName("ability2")[dexNav].childNodes[0].nodeValue + "<br />" + "<i>" + xmlDoc.getElementsByTagName("hiddenAbility")[dexNav].childNodes[0].nodeValue + "</i>";
	}
	
	//Evolutions
	//Logic needs to be different based on what stage in the evolution line it is and how many stages there are...
	if (xmlDoc.getElementsByTagName("evoNum")[dexNav].childNodes[0].nodeValue == "2") {
		//If a three stage is viewed and then a two stage, info for the previous second evolution step will still be displayed...
		//So you have to make sure that "evoMeth2" and "evo3" are set back to null.
		
		//Two stage, base evolution
		if (xmlDoc.getElementsByTagName("stage")[dexNav].childNodes[0].nodeValue == "Base") {
			document.getElementById("evoMeth1").innerHTML = xmlDoc.getElementsByTagName("evoMethod")[dexNav].childNodes[0].nodeValue;
			document.getElementById("evoMeth2").innerHTML = "";
			document.getElementById("evo1").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo2").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav + 1].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo3").style.visibility = "hidden";
			document.getElementById("evo1").onclick = function() {
				
			};
			document.getElementById("evo2").onclick = function() {
				dexNav += 1;
				updateInfo();
			};
		}
		//Two stage, final evolution
		else if (xmlDoc.getElementsByTagName("stage")[dexNav].childNodes[0].nodeValue == "Final") {
			document.getElementById("evoMeth1").innerHTML = xmlDoc.getElementsByTagName("evoMethod")[dexNav - 1].childNodes[0].nodeValue;
			document.getElementById("evoMeth2").innerHTML = "";
			document.getElementById("evo1").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav - 1].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo2").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo3").style.visibility = "hidden";
			document.getElementById("evo1").onclick = function() {
				dexNav -= 1;
				updateInfo();
			};
			document.getElementById("evo2").onclick = function() {
				
			};
		}
		//Ooopsie doopsie
		else {
			document.getElementById("evoMeth1").innerHTML = "I dun goofed with data entry probably while copying and pasting. Please tell me to fix :(";
			document.getElementById("evoMeth2").innerHTML = "";
			document.getElementById("evo1").style.visibility = "hidden";
			document.getElementById("evo2").style.visibility = "hidden";
			document.getElementById("evo3").style.visibility = "hidden";
		}
	}
	

	else if (xmlDoc.getElementsByTagName("evoNum")[dexNav].childNodes[0].nodeValue == "3") {
		//Three stage, base evolution
		if (xmlDoc.getElementsByTagName("stage")[dexNav].childNodes[0].nodeValue == "Base") {
			document.getElementById("evoMeth1").innerHTML = xmlDoc.getElementsByTagName("evoMethod")[dexNav].childNodes[0].nodeValue;
			document.getElementById("evoMeth2").innerHTML = xmlDoc.getElementsByTagName("evoMethod")[dexNav + 1].childNodes[0].nodeValue;
			document.getElementById("evo3").style.visibility = "visible";
			document.getElementById("evo1").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo2").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav + 1].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo3").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav + 2].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo1").onclick = function() {
				
			};
			document.getElementById("evo2").onclick = function() {
				dexNav += 1;
				updateInfo();
			};
			document.getElementById("evo3").onclick = function() {
				dexNav += 2;
				updateInfo();
			};
		}
		//Three stage, second evolution
		else if (xmlDoc.getElementsByTagName("stage")[dexNav].childNodes[0].nodeValue == "Second") {
			document.getElementById("evoMeth1").innerHTML = xmlDoc.getElementsByTagName("evoMethod")[dexNav - 1].childNodes[0].nodeValue;
			document.getElementById("evoMeth2").innerHTML = xmlDoc.getElementsByTagName("evoMethod")[dexNav].childNodes[0].nodeValue;
			document.getElementById("evo3").style.visibility = "visible";
			document.getElementById("evo1").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav - 1].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo2").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo3").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav + 1].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo1").onclick = function() {
				dexNav -= 1;
				updateInfo();
			};
			document.getElementById("evo2").onclick = function() {
				
			};
			document.getElementById("evo3").onclick = function() {
				dexNav += 1;
				updateInfo();
			};
		}
		//Three stage, final evolution
		else if (xmlDoc.getElementsByTagName("stage")[dexNav].childNodes[0].nodeValue == "Final") {
			document.getElementById("evoMeth1").innerHTML = xmlDoc.getElementsByTagName("evoMethod")[dexNav - 2].childNodes[0].nodeValue;
			document.getElementById("evoMeth2").innerHTML = xmlDoc.getElementsByTagName("evoMethod")[dexNav - 1].childNodes[0].nodeValue;
			document.getElementById("evo3").style.visibility = "visible";
			document.getElementById("evo1").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav - 2].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo2").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav - 1].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo3").src = xmlDoc.getElementsByTagName("spriteurl")[dexNav].childNodes[0].nodeValue + ".gif";
			document.getElementById("evo1").onclick = function() {
				dexNav -= 2;
				updateInfo();
			};
			document.getElementById("evo2").onclick = function() {
				dexNav -= 1;
				updateInfo();
			};
			document.getElementById("evo3").onclick = function() {
				
			};
		}
		//Oof ouch owie
		else {
			document.getElementById("evoMeth1").innerHTML = "I dun goofed with data entry probably while copying and pasting. Please tell me to fix :(";
			document.getElementById("evoMeth2").innerHTML = "";
			document.getElementById("evo1").style.visibility = "hidden";
			document.getElementById("evo2").style.visibility = "hidden";
			document.getElementById("evo3").style.visibility = "hidden";
		}
	}
	
	//No evolutions
	else {
		document.getElementById("evoBox").innerHTML = "";
	}
	
	//Change background
	bgChange();
	
}

//Changes background based on type1 value
function bgChange() {
	primaryType = document.getElementById("type").innerHTML = xmlDoc.getElementsByTagName("type1")[dexNav].childNodes[0].nodeValue;
	
	if (primaryType == "Bug") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/bug_bg.jpg')";
	}
	else if (primaryType == "Dark") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/dark_bg.jpg')";
	}
	else if (primaryType == "Dragon") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/dragon_bg.jpg')";
	}
	else if (primaryType == "Electric") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/electric_bg.jpg')";
	}
	else if (primaryType == "Fairy") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/fairy_bg.jpg')";
	}
	else if (primaryType == "Fighting") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/fighting_bg.jpg')";
	}
	else if (primaryType == "Fire") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/fire_bg.jpg')";
	}
	else if (primaryType == "Flying") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/flying_bg.jpg')";
	}
	else if (primaryType == "Ghost") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/ghost_bg.jpg')";
	}
	else if (primaryType == "Grass") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/grass_bg.jpg')";
	}
	else if (primaryType == "Ground") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/ground_bg.jpg')";
	}
	else if (primaryType == "Ice") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/ice_bg.jpg')";
	}
	else if (primaryType == "Normal") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/normal_bg.jpg')";
	}
	else if (primaryType == "Poison") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/poison_bg.jpg')";
	}
	else if (primaryType == "Psychic") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/psychic_bg.jpg')";
	}
	else if (primaryType == "Rock") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/rock_bg.jpg')";
	}
	else if (primaryType == "Steel") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/steel_bg.jpg')";
	}
	else if (primaryType == "Water") {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/water_bg.jpg')";
	}
	//This shouldn't happen, but pretend everything is "normal" if it does Bp
	else {
		document.getElementById("dexContainer").style.backgroundImage = "url('/fakemondex/backgrounds/normal_bg.jpg')";
	}
}