import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Box 
      bg="purple"
    >

        <Flex 
          minWidth="max-content" 
          alignItems="center" 
          gap="2" 
          margin={"1rem"}>

            <Box 
              p="3">

                <Heading 
                  size="xl"
                  color="white"
                >
                    Winc Events
                </Heading>
            </Box>

        <Spacer />

        <ButtonGroup gap="2">
          <Link to={"/"}>
            <Button
              marginBottom={"0.5rem"}
              variant="outline"
              borderRadius="0.5rem"
              backgroundColor="white"
            >
              All events
            </Button>
          </Link>

          <Link to={"/event/addevent"}>
            <Button
              marginBottom={"0.5rem"}
              borderRadius="0.5rem"
              // borderColor="black"
              backgroundColor="green.300"
            >
              + Add event

            </Button>
          </Link>

        </ButtonGroup>
      </Flex>
    </Box>
  );
};