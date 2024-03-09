document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const driverId = params.get('driverId');

  if (driverId) {
    fetch(`http://ergast.com/api/f1/drivers/${driverId}.json`)
      .then(response => response.json())
      .then(data => {
        const driver = data.MRData.DriverTable.Drivers[0];
        displayDriverDetails(driver);
      })
      .catch(error => console.error('Error fetching driver details:', error));
  }
});

function displayDriverDetails(driver) {
  const detailsDiv = document.getElementById('driverDetails');
  detailsDiv.innerHTML = `<h2>${driver.givenName} ${driver.familyName}</h2>
  <p>Driver ID: ${driver.driverId}</p>
  <p>Driver Number: ${driver.permanentNumber}</p>
  <p>Nationality: ${driver.nationality}</p>
  <p>Date of Birth: ${driver.dateOfBirth}</p>`;
}
