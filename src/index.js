import "./style.css";

const listeners = (() => {
    document.querySelector(".addProjectButton").addEventListener("click", () => {
        domStuff.createProjectInput()
    })


})();
const displayController = (() => {
    let projectPages = []
    let createProject = (projectName) => {
        projectPages.push(projectFactory(projectName)) 
        domStuff.appendProject(projectName)  
        console.log(projectPages)
        return projectPages

    }
    return {createProject}
})()
const projectFactory = (projectName) => {
    let name = projectName
    let todoLists = []
    return {name, todoLists}

};
let domStuff = (() => {
    let  projectsSidebar = document.querySelector(".projectsNav")
    let createProjectInput = () => {
        let inputBox = document.createElement("input")
        let submitInput = document.createElement("button")
        submitInput.innerText = "Submit"
        projectsSidebar.appendChild(inputBox)
        projectsSidebar.appendChild(submitInput)

        submitInput.addEventListener("click", () => { 
            displayController.createProject(inputBox.value)

            inputBox.remove()
            submitInput.remove()
        })
    }
    let appendProject = (projectName) => {
        let projectDiv = document.createElement("div")
        projectDiv.classList.add("projectDiv")
        projectsSidebar.appendChild(projectDiv)
        
        let projectNameSection = document.createElement("div")
        projectDiv.appendChild(projectNameSection)
        projectNameSection.innerText = projectName

        let removeProjectButton = document.createElement("button")
        removeProjectButton.classList.add("removeProjectButton")
        removeProjectButton.innerText = "x"
        projectDiv.appendChild(removeProjectButton)

        projectDiv.addEventListener("click", (e) => {
            if(e.target.nodeName == "DIV") {
                //go to this page
                console.log("Div Pressed")
            } else if (e.target.nodeName == "BUTTON") {
                //remove this page
                console.log("Button Pressed")
            }
        })

    }   
    return {createProjectInput, appendProject}
})()