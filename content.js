function modifySite(file_path,tag){
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src',file_path);
    node.appendChild(script);
}

modifySite(chrome.extension.getURL('inject_script.js'),'body');


          window.addEventListener("message",function(event){
              chrome.runtime.sendMessage(event.data.userJS);
              console.log(JSON.parse(event.data.userJS))
          })