"use client";

import { useState } from "react";
import { Modal, ModalContent } from "@/ui/Modal";
import IssueCreationForm from "@/components/IssueCreationForm";

const IssueCreationModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <Modal
      openModalButtonText="Open new issue"
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <ModalContent
        closeModal={closeModal}
        closeModalButtonText="Open issue"
        title="Open new issue"
      >
        <IssueCreationForm />
      </ModalContent>
    </Modal>
  );
};

export default IssueCreationModal;
