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
            documentsContainer.innerHTML += `
            <div class="col-4">
  <div class="listing card">
    <img
      src=""
      class="card-img-top"
      alt="AirBNB Listing"
    />
    <div class="card-body">
      <h2 class="card-title">${document.name}</h2>
      <div>${document.course}</div>
      <p class="card-text">
       
      </p>
      <a href="" class="btn btn-primary">Rate</a>
    </div>
  </div>
  <!-- /card -->
  </div>`
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
});
