console.log("we are in the browser");


// let cookie = request.cookie["loggedin"]
// console.log(cookie)

    let loginButton = document.querySelector('#loginbutton')

    if(document.cookie){
    loginButton.innerHTML = `<a href="/logout" ><div class="nav_button"><img src="/icons/login2.png" class="icons"/>Log Out</div></a>`

    }
    else{
        loginButton.innerHTML = `<a href="/login" ><div class="nav_button"><img src="/icons/login2.png" class="icons"/>Login</div></a>`;


        let greeting = document.querySelector('#greeting');
        if(greeting){
        greeting.innerHTML = "";
        }

        let dashboard = document.querySelector('#dashboard');
        dashboard.innerHTML = "";

        let addhome = document.querySelector('#addhome');
        addhome.innerHTML = "";
    }


//////////////////////////////////////////////////////////////////////////////////////

let deletebutton = document.querySelector('#delete');
deletebutton.addEventListener('click', function(event){

var result = confirm("Are you sure to delete?");
    if(result){
       document.getElementById("form1").submit();
    }
})

