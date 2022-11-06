import "./style.css";
///import { format, compareAsc } from 'date-fns'

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
        counter++
        return projectPages

    }
    let switchProjectContent = (element, counter) => {
        let todoDisplay = document.querySelector(".todoDisplay")
        todoDisplay.innerHTML = ""

        let elementNumber = null
        for (let i = 0; i < counter; i++) {
            if (element.classList.contains(`project${i}`)) {
                elementNumber = i
            }
        }
        projectPages.forEach((item) => {
            item.isActive = false
            if (item.counter == elementNumber) {
                item.isActive = true
                for (let j = 0; j < item.todoLists.length; j++) {
                   todoDisplay.appendChild(item.todoLists[j]) 
                }
            }
        })
        

    }
    let addTodo = () => {
        projectPages.forEach((item) => {
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
            }
            if (item.name == "General" && item.isActive == false) {
                item.todoLists.push(todoElement)
            }
        })
    }
    let removeProjectPage = (number) => {
        let general = null 
        projectPages.forEach((item) => {
            if (item.name == "General") {
                general = item
                return
            }
        })
        projectPages.forEach((item) => {
            if (item.counter == number) {
                for (let i = 0; i < general.todoLists.length; i++) {
                    for (let j = 0; j < item.todoLists.length; j++) {
                        if (item.todoLists[j] == general.todoLists[i]) {
                            let location = general.todoLists.indexOf(general.todoLists[i])
                            general.todoLists.splice(location, 1)
                        }
                    }
                }

                projectPages.splice(projectPages.indexOf(item), 1)
            }
        })
    }
    let removeTodoFromProject = (todoElement) => {
        projectPages.forEach((item) => {
            //remove item from active project
            if (item.isActive == true) {
                let location = item.todoLists.indexOf(todoElement)
                item.todoLists.splice(location, 1)
                //removes todo from other page if general is active
                if (item.name == "General") {
                    projectPages.forEach((item) => {
                        if(item.todoLists.includes(todoElement)) {
                            let location = item.todoLists.indexOf(todoElement)
                            item.todoLists.splice(location, 1)
                        }
                    })
                }
            }
            //also remove item from general
            if (item.name == "General" && item.isActive == false) {
                let location = item.todoLists.indexOf(todoElement)
                item.todoLists.splice(location, 1)
            }
        })
    }
        return {createProject, switchProjectContent, addTodo, pushTodoToProject, removeProjectPage, removeTodoFromProject}
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
        let contentDiv = document.querySelector(".content")

        let inputDiv = document.createElement("div")
        inputDiv.classList.add("userInput")
        contentDiv.appendChild(inputDiv) 

        let nameInput = document.createElement("input")
        nameInput.placeholder = "What To Do?"
        inputDiv.appendChild(nameInput)

        let submitButton = document.createElement("button")
        submitButton.innerText = "submit"
        inputDiv.appendChild(submitButton)


        submitButton.addEventListener("click", () => {
            let name = nameInput.value
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
        todoDivName.classList.add("todoName")
        todoDivName.innerText = todoName
        todoDiv.appendChild(todoDivName)

        let dateDiv = document.createElement("div")
        dateDiv.classList.add("dateDiv")
        todoDiv.appendChild(dateDiv);

        let dateDay = document.createElement("input")
        dateDay.type = "date"
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;
        dateDay.value = today
        dateDiv.appendChild(dateDay)

        let todoDeleteButton = document.createElement("button")
        todoDeleteButton.classList.add("todoDeleteButton")
        todoDeleteButton.innerText = "remove"
        todoDiv.appendChild(todoDeleteButton)

        todoDeleteButton.addEventListener("click", (e) => {
            removeTodoDiv(e.target.parentNode)
        })

        todoCounter++
        displayController.pushTodoToProject(todoDiv)

    }
    let removeTodoDiv = (todoElement) => {
        displayController.removeTodoFromProject(todoElement)
        todoElement.remove()
    }
    return {createProjectInput, appendProject, createToDoInput, createTodoDiv}
})()

let flowController = (() => {
    displayController.createProject("General")
    document.querySelector(".removeProjectButton.project0").remove()
})()