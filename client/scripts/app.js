// YOUR CODE HERE:
// let messageContent = window.location.search ? window.location.search : '';
let newUser = window.location.search;

class Message {
  constructor(username, text, roomname) {
    this.username = username;
    this.text = text;
    this.roomname = roomname;
  }

}

let newMessage = new Message(username, text, roomname);


class App {
  constructor(data) {
    this.data = data;
  }
  init(){
    console.log('init')
  }

  send(message) {
    console.log(message)
    let message = new Message(message)
    $.ajax( {
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.CAMPUS.sfs.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log(data)
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.log(data)
        console.error('chatterbox: Failed to send message', data);
      }
    }).then( (data) => {
      console.log(data);
    })
  }
  get(messages) {
    $.ajax( {
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: JSON.stringify(messages),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    }).then((data) => {
      console.log(data);
    })
  }
}

let app = new App();
let message = new Message('hi, ')

app.get(message);