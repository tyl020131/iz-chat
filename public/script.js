var socket = io();
var message = document.getElementById("message");
var user = document.getElementById("user");
var output = document.getElementById("chats");
var btn = document.getElementById("send");
var typing = document.getElementById("typing");
var area = document.getElementById("area");

//auto-scroll
area.scrollTop = area.scrollHeight - area.clientHeight;

//Selected Member
const izone = document.getElementById("member");
const members = izone.children;
if(izone.getAttribute("data-selected")=="none"){
    members[0].setAttribute("selected","selected");
}
else{
    for(var  i=0;i<members.length;i++){
        if(members[i].innerHTML.toLowerCase()==izone.getAttribute("data-selected")){
            members[i].setAttribute("selected","selected");
        }

    }
        
        
}
izone.addEventListener('change',()=>{
    location.href = '/'+izone.value ;
})


btn.addEventListener('click',()=>{
    socket.emit('chat',{
        message:message.value,
        user:izone.value
    })
    var container = document.createElement("div");
    var image = document.createElement("img")
    var image_path = "images/"+izone.value+"propic.jpg";
    image.src = image_path;
    image.style.order = "2";
    container.className = "messages";
    container.className+= " user";
    container.append(image);
    container.innerHTML += '<div><span><strong>'+izone.value+'</strong></span> <span class="content">  '+message.value+'</span></div>';
    output.append(container);
    area.scrollTop = area.scrollHeight - area.clientHeight;
    message.value = " ";
    socket.emit('typing',{user:izone.value,
        message:"submitted"});
    
})
message.addEventListener('keypress',()=>{
    socket.emit('typing',{user:izone.value,
         message:message.value});
    
})
message.addEventListener('blur',()=>{
    socket.emit('typing',{user:izone.value,
        message:"blur"});
})
socket.on('chat',(data)=>{
    var container = document.createElement("div");
    var image = document.createElement("img")
    var image_path = "images/"+data.user+"propic.jpg";
    image.src = image_path;
    container.className = "messages";
    container.className+= " other";
    container.append(image);
    container.innerHTML += '<div><span><strong>'+data.user+'</strong></span> <span class="content">  '+data.message+'</span></div>';
    output.append(container);
    area.scrollTop = area.scrollHeight - area.clientHeight;
})
socket.on('typing',(data)=>{
    if(data.message=="blur" || data.message=="submitted"){
        typing.innerHTML = " ";
    }
    else{
        typing.style.display="unset";
        typing.innerHTML = '<img src="images/'+data.user+'propic.jpg" id="propic" ><img src="images/typing.gif " id="typingpic" >';
        area.scrollTop = area.scrollHeight - area.clientHeight;
    }
    
    
});
