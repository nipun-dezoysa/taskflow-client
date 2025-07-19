import React, { useState } from "react";
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

// Mock user data - replace with actual API call
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    avatar: "https://i.pravatar.cc/150?u=john",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    avatar: "https://i.pravatar.cc/150?u=jane",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    avatar: "https://i.pravatar.cc/150?u=mike",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
];

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

      console.log("Creating task:", taskData);

      // Reset form and close modal on success
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
                        {mockUsers.map((user) => (
                          <AutocompleteItem
                            key={user.id}
                            textValue={user.name}
                            startContent={
                              <Avatar
                                alt={user.name}
                                className="w-6 h-6"
                                src={user.avatar}
                              />
                            }
                          >
                            <div className="flex flex-col">
                              <span className="text-small">{user.name}</span>
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
