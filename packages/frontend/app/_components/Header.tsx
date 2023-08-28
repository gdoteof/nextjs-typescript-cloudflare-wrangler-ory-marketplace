'use client'
import React from 'react';
import { Box, Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, Link } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Session } from '@ory/client';

type HeaderProps = {
    session: Session | undefined;
    userName: string | undefined;
    settingsUrl: string;
    logoutUrl: string;
    loginUrl: string;
}

const Header: React.FC<HeaderProps> = ({ session, userName, settingsUrl, logoutUrl, loginUrl }) => {
    return (
        <Flex align="center" bg="gray.800" p={4} color="white">
            <Flex flex={1} m="auto" align="center" maxW={800}>
                <Box>
                    <Link href="/">Home</Link>
                </Box>
                <Box mx={4}>
                    <Link href="/about">About</Link>
                </Box>
                <Box mx={4}>
                    <Link href="/facilities/add">Add Facility</Link>
                </Box>
                <Flex flexGrow={1} />
                <Box>
                    {session?.identity && (
                        `Hello, ${session?.identity?.traits?.name?.first || 'friend'}`
                    )
                    || ( <Link href={loginUrl}>Log in</Link> )
                    }
                </Box>
                <Box ml={4}>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                            <Avatar size="sm" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem as="a" href={settingsUrl}>Profile</MenuItem>
                            <MenuItem as="a" href={logoutUrl}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Header;