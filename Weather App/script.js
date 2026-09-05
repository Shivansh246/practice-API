
const Inputlocation = document.querySelector("#InputLocation");
const LocationSubmitBtn = document.querySelector("#LocationSubmitBtn");
const info=document.querySelector("#info");

function renderData(address,temperature,conditions,feelslike,humidity,windSpeed,deg){
    info.textContent="";
    const addressDiv=document.createElement("div");
    const temperatureDiv=document.createElement("div");
    const conditionsDiv=document.createElement("div");
    const feelslikeDiv=document.createElement("div");
    const humidityDiv=document.createElement("div");
    const windSpeedDiv=document.createElement("div");

    addressDiv.textContent=`Address: ${address}`;
    temperatureDiv.textContent=`Temperature: ${temperature}°${deg}`;
    conditionsDiv.textContent=`Conditions: ${conditions}`;
    feelslikeDiv.textContent=`Feelslike: ${feelslike}`;
    humidityDiv.textContent=`Humidity: ${humidity}`;
    windSpeedDiv.textContent=`WindSpeed: ${windSpeed}`;

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent="Toggle Temperature";
    toggleBtn.addEventListener("click",(e)=>{
        let newTemp=temperature;
        if(deg==='F'){
            deg='C'
            newTemp = (temperature - 32) * 5/9;
        }else{
            deg='F';
            newTemp = (temperature * 9/5) + 32;
        }
        renderData(address,newTemp,conditions,feelslike,humidity,windSpeed,deg);
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
        renderData(usefulData.address,usefulData.temperature,usefulData.conditions,usefulData.feelslike,usefulData.humidity,usefulData.windspeed,'F');
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
                windspeed: data.currentConditions.windspeed
        };
    }catch(error){
        console.log(error);
    }
}
LocationSubmitBtn.addEventListener("click",(e)=>{
    getData(Inputlocation.value);
})