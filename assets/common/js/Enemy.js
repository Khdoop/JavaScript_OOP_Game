Enemy.Level = {
    Top: {
        Value: 1,
        Type: 'enemy_bee'
    },
    Bottom: {
        Value: 0,
        Type: 'enemy_slime'
    }
};

function Enemy($dom) {

    var _$dom = $dom;

    var _level = 0;

    var _isActive = false;

    var _isMoving = false;

    this.getDom = function() {
        return _$dom;
    };

    this.getLevel = function() {
        return _level;
    };

    this.setLevel = function() {
        _level = this.generateLevel();
    };

    this.getIsActive = function() {
        return _isActive;
    };

    this.setIsActive = function(boolean) {
        _isActive = boolean;
    };

    this.getIsMoving = function() {
        return _isMoving;
    };

    this.setIsMoving = function(boolean) {
        _isMoving = boolean;
    }
}

/**
 * generate random number [0-1]
 * @returns {number}
 */
Enemy.prototype.generateLevel = function() {
    var rand = Math.round(Math.random() * 10) % 2;
    console.log(rand);
    return (rand == 1) ? Enemy.Level.Top.Value : Enemy.Level.Bottom.Value;
};

/**
 * get bottom position
 * @returns {number}
 */
Enemy.prototype.getBottom = function() {
    var initBottom = 10;

    return initBottom + (this.getLevel() * 150);
};

/**
 * show enemy
 */
Enemy.prototype.show = function() {
    var type = (this.getLevel() == 1) ? Enemy.Level.Top.Type : Enemy.Level.Bottom.Type;
    console.log(type);

    this.getDom()
        .css({
            bottom: this.getBottom() + 'px',
            right: '-126px',
            background: 'url("assets/common/images/' + type + '.gif") no-repeat'
        })
        .show();
    this.setIsActive(true);
};

/**
 * hide enemy
 */
Enemy.prototype.hide = function() {
    this.getDom().hide();
    this.setLevel();
    this.setIsActive(false);
};

/**
 * move enemy (animate)
 */
Enemy.prototype.move = function() {

    if (this.getIsMoving() == false) {
        var _this = this;

        this.show();
        this.setIsMoving(true);
        this.getDom().animate({
            right: '100%'
        },5000, 'linear', function() {
            _this.hide();
            _this.setIsMoving(false);
        });
    }
};