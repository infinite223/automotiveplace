"use client";

import React, {
  useState,
  useRef,
  useEffect,
  RefObject,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import AMPModal from "../shared/AMPModal";
import useKeyboardShortcut from "@/app/hooks/useKeydown";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { loginAsDev } from "@/app/services/dev";
import { useRouter } from "next/navigation";
import { shortcutConfigs } from "@/app/utils/constants";
import { getLoggedInUser, signIn } from "@/lib/actions/user.actions";
import { setIsLoading } from "@/lib/features/loading/globalLoadingSlice";
import { CreateNotification } from "../logger/NotificationHelper";

interface PinInputProps {
  length: number;
  onChange: (pin: string) => void;
  inputsRef: RefObject<HTMLInputElement[]>;
}

const PinInput: React.FC<PinInputProps> = ({ length, onChange, inputsRef }) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (value.length > 1) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange(newValues.join(""));

    if (value && index < length - 1) {
      inputsRef.current![index + 1].focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current![index - 1].focus();
    }
  };

  return (
    <div className="flex gap-2">
      {values.map((value, index) => (
        <input
          key={index}
          type="password"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => {
            inputsRef.current![index] = el!;
          }}
          className="w-12 custom-number-input h-10 text-center border-b-2 border-custom-primary hover:border-teal-500 bg-custom-primary outline-none"
        />
      ))}
    </div>
  );
};

export const DevLogin: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const dispatch = useDispatch();
  const openModal = async () => {
    const data = await getLoggedInUser();

    if (data?.isAdmin) {
      dispatch(
        addNotification(
          JSON.stringify(
            CreateNotification(
              "Information",
              "Core.YouAreAlreadyLoggedInAsAdmin"
            )
          )
        )
      );

      return;
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useKeyboardShortcut(openModal, shortcutConfigs.devMode);

  const handlePinChange = async (pin: string) => {
    if (pin.length == 5) {
      dispatch(setIsLoading(true));
      const result = await loginAsDev(pin);

      if (result.notification.log.status === "Success") {
        const result = await signIn({
          email: process.env.NEXT_PUBLIC_TEST_EMAIL!,
          password: process.env.NEXT_PUBLIC_TEST_PASSWORD!,
        });

        dispatch(addNotification(JSON.stringify(result.notification)));

        if (result.notification.log.status === "Success") {
          closeModal();
          router.push("./app");
        }
      }

      dispatch(addNotification(JSON.stringify(result.notification)));
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (isModalOpen && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [isModalOpen]);

  return (
    <AMPModal
      onClose={closeModal}
      visible={isModalOpen}
      withHeader={true}
      title="Dev login"
      additionalTailwindCss="text-custom-primary"
    >
      <div className="flex gap-2 items-center p-2">
        <PinInput length={5} onChange={handlePinChange} inputsRef={inputsRef} />
      </div>
    </AMPModal>
  );
};
