let contextModel = {
    style: {
        currentStyle: "light",
        nextStyle: "dark"
    },
    showFinished: true,
    selectedSort: "creationDate",
    ascending: 1,
    sortModes: [
        {
            name: "erstellungs Datum",
            value: "creationDate",
        },
        {
            name: "erledigen bis",
            value: "dueDate",
        },
        {
            name: "Wichtigkeit",
            value: "importance",
        }
    ]
}


export function updateSession(req) {
    if(req.body){
        if (req.body.updateTheme !== undefined) {
            let temp = contextModel.style.currentStyle
            contextModel.style.currentStyle = contextModel.style.nextStyle
            contextModel.style.nextStyle = temp
        } else if (req.body.showFinished !== undefined) {
            contextModel.showFinished = !contextModel.showFinished
        } else if (req.body.sortedBy !== undefined) {
            if(contextModel.selectedSort === req.body.sortedBy){
                contextModel.ascending *= -1
            } else{
                contextModel.selectedSort = req.body.sortedBy
                contextModel.ascending = 1
            }
        }
    }

    return setSession()
}

function setSession() {
    let newSession = {};
    newSession.theme = contextModel.style.currentStyle
    newSession.nextTheme = contextModel.style.nextStyle
    newSession.showFinished = contextModel.showFinished
    newSession.sortModes = contextModel.sortModes
    newSession.ascending = contextModel.ascending
    newSession.sortedBy = contextModel.selectedSort
    return newSession
}