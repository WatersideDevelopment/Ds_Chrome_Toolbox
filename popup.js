// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function click(e) {
    console.log('click');
    var scr = "drop("+ e.target.id +")";
    alert(scr);

    console.log('post alert');
    chrome.tabs.getCurrent(function(tab) {
        console.log(tab);
    });
    chrome.tabs.executeScript(null, {file: "payload.js"}, function(){
        console.log('exect 1');
        chrome.tabs.sendMessage(null, { scriptOptions: e}, {}, function() {
            //all injected
            console.log('injected');
        });
    });
    window.close();
}

document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});

