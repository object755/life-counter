
let ageTotal = document.querySelector(".age_total");
let birthDate = document.querySelector(".age_birth");
let nodeSizeRange = document.querySelector(".node_size");

ageTotal.addEventListener("input", renderLifeTotal);
birthDate.addEventListener("change", renderLifeSpent);
nodeSizeRange.addEventListener("change", changeNodeSize);
dataTypeSelect.addEventListener("change", renderLifeTotal)


function renderLifeTotal() {
    let [nodeName, nodesInYear] = getFormData();
    
    let nodesCount = ageTotal.value *  nodesInYear;

    let lifeNodesContainer = document.querySelector(".life_nodes");

    lifeNodesContainer.innerHTML = "";

    for (let i = 0; i < nodesCount; ++i) {
        let node = document.createElement('div');
        
        node.dataset.size = nodeSizeRange.value ;
        
        lifeNodesContainer.append(node);
    }

    let totalDaysToLive = lifeNodesContainer.childElementCount
    document.querySelector(".nodes-to_live").innerHTML = `${nodeName} to live: ${totalDaysToLive}`;
    
    console.log(`Total ${nodeName} to live: ${totalDaysToLive}`);
    renderLifeSpent()
}

function renderLifeSpent() {
    let [nodeName, nodesInYear] = getFormData();

    const dateOfBirth = new Date(birthDate.value);
    const currentDate = new Date();

    const timeDiff = currentDate - dateOfBirth;

    const daysLived = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const weeksDiff = Math.floor(daysLived / 7);

    let totalNodes;

    switch(nodeName){
        case("Days"):
            totalNodes = daysLived;
            break;
        
        case("Weeks"):
            totalNodes = weeksDiff;
            break;
        
        case("Years"):
            totalNodes = Math.floor(daysLived / 365);
            break;
        
    }

    let renderedNodes = document.querySelectorAll(".life_nodes > div");

    renderedNodes.forEach((node, id) => {
        id < totalNodes ? node.className = "lived" : node.classList.remove("lived")
    })

    document.querySelector(".nodes-lived").innerHTML = `${nodeName} lived: ${totalNodes}`;
    console.log(`Total ${nodeName} lived: ${totalNodes}`);
    
}

function changeNodeSize() {
    let sizeValue = nodeSizeRange.value;
    let lifeNodesContainer = document.querySelectorAll(".life_nodes > div");
    

    lifeNodesContainer.forEach(node => {
        node.dataset.size = sizeValue;
    })
}

function getFormData() {
    let dateType = dataTypeSelect.value;
    
    switch(dateType) {
        case 'days':
            nodeName = "Days";
            nodesInYear = 365;
            break;
        
        case 'weeks':
            nodeName = "Weeks";
            nodesInYear = 52.143;
            break;
        
        case 'years':
            nodeName = "Years";
            nodesInYear = 1;
            break;
    }

    return [nodeName, nodesInYear];
}
renderLifeTotal()