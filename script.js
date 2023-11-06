
let ageTotal = document.querySelector(".age_total");
let ageSpent = document.querySelector(".age_current");
let nodeSizeRange = document.querySelector(".node_size");

ageTotal.addEventListener("input", renderLifeTotal);
ageSpent.addEventListener("change", renderLifeSpent);
nodeSizeRange.addEventListener("change", changeNodeSize);


function renderLifeTotal() {
    let weeksInYear = 52;
    let nodesCount = ageTotal.value *  weeksInYear;

    let lifeNodesContainer = document.querySelector(".life_nodes");

    lifeNodesContainer.innerHTML = "";

    for (let i = 0; i < nodesCount; ++i) {
        let node = document.createElement('div');
        node.dataset.size = nodeSizeRange.value ;
        // node.className = 'life_node';

        lifeNodesContainer.append(node);
    }

    let totalDaysToLive = lifeNodesContainer.childElementCount
    document.querySelector(".nodes-to_live").innerHTML = `Weeks to live: ${totalDaysToLive}`;
    
    console.log(`Total days: ${totalDaysToLive}`);
    renderLifeSpent()
}

function renderLifeSpent() {
    let weeksSpent = ageSpent.value;
    let j = 5;

    const dateOfBirth = new Date(weeksSpent);

    const currentDate = new Date();
    const daysLived = Math.floor((currentDate - dateOfBirth) / (1000 * 60 * 60 * 24));
    const weeksLived = Math.floor(daysLived / 7);

    let renderedNodes = document.querySelectorAll(".life_nodes > div");

    renderedNodes.forEach((node, id) => {
        id < weeksLived ? node.className = "lived" : node.classList.remove("lived")
    })

    document.querySelector(".nodes-lived").innerHTML = `Weeks lived: ${weeksLived}`;
    console.log(`Total days lived: ${weeksLived}`);
    
}

function changeNodeSize() {
    let sizeValue = nodeSizeRange.value;
    let lifeNodesContainer = document.querySelectorAll(".life_nodes > div");
    

    lifeNodesContainer.forEach(node => {
        node.dataset.size = sizeValue;
    })

}

renderLifeTotal()
renderLifeSpent()