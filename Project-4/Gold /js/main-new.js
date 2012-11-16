$('#home').on('pageinit', function(){
	$.mobile.changePage( "#adPages", {
	type: "post",
	data: $("#computers").serialize()
});
});	$('#adPages').on('pageinit', function(){	$('#displayLink').click(getData);		$('#clear').click(clearLocal);		$('ul.liData').listview('refresh');						
	//code needed for home page goes here
});	
		
$('#signUp').on('pageinit', function(){
							$(makeList);				//$('#submit').click(validate);				var reset = $("#reset").validate();					reset.resetForm();				var myForm = $('#contactForm');			
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {			
		var data = myForm.serializeArray();
			storeData(data);									}							
	});
					//Set link & Submit //var displayLink = $('#displayLink').click(getData);//var clearLink = $('#clear').click(clearLocal);//
		
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.



var getData = function(){		toggleControls("on");		if(localStorage.length === 0){			alert("There is no data in Local Storage so using default");						autoFillData();		}				//Write Data from Local Storage to the browser		//var makeDiv = document.createElement('div');		var makeList = document.createElement('ul');		makeList.setAttribute("class","liData");		makeList.setAttribute("data-filter", "true");		//makeDiv.appendChild(makeList);		$('#data-1').append(makeList);		//$('items').style.display= "display";		for (var i = 0, len = localStorage.length; i <len; i++)		 {			var makeli = document.createElement('li');			var linksLi = document.createElement('li')			makeList.appendChild(makeli);			var key = localStorage.key(i);			var value = localStorage.getItem(key);			//Convert the string from local storage value back to an object using JSON			var obj = JSON.parse(value);			var makeSubList = document.createElement('ul');			makeli.appendChild(makeSubList);			getImage(obj.adType[1], makeSubList);			for( var n in obj){				var makeSubli = document.createElement('li');				makeSubList.appendChild(makeSubli);				var optSubText = obj[n][0]+" "+obj[n][1];				makeSubli.innerHTML = optSubText;				makeSubList.appendChild(linksLi);						}								makeItemLinks(localStorage.key(i), linksLi); //create our edit and Delete buttons for each item in local storage		}		};

var storeData = function(key){	if(!key){	console.log("StoreData");		var id = Math.floor(Math.random()*10001);		}else{			id = key;	}		getSelectedRadio();		var item 				= {};						item.fname			= ["First Name:", $('#fname').val()];			item.lname			= ["Last Name:", $('#lname').val()];			item.uname			= ["User Name:", $('#uname').val()];			item.pword			= ["Password:", $('#pword-chk').val()];			item.sex			= ["sex:", sexValue];			item.email			= ["Email:", $('#email').val()];			item.adType			= ["Ad Type:", $('#AdType').val()];			item.freq			= ["freq:", $('#freq').val()];			item.date			= ["Date:",$('#date').val()];			item.address		= ["Home Address:", $('#address').val()];		//Save data into Local Storage: Use Stringify to convert our object to a string.		localStorage.setItem(id, JSON.stringify(item));		alert("Your Contact has been entered");			
	
}; var getSelectedRadio = function (){		var radios = document.forms[0].sex;		for (var i = 0; i < radios.length; i++) {					if(radios[i].checked){				sexValue =	radios[i].value;							}
		}	};		var getImage =	function (imgName, makeSubList){		var imageLi = document.createElement('li');		makeSubList.appendChild(imageLi);		var newImage = document.createElement('img');		var setSrc = newImage.setAttribute("src", "images/"+ imgName +".png");		imageLi.appendChild(newImage);				};

var	deleteItem = function (){	var ask = confirm("are you sure you want to delete this Record?");			if(ask){				localStorage.removeItem(this.key);				window.location.reload();			}else{				alert('The records were not deleted');		}
				
};
					
var clearLocal = function(){			if (localStorage.length === 0) {			alert("Theres is no data to clear");				}		
else{		localStorage.clear();		alert("All record were deleted");		window.location.reload();		return false;	}

};
var editItem = function (){		//Grab the data from our item from Local Storage		var value = localStorage.getItem(this.key);		var item = JSON.parse(value);				toggleControls("off");		//console.log("This is the Console Log " + value);		//Populate the form field with current local storage values		$("fname").value = item.fname[1];		$('lname').value = item.lname[1];		$('uname').value = item.uname[1];		$('pword-chk').value = item.pword[1];		$('email').value = item.email[1];		$('AdType').value = item.adType[1];							var radios = document.forms[0].sex;		for(var i = 0; i < radios.length; i++){					if (radios[i].value == "Male" && item.sex[1] == "Male"){				radios[i].setAttribute("checked", "checked");							}else if(radios[i].value == "Female" && item.sex[1] == "Female"){				radios[i].setAttribute("checked", "checked");							}		}		$('freq').value = item.freq[1];		$('date').value = item.date[1];		$('address').value = item.address[1];								//Remove the initial listener from the input "save wisher" button		$("submit").click(storeData);		//Change Submit button Value to Edit button		$('submit').value = "Edit User";		var editSubmit = $('submit');		editSubmit.validate();		editSubmit.key= this.key;		//Save the key value established in this function is the property event, that could be used when savin the data.				};var makeList = function (){		var formTag= document.getElementsByTagName('form'),			selectLi = $("#select");			makeSelect= document.createElement('select'),			makeSelect.setAttribute("id", "AdType");		for (var i = 0, j=adTypeGroup.length; i < j; i++) {
			var makeOption = document.createElement('option');			var optText = adTypeGroup[i];			makeOption.setAttribute('value', optText);			makeOption.innerHTML = optText;			makeSelect.appendChild(makeOption);
}			selectLi.append(makeSelect);	};

var toggleControls = function (n){		switch(n){			case "on":										//$('#contactForm').css("display","none");				$('#clear').css("display","inline");				$("#displayLink").css("display","none");				$('#addNew').css("display","inline");				$('#ms1').css("display","none");				//$('#ms2').css("display","none");				break;			case "off":				//$('#contactForm').css("display", "block");				$('#clear').css("display", "inline");				$("#displayLink").css("display", "inline");				$('#addNew').css('display',"none");				//$('#items').css("display","none");				//$('#ms1').css('display', "inline");				//$('#ms2').css('display',"inline");				break;			default:				return false;		}			};	var makeItemLinks =	function (key, linksLi){	var editLink = document.createElement('a');		editLink.href = '#';		editLink.key = key;				editText = "Edit User";		editLink.addEventListener('click', editItem);		editLink.innerHTML = editText;		linksLi.appendChild(editLink);				//Line Break				var breakTag = document.createElement('br');		linksLi.appendChild(breakTag);				//add Delete Linke	var deleteLink = document.createElement('a');		deleteLink.href = "#";		deleteLink.key = key;		deleteText = "Delete User";		deleteLink.addEventListener("click", deleteItem);		deleteLink.innerHTML = deleteText;		linksLi.appendChild(deleteLink);	}	var autoFillData = function(){		//Then it is put the data in Local Data		for(var n in json){			var id = Math.floor(Math.random()*10001);			localStorage.setItem(id, JSON.stringify(json[n]));			//console.log("this is the local Storage Test");		}
	 
};	//Variable defailts	var adTypeGroup = ["--Choose an AdType--" , "Computers & Electronics", "Educational", "Music","Lifestyle","Parenting", "Animals & Pets","Auto & Cycles","Business & Finance", "Cooking, Food & Beverage", "Entertainment & TV", "Fashion & Style", "Home & Gardening"],		sexValue;		var save = $("#submit");				