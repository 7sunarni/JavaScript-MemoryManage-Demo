//TODO prototype check, node change, list length limit
function LRUList(length) {
	'use strict'
	this.length = length;
	this.lastNode = null;
}

function LRUNode(pre,value){
	'use strict'
	this.value = value;
	this.pre = pre;
}

LRUList.prototype.addToLast = function(node){
	node.pre = this.lastNode;
	this.lastNode = node;
}


LRUList.prototype.add = function(node){
	if(this.contains(node)){
		this.remove(node);
	}
	this.addToLast(node);
}

LRUList.prototype.getAll = function(){
	let tempNode = this.lastNode;
	while(tempNode !== null){
		console.log(tempNode.value);
		tempNode = tempNode.pre;
	}
}

LRUList.prototype.contains = function(node){
	let tempNode = this.lastNode;
	let result = false;
	while(tempNode !== null){
		if(tempNode.value === node.value){
			result = true;
			break;
		}
		tempNode = tempNode.pre;
	}
	return result;
}

LRUList.prototype.remove = function(node){
	let tempNode = this.lastNode;
	let tempNodeAfter = null;
	let result = false;
	while(tempNode !== null){
		if(tempNode.value === node.value){
			if(tempNodeAfter !== null){
				tempNodeAfter.pre = tempNode.pre;
			}
			result = true;
			return;
		}
		tempNodeAfter = tempNode;
		tempNode = tempNode.pre;
	}
}

LRUList.prototype.removeLast = function(){
	let tempNode = this.lastNode;
	let tempNodeAfter = null;
	let result = false;
	while (tempNode.pre !== null){
		tempNodeAfter = tempNode;
		tempNode = tempNode.pre;
	}
	tempNodeAfter.pre = null;
}


let l = new LRUList(null,10);
let n1 = new LRUNode(null,1);
let n2 = new LRUNode(null,2);
let n3 = new LRUNode(null,3);

l.add(n1);
l.add(n2);
l.add(n3);
l.add(n1);
l.getAll();