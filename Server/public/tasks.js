$(function() {
    var tasks = []
    var files = []

    axios.get('/getTasks')
        .then((response) => {
            tasks = response.data.tasks
        })

    var dropzone = Dropzone.forElement('#dropzone')
    dropzone.on('success', function (file, res) {
        files.push(res)
    })

    const picker = datepicker('#datepicker', {})

    $('#button').click(function() {
        let taskName = $('#task').val()
        let progress = $('#progress option:selected').text()
        let date = $('#datepicker').val()
        let filesInfo = getFiles()
        if (taskName != '' && date != '') {
            addTask(taskName, progress, date, filesInfo)
            saveTask(taskName, progress, date, filesInfo)
        }
    })

    $('#filter').change(function() {
        $('#table').empty()
        tasks.forEach(function(task) {
            if ($('#filter option:selected').text() == task.progress || $('#filter option:selected').text() == 'Filter') {
                addTask(task.taskName, task.progress, task.date, task.files)
            }
        })
        // eslint-disable-next-line no-console
        console.log(tasks)
    })

    function addTask(taskName, progress, date, filesInfo) {
        let row = $('#table').get(0).insertRow(-1)

        let taskNameCell = row.insertCell(-1)
        taskNameCell.innerHTML = taskName

        let progressCell = row.insertCell(-1)
        progressCell.innerHTML = progress

        let dateCell = row.insertCell(-1)
        dateCell.innerHTML = date

        let filesCell = row.insertCell(-1)
        filesCell.innerHTML = filesInfo

        files = []
        dropzone.removeAllFiles()
        picker.setDate()
        $('#task').val('')
    }

    function saveTask(taskName, progress, date, filesInfo) {
        var task = {taskName, progress, date, files: filesInfo}
        tasks.push(task)
        // eslint-disable-next-line no-console
        console.log(tasks)
        $.ajax({
            type: 'POST',
            url: '/task',
            dataType: 'application/json',
            data: {tasks}
        })
    }

    function getFiles() {
        let filesInfo = ''
        files.forEach(function(file){
            var split = file.split('/')
            var a = document.createElement('a')
            var linkText = document.createTextNode(split[split.length - 1])
            a.appendChild(linkText)
            a.href = file
            filesInfo += a.outerHTML + ','
        })
        filesInfo = filesInfo.substring(0, filesInfo.length - 1)

        return filesInfo
    }
})
