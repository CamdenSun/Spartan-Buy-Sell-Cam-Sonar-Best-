$(document).ready(function(){
	var db = firebase.database();
	var user = firebase.auth().currentUser;
	/*function googleLogIn(){
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result){
			console.log(result);
			console.log("Success, Google Account Linked")
		}).catch(function(error){
			console.log(error);
			console.log("Failed to do")
		})
	}*/
	$("#itemSubmit").click(function(){
		/*if (user == null){
			alert("You must log in first in order to enter an item.");
		} else {*/
		//var username = document.getElementById("username");
		var itemName = document.getElementById("itemName");
		var description = document.getElementById("description");
		var price = document.getElementById("price");
		var image = document.getElementById("image");
		var items = db.ref("items/" + itemName.value.toLowerCase());
		items.set({
			username: username.value,
			description: description.value,
			price: price.value,
			image: image.value
		}).catch(function(error){
			console.log(error);
			console.log("Failed to do");
			return;
		});
		//}
	});
	$("#searchSubmit").click(function(){
		var search = $("#searchBar");
		var key = db.ref("/items/"+search.val());
		key.once("value").then(function(snap){
			var username = snap.val().username;
			var description = snap.val().description;
			var price = snap.val().price;
			var image = snap.val().image;
			if (document.getElementById("itemInfo") == null){
				var div = document.createElement("DIV");
				var id = document.createAttribute("id");
				id.value = "itemInfo";
				div.setAttributeNode(id);
				$("body").append(div);
			}
			var itemName = $("<h3></h3>").text(search.val());
			var nodeUser = $("<p></p>").text("Username: "+username);
			var nodeDesc = $("<p></p>").text("Description: "+description);
			var nodePrice = $("<p></p>").text("Price: $"+price);
			var nodeImage = "<img width='100px' src='"+image+"'>";
			$("#itemInfo").after(itemName, nodeUser, nodeDesc, nodePrice, nodeImage);
		});
	});
});