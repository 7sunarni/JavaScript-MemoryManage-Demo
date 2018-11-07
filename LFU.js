function LFU(maxSize){
	'use strict'
	this.maxSize = maxSize;
	this.tempSize = 0;
	this.lastNode = null;
};

LFU.prototype.addItem = function(item){
	if(this.contains(item) !== null){
		this.contains(item).count ++;
		return;
	}
	if(this.isFull()){
		this.removeItem(this.getMinItem());
	}
	if(this.lastNode != null){
		this.lastNode.nextNode = item;
	}
	item.preNode = this.lastNode;
	this.lastNode = item;
	this.tempSize ++;
}

LFU.prototype.removeItem = function(item){
	let tempNode = this.lastNode;
	while(tempNode !== null){
		if(tempNode.value === item.value){
			//todo first node bug
			tempNode.preNode.nextNode = tempNode.nextNode;
			if(tempNode.nextNode !== null){
				tempNode.nextNode.preNode = tempNode.preNode;
			}else{
				this.lastNode = tempNode.preNode;
			}
			break;
		}
		tempNode = tempNode.preNode;
	}
	this.tempSize --;
};

LFU.prototype.getMinItem = function(){
	let tempNode = this.lastNode;
	let minNode = tempNode;
	while(tempNode !== null){
		if(tempNode.count < minNode.count){
			minNode = tempNode;
		}
		tempNode =  tempNode.preNode;
	}
	return minNode;
}

LFU.prototype.isFull = function(){
	if (this.tempSize === this.maxSize || this.tempSize > this.maxSize){
		return true;
	}
	return false;
}

LFU.prototype.contains = function(item){
	let tempNode = this.lastNode;
	let aimNode = null;
	while(tempNode !== null){
		if(tempNode.value === item.value){
			aimNode = tempNode;
			break;
		}
		tempNode = tempNode.preNode;
	}
	return aimNode;
};

LFU.prototype.showAll = function(){
	let tempNode = this.lastNode;
	while(tempNode !== null){
		console.log(tempNode.value +'  '+tempNode.count);
		tempNode = tempNode.preNode;
	}
};

function Node(value){
	'use strict'
	this.value = value;
	//init state is -1
	this.count = -1;
	this.nextNode = null;
	this.preNode = null;
};

Node.prototype.setNextNode = function(nextNode){
	this.nextNode = nextNode;
};

Node.prototype.setPreNode = function(preNode){
	this.preNode = preNode;
};