function init (target) {

	var stage = new createjs.Stage("game");		
	var canvas = document.getElementById("game");
	var cw = canvas.width = window.innerWidth;
	var ch = canvas.height = window.innerHeight;

	function randomInt(min, max){//функция определения случайного числа
	 return Math.floor(Math.random() * (max - min + 1) + min);
	}
	function degToRad (deg) { return deg / 180 * Math.PI; }
	function randomColor(){
		var r = randomInt(0, 255);
		var g = randomInt(0, 255);
		var b = randomInt(0, 255);
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	var c = randomInt(4, 20), p = false;
	var r = ch / 3; // радиус
	var size = 50; // размер картинок
	var centerX = cw/2 - size, centerY = ch/2 - size * 2;
	var list = [];// массив картинок
	var gg = 360 / c, speed = 0, a = 0;
	var b = 0;// смещение
	createjs.Ticker.setFPS(80);

	check();

	for(var i = 0; i < c; i++){
		list[i] = new createjs.Shape;
		list[i].graphics.beginFill("red").drawRect(size/2, size/2, size, size);
		var g = degToRad(gg * i + b);
		list[i].x = centerX + Math.cos(g) * r;
		list[i].y = centerY + Math.sin(g) * r;
		stage.addChild(list[i]);
		stage.update();

	}
	
	function check(){
		while(true){
			speed = randomInt(3, 5);
			a = randomInt(10, 15)/1000;
			b = randomInt(0, 180);
			if(prov(b, speed, a)){
				break;
			}
		}
	}	
	function prov(b, speed, a){
		while(true){
			speed -= a;
			b += speed;
			if(speed < 0){
				for(var i = 0; i < c; i++){
					var g = degToRad(gg * i + b);
					if(Math.cos(g) <= Math.cos((degToRad(180 - gg/2)))){
					    if(i == target) {
					    	return true;
					    }
					}	
				}
			}

		}
	}
	var k = new createjs.Shape;
	k.graphics.beginFill("green").drawRect(0, 0,size, size);
	k.x = cw/2 - size/2;
	k.y = ch - size;
	stage.addChild(k)
	k.on("click", function(){
		if(!p){
			console.log(b, speed, a)
			start(speed, a);
		}
	})
	console.log(gg)
	var arrow = new createjs.Shape;
	arrow.graphics.beginFill("green").drawRect(size/2, size/2,size/3, size/6);
	arrow.x = centerX - r + 2 * size;
	arrow.y = centerY + size;
	stage.addChild(arrow)

	function start(speed, a){
		p = true;
		createjs.Ticker.addEventListener("tick", function(evt){
			speed -= a;
			b += speed;
			for(var i = 0; i < c; i++){
				var g = degToRad(gg * i + b);
				list[i].x = centerX + Math.cos(g) * r;
				list[i].y = centerY + Math.sin(g) * r;
			}
			stage.update();
			if(speed < 0){ // замутить передачу информации
				evt.remove();
				p = false;
				for(var i = 0; i < c; i++){
					var g = degToRad(gg * i + b);
					if(Math.cos(g) <= Math.cos((degToRad(180 - gg/2)))){
						arrow.x = centerX + Math.cos(g) * (r - size * 2);
					    arrow.y = centerY + Math.sin(g) * (r - size * 2);
					    stage.update();
						console.log("крч, победил:", i)
					}	
				}
			}
		});
	}

	stage.update();
}
