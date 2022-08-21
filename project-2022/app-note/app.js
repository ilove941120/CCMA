    const yargs = require('yargs')
    const notes = require('./notes')
    yargs.command({
        command: 'add',
        description: 'Add a new note',
        builder: {
            title: {
                description: 'Note title',
                demandOption: true,
                type: 'string'
            },
            body: {
                description: 'Note body',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            notes.addNote(argv.title, argv.body)
        }
    })

    yargs.command({
        command: 'read',
        description: 'read a note',
        handler: function (argv) {
            notes.readNotes(argv.title)
        }
    })

    yargs.command({
        command: 'remove',
        description: 'remove a new note',
        builder: {
            title: {
                description: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            notes.removeNote(argv.title)
        }
    })

    yargs.command({
        command: 'list',
        description: 'List notes',
        handler: function () {
            notes.listNotes()
        }
    })

    //console.log(yargs.argv)

    yargs.parse()


    
    
    