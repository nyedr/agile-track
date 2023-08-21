"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import Button, { buttonVariants } from "@/components/ui/Button";
import { VariantProps } from "class-variance-authority";

interface ModalContentProps {
  title?: string;
  closeModal: () => void;
  closeModalButtonText: string;
  children?: React.ReactNode;
  closeModalButtonAction?: () => void;
}

export const ModalContent = ({
  title,
  closeModal,
  closeModalButtonText,
  children,
  closeModalButtonAction,
}: ModalContentProps) => {
  return (
    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-background rounded-2xl">
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-primary-text"
      >
        {title}
      </Dialog.Title>
      <>{children}</>
      <div className="mt-4">
        <Button onClick={closeModalButtonAction ?? closeModal}>
          {closeModalButtonText}
        </Button>
      </div>
    </Dialog.Panel>
  );
};

interface ModalProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  children?: React.ReactNode;
  buttonStyles?: VariantProps<typeof buttonVariants> & {
    className?: string;
  };
  openModalButtonText: string;
}

export const Modal = ({
  isOpen,
  children,
  buttonStyles,
  openModalButtonText,
  openModal,
  closeModal,
}: ModalProps) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <Button
          onClick={openModal}
          variant={buttonStyles?.variant}
          size={buttonStyles?.size}
          className={buttonStyles?.className}
        >
          {openModalButtonText}
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div>{children}</div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
