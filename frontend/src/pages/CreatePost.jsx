import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            prompt: form.prompt,
            photo: form.photo,
          }),
        });
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-[32px] font-extrabold text-[#222328]">Create</h1>
        <p className="mt-2 max-w-[500px] text-[16px] text-[#666e75]">
          create imaginative and visually stunning images through DALL-E AI and
          share them with the community.
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="prompt"
            type="text"
            name="prompt"
            placeholder="an oil pastel drawing of an annoyed cat in a spaceship"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative my-1.5 flex h-64 w-64 items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ">
            {form.photo ? (
              <img
                src={form.photo}
                alt="prompt"
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="h-9/12 w-9/12 object-contain opacity-20"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,20,.5)]">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="w-full rounded-md bg-green-700 py-2.5 px-5 text-center text-sm font-medium text-white sm:w-auto"
          >
            {generatingImg ? "Generating ..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[14px] text-[#666e75]">
            Once you have created the image you want, you can share it with
            others in the community .
          </p>
          <button
            type="submit"
            className="mt-3 w-full rounded-md bg-[#6469ff] px-5 py-2.5 text-center font-medium text-white sm:w-auto"
          >
            {loading ? "sharing ..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
