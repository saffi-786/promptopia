"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter(); // Here we are importing the useRouter hook from next/navigation to programmatically navigate to a different page.
  const { data: session } = useSession(); // Here we are importing the useSession hook from next-auth/react to access the session object.

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true); // Here we set the submitting state to true to indicate that the form is being submitted.

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/"); // Here we are using the router.push method to navigate to the home page after successfully creating a prompt.
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
    // In this snippet, we are creating a new prompt by sending a POST request to the /api/prompt/new route. We are sending the prompt, userId, and tag in the request body. If the response is successful, we clear the prompt and tag fields. If there is an error, we log the error to the console. Finally, we set the submitting state to false.
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
// In this snippet, we are creating a new component called CreatePrompt. Inside this component, we are using the useSession hook to access the session object and the useRouter hook to programmatically navigate to a different page. We are also using the useState hook to manage the submitting state and the post state, which contains the prompt and tag fields.