import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  DatePicker,
} from "@heroui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  CalendarDateTime,
  parseDateTime,
  now,
  getLocalTimeZone,
} from "@internationalized/date";
import { User } from "@/types/user.type";
import { getAllUsers } from "@/services/userService";
import { createTask } from "@/services/taskService";

interface TaskFormValues {
  title: string;
  description: string;
  assignedUserId: string;
  deadline: CalendarDateTime | null;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Task title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: Yup.string()
    .required("Task description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  assignedUserId: Yup.string().required("Please assign the task to a user"),
  deadline: Yup.mixed().nullable(),
});

function CreateTaskModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assigners, setAssigners] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        setAssigners(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const initialValues: TaskFormValues = {
    title: "",
    description: "",
    assignedUserId: "",
    deadline: null,
  };

  const handleSubmit = async (values: TaskFormValues, { resetForm }: any) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const taskData = {
        ...values,
        deadline: values.deadline?.toString(),
      };

      console.log("Creating task with data:", taskData);

      const response = await createTask({
        title: taskData.title,
        description: taskData.description,
        assigneeId: parseInt(taskData.assignedUserId, 10),
        dueDate: taskData.deadline,
      });
      console.log("Task created successfully:", response.data);
      resetForm();
      onOpenChange(false);

      // You can add a success notification here
    } catch (error) {
      console.error("Error creating task:", error);
      // You can add error handling here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue, isValid, dirty }) => (
              <Form>
                <ModalHeader className="flex flex-col gap-1">
                  Create New Task
                </ModalHeader>
                <ModalBody className="gap-4">
                  {/* Title Field */}
                  <Field name="title">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        label="Task Title"
                        placeholder="Enter task title"
                        isRequired
                        isInvalid={touched.title && !!errors.title}
                        errorMessage={touched.title && errors.title}
                        variant="bordered"
                      />
                    )}
                  </Field>

                  {/* Description Field */}
                  <Field name="description">
                    {({ field }: any) => (
                      <Textarea
                        {...field}
                        label="Task Description"
                        placeholder="Enter task description"
                        isRequired
                        isInvalid={touched.description && !!errors.description}
                        errorMessage={touched.description && errors.description}
                        variant="bordered"
                        minRows={3}
                        maxRows={6}
                      />
                    )}
                  </Field>

                  {/* Assigned User Field with Autocomplete */}
                  <Field name="assignedUserId">
                    {({ field, meta }: any) => (
                      <Autocomplete
                        label="Assign to User"
                        placeholder="Search and select a user"
                        isRequired
                        selectedKey={values.assignedUserId}
                        onSelectionChange={(key) =>
                          setFieldValue("assignedUserId", key)
                        }
                        isInvalid={
                          touched.assignedUserId && !!errors.assignedUserId
                        }
                        errorMessage={
                          touched.assignedUserId && errors.assignedUserId
                        }
                        variant="bordered"
                      >
                        {assigners.map((user) => (
                          <AutocompleteItem
                            key={user.id}
                            textValue={user.fname + " " + user.lname}
                            startContent={
                              <Avatar
                                alt={user.fname}
                                className="w-6 h-6"
                                name={user.fname}
                              />
                            }
                          >
                            <div className="flex flex-col">
                              <span className="text-small">
                                {user.fname + " " + user.lname}
                              </span>
                              <span className="text-tiny text-default-400">
                                {user.email}
                              </span>
                            </div>
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    )}
                  </Field>

                  {/* Deadline Field with Date and Time */}
                  <Field name="deadline">
                    {({ field, meta }: any) => (
                      <DatePicker
                        label="Deadline (Optional)"
                        variant="bordered"
                        value={values.deadline}
                        onChange={(date) => setFieldValue("deadline", date)}
                        minValue={now(getLocalTimeZone())}
                        showMonthAndYearPickers
                        granularity="minute"
                        hideTimeZone
                      />
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    isDisabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                    isDisabled={!isValid || !dirty}
                  >
                    {isSubmitting ? "Creating..." : "Create Task"}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CreateTaskModal;
