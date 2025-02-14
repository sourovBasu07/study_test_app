"use client";

import { useState } from "react";
import cx from "clsx";
import {
  Avatar,
  Container,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
  UnstyledButton,
} from "@mantine/core";
import classes from "./DashboardHeader.module.css";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { useGetUserQuery } from "@/lib/apiSlices/usersApi";

const DashboardHeader = () => {
  const { data: userProfile } = useGetUserQuery("current-user");
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const user = {
    name: userProfile?.data.username || "",
    email: userProfile?.data.email,
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
  };

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="end">
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <MenuTarget>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Avatar
                    src={user.image}
                    alt={user.name}
                    radius="xl"
                    size={20}
                  />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text>
                  <ChevronDown size={12} strokeWidth={1.5} />
                </Group>
              </UnstyledButton>
            </MenuTarget>
            <MenuDropdown>
              <MenuItem leftSection={<Settings size={16} strokeWidth={1.5} />}>
                Account settings
              </MenuItem>
              <MenuItem leftSection={<LogOut size={16} strokeWidth={1.5} />}>
                Logout
              </MenuItem>
            </MenuDropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
};

export default DashboardHeader;
