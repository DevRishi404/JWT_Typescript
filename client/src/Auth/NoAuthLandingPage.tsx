import { Heading, Box, Container, Button, Flex, Text } from "@radix-ui/themes";
import '../stylesheets/NoAuthLandingPage.css'
import { Link } from "wouter";


const NoAuthLandingPage = () => {

    return (
        <Box>
            <Container align="center" size="3" >
                <Box minHeight="100vh" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Heading align="center" size="9" weight="bold" color="iris" >
                        Welcome React Auth System
                    </Heading>
                    <Flex justify="center" mt="8" gap="6">
                        <Button size="4">
                            <Link href="/login" style={{ textDecoration: 'none' }}>
                                <Text highContrast>Login</Text>
                            </Link>
                        </Button>
                        <Button size="4">
                            <Link href="/register" style={{ textDecoration: 'none' }}>
                                <Text highContrast>Register</Text>
                            </Link>
                        </Button>
                    </Flex>
                </Box>
            </Container>
        </Box>
    )
}

export default NoAuthLandingPage;