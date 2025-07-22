import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Avatar,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { IoCalendarOutline } from "react-icons/io5";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { updateTaskStatus } from "@/services/taskService";
import { useDrawerStore } from "@/store/drawerStore";
import { TaskStatus } from "@/types/task.type";
import { User } from "@/types/user.type";
import { useUserStore } from "@/store/userStore";
import { getPriorityColor, getPriorityLabel } from "@/utils/uiTools";
import { toast } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";
import UpdateTaskModal from "./UpdateTaskModal";
import AddDeadlineModal from "./AddDeadlineModal";

function TaskDrawer({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const task = useDrawerStore((state) => state.task);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(
    TaskStatus.PENDING
  );
  const user = useUserStore((state) => state.user);
  const updateTask = useDrawerStore((state) => state.updateTask);

  const {
    isOpen: isEditOpen,
    onOpen,
    onOpenChange: onEditChange,
  } = useDisclosure();

  const {
    isOpen: isAddDeadlineOpen,
    onOpen: onAddDeadlineOpen,
    onOpenChange: onAddDeadlineChange,
  } = useDisclosure();

  useEffect(() => {
    if (task) {
      setSelectedStatus(task.status);
    }
  }, [task]);

  const onSelectChange = async (keys: any) => {
    const selectedKey = Array.from(keys as Set<string>)[0];
    setSelectedStatus(selectedKey as TaskStatus);
    if (task) {
      try {
        const response = await updateTaskStatus(
          task.id,
          selectedKey as TaskStatus
        );
        const updatedTask = {
          ...task,
          status: selectedKey as TaskStatus,
          updatedAt: new Date().toISOString(),
        };
        updateTask(updatedTask);
      } catch (error) {
        toast.error("Failed to update task status");
      }
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              {task && (
                <>
                  <DrawerHeader className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {task.title}{" "}
                    </h2>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {getPriorityLabel(task.priority)}
                      </span>
                      <p className="text-sm text-gray-500">
                        Created on {format(new Date(task.createdAt), "PPP")}
                      </p>
                    </div>
                  </DrawerHeader>

                  <DrawerBody className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-500 flex items-center justify-between">
                        <span>Description</span>
                        {task.creator.id == user?.id && (
                          <span onClick={onOpen} className="cursor-pointer">
                            <MdModeEditOutline />
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-800">{task.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div
                        onClick={onAddDeadlineOpen}
                        className={`flex gap-3 items-center group duration-150 ease-in-out p-2 rounded-lg ${
                          task.creator.id == user?.id &&
                          "hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        <div className="flex-none border-1 border-default-200/50 rounded-small text-center w-11 overflow-hidden">
                          <div className="text-tiny bg-default-100 py-0.5 text-default-500">
                            {task.deadlines.length > 0
                              ? format(
                                  new Date(task.deadlines[0].dueDate),
                                  "MMM"
                                )
                              : "---"}
                          </div>
                          <div
                            className={`flex items-center justify-center font-semibold text-medium h-6 text-default-500 ${
                              task.creator.id == user?.id &&
                              "group-hover:hidden"
                            }`}
                          >
                            {task.deadlines.length > 0
                              ? format(new Date(task.deadlines[0].dueDate), "d")
                              : "--"}
                          </div>
                          {task.creator.id == user?.id && (
                            <div className="items-center justify-center hidden group-hover:flex font-semibold text-medium h-6 text-default-500">
                              <MdModeEditOutline />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <p className="text-medium text-foreground font-medium">
                            {task.deadlines.length > 0
                              ? format(
                                  new Date(task.deadlines[0].dueDate),
                                  "EEEE, MMMM d"
                                )
                              : "No deadline set"}
                          </p>
                          <p className="text-small text-default-500">
                            {task.deadlines.length > 0
                              ? format(
                                  new Date(task.deadlines[0].dueDate),
                                  "h:mm a zzz"
                                )
                              : "---"}
                          </p>
                        </div>
                      </div>
                      <Select
                        selectedKeys={[selectedStatus]}
                        onSelectionChange={onSelectChange}
                        label="Task Status"
                        variant="bordered"
                        isDisabled={task.assignee.id !== user?.id}
                        className="w-[35%]"
                      >
                        <SelectItem key={TaskStatus.PENDING}>
                          Pending
                        </SelectItem>
                        <SelectItem key={TaskStatus.IN_PROGRESS}>
                          In Progress
                        </SelectItem>
                        <SelectItem key={TaskStatus.COMPLETED}>
                          Completed
                        </SelectItem>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-500">
                        Task Members
                      </h3>
                      {task.assignee.id == task.creator.id ? (
                        <TeamMemberCard
                          member={task.creator}
                          title="Assignee & Creator"
                        />
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <TeamMemberCard
                            member={task.assignee}
                            title="Assignee"
                          />
                          <TeamMemberCard
                            member={task.creator}
                            title="Creator"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-500">
                        Deadline Changes
                      </h3>
                      <ol className="relative border-s border-gray-200 flex flex-col gap-1">
                        {task.deadlines.map((deadline) => (
                          <li key={deadline.id} className="ms-4">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border-gray-200"></div>
                            <div className="flex items-center gap-3 rounded-lg border p-3 border-gray-200">
                              <IoCalendarOutline className="h-5 w-5 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium">
                                  Due:{" "}
                                  {format(
                                    new Date(deadline.dueDate),
                                    "PPP 'at' h:mm a"
                                  )}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Set on:{" "}
                                  {format(
                                    new Date(deadline.createdAt),
                                    "PPP 'at' h:mm a"
                                  )}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                        {task.deadlines.length === 0 && (
                          <p className="text-gray-500 ">No deadlines set.</p>
                        )}
                      </ol>
                    </div>
                  </DrawerBody>
                </>
              )}
            </>
          )}
        </DrawerContent>
      </Drawer>
      <UpdateTaskModal isOpen={isEditOpen} onOpenChange={onEditChange} />
      <AddDeadlineModal
        isOpen={isAddDeadlineOpen}
        onOpenChange={onAddDeadlineChange}
      />
    </>
  );
}

export default TaskDrawer;

const TeamMemberCard = ({ member, title }: { member: User; title: string }) => {
  const user = useUserStore((state) => state.user);
  return (
    <div className="rounded-lg bg-gray-100 p-2">
      <div className="mb-2 text-sm font-medium text-gray-500">{title}</div>
      <div className="flex items-center gap-3">
        <Avatar
          src={`https://ui-avatars.com/api/?name=${member.fname}+${member.lname}`}
          size="sm"
        />
        <div>
          <p className="font-medium text-sm">
            {member.fname} {member.lname}{" "}
            {user?.id === member.id ? "(You)" : ""}
          </p>
          <p className="text-xs text-gray-500">{member.email}</p>
        </div>
      </div>
    </div>
  );
};
