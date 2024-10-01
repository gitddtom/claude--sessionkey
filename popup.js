document.addEventListener('DOMContentLoaded', function() {
  var sessionKeyInput = document.getElementById('sessionKeyInput');
  var loginButton = document.getElementById('loginButton');
  var getacc = document.getElementById('getacc');

  loginButton.addEventListener('click', function() {
    var sessionKey = sessionKeyInput.value.trim();
    console.log("Login button clicked. Session Key:", sessionKey); // 添加日志
    if (sessionKey) {
      // 获取当前活动的标签页
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTab = tabs[0];
        console.log("Navigating to https://claude.ai in tab:", currentTab.id);
        
        // 在当前标签页中导航到 https://claude.ai
        chrome.tabs.update(currentTab.id, { url: 'https://claude.ai' }, function(tab) {
          // 延迟 2 秒后执行脚本
          setTimeout(function() {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: setCookieCode,
              args: [sessionKey]
            }, function() {
              console.log("Cookie setting script executed."); // 添加日志
              
              // 再延迟 2 秒后刷新页面
              setTimeout(function() {
                chrome.tabs.reload(tab.id, function() {
                  console.log("Tab reloaded."); // 添加日志
                });
              }, 2000);
            });
          }, 2000);
        });
      });
    } else {
      console.log("Session key is empty."); // 添加日志
    }
  });

  getacc.addEventListener('click', function() {
    window.location.href = 'https://tomfk.top';
  });
});

// 这是一个示例函数，用于设置 cookie
function setCookieCode(sessionKey) {
  console.log("Setting cookie with session key:", sessionKey); // 添加日志
  var cookieName = "sessionKey"; // 设置Cookie的名称
  var path = "/";
  var domain = ".claude.ai"; // 设置Cookie的作用域
  var secure = true; // 仅在HTTPS连接中传输
  var sameSite = "Lax"; // 使用SameSite属性

  // 构建Cookie字符串
  var cookieString = cookieName + "=" + sessionKey + "; " +
                     "path=" + path + "; " +
                     "domain=" + domain + "; " +
                     (secure ? "secure; " : "") +
                     "SameSite=" + sameSite;

  console.log("Cookie string:", cookieString); // 添加日志

  // 设置Cookie
  document.cookie = cookieString;
}
