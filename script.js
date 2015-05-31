
$("#page_ranking").on("swipeleft", function() { document.location.href="#page_viewRanks";getranks(); });
$("#page_viewRanks").on("swiperight", function() { document.location.href="#page_ranking";startRanking(); });

// CONSTANT DECLARATIONS STARTS HERE.................................

const HANSOME = 1;
const BOLDER = 2;
const STUDIES = 3;
const SPORTS = 4;
const INTELLIGENT = 5;
const STRONGER = 6;


// VARIABLE DECLARATIONS STARTS HERE.................................

var deviceInfo = new Array();

var locations = 'http://localhost:8888/facerank/';



var prank_all = [];
var prank_r1 = [];
var prank_r2 = [];
var prank_r3 = [];
var prank_r4 = [];
var prank_r5 = [];
var prank_r6 = [];
var x = 0;
var loading = document.getElementById("loading");
var pcomb = null;
var pdata = null;
var low = 1;
var high = 0;
var state = true;
var p1combination = "";
var p2combination = "";
var nofcomb = 0;
var randomp1;
var randomp2;
var randomp1s;
var randomp2s;
var randomchoice = 0;
var univ = 0;




// PROGRAM FLOW STARTS HERE..........................................


deviceInfo = getDeviceInfo();

loading.setAttribute("class","hide");

if(isStartedFirstTime() == true) startAppIntro();  // when started first time.. 
	
else if(isPUploadSkipped() == false) document.location.href="#page_intro2";   // check if user upload skipped 
	
else  { document.location.href="#page_viewRanks"; }
	





//...............................................................................................................
//...............................................................................................................
//...............................................................................................................
//...............................................................................................................
//...............................................................................................................
//...............................................................................................................
//...............................................................................................................
//...............................................................................................................


// FUNCTION DECLARATIONS GOES HERE....................................



function rankcontinue(){


	console.log("started rank continue");


	 randomp1 = parseInt((Math.random() * (high - low + 1)) + low);

	 console.log("randomp1 = " + randomp1);


			$.post(locations+'getpcomb.php',{ pid:randomp1 },function(rpcomb,status) {

				if(rpcomb == "empty") { pcomb = [1,2,3]; }
				else {
					pcomb = JSON.parse(rpcomb);
					console.log("received p1's combination data");

				 setTimeout(function() {
		
		
		

		if(pcomb == null) pcomb = [1,2,3];
		console.log("combination length = " + pcomb.length);
		for(p= 0; p < (pcomb.length-1);) { 

			univ++;
			if(univ > 30) { alert("Ranking Finished!"); }

			 randomp2 = parseInt((Math.random() * (high - low + 1)) + low);
			 randomchoice = parseInt((Math.random() * (6 - 1 + 1)) + 1);
			
				console.log("generated in loop randomp2 = " + randomp2 + " ranchoice = " + randomchoice);

			 	randomp1s = randomp1.toString();
				randomp2s = randomp2.toString();

				var didntbefore = true;

			if(randomp1 == randomp2) { console.log("random persons are eqaual.looping again!");continue; }
				
			
				
				var temp = 0;
				var fail = 0;
				var fail2 = 0;
				

				for(temp = 0; temp < (pcomb.length-1);temp++) {
					
					if(pcomb[temp][0] == randomp2)  { console.log("the persons came up for unknown category");

							
						if(pcomb[temp][1] != randomchoice){ continue; }  
						else if(pcomb[temp][1] == randomchoice) { fail2 = 1 ; continue;console.log("sorry for known category"); }

					}
					else {continue;}

				}
				if(fail2 == 1) continue;
				else { break; }
				
				if(fail == 0) { break;console.log("persons came up for first time");}
						
		}
					


				
			

		
		
		
		

		$("#rank_done1").hide();
		$("#rank_done2").hide();





	
	var page_pinfo1 = document.getElementById("page_pinfo1");
	var page_pinfo2 = document.getElementById("page_pinfo2");
	var p1name = document.getElementById("p1name");
	var p1img = document.getElementById("img_1");		

	var p2name = document.getElementById("p2name");
	var p2img = document.getElementById("img_2");

	var question = document.getElementById("question");

	p1img.removeAttribute("src");
	p2img.removeAttribute("src");
	p1img.setAttribute("src","images/"+randomp1+".jpg");
	p2img.setAttribute("src","images/"+randomp2+".jpg");
	
	p1name.innerHTML = pdata[randomp1s]["pname"];
	p2name.innerHTML = pdata[randomp2s]["pname"];

	switch(randomchoice) {

		case 1:
			question.innerHTML = "Who's HANDSOME?";
			break;
		case 2:
			question.innerHTML = "is The First Bolder?";
			break;
		case 3:
			question.innerHTML = "who studies well?";
			break;
		case 4:
			question.innerHTML = "who plays sports well?";
			break;
		case 5:
			question.innerHTML = "who's intelligent?";
			break;
		case 6:
			question.innerHTML = "who is stronger?";


	}

	 page_pinfo1.innerHTML = "Name: " + pdata[randomp1s]["pname"] + '<br />' +
	 "Gender: " + pdata[randomp1s]["pgender"] + '<br />' +
	 "Age: " + pdata[randomp1s]["page"] + '<br />' +
	 "Group: " + pdata[randomp1s]["pgroup"] + '<br />' +
	 "Date of Birth: " + pdata[randomp1s]["pdob"] + '<br />' +
	 "About Me: " + pdata[randomp1s]["pabout"];


	 page_pinfo2.innerHTML = "Name: " + pdata[randomp2s]["pname"] + '<br />' +
	 "Gender: " + pdata[randomp2s]["pgender"] + '<br />' +
	 "Age: " + pdata[randomp2s]["page"] + '<br />' +
	 "Group: " + pdata[randomp2s]["pgroup"] + '<br />' +
	 "Date of Birth: " + pdata[randomp2s]["pdob"] + '<br />' +
	 "About Me: " + pdata[randomp2s]["pabout"];


	p1combination = randomp2 + "/" + randomchoice + "|";
	p2combination = randomp1 + "/" + randomchoice+  "|";

	loading.setAttribute("class","hide");
},3000);
 
				}
});
			
}

