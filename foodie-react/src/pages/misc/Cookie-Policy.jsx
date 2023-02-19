import { Box, DarkMode, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import PolicyTab from '../../components/PolicyTab';

export default function CookiePolicy() {
    return (
        <>
        <Box position="fixed" padding="0.8rem" margin="0 1rem" bgColor="brand.300" borderRadius="0 0 0.8rem 0.8rem">
            <DarkMode>
                <Heading size="md" color="white">Cookie Policy</Heading>
            </DarkMode>
        </Box>
        <Box>

        <PolicyTab />

        <Flex flexDir="column" alignItems="center">
            <Box bgColor={useColorModeValue("brand.100", "brand.300")} p="1.1rem" borderRadius="0.8rem" margin="0.8rem" marginTop="3.4rem" w="80vmin" >
                <Heading>
                    What Are Cookies?
                </Heading>

                <br />

                <b>
                    Cookies are required to make a website usable by enabling basic functions 
                    <br />like page navigation and access to secure areas of the website.
                    <br />
                    <br />The website cannot function properly without these cookies.
                </b>
            </Box>

            <Box bgColor={useColorModeValue("brand.100", "brand.300")} p="1.1rem" borderRadius="0.8rem" margin="0.8rem" w="80vmin">
                <Heading>
                    How We Use Cookies
                </Heading>

                <Box margin="1.2rem">
                    <ol>
                        <b>
                            <li>Session Cookies: Stores information about your session on our website.</li>
                        </b>
                        Note: Do not share your tokens with anyone, as it will allow them to
                        access your account.
                        <br />
                        <br />
                        Session Cookies keep you logged in
                        by recognizing you as the Account you are using.
                        <br />
                        <br />
                        <b>
                            <li>Customization Cookies: Stores your preferred settings.</li>
                        </b>
                        <ul>
                            <li>Theme (Light/Dark Mode)</li>
                        </ul>
                        <br />
                        <b>
                            <li>Miscallaneous Cookies:</li>
                        </b>
                        <ul>
                            <li>Check if you are a first time User,</li>
                            so that you will not receive on boarding messages
                            and be asked to accept for every single visit to this website.
                        </ul>
                        <br />
                        <b>
                            <li>Analytics Cookies: Stores information about your visit to our website.</li>
                        </b>
                        <ul>
                            <li>Your activities on this site may be recorded to be used for our algorithms to enhance the experience of our platform.</li>
                        </ul>
                    </ol>

                    <br />

                    <p>'Activities' includes, but is not limited to:</p>
                        <Box marginLeft="1rem">
                            <ul>
                                <li>Searches</li>
                                <li>Favourites</li>
                                <li>Bookmarks</li>
                            </ul>
                        </Box>
                </Box>
            </Box>

            <Box bgColor={useColorModeValue("brand.100", "brand.300")} p="1.1rem" borderRadius="0.8rem" margin="0.8rem" w="80vmin">
                <Heading>
                    Consent to Cookies
                </Heading>

                <br />

                <b>
                    By law,
                    your acknowlegement is required before we are allowed to use cookies.
                </b>
            </Box>

            <Box bgColor={useColorModeValue("brand.100", "brand.300")} p="1.1rem" borderRadius="0.8rem" margin="0.8rem" marginBottom="3.4rem" w="80vmin">
                <Heading>
                    User Agreement
                </Heading>

                <br />

                <b>
                    By using our website, 
                    you agree to grant us the irrevocable permission
                    for us to use our cookies.
                </b>
            </Box>
        </Flex>
        </Box>
        </>
    )
}