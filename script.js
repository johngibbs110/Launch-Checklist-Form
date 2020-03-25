window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         const div = document.getElementById("missionTarget");
         let randomNumber = Math.floor(Math.random() * 6);
         div.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[randomNumber].name}</li>
            <li>Diameter: ${json[randomNumber].diameter}</li>
            <li>Star: ${json[randomNumber].star}</li>
            <li>Distance from Earth: ${json[randomNumber].distance}</li>
            <li>Number of Moons: ${json[randomNumber].moons}</li>
         </ol>
         <img src="${json[randomNumber].image}">
         `;
      });
   });
   let form = document.getElementById("launchForm");
   form.addEventListener("submit", function() {
      let pilotName = document.querySelector("input[name = pilotName]");
      let coPilotName = document.querySelector("input[name = coPilotName]");
      let fuelLevel = document.querySelector("input[name = fuelLevel]");
      let cargoMass = document.querySelector("input[name = cargoMass]");
      if (pilotName.value === "" || coPilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         event.preventDefault();
         console.log(pilotName.value);
         console.log(coPilotName.value);
      } else if (isNaN(pilotName.value) === false) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      } else if (isNaN(coPilotName.value) === false) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      } else if (isNaN(fuelLevel.value) === true) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      } else if (isNaN(cargoMass.value) === true) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      } else {
         let faultyItems = document.getElementById("faultyItems");
         let launch = document.getElementById("launchStatus");
         if (fuelLevel.value < 10000 && cargoMass.value > 10000) {
            faultyItems.style.visibility = 'visible';
            launch.innerHTML = "Shuttle not ready for launch.";
            launch.style.color = 'red';
            faultyItems.innerHTML = `
            <ol>
               <li id="pilotStatus">${pilotName.value} is ready for takeoff.</li>
               <li id="copilotStatus">${coPilotName.value} is ready for takeoff.</li>
               <li id="fuelStatus">Not enough fuel for the journey.</li>
               <li id="cargoStatus">Too much mass for the shuttle to take off.</li>
            </ol>
            `;
            event.preventDefault(); 
         }   
         if (fuelLevel.value < 10000 && cargoMass.value < 10000) {
            faultyItems.style.visibility = 'visible'; 
            launch.innerHTML = "Shuttle not ready for launch."; 
            launch.style.color = "red"; 
            faultyItems.innerHTML = `
            <ol>
               <li id="pilotStatus">${pilotName.value} is ready for takeoff.</li>
               <li id="copilotStatus">${coPilotName.value} is ready for takeoff.</li>
               <li id="fuelStatus">Not enough fuel for the journey.</li>
               <li id="cargoStatus">Cargo mass low enough for launch.</li>
            </ol>   
            `;
            event.preventDefault(); 
            }
         if (cargoMass.value > 10000 && fuelLevel.value > 10000) {
            faultyItems.style.visibility = 'visible'; 
            launch.innerHTML = "Shuttle not ready for launch."; 
            launch.style.color = "red"; 
            faultyItems.innerHTML = `
            <ol>
               <li id="pilotStatus">${pilotName.value} is ready for takeoff.</li>
               <li id="copilotStatus">${coPilotName.value} is ready for takeoff.</li>
               <li id="fuelStatus">Fuel level high enough for launch.</li>
               <li id="cargoStatus">Too much mass for the shuttle to take off.</li>
            </ol>   
            `;
            event.preventDefault(); 
            }
         if (fuelLevel.value > 10000 && cargoMass.value < 10000) {
            faultyItems.style.visibility = 'visible'; 
            launch.innerHTML = "Shuttle is ready for launch.";
            launch.style.color = "green";
            faultyItems.innerHTML = `
            <ol>
               <li id="pilotStatus">${pilotName.value} is ready for takeoff.</li>
               <li id="copilotStatus">${coPilotName.value} is ready for takeoff.</li>
            </ol>   
            `;
            event.preventDefault(); 
            }   
      }
   });
});