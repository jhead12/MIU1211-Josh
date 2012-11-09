$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	$('#adPage').on('pageinit', function(){		
	//code needed for home page goes here
});	
		
$('#signUp').on('pageinit', function(){
					$('#displayLink').click(getData);		$('#clear').click(clearLocal);		$(makeList);				//$('#submit').click(validate);				var reset = $("#reset").validate();					reset.resetForm();				var myForm = $('#contactForm');			
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {			
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
					//Set link & Submit //var displayLink = $('#displayLink').click(getData);//var clearLink = $('#clear').click(clearLocal);//var save = $('#submit').click(validate);
	//any other code needed for addItem page goes here		
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.



function getData(){		toggleControls("on");		if(localStorage.length === 0){			alert("There is no data in Local Storage so using default");			//console.log("getData");			autoFillData();		}				//Write Data from Local Storage to the browser		//var makeDiv = document.createElement('div');		var makeList = document.createElement('li');		//makeDiv.appendChild(makeList);		$('#data-1').append(makeList);		//ge('items').style.display= "display";		for (var i = 0, len = localStorage.length; i <len; i++)		 {			var makeli = document.createElement('li');			var linksLi = document.createElement('li')			makeList.appendChild(makeli);			var key = localStorage.key(i);			var value = localStorage.getItem(key);			//Convert the string from local storage value back to an object using JSON			var obj = JSON.parse(value);			var makeSubList = document.createElement('ul');			makeli.appendChild(makeSubList);			getImage(obj.adType[1], makeSubList);			for( var n in obj){				var makeSubli = document.createElement('li');				makeSubList.appendChild(makeSubli);				var optSubText = obj[n][0]+" "+obj[n][1];				makeSubli.innerHTML = optSubText;				makeSubList.appendChild(linksLi);						}								makeItemLinks(localStorage.key(i), linksLi); //create our edit and Delete buttons for each item in local storage		}		};

var storeData = function(data){if(!key){	var id = Math.floor(Math.random()*10001);	}else{		id =key;	}	getSelectedRadio();		var item 				= {};			item.uname			= ["User Name:", $('#uname').val()];			item.fname			= ["First Name:", $('#fname').val()];			item.lname			= ["Last Name:", $('#lname').val()];			item.pword			= ["Password:", $('#pword-chk').val()];			item.sex			= ["sex:", sexValue];			item.email			= ["Email:", $('#email').val()];			item.adType			= ["Ad Type:", $('#adType').val()];			item.freq			= ["freq:", $('#freq').val()];			item.date			= ["Date:",$('#date').val()];			item.address		= ["Home Address:", $('#address').val()];		//Save data into Local Storage: Use Stringify to convert our object to a string.		localStorage.setItem(id, JSON.stringify(item));		alert("Your Contact has been entered");			
	
}; function getSelectedRadio(){		var radios = document.forms[0].sex;		for (var i = 0; i < radios.length; i++) {					if(radios[i].checked){				sexValue =	radios[i].value;							}
		}	};			function getImage(imgName, makeSubList){		var imageLi = document.createElement('li');		makeSubList.appendChild(imageLi);		var newImage = document.createElement('img');		var setSrc = newImage.setAttribute("src", "images/"+ imgName +".png");		imageLi.appendChild(newImage);				};

var	deleteItem = function (){	var ask = confirm("are you sure you want to delete this Record?");			if(ask){				localStorage.removeItem(this.key);				window.location.reload();			}else{				alert('The records were not deleted');		}
				
};
					
var clearLocal = function(){			if (localStorage.length === 0) {			alert("Theres is no data to clear");				}		
else{		localStorage.clear();		alert("All record were deleted");		window.location.reload();		return false;	}

};
var editItem = function(){
	var value = localStorage.getItem(this.key);		var item = JSON.parse(value);				toggleControls("off");		//console.log("This is the Console Log " + value);		//Populate the form field with current local storage values		$("#fname").val()= item.fname[1];		$('#lname').val()= item.lname[1];		$('#pword-chk').val()= item.pword[1];		$('#email').val()= item.email[1];		$('#adType').val()= item.adType[1];			$('#uname').val()= item.uname[1];				var radios = document.forms[0].sex;		for(var i = 0; i < radios.length; i++){					if (radios[i].val()== "Male" && item.sex[1] == "Male"){				radios[i].setAttribute("checked", "checked");							}else if(radios[i].val() == "Female" && item.sex[1] == "Female"){				radios[i].setAttribute("checked", "checked");							}		}		$('#freq').val()= item.freq[1];		$('#date').val()= item.date[1];		$('#address').val()= item.address[1];								//Remove the initial listener from the input "save wisher" button		save.removeEventListener("click", storeData);		//Change Submit button Value to Edit button		$('#submit').val() = "Edit User";		var editSubmit = $('#submit');		editSubmit.addEventListener("click", validate);		editSubmit.key= this.key;		//Save the key value established in this function is the property event, that could be used when savin the data.		
};function makeList(){		var formTag= document.getElementsByTagName('form'),			selectLi = $("#select");			makeSelect= document.createElement('select'),			makeSelect.setAttribute("id", "group");		for (var i = 0, j=adTypeGroup.length; i < j; i++) {
			var makeOption = document.createElement('option');			var optText = adTypeGroup[i];			makeOption.setAttribute('value', optText);			makeOption.innerHTML = optText;			makeSelect.appendChild(makeOption);
}			selectLi.append(makeSelect);	};

var toggleControls = function (n){		switch(n){			case "on":										$('#contactForm').css("display","none");				$('#clear').css("display","inline");				$("#displayLink").css("display","none");				$('#addNew').css("display","inline");				$('#ms1').css("display","none");				//$('#ms2').css("display","none");				break;			case "off":				$('#contactForm').css("display", "block");				$('#clear').css("display", "inline");				$("#displayLink").css("display", "inline");				$('#addNew').css('display',"none");				//$('#items').css("display","none");				//$('#ms1').css('display', "inline");				//$('#ms2').css('display',"inline");				break;			default:				return false;		}			};var autofillData = function (){		//Then it is put the data in Local Data		for(var n in json){			var id = Math.floor(Math.random()*10001);			localStorage.setItem(id, JSON.stringify(json[n]));			//console.log("this is the local Storage Test");		}
	 
}; 	//Variable defailts	var adTypeGroup = ["--Choose A Group--" , "Computers & Electronics", "Educational", "Music","Lifestyle","Parenting", "Animals & Pets","Auto & Cycles","Business & Finance", "Cooking, Food & Beverage", "Entertainment & TV", "Fashion & Style", "Home & Gardening"],		sexValue;		