import { useLoaderData, Link } from "react-router-dom";
import {
  Heading,
  Text,
  Center,
  Box,
  Img,
  HStack,
  Input,
  SimpleGrid,
  Tag,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
// import img1 from "../pictures/wallclime.jpg";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch("http://localhost:3000/categories");


  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    if (selectedCategory) {
      const category = event.categoryIds;
      return (
        category == selectedCategory &&
        (event.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          event.description.toLowerCase().includes(searchInput.toLowerCase()))
      );
    } else {
      return (
        event.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        event.description.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  });

  return (
    <Center py={6}>
      <Box>
       
        <Center>
          <Box
            padding={"1rem"}
            w={"80%"}
            marginBottom={"2rem"}

          >

          {/* <div> <img src={img1} alt="" /> </div> */}

            <Heading
              marginBottom={"2rem"}
              as="h1"
              size="2xl"
              textAlign={"left"}
            >

              Find <em> Events </em>, you would like to enjoy

            </Heading>


            <Input
              placeholder="Search events"
              margin={3}
              onChange={handleSearchInput}
              color="#21130d"
              borderColor="#21130d"
              boxSize={"90%"}
              height="2.3rem"
              width="30rem"
              borderRadius="0.5rem"
            />

            <Select
              borderColor="#21130d"
              placeholder="Filter by category"
              onChange={handleCategorySelect}
              value={selectedCategory}
              boxSize={"90%"}
              borderRadius="0.5rem"
              margin={"0.75rem"}
              height="2.3rem"
              width="30rem"
            >

              <option value={1}>sports</option>
              <option value={2}>games</option>
              <option value={3}>music</option>
              <option value={4}>art</option>
              <option value={5}>other</option>
            </Select>

          </Box>
        </Center>

        
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} justifyItems="center">
          {filteredEvents.map((event) => (
            <Box
              key={event.id}
              w="xs"
              h="md"
              my={5}
              mx={[0, 5]}
              overflow="hidden"
              bg="white"
              border="1px"
              borderColor="black"
              borderRadius="0.5rem"
            >

              <Box>
                <Img
                  src={event.image}
                  roundedTop={"sm"}
                  objectFit="cover"
                  h="12.5rem"
                  w="full"
                  alt={"Blog Image"}
                />
              </Box>

              <Box p={4}>
                <Box>
                  {categories.map((category) =>
                    event.categoryIds?.includes(category.id) ? (
                      <Tag
                        key={category.id}
                        fontWeight="medium"
                        fontSize={"sm"}
                        color="white"
                        bg="purple"
                        borderRadius="0.5rem"
                        p={2}
                        marginRight={3}
                        marginBottom={3}
                      >
                        {category.name}
                      </Tag>
                    ) : null
                  )}
                </Box>

                <Link to={`event/${event.id}`}>
                  <Heading
                    marginBottom={"0.3rem"}
                    as="h1"
                    size="lg"
                    noOfLines={1}
                  >
                    {event.title}
                  </Heading>
                </Link>

                <Text marginBottom={"1rem"}>
                  {new Date(event.startTime).toLocaleString([], {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  {"-"}
                  {new Date(event.endTime).toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>

                <Text
                  fontSize="2xl"
                  noOfLines={1}
                >
                  {`${event.description}`}
                </Text>
              </Box>

              <HStack p={4} borderTop={"1px"} color="white" bg="purple">
                <Link to={`event/${event.id}`}>
                  <Text fontSize={"md"} fontWeight={"semibold"}>
                    Check event
                  </Text>
                </Link>
                
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Center>
  );
};