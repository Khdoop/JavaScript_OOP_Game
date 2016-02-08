Player.States = {
    Jump: 'player_jump',
    Squat: 'player_squat',
    Walk: 'player_walk'
};

Player.Defaults = {
    Health: 3,
    Score: 0,
    State: Player.States.Walk,
    Name: 'Alien',
    Type: 'one_eye_alien_'
};

function Player($dom) {

    var _$dom = $dom;

    var _health = Player.Defaults.Health;

    var _score = Player.Defaults.Score;

    var _state = Player.Defaults.State;

    var _isActive = false;

    var _isHit = false;

    this.getDom = function() {
        return _$dom;
    };

    this.getHealth = function() {
        return _health;
    };

    this.setHealth = function(int) {
        _health = int;
    };

    this.getScore = function() {
        return _score;
    };

    this.setScore = function(int) {
        _score = int;
    };

    this.getState = function() {
        return _state;
    };

    this.setState = function(state) {
        _state = state;
    };

    this.getIsActive = function() {
        return _isActive;
    };

    this.setIsActive = function(boolean) {
        _isActive = boolean;
    };

    this.getIsHit = function() {
        return _isHit;
    };

    this.setIsHit = function(boolean) {
        _isHit = boolean;
    };
}

/**
 * animate player jump on W
 * @constructor
 */
Player.prototype.Jump = function() {

    if (this.getIsActive() == false) {
        var _this = this;

        this.setIsActive(true);
        this.setState(Player.States.Jump);
        this.getDom().css('background', 'url("assets/common/images/' + Player.States.Jump + '.png") no-repeat right bottom')
            .animate({
                'bottom' : '150px'
            }, 750, function() {
                $(this).animate({
                    'bottom': '10px'
                }, 750, function() {
                    $(this).css('background-image', 'url("assets/common/images/' + Player.States.Walk + '.gif")');
                    _this.setIsActive(false);
                })
            });
    }
};

/**
 * animate player squat on S
 * @constructor
 */
Player.prototype.Squat = function() {

    if (this.getIsActive() == false) {
        var _this = this;

        this.setIsActive(true);
        this.setState(Player.States.Squat);
        this.getDom().css('background', 'url("assets/common/images/' + Player.States.Squat + '2.png") no-repeat right bottom')
            .animate({
                height: '129px',
                'margin-top': '40px'
            }, 750, function() {
                $(this).animate({
                    height: '169px',
                    'margin-top': 0
                }, 750, function() {
                    $(this).css('background-image', 'url("assets/common/images/' + Player.States.Walk + '.gif")');
                    _this.setIsActive(false);
                })
            });
    }
};

/**
 * update player health
 */
Player.prototype.updateHealth = function() {
    $('#lives').find('span').text(this.getHealth());
};

/**
 * update player score
 */
Player.prototype.updateScore = function() {
    $('#score').find('span').text(this.getScore());
};

/**
 * update player status: death or alive
 * @returns {boolean}
 */
Player.prototype.updateStatus = function() {
    return !!this.getHealth();
};