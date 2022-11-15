import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FormProvider, useForm } from "react-hook-form";
import { GiRocketFlight } from "react-icons/gi";
import { Step1, Step1Schema } from "./Step1";
import { Step2, Step2Schema } from "./Step2";
import { Step3, Step3Schema } from "./Step3";
import { Step4, Step4Schema } from "./Step4";

const steps = [
  { label: "Select Service", content: <Step1 /> },
  { label: "Home Type", content: <Step2 /> },
  { label: "Home Value", content: <Step3 /> },
  { label: "Goal", content: <Step4 /> },
];

const INITIAL_VALUES = {
  service: "",
  homeType: "",
  homeValue: 0,
  goal: "",
};

export type FormValues = typeof INITIAL_VALUES;

const schemaArr = [Step1Schema, Step2Schema, Step3Schema, Step4Schema];

export const ReactHookFormExample = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const methods = useForm<FormValues>({
    resolver: yupResolver(schemaArr[activeStep]),
    defaultValues: INITIAL_VALUES,
  });

  const { handleSubmit } = methods;

  const onSubmit = () => {
    if (activeStep === steps.length - 1) {
      // handle submission here
    }
    nextStep();
  };

  const handleReset = () => {
    reset();
    methods.reset();
  };

  return (
    <>
      <FormProvider {...methods}>
        <Steps activeStep={activeStep} colorScheme="blue" size="sm">
          {steps.map(({ label, content }) => (
            <Step label={label} key={label}>
              {content}
            </Step>
          ))}
        </Steps>
      </FormProvider>
      {activeStep === steps.length ? (
        <Flex p={4} sx={{ flexDir: "column", alignItems: "center" }}>
          <Box sx={{ p: 8 }}>
            <GiRocketFlight size={64} />
          </Box>
          <Heading>Woohoo!</Heading>
          <Box sx={{ mb: 8, mt: 4 }}>
            <Text>You&apos;ve completed the form!</Text>
          </Box>
          <Button mx="auto" onClick={() => handleReset()}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="center">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            variant="ghost"
          >
            Prev
          </Button>
          <Button onClick={() => handleSubmit(onSubmit)()} type="submit">
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
      <Box as="pre" bg="gray.700" rounded="md" width="100%" p={4} mt={8}>
        <code>{JSON.stringify(methods.watch(), null, 2)}</code>
      </Box>
    </>
  );
};
