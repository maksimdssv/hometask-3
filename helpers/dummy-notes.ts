export interface Note {
    isArchived: boolean;
    category: string;
    content: string;
    creationDate: string;
    id: string;
    name: string;
}

const DUMMY_NOTES: Note[] = [
    {
        id: "q1",
        name: "Shopping list",
        creationDate: "April 20, 2021",
        category: "Task",
        content: "Tomatoes, bread",
        isArchived: false
    },
    {
        id: "q2",
        name: "The theory of evolution",
        creationDate: "April 27, 2021",
        category: "Random Thought",
        content: "The evolution started",
        isArchived: false
    },
    {
        id: "q3",
        name: "New Feature",
        creationDate: "May 05, 2021",
        category: "Idea",
        content: "Implement new something 05/05/202106/06/2021",
        isArchived: false
    },
    {
        id: "q4",
        name: "William Gaddis",
        creationDate: "May 07, 2021",
        category: "Quote",
        content: "Power doesn't corrupt",
        isArchived: false
    },
    {
        id: "q5",
        name: "Books",
        creationDate: "May 15, 2021",
        category: "Task",
        content: "The Lean Startup",
        isArchived: false
    },
    {
        id: "q6",
        name: "Some Another Note",
        creationDate: "May 17, 2021",
        category: "Task",
        content: "Some content",
        isArchived: false
    },
    {
        id: "q7",
        name: "Last Note on the list",
        creationDate: "September 19, 2021",
        category: "Random Thought",
        content: "No content today",
        isArchived: false
    }
]

export default DUMMY_NOTES;