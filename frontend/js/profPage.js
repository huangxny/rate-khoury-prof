const currentUrl = window.location.href;
const profId = currentUrl.split('/')[4];
// eslint-disable-next-line require-jsdoc
async function displayProfInfo() {
  const documentsContainer = document.querySelector('.profInfo');
  try {
    const response = await fetch(`/comments/${profId}`);
    const documents = await response.json();
    documents.forEach((document) => {
      documentsContainer.innerHTML += `
        <h2>${document.name}</h2>
        <div>${document.course}</div>`;
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
}

// eslint-disable-next-line require-jsdoc
async function displayComments() {
  const commentsContainer = document.querySelector('#commentList');

  try {
    const response = await fetch(`/getComments/${profId}`);
    const documents = await response.json();
    documents.forEach((document) => {
      commentsContainer.innerHTML += `
        <li class="commentItem">
          <h4 class="indScore">Score: ${document.score}</h4>
          <div>Comment: ${document.comment}</div>
        </li><br>`;
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await displayProfInfo();
  await displayComments();
});

// post comment to server
document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const score = document.querySelector('#score').value;
  const comment = document.querySelector('#comment').value;
  fetch(`/comments/${profId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      score: score,
      comment: comment,
      pid: profId.split(':')[1],
    }),
  })
      .then((response) => response.json())
      .then(async (data) => {
        document.querySelector('#response').textContent = data.message;
        await displayComments();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
});
