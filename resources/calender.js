if(!birthdayCalender){
	var birthdayCalender = {};
}


birthdayCalender.handlers = new function(){
	var jsonData;
	var year;
	var errorLabel = document.getElementById('error-text');
	var errorMsg = '';
	var colorArray = ["#555D7B","#9FD400","#C97D99","#79CAE5","#E84929","#0055D0","#FF32AA","#0ECCFE","#FF9B00","#E64A33"];

	function testJSON(text){
	    try{
	        jsonData = JSON.parse(text);
	        return true;
	    }
	    catch (error){
	        return false;
	    }
	}

	function validateData(){

		jsonData = document.getElementById('input-json-container').value;
		year = document.getElementById('year-input').value;

		if(isNaN(year) || year<1){
			errorMsg="Please Enter a valid year";
			return false;
		}

		if(!testJSON(jsonData)){
			errorMsg="Not a valid JSON";
			return false;
		}

		errorMsg='';
		errorLabel.innerHTML = errorMsg;
		return true;
	}



	function sortBdayData(){

		if(!validateData()){
			errorLabel.innerHTML = errorMsg;
			return;
		};


		//convert Birthyears in JSON to Input Years
		jsonData = jsonData.map(function(i){
			var updatedYear = i.birthday.split('/');
			updatedYear[2]=year;
			updatedYear = updatedYear.join('/');
			return {"name":i.name,"birthday":updatedYear,"birthdate":i.birthday}
		});		

		jsonData.sort(function(a,b){
			return (new Date(a.birthday)).getDay() - (new Date(b.birthday)).getDay();
		});

		var i = 0;

		var sortedBdayArray = [];

		while(i<jsonData.length){
			var weekDaybdayArray = [];
			while ( (i<jsonData.length-1) &&(new Date(jsonData[i].birthday).getDay())==(new Date(jsonData[i+1].birthday).getDay()) ){
				weekDaybdayArray.push(jsonData[i]);
				i++;
			}
			weekDaybdayArray.push(jsonData[i]);
			sortedBdayArray.push(weekDaybdayArray);
			i++;
		}

		sortedBdayArray = sortedBdayArray.map(function(i){
			return i.sort(function(a,b){
				return (new Date(b.birthdate)) - (new Date(a.birthdate));
			});

		});

		return sortedBdayArray;
		
	}

	function drawCards(){
		var data = sortBdayData();
		if(!data){
			return false;			
		}

		var cards = document.querySelectorAll('.card .card-body');
		 
		for(var i=0;i<cards.length;i++){
			cards[i].innerHTML="";
		}

		data.forEach(
			function(i,index,arr){
				var sizeOfBoxes = 160/Math.ceil(Math.sqrt(i.length));
				var cardBody = document.getElementsByClassName('card')[(index-1<0?6:index-1)].children[1];
				cardBody.innerHTML="";
				i.forEach(function(j,ind,arry){
					var bdayElem = document.createElement("div");
					bdayElem.className = "bday";
					bdayElem.setAttribute("title",j.name);
					bdayElem.style.cssText="width:"+sizeOfBoxes+"px;line-height:"+sizeOfBoxes+"px;height:"+sizeOfBoxes+"px;"+"background-color:"+colorArray[ind%10]+";";
					var personNameArr = j.name.split(' ');
					var personInitials = '';
					personNameArr.forEach(function(i){
						personInitials += i.split('')[0].toUpperCase();
					});
					bdayElem.innerHTML="<span class='personName'>"+personInitials+"</span>";
					cardBody.appendChild(bdayElem);
				});
			}
		);
	}

	return {
		drawCards:drawCards
	};

}

document.addEventListener('DOMContentLoaded',function(){
	var sampleJsonData = [
    {
      "name": "Tyrion Lannister",
      "birthday": "12/02/1978"
    }, {
      "name": "Cersei Lannister",
      "birthday": "11/30/1975"
    }, {
      "name": "Daenerys Targaryen",
      "birthday": "11/24/1991"
    }, {
      "name": "Arya Stark",
      "birthday": "11/25/1996"
    }, {
      "name": "Jon Snow",
      "birthday": "12/03/1989"
    }, {
      "name": "Sansa Stark",
      "birthday": "08/15/1992"
    }, {
      "name": "Jorah Mormont",
      "birthday": "12/16/1968"
    }, {
      "name": "Jaime Lannister",
      "birthday": "12/06/1975"
    }, {
      "name": "Sandor Clegane",
      "birthday": "11/07/1969"
    }, {
      "name": "Tywin Lannister",
      "birthday": "10/12/1951"
    }, {
      "name": "Theon Greyjoy",
      "birthday": "12/31/1989"
    }, {
      "name": "Samwell Tarly",
      "birthday": "12/07/1990"
    }, {
      "name": "Joffrey Baratheon",
      "birthday": "06/12/1992"
    }, {
      "name": "Catelyn Stark",
      "birthday": "12/03/1962"
    }, {
      "name": "Bran Stark",
      "birthday": "12/02/1995"
    }, {
      "name": "Petyr Baelish",
      "birthday": "11/20/1974"
    }, {
      "name": "Robb Stark",
      "birthday": "11/28/1986"
    }, {
      "name": "Brienne of Tarth",
      "birthday": "11/27/1985"
    }, {
      "name": "Margaery Tyrell",
      "birthday": "12/02/1989"
    }, {
      "name": "Stannis Baratheon",
      "birthday": "09/14/1971"
    }, {
      "name": "Davos Seaworth",
      "birthday": "02/13/1973"
    }, {
      "name": "Tormund Giantsbane",
      "birthday": "12/14/1974"
    }, {
      "name": "Jeor Mormont",
      "birthday": "11/01/1955"
    }, {
      "name": "Eddard Stark",
      "birthday": "12/02/1963"
    }, {
      "name": "Khal Drogo",
      "birthday": "12/05/1980"
    }, {
      "name": "Ramsay Bolton",
      "birthday": "12/05/1976"
    }, {
      "name": "Robert Baratheon",
      "birthday": "12/02/1965"
    }, {
      "name": "Daario Naharis",
      "birthday": "12/02/1985"
    }, {
      "name": "Viserys Targaryen",
      "birthday": "12/06/1984"
    }
];
	sampleJsonData = JSON.stringify(sampleJsonData);
	document.getElementById('input-json-container').value=sampleJsonData;
	document.getElementById('update-btn').addEventListener('click',birthdayCalender.handlers.drawCards);
});
