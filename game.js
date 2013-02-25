enchant();

window.onload = function() {
	var width
	var game = new Game(512, 512); // x,y make up viewport
	game.fps = 15;
	game.preload('images/Ally01.png');
	
	var dumpies = new Array();
	dumpies.push(['Ally', 'images/Ally01.png']);
	
	var numDumpies = 1; // Total number of Dumpies
	var curDumpies = 1; // Current number of Dumpies
	
	randX = function() {
		return Math.floor(Math.random() * (game.width - 64));
	};
	
	randY = function() {
		return Math.floor(Math.random() * (game.height - 64));
	};
	
	randVx = function() {
		var r = Math.floor(Math.random() * 3);
		if (r < 1) {
			return Math.floor((Math.random() * 3) + 1);
		} else {
			return Math.floor((Math.random() * -3) - 1);
		}
	};
	
	randVy = function() {
		var r = Math.floor(Math.random() * 3);
		if (r < 1) {
			return Math.floor((Math.random() * 3) + 1);
		} else {
			return Math.floor((Math.random() * -3) - 1);
		}
	};
	
	addDumpies = function(_level, _scoreLabel, _timeLabel) {
		for (var i = 0; i < numDumpies; i++) { 
			var rand = Math.floor(Math.random() * dumpies.length);
			var dumpy = new Sprite(64, 64);
			
			dumpy.image = game.assets[dumpies[rand][1]];
			dumpy.x = randX();
			dumpy.y = randY();
			dumpy.vx = randVx();
			dumpy.vy = randVy();
			
			dumpy.addEventListener('enterframe', function() {
				if(this.x + this.vx < 0 || this.x + this.vx > game.width - 64) {
					this.vx *= -1;
				}
				if(this.y + this.vy < 0 || this.y + this.vy > game.width - 64) {
					this.vy *= -1;
				}
				
				this.moveBy(this.vx, this.vy);
			});
			
			dumpy.addEventListener('touchstart', function() {
				_scoreLabel.score = _scoreLabel.score + 10;
				_timeLabel.time += 1;
				
				curDumpies--;
				
				_level.removeChild(this);
			});
			
			_level.addChild(dumpy);
		}
	};
		
	game.onload = function() {
		var level = new Group();
		var scoreLabel = new ScoreLabel(20, 40);
		var timeLabel = new TimeLabel(20, game.height - 100, 'countdown');
		timeLabel.time = 10;
		
		addDumpies(level, scoreLabel, timeLabel);
		
		level.addChild(scoreLabel);
		level.addChild(timeLabel);
		
		game.rootScene.addChild(level);
		
		game.rootScene.addEventListener('enterframe', function(e) {
			if (curDumpies == 0) {
				numDumpies++;
				curDumpies = numDumpies;
				
				addDumpies(level, scoreLabel, timeLabel);
				
				//Display congrats for beating level
			}
		});
	};
	game.start();
	
	addDebug = function (text) {//addDebug(this.z);
		document.getElementById('debug').innerHTML = text + document.getElementById('debug').innerHTML;
	};
	addDebug2 = function (text) {//addDebug2(this.z);
		document.getElementById('debug2').innerHTML = text + document.getElementById('debug2').innerHTML;
	};
};
