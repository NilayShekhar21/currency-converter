const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".To select");

const msg = document.querySelector(".msg");



for(let select of dropdowns){
    for(currcode in countryList){
      let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value=currcode;
        if(select.name ==="from" && currcode ==="USD"){
          newOption.selected="selected"
        } else if(select.name ==="To" && currcode ==="INR"){
          newOption.selected="selected"
        }
          select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
      updateflag(evt.target);
    })
}


const updateflag =(element) =>{
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`
 let img= element.parentElement.querySelector("img");
 img.src = newsrc;
}

btn.addEventListener("click",async(evt)=>{
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
 if (amtval ==="" || amtval <1){
  amtval =1;
  amount.value ="1";
 }
const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;  // api only works on lowercase letter

 let response = await fetch(url);
 let data = await response.json();
 let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];




let finalamount = amtval*rate;
msg.innerText = `${amtval}${fromcurr.value} = ${finalamount} ${tocurr.value}`
})