
const currentUrl = window.location.href;
const profId = currentUrl.split('/')[4];
const commentDisplay = document.getElementById('commentDisplay');``

console.log(profId);
//fetch and display professor's info
document.addEventListener('DOMContentLoaded', async () => {
    const documentsContainer = document.querySelector('.profInfo')

    try {
        const response = await fetch(`/comments/${profId}`);
        const documents = await response.json();
        console.log(documents);
        documents.forEach(document => {
            documentsContainer.innerHTML += `
            <div class="col-4">
  <div class="listing card">
    <div class="card-body">
      <h2 class="card-title">${document.name}</h2>
      <div>${document.course}</div>
    </div>
  </div>
  </div><br>`
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
});
//post comment to server
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const score = document.getElementById('score').value;
    const comment = document.getElementById('comment').value;
    fetch(`/comments/${profId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score: score,
            comment: comment,
            pid: profId.split(':')[1]
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').textContent = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

commentDisplay.addEventListener('click', async () => {
    const commentsContainer = document.querySelector('#commentList')

    try {
        const response = await fetch(`/getComments/${profId}`);
        const documents = await response.json();
        console.log(documents);
        documents.forEach(document => {
            commentsContainer.innerHTML += `
            <div class="col-4">
  <div class="listing card">
    <div class="card-body">
      <h2 class="card-title">${document.score}</h2>
      <div>${document.comment}</div>
    </div>
  </div>
  </div><br>`
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
});