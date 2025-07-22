import { Button, Link } from "@heroui/react";
import { HiDocumentAdd, HiUserGroup, HiChartBar } from "react-icons/hi";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-10 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Streamline Your Task Management with TaskFlow
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Efficiently create, assign, and track tasks within your
              organization. Boost productivity and keep your team aligned with
              our intuitive task management system.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                as={Link}
                href="/register"
                variant="solid"
                color="primary"
                size="lg"
              >
                Get Started
              </Button>
              <Button as={Link} href="/login" variant="bordered" size="lg">
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Why TaskFlow?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage tasks effectively
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <FeatureCard
                icon={HiDocumentAdd}
                title="Task Creation"
                description="Easily create tasks with detailed descriptions, deadlines, and priorities."
              />
              <FeatureCard
                icon={HiUserGroup}
                title="Smart Assignment"
                description="Assign tasks to team members and track progress in real-time."
              />
              <FeatureCard
                icon={HiChartBar}
                title="Insightful Analytics"
                description="Get detailed insights and reports on team performance and task completion."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to streamline your workflow?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Join thousands of teams that use TaskFlow to manage their tasks
              efficiently.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                as={Link}
                href="/register"
                variant="solid"
                color="secondary"
                size="lg"
              >
                Get started today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col">
    <div className="mb-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
    <div className="flex flex-auto flex-col">
      <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
        {title}
      </h3>
      <p className="mt-2 text-base leading-7 text-gray-600">{description}</p>
    </div>
  </div>
);
