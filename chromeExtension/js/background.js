// 自分のメアドでしか認証できないので、一応安全。認証情報は、当たり前だがpublicなgithubにあげないに越したことはない。
const API_KEY = 'AIzaSyDaN4uSmfB5i_lZ_2TWbEQkgQDEoTt_C5I';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SPREADSHEET_ID = '1LcRW3WY_uDXZHpOqYYbvYIM0aS_OvgOUBIU3BEE82zM';
const SPREADSHEET_TAB_NAME = 'test';

function onGAPILoad() {
  gapi.client.init({
    // Don't pass client nor scope as these will init auth2, which we don't want
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  }).then(function () {
    console.log('gapi initialized')
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      gapi.auth.setToken({
        'access_token': token,
      });

      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: SPREADSHEET_TAB_NAME,
      }).then(function(response) {
        console.log(`Got ${response.result.values.length} rows back`)

        // valuesをfor文を回すと1行ずつデータが取り出せます
        for(let a of response.result.values){
          console.log(a)
        }
      });
    })
  }, function(error) {
    console.log('error', error)
  });
}