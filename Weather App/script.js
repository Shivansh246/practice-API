
const Inputlocation = document.querySelector("#InputLocation");
const LocationSubmitBtn = document.querySelector("#LocationSubmitBtn");
const info=document.querySelector("#info");

function renderData(address,temperature,conditions,feelslike,humidity,windSpeed){
    const addressDiv=document.createElement("div");
    const temperatureDiv=document.createElement("div");
    const conditionsDiv=document.createElement("div");
    const feelslikeDiv=document.createElement("div");
    const humidityDiv=document.createElement("div");
    const windSpeedDiv=document.createElement("div");
    let deg='F';
    let temp = temperature;

    addressDiv.textContent=`Address: ${address}`;
    temperatureDiv.textContent=`Temperature: ${temp}&deg;F`;
    conditionsDiv.textContent=`Conditions: ${conditions}`;
    feelslikeDiv.textContent=`Feelslike: ${feelslike}`;
    humidityDiv.textContent=`Humidity: ${humidity}`;
    windSpeedDiv.textContent=`WindSpeed: ${windSpeed}`;

    const toggleBtn = document.createElement("button");
    toggleBtn.addEventListener("click",(e)=>{
        if(deg==='F'){
            deg='C'
            const newTemp = (temp - 32) * 5/9;
            temperature.textContent=`Temperature: ${newTemp}&deg;C`;
        }else{
            deg='F';
            const newTemp = (temp * 9/5) + 32;
            temperature.textContent=`Temperature: ${newTemp}&deg;F`;
        }
        renderData();
    });
    
    info.appendChild(addressDiv);
    info.appendChild(temperatureDiv);
    info.appendChild(conditionsDiv);
    info.appendChild(feelslikeDiv);
    info.appendChild(humidityDiv);
    info.appendChild(windSpeedDiv);
    info.appendChild(toggleBtn);
}
async function getData(givenLocation){
    try{
        const response= await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${givenLocation}?key=YDSZM2UZ8BWQ68SZFD5KMCMCS`);
        const usefulData = await getUsefulData(response);
        renderData(usefulData.address,usefulData.temperature,usefulData.conditions,usefulData.feelslike,usefulData.humidity,usefulData.windSpeed,usefulData.toggleBtn);
    }catch(error){
        console.log(error);
    }
}

async function getUsefulData(response){
    try{
        const data = await response.json(); 
        return {address:data.resolvedAddress,
                temperature: data.currentConditions.temp,
                conditions: data.currentConditions.conditions,
                feelslike: data.currentConditions.feelslike,
                humidity: data.currentConditions.humidity,
                windSpeed: data.currentConditions.windSpeed
        };
    }catch(error){
        console.log(error);
    }
}
LocationSubmitBtn.addEventListener("click",(e)=>{
    renderData(Inputlocation.value);

})