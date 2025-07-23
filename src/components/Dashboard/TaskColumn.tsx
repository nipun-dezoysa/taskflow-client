import { useDrawerStore } from "@/store/drawerStore";
import { Task } from "@/types/task.type";
import { getPriorityColor, getPriorityLabel } from "@/utils/uiTools";
import { format } from "date-fns";
import { FaRegClock } from "react-icons/fa";

const TaskColumn = ({
  title,
  tasks,
  bgColor,
  updateTaskInList,
}: {
  title: string;
  tasks: Task[];
  bgColor: string;
  updateTaskInList: (task: Task) => void;
}) => {
  const { onOpen } = useDrawerStore();

  return (
    <div className={`md:flex-1 max-md:w-full p-3 sm:p-4 ${bgColor} rounded-lg`}>
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{title}</h2>
      <div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {tasks.map((task) => (
          <div
            onClick={() => onOpen(task, updateTaskInList)}
            key={task.id}
            className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <h3 className="font-medium mb-2">{task.title}</h3>
            <div className="flex items-center justify-between text-sm">
              <span
                className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                  task.priority
                )}`}
              >
                {getPriorityLabel(task.priority)}
              </span>
              <span className="text-gray-500 flex px-2 py-1 rounded-full items-center bg-gray-100 gap-2">
                <FaRegClock />{" "}
                {task.deadlines.length > 0 &&
                  format(
                    new Date(task.deadlines[0].dueDate),
                    "MMMM do, yyyy 'at' h:mm a"
                  )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
