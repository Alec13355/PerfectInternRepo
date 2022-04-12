var companyForm = document.getElementById("companyForm");
const url = "https://www.workersway.org/api/HttpTrigger";
async function sendData(fullname, email, message) {
    const json = {
        fullname,
        email,
        message,
    };


    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(json));
    xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        document.getElementById("loader").style.display = 'none';
        document.getElementById("companyButton").style.display = 'none';
        document.getElementById("thanks").innerHTML = 'We have received your request and will reach out shortly.';
        }
    }

}

companyForm.addEventListener("submit", function (event) {
   document.getElementById("loader").style.display = 'show';
   document.getElementById("fullnameCompany").style.display = 'none';
   document.getElementById("emailCompany").style.display = 'none';
   document.getElementById("messageCompany").style.display = 'none';
   event.preventDefault();
   document.getElementById("loader").style.display = 'inline';
   var fullname = document.getElementById("fullnameCompany").value;
   var email = document.getElementById("emailCompany").value;
   var message = document.getElementById("messageCompany").value;
   sendData(fullname, email, message);

  return false;

 });
