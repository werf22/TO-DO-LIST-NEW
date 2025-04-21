// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Import the initialized Prisma Client instance
import { Task } from '@prisma/client'; // Import the generated Task type for type safety

/**
 * Handles GET requests to fetch all tasks.
 * Retrieves tasks from the database, ordered by creation date descending.
 */
export async function GET() {
  console.log("GET /api/tasks called"); // Basic logging
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        created_at: 'desc', // Order by newest first
      },
      // Consider adding pagination or limiting fields in a real application
      // select: { id: true, name: true, priority: true, due_date: true, ai_workflow_status: true }
    });
    console.log(`Fetched ${tasks.length} tasks`);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("API Error: Failed to fetch tasks:", error);
    // Provide a generic error message to the client
    return NextResponse.json(
      { error: 'Internal Server Error: Could not fetch tasks.' },
      { status: 500 }
    );
  }
}

/**
 * Handles POST requests to create a new task.
 * Expects essential task details in the request body.
 * Saves the new task to the database.
 * Returns the newly created task data.
 */
export async function POST(request: Request) {
  console.log("POST /api/tasks called"); // Basic logging
  try {
    const body = await request.json();
    console.log("Request Body:", body);

    // --- Extract Expected Fields from MVP Form ---
    // Destructure only the fields you expect your simple MVP form to send.
    const {
      name,
      task_goal,
      input_data_context,
      // Optional fields potentially sent from an initial form:
      portfolio, // Expecting a single string value from MVP form for now
      project,   // Expecting a single string value
      section,   // Expecting a single string value
      priority,  // Expecting a single string value (e.g., "P3 - Medium")
      due_date,  // Expecting a date string (e.g., "YYYY-MM-DD")
      // Add any other fields your MVP form might send explicitly
      suggested_initial_steps_subtasks,
      related_areas_for_ai_to_consider,
      potential_dependencies_related_tasks,
      financial_aspect,
      parent_task, // Name of parent
      parent_task_id // ID of parent
    } = body;

    // --- Basic Input Validation ---
    if (!name || typeof name !== 'string' || name.trim() === '') {
      console.error("Validation Error: Missing or invalid 'name'");
      return NextResponse.json({ error: "Task 'name' is required and must be a non-empty string." }, { status: 400 });
    }
    if (!task_goal || typeof task_goal !== 'string' || task_goal.trim() === '') {
       console.error("Validation Error: Missing or invalid 'task_goal'");
      return NextResponse.json({ error: "Task 'Task Goal' is required and must be a non-empty string." }, { status: 400 });
    }
    if (!input_data_context || typeof input_data_context !== 'string' || input_data_context.trim() === '') {
      console.error("Validation Error: Missing or invalid 'input_data_context'");
      return NextResponse.json({ error: "Task 'Input Data & Context' is required and must be a non-empty string." }, { status: 400 });
    }

    // --- Prepare Data for Prisma ---
    const taskData: Partial<Task> = {
      name: name.trim(),
      task_goal: task_goal.trim(),
      input_data_context: input_data_context.trim(),
      // Handle optional fields and convert types if necessary
      // For multi-select fields expecting String[], wrap single values in an array
      portfolio: portfolio && typeof portfolio === 'string' ? [portfolio.trim()] : [],
      project: project && typeof project === 'string' ? [project.trim()] : [],
      section: section && typeof section === 'string' ? [section.trim()] : [],
      priority: priority && typeof priority === 'string' ? priority.trim() : null, // Use null if not provided
      due_date: due_date ? new Date(due_date) : null, // Convert string date to Date object
      parent_task: parent_task && typeof parent_task === 'string' ? parent_task.trim() : null,
      parent_task_id: parent_task_id && typeof parent_task_id === 'string' ? parent_task_id.trim() : null,
      financial_aspect: financial_aspect && typeof financial_aspect === 'string' ? financial_aspect.trim() : "Žiadny", // Default if not provided
      // Store input-only fields directly
      suggested_initial_steps_subtasks: suggested_initial_steps_subtasks ?? null,
      related_areas_for_ai_to_consider: related_areas_for_ai_to_consider ?? null,
      potential_dependencies_related_tasks: potential_dependencies_related_tasks ?? null,

      // --- Default Values / Placeholders ---
      // Most other fields will be null/empty initially or use DB defaults.
      // They will be populated by the AI process later (outside MVP scope).
      // Example: ai_workflow_status will default to '1 - Nová (v Inboxe)' via schema.
    };

    // --- Create Task in Database ---
    console.log("Attempting to create task with data:", taskData);
    const newTask = await prisma.task.create({
      // Explicitly cast taskData to the correct type expected by Prisma,
      // ensuring only valid fields are included.
      data: taskData as any, // Use 'as any' cautiously or define a stricter type for creation data
    });
    console.log("Task created successfully:", newTask);

    // --- Placeholder for AI Trigger (Future Step) ---
    // TODO: After successful creation, enqueue or trigger an async job
    //       to perform AI auto-categorization and enrichment for `newTask.id`.
    //       Example: await triggerAIProcessing(newTask.id);

    // --- Return Success Response ---
    // Return the full newly created task object
    return NextResponse.json(newTask, { status: 201 });

  } catch (error: any) {
    console.error("API Error: Failed to create task:", error);

    // Handle potential Prisma-specific errors (e.g., unique constraint violation)
    if (error.code === 'P2002') { // Example: Prisma code for unique constraint violation
        return NextResponse.json({ error: `Unique constraint violation: ${error.meta?.target}` }, { status: 409 });
    }
    // Handle validation errors more gracefully if you implement a validation library
    if (error.name === 'ValidationError') {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Generic server error for other cases
    return NextResponse.json(
      { error: 'Internal Server Error: Could not create task.' },
      { status: 500 }
    );
  }
}

// Note: You would add PUT/PATCH and DELETE handlers here as needed later.