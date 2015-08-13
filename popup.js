// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
  chrome.tabs.executeScript(null,
    {
      code:"indexedDB.webkitGetDatabaseNames().onsuccess = function(sender, args) \
      { \
	var dbs = sender.target; \
	for(var i=0; i<dbs.result.length;i++) { \
          var databaseName = dbs.result[i]; \
          var req = indexedDB.deleteDatabase(databaseName); \
          req.onsuccess = function () { \
             console.log('Deleted database ' + databaseName + ' successfully'); \
          }; \
          req.onerror = function () { \
             console.error('Couldn\'t delete database ' + databaseName); \
          }; \
          req.onblocked = function () { \
             console.log('Couldn\'t delete database ' + databaseName + ' due to the operation being blocked'); \
          }; \
	} \
      };"
    }
  );
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
