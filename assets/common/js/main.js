$(function() {
    var fakeLeaderboards = [
        ["fakeJohn", "00:03:02", 90],
        ["fakeMike", "00:02:00", 54],
        ["fakeLisa", "00:01:23", 43]
    ];

    if (!(localStorage.getItem('players'))) localStorage.setItem('players',JSON.stringify(fakeLeaderboards));

    var stage = new Stage();
    var leaderboards = new Leaderboards($('#leaderboards'));

    var gameContainer = $('#game-container');
    var start = $('#start');
    var debug = $('#debug');
    var rock = $('#rock');

    leaderboards.updateScores();

    $(window).on('keypress', function(e) {
        switch(e.which) {
            case 115 ://S - squat
                stage.getPlayer().Squat();
                break;
            case 119 ://W - jump
                stage.getPlayer().Jump();
                break;
            case 112://P - pause/resume
        }
    });

    start.on('click', function() {

        if (stage.getIsActive()) {
            stage.stop();

            $(this).text('START');

        } else {
            stage.start();
            gameContainer[0].scrollIntoView();

            $(this).text('STOP');
        }
    });

    $('form').on('submit', function(e) {
        e.preventDefault();

        $('#name-modal').modal('hide');

        var playerData = [
            $('input#name').val(),
            stage.getTimer(),
            stage.getPlayer().getScore()
        ];
        var storage = leaderboards.getPlayersInfo();

        storage.push(playerData);
        leaderboards.setPlayersInfo(storage);
        leaderboards.updateScores();
        leaderboards.getDom()[0].scrollIntoView();
    });

    $('.pick-color').on('click', function() {
        var color = $(this).attr('id');

        switch(color) {
            case 'color-pink-label':
                stage.getPlayer().getDom().css({'-webkit-filter': 'hue-rotate(0deg)'});
                break;
            case 'color-blue-label':
                stage.getPlayer().getDom().css('-webkit-filter', 'hue-rotate(250deg)');
                break;
            case 'color-green-label':
                stage.getPlayer().getDom().css('-webkit-filter', 'hue-rotate(180deg)');
                break;
            case 'color-orange-label':
                stage.getPlayer().getDom().css('-webkit-filter', 'hue-rotate(50deg) saturate(2)');
                break;
            case 'color-yellow-label':
                stage.getPlayer().getDom().css('-webkit-filter', 'hue-rotate(90deg) saturate(2)');
                break;
            case 'color-purple-label':
                stage.getPlayer().getDom().css('-webkit-filter', 'hue-rotate(300deg)');
                break;
        }
    });

    debug.on('click', function() {
        $(this).toggleClass('debug-on');
        stage.getEnemy().getDom().toggleClass('debug-mode');
        stage.getPlayer().getDom().toggleClass('debug-mode');
    });

    rock.on('click', function() {
        $(this).parent().find('h4').text('You just took orders from a rock.');
    });

    stage.getBgMusic()[0].volume = 0.4;
    stage.getDmgSound()[0].volume = 0.4;
});