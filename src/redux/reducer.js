const initialState = {
    tasks: [
        {
            '_id': '6403dcae42215cbc4c426ff2',
            'name': 'interview',
            'description': 'create resume',
            'status': 'in progress',
            'priority': '10',
            '__v': 0
        },
        {
            '_id': '64078fb29d03a64b275d3f19',
            'name': 'Learn TypeScript',
            'description': 'task',
            'status': 'review',
            'priority': '4',
            '__v': 0
        },
        {
            '_id': '64078fc6421f1d6288cf2ccc',
            'name': 'Learn TypeScript',
            'description': 'task',
            'status': 'done',
            'priority': '3',
            '__v': 0
        },
        {
            '_id': '6407a4cff2f1e34019185394',
            'name': 'Learn NodeJS',
            'description': 'task',
            'status': 'done',
            'priority': '4',
            '__v': 0
        },
        {
            '_id': '6407a562f2f1e3401918539c',
            'name': 'Learn Redux',
            'description': 'target8',
            'status': 'in progress',
            'priority': '4',
            '__v': 0
        },
    ],
    statuses: [
        {
            '_id': '63961cc83be09ca981162e5f',
            'title': 'todo',
            'status': 'todo',
            '__v': 0
        },
        {
            '_id': '63961d16edc05edbb0d97476',
            'title': 'in progress',
            'status': 'in progress',
            '__v': 0
        },
        {
            '_id': '63961d28edc05edbb0d97478',
            'title': 'review',
            'status': 'review',
            '__v': 0
        },
        {
            '_id': '63961d2fedc05edbb0d9747a',
            'title': 'done',
            'status': 'done',
            '__v': 0
        }
    ],
    priorities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    appName: 'Kanban Board',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_TASK':
            return {...state, tasks: [...state.tasks, action.payload]};

        case 'CHANGE_PRIORITY':
            const newTasks = state.tasks.map(el => el._id === action.payload.id ? {
                ...el,
                priority: +el.priority + action.payload.direction
            } : el)
            return {...state, tasks: newTasks}

        case 'CHANGE_STATUSES':
            const oldStatuses = state.statuses.map(el => el.title)
            const indexOfOldStatus = oldStatuses.indexOf(action.payload.currentStatus)
            const indexOfNewStatus = indexOfOldStatus + action.payload.direction
            const newTaskStatus = oldStatuses[indexOfNewStatus]
            const changedTask = state.tasks.map(el => el._id === action.payload.id ? {
                ...el,
                status: newTaskStatus
            } : el)
            return {...state, tasks: changedTask}

        case 'DELETE':
            const deletedTasks = state.tasks.filter(el => el._id !== action.payload)
            return {...state, tasks: deletedTasks}

        case 'UPDATE_TASK':
            const newItems = state.tasks.map(el => el._id === action.payload.id ? {...el, ...action.payload.updateTask} : el)
            return {...state, tasks: newItems}

        default:
            return state;
    }
}

export default reducer;

