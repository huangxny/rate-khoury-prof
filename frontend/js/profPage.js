const currentUrl = window.location.href;
const profId = currentUrl.split('/')[4];
const commentsContainer = document.querySelector('#commentList');
const scoreDisplay = document.querySelector('#scoreDisplay');
// eslint-disable-next-line require-jsdoc
async function displayProfInfo() {
  const documentsContainer = document.querySelector('.profInfo');
  const title = document.querySelector('title');
  try {
    const response = await fetch(`/comments/${profId}`);
    const documents = await response.json();
    documents.forEach((document) => {
      documentsContainer.innerHTML += `
        <h2>${document.name}</h2>
        <div>${document.course}</div>`;
      title.textContent = document.name;
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
}

// eslint-disable-next-line require-jsdoc
async function displayComments() {
  try {
    const response = await fetch(`/getComments/${profId}`);
    const documents = await response.json();
    const scores = [];
    // display comments
    commentsContainer.innerHTML = '';
    documents.forEach((document) => {
      scores.push(document.score);
      commentsContainer.innerHTML += `
        <li class="commentItem">
          <h4 class="indScore">Score: ${document.score}</h4>
          <div>Comment: ${document.comment}</div>
           <button class="deleteBtn" 
           data-comment-id="${document._id}">Delete Comment</button>
        </li><br>`;
    });
    // calculate avg score
    const scoreIntArr = scores.map(Number);
    const average = (array) => {
      let sum = 0;
      array.forEach((score) => {
        sum += score;
      });
      return sum / array.length;
    };
    const avgScore = average(scoreIntArr);
    scoreDisplay.textContent = `Average Score: ${avgScore}`;
    // update score to professor
    await fetch(`/updateScore/${profId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({avgScore: avgScore}),
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error updating document:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await displayProfInfo();
  await displayComments();
});

// post comment to server
document.querySelector('#form').addEventListener('submit', function(event) {
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
// delete comment from server
commentsContainer.addEventListener('click', async (event) => {
  if (event.target.classList.contains('deleteBtn')) {
    const commentId = event.target.getAttribute('data-comment-id');
    try {
      const response = await fetch(`/comments/${profId}/${commentId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data.message); // Handle success message
      await displayComments(); // Refresh comments after deletion
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }
});
