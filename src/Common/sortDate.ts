export const FormatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-CA", options);
}; // format 'en-CA' untuk mendapatkan 'YYYY-MM-DD' };

export const FormatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  
  // Format date as YYYY-MM-DD
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = date.toLocaleDateString("en-CA", dateOptions);
  
  // Format time as HH:MM
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
  
  return `${formattedDate} ${formattedTime}`;
};

interface TypeTask {
  id: number;
  action: number;
  action_name: string;
  description: string;
  employee: string;
  level: number;
  project: string;
  status: number;
  created_at: string;
  title: string
}

// Create an interface for our new format
interface GroupedTasks {
  [date: string]: TypeTask[];
}

// Function to group tasks by date
export const GroupTasksByDate = (tasks: TypeTask[]): GroupedTasks => {
  return tasks?.reduce((acc: GroupedTasks, task: TypeTask) => {
    // Format the current task's date
    const taskDate = FormatDate(task.created_at);
    
    // Initialize array for this date if it doesn't exist
    if (!acc[taskDate]) {
      acc[taskDate] = [];
    }
    
    // Only add the task if it matches the exact date
    const existingTasks = acc[taskDate];
    const shouldAdd = existingTasks.length === 0 || 
      existingTasks.some(existingTask => 
        FormatDate(existingTask.created_at) === taskDate
      );
    
    if (shouldAdd) {
      acc[taskDate].push(task);
    }
    
    return acc;
  }, {});
};

export const AddTaskToGroup = (
  groupedTasks: GroupedTasks,
  newTask: TypeTask
): GroupedTasks => {
  const taskDate = FormatDate(newTask.created_at);
  
  // Create new object to maintain immutability
  const updatedGroups = { ...groupedTasks };
  
  // If date doesn't exist, create new array
  if (!updatedGroups[taskDate]) {
    updatedGroups[taskDate] = [];
  }
  
  // Add new task to appropriate date array
  updatedGroups[taskDate].push(newTask);
  
  return updatedGroups;
};

export const GetCurrentMonthWithZero = () => {
  const month = new Date().getMonth() + 1;
  return month.toString().padStart(2, "0");
};

export const GetCurrentYear = () => {
  return new Date().getFullYear();
};