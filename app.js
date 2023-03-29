let inputItem = document.getElementById('task');
const ulDOM = document.getElementById('list');
let allLiDOM = document.querySelectorAll("li");

function removeElement(erase) { 
    erase.remove();            
    eraseStrorage(erase);       
}

function markElement(){
    this.classList.toggle("checked");
}

let closeButton = `<button 
onclick="removeElement(parentNode)" 
style="padding: 13px;" type="button" 
class="close" 
data-dismiss="toast"
aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>`


allLiDOM.forEach(e => {
        e.addEventListener("click", markElement);
        e.innerHTML += `${closeButton}`;
    })

function newElement(){
    if(inputItem.value.trim() != ""){
        let liDOM = document.createElement('li');     
        liDOM.innerHTML = `${inputItem.value}${closeButton}`;
        liDOM.addEventListener("click", markElement);
        ulDOM.appendChild(liDOM);
        $('.success').toast("show");
        setStrorage();
        inputItem.value = '';
    }
    
    else{
        $('.error').toast("show"); 
    }
}

let toDoList = JSON.parse(localStorage.getItem("toDoList"));
toDoList = [];
localStorage.setItem("toDoList", JSON.stringify(toDoList));

function setStrorage(){
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));   // toDoList ls'sini array'a çevirip olarak çağırdık.
    toDoList.push(`${inputItem.value}`);                             // input'a girdiğimiz yazıyı toDoList array'ine ekledik.
    localStorage.setItem("toDoList", JSON.stringify(toDoList));    // toDoList'i tekrar string'e çevirip ls'ye yolladık.
}

function eraseStrorage(erase){
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));    // toDoList ls'sini array'a çevirip olarak çağırdık.
    if (toDoList.includes(erase.firstChild.textContent) == true) {  // toDoList array'i listeye yazdığımız metini içeriyorsa
        let indexbul = toDoList.findIndex(e =>                      // Bu metinin(array'in elemanı) index nosunu buluyoruz.
            e == erase.firstChild.textContent
            );
        toDoList.splice(indexbul, 1);                               // index nosundan kendisini bulup array'den siliyoruz.
        localStorage.setItem("toDoList", JSON.stringify(toDoList)); // toDoList'i tekrar string'e çevirip ls'ye yolladık.
    } 
}