//...............................................................................................................

function getDeviceInfo() {

	var temp = new Array();

	temp["width"] = document.body.clientWidth;
	temp["height"] = document.body.clientHeight;
	return temp;
} 

//...............................................................................................................


function isStartedFirstTime() {

	if(localStorage.getItem("isStartedFirstTime") == null) return true;
	else {
	 return false;
	}
}

//...............................................................................................................

function isPUploadSkipped() {

	if(localStorage.getItem("isPUploadSkipped") == true) return true;
	else if(localStorage.getItem("isPUploadSkipped") == null) return false;
	else return true;
	

}

//...............................................................................................................


function startAppIntro() {

	 localStorage.setItem("isStartedFirstTime",false);
	
	  document.location.href="#page_intro";
	  

}

//...............................................................................................................



function startRanking() { 


	console.log("started ranking");
	loading.removeAttribute("class");
	console.log("the value of x is " + x);
	if(x == 0) {
		console.log("loading persons data");
		$.post(locations+'getpdata.php',function(data,status) {

		if(data["length"] == 0) { alert("no persons added to FaceRank"); }
		pdata = JSON.parse(data);
		high = pdata["length"];
		console.log("high value is " + high);
		if(high < 2) { alert("Ranking Finished!"); }

		
		
	}); 
}

x++;
console.log("value of x is " + x);
if(x > 10) { x = 0;console.log("x resetted to 0"); }

setTimeout(rankcontinue,2000);

} 


//...............................................................................................................

function skipUploadPData() {

	localStorage.setItem("isPUploadSkipped",true);
	startRanking();
}

//...............................................................................................................

function uploadPData(formss) {
	
	 $.post(locations+'uploadpdata.php',{ pname:formss.pname.value,page:formss.page.value,pgender:formss.pgender.value,pgroup:formss.pgroup.value,pdob:formss.pdob.value,pabout:formss.pabout.value }, function(result,status) {

			if(result == "pexists") {
				alert("person already exists");
			}
			else {

				document.getElementById("startPageRanking").click();
				skipUploadPData();
				
			}
		
	}); 

	
	return false;
}

