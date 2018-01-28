// YOUR CODE HERE:
// let messageContent = window.location.search ? window.location.search : '';
// let newUser = window.location.search;

  // let message = new Message('MEL BROOKS', 'It\'s good to be the king', 'lobby');
  // let app = new Object()
  setTimeout(function(){
            $('#chat').on('click', function(e) {
            console.log(e)
            console.log("message");
          });
})

  class App {
    constructor(){
      this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
      this.user = window.userName;
      this.friends = [];
      this.selectedID = undefined;
      this.messages = [];
      this.rooms = [];
    }
    init() {
      this.fetch(100);
    }
    
    send(message) {
console.log("message before AJAX send " , message)
      $.ajax( {
        // This is the url you should use to communicate with the parse API server.
        url: this.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          // let messages = data.results;
          console.log("Success data " , `${data}`);
          // app.renderRoom();
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });
    }

    fetch(number) {
      $.ajax( {
        // This is the url you should use to communicate with the parse API server.
        url: this.server,
        type: 'GET',
        contentType: 'application/json',
        data: `order=-createdAt&limit=${number}`,
        success: function (data) {
          var messages = data.results;
          app.messages.push(messages);
            $('body').append('<div id ="chats"></div>');
          
          app.rooms = app.rooms.concat(messages.reduce( (acc, curr)=>{
            
            if(curr.roomname && !acc.includes(curr.roomname)){
              acc.push(curr.roomname)
            }
            return acc;

          }, []));

          app.rooms.forEach( room =>{
            $('#roomSelect').prepend(`<option value='${room}'>${room}</option>`);
          })

          messages.forEach(function(message) { 
            let user = _.escape(message.username);
            let text = _.escape(message.text);
            

            $( '#chats').prepend(`<div class = "chat"> <div class="username" id = 'someUser'>${user}</div>${text}</div>`);            
          });         
          
          console.log('chatterbox: Fetch success');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to fetch', data);
        }
      });
    }
    

    clearMessages() {
      $( '#chats').children().each(function() {
          $(this).remove();
      });
    }
    renderMessage(message) {
      this.send(message);
      let user = _.escape(message.user);
      let text = _.escape(message.text);
      // let text = message.text;
     $( '#chats').prepend(`<div class = "chat"> <div class="username">${user}</div>${text}</div>`);
    }
    renderRoom(room) {
      this.rooms.push(room);
       $('#roomSelect').html(`<option value='${room}'>${room}</option>`); // <==this test is ridiculous :)
    }
    handleUsernameClick(user) {
      this.friends.push(user);
      console.log("diligently handling username click");
    }
    handleSubmit(message){

      let newMessage = $('#chats').firstChild().val();
      this.send(newMessage);
    }
  }
   
  let app = new App();
  app.init();
  // console.log(this.messages)
  // let newMessage = () => {
    
  //   app.send(message);
  //   console.log(app, this);
  // }

  //implement storage object for all users
    //on click of username
    //get a prompt to ask for friendship
    //if yes, add to friendship array
    //if no do nothing

  $('#roomSelect').change(function(e) {
    let currentRoom = e.target.value;
            let html = ` `;
    app.messages[0].forEach(function(message) { 
            console.log(message)
            
            if (message.roomname === currentRoom) {
                let user = _.escape(message.username);
                let text = _.escape(message.text);
                html += `<div class = "chat"> <div class="username" id = 'someUser'>${user}</div>${text}</div>`;
            } 
                  
    });   
   $( '#chats').html(html);        
    // $( '#chats').each(`<div class = "chat"> <div class="username">${user}</div>${text}</div>`);
  })


  let clicked = false;
  $('#chats').on('click', '#someUser', function(e) {
    let user = e.target.textContent;
    console.log(e);
    console.log(user);
    let id = user;
    app.handleUsernameClick(user);
//---------WE uncomment it it for the tests --------- //
    // if (!clicked) {
    // clicked = true;
    // // $(this).append(`
    // //   <div class="friendRequest">
    // //   <div>Would you like to add ${user} as your friend?</div>
    // //   <div class = "room lounge" onclick = "addtoFriendArr(${user})">Yes</div>
    // //   <div class = "room lounge" onclick = "removeDiv()">No</div>
    // //   </div>
    // // `);
    // } else {
    //   $('.friendRequest').toggle();
    // }
  
})
  
$('#messageSubmit').on('click', function() {
    let userText = $('#messageInput').val();
    let message = {
      text: userText,
      user: window.userName,
      roomname: 'lounge'
    };
    app.renderMessage(message);
    // console.log(message);
});

$('#messageSubmit').on('click', function() {
    let room = $('#roomInput').val();
    app.renderRoom(room);
    // console.log(message);
});




// let message = new Message('hi, ')