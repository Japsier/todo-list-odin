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
    let switchProjectContent = (element, counter) => {
        let todoDisplay = document.querySelector(".todoDisplay")
        todoDisplay.innerHTML = ""
        console.log(element)
        console.log("counter = " + counter)

        let elementNumber = null
        for (let i = 0; i < counter; i++) {
            if (element.classList.contains(`project${i}`)) {
                elementNumber = i
                console.log(elementNumber)
            }
        }
        projectPages.forEach((item) => {
            item.isActive = false
            if (item.counter == elementNumber) {
                item.isActive = true
                console.log(item.name)
                for (let j = 0; j < item.todoLists.length; j++) {
                   todoDisplay.appendChild(item.todoLists[j]) 
                }
            }
        })
        

    }
    let addTodo = () => {
        projectPages.forEach((item) => {
            console.log("hello")
            if (item.isActive == true) {


                function xxx(todoname) {
                    domStuff.createTodoDiv(todoname)
                }
                domStuff.createToDoInput(xxx)
                

            }
        })
    }
    let pushTodoToProject = (todoElement) => {
        projectPages.forEach((item) => {
            if (item.isActive == true) {
                item.todoLists.push(todoElement)
                console.log(item.todoLists)
            }
        })
    }
    let removeProjectPage = (number) => {
        console.log(number)
        projectPages.forEach((item) => {
            if (item.counter == number) {
                projectPages.splice(projectPages.indexOf(item), 1)
                console.table(projectPages)
            }
        })
    }
        return {createProject, switchProjectContent, addTodo, pushTodoToProject, removeProjectPage}
})()
const projectFactory = (projectName, projectCounter) => {

    let name = projectName
    let todoLists = []
    let isActive = false
    let counter = projectCounter
    if (counter === 0) {
        isActive = true
    }
    return {name, todoLists, isActive, counter}

};
let domStuff = (() => {
    let  projectsSidebar = document.querySelector(".projectsNav")
    let todoDisplay = document.createElement("div")
    todoDisplay.classList.add("todoDisplay")
    document.querySelector(".content").appendChild(todoDisplay)

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

        if (loopCounter === 0) {
            projectDiv.classList.add("active")
        }
        
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
                console.log(e.target.classList)

                let parent = document.querySelector(".projectsNav")
                let children = parent.children
                for(let i = 0; i < parent.children.length; i++) {
                    let child = children[i];
                    child.classList.remove("active")
                }

                if (e.target.classList.contains("projectDiv")) {
                    e.target.classList.add("active")
                    displayController.switchProjectContent(e.target, loopCounter)

                }
                if(e.target.parentNode.classList.contains("projectDiv")) {
                    e.target.parentNode.classList.add("active")
                    displayController.switchProjectContent(e.target.parentNode, loopCounter)

                }

            } else if (e.target.nodeName == "BUTTON") {
                //remove this page
                console.log("Button Pressed")
                removeProject(e.target.parentNode, projectDivCounter)
            }
        })

    }   
    
    let removeProject = (target, number) => {
        for (let i = 0; i < (number + 1); i++) {
            if(target.classList.contains(`project${i}`)) {
                target.remove()
                displayController.removeProjectPage(number)
            }
        }
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
            //create more input and add them to callback later
            callback(name) 
            
        })
        

    }
    let todoCounter = 0
    let createTodoDiv = (todoName) => {

        let todoDiv = document.createElement("div")
        todoDiv.classList.add("todoDiv", `todo${todoCounter}`)
        todoDisplay.appendChild(todoDiv)

        let todoDivName = document.createElement("div")
        todoDivName.innerText = todoName
        todoDiv.appendChild(todoDivName)

        let todoDeleteButton = document.createElement("button")
        todoDeleteButton.classList.add("todoDeleteButton")
        todoDeleteButton.innerText = "X"
        todoDiv.appendChild(todoDeleteButton)

        todoCounter++
        displayController.pushTodoToProject(todoDiv)

    }
    return {createProjectInput, appendProject, createToDoInput, createTodoDiv}
})()

let flowController = (() => {
    displayController.createProject("General")
})()