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
    // 设置Cookie的属性
    var domain = ".claude.ai"; // 确保域名与当前页面匹配
    var path = "/";
    //var expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString(); // 设置过期时间为1天后
    var secure = true; // 仅在HTTPS连接中传输
    var sameSite = "Lax"; // 使用SameSite属性

    // 构建Cookie字符串
    var cookieString = "sessionKey=" + sessionKey + "; " +
                       "domain=" + domain + "; " +
                       "path=" + path + "; " +
                       //"expires=" + expires + "; " +
                       (secure ? "secure; " : "") +
                       "SameSite=" + sameSite;

    // 设置Cookie
    document.cookie = cookieString;
}
