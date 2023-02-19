import {
  Box,
  DarkMode,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import PolicyTab from "../../components/PolicyTab";

export default function TOS() {
  return (
    <>
      <Box
        position="fixed"
        padding="0.8rem"
        margin="0 1rem"
        bgColor="brand.300"
        borderRadius="0 0 0.8rem 0.8rem"
      >
        <DarkMode>
          <Heading size="md" color="white">
            Terms Of Service
          </Heading>
        </DarkMode>
      </Box>
      <Box>
        <PolicyTab />

        <Flex flexDir="column" alignItems="center">
          <Box
            bgColor={useColorModeValue("brand.100", "brand.300")}
            p="1.1rem"
            borderRadius="0.8rem"
            margin="0.8rem"
            marginTop="3.4rem"
            w="80vmin"
          >
            <Heading>Terms of Service</Heading>

            <br />

            <b>
              By using our service, you acknowledge that you have read through
              the details carefully and accepted these Terms.
              <br />
              <br />
              If you have any questions relating to these Terms, please contact:{" "}
              <Flex color={useColorModeValue("cyan.500", "teal.200")}>
                <a href="mailto:foodiebyjaven@gmail.com">
                  foodiebyjaven@gmail.com
                </a>
              </Flex>
            </b>
          </Box>

          <Box
            bgColor={useColorModeValue("brand.100", "brand.300")}
            p="1.1rem"
            borderRadius="0.8rem"
            margin="0.8rem"
            w="80vmin"
          >
            <Heading>What is Foodie?</Heading>

            <br />

            <b>
              We are an unofficial food review website, created for a school
              project - for educational purposes.
              <br />
              <br />
              We are not affiliated with any restaurant or food company.
              <br />
              Our helpline and email address do not exist.
            </b>
          </Box>

          <Box
            bgColor={useColorModeValue("brand.100", "brand.300")}
            p="1.1rem"
            borderRadius="0.8rem"
            margin="0.8rem"
            w="80vmin"
          >
            <Heading>Purpose</Heading>

            <br />

            <b>
              Our mission is to provide a platform for Users to share their
              honest reviews and experiences at Restaurants with others,
              allowing other food lovers to discover hidden gems they were
              previous unbeknownst to.
              <br />
              <br />
              We are a non-profit organisation, without any partners or sponsors
              from any Restaurants on this platform.
            </b>
          </Box>

          <Box
            bgColor={useColorModeValue("brand.100", "brand.300")}
            p="1.1rem"
            borderRadius="0.8rem"
            margin="0.8rem"
            w="80vmin"
          >
            <Heading>Account Ownership</Heading>

            <br />

            <b>
              An account is required for leaving reviews and comments. Please
              keep your passwords safe and secure.
              <br />
              <br />
              The responsibility of maintaining your account is on you.
              <br />
              You are responsible for all activity that occurs under your
              account.
              <br />
              <br />
              Stealing, Selling, Trading or sharing ownership of an Account is
              strictly prohibited. Doing so can result in termination of the
              account(s).
              <br />
              <br />
              If your account has been compromised, please contact us
              immediately.
              <br />
              <br />
              We may terminate an account if its Owner is unable to keep it
              safe.
              <br />
              We are not obligated to justify our course of action and we hold
              the right to take actions against any user when deem fit.
            </b>
          </Box>

          <Box
            bgColor={useColorModeValue("brand.100", "brand.300")}
            p="1.1rem"
            borderRadius="0.8rem"
            margin="0.8rem"
            w="80vmin"
          >
            <Heading>User Behaviour</Heading>

            <br />
            <b>
              Please be respectful to other Users and Restaurants when leaving a
              Review.
              <br />
              <br />
              We strive to build a friendly, helpful and inclusive community;
              <br />
              Harassment, slander bullying, or discrimination of any form is not
              tolerated on our platform.
            </b>
            <br />
          </Box>

          <Box
            bgColor={useColorModeValue("brand.100", "brand.300")}
            p="1.1rem"
            borderRadius="0.8rem"
            margin="0.8rem"
            w="80vmin"
          >
            <Heading>Intellectual Property</Heading>

            <br />

            <b>
              All rights to content and materials (including User accounts and
              reviews) published belongs to this platform. All such rights are
              reserved. You may not reproduce or republish any content or
              materials on this platform without our prior written consent,
              unless for non-commercial or educational purposes.
            </b>
          </Box>

          <Box
            bgColor={useColorModeValue("brand.100", "brand.300")}
            p="1.1rem"
            borderRadius="0.8rem"
            margin="0.8rem"
            w="80vmin"
          >
            <Heading>Our Liabilities</Heading>

            <br />

            <b>
              The Owner and Developer of this platform will not be responsible
              for any losses or damages arised, or caused, from the use of this
              platform.
            </b>
          </Box>

          <Box
            bgColor={useColorModeValue("brand.100", "brand.300")}
            p="1.1rem"
            borderRadius="0.8rem"
            margin="0.8rem"
            marginBottom="3.4rem"
            w="80vmin"
          >
            <Heading>User Agreement</Heading>

            <br />

            <b>By using our platform, you agree to all terms stated above.</b>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
