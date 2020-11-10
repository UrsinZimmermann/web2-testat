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

    setSession(req)
}

function setSession(req) {
    req.session.theme = contextModel.style.currentStyle
    req.session.nextTheme = contextModel.style.nextStyle
    req.session.showFinished = contextModel.showFinished
    req.session.sortModes = contextModel.sortModes
    req.session.ascending = contextModel.ascending
    req.session.sortedBy = contextModel.selectedSort
}