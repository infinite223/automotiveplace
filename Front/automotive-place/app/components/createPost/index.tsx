import React, { useState } from "react";
import { AMPInput } from "./../shared/AMPInput";
import { AMPTextarea } from "../shared/AMPTextarea";
import { AMPHelpFooter } from "../shared/AMPHelpFooter";
import { useDispatch } from "react-redux";
import { postData } from "@/app/utils/data";
import { validPost } from "./Validation";
import { TPostCreate } from "@/app/utils/types/post";
import { createPost } from "@/app/services/post";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { CreateNotification } from "../logger/NotificationHelper";
import { setShowCreatePost } from "@/lib/features/actions/actionsSlice";
import { ZodIssue } from "zod";
import { createPostSchema } from "@/app/api/zod.schmas";
import { AMPButton } from "../shared/AMPButton";
import { Status } from "@/app/utils/enums";

export const CreatePostView = () => {
  const dispatch = useDispatch();
  const [post, setPost] = useState<TPostCreate>(postData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<null | ZodIssue[]>(null);

  const onSubmit = async () => {
    try {
      setErrors(null);
      setLoading(true);

      const validation = createPostSchema.safeParse(post);
      if (!validation.success) {
        setErrors(validation.error.errors);
        return;
      }

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
      className="flex justify-center text-sm rounded-md max-md:h-screen max-md:w-screen sm:w-[400px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[250px] h-[11/12] p-3 pr-4 rounded-sm border-r border-zinc-700 ml-2 hidden"></div>
      <form
        className="rounded-md p-2 pr-4 pl-4 flex flex-col max-w-lg group w-[95vw] md:w-[760px]"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <AMPInput
          name="Tytuł"
          setValue={(value) => setPost({ ...post, title: value.toString() })}
          value={post.title}
          placeholder="Np. Zrobiłem swapa z 1.9TDI na 2.0TFSI"
          inputStyles={{ fontSize: 12 }}
          error={errors?.find((e) => e.path.includes("title"))?.message}
          required
        />
        <AMPTextarea
          name="Opis"
          setValue={(value) =>
            setPost({ ...post, description: value.toString() })
          }
          value={post.description}
          placeholder="Np. Zrobiłem swapa z 1.9TDI na 2.0TFSI w sowim Audi A3 8L. Wymieniłem wszystkie uszczelki, wtryski i pompę. Silnik chodzi jak nowy."
          inputStyles={{ fontSize: 12, height: "150px" }}
          error={errors?.find((e) => e.path.includes("description"))?.message}
          required
        />

        <AMPButton
          disabled={loading}
          name={loading ? "Dodawanie..." : "Dodaj post"}
          type="primary"
          additionalTailwindCss="justify-center"
          isSubmit
        />

        <AMPHelpFooter footerText="Czym jest post?" />
      </form>
    </main>
  );
};
