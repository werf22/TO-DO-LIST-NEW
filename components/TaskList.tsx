// components/TaskList.tsx
import type { Task } from '@prisma/client'; // Import the Task type from Prisma

// Define the props this component expects
interface TaskListProps {
  tasks: Task[]; // An array of Task objects
}

export default function TaskList({ tasks }: TaskListProps) {

  // If there are no tasks, don't render anything (the parent page handles the "No tasks" message)
  if (!tasks || tasks.length === 0) {
    return null;
  }

  // Render an unordered list of tasks
  return (
    <ul className="space-y-3">
      {/* Map over the tasks array */}
      {tasks.map((task) => (
        // Use the unique task 'id' as the key for each list item
        <li
          key={task.id}
          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white transition-colors hover:bg-gray-50"
          // In a future version, this li could be a link to the task detail page
          // onClick={() => {/* Navigate to task detail for task.id */}}
          // style={{ cursor: 'pointer' }} // Indicate clickability later
        >
          <div className="flex justify-between items-start gap-4">
            {/* Main task name */}
            <p className="font-medium text-gray-800 flex-1 break-words">
              {task.name || '(Untitled Task)'} {/* Display name or fallback */}
            </p>

            {/* Right-side info block (Optional for MVP, examples shown) */}
            <div className="flex flex-col items-end space-y-1 text-xs whitespace-nowrap">
               {/* Example: Display Priority */}
              {task.priority && (
                <span
                  className={`px-2 py-0.5 rounded-full font-medium ${
                    task.priority.startsWith('P0') ? 'bg-red-100 text-red-800' :
                    task.priority.startsWith('P1') ? 'bg-orange-100 text-orange-800' :
                    task.priority.startsWith('P2') ? 'bg-yellow-100 text-yellow-800' :
                    task.priority.startsWith('P3') ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800' // Default for P4 or unknown
                  }`}
                >
                  {task.priority}
                </span>
              )}

              {/* Example: Display Due Date */}
              {task.due_date && (
                <span className="text-gray-500">
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </span>
              )}

              {/* Example: Display AI Workflow Status */}
              {task.ai_workflow_status && (
                 <span className={`px-2 py-0.5 rounded-full font-medium text-xs ${
                     task.ai_workflow_status.startsWith('1') ? 'bg-gray-100 text-gray-700' :
                     task.ai_workflow_status.startsWith('2') ? 'bg-yellow-100 text-yellow-700' :
                     task.ai_workflow_status.startsWith('3') ? 'bg-blue-100 text-blue-700' :
                     task.ai_workflow_status.startsWith('4') ? 'bg-purple-100 text-purple-700 animate-pulse' : // Pulse for working
                     task.ai_workflow_status.startsWith('5') ? 'bg-pink-100 text-pink-700 font-bold' : // Bold for user action
                     task.ai_workflow_status.startsWith('6') ? 'bg-green-100 text-green-700' :
                     task.ai_workflow_status.startsWith('7') ? 'bg-gray-300 text-gray-600 line-through' : // Strikethrough for parked/cancelled
                     'bg-gray-100 text-gray-700'
                   }`}
                 >
                   {task.ai_workflow_status.substring(task.ai_workflow_status.indexOf('-') + 2)} {/* Show text after "- " */}
                 </span>
              )}

            </div>
          </div>

           {/* Optional: Displaying some context below the name */}
           {/* {task.portfolio && task.portfolio.length > 0 && (
               <p className="text-xs text-gray-500 mt-1">Portfolio: {task.portfolio.join(', ')}</p>
           )}
           {task.project && task.project.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">Project: {task.project.join(', ')}</p>
           )} */}

        </li>
      ))}
    </ul>
  );
}