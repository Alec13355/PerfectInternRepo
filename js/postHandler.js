var studentForm = document.getElementById("studentForm");
var companyForm = document.getElementById("companyForm");

async function sendData(fullname, email, message, file, fileFormat) {
    const json = {
        fullname,
        email,
        message,
        file,
        fileFormat
    };


    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://puaxrlsatf.execute-api.us-east-1.amazonaws.com/Prod/handlePost', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(json));
    xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        document.getElementById("loader").style.display = 'none';
        document.getElementById("button").style.display = 'none';
        console.log(xhr.responseText);
            if(xhr.responseText === 'success'){
                document.getElementById("thanks").innerHTML = 'We have received your application, thank you for applying!';
            }else{
                document.getElementById("thanks").innerHTML = 'There was an issue sending your application, please try again!';
            }
        }
    }

}

function getBase64(file) {
     return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => resolve(reader.result);
         reader.onerror = error => reject(error);
     });
}

companyForm.addEventListener("submit", function (event) {
   event.preventDefault();
   console.log(document.getElementById("loader"));
   document.getElementById("loader").style.display = 'inline';
   document.getElementById("button").style.display = 'none';
   var fullname = document.getElementById("fullname").value;
   var email = document.getElementById("email").value;
   var sites = document.getElementById("message").value;
   var resume = document.getElementById("resume").value;
   var fileFormat = document.getElementById("resume").value;
   fileFormat = fileFormat.substr(fileFormat.length -4);
   var file = document.getElementById("resume").files[0];

  getBase64(file).then(
      data => sendData(fullname, email, message, data, fileFormat)
  ).catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));

  return false;

 });

studentForm.addEventListener("submit", function (event) {
   event.preventDefault();
   console.log(document.getElementById("loader"));
   document.getElementById("loader").style.display = 'inline';
   document.getElementById("button").style.display = 'none';
   var fullname = document.getElementById("fullname").value;
   var email = document.getElementById("email").value;
   var sites = document.getElementById("message").value;
   var resume = document.getElementById("resume").value;
   var fileFormat = document.getElementById("resume").value;
   fileFormat = fileFormat.substr(fileFormat.length -4);
   var file = document.getElementById("resume").files[0];

  getBase64(file).then(
      data => sendData(fullname, email, message, data, fileFormat)
  ).catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));

  return false;

 });
