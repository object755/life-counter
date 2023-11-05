
let ageTotal = document.querySelector(".age_total");

ageTotal.addEventListener("change", renderNodes);


function renderNodes() {
    let weeksInYear = 52;
    let nodesCount = ageTotal.value *  weeksInYear;

    let lifeNodesContainer = document.querySelector(".life_nodes");

    lifeNodesContainer.innerHTML = "";

    for (let i = 0; i < nodesCount; ++i) {
        let node = document.createElement('div');
        node.className = 'life_node';

        lifeNodesContainer.append(node);
    }
}

renderNodes()