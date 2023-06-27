import Modal from "react-modal";
import React from "react";

const OnboardingModal = ({ isOpen, onRequestClose, onClose }) => {
        Modal.setAppElement('#root');
        return (
          <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            // Add additional props and styles as needed
          >
            {/* Modal content */}
            <h2>Welcome to the app!</h2>
            {/* Add more content or components as needed */}
            <button onClick={onClose}>Close</button>
          </Modal>
        );
      };

export default OnboardingModal;