import React from 'react';
import { Box, Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, Link } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Session } from '@ory/client';

type HeaderProps = {
    session?: Session;
    userName?: string;
    settingsUrl: string;
    logoutUrl: string;
    loginUrl: string;
}

const Header: React.FC<HeaderProps> = ({ session, userName, settingsUrl, logoutUrl, loginUrl }) => {
    const isLoggedIn = Boolean(session?.identity);
    const greetingName = session?.identity?.traits?.name?.first || 'friend';

    return (
        <Flex align="center" bg="gray.900" p={4} color="white">
            <Flex flex={1} m="auto" align="center" maxW={800}>
                <Link href="/" mx={2}>Home</Link>
                <Link href="/about" mx={2}>About</Link>
                <Link href="/facilities/add" mx={2}>Add Facility</Link>
                <Flex flexGrow={1} />

                {isLoggedIn ? (
                    <Box>
                        {`Hello, ${greetingName}`}
                    </Box>
                ) : (
                    <Link href={loginUrl} mx={2}>Log in</Link>
                )}

                {isLoggedIn && (
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} px={4} ml={4}>
                            <Avatar size="sm" name={greetingName} />
                        </MenuButton>
                        <MenuList bg="gray.900">
                            <MenuItem as="a" href={settingsUrl} bg="gray.900">Profile</MenuItem>
                            <MenuItem as="a" href={logoutUrl} bg="gray.900">Log out</MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
        </Flex>
    );
};

export default Header;
