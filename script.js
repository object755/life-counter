
let ageTotal = document.querySelector(".age_total");
let ageSpent = document.querySelector(".age_current");

ageTotal.addEventListener("change", renderLifeTotal);
ageSpent.addEventListener("change", renderLifeSpent);


function renderLifeTotal() {
    let weeksInYear = 52;
    let nodesCount = ageTotal.value *  weeksInYear;

    let lifeNodesContainer = document.querySelector(".life_nodes");

    lifeNodesContainer.innerHTML = "";

    for (let i = 0; i < nodesCount; ++i) {
        let node = document.createElement('div');
        node.className = 'life_node';

        lifeNodesContainer.append(node);
    }
    renderLifeSpent()
}

function renderLifeSpent() {
    let weeksSpent = ageSpent.value;
    let j = 5;

    const dateOfBirth = new Date(weeksSpent);

    const currentDate = new Date();
    const daysLived = Math.floor((currentDate - dateOfBirth) / (1000 * 60 * 60 * 24));
    const weeksLived = Math.floor(daysLived / 7);

    let renderedNodes = document.querySelectorAll(".life_node");

    for (let i=0; i < weeksLived; i++) {
        renderedNodes[i].style.backgroundColor = "orange";
    }
}

renderLifeTotal()
renderLifeSpent()