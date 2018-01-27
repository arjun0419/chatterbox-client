// YOUR CODE HERE:
// let messageContent = window.location.search ? window.location.search : '';
// let newUser = window.location.search;

  // let message = new Message('MEL BROOKS', 'It\'s good to be the king', 'lobby');
  // let app = new Object();
  class App {
    init() {
      this.fetch();
    }
    
    send(message) {
      $.ajax( {
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
        type: 'POST',
        data: message,
        contentType: 'application/json',
        success: function (data) {
          // let messages = data.results;
          console.log(data);
          app.renderRoom();
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.log(data);
          console.error('chatterbox: Failed to send message', data);
        }
      });
    }

    fetch() {
      $.ajax( {
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
        type: 'GET',
        contentType: 'application/json',
        data: 'order=-createdAt&limit=100',
        success: function (data) {
          var messages = data.results;
          messages.forEach(function(message) { 
            $( '#chats').prepend(`<div class = "chat"> <div class="username">${message.username}</div>${message.text}</div>`);
          });
          console.log('chatterbox: Fetch success');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });
    }

    clearMessages() {}
    renderMessages() {}
    renderRoom() {
      this.init();
    }
  }


   
  let app = new App();
  app.init();
  // console.log(this.messages)
  // let newMessage = () => {
    
  //   app.send(message);
  //   console.log(app, this);
  // }

$('#messageSubmit').on('click', function() {
    let userText = $('#messageInput').val();
    let message = {
      text: userText,
      user: window.userName,
      room: 'lounge'
    };
    app.send(message);
    console.log(message);
});


// let message = new Message('hi, ')