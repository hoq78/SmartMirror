// clientid = '338294178289-fdhuk9lqmgaatll67u30j9675t7mtpto.apps.googleusercontent.com'
// client secret = 'igFBr-bij2L-wPsoZwMouytS'
// document.addEventListener('DOMContentLoaded', function() {
//     checkAuth();
// }, false);

var CLIENT_ID = '338294178289-fdhuk9lqmgaatll67u30j9675t7mtpto.apps.googleusercontent.com';
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var intervalHandle = null;

/**
 * Check if current user has authorized this application.
 */
function checkAuth(callback) {
    gapi.auth.authorize({
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
    }, function(authResult) { handleAuthResult(callback, authResult) } );
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(callback,authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadGmailApi(callback);
        registerInboxInterval(1000*60*5);
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
    gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false
        },
        handleAuthResult);
    return false;
}

/**
 * Load Gmail API client library. List labels once client library
 * is loaded.
 */
function registerInboxInterval(x){
  if(intervalHandle){
    clearInterval(intervalHandle);
  }
  intervalHandle = setInterval(inboxCount, x);
}

function loadGmailApi(callback) {
    // gapi.client.load('gmail', 'v1', listLabels);
    gapi.client.load('gmail', 'v1', callback);
}


function inboxCount() {
    var request = gapi.client.gmail.users.labels.get({
        'userId': 'me',
        'id': config.mail.whichInboxCount,
    });
    request.execute(function(resp) {
        noOfUnreadEmails = resp.messagesUnread;
        $('#inboxCountNumber').html(noOfUnreadEmails);
    });
  }

function getEmailIds(resp){
  emailIDs = [];
  for(noOfmail=0; noOfmail<config.mail.howManyEmails; noOfmail++){
    emailID = resp.messages[noOfmail].id;
    emailIDs.push(emailID);
  };
  return emailIDs
}

function getSubjectHeaders(resp){
  emailSubjects = [];
  for(i=0;i<resp.payload.headers.length;i++){
    if(resp.payload.headers[i].name == 'Subject'){
      subject = resp.payload.headers[i].value;
      return subject
    };
  };
}

function getEmailContent(resp){
  emailContent = [];
  for(i=0; i<config.mail.howManyEmails;i++){
    emailSnippet = resp.snipppet;
    emailContent.push(emailSnippet);
  };
  return emailContent;
}

function detailedMail(){
  var request = gapi.client.gmail.users.messages.list({
    'userId':'me',
    'labelIds':'IMPORTANT',
  });
  request.execute(function(resp) {
    emailIDs = getEmailIds(resp);
    emailSubjects = [];
    emailSnippets = [];
    for(emailIDtoGet=0;emailIDtoGet<emailIDs.length;emailIDtoGet++){
      emailID = emailIDs[emailIDtoGet];
      emailSubject = [];
      emailContent = [];
      getMessage(emailID);
    };
    console.log(emailSubjects);
  })
}

function getMessage(id){
    var request = gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': id,
    });
    request.execute(function(resp){
      emailSubject.push(getSubjectHeaders(resp));
      emailContent.push(resp.snippet);
      console.log(emailSubject);
      // tempArray = [emailSubject,emailContent];
      // console.log(tempArray);
      // return tempArray;
    })
}
