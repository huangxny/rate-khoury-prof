// function frontend(){
//     const me = {};
//     me.reloadPrompts = async function (prompts){
//         const res = await fetch('/profs');
//         if (!res.ok){
//             console.log('error');
//             return;
//         }
//         const data = await res.json();
//     }
//     return me;
// }

document.addEventListener('DOMContentLoaded', async () => {
    const documentsContainer = document.getElementById('documents-container');

    try {
        const response = await fetch('/profs');
        const documents = await response.json();
        documents.forEach(document => {
            const profID = document._id;
            documentsContainer.innerHTML += `
            <div class="col-4">
  <div class="listing card">
    <div class="card-body">
      <h2 class="card-title">${document.name}</h2>
      <div>${document.course}</div>
      <a href="/comments/:${profID}/display" class="btn btn-primary">Rate</a>
    </div>
  </div>
  </div><br>`
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
});
