function validarEmail($emailValue) {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($emailValue)) {
        alert("Ok: El email esta en formato correcto (name@domain_name.domain)");
        //document.querySelector("useremail").focus();           
        //document.getElementById("bt").disabled = false;
        return true;
    }
    else {
        //console.log(inputText)
        alert("Attention: El email no tiene el formato correcto. Ingreselo segun el siguiente formato (name@domain_name.domain) \ n \ n *** Para continuar intente de nuevo. ***");
        //document.getElementById("useremail").focus()        
        return false;
    }
}

const $frmlogin = document.querySelector("#frmlogin");

$frmlogin.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const $email = document.querySelector("#email");
    const $password = document.querySelector("#pass");
    const $badrequest = document.querySelector("#bad-request")
    getUserbyEmailandPassword($email, $password, $badrequest)

});

async function getUserbyEmailandPassword(email, password, badrequest) {
    try {
        debugger
        $emailValue = email.value.trim()
        $passwordValue = password.value.trim()
        if(validarEmail($emailValue)){
            const url = 'http://152.70.220.185:8080/api/user/' + $emailValue + '/' + $passwordValue
            const response = await fetch(url);
            const responseJson = await response.json();

            console.log("response:", responseJson);

            if (responseJson.id == null) {
                badrequest.classList.remove("d-none")
                badrequest.classList.add("d-flex")
                setTimeout(() => {
                    badrequest.classList.remove("d-flex")
                    badrequest.classList.add("d-none")
                }, 6000);

            } else {
                const $welcome = document.querySelector("#welcome")
                sessionStorage.setItem('nombre', responseJson.name);

                window.location.href = "Inicio.html"

            }
        }
    } catch (error) {
        console.log("error:", error)
    }
}

function autoInicio() {
    console.log(sessionStorage.getItem('nombre'))
    // debugger

    const $welcome = document.querySelector("#wel")
    $welcome.innerHTML = "<b style='text-transform: uppercase;'>" + sessionStorage.getItem('nombre') + "</b>";
}