import '../styles/index.scss';
import axios from 'axios';
const factList = document.querySelector('.facts__list');

const sorter = (a, b) =>{
  if(!a.user){return 1;};
  if(!b.user){return -1;};
  if(a.user.name.first > b.user.name.first){return 1;};
  if(a.user.name.first < b.user.name.first){return -1;};
  return 0;
};

// Make a request f
axios.get('https://cat-fact.herokuapp.com/facts')
  .then(function (response) {
    // handle success
    const {all: facts} = response.data;
    facts.sort(sorter);

    facts.forEach((fact)=>{
      showResult(fact);
    });
    console.log(facts);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

  const showResult = (data) =>{
    const li = document.createElement('li');
    li.innerHTML = `${data.text} <strong>(User: ${data.user.name.first} ${data.user.name.last})</strong>`;
    factList.appendChild(li);
  };