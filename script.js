
let ageContainer = document.querySelector(".container-age");
let ageTotal = document.querySelector(".age_total");
let birthDate = document.querySelector(".age_birth");
let nodeSizeRange = document.querySelector(".node_size");
let addRange = document.querySelector(".add-button");

// ageTotal.addEventListener("input", renderLifeTotal);
// birthDate.addEventListener("change", renderLifeTotal);
nodeSizeRange.addEventListener("change", changeNodeSize);
// dataTypeSelect.addEventListener("change", renderLifeTotal);
addRange.addEventListener("click", addNewRange);


ageContainer.addEventListener('change', (e) => {
    let tagName = e.target.tagName;
    if (tagName === "INPUT" || tagName === "SELECT") {
        renderLifeTotal();
    }
})




function renderLifeTotal() {
    let [nodeName, nodesInYear] = getFormData();

    ageTotal.value = ageTotal.value > 150 ? 150 : ageTotal.value;
    ageTotal.value = ageTotal.value < 0 ? 0 : ageTotal.value;
    
    let nodesCount = ageTotal.value *  nodesInYear;

    let lifeNodesContainer = document.querySelector(".life_nodes");

    lifeNodesContainer.innerHTML = "";

    for (let i = 0; i < nodesCount; ++i) {
        let node = document.createElement('div');
        
        node.dataset.size = nodeSizeRange.value ;
        
        lifeNodesContainer.append(node);
    }

    document.querySelectorAll(".date_start-custom").forEach(node => {
        node.value = birthDate.value;
    })

    let totalDaysToLive = lifeNodesContainer.childElementCount
    document.querySelector(".nodes-to_live").innerHTML = `${nodeName} to live: ${totalDaysToLive}`;
    
    console.log(`Total ${nodeName} to live: ${totalDaysToLive}`);
    renderLifeSpent(totalDaysToLive)
}

function renderLifeSpent(totalDaysToLive) {
    let [nodeName] = getFormData();
    let totalNodes = renderSelectedRange(birthDate.value, undefined)

    document.querySelector(".nodes-lived").innerHTML = `${nodeName} lived: ${totalNodes}`;
    document.querySelector(".nodes-left").innerHTML = `${nodeName} left: ${totalDaysToLive - totalNodes}`;
    console.log(`Total ${nodeName} lived: ${totalDaysToLive - totalNodes}`);
    
}

function renderSelectedRange(startDate, endDate) {
    let [nodeName] = getFormData();

    startDate = new Date(startDate);
    endDate = endDate ? new Date(endDate) : new Date();

    const timeDiff = endDate - startDate;

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

    return totalNodes;
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
            nodesInYear = 365.25;
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

function addNewRange() {
    let currentStartDate = birthDate.value;
    let totalCustomRanges = document.querySelectorAll(".date_start-custom").length;
    let menuContainer = document.querySelector(".container-age");
    
    let rangeControls = document.createElement("div");
    rangeControls.classList.add("custom_range");

    rangeControls.innerHTML = `<div>
                                    <label>start date</label>
                                    <input class="date_start-custom" data-custom-range="${totalCustomRanges+1}" type="date" value="${currentStartDate}">
                                </div>
                                <div>
                                    <label>end date</label>
                                    <input class="date_end-custom" data-custom-range="${totalCustomRanges+1}" type="date" value="${currentStartDate}">
                                </div>`;
    menuContainer.appendChild(rangeControls);
}
renderLifeTotal()