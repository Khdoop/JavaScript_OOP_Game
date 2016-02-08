function Leaderboards($dom) {

    var _$dom = $dom;

    var _playersInfo;

    this.getDom = function() {
        return _$dom;
    };

    this.getPlayersInfo = function() {
        _playersInfo = JSON.parse(localStorage.getItem('players'));
        return _playersInfo;
    };

    this.setPlayersInfo = function(variable) {
        _playersInfo = localStorage.setItem('players', JSON.stringify(variable));
    };
}

/**
 * sort players by score
 */
Leaderboards.prototype.sortPlayersInfo = function() {
    this.setPlayersInfo(this.getPlayersInfo().sort(function(a, b) {
        if (a[2] === b[2]) {
            return 0;
        } else {
            return (a[2] > b[2]) ? -1 : 1;
        }
    }));
};

/**
 * update players scores
 */
Leaderboards.prototype.updateScores = function() {
    this.sortPlayersInfo();
    var array = this.getPlayersInfo();
    var container = this.getDom().find('tbody');
    var length;

    container.empty();

    for (var k in array) {
        var person = array[k];
        var tr = container.find('tr');

        length = parseInt(tr.length) + 1;

        var row =
            '<tr>' +
            '<th scope="row" class="text-center">' + length + '</th>' +
            '<td>' + person[0] + '</td>' +
            '<td>' + person[1] + '</td>' +
            '<td>' + person[2] + '</td>' +
            '</tr>';
        container.append(row);
    }
};