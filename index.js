const state = {
  players: [],
  playerDetails: {}
}


const main = document.querySelector(`main`)

const getPuppies = async () => {
  try {    
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-ft/players`)
    const allPuppies = await response.json()
    state.players = allPuppies.data.players
    renderPuppies()
    console.log(allPuppies)
  } catch (error) {
  console.log(error)
    
  }
}

const renderPuppies = () => {
  main.innerHTML = ``;
  const ol = document.createElement(`ol`)
  state.players.forEach((singlePuppy) => {
    const li = document.createElement(`li`);
    li.innerText = singlePuppy.name;
    li.addEventListener(`click`, () => {
      state.playerDetails = singlePuppy;
      rendPlayerDetails();
    });
    ol.append(li)
  });

  main.append(ol)
}

const rendPlayerDetails = () => {
  console.log(state.playerDetails.imageUrl)
  const detailsHTML = `
  <h2>${state.playerDetails.name}</h2>
  <p><b>Breed:</b> ${state.playerDetails.breed}</p>
  <p><b>Status:</b> ${state.playerDetails.status}</p>
  <p><b>Updated at:</b> ${state.playerDetails.updatedAt}</p>
  <p><b>Created At:</b> ${state.playerDetails.createdAt}</p>
  <img src="${state.playerDetails.imageUrl}" style= width="25%" height="25%">
  <img src="
  `
const button = document.createElement(`button`);
button.innerText = `Back`
button.addEventListener(`click`, () => {
  renderPuppies();
})

  main.innerHTML = detailsHTML
  main.append(button)
}

getPuppies()
