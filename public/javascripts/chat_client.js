var username = 'Anonymous';

var socket = io("http://mcvst02.eur.ad.sag:3000");

$(document).ready(function() {

    $('#chat-page').hide();

    $('#join').click(function() {
        username = $('#name').val();
        socket.emit('join', {user: username});
        $('#login').detach();
        $('#chat-page').show();
    });

    $('#chat').keyup(function(e) {
        if ($('#chat').val() == '') {
            socket.emit('stoptyping', {user: username});
        } else {
            socket.emit('typing', {user: username});
        }
    });

    $('#post').click(function(e) {
        var msg = {user:username, message: $('#chat').val()};
        socket.emit('stoptyping', {user: username});
        socket.emit('send', msg);
        $('#chat').val('');
    });
});

socket.on('joined', function(msg) {
    var div = $("<tr />", {class: 'success'});
    div.append($('<td />', {text: msg.message, colspan: '2'}));
    $('#chatHistory').append(div);
});

socket.on('message', function(msg){
    var div = $("<tr />", {class: 'active'});
    div.append($("<th />", {text: msg.user, scope:'row'}));
    div.append($("<td />", {text: msg.message}));
    $('#chatHistory').append(div);
});

socket.on('typing', function(msg) {
    console.log("Receive typing");
    if (!$('#typing' + msg.user).length) {
        var div = $("<tr />", {class: 'info', id: 'typing' + msg.user});
        div.append($('<td />', {text: msg.message, colspan: '2'}));
        $('#chatHistory').append(div);
    }
});

socket.on('stoptyping', function(msg) {
    $('#typing' + msg.user).remove();
});

socket.on('disconnect', function(msg) {
    var div = $("<tr />", {class: 'danger'});
    div.append($('<td />', {text: msg.message, colspan: '2'}));
    $('#chatHistory').append(div);
});
