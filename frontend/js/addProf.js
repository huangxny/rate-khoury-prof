document.querySelector('#form').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.querySelector('#name').value;
  const courseArray = document.querySelector('#courseArray')
      .value
      .split(',')
      .map((value) => value.trim());
  fetch('/addProf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      courseArray: courseArray,
    }),
  })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector('#response').textContent = data.message;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
});
