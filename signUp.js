$(document).ready(function(){
	// Create a callback which logs the current auth state
	var db = firebase.database();
	var user = firebase.auth().currentUser;
	function checkUser(){
		if (user != null) {
			console.log("logged in");
			var user = firebase.auth().currentUser;
			  user.providerData.forEach(function (profile) {
			    console.log("Sign-in provider: " + profile.providerId);
			    console.log("  Provider-specific UID: " + profile.uid);
			    console.log("  Name: " + profile.displayName);
			    console.log("  Email: " + profile.email);
			    console.log("  Photo URL: " + profile.photoURL);
			  });
		} else {
			console.log("not logged in");
		}
		console.log(user);
	}
	//checkUser();
	function signUp(username, email, password){
		db.ref("/users/").once("value").then(function(snap){
			var users = snap.val();
			var arr = Object.keys(users);
			for (let i = 0; i < arr.length; i++){
				if (users[arr[i]].email == email||users[arr[i]].username == username){
					console.log("Email or Username already exists. Please enter another one or sign in.");
				} else {
					db.ref("/users/").push({
						email: email,
						username: username,
						password: password
					});
				}
			}
		});	
	}
	function logIn(email, password){
		db.ref("/users/").once("value").then(function(snap){
			var users = snap.val();
			var arr = Object.keys(users);
			for (let i = 0; i < arr.length; i++){
				if ((users[arr[i]].email == email || users[arr[i]].username.toLowerCase() == email.toLowerCase()) && users[arr[i]].password == password){
					document.getElementById("logIn").submit();
				}
			}
		}).error(function(error){
			alert(error.message);
		});
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  console.log(error.code);
		  console.log(error.message);
		});
		//checkUser();
		/*user.updateProfile({
			displayName: username
		});*/
	}
	function logIn(email, password){
		console.log(email + password)
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		});
		checkUser();
	}
	$("#suSubmit").click(function(){
		var username = $("#suUser").val();
		var email = $("#suEmail").val();
		var password = $("#suPass").val();
		signUp(username, email, password);
		logIn(email, password);
	});
	$(".suInput").on("keyPress", function(event){
		if (event.which||event.keyCode == 13){
			var username = $("#suUser").val();
			var email = $("#suEmail").val();
			var password = $("#suPass").val();
			signUp(username, email, password);
			logIn(email, password);
		}
	});
	$("#liSubmit").click(function(){
		var email = $("#liEmail").val();
		var password = $("#liPass").val();
		logIn(email, password);
	});
	$(".liInput").on("keyPress", function(event){
		var x = event.which||event.keyCode;
		if (x == 13){
			var email = $("#liEmail").val();
			var password = $("#liPass").val();
			logIn(email, password);
		}
	});
});