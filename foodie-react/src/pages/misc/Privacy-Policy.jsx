import { Box, DarkMode, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import PolicyTab from "../../components/PolicyTab";

export default function PrivacyPolicy() {
    return (
        <>
        <Box position="fixed" padding="0.8rem" margin="0 1rem" bgColor="brand.300" borderRadius="0 0 0.8rem 0.8rem">
            <DarkMode>
                <Heading size="md" color="white">Privacy Policy</Heading>
            </DarkMode>
        </Box>
        <Box>

        <PolicyTab />

        <Flex flexDir="column" alignItems="center">
            <Box bgColor={useColorModeValue("brand.100", "brand.300")} p="1.1rem" borderRadius="0.8rem" margin="0.8rem" marginTop="3.4rem" w="80vmin" >
                <Heading>
                    1. User Data
                </Heading>

                <br />

                <b>
                When an Account is created, 
                the user is asked to provide personal data. 
                The data provided should be legitimate and factual as is used to identify the user and to provide the user with personalized services.
                <br />
                <br />By creating an Account,
                  the User consents the irrevocable permission for the collection and use of the data for any purpose.
                </b>
            </Box>

            <Box bgColor={useColorModeValue("brand.100", "brand.300")} p="1.1rem" borderRadius="0.8rem" margin="0.8rem" w="80vmin" >
                <Heading>
                    2. Use of User Data
                </Heading>

                <br />

                <b>
                Your information will enable us to provide you with access to the relevant parts of the Website and to supply the services you have requested. It will be used to identify users on this platform and for security issues. 
                <br />
                <br />
                You are required to provide accurate and complete information in order to use our services, as it is needed to ensure the safety of all users. 
                
                <br />
                <br />
                All reviews and comments posted may stay on the platform's database indefinitely - even when User has deleted.
                </b>
            </Box>

            <Box bgColor={useColorModeValue("brand.100", "brand.300")} p="1.1rem" borderRadius="0.8rem" margin="0.8rem" w="80vmin" >
                <Heading>
                    3. Guidelines
                </Heading>

                <br />

                <b>
                You should try to be respectful to everyone 
                - No excessive profanities and explicit content. 
                <br />
                <br />
                
                No slanders and intentional defamation towards particular/specific restaurant(s) will be tolerated on this platform 
                - false, made-up reviews. 
                <br />
                <br />
                No botting and boosting allowed - using machine learning algorithms to generate fake reviews. 
                <br />
                <br />
                Failure to abide by these rules can result in a punishment of either a temporary suspension or permanant deletion your account. 
                <br />
                <br />
                We are not obligated to justify our course of action and we hold the right to take actions against any user when deem fit.
                </b>
            </Box>

            <Box bgColor={useColorModeValue("brand.100", "brand.300")} p="1.1rem" borderRadius="0.8rem" margin="0.8rem" w="80vmin" >
                <Heading>
                    4. Disclosure of User Data
                </Heading>

                <br />

                <b>
                The information you provide to us will be transferred to and stored on our servers. 
                Your information may be disclosed to third parties for the purpose of providing you with the services you have requested.
                </b>
            </Box>

            <Box bgColor={useColorModeValue("brand.100", "brand.300")} p="1.1rem" borderRadius="0.8rem" margin="0.8rem" w="80vmin" >
                <Heading>
                    5. Security of User Data
                </Heading>

                <br />

                <b>
                We take steps to protect your information from unauthorized access and unlawful processing,
                 accidental loss, destruction or damage.
                 <br />
                 <br />
                  You are responsible for protecting your account and passwords.
                   It is advisable that you keep confidential information such as your password private and do not share it with anyone.
                    The transmission of information via the internet is not completely secure.
                    <br />
                    <br />
                     Although we will take steps to protect your information, we cannot guarantee the security of your data transmitted to the Website; 
                     any transmission is at your own risk. 
                     <br />
                     <br />
                     Once we have received your information,
                      we will use strict procedures and security features to try to prevent unauthorised access.
                      <br />
                      <br />
                       In the event of any loss, damage,
                        or unauthorised access to your information,
                         we shall not be held accountable for.
                </b>
            </Box>


            <Box bgColor={useColorModeValue("brand.100", "brand.300")} p="1.1rem" borderRadius="0.8rem" margin="0.8rem" marginBottom="3.4rem" w="80vmin">
                <Heading>
                    User Agreement
                </Heading>

                <br />

                <b>
                    By using our platform, 
                    you agree to all the terms of this Privacy Policy.
                </b>
            </Box>
        </Flex>
        </Box>
        </>
    )
}