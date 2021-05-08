const socket= io();

let name ;
let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

do{
    name = prompt("Enter your name ...");

}while(!name);


textArea.addEventListener('keyup', (e)=>{


    if(e.key === 'Enter')
    {
        sendMessage(e.target.value);
       
    }
});

function sendMessage(message)
{
    let msg = {
        user : name,
        message : message.trim()
    };

    appandMessage(msg, 'outgoing');
    textArea.value='';

    scrollToBottom();


    // socket emit

    socket.emit("message",msg);
    


}

function appandMessage(msg, type)
{

    let mainDiv = document.createElement('div');

    let className =  type;

    mainDiv.classList.add( className , 'message');

    let markup = `

    <h4>${msg.user}</h4>
    <p>${msg.message}</p>

    `;

    mainDiv.innerHTML= markup ;

     messageArea.appendChild(mainDiv);



}


// recieve massages

socket.on("message",(msg)=>{
    // console.log(msg);
   appandMessage(msg, 'incoming');
   scrollToBottom();
   

})

function scrollToBottom()
{
    messageArea.scrollTop = messageArea.scrollHeight;
}