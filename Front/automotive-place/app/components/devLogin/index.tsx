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

const shortcutConfigDevMode = {
  code: "ctrl+d",
};

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
          type="number"
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
  const [pin, setPin] = useState("");
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const dispatch = useDispatch();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useKeyboardShortcut(openModal, shortcutConfigDevMode);

  const handlePinChange = async (pin: string) => {
    if (pin.length == 5) {
      const result = await loginAsDev(pin);

      if (result.notification.log.status === "Success") {
        closeModal();
        router.push("/test");
      }

      dispatch(addNotification(JSON.stringify(result.notification)));
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
      additionalTailwindCss=""
    >
      <div className="flex gap-2 items-center p-2 ">
        <PinInput length={5} onChange={handlePinChange} inputsRef={inputsRef} />
      </div>
    </AMPModal>
  );
};
