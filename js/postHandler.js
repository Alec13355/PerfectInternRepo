var studentForm = document.getElementById("studentForm");

const url1 = "https://www.workersway.org/api/HttpTrigger1";
// const url1 = "http://localhost:7071/api/HttpTrigger1"
// const url1 = "http://localhost:7071/api"

async function sendData1(fullname, email, message, file, fileFormat) {
    const json = {
        fullname,
        email,
        message,
        file,
        fileFormat
    };


    var xhr = new XMLHttpRequest();
    xhr.open("POST", url1, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(json));
    xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        document.getElementById("loader").style.display = 'none';
        document.getElementById("studentButton").style.display = 'none';
        document.getElementById("thanks").innerHTML = 'We have received your information, and will reach out shortly!';
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

studentForm.addEventListener("submit", function (event) {
   event.preventDefault();
   document.getElementById("loader").style.display = 'inline';
   document.getElementById("studentButton").style.display = 'none';
   document.getElementById("fullname").style.display = 'none';
   document.getElementById("email").style.display = 'none';
   document.getElementById("message").style.display = 'none';
   document.getElementById("resume").style.display = 'none';
   document.getElementById("resumeLabel").style.display = 'none';

   var fullname = document.getElementById("fullname").value;
   var email = document.getElementById("email").value;
   var sites = document.getElementById("message").value;
   var resume = document.getElementById("resume").value;
   var fileFormat = document.getElementById("resume").value;
   fileFormat = fileFormat.substr(fileFormat.length -4);
   var file = document.getElementById("resume").files[0];
   var message = document.getElementById("message").value;

  getBase64(file).then(
      data => sendData1(fullname, email, message, data, fileFormat)
  ).catch(() => console.log("Canâ€™t access " + url1 + " response. Blocked by browser?"));

  return false;

 });
