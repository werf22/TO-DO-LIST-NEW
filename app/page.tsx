// app/page.tsx
'use client'; // This directive is necessary for using React Hooks (useState, useEffect)

import { useState, useEffect, useCallback } from 'react';
import TaskForm from '@/components/TaskForm';     // Component for adding new tasks
import TaskList from '@/components/TaskList';     // Component for displaying tasks
import type { Task } from '@prisma/client';      // Import Task type from generated Prisma Client

export default function HomePage() {
  // --- State Management ---
  const [tasks, setTasks] = useState<Task[]>([]); // Holds the list of tasks
  const [isLoading, setIsLoading] = useState<boolean>(true); // Tracks loading state for fetching
  const [error, setError] = useState<string | null>(null); // Holds potential error messages

  // --- Data Fetching ---
  // useCallback ensures fetchTasks function identity is stable across renders
  // unless its dependencies change (which are none here).
  const fetchTasks = useCallback(async () => {
    console.log("Fetching tasks...");
    setIsLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await fetch('/api/tasks'); // Call the GET endpoint

      if (!response.ok) {
        // Attempt to read error message from response body, otherwise use status text
        let errorMsg = `HTTP error! status: ${response.status} ${response.statusText}`;
        try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg;
        } catch (jsonError) {
            // Ignore if response body is not JSON or empty
            console.warn("Could not parse error response as JSON:", jsonError);
        }
        throw new Error(errorMsg);
      }

      const data: Task[] = await response.json();
      console.log("Tasks fetched:", data);
      setTasks(data); // Update state with fetched tasks

    } catch (e: any) {
      console.error("Error fetching tasks:", e);
      setError(`Failed to load tasks. ${e.message || 'Please try again later.'}`);
      setTasks([]); // Clear tasks on error to avoid showing stale data
    } finally {
      setIsLoading(false); // Ensure loading is set to false in all cases
    }
  }, []); // Empty dependency array means this function is created once

  // --- Initial Data Load ---
  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, [fetchTasks]); // Depend on the memoized fetchTasks function

  // --- Callback for TaskForm ---
  // This function will be passed to TaskForm and called when a new task is created
  const handleTaskCreated = (newTask: Task) => {
    console.log("New task created, updating list:", newTask);
    // Add the new task to the beginning of the list for immediate feedback
    setTasks((prevTasks) => [newTask, ...prevTasks]);

    // Optional: You could also trigger a full refetch instead:
    // fetchTasks();
    // Adding optimistically is generally a better UX unless ordering is critical.
  };

  // --- Rendering ---
  return (
    // Using Tailwind CSS for basic layout and styling
    <main className="container mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">AI To Do List (MVP)</h1>
        <p className="text-gray-600">Focus on your tasks, let AI help.</p>
      </header>

      {/* Task Creation Form Section */}
      <section aria-labelledby="add-task-heading" className="mb-8">
         <h2 id="add-task-heading" className="text-xl font-semibold text-gray-700 mb-3">Add New Task</h2>
        {/* Pass the callback function as a prop */}
        <TaskForm onTaskCreated={handleTaskCreated} />
      </section>

      {/* Task List Section */}
      <section aria-labelledby="task-list-heading">
        <h2 id="task-list-heading" className="text-xl font-semibold text-gray-700 mb-3">Your Tasks</h2>
        {/* Conditional Rendering based on state */}
        {isLoading && (
          <div className="text-center py-4">
            <p className="text-gray-500">Loading tasks...</p>
            {/* Optional: Add a simple spinner */}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {!isLoading && !error && (
          // Render the TaskList component only when not loading and no error
          <TaskList tasks={tasks} />
        )}
         {!isLoading && !error && tasks.length === 0 && (
             <p className="text-gray-500 italic mt-4">No tasks found. Add one above!</p>
         )}
      </section>
    </main>
  );
}