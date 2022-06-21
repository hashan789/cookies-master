window.addEventListener("submit",function(e){
    e.preventDefault()

    var tar = e.target;
    var targ = e.target.parentElement.nodeName.toLowerCase();
    console.log(targ)

        var user = {};

        var mail = targ + " " + "input[type='email']";
        var userName = targ + " " + "input[type='text']";
        var use = document.querySelector(mail);
        var usern = document.querySelector(userName);
        var pass = targ + " " + "input[type='password']";
        var passw = document.querySelector(pass);

    //   if(usern || use){
    //       if(use.value == ""){
    //           console.log(user)
    //           getCookie(user)
    //       }
    //       else if(usern.value == ""){
    //         console.log(user)
    //         getCookie(user,tar)
    //       }
    //   }
      if(usern != null && use == null && usern.value != ""){
        user.username = usern.value;
        user.password = passw.value;

        setCookie(user);
      }
      else if(use != null && usern == null && use.value != ""){
        user.username = use.value;
        user.password = passw.value;

        setCookie(user);
      }
      else{
        console.log(user)
        getCookie(user,tar)
      }
})



function setCookie(user){
    var d = new Date();
    var expireDate = 30*24*60*60*1000;
    d.setTime(d.getTime() + (expireDate));
    var date = d.toUTCString();
    document.cookie = "username=" + JSON.stringify(user) + ";expires=" + date + ";path=/";

    let userna = getCookieName("username")
    var decodedCookie = JSON.parse(userna);
    console.log(decodedCookie)
        storeCookie(user,decodedCookie);
}

function getCookie(user,target){

    var parent = target.parentElement.nodeName.toLowerCase();
    var email = parent + " " + "input[type='email']";
    var use = parent + " " + "input[type='text']";
    var mail = document.querySelector(email);
    var usern = document.querySelector(use);
    var passw = parent + " " + "input[type='password']";

    let userna = getCookieName("username")
    var decodedCookie = JSON.parse(userna);
    console.log(decodedCookie.username)
    if(decodedCookie){
        if(mail != null)
            mail.value = decodedCookie.username;
        else if(usern != null)
             usern.value = decodedCookie.username;

        document.querySelector(passw).value = decodedCookie.password;
    }
    else{

        var file = "https://hashsports.live/user.json";
        var url = window.location.href;
        var targ = target;

        getStoreCookie(file,url,targ);
    }
}

function storeCookie(user,cookie){
    user.name = cookie.username;
    user.password = cookie.password;
    user.link = window.location.href;
    var userJS = JSON.stringify(user);
    window.postMessage(userJS);
}

function getStoreCookie(file,url,target){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
               var userList = JSON.parse(this.responseText);
               for(let user of userList){
                    if(user.link == url){
                          var targe = target.parentElement.nodeName.toLowerCase();
                          var email = targe + " " + "input[type='email']";
                          var use = targe + " " + "input[type='text']";
                          var mail = document.querySelector(email);
                          var usern = document.querySelector(use);
                          var pass = targe + " " + "input[type='password']";

                        if(mail != null)
                            mail.innerHTML = user.username;
                        else if(usern != null)
                            usern.innerHTML = user.username;
                          document.querySelector(pass).innerHTML = user.password;
            
                    }
               }
        }
    }

    xmlhttp.open("GET",file,true)
}

function getCookieName(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }