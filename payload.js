/**
 * Created by darran on 17/08/15.
 */

chrome.runtime.onMessage.addListener(function(message, sender) {
    console.log('listened');
    console.log(message);
    console.log(sender);

    var deleteDatabase=function(databaseName) {
        var req = indexedDB.deleteDatabase(databaseName);
        req.onsuccess = function () {
            console.log('Deleted database ' + databaseName + ' successfully');
        };
        req.onerror = function () {
            console.error('Couldn\'t delete database ' + databaseName);
        };
        req.onblocked = function () {
            console.log('Couldn\'t delete database ' + databaseName + ' due to the operation being blocked');
        };
    }
    indexedDB.webkitGetDatabaseNames().onsuccess = function(sender, args)
    {
        var dbs = sender.target;
        for(var i=0; i<dbs.result.length;i++) {
            deleteDatabase(dbs.result[i]);
        }
    };
});

console.log("drop it like it's hot");