document.addEventListener('DOMContentLoaded', function() {
    var sessionKeyInput = document.getElementById('sessionKeyInput');
    var loginButton = document.getElementById('loginButton');
    var getacc = document.getElementById('getacc');
  
    loginButton.addEventListener('click', function() {
      var sessionKey = sessionKeyInput.value.trim();
      if (sessionKey) {
        chrome.tabs.create({ url: 'https://claude.ai' }, function(tab) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setCookieCode,
            args: [sessionKey]
          });
        });
      }
    });

    getacc.addEventListener('click', function(){

      chrome.tabs.create({ url: 'https://tomfk.top' })

    })
    
  });
  








  function setCookieCode(sessionKey) {
    document.cookie = "sessionKey=" + sessionKey + "; path=/";
  }
  