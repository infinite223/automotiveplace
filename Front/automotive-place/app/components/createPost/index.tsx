"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ZodIssue } from "zod";

import { AMPInput } from "../shared/AMPInput";
import { AMPTextarea } from "../shared/AMPTextarea";
import { AMPHelpFooter } from "../shared/AMPHelpFooter";
import { AMPButton } from "../shared/AMPButton";

import { postData } from "@/app/utils/data";
import { TPostCreate } from "@/app/utils/types/post";
import { createPost } from "@/app/services/post";
import { createPostSchema } from "@/app/api/zod.schmas";

import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { CreateNotification } from "../logger/NotificationHelper";
import { setShowCreatePost } from "@/lib/features/actions/actionsSlice";
import { Status } from "@/app/utils/enums";
import { zodValidFunction } from "@/app/api/zodValidFunction";

type FormErrors = Partial<Record<keyof TPostCreate, string>>;

export const CreatePostView = () => {
  const dispatch = useDispatch();

  const [post, setPost] = useState<TPostCreate>(postData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateField = (field: keyof TPostCreate, value: string) => {
    const partialData = { ...post, [field]: value };

    const result = createPostSchema.safeParse(partialData);

    if (result.success) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      return;
    }

    const fieldError = result.error.errors.find((e) => e.path[0] === field);

    setErrors((prev) => ({
      ...prev,
      [field]: fieldError?.message,
    }));
  };

  const onSubmit = async () => {
    setLoading(true);

    const validation = createPostSchema.safeParse(post);

    if (!validation.success) {
      const mappedErrors: FormErrors = {};
      validation.error.errors.forEach((e: ZodIssue) => {
        const field = e.path[0] as keyof TPostCreate;
        mappedErrors[field] = e.message;
      });
      setErrors(mappedErrors);
      setLoading(false);
      return;
    }

    try {
      const result = await createPost(post);

      if (result?.notification) {
        dispatch(addNotification(JSON.stringify(result.notification)));
        dispatch(setShowCreatePost(false));
      }
    } catch {
      dispatch(
        addNotification(
          JSON.stringify(
            CreateNotification(Status.Medium, "Coś poszło nie tak")
          )
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="flex justify-center text-sm rounded-md max-md:w-screen sm:w-[400px] h-[11/12]"
      onClick={(e) => e.stopPropagation()}
    >
      <form
        className="rounded-md p-4 flex flex-col justify-between gap-3 w-[95vw] md:w-[760px]"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex flex-col">
          <AMPInput
            name="Tytuł"
            value={post.title}
            placeholder="Np. Zrobiłem swapa z 1.9TDI na 2.0TFSI"
            inputStyles={{ fontSize: 12 }}
            required
            error={errors.title}
            setValue={(value) => {
              const val = value.toString();
              setPost((prev) => ({ ...prev, title: val }));

              if (errors.title) {
                validateField("title", val);
              }
            }}
            validFunction={zodValidFunction(createPostSchema, "title")}
          />

          <AMPTextarea
            name="Opis"
            value={post.description}
            placeholder="Np. Zrobiłem swapa z 1.9TDI..."
            inputStyles={{ fontSize: 12, height: "150px" }}
            required
            error={errors.description}
            setValue={(value) => {
              const val = value.toString();
              setPost((prev) => ({ ...prev, description: val }));

              if (errors.description) {
                validateField("description", val);
              }
            }}
            validFunction={zodValidFunction(createPostSchema, "description")}
          />
        </div>
        <div className="flex flex-col">
          <AMPButton
            disabled={loading}
            name={loading ? "Dodawanie..." : "Dodaj post"}
            type="primary"
            additionalTailwindCss="justify-center"
            isSubmit
          />

          <AMPHelpFooter footerText="Czym jest post?" />
        </div>
      </form>
    </main>
  );
};
