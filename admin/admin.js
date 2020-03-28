
var picid = "";
var uid = "";
var uname = "";
function getuserid()
            {
		    var userid = window.AppInventor.getWebViewString();
                /*var userid= parseInt(sessionStorage.getItem("userid"));*/
                return userid;
            }
function getusername()
            {
                var username= parseInt(sessionStorage.getItem("username"));
                return username;
            }
uid = getuserid();
document.getElementById("uid").value = uid;
uname = getusername();
document.getElementById("uname").value = uname;

function anothergal(){
  Swal.fire('Please Wait...','Thank You for your last upload','success');
  window.open('index.html');
  window.close(this);
}
function viewgal(){
  Swal.fire('Please Wait...','Thank You for your upload(s)','success');
  window.open('../gallery/index.html');
  window.close(this);
}

function picidset(){
	var jst = new Date();
  var jstn = jst.valueOf();
  var lst = new Date("12/31/2050");
  var lstn = lst.valueOf();
  var diff = lstn - jstn;
	picid = diff;
  document.getElementById("picid").value = picid;
}

var config = {
  apiKey: "AIzaSyC78ftyOE_7j4R-7lde50yvZscVz2zKTKg",
    authDomain: "publicgallery2020.firebaseapp.com",
    databaseURL: "https://publicgallery2020.firebaseio.com",
    projectId: "publicgallery2020",
    storageBucket: "publicgallery2020.appspot.com",
    messagingSenderId: "469562353022",
    appId: "1:469562353022:web:456bc5841a959fc140bf2f",
    measurementId: "G-HQK1SRYDGD"
};
firebase.initializeApp(config);

// Listen for form submit
document.getElementById('galleryadd').addEventListener('submit', submitForm);


function submitForm(e){
  e.preventDefault();

  // Get values
var	uid = getInputVal('uid');
var uname = getInputVal('uname');
var	picid = getInputVal('picid');
var updgal = getInputVal('updgal');
var icap = getInputVal('icap');

 // Save message
  saveMessage(uid,uname,picid,updgal,icap);
  document.getElementById("galleryadd").style.display = 'none';
  document.getElementById("thankgal").style.display = 'block';
  document.getElementById('galleryadd').reset();
  picidset();
}

function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase   
function saveMessage(uid,uname,picid,updgal,icap){
  /*
  var newMessageRef = messagesRef.push();
  MessageRef.set({
  */
  firebase.database().ref('gallery/' + picid).set({
uid:uid,
uname:uname,
picid:picid,
updgal:updgal,
icap:icap
  });
}




var fbBucketName2 = 'gallery';

    var uploader2 = document.getElementById('uploader2');
    var fileButton2 = document.getElementById('fileButton2');
    fileButton2.addEventListener('change', function (e1) {

      console.log('file upload event', e1);
      
      var FileSize = e1.target.files[0].size / 1024 / 1024; // in MB
          if (FileSize > 5.048) 
          {
              /*swal('Oops..','File size exceeds 10 MB \n Please Choose a new Photo.','error');*/
              Swal.fire(
                        'Oops..',
                        'File size exceeds 10 MB \n Please Choose a new Photo.',
                        'error'
                        )
              document.getElementById('fileButton2').value = "";
          } 
          else 
          {
            var file2 = e1.target.files[0];
          }
          
      var file2 = e1.target.files[0];

      var str = e1.target.files[0].type;
      
      var n = str.length - str.lastIndexOf("/") -1;
      
      var strt = str.substr(str.length - n);

      var storageRef2 = firebase.storage().ref(`${fbBucketName2}/${picid}.${strt}`);

      var uploadTask2 = storageRef2.put(file2);

      uploadTask2.on(firebase.storage.TaskEvent.STATE_CHANGED, 
        function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader2.value = progress;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: 
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: 
              console.log('Upload is running');
              break;
          }
        }, function (error) {

            switch (error.code) {
            case 'storage/unauthorized':
              break;

            case 'storage/canceled':
              break;

            case 'storage/unknown':
              break;
          }
        }, function () {
          var downloadURL2 = uploadTask2.snapshot.downloadURL;
          console.log('downloadURL2', downloadURL2);
          var link2 = document.getElementById("galler");
          link2.setAttribute("src", downloadURL2);
          document.getElementById('updgal').value = downloadURL2;
        });

    });
