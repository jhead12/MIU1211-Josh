$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	$('#adPage').on('pageinit', function(){		
	//code needed for home page goes here
});	
		
$('#signUp').on('pageinit', function(){
					$('#displayLink').click(getData);		$('#clear').click(clearLocal);		//$('#submit').click(validate);				var reset = $("#reset").validate();					reset.resetForm();				var myForm = $('#contactForm');			
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



var getData = function(){		toggleControls("on");		if(localStorage.length === 0){			alert("There is no data in Local Storage so using default");			//console.log("getData");			autoFillData();

};

var storeData = function(data){if(!key){	var id = Math.floor(Math.random()*10001);	}else{		id =key;	}	getSelectedRadio();		var item 				= {};			item.uname			= ["User Name:", $('#uname').value];			item.fname			= ["First Name:", $('#fname').value];			item.lname			= ["Last Name:", $('#lname').value];			item.pword			= ["Password:", $('#pword-chk').value];			item.sex			= ["sex:", sexValue];			item.email			= ["Email:", $('#email').value];			item.adType			= ["Ad Type:", $('#adType').value];			item.freq			= ["freq:", $('#freq').value];			item.date			= ["Date:",$('#date').value];			item.address		= ["Home Address:", $('#address').value];		//Save data into Local Storage: Use Stringify to convert our object to a string.		localStorage.setItem(id, JSON.stringify(item));		alert("Your Contact has been entered");						console.log(data);	}
	
}; 

var	deleteItem = function (){	var ask = confirm("are you sure you want to delete this Record?");			if(ask){				localStorage.removeItem(this.key);				window.location.reload();			}else{				alert('The records were not deleted');		}
				
};
					
var clearLocal = function(){			if (localStorage.length === 0) {			alert("Theres is no data to clear");				}		
else{		localStorage.clear();		alert("All record were deleted");		window.location.reload();		return false;	}

};
var editItem = function(){
	var value = localStorage.getItem(this.key);		var item = JSON.parse(value);				toggleControls("off");		//console.log("This is the Console Log " + value);		//Populate the form field with current local storage values		$("#fname").value = item.fname[1];		$('#lname').value = item.lname[1];		$('#pword-chk').value = item.pword[1];		$('#email').value = item.email[1];		$('#adType').value = item.adType[1];			$('#uname').value = item.uname[1];				var radios = document.forms[0].sex;		for(var i = 0; i < radios.length; i++){					if (radios[i].value == "Male" && item.sex[1] == "Male"){				radios[i].setAttribute("checked", "checked");							}else if(radios[i].value == "Female" && item.sex[1] == "Female"){				radios[i].setAttribute("checked", "checked");							}		}		$('#freq').value = item.freq[1];		$('#date').value = item.date[1];		$('#address').value = item.address[1];								//Remove the initial listener from the input "save wisher" button		save.removeEventListener("click", storeData);		//Change Submit button Value to Edit button		$('#submit').value = "Edit User";		var editSubmit = $('#submit');		editSubmit.addEventListener("click", validate);		editSubmit.key= this.key;		//Save the key value established in this function is the property event, that could be used when savin the data.		
};var	makeList = function (){					var formTag= document.getElementsByTagName('form'),			selectLi = $("#select");			makeSelect= document.createElement('select'),			makeSelect.setAttribute("id", "group");		for (var i = 0, j=adTypeGroup.length; i < j; i++) {
			var makeOption = document.createElement('option');			var optText = adTypeGroup[i];			makeOption.setAttribute('value', optText);			makeOption.innerHTML = optText;			makeSelect.appendChild(makeOption);			}
};

var toggleControls = function (n){		switch(n){			case "on":				$('#contactForm').css("display","none");				$('#clear').css("display","inline");				$("#displayLink").css("display","none");				$('#addNew').css("display","inline");				$('#ms1').css("display","none");				$('#ms2').css("display","none");				break;			case "off":				$('#contactForm').css("display", "block");				$('#clear').css("display", "inline");				$("#displayLink").css("display", "inline");				$('#addNew').css('display',"none");				$('#items').css("display","none");				$('#ms1').css('display', "inline");				$('#ms2').css('display',"inline");				break;			default:				return false;		}			};var autofillData = function (){		//Then it is put the data in Local Data		for(var n in json){			var id = Math.floor(Math.random()*10001);			localStorage.setItem(id, JSON.stringify(json[n]));			//console.log("this is the local Storage Test");		}
	 
}; 			