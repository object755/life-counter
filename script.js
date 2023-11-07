
let ageContainer = document.querySelector(".container-age");
let ageTotal = document.querySelector(".age_total");
let birthDate = document.querySelector(".age_birth");
let nodeSizeRange = document.querySelector(".node_size");
let addRange = document.querySelector(".add-button");

// ageTotal.addEventListener("input", renderLifeTotal);
// birthDate.addEventListener("change", renderLifeTotal);
nodeSizeRange.addEventListener("input", changeNodeSize);
// dataTypeSelect.addEventListener("change", renderLifeTotal);
addRange.addEventListener("click", addNewRange);


ageContainer.addEventListener('input', (e) => {
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
    let totalDaysToLive = lifeNodesContainer.childElementCount
    document.querySelector(".nodes-to_live").innerHTML = `${nodeName} to live: ${totalDaysToLive}`;
    
    console.log(`Total ${nodeName} to live: ${totalDaysToLive}`);
    renderLifeSpent(totalDaysToLive)
}

function renderLifeSpent(totalDaysToLive) {
    let [nodeName] = getFormData();
    let totalNodes = renderSelectedRange();

    document.querySelectorAll(".date_start-custom").forEach((node, id) => {
        // node.value = birthDate.value;
        
        let nodeStartDate = node.value;
        let nodeEndDate = document.querySelector(`[data-custom-range-end='${id+1}']`).value;
        let color = randColor();
        renderSelectedRange(nodeStartDate, nodeEndDate, color);
    })



    document.querySelector(".nodes-lived").innerHTML = `${nodeName} lived: ${totalNodes}`;
    document.querySelector(".nodes-left").innerHTML = `${nodeName} left: ${totalDaysToLive - totalNodes}`;
    console.log(`Total ${nodeName} lived: ${totalDaysToLive - totalNodes}`);
    
    function randColor() {
        return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    }
}

function renderSelectedRange(startDate, endDate, color) {
    let [nodeName] = getFormData();

    let bDate = new Date(birthDate.value);
    
    startDate = startDate ? new Date(startDate) : '';
    endDate = endDate ? new Date(endDate) : new Date();

    let [daysLived, weeksLived, yearsLived] = startDate ? calcTimeDiff(endDate, startDate) : calcTimeDiff(endDate, bDate);

    

    let totalNodes, diffNodes;

    switch(nodeName){
        case("Days"):
            totalNodes = daysLived;
            [daysLived, weeksLived, yearsLived] = calcTimeDiff(startDate, bDate)
            diffNodes = daysLived;
            break;
        
        case("Weeks"):
            totalNodes = weeksLived;
            [daysLived, weeksLived, yearsLived] = calcTimeDiff(startDate, bDate)
            diffNodes = weeksLived;
            break;
        
        case("Years"):
            totalNodes = yearsLived;
            [daysLived, weeksLived, yearsLived] = calcTimeDiff(startDate, bDate)
            diffNodes = yearsLived;
            break;
    }

    let renderedNodes = document.querySelectorAll(".life_nodes > div");

    renderedNodes.forEach((node, id) => {
        
        if (!color) {
            id < totalNodes ? node.className = "lived" : node.classList.remove("lived");
        } else {                                                                                     //FIX HERE
            id > diffNodes && id <= (totalNodes+diffNodes) ? node.style.backgroundColor = 'orange' : node.style.backgroundColor = '';
        }
        
    })

    function calcTimeDiff(aDate, bDate) {
        const timeDiff = aDate - bDate;

        const daysLived = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const weeksLived = Math.floor(daysLived / 7);
        const yearsLived = Math.floor(daysLived / 365);

        return [daysLived, weeksLived, yearsLived];
    }

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
                                    <input class="date_start-custom" data-custom-range-start="${totalCustomRanges+1}" type="date" value="${currentStartDate}">
                                </div>
                                <div>
                                    <label>end date</label>
                                    <input class="date_end-custom" data-custom-range-end="${totalCustomRanges+1}" type="date" value="${currentStartDate}">
                                </div>`;
    menuContainer.appendChild(rangeControls);
}
renderLifeTotal()