import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Form, Link, useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return {
    users: await users.json(),
    categories: await categories.json(),
    event: await event.json(),
  };
};

export const EditEvent = () => {
  const toast = useToast();
  const { users, categories, event } = useLoaderData();
  const [updatedEvent, setUpdatedEvent] = useState({
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  });

  const handleInputChange = (e) => {
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast({
          title: "Event Edited Succesfully.",
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Center>
      <Box
        bg="white"
        border={"1px"}
        borderColor="black"
        borderRadius="0.5rem"
        padding={6}
        w={"80%"}
        marginTop="2rem"
        marginBottom="2rem"
      >
        <Heading marginBottom={"3rem"} as="h1" size="2xl">
          Edit your event here
        </Heading>

        <Form method="PUT" id="new-event-form" onSubmit={handleEditSubmit}>
          <FormControl isRequired marginBottom="1.5rem">
            <FormLabel>Select user</FormLabel>
            <Select
              name="createdBy"
              placeholder="Select User"
              value={updatedEvent.createdBy}
              onChange={handleInputChange}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired marginBottom="1.5rem">
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="An exciting title..."
              aria-label="Title"
              type="text"
              name="title"
              value={updatedEvent.title}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired marginBottom="1.5rem">
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              aria-label="description"
              placeholder="Description"
              value={updatedEvent.description}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired marginBottom="1.5rem">
            <FormLabel>Image (URL)</FormLabel>
            <Input
              placeholder="https://website.com/image.jpg"
              aria-label="image"
              type="text"
              name="image"
              value={updatedEvent.image}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired marginBottom="1.5rem">
            <FormLabel>Select category</FormLabel>
            <Select
              name="categoryIds"
              placeholder="Select category"
              value={updatedEvent.categoryIds}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired marginBottom="1.5rem">
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Location"
              aria-label="location"
              type="text"
              name="location"
              value={updatedEvent.location}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired marginBottom="1.5rem">
            <FormLabel>Start time</FormLabel>
            <input
              aria-label="startTime"
              type="datetime-local"
              name="startTime"
              value={updatedEvent.startTime}
              onChange={handleInputChange}
            />
          </FormControl>
        
          <FormControl isRequired marginBottom="1.5rem">
            <FormLabel>End time</FormLabel>
            <input
              aria-label="endTime"
              type="datetime-local"
              name="endTime"
              value={updatedEvent.endTime}
              onChange={handleInputChange}
            />
          </FormControl>
        
          <Button
            type="submit"
            marginTop="1rem"
            variant="outline"
            borderRadius="0.5rem"
            bg={"purple"}
            color="white"
            borderColor="black"
          >
            Save
          </Button>
        </Form>

        <Link to={"/"}>
          <Button
            marginTop="1rem"
            variant="outline"
            borderRadius="0.5rem"
            bg="purple"
            color="white"
            borderColor="black"
          >
            Back to all events
          </Button>
        </Link>
      </Box>
    </Center>
  );
};