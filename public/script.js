const Login = document.querySelector("form")
Login.addEventListener("submit",(e)=>{
    e.preventDefault()
    const Valid=[...Login.querySelectorAll("input")]
    const Check=Valid.every(item=>item.checkValidity())
    if(Check){
        Login.submit()
    }
})