import "./style.css";

const listeners = (() => {
    document.querySelector(".addProjectButton").addEventListener("click", () => {
        domStuff.createProjectInput()
    })
    document.querySelector(".newTodoButton").addEventListener("click", () => {
        displayController.addTodo()
    })


})();
const displayController = (() => {
    let counter = 0
    let projectPages = []
    let createProject = (projectName) => {
        projectPages.push(projectFactory(projectName, counter)) 
        domStuff.appendProject(projectName, counter)  
        console.log(projectPages)
        counter++
        return projectPages

    }
    let createProjectContent = (number) => {
        console.log(number)
        projectPages.forEach((item) => {
            item.isActive = false
            if (item.counter == number) {
                item.isActive = true
                console.log(item.name)
            }
        })
        

    }
    let addTodo = () => {
        projectPages.forEach((item) => {
            console.log("hello")
            if (item.isActive == true) {
                console.log("hello2")
                let todoDiv = document.createElement("div")
                todoDiv.classList.add("todoDiv")
                document.querySelector(".content").appendChild(todoDiv)

                function xxx(todoname) {
                    let todoName = document.createElement("div")
                    todoDiv.appendChild(todoName)
                    todoName.innerText = todoname
                }
                domStuff.createToDoInput(xxx)
                

            }
        })
    }

    return {createProject, createProjectContent, addTodo}
})()
const projectFactory = (projectName, projectCounter) => {
    let name = projectName
    let todoLists = []
    let isActive = false
    let counter = projectCounter
    return {name, todoLists, isActive, counter}

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
    let loopCounter = 0;
    let appendProject = (projectName, projectDivCounter) => {
        
        let projectDiv = document.createElement("div")
        projectDiv.classList.add("projectDiv")
        projectDiv.classList.add(`project${projectDivCounter}`)
        projectsSidebar.appendChild(projectDiv)
        
        let projectNameSection = document.createElement("div")
        projectNameSection.classList.add(`project${projectDivCounter}`)
        projectDiv.appendChild(projectNameSection)
        projectNameSection.innerText = projectName

        let removeProjectButton = document.createElement("button")
        removeProjectButton.classList.add("removeProjectButton")
        removeProjectButton.classList.add(`project${projectDivCounter}`)
        removeProjectButton.innerText = "x"
        projectDiv.appendChild(removeProjectButton)
        loopCounter++

        projectDiv.addEventListener("click", (e) => {
            if(e.target.nodeName == "DIV") {
                //go to this page
                console.log("Div Pressed")
                console.log(e.target.classList)
                for (let i = 0; i < loopCounter; i++) {
                    let tempDiv = document.querySelector(`.project${i}`)
                    tempDiv.classList.remove("active")
                }
                for (let i = 0; i < loopCounter; i++) {
                    let temp = `project${i}`
                    if(e.target.classList.contains(temp)) {
                        document.querySelector(`.project${i}`).classList.add("active")                     
                        displayController.createProjectContent(i)
                    } 
                }

            } else if (e.target.nodeName == "BUTTON") {
                //remove this page
                console.log("Button Pressed")
            }
        })

    }   
    let removeProject = () => {

    }
    let createToDoInput = (callback) => {
        console.log("input")
        let contentDiv = document.querySelector(".content")

        let inputDiv = document.createElement("div")
        contentDiv.appendChild(inputDiv) 

        let nameInput = document.createElement("input")
        nameInput.placeholder = "What To Do?"
        inputDiv.appendChild(nameInput)

        let submitButton = document.createElement("button")
        submitButton.innerText = "submit"
        inputDiv.appendChild(submitButton)


        submitButton.addEventListener("click", () => {
            let name = nameInput.value
             console.log(nameInput.value)
             inputDiv.remove()
            callback(name) 
            
            })
        

    }
    return {createProjectInput, appendProject, createToDoInput}
})()

let flowController = (() => {
    displayController.createProject("General")
    console.log(projectFactory["General"])
})()