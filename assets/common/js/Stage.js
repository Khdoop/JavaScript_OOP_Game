function Stage() {

    var _player = new Player($('#player'));

    var _enemy = new Enemy($('#enemy'));

    var _timer = 0;

    var _isActive = false;

    var _interval;

    var _isColliding = false;

    var _bgMusic = $('#bg-music');

    var _dmgSound = $('#damage');


    this.getPlayer = function() {
        return _player;
    };

    this.getEnemy = function() {
        return _enemy;
    };

    this.getTimer = function() {
        return _timer;
    };

    this.setTimer = function(time) {
        _timer = time;
    };

    this.getIsActive = function() {
        return _isActive;
    };

    this.setIsActive = function(boolean) {
        _isActive = boolean;
    };

    this.getInterval = function() {
        return _interval;
    };

    this.setInterval = function(variable) {
        _interval = variable;
    };

    this.getIsColliding = function() {
        return _isColliding;
    };

    this.setIsColliding = function(boolean) {
        _isColliding = boolean;
    };

    this.getBgMusic = function() {
        return _bgMusic;
    };

    this.getDmgSound = function() {
        return _dmgSound;
    }
}

/**
 * start game loop
 */
Stage.prototype.start = function() {

    if (this.getIsActive() == false) {
        var _this = this;
        var player = this.getPlayer();
        this.setIsActive(true);
        player.setHealth(player.constructor.Defaults.Health);
        player.setScore(player.constructor.Defaults.Score);
        var timeStarted = new Date();

        var interval = setInterval(function() {

            if (_this.getEnemy().getIsActive() == false) {
                _this.getPlayer().setIsHit(false);
            }

            var timeCurrent = new Date();
            var difference = new Date(timeCurrent - timeStarted);

            _this.checkPlayerStatus();

            _this.updateTime(difference);

            _this.getEnemy().move();

            _this.checkCollision();

            _this.getPlayer().updateHealth();
            _this.getPlayer().updateScore();


        }, 20);

        this.setInterval(interval);

        this.getBgMusic().trigger('play');
    }
};

/**
 * stop game loop
 */
Stage.prototype.stop = function() {

    if (this.getInterval() !== undefined) {
        window.clearInterval(this.getInterval());
        this.setIsActive(false);

        this.getBgMusic().trigger('pause');
        this.getBgMusic()[0].currentTime = 0;
        $('#start').text('START');
    }
};


/**
 * update game time
 * @param variable
 */
Stage.prototype.updateTime = function(variable) {
    var replace = variable.toISOString().substr(11, 8);
    this.setTimer(replace);

    $('#time').find('span').text(replace);
};


/**
 * check for collision, set player health, trigger dmg sound
 */
Stage.prototype.checkCollision = function() {
    var player = this.getPlayer().getDom();
    var enemy = this.getEnemy().getDom();
    var playerScore = this.getPlayer().getScore();

    var x1 = player.offset().left;
    var y1 = player.offset().top;
    var h1 = player.outerHeight(true);
    var w1 = player.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = enemy.offset().left;
    var y2 = enemy.offset().top;
    var h2 = enemy.outerHeight(true);
    var w2 = enemy.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;


    if (!(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)) {

        if (this.getIsColliding() == false) {
            var health = parseInt(this.getPlayer().getHealth());

            this.setIsColliding(true);
            this.getPlayer().setHealth(health - 1);
            this.getPlayer().setIsHit(true);

            this.getDmgSound().trigger('play');
            this.getPlayer().getDom().animate({
                opacity: 0
            }, 100, function() {
                $(this).animate({
                    opacity: 1
                });
            });
        }
    } else {
        if (this.getIsColliding()) {
            this.setIsColliding(false);
        } else if (r2 < x1 && this.getPlayer().getIsHit() == false) {
            this.getPlayer().setScore(playerScore + 1);
            this.getPlayer().setIsHit(true);
        }
    }
    console.log(this.getPlayer().getIsHit());
};

/**
 * check player status: death or alive
 */
Stage.prototype.checkPlayerStatus = function() {
    if (!this.getPlayer().updateStatus()) {
        this.stop();
        $('#name-modal').modal('show');
    }
};