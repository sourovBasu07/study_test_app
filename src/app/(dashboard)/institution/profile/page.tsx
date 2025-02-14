import DetailsSections from "@/components/institutions/profile/DetailsSections";
import {
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { Check, Dot, Send } from "lucide-react";
import Image from "next/image";

const page = () => {
  return (
    <Box>
      <div className="relative w-full h-[300px] rounded-t-lg">
        <Image
          src="/images/institution_cover_image.jpg"
          alt="Institute cover image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute left-7 -bottom-16 w-32 h-32 bg-white">
          <Image
            src="/images/institution_profile_image.jpg"
            alt="Institute cover image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="px-7">
        <Card bg="transparent" mt={72}>
          <CardSection>
            <Group justify="space-between">
              <Group w={500} mt="md" mb="xs">
                <Title order={2}>Rajshahi University</Title>
                <Badge size="sm" circle>
                  <Check size={12} />
                </Badge>
              </Group>
              <Button
                color="blue"
                mt="md"
                radius="md"
                leftSection={<Send size={16} strokeWidth={1.5} />}
              >
                Message
              </Button>
            </Group>

            <Text w={500} size="sm">
              With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway
            </Text>
            <Group mt="md" mb="xs">
              <Text size="sm" c="dimmed">
                Rajshahi
              </Text>
              <Dot />
              <Text size="sm" c="dimmed">
                1000 Students
              </Text>
            </Group>
          </CardSection>
        </Card>
        <DetailsSections />
      </div>
    </Box>
  );
};
export default page;
