document.addEventListener("DOMContentLoaded", function () {
    // document.querySelector("#config").addEventListener("click", function () {
    //   window.open(chrome.runtime.getURL("options.html"));
    // });
  
    // document.querySelector("#about").addEventListener("click", function () {
    //   window.open("https://github.com/igrigorik/videospeed");
    // });
  
    // document.querySelector("#feedback").addEventListener("click", function () {
    //   window.open("https://github.com/igrigorik/videospeed/issues");
    // });
  
    // document.querySelector("#enable").addEventListener("click", function () {
    //   toggleEnabled(true, settingsSavedReloadMessage);
    // });
  
    // document.querySelector("#disable").addEventListener("click", function () {
    //   toggleEnabled(false, settingsSavedReloadMessage);
    // });
  
    // chrome.storage.sync.get({ enabled: true }, function (storage) {
    //   toggleEnabledUI(storage.enabled);
    // });


    async function loadNewTab(url, timeoutSeconds = 10) {
      return new Promise((resolve, reject) => {
        let targetTabId = null
    
        const listener = (tabId, changedProps) => {
          if (tabId != targetTabId || changedProps.status != 'complete') {
            return
          }
          chrome.tabs.onUpdated.removeListener(listener)
          resolve(tabId)
        }
        chrome.tabs.onUpdated.addListener(listener)
    
        chrome.tabs.create({ url, active: false }, (tab) => {
          targetTabId = tab.id;
        })
    
        setTimeout(() => {
          reject(new Error('Timeout...'))
        }, timeoutSeconds * 1000)
      })
    }

    async function parseWikipedia(tabId) {
      return new Promise((resolve, reject) => {
        chrome.tabs.executeScript(
          tabId,
          { file: 'js/readContent.js' },
          (results) => {
            if (results[0] === null) {
              reject(new Error('Failed to parse wikipedia.'))
            } else {
              resolve(results[0]);
            }
          }
        )
      })
    }

    // URLを開き情報を取得して配列を返す
    async function openURLgetInfo(tabId) {
      console.log('a');
      return new Promise((resolve, reject) => {
        chrome.tabs.executeScript(
          tabId,
          { file: 'js/openURLgetInfo.js' },
          (results) => {
            console.log('b',tabId);
            console.log('yy',results);
            if (results[0] === null) {
              console.log('uy');
              reject(new Error('Failed to parse openURLgetInfo.'))
            } else {
              resolve(results[0])
            }
          }
        )
      })
    }

    function doInCurrentTab(tabCallback) {
      chrome.tabs.query(
          { currentWindow: true, active: true },
          function (tabArray) { tabCallback(tabArray[0]); }
      );
     }
 
    document.querySelector("#export").addEventListener("click", async function (e) {
      e.preventDefault()
      // toggleError(false)
      try {
        // var tabInfo = chrome.tabs.getCurrentTab(tab => console.log(tab.url));
        if (typeof browser === "undefined") {
          var browser = chrome;
        }

        var activeTabId;
        doInCurrentTab( async function(tab){ 
          activeTabId = tab.id;
          const promise = await parseWikipedia(activeTabId);

          // 個別の商品の URL を開いて情報取得
          for( var childURL of promise ){
            console.log('c');
            var tabId = await loadNewTab(childURL);
            console.log('d');
            var array = await openURLgetInfo(tabId);
            console.log('tata',tabId);
          }

        } );

      } catch (e) {
        console.log(e)
        // toggleError(true)
      }
    });
  
    function toggleEnabled(enabled, callback) {
      chrome.storage.sync.set(
        {
          enabled: enabled
        },
        function () {
          toggleEnabledUI(enabled);
          if (callback) callback(enabled);
        }
      );
    }
  
    function toggleEnabledUI(enabled) {
      document.querySelector("#enable").classList.toggle("hide", enabled);
      document.querySelector("#disable").classList.toggle("hide", !enabled);
  
      const suffix = `${enabled ? "" : "_disabled"}.png`;
      chrome.browserAction.setIcon({
        path: {
          "19": "icons/icon19" + suffix,
          "38": "icons/icon38" + suffix,
          "48": "icons/icon48" + suffix
        }
      });
    }
  
    function settingsSavedReloadMessage(enabled) {
      setStatusMessage(
        `${enabled ? "Enabled" : "Disabled"}. Reload page to see changes`
      );
    }
  
    function setStatusMessage(str) {
      const status_element = document.querySelector("#status");
      status_element.classList.toggle("hide", false);
      status_element.innerText = str;
    }
  
  });
  
