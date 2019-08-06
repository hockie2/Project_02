console.log("we are in the browser");


// let cookie = request.cookie["loggedin"]
// console.log(cookie)

    let loginButton = document.querySelector('#loginbutton')

    if(document.cookie){
    loginButton.innerHTML = `<a href="/logout" ><div class="nav_button"><img src="/icons/login2.png" class="icons"/>Log Out</div></a>`

    }
    else{
        loginButton.innerHTML = `<a href="/login" ><div class="nav_button"><img src="/icons/login2.png" class="icons"/>Login</div></a>`;


        let greeting = document.querySelector('#hello');
        if(greeting){
        greeting.innerHTML = "";
        }

        let dashboard = document.querySelector('#dashboard');
        dashboard.innerHTML = "";

        let addhome = document.querySelector('#addhome');
        addhome.innerHTML = "";
    }

//////////////////////////////////////////////////////////////////////////////////////

let editbutton = document.querySelector('#edit');
editbutton.addEventListener('click', function(event){

       document.getElementById("editform").submit();

})
//////////////////////////////////////////////////////////////////////////////////////
let deletebutton = document.querySelector('#delete');
deletebutton.addEventListener('click', function(event){

var result = confirm("Are you sure to delete?");
    if(result){
       document.getElementById("deleteform").submit();
    }
})

////////////////////////////////////////////////////////////////////////////////////////

let ownername = document.querySelector('#ownername').innerHTML;
let loginname = document.querySelector('#loginname').innerHTML;
let comments_box = document.querySelector('.new_comment');


if(!document.cookie || ownername !== loginname){
    // console.log('HEYYYYYYYYYYYYYYYYY')
    editbutton.remove();
    deletebutton.remove();
}
else if(!document.cookie){
    // console.log('HEYYYYYYYYYYYYYYYYY')
    comments_box.remove();
}

// let comments_wrapper =document.querySelector('.comments_wrapper')

// if (comments_wrapper.innerHTML===""){
//     comments_wrapper.remove();
// }


////////////////////////////////////////////////////////////////////////////////////////
//comments fields
var textarea = document.querySelector('textarea');

textarea.addEventListener('keydown', autosize);

function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:5px';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}

document.getElementById("comment_textarea").addEventListener("keypress", submitOnEnter);

function submitOnEnter(event){
    if(event.which === 13){
    // alert('HELLOOOOOOO')
        // event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.target.form.submit();
        event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
        event.target.value = "";
    }
}



////////////////////////////////////////////////////////////////////////////////////////


