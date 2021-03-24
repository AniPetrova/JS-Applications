async function createTopic() {

    const buttons = document.querySelectorAll('button');
    
    buttons[0].addEventListener('click', cancelation);
    buttons[1].addEventListener('click', creation);
    
    const formData = document.querySelector('form').children;
    const topicName =  formData[0].children[1];
    const username =  formData[1].children[1];
    const postText =  formData[2].children[1];
}

async function cancelation(event) {
      event.preventDefault();
      
      topicName.value = '';
      username.value = '';
      postText.value = '';

}

    
async function creation(event) {
       
      event.preventDefault();      
      const topic = {
        topicName: topicName.value,
        username: username.value,
        postText: postText.value,
        time: new Date(),
        comments: {},
        
     }
     
         if (topic.topicName == '' || topic.username =='' || topic.postText == '') {
         return alert(`All fields are mandatory!`); 
         }

         topicName.value = '';
         username.value = '';
         postText.value = '';

      await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(topic)
      })

      loadingTopics();

}

loadingTopics();

async function loadingTopics() {
    createTopic();
 
  const bigdiv = document.getElementById('allTopicsHere');
  const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
  const data = await response.json();
  const arrayTopics = Object.values(data).map(e => createDom(e));
  bigdiv.innerHTML = arrayTopics;
  const hidden = document.getElementById('commentsSection');
  hidden.style.display  = 'none'; 

  document.getElementById('allTopicsHere').addEventListener('click', (event) => {   
      event.preventDefault();  
    const postSection = document.getElementById('postsSection');
    const allTopicsHere = document.getElementById('allTopicsHere');    
    const hidden = document.getElementById('commentsSection');
    postSection.style.display = 'none';
    allTopicsHere.style.display = 'none';
    hidden.style.display = 'block';

   const currentTopic = event.currentTarget;
   console.log(currentTopic)




  });
  
}

function createDom(e) {     
  const result = `
  <div class="topic-container">
  <div class="topic-name-wrapper">
      <div class="topic-name">
          <a href="#" class="normal">
              <h2>${e.topicName}</h2>
          </a>
          <div class="columns">
              <div>
                  <p>Date: <time>${e.time}</time></p>
                  <div class="nick-name">
                      <p>Username: <span>${e.username}</span></p>
                  </div>
              </div>
              
              <div class="subscribers">
                  <p>Subscribers: <span>121</span></p>
              </div>
              <div class="button">
                <button id="seecomments">See comments</button>
              </div>
          </div>
      </div>
  </div>
  </div>`;
 return result;  
}






