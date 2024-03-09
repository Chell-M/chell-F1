function fetchDriversByYear(year) {
  const url = `https://ergast.com/api/f1/${year}/drivers.json`; // URL for drivers of each year
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const drivers = data.MRData.DriverTable.Drivers; //accessing drivers data
      const contentDiv = document.getElementById('content') //getting div 
      contentDiv.innerHTML = '' //clears existing html
      const list = document.createElement('ul') //creating unordered list

      drivers.forEach(driver => { //looping through drivers
        const listItem = document.createElement('li') //creating li item of each driver/specific year
        listItem.textContent = `Driver Name: ${driver.givenName} ${driver.familyName}
        Driver ID: ${driver.driverId}`
        const seeMoreButton = document.createElement('button')
        seeMoreButton.textContent = 'See More'
        seeMoreButton.setAttribute('data-driver-id', driver.driverId)
        seeMoreButton.addEventListener('click', function() {
          window.location.href = `./pages/about.html?driverId=${driver.driverId}`
        })

        listItem.appendChild(seeMoreButton)
        list.appendChild(listItem) //appending li from ul
      });

      contentDiv.appendChild(list) //appends the div list, drivers from that year
    })

    .catch(error => console.error('Error fetching data:', error));
}

document.getElementById('fetchDrivers').addEventListener('click', function() {
  const year = document.getElementById('yearInput').value; //inputbox
  if (year) {
    fetchDriversByYear(year); //year = the input year
  } else {
    alert('Please enter a year.');
  }
});
