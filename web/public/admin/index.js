let id = 0;

function idToURL(id) {
	if (id == 0){
		return "http://localhost:3000/api/mouths";
	} else if (id == 1){
		return "http://localhost:3000/api/brains";
	} else if (id == 2){
		return "http://localhost:3000/api/bots";
	} else {
		return undefined;
	}
}

function menu(newId) {

	id = newId;
	
	let list = document.getElementById("list");
	
	let listContent = "";
	if (id == 0){
		listContent += `
			<div class="list-item">
				<div class="list-item-value list-title item-10">ID
				</div><div class="v"></div><div class="list-item-value list-title item-10">Type
				</div><div class="v"></div><div class="list-item-value list-title item-30">Token
				</div><div class="v"></div><div class="list-item-value list-title item-50">Link
				</div>
			</div>
		`;
	} else if (id == 1){
		listContent += `
				<div class="list-item">
				<div class="list-item-value list-title item-100">Brain
				</div>
			</div>
		`;
	} else if (id == 2){
		listContent += `
			<div class="list-item">
				<div class="list-item-value list-title item-10">ID
				</div><div class="v"></div><div class="list-item-value list-title item-10">State
				</div><div class="v"></div><div class="list-item-value list-title item-40">Brains Linked
				</div><div class="v"></div><div class="list-item-value list-title item-40">Mouths Linked
				</div>
			</div>
		`;
	}

	fetch(idToURL(id), {
		method: "GET",
		headers: [
			['Content-Type', 'application/json'],]
	})
	.then(function(res){ return res.json(); })
	.then(function(data){
		for (let i in data){
			if (id == 0){
				listContent += `
					<div class="list-item">
						<div class="list-item-value item-10">`
						+ i 
						+`</div><div class="v"></div><div class="list-item-value item-10">`
						+ data[i].type
						+`</div><div class="v"></div><div class="list-item-value item-30">`
						+ data[i].token 
						+`</div><div class="v"></div><div class="list-item-value item-50">`
						+ (data[i].link!=""?(`<a href="`+data[i].link+`">`+data[i].link+`</a>`):("<div>"+data[i].link+"</div>"))
						+`</div>
					</div>
				`;
			} else if (id == 1){
				listContent += `
						<div class="list-item">
						<div class="list-item-value item-100">Brain `
						+ data[i]
						+`</div>
					</div>
				`;
			} else if (id == 2){
				listContent += `
					<div class="list-item">
						<div class="list-item-value item-10">`
						+ i 
						+`</div><div class="v"></div><div class="list-item-value item-10">`
						+ data[i].state 
						+`</div><div class="v"></div><div class="list-item-value item-40">`
						+ data[i].brains 
						+`</div><div class="v"></div><div class="list-item-value item-40">`
						+ data[i].mouths 
						+`</div>
					</div>
				`;
			}
		}

		list.innerHTML = listContent;
	})
}