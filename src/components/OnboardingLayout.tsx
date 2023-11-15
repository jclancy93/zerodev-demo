import { PropsWithChildren } from "react";
import { Button, Form, Stack, Text, Image, Circle, Square } from "tamagui";

interface Props {
  onClick: () => void;
  image: any;
  title: string;
  subtitle: string;
  step: number;
}

export const OnboardingLayout: React.FC<Props> = ({
  onClick,
  image,
  title,
  subtitle,
  step,
}) => {
  return (
    <Stack
      backgroundColor="#131313"
      height="100vh"
      paddingTop="104px"
      paddingLeft="52px"
      paddingRight="52px"
    >
      <Stack
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingBottom="52px"
        height={"calc(100vh - 104px)"}
      >
        <Stack
          display="flex"
          alignItems="center"
          width="60px"
          height="20px"
          justifyContent="space-between"
          flexDirection="row"
        >
          {Array.from({ length: 4 }).map((_, index) => {
            if (index !== step) {
              return (
                <Circle backgroundColor="#87878C" height="4px" width="4px" />
              );
            } else {
              return (
                <Square
                  width="24px"
                  height="4px"
                  backgroundColor="#ffffff"
                  borderRadius="$12"
                />
              );
            }
            // <Circle
            //   backgroundColor={index === step ? "#ffffff" : "#87878C"}
            //   height="4px"
            //   width="4px"
            // ></Circle>
          })}
        </Stack>
        <Stack display="flex" alignItems="center">
          <Image source={image} height="100px" width="100px"></Image>
          <Text color="#ffffff">{title}</Text>
          <Text color="#D9D9D9" textAlign="center">
            {subtitle}
          </Text>
        </Stack>
        <Stack display="flex" alignItems="center">
          <Form onSubmit={() => onClick()}>
            <Form.Trigger asChild>
              <Button
                borderRadius="$space.20"
                width="200px"
                backgroundColor="#EFFBCC"
              >
                <Text>Next</Text>
              </Button>
            </Form.Trigger>
          </Form>
        </Stack>
      </Stack>
    </Stack>
  );
};
