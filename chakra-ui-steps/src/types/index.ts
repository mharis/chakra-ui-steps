export type StepSharedProps = {
  isLastStep?: boolean;
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  index?: number;
  label?: string | React.ReactNode;
  description?: string | null;
  icon: React.ComponentType<any> | undefined;
  hasVisited: boolean | undefined;
};