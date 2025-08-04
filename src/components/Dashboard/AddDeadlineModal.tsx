import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  DatePicker,
} from "@heroui/react";
import {
  CalendarDateTime,
  getLocalTimeZone,
  now,
} from "@internationalized/date";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { addDeadlineToTask } from "@/services/taskService";
import { useDrawerStore } from "@/store/drawerStore";
import { toast } from "react-toastify";

interface TaskFormValues {
  deadline: CalendarDateTime | null;
}

const validationSchema = Yup.object({
  deadline: Yup.mixed().nullable(),
});

function AddDeadlineModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useDrawerStore((state) => state.task);
  const updateTask = useDrawerStore((state) => state.updateTask);

  const initialValues: TaskFormValues = {
    deadline: null,
  };

  const handleSubmit = async (
    values: TaskFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    try {
      console.log(values);

      if (values.deadline && task?.id) {
        const response = await addDeadlineToTask(
          task.id,
          values.deadline?.toString() || ""
        );
        toast.success("Deadline added successfully");
        updateTask({ ...task, deadlines: [response.data, ...task.deadlines] });
      }
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding deadline:", error);
      toast.error("Failed to add deadline");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isValid, dirty }) => (
              <Form>
                <ModalHeader className="flex flex-col gap-1">
                  Add Deadline to Task
                </ModalHeader>
                <ModalBody className="gap-4">
                  <Field name="deadline">
                    {() => (
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
                    {isSubmitting ? "Adding..." : "Add Deadline"}
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

export default AddDeadlineModal;
