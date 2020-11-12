var productData = [];

function getData(category) {
	var productDataReq = $.ajax({
		url: 'http://localhost:8088/get/productdetails',
		method:'GET',
		dataType: 'JSON',
		data: {
			catgry: category
		}
	});
	productDataReq.done(function(res){
		console.log("success");
		productData = res.details;
		renderDataToUI()
	});
	productDataReq.fail(function(err){
		console.log("err")
	})
}

function renderDataToUI() {
	$('.productDetailsContainer').empty();
	var templateUrl = "http://localhost:8088/node/eshopping2/templates/prodDetails.htm";
	$.ajax({
		url: templateUrl,
		method: 'GET',
		success: function(res) {
			console.log("response of template is");
			$("#templateContainer").html(res);
			for (var i = 0; i < productData.length; i++) {
				if (productData[i].name.length > 10) {
					productData[i].name= productData[i].name.substr(0, 10) + '...';
				}
				$('.productDetailsContainer').loadTemplate($("#templateContainer"), productData[i], {append: true});
			}
		}
	});
	
	
}


function getDetails(type) {
	var category = '';
	switch(type) {
		case 'kid':
			category = 'kids';
			break;
		case 'wc':
			category = 'Womens Cloths';
			break;
		case 'mc':
			category = 'Mens Cloths';
			break;
		case 'ec':
			category = 'electronics';
			break;
		case 'sh':
			category = 'shoes';
			break;
	}
	getData(category);
}

function loadTemplateToContainer(type) {
	var url;
	switch(type) {
		case 'login':
			url = "http://localhost:8088/project/eshopping2/templates/loginPage.htm";
			break;
		case 'prodDetails':
			url = "http://localhost:8088/project/eshopping2/templates/prodDetails.htm";
			break;
		case 'mainContainer':
			url = "http://localhost:8088/project/eshopping2/templates/prodMainPage.htm";
			break;
		case 'fgpwd':
			url =  "http://localhost:8088/project/eshopping2/templates/fgPwd.htm";
			break;
		case 'sinup':
			url="http://localhost:8088/project/eshopping2/templates/signUp.htm";

	}
	$.ajax({
		url: url,
		method: 'GET',
		success: function(res) {
			console.log("success");
			console.log(res);
			loadCorrespondingPage(res, type);
		}
	});
}

function loadCorrespondingPage(res, type) {
	switch(type) {
		case 'login':
			$(".container").html(res);
			break;
		case 'prodDetails':
			$("#templateContainer").html(res);			
			break;
		case 'mainContainer':
			$(".container").html(res);
			getData();
			break;
		case 'fgpwd':
			$(".container").html(res);
			break;
		case 'sinup':
			$(".container").html(res);
			break;
	
	}
}

function validateCredentials() {
	var userData = {};

	userData.id = document.querySelector("#uid").value;
	userData.pwd = document.querySelector("#upwd").value;
		
	$.ajax({
		url: 'http://localhost:8088/validateCredentials',
		method: 'POST',
		dataType: 'JSON',
		data: userData,
		success: function(res) {
			console.log("res");
			console.log(res);
			if (res.msg == 'Valid') {
				loadTemplateToContainer('mainContainer');
			} else {
				$(".invalidCredentials").show();
			}
		}
	});
}

function registerUserDetails() {
	var registerDetails = {};
	registerDetails.id = $("#uname").val();
	registerDetails.pwd = $("#password").val();
	registerDetails.mno = $("#mno").val();
	registerDetails.eid = $("#eid").val();

	console.log(registerDetails);

	var newUserUrl = 'http://localhost:8088/registerUser/details';
	$.ajax({
		url: newUserUrl,
		dataType: 'JSON',
		method: 'POST',
		data: registerDetails,
		success: function(res) {
			console.log("success");
			console.log(res);

			if(res.msg=='success'){
				alert("inserted your details successfully");
			}
		}
	})
}

function makeUserLogout() {
	$.ajax({
		url: 'http://localhost:8088/logoutUser',
		method: 'GET',
		dataType: 'JSON',
		success: function() {
			console.log("successfly loggedout");
			loadTemplateToContainer('login');
		}
	})
}