//...............................................................................................................

function rank_category_changed(valuer) {

	var value = valuer.value;

 if(value == 'ALL') {
	var i = 0;
	var datas = "";
	for(i = 0;i < prank_all.length;i++) { 
			datas += "<li>" + pdata[prank_all[i]]['pname'] + "</li>";
		}
	$("#rank_place").html(datas);

		
	}

  if(value == 'HANDSOME') {
	var i = 0;
	var datas = "";
	for(i = 0;i < prank_r1.length;i++) { 
			datas += "<li>" + pdata[prank_r1[i]]['pname'] + "</li>";
		}


	$("#rank_place").html(datas);

 }

 if(value == 'BOLDER') {
	var i = 0;
	var datas = "";
	for(i = 0;i < prank_r2.length;i++) { 
			datas += "<li>" + pdata[prank_r2[i]]['pname'] + "</li>";
		}


	$("#rank_place").html("<li data-role='list-divider'>BOLDER</li>" + datas);

 }

  if(value == 'STUDIES') {
	var i = 0;
	var datas = "";
	for(i = 0;i < prank_r3.length;i++) { 
			datas += "<li>" + pdata[prank_r3[i]]['pname'] + "</li>";
		}


	$("#rank_place").html(datas);

 }

  if(value == 'SPORTS') {
	var i = 0;
	var datas = "";
	for(i = 0;i < prank_r4.length;i++) { 
			datas += "<li>" + pdata[prank_r4[i]]['pname'] + "</li>";
		}


	$("#rank_place").html(datas);

 }

 if(value == 'INTELLIGENCE') {
	var i = 0;
	var datas = "";
	for(i = 0;i < prank_r5.length;i++) { 
			datas += "<li>" + pdata[prank_r5[i]]['pname'] + "</li>";
		}


	$("#rank_place").html(datas);

 }

  if(value == 'STRONGER') {
	var i = 0;
	var datas = "";
	for(i = 0;i < prank_r6.length;i++) { 
			datas += "<li>" + pdata[prank_r6[i]]['pname'] + "</li>";
		}


	$("#rank_place").html(datas);

 }

	
}







// ...............................................................................................................
//................................................................................................................
//................................................................................................................

// LISTENER FUNCTIONS GOES HERE.................


function rank_for_p1() {

$("#rank_done1").show();

updatecombination();
p1combination = "";
p2combination = "";
updaterank(randomp1,randomchoice);


startRanking();

}

//...............................................................................................................


function rank_for_p2() {

$("#rank_done2").show();

updatecombination();
p1combination = "";
p2combination = "";
updaterank(randomp2,randomchoice);

startRanking();

}

//...............................................................................................................

function updatecombination() {

	$.post(locations+"uploadcomb.php",{p1id:randomp1,p2id:randomp2,p1comb:p1combination,p2comb:p2combination},function(data,status) {

		if(status == "success") { }
		else { console.log("update combination error"); }

	});
}


//...............................................................................................................


function updaterank(pid,randomchoice) {
	
	loading.setAttribute("class","hide");

	$.post(locations+"updaterank.php", {pide:pid,randomchoicee:randomchoice},function(data,status) {

	

	});
	

}


function getranks() {


$.post(locations+"getranks_all.php",function(data,status) {
	prank_all = JSON.parse(data);


});

$.post(locations+"getranks_r1.php",function(data,status) {
	prank_r1 = JSON.parse(data);


});


$.post(locations+"getranks_r2.php",function(data,status) {
	prank_r2 = JSON.parse(data);


});


$.post(locations+"getranks_r3.php",function(data,status) {
	prank_r3 = JSON.parse(data);


});


$.post(locations+"getranks_r4.php",function(data,status) {
	prank_r4 = JSON.parse(data);


});


$.post(locations+"getranks_r5.php",function(data,status) {
	prank_r5 = JSON.parse(data);


});


$.post(locations+"getranks_r6.php",function(data,status) {
	prank_r6 = JSON.parse(data);


});

}
