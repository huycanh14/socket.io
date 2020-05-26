var socket = io("http://localhost:3000");

socket.on('server-send-dki-thatbai', () => {
  alert('Sai Username (có người đã đăng ký rồi)');
});

socket.on('server-send-danhsach-Users', (data) => {
  $('#boxContent').html("");
  data.forEach((i) => {
    $('#boxContent').append(`<div class='user'>${i}</div>`);
  });
});

socket.on('ai-do-dang-go', (data) => {
  $('#thongbao').html(data);
});

socket.on('ai-do-Sto-go', (data) => {
  $('#thongbao').html("");
});

socket.on('server-send-dki-thanhcong', (data) => {
  $('#currentUser').html(data);
  $('#loginForm').hide(200);
  $('#chatForm').show(1000);
});

socket.on('server-send-message', (data) => {
  $('#listMessage').append(`<div class='ms'>${data.un} : ${data.nd}</div>`)
});

$(document).ready(() => {
  $('#loginForm').show();
  $('#chatForm').hide();

  $('#btnRegister').click(() => {
    socket.emit('client-send-Username', $('#txtUsername').val());
  });

  $('#btnLogOut').click(() => {
    socket.emit('logout');
    $('#loginForm').show();
    $('#chatForm').hide();
  });

  $('#btnSendMessage').click(() => {
    socket.emit('user-send-message', $('#txtMessage').val());
  });

  $('#txtMessage').focusin(() => {
    socket.emit('toi-dang-go-chu');
  });

  $('#txtMessage').focusout(() => {
    socket.emit('toi-ngung-go-chu');
  });
});
